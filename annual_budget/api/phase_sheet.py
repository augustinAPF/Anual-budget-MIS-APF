#current code 

# import frappe
# import re
# from decimal import Decimal

# def _num(x):
#     if x is None:
#         return 0.0
#     try:
#         return float(Decimal(str(x)))
#     except:
#         return 0.0


# @frappe.whitelist(allow_guest=True)
# def get_consolidated_report(financial_year=None, units=None):
#     if not financial_year:
#         frappe.throw("Financial Year is required")

#     filters = {"financial_year": financial_year}

#     if units:
#         if isinstance(units, str):
#             units = [u.strip() for u in units.split(",") if u.strip()]
#         filters["set_id"] = ["in", units]

#     # Fetch parent budgets
#     parents = frappe.get_all("Finance Budget", filters=filters, fields=["name"])
#     if not parents:
#         return []

#     parent_names = [p.name for p in parents]

#     # Fetch all child rows
#     rows = frappe.get_all(
#         "Finance Budget Amounts",
#         filters={"parent": ["in", parent_names]},
#         fields=[
#             "type_of_expense", "gl_code",
#             "head_of_expense", "sub_head_of_expense",
#             "april", "may", "june",
#             "july", "august", "september",
#             "october", "november", "december",
#             "january", "february", "march"
#         ]
#     )

#     heads = {}

#     for r in rows:
#         head = re.sub(r"\s+", " ", (r.head_of_expense or "").strip())
#         sub = re.sub(r"\s+", " ", (r.sub_head_of_expense or "").strip())
#         item = (r.type_of_expense or "Unknown Item").strip()
#         gl = (r.gl_code or "").strip()

#         q1 = [_num(r.april), _num(r.may), _num(r.june)]
#         q2 = [_num(r.july), _num(r.august), _num(r.september)]
#         q3 = [_num(r.october), _num(r.november), _num(r.december)]
#         q4 = [_num(r.january), _num(r.february), _num(r.march)]

#         if head not in heads:
#             heads[head] = {
#                 "name": head,
#                 "q1": [0, 0, 0], "q2": [0, 0, 0], "q3": [0, 0, 0], "q4": [0, 0, 0],
#                 "items": {},
#                 "sub_heads": {}
#             }

#         # Add to head totals
#         for i in range(3):
#             heads[head]["q1"][i] += q1[i]
#             heads[head]["q2"][i] += q2[i]
#             heads[head]["q3"][i] += q3[i]
#             heads[head]["q4"][i] += q4[i]

#         #  Only OPERATING EXPENSES are grouped by sub head
#         if head == "OPERATING EXPENSES" and sub:
#             if sub not in heads[head]["sub_heads"]:
#                 heads[head]["sub_heads"][sub] = {
#                     "name": sub,
#                     "q1": [0, 0, 0], "q2": [0, 0, 0], "q3": [0, 0, 0], "q4": [0, 0, 0],
#                     "items": {}
#                 }

#             # Add to sub-head totals
#             for i in range(3):
#                 heads[head]["sub_heads"][sub]["q1"][i] += q1[i]
#                 heads[head]["sub_heads"][sub]["q2"][i] += q2[i]
#                 heads[head]["sub_heads"][sub]["q3"][i] += q3[i]
#                 heads[head]["sub_heads"][sub]["q4"][i] += q4[i]

#             key = (item, gl)
#             if key not in heads[head]["sub_heads"][sub]["items"]:
#                 heads[head]["sub_heads"][sub]["items"][key] = {
#                     "name": item,
#                     "sub_head_of_expense": sub,    
#                     "gl_code": gl,
#                     "q1": [0, 0, 0], "q2": [0, 0, 0], "q3": [0, 0, 0], "q4": [0, 0, 0]
#                 }

#             for i in range(3):
#                 heads[head]["sub_heads"][sub]["items"][key]["q1"][i] += q1[i]
#                 heads[head]["sub_heads"][sub]["items"][key]["q2"][i] += q2[i]
#                 heads[head]["sub_heads"][sub]["items"][key]["q3"][i] += q3[i]
#                 heads[head]["sub_heads"][sub]["items"][key]["q4"][i] += q4[i]

#         else:
#             # All other heads → Direct items (still include sub_head_of_expense)
#             key = (item, gl)
#             if key not in heads[head]["items"]:
#                 heads[head]["items"][key] = {
#                     "name": item,
#                     "sub_head_of_expense": sub or None,  
#                     "gl_code": gl,
#                     "q1": [0, 0, 0], "q2": [0, 0, 0], "q3": [0, 0, 0], "q4": [0, 0, 0]
#                 }

#             for i in range(3):
#                 heads[head]["items"][key]["q1"][i] += q1[i]
#                 heads[head]["items"][key]["q2"][i] += q2[i]
#                 heads[head]["items"][key]["q3"][i] += q3[i]
#                 heads[head]["items"][key]["q4"][i] += q4[i]

#     # Display order
#     display_order = [
#         "CAPITAL EXPENSES",
#         "OPERATING EXPENSES",
#         "OTHER OPERATING EXPENSES",
#         "Medical Expenses"
#     ]

