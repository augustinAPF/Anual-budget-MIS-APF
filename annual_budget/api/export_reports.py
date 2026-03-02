from annual_budget.api.phase_sheet import get_consolidated_report
import frappe,io
from frappe import _
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side,Protection
from openpyxl.utils import get_column_letter
from frappe.desk.page.setup_wizard.install_fixtures import _
from openpyxl.utils import get_column_letter


# @frappe.whitelist()
# def export_phase_sheet_excel(
#     financial_year=None,
#     units=None,
#     cost_center=None,
#     location_code=None
# ):
#     data = get_consolidated_report(
#         financial_year=financial_year,
#         units=units,
#         cost_center=cost_center,
#         location_code=location_code
#     )

#     wb = Workbook()
#     ws = wb.active
#     ws.title = "Phase Sheet"

#     # ================= ALIGNMENTS =================
#     center = Alignment(horizontal="center", vertical="center")
#     left_align = Alignment(horizontal="left", vertical="center")
#     right_align = Alignment(horizontal="right", vertical="center")

#     # ================= COLORS =================
#     header_fill = PatternFill("solid", fgColor="5D6D7E")
#     head_fill = PatternFill("solid", fgColor="D6DBDF")
#     subhead_fill = PatternFill("solid", fgColor="F2F3F4")
#     subtotal_fill = PatternFill("solid", fgColor="EBF5FB")
#     head_total_fill = PatternFill("solid", fgColor="D4E6F1")
#     grand_fill = PatternFill("solid", fgColor="A9CCE3")

#     white_bold = Font(bold=True, color="FFFFFF")
#     bold = Font(bold=True)

#     thin = Side(style="thin")
#     border = Border(left=thin, right=thin, top=thin, bottom=thin)

#     # ================= STYLE FUNCTION =================
#     def style_row(row, fill=None, font=None, is_header=False):
#         for col in range(1, 21):
#             cell = ws.cell(row=row, column=col)
#             cell.border = border

#             if is_header:
#                 cell.alignment = center
#             else:
#                 if col <= 3:
#                     cell.alignment = left_align
#                 else:
#                     cell.alignment = right_align

#             if fill:
#                 cell.fill = fill
#             if font:
#                 cell.font = font

#     def format_numeric_row(row):
#         for col in range(4, 21):
#             ws.cell(row=row, column=col).number_format = "#,##0.00"

#     def build_formula(col, rows):
#         if not rows:
#             return 0
#         return "=" + "+".join([f"{col}{r}" for r in rows])

#     # ================= TITLE =================
#     ws.append([f"Unit : {units or ''}"])
#     ws.merge_cells("A1:T1")
#     ws["A1"].alignment = left_align
#     ws["A1"].font = Font(size=12, bold=True)

#     ws.append([f"Financial Year : {financial_year or ''}"])
#     ws.merge_cells("A2:T2")
#     ws["A2"].alignment = left_align
#     ws["A2"].font = Font(size=12, bold=True)

#     ws.append([])

#     # ================= HEADER =================
#     ws.append([
#         "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "QUARTER I", "", "",
#         "QUARTER II", "", "",
#         "QUARTER III", "", "",
#         "QUARTER IV", "", "",
#         "QTR-1", "QTR-2", "QTR-3", "QTR-4",
#         "YEAR TOTAL"
#     ])
#     r1 = ws.max_row

#     ws.merge_cells(start_row=r1, start_column=4, end_row=r1, end_column=6)
#     ws.merge_cells(start_row=r1, start_column=7, end_row=r1, end_column=9)
#     ws.merge_cells(start_row=r1, start_column=10, end_row=r1, end_column=12)
#     ws.merge_cells(start_row=r1, start_column=13, end_row=r1, end_column=15)

#     ws.append([
#         "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "Apr", "May", "Jun",
#         "Jul", "Aug", "Sep",
#         "Oct", "Nov", "Dec",
#         "Jan", "Feb", "Mar",
#         "QTR-1", "QTR-2", "QTR-3", "QTR-4",
#         "YEAR TOTAL"
#     ])
#     r2 = ws.max_row

