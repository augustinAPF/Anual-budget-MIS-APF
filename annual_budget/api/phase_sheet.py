import frappe
import re
from decimal import Decimal
from annual_budget.api.actual_format import get_filtered_actuals, sum_of_actuals_by_sequence

# ! =======================================================  Consolidated report Line item wise Grouping  ================================================================================
# @frappe.whitelist(allow_guest=True)
# def get_consolidated_report(financial_year=None, units=None, cost_center=None, location_code=None):
#     if not financial_year:
#         frappe.throw("Financial Year is required")

#     def _num(x):
#         if x is None:
#             return 0.0
#         try:
#             return float(Decimal(str(x)))
#         except Exception:
#             return 0.0
#     expense_rows = frappe.db.get_all(
#         "Expenses",
#         fields=[
#             "head_of_expense",
#             "sub_head_of_expense",
#             "type_of_expense",
#             "sequence_id"
#         ]
#     )
#     sequence_map = {}

#     for e in expense_rows:

#         seq = int(e.sequence_id) if e.sequence_id else 9999

#         if e.head_of_expense:
#             key = str(e.head_of_expense).strip().upper()
#             sequence_map[key] = seq

#         if e.sub_head_of_expense:
#             key = str(e.sub_head_of_expense).strip().upper()
#             sequence_map[key] = seq

#         if e.type_of_expense:
#             key = str(e.type_of_expense).strip().upper()
#             sequence_map[key] = seq

#     filters = {"financial_year": financial_year}

#     if units:
#         units = [u.strip() for u in units.split(",") if u.strip()]
#         filters["set_id"] = ["in", units]

#     if cost_center:
#         cost_center = [c.strip() for c in cost_center.split(",") if c.strip()]
#         filters["cost_center"] = ["in", cost_center]

#     if location_code:
#         location_code = [l.strip() for l in location_code.split(",") if l.strip()]
#         filters["location_code"] = ["in", location_code]

#     parents = frappe.get_all(
#         "Finance Budget",
#         filters=filters,
#         fields=["name"]
#     )

#     if not parents:
#         return []

#     parent_names = [p.name for p in parents]

#     rows = frappe.get_all(
#         "Finance Budget Amounts",
#         filters={"parent": ["in", parent_names]},
#         fields=[
#             "type_of_expense",
#             "gl_code",
#             "head_of_expense",
#             "sub_head_of_expense",
#             "april", "may", "june",
#             "july", "august", "september",
#             "october", "november", "december",
#             "january", "february", "march"
#         ]
#     )

#     TOP_LEVEL_HEADS = ["CAPITAL EXPENSES", "OPERATING EXPENSES"]
#     heads = {}

#     for r in rows:

#         raw_head = re.sub(r"\s+", " ", str(r.head_of_expense or "")).strip().upper()
#         sub = re.sub(r"\s+", " ", str(r.sub_head_of_expense or "")).strip().upper()

#         item = str(r.type_of_expense or "UNKNOWN ITEM").strip()

#         gl = str(r.gl_code or "").strip()

#         q1 = [_num(r.april), _num(r.may), _num(r.june)]
#         q2 = [_num(r.july), _num(r.august), _num(r.september)]
#         q3 = [_num(r.october), _num(r.november), _num(r.december)]
#         q4 = [_num(r.january), _num(r.february), _num(r.march)]

#         if raw_head not in TOP_LEVEL_HEADS:
#             parent_head = "OPERATING EXPENSES"
#             sub = raw_head
#         else:
#             parent_head = raw_head

#         if parent_head not in heads:
#             heads[parent_head] = {
#                 "name": parent_head,
#                 "sequence_id": sequence_map.get(parent_head, 9999),
#                 "q1": [0, 0, 0],
#                 "q2": [0, 0, 0],
#                 "q3": [0, 0, 0],
#                 "q4": [0, 0, 0],
#                 "items": {},
#                 "sub_heads": {}
#             }

#         for i in range(3):
#             heads[parent_head]["q1"][i] += q1[i]
#             heads[parent_head]["q2"][i] += q2[i]
#             heads[parent_head]["q3"][i] += q3[i]
#             heads[parent_head]["q4"][i] += q4[i]

#         if parent_head == "CAPITAL EXPENSES":

#             if item not in heads[parent_head]["items"]:
#                 heads[parent_head]["items"][item] = {
#                     "name": item,
#                     "sequence_id": sequence_map.get(item.upper(), 9999),
#                     "gl_code": gl,
#                     "q1": [0, 0, 0],
#                     "q2": [0, 0, 0],
#                     "q3": [0, 0, 0],
#                     "q4": [0, 0, 0]
#                 }

#             for i in range(3):
#                 heads[parent_head]["items"][item]["q1"][i] += q1[i]
#                 heads[parent_head]["items"][item]["q2"][i] += q2[i]
#                 heads[parent_head]["items"][item]["q3"][i] += q3[i]
#                 heads[parent_head]["items"][item]["q4"][i] += q4[i]
#         else:

#             if sub:

#                 if sub not in heads[parent_head]["sub_heads"]:
#                     heads[parent_head]["sub_heads"][sub] = {
#                         "name": sub,
#                         "sequence_id": sequence_map.get(sub, 9999),
#                         "q1": [0, 0, 0],
#                         "q2": [0, 0, 0],
#                         "q3": [0, 0, 0],
#                         "q4": [0, 0, 0],
#                         "items": {}
#                     }

#                 for i in range(3):
#                     heads[parent_head]["sub_heads"][sub]["q1"][i] += q1[i]
#                     heads[parent_head]["sub_heads"][sub]["q2"][i] += q2[i]
#                     heads[parent_head]["sub_heads"][sub]["q3"][i] += q3[i]
#                     heads[parent_head]["sub_heads"][sub]["q4"][i] += q4[i]

#                 if item not in heads[parent_head]["sub_heads"][sub]["items"]:
#                     heads[parent_head]["sub_heads"][sub]["items"][item] = {
#                         "name": item,
#                         "sequence_id": sequence_map.get(item.upper(), 9999),
#                         "gl_code": gl,
#                         "q1": [0, 0, 0],
#                         "q2": [0, 0, 0],
#                         "q3": [0, 0, 0],
#                         "q4": [0, 0, 0]
#                     }

#                 for i in range(3):
#                     heads[parent_head]["sub_heads"][sub]["items"][item]["q1"][i] += q1[i]
#                     heads[parent_head]["sub_heads"][sub]["items"][item]["q2"][i] += q2[i]
#                     heads[parent_head]["sub_heads"][sub]["items"][item]["q3"][i] += q3[i]
#                     heads[parent_head]["sub_heads"][sub]["items"][item]["q4"][i] += q4[i]

#     final = []

#     for head in sorted(heads.values(), key=lambda x: x["sequence_id"]):

#         head["items"] = sorted(
#             head["items"].values(),
#             key=lambda x: x["sequence_id"]
#         )

#         sorted_subs = []

#         for sub in head["sub_heads"].values():

#             sub["items"] = sorted(
#                 sub["items"].values(),
#                 key=lambda x: x["sequence_id"]
#             )

#             if sub["items"]:
#                 sub["sequence_id"] = min(
#                     item["sequence_id"] for item in sub["items"]
#                 )
#             else:
#                 sub["sequence_id"] = 9999

#             sorted_subs.append(sub)

#         head["sub_heads"] = sorted(
#             sorted_subs,
#             key=lambda x: x["sequence_id"]
#         )

#         final.append(head)
#     return final


# @frappe.whitelist(allow_guest=True)
# def get_consolidated_report(financial_year=None, units=None, cost_center=None, location_code=None):
#     if not financial_year:
#         frappe.throw("Financial Year is required")

#     import re
#     from decimal import Decimal

#     def _num(x):
#         if x is None:
#             return 0.0
#         try:
#             return float(Decimal(str(x)))
#         except Exception:
#             return 0.0

#     # ------------------------------------------------------------
#     # Fetch Expenses doctype data
#     # ------------------------------------------------------------
#     expense_rows = frappe.db.get_all(
#         "Expenses",
#         fields=[
#             "head_of_expense",
#             "sub_head_of_expense",
#             "type_of_expense",
#             "sequence_id"
#         ]
#     )

#     sequence_map = {}
#     expense_subhead_map = {}

#     for e in expense_rows:
#         seq = int(e.sequence_id) if e.sequence_id else 9999

#         if e.head_of_expense:
#             sequence_map[str(e.head_of_expense).strip().upper()] = seq

#         if e.sub_head_of_expense:
#             sequence_map[str(e.sub_head_of_expense).strip().upper()] = seq

#         if e.type_of_expense:
#             key = str(e.type_of_expense).strip()
#             sequence_map[key.upper()] = seq

#             # 🔹 Store real sub head for override logic
#             expense_subhead_map[key] = (
#                 str(e.sub_head_of_expense).strip() if e.sub_head_of_expense else ""
#             )

#     # ------------------------------------------------------------
#     # Filters
#     # ------------------------------------------------------------
#     filters = {"financial_year": financial_year}

#     if units:
#         units = [u.strip() for u in units.split(",") if u.strip()]
#         filters["set_id"] = ["in", units]

#     if cost_center:
#         cost_center = [c.strip() for c in cost_center.split(",") if c.strip()]
#         filters["cost_center"] = ["in", cost_center]

#     if location_code:
#         location_code = [l.strip() for l in location_code.split(",") if l.strip()]
#         filters["location_code"] = ["in", location_code]

#     parents = frappe.get_all(
#         "Finance Budget",
#         filters=filters,
#         fields=["name"]
#     )

#     if not parents:
#         return []

#     parent_names = [p.name for p in parents]

#     rows = frappe.get_all(
#         "Finance Budget Amounts",
#         filters={"parent": ["in", parent_names]},
#         fields=[
#             "type_of_expense",
#             "gl_code",
#             "head_of_expense",
#             "sub_head_of_expense",
#             "april", "may", "june",
#             "july", "august", "september",
#             "october", "november", "december",
#             "january", "february", "march"
#         ]
#     )

#     TOP_LEVEL_HEADS = ["CAPITAL EXPENSES", "OPERATING EXPENSES"]
#     heads = {}

#     # ------------------------------------------------------------
#     # Process rows
#     # ------------------------------------------------------------
#     for r in rows:

#         original_head = (r.head_of_expense or "").strip()
#         original_sub = (r.sub_head_of_expense or "").strip()

#         raw_head = re.sub(r"\s+", " ", original_head).strip().upper()
#         sub = re.sub(r"\s+", " ", original_sub).strip().upper()

#         item = str(r.type_of_expense or "UNKNOWN ITEM").strip()
#         gl = str(r.gl_code or "").strip()

