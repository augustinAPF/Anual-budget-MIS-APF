// // frappe.pages['monthly-mis'].on_page_load = function(wrapper) {
// // 	var page = frappe.ui.make_app_page({
// // 		parent: wrapper,
// // 		title: 'Monthly MIS',
// // 		single_column: true
// // 	});
// // }


// // frappe.pages['monthly-mis'].on_page_load = function (wrapper) {

// // 	// =============================================================================
// // 	// PAGE SETUP
// // 	// =============================================================================

// // 	var page = frappe.ui.make_app_page({
// // 		parent: wrapper, title: 'Monthly MIS', single_column: true
// // 	});

// // 	// =============================================================================
// // 	// LOADER
// // 	// =============================================================================

// // 	if (!$('#mis-loader').length) {
// // 		$('body').append(
// // 			'<div id="mis-loader" class="mis-loader-overlay">' +
// // 			'<div class="mis-loader-box"><img src="/files/APF logo.png" class="mis-loader-logo" alt="">' +
// // 			'<div class="mis-loader-text">Loading, please wait</div></div></div>'
// // 		);
// // 	}
// // 	$('#mis-loader').hide();

// // 	var Loader = {
// // 		show: function (msg) {
// // 			var $l = $('#mis-loader');
// // 			$l.find('.mis-loader-text').text(msg || 'Loading, please wait');
// // 			$l.css('display', 'flex').hide().fadeIn(200);
// // 		},
// // 		hide: function () { $('#mis-loader').fadeOut(200); }
// // 	};

// // 	// =============================================================================
// // 	// STYLES
// // 	// =============================================================================

// // 	$(page.body).append(
// // 		'<style>' +
// // 		':root{' +
// // 		'--font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
// // 		'--fs-xs:12px;--fs-sm:14px;--fs-base:15px;--fs-md:16px;--fs-lg:17px;--fs-xl:18px;' +
// // 		'--fw-n:400;--fw-m:500;--fw-sb:600;--fw-b:700;' +
// // 		'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// // 		'--orange:#F26B21;' +
// // 		'--bdl:#9baab5;--bdh:#004a75;--bdo:#a84808;' +
// // 		'--txt:#1a1a1a;--txt2:#36414c;--muted:#555;' +
// // 		'}' +
// // 		'.mis-wrapper{padding:15px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.5;}' +
// // 		'.mis-wrapper *{box-sizing:border-box;}' +
// // 		'.mis-filter-row{padding:8px 0;margin-bottom:10px;}' +
// // 		'.mis-filter-row .col-md-3,.mis-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// // 		'@media(max-width:768px){.mis-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +
// // 		'.mis-controls{display:flex;align-items:center;padding:7px 12px;margin-bottom:12px;background:#f7f9fb;border:1px solid #e2e6ea;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
// // 		'.mis-search-wrap{position:relative;display:flex;align-items:center;}' +
// // 		'.mis-search-wrap .search-icon{position:absolute;left:8px;color:#8d99a6;pointer-events:none;}' +
// // 		'.mis-search-input{padding:5px 8px 5px 28px;border:1.5px solid var(--bdl);border-radius:4px;font-family:var(--font);font-size:var(--fs-sm);color:var(--txt2);background:#fff;width:240px;height:32px;}' +
// // 		'.mis-search-input:focus{outline:none;border-color:#5e64ff;box-shadow:0 0 0 2px rgba(94,100,255,.15);}' +
// // 		'.sinr-section-label{margin:18px 0 5px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-b);color:var(--txt);text-decoration:underline;letter-spacing:.2px;}' +
// // 		'.mis-currency-note{text-align:right;font-family:var(--font);font-size:var(--fs-xs);font-style:italic;color:var(--muted);margin-bottom:4px;}' +
// // 		'.mis-currency-note strong{font-weight:var(--fw-b);font-style:normal;}' +
// // 		'.cb-scroll-wrapper{border:1.5px solid var(--bdl);border-radius:6px;overflow:auto;max-height:74vh;background:#fff;position:relative;isolation:isolate;}' +
// // 		'.cb-table{border-collapse:collapse !important;border-spacing:0 !important;width:100%;table-layout:auto;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);}' +
// // 		'.cb-table th,.cb-table td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;text-align:right;}' +
// // 		'.cb-table th:first-child,.cb-table td:first-child{text-align:left !important;}' +
// // 		'.cb-table thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-b);text-align:center !important;position:sticky;top:0;z-index:25;border:1.5px solid var(--bdh) !important;padding:10px 12px;}' +
// // 		'.cb-table thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-sm);font-weight:var(--fw-sb);text-align:center !important;position:sticky;z-index:24;border:1.5px solid var(--bdo) !important;min-width:110px;padding:8px 12px;}' +
// // 		'.cb-table tr.sinr-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:var(--fw-b) !important;border:1.5px solid #9baab5 !important;}' +
// // 		'.cb-table tr.cb-row-grand td{background:var(--blue-mid) !important;color:#fff !important;font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;}' +
// // 		'.cb-table .sinr-sub-row td:first-child{padding-left:28px !important;color:#555;}' +
// // 		'.cb-table .sinr-covid-row td{color:#444;}' +
// // 		/* sticky first column */
// // 		'#mis-table thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:55 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:240px;}' +
// // 		'#mis-table thead tr.cb-thead-sub th:first-child{position:sticky;left:0;z-index:54 !important;background:var(--orange) !important;}' +
// // 		'#mis-table tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:240px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +
// // 		'#mis-table tbody tr.sinr-total-row td:first-child{background:#e8f0fa !important;}' +
// // 		'#mis-table tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;}' +
// // 		/* visual separators between the 4 column groups */
// // 		'#mis-table .grp-sep{border-left:2.5px solid var(--blue-mid) !important;}' +
// // 		'#mis-loader.mis-loader-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(18,18,18,.92);backdrop-filter:blur(6px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
// // 		'.mis-loader-box{display:flex;flex-direction:column;align-items:center;gap:14px;}' +
// // 		'.mis-loader-logo{width:90px;height:90px;border-radius:50%;background:linear-gradient(145deg,#fff,#eaeaea);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.35);animation:misp 1.6s infinite ease-in-out;}' +
// // 		'.mis-loader-text{font-family:var(--font);font-size:var(--fs-sm);color:#fff;font-weight:var(--fw-sb);letter-spacing:.5px;opacity:.85;}' +
// // 		'@keyframes misp{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.08);opacity:1;}}' +
// // 		'</style>'
// // 	);

// // 	// =============================================================================
// // 	// HTML SKELETON
// // 	// =============================================================================

// // 	$(page.body).append(
// // 		'<div class="mis-wrapper">' +
// // 		'<div class="frappe-control-group row mis-filter-row" id="mis-filter-row"></div>' +
// // 		'<div class="mis-controls">' +
// // 		'<div class="mis-search-wrap"><svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
// // 		'<input type="text" id="mis-search" class="mis-search-input" placeholder="Search unit / function\u2026"></div>' +
// // 		'</div>' +
// // 		'<div class="sinr-section-label" id="mis-title">Unit Wise Plan \u2013 Budget vs Actual</div>' +
// // 		'<div class="mis-currency-note">&#8377; <strong>Cr.</strong></div>' +
// // 		'<div class="cb-scroll-wrapper"><table id="mis-table" class="cb-table"><thead></thead><tbody>' +
// // 		'<tr><td colspan="13" style="text-align:center;padding:40px;color:#aaa;">Loading\u2026</td></tr>' +
// // 		'</tbody></table></div>' +
// // 		'</div>'
// // 	);

// // 	// =============================================================================
// // 	// FY HELPERS
// // 	// =============================================================================

// // 	function getPrevFY(fy) {
// // 		var p = (fy || '2025-26').split('-');
// // 		return (parseInt(p[0] || '2025', 10) - 1) + '-' + String(parseInt(p[1] || '26', 10) - 1).padStart(2, '0');
// // 	}

// // 	var MONTHS = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];

// // 	// =============================================================================
// // 	// FINANCIAL YEAR + MONTH FILTERS
// // 	// =============================================================================

// // 	var fyControl = frappe.ui.form.make_control({
// // 		parent: $('<div class="col-md-3 col-sm-12"></div>').appendTo('#mis-filter-row'),
// // 		df: {
// // 			label: 'Financial Year', fieldtype: 'Select', fieldname: 'financial_year', reqd: 1,
// // 			change: function () { var y = this.get_value(); if (!y) { return; } loadData(); }
// // 		},
// // 		render_input: true
// // 	});
// // 	fyControl.refresh();

// // 	var monthControl = frappe.ui.form.make_control({
// // 		parent: $('<div class="col-md-3 col-sm-12"></div>').appendTo('#mis-filter-row'),
// // 		df: {
// // 			label: 'Month (YTD up to)', fieldtype: 'Select', fieldname: 'month', reqd: 1,
// // 			options: MONTHS.join('\n'),
// // 			change: function () { var m = this.get_value(); if (!m) { return; } loadData(); }
// // 		},
// // 		render_input: true
// // 	});
// // 	monthControl.refresh();

// // 	frappe.call({
// // 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// // 		callback: function (r) {
// // 			if (!r.message || !r.message.length) { return; }
// // 			var years = r.message.map(function (d) { return d.financial_year; });
// // 			fyControl.df.options = years.join('\n'); fyControl.refresh();

// // 			var today = new Date(), y = today.getFullYear(), m = today.getMonth() + 1; // 1-12
// // 			var curFY = (m >= 4 ? y : y - 1) + '-' + String(m >= 4 ? y + 1 : y).slice(-2);
// // 			var target = years.indexOf(curFY) !== -1 ? curFY : years[0];
// // 			fyControl.set_value(target);

// // 			// Default month = current calendar month name (mapped onto FY month list)
// // 			var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'][m - 1];
// // 			monthControl.set_value(MONTHS.indexOf(monthName) !== -1 ? monthName : 'March');

// // 			loadData();
// // 		}
// // 	});