#     ws.merge_cells(start_row=r1, start_column=1, end_row=r2, end_column=1)
#     ws.merge_cells(start_row=r1, start_column=2, end_row=r2, end_column=2)
#     ws.merge_cells(start_row=r1, start_column=3, end_row=r2, end_column=3)
#     ws.merge_cells(start_row=r1, start_column=16, end_row=r2, end_column=16)
#     ws.merge_cells(start_row=r1, start_column=17, end_row=r2, end_column=17)
#     ws.merge_cells(start_row=r1, start_column=18, end_row=r2, end_column=18)
#     ws.merge_cells(start_row=r1, start_column=19, end_row=r2, end_column=19)
#     ws.merge_cells(start_row=r1, start_column=20, end_row=r2, end_column=20)

#     style_row(r1, header_fill, white_bold, True)
#     style_row(r2, header_fill, white_bold, True)

#     ws.freeze_panes = "A6"

#     # ================= DATA =================
#     sl = 1
#     head_total_rows = []

#     for head in data:

#         ws.append(["", head["name"].upper()])
#         head_row = ws.max_row
#         ws.merge_cells(start_row=head_row, start_column=2, end_row=head_row, end_column=20)
#         style_row(head_row, head_fill, bold)

#         sub_total_rows = []
#         direct_item_rows = []

#         # Direct Items
#         for item in head.get("items", []):
#             row_idx = ws.max_row + 1
#             head_display = item.get("sub_head_of_expense") or head["name"]

#             ws.append([
#                 sl, head_display, item["name"],
#                 *item["q1"], *item["q2"], *item["q3"], *item["q4"],
#                 f"=SUM(D{row_idx}:F{row_idx})",
#                 f"=SUM(G{row_idx}:I{row_idx})",
#                 f"=SUM(J{row_idx}:L{row_idx})",
#                 f"=SUM(M{row_idx}:O{row_idx})",
#                 f"=SUM(D{row_idx}:O{row_idx})"
#             ])

#             style_row(ws.max_row)
#             format_numeric_row(ws.max_row)
#             direct_item_rows.append(ws.max_row)
#             sl += 1

#         # Subheads
#         for sub in head.get("sub_heads", []):
#             ws.append(["", sub["name"].upper()])
#             sub_row = ws.max_row
#             ws.merge_cells(start_row=sub_row, start_column=2, end_row=sub_row, end_column=20)
#             style_row(sub_row, subhead_fill, bold)

#             sub_item_rows = []

#             for item in sub.get("items", []):
#                 row_idx = ws.max_row + 1

#                 item_sub = (item.get("sub_head_of_expense") or "").strip()
#                 current_sub = sub["name"].strip()

#                 if item_sub == current_sub:
#                     head_display = ""
#                 elif item_sub:
#                     head_display = item_sub
#                 else:
#                     head_display = head["name"]

#                 ws.append([
#                     sl, head_display, item["name"],
#                     *item["q1"], *item["q2"], *item["q3"], *item["q4"],
#                     f"=SUM(D{row_idx}:F{row_idx})",
#                     f"=SUM(G{row_idx}:I{row_idx})",
#                     f"=SUM(J{row_idx}:L{row_idx})",
#                     f"=SUM(M{row_idx}:O{row_idx})",
#                     f"=SUM(D{row_idx}:O{row_idx})"
#                 ])

#                 style_row(ws.max_row)
#                 format_numeric_row(ws.max_row)
#                 sub_item_rows.append(ws.max_row)
#                 sl += 1

#             if sub_item_rows:
#                 ws.append([
#                     "", f"TOTAL - {sub['name']}", "",
#                     *[build_formula(col, sub_item_rows) for col in list("DEFGHIJKLMNOPQRST")]
#                 ])
#                 style_row(ws.max_row, subtotal_fill, bold)
#                 format_numeric_row(ws.max_row)
#                 sub_total_rows.append(ws.max_row)

