// frappe.pages['monthly-mis'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Monthly MIS',
// 		single_column: true
// 	});
// }


// frappe.pages['monthly-mis'].on_page_load = function (wrapper) {

// 	// =============================================================================
// 	// PAGE SETUP
// 	// =============================================================================

// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper, title: 'Monthly MIS', single_column: true
// 	});

// 	// =============================================================================
// 	// LOADER
// 	// =============================================================================

// 	if (!$('#mis-loader').length) {
// 		$('body').append(
// 			'<div id="mis-loader" class="mis-loader-overlay">' +
// 			'<div class="mis-loader-box"><img src="/files/APF logo.png" class="mis-loader-logo" alt="">' +
// 			'<div class="mis-loader-text">Loading, please wait</div></div></div>'
// 		);
// 	}
// 	$('#mis-loader').hide();

// 	var Loader = {
// 		show: function (msg) {
// 			var $l = $('#mis-loader');
// 			$l.find('.mis-loader-text').text(msg || 'Loading, please wait');
// 			$l.css('display', 'flex').hide().fadeIn(200);
// 		},
// 		hide: function () { $('#mis-loader').fadeOut(200); }
// 	};

// 	// =============================================================================
// 	// STYLES
// 	// =============================================================================

// 	$(page.body).append(
// 		'<style>' +
// 		':root{' +
// 		'--font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
// 		'--fs-xs:12px;--fs-sm:14px;--fs-base:15px;--fs-md:16px;--fs-lg:17px;--fs-xl:18px;' +
// 		'--fw-n:400;--fw-m:500;--fw-sb:600;--fw-b:700;' +
// 		'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 		'--orange:#F26B21;' +
// 		'--bdl:#9baab5;--bdh:#004a75;--bdo:#a84808;' +
// 		'--txt:#1a1a1a;--txt2:#36414c;--muted:#555;' +
// 		'}' +
// 		'.mis-wrapper{padding:15px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.5;}' +
// 		'.mis-wrapper *{box-sizing:border-box;}' +
// 		'.mis-filter-row{padding:8px 0;margin-bottom:10px;}' +
// 		'.mis-filter-row .col-md-3,.mis-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.mis-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +
// 		'.mis-controls{display:flex;align-items:center;padding:7px 12px;margin-bottom:12px;background:#f7f9fb;border:1px solid #e2e6ea;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
// 		'.mis-search-wrap{position:relative;display:flex;align-items:center;}' +
// 		'.mis-search-wrap .search-icon{position:absolute;left:8px;color:#8d99a6;pointer-events:none;}' +
// 		'.mis-search-input{padding:5px 8px 5px 28px;border:1.5px solid var(--bdl);border-radius:4px;font-family:var(--font);font-size:var(--fs-sm);color:var(--txt2);background:#fff;width:240px;height:32px;}' +
// 		'.mis-search-input:focus{outline:none;border-color:#5e64ff;box-shadow:0 0 0 2px rgba(94,100,255,.15);}' +
// 		'.sinr-section-label{margin:18px 0 5px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-b);color:var(--txt);text-decoration:underline;letter-spacing:.2px;}' +
// 		'.mis-currency-note{text-align:right;font-family:var(--font);font-size:var(--fs-xs);font-style:italic;color:var(--muted);margin-bottom:4px;}' +
// 		'.mis-currency-note strong{font-weight:var(--fw-b);font-style:normal;}' +
// 		'.cb-scroll-wrapper{border:1.5px solid var(--bdl);border-radius:6px;overflow:auto;max-height:74vh;background:#fff;position:relative;isolation:isolate;}' +
// 		'.cb-table{border-collapse:collapse !important;border-spacing:0 !important;width:100%;table-layout:auto;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);}' +
// 		'.cb-table th,.cb-table td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;text-align:right;}' +
// 		'.cb-table th:first-child,.cb-table td:first-child{text-align:left !important;}' +
// 		'.cb-table thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-b);text-align:center !important;position:sticky;top:0;z-index:25;border:1.5px solid var(--bdh) !important;padding:10px 12px;}' +
// 		'.cb-table thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-sm);font-weight:var(--fw-sb);text-align:center !important;position:sticky;z-index:24;border:1.5px solid var(--bdo) !important;min-width:110px;padding:8px 12px;}' +
// 		'.cb-table tr.sinr-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:var(--fw-b) !important;border:1.5px solid #9baab5 !important;}' +
// 		'.cb-table tr.cb-row-grand td{background:var(--blue-mid) !important;color:#fff !important;font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;}' +
// 		'.cb-table .sinr-sub-row td:first-child{padding-left:28px !important;color:#555;}' +
// 		'.cb-table .sinr-covid-row td{color:#444;}' +
// 		/* sticky first column */
// 		'#mis-table thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:55 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:240px;}' +
// 		'#mis-table thead tr.cb-thead-sub th:first-child{position:sticky;left:0;z-index:54 !important;background:var(--orange) !important;}' +
// 		'#mis-table tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:240px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +
// 		'#mis-table tbody tr.sinr-total-row td:first-child{background:#e8f0fa !important;}' +
// 		'#mis-table tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;}' +
// 		/* visual separators between the 4 column groups */
// 		'#mis-table .grp-sep{border-left:2.5px solid var(--blue-mid) !important;}' +
// 		'#mis-loader.mis-loader-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(18,18,18,.92);backdrop-filter:blur(6px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
// 		'.mis-loader-box{display:flex;flex-direction:column;align-items:center;gap:14px;}' +
// 		'.mis-loader-logo{width:90px;height:90px;border-radius:50%;background:linear-gradient(145deg,#fff,#eaeaea);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.35);animation:misp 1.6s infinite ease-in-out;}' +
// 		'.mis-loader-text{font-family:var(--font);font-size:var(--fs-sm);color:#fff;font-weight:var(--fw-sb);letter-spacing:.5px;opacity:.85;}' +
// 		'@keyframes misp{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.08);opacity:1;}}' +
// 		'</style>'
// 	);

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================

// 	$(page.body).append(
// 		'<div class="mis-wrapper">' +
// 		'<div class="frappe-control-group row mis-filter-row" id="mis-filter-row"></div>' +
// 		'<div class="mis-controls">' +
// 		'<div class="mis-search-wrap"><svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
// 		'<input type="text" id="mis-search" class="mis-search-input" placeholder="Search unit / function\u2026"></div>' +
// 		'</div>' +
// 		'<div class="sinr-section-label" id="mis-title">Unit Wise Plan \u2013 Budget vs Actual</div>' +
// 		'<div class="mis-currency-note">&#8377; <strong>Cr.</strong></div>' +
// 		'<div class="cb-scroll-wrapper"><table id="mis-table" class="cb-table"><thead></thead><tbody>' +
// 		'<tr><td colspan="13" style="text-align:center;padding:40px;color:#aaa;">Loading\u2026</td></tr>' +
// 		'</tbody></table></div>' +
// 		'</div>'
// 	);

// 	// =============================================================================
// 	// FY HELPERS
// 	// =============================================================================

// 	function getPrevFY(fy) {
// 		var p = (fy || '2025-26').split('-');
// 		return (parseInt(p[0] || '2025', 10) - 1) + '-' + String(parseInt(p[1] || '26', 10) - 1).padStart(2, '0');
// 	}

// 	var MONTHS = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];

// 	// =============================================================================
// 	// FINANCIAL YEAR + MONTH FILTERS
// 	// =============================================================================