// // 	// =============================================================================
// // 	// DATA FETCH  (Unit Wise Plan — same source as Summary in INR / Section A)
// // 	// =============================================================================

// // 	function fetchUnitWisePlan(fy, month) {
// // 		return new Promise(function (resolve) {
// // 			frappe.call({
// // 				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// // 				args: { financial_year: fy, month: month, table_name_filter: 'Unit Wise Plan' },
// // 				callback: function (r) {
// // 					var d = Array.isArray(r.message) ? r.message
// // 						: ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
// // 					resolve(d || []);
// // 				},
// // 				error: function () { resolve([]); }
// // 			});
// // 		});
// // 	}

// // 	// =============================================================================
// // 	// EXTRACTION HELPERS
// // 	// (ytd = Budget/Plan, total_posted_amt_ytd = Actual)
// // 	// =============================================================================

// // 	function normN(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }
// // 	function zero2() { return { opex_plan: 0, opex_act: 0, capex_plan: 0, capex_act: 0, total_plan: 0, total_act: 0 }; }
// // 	function addV2(a, b) {
// // 		return {
// // 			opex_plan: a.opex_plan + b.opex_plan, opex_act: a.opex_act + b.opex_act,
// // 			capex_plan: a.capex_plan + b.capex_plan, capex_act: a.capex_act + b.capex_act,
// // 			total_plan: a.total_plan + b.total_plan, total_act: a.total_act + b.total_act
// // 		};
// // 	}

// // 	function extractA(actuals) {
// // 		var r = zero2();
// // 		(actuals || []).forEach(function (sec) {
// // 			var nm = normN(sec.name);
// // 			if (nm === 'OPERATING EXPENSES' || nm === 'OPERATING  EXPENSES') { r.opex_plan += parseFloat(sec.ytd || 0); r.opex_act += parseFloat(sec.total_posted_amt_ytd || 0); }
// // 			if (nm === 'CAPITAL EXPENSES' || nm === 'CAPITAL  EXPENSES') { r.capex_plan += parseFloat(sec.ytd || 0); r.capex_act += parseFloat(sec.total_posted_amt_ytd || 0); }
// // 		});
// // 		r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act;
// // 		return r;
// // 	}

// // 	function getConsolidatedTotalsFromEntry(ct) {
// // 		var r = zero2();
// // 		(ct.actuals || []).forEach(function (a) {
// // 			var nm = normN(a.name);
// // 			if (nm === 'OPEX TOTAL') { r.opex_plan += parseFloat(a.ytd || 0); r.opex_act += parseFloat(a.total_posted_amt_ytd || 0); }
// // 			if (nm === 'CAPEX TOTAL') { r.capex_plan += parseFloat(a.ytd || 0); r.capex_act += parseFloat(a.total_posted_amt_ytd || 0); }
// // 			if (nm === 'OVERALL GRAND TOTAL') { r.total_plan = parseFloat(a.ytd || 0); r.total_act = parseFloat(a.total_posted_amt_ytd || 0); }
// // 		});
// // 		if (!r.total_plan && !r.total_act) { r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act; }
// // 		return r;
// // 	}

// // 	// Build { order:[label,...], rows:{label:vals}, subFlags:{}, covidFlags:{}, grand: vals }
// // 	function buildMap(data) {
// // 		var sorted = (data || []).slice().sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// // 		var rows = {}, subFlags = {}, covidFlags = {}, normalOrder = [], covidOrder = [], grand = null;
// // 		sorted.forEach(function (e) {
// // 			var tbl = (e.table_name || '').toUpperCase();
// // 			if (e.sequence_id === 9999 || tbl === 'CONSOLIDATED') {
// // 				grand = getConsolidatedTotalsFromEntry(e);
// // 				return;
// // 			}
// // 			var lbl = (e.label || '').trim();
// // 			rows[lbl] = extractA(e.actuals);
// // 			subFlags[lbl] = e.is_this_sub_item === 1;
// // 			covidFlags[lbl] = lbl.toLowerCase().indexOf('covid') !== -1;
// // 			(covidFlags[lbl] ? covidOrder : normalOrder).push(lbl);
// // 		});
// // 		var order = normalOrder.concat(covidOrder);
// // 		if (!grand) {
// // 			grand = zero2();
// // 			order.forEach(function (lbl) { if (!subFlags[lbl]) { grand = addV2(grand, rows[lbl]); } });
// // 		}
// // 		return { order: order, rows: rows, subFlags: subFlags, covidFlags: covidFlags, grand: grand };
// // 	}

// // 	// =============================================================================
// // 	// FORMATTERS
// // 	// =============================================================================

// // 	function fmtCr(v) {
// // 		var n = parseFloat(v) || 0;
// // 		if (!isFinite(n) || n === 0) { return '-'; }
// // 		var res = n / 10000000;
// // 		var neg = res < 0;
// // 		var s = Math.abs(res).toFixed(2).split('.');
// // 		var ip = s[0], dp = s[1];
// // 		if (ip.length > 3) { ip = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + ip.slice(-3); }
// // 		return (neg ? '-' : '') + ip + '.' + dp;
// // 	}

// // 	// =============================================================================
// // 	// RENDER
// // 	// =============================================================================

// // 	function buildHeader(curFY, curMonth, prevFY) {
// // 		var $t = $('#mis-table thead').empty();
// // 		var r1 = '<tr class="cb-thead-main">' +
// // 			'<th rowspan="2" style="text-align:left !important;min-width:240px;">Unit / Function</th>' +
// // 			'<th colspan="3">' + curFY + ' Budget</th>' +
// // 			'<th colspan="3" class="grp-sep">' + curFY + ' Actual (upto ' + curMonth + ')</th>' +
// // 			'<th colspan="3" class="grp-sep">' + prevFY + ' Budget</th>' +
// // 			'<th colspan="3" class="grp-sep">' + prevFY + ' Actual (upto ' + curMonth + ')</th>' +
// // 			'</tr>';
// // 		var sub = '<th>Opex</th><th>Capex</th><th>Total</th>';
// // 		var r2 = '<tr class="cb-thead-sub">' +
// // 			sub + '<th class="grp-sep">Opex</th><th>Capex</th><th>Total</th>' +
// // 			'<th class="grp-sep">Opex</th><th>Capex</th><th>Total</th>' +
// // 			'<th class="grp-sep">Opex</th><th>Capex</th><th>Total</th>' +
// // 			'</tr>';
// // 		$t.append(r1 + r2);
// // 	}

// // 	function rowHtml(r) {
// // 		var cls = r.isGrandTotal ? 'cb-row-grand' : (r.isTotal ? 'sinr-total-row' : (r.isCovid ? 'sinr-covid-row' : (r.isSub ? 'sinr-sub-row' : '')));
// // 		var lblStyle = r.isSub ? 'padding-left:28px;color:#555;' : '';
// // 		var cb = r.cb, pb = r.pb;
// // 		return '<tr class="' + cls + '">' +
// // 			'<td style="' + lblStyle + '">' + r.display + '</td>' +
// // 			// Current FY Budget
// // 			'<td>' + fmtCr(cb.opex_plan) + '</td><td>' + fmtCr(cb.capex_plan) + '</td><td>' + fmtCr(cb.total_plan) + '</td>' +
// // 			// Current FY Actual
// // 			'<td class="grp-sep">' + fmtCr(cb.opex_act) + '</td><td>' + fmtCr(cb.capex_act) + '</td><td>' + fmtCr(cb.total_act) + '</td>' +
// // 			// Previous FY Budget
// // 			'<td class="grp-sep">' + fmtCr(pb.opex_plan) + '</td><td>' + fmtCr(pb.capex_plan) + '</td><td>' + fmtCr(pb.total_plan) + '</td>' +
// // 			// Previous FY Actual
// // 			'<td class="grp-sep">' + fmtCr(pb.opex_act) + '</td><td>' + fmtCr(pb.capex_act) + '</td><td>' + fmtCr(pb.total_act) + '</td>' +
// // 			'</tr>';
// // 	}

// // 	var ALL_ROWS = []; // cached rows for client-side search

// // 	function renderTable(curData, prevData, curFY, prevFY, curMonth) {
// // 		buildHeader(curFY, curMonth, prevFY);

// // 		var curMap = buildMap(curData);
// // 		var prevMap = buildMap(prevData);

// // 		var rows = curMap.order.map(function (lbl) {
// // 			return {
// // 				display: lbl,
// // 				isSub: curMap.subFlags[lbl],
// // 				isCovid: curMap.covidFlags[lbl],
// // 				cb: curMap.rows[lbl] || zero2(),
// // 				pb: prevMap.rows[lbl] || zero2()
// // 			};
// // 		});

// // 		// pick up any units present in previous FY but not current FY
// // 		prevMap.order.forEach(function (lbl) {
// // 			if (curMap.rows[lbl] === undefined) {
// // 				rows.push({
// // 					display: lbl, isSub: prevMap.subFlags[lbl], isCovid: prevMap.covidFlags[lbl],
// // 					cb: zero2(), pb: prevMap.rows[lbl]
// // 				});
// // 			}
// // 		});

// // 		rows.push({ display: 'Grand Total', isGrandTotal: true, cb: curMap.grand, pb: prevMap.grand });

// // 		ALL_ROWS = rows;
// // 		applySearch();
// // 	}

// // 	function applySearch() {
// // 		var term = $('#mis-search').val().trim().toLowerCase();
// // 		var $tb = $('#mis-table tbody').empty();
// // 		var filtered = ALL_ROWS.filter(function (r) {
// // 			return r.isGrandTotal || !term || r.display.toLowerCase().indexOf(term) !== -1;
// // 		});
// // 		if (!filtered.length) {
// // 			$tb.append('<tr><td colspan="13" style="text-align:center;padding:40px;color:#aaa;">No matching rows.</td></tr>');
// // 			return;
// // 		}
// // 		filtered.forEach(function (r) { $tb.append(rowHtml(r)); });
// // 	}

// // 	$(document).on('input', '#mis-search', function () { applySearch(); });

// // 	// =============================================================================
// // 	// LOAD
// // 	// =============================================================================

