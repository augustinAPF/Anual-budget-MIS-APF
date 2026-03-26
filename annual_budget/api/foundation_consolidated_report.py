from annual_budget.api.actual_format import get_accounting_period_from_month, get_previous_financial_year, sum_of_actuals_by_sequence
from annual_budget.api.actuals import get_actuals_from_erp_month_wise, get_grouped_actuals
from annual_budget.api.phase_sheet import  get_consolidated_report_actual_ytd, get_number_card_settings
import frappe
import re
import traceback
from decimal import Decimal

@frappe.whitelist(allow_guest=True)
def get_adjustment_items_by_fy(financial_year):

    try:

        parents = frappe.get_all(
            "Monthly Adjustment",
            filters={"financial_year": financial_year},
            fields=["name", "month"]
        )

        result = []

        for p in parents:

            doc = frappe.get_doc("Monthly Adjustment", p.name)

            for row in doc.adjustment_line_items:

                result.append({
                    "parent": p.name,
                    "financial_year": financial_year,
                    "month": p.month,
                    "unit": row.unit,
                    "cost_center": row.cost_center,
                    "cost_center_description": row.cost_center_description,
                    "location_code": row.location_code,
                    "location_code_description": row.location_code_description,
                    "gl_code": row.gl_code,
                    "type_of_expenses": row.type_of_expenses,
                    "adjustment_method": row.adjustment_method,
                    "adjustment_type": row.adjustment_type,
                    "adjustment_amount": row.adjustment_amount
                })

        return {
            "status": "success",
            "data": result
        }

    except Exception as e:

        frappe.log_error(frappe.get_traceback(), "Adjustment API Error")

        return {
            "status": "error",
            "message": str(e)
        }
    