// 	var fyControl = frappe.ui.form.make_control({
// 		parent: $('<div class="col-md-3 col-sm-12"></div>').appendTo('#mis-filter-row'),
// 		df: {
// 			label: 'Financial Year', fieldtype: 'Select', fieldname: 'financial_year', reqd: 1,
// 			change: function () { var y = this.get_value(); if (!y) { return; } loadData(); }
// 		},
// 		render_input: true
// 	});
// 	fyControl.refresh();

// 	var monthControl = frappe.ui.form.make_control({
// 		parent: $('<div class="col-md-3 col-sm-12"></div>').appendTo('#mis-filter-row'),
// 		df: {
// 			label: 'Month (YTD up to)', fieldtype: 'Select', fieldname: 'month', reqd: 1,
// 			options: MONTHS.join('\n'),
// 			change: function () { var m = this.get_value(); if (!m) { return; } loadData(); }
// 		},
// 		render_input: true
// 	});
// 	monthControl.refresh();

// 	frappe.call({
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (!r.message || !r.message.length) { return; }
// 			var years = r.message.map(function (d) { return d.financial_year; });
// 			fyControl.df.options = years.join('\n'); fyControl.refresh();

// 			var today = new Date(), y = today.getFullYear(), m = today.getMonth() + 1; // 1-12
// 			var curFY = (m >= 4 ? y : y - 1) + '-' + String(m >= 4 ? y + 1 : y).slice(-2);
// 			var target = years.indexOf(curFY) !== -1 ? curFY : years[0];
// 			fyControl.set_value(target);

// 			// Default month = current calendar month name (mapped onto FY month list)
// 			var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'][m - 1];
// 			monthControl.set_value(MONTHS.indexOf(monthName) !== -1 ? monthName : 'March');

// 			loadData();
// 		}
// 	});

// 	// =============================================================================
// 	// DATA FETCH  (Unit Wise Plan — same source as Summary in INR / Section A)
// 	// =============================================================================

// 	function fetchUnitWisePlan(fy, month) {
// 		return new Promise(function (resolve) {
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 				args: { financial_year: fy, month: month, table_name_filter: 'Unit Wise Plan' },
// 				callback: function (r) {
// 					var d = Array.isArray(r.message) ? r.message
// 						: ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
// 					resolve(d || []);
// 				},
// 				error: function () { resolve([]); }
// 			});
// 		});
// 	}

// 	// =============================================================================
// 	// EXTRACTION HELPERS
// 	// (ytd = Budget/Plan, total_posted_amt_ytd = Actual)
// 	// =============================================================================

// 	function normN(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }
// 	function zero2() { return { opex_plan: 0, opex_act: 0, capex_plan: 0, capex_act: 0, total_plan: 0, total_act: 0 }; }
// 	function addV2(a, b) {
// 		return {
// 			opex_plan: a.opex_plan + b.opex_plan, opex_act: a.opex_act + b.opex_act,
// 			capex_plan: a.capex_plan + b.capex_plan, capex_act: a.capex_act + b.capex_act,
// 			total_plan: a.total_plan + b.total_plan, total_act: a.total_act + b.total_act
// 		};
// 	}

// 	function extractA(actuals) {
// 		var r = zero2();
// 		(actuals || []).forEach(function (sec) {
// 			var nm = normN(sec.name);
// 			if (nm === 'OPERATING EXPENSES' || nm === 'OPERATING  EXPENSES') { r.opex_plan += parseFloat(sec.ytd || 0); r.opex_act += parseFloat(sec.total_posted_amt_ytd || 0); }
// 			if (nm === 'CAPITAL EXPENSES' || nm === 'CAPITAL  EXPENSES') { r.capex_plan += parseFloat(sec.ytd || 0); r.capex_act += parseFloat(sec.total_posted_amt_ytd || 0); }
// 		});
// 		r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act;
// 		return r;
// 	}

// 	function getConsolidatedTotalsFromEntry(ct) {
// 		var r = zero2();
// 		(ct.actuals || []).forEach(function (a) {
// 			var nm = normN(a.name);
// 			if (nm === 'OPEX TOTAL') { r.opex_plan += parseFloat(a.ytd || 0); r.opex_act += parseFloat(a.total_posted_amt_ytd || 0); }
// 			if (nm === 'CAPEX TOTAL') { r.capex_plan += parseFloat(a.ytd || 0); r.capex_act += parseFloat(a.total_posted_amt_ytd || 0); }
// 			if (nm === 'OVERALL GRAND TOTAL') { r.total_plan = parseFloat(a.ytd || 0); r.total_act = parseFloat(a.total_posted_amt_ytd || 0); }
// 		});
// 		if (!r.total_plan && !r.total_act) { r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act; }
// 		return r;
// 	}

// 	// Build { order:[label,...], rows:{label:vals}, subFlags:{}, covidFlags:{}, grand: vals }
// 	function buildMap(data) {
// 		var sorted = (data || []).slice().sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// 		var rows = {}, subFlags = {}, covidFlags = {}, normalOrder = [], covidOrder = [], grand = null;
// 		sorted.forEach(function (e) {
// 			var tbl = (e.table_name || '').toUpperCase();
// 			if (e.sequence_id === 9999 || tbl === 'CONSOLIDATED') {
// 				grand = getConsolidatedTotalsFromEntry(e);
// 				return;
// 			}
// 			var lbl = (e.label || '').trim();
// 			rows[lbl] = extractA(e.actuals);
// 			subFlags[lbl] = e.is_this_sub_item === 1;
// 			covidFlags[lbl] = lbl.toLowerCase().indexOf('covid') !== -1;
// 			(covidFlags[lbl] ? covidOrder : normalOrder).push(lbl);
// 		});
// 		var order = normalOrder.concat(covidOrder);
// 		if (!grand) {
// 			grand = zero2();
// 			order.forEach(function (lbl) { if (!subFlags[lbl]) { grand = addV2(grand, rows[lbl]); } });
// 		}
// 		return { order: order, rows: rows, subFlags: subFlags, covidFlags: covidFlags, grand: grand };
// 	}

// 	// =============================================================================
// 	// FORMATTERS
// 	// =============================================================================

// 	function fmtCr(v) {
// 		var n = parseFloat(v) || 0;
// 		if (!isFinite(n) || n === 0) { return '-'; }
// 		var res = n / 10000000;
// 		var neg = res < 0;
// 		var s = Math.abs(res).toFixed(2).split('.');
// 		var ip = s[0], dp = s[1];
// 		if (ip.length > 3) { ip = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + ip.slice(-3); }
// 		return (neg ? '-' : '') + ip + '.' + dp;
// 	}

// 	// =============================================================================
// 	// RENDER
// 	// =============================================================================

// 	function buildHeader(curFY, curMonth, prevFY) {
// 		var $t = $('#mis-table thead').empty();
// 		var r1 = '<tr class="cb-thead-main">' +
// 			'<th rowspan="2" style="text-align:left !important;min-width:240px;">Unit / Function</th>' +
// 			'<th colspan="3">' + curFY + ' Budget</th>' +
// 			'<th colspan="3" class="grp-sep">' + curFY + ' Actual (upto ' + curMonth + ')</th>' +
// 			'<th colspan="3" class="grp-sep">' + prevFY + ' Budget</th>' +
// 			'<th colspan="3" class="grp-sep">' + prevFY + ' Actual (upto ' + curMonth + ')</th>' +
// 			'</tr>';
// 		var sub = '<th>Opex</th><th>Capex</th><th>Total</th>';
// 		var r2 = '<tr class="cb-thead-sub">' +
// 			sub + '<th class="grp-sep">Opex</th><th>Capex</th><th>Total</th>' +
// 			'<th class="grp-sep">Opex</th><th>Capex</th><th>Total</th>' +
// 			'<th class="grp-sep">Opex</th><th>Capex</th><th>Total</th>' +
// 			'</tr>';
// 		$t.append(r1 + r2);
// 	}

