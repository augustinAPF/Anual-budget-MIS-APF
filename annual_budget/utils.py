import functools

import frappe

from annual_budget.api.response_crypto import require_login, encrypted_response_if_direct_call


def guest_api(func):
	"""Whitelist a method for guest access, gated by testing_mode, with its
	response AES-GCM encrypted outside of testing_mode.

	Replaces `@frappe.whitelist(allow_guest=True)` for endpoints that were
	opened up for testing/local development. The endpoint is always
	registered with allow_guest so Frappe dispatches the request to it;
	require_login() then rejects guest callers unless testing_mode is on
	(checked per-request, so toggling the checkbox takes effect immediately).

	Many of these endpoints call each other directly as plain Python
	functions (not via HTTP), so encryption only applies when this call is
	the actual HTTP dispatch (encrypted_response_if_direct_call) — otherwise
	an internal caller would receive an encrypted envelope instead of the
	real data it expects to read.
	"""
	@functools.wraps(func)
	def wrapper(*args, **kwargs):
		require_login()
		return func(*args, **kwargs)

	return frappe.whitelist(allow_guest=True)(encrypted_response_if_direct_call(wrapper))


def get_peoplesoft_uat_credentials():
	"""Return (user_name, password) for the PeopleSoft UAT endpoints."""
	doc = frappe.get_single("ERP Credentials")
	return doc.peoplesoft_erp_user_name_uat, doc.get_password("peoplesoft_erp_password_uat")


def get_peoplesoft_prod_credentials():
	"""Return (user_name, password) for the PeopleSoft production endpoints."""
	doc = frappe.get_single("ERP Credentials")
	return doc.peoplesoft_erp_user_name_prod, doc.get_password("peoplesoft_erp_password_prod")