// // 	function loadData() {
// // 		var fy = fyControl.get_value(); if (!fy) { return; }
// // 		var month = monthControl.get_value() || 'March';
// // 		var prevFY = getPrevFY(fy);

// // 		$('#mis-title').text('Unit Wise Plan \u2013 Budget vs Actual (' + fy + ')');
// // 		Loader.show('Loading Monthly MIS\u2026');

// // 		Promise.all([
// // 			fetchUnitWisePlan(fy, month),
// // 			fetchUnitWisePlan(prevFY, month)
// // 		]).then(function (results) {
// // 			Loader.hide();
// // 			var curData = results[0], prevData = results[1];
// // 			if (!curData.length && !prevData.length) {
// // 				$('#mis-table thead').empty();
// // 				$('#mis-table tbody').html('<tr><td style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// // 				return;
// // 			}
// // 			renderTable(curData, prevData, fy, prevFY, month);
// // 		}).catch(function () {
// // 			Loader.hide();
// // 			$('#mis-table tbody').html('<tr><td style="text-align:center;padding:40px;color:red;">Error loading data.</td></tr>');
// // 		});
// // 	}

// // };


// // frappe.pages['monthly-mis'].on_page_load = function (wrapper) {

// // 	// =============================================================================
// // 	// PAGE SETUP
// // 	// =============================================================================

// // 	var page = frappe.ui.make_app_page({
// // 		parent: wrapper, title: 'Monthly MIS', single_column: true
// // 	});

// // 	// =============================================================================
// // 	// LOADER
// // 	// =============================================================================

// // 	if (!$('#mis-loader').length) {
// // 		$('body').append(
// // 			'<div id="mis-loader" class="mis-loader-overlay">' +
// // 			'<div class="mis-loader-box"><img src="/files/APF logo.png" class="mis-loader-logo" alt="">' +
// // 			'<div class="mis-loader-text">Loading, please wait</div></div></div>'
// // 		);
// // 	}
// // 	$('#mis-loader').hide();

// // 	var Loader = {
// // 		show: function (msg) {
// // 			var $l = $('#mis-loader');
// // 			$l.find('.mis-loader-text').text(msg || 'Loading, please wait');
// // 			$l.css('display', 'flex').hide().fadeIn(200);
// // 		},
// // 		hide: function () { $('#mis-loader').fadeOut(200); }
// // 	};

// // 	// =============================================================================
// // 	// STYLES
// // 	// =============================================================================

// // 	$(page.body).append(
// // 		'<style>' +
// // 		':root{' +
// // 		'--font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
// // 		'--fs-xs:12px;--fs-sm:13px;--fs-base:14px;--fs-md:15px;--fs-lg:16px;--fs-xl:17px;' +
// // 		'--fw-n:400;--fw-m:500;--fw-sb:600;--fw-b:700;' +
// // 		'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// // 		'--orange:#F26B21;' +
// // 		'--bdl:#c2ccd4;--bdh:#004a75;--bdo:#a84808;' +
// // 		'--txt:#1a1a1a;--txt2:#36414c;--muted:#666;' +
// // 		'}' +
// // 		'.mis-wrapper{padding:15px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.5;}' +
// // 		'.mis-wrapper *{box-sizing:border-box;}' +

// // 		/* Filter row */
// // 		'.mis-filter-row{padding:8px 0;margin-bottom:10px;display:flex;flex-wrap:wrap;align-items:flex-end;gap:8px;}' +
// // 		'.mis-filter-col{min-width:180px;flex:0 0 auto;}' +

// // 		/* Apply button */
// // 		'.mis-apply-btn{height:32px;padding:0 18px;background:var(--blue-mid);color:#fff;border:none;border-radius:4px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-sb);cursor:pointer;letter-spacing:.3px;transition:background .15s;}' +
// // 		'.mis-apply-btn:hover{background:var(--blue-dark);}' +
// // 		'.mis-apply-btn:active{background:#005a8a;}' +

// // 		/* Title + currency */
// // 		'.sinr-section-label{margin:14px 0 4px;font-family:var(--font);font-size:var(--fs-base);font-weight:var(--fw-b);color:var(--txt);text-decoration:underline;letter-spacing:.2px;}' +
// // 		'.mis-currency-note{text-align:right;font-family:var(--font);font-size:var(--fs-xs);font-style:italic;color:var(--muted);margin-bottom:4px;}' +
// // 		'.mis-currency-note strong{font-weight:var(--fw-b);font-style:normal;}' +

// // 		/* Scroll wrapper — clips the table and provides the scrollbars */
// // 		'.cb-scroll-wrapper{border:1.5px solid var(--bdl);border-radius:6px;overflow:auto;max-height:74vh;background:#fff;position:relative;}' +

// // 		/* Table base */
// // 		'.cb-table{border-collapse:collapse;border-spacing:0;width:100%;table-layout:auto;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);}' +
// // 		'.cb-table th,.cb-table td{border:1px solid var(--bdl);padding:7px 10px;white-space:nowrap;text-align:right;vertical-align:middle;}' +
// // 		'.cb-table th:first-child,.cb-table td:first-child{text-align:left;}' +

// // 		/* Main header row (blue) */
// // 		'.cb-table thead tr.cb-thead-main th{' +
// // 		'  background:var(--blue-mid);color:#fff;' +
// // 		'  font-size:var(--fs-md);font-weight:var(--fw-b);text-align:center;' +
// // 		'  position:sticky;top:0;z-index:25;' +
// // 		'  border:1px solid var(--bdh);padding:9px 10px;' +
// // 		'}' +

// // 		/* Sub-header row (orange) */
// // 		'.cb-table thead tr.cb-thead-sub th{' +
// // 		'  background:var(--orange);color:#fff;' +
// // 		'  font-size:var(--fs-sm);font-weight:var(--fw-sb);text-align:center;' +
// // 		'  position:sticky;top:39px;z-index:24;' +   /* offset = height of main header */
// // 		'  border:1px solid var(--bdo);min-width:90px;padding:7px 10px;' +
// // 		'}' +

// // 		/* Row types */
// // 		'.cb-table tr.sinr-total-row td{background:#e8f0fa;color:var(--blue-dark);font-weight:var(--fw-b);border-color:#9baab5;}' +
// // 		'.cb-table tr.cb-row-grand td{background:var(--blue-dark);color:#fff;font-weight:var(--fw-b);border-color:#002a47;}' +
// // 		'.cb-table .sinr-sub-row td:first-child{padding-left:26px;color:#555;}' +
// // 		'.cb-table .sinr-covid-row td{color:#444;}' +

// // 		/* % of budget cell colouring (optional, soft) */
// // 		'.cb-table td.pct-cell{color:var(--txt2);}' +
// // 		'.cb-table tr.cb-row-grand td.pct-cell{color:#fff;}' +
// // 		'.cb-table tr.sinr-total-row td.pct-cell{color:var(--blue-dark);}' +

// // 		/* ── Sticky first column ── */
// // 		'#mis-table thead tr.cb-thead-main th:first-child{' +
// // 		'  position:sticky;left:0;z-index:55;' +
// // 		'  background:var(--blue-mid);text-align:left;min-width:220px;' +
// // 		'}' +
// // 		'#mis-table thead tr.cb-thead-sub th:first-child{' +
// // 		'  position:sticky;left:0;z-index:54;' +
// // 		'  background:var(--orange);' +
// // 		'}' +
// // 		'#mis-table tbody td:first-child{' +
// // 		'  position:sticky;left:0;z-index:10;' +
// // 		'  background:#fff;text-align:left;min-width:220px;' +
// // 		'  box-shadow:2px 0 5px -2px rgba(0,0,0,.10);' +
// // 		'}' +
// // 		'#mis-table tbody tr.sinr-total-row td:first-child{background:#e8f0fa;}' +
// // 		'#mis-table tbody tr.cb-row-grand td:first-child{background:var(--blue-dark);}' +

// // 		/* Column-group separator */
// // 		'#mis-table .grp-sep{border-left:2px solid var(--blue-mid) !important;}' +
// // 		'#mis-table thead tr.cb-thead-sub th.grp-sep{border-left:2px solid var(--blue-dark) !important;}' +

// // 		/* Loader */
// // 		'#mis-loader.mis-loader-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(18,18,18,.92);backdrop-filter:blur(6px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
// // 		'.mis-loader-box{display:flex;flex-direction:column;align-items:center;gap:14px;}' +
// // 		'.mis-loader-logo{width:90px;height:90px;border-radius:50%;background:linear-gradient(145deg,#fff,#eaeaea);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.35);animation:misp 1.6s infinite ease-in-out;}' +
// // 		'.mis-loader-text{font-family:var(--font);font-size:var(--fs-sm);color:#fff;font-weight:var(--fw-sb);letter-spacing:.5px;opacity:.85;}' +
// // 		'@keyframes misp{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.08);opacity:1;}}' +
// // 		'</style>'
// // 	);

// // 	// =============================================================================
// // 	// HTML SKELETON
// // 	// =============================================================================

// // 	$(page.body).append(
// // 		'<div class="mis-wrapper">' +
// // 		'<div class="mis-filter-row" id="mis-filter-row">' +
// // 		  '<div class="mis-filter-col" id="mis-fy-wrap"></div>' +
// // 		  '<div class="mis-filter-col" id="mis-month-wrap"></div>' +
// // 		  '<div class="mis-filter-col" style="padding-bottom:2px;">' +
// // 		    '<button class="mis-apply-btn" id="mis-apply-btn">Apply</button>' +
// // 		  '</div>' +
// // 		'</div>' +
// // 		'<div class="sinr-section-label" id="mis-title">Unit Wise Plan \u2013 Budget vs Actual</div>' +
// // 		'<div class="mis-currency-note">&#8377; <strong>Cr.</strong></div>' +
// // 		'<div class="cb-scroll-wrapper">' +
// // 		  '<table id="mis-table" class="cb-table"><thead></thead><tbody>' +
// // 		  '<tr><td colspan="15" style="text-align:center;padding:40px;color:#aaa;">Loading\u2026</td></tr>' +
// // 		  '</tbody></table>' +
// // 		'</div>' +
// // 		'</div>'
// // 	);