@frappe.whitelist(allow_guest=True)
def get_grouped_actuals_quarter_and_month_wise_total(fiscal_year, accounting_period):
    try:

        def _num(x):
            try:
                return float(Decimal(str(x or 0)))
            except:
                return 0.0

        def normalize(text):
            return re.sub(r"\s+", " ", str(text or "")).strip().upper()

        def empty_months():
            return {
                "1":0.0,"2":0.0,"3":0.0,
                "4":0.0,"5":0.0,"6":0.0,
                "7":0.0,"8":0.0,"9":0.0,
                "10":0.0,"11":0.0,"12":0.0
            }

        def calculate_quarters(obj):
            m = obj["months"]
            obj["Q1"] = m["4"] + m["5"] + m["6"]
            obj["Q2"] = m["7"] + m["8"] + m["9"]
            obj["Q3"] = m["10"] + m["11"] + m["12"]
            obj["Q4"] = m["1"] + m["2"] + m["3"]

        # ============================================================
        # FETCH EXPENSE MASTER
        # ============================================================

        expense_rows = frappe.get_all(
            "Expenses",
            fields=[
                "name",
                "head_of_expense",
                "sub_head_of_expense",
                "type_of_expense",
                "sequence_id"
            ],
            order_by="sequence_id asc"
        ) or []

        expense_lookup = {e["name"]: e for e in expense_rows}

        # ============================================================
        # FETCH GL MAPPING
        # ============================================================

        gl_rows = frappe.get_all(
            "GL code Mapping",
            fields=["parent","gl_code_map"]
        ) or []

        gl_parent_map = {}

        for row in gl_rows:
            gl = str(row.get("gl_code_map") or "").strip()
            parent = str(row.get("parent") or "").strip()

            if gl and parent:
                gl_parent_map[gl] = parent

        # ============================================================
        # BUILD STRUCTURE
        # ============================================================

        heads = {}

        MAIN_HEADS = [
            "CAPITAL EXPENSES",
            "OPERATING EXPENSES",
            "COVID SUPPORT"
        ]

        for e in expense_rows:

            raw_head = normalize(e.get("head_of_expense"))
            sub_head = normalize(e.get("sub_head_of_expense"))
            item_name = str(e.get("type_of_expense") or "UNKNOWN ITEM").strip()
            seq = int(e.get("sequence_id") or 9999)

            # decide parent head

            if raw_head in MAIN_HEADS:
                parent_head = raw_head
            else:
                parent_head = "OPERATING EXPENSES"
                sub_head = raw_head

            if parent_head not in heads:

                heads[parent_head] = {
                    "name": parent_head,
                    "sequence_id": seq,
                    "Q1":0.0,"Q2":0.0,"Q3":0.0,"Q4":0.0,
                    "months": empty_months(),
                    "items": {},
                    "sub_heads": {}
                }

            # main heads with direct items
            if parent_head in ["CAPITAL EXPENSES","COVID SUPPORT"]:

                heads[parent_head]["items"][item_name] = {
                    "name": item_name,
                    "sequence_id": seq,
                    "gl_code": None,
                    "Q1":0.0,"Q2":0.0,"Q3":0.0,"Q4":0.0,
                    "months": empty_months()
                }

            else:

                if sub_head not in heads[parent_head]["sub_heads"]:

                    heads[parent_head]["sub_heads"][sub_head] = {
                        "name": sub_head,
                        "sequence_id": seq,
                        "Q1":0.0,"Q2":0.0,"Q3":0.0,"Q4":0.0,
                        "months": empty_months(),
                        "items": {}
                    }

                heads[parent_head]["sub_heads"][sub_head]["items"][item_name] = {
                    "name": item_name,
                    "sequence_id": seq,
                    "gl_code": None,
                    "Q1":0.0,"Q2":0.0,"Q3":0.0,"Q4":0.0,
                    "months": empty_months()
                }

        # ============================================================
        # FETCH ERP DATA
        # ============================================================

        response = get_actuals_from_erp_month_wise(
            fiscal_year,
            accounting_period
        )

        if "message" in response:
            response = response["message"]

        erp_data = response.get("data") if response.get("status") == "success" else []

        for row in erp_data:

            try:

                period = row.get("accounting_period")
                account = str(row.get("account") or "").strip()
                amount = _num(row.get("posted_total_amt"))

                if not period or account not in gl_parent_map:
                    continue

                month = str(period)

                parent_expense_name = gl_parent_map.get(account)
                expense = expense_lookup.get(parent_expense_name)

                if not expense:
                    continue

                raw_head = normalize(expense.get("head_of_expense"))
                sub_head = normalize(expense.get("sub_head_of_expense"))
                item_name = str(expense.get("type_of_expense") or "").strip()

                if raw_head in MAIN_HEADS:
                    parent_head = raw_head
                else:
                    parent_head = "OPERATING EXPENSES"
                    sub_head = raw_head

                heads[parent_head]["months"][month] += amount

                if parent_head in ["CAPITAL EXPENSES","COVID SUPPORT"]:

                    if item_name in heads[parent_head]["items"]:
                        item = heads[parent_head]["items"][item_name]
                        item["months"][month] += amount
                        item["gl_code"] = account

                else:

                    if sub_head in heads[parent_head]["sub_heads"]:

                        sub = heads[parent_head]["sub_heads"][sub_head]
                        sub["months"][month] += amount

                        if item_name in sub["items"]:
                            item = sub["items"][item_name]
                            item["months"][month] += amount
                            item["gl_code"] = account

            except:
                continue

        # ============================================================
        # CALCULATE QUARTERS
        # ============================================================

        for head in heads.values():

            calculate_quarters(head)

            for sub in head["sub_heads"].values():

                calculate_quarters(sub)

                for item in sub["items"].values():
                    calculate_quarters(item)

            for item in head["items"].values():
                calculate_quarters(item)

        # ============================================================
        # FINAL SORT
        # ============================================================

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

                sorted_subs.append(sub)

            head["sub_heads"] = sorted(
                sorted_subs,
                key=lambda x: x["sequence_id"]
            )

            final.append(head)

        return {
            "status":"success",
            "fiscal_year":fiscal_year,
            "data":final
        }

    except Exception as e:

        frappe.log_error(frappe.get_traceback(),"Actuals API Error")

        return {
            "status":"error",
            "message":str(e),
            "trace":traceback.format_exc()
        }
    