// 	function rowHtml(r) {
// 		var cls = r.isGrandTotal ? 'cb-row-grand' : (r.isTotal ? 'sinr-total-row' : (r.isCovid ? 'sinr-covid-row' : (r.isSub ? 'sinr-sub-row' : '')));
// 		var lblStyle = r.isSub ? 'padding-left:28px;color:#555;' : '';
// 		var cb = r.cb, pb = r.pb;
// 		return '<tr class="' + cls + '">' +
// 			'<td style="' + lblStyle + '">' + r.display + '</td>' +
// 			// Current FY Budget
// 			'<td>' + fmtCr(cb.opex_plan) + '</td><td>' + fmtCr(cb.capex_plan) + '</td><td>' + fmtCr(cb.total_plan) + '</td>' +
// 			// Current FY Actual
// 			'<td class="grp-sep">' + fmtCr(cb.opex_act) + '</td><td>' + fmtCr(cb.capex_act) + '</td><td>' + fmtCr(cb.total_act) + '</td>' +
// 			// Previous FY Budget
// 			'<td class="grp-sep">' + fmtCr(pb.opex_plan) + '</td><td>' + fmtCr(pb.capex_plan) + '</td><td>' + fmtCr(pb.total_plan) + '</td>' +
// 			// Previous FY Actual
// 			'<td class="grp-sep">' + fmtCr(pb.opex_act) + '</td><td>' + fmtCr(pb.capex_act) + '</td><td>' + fmtCr(pb.total_act) + '</td>' +
// 			'</tr>';
// 	}

// 	var ALL_ROWS = []; // cached rows for client-side search

// 	function renderTable(curData, prevData, curFY, prevFY, curMonth) {
// 		buildHeader(curFY, curMonth, prevFY);

// 		var curMap = buildMap(curData);
// 		var prevMap = buildMap(prevData);

// 		var rows = curMap.order.map(function (lbl) {
// 			return {
// 				display: lbl,
// 				isSub: curMap.subFlags[lbl],
// 				isCovid: curMap.covidFlags[lbl],
// 				cb: curMap.rows[lbl] || zero2(),
// 				pb: prevMap.rows[lbl] || zero2()
// 			};
// 		});

// 		// pick up any units present in previous FY but not current FY
// 		prevMap.order.forEach(function (lbl) {
// 			if (curMap.rows[lbl] === undefined) {
// 				rows.push({
// 					display: lbl, isSub: prevMap.subFlags[lbl], isCovid: prevMap.covidFlags[lbl],
// 					cb: zero2(), pb: prevMap.rows[lbl]
// 				});
// 			}
// 		});

// 		rows.push({ display: 'Grand Total', isGrandTotal: true, cb: curMap.grand, pb: prevMap.grand });

// 		ALL_ROWS = rows;
// 		applySearch();
// 	}

// 	function applySearch() {
// 		var term = $('#mis-search').val().trim().toLowerCase();
// 		var $tb = $('#mis-table tbody').empty();
// 		var filtered = ALL_ROWS.filter(function (r) {
// 			return r.isGrandTotal || !term || r.display.toLowerCase().indexOf(term) !== -1;
// 		});
// 		if (!filtered.length) {
// 			$tb.append('<tr><td colspan="13" style="text-align:center;padding:40px;color:#aaa;">No matching rows.</td></tr>');
// 			return;
// 		}
// 		filtered.forEach(function (r) { $tb.append(rowHtml(r)); });
// 	}

// 	$(document).on('input', '#mis-search', function () { applySearch(); });

// 	// =============================================================================
// 	// LOAD
// 	// =============================================================================

// 	function loadData() {
// 		var fy = fyControl.get_value(); if (!fy) { return; }
// 		var month = monthControl.get_value() || 'March';
// 		var prevFY = getPrevFY(fy);

// 		$('#mis-title').text('Unit Wise Plan \u2013 Budget vs Actual (' + fy + ')');
// 		Loader.show('Loading Monthly MIS\u2026');

// 		Promise.all([
// 			fetchUnitWisePlan(fy, month),
// 			fetchUnitWisePlan(prevFY, month)
// 		]).then(function (results) {
// 			Loader.hide();
// 			var curData = results[0], prevData = results[1];
// 			if (!curData.length && !prevData.length) {
// 				$('#mis-table thead').empty();
// 				$('#mis-table tbody').html('<tr><td style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			renderTable(curData, prevData, fy, prevFY, month);
// 		}).catch(function () {
// 			Loader.hide();
// 			$('#mis-table tbody').html('<tr><td style="text-align:center;padding:40px;color:red;">Error loading data.</td></tr>');
// 		});
// 	}

// };


// frappe.pages['monthly-mis'].on_page_load = function (wrapper) {

// 	// =============================================================================
// 	// PAGE SETUP
// 	// =============================================================================

// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper, title: 'Monthly MIS', single_column: true
// 	});

// 	// =============================================================================
// 	// LOADER
// 	// =============================================================================

// 	if (!$('#mis-loader').length) {
// 		$('body').append(
// 			'<div id="mis-loader" class="mis-loader-overlay">' +
// 			'<div class="mis-loader-box"><img src="/files/APF logo.png" class="mis-loader-logo" alt="">' +
// 			'<div class="mis-loader-text">Loading, please wait</div></div></div>'
// 		);
// 	}
// 	$('#mis-loader').hide();

// 	var Loader = {
// 		show: function (msg) {
// 			var $l = $('#mis-loader');
// 			$l.find('.mis-loader-text').text(msg || 'Loading, please wait');
// 			$l.css('display', 'flex').hide().fadeIn(200);
// 		},
// 		hide: function () { $('#mis-loader').fadeOut(200); }
// 	};

// 	// =============================================================================
// 	// STYLES
// 	// =============================================================================

// 	$(page.body).append(
// 		'<style>' +
// 		':root{' +
// 		'--font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
// 		'--fs-xs:12px;--fs-sm:13px;--fs-base:14px;--fs-md:15px;--fs-lg:16px;--fs-xl:17px;' +
// 		'--fw-n:400;--fw-m:500;--fw-sb:600;--fw-b:700;' +
// 		'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 		'--orange:#F26B21;' +
// 		'--bdl:#c2ccd4;--bdh:#004a75;--bdo:#a84808;' +
// 		'--txt:#1a1a1a;--txt2:#36414c;--muted:#666;' +
// 		'}' +
// 		'.mis-wrapper{padding:15px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.5;}' +
// 		'.mis-wrapper *{box-sizing:border-box;}' +

// 		/* Filter row */
// 		'.mis-filter-row{padding:8px 0;margin-bottom:10px;display:flex;flex-wrap:wrap;align-items:flex-end;gap:8px;}' +
// 		'.mis-filter-col{min-width:180px;flex:0 0 auto;}' +

// 		/* Apply button */
// 		'.mis-apply-btn{height:32px;padding:0 18px;background:var(--blue-mid);color:#fff;border:none;border-radius:4px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-sb);cursor:pointer;letter-spacing:.3px;transition:background .15s;}' +
// 		'.mis-apply-btn:hover{background:var(--blue-dark);}' +
// 		'.mis-apply-btn:active{background:#005a8a;}' +

