from annual_budget.api.consolidated_budget_report import get_consolidated_report
import frappe
from frappe import _
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side,Protection
from openpyxl.utils import get_column_letter
from frappe.desk.page.setup_wizard.install_fixtures import _
from io import BytesIO
import datetime

@frappe.whitelist()
def download_phase_sheet_excel(financial_year, units):
	"""
	Generates Phase Sheet Excel with:
	- Exact rowspan / colspan
	- Header background colors
	- Merged cells
	- Uniform row height
	- Smooth scrolling
	"""

	data = frappe.call(
		"annual_budget.api.phase_sheet.get_consolidated_report",
		financial_year=financial_year,
		units=units
	)

	expense_heads = data or []

	wb = Workbook()
	ws = wb.active
	ws.title = "Phase Sheet"

	# ------------------ STYLES ------------------

	thin = Side(style="thin")
	border = Border(left=thin, right=thin, top=thin, bottom=thin)

	center = Alignment(horizontal="center", vertical="center", wrap_text=True)
	left = Alignment(horizontal="left", vertical="center", wrap_text=True)

	main_header_fill = PatternFill("solid", fgColor="0076B6")
	sub_header_fill = PatternFill("solid", fgColor="F26B21")
	head_fill = PatternFill("solid", fgColor="E8F4FB")
	sub_head_fill = PatternFill("solid", fgColor="F9F2E8")
	grand_fill = PatternFill("solid", fgColor="003B63")

	header_font = Font(color="FFFFFF", bold=True)
	bold_font = Font(bold=True)

	# ------------------ COLUMN SETUP ------------------

	quarters = [
		("Q1", ["April", "May", "June"]),
		("Q2", ["July", "August", "September"]),
		("Q3", ["October", "November", "December"]),
		("Q4", ["January", "February", "March"]),
	]

	col = 1
	ws.merge_cells(start_row=1, start_column=col, end_row=2, end_column=col)
	ws.cell(row=1, column=col, value="Expense Head / Line Item")
	col += 1

	ws.merge_cells(start_row=1, start_column=col, end_row=2, end_column=col)
	ws.cell(row=1, column=col, value="GL Code")
	col += 1

	for q, months in quarters:
		ws.merge_cells(start_row=1, start_column=col, end_row=1, end_column=col + 2)
		ws.cell(row=1, column=col, value=q)

		for m in months:
			ws.cell(row=2, column=col, value=m)
			col += 1

	ws.merge_cells(start_row=1, start_column=col, end_row=2, end_column=col)
	ws.cell(row=1, column=col, value="Total")

	max_col = col

	# ------------------ HEADER STYLING ------------------

	for r in (1, 2):
		for c in range(1, max_col + 1):
			cell = ws.cell(row=r, column=c)
			cell.font = header_font
			cell.alignment = center
			cell.border = border
			cell.fill = main_header_fill if r == 1 else sub_header_fill

	row = 3

	# ------------------ DATA ROWS ------------------

	def write_row(values, fill=None, bold=False):
		nonlocal row
		for c, val in enumerate(values, start=1):
			cell = ws.cell(row=row, column=c, value=val)
			cell.border = border
			cell.alignment = left if c <= 2 else center
			if bold:
				cell.font = bold_font
			if fill:
				cell.fill = fill
		row += 1

	grand_totals = {
		"Q1": [0, 0, 0],
		"Q2": [0, 0, 0],
		"Q3": [0, 0, 0],
		"Q4": [0, 0, 0],
		"total": 0,
	}

	for head in expense_heads:
		head_total = 0
		values = [head["name"], "-"]

		for q, _ in quarters:
			q_vals = head[q.lower()]
			values.extend(q_vals)
			head_total += sum(q_vals)
			for i in range(3):
				grand_totals[q][i] += q_vals[i]

		values.append(head_total)
		grand_totals["total"] += head_total
		write_row(values, fill=head_fill, bold=True)

		for item in head.get("items", []):
			item_total = 0
			values = ["   " + item["name"], item["gl_code"]]

			for q, _ in quarters:
				q_vals = item[q.lower()]
				values.extend(q_vals)
				item_total += sum(q_vals)

			values.append(item_total)
			write_row(values)

		for sub in head.get("sub_heads", []):
			sub_total = 0
			values = ["  " + sub["name"], "-"]  # ▶ removed

			for q, _ in quarters:
				q_vals = sub[q.lower()]
				values.extend(q_vals)
				sub_total += sum(q_vals)

			values.append(sub_total)
			write_row(values, fill=sub_head_fill, bold=True)

			for item in sub.get("items", []):
				item_total = 0
				values = ["      " + item["name"], item["gl_code"]]

				for q, _ in quarters:
					q_vals = item[q.lower()]
					values.extend(q_vals)
					item_total += sum(q_vals)

				values.append(item_total)
				write_row(values)

	# ------------------ GRAND TOTAL ------------------

	ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=2)
	ws.cell(row=row, column=1, value="GRAND TOTAL")

	col = 3
	for q, _ in quarters:
		total = sum(grand_totals[q])
		ws.merge_cells(start_row=row, start_column=col, end_row=row, end_column=col + 2)
		ws.cell(row=row, column=col, value=total)
		col += 3

	ws.cell(row=row, column=col, value=grand_totals["total"])

	for c in range(1, max_col + 1):
		cell = ws.cell(row=row, column=c)
		cell.fill = grand_fill
		cell.font = header_font
		cell.border = border
		cell.alignment = center

	# ------------------ COLUMN WIDTH ------------------

	for c in range(1, max_col + 1):
		ws.column_dimensions[get_column_letter(c)].width = 18

	# ------------------ ROW HEIGHT (UNIFORM) ------------------

	DEFAULT_ROW_HEIGHT = 22
	for r in range(1, ws.max_row + 1):
		ws.row_dimensions[r].height = DEFAULT_ROW_HEIGHT

	# ------------------ SCROLL / PAGE SETTINGS ------------------

	ws.freeze_panes = "C3"
	ws.page_setup.fitToWidth = 1
	ws.page_setup.fitToHeight = False
	ws.sheet_view.zoomScale = 100
	ws.sheet_view.showGridLines = False

	# ------------------ RESPONSE ------------------

	file = BytesIO()
	wb.save(file)
	file.seek(0)

	frappe.response["filename"] = "Phase_Sheet.xlsx"
	frappe.response["filecontent"] = file.read()
	frappe.response["type"] = "binary"

#good

# @frappe.whitelist()
# def export_phase_sheet_excel(financial_year=None, units=None):
#     import frappe, io
#     from openpyxl import Workbook
#     from openpyxl.styles import Font, Alignment
#     from annual_budget.api.phase_sheet import get_consolidated_report

#     # ===============================
#     # Fetch Data
#     # ===============================
#     data = get_consolidated_report(
#         financial_year=financial_year,
#         units=units
#     )

#     # ===============================
#     # Workbook Setup
#     # ===============================
#     wb = Workbook()
#     ws = wb.active
#     ws.title = "Phase Sheet"

#     bold = Font(bold=True)
#     center = Alignment(horizontal="center")

#     COL_END = 21   # A:U

#     def merge_title(row, text):
#         ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=COL_END)
#         cell = ws.cell(row=row, column=1)
#         cell.value = text.upper()
#         cell.font = bold
#         cell.alignment = center

#     def q_total(q):
#         return sum(q)

#     def y_total(q1, q2, q3, q4):
#         return q_total(q1) + q_total(q2) + q_total(q3) + q_total(q4)

#     # ===============================
#     # Top Info
#     # ===============================
#     ws.append([f"Unit : {units}"])
#     ws["A1"].font = bold
#     ws.append([f"Financial Year : {financial_year}"])
#     ws["A2"].font = bold
#     ws.append([])

#     # ===============================
#     # Column Headers
#     # ===============================
#     headers = [
#         "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "Apr", "May", "Jun",
#         "Jul", "Aug", "Sep",
#         "Oct", "Nov", "Dec",
#         "Jan", "Feb", "Mar",
#         "QTR-1", "QTR-2", "QTR-3", "QTR-4",
#         f"YEAR {financial_year}"
#     ]
#     ws.append(headers)
#     for c in ws[ws.max_row]:
#         c.font = bold

#     row_cursor = ws.max_row + 1
#     sl_no = 1

#     # ===============================
#     # Grand Totals
#     # ===============================
#     gq1 = [0, 0, 0]
#     gq2 = [0, 0, 0]
#     gq3 = [0, 0, 0]
#     gq4 = [0, 0, 0]

#     # ===============================
#     # Data Rows
#     # ===============================
#     for head in data:
#         # ---------- MAIN HEAD ----------
#         merge_title(row_cursor, head["name"])
#         row_cursor += 1

#         # Main head totals
#         hq1 = [0, 0, 0]
#         hq2 = [0, 0, 0]
#         hq3 = [0, 0, 0]
#         hq4 = [0, 0, 0]

#         # ---------- WITH SUB HEADS ----------
#         if head.get("sub_heads"):
#             for sub in head["sub_heads"]:

#                 # Sub head title
#                 merge_title(row_cursor, sub["name"])
#                 row_cursor += 1

#                 # Sub head totals
#                 sq1 = [0, 0, 0]
#                 sq2 = [0, 0, 0]
#                 sq3 = [0, 0, 0]
#                 sq4 = [0, 0, 0]

#                 for item in sub["items"]:
#                     q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]

#                     # Dynamic HEAD OF EXPENSE (Column B)
#                     head_of_expense = (
#                         item.get("sub_head_of_expense")
#                         or item.get("sub_head")
#                         or sub["name"]
#                         or head["name"]
#                     )

#                     ws.append([
#                         sl_no,
#                         head_of_expense.upper(),   # Column B dynamic
#                         item["name"],
#                         q1[0], q1[1], q1[2],
#                         q2[0], q2[1], q2[2],
#                         q3[0], q3[1], q3[2],
#                         q4[0], q4[1], q4[2],
#                         q_total(q1),
#                         q_total(q2),
#                         q_total(q3),
#                         q_total(q4),
#                         y_total(q1, q2, q3, q4)
#                     ])
#                     sl_no += 1

#                     # Totals accumulation
#                     for i in range(3):
#                         sq1[i] += q1[i]
#                         sq2[i] += q2[i]
#                         sq3[i] += q3[i]
#                         sq4[i] += q4[i]

#                         hq1[i] += q1[i]
#                         hq2[i] += q2[i]
#                         hq3[i] += q3[i]
#                         hq4[i] += q4[i]

#                         gq1[i] += q1[i]
#                         gq2[i] += q2[i]
#                         gq3[i] += q3[i]
#                         gq4[i] += q4[i]

#                 # ------ TOTAL SUB HEAD ------
#                 ws.append([
#                     "",
#                     f"TOTAL {sub['name'].upper()}",
#                     "",
#                     sq1[0], sq1[1], sq1[2],
#                     sq2[0], sq2[1], sq2[2],
#                     sq3[0], sq3[1], sq3[2],
#                     sq4[0], sq4[1], sq4[2],
#                     q_total(sq1),
#                     q_total(sq2),
#                     q_total(sq3),
#                     q_total(sq4),
#                     y_total(sq1, sq2, sq3, sq4)
#                 ])
#                 for c in ws[ws.max_row]:
#                     c.font = bold

