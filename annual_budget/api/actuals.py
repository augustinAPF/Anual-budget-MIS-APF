from annual_budget.api.adjustments import get_monthly_adjustments, get_monthly_adjustments_month_wise
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


# @frappe.whitelist(allow_guest=True)
# def get_actuals_from_erp_prod(fiscal_year):
#     try:
#         doc = frappe.get_single("ERP Credentials")

#         username = "MISUSER"
#         password = "[REDACTED-CREDENTIAL]"

#         base_url = (
#             "https://pserp.azimpremjifoundation.org:8053/"
#             "PSIGW/RESTListeningConnector/"
#             "PSFT_EP/ExecuteQuery.v1/PUBLIC/"
#             "Z_MIS_ACTUALS/XMLP/NONFILE"
#         )

#         api_url = (
#             f"{base_url}"
#             f"?isconnectedquery=N"
#             f"&maxrows=100000"
#             f"&prompt_uniquepromptname=FISCAL_YEAR"
#             f"&prompt_fieldvalue={fiscal_year}"
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

# @frappe.whitelist(allow_guest=True)
# def get_actuals_from_erp_prod(fiscal_year, accounting_period):
#     try:
#         username ="MISUSER"
#         password = "[REDACTED-CREDENTIAL]"

#         base_url = (
#             "https://pserp.azimpremjifoundation.org:8053/"
#             "PSIGW/RESTListeningConnector/"
#             "PSFT_EP/ExecuteQuery.v1/PUBLIC/"
#             "Z_MIS_ACTUALS/XMLP/NONFILE"
#         )

#         api_url = (
#             f"{base_url}"
#             f"?isconnectedquery=N"
#             f"&maxrows=100000"
#             f"&prompt_uniquepromptname=FISCAL_YEAR,ACCOUNTING_PERIOD"
#             f"&prompt_fieldvalue={fiscal_year},{accounting_period}"
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
# * ==============================================================  Actual API Prod with accounting period without opening balance  =====================================================================================
def get_financial_year(year):
    return f"{year}-{str(year + 1)[-2:]}"