// 		/* Title + currency */
// 		'.sinr-section-label{margin:14px 0 4px;font-family:var(--font);font-size:var(--fs-base);font-weight:var(--fw-b);color:var(--txt);text-decoration:underline;letter-spacing:.2px;}' +
// 		'.mis-currency-note{text-align:right;font-family:var(--font);font-size:var(--fs-xs);font-style:italic;color:var(--muted);margin-bottom:4px;}' +
// 		'.mis-currency-note strong{font-weight:var(--fw-b);font-style:normal;}' +

// 		/* Scroll wrapper — clips the table and provides the scrollbars */
// 		'.cb-scroll-wrapper{border:1.5px solid var(--bdl);border-radius:6px;overflow:auto;max-height:74vh;background:#fff;position:relative;}' +

// 		/* Table base */
// 		'.cb-table{border-collapse:collapse;border-spacing:0;width:100%;table-layout:auto;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);}' +
// 		'.cb-table th,.cb-table td{border:1px solid var(--bdl);padding:7px 10px;white-space:nowrap;text-align:right;vertical-align:middle;}' +
// 		'.cb-table th:first-child,.cb-table td:first-child{text-align:left;}' +

// 		/* Main header row (blue) */
// 		'.cb-table thead tr.cb-thead-main th{' +
// 		'  background:var(--blue-mid);color:#fff;' +
// 		'  font-size:var(--fs-md);font-weight:var(--fw-b);text-align:center;' +
// 		'  position:sticky;top:0;z-index:25;' +
// 		'  border:1px solid var(--bdh);padding:9px 10px;' +
// 		'}' +

// 		/* Sub-header row (orange) */
// 		'.cb-table thead tr.cb-thead-sub th{' +
// 		'  background:var(--orange);color:#fff;' +
// 		'  font-size:var(--fs-sm);font-weight:var(--fw-sb);text-align:center;' +
// 		'  position:sticky;top:39px;z-index:24;' +   /* offset = height of main header */
// 		'  border:1px solid var(--bdo);min-width:90px;padding:7px 10px;' +
// 		'}' +

// 		/* Row types */
// 		'.cb-table tr.sinr-total-row td{background:#e8f0fa;color:var(--blue-dark);font-weight:var(--fw-b);border-color:#9baab5;}' +
// 		'.cb-table tr.cb-row-grand td{background:var(--blue-dark);color:#fff;font-weight:var(--fw-b);border-color:#002a47;}' +
// 		'.cb-table .sinr-sub-row td:first-child{padding-left:26px;color:#555;}' +
// 		'.cb-table .sinr-covid-row td{color:#444;}' +

// 		/* % of budget cell colouring (optional, soft) */
// 		'.cb-table td.pct-cell{color:var(--txt2);}' +
// 		'.cb-table tr.cb-row-grand td.pct-cell{color:#fff;}' +
// 		'.cb-table tr.sinr-total-row td.pct-cell{color:var(--blue-dark);}' +

// 		/* ── Sticky first column ── */
// 		'#mis-table thead tr.cb-thead-main th:first-child{' +
// 		'  position:sticky;left:0;z-index:55;' +
// 		'  background:var(--blue-mid);text-align:left;min-width:220px;' +
// 		'}' +
// 		'#mis-table thead tr.cb-thead-sub th:first-child{' +
// 		'  position:sticky;left:0;z-index:54;' +
// 		'  background:var(--orange);' +
// 		'}' +
// 		'#mis-table tbody td:first-child{' +
// 		'  position:sticky;left:0;z-index:10;' +
// 		'  background:#fff;text-align:left;min-width:220px;' +
// 		'  box-shadow:2px 0 5px -2px rgba(0,0,0,.10);' +
// 		'}' +
// 		'#mis-table tbody tr.sinr-total-row td:first-child{background:#e8f0fa;}' +
// 		'#mis-table tbody tr.cb-row-grand td:first-child{background:var(--blue-dark);}' +

// 		/* Column-group separator */
// 		'#mis-table .grp-sep{border-left:2px solid var(--blue-mid) !important;}' +
// 		'#mis-table thead tr.cb-thead-sub th.grp-sep{border-left:2px solid var(--blue-dark) !important;}' +

// 		/* Loader */
// 		'#mis-loader.mis-loader-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(18,18,18,.92);backdrop-filter:blur(6px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
// 		'.mis-loader-box{display:flex;flex-direction:column;align-items:center;gap:14px;}' +
// 		'.mis-loader-logo{width:90px;height:90px;border-radius:50%;background:linear-gradient(145deg,#fff,#eaeaea);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.35);animation:misp 1.6s infinite ease-in-out;}' +
// 		'.mis-loader-text{font-family:var(--font);font-size:var(--fs-sm);color:#fff;font-weight:var(--fw-sb);letter-spacing:.5px;opacity:.85;}' +
// 		'@keyframes misp{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.08);opacity:1;}}' +
// 		'</style>'
// 	);

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================

// 	$(page.body).append(
// 		'<div class="mis-wrapper">' +
// 		'<div class="mis-filter-row" id="mis-filter-row">' +
// 		  '<div class="mis-filter-col" id="mis-fy-wrap"></div>' +
// 		  '<div class="mis-filter-col" id="mis-month-wrap"></div>' +
// 		  '<div class="mis-filter-col" style="padding-bottom:2px;">' +
// 		    '<button class="mis-apply-btn" id="mis-apply-btn">Apply</button>' +
// 		  '</div>' +
// 		'</div>' +
// 		'<div class="sinr-section-label" id="mis-title">Unit Wise Plan \u2013 Budget vs Actual</div>' +
// 		'<div class="mis-currency-note">&#8377; <strong>Cr.</strong></div>' +
// 		'<div class="cb-scroll-wrapper">' +
// 		  '<table id="mis-table" class="cb-table"><thead></thead><tbody>' +
// 		  '<tr><td colspan="15" style="text-align:center;padding:40px;color:#aaa;">Loading\u2026</td></tr>' +
// 		  '</tbody></table>' +
// 		'</div>' +
// 		'</div>'
// 	);

// 	// =============================================================================
// 	// FY HELPERS
// 	// =============================================================================

// 	function getPrevFY(fy) {
// 		var p = (fy || '2025-26').split('-');
// 		return (parseInt(p[0] || '2025', 10) - 1) + '-' + String(parseInt(p[1] || '26', 10) - 1).padStart(2, '0');
// 	}

// 	var MONTHS = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];

// 	// =============================================================================
// 	// FINANCIAL YEAR + MONTH FILTERS
// 	// =============================================================================

// 	var fyControl = frappe.ui.form.make_control({
// 		parent: $('#mis-fy-wrap'),
// 		df: { label: 'Financial Year', fieldtype: 'Select', fieldname: 'financial_year', reqd: 1 },
// 		render_input: true
// 	});
// 	fyControl.refresh();

// 	var monthControl = frappe.ui.form.make_control({
// 		parent: $('#mis-month-wrap'),
// 		df: { label: 'Month (YTD up to)', fieldtype: 'Select', fieldname: 'month', reqd: 1, options: MONTHS.join('\n') },
// 		render_input: true
// 	});
// 	monthControl.refresh();

// 	// Apply button click
// 	$('#mis-apply-btn').on('click', function () {
// 		var fy = fyControl.get_value();
// 		var month = monthControl.get_value();
// 		if (!fy || !month) { frappe.msgprint('Please select both Financial Year and Month.'); return; }
// 		loadData();
// 	});

// 	frappe.call({
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (!r.message || !r.message.length) { return; }
// 			var years = r.message.map(function (d) { return d.financial_year; });
// 			fyControl.df.options = years.join('\n'); fyControl.refresh();