#                 row_cursor = ws.max_row + 2

#         # ---------- WITHOUT SUB HEADS ----------
#         else:
#             for item in head["items"]:
#                 q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]

#                 head_of_expense = (
#                     item.get("sub_head_of_expense")
#                     or item.get("sub_head")
#                     or head["name"]
#                 )

#                 ws.append([
#                     sl_no,
#                     head_of_expense.upper(),
#                     item["name"],
#                     q1[0], q1[1], q1[2],
#                     q2[0], q2[1], q2[2],
#                     q3[0], q3[1], q3[2],
#                     q4[0], q4[1], q4[2],
#                     q_total(q1),
#                     q_total(q2),
#                     q_total(q3),
#                     q_total(q4),
#                     y_total(q1, q2, q3, q4)
#                 ])
#                 sl_no += 1

#                 for i in range(3):
#                     hq1[i] += q1[i]
#                     hq2[i] += q2[i]
#                     hq3[i] += q3[i]
#                     hq4[i] += q4[i]

#                     gq1[i] += q1[i]
#                     gq2[i] += q2[i]
#                     gq3[i] += q3[i]
#                     gq4[i] += q4[i]

#         # ------ TOTAL MAIN HEAD ------
#         ws.append([
#             "",
#             f"TOTAL {head['name'].upper()}",
#             "",
#             hq1[0], hq1[1], hq1[2],
#             hq2[0], hq2[1], hq2[2],
#             hq3[0], hq3[1], hq3[2],
#             hq4[0], hq4[1], hq4[2],
#             q_total(hq1),
#             q_total(hq2),
#             q_total(hq3),
#             q_total(hq4),
#             y_total(hq1, hq2, hq3, hq4)
#         ])
#         for c in ws[ws.max_row]:
#             c.font = bold

#         row_cursor = ws.max_row + 2

#     # ===============================
#     # GRAND TOTAL
#     # ===============================
#     merge_title(row_cursor, "GRAND TOTAL")
#     row_cursor += 1

#     ws.append([
#         "", "", "",
#         gq1[0], gq1[1], gq1[2],
#         gq2[0], gq2[1], gq2[2],
#         gq3[0], gq3[1], gq3[2],
#         gq4[0], gq4[1], gq4[2],
#         q_total(gq1),
#         q_total(gq2),
#         q_total(gq3),
#         q_total(gq4),
#         y_total(gq1, gq2, gq3, gq4)
#     ])
#     for c in ws[ws.max_row]:
#         c.font = bold

#     # ===============================
#     # SAVE FILE IN FRAPPE
#     # ===============================
#     stream = io.BytesIO()
#     wb.save(stream)
#     stream.seek(0)

#     file = frappe.get_doc({
#         "doctype": "File",
#         "file_name": f"Phase_Sheet_{financial_year}.xlsx",
#         "content": stream.read(),
#         "is_private": 0
#     })
#     file.insert(ignore_permissions=True)

#     return {
#         "file_url": file.file_url,
#         "file_name": file.file_name
#     }


# @frappe.whitelist()
# def export_phase_sheet_excel(financial_year=None, units=None):
#     import frappe, io
#     from openpyxl import Workbook
#     from openpyxl.styles import Font, Alignment
#     from annual_budget.api.phase_sheet import get_consolidated_report

#     # ===============================
#     # Fetch Data
#     # ===============================
#     data = get_consolidated_report(
#         financial_year=financial_year,
#         units=units
#     )

#     # ===============================
#     # Workbook Setup
#     # ===============================
#     wb = Workbook()
#     ws = wb.active
#     ws.title = "Phase Sheet"

#     bold = Font(bold=True)
#     center = Alignment(horizontal="center")

#     COL_END = 21  # A:U

#     def merge_title(row, text):
#         ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=COL_END)
#         cell = ws.cell(row=row, column=1)
#         cell.value = text.upper()
#         cell.font = bold
#         cell.alignment = center

#     def q_total(q):
#         return sum(q)

#     def y_total(q1, q2, q3, q4):
#         return q_total(q1) + q_total(q2) + q_total(q3) + q_total(q4)

#     # ===============================
#     # Top Info
#     # ===============================
#     ws.append([f"Unit : {units}"])
#     ws["A1"].font = bold
#     ws.append([f"Financial Year : {financial_year}"])
#     ws["A2"].font = bold
#     ws.append([])

#     # ===============================
#     # Column Headers
#     # ===============================
#     headers = [
#         "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "Apr", "May", "Jun",
#         "Jul", "Aug", "Sep",
#         "Oct", "Nov", "Dec",
#         "Jan", "Feb", "Mar",
#         "QTR-1", "QTR-2", "QTR-3", "QTR-4",
#         f"YEAR {financial_year}"
#     ]
#     ws.append(headers)
#     for c in ws[ws.max_row]:
#         c.font = bold

#     row_cursor = ws.max_row + 1
#     sl_no = 1

#     # ===============================
#     # Grand Totals
#     # ===============================
#     gq1 = [0, 0, 0]
#     gq2 = [0, 0, 0]
#     gq3 = [0, 0, 0]
#     gq4 = [0, 0, 0]

#     # ===============================
#     # Data Rows
#     # ===============================
#     for head in data:
#         # ---------- MAIN HEAD ----------
#         merge_title(row_cursor, head["name"])
#         row_cursor += 1

#         # Main head totals
#         hq1 = [0, 0, 0]
#         hq2 = [0, 0, 0]
#         hq3 = [0, 0, 0]
#         hq4 = [0, 0, 0]

#         # ---------- WITH SUB HEADS ----------
#         if head.get("sub_heads"):
#             for sub in head["sub_heads"]:

#                 # Sub head title
#                 merge_title(row_cursor, sub["name"])
#                 row_cursor += 1

#                 # Sub head totals
#                 sq1 = [0, 0, 0]
#                 sq2 = [0, 0, 0]
#                 sq3 = [0, 0, 0]
#                 sq4 = [0, 0, 0]

#                 for item in sub["items"]:
#                     q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]

#                     # Column B logic (preserve API formatting, no .upper())
#                     head_of_expense = (
#                         item.get("sub_head_of_expense")
#                         or item.get("sub_head")
#                         or sub["name"]
#                         or head["name"]
#                     )

#                     ws.append([
#                         sl_no,
#                         head_of_expense,      # case preserved from API
#                         item["name"],
#                         q1[0], q1[1], q1[2],
#                         q2[0], q2[1], q2[2],
#                         q3[0], q3[1], q3[2],
#                         q4[0], q4[1], q4[2],
#                         q_total(q1),
#                         q_total(q2),
#                         q_total(q3),
#                         q_total(q4),
#                         y_total(q1, q2, q3, q4)
#                     ])
#                     sl_no += 1

#                     # Totals accumulation
#                     for i in range(3):
#                         sq1[i] += q1[i]
#                         sq2[i] += q2[i]
#                         sq3[i] += q3[i]
#                         sq4[i] += q4[i]

#                         hq1[i] += q1[i]
#                         hq2[i] += q2[i]
#                         hq3[i] += q3[i]
#                         hq4[i] += q4[i]

#                         gq1[i] += q1[i]
#                         gq2[i] += q2[i]
#                         gq3[i] += q3[i]
#                         gq4[i] += q4[i]

#                 # ------ TOTAL SUB HEAD ------
#                 ws.append([
#                     "",
#                     f"TOTAL {sub['name'].upper()}",
#                     "",
#                     sq1[0], sq1[1], sq1[2],
#                     sq2[0], sq2[1], sq2[2],
#                     sq3[0], sq3[1], sq3[2],
#                     sq4[0], sq4[1], sq4[2],
#                     q_total(sq1),
#                     q_total(sq2),
#                     q_total(sq3),
#                     q_total(sq4),
#                     y_total(sq1, sq2, sq3, sq4)
#                 ])
#                 for c in ws[ws.max_row]:
#                     c.font = bold

#                 row_cursor = ws.max_row + 2

#         # ---------- WITHOUT SUB HEADS ----------
#         else:
#             for item in head["items"]:
#                 q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]

#                 # Column B logic without forcing uppercase
#                 head_of_expense = (
#                     item.get("sub_head_of_expense")
#                     or item.get("sub_head")
#                     or head["name"]
#                 )

#                 ws.append([
#                     sl_no,
#                     head_of_expense,      # case preserved
#                     item["name"],
#                     q1[0], q1[1], q1[2],
#                     q2[0], q2[1], q2[2],
#                     q3[0], q3[1], q3[2],
#                     q4[0], q4[1], q4[2],
#                     q_total(q1),
#                     q_total(q2),
#                     q_total(q3),
#                     q_total(q4),
#                     y_total(q1, q2, q3, q4)
#                 ])
#                 sl_no += 1

#                 for i in range(3):
#                     hq1[i] += q1[i]
#                     hq2[i] += q2[i]
#                     hq3[i] += q3[i]
#                     hq4[i] += q4[i]

#                     gq1[i] += q1[i]
#                     gq2[i] += q2[i]
#                     gq3[i] += q3[i]
#                     gq4[i] += q4[i]

#         # ------ TOTAL MAIN HEAD ------
#         ws.append([
#             "",
#             f"TOTAL {head['name'].upper()}",
#             "",
#             hq1[0], hq1[1], hq1[2],
#             hq2[0], hq2[1], hq2[2],
#             hq3[0], hq3[1], hq3[2],
#             hq4[0], hq4[1], hq4[2],
#             q_total(hq1),
#             q_total(hq2),
#             q_total(hq3),
#             q_total(hq4),
#             y_total(hq1, hq2, hq3, hq4)
#         ])
#         for c in ws[ws.max_row]:
#             c.font = bold

#         row_cursor = ws.max_row + 2

#     # ===============================
#     # GRAND TOTAL
#     # ===============================
#     merge_title(row_cursor, "GRAND TOTAL")
#     row_cursor += 1

#     ws.append([
#         "", "", "",
#         gq1[0], gq1[1], gq1[2],
#         gq2[0], gq2[1], gq2[2],
#         gq3[0], gq3[1], gq3[2],
#         gq4[0], gq4[1], gq4[2],
#         q_total(gq1),
#         q_total(gq2),
#         q_total(gq3),
#         q_total(gq4),
#         y_total(gq1, gq2, gq3, gq4)
#     ])
#     for c in ws[ws.max_row]:
#         c.font = bold

#     # ===============================
#     # SAVE FILE IN FRAPPE
#     # ===============================
#     stream = io.BytesIO()
#     wb.save(stream)
#     stream.seek(0)

#     file = frappe.get_doc({
#         "doctype": "File",
#         "file_name": f"Phase_Sheet_{financial_year}.xlsx",
#         "content": stream.read(),
#         "is_private": 0
#     })
#     file.insert(ignore_permissions=True)

