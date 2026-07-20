# annual_budget/api/monthly_mis_export.py
#
# Frappe whitelisted API — returns a formatted Excel workbook with 2 sheets:
#   Sheet 1 "Unit Wise Detail"    — full Opex / Capex / Covid / Total breakdown
#   Sheet 2 "Consolidated"        — Budget | Actuals | % of Budget summary
#
# Usage:
#   /api/method/annual_budget.api.monthly_mis_export.export_monthly_mis
#       ?financial_year=2026-27&month=May&prev_financial_year=2025-26
#
# Requirements:  pip install openpyxl

import frappe
import openpyxl
from openpyxl.styles import PatternFill, Font, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import io, re


# ── Colour palette ────────────────────────────────────────────────────────────
BLUE        = "1565C0"   # Year header / Grand total / sticky label bg
ORANGE      = "F26B21"   # Budget/Actual group header
STEEL       = "455A64"   # Sub-col header
BLUE_BD     = "0d47a1"   # Blue border
ORANGE_BD   = "BF360C"   # Orange border
STEEL_BD    = "263238"   # Steel border
TOTAL_BG    = "DBEAFE"   # Section / summary total fill
TOTAL_FG    = "1E3A5F"   # Section total text
ACT_BG      = "FFF8F5"   # Actual column wash
COVID_BG    = "FFFDE7"   # Covid column tint
WHITE       = "FFFFFF"
BD_COL      = "475569"   # Uniform body border


def _side(c=BD_COL, w="thin"):
    return Side(border_style=w, color=c)

def _border(c=BD_COL, w="thin"):
    s = _side(c, w)
    return Border(left=s, right=s, top=s, bottom=s)

def _med_left(c=BD_COL):
    return Border(left=_side(c,"medium"), right=_side(c), top=_side(c), bottom=_side(c))

BODY_BD   = _border()
HDR_BD_BL = _border(BLUE_BD)
HDR_BD_OR = _border(ORANGE_BD)
HDR_BD_ST = _border(STEEL_BD)
TOTAL_BD  = _border(TOTAL_FG, "thin")

def fill(h):  return PatternFill("solid", fgColor=h)
def font(bold=False, color="000000", size=11, italic=False):
    return Font(bold=bold, color=color, size=size, italic=italic, name="Calibri")
def align(h="right", v="center"):
    return Alignment(horizontal=h, vertical=v, wrap_text=False)

def apply(cell, bg=None, fg="000000", bold=False, italic=False,
          h="right", border=None, size=11):
    if bg: cell.fill = fill(bg)
    cell.font      = font(bold=bold, color=fg, size=size, italic=italic)
    cell.alignment = align(h=h)
    cell.border    = border or BODY_BD

CR_FMT  = '#,##0.00'
PCT_FMT = '0.0%'


# ── Data helpers ──────────────────────────────────────────────────────────────
def norm(s):
    return re.sub(r'\s+', ' ', (s or '').strip()).upper()

def zero():
    return dict(opex_b=0,capex_b=0,covid_b=0,total_b=0,
                opex_a=0,capex_a=0,covid_a=0,total_a=0)

def add_z(a, b):
    return {k: a[k]+b[k] for k in a}

def extract_row(entry):
    r = zero()
    for sec in (entry.get("actuals") or []):
        nm  = norm(sec.get("name",""))
        bud = float(sec.get("ytd") or 0)
        act = float(sec.get("total_posted_amt_ytd") or 0)
        if nm in ("OPERATING EXPENSES","OPERATING  EXPENSES"):
            r["opex_b"]+=bud; r["opex_a"]+=act
        elif nm in ("CAPITAL EXPENSES","CAPITAL  EXPENSES"):
            r["capex_b"]+=bud; r["capex_a"]+=act
        elif "COVID" in nm:
            r["covid_b"]+=bud; r["covid_a"]+=act
    r["total_b"] = r["opex_b"]+r["capex_b"]+r["covid_b"]
    r["total_a"] = r["opex_a"]+r["capex_a"]+r["covid_a"]
    return r

