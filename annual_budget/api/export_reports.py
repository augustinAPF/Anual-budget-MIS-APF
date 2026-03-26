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
    ws.title = "Budget Summary"

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

    frappe.response["filename"]=f"Budget Summary_{financial_year}.xlsx"
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



    # import frappe
    # import tempfile
    # import xlsxwriter
    # from frappe.utils import nowdate


    # @frappe.whitelist()
    # def start_budget_template_generation(user, entity_data=None):

    #     if not user:
    #         frappe.throw("User required")

    #     frappe.enqueue(
    #         "annual_budget.api.export_reports.generate_budget_template",
    #         queue="long",
    #         timeout=1800,
    #         user=user,
    #         entity_data=entity_data
    #     )

    #     return {"status": "started"}


    # def generate_budget_template(user, entity_data=None):

    #     # ── Parse entity_data ─────────────────────────────────
    #     # Can be:
    #     #   None          → use all mappings from access_doc
    #     #   JSON string   → parse into list or single dict
    #     #   list          → multiple selected rows
    #     #   dict          → single selected row (legacy)

    #     if entity_data and isinstance(entity_data, str):
    #         entity_data = frappe.parse_json(entity_data)

    #     # Normalise to a list (or None)
    #     if isinstance(entity_data, dict):
    #         entity_data = [entity_data]   # wrap single row in a list

    #     # entity_data is now either a list of dicts or None

    #     # ── Fetch Finance User Access ──────────────────────────
    #     doc_name = frappe.db.get_value(
    #         "Finance user access",
    #         {"user": user},
    #         "name"
    #     )

    #     access_doc = frappe.get_doc("Finance user access", doc_name) if doc_name else None

    #     if not access_doc:
    #         return

    #     # ── Import Template ────────────────────────────────────
    #     import_template = frappe.get_doc(
    #         "Import Templates",
    #         access_doc.import_template_id
    #     )

    #     template_items = import_template.import_template_item_list

    #     financial_year = frappe.db.get_single_value(
    #         "Master Settings",
    #         "current_financial_year"
    #     )

    #     # ── Decide mappings source ─────────────────────────────
    #     # If entity_data list provided → use those rows
    #     # Otherwise → use all rows from access_doc.mapping
    #     if entity_data:
    #         mappings       = entity_data          # list of plain dicts from frontend
    #         use_dict       = True                 # access via .get()
    #     else:
    #         mappings       = access_doc.mapping   # list of child doc objects
    #         use_dict       = False                # access via getattr()

    #     # ── Helper: read a field from either a dict or a child doc ──
    #     def get_field(field, mapping):
    #         if use_dict:
    #             return mapping.get(field) or ""
    #         return getattr(mapping, field, "") or ""

    #     # ── Create Excel ───────────────────────────────────────
    #     tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx")

    #     workbook  = xlsxwriter.Workbook(tmp.name)
    #     worksheet = workbook.add_worksheet("Finance Budget Import")

    #     header_format = workbook.add_format({"bold": True, "locked": True})
    #     locked        = workbook.add_format({"locked": True})
    #     unlocked      = workbook.add_format({"locked": False, "num_format": "0.00"})

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

    #     col_widths = [len(h) for h in headers]

    #     for col, header in enumerate(headers):
    #         worksheet.write(0, col, header, header_format)

    #     worksheet.freeze_panes(1, 0)

    #     row_index = 1

    #     # ── Write one block of rows per mapping ───────────────
    #     for mapping in mappings:

    #         first_row = True

    #         for item in template_items:

    #             if first_row:
    #                 parent_values = [
    #                     get_field("unit",                   mapping),
    #                     get_field("unit_description",       mapping),
    #                     get_field("cost_center",            mapping),
    #                     get_field("cost_center_erp",        mapping),
    #                     get_field("cost_center_description",mapping),
    #                     get_field("location_code",          mapping),
    #                     get_field("location_code_erp",      mapping),
    #                     get_field("location_description",   mapping),
    #                     get_field("state",                  mapping),
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
    #         frappe.response["filename"]    = f"Budget_mis_Import_{nowdate()}.xlsx"
    #         frappe.response["filecontent"] = f.read()
    #         frappe.response["type"]        = "download"




import frappe
import tempfile
import xlsxwriter
from frappe.utils import nowdate


@frappe.whitelist()
def start_budget_template_generation(entity_data=None):

    user = frappe.session.user

    frappe.enqueue(
        "annual_budget.api.export_reports.generate_budget_template",
        queue="long",
        timeout=1800,
        user=user,
        entity_data=entity_data
    )

    return {"status": "started"}