#         q1 = [_num(r.april), _num(r.may), _num(r.june)]
#         q2 = [_num(r.july), _num(r.august), _num(r.september)]
#         q3 = [_num(r.october), _num(r.november), _num(r.december)]
#         q4 = [_num(r.january), _num(r.february), _num(r.march)]

#         # Determine parent head
#         if raw_head not in TOP_LEVEL_HEADS:
#             parent_head = "OPERATING EXPENSES"
#             sub = raw_head
#             original_sub = original_head
#         else:
#             parent_head = raw_head

#         if parent_head not in heads:
#             heads[parent_head] = {
#                 "name": parent_head,
#                 "sequence_id": sequence_map.get(parent_head, 9999),
#                 "q1": [0, 0, 0],
#                 "q2": [0, 0, 0],
#                 "q3": [0, 0, 0],
#                 "q4": [0, 0, 0],
#                 "items": {},
#                 "sub_heads": {}
#             }

#         # Add head totals
#         for i in range(3):
#             heads[parent_head]["q1"][i] += q1[i]
#             heads[parent_head]["q2"][i] += q2[i]
#             heads[parent_head]["q3"][i] += q3[i]
#             heads[parent_head]["q4"][i] += q4[i]

#         # ============================================================
#         # CAPITAL EXPENSES
#         # ============================================================
#         if parent_head == "CAPITAL EXPENSES":

#             if item not in heads[parent_head]["items"]:
#                 heads[parent_head]["items"][item] = {
#                     "name": item,
#                     "sequence_id": sequence_map.get(item.upper(), 9999),
#                     "gl_code": gl,
#                     "head_of_expense": original_head,
#                     "sub_head_of_expense": original_sub,
#                     "q1": [0, 0, 0],
#                     "q2": [0, 0, 0],
#                     "q3": [0, 0, 0],
#                     "q4": [0, 0, 0]
#                 }

#             for i in range(3):
#                 heads[parent_head]["items"][item]["q1"][i] += q1[i]
#                 heads[parent_head]["items"][item]["q2"][i] += q2[i]
#                 heads[parent_head]["items"][item]["q3"][i] += q3[i]
#                 heads[parent_head]["items"][item]["q4"][i] += q4[i]

#         # ============================================================
#         # OPERATING EXPENSES
#         # ============================================================
#         else:

#             if sub:

#                 if sub not in heads[parent_head]["sub_heads"]:
#                     heads[parent_head]["sub_heads"][sub] = {
#                         "name": original_sub,
#                         "sequence_id": sequence_map.get(sub, 9999),
#                         "q1": [0, 0, 0],
#                         "q2": [0, 0, 0],
#                         "q3": [0, 0, 0],
#                         "q4": [0, 0, 0],
#                         "items": {}
#                     }

#                 for i in range(3):
#                     heads[parent_head]["sub_heads"][sub]["q1"][i] += q1[i]
#                     heads[parent_head]["sub_heads"][sub]["q2"][i] += q2[i]
#                     heads[parent_head]["sub_heads"][sub]["q3"][i] += q3[i]
#                     heads[parent_head]["sub_heads"][sub]["q4"][i] += q4[i]

#                 if item not in heads[parent_head]["sub_heads"][sub]["items"]:

#                     # 🔥 OVERRIDE LOGIC ONLY FOR OTHER OPERATING EXPENSES
#                     if sub == "OTHER OPERATING EXPENSES":
#                         real_sub_head = expense_subhead_map.get(item, original_sub)
#                     else:
#                         real_sub_head = original_sub

#                     heads[parent_head]["sub_heads"][sub]["items"][item] = {
#                         "name": item,
#                         "sequence_id": sequence_map.get(item.upper(), 9999),
#                         "gl_code": gl,
#                         "head_of_expense": original_head,
#                         "sub_head_of_expense": real_sub_head,
#                         "q1": [0, 0, 0],
#                         "q2": [0, 0, 0],
#                         "q3": [0, 0, 0],
#                         "q4": [0, 0, 0]
#                     }

#                 for i in range(3):
#                     heads[parent_head]["sub_heads"][sub]["items"][item]["q1"][i] += q1[i]
#                     heads[parent_head]["sub_heads"][sub]["items"][item]["q2"][i] += q2[i]
#                     heads[parent_head]["sub_heads"][sub]["items"][item]["q3"][i] += q3[i]
#                     heads[parent_head]["sub_heads"][sub]["items"][item]["q4"][i] += q4[i]

#     # ------------------------------------------------------------
#     # Final Sorting
#     # ------------------------------------------------------------
#     final = []

#     for head in sorted(heads.values(), key=lambda x: x["sequence_id"]):

#         head["items"] = sorted(
#             head["items"].values(),
#             key=lambda x: x["sequence_id"]
#         )

#         sorted_subs = []

#         for sub in head["sub_heads"].values():

#             sub["items"] = sorted(
#                 sub["items"].values(),
#                 key=lambda x: x["sequence_id"]
#             )

#             if sub["items"]:
#                 sub["sequence_id"] = min(
#                     item["sequence_id"] for item in sub["items"]
#                 )
#             else:
#                 sub["sequence_id"] = 9999

#             sorted_subs.append(sub)

#         head["sub_heads"] = sorted(
#             sorted_subs,
#             key=lambda x: x["sequence_id"]
#         )

#         final.append(head)

#     return final







# @frappe.whitelist(allow_guest=True)
# def get_consolidated_report(financial_year=None, units=None, cost_center=None, location_code=None):

#     if not financial_year:
#         frappe.throw("Financial Year is required")

#     import re
#     from decimal import Decimal

#     def _num(x):
#         if x is None:
#             return 0.0
#         try:
#             return float(Decimal(str(x)))
#         except Exception:
#             return 0.0

#     # ------------------------------------------------------------
#     # Fetch Expenses (MAP BY ID FOR SEQUENCE)
#     # ------------------------------------------------------------
#     expense_rows = frappe.db.get_all(
#         "Expenses",
#         fields=["name", "sequence_id"]
#     )

#     sequence_map = {
#         e.name: int(e.sequence_id or 9999)
#         for e in expense_rows
#     }

#     # ------------------------------------------------------------
#     # Filters
#     # ------------------------------------------------------------
#     filters = {"financial_year": financial_year}

#     if units:
#         filters["set_id"] = ["in", [u.strip() for u in units.split(",") if u.strip()]]

#     if cost_center:
#         filters["cost_center"] = ["in", [c.strip() for c in cost_center.split(",") if c.strip()]]

#     if location_code:
#         filters["location_code"] = ["in", [l.strip() for l in location_code.split(",") if l.strip()]]

#     parents = frappe.get_all("Finance Budget", filters=filters, fields=["name"])

#     if not parents:
#         return []

#     parent_names = [p.name for p in parents]

#     rows = frappe.get_all(
#         "Finance Budget Amounts",
#         filters={"parent": ["in", parent_names]},
#         fields=[
#             "type_of_expense_id",
#             "type_of_expense",
#             "gl_code",
#             "head_of_expense",
#             "sub_head_of_expense",
#             "april", "may", "june",
#             "july", "august", "september",
#             "october", "november", "december",
#             "january", "february", "march"
#         ]
#     )

#     # 🔥 Only change: COVID SUPPORT added
#     TOP_LEVEL_HEADS = [
#         "CAPITAL EXPENSES",
#         "OPERATING EXPENSES",
#         "COVID SUPPORT"
#     ]

#     heads = {}

#     # ------------------------------------------------------------
#     # Process rows
#     # ------------------------------------------------------------
#     for r in rows:

#         expense_id = r.type_of_expense_id
#         item_label = r.type_of_expense

#         original_head = (r.head_of_expense or "").strip()
#         original_sub = (r.sub_head_of_expense or "").strip()

#         raw_head = re.sub(r"\s+", " ", original_head).strip().upper()
#         sub = re.sub(r"\s+", " ", original_sub).strip().upper()

#         gl = str(r.gl_code or "").strip()

#         q1 = [_num(r.april), _num(r.may), _num(r.june)]
#         q2 = [_num(r.july), _num(r.august), _num(r.september)]
#         q3 = [_num(r.october), _num(r.november), _num(r.december)]
#         q4 = [_num(r.january), _num(r.february), _num(r.march)]

#         # Determine parent head
#         if raw_head not in TOP_LEVEL_HEADS:
#             parent_head = "OPERATING EXPENSES"
#             sub = raw_head
#             original_sub = original_head
#         else:
#             parent_head = raw_head

#         if parent_head not in heads:
#             heads[parent_head] = {
#                 "name": parent_head,
#                 "q1": [0, 0, 0],
#                 "q2": [0, 0, 0],
#                 "q3": [0, 0, 0],
#                 "q4": [0, 0, 0],
#                 "items": {},
#                 "sub_heads": {}
#             }

#         # Add head totals
#         for i in range(3):
#             heads[parent_head]["q1"][i] += q1[i]
#             heads[parent_head]["q2"][i] += q2[i]
#             heads[parent_head]["q3"][i] += q3[i]
#             heads[parent_head]["q4"][i] += q4[i]

#         # ============================================================
#         # CAPITAL + COVID SUPPORT (Direct Items)
#         # ============================================================
#         if parent_head in ["CAPITAL EXPENSES", "COVID SUPPORT"]:

#             if expense_id not in heads[parent_head]["items"]:
#                 heads[parent_head]["items"][expense_id] = {
#                     "name": item_label,
#                     "sequence_id": sequence_map.get(expense_id, 9999),
#                     "gl_code": gl,
#                     "head_of_expense": original_head,
#                     "sub_head_of_expense": original_sub,
#                     "q1": [0,0,0],
#                     "q2": [0,0,0],
#                     "q3": [0,0,0],
#                     "q4": [0,0,0]
#                 }

#             item = heads[parent_head]["items"][expense_id]

#         # ============================================================
#         # OPERATING EXPENSES (With Sub-Heads)
#         # ============================================================
#         else:

#             if sub not in heads[parent_head]["sub_heads"]:
#                 heads[parent_head]["sub_heads"][sub] = {
#                     "name": original_sub,
#                     "q1": [0,0,0],
#                     "q2": [0,0,0],
#                     "q3": [0,0,0],
#                     "q4": [0,0,0],
#                     "items": {}
#                 }

#             # Sub-head totals
#             for i in range(3):
#                 heads[parent_head]["sub_heads"][sub]["q1"][i] += q1[i]
#                 heads[parent_head]["sub_heads"][sub]["q2"][i] += q2[i]
#                 heads[parent_head]["sub_heads"][sub]["q3"][i] += q3[i]
#                 heads[parent_head]["sub_heads"][sub]["q4"][i] += q4[i]

