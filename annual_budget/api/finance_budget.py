# import frappe
# from frappe import _

# @frappe.whitelist()
# def get_finance_budget(budget_id):
#     if not budget_id:
#         frappe.throw(_("Finance Budget ID is required"))
#     # get document
#     doc = frappe.get_doc("Finance Budget", budget_id)
#     return doc.as_dict()


import frappe
from frappe import _

@frappe.whitelist()
def get_finance_budget(budget_id):
    if not budget_id:
        frappe.throw(_("Finance Budget ID is required"))

    doc = frappe.get_doc("Finance Budget", budget_id)
    data = doc.as_dict()

    if data.get("cost_center"):
        cost_center_value = frappe.get_value("Cost Center", data["cost_center"], "cost_center")
        data["cost_center_value"] = cost_center_value

    if data.get("location_code"):
        location_code_value = frappe.get_value("Location Code", data["location_code"], "location_code")
        data["location_code_value"] = location_code_value

    return data
import frappe

@frappe.whitelist()
def get_all_finance_budgets():
    """Return all Finance Budget records with all fields and child tables."""
    try:
        docs = frappe.get_all("Finance Budget", pluck="name")
        data = []
        for name in docs:
            doc = frappe.get_doc("Finance Budget", name)
            data.append(doc.as_dict())
        return data
    except Exception as e:
        frappe.log_error("Finance Budget API Error", str(e))
        frappe.throw(str(e))
    
# import frappe

# @frappe.whitelist()
# def get_finance_budget_by_year_and_month(financial_year=None, month=None):
#     """
#     Fetch Finance Budget data for a given Financial Year and Month.
#     Month must be one of: April, May, June, July, August, September, October,
#     November, December, January, February, March
#     """

#     # --- Validate inputs ---
#     if not financial_year:
#         frappe.throw("Please provide a financial_year")
#     if not month:
#         frappe.throw("Please provide a month (e.g., April)")

#     month = month.strip().lower()  # normalize
#     valid_months = [
#         "april", "may", "june", "july", "august", "september",
#         "october", "november", "december", "january", "february", "march"
#     ]

#     if month not in valid_months:
#         frappe.throw(f"Invalid month '{month}'. Must be one of: {', '.join(valid_months)}")

#     # --- Fetch all Finance Budgets for the given year ---
#     parent_budgets = frappe.get_all(
#         "Finance Budget",
#         filters={"financial_year": financial_year},
#         fields=["name", "cost_center", "location_code", "total_budget"]
#     )

#     if not parent_budgets:
#         return {"message": f"No Finance Budget found for {financial_year}"}

#     # --- Prepare results ---
#     results = []
#     for parent in parent_budgets:
#         # Use dynamic field filtering by month
#         month_field = month  # e.g., "april"
#         query = f"""
#             SELECT
#                 type_of_expense,
#                 gl_code,
#                 sub_head_of_expense,
#                 head_of_expense,
#                 `{month_field}` as amount,
#                 quarter_1, quarter_2, quarter_3, quarter_4, year
#             FROM `tabFinance Budget Amounts`
#             WHERE parent = %s AND IFNULL(`{month_field}`, 0) > 0
#         """

#         month_data = frappe.db.sql(query, (parent.name,), as_dict=True)

#         for child in month_data:
#             results.append({
#                 "finance_budget": parent.name,
#                 "cost_center": parent.cost_center,
#                 "location_code": parent.location_code,
#                 "type_of_expense": child.type_of_expense,
#                 "gl_code": child.gl_code,
#                 "head_of_expense": child.head_of_expense,
#                 "sub_head_of_expense": child.sub_head_of_expense,
#                 "month": month.capitalize(),
#                 "amount": child.amount,
#                 "quarter_1": child.quarter_1,
#                 "quarter_2": child.quarter_2,
#                 "quarter_3": child.quarter_3,
#                 "quarter_4": child.quarter_4,
#                 "year_total": child.year
#             })