#     return {
#         "file_url": file.file_url,
#         "file_name": file.file_name
#     }


# fainal good 
# @frappe.whitelist()
# def export_phase_sheet_excel(financial_year=None, units=None):
#     import frappe, io
#     from openpyxl import Workbook
#     from openpyxl.styles import Font, Alignment
#     from annual_budget.api.phase_sheet import get_consolidated_report

#     data = get_consolidated_report(financial_year=financial_year, units=units)

#     wb = Workbook()
#     ws = wb.active
#     ws.title = "Phase Sheet"

#     bold = Font(bold=True)
#     center = Alignment(horizontal="center")
#     COL_END = 21  # A:U

#     # ---------------- Helpers ----------------
#     def merge_title(row, text):
#         ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=COL_END)
#         cell = ws.cell(row=row, column=1)
#         cell.value = text.upper()
#         cell.font = bold
#         cell.alignment = center

#     def q_total(q):
#         return sum(q)

#     def y_total(q1, q2, q3, q4):
#         return q_total(q1) + q_total(q2) + q_total(q3) + q_total(q4)

#     # ---------------- Top Info ----------------
#     ws.append([f"Unit : {units}"])
#     ws["A1"].font = bold
#     ws.append([f"Financial Year : {financial_year}"])
#     ws["A2"].font = bold
#     ws.append([])

#     # ---------------- Headers ----------------
#     headers = [
#         "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "Apr", "May", "Jun",
#         "Jul", "Aug", "Sep",
#         "Oct", "Nov", "Dec",
#         "Jan", "Feb", "Mar",
#         "QTR-1", "QTR-2", "QTR-3", "QTR-4",
#         f"YEAR {financial_year}"
#     ]
#     ws.append(headers)
#     for c in ws[ws.max_row]:
#         c.font = bold

#     row_cursor = ws.max_row + 1
#     sl_no = 1

#     # ---------------- GRAND TOTAL (Quarter-wise) ----------------
#     gq1 = [0, 0, 0]
#     gq2 = [0, 0, 0]
#     gq3 = [0, 0, 0]
#     gq4 = [0, 0, 0]

#     # ---------------- TOTAL OPERATING EXPENSES ACCUMULATOR ----------------
#     special_operating = {
#         "months": [0] * 12,
#         "quarters": [0, 0, 0, 0],
#         "year": 0
#     }

#     operating_heads = [
#         "MEDICAL EXPENSES",
#         "OTHER OPERATING EXPENSES",
#         "PROGRAM EXPENSES",
#         "TRAVEL EXPENSES",
#         "PEOPLE EXPENSES",
#         "PARTNER EXPENSES",
#         "STUDENT SUPPORT EXPENSES"
#     ]

#     def add_to_special(q1, q2, q3, q4):
#         months = [
#             q1[0], q1[1], q1[2],
#             q2[0], q2[1], q2[2],
#             q3[0], q3[1], q3[2],
#             q4[0], q4[1], q4[2]
#         ]

#         quarters = [
#             q_total(q1),
#             q_total(q2),
#             q_total(q3),
#             q_total(q4)
#         ]

#         for i in range(12):
#             special_operating["months"][i] += months[i]

#         for i in range(4):
#             special_operating["quarters"][i] += quarters[i]

#         special_operating["year"] += y_total(q1, q2, q3, q4)

#     # ===============================
#     # Data Rows
#     # ===============================
#     for head in data:

#         merge_title(row_cursor, head["name"])
#         row_cursor += 1

#         hq1 = [0, 0, 0]
#         hq2 = [0, 0, 0]
#         hq3 = [0, 0, 0]
#         hq4 = [0, 0, 0]

#         # ---------- WITH SUB HEADS ----------
#         if head.get("sub_heads"):
#             for sub in head["sub_heads"]:

#                 merge_title(row_cursor, sub["name"])
#                 row_cursor += 1

#                 sq1 = [0, 0, 0]
#                 sq2 = [0, 0, 0]
#                 sq3 = [0, 0, 0]
#                 sq4 = [0, 0, 0]

#                 for item in sub["items"]:
#                     q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]

#                     head_of_expense = (
#                         item.get("sub_head_of_expense")
#                         or item.get("sub_head")
#                         or sub["name"]
#                         or head["name"]
#                     )

#                     ws.append([
#                         sl_no,
#                         head_of_expense,
#                         item["name"],
#                         q1[0], q1[1], q1[2],
#                         q2[0], q2[1], q2[2],
#                         q3[0], q3[1], q3[2],
#                         q4[0], q4[1], q4[2],
#                         q_total(q1),
#                         q_total(q2),
#                         q_total(q3),
#                         q_total(q4),
#                         y_total(q1, q2, q3, q4)
#                     ])
#                     sl_no += 1

#                     for i in range(3):
#                         sq1[i] += q1[i]
#                         sq2[i] += q2[i]
#                         sq3[i] += q3[i]
#                         sq4[i] += q4[i]

#                         hq1[i] += q1[i]
#                         hq2[i] += q2[i]
#                         hq3[i] += q3[i]
#                         hq4[i] += q4[i]

#                         gq1[i] += q1[i]
#                         gq2[i] += q2[i]
#                         gq3[i] += q3[i]
#                         gq4[i] += q4[i]

#                 ws.append([
#                     "",
#                     f"TOTAL {sub['name'].upper()}",
#                     "",
#                     sq1[0], sq1[1], sq1[2],
#                     sq2[0], sq2[1], sq2[2],
#                     sq3[0], sq3[1], sq3[2],
#                     sq4[0], sq4[1], sq4[2],
#                     q_total(sq1),
#                     q_total(sq2),
#                     q_total(sq3),
#                     q_total(sq4),
#                     y_total(sq1, sq2, sq3, sq4)
#                 ])
#                 for c in ws[ws.max_row]:
#                     c.font = bold

#                 # Add sub-head totals to TOTAL OPERATING if applicable
#                 if sub["name"].upper() in operating_heads:
#                     add_to_special(sq1, sq2, sq3, sq4)

#                 row_cursor = ws.max_row + 2

#         # ---------- WITHOUT SUB HEADS ----------
#         else:
#             for item in head["items"]:
#                 q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]

#                 head_of_expense = (
#                     item.get("sub_head_of_expense")
#                     or item.get("sub_head")
#                     or head["name"]
#                 )

#                 ws.append([
#                     sl_no,
#                     head_of_expense,
#                     item["name"],
#                     q1[0], q1[1], q1[2],
#                     q2[0], q2[1], q2[2],
#                     q3[0], q3[1], q3[2],
#                     q4[0], q4[1], q4[2],
#                     q_total(q1),
#                     q_total(q2),
#                     q_total(q3),
#                     q_total(q4),
#                     y_total(q1, q2, q3, q4)
#                 ])
#                 sl_no += 1

#                 for i in range(3):
#                     hq1[i] += q1[i]
#                     hq2[i] += q2[i]
#                     hq3[i] += q3[i]
#                     hq4[i] += q4[i]

#                     gq1[i] += q1[i]
#                     gq2[i] += q2[i]
#                     gq3[i] += q3[i]
#                     gq4[i] += q4[i]

#         # ------ TOTAL MAIN HEAD (skip OPERATING EXPENSES itself) ------
#         total_head_label = f"TOTAL {head['name'].upper()}"

#         if total_head_label == "TOTAL OPERATING EXPENSES":
#             print("SKIPPING HEAD TOTAL ROW =>", total_head_label)
#         else:
#             ws.append([
#                 "",
#                 total_head_label,
#                 "",
#                 hq1[0], hq1[1], hq1[2],
#                 hq2[0], hq2[1], hq2[2],
#                 hq3[0], hq3[1], hq3[2],
#                 hq4[0], hq4[1], hq4[2],
#                 q_total(hq1),
#                 q_total(hq2),
#                 q_total(hq3),
#                 q_total(hq4),
#                 y_total(hq1, hq2, hq3, hq4)
#             ])
#             for c in ws[ws.max_row]:
#                 c.font = bold

#             # Add main-head totals to TOTAL OPERATING if applicable
#             if head["name"].upper() in operating_heads:
#                 add_to_special(hq1, hq2, hq3, hq4)

#         row_cursor = ws.max_row + 2

#     # ======================================================
#     # WRITE TOTAL OPERATING EXPENSES (ONLY ONCE)
#     # ======================================================
#     print("WRITING FINAL TOTAL OPERATING EXPENSES")

#     ws.append([
#         "",
#         "TOTAL OPERATING EXPENSES",
#         "",
#         *special_operating["months"],
#         *special_operating["quarters"],
#         special_operating["year"]
#     ])
#     for c in ws[ws.max_row]:
#         c.font = bold

#     # ===============================
#     # GRAND TOTAL
#     # ===============================
#     merge_title(ws.max_row + 2, "GRAND TOTAL")

#     ws.append([
#         "", "GRAND TOTAL", "",
#         gq1[0], gq1[1], gq1[2],
#         gq2[0], gq2[1], gq2[2],
#         gq3[0], gq3[1], gq3[2],
#         gq4[0], gq4[1], gq4[2],
#         q_total(gq1),
#         q_total(gq2),
#         q_total(gq3),
#         q_total(gq4),
#         y_total(gq1, gq2, gq3, gq4)
#     ])
#     for c in ws[ws.max_row]:
#         c.font = bold

#     # ===============================
#     # SAVE FILE IN FRAPPE
#     # ===============================
#     stream = io.BytesIO()
#     wb.save(stream)
#     stream.seek(0)

#     file = frappe.get_doc({
#         "doctype": "File",
#         "file_name": f"Phase_Sheet_{financial_year}.xlsx",
#         "content": stream.read(),
#         "is_private": 0
#     })
#     file.insert(ignore_permissions=True)

#     return {
#         "file_url": file.file_url,
#         "file_name": file.file_name
#     }




# @frappe.whitelist()
# def export_phase_sheet_excel(financial_year=None, units=None):
#     import frappe, io
#     from openpyxl import Workbook
#     from openpyxl.styles import Font, Alignment
#     from annual_budget.api.phase_sheet import get_consolidated_report

#     data = get_consolidated_report(financial_year=financial_year, units=units)

#     wb = Workbook()
#     ws = wb.active
#     ws.title = "Phase Sheet"

#     bold = Font(bold=True)
#     center = Alignment(horizontal="center", vertical="center")

#     # ---------------- Helpers ----------------
#     def q_total(q):
#         return sum(q)

#     def y_total(q1, q2, q3, q4):
#         return q_total(q1) + q_total(q2) + q_total(q3) + q_total(q4)

#     # ---------------- Top Info ----------------
#     ws.append([f"Unit : {units}"])
#     ws["A1"].font = bold
#     ws.append([f"Financial Year : {financial_year}"])
#     ws["A2"].font = bold
#     ws.append([])
#     # -------- ROW 1 : Quarter titles over months --------
#     ws.append([
#         "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "QTR-1", "", "",
#         "QTR-2", "", "",
#         "QTR-3", "", "",
#         "QTR-4", "", "",
#         "QTR-1", "QTR-2", "QTR-3", "QTR-4",
#         "YEAR TOTAL"
#     ])
#     r1 = ws.max_row

