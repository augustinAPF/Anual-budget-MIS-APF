import frappe
import requests
import xmltodict
import xml.etree.ElementTree as ET

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





@frappe.whitelist(allow_guest=True)
def get_actuals_from_erp_prod(fiscal_year, accounting_period):
    try:
        doc = frappe.get_single("ERP Credentials")

        username ="MISUSER"
        password = "[REDACTED-CREDENTIAL]"

        base_url = (
            "https://pserp.azimpremjifoundation.org:8053/"
            "PSIGW/RESTListeningConnector/"
            "PSFT_EP/ExecuteQuery.v1/PUBLIC/"
            "Z_MIS_ACTUALS/XMLP/NONFILE"
        )

        prompt_value = f"{fiscal_year},{accounting_period}"

        api_url = (
            f"{base_url}"
            f"?isconnectedquery=N"
            f"&maxrows=100000"
            f"&prompt_uniquepromptname=FISCAL_YEAR,ACCOUNTING_PERIOD"
            f"&prompt_fieldvalue={prompt_value}"
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
            "accounting_period": accounting_period,
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