#     if not results:
#         return {"message": f"No data found for {financial_year} - {month.capitalize()}"}

#     return results


import frappe

@frappe.whitelist()
def get_consolidated_finance_data(financial_year=None):
    """
    Returns consolidated Finance Budget data structure:
    {
      "entities": [
        {
          "name": "Entity Name",
          "cost_centers": [{ "name": "Cost Center 1" }, { "name": "Cost Center 2" }]
        },
        ...
      ],
      "expenses": [ "Salary & Wages", "Travel", ... ]
    }
    """

    # --- Optional filter by year ---
    filters = {}
    if financial_year:
        filters["financial_year"] = financial_year

    # --- Fetch all distinct entities (set_id or organization/unit) ---
    entities = frappe.db.get_all(
        "Finance Budget",
        filters=filters,
        fields=["DISTINCT set_id AS name"],
        order_by="set_id"
    )

    consolidated = {"entities": [], "expenses": []}

    for entity in entities:
        # Get cost centers under each entity
        cost_centers = frappe.db.get_all(
            "Finance Budget",
            filters={"set_id": entity.name},
            fields=["DISTINCT cost_center AS name"],
            order_by="cost_center"
        )
        consolidated["entities"].append({
            "name": entity.name,
            "cost_centers": cost_centers
        })

    # --- Fetch all unique expenses ---
    expenses = frappe.db.get_all(
        "Finance Budget Amounts",
        fields=["DISTINCT type_of_expense AS name"],
        order_by="type_of_expense"
    )

    consolidated["expenses"] = [e.name for e in expenses if e.name]

    return consolidated




# import frappe

# @frappe.whitelist()
# def get_finance_budget_grouped_by_head(financial_year=None):
#     """
#     Returns consolidated totals grouped by 'Head of Expense'
#     across all Finance Budgets for a given Financial Year.
#     """

#     # --- Validation ---
#     if not financial_year:
#         frappe.throw("Please provide a Financial Year")

#     # --- Fetch all Finance Budgets for that year ---
#     parent_budgets = frappe.get_all(
#         "Finance Budget",
#         filters={"financial_year": financial_year},
#         fields=["name"]
#     )

#     if not parent_budgets:
#         return {"message": f"No Finance Budgets found for {financial_year}"}

#     parent_names = tuple(p.name for p in parent_budgets)

#     # --- Calculate totals grouped by Head of Expense ---
#     query = f"""
#         SELECT
#             head_of_expense,
#             SUM(
#                 COALESCE(april, 0) + COALESCE(may, 0) + COALESCE(june, 0) +
#                 COALESCE(july, 0) + COALESCE(august, 0) + COALESCE(september, 0) +
#                 COALESCE(october, 0) + COALESCE(november, 0) + COALESCE(december, 0) +
#                 COALESCE(january, 0) + COALESCE(february, 0) + COALESCE(march, 0)
#             ) AS total_amount
#         FROM `tabFinance Budget Amounts`
#         WHERE parent IN %s
#         GROUP BY head_of_expense
#         ORDER BY head_of_expense
#     """

#     head_data = frappe.db.sql(query, (parent_names,), as_dict=True)

#     if not head_data:
#         return {"message": f"No data found for {financial_year}"}

#     # --- Group and calculate totals ---
#     grouped_data = {"TOTAL PROGRAM EXPENSES": {"items": [], "total": 0}}
#     grand_total = 0

#     for row in head_data:
#         head = row.head_of_expense or "Uncategorized"
#         total = float(row.total_amount or 0)

#         grouped_data["TOTAL PROGRAM EXPENSES"]["items"].append({
#             "head_of_expense": head,
#             "total": round(total, 2)
#         })

#         grouped_data["TOTAL PROGRAM EXPENSES"]["total"] += total
#         grand_total += total

#     grouped_data["GRAND TOTAL"] = round(grand_total, 2)

#     return grouped_data
# import frappe
# from collections import defaultdict