def generate_budget_template(user=None, entity_data=None):

    user = user or frappe.session.user

    # ── Parse entity_data ─────────────────────────────────
    if entity_data and isinstance(entity_data, str):
        entity_data = frappe.parse_json(entity_data)

    if isinstance(entity_data, dict):
        entity_data = [entity_data]

    # ── Fetch Finance User Access ─────────────────────────
    doc_name = frappe.db.get_value(
        "Finance user access",
        {"user": user},
        "name"
    )

    access_doc = frappe.get_doc("Finance user access", doc_name) if doc_name else None

    if not access_doc:
        return

    allow_edit = access_doc.allow_edit_template or 0

    # ── Import Template ───────────────────────────────────
    import_template = frappe.get_doc(
        "Import Templates",
        access_doc.import_template_id
    )

    template_items = import_template.import_template_item_list

    financial_year = frappe.db.get_single_value(
        "Master Settings",
        "current_financial_year"
    )

    # ── Decide mappings source ─────────────────────────────
    if entity_data:
        mappings = entity_data
        use_dict = True
    else:
        mappings = access_doc.mapping
        use_dict = False

    # ── Helper ────────────────────────────────────────────
    def get_field(frontend_key, child_key, mapping):
        if use_dict:
            return mapping.get(frontend_key) or ""
        return getattr(mapping, child_key, "") or ""

    # ── Create Excel ──────────────────────────────────────
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx")

    workbook  = xlsxwriter.Workbook(tmp.name)
    worksheet = workbook.add_worksheet("Finance Budget Import")

    header_format = workbook.add_format({"bold": True, "locked": True})

    if allow_edit:
        locked = workbook.add_format({"locked": False})
        unlocked = workbook.add_format({"locked": False, "num_format": "0.00"})
    else:
        locked = workbook.add_format({"locked": True})
        unlocked = workbook.add_format({"locked": False, "num_format": "0.00"})

    headers = [
        "Entity / Unit",
        "Entity / Unit Description",
        "Cost Center",
        "Cost Center(Original)",
        "Cost Center Description",
        "Location code",
        "Location code(Original)",
        "Location Description",
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

    for mapping in mappings:

        first_row = True

        for item in template_items:

            if first_row:
                parent_values = [
                    get_field("unit", "unit", mapping),
                    get_field("unit_description", "unit_description", mapping),

                    # ✅ FIXED COST CENTER
                    get_field("cost_center_id", "cost_center", mapping),
                    get_field("cost_center", "cost_center_erp", mapping),

                    get_field("cost_center_description", "cost_center_description", mapping),

                    # ✅ FIXED LOCATION
                    get_field("location_code_id", "location_code", mapping),
                    get_field("location_code", "location_code_erp", mapping),

                    get_field("location_description", "location_description", mapping),
                    get_field("state", "state", mapping),
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

            # Editable monthly fields
            for col in range(15, 27):
                worksheet.write(row_index, col, 0, unlocked)

            r = row_index + 1
            worksheet.write_formula(row_index, 27, f"=SUM(P{r}:R{r})")
            worksheet.write_formula(row_index, 28, f"=SUM(S{r}:U{r})")
            worksheet.write_formula(row_index, 29, f"=SUM(V{r}:X{r})")
            worksheet.write_formula(row_index, 30, f"=SUM(Y{r}:AA{r})")
            worksheet.write_formula(row_index, 31, f"=SUM(AB{r}:AE{r})")

            row_index += 1

    if not allow_edit:
        worksheet.protect("[REDACTED-PASSWORD]")

    for i, width in enumerate(col_widths):
        worksheet.set_column(i, i, width + 3)

    workbook.close()

    frappe.cache().set_value(
        f"budget_template_{user}",
        tmp.name,
        expires_in_sec=3600
    )


@frappe.whitelist()
def download_generated_template():

    user = frappe.session.user

    path = frappe.cache().get_value(f"budget_template_{user}")

    if not path:
        return {"status": "processing"}

    with open(path, "rb") as f:
        frappe.response["filename"]    = f"Budget_mis_Import_{nowdate()}.xlsx"
        frappe.response["filecontent"] = f.read()
        frappe.response["type"]        = "download"
        



# import tempfile
# import xlsxwriter
# from frappe.utils import nowdate
# import frappe


# @frappe.whitelist()
# def download_finance_budget_import_template(user):

#     if not user:
#         frappe.throw("User required")

#     doc_name = frappe.db.get_value(
#         "Finance user access",
#         {"user": user},
#         "name"
#     )

#     if not doc_name:
#         frappe.throw("No Finance User Access record found for this user.")

#     access_doc = frappe.get_doc("Finance user access", doc_name)

#     # ── allow_edit_template checkbox ──────────────────────
#     # Checked (1)   → skip sheet protection → entire sheet is editable
#     # Unchecked (0) → protect sheet         → only month columns are editable
#     is_editable = access_doc.allow_edit_template == 1

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

#     workbook  = xlsxwriter.Workbook(tmp.name)
#     worksheet = workbook.add_worksheet("Finance Budget Import")

#     header_format = workbook.add_format({"bold": True, "locked": True})
#     locked        = workbook.add_format({"locked": True})

#     # Month columns are always written with locked=False.
#     # When is_editable=False → sheet is protected → only these cells are editable.
#     # When is_editable=True  → sheet is not protected → all cells are editable anyway.
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

#             # Month columns (April–March)
#             for col in range(15, 27):
#                 worksheet.write(row_index, col, 0, unlocked)

#             r = row_index + 1

#             worksheet.write_formula(row_index, 27, f"=SUM(P{r}:R{r})")
#             worksheet.write_formula(row_index, 28, f"=SUM(S{r}:U{r})")
#             worksheet.write_formula(row_index, 29, f"=SUM(V{r}:X{r})")
#             worksheet.write_formula(row_index, 30, f"=SUM(Y{r}:AA{r})")
#             worksheet.write_formula(row_index, 31, f"=SUM(AB{r}:AE{r})")

#             row_index += 1

#     # Protect only when allow_edit_template is unchecked
#     if not is_editable:
#         worksheet.protect("[REDACTED-PASSWORD]")

#     for i, width in enumerate(col_widths):
#         worksheet.set_column(i, i, width + 3)

#     workbook.close()

#     with open(tmp.name, "rb") as f:
#         frappe.response["filename"]    = f"Budget_Import_{nowdate()}.xlsx"
#         frappe.response["filecontent"] = f.read()
#         frappe.response["type"]        = "download"






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





















# annual_budget/api/export_reports.py
#
# Server-side Excel export — design matches the screenshot:
#   Row 1       : Org name  (no fill, bold 14pt)
#   Row 2       : Subtitle  (no fill, bold 12pt)
#   Row 3       : Blank spacer
#   Row 4-5     : Quarter / month headers  (grey #5D6D7E, white bold)
#   Section rows: A / B … label  (grey #D6DBDF, bold, merged)
#   Sub-head    : I / II … label  (light grey #F2F3F4, bold, merged)
#   Item rows   : white, normal
#   Sub-total   : #EBF5FB, bold
#   Head total  : #D4E6F1, bold
#   Grand total : #A9CCE3, bold
#
# Numbers use Excel SUM() formulas exactly like the reference code.
# Requires:  bench pip install openpyxl
# Place at:  annual_budget/api/export_reports.py




# import io
# import base64
# import json

# import frappe
# from openpyxl import Workbook
# from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
# from openpyxl.utils import get_column_letter

# # ═══════════════════════════════════════════════════════════════════════════════
# # SHARED STYLE CONSTANTS  (matching reference code exactly)
# # ═══════════════════════════════════════════════════════════════════════════════

# _CENTER  = Alignment(horizontal="center", vertical="center")
# _LEFT    = Alignment(horizontal="left",   vertical="center")
# _RIGHT   = Alignment(horizontal="right",  vertical="center")
# _WRAP_L  = Alignment(horizontal="left",   vertical="center", wrap_text=True)

# _BOLD       = Font(bold=True, name="Calibri", size=9)
# _WHITE_BOLD = Font(bold=True, color="FFFFFF", name="Calibri", size=9)
# _NORMAL     = Font(name="Calibri", size=9)

# _FILL_HDR      = PatternFill("solid", fgColor="5D6D7E")   # dark blue-grey  — column headers
# _FILL_HEAD     = PatternFill("solid", fgColor="D6DBDF")   # medium grey     — section rows (A/B/…)
# _FILL_SUBHEAD  = PatternFill("solid", fgColor="F2F3F4")   # light grey      — sub-head rows (I/II/…)
# _FILL_SUBTOTAL = PatternFill("solid", fgColor="EBF5FB")   # pale blue       — sub-total rows
# _FILL_HTOTAL   = PatternFill("solid", fgColor="D4E6F1")   # mid blue        — head total rows
# _FILL_GRAND    = PatternFill("solid", fgColor="A9CCE3")   # stronger blue   — grand total
# _FILL_WHITE    = PatternFill("solid", fgColor="FFFFFF")

# _THIN   = Side(style="thin")
# _BORDER = Border(left=_THIN, right=_THIN, top=_THIN, bottom=_THIN)

# NUM_FMT = "#,##0.00"

# # Column indices (1-based)
# COL_SI    = 2   # Sl #
# COL_HEAD  = 3   # HEAD OF EXPENSE
# COL_TYPE  = 4   # TYPE OF EXPENSE
# COL_START = 5   # Apr  (first data column)
# COL_END   = 21  # YEAR total  (last data column)
# # Cols 5-7  = Apr May Jun
# # Cols 8-10 = Jul Aug Sep
# # Cols 11-13= Oct Nov Dec
# # Cols 14-16= Jan Feb Mar
# # Cols 17-20= QTR-1 QTR-2 QTR-3 QTR-4
# # Col  21   = YEAR total


# # ═══════════════════════════════════════════════════════════════════════════════
# # LOW-LEVEL HELPERS
# # ═══════════════════════════════════════════════════════════════════════════════

# def _merge(ws, r1, c1, r2, c2):
#     ws.merge_cells(start_row=r1, start_column=c1, end_row=r2, end_column=c2)


# def _to_roman(num):
#     vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
#     syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]
#     out = ""
#     i = 0
#     while num > 0:
#         for _ in range(num // vals[i]):
#             out += syms[i]
#             num -= vals[i]
#         i += 1
#     return out


# def _sum_formula(col_letter, rows):
#     """Build =R1+R2+… formula from a list of row numbers."""
#     if not rows:
#         return 0
#     return "=" + "+".join(f"{col_letter}{r}" for r in rows)


# def _qtr_formulas(r):
#     """
#     Return the 5 formula strings for a data row r:
#       QTR-1 = SUM(E:G), QTR-2 = SUM(H:J), QTR-3 = SUM(K:M),
#       QTR-4 = SUM(N:P), YEAR  = SUM(Q:T)
#     """
#     return [
#         f"=SUM(E{r}:G{r})",
#         f"=SUM(H{r}:J{r})",
#         f"=SUM(K{r}:M{r})",
#         f"=SUM(N{r}:P{r})",
#         f"=SUM(Q{r}:T{r})",
#     ]


# def _build_formula(col_letter, rows):
#     """Same as reference code's build_formula."""
#     if not rows:
#         return 0
#     return "=" + "+".join(f"{col_letter}{r}" for r in rows)


# def _totals_from_rows(rows):
#     """Return 17 formula cells (E..U) that sum the given row list."""
#     return [_build_formula(c, rows)
#             for c in list("EFGHIJKLMNOPQRSTU")]


# def _style_row(ws, row, fill=None, font=None, is_header=False):
#     """Apply border, alignment, fill, font to cols 2-21 (matching reference)."""
#     for col in range(COL_SI, COL_END + 1):
#         cell = ws.cell(row=row, column=col)
#         cell.border = _BORDER
#         if is_header:
#             cell.alignment = _CENTER
#         else:
#             if col == COL_SI:
#                 cell.alignment = _CENTER
#             elif col in (COL_HEAD, COL_TYPE):
#                 cell.alignment = _WRAP_L
#             else:
#                 cell.alignment = _RIGHT
#         if fill:
#             cell.fill = fill
#         if font:
#             cell.font = font


# def _fmt_numeric(ws, row):
#     for col in range(COL_START, COL_END + 1):
#         ws.cell(row=row, column=col).number_format = NUM_FMT


# def _auto_col_widths(ws):
#     for col in range(1, ws.max_column + 1):
#         letter = get_column_letter(col)
#         max_len = 0
#         for row in range(1, ws.max_row + 1):
#             val = ws.cell(row=row, column=col).value
#             if val:
#                 s = str(val)
#                 if s.startswith("="):
#                     s = "999,999,999.00"
#                 max_len = max(max_len, len(s))
#         ws.column_dimensions[letter].width = min(max(max_len + 3, 10), 50)


# def _wb_to_b64(wb):
#     buf = io.BytesIO()
#     wb.save(buf)
#     buf.seek(0)
#     return base64.b64encode(buf.read()).decode("utf-8")


# # ═══════════════════════════════════════════════════════════════════════════════
# # SHEET BUILDER — Annual Budget  (directly mirrors reference code logic)
# # ═══════════════════════════════════════════════════════════════════════════════

# def _sheet_annual(wb, sheet_name, data, fy,
#                   org_name="Azim Premji Foundation"):
#     ws = wb.create_sheet(title=sheet_name[:31])

#     # ── Row 1: Org name ───────────────────────────────────────────────────────
#     ws.append(["", org_name])
#     ws.merge_cells("B1:U1")
#     ws["B1"].font      = Font(size=14, bold=True, name="Calibri")
#     ws["B1"].alignment = _LEFT

#     # ── Row 2: Subtitle ───────────────────────────────────────────────────────
#     ws.append(["", f"Budget for the Financial Year {fy or ''}"])
#     ws.merge_cells("B2:U2")
#     ws["B2"].font      = Font(size=12, bold=True, name="Calibri")
#     ws["B2"].alignment = _LEFT

#     # ── Row 3: Blank ──────────────────────────────────────────────────────────
#     ws.append([])

#     # ── Rows 4-5: Headers — style BEFORE merging ─────────────────────────────
#     ws.append([
#         "", "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "QUARTER I",  "", "",
#         "QUARTER II", "", "",
#         "QUARTER III","", "",
#         "QUARTER IV", "", "",
#         "QTR-1","QTR-2","QTR-3","QTR-4",
#         f"YEAR {fy}",
#     ])
#     r1 = ws.max_row

#     ws.append([
#         "", "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "Apr","May","Jun",
#         "Jul","Aug","Sep",
#         "Oct","Nov","Dec",
#         "Jan","Feb","Mar",
#         "QTR-1","QTR-2","QTR-3","QTR-4",
#         f"YEAR {fy}",
#     ])
#     r2 = ws.max_row

#     # Style both header rows FIRST
#     _style_row(ws, r1, _FILL_HDR, _WHITE_BOLD, is_header=True)
#     _style_row(ws, r2, _FILL_HDR, _WHITE_BOLD, is_header=True)

#     # Now merge (covered cells already styled)
#     ws.merge_cells(start_row=r1, start_column=5,  end_row=r1, end_column=7)
#     ws.merge_cells(start_row=r1, start_column=8,  end_row=r1, end_column=10)
#     ws.merge_cells(start_row=r1, start_column=11, end_row=r1, end_column=13)
#     ws.merge_cells(start_row=r1, start_column=14, end_row=r1, end_column=16)
#     ws.merge_cells(start_row=r1, start_column=2,  end_row=r2, end_column=2)
#     ws.merge_cells(start_row=r1, start_column=3,  end_row=r2, end_column=3)
#     ws.merge_cells(start_row=r1, start_column=4,  end_row=r2, end_column=4)
#     for col in range(17, 22):
#         ws.merge_cells(start_row=r1, start_column=col, end_row=r2, end_column=col)

#     ws.freeze_panes = "E6"

#     # ── Data rows ─────────────────────────────────────────────────────────────
#     head_total_rows = []
#     head_counter    = 0

#     for head in data:
#         head_counter += 1
#         alpha_index = chr(64 + head_counter)
#         head_name   = (head.get("name") or "").strip().upper()

#         # ── COVID SUPPORT (special single-row treatment) ──────────────────────
#         if head_name == "COVID SUPPORT":
#             ws.append([])
#             item = head["items"][0] if head.get("items") else {}
#             r = ws.max_row + 1
#             ws.append([
#                 "", alpha_index,
#                 head["name"],
#                 item.get("name", ""),
#                 *item.get("q1", [0,0,0]),
#                 *item.get("q2", [0,0,0]),
#                 *item.get("q3", [0,0,0]),
#                 *item.get("q4", [0,0,0]),
#                 *_qtr_formulas(r),
#             ])
#             _style_row(ws, ws.max_row, font=_NORMAL)
#             _fmt_numeric(ws, ws.max_row)
#             ws.cell(row=ws.max_row, column=COL_HEAD).font = _BOLD
#             continue

#         # ── Section label row (A / B …) ───────────────────────────────────────
#         ws.append(["", alpha_index, head["name"]])
#         r_sec = ws.max_row
#         # Style all cells in merge span BEFORE merging
#         for col in range(COL_HEAD, COL_END + 1):
#             c = ws.cell(row=r_sec, column=col)
#             c.fill   = _FILL_HEAD
#             c.font   = _BOLD
#             c.border = _BORDER
#             c.alignment = _LEFT
#         ws.cell(row=r_sec, column=COL_SI).fill   = _FILL_HEAD
#         ws.cell(row=r_sec, column=COL_SI).border = _BORDER
#         ws.merge_cells(start_row=r_sec, start_column=COL_HEAD,
#                        end_row=r_sec,   end_column=COL_END)

#         if head_name == "OPERATING EXPENSES":
#             ws.append([])

#         sub_total_rows   = []
#         direct_item_rows = []

#         # ── Direct items (no sub-head) ────────────────────────────────────────
#         for item in head.get("items", []):
#             r = ws.max_row + 1
#             sub_val      = item.get("sub_head_of_expense") or ""
#             head_display = sub_val.strip()
#             ws.append([
#                 "", "",
#                 head_display,
#                 item["name"],
#                 *item.get("q1", [0,0,0]),
#                 *item.get("q2", [0,0,0]),
#                 *item.get("q3", [0,0,0]),
#                 *item.get("q4", [0,0,0]),
#                 *_qtr_formulas(r),
#             ])
#             _style_row(ws, ws.max_row, font=_NORMAL)
#             _fmt_numeric(ws, ws.max_row)
#             direct_item_rows.append(ws.max_row)

#         # ── Sub-heads (I / II …) ──────────────────────────────────────────────
#         sub_counter = 1
#         for sub in head.get("sub_heads", []):
#             roman_index = _to_roman(sub_counter)

#             ws.append(["", roman_index, sub["name"]])
#             r_sub = ws.max_row
#             # Style BEFORE merge
#             for col in range(COL_HEAD, COL_END + 1):
#                 c = ws.cell(row=r_sub, column=col)
#                 c.fill      = _FILL_SUBHEAD
#                 c.font      = _BOLD
#                 c.border    = _BORDER
#                 c.alignment = _LEFT
#             ws.cell(row=r_sub, column=COL_SI).fill   = _FILL_SUBHEAD
#             ws.cell(row=r_sub, column=COL_SI).border = _BORDER
#             ws.merge_cells(start_row=r_sub, start_column=COL_HEAD,
#                            end_row=r_sub,   end_column=COL_END)

#             sub_item_rows = []
#             for item in sub.get("items", []):
#                 r = ws.max_row + 1
#                 item_sub  = item.get("sub_head_of_expense") or ""
#                 sub_name  = sub.get("name") or ""
#                 head_display = ""
#                 cleaned = item_sub.strip()
#                 if cleaned and cleaned.lower() != sub_name.strip().lower():
#                     head_display = cleaned
#                 ws.append([
#                     "", "",
#                     head_display,
#                     item["name"],
#                     *item.get("q1", [0,0,0]),
#                     *item.get("q2", [0,0,0]),
#                     *item.get("q3", [0,0,0]),
#                     *item.get("q4", [0,0,0]),
#                     *_qtr_formulas(r),
#                 ])
#                 _style_row(ws, ws.max_row, font=_NORMAL)
#                 _fmt_numeric(ws, ws.max_row)
#                 sub_item_rows.append(ws.max_row)

#             if sub_item_rows:
#                 ws.append([
#                     "", "", "",
#                     f"TOTAL - {sub['name']}",
#                     *_totals_from_rows(sub_item_rows),
#                 ])
#                 _style_row(ws, ws.max_row, _FILL_SUBTOTAL, _BOLD)
#                 _fmt_numeric(ws, ws.max_row)
#                 sub_total_rows.append(ws.max_row)

#             sub_counter += 1

#         # ── Head total row ────────────────────────────────────────────────────
#         total_rows = sub_total_rows if sub_total_rows else direct_item_rows
#         if total_rows:
#             ws.append([
#                 "", "", "",
#                 f"TOTAL - {head['name']}",
#                 *_totals_from_rows(total_rows),
#             ])
#             _style_row(ws, ws.max_row, _FILL_HTOTAL, _BOLD)
#             _fmt_numeric(ws, ws.max_row)
#             head_total_rows.append(ws.max_row)

#             if head_name == "OPERATING EXPENSES":
#                 ws.append([])

#     # ── Clean up stray blank row before COVID SUPPORT ─────────────────────────
#     for r in range(ws.max_row, 1, -1):
#         if (ws.cell(r, COL_HEAD).value == "COVID SUPPORT" and
#                 ws.cell(r - 1, COL_HEAD).value is None):
#             ws.delete_rows(r - 1)
#             break

#     # ── Grand total ───────────────────────────────────────────────────────────
#     if head_total_rows:
#         ws.append([
#             "", "", "",
#             "GRAND TOTAL",
#             *_totals_from_rows(head_total_rows),
#         ])
#         _style_row(ws, ws.max_row, _FILL_GRAND, _BOLD)
#         _fmt_numeric(ws, ws.max_row)

#     _auto_col_widths(ws)
#     return ws


# # ═══════════════════════════════════════════════════════════════════════════════
# # SHEET BUILDER — Estimate Consolidated  (same structure as Annual)
# # ═══════════════════════════════════════════════════════════════════════════════

# def _sheet_estimate(wb, sheet_name, data, fy,
#                     org_name="Azim Premji Foundation"):
#     """
#     estimate data items carry Q1..Q4 as floats and a months dict.
#     We map months → q1/q2/q3/q4 lists so the same row-writing
#     logic as Annual works unchanged.
#     """
#     MONTH_MAP = {
#         "q1": ["4",  "5",  "6"],
#         "q2": ["7",  "8",  "9"],
#         "q3": ["10", "11", "12"],
#         "q4": ["1",  "2",  "3"],
#     }

#     def _to_qlist(obj):
#         """Convert months dict → {q1:[v,v,v], q2:…, q3:…, q4:…}."""
#         m = obj.get("months") or {}
#         out = {}
#         for qk, keys in MONTH_MAP.items():
#             out[qk] = [float(m.get(k, 0) or 0) for k in keys]
#         return out

#     def _normalise(obj):
#         """Add q1..q4 lists to an item/sub/head dict in-place."""
#         ql = _to_qlist(obj)
#         obj.update(ql)
#         for item in obj.get("items", []):
#             ql2 = _to_qlist(item)
#             item.update(ql2)
#         for sub in obj.get("sub_heads", []):
#             ql3 = _to_qlist(sub)
#             sub.update(ql3)
#             for item in sub.get("items", []):
#                 ql4 = _to_qlist(item)
#                 item.update(ql4)
#         return obj

#     normalised = [_normalise(dict(h)) for h in (data or [])]

#     ws = wb.create_sheet(title=sheet_name[:31])

#     # Row 1-2: title
#     ws.append(["", org_name])
#     ws.merge_cells("B1:U1")
#     ws["B1"].font      = Font(size=14, bold=True, name="Calibri")
#     ws["B1"].alignment = _LEFT

#     ws.append(["", f"Estimate for the Financial Year {fy or ''}"])
#     ws.merge_cells("B2:U2")
#     ws["B2"].font      = Font(size=12, bold=True, name="Calibri")
#     ws["B2"].alignment = _LEFT

#     ws.append([])

#     # Rows 4-5: headers — style then merge
#     ws.append([
#         "", "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "QUARTER I","","","QUARTER II","","",
#         "QUARTER III","","","QUARTER IV","","",
#         "QTR-1","QTR-2","QTR-3","QTR-4", f"YEAR {fy}",
#     ])
#     r1 = ws.max_row
#     ws.append([
#         "", "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
#         "Apr","May","Jun","Jul","Aug","Sep",
#         "Oct","Nov","Dec","Jan","Feb","Mar",
#         "QTR-1","QTR-2","QTR-3","QTR-4", f"YEAR {fy}",
#     ])
#     r2 = ws.max_row

#     _style_row(ws, r1, _FILL_HDR, _WHITE_BOLD, is_header=True)
#     _style_row(ws, r2, _FILL_HDR, _WHITE_BOLD, is_header=True)

#     ws.merge_cells(start_row=r1, start_column=5,  end_row=r1, end_column=7)
#     ws.merge_cells(start_row=r1, start_column=8,  end_row=r1, end_column=10)
#     ws.merge_cells(start_row=r1, start_column=11, end_row=r1, end_column=13)
#     ws.merge_cells(start_row=r1, start_column=14, end_row=r1, end_column=16)
#     ws.merge_cells(start_row=r1, start_column=2,  end_row=r2, end_column=2)
#     ws.merge_cells(start_row=r1, start_column=3,  end_row=r2, end_column=3)
#     ws.merge_cells(start_row=r1, start_column=4,  end_row=r2, end_column=4)
#     for col in range(17, 22):
#         ws.merge_cells(start_row=r1, start_column=col, end_row=r2, end_column=col)

#     ws.freeze_panes = "E6"

#     # Reuse the same data-writing loop as Annual (data is now normalised)
#     head_total_rows = []
#     head_counter    = 0

#     for head in normalised:
#         head_counter += 1
#         alpha_index = chr(64 + head_counter)
#         head_name   = (head.get("name") or "").strip().upper()

#         if head_name == "COVID SUPPORT":
#             ws.append([])
#             item = head["items"][0] if head.get("items") else {}
#             r = ws.max_row + 1
#             ws.append([
#                 "", alpha_index,
#                 head["name"], item.get("name", ""),
#                 *item.get("q1",[0,0,0]), *item.get("q2",[0,0,0]),
#                 *item.get("q3",[0,0,0]), *item.get("q4",[0,0,0]),
#                 *_qtr_formulas(r),
#             ])
#             _style_row(ws, ws.max_row, font=_NORMAL)
#             _fmt_numeric(ws, ws.max_row)
#             ws.cell(row=ws.max_row, column=COL_HEAD).font = _BOLD
#             continue

#         ws.append(["", alpha_index, head["name"]])
#         r_sec = ws.max_row
#         for col in range(COL_HEAD, COL_END + 1):
#             c = ws.cell(row=r_sec, column=col)
#             c.fill = _FILL_HEAD; c.font = _BOLD
#             c.border = _BORDER;  c.alignment = _LEFT
#         ws.cell(row=r_sec, column=COL_SI).fill   = _FILL_HEAD
#         ws.cell(row=r_sec, column=COL_SI).border = _BORDER
#         ws.merge_cells(start_row=r_sec, start_column=COL_HEAD,
#                        end_row=r_sec,   end_column=COL_END)

#         if head_name == "OPERATING EXPENSES":
#             ws.append([])

#         sub_total_rows = []
#         direct_item_rows = []

#         for item in head.get("items", []):
#             r = ws.max_row + 1
#             sub_val = item.get("sub_head_of_expense") or ""
#             ws.append([
#                 "", "", sub_val.strip(), item["name"],
#                 *item.get("q1",[0,0,0]), *item.get("q2",[0,0,0]),
#                 *item.get("q3",[0,0,0]), *item.get("q4",[0,0,0]),
#                 *_qtr_formulas(r),
#             ])
#             _style_row(ws, ws.max_row, font=_NORMAL)
#             _fmt_numeric(ws, ws.max_row)
#             direct_item_rows.append(ws.max_row)

#         sub_counter = 1
#         for sub in head.get("sub_heads", []):
#             roman_index = _to_roman(sub_counter)
#             ws.append(["", roman_index, sub["name"]])
#             r_sub = ws.max_row
#             for col in range(COL_HEAD, COL_END + 1):
#                 c = ws.cell(row=r_sub, column=col)
#                 c.fill = _FILL_SUBHEAD; c.font = _BOLD
#                 c.border = _BORDER;     c.alignment = _LEFT
#             ws.cell(row=r_sub, column=COL_SI).fill   = _FILL_SUBHEAD
#             ws.cell(row=r_sub, column=COL_SI).border = _BORDER
#             ws.merge_cells(start_row=r_sub, start_column=COL_HEAD,
#                            end_row=r_sub,   end_column=COL_END)

#             sub_item_rows = []
#             for item in sub.get("items", []):
#                 r = ws.max_row + 1
#                 item_sub = (item.get("sub_head_of_expense") or "").strip()
#                 sub_name = (sub.get("name") or "").strip()
#                 head_display = item_sub if item_sub.lower() != sub_name.lower() else ""
#                 ws.append([
#                     "", "", head_display, item["name"],
#                     *item.get("q1",[0,0,0]), *item.get("q2",[0,0,0]),
#                     *item.get("q3",[0,0,0]), *item.get("q4",[0,0,0]),
#                     *_qtr_formulas(r),
#                 ])
#                 _style_row(ws, ws.max_row, font=_NORMAL)
#                 _fmt_numeric(ws, ws.max_row)
#                 sub_item_rows.append(ws.max_row)

#             if sub_item_rows:
#                 ws.append([
#                     "", "", "", f"TOTAL - {sub['name']}",
#                     *_totals_from_rows(sub_item_rows),
#                 ])
#                 _style_row(ws, ws.max_row, _FILL_SUBTOTAL, _BOLD)
#                 _fmt_numeric(ws, ws.max_row)
#                 sub_total_rows.append(ws.max_row)

#             sub_counter += 1

#         total_rows = sub_total_rows if sub_total_rows else direct_item_rows
#         if total_rows:
#             ws.append([
#                 "", "", "", f"TOTAL - {head['name']}",
#                 *_totals_from_rows(total_rows),
#             ])
#             _style_row(ws, ws.max_row, _FILL_HTOTAL, _BOLD)
#             _fmt_numeric(ws, ws.max_row)
#             head_total_rows.append(ws.max_row)
#             if head_name == "OPERATING EXPENSES":
#                 ws.append([])

#     for r in range(ws.max_row, 1, -1):
#         if (ws.cell(r, COL_HEAD).value == "COVID SUPPORT" and
#                 ws.cell(r-1, COL_HEAD).value is None):
#             ws.delete_rows(r - 1)
#             break

#     if head_total_rows:
#         ws.append([
#             "", "", "", "GRAND TOTAL",
#             *_totals_from_rows(head_total_rows),
#         ])
#         _style_row(ws, ws.max_row, _FILL_GRAND, _BOLD)
#         _fmt_numeric(ws, ws.max_row)

#     _auto_col_widths(ws)
#     return ws


# # ═══════════════════════════════════════════════════════════════════════════════
# # SHEET BUILDER — PPT / Foundation level
# # ═══════════════════════════════════════════════════════════════════════════════
# #
# # Columns: Unit | Budget Opex | Budget Capex | Budget Total | Est Opex | Est Capex | Est Total
# #

# def _sheet_ppt(wb, sheet_name, rows, budget_label, est_label,
#                fy="2025-26", org_name="Azim Premji Foundation"):
#     ws = wb.create_sheet(title=sheet_name[:31])

#     # Row 1-2
#     ws.append(["", org_name])
#     ws.merge_cells("B1:H1")
#     ws["B1"].font      = Font(size=14, bold=True, name="Calibri")
#     ws["B1"].alignment = _LEFT
#     ws.append(["", f"Foundation Level Metrics – {fy}"])
#     ws.merge_cells("B2:H2")
#     ws["B2"].font      = Font(size=12, bold=True, name="Calibri")
#     ws["B2"].alignment = _LEFT
#     ws.append([])

#     # Rows 4-5: headers — style BEFORE merge
#     for col in range(2, 9):
#         c4 = ws.cell(4, col)
#         c4.fill = _FILL_HDR; c4.font = _WHITE_BOLD
#         c4.border = _BORDER; c4.alignment = _CENTER
#         c5 = ws.cell(5, col)
#         c5.fill = _FILL_HDR; c5.font = _WHITE_BOLD
#         c5.border = _BORDER; c5.alignment = _CENTER

#     ws.cell(4, 2, "Unit")
#     ws.cell(4, 3, budget_label)
#     ws.cell(4, 6, est_label)
#     for col, lbl in zip(range(3, 9), ["Opex","Capex","Total","Opex","Capex","Total"]):
#         ws.cell(5, col, lbl)

#     ws.merge_cells(start_row=4, start_column=2, end_row=5, end_column=2)  # Unit
#     ws.merge_cells(start_row=4, start_column=3, end_row=4, end_column=5)  # Budget
#     ws.merge_cells(start_row=4, start_column=6, end_row=4, end_column=8)  # Estimate

#     thin = Side(style="thin")
#     border = Border(left=thin, right=thin, top=thin, bottom=thin)

#     for row in rows:
#         is_total = row.get("is_total", False)
#         label    = row.get("label", "")
#         bO = float(row.get("bOpex",  0) or 0)
#         bC = float(row.get("bCapex", 0) or 0)
#         eO = float(row.get("eOpex",  0) or 0)
#         eC = float(row.get("eCapex", 0) or 0)

#         ws.append(["", label, bO, bC, bO + bC, eO, eC, eO + eC])
#         r = ws.max_row
#         fill = _FILL_HTOTAL if is_total else _FILL_WHITE
#         font = _BOLD if is_total else _NORMAL
#         for col in range(2, 9):
#             cell = ws.cell(r, col)
#             cell.fill   = fill
#             cell.font   = font
#             cell.border = border
#             cell.alignment = _RIGHT if col > 2 else _LEFT
#             if col > 2:
#                 cell.number_format = NUM_FMT

#     _auto_col_widths(ws)
#     return ws


# # ═══════════════════════════════════════════════════════════════════════════════
# # SHEET BUILDER — Budget & Estimate
# # ═══════════════════════════════════════════════════════════════════════════════

# def _sheet_be(wb, sheet_name, be_data, fy, plan_label, est_label,
#               org_name="Azim Premji Foundation"):
#     ws = wb.create_sheet(title=sheet_name[:31])

#     entities   = be_data or []
#     n          = len(entities)
#     # Col layout: B=HEAD, C=TYPE, then 2 cols per entity, then 2 grand-total cols
#     # All 1-based; col B = 2
#     TOTAL_COLS = 1 + 2 + n * 2 + 2   # col A unused + HEAD + TYPE + entities + grand
#     grand_p_col = 2 + 2 + n * 2 + 1  # first grand total col (1-based)
#     grand_e_col = grand_p_col + 1

#     # Row 1-2
#     ws.append(["", org_name])
#     for col in range(2, grand_e_col + 1):
#         ws.cell(1, col)  # ensure cells exist
#     ws.merge_cells(start_row=1, start_column=2, end_row=1, end_column=grand_e_col)
#     ws["B1"].font      = Font(size=14, bold=True, name="Calibri")
#     ws["B1"].alignment = _LEFT

#     ws.append(["", f"Budget & Estimate – {fy}"])
#     ws.merge_cells(start_row=2, start_column=2, end_row=2, end_column=grand_e_col)
#     ws["B2"].font      = Font(size=12, bold=True, name="Calibri")
#     ws["B2"].alignment = _LEFT
#     ws.append([])

#     # Rows 4-5: headers — style ALL cells BEFORE any merges
#     for col in range(2, grand_e_col + 1):
#         for row in [4, 5]:
#             c = ws.cell(row, col)
#             c.fill = _FILL_HDR; c.font = _WHITE_BOLD
#             c.border = _BORDER; c.alignment = _CENTER

#     ws.cell(4, 2, "HEAD OF EXPENSE"); ws.cell(4, 3, "TYPE OF EXPENSE")
#     for ei, entity in enumerate(entities):
#         cs = 4 + ei * 2
#         ws.cell(4, cs, entity.get("label", ""))
#     ws.cell(4, grand_p_col, "GRAND TOTAL")

#     for ei in range(n):
#         cs = 4 + ei * 2
#         ws.cell(5, cs,     plan_label)
#         ws.cell(5, cs + 1, est_label)
#     ws.cell(5, grand_p_col,     plan_label)
#     ws.cell(5, grand_e_col,     est_label)

#     # Merges AFTER styling
#     ws.merge_cells(start_row=4, start_column=2, end_row=5, end_column=2)
#     ws.merge_cells(start_row=4, start_column=3, end_row=5, end_column=3)
#     for ei in range(n):
#         cs = 4 + ei * 2
#         ws.merge_cells(start_row=4, start_column=cs, end_row=4, end_column=cs + 1)
#     ws.merge_cells(start_row=4, start_column=grand_p_col, end_row=4, end_column=grand_e_col)

#     ws.freeze_panes = ws.cell(6, 4).coordinate

#     # ── Value helpers ─────────────────────────────────────────────────────────
#     PF = "ytd"; EF = "total_posted_amt_ytd"; IF_E = "total_posted_amt"

#     def _sec_v(entity, sname, f):
#         for s in entity.get("actuals", []):
#             if s.get("name") == sname:
#                 return float(s.get(f, 0) or 0)
#         return 0.0

#     def _sub_v(entity, sname, subname, f):
#         for s in entity.get("actuals", []):
#             if s.get("name") == sname:
#                 for sub in s.get("sub_heads", []):
#                     if sub.get("name") == subname:
#                         return float(sub.get(f, 0) or 0)
#         return 0.0

#     def _item_v(entity, iname, use_est=False):
#         f = IF_E if use_est else PF
#         for s in entity.get("actuals", []):
#             for item in s.get("items", []):
#                 if item.get("name") == iname:
#                     return float(item.get(f, 0) or 0)
#             for sub in s.get("sub_heads", []):
#                 for item in sub.get("items", []):
#                     if item.get("name") == iname:
#                         return float(item.get(f, 0) or 0)
#         return 0.0

#     def _grand_v(entity, f):
#         return sum(float(s.get(f, 0) or 0) for s in entity.get("actuals", []))

#     thin2  = Side(style="thin")
#     brd2   = Border(left=thin2, right=thin2, top=thin2, bottom=thin2)

#     def _write_be_row(head_val, type_val, vp_list, ve_list, fill, font):
#         ws.append(["", head_val, type_val] + [""] * (grand_e_col - 3))
#         r = ws.max_row
#         gp = ge = 0.0
#         for ei, (p, e) in enumerate(zip(vp_list, ve_list)):
#             cs = 4 + ei * 2
#             cp = ws.cell(r, cs);     cp.value = p
#             ce = ws.cell(r, cs + 1); ce.value = e
#             gp += p; ge += e
#         ws.cell(r, grand_p_col).value = gp
#         ws.cell(r, grand_e_col).value = ge
#         for col in range(2, grand_e_col + 1):
#             c = ws.cell(r, col)
#             c.fill = fill; c.font = font; c.border = brd2
#             c.alignment = _RIGHT if col > 3 else _LEFT
#             if col > 3:
#                 c.number_format = NUM_FMT

#     if not entities:
#         return ws

#     for sec in entities[0].get("actuals", []):
#         sname = sec.get("name", "")

#         # Section row
#         ws.append(["", sname])
#         r_sec = ws.max_row
#         for col in range(2, grand_e_col + 1):
#             c = ws.cell(r_sec, col)
#             c.fill = _FILL_HEAD; c.font = _BOLD
#             c.border = brd2;     c.alignment = _LEFT
#         ws.merge_cells(start_row=r_sec, start_column=2,
#                        end_row=r_sec,   end_column=grand_e_col)

#         for sub in sec.get("sub_heads", []):
#             subname = sub.get("name", "")
#             vp = [_sub_v(e, sname, subname, PF) for e in entities]
#             ve = [_sub_v(e, sname, subname, EF) for e in entities]
#             _write_be_row(sname, subname, vp, ve, _FILL_SUBHEAD, _BOLD)
#             for item in sub.get("items", []):
#                 iname = item.get("name", "")
#                 vp = [_item_v(e, iname, use_est=False) for e in entities]
#                 ve = [_item_v(e, iname, use_est=True)  for e in entities]
#                 _write_be_row("", iname, vp, ve, _FILL_WHITE, _NORMAL)

#         for item in sec.get("items", []):
#             iname = item.get("name", "")
#             vp = [_item_v(e, iname, use_est=False) for e in entities]
#             ve = [_item_v(e, iname, use_est=True)  for e in entities]
#             _write_be_row(sname, iname, vp, ve, _FILL_WHITE, _NORMAL)

#         vp = [_sec_v(e, sname, PF) for e in entities]
#         ve = [_sec_v(e, sname, EF) for e in entities]
#         _write_be_row(f"TOTAL - {sname}", "", vp, ve, _FILL_HTOTAL, _BOLD)

#     vp = [_grand_v(e, PF) for e in entities]
#     ve = [_grand_v(e, EF) for e in entities]
#     _write_be_row("GRAND TOTAL", "", vp, ve, _FILL_GRAND, _BOLD)

#     _auto_col_widths(ws)
#     return ws


# # ═══════════════════════════════════════════════════════════════════════════════
# # FY HELPERS
# # ═══════════════════════════════════════════════════════════════════════════════

# def _fy_labels(fy):
#     parts    = (fy or "2025-26").split("-")
#     start_yy = (parts[0] or "2025")[-2:]
#     end_yy   = (parts[1] if len(parts) > 1 else "26")[-2:]
#     prev_s   = str(int(start_yy) - 1).zfill(2)
#     prev_e   = str(int(end_yy)   - 1).zfill(2)
#     return {
#         "plan": f"FY{start_yy}-{end_yy} Plan",
#         "est":  f"FY{prev_s}-{prev_e} Estimate",
#     }

# def _prev_fy(fy):
#     parts = (fy or "2025-26").split("-")
#     s = int(parts[0] or 2025) - 1
#     e = int(parts[1] or 26)   - 1
#     return f"{s}-{str(e).zfill(2)}"


# # ═══════════════════════════════════════════════════════════════════════════════
# # WHITELISTED API ENDPOINTS
# # ═══════════════════════════════════════════════════════════════════════════════

# @frappe.whitelist()
# def export_ppt(financial_year, ppt_rows, prev_ppt_rows,
#                budget_label, est_label, prev_budget_label, prev_est_label):
#     fy      = financial_year or "2025-26"
#     prev_fy = _prev_fy(fy)
#     wb = Workbook(); wb.remove(wb.active)
#     _sheet_ppt(wb, f"Foundation Metrics ({fy})",
#                json.loads(ppt_rows), budget_label, est_label, fy=fy)
#     _sheet_ppt(wb, f"Foundation Metrics ({prev_fy})",
#                json.loads(prev_ppt_rows), prev_budget_label, prev_est_label, fy=prev_fy)
#     return {"filename": f"CB_Foundation_Metrics_{fy}.xlsx", "data": _wb_to_b64(wb)}


# @frappe.whitelist()
# def export_annual(financial_year, annual_data):
#     fy = financial_year or "2025-26"
#     wb = Workbook(); wb.remove(wb.active)
#     _sheet_annual(wb, "Annual Budget", json.loads(annual_data), fy)
#     return {"filename": f"CB_Annual_Budget_{fy}.xlsx", "data": _wb_to_b64(wb)}


# @frappe.whitelist()
# def export_estimate(financial_year, estimate_data):
#     fy = financial_year or "2025-26"
#     wb = Workbook(); wb.remove(wb.active)
#     _sheet_estimate(wb, "Estimate", json.loads(estimate_data), fy)
#     return {"filename": f"CB_Estimate_{fy}.xlsx", "data": _wb_to_b64(wb)}


# @frappe.whitelist()
# def export_budget_estimate(financial_year, be_data):
#     fy     = financial_year or "2025-26"
#     labels = _fy_labels(fy)
#     wb = Workbook(); wb.remove(wb.active)
#     _sheet_be(wb, "Budget & Estimate", json.loads(be_data),
#               fy, labels["plan"], labels["est"])
#     return {"filename": f"CB_BudgetEstimate_{fy}.xlsx", "data": _wb_to_b64(wb)}


# @frappe.whitelist()
# def export_all(financial_year, ppt_rows, prev_ppt_rows,
#                budget_label, est_label, prev_budget_label, prev_est_label,
#                annual_data, estimate_data, be_data):
#     fy      = financial_year or "2025-26"
#     prev_fy = _prev_fy(fy)
#     labels  = _fy_labels(fy)
#     wb = Workbook(); wb.remove(wb.active)
#     _sheet_ppt(wb, f"Foundation Metrics ({fy})",
#                json.loads(ppt_rows), budget_label, est_label, fy=fy)
#     _sheet_ppt(wb, f"Foundation Metrics ({prev_fy})",
#                json.loads(prev_ppt_rows), prev_budget_label, prev_est_label, fy=prev_fy)
#     _sheet_annual(wb,   "Annual Budget",     json.loads(annual_data),   fy)
#     _sheet_estimate(wb, "Estimate",          json.loads(estimate_data), fy)
#     _sheet_be(wb,       "Budget & Estimate", json.loads(be_data),
#               fy, labels["plan"], labels["est"])
#     return {"filename": f"CB_Consolidated_All_{fy}.xlsx", "data": _wb_to_b64(wb)}




# annual_budget/api/export_reports.py
#
# Server-side Excel export — design matches the screenshot:
#   Row 1       : Org name  (no fill, bold 14pt)
#   Row 2       : Subtitle  (no fill, bold 12pt)
#   Row 3       : Blank spacer
#   Row 4-5     : Quarter / month headers  (grey #5D6D7E, white bold)
#   Section rows: A / B … label  (grey #D6DBDF, bold, merged)
#   Sub-head    : I / II … label  (light grey #F2F3F4, bold, merged)
#   Item rows   : white, normal
#   Sub-total   : #EBF5FB, bold
#   Head total  : #D4E6F1, bold
#   Grand total : #A9CCE3, bold
#
# Numbers use Excel SUM() formulas exactly like the reference code.
# Requires:  bench pip install openpyxl
# Place at:  annual_budget/api/export_reports.py

import io
import base64
import json

import frappe
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

# ═══════════════════════════════════════════════════════════════════════════════
# SHARED STYLE CONSTANTS  (matching reference code exactly)
# ═══════════════════════════════════════════════════════════════════════════════

_CENTER  = Alignment(horizontal="center", vertical="center")
_LEFT    = Alignment(horizontal="left",   vertical="center")
_RIGHT   = Alignment(horizontal="right",  vertical="center")
_WRAP_L  = Alignment(horizontal="left",   vertical="center", wrap_text=True)

_BOLD       = Font(bold=True, name="Calibri", size=9)
_WHITE_BOLD = Font(bold=True, color="FFFFFF", name="Calibri", size=9)
_NORMAL     = Font(name="Calibri", size=9)

_FILL_HDR      = PatternFill("solid", fgColor="5D6D7E")   # dark blue-grey  — column headers
_FILL_HEAD     = PatternFill("solid", fgColor="D6DBDF")   # medium grey     — section rows (A/B/…)
_FILL_SUBHEAD  = PatternFill("solid", fgColor="F2F3F4")   # light grey      — sub-head rows (I/II/…)
_FILL_SUBTOTAL = PatternFill("solid", fgColor="EBF5FB")   # pale blue       — sub-total rows
_FILL_HTOTAL   = PatternFill("solid", fgColor="D4E6F1")   # mid blue        — head total rows
_FILL_GRAND    = PatternFill("solid", fgColor="A9CCE3")   # stronger blue   — grand total
_FILL_WHITE    = PatternFill("solid", fgColor="FFFFFF")

_THIN   = Side(style="thin")
_BORDER = Border(left=_THIN, right=_THIN, top=_THIN, bottom=_THIN)

NUM_FMT = "#,##0.00"

# Column indices (1-based)
COL_SI    = 2   # Sl #
COL_HEAD  = 3   # HEAD OF EXPENSE
COL_TYPE  = 4   # TYPE OF EXPENSE
COL_START = 5   # Apr  (first data column)
COL_END   = 21  # YEAR total  (last data column)
# Cols 5-7  = Apr May Jun
# Cols 8-10 = Jul Aug Sep
# Cols 11-13= Oct Nov Dec
# Cols 14-16= Jan Feb Mar
# Cols 17-20= QTR-1 QTR-2 QTR-3 QTR-4
# Col  21   = YEAR total


# ═══════════════════════════════════════════════════════════════════════════════
# LOW-LEVEL HELPERS
# ═══════════════════════════════════════════════════════════════════════════════

def _merge(ws, r1, c1, r2, c2):
    ws.merge_cells(start_row=r1, start_column=c1, end_row=r2, end_column=c2)


def _to_roman(num):
    vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
    syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]
    out = ""
    i = 0
    while num > 0:
        for _ in range(num // vals[i]):
            out += syms[i]
            num -= vals[i]
        i += 1
    return out


def _sum_formula(col_letter, rows):
    """Build =R1+R2+… formula from a list of row numbers."""
    if not rows:
        return 0
    return "=" + "+".join(f"{col_letter}{r}" for r in rows)


def _qtr_formulas(r):
    """
    Return the 5 formula strings for a data row r:
      QTR-1 = SUM(E:G), QTR-2 = SUM(H:J), QTR-3 = SUM(K:M),
      QTR-4 = SUM(N:P), YEAR  = SUM(Q:T)
    """
    return [
        f"=SUM(E{r}:G{r})",
        f"=SUM(H{r}:J{r})",
        f"=SUM(K{r}:M{r})",
        f"=SUM(N{r}:P{r})",
        f"=SUM(Q{r}:T{r})",
    ]


def _build_formula(col_letter, rows):
    """Same as reference code's build_formula."""
    if not rows:
        return 0
    return "=" + "+".join(f"{col_letter}{r}" for r in rows)


def _totals_from_rows(rows):
    """Return 17 formula cells (E..U) that sum the given row list."""
    return [_build_formula(c, rows)
            for c in list("EFGHIJKLMNOPQRSTU")]


def _style_row(ws, row, fill=None, font=None, is_header=False):
    """Apply border, alignment, fill, font to cols 2-21 (matching reference)."""
    for col in range(COL_SI, COL_END + 1):
        cell = ws.cell(row=row, column=col)
        cell.border = _BORDER
        if is_header:
            cell.alignment = _CENTER
        else:
            if col == COL_SI:
                cell.alignment = _CENTER
            elif col in (COL_HEAD, COL_TYPE):
                cell.alignment = _WRAP_L
            else:
                cell.alignment = _RIGHT
        if fill:
            cell.fill = fill
        if font:
            cell.font = font


def _fmt_numeric(ws, row):
    for col in range(COL_START, COL_END + 1):
        ws.cell(row=row, column=col).number_format = NUM_FMT


def _auto_col_widths(ws):
    for col in range(1, ws.max_column + 1):
        letter = get_column_letter(col)
        max_len = 0
        for row in range(1, ws.max_row + 1):
            val = ws.cell(row=row, column=col).value
            if val:
                s = str(val)
                if s.startswith("="):
                    s = "999,999,999.00"
                max_len = max(max_len, len(s))
        ws.column_dimensions[letter].width = min(max(max_len + 3, 10), 50)


def _wb_to_b64(wb):
    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)
    return base64.b64encode(buf.read()).decode("utf-8")


# ═══════════════════════════════════════════════════════════════════════════════
# SHEET BUILDER — Annual Budget  (directly mirrors reference code logic)
# ═══════════════════════════════════════════════════════════════════════════════

def _sheet_annual(wb, sheet_name, data, fy,
                  org_name="Azim Premji Foundation"):
    ws = wb.create_sheet(title=sheet_name[:31])

    # ── Row 1: Org name ───────────────────────────────────────────────────────
    ws.append(["", org_name])
    ws.merge_cells("B1:U1")
    ws["B1"].font      = Font(size=14, bold=True, name="Calibri")
    ws["B1"].alignment = _LEFT

    # ── Row 2: Subtitle ───────────────────────────────────────────────────────
    ws.append(["", f"Budget for the Financial Year {fy or ''}"])
    ws.merge_cells("B2:U2")
    ws["B2"].font      = Font(size=12, bold=True, name="Calibri")
    ws["B2"].alignment = _LEFT

    # ── Row 3: Blank ──────────────────────────────────────────────────────────
    ws.append([])

    # ── Rows 4-5: Headers — style BEFORE merging ─────────────────────────────
    ws.append([
        "", "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
        "QUARTER I",  "", "",
        "QUARTER II", "", "",
        "QUARTER III","", "",
        "QUARTER IV", "", "",
        "QTR-1","QTR-2","QTR-3","QTR-4",
        f"YEAR {fy}",
    ])
    r1 = ws.max_row

    ws.append([
        "", "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
        "Apr","May","Jun",
        "Jul","Aug","Sep",
        "Oct","Nov","Dec",
        "Jan","Feb","Mar",
        "QTR-1","QTR-2","QTR-3","QTR-4",
        f"YEAR {fy}",
    ])
    r2 = ws.max_row

    # Style both header rows FIRST
    _style_row(ws, r1, _FILL_HDR, _WHITE_BOLD, is_header=True)
    _style_row(ws, r2, _FILL_HDR, _WHITE_BOLD, is_header=True)

    # Now merge (covered cells already styled)
    ws.merge_cells(start_row=r1, start_column=5,  end_row=r1, end_column=7)
    ws.merge_cells(start_row=r1, start_column=8,  end_row=r1, end_column=10)
    ws.merge_cells(start_row=r1, start_column=11, end_row=r1, end_column=13)
    ws.merge_cells(start_row=r1, start_column=14, end_row=r1, end_column=16)
    ws.merge_cells(start_row=r1, start_column=2,  end_row=r2, end_column=2)
    ws.merge_cells(start_row=r1, start_column=3,  end_row=r2, end_column=3)
    ws.merge_cells(start_row=r1, start_column=4,  end_row=r2, end_column=4)
    for col in range(17, 22):
        ws.merge_cells(start_row=r1, start_column=col, end_row=r2, end_column=col)

    ws.freeze_panes = "E6"

    # ── Data rows ─────────────────────────────────────────────────────────────
    head_total_rows = []
    head_counter    = 0

    for head in data:
        head_counter += 1
        alpha_index = chr(64 + head_counter)
        head_name   = (head.get("name") or "").strip().upper()

        # ── COVID SUPPORT (special single-row treatment) ──────────────────────
        if head_name == "COVID SUPPORT":
            ws.append([])
            item = head["items"][0] if head.get("items") else {}
            r = ws.max_row + 1
            ws.append([
                "", alpha_index,
                head["name"],
                item.get("name", ""),
                *item.get("q1", [0,0,0]),
                *item.get("q2", [0,0,0]),
                *item.get("q3", [0,0,0]),
                *item.get("q4", [0,0,0]),
                *_qtr_formulas(r),
            ])
            _style_row(ws, ws.max_row, font=_NORMAL)
            _fmt_numeric(ws, ws.max_row)
            ws.cell(row=ws.max_row, column=COL_HEAD).font = _BOLD
            continue

        # ── Section label row (A / B …) ───────────────────────────────────────
        ws.append(["", alpha_index, head["name"]])
        r_sec = ws.max_row
        # Style all cells in merge span BEFORE merging
        for col in range(COL_HEAD, COL_END + 1):
            c = ws.cell(row=r_sec, column=col)
            c.fill   = _FILL_HEAD
            c.font   = _BOLD
            c.border = _BORDER
            c.alignment = _LEFT
        ws.cell(row=r_sec, column=COL_SI).fill   = _FILL_HEAD
        ws.cell(row=r_sec, column=COL_SI).border = _BORDER
        ws.merge_cells(start_row=r_sec, start_column=COL_HEAD,
                       end_row=r_sec,   end_column=COL_END)

        if head_name == "OPERATING EXPENSES":
            ws.append([])

        sub_total_rows   = []
        direct_item_rows = []

        # ── Direct items (no sub-head) ────────────────────────────────────────
        for item in head.get("items", []):
            r = ws.max_row + 1
            sub_val      = item.get("sub_head_of_expense") or ""
            head_display = sub_val.strip()
            ws.append([
                "", "",
                head_display,
                item["name"],
                *item.get("q1", [0,0,0]),
                *item.get("q2", [0,0,0]),
                *item.get("q3", [0,0,0]),
                *item.get("q4", [0,0,0]),
                *_qtr_formulas(r),
            ])
            _style_row(ws, ws.max_row, font=_NORMAL)
            _fmt_numeric(ws, ws.max_row)
            direct_item_rows.append(ws.max_row)

        # ── Sub-heads (I / II …) ──────────────────────────────────────────────
        sub_counter = 1
        for sub in head.get("sub_heads", []):
            roman_index = _to_roman(sub_counter)

            ws.append(["", roman_index, sub["name"]])
            r_sub = ws.max_row
            # Style BEFORE merge
            for col in range(COL_HEAD, COL_END + 1):
                c = ws.cell(row=r_sub, column=col)
                c.fill      = _FILL_SUBHEAD
                c.font      = _BOLD
                c.border    = _BORDER
                c.alignment = _LEFT
            ws.cell(row=r_sub, column=COL_SI).fill   = _FILL_SUBHEAD
            ws.cell(row=r_sub, column=COL_SI).border = _BORDER
            ws.merge_cells(start_row=r_sub, start_column=COL_HEAD,
                           end_row=r_sub,   end_column=COL_END)

            sub_item_rows = []
            for item in sub.get("items", []):
                r = ws.max_row + 1
                item_sub  = item.get("sub_head_of_expense") or ""
                sub_name  = sub.get("name") or ""
                head_display = ""
                cleaned = item_sub.strip()
                if cleaned and cleaned.lower() != sub_name.strip().lower():
                    head_display = cleaned
                ws.append([
                    "", "",
                    head_display,
                    item["name"],
                    *item.get("q1", [0,0,0]),
                    *item.get("q2", [0,0,0]),
                    *item.get("q3", [0,0,0]),
                    *item.get("q4", [0,0,0]),
                    *_qtr_formulas(r),
                ])
                _style_row(ws, ws.max_row, font=_NORMAL)
                _fmt_numeric(ws, ws.max_row)
                sub_item_rows.append(ws.max_row)

            if sub_item_rows:
                ws.append([
                    "", "", "",
                    f"TOTAL - {sub['name']}",
                    *_totals_from_rows(sub_item_rows),
                ])
                _style_row(ws, ws.max_row, _FILL_SUBTOTAL, _BOLD)
                _fmt_numeric(ws, ws.max_row)
                sub_total_rows.append(ws.max_row)

            sub_counter += 1

        # ── Head total row ────────────────────────────────────────────────────
        total_rows = sub_total_rows if sub_total_rows else direct_item_rows
        if total_rows:
            ws.append([
                "", "", "",
                f"TOTAL - {head['name']}",
                *_totals_from_rows(total_rows),
            ])
            _style_row(ws, ws.max_row, _FILL_HTOTAL, _BOLD)
            _fmt_numeric(ws, ws.max_row)
            head_total_rows.append(ws.max_row)

            if head_name == "OPERATING EXPENSES":
                ws.append([])

    # ── Clean up stray blank row before COVID SUPPORT ─────────────────────────
    for r in range(ws.max_row, 1, -1):
        if (ws.cell(r, COL_HEAD).value == "COVID SUPPORT" and
                ws.cell(r - 1, COL_HEAD).value is None):
            ws.delete_rows(r - 1)
            break

    # ── Grand total ───────────────────────────────────────────────────────────
    if head_total_rows:
        ws.append([
            "", "", "",
            "GRAND TOTAL",
            *_totals_from_rows(head_total_rows),
        ])
        _style_row(ws, ws.max_row, _FILL_GRAND, _BOLD)
        _fmt_numeric(ws, ws.max_row)

    _auto_col_widths(ws)
    return ws


# ═══════════════════════════════════════════════════════════════════════════════
# SHEET BUILDER — Estimate Consolidated  (same structure as Annual)
# ═══════════════════════════════════════════════════════════════════════════════

def _sheet_estimate(wb, sheet_name, data, fy,
                    org_name="Azim Premji Foundation"):
    """
    estimate data items carry Q1..Q4 as floats and a months dict.
    We map months → q1/q2/q3/q4 lists so the same row-writing
    logic as Annual works unchanged.
    """
    MONTH_MAP = {
        "q1": ["4",  "5",  "6"],
        "q2": ["7",  "8",  "9"],
        "q3": ["10", "11", "12"],
        "q4": ["1",  "2",  "3"],
    }

    def _to_qlist(obj):
        """Convert months dict → {q1:[v,v,v], q2:…, q3:…, q4:…}."""
        m = obj.get("months") or {}
        out = {}
        for qk, keys in MONTH_MAP.items():
            out[qk] = [float(m.get(k, 0) or 0) for k in keys]
        return out

    def _normalise(obj):
        """Add q1..q4 lists to an item/sub/head dict in-place."""
        ql = _to_qlist(obj)
        obj.update(ql)
        for item in obj.get("items", []):
            ql2 = _to_qlist(item)
            item.update(ql2)
        for sub in obj.get("sub_heads", []):
            ql3 = _to_qlist(sub)
            sub.update(ql3)
            for item in sub.get("items", []):
                ql4 = _to_qlist(item)
                item.update(ql4)
        return obj

    normalised = [_normalise(dict(h)) for h in (data or [])]

    ws = wb.create_sheet(title=sheet_name[:31])

    # Row 1-2: title
    ws.append(["", org_name])
    ws.merge_cells("B1:U1")
    ws["B1"].font      = Font(size=14, bold=True, name="Calibri")
    ws["B1"].alignment = _LEFT

    ws.append(["", f"Estimate for the Financial Year {fy or ''}"])
    ws.merge_cells("B2:U2")
    ws["B2"].font      = Font(size=12, bold=True, name="Calibri")
    ws["B2"].alignment = _LEFT

    ws.append([])

    # Rows 4-5: headers — style then merge
    ws.append([
        "", "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
        "QUARTER I","","","QUARTER II","","",
        "QUARTER III","","","QUARTER IV","","",
        "QTR-1","QTR-2","QTR-3","QTR-4", f"YEAR {fy}",
    ])
    r1 = ws.max_row
    ws.append([
        "", "Sl #", "HEAD OF EXPENSE", "TYPE OF EXPENSE",
        "Apr","May","Jun","Jul","Aug","Sep",
        "Oct","Nov","Dec","Jan","Feb","Mar",
        "QTR-1","QTR-2","QTR-3","QTR-4", f"YEAR {fy}",
    ])
    r2 = ws.max_row

    _style_row(ws, r1, _FILL_HDR, _WHITE_BOLD, is_header=True)
    _style_row(ws, r2, _FILL_HDR, _WHITE_BOLD, is_header=True)

    ws.merge_cells(start_row=r1, start_column=5,  end_row=r1, end_column=7)
    ws.merge_cells(start_row=r1, start_column=8,  end_row=r1, end_column=10)
    ws.merge_cells(start_row=r1, start_column=11, end_row=r1, end_column=13)
    ws.merge_cells(start_row=r1, start_column=14, end_row=r1, end_column=16)
    ws.merge_cells(start_row=r1, start_column=2,  end_row=r2, end_column=2)
    ws.merge_cells(start_row=r1, start_column=3,  end_row=r2, end_column=3)
    ws.merge_cells(start_row=r1, start_column=4,  end_row=r2, end_column=4)
    for col in range(17, 22):
        ws.merge_cells(start_row=r1, start_column=col, end_row=r2, end_column=col)

    ws.freeze_panes = "E6"

    # Reuse the same data-writing loop as Annual (data is now normalised)
    head_total_rows = []
    head_counter    = 0

    for head in normalised:
        head_counter += 1
        alpha_index = chr(64 + head_counter)
        head_name   = (head.get("name") or "").strip().upper()

        if head_name == "COVID SUPPORT":
            ws.append([])
            item = head["items"][0] if head.get("items") else {}
            r = ws.max_row + 1
            ws.append([
                "", alpha_index,
                head["name"], item.get("name", ""),
                *item.get("q1",[0,0,0]), *item.get("q2",[0,0,0]),
                *item.get("q3",[0,0,0]), *item.get("q4",[0,0,0]),
                *_qtr_formulas(r),
            ])
            _style_row(ws, ws.max_row, font=_NORMAL)
            _fmt_numeric(ws, ws.max_row)
            ws.cell(row=ws.max_row, column=COL_HEAD).font = _BOLD
            continue

        ws.append(["", alpha_index, head["name"]])
        r_sec = ws.max_row
        for col in range(COL_HEAD, COL_END + 1):
            c = ws.cell(row=r_sec, column=col)
            c.fill = _FILL_HEAD; c.font = _BOLD
            c.border = _BORDER;  c.alignment = _LEFT
        ws.cell(row=r_sec, column=COL_SI).fill   = _FILL_HEAD
        ws.cell(row=r_sec, column=COL_SI).border = _BORDER
        ws.merge_cells(start_row=r_sec, start_column=COL_HEAD,
                       end_row=r_sec,   end_column=COL_END)

        if head_name == "OPERATING EXPENSES":
            ws.append([])

        sub_total_rows = []
        direct_item_rows = []

        for item in head.get("items", []):
            r = ws.max_row + 1
            sub_val = item.get("sub_head_of_expense") or ""
            ws.append([
                "", "", sub_val.strip(), item["name"],
                *item.get("q1",[0,0,0]), *item.get("q2",[0,0,0]),
                *item.get("q3",[0,0,0]), *item.get("q4",[0,0,0]),
                *_qtr_formulas(r),
            ])
            _style_row(ws, ws.max_row, font=_NORMAL)
            _fmt_numeric(ws, ws.max_row)
            direct_item_rows.append(ws.max_row)

        sub_counter = 1
        for sub in head.get("sub_heads", []):
            roman_index = _to_roman(sub_counter)
            ws.append(["", roman_index, sub["name"]])
            r_sub = ws.max_row
            for col in range(COL_HEAD, COL_END + 1):
                c = ws.cell(row=r_sub, column=col)
                c.fill = _FILL_SUBHEAD; c.font = _BOLD
                c.border = _BORDER;     c.alignment = _LEFT
            ws.cell(row=r_sub, column=COL_SI).fill   = _FILL_SUBHEAD
            ws.cell(row=r_sub, column=COL_SI).border = _BORDER
            ws.merge_cells(start_row=r_sub, start_column=COL_HEAD,
                           end_row=r_sub,   end_column=COL_END)

            sub_item_rows = []
            for item in sub.get("items", []):
                r = ws.max_row + 1
                item_sub = (item.get("sub_head_of_expense") or "").strip()
                sub_name = (sub.get("name") or "").strip()
                head_display = item_sub if item_sub.lower() != sub_name.lower() else ""
                ws.append([
                    "", "", head_display, item["name"],
                    *item.get("q1",[0,0,0]), *item.get("q2",[0,0,0]),
                    *item.get("q3",[0,0,0]), *item.get("q4",[0,0,0]),
                    *_qtr_formulas(r),
                ])
                _style_row(ws, ws.max_row, font=_NORMAL)
                _fmt_numeric(ws, ws.max_row)
                sub_item_rows.append(ws.max_row)

            if sub_item_rows:
                ws.append([
                    "", "", "", f"TOTAL - {sub['name']}",
                    *_totals_from_rows(sub_item_rows),
                ])
                _style_row(ws, ws.max_row, _FILL_SUBTOTAL, _BOLD)
                _fmt_numeric(ws, ws.max_row)
                sub_total_rows.append(ws.max_row)

            sub_counter += 1

        total_rows = sub_total_rows if sub_total_rows else direct_item_rows
        if total_rows:
            ws.append([
                "", "", "", f"TOTAL - {head['name']}",
                *_totals_from_rows(total_rows),
            ])
            _style_row(ws, ws.max_row, _FILL_HTOTAL, _BOLD)
            _fmt_numeric(ws, ws.max_row)
            head_total_rows.append(ws.max_row)
            if head_name == "OPERATING EXPENSES":
                ws.append([])

    for r in range(ws.max_row, 1, -1):
        if (ws.cell(r, COL_HEAD).value == "COVID SUPPORT" and
                ws.cell(r-1, COL_HEAD).value is None):
            ws.delete_rows(r - 1)
            break

    if head_total_rows:
        ws.append([
            "", "", "", "GRAND TOTAL",
            *_totals_from_rows(head_total_rows),
        ])
        _style_row(ws, ws.max_row, _FILL_GRAND, _BOLD)
        _fmt_numeric(ws, ws.max_row)

    _auto_col_widths(ws)
    return ws


# ═══════════════════════════════════════════════════════════════════════════════
# SHEET BUILDER — PPT / Foundation level
# ═══════════════════════════════════════════════════════════════════════════════
#
# Columns: Unit | Budget Opex | Budget Capex | Budget Total | Est Opex | Est Capex | Est Total
#

def _sheet_ppt_combined(wb, sheet_name,
                        rows,      budget_label,      est_label,
                        prev_rows, prev_budget_label, prev_est_label,
                        fy="2025-26", prev_fy="2024-25",
                        org_name="Azim Premji Foundation"):
    """Both PPT tables (current FY + previous FY) in a single sheet."""
    ws = wb.create_sheet(title=sheet_name[:31])

    def _write_block(ws, start_row, block_rows, b_label, e_label, title):
        # Title row
        ws.cell(start_row, 2, title)
        for col in range(2, 9):
            c = ws.cell(start_row, col)
            c.fill = _FILL_HEAD; c.font = _BOLD
            c.border = _BORDER;  c.alignment = _LEFT
        ws.merge_cells(start_row=start_row, start_column=2,
                       end_row=start_row,   end_column=8)

        h1 = start_row + 1
        h2 = start_row + 2

        # Style all header cells BEFORE merging
        for col in range(2, 9):
            for hr in [h1, h2]:
                c = ws.cell(hr, col)
                c.fill = _FILL_HDR; c.font = _WHITE_BOLD
                c.border = _BORDER; c.alignment = _CENTER

        ws.cell(h1, 2, "Unit")
        ws.cell(h1, 3, b_label)
        ws.cell(h1, 6, e_label)
        for col, lbl in zip(range(3, 9), ["Opex","Capex","Total","Opex","Capex","Total"]):
            ws.cell(h2, col, lbl)

        ws.merge_cells(start_row=h1, start_column=2, end_row=h2, end_column=2)
        ws.merge_cells(start_row=h1, start_column=3, end_row=h1, end_column=5)
        ws.merge_cells(start_row=h1, start_column=6, end_row=h1, end_column=8)

        # Data rows
        next_row = h2 + 1
        thin = Side(style="thin")
        brd  = Border(left=thin, right=thin, top=thin, bottom=thin)
        for row in block_rows:
            is_total = row.get("is_total", False)
            label    = row.get("label", "")
            bO = float(row.get("bOpex",  0) or 0)
            bC = float(row.get("bCapex", 0) or 0)
            eO = float(row.get("eOpex",  0) or 0)
            eC = float(row.get("eCapex", 0) or 0)
            fill = _FILL_HTOTAL if is_total else _FILL_WHITE
            font = _BOLD        if is_total else _NORMAL
            for col, val in enumerate([label, bO, bC, bO+bC, eO, eC, eO+eC], start=2):
                c = ws.cell(next_row, col, val)
                c.fill = fill; c.font = font; c.border = brd
                c.alignment = _RIGHT if col > 2 else _LEFT
                if col > 2:
                    c.number_format = NUM_FMT
            next_row += 1

        return next_row  # first row after this block

    # Org name + subtitle
    ws.append(["", org_name])
    ws.merge_cells("B1:H1")
    ws["B1"].font = Font(size=14, bold=True, name="Calibri")
    ws["B1"].alignment = _LEFT
    ws.append(["", f"Foundation Level Metrics – {fy}"])
    ws.merge_cells("B2:H2")
    ws["B2"].font = Font(size=12, bold=True, name="Calibri")
    ws["B2"].alignment = _LEFT
    ws.append([])  # row 3 blank

    # Ensure enough rows exist before writing by pre-filling
    # (openpyxl creates rows on ws.cell() access, so just call _write_block)
    next_r = _write_block(ws, 4, rows, budget_label, est_label,
                          f"Overall Foundation – Budget vs. Estimate ({fy})")

    # Blank separator row between the two blocks
    next_r += 1

    _write_block(ws, next_r, prev_rows, prev_budget_label, prev_est_label,
                 f"Overall Foundation – Previous Year Budget vs. Estimate ({prev_fy})")

    _auto_col_widths(ws)
    return ws


def _sheet_ppt(wb, sheet_name, rows, budget_label, est_label,
               fy="2025-26", org_name="Azim Premji Foundation"):
    ws = wb.create_sheet(title=sheet_name[:31])

    # Row 1-2
    ws.append(["", org_name])
    ws.merge_cells("B1:H1")
    ws["B1"].font      = Font(size=14, bold=True, name="Calibri")
    ws["B1"].alignment = _LEFT
    ws.append(["", f"Foundation Level Metrics – {fy}"])
    ws.merge_cells("B2:H2")
    ws["B2"].font      = Font(size=12, bold=True, name="Calibri")
    ws["B2"].alignment = _LEFT
    ws.append([])

    # Rows 4-5: headers — style BEFORE merge
    for col in range(2, 9):
        c4 = ws.cell(4, col)
        c4.fill = _FILL_HDR; c4.font = _WHITE_BOLD
        c4.border = _BORDER; c4.alignment = _CENTER
        c5 = ws.cell(5, col)
        c5.fill = _FILL_HDR; c5.font = _WHITE_BOLD
        c5.border = _BORDER; c5.alignment = _CENTER

    ws.cell(4, 2, "Unit")
    ws.cell(4, 3, budget_label)
    ws.cell(4, 6, est_label)
    for col, lbl in zip(range(3, 9), ["Opex","Capex","Total","Opex","Capex","Total"]):
        ws.cell(5, col, lbl)

    ws.merge_cells(start_row=4, start_column=2, end_row=5, end_column=2)  # Unit
    ws.merge_cells(start_row=4, start_column=3, end_row=4, end_column=5)  # Budget
    ws.merge_cells(start_row=4, start_column=6, end_row=4, end_column=8)  # Estimate

    thin = Side(style="thin")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)

    for row in rows:
        is_total = row.get("is_total", False)
        label    = row.get("label", "")
        bO = float(row.get("bOpex",  0) or 0)
        bC = float(row.get("bCapex", 0) or 0)
        eO = float(row.get("eOpex",  0) or 0)
        eC = float(row.get("eCapex", 0) or 0)

        ws.append(["", label, bO, bC, bO + bC, eO, eC, eO + eC])
        r = ws.max_row
        fill = _FILL_HTOTAL if is_total else _FILL_WHITE
        font = _BOLD if is_total else _NORMAL
        for col in range(2, 9):
            cell = ws.cell(r, col)
            cell.fill   = fill
            cell.font   = font
            cell.border = border
            cell.alignment = _RIGHT if col > 2 else _LEFT
            if col > 2:
                cell.number_format = NUM_FMT

    _auto_col_widths(ws)
    return ws