// // 	// =============================================================================
// // 	// FY HELPERS
// // 	// =============================================================================

// // 	function getPrevFY(fy) {
// // 		var p = (fy || '2025-26').split('-');
// // 		return (parseInt(p[0] || '2025', 10) - 1) + '-' + String(parseInt(p[1] || '26', 10) - 1).padStart(2, '0');
// // 	}

// // 	var MONTHS = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];

// // 	// =============================================================================
// // 	// FINANCIAL YEAR + MONTH FILTERS
// // 	// =============================================================================

// // 	var fyControl = frappe.ui.form.make_control({
// // 		parent: $('#mis-fy-wrap'),
// // 		df: { label: 'Financial Year', fieldtype: 'Select', fieldname: 'financial_year', reqd: 1 },
// // 		render_input: true
// // 	});
// // 	fyControl.refresh();

// // 	var monthControl = frappe.ui.form.make_control({
// // 		parent: $('#mis-month-wrap'),
// // 		df: { label: 'Month (YTD up to)', fieldtype: 'Select', fieldname: 'month', reqd: 1, options: MONTHS.join('\n') },
// // 		render_input: true
// // 	});
// // 	monthControl.refresh();

// // 	// Apply button click
// // 	$('#mis-apply-btn').on('click', function () {
// // 		var fy = fyControl.get_value();
// // 		var month = monthControl.get_value();
// // 		if (!fy || !month) { frappe.msgprint('Please select both Financial Year and Month.'); return; }
// // 		loadData();
// // 	});

// // 	frappe.call({
// // 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// // 		callback: function (r) {
// // 			if (!r.message || !r.message.length) { return; }
// // 			var years = r.message.map(function (d) { return d.financial_year; });
// // 			fyControl.df.options = years.join('\n'); fyControl.refresh();

// // 			var today = new Date(), y = today.getFullYear(), m = today.getMonth() + 1;
// // 			var curFY = (m >= 4 ? y : y - 1) + '-' + String(m >= 4 ? y + 1 : y).slice(-2);
// // 			var target = years.indexOf(curFY) !== -1 ? curFY : years[0];
// // 			fyControl.set_value(target);

// // 			var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'][m - 1];
// // 			monthControl.set_value(MONTHS.indexOf(monthName) !== -1 ? monthName : 'March');

// // 			loadData();
// // 		}
// // 	});

// // 	// =============================================================================
// // 	// DATA FETCH
// // 	// =============================================================================

// // 	function fetchUnitWisePlan(fy, month) {
// // 		return new Promise(function (resolve) {
// // 			frappe.call({
// // 				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// // 				args: { financial_year: fy, month: month, table_name_filter: 'Unit Wise Plan' },
// // 				callback: function (r) {
// // 					var d = Array.isArray(r.message) ? r.message
// // 						: ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
// // 					resolve(d || []);
// // 				},
// // 				error: function () { resolve([]); }
// // 			});
// // 		});
// // 	}

// // 	// =============================================================================
// // 	// EXTRACTION HELPERS
// // 	// =============================================================================

// // 	function normN(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }
// // 	function zero2() { return { opex_plan: 0, opex_act: 0, capex_plan: 0, capex_act: 0, total_plan: 0, total_act: 0 }; }
// // 	function addV2(a, b) {
// // 		return {
// // 			opex_plan:   a.opex_plan   + b.opex_plan,
// // 			opex_act:    a.opex_act    + b.opex_act,
// // 			capex_plan:  a.capex_plan  + b.capex_plan,
// // 			capex_act:   a.capex_act   + b.capex_act,
// // 			total_plan:  a.total_plan  + b.total_plan,
// // 			total_act:   a.total_act   + b.total_act
// // 		};
// // 	}

// // 	function extractA(actuals) {
// // 		var r = zero2();
// // 		(actuals || []).forEach(function (sec) {
// // 			var nm = normN(sec.name);
// // 			if (nm === 'OPERATING EXPENSES' || nm === 'OPERATING  EXPENSES') {
// // 				r.opex_plan += parseFloat(sec.ytd || 0);
// // 				r.opex_act  += parseFloat(sec.total_posted_amt_ytd || 0);
// // 			}
// // 			if (nm === 'CAPITAL EXPENSES' || nm === 'CAPITAL  EXPENSES') {
// // 				r.capex_plan += parseFloat(sec.ytd || 0);
// // 				r.capex_act  += parseFloat(sec.total_posted_amt_ytd || 0);
// // 			}
// // 		});
// // 		r.total_plan = r.opex_plan + r.capex_plan;
// // 		r.total_act  = r.opex_act  + r.capex_act;
// // 		return r;
// // 	}

// // 	function getConsolidatedTotalsFromEntry(ct) {
// // 		var r = zero2();
// // 		(ct.actuals || []).forEach(function (a) {
// // 			var nm = normN(a.name);
// // 			if (nm === 'OPEX TOTAL')         { r.opex_plan  += parseFloat(a.ytd || 0); r.opex_act  += parseFloat(a.total_posted_amt_ytd || 0); }
// // 			if (nm === 'CAPEX TOTAL')        { r.capex_plan += parseFloat(a.ytd || 0); r.capex_act += parseFloat(a.total_posted_amt_ytd || 0); }
// // 			if (nm === 'OVERALL GRAND TOTAL'){ r.total_plan  = parseFloat(a.ytd || 0); r.total_act  = parseFloat(a.total_posted_amt_ytd || 0); }
// // 		});
// // 		if (!r.total_plan && !r.total_act) { r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act; }
// // 		return r;
// // 	}

// // 	function buildMap(data) {
// // 		var sorted = (data || []).slice().sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// // 		var rows = {}, subFlags = {}, covidFlags = {}, normalOrder = [], covidOrder = [], grand = null;
// // 		sorted.forEach(function (e) {
// // 			var tbl = (e.table_name || '').toUpperCase();
// // 			if (e.sequence_id === 9999 || tbl === 'CONSOLIDATED') {
// // 				grand = getConsolidatedTotalsFromEntry(e); return;
// // 			}
// // 			var lbl = (e.label || '').trim();
// // 			rows[lbl]       = extractA(e.actuals);
// // 			subFlags[lbl]   = e.is_this_sub_item === 1;
// // 			covidFlags[lbl] = lbl.toLowerCase().indexOf('covid') !== -1;
// // 			(covidFlags[lbl] ? covidOrder : normalOrder).push(lbl);
// // 		});
// // 		var order = normalOrder.concat(covidOrder);
// // 		if (!grand) {
// // 			grand = zero2();
// // 			order.forEach(function (lbl) { if (!subFlags[lbl]) { grand = addV2(grand, rows[lbl]); } });
// // 		}
// // 		return { order: order, rows: rows, subFlags: subFlags, covidFlags: covidFlags, grand: grand };
// // 	}

// // 	// =============================================================================
// // 	// FORMATTERS
// // 	// =============================================================================

// // 	function fmtCr(v) {
// // 		var n = parseFloat(v) || 0;
// // 		if (!isFinite(n) || n === 0) { return '-'; }
// // 		var res = n / 10000000;
// // 		var neg = res < 0;
// // 		var s = Math.abs(res).toFixed(2).split('.');
// // 		var ip = s[0], dp = s[1];
// // 		if (ip.length > 3) { ip = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + ip.slice(-3); }
// // 		return (neg ? '-' : '') + ip + '.' + dp;
// // 	}

// // 	function fmtPct(act, plan) {
// // 		var a = parseFloat(act) || 0, p = parseFloat(plan) || 0;
// // 		if (!p) { return '-'; }
// // 		return (a / p * 100).toFixed(1) + '%';
// // 	}

// // 	// =============================================================================
// // 	// RENDER
// // 	// =============================================================================

// // 	/*
// // 	 * Header layout (matches the image):
// // 	 *
// // 	 *  | Unit / Function | ←──── Current Year YTD (7 cols) ────→ | ←──── Last Year YTD (7 cols) ────→ |
// // 	 *  |                 | Opex | Capex | Total | % of Budget     | Opex | Capex | Total | % of Budget  |
// // 	 *
// // 	 * Total columns = 1 + 4 + 4 = 9
// // 	 * (We show % of Budget only on Total column for cleanliness, matching the image)
// // 	 */

// // 	function buildHeader(curFY, curMonth, prevFY) {
// // 		var $t = $('#mis-table thead').empty();

// // 		var r1 = '<tr class="cb-thead-main">' +
// // 			'<th rowspan="2" style="text-align:left;min-width:220px;top:0;z-index:55;">Unit / Function</th>' +
// // 			'<th colspan="4">' + curFY + ' (YTD upto ' + curMonth + ')</th>' +
// // 			'<th colspan="4" class="grp-sep">' + prevFY + ' (YTD upto ' + curMonth + ')</th>' +
// // 			'</tr>';

// // 		var subCur  = '<th>Opex</th><th>Capex</th><th>Total</th><th>% of Budget</th>';
// // 		var subPrev = '<th class="grp-sep">Opex</th><th>Capex</th><th>Total</th><th>% of Budget</th>';

// // 		var r2 = '<tr class="cb-thead-sub">' + subCur + subPrev + '</tr>';

// // 		$t.append(r1 + r2);
// // 	}

// // 	function rowHtml(r) {
// // 		var cls = r.isGrandTotal ? 'cb-row-grand'
// // 			: (r.isTotal   ? 'sinr-total-row'
// // 			: (r.isCovid   ? 'sinr-covid-row'
// // 			: (r.isSub     ? 'sinr-sub-row' : '')));

// // 		var lblStyle = r.isSub ? 'padding-left:26px;color:#555;' : '';
// // 		var cb = r.cb, pb = r.pb;