# @frappe.whitelist()
# def get_all_finance_budgets(financial_year=None):
#     """
#     Fetch all Finance Budget records and group budget amounts by head_of_expense.
#     Optionally filter by financial_year.
#     Returns parent + child table data and grouped totals by head_of_expense.
#     """

#     # --- Build filters dynamically ---
#     filters = {}
#     if financial_year:
#         filters["financial_year"] = financial_year

#     # --- Get all parent Finance Budgets ---
#     budgets = frappe.get_all(
#         "Finance Budget",
#         filters=filters,
#         fields=[
#             "name",
#             "financial_year",
#             "set_id",
#             "cost_center",
#             "location_code",
#             "total_budget",
#             "modified",
#         ],
#         order_by="modified desc",
#         limit_page_length=2  # Limit to two records
#     )

#     # --- For each parent, fetch child table data ---
#     for budget in budgets:
#         children = frappe.get_all(
#             "Finance Budget Amounts",
#             filters={"parent": budget.name},
#             fields=[
#                 "type_of_expense",
#                 "gl_code",
#                 "sub_head_of_expense",
#                 "head_of_expense",
#                 "april", "may", "june", "july", "august", "september",
#                 "october", "november", "december",
#                 "january", "february", "march",
#                 "quarter_1", "quarter_2", "quarter_3", "quarter_4", "year"
#             ],
#             order_by="type_of_expense asc"
#         )
#         budget["budget_amounts"] = children

#     # --- Group by head_of_expense and sum the 'year' totals ---
#     totals_by_head = defaultdict(float)
#     for budget in budgets:
#         for expense in budget["budget_amounts"]:
#             head = expense["head_of_expense"]
#             year_total = expense["year"]
#             totals_by_head[head] += year_total

#     # --- Prepare the grouped results ---
#     grouped_totals = {head: total for head, total in sorted(totals_by_head.items())}

#     # --- Return both budgets and grouped totals ---
#     return {
#         "budgets": budgets,
#         "grouped_totals": grouped_totals
#     }

# # --- Example usage (for testing outside Frappe environment) ---
# if __name__ == "__main__":
#     # Simulate the function call (replace with actual Frappe call in production)
#     result = get_all_finance_budgets(financial_year="2025-26")
    
#     # Print budgets
#     print("Finance Budgets:")
#     for budget in result["budgets"]:
#         print(f"Budget: {budget['name']}, Total: {budget['total_budget']:,.2f}")
    
#     # Print grouped totals
#     print("\nGrouped by Head of Expense (Yearly Totals):")
#     for head, total in result["grouped_totals"].items():
#         print(f"{head}: {total:,.2f}")

# import frappe

# @frappe.whitelist(allow_guest=True)
# def get_consolidated_report(financial_year=None):
#     """
#     Build a consolidated budget report grouped by:
#     Entity → Cost Center → Expense Type
#     """

#     filters = {}
#     if financial_year:
#         filters["financial_year"] = financial_year

#     # 1️⃣ Get all Finance Budgets
#     budgets = frappe.get_all(
#         "Finance Budget",
#         filters=filters,
#         fields=["name", "financial_year", "set_id", "cost_center", "total_budget"]
#     )

#     if not budgets:
#         return {"entities": []}

#     response = {"entities": []}

#     # 2️⃣ Iterate through each budget record
#     for budget in budgets:
#         entity_name = budget.get("set_id") or "Unknown Entity"

#         # Create entity group if not exists
#         entity = next((e for e in response["entities"] if e["name"] == entity_name), None)
#         if not entity:
#             entity = {"name": entity_name, "cost_centers": []}
#             response["entities"].append(entity)

#         # Get Cost Center name safely
#         cost_center_doc = frappe.db.get_value(
#             "Cost Center",
#             budget["cost_center"],
#             ["name", "cost_center"],
#             as_dict=True
#         )

#         if cost_center_doc:
#             cost_center_name = cost_center_doc.get("cost_center") or cost_center_doc.get("name")
#         else:
#             cost_center_name = f"Cost Center {budget['cost_center']}"

