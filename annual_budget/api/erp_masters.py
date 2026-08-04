import frappe
import requests
import xml.etree.ElementTree as ET

from annual_budget.utils import guest_api, get_peoplesoft_uat_credentials

# ! ======================================================= ERP Accounts(Gl) master =============================================================================
@guest_api
def get_gl_from_erp():
    try:
        username, password = get_peoplesoft_uat_credentials()

        base_url = (
            "https://erp.azimpremjifoundation.org:8663/"
            "PSIGW/RESTListeningConnector/"
            "PSFT_EP/ExecuteQuery.v1/PUBLIC/"
            "Z_MIS_ACCOUNT/XMLP/NONFILE"
        )

        params = {
            "isconnectedquery": "N",
            "maxrows": "5000"
        }

        response = requests.get(
            base_url,
            params=params,
            headers={
                "Accept": "application/xml",
                "Content-Type": "application/xml"
            },
            auth=(username, password),
            timeout=120
        )

        if response.status_code != 200:
            frappe.log_error("ERP Account API Failed", response.text)
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
                    row_data[tag] = child.text.strip() if child.text else ""
                rows.append(row_data)

        return {
            "status": "success",
            "total_records": len(rows),
            "data": rows
        }

    except Exception:
        frappe.log_error("ERP Account API Error", frappe.get_traceback())
        return {
            "status": "failed",
            "error": "Unexpected server error"
        }