def extract_cons(entry):
    r = zero()
    for a in (entry.get("actuals") or []):
        nm  = norm(a.get("name",""))
        bud = float(a.get("ytd") or 0)
        act = float(a.get("total_posted_amt_ytd") or 0)
        if nm=="OPEX TOTAL":          r["opex_b"]+=bud; r["opex_a"]+=act
        elif nm=="CAPEX TOTAL":       r["capex_b"]+=bud; r["capex_a"]+=act
        elif "COVID" in nm:           r["covid_b"]+=bud; r["covid_a"]+=act
        elif nm=="OVERALL GRAND TOTAL": r["total_b"]=bud; r["total_a"]=act
    if not r["total_b"] and not r["total_a"]:
        r["total_b"]=r["opex_b"]+r["capex_b"]+r["covid_b"]
        r["total_a"]=r["opex_a"]+r["capex_a"]+r["covid_a"]
    return r

def build_map(data):
    srt = sorted(data or [], key=lambda e: e.get("sequence_id",0))
    rows,sub_flags,order,grand = {},{},{},None   # changed order to dict to preserve insertion
    order_list = []
    for e in srt:
        tbl = (e.get("table_name") or "").upper()
        if e.get("sequence_id")==9999 or tbl=="CONSOLIDATED":
            grand = extract_cons(e); continue
        lbl = (e.get("label") or "").strip()
        if not lbl: continue
        rows[lbl]      = extract_row(e)
        sub_flags[lbl] = e.get("is_this_sub_item")==1
        order_list.append(lbl)
    if grand is None:
        grand = zero()
        for l in order_list:
            if not sub_flags.get(l): grand = add_z(grand, rows[l])
    return {"order":order_list,"rows":rows,"sub_flags":sub_flags,"grand":grand}

def to_cr(v):
    n = float(v or 0)
    return round(n/10_000_000, 4) if n else None

def month_year(month, fy):
    start = int((fy or "2025-26").split("-")[0])
    cal   = start+1 if month in ("January","February","March") else start
    return f"{month}-{cal}"


# ── Sheet 1 helper: write one header cell ────────────────────────────────────
def hdr(ws, row, col, val, bg, bd, fg=WHITE, bold=True, h="center",
        rowspan=1, colspan=1, size=11):
    cell = ws.cell(row=row, column=col, value=val)
    apply(cell, bg=bg, fg=fg, bold=bold, h=h, border=bd, size=size)
    if colspan>1:
        ws.merge_cells(start_row=row, start_column=col,
                       end_row=row+rowspan-1, end_column=col+colspan-1)
    return cell