#     final = []
#     for h in display_order:
#         if h in heads:
#             heads[h]["items"] = list(heads[h]["items"].values())
#             heads[h]["sub_heads"] = [
#                 {**s, "items": list(s["items"].values())}
#                 for s in heads[h]["sub_heads"].values()
#             ]
#             final.append(heads[h])

#     return final




# import frappe
# import re
# from decimal import Decimal


# def _num(x):
#     if x is None:
#         return 0.0
#     try:
#         return float(Decimal(str(x)))
#     except:
#         return 0.0


# @frappe.whitelist(allow_guest=True)
# def get_consolidated_report(financial_year=None, units=None, cost_center=None):
#     if not financial_year:
#         frappe.throw("Financial Year is required")

#     # -------------------------------
#     # Parent Filters
#     # -------------------------------
#     filters = {"financial_year": financial_year}

#     # Units filter (existing)
#     if units:
#         if isinstance(units, str):
#             units = [u.strip() for u in units.split(",") if u.strip()]
#         filters["set_id"] = ["in", units]

#     # Cost Center filter (new, optional)
#     if cost_center:
#         if isinstance(cost_center, str):
#             cost_center = [c.strip() for c in cost_center.split(",") if c.strip()]
#         filters["cost_center"] = ["in", cost_center]

#     # -------------------------------
#     # Fetch parent budgets
#     # -------------------------------
#     parents = frappe.get_all(
#         "Finance Budget",
#         filters=filters,
#         fields=["name"]
#     )
#     if not parents:
#         return []

#     parent_names = [p.name for p in parents]

#     # -------------------------------
#     # Fetch all child rows
#     # -------------------------------
#     rows = frappe.get_all(
#         "Finance Budget Amounts",
#         filters={"parent": ["in", parent_names]},
#         fields=[
#             "type_of_expense", "gl_code",
#             "head_of_expense", "sub_head_of_expense",
#             "april", "may", "june",
#             "july", "august", "september",
#             "october", "november", "december",
#             "january", "february", "march"
#         ]
#     )

#     heads = {}

#     # -------------------------------
#     # Data Processing
#     # -------------------------------
#     for r in rows:
#         head = re.sub(r"\s+", " ", (r.head_of_expense or "").strip())
#         sub = re.sub(r"\s+", " ", (r.sub_head_of_expense or "").strip())
#         item = (r.type_of_expense or "Unknown Item").strip()
#         gl = (r.gl_code or "").strip()

#         q1 = [_num(r.april), _num(r.may), _num(r.june)]
#         q2 = [_num(r.july), _num(r.august), _num(r.september)]
#         q3 = [_num(r.october), _num(r.november), _num(r.december)]
#         q4 = [_num(r.january), _num(r.february), _num(r.march)]

#         if head not in heads:
#             heads[head] = {
#                 "name": head,
#                 "q1": [0, 0, 0],
#                 "q2": [0, 0, 0],
#                 "q3": [0, 0, 0],
#                 "q4": [0, 0, 0],
#                 "items": {},
#                 "sub_heads": {}
#             }

#         # Add to head totals
#         for i in range(3):
#             heads[head]["q1"][i] += q1[i]
#             heads[head]["q2"][i] += q2[i]
#             heads[head]["q3"][i] += q3[i]
#             heads[head]["q4"][i] += q4[i]

#         # -------------------------------
#         # OPERATING EXPENSES → Group by Sub Head
#         # -------------------------------
#         if head == "OPERATING EXPENSES" and sub:
#             if sub not in heads[head]["sub_heads"]:
#                 heads[head]["sub_heads"][sub] = {
#                     "name": sub,
#                     "q1": [0, 0, 0],
#                     "q2": [0, 0, 0],
#                     "q3": [0, 0, 0],
#                     "q4": [0, 0, 0],
#                     "items": {}
#                 }

#             # Add to sub-head totals
#             for i in range(3):
#                 heads[head]["sub_heads"][sub]["q1"][i] += q1[i]
#                 heads[head]["sub_heads"][sub]["q2"][i] += q2[i]
#                 heads[head]["sub_heads"][sub]["q3"][i] += q3[i]
#                 heads[head]["sub_heads"][sub]["q4"][i] += q4[i]

#             key = (item, gl)
#             if key not in heads[head]["sub_heads"][sub]["items"]:
#                 heads[head]["sub_heads"][sub]["items"][key] = {
#                     "name": item,
#                     "sub_head_of_expense": sub,
#                     "gl_code": gl,
#                     "q1": [0, 0, 0],
#                     "q2": [0, 0, 0],
#                     "q3": [0, 0, 0],
#                     "q4": [0, 0, 0]
#                 }

#             for i in range(3):
#                 heads[head]["sub_heads"][sub]["items"][key]["q1"][i] += q1[i]
#                 heads[head]["sub_heads"][sub]["items"][key]["q2"][i] += q2[i]
#                 heads[head]["sub_heads"][sub]["items"][key]["q3"][i] += q3[i]
#                 heads[head]["sub_heads"][sub]["items"][key]["q4"][i] += q4[i]