#     # Merge month quarter headings (colspan = 3)
#     ws.merge_cells(start_row=r1, start_column=4, end_row=r1, end_column=6)    # Apr-May-Jun
#     ws.merge_cells(start_row=r1, start_column=7, end_row=r1, end_column=9)    # Jul-Aug-Sep
#     ws.merge_cells(start_row=r1, start_column=10, end_row=r1, end_column=12)  # Oct-Nov-Dec
#     ws.merge_cells(start_row=r1, start_column=13, end_row=r1, end_column=15)  # Jan-Feb-Mar

#     for c in ws[r1]:
#         c.font = bold
#         c.alignment = center

#     # -------- ROW 2 : Column titles --------
#     ws.append([
#         "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "Apr", "May", "Jun",
#         "Jul", "Aug", "Sep",
#         "Oct", "Nov", "Dec",
#         "Jan", "Feb", "Mar",
#         "QTR-1", "QTR-2", "QTR-3", "QTR-4",
#         f"YEAR {financial_year}"
#     ])
#     r2 = ws.max_row

#     for c in ws[r2]:
#         c.font = bold
#         c.alignment = center

#     # -------- ROWSPAN (vertical merges) --------
#     ws.merge_cells(start_row=r1, start_column=1, end_row=r2, end_column=1)  # Sl #
#     ws.merge_cells(start_row=r1, start_column=2, end_row=r2, end_column=2)  # Head
#     ws.merge_cells(start_row=r1, start_column=3, end_row=r2, end_column=3)  # Type

#     ws.merge_cells(start_row=r1, start_column=16, end_row=r2, end_column=16)  # QTR-1
#     ws.merge_cells(start_row=r1, start_column=17, end_row=r2, end_column=17)  # QTR-2
#     ws.merge_cells(start_row=r1, start_column=18, end_row=r2, end_column=18)  # QTR-3
#     ws.merge_cells(start_row=r1, start_column=19, end_row=r2, end_column=19)  # QTR-4

#     ws.merge_cells(start_row=r1, start_column=20, end_row=r2, end_column=20)  # YEAR TOTAL

#     # ==========================================================
#     # Start Data Rows
#     # ==========================================================
#     sl_no = 1

#     # GRAND TOTAL accumulators
#     gq1 = [0, 0, 0]
#     gq2 = [0, 0, 0]
#     gq3 = [0, 0, 0]
#     gq4 = [0, 0, 0]
#     # ===============================
#     # TOTAL OPERATING EXPENSES ACCUMULATOR
#     # ===============================
#     special_operating = {
#         "months": [0] * 12,
#         "quarters": [0, 0, 0, 0],
#         "year": 0
#     }

#     operating_heads = [
#         "MEDICAL EXPENSES",
#         "OTHER OPERATING EXPENSES",
#         "PROGRAM EXPENSES",
#         "TRAVEL EXPENSES",
#         "PEOPLE EXPENSES",
#         "PARTNER EXPENSES",
#         "STUDENT SUPPORT EXPENSES"
#     ]

#     def add_to_special(q1, q2, q3, q4):
#         months = [
#             q1[0], q1[1], q1[2],
#             q2[0], q2[1], q2[2],
#             q3[0], q3[1], q3[2],
#             q4[0], q4[1], q4[2]
#         ]
#         quarters = [
#             q_total(q1),
#             q_total(q2),
#             q_total(q3),
#             q_total(q4)
#         ]

#         for i in range(12):
#             special_operating["months"][i] += months[i]

#         for i in range(4):
#             special_operating["quarters"][i] += quarters[i]

#         special_operating["year"] += y_total(q1, q2, q3, q4)

#     # ===============================
#     # DATA ROWS
#     # ===============================
#     for head in data:

#     # Main Head Title (merge from column B to column T, put text in B)
#         ws.append(["", head["name"].upper()])

#         ws.merge_cells(
#             start_row=ws.max_row,
#             start_column=2,   # Column B
#             end_row=ws.max_row,
#             end_column=20     # Column T
#         )

#         cell = ws.cell(row=ws.max_row, column=2)
#         cell.font = bold


#         hq1 = [0, 0, 0]
#         hq2 = [0, 0, 0]
#         hq3 = [0, 0, 0]
#         hq4 = [0, 0, 0]

#         # ---------- WITH SUB HEADS ----------
#         if head.get("sub_heads"):
#             for sub in head["sub_heads"]:

#                 ws.append([sub["name"].upper()])
#                 ws.merge_cells(start_row=ws.max_row, start_column=1, end_row=ws.max_row, end_column=20)
#                 ws.cell(row=ws.max_row, column=1).font = bold
#                 ws.cell(row=ws.max_row, column=1).alignment = center

#                 sq1 = [0, 0, 0]
#                 sq2 = [0, 0, 0]
#                 sq3 = [0, 0, 0]
#                 sq4 = [0, 0, 0]

#                 for item in sub["items"]:
#                     q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]

#                     head_of_expense = (
#                         item.get("sub_head_of_expense")
#                         or item.get("sub_head")
#                         or sub["name"]
#                         or head["name"]
#                     )

#                     ws.append([
#                         sl_no, head_of_expense, item["name"],
#                         q1[0], q1[1], q1[2],
#                         q2[0], q2[1], q2[2],
#                         q3[0], q3[1], q3[2],
#                         q4[0], q4[1], q4[2],
#                         q_total(q1), q_total(q2), q_total(q3), q_total(q4),
#                         y_total(q1, q2, q3, q4)
#                     ])
#                     sl_no += 1

#                     for i in range(3):
#                         sq1[i] += q1[i]
#                         sq2[i] += q2[i]
#                         sq3[i] += q3[i]
#                         sq4[i] += q4[i]

#                         hq1[i] += q1[i]
#                         hq2[i] += q2[i]
#                         hq3[i] += q3[i]
#                         hq4[i] += q4[i]

#                         gq1[i] += q1[i]
#                         gq2[i] += q2[i]
#                         gq3[i] += q3[i]
#                         gq4[i] += q4[i]

#                 # TOTAL SUB HEAD
#                 ws.append([
#                     "", f"TOTAL {sub['name'].upper()}", "",
#                     sq1[0], sq1[1], sq1[2],
#                     sq2[0], sq2[1], sq2[2],
#                     sq3[0], sq3[1], sq3[2],
#                     sq4[0], sq4[1], sq4[2],
#                     q_total(sq1), q_total(sq2), q_total(sq3), q_total(sq4),
#                     y_total(sq1, sq2, sq3, sq4)
#                 ])
#                 for c in ws[ws.max_row]:
#                     c.font = bold

#                 if sub["name"].upper() in operating_heads:
#                     add_to_special(sq1, sq2, sq3, sq4)

#         # ---------- WITHOUT SUB HEADS ----------
#         else:
#             for item in head["items"]:
#                 q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]

#                 head_of_expense = (
#                     item.get("sub_head_of_expense")
#                     or item.get("sub_head")
#                     or head["name"]
#                 )

#                 ws.append([
#                     sl_no, head_of_expense, item["name"],
#                     q1[0], q1[1], q1[2],
#                     q2[0], q2[1], q2[2],
#                     q3[0], q3[1], q3[2],
#                     q4[0], q4[1], q4[2],
#                     q_total(q1), q_total(q2), q_total(q3), q_total(q4),
#                     y_total(q1, q2, q3, q4)
#                 ])
#                 sl_no += 1

#                 for i in range(3):
#                     hq1[i] += q1[i]
#                     hq2[i] += q2[i]
#                     hq3[i] += q3[i]
#                     hq4[i] += q4[i]

#                     gq1[i] += q1[i]
#                     gq2[i] += q2[i]
#                     gq3[i] += q3[i]
#                     gq4[i] += q4[i]

#         # TOTAL MAIN HEAD (skip OPERATING EXPENSES itself)
#         total_head_label = f"TOTAL {head['name'].upper()}"

#         if total_head_label != "TOTAL OPERATING EXPENSES":
#             ws.append([
#                 "", total_head_label, "",
#                 hq1[0], hq1[1], hq1[2],
#                 hq2[0], hq2[1], hq2[2],
#                 hq3[0], hq3[1], hq3[2],
#                 hq4[0], hq4[1], hq4[2],
#                 q_total(hq1), q_total(hq2), q_total(hq3), q_total(hq4),
#                 y_total(hq1, hq2, hq3, hq4)
#             ])
#             for c in ws[ws.max_row]:
#                 c.font = bold

#             if head["name"].upper() in operating_heads:
#                 add_to_special(hq1, hq2, hq3, hq4)

#     # ======================================================
#     # WRITE TOTAL OPERATING EXPENSES (ONLY ONCE, ABOVE GRAND TOTAL)
#     # ======================================================
#     ws.append([
#         "",
#         "TOTAL OPERATING EXPENSES",
#         "",
#         *special_operating["months"],
#         *special_operating["quarters"],
#         special_operating["year"]
#     ])
#     for c in ws[ws.max_row]:
#         c.font = bold

#     # ======================================================
#     # GRAND TOTAL
#     # ======================================================
#    # Main Head Title (merge from column B to column T, put text in B)
#     ws.append(["", head["name"].upper()])

#     ws.merge_cells(
#         start_row=ws.max_row,
#         start_column=2,   # Column B
#         end_row=ws.max_row,
#         end_column=20     # Column T
#     )

#     cell = ws.cell(row=ws.max_row, column=2)
#     cell.font = bold
#     cell.alignment = center

#     ws.append([
#         "", "GRAND TOTAL", "",
#         gq1[0], gq1[1], gq1[2],
#         gq2[0], gq2[1], gq2[2],
#         gq3[0], gq3[1], gq3[2],
#         gq4[0], gq4[1], gq4[2],
#         q_total(gq1), q_total(gq2), q_total(gq3), q_total(gq4),
#         y_total(gq1, gq2, gq3, gq4)
#     ])
#     for c in ws[ws.max_row]:
#         c.font = bold

#     # ======================================================
#     # SAVE FILE INTO FRAPPE
#     # ======================================================
#     stream = io.BytesIO()
#     wb.save(stream)
#     stream.seek(0)

#     file = frappe.get_doc({
#         "doctype": "File",
#         "file_name": f"Phase_Sheet_{financial_year}.xlsx",
#         "content": stream.read(),
#         "is_private": 0
#     })
#     file.insert(ignore_permissions=True)

#     return {
#         "file_url": file.file_url,
#         "file_name": file.file_name
#     }



# @frappe.whitelist()
# def export_phase_sheet_excel(financial_year=None, units=None):
#     import frappe, io
#     from openpyxl import Workbook
#     from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
#     from annual_budget.api.phase_sheet import get_consolidated_report

#     # ======================================================
#     # FETCH DATA
#     # ======================================================
#     data = get_consolidated_report(financial_year=financial_year, units=units)