// // 		return '<tr class="' + cls + '">' +
// // 			'<td style="' + lblStyle + '">' + r.display + '</td>' +
// // 			// Current YTD
// // 			'<td>' + fmtCr(cb.opex_plan)  + '</td>' +
// // 			'<td>' + fmtCr(cb.capex_plan) + '</td>' +
// // 			'<td>' + fmtCr(cb.total_plan) + '</td>' +
// // 			'<td class="pct-cell">' + fmtPct(cb.total_act, cb.total_plan) + '</td>' +
// // 			// Previous YTD
// // 			'<td class="grp-sep">' + fmtCr(pb.opex_plan)  + '</td>' +
// // 			'<td>' + fmtCr(pb.capex_plan) + '</td>' +
// // 			'<td>' + fmtCr(pb.total_plan) + '</td>' +
// // 			'<td class="pct-cell">' + fmtPct(pb.total_act, pb.total_plan) + '</td>' +
// // 			'</tr>';
// // 	}

// // 	function renderTable(curData, prevData, curFY, prevFY, curMonth) {
// // 		buildHeader(curFY, curMonth, prevFY);

// // 		var curMap  = buildMap(curData);
// // 		var prevMap = buildMap(prevData);

// // 		var rows = curMap.order.map(function (lbl) {
// // 			return {
// // 				display: lbl,
// // 				isSub:   curMap.subFlags[lbl],
// // 				isCovid: curMap.covidFlags[lbl],
// // 				cb:      curMap.rows[lbl]  || zero2(),
// // 				pb:      prevMap.rows[lbl] || zero2()
// // 			};
// // 		});

// // 		prevMap.order.forEach(function (lbl) {
// // 			if (curMap.rows[lbl] === undefined) {
// // 				rows.push({
// // 					display: lbl, isSub: prevMap.subFlags[lbl], isCovid: prevMap.covidFlags[lbl],
// // 					cb: zero2(), pb: prevMap.rows[lbl]
// // 				});
// // 			}
// // 		});

// // 		rows.push({ display: 'Grand Total', isGrandTotal: true, cb: curMap.grand, pb: prevMap.grand });

// // 		var $tb = $('#mis-table tbody').empty();
// // 		rows.forEach(function (r) { $tb.append(rowHtml(r)); });
// // 	}

// // 	// =============================================================================
// // 	// LOAD
// // 	// =============================================================================

// // 	function loadData() {
// // 		var fy    = fyControl.get_value();    if (!fy) { return; }
// // 		var month = monthControl.get_value() || 'March';
// // 		var prevFY = getPrevFY(fy);

// // 		$('#mis-title').text('Unit Wise Plan \u2013 Budget vs Actual (' + fy + ')');
// // 		Loader.show('Loading Unit Wise Plan\u2026');

// // 		Promise.all([
// // 			fetchUnitWisePlan(fy, month),
// // 			fetchUnitWisePlan(prevFY, month)
// // 		]).then(function (results) {
// // 			Loader.hide();
// // 			var curData = results[0], prevData = results[1];
// // 			if (!curData.length && !prevData.length) {
// // 				$('#mis-table thead').empty();
// // 				$('#mis-table tbody').html('<tr><td style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// // 				return;
// // 			}
// // 			renderTable(curData, prevData, fy, prevFY, month);
// // 		}).catch(function () {
// // 			Loader.hide();
// // 			$('#mis-table tbody').html('<tr><td style="text-align:center;padding:40px;color:red;">Error loading data.</td></tr>');
// // 		});
// // 	}

// // };

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

// 	// Frappe primary action button (toolbar)
// 	page.set_primary_action("Apply", function () {
// 		var fy    = fyControl.get_value();
// 		var month = monthControl.get_value();
// 		if (!fy || !month) { frappe.msgprint("Please select Financial Year and Month."); return; }
// 		loadData();
// 	}, "fa fa-check");

// 	frappe.call({
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (!r.message || !r.message.length) { return; }
// 			var years = r.message.map(function (d) { return d.financial_year; });
// 			fyControl.df.options = years.join('\n'); fyControl.refresh();

// 			var today = new Date(), y = today.getFullYear(), m = today.getMonth() + 1;
// 			var curFY = (m >= 4 ? y : y - 1) + '-' + String(m >= 4 ? y + 1 : y).slice(-2);
// 			var target = years.indexOf(curFY) !== -1 ? curFY : years[0];
// 			var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'][m - 1];
// 			var defaultMonth = MONTHS.indexOf(monthName) !== -1 ? monthName : 'March';