#         total_rows = sub_total_rows if sub_total_rows else direct_item_rows

#         if total_rows:
#             ws.append([
#                 "", f"TOTAL - {head['name']}", "",
#                 *[build_formula(col, total_rows) for col in list("DEFGHIJKLMNOPQRST")]
#             ])
#             style_row(ws.max_row, head_total_fill, bold)
#             format_numeric_row(ws.max_row)
#             head_total_rows.append(ws.max_row)

#     if head_total_rows:
#         ws.append([
#             "", "GRAND TOTAL", "",
#             *[build_formula(col, head_total_rows) for col in list("DEFGHIJKLMNOPQRST")]
#         ])
#         style_row(ws.max_row, grand_fill, bold)
#         format_numeric_row(ws.max_row)

#     # ================= AUTO COLUMN WIDTH =================
#     for col in ws.columns:
#         max_length = 0
#         column_letter = get_column_letter(col[0].column)

#         for cell in col:
#             if cell.value:
#                 value = str(cell.value)
#                 if value.startswith("="):
#                     value = "1234567.00"
#                 max_length = max(max_length, len(value))

#         ws.column_dimensions[column_letter].width = min(max_length + 3, 60)

#     stream = io.BytesIO()
#     wb.save(stream)
#     stream.seek(0)

#     frappe.response["filename"] = f"Phase_Sheet_{financial_year}.xlsx"
#     frappe.response["filecontent"] = stream.getvalue()
#     frappe.response["type"] = "binary"