#     # ======================================================
#     # WORKBOOK SETUP
#     # ======================================================
#     wb = Workbook()
#     ws = wb.active
#     ws.title = "Phase Sheet"

#     center = Alignment(horizontal="center", vertical="center")

#     # ======================================================
#     # FONTS & FILLS (STYLES)
#     # ======================================================
#     bold = Font(bold=True)

#     # Main Header (Blue background, White text)
#     main_header_fill = PatternFill(start_color="0076B6", end_color="0076B6", fill_type="solid")
#     main_header_font = Font(color="FFFFFF", bold=True)

#     # Sub Header (Orange background, White text)
#     sub_header_fill = PatternFill(start_color="F26B21", end_color="F26B21", fill_type="solid")
#     sub_header_font = Font(color="FFFFFF", bold=True)

#     # Sub Head / Total Rows (Light Orange background, Dark text)
#     sub_head_fill = PatternFill(start_color="FFF3E6", end_color="FFF3E6", fill_type="solid")
#     sub_head_font = Font(bold=True, color="000000")

#     # Grand Total (Dark Blue background, White text)
#     grand_total_fill = PatternFill(start_color="003B63", end_color="003B63", fill_type="solid")
#     grand_total_font = Font(color="FFFFFF", bold=True)

#     # ======================================================
#     # BORDERS
#     # ======================================================
#     thin_border = Border(
#         left=Side(style="thin"),
#         right=Side(style="thin"),
#         top=Side(style="thin"),
#         bottom=Side(style="thin")
#     )

#     def apply_border_to_row(row, start_col=1, end_col=20):
#         for col in range(start_col, end_col + 1):
#             ws.cell(row=row, column=col).border = thin_border

#     def apply_border_to_merged(start_row, end_row, start_col, end_col):
#         for r in range(start_row, end_row + 1):
#             for c in range(start_col, end_col + 1):
#                 ws.cell(row=r, column=c).border = thin_border

#     # ======================================================
#     # COMMON STYLE APPLIER
#     # ======================================================
#     def apply_style(row, fill=None, font=None, start_col=1, end_col=20):
#         for col in range(start_col, end_col + 1):
#             cell = ws.cell(row=row, column=col)
#             if fill:
#                 cell.fill = fill
#             if font:
#                 cell.font = font
#             cell.alignment = center

#     # ======================================================
#     # HELPER FUNCTIONS FOR TOTALS
#     # ======================================================
#     def q_total(q):
#         return sum(q)

#     def y_total(q1, q2, q3, q4):
#         return q_total(q1) + q_total(q2) + q_total(q3) + q_total(q4)

#     # ======================================================
#     # TOP INFO
#     # ======================================================
#     ws.append([f"Unit : {units}"])
#     ws.append([f"Financial Year : {financial_year}"])
#     ws.append([])

#     # (Borders optional for top info)
#     apply_border_to_row(1, 1, 3)
#     apply_border_to_row(2, 1, 3)

#     # ======================================================
#     # >>> PART 2 WILL START FROM HERE <<<
#     # Header with rowspan + colspan
#     # Accumulators for totals
#     # ======================================================
#     # ======================================================
#     # PART 2
#     # HEADER WITH ROWSPAN + COLSPAN
#     # + TOTAL ACCUMULATORS
#     # ======================================================

#     # ------------------------------------------------------
#     # HEADER ROW 1  (Quarter blocks)
#     # ------------------------------------------------------
#     ws.append([
#         "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "QTR-1", "", "",
#         "QTR-2", "", "",
#         "QTR-3", "", "",
#         "QTR-4", "", "",
#         "QTR-1", "QTR-2", "QTR-3", "QTR-4",
#         "YEAR TOTAL"
#     ])
#     r1 = ws.max_row

#     # Colspan merges for months
#     ws.merge_cells(start_row=r1, start_column=4, end_row=r1, end_column=6)     # Apr–Jun
#     ws.merge_cells(start_row=r1, start_column=7, end_row=r1, end_column=9)     # Jul–Sep
#     ws.merge_cells(start_row=r1, start_column=10, end_row=r1, end_column=12)   # Oct–Dec
#     ws.merge_cells(start_row=r1, start_column=13, end_row=r1, end_column=15)   # Jan–Mar

#     apply_style(r1, fill=main_header_fill, font=main_header_font)
#     apply_border_to_merged(r1, r1, 1, 20)

#     # ------------------------------------------------------
#     # HEADER ROW 2  (Month names + Totals labels)
#     # ------------------------------------------------------
#     ws.append([
#         "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "Apr", "May", "Jun",
#         "Jul", "Aug", "Sep",
#         "Oct", "Nov", "Dec",
#         "Jan", "Feb", "Mar",
#         "QTR-1", "QTR-2", "QTR-3", "QTR-4",
#         f"YEAR {financial_year}"
#     ])
#     r2 = ws.max_row

#     apply_style(r2, fill=main_header_fill, font=main_header_font)
#     apply_border_to_merged(r2, r2, 1, 20)

#     # ------------------------------------------------------
#     # ROWSPAN merges (vertical)
#     # ------------------------------------------------------
#     # Sl #
#     ws.merge_cells(start_row=r1, start_column=1, end_row=r2, end_column=1)
#     # HEAD OF EXPENSE
#     ws.merge_cells(start_row=r1, start_column=2, end_row=r2, end_column=2)
#     # TYPE OF EXPENSE
#     ws.merge_cells(start_row=r1, start_column=3, end_row=r2, end_column=3)

#     # Quarter total columns
#     ws.merge_cells(start_row=r1, start_column=16, end_row=r2, end_column=16)
#     ws.merge_cells(start_row=r1, start_column=17, end_row=r2, end_column=17)
#     ws.merge_cells(start_row=r1, start_column=18, end_row=r2, end_column=18)
#     ws.merge_cells(start_row=r1, start_column=19, end_row=r2, end_column=19)

#     # YEAR TOTAL
#     ws.merge_cells(start_row=r1, start_column=20, end_row=r2, end_column=20)

#     # Apply borders to rowspan areas
#     apply_border_to_merged(r1, r2, 1, 1)
#     apply_border_to_merged(r1, r2, 2, 2)
#     apply_border_to_merged(r1, r2, 3, 3)
#     apply_border_to_merged(r1, r2, 16, 16)
#     apply_border_to_merged(r1, r2, 17, 17)
#     apply_border_to_merged(r1, r2, 18, 18)
#     apply_border_to_merged(r1, r2, 19, 19)
#     apply_border_to_merged(r1, r2, 20, 20)

#     # ======================================================
#     # INITIALIZE ACCUMULATORS
#     # ======================================================

#     sl_no = 1

#     # GRAND TOTAL accumulators (per quarter blocks)
#     gq1 = [0, 0, 0]
#     gq2 = [0, 0, 0]
#     gq3 = [0, 0, 0]
#     gq4 = [0, 0, 0]

#     # TOTAL OPERATING EXPENSES accumulators
#     special_operating = {
#         "months": [0] * 12,
#         "quarters": [0, 0, 0, 0],
#         "year": 0
#     }

#     operating_heads = [
#         "MEDICAL EXPENSES",
#         "OTHER OPERATING EXPENSES",
#         "PROGRAM EXPENSES",
#         "TRAVEL EXPENSES",
#         "PEOPLE EXPENSES",
#         "PARTNER EXPENSES",
#         "STUDENT SUPPORT EXPENSES"
#     ]

#     def add_to_special(q1, q2, q3, q4):
#         months = [
#             q1[0], q1[1], q1[2],
#             q2[0], q2[1], q2[2],
#             q3[0], q3[1], q3[2],
#             q4[0], q4[1], q4[2]
#         ]
#         quarters = [
#             q_total(q1),
#             q_total(q2),
#             q_total(q3),
#             q_total(q4)
#         ]

#         for i in range(12):
#             special_operating["months"][i] += months[i]

#         for i in range(4):
#             special_operating["quarters"][i] += quarters[i]

#         special_operating["year"] += y_total(q1, q2, q3, q4)

#     # ======================================================
#     # >>> PART 3 WILL START FROM HERE <<<
#     # Data loop + totals + save file
#     # ======================================================
#     # ======================================================
#     # PART 3
#     # DATA LOOP + TOTALS + SAVE FILE
#     # ======================================================

#     for head in data:

#         # ---------------- MAIN HEAD TITLE ----------------
#         ws.append(["", head["name"].upper()])
#         row = ws.max_row
#         ws.merge_cells(start_row=row, start_column=2, end_row=row, end_column=20)
#         cell = ws.cell(row=row, column=2)
#         cell.font = main_header_font
#         cell.fill = main_header_fill
#         cell.alignment = center
#         apply_border_to_merged(row, row, 2, 20)

#         hq1 = [0, 0, 0]
#         hq2 = [0, 0, 0]
#         hq3 = [0, 0, 0]
#         hq4 = [0, 0, 0]

#         # ---------------- WITH SUB HEADS ----------------
#         if head.get("sub_heads"):
#             for sub in head["sub_heads"]:

#                 # Sub Head Title
#                 ws.append(["", sub["name"].upper()])
#                 row = ws.max_row
#                 ws.merge_cells(start_row=row, start_column=2, end_row=row, end_column=20)
#                 cell = ws.cell(row=row, column=2)
#                 cell.font = sub_header_font
#                 cell.fill = sub_header_fill
#                 cell.alignment = center
#                 apply_border_to_merged(row, row, 2, 20)

#                 sq1 = [0, 0, 0]
#                 sq2 = [0, 0, 0]
#                 sq3 = [0, 0, 0]
#                 sq4 = [0, 0, 0]

#                 for item in sub["items"]:
#                     q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]

#                     head_of_expense = (
#                         item.get("sub_head_of_expense")
#                         or item.get("sub_head")
#                         or sub["name"]
#                         or head["name"]
#                     )

#                     ws.append([
#                         sl_no, head_of_expense, item["name"],
#                         q1[0], q1[1], q1[2],
#                         q2[0], q2[1], q2[2],
#                         q3[0], q3[1], q3[2],
#                         q4[0], q4[1], q4[2],
#                         q_total(q1), q_total(q2), q_total(q3), q_total(q4),
#                         y_total(q1, q2, q3, q4)
#                     ])
#                     apply_border_to_row(ws.max_row)

#                     sl_no += 1

#                     for i in range(3):
#                         sq1[i] += q1[i]
#                         sq2[i] += q2[i]
#                         sq3[i] += q3[i]
#                         sq4[i] += q4[i]

#                         hq1[i] += q1[i]
#                         hq2[i] += q2[i]
#                         hq3[i] += q3[i]
#                         hq4[i] += q4[i]

#                         gq1[i] += q1[i]
#                         gq2[i] += q2[i]
#                         gq3[i] += q3[i]
#                         gq4[i] += q4[i]