#         # -------------------------------
#         # All Other Heads → Direct Items
#         # -------------------------------
#         else:
#             key = (item, gl)
#             if key not in heads[head]["items"]:
#                 heads[head]["items"][key] = {
#                     "name": item,
#                     "sub_head_of_expense": sub or None,
#                     "gl_code": gl,
#                     "q1": [0, 0, 0],
#                     "q2": [0, 0, 0],
#                     "q3": [0, 0, 0],
#                     "q4": [0, 0, 0]
#                 }

#             for i in range(3):
#                 heads[head]["items"][key]["q1"][i] += q1[i]
#                 heads[head]["items"][key]["q2"][i] += q2[i]
#                 heads[head]["items"][key]["q3"][i] += q3[i]
#                 heads[head]["items"][key]["q4"][i] += q4[i]

#     # -------------------------------
#     # Display Order
#     # -------------------------------
#     display_order = [
#         "CAPITAL EXPENSES",
#         "OPERATING EXPENSES",
#         "OTHER OPERATING EXPENSES",
#         "Medical Expenses"
#     ]

#     final = []
#     for h in display_order:
#         if h in heads:
#             heads[h]["items"] = list(heads[h]["items"].values())
#             heads[h]["sub_heads"] = [
#                 {**s, "items": list(s["items"].values())}
#                 for s in heads[h]["sub_heads"].values()
#             ]
#             final.append(heads[h])

#     return final


# import frappe
# import re
# from decimal import Decimal


# def _num(x):
#     if x is None:
#         return 0.0
#     try:
#         return float(Decimal(str(x)))
#     except:
#         return 0.0


# @frappe.whitelist(allow_guest=True)
# def get_consolidated_report(financial_year=None, units=None, cost_center=None,location_code=None):
#     if not financial_year:
#         frappe.throw("Financial Year is required")

#     # -------------------------------
#     # Parent Filters
#     # -------------------------------
#     filters = {"financial_year": financial_year}

#     # Units filter
#     if units:
#         if isinstance(units, str):
#             units = [u.strip() for u in units.split(",") if u.strip()]
#         filters["set_id"] = ["in", units]

#     # Cost Center filter
#     if cost_center:
#         if isinstance(cost_center, str):
#             cost_center = [c.strip() for c in cost_center.split(",") if c.strip()]
#         filters["cost_center"] = ["in", cost_center]

#      # Location code filter
#     if location_code:
#         if isinstance(location_code, str):
#             location_code = [c.strip() for c in location_code.split(",") if c.strip()]
#         filters["location_code"] = ["in", location_code]

#     # -------------------------------
#     # Fetch parent budgets
#     # -------------------------------
#     parents = frappe.get_all(
#         "Finance Budget",
#         filters=filters,
#         fields=["name"]
#     )
#     if not parents:
#         return []

#     parent_names = [p.name for p in parents]

#     # -------------------------------
#     # Fetch all child rows
#     # -------------------------------
#     rows = frappe.get_all(
#         "Finance Budget Amounts",
#         filters={"parent": ["in", parent_names]},
#         fields=[
#             "type_of_expense", "gl_code",
#             "head_of_expense", "sub_head_of_expense",
#             "april", "may", "june",
#             "july", "august", "september",
#             "october", "november", "december",
#             "january", "february", "march"
#         ]
#     )

#     heads = {}

#     # -------------------------------
#     # Data Processing
#     # -------------------------------
#     for r in rows:
#         head = re.sub(r"\s+", " ", (r.head_of_expense or "").strip())
#         sub = re.sub(r"\s+", " ", (r.sub_head_of_expense or "").strip())
#         item = (r.type_of_expense or "Unknown Item").strip()
#         gl = (r.gl_code or "").strip()

#         q1 = [_num(r.april), _num(r.may), _num(r.june)]
#         q2 = [_num(r.july), _num(r.august), _num(r.september)]
#         q3 = [_num(r.october), _num(r.november), _num(r.december)]
#         q4 = [_num(r.january), _num(r.february), _num(r.march)]

#         if head not in heads:
#             heads[head] = {
#                 "name": head,
#                 "q1": [0, 0, 0],
#                 "q2": [0, 0, 0],
#                 "q3": [0, 0, 0],
#                 "q4": [0, 0, 0],
#                 "items": {},
#                 "sub_heads": {}
#             }

#         # Add to head totals
#         for i in range(3):
#             heads[head]["q1"][i] += q1[i]
#             heads[head]["q2"][i] += q2[i]
#             heads[head]["q3"][i] += q3[i]
#             heads[head]["q4"][i] += q4[i]

#         # -------------------------------
#         # OPERATING EXPENSES → Group by Sub Head
#         # -------------------------------
#         if head == "OPERATING EXPENSES" and sub:
#             if sub not in heads[head]["sub_heads"]:
#                 heads[head]["sub_heads"][sub] = {
#                     "name": sub,
#                     "q1": [0, 0, 0],
#                     "q2": [0, 0, 0],
#                     "q3": [0, 0, 0],
#                     "q4": [0, 0, 0],
#                     "items": {}
#                 }