#         cost_center = {
#             "name": cost_center_name,
#             "budget": budget["name"],
#             "data": []
#         }

#         # 3️⃣ Fetch related Budget Amount details from the child table
#         details = frappe.get_all(
#             "Finance Budget Amounts",   # ✅ Correct child doctype name
#             filters={"parent": budget["name"]},
#             fields=[
#                 "type_of_expense",
#                 "head_of_expense",
#                 "sub_head_of_expense",
#                 "gl_code",
#                 "quarter_1", "quarter_2", "quarter_3", "quarter_4",
#                 "year"
#             ]
#         )

#         # 4️⃣ Transform data into tabular structure
#         for d in details:
#             cost_center["data"].append({
#                 "type_of_expense": d.get("type_of_expense"),
#                 "head_of_expense": d.get("head_of_expense"),
#                 "sub_head_of_expense": d.get("sub_head_of_expense"),
#                 "gl_code": d.get("gl_code"),
#                 "budget": float(d.get("year") or 0),
#                 "actuals": 0.0,          # future: link to Actual Expense Doctype
#                 "previous_year": 0.0     # future: link to last year’s data
#             })

#         entity["cost_centers"].append(cost_center)

#     # 5️⃣ Return in consistent format
#     return {"entities": response["entities"]}


# import frappe

# @frappe.whitelist(allow_guest=True)
# def get_consolidated_report(financial_year=None):
#     """
#     Consolidated Budget Report grouped by:
#     Entity → Cost Center → Expense Type

#     Uses 'cc_descr' (Cost Center Description) from Finance Budget
#     and computes total budget for each Cost Center.
#     """

#     filters = {}
#     if financial_year:
#         filters["financial_year"] = financial_year

#     # 1️⃣ Fetch all Finance Budgets
#     budgets = frappe.get_all(
#         "Finance Budget",
#         filters=filters,
#         fields=[
#             "name",
#             "financial_year",
#             "set_id",
#             "entity__unit_decription",
#             "cost_center",
#             "cc_descr",
#             "total_budget"
#         ]
#     )

#     if not budgets:
#         return {"entities": []}

#     response = {"entities": []}

#     # 2️⃣ Group data by entity
#     for budget in budgets:
#         entity_name = (
#             budget.get("entity__unit_decription")
#             or budget.get("set_id")
#             or "Unknown Entity"
#         )

#         # Find or create entity group
#         entity = next((e for e in response["entities"] if e["name"] == entity_name), None)
#         if not entity:
#             entity = {"name": entity_name, "cost_centers": []}
#             response["entities"].append(entity)

#         # 3️⃣ Use Cost Center Description (cc_descr) instead of cost_center
#         cost_center_name = (
#             budget.get("cc_descr")
#             or budget.get("cost_center")
#             or "Unnamed Cost Center"
#         )

#         cost_center = {
#             "name": cost_center_name,
#             "budget": budget["name"],
#             "data": [],
#             "total_budget": 0.0
#         }

#         # 4️⃣ Fetch Budget Amount details from child table
#         details = frappe.get_all(
#             "Finance Budget Amounts",
#             filters={"parent": budget["name"]},
#             fields=[
#                 "type_of_expense",
#                 "head_of_expense",
#                 "sub_head_of_expense",
#                 "gl_code",
#                 "quarter_1",
#                 "quarter_2",
#                 "quarter_3",
#                 "quarter_4",
#                 "year"
#             ]
#         )

#         # 5️⃣ Compute totals and prepare data
#         total_for_cost_center = 0.0

#         for d in details:
#             yearly_total = float(d.get("year") or 0)
#             total_for_cost_center += yearly_total

#             cost_center["data"].append({
#                 "type_of_expense": d.get("type_of_expense"),
#                 "head_of_expense": d.get("head_of_expense"),
#                 "sub_head_of_expense": d.get("sub_head_of_expense"),
#                 "gl_code": d.get("gl_code"),
#                 "budget": yearly_total,
#                 "actuals": 0.0,          # placeholder for Actuals
#                 "previous_year": 0.0     # placeholder for Previous Year
#             })