#             if expense_id not in heads[parent_head]["sub_heads"][sub]["items"]:
#                 heads[parent_head]["sub_heads"][sub]["items"][expense_id] = {
#                     "name": item_label,
#                     "sequence_id": sequence_map.get(expense_id, 9999),
#                     "gl_code": gl,
#                     "head_of_expense": original_head,
#                     "sub_head_of_expense": original_sub,
#                     "q1": [0,0,0],
#                     "q2": [0,0,0],
#                     "q3": [0,0,0],
#                     "q4": [0,0,0]
#                 }

#             item = heads[parent_head]["sub_heads"][sub]["items"][expense_id]

#         # Item totals
#         for i in range(3):
#             item["q1"][i] += q1[i]
#             item["q2"][i] += q2[i]
#             item["q3"][i] += q3[i]
#             item["q4"][i] += q4[i]

#     # ------------------------------------------------------------
#     # Final Sorting
#     # ------------------------------------------------------------
#     final = []

#     for head in heads.values():

#         head["items"] = sorted(
#             head["items"].values(),
#             key=lambda x: x["sequence_id"]
#         )

#         sorted_subs = []

#         for sub in head["sub_heads"].values():

#             sub["items"] = sorted(
#                 sub["items"].values(),
#                 key=lambda x: x["sequence_id"]
#             )

#             if sub["items"]:
#                 sub["sequence_id"] = min(
#                     item["sequence_id"] for item in sub["items"]
#                 )
#             else:
#                 sub["sequence_id"] = 9999

#             sorted_subs.append(sub)

#         head["sub_heads"] = sorted(
#             sorted_subs,
#             key=lambda x: x["sequence_id"]
#         )

#         final.append(head)

#     return final


@frappe.whitelist(allow_guest=True)
def get_consolidated_report(financial_year=None, units=None, cost_center=None, location_code=None):

    if not financial_year:
        frappe.throw("Financial Year is required")

    import re
    from decimal import Decimal

    def _num(x):
        if x is None:
            return 0.0
        try:
            return float(Decimal(str(x)))
        except Exception:
            return 0.0

    # ------------------------------------------------------------
    # Fetch Expenses (sequence + sub head from master)
    # ------------------------------------------------------------
    expense_rows = frappe.db.get_all(
        "Expenses",
        fields=["name", "sequence_id", "sub_head_of_expense"]
    )

    sequence_map = {}
    expense_sub_map = {}

    for e in expense_rows:
        sequence_map[e.name] = int(e.sequence_id or 9999)
        expense_sub_map[e.name] = (e.sub_head_of_expense or "").strip()

    # ------------------------------------------------------------
    # Filters
    # ------------------------------------------------------------
    filters = {"financial_year": financial_year}

    if units:
        filters["set_id"] = ["in", [u.strip() for u in units.split(",") if u.strip()]]

    if cost_center:
        filters["cost_center"] = ["in", [c.strip() for c in cost_center.split(",") if c.strip()]]

    if location_code:
        filters["location_code"] = ["in", [l.strip() for l in location_code.split(",") if l.strip()]]

    parents = frappe.get_all("Finance Budget", filters=filters, fields=["name"])

    if not parents:
        return []

    parent_names = [p.name for p in parents]

    rows = frappe.get_all(
        "Finance Budget Amounts",
        filters={"parent": ["in", parent_names]},
        fields=[
            "type_of_expense_id",
            "type_of_expense",
            "gl_code",
            "head_of_expense",
            "sub_head_of_expense",
            "april", "may", "june",
            "july", "august", "september",
            "october", "november", "december",
            "january", "february", "march"
        ]
    )

    TOP_LEVEL_HEADS = [
        "CAPITAL EXPENSES",
        "OPERATING EXPENSES",
        "COVID SUPPORT"
    ]

    heads = {}

    # ------------------------------------------------------------
    # Process rows
    # ------------------------------------------------------------
    for r in rows:

        expense_id = r.type_of_expense_id
        item_label = r.type_of_expense

        original_head = (r.head_of_expense or "").strip()
        original_sub = (r.sub_head_of_expense or "").strip()

        raw_head = re.sub(r"\s+", " ", original_head).strip().upper()
        sub = re.sub(r"\s+", " ", original_sub).strip().upper()

        gl = str(r.gl_code or "").strip()

        q1 = [_num(r.april), _num(r.may), _num(r.june)]
        q2 = [_num(r.july), _num(r.august), _num(r.september)]
        q3 = [_num(r.october), _num(r.november), _num(r.december)]
        q4 = [_num(r.january), _num(r.february), _num(r.march)]

        # Determine parent head
        if raw_head not in TOP_LEVEL_HEADS:
            parent_head = "OPERATING EXPENSES"
            sub = raw_head
            original_sub = original_head
        else:
            parent_head = raw_head

        if parent_head not in heads:
            heads[parent_head] = {
                "name": parent_head,
                "sequence_id": 0,
                "q1": [0, 0, 0],
                "q2": [0, 0, 0],
                "q3": [0, 0, 0],
                "q4": [0, 0, 0],
                "items": {},
                "sub_heads": {}
            }

        # Add head totals
        for i in range(3):
            heads[parent_head]["q1"][i] += q1[i]
            heads[parent_head]["q2"][i] += q2[i]
            heads[parent_head]["q3"][i] += q3[i]
            heads[parent_head]["q4"][i] += q4[i]

        # ============================================================
        # CAPITAL + COVID SUPPORT (Direct Items)
        # ============================================================
        if parent_head in ["CAPITAL EXPENSES", "COVID SUPPORT"]:

            if expense_id not in heads[parent_head]["items"]:
                heads[parent_head]["items"][expense_id] = {
                    "name": item_label,
                    "sequence_id": sequence_map.get(expense_id, 9999),
                    "gl_code": gl,
                    "head_of_expense": original_head,
                    # 🔥 ONLY CHANGE HERE
                    "sub_head_of_expense": expense_sub_map.get(expense_id, original_sub),
                    "q1": [0,0,0],
                    "q2": [0,0,0],
                    "q3": [0,0,0],
                    "q4": [0,0,0]
                }

            item = heads[parent_head]["items"][expense_id]

        # ============================================================
        # OPERATING EXPENSES (With Sub-Heads)
        # ============================================================
        else:

            if sub not in heads[parent_head]["sub_heads"]:
                heads[parent_head]["sub_heads"][sub] = {
                    "name": original_sub,
                    "sequence_id": 0,
                    "q1": [0,0,0],
                    "q2": [0,0,0],
                    "q3": [0,0,0],
                    "q4": [0,0,0],
                    "items": {}
                }

            # Sub-head totals
            for i in range(3):
                heads[parent_head]["sub_heads"][sub]["q1"][i] += q1[i]
                heads[parent_head]["sub_heads"][sub]["q2"][i] += q2[i]
                heads[parent_head]["sub_heads"][sub]["q3"][i] += q3[i]
                heads[parent_head]["sub_heads"][sub]["q4"][i] += q4[i]

            if expense_id not in heads[parent_head]["sub_heads"][sub]["items"]:
                heads[parent_head]["sub_heads"][sub]["items"][expense_id] = {
                    "name": item_label,
                    "sequence_id": sequence_map.get(expense_id, 9999),
                    "gl_code": gl,
                    "head_of_expense": original_head,
                    # 🔥 ONLY CHANGE HERE
                    "sub_head_of_expense": expense_sub_map.get(expense_id, original_sub),
                    "q1": [0,0,0],
                    "q2": [0,0,0],
                    "q3": [0,0,0],
                    "q4": [0,0,0]
                }

            item = heads[parent_head]["sub_heads"][sub]["items"][expense_id]

        # Item totals
        for i in range(3):
            item["q1"][i] += q1[i]
            item["q2"][i] += q2[i]
            item["q3"][i] += q3[i]
            item["q4"][i] += q4[i]

    # ------------------------------------------------------------
    # Final Sorting (unchanged)
    # ------------------------------------------------------------
    final = []

    for head in heads.values():

        head["items"] = sorted(
            head["items"].values(),
            key=lambda x: x["sequence_id"]
        )

        sorted_subs = []

        for sub in head["sub_heads"].values():

            sub["items"] = sorted(
                sub["items"].values(),
                key=lambda x: x["sequence_id"]
            )

            if sub["items"]:
                sub["sequence_id"] = min(
                    item["sequence_id"] for item in sub["items"]
                )
            else:
                sub["sequence_id"] = 9999

            sorted_subs.append(sub)

        head["sub_heads"] = sorted(
            sorted_subs,
            key=lambda x: x["sequence_id"]
        )

        final.append(head)

    return final


import frappe
import re
from decimal import Decimal