#             # Add to sub-head totals
#             for i in range(3):
#                 heads[head]["sub_heads"][sub]["q1"][i] += q1[i]
#                 heads[head]["sub_heads"][sub]["q2"][i] += q2[i]
#                 heads[head]["sub_heads"][sub]["q3"][i] += q3[i]
#                 heads[head]["sub_heads"][sub]["q4"][i] += q4[i]

#             key = (item, gl)
#             if key not in heads[head]["sub_heads"][sub]["items"]:
#                 heads[head]["sub_heads"][sub]["items"][key] = {
#                     "name": item,
#                     "sub_head_of_expense": sub,
#                     "gl_code": gl,
#                     "q1": [0, 0, 0],
#                     "q2": [0, 0, 0],
#                     "q3": [0, 0, 0],
#                     "q4": [0, 0, 0]
#                 }

#             for i in range(3):
#                 heads[head]["sub_heads"][sub]["items"][key]["q1"][i] += q1[i]
#                 heads[head]["sub_heads"][sub]["items"][key]["q2"][i] += q2[i]
#                 heads[head]["sub_heads"][sub]["items"][key]["q3"][i] += q3[i]
#                 heads[head]["sub_heads"][sub]["items"][key]["q4"][i] += q4[i]

#         # -------------------------------
#         # All Other Heads → Direct Items
#         # -------------------------------
#         else:
#             key = (item, gl)
#             if key not in heads[head]["items"]:
#                 heads[head]["items"][key] = {
#                     "name": item,
#                     "sub_head_of_expense": sub or None,
#                     "gl_code": gl,
#                     "q1": [0, 0, 0],
#                     "q2": [0, 0, 0],
#                     "q3": [0, 0, 0],
#                     "q4": [0, 0, 0]
#                 }

#             for i in range(3):
#                 heads[head]["items"][key]["q1"][i] += q1[i]
#                 heads[head]["items"][key]["q2"][i] += q2[i]
#                 heads[head]["items"][key]["q3"][i] += q3[i]
#                 heads[head]["items"][key]["q4"][i] += q4[i]

#     # -------------------------------
#     # Display Order
#     # -------------------------------
#     display_order = [
#         "CAPITAL EXPENSES",
#         "OPERATING EXPENSES",
#         "OTHER OPERATING EXPENSES",
#         "Medical Expenses"
#     ]

#     # -------------------------------
#     # Prepare Final Response
#     # (Sorted by GL Code Ascending)
#     # -------------------------------
#     final = []
#     for h in display_order:
#         if h in heads:
#             # Sort head-level items
#             head_items = list(heads[h]["items"].values())
#             head_items.sort(key=lambda x: x.get("gl_code") or "")

#             # Sort sub-heads and their items
#             sub_heads = []
#             for s in heads[h]["sub_heads"].values():
#                 sub_items = list(s["items"].values())
#                 sub_items.sort(key=lambda x: x.get("gl_code") or "")
#                 s["items"] = sub_items
#                 sub_heads.append(s)

#             heads[h]["items"] = head_items
#             heads[h]["sub_heads"] = sub_heads
#             final.append(heads[h])

#     return final





# import frappe
# import re
# from decimal import Decimal

# def _num(x):
#     if x is None:
#         return 0.0
#     try:
#         return float(Decimal(str(x)))
#     except:
#         return 0.0


# @frappe.whitelist(allow_guest=True)
# def get_consolidated_report(financial_year=None, units=None, cost_center=None, location_code=None):
#     if not financial_year:
#         frappe.throw("Financial Year is required")

#     # -------------------------------
#     # Parent Filters
#     # -------------------------------
#     filters = {"financial_year": financial_year}

#     # Units filter
#     if units:
#         if isinstance(units, str):
#             units = [u.strip() for u in units.split(",") if u.strip()]
#         filters["set_id"] = ["in", units]

#     # Cost Center filter
#     if cost_center:
#         if isinstance(cost_center, str):
#             cost_center = [c.strip() for c in cost_center.split(",") if c.strip()]
#         filters["cost_center"] = ["in", cost_center]

#     # Location Code filter  (FIXED INDENTATION)
#     if location_code:
#         if isinstance(location_code, str):
#             location_code = [l.strip() for l in location_code.split(",") if l.strip()]
#         filters["location_code"] = ["in", location_code]

#     # -------------------------------
#     # Fetch parent budgets
#     # -------------------------------
#     parents = frappe.get_all(
#         "Finance Budget",
#         filters=filters,
#         fields=["name"]
#     )
#     if not parents:
#         return []

#     parent_names = [p.name for p in parents]

#     # -------------------------------
#     # Fetch all child rows
#     # -------------------------------
#     rows = frappe.get_all(
#         "Finance Budget Amounts",
#         filters={"parent": ["in", parent_names]},
#         fields=[
#             "type_of_expense", "gl_code",
#             "head_of_expense", "sub_head_of_expense",
#             "april", "may", "june",
#             "july", "august", "september",
#             "october", "november", "december",
#             "january", "february", "march"
#         ]
#     )