# * ============================================================== Budget Face Sheet Export  =====================================================================================
@frappe.whitelist()
def export_phase_sheet_excel(
    financial_year=None,
    units=None,
    cost_center=None,
    location_code=None
):
    data = get_consolidated_report(
        financial_year=financial_year,
        units=units,
        cost_center=cost_center,
        location_code=location_code
    )

    wb = Workbook()
    ws = wb.active
    ws.title = "Phase Sheet"

    # ================= ALIGNMENTS =================
    center = Alignment(horizontal="center", vertical="center")
    left_align = Alignment(horizontal="left", vertical="center")
    right_align = Alignment(horizontal="right", vertical="center")

    # ================= COLORS =================
    header_fill = PatternFill("solid", fgColor="5D6D7E")
    head_fill = PatternFill("solid", fgColor="D6DBDF")
    subhead_fill = PatternFill("solid", fgColor="F2F3F4")
    subtotal_fill = PatternFill("solid", fgColor="EBF5FB")
    head_total_fill = PatternFill("solid", fgColor="D4E6F1")
    grand_fill = PatternFill("solid", fgColor="A9CCE3")

    white_bold = Font(bold=True, color="FFFFFF")
    bold = Font(bold=True)

    thin = Side(style="thin")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)

    # ================= ROMAN FUNCTION =================
    def to_roman(num):
        val = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
        syb = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]
        roman_num = ""
        i = 0
        while num > 0:
            for _ in range(num // val[i]):
                roman_num += syb[i]
                num -= val[i]
            i += 1
        return roman_num

    # ================= STYLE FUNCTION =================
    def style_row(row, fill=None, font=None, is_header=False):
        for col in range(1, 21):
            cell = ws.cell(row=row, column=col)
            cell.border = border

            if is_header:
                cell.alignment = center
            else:
                if col <= 3:
                    cell.alignment = left_align
                else:
                    cell.alignment = right_align

            if fill:
                cell.fill = fill
            if font:
                cell.font = font

    def format_numeric_row(row):
        for col in range(4, 21):
            ws.cell(row=row, column=col).number_format = "#,##0.00"

    def build_formula(col, rows):
        if not rows:
            return 0
        return "=" + "+".join([f"{col}{r}" for r in rows])

    # ================= TITLE =================
    ws.append([f"Unit : {units or ''}"])
    ws.merge_cells("A1:T1")
    ws["A1"].alignment = left_align
    ws["A1"].font = Font(size=12, bold=True)

    ws.append([f"Financial Year : {financial_year or ''}"])
    ws.merge_cells("A2:T2")
    ws["A2"].alignment = left_align
    ws["A2"].font = Font(size=12, bold=True)

    ws.append([])

    # ================= HEADER =================
    ws.append([
        "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
        "QUARTER I", "", "",
        "QUARTER II", "", "",
        "QUARTER III", "", "",
        "QUARTER IV", "", "",
        "QTR-1", "QTR-2", "QTR-3", "QTR-4",
        "YEAR TOTAL"
    ])
    r1 = ws.max_row

    ws.merge_cells(start_row=r1, start_column=4, end_row=r1, end_column=6)
    ws.merge_cells(start_row=r1, start_column=7, end_row=r1, end_column=9)
    ws.merge_cells(start_row=r1, start_column=10, end_row=r1, end_column=12)
    ws.merge_cells(start_row=r1, start_column=13, end_row=r1, end_column=15)

    ws.append([
        "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec",
        "Jan", "Feb", "Mar",
        "QTR-1", "QTR-2", "QTR-3", "QTR-4",
        "YEAR TOTAL"
    ])
    r2 = ws.max_row

    ws.merge_cells(start_row=r1, start_column=1, end_row=r2, end_column=1)
    ws.merge_cells(start_row=r1, start_column=2, end_row=r2, end_column=2)
    ws.merge_cells(start_row=r1, start_column=3, end_row=r2, end_column=3)
    ws.merge_cells(start_row=r1, start_column=16, end_row=r2, end_column=16)
    ws.merge_cells(start_row=r1, start_column=17, end_row=r2, end_column=17)
    ws.merge_cells(start_row=r1, start_column=18, end_row=r2, end_column=18)
    ws.merge_cells(start_row=r1, start_column=19, end_row=r2, end_column=19)
    ws.merge_cells(start_row=r1, start_column=20, end_row=r2, end_column=20)

    style_row(r1, header_fill, white_bold, True)
    style_row(r2, header_fill, white_bold, True)

    # ================= FREEZE PANES =================
    # Freeze first 3 columns + top 5 rows
    ws.freeze_panes = "D6"

    # ================= DATA =================
    sl = 1
    head_total_rows = []

    for head in data:

        ws.append(["", head["name"].upper()])
        head_row = ws.max_row
        ws.merge_cells(start_row=head_row, start_column=2, end_row=head_row, end_column=20)
        style_row(head_row, head_fill, bold)

        sub_total_rows = []
        direct_item_rows = []

        # Direct Items
        for item in head.get("items", []):
            row_idx = ws.max_row + 1
            head_display = item.get("sub_head_of_expense") or head["name"]

            ws.append([
                sl, head_display, item["name"],
                *item["q1"], *item["q2"], *item["q3"], *item["q4"],
                f"=SUM(D{row_idx}:F{row_idx})",
                f"=SUM(G{row_idx}:I{row_idx})",
                f"=SUM(J{row_idx}:L{row_idx})",
                f"=SUM(M{row_idx}:O{row_idx})",
                f"=SUM(D{row_idx}:O{row_idx})"
            ])

            style_row(ws.max_row)
            format_numeric_row(ws.max_row)
            direct_item_rows.append(ws.max_row)
            sl += 1

        # Subheads with Roman numbering
        sub_counter = 1
        for sub in head.get("sub_heads", []):
            roman_index = to_roman(sub_counter)

            ws.append(["", f"{roman_index}. {sub['name'].upper()}"])
            sub_row = ws.max_row
            ws.merge_cells(start_row=sub_row, start_column=2, end_row=sub_row, end_column=20)
            style_row(sub_row, subhead_fill, bold)

            sub_item_rows = []

            for item in sub.get("items", []):
                row_idx = ws.max_row + 1

                item_sub = (item.get("sub_head_of_expense") or "").strip()
                current_sub = sub["name"].strip()

                if item_sub == current_sub:
                    head_display = ""
                elif item_sub:
                    head_display = item_sub
                else:
                    head_display = head["name"]

                ws.append([
                    sl, head_display, item["name"],
                    *item["q1"], *item["q2"], *item["q3"], *item["q4"],
                    f"=SUM(D{row_idx}:F{row_idx})",
                    f"=SUM(G{row_idx}:I{row_idx})",
                    f"=SUM(J{row_idx}:L{row_idx})",
                    f"=SUM(M{row_idx}:O{row_idx})",
                    f"=SUM(D{row_idx}:O{row_idx})"
                ])

                style_row(ws.max_row)
                format_numeric_row(ws.max_row)
                sub_item_rows.append(ws.max_row)
                sl += 1

            if sub_item_rows:
                ws.append([
                    "", f"TOTAL - {sub['name']}", "",
                    *[build_formula(col, sub_item_rows) for col in list("DEFGHIJKLMNOPQRST")]
                ])
                style_row(ws.max_row, subtotal_fill, bold)
                format_numeric_row(ws.max_row)
                sub_total_rows.append(ws.max_row)

            sub_counter += 1

        total_rows = sub_total_rows if sub_total_rows else direct_item_rows

        if total_rows:
            ws.append([
                "", f"TOTAL - {head['name']}", "",
                *[build_formula(col, total_rows) for col in list("DEFGHIJKLMNOPQRST")]
            ])
            style_row(ws.max_row, head_total_fill, bold)
            format_numeric_row(ws.max_row)
            head_total_rows.append(ws.max_row)

    if head_total_rows:
        ws.append([
            "", "GRAND TOTAL", "",
            *[build_formula(col, head_total_rows) for col in list("DEFGHIJKLMNOPQRST")]
        ])
        style_row(ws.max_row, grand_fill, bold)
        format_numeric_row(ws.max_row)

    # ================= AUTO COLUMN WIDTH =================
    for column_cells in ws.columns:
        max_length = 0
        column_letter = get_column_letter(column_cells[0].column)

        for cell in column_cells:
            try:
                if cell.value is None:
                    continue

                if isinstance(cell.value, (int, float)):
                    display_value = f"{cell.value:,.2f}"
                elif isinstance(cell.value, str) and cell.value.startswith("="):
                    display_value = "99,99,99,99,999.00"
                else:
                    display_value = str(cell.value)

                max_length = max(max_length, len(display_value))

            except:
                pass

        ws.column_dimensions[column_letter].width = min(max_length + 3, 60)

    # Keep Sl # small
    ws.column_dimensions["A"].width = 6

    stream = io.BytesIO()
    wb.save(stream)
    stream.seek(0)

    frappe.response["filename"] = f"Phase_Sheet_{financial_year}.xlsx"
    frappe.response["filecontent"] = stream.getvalue()
    frappe.response["type"] = "binary"
# * ==============================================================  Import template Export  =====================================================================================
@frappe.whitelist()
def download_finance_budget_import_template(user):

    if not user:
        frappe.throw(_("User is required"))

    # Get Finance User Access
    doc_name = frappe.db.get_value(
        "Finance user access",
        {"user": user},
        "name"
    )

    if not doc_name:
        frappe.throw(_("No Finance User Access found"))

    access_doc = frappe.get_doc("Finance user access", doc_name)

    # Get Import Template ID from Finance User Access
    if not access_doc.import_template_id:
        frappe.throw(_("Import Template not linked in Finance User Access"))

    import_template = frappe.get_doc(
        "Import Templates",
        access_doc.import_template_id
    )

    template_items = import_template.import_template_item_list

    if not template_items:
        frappe.throw(_("No Import Template Items found"))

    financial_year = frappe.db.get_single_value(
        "Master Settings",
        "current_financial_year"
    )

    headers = [
        "Entity / Unit",
        "Entity / Unit Description",
        "Cost Center",
        "Cost Center(Original)",
        "Cost Center Description",
        "Location code",
        "Location code(Original)",
        "Function / Sub Unit / Division",
        "State",
        "Financial year",
        "Uploaded By",
        "Type of expense ID (Budget Amounts)",
        "Head of expense (Budget Amounts)",
        "Sub head of expense (Budget Amounts)",
        "Type of expense (Budget Amounts)",
        "April (Budget Amounts)",
        "May (Budget Amounts)",
        "June (Budget Amounts)",
        "July (Budget Amounts)",
        "August (Budget Amounts)",
        "September (Budget Amounts)",
        "October (Budget Amounts)",
        "November (Budget Amounts)",
        "December (Budget Amounts)",
        "January (Budget Amounts)",
        "February (Budget Amounts)",
        "March (Budget Amounts)",
        "Quarter 1 Total Amount (Budget Amounts)",
        "Quarter 2 Total Amount (Budget Amounts)",
        "Quarter 3 Total Amount (Budget Amounts)",
        "Quarter 4 Total Amount (Budget Amounts)",
        "Year Total Amount (Budget Amounts)"
    ]

    from openpyxl import Workbook
    from openpyxl.styles import Font, Protection
    from io import BytesIO
    import datetime

    wb = Workbook()
    ws = wb.active
    ws.title = "Finance Budget Import"

    ws.append(headers)

    for cell in ws[1]:
        cell.font = Font(bold=True)

    ws.freeze_panes = "A2"

    row_index = 2

    for mapping in access_doc.mapping:

        first_row = True

        for item in template_items:

            if first_row:
                parent_values = [
                    mapping.unit,
                    mapping.unit_description,
                    mapping.cost_center,
                    mapping.cost_center_erp,
                    mapping.cost_center_description,
                    mapping.location_code,
                    mapping.location_code_erp,
                    mapping.location_description,
                    mapping.state,
                    financial_year,
                    user
                ]
                first_row = False
            else:
                parent_values = [""] * 11

            ws.append(parent_values + [
                item.type_of_expense_id,
                item.head_of_expense,
                item.sub_head_of_expense,
                item.type_of_expense,
                0.00, 0.00, 0.00,
                0.00, 0.00, 0.00,
                0.00, 0.00, 0.00,
                0.00, 0.00, 0.00,
                0.00, 0.00, 0.00, 0.00, 0.00
            ])

            # Quarter formulas
            ws[f"AB{row_index}"] = f"=SUM(P{row_index}:R{row_index})"
            ws[f"AC{row_index}"] = f"=SUM(S{row_index}:U{row_index})"
            ws[f"AD{row_index}"] = f"=SUM(V{row_index}:X{row_index})"
            ws[f"AE{row_index}"] = f"=SUM(Y{row_index}:AA{row_index})"

            # Year total = Sum of quarters
            ws[f"AF{row_index}"] = f"=SUM(AB{row_index}:AE{row_index})"

            # Format numbers
            for col in range(16, 33):
                ws.cell(row=row_index, column=col).number_format = '0.00'

            row_index += 1

    # Lock everything
    for row in ws.iter_rows(min_row=1, max_row=row_index - 1):
        for cell in row:
            cell.protection = Protection(locked=True)

    # Unlock only monthly columns (April–March)
    for row in ws.iter_rows(min_row=2, max_row=row_index - 1, min_col=16, max_col=27):
        for cell in row:
            cell.protection = Protection(locked=False)

    ws.protection.sheet = True
    ws.protection.password = "[REDACTED-PASSWORD]"

    # Auto column width
    for column in ws.columns:
        max_length = 0
        column_letter = column[0].column_letter
        for cell in column:
            if cell.value:
                max_length = max(max_length, len(str(cell.value)))
        ws.column_dimensions[column_letter].width = max_length + 2

    output = BytesIO()
    wb.save(output)
    output.seek(0)

    current_date = datetime.datetime.now().strftime("%Y-%m-%d")
    frappe.response["filename"] = f"Budget_mis_Import_{current_date}.xlsx"
    frappe.response["filecontent"] = output.getvalue()
    frappe.response["type"] = "download"