@frappe.whitelist(allow_guest=True)
def get_consolidated_report_actual_ytd(
    financial_year=None,
    units=None,
    cost_center=None,
    location_code=None,
    month=None
):

    if not financial_year:
        frappe.throw("Financial Year is required")

    if not month:
        frappe.throw("Month is required")

    # ---------------------------------------------------
    # Safe Numeric Conversion
    # ---------------------------------------------------
    def _num(x):
        if x is None:
            return 0.0
        try:
            return float(Decimal(str(x)))
        except Exception:
            return 0.0

    # ---------------------------------------------------
    # Normalization Helper (CRITICAL FIX)
    # ---------------------------------------------------
    def normalize(val):
        return re.sub(r"\s+", " ", str(val or "")).strip().upper()

    # ---------------------------------------------------
    # Financial Year Month Order (April → March)
    # ---------------------------------------------------
    MONTHS = [
        "april", "may", "june",
        "july", "august", "september",
        "october", "november", "december",
        "january", "february", "march"
    ]

    month = month.lower().strip()

    if month not in MONTHS:
        frappe.throw("Invalid month")

    end_index = MONTHS.index(month)

    # ---------------------------------------------------
    # Load Sequence Mapping
    # ---------------------------------------------------
    expense_rows = frappe.db.get_all(
        "Expenses",
        fields=[
            "head_of_expense",
            "sub_head_of_expense",
            "type_of_expense",
            "sequence_id"
        ]
    )

    sequence_map = {}

    for e in expense_rows:
        seq = int(e.sequence_id) if e.sequence_id else 9999

        for field in [
            e.head_of_expense,
            e.sub_head_of_expense,
            e.type_of_expense
        ]:
            key = normalize(field)
            if key:
                sequence_map[key] = seq

    # ---------------------------------------------------
    # Filters
    # ---------------------------------------------------
    filters = {"financial_year": financial_year}

    if units:
        filters["set_id"] = ["in", [u.strip() for u in units.split(",")]]

    if cost_center:
        filters["cost_center"] = ["in", [c.strip() for c in cost_center.split(",")]]

    if location_code:
        filters["location_code"] = ["in", [l.strip() for l in location_code.split(",")]]

    parents = frappe.get_all(
        "Finance Budget",
        filters=filters,
        fields=["name"]
    )

    if not parents:
        return []

    parent_names = [p.name for p in parents]

    rows = frappe.get_all(
        "Finance Budget Amounts",
        filters={"parent": ["in", parent_names]},
        fields=[
            "type_of_expense",
            "gl_code",
            "head_of_expense",
            "sub_head_of_expense",
            "april", "may", "june",
            "july", "august", "september",
            "october", "november", "december",
            "january", "february", "march"
        ]
    )

    if not rows:
        return []

    # ---------------------------------------------------
    # Grouping Structure
    # ---------------------------------------------------
    TOP_LEVEL_HEADS = ["CAPITAL EXPENSES", "OPERATING EXPENSES"]
    heads = {}

    for r in rows:

        raw_head = normalize(r.get("head_of_expense"))
        sub_head = normalize(r.get("sub_head_of_expense"))
        item_name = str(r.get("type_of_expense") or "UNKNOWN ITEM").strip()
        item_key = normalize(item_name)
        gl = str(r.get("gl_code") or "").strip()

        # YTD Calculation (FIXED SAFE VERSION)
        ytd_total = sum(_num(r.get(m)) for m in MONTHS[:end_index + 1])

        if ytd_total == 0:
            continue

        # Determine Parent Head
        if raw_head in TOP_LEVEL_HEADS:
            parent_head = raw_head
        else:
            parent_head = "OPERATING EXPENSES"
            if not sub_head:
                sub_head = raw_head

        # Initialize Head
        if parent_head not in heads:
            heads[parent_head] = {
                "name": parent_head,
                "sequence_id": sequence_map.get(parent_head, 9999),
                "ytd": 0.0,
                "sub_heads": {}
            }

        # Initialize Sub-head
        if sub_head not in heads[parent_head]["sub_heads"]:
            heads[parent_head]["sub_heads"][sub_head] = {
                "name": sub_head,
                "sequence_id": sequence_map.get(sub_head, 9999),
                "ytd": 0.0,
                "items": {}
            }

        sub_container = heads[parent_head]["sub_heads"][sub_head]

        # Use item + GL as unique key (FIXED GL ISSUE)
        item_unique_key = f"{item_key}||{gl}"

        if item_unique_key not in sub_container["items"]:
            sub_container["items"][item_unique_key] = {
                "name": item_name,
                "sequence_id": sequence_map.get(item_key, 9999),
                "gl_code": gl,
                "ytd": 0.0
            }

        sub_container["items"][item_unique_key]["ytd"] += ytd_total

    # ---------------------------------------------------
    # Final Aggregation (NO DOUBLE COUNTING)
    # ---------------------------------------------------
    final = []

    for head in heads.values():

        head_total = 0.0
        sorted_subs = []

        for sub in head["sub_heads"].values():

            sub_total = 0.0

            items_sorted = sorted(
                sub["items"].values(),
                key=lambda x: x["sequence_id"]
            )

            for item in items_sorted:
                sub_total += item["ytd"]

            sub["ytd"] = sub_total
            sub["items"] = items_sorted

            head_total += sub_total
            sorted_subs.append(sub)

        head["ytd"] = head_total

        head["sub_heads"] = sorted(
            sorted_subs,
            key=lambda x: x["sequence_id"]
        )

        final.append(head)

    final = sorted(final, key=lambda x: x["sequence_id"])

    return final


# @frappe.whitelist(allow_guest=True)
# def get_combined_actuals(financial_year, month, unit=None, cost_center=None, location_code=None,erp_loc_value=None,erp_cost_center=None):

#     first_response = get_consolidated_report_actual_ytd(
#         financial_year=financial_year,
#         units=unit,
#         cost_center=cost_center,
#         location_code=location_code,
#         month=month
#     )

#     second_response = get_filtered_actuals(
#         month=month,
#         financial_year=financial_year,
#         unit=unit,
#         cost_center=erp_cost_center,
#         location_code=erp_loc_value
#     )

#     def normalize_string(value):
#         if not value:
#             return ""
#         return " ".join(value.strip().lower().split())

#     actuals_lookup = {}

#     for row in second_response.get("data", []):
#         key = normalize_string(row.get("type_of_expense"))

#         actuals_lookup[key] = {
#             "type_of_expense": row.get("type_of_expense"),
#             "actuals_type_of_expenses": row.get("actuals_type_of_expenses"),
#             "total_posted_amt": row.get("total_posted_amt", "0")
#         }

#     for head in first_response:

#         for item in head.get("items", []):
#             name_key = normalize_string(item.get("name"))

#             if name_key in actuals_lookup:
#                 item.update(actuals_lookup[name_key])
#             else:
#                 item.update({
#                     "type_of_expense": item.get("name"),
#                     "actuals_type_of_expenses": item.get("name"),
#                     "total_posted_amt": "0"
#                 })

#         for sub_head in head.get("sub_heads", []):
#             for item in sub_head.get("items", []):
#                 name_key = normalize_string(item.get("name"))

#                 if name_key in actuals_lookup:
#                     item.update(actuals_lookup[name_key])
#                 else:
#                     item.update({
#                         "type_of_expense": item.get("name"),
#                         "actuals_type_of_expenses": item.get("name"),
#                         "total_posted_amt": "0"
#                     })

#     return first_response


# def get_combined_actuals(financial_year, month, unit=None, cost_center=None, location_code=None, erp_loc_value=None, erp_cost_center_value=None):
#     print(erp_cost_center_value,erp_loc_value)
#     first_response = get_consolidated_report_actual_ytd(
#         financial_year=financial_year,
#         units=unit,
#         cost_center=cost_center,
#         location_code=location_code,
#         month=month
#     )

#     second_response = get_filtered_actuals(
#         month=month,
#         financial_year=financial_year,
#         unit=unit,
#         cost_center=erp_cost_center_value,
#         location_code=erp_loc_value
#     )

#     # 🔹 Build lookup using sequence_id instead of type_of_expense
#     actuals_lookup = {}

#     for row in second_response.get("data", []):
#         sequence_id = row.get("sequence_id")

#         if sequence_id:
#             actuals_lookup[sequence_id] = {
#                 "type_of_expense": row.get("type_of_expense"),
#                 "actuals_type_of_expenses": row.get("actuals_type_of_expenses"),
#                 "total_posted_amt": row.get("total_posted_amt", "0")
#             }

#     # 🔹 Map using sequence_id
#     for head in first_response:

#         # Main items
#         for item in head.get("items", []):
#             sequence_id = item.get("sequence_id")

#             if sequence_id in actuals_lookup:
#                 item.update(actuals_lookup[sequence_id])
#             else:
#                 item.update({
#                     "type_of_expense": item.get("name"),
#                     "actuals_type_of_expenses": item.get("name"),
#                     "total_posted_amt": "0"
#                 })

#         # Sub head items
#         for sub_head in head.get("sub_heads", []):
#             for item in sub_head.get("items", []):
#                 sequence_id = item.get("sequence_id")

#                 if sequence_id in actuals_lookup:
#                     item.update(actuals_lookup[sequence_id])
#                 else:
#                     item.update({
#                         "type_of_expense": item.get("name"),
#                         "actuals_type_of_expenses": item.get("name"),
#                         "total_posted_amt": "0"
#                     })

#     return first_response


# @frappe.whitelist(allow_guest=True)
# def get_combined_actuals(
#     financial_year,
#     month,
#     unit=None,
#     cost_center=None,
#     location_code=None,
#     erp_loc_value=None,
#     erp_cost_center_value=None
# ):

#     first_response = get_consolidated_report_actual_ytd(
#         financial_year=financial_year,
#         units=unit,
#         cost_center=cost_center,
#         location_code=location_code,
#         month=month
#     )

#     second_response = get_filtered_actuals(
#         month=month,
#         financial_year=financial_year,
#         unit=unit,
#         cost_center=erp_cost_center_value,
#         location_code=erp_loc_value
#     )

#     # 🔹 Helper to safely convert to float
#     def safe_float(value):
#         try:
#             return float(value)
#         except (TypeError, ValueError):
#             return 0.0

#     # 🔹 Build lookup using sequence_id
#     actuals_lookup = {}

#     for row in second_response.get("data", []):
#         sequence_id = row.get("sequence_id")

#         if sequence_id:
#             actuals_lookup[sequence_id] = {
#                 "type_of_expense": row.get("type_of_expense"),
#                 "actuals_type_of_expenses": row.get("actuals_type_of_expenses"),
#                 "total_posted_amt": row.get("total_posted_amt", 0)
#             }

#     # 🔹 Map actuals into first_response
#     for head in first_response:

#         # -------------------------
#         # 1️⃣ Update direct head items
#         # -------------------------
#         for item in head.get("items", []):
#             sequence_id = item.get("sequence_id")

#             if sequence_id in actuals_lookup:
#                 item.update(actuals_lookup[sequence_id])
#             else:
#                 item.update({
#                     "type_of_expense": item.get("name"),
#                     "actuals_type_of_expenses": item.get("name"),
#                     "total_posted_amt": 0
#                 })

#         # -------------------------
#         # 2️⃣ Update sub-head items
#         # -------------------------
#         for sub_head in head.get("sub_heads", []):
#             for item in sub_head.get("items", []):
#                 sequence_id = item.get("sequence_id")

#                 if sequence_id in actuals_lookup:
#                     item.update(actuals_lookup[sequence_id])
#                 else:
#                     item.update({
#                         "type_of_expense": item.get("name"),
#                         "actuals_type_of_expenses": item.get("name"),
#                         "total_posted_amt": 0
#                     })

#     # 🔹 3️⃣ Aggregate totals
#     for head in first_response:

#         head_total = 0.0

#         # Case A: Head has sub-heads → sum sub-head totals only
#         if head.get("sub_heads"):

#             for sub_head in head.get("sub_heads", []):

#                 sub_total = 0.0

#                 for item in sub_head.get("items", []):
#                     sub_total += safe_float(item.get("total_posted_amt"))

#                 # Add total at sub-head level
#                 sub_head["total_posted_amt_ytd"] = sub_total

#                 head_total += sub_total

#         # Case B: Head has no sub-heads → sum direct items
#         else:
#             for item in head.get("items", []):
#                 head_total += safe_float(item.get("total_posted_amt"))

#         # Add total at head level
#         head["total_posted_amt_ytd"] = head_total

#     return first_response