// 			var today = new Date(), y = today.getFullYear(), m = today.getMonth() + 1;
// 			var curFY = (m >= 4 ? y : y - 1) + '-' + String(m >= 4 ? y + 1 : y).slice(-2);
// 			var target = years.indexOf(curFY) !== -1 ? curFY : years[0];
// 			fyControl.set_value(target);

// 			var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'][m - 1];
// 			monthControl.set_value(MONTHS.indexOf(monthName) !== -1 ? monthName : 'March');

// 			loadData();
// 		}
// 	});

// 	// =============================================================================
// 	// DATA FETCH
// 	// =============================================================================

// 	function fetchUnitWisePlan(fy, month) {
// 		return new Promise(function (resolve) {
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 				args: { financial_year: fy, month: month, table_name_filter: 'Unit Wise Plan' },
// 				callback: function (r) {
// 					var d = Array.isArray(r.message) ? r.message
// 						: ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
// 					resolve(d || []);
// 				},
// 				error: function () { resolve([]); }
// 			});
// 		});
// 	}

// 	// =============================================================================
// 	// EXTRACTION HELPERS
// 	// =============================================================================

// 	function normN(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }
// 	function zero2() { return { opex_plan: 0, opex_act: 0, capex_plan: 0, capex_act: 0, total_plan: 0, total_act: 0 }; }
// 	function addV2(a, b) {
// 		return {
// 			opex_plan:   a.opex_plan   + b.opex_plan,
// 			opex_act:    a.opex_act    + b.opex_act,
// 			capex_plan:  a.capex_plan  + b.capex_plan,
// 			capex_act:   a.capex_act   + b.capex_act,
// 			total_plan:  a.total_plan  + b.total_plan,
// 			total_act:   a.total_act   + b.total_act
// 		};
// 	}

// 	function extractA(actuals) {
// 		var r = zero2();
// 		(actuals || []).forEach(function (sec) {
// 			var nm = normN(sec.name);
// 			if (nm === 'OPERATING EXPENSES' || nm === 'OPERATING  EXPENSES') {
// 				r.opex_plan += parseFloat(sec.ytd || 0);
// 				r.opex_act  += parseFloat(sec.total_posted_amt_ytd || 0);
// 			}
// 			if (nm === 'CAPITAL EXPENSES' || nm === 'CAPITAL  EXPENSES') {
// 				r.capex_plan += parseFloat(sec.ytd || 0);
// 				r.capex_act  += parseFloat(sec.total_posted_amt_ytd || 0);
// 			}
// 		});
// 		r.total_plan = r.opex_plan + r.capex_plan;
// 		r.total_act  = r.opex_act  + r.capex_act;
// 		return r;
// 	}

// 	function getConsolidatedTotalsFromEntry(ct) {
// 		var r = zero2();
// 		(ct.actuals || []).forEach(function (a) {
// 			var nm = normN(a.name);
// 			if (nm === 'OPEX TOTAL')         { r.opex_plan  += parseFloat(a.ytd || 0); r.opex_act  += parseFloat(a.total_posted_amt_ytd || 0); }
// 			if (nm === 'CAPEX TOTAL')        { r.capex_plan += parseFloat(a.ytd || 0); r.capex_act += parseFloat(a.total_posted_amt_ytd || 0); }
// 			if (nm === 'OVERALL GRAND TOTAL'){ r.total_plan  = parseFloat(a.ytd || 0); r.total_act  = parseFloat(a.total_posted_amt_ytd || 0); }
// 		});
// 		if (!r.total_plan && !r.total_act) { r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act; }
// 		return r;
// 	}

// 	function buildMap(data) {
// 		var sorted = (data || []).slice().sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// 		var rows = {}, subFlags = {}, covidFlags = {}, normalOrder = [], covidOrder = [], grand = null;
// 		sorted.forEach(function (e) {
// 			var tbl = (e.table_name || '').toUpperCase();
// 			if (e.sequence_id === 9999 || tbl === 'CONSOLIDATED') {
// 				grand = getConsolidatedTotalsFromEntry(e); return;
// 			}
// 			var lbl = (e.label || '').trim();
// 			rows[lbl]       = extractA(e.actuals);
// 			subFlags[lbl]   = e.is_this_sub_item === 1;
// 			covidFlags[lbl] = lbl.toLowerCase().indexOf('covid') !== -1;
// 			(covidFlags[lbl] ? covidOrder : normalOrder).push(lbl);
// 		});
// 		var order = normalOrder.concat(covidOrder);
// 		if (!grand) {
// 			grand = zero2();
// 			order.forEach(function (lbl) { if (!subFlags[lbl]) { grand = addV2(grand, rows[lbl]); } });
// 		}
// 		return { order: order, rows: rows, subFlags: subFlags, covidFlags: covidFlags, grand: grand };
// 	}

// 	// =============================================================================
// 	// FORMATTERS
// 	// =============================================================================

// 	function fmtCr(v) {
// 		var n = parseFloat(v) || 0;
// 		if (!isFinite(n) || n === 0) { return '-'; }
// 		var res = n / 10000000;
// 		var neg = res < 0;
// 		var s = Math.abs(res).toFixed(2).split('.');
// 		var ip = s[0], dp = s[1];
// 		if (ip.length > 3) { ip = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + ip.slice(-3); }
// 		return (neg ? '-' : '') + ip + '.' + dp;
// 	}

// 	function fmtPct(act, plan) {
// 		var a = parseFloat(act) || 0, p = parseFloat(plan) || 0;
// 		if (!p) { return '-'; }
// 		return (a / p * 100).toFixed(1) + '%';
// 	}

// 	// =============================================================================
// 	// RENDER
// 	// =============================================================================

// 	/*
// 	 * Header layout (matches the image):
// 	 *
// 	 *  | Unit / Function | ←──── Current Year YTD (7 cols) ────→ | ←──── Last Year YTD (7 cols) ────→ |
// 	 *  |                 | Opex | Capex | Total | % of Budget     | Opex | Capex | Total | % of Budget  |
// 	 *
// 	 * Total columns = 1 + 4 + 4 = 9
// 	 * (We show % of Budget only on Total column for cleanliness, matching the image)
// 	 */

// 	function buildHeader(curFY, curMonth, prevFY) {
// 		var $t = $('#mis-table thead').empty();

// 		var r1 = '<tr class="cb-thead-main">' +
// 			'<th rowspan="2" style="text-align:left;min-width:220px;top:0;z-index:55;">Unit / Function</th>' +
// 			'<th colspan="4">' + curFY + ' (YTD upto ' + curMonth + ')</th>' +
// 			'<th colspan="4" class="grp-sep">' + prevFY + ' (YTD upto ' + curMonth + ')</th>' +
// 			'</tr>';

// 		var subCur  = '<th>Opex</th><th>Capex</th><th>Total</th><th>% of Budget</th>';
// 		var subPrev = '<th class="grp-sep">Opex</th><th>Capex</th><th>Total</th><th>% of Budget</th>';

// 		var r2 = '<tr class="cb-thead-sub">' + subCur + subPrev + '</tr>';

// 		$t.append(r1 + r2);
// 	}

// 	function rowHtml(r) {
// 		var cls = r.isGrandTotal ? 'cb-row-grand'
// 			: (r.isTotal   ? 'sinr-total-row'
// 			: (r.isCovid   ? 'sinr-covid-row'
// 			: (r.isSub     ? 'sinr-sub-row' : '')));

