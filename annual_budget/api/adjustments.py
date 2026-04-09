# import frappe

# @frappe.whitelist(allow_guest=True)
# def get_monthly_adjustments(financial_year=None, month=None):
#     filters = {}

#     if financial_year:
#         filters["financial_year"] = financial_year

#     if month:
#         filters["month"] = month

#     docs = frappe.get_all(
#         "Monthly Adjustment",
#         filters=filters,
#         fields=["name", "financial_year", "month"]
#     )

#     result = []

#     for doc in docs:
#         full_doc = frappe.get_doc("Monthly Adjustment", doc.name)

#         result.append({
#             "name": full_doc.name,
#             "financial_year": full_doc.financial_year,
#             "month": full_doc.month,
#             "adjustment_items": full_doc.adjustment_line_items
#         })

#     return result




# import frappe


# @frappe.whitelist(allow_guest=True)
# def get_monthly_adjustments(financial_year=None, month=None):

#     filters = {}

#     if financial_year:
#         filters["financial_year"] = financial_year

#     if month:
#         filters["month"] = month

#     # Get parent documents
#     docs = frappe.get_all(
#         "Monthly Adjustment",
#         filters=filters,
#         fields=["name", "financial_year", "month"]
#     )

#     result = []

#     for doc in docs:
#         full_doc = frappe.get_doc("Monthly Adjustment", doc.name)

#         for row in full_doc.adjustment_line_items:

#             # ✅ Signed amount logic
#             amount = row.adjustment_amount or 0
#             if row.adjustment_type == "Minus":
#                 amount = -amount

#             # ✅ Transform to required format
#             result.append({
#                 "business_unit": row.unit,
#                 "ledger": "ACTUALS",
#                 "account": row.gl_code,
#                 "deptid": getattr(row, "cost_center_erp", row.cost_center),
#                 "operating_unit": getattr(row, "location_code_erp", row.location_code),
#                 "fiscal_year": (full_doc.financial_year or "").split("-")[0],
#                 "accounting_period": "0",
#                 "is_adjustment":1,
#                 "posted_total_amt": f"{amount:.2f}"
#             })

#     return result




# import frappe
# from collections import defaultdict


# @frappe.whitelist(allow_guest=True)
# def get_monthly_adjustments(financial_year=None):

#     filters = {}

#     if financial_year:
#         filters["financial_year"] = financial_year

#     docs = frappe.get_all(
#         "Monthly Adjustment",
#         filters=filters,
#         fields=["name", "financial_year", "month"]  # ✅ include month
#     )

#     # ✅ Month → Accounting Period mapping
#     month_map = {
#         "April": "1",
#         "May": "2",
#         "June": "3",
#         "July": "4",
#         "August": "5",
#         "September": "6",
#         "October": "7",
#         "November": "8",
#         "December": "9",
#         "January": "10",
#         "February": "11",
#         "March": "12"
#     }

#     grouped_data = defaultdict(float)

#     for doc in docs:
#         full_doc = frappe.get_doc("Monthly Adjustment", doc.name)

#         # ✅ get accounting period from parent month
#         accounting_period = month_map.get(doc.month, "0")

#         for row in full_doc.adjustment_line_items:

#             # ✅ Signed amount
#             amount = row.adjustment_amount or 0
#             if row.adjustment_type == "Minus":
#                 amount = -amount

#             # ✅ Group key (include accounting_period)
#             key = (
#                 row.unit,
#                 row.gl_code,
#                 getattr(row, "location_code_erp", row.location_code),
#                 getattr(row, "cost_center_erp", row.cost_center),
#                 accounting_period
#             )

#             grouped_data[key] += amount

#     result = []

#     for key, total in grouped_data.items():
#         result.append({
#             "business_unit": key[0],
#             "ledger": "ACTUALS",
#             "account": key[1],
#             "deptid": key[3],
#             "operating_unit": key[2],
#             "accounting_period": key[4],  # ✅ from month_map
#             "fiscal_year": (financial_year or "").split("-")[0],
#             "is_adjustment": 1,
#             "posted_total_amt": f"{total:.2f}"
#         })

#     return result


# import frappe
# from collections import defaultdict

# @frappe.whitelist(allow_guest=True)
# def get_monthly_adjustments(financial_year=None):

#     filters = {}
#     if financial_year:
#         filters["financial_year"] = financial_year

#     docs = frappe.get_all(
#         "Monthly Adjustment",
#         filters=filters,
#         fields=["name", "financial_year", "month"]
#     )

#     month_map = {
#         "April": 1, "May": 2, "June": 3, "July": 4,
#         "August": 5, "September": 6, "October": 7,
#         "November": 8, "December": 9,
#         "January": 10, "February": 11, "March": 12
#     }

#     temp_data = []

#     # 🔹 Flatten data first
#     for doc in docs:
#         full_doc = frappe.get_doc("Monthly Adjustment", doc.name)
#         period = month_map.get(doc.month, 0)