# ═══════════════════════════════════════════════════════════════════════════════
# SHEET BUILDER — Budget & Estimate
# ═══════════════════════════════════════════════════════════════════════════════

def _sheet_be(wb, sheet_name, be_data, fy, plan_label, est_label,
              org_name="Azim Premji Foundation"):
    ws = wb.create_sheet(title=sheet_name[:31])

    entities   = be_data or []
    n          = len(entities)
    # Col layout: B=HEAD, C=TYPE, then 2 cols per entity, then 2 grand-total cols
    # All 1-based; col B = 2
    TOTAL_COLS = 1 + 2 + n * 2 + 2   # col A unused + HEAD + TYPE + entities + grand
    grand_p_col = 2 + 2 + n * 2 + 1  # first grand total col (1-based)
    grand_e_col = grand_p_col + 1

    # Row 1-2
    ws.append(["", org_name])
    for col in range(2, grand_e_col + 1):
        ws.cell(1, col)  # ensure cells exist
    ws.merge_cells(start_row=1, start_column=2, end_row=1, end_column=grand_e_col)
    ws["B1"].font      = Font(size=14, bold=True, name="Calibri")
    ws["B1"].alignment = _LEFT

    ws.append(["", f"Budget & Estimate – {fy}"])
    ws.merge_cells(start_row=2, start_column=2, end_row=2, end_column=grand_e_col)
    ws["B2"].font      = Font(size=12, bold=True, name="Calibri")
    ws["B2"].alignment = _LEFT
    ws.append([])

    # Rows 4-5: headers — style ALL cells BEFORE any merges
    for col in range(2, grand_e_col + 1):
        for row in [4, 5]:
            c = ws.cell(row, col)
            c.fill = _FILL_HDR; c.font = _WHITE_BOLD
            c.border = _BORDER; c.alignment = _CENTER

    ws.cell(4, 2, "HEAD OF EXPENSE"); ws.cell(4, 3, "TYPE OF EXPENSE")
    for ei, entity in enumerate(entities):
        cs = 4 + ei * 2
        ws.cell(4, cs, entity.get("label", ""))
    ws.cell(4, grand_p_col, "GRAND TOTAL")

    for ei in range(n):
        cs = 4 + ei * 2
        ws.cell(5, cs,     plan_label)
        ws.cell(5, cs + 1, est_label)
    ws.cell(5, grand_p_col,     plan_label)
    ws.cell(5, grand_e_col,     est_label)

    # Merges AFTER styling
    ws.merge_cells(start_row=4, start_column=2, end_row=5, end_column=2)
    ws.merge_cells(start_row=4, start_column=3, end_row=5, end_column=3)
    for ei in range(n):
        cs = 4 + ei * 2
        ws.merge_cells(start_row=4, start_column=cs, end_row=4, end_column=cs + 1)
    ws.merge_cells(start_row=4, start_column=grand_p_col, end_row=4, end_column=grand_e_col)

    ws.freeze_panes = ws.cell(6, 4).coordinate

    # ── Value helpers ─────────────────────────────────────────────────────────
    PF = "ytd"; EF = "total_posted_amt_ytd"; IF_E = "total_posted_amt"

    def _sec_v(entity, sname, f):
        for s in entity.get("actuals", []):
            if s.get("name") == sname:
                return float(s.get(f, 0) or 0)
        return 0.0

    def _sub_v(entity, sname, subname, f):
        for s in entity.get("actuals", []):
            if s.get("name") == sname:
                for sub in s.get("sub_heads", []):
                    if sub.get("name") == subname:
                        return float(sub.get(f, 0) or 0)
        return 0.0

    def _item_v(entity, iname, use_est=False):
        f = IF_E if use_est else PF
        for s in entity.get("actuals", []):
            for item in s.get("items", []):
                if item.get("name") == iname:
                    return float(item.get(f, 0) or 0)
            for sub in s.get("sub_heads", []):
                for item in sub.get("items", []):
                    if item.get("name") == iname:
                        return float(item.get(f, 0) or 0)
        return 0.0

    def _grand_v(entity, f):
        return sum(float(s.get(f, 0) or 0) for s in entity.get("actuals", []))

    thin2  = Side(style="thin")
    brd2   = Border(left=thin2, right=thin2, top=thin2, bottom=thin2)

    def _write_be_row(head_val, type_val, vp_list, ve_list, fill, font):
        ws.append(["", head_val, type_val] + [""] * (grand_e_col - 3))
        r = ws.max_row
        gp = ge = 0.0
        for ei, (p, e) in enumerate(zip(vp_list, ve_list)):
            cs = 4 + ei * 2
            cp = ws.cell(r, cs);     cp.value = p
            ce = ws.cell(r, cs + 1); ce.value = e
            gp += p; ge += e
        ws.cell(r, grand_p_col).value = gp
        ws.cell(r, grand_e_col).value = ge
        for col in range(2, grand_e_col + 1):
            c = ws.cell(r, col)
            c.fill = fill; c.font = font; c.border = brd2
            c.alignment = _RIGHT if col > 3 else _LEFT
            if col > 3:
                c.number_format = NUM_FMT

    if not entities:
        return ws

    for sec in entities[0].get("actuals", []):
        sname = sec.get("name", "")

        # Section row
        ws.append(["", sname])
        r_sec = ws.max_row
        for col in range(2, grand_e_col + 1):
            c = ws.cell(r_sec, col)
            c.fill = _FILL_HEAD; c.font = _BOLD
            c.border = brd2;     c.alignment = _LEFT
        ws.merge_cells(start_row=r_sec, start_column=2,
                       end_row=r_sec,   end_column=grand_e_col)

        for sub in sec.get("sub_heads", []):
            subname = sub.get("name", "")
            vp = [_sub_v(e, sname, subname, PF) for e in entities]
            ve = [_sub_v(e, sname, subname, EF) for e in entities]
            _write_be_row(sname, subname, vp, ve, _FILL_SUBHEAD, _BOLD)
            for item in sub.get("items", []):
                iname = item.get("name", "")
                vp = [_item_v(e, iname, use_est=False) for e in entities]
                ve = [_item_v(e, iname, use_est=True)  for e in entities]
                _write_be_row("", iname, vp, ve, _FILL_WHITE, _NORMAL)

        for item in sec.get("items", []):
            iname = item.get("name", "")
            vp = [_item_v(e, iname, use_est=False) for e in entities]
            ve = [_item_v(e, iname, use_est=True)  for e in entities]
            _write_be_row(sname, iname, vp, ve, _FILL_WHITE, _NORMAL)

        vp = [_sec_v(e, sname, PF) for e in entities]
        ve = [_sec_v(e, sname, EF) for e in entities]
        _write_be_row(f"TOTAL - {sname}", "", vp, ve, _FILL_HTOTAL, _BOLD)

    vp = [_grand_v(e, PF) for e in entities]
    ve = [_grand_v(e, EF) for e in entities]
    _write_be_row("GRAND TOTAL", "", vp, ve, _FILL_GRAND, _BOLD)

    _auto_col_widths(ws)
    return ws