# @frappe.whitelist(allow_guest=True)
# def format_api(financial_year=None, month=None, set_group_id=None, previous_financial_year=None):

#     def safe_join(arr):
#         return ",".join([str(x).strip() for x in (arr or []) if x])

#     previous_financial_year = get_previous_financial_year(financial_year)
#     settings = get_number_card_settings(set_group_id)

#     # sort settings
#     settings = sorted(settings, key=lambda x: x.get("settings_doc", ""))

#     final_results = []

#     formatted = get_accounting_period_from_month(
#         month,
#         previous_financial_year
#     )
#     accounting_period = formatted.get("accounting_period")
#     fiscal_year = formatted.get("fiscal_year")

#     # ✅ CALL ONLY ONCE
#     grouped_actuals_response = get_grouped_actuals(
#         fiscal_year=fiscal_year,
#         accounting_period=accounting_period
#     )

#     grouped_actuals_data = grouped_actuals_response.get("data", [])

#     for s in settings:

#         # ✅ SAFE JOIN (FIXED)
#         units = safe_join(s.get("units"))
#         cost_centers = safe_join(s.get("cost_centers"))
#         locations = safe_join(s.get("locations"))
#         cost_centers_erp = safe_join(s.get("cost_centers_erp"))
#         locations_erp = safe_join(s.get("locations_erp"))

#         actuals_data = get_combined_actuals(
#             financial_year=financial_year,
#             month=month,
#             unit=units,
#             cost_center=cost_centers,
#             location_code=locations,
#             erp_cost_center_value=cost_centers_erp,
#             erp_loc_value=locations_erp,
#             grouped_actuals_data=grouped_actuals_data
#         )

#         final_results.append({
#             "settings_doc": s.get("settings_doc"),
#             "label": s.get("label"),
#             "units": units,
#             "cost_centers": cost_centers,
#             "locations": locations,
#             "cost_centers_erp": cost_centers_erp,
#             "locations_erp": locations_erp,
#             "actuals": actuals_data,
#         })

#     return final_results

# @frappe.whitelist(allow_guest=True)
# def format_api(financial_year=None, month=None, set_group_id=None, previous_financial_year=None):
#     def safe_join(arr):
#         return ",".join([str(x).strip() for x in (arr or []) if x])

#     previous_financial_year = get_previous_financial_year(financial_year)

#     settings = get_number_card_settings(set_group_id)
#     settings = sorted(settings, key=lambda x: x.get("settings_doc") or "")

#     final_results = []
#     formatted = get_accounting_period_from_month(
#         month,
#         previous_financial_year
#     )
#     accounting_period = formatted.get("accounting_period")
#     fiscal_year = formatted.get("fiscal_year")
#     grouped_actuals_response = get_grouped_actuals(
#         fiscal_year=fiscal_year,
#         accounting_period=accounting_period
#     )

#     grouped_actuals_data = grouped_actuals_response.get("data", [])
#     for s in settings:

#         units = safe_join(s.get("units"))
#         cost_centers = safe_join(s.get("cost_centers"))
#         locations = safe_join(s.get("locations"))
#         cost_centers_erp = safe_join(s.get("cost_centers_erp"))
#         locations_erp = safe_join(s.get("locations_erp"))

#         actuals_data = get_combined_actuals(
#             financial_year=financial_year,
#             month=month,
#             unit=units,
#             cost_center=cost_centers,
#             location_code=locations,
#             erp_cost_center_value=cost_centers_erp,
#             erp_loc_value=locations_erp,
#             grouped_actuals_data=grouped_actuals_data
#         )