#                 # -------- TOTAL SUB HEAD --------
#                 ws.append([
#                     "", f"TOTAL {sub['name'].upper()}", "",
#                     sq1[0], sq1[1], sq1[2],
#                     sq2[0], sq2[1], sq2[2],
#                     sq3[0], sq3[1], sq3[2],
#                     sq4[0], sq4[1], sq4[2],
#                     q_total(sq1), q_total(sq2), q_total(sq3), q_total(sq4),
#                     y_total(sq1, sq2, sq3, sq4)
#                 ])
#                 row = ws.max_row
#                 apply_style(row, fill=sub_head_fill, font=sub_head_font)
#                 apply_border_to_row(row)

#                 if sub["name"].upper() in operating_heads:
#                     add_to_special(sq1, sq2, sq3, sq4)

#         # ---------------- WITHOUT SUB HEADS ----------------
#         else:
#             for item in head["items"]:
#                 q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]

#                 head_of_expense = (
#                     item.get("sub_head_of_expense")
#                     or item.get("sub_head")
#                     or head["name"]
#                 )

#                 ws.append([
#                     sl_no, head_of_expense, item["name"],
#                     q1[0], q1[1], q1[2],
#                     q2[0], q2[1], q2[2],
#                     q3[0], q3[1], q3[2],
#                     q4[0], q4[1], q4[2],
#                     q_total(q1), q_total(q2), q_total(q3), q_total(q4),
#                     y_total(q1, q2, q3, q4)
#                 ])
#                 apply_border_to_row(ws.max_row)

#                 sl_no += 1

#                 for i in range(3):
#                     hq1[i] += q1[i]
#                     hq2[i] += q2[i]
#                     hq3[i] += q3[i]
#                     hq4[i] += q4[i]

#                     gq1[i] += q1[i]
#                     gq2[i] += q2[i]
#                     gq3[i] += q3[i]
#                     gq4[i] += q4[i]

#         # ---------------- TOTAL MAIN HEAD (skip OPERATING EXPENSES) ----------------
#         total_head_label = f"TOTAL {head['name'].upper()}"
#         if total_head_label != "TOTAL OPERATING EXPENSES":
#             ws.append([
#                 "", total_head_label, "",
#                 hq1[0], hq1[1], hq1[2],
#                 hq2[0], hq2[1], hq2[2],
#                 hq3[0], hq3[1], hq3[2],
#                 hq4[0], hq4[1], hq4[2],
#                 q_total(hq1), q_total(hq2), q_total(hq3), q_total(hq4),
#                 y_total(hq1, hq2, hq3, hq4)
#             ])
#             row = ws.max_row
#             apply_style(row, fill=sub_head_fill, font=sub_head_font)
#             apply_border_to_row(row)

#             if head["name"].upper() in operating_heads:
#                 add_to_special(hq1, hq2, hq3, hq4)

#     # ======================================================
#     # TOTAL OPERATING EXPENSES  (ONLY ONCE)
#     # ======================================================
#     ws.append([
#         "", "TOTAL OPERATING EXPENSES", "",
#         *special_operating["months"],
#         *special_operating["quarters"],
#         special_operating["year"]
#     ])
#     row = ws.max_row
#     apply_style(row, fill=sub_header_fill, font=sub_header_font)
#     apply_border_to_row(row)

#     # ======================================================
#     # GRAND TOTAL TITLE ROW
#     # ======================================================
#     row = ws.max_row
#     ws.merge_cells(start_row=row, start_column=2, end_row=row, end_column=20)
#     cell = ws.cell(row=row, column=2)
#     cell.font = grand_total_font
#     cell.fill = grand_total_fill
#     cell.alignment = center
#     apply_border_to_merged(row, row, 2, 20)

#     # GRAND TOTAL VALUES ROW
#     ws.append([
#         "", "GRAND TOTAL", "",
#         gq1[0], gq1[1], gq1[2],
#         gq2[0], gq2[1], gq2[2],
#         gq3[0], gq3[1], gq3[2],
#         gq4[0], gq4[1], gq4[2],
#         q_total(gq1), q_total(gq2), q_total(gq3), q_total(gq4),
#         y_total(gq1, gq2, gq3, gq4)
#     ])
#     row = ws.max_row
#     apply_style(row, fill=grand_total_fill, font=grand_total_font)
#     apply_border_to_row(row)

#     # ======================================================
#     # SAVE FILE INTO FRAPPE
#     # ======================================================
#     stream = io.BytesIO()
#     wb.save(stream)
#     stream.seek(0)

#     file = frappe.get_doc({
#         "doctype": "File",
#         "file_name": f"Phase_Sheet_{financial_year}.xlsx",
#         "content": stream.read(),
#         "is_private": 0
#     })
#     file.insert(ignore_permissions=True)

#     return {
#         "file_url": file.file_url,
#         "file_name": file.file_name
#     }










@frappe.whitelist()
def export_phase_sheet_excel(
    financial_year=None,
    units=None,
    cost_center=None,
    location_code=None
):
    import frappe, io
    from openpyxl import Workbook
    from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
    from openpyxl.utils import get_column_letter
    from annual_budget.api.phase_sheet import get_consolidated_report

    # ⚠️ IMPORTANT:
    # Do NOT convert units/cost_center/location_code here.
    # get_consolidated_report already handles string → list conversion.

    data = get_consolidated_report(
        financial_year=financial_year,
        units=units,
        cost_center=cost_center,
        location_code=location_code
    )

    wb = Workbook()
    ws = wb.active
    ws.title = "Phase Sheet"

    center = Alignment(horizontal="center", vertical="center")

    # ================= STYLES =================
    main_header_fill = PatternFill(fill_type="solid", start_color="0076B6")
    main_header_font = Font(color="FFFFFF", bold=True)

    sub_header_fill = PatternFill(fill_type="solid", start_color="F26B21")
    sub_header_font = Font(color="FFFFFF", bold=True)

    sub_head_fill = PatternFill(fill_type="solid", start_color="FFF3E6")
    sub_head_font = Font(bold=True)

    grand_total_fill = PatternFill(fill_type="solid", start_color="003B63")
    grand_total_font = Font(color="FFFFFF", bold=True)

    thin_border = Border(
        left=Side(style="thin"),
        right=Side(style="thin"),
        top=Side(style="thin"),
        bottom=Side(style="thin")
    )

    def apply_border(row):
        for col in range(1, 21):
            ws.cell(row=row, column=col).border = thin_border

    def apply_style(row, fill=None, font=None):
        for col in range(1, 21):
            cell = ws.cell(row=row, column=col)
            if fill:
                cell.fill = fill
            if font:
                cell.font = font
            cell.alignment = center

    # ================= TOP INFO =================
    ws.append([f"Unit : {units or ''}"])
    ws.append([f"Financial Year : {financial_year}"])
    ws.append([])

    # ================= HEADER ROW 1 =================
    ws.append([
        "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
        "QTR-1", "", "",
        "QTR-2", "", "",
        "QTR-3", "", "",
        "QTR-4", "", "",
        "QTR-1", "QTR-2", "QTR-3", "QTR-4",
        "YEAR TOTAL"
    ])
    r1 = ws.max_row

    ws.merge_cells(start_row=r1, start_column=4, end_row=r1, end_column=6)
    ws.merge_cells(start_row=r1, start_column=7, end_row=r1, end_column=9)
    ws.merge_cells(start_row=r1, start_column=10, end_row=r1, end_column=12)
    ws.merge_cells(start_row=r1, start_column=13, end_row=r1, end_column=15)

    apply_style(r1, main_header_fill, main_header_font)
    apply_border(r1)

    # ================= HEADER ROW 2 =================
    ws.append([
        "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec",
        "Jan", "Feb", "Mar",
        "QTR-1", "QTR-2", "QTR-3", "QTR-4",
        f"YEAR {financial_year}"
    ])
    r2 = ws.max_row

    apply_style(r2, main_header_fill, main_header_font)
    apply_border(r2)

    ws.merge_cells(start_row=r1, start_column=1, end_row=r2, end_column=1)
    ws.merge_cells(start_row=r1, start_column=2, end_row=r2, end_column=2)
    ws.merge_cells(start_row=r1, start_column=3, end_row=r2, end_column=3)
    ws.merge_cells(start_row=r1, start_column=16, end_row=r2, end_column=16)
    ws.merge_cells(start_row=r1, start_column=17, end_row=r2, end_column=17)
    ws.merge_cells(start_row=r1, start_column=18, end_row=r2, end_column=18)
    ws.merge_cells(start_row=r1, start_column=19, end_row=r2, end_column=19)
    ws.merge_cells(start_row=r1, start_column=20, end_row=r2, end_column=20)

    ws.freeze_panes = "A6"

    sl_no = 1
    item_rows = []

    # ================= DATA LOOP =================
    for head in data:

        ws.append(["", head["name"].upper()])
        row = ws.max_row
        ws.merge_cells(start_row=row, start_column=2, end_row=row, end_column=20)
        ws.cell(row, 2).fill = main_header_fill
        ws.cell(row, 2).font = main_header_font
        apply_border(row)

        if head.get("sub_heads"):
            for sub in head["sub_heads"]:

                ws.append(["", sub["name"].upper()])
                row = ws.max_row
                ws.merge_cells(start_row=row, start_column=2, end_row=row, end_column=20)
                ws.cell(row, 2).fill = sub_header_fill
                ws.cell(row, 2).font = sub_header_font
                apply_border(row)

                for item in sub["items"]:
                    row_idx = ws.max_row + 1
                    q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]

                    ws.append([
                        sl_no, head["name"], item["name"],
                        *q1, *q2, *q3, *q4,
                        f"=SUM(D{row_idx}:F{row_idx})",
                        f"=SUM(G{row_idx}:I{row_idx})",
                        f"=SUM(J{row_idx}:L{row_idx})",
                        f"=SUM(M{row_idx}:O{row_idx})",
                        f"=SUM(D{row_idx}:O{row_idx})"
                    ])

                    item_rows.append(row_idx)
                    apply_border(ws.max_row)
                    sl_no += 1

    # ================= GRAND TOTAL (ONLY ITEM ROWS) =================
    def build_sum_formula(col):
        cells = [f"{col}{r}" for r in item_rows]
        return f"=SUM({','.join(cells)})" if cells else 0

    ws.append([
        "", "GRAND TOTAL", "",
        build_sum_formula("D"),
        build_sum_formula("E"),
        build_sum_formula("F"),
        build_sum_formula("G"),
        build_sum_formula("H"),
        build_sum_formula("I"),
        build_sum_formula("J"),
        build_sum_formula("K"),
        build_sum_formula("L"),
        build_sum_formula("M"),
        build_sum_formula("N"),
        build_sum_formula("O"),
        build_sum_formula("P"),
        build_sum_formula("Q"),
        build_sum_formula("R"),
        build_sum_formula("S"),
        build_sum_formula("T"),
    ])

    apply_style(ws.max_row, grand_total_fill, grand_total_font)
    apply_border(ws.max_row)

    # ================= AUTO COLUMN WIDTH =================
    for column_cells in ws.columns:
        max_length = 0
        column = column_cells[0].column
        letter = get_column_letter(column)

        for cell in column_cells:
            if cell.value:
                max_length = max(max_length, len(str(cell.value)))

        ws.column_dimensions[letter].width = max_length + 2

    # ================= DIRECT DOWNLOAD =================
    stream = io.BytesIO()
    wb.save(stream)
    stream.seek(0)

    frappe.response["filename"] = f"Phase_Sheet_{financial_year}.xlsx"
    frappe.response["filecontent"] = stream.getvalue()
    frappe.response["type"] = "binary"












