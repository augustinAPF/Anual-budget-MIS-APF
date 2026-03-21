import frappe
from frappe.desk.page.setup_wizard.install_fixtures import _
# # ! =======================================================  Units filter values =============================================================================
@frappe.whitelist(allow_guest=True)
def get_units():

    current_user = frappe.session.user
    roles = frappe.get_roles(current_user)

    is_admin = (
        "System Manager" in roles or
        "Finance MIS Admin" in roles
    )
    if is_admin:

        unit_data = frappe.get_all(
            "Unit",
            fields=["name", "unit_decription"],
            order_by="name asc"
        )

    else:

        finance_docs = frappe.get_all(
            "Finance user access",
            filters={"user": current_user},
            fields=["name"]
        )

        allowed_units = set()

        for finance in finance_docs:
            doc = frappe.get_doc("Finance user access", finance.name)

            for row in doc.mapping:
                if row.unit:
                    allowed_units.add(row.unit)

        if not allowed_units:
            return {"data": []}

        unit_data = frappe.get_all(
            "Unit",
            filters={
                "name": ["in", list(allowed_units)]
            },
            fields=["name", "unit_decription"],
            order_by="name asc"
        )
    data = []

    data.append({
        "label": "",
        "value": ""
    })

    for u in unit_data:
        data.append({
            "label": f"{u.name} - {u.unit_decription}",
            "value": u.name
        })

    return {"data": data}
# # ! ======================================================= Cost center filter values =============================================================================
@frappe.whitelist(allow_guest=True)
def get_cost_centers_by_set_id(units=None):

    if not units:
        return {"data": []}

    if isinstance(units, str):
        units = [u.strip() for u in units.split(",") if u.strip()]

    current_user = frappe.session.user
    roles = frappe.get_roles(current_user)

    is_admin = (
        "System Manager" in roles or
        "Finance MIS Admin" in roles
    )
    if is_admin:

        cost_centers = frappe.get_all(
            "Cost Center",
            filters={
                "set_id": ["in", units]
            },
            fields=["name", "cost_center", "cc_descr"],
            order_by="cost_center asc"
        )
    else:

        finance_docs = frappe.get_all(
            "Finance user access",
            filters={"user": current_user},
            fields=["name"]
        )

        allowed_cost_centers = []

        for finance in finance_docs:
            doc = frappe.get_doc("Finance user access", finance.name)

            for row in doc.mapping:
                if row.unit in units and row.cost_center_erp:
                    allowed_cost_centers.append(row.cost_center_erp)

        if not allowed_cost_centers:
            return {"data": []}

        cost_centers = frappe.get_all(
            "Cost Center",
            filters={
                "cost_center": ["in", allowed_cost_centers]
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

    return {"data": data}
# ! =======================================================  Location code filter values =============================================================================
# @frappe.whitelist(allow_guest=True)
# def get_location_codes_by_unit(unit=None):

#     if not unit:
#         return {"data": []}
#     if isinstance(unit, str):
#         unit = [u.strip() for u in unit.split(",") if u.strip()]

#     current_user = frappe.session.user
#     roles = frappe.get_roles(current_user)

#     is_admin = (
#         "System Manager" in roles or
#         "Finance MIS Admin" in roles
#     )
#     if is_admin:

#         locations = frappe.get_all(
#             "Location Code",
#             filters={
#                 "unit": ["in", unit]
#             },
#             fields=["name", "location_code", "decription"],
#             order_by="location_code asc"
#         )
#     else:
#         finance_docs = frappe.get_all(
#             "Finance user access",
#             filters={"user": current_user},
#             fields=["name"]
#         )

#         allowed_location_codes = []

#         for finance in finance_docs:
#             doc = frappe.get_doc("Finance user access", finance.name)

#             for row in doc.mapping:
#                 if row.unit in unit and row.location_code_erp:
#                     allowed_location_codes.append(row.location_code_erp)

#         if not allowed_location_codes:
#             return {"data": []}

#         locations = frappe.get_all(
#             "Location Code",
#             filters={
#                 "location_code": ["in", allowed_location_codes]
#             },
#             fields=["name", "location_code", "decription"],
#             order_by="location_code asc"
#         )
#     data = []

#     for loc in locations:
#         data.append({
#             "label": f"{loc.location_code} - {loc.decription}",
#             "value": loc.name,
#             "erp_loc_value": loc.location_code,
#         })

#     return {
#         "data": data
#     }



@frappe.whitelist(allow_guest=True)
def get_location_codes_by_unit(unit=None):

    if not unit:
        return {"data": []}

    if isinstance(unit, str):
        unit = [u.strip() for u in unit.split(",") if u.strip()]

    current_user = frappe.session.user
    roles = frappe.get_roles(current_user)

    is_admin = (
        "System Manager" in roles or
        "Finance MIS Admin" in roles
    )

    if is_admin:
        locations = frappe.get_all(
            "Location Code",
            filters={"unit": ["in", unit]},
            fields=["name", "location_code", "decription"],
            order_by="location_code asc"
        )
    else:
        finance_docs = frappe.get_all(
            "Finance user access",
            filters={"user": current_user},
            fields=["name"]
        )

        allowed_location_codes = []

        for finance in finance_docs:
            doc = frappe.get_doc("Finance user access", finance.name)

            for row in doc.mapping:
                if row.unit in unit and row.location_code_erp:
                    allowed_location_codes.append(row.location_code_erp)

        if not allowed_location_codes:
            return {"data": []}

        locations = frappe.get_all(
            "Location Code",
            filters={
                "location_code": ["in", allowed_location_codes]
            },
            fields=["name", "location_code", "decription"],
            order_by="location_code asc"
        )

    # 🔹 Group by description
    data_map = {}

    for loc in locations:
        key = loc.decription or "Unknown"

        if key not in data_map:
            data_map[key] = {
                "label": f"{loc.location_code} - {loc.decription}",
                "value": set(),
                "erp_loc_value": str(loc.location_code),  # ✅ only one value
            }

        data_map[key]["value"].add(str(loc.name))

    # 🔹 Final output
    data = []

    for item in data_map.values():
        data.append({
            "label": item["label"],
            "value": ",".join(sorted(item["value"])),
            "erp_loc_value": item["erp_loc_value"],  # ✅ single value only
        })

    return {
        "data": data
    }


# ! =======================================================  Theme filter values =============================================================================
@frappe.whitelist(allow_guest=True)
def get_theme():
    theme = frappe.get_all(
        "Overview number cards settings",
        filters=[["set_group_id", "like", "%2%"]],
        fields=["name", "number_card_title"]
    )
    return theme
# ! =======================================================  User permission level filter values =============================================================================
@frappe.whitelist(allow_guest=True)
def get_user_mappings():

    current_user = frappe.session.user
    roles = frappe.get_roles(current_user)
    is_admin = "System Manager" in roles

    results = []

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
                "cost_center": row.cost_center_erp,
                "cost_center_description": row.cost_center_description,
                "cost_center_id": row.cost_center,
                "location_code_id": row.location_code,
                "location_code": row.location_code_erp,
                "location_description": row.location_description
            })

    return results

# ! =======================================================  Financial Year filter values =============================================================================
@frappe.whitelist(allow_guest=True)
def get_financial_year_list():

    fy_docs = frappe.get_all(
        "Financial Year List",
        fields=["name"]
    )

    # sort by first year
    fy_docs = sorted(
        fy_docs,
        key=lambda x: int(x.name.split("-")[0]),
        reverse=True
    )

    return [{"financial_year": d.name} for d in fy_docs]