# ═══════════════════════════════════════════════════════════════════════════════
# FY HELPERS
# ═══════════════════════════════════════════════════════════════════════════════

def _fy_labels(fy):
    parts    = (fy or "2025-26").split("-")
    start_yy = (parts[0] or "2025")[-2:]
    end_yy   = (parts[1] if len(parts) > 1 else "26")[-2:]
    prev_s   = str(int(start_yy) - 1).zfill(2)
    prev_e   = str(int(end_yy)   - 1).zfill(2)
    return {
        "plan": f"FY{start_yy}-{end_yy} Plan",
        "est":  f"FY{prev_s}-{prev_e} Estimate",
    }

def _prev_fy(fy):
    parts = (fy or "2025-26").split("-")
    s = int(parts[0] or 2025) - 1
    e = int(parts[1] or 26)   - 1
    return f"{s}-{str(e).zfill(2)}"


# ═══════════════════════════════════════════════════════════════════════════════
# WHITELISTED API ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════════

@frappe.whitelist()
def export_ppt(financial_year, ppt_rows, prev_ppt_rows,
               budget_label, est_label, prev_budget_label, prev_est_label):
    fy      = financial_year or "2025-26"
    prev_fy = _prev_fy(fy)
    wb = Workbook(); wb.remove(wb.active)
    _sheet_ppt_combined(
        wb, "Foundation Metrics",
        json.loads(ppt_rows),      budget_label,      est_label,
        json.loads(prev_ppt_rows), prev_budget_label, prev_est_label,
        fy=fy, prev_fy=prev_fy,
    )
    return {"filename": f"Foundation_Metrics_{fy}.xlsx", "data": _wb_to_b64(wb)}