# @frappe.whitelist(allow_guest=True)
# def get_combined_actuals(
#     financial_year=None,
#     month=None,
#     unit=None,
#     cost_center=None,
#     location_code=None,
#     erp_loc_value=None,
#     erp_cost_center_value=None
# ):
#     from decimal import Decimal, ROUND_HALF_UP

#     def to_decimal(value):
#         try:
#             return Decimal(str(value or 0))
#         except Exception:
#             return Decimal("0")

#     def to_float(value):
#         return float(value.quantize(Decimal("0.01"), ROUND_HALF_UP))

#     # --------------------------------------------------
#     # 1️⃣ Build Structure
#     # --------------------------------------------------

#     expense_rows = frappe.get_all(
#         "Expenses",
#         fields=[
#             "head_of_expense",
#             "sub_head_of_expense",
#             "type_of_expense",
#             "gl_code",
#             "sequence_id"
#         ],
#         order_by="sequence_id asc"
#     )

#     heads = {}

#     for row in expense_rows:
#         head = (row.head_of_expense or "").strip()
#         sub = (row.sub_head_of_expense or "").strip()
#         item_name = (row.type_of_expense or "").strip()
#         seq = row.sequence_id or 9999

#         if not head:
#             continue

#         head_obj = heads.setdefault(head, {
#             "name": head,
#             "sequence_id": seq,
#             "ytd": Decimal("0"),
#             "items": [],
#             "sub_heads": {}
#         })

#         item_data = {
#             "name": item_name,
#             "sequence_id": seq,
#             "gl_code": row.gl_code or "",
#             "ytd": Decimal("0"),
#             "type_of_expense": item_name,
#             "actuals_type_of_expenses": item_name,
#             "total_posted_amt": Decimal("0")
#         }

#         if sub:
#             sub_obj = head_obj["sub_heads"].setdefault(sub, {
#                 "name": sub,
#                 "sequence_id": seq,
#                 "ytd": Decimal("0"),
#                 "items": []
#             })
#             sub_obj["items"].append(item_data)
#         else:
#             head_obj["items"].append(item_data)

#     structure = []
#     for head in sorted(heads.values(), key=lambda x: x["sequence_id"]):
#         head["sub_heads"] = sorted(
#             head["sub_heads"].values(),
#             key=lambda x: x["sequence_id"]
#         )
#         structure.append(head)

#     # --------------------------------------------------
#     # 2️⃣ Budget Lookup
#     # --------------------------------------------------

#     budget_lookup = {}
#     budget_data = get_consolidated_report_actual_ytd(
#         financial_year=financial_year,
#         units=unit,
#         cost_center=cost_center,
#         location_code=location_code,
#         month=month
#     )

#     for head in budget_data or []:
#         for item in head.get("items", []):
#             budget_lookup[item["sequence_id"]] = to_decimal(item.get("ytd"))
#         for sub in head.get("sub_heads", []):
#             for item in sub.get("items", []):
#                 budget_lookup[item["sequence_id"]] = to_decimal(item.get("ytd"))

#     # --------------------------------------------------
#     # 3️⃣ Actual Lookup
#     # --------------------------------------------------

#     actual_lookup = {}
#     actual_data = get_filtered_actuals(
#         month=month,
#         financial_year=financial_year,
#         unit=unit,
#         cost_center=erp_cost_center_value,
#         location_code=erp_loc_value
#     )

#     for row in (actual_data.get("data", []) if actual_data else []):
#         if row.get("sequence_id"):
#             actual_lookup[row["sequence_id"]] = to_decimal(row.get("total_posted_amt"))

#     # --------------------------------------------------
#     # 4️⃣ Inject Totals
#     # --------------------------------------------------

#     for head in structure:
#         head_budget_total = Decimal("0")
#         head_actual_total = Decimal("0")

#         for item in head["items"]:
#             seq = item["sequence_id"]
#             item["ytd"] = budget_lookup.get(seq, Decimal("0"))
#             item["total_posted_amt"] = actual_lookup.get(seq, Decimal("0"))

#             head_budget_total += item["ytd"]
#             head_actual_total += item["total_posted_amt"]

#         for sub in head["sub_heads"]:
#             sub_budget_total = Decimal("0")
#             sub_actual_total = Decimal("0")

#             for item in sub["items"]:
#                 seq = item["sequence_id"]
#                 item["ytd"] = budget_lookup.get(seq, Decimal("0"))
#                 item["total_posted_amt"] = actual_lookup.get(seq, Decimal("0"))

#                 sub_budget_total += item["ytd"]
#                 sub_actual_total += item["total_posted_amt"]

#             sub["ytd"] = sub_budget_total
#             sub["total_posted_amt_ytd"] = sub_actual_total

#             head_budget_total += sub_budget_total
#             head_actual_total += sub_actual_total

#         head["ytd"] = head_budget_total
#         head["total_posted_amt_ytd"] = head_actual_total

#     # --------------------------------------------------
#     # 5️⃣ Regroup Under OPERATING EXPENSES
#     # --------------------------------------------------

#     operating_head = None
#     regroup_heads = []

#     for head in structure:
#         name = head["name"].strip().upper()

#         if name == "OPERATING  EXPENSES":
#             operating_head = head

#         if name in (
#             "OTHER  OPERATING EXPENSES",
#             "MEDICAL EXPENSES",
#             "COVID SUPPORT"
#         ):
#             regroup_heads.append(head)

#     if operating_head:
#         for extra_head in regroup_heads:
#             # Move entire head as sub_head
#             operating_head["sub_heads"].append({
#                 "name": extra_head["name"],
#                 "sequence_id": extra_head["sequence_id"],
#                 "ytd": extra_head["ytd"],
#                 "items": extra_head["items"],
#                 "total_posted_amt_ytd": extra_head["total_posted_amt_ytd"]
#             })
#             structure.remove(extra_head)

#         # Recalculate operating totals
#         total = Decimal("0")
#         for sub in operating_head["sub_heads"]:
#             total += sub["total_posted_amt_ytd"]
#         operating_head["total_posted_amt_ytd"] = total

#     # --------------------------------------------------
#     # 6️⃣ Flatten CAPITAL Only
#     # --------------------------------------------------

#     for head in structure:
#         if head["name"].strip().upper() == "CAPITAL  EXPENSES":
#             flat = []
#             flat.extend(head["items"])
#             for sub in head["sub_heads"]:
#                 flat.extend(sub["items"])
#             head["items"] = sorted(flat, key=lambda x: x["sequence_id"])
#             head["sub_heads"] = []

#     # --------------------------------------------------
#     # 7️⃣ Convert Decimal → Float
#     # --------------------------------------------------

#     for head in structure:
#         head["ytd"] = to_float(head["ytd"])
#         head["total_posted_amt_ytd"] = to_float(head["total_posted_amt_ytd"])

#         for item in head["items"]:
#             item["ytd"] = to_float(item["ytd"])
#             item["total_posted_amt"] = to_float(item["total_posted_amt"])

#         for sub in head["sub_heads"]:
#             sub["ytd"] = to_float(sub["ytd"])
#             sub["total_posted_amt_ytd"] = to_float(sub["total_posted_amt_ytd"])

#             for item in sub["items"]:
#                 item["ytd"] = to_float(item["ytd"])
#                 item["total_posted_amt"] = to_float(item["total_posted_amt"])

#     return structure





# @frappe.whitelist(allow_guest=True)
# def get_combined_actuals(
#     financial_year=None,
#     month=None,
#     unit=None,
#     cost_center=None,
#     location_code=None,
#     erp_loc_value=None,
#     erp_cost_center_value=None
# ):
#     from decimal import Decimal, ROUND_HALF_UP

#     # -----------------------------
#     # Helpers
#     # -----------------------------

#     def to_decimal(value):
#         try:
#             return Decimal(str(value or 0))
#         except Exception:
#             return Decimal("0")

#     def to_float(value):
#         return float(value.quantize(Decimal("0.01"), ROUND_HALF_UP))

#     # -----------------------------
#     # 1️⃣ Build Structure Properly
#     # head -> sub_head -> items
#     # -----------------------------

#     expense_rows = frappe.get_all(
#         "Expenses",
#         fields=[
#             "head_of_expense",
#             "sub_head_of_expense",
#             "type_of_expense",
#             "gl_code",
#             "sequence_id"
#         ],
#         order_by="sequence_id asc"
#     )

#     heads = {}

#     for row in expense_rows:
#         head_name = (row.head_of_expense or "").strip()
#         sub_name = (row.sub_head_of_expense or "").strip()
#         expense_name = (row.type_of_expense or "").strip()
#         seq = row.sequence_id or 9999

#         if not head_name or not expense_name:
#             continue

#         # Create head
#         head_obj = heads.setdefault(head_name, {
#             "name": head_name,
#             "sequence_id": seq,
#             "ytd": Decimal("0"),
#             "sub_heads": {},
#             "items": [],
#             "total_posted_amt_ytd": Decimal("0")
#         })

#         item_data = {
#             "name": expense_name,
#             "sequence_id": seq,
#             "gl_code": row.gl_code or "",
#             "ytd": Decimal("0"),
#             "total_posted_amt": Decimal("0")
#         }

#         # If sub head exists → group under sub head
#         if sub_name:
#             sub_obj = head_obj["sub_heads"].setdefault(sub_name, {
#                 "name": sub_name,
#                 "sequence_id": seq,
#                 "items": [],
#                 "ytd": Decimal("0"),
#                 "total_posted_amt_ytd": Decimal("0")
#             })
#             sub_obj["items"].append(item_data)
#         else:
#             head_obj["items"].append(item_data)

#     # Convert dicts to lists
#     structure = []
#     for head in sorted(heads.values(), key=lambda x: x["sequence_id"]):
#         head["sub_heads"] = sorted(
#             head["sub_heads"].values(),
#             key=lambda x: x["sequence_id"]
#         )
#         structure.append(head)

#     # -----------------------------
#     # 2️⃣ Actual Lookup
#     # -----------------------------

#     actual_lookup = {}

#     actual_data = sum_of_actuals_by_sequence(
#         month=month,
#         financial_year=financial_year,
#         unit=unit,
#         cost_center=erp_cost_center_value,
#         location_code=erp_loc_value
#     )

#     for row in (actual_data.get("data", []) if actual_data else []):
#         key = (row.get("sequence_id"), row.get("type_of_expense"))
#         actual_lookup[key] = to_decimal(row.get("total_posted_amt"))

#     # -----------------------------
#     # 3️⃣ Inject Totals
#     # -----------------------------

#     for head in structure:
#         head_total = Decimal("0")

#         # Head level items
#         for item in head["items"]:
#             key = (item["sequence_id"], item["name"])
#             item["total_posted_amt"] = actual_lookup.get(key, Decimal("0"))
#             head_total += item["total_posted_amt"]

