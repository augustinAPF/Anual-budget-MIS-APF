import frappe
from frappe.desk.page.setup_wizard.install_fixtures import _
from openpyxl import Workbook
from openpyxl.styles import Font, Protection
from io import BytesIO
import datetime
# ! =======================================================  Units filter values =============================================================================
@frappe.whitelist(allow_guest=True)
def get_units():
    unit_data = frappe.get_all(
        "Unit",
        fields=["name", "unit_decription"],
        order_by="name asc"
    )
    print(unit_data)
    data = []

    # Optional empty option
    data.append({
        "label": "",
        "value": ""
    })

    for u in unit_data:
        data.append({
            "label": f"{u.name} - {u.unit_decription}",
            "value": u.name
        })

    return {
        "data": data
    }
# ! ======================================================= Cost center filter values =============================================================================
@frappe.whitelist(allow_guest=True)
def get_cost_centers_by_set_id(units=None):
    if not units:
        return {"data": []}

    # 🔹 Normalize input to list
    if isinstance(units, str):
        units = [u.strip() for u in units.split(",") if u.strip()]

    cost_centers = frappe.get_all(
        "Cost Center",
        filters={
            "set_id": ["in", units]  
        },
        fields=["name", "cost_center", "cc_descr"],
        order_by="cost_center asc"
    )

    data = []

    for cc in cost_centers:
        data.append({
            "label": f"{cc.cost_center} - {cc.cc_descr}",
            "value": cc.name,
            "erp_cost_center_value": cc.cost_center

        })

    return {
        "data": data
    }
# ! =======================================================  Location code filter values =============================================================================
@frappe.whitelist(allow_guest=True)
def get_location_codes_by_unit(unit=None):
    if not unit:
        return {"data": []}

    # 🔹 Normalize input to list
    if isinstance(unit, str):
        unit = [u.strip() for u in unit.split(",") if u.strip()]

    locations = frappe.get_all(
        "Location Code",
        filters={
            "unit": ["in", unit]  
        },
        fields=["name", "location_code", "decription"],
        order_by="location_code asc"
    )

    data = []

    for loc in locations:
        data.append({
            "label": f"{loc.location_code} - {loc.decription}",
            "value": loc.name,
            "erp_loc_value": loc.location_code,

        })

    return {
        "data": data
    }




@frappe.whitelist()
def get_user_mappings():

    current_user = frappe.session.user
    roles = frappe.get_roles(current_user)
    is_admin = "System Manager" in roles

    results = []

    # Get Finance User Access documents
    if is_admin:
        finance_docs = frappe.get_all(
            "Finance user access",
            fields=["name", "user", "user_nmae"]
        )
    else:
        finance_docs = frappe.get_all(
            "Finance user access",
            filters={"user": current_user},
            fields=["name", "user", "user_nmae"]
        )

    for finance in finance_docs:

        doc = frappe.get_doc("Finance user access", finance.name)

        for row in doc.mapping:

            results.append({
                "full_name": finance.user_nmae or finance.user,
                "user": finance.user,

                "unit": row.unit,
                "unit_description": row.unit_description,

                # ERP fields directly from child table
                "cost_center": row.cost_center_erp,
                "cost_center_description": row.cost_center_description,

                "location_code": row.location_code_erp,
                "location_description": row.location_description
            })

    return results