# ── Sheet 1: Unit Wise Detail ─────────────────────────────────────────────────
def write_detail_sheet(wb, cm, pm, financial_year, prev_financial_year, month):
    ws = wb.active
    ws.title = "Unit Wise Detail"
    ws.sheet_view.showGridLines = False

    ytd = month_year(month, financial_year)
    prev_ytd = month_year(month, prev_financial_year)

    # ── Title rows ──
    ws.merge_cells("A1:Q1")
    t = ws["A1"]
    t.value = (f"Foundation Budget vs. Actuals – "
               f"FY {financial_year} & FY {prev_financial_year} | YTD {ytd}")
    t.font      = Font(bold=True, size=14, color="1a1a1a", name="Calibri")
    t.alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[1].height = 28

    ws.merge_cells("A2:Q2")
    n = ws["A2"]
    n.value = "₹ Cr."
    n.font  = Font(italic=True, size=10, color="777777", name="Calibri")
    n.alignment = Alignment(horizontal="right", vertical="center")
    ws.row_dimensions[2].height = 14

    # ── 3-row header ──
    # Row 3: Year labels
    hdr(ws,3,1,"Unit / Function",BLUE,HDR_BD_BL,rowspan=3,h="left",size=12)
    hdr(ws,3,2,f"Current Year  {financial_year}",BLUE,HDR_BD_BL,colspan=8,size=12)
    hdr(ws,3,10,f"Last Year  {prev_financial_year}",BLUE,HDR_BD_BL,colspan=8,size=12)
    # fill merged tails row 3
    for c in [3,4,5,6,7,8,9,11,12,13,14,15,16,17]:
        apply(ws.cell(row=3,column=c), bg=BLUE, fg=WHITE, bold=True, h="center",
              border=HDR_BD_BL, size=12)

    # Row 4: Budget/Actual (orange)
    for col,label in [(2,"Budget"),(6,"Actual"),(10,"Budget"),(14,"Actual")]:
        hdr(ws,4,col,label,ORANGE,HDR_BD_OR,colspan=4,size=11)
    for c in [3,4,5,7,8,9,11,12,13,15,16,17]:
        apply(ws.cell(row=4,column=c),bg=ORANGE,fg=WHITE,bold=True,h="center",
              border=HDR_BD_OR,size=11)

    # Row 5: Opex/Capex/Covid/Total (steel)
    sub_labels = ["Opex","Capex","Covid","Total","Opex","Capex","Covid","Total",
                  "Opex","Capex","Covid","Total","Opex","Capex","Covid","Total"]
    for i,lbl in enumerate(sub_labels):
        c = ws.cell(row=5, column=i+2, value=lbl)
        is_cv = lbl=="Covid"
        apply(c, bg=STEEL, fg="FFD54F" if is_cv else WHITE,
              bold=True, italic=is_cv, h="center", border=HDR_BD_ST, size=10)

    for r in [3,4,5]: ws.row_dimensions[r].height = 20

    # ── Data rows ──
    ACTUAL_COLS = {4,5,6,7,12,13,14,15}  # 0-based within the 16 value columns
    COVID_COLS  = {2,6,10,14}

    all_labels = list(cm["order"])
    for l in pm["order"]:
        if l not in cm["rows"]: all_labels.append(l)

    cur_row = 6
    for lbl in all_labels:
        is_sub  = cm["sub_flags"].get(lbl) or pm["sub_flags"].get(lbl,False)
        cv      = cm["rows"].get(lbl) or zero()
        pv      = pm["rows"].get(lbl) or zero()
        vals    = [cv["opex_b"],cv["capex_b"],cv["covid_b"],cv["total_b"],
                   cv["opex_a"],cv["capex_a"],cv["covid_a"],cv["total_a"],
                   pv["opex_b"],pv["capex_b"],pv["covid_b"],pv["total_b"],
                   pv["opex_a"],pv["capex_a"],pv["covid_a"],pv["total_a"]]

        # Label cell
        lc = ws.cell(row=cur_row, column=1, value=("    "+lbl if is_sub else lbl))
        apply(lc, fg="555555" if is_sub else "1a1a1a", bold=False, h="left",
              border=BODY_BD, size=11)

        for i,val in enumerate(vals):
            cr_val = to_cr(val)
            cell   = ws.cell(row=cur_row, column=i+2, value=cr_val)
            cell.number_format = CR_FMT
            if i in COVID_COLS: cell_bg,cell_fg = COVID_BG,"5D4037"
            elif i in ACTUAL_COLS: cell_bg,cell_fg = ACT_BG,"1a1a1a"
            else: cell_bg,cell_fg = WHITE,"1a1a1a"
            apply(cell, bg=cell_bg, fg=cell_fg, italic=(i in COVID_COLS), size=11)

        ws.row_dimensions[cur_row].height = 18
        cur_row += 1

    # Grand Total row
    gc,gp = cm["grand"],pm["grand"]
    g_vals=[gc["opex_b"],gc["capex_b"],gc["covid_b"],gc["total_b"],
            gc["opex_a"],gc["capex_a"],gc["covid_a"],gc["total_a"],
            gp["opex_b"],gp["capex_b"],gp["covid_b"],gp["total_b"],
            gp["opex_a"],gp["capex_a"],gp["covid_a"],gp["total_a"]]
    gc_lbl = ws.cell(row=cur_row, column=1, value="Grand Total")
    apply(gc_lbl, bg=BLUE, fg=WHITE, bold=True, h="left",
          border=_border(BLUE_BD), size=11)
    for i,val in enumerate(g_vals):
        cell = ws.cell(row=cur_row, column=i+2, value=to_cr(val))
        cell.number_format = CR_FMT
        apply(cell, bg=BLUE, fg=WHITE, bold=True, border=_border(BLUE_BD), size=11)
    ws.row_dimensions[cur_row].height = 20

    # Column widths
    ws.column_dimensions["A"].width = 34
    for i in range(2,18): ws.column_dimensions[get_column_letter(i)].width = 11

    ws.freeze_panes = ws["B6"]