#         # Sub head items
#         for sub in head["sub_heads"]:
#             sub_total = Decimal("0")

#             for item in sub["items"]:
#                 key = (item["sequence_id"], item["name"])
#                 item["total_posted_amt"] = actual_lookup.get(key, Decimal("0"))
#                 sub_total += item["total_posted_amt"]

#             sub["total_posted_amt_ytd"] = sub_total
#             head_total += sub_total

#         head["total_posted_amt_ytd"] = head_total

#     # -----------------------------
#     # 4️⃣ Convert Decimal → Float
#     # -----------------------------

#     for head in structure:
#         head["total_posted_amt_ytd"] = to_float(head["total_posted_amt_ytd"])

#         for item in head["items"]:
#             item["total_posted_amt"] = to_float(item["total_posted_amt"])

#         for sub in head["sub_heads"]:
#             sub["total_posted_amt_ytd"] = to_float(sub["total_posted_amt_ytd"])

#             for item in sub["items"]:
#                 item["total_posted_amt"] = to_float(item["total_posted_amt"])

#     return structure






# @frappe.whitelist(allow_guest=True)
# def get_combined_actuals(
#     financial_year=None,
#     month=None,
#     unit=None,
#     cost_center=None,
#     location_code=None,
#     erp_loc_value=None,
#     erp_cost_center_value=None
# ):
#     from decimal import Decimal, ROUND_HALF_UP

#     # -----------------------------
#     # Helpers
#     # -----------------------------

#     def to_decimal(value):
#         try:
#             return Decimal(str(value or 0))
#         except Exception:
#             return Decimal("0")

#     def to_float(value):
#         return float(value.quantize(Decimal("0.01"), ROUND_HALF_UP))

#     # Heads that must NOT have sub_heads
#     FLAT_HEADS = [
#         "OTHER  OPERATING EXPENSES",
#         "Medical Expenses",
#         "COVID SUPPORT"
#     ]

#     # -----------------------------
#     # 1️⃣ Build Structure
#     # -----------------------------

#     expense_rows = frappe.get_all(
#         "Expenses",
#         fields=[
#             "head_of_expense",
#             "sub_head_of_expense",
#             "type_of_expense",
#             "gl_code",
#             "sequence_id"
#         ],
#         order_by="sequence_id asc"
#     )

#     heads = {}

#     for row in expense_rows:
#         head_name = (row.head_of_expense or "").strip()
#         sub_name = (row.sub_head_of_expense or "").strip()
#         expense_name = (row.type_of_expense or "").strip()
#         seq = row.sequence_id or 9999

#         if not head_name or not expense_name:
#             continue

#         head_obj = heads.setdefault(head_name, {
#             "name": head_name,
#             "sequence_id": seq,
#             "ytd": Decimal("0"),
#             "sub_heads": {},
#             "items": [],
#             "total_posted_amt_ytd": Decimal("0")
#         })

#         item_data = {
#             "name": expense_name,
#             "sequence_id": seq,
#             "gl_code": row.gl_code or "",
#             "ytd": Decimal("0"),
#             "total_posted_amt": Decimal("0")
#         }

#         # 🔥 IMPORTANT FIX
#         # If head is one of the FLAT_HEADS → ignore sub_head
#         if head_name in FLAT_HEADS:
#             head_obj["items"].append(item_data)
#         else:
#             if sub_name:
#                 sub_obj = head_obj["sub_heads"].setdefault(sub_name, {
#                     "name": sub_name,
#                     "sequence_id": seq,
#                     "items": [],
#                     "ytd": Decimal("0"),
#                     "total_posted_amt_ytd": Decimal("0")
#                 })
#                 sub_obj["items"].append(item_data)
#             else:
#                 head_obj["items"].append(item_data)

#     # Convert dict → list
#     structure = []
#     for head in sorted(heads.values(), key=lambda x: x["sequence_id"]):
#         head["sub_heads"] = sorted(
#             head["sub_heads"].values(),
#             key=lambda x: x["sequence_id"]
#         )
#         structure.append(head)

#     # -----------------------------
#     # 2️⃣ Actual Lookup
#     # -----------------------------

#     actual_lookup = {}

#     actual_data = sum_of_actuals_by_sequence(
#         month=month,
#         financial_year=financial_year,
#         unit=unit,
#         cost_center=erp_cost_center_value,
#         location_code=erp_loc_value
#     )

#     for row in (actual_data.get("data", []) if actual_data else []):
#         key = (row.get("sequence_id"), row.get("type_of_expense"))
#         actual_lookup[key] = to_decimal(row.get("total_posted_amt"))

#     # -----------------------------
#     # 3️⃣ Inject Totals
#     # -----------------------------

#     for head in structure:
#         head_total = Decimal("0")

#         for item in head["items"]:
#             key = (item["sequence_id"], item["name"])
#             item["total_posted_amt"] = actual_lookup.get(key, Decimal("0"))
#             head_total += item["total_posted_amt"]

#         for sub in head["sub_heads"]:
#             sub_total = Decimal("0")

#             for item in sub["items"]:
#                 key = (item["sequence_id"], item["name"])
#                 item["total_posted_amt"] = actual_lookup.get(key, Decimal("0"))
#                 sub_total += item["total_posted_amt"]

#             sub["total_posted_amt_ytd"] = sub_total
#             head_total += sub_total

#         head["total_posted_amt_ytd"] = head_total

#     # -----------------------------
#     # 4️⃣ Convert Decimal → Float
#     # -----------------------------

#     for head in structure:
#         head["total_posted_amt_ytd"] = to_float(head["total_posted_amt_ytd"])

#         for item in head["items"]:
#             item["total_posted_amt"] = to_float(item["total_posted_amt"])

#         for sub in head["sub_heads"]:
#             sub["total_posted_amt_ytd"] = to_float(sub["total_posted_amt_ytd"])
#             for item in sub["items"]:
#                 item["total_posted_amt"] = to_float(item["total_posted_amt"])

#     return structure


# @frappe.whitelist(allow_guest=True)
# def get_combined_actuals(
#     financial_year=None,
#     month=None,
#     unit=None,
#     cost_center=None,
#     location_code=None,
#     erp_loc_value=None,
#     erp_cost_center_value=None
# ):
#     from decimal import Decimal, ROUND_HALF_UP

#     def to_decimal(value):
#         try:
#             return Decimal(str(value or 0))
#         except Exception:
#             return Decimal("0")

#     def to_float(value):
#         return float(value.quantize(Decimal("0.01"), ROUND_HALF_UP))

#     MOVE_UNDER_OPERATING = [
#         "OTHER  OPERATING EXPENSES",
#         "Medical Expenses",
#         "COVID SUPPORT"
#     ]

#     CAPITAL_HEAD = "CAPITAL  EXPENSES"
#     OPERATING_HEAD = "OPERATING  EXPENSES"

#     # -----------------------------
#     # 1️⃣ Build Structure
#     # -----------------------------

#     expense_rows = frappe.get_all(
#         "Expenses",
#         fields=[
#             "head_of_expense",
#             "sub_head_of_expense",
#             "type_of_expense",
#             "gl_code",
#             "sequence_id"
#         ],
#         order_by="sequence_id asc"
#     )

#     heads = {}

#     for row in expense_rows:
#         head_name = (row.head_of_expense or "").strip()
#         sub_name = (row.sub_head_of_expense or "").strip()
#         expense_name = (row.type_of_expense or "").strip()
#         seq = row.sequence_id or 9999

#         if not head_name or not expense_name:
#             continue

#         head_obj = heads.setdefault(head_name, {
#             "name": head_name,
#             "sequence_id": seq,
#             "sub_heads": {},
#             "items": [],
#             "total_posted_amt_ytd": Decimal("0")
#         })

#         item_data = {
#             "name": expense_name,
#             "sequence_id": seq,
#             "gl_code": row.gl_code or "",
#             "total_posted_amt": Decimal("0")
#         }

#         # 🔥 CAPITAL must be completely flat
#         if head_name == CAPITAL_HEAD:
#             head_obj["items"].append(item_data)

#         # 🔥 These heads flat but will be moved later
#         elif head_name in MOVE_UNDER_OPERATING:
#             head_obj["items"].append(item_data)

#         # Normal hierarchy
#         else:
#             if sub_name:
#                 sub_obj = head_obj["sub_heads"].setdefault(sub_name, {
#                     "name": sub_name,
#                     "sequence_id": seq,
#                     "items": [],
#                     "total_posted_amt_ytd": Decimal("0")
#                 })
#                 sub_obj["items"].append(item_data)
#             else:
#                 head_obj["items"].append(item_data)

#     # Convert dict → list
#     structure = []
#     for head in sorted(heads.values(), key=lambda x: x["sequence_id"]):
#         head["sub_heads"] = sorted(
#             head["sub_heads"].values(),
#             key=lambda x: x["sequence_id"]
#         )
#         structure.append(head)

#     # -----------------------------
#     # 2️⃣ Move Special Heads Under OPERATING
#     # -----------------------------

#     operating_head = next(
#         (h for h in structure if h["name"] == OPERATING_HEAD),
#         None
#     )

#     if operating_head:
#         heads_to_move = [h for h in structure if h["name"] in MOVE_UNDER_OPERATING]

#         for head in heads_to_move:
#             operating_head["sub_heads"].append({
#                 "name": head["name"],
#                 "sequence_id": head["sequence_id"],
#                 "items": head["items"],
#                 "total_posted_amt_ytd": head["total_posted_amt_ytd"]
#             })

#         structure = [h for h in structure if h not in heads_to_move]

#     # -----------------------------
#     # 3️⃣ Actual Lookup
#     # -----------------------------

#     actual_lookup = {}

#     actual_data = sum_of_actuals_by_sequence(
#         month=month,
#         financial_year=financial_year,
#         unit=unit,
#         cost_center=erp_cost_center_value,
#         location_code=erp_loc_value
#     )

#     for row in (actual_data.get("data", []) if actual_data else []):
#         key = (row.get("sequence_id"), row.get("type_of_expense"))
#         actual_lookup[key] = to_decimal(row.get("total_posted_amt"))

#     # -----------------------------
#     # 4️⃣ Inject Totals
#     # -----------------------------

#     for head in structure:
#         head_total = Decimal("0")

#         for item in head["items"]:
#             key = (item["sequence_id"], item["name"])
#             item["total_posted_amt"] = actual_lookup.get(key, Decimal("0"))
#             head_total += item["total_posted_amt"]

#         for sub in head["sub_heads"]:
#             sub_total = Decimal("0")