@frappe.whitelist()
def download_finance_budget_import_template(user):

    if not user:
        frappe.throw(_("User is required"))
    doc_name = frappe.db.get_value(
        "Finance user access",
        {"user": user},
        "name"
    )

    if not doc_name:
        frappe.throw(_("No Finance User Access found"))

    access_doc = frappe.get_doc("Finance user access", doc_name)
    financial_year = frappe.db.get_single_value(
        "Master Settings",
        "current_financial_year"
    )
    headers = [
        "Entity / Unit",
        "Entity / Unit Decription",
        "Cost Center",
        "Cost Center(Original)",
        "Cost Center Description",
        "Location code",
        "Location code(Original)",
        "Function / Sub Unit / Divison",
        "State",
        "Financial year",
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
    expenses = frappe.get_all(
        "Expenses",
        fields=[
            "name",
            "type_of_expense",
            "sub_head_of_expense",
            "head_of_expense"
        ],
        order_by="sequence_id asc"
    )

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

        for exp in expenses:

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
                    financial_year
                ]
                first_row = False
            else:
                parent_values = [""] * 10

            ws.append(parent_values + [
                exp.name,
                exp.head_of_expense,
                exp.sub_head_of_expense,
                exp.type_of_expense,
                0.00, 0.00, 0.00, 0.00,
                0.00, 0.00, 0.00, 0.00,
                0.00, 0.00, 0.00, 0.00,
                "", "", "", "", ""
            ])
            ws[f"AA{row_index}"] = f"=SUM(O{row_index}:Q{row_index})"  
            ws[f"AB{row_index}"] = f"=SUM(R{row_index}:T{row_index})"  
            ws[f"AC{row_index}"] = f"=SUM(U{row_index}:W{row_index})"  
            ws[f"AD{row_index}"] = f"=SUM(X{row_index}:Z{row_index})"  
            ws[f"AE{row_index}"] = f"=SUM(AA{row_index}:AD{row_index})"  

            for col in range(15, 32):
                ws.cell(row=row_index, column=col).number_format = '0.00'

            row_index += 1

    for row in ws.iter_rows(min_row=1, max_row=row_index-1):
        for cell in row:
            cell.protection = Protection(locked=True)

    for row in ws.iter_rows(min_row=2, max_row=row_index-1, min_col=15, max_col=31):
        for cell in row:
            cell.protection = Protection(locked=False)

    ws.protection.sheet = True
    ws.protection.password = "budget"

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


# @frappe.whitelist()
# def export_phase_sheet_excel(financial_year=None, units=None,cost_center=None):
#     import frappe, io
#     from openpyxl import Workbook
#     from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
#     from openpyxl.utils import get_column_letter
#     from annual_budget.api.phase_sheet import get_consolidated_report

#     # ======================================================
#     # FETCH DATA
#     # ======================================================
#     data = get_consolidated_report(financial_year=financial_year, units=units,cost_center=cost_center)

#     # ======================================================
#     # WORKBOOK SETUP
#     # ======================================================
#     wb = Workbook()
#     ws = wb.active
#     ws.title = "Phase Sheet"

#     center = Alignment(horizontal="center", vertical="center")

#     # ======================================================
#     # FONTS & FILLS (STYLES)
#     # ======================================================
#     bold = Font(bold=True)

#     # Main Header (Blue background, White text)
#     main_header_fill = PatternFill(start_color="0076B6", end_color="0076B6", fill_type="solid")
#     main_header_font = Font(color="FFFFFF", bold=True)

#     # Sub Header (Orange background, White text)
#     sub_header_fill = PatternFill(start_color="F26B21", end_color="F26B21", fill_type="solid")
#     sub_header_font = Font(color="FFFFFF", bold=True)

#     # Sub Head / Total Rows (Light Orange background, Dark text)
#     sub_head_fill = PatternFill(start_color="FFF3E6", end_color="FFF3E6", fill_type="solid")
#     sub_head_font = Font(bold=True, color="000000")

#     # Grand Total (Dark Blue background, White text)
#     grand_total_fill = PatternFill(start_color="003B63", end_color="003B63", fill_type="solid")
#     grand_total_font = Font(color="FFFFFF", bold=True)

#     # ======================================================
#     # BORDERS
#     # ======================================================
#     thin_border = Border(
#         left=Side(style="thin"),
#         right=Side(style="thin"),
#         top=Side(style="thin"),
#         bottom=Side(style="thin")
#     )

#     def apply_border_to_row(row, start_col=1, end_col=20):
#         for col in range(start_col, end_col + 1):
#             ws.cell(row=row, column=col).border = thin_border

#     def apply_border_to_merged(start_row, end_row, start_col, end_col):
#         for r in range(start_row, end_row + 1):
#             for c in range(start_col, end_col + 1):
#                 ws.cell(row=r, column=c).border = thin_border

#     # ======================================================
#     # COMMON STYLE APPLIER
#     # ======================================================
#     def apply_style(row, fill=None, font=None, start_col=1, end_col=20):
#         for col in range(start_col, end_col + 1):
#             cell = ws.cell(row=row, column=col)
#             if fill:
#                 cell.fill = fill
#             if font:
#                 cell.font = font
#             cell.alignment = center

#     # ======================================================
#     # HELPER FUNCTIONS FOR TOTALS
#     # ======================================================
#     def q_total(q):
#         return sum(q)

#     def y_total(q1, q2, q3, q4):
#         return q_total(q1) + q_total(q2) + q_total(q3) + q_total(q4)

#     # ======================================================
#     # AUTO FIT COLUMN WIDTH (LIKE EXCEL AUTOFIT)
#     # ======================================================
#     def auto_adjust_column_width(ws, min_width=8, max_width=60):
#         for col in ws.columns:
#             max_length = 0
#             col_letter = get_column_letter(col[0].column)
#             for cell in col:
#                 try:
#                     if cell.value:
#                         max_length = max(max_length, len(str(cell.value)))
#                 except:
#                     pass
#             adjusted = max(min_width, min(max_width, max_length + 2))
#             ws.column_dimensions[col_letter].width = adjusted

#     # ======================================================
#     # TOP INFO
#     # ======================================================
#     ws.append([f"Unit : {units}"])
#     ws.append([f"Financial Year : {financial_year}"])
#     ws.append([])

#     # Optional borders for top info
#     apply_border_to_row(1, 1, 3)
#     apply_border_to_row(2, 1, 3)

#     # ------------------------------------------------------
#     # HEADER ROW 1  (Quarter blocks)
#     # ------------------------------------------------------
#     ws.append([
#         "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "QTR-1", "", "",
#         "QTR-2", "", "",
#         "QTR-3", "", "",
#         "QTR-4", "", "",
#         "QTR-1", "QTR-2", "QTR-3", "QTR-4",
#         "YEAR TOTAL"
#     ])
#     r1 = ws.max_row

#     ws.merge_cells(start_row=r1, start_column=4, end_row=r1, end_column=6)
#     ws.merge_cells(start_row=r1, start_column=7, end_row=r1, end_column=9)
#     ws.merge_cells(start_row=r1, start_column=10, end_row=r1, end_column=12)
#     ws.merge_cells(start_row=r1, start_column=13, end_row=r1, end_column=15)

#     apply_style(r1, fill=main_header_fill, font=main_header_font)
#     apply_border_to_merged(r1, r1, 1, 20)

#     # ------------------------------------------------------
#     # HEADER ROW 2 (Months + Totals)
#     # ------------------------------------------------------
#     ws.append([
#         "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "Apr", "May", "Jun",
#         "Jul", "Aug", "Sep",
#         "Oct", "Nov", "Dec",
#         "Jan", "Feb", "Mar",
#         "QTR-1", "QTR-2", "QTR-3", "QTR-4",
#         f"YEAR {financial_year}"
#     ])
#     r2 = ws.max_row
#     apply_style(r2, fill=main_header_fill, font=main_header_font)
#     apply_border_to_merged(r2, r2, 1, 20)

#     # Vertical merges
#     ws.merge_cells(start_row=r1, start_column=1, end_row=r2, end_column=1)
#     ws.merge_cells(start_row=r1, start_column=2, end_row=r2, end_column=2)
#     ws.merge_cells(start_row=r1, start_column=3, end_row=r2, end_column=3)
#     ws.merge_cells(start_row=r1, start_column=16, end_row=r2, end_column=16)
#     ws.merge_cells(start_row=r1, start_column=17, end_row=r2, end_column=17)
#     ws.merge_cells(start_row=r1, start_column=18, end_row=r2, end_column=18)
#     ws.merge_cells(start_row=r1, start_column=19, end_row=r2, end_column=19)
#     ws.merge_cells(start_row=r1, start_column=20, end_row=r2, end_column=20)

#     # Borders for merged columns
#     apply_border_to_merged(r1, r2, 1, 1)
#     apply_border_to_merged(r1, r2, 2, 2)
#     apply_border_to_merged(r1, r2, 3, 3)
#     apply_border_to_merged(r1, r2, 16, 16)
#     apply_border_to_merged(r1, r2, 17, 17)
#     apply_border_to_merged(r1, r2, 18, 18)
#     apply_border_to_merged(r1, r2, 19, 19)
#     apply_border_to_merged(r1, r2, 20, 20)

#     # ======================================================
#     # ACCUMULATORS
#     # ======================================================
#     sl_no = 1
#     gq1 = [0, 0, 0]
#     gq2 = [0, 0, 0]
#     gq3 = [0, 0, 0]
#     gq4 = [0, 0, 0]

#     special_operating = {"months": [0]*12, "quarters": [0, 0, 0, 0], "year": 0}
#     operating_heads = [
#         "PROGRAM EXPENSES",
#         "PARTNER EXPENSES",
#         "PEOPLE EXPENSES",
#         "TRAVEL EXPENSES",
#         "STUDENT SUPPORT EXPENSES"
#         "MEDICAL EXPENSES",
#         "OTHER OPERATING EXPENSES",
#     ]

#     def add_to_special(q1, q2, q3, q4):
#         months = [*q1, *q2, *q3, *q4]
#         quarters = [q_total(q1), q_total(q2), q_total(q3), q_total(q4)]
#         for i in range(12):
#             special_operating["months"][i] += months[i]
#         for i in range(4):
#             special_operating["quarters"][i] += quarters[i]
#         special_operating["year"] += y_total(q1, q2, q3, q4)

#     # ======================================================
#     # DATA LOOP
#     # ======================================================
#     for head in data:

#         # Main Head Title
#         ws.append(["", head["name"].upper()])
#         row = ws.max_row
#         ws.merge_cells(start_row=row, start_column=2, end_row=row, end_column=20)
#         cell = ws.cell(row=row, column=2)
#         cell.font = main_header_font
#         cell.fill = main_header_fill
#         cell.alignment = center
#         apply_border_to_merged(row, row, 2, 20)

