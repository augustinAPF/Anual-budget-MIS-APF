# import frappe
# import requests
# import xmltodict


# @frappe.whitelist(allow_guest=True)
# def get_actuals_from_erp(business_unit, fiscal_year, accounting_period):

#     # PEOPLESOFT_USER = "MISUSER"
#     # PEOPLESOFT_PASSWORD = "[REDACTED-CREDENTIAL]"
#     PEOPLESOFT_USER = frappe.conf.get("ps_username")
#     PEOPLESOFT_PASSWORD = frappe.conf.get("ps_password")
#     base_url = (
#         "https://erp.azimpremjifoundation.org:8663/PSIGW/RESTListeningConnector/"
#         "PSFT_EP/ExecuteQuery.v1/PUBLIC/Z_MAS_ACTUALS/XMLP/NONFILE"
#     )

#     prompt_value = f"{business_unit},{fiscal_year},{accounting_period}"

#     api_url = (
#         f"{base_url}"
#         f"?isconnectedquery=N"
#         f"&maxrows=100000"
#         f"&prompt_uniquepromptname=BUSINESS_UNIT,FISCAL_YEAR,ACCOUNTING_PERIOD"
#         f"&prompt_fieldvalue={prompt_value}"
#     )

#     headers = {"Accept": "application/xml"}

#     try:
#         response = requests.get(
#             api_url,
#             headers=headers,
#             auth=(PEOPLESOFT_USER, PEOPLESOFT_PASSWORD),
#             timeout=120,
#             verify=False
#         )

#         if response.status_code != 200:
#             return {
#                 "status": "failed",
#                 "status_code": response.status_code,
#                 "error": response.text,
#                 "url": api_url
#             }

#         # XML → dict
#         xml_data = xmltodict.parse(response.text)

#         # Extract rows from PeopleSoft response
#         rows = (
#             xml_data
#             .get("QAS_GETQUERYRESULTS_RESP_MSG", {})
#             .get("query", {})
#             .get("row", [])
#         )

#         # If only one row comes, it will be dict → convert to list
#         if isinstance(rows, dict):
#             rows = [rows]

#         # Convert all keys to lowercase dynamically
#         def keys_to_lower(obj):
#             if isinstance(obj, dict):
#                 return {k.lower(): keys_to_lower(v) for k, v in obj.items()}
#             elif isinstance(obj, list):
#                 return [keys_to_lower(i) for i in obj]
#             else:
#                 return obj

#         rows = keys_to_lower(rows)

#         return {
#             "status": "success",
#             "params": {
#                 "business_unit": business_unit,
#                 "fiscal_year": fiscal_year,
#                 "accounting_period": accounting_period
#             },
#             "data": rows
#         }

#     except Exception:
#         frappe.log_error(
#             title="PeopleSoft API Dynamic Fetch Error",
#             message=frappe.get_traceback()
#         )
#         return {
#             "status": "failed",
#             "error": "Unexpected error occurred"
#         }



# import frappe
# import requests
# import xmltodict
# from collections import defaultdict
# from decimal import Decimal


# @frappe.whitelist(allow_guest=True)
# def get_actuals_from_erp(business_unit, fiscal_year, accounting_period):

#     PEOPLESOFT_USER = frappe.conf.get("ps_username")
#     PEOPLESOFT_PASSWORD = frappe.conf.get("ps_password")

#     base_url = (
#         "https://erp.azimpremjifoundation.org:8663/PSIGW/RESTListeningConnector/"
#         "PSFT_EP/ExecuteQuery.v1/PUBLIC/Z_MAS_ACTUALS/XMLP/NONFILE"
#     )

#     prompt_value = f"{business_unit},{fiscal_year},{accounting_period}"

#     api_url = (
#         f"{base_url}"
#         f"?isconnectedquery=N"
#         f"&maxrows=100000"
#         f"&prompt_uniquepromptname=BUSINESS_UNIT,FISCAL_YEAR,ACCOUNTING_PERIOD"
#         f"&prompt_fieldvalue={prompt_value}"
#     )