#             for item in sub["items"]:
#                 key = (item["sequence_id"], item["name"])
#                 item["total_posted_amt"] = actual_lookup.get(key, Decimal("0"))
#                 sub_total += item["total_posted_amt"]

#             sub["total_posted_amt_ytd"] = sub_total
#             head_total += sub_total

#         head["total_posted_amt_ytd"] = head_total

#     # -----------------------------
#     # 5️⃣ Convert to float
#     # -----------------------------

#     for head in structure:
#         head["total_posted_amt_ytd"] = to_float(head["total_posted_amt_ytd"])

#         for item in head["items"]:
#             item["total_posted_amt"] = to_float(item["total_posted_amt"])

#         for sub in head["sub_heads"]:
#             sub["total_posted_amt_ytd"] = to_float(sub["total_posted_amt_ytd"])
#             for item in sub["items"]:
#                 item["total_posted_amt"] = to_float(item["total_posted_amt"])

#     return structure





@frappe.whitelist(allow_guest=True)
def get_combined_actuals(
    financial_year=None,
    month=None,
    unit=None,
    cost_center=None,
    location_code=None,
    erp_loc_value=None,
    erp_cost_center_value=None
):
    from decimal import Decimal, ROUND_HALF_UP

    def to_decimal(value):
        try:
            return Decimal(str(value or 0))
        except Exception:
            return Decimal("0")

    def to_float(value):
        return float(value.quantize(Decimal("0.01"), ROUND_HALF_UP))

    MOVE_UNDER_OPERATING = [
        "OTHER  OPERATING EXPENSES",
        "Medical Expenses",
        "COVID SUPPORT"
    ]

    CAPITAL_HEAD = "CAPITAL  EXPENSES"
    OPERATING_HEAD = "OPERATING  EXPENSES"

    # --------------------------------------------------
    # 1️⃣ Build Base Structure
    # --------------------------------------------------

    expense_rows = frappe.get_all(
        "Expenses",
        fields=[
            "head_of_expense",
            "sub_head_of_expense",
            "type_of_expense",
            "gl_code",
            "sequence_id"
        ],
        order_by="sequence_id asc"
    )

    heads = {}

    for row in expense_rows:
        head_name = (row.head_of_expense or "").strip()
        sub_name = (row.sub_head_of_expense or "").strip()
        expense_name = (row.type_of_expense or "").strip()
        seq = row.sequence_id or 9999

        if not head_name or not expense_name:
            continue

        head_obj = heads.setdefault(head_name, {
            "name": head_name,
            "sequence_id": seq,
            "sub_heads": {},
            "items": [],
            "ytd": Decimal("0"),
            "total_posted_amt_ytd": Decimal("0")
        })

        item_data = {
            "name": expense_name,
            "sequence_id": seq,
            "gl_code": row.gl_code or "",
            "ytd": Decimal("0"),
            "total_posted_amt": Decimal("0")
        }

        if head_name == CAPITAL_HEAD:
            head_obj["items"].append(item_data)

        elif head_name in MOVE_UNDER_OPERATING:
            head_obj["items"].append(item_data)

        else:
            if sub_name:
                sub_obj = head_obj["sub_heads"].setdefault(sub_name, {
                    "name": sub_name,
                    "sequence_id": seq,
                    "items": [],
                    "ytd": Decimal("0"),
                    "total_posted_amt_ytd": Decimal("0")
                })
                sub_obj["items"].append(item_data)
            else:
                head_obj["items"].append(item_data)

    structure = []
    for head in sorted(heads.values(), key=lambda x: x["sequence_id"]):
        head["sub_heads"] = sorted(
            head["sub_heads"].values(),
            key=lambda x: x["sequence_id"]
        )
        structure.append(head)

    # --------------------------------------------------
    # 2️⃣ Move Special Heads Under OPERATING
    # --------------------------------------------------

    operating_head = next(
        (h for h in structure if h["name"] == OPERATING_HEAD),
        None
    )

    if operating_head:
        heads_to_move = [h for h in structure if h["name"] in MOVE_UNDER_OPERATING]

        for head in heads_to_move:
            operating_head["sub_heads"].append({
                "name": head["name"],
                "sequence_id": head["sequence_id"],
                "items": head["items"],
                "ytd": head["ytd"],
                "total_posted_amt_ytd": head["total_posted_amt_ytd"]
            })

        structure = [h for h in structure if h not in heads_to_move]

    # --------------------------------------------------
    # 3️⃣ Budget Lookup
    # --------------------------------------------------

    budget_lookup = {}

    budget_data = get_consolidated_report_actual_ytd(
        financial_year=financial_year,
        units=unit,
        cost_center=cost_center,
        location_code=location_code,
        month=month
    )

    for head in budget_data or []:
        for item in head.get("items", []):
            key = (item.get("sequence_id"), item.get("name"))
            budget_lookup[key] = to_decimal(item.get("ytd"))

        for sub in head.get("sub_heads", []):
            for item in sub.get("items", []):
                key = (item.get("sequence_id"), item.get("name"))
                budget_lookup[key] = to_decimal(item.get("ytd"))

    # --------------------------------------------------
    # 4️⃣ Actual Lookup
    # --------------------------------------------------

    actual_lookup = {}

    actual_data = sum_of_actuals_by_sequence(
        month=month,
        financial_year=financial_year,
        unit=unit,
        cost_center=erp_cost_center_value,
        location_code=erp_loc_value
    )

    for row in (actual_data.get("data", []) if actual_data else []):
        key = (row.get("sequence_id"), row.get("type_of_expense"))
        actual_lookup[key] = to_decimal(row.get("total_posted_amt"))

    # --------------------------------------------------
    # 5️⃣ Inject Budget + Actual Totals
    # --------------------------------------------------

    for head in structure:
        head_budget_total = Decimal("0")
        head_actual_total = Decimal("0")

        for item in head["items"]:
            key = (item["sequence_id"], item["name"])
            item["ytd"] = budget_lookup.get(key, Decimal("0"))
            item["total_posted_amt"] = actual_lookup.get(key, Decimal("0"))

            head_budget_total += item["ytd"]
            head_actual_total += item["total_posted_amt"]

        for sub in head["sub_heads"]:
            sub_budget_total = Decimal("0")
            sub_actual_total = Decimal("0")

            for item in sub["items"]:
                key = (item["sequence_id"], item["name"])
                item["ytd"] = budget_lookup.get(key, Decimal("0"))
                item["total_posted_amt"] = actual_lookup.get(key, Decimal("0"))

                sub_budget_total += item["ytd"]
                sub_actual_total += item["total_posted_amt"]

            sub["ytd"] = sub_budget_total
            sub["total_posted_amt_ytd"] = sub_actual_total

            head_budget_total += sub_budget_total
            head_actual_total += sub_actual_total

        head["ytd"] = head_budget_total
        head["total_posted_amt_ytd"] = head_actual_total

    # --------------------------------------------------
    # 6️⃣ Convert Decimal → Float
    # --------------------------------------------------

    for head in structure:
        head["ytd"] = to_float(head["ytd"])
        head["total_posted_amt_ytd"] = to_float(head["total_posted_amt_ytd"])

        for item in head["items"]:
            item["ytd"] = to_float(item["ytd"])
            item["total_posted_amt"] = to_float(item["total_posted_amt"])

        for sub in head["sub_heads"]:
            sub["ytd"] = to_float(sub.get("ytd", 0))
            sub["total_posted_amt_ytd"] = to_float(sub.get("total_posted_amt_ytd", 0))

            for item in sub["items"]:
                item["ytd"] = to_float(item["ytd"])
                item["total_posted_amt"] = to_float(item["total_posted_amt"])

    return structure





















    
# @frappe.whitelist(allow_guest=True)
# def get_combined_actuals(
#     financial_year=None,
#     month=None,
#     unit=None,
#     cost_center=None,
#     location_code=None,
#     erp_loc_value=None,
#     erp_cost_center_value=None
# ):

#     from decimal import Decimal
#     import re

#     # --------------------------------------------------
#     # Safe float
#     # --------------------------------------------------
#     def safe_float(x):
#         try:
#             return float(Decimal(str(x)))
#         except Exception:
#             return 0.0

#     # --------------------------------------------------
#     # 1️⃣ Build Structure from Expenses Doctype
#     # --------------------------------------------------
#     expense_rows = frappe.get_all(
#         "Expenses",
#         fields=[
#             "head_of_expense",
#             "sub_head_of_expense",
#             "type_of_expense",
#             "gl_code",
#             "sequence_id"
#         ],
#         order_by="sequence_id asc"
#     )

#     heads = {}

#     for row in expense_rows:

#         head = (row.head_of_expense or "").strip()
#         sub = (row.sub_head_of_expense or "").strip()
#         item = (row.type_of_expense or "").strip()
#         gl = row.gl_code
#         seq = row.sequence_id or 9999

#         if not head:
#             continue

#         if head not in heads:
#             heads[head] = {
#                 "name": head,
#                 "sequence_id": seq,
#                 "ytd": 0.0,
#                 "items": [],
#                 "sub_heads": {}
#             }

#         # With Sub Head
#         if sub:
#             if sub not in heads[head]["sub_heads"]:
#                 heads[head]["sub_heads"][sub] = {
#                     "name": sub,
#                     "sequence_id": seq,
#                     "ytd": 0.0,
#                     "items": []
#                 }

#             heads[head]["sub_heads"][sub]["items"].append({
#                 "name": item,
#                 "sequence_id": seq,
#                 "gl_code": gl,
#                 "ytd": 0.0,
#                 "total_posted_amt": 0.0
#             })

#         # Without Sub Head
#         else:
#             heads[head]["items"].append({
#                 "name": item,
#                 "sequence_id": seq,
#                 "gl_code": gl,
#                 "ytd": 0.0,
#                 "total_posted_amt": 0.0
#             })

#     # Convert sub_heads dict → list
#     structure = []
#     for head in sorted(heads.values(), key=lambda x: x["sequence_id"]):

#         head["items"] = sorted(head["items"], key=lambda x: x["sequence_id"])

#         sub_list = []
#         for sub in sorted(head["sub_heads"].values(), key=lambda x: x["sequence_id"]):
#             sub["items"] = sorted(sub["items"], key=lambda x: x["sequence_id"])
#             sub_list.append(sub)

#         head["sub_heads"] = sub_list
#         structure.append(head)

#     # --------------------------------------------------
#     # 2️⃣ Get Budget YTD
#     # --------------------------------------------------
#     budget_structure = get_consolidated_report_actual_ytd(
#         financial_year=financial_year,
#         units=unit,
#         cost_center=cost_center,
#         location_code=location_code,
#         month=month
#     )

#     budget_lookup = {}