#         hq1 = [0, 0, 0]
#         hq2 = [0, 0, 0]
#         hq3 = [0, 0, 0]
#         hq4 = [0, 0, 0]

#         if head.get("sub_heads"):
#             for sub in head["sub_heads"]:

#                 # Sub Head Title
#                 ws.append(["", sub["name"].upper()])
#                 row = ws.max_row
#                 ws.merge_cells(start_row=row, start_column=2, end_row=row, end_column=20)
#                 cell = ws.cell(row=row, column=2)
#                 cell.font = sub_header_font
#                 cell.fill = sub_header_fill
#                 cell.alignment = center
#                 apply_border_to_merged(row, row, 2, 20)

#                 sq1 = [0, 0, 0]
#                 sq2 = [0, 0, 0]
#                 sq3 = [0, 0, 0]
#                 sq4 = [0, 0, 0]

#                 for item in sub["items"]:
#                     q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]
#                     head_of_expense = (
#                         item.get("sub_head_of_expense")
#                         or item.get("sub_head")
#                         or sub["name"]
#                         or head["name"]
#                     )

#                     ws.append([
#                         sl_no, head_of_expense, item["name"],
#                         q1[0], q1[1], q1[2],
#                         q2[0], q2[1], q2[2],
#                         q3[0], q3[1], q3[2],
#                         q4[0], q4[1], q4[2],
#                         q_total(q1), q_total(q2), q_total(q3), q_total(q4),
#                         y_total(q1, q2, q3, q4)
#                     ])
#                     apply_border_to_row(ws.max_row)
#                     sl_no += 1

#                     for i in range(3):
#                         sq1[i] += q1[i]
#                         sq2[i] += q2[i]
#                         sq3[i] += q3[i]
#                         sq4[i] += q4[i]

#                         hq1[i] += q1[i]
#                         hq2[i] += q2[i]
#                         hq3[i] += q3[i]
#                         hq4[i] += q4[i]

#                         gq1[i] += q1[i]
#                         gq2[i] += q2[i]
#                         gq3[i] += q3[i]
#                         gq4[i] += q4[i]

#                 # Total Sub Head
#                 ws.append([
#                     "", f"TOTAL {sub['name'].upper()}", "",
#                     sq1[0], sq1[1], sq1[2],
#                     sq2[0], sq2[1], sq2[2],
#                     sq3[0], sq3[1], sq3[2],
#                     sq4[0], sq4[1], sq4[2],
#                     q_total(sq1), q_total(sq2), q_total(sq3), q_total(sq4),
#                     y_total(sq1, sq2, sq3, sq4)
#                 ])
#                 row = ws.max_row
#                 apply_style(row, fill=sub_head_fill, font=sub_head_font)
#                 apply_border_to_row(row)

#                 if sub["name"].upper() in operating_heads:
#                     add_to_special(sq1, sq2, sq3, sq4)

#         else:
#             for item in head["items"]:
#                 q1, q2, q3, q4 = item["q1"], item["q2"], item["q3"], item["q4"]
#                 head_of_expense = (
#                     item.get("sub_head_of_expense")
#                     or item.get("sub_head")
#                     or head["name"]
#                 )

#                 ws.append([
#                     sl_no, head_of_expense, item["name"],
#                     q1[0], q1[1], q1[2],
#                     q2[0], q2[1], q2[2],
#                     q3[0], q3[1], q3[2],
#                     q4[0], q4[1], q4[2],
#                     q_total(q1), q_total(q2), q_total(q3), q_total(q4),
#                     y_total(q1, q2, q3, q4)
#                 ])
#                 apply_border_to_row(ws.max_row)
#                 sl_no += 1

#                 for i in range(3):
#                     hq1[i] += q1[i]
#                     hq2[i] += q2[i]
#                     hq3[i] += q3[i]
#                     hq4[i] += q4[i]

#                     gq1[i] += q1[i]
#                     gq2[i] += q2[i]
#                     gq3[i] += q3[i]
#                     gq4[i] += q4[i]

#         # Total Main Head (skip OPERATING EXPENSES)
#         total_head_label = f"TOTAL {head['name'].upper()}"
#         if total_head_label != "TOTAL OPERATING EXPENSES":
#             ws.append([
#                 "", total_head_label, "",
#                 hq1[0], hq1[1], hq1[2],
#                 hq2[0], hq2[1], hq2[2],
#                 hq3[0], hq3[1], hq3[2],
#                 hq4[0], hq4[1], hq4[2],
#                 q_total(hq1), q_total(hq2), q_total(hq3), q_total(hq4),
#                 y_total(hq1, hq2, hq3, hq4)
#             ])
#             row = ws.max_row
#             apply_style(row, fill=sub_head_fill, font=sub_head_font)
#             apply_border_to_row(row)

#             if head["name"].upper() in operating_heads:
#                 add_to_special(hq1, hq2, hq3, hq4)

#     # ======================================================
#     # TOTAL OPERATING EXPENSES (ONLY ONCE)
#     # ======================================================
#     ws.append([
#         "", "TOTAL OPERATING EXPENSES", "",
#         *special_operating["months"],
#         *special_operating["quarters"],
#         special_operating["year"]
#     ])
#     row = ws.max_row
#     apply_style(row, fill=sub_header_fill, font=sub_header_font)
#     apply_border_to_row(row)
#     # GRAND TOTAL VALUES
#     ws.append([
#         "", "GRAND TOTAL", "",
#         gq1[0], gq1[1], gq1[2],
#         gq2[0], gq2[1], gq2[2],
#         gq3[0], gq3[1], gq3[2],
#         gq4[0], gq4[1], gq4[2],
#         q_total(gq1), q_total(gq2), q_total(gq3), q_total(gq4),
#         y_total(gq1, gq2, gq3, gq4)
#     ])
#     row = ws.max_row
#     apply_style(row, fill=grand_total_fill, font=grand_total_font)
#     apply_border_to_row(row)

#     # ======================================================
#     # AUTOFIT COLUMN WIDTHS
#     # ======================================================
#     auto_adjust_column_width(ws)
#     ws.column_dimensions["B"].width += 5
#     ws.column_dimensions["C"].width += 8

#     # ======================================================
#     # SAVE FILE INTO FRAPPE
#     # ======================================================
#     stream = io.BytesIO()
#     wb.save(stream)
#     stream.seek(0)

#     file = frappe.get_doc({
#         "doctype": "File",
#         "file_name": f"Phase_Sheet_{financial_year}.xlsx",
#         "content": stream.read(),
#         "is_private": 0
#     })
#     file.insert(ignore_permissions=True)

#     return {
#         "file_url": file.file_url,
#         "file_name": file.file_name
#     }

import frappe
import csv
import io

@frappe.whitelist(allow_guest=True)
def generate_budget_file():

    # 1️⃣ Get Expenses ordered by sequence_id
    expenses = frappe.db.sql("""
        SELECT
            name,
            sub_head_of_expense,
            type_of_expense,
            sequence_id
        FROM `tabExpenses`
        ORDER BY sequence_id ASC
    """, as_dict=True)

    # 2️⃣ Get ALL User Mapping rows (no financial year filter)
    mappings = frappe.db.sql("""
        SELECT
            fua.financial_year,
            um.unit,
            um.unit_description,
            um.cost_center,
            um.cost_center_description,
            um.location_code,
            um.location_description
        FROM `tabFinance user access` fua
        JOIN `tabUser mapping` um
            ON um.parent = fua.name
    """, as_dict=True)

    if not expenses:
        frappe.throw("No Expenses found")

    if not mappings:
        frappe.throw("No User Mappings found")

    output = io.StringIO()
    writer = csv.writer(output)

    # Header
    writer.writerow([
        "Entity / Unit",
        "Entity / Unit Description",
        "Cost Center",
        "Cost Center Description",
        "Location Code",
        "Location Description",
        "State",
        "Financial Year",
        "Type of expense ID",
        "Sub head of expense",
        "Type of expense",
        "April","May","June","July","August","September",
        "October","November","December","January","February","March",
        "Quarter 1 Total Amount",
        "Quarter 2 Total Amount",
        "Quarter 3 Total Amount",
        "Quarter 4 Total Amount",
        "Year Total Amount"
    ])

    # 3️⃣ Cross combination
    for mapping in mappings:
        for expense in expenses:
            writer.writerow([
                mapping.unit,
                mapping.unit_description,
                mapping.cost_center,
                mapping.cost_center_description,
                mapping.location_code,
                mapping.location_description,
                "Karnataka",   # change if dynamic
                mapping.financial_year,
                expense.name,
                expense.sub_head_of_expense,
                expense.type_of_expense,
                0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0
            ])

    frappe.response['filename'] = "Budget_Export.csv"
    frappe.response['filecontent'] = output.getvalue()
    frappe.response['type'] = 'download'

    if not financial_year:
        frappe.throw("Financial Year is required")

    # Get all Expenses ordered by sequence_id
    expenses = frappe.db.sql("""
        SELECT
            name,
            sub_head_of_expense,
            type_of_expense,
            sequence_id
        FROM `tabExpenses`
        ORDER BY sequence_id ASC
    """, as_dict=True)

    # Get all User Mapping rows for given financial year
    mappings = frappe.db.sql("""
        SELECT
            fua.financial_year,
            um.unit,
            um.unit_description,
            um.cost_center,
            um.cost_center_description,
            um.location_code,
            um.location_description
        FROM `tabFinance user access` fua
        JOIN `tabUser mapping` um
            ON um.parent = fua.name
        WHERE fua.financial_year = %s
    """, financial_year, as_dict=True)

    if not expenses:
        frappe.throw("No Expenses found")

    if not mappings:
        frappe.throw("No User Mappings found")

    output = io.StringIO()
    writer = csv.writer(output)

    # Header
    writer.writerow([
        "Entity / Unit",
        "Entity / Unit Description",
        "Cost Center",
        "Cost Center Description",
        "Location Code",
        "Location Description",
        "State",
        "Financial Year",
        "Type of expense ID",
        "Sub head of expense",
        "Type of expense",
        "April","May","June","July","August","September",
        "October","November","December","January","February","March",
        "Quarter 1 Total Amount",
        "Quarter 2 Total Amount",
        "Quarter 3 Total Amount",
        "Quarter 4 Total Amount",
        "Year Total Amount"
    ])

    # Cross combination
    for mapping in mappings:
        for expense in expenses:

            writer.writerow([
                mapping.unit,
                mapping.unit_description,
                mapping.cost_center,
                mapping.cost_center_description,
                mapping.location_code,
                mapping.location_description,
                "Karnataka",  # change if dynamic
                mapping.financial_year,
                expense.name,
                expense.sub_head_of_expense,
                expense.type_of_expense,
                0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0
            ])

    frappe.response['filename'] = f"Budget_{financial_year}.csv"
    frappe.response['filecontent'] = output.getvalue()
    frappe.response['type'] = 'download'

    return