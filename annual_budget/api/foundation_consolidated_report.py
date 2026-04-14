from annual_budget.api.actual_format import get_accounting_period_from_month, get_previous_financial_year, sum_of_actuals_by_sequence
from annual_budget.api.actuals import get_actuals_from_erp_month_wise, get_grouped_actuals
from annual_budget.api.phase_sheet import  get_consolidated_report_actual_ytd, get_number_card_settings
import frappe
import re
import traceback
from decimal import Decimal


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
# def get_grouped_actuals_quarter_and_month_wise_total(fiscal_year, accounting_period):
#     try:
#         import re
#         import traceback
#         from decimal import Decimal

#         def _num(x):
#             try:
#                 return float(Decimal(str(x or 0)))
#             except:
#                 return 0.0

#         def normalize(text):
#             return re.sub(r"\s+", " ", str(text or "")).strip().upper()

#         # ✅ FIX: GL normalization
#         def normalize_gl(gl):
#             return str(gl or "").strip().replace(".0", "")

#         def empty_months():
#             return {str(i): 0.0 for i in range(1, 13)}

#         def calculate_quarters(obj):
#             m = obj["months"]
#             obj["Q1"] = m["4"] + m["5"] + m["6"]
#             obj["Q2"] = m["7"] + m["8"] + m["9"]
#             obj["Q3"] = m["10"] + m["11"] + m["12"]
#             obj["Q4"] = m["1"] + m["2"] + m["3"]

#         # ============================================================
#         # FETCH EXPENSE MASTER
#         # ============================================================

#         expense_rows = frappe.get_all(
#             "Expenses",
#             fields=[
#                 "name",
#                 "head_of_expense",
#                 "sub_head_of_expense",
#                 "type_of_expense",
#                 "sequence_id"
#             ],
#             order_by="sequence_id asc"
#         ) or []

#         expense_lookup = {e["name"]: e for e in expense_rows}

#         # ============================================================
#         # FETCH GL MAPPING
#         # ============================================================

#         gl_rows = frappe.get_all(
#             "GL code Mapping",
#             fields=["parent", "gl_code_map"]
#         ) or []

#         gl_parent_map = {}

#         for row in gl_rows:
#             gl = normalize_gl(row.get("gl_code_map"))
#             parent = str(row.get("parent") or "").strip()

#             if gl and parent:
#                 gl_parent_map[gl] = parent

#         # ============================================================
#         # BUILD STRUCTURE
#         # ============================================================

#         heads = {}

#         MAIN_HEADS = [
#             "CAPITAL EXPENSES",
#             "OPERATING EXPENSES",
#             "COVID SUPPORT"
#         ]

#         for e in expense_rows:

#             raw_head = normalize(e.get("head_of_expense"))
#             sub_head = normalize(e.get("sub_head_of_expense"))
#             item_name = str(e.get("type_of_expense") or "UNKNOWN ITEM").strip()
#             seq = int(e.get("sequence_id") or 9999)

#             if raw_head in MAIN_HEADS:
#                 parent_head = raw_head
#             else:
#                 parent_head = "OPERATING EXPENSES"
#                 sub_head = raw_head

#             if parent_head not in heads:
#                 heads[parent_head] = {
#                     "name": parent_head,
#                     "sequence_id": seq,
#                     "Q1": 0.0, "Q2": 0.0, "Q3": 0.0, "Q4": 0.0,
#                     "months": empty_months(),
#                     "items": {},
#                     "sub_heads": {}
#                 }

#             if parent_head in ["CAPITAL EXPENSES", "COVID SUPPORT"]:

#                 heads[parent_head]["items"][item_name] = {
#                     "name": item_name,
#                     "sequence_id": seq,
#                     "gl_code": None,
#                     "Q1": 0.0, "Q2": 0.0, "Q3": 0.0, "Q4": 0.0,
#                     "months": empty_months()
#                 }

#             else:

#                 if sub_head not in heads[parent_head]["sub_heads"]:
#                     heads[parent_head]["sub_heads"][sub_head] = {
#                         "name": sub_head,
#                         "sequence_id": seq,
#                         "Q1": 0.0, "Q2": 0.0, "Q3": 0.0, "Q4": 0.0,
#                         "months": empty_months(),
#                         "items": {}
#                     }

#                 heads[parent_head]["sub_heads"][sub_head]["items"][item_name] = {
#                     "name": item_name,
#                     "sequence_id": seq,
#                     "gl_code": None,
#                     "Q1": 0.0, "Q2": 0.0, "Q3": 0.0, "Q4": 0.0,
#                     "months": empty_months()
#                 }

#         # ============================================================
#         # FETCH ERP DATA
#         # ============================================================

#         response = get_actuals_from_erp_month_wise(fiscal_year, accounting_period)

#         if "message" in response:
#             response = response["message"]

#         erp_data = response.get("data") if response.get("status") == "success" else []

#         # ============================================================
#         # LOAD DATA → ITEM LEVEL ONLY + SKIP PERIOD 0
#         # ============================================================

#         for row in erp_data:
#             try:
#                 account = normalize_gl(row.get("account"))
#                 amount = _num(row.get("posted_total_amt"))

#                 try:
#                     period = int(row.get("accounting_period") or 0)
#                 except:
#                     continue

#                 # ✅ skip invalid period
#                 if period <= 0:
#                     continue

#                 # ✅ debug missing GL mapping
#                 if account not in gl_parent_map:
#                     frappe.log_error(
#                         f"Missing GL Mapping for account: {account}",
#                         "GL Mapping Missing"
#                     )
#                     continue

#                 month = str(period)

#                 parent_expense_name = gl_parent_map.get(account)
#                 expense = expense_lookup.get(parent_expense_name)

#                 # ✅ debug missing expense
#                 if not expense:
#                     frappe.log_error(
#                         f"Expense not found for mapping parent: {parent_expense_name}",
#                         "Expense Missing"
#                     )
#                     continue

#                 raw_head = normalize(expense.get("head_of_expense"))
#                 sub_head = normalize(expense.get("sub_head_of_expense"))
#                 item_name = str(expense.get("type_of_expense") or "").strip()

#                 if raw_head in MAIN_HEADS:
#                     parent_head = raw_head
#                 else:
#                     parent_head = "OPERATING EXPENSES"
#                     sub_head = raw_head

#                 # ONLY item level update
#                 if parent_head in ["CAPITAL EXPENSES", "COVID SUPPORT"]:
#                     if item_name in heads[parent_head]["items"]:
#                         item = heads[parent_head]["items"][item_name]
#                         item["months"][month] += amount
#                         item["gl_code"] = account

#                 else:
#                     if sub_head in heads[parent_head]["sub_heads"]:
#                         sub = heads[parent_head]["sub_heads"][sub_head]

#                         if item_name in sub["items"]:
#                             item = sub["items"][item_name]
#                             item["months"][month] += amount
#                             item["gl_code"] = account

#             except:
#                 continue

#         # ============================================================
#         # ROLL-UP: ITEM → SUB → HEAD
#         # ============================================================

#         for head in heads.values():

#             head["months"] = empty_months()

#             for sub in head["sub_heads"].values():

#                 sub["months"] = empty_months()

#                 for item in sub["items"].values():
#                     for m in item["months"]:
#                         sub["months"][m] += item["months"][m]

#                 for m in sub["months"]:
#                     head["months"][m] += sub["months"][m]

#             for item in head["items"].values():
#                 for m in item["months"]:
#                     head["months"][m] += item["months"][m]

#         # ============================================================
#         # CALCULATE QUARTERS
#         # ============================================================

#         for head in heads.values():

#             calculate_quarters(head)

#             for sub in head["sub_heads"].values():

#                 calculate_quarters(sub)

#                 for item in sub["items"].values():
#                     calculate_quarters(item)

#             for item in head["items"].values():
#                 calculate_quarters(item)

#         # ============================================================
#         # SORTING
#         # ============================================================

#         final = []

#         for head in sorted(heads.values(), key=lambda x: x["sequence_id"]):

#             head["items"] = sorted(
#                 head["items"].values(),
#                 key=lambda x: x["sequence_id"]
#             )

#             sorted_subs = []

#             for sub in head["sub_heads"].values():

#                 sub["items"] = sorted(
#                     sub["items"].values(),
#                     key=lambda x: x["sequence_id"]
#                 )

#                 sorted_subs.append(sub)

#             head["sub_heads"] = sorted(
#                 sorted_subs,
#                 key=lambda x: x["sequence_id"]
#             )

#             final.append(head)

#         return {
#             "status": "success",
#             "fiscal_year": fiscal_year,
#             "data": final
#         }

#     except Exception as e:

#         frappe.log_error(frappe.get_traceback(), "Actuals API Error")

#         return {
#             "status": "error",
#             "message": str(e),
#             "trace": traceback.format_exc()
#         }








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


# @frappe.whitelist(allow_guest=True)
# def add_expense_totals(financial_year=None, month=None, set_group_id=None):

#     # -------- SAFE PARAMS --------
#     set_group_id = set_group_id or ""

#     # -------- GET CURRENT DATA --------
#     current_data = format_api(
#         financial_year=financial_year,
#         month=month,
#         set_group_id=set_group_id
#     )

#     # -------- PREVIOUS FY --------
#     start_year = int(financial_year.split("-")[0])
#     prev_start = start_year - 1
#     prev_end = str(prev_start + 1)[-2:]
#     prev_fy = f"{prev_start}-{prev_end}"

#     # -------- GET PREVIOUS DATA --------
#     prev_data = format_api(
#         financial_year=prev_fy,
#         month=month,
#         set_group_id=set_group_id
#     )

#     # -------- MAP PREVIOUS DATA --------
#     prev_map = {
#         str(r.get("settings_doc")): r
#         for r in prev_data
#     }

#     # =========================================================
#     # ✅ COMMON EXPENSE CALCULATION (FOUNDATION + EDUCATION)
#     # =========================================================
#     def get_expense_totals(actuals):
#         capital_budget = 0.0
#         capital_actual = 0.0
#         operating_budget = 0.0
#         operating_actual = 0.0

#         for head in actuals:
#             name = (head.get("name") or "").upper()

#             budget = head.get("ytd") or 0.0
#             actual = head.get("total_posted_amt_ytd") or 0.0

#             if "CAPEX" in name or "CAPITAL" in name:
#                 capital_budget += budget
#                 capital_actual += actual

#             elif "OPEX" in name or "OPERATING" in name:
#                 operating_budget += budget
#                 operating_actual += actual

#             else:
#                 # fallback → treat as OPEX
#                 operating_budget += budget
#                 operating_actual += actual

#         return {
#             "capital": {"budget": capital_budget, "actual": capital_actual},
#             "operating": {"budget": operating_budget, "actual": operating_actual},
#             "grand": {
#                 "budget": capital_budget + operating_budget,
#                 "actual": capital_actual + operating_actual
#             }
#         }

#     # =========================================================
#     # ✅ TABLE CONTAINERS
#     # =========================================================
#     foundation_current_rows = []
#     foundation_previous_rows = []
#     education_rows = []

#     # =========================================================
#     # 🔁 MAIN LOOP
#     # =========================================================
#     for record in current_data:

#         settings_doc = str(record.get("settings_doc"))
#         prev_record = prev_map.get(settings_doc, {})

#         label = record.get("label")

#         raw_group = record.get("set_group_id")
#         group_ids = [
#             g.strip() for g in str(raw_group or "").split(",") if g.strip()
#         ]

#         # ---------------- FOUNDATION ----------------
#         if "4" in group_ids:

#             curr_f = get_expense_totals(record.get("actuals", []))
#             prev_f = get_expense_totals(prev_record.get("actuals", []))

#             foundation_current_rows.append({
#                 "unit": label,
#                 "opex_budget": curr_f["operating"]["budget"],
#                 "capex_budget": curr_f["capital"]["budget"],
#                 "total_budget": curr_f["grand"]["budget"],
#                 "opex_actual": curr_f["operating"]["actual"],
#                 "capex_actual": curr_f["capital"]["actual"],
#                 "total_actual": curr_f["grand"]["actual"]
#             })

#             foundation_previous_rows.append({
#                 "unit": label,
#                 "opex_budget": prev_f["operating"]["budget"],
#                 "capex_budget": prev_f["capital"]["budget"],
#                 "total_budget": prev_f["grand"]["budget"],
#                 "opex_actual": prev_f["operating"]["actual"],
#                 "capex_actual": prev_f["capital"]["actual"],
#                 "total_actual": prev_f["grand"]["actual"]
#             })

#         # ---------------- EDUCATION ----------------
#         if "5" in group_ids:

#             curr_e = get_expense_totals(record.get("actuals", []))
#             prev_e = get_expense_totals(prev_record.get("actuals", []))

#             education_rows.append({
#                 "unit": label,

#                 "opex_budget": curr_e["operating"]["budget"],
#                 "capex_budget": curr_e["capital"]["budget"],
#                 "total_budget": curr_e["grand"]["budget"],

#                 "opex_actual": curr_e["operating"]["actual"],
#                 "capex_actual": curr_e["capital"]["actual"],
#                 "total_actual": curr_e["grand"]["actual"],

#                 "opex_budget_previous": prev_e["operating"]["budget"],
#                 "capex_budget_previous": prev_e["capital"]["budget"],
#                 "total_budget_previous": prev_e["grand"]["budget"],

#                 "opex_actual_previous": prev_e["operating"]["actual"],
#                 "capex_actual_previous": prev_e["capital"]["actual"],
#                 "total_actual_previous": prev_e["grand"]["actual"]
#             })

#     # =========================================================
#     # ➕ TOTAL FUNCTIONS
#     # =========================================================
#     def add_foundation_total_row(rows):
#         if not rows:
#             return rows

#         total = {
#             "unit": "Total",
#             "opex_budget": sum(r.get("opex_budget", 0) for r in rows),
#             "capex_budget": sum(r.get("capex_budget", 0) for r in rows),
#             "total_budget": sum(r.get("total_budget", 0) for r in rows),
#             "opex_actual": sum(r.get("opex_actual", 0) for r in rows),
#             "capex_actual": sum(r.get("capex_actual", 0) for r in rows),
#             "total_actual": sum(r.get("total_actual", 0) for r in rows),
#         }

#         rows.append(total)
#         return rows

#     def add_education_total_row(rows):
#         if not rows:
#             return rows

#         total = {
#             "unit": "Total",

#             "opex_budget": sum(r.get("opex_budget", 0) for r in rows),
#             "capex_budget": sum(r.get("capex_budget", 0) for r in rows),
#             "total_budget": sum(r.get("total_budget", 0) for r in rows),

#             "opex_actual": sum(r.get("opex_actual", 0) for r in rows),
#             "capex_actual": sum(r.get("capex_actual", 0) for r in rows),
#             "total_actual": sum(r.get("total_actual", 0) for r in rows),

#             "opex_budget_previous": sum(r.get("opex_budget_previous", 0) for r in rows),
#             "capex_budget_previous": sum(r.get("capex_budget_previous", 0) for r in rows),
#             "total_budget_previous": sum(r.get("total_budget_previous", 0) for r in rows),

#             "opex_actual_previous": sum(r.get("opex_actual_previous", 0) for r in rows),
#             "capex_actual_previous": sum(r.get("capex_actual_previous", 0) for r in rows),
#             "total_actual_previous": sum(r.get("total_actual_previous", 0) for r in rows),
#         }

#         rows.append(total)
#         return rows

#     # APPLY TOTALS
#     foundation_current_rows = add_foundation_total_row(foundation_current_rows)
#     foundation_previous_rows = add_foundation_total_row(foundation_previous_rows)
#     education_rows = add_education_total_row(education_rows)

#     # =========================================================
#     # ✅ FINAL RESPONSE
#     # =========================================================
#     return {
#         "message": {

#             "overall_foundation_numbers": {
#                 "title": f"OVERALL FOUNDATION NUMBERS - {financial_year} BUDGET VS. {prev_fy} EST",
#                 "rows": foundation_current_rows
#             },

#             "overall_foundation_previous_year": {
#                 "title": f"OVERALL FOUNDATION NUMBERS - {prev_fy} BUDGET VS. {prev_fy} EST",
#                 "rows": foundation_previous_rows
#             },

#             "overall_education_numbers": {
#                 "title": f"OVERALL EDUCATION NUMBERS - {financial_year} VS {prev_fy}",
#                 "rows": education_rows
#             }
#         }
#     }



@frappe.whitelist(allow_guest=True)
def get_combination_table_settings(table_name_filter=None):

    results = []

    def parse_list(value):
        if not value:
            return []
        return [v.strip() for v in str(value).split(",") if v.strip()]

    # ✅ HANDLE MULTIPLE TABLE NAMES
    table_filters = parse_list(table_name_filter)
    table_filters = [t.lower() for t in table_filters]

    # ✅ FETCH ALL SETTINGS (NO FILTER)
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

        # -------- EXISTING FIELDS --------
        units = [d.unit for d in doc.select_units]
        cost_centers = [d.cost_center for d in doc.select_cost_centers]
        cost_centers_erp = [d.cost_center_erp for d in doc.select_cost_centers]
        locations = [d.location_code for d in doc.select_location_codes]
        locations_erp = [d.location_code_erp for d in doc.select_location_codes]

        # -------- CHILD TABLE FILTER --------
        combination_settings = []

        for row in doc.combination_table_settings:

            row_table_name = (row.table_name or "").strip().lower()

            # ✅ APPLY FILTER
            if table_filters and row_table_name not in table_filters:
                continue

            combination_settings.append({
                "table_name": row.table_name,
                "sequence_id": row.sequence_id,
                "is_this_sub_item": row.is_this_sub_item
            })

        # ❗ Skip if no matching child rows
        if table_filters and not combination_settings:
            continue

        # -------- FINAL RESULT --------
        results.append({
            "settings_doc": doc.name,
            "label": doc.number_card_title,
            "units": units,
            "cost_centers": cost_centers,
            "cost_centers_erp": cost_centers_erp,
            "locations": locations,
            "locations_erp": locations_erp,
            "combination_settings": combination_settings
        })

    return results



# @frappe.whitelist(allow_guest=True)
# def get_combination_table_settings_1(table_name_filter=None):

#     results = []

#     def parse_list(value):
#         if not value:
#             return []
#         return [v.strip() for v in str(value).split(",") if v.strip()]

#     # ✅ HANDLE MULTIPLE TABLE NAMES
#     table_filters = parse_list(table_name_filter)
#     table_filters = [t.lower() for t in table_filters]

#     # ✅ FETCH ALL SETTINGS
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

#         # -------- GROUPING BY UNIT --------
#         unit_map = {}

#         # Initialize units
#         for d in doc.select_units:
#             if not d.unit:
#                 continue

#             if d.unit not in unit_map:
#                 unit_map[d.unit] = {
#                     "unit": d.unit,
#                     "cost_centers": [],
#                     "cost_centers_erp": [],
#                     "locations": [],
#                     "locations_erp": []
#                 }

#         # Map cost centers to units
#         for d in doc.select_cost_centers:
#             if not d.unit:
#                 continue

#             if d.unit not in unit_map:
#                 unit_map[d.unit] = {
#                     "unit": d.unit,
#                     "cost_centers": [],
#                     "cost_centers_erp": [],
#                     "locations": [],
#                     "locations_erp": []
#                 }

#             if d.cost_center:
#                 unit_map[d.unit]["cost_centers"].append(d.cost_center)

#             if d.cost_center_erp:
#                 unit_map[d.unit]["cost_centers_erp"].append(d.cost_center_erp)

#         # Map locations to units
#         for d in doc.select_location_codes:
#             if not d.unit:
#                 continue

#             if d.unit not in unit_map:
#                 unit_map[d.unit] = {
#                     "unit": d.unit,
#                     "cost_centers": [],
#                     "cost_centers_erp": [],
#                     "locations": [],
#                     "locations_erp": []
#                 }

#             if d.location_code:
#                 unit_map[d.unit]["locations"].append(d.location_code)

#             if d.location_code_erp:
#                 unit_map[d.unit]["locations_erp"].append(d.location_code_erp)

#         # Convert to list
#         grouped_units = list(unit_map.values())

#         # -------- CHILD TABLE FILTER --------
#         combination_settings = []

#         for row in doc.combination_table_settings:

#             row_table_name = (row.table_name or "").strip().lower()

#             # ✅ APPLY FILTER
#             if table_filters and row_table_name not in table_filters:
#                 continue

#             combination_settings.append({
#                 "table_name": row.table_name,
#                 "sequence_id": row.sequence_id,
#                 "is_this_sub_item": row.is_this_sub_item
#             })

#         # ❗ Skip if no matching child rows
#         if table_filters and not combination_settings:
#             continue

#         # -------- FINAL RESULT --------
#         results.append({
#             "settings_doc": doc.name,
#             "label": doc.number_card_title,
#             "grouped_units": grouped_units,
#             "combination_settings": combination_settings
#         })

#     return results



@frappe.whitelist(allow_guest=True)
def get_combination_table_settings_1(table_name_filter=None):

    results = []

    def parse_list(value):
        if not value:
            return []
        return [v.strip() for v in str(value).split(",") if v.strip()]

    # ✅ HANDLE MULTIPLE TABLE NAMES
    table_filters = parse_list(table_name_filter)
    table_filters = [t.lower() for t in table_filters]

    # ✅ FETCH ALL SETTINGS
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

        # -------- GROUPING BY UNIT --------
        unit_map = {}

        # ✅ Initialize units
        for d in doc.select_units:
            if not d.unit:
                continue

            if d.unit not in unit_map:
                unit_map[d.unit] = {
                    "unit": d.unit,
                    "cost_centers": [],
                    "cost_centers_erp": [],
                    "locations": [],
                    "locations_erp": []
                }

        # -------- COST CENTERS (WITH reference_for LOGIC) --------
        for d in doc.select_cost_centers:
            if not d.unit:
                continue

            if d.unit not in unit_map:
                unit_map[d.unit] = {
                    "unit": d.unit,
                    "cost_centers": [],
                    "cost_centers_erp": [],
                    "locations": [],
                    "locations_erp": []
                }

            ref = (d.reference_for or "Both").strip()

            # ✅ Budget → normal cost center
            if ref in ["Budget", "Both"]:
                if d.cost_center:
                    unit_map[d.unit]["cost_centers"].append(d.cost_center)

            # ✅ Actual → ERP cost center
            if ref in ["Actual", "Both"]:
                if d.cost_center_erp:
                    unit_map[d.unit]["cost_centers_erp"].append(d.cost_center_erp)

        # -------- LOCATIONS (WITH reference_for LOGIC) --------
        for d in doc.select_location_codes:
            if not d.unit:
                continue

            if d.unit not in unit_map:
                unit_map[d.unit] = {
                    "unit": d.unit,
                    "cost_centers": [],
                    "cost_centers_erp": [],
                    "locations": [],
                    "locations_erp": []
                }

            ref = (d.reference_for or "Both").strip()

            # ✅ Budget → normal location
            if ref in ["Budget", "Both"]:
                if d.location_code:
                    unit_map[d.unit]["locations"].append(d.location_code)

            # ✅ Actual → ERP location
            if ref in ["Actual", "Both"]:
                if d.location_code_erp:
                    unit_map[d.unit]["locations_erp"].append(d.location_code_erp)

        # -------- REMOVE DUPLICATES (OPTIONAL BUT RECOMMENDED) --------
        for unit in unit_map.values():
            unit["cost_centers"] = list(set(unit["cost_centers"]))
            unit["cost_centers_erp"] = list(set(unit["cost_centers_erp"]))
            unit["locations"] = list(set(unit["locations"]))
            unit["locations_erp"] = list(set(unit["locations_erp"]))

        # Convert to list
        grouped_units = list(unit_map.values())

        # -------- CHILD TABLE FILTER --------
        combination_settings = []

        for row in doc.combination_table_settings:

            row_table_name = (row.table_name or "").strip().lower()

            # ✅ APPLY FILTER
            if table_filters and row_table_name not in table_filters:
                continue

            combination_settings.append({
                "table_name": row.table_name,
                "sequence_id": row.sequence_id,
                "is_this_sub_item": row.is_this_sub_item
            })

        # ❗ Skip if no matching child rows
        if table_filters and not combination_settings:
            continue

        # -------- FINAL RESULT --------
        results.append({
            "settings_doc": doc.name,
            "label": doc.number_card_title,
            "grouped_units": grouped_units,
            "combination_settings": combination_settings
        })

    return results



# @frappe.whitelist(allow_guest=True)
# def get_number_card_actuals(financial_year, month, table_name_filter=None):

#     def safe_join(arr):
#         return ",".join([str(x).strip() for x in (arr or []) if x])

#     # ✅ Previous FY
#     previous_financial_year = get_previous_financial_year(financial_year)

#     # ✅ Get settings (NEW METHOD)
#     settings = get_number_card_settings_1(table_name_filter)

#     # ✅ Sort settings
#     settings = sorted(settings, key=lambda x: x.get("settings_doc", ""))

#     final_results = []

#     # ✅ Get accounting period + fiscal year
#     formatted = get_accounting_period_from_month(
#         month,
#         previous_financial_year
#     )

#     accounting_period = formatted.get("accounting_period")
#     fiscal_year = formatted.get("fiscal_year")

#     # ✅ CALL ONLY ONCE (Performance optimized)
#     grouped_actuals_response = get_grouped_actuals(
#         fiscal_year=fiscal_year,
#         accounting_period=accounting_period
#     )

#     grouped_actuals_data = grouped_actuals_response.get("data", [])

#     # ✅ MAIN LOOP
#     for s in settings:

#         # 🔹 Prepare filters
#         units = safe_join(s.get("units"))
#         cost_centers = safe_join(s.get("cost_centers"))
#         locations = safe_join(s.get("locations"))
#         cost_centers_erp = safe_join(s.get("cost_centers_erp"))
#         locations_erp = safe_join(s.get("locations_erp"))

#         # ✅ LOOP combination_settings
#         for combo in s.get("combination_settings", []):

#             actuals_data = get_combined_actuals(
#                 financial_year=financial_year,
#                 month=month,
#                 unit=units,
#                 cost_center=cost_centers,
#                 location_code=locations,
#                 erp_cost_center_value=cost_centers_erp,
#                 erp_loc_value=locations_erp,
#                 grouped_actuals_data=grouped_actuals_data,
#             )

#             final_results.append({
#                 "settings_doc": s.get("settings_doc"),
#                 "label": s.get("label"),
#                 "table_name": combo.get("table_name"),
#                 "sequence_id": combo.get("sequence_id"),
#                 "is_this_sub_item": combo.get("is_this_sub_item"),
#                 "units": units,
#                 "cost_centers": cost_centers,
#                 "locations": locations,
#                 "cost_centers_erp": cost_centers_erp,
#                 "locations_erp": locations_erp,
#                 "actuals": actuals_data,
#             })

#     # ✅ Optional: sort by sequence
#     final_results = sorted(final_results, key=lambda x: x.get("sequence_id", 0))

#     return final_results


# @frappe.whitelist(allow_guest=True)
# def get_number_card_actuals(financial_year, month, table_name_filter=None):

#     def safe_join(arr):
#         return ",".join([str(x).strip() for x in (arr or []) if x])

#     # ✅ NEW: calculate totals properly
#     def calculate_totals(actuals):

#         for head in actuals:

#             total_ytd = 0
#             total_actual = 0

#             # ✅ CASE 1: sub_heads exist
#             if head.get("sub_heads"):

#                 for sub in head.get("sub_heads", []):

#                     sub_ytd = 0
#                     sub_actual = 0

#                     for item in sub.get("items", []):
#                         sub_ytd += item.get("ytd", 0) or 0
#                         sub_actual += item.get("total_posted_amt", 0) or 0

#                     # ✅ ROUND sub-head totals
#                     sub["ytd"] = round(sub_ytd, 2)
#                     sub["total_posted_amt_ytd"] = round(sub_actual, 2)

#                     total_ytd += sub_ytd
#                     total_actual += sub_actual

#             # ✅ CASE 2: only items
#             else:
#                 for item in head.get("items", []):
#                     total_ytd += item.get("ytd", 0) or 0
#                     total_actual += item.get("total_posted_amt", 0) or 0

#             # ✅ ROUND head totals
#             head["ytd"] = round(total_ytd, 2)
#             head["total_posted_amt_ytd"] = round(total_actual, 2)

#         return actuals
#         # ✅ Previous FY
#         previous_financial_year = get_previous_financial_year(financial_year)

#         # ✅ Get settings
#         settings = get_number_card_settings_1(table_name_filter)

#         # ✅ Sort settings
#         settings = sorted(settings, key=lambda x: x.get("settings_doc", ""))

#         final_results = []

#         # ✅ Accounting period
#         formatted = get_accounting_period_from_month(
#             month,
#             previous_financial_year
#         )

#         accounting_period = formatted.get("accounting_period")
#         fiscal_year = formatted.get("fiscal_year")

#         # ✅ Fetch grouped actuals ONCE
#         grouped_actuals_response = get_grouped_actuals(
#             fiscal_year=fiscal_year,
#             accounting_period=accounting_period
#         )

#         grouped_actuals_data = grouped_actuals_response.get("data", [])

#         # ✅ MAIN LOOP
#         for s in settings:

#             units = safe_join(s.get("units"))
#             cost_centers = safe_join(s.get("cost_centers"))
#             locations = safe_join(s.get("locations"))
#             cost_centers_erp = safe_join(s.get("cost_centers_erp"))
#             locations_erp = safe_join(s.get("locations_erp"))

#             # ✅ LOOP combination_settings
#             for combo in s.get("combination_settings", []):

#                 actuals_data = get_combined_actuals(
#                     financial_year=financial_year,
#                     month=month,
#                     unit=units,
#                     cost_center=cost_centers,
#                     location_code=locations,
#                     erp_cost_center_value=cost_centers_erp,
#                     erp_loc_value=locations_erp,
#                     grouped_actuals_data=grouped_actuals_data
#                 )

#                 # ✅ APPLY TOTAL FIX HERE
#                 actuals_data = calculate_totals(actuals_data)

#                 final_results.append({
#                     "settings_doc": s.get("settings_doc"),
#                     "label": s.get("label"),

#                     # ✅ combination level
#                     "table_name": combo.get("table_name"),
#                     "sequence_id": combo.get("sequence_id"),
#                     "is_this_sub_item": combo.get("is_this_sub_item"),

#                     # ✅ filters
#                     "units": units,
#                     "cost_centers": cost_centers,
#                     "locations": locations,
#                     "cost_centers_erp": cost_centers_erp,
#                     "locations_erp": locations_erp,

#                     # ✅ final actuals
#                     "actuals": actuals_data,
#                 })

#         # ✅ Sort by sequence
#         final_results = sorted(final_results, key=lambda x: x.get("sequence_id", 0))

#         return final_results



@frappe.whitelist(allow_guest=True)
def get_unit_wise_plan_1(financial_year, month, table_name_filter=None):

    def safe_join(arr):
        return ",".join([str(x).strip() for x in (arr or []) if x])

    # ✅ Calculate sub-head & head totals
    def calculate_totals(actuals):

        for head in actuals:

            total_ytd = 0
            total_actual = 0

            # 🔹 CASE 1: sub_heads exist
            if head.get("sub_heads"):

                for sub in head.get("sub_heads", []):

                    sub_ytd = 0
                    sub_actual = 0

                    for item in sub.get("items", []):
                        sub_ytd += item.get("ytd", 0) or 0
                        sub_actual += item.get("total_posted_amt", 0) or 0

                    sub["ytd"] = round(sub_ytd, 2)
                    sub["total_posted_amt_ytd"] = round(sub_actual, 2)

                    total_ytd += sub_ytd
                    total_actual += sub_actual

            # 🔹 CASE 2: only items
            else:
                for item in head.get("items", []):
                    total_ytd += item.get("ytd", 0) or 0
                    total_actual += item.get("total_posted_amt", 0) or 0

            head["ytd"] = round(total_ytd, 2)
            head["total_posted_amt_ytd"] = round(total_actual, 2)

        return actuals

    # ✅ Calculate grand totals
    def calculate_grand_total(actuals):

        grand_ytd = 0
        grand_actual = 0

        for head in actuals:
            grand_ytd += head.get("ytd", 0) or 0
            grand_actual += head.get("total_posted_amt_ytd", 0) or 0

        return {
            "grand_total_ytd": round(grand_ytd, 2),
            "grand_total_actual": round(grand_actual, 2)
        }

    # ✅ Previous FY
    previous_financial_year = get_previous_financial_year(financial_year)

    # ✅ Get settings
    settings = get_combination_table_settings(table_name_filter)

    print(settings,"master settings")
    # ✅ Sort settings
    settings = sorted(settings, key=lambda x: x.get("settings_doc", ""))

    final_results = []

    # ✅ Accounting period
    formatted = get_accounting_period_from_month(
        month,
        previous_financial_year
    )

    accounting_period = formatted.get("accounting_period")
    fiscal_year = formatted.get("fiscal_year")

    # ✅ Fetch grouped actuals once
    grouped_actuals_response = get_grouped_actuals(
        fiscal_year=fiscal_year,
        accounting_period=accounting_period
    )

    grouped_actuals_data = grouped_actuals_response.get("data", [])

    # ✅ MAIN LOOP
    for s in settings:

        units = safe_join(s.get("units"))
        cost_centers = safe_join(s.get("cost_centers"))
        locations = safe_join(s.get("locations"))
        cost_centers_erp = safe_join(s.get("cost_centers_erp"))
        locations_erp = safe_join(s.get("locations_erp"))

        # 🔁 Loop combination settings
        for combo in s.get("combination_settings", []):

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

            # ✅ Fix totals
            actuals_data = calculate_totals(actuals_data)

            # ✅ Calculate grand total
            totals = calculate_grand_total(actuals_data)

            # ✅ PUSH GRAND TOTAL INSIDE actuals
            actuals_data.append({
                "name": "GRAND TOTAL",
                "sequence_id": 9999,
                "sub_heads": [],
                "items": [],
                "ytd": totals["grand_total_ytd"],
                "total_posted_amt_ytd": totals["grand_total_actual"]
            })

            # ✅ Final append (NO root totals)
            final_results.append({
                "settings_doc": s.get("settings_doc"),
                "label": s.get("label"),

                "table_name": combo.get("table_name"),
                "sequence_id": combo.get("sequence_id"),
                "is_this_sub_item": combo.get("is_this_sub_item"),

                "units": units,
                "cost_centers": cost_centers,
                "locations": locations,
                "cost_centers_erp": cost_centers_erp,
                "locations_erp": locations_erp,

                "actuals": actuals_data
            })

    # ✅ Sort final results
    final_results = sorted(final_results, key=lambda x: x.get("sequence_id", 0))

    return final_results



@frappe.whitelist(allow_guest=True)
def get_unit_wise_plan(financial_year, month, table_name_filter=None):

    def safe_join(arr):
        return ",".join([str(x).strip() for x in (arr or []) if x])

    # ---------------- TOTAL CALCULATIONS ----------------
    def calculate_totals(actuals):

        for head in actuals:

            total_ytd = 0
            total_actual = 0

            if head.get("sub_heads"):

                for sub in head.get("sub_heads", []):

                    sub_ytd = 0
                    sub_actual = 0

                    for item in sub.get("items", []):
                        sub_ytd += item.get("ytd", 0) or 0
                        sub_actual += item.get("total_posted_amt", 0) or 0

                    sub["ytd"] = round(sub_ytd, 2)
                    sub["total_posted_amt_ytd"] = round(sub_actual, 2)

                    total_ytd += sub_ytd
                    total_actual += sub_actual

            else:
                for item in head.get("items", []):
                    total_ytd += item.get("ytd", 0) or 0
                    total_actual += item.get("total_posted_amt", 0) or 0

            head["ytd"] = round(total_ytd, 2)
            head["total_posted_amt_ytd"] = round(total_actual, 2)

        return actuals

    def calculate_grand_total(actuals):

        grand_ytd = 0
        grand_actual = 0

        for head in actuals:
            grand_ytd += head.get("ytd", 0) or 0
            grand_actual += head.get("total_posted_amt_ytd", 0) or 0

        return {
            "grand_total_ytd": round(grand_ytd, 2),
            "grand_total_actual": round(grand_actual, 2)
        }

    # ---------------- CONSOLIDATION ----------------
    def consolidate_actuals(all_unit_actuals):

        head_map = {}

        for unit_data in all_unit_actuals:

            for head in unit_data:

                key = head["name"]

                if key not in head_map:
                    head_map[key] = {
                        "name": head["name"],
                        "sequence_id": head["sequence_id"],
                        "sub_heads": [],
                        "items": [],
                        "ytd": 0,
                        "total_posted_amt_ytd": 0
                    }

                head_map[key]["ytd"] += head.get("ytd", 0)
                head_map[key]["total_posted_amt_ytd"] += head.get("total_posted_amt_ytd", 0)

                # ---- SUB HEADS ----
                if head.get("sub_heads"):

                    sub_map = {s["name"]: s for s in head_map[key]["sub_heads"]}

                    for sub in head.get("sub_heads", []):

                        if sub["name"] not in sub_map:
                            new_sub = {
                                "name": sub["name"],
                                "sequence_id": sub["sequence_id"],
                                "items": [],
                                "ytd": 0,
                                "total_posted_amt_ytd": 0
                            }
                            head_map[key]["sub_heads"].append(new_sub)
                            sub_map[sub["name"]] = new_sub

                        sub_map[sub["name"]]["ytd"] += sub.get("ytd", 0)
                        sub_map[sub["name"]]["total_posted_amt_ytd"] += sub.get("total_posted_amt_ytd", 0)

                        # ---- ITEMS ----
                        item_map = {i["name"]: i for i in sub_map[sub["name"]]["items"]}

                        for item in sub.get("items", []):

                            if item["name"] not in item_map:
                                new_item = {
                                    "name": item["name"],
                                    "sequence_id": item["sequence_id"],
                                    "gl_code": item.get("gl_code"),
                                    "ytd": 0,
                                    "total_posted_amt": 0
                                }
                                sub_map[sub["name"]]["items"].append(new_item)
                                item_map[item["name"]] = new_item

                            item_map[item["name"]]["ytd"] += item.get("ytd", 0)
                            item_map[item["name"]]["total_posted_amt"] += item.get("total_posted_amt", 0)

                # ---- DIRECT ITEMS ----
                else:
                    item_map = {i["name"]: i for i in head_map[key]["items"]}

                    for item in head.get("items", []):

                        if item["name"] not in item_map:
                            new_item = {
                                "name": item["name"],
                                "sequence_id": item["sequence_id"],
                                "gl_code": item.get("gl_code"),
                                "ytd": 0,
                                "total_posted_amt": 0
                            }
                            head_map[key]["items"].append(new_item)
                            item_map[item["name"]] = new_item

                        item_map[item["name"]]["ytd"] += item.get("ytd", 0)
                        item_map[item["name"]]["total_posted_amt"] += item.get("total_posted_amt", 0)

        return list(head_map.values())

    # ---------------- MAIN LOGIC ----------------

    previous_financial_year = get_previous_financial_year(financial_year)

    settings = get_combination_table_settings_1(table_name_filter)

    formatted = get_accounting_period_from_month(month, previous_financial_year)

    grouped_actuals_data = get_grouped_actuals(
        fiscal_year=formatted.get("fiscal_year"),
        accounting_period=formatted.get("accounting_period")
    ).get("data", [])

    final_results = []

    for s in settings:

        for combo in s.get("combination_settings", []):

            all_unit_actuals = []

            # 🔁 LOOP EACH UNIT
            for gu in s.get("grouped_units", []):

                actuals = get_combined_actuals(
                    financial_year=financial_year,
                    month=month,
                    unit=gu.get("unit"),
                    cost_center=safe_join(gu.get("cost_centers")),
                    location_code=safe_join(gu.get("locations")),
                    erp_cost_center_value=safe_join(gu.get("cost_centers_erp")),
                    erp_loc_value=safe_join(gu.get("locations_erp")),
                    grouped_actuals_data=grouped_actuals_data
                )

                actuals = calculate_totals(actuals)
                all_unit_actuals.append(actuals)

            # ✅ CONSOLIDATE ALL UNITS
            consolidated = consolidate_actuals(all_unit_actuals)

            totals = calculate_grand_total(consolidated)

            consolidated.append({
                "name": "GRAND TOTAL",
                "sequence_id": 9999,
                "sub_heads": [],
                "items": [],
                "ytd": totals["grand_total_ytd"],
                "total_posted_amt_ytd": totals["grand_total_actual"]
            })

            final_results.append({
                "settings_doc": s.get("settings_doc"),
                "label": s.get("label"),

                "table_name": combo.get("table_name"),
                "sequence_id": combo.get("sequence_id"),
                "is_this_sub_item": combo.get("is_this_sub_item"),

                "actuals": consolidated
            })

    return final_results


@frappe.whitelist(allow_guest=True)
def get_foundation_overall(financial_year, month, table_name_filter=None):

    def safe_join(arr):
        return ",".join([str(x).strip() for x in (arr or []) if x])

    # ---------------- TOTAL CALCULATIONS ----------------
    def calculate_totals(actuals):

        for head in actuals:

            total_ytd = 0
            total_actual = 0

            if head.get("sub_heads"):

                for sub in head.get("sub_heads", []):

                    sub_ytd = 0
                    sub_actual = 0

                    for item in sub.get("items", []):
                        sub_ytd += item.get("ytd", 0) or 0
                        sub_actual += item.get("total_posted_amt", 0) or 0

                    sub["ytd"] = round(sub_ytd, 2)
                    sub["total_posted_amt_ytd"] = round(sub_actual, 2)

                    total_ytd += sub_ytd
                    total_actual += sub_actual

            else:
                for item in head.get("items", []):
                    total_ytd += item.get("ytd", 0) or 0
                    total_actual += item.get("total_posted_amt", 0) or 0

            head["ytd"] = round(total_ytd, 2)
            head["total_posted_amt_ytd"] = round(total_actual, 2)

        return actuals

    def calculate_grand_total(actuals):

        grand_ytd = sum(h.get("ytd", 0) or 0 for h in actuals)
        grand_actual = sum(h.get("total_posted_amt_ytd", 0) or 0 for h in actuals)

        return {
            "grand_total_ytd": round(grand_ytd, 2),
            "grand_total_actual": round(grand_actual, 2)
        }

    # ---------------- CONSOLIDATION ----------------
    def consolidate_actuals(all_unit_actuals):

        head_map = {}

        for unit_data in all_unit_actuals:

            for head in unit_data:

                key = head["name"]

                if key not in head_map:
                    head_map[key] = {
                        "name": head["name"],
                        "sequence_id": head["sequence_id"],
                        "sub_heads": [],
                        "items": [],
                        "ytd": 0,
                        "total_posted_amt_ytd": 0
                    }

                head_map[key]["ytd"] += head.get("ytd", 0)
                head_map[key]["total_posted_amt_ytd"] += head.get("total_posted_amt_ytd", 0)

                # ---- SUB HEADS ----
                if head.get("sub_heads"):

                    sub_map = {s["name"]: s for s in head_map[key]["sub_heads"]}

                    for sub in head.get("sub_heads", []):

                        if sub["name"] not in sub_map:
                            new_sub = {
                                "name": sub["name"],
                                "sequence_id": sub["sequence_id"],
                                "items": [],
                                "ytd": 0,
                                "total_posted_amt_ytd": 0
                            }
                            head_map[key]["sub_heads"].append(new_sub)
                            sub_map[sub["name"]] = new_sub

                        sub_map[sub["name"]]["ytd"] += sub.get("ytd", 0)
                        sub_map[sub["name"]]["total_posted_amt_ytd"] += sub.get("total_posted_amt_ytd", 0)

                        item_map = {i["name"]: i for i in sub_map[sub["name"]]["items"]}

                        for item in sub.get("items", []):

                            if item["name"] not in item_map:
                                new_item = {
                                    "name": item["name"],
                                    "sequence_id": item["sequence_id"],
                                    "gl_code": item.get("gl_code"),
                                    "ytd": 0,
                                    "total_posted_amt": 0
                                }
                                sub_map[sub["name"]]["items"].append(new_item)
                                item_map[item["name"]] = new_item

                            item_map[item["name"]]["ytd"] += item.get("ytd", 0)
                            item_map[item["name"]]["total_posted_amt"] += item.get("total_posted_amt", 0)

                # ---- DIRECT ITEMS ----
                else:
                    item_map = {i["name"]: i for i in head_map[key]["items"]}

                    for item in head.get("items", []):

                        if item["name"] not in item_map:
                            new_item = {
                                "name": item["name"],
                                "sequence_id": item["sequence_id"],
                                "gl_code": item.get("gl_code"),
                                "ytd": 0,
                                "total_posted_amt": 0
                            }
                            head_map[key]["items"].append(new_item)
                            item_map[item["name"]] = new_item

                        item_map[item["name"]]["ytd"] += item.get("ytd", 0)
                        item_map[item["name"]]["total_posted_amt"] += item.get("total_posted_amt", 0)

        return list(head_map.values())

    # ---------------- MAIN LOGIC ----------------

    previous_financial_year = get_previous_financial_year(financial_year)
    last_previous_financial_year = get_previous_financial_year(previous_financial_year)

    settings = get_combination_table_settings(table_name_filter)
    settings = sorted(settings, key=lambda x: x.get("settings_doc", ""))

    final_results = []

    # periods
    current_formatted = get_accounting_period_from_month(month, previous_financial_year)
    prev_formatted = get_accounting_period_from_month(month, last_previous_financial_year)

    current_grouped = get_grouped_actuals(
        fiscal_year=current_formatted.get("fiscal_year"),
        accounting_period=current_formatted.get("accounting_period")
    ).get("data", [])

    prev_grouped = get_grouped_actuals(
        fiscal_year=prev_formatted.get("fiscal_year"),
        accounting_period=prev_formatted.get("accounting_period")
    ).get("data", [])

    # ---------------- LOOP ----------------
    for s in settings:

        units = safe_join(s.get("units"))
        cost_centers = safe_join(s.get("cost_centers"))
        locations = safe_join(s.get("locations"))
        cost_centers_erp = safe_join(s.get("cost_centers_erp"))
        locations_erp = safe_join(s.get("locations_erp"))

        for combo in s.get("combination_settings", []):

            # -------- CURRENT YEAR --------
            all_actuals = []

            actuals = get_combined_actuals(
                financial_year=financial_year,
                month=month,
                unit=units,
                cost_center=cost_centers,
                location_code=locations,
                erp_cost_center_value=cost_centers_erp,
                erp_loc_value=locations_erp,
                grouped_actuals_data=current_grouped
            )

            actuals = calculate_totals(actuals)
            all_actuals.append(actuals)

            actuals = consolidate_actuals(all_actuals)
            totals = calculate_grand_total(actuals)

            actuals.append({
                "name": "GRAND TOTAL",
                "sequence_id": 9999,
                "sub_heads": [],
                "items": [],
                "ytd": totals["grand_total_ytd"],
                "total_posted_amt_ytd": totals["grand_total_actual"]
            })

            # -------- PREVIOUS YEAR --------
            all_prev_actuals = []

            previous_actuals = get_combined_actuals(
                financial_year=previous_financial_year,
                month=month,
                unit=units,
                cost_center=cost_centers,
                location_code=locations,
                erp_cost_center_value=cost_centers_erp,
                erp_loc_value=locations_erp,
                grouped_actuals_data=prev_grouped
            )

            previous_actuals = calculate_totals(previous_actuals)
            all_prev_actuals.append(previous_actuals)

            previous_actuals = consolidate_actuals(all_prev_actuals)
            previous_totals = calculate_grand_total(previous_actuals)

            previous_actuals.append({
                "name": "GRAND TOTAL",
                "sequence_id": 9999,
                "sub_heads": [],
                "items": [],
                "ytd": previous_totals["grand_total_ytd"],
                "total_posted_amt_ytd": previous_totals["grand_total_actual"]
            })

            # -------- FINAL RESULT --------
            final_results.append({
                "settings_doc": s.get("settings_doc"),
                "label": s.get("label"),

                "table_name": combo.get("table_name"),
                "sequence_id": combo.get("sequence_id"),
                "is_this_sub_item": combo.get("is_this_sub_item"),

                "units": units,
                "cost_centers": cost_centers,
                "locations": locations,
                "cost_centers_erp": cost_centers_erp,
                "locations_erp": locations_erp,

                "actuals": actuals,
                "previous_actuals": previous_actuals
            })

    final_results = sorted(final_results, key=lambda x: x.get("sequence_id", 0))

    return final_results


# @frappe.whitelist(allow_guest=True)
# def get_unit_wise_plan(financial_year, month, table_name_filter=None):

#     def safe_join(arr):
#         return ",".join([str(x).strip() for x in (arr or []) if x])

#     # ---------------- TOTAL CALCULATIONS ----------------
#     def calculate_totals(actuals):

#         for head in actuals:

#             total_ytd = 0
#             total_actual = 0

#             if head.get("sub_heads"):

#                 for sub in head.get("sub_heads", []):

#                     sub_ytd = 0
#                     sub_actual = 0

#                     for item in sub.get("items", []):
#                         sub_ytd += item.get("ytd", 0) or 0
#                         sub_actual += item.get("total_posted_amt", 0) or 0

#                     sub["ytd"] = round(sub_ytd, 2)
#                     sub["total_posted_amt_ytd"] = round(sub_actual, 2)

#                     total_ytd += sub_ytd
#                     total_actual += sub_actual

#             else:
#                 for item in head.get("items", []):
#                     total_ytd += item.get("ytd", 0) or 0
#                     total_actual += item.get("total_posted_amt", 0) or 0

#             head["ytd"] = round(total_ytd, 2)
#             head["total_posted_amt_ytd"] = round(total_actual, 2)

#         return actuals

#     def calculate_grand_total(actuals):

#         grand_ytd = 0
#         grand_actual = 0

#         for head in actuals:
#             grand_ytd += head.get("ytd", 0) or 0
#             grand_actual += head.get("total_posted_amt_ytd", 0) or 0

#         return {
#             "grand_total_ytd": round(grand_ytd, 2),
#             "grand_total_actual": round(grand_actual, 2)
#         }

#     # ---------------- BUDGET FETCH ----------------
#     def get_budget_data(financial_year):

#         budget_map = {}

#         data = frappe.db.get_all(
#             "Budget Account",
#             filters={"financial_year": financial_year},
#             fields=["account", "budget_amount"]
#         )

#         for d in data:
#             budget_map[d["account"]] = d["budget_amount"]

#         return budget_map

#     # ---------------- MERGE BUDGET ----------------
#     def attach_budget(actuals, budget_map):

#         for head in actuals:

#             if head.get("sub_heads"):

#                 for sub in head.get("sub_heads", []):

#                     for item in sub.get("items", []):

#                         gl = item.get("gl_code")
#                         item["budget"] = budget_map.get(gl, 0)

#             else:
#                 for item in head.get("items", []):

#                     gl = item.get("gl_code")
#                     item["budget"] = budget_map.get(gl, 0)

#         return actuals

#     # ---------------- CONSOLIDATION ----------------
#     def consolidate_actuals(all_unit_actuals):

#         head_map = {}

#         for unit_data in all_unit_actuals:

#             for head in unit_data:

#                 key = head["name"]

#                 if key not in head_map:
#                     head_map[key] = {
#                         "name": head["name"],
#                         "sequence_id": head["sequence_id"],
#                         "sub_heads": [],
#                         "items": [],
#                         "ytd": 0,
#                         "total_posted_amt_ytd": 0
#                     }

#                 head_map[key]["ytd"] += head.get("ytd", 0)
#                 head_map[key]["total_posted_amt_ytd"] += head.get("total_posted_amt_ytd", 0)

#                 if head.get("sub_heads"):

#                     sub_map = {s["name"]: s for s in head_map[key]["sub_heads"]}

#                     for sub in head.get("sub_heads", []):

#                         if sub["name"] not in sub_map:
#                             new_sub = {
#                                 "name": sub["name"],
#                                 "sequence_id": sub["sequence_id"],
#                                 "items": [],
#                                 "ytd": 0,
#                                 "total_posted_amt_ytd": 0
#                             }
#                             head_map[key]["sub_heads"].append(new_sub)
#                             sub_map[sub["name"]] = new_sub

#                         sub_map[sub["name"]]["ytd"] += sub.get("ytd", 0)
#                         sub_map[sub["name"]]["total_posted_amt_ytd"] += sub.get("total_posted_amt_ytd", 0)

#                         item_map = {i["name"]: i for i in sub_map[sub["name"]]["items"]}

#                         for item in sub.get("items", []):

#                             if item["name"] not in item_map:
#                                 new_item = {
#                                     "name": item["name"],
#                                     "sequence_id": item["sequence_id"],
#                                     "gl_code": item.get("gl_code"),
#                                     "ytd": 0,
#                                     "total_posted_amt": 0,
#                                     "budget": 0
#                                 }
#                                 sub_map[sub["name"]]["items"].append(new_item)
#                                 item_map[item["name"]] = new_item

#                             item_map[item["name"]]["ytd"] += item.get("ytd", 0)
#                             item_map[item["name"]]["total_posted_amt"] += item.get("total_posted_amt", 0)
#                             item_map[item["name"]]["budget"] += item.get("budget", 0)

#                 else:
#                     item_map = {i["name"]: i for i in head_map[key]["items"]}

#                     for item in head.get("items", []):

#                         if item["name"] not in item_map:
#                             new_item = {
#                                 "name": item["name"],
#                                 "sequence_id": item["sequence_id"],
#                                 "gl_code": item.get("gl_code"),
#                                 "ytd": 0,
#                                 "total_posted_amt": 0,
#                                 "budget": 0
#                             }
#                             head_map[key]["items"].append(new_item)
#                             item_map[item["name"]] = new_item

#                         item_map[item["name"]]["ytd"] += item.get("ytd", 0)
#                         item_map[item["name"]]["total_posted_amt"] += item.get("total_posted_amt", 0)
#                         item_map[item["name"]]["budget"] += item.get("budget", 0)

#         return list(head_map.values())

#     # ---------------- MAIN ----------------

#     settings = get_combination_table_settings_1(table_name_filter)

#     formatted = get_accounting_period_from_month(month, financial_year)

#     current_grouped_actuals_data = get_grouped_actuals(
#         fiscal_year=formatted.get("fiscal_year"),
#         accounting_period=formatted.get("accounting_period")
#     ).get("data", [])

#     # ✅ GET BUDGET
#     budget_map = get_budget_data(financial_year)

#     final_results = []

#     for s in settings:

#         for combo in s.get("combination_settings", []):

#             all_unit_actuals = []

#             for gu in s.get("grouped_units", []):

#                 actuals = get_combined_actuals(
#                     financial_year=financial_year,
#                     month=month,
#                     unit=gu.get("unit"),
#                     cost_center=safe_join(gu.get("cost_centers")),
#                     location_code=safe_join(gu.get("locations")),
#                     erp_cost_center_value=safe_join(gu.get("cost_centers_erp")),
#                     erp_loc_value=safe_join(gu.get("locations_erp")),
#                     grouped_actuals_data=current_grouped_actuals_data
#                 )

#                 # ✅ attach budget here
#                 actuals = attach_budget(actuals, budget_map)

#                 actuals = calculate_totals(actuals)

#                 all_unit_actuals.append(actuals)

#             consolidated = consolidate_actuals(all_unit_actuals)

#             totals = calculate_grand_total(consolidated)

#             consolidated.append({
#                 "name": "GRAND TOTAL",
#                 "sequence_id": 9999,
#                 "sub_heads": [],
#                 "items": [],
#                 "ytd": totals["grand_total_ytd"],
#                 "total_posted_amt_ytd": totals["grand_total_actual"]
#             })

#             final_results.append({
#                 "settings_doc": s.get("settings_doc"),
#                 "label": s.get("label"),
#                 "table_name": combo.get("table_name"),
#                 "sequence_id": combo.get("sequence_id"),
#                 "is_this_sub_item": combo.get("is_this_sub_item"),
#                 "actuals": consolidated
#             })

#     return final_results



# @frappe.whitelist(allow_guest=True)
# def get_(financial_year, month, table_name_filter=None):

#     def safe_join(arr):
#         return ",".join([str(x).strip() for x in (arr or []) if x])

#     # ✅ Calculate totals (sub-head + head)
#     def calculate_totals(actuals):
#         for head in actuals:

#             total_ytd = 0
#             total_actual = 0

#             if head.get("sub_heads"):
#                 for sub in head.get("sub_heads", []):

#                     sub_ytd = 0
#                     sub_actual = 0

#                     for item in sub.get("items", []):
#                         sub_ytd += item.get("ytd", 0) or 0
#                         sub_actual += item.get("total_posted_amt", 0) or 0

#                     sub["ytd"] = round(sub_ytd, 2)
#                     sub["total_posted_amt_ytd"] = round(sub_actual, 2)

#                     total_ytd += sub_ytd
#                     total_actual += sub_actual
#             else:
#                 for item in head.get("items", []):
#                     total_ytd += item.get("ytd", 0) or 0
#                     total_actual += item.get("total_posted_amt", 0) or 0

#             head["ytd"] = round(total_ytd, 2)
#             head["total_posted_amt_ytd"] = round(total_actual, 2)

#         return actuals

#     # ✅ Grand total
#     def calculate_grand_total(actuals):
#         grand_ytd = sum(h.get("ytd", 0) or 0 for h in actuals)
#         grand_actual = sum(h.get("total_posted_amt_ytd", 0) or 0 for h in actuals)

#         return {
#             "grand_total_ytd": round(grand_ytd, 2),
#             "grand_total_actual": round(grand_actual, 2)
#         }

#     # ✅ Years
#     previous_financial_year = get_previous_financial_year(financial_year)

#     settings = get_number_card_settings_1(table_name_filter)
#     settings = sorted(settings, key=lambda x: x.get("settings_doc", ""))

#     final_results = []

#     # ✅ Periods
#     current_formatted = get_accounting_period_from_month(month, financial_year)
#     prev_formatted = get_accounting_period_from_month(month, previous_financial_year)

#     current_grouped = get_grouped_actuals(
#         fiscal_year=current_formatted.get("fiscal_year"),
#         accounting_period=current_formatted.get("accounting_period")
#     ).get("data", [])

#     prev_grouped = get_grouped_actuals(
#         fiscal_year=prev_formatted.get("fiscal_year"),
#         accounting_period=prev_formatted.get("accounting_period")
#     ).get("data", [])

#     # 🔁 MAIN LOOP
#     for s in settings:

#         units = safe_join(s.get("units"))
#         cost_centers = safe_join(s.get("cost_centers"))
#         locations = safe_join(s.get("locations"))
#         cost_centers_erp = safe_join(s.get("cost_centers_erp"))
#         locations_erp = safe_join(s.get("locations_erp"))

#         for combo in s.get("combination_settings", []):

#             # 🔹 CURRENT YEAR
#             actuals_data = get_combined_actuals(
#                 financial_year=financial_year,
#                 month=month,
#                 unit=units,
#                 cost_center=cost_centers,
#                 location_code=locations,
#                 erp_cost_center_value=cost_centers_erp,
#                 erp_loc_value=locations_erp,
#                 grouped_actuals_data=current_grouped
#             )

#             actuals_data = calculate_totals(actuals_data)
#             totals = calculate_grand_total(actuals_data)

#             # ✅ push grand total inside actuals
#             actuals_data.append({
#                 "name": "GRAND TOTAL",
#                 "sequence_id": 9999,
#                 "sub_heads": [],
#                 "items": [],
#                 "ytd": totals["grand_total_ytd"],
#                 "total_posted_amt_ytd": totals["grand_total_actual"]
#             })

#             # 🔹 PREVIOUS YEAR
#             previous_actuals = get_combined_actuals(
#                 financial_year=previous_financial_year,
#                 month=month,
#                 unit=units,
#                 cost_center=cost_centers,
#                 location_code=locations,
#                 erp_cost_center_value=cost_centers_erp,
#                 erp_loc_value=locations_erp,
#                 grouped_actuals_data=prev_grouped
#             )

#             previous_actuals = calculate_totals(previous_actuals)
#             previous_totals = calculate_grand_total(previous_actuals)

#             # ✅ push grand total inside previous_actuals
#             previous_actuals.append({
#                 "name": "GRAND TOTAL",
#                 "sequence_id": 9999,
#                 "sub_heads": [],
#                 "items": [],
#                 "ytd": previous_totals["grand_total_ytd"],
#                 "total_posted_amt_ytd": previous_totals["grand_total_actual"]
#             })

#             # ✅ Append result (NO root totals)
#             final_results.append({
#                 "settings_doc": s.get("settings_doc"),
#                 "label": s.get("label"),

#                 "table_name": combo.get("table_name"),
#                 "sequence_id": combo.get("sequence_id"),
#                 "is_this_sub_item": combo.get("is_this_sub_item"),

#                 "units": units,
#                 "cost_centers": cost_centers,
#                 "locations": locations,
#                 "cost_centers_erp": cost_centers_erp,
#                 "locations_erp": locations_erp,

#                 "actuals": actuals_data,
#                 "previous_actuals": previous_actuals
#             })

#     final_results = sorted(final_results, key=lambda x: x.get("sequence_id", 0))

#     return final_results



import frappe

@frappe.whitelist(allow_guest=True)
def get_headcount(financial_year=None):
    filters = {}

    if financial_year:
        try:
            # Step 1: Get last 3 financial years including selected one
            fy_list = frappe.get_all(
                "Financial Year List",
                fields=["name"],
                order_by="creation desc"
            )

            # Step 2: Find index of selected FY
            fy_names_all = [fy["name"] for fy in fy_list]

            if financial_year in fy_names_all:
                index = fy_names_all.index(financial_year)

                # Get selected + previous 2
                fy_names = fy_names_all[index:index+3]
            else:
                fy_names = [financial_year]

            # Apply filter
            filters["financial_year"] = ["in", fy_names]

        except Exception as e:
            frappe.log_error(frappe.get_traceback(), "Headcount API Error")
            return {
                "status": "error",
                "message": str(e)
            }

    # Step 3: Fetch Headcount records
    docs = frappe.get_all(
        "Headcount",
        filters=filters,
        fields=["name", "financial_year", "total_head_count"],
        order_by="creation desc"
    )

    # Step 4: Fetch child table data
    for doc in docs:
        units = frappe.get_all(
            "Headcount Operating Units",
            filters={
                "parent": doc["name"],
                "parenttype": "Headcount"
            },
            fields=["unit", "total_headcount", "unit_description"]
        )

        doc["units"] = units

    return {
        "status": "success",
        "data": docs
    }