#     for head in budget_structure:
#         for item in head.get("items", []):
#             budget_lookup[item["sequence_id"]] = safe_float(item.get("ytd"))

#         for sub in head.get("sub_heads", []):
#             for item in sub.get("items", []):
#                 budget_lookup[item["sequence_id"]] = safe_float(item.get("ytd"))

#     # --------------------------------------------------
#     # 3️⃣ Get Actuals
#     # --------------------------------------------------
#     actual_response = get_filtered_actuals(
#         month=month,
#         financial_year=financial_year,
#         unit=unit,
#         cost_center=erp_cost_center_value,
#         location_code=erp_loc_value
#     )

#     actual_lookup = {}

#     for row in actual_response.get("data", []):
#         seq = row.get("sequence_id")
#         if seq:
#             actual_lookup[seq] = safe_float(row.get("total_posted_amt"))

#     # --------------------------------------------------
#     # 4️⃣ Inject Budget + Actual
#     # --------------------------------------------------
#     for head in structure:

#         head_budget_total = 0.0
#         head_actual_total = 0.0

#         # Direct Items
#         for item in head.get("items", []):
#             seq = item["sequence_id"]

#             item["ytd"] = budget_lookup.get(seq, 0.0)
#             item["total_posted_amt"] = actual_lookup.get(seq, 0.0)

#             head_budget_total += item["ytd"]
#             head_actual_total += item["total_posted_amt"]

#         # Sub Heads
#         for sub in head.get("sub_heads", []):

#             sub_budget_total = 0.0
#             sub_actual_total = 0.0

#             for item in sub.get("items", []):
#                 seq = item["sequence_id"]

#                 item["ytd"] = budget_lookup.get(seq, 0.0)
#                 item["total_posted_amt"] = actual_lookup.get(seq, 0.0)

#                 sub_budget_total += item["ytd"]
#                 sub_actual_total += item["total_posted_amt"]

#             sub["ytd"] = sub_budget_total
#             sub["total_posted_amt_ytd"] = sub_actual_total

#             head_budget_total += sub_budget_total
#             head_actual_total += sub_actual_total

#         head["ytd"] = head_budget_total
#         head["total_posted_amt_ytd"] = head_actual_total

#     return structure

# def get_combined_actuals(financial_year, month, unit=None, cost_center=None, location_code=None):

#     first_response = get_consolidated_report_actual_ytd(
#         financial_year=financial_year,
#         units=unit,
#         cost_center=cost_center,
#         location_code=location_code,
#         month=month
#     )

#     second_response = get_filtered_actuals(
#         month="january",
#         financial_year=financial_year,
#         unit=unit,
#         cost_center="122300",
#         location_code=location_code
#     )

#     def normalize_string(value):
#         if not value:
#             return ""
#         return " ".join(value.strip().lower().split())

#     # Build lookup
#     actuals_lookup = {}

#     for row in second_response.get("data", []):   # ✅ FIX HERE
#         key = normalize_string(row.get("type_of_expense"))

#         actuals_lookup[key] = {
#             "type_of_expense": row.get("type_of_expense"),
#             "actuals_type_of_expenses": row.get("actuals_type_of_expenses"),
#             "total_posted_amt": row.get("total_posted_amt", "0")
#         }

#     # Inject into first response
#     for head in first_response:

#         for item in head.get("items", []):
#             name_key = normalize_string(item.get("name"))

#             if name_key in actuals_lookup:
#                 item.update(actuals_lookup[name_key])
#             else:
#                 item.update({
#                     "type_of_expense": item.get("name"),
#                     "actuals_type_of_expenses": item.get("name"),
#                     "total_posted_amt": "0"
#                 })

#         for sub_head in head.get("sub_heads", []):
#             for item in sub_head.get("items", []):
#                 name_key = normalize_string(item.get("name"))

#                 if name_key in actuals_lookup:
#                     item.update(actuals_lookup[name_key])
#                 else:
#                     item.update({
#                         "type_of_expense": item.get("name"),
#                         "actuals_type_of_expenses": item.get("name"),
#                         "total_posted_amt": "0"
#                     })

#     return {
#         "combined_report": first_response,
#         "filtered_actuals": second_response
#     }

# ! =======================================================  Consolidated Number Card Totals =============================================================================
@frappe.whitelist(allow_guest=True)
def get_number_card_totals(financial_year=None):

    results = []

    settings_docs = frappe.get_all(
        "Overview number cards settings",
        fields=["name", "number_card_title"],
        order_by="creation desc"
    )

    for setting in settings_docs:

        doc = frappe.get_doc(
            "Overview number cards settings",
            setting.name
        )

        units = [d.unit for d in doc.select_units]
        cost_centers = [d.cost_center for d in doc.select_cost_centers]
        locations = [d.location_code for d in doc.select_location_codes]

        label = doc.number_card_title

        if not units or not financial_year:
            results.append({
                "settings_doc": doc.name,
                "label": label,
                "total_budget": 0,
                "error": "unit and financial_year are mandatory"
            })
            continue

        conditions = []
        values = []

        conditions.append(
            f"fb.set_id IN ({', '.join(['%s'] * len(units))})"
        )
        values.extend(units)

        conditions.append("fb.financial_year = %s")
        values.append(financial_year)

        if cost_centers:
            conditions.append(
                f"fb.cost_center IN ({', '.join(['%s'] * len(cost_centers))})"
            )
            values.extend(cost_centers)

        if locations:
            conditions.append(
                f"fb.location_code IN ({', '.join(['%s'] * len(locations))})"
            )
            values.extend(locations)

        query = f"""
            SELECT
                SUM(fba.year) AS total_budget
            FROM
                `tabFinance Budget` fb
            JOIN
                `tabFinance Budget Amounts` fba
                ON fba.parent = fb.name
            WHERE
                fb.docstatus < 2
                AND {' AND '.join(conditions)}
        """

        data = frappe.db.sql(query, values, as_dict=True)
        total = data[0].total_budget or 0

        results.append({
            "settings_doc": doc.name,
            "label": label,
            "total_budget": total
        })

    if financial_year:
        grand_total_data = frappe.db.sql("""
            SELECT
                SUM(fba.year) AS grand_total
            FROM
                `tabFinance Budget Amounts` fba
            JOIN
                `tabFinance Budget` fb
                ON fba.parent = fb.name
            WHERE
                fb.docstatus < 2
                AND fb.financial_year = %s
        """, (financial_year,), as_dict=True)

        grand_total = grand_total_data[0].grand_total or 0
    else:
        grand_total = 0

    return {
        "number_cards": results,
        "grand_total": grand_total
    }
# ! =======================================================  Consolidated report Line item wise Grouping YTD =============================================================================
def _num(x):
    """Safe numeric conversion"""
    if x is None:
        return 0.0
    try:
        return float(Decimal(str(x)))
    except Exception:
        return 0.0


MONTHS = [
    "april", "may", "june",
    "july", "august", "september",
    "october", "november", "december",
    "january", "february", "march"
]


def calc_ytd(row, till_month):
    """Calculate YTD till given month"""
    if not till_month:
        return 0.0

    till_month = till_month.lower().strip()

    if till_month not in MONTHS:
        frappe.throw("Invalid month for YTD")

    idx = MONTHS.index(till_month) + 1
    return sum(_num(getattr(row, m)) for m in MONTHS[:idx])

@frappe.whitelist(allow_guest=True)
def get_consolidated_report_ytd(
    financial_year=None,
    units=None,
    cost_center=None,
    location_code=None,
    month=None
):
    if not financial_year:
        frappe.throw("Financial Year is required")

    if not month:
        frappe.throw("month month is required")
    filters = {"financial_year": financial_year}

    if units:
        filters["set_id"] = ["in", [u.strip() for u in units.split(",")]]

    if cost_center:
        filters["cost_center"] = ["in", [c.strip() for c in cost_center.split(",")]]

    if location_code:
        filters["location_code"] = ["in", [l.strip() for l in location_code.split(",")]]
    parents = frappe.db.get_all(
        "Finance Budget",
        filters=filters,
        pluck="name"
    )

    if not parents:
        return []
    idx = MONTHS.index(month.lower()) + 1
    month_fields = MONTHS[:idx]

    rows = frappe.db.get_all(
        "Finance Budget Amounts",
        filters={"parent": ["in", parents]},
        fields=[
            "type_of_expense",
            "gl_code",
            "head_of_expense",
            "sub_head_of_expense",
            *month_fields
        ]
    )
    heads = {}

    for r in rows:

        head = re.sub(r"\s+", " ", (r.head_of_expense or "").strip()).upper()
        sub = re.sub(r"\s+", " ", (r.sub_head_of_expense or "").strip())
        item = (r.type_of_expense or "Unknown Item").strip()
        gl = (r.gl_code or "").strip()

        ytd_val = calc_ytd(r, month)
        if head not in heads:
            heads[head] = {
                "name": head,
                "ytd": 0.0,
                "items": {},
                "sub_heads": {}
            }

        heads[head]["ytd"] += ytd_val
        if head == "OPERATING EXPENSES" and sub:

            if sub not in heads[head]["sub_heads"]:
                heads[head]["sub_heads"][sub] = {
                    "name": sub,
                    "ytd": 0.0,
                    "items": {}
                }

            heads[head]["sub_heads"][sub]["ytd"] += ytd_val

            key = (item, gl)

            if key not in heads[head]["sub_heads"][sub]["items"]:
                heads[head]["sub_heads"][sub]["items"][key] = {
                    "name": item,
                    "sub_head_of_expense": sub,
                    "gl_code": gl,
                    "ytd": 0.0
                }

            heads[head]["sub_heads"][sub]["items"][key]["ytd"] += ytd_val
        else:

            key = (item, gl)

            if key not in heads[head]["items"]:
                heads[head]["items"][key] = {
                    "name": item,
                    "sub_head_of_expense": sub or None,
                    "gl_code": gl,
                    "ytd": 0.0
                }

            heads[head]["items"][key]["ytd"] += ytd_val
    display_order = [
        "CAPITAL EXPENSES",
        "OPERATING EXPENSES",
        "OTHER OPERATING EXPENSES",
        "MEDICAL EXPENSES"
    ]
    final = []

    for h in display_order:
        if h not in heads:
            continue

        head_data = heads[h]

        head_data["items"] = sorted(
            head_data["items"].values(),
            key=lambda x: x.get("gl_code") or ""
        )

        subheads = []
        for s in head_data["sub_heads"].values():
            s["items"] = sorted(
                s["items"].values(),
                key=lambda x: x.get("gl_code") or ""
            )
            subheads.append(s)

        head_data["sub_heads"] = subheads

        final.append(head_data)

    return final