#         # 6️⃣ Add total to cost center
#         cost_center["total_budget"] = total_for_cost_center

#         entity["cost_centers"].append(cost_center)

#     # 7️⃣ Return structured response
#     return {"entities": response["entities"]}



import frappe

@frappe.whitelist(allow_guest=True)
def get_consolidated_report(financial_year=None):
    """
    Consolidated Budget Report grouped by:
    Entity → Cost Center → Expense Type

    Adds totals for:
    - Each Cost Center (already)
    - Each Entity (sum of all its cost centers)
    """

    filters = {}
    if financial_year:
        filters["financial_year"] = financial_year

    # 1️⃣ Fetch all Finance Budgets
    budgets = frappe.get_all(
        "Finance Budget",
        filters=filters,
        fields=[
            "name",
            "financial_year",
            "set_id",
            "entity__unit_decription",
            "cost_center",
            "cc_descr",
            "total_budget"
        ]
    )

    if not budgets:
        return {"entities": []}

    response = {"entities": []}

    # 2️⃣ Group data by entity
    for budget in budgets:
        entity_name = (
            budget.get("entity__unit_decription")
            or budget.get("set_id")
            or "Unknown Entity"
        )

        # Find or create entity group
        entity = next((e for e in response["entities"] if e["name"] == entity_name), None)
        if not entity:
            entity = {
                "name": entity_name,
                "cost_centers": [],
                "totals": {   # ✅ Added
                    "budget": 0.0,
                    "actuals": 0.0,
                    "previous_year": 0.0
                }
            }
            response["entities"].append(entity)

        # 3️⃣ Use Cost Center Description (cc_descr) instead of cost_center
        cost_center_name = (
            budget.get("cc_descr")
            or budget.get("cost_center")
            or "Unnamed Cost Center"
        )

        cost_center = {
            "name": cost_center_name,
            "budget": budget["name"],
            "data": [],
            "total_budget": 0.0,
            "total_actuals": 0.0,
            "total_previous_year": 0.0
        }

        # 4️⃣ Fetch Budget Amount details from child table
        details = frappe.get_all(
            "Finance Budget Amounts",
            filters={"parent": budget["name"]},
            fields=[
                "type_of_expense",
                "head_of_expense",
                "sub_head_of_expense",
                "gl_code",
                "quarter_1",
                "quarter_2",
                "quarter_3",
                "quarter_4",
                "year"
            ]
        )

        # 5️⃣ Compute totals for this cost center
        total_budget = 0.0
        total_actuals = 0.0
        total_previous = 0.0

        for d in details:
            yearly_total = float(d.get("year") or 0)
            # placeholders (in future can be replaced by linked Doctype data)
            actuals_value = 0.0
            previous_year_value = 0.0

            total_budget += yearly_total
            total_actuals += actuals_value
            total_previous += previous_year_value

            cost_center["data"].append({
                "type_of_expense": d.get("type_of_expense"),
                "head_of_expense": d.get("head_of_expense"),
                "sub_head_of_expense": d.get("sub_head_of_expense"),
                "gl_code": d.get("gl_code"),
                "budget": yearly_total,
                "actuals": actuals_value,
                "previous_year": previous_year_value
            })

        # 6️⃣ Assign totals to cost center
        cost_center["total_budget"] = total_budget
        cost_center["total_actuals"] = total_actuals
        cost_center["total_previous_year"] = total_previous

        # 7️⃣ Add cost center to entity
        entity["cost_centers"].append(cost_center)

        # 8️⃣ Accumulate totals for entity
        entity["totals"]["budget"] += total_budget
        entity["totals"]["actuals"] += total_actuals
        entity["totals"]["previous_year"] += total_previous

    # 9️⃣ Return structured response
    return {"entities": response["entities"]}