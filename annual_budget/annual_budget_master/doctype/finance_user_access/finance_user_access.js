// Copyright (c) 2025, Augustin Moses and contributors
// For license information, please see license.txt

frappe.ui.form.on("Finance user access", {
	refresh(frm) {
        $('label:contains("Name")').text('Email ID');
    },
     after_save: function(frm) {
        if (frm.doc.name ) {
            frappe.call({
                method: "frappe.client.insert",
                args: {
                    doc: {
                        doctype: "User Permission",
                        user: frm.doc.name,
                        allow: "Finance user access",
                        for_value: frm.doc.name,
                        apply_to_all_doctypes: 0,
                        is_default:1
                    }
                },
                callback: function (r) {
                    if (!r.exc) {
                        frappe.msgprint(__('User Permission added successfully'));
                    } else {
                        frappe.msgprint(__('Failed to create User Permission'));
                    }
                }
            });
        } else {
            frappe.msgprint(__('Missing  User — cannot create User Permission.'));
        }
    }

});