// 		var lblStyle = r.isSub ? 'padding-left:26px;color:#555;' : '';
// 		var cb = r.cb, pb = r.pb;

// 		return '<tr class="' + cls + '">' +
// 			'<td style="' + lblStyle + '">' + r.display + '</td>' +
// 			// Current YTD
// 			'<td>' + fmtCr(cb.opex_plan)  + '</td>' +
// 			'<td>' + fmtCr(cb.capex_plan) + '</td>' +
// 			'<td>' + fmtCr(cb.total_plan) + '</td>' +
// 			'<td class="pct-cell">' + fmtPct(cb.total_act, cb.total_plan) + '</td>' +
// 			// Previous YTD
// 			'<td class="grp-sep">' + fmtCr(pb.opex_plan)  + '</td>' +
// 			'<td>' + fmtCr(pb.capex_plan) + '</td>' +
// 			'<td>' + fmtCr(pb.total_plan) + '</td>' +
// 			'<td class="pct-cell">' + fmtPct(pb.total_act, pb.total_plan) + '</td>' +
// 			'</tr>';
// 	}

// 	function renderTable(curData, prevData, curFY, prevFY, curMonth) {
// 		buildHeader(curFY, curMonth, prevFY);

// 		var curMap  = buildMap(curData);
// 		var prevMap = buildMap(prevData);

// 		var rows = curMap.order.map(function (lbl) {
// 			return {
// 				display: lbl,
// 				isSub:   curMap.subFlags[lbl],
// 				isCovid: curMap.covidFlags[lbl],
// 				cb:      curMap.rows[lbl]  || zero2(),
// 				pb:      prevMap.rows[lbl] || zero2()
// 			};
// 		});

// 		prevMap.order.forEach(function (lbl) {
// 			if (curMap.rows[lbl] === undefined) {
// 				rows.push({
// 					display: lbl, isSub: prevMap.subFlags[lbl], isCovid: prevMap.covidFlags[lbl],
// 					cb: zero2(), pb: prevMap.rows[lbl]
// 				});
// 			}
// 		});

// 		rows.push({ display: 'Grand Total', isGrandTotal: true, cb: curMap.grand, pb: prevMap.grand });

// 		var $tb = $('#mis-table tbody').empty();
// 		rows.forEach(function (r) { $tb.append(rowHtml(r)); });
// 	}

// 	// =============================================================================
// 	// LOAD
// 	// =============================================================================

// 	function loadData() {
// 		var fy    = fyControl.get_value();    if (!fy) { return; }
// 		var month = monthControl.get_value() || 'March';
// 		var prevFY = getPrevFY(fy);

// 		$('#mis-title').text('Unit Wise Plan \u2013 Budget vs Actual (' + fy + ')');
// 		Loader.show('Loading Unit Wise Plan\u2026');

// 		Promise.all([
// 			fetchUnitWisePlan(fy, month),
// 			fetchUnitWisePlan(prevFY, month)
// 		]).then(function (results) {
// 			Loader.hide();
// 			var curData = results[0], prevData = results[1];
// 			if (!curData.length && !prevData.length) {
// 				$('#mis-table thead').empty();
// 				$('#mis-table tbody').html('<tr><td style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			renderTable(curData, prevData, fy, prevFY, month);
// 		}).catch(function () {
// 			Loader.hide();
// 			$('#mis-table tbody').html('<tr><td style="text-align:center;padding:40px;color:red;">Error loading data.</td></tr>');
// 		});
// 	}

// };