#         for row in full_doc.adjustment_line_items:
#             amount = row.adjustment_amount or 0
#             if row.adjustment_type == "Minus":
#                 amount = -amount

#             temp_data.append({
#                 "unit": row.unit,
#                 "gl": row.gl_code,
#                 "loc": getattr(row, "location_code_erp", row.location_code),
#                 "cc": getattr(row, "cost_center_erp", row.cost_center),
#                 "period": period,
#                 "amount": amount
#             })

#     # 🔹 Sort by group + period
#     temp_data.sort(key=lambda x: (x["unit"], x["gl"], x["loc"], x["cc"], x["period"]))

#     ytd_totals = defaultdict(float)
#     result = []

#     for row in temp_data:
#         key = (row["unit"], row["gl"], row["loc"], row["cc"])

#         # ✅ running total
#         ytd_totals[key] += row["amount"]

#         result.append({
#             "business_unit": row["unit"],
#             "ledger": "ACTUALS",
#             "account": row["gl"],
#             "deptid": row["cc"],
#             "operating_unit": row["loc"],
#             "accounting_period": str(row["period"]),
#             "fiscal_year": (financial_year or "").split("-")[0],
#             "is_adjustment": 1,
#             "posted_total_amt": f"{ytd_totals[key]:.2f}"  # ✅ YTD value
#         })

#     return result




# import frappe
# from collections import defaultdict

# @frappe.whitelist(allow_guest=True)
# def get_monthly_adjustments_month_wise(financial_year=None, month=None):

#     month_map = {
#         "April": 1, "May": 2, "June": 3, "July": 4,
#         "August": 5, "September": 6, "October": 7,
#         "November": 8, "December": 9,
#         "January": 10, "February": 11, "March": 12
#     }

#     reverse_month_map = {v: k for k, v in month_map.items()}

#     # ✅ Validate & print month
#     if month is not None:
#         try:
#             month = int(month)

#             if month < 1 or month > 12:
#                 frappe.throw("Month must be between 1 and 12")

#             month_name = reverse_month_map.get(month, "Invalid")

#             # 🔥 Print instead of logger
#             print(f"Selected Month -> Number: {month}, Name: {month_name}")

#         except Exception:
#             print(f"Invalid month input: {month}")
#             frappe.throw("Invalid month format. Must be integer 1–12")

#     filters = {}
#     if financial_year:
#         filters["financial_year"] = financial_year

#     docs = frappe.get_all(
#         "Monthly Adjustment",
#         filters=filters,
#         fields=["name", "financial_year", "month"]
#     )

#     temp_data = []

#     # 🔹 Flatten data
#     for doc in docs:
#         period = month_map.get(doc.month, 0)

#         # ✅ Apply month filter (YTD up to selected month)
#         if month and period > month:
#             continue

#         full_doc = frappe.get_doc("Monthly Adjustment", doc.name)

#         for row in full_doc.adjustment_line_items:
#             amount = row.adjustment_amount or 0

#             if row.adjustment_type == "Minus":
#                 amount = -amount

#             temp_data.append({
#                 "unit": row.unit,
#                 "gl": row.gl_code,
#                 "loc": getattr(row, "location_code_erp", row.location_code),
#                 "cc": getattr(row, "cost_center_erp", row.cost_center),
#                 "period": period,
#                 "amount": amount
#             })

#     # 🔹 Sort for YTD
#     temp_data.sort(
#         key=lambda x: (x["unit"], x["gl"], x["loc"], x["cc"], x["period"])
#     )

#     ytd_totals = defaultdict(float)
#     result = []

#     for row in temp_data:
#         key = (row["unit"], row["gl"], row["loc"], row["cc"])

#         # ✅ Running total (YTD)
#         ytd_totals[key] += row["amount"]
#         frappe.log_error(title="Grand Total Debug", message=f"Grand Total Pre-Tax Return: {ytd_totals}")
#         print(f"Total records returned: {ytd_totals}")

#         result.append({
#             "business_unit": row["unit"],
#             "ledger": "ACTUALS",
#             "account": row["gl"],
#             "deptid": row["cc"],
#             "operating_unit": row["loc"],
#             "accounting_period": str(row["period"]),
#             "fiscal_year": (financial_year or "").split("-")[0],
#             "is_adjustment": 1,
#             "posted_total_amt": f"{ytd_totals[key]:.2f}"
#         })
#         frappe.log_error(title="Grand Total Debug", message=f"Grand Total Pre-Tax Return: {ytd_totals}")


#     # 🔥 Print total records
#     print(f"Total records returned: {result}")

#     return result

import frappe
from collections import defaultdict