#         final_results.append({
#             "settings_doc": s.get("settings_doc"),
#             "label": s.get("label"),
#             "units": units,
#             "cost_centers": cost_centers,
#             "locations": locations,
#             "cost_centers_erp": cost_centers_erp,
#             "locations_erp": locations_erp,
#             "actuals": actuals_data,
#         })

#     return final_results



@frappe.whitelist(allow_guest=True)
def format_api(financial_year=None, month=None, set_group_id=None, previous_financial_year=None):

    def safe_join(arr):
        return ",".join([str(x).strip() for x in (arr or []) if x])

    previous_financial_year = get_previous_financial_year(financial_year)
    settings = get_number_card_settings(set_group_id)

    # sort settings
    settings = sorted(settings, key=lambda x: x.get("settings_doc", ""))

    final_results = []

    formatted = get_accounting_period_from_month(
        month,
        previous_financial_year
    )
    accounting_period = formatted.get("accounting_period")
    fiscal_year = formatted.get("fiscal_year")

    # ✅ CALL ONLY ONCE
    grouped_actuals_response = get_grouped_actuals(
        fiscal_year=fiscal_year,
        accounting_period=accounting_period
    )

    grouped_actuals_data = grouped_actuals_response.get("data", [])

    for s in settings:

        # ✅ SAFE JOIN
        units = safe_join(s.get("units"))
        cost_centers = safe_join(s.get("cost_centers"))
        locations = safe_join(s.get("locations"))
        cost_centers_erp = safe_join(s.get("cost_centers_erp"))
        locations_erp = safe_join(s.get("locations_erp"))

        actuals_data = get_combined_actuals(
            financial_year=financial_year,
            month=month,
            unit=units,
            cost_center=cost_centers,
            location_code=locations,
            erp_cost_center_value=cost_centers_erp,
            erp_loc_value=locations_erp,
            grouped_actuals_data=grouped_actuals_data
        )

        final_results.append({
            "settings_doc": s.get("settings_doc"),
            "set_group_id": s.get("set_group_id"),  # ✅ ADDED
            "label": s.get("label"),
            "units": units,
            "cost_centers": cost_centers,
            "locations": locations,
            "cost_centers_erp": cost_centers_erp,
            "locations_erp": locations_erp,
            "actuals": actuals_data,
        })

    return final_results

@frappe.whitelist(allow_guest=True)
def get_combined_actuals(
    financial_year=None,
    month=None,
    unit=None,
    cost_center=None,
    location_code=None,
    erp_loc_value=None,
    erp_cost_center_value=None,
    grouped_actuals_data=None   # ✅ NEW PARAM
):
    from decimal import Decimal, ROUND_HALF_UP

    def to_decimal(value):
        try:
            return Decimal(str(value or 0))
        except Exception:
            return Decimal("0")

    def to_float(value):
        return float(value.quantize(Decimal("0.01"), ROUND_HALF_UP))

    def to_list(value):
        if value is None:
            return None
        if isinstance(value, str):
            return [v.strip() for v in value.split(",") if v.strip()]
        if isinstance(value, (list, tuple)):
            return [str(v).strip() for v in value if v]
        return None

    MOVE_UNDER_OPERATING = [
        "OTHER  OPERATING EXPENSES",
        "Medical Expenses"
    ]

    CAPITAL_HEAD = "CAPITAL  EXPENSES"
    OPERATING_HEAD = "OPERATING  EXPENSES"
    COVID_HEAD = "COVID SUPPORT"

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

        if head_name in MOVE_UNDER_OPERATING:
            sub_name = head_name
            head_name = OPERATING_HEAD

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

        if head_name in [CAPITAL_HEAD, COVID_HEAD]:
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
    # 2️⃣ Budget Lookup
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
    # 3️⃣ Actual Lookup (FILTERED DATA)
    # --------------------------------------------------

    units = set(to_list(unit) or [])
    ccs = set(to_list(erp_cost_center_value) or [])
    locs = set(to_list(erp_loc_value) or [])

    filtered_data = grouped_actuals_data or []

    if units:
        filtered_data = [d for d in filtered_data if d.get("business_unit") in units]

    if ccs:
        filtered_data = [d for d in filtered_data if d.get("deptid") in ccs]

    if locs:
        filtered_data = [d for d in filtered_data if d.get("operating_unit") in locs]

    actual_lookup = {}

    for row in filtered_data:
        key = (
            row.get("sequence_id"),
            row.get("type_of_expense")
        )
        actual_lookup[key] = actual_lookup.get(key, Decimal("0")) + to_decimal(
            row.get("total_posted_amt")
        )

    # --------------------------------------------------
    # 4️⃣ Inject Budget + Actual Totals
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
    # 5️⃣ Convert Decimal → Float
    # --------------------------------------------------

    for head in structure:

        head["ytd"] = to_float(head["ytd"])
        head["total_posted_amt_ytd"] = to_float(head["total_posted_amt_ytd"])

        for item in head["items"]:
            item["ytd"] = to_float(item["ytd"])
            item["total_posted_amt"] = to_float(item["total_posted_amt"])

        for sub in head["sub_heads"]:
            sub["ytd"] = to_float(sub.get("ytd", Decimal("0")))
            sub["total_posted_amt_ytd"] = to_float(sub.get("total_posted_amt_ytd", Decimal("0")))

            for item in sub["items"]:
                item["ytd"] = to_float(item["ytd"])
                item["total_posted_amt"] = to_float(item["total_posted_amt"])

    return structure


# @frappe.whitelist(allow_guest=True)
# def add_expense_totals(financial_year=None, month=None, set_group_id=None):

#     current_data = format_api(
#         financial_year=financial_year,
#         month=month,
#         set_group_id=set_group_id
#     )

#     start_year = int(financial_year.split("-")[0])
#     prev_start = start_year - 1
#     prev_end = str(prev_start + 1)[-2:]
#     prev_fy = f"{prev_start}-{prev_end}"

#     prev_data = format_api(
#         financial_year=prev_fy,
#         month=month,
#         set_group_id=set_group_id
#     )

#     result = []

#     for i, record in enumerate(current_data):

#         prev_record = prev_data[i] if i < len(prev_data) else {}

#         # -------- CURRENT YEAR TOTALS --------
#         def get_totals(actuals):
#             capital_budget = 0.0
#             capital_actual = 0.0
#             operating_budget = 0.0
#             operating_actual = 0.0

#             for head in actuals:
#                 name = head.get("name", "").strip()

#                 if name == "CAPITAL  EXPENSES":
#                     capital_budget += head.get("ytd", 0.0)
#                     capital_actual += head.get("total_posted_amt_ytd", 0.0)

#                 elif name == "OPERATING  EXPENSES":
#                     operating_budget += head.get("ytd", 0.0)
#                     operating_actual += head.get("total_posted_amt_ytd", 0.0)

#             return {
#                 "capital": {
#                     "budget": capital_budget,
#                     "actual": capital_actual
#                 },
#                 "operating": {
#                     "budget": operating_budget,
#                     "actual": operating_actual
#                 },
#                 "grand": {
#                     "budget": capital_budget + operating_budget,
#                     "actual": capital_actual + operating_actual
#                 }
#             }

#         current_totals = get_totals(record.get("actuals", []))
#         prev_totals = get_totals(prev_record.get("actuals", []))

#         result.append({
#             "settings_doc": record.get("settings_doc"),
#             "label": record.get("label"),
#             "units": record.get("units"),
#             "cost_centers": record.get("cost_centers"),
#             "locations": record.get("locations"),
#             "cost_centers_erp": record.get("cost_centers_erp"),
#             "locations_erp": record.get("locations_erp"),

#             "overall_foundation_numbers": [
#                 {
#                     "title": f"OVERALL FOUNDATION NUMBERS - {financial_year} BUDGET VS. {prev_fy} EST",
#                     "capital_expenses": current_totals["capital"],
#                     "operating_expenses": current_totals["operating"],
#                     "grand_total": current_totals["grand"]
#                 },

#                 {
#                     "title": f"OVERALL FOUNDATION NUMBERS - {prev_fy} BUDGET VS. {prev_fy} EST",
#                     "capital_expenses": prev_totals["capital"],
#                     "operating_expenses": prev_totals["operating"],
#                     "grand_total": prev_totals["grand"]
#                 }
#             ]
#         })

#     return result

@frappe.whitelist(allow_guest=True)
def add_expense_totals(financial_year=None, month=None, set_group_id=None):

    # -------- GET CURRENT DATA --------
    current_data = format_api(
        financial_year=financial_year,
        month=month,
        set_group_id=""
    )

    # -------- PREVIOUS FY --------
    start_year = int(financial_year.split("-")[0])
    prev_start = start_year - 1
    prev_end = str(prev_start + 1)[-2:]
    prev_fy = f"{prev_start}-{prev_end}"

    # -------- GET PREVIOUS DATA --------
    prev_data = format_api(
        financial_year=prev_fy,
        month=month,
        set_group_id=""
    )

    # -------- MAP PREVIOUS DATA --------
    prev_map = {
        str(r.get("settings_doc")): r
        for r in prev_data
    }

    # -------- TOTAL FUNCTION --------
    def get_totals(actuals):
        capital_budget = 0.0
        capital_actual = 0.0
        operating_budget = 0.0
        operating_actual = 0.0

        for head in actuals:
            name = head.get("name", "").strip().upper().replace("  ", " ")

            if "CAPITAL" in name:
                capital_budget += head.get("ytd", 0.0)
                capital_actual += head.get("total_posted_amt_ytd", 0.0)

            elif "OPERATING" in name:
                operating_budget += head.get("ytd", 0.0)
                operating_actual += head.get("total_posted_amt_ytd", 0.0)

        return {
            "capital": {
                "budget": capital_budget,
                "actual": capital_actual
            },
            "operating": {
                "budget": operating_budget,
                "actual": operating_actual
            },
            "grand": {
                "budget": capital_budget + operating_budget,
                "actual": capital_actual + operating_actual
            }
        }

    # -------- FINAL RESULT --------
    result = []

    for record in current_data:

        settings_doc = str(record.get("settings_doc"))
        prev_record = prev_map.get(settings_doc, {})

        # -------- CHECK: set_group_id CONTAINS "4" --------
        raw_group = record.get("set_group_id")

        group_ids = [
            g.strip() for g in str(raw_group or "").split(",") if g.strip()
        ]

        # ❌ SKIP if "4" not present
        if "4" not in group_ids:
            continue

        # ✅ CALCULATE TOTALS
        current_totals = get_totals(record.get("actuals", []))
        prev_totals = get_totals(prev_record.get("actuals", []))

        overall_numbers = [
            {
                "title": f"OVERALL FOUNDATION NUMBERS - {financial_year} BUDGET VS. {prev_fy} EST",
                "capital_expenses": current_totals["capital"],
                "operating_expenses": current_totals["operating"],
                "grand_total": current_totals["grand"]
            },
            {
                "title": f"OVERALL FOUNDATION NUMBERS - {prev_fy} BUDGET VS. {prev_fy} EST",
                "capital_expenses": prev_totals["capital"],
                "operating_expenses": prev_totals["operating"],
                "grand_total": prev_totals["grand"]
            }
        ]

        result.append({
            "settings_doc": record.get("settings_doc"),
            "label": record.get("label"),
            "units": record.get("units"),
            "cost_centers": record.get("cost_centers"),
            "locations": record.get("locations"),
            "cost_centers_erp": record.get("cost_centers_erp"),
            "locations_erp": record.get("locations_erp"),
            "overall_foundation_numbers": overall_numbers
        })

    return {"message": result}