// 			// set_value returns a Promise in Frappe — wait for both before loading
// 			Promise.all([
// 				fyControl.set_value(target),
// 				monthControl.set_value(defaultMonth)
// 			]).then(function () {
// 				loadData();
// 			});
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
// 			'<th colspan="4">'+"Current Year" + curFY + ' (YTD upto ' + curMonth + ')</th>' +
// 			'<th colspan="4" class="grp-sep">'+"Last Year" + prevFY + ' (YTD upto ' + curMonth + ')</th>' +
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

	var page = frappe.ui.make_app_page({
		parent: wrapper, title: 'Monthly MIS', single_column: true
	});

	// =============================================================================
	// LOADER
	// =============================================================================
	if (!$('#mis-loader').length) {
		$('body').append(
			'<div id="mis-loader" class="mis-loader-overlay">' +
			'<div class="mis-loader-box">' +
			'<img src="/files/APF logo.png" class="mis-loader-logo" alt="">' +
			'<div class="mis-loader-text">Loading, please wait</div>' +
			'</div></div>'
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
	// EXPORT BUTTON — Frappe page toolbar (top-right corner, native Frappe style)
	// =============================================================================
	page.set_primary_action('Export Excel', function () {
		var fy    = fyCtrl.get_value();
		var month = moCtrl.get_value();
		if (!fy || !month) { frappe.msgprint('Please select Financial Year and Month first.'); return; }
		var prevFY = getPrevFY(fy);
		var url = frappe.urllib.get_full_url(
			'/api/method/annual_budget.api.monthly_mis.export_monthly_mis'
			+ '?financial_year='      + encodeURIComponent(fy)
			+ '&month='               + encodeURIComponent(month)
			+ '&prev_financial_year=' + encodeURIComponent(prevFY)
		);
		window.open(url, '_blank');
	}, 'octicon octicon-cloud-download');

	$(page.body).append('<style>' +

		/* ── Design tokens ── */
		'#mis-wrap{' +
		'  --font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
		'  --fs-xs:11px;--fs-sm:12px;--fs-base:13px;--fs-md:13px;' +
		'  --fw-n:400;--fw-sb:600;--fw-b:700;' +
		'  --r1:#1565C0;' +       /* Year header blue          */
		'  --r2:#F26B21;' +       /* Group header orange       */
		'  --r3:#455A64;' +       /* Sub-col header steel      */
		'  --tot-bg:#DBEAFE;' +   /* Total row fill            */
		'  --tot-fg:#1E3A5F;' +   /* Total row text            */
		'  --act-bg:#FFF3EE;' +   /* Actual column wash        */
		'  --cov-bg:#FFFDE7;' +   /* Covid column tint         */
		/* One border colour, one weight — used everywhere */
		'  --bdc:#64748B;' +      /* border colour             */
		'  --bdw:1px;' +          /* border width              */
		'}' +

		/* wrapper */
		'#mis-wrap{padding:16px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:#1a1a1a;line-height:1.5;}' +
		'#mis-wrap *{box-sizing:border-box;}' +

		/* filters */
		'.mis-filters{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;margin-bottom:12px;}' +
		'.mis-fc{min-width:160px;flex:1 1 160px;max-width:260px;}' +

		/* title */
		'.mis-title{margin:0 0 2px;font-size:15px;font-weight:var(--fw-b);color:#1a1a1a;text-decoration:underline;}' +
		'.mis-note,.con-note{margin:0 0 6px;text-align:right;font-size:11px;font-style:italic;color:#777;}' +
		'.mis-note strong,.con-note strong{font-style:normal;font-weight:var(--fw-b);}' +

		/* ── Scroll wrappers — horizontal scroll, no height clamp ── */
		'.mis-scroll,.con-scroll{' +
		'  overflow-x:auto;overflow-y:visible;' +
		'  border:var(--bdw) solid var(--bdc);' +
		'  border-radius:4px;background:#fff;' +
		'  -webkit-overflow-scrolling:touch;' +
		'}' +

		/* ══════════════════════════════════════════════
		   DETAIL TABLE
		   Use border-separate + cellspacing:0 approach
		   so every cell has its own clean border box
		   ══════════════════════════════════════════════ */
		'#mis-tbl{' +
		'  border-collapse:separate;' +
		'  border-spacing:0;' +
		'  width:100%;table-layout:auto;' +
		'}' +

		/* Base cell style — every single cell */
		'#mis-tbl th,#mis-tbl td{' +
		'  border-top:var(--bdw) solid var(--bdc);' +
		'  border-right:var(--bdw) solid var(--bdc);' +
		'  border-bottom:var(--bdw) solid var(--bdc);' +
		'  border-left:0;' +      /* left border drawn by right border of prev cell */
		'  padding:7px 10px;' +
		'  white-space:nowrap;text-align:right;vertical-align:middle;' +
		'  font-size:var(--fs-base);color:#1a1a1a;background:#fff;' +
		'}' +
		/* First cell in each row gets a left border */
		'#mis-tbl th:first-child,#mis-tbl td:first-child{border-left:var(--bdw) solid var(--bdc);}' +

		/* ── ROW 1 — Year (blue) ── */
		'#mis-tbl thead tr.r-yr th{' +
		'  background:var(--r1);color:#fff;' +
		'  font-size:14px;font-weight:var(--fw-b);text-align:center;' +
		'  position:sticky;top:0;z-index:27;' +
		'  border-color:rgba(255,255,255,.2);padding:9px 10px;' +
		'}' +
		'#mis-tbl thead tr.r-yr th:first-child{border-left-color:rgba(255,255,255,.2);}' +

		/* ── ROW 2 — Group (orange) ── */
		'#mis-tbl thead tr.r-grp th{' +
		'  background:var(--r2);color:#fff;' +
		'  font-size:12px;font-weight:var(--fw-b);text-align:center;' +
		'  position:sticky;top:38px;z-index:26;' +
		'  border-color:rgba(255,255,255,.2);padding:6px 10px;' +
		'}' +
		'#mis-tbl thead tr.r-grp th:first-child{border-left-color:rgba(255,255,255,.2);}' +

		/* ── ROW 3 — Sub-col (steel) ── */
		'#mis-tbl thead tr.r-sub th{' +
		'  background:var(--r3);color:#fff;' +
		'  font-size:11px;font-weight:var(--fw-sb);text-align:center;' +
		'  position:sticky;top:71px;z-index:25;' +
		'  border-color:rgba(255,255,255,.15);min-width:74px;padding:5px 10px;' +
		'}' +
		'#mis-tbl thead tr.r-sub th:first-child{border-left-color:rgba(255,255,255,.15);}' +
		'#mis-tbl thead tr.r-sub th.cv-hdr{color:#FFD54F;font-style:italic;}' +

		/* ── Grand Total (tfoot) — all cells same blue ── */
		'#mis-tbl tfoot tr.r-grand td{' +
		'  background:var(--r1)!important;color:#fff!important;' +
		'  font-weight:var(--fw-b);font-size:var(--fs-md);' +
		'  border-color:rgba(255,255,255,.2)!important;' +
		'}' +
		'#mis-tbl tfoot tr.r-grand td:first-child{border-left-color:rgba(255,255,255,.2)!important;}' +
		'#mis-tbl tfoot tr.r-grand td.ac,' +
		'#mis-tbl tfoot tr.r-grand td.cv{background:var(--r1)!important;color:#fff!important;font-style:normal!important;}' +

		/* ── Section total rows — uniform #DBEAFE ── */
		'#mis-tbl tbody tr.r-total td{' +
		'  font-weight:var(--fw-b);' +
		'  background:var(--tot-bg)!important;color:var(--tot-fg);' +
		'  border-color:#93C5FD!important;' +
		'}' +

		/* ── Sub-item indent ── */
		'#mis-tbl tbody tr.r-sub-item td:first-child{padding-left:24px;color:#555;}' +

		/* ── Actual wash (only on plain body rows) ── */
		'#mis-tbl tbody tr:not(.r-total) td.ac{background:var(--act-bg)!important;}' +

		/* ── Covid tint (only on plain body rows) ── */
		'#mis-tbl tbody tr:not(.r-total) td.cv{background:var(--cov-bg)!important;color:#795548;font-style:italic;}' +

		/* ── Sticky label column ── */
		'#mis-tbl thead tr.r-yr th.col-lbl{' +
		'  position:sticky;left:0;z-index:57;' +
		'  text-align:left!important;min-width:205px;background:var(--r1);' +
		'}' +
		'#mis-tbl tbody td.col-lbl,#mis-tbl tfoot td.col-lbl{' +
		'  position:sticky;left:0;z-index:10;' +
		'  text-align:left!important;min-width:205px;background:#fff;' +
		'}' +
		'#mis-tbl tbody tr.r-total td.col-lbl{background:var(--tot-bg)!important;color:var(--tot-fg);}' +
		'#mis-tbl tfoot td.col-lbl{background:var(--r1)!important;}' +

		/* ── Year-block left separator (solid visible line) ── */
		'#mis-tbl .sep-yr{border-left:2px solid #1D4ED8!important;}' +
		'#mis-tbl thead tr.r-yr  th.sep-yr,' +
		'#mis-tbl thead tr.r-grp th.sep-yr,' +
		'#mis-tbl thead tr.r-sub th.sep-yr,' +
		'#mis-tbl tfoot tr.r-grand td.sep-yr{border-left:2px solid rgba(255,255,255,.5)!important;}' +

		/* ── Budget→Actual separator ── */
		'#mis-tbl .sep-in{border-left:1px solid #94A3B8!important;}' +
		'#mis-tbl thead tr.r-grp th.sep-in,' +
		'#mis-tbl thead tr.r-sub th.sep-in,' +
		'#mis-tbl tfoot tr.r-grand td.sep-in{border-left:1px solid rgba(255,255,255,.3)!important;}' +

		/* ══════════════════════════════════════════════
		   CONSOLIDATED TABLE — same rules, separate scope
		   ══════════════════════════════════════════════ */
		'.con-wrap{padding-top:28px;}' +
		'.con-title{font-size:15px;font-weight:var(--fw-b);color:#1a1a1a;text-decoration:underline;margin:0 0 4px;}' +

		'#con-tbl{border-collapse:separate;border-spacing:0;width:100%;table-layout:auto;}' +
		'#con-tbl th,#con-tbl td{' +
		'  border-top:var(--bdw) solid var(--bdc);' +
		'  border-right:var(--bdw) solid var(--bdc);' +
		'  border-bottom:var(--bdw) solid var(--bdc);' +
		'  border-left:0;' +
		'  padding:8px 12px;white-space:nowrap;text-align:right;vertical-align:middle;' +
		'  font-size:var(--fs-base);color:#1a1a1a;background:#fff;' +
		'}' +
		'#con-tbl th:first-child,#con-tbl td:first-child{border-left:var(--bdw) solid var(--bdc);}' +

		/* Con ROW 1 — year (blue) */
		'#con-tbl thead tr.cr-yr th{' +
		'  background:var(--r1);color:#fff;font-size:14px;font-weight:var(--fw-b);' +
		'  text-align:center;border-color:rgba(255,255,255,.2);padding:9px 12px;' +
		'}' +
		'#con-tbl thead tr.cr-yr th:first-child{border-left-color:rgba(255,255,255,.2);}' +

		/* Con ROW 2 — sub-cols (steel) */
		'#con-tbl thead tr.cr-sub th{' +
		'  background:var(--r3);color:#fff;font-size:12px;font-weight:var(--fw-sb);' +
		'  text-align:center;border-color:rgba(255,255,255,.15);padding:6px 12px;min-width:100px;' +
		'}' +
		'#con-tbl thead tr.cr-sub th:first-child{border-left-color:rgba(255,255,255,.15);}' +
		'#con-tbl thead tr.cr-sub th.pct-hdr{color:#90CAF9;}' +

		/* Con body */
		'#con-tbl tbody tr:hover td{background:#F8FAFC!important;}' +
		'#con-tbl tbody tr:hover td.col-lbl{background:#F8FAFC!important;}' +
		'#con-tbl tbody tr.cr-sub-item td:first-child{padding-left:28px;color:#555;}' +

		/* Con total row */
		'#con-tbl tbody tr.cr-total td{' +
		'  font-weight:var(--fw-b);background:var(--tot-bg)!important;' +
		'  color:var(--tot-fg);border-color:#93C5FD!important;' +
		'}' +

		/* Con sticky label */
		'#con-tbl thead tr.cr-yr th.col-lbl{position:sticky;left:0;z-index:17;text-align:left!important;min-width:220px;background:var(--r1);}' +
		'#con-tbl tbody td.col-lbl{position:sticky;left:0;z-index:5;text-align:left!important;min-width:220px;background:#fff;}' +
		'#con-tbl tbody tr.cr-total td.col-lbl{background:var(--tot-bg)!important;color:var(--tot-fg);}' +

		/* Con actual col */
		'#con-tbl tbody tr:not(.cr-total) td.con-act{background:var(--act-bg)!important;}' +
		/* Con pct col */
		'#con-tbl tbody tr:not(.cr-total) td.con-pct{color:#1565C0;font-weight:var(--fw-sb);}' +

		/* Con year separator */
		'#con-tbl .sep-yr{border-left:2px solid #1D4ED8!important;}' +
		'#con-tbl thead tr.cr-yr th.sep-yr,' +
		'#con-tbl thead tr.cr-sub th.sep-yr{border-left:2px solid rgba(255,255,255,.5)!important;}' +

		/* ── Tooltip ── */
		'#mis-tt{position:fixed;z-index:999998;pointer-events:none;' +
		'  background:#1E293B;color:#F8FAFC;font-family:var(--font);font-size:13px;' +
		'  padding:8px 12px;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.4);' +
		'  opacity:0;transition:opacity .12s ease;white-space:nowrap;line-height:1.6;}' +
		'#mis-tt .tt-amt{font-size:15px;font-weight:700;color:#fff;}' +
		'#mis-tt .tt-sub{font-size:11px;color:#93C5FD;margin-top:2px;}' +

		/* ── Loader ── */
		'#mis-loader.mis-loader-overlay{position:fixed;inset:0;background:rgba(15,23,42,.92);backdrop-filter:blur(8px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
		'.mis-loader-box{display:flex;flex-direction:column;align-items:center;gap:16px;}' +
		'.mis-loader-logo{width:84px;height:84px;border-radius:50%;background:linear-gradient(145deg,#fff,#e2e8f0);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.4);animation:mis-p 1.6s infinite ease-in-out;}' +
		'.mis-loader-text{font-size:14px;color:#fff;font-weight:600;letter-spacing:.5px;opacity:.9;}' +
		'@keyframes mis-p{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.07);opacity:1;}}' +

		'@media(max-width:900px){.mis-fc{max-width:100%;}}' +

		'</style>'
	);

	// =============================================================================
	// TOOLTIP
	// =============================================================================
	if (!$('#mis-tt').length) {
		$('body').append('<div id="mis-tt"><div class="tt-amt"></div><div class="tt-sub"></div></div>');
	}
	var $tt = $('#mis-tt');
	function ttShow(e,raw,ctx){
		var n=parseFloat(raw)||0; if(!n||!isFinite(n)){ttHide();return;}
		var neg=n<0,abs=Math.abs(n);
		$tt.find('.tt-amt').text((neg?'-':'')+'\u20B9 '+abs.toLocaleString('en-IN'));
		$tt.find('.tt-sub').text((neg?'-':'')+(abs/10000000).toFixed(2)+' Cr'+(ctx?' \u00B7 '+ctx:''));
		ttPos(e); $tt.css('opacity',1);
	}
	function ttPos(e){
		var x=e.clientX+14,y=e.clientY-8,w=$tt.outerWidth()||220,h=$tt.outerHeight()||60;
		if(x+w>window.innerWidth-8)x=e.clientX-w-14;
		if(y+h>window.innerHeight-8)y=e.clientY-h-8;
		$tt.css({left:x,top:y});
	}
	function ttHide(){ $tt.css('opacity',0); }
	$(document)
		.on('mouseenter','#mis-tbl td[data-raw],#con-tbl td[data-raw]',function(e){ttShow(e,$(this).data('raw'),$(this).data('ctx'));})
		.on('mousemove', '#mis-tbl td[data-raw],#con-tbl td[data-raw]',function(e){ttPos(e);})
		.on('mouseleave','#mis-tbl td[data-raw],#con-tbl td[data-raw]',function(){ttHide();});

	// =============================================================================
	// HTML SKELETON
	// =============================================================================
	$(page.body).append(
		'<div id="mis-wrap">' +

		/* Filters */
		'<div class="mis-filters">' +
		'  <div class="mis-fc" id="mis-fy-wrap"></div>' +
		'  <div class="mis-fc" id="mis-mo-wrap"></div>' +
		'</div>' +

		/* Title */
		'<p class="mis-title" id="mis-title">Foundation Budget vs. Actuals</p>' +
		'<p class="mis-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +

		/* Detail table */
		'<div class="mis-scroll">' +
		'  <table id="mis-tbl"><thead></thead>' +
		'  <tbody><tr><td colspan="17" style="text-align:center;padding:40px;color:#aaa;">Select filters to load data\u2026</td></tr></tbody>' +
		'  <tfoot></tfoot>' +
		'  </table>' +
		'</div>' +

		/* Consolidated summary table */
		'<div class="con-wrap">' +
		'  <p class="con-title">Consolidated Summary</p>' +
		'  <p class="con-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
		'  <div class="con-scroll">' +
		'    <table id="con-tbl"><thead></thead>' +
		'    <tbody><tr><td colspan="7" style="text-align:center;padding:30px;color:#aaa;">Loading\u2026</td></tr></tbody>' +
		'    </table>' +
		'  </div>' +
		'</div>' +

		'</div>'
	);

	// =============================================================================
	// HELPERS
	// =============================================================================
	function getPrevFY(fy){
		var p=(fy||'2025-26').split('-');
		return (parseInt(p[0],10)-1)+'-'+String(parseInt(p[1],10)-1).padStart(2,'0');
	}
	var MONTHS=['April','May','June','July','August','September','October','November','December','January','February','March'];

	function monthYearLabel(month,fy){
		var fyStart=parseInt((fy||'2025-26').split('-')[0],10);
		var calYear=['January','February','March'].indexOf(month)!==-1?fyStart+1:fyStart;
		return month+'-'+calYear;
	}

	// =============================================================================
	// FILTER CONTROLS
	// =============================================================================
	var _ready=false, _curFY='', _prevFY='', _curMonth='';

	var fyCtrl=frappe.ui.form.make_control({
		parent:$('#mis-fy-wrap'),
		df:{label:'Financial Year',fieldtype:'Select',fieldname:'financial_year',reqd:1,
			change:function(){if(_ready)loadData();}},
		render_input:true
	});
	fyCtrl.refresh();

	var moCtrl=frappe.ui.form.make_control({
		parent:$('#mis-mo-wrap'),
		df:{label:'Month (YTD up to)',fieldtype:'Select',fieldname:'month',reqd:1,
			options:MONTHS.join('\n'),
			change:function(){if(_ready)loadData();}},
		render_input:true
	});
	moCtrl.refresh();

	frappe.call({
		method:'annual_budget.api.filter_options.get_financial_year_list',
		callback:function(r){
			if(!r.message||!r.message.length)return;
			var years=r.message.map(function(d){return d.financial_year;});
			fyCtrl.df.options=years.join('\n'); fyCtrl.refresh();
			var today=new Date(),y=today.getFullYear(),m=today.getMonth()+1;
			var curFY=(m>=4?y:y-1)+'-'+String(m>=4?y+1:y).slice(-2);
			var target=years.indexOf(curFY)!==-1?curFY:years[0];
			var mName=['January','February','March','April','May','June','July','August','September','October','November','December'][m-1];
			fyCtrl.set_value(target);
			moCtrl.set_value(MONTHS.indexOf(mName)!==-1?mName:'March');
			_ready=true; loadData();
		}
	});

	// =============================================================================
	// DATA FETCH
	// =============================================================================
	function fetchData(fy,month){
		return new Promise(function(resolve){
			frappe.call({
				method:'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
				args:{financial_year:fy,month:month,table_name_filter:'Unit Wise Plan'},
				callback:function(r){
					var d=Array.isArray(r.message)?r.message
						:(r.message&&Array.isArray(r.message.message))?r.message.message
						:(r.message&&Array.isArray(r.message.data))?r.message.data:[];
					resolve(d);
				},
				error:function(){resolve([]);}
			});
		});
	}

	// =============================================================================
	// EXTRACTION
	// =============================================================================
	function norm(s){return(s||'').replace(/\s+/g,' ').trim().toUpperCase();}
	function zero(){return{opex_b:0,capex_b:0,covid_b:0,total_b:0,opex_a:0,capex_a:0,covid_a:0,total_a:0};}
	function addZ(a,b){
		return{opex_b:a.opex_b+b.opex_b,capex_b:a.capex_b+b.capex_b,covid_b:a.covid_b+b.covid_b,total_b:a.total_b+b.total_b,
			opex_a:a.opex_a+b.opex_a,capex_a:a.capex_a+b.capex_a,covid_a:a.covid_a+b.covid_a,total_a:a.total_a+b.total_a};
	}
	function extractRow(entry){
		var r=zero();
		(entry.actuals||[]).forEach(function(sec){
			var nm=norm(sec.name),b=parseFloat(sec.ytd||0),a=parseFloat(sec.total_posted_amt_ytd||0);
			if(nm==='OPERATING EXPENSES'||nm==='OPERATING  EXPENSES'){r.opex_b+=b;r.opex_a+=a;}
			else if(nm==='CAPITAL EXPENSES'||nm==='CAPITAL  EXPENSES'){r.capex_b+=b;r.capex_a+=a;}
			else if(nm.indexOf('COVID')!==-1){r.covid_b+=b;r.covid_a+=a;}
		});
		r.total_b=r.opex_b+r.capex_b+r.covid_b; r.total_a=r.opex_a+r.capex_a+r.covid_a;
		return r;
	}
	function extractConsolidated(e){
		var r=zero();
		(e.actuals||[]).forEach(function(a){
			var nm=norm(a.name),b=parseFloat(a.ytd||0),ac=parseFloat(a.total_posted_amt_ytd||0);
			if(nm==='OPEX TOTAL'){r.opex_b+=b;r.opex_a+=ac;}
			if(nm==='CAPEX TOTAL'){r.capex_b+=b;r.capex_a+=ac;}
			if(nm.indexOf('COVID')!==-1){r.covid_b+=b;r.covid_a+=ac;}
			if(nm==='OVERALL GRAND TOTAL'){r.total_b=b;r.total_a=ac;}
		});
		if(!r.total_b&&!r.total_a){r.total_b=r.opex_b+r.capex_b+r.covid_b;r.total_a=r.opex_a+r.capex_a+r.covid_a;}
		return r;
	}
	function buildMap(data){
		var sorted=(data||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
		var rows={},subFlags={},order=[],grand=null;
		sorted.forEach(function(e){
			var tbl=(e.table_name||'').toUpperCase();
			if(e.sequence_id===9999||tbl==='CONSOLIDATED'){grand=extractConsolidated(e);return;}
			var lbl=(e.label||'').trim(); if(!lbl)return;
			rows[lbl]=extractRow(e); subFlags[lbl]=e.is_this_sub_item===1; order.push(lbl);
		});
		if(!grand){grand=zero();order.forEach(function(l){if(!subFlags[l])grand=addZ(grand,rows[l]);});}
		return{order:order,rows:rows,subFlags:subFlags,grand:grand};
	}

	// =============================================================================
	// FORMATTERS
	// =============================================================================
	function fmtCr(v){
		var n=parseFloat(v)||0; if(!isFinite(n)||n===0)return'-';
		var res=n/10000000,neg=res<0,s=Math.abs(res).toFixed(2).split('.');
		var ip=s[0]; if(ip.length>3)ip=ip.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+ip.slice(-3);
		return(neg?'-':'')+ip+'.'+s[1];
	}
	function fmtPct(act,bud){
		var a=parseFloat(act)||0,b=parseFloat(bud)||0;
		if(!b)return'-';
		return(a/b*100).toFixed(1)+'%';
	}
	function mkTd(val,cls,rowLbl,colKey){
		var n=parseFloat(val)||0,txt=fmtCr(n),c=cls?' class="'+cls+'"':'';
		if(n!==0&&isFinite(n)){
			var ctx=(rowLbl||'')+(colKey?' \u00B7 '+colKey:'');
			return '<td'+c+' data-raw="'+n+'" data-ctx="'+ctx.replace(/"/g,'&quot;')+'">'+txt+'</td>';
		}
		return '<td'+c+'>'+txt+'</td>';
	}
	function mkTdRaw(val,cls,rowLbl,colKey){
		/* for consolidated table where value is already in Cr */
		var n=parseFloat(val)||0;
		var txt=n===0?'-':(n<0?'-':'')+Math.abs(n).toFixed(2);
		var c=cls?' class="'+cls+'"':'';
		if(n!==0&&isFinite(n)){
			var ctx=(rowLbl||'')+(colKey?' \u00B7 '+colKey:'');
			/* store raw*10M so tooltip shows full rupee */
			return '<td'+c+' data-raw="'+(n*10000000)+'" data-ctx="'+ctx.replace(/"/g,'&quot;')+'">'+txt+'</td>';
		}
		return '<td'+c+'>'+txt+'</td>';
	}

	// =============================================================================
	// DETAIL TABLE RENDER
	// =============================================================================
	function buildHeader(curFY,prevFY){
		var r1=
			'<tr class="r-yr">'+
			'<th rowspan="3" class="col-lbl" style="text-align:left;">Unit / Function</th>'+
			'<th colspan="8">Current Year &nbsp;'+curFY+'</th>'+
			'<th colspan="8" class="sep-yr">Last Year &nbsp;'+prevFY+'</th>'+
			'</tr>';
		var r2=
			'<tr class="r-grp">'+
			'<th colspan="4">Budget</th>'+
			'<th colspan="4" class="sep-in">Actual</th>'+
			'<th colspan="4" class="sep-yr">Budget</th>'+
			'<th colspan="4" class="sep-in">Actual</th>'+
			'</tr>';
		function sub(fc){return '<th'+(fc?' class="'+fc+'"':'')+'>Opex</th><th>Capex</th><th class="cv-hdr">Covid</th><th>Total</th>';}
		var r3='<tr class="r-sub">'+sub('')+sub('sep-in')+sub('sep-yr')+sub('sep-in')+'</tr>';
		$('#mis-tbl thead').empty().append(r1+r2+r3);
	}

	function bodyRow(r){
		var cls=r.isTotal?'r-total':r.isSub?'r-sub-item':'';
		var lS=r.isSub?'padding-left:26px;':'',c=r.cur,p=r.prev,lbl=r.label;
		return '<tr class="'+cls+'">'+
			'<td class="col-lbl" style="'+lS+'">'+lbl+'</td>'+
			mkTd(c.opex_b,'',lbl,'Cur Bud Opex')+mkTd(c.capex_b,'',lbl,'Cur Bud Capex')+mkTd(c.covid_b,'cv',lbl,'Cur Bud Covid')+mkTd(c.total_b,'',lbl,'Cur Bud Total')+
			mkTd(c.opex_a,'ac sep-in',lbl,'Cur Act Opex')+mkTd(c.capex_a,'ac',lbl,'Cur Act Capex')+mkTd(c.covid_a,'cv',lbl,'Cur Act Covid')+mkTd(c.total_a,'ac',lbl,'Cur Act Total')+
			mkTd(p.opex_b,'sep-yr',lbl,'Prev Bud Opex')+mkTd(p.capex_b,'',lbl,'Prev Bud Capex')+mkTd(p.covid_b,'cv',lbl,'Prev Bud Covid')+mkTd(p.total_b,'',lbl,'Prev Bud Total')+
			mkTd(p.opex_a,'ac sep-in',lbl,'Prev Act Opex')+mkTd(p.capex_a,'ac',lbl,'Prev Act Capex')+mkTd(p.covid_a,'cv',lbl,'Prev Act Covid')+mkTd(p.total_a,'ac',lbl,'Prev Act Total')+
			'</tr>';
	}

	function footRow(gc,gp){
		var lbl='Grand Total';
		return '<tr class="r-grand">'+
			'<td class="col-lbl">Grand Total</td>'+
			mkTd(gc.opex_b,'',lbl,'Cur Bud Opex')+mkTd(gc.capex_b,'',lbl,'Cur Bud Capex')+mkTd(gc.covid_b,'cv',lbl,'Cur Bud Covid')+mkTd(gc.total_b,'',lbl,'Cur Bud Total')+
			mkTd(gc.opex_a,'ac sep-in',lbl,'Cur Act Opex')+mkTd(gc.capex_a,'ac',lbl,'Cur Act Capex')+mkTd(gc.covid_a,'cv',lbl,'Cur Act Covid')+mkTd(gc.total_a,'ac',lbl,'Cur Act Total')+
			mkTd(gp.opex_b,'sep-yr',lbl,'Prev Bud Opex')+mkTd(gp.capex_b,'',lbl,'Prev Bud Capex')+mkTd(gp.covid_b,'cv',lbl,'Prev Bud Covid')+mkTd(gp.total_b,'',lbl,'Prev Bud Total')+
			mkTd(gp.opex_a,'ac sep-in',lbl,'Prev Act Opex')+mkTd(gp.capex_a,'ac',lbl,'Prev Act Capex')+mkTd(gp.covid_a,'cv',lbl,'Prev Act Covid')+mkTd(gp.total_a,'ac',lbl,'Prev Act Total')+
			'</tr>';
	}

	function renderDetailTable(curData,prevData,curFY,prevFY){
		buildHeader(curFY,prevFY);
		var cm=buildMap(curData),pm=buildMap(prevData);
		var rows=cm.order.map(function(lbl){
			return{label:lbl,isSub:cm.subFlags[lbl],cur:cm.rows[lbl]||zero(),prev:pm.rows[lbl]||zero()};
		});
		pm.order.forEach(function(lbl){
			if(!cm.rows[lbl])rows.push({label:lbl,isSub:pm.subFlags[lbl],cur:zero(),prev:pm.rows[lbl]});
		});
		$('#mis-tbl tbody').empty().append(rows.map(bodyRow).join(''));
		$('#mis-tbl tfoot').html(footRow(cm.grand,pm.grand));
		return {cm:cm, pm:pm, rows:rows};
	}

	// =============================================================================
	// CONSOLIDATED TABLE RENDER
	// 2-row header: blue year label + steel Budget/Actuals/% sub-cols
	// The year context is already clear from Row 1 — no need for an orange repeat row
	// =============================================================================
	function renderConTable(cm,pm,curFY,prevFY){
		/* Row 1 — blue year labels, rowspan=2 for label column */
		var h1=
			'<tr class="cr-yr">'+
			'<th rowspan="2" class="col-lbl" style="text-align:left;">Areas of Work</th>'+
			'<th colspan="3">Current Year YTD &nbsp; '+curFY+'</th>'+
			'<th colspan="3" class="sep-yr">Last Year YTD &nbsp; '+prevFY+'</th>'+
			'</tr>';
		/* Row 2 — steel sub-col labels */
		var h2=
			'<tr class="cr-sub">'+
			'<th>Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>'+
			'<th class="sep-yr">Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>'+
			'</tr>';
		$('#con-tbl thead').empty().append(h1+h2);

		/* Build rows — use the same order as detail table */
		var allLabels=[];
		cm.order.forEach(function(l){allLabels.push(l);});
		pm.order.forEach(function(l){if(allLabels.indexOf(l)===-1)allLabels.push(l);});

		/* Convert raw paisa → Cr for consolidated table */
		function cr(v){return parseFloat(v)||0 ? (parseFloat(v)/10000000) : 0;}

		var html='', curTotal={b:0,a:0}, prevTotal={b:0,a:0};

		allLabels.forEach(function(lbl){
			var isSub=cm.subFlags[lbl]||pm.subFlags[lbl];
			var cv=cm.rows[lbl]||zero(), pv=pm.rows[lbl]||zero();
			var cb=cr(cv.total_b), ca=cr(cv.total_a);
			var pb=cr(pv.total_b), pa=cr(pv.total_a);

			if(!isSub){curTotal.b+=cb;curTotal.a+=ca;prevTotal.b+=pb;prevTotal.a+=pa;}

			var cls=isSub?'cr-sub-item':'';
			var lS=isSub?'padding-left:28px;':'';
			html+=
				'<tr class="'+cls+'">'+
				'<td class="col-lbl" style="'+lS+'">'+lbl+'</td>'+
				mkTdRaw(cb,'',lbl,'Cur Budget')+
				mkTdRaw(ca,'con-act',lbl,'Cur Actuals')+
				'<td class="con-pct">'+fmtPct(ca,cb)+'</td>'+
				mkTdRaw(pb,'sep-yr',lbl,'Prev Budget')+
				mkTdRaw(pa,'con-act',lbl,'Prev Actuals')+
				'<td class="con-pct">'+fmtPct(pa,pb)+'</td>'+
				'</tr>';
		});

		/* Total row */
		html+=
			'<tr class="cr-total">'+
			'<td class="col-lbl">Total</td>'+
			mkTdRaw(curTotal.b,'',  'Total','Cur Budget')+
			mkTdRaw(curTotal.a,'con-act','Total','Cur Actuals')+
			'<td class="con-pct">'+fmtPct(curTotal.a,curTotal.b)+'</td>'+
			mkTdRaw(prevTotal.b,'sep-yr','Total','Prev Budget')+
			mkTdRaw(prevTotal.a,'con-act','Total','Prev Actuals')+
			'<td class="con-pct">'+fmtPct(prevTotal.a,prevTotal.b)+'</td>'+
			'</tr>';

		$('#con-tbl tbody').empty().html(html);
	}

	// =============================================================================
	// LOAD
	// =============================================================================
	function loadData(){
		var fy=fyCtrl.get_value(),month=moCtrl.get_value();
		if(!fy||!month)return;
		_curFY=fy; _prevFY=getPrevFY(fy); _curMonth=month;
		var ytdLabel=monthYearLabel(month,fy);
		$('#mis-title').text('Foundation Budget vs. Actuals \u2013 FY '+fy+' & FY '+_prevFY+' | YTD '+ytdLabel);
		Loader.show('Loading Monthly MIS\u2026');
		Promise.all([fetchData(fy,month),fetchData(_prevFY,month)])
		.then(function(res){
			Loader.hide();
			if(!res[0].length&&!res[1].length){
				$('#mis-tbl thead').empty();$('#mis-tbl tfoot').empty();
				$('#mis-tbl tbody').html('<tr><td colspan="17" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
				$('#con-tbl tbody').html('<tr><td colspan="7" style="text-align:center;padding:30px;color:#aaa;">No data available.</td></tr>');
				return;
			}
			var maps=renderDetailTable(res[0],res[1],fy,_prevFY);
			renderConTable(maps.cm,maps.pm,fy,_prevFY);
		})
		.catch(function(err){
			Loader.hide();
			console.error('Monthly MIS error:',err);
			$('#mis-tbl tbody').html('<tr><td colspan="17" style="text-align:center;padding:40px;color:red;">Error loading data.</td></tr>');
		});
	}

};