#     heads = {}

#     # -------------------------------
#     # Data Processing
#     # -------------------------------
#     for r in rows:
#         head = re.sub(r"\s+", " ", (r.head_of_expense or "").strip())
#         sub = re.sub(r"\s+", " ", (r.sub_head_of_expense or "").strip())
#         item = (r.type_of_expense or "Unknown Item").strip()
#         gl = (r.gl_code or "").strip()

#         q1 = [_num(r.april), _num(r.may), _num(r.june)]
#         q2 = [_num(r.july), _num(r.august), _num(r.september)]
#         q3 = [_num(r.october), _num(r.november), _num(r.december)]
#         q4 = [_num(r.january), _num(r.february), _num(r.march)]

#         if head not in heads:
#             heads[head] = {
#                 "name": head,
#                 "q1": [0, 0, 0],
#                 "q2": [0, 0, 0],
#                 "q3": [0, 0, 0],
#                 "q4": [0, 0, 0],
#                 "items": {},
#                 "sub_heads": {}
#             }

#         # Add to head totals
#         for i in range(3):
#             heads[head]["q1"][i] += q1[i]
#             heads[head]["q2"][i] += q2[i]
#             heads[head]["q3"][i] += q3[i]
#             heads[head]["q4"][i] += q4[i]

#         # -------------------------------
#         # OPERATING EXPENSES → Group by Sub Head
#         # -------------------------------
#         if head == "OPERATING EXPENSES" and sub:
#             if sub not in heads[head]["sub_heads"]:
#                 heads[head]["sub_heads"][sub] = {
#                     "name": sub,
#                     "q1": [0, 0, 0],
#                     "q2": [0, 0, 0],
#                     "q3": [0, 0, 0],
#                     "q4": [0, 0, 0],
#                     "items": {}
#                 }

#             for i in range(3):
#                 heads[head]["sub_heads"][sub]["q1"][i] += q1[i]
#                 heads[head]["sub_heads"][sub]["q2"][i] += q2[i]
#                 heads[head]["sub_heads"][sub]["q3"][i] += q3[i]
#                 heads[head]["sub_heads"][sub]["q4"][i] += q4[i]

#             key = (item, gl)
#             if key not in heads[head]["sub_heads"][sub]["items"]:
#                 heads[head]["sub_heads"][sub]["items"][key] = {
#                     "name": item,
#                     "sub_head_of_expense": sub,
#                     "gl_code": gl,
#                     "q1": [0, 0, 0],
#                     "q2": [0, 0, 0],
#                     "q3": [0, 0, 0],
#                     "q4": [0, 0, 0]
#                 }

#             for i in range(3):
#                 heads[head]["sub_heads"][sub]["items"][key]["q1"][i] += q1[i]
#                 heads[head]["sub_heads"][sub]["items"][key]["q2"][i] += q2[i]
#                 heads[head]["sub_heads"][sub]["items"][key]["q3"][i] += q3[i]
#                 heads[head]["sub_heads"][sub]["items"][key]["q4"][i] += q4[i]

#         # -------------------------------
#         # All Other Heads → Direct Items
#         # -------------------------------
#         else:
#             key = (item, gl)
#             if key not in heads[head]["items"]:
#                 heads[head]["items"][key] = {
#                     "name": item,
#                     "sub_head_of_expense": sub or None,
#                     "gl_code": gl,
#                     "q1": [0, 0, 0],
#                     "q2": [0, 0, 0],
#                     "q3": [0, 0, 0],
#                     "q4": [0, 0, 0]
#                 }

#             for i in range(3):
#                 heads[head]["items"][key]["q1"][i] += q1[i]
#                 heads[head]["items"][key]["q2"][i] += q2[i]
#                 heads[head]["items"][key]["q3"][i] += q3[i]
#                 heads[head]["items"][key]["q4"][i] += q4[i]

#     # -------------------------------
#     # Display Order
#     # -------------------------------
#     display_order = [
#         "CAPITAL EXPENSES",
#         "OPERATING EXPENSES",
#         "OTHER OPERATING EXPENSES",
#         "Medical Expenses"
#     ]

#     # -------------------------------
#     # Prepare Final Response (Sorted by GL Code)
#     # -------------------------------
#     final = []
#     for h in display_order:
#         if h in heads:
#             head_items = sorted(
#                 heads[h]["items"].values(),
#                 key=lambda x: x.get("gl_code") or ""
#             )

#             sub_heads = []
#             for s in heads[h]["sub_heads"].values():
#                 s["items"] = sorted(
#                     s["items"].values(),
#                     key=lambda x: x.get("gl_code") or ""
#                 )
#                 sub_heads.append(s)

#             heads[h]["items"] = head_items
#             heads[h]["sub_heads"] = sub_heads
#             final.append(heads[h])

#     return final










import frappe
import re
from decimal import Decimal