frappe.pages['monthly-mis'].on_page_load = function (wrapper) {

	// =============================================================================
	// PAGE SETUP
	// =============================================================================

	var page = frappe.ui.make_app_page({
		parent: wrapper, title: 'Monthly MIS', single_column: true
	});

	// =============================================================================
	// LOADER
	// =============================================================================

	if (!$('#mis-loader').length) {
		$('body').append(
			'<div id="mis-loader" class="mis-loader-overlay">' +
			'<div class="mis-loader-box"><img src="/files/APF logo.png" class="mis-loader-logo" alt="">' +
			'<div class="mis-loader-text">Loading, please wait</div></div></div>'
		);
	}
	$('#mis-loader').hide();

	var Loader = {
		show: function (msg) {
			var $l = $('#mis-loader');
			$l.find('.mis-loader-text').text(msg || 'Loading, please wait');
			$l.css('display', 'flex').hide().fadeIn(200);
		},
		hide: function () { $('#mis-loader').fadeOut(200); }
	};

	// =============================================================================
	// STYLES
	// =============================================================================

	$(page.body).append(
		'<style>' +
		':root{' +
		'--font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
		'--fs-xs:12px;--fs-sm:13px;--fs-base:14px;--fs-md:15px;--fs-lg:16px;--fs-xl:17px;' +
		'--fw-n:400;--fw-m:500;--fw-sb:600;--fw-b:700;' +
		'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
		'--orange:#F26B21;' +
		'--bdl:#c2ccd4;--bdh:#004a75;--bdo:#a84808;' +
		'--txt:#1a1a1a;--txt2:#36414c;--muted:#666;' +
		'}' +
		'.mis-wrapper{padding:15px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.5;}' +
		'.mis-wrapper *{box-sizing:border-box;}' +

		/* Filter row */
		'.mis-filter-row{padding:8px 0;margin-bottom:10px;display:flex;flex-wrap:wrap;align-items:flex-end;gap:8px;}' +
		'.mis-filter-col{min-width:180px;flex:0 0 auto;}' +

		/* Title + currency */
		'.sinr-section-label{margin:14px 0 4px;font-family:var(--font);font-size:var(--fs-base);font-weight:var(--fw-b);color:var(--txt);text-decoration:underline;letter-spacing:.2px;}' +
		'.mis-currency-note{text-align:right;font-family:var(--font);font-size:var(--fs-xs);font-style:italic;color:var(--muted);margin-bottom:4px;}' +
		'.mis-currency-note strong{font-weight:var(--fw-b);font-style:normal;}' +

		/* Scroll wrapper — clips the table and provides the scrollbars */
		'.cb-scroll-wrapper{border:1.5px solid var(--bdl);border-radius:6px;overflow:auto;max-height:74vh;background:#fff;position:relative;}' +

		/* Table base */
		'.cb-table{border-collapse:collapse;border-spacing:0;width:100%;table-layout:auto;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);}' +
		'.cb-table th,.cb-table td{border:1px solid var(--bdl);padding:7px 10px;white-space:nowrap;text-align:right;vertical-align:middle;}' +
		'.cb-table th:first-child,.cb-table td:first-child{text-align:left;}' +

		/* Main header row (blue) */
		'.cb-table thead tr.cb-thead-main th{' +
		'  background:var(--blue-mid);color:#fff;' +
		'  font-size:var(--fs-md);font-weight:var(--fw-b);text-align:center;' +
		'  position:sticky;top:0;z-index:25;' +
		'  border:1px solid var(--bdh);padding:9px 10px;' +
		'}' +

		/* Sub-header row (orange) */
		'.cb-table thead tr.cb-thead-sub th{' +
		'  background:var(--orange);color:#fff;' +
		'  font-size:var(--fs-sm);font-weight:var(--fw-sb);text-align:center;' +
		'  position:sticky;top:39px;z-index:24;' +   /* offset = height of main header */
		'  border:1px solid var(--bdo);min-width:90px;padding:7px 10px;' +
		'}' +

		/* Row types */
		'.cb-table tr.sinr-total-row td{background:#e8f0fa;color:var(--blue-dark);font-weight:var(--fw-b);border-color:#9baab5;}' +
		'.cb-table tr.cb-row-grand td{background:var(--blue-dark);color:#fff;font-weight:var(--fw-b);border-color:#002a47;}' +
		'.cb-table .sinr-sub-row td:first-child{padding-left:26px;color:#555;}' +
		'.cb-table .sinr-covid-row td{color:#444;}' +

		/* % of budget cell colouring (optional, soft) */
		'.cb-table td.pct-cell{color:var(--txt2);}' +
		'.cb-table tr.cb-row-grand td.pct-cell{color:#fff;}' +
		'.cb-table tr.sinr-total-row td.pct-cell{color:var(--blue-dark);}' +

		/* ── Sticky first column ── */
		'#mis-table thead tr.cb-thead-main th:first-child{' +
		'  position:sticky;left:0;z-index:55;' +
		'  background:var(--blue-mid);text-align:left;min-width:220px;' +
		'}' +
		'#mis-table thead tr.cb-thead-sub th:first-child{' +
		'  position:sticky;left:0;z-index:54;' +
		'  background:var(--orange);' +
		'}' +
		'#mis-table tbody td:first-child{' +
		'  position:sticky;left:0;z-index:10;' +
		'  background:#fff;text-align:left;min-width:220px;' +
		'  box-shadow:2px 0 5px -2px rgba(0,0,0,.10);' +
		'}' +
		'#mis-table tbody tr.sinr-total-row td:first-child{background:#e8f0fa;}' +
		'#mis-table tbody tr.cb-row-grand td:first-child{background:var(--blue-dark);}' +

		/* Column-group separator */
		'#mis-table .grp-sep{border-left:2px solid var(--blue-mid) !important;}' +
		'#mis-table thead tr.cb-thead-sub th.grp-sep{border-left:2px solid var(--blue-dark) !important;}' +

		/* Loader */
		'#mis-loader.mis-loader-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(18,18,18,.92);backdrop-filter:blur(6px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
		'.mis-loader-box{display:flex;flex-direction:column;align-items:center;gap:14px;}' +
		'.mis-loader-logo{width:90px;height:90px;border-radius:50%;background:linear-gradient(145deg,#fff,#eaeaea);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.35);animation:misp 1.6s infinite ease-in-out;}' +
		'.mis-loader-text{font-family:var(--font);font-size:var(--fs-sm);color:#fff;font-weight:var(--fw-sb);letter-spacing:.5px;opacity:.85;}' +
		'@keyframes misp{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.08);opacity:1;}}' +
		'</style>'
	);

	// =============================================================================
	// HTML SKELETON
	// =============================================================================

	$(page.body).append(
		'<div class="mis-wrapper">' +
		'<div class="mis-filter-row" id="mis-filter-row">' +
		  '<div class="mis-filter-col" id="mis-fy-wrap"></div>' +
		  '<div class="mis-filter-col" id="mis-month-wrap"></div>' +
		'</div>' +
		'<div class="sinr-section-label" id="mis-title">Unit Wise Plan \u2013 Budget vs Actual</div>' +
		'<div class="mis-currency-note">&#8377; <strong>Cr.</strong></div>' +
		'<div class="cb-scroll-wrapper">' +
		  '<table id="mis-table" class="cb-table"><thead></thead><tbody>' +
		  '<tr><td colspan="15" style="text-align:center;padding:40px;color:#aaa;">Loading\u2026</td></tr>' +
		  '</tbody></table>' +
		'</div>' +
		'</div>'
	);

	// =============================================================================
	// FY HELPERS
	// =============================================================================

	function getPrevFY(fy) {
		var p = (fy || '2025-26').split('-');
		return (parseInt(p[0] || '2025', 10) - 1) + '-' + String(parseInt(p[1] || '26', 10) - 1).padStart(2, '0');
	}

	var MONTHS = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];

	// =============================================================================
	// FINANCIAL YEAR + MONTH FILTERS
	// =============================================================================

	var fyControl = frappe.ui.form.make_control({
		parent: $('#mis-fy-wrap'),
		df: { label: 'Financial Year', fieldtype: 'Select', fieldname: 'financial_year', reqd: 1 },
		render_input: true
	});
	fyControl.refresh();

	var monthControl = frappe.ui.form.make_control({
		parent: $('#mis-month-wrap'),
		df: { label: 'Month (YTD up to)', fieldtype: 'Select', fieldname: 'month', reqd: 1, options: MONTHS.join('\n') },
		render_input: true
	});
	monthControl.refresh();

	// Frappe primary action button (toolbar)
	page.set_primary_action("Apply", function () {
		var fy    = fyControl.get_value();
		var month = monthControl.get_value();
		if (!fy || !month) { frappe.msgprint("Please select Financial Year and Month."); return; }
		loadData();
	}, "fa fa-check");

	frappe.call({
		method: 'annual_budget.api.filter_options.get_financial_year_list',
		callback: function (r) {
			if (!r.message || !r.message.length) { return; }
			var years = r.message.map(function (d) { return d.financial_year; });
			fyControl.df.options = years.join('\n'); fyControl.refresh();

			var today = new Date(), y = today.getFullYear(), m = today.getMonth() + 1;
			var curFY = (m >= 4 ? y : y - 1) + '-' + String(m >= 4 ? y + 1 : y).slice(-2);
			var target = years.indexOf(curFY) !== -1 ? curFY : years[0];
			var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'][m - 1];
			var defaultMonth = MONTHS.indexOf(monthName) !== -1 ? monthName : 'March';

			// set_value returns a Promise in Frappe — wait for both before loading
			Promise.all([
				fyControl.set_value(target),
				monthControl.set_value(defaultMonth)
			]).then(function () {
				loadData();
			});
		}
	});

	// =============================================================================
	// DATA FETCH
	// =============================================================================

	function fetchUnitWisePlan(fy, month) {
		return new Promise(function (resolve) {
			frappe.call({
				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
				args: { financial_year: fy, month: month, table_name_filter: 'Unit Wise Plan' },
				callback: function (r) {
					var d = Array.isArray(r.message) ? r.message
						: ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
					resolve(d || []);
				},
				error: function () { resolve([]); }
			});
		});
	}

	// =============================================================================
	// EXTRACTION HELPERS
	// =============================================================================

	function normN(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }
	function zero2() { return { opex_plan: 0, opex_act: 0, capex_plan: 0, capex_act: 0, total_plan: 0, total_act: 0 }; }
	function addV2(a, b) {
		return {
			opex_plan:   a.opex_plan   + b.opex_plan,
			opex_act:    a.opex_act    + b.opex_act,
			capex_plan:  a.capex_plan  + b.capex_plan,
			capex_act:   a.capex_act   + b.capex_act,
			total_plan:  a.total_plan  + b.total_plan,
			total_act:   a.total_act   + b.total_act
		};
	}

	function extractA(actuals) {
		var r = zero2();
		(actuals || []).forEach(function (sec) {
			var nm = normN(sec.name);
			if (nm === 'OPERATING EXPENSES' || nm === 'OPERATING  EXPENSES') {
				r.opex_plan += parseFloat(sec.ytd || 0);
				r.opex_act  += parseFloat(sec.total_posted_amt_ytd || 0);
			}
			if (nm === 'CAPITAL EXPENSES' || nm === 'CAPITAL  EXPENSES') {
				r.capex_plan += parseFloat(sec.ytd || 0);
				r.capex_act  += parseFloat(sec.total_posted_amt_ytd || 0);
			}
		});
		r.total_plan = r.opex_plan + r.capex_plan;
		r.total_act  = r.opex_act  + r.capex_act;
		return r;
	}

	function getConsolidatedTotalsFromEntry(ct) {
		var r = zero2();
		(ct.actuals || []).forEach(function (a) {
			var nm = normN(a.name);
			if (nm === 'OPEX TOTAL')         { r.opex_plan  += parseFloat(a.ytd || 0); r.opex_act  += parseFloat(a.total_posted_amt_ytd || 0); }
			if (nm === 'CAPEX TOTAL')        { r.capex_plan += parseFloat(a.ytd || 0); r.capex_act += parseFloat(a.total_posted_amt_ytd || 0); }
			if (nm === 'OVERALL GRAND TOTAL'){ r.total_plan  = parseFloat(a.ytd || 0); r.total_act  = parseFloat(a.total_posted_amt_ytd || 0); }
		});
		if (!r.total_plan && !r.total_act) { r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act; }
		return r;
	}

	function buildMap(data) {
		var sorted = (data || []).slice().sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
		var rows = {}, subFlags = {}, covidFlags = {}, normalOrder = [], covidOrder = [], grand = null;
		sorted.forEach(function (e) {
			var tbl = (e.table_name || '').toUpperCase();
			if (e.sequence_id === 9999 || tbl === 'CONSOLIDATED') {
				grand = getConsolidatedTotalsFromEntry(e); return;
			}
			var lbl = (e.label || '').trim();
			rows[lbl]       = extractA(e.actuals);
			subFlags[lbl]   = e.is_this_sub_item === 1;
			covidFlags[lbl] = lbl.toLowerCase().indexOf('covid') !== -1;
			(covidFlags[lbl] ? covidOrder : normalOrder).push(lbl);
		});
		var order = normalOrder.concat(covidOrder);
		if (!grand) {
			grand = zero2();
			order.forEach(function (lbl) { if (!subFlags[lbl]) { grand = addV2(grand, rows[lbl]); } });
		}
		return { order: order, rows: rows, subFlags: subFlags, covidFlags: covidFlags, grand: grand };
	}

	// =============================================================================
	// FORMATTERS
	// =============================================================================

	function fmtCr(v) {
		var n = parseFloat(v) || 0;
		if (!isFinite(n) || n === 0) { return '-'; }
		var res = n / 10000000;
		var neg = res < 0;
		var s = Math.abs(res).toFixed(2).split('.');
		var ip = s[0], dp = s[1];
		if (ip.length > 3) { ip = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + ip.slice(-3); }
		return (neg ? '-' : '') + ip + '.' + dp;
	}

	function fmtPct(act, plan) {
		var a = parseFloat(act) || 0, p = parseFloat(plan) || 0;
		if (!p) { return '-'; }
		return (a / p * 100).toFixed(1) + '%';
	}

	// =============================================================================
	// RENDER
	// =============================================================================

	/*
	 * Header layout (matches the image):
	 *
	 *  | Unit / Function | ←──── Current Year YTD (7 cols) ────→ | ←──── Last Year YTD (7 cols) ────→ |
	 *  |                 | Opex | Capex | Total | % of Budget     | Opex | Capex | Total | % of Budget  |
	 *
	 * Total columns = 1 + 4 + 4 = 9
	 * (We show % of Budget only on Total column for cleanliness, matching the image)
	 */

	function buildHeader(curFY, curMonth, prevFY) {
		var $t = $('#mis-table thead').empty();

		var r1 = '<tr class="cb-thead-main">' +
			'<th rowspan="2" style="text-align:left;min-width:220px;top:0;z-index:55;">Unit / Function</th>' +
			'<th colspan="4">' + curFY + ' (YTD upto ' + curMonth + ')</th>' +
			'<th colspan="4" class="grp-sep">' + prevFY + ' (YTD upto ' + curMonth + ')</th>' +
			'</tr>';

		var subCur  = '<th>Opex</th><th>Capex</th><th>Total</th><th>% of Budget</th>';
		var subPrev = '<th class="grp-sep">Opex</th><th>Capex</th><th>Total</th><th>% of Budget</th>';

		var r2 = '<tr class="cb-thead-sub">' + subCur + subPrev + '</tr>';

		$t.append(r1 + r2);
	}

	function rowHtml(r) {
		var cls = r.isGrandTotal ? 'cb-row-grand'
			: (r.isTotal   ? 'sinr-total-row'
			: (r.isCovid   ? 'sinr-covid-row'
			: (r.isSub     ? 'sinr-sub-row' : '')));

		var lblStyle = r.isSub ? 'padding-left:26px;color:#555;' : '';
		var cb = r.cb, pb = r.pb;

		return '<tr class="' + cls + '">' +
			'<td style="' + lblStyle + '">' + r.display + '</td>' +
			// Current YTD
			'<td>' + fmtCr(cb.opex_plan)  + '</td>' +
			'<td>' + fmtCr(cb.capex_plan) + '</td>' +
			'<td>' + fmtCr(cb.total_plan) + '</td>' +
			'<td class="pct-cell">' + fmtPct(cb.total_act, cb.total_plan) + '</td>' +
			// Previous YTD
			'<td class="grp-sep">' + fmtCr(pb.opex_plan)  + '</td>' +
			'<td>' + fmtCr(pb.capex_plan) + '</td>' +
			'<td>' + fmtCr(pb.total_plan) + '</td>' +
			'<td class="pct-cell">' + fmtPct(pb.total_act, pb.total_plan) + '</td>' +
			'</tr>';
	}

	function renderTable(curData, prevData, curFY, prevFY, curMonth) {
		buildHeader(curFY, curMonth, prevFY);

		var curMap  = buildMap(curData);
		var prevMap = buildMap(prevData);

		var rows = curMap.order.map(function (lbl) {
			return {
				display: lbl,
				isSub:   curMap.subFlags[lbl],
				isCovid: curMap.covidFlags[lbl],
				cb:      curMap.rows[lbl]  || zero2(),
				pb:      prevMap.rows[lbl] || zero2()
			};
		});

		prevMap.order.forEach(function (lbl) {
			if (curMap.rows[lbl] === undefined) {
				rows.push({
					display: lbl, isSub: prevMap.subFlags[lbl], isCovid: prevMap.covidFlags[lbl],
					cb: zero2(), pb: prevMap.rows[lbl]
				});
			}
		});

		rows.push({ display: 'Grand Total', isGrandTotal: true, cb: curMap.grand, pb: prevMap.grand });

		var $tb = $('#mis-table tbody').empty();
		rows.forEach(function (r) { $tb.append(rowHtml(r)); });
	}

	// =============================================================================
	// LOAD
	// =============================================================================

	function loadData() {
		var fy    = fyControl.get_value();    if (!fy) { return; }
		var month = monthControl.get_value() || 'March';
		var prevFY = getPrevFY(fy);

		$('#mis-title').text('Unit Wise Plan \u2013 Budget vs Actual (' + fy + ')');
		Loader.show('Loading Unit Wise Plan\u2026');

		Promise.all([
			fetchUnitWisePlan(fy, month),
			fetchUnitWisePlan(prevFY, month)
		]).then(function (results) {
			Loader.hide();
			var curData = results[0], prevData = results[1];
			if (!curData.length && !prevData.length) {
				$('#mis-table thead').empty();
				$('#mis-table tbody').html('<tr><td style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
				return;
			}
			renderTable(curData, prevData, fy, prevFY, month);
		}).catch(function () {
			Loader.hide();
			$('#mis-table tbody').html('<tr><td style="text-align:center;padding:40px;color:red;">Error loading data.</td></tr>');
		});
	}

};