import frappe
import re
from decimal import Decimal
from annual_budget.api.actual_format import get_filtered_actuals

# ! =======================================================  Consolidated report Line item wise Grouping  ================================================================================
@frappe.whitelist(allow_guest=True)
def get_consolidated_report(financial_year=None, units=None, cost_center=None, location_code=None):
    if not financial_year:
        frappe.throw("Financial Year is required")

    def _num(x):
        if x is None:
            return 0.0
        try:
            return float(Decimal(str(x)))
        except Exception:
            return 0.0
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

        if e.head_of_expense:
            key = str(e.head_of_expense).strip().upper()
            sequence_map[key] = seq

        if e.sub_head_of_expense:
            key = str(e.sub_head_of_expense).strip().upper()
            sequence_map[key] = seq

        if e.type_of_expense:
            key = str(e.type_of_expense).strip().upper()
            sequence_map[key] = seq

    filters = {"financial_year": financial_year}

    if units:
        units = [u.strip() for u in units.split(",") if u.strip()]
        filters["set_id"] = ["in", units]

    if cost_center:
        cost_center = [c.strip() for c in cost_center.split(",") if c.strip()]
        filters["cost_center"] = ["in", cost_center]

    if location_code:
        location_code = [l.strip() for l in location_code.split(",") if l.strip()]
        filters["location_code"] = ["in", location_code]

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

    TOP_LEVEL_HEADS = ["CAPITAL EXPENSES", "OPERATING EXPENSES"]
    heads = {}

    for r in rows:

        raw_head = re.sub(r"\s+", " ", str(r.head_of_expense or "")).strip().upper()
        sub = re.sub(r"\s+", " ", str(r.sub_head_of_expense or "")).strip().upper()

        item = str(r.type_of_expense or "UNKNOWN ITEM").strip()

        gl = str(r.gl_code or "").strip()

        q1 = [_num(r.april), _num(r.may), _num(r.june)]
        q2 = [_num(r.july), _num(r.august), _num(r.september)]
        q3 = [_num(r.october), _num(r.november), _num(r.december)]
        q4 = [_num(r.january), _num(r.february), _num(r.march)]

        if raw_head not in TOP_LEVEL_HEADS:
            parent_head = "OPERATING EXPENSES"
            sub = raw_head
        else:
            parent_head = raw_head

        if parent_head not in heads:
            heads[parent_head] = {
                "name": parent_head,
                "sequence_id": sequence_map.get(parent_head, 9999),
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

        if parent_head == "CAPITAL EXPENSES":

            if item not in heads[parent_head]["items"]:
                heads[parent_head]["items"][item] = {
                    "name": item,
                    "sequence_id": sequence_map.get(item.upper(), 9999),
                    "gl_code": gl,
                    "q1": [0, 0, 0],
                    "q2": [0, 0, 0],
                    "q3": [0, 0, 0],
                    "q4": [0, 0, 0]
                }

            for i in range(3):
                heads[parent_head]["items"][item]["q1"][i] += q1[i]
                heads[parent_head]["items"][item]["q2"][i] += q2[i]
                heads[parent_head]["items"][item]["q3"][i] += q3[i]
                heads[parent_head]["items"][item]["q4"][i] += q4[i]
        else:

            if sub:

                if sub not in heads[parent_head]["sub_heads"]:
                    heads[parent_head]["sub_heads"][sub] = {
                        "name": sub,
                        "sequence_id": sequence_map.get(sub, 9999),
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

                if item not in heads[parent_head]["sub_heads"][sub]["items"]:
                    heads[parent_head]["sub_heads"][sub]["items"][item] = {
                        "name": item,
                        "sequence_id": sequence_map.get(item.upper(), 9999),
                        "gl_code": gl,
                        "q1": [0, 0, 0],
                        "q2": [0, 0, 0],
                        "q3": [0, 0, 0],
                        "q4": [0, 0, 0]
                    }

                for i in range(3):
                    heads[parent_head]["sub_heads"][sub]["items"][item]["q1"][i] += q1[i]
                    heads[parent_head]["sub_heads"][sub]["items"][item]["q2"][i] += q2[i]
                    heads[parent_head]["sub_heads"][sub]["items"][item]["q3"][i] += q3[i]
                    heads[parent_head]["sub_heads"][sub]["items"][item]["q4"][i] += q4[i]

    final = []

    for head in sorted(heads.values(), key=lambda x: x["sequence_id"]):

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
    # Load Sequence Mapping (Same as Original)
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

        if e.head_of_expense:
            sequence_map[str(e.head_of_expense).strip().upper()] = seq

        if e.sub_head_of_expense:
            sequence_map[str(e.sub_head_of_expense).strip().upper()] = seq

        if e.type_of_expense:
            sequence_map[str(e.type_of_expense).strip().upper()] = seq

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

    # ---------------------------------------------------
    # Fetch ALL Month Fields (Important Fix)
    # ---------------------------------------------------
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
    # Grouping Logic (Same as Your Quarterly Version)
    # ---------------------------------------------------
    TOP_LEVEL_HEADS = ["CAPITAL EXPENSES", "OPERATING EXPENSES"]
    heads = {}

    for r in rows:

        raw_head = re.sub(r"\s+", " ", str(r.get("head_of_expense") or "")).strip().upper()
        sub = re.sub(r"\s+", " ", str(r.get("sub_head_of_expense") or "")).strip().upper()
        item = str(r.get("type_of_expense") or "UNKNOWN ITEM").strip()
        gl = str(r.get("gl_code") or "").strip()

        # ---------------------------------------------------
        # Correct YTD Calculation (April → Selected Month)
        # ---------------------------------------------------
        ytd_total = 0.0
        for m in MONTHS[:end_index + 1]:
            ytd_total += _num(r.get(m))

        # ---------------------------------------------------
        # Determine Parent Head
        # ---------------------------------------------------
        if raw_head not in TOP_LEVEL_HEADS:
            parent_head = "OPERATING EXPENSES"
            sub = raw_head
        else:
            parent_head = raw_head

        if parent_head not in heads:
            heads[parent_head] = {
                "name": parent_head,
                "sequence_id": sequence_map.get(parent_head, 9999),
                "ytd": 0.0,
                "items": {},
                "sub_heads": {}
            }

        heads[parent_head]["ytd"] += ytd_total

        # ---------------------------------------------------
        # CAPITAL EXPENSES
        # ---------------------------------------------------
        if parent_head == "CAPITAL EXPENSES":

            if item not in heads[parent_head]["items"]:
                heads[parent_head]["items"][item] = {
                    "name": item,
                    "sequence_id": sequence_map.get(item.upper(), 9999),
                    "gl_code": gl,
                    "ytd": 0.0
                }

            heads[parent_head]["items"][item]["ytd"] += ytd_total

        # ---------------------------------------------------
        # OPERATING EXPENSES
        # ---------------------------------------------------
        else:

            if sub:

                if sub not in heads[parent_head]["sub_heads"]:
                    heads[parent_head]["sub_heads"][sub] = {
                        "name": sub,
                        "sequence_id": sequence_map.get(sub, 9999),
                        "ytd": 0.0,
                        "items": {}
                    }

                heads[parent_head]["sub_heads"][sub]["ytd"] += ytd_total

                if item not in heads[parent_head]["sub_heads"][sub]["items"]:
                    heads[parent_head]["sub_heads"][sub]["items"][item] = {
                        "name": item,
                        "sequence_id": sequence_map.get(item.upper(), 9999),
                        "gl_code": gl,
                        "ytd": 0.0
                    }

                heads[parent_head]["sub_heads"][sub]["items"][item]["ytd"] += ytd_total

    # ---------------------------------------------------
    # Final Sorting (Same As Original)
    # ---------------------------------------------------
    final = []

    for head in sorted(heads.values(), key=lambda x: x["sequence_id"]):

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

@frappe.whitelist(allow_guest=True)
def get_combined_actuals(financial_year, month, unit=None, cost_center=None, location_code=None,erp_loc_value=None,erp_cost_center=None):

    first_response = get_consolidated_report_actual_ytd(
        financial_year=financial_year,
        units=unit,
        cost_center=cost_center,
        location_code=location_code,
        month=month
    )

    second_response = get_filtered_actuals(
        month=month,
        financial_year=financial_year,
        unit=unit,
        cost_center=erp_cost_center,
        location_code=erp_loc_value
    )

    def normalize_string(value):
        if not value:
            return ""
        return " ".join(value.strip().lower().split())

    actuals_lookup = {}

    for row in second_response.get("data", []):
        key = normalize_string(row.get("type_of_expense"))

        actuals_lookup[key] = {
            "type_of_expense": row.get("type_of_expense"),
            "actuals_type_of_expenses": row.get("actuals_type_of_expenses"),
            "total_posted_amt": row.get("total_posted_amt", "0")
        }

    for head in first_response:

        for item in head.get("items", []):
            name_key = normalize_string(item.get("name"))

            if name_key in actuals_lookup:
                item.update(actuals_lookup[name_key])
            else:
                item.update({
                    "type_of_expense": item.get("name"),
                    "actuals_type_of_expenses": item.get("name"),
                    "total_posted_amt": "0"
                })

        for sub_head in head.get("sub_heads", []):
            for item in sub_head.get("items", []):
                name_key = normalize_string(item.get("name"))

                if name_key in actuals_lookup:
                    item.update(actuals_lookup[name_key])
                else:
                    item.update({
                        "type_of_expense": item.get("name"),
                        "actuals_type_of_expenses": item.get("name"),
                        "total_posted_amt": "0"
                    })

    return first_response

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