@frappe.whitelist(allow_guest=True)
def get_consolidated_report(
    financial_year=None,
    units=None,
    cost_center=None,
    location_code=None
):
    # -------------------------------
    # Validation
    # -------------------------------
    if not financial_year:
        frappe.throw("Financial Year is required")

    # -------------------------------
    # Inline numeric helper
    # -------------------------------
    def _num(x):
        if x is None:
            return 0.0
        try:
            return float(Decimal(str(x)))
        except Exception:
            return 0.0

    # -------------------------------
    # Parent Filters
    # -------------------------------
    filters = {"financial_year": financial_year}

    if units:
        if isinstance(units, str):
            units = [u.strip() for u in units.split(",") if u.strip()]
        filters["set_id"] = ["in", units]

    if cost_center:
        if isinstance(cost_center, str):
            cost_center = [c.strip() for c in cost_center.split(",") if c.strip()]
        filters["cost_center"] = ["in", cost_center]

    if location_code:
        if isinstance(location_code, str):
            location_code = [l.strip() for l in location_code.split(",") if l.strip()]
        filters["location_code"] = ["in", location_code]

    # -------------------------------
    # Fetch parent budgets
    # -------------------------------
    parents = frappe.get_all(
        "Finance Budget",
        filters=filters,
        fields=["name"]
    )

    if not parents:
        return []

    parent_names = [p.name for p in parents]

    # -------------------------------
    # Fetch child rows
    # -------------------------------
    rows = frappe.get_all(
        "Finance Budget Amounts",
        filters={"parent": ["in", parent_names]},
        fields=[
            "type_of_expense", "gl_code",
            "head_of_expense", "sub_head_of_expense",
            "april", "may", "june",
            "july", "august", "september",
            "october", "november", "december",
            "january", "february", "march"
        ]
    )

    # -------------------------------
    # Aggregation
    # -------------------------------
    TOP_LEVEL_HEADS = ["CAPITAL EXPENSES", "OPERATING EXPENSES"]
    heads = {}

    for r in rows:
        raw_head = re.sub(r"\s+", " ", (r.head_of_expense or "").strip()).upper()
        sub = re.sub(r"\s+", " ", (r.sub_head_of_expense or "").strip())
        item = (r.type_of_expense or "Unknown Item").strip()
        gl = (r.gl_code or "").strip()

        q1 = [_num(r.april), _num(r.may), _num(r.june)]
        q2 = [_num(r.july), _num(r.august), _num(r.september)]
        q3 = [_num(r.october), _num(r.november), _num(r.december)]
        q4 = [_num(r.january), _num(r.february), _num(r.march)]

        # Decide parent head
        if raw_head not in TOP_LEVEL_HEADS:
            parent_head = "OPERATING EXPENSES"
            sub = raw_head
        else:
            parent_head = raw_head

        # Init parent head
        if parent_head not in heads:
            heads[parent_head] = {
                "name": parent_head,
                "q1": [0, 0, 0],
                "q2": [0, 0, 0],
                "q3": [0, 0, 0],
                "q4": [0, 0, 0],
                "items": {},
                "sub_heads": {}
            }

        for i in range(3):
            heads[parent_head]["q1"][i] += q1[i]
            heads[parent_head]["q2"][i] += q2[i]
            heads[parent_head]["q3"][i] += q3[i]
            heads[parent_head]["q4"][i] += q4[i]

        # =================================================
        # CAPITAL EXPENSES → DIRECT ITEMS ONLY
        # =================================================
        if parent_head == "CAPITAL EXPENSES":
            key = (item, gl)
            if key not in heads[parent_head]["items"]:
                heads[parent_head]["items"][key] = {
                    "name": item,
                    "gl_code": gl,
                    "q1": [0, 0, 0],
                    "q2": [0, 0, 0],
                    "q3": [0, 0, 0],
                    "q4": [0, 0, 0]
                }

            for i in range(3):
                heads[parent_head]["items"][key]["q1"][i] += q1[i]
                heads[parent_head]["items"][key]["q2"][i] += q2[i]
                heads[parent_head]["items"][key]["q3"][i] += q3[i]
                heads[parent_head]["items"][key]["q4"][i] += q4[i]

        # =================================================
        # OPERATING EXPENSES → SUBHEADS + ITEMS
        # =================================================
        else:
            if sub:
                if sub not in heads[parent_head]["sub_heads"]:
                    heads[parent_head]["sub_heads"][sub] = {
                        "name": sub,
                        "q1": [0, 0, 0],
                        "q2": [0, 0, 0],
                        "q3": [0, 0, 0],
                        "q4": [0, 0, 0],
                        "items": {}
                    }

                for i in range(3):
                    heads[parent_head]["sub_heads"][sub]["q1"][i] += q1[i]
                    heads[parent_head]["sub_heads"][sub]["q2"][i] += q2[i]
                    heads[parent_head]["sub_heads"][sub]["q3"][i] += q3[i]
                    heads[parent_head]["sub_heads"][sub]["q4"][i] += q4[i]

                key = (item, gl)
                if key not in heads[parent_head]["sub_heads"][sub]["items"]:
                    heads[parent_head]["sub_heads"][sub]["items"][key] = {
                        "name": item,
                        "gl_code": gl,
                        "q1": [0, 0, 0],
                        "q2": [0, 0, 0],
                        "q3": [0, 0, 0],
                        "q4": [0, 0, 0]
                    }

                for i in range(3):
                    heads[parent_head]["sub_heads"][sub]["items"][key]["q1"][i] += q1[i]
                    heads[parent_head]["sub_heads"][sub]["items"][key]["q2"][i] += q2[i]
                    heads[parent_head]["sub_heads"][sub]["items"][key]["q3"][i] += q3[i]
                    heads[parent_head]["sub_heads"][sub]["items"][key]["q4"][i] += q4[i]

    # -------------------------------
    # FINAL OUTPUT — GL ORDER EVERYWHERE
    # -------------------------------
    final = []

    for h in ["CAPITAL EXPENSES", "OPERATING EXPENSES"]:
        if h not in heads:
            continue

        # Capital items → GL order
        heads[h]["items"] = sorted(
            heads[h]["items"].values(),
            key=lambda x: x.get("gl_code") or ""
        )

        sub_heads = []

        # Sub-heads ordered by MIN GL of their items
        for s in sorted(
            heads[h]["sub_heads"].values(),
            key=lambda sh: min(
                [i["gl_code"] for i in sh["items"].values() if i.get("gl_code")] or [""]
            )
        ):
            # Items inside sub-head → GL order
            s["items"] = sorted(
                s["items"].values(),
                key=lambda x: x.get("gl_code") or ""
            )
            sub_heads.append(s)

        heads[h]["sub_heads"] = sub_heads
        final.append(heads[h])

    return final



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