#     headers = {"Accept": "application/xml"}

#     try:
#         response = requests.get(
#             api_url,
#             headers=headers,
#             auth=(PEOPLESOFT_USER, PEOPLESOFT_PASSWORD),
#             timeout=120,
#             verify=False
#         )

#         if response.status_code != 200:
#             return {
#                 "status": "failed",
#                 "status_code": response.status_code,
#                 "error": response.text,
#                 "url": api_url
#             }

#         # XML → dict
#         xml_data = xmltodict.parse(response.text)

#         # Extract rows from PeopleSoft response
#         rows = (
#             xml_data
#             .get("QAS_GETQUERYRESULTS_RESP_MSG", {})
#             .get("query", {})
#             .get("row", [])
#         )

#         # If only one row comes, it will be dict → convert to list
#         if isinstance(rows, dict):
#             rows = [rows]

#         # Convert all keys to lowercase dynamically
#         def keys_to_lower(obj):
#             if isinstance(obj, dict):
#                 return {k.lower(): keys_to_lower(v) for k, v in obj.items()}
#             elif isinstance(obj, list):
#                 return [keys_to_lower(i) for i in obj]
#             else:
#                 return obj

#         rows = keys_to_lower(rows)

#         # -------------------------------
#         # GROUP BY ACCOUNT + SUM LOGIC
#         # -------------------------------
#         grouped_data = defaultdict(Decimal)

#         for row in rows:
#             account = row.get("account")
#             amt = row.get("posted_total_amt", 0)

#             try:
#                 amt = Decimal(str(amt))
#             except:
#                 amt = Decimal("0")

#             # If positive → add
#             # If negative → subtract from total
#             if amt >= 0:
#                 grouped_data[account] += amt
#             else:
#                 grouped_data[account] -= abs(amt)

#         # Convert grouped result to list format
#         grouped_list = [
#             {
#                 "account": account,
#                 "grouped_posted_total_amt": float(total)
#             }
#             for account, total in grouped_data.items()
#         ]

#         return {
#             "status": "success",
#             "params": {
#                 "business_unit": business_unit,
#                 "fiscal_year": fiscal_year,
#                 "accounting_period": accounting_period
#             },
#             # "data": rows,                 # original data
#             "data": grouped_list  # grouped + summed by account
#         }

#     except Exception:
#         frappe.log_error(
#             title="PeopleSoft API Dynamic Fetch Error",
#             message=frappe.get_traceback()
#         )
#         return {
#             "status": "failed",
#             "error": "Unexpected error occurred"
#         }



import frappe
import requests
import xmltodict


@frappe.whitelist(allow_guest=True)
def get_actuals_from_erp(fiscal_year, accounting_period):

    # Fetch credentials from site_config.json
    doc = frappe.get_single("ERP Credentials")
    print(doc)
    # PEOPLESOFT_USER = doc.user_name
    # PEOPLESOFT_PASSWORD = doc.password
    PEOPLESOFT_USER = "MISUSER"
    PEOPLESOFT_PASSWORD = "[REDACTED-CREDENTIAL]"

    # Updated API URL (Z_MIS_ACTUALS)
    base_url = (
        "https://erp.azimpremjifoundation.org:8663/PSIGW/RESTListeningConnector/"
        "PSFT_EP/ExecuteQuery.v1/PUBLIC/Z_MIS_ACTUALS/XMLP/NONFILE"
    )

    # Only Fiscal Year and Accounting Period are required now
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

        # Convert XML to Python dict
        xml_data = xmltodict.parse(response.text)

        # Extract rows from PeopleSoft response
        rows = (
            xml_data
            .get("QAS_GETQUERYRESULTS_RESP_MSG", {})
            .get("query", {})
            .get("row", [])
        )

        # If only one row is returned, convert dict → list
        if isinstance(rows, dict):
            rows = [rows]

        # Convert all keys to lowercase dynamically
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

