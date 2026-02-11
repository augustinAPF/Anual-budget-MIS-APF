import frappe


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
            "value": cc.name
        })

    return {
        "data": data
    }

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
            "unit": ["in", unit]   # ✅ MULTIPLE
        },
        fields=["name", "location_code", "decription"],
        order_by="location_code asc"
    )

    data = []

    for loc in locations:
        data.append({
            "label": f"{loc.location_code} - {loc.decription}",
            "value": loc.name
        })

    return {
        "data": data
    }