# ── Sheet 2: Consolidated Summary ────────────────────────────────────────────
def write_consolidated_sheet(wb, cm, pm, financial_year, prev_financial_year, month):
    ws = wb.create_sheet("Consolidated Summary")
    ws.sheet_view.showGridLines = False

    ytd = month_year(month, financial_year)

    # ── Title ──
    ws.merge_cells("A1:G1")
    t = ws["A1"]
    t.value = f"Consolidated Summary – FY {financial_year} & FY {prev_financial_year} | YTD {ytd}"
    t.font      = Font(bold=True, size=14, color="1a1a1a", name="Calibri")
    t.alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[1].height = 28

    ws.merge_cells("A2:G2")
    n = ws["A2"]
    n.value = "₹ Cr."
    n.font  = Font(italic=True, size=10, color="777777", name="Calibri")
    n.alignment = Alignment(horizontal="right", vertical="center")
    ws.row_dimensions[2].height = 14

    # ── 2-row header (matches JS page: blue year + steel sub-cols) ──

    # Row 3: Label col spans 2 rows; Year group headers
    ws.merge_cells("A3:A4")
    lbl_hdr = ws["A3"]
    lbl_hdr.value = "Areas of Work"
    apply(lbl_hdr, bg=BLUE, fg=WHITE, bold=True, h="left",
          border=HDR_BD_BL, size=12)
    # Style A4 merged cell
    apply(ws["A4"], bg=BLUE, fg=WHITE, bold=True, h="left",
          border=HDR_BD_BL, size=12)

    # Current Year group (B3:D3)
    ws.merge_cells("B3:D3")
    cy = ws["B3"]
    cy.value = f"Current Year YTD  {financial_year}"
    apply(cy, bg=BLUE, fg=WHITE, bold=True, h="center", border=HDR_BD_BL, size=12)
    for c in ["C3","D3"]:
        apply(ws[c], bg=BLUE, fg=WHITE, bold=True, h="center", border=HDR_BD_BL, size=12)

    # Last Year group (E3:G3)
    ws.merge_cells("E3:G3")
    ly = ws["E3"]
    ly.value = f"Last Year YTD  {prev_financial_year}"
    apply(ly, bg=BLUE, fg=WHITE, bold=True, h="center", border=HDR_BD_BL, size=12)
    for c in ["F3","G3"]:
        apply(ws[c], bg=BLUE, fg=WHITE, bold=True, h="center", border=HDR_BD_BL, size=12)

    # Row 4: Sub-cols (steel) — Budget | Actuals | % of Budget for each year
    sub_labels = [
        (2, "Budget",       False),
        (3, "Actuals",      False),
        (4, "% of Budget",  True),
        (5, "Budget",       False),
        (6, "Actuals",      False),
        (7, "% of Budget",  True),
    ]
    for col, label, is_pct in sub_labels:
        c = ws.cell(row=4, column=col, value=label)
        apply(c, bg=STEEL, fg="90CAF9" if is_pct else WHITE,
              bold=True, h="center", border=HDR_BD_ST, size=11)

    ws.row_dimensions[3].height = 22
    ws.row_dimensions[4].height = 20

    # ── Data rows (starting row 5) ──
    all_labels = list(cm["order"])
    for lbl in pm["order"]:
        if lbl not in cm["rows"]:
            all_labels.append(lbl)

    cur_row = 5
    tot_cb = tot_ca = tot_pb = tot_pa = 0.0

    for lbl in all_labels:
        is_sub = cm["sub_flags"].get(lbl) or pm["sub_flags"].get(lbl, False)
        cv = cm["rows"].get(lbl) or zero()
        pv = pm["rows"].get(lbl) or zero()

        cb = float(cv.get("total_b") or 0) / 10_000_000
        ca = float(cv.get("total_a") or 0) / 10_000_000
        pb = float(pv.get("total_b") or 0) / 10_000_000
        pa = float(pv.get("total_a") or 0) / 10_000_000

        # Only non-sub rows contribute to totals
        if not is_sub:
            tot_cb += cb; tot_ca += ca
            tot_pb += pb; tot_pa += pa

        # Label cell
        lc = ws.cell(row=cur_row, column=1,
                     value=("    " + lbl if is_sub else lbl))
        apply(lc, fg="555555" if is_sub else "1a1a1a",
              bold=False, h="left", border=BODY_BD, size=11)

        # Data cells: Budget | Actuals | % of Budget  ×2
        data_cols = [
            (2, cb,  "value",  WHITE),
            (3, ca,  "value",  ACT_BG),
            (4, ca/cb if cb else None, "pct", WHITE),
            (5, pb,  "value",  WHITE),
            (6, pa,  "value",  ACT_BG),
            (7, pa/pb if pb else None, "pct", WHITE),
        ]
        for col, val, kind, bg in data_cols:
            cell = ws.cell(row=cur_row, column=col)
            if kind == "pct":
                cell.value = val
                cell.number_format = PCT_FMT
                apply(cell, fg="1565C0", bold=True, border=BODY_BD, size=11)
            else:
                cell.value = round(val, 4) if val else None
                cell.number_format = CR_FMT
                apply(cell, bg=bg, fg="1a1a1a", border=BODY_BD, size=11)

        ws.row_dimensions[cur_row].height = 18
        cur_row += 1

    # ── Total row ──
    tl = ws.cell(row=cur_row, column=1, value="Total")
    apply(tl, bg=TOTAL_BG, fg=TOTAL_FG, bold=True, h="left",
          border=TOTAL_BD, size=11)

    total_data = [
        (2, tot_cb, "value"),
        (3, tot_ca, "value"),
        (4, tot_ca/tot_cb if tot_cb else None, "pct"),
        (5, tot_pb, "value"),
        (6, tot_pa, "value"),
        (7, tot_pa/tot_pb if tot_pb else None, "pct"),
    ]
    for col, val, kind in total_data:
        cell = ws.cell(row=cur_row, column=col)
        if kind == "pct":
            cell.value = val
            cell.number_format = PCT_FMT
        else:
            cell.value = round(val, 4) if val else None
            cell.number_format = CR_FMT
        apply(cell, bg=TOTAL_BG, fg=TOTAL_FG, bold=True,
              border=TOTAL_BD, size=11)

    ws.row_dimensions[cur_row].height = 22

    # ── Column widths ──
    ws.column_dimensions["A"].width = 36
    for i in range(2, 8):
        ws.column_dimensions[get_column_letter(i)].width = 15

    # Freeze header + label column
    ws.freeze_panes = ws["B5"]