# -------------------------------------------------
# MAIN API
# -------------------------------------------------

@frappe.whitelist(allow_guest=True)
def get_consolidated_report_ytd(
    financial_year=None,
    units=None,
    cost_center=None,
    location_code=None,
    month=None
):
    """
    Returns consolidated YTD report:

    HEAD
      ├─ Items (normal heads)
      └─ Subheads → Items (OPERATING EXPENSES only)

    Only YTD totals (no quarters)
    """

    # -----------------------------
    # Validate
    # -----------------------------
    if not financial_year:
        frappe.throw("Financial Year is required")

    if not month:
        frappe.throw("month month is required")

    # -----------------------------
    # Parent filters
    # -----------------------------
    filters = {"financial_year": financial_year}

    if units:
        filters["set_id"] = ["in", [u.strip() for u in units.split(",")]]

    if cost_center:
        filters["cost_center"] = ["in", [c.strip() for c in cost_center.split(",")]]

    if location_code:
        filters["location_code"] = ["in", [l.strip() for l in location_code.split(",")]]

    # -----------------------------
    # Fetch parents (fast pluck)
    # -----------------------------
    parents = frappe.db.get_all(
        "Finance Budget",
        filters=filters,
        pluck="name"
    )

    if not parents:
        return []

    # -----------------------------
    # Fetch only needed months
    # -----------------------------
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

    # -----------------------------
    # Aggregation
    # -----------------------------
    heads = {}

    for r in rows:

        head = re.sub(r"\s+", " ", (r.head_of_expense or "").strip()).upper()
        sub = re.sub(r"\s+", " ", (r.sub_head_of_expense or "").strip())
        item = (r.type_of_expense or "Unknown Item").strip()
        gl = (r.gl_code or "").strip()

        ytd_val = calc_ytd(r, month)

        # -------------------------
        # Init head
        # -------------------------
        if head not in heads:
            heads[head] = {
                "name": head,
                "ytd": 0.0,
                "items": {},
                "sub_heads": {}
            }

        heads[head]["ytd"] += ytd_val

        # =================================================
        # OPERATING EXPENSES → group by subhead
        # =================================================
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

        # =================================================
        # Other heads → direct items
        # =================================================
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

    # -----------------------------
    # Display order
    # -----------------------------
    display_order = [
        "CAPITAL EXPENSES",
        "OPERATING EXPENSES",
        "OTHER OPERATING EXPENSES",
        "MEDICAL EXPENSES"
    ]

    # -----------------------------
    # Prepare final output
    # -----------------------------
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





# import frappe
# from frappe import _

# @frappe.whitelist(allow_guest=True)
# def get_total_budget_sum_from_child(
#     unit=None,
#     financial_year=None,
#     cost_center=None,
#     location_code=None,
#     label=None
# ):
#     """
#     Returns sum of `year` field from Finance Budget Amounts (child table)
#     filtered by Finance Budget (parent)
#     """

#     if not unit or not financial_year:
#         frappe.throw(_("Unit and Financial Year are required"))

#     conditions = []
#     values = []

#     # Mandatory filters
#     conditions.append("fb.set_id = %s")
#     values.append(unit)

#     conditions.append("fb.financial_year = %s")
#     values.append(financial_year)

#     # Optional filters
#     if cost_center:
#         conditions.append("fb.cost_center = %s")
#         values.append(cost_center)

#     if location_code:
#         conditions.append("fb.location_code = %s")
#         values.append(location_code)

#     where_clause = " AND ".join(conditions)

#     query = f"""
#         SELECT
#             SUM(fba.year) AS total_budget
#         FROM
#             `tabFinance Budget` fb
#         INNER JOIN
#             `tabFinance Budget Amounts` fba
#             ON fba.parent = fb.name
#         WHERE
#             fb.docstatus < 2
#             AND {where_clause}
#     """

#     result = frappe.db.sql(query, values, as_dict=True)

#     total = result[0].total_budget or 0

#     return {
#         "label": label or f"{financial_year}",
#         "total_budget": total
#     }


import frappe
import json
from frappe import _


# @frappe.whitelist(allow_guest=True)
# def get_total_budget_sum(filters_payload):
#     # -------- Parse Payload --------
#     if isinstance(filters_payload, str):
#         try:
#             filters_payload = json.loads(filters_payload)
#         except Exception:
#             frappe.throw(_("Invalid JSON payload"))

#     if not isinstance(filters_payload, list):
#         frappe.throw(_("Payload must be a list"))

#     def to_list(val):
#         if not val:
#             return []
#         if isinstance(val, list):
#             return val
#         if isinstance(val, str):
#             return [v.strip() for v in val.split(",") if v.strip()]
#         return []

#     results = []

#     # -------- Process Each Block --------
#     for row in filters_payload:
#         units = to_list(row.get("unit"))
#         years = to_list(row.get("financial_year"))
#         cost_centers = to_list(row.get("cost_center"))
#         locations = to_list(row.get("location_code"))
#         label = row.get("label")

#         if not units or not years:
#             results.append({
#                 "label": label or "Invalid Input",
#                 "total_budget": 0,
#                 "error": "unit and financial_year are mandatory"
#             })
#             continue

#         conditions = []
#         values = []

#         conditions.append(f"fb.set_id IN ({', '.join(['%s'] * len(units))})")
#         values.extend(units)

#         conditions.append(f"fb.financial_year IN ({', '.join(['%s'] * len(years))})")
#         values.extend(years)

#         if cost_centers:
#             conditions.append(
#                 f"fb.cost_center IN ({', '.join(['%s'] * len(cost_centers))})"
#             )
#             values.extend(cost_centers)

#         if locations:
#             conditions.append(
#                 f"fb.location_code IN ({', '.join(['%s'] * len(locations))})"
#             )
#             values.extend(locations)

#         query = f"""
#             SELECT
#                 SUM(fba.year) AS total_budget
#             FROM
#                 `tabFinance Budget` fb
#             JOIN
#                 `tabFinance Budget Amounts` fba
#                 ON fba.parent = fb.name
#             WHERE
#                 fb.docstatus < 2
#                 AND {' AND '.join(conditions)}
#         """

#         data = frappe.db.sql(query, values, as_dict=True)
#         total = data[0].total_budget or 0

#         results.append({
#             "label": label,
#             "total_budget": total
#         })

#     return results


# import frappe


# @frappe.whitelist(allow_guest=True)
# def get_number_card_totals(financial_year):

#     results = []
#     grand_total = 0

#     # Get all Overview number cards settings records
#     settings_docs = frappe.get_all(
#         "Overview number cards settings",
#         fields=["name", "number_card_title"],
#         order_by="creation desc"
#     )

#     for setting in settings_docs:

#         doc = frappe.get_doc(
#             "Overview number cards settings",
#             setting.name
#         )

#         # Extract child table values
#         units = [d.unit for d in doc.select_units]
#         cost_centers = [d.cost_center for d in doc.select_cost_centers]
#         locations = [d.location_code for d in doc.select_location_codes]

#         label = doc.number_card_title

#         if not units or not financial_year:
#             results.append({
#                 "label": label,
#                 "total_budget": 0,
#                 "error": "unit and financial_year are mandatory"
#             })
#             continue

#         conditions = []
#         values = []

#         # Same filtering logic as your old method

#         conditions.append(
#             f"fb.set_id IN ({', '.join(['%s'] * len(units))})"
#         )
#         values.extend(units)

#         conditions.append("fb.financial_year = %s")
#         values.append(financial_year)

#         if cost_centers:
#             conditions.append(
#                 f"fb.cost_center IN ({', '.join(['%s'] * len(cost_centers))})"
#             )
#             values.extend(cost_centers)

#         if locations:
#             conditions.append(
#                 f"fb.location_code IN ({', '.join(['%s'] * len(locations))})"
#             )
#             values.extend(locations)

#         query = f"""
#             SELECT
#                 SUM(fba.year) AS total_budget
#             FROM
#                 `tabFinance Budget` fb
#             JOIN
#                 `tabFinance Budget Amounts` fba
#                 ON fba.parent = fb.name
#             WHERE
#                 fb.docstatus < 2
#                 AND {' AND '.join(conditions)}
#         """

#         data = frappe.db.sql(query, values, as_dict=True)
#         total = data[0].total_budget or 0

#         grand_total += total

#         results.append({
#             "settings_doc": doc.name,
#             "label": label,
#             "total_budget": total
#         })

#     return {
#         "number_cards": results,
#         "grand_total": grand_total
#     }


import frappe


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

    # ✅ GRAND TOTAL FILTERED BY FINANCIAL YEAR
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