@frappe.whitelist()
def export_annual(financial_year, annual_data):
    fy = financial_year or "2025-26"
    wb = Workbook(); wb.remove(wb.active)
    _sheet_annual(wb, "Annual Budget Consolidated", json.loads(annual_data), fy)
    return {"filename": f"Annual_Budget_Consolidated_{fy}.xlsx", "data": _wb_to_b64(wb)}


@frappe.whitelist()
def export_estimate(financial_year, estimate_data):
    fy = financial_year or "2025-26"
    wb = Workbook(); wb.remove(wb.active)
    _sheet_estimate(wb, "EstimEstimate Consolidated", json.loads(estimate_data), fy)
    return {"filename": f"Estimate_Consolidated{fy}.xlsx", "data": _wb_to_b64(wb)}


@frappe.whitelist()
def export_budget_estimate(financial_year, be_data):
    fy     = financial_year or "2025-26"
    labels = _fy_labels(fy)
    wb = Workbook(); wb.remove(wb.active)
    _sheet_be(wb, "Budget & Estimate", json.loads(be_data),
              fy, labels["plan"], labels["est"])
    return {"filename": f"Budget_and_Estimate_{fy}.xlsx", "data": _wb_to_b64(wb)}


@frappe.whitelist()
def export_all(financial_year, ppt_rows, prev_ppt_rows,
               budget_label, est_label, prev_budget_label, prev_est_label,
               annual_data, estimate_data, be_data):
    fy      = financial_year or "2025-26"
    prev_fy = _prev_fy(fy)
    labels  = _fy_labels(fy)
    wb = Workbook(); wb.remove(wb.active)
    _sheet_ppt_combined(
        wb, "Foundation Metrics",
        json.loads(ppt_rows),      budget_label,      est_label,
        json.loads(prev_ppt_rows), prev_budget_label, prev_est_label,
        fy=fy, prev_fy=prev_fy,
    )
    _sheet_annual(wb,   "Annual Budget Consolidated",     json.loads(annual_data),   fy)
    _sheet_estimate(wb, "Estimate Consolidated",          json.loads(estimate_data), fy)
    _sheet_be(wb,       "Budget & Estimate", json.loads(be_data),
              fy, labels["plan"], labels["est"])
    return {"filename": f"Foundation - Consolidated Budget_{fy}.xlsx", "data": _wb_to_b64(wb)}