# ── Main API endpoint ─────────────────────────────────────────────────────────
@frappe.whitelist(allow_guest=False)
def export_monthly_mis(financial_year, month, prev_financial_year):
    """
    Fetches data for both financial years, builds two formatted Excel sheets,
    and streams the workbook as a binary download.
    """

    # Import the data function directly — avoids frappe.call() wrapper issues
    from annual_budget.api.foundation_consolidated_report import get_unit_wise_plan

    def _fetch(fy):
        try:
            result = get_unit_wise_plan(
                financial_year=fy,
                month=month,
                table_name_filter="Unit Wise Plan"
            )
            if isinstance(result, list):
                return result
            if isinstance(result, dict):
                return result.get("message") or result.get("data") or []
        except Exception as e:
            frappe.log_error(f"Monthly MIS export fetch error for {fy}: {e}")
        return []

    cur_data  = _fetch(financial_year)
    prev_data = _fetch(prev_financial_year)

    cm = build_map(cur_data)
    pm = build_map(prev_data)

    wb = openpyxl.Workbook()

    # Sheet 1 — Unit Wise Detail (full Opex/Capex/Covid/Total breakdown)
    write_detail_sheet(wb, cm, pm, financial_year, prev_financial_year, month)

    # Sheet 2 — Consolidated Summary (Budget | Actuals | % of Budget)
    write_consolidated_sheet(wb, cm, pm, financial_year, prev_financial_year, month)

    # Stream as binary download
    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)

    frappe.response["filename"]      = f"Monthly_MIS_{financial_year}_{month}.xlsx"
    frappe.response["filecontent"]   = buf.read()
    frappe.response["type"]          = "binary"
    frappe.response["content_type"]  = (
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )