import frappe
import requests
import xmltodict
import xml.etree.ElementTree as ET
from collections import defaultdict

# ! =======================================================  Actuals API Testing server  ================================================================================
@frappe.whitelist(allow_guest=True)
def get_actuals_from_erp(fiscal_year, accounting_period):

    doc = frappe.get_single("ERP Credentials")
    print(doc)
    # PEOPLESOFT_USER = doc.user_name
    # PEOPLESOFT_PASSWORD = doc.password
    PEOPLESOFT_USER = "MISUSER"
    PEOPLESOFT_PASSWORD = "[REDACTED-CREDENTIAL]"

    base_url = (
        "https://erp.azimpremjifoundation.org:8663/PSIGW/RESTListeningConnector/"
        "PSFT_EP/ExecuteQuery.v1/PUBLIC/Z_MIS_ACTUALS/XMLP/NONFILE"
    )
    prompt_value = f"{fiscal_year},{accounting_period}"

    api_url = (
        f"{base_url}"
        f"?isconnectedquery=N"
        f"&maxrows=100000"
        f"&prompt_uniquepromptname=FISCAL_YEAR,ACCOUNTING_PERIOD"
        f"&prompt_fieldvalue={prompt_value}"
    )

    headers = {
        "Accept": "application/xml"
    }
    try:
        response = requests.get(
            api_url,
            headers=headers,
            auth=(PEOPLESOFT_USER, PEOPLESOFT_PASSWORD),
            timeout=120,
            verify=False
        )

        if response.status_code != 200:
            return {
                "status": "failed",
                "status_code": response.status_code,
                "error": response.text,
                "url": api_url
            }

        xml_data = xmltodict.parse(response.text)

        rows = (
            xml_data
            .get("QAS_GETQUERYRESULTS_RESP_MSG", {})
            .get("query", {})
            .get("row", [])
        )
        if isinstance(rows, dict):
            rows = [rows]

        def keys_to_lower(obj):
            if isinstance(obj, dict):
                return {k.lower(): keys_to_lower(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [keys_to_lower(i) for i in obj]
            else:
                return obj

        rows = keys_to_lower(rows)

        return {
            "status": "success",
            "params": {
                "fiscal_year": fiscal_year,
                "accounting_period": accounting_period
            },
            "data": rows
        }

    except Exception:
        frappe.log_error(
            title="PeopleSoft API Dynamic Fetch Error",
            message=frappe.get_traceback()
        )
        return {
            "status": "failed",
            "error": "Unexpected error occurred"
        }

# * ==============================================================  Actual API Prod  =====================================================================================
# @frappe.whitelist(allow_guest=True)
# def get_actuals_from_erp_prod(fiscal_year, accounting_period):
#     try:
#         doc = frappe.get_single("ERP Credentials")

#         username ="MISUSER"
#         password = "[REDACTED-CREDENTIAL]"

#         base_url = (
#             "https://pserp.azimpremjifoundation.org:8053/"
#             "PSIGW/RESTListeningConnector/"
#             "PSFT_EP/ExecuteQuery.v1/PUBLIC/"
#             "Z_MIS_ACTUALS/XMLP/NONFILE"
#         )

#         prompt_value = f"{fiscal_year},{accounting_period}"

#         api_url = (
#             f"{base_url}"
#             f"?isconnectedquery=N"
#             f"&maxrows=100000"
#             f"&prompt_uniquepromptname=FISCAL_YEAR,ACCOUNTING_PERIOD"
#             f"&prompt_fieldvalue={prompt_value}"
#         )
#         response = requests.get(
#             api_url,
#             headers={"Accept": "application/xml"},
#             auth=(username, password),
#             timeout=120
#         )

#         if response.status_code != 200:
#             return {
#                 "status": "failed",
#                 "status_code": response.status_code,
#                 "error": response.text
#             }

#         root = ET.fromstring(response.content)

#         rows = []

#         for row in root.iter():
#             if row.tag.lower().endswith("row"):
#                 row_data = {}

#                 for child in row:
#                     tag = child.tag.split("}")[-1].lower()
#                     row_data[tag] = child.text

#                 rows.append(row_data)

#         return {
#             "status": "success",
#             "fiscal_year": fiscal_year,
#             "accounting_period": accounting_period,
#             "count": len(rows),
#             "data": rows
#         }

#     except requests.exceptions.Timeout:
#         return {
#             "status": "failed",
#             "error": "Request timeout while connecting to ERP"
#         }

#     except Exception:
#         frappe.log_error(
#             title="PeopleSoft API Error",
#             message=frappe.get_traceback()
#         )
#         return {
#             "status": "failed",
#             "error": "Unexpected server error"
#         }
@frappe.whitelist(allow_guest=True)
def get_actuals_from_erp_prod(fiscal_year):
    try:
        doc = frappe.get_single("ERP Credentials")

        username = "MISUSER"
        password = "[REDACTED-CREDENTIAL]"

        base_url = (
            "https://pserp.azimpremjifoundation.org:8053/"
            "PSIGW/RESTListeningConnector/"
            "PSFT_EP/ExecuteQuery.v1/PUBLIC/"
            "Z_MIS_ACTUALS/XMLP/NONFILE"
        )

        api_url = (
            f"{base_url}"
            f"?isconnectedquery=N"
            f"&maxrows=100000"
            f"&prompt_uniquepromptname=FISCAL_YEAR"
            f"&prompt_fieldvalue={fiscal_year}"
        )

        response = requests.get(
            api_url,
            headers={"Accept": "application/xml"},
            auth=(username, password),
            timeout=120
        )

        if response.status_code != 200:
            return {
                "status": "failed",
                "status_code": response.status_code,
                "error": response.text
            }

        root = ET.fromstring(response.content)
        rows = []

        for row in root.iter():
            if row.tag.lower().endswith("row"):
                row_data = {}
                for child in row:
                    tag = child.tag.split("}")[-1].lower()
                    row_data[tag] = child.text
                rows.append(row_data)

        return {
            "status": "success",
            "fiscal_year": fiscal_year,
            "count": len(rows),
            "data": rows
        }

    except requests.exceptions.Timeout:
        return {
            "status": "failed",
            "error": "Request timeout while connecting to ERP"
        }

    except Exception:
        frappe.log_error(
            title="PeopleSoft API Error",
            message=frappe.get_traceback()
        )
        return {
            "status": "failed",
            "error": "Unexpected server error"
        }

@frappe.whitelist(allow_guest=True)
def get_erp_and_expenses(fiscal_year):

    # 1️⃣ ERP Data
    erp_response = get_actuals_from_erp_prod(fiscal_year)

    if "message" in erp_response:
        erp_data = erp_response.get("message", {})
    else:
        erp_data = erp_response

    # 2️⃣ Fetch all Expense names first
    expense_names = frappe.get_all("Expenses", pluck="name")

    expenses_with_children = []

    for name in expense_names:
        doc = frappe.get_doc("Expenses", name)

        expenses_with_children.append({
            "name": doc.name,
            "head_of_expense": doc.head_of_expense,
            "sub_head_of_expense": doc.sub_head_of_expense,
            "type_of_expense": doc.type_of_expense,
            "gl_code": doc.gl_code,

            # ✅ Child Table Values
            "sub_gl": doc.sub_gl
        })

    return {
        "status": "success",
        "erp_data": erp_data,
        "expenses": expenses_with_children
    }


# * ==============================================================  Actual API Prod Grouped Actuals Detailed Gl wise =====================================================================================
@frappe.whitelist(allow_guest=True)
def get_grouped_actuals_detailed_gl(fiscal_year):

    # --------------------------------------------------
    # 1️⃣ Fetch ERP Data
    # --------------------------------------------------
    erp_response = get_actuals_from_erp_prod(fiscal_year)

    if "message" in erp_response:
        erp_data = erp_response.get("message", {}).get("data", [])
    else:
        erp_data = erp_response.get("data", [])

    if not erp_data:
        return {"status": "success", "data": []}

    # --------------------------------------------------
    # 2️⃣ Fetch Expenses + GL Mapping
    # --------------------------------------------------
    expenses = frappe.get_all(
        "Expenses",
        fields=[
            "name",
            "head_of_expense",
            "sub_head_of_expense",
            "type_of_expense"
        ]
    )

    expense_lookup = {str(e.name): e for e in expenses}

    child_rows = frappe.get_all(
        "GL code Mapping",
        fields=["parent", "gl_code_map", "type_of_expense"]
    )

    expense_gl_map = defaultdict(list)
    gl_parent_map = {}

    for row in child_rows:
        parent = str(row.parent)
        gl = str(row.gl_code_map).strip()

        expense_gl_map[parent].append({
            "gl_code_map": gl,
            "type_of_expense": row.type_of_expense
        })

        gl_parent_map[gl] = parent

    # --------------------------------------------------
    # 3️⃣ Group ERP Data
    # --------------------------------------------------
    # Key = (parent, business_unit, deptid, operating_unit)
    grouped = defaultdict(lambda: defaultdict(float))

    for record in erp_data:

        account = str(record.get("account")).strip()
        amount = float(record.get("posted_total_amt", 0))

        if account not in gl_parent_map:
            continue

        parent = gl_parent_map[account]

        key = (
            parent,
            record.get("business_unit"),
            record.get("deptid"),
            record.get("operating_unit")
        )

        grouped[key][account] += amount

    # --------------------------------------------------
    # 4️⃣ Build Final Output
    # --------------------------------------------------
    final_output = []

    for (parent, business_unit, deptid, operating_unit), gl_totals in grouped.items():

        if parent not in expense_lookup:
            continue

        expense = expense_lookup[parent]

        sub_gl_list = []
        total_sum = 0

        for gl_info in expense_gl_map[parent]:

            gl_code = gl_info["gl_code_map"]
            gl_total = gl_totals.get(gl_code, 0)

            total_sum += gl_total

            sub_gl_list.append({
                "gl_code_map": gl_code,
                "account": gl_code,
                "type_of_expense": gl_info["type_of_expense"],
                "posted_total_amt": str(gl_total)
            })

        final_output.append({
            "business_unit": business_unit,
            "deptid": deptid,
            "operating_unit": operating_unit,
            "head_of_expense": expense.head_of_expense,
            "sub_head_of_expense": expense.sub_head_of_expense,
            "type_of_expense": expense.type_of_expense,
            "actuals_type_of_expenses": expense.type_of_expense,
            "total_posted_amt": str(total_sum),
            "sub_gl": sub_gl_list
        })

    return {
        "status": "success",
        "fiscal_year": fiscal_year,
        "data": final_output
    }

# * ==============================================================  Actual API Prod Grouped Actuals =====================================================================================
# @frappe.whitelist(allow_guest=True)
# def get_grouped_actuals(fiscal_year, accounting_period):

#     erp_response = get_actuals_from_erp_prod(fiscal_year, accounting_period)

#     if "message" in erp_response:
#         erp_data = erp_response.get("message", {}).get("data", [])
#     else:
#         erp_data = erp_response.get("data", [])

#     if not erp_data:
#         return {
#             "status": "success",
#             "fiscal_year": fiscal_year,
#             "accounting_period": accounting_period,
#             "data": []
#         }
#     expenses = frappe.get_all(
#         "Expenses",
#         fields=[
#             "name",
#             "head_of_expense",
#             "sub_head_of_expense",
#             "type_of_expense"
#         ]
#     )

#     expense_lookup = {str(e.name): e for e in expenses}

#     child_rows = frappe.get_all(
#         "GL code Mapping",
#         fields=["parent", "gl_code_map"]
#     )

#     gl_parent_map = {}

#     for row in child_rows:
#         parent = str(row.parent)
#         gl = str(row.gl_code_map).strip()
#         gl_parent_map[gl] = parent
#     grouped = defaultdict(float)

#     for record in erp_data:

#         account = str(record.get("account")).strip()
#         amount = float(record.get("posted_total_amt", 0))

#         if account not in gl_parent_map:
#             continue

#         parent = gl_parent_map[account]

#         key = (
#             parent,
#             record.get("business_unit"),
#             record.get("deptid"),
#             record.get("operating_unit")
#         )

#         grouped[key] += amount
#     final_output = []

#     for (parent, business_unit, deptid, operating_unit), total_sum in grouped.items():

#         if parent not in expense_lookup:
#             continue

#         expense = expense_lookup[parent]

#         final_output.append({
#             "business_unit": business_unit,
#             "deptid": deptid,
#             "operating_unit": operating_unit,
#             "head_of_expense": expense.head_of_expense,
#             "sub_head_of_expense": expense.sub_head_of_expense,
#             "type_of_expense": expense.type_of_expense,
#             "actuals_type_of_expenses": expense.type_of_expense,
#             "total_posted_amt": str(round(total_sum, 2))
#         })

#     return {
#         "status": "success",
#         "fiscal_year": fiscal_year,
#         "accounting_period": accounting_period,
#         "data": final_output
#     }
#     erp_response = get_actuals_from_erp_prod(fiscal_year, accounting_period)

#     if "message" in erp_response:
#         erp_data = erp_response.get("message", {}).get("data", [])
#     else:
#         erp_data = erp_response.get("data", [])

#     if not erp_data:
#         return {
#             "status": "success",
#             "fiscal_year": fiscal_year,
#             "accounting_period": accounting_period,
#             "data": []
#         }
#     expenses = frappe.get_all(
#         "Expenses",
#         fields=[
#             "name",
#             "head_of_expense",
#             "sub_head_of_expense",
#             "type_of_expense"
#         ]
#     )

#     expense_lookup = {str(e.name): e for e in expenses}

#     child_rows = frappe.get_all(
#         "GL code Mapping",
#         fields=["parent", "gl_code_map"]
#     )

#     gl_parent_map = {}

#     for row in child_rows:
#         parent = str(row.parent)
#         gl = str(row.gl_code_map).strip()
#         gl_parent_map[gl] = parent
#     grouped = defaultdict(float)

#     for record in erp_data:

#         account = str(record.get("account", "")).strip()
#         amount = float(record.get("posted_total_amt", 0) or 0)

#         if account not in gl_parent_map:
#             continue

#         parent = gl_parent_map[account]
#         expense = expense_lookup.get(parent)

#         if not expense:
#             continue

#         key = (
#             record.get("business_unit"),
#             record.get("deptid"),
#             record.get("operating_unit"),
#             expense.head_of_expense,
#             expense.sub_head_of_expense,
#             expense.type_of_expense
#         )

#         grouped[key] += amount

#     final_output = []

#     for (
#         business_unit,
#         deptid,
#         operating_unit,
#         head_of_expense,
#         sub_head_of_expense,
#         type_of_expense
#     ), total_sum in grouped.items():

#         final_output.append({
#             "business_unit": business_unit,
#             "deptid": deptid,
#             "operating_unit": operating_unit,
#             "head_of_expense": head_of_expense,
#             "sub_head_of_expense": sub_head_of_expense,
#             "type_of_expense": type_of_expense,
#             "actuals_type_of_expenses": type_of_expense,
#             "total_posted_amt": str(round(total_sum, 2))
#         })

#     return {
#         "status": "success",
#         "fiscal_year": fiscal_year,
#         "accounting_period": accounting_period,
#         "data": final_output
#     }



import frappe
from collections import defaultdict

@frappe.whitelist(allow_guest=True)
def get_grouped_actuals(fiscal_year):

    # ----------------------------
    # 1️⃣ Fetch ERP Data
    # ----------------------------
    erp_response = get_actuals_from_erp_prod(fiscal_year)

    if "message" in erp_response:
        erp_data = erp_response.get("message", {}).get("data", [])
    else:
        erp_data = erp_response.get("data", [])

    if not erp_data:
        return {
            "status": "success",
            "fiscal_year": fiscal_year,
            "data": []
        }

    # ----------------------------
    # 2️⃣ Fetch Expenses (INCLUDING sequence_id)
    # ----------------------------
    expenses = frappe.get_all(
        "Expenses",
        fields=[
            "name",
            "head_of_expense",
            "sub_head_of_expense",
            "type_of_expense",
            "sequence_id"   # 👈 from Expenses
        ]
    )

    expense_lookup = {str(e.name): e for e in expenses}

    # ----------------------------
    # 3️⃣ Fetch GL Code Mapping
    # ----------------------------
    child_rows = frappe.get_all(
        "GL code Mapping",
        fields=["parent", "gl_code_map"]
    )

    gl_parent_map = {}

    for row in child_rows:
        gl = str(row.gl_code_map).strip()
        gl_parent_map[gl] = str(row.parent)

    # ----------------------------
    # 4️⃣ Group Data
    # ----------------------------
    grouped = defaultdict(float)

    for record in erp_data:

        account = str(record.get("account", "")).strip()
        amount = float(record.get("posted_total_amt", 0) or 0)

        parent = gl_parent_map.get(account)

        if not parent:
            continue

        expense = expense_lookup.get(parent)

        if not expense:
            continue

        key = (
            record.get("business_unit"),
            record.get("deptid"),
            record.get("operating_unit"),
            expense.head_of_expense,
            expense.sub_head_of_expense,
            expense.type_of_expense,
            expense.sequence_id   # 👈 from Expenses
        )

        grouped[key] += amount

    # ----------------------------
    # 5️⃣ Prepare Output
    # ----------------------------
    final_output = []

    for (
        business_unit,
        deptid,
        operating_unit,
        head_of_expense,
        sub_head_of_expense,
        type_of_expense,
        sequence_id
    ), total_sum in grouped.items():

        final_output.append({
            "sequence_id": sequence_id,
            "business_unit": business_unit,
            "deptid": deptid,
            "operating_unit": operating_unit,
            "head_of_expense": head_of_expense,
            "sub_head_of_expense": sub_head_of_expense,
            "type_of_expense": type_of_expense,
            "actuals_type_of_expenses": type_of_expense,
            "total_posted_amt": round(total_sum, 2)
        })

    # ✅ Sort by sequence_id from Expenses
    final_output.sort(key=lambda x: (x.get("sequence_id") or 0))

    return {
        "status": "success",
        "fiscal_year": fiscal_year,
        "data": final_output
    }
