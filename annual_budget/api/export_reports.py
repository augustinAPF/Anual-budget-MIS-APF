from annual_budget.api.phase_sheet import get_consolidated_report
import frappe,io
from frappe import _
import frappe
import tempfile
import xlsxwriter
from frappe.utils import nowdate

# * ==============================================================   Budget Export Face Sheet =====================================================================================
@frappe.whitelist()
def export_phase_sheet_excel(
    financial_year=None,
    units=None,
    cost_center=None,
    location_code=None
):

    import io
    import frappe
    from openpyxl import Workbook
    from openpyxl.styles import Alignment, Font, PatternFill, Border, Side
    from openpyxl.utils import get_column_letter

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
    left_align = Alignment(horizontal="left", vertical="center")
    right_align = Alignment(horizontal="right", vertical="center")

    bold = Font(bold=True)
    white_bold = Font(bold=True, color="FFFFFF")

    header_fill = PatternFill("solid", fgColor="5D6D7E")
    head_fill = PatternFill("solid", fgColor="D6DBDF")
    subhead_fill = PatternFill("solid", fgColor="F2F3F4")
    subtotal_fill = PatternFill("solid", fgColor="EBF5FB")
    head_total_fill = PatternFill("solid", fgColor="D4E6F1")
    grand_fill = PatternFill("solid", fgColor="A9CCE3")

    thin = Side(style="thin")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)


    def style_row(row, fill=None, font=None, header=False):

        for col in range(2,22):

            cell = ws.cell(row=row,column=col)
            cell.border = border

            if header:
                cell.alignment = center
            else:
                if col == 2:
                    cell.alignment = center
                elif col in (3,4):
                    cell.alignment = left_align
                else:
                    cell.alignment = right_align

            if fill:
                cell.fill = fill

            if font:
                cell.font = font


    def format_numeric(row):
        for col in range(5,22):
            ws.cell(row=row,column=col).number_format = "#,##0.00"


    def build_formula(col, rows):
        return "=" + "+".join([f"{col}{r}" for r in rows]) if rows else 0


    def to_roman(num):

        val=[1000,900,500,400,100,90,50,40,10,9,5,4,1]
        syb=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]

        roman=""
        i=0

        while num>0:
            for _ in range(num//val[i]):
                roman+=syb[i]
                num-=val[i]
            i+=1

        return roman


    # TITLE
    ws.append(["","Azim Premji Foundation"])
    ws.merge_cells("B1:U1")
    ws["B1"].font=Font(size=14,bold=True)
    ws["B1"].alignment=left_align

    ws.append(["",f"Budget for the Financial Year {financial_year or ''}"])
    ws.merge_cells("B2:U2")
    ws["B2"].font=Font(size=12,bold=True)

    ws.append([])


    # HEADER
    ws.append([
        "", "Sl #","HEAD OF EXPENSE","TYPE OF EXPENSE",
        "QUARTER I","","",
        "QUARTER II","","",
        "QUARTER III","","",
        "QUARTER IV","","",
        "QTR-1","QTR-2","QTR-3","QTR-4",
        f"YEAR {financial_year}"
    ])

    r1=ws.max_row

    ws.merge_cells(start_row=r1,start_column=5,end_row=r1,end_column=7)
    ws.merge_cells(start_row=r1,start_column=8,end_row=r1,end_column=10)
    ws.merge_cells(start_row=r1,start_column=11,end_row=r1,end_column=13)
    ws.merge_cells(start_row=r1,start_column=14,end_row=r1,end_column=16)

    ws.append([
        "", "Sl #","HEAD OF EXPENSE","TYPE OF EXPENSE",
        "Apr","May","Jun",
        "Jul","Aug","Sep",
        "Oct","Nov","Dec",
        "Jan","Feb","Mar",
        "QTR-1","QTR-2","QTR-3","QTR-4",
        f"YEAR {financial_year}"
    ])

    r2=ws.max_row

    ws.merge_cells(start_row=r1,start_column=2,end_row=r2,end_column=2)
    ws.merge_cells(start_row=r1,start_column=3,end_row=r2,end_column=3)
    ws.merge_cells(start_row=r1,start_column=4,end_row=r2,end_column=4)

    for col in range(17,22):
        ws.merge_cells(start_row=r1,start_column=col,end_row=r2,end_column=col)

    style_row(r1,header_fill,white_bold,True)
    style_row(r2,header_fill,white_bold,True)

    ws.freeze_panes="E6"


    head_total_rows=[]
    head_counter=0


    for head in data:

        head_counter+=1
        alpha_index=chr(64+head_counter)
        head_name=(head.get("name") or "").strip().upper()


        # COVID SUPPORT
        if head_name=="COVID SUPPORT":

            ws.append([])

            item=head["items"][0]
            r=ws.max_row+1

            ws.append([
                "",alpha_index,
                head["name"],
                item["name"],
                *item["q1"],*item["q2"],*item["q3"],*item["q4"],
                f"=SUM(E{r}:G{r})",
                f"=SUM(H{r}:J{r})",
                f"=SUM(K{r}:M{r})",
                f"=SUM(N{r}:P{r})",
                f"=SUM(Q{r}:T{r})"
            ])

            style_row(ws.max_row)
            format_numeric(ws.max_row)
            ws.cell(row=ws.max_row,column=3).font=bold

            continue


        ws.append(["",alpha_index,head["name"]])
        r=ws.max_row

        ws.merge_cells(start_row=r,start_column=3,end_row=r,end_column=21)
        style_row(r,head_fill,bold)

        if head_name=="OPERATING EXPENSES":
            ws.append([])

        sub_total_rows=[]
        direct_item_rows=[]


        for item in head.get("items",[]):

            r=ws.max_row+1
            sub_val=item.get("sub_head_of_expense")
            head_display=sub_val.strip() if sub_val else ""

            ws.append([
                "", "", head_display,
                item["name"],
                *item["q1"],*item["q2"],*item["q3"],*item["q4"],
                f"=SUM(E{r}:G{r})",
                f"=SUM(H{r}:J{r})",
                f"=SUM(K{r}:M{r})",
                f"=SUM(N{r}:P{r})",
                f"=SUM(Q{r}:T{r})"
            ])

            style_row(ws.max_row)
            format_numeric(ws.max_row)
            direct_item_rows.append(ws.max_row)


        sub_counter=1

        for sub in head.get("sub_heads",[]):

            roman_index=to_roman(sub_counter)

            ws.append(["",roman_index,sub["name"]])
            r=ws.max_row

            ws.merge_cells(start_row=r,start_column=3,end_row=r,end_column=21)
            style_row(r,subhead_fill,bold)

            sub_item_rows=[]

            for item in sub.get("items",[]):

                r=ws.max_row+1
                item_sub=item.get("sub_head_of_expense")
                sub_name=sub.get("name")

                head_display=""

                if item_sub and str(item_sub).strip():

                    cleaned=str(item_sub).strip()

                    if cleaned.lower()!=str(sub_name).strip().lower():
                        head_display=cleaned

                ws.append([
                    "", "", head_display,
                    item["name"],
                    *item["q1"],*item["q2"],*item["q3"],*item["q4"],
                    f"=SUM(E{r}:G{r})",
                    f"=SUM(H{r}:J{r})",
                    f"=SUM(K{r}:M{r})",
                    f"=SUM(N{r}:P{r})",
                    f"=SUM(Q{r}:T{r})"
                ])

                style_row(ws.max_row)
                format_numeric(ws.max_row)
                sub_item_rows.append(ws.max_row)


            if sub_item_rows:

                ws.append([
                    "", "", "",
                    f"TOTAL - {sub['name']}",
                    *[build_formula(c,sub_item_rows) for c in list("EFGHIJKLMNOPQRSTU")]
                ])

                style_row(ws.max_row,subtotal_fill,bold)
                format_numeric(ws.max_row)
                sub_total_rows.append(ws.max_row)

            sub_counter+=1


        total_rows=sub_total_rows if sub_total_rows else direct_item_rows

        if total_rows:

            ws.append([
                "", "", "",
                f"TOTAL - {head['name']}",
                *[build_formula(c,total_rows) for c in list("EFGHIJKLMNOPQRSTU")]
            ])

            style_row(ws.max_row,head_total_fill,bold)
            format_numeric(ws.max_row)
            head_total_rows.append(ws.max_row)

            if head_name=="OPERATING EXPENSES":
                ws.append([])


    # CLEANUP EXTRA BLANK ROW
    for r in range(ws.max_row,1,-1):

        head_val=ws.cell(r,3).value
        prev_val=ws.cell(r-1,3).value

        if head_val=="COVID SUPPORT" and prev_val is None:
            ws.delete_rows(r-1)
            break


    # GRAND TOTAL
    if head_total_rows:

        ws.append([
            "", "", "",
            "GRAND TOTAL",
            *[build_formula(c,head_total_rows) for c in list("EFGHIJKLMNOPQRSTU")]
        ])

        style_row(ws.max_row,grand_fill,bold)
        format_numeric(ws.max_row)


    # COLUMN WIDTH
    for col in range(1,ws.max_column+1):

        letter=get_column_letter(col)
        max_len=0

        for row in range(1,ws.max_row+1):

            val=ws.cell(row=row,column=col).value

            if val:
                val=str(val)

                if val.startswith("="):
                    val="999,999,999.00"

                max_len=max(max_len,len(val))

        ws.column_dimensions[letter].width=min(max(max_len+3,10),50)


    stream=io.BytesIO()
    wb.save(stream)
    stream.seek(0)

    frappe.response["filename"]=f"Phase_Sheet_{financial_year}.xlsx"
    frappe.response["filecontent"]=stream.getvalue()
    frappe.response["type"]="binary"

# * ==============================================================  Import Template Export  =====================================================================================
# @frappe.whitelist()
# def download_finance_budget_import_template(user):

#     if not user:
#         frappe.throw(_("User is required"))

#     # Get Finance User Access
#     doc_name = frappe.db.get_value(
#         "Finance user access",
#         {"user": user},
#         "name"
#     )

#     if not doc_name:
#         frappe.throw(_("No Finance User Access found"))

#     access_doc = frappe.get_doc("Finance user access", doc_name)

#     # Get Import Template ID from Finance User Access
#     if not access_doc.import_template_id:
#         frappe.throw(_("Import Template not linked in Finance User Access"))

#     import_template = frappe.get_doc(
#         "Import Templates",
#         access_doc.import_template_id
#     )

#     template_items = import_template.import_template_item_list

#     if not template_items:
#         frappe.throw(_("No Import Template Items found"))

#     financial_year = frappe.db.get_single_value(
#         "Master Settings",
#         "current_financial_year"
#     )

#     headers = [
#         "Entity / Unit",
#         "Entity / Unit Description",
#         "Cost Center",
#         "Cost Center(Original)",
#         "Cost Center Description",
#         "Location code",
#         "Location code(Original)",
#         "Function / Sub Unit / Division",
#         "State",
#         "Financial year",
#         "Uploaded By",
#         "Type of expense ID (Budget Amounts)",
#         "Head of expense (Budget Amounts)",
#         "Sub head of expense (Budget Amounts)",
#         "Type of expense (Budget Amounts)",
#         "April (Budget Amounts)",
#         "May (Budget Amounts)",
#         "June (Budget Amounts)",
#         "July (Budget Amounts)",
#         "August (Budget Amounts)",
#         "September (Budget Amounts)",
#         "October (Budget Amounts)",
#         "November (Budget Amounts)",
#         "December (Budget Amounts)",
#         "January (Budget Amounts)",
#         "February (Budget Amounts)",
#         "March (Budget Amounts)",
#         "Quarter 1 Total Amount (Budget Amounts)",
#         "Quarter 2 Total Amount (Budget Amounts)",
#         "Quarter 3 Total Amount (Budget Amounts)",
#         "Quarter 4 Total Amount (Budget Amounts)",
#         "Year Total Amount (Budget Amounts)"
#     ]

#     from openpyxl import Workbook
#     from openpyxl.styles import Font, Protection
#     from io import BytesIO
#     import datetime

#     wb = Workbook()
#     ws = wb.active
#     ws.title = "Finance Budget Import"

#     ws.append(headers)

#     for cell in ws[1]:
#         cell.font = Font(bold=True)

#     ws.freeze_panes = "A2"

#     row_index = 2

#     for mapping in access_doc.mapping:

#         first_row = True

#         for item in template_items:

#             if first_row:
#                 parent_values = [
#                     mapping.unit,
#                     mapping.unit_description,
#                     mapping.cost_center,
#                     mapping.cost_center_erp,
#                     mapping.cost_center_description,
#                     mapping.location_code,
#                     mapping.location_code_erp,
#                     mapping.location_description,
#                     mapping.state,
#                     financial_year,
#                     user
#                 ]
#                 first_row = False
#             else:
#                 parent_values = [""] * 11

#             ws.append(parent_values + [
#                 item.type_of_expense_id,
#                 item.head_of_expense,
#                 item.sub_head_of_expense,
#                 item.type_of_expense,
#                 0.00, 0.00, 0.00,
#                 0.00, 0.00, 0.00,
#                 0.00, 0.00, 0.00,
#                 0.00, 0.00, 0.00,
#                 0.00, 0.00, 0.00, 0.00, 0.00
#             ])

#             # Quarter formulas
#             ws[f"AB{row_index}"] = f"=SUM(P{row_index}:R{row_index})"
#             ws[f"AC{row_index}"] = f"=SUM(S{row_index}:U{row_index})"
#             ws[f"AD{row_index}"] = f"=SUM(V{row_index}:X{row_index})"
#             ws[f"AE{row_index}"] = f"=SUM(Y{row_index}:AA{row_index})"

#             # Year total = Sum of quarters
#             ws[f"AF{row_index}"] = f"=SUM(AB{row_index}:AE{row_index})"

#             # Format numbers
#             for col in range(16, 33):
#                 ws.cell(row=row_index, column=col).number_format = '0.00'

#             row_index += 1

#     # Lock everything
#     for row in ws.iter_rows(min_row=1, max_row=row_index - 1):
#         for cell in row:
#             cell.protection = Protection(locked=True)

#     # Unlock only monthly columns (April–March)
#     for row in ws.iter_rows(min_row=2, max_row=row_index - 1, min_col=16, max_col=27):
#         for cell in row:
#             cell.protection = Protection(locked=False)

#     ws.protection.sheet = True
#     ws.protection.password = "[REDACTED-PASSWORD]"

#     # Auto column width
#     for column in ws.columns:
#         max_length = 0
#         column_letter = column[0].column_letter
#         for cell in column:
#             if cell.value:
#                 max_length = max(max_length, len(str(cell.value)))
#         ws.column_dimensions[column_letter].width = max_length + 2

#     output = BytesIO()
#     wb.save(output)
#     output.seek(0)

#     current_date = datetime.datetime.now().strftime("%Y-%m-%d")
#     frappe.response["filename"] = f"Budget_mis_Import_{current_date}.xlsx"
#     frappe.response["filecontent"] = output.getvalue()
#     frappe.response["type"] = "download"

# @frappe.whitelist()
# def download_finance_budget_import_template(user):

#     import frappe
#     from frappe import _
#     import datetime
#     from io import BytesIO
#     import xlsxwriter

#     if not user:
#         frappe.throw(_("User is required"))

#     # Get Finance User Access
#     doc_name = frappe.db.get_value(
#         "Finance user access",
#         {"user": user},
#         "name"
#     )

#     if not doc_name:
#         frappe.throw(_("No Finance User Access found"))

#     access_doc = frappe.get_doc("Finance user access", doc_name)

#     if not access_doc.import_template_id:
#         frappe.throw(_("Import Template not linked in Finance User Access"))

#     import_template = frappe.get_doc(
#         "Import Templates",
#         access_doc.import_template_id
#     )

#     template_items = import_template.import_template_item_list

#     if not template_items:
#         frappe.throw(_("No Import Template Items found"))

#     financial_year = frappe.db.get_single_value(
#         "Master Settings",
#         "current_financial_year"
#     )

#     headers = [
#         "Entity / Unit",
#         "Entity / Unit Description",
#         "Cost Center",
#         "Cost Center(Original)",
#         "Cost Center Description",
#         "Location code",
#         "Location code(Original)",
#         "Function / Sub Unit / Division",
#         "State",
#         "Financial year",
#         "Uploaded By",
#         "Type of expense ID (Budget Amounts)",
#         "Head of expense (Budget Amounts)",
#         "Sub head of expense (Budget Amounts)",
#         "Type of expense (Budget Amounts)",
#         "April (Budget Amounts)",
#         "May (Budget Amounts)",
#         "June (Budget Amounts)",
#         "July (Budget Amounts)",
#         "August (Budget Amounts)",
#         "September (Budget Amounts)",
#         "October (Budget Amounts)",
#         "November (Budget Amounts)",
#         "December (Budget Amounts)",
#         "January (Budget Amounts)",
#         "February (Budget Amounts)",
#         "March (Budget Amounts)",
#         "Quarter 1 Total Amount (Budget Amounts)",
#         "Quarter 2 Total Amount (Budget Amounts)",
#         "Quarter 3 Total Amount (Budget Amounts)",
#         "Quarter 4 Total Amount (Budget Amounts)",
#         "Year Total Amount (Budget Amounts)"
#     ]

#     output = BytesIO()

#     workbook = xlsxwriter.Workbook(output)
#     worksheet = workbook.add_worksheet("Finance Budget Import")

#     # Formats
#     header_format = workbook.add_format({
#         "bold": True,
#         "locked": True
#     })

#     locked_text = workbook.add_format({
#         "locked": True
#     })

#     locked_number = workbook.add_format({
#         "locked": True,
#         "num_format": "0.00"
#     })

#     unlocked_number = workbook.add_format({
#         "locked": False,
#         "num_format": "0.00"
#     })

#     # Write headers
#     for col, header in enumerate(headers):
#         worksheet.write(0, col, header, header_format)
#         worksheet.set_column(col, col, 22)

#     worksheet.freeze_panes(1, 0)

#     row_index = 1

#     for mapping in access_doc.mapping:

#         first_row = True

#         for item in template_items:

#             if first_row:
#                 parent_values = [
#                     mapping.unit,
#                     mapping.unit_description,
#                     mapping.cost_center,
#                     mapping.cost_center_erp,
#                     mapping.cost_center_description,
#                     mapping.location_code,
#                     mapping.location_code_erp,
#                     mapping.location_description,
#                     mapping.state,
#                     financial_year,
#                     user
#                 ]
#                 first_row = False
#             else:
#                 parent_values = [""] * 11

#             row_data = parent_values + [
#                 item.type_of_expense_id,
#                 item.head_of_expense,
#                 item.sub_head_of_expense,
#                 item.type_of_expense
#             ]

#             # Write locked columns
#             for col, value in enumerate(row_data):
#                 worksheet.write(row_index, col, value, locked_text)

#             # Write editable month columns (April–March)
#             for col in range(15, 27):
#                 worksheet.write(row_index, col, 0.00, unlocked_number)

#             # Quarter formulas
#             r = row_index + 1

#             worksheet.write_formula(row_index, 27, f"=SUM(P{r}:R{r})", locked_number)
#             worksheet.write_formula(row_index, 28, f"=SUM(S{r}:U{r})", locked_number)
#             worksheet.write_formula(row_index, 29, f"=SUM(V{r}:X{r})", locked_number)
#             worksheet.write_formula(row_index, 30, f"=SUM(Y{r}:AA{r})", locked_number)

#             # Year total
#             worksheet.write_formula(row_index, 31, f"=SUM(AB{r}:AE{r})", locked_number)

#             row_index += 1

#     # Enable sheet protection
#     worksheet.protect("[REDACTED-PASSWORD]")

#     workbook.close()

#     output.seek(0)

#     current_date = datetime.datetime.now().strftime("%Y-%m-%d")

#     frappe.response["filename"] = f"Budget_mis_Import_{current_date}.xlsx"
#     frappe.response["filecontent"] = output.getvalue()
#     frappe.response["type"] = "download"


# @frappe.whitelist()
# def start_budget_template_generation(user):

#     if not user:
#         frappe.throw("User required")

#     frappe.enqueue(
#         "annual_budget.api.export_reports.generate_budget_template",
#         queue="long",
#         timeout=1800,
#         user=user
#     )

#     return {"status": "started"}


# def generate_budget_template(user):

#     doc_name = frappe.db.get_value(
#         "Finance user access",
#         {"user": user},
#         "name"
#     )

#     if not doc_name:
#         return

#     access_doc = frappe.get_doc("Finance user access", doc_name)

#     import_template = frappe.get_doc(
#         "Import Templates",
#         access_doc.import_template_id
#     )

#     template_items = import_template.import_template_item_list

#     financial_year = frappe.db.get_single_value(
#         "Master Settings",
#         "current_financial_year"
#     )

#     tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx")

#     workbook = xlsxwriter.Workbook(tmp.name)
#     worksheet = workbook.add_worksheet("Finance Budget Import")

#     header_format = workbook.add_format({"bold": True, "locked": True})
#     locked = workbook.add_format({"locked": True})
#     unlocked = workbook.add_format({"locked": False, "num_format": "0.00"})

#     headers = [
#         "Entity / Unit",
#         "Entity / Unit Description",
#         "Cost Center",
#         "Cost Center(Original)",
#         "Cost Center Description",
#         "Location code",
#         "Location code(Original)",
#         "Function / Sub Unit / Division",
#         "State",
#         "Financial year",
#         "Uploaded By",
#         "Type of expense ID (Budget Amounts)",
#         "Head of expense (Budget Amounts)",
#         "Sub head of expense (Budget Amounts)",
#         "Type of expense (Budget Amounts)",
#         "April (Budget Amounts)",
#         "May (Budget Amounts)",
#         "June (Budget Amounts)",
#         "July (Budget Amounts)",
#         "August (Budget Amounts)",
#         "September (Budget Amounts)",
#         "October (Budget Amounts)",
#         "November (Budget Amounts)",
#         "December (Budget Amounts)",
#         "January (Budget Amounts)",
#         "February (Budget Amounts)",
#         "March (Budget Amounts)",
#         "Quarter 1 Total Amount (Budget Amounts)",
#         "Quarter 2 Total Amount (Budget Amounts)",
#         "Quarter 3 Total Amount (Budget Amounts)",
#         "Quarter 4 Total Amount (Budget Amounts)",
#         "Year Total Amount (Budget Amounts)"
#     ]

#     # Track column width
#     col_widths = [len(h) for h in headers]

#     for col, header in enumerate(headers):
#         worksheet.write(0, col, header, header_format)

#     worksheet.freeze_panes(1, 0)

#     row_index = 1

#     for mapping in access_doc.mapping:

#         first_row = True

#         for item in template_items:

#             if first_row:
#                 parent_values = [
#                     mapping.unit,
#                     mapping.unit_description,
#                     mapping.cost_center,
#                     mapping.cost_center_erp,
#                     mapping.cost_center_description,
#                     mapping.location_code,
#                     mapping.location_code_erp,
#                     mapping.location_description,
#                     mapping.state,
#                     financial_year,
#                     user
#                 ]
#                 first_row = False
#             else:
#                 parent_values = [""] * 11

#             row = parent_values + [
#                 item.type_of_expense_id,
#                 item.head_of_expense,
#                 item.sub_head_of_expense,
#                 item.type_of_expense
#             ]

#             for col, val in enumerate(row):

#                 worksheet.write(row_index, col, val, locked)

#                 if val:
#                     col_widths[col] = max(col_widths[col], len(str(val)))

#             # Editable months
#             for col in range(15, 27):
#                 worksheet.write(row_index, col, 0, unlocked)

#             r = row_index + 1

#             worksheet.write_formula(row_index, 27, f"=SUM(P{r}:R{r})")
#             worksheet.write_formula(row_index, 28, f"=SUM(S{r}:U{r})")
#             worksheet.write_formula(row_index, 29, f"=SUM(V{r}:X{r})")
#             worksheet.write_formula(row_index, 30, f"=SUM(Y{r}:AA{r})")
#             worksheet.write_formula(row_index, 31, f"=SUM(AB{r}:AE{r})")

#             row_index += 1

#     worksheet.protect("[REDACTED-PASSWORD]")

#     # Apply calculated widths
#     for i, width in enumerate(col_widths):
#         worksheet.set_column(i, i, width + 3)

#     workbook.close()

#     frappe.cache().set_value(
#         f"budget_template_{user}",
#         tmp.name,
#         expires_in_sec=3600
#     )


# @frappe.whitelist()
# def download_generated_template(user):

#     path = frappe.cache().get_value(f"budget_template_{user}")

#     if not path:
#         return {"status": "processing"}

#     with open(path, "rb") as f:

#         frappe.response["filename"] = f"Budget_mis_Import_{nowdate()}.xlsx"
#         frappe.response["filecontent"] = f.read()
#         frappe.response["type"] = "download"





import tempfile
import xlsxwriter
from frappe.utils import nowdate
import frappe


@frappe.whitelist()
def download_finance_budget_import_template(user):

    if not user:
        frappe.throw("User required")

    doc_name = frappe.db.get_value(
        "Finance user access",
        {"user": user},
        "name"
    )

    if not doc_name:
        frappe.throw("No Finance User Access record found for this user.")

    access_doc = frappe.get_doc("Finance user access", doc_name)

    # ── allow_edit_template checkbox ──────────────────────
    # Checked (1)   → skip sheet protection → entire sheet is editable
    # Unchecked (0) → protect sheet         → only month columns are editable
    is_editable = access_doc.allow_edit_template == 1

    import_template = frappe.get_doc(
        "Import Templates",
        access_doc.import_template_id
    )

    template_items = import_template.import_template_item_list

    financial_year = frappe.db.get_single_value(
        "Master Settings",
        "current_financial_year"
    )

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx")

    workbook  = xlsxwriter.Workbook(tmp.name)
    worksheet = workbook.add_worksheet("Finance Budget Import")

    header_format = workbook.add_format({"bold": True, "locked": True})
    locked        = workbook.add_format({"locked": True})

    # Month columns are always written with locked=False.
    # When is_editable=False → sheet is protected → only these cells are editable.
    # When is_editable=True  → sheet is not protected → all cells are editable anyway.
    unlocked = workbook.add_format({"locked": False, "num_format": "0.00"})

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

    col_widths = [len(h) for h in headers]

    for col, header in enumerate(headers):
        worksheet.write(0, col, header, header_format)

    worksheet.freeze_panes(1, 0)

    row_index = 1

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

            row = parent_values + [
                item.type_of_expense_id,
                item.head_of_expense,
                item.sub_head_of_expense,
                item.type_of_expense
            ]

            for col, val in enumerate(row):
                worksheet.write(row_index, col, val, locked)
                if val:
                    col_widths[col] = max(col_widths[col], len(str(val)))

            # Month columns (April–March)
            for col in range(15, 27):
                worksheet.write(row_index, col, 0, unlocked)

            r = row_index + 1

            worksheet.write_formula(row_index, 27, f"=SUM(P{r}:R{r})")
            worksheet.write_formula(row_index, 28, f"=SUM(S{r}:U{r})")
            worksheet.write_formula(row_index, 29, f"=SUM(V{r}:X{r})")
            worksheet.write_formula(row_index, 30, f"=SUM(Y{r}:AA{r})")
            worksheet.write_formula(row_index, 31, f"=SUM(AB{r}:AE{r})")

            row_index += 1

    # Protect only when allow_edit_template is unchecked
    if not is_editable:
        worksheet.protect("[REDACTED-PASSWORD]")

    for i, width in enumerate(col_widths):
        worksheet.set_column(i, i, width + 3)

    workbook.close()

    with open(tmp.name, "rb") as f:
        frappe.response["filename"]    = f"Budget_Import_{nowdate()}.xlsx"
        frappe.response["filecontent"] = f.read()
        frappe.response["type"]        = "download"






# import frappe
# import tempfile
# import xlsxwriter
# from frappe.utils import nowdate, cint


# # ✅ START JOB (with lock)
# @frappe.whitelist()
# def start_budget_template_generation(user):

#     if not user:
#         frappe.throw("User required")

#     job_key = f"budget_template_job_{user}"

#     # Prevent duplicate jobs
#     if frappe.cache().get_value(job_key):
#         return {"status": "already_running"}

#     frappe.cache().set_value(job_key, True, expires_in_sec=600)

#     frappe.enqueue(
#         "annual_budget.api.export_reports.generate_budget_template",
#         queue="long",
#         timeout=1800,
#         user=user
#     )

#     return {"status": "started"}


# # ✅ BACKGROUND JOB
# def generate_budget_template(user):

#     try:
#         frappe.cache().delete_value(f"budget_template_{user}")

#         doc_name = frappe.db.get_value(
#             "Finance user access",
#             {"user": user},
#             "name"
#         )

#         if not doc_name:
#             return

#         access_doc = frappe.get_doc("Finance user access", doc_name)

#         # ✅ FIX checkbox inconsistency
#         is_editable = cint(access_doc.allow_edit_template) == 1

#         import_template = frappe.get_doc(
#             "Import Templates",
#             access_doc.import_template_id
#         )

#         template_items = import_template.import_template_item_list

#         financial_year = frappe.db.get_single_value(
#             "Master Settings",
#             "current_financial_year"
#         )

#         tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx")

#         # ✅ Faster workbook
#         workbook = xlsxwriter.Workbook(tmp.name, {'constant_memory': True})
#         worksheet = workbook.add_worksheet("Finance Budget Import")

#         # Formats
#         unlocked_format = workbook.add_format({
#             "locked": False,
#             "num_format": "0.00"
#         })

#         locked_format = workbook.add_format({"locked": True})

#         header_format = workbook.add_format({
#             "bold": True,
#             "locked": not is_editable
#         })

#         headers = [
#             "Entity / Unit", "Entity / Unit Description", "Cost Center",
#             "Cost Center(Original)", "Cost Center Description",
#             "Location code", "Location code(Original)",
#             "Function / Sub Unit / Division", "State",
#             "Financial year", "Uploaded By",
#             "Type of expense ID (Budget Amounts)",
#             "Head of expense (Budget Amounts)",
#             "Sub head of expense (Budget Amounts)",
#             "Type of expense (Budget Amounts)",
#             "April (Budget Amounts)", "May (Budget Amounts)",
#             "June (Budget Amounts)", "July (Budget Amounts)",
#             "August (Budget Amounts)", "September (Budget Amounts)",
#             "October (Budget Amounts)", "November (Budget Amounts)",
#             "December (Budget Amounts)", "January (Budget Amounts)",
#             "February (Budget Amounts)", "March (Budget Amounts)",
#             "Quarter 1 Total Amount (Budget Amounts)",
#             "Quarter 2 Total Amount (Budget Amounts)",
#             "Quarter 3 Total Amount (Budget Amounts)",
#             "Quarter 4 Total Amount (Budget Amounts)",
#             "Year Total Amount (Budget Amounts)"
#         ]

#         # Write headers
#         for col, header in enumerate(headers):
#             worksheet.write(0, col, header, header_format)

#         worksheet.freeze_panes(1, 0)

#         row_index = 1

#         base_format = unlocked_format if is_editable else locked_format

#         for mapping in access_doc.mapping:

#             first_row = True

#             for item in template_items:

#                 if first_row:
#                     parent_values = [
#                         mapping.unit,
#                         mapping.unit_description,
#                         mapping.cost_center,
#                         mapping.cost_center_erp,
#                         mapping.cost_center_description,
#                         mapping.location_code,
#                         mapping.location_code_erp,
#                         mapping.location_description,
#                         mapping.state,
#                         financial_year,
#                         user
#                     ]
#                     first_row = False
#                 else:
#                     parent_values = [""] * 11

#                 row = parent_values + [
#                     item.type_of_expense_id,
#                     item.head_of_expense,
#                     item.sub_head_of_expense,
#                     item.type_of_expense
#                 ]

#                 # 🚀 Fast row write
#                 worksheet.write_row(row_index, 0, row, base_format)

#                 # Month columns always editable
#                 for col in range(15, 27):
#                     worksheet.write(row_index, col, 0, unlocked_format)

#                 r = row_index + 1

#                 worksheet.write_formula(row_index, 27, f"=SUM(P{r}:R{r})")
#                 worksheet.write_formula(row_index, 28, f"=SUM(S{r}:U{r})")
#                 worksheet.write_formula(row_index, 29, f"=SUM(V{r}:X{r})")
#                 worksheet.write_formula(row_index, 30, f"=SUM(Y{r}:AA{r})")
#                 worksheet.write_formula(row_index, 31, f"=SUM(AB{r}:AE{r})")

#                 row_index += 1

#         # ✅ Apply filter ONLY when editable
#         if is_editable and row_index > 1:
#             worksheet.autofilter(0, 0, row_index - 1, len(headers) - 1)

#         # Protect if needed
#         if not is_editable:
#             worksheet.protect("[REDACTED-PASSWORD]")

#         worksheet.set_column(0, len(headers) - 1, 22)

#         workbook.close()

#         frappe.cache().set_value(
#             f"budget_template_{user}",
#             tmp.name,
#             expires_in_sec=3600
#         )

#     finally:
#         # Always release lock
#         frappe.cache().delete_value(f"budget_template_job_{user}")


# # ✅ STATUS API
# @frappe.whitelist()
# def check_template_status(user):

#     path = frappe.cache().get_value(f"budget_template_{user}")

#     if path:
#         return {"status": "ready"}

#     return {"status": "processing"}


# # ✅ DOWNLOAD API
# @frappe.whitelist()
# def download_generated_template(user):

#     path = frappe.cache().get_value(f"budget_template_{user}")

#     if not path:
#         return {"status": "processing"}

#     with open(path, "rb") as f:
#         frappe.response["filename"] = f"Budget_mis_Import_{nowdate()}.xlsx"
#         frappe.response["filecontent"] = f.read()
#         frappe.response["type"] = "download"