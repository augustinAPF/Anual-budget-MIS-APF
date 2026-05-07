// frappe.pages['consolidated-budget'].on_page_load = function (wrapper) {

// 	// =============================================================================
// 	// PAGE SETUP
// 	// =============================================================================

// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper, title: 'Foundation - Consolidated Budget', single_column: true
// 	});

// 	setTimeout(function () {
// 		$(wrapper).find('#xl-export-all').remove();
// 		var $btn = $(
// 			'<button class="btn btn-default btn-sm" id="xl-export-all" style="display:inline-flex;align-items:center;gap:5px;margin-left:8px;background:#1a1a1a;color:#fff;border-color:#1a1a1a;">' +
// 			svgIcon() + 'Export All</button>'
// 		);
// 		var $pa = $(wrapper).find('.page-actions');
// 		if ($pa.length) { $pa.prepend($btn); }
// 	}, 300);

// 	function updatePageTitle(fy) {
// 		page.set_title('Foundation - Consolidated Budget - ' + fy);
// 		setTimeout(function () {
// 			$(wrapper).find('.page-head h3').hide();
// 			$(wrapper).find('.page-head .title-text').css({ 'font-size': '20px', 'font-weight': '700', 'color': '#1a1a1a' });
// 		}, 100);
// 	}

// 	// =============================================================================
// 	// FY HELPERS
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var p = (fy || '2025-26').split('-');
// 		var sYY = p[0] ? p[0].slice(-2) : '25';
// 		var eYY = p[1] ? p[1].slice(-2) : '26';
// 		var ps = String(parseInt(sYY, 10) - 1).padStart(2, '0');
// 		var pe = String(parseInt(eYY, 10) - 1).padStart(2, '0');
// 		return { plan: 'FY' + sYY + '-' + eYY + ' Plan', est: 'FY' + ps + '-' + pe + ' Estimate' };
// 	}

// 	function getPrevFY(fy) {
// 		var p = (fy || '2025-26').split('-');
// 		return (parseInt(p[0] || '2025', 10) - 1) + '-' + String(parseInt(p[1] || '26', 10) - 1).padStart(2, '0');
// 	}

// 	// =============================================================================
// 	// LOADER
// 	// =============================================================================

// 	if (!$('#global-loader').length) {
// 		$('body').append(
// 			'<div id="global-loader" class="loader-overlay">' +
// 			'<div class="loader-box"><img src="/files/APF logo.png" class="loader-logo" alt="">' +
// 			'<div class="loader-text">Loading, please wait</div></div></div>'
// 		);
// 	}
// 	$('#global-loader').hide();

// 	var Loader = {
// 		show: function (msg) {
// 			var $l = $('#global-loader');
// 			$l.find('.loader-text').text(msg || 'Loading, please wait');
// 			$l.css('display', 'flex').hide().fadeIn(200);
// 		},
// 		hide: function () { $('#global-loader').fadeOut(200); }
// 	};

// 	// =============================================================================
// 	// STORE
// 	// =============================================================================

// 	var Store = {
// 		ppt: { rows: [], prevRows: [], budgetLabel: '', estLabel: '', prevBudgetLabel: '', prevEstLabel: '' },
// 		summaryInr: [], headcount: [], annual: [], estimate: [], budgetEstimate: []
// 	};

// 	// =============================================================================
// 	// STYLES
// 	// =============================================================================

// 	$(page.body).append(
// 		'<style>' +
// 		':root{' +
// 		'--font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
// 		'--fs-xs:13px;--fs-sm:14px;--fs-base:15px;--fs-md:16px;--fs-lg:17px;--fs-xl:18px;' +
// 		'--fw-n:400;--fw-m:500;--fw-sb:600;--fw-b:700;' +
// 		'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 		'--orange:#F26B21;--orange-light:#FFF3E6;' +
// 		'--bdl:#9baab5;--bdh:#004a75;--bdo:#a84808;' +
// 		'--txt:#1a1a1a;--txt2:#36414c;--muted:#555;' +
// 		'}' +
// 		'.cb-wrapper{padding:15px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.5;}' +
// 		'.cb-wrapper *{box-sizing:border-box;}' +
// 		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:9px 18px;color:var(--muted);font-size:var(--fs-md);font-weight:var(--fw-m);background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s,border-color .15s;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:var(--blue-dark);font-weight:var(--fw-b);border-bottom:3px solid var(--blue-dark);}' +
// 		'#cb-tab-nav .cb-tab-link:hover{color:var(--blue-dark);}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +
// 		'.cb-filter-row{padding:8px 0;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +
// 		'.cb-controls{display:flex;align-items:center;padding:7px 12px;margin-bottom:12px;background:#f7f9fb;border:1px solid #e2e6ea;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
// 		'.cb-controls-left{display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap;}' +
// 		'.cb-controls-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}' +
// 		'.cb-search-wrap{position:relative;display:flex;align-items:center;}' +
// 		'.cb-search-wrap .search-icon{position:absolute;left:8px;color:#8d99a6;pointer-events:none;}' +
// 		'.cb-search-input{padding:5px 8px 5px 28px;border:1.5px solid var(--bdl);border-radius:4px;font-family:var(--font);font-size:var(--fs-sm);color:var(--txt2);background:#fff;width:220px;height:32px;transition:border-color .15s,box-shadow .15s;}' +
// 		'.cb-search-input:focus{outline:none;border-color:#5e64ff;box-shadow:0 0 0 2px rgba(94,100,255,.15);}' +
// 		'.cb-checkbox-area{display:flex;gap:12px;align-items:center;}' +
// 		'.cb-check-label{display:flex;align-items:center;gap:5px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-m);color:var(--txt2);cursor:pointer;user-select:none;white-space:nowrap;}' +
// 		'.cb-check-label input[type=checkbox]{width:14px;height:14px;cursor:pointer;accent-color:#5e64ff;}' +
// 		'.cb-xl-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;height:32px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-sb);cursor:pointer;white-space:nowrap;border:1px solid #1a1a1a;border-radius:4px;background:#1a1a1a;color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.15);transition:background .15s;}' +
// 		'.cb-xl-btn:hover{background:#333;}.cb-xl-btn svg{flex-shrink:0;color:#fff;}' +
// 		'#xl-export-all svg{vertical-align:middle;margin-right:3px;}' +
// 		'.cb-scroll-wrapper{border:1.5px solid var(--bdl);border-radius:6px;overflow:auto;max-height:72vh;background:#fff;}' +

// 		/* ══ NUCLEAR BORDER FIX — scoped under .cb-wrapper ══ */
// 		'.cb-wrapper table{border-collapse:collapse !important;border-spacing:0 !important;}' +
// 		'.cb-wrapper table th,.cb-wrapper table td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;text-align:right;font-family:var(--font);font-size:var(--fs-base);}' +
// 		'.cb-wrapper table th:first-child,.cb-wrapper table td:first-child{text-align:left !important;}' +
// 		'.cb-wrapper table thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-xl);font-weight:var(--fw-b);text-align:center !important;position:sticky;top:0;z-index:25;border:1.5px solid var(--bdh) !important;padding:10px 12px;letter-spacing:.1px;}' +
// 		'.cb-wrapper table thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-sb);text-align:center !important;position:sticky;top:0;z-index:24;border:1.5px solid var(--bdo) !important;min-width:110px;padding:8px 12px;}' +
// 		'.cb-wrapper table tr.cb-row-head td{background:var(--blue-light) !important;color:var(--blue-dark);font-weight:var(--fw-b);border:1.5px solid var(--bdl) !important;cursor:pointer;}' +
// 		'.cb-wrapper table tr.cb-row-head:hover td{background:#d0e8f5 !important;}' +
// 		'.cb-wrapper table tr.cb-row-sub td{background:var(--orange-light) !important;font-weight:var(--fw-sb);border:1.5px solid var(--bdl) !important;cursor:pointer;}' +
// 		'.cb-wrapper table tr.cb-row-sub:hover td{background:#ffe0c2 !important;}' +
// 		'.cb-wrapper table tr.cb-row-grand td{background:var(--blue-mid) !important;color:#fff !important;font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;}' +
// 		'.cb-wrapper table tr.ppt-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:var(--fw-b);border:1.5px solid #9baab5 !important;}' +
// 		'.cb-wrapper table tr.sinr-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:var(--fw-b) !important;border:1.5px solid #9baab5 !important;}' +
// 		'.cb-wrapper .ppt-table-wrap tbody tr td{background:#fff;color:var(--txt);font-weight:var(--fw-n);}' +

// 		/* ── Non-border cosmetic rules ── */
// 		'.cb-table,.ppt-table-wrap{width:100%;table-layout:auto;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.45;}' +
// 		'.cb-text-accent{color:var(--blue-mid);font-weight:var(--fw-sb);}' +
// 		'.ppt-title-bar{margin:14px 0 4px;}' +
// 		'.ppt-main-title{font-family:var(--font);font-size:var(--fs-md);font-weight:var(--fw-b);text-transform:uppercase;text-decoration:underline;letter-spacing:.4px;color:var(--txt);}' +
// 		'.ppt-currency-label{font-family:var(--font);font-size:var(--fs-sm);font-style:italic;color:var(--muted);text-align:right;margin-bottom:6px;}' +
// 		'.ppt-currency-label strong{font-weight:var(--fw-b);font-size:var(--fs-sm);font-style:normal;}' +
// 		'.ppt-dash{color:#bbb;text-align:center;display:block;}' +
// 		'.ppt-sub-item-row td:first-child{padding-left:28px !important;font-style:italic;color:#444;}' +

// 		/* ── Budget & Estimate sticky col ── */
// 		'#be-table tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:280px;max-width:280px;white-space:normal;word-break:break-word;background:#fff;}' +
// 		'#be-table .cb-row-head td:first-child{background:var(--blue-light) !important;}' +
// 		'#be-table .cb-row-sub td:first-child{background:var(--orange-light) !important;}' +
// 		'#be-table .cb-row-grand td:first-child{background:var(--blue-mid) !important;}' +
// 		'#be-table thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:280px;}' +
// 		'#be-table .be-grand-col{background:#ddeaf7 !important;color:var(--blue-dark);border-left:2px solid var(--blue-mid) !important;}' +
// 		'#be-table .cb-row-grand .be-grand-col{background:var(--blue-dark) !important;color:#fff !important;}' +
// 		'#be-table .cb-row-head .be-grand-col{background:var(--blue-dark) !important;color:#fff !important;}' +
// 		'#be-table .cb-row-sub .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +
// 		'#be-table .cb-thead-main th:not(:first-child){min-width:260px;text-align:center !important;}' +
// 		'#be-table .cb-thead-sub th{min-width:130px;text-align:center !important;}' +
// 		'#be-table tbody td:first-child,#be-table thead th:first-child{box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +

// 		/* ── Summary INR labels ── */
// 		'.sinr-section-label{margin:18px 0 5px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-b);color:var(--txt);text-decoration:underline;letter-spacing:.2px;}' +
// 		'.sinr-currency-note{text-align:right;font-family:var(--font);font-size:var(--fs-xs);font-style:italic;color:var(--muted);margin-bottom:4px;}' +
// 		'.sinr-sub-item td:first-child{padding-left:22px !important;color:#444;}.sinr-covid-row td{color:#444;}' +

// 		/* ── sinr-table-a sticky cols ── */
// 		'#sinr-table-a thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:var(--blue-mid) !important;}' +
// 		'#sinr-table-a thead tr.cb-thead-sub th:first-child{position:sticky;left:0;z-index:49 !important;background:var(--orange) !important;}' +
// 		'#sinr-table-a tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +
// 		'#sinr-table-a .sinr-total-row td:first-child{background:#e8f0fa !important;}' +
// 		'#sinr-table-a .sinr-covid-row td:first-child{background:#fff;}' +

// 		/* ── sinr-table-b sticky + layout ── */
// 		'#sinr-table-b thead tr:nth-child(1) th{position:sticky;top:0;z-index:25;text-align:center !important;padding:10px 12px;}' +
// 		'#sinr-table-b thead tr:nth-child(2) th{position:sticky;z-index:24;text-align:center !important;padding:8px 12px;min-width:110px;}' +
// 		'#sinr-table-b thead tr th:first-child{position:sticky !important;left:0;text-align:left !important;min-width:210px;box-shadow:2px 0 5px -2px rgba(0,0,0,.18);}' +
// 		'#sinr-table-b thead tr:nth-child(1) th:first-child{z-index:55 !important;}' +
// 		'#sinr-table-b thead tr:nth-child(2) th:first-child{z-index:54 !important;}' +
// 		'#sinr-table-b tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:210px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +
// 		'#sinr-table-b tbody tr.sinr-unit-hdr td{background:var(--blue-light) !important;color:var(--blue-dark);font-weight:var(--fw-b);}' +
// 		'#sinr-table-b tbody tr.sinr-brkdwn-plan td{background:#fff !important;}' +
// 		'#sinr-table-b tbody tr.sinr-brkdwn-act td{background:#fafafa !important;}' +
// 		'#sinr-table-b tbody tr.sinr-spacer td{background:#f4f6f8 !important;padding:2px 0;}' +
// 		'#sinr-table-b tbody tr.sinr-gt-plan td,#sinr-table-b tbody tr.sinr-gt-act td{background:#ddeaf7 !important;color:var(--blue-dark);font-weight:var(--fw-sb);}' +
// 		'#sinr-table-b tbody td{text-align:right;padding:8px 12px;white-space:nowrap;}' +

// 		'.hc-section-title{margin:20px 0 6px;font-family:var(--font);font-size:var(--fs-md);font-weight:var(--fw-b);color:var(--blue-dark);text-transform:uppercase;letter-spacing:.4px;border-left:4px solid var(--blue-mid);padding-left:10px;}' +
// 		'#global-loader.loader-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(18,18,18,.92);backdrop-filter:blur(6px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
// 		'.loader-box{display:flex;flex-direction:column;align-items:center;gap:14px;}' +
// 		'.loader-logo{width:90px;height:90px;border-radius:50%;background:linear-gradient(145deg,#fff,#eaeaea);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.35);animation:lp 1.6s infinite ease-in-out;}' +
// 		'.loader-text{font-family:var(--font);font-size:var(--fs-sm);color:#fff;font-weight:var(--fw-sb);letter-spacing:.5px;opacity:.85;}' +
// 		'.loader-text::after{content:"";display:inline-block;width:1em;animation:ld 1.5s infinite;}' +
// 		'@keyframes lp{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.08);opacity:1;}}' +
// 		'@keyframes ld{0%{content:"";}33%{content:".";}66%{content:"..";}100%{content:"...";}}' +
// 		'</style>'
// 	);

// 	// =============================================================================
// 	// SHARED HELPERS
// 	// =============================================================================

// 	function svgIcon() {
// 		return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 			'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 			'<polyline points="14 2 14 8 20 8"/>' +
// 			'<line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>' +
// 			'</svg>';
// 	}

// 	function fmtCr(v) {
// 		var n = parseFloat(v) || 0;
// 		if (!isFinite(n) || n === 0) { return '-'; }
// 		var res = n / 10000000;
// 		var neg = res < 0;
// 		var s   = Math.abs(res).toFixed(2).split('.');
// 		var ip  = s[0], dp = s[1];
// 		if (ip.length > 3) {
// 			ip = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + ip.slice(-3);
// 		}
// 		return (neg ? '-' : '') + ip + '.' + dp;
// 	}

// 	function fmtCrDash(v) {
// 		var n = parseFloat(v) || 0;
// 		return (!isFinite(n) || n === 0) ? '<span class="ppt-dash">-</span>' : fmtCr(n);
// 	}

// 	function formatINR(v) {
// 		var n = Math.round(parseFloat(v) || 0);
// 		var neg = n < 0, s = String(Math.abs(n));
// 		if (s.length > 3) { s = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + s.slice(-3); }
// 		return (neg ? '-' : '') + s;
// 	}

// 	function xlBtn(id, label) { return '<button class="cb-xl-btn" id="' + id + '">' + svgIcon() + label + '</button>'; }

// 	function controlsBar(searchId, placeholder, checks, exportId) {
// 		var chk = checks.map(function (c) { return '<label class="cb-check-label"><input type="checkbox" id="' + c.id + '"> ' + c.label + '</label>'; }).join('');
// 		return '<div class="cb-controls"><div class="cb-controls-left">' +
// 			'<div class="cb-search-wrap"><svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
// 			'<input type="text" id="' + searchId + '" class="cb-search-input" placeholder="' + placeholder + '"></div>' +
// 			'<div class="cb-checkbox-area">' + chk + '</div></div>' +
// 			'<div class="cb-controls-right">' + xlBtn(exportId, 'Export to Excel') + '</div></div>';
// 	}

// 	function fixStickySubHeader(sel) {
// 		var attempts = 0;
// 		function attempt() {
// 			var $t = $(sel);
// 			var $m = $t.find('thead tr.cb-thead-main');
// 			var $s = $t.find('thead tr.cb-thead-sub');
// 			if (!$m.length || !$s.length) { return; }
// 			var h = $m[0].getBoundingClientRect().height;
// 			if (!h) { h = $m.outerHeight(true) || 0; }
// 			if (h > 0) {
// 				$s.find('th').css('top', h + 'px');
// 			} else if (attempts++ < 10) {
// 				setTimeout(attempt, 50);
// 			}
// 		}
// 		setTimeout(attempt, 0);
// 	}

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================

// 	$(page.body).append(
// 		'<div class="cb-wrapper">' +
// 		'<div class="frappe-control-group row cb-filter-row" id="cb-filter-row"></div>' +
// 		'<ul id="cb-tab-nav">' +
// 		'<li><a class="cb-tab-link active" data-tab="ppt">Foundation level/Overall metrics</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="summary_inr">Summary in INR</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="headcount">Headcount</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="estimate">Estimate Consolidated</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="budget_estimate">Budget &amp; Estimate</a></li>' +
// 		'</ul><div id="cb-tab-content">' +

// 		'<div class="cb-tab-pane active" id="tab-ppt">' +
// 		'<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">' + xlBtn('xl-ppt', 'Export to Excel') + '</div>' +

// 		/* ── Current year table ── */
// 		'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-main-title">Overall Foundation - Budget vs. Actual</div></div>' +
// 		'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 		'<div class="cb-scroll-wrapper" style="margin-bottom:20px;"><table id="ppt-table" class="ppt-table-wrap"><thead>' +
// 		'<tr class="cb-thead-main"><th rowspan="2" style="min-width:180px;">Unit</th><th colspan="3" id="ppt-budget-hdr">Budget</th><th colspan="3" id="ppt-est-hdr">Estimate</th></tr>' +
// 		'<tr class="cb-thead-sub"><th>Opex</th><th>Capex</th><th>Total</th><th>Opex</th><th>Capex</th><th>Total</th></tr>' +
// 		'</thead><tbody id="ppt-tbody"></tbody></table></div>' +

// 		/* ── Previous year table ── */
// 		'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-prev-title">Overall Foundation - Previous Year Budget vs. Actual</div></div>' +
// 		'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 		'<div class="cb-scroll-wrapper" style="margin-bottom:20px;"><table id="ppt-prev-table" class="ppt-table-wrap"><thead>' +
// 		'<tr class="cb-thead-main"><th rowspan="2" style="min-width:180px;">Unit</th><th colspan="3" id="ppt-prev-budget-hdr">Budget</th><th colspan="3" id="ppt-prev-est-hdr">Estimate</th></tr>' +
// 		'<tr class="cb-thead-sub"><th>Opex</th><th>Capex</th><th>Total</th><th>Opex</th><th>Capex</th><th>Total</th></tr>' +
// 		'</thead><tbody id="ppt-prev-tbody"></tbody></table></div>' +

// 		/* ── Sub-item tables injected here ── */
// 		'<div id="ppt-sub-tables"></div>' +

// 		'</div>' + /* end tab-ppt */

// 		'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
// 		'<div class="cb-tab-pane" id="tab-headcount"></div>' +

// 		'<div class="cb-tab-pane" id="tab-annual_budget">' +
// 		controlsBar('annual-search', 'Search expense / item\u2026', [{ id: 'annual-expand-quarters', label: 'Expand Quarters' }, { id: 'annual-expand-items', label: 'Expand Line Items' }], 'xl-annual') +
// 		'<div class="cb-scroll-wrapper"><table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table></div></div>' +

// 		'<div class="cb-tab-pane" id="tab-estimate">' +
// 		controlsBar('estimate-search', 'Search expense / item\u2026', [{ id: 'estimate-expand-quarters', label: 'Expand Quarters' }, { id: 'estimate-expand-items', label: 'Expand Line Items' }], 'xl-estimate') +
// 		'<div class="cb-scroll-wrapper"><table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table></div></div>' +

// 		'<div class="cb-tab-pane" id="tab-budget_estimate">' +
// 		controlsBar('be-search', 'Search expense / item\u2026', [{ id: 'be-expand-items', label: 'Expand Line Items' }], 'xl-be') +
// 		'<div class="cb-scroll-wrapper"><table class="cb-table" id="be-table"><thead></thead><tbody id="be-tbody"></tbody></table></div></div>' +

// 		'</div></div>'
// 	);

// 	// =============================================================================
// 	// FINANCIAL YEAR FILTER
// 	// =============================================================================

// 	var fyControl = frappe.ui.form.make_control({
// 		parent: $('<div class="col-md-3 col-sm-12"></div>').appendTo('#cb-filter-row'),
// 		df: {
// 			label: 'Financial Year', fieldtype: 'Select', fieldname: 'financial_year', reqd: 1,
// 			change: function () {
// 				var y = this.get_value(); if (!y) { return; }
// 				updatePageTitle(y); TabLoader.resetAll();
// 				TabLoader.trigger($('#cb-tab-nav .cb-tab-link.active').data('tab'));
// 			}
// 		},
// 		render_input: true
// 	});
// 	fyControl.refresh();

// 	frappe.call({
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (!r.message || !r.message.length) { return; }
// 			var years = r.message.map(function (d) { return d.financial_year; });
// 			fyControl.df.options = years.join('\n'); fyControl.refresh();
// 			var today = new Date(), y = today.getFullYear(), m = today.getMonth() + 1;
// 			var cur = (m >= 4 ? y : y - 1) + '-' + String(m >= 4 ? y + 1 : y).slice(-2);
// 			var target = years.indexOf(cur) !== -1 ? cur : years[0];
// 			fyControl.set_value(target); updatePageTitle(target);
// 		}
// 	});

// 	// =============================================================================
// 	// TAB SWITCHING + LOADER
// 	// =============================================================================

// 	$(document).on('click', '#cb-tab-nav .cb-tab-link', function () {
// 		var tab = $(this).data('tab');
// 		$('#cb-tab-nav .cb-tab-link').removeClass('active'); $('.cb-tab-pane').removeClass('active');
// 		$(this).addClass('active'); $('#tab-' + tab).addClass('active');
// 		TabLoader.trigger(tab);
// 	});

// 	var TabLoader = (function () {
// 		var loaded = {};
// 		var map = {
// 			ppt: function (fy) { PPT.load(fy); },
// 			summary_inr: function (fy) { SummaryINR.load(fy); },
// 			headcount: function (fy) { Headcount.load(fy); },
// 			annual_budget: function (fy) { Annual.load(fy); },
// 			estimate: function (fy) { Estimate.load(fy); },
// 			budget_estimate: function (fy) { BudgetEstimate.load(fy); }
// 		};
// 		return {
// 			trigger: function (tab) {
// 				if (!map[tab]) { return; }
// 				var fy = fyControl.get_value() || '2025-26';
// 				if (loaded[tab] === fy) { return; }
// 				loaded[tab] = fy; map[tab](fy);
// 			},
// 			resetAll: function () { loaded = {}; }
// 		};
// 	})();

// 	// =============================================================================
// 	// EXCEL EXPORT
// 	// =============================================================================

// 	function serverExport(method, args, msg) {
// 		Loader.show(msg || 'Preparing your Excel file');
// 		frappe.call({
// 			method: method, args: args,
// 			callback: function (r) {
// 				Loader.hide();
// 				if (r.message && r.message.data) {
// 					var bin = atob(r.message.data), bytes = new Uint8Array(bin.length);
// 					for (var i = 0; i < bin.length; i++) { bytes[i] = bin.charCodeAt(i); }
// 					var url = URL.createObjectURL(new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
// 					var a = document.createElement('a'); a.href = url; a.download = r.message.filename;
// 					document.body.appendChild(a); a.click();
// 					setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
// 				} else { frappe.msgprint('Export failed \u2014 no data returned.'); }
// 			},
// 			error: function () { Loader.hide(); frappe.msgprint('Server error during export.'); }
// 		});
// 	}

// 	// =============================================================================
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {
// 		var currentFY = '';

// 		function normSec(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }

// 		function extractVals(sections, field) {
// 			var opex = 0, capex = 0, hasBreakdown = false;
// 			(sections || []).forEach(function (sec) {
// 				var nm = normSec(sec.name);
// 				if (sec.sequence_id === 9999 || nm === 'GRAND TOTAL') { return; }
// 				if (nm.indexOf('OPERATING') !== -1) { opex  += parseFloat(sec[field] || 0); hasBreakdown = true; }
// 				if (nm.indexOf('CAPITAL')   !== -1) { capex += parseFloat(sec[field] || 0); hasBreakdown = true; }
// 			});
// 			if (!hasBreakdown) {
// 				(sections || []).forEach(function (sec) {
// 					if (sec.sequence_id === 9999 || normSec(sec.name) === 'GRAND TOTAL') {
// 						opex += parseFloat(sec[field] || 0);
// 					}
// 				});
// 				if (!opex) {
// 					(sections || []).forEach(function (sec) {
// 						if (sec.sequence_id !== 9999 && normSec(sec.name) !== 'GRAND TOTAL') {
// 							opex += parseFloat(sec[field] || 0);
// 						}
// 					});
// 				}
// 			}
// 			return { opex: opex, capex: capex };
// 		}

// 		function extractTotal(sections, field) {
// 			var gt = 0;
// 			(sections || []).forEach(function (sec) {
// 				if (sec.sequence_id === 9999 || normSec(sec.name) === 'GRAND TOTAL') {
// 					gt += parseFloat(sec[field] || 0);
// 				}
// 			});
// 			if (!gt) {
// 				(sections || []).forEach(function (sec) { gt += parseFloat(sec[field] || 0); });
// 			}
// 			return gt;
// 		}

// 		function buildRows(data, cfg) {
// 			var rows = (data || []).slice()
// 				.sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); })
// 				.map(function (e) {
// 					var b = extractVals(e[cfg.key] || [], cfg.budgetField);
// 					var v = extractVals(e[cfg.key] || [], cfg.actualField);
// 					var bTot = extractTotal(e[cfg.key] || [], cfg.budgetField);
// 					var eTot = extractTotal(e[cfg.key] || [], cfg.actualField);
// 					return { label: e.label || '', bOpex: b.opex, bCapex: b.capex, bTotal: bTot, eOpex: v.opex, eCapex: v.capex, eTotal: eTot };
// 				});
// 			var tot = { bOpex: 0, bCapex: 0, bTotal: 0, eOpex: 0, eCapex: 0, eTotal: 0 };
// 			rows.forEach(function (r) { tot.bOpex += r.bOpex; tot.bCapex += r.bCapex; tot.bTotal += r.bTotal; tot.eOpex += r.eOpex; tot.eCapex += r.eCapex; tot.eTotal += r.eTotal; });
// 			rows.push({ label: 'Total', isTotal: true, bOpex: tot.bOpex, bCapex: tot.bCapex, bTotal: tot.bTotal, eOpex: tot.eOpex, eCapex: tot.eCapex, eTotal: tot.eTotal });
// 			return rows;
// 		}

// 		function renderTable(rows, tbId, bHdr, eHdr, tblId, bLbl, eLbl) {
// 			$('#' + bHdr).text(bLbl); $('#' + eHdr).text(eLbl);
// 			var $tb = $('#' + tbId).empty();
// 			rows.forEach(function (r) {
// 				$tb.append('<tr class="' + (r.isTotal ? 'ppt-total-row' : '') + '"><td>' + r.label + '</td>' +
// 					'<td>' + fmtCrDash(r.bOpex) + '</td><td>' + fmtCrDash(r.bCapex) + '</td><td>' + fmtCrDash(r.bTotal) + '</td>' +
// 					'<td>' + fmtCrDash(r.eOpex) + '</td><td>' + fmtCrDash(r.eCapex) + '</td><td>' + fmtCrDash(r.eTotal) + '</td></tr>');
// 			});
// 			fixStickySubHeader('#' + tblId);
// 		}

// 		function buildEducationTables(data, cfg, bLbl, eLbl) {
// 			var subItems = (data || []).filter(function (e) { return e.is_this_sub_item === 1; });
// 			if (!subItems.length) { return ''; }

// 			var groups = {}, groupOrder = [];
// 			subItems.forEach(function (e) {
// 				var grp = (e.table_name || 'Other').trim();
// 				if (!groups[grp]) { groups[grp] = []; groupOrder.push(grp); }
// 				groups[grp].push(e);
// 			});

// 			var parentLabelMap = {};
// 			(data || []).forEach(function (e) {
// 				if (e.is_this_sub_item === 0) {
// 					var tn = (e.table_name || '').trim();
// 					if (tn && !parentLabelMap[tn]) {
// 						parentLabelMap[tn] = (e.label || tn).trim();
// 					}
// 				}
// 			});

// 			var html = '';

// 			groupOrder.forEach(function (grp) {
// 				var entries = groups[grp].slice()
// 					.sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });

// 				var sectionTitle = "EDUCATION";
// 				var tblId = 'ppt-edu-' + grp.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '');

// 				var bodyHtml = '';
// 				var tot = { bOpex: 0, bCapex: 0, bTotal: 0, eOpex: 0, eCapex: 0, eTotal: 0 };

// 				entries.forEach(function (e) {
// 					var b    = extractVals(e[cfg.key] || [], cfg.budgetField);
// 					var v    = extractVals(e[cfg.key] || [], cfg.actualField);
// 					var bTot = extractTotal(e[cfg.key] || [], cfg.budgetField);
// 					var eTot = extractTotal(e[cfg.key] || [], cfg.actualField);
// 					tot.bOpex  += b.opex;  tot.bCapex += b.capex; tot.bTotal += bTot;
// 					tot.eOpex  += v.opex;  tot.eCapex += v.capex; tot.eTotal += eTot;

// 					bodyHtml += '<tr>' +
// 						'<td>' + (e.label || '') + '</td>' +
// 						'<td>' + fmtCrDash(b.opex)  + '</td>' +
// 						'<td>' + fmtCrDash(b.capex) + '</td>' +
// 						'<td>' + fmtCrDash(bTot)    + '</td>' +
// 						'<td>' + fmtCrDash(v.opex)  + '</td>' +
// 						'<td>' + fmtCrDash(v.capex) + '</td>' +
// 						'<td>' + fmtCrDash(eTot)    + '</td></tr>';
// 				});

// 				bodyHtml += '<tr class="ppt-total-row">' +
// 					'<td>Total</td>' +
// 					'<td>' + fmtCrDash(tot.bOpex)  + '</td>' +
// 					'<td>' + fmtCrDash(tot.bCapex) + '</td>' +
// 					'<td>' + fmtCrDash(tot.bTotal) + '</td>' +
// 					'<td>' + fmtCrDash(tot.eOpex)  + '</td>' +
// 					'<td>' + fmtCrDash(tot.eCapex) + '</td>' +
// 					'<td>' + fmtCrDash(tot.eTotal) + '</td></tr>';

// 				html +=
// 					'<div class="ppt-title-bar" style="margin-top:28px;">' +
// 						'<div class="ppt-main-title">' + sectionTitle + '</div>' +
// 					'</div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 						'<table id="' + tblId + '" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:200px;text-align:left !important;">Unit</th>' +
// 									'<th colspan="3" style="text-align:center !important;">' + bLbl + '</th>' +
// 									'<th colspan="3" style="text-align:center !important;">' + eLbl + '</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody>' + bodyHtml + '</tbody>' +
// 						'</table>' +
// 					'</div>';
// 			});

// 			return html;
// 		}

// 		function buildOpexBudgetTable(entries, fyLabel) {
// 			if (!entries || !entries.length) { return ''; }

// 			function isOpex(name) {
// 				return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('OPERATING') !== -1;
// 			}

// 			function getSubPlan(e, subName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isOpex(s.name)) { return; }
// 					(s.sub_heads || []).forEach(function (sub) {
// 						if ((sub.name || '').trim() === subName) {
// 							v += parseFloat(sub.ytd || 0);
// 						}
// 					});
// 				});
// 				return v;
// 			}

// 			function getOpexPlan(e) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (isOpex(s.name)) {
// 						v += parseFloat(s.ytd || 0);
// 					}
// 				});
// 				return v;
// 			}

// 			var subHeadNames = [], seen = {};
// 			entries.forEach(function (e) {
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isOpex(s.name)) { return; }
// 					(s.sub_heads || []).forEach(function (sub) {
// 						var n = (sub.name || '').trim();
// 						if (n && !seen[n]) { seen[n] = true; subHeadNames.push(n); }
// 					});
// 				});
// 			});

// 			if (!subHeadNames.length) { return ''; }

// 			var tblId = 'ppt-opex-budget-tbl';

// 			if (!$('#ppt-opex-style').length) {
// 				$('head').append(
// 					'<style id="ppt-opex-style">' +
// 					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
// 					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th{border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:50 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:260px;border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:260px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;border:1.5px solid #aaa !important;}' +
// 					'</style>'
// 				);
// 			}

// 			var hdrR1 = '<tr class="cb-thead-main">' +
// 				'<th style="min-width:260px;text-align:left !important;">Expense Category</th>';
// 			entries.forEach(function (e) {
// 				hdrR1 += '<th style="min-width:150px;text-align:center !important;">' + (e.label || '').trim() + '</th>';
// 			});
// 			hdrR1 += '<th style="min-width:150px;text-align:center !important;background:var(--blue-dark);">Grand Total</th></tr>';

// 			var bodyHtml = '';
// 			var colTotals = [];
// 			entries.forEach(function () { colTotals.push(0); });
// 			var grandRowTotal = 0;

// 			subHeadNames.forEach(function (subName) {
// 				var rowTotal = 0, cells = '';
// 				entries.forEach(function (e, ei) {
// 					var v = getSubPlan(e, subName);
// 					colTotals[ei] += v;
// 					rowTotal += v;
// 					cells += '<td>' + fmtCrDash(v) + '</td>';
// 				});
// 				grandRowTotal += rowTotal;
// 				bodyHtml += '<tr>' +
// 					'<td>' + subName + '</td>' +
// 					cells +
// 					'<td style="font-weight:700;background:#ddeaf7;color:var(--blue-dark);border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(rowTotal) + '</td>' +
// 				'</tr>';
// 			});

// 			var totalCells = '';
// 			var opexGrandTotal = 0;
// 			entries.forEach(function (e) {
// 				var v = getOpexPlan(e);
// 				opexGrandTotal += v;
// 				totalCells += '<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(v) + '</td>';
// 			});
// 			bodyHtml += '<tr class="ppt-total-row">' +
// 				'<td>Total</td>' +
// 				totalCells +
// 				'<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(opexGrandTotal) + '</td>' +
// 			'</tr>';

// 			var fyPart = fyLabel.replace(/\s*budget\s*/i, '').trim();

// 			return '<div class="ppt-title-bar" style="margin-top:36px;">' +
// 					'<div class="ppt-main-title">OPERATING EXPENSES ' + fyPart + '</div>' +
// 				'</div>' +
// 				'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 					'<table id="' + tblId + '" class="cb-table">' +
// 						'<thead>' + hdrR1 + '</thead>' +
// 						'<tbody>' + bodyHtml + '</tbody>' +
// 					'</table>' +
// 				'</div>';
// 		}

// 		// ── CAPITAL EXPENSES TABLE ─────────────────────────────────────────────────
// 		// Rows = items directly inside the CAPITAL EXPENSES section (not sub_heads).
// 		// Same Cr formatting, same sticky first-col, same Grand Total column.
// 		// ──────────────────────────────────────────────────────────────────────────

// 		function buildCapexBudgetTable(entries, fyLabel) {
// 			if (!entries || !entries.length) { return ''; }

// 			function isCapex(name) {
// 				return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('CAPITAL') !== -1;
// 			}

// 			function getItemPlan(e, itemName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isCapex(s.name)) { return; }
// 					(s.items || []).forEach(function (item) {
// 						if ((item.name || '').trim() === itemName) {
// 							v += parseFloat(item.ytd || 0);
// 						}
// 					});
// 				});
// 				return v;
// 			}

// 			function getCapexPlan(e) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (isCapex(s.name)) {
// 						v += parseFloat(s.ytd || 0);
// 					}
// 				});
// 				return v;
// 			}

// 			var itemNames = [], seen = {};
// 			entries.forEach(function (e) {
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isCapex(s.name)) { return; }
// 					(s.items || []).forEach(function (item) {
// 						var n = (item.name || '').trim();
// 						if (n && !seen[n]) { seen[n] = true; itemNames.push(n); }
// 					});
// 				});
// 			});

// 			if (!itemNames.length) { return ''; }

// 			var tblId = 'ppt-capex-budget-tbl';

// 			if (!$('#ppt-capex-style').length) {
// 				$('head').append(
// 					'<style id="ppt-capex-style">' +
// 					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
// 					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th{border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:50 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:260px;border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:260px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;border:1.5px solid #aaa !important;}' +
// 					'</style>'
// 				);
// 			}

// 			var hdrR1 = '<tr class="cb-thead-main">' +
// 				'<th style="min-width:260px;text-align:left !important;">Expense Category</th>';
// 			entries.forEach(function (e) {
// 				hdrR1 += '<th style="min-width:150px;text-align:center !important;">' + (e.label || '').trim() + '</th>';
// 			});
// 			hdrR1 += '<th style="min-width:150px;text-align:center !important;background:var(--blue-dark);">Grand Total</th></tr>';

// 			var bodyHtml = '';
// 			var grandRowTotal = 0;

// 			itemNames.forEach(function (itemName) {
// 				var rowTotal = 0, cells = '';
// 				entries.forEach(function (e) {
// 					var v = getItemPlan(e, itemName);
// 					rowTotal += v;
// 					cells += '<td>' + fmtCrDash(v) + '</td>';
// 				});
// 				grandRowTotal += rowTotal;
// 				bodyHtml += '<tr>' +
// 					'<td>' + itemName + '</td>' +
// 					cells +
// 					'<td style="font-weight:700;background:#ddeaf7;color:var(--blue-dark);border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(rowTotal) + '</td>' +
// 				'</tr>';
// 			});

// 			var totalCells = '';
// 			var capexGrandTotal = 0;
// 			entries.forEach(function (e) {
// 				var v = getCapexPlan(e);
// 				capexGrandTotal += v;
// 				totalCells += '<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(v) + '</td>';
// 			});
// 			bodyHtml += '<tr class="ppt-total-row">' +
// 				'<td>Total</td>' +
// 				totalCells +
// 				'<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(capexGrandTotal) + '</td>' +
// 			'</tr>';

// 			var fyPart = fyLabel.replace(/\s*budget\s*/i, '').trim();

// 			return '<div class="ppt-title-bar" style="margin-top:36px;">' +
// 					'<div class="ppt-main-title">CAPITAL EXPENSES ' + fyPart + '</div>' +
// 				'</div>' +
// 				'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 					'<table id="' + tblId + '" class="cb-table">' +
// 						'<thead>' + hdrR1 + '</thead>' +
// 						'<tbody>' + bodyHtml + '</tbody>' +
// 					'</table>' +
// 				'</div>';
// 		}

// 		function load(fy) {
// 			currentFY = fy || '2025-26';
// 			$('#ppt-tbody,#ppt-prev-tbody').html(
// 				'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading\u2026</td></tr>'
// 			);
// 			$('#ppt-sub-tables').html('');
// 			Loader.show('Building your foundation metrics');

// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_foundation_overall',
// 				args: { financial_year: fy, month: 'March', table_name_filter: 'Foundation Overall' },
// 				callback: function (r) {
// 					var d = Array.isArray(r.message)
// 						? r.message
// 						: ((r.message && Array.isArray(r.message.message)) ? r.message.message : []);

// 					if (!d.length) {
// 						Loader.hide();
// 						$('#ppt-tbody,#ppt-prev-tbody').html(
// 							'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>'
// 						);
// 						return;
// 					}

// 					var p = (fy || '2025-26').split('-');
// 					var cS = parseInt(p[0], 10), cE = parseInt(p[1], 10);
// 					var curFY = cS + '-' + String(cE).padStart(2, '0');
// 					var prvFY = (cS - 1) + '-' + String(cE - 1).padStart(2, '0');

// 					$('#ppt-main-title').text('Overall Foundation \u2013 ' + curFY + ' Budget vs ' + prvFY + ' Actual');
// 					$('#ppt-prev-title').text('Overall Foundation \u2013 ' + prvFY + ' Budget vs ' + prvFY + ' Actual');

// 					var cCfg = { key: 'current_year',  budgetField: 'ytd', actualField: 'total_posted_amt_ytd' };
// 					var pCfg = { key: 'previous_year', budgetField: 'ytd', actualField: 'total_posted_amt_ytd' };

// 					var mainData = d.filter(function (e) { return e.is_this_sub_item !== 1; });
// 					var r0 = buildRows(mainData, cCfg);
// 					var r1 = buildRows(mainData, pCfg);

// 					renderTable(r0, 'ppt-tbody',      'ppt-budget-hdr',      'ppt-est-hdr',      'ppt-table',      curFY + ' Budget', prvFY + ' Actual');
// 					renderTable(r1, 'ppt-prev-tbody', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr', 'ppt-prev-table', prvFY + ' Budget', prvFY + ' Actual');

// 					var subHtml = buildEducationTables(d, cCfg, curFY + ' Budget', prvFY + ' Actual');
// 					$('#ppt-sub-tables').html(subHtml);

// 					$('#ppt-sub-tables .ppt-table-wrap').each(function () {
// 						var id = $(this).attr('id');
// 						if (id) { fixStickySubHeader('#' + id); }
// 					});

// 					frappe.call({
// 						method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 						args: { financial_year: fy, month: 'March', table_name_filter: 'Opex Capex' },
// 						callback: function (r2) {
// 							Loader.hide();
// 							var raw = Array.isArray(r2.message) ? r2.message
// 								: ((r2.message && Array.isArray(r2.message.message)) ? r2.message.message : []);
// 							var uwp = raw.filter(function (e) {
// 								return e.is_this_sub_item === 0
// 									&& e.sequence_id !== 9999
// 									&& (e.table_name || '').toUpperCase() !== 'CONSOLIDATED';
// 							}).sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });

// 							var opexHtml  = buildOpexBudgetTable(uwp, curFY);
// 							var capexHtml = buildCapexBudgetTable(uwp, curFY);

// 							$('#ppt-sub-tables').html(subHtml + opexHtml + capexHtml);

// 							$('#ppt-sub-tables .ppt-table-wrap').each(function () {
// 								var id = $(this).attr('id');
// 								if (id) { fixStickySubHeader('#' + id); }
// 							});
// 							fixStickySubHeader('#ppt-opex-budget-tbl');
// 							fixStickySubHeader('#ppt-capex-budget-tbl');
// 						},
// 						error: function () { Loader.hide(); }
// 					});

// 					var toExp = function (rows) {
// 						return rows.map(function (r) {
// 							return {
// 								label: r.label, bOpex: r.bOpex, bCapex: r.bCapex, bTotal: r.bTotal,
// 								eOpex: r.eOpex, eCapex: r.eCapex, eTotal: r.eTotal, is_total: !!r.isTotal
// 							};
// 						});
// 					};
// 					Store.ppt.rows         = toExp(r0);
// 					Store.ppt.prevRows     = toExp(r1);
// 					Store.ppt.budgetLabel  = curFY + ' Budget';
// 					Store.ppt.estLabel     = prvFY + ' Actual';
// 					Store.ppt.prevBudgetLabel = prvFY + ' Budget';
// 					Store.ppt.prevEstLabel    = prvFY + ' Actual';
// 				},
// 				error: function () {
// 					Loader.hide();
// 					$('#ppt-tbody,#ppt-prev-tbody').html(
// 						'<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>'
// 					);
// 				}
// 			});
// 		}

// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// SUMMARY IN INR MODULE
// 	// =============================================================================

// 	var SummaryINR = (function () {
// 		function normN(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }
// 		function zero() { return { opex_plan: 0, opex_act: 0, capex_plan: 0, capex_act: 0, total_plan: 0, total_act: 0 }; }
// 		function addV(a, b) { return { opex_plan: a.opex_plan + b.opex_plan, opex_act: a.opex_act + b.opex_act, capex_plan: a.capex_plan + b.capex_plan, capex_act: a.capex_act + b.capex_act, total_plan: a.total_plan + b.total_plan, total_act: a.total_act + b.total_act }; }
// 		function extractA(actuals) {
// 			var r = zero();
// 			(actuals || []).forEach(function (sec) {
// 				var nm = normN(sec.name);
// 				if (nm === 'OPERATING EXPENSES' || nm === 'OPERATING  EXPENSES') { r.opex_plan += parseFloat(sec.ytd || 0); r.opex_act += parseFloat(sec.total_posted_amt_ytd || 0); }
// 				if (nm === 'CAPITAL EXPENSES'   || nm === 'CAPITAL  EXPENSES')   { r.capex_plan += parseFloat(sec.ytd || 0); r.capex_act += parseFloat(sec.total_posted_amt_ytd || 0); }
// 			});
// 			r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act;
// 			return r;
// 		}
// 		function getConsolidatedTotals(data) {
// 			var ct = null;
// 			(data || []).forEach(function (e) {
// 				if (e.sequence_id === 9999 || (e.table_name || '').toUpperCase() === 'CONSOLIDATED') { ct = e; }
// 			});
// 			if (!ct) { return null; }
// 			var r = zero();
// 			(ct.actuals || []).forEach(function (a) {
// 				var nm = (a.name || '').toUpperCase().replace(/\s+/g, ' ').trim();
// 				if (nm === 'OPEX TOTAL')         { r.opex_plan += parseFloat(a.ytd || 0); r.opex_act += parseFloat(a.total_posted_amt_ytd || 0); }
// 				if (nm === 'CAPEX TOTAL')         { r.capex_plan += parseFloat(a.ytd || 0); r.capex_act += parseFloat(a.total_posted_amt_ytd || 0); }
// 				if (nm === 'OVERALL GRAND TOTAL') { r.total_plan = parseFloat(a.ytd || 0); r.total_act = parseFloat(a.total_posted_amt_ytd || 0); }
// 			});
// 			if (!r.total_plan && !r.total_act) { r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act; }
// 			return r;
// 		}
// 		function buildRowsA(data) {
// 			var sorted = (data || []).slice().sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// 			var norm = [], covid = [];
// 			sorted.forEach(function (e) {
// 				if (e.sequence_id === 9999 || (e.table_name || '').toUpperCase() === 'CONSOLIDATED') { return; }
// 				var lbl = (e.label || '').trim();
// 				var row = { display: lbl, isSub: e.is_this_sub_item === 1, isCovid: lbl.toLowerCase().indexOf('covid') !== -1, vals: extractA(e.actuals) };
// 				(row.isCovid ? covid : norm).push(row);
// 			});
// 			var gtVals = getConsolidatedTotals(data);
// 			if (!gtVals) {
// 				gtVals = zero();
// 				norm.forEach(function (r) { if (!r.isSub) { gtVals = addV(gtVals, r.vals); } });
// 				covid.forEach(function (r) { if (!r.isSub) { gtVals = addV(gtVals, r.vals); } });
// 			}
// 			var out = norm.slice();
// 			if (covid.length) { out = out.concat(covid); }
// 			out.push({ display: 'Grand Total', isTotal: true, isGrandTotal: true, vals: gtVals });
// 			return out;
// 		}
// 		function rowHtmlA(r) {
// 			var cls = r.isGrandTotal ? 'cb-row-grand' : (r.isTotal ? 'sinr-total-row' : (r.isCovid ? 'sinr-covid-row' : ''));
// 			var sty = 'text-align:left;' + (r.isSub ? 'padding-left:28px;color:#555;' : '');
// 			var v = r.vals;
// 			return '<tr class="' + cls + '"><td style="' + sty + '">' + r.display + '</td><td>' + fmtCr(v.opex_plan) + '</td><td>' + fmtCr(v.capex_plan) + '</td><td>' + fmtCr(v.total_plan) + '</td><td>' + fmtCr(v.opex_act) + '</td><td>' + fmtCr(v.capex_act) + '</td><td>' + fmtCr(v.total_act) + '</td></tr>';
// 		}
// 		function tableHtmlA(rows, pLbl, aLbl) {
// 			return '<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:28px;"><table class="cb-table sinr-table" id="sinr-table-a" style="width:100%;"><thead>' +
// 				'<tr class="cb-thead-main"><th rowspan="2" style="text-align:left !important;min-width:260px;">Unit / Function</th><th colspan="3" style="text-align:center !important;">' + pLbl + '</th><th colspan="3" style="text-align:center !important;">' + aLbl + '</th></tr>' +
// 				'<tr class="cb-thead-sub"><th>Opex</th><th>Capex</th><th>Total</th><th>Opex</th><th>Capex</th><th>Total</th></tr>' +
// 				'</thead><tbody>' + rows.map(rowHtmlA).join('') + '</tbody></table></div>';
// 		}
// 		function getSubNames(entries) {
// 			var seen = {}, names = [];
// 			entries.forEach(function (e) { (e.actuals || []).forEach(function (sec) { if (normN(sec.name).indexOf('OPERATING') === -1) { return; } (sec.sub_heads || []).forEach(function (sh) { var n = (sh.name || '').trim(); if (n && !seen[n]) { seen[n] = true; names.push(n); } }); }); });
// 			return names;
// 		}
// 		function shVal(actuals, name, field) { var v = 0; (actuals || []).forEach(function (sec) { if (normN(sec.name).indexOf('OPERATING') === -1) { return; } (sec.sub_heads || []).forEach(function (sh) { if ((sh.name || '').trim() === name) { v += parseFloat(field === 'plan' ? (sh.ytd || 0) : (sh.total_posted_amt_ytd || 0)); } }); }); return v; }
// 		function opT(a, f) { var v = 0; (a || []).forEach(function (s) { if (normN(s.name).indexOf('OPERATING') === -1) { return; } v += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }); return v; }
// 		function caT(a, f) { var v = 0; (a || []).forEach(function (s) { if (normN(s.name).indexOf('CAPITAL') === -1) { return; } v += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }); return v; }
// 		function tableHtmlB(entries, shNames, pLbl, aLbl, consolidatedVals) {
// 			var cc = 1 + shNames.length + 3;
// 			var hdr = '<tr class="cb-thead-main"><th rowspan="2" style="text-align:left !important;min-width:210px;">Unit / Function</th><th colspan="' + (shNames.length + 1) + '" style="text-align:center !important;">Operating Expenses</th><th rowspan="2" style="text-align:center !important;min-width:110px;">Capex</th><th rowspan="2" style="text-align:center !important;min-width:110px;">Total</th></tr>' +
// 				'<tr class="cb-thead-sub">' + shNames.map(function (n) { return '<th style="min-width:110px;">' + n + '</th>'; }).join('') + '<th style="min-width:110px;">Total</th></tr>';
// 			var body = '', gtP = {}, gtA = {};
// 			shNames.forEach(function (n) { gtP[n] = 0; gtA[n] = 0; });
// 			var gtOP = 0, gtOA = 0, gtCP = 0, gtCA = 0;
// 			entries.forEach(function (e) {
// 				var lbl = (e.label || '').trim(), act = e.actuals || [], sP = {}, sA = {};
// 				shNames.forEach(function (n) { sP[n] = shVal(act, n, 'plan'); sA[n] = shVal(act, n, 'act'); gtP[n] += sP[n]; gtA[n] += sA[n]; });
// 				var oP = opT(act, 'plan'), oA = opT(act, 'act'), cP = caT(act, 'plan'), cA = caT(act, 'act');
// 				gtOP += oP; gtOA += oA; gtCP += cP; gtCA += cA;
// 				body += '<tr class="sinr-unit-hdr"><td>' + lbl + '</td><td colspan="' + (shNames.length + 3) + '"></td></tr>';
// 				body += '<tr class="sinr-brkdwn-plan"><td style="padding-left:18px;color:#333;">- ' + pLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(sP[n]) + '</td>'; }).join('') + '<td>' + fmtCr(oP) + '</td><td>' + fmtCr(cP) + '</td><td>' + fmtCr(oP + cP) + '</td></tr>';
// 				body += '<tr class="sinr-brkdwn-act"><td style="padding-left:18px;color:#555;">- ' + aLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(sA[n]) + '</td>'; }).join('') + '<td>' + fmtCr(oA) + '</td><td>' + fmtCr(cA) + '</td><td>' + fmtCr(oA + cA) + '</td></tr>';
// 				body += '<tr class="sinr-spacer"><td colspan="' + cc + '"></td></tr>';
// 			});
// 			var finalOP = (consolidatedVals && consolidatedVals.opex_plan)  ? consolidatedVals.opex_plan  : gtOP;
// 			var finalOA = (consolidatedVals && consolidatedVals.opex_act)   ? consolidatedVals.opex_act   : gtOA;
// 			var finalCP = (consolidatedVals && consolidatedVals.capex_plan) ? consolidatedVals.capex_plan : gtCP;
// 			var finalCA = (consolidatedVals && consolidatedVals.capex_act)  ? consolidatedVals.capex_act  : gtCA;
// 			var finalTP = (consolidatedVals && consolidatedVals.total_plan) ? consolidatedVals.total_plan : (gtOP + gtCP);
// 			var finalTA = (consolidatedVals && consolidatedVals.total_act)  ? consolidatedVals.total_act  : (gtOA + gtCA);
// 			body += '<tr class="cb-row-grand"><td>Grand Total</td><td colspan="' + (shNames.length + 3) + '"></td></tr>';
// 			body += '<tr class="sinr-gt-plan"><td style="padding-left:18px;">- ' + pLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(gtP[n]) + '</td>'; }).join('') + '<td>' + fmtCr(finalOP) + '</td><td>' + fmtCr(finalCP) + '</td><td>' + fmtCr(finalTP) + '</td></tr>';
// 			body += '<tr class="sinr-gt-act"><td style="padding-left:18px;">- ' + aLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(gtA[n]) + '</td>'; }).join('') + '<td>' + fmtCr(finalOA) + '</td><td>' + fmtCr(finalCA) + '</td><td>' + fmtCr(finalTA) + '</td></tr>';
// 			return '<div class="cb-scroll-wrapper" style="margin-bottom:24px;"><table id="sinr-table-b" style="width:100%;border-collapse:collapse;"><thead>' + hdr + '</thead><tbody>' + body + '</tbody></table></div>';
// 		}
// 		function load(fy) {
// 			var $tab = $('#tab-summary_inr');
// 			$tab.html('<div style="padding:20px;text-align:center;color:#aaa;">Loading\u2026</div>');
// 			Loader.show('Building Unit wise plan');
// 			var fp = (fy || '2025-26').split('-');
// 			var pLbl = fy + ' Budget', aLbl = (parseInt(fp[0], 10) - 1) + '-' + String(parseInt(fp[1], 10) - 1).padStart(2, '0') + ' Est';
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 				args: { financial_year: fy, month: 'March', table_name_filter: 'Unit Wise Plan' },
// 				callback: function (r) {
// 					Loader.hide();
// 					var d = Array.isArray(r.message) ? r.message : ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
// 					if (!d || !d.length) { $tab.html('<div style="padding:40px;text-align:center;color:#aaa;">No data available.</div>'); return; }
// 					Store.summaryInr = d;
// 					var eB = d.filter(function (e) { return e.is_this_sub_item === 0 && e.sequence_id !== 9999 && (e.table_name || '').toUpperCase() !== 'CONSOLIDATED'; }).sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// 					var ctVals = getConsolidatedTotals(d);
// 					$tab.html('<div style="padding:4px 0 10px;"><div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' + xlBtn('xl-summary-inr', 'Export to Excel') + '</div>' +
// 						'<div class="sinr-section-label">A. Unit Wise Plan</div>' + tableHtmlA(buildRowsA(d), pLbl, aLbl) +
// 						'<div class="sinr-section-label" style="margin-top:24px;">B. Breakdown of Unit Wise Plan</div>' +
// 						'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
// 						tableHtmlB(eB, getSubNames(eB), pLbl, aLbl, ctVals) + '</div>');
// 					fixStickySubHeader('#sinr-table-a');
// 					(function retrySinrB(n) {
// 						var $b = $('#sinr-table-b'); if (!$b.length) { return; }
// 						var rows = $b.find('thead tr'), ok = true;
// 						rows.each(function () { if (!$(this).outerHeight(true)) { ok = false; } });
// 						if (!ok && n < 10) { setTimeout(function() { retrySinrB(n+1); }, 50); return; }
// 						var top = 0;
// 						rows.each(function () { $(this).find('th').css('top', top + 'px'); top += $(this).outerHeight(true) || 40; });
// 					})(0);
// 				},
// 				error: function () { Loader.hide(); $tab.html('<div style="padding:40px;text-align:center;color:red;">Error loading Summary in INR data.</div>'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// HEADCOUNT MODULE
// 	// =============================================================================

// 	var Headcount = (function () {
// 		function fmtHC(v) { if (v === null || v === undefined) { return '-'; } var n = parseFloat(v); return isNaN(n) ? '-' : Math.round(n).toLocaleString('en-IN'); }
// 		function fmtOpex(v) { if (v === null || v === undefined) { return '-'; } var n = parseFloat(v); return isNaN(n) ? '-' : fmtCr(n * 10000000); }
// 		function fmtPct(a, b) {
// 			a = parseFloat(a); b = parseFloat(b);
// 			if (!a || isNaN(a) || isNaN(b)) { return '-'; }
// 			return Math.round(((b / a) - 1) * 100) + '%';
// 		}
// 		function norm(s) { return (s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
// 		function hcSec(txt) { return '<div class="hc-section-title">' + txt + '</div>'; }
// 		function swrap(inner) { return '<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' + inner + '</div>'; }
// 		function buildOpexMap(pd) {
// 			var map = {};
// 			(pd || []).forEach(function (p) {
// 				var op = null; (p.actuals || []).forEach(function (a) { if ((a.name || '').trim() === 'OPERATING  EXPENSES') { op = a; } });
// 				map[norm(p.label || '')] = { est: op ? parseFloat(op.total_posted_amt_ytd || 0) / 10000000 : 0, plan: op ? parseFloat(op.ytd || 0) / 10000000 : 0 };
// 			});
// 			return map;
// 		}
// 		function transform(records) {
// 			var sorted = (records || []).slice().sort(function (a, b) { return (a.financial_year || '').localeCompare(b.financial_year || ''); });
// 			var yrs = sorted.map(function (r) { return r.financial_year || ''; });
// 			var um = {};
// 			sorted.forEach(function (rec) {
// 				(rec.units || []).forEach(function (u) {
// 					var id = String(u.unit || u.unit_id || '');
// 					if (!um[id]) { um[id] = { description: '', hc: {}, seq: parseInt(id, 10) || 0 }; }
// 					um[id].hc[rec.financial_year] = parseFloat(u.total_headcount) || 0;
// 					if (rec.financial_year === yrs[yrs.length - 1]) {
// 						um[id].description = (u.unit_description || u.description || '').trim();
// 					}
// 				});
// 			});
// 			var units = Object.keys(um)
// 				.sort(function (a, b) { return (um[a].seq || 0) - (um[b].seq || 0); })
// 				.map(function (id) { return um[id]; });
// 			var totals = {};
// 			sorted.forEach(function (r) {
// 				totals[r.financial_year] = parseFloat(r.total_head_count || r.total_headcount || 0);
// 			});
// 			return { yrs: yrs, units: units, totals: totals };
// 		}
// 		function avgHC(u, yrs, i) {
// 			if (i === 0) { var c = u.hc[yrs[0]]; return c !== undefined ? c / 2 : null; }
// 			var p = u.hc[yrs[i - 1]], c = u.hc[yrs[i]];
// 			return (p !== undefined && c !== undefined) ? (p + c) / 2 : null;
// 		}
// 		function avgTot(tot, yrs, i) {
// 			if (i === 0) { var c = tot[yrs[0]]; return c !== undefined ? c / 2 : null; }
// 			var p = tot[yrs[i - 1]], c = tot[yrs[i]];
// 			return (p !== undefined && c !== undefined) ? (p + c) / 2 : null;
// 		}
// 		function gtable(hdrs, rows) {
// 			return swrap('<table class="cb-table" style="width:100%;"><thead><tr class="cb-thead-main"><th style="text-align:left !important;min-width:220px;">Unit</th>' +
// 				hdrs.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + rows + '</tbody></table>');
// 		}
// 		function load(fy) {
// 			var $tab = $('#tab-headcount');
// 			$tab.html('<div style="padding:40px;text-align:center;color:#aaa;">Loading\u2026</div>');
// 			Loader.show('Generating workforce summary\u2026');
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_headcount',
// 				args: { financial_year: fy, month: 'March', table_name_filter: 'Unit Wise Plan' },
// 				callback: function (r) {
// 					Loader.hide();
// 					var msg = r.message || {}, records = msg.headcount_data || [], planData = msg.plan_data || [];
// 					if (!records.length) { $tab.html('<div style="padding:40px;text-align:center;color:#aaa;">No headcount data available.</div>'); return; }
// 					Store.headcount = records;
// 					var om = buildOpexMap(planData), t = transform(records);
// 					var yrs = t.yrs, units = t.units, totals = t.totals, i1 = yrs.length - 2, i2 = yrs.length - 1;
// 					var totEst = 0, totPlan = 0, sRows = '';
// 					units.forEach(function (u) { var a1 = avgHC(u, yrs, i1), a2 = avgHC(u, yrs, i2), o = om[norm(u.description)] || { est: 0, plan: 0 }; totEst += o.est; totPlan += o.plan; sRows += '<tr><td style="text-align:left;">' + u.description + '</td><td>' + fmtHC(a1) + '</td><td>' + fmtHC(a2) + '</td><td>' + fmtPct(a1, a2) + '</td><td>' + fmtOpex(o.est) + '</td><td>' + fmtOpex(o.plan) + '</td><td>' + fmtPct(o.est, o.plan) + '</td></tr>'; });
// 					var ta1 = avgTot(totals, yrs, i1), ta2 = avgTot(totals, yrs, i2);
// 					sRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td><td>' + fmtHC(ta1) + '</td><td>' + fmtHC(ta2) + '</td><td>' + fmtPct(ta1, ta2) + '</td><td>' + fmtOpex(totEst) + '</td><td>' + fmtOpex(totPlan) + '</td><td>' + fmtPct(totEst, totPlan) + '</td></tr>';
// 					var sumHtml = swrap('<table class="cb-table" style="width:100%;"><thead><tr class="cb-thead-main"><th rowspan="2" style="text-align:left !important;min-width:200px;">Unit</th><th colspan="3" style="text-align:center !important;">Average H/C</th><th colspan="3" style="text-align:center !important;">Opex Spend (&#8377; Cr.)</th></tr><tr class="cb-thead-sub"><th>' + (yrs[i1] || '') + '</th><th>' + (yrs[i2] || '') + '</th><th>%</th><th>' + (yrs[i1] || '') + ' Est</th><th>' + (yrs[i2] || '') + ' Plan</th><th>%</th></tr></thead><tbody>' + sRows + '</tbody></table>');
// 					var cRows = '', aRows = '';
// 					units.forEach(function (u) { cRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.map(function (y) { return '<td>' + fmtHC(u.hc[y] !== undefined ? u.hc[y] : null) + '</td>'; }).join('') + '</tr>'; });
// 					cRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + yrs.map(function (y) { return '<td>' + fmtHC(totals[y] || 0) + '</td>'; }).join('') + '</tr>';
// 					units.forEach(function (u) { aRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.map(function (y, i) { return '<td>' + fmtHC(avgHC(u, yrs, i)) + '</td>'; }).join('') + '</tr>'; });
// 					aRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + yrs.map(function (y, i) { return '<td>' + fmtHC(avgTot(totals, yrs, i)) + '</td>'; }).join('') + '</tr>';
// 					var pHdrs = [], cpRows = '', apRows = '';
// 					if (yrs.length >= 2) {
// 						pHdrs = yrs.slice(1).map(function (y, i) { return yrs[i] + ' &#8594; ' + y; });
// 						units.forEach(function (u) { cpRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.slice(1).map(function (y, i) { return '<td>' + fmtPct(u.hc[yrs[i]], u.hc[y]) + '</td>'; }).join('') + '</tr>'; apRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.slice(1).map(function (y, i) { return '<td>' + fmtPct(avgHC(u, yrs, i), avgHC(u, yrs, i + 1)) + '</td>'; }).join('') + '</tr>'; });
// 						cpRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + yrs.slice(1).map(function (y, i) { return '<td>' + fmtPct(totals[yrs[i]], totals[y]) + '</td>'; }).join('') + '</tr>';
// 						var tpc = ''; for (var ii = 1; ii < yrs.length; ii++) { tpc += '<td>' + fmtPct(avgTot(totals, yrs, ii - 1), avgTot(totals, yrs, ii)) + '</td>'; }
// 						apRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + tpc + '</tr>';
// 					}
// 					$tab.html('<div style="padding:4px 0 10px;"><div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' + xlBtn('xl-headcount', 'Export to Excel') + '</div>' +
// 						hcSec('Headcount Summary') + '<div class="ppt-currency-label" style="text-align:left;margin-bottom:6px;">H/C numbers &nbsp;|&nbsp; Opex in &#8377; <strong>Cr.</strong></div>' + sumHtml +
// 						hcSec('Closing H/C') + gtable(yrs, cRows) + hcSec('Average H/C') + gtable(yrs, aRows) +
// 						(yrs.length >= 2 ? hcSec('Increase in Closing H/C (%)') + gtable(pHdrs, cpRows) : '') +
// 						(yrs.length >= 2 ? hcSec('Increase in Average H/C (%)') + gtable(pHdrs, apRows) : '') + '</div>');
// 					$tab.find('.cb-table').each(function () { fixStickySubHeader(this); });
// 				},
// 				error: function () { Loader.hide(); $tab.html('<div style="padding:40px;text-align:center;color:red;">Error loading headcount data.</div>'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ANNUAL BUDGET MODULE
// 	// =============================================================================

// 	var Annual = (function () {
// 		var Q_DEFS = { q1: { label: 'Quarter 1', months: ['April', 'May', 'June'] }, q2: { label: 'Quarter 2', months: ['July', 'August', 'September'] }, q3: { label: 'Quarter 3', months: ['October', 'November', 'December'] }, q4: { label: 'Quarter 4', months: ['January', 'February', 'March'] } };
// 		var Q_KEYS = ['q1', 'q2', 'q3', 'q4'];
// 		var data = [], expandedQ = [], openH = {}, openS = {}, bound = false;
// 		function sumArr(a) { var t = 0; (a || []).forEach(function (v) { t += (v || 0); }); return t; }
// 		function objTotal(o) { var t = 0; Q_KEYS.forEach(function (k) { t += sumArr(o[k]); }); return t; }
// 		function qCells(obj) {
// 			var html = '';
// 			Q_KEYS.forEach(function (k) {
// 				var vals = obj[k] || [0, 0, 0];
// 				if (expandedQ.indexOf(k) !== -1) { vals.forEach(function (v) { html += '<td>' + formatINR(v) + '</td>'; }); }
// 				else { html += '<td colspan="3">' + formatINR(sumArr(vals)) + '</td>'; }
// 			});
// 			return html;
// 		}
// 		function buildHeader() {
// 			var $t = $('#annual-table thead').empty(), $m = $('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense Head / Line Item</th>');
// 			Q_KEYS.forEach(function (k) { var o = expandedQ.indexOf(k) !== -1; $m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o ? 1 : 2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o ? '\u25b2' : '\u25bc') + '</th>'); });
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>'); $t.append($m);
// 			if (expandedQ.length) { var $s = $('<tr class="cb-thead-sub"></tr>'); Q_KEYS.forEach(function (k) { if (expandedQ.indexOf(k) !== -1) { Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); }); } }); $t.append($s); }
// 			fixStickySubHeader('#annual-table');
// 		}
// 		function renderTable() {
// 			buildHeader();
// 			var $tb = $('#annual-table tbody').empty(), term = $('#annual-search').val().trim().toLowerCase();
// 			var grand = { q1: [0, 0, 0], q2: [0, 0, 0], q3: [0, 0, 0], q4: [0, 0, 0] };
// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				var hs = String(hi), ho = openH[hs] === true;
// 				Q_KEYS.forEach(function (k) { (head[k] || [0, 0, 0]).forEach(function (v, mi) { grand[k][mi] += (v || 0); }); });
// 				$tb.append('<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho ? '\u25bc' : '\u25b6') + '</span> ' + head.name.trim() + '</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td></tr>');
// 				(head.sub_heads || []).forEach(function (sub, si) {
// 					var sk = hs + '-' + si, so = openS[sk] === true;
// 					$tb.append('<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:22px;"><span class="cb-arrow">' + (so ? '\u25bc' : '\u25b6') + '</span> ' + sub.name + '</td>' + qCells(sub) + '<td>' + formatINR(objTotal(sub)) + '</td></tr>');
// 					(sub.items || []).forEach(function (item) { $tb.append('<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho && so) ? '' : 'display:none;') + '"><td style="padding-left:42px;">' + item.name + '</td>' + qCells(item) + '<td>' + formatINR(objTotal(item)) + '</td></tr>'); });
// 				});
// 				(head.items || []).forEach(function (d) { $tb.append('<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:35px;">' + d.name + '</td>' + qCells(d) + '<td>' + formatINR(objTotal(d)) + '</td></tr>'); });
// 			});
// 			var gt = 0; Q_KEYS.forEach(function (k) { gt += sumArr(grand[k]); });
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 			fixStickySubHeader('#annual-table');
// 		}
// 		function toggleHead(hs) { openH[hs] = !(openH[hs] === true); if (!openH[hs]) { data.forEach(function (h, hi) { if (String(hi) !== hs) { return; } (h.sub_heads || []).forEach(function (_, si) { openS[hs + '-' + si] = false; }); }); } renderTable(); }
// 		function toggleSub(hs, ss) { openS[hs + '-' + ss] = !(openS[hs + '-' + ss] === true); renderTable(); }
// 		function matchSearch(head, term) {
// 			if (!term) { return true; }
// 			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
// 			for (var s = 0; s < (head.sub_heads || []).length; s++) { if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; } for (var i = 0; i < (head.sub_heads[s].items || []).length; i++) { if ((head.sub_heads[s].items[i].name || '').toLowerCase().indexOf(term) !== -1) { return true; } } }
// 			for (var d = 0; d < (head.items || []).length; d++) { if ((head.items[d].name || '').toLowerCase().indexOf(term) !== -1) { return true; } }
// 			return false;
// 		}
// 		function bindEvents() {
// 			$(document).on('input.annual', '#annual-search', function () { renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-quarters', function () { expandedQ = this.checked ? Q_KEYS.slice() : []; renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-items', function () { if (this.checked) { data.forEach(function (h, hi) { openH[String(hi)] = true; (h.sub_heads || []).forEach(function (_, si) { openS[hi + '-' + si] = true; }); }); } else { openH = {}; openS = {}; } renderTable(); });
// 			$(document).on('click.annual', '#annual-table .cb-q-header', function () { var k = String($(this).attr('data-quarter')), idx = expandedQ.indexOf(k); if (idx !== -1) { expandedQ.splice(idx, 1); } else { expandedQ.push(k); } $('#annual-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length); renderTable(); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 		}
// 		function load(fy) {
// 			if (!bound) { bindEvents(); bound = true; }
// 			data = []; openH = {}; openS = {}; expandedQ = [];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			$('#annual-search').val('');
// 			Loader.show('Building Annual Budget\u2026');
// 			frappe.call({
// 				method: 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args: { financial_year: fy },
// 				callback: function (r) { data = r.message || []; Store.annual = data; renderTable(); Loader.hide(); },
// 				error: function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE
// 	// =============================================================================

// 	var Estimate = (function () {
// 		var Q_DEFS = { q1: { label: 'Quarter 1', months: ['April', 'May', 'June'] }, q2: { label: 'Quarter 2', months: ['July', 'August', 'September'] }, q3: { label: 'Quarter 3', months: ['October', 'November', 'December'] }, q4: { label: 'Quarter 4', months: ['January', 'February', 'March'] } };
// 		var Q_KEYS = ['q1', 'q2', 'q3', 'q4'], Q_IDX = { q1: [0, 1, 2], q2: [3, 4, 5], q3: [6, 7, 8], q4: [9, 10, 11] };
// 		var data = [], expandedQ = [], openH = {}, openS = {}, bound = false;
// 		function getMth(obj) { var m = obj.months || {}; return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)]; }
// 		function qTot(obj) { return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)]; }
// 		function yTot(obj) { var q = qTot(obj); return q[0]+q[1]+q[2]+q[3]; }
// 		function qCells(obj) { var mths = getMth(obj), qtots = qTot(obj), html = ''; Q_KEYS.forEach(function (q, qi) { if (expandedQ.indexOf(q) !== -1) { Q_IDX[q].forEach(function (mi) { html += '<td>' + formatINR(mths[mi]) + '</td>'; }); } else { html += '<td colspan="3">' + formatINR(qtots[qi]) + '</td>'; } }); return html; }
// 		function buildHeader() {
// 			var $t = $('#estimate-table thead').empty(), $m = $('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense</th>');
// 			Q_KEYS.forEach(function (k) { var o = expandedQ.indexOf(k) !== -1; $m.append('<th class="est-q-toggle" data-q="' + k + '" colspan="3" rowspan="' + (o ? 1 : 2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o ? '\u25b2' : '\u25bc') + '</th>'); });
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>'); $t.append($m);
// 			if (expandedQ.length) { var $s = $('<tr class="cb-thead-sub"></tr>'); Q_KEYS.forEach(function (k) { if (expandedQ.indexOf(k) !== -1) { Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); }); } }); $t.append($s); }
// 			fixStickySubHeader('#estimate-table');
// 		}
// 		function renderTable() {
// 			buildHeader();
// 			var $tb = $('#estimate-tbody').empty(), term = $('#estimate-search').val().trim().toLowerCase();
// 			if (!Array.isArray(data) || !data.length) { $tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>'); return; }
// 			var gM = [0,0,0,0,0,0,0,0,0,0,0,0], gQ = [0,0,0,0];
// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				getMth(head).forEach(function (v, i) { gM[i] += v; }); qTot(head).forEach(function (v, i) { gQ[i] += v; });
// 				var hs = String(hi), ho = openH[hs];
// 				$tb.append('<tr class="cb-row-head cb-est-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho ? '\u25bc' : '\u25b6') + '</span> ' + head.name + '</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(yTot(head)) + '</td></tr>');
// 				(head.items || []).forEach(function (item) { $tb.append('<tr class="cb-est-head-item" data-hi="' + hs + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:28px;">' + item.name + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>'); });
// 				(head.sub_heads || []).forEach(function (sub, si) {
// 					var sk = hs + '-' + si, so = openS[sk];
// 					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:20px;"><span class="cb-arrow">' + (so ? '\u25bc' : '\u25b6') + '</span> ' + sub.name + '</td>' + qCells(sub) + '<td>' + formatINR(yTot(sub)) + '</td></tr>');
// 					(sub.items || []).forEach(function (item) { $tb.append('<tr class="cb-est-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho && so) ? '' : 'display:none;') + '"><td style="padding-left:44px;">' + item.name + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>'); });
// 				});
// 			});
// 			var gO = { Q1: gQ[0], Q2: gQ[1], Q3: gQ[2], Q4: gQ[3], months: { '4': gM[0], '5': gM[1], '6': gM[2], '7': gM[3], '8': gM[4], '9': gM[5], '10': gM[6], '11': gM[7], '12': gM[8], '1': gM[9], '2': gM[10], '3': gM[11] } };
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(gO) + '<td>' + formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3]) + '</td></tr>');
// 			fixStickySubHeader('#estimate-table');
// 		}
// 		function toggleHead(hs) { var o = !openH[hs]; openH[hs] = o; $('#estimate-table tbody .cb-est-head[data-hi="' + hs + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); if (o) { $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').show(); $('#estimate-table tbody .cb-est-head-item[data-hi="' + hs + '"]').show(); $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () { var si = $(this).attr('data-si'); if (openS[hs + '-' + si]) { $('#estimate-table tbody .cb-est-sub-item[data-hi="' + hs + '"][data-si="' + si + '"]').show(); } }); } else { $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () { var si = $(this).attr('data-si'); openS[hs + '-' + si] = false; $(this).find('.cb-arrow').text('\u25b6'); }); $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"],.cb-est-sub-item[data-hi="' + hs + '"],.cb-est-head-item[data-hi="' + hs + '"]').hide(); } }
// 		function toggleSub(hs, ss) { var sk = hs + '-' + ss, o = !openS[sk]; openS[sk] = o; $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"][data-si="' + ss + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); var $i = $('#estimate-table tbody .cb-est-sub-item[data-hi="' + hs + '"][data-si="' + ss + '"]'); o ? $i.show() : $i.hide(); }
// 		function matchSearch(head, term) { if (!term) { return true; } if (head.name.toLowerCase().indexOf(term) !== -1) { return true; } for (var s = 0; s < (head.sub_heads || []).length; s++) { if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; } for (var i = 0; i < (head.sub_heads[s].items || []).length; i++) { if ((head.sub_heads[s].items[i].name || '').toLowerCase().indexOf(term) !== -1) { return true; } } } for (var d = 0; d < (head.items || []).length; d++) { if ((head.items[d].name || '').toLowerCase().indexOf(term) !== -1) { return true; } } return false; }
// 		function bindEvents() {
// 			$(document).on('click.estimate', '#estimate-table .est-q-toggle', function () { var k = String($(this).attr('data-q')), idx = expandedQ.indexOf(k); if (idx !== -1) { expandedQ.splice(idx, 1); } else { expandedQ.push(k); } $('#estimate-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length); renderTable(); });
// 			$(document).on('change.estimate', '#estimate-expand-quarters', function () { expandedQ = this.checked ? Q_KEYS.slice() : []; renderTable(); });
// 			$(document).on('change.estimate', '#estimate-expand-items', function () { if (this.checked) { data.forEach(function (h, hi) { openH[String(hi)] = true; (h.sub_heads || []).forEach(function (_, si) { openS[hi + '-' + si] = true; }); }); } else { openH = {}; openS = {}; } renderTable(); });
// 			$('#tab-estimate').on('click.estimate', '.cb-est-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-estimate').on('click.estimate', '.cb-est-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 			$(document).on('input.estimate', '#estimate-search', function () { renderTable(); });
// 		}
// 		function load(fy) {
// 			if (!bound) { bindEvents(); bound = true; }
// 			data = []; openH = {}; openS = {}; expandedQ = [];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked', false);
// 			Loader.show('Building Estimate\u2026');
// 			var year = (getPrevFY(fy) || '2025-26').split('-')[0];
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
// 				args: { fiscal_year: year, accounting_period: '12' },
// 				callback: function (r) {
// 					if (r.message) { if (r.message.status === 'success') { data = r.message.data || []; } else if (Array.isArray(r.message)) { data = r.message; } else if (r.message.data && Array.isArray(r.message.data)) { data = r.message.data; } else { frappe.msgprint('Failed to load Estimate data.'); } } else { frappe.msgprint('Failed to load Estimate data.'); }
// 					Store.estimate = data; renderTable(); Loader.hide();
// 				},
// 				error: function () { Loader.hide(); frappe.msgprint('Server error loading Estimate data.'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// BUDGET & ESTIMATE MODULE
// 	// =============================================================================

// 	var BudgetEstimate = (function () {
// 		var rawData = [], currentFY = '', openSec = {}, openSub = {}, expandItems = false, bound = false;
// 		function pl() { return getFYLabels(currentFY).plan; }
// 		function el() { return getFYLabels(currentFY).est; }
// 		function isGT(sec) { return sec.sequence_id === 9999 || (sec.name || '').toUpperCase().replace(/\s+/g, ' ').trim() === 'GRAND TOTAL'; }
// 		function secVal(e, sn, f) { var v = 0; (e.actuals || []).forEach(function (s) { if (isGT(s) || s.name !== sn) { return; } v += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }); return v; }
// 		function subVal(e, sn, subn, f) { var v = 0; (e.actuals || []).forEach(function (s) { if (isGT(s) || s.name !== sn) { return; } (s.sub_heads || []).forEach(function (sub) { if (sub.name !== subn) { return; } v += parseFloat(f === 'plan' ? (sub.ytd || 0) : (sub.total_posted_amt_ytd || 0)); }); }); return v; }
// 		function itemVal(e, nm, f) { var v = 0; (e.actuals || []).forEach(function (s) { if (isGT(s)) { return; } (s.items || []).forEach(function (i) { if (i.name === nm) { v += parseFloat(f === 'plan' ? (i.ytd || 0) : (i.total_posted_amt || 0)); } }); (s.sub_heads || []).forEach(function (sub) { (sub.items || []).forEach(function (i) { if (i.name === nm) { v += parseFloat(f === 'plan' ? (i.ytd || 0) : (i.total_posted_amt || 0)); } }); }); }); return v; }
// 		function grandVal(e, f) {
// 			var gt = 0, found = false;
// 			(e.actuals || []).forEach(function (s) {
// 				if (isGT(s)) { gt += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); found = true; }
// 			});
// 			if (!found) {
// 				(e.actuals || []).forEach(function (s) { gt += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); });
// 			}
// 			return gt;
// 		}
// 		function secTP(sn) { var v = 0; rawData.forEach(function (e) { v += secVal(e, sn, 'plan'); }); return v; }
// 		function secTE(sn) { var v = 0; rawData.forEach(function (e) { v += secVal(e, sn, 'est'); }); return v; }
// 		function subTP(sn, subn) { var v = 0; rawData.forEach(function (e) { v += subVal(e, sn, subn, 'plan'); }); return v; }
// 		function subTE(sn, subn) { var v = 0; rawData.forEach(function (e) { v += subVal(e, sn, subn, 'est'); }); return v; }
// 		function iTotP(n) { var v = 0; rawData.forEach(function (e) { v += itemVal(e, n, 'plan'); }); return v; }
// 		function iTotE(n) { var v = 0; rawData.forEach(function (e) { v += itemVal(e, n, 'est'); }); return v; }
// 		function allGP() { var v = 0; rawData.forEach(function (e) { v += grandVal(e, 'plan'); }); return v; }
// 		function allGE() { var v = 0; rawData.forEach(function (e) { v += grandVal(e, 'est'); }); return v; }
// 		function cellsPair(getP, getE) { var h = ''; rawData.forEach(function (e) { h += '<td>' + formatINR(getP(e)) + '</td><td>' + formatINR(getE(e)) + '</td>'; }); return h; }
// 		function tc2(plan, est, cls) { cls = cls || ''; return '<td class="be-total-plan ' + cls + '" style="font-weight:700;">' + formatINR(plan) + '</td><td class="be-total-est ' + cls + '" style="font-weight:700;">' + formatINR(est) + '</td>'; }
// 		function buildStruct() { if (!rawData.length) { return []; } return (rawData[0].actuals || []).filter(function (s) { return !isGT(s); }).map(function (s) { return { name: s.name, sub_heads: (s.sub_heads || []).map(function (sub) { return { name: sub.name, items: (sub.items || []).map(function (i) { return { name: i.name }; }) }; }), items: (s.items || []).map(function (i) { return { name: i.name }; }) }; }); }
// 		function buildHeader() {
// 			var $t = $('#be-table thead').empty(), $r1 = $('<tr class="cb-thead-main"></tr>'), $r2 = $('<tr class="cb-thead-sub"></tr>');
// 			$r1.append('<th rowspan="2" style="text-align:left !important;min-width:280px;position:sticky;left:0;z-index:50;background:#0076B6;vertical-align:middle;">Expense Head / Line Item</th>');
// 			rawData.forEach(function (e) { $r1.append('<th colspan="2" style="text-align:center;min-width:260px;">' + (e.label || '').trim() + '</th>'); });
// 			$r1.append('<th colspan="2" style="text-align:center;min-width:260px;background:#003B63;">Grand Total</th>');
// 			rawData.forEach(function () { $r2.append('<th style="text-align:center;min-width:130px;">' + pl() + '</th><th style="text-align:center;min-width:130px;">' + el() + '</th>'); });
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">' + pl() + '</th><th style="text-align:center;min-width:130px;background:#004F8B;">' + el() + '</th>');
// 			$t.append($r1).append($r2); fixStickySubHeader('#be-table');
// 		}
// 		function renderTable() {
// 			buildHeader();
// 			var $tb = $('#be-tbody').empty(), term = $('#be-search').val().trim().toLowerCase(), struct = buildStruct();
// 			if (!rawData.length || !struct.length) { $tb.append('<tr><td colspan="' + (1 + rawData.length * 2 + 2) + '" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>'); return; }
// 			struct.forEach(function (sec) {
// 				var sn = sec.name;
// 				var secOpen = openSec[sn] === true;
// 				var secVis = secOpen ? '' : 'display:none;';
// 				$tb.append('<tr class="cb-row-head be-sec-row" data-sec="' + sn + '"><td style="text-align:left;"><span class="cb-arrow">' + (secOpen ? '\u25bc' : '\u25b6') + '</span> ' + sn + '</td>' +
// 					cellsPair(function (e) { return secVal(e, sn, 'plan'); }, function (e) { return secVal(e, sn, 'est'); }) +
// 					tc2(secTP(sn), secTE(sn), 'be-grand-col') + '</tr>');
// 				sec.sub_heads.forEach(function (sub) {
// 					var sk = sn + '::' + sub.name, subOpen = expandItems || (openSub[sk] === true), itmVis = (secOpen && subOpen) ? '' : 'display:none;';
// 					$tb.append('<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="' + sn + '" data-sub="' + sk + '" style="' + secVis + '"><td style="padding-left:22px;text-align:left;"><span class="cb-arrow">' + (subOpen ? '\u25bc' : '\u25b6') + '</span> ' + sub.name + '</td>' +
// 						cellsPair(function (e) { return subVal(e, sn, sub.name, 'plan'); }, function (e) { return subVal(e, sn, sub.name, 'est'); }) +
// 						tc2(subTP(sn, sub.name), subTE(sn, sub.name), 'be-grand-col') + '</tr>');
// 					sub.items.forEach(function (item) {
// 						if (term && item.name.toLowerCase().indexOf(term) === -1) { return; }
// 						$tb.append('<tr class="be-item-row be-sec-child be-sub-child" data-sec="' + sn + '" data-sub="' + sk + '" style="' + itmVis + '"><td style="padding-left:42px;text-align:left;">' + item.name + '</td>' +
// 							cellsPair(function (e) { return itemVal(e, item.name, 'plan'); }, function (e) { return itemVal(e, item.name, 'est'); }) +
// 							tc2(iTotP(item.name), iTotE(item.name), 'be-grand-col') + '</tr>');
// 					});
// 				});
// 				sec.items.forEach(function (item) {
// 					if (term && item.name.toLowerCase().indexOf(term) === -1) { return; }
// 					$tb.append('<tr class="be-item-row be-sec-child be-direct-item" data-sec="' + sn + '" style="' + secVis + '"><td style="padding-left:30px;text-align:left;">' + item.name + '</td>' +
// 						cellsPair(function (e) { return itemVal(e, item.name, 'plan'); }, function (e) { return itemVal(e, item.name, 'est'); }) +
// 						tc2(iTotP(item.name), iTotE(item.name), 'be-grand-col') + '</tr>');
// 				});
// 			});
// 			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>' + cellsPair(function (e) { return grandVal(e, 'plan'); }, function (e) { return grandVal(e, 'est'); }) + tc2(allGP(), allGE(), 'be-grand-col') + '</tr>');
// 			fixStickySubHeader('#be-table');
// 		}
// 		function toggleSec(sn) { var o = !(openSec[sn] === true); openSec[sn] = o; $('#be-table tbody .be-sec-row[data-sec="' + sn + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); var $ch = $('#be-table tbody .be-sec-child[data-sec="' + sn + '"]'); if (o) { $ch.filter('.be-sub-row,.be-direct-item').show(); $ch.filter('.be-sub-child').each(function () { if (expandItems || openSub[$(this).attr('data-sub')] === true) { $(this).show(); } }); } else { $ch.hide(); } }
// 		function toggleSubRow(sk) { var o = !(openSub[sk] === true); openSub[sk] = o; $('#be-table tbody .be-sub-row[data-sub="' + sk + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); var $it = $('#be-table tbody .be-sub-child[data-sub="' + sk + '"]'); o ? $it.show() : $it.hide(); }
// 		function bindEvents() {
// 			$('#tab-budget_estimate').on('click.be', '.be-sec-row', function (e) { e.stopPropagation(); toggleSec($(this).attr('data-sec')); });
// 			$('#tab-budget_estimate').on('click.be', '.be-sub-row', function (e) { e.stopPropagation(); if (!expandItems) { toggleSubRow($(this).attr('data-sub')); } });
// 			$(document).on('change.be', '#be-expand-items', function () { expandItems = this.checked; buildStruct().forEach(function (sec) { openSec[sec.name] = expandItems; sec.sub_heads.forEach(function (sub) { openSub[sec.name + '::' + sub.name] = expandItems; }); }); renderTable(); });
// 			$(document).on('input.be', '#be-search', function () { renderTable(); });
// 		}
// 		function load(fy) {
// 			if (!bound) { bindEvents(); bound = true; }
// 			currentFY = fy; rawData = []; openSec = {}; openSub = {}; expandItems = false;
// 			$('#be-expand-items').prop('checked', false);
// 			Loader.show('Building Budget & Estimate\u2026');
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 				args: { financial_year: fy, month: 'March', table_name_filter: 'Budget & Estimate' },
// 				callback: function (r) {
// 					Loader.hide();
// 					var d = Array.isArray(r.message) ? r.message : ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
// 					if (!d || !d.length) { frappe.msgprint('No data returned for Budget & Estimate.'); renderTable(); return; }
// 					rawData = d.filter(function (e) {
// 						return e.is_this_sub_item === 0
// 							&& e.sequence_id !== 9999
// 							&& (e.table_name || '').toUpperCase() !== 'CONSOLIDATED';
// 					}).sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// 					Store.budgetEstimate = rawData; renderTable();
// 				},
// 				error: function () { Loader.hide(); frappe.msgprint('Server error loading Budget & Estimate data.'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// EXPORT WIRING
// 	// =============================================================================

// 	var API = 'annual_budget.api.export_reports';
// 	$(document).on('click', '#xl-ppt', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.ppt.rows.length) { frappe.msgprint('Please wait for the Foundation Metrics data to load first.'); return; } serverExport(API + '.export_ppt', { financial_year: fy, ppt_rows: JSON.stringify(Store.ppt.rows), prev_ppt_rows: JSON.stringify(Store.ppt.prevRows), budget_label: Store.ppt.budgetLabel, est_label: Store.ppt.estLabel, prev_budget_label: Store.ppt.prevBudgetLabel, prev_est_label: Store.ppt.prevEstLabel }, 'Building Foundation Metrics Excel\u2026'); });
// 	$(document).on('click', '#xl-summary-inr', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.summaryInr.length) { frappe.msgprint('Please wait for the Summary in INR data to load first.'); return; } serverExport(API + '.export_summary_inr', { financial_year: fy, summary_data: JSON.stringify(Store.summaryInr) }, 'Building Summary in INR Excel\u2026'); });
// 	$(document).on('click', '#xl-headcount', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.headcount.length) { frappe.msgprint('Please wait for the Headcount data to load first.'); return; } serverExport(API + '.export_headcount', { financial_year: fy, headcount_data: JSON.stringify(Store.headcount) }, 'Building Headcount Excel\u2026'); });
// 	$(document).on('click', '#xl-annual', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.annual.length) { frappe.msgprint('Please open the Annual Budget tab first.'); return; } serverExport(API + '.export_annual', { financial_year: fy, annual_data: JSON.stringify(Store.annual) }, 'Building Annual Budget Excel\u2026'); });
// 	$(document).on('click', '#xl-estimate', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.estimate.length) { frappe.msgprint('Please open the Estimate tab first.'); return; } serverExport(API + '.export_estimate', { financial_year: fy, estimate_data: JSON.stringify(Store.estimate) }, 'Building Estimate Excel\u2026'); });
// 	$(document).on('click', '#xl-be', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.budgetEstimate.length) { frappe.msgprint('Please open the Budget & Estimate tab first.'); return; } serverExport(API + '.export_budget_estimate', { financial_year: fy, be_data: JSON.stringify(Store.budgetEstimate) }, 'Building Budget & Estimate Excel\u2026'); });
// 	$(document).on('click', '#xl-export-all', function () {
// 		var fy = fyControl.get_value() || '2025-26', missing = [];
// 		if (!Store.ppt.rows.length)      { missing.push('Foundation Metrics (tab 1)'); }
// 		if (!Store.summaryInr.length)     { missing.push('Summary in INR (tab 2)'); }
// 		if (!Store.headcount.length)      { missing.push('Headcount (tab 3)'); }
// 		if (!Store.annual.length)         { missing.push('Annual Budget (tab 4)'); }
// 		if (!Store.estimate.length)       { missing.push('Estimate (tab 5)'); }
// 		if (!Store.budgetEstimate.length) { missing.push('Budget & Estimate (tab 6)'); }
// 		if (missing.length) { frappe.msgprint('Please open each tab first.<br><br>Still loading: <b>' + missing.join(', ') + '</b>'); return; }
// 		serverExport(API + '.export_all', { financial_year: fy, ppt_rows: JSON.stringify(Store.ppt.rows), prev_ppt_rows: JSON.stringify(Store.ppt.prevRows), budget_label: Store.ppt.budgetLabel, est_label: Store.ppt.estLabel, prev_budget_label: Store.ppt.prevBudgetLabel, prev_est_label: Store.ppt.prevEstLabel, summary_data: JSON.stringify(Store.summaryInr), headcount_data: JSON.stringify(Store.headcount), annual_data: JSON.stringify(Store.annual), estimate_data: JSON.stringify(Store.estimate), be_data: JSON.stringify(Store.budgetEstimate) }, 'Building full consolidated Excel\u2026');
// 	});

// 	// =============================================================================
// 	// AUTO-LOAD
// 	// =============================================================================

// 	if (fyControl.get_value()) { TabLoader.trigger('ppt'); }

// };




// frappe.pages['consolidated-budget'].on_page_load = function (wrapper) {

// 	// =============================================================================
// 	// PAGE SETUP
// 	// =============================================================================

// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper, title: 'Foundation - Consolidated Budget', single_column: true
// 	});

// 	setTimeout(function () {
// 		$(wrapper).find('#xl-export-all').remove();
// 		var $btn = $(
// 			'<button class="btn btn-default btn-sm" id="xl-export-all" style="display:inline-flex;align-items:center;gap:5px;margin-left:8px;background:#1a1a1a;color:#fff;border-color:#1a1a1a;">' +
// 			svgIcon() + 'Export All</button>'
// 		);
// 		var $pa = $(wrapper).find('.page-actions');
// 		if ($pa.length) { $pa.prepend($btn); }
// 	}, 300);

// 	function updatePageTitle(fy) {
// 		page.set_title('Foundation - Consolidated Budget - ' + fy);
// 		setTimeout(function () {
// 			$(wrapper).find('.page-head h3').hide();
// 			$(wrapper).find('.page-head .title-text').css({ 'font-size': '20px', 'font-weight': '700', 'color': '#1a1a1a' });
// 		}, 100);
// 	}

// 	// =============================================================================
// 	// FY HELPERS
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var p = (fy || '2025-26').split('-');
// 		var sYY = p[0] ? p[0].slice(-2) : '25';
// 		var eYY = p[1] ? p[1].slice(-2) : '26';
// 		var ps = String(parseInt(sYY, 10) - 1).padStart(2, '0');
// 		var pe = String(parseInt(eYY, 10) - 1).padStart(2, '0');
// 		return { plan: 'FY' + sYY + '-' + eYY + ' Plan', est: 'FY' + ps + '-' + pe + ' Estimate' };
// 	}

// 	function getPrevFY(fy) {
// 		var p = (fy || '2025-26').split('-');
// 		return (parseInt(p[0] || '2025', 10) - 1) + '-' + String(parseInt(p[1] || '26', 10) - 1).padStart(2, '0');
// 	}

// 	// =============================================================================
// 	// LOADER
// 	// =============================================================================

// 	if (!$('#global-loader').length) {
// 		$('body').append(
// 			'<div id="global-loader" class="loader-overlay">' +
// 			'<div class="loader-box"><img src="/files/APF logo.png" class="loader-logo" alt="">' +
// 			'<div class="loader-text">Loading, please wait</div></div></div>'
// 		);
// 	}
// 	$('#global-loader').hide();

// 	var Loader = {
// 		show: function (msg) {
// 			var $l = $('#global-loader');
// 			$l.find('.loader-text').text(msg || 'Loading, please wait');
// 			$l.css('display', 'flex').hide().fadeIn(200);
// 		},
// 		hide: function () { $('#global-loader').fadeOut(200); }
// 	};

// 	// =============================================================================
// 	// STORE
// 	// =============================================================================

// 	var Store = {
// 		ppt: { rows: [], prevRows: [], budgetLabel: '', estLabel: '', prevBudgetLabel: '', prevEstLabel: '' },
// 		summaryInr: [], headcount: [], annual: [], estimate: [], budgetEstimate: []
// 	};

// 	// =============================================================================
// 	// STYLES
// 	// =============================================================================

// 	$(page.body).append(
// 		'<style>' +
// 		':root{' +
// 		'--font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
// 		'--fs-xs:13px;--fs-sm:14px;--fs-base:15px;--fs-md:16px;--fs-lg:17px;--fs-xl:18px;' +
// 		'--fw-n:400;--fw-m:500;--fw-sb:600;--fw-b:700;' +
// 		'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 		'--orange:#F26B21;--orange-light:#FFF3E6;' +
// 		'--bdl:#9baab5;--bdh:#004a75;--bdo:#a84808;' +
// 		'--txt:#1a1a1a;--txt2:#36414c;--muted:#555;' +
// 		'}' +
// 		'.cb-wrapper{padding:15px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.5;}' +
// 		'.cb-wrapper *{box-sizing:border-box;}' +
// 		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:9px 18px;color:var(--muted);font-size:var(--fs-md);font-weight:var(--fw-m);background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s,border-color .15s;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:var(--blue-dark);font-weight:var(--fw-b);border-bottom:3px solid var(--blue-dark);}' +
// 		'#cb-tab-nav .cb-tab-link:hover{color:var(--blue-dark);}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +
// 		'.cb-filter-row{padding:8px 0;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +
// 		'.cb-controls{display:flex;align-items:center;padding:7px 12px;margin-bottom:12px;background:#f7f9fb;border:1px solid #e2e6ea;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
// 		'.cb-controls-left{display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap;}' +
// 		'.cb-controls-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}' +
// 		'.cb-search-wrap{position:relative;display:flex;align-items:center;}' +
// 		'.cb-search-wrap .search-icon{position:absolute;left:8px;color:#8d99a6;pointer-events:none;}' +
// 		'.cb-search-input{padding:5px 8px 5px 28px;border:1.5px solid var(--bdl);border-radius:4px;font-family:var(--font);font-size:var(--fs-sm);color:var(--txt2);background:#fff;width:220px;height:32px;transition:border-color .15s,box-shadow .15s;}' +
// 		'.cb-search-input:focus{outline:none;border-color:#5e64ff;box-shadow:0 0 0 2px rgba(94,100,255,.15);}' +
// 		'.cb-checkbox-area{display:flex;gap:12px;align-items:center;}' +
// 		'.cb-check-label{display:flex;align-items:center;gap:5px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-m);color:var(--txt2);cursor:pointer;user-select:none;white-space:nowrap;}' +
// 		'.cb-check-label input[type=checkbox]{width:14px;height:14px;cursor:pointer;accent-color:#5e64ff;}' +
// 		'.cb-xl-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;height:32px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-sb);cursor:pointer;white-space:nowrap;border:1px solid #1a1a1a;border-radius:4px;background:#1a1a1a;color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.15);transition:background .15s;}' +
// 		'.cb-xl-btn:hover{background:#333;}.cb-xl-btn svg{flex-shrink:0;color:#fff;}' +
// 		'#xl-export-all svg{vertical-align:middle;margin-right:3px;}' +
// 		'.cb-scroll-wrapper{border:1.5px solid var(--bdl);border-radius:6px;overflow:auto;max-height:72vh;background:#fff;}' +

// 		/* ══ NUCLEAR BORDER FIX — scoped under .cb-wrapper ══ */
// 		'.cb-wrapper table{border-collapse:collapse !important;border-spacing:0 !important;}' +
// 		'.cb-wrapper table th,.cb-wrapper table td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;text-align:right;font-family:var(--font);font-size:var(--fs-base);}' +
// 		'.cb-wrapper table th:first-child,.cb-wrapper table td:first-child{text-align:left !important;}' +
// 		'.cb-wrapper table thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-xl);font-weight:var(--fw-b);text-align:center !important;position:sticky;top:0;z-index:25;border:1.5px solid var(--bdh) !important;padding:10px 12px;letter-spacing:.1px;}' +
// 		'.cb-wrapper table thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-sb);text-align:center !important;position:sticky;top:0;z-index:24;border:1.5px solid var(--bdo) !important;min-width:110px;padding:8px 12px;}' +
// 		'.cb-wrapper table tr.cb-row-head td{background:var(--blue-light) !important;color:var(--blue-dark);font-weight:var(--fw-b);border:1.5px solid var(--bdl) !important;cursor:pointer;}' +
// 		'.cb-wrapper table tr.cb-row-head:hover td{background:#d0e8f5 !important;}' +
// 		'.cb-wrapper table tr.cb-row-sub td{background:var(--orange-light) !important;font-weight:var(--fw-sb);border:1.5px solid var(--bdl) !important;cursor:pointer;}' +
// 		'.cb-wrapper table tr.cb-row-sub:hover td{background:#ffe0c2 !important;}' +
// 		'.cb-wrapper table tr.cb-row-grand td{background:var(--blue-mid) !important;color:#fff !important;font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;}' +
// 		'.cb-wrapper table tr.ppt-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:var(--fw-b);border:1.5px solid #9baab5 !important;}' +
// 		'.cb-wrapper table tr.sinr-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:var(--fw-b) !important;border:1.5px solid #9baab5 !important;}' +
// 		'.cb-wrapper .ppt-table-wrap tbody tr td{background:#fff;color:var(--txt);font-weight:var(--fw-n);}' +

// 		/* ── Non-border cosmetic rules ── */
// 		'.cb-table,.ppt-table-wrap{width:100%;table-layout:auto;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.45;}' +
// 		'.cb-text-accent{color:var(--blue-mid);font-weight:var(--fw-sb);}' +
// 		'.ppt-title-bar{margin:14px 0 4px;}' +
// 		'.ppt-main-title{font-family:var(--font);font-size:var(--fs-md);font-weight:var(--fw-b);text-transform:uppercase;text-decoration:underline;letter-spacing:.4px;color:var(--txt);}' +
// 		'.ppt-currency-label{font-family:var(--font);font-size:var(--fs-sm);font-style:italic;color:var(--muted);text-align:right;margin-bottom:6px;}' +
// 		'.ppt-currency-label strong{font-weight:var(--fw-b);font-size:var(--fs-sm);font-style:normal;}' +
// 		'.ppt-dash{color:#bbb;text-align:center;display:block;}' +
// 		'.ppt-sub-item-row td:first-child{padding-left:28px !important;font-style:italic;color:#444;}' +

// 		/* ── Budget & Estimate sticky col ── */
// 		'#be-table tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:280px;max-width:280px;white-space:normal;word-break:break-word;background:#fff;}' +
// 		'#be-table .cb-row-head td:first-child{background:var(--blue-light) !important;}' +
// 		'#be-table .cb-row-sub td:first-child{background:var(--orange-light) !important;}' +
// 		'#be-table .cb-row-grand td:first-child{background:var(--blue-mid) !important;}' +
// 		'#be-table thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:280px;}' +
// 		'#be-table .be-grand-col{background:#ddeaf7 !important;color:var(--blue-dark);border-left:2px solid var(--blue-mid) !important;}' +
// 		'#be-table .cb-row-grand .be-grand-col{background:var(--blue-dark) !important;color:#fff !important;}' +
// 		'#be-table .cb-row-head .be-grand-col{background:var(--blue-dark) !important;color:#fff !important;}' +
// 		'#be-table .cb-row-sub .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +
// 		'#be-table .cb-thead-main th:not(:first-child){min-width:260px;text-align:center !important;}' +
// 		'#be-table .cb-thead-sub th{min-width:130px;text-align:center !important;}' +
// 		'#be-table tbody td:first-child,#be-table thead th:first-child{box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +

// 		/* ── Summary INR labels ── */
// 		'.sinr-section-label{margin:18px 0 5px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-b);color:var(--txt);text-decoration:underline;letter-spacing:.2px;}' +
// 		'.sinr-currency-note{text-align:right;font-family:var(--font);font-size:var(--fs-xs);font-style:italic;color:var(--muted);margin-bottom:4px;}' +
// 		'.sinr-sub-item td:first-child{padding-left:22px !important;color:#444;}.sinr-covid-row td{color:#444;}' +

// 		/* ── sinr-table-a sticky cols ── */
// 		'#sinr-table-a thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:var(--blue-mid) !important;}' +
// 		'#sinr-table-a thead tr.cb-thead-sub th:first-child{position:sticky;left:0;z-index:49 !important;background:var(--orange) !important;}' +
// 		'#sinr-table-a tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +
// 		'#sinr-table-a .sinr-total-row td:first-child{background:#e8f0fa !important;}' +
// 		'#sinr-table-a .sinr-covid-row td:first-child{background:#fff;}' +

// 		/* ── sinr-table-b sticky + layout ── */
// 		'#sinr-table-b thead tr:nth-child(1) th{position:sticky;top:0;z-index:25;text-align:center !important;padding:10px 12px;}' +
// 		'#sinr-table-b thead tr:nth-child(2) th{position:sticky;z-index:24;text-align:center !important;padding:8px 12px;min-width:110px;}' +
// 		'#sinr-table-b thead tr th:first-child{position:sticky !important;left:0;text-align:left !important;min-width:210px;box-shadow:2px 0 5px -2px rgba(0,0,0,.18);}' +
// 		'#sinr-table-b thead tr:nth-child(1) th:first-child{z-index:55 !important;}' +
// 		'#sinr-table-b thead tr:nth-child(2) th:first-child{z-index:54 !important;}' +
// 		'#sinr-table-b tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:210px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +
// 		'#sinr-table-b tbody tr.sinr-unit-hdr td{background:var(--blue-light) !important;color:var(--blue-dark);font-weight:var(--fw-b);}' +
// 		'#sinr-table-b tbody tr.sinr-brkdwn-plan td{background:#fff !important;}' +
// 		'#sinr-table-b tbody tr.sinr-brkdwn-act td{background:#fafafa !important;}' +
// 		'#sinr-table-b tbody tr.sinr-spacer td{background:#f4f6f8 !important;padding:2px 0;}' +
// 		'#sinr-table-b tbody tr.sinr-gt-plan td,#sinr-table-b tbody tr.sinr-gt-act td{background:#ddeaf7 !important;color:var(--blue-dark);font-weight:var(--fw-sb);}' +
// 		'#sinr-table-b tbody td{text-align:right;padding:8px 12px;white-space:nowrap;}' +

// 		'.hc-section-title{margin:20px 0 6px;font-family:var(--font);font-size:var(--fs-md);font-weight:var(--fw-b);color:var(--blue-dark);text-transform:uppercase;letter-spacing:.4px;border-left:4px solid var(--blue-mid);padding-left:10px;}' +
// 		'#global-loader.loader-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(18,18,18,.92);backdrop-filter:blur(6px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
// 		'.loader-box{display:flex;flex-direction:column;align-items:center;gap:14px;}' +
// 		'.loader-logo{width:90px;height:90px;border-radius:50%;background:linear-gradient(145deg,#fff,#eaeaea);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.35);animation:lp 1.6s infinite ease-in-out;}' +
// 		'.loader-text{font-family:var(--font);font-size:var(--fs-sm);color:#fff;font-weight:var(--fw-sb);letter-spacing:.5px;opacity:.85;}' +
// 		'.loader-text::after{content:"";display:inline-block;width:1em;animation:ld 1.5s infinite;}' +
// 		'@keyframes lp{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.08);opacity:1;}}' +
// 		'@keyframes ld{0%{content:"";}33%{content:".";}66%{content:"..";}100%{content:"...";}}' +
// 		'</style>'
// 	);

// 	// =============================================================================
// 	// SHARED HELPERS
// 	// =============================================================================

// 	function svgIcon() {
// 		return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 			'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 			'<polyline points="14 2 14 8 20 8"/>' +
// 			'<line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>' +
// 			'</svg>';
// 	}

// 	function fmtCr(v) {
// 		var n = parseFloat(v) || 0;
// 		if (!isFinite(n) || n === 0) { return '-'; }
// 		var res = n / 10000000;
// 		var neg = res < 0;
// 		var s   = Math.abs(res).toFixed(2).split('.');
// 		var ip  = s[0], dp = s[1];
// 		if (ip.length > 3) {
// 			ip = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + ip.slice(-3);
// 		}
// 		return (neg ? '-' : '') + ip + '.' + dp;
// 	}

// 	function fmtCrDash(v) {
// 		var n = parseFloat(v) || 0;
// 		return (!isFinite(n) || n === 0) ? '<span class="ppt-dash">-</span>' : fmtCr(n);
// 	}

// 	function formatINR(v) {
// 		var n = Math.round(parseFloat(v) || 0);
// 		var neg = n < 0, s = String(Math.abs(n));
// 		if (s.length > 3) { s = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + s.slice(-3); }
// 		return (neg ? '-' : '') + s;
// 	}

// 	function xlBtn(id, label) { return '<button class="cb-xl-btn" id="' + id + '">' + svgIcon() + label + '</button>'; }

// 	function controlsBar(searchId, placeholder, checks, exportId) {
// 		var chk = checks.map(function (c) { return '<label class="cb-check-label"><input type="checkbox" id="' + c.id + '"> ' + c.label + '</label>'; }).join('');
// 		return '<div class="cb-controls"><div class="cb-controls-left">' +
// 			'<div class="cb-search-wrap"><svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
// 			'<input type="text" id="' + searchId + '" class="cb-search-input" placeholder="' + placeholder + '"></div>' +
// 			'<div class="cb-checkbox-area">' + chk + '</div></div>' +
// 			'<div class="cb-controls-right">' + xlBtn(exportId, 'Export to Excel') + '</div></div>';
// 	}

// 	function fixStickySubHeader(sel) {
// 		var attempts = 0;
// 		function attempt() {
// 			var $t = $(sel);
// 			var $m = $t.find('thead tr.cb-thead-main');
// 			var $s = $t.find('thead tr.cb-thead-sub');
// 			if (!$m.length || !$s.length) { return; }
// 			var h = $m[0].getBoundingClientRect().height;
// 			if (!h) { h = $m.outerHeight(true) || 0; }
// 			if (h > 0) {
// 				$s.find('th').css('top', h + 'px');
// 			} else if (attempts++ < 10) {
// 				setTimeout(attempt, 50);
// 			}
// 		}
// 		setTimeout(attempt, 0);
// 	}

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================

// 	$(page.body).append(
// 		'<div class="cb-wrapper">' +
// 		'<div class="frappe-control-group row cb-filter-row" id="cb-filter-row"></div>' +
// 		'<ul id="cb-tab-nav">' +
// 		'<li><a class="cb-tab-link active" data-tab="ppt">Foundation level/Overall metrics</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="summary_inr">Summary in INR</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="headcount">Headcount</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="estimate">Estimate Consolidated</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="budget_estimate">Budget &amp; Estimate</a></li>' +
// 		'</ul><div id="cb-tab-content">' +

// 		'<div class="cb-tab-pane active" id="tab-ppt">' +
// 		'<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">' + xlBtn('xl-ppt', 'Export to Excel') + '</div>' +

// 		/* ── Current year table ── */
// 		'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-main-title">Overall Foundation - Budget vs. Actual</div></div>' +
// 		'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 		'<div class="cb-scroll-wrapper" style="margin-bottom:20px;"><table id="ppt-table" class="ppt-table-wrap"><thead>' +
// 		'<tr class="cb-thead-main"><th rowspan="2" style="min-width:180px;">Unit</th><th colspan="3" id="ppt-budget-hdr">Budget</th><th colspan="3" id="ppt-est-hdr">Estimate</th></tr>' +
// 		'<tr class="cb-thead-sub"><th>Opex</th><th>Capex</th><th>Total</th><th>Opex</th><th>Capex</th><th>Total</th></tr>' +
// 		'</thead><tbody id="ppt-tbody"></tbody></table></div>' +

// 		/* ── Previous year table ── */
// 		'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-prev-title">Overall Foundation - Previous Year Budget vs. Actual</div></div>' +
// 		'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 		'<div class="cb-scroll-wrapper" style="margin-bottom:20px;"><table id="ppt-prev-table" class="ppt-table-wrap"><thead>' +
// 		'<tr class="cb-thead-main"><th rowspan="2" style="min-width:180px;">Unit</th><th colspan="3" id="ppt-prev-budget-hdr">Budget</th><th colspan="3" id="ppt-prev-est-hdr">Estimate</th></tr>' +
// 		'<tr class="cb-thead-sub"><th>Opex</th><th>Capex</th><th>Total</th><th>Opex</th><th>Capex</th><th>Total</th></tr>' +
// 		'</thead><tbody id="ppt-prev-tbody"></tbody></table></div>' +

// 		/* ── Sub-item tables injected here ── */
// 		'<div id="ppt-sub-tables"></div>' +

// 		'</div>' + /* end tab-ppt */

// 		'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
// 		'<div class="cb-tab-pane" id="tab-headcount"></div>' +

// 		'<div class="cb-tab-pane" id="tab-annual_budget">' +
// 		controlsBar('annual-search', 'Search expense / item\u2026', [{ id: 'annual-expand-quarters', label: 'Expand Quarters' }, { id: 'annual-expand-items', label: 'Expand Line Items' }], 'xl-annual') +
// 		'<div class="cb-scroll-wrapper"><table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table></div></div>' +

// 		'<div class="cb-tab-pane" id="tab-estimate">' +
// 		controlsBar('estimate-search', 'Search expense / item\u2026', [{ id: 'estimate-expand-quarters', label: 'Expand Quarters' }, { id: 'estimate-expand-items', label: 'Expand Line Items' }], 'xl-estimate') +
// 		'<div class="cb-scroll-wrapper"><table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table></div></div>' +

// 		'<div class="cb-tab-pane" id="tab-budget_estimate">' +
// 		controlsBar('be-search', 'Search expense / item\u2026', [{ id: 'be-expand-items', label: 'Expand Line Items' }], 'xl-be') +
// 		'<div class="cb-scroll-wrapper"><table class="cb-table" id="be-table"><thead></thead><tbody id="be-tbody"></tbody></table></div></div>' +

// 		'</div></div>'
// 	);

// 	// =============================================================================
// 	// FINANCIAL YEAR FILTER
// 	// =============================================================================

// 	var fyControl = frappe.ui.form.make_control({
// 		parent: $('<div class="col-md-3 col-sm-12"></div>').appendTo('#cb-filter-row'),
// 		df: {
// 			label: 'Financial Year', fieldtype: 'Select', fieldname: 'financial_year', reqd: 1,
// 			change: function () {
// 				var y = this.get_value(); if (!y) { return; }
// 				updatePageTitle(y); TabLoader.resetAll();
// 				TabLoader.trigger($('#cb-tab-nav .cb-tab-link.active').data('tab'));
// 			}
// 		},
// 		render_input: true
// 	});
// 	fyControl.refresh();

// 	frappe.call({
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (!r.message || !r.message.length) { return; }
// 			var years = r.message.map(function (d) { return d.financial_year; });
// 			fyControl.df.options = years.join('\n'); fyControl.refresh();
// 			var today = new Date(), y = today.getFullYear(), m = today.getMonth() + 1;
// 			var cur = (m >= 4 ? y : y - 1) + '-' + String(m >= 4 ? y + 1 : y).slice(-2);
// 			var target = years.indexOf(cur) !== -1 ? cur : years[0];
// 			fyControl.set_value(target); updatePageTitle(target);
// 		}
// 	});

// 	// =============================================================================
// 	// TAB SWITCHING + LOADER
// 	// =============================================================================

// 	$(document).on('click', '#cb-tab-nav .cb-tab-link', function () {
// 		var tab = $(this).data('tab');
// 		$('#cb-tab-nav .cb-tab-link').removeClass('active'); $('.cb-tab-pane').removeClass('active');
// 		$(this).addClass('active'); $('#tab-' + tab).addClass('active');
// 		TabLoader.trigger(tab);
// 	});

// 	var TabLoader = (function () {
// 		var loaded = {};
// 		var map = {
// 			ppt: function (fy) { PPT.load(fy); },
// 			summary_inr: function (fy) { SummaryINR.load(fy); },
// 			headcount: function (fy) { Headcount.load(fy); },
// 			annual_budget: function (fy) { Annual.load(fy); },
// 			estimate: function (fy) { Estimate.load(fy); },
// 			budget_estimate: function (fy) { BudgetEstimate.load(fy); }
// 		};
// 		return {
// 			trigger: function (tab) {
// 				if (!map[tab]) { return; }
// 				var fy = fyControl.get_value() || '2025-26';
// 				if (loaded[tab] === fy) { return; }
// 				loaded[tab] = fy; map[tab](fy);
// 			},
// 			resetAll: function () { loaded = {}; }
// 		};
// 	})();

// 	// =============================================================================
// 	// EXCEL EXPORT
// 	// =============================================================================

// 	function serverExport(method, args, msg) {
// 		Loader.show(msg || 'Preparing your Excel file');
// 		frappe.call({
// 			method: method, args: args,
// 			callback: function (r) {
// 				Loader.hide();
// 				if (r.message && r.message.data) {
// 					var bin = atob(r.message.data), bytes = new Uint8Array(bin.length);
// 					for (var i = 0; i < bin.length; i++) { bytes[i] = bin.charCodeAt(i); }
// 					var url = URL.createObjectURL(new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
// 					var a = document.createElement('a'); a.href = url; a.download = r.message.filename;
// 					document.body.appendChild(a); a.click();
// 					setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
// 				} else { frappe.msgprint('Export failed \u2014 no data returned.'); }
// 			},
// 			error: function () { Loader.hide(); frappe.msgprint('Server error during export.'); }
// 		});
// 	}

// 	// =============================================================================
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {
// 		var currentFY = '';

// 		function normSec(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }

// 		function extractVals(sections, field) {
// 			var opex = 0, capex = 0, hasBreakdown = false;
// 			(sections || []).forEach(function (sec) {
// 				var nm = normSec(sec.name);
// 				if (sec.sequence_id === 9999 || nm === 'GRAND TOTAL') { return; }
// 				if (nm.indexOf('OPERATING') !== -1) { opex  += parseFloat(sec[field] || 0); hasBreakdown = true; }
// 				if (nm.indexOf('CAPITAL')   !== -1) { capex += parseFloat(sec[field] || 0); hasBreakdown = true; }
// 			});
// 			if (!hasBreakdown) {
// 				(sections || []).forEach(function (sec) {
// 					if (sec.sequence_id === 9999 || normSec(sec.name) === 'GRAND TOTAL') {
// 						opex += parseFloat(sec[field] || 0);
// 					}
// 				});
// 				if (!opex) {
// 					(sections || []).forEach(function (sec) {
// 						if (sec.sequence_id !== 9999 && normSec(sec.name) !== 'GRAND TOTAL') {
// 							opex += parseFloat(sec[field] || 0);
// 						}
// 					});
// 				}
// 			}
// 			return { opex: opex, capex: capex };
// 		}

// 		function extractTotal(sections, field) {
// 			var gt = 0;
// 			(sections || []).forEach(function (sec) {
// 				if (sec.sequence_id === 9999 || normSec(sec.name) === 'GRAND TOTAL') {
// 					gt += parseFloat(sec[field] || 0);
// 				}
// 			});
// 			if (!gt) {
// 				(sections || []).forEach(function (sec) { gt += parseFloat(sec[field] || 0); });
// 			}
// 			return gt;
// 		}

// 		function buildRows(data, cfg) {
// 			var rows = (data || []).slice()
// 				.sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); })
// 				.map(function (e) {
// 					var b = extractVals(e[cfg.key] || [], cfg.budgetField);
// 					var v = extractVals(e[cfg.key] || [], cfg.actualField);
// 					var bTot = extractTotal(e[cfg.key] || [], cfg.budgetField);
// 					var eTot = extractTotal(e[cfg.key] || [], cfg.actualField);
// 					return { label: e.label || '', bOpex: b.opex, bCapex: b.capex, bTotal: bTot, eOpex: v.opex, eCapex: v.capex, eTotal: eTot };
// 				});
// 			var tot = { bOpex: 0, bCapex: 0, bTotal: 0, eOpex: 0, eCapex: 0, eTotal: 0 };
// 			rows.forEach(function (r) { tot.bOpex += r.bOpex; tot.bCapex += r.bCapex; tot.bTotal += r.bTotal; tot.eOpex += r.eOpex; tot.eCapex += r.eCapex; tot.eTotal += r.eTotal; });
// 			rows.push({ label: 'Total', isTotal: true, bOpex: tot.bOpex, bCapex: tot.bCapex, bTotal: tot.bTotal, eOpex: tot.eOpex, eCapex: tot.eCapex, eTotal: tot.eTotal });
// 			return rows;
// 		}

// 		function renderTable(rows, tbId, bHdr, eHdr, tblId, bLbl, eLbl) {
// 			$('#' + bHdr).text(bLbl); $('#' + eHdr).text(eLbl);
// 			var $tb = $('#' + tbId).empty();
// 			rows.forEach(function (r) {
// 				$tb.append('<tr class="' + (r.isTotal ? 'ppt-total-row' : '') + '"><td>' + r.label + '</td>' +
// 					'<td>' + fmtCrDash(r.bOpex) + '</td><td>' + fmtCrDash(r.bCapex) + '</td><td>' + fmtCrDash(r.bTotal) + '</td>' +
// 					'<td>' + fmtCrDash(r.eOpex) + '</td><td>' + fmtCrDash(r.eCapex) + '</td><td>' + fmtCrDash(r.eTotal) + '</td></tr>');
// 			});
// 			fixStickySubHeader('#' + tblId);
// 		}

// 		function buildEducationTables(data, cfg, bLbl, eLbl) {
// 			var subItems = (data || []).filter(function (e) { return e.is_this_sub_item === 1; });
// 			if (!subItems.length) { return ''; }

// 			var groups = {}, groupOrder = [];
// 			subItems.forEach(function (e) {
// 				var grp = (e.table_name || 'Other').trim();
// 				if (!groups[grp]) { groups[grp] = []; groupOrder.push(grp); }
// 				groups[grp].push(e);
// 			});

// 			var parentLabelMap = {};
// 			(data || []).forEach(function (e) {
// 				if (e.is_this_sub_item === 0) {
// 					var tn = (e.table_name || '').trim();
// 					if (tn && !parentLabelMap[tn]) {
// 						parentLabelMap[tn] = (e.label || tn).trim();
// 					}
// 				}
// 			});

// 			var html = '';

// 			groupOrder.forEach(function (grp) {
// 				var entries = groups[grp].slice()
// 					.sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });

// 				var sectionTitle = "EDUCATION";
// 				var tblId = 'ppt-edu-' + grp.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '');

// 				var bodyHtml = '';
// 				var tot = { bOpex: 0, bCapex: 0, bTotal: 0, eOpex: 0, eCapex: 0, eTotal: 0 };

// 				entries.forEach(function (e) {
// 					var b    = extractVals(e[cfg.key] || [], cfg.budgetField);
// 					var v    = extractVals(e[cfg.key] || [], cfg.actualField);
// 					var bTot = extractTotal(e[cfg.key] || [], cfg.budgetField);
// 					var eTot = extractTotal(e[cfg.key] || [], cfg.actualField);
// 					tot.bOpex  += b.opex;  tot.bCapex += b.capex; tot.bTotal += bTot;
// 					tot.eOpex  += v.opex;  tot.eCapex += v.capex; tot.eTotal += eTot;

// 					bodyHtml += '<tr>' +
// 						'<td>' + (e.label || '') + '</td>' +
// 						'<td>' + fmtCrDash(b.opex)  + '</td>' +
// 						'<td>' + fmtCrDash(b.capex) + '</td>' +
// 						'<td>' + fmtCrDash(bTot)    + '</td>' +
// 						'<td>' + fmtCrDash(v.opex)  + '</td>' +
// 						'<td>' + fmtCrDash(v.capex) + '</td>' +
// 						'<td>' + fmtCrDash(eTot)    + '</td></tr>';
// 				});

// 				bodyHtml += '<tr class="ppt-total-row">' +
// 					'<td>Total</td>' +
// 					'<td>' + fmtCrDash(tot.bOpex)  + '</td>' +
// 					'<td>' + fmtCrDash(tot.bCapex) + '</td>' +
// 					'<td>' + fmtCrDash(tot.bTotal) + '</td>' +
// 					'<td>' + fmtCrDash(tot.eOpex)  + '</td>' +
// 					'<td>' + fmtCrDash(tot.eCapex) + '</td>' +
// 					'<td>' + fmtCrDash(tot.eTotal) + '</td></tr>';

// 				html +=
// 					'<div class="ppt-title-bar" style="margin-top:28px;">' +
// 						'<div class="ppt-main-title">' + sectionTitle + '</div>' +
// 					'</div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 						'<table id="' + tblId + '" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:200px;text-align:left !important;">Unit</th>' +
// 									'<th colspan="3" style="text-align:center !important;">' + bLbl + '</th>' +
// 									'<th colspan="3" style="text-align:center !important;">' + eLbl + '</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody>' + bodyHtml + '</tbody>' +
// 						'</table>' +
// 					'</div>';
// 			});

// 			return html;
// 		}

// 		function buildOpexBudgetTable(entries, fyLabel) {
// 			if (!entries || !entries.length) { return ''; }

// 			function isOpex(name) {
// 				return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('OPERATING') !== -1;
// 			}

// 			function getSubPlan(e, subName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isOpex(s.name)) { return; }
// 					(s.sub_heads || []).forEach(function (sub) {
// 						if ((sub.name || '').trim() === subName) {
// 							v += parseFloat(sub.ytd || 0);
// 						}
// 					});
// 				});
// 				return v;
// 			}

// 			function getOpexPlan(e) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (isOpex(s.name)) {
// 						v += parseFloat(s.ytd || 0);
// 					}
// 				});
// 				return v;
// 			}

// 			var subHeadNames = [], seen = {};
// 			entries.forEach(function (e) {
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isOpex(s.name)) { return; }
// 					(s.sub_heads || []).forEach(function (sub) {
// 						var n = (sub.name || '').trim();
// 						if (n && !seen[n]) { seen[n] = true; subHeadNames.push(n); }
// 					});
// 				});
// 			});

// 			if (!subHeadNames.length) { return ''; }

// 			var tblId = 'ppt-opex-budget-tbl';

// 			if (!$('#ppt-opex-style').length) {
// 				$('head').append(
// 					'<style id="ppt-opex-style">' +
// 					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
// 					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th{border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:50 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:260px;border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:260px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;border:1.5px solid #aaa !important;}' +
// 					'</style>'
// 				);
// 			}

// 			var hdrR1 = '<tr class="cb-thead-main">' +
// 				'<th style="min-width:260px;text-align:left !important;">Expense Category</th>';
// 			entries.forEach(function (e) {
// 				hdrR1 += '<th style="min-width:150px;text-align:center !important;">' + (e.label || '').trim() + '</th>';
// 			});
// 			hdrR1 += '<th style="min-width:150px;text-align:center !important;background:var(--blue-dark);">Grand Total</th></tr>';

// 			var bodyHtml = '';
// 			var colTotals = [];
// 			entries.forEach(function () { colTotals.push(0); });
// 			var grandRowTotal = 0;

// 			subHeadNames.forEach(function (subName) {
// 				var rowTotal = 0, cells = '';
// 				entries.forEach(function (e, ei) {
// 					var v = getSubPlan(e, subName);
// 					colTotals[ei] += v;
// 					rowTotal += v;
// 					cells += '<td>' + fmtCrDash(v) + '</td>';
// 				});
// 				grandRowTotal += rowTotal;
// 				bodyHtml += '<tr>' +
// 					'<td>' + subName + '</td>' +
// 					cells +
// 					'<td style="font-weight:700;background:#ddeaf7;color:var(--blue-dark);border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(rowTotal) + '</td>' +
// 				'</tr>';
// 			});

// 			var totalCells = '';
// 			var opexGrandTotal = 0;
// 			entries.forEach(function (e) {
// 				var v = getOpexPlan(e);
// 				opexGrandTotal += v;
// 				totalCells += '<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(v) + '</td>';
// 			});
// 			bodyHtml += '<tr class="ppt-total-row">' +
// 				'<td>Total</td>' +
// 				totalCells +
// 				'<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(opexGrandTotal) + '</td>' +
// 			'</tr>';

// 			var fyPart = fyLabel.replace(/\s*budget\s*/i, '').trim();

// 			return '<div class="ppt-title-bar" style="margin-top:36px;">' +
// 					'<div class="ppt-main-title">OPERATING EXPENSES ' + fyPart + '</div>' +
// 				'</div>' +
// 				'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 					'<table id="' + tblId + '" class="cb-table">' +
// 						'<thead>' + hdrR1 + '</thead>' +
// 						'<tbody>' + bodyHtml + '</tbody>' +
// 					'</table>' +
// 				'</div>';
// 		}

// 		// ── CAPITAL EXPENSES TABLE ─────────────────────────────────────────────────
// 		// Rows = items directly inside the CAPITAL EXPENSES section (not sub_heads).
// 		// Same Cr formatting, same sticky first-col, same Grand Total column.
// 		// ──────────────────────────────────────────────────────────────────────────

// 		function buildCapexBudgetTable(entries, fyLabel) {
// 			if (!entries || !entries.length) { return ''; }

// 			function isCapex(name) {
// 				return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('CAPITAL') !== -1;
// 			}

// 			function getItemPlan(e, itemName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isCapex(s.name)) { return; }
// 					(s.items || []).forEach(function (item) {
// 						if ((item.name || '').trim() === itemName) {
// 							v += parseFloat(item.ytd || 0);
// 						}
// 					});
// 				});
// 				return v;
// 			}

// 			function getCapexPlan(e) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (isCapex(s.name)) {
// 						v += parseFloat(s.ytd || 0);
// 					}
// 				});
// 				return v;
// 			}

// 			var itemNames = [], seen = {};
// 			entries.forEach(function (e) {
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isCapex(s.name)) { return; }
// 					(s.items || []).forEach(function (item) {
// 						var n = (item.name || '').trim();
// 						if (n && !seen[n]) { seen[n] = true; itemNames.push(n); }
// 					});
// 				});
// 			});

// 			if (!itemNames.length) { return ''; }

// 			var tblId = 'ppt-capex-budget-tbl';

// 			if (!$('#ppt-capex-style').length) {
// 				$('head').append(
// 					'<style id="ppt-capex-style">' +
// 					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
// 					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th{border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:50 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:260px;border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:260px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;border:1.5px solid #aaa !important;}' +
// 					'</style>'
// 				);
// 			}

// 			var hdrR1 = '<tr class="cb-thead-main">' +
// 				'<th style="min-width:260px;text-align:left !important;">Expense Category</th>';
// 			entries.forEach(function (e) {
// 				hdrR1 += '<th style="min-width:150px;text-align:center !important;">' + (e.label || '').trim() + '</th>';
// 			});
// 			hdrR1 += '<th style="min-width:150px;text-align:center !important;background:var(--blue-dark);">Grand Total</th></tr>';

// 			var bodyHtml = '';
// 			var grandRowTotal = 0;

// 			itemNames.forEach(function (itemName) {
// 				var rowTotal = 0, cells = '';
// 				entries.forEach(function (e) {
// 					var v = getItemPlan(e, itemName);
// 					rowTotal += v;
// 					cells += '<td>' + fmtCrDash(v) + '</td>';
// 				});
// 				grandRowTotal += rowTotal;
// 				bodyHtml += '<tr>' +
// 					'<td>' + itemName + '</td>' +
// 					cells +
// 					'<td style="font-weight:700;background:#ddeaf7;color:var(--blue-dark);border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(rowTotal) + '</td>' +
// 				'</tr>';
// 			});

// 			var totalCells = '';
// 			var capexGrandTotal = 0;
// 			entries.forEach(function (e) {
// 				var v = getCapexPlan(e);
// 				capexGrandTotal += v;
// 				totalCells += '<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(v) + '</td>';
// 			});
// 			bodyHtml += '<tr class="ppt-total-row">' +
// 				'<td>Total</td>' +
// 				totalCells +
// 				'<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(capexGrandTotal) + '</td>' +
// 			'</tr>';

// 			var fyPart = fyLabel.replace(/\s*budget\s*/i, '').trim();

// 			return '<div class="ppt-title-bar" style="margin-top:36px;">' +
// 					'<div class="ppt-main-title">CAPITAL EXPENSES ' + fyPart + '</div>' +
// 				'</div>' +
// 				'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 					'<table id="' + tblId + '" class="cb-table">' +
// 						'<thead>' + hdrR1 + '</thead>' +
// 						'<tbody>' + bodyHtml + '</tbody>' +
// 					'</table>' +
// 				'</div>';
// 		}

// 		function load(fy) {
// 			currentFY = fy || '2025-26';
// 			$('#ppt-tbody,#ppt-prev-tbody').html(
// 				'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading\u2026</td></tr>'
// 			);
// 			$('#ppt-sub-tables').html('');
// 			Loader.show('Building your foundation metrics');

// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_foundation_overall',
// 				args: { financial_year: fy, month: 'March', table_name_filter: 'Foundation Overall' },
// 				callback: function (r) {
// 					var d = Array.isArray(r.message)
// 						? r.message
// 						: ((r.message && Array.isArray(r.message.message)) ? r.message.message : []);

// 					if (!d.length) {
// 						Loader.hide();
// 						$('#ppt-tbody,#ppt-prev-tbody').html(
// 							'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>'
// 						);
// 						return;
// 					}

// 					var p = (fy || '2025-26').split('-');
// 					var cS = parseInt(p[0], 10), cE = parseInt(p[1], 10);
// 					var curFY = cS + '-' + String(cE).padStart(2, '0');
// 					var prvFY = (cS - 1) + '-' + String(cE - 1).padStart(2, '0');

// 					$('#ppt-main-title').text('Overall Foundation \u2013 ' + curFY + ' Budget vs ' + prvFY + ' Actual');
// 					$('#ppt-prev-title').text('Overall Foundation \u2013 ' + prvFY + ' Budget vs ' + prvFY + ' Actual');

// 					var cCfg = { key: 'current_year',  budgetField: 'ytd', actualField: 'total_posted_amt_ytd' };
// 					var pCfg = { key: 'previous_year', budgetField: 'ytd', actualField: 'total_posted_amt_ytd' };

// 					var mainData = d.filter(function (e) { return e.is_this_sub_item !== 1; });
// 					var r0 = buildRows(mainData, cCfg);
// 					var r1 = buildRows(mainData, pCfg);

// 					renderTable(r0, 'ppt-tbody',      'ppt-budget-hdr',      'ppt-est-hdr',      'ppt-table',      curFY + ' Budget', prvFY + ' Actual');
// 					renderTable(r1, 'ppt-prev-tbody', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr', 'ppt-prev-table', prvFY + ' Budget', prvFY + ' Actual');

// 					var subHtml = buildEducationTables(d, cCfg, curFY + ' Budget', prvFY + ' Actual');
// 					$('#ppt-sub-tables').html(subHtml);

// 					$('#ppt-sub-tables .ppt-table-wrap').each(function () {
// 						var id = $(this).attr('id');
// 						if (id) { fixStickySubHeader('#' + id); }
// 					});

// 					frappe.call({
// 						method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 						args: { financial_year: fy, month: 'March', table_name_filter: 'Opex Capex' },
// 						callback: function (r2) {
// 							Loader.hide();
// 							var raw = Array.isArray(r2.message) ? r2.message
// 								: ((r2.message && Array.isArray(r2.message.message)) ? r2.message.message : []);
// 							var uwp = raw.filter(function (e) {
// 								return e.is_this_sub_item === 0
// 									&& e.sequence_id !== 9999
// 									&& (e.table_name || '').toUpperCase() !== 'CONSOLIDATED';
// 							}).sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });

// 							var opexHtml  = buildOpexBudgetTable(uwp, curFY);
// 							var capexHtml = buildCapexBudgetTable(uwp, curFY);

// 							$('#ppt-sub-tables').html(subHtml + opexHtml + capexHtml);

// 							$('#ppt-sub-tables .ppt-table-wrap').each(function () {
// 								var id = $(this).attr('id');
// 								if (id) { fixStickySubHeader('#' + id); }
// 							});
// 							fixStickySubHeader('#ppt-opex-budget-tbl');
// 							fixStickySubHeader('#ppt-capex-budget-tbl');
// 						},
// 						error: function () { Loader.hide(); }
// 					});

// 					var toExp = function (rows) {
// 						return rows.map(function (r) {
// 							return {
// 								label: r.label, bOpex: r.bOpex, bCapex: r.bCapex, bTotal: r.bTotal,
// 								eOpex: r.eOpex, eCapex: r.eCapex, eTotal: r.eTotal, is_total: !!r.isTotal
// 							};
// 						});
// 					};
// 					Store.ppt.rows         = toExp(r0);
// 					Store.ppt.prevRows     = toExp(r1);
// 					Store.ppt.budgetLabel  = curFY + ' Budget';
// 					Store.ppt.estLabel     = prvFY + ' Actual';
// 					Store.ppt.prevBudgetLabel = prvFY + ' Budget';
// 					Store.ppt.prevEstLabel    = prvFY + ' Actual';
// 				},
// 				error: function () {
// 					Loader.hide();
// 					$('#ppt-tbody,#ppt-prev-tbody').html(
// 						'<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>'
// 					);
// 				}
// 			});
// 		}

// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// SUMMARY IN INR MODULE
// 	// =============================================================================

// 	var SummaryINR = (function () {
// 		function normN(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }
// 		function zero() { return { opex_plan: 0, opex_act: 0, capex_plan: 0, capex_act: 0, total_plan: 0, total_act: 0 }; }
// 		function addV(a, b) { return { opex_plan: a.opex_plan + b.opex_plan, opex_act: a.opex_act + b.opex_act, capex_plan: a.capex_plan + b.capex_plan, capex_act: a.capex_act + b.capex_act, total_plan: a.total_plan + b.total_plan, total_act: a.total_act + b.total_act }; }
// 		function extractA(actuals) {
// 			var r = zero();
// 			(actuals || []).forEach(function (sec) {
// 				var nm = normN(sec.name);
// 				if (nm === 'OPERATING EXPENSES' || nm === 'OPERATING  EXPENSES') { r.opex_plan += parseFloat(sec.ytd || 0); r.opex_act += parseFloat(sec.total_posted_amt_ytd || 0); }
// 				if (nm === 'CAPITAL EXPENSES'   || nm === 'CAPITAL  EXPENSES')   { r.capex_plan += parseFloat(sec.ytd || 0); r.capex_act += parseFloat(sec.total_posted_amt_ytd || 0); }
// 			});
// 			r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act;
// 			return r;
// 		}
// 		function getConsolidatedTotals(data) {
// 			var ct = null;
// 			(data || []).forEach(function (e) {
// 				if (e.sequence_id === 9999 || (e.table_name || '').toUpperCase() === 'CONSOLIDATED') { ct = e; }
// 			});
// 			if (!ct) { return null; }
// 			var r = zero();
// 			(ct.actuals || []).forEach(function (a) {
// 				var nm = (a.name || '').toUpperCase().replace(/\s+/g, ' ').trim();
// 				if (nm === 'OPEX TOTAL')         { r.opex_plan += parseFloat(a.ytd || 0); r.opex_act += parseFloat(a.total_posted_amt_ytd || 0); }
// 				if (nm === 'CAPEX TOTAL')         { r.capex_plan += parseFloat(a.ytd || 0); r.capex_act += parseFloat(a.total_posted_amt_ytd || 0); }
// 				if (nm === 'OVERALL GRAND TOTAL') { r.total_plan = parseFloat(a.ytd || 0); r.total_act = parseFloat(a.total_posted_amt_ytd || 0); }
// 			});
// 			if (!r.total_plan && !r.total_act) { r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act; }
// 			return r;
// 		}
// 		function buildRowsA(data) {
// 			var sorted = (data || []).slice().sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// 			var norm = [], covid = [];
// 			sorted.forEach(function (e) {
// 				if (e.sequence_id === 9999 || (e.table_name || '').toUpperCase() === 'CONSOLIDATED') { return; }
// 				var lbl = (e.label || '').trim();
// 				var row = { display: lbl, isSub: e.is_this_sub_item === 1, isCovid: lbl.toLowerCase().indexOf('covid') !== -1, vals: extractA(e.actuals) };
// 				(row.isCovid ? covid : norm).push(row);
// 			});
// 			var gtVals = getConsolidatedTotals(data);
// 			if (!gtVals) {
// 				gtVals = zero();
// 				norm.forEach(function (r) { if (!r.isSub) { gtVals = addV(gtVals, r.vals); } });
// 				covid.forEach(function (r) { if (!r.isSub) { gtVals = addV(gtVals, r.vals); } });
// 			}
// 			var out = norm.slice();
// 			if (covid.length) { out = out.concat(covid); }
// 			out.push({ display: 'Grand Total', isTotal: true, isGrandTotal: true, vals: gtVals });
// 			return out;
// 		}
// 		function rowHtmlA(r) {
// 			var cls = r.isGrandTotal ? 'cb-row-grand' : (r.isTotal ? 'sinr-total-row' : (r.isCovid ? 'sinr-covid-row' : ''));
// 			var sty = 'text-align:left;' + (r.isSub ? 'padding-left:28px;color:#555;' : '');
// 			var v = r.vals;
// 			return '<tr class="' + cls + '"><td style="' + sty + '">' + r.display + '</td><td>' + fmtCr(v.opex_plan) + '</td><td>' + fmtCr(v.capex_plan) + '</td><td>' + fmtCr(v.total_plan) + '</td><td>' + fmtCr(v.opex_act) + '</td><td>' + fmtCr(v.capex_act) + '</td><td>' + fmtCr(v.total_act) + '</td></tr>';
// 		}
// 		function tableHtmlA(rows, pLbl, aLbl) {
// 			return '<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:28px;"><table class="cb-table sinr-table" id="sinr-table-a" style="width:100%;"><thead>' +
// 				'<tr class="cb-thead-main"><th rowspan="2" style="text-align:left !important;min-width:260px;">Unit / Function</th><th colspan="3" style="text-align:center !important;">' + pLbl + '</th><th colspan="3" style="text-align:center !important;">' + aLbl + '</th></tr>' +
// 				'<tr class="cb-thead-sub"><th>Opex</th><th>Capex</th><th>Total</th><th>Opex</th><th>Capex</th><th>Total</th></tr>' +
// 				'</thead><tbody>' + rows.map(rowHtmlA).join('') + '</tbody></table></div>';
// 		}
// 		function getSubNames(entries) {
// 			var seen = {}, names = [];
// 			entries.forEach(function (e) { (e.actuals || []).forEach(function (sec) { if (normN(sec.name).indexOf('OPERATING') === -1) { return; } (sec.sub_heads || []).forEach(function (sh) { var n = (sh.name || '').trim(); if (n && !seen[n]) { seen[n] = true; names.push(n); } }); }); });
// 			return names;
// 		}
// 		function shVal(actuals, name, field) { var v = 0; (actuals || []).forEach(function (sec) { if (normN(sec.name).indexOf('OPERATING') === -1) { return; } (sec.sub_heads || []).forEach(function (sh) { if ((sh.name || '').trim() === name) { v += parseFloat(field === 'plan' ? (sh.ytd || 0) : (sh.total_posted_amt_ytd || 0)); } }); }); return v; }
// 		function opT(a, f) { var v = 0; (a || []).forEach(function (s) { if (normN(s.name).indexOf('OPERATING') === -1) { return; } v += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }); return v; }
// 		function caT(a, f) { var v = 0; (a || []).forEach(function (s) { if (normN(s.name).indexOf('CAPITAL') === -1) { return; } v += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }); return v; }
// 		function tableHtmlB(entries, shNames, pLbl, aLbl, consolidatedVals) {
// 			var cc = 1 + shNames.length + 3;
// 			var hdr = '<tr class="cb-thead-main"><th rowspan="2" style="text-align:left !important;min-width:210px;">Unit / Function</th><th colspan="' + (shNames.length + 1) + '" style="text-align:center !important;">Operating Expenses</th><th rowspan="2" style="text-align:center !important;min-width:110px;">Capex</th><th rowspan="2" style="text-align:center !important;min-width:110px;">Total</th></tr>' +
// 				'<tr class="cb-thead-sub">' + shNames.map(function (n) { return '<th style="min-width:110px;">' + n + '</th>'; }).join('') + '<th style="min-width:110px;">Total</th></tr>';
// 			var body = '', gtP = {}, gtA = {};
// 			shNames.forEach(function (n) { gtP[n] = 0; gtA[n] = 0; });
// 			var gtOP = 0, gtOA = 0, gtCP = 0, gtCA = 0;
// 			entries.forEach(function (e) {
// 				var lbl = (e.label || '').trim(), act = e.actuals || [], sP = {}, sA = {};
// 				shNames.forEach(function (n) { sP[n] = shVal(act, n, 'plan'); sA[n] = shVal(act, n, 'act'); gtP[n] += sP[n]; gtA[n] += sA[n]; });
// 				var oP = opT(act, 'plan'), oA = opT(act, 'act'), cP = caT(act, 'plan'), cA = caT(act, 'act');
// 				gtOP += oP; gtOA += oA; gtCP += cP; gtCA += cA;
// 				body += '<tr class="sinr-unit-hdr"><td>' + lbl + '</td><td colspan="' + (shNames.length + 3) + '"></td></tr>';
// 				body += '<tr class="sinr-brkdwn-plan"><td style="padding-left:18px;color:#333;">- ' + pLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(sP[n]) + '</td>'; }).join('') + '<td>' + fmtCr(oP) + '</td><td>' + fmtCr(cP) + '</td><td>' + fmtCr(oP + cP) + '</td></tr>';
// 				body += '<tr class="sinr-brkdwn-act"><td style="padding-left:18px;color:#555;">- ' + aLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(sA[n]) + '</td>'; }).join('') + '<td>' + fmtCr(oA) + '</td><td>' + fmtCr(cA) + '</td><td>' + fmtCr(oA + cA) + '</td></tr>';
// 				body += '<tr class="sinr-spacer"><td colspan="' + cc + '"></td></tr>';
// 			});
// 			var finalOP = (consolidatedVals && consolidatedVals.opex_plan)  ? consolidatedVals.opex_plan  : gtOP;
// 			var finalOA = (consolidatedVals && consolidatedVals.opex_act)   ? consolidatedVals.opex_act   : gtOA;
// 			var finalCP = (consolidatedVals && consolidatedVals.capex_plan) ? consolidatedVals.capex_plan : gtCP;
// 			var finalCA = (consolidatedVals && consolidatedVals.capex_act)  ? consolidatedVals.capex_act  : gtCA;
// 			var finalTP = (consolidatedVals && consolidatedVals.total_plan) ? consolidatedVals.total_plan : (gtOP + gtCP);
// 			var finalTA = (consolidatedVals && consolidatedVals.total_act)  ? consolidatedVals.total_act  : (gtOA + gtCA);
// 			body += '<tr class="cb-row-grand"><td>Grand Total</td><td colspan="' + (shNames.length + 3) + '"></td></tr>';
// 			body += '<tr class="sinr-gt-plan"><td style="padding-left:18px;">- ' + pLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(gtP[n]) + '</td>'; }).join('') + '<td>' + fmtCr(finalOP) + '</td><td>' + fmtCr(finalCP) + '</td><td>' + fmtCr(finalTP) + '</td></tr>';
// 			body += '<tr class="sinr-gt-act"><td style="padding-left:18px;">- ' + aLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(gtA[n]) + '</td>'; }).join('') + '<td>' + fmtCr(finalOA) + '</td><td>' + fmtCr(finalCA) + '</td><td>' + fmtCr(finalTA) + '</td></tr>';
// 			return '<div class="cb-scroll-wrapper" style="margin-bottom:24px;"><table id="sinr-table-b" style="width:100%;border-collapse:collapse;"><thead>' + hdr + '</thead><tbody>' + body + '</tbody></table></div>';
// 		}
// 		// ── C. Operating Expenses detail: sub_heads as rows, units as cols ──────────
// 		// Columns: Expense Category | Unit1 Budget | Unit1 Actual | Unit2 Budget | Unit2 Actual | … | Total Budget | Total Actual
// 		function tableHtmlC(entries, pLbl, aLbl) {
// 			if (!entries || !entries.length) { return ''; }

// 			function isOpex(name) { return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('OPERATING') !== -1; }

// 			// Collect all unique sub_head names across all units
// 			var shNames = [], shSeen = {};
// 			entries.forEach(function (e) {
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isOpex(s.name)) { return; }
// 					(s.sub_heads || []).forEach(function (sh) {
// 						var n = (sh.name || '').trim();
// 						if (n && !shSeen[n]) { shSeen[n] = true; shNames.push(n); }
// 					});
// 				});
// 			});
// 			if (!shNames.length) { return ''; }

// 			function shPlan(e, shName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isOpex(s.name)) { return; }
// 					(s.sub_heads || []).forEach(function (sh) {
// 						if ((sh.name || '').trim() === shName) { v += parseFloat(sh.ytd || 0); }
// 					});
// 				});
// 				return v;
// 			}
// 			function shAct(e, shName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isOpex(s.name)) { return; }
// 					(s.sub_heads || []).forEach(function (sh) {
// 						if ((sh.name || '').trim() === shName) { v += parseFloat(sh.total_posted_amt_ytd || 0); }
// 					});
// 				});
// 				return v;
// 			}
// 			function opexTotal(e, field) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (isOpex(s.name)) { v += parseFloat(field === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }
// 				});
// 				return v;
// 			}

// 			var tblId = 'sinr-table-c';
// 			if (!$('#sinr-c-style').length) {
// 				$('head').append(
// 					'<style id="sinr-c-style">' +
// 					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
// 					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-xl);font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;position:sticky;top:0;z-index:25;text-align:center !important;padding:10px 12px;}' +
// 					'#' + tblId + ' thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-sb);border:1.5px solid var(--bdo) !important;position:sticky;z-index:24;text-align:center !important;min-width:120px;padding:8px 12px;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:55 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:220px;vertical-align:middle;}' +
// 					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:220px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;}' +
// 					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;}' +
// 					'#' + tblId + ' .sinr-c-gtcol{background:#ddeaf7 !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;}' +
// 					'#' + tblId + ' tr.cb-row-grand .sinr-c-gtcol{background:var(--blue-dark) !important;color:#fff !important;}' +
// 					'#' + tblId + ' tr.ppt-total-row .sinr-c-gtcol{background:#c8ddf0 !important;color:var(--blue-dark) !important;}' +
// 					'</style>'
// 				);
// 			}

// 			// Header row 1: "Expense Category" spans both header rows via rowspan="2"
// 			// Unit headers span 2 cols each; Grand Total spans 2 cols
// 			var hdr1 = '<tr class="cb-thead-main">' +
// 				'<th rowspan="2" style="min-width:220px;text-align:left !important;vertical-align:middle;position:sticky;left:0;z-index:55 !important;top:0;background:var(--blue-mid) !important;">Expense Category</th>';
// 			entries.forEach(function (e) {
// 				hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;">' + (e.label || '').trim() + '</th>';
// 			});
// 			hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;background:var(--blue-dark) !important;border:1.5px solid #001f3f !important;">Grand Total</th></tr>';

// 			// Header row 2: Budget/Actual sub-cols — NO first-col th (rowspan="2" above covers it)
// 			var hdr2 = '<tr class="cb-thead-sub">';
// 			entries.forEach(function () {
// 				hdr2 += '<th style="min-width:120px;text-align:center !important;">' + pLbl + '</th>' +
// 					    '<th style="min-width:120px;text-align:center !important;">' + aLbl + '</th>';
// 			});
// 			hdr2 += '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + pLbl + '</th>' +
// 				    '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + aLbl + '</th></tr>';

// 			// Body rows: one per sub_head name
// 			var bodyHtml = '';
// 			var gtBudget = 0, gtActual = 0;

// 			shNames.forEach(function (shName) {
// 				var rowBudget = 0, rowActual = 0, cells = '';
// 				entries.forEach(function (e) {
// 					var bp = shPlan(e, shName);
// 					var ba = shAct(e, shName);
// 					rowBudget += bp; rowActual += ba;
// 					cells += '<td>' + fmtCrDash(bp) + '</td><td>' + fmtCrDash(ba) + '</td>';
// 				});
// 				gtBudget += rowBudget; gtActual += rowActual;
// 				bodyHtml += '<tr><td>' + shName + '</td>' + cells +
// 					'<td class="sinr-c-gtcol" style="font-weight:700;">' + fmtCrDash(rowBudget) + '</td>' +
// 					'<td class="sinr-c-gtcol" style="font-weight:700;">' + fmtCrDash(rowActual) + '</td></tr>';
// 			});

// 			// Total row: full opex section total per unit
// 			var totalCells = '';
// 			var totalBudget = 0, totalActual = 0;
// 			entries.forEach(function (e) {
// 				var bp = opexTotal(e, 'plan');
// 				var ba = opexTotal(e, 'act');
// 				totalBudget += bp; totalActual += ba;
// 				totalCells += '<td style="font-weight:700;">' + fmtCrDash(bp) + '</td><td style="font-weight:700;">' + fmtCrDash(ba) + '</td>';
// 			});
// 			bodyHtml += '<tr class="ppt-total-row"><td>Total</td>' + totalCells +
// 				'<td class="sinr-c-gtcol" style="font-weight:700;">' + fmtCrDash(totalBudget) + '</td>' +
// 				'<td class="sinr-c-gtcol" style="font-weight:700;">' + fmtCrDash(totalActual) + '</td></tr>';

// 			return '<div class="sinr-section-label" style="margin-top:28px;">C. Operating Expenses</div>' +
// 				'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
// 					'<table id="' + tblId + '" class="cb-table">' +
// 						'<thead>' + hdr1 + hdr2 + '</thead>' +
// 						'<tbody>' + bodyHtml + '</tbody>' +
// 					'</table>' +
// 				'</div>';
// 		}

// 		// ── D. Capital Expenses detail: items as rows, units as cols ─────────────
// 		// Columns: Expense Category | Unit1 Budget | Unit1 Actual | Unit2 Budget | Unit2 Actual | … | Total Budget | Total Actual
// 		function tableHtmlD(entries, pLbl, aLbl) {
// 			if (!entries || !entries.length) { return ''; }

// 			function isCapex(name) { return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('CAPITAL') !== -1; }

// 			// Collect all unique item names from the capital section
// 			var itemNames = [], itemSeen = {};
// 			entries.forEach(function (e) {
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isCapex(s.name)) { return; }
// 					(s.items || []).forEach(function (item) {
// 						var n = (item.name || '').trim();
// 						if (n && !itemSeen[n]) { itemSeen[n] = true; itemNames.push(n); }
// 					});
// 				});
// 			});
// 			if (!itemNames.length) { return ''; }

// 			function itemPlan(e, itemName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isCapex(s.name)) { return; }
// 					(s.items || []).forEach(function (item) {
// 						if ((item.name || '').trim() === itemName) { v += parseFloat(item.ytd || 0); }
// 					});
// 				});
// 				return v;
// 			}
// 			function itemAct(e, itemName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isCapex(s.name)) { return; }
// 					(s.items || []).forEach(function (item) {
// 						if ((item.name || '').trim() === itemName) { v += parseFloat(item.total_posted_amt_ytd || 0); }
// 					});
// 				});
// 				return v;
// 			}
// 			function capexTotal(e, field) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (isCapex(s.name)) { v += parseFloat(field === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }
// 				});
// 				return v;
// 			}

// 			var tblId = 'sinr-table-d';
// 			if (!$('#sinr-d-style').length) {
// 				$('head').append(
// 					'<style id="sinr-d-style">' +
// 					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
// 					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-xl);font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;position:sticky;top:0;z-index:25;text-align:center !important;padding:10px 12px;}' +
// 					'#' + tblId + ' thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-sb);border:1.5px solid var(--bdo) !important;position:sticky;z-index:24;text-align:center !important;min-width:120px;padding:8px 12px;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:55 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:220px;vertical-align:middle;}' +
// 					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:220px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;}' +
// 					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;}' +
// 					'#' + tblId + ' .sinr-d-gtcol{background:#ddeaf7 !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;}' +
// 					'#' + tblId + ' tr.cb-row-grand .sinr-d-gtcol{background:var(--blue-dark) !important;color:#fff !important;}' +
// 					'#' + tblId + ' tr.ppt-total-row .sinr-d-gtcol{background:#c8ddf0 !important;color:var(--blue-dark) !important;}' +
// 					'</style>'
// 				);
// 			}

// 			// Header row 1: "Expense Category" spans both header rows via rowspan="2"
// 			var hdr1 = '<tr class="cb-thead-main">' +
// 				'<th rowspan="2" style="min-width:220px;text-align:left !important;vertical-align:middle;position:sticky;left:0;z-index:55 !important;top:0;background:var(--blue-mid) !important;">Expense Category</th>';
// 			entries.forEach(function (e) {
// 				hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;">' + (e.label || '').trim() + '</th>';
// 			});
// 			hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;background:var(--blue-dark) !important;border:1.5px solid #001f3f !important;">Grand Total</th></tr>';

// 			// Header row 2: Budget/Actual sub-cols — NO first-col th (rowspan="2" above covers it)
// 			var hdr2 = '<tr class="cb-thead-sub">';
// 			entries.forEach(function () {
// 				hdr2 += '<th style="min-width:120px;text-align:center !important;">' + pLbl + '</th>' +
// 					    '<th style="min-width:120px;text-align:center !important;">' + aLbl + '</th>';
// 			});
// 			hdr2 += '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + pLbl + '</th>' +
// 				    '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + aLbl + '</th></tr>';

// 			// Body rows: one per item name
// 			var bodyHtml = '';

// 			itemNames.forEach(function (itemName) {
// 				var rowBudget = 0, rowActual = 0, cells = '';
// 				entries.forEach(function (e) {
// 					var bp = itemPlan(e, itemName);
// 					var ba = itemAct(e, itemName);
// 					rowBudget += bp; rowActual += ba;
// 					cells += '<td>' + fmtCrDash(bp) + '</td><td>' + fmtCrDash(ba) + '</td>';
// 				});
// 				bodyHtml += '<tr><td>' + itemName + '</td>' + cells +
// 					'<td class="sinr-d-gtcol" style="font-weight:700;">' + fmtCrDash(rowBudget) + '</td>' +
// 					'<td class="sinr-d-gtcol" style="font-weight:700;">' + fmtCrDash(rowActual) + '</td></tr>';
// 			});

// 			// Total row: full capex section total per unit
// 			var totalCells = '';
// 			var totalBudget = 0, totalActual = 0;
// 			entries.forEach(function (e) {
// 				var bp = capexTotal(e, 'plan');
// 				var ba = capexTotal(e, 'act');
// 				totalBudget += bp; totalActual += ba;
// 				totalCells += '<td style="font-weight:700;">' + fmtCrDash(bp) + '</td><td style="font-weight:700;">' + fmtCrDash(ba) + '</td>';
// 			});
// 			bodyHtml += '<tr class="ppt-total-row"><td>Total</td>' + totalCells +
// 				'<td class="sinr-d-gtcol" style="font-weight:700;">' + fmtCrDash(totalBudget) + '</td>' +
// 				'<td class="sinr-d-gtcol" style="font-weight:700;">' + fmtCrDash(totalActual) + '</td></tr>';

// 			return '<div class="sinr-section-label" style="margin-top:28px;">D. Capital Expenses</div>' +
// 				'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
// 					'<table id="' + tblId + '" class="cb-table">' +
// 						'<thead>' + hdr1 + hdr2 + '</thead>' +
// 						'<tbody>' + bodyHtml + '</tbody>' +
// 					'</table>' +
// 				'</div>';
// 		}

// 		function load(fy) {
// 			var $tab = $('#tab-summary_inr');
// 			$tab.html('<div style="padding:20px;text-align:center;color:#aaa;">Loading\u2026</div>');
// 			Loader.show('Building Unit wise plan');
// 			var fp = (fy || '2025-26').split('-');
// 			var pLbl = fy + ' Budget', aLbl = (parseInt(fp[0], 10) - 1) + '-' + String(parseInt(fp[1], 10) - 1).padStart(2, '0') + ' Est';
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 				args: { financial_year: fy, month: 'March', table_name_filter: 'Unit Wise Plan' },
// 				callback: function (r) {
// 					Loader.hide();
// 					var d = Array.isArray(r.message) ? r.message : ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
// 					if (!d || !d.length) { $tab.html('<div style="padding:40px;text-align:center;color:#aaa;">No data available.</div>'); return; }
// 					Store.summaryInr = d;
// 					var eB = d.filter(function (e) { return e.is_this_sub_item === 0 && e.sequence_id !== 9999 && (e.table_name || '').toUpperCase() !== 'CONSOLIDATED'; }).sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// 					var ctVals = getConsolidatedTotals(d);
// 					$tab.html('<div style="padding:4px 0 10px;"><div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' + xlBtn('xl-summary-inr', 'Export to Excel') + '</div>' +
// 						'<div class="sinr-section-label">A. Unit Wise Plan</div>' + tableHtmlA(buildRowsA(d), pLbl, aLbl) +
// 						'<div class="sinr-section-label" style="margin-top:24px;">B. Breakdown of Unit Wise Plan</div>' +
// 						'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
// 						tableHtmlB(eB, getSubNames(eB), pLbl, aLbl, ctVals) +
// 						tableHtmlC(eB, pLbl, aLbl) +
// 						tableHtmlD(eB, pLbl, aLbl) +
// 						'</div>');
// 					fixStickySubHeader('#sinr-table-a');
// 					// Fix sticky top for sub-row in C and D (rowspan header — must set top after render)
// 					['#sinr-table-c','#sinr-table-d'].forEach(function(sel) {
// 						(function tryFix(n) {
// 							var $t = $(sel); if (!$t.length) { return; }
// 							var $m = $t.find('thead tr.cb-thead-main');
// 							var h = $m.length ? ($m[0].getBoundingClientRect().height || $m.outerHeight(true) || 0) : 0;
// 							if (h > 0) { $t.find('thead tr.cb-thead-sub th').css('top', h + 'px'); }
// 							else if (n < 12) { setTimeout(function() { tryFix(n+1); }, 60); }
// 						})(0);
// 					});
// 					(function retrySinrB(n) {
// 						var $b = $('#sinr-table-b'); if (!$b.length) { return; }
// 						var rows = $b.find('thead tr'), ok = true;
// 						rows.each(function () { if (!$(this).outerHeight(true)) { ok = false; } });
// 						if (!ok && n < 10) { setTimeout(function() { retrySinrB(n+1); }, 50); return; }
// 						var top = 0;
// 						rows.each(function () { $(this).find('th').css('top', top + 'px'); top += $(this).outerHeight(true) || 40; });
// 					})(0);

// 				},
// 				error: function () { Loader.hide(); $tab.html('<div style="padding:40px;text-align:center;color:red;">Error loading Summary in INR data.</div>'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// HEADCOUNT MODULE
// 	// =============================================================================

// 	var Headcount = (function () {
// 		function fmtHC(v) { if (v === null || v === undefined) { return '-'; } var n = parseFloat(v); return isNaN(n) ? '-' : Math.round(n).toLocaleString('en-IN'); }
// 		function fmtOpex(v) { if (v === null || v === undefined) { return '-'; } var n = parseFloat(v); return isNaN(n) ? '-' : fmtCr(n * 10000000); }
// 		function fmtPct(a, b) {
// 			a = parseFloat(a); b = parseFloat(b);
// 			if (!a || isNaN(a) || isNaN(b)) { return '-'; }
// 			return Math.round(((b / a) - 1) * 100) + '%';
// 		}
// 		function norm(s) { return (s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
// 		function hcSec(txt) { return '<div class="hc-section-title">' + txt + '</div>'; }
// 		function swrap(inner) { return '<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' + inner + '</div>'; }
// 		function buildOpexMap(pd) {
// 			var map = {};
// 			(pd || []).forEach(function (p) {
// 				var op = null; (p.actuals || []).forEach(function (a) { if ((a.name || '').trim() === 'OPERATING  EXPENSES') { op = a; } });
// 				map[norm(p.label || '')] = { est: op ? parseFloat(op.total_posted_amt_ytd || 0) / 10000000 : 0, plan: op ? parseFloat(op.ytd || 0) / 10000000 : 0 };
// 			});
// 			return map;
// 		}
// 		function transform(records) {
// 			var sorted = (records || []).slice().sort(function (a, b) { return (a.financial_year || '').localeCompare(b.financial_year || ''); });
// 			var yrs = sorted.map(function (r) { return r.financial_year || ''; });
// 			var um = {};
// 			sorted.forEach(function (rec) {
// 				(rec.units || []).forEach(function (u) {
// 					var id = String(u.unit || u.unit_id || '');
// 					if (!um[id]) { um[id] = { description: '', hc: {}, seq: parseInt(id, 10) || 0 }; }
// 					um[id].hc[rec.financial_year] = parseFloat(u.total_headcount) || 0;
// 					if (rec.financial_year === yrs[yrs.length - 1]) {
// 						um[id].description = (u.unit_description || u.description || '').trim();
// 					}
// 				});
// 			});
// 			var units = Object.keys(um)
// 				.sort(function (a, b) { return (um[a].seq || 0) - (um[b].seq || 0); })
// 				.map(function (id) { return um[id]; });
// 			var totals = {};
// 			sorted.forEach(function (r) {
// 				totals[r.financial_year] = parseFloat(r.total_head_count || r.total_headcount || 0);
// 			});
// 			return { yrs: yrs, units: units, totals: totals };
// 		}
// 		function avgHC(u, yrs, i) {
// 			if (i === 0) { var c = u.hc[yrs[0]]; return c !== undefined ? c / 2 : null; }
// 			var p = u.hc[yrs[i - 1]], c = u.hc[yrs[i]];
// 			return (p !== undefined && c !== undefined) ? (p + c) / 2 : null;
// 		}
// 		function avgTot(tot, yrs, i) {
// 			if (i === 0) { var c = tot[yrs[0]]; return c !== undefined ? c / 2 : null; }
// 			var p = tot[yrs[i - 1]], c = tot[yrs[i]];
// 			return (p !== undefined && c !== undefined) ? (p + c) / 2 : null;
// 		}
// 		function gtable(hdrs, rows) {
// 			return swrap('<table class="cb-table" style="width:100%;"><thead><tr class="cb-thead-main"><th style="text-align:left !important;min-width:220px;">Unit</th>' +
// 				hdrs.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + rows + '</tbody></table>');
// 		}
// 		function load(fy) {
// 			var $tab = $('#tab-headcount');
// 			$tab.html('<div style="padding:40px;text-align:center;color:#aaa;">Loading\u2026</div>');
// 			Loader.show('Generating workforce summary\u2026');
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_headcount',
// 				args: { financial_year: fy, month: 'March', table_name_filter: 'Unit Wise Plan' },
// 				callback: function (r) {
// 					Loader.hide();
// 					var msg = r.message || {}, records = msg.headcount_data || [], planData = msg.plan_data || [];
// 					if (!records.length) { $tab.html('<div style="padding:40px;text-align:center;color:#aaa;">No headcount data available.</div>'); return; }
// 					Store.headcount = records;
// 					var om = buildOpexMap(planData), t = transform(records);
// 					var yrs = t.yrs, units = t.units, totals = t.totals, i1 = yrs.length - 2, i2 = yrs.length - 1;
// 					var totEst = 0, totPlan = 0, sRows = '';
// 					units.forEach(function (u) { var a1 = avgHC(u, yrs, i1), a2 = avgHC(u, yrs, i2), o = om[norm(u.description)] || { est: 0, plan: 0 }; totEst += o.est; totPlan += o.plan; sRows += '<tr><td style="text-align:left;">' + u.description + '</td><td>' + fmtHC(a1) + '</td><td>' + fmtHC(a2) + '</td><td>' + fmtPct(a1, a2) + '</td><td>' + fmtOpex(o.est) + '</td><td>' + fmtOpex(o.plan) + '</td><td>' + fmtPct(o.est, o.plan) + '</td></tr>'; });
// 					var ta1 = avgTot(totals, yrs, i1), ta2 = avgTot(totals, yrs, i2);
// 					sRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td><td>' + fmtHC(ta1) + '</td><td>' + fmtHC(ta2) + '</td><td>' + fmtPct(ta1, ta2) + '</td><td>' + fmtOpex(totEst) + '</td><td>' + fmtOpex(totPlan) + '</td><td>' + fmtPct(totEst, totPlan) + '</td></tr>';
// 					var sumHtml = swrap('<table class="cb-table" style="width:100%;"><thead><tr class="cb-thead-main"><th rowspan="2" style="text-align:left !important;min-width:200px;">Unit</th><th colspan="3" style="text-align:center !important;">Average H/C</th><th colspan="3" style="text-align:center !important;">Opex Spend (&#8377; Cr.)</th></tr><tr class="cb-thead-sub"><th>' + (yrs[i1] || '') + '</th><th>' + (yrs[i2] || '') + '</th><th>%</th><th>' + (yrs[i1] || '') + ' Est</th><th>' + (yrs[i2] || '') + ' Plan</th><th>%</th></tr></thead><tbody>' + sRows + '</tbody></table>');
// 					var cRows = '', aRows = '';
// 					units.forEach(function (u) { cRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.map(function (y) { return '<td>' + fmtHC(u.hc[y] !== undefined ? u.hc[y] : null) + '</td>'; }).join('') + '</tr>'; });
// 					cRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + yrs.map(function (y) { return '<td>' + fmtHC(totals[y] || 0) + '</td>'; }).join('') + '</tr>';
// 					units.forEach(function (u) { aRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.map(function (y, i) { return '<td>' + fmtHC(avgHC(u, yrs, i)) + '</td>'; }).join('') + '</tr>'; });
// 					aRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + yrs.map(function (y, i) { return '<td>' + fmtHC(avgTot(totals, yrs, i)) + '</td>'; }).join('') + '</tr>';
// 					var pHdrs = [], cpRows = '', apRows = '';
// 					if (yrs.length >= 2) {
// 						pHdrs = yrs.slice(1).map(function (y, i) { return yrs[i] + ' &#8594; ' + y; });
// 						units.forEach(function (u) { cpRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.slice(1).map(function (y, i) { return '<td>' + fmtPct(u.hc[yrs[i]], u.hc[y]) + '</td>'; }).join('') + '</tr>'; apRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.slice(1).map(function (y, i) { return '<td>' + fmtPct(avgHC(u, yrs, i), avgHC(u, yrs, i + 1)) + '</td>'; }).join('') + '</tr>'; });
// 						cpRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + yrs.slice(1).map(function (y, i) { return '<td>' + fmtPct(totals[yrs[i]], totals[y]) + '</td>'; }).join('') + '</tr>';
// 						var tpc = ''; for (var ii = 1; ii < yrs.length; ii++) { tpc += '<td>' + fmtPct(avgTot(totals, yrs, ii - 1), avgTot(totals, yrs, ii)) + '</td>'; }
// 						apRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + tpc + '</tr>';
// 					}
// 					$tab.html('<div style="padding:4px 0 10px;"><div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' + xlBtn('xl-headcount', 'Export to Excel') + '</div>' +
// 						hcSec('Headcount Summary') + '<div class="ppt-currency-label" style="text-align:left;margin-bottom:6px;">H/C numbers &nbsp;|&nbsp; Opex in &#8377; <strong>Cr.</strong></div>' + sumHtml +
// 						hcSec('Closing H/C') + gtable(yrs, cRows) + hcSec('Average H/C') + gtable(yrs, aRows) +
// 						(yrs.length >= 2 ? hcSec('Increase in Closing H/C (%)') + gtable(pHdrs, cpRows) : '') +
// 						(yrs.length >= 2 ? hcSec('Increase in Average H/C (%)') + gtable(pHdrs, apRows) : '') + '</div>');
// 					$tab.find('.cb-table').each(function () { fixStickySubHeader(this); });
// 				},
// 				error: function () { Loader.hide(); $tab.html('<div style="padding:40px;text-align:center;color:red;">Error loading headcount data.</div>'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ANNUAL BUDGET MODULE
// 	// =============================================================================

// 	var Annual = (function () {
// 		var Q_DEFS = { q1: { label: 'Quarter 1', months: ['April', 'May', 'June'] }, q2: { label: 'Quarter 2', months: ['July', 'August', 'September'] }, q3: { label: 'Quarter 3', months: ['October', 'November', 'December'] }, q4: { label: 'Quarter 4', months: ['January', 'February', 'March'] } };
// 		var Q_KEYS = ['q1', 'q2', 'q3', 'q4'];
// 		var data = [], expandedQ = [], openH = {}, openS = {}, bound = false;
// 		function sumArr(a) { var t = 0; (a || []).forEach(function (v) { t += (v || 0); }); return t; }
// 		function objTotal(o) { var t = 0; Q_KEYS.forEach(function (k) { t += sumArr(o[k]); }); return t; }
// 		function qCells(obj) {
// 			var html = '';
// 			Q_KEYS.forEach(function (k) {
// 				var vals = obj[k] || [0, 0, 0];
// 				if (expandedQ.indexOf(k) !== -1) { vals.forEach(function (v) { html += '<td>' + formatINR(v) + '</td>'; }); }
// 				else { html += '<td colspan="3">' + formatINR(sumArr(vals)) + '</td>'; }
// 			});
// 			return html;
// 		}
// 		function buildHeader() {
// 			var $t = $('#annual-table thead').empty(), $m = $('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense Head / Line Item</th>');
// 			Q_KEYS.forEach(function (k) { var o = expandedQ.indexOf(k) !== -1; $m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o ? 1 : 2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o ? '\u25b2' : '\u25bc') + '</th>'); });
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>'); $t.append($m);
// 			if (expandedQ.length) { var $s = $('<tr class="cb-thead-sub"></tr>'); Q_KEYS.forEach(function (k) { if (expandedQ.indexOf(k) !== -1) { Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); }); } }); $t.append($s); }
// 			fixStickySubHeader('#annual-table');
// 		}
// 		function renderTable() {
// 			buildHeader();
// 			var $tb = $('#annual-table tbody').empty(), term = $('#annual-search').val().trim().toLowerCase();
// 			var grand = { q1: [0, 0, 0], q2: [0, 0, 0], q3: [0, 0, 0], q4: [0, 0, 0] };
// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				var hs = String(hi), ho = openH[hs] === true;
// 				Q_KEYS.forEach(function (k) { (head[k] || [0, 0, 0]).forEach(function (v, mi) { grand[k][mi] += (v || 0); }); });
// 				$tb.append('<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho ? '\u25bc' : '\u25b6') + '</span> ' + head.name.trim() + '</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td></tr>');
// 				(head.sub_heads || []).forEach(function (sub, si) {
// 					var sk = hs + '-' + si, so = openS[sk] === true;
// 					$tb.append('<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:22px;"><span class="cb-arrow">' + (so ? '\u25bc' : '\u25b6') + '</span> ' + sub.name + '</td>' + qCells(sub) + '<td>' + formatINR(objTotal(sub)) + '</td></tr>');
// 					(sub.items || []).forEach(function (item) { $tb.append('<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho && so) ? '' : 'display:none;') + '"><td style="padding-left:42px;">' + item.name + '</td>' + qCells(item) + '<td>' + formatINR(objTotal(item)) + '</td></tr>'); });
// 				});
// 				(head.items || []).forEach(function (d) { $tb.append('<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:35px;">' + d.name + '</td>' + qCells(d) + '<td>' + formatINR(objTotal(d)) + '</td></tr>'); });
// 			});
// 			var gt = 0; Q_KEYS.forEach(function (k) { gt += sumArr(grand[k]); });
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 			fixStickySubHeader('#annual-table');
// 		}
// 		function toggleHead(hs) { openH[hs] = !(openH[hs] === true); if (!openH[hs]) { data.forEach(function (h, hi) { if (String(hi) !== hs) { return; } (h.sub_heads || []).forEach(function (_, si) { openS[hs + '-' + si] = false; }); }); } renderTable(); }
// 		function toggleSub(hs, ss) { openS[hs + '-' + ss] = !(openS[hs + '-' + ss] === true); renderTable(); }
// 		function matchSearch(head, term) {
// 			if (!term) { return true; }
// 			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
// 			for (var s = 0; s < (head.sub_heads || []).length; s++) { if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; } for (var i = 0; i < (head.sub_heads[s].items || []).length; i++) { if ((head.sub_heads[s].items[i].name || '').toLowerCase().indexOf(term) !== -1) { return true; } } }
// 			for (var d = 0; d < (head.items || []).length; d++) { if ((head.items[d].name || '').toLowerCase().indexOf(term) !== -1) { return true; } }
// 			return false;
// 		}
// 		function bindEvents() {
// 			$(document).on('input.annual', '#annual-search', function () { renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-quarters', function () { expandedQ = this.checked ? Q_KEYS.slice() : []; renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-items', function () { if (this.checked) { data.forEach(function (h, hi) { openH[String(hi)] = true; (h.sub_heads || []).forEach(function (_, si) { openS[hi + '-' + si] = true; }); }); } else { openH = {}; openS = {}; } renderTable(); });
// 			$(document).on('click.annual', '#annual-table .cb-q-header', function () { var k = String($(this).attr('data-quarter')), idx = expandedQ.indexOf(k); if (idx !== -1) { expandedQ.splice(idx, 1); } else { expandedQ.push(k); } $('#annual-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length); renderTable(); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 		}
// 		function load(fy) {
// 			if (!bound) { bindEvents(); bound = true; }
// 			data = []; openH = {}; openS = {}; expandedQ = [];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			$('#annual-search').val('');
// 			Loader.show('Building Annual Budget\u2026');
// 			frappe.call({
// 				method: 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args: { financial_year: fy },
// 				callback: function (r) { data = r.message || []; Store.annual = data; renderTable(); Loader.hide(); },
// 				error: function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE
// 	// =============================================================================

// 	var Estimate = (function () {
// 		var Q_DEFS = { q1: { label: 'Quarter 1', months: ['April', 'May', 'June'] }, q2: { label: 'Quarter 2', months: ['July', 'August', 'September'] }, q3: { label: 'Quarter 3', months: ['October', 'November', 'December'] }, q4: { label: 'Quarter 4', months: ['January', 'February', 'March'] } };
// 		var Q_KEYS = ['q1', 'q2', 'q3', 'q4'], Q_IDX = { q1: [0, 1, 2], q2: [3, 4, 5], q3: [6, 7, 8], q4: [9, 10, 11] };
// 		var data = [], expandedQ = [], openH = {}, openS = {}, bound = false;
// 		function getMth(obj) { var m = obj.months || {}; return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)]; }
// 		function qTot(obj) { return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)]; }
// 		function yTot(obj) { var q = qTot(obj); return q[0]+q[1]+q[2]+q[3]; }
// 		function qCells(obj) { var mths = getMth(obj), qtots = qTot(obj), html = ''; Q_KEYS.forEach(function (q, qi) { if (expandedQ.indexOf(q) !== -1) { Q_IDX[q].forEach(function (mi) { html += '<td>' + formatINR(mths[mi]) + '</td>'; }); } else { html += '<td colspan="3">' + formatINR(qtots[qi]) + '</td>'; } }); return html; }
// 		function buildHeader() {
// 			var $t = $('#estimate-table thead').empty(), $m = $('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense</th>');
// 			Q_KEYS.forEach(function (k) { var o = expandedQ.indexOf(k) !== -1; $m.append('<th class="est-q-toggle" data-q="' + k + '" colspan="3" rowspan="' + (o ? 1 : 2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o ? '\u25b2' : '\u25bc') + '</th>'); });
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>'); $t.append($m);
// 			if (expandedQ.length) { var $s = $('<tr class="cb-thead-sub"></tr>'); Q_KEYS.forEach(function (k) { if (expandedQ.indexOf(k) !== -1) { Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); }); } }); $t.append($s); }
// 			fixStickySubHeader('#estimate-table');
// 		}
// 		function renderTable() {
// 			buildHeader();
// 			var $tb = $('#estimate-tbody').empty(), term = $('#estimate-search').val().trim().toLowerCase();
// 			if (!Array.isArray(data) || !data.length) { $tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>'); return; }
// 			var gM = [0,0,0,0,0,0,0,0,0,0,0,0], gQ = [0,0,0,0];
// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				getMth(head).forEach(function (v, i) { gM[i] += v; }); qTot(head).forEach(function (v, i) { gQ[i] += v; });
// 				var hs = String(hi), ho = openH[hs];
// 				$tb.append('<tr class="cb-row-head cb-est-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho ? '\u25bc' : '\u25b6') + '</span> ' + head.name + '</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(yTot(head)) + '</td></tr>');
// 				(head.items || []).forEach(function (item) { $tb.append('<tr class="cb-est-head-item" data-hi="' + hs + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:28px;">' + item.name + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>'); });
// 				(head.sub_heads || []).forEach(function (sub, si) {
// 					var sk = hs + '-' + si, so = openS[sk];
// 					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:20px;"><span class="cb-arrow">' + (so ? '\u25bc' : '\u25b6') + '</span> ' + sub.name + '</td>' + qCells(sub) + '<td>' + formatINR(yTot(sub)) + '</td></tr>');
// 					(sub.items || []).forEach(function (item) { $tb.append('<tr class="cb-est-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho && so) ? '' : 'display:none;') + '"><td style="padding-left:44px;">' + item.name + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>'); });
// 				});
// 			});
// 			var gO = { Q1: gQ[0], Q2: gQ[1], Q3: gQ[2], Q4: gQ[3], months: { '4': gM[0], '5': gM[1], '6': gM[2], '7': gM[3], '8': gM[4], '9': gM[5], '10': gM[6], '11': gM[7], '12': gM[8], '1': gM[9], '2': gM[10], '3': gM[11] } };
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(gO) + '<td>' + formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3]) + '</td></tr>');
// 			fixStickySubHeader('#estimate-table');
// 		}
// 		function toggleHead(hs) { var o = !openH[hs]; openH[hs] = o; $('#estimate-table tbody .cb-est-head[data-hi="' + hs + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); if (o) { $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').show(); $('#estimate-table tbody .cb-est-head-item[data-hi="' + hs + '"]').show(); $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () { var si = $(this).attr('data-si'); if (openS[hs + '-' + si]) { $('#estimate-table tbody .cb-est-sub-item[data-hi="' + hs + '"][data-si="' + si + '"]').show(); } }); } else { $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () { var si = $(this).attr('data-si'); openS[hs + '-' + si] = false; $(this).find('.cb-arrow').text('\u25b6'); }); $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"],.cb-est-sub-item[data-hi="' + hs + '"],.cb-est-head-item[data-hi="' + hs + '"]').hide(); } }
// 		function toggleSub(hs, ss) { var sk = hs + '-' + ss, o = !openS[sk]; openS[sk] = o; $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"][data-si="' + ss + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); var $i = $('#estimate-table tbody .cb-est-sub-item[data-hi="' + hs + '"][data-si="' + ss + '"]'); o ? $i.show() : $i.hide(); }
// 		function matchSearch(head, term) { if (!term) { return true; } if (head.name.toLowerCase().indexOf(term) !== -1) { return true; } for (var s = 0; s < (head.sub_heads || []).length; s++) { if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; } for (var i = 0; i < (head.sub_heads[s].items || []).length; i++) { if ((head.sub_heads[s].items[i].name || '').toLowerCase().indexOf(term) !== -1) { return true; } } } for (var d = 0; d < (head.items || []).length; d++) { if ((head.items[d].name || '').toLowerCase().indexOf(term) !== -1) { return true; } } return false; }
// 		function bindEvents() {
// 			$(document).on('click.estimate', '#estimate-table .est-q-toggle', function () { var k = String($(this).attr('data-q')), idx = expandedQ.indexOf(k); if (idx !== -1) { expandedQ.splice(idx, 1); } else { expandedQ.push(k); } $('#estimate-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length); renderTable(); });
// 			$(document).on('change.estimate', '#estimate-expand-quarters', function () { expandedQ = this.checked ? Q_KEYS.slice() : []; renderTable(); });
// 			$(document).on('change.estimate', '#estimate-expand-items', function () { if (this.checked) { data.forEach(function (h, hi) { openH[String(hi)] = true; (h.sub_heads || []).forEach(function (_, si) { openS[hi + '-' + si] = true; }); }); } else { openH = {}; openS = {}; } renderTable(); });
// 			$('#tab-estimate').on('click.estimate', '.cb-est-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-estimate').on('click.estimate', '.cb-est-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 			$(document).on('input.estimate', '#estimate-search', function () { renderTable(); });
// 		}
// 		function load(fy) {
// 			if (!bound) { bindEvents(); bound = true; }
// 			data = []; openH = {}; openS = {}; expandedQ = [];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked', false);
// 			Loader.show('Building Estimate\u2026');
// 			var year = (getPrevFY(fy) || '2025-26').split('-')[0];
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
// 				args: { fiscal_year: year, accounting_period: '12' },
// 				callback: function (r) {
// 					if (r.message) { if (r.message.status === 'success') { data = r.message.data || []; } else if (Array.isArray(r.message)) { data = r.message; } else if (r.message.data && Array.isArray(r.message.data)) { data = r.message.data; } else { frappe.msgprint('Failed to load Estimate data.'); } } else { frappe.msgprint('Failed to load Estimate data.'); }
// 					Store.estimate = data; renderTable(); Loader.hide();
// 				},
// 				error: function () { Loader.hide(); frappe.msgprint('Server error loading Estimate data.'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// BUDGET & ESTIMATE MODULE
// 	// =============================================================================

// 	var BudgetEstimate = (function () {
// 		var rawData = [], currentFY = '', openSec = {}, openSub = {}, expandItems = false, bound = false;
// 		function pl() { return getFYLabels(currentFY).plan; }
// 		function el() { return getFYLabels(currentFY).est; }
// 		function isGT(sec) { return sec.sequence_id === 9999 || (sec.name || '').toUpperCase().replace(/\s+/g, ' ').trim() === 'GRAND TOTAL'; }
// 		function secVal(e, sn, f) { var v = 0; (e.actuals || []).forEach(function (s) { if (isGT(s) || s.name !== sn) { return; } v += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }); return v; }
// 		function subVal(e, sn, subn, f) { var v = 0; (e.actuals || []).forEach(function (s) { if (isGT(s) || s.name !== sn) { return; } (s.sub_heads || []).forEach(function (sub) { if (sub.name !== subn) { return; } v += parseFloat(f === 'plan' ? (sub.ytd || 0) : (sub.total_posted_amt_ytd || 0)); }); }); return v; }
// 		function itemVal(e, nm, f) { var v = 0; (e.actuals || []).forEach(function (s) { if (isGT(s)) { return; } (s.items || []).forEach(function (i) { if (i.name === nm) { v += parseFloat(f === 'plan' ? (i.ytd || 0) : (i.total_posted_amt || 0)); } }); (s.sub_heads || []).forEach(function (sub) { (sub.items || []).forEach(function (i) { if (i.name === nm) { v += parseFloat(f === 'plan' ? (i.ytd || 0) : (i.total_posted_amt || 0)); } }); }); }); return v; }
// 		function grandVal(e, f) {
// 			var gt = 0, found = false;
// 			(e.actuals || []).forEach(function (s) {
// 				if (isGT(s)) { gt += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); found = true; }
// 			});
// 			if (!found) {
// 				(e.actuals || []).forEach(function (s) { gt += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); });
// 			}
// 			return gt;
// 		}
// 		function secTP(sn) { var v = 0; rawData.forEach(function (e) { v += secVal(e, sn, 'plan'); }); return v; }
// 		function secTE(sn) { var v = 0; rawData.forEach(function (e) { v += secVal(e, sn, 'est'); }); return v; }
// 		function subTP(sn, subn) { var v = 0; rawData.forEach(function (e) { v += subVal(e, sn, subn, 'plan'); }); return v; }
// 		function subTE(sn, subn) { var v = 0; rawData.forEach(function (e) { v += subVal(e, sn, subn, 'est'); }); return v; }
// 		function iTotP(n) { var v = 0; rawData.forEach(function (e) { v += itemVal(e, n, 'plan'); }); return v; }
// 		function iTotE(n) { var v = 0; rawData.forEach(function (e) { v += itemVal(e, n, 'est'); }); return v; }
// 		function allGP() { var v = 0; rawData.forEach(function (e) { v += grandVal(e, 'plan'); }); return v; }
// 		function allGE() { var v = 0; rawData.forEach(function (e) { v += grandVal(e, 'est'); }); return v; }
// 		function cellsPair(getP, getE) { var h = ''; rawData.forEach(function (e) { h += '<td>' + formatINR(getP(e)) + '</td><td>' + formatINR(getE(e)) + '</td>'; }); return h; }
// 		function tc2(plan, est, cls) { cls = cls || ''; return '<td class="be-total-plan ' + cls + '" style="font-weight:700;">' + formatINR(plan) + '</td><td class="be-total-est ' + cls + '" style="font-weight:700;">' + formatINR(est) + '</td>'; }
// 		function buildStruct() { if (!rawData.length) { return []; } return (rawData[0].actuals || []).filter(function (s) { return !isGT(s); }).map(function (s) { return { name: s.name, sub_heads: (s.sub_heads || []).map(function (sub) { return { name: sub.name, items: (sub.items || []).map(function (i) { return { name: i.name }; }) }; }), items: (s.items || []).map(function (i) { return { name: i.name }; }) }; }); }
// 		function buildHeader() {
// 			var $t = $('#be-table thead').empty(), $r1 = $('<tr class="cb-thead-main"></tr>'), $r2 = $('<tr class="cb-thead-sub"></tr>');
// 			$r1.append('<th rowspan="2" style="text-align:left !important;min-width:280px;position:sticky;left:0;z-index:50;background:#0076B6;vertical-align:middle;">Expense Head / Line Item</th>');
// 			rawData.forEach(function (e) { $r1.append('<th colspan="2" style="text-align:center;min-width:260px;">' + (e.label || '').trim() + '</th>'); });
// 			$r1.append('<th colspan="2" style="text-align:center;min-width:260px;background:#003B63;">Grand Total</th>');
// 			rawData.forEach(function () { $r2.append('<th style="text-align:center;min-width:130px;">' + pl() + '</th><th style="text-align:center;min-width:130px;">' + el() + '</th>'); });
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">' + pl() + '</th><th style="text-align:center;min-width:130px;background:#004F8B;">' + el() + '</th>');
// 			$t.append($r1).append($r2); fixStickySubHeader('#be-table');
// 		}
// 		function renderTable() {
// 			buildHeader();
// 			var $tb = $('#be-tbody').empty(), term = $('#be-search').val().trim().toLowerCase(), struct = buildStruct();
// 			if (!rawData.length || !struct.length) { $tb.append('<tr><td colspan="' + (1 + rawData.length * 2 + 2) + '" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>'); return; }
// 			struct.forEach(function (sec) {
// 				var sn = sec.name;
// 				var secOpen = openSec[sn] === true;
// 				var secVis = secOpen ? '' : 'display:none;';
// 				$tb.append('<tr class="cb-row-head be-sec-row" data-sec="' + sn + '"><td style="text-align:left;"><span class="cb-arrow">' + (secOpen ? '\u25bc' : '\u25b6') + '</span> ' + sn + '</td>' +
// 					cellsPair(function (e) { return secVal(e, sn, 'plan'); }, function (e) { return secVal(e, sn, 'est'); }) +
// 					tc2(secTP(sn), secTE(sn), 'be-grand-col') + '</tr>');
// 				sec.sub_heads.forEach(function (sub) {
// 					var sk = sn + '::' + sub.name, subOpen = expandItems || (openSub[sk] === true), itmVis = (secOpen && subOpen) ? '' : 'display:none;';
// 					$tb.append('<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="' + sn + '" data-sub="' + sk + '" style="' + secVis + '"><td style="padding-left:22px;text-align:left;"><span class="cb-arrow">' + (subOpen ? '\u25bc' : '\u25b6') + '</span> ' + sub.name + '</td>' +
// 						cellsPair(function (e) { return subVal(e, sn, sub.name, 'plan'); }, function (e) { return subVal(e, sn, sub.name, 'est'); }) +
// 						tc2(subTP(sn, sub.name), subTE(sn, sub.name), 'be-grand-col') + '</tr>');
// 					sub.items.forEach(function (item) {
// 						if (term && item.name.toLowerCase().indexOf(term) === -1) { return; }
// 						$tb.append('<tr class="be-item-row be-sec-child be-sub-child" data-sec="' + sn + '" data-sub="' + sk + '" style="' + itmVis + '"><td style="padding-left:42px;text-align:left;">' + item.name + '</td>' +
// 							cellsPair(function (e) { return itemVal(e, item.name, 'plan'); }, function (e) { return itemVal(e, item.name, 'est'); }) +
// 							tc2(iTotP(item.name), iTotE(item.name), 'be-grand-col') + '</tr>');
// 					});
// 				});
// 				sec.items.forEach(function (item) {
// 					if (term && item.name.toLowerCase().indexOf(term) === -1) { return; }
// 					$tb.append('<tr class="be-item-row be-sec-child be-direct-item" data-sec="' + sn + '" style="' + secVis + '"><td style="padding-left:30px;text-align:left;">' + item.name + '</td>' +
// 						cellsPair(function (e) { return itemVal(e, item.name, 'plan'); }, function (e) { return itemVal(e, item.name, 'est'); }) +
// 						tc2(iTotP(item.name), iTotE(item.name), 'be-grand-col') + '</tr>');
// 				});
// 			});
// 			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>' + cellsPair(function (e) { return grandVal(e, 'plan'); }, function (e) { return grandVal(e, 'est'); }) + tc2(allGP(), allGE(), 'be-grand-col') + '</tr>');
// 			fixStickySubHeader('#be-table');
// 		}
// 		function toggleSec(sn) { var o = !(openSec[sn] === true); openSec[sn] = o; $('#be-table tbody .be-sec-row[data-sec="' + sn + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); var $ch = $('#be-table tbody .be-sec-child[data-sec="' + sn + '"]'); if (o) { $ch.filter('.be-sub-row,.be-direct-item').show(); $ch.filter('.be-sub-child').each(function () { if (expandItems || openSub[$(this).attr('data-sub')] === true) { $(this).show(); } }); } else { $ch.hide(); } }
// 		function toggleSubRow(sk) { var o = !(openSub[sk] === true); openSub[sk] = o; $('#be-table tbody .be-sub-row[data-sub="' + sk + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); var $it = $('#be-table tbody .be-sub-child[data-sub="' + sk + '"]'); o ? $it.show() : $it.hide(); }
// 		function bindEvents() {
// 			$('#tab-budget_estimate').on('click.be', '.be-sec-row', function (e) { e.stopPropagation(); toggleSec($(this).attr('data-sec')); });
// 			$('#tab-budget_estimate').on('click.be', '.be-sub-row', function (e) { e.stopPropagation(); if (!expandItems) { toggleSubRow($(this).attr('data-sub')); } });
// 			$(document).on('change.be', '#be-expand-items', function () { expandItems = this.checked; buildStruct().forEach(function (sec) { openSec[sec.name] = expandItems; sec.sub_heads.forEach(function (sub) { openSub[sec.name + '::' + sub.name] = expandItems; }); }); renderTable(); });
// 			$(document).on('input.be', '#be-search', function () { renderTable(); });
// 		}
// 		function load(fy) {
// 			if (!bound) { bindEvents(); bound = true; }
// 			currentFY = fy; rawData = []; openSec = {}; openSub = {}; expandItems = false;
// 			$('#be-expand-items').prop('checked', false);
// 			Loader.show('Building Budget & Estimate\u2026');
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 				args: { financial_year: fy, month: 'March', table_name_filter: 'Budget & Estimate' },
// 				callback: function (r) {
// 					Loader.hide();
// 					var d = Array.isArray(r.message) ? r.message : ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
// 					if (!d || !d.length) { frappe.msgprint('No data returned for Budget & Estimate.'); renderTable(); return; }
// 					rawData = d.filter(function (e) {
// 						return e.is_this_sub_item === 0
// 							&& e.sequence_id !== 9999
// 							&& (e.table_name || '').toUpperCase() !== 'CONSOLIDATED';
// 					}).sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// 					Store.budgetEstimate = rawData; renderTable();
// 				},
// 				error: function () { Loader.hide(); frappe.msgprint('Server error loading Budget & Estimate data.'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// EXPORT WIRING
// 	// =============================================================================

// 	var API = 'annual_budget.api.export_reports';
// 	$(document).on('click', '#xl-ppt', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.ppt.rows.length) { frappe.msgprint('Please wait for the Foundation Metrics data to load first.'); return; } serverExport(API + '.export_ppt', { financial_year: fy, ppt_rows: JSON.stringify(Store.ppt.rows), prev_ppt_rows: JSON.stringify(Store.ppt.prevRows), budget_label: Store.ppt.budgetLabel, est_label: Store.ppt.estLabel, prev_budget_label: Store.ppt.prevBudgetLabel, prev_est_label: Store.ppt.prevEstLabel }, 'Building Foundation Metrics Excel\u2026'); });
// 	$(document).on('click', '#xl-summary-inr', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.summaryInr.length) { frappe.msgprint('Please wait for the Summary in INR data to load first.'); return; } serverExport(API + '.export_summary_inr', { financial_year: fy, summary_data: JSON.stringify(Store.summaryInr) }, 'Building Summary in INR Excel\u2026'); });
// 	$(document).on('click', '#xl-headcount', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.headcount.length) { frappe.msgprint('Please wait for the Headcount data to load first.'); return; } serverExport(API + '.export_headcount', { financial_year: fy, headcount_data: JSON.stringify(Store.headcount) }, 'Building Headcount Excel\u2026'); });
// 	$(document).on('click', '#xl-annual', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.annual.length) { frappe.msgprint('Please open the Annual Budget tab first.'); return; } serverExport(API + '.export_annual', { financial_year: fy, annual_data: JSON.stringify(Store.annual) }, 'Building Annual Budget Excel\u2026'); });
// 	$(document).on('click', '#xl-estimate', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.estimate.length) { frappe.msgprint('Please open the Estimate tab first.'); return; } serverExport(API + '.export_estimate', { financial_year: fy, estimate_data: JSON.stringify(Store.estimate) }, 'Building Estimate Excel\u2026'); });
// 	$(document).on('click', '#xl-be', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.budgetEstimate.length) { frappe.msgprint('Please open the Budget & Estimate tab first.'); return; } serverExport(API + '.export_budget_estimate', { financial_year: fy, be_data: JSON.stringify(Store.budgetEstimate) }, 'Building Budget & Estimate Excel\u2026'); });
// 	$(document).on('click', '#xl-export-all', function () {
// 		var fy = fyControl.get_value() || '2025-26', missing = [];
// 		if (!Store.ppt.rows.length)      { missing.push('Foundation Metrics (tab 1)'); }
// 		if (!Store.summaryInr.length)     { missing.push('Summary in INR (tab 2)'); }
// 		if (!Store.headcount.length)      { missing.push('Headcount (tab 3)'); }
// 		if (!Store.annual.length)         { missing.push('Annual Budget (tab 4)'); }
// 		if (!Store.estimate.length)       { missing.push('Estimate (tab 5)'); }
// 		if (!Store.budgetEstimate.length) { missing.push('Budget & Estimate (tab 6)'); }
// 		if (missing.length) { frappe.msgprint('Please open each tab first.<br><br>Still loading: <b>' + missing.join(', ') + '</b>'); return; }
// 		serverExport(API + '.export_all', { financial_year: fy, ppt_rows: JSON.stringify(Store.ppt.rows), prev_ppt_rows: JSON.stringify(Store.ppt.prevRows), budget_label: Store.ppt.budgetLabel, est_label: Store.ppt.estLabel, prev_budget_label: Store.ppt.prevBudgetLabel, prev_est_label: Store.ppt.prevEstLabel, summary_data: JSON.stringify(Store.summaryInr), headcount_data: JSON.stringify(Store.headcount), annual_data: JSON.stringify(Store.annual), estimate_data: JSON.stringify(Store.estimate), be_data: JSON.stringify(Store.budgetEstimate) }, 'Building full consolidated Excel\u2026');
// 	});

// 	// =============================================================================
// 	// AUTO-LOAD
// 	// =============================================================================

// 	if (fyControl.get_value()) { TabLoader.trigger('ppt'); }

// };





















//  ok one 


// frappe.pages['consolidated-budget'].on_page_load = function (wrapper) {

// 	// =============================================================================
// 	// PAGE SETUP
// 	// =============================================================================

// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper, title: 'Foundation - Consolidated Budget', single_column: true
// 	});

// 	setTimeout(function () {
// 		$(wrapper).find('#xl-export-all').remove();
// 		var $btn = $(
// 			'<button class="btn btn-default btn-sm" id="xl-export-all" style="display:inline-flex;align-items:center;gap:5px;margin-left:8px;background:#1a1a1a;color:#fff;border-color:#1a1a1a;">' +
// 			svgIcon() + 'Export All</button>'
// 		);
// 		var $pa = $(wrapper).find('.page-actions');
// 		if ($pa.length) { $pa.prepend($btn); }
// 	}, 300);

// 	function updatePageTitle(fy) {
// 		page.set_title('Foundation - Consolidated Budget - ' + fy);
// 		setTimeout(function () {
// 			$(wrapper).find('.page-head h3').hide();
// 			$(wrapper).find('.page-head .title-text').css({ 'font-size': '20px', 'font-weight': '700', 'color': '#1a1a1a' });
// 		}, 100);
// 	}

// 	// =============================================================================
// 	// FY HELPERS
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var p = (fy || '2025-26').split('-');
// 		var sYY = p[0] ? p[0].slice(-2) : '25';
// 		var eYY = p[1] ? p[1].slice(-2) : '26';
// 		var ps = String(parseInt(sYY, 10) - 1).padStart(2, '0');
// 		var pe = String(parseInt(eYY, 10) - 1).padStart(2, '0');
// 		return { plan: 'FY' + sYY + '-' + eYY + ' Plan', est: 'FY' + ps + '-' + pe + ' Estimate' };
// 	}

// 	function getPrevFY(fy) {
// 		var p = (fy || '2025-26').split('-');
// 		return (parseInt(p[0] || '2025', 10) - 1) + '-' + String(parseInt(p[1] || '26', 10) - 1).padStart(2, '0');
// 	}

// 	// =============================================================================
// 	// LOADER
// 	// =============================================================================

// 	if (!$('#global-loader').length) {
// 		$('body').append(
// 			'<div id="global-loader" class="loader-overlay">' +
// 			'<div class="loader-box"><img src="/files/APF logo.png" class="loader-logo" alt="">' +
// 			'<div class="loader-text">Loading, please wait</div></div></div>'
// 		);
// 	}
// 	$('#global-loader').hide();

// 	var Loader = {
// 		show: function (msg) {
// 			var $l = $('#global-loader');
// 			$l.find('.loader-text').text(msg || 'Loading, please wait');
// 			$l.css('display', 'flex').hide().fadeIn(200);
// 		},
// 		hide: function () { $('#global-loader').fadeOut(200); }
// 	};

// 	// =============================================================================
// 	// STORE
// 	// =============================================================================

// 	var Store = {
// 		ppt: { rows: [], prevRows: [], budgetLabel: '', estLabel: '', prevBudgetLabel: '', prevEstLabel: '' },
// 		summaryInr: [], headcount: [], annual: [], estimate: [], budgetEstimate: []
// 	};

// 	// =============================================================================
// 	// STYLES
// 	// =============================================================================

// 	$(page.body).append(
// 		'<style>' +
// 		':root{' +
// 		'--font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
// 		'--fs-xs:13px;--fs-sm:14px;--fs-base:15px;--fs-md:16px;--fs-lg:17px;--fs-xl:18px;' +
// 		'--fw-n:400;--fw-m:500;--fw-sb:600;--fw-b:700;' +
// 		'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 		'--orange:#F26B21;--orange-light:#FFF3E6;' +
// 		'--bdl:#9baab5;--bdh:#004a75;--bdo:#a84808;' +
// 		'--txt:#1a1a1a;--txt2:#36414c;--muted:#555;' +
// 		'}' +
// 		'.cb-wrapper{padding:15px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.5;}' +
// 		'.cb-wrapper *{box-sizing:border-box;}' +
// 		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:9px 18px;color:var(--muted);font-size:var(--fs-md);font-weight:var(--fw-m);background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s,border-color .15s;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:var(--blue-dark);font-weight:var(--fw-b);border-bottom:3px solid var(--blue-dark);}' +
// 		'#cb-tab-nav .cb-tab-link:hover{color:var(--blue-dark);}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +
// 		'.cb-filter-row{padding:8px 0;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +
// 		'.cb-controls{display:flex;align-items:center;padding:7px 12px;margin-bottom:12px;background:#f7f9fb;border:1px solid #e2e6ea;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
// 		'.cb-controls-left{display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap;}' +
// 		'.cb-controls-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}' +
// 		'.cb-search-wrap{position:relative;display:flex;align-items:center;}' +
// 		'.cb-search-wrap .search-icon{position:absolute;left:8px;color:#8d99a6;pointer-events:none;}' +
// 		'.cb-search-input{padding:5px 8px 5px 28px;border:1.5px solid var(--bdl);border-radius:4px;font-family:var(--font);font-size:var(--fs-sm);color:var(--txt2);background:#fff;width:220px;height:32px;transition:border-color .15s,box-shadow .15s;}' +
// 		'.cb-search-input:focus{outline:none;border-color:#5e64ff;box-shadow:0 0 0 2px rgba(94,100,255,.15);}' +
// 		'.cb-checkbox-area{display:flex;gap:12px;align-items:center;}' +
// 		'.cb-check-label{display:flex;align-items:center;gap:5px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-m);color:var(--txt2);cursor:pointer;user-select:none;white-space:nowrap;}' +
// 		'.cb-check-label input[type=checkbox]{width:14px;height:14px;cursor:pointer;accent-color:#5e64ff;}' +
// 		'.cb-xl-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;height:32px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-sb);cursor:pointer;white-space:nowrap;border:1px solid #1a1a1a;border-radius:4px;background:#1a1a1a;color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.15);transition:background .15s;}' +
// 		'.cb-xl-btn:hover{background:#333;}.cb-xl-btn svg{flex-shrink:0;color:#fff;}' +
// 		'#xl-export-all svg{vertical-align:middle;margin-right:3px;}' +
// 		'.cb-scroll-wrapper{border:1.5px solid var(--bdl);border-radius:6px;overflow:auto;max-height:72vh;background:#fff;}' +

// 		/* ══ NUCLEAR BORDER FIX — scoped under .cb-wrapper ══ */
// 		'.cb-wrapper table{border-collapse:collapse !important;border-spacing:0 !important;}' +
// 		'.cb-wrapper table th,.cb-wrapper table td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;text-align:right;font-family:var(--font);font-size:var(--fs-base);}' +
// 		'.cb-wrapper table th:first-child,.cb-wrapper table td:first-child{text-align:left !important;}' +
// 		'.cb-wrapper table thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-xl);font-weight:var(--fw-b);text-align:center !important;position:sticky;top:0;z-index:25;border:1.5px solid var(--bdh) !important;padding:10px 12px;letter-spacing:.1px;}' +
// 		'.cb-wrapper table thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-sb);text-align:center !important;position:sticky;top:0;z-index:24;border:1.5px solid var(--bdo) !important;min-width:110px;padding:8px 12px;}' +
// 		'.cb-wrapper table tr.cb-row-head td{background:var(--blue-light) !important;color:var(--blue-dark);font-weight:var(--fw-b);border:1.5px solid var(--bdl) !important;cursor:pointer;}' +
// 		'.cb-wrapper table tr.cb-row-head:hover td{background:#d0e8f5 !important;}' +
// 		'.cb-wrapper table tr.cb-row-sub td{background:var(--orange-light) !important;font-weight:var(--fw-sb);border:1.5px solid var(--bdl) !important;cursor:pointer;}' +
// 		'.cb-wrapper table tr.cb-row-sub:hover td{background:#ffe0c2 !important;}' +
// 		'.cb-wrapper table tr.cb-row-grand td{background:var(--blue-mid) !important;color:#fff !important;font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;}' +
// 		'.cb-wrapper table tr.ppt-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:var(--fw-b);border:1.5px solid #9baab5 !important;}' +
// 		'.cb-wrapper table tr.sinr-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:var(--fw-b) !important;border:1.5px solid #9baab5 !important;}' +
// 		'.cb-wrapper .ppt-table-wrap tbody tr td{background:#fff;color:var(--txt);font-weight:var(--fw-n);}' +

// 		/* ── Non-border cosmetic rules ── */
// 		'.cb-table,.ppt-table-wrap{width:100%;table-layout:auto;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.45;}' +
// 		'.cb-text-accent{color:var(--blue-mid);font-weight:var(--fw-sb);}' +
// 		'.ppt-title-bar{margin:14px 0 4px;}' +
// 		'.ppt-main-title{font-family:var(--font);font-size:var(--fs-md);font-weight:var(--fw-b);text-transform:uppercase;text-decoration:underline;letter-spacing:.4px;color:var(--txt);}' +
// 		'.ppt-currency-label{font-family:var(--font);font-size:var(--fs-sm);font-style:italic;color:var(--muted);text-align:right;margin-bottom:6px;}' +
// 		'.ppt-currency-label strong{font-weight:var(--fw-b);font-size:var(--fs-sm);font-style:normal;}' +
// 		'.ppt-dash{color:#bbb;text-align:center;display:block;}' +
// 		'.ppt-sub-item-row td:first-child{padding-left:28px !important;font-style:italic;color:#444;}' +

// 		/* ── Budget & Estimate sticky col ── */
// 		'#be-table tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:280px;max-width:280px;white-space:normal;word-break:break-word;background:#fff;}' +
// 		'#be-table .cb-row-head td:first-child{background:var(--blue-light) !important;}' +
// 		'#be-table .cb-row-sub td:first-child{background:var(--orange-light) !important;}' +
// 		'#be-table .cb-row-grand td:first-child{background:var(--blue-mid) !important;}' +
// 		'#be-table thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:280px;}' +
// 		'#be-table .be-grand-col{background:#ddeaf7 !important;color:var(--blue-dark);border-left:2px solid var(--blue-mid) !important;}' +
// 		'#be-table .cb-row-grand .be-grand-col{background:var(--blue-dark) !important;color:#fff !important;}' +
// 		'#be-table .cb-row-head .be-grand-col{background:var(--blue-dark) !important;color:#fff !important;}' +
// 		'#be-table .cb-row-sub .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +
// 		'#be-table .cb-thead-main th:not(:first-child){min-width:260px;text-align:center !important;}' +
// 		'#be-table .cb-thead-sub th{min-width:130px;text-align:center !important;}' +
// 		'#be-table tbody td:first-child,#be-table thead th:first-child{box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +

// 		/* ── Summary INR labels ── */
// 		'.sinr-section-label{margin:18px 0 5px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-b);color:var(--txt);text-decoration:underline;letter-spacing:.2px;}' +
// 		'.sinr-currency-note{text-align:right;font-family:var(--font);font-size:var(--fs-xs);font-style:italic;color:var(--muted);margin-bottom:4px;}' +
// 		'.sinr-sub-item td:first-child{padding-left:22px !important;color:#444;}.sinr-covid-row td{color:#444;}' +

// 		/* ── sinr-table-a sticky cols ── */
// 		'#sinr-table-a thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:var(--blue-mid) !important;}' +
// 		'#sinr-table-a thead tr.cb-thead-sub th:first-child{position:sticky;left:0;z-index:49 !important;background:var(--orange) !important;}' +
// 		'#sinr-table-a tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +
// 		'#sinr-table-a .sinr-total-row td:first-child{background:#e8f0fa !important;}' +
// 		'#sinr-table-a .sinr-covid-row td:first-child{background:#fff;}' +

// 		/* ── sinr-table-b sticky + layout ── */
// 		'#sinr-table-b thead tr:nth-child(1) th{position:sticky;top:0;z-index:25;text-align:center !important;padding:10px 12px;}' +
// 		'#sinr-table-b thead tr:nth-child(2) th{position:sticky;z-index:24;text-align:center !important;padding:8px 12px;min-width:110px;}' +
// 		'#sinr-table-b thead tr th:first-child{position:sticky !important;left:0;text-align:left !important;min-width:210px;box-shadow:2px 0 5px -2px rgba(0,0,0,.18);}' +
// 		'#sinr-table-b thead tr:nth-child(1) th:first-child{z-index:55 !important;}' +
// 		'#sinr-table-b thead tr:nth-child(2) th:first-child{z-index:54 !important;}' +
// 		'#sinr-table-b tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:210px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +
// 		'#sinr-table-b tbody tr.sinr-unit-hdr td{background:var(--blue-light) !important;color:var(--blue-dark);font-weight:var(--fw-b);}' +
// 		'#sinr-table-b tbody tr.sinr-brkdwn-plan td{background:#fff !important;}' +
// 		'#sinr-table-b tbody tr.sinr-brkdwn-act td{background:#fafafa !important;}' +
// 		'#sinr-table-b tbody tr.sinr-spacer td{background:#f4f6f8 !important;padding:2px 0;}' +
// 		'#sinr-table-b tbody tr.sinr-gt-plan td,#sinr-table-b tbody tr.sinr-gt-act td{background:#ddeaf7 !important;color:var(--blue-dark);font-weight:var(--fw-sb);}' +
// 		'#sinr-table-b tbody td{text-align:right;padding:8px 12px;white-space:nowrap;}' +

// 		'.hc-section-title{margin:20px 0 6px;font-family:var(--font);font-size:var(--fs-md);font-weight:var(--fw-b);color:var(--blue-dark);text-transform:uppercase;letter-spacing:.4px;border-left:4px solid var(--blue-mid);padding-left:10px;}' +
// 		'#global-loader.loader-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(18,18,18,.92);backdrop-filter:blur(6px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
// 		'.loader-box{display:flex;flex-direction:column;align-items:center;gap:14px;}' +
// 		'.loader-logo{width:90px;height:90px;border-radius:50%;background:linear-gradient(145deg,#fff,#eaeaea);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.35);animation:lp 1.6s infinite ease-in-out;}' +
// 		'.loader-text{font-family:var(--font);font-size:var(--fs-sm);color:#fff;font-weight:var(--fw-sb);letter-spacing:.5px;opacity:.85;}' +
// 		'.loader-text::after{content:"";display:inline-block;width:1em;animation:ld 1.5s infinite;}' +
// 		'@keyframes lp{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.08);opacity:1;}}' +
// 		'@keyframes ld{0%{content:"";}33%{content:".";}66%{content:"..";}100%{content:"...";}}' +
// 		'</style>'
// 	);

// 	// =============================================================================
// 	// SHARED HELPERS
// 	// =============================================================================

// 	function svgIcon() {
// 		return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 			'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 			'<polyline points="14 2 14 8 20 8"/>' +
// 			'<line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>' +
// 			'</svg>';
// 	}

// 	function fmtCr(v) {
// 		var n = parseFloat(v) || 0;
// 		if (!isFinite(n) || n === 0) { return '-'; }
// 		var res = n / 10000000;
// 		var neg = res < 0;
// 		var s   = Math.abs(res).toFixed(2).split('.');
// 		var ip  = s[0], dp = s[1];
// 		if (ip.length > 3) {
// 			ip = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + ip.slice(-3);
// 		}
// 		return (neg ? '-' : '') + ip + '.' + dp;
// 	}

// 	function fmtCrDash(v) {
// 		var n = parseFloat(v) || 0;
// 		return (!isFinite(n) || n === 0) ? '<span class="ppt-dash">-</span>' : fmtCr(n);
// 	}

// 	function formatINR(v) {
// 		var n = Math.round(parseFloat(v) || 0);
// 		var neg = n < 0, s = String(Math.abs(n));
// 		if (s.length > 3) { s = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + s.slice(-3); }
// 		return (neg ? '-' : '') + s;
// 	}

// 	function xlBtn(id, label) { return '<button class="cb-xl-btn" id="' + id + '">' + svgIcon() + label + '</button>'; }

// 	function controlsBar(searchId, placeholder, checks, exportId) {
// 		var chk = checks.map(function (c) { return '<label class="cb-check-label"><input type="checkbox" id="' + c.id + '"> ' + c.label + '</label>'; }).join('');
// 		return '<div class="cb-controls"><div class="cb-controls-left">' +
// 			'<div class="cb-search-wrap"><svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
// 			'<input type="text" id="' + searchId + '" class="cb-search-input" placeholder="' + placeholder + '"></div>' +
// 			'<div class="cb-checkbox-area">' + chk + '</div></div>' +
// 			'<div class="cb-controls-right">' + xlBtn(exportId, 'Export to Excel') + '</div></div>';
// 	}

// 	function fixStickySubHeader(sel) {
// 		var attempts = 0;
// 		function attempt() {
// 			var $t = $(sel);
// 			var $m = $t.find('thead tr.cb-thead-main');
// 			var $s = $t.find('thead tr.cb-thead-sub');
// 			if (!$m.length || !$s.length) { return; }
// 			var h = $m[0].getBoundingClientRect().height;
// 			if (!h) { h = $m.outerHeight(true) || 0; }
// 			if (h > 0) {
// 				$s.find('th').css('top', h + 'px');
// 			} else if (attempts++ < 10) {
// 				setTimeout(attempt, 50);
// 			}
// 		}
// 		setTimeout(attempt, 0);
// 	}

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================

// 	$(page.body).append(
// 		'<div class="cb-wrapper">' +
// 		'<div class="frappe-control-group row cb-filter-row" id="cb-filter-row"></div>' +
// 		'<ul id="cb-tab-nav">' +
// 		'<li><a class="cb-tab-link active" data-tab="ppt">Foundation level/Overall metrics</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="summary_inr">Summary in INR</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="headcount">Headcount</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="estimate">Estimate Consolidated</a></li>' +
// 		'<li><a class="cb-tab-link" data-tab="budget_estimate">Budget &amp; Estimate</a></li>' +
// 		'</ul><div id="cb-tab-content">' +

// 		'<div class="cb-tab-pane active" id="tab-ppt">' +
// 		'<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">' + xlBtn('xl-ppt', 'Export to Excel') + '</div>' +

// 		/* ── Current year table ── */
// 		'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-main-title">Overall Foundation - Budget vs. Actual</div></div>' +
// 		'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 		'<div class="cb-scroll-wrapper" style="margin-bottom:20px;"><table id="ppt-table" class="ppt-table-wrap"><thead>' +
// 		'<tr class="cb-thead-main"><th rowspan="2" style="min-width:180px;">Unit</th><th colspan="3" id="ppt-budget-hdr">Budget</th><th colspan="3" id="ppt-est-hdr">Estimate</th></tr>' +
// 		'<tr class="cb-thead-sub"><th>Opex</th><th>Capex</th><th>Total</th><th>Opex</th><th>Capex</th><th>Total</th></tr>' +
// 		'</thead><tbody id="ppt-tbody"></tbody></table></div>' +

// 		/* ── Previous year table ── */
// 		'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-prev-title">Overall Foundation - Previous Year Budget vs. Actual</div></div>' +
// 		'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 		'<div class="cb-scroll-wrapper" style="margin-bottom:20px;"><table id="ppt-prev-table" class="ppt-table-wrap"><thead>' +
// 		'<tr class="cb-thead-main"><th rowspan="2" style="min-width:180px;">Unit</th><th colspan="3" id="ppt-prev-budget-hdr">Budget</th><th colspan="3" id="ppt-prev-est-hdr">Estimate</th></tr>' +
// 		'<tr class="cb-thead-sub"><th>Opex</th><th>Capex</th><th>Total</th><th>Opex</th><th>Capex</th><th>Total</th></tr>' +
// 		'</thead><tbody id="ppt-prev-tbody"></tbody></table></div>' +

// 		/* ── Sub-item tables injected here ── */
// 		'<div id="ppt-sub-tables"></div>' +

// 		'</div>' + /* end tab-ppt */

// 		'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
// 		'<div class="cb-tab-pane" id="tab-headcount"></div>' +

// 		'<div class="cb-tab-pane" id="tab-annual_budget">' +
// 		controlsBar('annual-search', 'Search expense / item\u2026', [{ id: 'annual-expand-quarters', label: 'Expand Quarters' }, { id: 'annual-expand-items', label: 'Expand Line Items' }], 'xl-annual') +
// 		'<div class="cb-scroll-wrapper"><table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table></div></div>' +

// 		'<div class="cb-tab-pane" id="tab-estimate">' +
// 		controlsBar('estimate-search', 'Search expense / item\u2026', [{ id: 'estimate-expand-quarters', label: 'Expand Quarters' }, { id: 'estimate-expand-items', label: 'Expand Line Items' }], 'xl-estimate') +
// 		'<div class="cb-scroll-wrapper"><table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table></div></div>' +

// 		'<div class="cb-tab-pane" id="tab-budget_estimate">' +
// 		controlsBar('be-search', 'Search expense / item\u2026', [{ id: 'be-expand-items', label: 'Expand Line Items' }], 'xl-be') +
// 		'<div class="cb-scroll-wrapper"><table class="cb-table" id="be-table"><thead></thead><tbody id="be-tbody"></tbody></table></div></div>' +

// 		'</div></div>'
// 	);

// 	// =============================================================================
// 	// FINANCIAL YEAR FILTER
// 	// =============================================================================

// 	var fyControl = frappe.ui.form.make_control({
// 		parent: $('<div class="col-md-3 col-sm-12"></div>').appendTo('#cb-filter-row'),
// 		df: {
// 			label: 'Financial Year', fieldtype: 'Select', fieldname: 'financial_year', reqd: 1,
// 			change: function () {
// 				var y = this.get_value(); if (!y) { return; }
// 				updatePageTitle(y); TabLoader.resetAll();
// 				TabLoader.trigger($('#cb-tab-nav .cb-tab-link.active').data('tab'));
// 			}
// 		},
// 		render_input: true
// 	});
// 	fyControl.refresh();

// 	frappe.call({
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (!r.message || !r.message.length) { return; }
// 			var years = r.message.map(function (d) { return d.financial_year; });
// 			fyControl.df.options = years.join('\n'); fyControl.refresh();
// 			var today = new Date(), y = today.getFullYear(), m = today.getMonth() + 1;
// 			var cur = (m >= 4 ? y : y - 1) + '-' + String(m >= 4 ? y + 1 : y).slice(-2);
// 			var target = years.indexOf(cur) !== -1 ? cur : years[0];
// 			fyControl.set_value(target); updatePageTitle(target);
// 		}
// 	});

// 	// =============================================================================
// 	// TAB SWITCHING + LOADER
// 	// =============================================================================

// 	$(document).on('click', '#cb-tab-nav .cb-tab-link', function () {
// 		var tab = $(this).data('tab');
// 		$('#cb-tab-nav .cb-tab-link').removeClass('active'); $('.cb-tab-pane').removeClass('active');
// 		$(this).addClass('active'); $('#tab-' + tab).addClass('active');
// 		TabLoader.trigger(tab);
// 	});

// 	var TabLoader = (function () {
// 		var loaded = {};
// 		var map = {
// 			ppt: function (fy) { PPT.load(fy); },
// 			summary_inr: function (fy) { SummaryINR.load(fy); },
// 			headcount: function (fy) { Headcount.load(fy); },
// 			annual_budget: function (fy) { Annual.load(fy); },
// 			estimate: function (fy) { Estimate.load(fy); },
// 			budget_estimate: function (fy) { BudgetEstimate.load(fy); }
// 		};
// 		return {
// 			trigger: function (tab) {
// 				if (!map[tab]) { return; }
// 				var fy = fyControl.get_value() || '2025-26';
// 				if (loaded[tab] === fy) { return; }
// 				loaded[tab] = fy; map[tab](fy);
// 			},
// 			resetAll: function () { loaded = {}; }
// 		};
// 	})();

// 	// =============================================================================
// 	// EXCEL EXPORT
// 	// =============================================================================

// 	function serverExport(method, args, msg) {
// 		Loader.show(msg || 'Preparing your Excel file');
// 		frappe.call({
// 			method: method, args: args,
// 			callback: function (r) {
// 				Loader.hide();
// 				if (r.message && r.message.data) {
// 					var bin = atob(r.message.data), bytes = new Uint8Array(bin.length);
// 					for (var i = 0; i < bin.length; i++) { bytes[i] = bin.charCodeAt(i); }
// 					var url = URL.createObjectURL(new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
// 					var a = document.createElement('a'); a.href = url; a.download = r.message.filename;
// 					document.body.appendChild(a); a.click();
// 					setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
// 				} else { frappe.msgprint('Export failed \u2014 no data returned.'); }
// 			},
// 			error: function () { Loader.hide(); frappe.msgprint('Server error during export.'); }
// 		});
// 	}

// 	// =============================================================================
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {
// 		var currentFY = '';

// 		function normSec(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }

// 		function extractVals(sections, field) {
// 			var opex = 0, capex = 0, hasBreakdown = false;
// 			(sections || []).forEach(function (sec) {
// 				var nm = normSec(sec.name);
// 				if (sec.sequence_id === 9999 || nm === 'GRAND TOTAL') { return; }
// 				if (nm.indexOf('OPERATING') !== -1) { opex  += parseFloat(sec[field] || 0); hasBreakdown = true; }
// 				if (nm.indexOf('CAPITAL')   !== -1) { capex += parseFloat(sec[field] || 0); hasBreakdown = true; }
// 			});
// 			if (!hasBreakdown) {
// 				(sections || []).forEach(function (sec) {
// 					if (sec.sequence_id === 9999 || normSec(sec.name) === 'GRAND TOTAL') {
// 						opex += parseFloat(sec[field] || 0);
// 					}
// 				});
// 				if (!opex) {
// 					(sections || []).forEach(function (sec) {
// 						if (sec.sequence_id !== 9999 && normSec(sec.name) !== 'GRAND TOTAL') {
// 							opex += parseFloat(sec[field] || 0);
// 						}
// 					});
// 				}
// 			}
// 			return { opex: opex, capex: capex };
// 		}

// 		function extractTotal(sections, field) {
// 			var gt = 0;
// 			(sections || []).forEach(function (sec) {
// 				if (sec.sequence_id === 9999 || normSec(sec.name) === 'GRAND TOTAL') {
// 					gt += parseFloat(sec[field] || 0);
// 				}
// 			});
// 			if (!gt) {
// 				(sections || []).forEach(function (sec) { gt += parseFloat(sec[field] || 0); });
// 			}
// 			return gt;
// 		}

// 		function buildRows(data, cfg) {
// 			var rows = (data || []).slice()
// 				.sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); })
// 				.map(function (e) {
// 					var b = extractVals(e[cfg.key] || [], cfg.budgetField);
// 					var v = extractVals(e[cfg.key] || [], cfg.actualField);
// 					var bTot = extractTotal(e[cfg.key] || [], cfg.budgetField);
// 					var eTot = extractTotal(e[cfg.key] || [], cfg.actualField);
// 					return { label: e.label || '', bOpex: b.opex, bCapex: b.capex, bTotal: bTot, eOpex: v.opex, eCapex: v.capex, eTotal: eTot };
// 				});
// 			var tot = { bOpex: 0, bCapex: 0, bTotal: 0, eOpex: 0, eCapex: 0, eTotal: 0 };
// 			rows.forEach(function (r) { tot.bOpex += r.bOpex; tot.bCapex += r.bCapex; tot.bTotal += r.bTotal; tot.eOpex += r.eOpex; tot.eCapex += r.eCapex; tot.eTotal += r.eTotal; });
// 			rows.push({ label: 'Total', isTotal: true, bOpex: tot.bOpex, bCapex: tot.bCapex, bTotal: tot.bTotal, eOpex: tot.eOpex, eCapex: tot.eCapex, eTotal: tot.eTotal });
// 			return rows;
// 		}

// 		function renderTable(rows, tbId, bHdr, eHdr, tblId, bLbl, eLbl) {
// 			$('#' + bHdr).text(bLbl); $('#' + eHdr).text(eLbl);
// 			var $tb = $('#' + tbId).empty();
// 			rows.forEach(function (r) {
// 				$tb.append('<tr class="' + (r.isTotal ? 'ppt-total-row' : '') + '"><td>' + r.label + '</td>' +
// 					'<td>' + fmtCrDash(r.bOpex) + '</td><td>' + fmtCrDash(r.bCapex) + '</td><td>' + fmtCrDash(r.bTotal) + '</td>' +
// 					'<td>' + fmtCrDash(r.eOpex) + '</td><td>' + fmtCrDash(r.eCapex) + '</td><td>' + fmtCrDash(r.eTotal) + '</td></tr>');
// 			});
// 			fixStickySubHeader('#' + tblId);
// 		}

// 		function buildEducationTables(data, cfg, bLbl, eLbl) {
// 			var subItems = (data || []).filter(function (e) { return e.is_this_sub_item === 1; });
// 			if (!subItems.length) { return ''; }

// 			var groups = {}, groupOrder = [];
// 			subItems.forEach(function (e) {
// 				var grp = (e.table_name || 'Other').trim();
// 				if (!groups[grp]) { groups[grp] = []; groupOrder.push(grp); }
// 				groups[grp].push(e);
// 			});

// 			var parentLabelMap = {};
// 			(data || []).forEach(function (e) {
// 				if (e.is_this_sub_item === 0) {
// 					var tn = (e.table_name || '').trim();
// 					if (tn && !parentLabelMap[tn]) {
// 						parentLabelMap[tn] = (e.label || tn).trim();
// 					}
// 				}
// 			});

// 			var html = '';

// 			groupOrder.forEach(function (grp) {
// 				var entries = groups[grp].slice()
// 					.sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });

// 				var sectionTitle = "EDUCATION";
// 				var tblId = 'ppt-edu-' + grp.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '');

// 				var bodyHtml = '';
// 				var tot = { bOpex: 0, bCapex: 0, bTotal: 0, eOpex: 0, eCapex: 0, eTotal: 0 };

// 				entries.forEach(function (e) {
// 					var b    = extractVals(e[cfg.key] || [], cfg.budgetField);
// 					var v    = extractVals(e[cfg.key] || [], cfg.actualField);
// 					var bTot = extractTotal(e[cfg.key] || [], cfg.budgetField);
// 					var eTot = extractTotal(e[cfg.key] || [], cfg.actualField);
// 					tot.bOpex  += b.opex;  tot.bCapex += b.capex; tot.bTotal += bTot;
// 					tot.eOpex  += v.opex;  tot.eCapex += v.capex; tot.eTotal += eTot;

// 					bodyHtml += '<tr>' +
// 						'<td>' + (e.label || '') + '</td>' +
// 						'<td>' + fmtCrDash(b.opex)  + '</td>' +
// 						'<td>' + fmtCrDash(b.capex) + '</td>' +
// 						'<td>' + fmtCrDash(bTot)    + '</td>' +
// 						'<td>' + fmtCrDash(v.opex)  + '</td>' +
// 						'<td>' + fmtCrDash(v.capex) + '</td>' +
// 						'<td>' + fmtCrDash(eTot)    + '</td></tr>';
// 				});

// 				bodyHtml += '<tr class="ppt-total-row">' +
// 					'<td>Total</td>' +
// 					'<td>' + fmtCrDash(tot.bOpex)  + '</td>' +
// 					'<td>' + fmtCrDash(tot.bCapex) + '</td>' +
// 					'<td>' + fmtCrDash(tot.bTotal) + '</td>' +
// 					'<td>' + fmtCrDash(tot.eOpex)  + '</td>' +
// 					'<td>' + fmtCrDash(tot.eCapex) + '</td>' +
// 					'<td>' + fmtCrDash(tot.eTotal) + '</td></tr>';

// 				html +=
// 					'<div class="ppt-title-bar" style="margin-top:28px;">' +
// 						'<div class="ppt-main-title">' + sectionTitle + '</div>' +
// 					'</div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 						'<table id="' + tblId + '" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:200px;text-align:left !important;">Unit</th>' +
// 									'<th colspan="3" style="text-align:center !important;">' + bLbl + '</th>' +
// 									'<th colspan="3" style="text-align:center !important;">' + eLbl + '</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody>' + bodyHtml + '</tbody>' +
// 						'</table>' +
// 					'</div>';
// 			});

// 			return html;
// 		}

// 		function buildOpexBudgetTable(entries, fyLabel) {
// 			if (!entries || !entries.length) { return ''; }

// 			function isOpex(name) {
// 				return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('OPERATING') !== -1;
// 			}

// 			function getSubPlan(e, subName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isOpex(s.name)) { return; }
// 					(s.sub_heads || []).forEach(function (sub) {
// 						if ((sub.name || '').trim() === subName) {
// 							v += parseFloat(sub.ytd || 0);
// 						}
// 					});
// 				});
// 				return v;
// 			}

// 			function getOpexPlan(e) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (isOpex(s.name)) {
// 						v += parseFloat(s.ytd || 0);
// 					}
// 				});
// 				return v;
// 			}

// 			var subHeadNames = [], seen = {};
// 			entries.forEach(function (e) {
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isOpex(s.name)) { return; }
// 					(s.sub_heads || []).forEach(function (sub) {
// 						var n = (sub.name || '').trim();
// 						if (n && !seen[n]) { seen[n] = true; subHeadNames.push(n); }
// 					});
// 				});
// 			});

// 			if (!subHeadNames.length) { return ''; }

// 			var tblId = 'ppt-opex-budget-tbl';

// 			if (!$('#ppt-opex-style').length) {
// 				$('head').append(
// 					'<style id="ppt-opex-style">' +
// 					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
// 					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th{border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:50 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:260px;border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:260px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;border:1.5px solid #aaa !important;}' +
// 					'</style>'
// 				);
// 			}

// 			var hdrR1 = '<tr class="cb-thead-main">' +
// 				'<th style="min-width:260px;text-align:left !important;">Expense Category</th>';
// 			entries.forEach(function (e) {
// 				hdrR1 += '<th style="min-width:150px;text-align:center !important;">' + (e.label || '').trim() + '</th>';
// 			});
// 			hdrR1 += '<th style="min-width:150px;text-align:center !important;background:var(--blue-dark);">Grand Total</th></tr>';

// 			var bodyHtml = '';
// 			var colTotals = [];
// 			entries.forEach(function () { colTotals.push(0); });
// 			var grandRowTotal = 0;

// 			subHeadNames.forEach(function (subName) {
// 				var rowTotal = 0, cells = '';
// 				entries.forEach(function (e, ei) {
// 					var v = getSubPlan(e, subName);
// 					colTotals[ei] += v;
// 					rowTotal += v;
// 					cells += '<td>' + fmtCrDash(v) + '</td>';
// 				});
// 				grandRowTotal += rowTotal;
// 				bodyHtml += '<tr>' +
// 					'<td>' + subName + '</td>' +
// 					cells +
// 					'<td style="font-weight:700;background:#ddeaf7;color:var(--blue-dark);border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(rowTotal) + '</td>' +
// 				'</tr>';
// 			});

// 			var totalCells = '';
// 			var opexGrandTotal = 0;
// 			entries.forEach(function (e) {
// 				var v = getOpexPlan(e);
// 				opexGrandTotal += v;
// 				totalCells += '<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(v) + '</td>';
// 			});
// 			bodyHtml += '<tr class="ppt-total-row">' +
// 				'<td>Total</td>' +
// 				totalCells +
// 				'<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(opexGrandTotal) + '</td>' +
// 			'</tr>';

// 			var fyPart = fyLabel.replace(/\s*budget\s*/i, '').trim();

// 			return '<div class="ppt-title-bar" style="margin-top:36px;">' +
// 					'<div class="ppt-main-title">OPERATING EXPENSES ' + fyPart + '</div>' +
// 				'</div>' +
// 				'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 					'<table id="' + tblId + '" class="cb-table">' +
// 						'<thead>' + hdrR1 + '</thead>' +
// 						'<tbody>' + bodyHtml + '</tbody>' +
// 					'</table>' +
// 				'</div>';
// 		}

// 		// ── CAPITAL EXPENSES TABLE ─────────────────────────────────────────────────
// 		// Rows = items directly inside the CAPITAL EXPENSES section (not sub_heads).
// 		// Same Cr formatting, same sticky first-col, same Grand Total column.
// 		// ──────────────────────────────────────────────────────────────────────────

// 		function buildCapexBudgetTable(entries, fyLabel) {
// 			if (!entries || !entries.length) { return ''; }

// 			function isCapex(name) {
// 				return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('CAPITAL') !== -1;
// 			}

// 			function getItemPlan(e, itemName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isCapex(s.name)) { return; }
// 					(s.items || []).forEach(function (item) {
// 						if ((item.name || '').trim() === itemName) {
// 							v += parseFloat(item.ytd || 0);
// 						}
// 					});
// 				});
// 				return v;
// 			}

// 			function getCapexPlan(e) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (isCapex(s.name)) {
// 						v += parseFloat(s.ytd || 0);
// 					}
// 				});
// 				return v;
// 			}

// 			var itemNames = [], seen = {};
// 			entries.forEach(function (e) {
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isCapex(s.name)) { return; }
// 					(s.items || []).forEach(function (item) {
// 						var n = (item.name || '').trim();
// 						if (n && !seen[n]) { seen[n] = true; itemNames.push(n); }
// 					});
// 				});
// 			});

// 			if (!itemNames.length) { return ''; }

// 			var tblId = 'ppt-capex-budget-tbl';

// 			if (!$('#ppt-capex-style').length) {
// 				$('head').append(
// 					'<style id="ppt-capex-style">' +
// 					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
// 					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th{border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:50 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:260px;border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:260px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;border:1.5px solid var(--bdh) !important;}' +
// 					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;border:1.5px solid #aaa !important;}' +
// 					'</style>'
// 				);
// 			}

// 			var hdrR1 = '<tr class="cb-thead-main">' +
// 				'<th style="min-width:260px;text-align:left !important;">Expense Category</th>';
// 			entries.forEach(function (e) {
// 				hdrR1 += '<th style="min-width:150px;text-align:center !important;">' + (e.label || '').trim() + '</th>';
// 			});
// 			hdrR1 += '<th style="min-width:150px;text-align:center !important;background:var(--blue-dark);">Grand Total</th></tr>';

// 			var bodyHtml = '';
// 			var grandRowTotal = 0;

// 			itemNames.forEach(function (itemName) {
// 				var rowTotal = 0, cells = '';
// 				entries.forEach(function (e) {
// 					var v = getItemPlan(e, itemName);
// 					rowTotal += v;
// 					cells += '<td>' + fmtCrDash(v) + '</td>';
// 				});
// 				grandRowTotal += rowTotal;
// 				bodyHtml += '<tr>' +
// 					'<td>' + itemName + '</td>' +
// 					cells +
// 					'<td style="font-weight:700;background:#ddeaf7;color:var(--blue-dark);border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(rowTotal) + '</td>' +
// 				'</tr>';
// 			});

// 			var totalCells = '';
// 			var capexGrandTotal = 0;
// 			entries.forEach(function (e) {
// 				var v = getCapexPlan(e);
// 				capexGrandTotal += v;
// 				totalCells += '<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(v) + '</td>';
// 			});
// 			bodyHtml += '<tr class="ppt-total-row">' +
// 				'<td>Total</td>' +
// 				totalCells +
// 				'<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(capexGrandTotal) + '</td>' +
// 			'</tr>';

// 			var fyPart = fyLabel.replace(/\s*budget\s*/i, '').trim();

// 			return '<div class="ppt-title-bar" style="margin-top:36px;">' +
// 					'<div class="ppt-main-title">CAPITAL EXPENSES ' + fyPart + '</div>' +
// 				'</div>' +
// 				'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 					'<table id="' + tblId + '" class="cb-table">' +
// 						'<thead>' + hdrR1 + '</thead>' +
// 						'<tbody>' + bodyHtml + '</tbody>' +
// 					'</table>' +
// 				'</div>';
// 		}

// 		function load(fy) {
// 			currentFY = fy || '2025-26';
// 			$('#ppt-tbody,#ppt-prev-tbody').html(
// 				'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading\u2026</td></tr>'
// 			);
// 			$('#ppt-sub-tables').html('');
// 			Loader.show('Building your foundation metrics');

// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_foundation_overall',
// 				args: { financial_year: fy, month: 'March', table_name_filter: 'Foundation Overall' },
// 				callback: function (r) {
// 					var d = Array.isArray(r.message)
// 						? r.message
// 						: ((r.message && Array.isArray(r.message.message)) ? r.message.message : []);

// 					if (!d.length) {
// 						Loader.hide();
// 						$('#ppt-tbody,#ppt-prev-tbody').html(
// 							'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>'
// 						);
// 						return;
// 					}

// 					var p = (fy || '2025-26').split('-');
// 					var cS = parseInt(p[0], 10), cE = parseInt(p[1], 10);
// 					var curFY = cS + '-' + String(cE).padStart(2, '0');
// 					var prvFY = (cS - 1) + '-' + String(cE - 1).padStart(2, '0');

// 					$('#ppt-main-title').text('Overall Foundation \u2013 ' + curFY + ' Budget vs ' + prvFY + ' Actual');
// 					$('#ppt-prev-title').text('Overall Foundation \u2013 ' + prvFY + ' Budget vs ' + prvFY + ' Actual');

// 					var cCfg = { key: 'current_year',  budgetField: 'ytd', actualField: 'total_posted_amt_ytd' };
// 					var pCfg = { key: 'previous_year', budgetField: 'ytd', actualField: 'total_posted_amt_ytd' };

// 					var mainData = d.filter(function (e) { return e.is_this_sub_item !== 1; });
// 					var r0 = buildRows(mainData, cCfg);
// 					var r1 = buildRows(mainData, pCfg);

// 					renderTable(r0, 'ppt-tbody',      'ppt-budget-hdr',      'ppt-est-hdr',      'ppt-table',      curFY + ' Budget', prvFY + ' Actual');
// 					renderTable(r1, 'ppt-prev-tbody', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr', 'ppt-prev-table', prvFY + ' Budget', prvFY + ' Actual');

// 					var subHtml = buildEducationTables(d, cCfg, curFY + ' Budget', prvFY + ' Actual');
// 					$('#ppt-sub-tables').html(subHtml);

// 					$('#ppt-sub-tables .ppt-table-wrap').each(function () {
// 						var id = $(this).attr('id');
// 						if (id) { fixStickySubHeader('#' + id); }
// 					});

// 					frappe.call({
// 						method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 						args: { financial_year: fy, month: 'March', table_name_filter: 'Opex Capex' },
// 						callback: function (r2) {
// 							Loader.hide();
// 							var raw = Array.isArray(r2.message) ? r2.message
// 								: ((r2.message && Array.isArray(r2.message.message)) ? r2.message.message : []);
// 							var uwp = raw.filter(function (e) {
// 								return e.is_this_sub_item === 0
// 									&& e.sequence_id !== 9999
// 									&& (e.table_name || '').toUpperCase() !== 'CONSOLIDATED';
// 							}).sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });

// 							var opexHtml  = buildOpexBudgetTable(uwp, curFY);
// 							var capexHtml = buildCapexBudgetTable(uwp, curFY);

// 							$('#ppt-sub-tables').html(subHtml + opexHtml + capexHtml);

// 							$('#ppt-sub-tables .ppt-table-wrap').each(function () {
// 								var id = $(this).attr('id');
// 								if (id) { fixStickySubHeader('#' + id); }
// 							});
// 							fixStickySubHeader('#ppt-opex-budget-tbl');
// 							fixStickySubHeader('#ppt-capex-budget-tbl');
// 						},
// 						error: function () { Loader.hide(); }
// 					});

// 					var toExp = function (rows) {
// 						return rows.map(function (r) {
// 							return {
// 								label: r.label, bOpex: r.bOpex, bCapex: r.bCapex, bTotal: r.bTotal,
// 								eOpex: r.eOpex, eCapex: r.eCapex, eTotal: r.eTotal, is_total: !!r.isTotal
// 							};
// 						});
// 					};
// 					Store.ppt.rows         = toExp(r0);
// 					Store.ppt.prevRows     = toExp(r1);
// 					Store.ppt.budgetLabel  = curFY + ' Budget';
// 					Store.ppt.estLabel     = prvFY + ' Actual';
// 					Store.ppt.prevBudgetLabel = prvFY + ' Budget';
// 					Store.ppt.prevEstLabel    = prvFY + ' Actual';
// 				},
// 				error: function () {
// 					Loader.hide();
// 					$('#ppt-tbody,#ppt-prev-tbody').html(
// 						'<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>'
// 					);
// 				}
// 			});
// 		}

// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// SUMMARY IN INR MODULE
// 	// =============================================================================

// 	var SummaryINR = (function () {
// 		function normN(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }
// 		function zero() { return { opex_plan: 0, opex_act: 0, capex_plan: 0, capex_act: 0, total_plan: 0, total_act: 0 }; }
// 		function addV(a, b) { return { opex_plan: a.opex_plan + b.opex_plan, opex_act: a.opex_act + b.opex_act, capex_plan: a.capex_plan + b.capex_plan, capex_act: a.capex_act + b.capex_act, total_plan: a.total_plan + b.total_plan, total_act: a.total_act + b.total_act }; }
// 		function extractA(actuals) {
// 			var r = zero();
// 			(actuals || []).forEach(function (sec) {
// 				var nm = normN(sec.name);
// 				if (nm === 'OPERATING EXPENSES' || nm === 'OPERATING  EXPENSES') { r.opex_plan += parseFloat(sec.ytd || 0); r.opex_act += parseFloat(sec.total_posted_amt_ytd || 0); }
// 				if (nm === 'CAPITAL EXPENSES'   || nm === 'CAPITAL  EXPENSES')   { r.capex_plan += parseFloat(sec.ytd || 0); r.capex_act += parseFloat(sec.total_posted_amt_ytd || 0); }
// 			});
// 			r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act;
// 			return r;
// 		}
// 		function getConsolidatedTotals(data) {
// 			var ct = null;
// 			(data || []).forEach(function (e) {
// 				if (e.sequence_id === 9999 || (e.table_name || '').toUpperCase() === 'CONSOLIDATED') { ct = e; }
// 			});
// 			if (!ct) { return null; }
// 			var r = zero();
// 			(ct.actuals || []).forEach(function (a) {
// 				var nm = (a.name || '').toUpperCase().replace(/\s+/g, ' ').trim();
// 				if (nm === 'OPEX TOTAL')         { r.opex_plan += parseFloat(a.ytd || 0); r.opex_act += parseFloat(a.total_posted_amt_ytd || 0); }
// 				if (nm === 'CAPEX TOTAL')         { r.capex_plan += parseFloat(a.ytd || 0); r.capex_act += parseFloat(a.total_posted_amt_ytd || 0); }
// 				if (nm === 'OVERALL GRAND TOTAL') { r.total_plan = parseFloat(a.ytd || 0); r.total_act = parseFloat(a.total_posted_amt_ytd || 0); }
// 			});
// 			if (!r.total_plan && !r.total_act) { r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act; }
// 			return r;
// 		}
// 		function buildRowsA(data) {
// 			var sorted = (data || []).slice().sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// 			var norm = [], covid = [];
// 			sorted.forEach(function (e) {
// 				if (e.sequence_id === 9999 || (e.table_name || '').toUpperCase() === 'CONSOLIDATED') { return; }
// 				var lbl = (e.label || '').trim();
// 				var row = { display: lbl, isSub: e.is_this_sub_item === 1, isCovid: lbl.toLowerCase().indexOf('covid') !== -1, vals: extractA(e.actuals) };
// 				(row.isCovid ? covid : norm).push(row);
// 			});
// 			var gtVals = getConsolidatedTotals(data);
// 			if (!gtVals) {
// 				gtVals = zero();
// 				norm.forEach(function (r) { if (!r.isSub) { gtVals = addV(gtVals, r.vals); } });
// 				covid.forEach(function (r) { if (!r.isSub) { gtVals = addV(gtVals, r.vals); } });
// 			}
// 			var out = norm.slice();
// 			if (covid.length) { out = out.concat(covid); }
// 			out.push({ display: 'Grand Total', isTotal: true, isGrandTotal: true, vals: gtVals });
// 			return out;
// 		}
// 		function rowHtmlA(r) {
// 			var cls = r.isGrandTotal ? 'cb-row-grand' : (r.isTotal ? 'sinr-total-row' : (r.isCovid ? 'sinr-covid-row' : ''));
// 			var sty = 'text-align:left;' + (r.isSub ? 'padding-left:28px;color:#555;' : '');
// 			var v = r.vals;
// 			return '<tr class="' + cls + '"><td style="' + sty + '">' + r.display + '</td><td>' + fmtCr(v.opex_plan) + '</td><td>' + fmtCr(v.capex_plan) + '</td><td>' + fmtCr(v.total_plan) + '</td><td>' + fmtCr(v.opex_act) + '</td><td>' + fmtCr(v.capex_act) + '</td><td>' + fmtCr(v.total_act) + '</td></tr>';
// 		}
// 		function tableHtmlA(rows, pLbl, aLbl) {
// 			return '<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:28px;"><table class="cb-table sinr-table" id="sinr-table-a" style="width:100%;"><thead>' +
// 				'<tr class="cb-thead-main"><th rowspan="2" style="text-align:left !important;min-width:260px;">Unit / Function</th><th colspan="3" style="text-align:center !important;">' + pLbl + '</th><th colspan="3" style="text-align:center !important;">' + aLbl + '</th></tr>' +
// 				'<tr class="cb-thead-sub"><th>Opex</th><th>Capex</th><th>Total</th><th>Opex</th><th>Capex</th><th>Total</th></tr>' +
// 				'</thead><tbody>' + rows.map(rowHtmlA).join('') + '</tbody></table></div>';
// 		}
// 		function getSubNames(entries) {
// 			var seen = {}, names = [];
// 			entries.forEach(function (e) { (e.actuals || []).forEach(function (sec) { if (normN(sec.name).indexOf('OPERATING') === -1) { return; } (sec.sub_heads || []).forEach(function (sh) { var n = (sh.name || '').trim(); if (n && !seen[n]) { seen[n] = true; names.push(n); } }); }); });
// 			return names;
// 		}
// 		function shVal(actuals, name, field) { var v = 0; (actuals || []).forEach(function (sec) { if (normN(sec.name).indexOf('OPERATING') === -1) { return; } (sec.sub_heads || []).forEach(function (sh) { if ((sh.name || '').trim() === name) { v += parseFloat(field === 'plan' ? (sh.ytd || 0) : (sh.total_posted_amt_ytd || 0)); } }); }); return v; }
// 		function opT(a, f) { var v = 0; (a || []).forEach(function (s) { if (normN(s.name).indexOf('OPERATING') === -1) { return; } v += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }); return v; }
// 		function caT(a, f) { var v = 0; (a || []).forEach(function (s) { if (normN(s.name).indexOf('CAPITAL') === -1) { return; } v += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }); return v; }
// 		function tableHtmlB(entries, shNames, pLbl, aLbl, consolidatedVals) {
// 			var cc = 1 + shNames.length + 3;
// 			var hdr = '<tr class="cb-thead-main"><th rowspan="2" style="text-align:left !important;min-width:210px;">Unit / Function</th><th colspan="' + (shNames.length + 1) + '" style="text-align:center !important;">Operating Expenses</th><th rowspan="2" style="text-align:center !important;min-width:110px;">Capex</th><th rowspan="2" style="text-align:center !important;min-width:110px;">Total</th></tr>' +
// 				'<tr class="cb-thead-sub">' + shNames.map(function (n) { return '<th style="min-width:110px;">' + n + '</th>'; }).join('') + '<th style="min-width:110px;">Total</th></tr>';
// 			var body = '', gtP = {}, gtA = {};
// 			shNames.forEach(function (n) { gtP[n] = 0; gtA[n] = 0; });
// 			var gtOP = 0, gtOA = 0, gtCP = 0, gtCA = 0;
// 			entries.forEach(function (e) {
// 				var lbl = (e.label || '').trim(), act = e.actuals || [], sP = {}, sA = {};
// 				shNames.forEach(function (n) { sP[n] = shVal(act, n, 'plan'); sA[n] = shVal(act, n, 'act'); gtP[n] += sP[n]; gtA[n] += sA[n]; });
// 				var oP = opT(act, 'plan'), oA = opT(act, 'act'), cP = caT(act, 'plan'), cA = caT(act, 'act');
// 				gtOP += oP; gtOA += oA; gtCP += cP; gtCA += cA;
// 				body += '<tr class="sinr-unit-hdr"><td>' + lbl + '</td><td colspan="' + (shNames.length + 3) + '"></td></tr>';
// 				body += '<tr class="sinr-brkdwn-plan"><td style="padding-left:18px;color:#333;">- ' + pLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(sP[n]) + '</td>'; }).join('') + '<td>' + fmtCr(oP) + '</td><td>' + fmtCr(cP) + '</td><td>' + fmtCr(oP + cP) + '</td></tr>';
// 				body += '<tr class="sinr-brkdwn-act"><td style="padding-left:18px;color:#555;">- ' + aLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(sA[n]) + '</td>'; }).join('') + '<td>' + fmtCr(oA) + '</td><td>' + fmtCr(cA) + '</td><td>' + fmtCr(oA + cA) + '</td></tr>';
// 				body += '<tr class="sinr-spacer"><td colspan="' + cc + '"></td></tr>';
// 			});
// 			var finalOP = (consolidatedVals && consolidatedVals.opex_plan)  ? consolidatedVals.opex_plan  : gtOP;
// 			var finalOA = (consolidatedVals && consolidatedVals.opex_act)   ? consolidatedVals.opex_act   : gtOA;
// 			var finalCP = (consolidatedVals && consolidatedVals.capex_plan) ? consolidatedVals.capex_plan : gtCP;
// 			var finalCA = (consolidatedVals && consolidatedVals.capex_act)  ? consolidatedVals.capex_act  : gtCA;
// 			var finalTP = (consolidatedVals && consolidatedVals.total_plan) ? consolidatedVals.total_plan : (gtOP + gtCP);
// 			var finalTA = (consolidatedVals && consolidatedVals.total_act)  ? consolidatedVals.total_act  : (gtOA + gtCA);
// 			body += '<tr class="cb-row-grand"><td>Grand Total</td><td colspan="' + (shNames.length + 3) + '"></td></tr>';
// 			body += '<tr class="sinr-gt-plan"><td style="padding-left:18px;">- ' + pLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(gtP[n]) + '</td>'; }).join('') + '<td>' + fmtCr(finalOP) + '</td><td>' + fmtCr(finalCP) + '</td><td>' + fmtCr(finalTP) + '</td></tr>';
// 			body += '<tr class="sinr-gt-act"><td style="padding-left:18px;">- ' + aLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(gtA[n]) + '</td>'; }).join('') + '<td>' + fmtCr(finalOA) + '</td><td>' + fmtCr(finalCA) + '</td><td>' + fmtCr(finalTA) + '</td></tr>';
// 			return '<div class="cb-scroll-wrapper" style="margin-bottom:24px;"><table id="sinr-table-b" style="width:100%;border-collapse:collapse;"><thead>' + hdr + '</thead><tbody>' + body + '</tbody></table></div>';
// 		}
// 		// ── C. Operating Expenses detail: sub_heads as rows, units as cols ──────────
// 		// Columns: Expense Category | Unit1 Budget | Unit1 Actual | Unit2 Budget | Unit2 Actual | … | Total Budget | Total Actual
// 		function tableHtmlC(entries, pLbl, aLbl) {
// 			if (!entries || !entries.length) { return ''; }

// 			function isOpex(name) { return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('OPERATING') !== -1; }

// 			// Collect all unique sub_head names across all units
// 			var shNames = [], shSeen = {};
// 			entries.forEach(function (e) {
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isOpex(s.name)) { return; }
// 					(s.sub_heads || []).forEach(function (sh) {
// 						var n = (sh.name || '').trim();
// 						if (n && !shSeen[n]) { shSeen[n] = true; shNames.push(n); }
// 					});
// 				});
// 			});
// 			if (!shNames.length) { return ''; }

// 			function shPlan(e, shName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isOpex(s.name)) { return; }
// 					(s.sub_heads || []).forEach(function (sh) {
// 						if ((sh.name || '').trim() === shName) { v += parseFloat(sh.ytd || 0); }
// 					});
// 				});
// 				return v;
// 			}
// 			function shAct(e, shName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isOpex(s.name)) { return; }
// 					(s.sub_heads || []).forEach(function (sh) {
// 						if ((sh.name || '').trim() === shName) { v += parseFloat(sh.total_posted_amt_ytd || 0); }
// 					});
// 				});
// 				return v;
// 			}
// 			function opexTotal(e, field) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (isOpex(s.name)) { v += parseFloat(field === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }
// 				});
// 				return v;
// 			}

// 			var tblId = 'sinr-table-c';
// 			if (!$('#sinr-c-style').length) {
// 				$('head').append(
// 					'<style id="sinr-c-style">' +
// 					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
// 					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-xl);font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;position:sticky;top:0;z-index:25;text-align:center !important;padding:10px 12px;}' +
// 					'#' + tblId + ' thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-sb);border:1.5px solid var(--bdo) !important;position:sticky;z-index:24;text-align:center !important;min-width:120px;padding:8px 12px;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:55 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:220px;vertical-align:middle;}' +
// 					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:220px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;}' +
// 					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;}' +
// 					'#' + tblId + ' .sinr-c-gtcol{background:#ddeaf7 !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;}' +
// 					'#' + tblId + ' tr.cb-row-grand .sinr-c-gtcol{background:var(--blue-dark) !important;color:#fff !important;}' +
// 					'#' + tblId + ' tr.ppt-total-row .sinr-c-gtcol{background:#c8ddf0 !important;color:var(--blue-dark) !important;}' +
// 					'</style>'
// 				);
// 			}

// 			// Header row 1: "Expense Category" spans both header rows via rowspan="2"
// 			// Unit headers span 2 cols each; Grand Total spans 2 cols
// 			var hdr1 = '<tr class="cb-thead-main">' +
// 				'<th rowspan="2" style="min-width:220px;text-align:left !important;vertical-align:middle;position:sticky;left:0;z-index:55 !important;top:0;background:var(--blue-mid) !important;">Expense Category</th>';
// 			entries.forEach(function (e) {
// 				hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;">' + (e.label || '').trim() + '</th>';
// 			});
// 			hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;background:var(--blue-dark) !important;border:1.5px solid #001f3f !important;">Grand Total</th></tr>';

// 			// Header row 2: Budget/Actual sub-cols — NO first-col th (rowspan="2" above covers it)
// 			var hdr2 = '<tr class="cb-thead-sub">';
// 			entries.forEach(function () {
// 				hdr2 += '<th style="min-width:120px;text-align:center !important;">' + pLbl + '</th>' +
// 					    '<th style="min-width:120px;text-align:center !important;">' + aLbl + '</th>';
// 			});
// 			hdr2 += '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + pLbl + '</th>' +
// 				    '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + aLbl + '</th></tr>';

// 			// Body rows: one per sub_head name
// 			var bodyHtml = '';
// 			var gtBudget = 0, gtActual = 0;

// 			shNames.forEach(function (shName) {
// 				var rowBudget = 0, rowActual = 0, cells = '';
// 				entries.forEach(function (e) {
// 					var bp = shPlan(e, shName);
// 					var ba = shAct(e, shName);
// 					rowBudget += bp; rowActual += ba;
// 					cells += '<td>' + fmtCrDash(bp) + '</td><td>' + fmtCrDash(ba) + '</td>';
// 				});
// 				gtBudget += rowBudget; gtActual += rowActual;
// 				bodyHtml += '<tr><td>' + shName + '</td>' + cells +
// 					'<td class="sinr-c-gtcol" style="font-weight:700;">' + fmtCrDash(rowBudget) + '</td>' +
// 					'<td class="sinr-c-gtcol" style="font-weight:700;">' + fmtCrDash(rowActual) + '</td></tr>';
// 			});

// 			// Total row: full opex section total per unit
// 			var totalCells = '';
// 			var totalBudget = 0, totalActual = 0;
// 			entries.forEach(function (e) {
// 				var bp = opexTotal(e, 'plan');
// 				var ba = opexTotal(e, 'act');
// 				totalBudget += bp; totalActual += ba;
// 				totalCells += '<td style="font-weight:700;">' + fmtCrDash(bp) + '</td><td style="font-weight:700;">' + fmtCrDash(ba) + '</td>';
// 			});
// 			bodyHtml += '<tr class="ppt-total-row"><td>Total</td>' + totalCells +
// 				'<td class="sinr-c-gtcol" style="font-weight:700;">' + fmtCrDash(totalBudget) + '</td>' +
// 				'<td class="sinr-c-gtcol" style="font-weight:700;">' + fmtCrDash(totalActual) + '</td></tr>';

// 			return '<div class="sinr-section-label" style="margin-top:28px;">C. Operating Expenses</div>' +
// 				'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
// 					'<table id="' + tblId + '" class="cb-table">' +
// 						'<thead>' + hdr1 + hdr2 + '</thead>' +
// 						'<tbody>' + bodyHtml + '</tbody>' +
// 					'</table>' +
// 				'</div>';
// 		}

// 		// ── D. Capital Expenses detail: items as rows, units as cols ─────────────
// 		// Columns: Expense Category | Unit1 Budget | Unit1 Actual | Unit2 Budget | Unit2 Actual | … | Total Budget | Total Actual
// 		function tableHtmlD(entries, pLbl, aLbl) {
// 			if (!entries || !entries.length) { return ''; }

// 			function isCapex(name) { return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('CAPITAL') !== -1; }

// 			// Collect all unique item names from the capital section
// 			var itemNames = [], itemSeen = {};
// 			entries.forEach(function (e) {
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isCapex(s.name)) { return; }
// 					(s.items || []).forEach(function (item) {
// 						var n = (item.name || '').trim();
// 						if (n && !itemSeen[n]) { itemSeen[n] = true; itemNames.push(n); }
// 					});
// 				});
// 			});
// 			if (!itemNames.length) { return ''; }

// 			function itemPlan(e, itemName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isCapex(s.name)) { return; }
// 					(s.items || []).forEach(function (item) {
// 						if ((item.name || '').trim() === itemName) { v += parseFloat(item.ytd || 0); }
// 					});
// 				});
// 				return v;
// 			}
// 			function itemAct(e, itemName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (!isCapex(s.name)) { return; }
// 					(s.items || []).forEach(function (item) {
// 						if ((item.name || '').trim() === itemName) {
// 							v += parseFloat(item.total_posted_amt_ytd || item.total_posted_amt || 0);
// 						}
// 					});
// 				});
// 				return v;
// 			}
// 			function capexTotal(e, field) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (isCapex(s.name)) { v += parseFloat(field === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }
// 				});
// 				return v;
// 			}

// 			var tblId = 'sinr-table-d';
// 			if (!$('#sinr-d-style').length) {
// 				$('head').append(
// 					'<style id="sinr-d-style">' +
// 					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
// 					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-xl);font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;position:sticky;top:0;z-index:25;text-align:center !important;padding:10px 12px;}' +
// 					'#' + tblId + ' thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-sb);border:1.5px solid var(--bdo) !important;position:sticky;z-index:24;text-align:center !important;min-width:120px;padding:8px 12px;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:55 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:220px;vertical-align:middle;}' +
// 					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:220px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;}' +
// 					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;}' +
// 					'#' + tblId + ' .sinr-d-gtcol{background:#ddeaf7 !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;}' +
// 					'#' + tblId + ' tr.cb-row-grand .sinr-d-gtcol{background:var(--blue-dark) !important;color:#fff !important;}' +
// 					'#' + tblId + ' tr.ppt-total-row .sinr-d-gtcol{background:#c8ddf0 !important;color:var(--blue-dark) !important;}' +
// 					'</style>'
// 				);
// 			}

// 			// Header row 1: "Expense Category" spans both header rows via rowspan="2"
// 			var hdr1 = '<tr class="cb-thead-main">' +
// 				'<th rowspan="2" style="min-width:220px;text-align:left !important;vertical-align:middle;position:sticky;left:0;z-index:55 !important;top:0;background:var(--blue-mid) !important;">Expense Category</th>';
// 			entries.forEach(function (e) {
// 				hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;">' + (e.label || '').trim() + '</th>';
// 			});
// 			hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;background:var(--blue-dark) !important;border:1.5px solid #001f3f !important;">Grand Total</th></tr>';

// 			// Header row 2: Budget/Actual sub-cols — NO first-col th (rowspan="2" above covers it)
// 			var hdr2 = '<tr class="cb-thead-sub">';
// 			entries.forEach(function () {
// 				hdr2 += '<th style="min-width:120px;text-align:center !important;">' + pLbl + '</th>' +
// 					    '<th style="min-width:120px;text-align:center !important;">' + aLbl + '</th>';
// 			});
// 			hdr2 += '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + pLbl + '</th>' +
// 				    '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + aLbl + '</th></tr>';

// 			// Body rows: one per item name
// 			var bodyHtml = '';

// 			itemNames.forEach(function (itemName) {
// 				var rowBudget = 0, rowActual = 0, cells = '';
// 				entries.forEach(function (e) {
// 					var bp = itemPlan(e, itemName);
// 					var ba = itemAct(e, itemName);
// 					rowBudget += bp; rowActual += ba;
// 					cells += '<td>' + fmtCrDash(bp) + '</td><td>' + fmtCrDash(ba) + '</td>';
// 				});
// 				bodyHtml += '<tr><td>' + itemName + '</td>' + cells +
// 					'<td class="sinr-d-gtcol" style="font-weight:700;">' + fmtCrDash(rowBudget) + '</td>' +
// 					'<td class="sinr-d-gtcol" style="font-weight:700;">' + fmtCrDash(rowActual) + '</td></tr>';
// 			});

// 			// Total row: full capex section total per unit
// 			var totalCells = '';
// 			var totalBudget = 0, totalActual = 0;
// 			entries.forEach(function (e) {
// 				var bp = capexTotal(e, 'plan');
// 				var ba = capexTotal(e, 'act');
// 				totalBudget += bp; totalActual += ba;
// 				totalCells += '<td style="font-weight:700;">' + fmtCrDash(bp) + '</td><td style="font-weight:700;">' + fmtCrDash(ba) + '</td>';
// 			});
// 			bodyHtml += '<tr class="ppt-total-row"><td>Total</td>' + totalCells +
// 				'<td class="sinr-d-gtcol" style="font-weight:700;">' + fmtCrDash(totalBudget) + '</td>' +
// 				'<td class="sinr-d-gtcol" style="font-weight:700;">' + fmtCrDash(totalActual) + '</td></tr>';

// 			return '<div class="sinr-section-label" style="margin-top:28px;">D. Capital Expenses</div>' +
// 				'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
// 					'<table id="' + tblId + '" class="cb-table">' +
// 						'<thead>' + hdr1 + hdr2 + '</thead>' +
// 						'<tbody>' + bodyHtml + '</tbody>' +
// 					'</table>' +
// 				'</div>';
// 		}

// 		// ── E. Other Operating Expenses ─────────────────────────────────────────────
// 		// Same pattern as Capital Expenses (tableHtmlD):
// 		// - entries = all unit rows (eB)
// 		// - Find the section whose name contains 'OTHER OPERATING' inside each unit's actuals
// 		// - Rows  = items directly inside that section
// 		// - Cols  = unit label | Budget | Actual (pairs) + Grand Total pair
// 		function tableHtmlE(entries, pLbl, aLbl) {
// 			if (!entries || !entries.length) { return ''; }

// 			function isOpex(name) {
// 				return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('OPERATING') !== -1;
// 			}
// 			function isOtherOpex(name) {
// 				return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('OTHER OPERATING') !== -1;
// 			}

// 			// OTHER OPERATING EXPENSES can live in two places:
// 			// 1. As a top-level section in actuals (s.name contains 'OTHER OPERATING')
// 			// 2. As a sub_head inside the OPERATING EXPENSES section
// 			// We search both and collect items from whichever has data.
// 			function getItemPlan(e, itemName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					// Path 1: top-level OTHER OPERATING section
// 					if (isOtherOpex(s.name)) {
// 						(s.items || []).forEach(function (item) {
// 							if ((item.name || '').trim() === itemName) { v += parseFloat(item.ytd || 0); }
// 						});
// 					}
// 					// Path 2: sub_head of OPERATING EXPENSES
// 					if (isOpex(s.name) && !isOtherOpex(s.name)) {
// 						(s.sub_heads || []).forEach(function (sh) {
// 							if (!isOtherOpex(sh.name)) { return; }
// 							(sh.items || []).forEach(function (item) {
// 								if ((item.name || '').trim() === itemName) { v += parseFloat(item.ytd || 0); }
// 							});
// 						});
// 					}
// 				});
// 				return v;
// 			}
// 			function getItemAct(e, itemName) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (isOtherOpex(s.name)) {
// 						(s.items || []).forEach(function (item) {
// 							if ((item.name || '').trim() === itemName) {
// 								v += parseFloat(item.total_posted_amt_ytd || item.total_posted_amt || 0);
// 							}
// 						});
// 					}
// 					if (isOpex(s.name) && !isOtherOpex(s.name)) {
// 						(s.sub_heads || []).forEach(function (sh) {
// 							if (!isOtherOpex(sh.name)) { return; }
// 							(sh.items || []).forEach(function (item) {
// 								if ((item.name || '').trim() === itemName) {
// 									v += parseFloat(item.total_posted_amt_ytd || item.total_posted_amt || 0);
// 								}
// 							});
// 						});
// 					}
// 				});
// 				return v;
// 			}
// 			function getSectionTotal(e, field) {
// 				var v = 0;
// 				(e.actuals || []).forEach(function (s) {
// 					if (isOtherOpex(s.name)) {
// 						v += parseFloat(field === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0));
// 					}
// 					if (isOpex(s.name) && !isOtherOpex(s.name)) {
// 						(s.sub_heads || []).forEach(function (sh) {
// 							if (!isOtherOpex(sh.name)) { return; }
// 							v += parseFloat(field === 'plan' ? (sh.ytd || 0) : (sh.total_posted_amt_ytd || 0));
// 						});
// 					}
// 				});
// 				return v;
// 			}

// 			// Collect all unique item names across all units (both paths)
// 			var itemNames = [], itemSeen = {};
// 			entries.forEach(function (e) {
// 				(e.actuals || []).forEach(function (s) {
// 					// Path 1
// 					if (isOtherOpex(s.name)) {
// 						(s.items || []).forEach(function (item) {
// 							var n = (item.name || '').trim();
// 							if (n && !itemSeen[n]) { itemSeen[n] = true; itemNames.push(n); }
// 						});
// 					}
// 					// Path 2
// 					if (isOpex(s.name) && !isOtherOpex(s.name)) {
// 						(s.sub_heads || []).forEach(function (sh) {
// 							if (!isOtherOpex(sh.name)) { return; }
// 							(sh.items || []).forEach(function (item) {
// 								var n = (item.name || '').trim();
// 								if (n && !itemSeen[n]) { itemSeen[n] = true; itemNames.push(n); }
// 							});
// 						});
// 					}
// 				});
// 			});
// 			if (!itemNames.length) { return ''; }

// 			var tblId = 'sinr-table-e';
// 			if (!$('#sinr-e-style').length) {
// 				$('head').append(
// 					'<style id="sinr-e-style">' +
// 					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
// 					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-xl);font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;position:sticky;top:0;z-index:25;text-align:center !important;padding:10px 12px;}' +
// 					'#' + tblId + ' thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-sb);border:1.5px solid var(--bdo) !important;position:sticky;z-index:24;text-align:center !important;min-width:120px;padding:8px 12px;}' +
// 					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:55 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:220px;vertical-align:middle;}' +
// 					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:220px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
// 					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;}' +
// 					'#' + tblId + ' tbody tr.ppt-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:var(--fw-b);}' +
// 					'#' + tblId + ' .sinr-e-gtcol{background:#ddeaf7 !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;}' +
// 					'#' + tblId + ' tr.ppt-total-row .sinr-e-gtcol{background:#c8ddf0 !important;color:var(--blue-dark) !important;}' +
// 					'</style>'
// 				);
// 			}

// 			// Header row 1: "Expense Category" spans both rows; unit headers colspan 2; Grand Total colspan 2
// 			var hdr1 = '<tr class="cb-thead-main">' +
// 				'<th rowspan="2" style="min-width:220px;text-align:left !important;vertical-align:middle;position:sticky;left:0;z-index:55 !important;top:0;background:var(--blue-mid) !important;">Expense Category</th>';
// 			entries.forEach(function (e) {
// 				hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;">' + (e.label || '').trim() + '</th>';
// 			});
// 			hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;background:var(--blue-dark) !important;border:1.5px solid #001f3f !important;">Grand Total</th></tr>';

// 			// Header row 2: Budget/Actual per unit — no first col (rowspan covers it)
// 			var hdr2 = '<tr class="cb-thead-sub">';
// 			entries.forEach(function () {
// 				hdr2 += '<th style="min-width:120px;text-align:center !important;">' + pLbl + '</th>' +
// 					    '<th style="min-width:120px;text-align:center !important;">' + aLbl + '</th>';
// 			});
// 			hdr2 += '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + pLbl + '</th>' +
// 				    '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + aLbl + '</th></tr>';

// 			// Body: one row per item name
// 			var bodyHtml = '';
// 			itemNames.forEach(function (itemName) {
// 				var rowBudget = 0, rowActual = 0, cells = '';
// 				entries.forEach(function (e) {
// 					var bp = getItemPlan(e, itemName);
// 					var ba = getItemAct(e, itemName);
// 					rowBudget += bp; rowActual += ba;
// 					cells += '<td>' + fmtCrDash(bp) + '</td><td>' + fmtCrDash(ba) + '</td>';
// 				});
// 				bodyHtml += '<tr><td>' + itemName + '</td>' + cells +
// 					'<td class="sinr-e-gtcol" style="font-weight:700;">' + fmtCrDash(rowBudget) + '</td>' +
// 					'<td class="sinr-e-gtcol" style="font-weight:700;">' + fmtCrDash(rowActual) + '</td></tr>';
// 			});

// 			// Total row: full section total per unit
// 			var totalCells = '';
// 			var totalBudget = 0, totalActual = 0;
// 			entries.forEach(function (e) {
// 				var bp = getSectionTotal(e, 'plan');
// 				var ba = getSectionTotal(e, 'act');
// 				totalBudget += bp; totalActual += ba;
// 				totalCells += '<td style="font-weight:700;">' + fmtCrDash(bp) + '</td><td style="font-weight:700;">' + fmtCrDash(ba) + '</td>';
// 			});
// 			bodyHtml += '<tr class="ppt-total-row"><td>Total</td>' + totalCells +
// 				'<td class="sinr-e-gtcol" style="font-weight:700;">' + fmtCrDash(totalBudget) + '</td>' +
// 				'<td class="sinr-e-gtcol" style="font-weight:700;">' + fmtCrDash(totalActual) + '</td></tr>';

// 			return '<div class="sinr-section-label" style="margin-top:28px;">E. Other Operating Expenses</div>' +
// 				'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
// 					'<table id="' + tblId + '" class="cb-table">' +
// 						'<thead>' + hdr1 + hdr2 + '</thead>' +
// 						'<tbody>' + bodyHtml + '</tbody>' +
// 					'</table>' +
// 				'</div>';
// 		}

// 		function load(fy) {
// 			var $tab = $('#tab-summary_inr');
// 			$tab.html('<div style="padding:20px;text-align:center;color:#aaa;">Loading\u2026</div>');
// 			Loader.show('Building Unit wise plan');
// 			var fp = (fy || '2025-26').split('-');
// 			var pLbl = fy + ' Budget', aLbl = (parseInt(fp[0], 10) - 1) + '-' + String(parseInt(fp[1], 10) - 1).padStart(2, '0') + ' Est';
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 				args: { financial_year: fy, month: 'March', table_name_filter: 'Unit Wise Plan' },
// 				callback: function (r) {
// 					Loader.hide();
// 					var d = Array.isArray(r.message) ? r.message : ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
// 					if (!d || !d.length) { $tab.html('<div style="padding:40px;text-align:center;color:#aaa;">No data available.</div>'); return; }
// 					Store.summaryInr = d;
// 					var eB = d.filter(function (e) { return e.is_this_sub_item === 0 && e.sequence_id !== 9999 && (e.table_name || '').toUpperCase() !== 'CONSOLIDATED'; }).sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// 					var ctVals = getConsolidatedTotals(d);
// 					$tab.html('<div style="padding:4px 0 10px;"><div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' + xlBtn('xl-summary-inr', 'Export to Excel') + '</div>' +
// 						'<div class="sinr-section-label">A. Unit Wise Plan</div>' + tableHtmlA(buildRowsA(d), pLbl, aLbl) +
// 						'<div class="sinr-section-label" style="margin-top:24px;">B. Breakdown of Unit Wise Plan</div>' +
// 						'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
// 						tableHtmlB(eB, getSubNames(eB), pLbl, aLbl, ctVals) +
// 						tableHtmlC(eB, pLbl, aLbl) +
// 						tableHtmlD(eB, pLbl, aLbl) +
// 						tableHtmlE(eB, pLbl, aLbl) +
// 						'</div>');
// 					fixStickySubHeader('#sinr-table-a');
// 					// Fix sticky top for sub-row in C and D (rowspan header — must set top after render)
// 					['#sinr-table-c','#sinr-table-d','#sinr-table-e'].forEach(function(sel) {
// 						(function tryFix(n) {
// 							var $t = $(sel); if (!$t.length) { return; }
// 							var $m = $t.find('thead tr.cb-thead-main');
// 							var h = $m.length ? ($m[0].getBoundingClientRect().height || $m.outerHeight(true) || 0) : 0;
// 							if (h > 0) { $t.find('thead tr.cb-thead-sub th').css('top', h + 'px'); }
// 							else if (n < 12) { setTimeout(function() { tryFix(n+1); }, 60); }
// 						})(0);
// 					});
// 					(function retrySinrB(n) {
// 						var $b = $('#sinr-table-b'); if (!$b.length) { return; }
// 						var rows = $b.find('thead tr'), ok = true;
// 						rows.each(function () { if (!$(this).outerHeight(true)) { ok = false; } });
// 						if (!ok && n < 10) { setTimeout(function() { retrySinrB(n+1); }, 50); return; }
// 						var top = 0;
// 						rows.each(function () { $(this).find('th').css('top', top + 'px'); top += $(this).outerHeight(true) || 40; });
// 					})(0);

// 				},
// 				error: function () { Loader.hide(); $tab.html('<div style="padding:40px;text-align:center;color:red;">Error loading Summary in INR data.</div>'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// HEADCOUNT MODULE
// 	// =============================================================================

// 	var Headcount = (function () {
// 		function fmtHC(v) { if (v === null || v === undefined) { return '-'; } var n = parseFloat(v); return isNaN(n) ? '-' : Math.round(n).toLocaleString('en-IN'); }
// 		function fmtOpex(v) { if (v === null || v === undefined) { return '-'; } var n = parseFloat(v); return isNaN(n) ? '-' : fmtCr(n * 10000000); }
// 		function fmtPct(a, b) {
// 			a = parseFloat(a); b = parseFloat(b);
// 			if (!a || isNaN(a) || isNaN(b)) { return '-'; }
// 			return Math.round(((b / a) - 1) * 100) + '%';
// 		}
// 		function norm(s) { return (s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
// 		function hcSec(txt) { return '<div class="hc-section-title">' + txt + '</div>'; }
// 		function swrap(inner) { return '<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' + inner + '</div>'; }
// 		function buildOpexMap(pd) {
// 			var map = {};
// 			(pd || []).forEach(function (p) {
// 				var op = null; (p.actuals || []).forEach(function (a) { if ((a.name || '').trim() === 'OPERATING  EXPENSES') { op = a; } });
// 				map[norm(p.label || '')] = { est: op ? parseFloat(op.total_posted_amt_ytd || 0) / 10000000 : 0, plan: op ? parseFloat(op.ytd || 0) / 10000000 : 0 };
// 			});
// 			return map;
// 		}
// 		function transform(records) {
// 			var sorted = (records || []).slice().sort(function (a, b) { return (a.financial_year || '').localeCompare(b.financial_year || ''); });
// 			var yrs = sorted.map(function (r) { return r.financial_year || ''; });
// 			var um = {};
// 			sorted.forEach(function (rec) {
// 				(rec.units || []).forEach(function (u) {
// 					var id = String(u.unit || u.unit_id || '');
// 					if (!um[id]) { um[id] = { description: '', hc: {}, seq: parseInt(id, 10) || 0 }; }
// 					um[id].hc[rec.financial_year] = parseFloat(u.total_headcount) || 0;
// 					if (rec.financial_year === yrs[yrs.length - 1]) {
// 						um[id].description = (u.unit_description || u.description || '').trim();
// 					}
// 				});
// 			});
// 			var units = Object.keys(um)
// 				.sort(function (a, b) { return (um[a].seq || 0) - (um[b].seq || 0); })
// 				.map(function (id) { return um[id]; });
// 			var totals = {};
// 			sorted.forEach(function (r) {
// 				totals[r.financial_year] = parseFloat(r.total_head_count || r.total_headcount || 0);
// 			});
// 			return { yrs: yrs, units: units, totals: totals };
// 		}
// 		function avgHC(u, yrs, i) {
// 			if (i === 0) { var c = u.hc[yrs[0]]; return c !== undefined ? c / 2 : null; }
// 			var p = u.hc[yrs[i - 1]], c = u.hc[yrs[i]];
// 			return (p !== undefined && c !== undefined) ? (p + c) / 2 : null;
// 		}
// 		function avgTot(tot, yrs, i) {
// 			if (i === 0) { var c = tot[yrs[0]]; return c !== undefined ? c / 2 : null; }
// 			var p = tot[yrs[i - 1]], c = tot[yrs[i]];
// 			return (p !== undefined && c !== undefined) ? (p + c) / 2 : null;
// 		}
// 		function gtable(hdrs, rows) {
// 			return swrap('<table class="cb-table" style="width:100%;"><thead><tr class="cb-thead-main"><th style="text-align:left !important;min-width:220px;">Unit</th>' +
// 				hdrs.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + rows + '</tbody></table>');
// 		}
// 		function load(fy) {
// 			var $tab = $('#tab-headcount');
// 			$tab.html('<div style="padding:40px;text-align:center;color:#aaa;">Loading\u2026</div>');
// 			Loader.show('Generating workforce summary\u2026');
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_headcount',
// 				args: { financial_year: fy, month: 'March', table_name_filter: 'Unit Wise Plan' },
// 				callback: function (r) {
// 					Loader.hide();
// 					var msg = r.message || {}, records = msg.headcount_data || [], planData = msg.plan_data || [];
// 					if (!records.length) { $tab.html('<div style="padding:40px;text-align:center;color:#aaa;">No headcount data available.</div>'); return; }
// 					Store.headcount = records;
// 					var om = buildOpexMap(planData), t = transform(records);
// 					var yrs = t.yrs, units = t.units, totals = t.totals, i1 = yrs.length - 2, i2 = yrs.length - 1;
// 					var totEst = 0, totPlan = 0, sRows = '';
// 					units.forEach(function (u) { var a1 = avgHC(u, yrs, i1), a2 = avgHC(u, yrs, i2), o = om[norm(u.description)] || { est: 0, plan: 0 }; totEst += o.est; totPlan += o.plan; sRows += '<tr><td style="text-align:left;">' + u.description + '</td><td>' + fmtHC(a1) + '</td><td>' + fmtHC(a2) + '</td><td>' + fmtPct(a1, a2) + '</td><td>' + fmtOpex(o.est) + '</td><td>' + fmtOpex(o.plan) + '</td><td>' + fmtPct(o.est, o.plan) + '</td></tr>'; });
// 					var ta1 = avgTot(totals, yrs, i1), ta2 = avgTot(totals, yrs, i2);
// 					sRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td><td>' + fmtHC(ta1) + '</td><td>' + fmtHC(ta2) + '</td><td>' + fmtPct(ta1, ta2) + '</td><td>' + fmtOpex(totEst) + '</td><td>' + fmtOpex(totPlan) + '</td><td>' + fmtPct(totEst, totPlan) + '</td></tr>';
// 					var sumHtml = swrap('<table class="cb-table" style="width:100%;"><thead><tr class="cb-thead-main"><th rowspan="2" style="text-align:left !important;min-width:200px;">Unit</th><th colspan="3" style="text-align:center !important;">Average H/C</th><th colspan="3" style="text-align:center !important;">Opex Spend (&#8377; Cr.)</th></tr><tr class="cb-thead-sub"><th>' + (yrs[i1] || '') + '</th><th>' + (yrs[i2] || '') + '</th><th>%</th><th>' + (yrs[i1] || '') + ' Est</th><th>' + (yrs[i2] || '') + ' Plan</th><th>%</th></tr></thead><tbody>' + sRows + '</tbody></table>');
// 					var cRows = '', aRows = '';
// 					units.forEach(function (u) { cRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.map(function (y) { return '<td>' + fmtHC(u.hc[y] !== undefined ? u.hc[y] : null) + '</td>'; }).join('') + '</tr>'; });
// 					cRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + yrs.map(function (y) { return '<td>' + fmtHC(totals[y] || 0) + '</td>'; }).join('') + '</tr>';
// 					units.forEach(function (u) { aRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.map(function (y, i) { return '<td>' + fmtHC(avgHC(u, yrs, i)) + '</td>'; }).join('') + '</tr>'; });
// 					aRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + yrs.map(function (y, i) { return '<td>' + fmtHC(avgTot(totals, yrs, i)) + '</td>'; }).join('') + '</tr>';
// 					var pHdrs = [], cpRows = '', apRows = '';
// 					if (yrs.length >= 2) {
// 						pHdrs = yrs.slice(1).map(function (y, i) { return yrs[i] + ' &#8594; ' + y; });
// 						units.forEach(function (u) { cpRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.slice(1).map(function (y, i) { return '<td>' + fmtPct(u.hc[yrs[i]], u.hc[y]) + '</td>'; }).join('') + '</tr>'; apRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.slice(1).map(function (y, i) { return '<td>' + fmtPct(avgHC(u, yrs, i), avgHC(u, yrs, i + 1)) + '</td>'; }).join('') + '</tr>'; });
// 						cpRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + yrs.slice(1).map(function (y, i) { return '<td>' + fmtPct(totals[yrs[i]], totals[y]) + '</td>'; }).join('') + '</tr>';
// 						var tpc = ''; for (var ii = 1; ii < yrs.length; ii++) { tpc += '<td>' + fmtPct(avgTot(totals, yrs, ii - 1), avgTot(totals, yrs, ii)) + '</td>'; }
// 						apRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + tpc + '</tr>';
// 					}
// 					$tab.html('<div style="padding:4px 0 10px;"><div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' + xlBtn('xl-headcount', 'Export to Excel') + '</div>' +
// 						hcSec('Headcount Summary') + '<div class="ppt-currency-label" style="text-align:left;margin-bottom:6px;">H/C numbers &nbsp;|&nbsp; Opex in &#8377; <strong>Cr.</strong></div>' + sumHtml +
// 						hcSec('Closing H/C') + gtable(yrs, cRows) + hcSec('Average H/C') + gtable(yrs, aRows) +
// 						(yrs.length >= 2 ? hcSec('Increase in Closing H/C (%)') + gtable(pHdrs, cpRows) : '') +
// 						(yrs.length >= 2 ? hcSec('Increase in Average H/C (%)') + gtable(pHdrs, apRows) : '') + '</div>');
// 					$tab.find('.cb-table').each(function () { fixStickySubHeader(this); });
// 				},
// 				error: function () { Loader.hide(); $tab.html('<div style="padding:40px;text-align:center;color:red;">Error loading headcount data.</div>'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ANNUAL BUDGET MODULE
// 	// =============================================================================

// 	var Annual = (function () {
// 		var Q_DEFS = { q1: { label: 'Quarter 1', months: ['April', 'May', 'June'] }, q2: { label: 'Quarter 2', months: ['July', 'August', 'September'] }, q3: { label: 'Quarter 3', months: ['October', 'November', 'December'] }, q4: { label: 'Quarter 4', months: ['January', 'February', 'March'] } };
// 		var Q_KEYS = ['q1', 'q2', 'q3', 'q4'];
// 		var data = [], expandedQ = [], openH = {}, openS = {}, bound = false;
// 		function sumArr(a) { var t = 0; (a || []).forEach(function (v) { t += (v || 0); }); return t; }
// 		function objTotal(o) { var t = 0; Q_KEYS.forEach(function (k) { t += sumArr(o[k]); }); return t; }
// 		function qCells(obj) {
// 			var html = '';
// 			Q_KEYS.forEach(function (k) {
// 				var vals = obj[k] || [0, 0, 0];
// 				if (expandedQ.indexOf(k) !== -1) { vals.forEach(function (v) { html += '<td>' + formatINR(v) + '</td>'; }); }
// 				else { html += '<td colspan="3">' + formatINR(sumArr(vals)) + '</td>'; }
// 			});
// 			return html;
// 		}
// 		function buildHeader() {
// 			var $t = $('#annual-table thead').empty(), $m = $('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense Head / Line Item</th>');
// 			Q_KEYS.forEach(function (k) { var o = expandedQ.indexOf(k) !== -1; $m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o ? 1 : 2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o ? '\u25b2' : '\u25bc') + '</th>'); });
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>'); $t.append($m);
// 			if (expandedQ.length) { var $s = $('<tr class="cb-thead-sub"></tr>'); Q_KEYS.forEach(function (k) { if (expandedQ.indexOf(k) !== -1) { Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); }); } }); $t.append($s); }
// 			fixStickySubHeader('#annual-table');
// 		}
// 		function renderTable() {
// 			buildHeader();
// 			var $tb = $('#annual-table tbody').empty(), term = $('#annual-search').val().trim().toLowerCase();
// 			var grand = { q1: [0, 0, 0], q2: [0, 0, 0], q3: [0, 0, 0], q4: [0, 0, 0] };
// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				var hs = String(hi), ho = openH[hs] === true;
// 				Q_KEYS.forEach(function (k) { (head[k] || [0, 0, 0]).forEach(function (v, mi) { grand[k][mi] += (v || 0); }); });
// 				$tb.append('<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho ? '\u25bc' : '\u25b6') + '</span> ' + head.name.trim() + '</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td></tr>');
// 				(head.sub_heads || []).forEach(function (sub, si) {
// 					var sk = hs + '-' + si, so = openS[sk] === true;
// 					$tb.append('<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:22px;"><span class="cb-arrow">' + (so ? '\u25bc' : '\u25b6') + '</span> ' + sub.name + '</td>' + qCells(sub) + '<td>' + formatINR(objTotal(sub)) + '</td></tr>');
// 					(sub.items || []).forEach(function (item) { $tb.append('<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho && so) ? '' : 'display:none;') + '"><td style="padding-left:42px;">' + item.name + '</td>' + qCells(item) + '<td>' + formatINR(objTotal(item)) + '</td></tr>'); });
// 				});
// 				(head.items || []).forEach(function (d) { $tb.append('<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:35px;">' + d.name + '</td>' + qCells(d) + '<td>' + formatINR(objTotal(d)) + '</td></tr>'); });
// 			});
// 			var gt = 0; Q_KEYS.forEach(function (k) { gt += sumArr(grand[k]); });
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 			fixStickySubHeader('#annual-table');
// 		}
// 		function toggleHead(hs) { openH[hs] = !(openH[hs] === true); if (!openH[hs]) { data.forEach(function (h, hi) { if (String(hi) !== hs) { return; } (h.sub_heads || []).forEach(function (_, si) { openS[hs + '-' + si] = false; }); }); } renderTable(); }
// 		function toggleSub(hs, ss) { openS[hs + '-' + ss] = !(openS[hs + '-' + ss] === true); renderTable(); }
// 		function matchSearch(head, term) {
// 			if (!term) { return true; }
// 			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
// 			for (var s = 0; s < (head.sub_heads || []).length; s++) { if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; } for (var i = 0; i < (head.sub_heads[s].items || []).length; i++) { if ((head.sub_heads[s].items[i].name || '').toLowerCase().indexOf(term) !== -1) { return true; } } }
// 			for (var d = 0; d < (head.items || []).length; d++) { if ((head.items[d].name || '').toLowerCase().indexOf(term) !== -1) { return true; } }
// 			return false;
// 		}
// 		function bindEvents() {
// 			$(document).on('input.annual', '#annual-search', function () { renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-quarters', function () { expandedQ = this.checked ? Q_KEYS.slice() : []; renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-items', function () { if (this.checked) { data.forEach(function (h, hi) { openH[String(hi)] = true; (h.sub_heads || []).forEach(function (_, si) { openS[hi + '-' + si] = true; }); }); } else { openH = {}; openS = {}; } renderTable(); });
// 			$(document).on('click.annual', '#annual-table .cb-q-header', function () { var k = String($(this).attr('data-quarter')), idx = expandedQ.indexOf(k); if (idx !== -1) { expandedQ.splice(idx, 1); } else { expandedQ.push(k); } $('#annual-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length); renderTable(); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 		}
// 		function load(fy) {
// 			if (!bound) { bindEvents(); bound = true; }
// 			data = []; openH = {}; openS = {}; expandedQ = [];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			$('#annual-search').val('');
// 			Loader.show('Building Annual Budget\u2026');
// 			frappe.call({
// 				method: 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args: { financial_year: fy },
// 				callback: function (r) { data = r.message || []; Store.annual = data; renderTable(); Loader.hide(); },
// 				error: function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE
// 	// =============================================================================

// 	var Estimate = (function () {
// 		var Q_DEFS = { q1: { label: 'Quarter 1', months: ['April', 'May', 'June'] }, q2: { label: 'Quarter 2', months: ['July', 'August', 'September'] }, q3: { label: 'Quarter 3', months: ['October', 'November', 'December'] }, q4: { label: 'Quarter 4', months: ['January', 'February', 'March'] } };
// 		var Q_KEYS = ['q1', 'q2', 'q3', 'q4'], Q_IDX = { q1: [0, 1, 2], q2: [3, 4, 5], q3: [6, 7, 8], q4: [9, 10, 11] };
// 		var data = [], expandedQ = [], openH = {}, openS = {}, bound = false;
// 		function getMth(obj) { var m = obj.months || {}; return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)]; }
// 		function qTot(obj) { return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)]; }
// 		function yTot(obj) { var q = qTot(obj); return q[0]+q[1]+q[2]+q[3]; }
// 		function qCells(obj) { var mths = getMth(obj), qtots = qTot(obj), html = ''; Q_KEYS.forEach(function (q, qi) { if (expandedQ.indexOf(q) !== -1) { Q_IDX[q].forEach(function (mi) { html += '<td>' + formatINR(mths[mi]) + '</td>'; }); } else { html += '<td colspan="3">' + formatINR(qtots[qi]) + '</td>'; } }); return html; }
// 		function buildHeader() {
// 			var $t = $('#estimate-table thead').empty(), $m = $('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense</th>');
// 			Q_KEYS.forEach(function (k) { var o = expandedQ.indexOf(k) !== -1; $m.append('<th class="est-q-toggle" data-q="' + k + '" colspan="3" rowspan="' + (o ? 1 : 2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o ? '\u25b2' : '\u25bc') + '</th>'); });
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>'); $t.append($m);
// 			if (expandedQ.length) { var $s = $('<tr class="cb-thead-sub"></tr>'); Q_KEYS.forEach(function (k) { if (expandedQ.indexOf(k) !== -1) { Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); }); } }); $t.append($s); }
// 			fixStickySubHeader('#estimate-table');
// 		}
// 		function renderTable() {
// 			buildHeader();
// 			var $tb = $('#estimate-tbody').empty(), term = $('#estimate-search').val().trim().toLowerCase();
// 			if (!Array.isArray(data) || !data.length) { $tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>'); return; }
// 			var gM = [0,0,0,0,0,0,0,0,0,0,0,0], gQ = [0,0,0,0];
// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				getMth(head).forEach(function (v, i) { gM[i] += v; }); qTot(head).forEach(function (v, i) { gQ[i] += v; });
// 				var hs = String(hi), ho = openH[hs];
// 				$tb.append('<tr class="cb-row-head cb-est-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho ? '\u25bc' : '\u25b6') + '</span> ' + head.name + '</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(yTot(head)) + '</td></tr>');
// 				(head.items || []).forEach(function (item) { $tb.append('<tr class="cb-est-head-item" data-hi="' + hs + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:28px;">' + item.name + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>'); });
// 				(head.sub_heads || []).forEach(function (sub, si) {
// 					var sk = hs + '-' + si, so = openS[sk];
// 					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:20px;"><span class="cb-arrow">' + (so ? '\u25bc' : '\u25b6') + '</span> ' + sub.name + '</td>' + qCells(sub) + '<td>' + formatINR(yTot(sub)) + '</td></tr>');
// 					(sub.items || []).forEach(function (item) { $tb.append('<tr class="cb-est-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho && so) ? '' : 'display:none;') + '"><td style="padding-left:44px;">' + item.name + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>'); });
// 				});
// 			});
// 			var gO = { Q1: gQ[0], Q2: gQ[1], Q3: gQ[2], Q4: gQ[3], months: { '4': gM[0], '5': gM[1], '6': gM[2], '7': gM[3], '8': gM[4], '9': gM[5], '10': gM[6], '11': gM[7], '12': gM[8], '1': gM[9], '2': gM[10], '3': gM[11] } };
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(gO) + '<td>' + formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3]) + '</td></tr>');
// 			fixStickySubHeader('#estimate-table');
// 		}
// 		function toggleHead(hs) { var o = !openH[hs]; openH[hs] = o; $('#estimate-table tbody .cb-est-head[data-hi="' + hs + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); if (o) { $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').show(); $('#estimate-table tbody .cb-est-head-item[data-hi="' + hs + '"]').show(); $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () { var si = $(this).attr('data-si'); if (openS[hs + '-' + si]) { $('#estimate-table tbody .cb-est-sub-item[data-hi="' + hs + '"][data-si="' + si + '"]').show(); } }); } else { $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () { var si = $(this).attr('data-si'); openS[hs + '-' + si] = false; $(this).find('.cb-arrow').text('\u25b6'); }); $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"],.cb-est-sub-item[data-hi="' + hs + '"],.cb-est-head-item[data-hi="' + hs + '"]').hide(); } }
// 		function toggleSub(hs, ss) { var sk = hs + '-' + ss, o = !openS[sk]; openS[sk] = o; $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"][data-si="' + ss + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); var $i = $('#estimate-table tbody .cb-est-sub-item[data-hi="' + hs + '"][data-si="' + ss + '"]'); o ? $i.show() : $i.hide(); }
// 		function matchSearch(head, term) { if (!term) { return true; } if (head.name.toLowerCase().indexOf(term) !== -1) { return true; } for (var s = 0; s < (head.sub_heads || []).length; s++) { if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; } for (var i = 0; i < (head.sub_heads[s].items || []).length; i++) { if ((head.sub_heads[s].items[i].name || '').toLowerCase().indexOf(term) !== -1) { return true; } } } for (var d = 0; d < (head.items || []).length; d++) { if ((head.items[d].name || '').toLowerCase().indexOf(term) !== -1) { return true; } } return false; }
// 		function bindEvents() {
// 			$(document).on('click.estimate', '#estimate-table .est-q-toggle', function () { var k = String($(this).attr('data-q')), idx = expandedQ.indexOf(k); if (idx !== -1) { expandedQ.splice(idx, 1); } else { expandedQ.push(k); } $('#estimate-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length); renderTable(); });
// 			$(document).on('change.estimate', '#estimate-expand-quarters', function () { expandedQ = this.checked ? Q_KEYS.slice() : []; renderTable(); });
// 			$(document).on('change.estimate', '#estimate-expand-items', function () { if (this.checked) { data.forEach(function (h, hi) { openH[String(hi)] = true; (h.sub_heads || []).forEach(function (_, si) { openS[hi + '-' + si] = true; }); }); } else { openH = {}; openS = {}; } renderTable(); });
// 			$('#tab-estimate').on('click.estimate', '.cb-est-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-estimate').on('click.estimate', '.cb-est-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 			$(document).on('input.estimate', '#estimate-search', function () { renderTable(); });
// 		}
// 		function load(fy) {
// 			if (!bound) { bindEvents(); bound = true; }
// 			data = []; openH = {}; openS = {}; expandedQ = [];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked', false);
// 			Loader.show('Building Estimate\u2026');
// 			var year = (getPrevFY(fy) || '2025-26').split('-')[0];
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
// 				args: { fiscal_year: year, accounting_period: '12' },
// 				callback: function (r) {
// 					if (r.message) { if (r.message.status === 'success') { data = r.message.data || []; } else if (Array.isArray(r.message)) { data = r.message; } else if (r.message.data && Array.isArray(r.message.data)) { data = r.message.data; } else { frappe.msgprint('Failed to load Estimate data.'); } } else { frappe.msgprint('Failed to load Estimate data.'); }
// 					Store.estimate = data; renderTable(); Loader.hide();
// 				},
// 				error: function () { Loader.hide(); frappe.msgprint('Server error loading Estimate data.'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// BUDGET & ESTIMATE MODULE
// 	// =============================================================================

// 	var BudgetEstimate = (function () {
// 		var rawData = [], currentFY = '', openSec = {}, openSub = {}, expandItems = false, bound = false;
// 		function pl() { return getFYLabels(currentFY).plan; }
// 		function el() { return getFYLabels(currentFY).est; }
// 		function isGT(sec) { return sec.sequence_id === 9999 || (sec.name || '').toUpperCase().replace(/\s+/g, ' ').trim() === 'GRAND TOTAL'; }
// 		function secVal(e, sn, f) { var v = 0; (e.actuals || []).forEach(function (s) { if (isGT(s) || s.name !== sn) { return; } v += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }); return v; }
// 		function subVal(e, sn, subn, f) { var v = 0; (e.actuals || []).forEach(function (s) { if (isGT(s) || s.name !== sn) { return; } (s.sub_heads || []).forEach(function (sub) { if (sub.name !== subn) { return; } v += parseFloat(f === 'plan' ? (sub.ytd || 0) : (sub.total_posted_amt_ytd || 0)); }); }); return v; }
// 		function itemVal(e, nm, f) { var v = 0; (e.actuals || []).forEach(function (s) { if (isGT(s)) { return; } (s.items || []).forEach(function (i) { if (i.name === nm) { v += parseFloat(f === 'plan' ? (i.ytd || 0) : (i.total_posted_amt || 0)); } }); (s.sub_heads || []).forEach(function (sub) { (sub.items || []).forEach(function (i) { if (i.name === nm) { v += parseFloat(f === 'plan' ? (i.ytd || 0) : (i.total_posted_amt || 0)); } }); }); }); return v; }
// 		function grandVal(e, f) {
// 			var gt = 0, found = false;
// 			(e.actuals || []).forEach(function (s) {
// 				if (isGT(s)) { gt += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); found = true; }
// 			});
// 			if (!found) {
// 				(e.actuals || []).forEach(function (s) { gt += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); });
// 			}
// 			return gt;
// 		}
// 		function secTP(sn) { var v = 0; rawData.forEach(function (e) { v += secVal(e, sn, 'plan'); }); return v; }
// 		function secTE(sn) { var v = 0; rawData.forEach(function (e) { v += secVal(e, sn, 'est'); }); return v; }
// 		function subTP(sn, subn) { var v = 0; rawData.forEach(function (e) { v += subVal(e, sn, subn, 'plan'); }); return v; }
// 		function subTE(sn, subn) { var v = 0; rawData.forEach(function (e) { v += subVal(e, sn, subn, 'est'); }); return v; }
// 		function iTotP(n) { var v = 0; rawData.forEach(function (e) { v += itemVal(e, n, 'plan'); }); return v; }
// 		function iTotE(n) { var v = 0; rawData.forEach(function (e) { v += itemVal(e, n, 'est'); }); return v; }
// 		function allGP() { var v = 0; rawData.forEach(function (e) { v += grandVal(e, 'plan'); }); return v; }
// 		function allGE() { var v = 0; rawData.forEach(function (e) { v += grandVal(e, 'est'); }); return v; }
// 		function cellsPair(getP, getE) { var h = ''; rawData.forEach(function (e) { h += '<td>' + formatINR(getP(e)) + '</td><td>' + formatINR(getE(e)) + '</td>'; }); return h; }
// 		function tc2(plan, est, cls) { cls = cls || ''; return '<td class="be-total-plan ' + cls + '" style="font-weight:700;">' + formatINR(plan) + '</td><td class="be-total-est ' + cls + '" style="font-weight:700;">' + formatINR(est) + '</td>'; }
// 		function buildStruct() { if (!rawData.length) { return []; } return (rawData[0].actuals || []).filter(function (s) { return !isGT(s); }).map(function (s) { return { name: s.name, sub_heads: (s.sub_heads || []).map(function (sub) { return { name: sub.name, items: (sub.items || []).map(function (i) { return { name: i.name }; }) }; }), items: (s.items || []).map(function (i) { return { name: i.name }; }) }; }); }
// 		function buildHeader() {
// 			var $t = $('#be-table thead').empty(), $r1 = $('<tr class="cb-thead-main"></tr>'), $r2 = $('<tr class="cb-thead-sub"></tr>');
// 			$r1.append('<th rowspan="2" style="text-align:left !important;min-width:280px;position:sticky;left:0;z-index:50;background:#0076B6;vertical-align:middle;">Expense Head / Line Item</th>');
// 			rawData.forEach(function (e) { $r1.append('<th colspan="2" style="text-align:center;min-width:260px;">' + (e.label || '').trim() + '</th>'); });
// 			$r1.append('<th colspan="2" style="text-align:center;min-width:260px;background:#003B63;">Grand Total</th>');
// 			rawData.forEach(function () { $r2.append('<th style="text-align:center;min-width:130px;">' + pl() + '</th><th style="text-align:center;min-width:130px;">' + el() + '</th>'); });
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">' + pl() + '</th><th style="text-align:center;min-width:130px;background:#004F8B;">' + el() + '</th>');
// 			$t.append($r1).append($r2); fixStickySubHeader('#be-table');
// 		}
// 		function renderTable() {
// 			buildHeader();
// 			var $tb = $('#be-tbody').empty(), term = $('#be-search').val().trim().toLowerCase(), struct = buildStruct();
// 			if (!rawData.length || !struct.length) { $tb.append('<tr><td colspan="' + (1 + rawData.length * 2 + 2) + '" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>'); return; }
// 			struct.forEach(function (sec) {
// 				var sn = sec.name;
// 				var secOpen = openSec[sn] === true;
// 				var secVis = secOpen ? '' : 'display:none;';
// 				$tb.append('<tr class="cb-row-head be-sec-row" data-sec="' + sn + '"><td style="text-align:left;"><span class="cb-arrow">' + (secOpen ? '\u25bc' : '\u25b6') + '</span> ' + sn + '</td>' +
// 					cellsPair(function (e) { return secVal(e, sn, 'plan'); }, function (e) { return secVal(e, sn, 'est'); }) +
// 					tc2(secTP(sn), secTE(sn), 'be-grand-col') + '</tr>');
// 				sec.sub_heads.forEach(function (sub) {
// 					var sk = sn + '::' + sub.name, subOpen = expandItems || (openSub[sk] === true), itmVis = (secOpen && subOpen) ? '' : 'display:none;';
// 					$tb.append('<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="' + sn + '" data-sub="' + sk + '" style="' + secVis + '"><td style="padding-left:22px;text-align:left;"><span class="cb-arrow">' + (subOpen ? '\u25bc' : '\u25b6') + '</span> ' + sub.name + '</td>' +
// 						cellsPair(function (e) { return subVal(e, sn, sub.name, 'plan'); }, function (e) { return subVal(e, sn, sub.name, 'est'); }) +
// 						tc2(subTP(sn, sub.name), subTE(sn, sub.name), 'be-grand-col') + '</tr>');
// 					sub.items.forEach(function (item) {
// 						if (term && item.name.toLowerCase().indexOf(term) === -1) { return; }
// 						$tb.append('<tr class="be-item-row be-sec-child be-sub-child" data-sec="' + sn + '" data-sub="' + sk + '" style="' + itmVis + '"><td style="padding-left:42px;text-align:left;">' + item.name + '</td>' +
// 							cellsPair(function (e) { return itemVal(e, item.name, 'plan'); }, function (e) { return itemVal(e, item.name, 'est'); }) +
// 							tc2(iTotP(item.name), iTotE(item.name), 'be-grand-col') + '</tr>');
// 					});
// 				});
// 				sec.items.forEach(function (item) {
// 					if (term && item.name.toLowerCase().indexOf(term) === -1) { return; }
// 					$tb.append('<tr class="be-item-row be-sec-child be-direct-item" data-sec="' + sn + '" style="' + secVis + '"><td style="padding-left:30px;text-align:left;">' + item.name + '</td>' +
// 						cellsPair(function (e) { return itemVal(e, item.name, 'plan'); }, function (e) { return itemVal(e, item.name, 'est'); }) +
// 						tc2(iTotP(item.name), iTotE(item.name), 'be-grand-col') + '</tr>');
// 				});
// 			});
// 			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>' + cellsPair(function (e) { return grandVal(e, 'plan'); }, function (e) { return grandVal(e, 'est'); }) + tc2(allGP(), allGE(), 'be-grand-col') + '</tr>');
// 			fixStickySubHeader('#be-table');
// 		}
// 		function toggleSec(sn) { var o = !(openSec[sn] === true); openSec[sn] = o; $('#be-table tbody .be-sec-row[data-sec="' + sn + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); var $ch = $('#be-table tbody .be-sec-child[data-sec="' + sn + '"]'); if (o) { $ch.filter('.be-sub-row,.be-direct-item').show(); $ch.filter('.be-sub-child').each(function () { if (expandItems || openSub[$(this).attr('data-sub')] === true) { $(this).show(); } }); } else { $ch.hide(); } }
// 		function toggleSubRow(sk) { var o = !(openSub[sk] === true); openSub[sk] = o; $('#be-table tbody .be-sub-row[data-sub="' + sk + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); var $it = $('#be-table tbody .be-sub-child[data-sub="' + sk + '"]'); o ? $it.show() : $it.hide(); }
// 		function bindEvents() {
// 			$('#tab-budget_estimate').on('click.be', '.be-sec-row', function (e) { e.stopPropagation(); toggleSec($(this).attr('data-sec')); });
// 			$('#tab-budget_estimate').on('click.be', '.be-sub-row', function (e) { e.stopPropagation(); if (!expandItems) { toggleSubRow($(this).attr('data-sub')); } });
// 			$(document).on('change.be', '#be-expand-items', function () { expandItems = this.checked; buildStruct().forEach(function (sec) { openSec[sec.name] = expandItems; sec.sub_heads.forEach(function (sub) { openSub[sec.name + '::' + sub.name] = expandItems; }); }); renderTable(); });
// 			$(document).on('input.be', '#be-search', function () { renderTable(); });
// 		}
// 		function load(fy) {
// 			if (!bound) { bindEvents(); bound = true; }
// 			currentFY = fy; rawData = []; openSec = {}; openSub = {}; expandItems = false;
// 			$('#be-expand-items').prop('checked', false);
// 			Loader.show('Building Budget & Estimate\u2026');
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 				args: { financial_year: fy, month: 'March', table_name_filter: 'Budget & Estimate' },
// 				callback: function (r) {
// 					Loader.hide();
// 					var d = Array.isArray(r.message) ? r.message : ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
// 					if (!d || !d.length) { frappe.msgprint('No data returned for Budget & Estimate.'); renderTable(); return; }
// 					rawData = d.filter(function (e) {
// 						return e.is_this_sub_item === 0
// 							&& e.sequence_id !== 9999
// 							&& (e.table_name || '').toUpperCase() !== 'CONSOLIDATED';
// 					}).sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
// 					Store.budgetEstimate = rawData; renderTable();
// 				},
// 				error: function () { Loader.hide(); frappe.msgprint('Server error loading Budget & Estimate data.'); }
// 			});
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// EXPORT WIRING
// 	// =============================================================================

// 	var API = 'annual_budget.api.export_reports';
// 	$(document).on('click', '#xl-ppt', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.ppt.rows.length) { frappe.msgprint('Please wait for the Foundation Metrics data to load first.'); return; } serverExport(API + '.export_ppt', { financial_year: fy, ppt_rows: JSON.stringify(Store.ppt.rows), prev_ppt_rows: JSON.stringify(Store.ppt.prevRows), budget_label: Store.ppt.budgetLabel, est_label: Store.ppt.estLabel, prev_budget_label: Store.ppt.prevBudgetLabel, prev_est_label: Store.ppt.prevEstLabel }, 'Building Foundation Metrics Excel\u2026'); });
// 	$(document).on('click', '#xl-summary-inr', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.summaryInr.length) { frappe.msgprint('Please wait for the Summary in INR data to load first.'); return; } serverExport(API + '.export_summary_inr', { financial_year: fy, summary_data: JSON.stringify(Store.summaryInr) }, 'Building Summary in INR Excel\u2026'); });
// 	$(document).on('click', '#xl-headcount', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.headcount.length) { frappe.msgprint('Please wait for the Headcount data to load first.'); return; } serverExport(API + '.export_headcount', { financial_year: fy, headcount_data: JSON.stringify(Store.headcount) }, 'Building Headcount Excel\u2026'); });
// 	$(document).on('click', '#xl-annual', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.annual.length) { frappe.msgprint('Please open the Annual Budget tab first.'); return; } serverExport(API + '.export_annual', { financial_year: fy, annual_data: JSON.stringify(Store.annual) }, 'Building Annual Budget Excel\u2026'); });
// 	$(document).on('click', '#xl-estimate', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.estimate.length) { frappe.msgprint('Please open the Estimate tab first.'); return; } serverExport(API + '.export_estimate', { financial_year: fy, estimate_data: JSON.stringify(Store.estimate) }, 'Building Estimate Excel\u2026'); });
// 	$(document).on('click', '#xl-be', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.budgetEstimate.length) { frappe.msgprint('Please open the Budget & Estimate tab first.'); return; } serverExport(API + '.export_budget_estimate', { financial_year: fy, be_data: JSON.stringify(Store.budgetEstimate) }, 'Building Budget & Estimate Excel\u2026'); });
// 	$(document).on('click', '#xl-export-all', function () {
// 		var fy = fyControl.get_value() || '2025-26', missing = [];
// 		if (!Store.ppt.rows.length)      { missing.push('Foundation Metrics (tab 1)'); }
// 		if (!Store.summaryInr.length)     { missing.push('Summary in INR (tab 2)'); }
// 		if (!Store.headcount.length)      { missing.push('Headcount (tab 3)'); }
// 		if (!Store.annual.length)         { missing.push('Annual Budget (tab 4)'); }
// 		if (!Store.estimate.length)       { missing.push('Estimate (tab 5)'); }
// 		if (!Store.budgetEstimate.length) { missing.push('Budget & Estimate (tab 6)'); }
// 		if (missing.length) { frappe.msgprint('Please open each tab first.<br><br>Still loading: <b>' + missing.join(', ') + '</b>'); return; }
// 		serverExport(API + '.export_all', { financial_year: fy, ppt_rows: JSON.stringify(Store.ppt.rows), prev_ppt_rows: JSON.stringify(Store.ppt.prevRows), budget_label: Store.ppt.budgetLabel, est_label: Store.ppt.estLabel, prev_budget_label: Store.ppt.prevBudgetLabel, prev_est_label: Store.ppt.prevEstLabel, summary_data: JSON.stringify(Store.summaryInr), headcount_data: JSON.stringify(Store.headcount), annual_data: JSON.stringify(Store.annual), estimate_data: JSON.stringify(Store.estimate), be_data: JSON.stringify(Store.budgetEstimate) }, 'Building full consolidated Excel\u2026');
// 	});

// 	// =============================================================================
// 	// AUTO-LOAD
// 	// =============================================================================

// 	if (fyControl.get_value()) { TabLoader.trigger('ppt'); }

// };



frappe.pages['consolidated-budget'].on_page_load = function (wrapper) {

	// =============================================================================
	// PAGE SETUP
	// =============================================================================

	var page = frappe.ui.make_app_page({
		parent: wrapper, title: 'Foundation - Consolidated Budget', single_column: true
	});

	setTimeout(function () {
		$(wrapper).find('#xl-export-all').remove();
		var $btn = $(
			'<button class="btn btn-default btn-sm" id="xl-export-all" style="display:inline-flex;align-items:center;gap:5px;margin-left:8px;background:#1a1a1a;color:#fff;border-color:#1a1a1a;">' +
			svgIcon() + 'Export All</button>'
		);
		var $pa = $(wrapper).find('.page-actions');
		if ($pa.length) { $pa.prepend($btn); }
	}, 300);

	function updatePageTitle(fy) {
		page.set_title('Foundation - Consolidated Budget - ' + fy);
		setTimeout(function () {
			$(wrapper).find('.page-head h3').hide();
			$(wrapper).find('.page-head .title-text').css({ 'font-size': '20px', 'font-weight': '700', 'color': '#1a1a1a' });
		}, 100);
	}

	// =============================================================================
	// FY HELPERS
	// =============================================================================

	function getFYLabels(fy) {
		var p = (fy || '2025-26').split('-');
		var sYY = p[0] ? p[0].slice(-2) : '25';
		var eYY = p[1] ? p[1].slice(-2) : '26';
		var ps = String(parseInt(sYY, 10) - 1).padStart(2, '0');
		var pe = String(parseInt(eYY, 10) - 1).padStart(2, '0');
		return { plan: 'FY' + sYY + '-' + eYY + ' Plan', est: 'FY' + ps + '-' + pe + ' Estimate' };
	}

	function getPrevFY(fy) {
		var p = (fy || '2025-26').split('-');
		return (parseInt(p[0] || '2025', 10) - 1) + '-' + String(parseInt(p[1] || '26', 10) - 1).padStart(2, '0');
	}

	// =============================================================================
	// LOADER
	// =============================================================================

	if (!$('#global-loader').length) {
		$('body').append(
			'<div id="global-loader" class="loader-overlay">' +
			'<div class="loader-box"><img src="/files/APF logo.png" class="loader-logo" alt="">' +
			'<div class="loader-text">Loading, please wait</div></div></div>'
		);
	}
	$('#global-loader').hide();

	var Loader = {
		show: function (msg) {
			var $l = $('#global-loader');
			$l.find('.loader-text').text(msg || 'Loading, please wait');
			$l.css('display', 'flex').hide().fadeIn(200);
		},
		hide: function () { $('#global-loader').fadeOut(200); }
	};

	// =============================================================================
	// STORE
	// =============================================================================

	var Store = {
		ppt: { rows: [], prevRows: [], budgetLabel: '', estLabel: '', prevBudgetLabel: '', prevEstLabel: '' },
		summaryInr: [], headcount: [], annual: [], estimate: [], budgetEstimate: []
	};

	// =============================================================================
	// STYLES
	// =============================================================================

	$(page.body).append(
		'<style>' +
		':root{' +
		'--font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
		'--fs-xs:13px;--fs-sm:14px;--fs-base:15px;--fs-md:16px;--fs-lg:17px;--fs-xl:18px;' +
		'--fw-n:400;--fw-m:500;--fw-sb:600;--fw-b:700;' +
		'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
		'--orange:#F26B21;--orange-light:#FFF3E6;' +
		'--bdl:#9baab5;--bdh:#004a75;--bdo:#a84808;' +
		'--txt:#1a1a1a;--txt2:#36414c;--muted:#555;' +
		'}' +
		'.cb-wrapper{padding:15px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.5;}' +
		'.cb-wrapper *{box-sizing:border-box;}' +
		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
		'#cb-tab-nav li{display:inline-block;}' +
		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:9px 18px;color:var(--muted);font-size:var(--fs-md);font-weight:var(--fw-m);background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s,border-color .15s;}' +
		'#cb-tab-nav .cb-tab-link.active{color:var(--blue-dark);font-weight:var(--fw-b);border-bottom:3px solid var(--blue-dark);}' +
		'#cb-tab-nav .cb-tab-link:hover{color:var(--blue-dark);}' +
		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +
		'.cb-filter-row{padding:8px 0;margin-bottom:10px;}' +
		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
		'@media(max-width:768px){.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +
		'.cb-controls{display:flex;align-items:center;padding:7px 12px;margin-bottom:12px;background:#f7f9fb;border:1px solid #e2e6ea;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
		'.cb-controls-left{display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap;}' +
		'.cb-controls-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}' +
		'.cb-search-wrap{position:relative;display:flex;align-items:center;}' +
		'.cb-search-wrap .search-icon{position:absolute;left:8px;color:#8d99a6;pointer-events:none;}' +
		'.cb-search-input{padding:5px 8px 5px 28px;border:1.5px solid var(--bdl);border-radius:4px;font-family:var(--font);font-size:var(--fs-sm);color:var(--txt2);background:#fff;width:220px;height:32px;transition:border-color .15s,box-shadow .15s;}' +
		'.cb-search-input:focus{outline:none;border-color:#5e64ff;box-shadow:0 0 0 2px rgba(94,100,255,.15);}' +
		'.cb-checkbox-area{display:flex;gap:12px;align-items:center;}' +
		'.cb-check-label{display:flex;align-items:center;gap:5px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-m);color:var(--txt2);cursor:pointer;user-select:none;white-space:nowrap;}' +
		'.cb-check-label input[type=checkbox]{width:14px;height:14px;cursor:pointer;accent-color:#5e64ff;}' +
		'.cb-xl-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;height:32px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-sb);cursor:pointer;white-space:nowrap;border:1px solid #1a1a1a;border-radius:4px;background:#1a1a1a;color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.15);transition:background .15s;}' +
		'.cb-xl-btn:hover{background:#333;}.cb-xl-btn svg{flex-shrink:0;color:#fff;}' +
		'#xl-export-all svg{vertical-align:middle;margin-right:3px;}' +
		'.cb-scroll-wrapper{border:1.5px solid var(--bdl);border-radius:6px;overflow:auto;max-height:72vh;background:#fff;position:relative;isolation:isolate;}' +

		/* ══ NUCLEAR BORDER FIX — scoped under .cb-wrapper ══ */
		'.cb-wrapper table{border-collapse:collapse !important;border-spacing:0 !important;}' +
		'.cb-wrapper table th,.cb-wrapper table td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;text-align:right;font-family:var(--font);font-size:var(--fs-base);}' +
		'.cb-wrapper table th:first-child,.cb-wrapper table td:first-child{text-align:left !important;}' +
		'.cb-wrapper table thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-xl);font-weight:var(--fw-b);text-align:center !important;position:sticky;top:0;z-index:25;border:1.5px solid var(--bdh) !important;padding:10px 12px;letter-spacing:.1px;}' +
		'.cb-wrapper table thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-sb);text-align:center !important;position:sticky;top:0;z-index:24;border:1.5px solid var(--bdo) !important;min-width:110px;padding:8px 12px;}' +
		'.cb-wrapper table tr.cb-row-head td{background:var(--blue-light) !important;color:var(--blue-dark);font-weight:var(--fw-b);border:1.5px solid var(--bdl) !important;cursor:pointer;}' +
		'.cb-wrapper table tr.cb-row-head:hover td{background:#d0e8f5 !important;}' +
		'.cb-wrapper table tr.cb-row-sub td{background:var(--orange-light) !important;font-weight:var(--fw-sb);border:1.5px solid var(--bdl) !important;cursor:pointer;}' +
		'.cb-wrapper table tr.cb-row-sub:hover td{background:#ffe0c2 !important;}' +
		'.cb-wrapper table tr.cb-row-grand td{background:var(--blue-mid) !important;color:#fff !important;font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;}' +
		'.cb-wrapper table tr.ppt-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:var(--fw-b);border:1.5px solid #9baab5 !important;}' +
		'.cb-wrapper table tr.sinr-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:var(--fw-b) !important;border:1.5px solid #9baab5 !important;}' +
		'.cb-wrapper .ppt-table-wrap tbody tr td{background:#fff;color:var(--txt);font-weight:var(--fw-n);}' +

		/* ── Non-border cosmetic rules ── */
		'.cb-table,.ppt-table-wrap{width:100%;table-layout:auto;font-family:var(--font);font-size:var(--fs-base);color:var(--txt);line-height:1.45;}' +
		'.cb-text-accent{color:var(--blue-mid);font-weight:var(--fw-sb);}' +
		'.ppt-title-bar{margin:14px 0 4px;}' +
		'.ppt-main-title{font-family:var(--font);font-size:var(--fs-md);font-weight:var(--fw-b);text-transform:uppercase;text-decoration:underline;letter-spacing:.4px;color:var(--txt);}' +
		'.ppt-currency-label{font-family:var(--font);font-size:var(--fs-sm);font-style:italic;color:var(--muted);text-align:right;margin-bottom:6px;}' +
		'.ppt-currency-label strong{font-weight:var(--fw-b);font-size:var(--fs-sm);font-style:normal;}' +
		'.ppt-dash{color:#bbb;text-align:center;display:block;}' +
		'.ppt-sub-item-row td:first-child{padding-left:28px !important;font-style:italic;color:#444;}' +

		/* ── Budget & Estimate sticky col ── */
		'#be-table tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:280px;max-width:280px;white-space:normal;word-break:break-word;background:#fff;}' +
		'#be-table .cb-row-head td:first-child{background:var(--blue-light) !important;}' +
		'#be-table .cb-row-sub td:first-child{background:var(--orange-light) !important;}' +
		'#be-table .cb-row-grand td:first-child{background:var(--blue-mid) !important;}' +
		'#be-table thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:280px;}' +
		'#be-table .be-grand-col{background:#ddeaf7 !important;color:var(--blue-dark);border-left:2px solid var(--blue-mid) !important;}' +
		'#be-table .cb-row-grand .be-grand-col{background:var(--blue-dark) !important;color:#fff !important;}' +
		'#be-table .cb-row-head .be-grand-col{background:var(--blue-dark) !important;color:#fff !important;}' +
		'#be-table .cb-row-sub .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +
		'#be-table .cb-thead-main th:not(:first-child){min-width:260px;text-align:center !important;}' +
		'#be-table .cb-thead-sub th{min-width:130px;text-align:center !important;}' +
		'#be-table tbody td:first-child,#be-table thead th:first-child{box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +

		/* ── Summary INR labels ── */
		'.sinr-section-label{margin:18px 0 5px;font-family:var(--font);font-size:var(--fs-sm);font-weight:var(--fw-b);color:var(--txt);text-decoration:underline;letter-spacing:.2px;}' +
		'.sinr-currency-note{text-align:right;font-family:var(--font);font-size:var(--fs-xs);font-style:italic;color:var(--muted);margin-bottom:4px;}' +
		'.sinr-sub-item td:first-child{padding-left:22px !important;color:#444;}.sinr-covid-row td{color:#444;}' +

		/* ── sinr-table-a sticky cols ── */
		'#sinr-table-a thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:var(--blue-mid) !important;}' +
		'#sinr-table-a thead tr.cb-thead-sub th:first-child{position:sticky;left:0;z-index:49 !important;background:var(--orange) !important;}' +
		'#sinr-table-a tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +
		'#sinr-table-a .sinr-total-row td:first-child{background:#e8f0fa !important;}' +
		'#sinr-table-a .sinr-covid-row td:first-child{background:#fff;}' +

		/* ── sinr-table-b sticky + layout ── */
		'#sinr-table-b thead tr:nth-child(1) th{position:sticky;top:0;z-index:25;text-align:center !important;padding:10px 12px;}' +
		'#sinr-table-b thead tr:nth-child(2) th{position:sticky;z-index:24;text-align:center !important;padding:8px 12px;min-width:110px;}' +
		'#sinr-table-b thead tr th:first-child{position:sticky !important;left:0;text-align:left !important;min-width:210px;box-shadow:2px 0 5px -2px rgba(0,0,0,.18);}' +
		'#sinr-table-b thead tr:nth-child(1) th:first-child{z-index:55 !important;}' +
		'#sinr-table-b thead tr:nth-child(2) th:first-child{z-index:54 !important;}' +
		'#sinr-table-b tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:210px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +
		'#sinr-table-b tbody tr.sinr-unit-hdr td{background:var(--blue-light) !important;color:var(--blue-dark);font-weight:var(--fw-b);}' +
		'#sinr-table-b tbody tr.sinr-brkdwn-plan td{background:#fff !important;}' +
		'#sinr-table-b tbody tr.sinr-brkdwn-act td{background:#fafafa !important;}' +
		'#sinr-table-b tbody tr.sinr-spacer td{background:#f4f6f8 !important;padding:2px 0;}' +
		'#sinr-table-b tbody tr.sinr-gt-plan td,#sinr-table-b tbody tr.sinr-gt-act td{background:#ddeaf7 !important;color:var(--blue-dark);font-weight:var(--fw-sb);}' +
		'#sinr-table-b tbody td{text-align:right;padding:8px 12px;white-space:nowrap;}' +

		'.hc-section-title{margin:20px 0 6px;font-family:var(--font);font-size:var(--fs-md);font-weight:var(--fw-b);color:var(--blue-dark);text-transform:uppercase;letter-spacing:.4px;border-left:4px solid var(--blue-mid);padding-left:10px;}' +
		'#global-loader.loader-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(18,18,18,.92);backdrop-filter:blur(6px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
		'.loader-box{display:flex;flex-direction:column;align-items:center;gap:14px;}' +
		'.loader-logo{width:90px;height:90px;border-radius:50%;background:linear-gradient(145deg,#fff,#eaeaea);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.35);animation:lp 1.6s infinite ease-in-out;}' +
		'.loader-text{font-family:var(--font);font-size:var(--fs-sm);color:#fff;font-weight:var(--fw-sb);letter-spacing:.5px;opacity:.85;}' +
		'.loader-text::after{content:"";display:inline-block;width:1em;animation:ld 1.5s infinite;}' +
		'@keyframes lp{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.08);opacity:1;}}' +
		'@keyframes ld{0%{content:"";}33%{content:".";}66%{content:"..";}100%{content:"...";}}' +
		/* ── Prevent sticky table headers from painting over Frappe page chrome ── */
		'.cb-wrapper{isolation:isolate;}' +
		'.page-head,.navbar,.navbar-fixed-top,.page-container .page-head{z-index:1000 !important;}' +
		'</style>'
	);

	// =============================================================================
	// SHARED HELPERS
	// =============================================================================

	function svgIcon() {
		return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
			'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
			'<polyline points="14 2 14 8 20 8"/>' +
			'<line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>' +
			'</svg>';
	}

	function fmtCr(v) {
		var n = parseFloat(v) || 0;
		if (!isFinite(n) || n === 0) { return '-'; }
		var res = n / 10000000;
		var neg = res < 0;
		var s   = Math.abs(res).toFixed(2).split('.');
		var ip  = s[0], dp = s[1];
		if (ip.length > 3) {
			ip = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + ip.slice(-3);
		}
		return (neg ? '-' : '') + ip + '.' + dp;
	}

	function fmtCrDash(v) {
		var n = parseFloat(v) || 0;
		return (!isFinite(n) || n === 0) ? '<span class="ppt-dash">-</span>' : fmtCr(n);
	}

	function formatINR(v) {
		var n = Math.round(parseFloat(v) || 0);
		var neg = n < 0, s = String(Math.abs(n));
		if (s.length > 3) { s = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + s.slice(-3); }
		return (neg ? '-' : '') + s;
	}

	function xlBtn(id, label) { return '<button class="cb-xl-btn" id="' + id + '">' + svgIcon() + label + '</button>'; }

	function controlsBar(searchId, placeholder, checks, exportId) {
		var chk = checks.map(function (c) { return '<label class="cb-check-label"><input type="checkbox" id="' + c.id + '"> ' + c.label + '</label>'; }).join('');
		return '<div class="cb-controls"><div class="cb-controls-left">' +
			'<div class="cb-search-wrap"><svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
			'<input type="text" id="' + searchId + '" class="cb-search-input" placeholder="' + placeholder + '"></div>' +
			'<div class="cb-checkbox-area">' + chk + '</div></div>' +
			'<div class="cb-controls-right">' + xlBtn(exportId, 'Export to Excel') + '</div></div>';
	}

	function fixStickySubHeader(sel) {
		var attempts = 0;
		function attempt() {
			var $t = $(sel);
			var $m = $t.find('thead tr.cb-thead-main');
			var $s = $t.find('thead tr.cb-thead-sub');
			if (!$m.length || !$s.length) { return; }
			var h = $m[0].getBoundingClientRect().height;
			if (!h) { h = $m.outerHeight(true) || 0; }
			if (h > 0) {
				$s.find('th').css('top', h + 'px');
			} else if (attempts++ < 10) {
				setTimeout(attempt, 50);
			}
		}
		setTimeout(attempt, 0);
	}

	// =============================================================================
	// HTML SKELETON
	// =============================================================================

	$(page.body).append(
		'<div class="cb-wrapper">' +
		'<div class="frappe-control-group row cb-filter-row" id="cb-filter-row"></div>' +
		'<ul id="cb-tab-nav">' +
		'<li><a class="cb-tab-link active" data-tab="ppt">Foundation level/Overall metrics</a></li>' +
		'<li><a class="cb-tab-link" data-tab="summary_inr">Summary in INR</a></li>' +
		'<li><a class="cb-tab-link" data-tab="headcount">Headcount</a></li>' +
		'<li><a class="cb-tab-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>' +
		'<li><a class="cb-tab-link" data-tab="estimate">Estimate Consolidated</a></li>' +
		'<li><a class="cb-tab-link" data-tab="budget_estimate">Budget &amp; Estimate</a></li>' +
		'</ul><div id="cb-tab-content">' +

		'<div class="cb-tab-pane active" id="tab-ppt">' +
		'<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">' + xlBtn('xl-ppt', 'Export to Excel') + '</div>' +

		/* ── Current year table ── */
		'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-main-title">Overall Foundation - Budget vs. Actual</div></div>' +
		'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
		'<div class="cb-scroll-wrapper" style="margin-bottom:20px;"><table id="ppt-table" class="ppt-table-wrap"><thead>' +
		'<tr class="cb-thead-main"><th rowspan="2" style="min-width:180px;">Unit</th><th colspan="3" id="ppt-budget-hdr">Budget</th><th colspan="3" id="ppt-est-hdr">Estimate</th></tr>' +
		'<tr class="cb-thead-sub"><th>Opex</th><th>Capex</th><th>Total</th><th>Opex</th><th>Capex</th><th>Total</th></tr>' +
		'</thead><tbody id="ppt-tbody"></tbody></table></div>' +

		/* ── Previous year table ── */
		'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-prev-title">Overall Foundation - Previous Year Budget vs. Actual</div></div>' +
		'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
		'<div class="cb-scroll-wrapper" style="margin-bottom:20px;"><table id="ppt-prev-table" class="ppt-table-wrap"><thead>' +
		'<tr class="cb-thead-main"><th rowspan="2" style="min-width:180px;">Unit</th><th colspan="3" id="ppt-prev-budget-hdr">Budget</th><th colspan="3" id="ppt-prev-est-hdr">Estimate</th></tr>' +
		'<tr class="cb-thead-sub"><th>Opex</th><th>Capex</th><th>Total</th><th>Opex</th><th>Capex</th><th>Total</th></tr>' +
		'</thead><tbody id="ppt-prev-tbody"></tbody></table></div>' +

		/* ── Sub-item tables injected here ── */
		'<div id="ppt-sub-tables"></div>' +

		'</div>' + /* end tab-ppt */

		'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
		'<div class="cb-tab-pane" id="tab-headcount"></div>' +

		'<div class="cb-tab-pane" id="tab-annual_budget">' +
		controlsBar('annual-search', 'Search expense / item\u2026', [{ id: 'annual-expand-quarters', label: 'Expand Quarters' }, { id: 'annual-expand-items', label: 'Expand Line Items' }], 'xl-annual') +
		'<div class="cb-scroll-wrapper"><table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table></div></div>' +

		'<div class="cb-tab-pane" id="tab-estimate">' +
		controlsBar('estimate-search', 'Search expense / item\u2026', [{ id: 'estimate-expand-quarters', label: 'Expand Quarters' }, { id: 'estimate-expand-items', label: 'Expand Line Items' }], 'xl-estimate') +
		'<div class="cb-scroll-wrapper"><table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table></div></div>' +

		'<div class="cb-tab-pane" id="tab-budget_estimate">' +
		controlsBar('be-search', 'Search expense / item\u2026', [{ id: 'be-expand-items', label: 'Expand Line Items' }], 'xl-be') +
		'<div class="cb-scroll-wrapper"><table class="cb-table" id="be-table"><thead></thead><tbody id="be-tbody"></tbody></table></div></div>' +

		'</div></div>'
	);

	// =============================================================================
	// FINANCIAL YEAR FILTER
	// =============================================================================

	var fyControl = frappe.ui.form.make_control({
		parent: $('<div class="col-md-3 col-sm-12"></div>').appendTo('#cb-filter-row'),
		df: {
			label: 'Financial Year', fieldtype: 'Select', fieldname: 'financial_year', reqd: 1,
			change: function () {
				var y = this.get_value(); if (!y) { return; }
				updatePageTitle(y); TabLoader.resetAll();
				TabLoader.trigger($('#cb-tab-nav .cb-tab-link.active').data('tab'));
			}
		},
		render_input: true
	});
	fyControl.refresh();

	frappe.call({
		method: 'annual_budget.api.filter_options.get_financial_year_list',
		callback: function (r) {
			if (!r.message || !r.message.length) { return; }
			var years = r.message.map(function (d) { return d.financial_year; });
			fyControl.df.options = years.join('\n'); fyControl.refresh();
			var today = new Date(), y = today.getFullYear(), m = today.getMonth() + 1;
			var cur = (m >= 4 ? y : y - 1) + '-' + String(m >= 4 ? y + 1 : y).slice(-2);
			var target = years.indexOf(cur) !== -1 ? cur : years[0];
			fyControl.set_value(target); updatePageTitle(target);
		}
	});

	// =============================================================================
	// TAB SWITCHING + LOADER
	// =============================================================================

	$(document).on('click', '#cb-tab-nav .cb-tab-link', function () {
		var tab = $(this).data('tab');
		$('#cb-tab-nav .cb-tab-link').removeClass('active'); $('.cb-tab-pane').removeClass('active');
		$(this).addClass('active'); $('#tab-' + tab).addClass('active');
		TabLoader.trigger(tab);
	});

	var TabLoader = (function () {
		var loaded = {};
		var map = {
			ppt: function (fy) { PPT.load(fy); },
			summary_inr: function (fy) { SummaryINR.load(fy); },
			headcount: function (fy) { Headcount.load(fy); },
			annual_budget: function (fy) { Annual.load(fy); },
			estimate: function (fy) { Estimate.load(fy); },
			budget_estimate: function (fy) { BudgetEstimate.load(fy); }
		};
		return {
			trigger: function (tab) {
				if (!map[tab]) { return; }
				var fy = fyControl.get_value() || '2025-26';
				if (loaded[tab] === fy) { return; }
				loaded[tab] = fy; map[tab](fy);
			},
			resetAll: function () { loaded = {}; }
		};
	})();

	// =============================================================================
	// EXCEL EXPORT
	// =============================================================================

	function serverExport(method, args, msg) {
		Loader.show(msg || 'Preparing your Excel file');
		frappe.call({
			method: method, args: args,
			callback: function (r) {
				Loader.hide();
				if (r.message && r.message.data) {
					var bin = atob(r.message.data), bytes = new Uint8Array(bin.length);
					for (var i = 0; i < bin.length; i++) { bytes[i] = bin.charCodeAt(i); }
					var url = URL.createObjectURL(new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
					var a = document.createElement('a'); a.href = url; a.download = r.message.filename;
					document.body.appendChild(a); a.click();
					setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
				} else { frappe.msgprint('Export failed \u2014 no data returned.'); }
			},
			error: function () { Loader.hide(); frappe.msgprint('Server error during export.'); }
		});
	}

	// =============================================================================
	// PPT MODULE
	// =============================================================================

	var PPT = (function () {
		var currentFY = '';

		function normSec(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }

		function extractVals(sections, field) {
			var opex = 0, capex = 0, hasBreakdown = false;
			(sections || []).forEach(function (sec) {
				var nm = normSec(sec.name);
				if (sec.sequence_id === 9999 || nm === 'GRAND TOTAL') { return; }
				if (nm.indexOf('OPERATING') !== -1) { opex  += parseFloat(sec[field] || 0); hasBreakdown = true; }
				if (nm.indexOf('CAPITAL')   !== -1) { capex += parseFloat(sec[field] || 0); hasBreakdown = true; }
			});
			if (!hasBreakdown) {
				(sections || []).forEach(function (sec) {
					if (sec.sequence_id === 9999 || normSec(sec.name) === 'GRAND TOTAL') {
						opex += parseFloat(sec[field] || 0);
					}
				});
				if (!opex) {
					(sections || []).forEach(function (sec) {
						if (sec.sequence_id !== 9999 && normSec(sec.name) !== 'GRAND TOTAL') {
							opex += parseFloat(sec[field] || 0);
						}
					});
				}
			}
			return { opex: opex, capex: capex };
		}

		function extractTotal(sections, field) {
			var gt = 0;
			(sections || []).forEach(function (sec) {
				if (sec.sequence_id === 9999 || normSec(sec.name) === 'GRAND TOTAL') {
					gt += parseFloat(sec[field] || 0);
				}
			});
			if (!gt) {
				(sections || []).forEach(function (sec) { gt += parseFloat(sec[field] || 0); });
			}
			return gt;
		}

		function buildRows(data, cfg) {
			var rows = (data || []).slice()
				.sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); })
				.map(function (e) {
					var b = extractVals(e[cfg.key] || [], cfg.budgetField);
					var v = extractVals(e[cfg.key] || [], cfg.actualField);
					var bTot = extractTotal(e[cfg.key] || [], cfg.budgetField);
					var eTot = extractTotal(e[cfg.key] || [], cfg.actualField);
					return { label: e.label || '', bOpex: b.opex, bCapex: b.capex, bTotal: bTot, eOpex: v.opex, eCapex: v.capex, eTotal: eTot };
				});
			var tot = { bOpex: 0, bCapex: 0, bTotal: 0, eOpex: 0, eCapex: 0, eTotal: 0 };
			rows.forEach(function (r) { tot.bOpex += r.bOpex; tot.bCapex += r.bCapex; tot.bTotal += r.bTotal; tot.eOpex += r.eOpex; tot.eCapex += r.eCapex; tot.eTotal += r.eTotal; });
			rows.push({ label: 'Total', isTotal: true, bOpex: tot.bOpex, bCapex: tot.bCapex, bTotal: tot.bTotal, eOpex: tot.eOpex, eCapex: tot.eCapex, eTotal: tot.eTotal });
			return rows;
		}

		function renderTable(rows, tbId, bHdr, eHdr, tblId, bLbl, eLbl) {
			$('#' + bHdr).text(bLbl); $('#' + eHdr).text(eLbl);
			var $tb = $('#' + tbId).empty();
			rows.forEach(function (r) {
				$tb.append('<tr class="' + (r.isTotal ? 'ppt-total-row' : '') + '"><td>' + r.label + '</td>' +
					'<td>' + fmtCrDash(r.bOpex) + '</td><td>' + fmtCrDash(r.bCapex) + '</td><td>' + fmtCrDash(r.bTotal) + '</td>' +
					'<td>' + fmtCrDash(r.eOpex) + '</td><td>' + fmtCrDash(r.eCapex) + '</td><td>' + fmtCrDash(r.eTotal) + '</td></tr>');
			});
			fixStickySubHeader('#' + tblId);
		}

		function buildEducationTables(data, cfg, bLbl, eLbl) {
			var subItems = (data || []).filter(function (e) { return e.is_this_sub_item === 1; });
			if (!subItems.length) { return ''; }

			var groups = {}, groupOrder = [];
			subItems.forEach(function (e) {
				var grp = (e.table_name || 'Other').trim();
				if (!groups[grp]) { groups[grp] = []; groupOrder.push(grp); }
				groups[grp].push(e);
			});

			var parentLabelMap = {};
			(data || []).forEach(function (e) {
				if (e.is_this_sub_item === 0) {
					var tn = (e.table_name || '').trim();
					if (tn && !parentLabelMap[tn]) {
						parentLabelMap[tn] = (e.label || tn).trim();
					}
				}
			});

			var html = '';

			groupOrder.forEach(function (grp) {
				var entries = groups[grp].slice()
					.sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });

				var sectionTitle = "EDUCATION";
				var tblId = 'ppt-edu-' + grp.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '');

				var bodyHtml = '';
				var tot = { bOpex: 0, bCapex: 0, bTotal: 0, eOpex: 0, eCapex: 0, eTotal: 0 };

				entries.forEach(function (e) {
					var b    = extractVals(e[cfg.key] || [], cfg.budgetField);
					var v    = extractVals(e[cfg.key] || [], cfg.actualField);
					var bTot = extractTotal(e[cfg.key] || [], cfg.budgetField);
					var eTot = extractTotal(e[cfg.key] || [], cfg.actualField);
					tot.bOpex  += b.opex;  tot.bCapex += b.capex; tot.bTotal += bTot;
					tot.eOpex  += v.opex;  tot.eCapex += v.capex; tot.eTotal += eTot;

					bodyHtml += '<tr>' +
						'<td>' + (e.label || '') + '</td>' +
						'<td>' + fmtCrDash(b.opex)  + '</td>' +
						'<td>' + fmtCrDash(b.capex) + '</td>' +
						'<td>' + fmtCrDash(bTot)    + '</td>' +
						'<td>' + fmtCrDash(v.opex)  + '</td>' +
						'<td>' + fmtCrDash(v.capex) + '</td>' +
						'<td>' + fmtCrDash(eTot)    + '</td></tr>';
				});

				bodyHtml += '<tr class="ppt-total-row">' +
					'<td>Total</td>' +
					'<td>' + fmtCrDash(tot.bOpex)  + '</td>' +
					'<td>' + fmtCrDash(tot.bCapex) + '</td>' +
					'<td>' + fmtCrDash(tot.bTotal) + '</td>' +
					'<td>' + fmtCrDash(tot.eOpex)  + '</td>' +
					'<td>' + fmtCrDash(tot.eCapex) + '</td>' +
					'<td>' + fmtCrDash(tot.eTotal) + '</td></tr>';

				html +=
					'<div class="ppt-title-bar" style="margin-top:28px;">' +
						'<div class="ppt-main-title">' + sectionTitle + '</div>' +
					'</div>' +
					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
					'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
						'<table id="' + tblId + '" class="ppt-table-wrap">' +
							'<thead>' +
								'<tr class="cb-thead-main">' +
									'<th rowspan="2" style="min-width:200px;text-align:left !important;">Unit</th>' +
									'<th colspan="3" style="text-align:center !important;">' + bLbl + '</th>' +
									'<th colspan="3" style="text-align:center !important;">' + eLbl + '</th>' +
								'</tr>' +
								'<tr class="cb-thead-sub">' +
									'<th>Opex</th><th>Capex</th><th>Total</th>' +
									'<th>Opex</th><th>Capex</th><th>Total</th>' +
								'</tr>' +
							'</thead>' +
							'<tbody>' + bodyHtml + '</tbody>' +
						'</table>' +
					'</div>';
			});

			return html;
		}

		function buildOpexBudgetTable(entries, fyLabel) {
			if (!entries || !entries.length) { return ''; }

			function isOpex(name) {
				return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('OPERATING') !== -1;
			}

			function getSubPlan(e, subName) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					if (!isOpex(s.name)) { return; }
					(s.sub_heads || []).forEach(function (sub) {
						if ((sub.name || '').trim() === subName) {
							v += parseFloat(sub.ytd || 0);
						}
					});
				});
				return v;
			}

			function getOpexPlan(e) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					if (isOpex(s.name)) {
						v += parseFloat(s.ytd || 0);
					}
				});
				return v;
			}

			var subHeadNames = [], seen = {};
			entries.forEach(function (e) {
				(e.actuals || []).forEach(function (s) {
					if (!isOpex(s.name)) { return; }
					(s.sub_heads || []).forEach(function (sub) {
						var n = (sub.name || '').trim();
						if (n && !seen[n]) { seen[n] = true; subHeadNames.push(n); }
					});
				});
			});

			if (!subHeadNames.length) { return ''; }

			var tblId = 'ppt-opex-budget-tbl';

			if (!$('#ppt-opex-style').length) {
				$('head').append(
					'<style id="ppt-opex-style">' +
					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;}' +
					'#' + tblId + ' thead tr.cb-thead-main th{border:1.5px solid var(--bdh) !important;}' +
					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:50 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:260px;border:1.5px solid var(--bdh) !important;}' +
					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:260px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;border:1.5px solid var(--bdh) !important;}' +
					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;border:1.5px solid #aaa !important;}' +
					'</style>'
				);
			}

			var hdrR1 = '<tr class="cb-thead-main">' +
				'<th style="min-width:260px;text-align:left !important;">Expense Category</th>';
			entries.forEach(function (e) {
				hdrR1 += '<th style="min-width:150px;text-align:center !important;">' + (e.label || '').trim() + '</th>';
			});
			hdrR1 += '<th style="min-width:150px;text-align:center !important;background:var(--blue-dark);">Grand Total</th></tr>';

			var bodyHtml = '';
			var colTotals = [];
			entries.forEach(function () { colTotals.push(0); });
			var grandRowTotal = 0;

			subHeadNames.forEach(function (subName) {
				var rowTotal = 0, cells = '';
				entries.forEach(function (e, ei) {
					var v = getSubPlan(e, subName);
					colTotals[ei] += v;
					rowTotal += v;
					cells += '<td>' + fmtCrDash(v) + '</td>';
				});
				grandRowTotal += rowTotal;
				bodyHtml += '<tr>' +
					'<td>' + subName + '</td>' +
					cells +
					'<td style="font-weight:700;background:#ddeaf7;color:var(--blue-dark);border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(rowTotal) + '</td>' +
				'</tr>';
			});

			var totalCells = '';
			var opexGrandTotal = 0;
			entries.forEach(function (e) {
				var v = getOpexPlan(e);
				opexGrandTotal += v;
				totalCells += '<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(v) + '</td>';
			});
			bodyHtml += '<tr class="ppt-total-row">' +
				'<td>Total</td>' +
				totalCells +
				'<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(opexGrandTotal) + '</td>' +
			'</tr>';

			var fyPart = fyLabel.replace(/\s*budget\s*/i, '').trim();

			return '<div class="ppt-title-bar" style="margin-top:36px;">' +
					'<div class="ppt-main-title">OPERATING EXPENSES ' + fyPart + '</div>' +
				'</div>' +
				'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
				'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
					'<table id="' + tblId + '" class="cb-table">' +
						'<thead>' + hdrR1 + '</thead>' +
						'<tbody>' + bodyHtml + '</tbody>' +
					'</table>' +
				'</div>';
		}

		// ── CAPITAL EXPENSES TABLE ─────────────────────────────────────────────────
		// Rows = items directly inside the CAPITAL EXPENSES section (not sub_heads).
		// Same Cr formatting, same sticky first-col, same Grand Total column.
		// ──────────────────────────────────────────────────────────────────────────

		function buildCapexBudgetTable(entries, fyLabel) {
			if (!entries || !entries.length) { return ''; }

			function isCapex(name) {
				return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('CAPITAL') !== -1;
			}

			function getItemPlan(e, itemName) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					if (!isCapex(s.name)) { return; }
					(s.items || []).forEach(function (item) {
						if ((item.name || '').trim() === itemName) {
							v += parseFloat(item.ytd || 0);
						}
					});
				});
				return v;
			}

			function getCapexPlan(e) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					if (isCapex(s.name)) {
						v += parseFloat(s.ytd || 0);
					}
				});
				return v;
			}

			var itemNames = [], seen = {};
			entries.forEach(function (e) {
				(e.actuals || []).forEach(function (s) {
					if (!isCapex(s.name)) { return; }
					(s.items || []).forEach(function (item) {
						var n = (item.name || '').trim();
						if (n && !seen[n]) { seen[n] = true; itemNames.push(n); }
					});
				});
			});

			if (!itemNames.length) { return ''; }

			var tblId = 'ppt-capex-budget-tbl';

			if (!$('#ppt-capex-style').length) {
				$('head').append(
					'<style id="ppt-capex-style">' +
					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;}' +
					'#' + tblId + ' thead tr.cb-thead-main th{border:1.5px solid var(--bdh) !important;}' +
					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:50 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:260px;border:1.5px solid var(--bdh) !important;}' +
					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:260px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;border:1.5px solid var(--bdh) !important;}' +
					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{background:#e8f0fa !important;border:1.5px solid #aaa !important;}' +
					'</style>'
				);
			}

			var hdrR1 = '<tr class="cb-thead-main">' +
				'<th style="min-width:260px;text-align:left !important;">Expense Category</th>';
			entries.forEach(function (e) {
				hdrR1 += '<th style="min-width:150px;text-align:center !important;">' + (e.label || '').trim() + '</th>';
			});
			hdrR1 += '<th style="min-width:150px;text-align:center !important;background:var(--blue-dark);">Grand Total</th></tr>';

			var bodyHtml = '';
			var grandRowTotal = 0;

			itemNames.forEach(function (itemName) {
				var rowTotal = 0, cells = '';
				entries.forEach(function (e) {
					var v = getItemPlan(e, itemName);
					rowTotal += v;
					cells += '<td>' + fmtCrDash(v) + '</td>';
				});
				grandRowTotal += rowTotal;
				bodyHtml += '<tr>' +
					'<td>' + itemName + '</td>' +
					cells +
					'<td style="font-weight:700;background:#ddeaf7;color:var(--blue-dark);border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(rowTotal) + '</td>' +
				'</tr>';
			});

			var totalCells = '';
			var capexGrandTotal = 0;
			entries.forEach(function (e) {
				var v = getCapexPlan(e);
				capexGrandTotal += v;
				totalCells += '<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(v) + '</td>';
			});
			bodyHtml += '<tr class="ppt-total-row">' +
				'<td>Total</td>' +
				totalCells +
				'<td style="font-weight:700;background:#e8f0fa !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;">' + fmtCrDash(capexGrandTotal) + '</td>' +
			'</tr>';

			var fyPart = fyLabel.replace(/\s*budget\s*/i, '').trim();

			return '<div class="ppt-title-bar" style="margin-top:36px;">' +
					'<div class="ppt-main-title">CAPITAL EXPENSES ' + fyPart + '</div>' +
				'</div>' +
				'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
				'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
					'<table id="' + tblId + '" class="cb-table">' +
						'<thead>' + hdrR1 + '</thead>' +
						'<tbody>' + bodyHtml + '</tbody>' +
					'</table>' +
				'</div>';
		}

		function load(fy) {
			currentFY = fy || '2025-26';
			$('#ppt-tbody,#ppt-prev-tbody').html(
				'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading\u2026</td></tr>'
			);
			$('#ppt-sub-tables').html('');
			Loader.show('Building your foundation metrics');

			frappe.call({
				method: 'annual_budget.api.foundation_consolidated_report.get_foundation_overall',
				args: { financial_year: fy, month: 'March', table_name_filter: 'Foundation Overall' },
				callback: function (r) {
					var d = Array.isArray(r.message)
						? r.message
						: ((r.message && Array.isArray(r.message.message)) ? r.message.message : []);

					if (!d.length) {
						Loader.hide();
						$('#ppt-tbody,#ppt-prev-tbody').html(
							'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>'
						);
						return;
					}

					var p = (fy || '2025-26').split('-');
					var cS = parseInt(p[0], 10), cE = parseInt(p[1], 10);
					var curFY = cS + '-' + String(cE).padStart(2, '0');
					var prvFY = (cS - 1) + '-' + String(cE - 1).padStart(2, '0');

					$('#ppt-main-title').text('Overall Foundation \u2013 ' + curFY + ' Budget vs ' + prvFY + ' Actual');
					$('#ppt-prev-title').text('Overall Foundation \u2013 ' + prvFY + ' Budget vs ' + prvFY + ' Actual');

					var cCfg = { key: 'current_year',  budgetField: 'ytd', actualField: 'total_posted_amt_ytd' };
					var pCfg = { key: 'previous_year', budgetField: 'ytd', actualField: 'total_posted_amt_ytd' };

					var mainData = d.filter(function (e) { return e.is_this_sub_item !== 1; });
					var r0 = buildRows(mainData, cCfg);
					var r1 = buildRows(mainData, pCfg);

					renderTable(r0, 'ppt-tbody',      'ppt-budget-hdr',      'ppt-est-hdr',      'ppt-table',      curFY + ' Budget', prvFY + ' Actual');
					renderTable(r1, 'ppt-prev-tbody', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr', 'ppt-prev-table', prvFY + ' Budget', prvFY + ' Actual');

					var subHtml = buildEducationTables(d, cCfg, curFY + ' Budget', prvFY + ' Actual');
					$('#ppt-sub-tables').html(subHtml);

					$('#ppt-sub-tables .ppt-table-wrap').each(function () {
						var id = $(this).attr('id');
						if (id) { fixStickySubHeader('#' + id); }
					});

					frappe.call({
						method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
						args: { financial_year: fy, month: 'March', table_name_filter: 'Opex Capex' },
						callback: function (r2) {
							Loader.hide();
							var raw = Array.isArray(r2.message) ? r2.message
								: ((r2.message && Array.isArray(r2.message.message)) ? r2.message.message : []);
							var uwp = raw.filter(function (e) {
								return e.is_this_sub_item === 0
									&& e.sequence_id !== 9999
									&& (e.table_name || '').toUpperCase() !== 'CONSOLIDATED';
							}).sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });

							var opexHtml  = buildOpexBudgetTable(uwp, curFY);
							var capexHtml = buildCapexBudgetTable(uwp, curFY);

							$('#ppt-sub-tables').html(subHtml + opexHtml + capexHtml);

							$('#ppt-sub-tables .ppt-table-wrap').each(function () {
								var id = $(this).attr('id');
								if (id) { fixStickySubHeader('#' + id); }
							});
							fixStickySubHeader('#ppt-opex-budget-tbl');
							fixStickySubHeader('#ppt-capex-budget-tbl');
						},
						error: function () { Loader.hide(); }
					});

					var toExp = function (rows) {
						return rows.map(function (r) {
							return {
								label: r.label, bOpex: r.bOpex, bCapex: r.bCapex, bTotal: r.bTotal,
								eOpex: r.eOpex, eCapex: r.eCapex, eTotal: r.eTotal, is_total: !!r.isTotal
							};
						});
					};
					Store.ppt.rows         = toExp(r0);
					Store.ppt.prevRows     = toExp(r1);
					Store.ppt.budgetLabel  = curFY + ' Budget';
					Store.ppt.estLabel     = prvFY + ' Actual';
					Store.ppt.prevBudgetLabel = prvFY + ' Budget';
					Store.ppt.prevEstLabel    = prvFY + ' Actual';
				},
				error: function () {
					Loader.hide();
					$('#ppt-tbody,#ppt-prev-tbody').html(
						'<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>'
					);
				}
			});
		}

		return { load: load };
	})();

	// =============================================================================
	// SUMMARY IN INR MODULE
	// =============================================================================

	var SummaryINR = (function () {
		function normN(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }
		function zero() { return { opex_plan: 0, opex_act: 0, capex_plan: 0, capex_act: 0, total_plan: 0, total_act: 0 }; }
		function addV(a, b) { return { opex_plan: a.opex_plan + b.opex_plan, opex_act: a.opex_act + b.opex_act, capex_plan: a.capex_plan + b.capex_plan, capex_act: a.capex_act + b.capex_act, total_plan: a.total_plan + b.total_plan, total_act: a.total_act + b.total_act }; }
		function extractA(actuals) {
			var r = zero();
			(actuals || []).forEach(function (sec) {
				var nm = normN(sec.name);
				if (nm === 'OPERATING EXPENSES' || nm === 'OPERATING  EXPENSES') { r.opex_plan += parseFloat(sec.ytd || 0); r.opex_act += parseFloat(sec.total_posted_amt_ytd || 0); }
				if (nm === 'CAPITAL EXPENSES'   || nm === 'CAPITAL  EXPENSES')   { r.capex_plan += parseFloat(sec.ytd || 0); r.capex_act += parseFloat(sec.total_posted_amt_ytd || 0); }
			});
			r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act;
			return r;
		}
		function getConsolidatedTotals(data) {
			var ct = null;
			(data || []).forEach(function (e) {
				if (e.sequence_id === 9999 || (e.table_name || '').toUpperCase() === 'CONSOLIDATED') { ct = e; }
			});
			if (!ct) { return null; }
			var r = zero();
			(ct.actuals || []).forEach(function (a) {
				var nm = (a.name || '').toUpperCase().replace(/\s+/g, ' ').trim();
				if (nm === 'OPEX TOTAL')         { r.opex_plan += parseFloat(a.ytd || 0); r.opex_act += parseFloat(a.total_posted_amt_ytd || 0); }
				if (nm === 'CAPEX TOTAL')         { r.capex_plan += parseFloat(a.ytd || 0); r.capex_act += parseFloat(a.total_posted_amt_ytd || 0); }
				if (nm === 'OVERALL GRAND TOTAL') { r.total_plan = parseFloat(a.ytd || 0); r.total_act = parseFloat(a.total_posted_amt_ytd || 0); }
			});
			if (!r.total_plan && !r.total_act) { r.total_plan = r.opex_plan + r.capex_plan; r.total_act = r.opex_act + r.capex_act; }
			return r;
		}
		function buildRowsA(data) {
			var sorted = (data || []).slice().sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
			var norm = [], covid = [];
			sorted.forEach(function (e) {
				if (e.sequence_id === 9999 || (e.table_name || '').toUpperCase() === 'CONSOLIDATED') { return; }
				var lbl = (e.label || '').trim();
				var row = { display: lbl, isSub: e.is_this_sub_item === 1, isCovid: lbl.toLowerCase().indexOf('covid') !== -1, vals: extractA(e.actuals) };
				(row.isCovid ? covid : norm).push(row);
			});
			var gtVals = getConsolidatedTotals(data);
			if (!gtVals) {
				gtVals = zero();
				norm.forEach(function (r) { if (!r.isSub) { gtVals = addV(gtVals, r.vals); } });
				covid.forEach(function (r) { if (!r.isSub) { gtVals = addV(gtVals, r.vals); } });
			}
			var out = norm.slice();
			if (covid.length) { out = out.concat(covid); }
			out.push({ display: 'Grand Total', isTotal: true, isGrandTotal: true, vals: gtVals });
			return out;
		}
		function rowHtmlA(r) {
			var cls = r.isGrandTotal ? 'cb-row-grand' : (r.isTotal ? 'sinr-total-row' : (r.isCovid ? 'sinr-covid-row' : ''));
			var sty = 'text-align:left;' + (r.isSub ? 'padding-left:28px;color:#555;' : '');
			var v = r.vals;
			return '<tr class="' + cls + '"><td style="' + sty + '">' + r.display + '</td><td>' + fmtCr(v.opex_plan) + '</td><td>' + fmtCr(v.capex_plan) + '</td><td>' + fmtCr(v.total_plan) + '</td><td>' + fmtCr(v.opex_act) + '</td><td>' + fmtCr(v.capex_act) + '</td><td>' + fmtCr(v.total_act) + '</td></tr>';
		}
		function tableHtmlA(rows, pLbl, aLbl) {
			return '<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
				'<div class="cb-scroll-wrapper" style="margin-bottom:28px;"><table class="cb-table sinr-table" id="sinr-table-a" style="width:100%;"><thead>' +
				'<tr class="cb-thead-main"><th rowspan="2" style="text-align:left !important;min-width:260px;">Unit / Function</th><th colspan="3" style="text-align:center !important;">' + pLbl + '</th><th colspan="3" style="text-align:center !important;">' + aLbl + '</th></tr>' +
				'<tr class="cb-thead-sub"><th>Opex</th><th>Capex</th><th>Total</th><th>Opex</th><th>Capex</th><th>Total</th></tr>' +
				'</thead><tbody>' + rows.map(rowHtmlA).join('') + '</tbody></table></div>';
		}
		function getSubNames(entries) {
			var seen = {}, names = [];
			entries.forEach(function (e) { (e.actuals || []).forEach(function (sec) { if (normN(sec.name).indexOf('OPERATING') === -1) { return; } (sec.sub_heads || []).forEach(function (sh) { var n = (sh.name || '').trim(); if (n && !seen[n]) { seen[n] = true; names.push(n); } }); }); });
			return names;
		}
		function shVal(actuals, name, field) { var v = 0; (actuals || []).forEach(function (sec) { if (normN(sec.name).indexOf('OPERATING') === -1) { return; } (sec.sub_heads || []).forEach(function (sh) { if ((sh.name || '').trim() === name) { v += parseFloat(field === 'plan' ? (sh.ytd || 0) : (sh.total_posted_amt_ytd || 0)); } }); }); return v; }
		function opT(a, f) { var v = 0; (a || []).forEach(function (s) { if (normN(s.name).indexOf('OPERATING') === -1) { return; } v += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }); return v; }
		function caT(a, f) { var v = 0; (a || []).forEach(function (s) { if (normN(s.name).indexOf('CAPITAL') === -1) { return; } v += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }); return v; }
		function tableHtmlB(entries, shNames, pLbl, aLbl, consolidatedVals) {
			var cc = 1 + shNames.length + 3;
			var hdr = '<tr class="cb-thead-main"><th rowspan="2" style="text-align:left !important;min-width:210px;">Unit / Function</th><th colspan="' + (shNames.length + 1) + '" style="text-align:center !important;">Operating Expenses</th><th rowspan="2" style="text-align:center !important;min-width:110px;">Capex</th><th rowspan="2" style="text-align:center !important;min-width:110px;">Total</th></tr>' +
				'<tr class="cb-thead-sub">' + shNames.map(function (n) { return '<th style="min-width:110px;">' + n + '</th>'; }).join('') + '<th style="min-width:110px;">Total</th></tr>';
			var body = '', gtP = {}, gtA = {};
			shNames.forEach(function (n) { gtP[n] = 0; gtA[n] = 0; });
			var gtOP = 0, gtOA = 0, gtCP = 0, gtCA = 0;
			entries.forEach(function (e) {
				var lbl = (e.label || '').trim(), act = e.actuals || [], sP = {}, sA = {};
				shNames.forEach(function (n) { sP[n] = shVal(act, n, 'plan'); sA[n] = shVal(act, n, 'act'); gtP[n] += sP[n]; gtA[n] += sA[n]; });
				var oP = opT(act, 'plan'), oA = opT(act, 'act'), cP = caT(act, 'plan'), cA = caT(act, 'act');
				gtOP += oP; gtOA += oA; gtCP += cP; gtCA += cA;
				body += '<tr class="sinr-unit-hdr"><td>' + lbl + '</td><td colspan="' + (shNames.length + 3) + '"></td></tr>';
				body += '<tr class="sinr-brkdwn-plan"><td style="padding-left:18px;color:#333;">- ' + pLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(sP[n]) + '</td>'; }).join('') + '<td>' + fmtCr(oP) + '</td><td>' + fmtCr(cP) + '</td><td>' + fmtCr(oP + cP) + '</td></tr>';
				body += '<tr class="sinr-brkdwn-act"><td style="padding-left:18px;color:#555;">- ' + aLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(sA[n]) + '</td>'; }).join('') + '<td>' + fmtCr(oA) + '</td><td>' + fmtCr(cA) + '</td><td>' + fmtCr(oA + cA) + '</td></tr>';
				body += '<tr class="sinr-spacer"><td colspan="' + cc + '"></td></tr>';
			});
			var finalOP = (consolidatedVals && consolidatedVals.opex_plan)  ? consolidatedVals.opex_plan  : gtOP;
			var finalOA = (consolidatedVals && consolidatedVals.opex_act)   ? consolidatedVals.opex_act   : gtOA;
			var finalCP = (consolidatedVals && consolidatedVals.capex_plan) ? consolidatedVals.capex_plan : gtCP;
			var finalCA = (consolidatedVals && consolidatedVals.capex_act)  ? consolidatedVals.capex_act  : gtCA;
			var finalTP = (consolidatedVals && consolidatedVals.total_plan) ? consolidatedVals.total_plan : (gtOP + gtCP);
			var finalTA = (consolidatedVals && consolidatedVals.total_act)  ? consolidatedVals.total_act  : (gtOA + gtCA);
			body += '<tr class="cb-row-grand"><td>Grand Total</td><td colspan="' + (shNames.length + 3) + '"></td></tr>';
			body += '<tr class="sinr-gt-plan"><td style="padding-left:18px;">- ' + pLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(gtP[n]) + '</td>'; }).join('') + '<td>' + fmtCr(finalOP) + '</td><td>' + fmtCr(finalCP) + '</td><td>' + fmtCr(finalTP) + '</td></tr>';
			body += '<tr class="sinr-gt-act"><td style="padding-left:18px;">- ' + aLbl + '</td>' + shNames.map(function (n) { return '<td>' + fmtCr(gtA[n]) + '</td>'; }).join('') + '<td>' + fmtCr(finalOA) + '</td><td>' + fmtCr(finalCA) + '</td><td>' + fmtCr(finalTA) + '</td></tr>';
			return '<div class="cb-scroll-wrapper" style="margin-bottom:24px;"><table id="sinr-table-b" style="width:100%;border-collapse:collapse;"><thead>' + hdr + '</thead><tbody>' + body + '</tbody></table></div>';
		}
		// ── C. Operating Expenses detail: sub_heads as rows, units as cols ──────────
		// Columns: Expense Category | Unit1 Budget | Unit1 Actual | Unit2 Budget | Unit2 Actual | … | Total Budget | Total Actual
		function tableHtmlC(entries, pLbl, aLbl) {
			if (!entries || !entries.length) { return ''; }

			function isOpex(name) { return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('OPERATING') !== -1; }

			// Collect all unique sub_head names across all units
			var shNames = [], shSeen = {};
			entries.forEach(function (e) {
				(e.actuals || []).forEach(function (s) {
					if (!isOpex(s.name)) { return; }
					(s.sub_heads || []).forEach(function (sh) {
						var n = (sh.name || '').trim();
						if (n && !shSeen[n]) { shSeen[n] = true; shNames.push(n); }
					});
				});
			});
			if (!shNames.length) { return ''; }

			function shPlan(e, shName) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					if (!isOpex(s.name)) { return; }
					(s.sub_heads || []).forEach(function (sh) {
						if ((sh.name || '').trim() === shName) { v += parseFloat(sh.ytd || 0); }
					});
				});
				return v;
			}
			function shAct(e, shName) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					if (!isOpex(s.name)) { return; }
					(s.sub_heads || []).forEach(function (sh) {
						if ((sh.name || '').trim() === shName) { v += parseFloat(sh.total_posted_amt_ytd || 0); }
					});
				});
				return v;
			}
			function opexTotal(e, field) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					if (isOpex(s.name)) { v += parseFloat(field === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }
				});
				return v;
			}

			var tblId = 'sinr-table-c';
			if (!$('#sinr-c-style').length) {
				$('head').append(
					'<style id="sinr-c-style">' +
					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;}' +
					'#' + tblId + ' thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-xl);font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;position:sticky;top:0;z-index:25;text-align:center !important;padding:10px 12px;}' +
					'#' + tblId + ' thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-sb);border:1.5px solid var(--bdo) !important;position:sticky;z-index:24;text-align:center !important;min-width:120px;padding:8px 12px;}' +
					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:55 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:220px;vertical-align:middle;}' +
					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:220px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{position:sticky;left:0;z-index:10;background:#e8f0fa !important;}' +
					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;}' +
					'#' + tblId + ' tbody tr.ppt-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:700 !important;}' +
					'#' + tblId + ' .sinr-c-gtcol{background:#ddeaf7 !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;}' +
					'#' + tblId + ' tr.cb-row-grand .sinr-c-gtcol{background:var(--blue-dark) !important;color:#fff !important;}' +
					'#' + tblId + ' tr.ppt-total-row .sinr-c-gtcol{background:#c8ddf0 !important;color:var(--blue-dark) !important;}' +
					'</style>'
				);
			}

			// Header row 1: "Expense Category" spans both header rows via rowspan="2"
			// Unit headers span 2 cols each; Grand Total spans 2 cols
			var hdr1 = '<tr class="cb-thead-main">' +
				'<th rowspan="2" style="min-width:220px;text-align:left !important;vertical-align:middle;position:sticky;left:0;z-index:55 !important;top:0;background:var(--blue-mid) !important;">Expense Category</th>';
			entries.forEach(function (e) {
				hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;">' + (e.label || '').trim() + '</th>';
			});
			hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;background:var(--blue-dark) !important;border:1.5px solid #001f3f !important;">Grand Total</th></tr>';

			// Header row 2: Budget/Actual sub-cols — NO first-col th (rowspan="2" above covers it)
			var hdr2 = '<tr class="cb-thead-sub">';
			entries.forEach(function () {
				hdr2 += '<th style="min-width:120px;text-align:center !important;">' + pLbl + '</th>' +
					    '<th style="min-width:120px;text-align:center !important;">' + aLbl + '</th>';
			});
			hdr2 += '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + pLbl + '</th>' +
				    '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + aLbl + '</th></tr>';

			// Body rows: one per sub_head name
			var bodyHtml = '';
			var gtBudget = 0, gtActual = 0;

			shNames.forEach(function (shName) {
				var rowBudget = 0, rowActual = 0, cells = '';
				entries.forEach(function (e) {
					var bp = shPlan(e, shName);
					var ba = shAct(e, shName);
					rowBudget += bp; rowActual += ba;
					cells += '<td>' + fmtCrDash(bp) + '</td><td>' + fmtCrDash(ba) + '</td>';
				});
				gtBudget += rowBudget; gtActual += rowActual;
				bodyHtml += '<tr><td>' + shName + '</td>' + cells +
					'<td class="sinr-c-gtcol" style="font-weight:700;">' + fmtCrDash(rowBudget) + '</td>' +
					'<td class="sinr-c-gtcol" style="font-weight:700;">' + fmtCrDash(rowActual) + '</td></tr>';
			});

			// Total row: full opex section total per unit
			var totalCells = '';
			var totalBudget = 0, totalActual = 0;
			entries.forEach(function (e) {
				var bp = opexTotal(e, 'plan');
				var ba = opexTotal(e, 'act');
				totalBudget += bp; totalActual += ba;
				totalCells += '<td style="font-weight:700 !important;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(bp) + '</td><td style="font-weight:700 !important;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(ba) + '</td>';
			});
			bodyHtml += '<tr class="ppt-total-row"><td>Total</td>' + totalCells +
				'<td class="sinr-c-gtcol" style="font-weight:700 !important;">' + fmtCrDash(totalBudget) + '</td>' +
				'<td class="sinr-c-gtcol" style="font-weight:700 !important;">' + fmtCrDash(totalActual) + '</td></tr>';

			return '<div class="sinr-section-label" style="margin-top:28px;">C. Operating Expenses</div>' +
				'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
				'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
					'<table id="' + tblId + '" class="cb-table">' +
						'<thead>' + hdr1 + hdr2 + '</thead>' +
						'<tbody>' + bodyHtml + '</tbody>' +
					'</table>' +
				'</div>';
		}

		// ── D. Capital Expenses detail: items as rows, units as cols ─────────────
		// Columns: Expense Category | Unit1 Budget | Unit1 Actual | Unit2 Budget | Unit2 Actual | … | Total Budget | Total Actual
		function tableHtmlD(entries, pLbl, aLbl) {
			if (!entries || !entries.length) { return ''; }

			function isCapex(name) { return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('CAPITAL') !== -1; }

			// Collect all unique item names from the capital section
			var itemNames = [], itemSeen = {};
			entries.forEach(function (e) {
				(e.actuals || []).forEach(function (s) {
					if (!isCapex(s.name)) { return; }
					(s.items || []).forEach(function (item) {
						var n = (item.name || '').trim();
						if (n && !itemSeen[n]) { itemSeen[n] = true; itemNames.push(n); }
					});
				});
			});
			if (!itemNames.length) { return ''; }

			function itemPlan(e, itemName) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					if (!isCapex(s.name)) { return; }
					(s.items || []).forEach(function (item) {
						if ((item.name || '').trim() === itemName) { v += parseFloat(item.ytd || 0); }
					});
				});
				return v;
			}
			function itemAct(e, itemName) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					if (!isCapex(s.name)) { return; }
					(s.items || []).forEach(function (item) {
						if ((item.name || '').trim() === itemName) {
							v += parseFloat(item.total_posted_amt_ytd || item.total_posted_amt || 0);
						}
					});
				});
				return v;
			}
			function capexTotal(e, field) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					if (isCapex(s.name)) { v += parseFloat(field === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }
				});
				return v;
			}

			var tblId = 'sinr-table-d';
			if (!$('#sinr-d-style').length) {
				$('head').append(
					'<style id="sinr-d-style">' +
					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;}' +
					'#' + tblId + ' thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-xl);font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;position:sticky;top:0;z-index:25;text-align:center !important;padding:10px 12px;}' +
					'#' + tblId + ' thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-sb);border:1.5px solid var(--bdo) !important;position:sticky;z-index:24;text-align:center !important;min-width:120px;padding:8px 12px;}' +
					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:55 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:220px;vertical-align:middle;}' +
					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:220px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{position:sticky;left:0;z-index:10;background:#e8f0fa !important;}' +
					'#' + tblId + ' tbody tr.cb-row-grand td:first-child{background:var(--blue-mid) !important;}' +
					'#' + tblId + ' .sinr-d-gtcol{background:#ddeaf7 !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;}' +
					'#' + tblId + ' tr.cb-row-grand .sinr-d-gtcol{background:var(--blue-dark) !important;color:#fff !important;}' +
					'#' + tblId + ' tr.ppt-total-row .sinr-d-gtcol{background:#c8ddf0 !important;color:var(--blue-dark) !important;}' +
					'</style>'
				);
			}

			// Header row 1: "Expense Category" spans both header rows via rowspan="2"
			var hdr1 = '<tr class="cb-thead-main">' +
				'<th rowspan="2" style="min-width:220px;text-align:left !important;vertical-align:middle;position:sticky;left:0;z-index:55 !important;top:0;background:var(--blue-mid) !important;">Expense Category</th>';
			entries.forEach(function (e) {
				hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;">' + (e.label || '').trim() + '</th>';
			});
			hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;background:var(--blue-dark) !important;border:1.5px solid #001f3f !important;">Grand Total</th></tr>';

			// Header row 2: Budget/Actual sub-cols — NO first-col th (rowspan="2" above covers it)
			var hdr2 = '<tr class="cb-thead-sub">';
			entries.forEach(function () {
				hdr2 += '<th style="min-width:120px;text-align:center !important;">' + pLbl + '</th>' +
					    '<th style="min-width:120px;text-align:center !important;">' + aLbl + '</th>';
			});
			hdr2 += '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + pLbl + '</th>' +
				    '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + aLbl + '</th></tr>';

			// Body rows: one per item name
			var bodyHtml = '';

			itemNames.forEach(function (itemName) {
				var rowBudget = 0, rowActual = 0, cells = '';
				entries.forEach(function (e) {
					var bp = itemPlan(e, itemName);
					var ba = itemAct(e, itemName);
					rowBudget += bp; rowActual += ba;
					cells += '<td>' + fmtCrDash(bp) + '</td><td>' + fmtCrDash(ba) + '</td>';
				});
				bodyHtml += '<tr><td>' + itemName + '</td>' + cells +
					'<td class="sinr-d-gtcol" style="font-weight:700;">' + fmtCrDash(rowBudget) + '</td>' +
					'<td class="sinr-d-gtcol" style="font-weight:700;">' + fmtCrDash(rowActual) + '</td></tr>';
			});

			// Total row: full capex section total per unit
			var totalCells = '';
			var totalBudget = 0, totalActual = 0;
			entries.forEach(function (e) {
				var bp = capexTotal(e, 'plan');
				var ba = capexTotal(e, 'act');
				totalBudget += bp; totalActual += ba;
				totalCells += '<td style="font-weight:700 !important;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(bp) + '</td><td style="font-weight:700 !important;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(ba) + '</td>';
			});
			bodyHtml += '<tr class="ppt-total-row"><td>Total</td>' + totalCells +
				'<td class="sinr-d-gtcol" style="font-weight:700 !important;">' + fmtCrDash(totalBudget) + '</td>' +
				'<td class="sinr-d-gtcol" style="font-weight:700 !important;">' + fmtCrDash(totalActual) + '</td></tr>';

			return '<div class="sinr-section-label" style="margin-top:28px;">D. Capital Expenses</div>' +
				'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
				'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
					'<table id="' + tblId + '" class="cb-table">' +
						'<thead>' + hdr1 + hdr2 + '</thead>' +
						'<tbody>' + bodyHtml + '</tbody>' +
					'</table>' +
				'</div>';
		}

		// ── E. Other Operating Expenses ─────────────────────────────────────────────
		// Same pattern as Capital Expenses (tableHtmlD):
		// - entries = all unit rows (eB)
		// - Find the section whose name contains 'OTHER OPERATING' inside each unit's actuals
		// - Rows  = items directly inside that section
		// - Cols  = unit label | Budget | Actual (pairs) + Grand Total pair
		function tableHtmlE(entries, pLbl, aLbl) {
			if (!entries || !entries.length) { return ''; }

			function isOpex(name) {
				return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('OPERATING') !== -1;
			}
			function isOtherOpex(name) {
				return (name || '').replace(/\s+/g, ' ').trim().toUpperCase().indexOf('OTHER OPERATING') !== -1;
			}

			// OTHER OPERATING EXPENSES can live in two places:
			// 1. As a top-level section in actuals (s.name contains 'OTHER OPERATING')
			// 2. As a sub_head inside the OPERATING EXPENSES section
			// We search both and collect items from whichever has data.
			function getItemPlan(e, itemName) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					// Path 1: top-level OTHER OPERATING section
					if (isOtherOpex(s.name)) {
						(s.items || []).forEach(function (item) {
							if ((item.name || '').trim() === itemName) { v += parseFloat(item.ytd || 0); }
						});
					}
					// Path 2: sub_head of OPERATING EXPENSES
					if (isOpex(s.name) && !isOtherOpex(s.name)) {
						(s.sub_heads || []).forEach(function (sh) {
							if (!isOtherOpex(sh.name)) { return; }
							(sh.items || []).forEach(function (item) {
								if ((item.name || '').trim() === itemName) { v += parseFloat(item.ytd || 0); }
							});
						});
					}
				});
				return v;
			}
			function getItemAct(e, itemName) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					if (isOtherOpex(s.name)) {
						(s.items || []).forEach(function (item) {
							if ((item.name || '').trim() === itemName) {
								v += parseFloat(item.total_posted_amt_ytd || item.total_posted_amt || 0);
							}
						});
					}
					if (isOpex(s.name) && !isOtherOpex(s.name)) {
						(s.sub_heads || []).forEach(function (sh) {
							if (!isOtherOpex(sh.name)) { return; }
							(sh.items || []).forEach(function (item) {
								if ((item.name || '').trim() === itemName) {
									v += parseFloat(item.total_posted_amt_ytd || item.total_posted_amt || 0);
								}
							});
						});
					}
				});
				return v;
			}
			function getSectionTotal(e, field) {
				var v = 0;
				(e.actuals || []).forEach(function (s) {
					if (isOtherOpex(s.name)) {
						v += parseFloat(field === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0));
					}
					if (isOpex(s.name) && !isOtherOpex(s.name)) {
						(s.sub_heads || []).forEach(function (sh) {
							if (!isOtherOpex(sh.name)) { return; }
							v += parseFloat(field === 'plan' ? (sh.ytd || 0) : (sh.total_posted_amt_ytd || 0));
						});
					}
				});
				return v;
			}

			// Collect all unique item names across all units (both paths)
			var itemNames = [], itemSeen = {};
			entries.forEach(function (e) {
				(e.actuals || []).forEach(function (s) {
					// Path 1
					if (isOtherOpex(s.name)) {
						(s.items || []).forEach(function (item) {
							var n = (item.name || '').trim();
							if (n && !itemSeen[n]) { itemSeen[n] = true; itemNames.push(n); }
						});
					}
					// Path 2
					if (isOpex(s.name) && !isOtherOpex(s.name)) {
						(s.sub_heads || []).forEach(function (sh) {
							if (!isOtherOpex(sh.name)) { return; }
							(sh.items || []).forEach(function (item) {
								var n = (item.name || '').trim();
								if (n && !itemSeen[n]) { itemSeen[n] = true; itemNames.push(n); }
							});
						});
					}
				});
			});
			if (!itemNames.length) { return ''; }

			var tblId = 'sinr-table-e';
			if (!$('#sinr-e-style').length) {
				$('head').append(
					'<style id="sinr-e-style">' +
					'#' + tblId + '{border-collapse:collapse !important;width:100%;}' +
					'#' + tblId + ' th,#' + tblId + ' td{border:1.5px solid var(--bdl) !important;padding:8px 12px;white-space:nowrap;}' +
					'#' + tblId + ' thead tr.cb-thead-main th{background:var(--blue-mid) !important;color:#fff !important;font-size:var(--fs-xl);font-weight:var(--fw-b);border:1.5px solid var(--bdh) !important;position:sticky;top:0;z-index:25;text-align:center !important;padding:10px 12px;}' +
					'#' + tblId + ' thead tr.cb-thead-sub th{background:var(--orange) !important;color:#fff !important;font-size:var(--fs-lg);font-weight:var(--fw-sb);border:1.5px solid var(--bdo) !important;position:sticky;z-index:24;text-align:center !important;min-width:120px;padding:8px 12px;}' +
					'#' + tblId + ' thead tr.cb-thead-main th:first-child{position:sticky !important;left:0;z-index:55 !important;background:var(--blue-mid) !important;text-align:left !important;min-width:220px;vertical-align:middle;}' +
					'#' + tblId + ' tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;text-align:left !important;min-width:220px;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);border:1.5px solid var(--bdl) !important;}' +
					'#' + tblId + ' tbody tr.ppt-total-row td:first-child{position:sticky;left:0;z-index:10;background:#e8f0fa !important;}' +
					'#' + tblId + ' tbody tr.ppt-total-row td{background:#e8f0fa !important;color:var(--blue-dark) !important;font-weight:700 !important;}' +
					'#' + tblId + ' .sinr-e-gtcol{background:#ddeaf7 !important;color:var(--blue-dark) !important;border-left:2px solid var(--blue-mid) !important;}' +
					'#' + tblId + ' tr.ppt-total-row .sinr-e-gtcol{background:#c8ddf0 !important;color:var(--blue-dark) !important;}' +
					'</style>'
				);
			}

			// Header row 1: "Expense Category" spans both rows; unit headers colspan 2; Grand Total colspan 2
			var hdr1 = '<tr class="cb-thead-main">' +
				'<th rowspan="2" style="min-width:220px;text-align:left !important;vertical-align:middle;position:sticky;left:0;z-index:55 !important;top:0;background:var(--blue-mid) !important;">Expense Category</th>';
			entries.forEach(function (e) {
				hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;">' + (e.label || '').trim() + '</th>';
			});
			hdr1 += '<th colspan="2" style="text-align:center !important;min-width:240px;background:var(--blue-dark) !important;border:1.5px solid #001f3f !important;">Grand Total</th></tr>';

			// Header row 2: Budget/Actual per unit — no first col (rowspan covers it)
			var hdr2 = '<tr class="cb-thead-sub">';
			entries.forEach(function () {
				hdr2 += '<th style="min-width:120px;text-align:center !important;">' + pLbl + '</th>' +
					    '<th style="min-width:120px;text-align:center !important;">' + aLbl + '</th>';
			});
			hdr2 += '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + pLbl + '</th>' +
				    '<th style="min-width:120px;text-align:center !important;background:#004F8B !important;border:1.5px solid #001f3f !important;">' + aLbl + '</th></tr>';

			// Body: one row per item name
			var bodyHtml = '';
			itemNames.forEach(function (itemName) {
				var rowBudget = 0, rowActual = 0, cells = '';
				entries.forEach(function (e) {
					var bp = getItemPlan(e, itemName);
					var ba = getItemAct(e, itemName);
					rowBudget += bp; rowActual += ba;
					cells += '<td>' + fmtCrDash(bp) + '</td><td>' + fmtCrDash(ba) + '</td>';
				});
				bodyHtml += '<tr><td>' + itemName + '</td>' + cells +
					'<td class="sinr-e-gtcol" style="font-weight:700;">' + fmtCrDash(rowBudget) + '</td>' +
					'<td class="sinr-e-gtcol" style="font-weight:700;">' + fmtCrDash(rowActual) + '</td></tr>';
			});

			// Total row: full section total per unit
			var totalCells = '';
			var totalBudget = 0, totalActual = 0;
			entries.forEach(function (e) {
				var bp = getSectionTotal(e, 'plan');
				var ba = getSectionTotal(e, 'act');
				totalBudget += bp; totalActual += ba;
				totalCells += '<td style="font-weight:700 !important;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(bp) + '</td><td style="font-weight:700 !important;background:#e8f0fa !important;color:var(--blue-dark) !important;">' + fmtCrDash(ba) + '</td>';
			});
			bodyHtml += '<tr class="ppt-total-row"><td>Total</td>' + totalCells +
				'<td class="sinr-e-gtcol" style="font-weight:700 !important;">' + fmtCrDash(totalBudget) + '</td>' +
				'<td class="sinr-e-gtcol" style="font-weight:700 !important;">' + fmtCrDash(totalActual) + '</td></tr>';

			return '<div class="sinr-section-label" style="margin-top:28px;">E. Other Operating Expenses</div>' +
				'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
				'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
					'<table id="' + tblId + '" class="cb-table">' +
						'<thead>' + hdr1 + hdr2 + '</thead>' +
						'<tbody>' + bodyHtml + '</tbody>' +
					'</table>' +
				'</div>';
		}

		function load(fy) {
			var $tab = $('#tab-summary_inr');
			$tab.html('<div style="padding:20px;text-align:center;color:#aaa;">Loading\u2026</div>');
			Loader.show('Building Unit wise plan');
			var fp = (fy || '2025-26').split('-');
			var pLbl = fy + ' Budget', aLbl = (parseInt(fp[0], 10) - 1) + '-' + String(parseInt(fp[1], 10) - 1).padStart(2, '0') + ' Est';
			frappe.call({
				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
				args: { financial_year: fy, month: 'March', table_name_filter: 'Unit Wise Plan' },
				callback: function (r) {
					Loader.hide();
					var d = Array.isArray(r.message) ? r.message : ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
					if (!d || !d.length) { $tab.html('<div style="padding:40px;text-align:center;color:#aaa;">No data available.</div>'); return; }
					Store.summaryInr = d;
					var eB = d.filter(function (e) { return e.is_this_sub_item === 0 && e.sequence_id !== 9999 && (e.table_name || '').toUpperCase() !== 'CONSOLIDATED'; }).sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
					var ctVals = getConsolidatedTotals(d);
					$tab.html('<div style="padding:4px 0 10px;"><div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' + xlBtn('xl-summary-inr', 'Export to Excel') + '</div>' +
						'<div class="sinr-section-label">A. Unit Wise Plan</div>' + tableHtmlA(buildRowsA(d), pLbl, aLbl) +
						'<div class="sinr-section-label" style="margin-top:24px;">B. Breakdown of Unit Wise Plan</div>' +
						'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
						tableHtmlB(eB, getSubNames(eB), pLbl, aLbl, ctVals) +
						tableHtmlC(eB, pLbl, aLbl) +
						tableHtmlD(eB, pLbl, aLbl) +
						tableHtmlE(eB, pLbl, aLbl) +
						'</div>');
					fixStickySubHeader('#sinr-table-a');
					// Fix sticky top for sub-row in C and D (rowspan header — must set top after render)
					['#sinr-table-c','#sinr-table-d','#sinr-table-e'].forEach(function(sel) {
						(function tryFix(n) {
							var $t = $(sel); if (!$t.length) { return; }
							var $m = $t.find('thead tr.cb-thead-main');
							var h = $m.length ? ($m[0].getBoundingClientRect().height || $m.outerHeight(true) || 0) : 0;
							if (h > 0) { $t.find('thead tr.cb-thead-sub th').css('top', h + 'px'); }
							else if (n < 12) { setTimeout(function() { tryFix(n+1); }, 60); }
						})(0);
					});
					(function retrySinrB(n) {
						var $b = $('#sinr-table-b'); if (!$b.length) { return; }
						var rows = $b.find('thead tr'), ok = true;
						rows.each(function () { if (!$(this).outerHeight(true)) { ok = false; } });
						if (!ok && n < 10) { setTimeout(function() { retrySinrB(n+1); }, 50); return; }
						var top = 0;
						rows.each(function () { $(this).find('th').css('top', top + 'px'); top += $(this).outerHeight(true) || 40; });
					})(0);

				},
				error: function () { Loader.hide(); $tab.html('<div style="padding:40px;text-align:center;color:red;">Error loading Summary in INR data.</div>'); }
			});
		}
		return { load: load };
	})();

	// =============================================================================
	// HEADCOUNT MODULE
	// =============================================================================

	var Headcount = (function () {
		function fmtHC(v) { if (v === null || v === undefined) { return '-'; } var n = parseFloat(v); return isNaN(n) ? '-' : Math.round(n).toLocaleString('en-IN'); }
		function fmtOpex(v) { if (v === null || v === undefined) { return '-'; } var n = parseFloat(v); return isNaN(n) ? '-' : fmtCr(n * 10000000); }
		function fmtPct(a, b) {
			a = parseFloat(a); b = parseFloat(b);
			if (!a || isNaN(a) || isNaN(b)) { return '-'; }
			return Math.round(((b / a) - 1) * 100) + '%';
		}
		function norm(s) { return (s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
		function hcSec(txt) { return '<div class="hc-section-title">' + txt + '</div>'; }
		function swrap(inner) { return '<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' + inner + '</div>'; }
		function buildOpexMap(pd) {
			var map = {};
			(pd || []).forEach(function (p) {
				var op = null; (p.actuals || []).forEach(function (a) { if ((a.name || '').trim() === 'OPERATING  EXPENSES') { op = a; } });
				map[norm(p.label || '')] = { est: op ? parseFloat(op.total_posted_amt_ytd || 0) / 10000000 : 0, plan: op ? parseFloat(op.ytd || 0) / 10000000 : 0 };
			});
			return map;
		}
		function transform(records) {
			var sorted = (records || []).slice().sort(function (a, b) { return (a.financial_year || '').localeCompare(b.financial_year || ''); });
			var yrs = sorted.map(function (r) { return r.financial_year || ''; });
			var um = {};
			sorted.forEach(function (rec) {
				(rec.units || []).forEach(function (u) {
					var id = String(u.unit || u.unit_id || '');
					if (!um[id]) { um[id] = { description: '', hc: {}, seq: parseInt(id, 10) || 0 }; }
					um[id].hc[rec.financial_year] = parseFloat(u.total_headcount) || 0;
					if (rec.financial_year === yrs[yrs.length - 1]) {
						um[id].description = (u.unit_description || u.description || '').trim();
					}
				});
			});
			var units = Object.keys(um)
				.sort(function (a, b) { return (um[a].seq || 0) - (um[b].seq || 0); })
				.map(function (id) { return um[id]; });
			var totals = {};
			sorted.forEach(function (r) {
				totals[r.financial_year] = parseFloat(r.total_head_count || r.total_headcount || 0);
			});
			return { yrs: yrs, units: units, totals: totals };
		}
		function avgHC(u, yrs, i) {
			if (i === 0) { var c = u.hc[yrs[0]]; return c !== undefined ? c / 2 : null; }
			var p = u.hc[yrs[i - 1]], c = u.hc[yrs[i]];
			return (p !== undefined && c !== undefined) ? (p + c) / 2 : null;
		}
		function avgTot(tot, yrs, i) {
			if (i === 0) { var c = tot[yrs[0]]; return c !== undefined ? c / 2 : null; }
			var p = tot[yrs[i - 1]], c = tot[yrs[i]];
			return (p !== undefined && c !== undefined) ? (p + c) / 2 : null;
		}
		function gtable(hdrs, rows) {
			return swrap('<table class="cb-table" style="width:100%;"><thead><tr class="cb-thead-main"><th style="text-align:left !important;min-width:220px;">Unit</th>' +
				hdrs.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + rows + '</tbody></table>');
		}
		function load(fy) {
			var $tab = $('#tab-headcount');
			$tab.html('<div style="padding:40px;text-align:center;color:#aaa;">Loading\u2026</div>');
			Loader.show('Generating workforce summary\u2026');
			frappe.call({
				method: 'annual_budget.api.foundation_consolidated_report.get_headcount',
				args: { financial_year: fy, month: 'March', table_name_filter: 'Unit Wise Plan' },
				callback: function (r) {
					Loader.hide();
					var msg = r.message || {}, records = msg.headcount_data || [], planData = msg.plan_data || [];
					if (!records.length) { $tab.html('<div style="padding:40px;text-align:center;color:#aaa;">No headcount data available.</div>'); return; }
					Store.headcount = records;
					var om = buildOpexMap(planData), t = transform(records);
					var yrs = t.yrs, units = t.units, totals = t.totals, i1 = yrs.length - 2, i2 = yrs.length - 1;
					var totEst = 0, totPlan = 0, sRows = '';
					units.forEach(function (u) { var a1 = avgHC(u, yrs, i1), a2 = avgHC(u, yrs, i2), o = om[norm(u.description)] || { est: 0, plan: 0 }; totEst += o.est; totPlan += o.plan; sRows += '<tr><td style="text-align:left;">' + u.description + '</td><td>' + fmtHC(a1) + '</td><td>' + fmtHC(a2) + '</td><td>' + fmtPct(a1, a2) + '</td><td>' + fmtOpex(o.est) + '</td><td>' + fmtOpex(o.plan) + '</td><td>' + fmtPct(o.est, o.plan) + '</td></tr>'; });
					var ta1 = avgTot(totals, yrs, i1), ta2 = avgTot(totals, yrs, i2);
					sRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td><td>' + fmtHC(ta1) + '</td><td>' + fmtHC(ta2) + '</td><td>' + fmtPct(ta1, ta2) + '</td><td>' + fmtOpex(totEst) + '</td><td>' + fmtOpex(totPlan) + '</td><td>' + fmtPct(totEst, totPlan) + '</td></tr>';
					var sumHtml = swrap('<table class="cb-table" style="width:100%;"><thead><tr class="cb-thead-main"><th rowspan="2" style="text-align:left !important;min-width:200px;">Unit</th><th colspan="3" style="text-align:center !important;">Average H/C</th><th colspan="3" style="text-align:center !important;">Opex Spend (&#8377; Cr.)</th></tr><tr class="cb-thead-sub"><th>' + (yrs[i1] || '') + '</th><th>' + (yrs[i2] || '') + '</th><th>%</th><th>' + (yrs[i1] || '') + ' Est</th><th>' + (yrs[i2] || '') + ' Plan</th><th>%</th></tr></thead><tbody>' + sRows + '</tbody></table>');
					var cRows = '', aRows = '';
					units.forEach(function (u) { cRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.map(function (y) { return '<td>' + fmtHC(u.hc[y] !== undefined ? u.hc[y] : null) + '</td>'; }).join('') + '</tr>'; });
					cRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + yrs.map(function (y) { return '<td>' + fmtHC(totals[y] || 0) + '</td>'; }).join('') + '</tr>';
					units.forEach(function (u) { aRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.map(function (y, i) { return '<td>' + fmtHC(avgHC(u, yrs, i)) + '</td>'; }).join('') + '</tr>'; });
					aRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + yrs.map(function (y, i) { return '<td>' + fmtHC(avgTot(totals, yrs, i)) + '</td>'; }).join('') + '</tr>';
					var pHdrs = [], cpRows = '', apRows = '';
					if (yrs.length >= 2) {
						pHdrs = yrs.slice(1).map(function (y, i) { return yrs[i] + ' &#8594; ' + y; });
						units.forEach(function (u) { cpRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.slice(1).map(function (y, i) { return '<td>' + fmtPct(u.hc[yrs[i]], u.hc[y]) + '</td>'; }).join('') + '</tr>'; apRows += '<tr><td style="text-align:left;">' + u.description + '</td>' + yrs.slice(1).map(function (y, i) { return '<td>' + fmtPct(avgHC(u, yrs, i), avgHC(u, yrs, i + 1)) + '</td>'; }).join('') + '</tr>'; });
						cpRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + yrs.slice(1).map(function (y, i) { return '<td>' + fmtPct(totals[yrs[i]], totals[y]) + '</td>'; }).join('') + '</tr>';
						var tpc = ''; for (var ii = 1; ii < yrs.length; ii++) { tpc += '<td>' + fmtPct(avgTot(totals, yrs, ii - 1), avgTot(totals, yrs, ii)) + '</td>'; }
						apRows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + tpc + '</tr>';
					}
					$tab.html('<div style="padding:4px 0 10px;"><div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' + xlBtn('xl-headcount', 'Export to Excel') + '</div>' +
						hcSec('Headcount Summary') + '<div class="ppt-currency-label" style="text-align:left;margin-bottom:6px;">H/C numbers &nbsp;|&nbsp; Opex in &#8377; <strong>Cr.</strong></div>' + sumHtml +
						hcSec('Closing H/C') + gtable(yrs, cRows) + hcSec('Average H/C') + gtable(yrs, aRows) +
						(yrs.length >= 2 ? hcSec('Increase in Closing H/C (%)') + gtable(pHdrs, cpRows) : '') +
						(yrs.length >= 2 ? hcSec('Increase in Average H/C (%)') + gtable(pHdrs, apRows) : '') + '</div>');
					$tab.find('.cb-table').each(function () { fixStickySubHeader(this); });
				},
				error: function () { Loader.hide(); $tab.html('<div style="padding:40px;text-align:center;color:red;">Error loading headcount data.</div>'); }
			});
		}
		return { load: load };
	})();

	// =============================================================================
	// ANNUAL BUDGET MODULE
	// =============================================================================

	var Annual = (function () {
		var Q_DEFS = { q1: { label: 'Quarter 1', months: ['April', 'May', 'June'] }, q2: { label: 'Quarter 2', months: ['July', 'August', 'September'] }, q3: { label: 'Quarter 3', months: ['October', 'November', 'December'] }, q4: { label: 'Quarter 4', months: ['January', 'February', 'March'] } };
		var Q_KEYS = ['q1', 'q2', 'q3', 'q4'];
		var data = [], expandedQ = [], openH = {}, openS = {}, bound = false;
		function sumArr(a) { var t = 0; (a || []).forEach(function (v) { t += (v || 0); }); return t; }
		function objTotal(o) { var t = 0; Q_KEYS.forEach(function (k) { t += sumArr(o[k]); }); return t; }
		function qCells(obj) {
			var html = '';
			Q_KEYS.forEach(function (k) {
				var vals = obj[k] || [0, 0, 0];
				if (expandedQ.indexOf(k) !== -1) { vals.forEach(function (v) { html += '<td>' + formatINR(v) + '</td>'; }); }
				else { html += '<td colspan="3">' + formatINR(sumArr(vals)) + '</td>'; }
			});
			return html;
		}
		function buildHeader() {
			var $t = $('#annual-table thead').empty(), $m = $('<tr class="cb-thead-main"></tr>');
			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense Head / Line Item</th>');
			Q_KEYS.forEach(function (k) { var o = expandedQ.indexOf(k) !== -1; $m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o ? 1 : 2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o ? '\u25b2' : '\u25bc') + '</th>'); });
			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>'); $t.append($m);
			if (expandedQ.length) { var $s = $('<tr class="cb-thead-sub"></tr>'); Q_KEYS.forEach(function (k) { if (expandedQ.indexOf(k) !== -1) { Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); }); } }); $t.append($s); }
			fixStickySubHeader('#annual-table');
		}
		function renderTable() {
			buildHeader();
			var $tb = $('#annual-table tbody').empty(), term = $('#annual-search').val().trim().toLowerCase();
			var grand = { q1: [0, 0, 0], q2: [0, 0, 0], q3: [0, 0, 0], q4: [0, 0, 0] };
			data.forEach(function (head, hi) {
				if (term && !matchSearch(head, term)) { return; }
				var hs = String(hi), ho = openH[hs] === true;
				Q_KEYS.forEach(function (k) { (head[k] || [0, 0, 0]).forEach(function (v, mi) { grand[k][mi] += (v || 0); }); });
				$tb.append('<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho ? '\u25bc' : '\u25b6') + '</span> ' + head.name.trim() + '</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td></tr>');
				(head.sub_heads || []).forEach(function (sub, si) {
					var sk = hs + '-' + si, so = openS[sk] === true;
					$tb.append('<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:22px;"><span class="cb-arrow">' + (so ? '\u25bc' : '\u25b6') + '</span> ' + sub.name + '</td>' + qCells(sub) + '<td>' + formatINR(objTotal(sub)) + '</td></tr>');
					(sub.items || []).forEach(function (item) { $tb.append('<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho && so) ? '' : 'display:none;') + '"><td style="padding-left:42px;">' + item.name + '</td>' + qCells(item) + '<td>' + formatINR(objTotal(item)) + '</td></tr>'); });
				});
				(head.items || []).forEach(function (d) { $tb.append('<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:35px;">' + d.name + '</td>' + qCells(d) + '<td>' + formatINR(objTotal(d)) + '</td></tr>'); });
			});
			var gt = 0; Q_KEYS.forEach(function (k) { gt += sumArr(grand[k]); });
			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
			fixStickySubHeader('#annual-table');
		}
		function toggleHead(hs) { openH[hs] = !(openH[hs] === true); if (!openH[hs]) { data.forEach(function (h, hi) { if (String(hi) !== hs) { return; } (h.sub_heads || []).forEach(function (_, si) { openS[hs + '-' + si] = false; }); }); } renderTable(); }
		function toggleSub(hs, ss) { openS[hs + '-' + ss] = !(openS[hs + '-' + ss] === true); renderTable(); }
		function matchSearch(head, term) {
			if (!term) { return true; }
			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
			for (var s = 0; s < (head.sub_heads || []).length; s++) { if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; } for (var i = 0; i < (head.sub_heads[s].items || []).length; i++) { if ((head.sub_heads[s].items[i].name || '').toLowerCase().indexOf(term) !== -1) { return true; } } }
			for (var d = 0; d < (head.items || []).length; d++) { if ((head.items[d].name || '').toLowerCase().indexOf(term) !== -1) { return true; } }
			return false;
		}
		function bindEvents() {
			$(document).on('input.annual', '#annual-search', function () { renderTable(); });
			$(document).on('change.annual', '#annual-expand-quarters', function () { expandedQ = this.checked ? Q_KEYS.slice() : []; renderTable(); });
			$(document).on('change.annual', '#annual-expand-items', function () { if (this.checked) { data.forEach(function (h, hi) { openH[String(hi)] = true; (h.sub_heads || []).forEach(function (_, si) { openS[hi + '-' + si] = true; }); }); } else { openH = {}; openS = {}; } renderTable(); });
			$(document).on('click.annual', '#annual-table .cb-q-header', function () { var k = String($(this).attr('data-quarter')), idx = expandedQ.indexOf(k); if (idx !== -1) { expandedQ.splice(idx, 1); } else { expandedQ.push(k); } $('#annual-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length); renderTable(); });
			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
		}
		function load(fy) {
			if (!bound) { bindEvents(); bound = true; }
			data = []; openH = {}; openS = {}; expandedQ = [];
			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
			$('#annual-search').val('');
			Loader.show('Building Annual Budget\u2026');
			frappe.call({
				method: 'annual_budget.api.phase_sheet.get_consolidated_report',
				args: { financial_year: fy },
				callback: function (r) { data = r.message || []; Store.annual = data; renderTable(); Loader.hide(); },
				error: function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
			});
		}
		return { load: load };
	})();

	// =============================================================================
	// ESTIMATE MODULE
	// =============================================================================

	var Estimate = (function () {
		var Q_DEFS = { q1: { label: 'Quarter 1', months: ['April', 'May', 'June'] }, q2: { label: 'Quarter 2', months: ['July', 'August', 'September'] }, q3: { label: 'Quarter 3', months: ['October', 'November', 'December'] }, q4: { label: 'Quarter 4', months: ['January', 'February', 'March'] } };
		var Q_KEYS = ['q1', 'q2', 'q3', 'q4'], Q_IDX = { q1: [0, 1, 2], q2: [3, 4, 5], q3: [6, 7, 8], q4: [9, 10, 11] };
		var data = [], expandedQ = [], openH = {}, openS = {}, bound = false;
		function getMth(obj) { var m = obj.months || {}; return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)]; }
		function qTot(obj) { return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)]; }
		function yTot(obj) { var q = qTot(obj); return q[0]+q[1]+q[2]+q[3]; }
		function qCells(obj) { var mths = getMth(obj), qtots = qTot(obj), html = ''; Q_KEYS.forEach(function (q, qi) { if (expandedQ.indexOf(q) !== -1) { Q_IDX[q].forEach(function (mi) { html += '<td>' + formatINR(mths[mi]) + '</td>'; }); } else { html += '<td colspan="3">' + formatINR(qtots[qi]) + '</td>'; } }); return html; }
		function buildHeader() {
			var $t = $('#estimate-table thead').empty(), $m = $('<tr class="cb-thead-main"></tr>');
			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense</th>');
			Q_KEYS.forEach(function (k) { var o = expandedQ.indexOf(k) !== -1; $m.append('<th class="est-q-toggle" data-q="' + k + '" colspan="3" rowspan="' + (o ? 1 : 2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o ? '\u25b2' : '\u25bc') + '</th>'); });
			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>'); $t.append($m);
			if (expandedQ.length) { var $s = $('<tr class="cb-thead-sub"></tr>'); Q_KEYS.forEach(function (k) { if (expandedQ.indexOf(k) !== -1) { Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); }); } }); $t.append($s); }
			fixStickySubHeader('#estimate-table');
		}
		function renderTable() {
			buildHeader();
			var $tb = $('#estimate-tbody').empty(), term = $('#estimate-search').val().trim().toLowerCase();
			if (!Array.isArray(data) || !data.length) { $tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>'); return; }
			var gM = [0,0,0,0,0,0,0,0,0,0,0,0], gQ = [0,0,0,0];
			data.forEach(function (head, hi) {
				if (term && !matchSearch(head, term)) { return; }
				getMth(head).forEach(function (v, i) { gM[i] += v; }); qTot(head).forEach(function (v, i) { gQ[i] += v; });
				var hs = String(hi), ho = openH[hs];
				$tb.append('<tr class="cb-row-head cb-est-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho ? '\u25bc' : '\u25b6') + '</span> ' + head.name + '</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(yTot(head)) + '</td></tr>');
				(head.items || []).forEach(function (item) { $tb.append('<tr class="cb-est-head-item" data-hi="' + hs + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:28px;">' + item.name + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>'); });
				(head.sub_heads || []).forEach(function (sub, si) {
					var sk = hs + '-' + si, so = openS[sk];
					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho ? '' : 'display:none;') + '"><td style="padding-left:20px;"><span class="cb-arrow">' + (so ? '\u25bc' : '\u25b6') + '</span> ' + sub.name + '</td>' + qCells(sub) + '<td>' + formatINR(yTot(sub)) + '</td></tr>');
					(sub.items || []).forEach(function (item) { $tb.append('<tr class="cb-est-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho && so) ? '' : 'display:none;') + '"><td style="padding-left:44px;">' + item.name + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>'); });
				});
			});
			var gO = { Q1: gQ[0], Q2: gQ[1], Q3: gQ[2], Q4: gQ[3], months: { '4': gM[0], '5': gM[1], '6': gM[2], '7': gM[3], '8': gM[4], '9': gM[5], '10': gM[6], '11': gM[7], '12': gM[8], '1': gM[9], '2': gM[10], '3': gM[11] } };
			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(gO) + '<td>' + formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3]) + '</td></tr>');
			fixStickySubHeader('#estimate-table');
		}
		function toggleHead(hs) { var o = !openH[hs]; openH[hs] = o; $('#estimate-table tbody .cb-est-head[data-hi="' + hs + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); if (o) { $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').show(); $('#estimate-table tbody .cb-est-head-item[data-hi="' + hs + '"]').show(); $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () { var si = $(this).attr('data-si'); if (openS[hs + '-' + si]) { $('#estimate-table tbody .cb-est-sub-item[data-hi="' + hs + '"][data-si="' + si + '"]').show(); } }); } else { $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () { var si = $(this).attr('data-si'); openS[hs + '-' + si] = false; $(this).find('.cb-arrow').text('\u25b6'); }); $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"],.cb-est-sub-item[data-hi="' + hs + '"],.cb-est-head-item[data-hi="' + hs + '"]').hide(); } }
		function toggleSub(hs, ss) { var sk = hs + '-' + ss, o = !openS[sk]; openS[sk] = o; $('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"][data-si="' + ss + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); var $i = $('#estimate-table tbody .cb-est-sub-item[data-hi="' + hs + '"][data-si="' + ss + '"]'); o ? $i.show() : $i.hide(); }
		function matchSearch(head, term) { if (!term) { return true; } if (head.name.toLowerCase().indexOf(term) !== -1) { return true; } for (var s = 0; s < (head.sub_heads || []).length; s++) { if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; } for (var i = 0; i < (head.sub_heads[s].items || []).length; i++) { if ((head.sub_heads[s].items[i].name || '').toLowerCase().indexOf(term) !== -1) { return true; } } } for (var d = 0; d < (head.items || []).length; d++) { if ((head.items[d].name || '').toLowerCase().indexOf(term) !== -1) { return true; } } return false; }
		function bindEvents() {
			$(document).on('click.estimate', '#estimate-table .est-q-toggle', function () { var k = String($(this).attr('data-q')), idx = expandedQ.indexOf(k); if (idx !== -1) { expandedQ.splice(idx, 1); } else { expandedQ.push(k); } $('#estimate-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length); renderTable(); });
			$(document).on('change.estimate', '#estimate-expand-quarters', function () { expandedQ = this.checked ? Q_KEYS.slice() : []; renderTable(); });
			$(document).on('change.estimate', '#estimate-expand-items', function () { if (this.checked) { data.forEach(function (h, hi) { openH[String(hi)] = true; (h.sub_heads || []).forEach(function (_, si) { openS[hi + '-' + si] = true; }); }); } else { openH = {}; openS = {}; } renderTable(); });
			$('#tab-estimate').on('click.estimate', '.cb-est-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
			$('#tab-estimate').on('click.estimate', '.cb-est-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
			$(document).on('input.estimate', '#estimate-search', function () { renderTable(); });
		}
		function load(fy) {
			if (!bound) { bindEvents(); bound = true; }
			data = []; openH = {}; openS = {}; expandedQ = [];
			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked', false);
			Loader.show('Building Estimate\u2026');
			var year = (getPrevFY(fy) || '2025-26').split('-')[0];
			frappe.call({
				method: 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
				args: { fiscal_year: year, accounting_period: '12' },
				callback: function (r) {
					if (r.message) { if (r.message.status === 'success') { data = r.message.data || []; } else if (Array.isArray(r.message)) { data = r.message; } else if (r.message.data && Array.isArray(r.message.data)) { data = r.message.data; } else { frappe.msgprint('Failed to load Estimate data.'); } } else { frappe.msgprint('Failed to load Estimate data.'); }
					Store.estimate = data; renderTable(); Loader.hide();
				},
				error: function () { Loader.hide(); frappe.msgprint('Server error loading Estimate data.'); }
			});
		}
		return { load: load };
	})();

	// =============================================================================
	// BUDGET & ESTIMATE MODULE
	// =============================================================================

	var BudgetEstimate = (function () {
		var rawData = [], currentFY = '', openSec = {}, openSub = {}, expandItems = false, bound = false;
		function pl() { return getFYLabels(currentFY).plan; }
		function el() { return getFYLabels(currentFY).est; }
		function isGT(sec) { return sec.sequence_id === 9999 || (sec.name || '').toUpperCase().replace(/\s+/g, ' ').trim() === 'GRAND TOTAL'; }
		function secVal(e, sn, f) { var v = 0; (e.actuals || []).forEach(function (s) { if (isGT(s) || s.name !== sn) { return; } v += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); }); return v; }
		function subVal(e, sn, subn, f) { var v = 0; (e.actuals || []).forEach(function (s) { if (isGT(s) || s.name !== sn) { return; } (s.sub_heads || []).forEach(function (sub) { if (sub.name !== subn) { return; } v += parseFloat(f === 'plan' ? (sub.ytd || 0) : (sub.total_posted_amt_ytd || 0)); }); }); return v; }
		function itemVal(e, nm, f) { var v = 0; (e.actuals || []).forEach(function (s) { if (isGT(s)) { return; } (s.items || []).forEach(function (i) { if (i.name === nm) { v += parseFloat(f === 'plan' ? (i.ytd || 0) : (i.total_posted_amt || 0)); } }); (s.sub_heads || []).forEach(function (sub) { (sub.items || []).forEach(function (i) { if (i.name === nm) { v += parseFloat(f === 'plan' ? (i.ytd || 0) : (i.total_posted_amt || 0)); } }); }); }); return v; }
		function grandVal(e, f) {
			var gt = 0, found = false;
			(e.actuals || []).forEach(function (s) {
				if (isGT(s)) { gt += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); found = true; }
			});
			if (!found) {
				(e.actuals || []).forEach(function (s) { gt += parseFloat(f === 'plan' ? (s.ytd || 0) : (s.total_posted_amt_ytd || 0)); });
			}
			return gt;
		}
		function secTP(sn) { var v = 0; rawData.forEach(function (e) { v += secVal(e, sn, 'plan'); }); return v; }
		function secTE(sn) { var v = 0; rawData.forEach(function (e) { v += secVal(e, sn, 'est'); }); return v; }
		function subTP(sn, subn) { var v = 0; rawData.forEach(function (e) { v += subVal(e, sn, subn, 'plan'); }); return v; }
		function subTE(sn, subn) { var v = 0; rawData.forEach(function (e) { v += subVal(e, sn, subn, 'est'); }); return v; }
		function iTotP(n) { var v = 0; rawData.forEach(function (e) { v += itemVal(e, n, 'plan'); }); return v; }
		function iTotE(n) { var v = 0; rawData.forEach(function (e) { v += itemVal(e, n, 'est'); }); return v; }
		function allGP() { var v = 0; rawData.forEach(function (e) { v += grandVal(e, 'plan'); }); return v; }
		function allGE() { var v = 0; rawData.forEach(function (e) { v += grandVal(e, 'est'); }); return v; }
		function cellsPair(getP, getE) { var h = ''; rawData.forEach(function (e) { h += '<td>' + formatINR(getP(e)) + '</td><td>' + formatINR(getE(e)) + '</td>'; }); return h; }
		function tc2(plan, est, cls) { cls = cls || ''; return '<td class="be-total-plan ' + cls + '" style="font-weight:700;">' + formatINR(plan) + '</td><td class="be-total-est ' + cls + '" style="font-weight:700;">' + formatINR(est) + '</td>'; }
		function buildStruct() { if (!rawData.length) { return []; } return (rawData[0].actuals || []).filter(function (s) { return !isGT(s); }).map(function (s) { return { name: s.name, sub_heads: (s.sub_heads || []).map(function (sub) { return { name: sub.name, items: (sub.items || []).map(function (i) { return { name: i.name }; }) }; }), items: (s.items || []).map(function (i) { return { name: i.name }; }) }; }); }
		function buildHeader() {
			var $t = $('#be-table thead').empty(), $r1 = $('<tr class="cb-thead-main"></tr>'), $r2 = $('<tr class="cb-thead-sub"></tr>');
			$r1.append('<th rowspan="2" style="text-align:left !important;min-width:280px;position:sticky;left:0;z-index:50;background:#0076B6;vertical-align:middle;">Expense Head / Line Item</th>');
			rawData.forEach(function (e) { $r1.append('<th colspan="2" style="text-align:center;min-width:260px;">' + (e.label || '').trim() + '</th>'); });
			$r1.append('<th colspan="2" style="text-align:center;min-width:260px;background:#003B63;">Grand Total</th>');
			rawData.forEach(function () { $r2.append('<th style="text-align:center;min-width:130px;">' + pl() + '</th><th style="text-align:center;min-width:130px;">' + el() + '</th>'); });
			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">' + pl() + '</th><th style="text-align:center;min-width:130px;background:#004F8B;">' + el() + '</th>');
			$t.append($r1).append($r2); fixStickySubHeader('#be-table');
		}
		function renderTable() {
			buildHeader();
			var $tb = $('#be-tbody').empty(), term = $('#be-search').val().trim().toLowerCase(), struct = buildStruct();
			if (!rawData.length || !struct.length) { $tb.append('<tr><td colspan="' + (1 + rawData.length * 2 + 2) + '" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>'); return; }
			struct.forEach(function (sec) {
				var sn = sec.name;
				var secOpen = openSec[sn] === true;
				var secVis = secOpen ? '' : 'display:none;';
				$tb.append('<tr class="cb-row-head be-sec-row" data-sec="' + sn + '"><td style="text-align:left;"><span class="cb-arrow">' + (secOpen ? '\u25bc' : '\u25b6') + '</span> ' + sn + '</td>' +
					cellsPair(function (e) { return secVal(e, sn, 'plan'); }, function (e) { return secVal(e, sn, 'est'); }) +
					tc2(secTP(sn), secTE(sn), 'be-grand-col') + '</tr>');
				sec.sub_heads.forEach(function (sub) {
					var sk = sn + '::' + sub.name, subOpen = expandItems || (openSub[sk] === true), itmVis = (secOpen && subOpen) ? '' : 'display:none;';
					$tb.append('<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="' + sn + '" data-sub="' + sk + '" style="' + secVis + '"><td style="padding-left:22px;text-align:left;"><span class="cb-arrow">' + (subOpen ? '\u25bc' : '\u25b6') + '</span> ' + sub.name + '</td>' +
						cellsPair(function (e) { return subVal(e, sn, sub.name, 'plan'); }, function (e) { return subVal(e, sn, sub.name, 'est'); }) +
						tc2(subTP(sn, sub.name), subTE(sn, sub.name), 'be-grand-col') + '</tr>');
					sub.items.forEach(function (item) {
						if (term && item.name.toLowerCase().indexOf(term) === -1) { return; }
						$tb.append('<tr class="be-item-row be-sec-child be-sub-child" data-sec="' + sn + '" data-sub="' + sk + '" style="' + itmVis + '"><td style="padding-left:42px;text-align:left;">' + item.name + '</td>' +
							cellsPair(function (e) { return itemVal(e, item.name, 'plan'); }, function (e) { return itemVal(e, item.name, 'est'); }) +
							tc2(iTotP(item.name), iTotE(item.name), 'be-grand-col') + '</tr>');
					});
				});
				sec.items.forEach(function (item) {
					if (term && item.name.toLowerCase().indexOf(term) === -1) { return; }
					$tb.append('<tr class="be-item-row be-sec-child be-direct-item" data-sec="' + sn + '" style="' + secVis + '"><td style="padding-left:30px;text-align:left;">' + item.name + '</td>' +
						cellsPair(function (e) { return itemVal(e, item.name, 'plan'); }, function (e) { return itemVal(e, item.name, 'est'); }) +
						tc2(iTotP(item.name), iTotE(item.name), 'be-grand-col') + '</tr>');
				});
			});
			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>' + cellsPair(function (e) { return grandVal(e, 'plan'); }, function (e) { return grandVal(e, 'est'); }) + tc2(allGP(), allGE(), 'be-grand-col') + '</tr>');
			fixStickySubHeader('#be-table');
		}
		function toggleSec(sn) { var o = !(openSec[sn] === true); openSec[sn] = o; $('#be-table tbody .be-sec-row[data-sec="' + sn + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); var $ch = $('#be-table tbody .be-sec-child[data-sec="' + sn + '"]'); if (o) { $ch.filter('.be-sub-row,.be-direct-item').show(); $ch.filter('.be-sub-child').each(function () { if (expandItems || openSub[$(this).attr('data-sub')] === true) { $(this).show(); } }); } else { $ch.hide(); } }
		function toggleSubRow(sk) { var o = !(openSub[sk] === true); openSub[sk] = o; $('#be-table tbody .be-sub-row[data-sub="' + sk + '"]').find('.cb-arrow').text(o ? '\u25bc' : '\u25b6'); var $it = $('#be-table tbody .be-sub-child[data-sub="' + sk + '"]'); o ? $it.show() : $it.hide(); }
		function bindEvents() {
			$('#tab-budget_estimate').on('click.be', '.be-sec-row', function (e) { e.stopPropagation(); toggleSec($(this).attr('data-sec')); });
			$('#tab-budget_estimate').on('click.be', '.be-sub-row', function (e) { e.stopPropagation(); if (!expandItems) { toggleSubRow($(this).attr('data-sub')); } });
			$(document).on('change.be', '#be-expand-items', function () { expandItems = this.checked; buildStruct().forEach(function (sec) { openSec[sec.name] = expandItems; sec.sub_heads.forEach(function (sub) { openSub[sec.name + '::' + sub.name] = expandItems; }); }); renderTable(); });
			$(document).on('input.be', '#be-search', function () { renderTable(); });
		}
		function load(fy) {
			if (!bound) { bindEvents(); bound = true; }
			currentFY = fy; rawData = []; openSec = {}; openSub = {}; expandItems = false;
			$('#be-expand-items').prop('checked', false);
			Loader.show('Building Budget & Estimate\u2026');
			frappe.call({
				method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
				args: { financial_year: fy, month: 'March', table_name_filter: 'Budget & Estimate' },
				callback: function (r) {
					Loader.hide();
					var d = Array.isArray(r.message) ? r.message : ((r.message && Array.isArray(r.message.message)) ? r.message.message : null);
					if (!d || !d.length) { frappe.msgprint('No data returned for Budget & Estimate.'); renderTable(); return; }
					rawData = d.filter(function (e) {
						return e.is_this_sub_item === 0
							&& e.sequence_id !== 9999
							&& (e.table_name || '').toUpperCase() !== 'CONSOLIDATED';
					}).sort(function (a, b) { return (a.sequence_id || 0) - (b.sequence_id || 0); });
					Store.budgetEstimate = rawData; renderTable();
				},
				error: function () { Loader.hide(); frappe.msgprint('Server error loading Budget & Estimate data.'); }
			});
		}
		return { load: load };
	})();

	// =============================================================================
	// EXPORT WIRING
	// =============================================================================

	var API = 'annual_budget.api.export_reports';
	$(document).on('click', '#xl-ppt', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.ppt.rows.length) { frappe.msgprint('Please wait for the Foundation Metrics data to load first.'); return; } serverExport(API + '.export_ppt', { financial_year: fy, ppt_rows: JSON.stringify(Store.ppt.rows), prev_ppt_rows: JSON.stringify(Store.ppt.prevRows), budget_label: Store.ppt.budgetLabel, est_label: Store.ppt.estLabel, prev_budget_label: Store.ppt.prevBudgetLabel, prev_est_label: Store.ppt.prevEstLabel }, 'Building Foundation Metrics Excel\u2026'); });
	$(document).on('click', '#xl-summary-inr', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.summaryInr.length) { frappe.msgprint('Please wait for the Summary in INR data to load first.'); return; } serverExport(API + '.export_summary_inr', { financial_year: fy, summary_data: JSON.stringify(Store.summaryInr) }, 'Building Summary in INR Excel\u2026'); });
	$(document).on('click', '#xl-headcount', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.headcount.length) { frappe.msgprint('Please wait for the Headcount data to load first.'); return; } serverExport(API + '.export_headcount', { financial_year: fy, headcount_data: JSON.stringify(Store.headcount) }, 'Building Headcount Excel\u2026'); });
	$(document).on('click', '#xl-annual', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.annual.length) { frappe.msgprint('Please open the Annual Budget tab first.'); return; } serverExport(API + '.export_annual', { financial_year: fy, annual_data: JSON.stringify(Store.annual) }, 'Building Annual Budget Excel\u2026'); });
	$(document).on('click', '#xl-estimate', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.estimate.length) { frappe.msgprint('Please open the Estimate tab first.'); return; } serverExport(API + '.export_estimate', { financial_year: fy, estimate_data: JSON.stringify(Store.estimate) }, 'Building Estimate Excel\u2026'); });
	$(document).on('click', '#xl-be', function () { var fy = fyControl.get_value() || '2025-26'; if (!Store.budgetEstimate.length) { frappe.msgprint('Please open the Budget & Estimate tab first.'); return; } serverExport(API + '.export_budget_estimate', { financial_year: fy, be_data: JSON.stringify(Store.budgetEstimate) }, 'Building Budget & Estimate Excel\u2026'); });
	$(document).on('click', '#xl-export-all', function () {
		var fy = fyControl.get_value() || '2025-26', missing = [];
		if (!Store.ppt.rows.length)      { missing.push('Foundation Metrics (tab 1)'); }
		if (!Store.summaryInr.length)     { missing.push('Summary in INR (tab 2)'); }
		if (!Store.headcount.length)      { missing.push('Headcount (tab 3)'); }
		if (!Store.annual.length)         { missing.push('Annual Budget (tab 4)'); }
		if (!Store.estimate.length)       { missing.push('Estimate (tab 5)'); }
		if (!Store.budgetEstimate.length) { missing.push('Budget & Estimate (tab 6)'); }
		if (missing.length) { frappe.msgprint('Please open each tab first.<br><br>Still loading: <b>' + missing.join(', ') + '</b>'); return; }
		serverExport(API + '.export_all', { financial_year: fy, ppt_rows: JSON.stringify(Store.ppt.rows), prev_ppt_rows: JSON.stringify(Store.ppt.prevRows), budget_label: Store.ppt.budgetLabel, est_label: Store.ppt.estLabel, prev_budget_label: Store.ppt.prevBudgetLabel, prev_est_label: Store.ppt.prevEstLabel, summary_data: JSON.stringify(Store.summaryInr), headcount_data: JSON.stringify(Store.headcount), annual_data: JSON.stringify(Store.annual), estimate_data: JSON.stringify(Store.estimate), be_data: JSON.stringify(Store.budgetEstimate) }, 'Building full consolidated Excel\u2026');
	});

	// =============================================================================
	// AUTO-LOAD
	// =============================================================================

	if (fyControl.get_value()) { TabLoader.trigger('ppt'); }

};