@frappe.whitelist(allow_guest=True)
def get_actuals_from_erp_prod(fiscal_year, accounting_period):
    try:
        username = "MISUSER"
        password = "[REDACTED-CREDENTIAL]"

        base_url = (
            "https://pserp.azimpremjifoundation.org:8053/"
            "PSIGW/RESTListeningConnector/"
            "PSFT_EP/ExecuteQuery.v1/PUBLIC/"
            "Z_MIS_ACTUALS/XMLP/NONFILE"
        )

        # --------------------------------------------
        # 1️⃣ Build API URL
        # --------------------------------------------
        api_url = (
            f"{base_url}"
            f"?isconnectedquery=N"
            f"&maxrows=100000"
            f"&prompt_uniquepromptname=FISCAL_YEAR,ACCOUNTING_PERIOD"
            f"&prompt_fieldvalue={fiscal_year},{accounting_period}"
        )

        # --------------------------------------------
        # 2️⃣ Call ERP API
        # --------------------------------------------
        response = requests.get(
            api_url,
            headers={"Accept": "application/xml"},
            auth=(username, password),
            timeout=120
        )

        if response.status_code != 200:
            frappe.log_error("ERP HTTP Error", response.text)
            erp_rows = []
        else:
            # --------------------------------------------
            # 3️⃣ Parse XML
            # --------------------------------------------
            try:
                root = ET.fromstring(response.content)
            except ET.ParseError:
                frappe.log_error("XML Parse Error", response.text)
                erp_rows = []
            else:
                erp_rows = []

                for row_elem in root.iter():
                    if row_elem.tag.lower().endswith("row"):
                        row_data = {}

                        for child in row_elem:
                            tag = child.tag.split("}")[-1].lower()
                            row_data[tag] = child.text

                        erp_rows.append(row_data)

        # --------------------------------------------
        # 4️⃣ Get Frappe Grouped Data
        # --------------------------------------------
        print(get_financial_year(fiscal_year),"year")
        frappe_rows = get_monthly_adjustments(
            get_financial_year(fiscal_year),accounting_period
        )

        # --------------------------------------------
        # 5️⃣ Combine ERP + Frappe
        # --------------------------------------------
        combined_rows = []
        combined_rows.extend(erp_rows)
        combined_rows.extend(frappe_rows)

        # --------------------------------------------
        # 6️⃣ Final Response
        # --------------------------------------------
        return {
            "status": "success",
            "fiscal_year": fiscal_year,
            "accounting_period": accounting_period,
            "count": len(combined_rows),
            "data": combined_rows
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



# @frappe.whitelist(allow_guest=True)
# def get_actuals_from_erp_prod(fiscal_year, accounting_period):
#     try:
#         username ="MISUSER"
#         password = "[REDACTED-CREDENTIAL]"

#         base_url = (
#             "https://pserp.azimpremjifoundation.org:8053/"
#             "PSIGW/RESTListeningConnector/"
#             "PSFT_EP/ExecuteQuery.v1/PUBLIC/"
#             "Z_MIS_ACTUALS/XMLP/NONFILE"
#         )

#         # Build with both fiscal year and accounting period
#         api_url = (
#             f"{base_url}"
#             f"?isconnectedquery=N"
#             f"&maxrows=100000"
#             f"&prompt_uniquepromptname=FISCAL_YEAR,ACCOUNTING_PERIOD"
#             f"&prompt_fieldvalue={fiscal_year},{accounting_period}"
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

#         for row_elem in root.iter():
#             if row_elem.tag.lower().endswith("row"):
#                 row_data = {}
#                 for child in row_elem:
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

# * ==============================================================  Actual API Prod With accounting period with openning balance=====================================================================================
# @frappe.whitelist(allow_guest=True)
# def get_actuals_from_erp_month_wise(fiscal_year, accounting_period):
#     try:
#         username ="MISUSER"
#         password = "[REDACTED-CREDENTIAL]"
#         if not username or not password:
#             frappe.throw("ERP credentials are not configured in site_config.json")
#         base_url = (
#             "https://pserp.azimpremjifoundation.org:8053/"
#             "PSIGW/RESTListeningConnector/"
#             "PSFT_EP/ExecuteQuery.v1/PUBLIC/"
#             "Z_MIS_ACTUALS_BY_PERIOD/XMLP/NONFILE"
#         )

#         # -----------------------------------------------------
#         # 3️⃣ Build URL With Parameters
#         # -----------------------------------------------------
#         api_url = (
#             f"{base_url}"
#             f"?isconnectedquery=N"
#             f"&maxrows=100000"
#             f"&prompt_uniquepromptname=FISCAL_YEAR,ACCOUNTING_PERIOD"
#             f"&prompt_fieldvalue={fiscal_year},{accounting_period}"
#         )

#         # -----------------------------------------------------
#         # 4️⃣ Call ERP API
#         # -----------------------------------------------------
#         response = requests.get(
#             api_url,
#             headers={"Accept": "application/xml"},
#             auth=(username, password),
#             timeout=120
#         )

#         # -----------------------------------------------------
#         # 5️⃣ Handle HTTP Errors
#         # -----------------------------------------------------
#         if response.status_code != 200:
#             frappe.log_error(
#                 title="PeopleSoft API HTTP Error",
#                 message=response.text
#             )
#             return {
#                 "status": "failed",
#                 "status_code": response.status_code,
#                 "error": response.text
#             }

#         # -----------------------------------------------------
#         # 6️⃣ Parse XML Response
#         # -----------------------------------------------------
#         try:
#             root = ET.fromstring(response.content)
#         except ET.ParseError:
#             frappe.log_error(
#                 title="PeopleSoft XML Parse Error",
#                 message=response.text
#             )
#             return {
#                 "status": "failed",
#                 "error": "Invalid XML response from ERP"
#             }

#         rows = []

#         for row_elem in root.iter():
#             if row_elem.tag.lower().endswith("row"):
#                 row_data = {}

#                 for child in row_elem:
#                     tag = child.tag.split("}")[-1].lower()
#                     row_data[tag] = child.text

#                 rows.append(row_data)

#         # -----------------------------------------------------
#         # 7️⃣ Success Response
#         # -----------------------------------------------------
#         return {
#             "status": "success",
#             "fiscal_year": fiscal_year,
#             "accounting_period": accounting_period,
#             "count": len(rows),
#             "data": rows
#         }

#     except requests.exceptions.Timeout:
#         frappe.log_error(
#             title="PeopleSoft Timeout",
#             message="ERP request timed out"
#         )
#         return {
#             "status": "failed",
#             "error": "Request timeout while connecting to ERP"
#         }

#     except Exception:
#         frappe.log_error(
#             title="PeopleSoft API Unexpected Error",
#             message=frappe.get_traceback()
#         )
#         return {
#             "status": "failed",
#             "error": "Unexpected server error"
#         }



import frappe
import requests
import xml.etree.ElementTree as ET


@frappe.whitelist(allow_guest=True)
def get_actuals_from_erp_month_wise(fiscal_year, accounting_period):

    try:
        username = "MISUSER"
        password = "[REDACTED-CREDENTIAL]"

        if not username or not password:
            frappe.throw("ERP credentials are not configured")

        base_url = (
            "https://pserp.azimpremjifoundation.org:8053/"
            "PSIGW/RESTListeningConnector/"
            "PSFT_EP/ExecuteQuery.v1/PUBLIC/"
            "Z_MIS_ACTUALS_BY_PERIOD/XMLP/NONFILE"
        )

        # --------------------------------------------
        # 1️⃣ Build URL
        # --------------------------------------------
        api_url = (
            f"{base_url}"
            f"?isconnectedquery=N"
            f"&maxrows=100000"
            f"&prompt_uniquepromptname=FISCAL_YEAR,ACCOUNTING_PERIOD"
            f"&prompt_fieldvalue={fiscal_year},{accounting_period}"
        )

        # --------------------------------------------
        # 2️⃣ Call ERP API
        # --------------------------------------------
        response = requests.get(
            api_url,
            headers={"Accept": "application/xml"},
            auth=(username, password),
            timeout=120
        )

        if response.status_code != 200:
            frappe.log_error("ERP HTTP Error", response.text)
            erp_rows = []
        else:
            # --------------------------------------------
            # 3️⃣ Parse XML
            # --------------------------------------------
            try:
                root = ET.fromstring(response.content)
            except ET.ParseError:
                frappe.log_error("XML Parse Error", response.text)
                erp_rows = []
            else:
                erp_rows = []

                for row_elem in root.iter():
                    if row_elem.tag.lower().endswith("row"):
                        row_data = {}

                        for child in row_elem:
                            tag = child.tag.split("}")[-1].lower()
                            row_data[tag] = child.text

                        erp_rows.append(row_data)

        # --------------------------------------------
        # 4️⃣ Get Frappe Grouped Data
        # --------------------------------------------
        frappe_rows = get_monthly_adjustments_month_wise(
            fiscal_year,accounting_period
        )

        # --------------------------------------------
        # 5️⃣ 🔥 COMBINE BOTH
        # --------------------------------------------
        combined_rows = []
        combined_rows.extend(erp_rows)
        combined_rows.extend(frappe_rows)

        # --------------------------------------------
        # 6️⃣ Final Response
        # --------------------------------------------
        return {
            "status": "success",
            "fiscal_year": fiscal_year,
            "accounting_period": accounting_period,
            "count": len(combined_rows),
            "data": combined_rows
        }

    except requests.exceptions.Timeout:
        frappe.log_error("ERP Timeout", "Request timed out")
        return {
            "status": "failed",
            "error": "Request timeout while connecting to ERP"
        }

    except Exception:
        frappe.log_error("API Error", frappe.get_traceback())
        return {
            "status": "failed",
            "error": "Unexpected server error"
        }




import requests
import xml.etree.ElementTree as ET

@frappe.whitelist(allow_guest=True)
def get_erp_actuals_grouped_by_dimensions(fiscal_year, accounting_period):
    try:
        username = "MISUSER"
        password = "[REDACTED-CREDENTIAL]"

        base_url = (
            "https://pserp.azimpremjifoundation.org:8053/"
            "PSIGW/RESTListeningConnector/"
            "PSFT_EP/ExecuteQuery.v1/PUBLIC/"
            "Z_MIS_ACTUALS_BY_PERIOD/XMLP/NONFILE"
        )

        api_url = (
            f"{base_url}"
            f"?isconnectedquery=N"
            f"&maxrows=100000"
            f"&prompt_uniquepromptname=FISCAL_YEAR,ACCOUNTING_PERIOD"
            f"&prompt_fieldvalue={fiscal_year},{12}"
        )

        response = requests.get(
            api_url,
            headers={"Accept": "application/xml"},
            auth=(username, password),
            timeout=120
        )

        if response.status_code != 200:
            frappe.log_error("PeopleSoft API HTTP Error", response.text)
            return {
                "status": "failed",
                "status_code": response.status_code,
                "error": response.text
            }

        try:
            root = ET.fromstring(response.content)
        except ET.ParseError:
            frappe.log_error("PeopleSoft XML Parse Error", response.text)
            return {"status": "failed", "error": "Invalid XML response from ERP"}

        # -----------------------------------------
        # Aggregation Dictionary (Optimized)
        # -----------------------------------------
        grouped = {}

        for row_elem in root.iter():
            if not row_elem.tag.lower().endswith("row"):
                continue

            row_data = {}
            for child in row_elem:
                tag = child.tag.split("}")[-1].lower()
                row_data[tag] = child.text

            key = (
                row_data.get("business_unit"),
                row_data.get("account"),
                row_data.get("deptid"),
                row_data.get("operating_unit"),
                row_data.get("accounting_period")
            )

            amt = float(row_data.get("posted_total_amt") or 0)

            if key not in grouped:
                grouped[key] = {
                    "business_unit": key[0],
                    "account": key[1],
                    "deptid": key[2],
                    "operating_unit": key[3],
                    "accounting_period": key[4],
                    "posted_total_amt": amt
                }
            else:
                grouped[key]["posted_total_amt"] += amt

        result = list(grouped.values())

        return {
            "status": "success",
            "fiscal_year": fiscal_year,
            "accounting_period": accounting_period,
            "count": len(result),
            "data": result
        }

    except requests.exceptions.Timeout:
        frappe.log_error("PeopleSoft Timeout", "ERP request timed out")
        return {"status": "failed", "error": "Request timeout while connecting to ERP"}

    except Exception:
        frappe.log_error("PeopleSoft API Unexpected Error", frappe.get_traceback())
        return {"status": "failed", "error": "Unexpected server error"}

#         import frappe
# import requests
# import xml.etree.ElementTree as ET


# @frappe.whitelist(allow_guest=True)
# def fetch_erp_actuals_by_period(fiscal_year, accounting_period):
#     try:
#         username = "MISUSER"
#         password = "[REDACTED-CREDENTIAL]"

#         base_url = (
#             "https://pserp.azimpremjifoundation.org:8053/"
#             "PSIGW/RESTListeningConnector/"
#             "PSFT_EP/ExecuteQuery.v1/PUBLIC/"
#             "Z_MIS_ACTUALS_BY_PERIOD/XMLP/NONFILE"
#         )

#         api_url = (
#             f"{base_url}"
#             f"?isconnectedquery=N"
#             f"&maxrows=100000"
#             f"&prompt_uniquepromptname=FISCAL_YEAR,ACCOUNTING_PERIOD"
#             f"&prompt_fieldvalue={fiscal_year},{accounting_period}"
#         )

#         response = requests.get(
#             api_url,
#             headers={"Accept": "application/xml"},
#             auth=(username, password),
#             timeout=120
#         )

#         if response.status_code != 200:
#             frappe.log_error("PeopleSoft API HTTP Error", response.text)
#             return {
#                 "status": "failed",
#                 "status_code": response.status_code,
#                 "error": response.text
#             }

#         try:
#             root = ET.fromstring(response.content)
#         except ET.ParseError:
#             frappe.log_error("PeopleSoft XML Parse Error", response.text)
#             return {"status": "failed", "error": "Invalid XML response from ERP"}

#         rows = []

#         # Parse XML rows
#         for row_elem in root.iter():
#             if not row_elem.tag.lower().endswith("row"):
#                 continue

#             row_data = {}

#             for child in row_elem:
#                 tag = child.tag.split("}")[-1].lower()
#                 row_data[tag] = child.text

#             rows.append(row_data)

#         return {
#             "status": "success",
#             "fiscal_year": fiscal_year,
#             "accounting_period": accounting_period,
#             "count": len(rows),
#             "data": rows
#         }

#     except requests.exceptions.Timeout:
#         frappe.log_error("PeopleSoft Timeout", "ERP request timed out")
#         return {
#             "status": "failed",
#             "error": "Request timeout while connecting to ERP"
#         }

#     except Exception:
#         frappe.log_error("PeopleSoft API Unexpected Error", frappe.get_traceback())
#         return {
#             "status": "failed",
#             "error": "Unexpected server error"
#         }
    



# * ==============================================================  Actual API Prod with accounting period  =====================================================================================

@frappe.whitelist(allow_guest=True)
def get_erp_and_expenses(fiscal_year,accounting_period):

    # 1️⃣ ERP Data
    erp_response = get_actuals_from_erp_prod(fiscal_year,accounting_period)

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
def get_grouped_actuals_detailed_gl(fiscal_year,accounting_period):

    # --------------------------------------------------
    # 1️⃣ Fetch ERP Data
    # --------------------------------------------------
    erp_response = get_actuals_from_erp_prod(fiscal_year,accounting_period)

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
def get_grouped_actuals(fiscal_year,accounting_period):

    # ----------------------------
    # 1️⃣ Fetch ERP Data
    # ----------------------------
    erp_response = get_actuals_from_erp_prod(fiscal_year,accounting_period)

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


@frappe.whitelist(allow_guest=True)
def get_grouped_actuals_month_wise(fiscal_year, accounting_period):

    # ----------------------------
    # 1️⃣ Fetch ERP Data
    # ----------------------------
    erp_response = get_erp_actuals_grouped_by_dimensions(fiscal_year, accounting_period)

    if "message" in erp_response:
        erp_data = erp_response.get("message", {}).get("data", [])
    else:
        erp_data = erp_response.get("data", [])

    if not erp_data:
        return {
            "status": "success",
            "fiscal_year": fiscal_year,
            "accounting_period": accounting_period,
            "data": [],
            "count": 0
        }

    # ----------------------------
    # 2️⃣ Fetch Expenses
    # ----------------------------
    expenses = frappe.get_all(
        "Expenses",
        fields=[
            "name",
            "head_of_expense",
            "sub_head_of_expense",
            "type_of_expense",
            "sequence_id"
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

    gl_parent_map = {str(row.gl_code_map).strip(): str(row.parent) for row in child_rows}

    # ----------------------------
    # 4️⃣ Group Data
    # ----------------------------
    from collections import defaultdict
    grouped = defaultdict(float)

    for record in erp_data:

        account = str(record.get("account", "")).strip()
        period = record.get("accounting_period")   # 👈 get actual ERP period
        amount = float(record.get("posted_total_amt", 0) or 0)

        parent = gl_parent_map.get(account)
        if not parent:
            continue

        expense = expense_lookup.get(parent)
        if not expense:
            continue

        key = (
            period,   # 👈 important
            record.get("business_unit"),
            record.get("deptid"),
            record.get("operating_unit"),
            account,
            expense.head_of_expense,
            expense.sub_head_of_expense,
            expense.type_of_expense,
            expense.sequence_id
        )

        grouped[key] += amount

    # ----------------------------
    # 5️⃣ Prepare Output
    # ----------------------------
    final_output = []

    for (
        period,
        business_unit,
        deptid,
        operating_unit,
        account,
        head_of_expense,
        sub_head_of_expense,
        type_of_expense,
        sequence_id
    ), total_sum in grouped.items():

        final_output.append({
            "sequence_id": sequence_id,
            "accounting_period": period,  # 👈 actual period
            "account": account,
            "business_unit": business_unit,
            "deptid": deptid,
            "operating_unit": operating_unit,
            "head_of_expense": head_of_expense,
            "sub_head_of_expense": sub_head_of_expense,
            "type_of_expense": type_of_expense,
            "actuals_type_of_expenses": type_of_expense,
            "total_posted_amt": round(total_sum, 2)
        })

    # ----------------------------
    # 6️⃣ Sort by sequence_id
    # ----------------------------
    final_output.sort(key=lambda x: (x.get("sequence_id") or 0))

    return {
        "status": "success",
        "fiscal_year": fiscal_year,
        "accounting_period": accounting_period,
        "data": final_output,
        "count": len(final_output)
    }



@frappe.whitelist(allow_guest=True)
def get_grouped_actuals_quarter_wise(fiscal_year, accounting_period):
    try:
        response = get_actuals_from_erp_month_wise(fiscal_year, accounting_period)

        # Handle wrapped/unwrapped response
        if "message" in response:
            response = response["message"]

        if response.get("status") != "success":
            return {
                "status": "error",
                "message": response.get("message", "ERP returned error")
            }

        data = response.get("data", [])

        grouped_data = defaultdict(float)

        for row in data:
            period = row.get("accounting_period")

            # Skip period 0
            if period == "0":
                continue

            period = int(period)

            # Determine quarter
            if 1 <= period <= 3:
                quarter = "Q1"
            elif 4 <= period <= 6:
                quarter = "Q2"
            elif 7 <= period <= 9:
                quarter = "Q3"
            elif 10 <= period <= 12:
                quarter = "Q4"
            else:
                continue  # skip invalid periods

            key = (row.get("account"), quarter)

            grouped_data[key] += float(row.get("posted_total_amt", 0))

        result = []
        for (account, quarter), total in grouped_data.items():
            result.append({
                "account": account,
                "quarter": quarter,
                "posted_total_amt": round(total, 2)
            })

        return {
            "status": "success",
            "count": len(result),
            "data": result
        }

    except Exception:
        frappe.log_error(frappe.get_traceback(), "Quarter Wise Grouping Error")
        return {
            "status": "error",
            "message": "Unexpected server error"
        }






# @frappe.whitelist(allow_guest=True)
# def get_grouped_actuals_detailed_gl_test(fiscal_year, accounting_period):

#     from collections import defaultdict

#     try:
#         response = get_actuals_from_erp_month_wise(fiscal_year, accounting_period)

#         if "message" in response:
#             response = response["message"]

#         if response.get("status") != "success":
#             return {"status": "error", "message": "ERP Error"}

#         erp_data = response.get("data", [])

#         if not erp_data:
#             return {"status": "success", "data": []}

#         # --------------------------------------------------
#         # Expense + GL Mapping
#         # --------------------------------------------------
#         expenses = frappe.get_all(
#             "Expenses",
#             fields=["name", "head_of_expense",
#                     "sub_head_of_expense", "type_of_expense"]
#         )

#         expense_lookup = {str(e.name): e for e in expenses}

#         child_rows = frappe.get_all(
#             "GL code Mapping",
#             fields=["parent", "gl_code_map"]
#         )

#         gl_parent_map = {}
#         for row in child_rows:
#             gl_parent_map[str(row.gl_code_map).strip()] = str(row.parent)

#         # --------------------------------------------------
#         # Quarter Helper
#         # --------------------------------------------------
#         def get_quarter(period):
#             return f"Q{((period - 1) // 3) + 1}"

#         def two_dec(val):
#             return float(f"{val:.2f}")

#         # --------------------------------------------------
#         # Group Structure
#         # --------------------------------------------------
#         grouped = defaultdict(lambda: {
#             "Q1": 0.0, "Q2": 0.0, "Q3": 0.0, "Q4": 0.0,
#             "gl": defaultdict(lambda: {
#                 "Q1": 0.0, "Q2": 0.0, "Q3": 0.0, "Q4": 0.0
#             })
#         })

#         # --------------------------------------------------
#         # Group ERP Data
#         # --------------------------------------------------
#         for row in erp_data:

#             period = row.get("accounting_period")
#             if not period or period == "0":
#                 continue

#             try:
#                 period = int(period)
#             except:
#                 continue

#             quarter = get_quarter(period)

#             account = str(row.get("account")).strip()
#             amount = float(row.get("posted_total_amt") or 0)

#             if account not in gl_parent_map:
#                 continue

#             parent = gl_parent_map[account]

#             grouped[parent][quarter] += amount
#             grouped[parent]["gl"][account][quarter] += amount

#         # --------------------------------------------------
#         # Build Final Output
#         # --------------------------------------------------
#         final_output = []
#         sequence_id = 1

#         for parent, values in grouped.items():

#             if parent not in expense_lookup:
#                 continue

#             expense = expense_lookup[parent]

#             # Expense Total
#             expense_total = (
#                 values["Q1"] + values["Q2"] +
#                 values["Q3"] + values["Q4"]
#             )

#             sub_gl_list = []
#             gl_sequence = 1

#             for gl_code, gl_values in values["gl"].items():

#                 gl_total = (
#                     gl_values["Q1"] + gl_values["Q2"] +
#                     gl_values["Q3"] + gl_values["Q4"]
#                 )

#                 sub_gl_list.append({
#                     "sequence_id": gl_sequence,
#                     "gl_code_map": gl_code,
#                     "Q1": two_dec(gl_values["Q1"]),
#                     "Q2": two_dec(gl_values["Q2"]),
#                     "Q3": two_dec(gl_values["Q3"]),
#                     "Q4": two_dec(gl_values["Q4"]),
#                     "total_posted_amount": two_dec(gl_total)
#                 })

#                 gl_sequence += 1

#             final_output.append({
#                 "sequence_id": sequence_id,
#                 "head_of_expense": expense.head_of_expense,
#                 "sub_head_of_expense": expense.sub_head_of_expense,
#                 "type_of_expense": expense.type_of_expense,
#                 "Q1": two_dec(values["Q1"]),
#                 "Q2": two_dec(values["Q2"]),
#                 "Q3": two_dec(values["Q3"]),
#                 "Q4": two_dec(values["Q4"]),
#                 "total_posted_amount": two_dec(expense_total),
#                 "sub_gl": sub_gl_list
#             })

#             sequence_id += 1

#         return {
#             "status": "success",
#             "fiscal_year": fiscal_year,
#             "data": final_output
#         }

#     except Exception:
#         frappe.log_error(frappe.get_traceback(),
#                          "Detailed GL Quarter Wise Error")
#         return {"status": "error", "message": "Server Error"}


# @frappe.whitelist(allow_guest=True)
# def get_grouped_actuals_detailed_gl_test(fiscal_year, accounting_period):

#     from decimal import Decimal
#     import re
#     import traceback

#     try:
#         # ============================================================
#         # Helpers
#         # ============================================================
#         def _num(x):
#             if x is None:
#                 return 0.0
#             try:
#                 return float(Decimal(str(x)))
#             except Exception:
#                 return 0.0

#         def normalize(text):
#             return re.sub(r"\s+", " ", str(text or "")).strip().upper()

#         def get_quarter(period):
#             return f"Q{((period - 1) // 3) + 1}"

#         # ============================================================
#         # Fetch ERP Data
#         # ============================================================
#         response = get_actuals_from_erp_month_wise(
#             fiscal_year, accounting_period
#         )

#         if "message" in response:
#             response = response["message"]

#         if response.get("status") != "success":
#             return {"status": "error", "message": "ERP Error"}

#         erp_data = response.get("data") or []

#         if not erp_data:
#             return {"status": "success", "data": []}

#         # ============================================================
#         # Fetch Expenses
#         # ============================================================
#         expense_rows = frappe.db.get_all(
#             "Expenses",
#             fields=[
#                 "name",
#                 "head_of_expense",
#                 "sub_head_of_expense",
#                 "type_of_expense",
#                 "sequence_id"
#             ]
#         ) or []

#         sequence_map = {}
#         expense_lookup = {}

#         for e in expense_rows:

#             name = str(e.get("name") or "").strip()
#             seq = int(e.get("sequence_id")) if e.get("sequence_id") else 9999

#             head = normalize(e.get("head_of_expense"))
#             sub = normalize(e.get("sub_head_of_expense"))
#             item = normalize(e.get("type_of_expense"))

#             if head:
#                 sequence_map[head] = seq
#             if sub:
#                 sequence_map[sub] = seq
#             if item:
#                 sequence_map[item] = seq

#             if name:
#                 expense_lookup[name] = e

#         # ============================================================
#         # GL Mapping
#         # ============================================================
#         child_rows = frappe.get_all(
#             "GL code Mapping",
#             fields=["parent", "gl_code_map"]
#         ) or []

#         gl_parent_map = {}

#         for row in child_rows:
#             gl = str(row.get("gl_code_map") or "").strip()
#             parent = str(row.get("parent") or "").strip()
#             if gl and parent:
#                 gl_parent_map[gl] = parent

#         # ============================================================
#         # Structure
#         # ============================================================
#         TOP_LEVEL_HEADS = [
#             "CAPITAL EXPENSES",
#             "OPERATING EXPENSES"
#         ]

#         heads = {}

#         # ============================================================
#         # Process ERP Rows
#         # ============================================================
#         for row in erp_data:

#             try:
#                 period = row.get("accounting_period")
#                 if not period:
#                     continue

#                 period = int(period)
#                 quarter = get_quarter(period)

#                 account = str(row.get("account") or "").strip()
#                 amount = _num(row.get("posted_total_amt"))

#                 if not account or account not in gl_parent_map:
#                     continue

#                 parent_expense = gl_parent_map.get(account)
#                 expense = expense_lookup.get(parent_expense)

#                 if not expense:
#                     continue

#                 raw_head = normalize(expense.get("head_of_expense"))
#                 sub = normalize(expense.get("sub_head_of_expense"))
#                 item = str(expense.get("type_of_expense") or "UNKNOWN ITEM").strip()

#                 # Determine correct top-level head
#                 if raw_head in TOP_LEVEL_HEADS:
#                     parent_head = raw_head
#                 else:
#                     parent_head = "OPERATING EXPENSES"
#                     sub = raw_head

#                 # Initialize head
#                 if parent_head not in heads:
#                     heads[parent_head] = {
#                         "name": parent_head,
#                         "sequence_id": sequence_map.get(parent_head, 9999),
#                         "Q1": 0.0, "Q2": 0.0,
#                         "Q3": 0.0, "Q4": 0.0,
#                         "items": {},
#                         "sub_heads": {}
#                     }

#                 heads[parent_head][quarter] += amount

#                 # ====================================================
#                 # CAPITAL EXPENSES
#                 # ====================================================
#                 if parent_head == "CAPITAL EXPENSES":

#                     if item not in heads[parent_head]["items"]:
#                         heads[parent_head]["items"][item] = {
#                             "name": item,
#                             "sequence_id": sequence_map.get(normalize(item), 9999),
#                             "gl_code": account,
#                             "Q1": 0.0, "Q2": 0.0,
#                             "Q3": 0.0, "Q4": 0.0
#                         }

#                     heads[parent_head]["items"][item][quarter] += amount

#                 # ====================================================
#                 # OPERATING EXPENSES
#                 # ====================================================
#                 else:

#                     if sub not in heads[parent_head]["sub_heads"]:
#                         heads[parent_head]["sub_heads"][sub] = {
#                             "name": sub,
#                             "sequence_id": sequence_map.get(sub, 9999),
#                             "Q1": 0.0, "Q2": 0.0,
#                             "Q3": 0.0, "Q4": 0.0,
#                             "items": {}
#                         }

#                     heads[parent_head]["sub_heads"][sub][quarter] += amount

#                     if item not in heads[parent_head]["sub_heads"][sub]["items"]:
#                         heads[parent_head]["sub_heads"][sub]["items"][item] = {
#                             "name": item,
#                             "sequence_id": sequence_map.get(normalize(item), 9999),
#                             "gl_code": account,
#                             "Q1": 0.0, "Q2": 0.0,
#                             "Q3": 0.0, "Q4": 0.0
#                         }

#                     heads[parent_head]["sub_heads"][sub]["items"][item][quarter] += amount

#             except Exception:
#                 continue

#         # ============================================================
#         # Sorting
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

#                 if sub["items"]:
#                     sub["sequence_id"] = min(
#                         item["sequence_id"]
#                         for item in sub["items"]
#                     )
#                 else:
#                     sub["sequence_id"] = 9999

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
#         return {
#             "status": "error",
#             "message": str(e),
#             "trace": traceback.format_exc()
#         }
        






























# @frappe.whitelist(allow_guest=True)
# def get_grouped_actuals_detailed_gl_test(fiscal_year, accounting_period):

#     from decimal import Decimal
#     import re
#     import traceback

#     try:

#         # ============================================================
#         # Helpers
#         # ============================================================
#         def _num(x):
#             try:
#                 return float(Decimal(str(x or 0)))
#             except:
#                 return 0.0

#         def normalize(text):
#             return re.sub(r"\s+", " ", str(text or "")).strip().upper()

#         def get_quarter(period):
#             return f"Q{((int(period) - 1) // 3) + 1}"

#         # ============================================================
#         # 1️⃣ FETCH ALL EXPENSES
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

#         # Build lookup by name
#         expense_lookup = {e["name"]: e for e in expense_rows}

#         # ============================================================
#         # 2️⃣ FETCH GL MAPPING
#         # ============================================================
#         gl_rows = frappe.get_all(
#             "GL code Mapping",
#             fields=["parent", "gl_code_map"]
#         ) or []

#         gl_parent_map = {}
#         for row in gl_rows:
#             gl = str(row.get("gl_code_map") or "").strip()
#             parent = str(row.get("parent") or "").strip()
#             if gl and parent:
#                 gl_parent_map[gl] = parent

#         # ============================================================
#         # 3️⃣ BUILD COMPLETE STRUCTURE FROM EXPENSES (ALL ROWS)
#         # ============================================================
#         heads = {}
#         TOP_HEADS = ["CAPITAL EXPENSES", "OPERATING EXPENSES"]

#         for e in expense_rows:

#             raw_head = normalize(e.get("head_of_expense"))
#             sub_head = normalize(e.get("sub_head_of_expense"))
#             item_name = str(e.get("type_of_expense") or "UNKNOWN ITEM").strip()
#             seq = int(e.get("sequence_id")) if e.get("sequence_id") else 9999

#             # Determine parent head correctly
#             if raw_head in TOP_HEADS:
#                 parent_head = raw_head
#             else:
#                 parent_head = "OPERATING EXPENSES"
#                 sub_head = raw_head

#             # Initialize parent head
#             if parent_head not in heads:
#                 heads[parent_head] = {
#                     "name": parent_head,
#                     "sequence_id": seq,
#                     "Q1": 0.0,
#                     "Q2": 0.0,
#                     "Q3": 0.0,
#                     "Q4": 0.0,
#                     "items": {},
#                     "sub_heads": {}
#                 }

#             # CAPITAL EXPENSES
#             if parent_head == "CAPITAL EXPENSES":

#                 heads[parent_head]["items"][item_name] = {
#                     "name": item_name,
#                     "sequence_id": seq,
#                     "gl_code": None,
#                     "Q1": 0.0,
#                     "Q2": 0.0,
#                     "Q3": 0.0,
#                     "Q4": 0.0
#                 }

#             # OPERATING EXPENSES
#             else:

#                 if sub_head not in heads[parent_head]["sub_heads"]:
#                     heads[parent_head]["sub_heads"][sub_head] = {
#                         "name": sub_head,
#                         "sequence_id": seq,
#                         "Q1": 0.0,
#                         "Q2": 0.0,
#                         "Q3": 0.0,
#                         "Q4": 0.0,
#                         "items": {}
#                     }

#                 heads[parent_head]["sub_heads"][sub_head]["items"][item_name] = {
#                     "name": item_name,
#                     "sequence_id": seq,
#                     "gl_code": None,
#                     "Q1": 0.0,
#                     "Q2": 0.0,
#                     "Q3": 0.0,
#                     "Q4": 0.0
#                 }

#         # ============================================================
#         # 4️⃣ FETCH ERP ACTUALS
#         # ============================================================
#         response = get_actuals_from_erp_month_wise(
#             fiscal_year,
#             accounting_period
#         )

#         if "message" in response:
#             response = response["message"]

#         erp_data = response.get("data") if response.get("status") == "success" else []

#         # ============================================================
#         # 5️⃣ MAP ACTUALS INTO STRUCTURE
#         # ============================================================
#         for row in erp_data:

#             try:
#                 period = row.get("accounting_period")
#                 account = str(row.get("account") or "").strip()
#                 amount = _num(row.get("posted_total_amt"))

#                 if not period or account not in gl_parent_map:
#                     continue

#                 quarter = get_quarter(period)

#                 parent_expense_name = gl_parent_map.get(account)
#                 expense = expense_lookup.get(parent_expense_name)

#                 if not expense:
#                     continue

#                 raw_head = normalize(expense.get("head_of_expense"))
#                 sub_head = normalize(expense.get("sub_head_of_expense"))
#                 item_name = str(expense.get("type_of_expense") or "").strip()

#                 if raw_head in TOP_HEADS:
#                     parent_head = raw_head
#                 else:
#                     parent_head = "OPERATING EXPENSES"
#                     sub_head = raw_head

#                 # Add to head total
#                 heads[parent_head][quarter] += amount

#                 # CAPITAL
#                 if parent_head == "CAPITAL EXPENSES":
#                     if item_name in heads[parent_head]["items"]:
#                         heads[parent_head]["items"][item_name][quarter] += amount
#                         heads[parent_head]["items"][item_name]["gl_code"] = account

#                 # OPERATING
#                 else:
#                     if sub_head in heads[parent_head]["sub_heads"]:
#                         heads[parent_head]["sub_heads"][sub_head][quarter] += amount
#                         if item_name in heads[parent_head]["sub_heads"][sub_head]["items"]:
#                             heads[parent_head]["sub_heads"][sub_head]["items"][item_name][quarter] += amount
#                             heads[parent_head]["sub_heads"][sub_head]["items"][item_name]["gl_code"] = account

#             except:
#                 continue

#         # ============================================================
#         # 6️⃣ FINAL SORTING
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
#         return {
#             "status": "error",
#             "message": str(e),
#             "trace": traceback.format_exc()
#         }


# @frappe.whitelist(allow_guest=True)
# def get_grouped_actuals_detailed_gl_test(fiscal_year, accounting_period):

#     from decimal import Decimal
#     import re
#     import traceback

#     try:

#         # -----------------------------
#         # Helpers
#         # -----------------------------
#         def _num(x):
#             try:
#                 return float(Decimal(str(x or 0)))
#             except:
#                 return 0.0

#         def normalize(text):
#             return re.sub(r"\s+", " ", str(text or "")).strip().upper()

#         def get_quarter(period):
#             return f"Q{((int(period) - 1) // 3) + 1}"

#         def empty_months():
#             return {
#                 "1": 0.0, "2": 0.0, "3": 0.0,
#                 "4": 0.0, "5": 0.0, "6": 0.0,
#                 "7": 0.0, "8": 0.0, "9": 0.0,
#                 "10": 0.0, "11": 0.0, "12": 0.0
#             }

#         # -----------------------------
#         # 1️⃣ FETCH EXPENSE MASTER
#         # -----------------------------
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

#         # -----------------------------
#         # 2️⃣ FETCH GL MAPPING
#         # -----------------------------
#         gl_rows = frappe.get_all(
#             "GL code Mapping",
#             fields=["parent", "gl_code_map"]
#         ) or []

#         gl_parent_map = {}

#         for row in gl_rows:
#             gl = str(row.get("gl_code_map") or "").strip()
#             parent = str(row.get("parent") or "").strip()
#             if gl and parent:
#                 gl_parent_map[gl] = parent

#         # -----------------------------
#         # 3️⃣ BUILD STRUCTURE
#         # -----------------------------
#         heads = {}
#         TOP_HEADS = ["CAPITAL EXPENSES", "OPERATING EXPENSES"]

#         for e in expense_rows:

#             raw_head = normalize(e.get("head_of_expense"))
#             sub_head = normalize(e.get("sub_head_of_expense"))
#             item_name = str(e.get("type_of_expense") or "UNKNOWN ITEM").strip()
#             seq = int(e.get("sequence_id")) if e.get("sequence_id") else 9999

#             if raw_head in TOP_HEADS:
#                 parent_head = raw_head
#             else:
#                 parent_head = "OPERATING EXPENSES"
#                 sub_head = raw_head

#             if parent_head not in heads:

#                 heads[parent_head] = {
#                     "name": parent_head,
#                     "sequence_id": seq,
#                     "Q1": 0.0,
#                     "Q2": 0.0,
#                     "Q3": 0.0,
#                     "Q4": 0.0,
#                     "months": empty_months(),
#                     "items": {},
#                     "sub_heads": {}
#                 }

#             # ---------------------
#             # CAPITAL EXPENSES
#             # ---------------------
#             if parent_head == "CAPITAL EXPENSES":

#                 heads[parent_head]["items"][item_name] = {
#                     "name": item_name,
#                     "sequence_id": seq,
#                     "gl_code": None,
#                     "Q1": 0.0,
#                     "Q2": 0.0,
#                     "Q3": 0.0,
#                     "Q4": 0.0,
#                     "months": empty_months()
#                 }

#             # ---------------------
#             # OPERATING EXPENSES
#             # ---------------------
#             else:

#                 if sub_head not in heads[parent_head]["sub_heads"]:

#                     heads[parent_head]["sub_heads"][sub_head] = {
#                         "name": sub_head,
#                         "sequence_id": seq,
#                         "Q1": 0.0,
#                         "Q2": 0.0,
#                         "Q3": 0.0,
#                         "Q4": 0.0,
#                         "months": empty_months(),
#                         "items": {}
#                     }

#                 heads[parent_head]["sub_heads"][sub_head]["items"][item_name] = {
#                     "name": item_name,
#                     "sequence_id": seq,
#                     "gl_code": None,
#                     "Q1": 0.0,
#                     "Q2": 0.0,
#                     "Q3": 0.0,
#                     "Q4": 0.0,
#                     "months": empty_months()
#                 }

#         # -----------------------------
#         # 4️⃣ FETCH ERP DATA
#         # -----------------------------
#         response = get_actuals_from_erp_month_wise(
#             fiscal_year,
#             accounting_period
#         )

#         if "message" in response:
#             response = response["message"]

#         erp_data = response.get("data") if response.get("status") == "success" else []

#         # -----------------------------
#         # 5️⃣ MAP ERP DATA
#         # -----------------------------
#         for row in erp_data:

#             try:

#                 period = row.get("accounting_period")
#                 account = str(row.get("account") or "").strip()
#                 amount = _num(row.get("posted_total_amt"))

#                 if not period or account not in gl_parent_map:
#                     continue

#                 quarter = get_quarter(period)
#                 month = str(period)

#                 parent_expense_name = gl_parent_map.get(account)
#                 expense = expense_lookup.get(parent_expense_name)

#                 if not expense:
#                     continue

#                 raw_head = normalize(expense.get("head_of_expense"))
#                 sub_head = normalize(expense.get("sub_head_of_expense"))
#                 item_name = str(expense.get("type_of_expense") or "").strip()

#                 if raw_head in TOP_HEADS:
#                     parent_head = raw_head
#                 else:
#                     parent_head = "OPERATING EXPENSES"
#                     sub_head = raw_head

#                 # HEAD TOTAL
#                 heads[parent_head][quarter] += amount
#                 heads[parent_head]["months"][month] += amount

#                 # -----------------
#                 # CAPITAL EXPENSE
#                 # -----------------
#                 if parent_head == "CAPITAL EXPENSES":

#                     if item_name in heads[parent_head]["items"]:

#                         heads[parent_head]["items"][item_name][quarter] += amount
#                         heads[parent_head]["items"][item_name]["months"][month] += amount
#                         heads[parent_head]["items"][item_name]["gl_code"] = account

#                 # -----------------
#                 # OPERATING EXPENSE
#                 # -----------------
#                 else:

#                     if sub_head in heads[parent_head]["sub_heads"]:

#                         sub = heads[parent_head]["sub_heads"][sub_head]

#                         sub[quarter] += amount
#                         sub["months"][month] += amount

#                         if item_name in sub["items"]:

#                             item = sub["items"][item_name]

#                             item[quarter] += amount
#                             item["months"][month] += amount
#                             item["gl_code"] = account

#             except:
#                 continue

#         # -----------------------------
#         # 6️⃣ FINAL SORTING
#         # -----------------------------
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

#         return {
#             "status": "error",
#             "message": str(e),
#             "trace": traceback.format_exc()
#         }





# @frappe.whitelist(allow_guest=True)
# def get_grouped_actuals_detailed_gl_test(fiscal_year, accounting_period):

#     try:
#         def _num(x):
#             try:
#                 return float(Decimal(str(x or 0)))
#             except:
#                 return 0.0

#         def normalize(text):
#             return re.sub(r"\s+", " ", str(text or "")).strip().upper()

#         def empty_months():
#             return {
#                 "1":0.0,"2":0.0,"3":0.0,
#                 "4":0.0,"5":0.0,"6":0.0,
#                 "7":0.0,"8":0.0,"9":0.0,
#                 "10":0.0,"11":0.0,"12":0.0
#             }

#         def calculate_quarters(obj):

#             m = obj["months"]

#             obj["Q1"] = m["4"] + m["5"] + m["6"]
#             obj["Q2"] = m["7"] + m["8"] + m["9"]
#             obj["Q3"] = m["10"] + m["11"] + m["12"]
#             obj["Q4"] = m["1"] + m["2"] + m["3"]

#         # ============================================================
#         # 1️⃣ FETCH EXPENSE MASTER
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
#         # 2️⃣ FETCH GL MAPPING
#         # ============================================================

#         gl_rows = frappe.get_all(
#             "GL code Mapping",
#             fields=["parent","gl_code_map"]
#         ) or []

#         gl_parent_map = {}

#         for row in gl_rows:
#             gl = str(row.get("gl_code_map") or "").strip()
#             parent = str(row.get("parent") or "").strip()

#             if gl and parent:
#                 gl_parent_map[gl] = parent

#         # ============================================================
#         # 3️⃣ BUILD STRUCTURE
#         # ============================================================

#         heads = {}

#         TOP_HEADS = ["CAPITAL EXPENSES","OPERATING EXPENSES"]

#         for e in expense_rows:

#             raw_head = normalize(e.get("head_of_expense"))
#             sub_head = normalize(e.get("sub_head_of_expense"))

#             item_name = str(e.get("type_of_expense") or "UNKNOWN ITEM").strip()

#             seq = int(e.get("sequence_id")) if e.get("sequence_id") else 9999

#             if raw_head in TOP_HEADS:
#                 parent_head = raw_head
#             else:
#                 parent_head = "OPERATING EXPENSES"
#                 sub_head = raw_head

#             if parent_head not in heads:

#                 heads[parent_head] = {
#                     "name":parent_head,
#                     "sequence_id":seq,
#                     "Q1":0.0,"Q2":0.0,"Q3":0.0,"Q4":0.0,
#                     "months":empty_months(),
#                     "items":{},
#                     "sub_heads":{}
#                 }

#             # CAPITAL EXPENSES
#             if parent_head == "CAPITAL EXPENSES":

#                 heads[parent_head]["items"][item_name] = {
#                     "name":item_name,
#                     "sequence_id":seq,
#                     "gl_code":None,
#                     "Q1":0.0,"Q2":0.0,"Q3":0.0,"Q4":0.0,
#                     "months":empty_months()
#                 }

#             # OPERATING EXPENSES
#             else:

#                 if sub_head not in heads[parent_head]["sub_heads"]:

#                     heads[parent_head]["sub_heads"][sub_head] = {
#                         "name":sub_head,
#                         "sequence_id":seq,
#                         "Q1":0.0,"Q2":0.0,"Q3":0.0,"Q4":0.0,
#                         "months":empty_months(),
#                         "items":{}
#                     }

#                 heads[parent_head]["sub_heads"][sub_head]["items"][item_name] = {
#                     "name":item_name,
#                     "sequence_id":seq,
#                     "gl_code":None,
#                     "Q1":0.0,"Q2":0.0,"Q3":0.0,"Q4":0.0,
#                     "months":empty_months()
#                 }

#         # ============================================================
#         # 4️⃣ FETCH ERP DATA
#         # ============================================================

#         response = get_actuals_from_erp_month_wise(
#             fiscal_year,
#             accounting_period
#         )

#         if "message" in response:
#             response = response["message"]

#         erp_data = response.get("data") if response.get("status") == "success" else []
#         for row in erp_data:

#             try:

#                 period = row.get("accounting_period")
#                 account = str(row.get("account") or "").strip()

#                 amount = _num(row.get("posted_total_amt"))

#                 if not period or account not in gl_parent_map:
#                     continue

#                 month = str(period)

#                 parent_expense_name = gl_parent_map.get(account)

#                 expense = expense_lookup.get(parent_expense_name)

#                 if not expense:
#                     continue

#                 raw_head = normalize(expense.get("head_of_expense"))
#                 sub_head = normalize(expense.get("sub_head_of_expense"))

#                 item_name = str(expense.get("type_of_expense") or "").strip()

#                 if raw_head in TOP_HEADS:
#                     parent_head = raw_head
#                 else:
#                     parent_head = "OPERATING EXPENSES"
#                     sub_head = raw_head

#                 # HEAD TOTAL
#                 heads[parent_head]["months"][month] += amount

#                 if parent_head == "CAPITAL EXPENSES":

#                     if item_name in heads[parent_head]["items"]:

#                         item = heads[parent_head]["items"][item_name]

#                         item["months"][month] += amount
#                         item["gl_code"] = account

#                 else:

#                     if sub_head in heads[parent_head]["sub_heads"]:

#                         sub = heads[parent_head]["sub_heads"][sub_head]

#                         sub["months"][month] += amount

#                         if item_name in sub["items"]:

#                             item = sub["items"][item_name]

#                             item["months"][month] += amount
#                             item["gl_code"] = account

#             except:
#                 continue

#         # ============================================================
#         # 6️⃣ CALCULATE QUARTERS FROM MONTHS
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
#         # 7️⃣ FINAL SORTING
#         # ============================================================

#         final = []

#         for head in sorted(heads.values(),key=lambda x:x["sequence_id"]):

#             head["items"] = sorted(
#                 head["items"].values(),
#                 key=lambda x:x["sequence_id"]
#             )

#             sorted_subs = []

#             for sub in head["sub_heads"].values():

#                 sub["items"] = sorted(
#                     sub["items"].values(),
#                     key=lambda x:x["sequence_id"]
#                 )

#                 sorted_subs.append(sub)

#             head["sub_heads"] = sorted(
#                 sorted_subs,
#                 key=lambda x:x["sequence_id"]
#             )

#             final.append(head)

#         # ============================================================
#         # RESPONSE
#         # ============================================================

#         return {
#             "status":"success",
#             "fiscal_year":fiscal_year,
#             "data":final
#         }

#     except Exception as e:

#         frappe.log_error(frappe.get_traceback(),"Actuals API Error")

#         return {
#             "status":"error",
#             "message":str(e),
#             "trace":traceback.format_exc()
#         }