@frappe.whitelist(allow_guest=True)
def get_adjustments_month_wise(financial_year=None, month=None):

    month_map = {
        "April": 1, "May": 2, "June": 3, "July": 4,
        "August": 5, "September": 6, "October": 7,
        "November": 8, "December": 9,
        "January": 10, "February": 11, "March": 12
    }

    reverse_month_map = {v: k for k, v in month_map.items()}

    # ✅ Validate month
    if month is not None:
        try:
            month = int(month)
            if not (1 <= month <= 12):
                frappe.throw("Month must be between 1 and 12")

            print(f"Selected Month: {month} ({reverse_month_map.get(month)})")

        except:
            frappe.throw("Invalid month format. Must be 1–12")

    filters = {}
    if financial_year:
        filters["financial_year"] = financial_year

    docs = frappe.get_all(
        "Monthly Adjustment",
        filters=filters,
        fields=["name", "month"]
    )

    grouped_data = defaultdict(list)

    # 🔹 Step 1: Collect & group data
    for doc in docs:

        # ✅ Normalize period
        if isinstance(doc.month, int):
            period = doc.month
        elif str(doc.month).isdigit():
            period = int(doc.month)
        else:
            period = month_map.get(doc.month)

        if not period:
            continue

        # ✅ YTD filter
        if month is not None and period > month:
            continue

        full_doc = frappe.get_doc("Monthly Adjustment", doc.name)

        for row in full_doc.adjustment_line_items:

            amount = row.adjustment_amount or 0
            if row.adjustment_type == "Minus":
                amount = -amount

            key = (
                row.unit,
                row.gl_code,
                getattr(row, "location_code_erp", row.location_code),
                getattr(row, "cost_center_erp", row.cost_center)
            )

            grouped_data[key].append({
                "period": period,
                "amount": amount
            })

    # 🔹 Step 2: Calculate YTD properly
    result = []

    for key, entries in grouped_data.items():

        # ✅ Sort ONLY by period (critical fix)
        entries.sort(key=lambda x: x["period"])

        running_total = 0

        for entry in entries:
            running_total += entry["amount"]

            result.append({
                "business_unit": key[0],
                "ledger": "ACTUALS",
                "account": key[1],
                "deptid": key[3],
                "operating_unit": key[2],
                "accounting_period": str(entry["period"]),
                "fiscal_year": (financial_year or "").split("-")[0],
                "is_adjustment": 1,
                "posted_total_amt": f"{running_total:.2f}"
            })

    print(f"Total records returned: {len(result)}")

    return result

import frappe
from collections import defaultdict

@frappe.whitelist(allow_guest=True)
def get_monthly_adjustments(financial_year=None, month=None):

    month_map = {
        "April": 1, "May": 2, "June": 3, "July": 4,
        "August": 5, "September": 6, "October": 7,
        "November": 8, "December": 9,
        "January": 10, "February": 11, "March": 12
    }

    reverse_month_map = {v: k for k, v in month_map.items()}

    if month is not None:
        try:
            month = int(month)

            if month < 1 or month > 12:
                frappe.throw("Month must be between 1 and 12")

            month_name = reverse_month_map.get(month, "Invalid")
            frappe.logger().info(f"Selected Month -> {month} ({month_name})")

        except Exception:
            frappe.throw("Invalid month format. Must be integer 1–12")

    filters = {}
    if financial_year:
        filters["financial_year"] = financial_year

    docs = frappe.get_all(
        "Monthly Adjustment",
        filters=filters,
        fields=["name", "financial_year", "month"]
    )

    temp_data = []

    for doc in docs:
        period = month_map.get(doc.month, 0)

        if month and period > month:
            continue

        full_doc = frappe.get_doc("Monthly Adjustment", doc.name)

        for row in full_doc.adjustment_line_items:
            amount = row.adjustment_amount or 0

            if row.adjustment_type == "Minus":
                amount = -amount

            temp_data.append({
                "unit": row.unit,
                "gl": row.gl_code,
                "loc": getattr(row, "location_code_erp", row.location_code),
                "cc": getattr(row, "cost_center_erp", row.cost_center),
                "period": period,
                "amount": amount
            })

    temp_data.sort(
        key=lambda x: (x["unit"], x["gl"], x["loc"], x["cc"], x["period"])
    )

    ytd_totals = defaultdict(float)

    for row in temp_data:
        key = (row["unit"], row["gl"], row["loc"], row["cc"])
        ytd_totals[key] += row["amount"]
    result = []

    for key, total in ytd_totals.items():
        unit, gl, loc, cc = key

        result.append({
            "business_unit": unit,
            "ledger": "ACTUALS",
            "account": gl,
            "deptid": cc,
            "operating_unit": loc,
            "accounting_period": str(month) if month else "",
            "fiscal_year": (financial_year or "").split("-")[0],
            "is_adjustment": 1,
            "posted_total_amt": f"{total:.2f}"
        })

    # 🔹 Final log
    frappe.logger().info(f"Total grouped records: {len(result)}")

    return result