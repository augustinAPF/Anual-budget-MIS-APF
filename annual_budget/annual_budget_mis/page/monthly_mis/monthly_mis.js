// frappe.pages['monthly-mis'].on_page_load = function (wrapper) {

// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper, title: 'Monthly MIS', single_column: true
// 	});

// 	// =============================================================================
// 	// LOADER
// 	// =============================================================================
// 	if (!$('#mis-loader').length) {
// 		$('body').append(
// 			'<div id="mis-loader" class="mis-loader-overlay">' +
// 			'<div class="mis-loader-box">' +
// 			'<img src="/files/APF logo.png" class="mis-loader-logo" alt="">' +
// 			'<div class="mis-loader-text">Loading, please wait</div>' +
// 			'</div></div>'
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
// 	// EXPORT BUTTON — Frappe page toolbar (top-right corner, native Frappe style)
// 	// =============================================================================
// 	page.set_primary_action('Export Excel', function () {
// 		var fy    = fyCtrl.get_value();
// 		var month = moCtrl.get_value();
// 		if (!fy || !month) { frappe.msgprint('Please select Financial Year and Month first.'); return; }
// 		var prevFY = getPrevFY(fy);
// 		var url = frappe.urllib.get_full_url(
// 			'/api/method/annual_budget.api.monthly_mis_export.export_monthly_mis'
// 			+ '?financial_year='      + encodeURIComponent(fy)
// 			+ '&month='               + encodeURIComponent(month)
// 			+ '&prev_financial_year=' + encodeURIComponent(prevFY)
// 		);
// 		window.open(url, '_blank');
// 	}, 'octicon octicon-cloud-download');

// 	$(page.body).append('<style>' +

// 		/* ── Design tokens ── */
// 		'#mis-wrap{' +
// 		'  --font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
// 		'  --fs-xs:11px;--fs-sm:12px;--fs-base:13px;--fs-md:13px;' +
// 		'  --fw-n:400;--fw-sb:600;--fw-b:700;' +
// 		'  --r1:#1565C0;' +       /* Year header blue          */
// 		'  --r2:#F26B21;' +       /* Group header orange       */
// 		'  --r3:#455A64;' +       /* Sub-col header steel      */
// 		'  --tot-bg:#DBEAFE;' +   /* Total row fill            */
// 		'  --tot-fg:#1E3A5F;' +   /* Total row text            */
// 		'  --act-bg:#FFF3EE;' +   /* Actual column wash        */
// 		'  --cov-bg:#FFFDE7;' +   /* Covid column tint         */
// 		/* One border colour, one weight — used everywhere */
// 		'  --bdc:#64748B;' +      /* border colour             */
// 		'  --bdw:1px;' +          /* border width              */
// 		'}' +

// 		/* wrapper */
// 		'#mis-wrap{padding:16px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:#1a1a1a;line-height:1.5;}' +
// 		'#mis-wrap *{box-sizing:border-box;}' +

// 		/* filters */
// 		'.mis-filters{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;margin-bottom:12px;}' +
// 		'.mis-fc{min-width:160px;flex:1 1 160px;max-width:260px;}' +

// 		/* title */
// 		'.mis-title{margin:0 0 2px;font-size:15px;font-weight:var(--fw-b);color:#1a1a1a;text-decoration:underline;}' +
// 		'.mis-note,.con-note{margin:0 0 6px;text-align:right;font-size:11px;font-style:italic;color:#777;}' +
// 		'.mis-note strong,.con-note strong{font-style:normal;font-weight:var(--fw-b);}' +

// 		/* ── Scroll wrappers — horizontal scroll, no height clamp ── */
// 		'.mis-scroll,.con-scroll{' +
// 		'  overflow-x:auto;overflow-y:visible;' +
// 		'  border:var(--bdw) solid var(--bdc);' +
// 		'  border-radius:4px;background:#fff;' +
// 		'  -webkit-overflow-scrolling:touch;' +
// 		'}' +

// 		/* ══════════════════════════════════════════════
// 		   DETAIL TABLE
// 		   Use border-separate + cellspacing:0 approach
// 		   so every cell has its own clean border box
// 		   ══════════════════════════════════════════════ */
// 		'#mis-tbl{' +
// 		'  border-collapse:separate;' +
// 		'  border-spacing:0;' +
// 		'  width:100%;table-layout:auto;' +
// 		'}' +

// 		/* Base cell style — every single cell */
// 		'#mis-tbl th,#mis-tbl td{' +
// 		'  border-top:var(--bdw) solid var(--bdc);' +
// 		'  border-right:var(--bdw) solid var(--bdc);' +
// 		'  border-bottom:var(--bdw) solid var(--bdc);' +
// 		'  border-left:0;' +      /* left border drawn by right border of prev cell */
// 		'  padding:7px 10px;' +
// 		'  white-space:nowrap;text-align:right;vertical-align:middle;' +
// 		'  font-size:var(--fs-base);color:#1a1a1a;background:#fff;' +
// 		'}' +
// 		/* First cell in each row gets a left border */
// 		'#mis-tbl th:first-child,#mis-tbl td:first-child{border-left:var(--bdw) solid var(--bdc);}' +

// 		/* ── ROW 1 — Year (blue) ── */
// 		'#mis-tbl thead tr.r-yr th{' +
// 		'  background:var(--r1);color:#fff;' +
// 		'  font-size:14px;font-weight:var(--fw-b);text-align:center;' +
// 		'  position:sticky;top:0;z-index:27;' +
// 		'  border-color:rgba(255,255,255,.2);padding:9px 10px;' +
// 		'}' +
// 		'#mis-tbl thead tr.r-yr th:first-child{border-left-color:rgba(255,255,255,.2);}' +

// 		/* ── ROW 2 — Group (orange) ── */
// 		'#mis-tbl thead tr.r-grp th{' +
// 		'  background:var(--r2);color:#fff;' +
// 		'  font-size:12px;font-weight:var(--fw-b);text-align:center;' +
// 		'  position:sticky;top:38px;z-index:26;' +
// 		'  border-color:rgba(255,255,255,.2);padding:6px 10px;' +
// 		'}' +
// 		'#mis-tbl thead tr.r-grp th:first-child{border-left-color:rgba(255,255,255,.2);}' +

// 		/* ── ROW 3 — Sub-col (steel) ── */
// 		'#mis-tbl thead tr.r-sub th{' +
// 		'  background:var(--r3);color:#fff;' +
// 		'  font-size:11px;font-weight:var(--fw-sb);text-align:center;' +
// 		'  position:sticky;top:71px;z-index:25;' +
// 		'  border-color:rgba(255,255,255,.15);min-width:74px;padding:5px 10px;' +
// 		'}' +
// 		'#mis-tbl thead tr.r-sub th:first-child{border-left-color:rgba(255,255,255,.15);}' +
// 		'#mis-tbl thead tr.r-sub th.cv-hdr{color:#FFD54F;font-style:italic;}' +

// 		/* ── Grand Total (tfoot) — all cells same blue ── */
// 		'#mis-tbl tfoot tr.r-grand td{' +
// 		'  background:var(--r1)!important;color:#fff!important;' +
// 		'  font-weight:var(--fw-b);font-size:var(--fs-md);' +
// 		'  border-color:rgba(255,255,255,.2)!important;' +
// 		'}' +
// 		'#mis-tbl tfoot tr.r-grand td:first-child{border-left-color:rgba(255,255,255,.2)!important;}' +
// 		'#mis-tbl tfoot tr.r-grand td.ac,' +
// 		'#mis-tbl tfoot tr.r-grand td.cv{background:var(--r1)!important;color:#fff!important;font-style:normal!important;}' +

// 		/* ── Section total rows — uniform #DBEAFE ── */
// 		'#mis-tbl tbody tr.r-total td{' +
// 		'  font-weight:var(--fw-b);' +
// 		'  background:var(--tot-bg)!important;color:var(--tot-fg);' +
// 		'  border-color:#93C5FD!important;' +
// 		'}' +

// 		/* ── Sub-item indent ── */
// 		'#mis-tbl tbody tr.r-sub-item td:first-child{padding-left:24px;color:#555;}' +

// 		/* ── Actual wash (only on plain body rows) ── */
// 		'#mis-tbl tbody tr:not(.r-total) td.ac{background:var(--act-bg)!important;}' +

// 		/* ── Covid tint (only on plain body rows) ── */
// 		'#mis-tbl tbody tr:not(.r-total) td.cv{background:var(--cov-bg)!important;color:#795548;font-style:italic;}' +

// 		/* ── Sticky label column ── */
// 		'#mis-tbl thead tr.r-yr th.col-lbl{' +
// 		'  position:sticky;left:0;z-index:57;' +
// 		'  text-align:left!important;min-width:205px;background:var(--r1);' +
// 		'}' +
// 		'#mis-tbl tbody td.col-lbl,#mis-tbl tfoot td.col-lbl{' +
// 		'  position:sticky;left:0;z-index:10;' +
// 		'  text-align:left!important;min-width:205px;background:#fff;' +
// 		'}' +
// 		'#mis-tbl tbody tr.r-total td.col-lbl{background:var(--tot-bg)!important;color:var(--tot-fg);}' +
// 		'#mis-tbl tfoot td.col-lbl{background:var(--r1)!important;}' +

// 		/* ── Year-block left separator (solid visible line) ── */
// 		'#mis-tbl .sep-yr{border-left:2px solid #1D4ED8!important;}' +
// 		'#mis-tbl thead tr.r-yr  th.sep-yr,' +
// 		'#mis-tbl thead tr.r-grp th.sep-yr,' +
// 		'#mis-tbl thead tr.r-sub th.sep-yr,' +
// 		'#mis-tbl tfoot tr.r-grand td.sep-yr{border-left:2px solid rgba(255,255,255,.5)!important;}' +

// 		/* ── Budget→Actual separator ── */
// 		'#mis-tbl .sep-in{border-left:1px solid #94A3B8!important;}' +
// 		'#mis-tbl thead tr.r-grp th.sep-in,' +
// 		'#mis-tbl thead tr.r-sub th.sep-in,' +
// 		'#mis-tbl tfoot tr.r-grand td.sep-in{border-left:1px solid rgba(255,255,255,.3)!important;}' +

// 		/* ══════════════════════════════════════════════
// 		   CONSOLIDATED TABLE — same rules, separate scope
// 		   ══════════════════════════════════════════════ */
// 		'.con-wrap{padding-top:28px;}' +
// 		'.con-title{font-size:15px;font-weight:var(--fw-b);color:#1a1a1a;text-decoration:underline;margin:0 0 4px;}' +

// 		'#con-tbl{border-collapse:separate;border-spacing:0;width:100%;table-layout:auto;}' +
// 		'#con-tbl th,#con-tbl td{' +
// 		'  border-top:var(--bdw) solid var(--bdc);' +
// 		'  border-right:var(--bdw) solid var(--bdc);' +
// 		'  border-bottom:var(--bdw) solid var(--bdc);' +
// 		'  border-left:0;' +
// 		'  padding:8px 12px;white-space:nowrap;text-align:right;vertical-align:middle;' +
// 		'  font-size:var(--fs-base);color:#1a1a1a;background:#fff;' +
// 		'}' +
// 		'#con-tbl th:first-child,#con-tbl td:first-child{border-left:var(--bdw) solid var(--bdc);}' +

// 		/* Con ROW 1 — year (blue) */
// 		'#con-tbl thead tr.cr-yr th{' +
// 		'  background:var(--r1);color:#fff;font-size:14px;font-weight:var(--fw-b);' +
// 		'  text-align:center;border-color:rgba(255,255,255,.2);padding:9px 12px;' +
// 		'}' +
// 		'#con-tbl thead tr.cr-yr th:first-child{border-left-color:rgba(255,255,255,.2);}' +

// 		/* Con ROW 2 — sub-cols (steel) */
// 		'#con-tbl thead tr.cr-sub th{' +
// 		'  background:var(--r3);color:#fff;font-size:12px;font-weight:var(--fw-sb);' +
// 		'  text-align:center;border-color:rgba(255,255,255,.15);padding:6px 12px;min-width:100px;' +
// 		'}' +
// 		'#con-tbl thead tr.cr-sub th:first-child{border-left-color:rgba(255,255,255,.15);}' +
// 		'#con-tbl thead tr.cr-sub th.pct-hdr{color:#90CAF9;}' +

// 		/* Con body */
// 		'#con-tbl tbody tr:hover td{background:#F8FAFC!important;}' +
// 		'#con-tbl tbody tr:hover td.col-lbl{background:#F8FAFC!important;}' +
// 		'#con-tbl tbody tr.cr-sub-item td:first-child{padding-left:28px;color:#555;}' +

// 		/* Con total row */
// 		'#con-tbl tbody tr.cr-total td{' +
// 		'  font-weight:var(--fw-b);background:var(--tot-bg)!important;' +
// 		'  color:var(--tot-fg);border-color:#93C5FD!important;' +
// 		'}' +

// 		/* Con sticky label */
// 		'#con-tbl thead tr.cr-yr th.col-lbl{position:sticky;left:0;z-index:17;text-align:left!important;min-width:220px;background:var(--r1);}' +
// 		'#con-tbl tbody td.col-lbl{position:sticky;left:0;z-index:5;text-align:left!important;min-width:220px;background:#fff;}' +
// 		'#con-tbl tbody tr.cr-total td.col-lbl{background:var(--tot-bg)!important;color:var(--tot-fg);}' +

// 		/* Con actual col */
// 		'#con-tbl tbody tr:not(.cr-total) td.con-act{background:var(--act-bg)!important;}' +
// 		/* Con pct col */
// 		'#con-tbl tbody tr:not(.cr-total) td.con-pct{color:#1565C0;font-weight:var(--fw-sb);}' +

// 		/* Con year separator */
// 		'#con-tbl .sep-yr{border-left:2px solid #1D4ED8!important;}' +
// 		'#con-tbl thead tr.cr-yr th.sep-yr,' +
// 		'#con-tbl thead tr.cr-sub th.sep-yr{border-left:2px solid rgba(255,255,255,.5)!important;}' +

// 		/* ══════════════════════════════════════════════
// 		   OPERATING EXPENSES CROSS-TAB TABLE
// 		   2-row header: blue (units) + steel (Budget|Actual)
// 		   ══════════════════════════════════════════════ */
// 		'.opex-wrap{padding-top:28px;}' +
// 		'.opex-title{font-size:15px;font-weight:var(--fw-b);color:#1a1a1a;text-decoration:underline;margin:0 0 4px;}' +
// 		'.opex-note{margin:0 0 6px;text-align:right;font-size:11px;font-style:italic;color:#777;}' +
// 		'.opex-note strong{font-style:normal;font-weight:var(--fw-b);}' +
// 		'.opex-scroll{overflow-x:auto;overflow-y:visible;border:var(--bdw) solid var(--bdc);border-radius:4px;background:#fff;-webkit-overflow-scrolling:touch;}' +
// 		'#opex-tbl{border-collapse:separate;border-spacing:0;width:100%;table-layout:auto;}' +
// 		'#opex-tbl th,#opex-tbl td{' +
// 		'  border-top:var(--bdw) solid var(--bdc);' +
// 		'  border-right:var(--bdw) solid var(--bdc);' +
// 		'  border-bottom:var(--bdw) solid var(--bdc);' +
// 		'  border-left:0;' +
// 		'  padding:7px 11px;white-space:nowrap;text-align:right;vertical-align:middle;' +
// 		'  font-size:var(--fs-base);color:#1a1a1a;background:#fff;' +
// 		'}' +
// 		'#opex-tbl th:first-child,#opex-tbl td:first-child{border-left:var(--bdw) solid var(--bdc);}' +

// 		/* Row 1 — unit names (deep blue) */
// 		'#opex-tbl thead tr.ox-yr th{' +
// 		'  background:var(--r1);color:#fff;font-size:13px;font-weight:var(--fw-b);' +
// 		'  text-align:center;border-color:rgba(255,255,255,.2);padding:9px 11px;' +
// 		'}' +
// 		'#opex-tbl thead tr.ox-yr th:first-child{border-left-color:rgba(255,255,255,.2);}' +
// 		/* Grand Total header — darker blue */
// 		'#opex-tbl thead tr.ox-yr th.gt-hdr{background:#0D47A1;}' +

// 		/* Row 2 — Budget/Actual sub-cols (steel) */
// 		'#opex-tbl thead tr.ox-sub th{' +
// 		'  background:var(--r3);color:#fff;font-size:11px;font-weight:var(--fw-sb);' +
// 		'  text-align:center;border-color:rgba(255,255,255,.15);min-width:80px;padding:5px 11px;' +
// 		'}' +
// 		'#opex-tbl thead tr.ox-sub th:first-child{border-left-color:rgba(255,255,255,.15);}' +
// 		'#opex-tbl thead tr.ox-sub th.pct-hdr{color:#BAE6FD;font-style:italic;}' + /* light cyan for % sub-header */

// 		/* Sticky first column */
// 		'#opex-tbl thead tr.ox-yr th.col-lbl{position:sticky;left:0;z-index:27;text-align:left!important;min-width:220px;background:var(--r1);}' +
// 		'#opex-tbl tbody td.col-lbl{position:sticky;left:0;z-index:5;text-align:left!important;min-width:220px;background:#fff;}' +

// 		/* Total row */
// 		'#opex-tbl tbody tr.ox-total td{font-weight:var(--fw-b);background:var(--tot-bg)!important;color:var(--tot-fg);border-color:#93C5FD!important;}' +
// 		'#opex-tbl tbody tr.ox-total td.col-lbl{background:var(--tot-bg)!important;color:var(--tot-fg);}' +

// 		/* Actual column — light orange wash */
// 		'#opex-tbl tbody tr:not(.ox-total) td.act-cell{background:var(--act-bg)!important;}' +

// 		/* % of Budget column — blue bold text */
// 		'#opex-tbl td.pct-cell{color:#1565C0;font-weight:var(--fw-sb);}' +
// 		'#opex-tbl tbody tr.ox-total td.pct-cell{background:var(--tot-bg)!important;color:var(--tot-fg);}' +

// 		/* Grand Total % column */
// 		'#opex-tbl td.gt-pct-cell{background:#DBEAFE!important;color:#1E3A5F;font-weight:var(--fw-b);}' +
// 		'#opex-tbl tbody tr.ox-total td.gt-pct-cell{background:var(--tot-bg)!important;color:var(--tot-fg);}' +

// 		/* Grand Total column — light blue tint */
// 		'#opex-tbl td.gt-cell{background:#EFF6FF!important;font-weight:var(--fw-sb);color:#1E3A5F;}' +
// 		/* Grand Total Actual column — both washes combined → use slightly deeper tint */
// 		'#opex-tbl td.gt-act-cell{background:#DBEAFE!important;font-weight:var(--fw-sb);color:#1E3A5F;}' +
// 		'#opex-tbl tbody tr.ox-total td.gt-cell,' +
// 		'#opex-tbl tbody tr.ox-total td.gt-act-cell{background:var(--tot-bg)!important;color:var(--tot-fg);}' +

// 		/* Hover */
// 		'#opex-tbl tbody tr:hover td{background:#F8FAFC!important;}' +
// 		'#opex-tbl tbody tr:hover td.col-lbl{background:#F8FAFC!important;}' +
// 		'#opex-tbl tbody tr.ox-total:hover td{background:var(--tot-bg)!important;}' +

// 		/* ── Tooltip ── */
// 		'#mis-tt{position:fixed;z-index:999998;pointer-events:none;' +
// 		'  background:#1E293B;color:#F8FAFC;font-family:var(--font);font-size:13px;' +
// 		'  padding:8px 12px;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.4);' +
// 		'  opacity:0;transition:opacity .12s ease;white-space:nowrap;line-height:1.6;}' +
// 		'#mis-tt .tt-amt{font-size:15px;font-weight:700;color:#fff;}' +
// 		'#mis-tt .tt-sub{font-size:11px;color:#93C5FD;margin-top:2px;}' +

// 		/* ── Loader ── */
// 		'#mis-loader.mis-loader-overlay{position:fixed;inset:0;background:rgba(15,23,42,.92);backdrop-filter:blur(8px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
// 		'.mis-loader-box{display:flex;flex-direction:column;align-items:center;gap:16px;}' +
// 		'.mis-loader-logo{width:84px;height:84px;border-radius:50%;background:linear-gradient(145deg,#fff,#e2e8f0);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.4);animation:mis-p 1.6s infinite ease-in-out;}' +
// 		'.mis-loader-text{font-size:14px;color:#fff;font-weight:600;letter-spacing:.5px;opacity:.9;}' +
// 		'@keyframes mis-p{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.07);opacity:1;}}' +

// 		'@media(max-width:900px){.mis-fc{max-width:100%;}}' +

// 		'</style>'
// 	);

// 	// =============================================================================
// 	// TOOLTIP
// 	// =============================================================================
// 	if (!$('#mis-tt').length) {
// 		$('body').append('<div id="mis-tt"><div class="tt-amt"></div><div class="tt-sub"></div></div>');
// 	}
// 	var $tt = $('#mis-tt');
// 	function ttShow(e,raw,ctx){
// 		var n=parseFloat(raw)||0; if(!n||!isFinite(n)){ttHide();return;}
// 		var neg=n<0,abs=Math.abs(n);
// 		$tt.find('.tt-amt').text((neg?'-':'')+'\u20B9 '+abs.toLocaleString('en-IN'));
// 		$tt.find('.tt-sub').text((neg?'-':'')+(abs/10000000).toFixed(2)+' Cr'+(ctx?' \u00B7 '+ctx:''));
// 		ttPos(e); $tt.css('opacity',1);
// 	}
// 	function ttPos(e){
// 		var x=e.clientX+14,y=e.clientY-8,w=$tt.outerWidth()||220,h=$tt.outerHeight()||60;
// 		if(x+w>window.innerWidth-8)x=e.clientX-w-14;
// 		if(y+h>window.innerHeight-8)y=e.clientY-h-8;
// 		$tt.css({left:x,top:y});
// 	}
// 	function ttHide(){ $tt.css('opacity',0); }
// 	$(document)
// 		.on('mouseenter','#mis-tbl td[data-raw],#con-tbl td[data-raw],#opex-tbl td[data-raw]',function(e){ttShow(e,$(this).data('raw'),$(this).data('ctx'));})
// 		.on('mousemove', '#mis-tbl td[data-raw],#con-tbl td[data-raw],#opex-tbl td[data-raw]',function(e){ttPos(e);})
// 		.on('mouseleave','#mis-tbl td[data-raw],#con-tbl td[data-raw],#opex-tbl td[data-raw]',function(){ttHide();});

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================
// 	$(page.body).append(
// 		'<div id="mis-wrap">' +

// 		/* Filters */
// 		'<div class="mis-filters">' +
// 		'  <div class="mis-fc" id="mis-fy-wrap"></div>' +
// 		'  <div class="mis-fc" id="mis-mo-wrap"></div>' +
// 		'</div>' +

// 		/* Title */
// 		'<p class="mis-title" id="mis-title">Foundation Budget vs. Actuals</p>' +
// 		'<p class="mis-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +

// 		/* Detail table */
// 		'<div class="mis-scroll">' +
// 		'  <table id="mis-tbl"><thead></thead>' +
// 		'  <tbody><tr><td colspan="17" style="text-align:center;padding:40px;color:#aaa;">Select filters to load data\u2026</td></tr></tbody>' +
// 		'  <tfoot></tfoot>' +
// 		'  </table>' +
// 		'</div>' +

// 		/* Consolidated summary table */
// 		'<div class="con-wrap">' +
// 		'  <p class="con-title">Consolidated Summary</p>' +
// 		'  <p class="con-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
// 		'  <div class="con-scroll">' +
// 		'    <table id="con-tbl"><thead></thead>' +
// 		'    <tbody><tr><td colspan="7" style="text-align:center;padding:30px;color:#aaa;">Loading\u2026</td></tr></tbody>' +
// 		'    </table>' +
// 		'  </div>' +
// 		'</div>' +

// 		/* Operating Expenses cross-tab table */
// 		'<div class="opex-wrap">' +
// 		'  <p class="opex-title" id="opex-title">Operating Expenses \u2013 Unit Wise Breakdown</p>' +
// 		'  <p class="opex-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
// 		'  <div class="opex-scroll">' +
// 		'    <table id="opex-tbl"><thead></thead>' +
// 		'    <tbody><tr><td colspan="5" style="text-align:center;padding:30px;color:#aaa;">Loading\u2026</td></tr></tbody>' +
// 		'    </table>' +
// 		'  </div>' +
// 		'</div>' +

// 		'</div>'
// 	);

// 	// =============================================================================
// 	// HELPERS
// 	// =============================================================================
// 	function getPrevFY(fy){
// 		var p=(fy||'2025-26').split('-');
// 		return (parseInt(p[0],10)-1)+'-'+String(parseInt(p[1],10)-1).padStart(2,'0');
// 	}
// 	var MONTHS=['April','May','June','July','August','September','October','November','December','January','February','March'];

// 	function monthYearLabel(month,fy){
// 		var fyStart=parseInt((fy||'2025-26').split('-')[0],10);
// 		var calYear=['January','February','March'].indexOf(month)!==-1?fyStart+1:fyStart;
// 		return month+'-'+calYear;
// 	}

// 	// =============================================================================
// 	// FILTER CONTROLS
// 	// =============================================================================
// 	var _ready=false, _curFY='', _prevFY='', _curMonth='';

// 	var fyCtrl=frappe.ui.form.make_control({
// 		parent:$('#mis-fy-wrap'),
// 		df:{label:'Financial Year',fieldtype:'Select',fieldname:'financial_year',reqd:1,
// 			change:function(){if(_ready)loadData();}},
// 		render_input:true
// 	});
// 	fyCtrl.refresh();

// 	var moCtrl=frappe.ui.form.make_control({
// 		parent:$('#mis-mo-wrap'),
// 		df:{label:'Month (YTD up to)',fieldtype:'Select',fieldname:'month',reqd:1,
// 			options:MONTHS.join('\n'),
// 			change:function(){if(_ready)loadData();}},
// 		render_input:true
// 	});
// 	moCtrl.refresh();

// 	frappe.call({
// 		method:'annual_budget.api.filter_options.get_financial_year_list',
// 		callback:function(r){
// 			if(!r.message||!r.message.length)return;
// 			var years=r.message.map(function(d){return d.financial_year;});
// 			fyCtrl.df.options=years.join('\n'); fyCtrl.refresh();
// 			var today=new Date(),y=today.getFullYear(),m=today.getMonth()+1;
// 			var curFY=(m>=4?y:y-1)+'-'+String(m>=4?y+1:y).slice(-2);
// 			var target=years.indexOf(curFY)!==-1?curFY:years[0];
// 			var mName=['January','February','March','April','May','June','July','August','September','October','November','December'][m-1];
// 			fyCtrl.set_value(target);
// 			moCtrl.set_value(MONTHS.indexOf(mName)!==-1?mName:'March');
// 			_ready=true; loadData();
// 		}
// 	});

// 	// =============================================================================
// 	// DATA FETCH
// 	// =============================================================================
// 	function fetchData(fy,month){
// 		return new Promise(function(resolve){
// 			frappe.call({
// 				method:'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 				args:{financial_year:fy,month:month,table_name_filter:'Unit Wise Plan'},
// 				callback:function(r){
// 					var d=Array.isArray(r.message)?r.message
// 						:(r.message&&Array.isArray(r.message.message))?r.message.message
// 						:(r.message&&Array.isArray(r.message.data))?r.message.data:[];
// 					resolve(d);
// 				},
// 				error:function(){resolve([]);}
// 			});
// 		});
// 	}

// 	// =============================================================================
// 	// EXTRACTION
// 	// =============================================================================
// 	function norm(s){return(s||'').replace(/\s+/g,' ').trim().toUpperCase();}
// 	function zero(){return{opex_b:0,capex_b:0,covid_b:0,total_b:0,opex_a:0,capex_a:0,covid_a:0,total_a:0};}
// 	function addZ(a,b){
// 		return{opex_b:a.opex_b+b.opex_b,capex_b:a.capex_b+b.capex_b,covid_b:a.covid_b+b.covid_b,total_b:a.total_b+b.total_b,
// 			opex_a:a.opex_a+b.opex_a,capex_a:a.capex_a+b.capex_a,covid_a:a.covid_a+b.covid_a,total_a:a.total_a+b.total_a};
// 	}
// 	function extractRow(entry){
// 		var r=zero();
// 		(entry.actuals||[]).forEach(function(sec){
// 			var nm=norm(sec.name),b=parseFloat(sec.ytd||0),a=parseFloat(sec.total_posted_amt_ytd||0);
// 			if(nm==='OPERATING EXPENSES'||nm==='OPERATING  EXPENSES'){r.opex_b+=b;r.opex_a+=a;}
// 			else if(nm==='CAPITAL EXPENSES'||nm==='CAPITAL  EXPENSES'){r.capex_b+=b;r.capex_a+=a;}
// 			else if(nm.indexOf('COVID')!==-1){r.covid_b+=b;r.covid_a+=a;}
// 		});
// 		r.total_b=r.opex_b+r.capex_b+r.covid_b; r.total_a=r.opex_a+r.capex_a+r.covid_a;
// 		return r;
// 	}
// 	function extractConsolidated(e){
// 		var r=zero();
// 		(e.actuals||[]).forEach(function(a){
// 			var nm=norm(a.name),b=parseFloat(a.ytd||0),ac=parseFloat(a.total_posted_amt_ytd||0);
// 			if(nm==='OPEX TOTAL'){r.opex_b+=b;r.opex_a+=ac;}
// 			if(nm==='CAPEX TOTAL'){r.capex_b+=b;r.capex_a+=ac;}
// 			if(nm.indexOf('COVID')!==-1){r.covid_b+=b;r.covid_a+=ac;}
// 			if(nm==='OVERALL GRAND TOTAL'){r.total_b=b;r.total_a=ac;}
// 		});
// 		if(!r.total_b&&!r.total_a){r.total_b=r.opex_b+r.capex_b+r.covid_b;r.total_a=r.opex_a+r.capex_a+r.covid_a;}
// 		return r;
// 	}
// 	function buildMap(data){
// 		var sorted=(data||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
// 		var rows={},subFlags={},order=[],grand=null;
// 		sorted.forEach(function(e){
// 			var tbl=(e.table_name||'').toUpperCase();
// 			if(e.sequence_id===9999||tbl==='CONSOLIDATED'){grand=extractConsolidated(e);return;}
// 			var lbl=(e.label||'').trim(); if(!lbl)return;
// 			rows[lbl]=extractRow(e); subFlags[lbl]=e.is_this_sub_item===1; order.push(lbl);
// 		});
// 		if(!grand){grand=zero();order.forEach(function(l){if(!subFlags[l])grand=addZ(grand,rows[l]);});}
// 		return{order:order,rows:rows,subFlags:subFlags,grand:grand};
// 	}

// 	// =============================================================================
// 	// FORMATTERS
// 	// =============================================================================
// 	function fmtCr(v){
// 		var n=parseFloat(v)||0; if(!isFinite(n)||n===0)return'-';
// 		var res=n/10000000,neg=res<0,s=Math.abs(res).toFixed(2).split('.');
// 		var ip=s[0]; if(ip.length>3)ip=ip.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+ip.slice(-3);
// 		return(neg?'-':'')+ip+'.'+s[1];
// 	}
// 	function fmtPct(act,bud){
// 		var a=parseFloat(act)||0,b=parseFloat(bud)||0;
// 		if(!b)return'-';
// 		return(a/b*100).toFixed(1)+'%';
// 	}
// 	function mkTd(val,cls,rowLbl,colKey){
// 		var n=parseFloat(val)||0,txt=fmtCr(n),c=cls?' class="'+cls+'"':'';
// 		if(n!==0&&isFinite(n)){
// 			var ctx=(rowLbl||'')+(colKey?' \u00B7 '+colKey:'');
// 			return '<td'+c+' data-raw="'+n+'" data-ctx="'+ctx.replace(/"/g,'&quot;')+'">'+txt+'</td>';
// 		}
// 		return '<td'+c+'>'+txt+'</td>';
// 	}
// 	function mkTdRaw(val,cls,rowLbl,colKey){
// 		/* for consolidated table where value is already in Cr */
// 		var n=parseFloat(val)||0;
// 		var txt=n===0?'-':(n<0?'-':'')+Math.abs(n).toFixed(2);
// 		var c=cls?' class="'+cls+'"':'';
// 		if(n!==0&&isFinite(n)){
// 			var ctx=(rowLbl||'')+(colKey?' \u00B7 '+colKey:'');
// 			/* store raw*10M so tooltip shows full rupee */
// 			return '<td'+c+' data-raw="'+(n*10000000)+'" data-ctx="'+ctx.replace(/"/g,'&quot;')+'">'+txt+'</td>';
// 		}
// 		return '<td'+c+'>'+txt+'</td>';
// 	}

// 	// =============================================================================
// 	// DETAIL TABLE RENDER
// 	// =============================================================================
// 	function buildHeader(curFY,prevFY){
// 		var r1=
// 			'<tr class="r-yr">'+
// 			'<th rowspan="3" class="col-lbl" style="text-align:left;">Unit / Function</th>'+
// 			'<th colspan="8">Current Year &nbsp;'+curFY+'</th>'+
// 			'<th colspan="8" class="sep-yr">Last Year &nbsp;'+prevFY+'</th>'+
// 			'</tr>';
// 		var r2=
// 			'<tr class="r-grp">'+
// 			'<th colspan="4">Budget</th>'+
// 			'<th colspan="4" class="sep-in">Actual</th>'+
// 			'<th colspan="4" class="sep-yr">Budget</th>'+
// 			'<th colspan="4" class="sep-in">Actual</th>'+
// 			'</tr>';
// 		function sub(fc){return '<th'+(fc?' class="'+fc+'"':'')+'>Opex</th><th>Capex</th><th class="cv-hdr">Covid</th><th>Total</th>';}
// 		var r3='<tr class="r-sub">'+sub('')+sub('sep-in')+sub('sep-yr')+sub('sep-in')+'</tr>';
// 		$('#mis-tbl thead').empty().append(r1+r2+r3);
// 	}

// 	function bodyRow(r){
// 		var cls=r.isTotal?'r-total':r.isSub?'r-sub-item':'';
// 		var lS=r.isSub?'padding-left:26px;':'',c=r.cur,p=r.prev,lbl=r.label;
// 		return '<tr class="'+cls+'">'+
// 			'<td class="col-lbl" style="'+lS+'">'+lbl+'</td>'+
// 			mkTd(c.opex_b,'',lbl,'Cur Bud Opex')+mkTd(c.capex_b,'',lbl,'Cur Bud Capex')+mkTd(c.covid_b,'cv',lbl,'Cur Bud Covid')+mkTd(c.total_b,'',lbl,'Cur Bud Total')+
// 			mkTd(c.opex_a,'ac sep-in',lbl,'Cur Act Opex')+mkTd(c.capex_a,'ac',lbl,'Cur Act Capex')+mkTd(c.covid_a,'cv',lbl,'Cur Act Covid')+mkTd(c.total_a,'ac',lbl,'Cur Act Total')+
// 			mkTd(p.opex_b,'sep-yr',lbl,'Prev Bud Opex')+mkTd(p.capex_b,'',lbl,'Prev Bud Capex')+mkTd(p.covid_b,'cv',lbl,'Prev Bud Covid')+mkTd(p.total_b,'',lbl,'Prev Bud Total')+
// 			mkTd(p.opex_a,'ac sep-in',lbl,'Prev Act Opex')+mkTd(p.capex_a,'ac',lbl,'Prev Act Capex')+mkTd(p.covid_a,'cv',lbl,'Prev Act Covid')+mkTd(p.total_a,'ac',lbl,'Prev Act Total')+
// 			'</tr>';
// 	}

// 	function footRow(gc,gp){
// 		var lbl='Grand Total';
// 		return '<tr class="r-grand">'+
// 			'<td class="col-lbl">Grand Total</td>'+
// 			mkTd(gc.opex_b,'',lbl,'Cur Bud Opex')+mkTd(gc.capex_b,'',lbl,'Cur Bud Capex')+mkTd(gc.covid_b,'cv',lbl,'Cur Bud Covid')+mkTd(gc.total_b,'',lbl,'Cur Bud Total')+
// 			mkTd(gc.opex_a,'ac sep-in',lbl,'Cur Act Opex')+mkTd(gc.capex_a,'ac',lbl,'Cur Act Capex')+mkTd(gc.covid_a,'cv',lbl,'Cur Act Covid')+mkTd(gc.total_a,'ac',lbl,'Cur Act Total')+
// 			mkTd(gp.opex_b,'sep-yr',lbl,'Prev Bud Opex')+mkTd(gp.capex_b,'',lbl,'Prev Bud Capex')+mkTd(gp.covid_b,'cv',lbl,'Prev Bud Covid')+mkTd(gp.total_b,'',lbl,'Prev Bud Total')+
// 			mkTd(gp.opex_a,'ac sep-in',lbl,'Prev Act Opex')+mkTd(gp.capex_a,'ac',lbl,'Prev Act Capex')+mkTd(gp.covid_a,'cv',lbl,'Prev Act Covid')+mkTd(gp.total_a,'ac',lbl,'Prev Act Total')+
// 			'</tr>';
// 	}

// 	function renderDetailTable(curData,prevData,curFY,prevFY){
// 		buildHeader(curFY,prevFY);
// 		var cm=buildMap(curData),pm=buildMap(prevData);
// 		var rows=cm.order.map(function(lbl){
// 			return{label:lbl,isSub:cm.subFlags[lbl],cur:cm.rows[lbl]||zero(),prev:pm.rows[lbl]||zero()};
// 		});
// 		pm.order.forEach(function(lbl){
// 			if(!cm.rows[lbl])rows.push({label:lbl,isSub:pm.subFlags[lbl],cur:zero(),prev:pm.rows[lbl]});
// 		});
// 		$('#mis-tbl tbody').empty().append(rows.map(bodyRow).join(''));
// 		$('#mis-tbl tfoot').html(footRow(cm.grand,pm.grand));
// 		return {cm:cm, pm:pm, rows:rows};
// 	}

// 	// =============================================================================
// 	// CONSOLIDATED TABLE RENDER
// 	// 2-row header: blue year label + steel Budget/Actuals/% sub-cols
// 	// The year context is already clear from Row 1 — no need for an orange repeat row
// 	// =============================================================================
// 	function renderConTable(cm,pm,curFY,prevFY){
// 		/* Row 1 — blue year labels, rowspan=2 for label column */
// 		var h1=
// 			'<tr class="cr-yr">'+
// 			'<th rowspan="2" class="col-lbl" style="text-align:left;">Areas of Work</th>'+
// 			'<th colspan="3">Current Year YTD &nbsp; '+curFY+'</th>'+
// 			'<th colspan="3" class="sep-yr">Last Year YTD &nbsp; '+prevFY+'</th>'+
// 			'</tr>';
// 		/* Row 2 — steel sub-col labels */
// 		var h2=
// 			'<tr class="cr-sub">'+
// 			'<th>Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>'+
// 			'<th class="sep-yr">Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>'+
// 			'</tr>';
// 		$('#con-tbl thead').empty().append(h1+h2);

// 		/* Build rows — use the same order as detail table */
// 		var allLabels=[];
// 		cm.order.forEach(function(l){allLabels.push(l);});
// 		pm.order.forEach(function(l){if(allLabels.indexOf(l)===-1)allLabels.push(l);});

// 		/* Convert raw paisa → Cr for consolidated table */
// 		function cr(v){return parseFloat(v)||0 ? (parseFloat(v)/10000000) : 0;}

// 		var html='', curTotal={b:0,a:0}, prevTotal={b:0,a:0};

// 		allLabels.forEach(function(lbl){
// 			var isSub=cm.subFlags[lbl]||pm.subFlags[lbl];
// 			var cv=cm.rows[lbl]||zero(), pv=pm.rows[lbl]||zero();
// 			var cb=cr(cv.total_b), ca=cr(cv.total_a);
// 			var pb=cr(pv.total_b), pa=cr(pv.total_a);

// 			if(!isSub){curTotal.b+=cb;curTotal.a+=ca;prevTotal.b+=pb;prevTotal.a+=pa;}

// 			var cls=isSub?'cr-sub-item':'';
// 			var lS=isSub?'padding-left:28px;':'';
// 			html+=
// 				'<tr class="'+cls+'">'+
// 				'<td class="col-lbl" style="'+lS+'">'+lbl+'</td>'+
// 				mkTdRaw(cb,'',lbl,'Cur Budget')+
// 				mkTdRaw(ca,'con-act',lbl,'Cur Actuals')+
// 				'<td class="con-pct">'+fmtPct(ca,cb)+'</td>'+
// 				mkTdRaw(pb,'sep-yr',lbl,'Prev Budget')+
// 				mkTdRaw(pa,'con-act',lbl,'Prev Actuals')+
// 				'<td class="con-pct">'+fmtPct(pa,pb)+'</td>'+
// 				'</tr>';
// 		});

// 		/* Total row */
// 		html+=
// 			'<tr class="cr-total">'+
// 			'<td class="col-lbl">Total</td>'+
// 			mkTdRaw(curTotal.b,'',  'Total','Cur Budget')+
// 			mkTdRaw(curTotal.a,'con-act','Total','Cur Actuals')+
// 			'<td class="con-pct">'+fmtPct(curTotal.a,curTotal.b)+'</td>'+
// 			mkTdRaw(prevTotal.b,'sep-yr','Total','Prev Budget')+
// 			mkTdRaw(prevTotal.a,'con-act','Total','Prev Actuals')+
// 			'<td class="con-pct">'+fmtPct(prevTotal.a,prevTotal.b)+'</td>'+
// 			'</tr>';

// 		$('#con-tbl tbody').empty().html(html);
// 	}

// 	// =============================================================================
// 	// OPERATING EXPENSES CROSS-TAB
// 	// Layout: Rows = Operating Expense sub-heads (e.g. Program Expenses, People Expenses)
// 	//         Cols = Units  +  "Grand Total"
// 	//         Each unit col shows: Budget (ytd) | Actual (total_posted_amt_ytd)
// 	//
// 	// API structure per entry:
// 	//   entry.actuals[] → sections like "OPERATING EXPENSES"
// 	//     section.sub_heads[] → e.g. { name:"Program Expenses", ytd:X, total_posted_amt_ytd:Y }
// 	//
// 	// Single API call — we reuse curData already fetched for the detail table.
// 	// =============================================================================

// 	/*
// 	 * Parse raw API data into a cross-tab:
// 	 * {
// 	 *   units     : [label, ...],           // ordered, top-level only
// 	 *   subHeads  : [name, ...],            // ordered sub-head names from Operating Expenses
// 	 *   matrix    : { subHead: { unit: {b, a} } },
// 	 *   unitTotals: { unit: {b, a} },
// 	 *   rowTotals : { subHead: {b, a} },
// 	 *   grand     : {b, a}
// 	 * }
// 	 */
// 	function buildOpexCrossTab(data) {
// 		var sorted = (data || []).slice().sort(function (a, b) {
// 			return (a.sequence_id || 0) - (b.sequence_id || 0);
// 		});

// 		var units       = [];   // unit labels in order
// 		var shSet       = {};   // subHead name → true
// 		var shOrder     = [];   // subHead names in order
// 		var matrix      = {};   // { subHead: { unit: {b, a} } }
// 		var unitTotals  = {};   // { unit: {b, a} }

// 		var OPEX_NAMES  = ['OPERATING EXPENSES', 'OPERATING  EXPENSES'];

// 		sorted.forEach(function (entry) {
// 			var tbl = (entry.table_name || '').toUpperCase();
// 			if (entry.sequence_id === 9999 || tbl === 'CONSOLIDATED') return;
// 			if (entry.is_this_sub_item === 1) return;   // top-level units only

// 			var unit = (entry.label || '').trim();
// 			if (!unit) return;

// 			units.push(unit);
// 			unitTotals[unit] = { b: 0, a: 0 };

// 			(entry.actuals || []).forEach(function (section) {
// 				var sNorm = (section.name || '').replace(/\s+/g, ' ').trim().toUpperCase();
// 				if (OPEX_NAMES.indexOf(sNorm) === -1) return; // only Operating Expenses section

// 				(section.sub_heads || []).forEach(function (sh) {
// 					var shName = (sh.name || '').trim();
// 					if (!shName) return;
// 					var b = parseFloat(sh.ytd || 0) / 10000000;                    // Budget → Cr
// 					var a = parseFloat(sh.total_posted_amt_ytd || 0) / 10000000;   // Actual → Cr

// 					if (!shSet[shName]) { shSet[shName] = true; shOrder.push(shName); }
// 					if (!matrix[shName]) matrix[shName] = {};
// 					if (!matrix[shName][unit]) matrix[shName][unit] = { b: 0, a: 0 };
// 					matrix[shName][unit].b += b;
// 					matrix[shName][unit].a += a;
// 					unitTotals[unit].b += b;
// 					unitTotals[unit].a += a;
// 				});
// 			});
// 		});

// 		// Row totals and grand total
// 		var rowTotals = {}, grand = { b: 0, a: 0 };
// 		shOrder.forEach(function (sh) {
// 			var rb = 0, ra = 0;
// 			units.forEach(function (u) {
// 				var v = (matrix[sh] && matrix[sh][u]) || { b: 0, a: 0 };
// 				rb += v.b; ra += v.a;
// 			});
// 			rowTotals[sh] = { b: rb, a: ra };
// 		});
// 		units.forEach(function (u) {
// 			grand.b += unitTotals[u].b;
// 			grand.a += unitTotals[u].a;
// 		});

// 		return { units: units, subHeads: shOrder, matrix: matrix,
// 		         unitTotals: unitTotals, rowTotals: rowTotals, grand: grand };
// 	}

// 	/* Format a Cr value already in Cr (not raw rupees) */
// 	function fmtCr2(v) {
// 		var n = parseFloat(v) || 0;
// 		if (!isFinite(n) || n === 0) return '-';
// 		var neg = n < 0, abs = Math.abs(n);
// 		var s = abs.toFixed(2).split('.');
// 		var ip = s[0];
// 		if (ip.length > 3) ip = ip.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+ip.slice(-3);
// 		return (neg?'-':'')+ip+'.'+s[1];
// 	}

// 	/* Build a <td> that already holds a Cr value; raw rupees stored for tooltip */
// 	function mkOpexTd(crVal, cls, rowLbl, colLbl) {
// 		var n = parseFloat(crVal) || 0, txt = fmtCr2(n);
// 		var c = cls ? ' class="'+cls+'"' : '';
// 		if (n !== 0 && isFinite(n)) {
// 			var ctx = (rowLbl||'') + (colLbl ? ' \u00B7 '+colLbl : '');
// 			return '<td'+c+' data-raw="'+(n*10000000)+'" data-ctx="'+ctx.replace(/"/g,'&quot;')+'">'+txt+'</td>';
// 		}
// 		return '<td'+c+'>'+txt+'</td>';
// 	}

// 	function renderOpexTable(curData, fy, month) {
// 		var ct = buildOpexCrossTab(curData);

// 		$('#opex-title').text('Operating Expenses \u2013 Unit Wise Breakdown (' + fy + ', YTD ' + month + ')');

// 		if (!ct.units.length || !ct.subHeads.length) {
// 			$('#opex-tbl thead').empty();
// 			$('#opex-tbl tbody').html(
// 				'<tr><td colspan="3" style="text-align:center;padding:30px;color:#aaa;">No operating expense data.</td></tr>'
// 			);
// 			return;
// 		}

// 		// ── Header ──
// 		// Row 1 (blue): "Expense Category" (rowspan=2) | each unit (colspan=3) | "Grand Total" (colspan=3)
// 		var r1 = '<tr class="ox-hdr ox-yr">' +
// 			'<th rowspan="2" class="col-lbl">Expense Category</th>';
// 		ct.units.forEach(function (u) {
// 			r1 += '<th colspan="3">' + u + '</th>';
// 		});
// 		r1 += '<th colspan="3" class="gt-hdr">Grand Total</th></tr>';

// 		// Row 2 (steel): Budget | Actual | % per unit, then Budget | Actual | % for Grand Total
// 		var r2 = '<tr class="ox-hdr ox-sub">';
// 		ct.units.forEach(function () {
// 			r2 += '<th>Budget</th><th class="act-hdr">Actual</th><th class="pct-hdr">%</th>';
// 		});
// 		r2 += '<th>Budget</th><th class="act-hdr">Actual</th><th class="pct-hdr">%</th></tr>';

// 		$('#opex-tbl thead').empty().append(r1 + r2);

// 		// ── Body rows ──
// 		var bodyHtml = '';
// 		ct.subHeads.forEach(function (sh) {
// 			bodyHtml += '<tr><td class="col-lbl">' + sh + '</td>';
// 			ct.units.forEach(function (u) {
// 				var v = (ct.matrix[sh] && ct.matrix[sh][u]) || { b: 0, a: 0 };
// 				bodyHtml += mkOpexTd(v.b, '', sh, u + ' Budget');
// 				bodyHtml += mkOpexTd(v.a, 'act-cell', sh, u + ' Actual');
// 				bodyHtml += '<td class="pct-cell">' + fmtPct(v.a, v.b) + '</td>';
// 			});
// 			bodyHtml += mkOpexTd(ct.rowTotals[sh].b, 'gt-cell', sh, 'Grand Total Budget');
// 			bodyHtml += mkOpexTd(ct.rowTotals[sh].a, 'gt-act-cell', sh, 'Grand Total Actual');
// 			bodyHtml += '<td class="gt-pct-cell">' + fmtPct(ct.rowTotals[sh].a, ct.rowTotals[sh].b) + '</td>';
// 			bodyHtml += '</tr>';
// 		});

// 		// ── Total row ──
// 		bodyHtml += '<tr class="ox-total"><td class="col-lbl">Total</td>';
// 		ct.units.forEach(function (u) {
// 			bodyHtml += mkOpexTd(ct.unitTotals[u].b, '', 'Total', u + ' Budget');
// 			bodyHtml += mkOpexTd(ct.unitTotals[u].a, 'act-cell', 'Total', u + ' Actual');
// 			bodyHtml += '<td class="pct-cell">' + fmtPct(ct.unitTotals[u].a, ct.unitTotals[u].b) + '</td>';
// 		});
// 		bodyHtml += mkOpexTd(ct.grand.b, 'gt-cell', 'Total', 'Grand Budget');
// 		bodyHtml += mkOpexTd(ct.grand.a, 'gt-act-cell', 'Total', 'Grand Actual');
// 		bodyHtml += '<td class="gt-pct-cell">' + fmtPct(ct.grand.a, ct.grand.b) + '</td>';
// 		bodyHtml += '</tr>';

// 		$('#opex-tbl tbody').empty().html(bodyHtml);
// 	}

// 	// =============================================================================
// 	// LOAD — single API call reused for all three tables
// 	// =============================================================================
// 	function loadData(){
// 		var fy    = fyCtrl.get_value();
// 		var month = moCtrl.get_value();
// 		if (!fy || !month) return;

// 		_curFY = fy; _prevFY = getPrevFY(fy); _curMonth = month;
// 		var ytdLabel = monthYearLabel(month, fy);
// 		$('#mis-title').text('Foundation Budget vs. Actuals \u2013 FY '+fy+' & FY '+_prevFY+' | YTD '+ytdLabel);
// 		Loader.show('Loading Monthly MIS\u2026');

// 		// Only TWO API calls: current FY + previous FY
// 		// curData is reused for all three tables — no extra fetch needed
// 		Promise.all([
// 			fetchData(fy, month),
// 			fetchData(_prevFY, month)
// 		])
// 		.then(function (res) {
// 			Loader.hide();
// 			var curData  = res[0];
// 			var prevData = res[1];

// 			if (!curData.length && !prevData.length) {
// 				$('#mis-tbl thead').empty(); $('#mis-tbl tfoot').empty();
// 				$('#mis-tbl tbody').html('<tr><td colspan="17" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				$('#con-tbl tbody').html('<tr><td colspan="7" style="text-align:center;padding:30px;color:#aaa;">No data available.</td></tr>');
// 				$('#opex-tbl thead').empty();
// 				$('#opex-tbl tbody').html('<tr><td colspan="3" style="text-align:center;padding:30px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}

// 			// Table 1 + 2: detail + consolidated — both use curData + prevData
// 			var maps = renderDetailTable(curData, prevData, fy, _prevFY);
// 			renderConTable(maps.cm, maps.pm, fy, _prevFY);

// 			// Table 3: opex cross-tab — reuses curData (no extra API call)
// 			renderOpexTable(curData, fy, month);
// 		})
// 		.catch(function (err) {
// 			Loader.hide();
// 			console.error('Monthly MIS error:', err);
// 			$('#mis-tbl tbody').html('<tr><td colspan="17" style="text-align:center;padding:40px;color:red;">Error loading data.</td></tr>');
// 		});
// 	}

// };


// frappe.pages['monthly-mis'].on_page_load = function (wrapper) {

// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper, title: 'Monthly MIS', single_column: true
// 	});

// 	// =============================================================================
// 	// LOADER
// 	// =============================================================================
// 	if (!$('#mis-loader').length) {
// 		$('body').append(
// 			'<div id="mis-loader" class="mis-loader-overlay">' +
// 			'<div class="mis-loader-box">' +
// 			'<img src="/files/APF logo.png" class="mis-loader-logo" alt="">' +
// 			'<div class="mis-loader-text">Loading, please wait</div>' +
// 			'</div></div>'
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
// 	// EXPORT BUTTON
// 	// =============================================================================
// 	page.set_primary_action('Export Excel', function () {
// 		var fy    = fyCtrl.get_value();
// 		var month = moCtrl.get_value();
// 		if (!fy || !month) { frappe.msgprint('Please select Financial Year and Month first.'); return; }
// 		var prevFY = getPrevFY(fy);
// 		var url = frappe.urllib.get_full_url(
// 			'/api/method/annual_budget.api.monthly_mis_export.export_monthly_mis'
// 			+ '?financial_year='      + encodeURIComponent(fy)
// 			+ '&month='               + encodeURIComponent(month)
// 			+ '&prev_financial_year=' + encodeURIComponent(prevFY)
// 		);
// 		window.open(url, '_blank');
// 	}, 'octicon octicon-cloud-download');

// 	// =============================================================================
// 	// STYLES
// 	// =============================================================================
// 	$(page.body).append('<style>' +

// 		'#mis-wrap{' +
// 		'  --font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
// 		'  --fs-xs:11px;--fs-sm:12px;--fs-base:13px;--fs-md:13px;' +
// 		'  --fw-n:400;--fw-sb:600;--fw-b:700;' +
// 		'  --r1:#1565C0;--r2:#F26B21;--r3:#455A64;' +
// 		'  --tot-bg:#DBEAFE;--tot-fg:#1E3A5F;' +
// 		'  --act-bg:#FFF3EE;--cov-bg:#FFFDE7;' +
// 		'  --bdc:#64748B;--bdw:1px;' +
// 		'}' +

// 		/* ── Wrapper ── */
// 		'#mis-wrap{padding:12px 16px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:#1a1a1a;line-height:1.5;}' +
// 		'#mis-wrap *{box-sizing:border-box;}' +

// 		/* ── Filters ── */
// 		'.mis-filters{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;margin-bottom:10px;}' +
// 		'.mis-fc{min-width:150px;flex:1 1 150px;max-width:240px;}' +

// 		/* ── Titles & notes ── */
// 		'.sec-title{margin:0 0 2px;font-size:15px;font-weight:var(--fw-b);color:#1a1a1a;text-decoration:underline;}' +
// 		'.sec-note{margin:0 0 4px;text-align:right;font-size:11px;font-style:italic;color:#777;}' +
// 		'.sec-note strong{font-style:normal;font-weight:var(--fw-b);}' +
// 		'.sec-wrap{padding-top:28px;}' +

// 		/* ── Scroll container ──
// 		   CRITICAL: overflow-y:auto (NOT visible) is required for position:sticky to work.
// 		   Each table has its own scroll container so headers stick within their own box,
// 		   never overlapping the Frappe page toolbar. isolation:isolate prevents z-index bleed. */
// 		'.tbl-scroll{' +
// 		'  overflow-x:auto;overflow-y:auto;' +
// 		'  max-height:60vh;' +
// 		'  border:var(--bdw) solid var(--bdc);border-radius:4px;background:#fff;' +
// 		'  -webkit-overflow-scrolling:touch;isolation:isolate;' +
// 		'}' +
// 		/* Short tables — expand naturally but keep overflow:auto for sticky */
// 		'.tbl-scroll.no-maxh{max-height:none;}' +

// 		/* ── Shared table base ── */
// 		'.mis-tbl{border-collapse:separate;border-spacing:0;width:100%;table-layout:auto;}' +
// 		'.mis-tbl th,.mis-tbl td{' +
// 		'  border-top:var(--bdw) solid var(--bdc);' +
// 		'  border-right:var(--bdw) solid var(--bdc);' +
// 		'  border-bottom:var(--bdw) solid var(--bdc);' +
// 		'  border-left:0;' +
// 		'  padding:7px 10px;white-space:nowrap;text-align:right;vertical-align:middle;' +
// 		'  font-size:var(--fs-base);color:#1a1a1a;background:#fff;' +
// 		'}' +
// 		'.mis-tbl th:first-child,.mis-tbl td:first-child{border-left:var(--bdw) solid var(--bdc);}' +

// 		/* ── Sticky header rows — top set by setStickyTops() after render ── */
// 		'.mis-tbl thead th{position:sticky;top:0;z-index:20;}' +

// 		/* ── Header colour classes ── */
// 		'.hdr-blue th{background:var(--r1)!important;color:#fff;font-size:14px;font-weight:var(--fw-b);text-align:center;border-color:rgba(255,255,255,.2);padding:9px 10px;}' +
// 		'.hdr-blue th:first-child{border-left-color:rgba(255,255,255,.2);}' +
// 		'.hdr-orange th{background:var(--r2)!important;color:#fff;font-size:12px;font-weight:var(--fw-b);text-align:center;border-color:rgba(255,255,255,.2);padding:6px 10px;}' +
// 		'.hdr-orange th:first-child{border-left-color:rgba(255,255,255,.2);}' +
// 		'.hdr-steel th{background:var(--r3)!important;color:#fff;font-size:11px;font-weight:var(--fw-sb);text-align:center;border-color:rgba(255,255,255,.15);padding:5px 10px;min-width:74px;}' +
// 		'.hdr-steel th:first-child{border-left-color:rgba(255,255,255,.15);}' +
// 		'.hdr-steel2 th{background:var(--r3)!important;color:#fff;font-size:12px;font-weight:var(--fw-sb);text-align:center;border-color:rgba(255,255,255,.15);padding:6px 12px;min-width:90px;}' +
// 		'.hdr-steel2 th:first-child{border-left-color:rgba(255,255,255,.15);}' +
// 		'.hdr-steel th.cv-hdr{color:#FFD54F;font-style:italic;}' +
// 		'.hdr-steel th.pct-hdr,.hdr-steel2 th.pct-hdr{color:#90CAF9;}' +

// 		/* ── Body rows ── */
// 		'.mis-tbl tbody tr:hover td{background:#F8FAFC!important;}' +

// 		/* ── Grand Total (tfoot) ── */
// 		'.mis-tbl tfoot tr.r-grand td{background:var(--r1)!important;color:#fff!important;font-weight:var(--fw-b);border-color:rgba(255,255,255,.2)!important;}' +
// 		'.mis-tbl tfoot tr.r-grand td:first-child{border-left-color:rgba(255,255,255,.2)!important;}' +
// 		'.mis-tbl tfoot tr.r-grand td.ac,.mis-tbl tfoot tr.r-grand td.cv{background:var(--r1)!important;color:#fff!important;font-style:normal!important;}' +

// 		/* ── Total rows ── */
// 		'.mis-tbl tbody tr.r-total td,' +
// 		'.mis-tbl tbody tr.ex-total td,' +
// 		'.mis-tbl tbody tr.cr-total td,' +
// 		'.mis-tbl tbody tr.ut-total td{' +
// 		'  font-weight:var(--fw-b);background:var(--tot-bg)!important;color:var(--tot-fg);border-color:#93C5FD!important;' +
// 		'}' +
// 		'.mis-tbl tbody tr.r-total:hover td,' +
// 		'.mis-tbl tbody tr.ex-total:hover td,' +
// 		'.mis-tbl tbody tr.cr-total:hover td,' +
// 		'.mis-tbl tbody tr.ut-total:hover td{background:var(--tot-bg)!important;}' +

// 		/* ── Sub-item indent ── */
// 		'.mis-tbl tbody tr.r-sub-item td:first-child,' +
// 		'.mis-tbl tbody tr.cr-sub-item td:first-child{padding-left:24px;color:#555;}' +

// 		/* ── Actual wash (not on total rows) ── */
// 		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.ac,' +
// 		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.ex-act,' +
// 		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.con-act,' +
// 		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.ud-act{background:var(--act-bg)!important;}' +

// 		/* ── Covid tint ── */
// 		'.mis-tbl tbody tr:not(.r-total) td.cv{background:var(--cov-bg)!important;color:#795548;font-style:italic;}' +

// 		/* ── % columns ── */
// 		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.ex-pct,' +
// 		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.con-pct,' +
// 		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.ud-pct{color:#1565C0;font-weight:var(--fw-sb);}' +

// 		/* ── Sticky label column ── */
// 		'.mis-tbl thead th.col-lbl{position:sticky;left:0;z-index:30;text-align:left!important;min-width:200px;}' +
// 		'.mis-tbl tbody td.col-lbl,.mis-tbl tfoot td.col-lbl{position:sticky;left:0;z-index:10;text-align:left!important;min-width:200px;background:#fff;}' +
// 		'.mis-tbl thead th.col-lbl.bl{background:var(--r1);}' +
// 		'.mis-tbl thead th.col-lbl.or{background:var(--r2);}' +
// 		'.mis-tbl thead th.col-lbl.st{background:var(--r3);}' +
// 		'.mis-tbl tbody tr.r-total td.col-lbl,' +
// 		'.mis-tbl tbody tr.ex-total td.col-lbl,' +
// 		'.mis-tbl tbody tr.cr-total td.col-lbl,' +
// 		'.mis-tbl tbody tr.ut-total td.col-lbl{background:var(--tot-bg)!important;color:var(--tot-fg);}' +
// 		'.mis-tbl tfoot td.col-lbl{background:var(--r1)!important;}' +
// 		'.mis-tbl tbody tr:hover td.col-lbl{background:#F8FAFC!important;}' +
// 		'.mis-tbl tbody tr.r-total:hover td.col-lbl,' +
// 		'.mis-tbl tbody tr.ex-total:hover td.col-lbl,' +
// 		'.mis-tbl tbody tr.cr-total:hover td.col-lbl,' +
// 		'.mis-tbl tbody tr.ut-total:hover td.col-lbl{background:var(--tot-bg)!important;}' +

// 		/* ── Column separators ── */
// 		'.mis-tbl .sep-yr{border-left:2px solid #1D4ED8!important;}' +
// 		'.mis-tbl .sep-in{border-left:1px solid #94A3B8!important;}' +
// 		'.hdr-blue th.sep-yr,.hdr-blue th.sep-in,' +
// 		'.hdr-orange th.sep-yr,.hdr-orange th.sep-in,' +
// 		'.hdr-steel th.sep-yr,.hdr-steel th.sep-in,' +
// 		'.hdr-steel2 th.sep-yr,' +
// 		'.mis-tbl tfoot tr.r-grand td.sep-yr,' +
// 		'.mis-tbl tfoot tr.r-grand td.sep-in{border-left-color:rgba(255,255,255,.4)!important;}' +

// 		/* ── UNIT DETAIL GRID ── */
// 		'.ud-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:8px;}' +
// 		'.ud-card-title{margin:0 0 2px;font-size:13px;font-weight:var(--fw-b);color:#1a1a1a;font-style:italic;text-decoration:underline;}' +
// 		'.ud-card-note{margin:0 0 3px;font-size:10px;font-style:italic;color:#777;text-align:right;}' +
// 		'.ud-card-note strong{font-style:normal;}' +

// 		/* ── Responsive ── */
// 		'@media(max-width:1100px){.ud-grid{grid-template-columns:1fr;}}' +
// 		'@media(max-width:768px){' +
// 		'  #mis-wrap{padding:8px;}' +
// 		'  .mis-fc{max-width:100%;}' +
// 		'  .mis-tbl th,.mis-tbl td{padding:5px 7px;font-size:12px;}' +
// 		'  .mis-tbl thead th.col-lbl,.mis-tbl tbody td.col-lbl,.mis-tbl tfoot td.col-lbl{min-width:130px;}' +
// 		'  .tbl-scroll{max-height:50vh;}' +
// 		'}' +

// 		/* ── Tooltip ── */
// 		'#mis-tt{position:fixed;z-index:999998;pointer-events:none;background:#1E293B;color:#F8FAFC;' +
// 		'  font-family:var(--font);font-size:13px;padding:8px 12px;border-radius:6px;' +
// 		'  box-shadow:0 4px 16px rgba(0,0,0,.4);opacity:0;transition:opacity .12s ease;white-space:nowrap;line-height:1.6;}' +
// 		'#mis-tt .tt-amt{font-size:15px;font-weight:700;color:#fff;}' +
// 		'#mis-tt .tt-sub{font-size:11px;color:#93C5FD;margin-top:2px;}' +

// 		/* ── Loader ── */
// 		'#mis-loader.mis-loader-overlay{position:fixed;inset:0;background:rgba(15,23,42,.92);backdrop-filter:blur(8px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
// 		'.mis-loader-box{display:flex;flex-direction:column;align-items:center;gap:16px;}' +
// 		'.mis-loader-logo{width:84px;height:84px;border-radius:50%;background:linear-gradient(145deg,#fff,#e2e8f0);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.4);animation:mis-p 1.6s infinite ease-in-out;}' +
// 		'.mis-loader-text{font-size:14px;color:#fff;font-weight:600;letter-spacing:.5px;opacity:.9;}' +
// 		'@keyframes mis-p{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.07);opacity:1;}}' +

// 		'</style>'
// 	);

// 	// =============================================================================
// 	// STICKY TOPS — call after each table renders to stack header rows correctly
// 	// =============================================================================
// 	function setStickyTops(sel) {
// 		var offset = 0;
// 		$(sel + ' thead tr').each(function () {
// 			$(this).find('th').css('top', offset + 'px');
// 			offset += $(this).outerHeight();
// 		});
// 	}

// 	// =============================================================================
// 	// TOOLTIP
// 	// =============================================================================
// 	if (!$('#mis-tt').length) {
// 		$('body').append('<div id="mis-tt"><div class="tt-amt"></div><div class="tt-sub"></div></div>');
// 	}
// 	var $tt = $('#mis-tt');
// 	function ttShow(e,raw,ctx){
// 		var n=parseFloat(raw)||0; if(!n||!isFinite(n)){ttHide();return;}
// 		var neg=n<0,abs=Math.abs(n);
// 		$tt.find('.tt-amt').text((neg?'-':'')+'\u20B9 '+abs.toLocaleString('en-IN'));
// 		$tt.find('.tt-sub').text((neg?'-':'')+(abs/10000000).toFixed(2)+' Cr'+(ctx?' \u00B7 '+ctx:''));
// 		ttPos(e); $tt.css('opacity',1);
// 	}
// 	function ttPos(e){
// 		var x=e.clientX+14,y=e.clientY-8,w=$tt.outerWidth()||220,h=$tt.outerHeight()||60;
// 		if(x+w>window.innerWidth-8)x=e.clientX-w-14;
// 		if(y+h>window.innerHeight-8)y=e.clientY-h-8;
// 		$tt.css({left:x,top:y});
// 	}
// 	function ttHide(){ $tt.css('opacity',0); }
// 	$(document)
// 		.on('mouseenter','#mis-wrap td[data-raw]',function(e){ttShow(e,$(this).data('raw'),$(this).data('ctx'));})
// 		.on('mousemove', '#mis-wrap td[data-raw]',function(e){ttPos(e);})
// 		.on('mouseleave','#mis-wrap td[data-raw]',function(){ttHide();});

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================
// 	$(page.body).append(
// 		'<div id="mis-wrap">' +

// 		/* Filters */
// 		'<div class="mis-filters">' +
// 		'  <div class="mis-fc" id="mis-fy-wrap"></div>' +
// 		'  <div class="mis-fc" id="mis-mo-wrap"></div>' +
// 		'</div>' +

// 		/* Hidden detail table — data fetched, not shown */
// 		'<div style="display:none;">' +
// 		'  <table id="mis-tbl" class="mis-tbl"><thead></thead><tbody></tbody><tfoot></tfoot></table>' +
// 		'</div>' +

// 		/* Consolidated Summary */
// 		'<div class="sec-wrap">' +
// 		'  <p class="sec-title">Consolidated Summary</p>' +
// 		'  <p class="sec-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
// 		'  <div class="tbl-scroll no-maxh">' +
// 		'    <table id="con-tbl" class="mis-tbl"><thead></thead>' +
// 		'    <tbody><tr><td colspan="7" style="text-align:center;padding:28px;color:#aaa;">Loading\u2026</td></tr></tbody>' +
// 		'    </table>' +
// 		'  </div>' +
// 		'</div>' +

// 		/* Operating Expense */
// 		'<div class="sec-wrap">' +
// 		'  <p class="sec-title" id="opex-title">Operating Expense \u2013 Budget vs. Actuals</p>' +
// 		'  <p class="sec-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
// 		'  <div class="tbl-scroll no-maxh">' +
// 		'    <table id="opex-tbl" class="mis-tbl"><thead></thead>' +
// 		'    <tbody><tr><td colspan="7" style="text-align:center;padding:28px;color:#aaa;">Loading\u2026</td></tr></tbody>' +
// 		'    </table>' +
// 		'  </div>' +
// 		'</div>' +

// 		/* Capital Expense */
// 		'<div class="sec-wrap">' +
// 		'  <p class="sec-title" id="capex-title">Capital Expense \u2013 Budget vs. Actuals</p>' +
// 		'  <p class="sec-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
// 		'  <div class="tbl-scroll no-maxh">' +
// 		'    <table id="capex-tbl" class="mis-tbl"><thead></thead>' +
// 		'    <tbody><tr><td colspan="7" style="text-align:center;padding:28px;color:#aaa;">Loading\u2026</td></tr></tbody>' +
// 		'    </table>' +
// 		'  </div>' +
// 		'</div>' +

// 		/* Unit Detail Grid */
// 		'<div class="sec-wrap">' +
// 		'  <p class="sec-title" id="ud-title">Operating Expense \u2013 Unit Wise Detail</p>' +
// 		'  <p class="sec-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
// 		'  <div class="ud-grid" id="ud-grid">Loading\u2026</div>' +
// 		'</div>' +

// 		'</div>'
// 	);

// 	// =============================================================================
// 	// HELPERS
// 	// =============================================================================
// 	function getPrevFY(fy){
// 		var p=(fy||'2025-26').split('-');
// 		return (parseInt(p[0],10)-1)+'-'+String(parseInt(p[1],10)-1).padStart(2,'0');
// 	}
// 	var MONTHS=['April','May','June','July','August','September','October','November','December','January','February','March'];
// 	function monthYearLabel(month,fy){
// 		var s=parseInt((fy||'2025-26').split('-')[0],10);
// 		return month+'-'+(['January','February','March'].indexOf(month)!==-1?s+1:s);
// 	}

// 	// =============================================================================
// 	// FILTER CONTROLS
// 	// =============================================================================
// 	var _ready=false, _curFY='', _prevFY='';

// 	var fyCtrl=frappe.ui.form.make_control({
// 		parent:$('#mis-fy-wrap'),
// 		df:{label:'Financial Year',fieldtype:'Select',fieldname:'financial_year',reqd:1,
// 			change:function(){if(_ready)loadData();}},
// 		render_input:true
// 	});
// 	fyCtrl.refresh();

// 	var moCtrl=frappe.ui.form.make_control({
// 		parent:$('#mis-mo-wrap'),
// 		df:{label:'Month (YTD up to)',fieldtype:'Select',fieldname:'month',reqd:1,
// 			options:MONTHS.join('\n'),
// 			change:function(){if(_ready)loadData();}},
// 		render_input:true
// 	});
// 	moCtrl.refresh();

// 	frappe.call({
// 		method:'annual_budget.api.filter_options.get_financial_year_list',
// 		callback:function(r){
// 			if(!r.message||!r.message.length)return;
// 			var years=r.message.map(function(d){return d.financial_year;});
// 			fyCtrl.df.options=years.join('\n'); fyCtrl.refresh();
// 			var today=new Date(),y=today.getFullYear(),m=today.getMonth()+1;
// 			var curFY=(m>=4?y:y-1)+'-'+String(m>=4?y+1:y).slice(-2);
// 			var target=years.indexOf(curFY)!==-1?curFY:years[0];
// 			var mName=['January','February','March','April','May','June','July','August','September','October','November','December'][m-1];
// 			fyCtrl.set_value(target);
// 			moCtrl.set_value(MONTHS.indexOf(mName)!==-1?mName:'March');
// 			_ready=true; loadData();
// 		}
// 	});

// 	// =============================================================================
// 	// DATA FETCH
// 	// =============================================================================
// 	function fetchData(fy,month){
// 		return new Promise(function(resolve){
// 			frappe.call({
// 				method:'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 				args:{financial_year:fy,month:month,table_name_filter:'Monthly MIS Capex & Opex'},
// 				callback:function(r){
// 					var d=Array.isArray(r.message)?r.message
// 						:(r.message&&Array.isArray(r.message.message))?r.message.message
// 						:(r.message&&Array.isArray(r.message.data))?r.message.data:[];
// 					resolve(d);
// 				},
// 				error:function(){resolve([]);}
// 			});
// 		});
// 	}

// 	// =============================================================================
// 	// EXTRACTION
// 	// =============================================================================
// 	function norm(s){return(s||'').replace(/\s+/g,' ').trim().toUpperCase();}
// 	function zero(){return{opex_b:0,capex_b:0,covid_b:0,total_b:0,opex_a:0,capex_a:0,covid_a:0,total_a:0};}
// 	function addZ(a,b){
// 		return{opex_b:a.opex_b+b.opex_b,capex_b:a.capex_b+b.capex_b,covid_b:a.covid_b+b.covid_b,total_b:a.total_b+b.total_b,
// 			opex_a:a.opex_a+b.opex_a,capex_a:a.capex_a+b.capex_a,covid_a:a.covid_a+b.covid_a,total_a:a.total_a+b.total_a};
// 	}
// 	function extractRow(entry){
// 		var r=zero();
// 		(entry.actuals||[]).forEach(function(sec){
// 			var nm=norm(sec.name),b=parseFloat(sec.ytd||0),a=parseFloat(sec.total_posted_amt_ytd||0);
// 			if(nm==='OPERATING EXPENSES'||nm==='OPERATING  EXPENSES'){r.opex_b+=b;r.opex_a+=a;}
// 			else if(nm==='CAPITAL EXPENSES'||nm==='CAPITAL  EXPENSES'){r.capex_b+=b;r.capex_a+=a;}
// 			else if(nm.indexOf('COVID')!==-1){r.covid_b+=b;r.covid_a+=a;}
// 		});
// 		r.total_b=r.opex_b+r.capex_b+r.covid_b; r.total_a=r.opex_a+r.capex_a+r.covid_a;
// 		return r;
// 	}
// 	function extractConsolidated(e){
// 		var r=zero();
// 		(e.actuals||[]).forEach(function(a){
// 			var nm=norm(a.name),b=parseFloat(a.ytd||0),ac=parseFloat(a.total_posted_amt_ytd||0);
// 			if(nm==='OPEX TOTAL'){r.opex_b+=b;r.opex_a+=ac;}
// 			if(nm==='CAPEX TOTAL'){r.capex_b+=b;r.capex_a+=ac;}
// 			if(nm.indexOf('COVID')!==-1){r.covid_b+=b;r.covid_a+=ac;}
// 			if(nm==='OVERALL GRAND TOTAL'){r.total_b=b;r.total_a=ac;}
// 		});
// 		if(!r.total_b&&!r.total_a){r.total_b=r.opex_b+r.capex_b+r.covid_b;r.total_a=r.opex_a+r.capex_a+r.covid_a;}
// 		return r;
// 	}
// 	function buildMap(data){
// 		var sorted=(data||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
// 		var rows={},subFlags={},order=[],grand=null;
// 		sorted.forEach(function(e){
// 			var tbl=(e.table_name||'').toUpperCase();
// 			if(e.sequence_id===9999||tbl==='CONSOLIDATED'){grand=extractConsolidated(e);return;}
// 			var lbl=(e.label||'').trim(); if(!lbl)return;
// 			rows[lbl]=extractRow(e); subFlags[lbl]=e.is_this_sub_item===1; order.push(lbl);
// 		});
// 		if(!grand){grand=zero();order.forEach(function(l){if(!subFlags[l])grand=addZ(grand,rows[l]);});}
// 		return{order:order,rows:rows,subFlags:subFlags,grand:grand};
// 	}

// 	// =============================================================================
// 	// FORMATTERS
// 	// =============================================================================
// 	function fmtCr(v){
// 		var n=parseFloat(v)||0; if(!isFinite(n)||n===0)return'-';
// 		var res=n/10000000,neg=res<0,s=Math.abs(res).toFixed(2).split('.');
// 		var ip=s[0]; if(ip.length>3)ip=ip.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+ip.slice(-3);
// 		return(neg?'-':'')+ip+'.'+s[1];
// 	}
// 	function fmtPct(act,bud){
// 		var a=parseFloat(act)||0,b=parseFloat(bud)||0;
// 		if(!b)return'-';
// 		return(a/b*100).toFixed(1)+'%';
// 	}
// 	/* Raw paisa value → formatted td with tooltip */
// 	function mkTd(val,cls,rowLbl,colKey){
// 		var n=parseFloat(val)||0,txt=fmtCr(n),c=cls?' class="'+cls+'"':'';
// 		if(n!==0&&isFinite(n)){
// 			var ctx=(rowLbl||'')+(colKey?' \u00B7 '+colKey:'');
// 			return '<td'+c+' data-raw="'+n+'" data-ctx="'+ctx.replace(/"/g,'&quot;')+'">'+txt+'</td>';
// 		}
// 		return '<td'+c+'>'+txt+'</td>';
// 	}
// 	/* Cr value already converted → td with tooltip */
// 	function mkTdCr(crVal,cls,rowLbl,colKey){
// 		var n=parseFloat(crVal)||0;
// 		var txt=n===0?'-':(function(){
// 			var neg=n<0,abs=Math.abs(n),s=abs.toFixed(2).split('.');
// 			var ip=s[0];
// 			if(ip.length>3)ip=ip.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+ip.slice(-3);
// 			return(neg?'-':'')+ip+'.'+s[1];
// 		})();
// 		var c=cls?' class="'+cls+'"':'';
// 		if(n!==0&&isFinite(n)){
// 			var ctx=(rowLbl||'')+(colKey?' \u00B7 '+colKey:'');
// 			return '<td'+c+' data-raw="'+(n*10000000)+'" data-ctx="'+ctx.replace(/"/g,'&quot;')+'">'+txt+'</td>';
// 		}
// 		return '<td'+c+'>'+txt+'</td>';
// 	}

// 	// =============================================================================
// 	// DETAIL TABLE (hidden — provides data for other tables)
// 	// =============================================================================
// 	function buildHeader(curFY,prevFY){
// 		var r1='<tr class="hdr-blue"><th rowspan="3" class="col-lbl bl" style="text-align:left;">Unit / Function</th>'+
// 			'<th colspan="8">Current Year &nbsp;'+curFY+'</th>'+
// 			'<th colspan="8" class="sep-yr">Last Year &nbsp;'+prevFY+'</th></tr>';
// 		var r2='<tr class="hdr-orange"><th colspan="4">Budget</th><th colspan="4" class="sep-in">Actual</th>'+
// 			'<th colspan="4" class="sep-yr">Budget</th><th colspan="4" class="sep-in">Actual</th></tr>';
// 		function sub(fc){return '<th'+(fc?' class="'+fc+'"':'')+'>Opex</th><th>Capex</th><th class="cv-hdr">Covid</th><th>Total</th>';}
// 		var r3='<tr class="hdr-steel">'+sub('')+sub('sep-in')+sub('sep-yr')+sub('sep-in')+'</tr>';
// 		$('#mis-tbl thead').empty().append(r1+r2+r3);
// 	}
// 	function bodyRow(r){
// 		var cls=r.isTotal?'r-total':r.isSub?'r-sub-item':'';
// 		var lS=r.isSub?'padding-left:26px;':'',c=r.cur,p=r.prev,lbl=r.label;
// 		return '<tr class="'+cls+'"><td class="col-lbl" style="'+lS+'">'+lbl+'</td>'+
// 			mkTd(c.opex_b,'',lbl,'Cur Bud Opex')+mkTd(c.capex_b,'',lbl,'Cur Bud Capex')+mkTd(c.covid_b,'cv',lbl,'Cur Bud Covid')+mkTd(c.total_b,'',lbl,'Cur Bud Total')+
// 			mkTd(c.opex_a,'ac sep-in',lbl,'Cur Act Opex')+mkTd(c.capex_a,'ac',lbl,'Cur Act Capex')+mkTd(c.covid_a,'cv',lbl,'Cur Act Covid')+mkTd(c.total_a,'ac',lbl,'Cur Act Total')+
// 			mkTd(p.opex_b,'sep-yr',lbl,'Prev Bud Opex')+mkTd(p.capex_b,'',lbl,'Prev Bud Capex')+mkTd(p.covid_b,'cv',lbl,'Prev Bud Covid')+mkTd(p.total_b,'',lbl,'Prev Bud Total')+
// 			mkTd(p.opex_a,'ac sep-in',lbl,'Prev Act Opex')+mkTd(p.capex_a,'ac',lbl,'Prev Act Capex')+mkTd(p.covid_a,'cv',lbl,'Prev Act Covid')+mkTd(p.total_a,'ac',lbl,'Prev Act Total')+
// 			'</tr>';
// 	}
// 	function footRow(gc,gp){
// 		var lbl='Grand Total';
// 		return '<tr class="r-grand"><td class="col-lbl">Grand Total</td>'+
// 			mkTd(gc.opex_b,'',lbl,'Cur Bud Opex')+mkTd(gc.capex_b,'',lbl,'Cur Bud Capex')+mkTd(gc.covid_b,'cv',lbl,'Cur Bud Covid')+mkTd(gc.total_b,'',lbl,'Cur Bud Total')+
// 			mkTd(gc.opex_a,'ac sep-in',lbl,'Cur Act Opex')+mkTd(gc.capex_a,'ac',lbl,'Cur Act Capex')+mkTd(gc.covid_a,'cv',lbl,'Cur Act Covid')+mkTd(gc.total_a,'ac',lbl,'Cur Act Total')+
// 			mkTd(gp.opex_b,'sep-yr',lbl,'Prev Bud Opex')+mkTd(gp.capex_b,'',lbl,'Prev Bud Capex')+mkTd(gp.covid_b,'cv',lbl,'Prev Bud Covid')+mkTd(gp.total_b,'',lbl,'Prev Bud Total')+
// 			mkTd(gp.opex_a,'ac sep-in',lbl,'Prev Act Opex')+mkTd(gp.capex_a,'ac',lbl,'Prev Act Capex')+mkTd(gp.covid_a,'cv',lbl,'Prev Act Covid')+mkTd(gp.total_a,'ac',lbl,'Prev Act Total')+
// 			'</tr>';
// 	}
// 	function renderDetailTable(curData,prevData,curFY,prevFY){
// 		buildHeader(curFY,prevFY);
// 		var cm=buildMap(curData),pm=buildMap(prevData);
// 		var rows=cm.order.map(function(lbl){
// 			return{label:lbl,isSub:cm.subFlags[lbl],cur:cm.rows[lbl]||zero(),prev:pm.rows[lbl]||zero()};
// 		});
// 		pm.order.forEach(function(lbl){
// 			if(!cm.rows[lbl])rows.push({label:lbl,isSub:pm.subFlags[lbl],cur:zero(),prev:pm.rows[lbl]});
// 		});
// 		$('#mis-tbl tbody').empty().append(rows.map(bodyRow).join(''));
// 		$('#mis-tbl tfoot').html(footRow(cm.grand,pm.grand));
// 		setStickyTops('#mis-tbl');
// 		return {cm:cm,pm:pm};
// 	}

// 	// =============================================================================
// 	// CONSOLIDATED TABLE
// 	// =============================================================================
// 	function renderConTable(cm,pm,curFY,prevFY){
// 		$('#con-tbl thead').empty().append(
// 			'<tr class="hdr-blue"><th rowspan="2" class="col-lbl bl" style="text-align:left;">Areas of Work</th>'+
// 			'<th colspan="3">Current Year YTD &nbsp; '+curFY+'</th>'+
// 			'<th colspan="3" class="sep-yr">Last Year YTD &nbsp; '+prevFY+'</th></tr>'+
// 			'<tr class="hdr-steel2">'+
// 			'<th>Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>'+
// 			'<th class="sep-yr">Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>'+
// 			'</tr>'
// 		);
// 		var allLabels=[];
// 		cm.order.forEach(function(l){allLabels.push(l);});
// 		pm.order.forEach(function(l){if(allLabels.indexOf(l)===-1)allLabels.push(l);});
// 		function cr(v){return(parseFloat(v)||0)/10000000;}
// 		var html='',cTot={b:0,a:0},pTot={b:0,a:0};
// 		allLabels.forEach(function(lbl){
// 			var isSub=cm.subFlags[lbl]||pm.subFlags[lbl];
// 			var cv=cm.rows[lbl]||zero(),pv=pm.rows[lbl]||zero();
// 			var cb=cr(cv.total_b),ca=cr(cv.total_a),pb=cr(pv.total_b),pa=cr(pv.total_a);
// 			if(!isSub){cTot.b+=cb;cTot.a+=ca;pTot.b+=pb;pTot.a+=pa;}
// 			var cls=isSub?'cr-sub-item':'',lS=isSub?'padding-left:28px;':'';
// 			html+='<tr class="'+cls+'"><td class="col-lbl" style="'+lS+'">'+lbl+'</td>'+
// 				mkTdCr(cb,'',lbl,'Cur Budget')+mkTdCr(ca,'con-act',lbl,'Cur Actuals')+'<td class="con-pct">'+fmtPct(ca,cb)+'</td>'+
// 				mkTdCr(pb,'sep-yr',lbl,'Prev Budget')+mkTdCr(pa,'con-act',lbl,'Prev Actuals')+'<td class="con-pct">'+fmtPct(pa,pb)+'</td></tr>';
// 		});
// 		html+='<tr class="cr-total"><td class="col-lbl">Total</td>'+
// 			mkTdCr(cTot.b,'',  'Total','Cur Budget')+mkTdCr(cTot.a,'con-act','Total','Cur Actuals')+'<td class="con-pct">'+fmtPct(cTot.a,cTot.b)+'</td>'+
// 			mkTdCr(pTot.b,'sep-yr','Total','Prev Budget')+mkTdCr(pTot.a,'con-act','Total','Prev Actuals')+'<td class="con-pct">'+fmtPct(pTot.a,pTot.b)+'</td></tr>';
// 		$('#con-tbl tbody').empty().html(html);
// 		setStickyTops('#con-tbl');
// 	}

// 	// =============================================================================
// 	// OPERATING / CAPITAL EXPENSE TABLES  (top-level units only)
// 	// =============================================================================
// 	var OPEX_NAMES  = ['OPERATING EXPENSES','OPERATING  EXPENSES'];
// 	var CAPEX_NAMES = ['CAPITAL EXPENSES','CAPITAL  EXPENSES'];

// 	function extractSection(entry,names){
// 		var b=0,a=0;
// 		(entry.actuals||[]).forEach(function(sec){
// 			var nm=(sec.name||'').replace(/\s+/g,' ').trim().toUpperCase();
// 			if(names.indexOf(nm)!==-1){b+=parseFloat(sec.ytd||0)/10000000;a+=parseFloat(sec.total_posted_amt_ytd||0)/10000000;}
// 		});
// 		return{b:b,a:a};
// 	}
// 	function buildExpRows(curData,prevData,names){
// 		function idx(data){
// 			var sorted=(data||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
// 			var map={},order={},subFlags={};
// 			sorted.forEach(function(e){
// 				var tbl=(e.table_name||'').toUpperCase();
// 				if(e.sequence_id===9999||tbl==='CONSOLIDATED')return;
// 				var lbl=(e.label||'').trim(); if(!lbl)return;
// 				map[lbl]=extractSection(e,names);
// 				subFlags[lbl]=e.is_this_sub_item===1;
// 				order[lbl]=e.sequence_id||0;
// 			});
// 			return{map:map,order:order,subFlags:subFlags};
// 		}
// 		var cm=idx(curData),pm=idx(prevData),rows=[],seen={};
// 		/* Build ordered list from curData, preserving sequence */
// 		var curSorted=(curData||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
// 		curSorted.forEach(function(e){
// 			var tbl=(e.table_name||'').toUpperCase();
// 			if(e.sequence_id===9999||tbl==='CONSOLIDATED')return;
// 			var lbl=(e.label||'').trim(); if(!lbl||seen[lbl])return;
// 			seen[lbl]=true;
// 			rows.push({
// 				label:lbl,
// 				isSub:cm.subFlags[lbl]||false,
// 				cur:cm.map[lbl]||{b:0,a:0},
// 				prev:pm.map[lbl]||{b:0,a:0}
// 			});
// 		});
// 		/* Add any units only in prevData */
// 		var prevSorted=(prevData||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
// 		prevSorted.forEach(function(e){
// 			var tbl=(e.table_name||'').toUpperCase();
// 			if(e.sequence_id===9999||tbl==='CONSOLIDATED')return;
// 			var lbl=(e.label||'').trim(); if(!lbl||seen[lbl])return;
// 			seen[lbl]=true;
// 			rows.push({label:lbl,isSub:pm.subFlags[lbl]||false,cur:{b:0,a:0},prev:pm.map[lbl]||{b:0,a:0}});
// 		});
// 		return rows;
// 	}
// 	function renderExpTable(tblId,titleId,rows,curFY,prevFY,month){
// 		var ytd=monthYearLabel(month,curFY);
// 		$('#'+titleId).text($('#'+titleId).text().split('\u2013')[0].trim()+' \u2013 YTD '+ytd);
// 		$('#'+tblId+' thead').empty().append(
// 			'<tr class="hdr-blue"><th rowspan="2" class="col-lbl bl" style="text-align:left;">Areas of Work</th>'+
// 			'<th colspan="3">Current Year YTD &nbsp; '+curFY+'</th>'+
// 			'<th colspan="3" class="sep-yr">Last Year YTD &nbsp; '+prevFY+'</th></tr>'+
// 			'<tr class="hdr-steel2">'+
// 			'<th>Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>'+
// 			'<th class="sep-yr">Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th></tr>'
// 		);
// 		var tCB=0,tCA=0,tPB=0,tPA=0,html='';
// 		rows.forEach(function(r){
// 			/* Only non-sub rows contribute to totals */
// 			if(!r.isSub){tCB+=r.cur.b;tCA+=r.cur.a;tPB+=r.prev.b;tPA+=r.prev.a;}
// 			var cls=r.isSub?'r-sub-item':'';
// 			var lS=r.isSub?'padding-left:26px;':'';
// 			html+='<tr class="'+cls+'"><td class="col-lbl" style="'+lS+'">'+r.label+'</td>'+
// 				mkTdCr(r.cur.b,'',r.label,'Cur Budget')+mkTdCr(r.cur.a,'ex-act',r.label,'Cur Actuals')+'<td class="ex-pct">'+fmtPct(r.cur.a,r.cur.b)+'</td>'+
// 				mkTdCr(r.prev.b,'sep-yr',r.label,'Prev Budget')+mkTdCr(r.prev.a,'ex-act',r.label,'Prev Actuals')+'<td class="ex-pct">'+fmtPct(r.prev.a,r.prev.b)+'</td></tr>';
// 		});
// 		html+='<tr class="ex-total"><td class="col-lbl">Total</td>'+
// 			mkTdCr(tCB,'','Total','Cur Budget')+mkTdCr(tCA,'ex-act','Total','Cur Actuals')+'<td class="ex-pct">'+fmtPct(tCA,tCB)+'</td>'+
// 			mkTdCr(tPB,'sep-yr','Total','Prev Budget')+mkTdCr(tPA,'ex-act','Total','Prev Actuals')+'<td class="ex-pct">'+fmtPct(tPA,tPB)+'</td></tr>';
// 		$('#'+tblId+' tbody').empty().html(html);
// 		setStickyTops('#'+tblId);
// 	}

// 	// =============================================================================
// 	// =============================================================================
// 	// UNIT DETAIL GRID  — Current Year + Last Year columns per unit card
// 	// =============================================================================
// 	function renderUnitDetailGrid(curData, prevData, fy, month){
// 		var ytd    = monthYearLabel(month, fy);
// 		var prevFY = getPrevFY(fy);
// 		$('#ud-title').text('Operating Expense \u2013 Unit Wise Detail \u2013 YTD '+ytd);

// 		/* Build prevData lookup: unit label → { catName: {b,a} } */
// 		var prevLookup = {};
// 		(prevData||[]).forEach(function(entry){
// 			var lbl=(entry.label||'').trim(); if(!lbl)return;
// 			var pm={};
// 			(entry.actuals||[]).forEach(function(sec){
// 				var nm=(sec.name||'').replace(/\s+/g,' ').trim().toUpperCase();
// 				if(OPEX_NAMES.indexOf(nm)!==-1){
// 					(sec.sub_heads||[]).forEach(function(sh){
// 						var n=(sh.name||'').trim(); if(!n)return;
// 						pm[n]={b:parseFloat(sh.ytd||0)/10000000,a:parseFloat(sh.total_posted_amt_ytd||0)/10000000};
// 					});
// 				}
// 			});
// 			prevLookup[lbl]=pm;
// 		});

// 		var sorted=(curData||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
// 		var gridHtml='';

// 		sorted.forEach(function(entry){
// 			var tbl=(entry.table_name||'').toUpperCase();
// 			if(entry.sequence_id===9999||tbl==='CONSOLIDATED')return;
// 			var unit=(entry.label||'').trim(); if(!unit)return;

// 			/* Current year sub_heads */
// 			var curMap={},catOrder=[],catSeen={};
// 			(entry.actuals||[]).forEach(function(sec){
// 				var nm=(sec.name||'').replace(/\s+/g,' ').trim().toUpperCase();
// 				if(OPEX_NAMES.indexOf(nm)!==-1){
// 					(sec.sub_heads||[]).forEach(function(sh){
// 						var n=(sh.name||'').trim(); if(!n)return;
// 						curMap[n]={b:parseFloat(sh.ytd||0)/10000000,a:parseFloat(sh.total_posted_amt_ytd||0)/10000000};
// 						if(!catSeen[n]){catSeen[n]=true;catOrder.push(n);}
// 					});
// 				}
// 			});

// 			/* Also pick up categories only in prev year */
// 			var pm=prevLookup[unit]||{};
// 			Object.keys(pm).forEach(function(n){if(!catSeen[n]){catSeen[n]=true;catOrder.push(n);}});

// 			if(!catOrder.length)return;

// 			var tCB=0,tCA=0,tPB=0,tPA=0,rows='';
// 			catOrder.forEach(function(cat){
// 				var c=curMap[cat]||{b:0,a:0};
// 				var p=pm[cat]||{b:0,a:0};
// 				tCB+=c.b;tCA+=c.a;tPB+=p.b;tPA+=p.a;
// 				rows+=
// 					'<tr>'+
// 					'<td class="col-lbl" style="text-align:left;">'+cat+'</td>'+
// 					mkTdCr(c.b,'',cat,unit+' Cur Bud')+
// 					mkTdCr(c.a,'ex-act',cat,unit+' Cur Act')+
// 					'<td class="ex-pct">'+fmtPct(c.a,c.b)+'</td>'+
// 					mkTdCr(p.b,'sep-yr',cat,unit+' Prev Bud')+
// 					mkTdCr(p.a,'ex-act',cat,unit+' Prev Act')+
// 					'<td class="ex-pct">'+fmtPct(p.a,p.b)+'</td>'+
// 					'</tr>';
// 			});
// 			rows+=
// 				'<tr class="ex-total">'+
// 				'<td class="col-lbl">Total</td>'+
// 				mkTdCr(tCB,'','Total',unit+' Cur Bud')+
// 				mkTdCr(tCA,'ex-act','Total',unit+' Cur Act')+
// 				'<td class="ex-pct">'+fmtPct(tCA,tCB)+'</td>'+
// 				mkTdCr(tPB,'sep-yr','Total',unit+' Prev Bud')+
// 				mkTdCr(tPA,'ex-act','Total',unit+' Prev Act')+
// 				'<td class="ex-pct">'+fmtPct(tPA,tPB)+'</td>'+
// 				'</tr>';

// 			var isSub=entry.is_this_sub_item===1;
// 			var tblId='udt-'+unit.replace(/[^a-z0-9]/gi,'-').toLowerCase();
// 			gridHtml+=
// 				'<div>'+
// 				'<p class="ud-card-title">'+(isSub?'\u2514\u00A0':'')+unit+'</p>'+
// 				'<p class="ud-card-note">&#8377;&nbsp;<strong>Cr.</strong></p>'+
// 				'<div class="tbl-scroll no-maxh">'+
// 				'<table id="'+tblId+'" class="mis-tbl">'+
// 				'<thead>'+
// 				'<tr class="hdr-blue">'+
// 				'<th rowspan="2" class="col-lbl bl" style="min-width:155px;">Expense Category</th>'+
// 				'<th colspan="3">Current Year YTD &nbsp; '+fy+'</th>'+
// 				'<th colspan="3" class="sep-yr">Last Year YTD &nbsp; '+prevFY+'</th>'+
// 				'</tr>'+
// 				'<tr class="hdr-steel2">'+
// 				'<th>Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>'+
// 				'<th class="sep-yr">Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>'+
// 				'</tr>'+
// 				'</thead>'+
// 				'<tbody>'+rows+'</tbody>'+
// 				'</table>'+
// 				'</div>'+
// 				'</div>';
// 		});

// 		$('#ud-grid').html(gridHtml||'<p style="color:#aaa;">No data.</p>');

// 		/* Set sticky tops for each card table after DOM insertion */
// 		setTimeout(function(){
// 			$('#ud-grid table').each(function(){
// 				var id=$(this).attr('id'); if(id)setStickyTops('#'+id);
// 			});
// 		}, 60);
// 	}

// 	// =============================================================================
// 	// LOAD
// 	// =============================================================================
// 	function loadData(){
// 		var fy=fyCtrl.get_value(),month=moCtrl.get_value();
// 		if(!fy||!month)return;
// 		_curFY=fy; _prevFY=getPrevFY(fy);
// 		var ytd=monthYearLabel(month,fy);
// 		Loader.show('Loading Monthly MIS\u2026');
// 		Promise.all([fetchData(fy,month),fetchData(_prevFY,month)])
// 		.then(function(res){
// 			Loader.hide();
// 			var cur=res[0],prev=res[1];
// 			if(!cur.length&&!prev.length){
// 				['con-tbl','opex-tbl','capex-tbl'].forEach(function(id){
// 					$('#'+id+' thead').empty();
// 					$('#'+id+' tbody').html('<tr><td colspan="7" style="text-align:center;padding:28px;color:#aaa;">No data.</td></tr>');
// 				});
// 				$('#ud-grid').html('<p style="color:#aaa;">No data.</p>');
// 				return;
// 			}
// 			var maps=renderDetailTable(cur,prev,fy,_prevFY);
// 			renderConTable(maps.cm,maps.pm,fy,_prevFY);
// 			renderExpTable('opex-tbl','opex-title',buildExpRows(cur,prev,OPEX_NAMES),fy,_prevFY,month);
// 			renderExpTable('capex-tbl','capex-title',buildExpRows(cur,prev,CAPEX_NAMES),fy,_prevFY,month);
// 			renderUnitDetailGrid(cur, prev, fy, month);
// 		})
// 		.catch(function(err){
// 			Loader.hide();
// 			console.error('Monthly MIS:',err);
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
	// EXPORT BUTTON
	// =============================================================================
	page.set_primary_action('Export Excel', function () {
		var fy    = fyCtrl.get_value();
		var month = moCtrl.get_value();
		if (!fy || !month) { frappe.msgprint('Please select Financial Year and Month first.'); return; }
		var prevFY = getPrevFY(fy);
		var url = frappe.urllib.get_full_url(
			'/api/method/annual_budget.api.monthly_mis_export.export_monthly_mis'
			+ '?financial_year='      + encodeURIComponent(fy)
			+ '&month='               + encodeURIComponent(month)
			+ '&prev_financial_year=' + encodeURIComponent(prevFY)
		);
		window.open(url, '_blank');
	}, 'octicon octicon-cloud-download');

	// =============================================================================
	// STYLES
	// =============================================================================
	$(page.body).append('<style>' +

		'#mis-wrap{' +
		'  --font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
		'  --fs-base:14px;--fs-hdr1:15px;--fs-hdr2:13px;--fs-cell:14px;' +
		'  --fw-n:400;--fw-sb:600;--fw-b:700;' +
		'  --r1:#1565C0;--r2:#F26B21;--r3:#455A64;' +
		'  --tot-bg:#E3F2FD;--tot-fg:#0D47A1;' +
		'  --act-bg:#FFF8F5;--sub-bg:#F8F9FA;' +
		'  --bdc:#000;--bdw:1px;' +      /* all borders: solid black */
		'}' +

		/* wrapper */
		'#mis-wrap{padding:12px 16px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:#1a1a1a;line-height:1.5;}' +
		'#mis-wrap *{box-sizing:border-box;}' +

		/* filters */
		'.mis-filters{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;margin-bottom:10px;}' +
		'.mis-fc{min-width:150px;flex:1 1 150px;max-width:240px;}' +

		/* ── Section headings ── */
		'.sec-wrap{padding-top:28px;}' +
		'.sec-heading{margin:0 0 5px;}' +
		'.sec-heading .sh-line1{display:block;font-size:16px;font-weight:var(--fw-b);color:#1a1a1a;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid var(--r1);padding-bottom:3px;}' +
		'.sec-heading .sh-line2{display:block;font-size:17px;font-weight:var(--fw-sb);color:var(--r1);margin-top:4px;}' +
		'.sec-note{margin:0 0 5px;text-align:right;font-size:13px;font-weight:var(--fw-sb);color:#444;font-style:italic;}' +
		'.sec-note strong{font-style:normal;font-weight:var(--fw-b);font-size:14px;color:#1a1a1a;}' +

		/* ── Scroll container ── */
		'.tbl-scroll{overflow-x:auto;overflow-y:auto;max-height:60vh;background:#fff;-webkit-overflow-scrolling:touch;isolation:isolate;}' +
		'.tbl-scroll.no-maxh{max-height:none;}' +

		/* ══ TABLE BASE — black borders on every cell ══ */
		'.mis-tbl{border-collapse:collapse;width:100%;table-layout:auto;border:var(--bdw) solid var(--bdc);}' +
		'.mis-tbl th,.mis-tbl td{' +
		'  border:var(--bdw) solid var(--bdc);' +
		'  padding:9px 12px;white-space:nowrap;text-align:right;vertical-align:middle;' +
		'  font-size:var(--fs-cell);color:#1a1a1a;' +   /* Fix 1: bigger cell text */
		'}' +

		/* ── ROW 1: Blue year-group header ── */
		'.hdr-blue th{' +
		'  background:var(--r1)!important;color:#fff;' +
		'  font-size:var(--fs-hdr1);font-weight:var(--fw-b);text-align:center;' +
		'  border-color:#0d47a1;padding:11px 12px;letter-spacing:.2px;' +
		'}' +
		'.hdr-blue th.col-lbl{text-align:left!important;font-style:italic;}' +

		/* ── ROW 2: Orange sub-header — Budget | Actuals | % ── */
		'.hdr-orange th{' +
		'  background:var(--r2)!important;color:#fff;' +
		'  font-size:var(--fs-hdr2);font-weight:var(--fw-b);text-align:center;' +
		'  border-color:#bf360c;padding:8px 12px;' +
		'}' +
		'.hdr-orange th.pct-hdr{color:#FFF9C4;font-style:italic;}' +
		'.hdr-orange th.act-hdr{color:#FFE0B2;}' +
		'.hdr-orange th.cv-hdr{color:#FFD54F;font-style:italic;}' +

		/* ── Fix 2: ALL tables use same hdr-blue + hdr-orange pattern ── */
		/* steel rows replaced with orange for consistency */
		'.hdr-steel th{background:var(--r2)!important;color:#fff;font-size:var(--fs-hdr2);font-weight:var(--fw-b);text-align:center;border-color:#bf360c;padding:8px 12px;min-width:80px;}' +
		'.hdr-steel2 th{background:var(--r2)!important;color:#fff;font-size:var(--fs-hdr2);font-weight:var(--fw-b);text-align:center;border-color:#bf360c;padding:8px 12px;min-width:95px;}' +
		'.hdr-steel th.pct-hdr,.hdr-steel2 th.pct-hdr{color:#FFF9C4;font-style:italic;}' +
		'.hdr-steel th.cv-hdr{color:#FFD54F;font-style:italic;}' +
		'.hdr-steel th.act-hdr,.hdr-steel2 th.act-hdr{color:#FFE0B2;}' +

		/* ── STICKY headers ── */
		'.mis-tbl thead th{position:sticky;top:0;z-index:20;}' +

		/* ── Body rows ── */
		'.mis-tbl tbody tr td{background:#fff;}' +
		'.mis-tbl tbody tr:hover td{background:#F0F7FF!important;}' +

		/* ── Grand Total (tfoot) ── */
		'.mis-tbl tfoot tr.r-grand td,' +
		'.mis-tbl tfoot tr.r-grand td.ac,' +
		'.mis-tbl tfoot tr.r-grand td.cv{background:var(--r1)!important;color:#fff!important;font-weight:var(--fw-b);border-color:#0d47a1!important;font-style:normal!important;}' +

		/* ── Total rows ── */
		'.mis-tbl tbody tr.r-total td,' +
		'.mis-tbl tbody tr.ex-total td,' +
		'.mis-tbl tbody tr.cr-total td,' +
		'.mis-tbl tbody tr.ut-total td{font-weight:var(--fw-b);background:var(--tot-bg)!important;color:var(--tot-fg);border-color:#90CAF9!important;}' +
		'.mis-tbl tbody tr.r-total:hover td,' +
		'.mis-tbl tbody tr.ex-total:hover td,' +
		'.mis-tbl tbody tr.cr-total:hover td,' +
		'.mis-tbl tbody tr.ut-total:hover td{background:var(--tot-bg)!important;}' +

		/* ── Sub-item rows ── */
		'.mis-tbl tbody tr.r-sub-item td,' +
		'.mis-tbl tbody tr.cr-sub-item td{background:var(--sub-bg)!important;}' +
		'.mis-tbl tbody tr.r-sub-item td:first-child,' +
		'.mis-tbl tbody tr.cr-sub-item td:first-child{padding-left:28px;color:#555;}' +
		'.mis-tbl tbody tr.r-sub-item:hover td,' +
		'.mis-tbl tbody tr.cr-sub-item:hover td{background:#EEF0F2!important;}' +

		/* ── Actual wash ── */
		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.ac,' +
		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.ex-act,' +
		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.con-act,' +
		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.ud-act{background:var(--act-bg)!important;}' +

		/* ── COVID tint ── */
		'.mis-tbl tbody tr:not(.r-total) td.cv{background:#FFFDE7!important;color:#795548;font-style:italic;}' +

		/* ── % columns ── */
		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.ex-pct,' +
		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.con-pct,' +
		'.mis-tbl tbody tr:not(.r-total):not(.ex-total):not(.cr-total):not(.ut-total) td.ud-pct{color:var(--r1);font-weight:var(--fw-sb);}' +

		/* ── Sticky label column ── */
		'.mis-tbl thead th.col-lbl{position:sticky;left:0;z-index:30;text-align:left!important;min-width:200px;}' +
		'.mis-tbl tbody td.col-lbl,.mis-tbl tfoot td.col-lbl{position:sticky;left:0;z-index:10;text-align:left!important;min-width:200px;background:#fff;}' +
		'.mis-tbl thead th.col-lbl.bl{background:var(--r1);}' +
		'.mis-tbl thead th.col-lbl.or{background:var(--r2);}' +
		'.mis-tbl thead th.col-lbl.st{background:var(--r2);}' +   /* Fix 2: same orange */
		'.mis-tbl tbody tr.r-total td.col-lbl,' +
		'.mis-tbl tbody tr.ex-total td.col-lbl,' +
		'.mis-tbl tbody tr.cr-total td.col-lbl,' +
		'.mis-tbl tbody tr.ut-total td.col-lbl{background:var(--tot-bg)!important;color:var(--tot-fg);}' +
		'.mis-tbl tbody tr.r-sub-item td.col-lbl,.mis-tbl tbody tr.cr-sub-item td.col-lbl{background:var(--sub-bg)!important;}' +
		'.mis-tbl tbody tr.r-sub-item:hover td.col-lbl,.mis-tbl tbody tr.cr-sub-item:hover td.col-lbl{background:#EEF0F2!important;}' +
		'.mis-tbl tfoot td.col-lbl{background:var(--r1)!important;}' +
		'.mis-tbl tbody tr:hover td.col-lbl{background:#F0F7FF!important;}' +
		'.mis-tbl tbody tr.r-total:hover td.col-lbl,' +
		'.mis-tbl tbody tr.ex-total:hover td.col-lbl,' +
		'.mis-tbl tbody tr.cr-total:hover td.col-lbl,' +
		'.mis-tbl tbody tr.ut-total:hover td.col-lbl{background:var(--tot-bg)!important;}' +

		/* ── Year-group separator — thick black vertical line ── */
		'.mis-tbl .sep-yr{border-left:2px solid #000!important;}' +
		'.mis-tbl .sep-in{border-left:1px solid #555!important;}' +
		'.hdr-blue th.sep-yr,.hdr-blue th.sep-in,' +
		'.hdr-orange th.sep-yr,.hdr-orange th.sep-in,' +
		'.hdr-steel th.sep-yr,.hdr-steel th.sep-in,' +
		'.hdr-steel2 th.sep-yr{border-left-color:rgba(255,255,255,.6)!important;}' +
		'.mis-tbl tfoot tr.r-grand td.sep-yr,' +
		'.mis-tbl tfoot tr.r-grand td.sep-in{border-left-color:rgba(255,255,255,.5)!important;}' +

		/* ── UNIT DETAIL GRID — always 2 tables per row ── */
		'.ud-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:8px;}' +
		/* Total Foundation card spans full width (first card) */
		'.ud-grid .ud-total-card{grid-column:1/-1;}' +
		'.ud-card-title{margin:0 0 2px;font-size:14px;font-weight:var(--fw-b);color:#1a1a1a;border-bottom:2px solid var(--r1);padding-bottom:3px;}' +
		'.ud-card-note{margin:2px 0 4px;font-size:14px;font-weight:var(--fw-sb);font-style:italic;color:#1a1a1a;text-align:right;}' +
		'.ud-card-note strong{font-style:normal;font-weight:var(--fw-b);color:#1a1a1a;}' +

		/* Fix 4: Responsive — all screen sizes */
		/* Large screens: keep 2-col */
		'@media(min-width:1400px){.ud-grid{grid-template-columns:repeat(2,1fr);}}' +
		/* Tablet */
		'@media(max-width:1100px){' +
		'  .ud-grid{grid-template-columns:1fr;}' +
		'  .ud-grid .ud-total-card{grid-column:1;}' +
		'  .mis-tbl th,.mis-tbl td{padding:7px 9px;}' +
		'}' +
		/* Mobile */
		'@media(max-width:768px){' +
		'  #mis-wrap{padding:6px 8px;}' +
		'  .mis-fc{max-width:100%;}' +
		'  .mis-tbl th,.mis-tbl td{padding:5px 7px;font-size:12px;white-space:normal;word-break:break-word;}' +
		'  .mis-tbl thead th.col-lbl,.mis-tbl tbody td.col-lbl{min-width:110px;}' +
		'  .tbl-scroll{max-height:50vh;}' +
		'  .sec-heading .sh-line1{font-size:14px;}' +
		'}' +
		/* Very small screens */
		'@media(max-width:480px){' +
		'  .mis-tbl th,.mis-tbl td{padding:4px 5px;font-size:11px;}' +
		'  .ud-grid{gap:12px;}' +
		'}' +

		
		/* ── Tooltip ── */
		'#mis-tt{position:fixed;z-index:999998;pointer-events:none;background:#1E293B;color:#F8FAFC;' +
		'  font-family:var(--font);font-size:13px;padding:8px 12px;border-radius:6px;' +
		'  box-shadow:0 4px 16px rgba(0,0,0,.4);opacity:0;transition:opacity .12s ease;white-space:nowrap;line-height:1.6;}' +
		'#mis-tt .tt-amt{font-size:15px;font-weight:700;color:#fff;}' +
		'#mis-tt .tt-sub{font-size:11px;color:#93C5FD;margin-top:2px;}' +

		/* ── Loader ── */
		'#mis-loader.mis-loader-overlay{position:fixed;inset:0;background:rgba(15,23,42,.92);backdrop-filter:blur(8px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
		'.mis-loader-box{display:flex;flex-direction:column;align-items:center;gap:16px;}' +
		'.mis-loader-logo{width:84px;height:84px;border-radius:50%;background:linear-gradient(145deg,#fff,#e2e8f0);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.4);animation:mis-p 1.6s infinite ease-in-out;}' +
		'.mis-loader-text{font-size:14px;color:#fff;font-weight:600;letter-spacing:.5px;opacity:.9;}' +
		'@keyframes mis-p{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.07);opacity:1;}}' +

		'</style>'
	);

	// =============================================================================
	// STICKY TOPS — call after each table renders to stack header rows correctly
	// =============================================================================
	function setStickyTops(sel) {
		var offset = 0;
		$(sel + ' thead tr').each(function () {
			$(this).find('th').css('top', offset + 'px');
			offset += $(this).outerHeight();
		});
	}

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
		.on('mouseenter','#mis-wrap td[data-raw]',function(e){ttShow(e,$(this).data('raw'),$(this).data('ctx'));})
		.on('mousemove', '#mis-wrap td[data-raw]',function(e){ttPos(e);})
		.on('mouseleave','#mis-wrap td[data-raw]',function(){ttHide();});

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

		/* Hidden detail table — data fetched, not shown */
		'<div style="display:none;">' +
		'  <table id="mis-tbl" class="mis-tbl"><thead></thead><tbody></tbody><tfoot></tfoot></table>' +
		'</div>' +

		/* 1. Operating Expense */
		'<div class="sec-wrap">' +
		'  <div class="sec-heading"><span class="sh-line1">Operating Expense</span><span class="sh-line2" id="opex-subtitle">Budget vs. Actuals</span></div>' +
		'  <p class="sec-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
		'  <div class="tbl-scroll no-maxh">' +
		'    <table id="opex-tbl" class="mis-tbl"><thead></thead>' +
		'    <tbody><tr><td colspan="9" style="text-align:center;padding:28px;color:#aaa;">Loading\u2026</td></tr></tbody>' +
		'    </table>' +
		'  </div>' +
		'</div>' +

		/* 2. Capital Expense */
		'<div class="sec-wrap">' +
		'  <div class="sec-heading"><span class="sh-line1">Capital Expense</span><span class="sh-line2" id="capex-subtitle">Budget vs. Actuals</span></div>' +
		'  <p class="sec-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
		'  <div class="tbl-scroll no-maxh">' +
		'    <table id="capex-tbl" class="mis-tbl"><thead></thead>' +
		'    <tbody><tr><td colspan="9" style="text-align:center;padding:28px;color:#aaa;">Loading\u2026</td></tr></tbody>' +
		'    </table>' +
		'  </div>' +
		'</div>' +

		/* 3. Overall Budget vs Actuals */
		'<div class="sec-wrap">' +
		'  <div class="sec-heading"><span class="sh-line1">Overall Foundation</span><span class="sh-line2" id="con-subtitle">Budget vs. Actuals</span></div>' +
		'  <p class="sec-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
		'  <div class="tbl-scroll no-maxh">' +
		'    <table id="con-tbl" class="mis-tbl"><thead></thead>' +
		'    <tbody><tr><td colspan="9" style="text-align:center;padding:28px;color:#aaa;">Loading\u2026</td></tr></tbody>' +
		'    </table>' +
		'  </div>' +
		'</div>' +

		/* 4. Operating Expenses Breakdown grid */
		'<div class="sec-wrap">' +
		'  <div class="sec-heading"><span class="sh-line1">Operating Expenses Breakdown</span><span class="sh-line2" id="ud-subtitle">Budget vs. Actuals</span></div>' +
		'  <p class="sec-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
		'  <div class="ud-grid" id="ud-grid">Loading\u2026</div>' +
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
		var s=parseInt((fy||'2025-26').split('-')[0],10);
		return month+'-'+(['January','February','March'].indexOf(month)!==-1?s+1:s);
	}

	// =============================================================================
	// FILTER CONTROLS
	// =============================================================================
	var _ready=false, _curFY='', _prevFY='';
	var fyCtrl, moCtrl;  // hoisted declarations — assigned below

	fyCtrl=frappe.ui.form.make_control({
		parent:$('#mis-fy-wrap'),
		df:{label:'Financial Year',fieldtype:'Select',fieldname:'financial_year',reqd:1,
			change:function(){if(_ready)loadData();}},
		render_input:true
	});
	fyCtrl.refresh();

	moCtrl=frappe.ui.form.make_control({
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
				args:{financial_year:fy,month:month,table_name_filter:'Monthly MIS Capex & Opex',is_previous:0},
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
		var res=n/10000000,neg=res<0,s=Math.abs(res).toFixed(1).split('.');
		var ip=s[0]; if(ip.length>3)ip=ip.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+ip.slice(-3);
		return(neg?'-':'')+ip+'.'+s[1];
	}
	function fmtPct(act,bud){
		var a=parseFloat(act)||0,b=parseFloat(bud)||0;
		if(!b)return'-';
		return(a/b*100).toFixed(1)+'%';
	}
	/* Raw paisa value → formatted td with tooltip */
	function mkTd(val,cls,rowLbl,colKey){
		var n=parseFloat(val)||0,txt=fmtCr(n),c=cls?' class="'+cls+'"':'';
		if(n!==0&&isFinite(n)){
			var ctx=(rowLbl||'')+(colKey?' \u00B7 '+colKey:'');
			return '<td'+c+' data-raw="'+n+'" data-ctx="'+ctx.replace(/"/g,'&quot;')+'">'+txt+'</td>';
		}
		return '<td'+c+'>'+txt+'</td>';
	}
	/* Cr value already converted → td with tooltip */
	function mkTdCr(crVal,cls,rowLbl,colKey){
		var n=parseFloat(crVal)||0;
		var txt=n===0?'-':(function(){
			var neg=n<0,abs=Math.abs(n),s=abs.toFixed(1).split('.');
			var ip=s[0];
			if(ip.length>3)ip=ip.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+ip.slice(-3);
			return(neg?'-':'')+ip+'.'+s[1];
		})();
		var c=cls?' class="'+cls+'"':'';
		if(n!==0&&isFinite(n)){
			var ctx=(rowLbl||'')+(colKey?' \u00B7 '+colKey:'');
			return '<td'+c+' data-raw="'+(n*10000000)+'" data-ctx="'+ctx.replace(/"/g,'&quot;')+'">'+txt+'</td>';
		}
		return '<td'+c+'>'+txt+'</td>';
	}

	// =============================================================================
	// DETAIL TABLE (hidden — provides data for other tables)
	// =============================================================================
	function buildHeader(curFY,prevFY){
		var r1='<tr class="hdr-blue"><th rowspan="3" class="col-lbl bl" style="text-align:left;">Unit / Function</th>'+
			'<th colspan="8">Current Year &nbsp;'+curFY+'</th>'+
			'<th colspan="8" class="sep-yr">Last Year &nbsp;'+prevFY+'</th></tr>';
		var r2='<tr class="hdr-orange"><th colspan="4">Budget</th><th colspan="4" class="sep-in">Actual</th>'+
			'<th colspan="4" class="sep-yr">Budget</th><th colspan="4" class="sep-in">Actual</th></tr>';
		function sub(fc){return '<th'+(fc?' class="'+fc+'"':'')+'>Opex</th><th>Capex</th><th class="cv-hdr">Covid</th><th>Total</th>';}
		var r3='<tr class="hdr-steel">'+sub('')+sub('sep-in')+sub('sep-yr')+sub('sep-in')+'</tr>';
		$('#mis-tbl thead').empty().append(r1+r2+r3);
	}
	function bodyRow(r){
		var cls=r.isTotal?'r-total':r.isSub?'r-sub-item':'';
		var lS=r.isSub?'padding-left:26px;':'',c=r.cur,p=r.prev,lbl=r.label;
		return '<tr class="'+cls+'"><td class="col-lbl" style="'+lS+'">'+lbl+'</td>'+
			mkTd(c.opex_b,'',lbl,'Cur Bud Opex')+mkTd(c.capex_b,'',lbl,'Cur Bud Capex')+mkTd(c.covid_b,'cv',lbl,'Cur Bud Covid')+mkTd(c.total_b,'',lbl,'Cur Bud Total')+
			mkTd(c.opex_a,'ac sep-in',lbl,'Cur Act Opex')+mkTd(c.capex_a,'ac',lbl,'Cur Act Capex')+mkTd(c.covid_a,'cv',lbl,'Cur Act Covid')+mkTd(c.total_a,'ac',lbl,'Cur Act Total')+
			mkTd(p.opex_b,'sep-yr',lbl,'Prev Bud Opex')+mkTd(p.capex_b,'',lbl,'Prev Bud Capex')+mkTd(p.covid_b,'cv',lbl,'Prev Bud Covid')+mkTd(p.total_b,'',lbl,'Prev Bud Total')+
			mkTd(p.opex_a,'ac sep-in',lbl,'Prev Act Opex')+mkTd(p.capex_a,'ac',lbl,'Prev Act Capex')+mkTd(p.covid_a,'cv',lbl,'Prev Act Covid')+mkTd(p.total_a,'ac',lbl,'Prev Act Total')+
			'</tr>';
	}
	function footRow(gc,gp){
		var lbl='Grand Total';
		return '<tr class="r-grand"><td class="col-lbl">Grand Total</td>'+
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
		setStickyTops('#mis-tbl');
		return {cm:cm,pm:pm};
	}

	// =============================================================================
	// CONSOLIDATED TABLE
	// =============================================================================
	function renderConTable(cm,pm,curFY,prevFY,month){
		var ytd=monthYearLabel(month,curFY);
		$('#con-subtitle').text('Budget vs. Actuals \u2013 YTD '+ytd);
		$('#con-tbl thead').empty().append(
			'<tr class="hdr-blue"><th rowspan="2" class="col-lbl bl" style="text-align:left;">Areas of Work</th>'+
			'<th colspan="3">Current Year YTD &nbsp; '+curFY+'</th>'+
			'<th colspan="3" class="sep-yr">Last Year YTD &nbsp; '+prevFY+'</th></tr>'+
			'<tr class="hdr-orange">'+
			'<th>Budget</th><th class="act-hdr">Actuals</th><th class="pct-hdr">% of Budget</th>'+
			'<th class="sep-yr">Budget</th><th class="act-hdr">Actuals</th><th class="pct-hdr">% of Budget</th>'+
			'</tr>'
		);
		var allLabels=[];
		cm.order.forEach(function(l){allLabels.push(l);});
		pm.order.forEach(function(l){if(allLabels.indexOf(l)===-1)allLabels.push(l);});
		function cr(v){return(parseFloat(v)||0)/10000000;}
		var html='',cTot={b:0,a:0},pTot={b:0,a:0};
		allLabels.forEach(function(lbl){
			var isSub=cm.subFlags[lbl]||pm.subFlags[lbl];
			var cv=cm.rows[lbl]||zero(),pv=pm.rows[lbl]||zero();
			var cb=cr(cv.total_b),ca=cr(cv.total_a),pb=cr(pv.total_b),pa=cr(pv.total_a);
			if(!isSub){cTot.b+=cb;cTot.a+=ca;pTot.b+=pb;pTot.a+=pa;}
			var cls=isSub?'cr-sub-item':'',lS=isSub?'padding-left:28px;':'';
			html+='<tr class="'+cls+'"><td class="col-lbl" style="'+lS+'">'+lbl+'</td>'+
				mkTdCr(cb,'',lbl,'Cur Budget')+mkTdCr(ca,'con-act',lbl,'Cur Actuals')+'<td class="con-pct">'+fmtPct(ca,cb)+'</td>'+
				mkTdCr(pb,'sep-yr',lbl,'Prev Budget')+mkTdCr(pa,'con-act',lbl,'Prev Actuals')+'<td class="con-pct">'+fmtPct(pa,pb)+'</td></tr>';
		});
		html+='<tr class="cr-total"><td class="col-lbl">Total</td>'+
			mkTdCr(cTot.b,'',  'Total','Cur Budget')+mkTdCr(cTot.a,'con-act','Total','Cur Actuals')+'<td class="con-pct">'+fmtPct(cTot.a,cTot.b)+'</td>'+
			mkTdCr(pTot.b,'sep-yr','Total','Prev Budget')+mkTdCr(pTot.a,'con-act','Total','Prev Actuals')+'<td class="con-pct">'+fmtPct(pTot.a,pTot.b)+'</td></tr>';
		$('#con-tbl tbody').empty().html(html);
		setStickyTops('#con-tbl');
	}

	// =============================================================================
	// OPERATING / CAPITAL EXPENSE TABLES  (top-level units only)
	// =============================================================================
	var OPEX_NAMES  = ['OPERATING EXPENSES','OPERATING  EXPENSES'];
	var CAPEX_NAMES = ['CAPITAL EXPENSES','CAPITAL  EXPENSES'];

	function extractSection(entry, names){
		/* For opex/capex tables we need: opex budget, capex budget, covid budget, total budget
		   and opex actual, capex actual, covid actual, total actual */
		var ob=0,cb=0,vb=0,oa=0,ca=0,va=0;
		(entry.actuals||[]).forEach(function(sec){
			var nm=(sec.name||'').replace(/\s+/g,' ').trim().toUpperCase();
			if(names.indexOf(nm)!==-1){
				/* sum sub_heads for the correct section */
				ob+=parseFloat(sec.ytd||0)/10000000;
				oa+=parseFloat(sec.total_posted_amt_ytd||0)/10000000;
			}
		});
		/* Also gather opex/capex/covid individually using the main section names */
		var r={ob:0,cb:0,vb:0,tb:0,oa:0,ca:0,va:0,ta:0};
		(entry.actuals||[]).forEach(function(sec){
			var nm=(sec.name||'').replace(/\s+/g,' ').trim().toUpperCase();
			var b=parseFloat(sec.ytd||0)/10000000;
			var a=parseFloat(sec.total_posted_amt_ytd||0)/10000000;
			if(nm==='OPERATING EXPENSES'||nm==='OPERATING  EXPENSES'){r.ob+=b;r.oa+=a;}
			else if(nm==='CAPITAL EXPENSES'||nm==='CAPITAL  EXPENSES'){r.cb+=b;r.ca+=a;}
			else if(nm.indexOf('COVID')!==-1){r.vb+=b;r.va+=a;}
		});
		r.tb=r.ob+r.cb+r.vb; r.ta=r.oa+r.ca+r.va;
		/* For opex-only or capex-only tables, return only the relevant section */
		if(names===OPEX_NAMES) return{ob:r.ob,cb:0,vb:r.vb,tb:r.ob+r.vb,oa:r.oa,ca:0,va:r.va,ta:r.oa+r.va};
		if(names===CAPEX_NAMES) return{ob:0,cb:r.cb,vb:0,tb:r.cb,oa:0,ca:r.ca,va:0,ta:r.ca};
		return r;
	}
	function buildExpRows(curData,prevData,names){
		function idx(data){
			var sorted=(data||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
			var map={},subFlags={};
			sorted.forEach(function(e){
				var tbl=(e.table_name||'').toUpperCase();
				if(e.sequence_id===9999||tbl==='CONSOLIDATED')return;
				var lbl=(e.label||'').trim(); if(!lbl)return;
				map[lbl]=extractSection(e,names);
				subFlags[lbl]=e.is_this_sub_item===1;
			});
			return{map:map,subFlags:subFlags};
		}
		var cm=idx(curData),pm=idx(prevData),rows=[],seen={};
		var curSorted=(curData||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
		curSorted.forEach(function(e){
			var tbl=(e.table_name||'').toUpperCase();
			if(e.sequence_id===9999||tbl==='CONSOLIDATED')return;
			var lbl=(e.label||'').trim(); if(!lbl||seen[lbl])return;
			seen[lbl]=true;
			rows.push({label:lbl,isSub:cm.subFlags[lbl]||false,cur:cm.map[lbl]||{ob:0,cb:0,vb:0,tb:0,oa:0,ca:0,va:0,ta:0},prev:pm.map[lbl]||{ob:0,cb:0,vb:0,tb:0,oa:0,ca:0,va:0,ta:0}});
		});
		var prevSorted=(prevData||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
		prevSorted.forEach(function(e){
			var tbl=(e.table_name||'').toUpperCase();
			if(e.sequence_id===9999||tbl==='CONSOLIDATED')return;
			var lbl=(e.label||'').trim(); if(!lbl||seen[lbl])return;
			seen[lbl]=true;
			rows.push({label:lbl,isSub:pm.subFlags[lbl]||false,cur:{ob:0,cb:0,vb:0,tb:0,oa:0,ca:0,va:0,ta:0},prev:pm.map[lbl]||{ob:0,cb:0,vb:0,tb:0,oa:0,ca:0,va:0,ta:0}});
		});
		return rows;
	}
	function renderExpTable(tblId,subtitleId,rows,curFY,prevFY,month){
		var ytd=monthYearLabel(month,curFY);
		$('#'+subtitleId).text('Budget vs. Actuals \u2013 YTD '+ytd);

		/* 2-row header:
		   Row 1 (blue gradient): "Unit" label | curFY Budget | prevFY Actual
		   Row 2 (orange):        —             | Budget | Actual | % | Budget | Actual | % */
		$('#'+tblId+' thead').empty().append(
			'<tr class="hdr-blue">'+
			'<th rowspan="2" class="col-lbl bl" style="text-align:left;">Unit</th>'+
			'<th colspan="3">'+curFY+' &nbsp; Budget vs. Actuals</th>'+
			'<th colspan="3" class="sep-yr">'+prevFY+' &nbsp; Budget vs. Actuals</th>'+
			'</tr>'+
			'<tr class="hdr-orange">'+
			'<th>Budget</th><th class="act-hdr">Actuals</th><th class="pct-hdr">% of Budget</th>'+
			'<th class="sep-yr">Budget</th><th class="act-hdr">Actuals</th><th class="pct-hdr">% of Budget</th>'+
			'</tr>'
		);

		var tCB=0,tCA=0,tPB=0,tPA=0,html='';
		rows.forEach(function(r){
			/* cur.tb = budget total for section; prev.ta = actual total for prev year */
			var cb=r.cur.tb||0, ca=r.cur.ta||0, pb=r.prev.tb||0, pa=r.prev.ta||0;
			if(!r.isSub){tCB+=cb;tCA+=ca;tPB+=pb;tPA+=pa;}
			var cls=r.isSub?'r-sub-item':'';
			var lS=r.isSub?'padding-left:26px;':'';
			html+=
				'<tr class="'+cls+'"><td class="col-lbl" style="'+lS+'">'+r.label+'</td>'+
				mkTdCr(cb,'',r.label,'Cur Budget')+
				mkTdCr(ca,'ex-act',r.label,'Cur Actuals')+
				'<td class="ex-pct">'+fmtPct(ca,cb)+'</td>'+
				mkTdCr(pb,'sep-yr',r.label,'Prev Budget')+
				mkTdCr(pa,'ex-act',r.label,'Prev Actuals')+
				'<td class="ex-pct">'+fmtPct(pa,pb)+'</td>'+
				'</tr>';
		});
		html+=
			'<tr class="ex-total"><td class="col-lbl">Total</td>'+
			mkTdCr(tCB,'','Total','Cur Budget')+
			mkTdCr(tCA,'ex-act','Total','Cur Actuals')+
			'<td class="ex-pct">'+fmtPct(tCA,tCB)+'</td>'+
			mkTdCr(tPB,'sep-yr','Total','Prev Budget')+
			mkTdCr(tPA,'ex-act','Total','Prev Actuals')+
			'<td class="ex-pct">'+fmtPct(tPA,tPB)+'</td>'+
			'</tr>';
		$('#'+tblId+' tbody').empty().html(html);
		setStickyTops('#'+tblId);
	}

	function renderUnitDetailGrid(curData, prevData, fy, month){
		var ytd    = monthYearLabel(month, fy);
		var prevFY = getPrevFY(fy);
		$('#ud-subtitle').text('Budget vs. Actuals \u2013 YTD '+ytd);

		/* Build prevData lookup: unit label → { catName:{b,a}, __opex_total:{b,a} } */
		var prevLookup = {};
		(prevData||[]).forEach(function(entry){
			var lbl=(entry.label||'').trim(); if(!lbl)return;
			var pm={}, opexTot={b:0,a:0};
			(entry.actuals||[]).forEach(function(sec){
				var nm=(sec.name||'').replace(/\s+/g,' ').trim().toUpperCase();
				if(OPEX_NAMES.indexOf(nm)!==-1){
					/* Section-level total — same source as the opex table */
					opexTot.b+=parseFloat(sec.ytd||0)/10000000;
					opexTot.a+=parseFloat(sec.total_posted_amt_ytd||0)/10000000;
					(sec.sub_heads||[]).forEach(function(sh){
						var n=(sh.name||'').trim(); if(!n)return;
						if(!pm[n])pm[n]={b:0,a:0};
						pm[n].b+=parseFloat(sh.ytd||0)/10000000;
						pm[n].a+=parseFloat(sh.total_posted_amt_ytd||0)/10000000;
					});
				}
			});
			pm.__opex_total=opexTot;
			prevLookup[lbl]=pm;
		});

		var sorted=(curData||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});

		/* Build "Total Foundation" by aggregating sub_heads across all units.
		   Fix 2: The Total row uses sum of sub_heads (consistent within the card).
		   The opex table uses section-level total — these match when sub_heads are complete. */
		var allCatOrder=[], allCatSeen={}, allCurMap={}, allPrevMap={};
		sorted.forEach(function(entry){
			var tbl=(entry.table_name||'').toUpperCase();
			if(entry.sequence_id===9999||tbl==='CONSOLIDATED')return;
			/* Fix 1: skip sub-items — Total Foundation only aggregates top-level units */
			if(entry.is_this_sub_item===1)return;
			var unit=(entry.label||'').trim(); if(!unit)return;
			(entry.actuals||[]).forEach(function(sec){
				var nm=(sec.name||'').replace(/\s+/g,' ').trim().toUpperCase();
				if(OPEX_NAMES.indexOf(nm)!==-1){
					(sec.sub_heads||[]).forEach(function(sh){
						var n=(sh.name||'').trim(); if(!n)return;
						var b=parseFloat(sh.ytd||0)/10000000;
						var a=parseFloat(sh.total_posted_amt_ytd||0)/10000000;
						if(!allCatSeen[n]){allCatSeen[n]=true;allCatOrder.push(n);allCurMap[n]={b:0,a:0};}
						allCurMap[n].b+=b; allCurMap[n].a+=a;
					});
				}
			});
			/* Aggregate prev year sub_heads — top-level units only */
			if(entry.is_this_sub_item===1)return;
			var pm=prevLookup[unit]||{};
			Object.keys(pm).forEach(function(n){
				if(n==='__opex_total')return;
				if(!allCatSeen[n]){allCatSeen[n]=true;allCatOrder.push(n);allCurMap[n]={b:0,a:0};}
				if(!allPrevMap[n])allPrevMap[n]={b:0,a:0};
				allPrevMap[n].b+=(pm[n]||{b:0}).b;
				allPrevMap[n].a+=(pm[n]||{a:0}).a;
			});
		});

		function buildCard(cardTitle, catOrder, curMap, prevMap, tblIdSuffix, isSub, isTotal){
			var tCB=0,tCA=0,tPB=0,tPA=0,rows='';
			catOrder.forEach(function(cat){
				var c=curMap[cat]||{b:0,a:0};
				var p=prevMap[cat]||{b:0,a:0};
				tCB+=c.b; tCA+=c.a; tPB+=p.b; tPA+=p.a;
				rows+=
					'<tr>'+
					'<td class="col-lbl" style="text-align:left;">'+cat+'</td>'+
					mkTdCr(c.b,'',cat,'Cur Bud')+
					mkTdCr(c.a,'ex-act',cat,'Cur Act')+
					'<td class="ex-pct">'+fmtPct(c.a,c.b)+'</td>'+
					mkTdCr(p.b,'sep-yr',cat,'Prev Bud')+
					mkTdCr(p.a,'ex-act',cat,'Prev Act')+
					'<td class="ex-pct">'+fmtPct(p.a,p.b)+'</td>'+
					'</tr>';
			});
			rows+=
				'<tr class="ex-total"><td class="col-lbl">Total</td>'+
				mkTdCr(tCB,'','Total','Cur Bud')+
				mkTdCr(tCA,'ex-act','Total','Cur Act')+
				'<td class="ex-pct">'+fmtPct(tCA,tCB)+'</td>'+
				mkTdCr(tPB,'sep-yr','Total','Prev Bud')+
				mkTdCr(tPA,'ex-act','Total','Prev Act')+
				'<td class="ex-pct">'+fmtPct(tPA,tPB)+'</td>'+
				'</tr>';
			var tblId='udt-'+tblIdSuffix;
			/* Fix 1: Total Foundation spans both columns; unit cards are in the 2-col grid */
			var divClass=isTotal?'ud-total-card':'';
			return '<div class="'+divClass+'">'+
				'<p class="ud-card-title">'+(isSub?'\u2514\u00A0':'')+cardTitle+'</p>'+
				'<p class="ud-card-note">&#8377;&nbsp;<strong>Cr.</strong></p>'+
				'<div class="tbl-scroll no-maxh">'+
				'<table id="'+tblId+'" class="mis-tbl">'+
				'<thead>'+
				'<tr class="hdr-blue">'+
				'<th rowspan="2" class="col-lbl bl" style="min-width:175px;">Expense Category</th>'+
				'<th colspan="3">Current Year YTD &nbsp; '+fy+'</th>'+
				'<th colspan="3" class="sep-yr">Last Year YTD &nbsp; '+prevFY+'</th>'+
				'</tr>'+
				'<tr class="hdr-orange">'+
				'<th>Budget</th><th class="act-hdr">Actuals</th><th class="pct-hdr">% of Budget</th>'+
				'<th class="sep-yr">Budget</th><th class="act-hdr">Actuals</th><th class="pct-hdr">% of Budget</th>'+
				'</tr>'+
				'</thead>'+
				'<tbody>'+rows+'</tbody>'+
				'</table>'+
				'</div>'+
				'</div>';
		}

		/* First: Total Foundation card (full width) */
		var gridHtml = allCatOrder.length
			? buildCard('Total Foundation', allCatOrder, allCurMap, allPrevMap, 'total-foundation', false, true)
			: '';

		/* Then one card per unit in 2-col grid */
		sorted.forEach(function(entry){
			var tbl=(entry.table_name||'').toUpperCase();
			if(entry.sequence_id===9999||tbl==='CONSOLIDATED')return;
			var unit=(entry.label||'').trim(); if(!unit)return;

			var curMap={},catOrder=[],catSeen={};
			(entry.actuals||[]).forEach(function(sec){
				var nm=(sec.name||'').replace(/\s+/g,' ').trim().toUpperCase();
				if(OPEX_NAMES.indexOf(nm)!==-1){
					(sec.sub_heads||[]).forEach(function(sh){
						var n=(sh.name||'').trim(); if(!n)return;
						curMap[n]={b:parseFloat(sh.ytd||0)/10000000,a:parseFloat(sh.total_posted_amt_ytd||0)/10000000};
						if(!catSeen[n]){catSeen[n]=true;catOrder.push(n);}
					});
				}
			});
			var pm=prevLookup[unit]||{};
			Object.keys(pm).forEach(function(n){
				if(n==='__opex_total')return;
				if(!catSeen[n]){catSeen[n]=true;catOrder.push(n);}
			});

			if(!catOrder.length)return;
			var isSub=entry.is_this_sub_item===1;
			var tblIdSuffix=unit.replace(/[^a-z0-9]/gi,'-').toLowerCase();
			/* Remove __opex_total from pm before passing to buildCard */
			var pmClean={};
			Object.keys(pm).forEach(function(k){if(k!=='__opex_total')pmClean[k]=pm[k];});
			gridHtml+=buildCard(unit, catOrder, curMap, pmClean, tblIdSuffix, isSub, false);
		});

		$('#ud-grid').html(gridHtml||'<p style="color:#aaa;">No data.</p>');
		setTimeout(function(){
			$('#ud-grid table').each(function(){
				var id=$(this).attr('id'); if(id)setStickyTops('#'+id);
			});
		}, 60);
	}

	// =============================================================================
	// LOAD
	// =============================================================================
	function loadData(){
		if(!fyCtrl||!moCtrl)return;
		var fy=fyCtrl.get_value(),month=moCtrl.get_value();
		if(!fy||!month)return;
		_curFY=fy; _prevFY=getPrevFY(fy);
		var ytd=monthYearLabel(month,fy);
		Loader.show('Loading Monthly MIS\u2026');
		Promise.all([fetchData(fy,month),fetchData(_prevFY,month)])
		.then(function(res){
			Loader.hide();
			var cur=res[0],prev=res[1];
			if(!cur.length&&!prev.length){
				['con-tbl','opex-tbl','capex-tbl'].forEach(function(id){
					$('#'+id+' thead').empty();
					$('#'+id+' tbody').html('<tr><td colspan="7" style="text-align:center;padding:28px;color:#aaa;">No data.</td></tr>');
				});
				$('#ud-grid').html('<p style="color:#aaa;">No data.</p>');
				return;
			}
			var maps=renderDetailTable(cur,prev,fy,_prevFY);
			renderConTable(maps.cm,maps.pm,fy,_prevFY,month);
			renderExpTable('opex-tbl','opex-subtitle',buildExpRows(cur,prev,OPEX_NAMES),fy,_prevFY,month);
			renderExpTable('capex-tbl','capex-subtitle',buildExpRows(cur,prev,CAPEX_NAMES),fy,_prevFY,month);
			renderUnitDetailGrid(cur, prev, fy, month);
		})
		.catch(function(err){
			Loader.hide();
			console.error('Monthly MIS:',err);
		});
	}

};


































// frappe.pages['monthly-mis'].on_page_load = function (wrapper) {

// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper, title: 'Monthly MIS', single_column: true
// 	});

// 	// =============================================================================
// 	// LOADER
// 	// =============================================================================
// 	if (!$('#mis-loader').length) {
// 		$('body').append(
// 			'<div id="mis-loader" class="mis-loader-overlay">' +
// 			'<div class="mis-loader-box">' +
// 			'<img src="/files/APF logo.png" class="mis-loader-logo" alt="">' +
// 			'<div class="mis-loader-text">Loading, please wait</div>' +
// 			'</div></div>'
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
// 	// EXPORT BUTTON — Frappe page toolbar (top-right corner, native Frappe style)
// 	// =============================================================================
// 	page.set_primary_action('Export Excel', function () {
// 		var fy    = fyCtrl.get_value();
// 		var month = moCtrl.get_value();
// 		if (!fy || !month) { frappe.msgprint('Please select Financial Year and Month first.'); return; }
// 		var prevFY = getPrevFY(fy);
// 		var url = frappe.urllib.get_full_url(
// 			'/api/method/annual_budget.api.monthly_mis_export.export_monthly_mis'
// 			+ '?financial_year='      + encodeURIComponent(fy)
// 			+ '&month='               + encodeURIComponent(month)
// 			+ '&prev_financial_year=' + encodeURIComponent(prevFY)
// 		);
// 		window.open(url, '_blank');
// 	}, 'octicon octicon-cloud-download');

// 	$(page.body).append('<style>' +

// 		/* ── Design tokens ── */
// 		'#mis-wrap{' +
// 		'  --font:"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif;' +
// 		'  --fs-xs:11px;--fs-sm:12px;--fs-base:13px;--fs-md:13px;' +
// 		'  --fw-n:400;--fw-sb:600;--fw-b:700;' +
// 		'  --r1:#1565C0;' +       /* Year header blue          */
// 		'  --r2:#F26B21;' +       /* Group header orange       */
// 		'  --r3:#455A64;' +       /* Sub-col header steel      */
// 		'  --tot-bg:#DBEAFE;' +   /* Total row fill            */
// 		'  --tot-fg:#1E3A5F;' +   /* Total row text            */
// 		'  --act-bg:#FFF3EE;' +   /* Actual column wash        */
// 		'  --cov-bg:#FFFDE7;' +   /* Covid column tint         */
// 		/* One border colour, one weight — used everywhere */
// 		'  --bdc:#64748B;' +      /* border colour             */
// 		'  --bdw:1px;' +          /* border width              */
// 		'}' +

// 		/* wrapper */
// 		'#mis-wrap{padding:16px;background:#fff;font-family:var(--font);font-size:var(--fs-base);color:#1a1a1a;line-height:1.5;}' +
// 		'#mis-wrap *{box-sizing:border-box;}' +

// 		/* filters */
// 		'.mis-filters{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;margin-bottom:12px;}' +
// 		'.mis-fc{min-width:160px;flex:1 1 160px;max-width:260px;}' +

// 		/* title */
// 		'.mis-title{margin:0 0 2px;font-size:15px;font-weight:var(--fw-b);color:#1a1a1a;text-decoration:underline;}' +
// 		'.mis-note,.con-note{margin:0 0 6px;text-align:right;font-size:11px;font-style:italic;color:#777;}' +
// 		'.mis-note strong,.con-note strong{font-style:normal;font-weight:var(--fw-b);}' +

// 		/* ── Scroll wrappers — horizontal scroll, no height clamp ── */
// 		'.mis-scroll,.con-scroll{' +
// 		'  overflow-x:auto;overflow-y:visible;' +
// 		'  border:var(--bdw) solid var(--bdc);' +
// 		'  border-radius:4px;background:#fff;' +
// 		'  -webkit-overflow-scrolling:touch;' +
// 		'}' +

// 		/* ══════════════════════════════════════════════
// 		   DETAIL TABLE
// 		   Use border-separate + cellspacing:0 approach
// 		   so every cell has its own clean border box
// 		   ══════════════════════════════════════════════ */
// 		'#mis-tbl{' +
// 		'  border-collapse:separate;' +
// 		'  border-spacing:0;' +
// 		'  width:100%;table-layout:auto;' +
// 		'}' +

// 		/* Base cell style — every single cell */
// 		'#mis-tbl th,#mis-tbl td{' +
// 		'  border-top:var(--bdw) solid var(--bdc);' +
// 		'  border-right:var(--bdw) solid var(--bdc);' +
// 		'  border-bottom:var(--bdw) solid var(--bdc);' +
// 		'  border-left:0;' +      /* left border drawn by right border of prev cell */
// 		'  padding:7px 10px;' +
// 		'  white-space:nowrap;text-align:right;vertical-align:middle;' +
// 		'  font-size:var(--fs-base);color:#1a1a1a;background:#fff;' +
// 		'}' +
// 		/* First cell in each row gets a left border */
// 		'#mis-tbl th:first-child,#mis-tbl td:first-child{border-left:var(--bdw) solid var(--bdc);}' +

// 		/* ── ROW 1 — Year (blue) ── */
// 		'#mis-tbl thead tr.r-yr th{' +
// 		'  background:var(--r1);color:#fff;' +
// 		'  font-size:14px;font-weight:var(--fw-b);text-align:center;' +
// 		'  position:sticky;top:0;z-index:27;' +
// 		'  border-color:rgba(255,255,255,.2);padding:9px 10px;' +
// 		'}' +
// 		'#mis-tbl thead tr.r-yr th:first-child{border-left-color:rgba(255,255,255,.2);}' +

// 		/* ── ROW 2 — Group (orange) ── */
// 		'#mis-tbl thead tr.r-grp th{' +
// 		'  background:var(--r2);color:#fff;' +
// 		'  font-size:12px;font-weight:var(--fw-b);text-align:center;' +
// 		'  position:sticky;top:38px;z-index:26;' +
// 		'  border-color:rgba(255,255,255,.2);padding:6px 10px;' +
// 		'}' +
// 		'#mis-tbl thead tr.r-grp th:first-child{border-left-color:rgba(255,255,255,.2);}' +

// 		/* ── ROW 3 — Sub-col (steel) ── */
// 		'#mis-tbl thead tr.r-sub th{' +
// 		'  background:var(--r3);color:#fff;' +
// 		'  font-size:11px;font-weight:var(--fw-sb);text-align:center;' +
// 		'  position:sticky;top:71px;z-index:25;' +
// 		'  border-color:rgba(255,255,255,.15);min-width:74px;padding:5px 10px;' +
// 		'}' +
// 		'#mis-tbl thead tr.r-sub th:first-child{border-left-color:rgba(255,255,255,.15);}' +
// 		'#mis-tbl thead tr.r-sub th.cv-hdr{color:#FFD54F;font-style:italic;}' +

// 		/* ── Grand Total (tfoot) — all cells same blue ── */
// 		'#mis-tbl tfoot tr.r-grand td{' +
// 		'  background:var(--r1)!important;color:#fff!important;' +
// 		'  font-weight:var(--fw-b);font-size:var(--fs-md);' +
// 		'  border-color:rgba(255,255,255,.2)!important;' +
// 		'}' +
// 		'#mis-tbl tfoot tr.r-grand td:first-child{border-left-color:rgba(255,255,255,.2)!important;}' +
// 		'#mis-tbl tfoot tr.r-grand td.ac,' +
// 		'#mis-tbl tfoot tr.r-grand td.cv{background:var(--r1)!important;color:#fff!important;font-style:normal!important;}' +

// 		/* ── Section total rows — uniform #DBEAFE ── */
// 		'#mis-tbl tbody tr.r-total td{' +
// 		'  font-weight:var(--fw-b);' +
// 		'  background:var(--tot-bg)!important;color:var(--tot-fg);' +
// 		'  border-color:#93C5FD!important;' +
// 		'}' +

// 		/* ── Sub-item indent ── */
// 		'#mis-tbl tbody tr.r-sub-item td:first-child{padding-left:24px;color:#555;}' +

// 		/* ── Actual wash (only on plain body rows) ── */
// 		'#mis-tbl tbody tr:not(.r-total) td.ac{background:var(--act-bg)!important;}' +

// 		/* ── Covid tint (only on plain body rows) ── */
// 		'#mis-tbl tbody tr:not(.r-total) td.cv{background:var(--cov-bg)!important;color:#795548;font-style:italic;}' +

// 		/* ── Sticky label column ── */
// 		'#mis-tbl thead tr.r-yr th.col-lbl{' +
// 		'  position:sticky;left:0;z-index:57;' +
// 		'  text-align:left!important;min-width:205px;background:var(--r1);' +
// 		'}' +
// 		'#mis-tbl tbody td.col-lbl,#mis-tbl tfoot td.col-lbl{' +
// 		'  position:sticky;left:0;z-index:10;' +
// 		'  text-align:left!important;min-width:205px;background:#fff;' +
// 		'}' +
// 		'#mis-tbl tbody tr.r-total td.col-lbl{background:var(--tot-bg)!important;color:var(--tot-fg);}' +
// 		'#mis-tbl tfoot td.col-lbl{background:var(--r1)!important;}' +

// 		/* ── Year-block left separator (solid visible line) ── */
// 		'#mis-tbl .sep-yr{border-left:2px solid #1D4ED8!important;}' +
// 		'#mis-tbl thead tr.r-yr  th.sep-yr,' +
// 		'#mis-tbl thead tr.r-grp th.sep-yr,' +
// 		'#mis-tbl thead tr.r-sub th.sep-yr,' +
// 		'#mis-tbl tfoot tr.r-grand td.sep-yr{border-left:2px solid rgba(255,255,255,.5)!important;}' +

// 		/* ── Budget→Actual separator ── */
// 		'#mis-tbl .sep-in{border-left:1px solid #94A3B8!important;}' +
// 		'#mis-tbl thead tr.r-grp th.sep-in,' +
// 		'#mis-tbl thead tr.r-sub th.sep-in,' +
// 		'#mis-tbl tfoot tr.r-grand td.sep-in{border-left:1px solid rgba(255,255,255,.3)!important;}' +

// 		/* ══════════════════════════════════════════════
// 		   CONSOLIDATED TABLE — same rules, separate scope
// 		   ══════════════════════════════════════════════ */
// 		'.con-wrap{padding-top:28px;}' +
// 		'.con-title{font-size:15px;font-weight:var(--fw-b);color:#1a1a1a;text-decoration:underline;margin:0 0 4px;}' +

// 		'#con-tbl{border-collapse:separate;border-spacing:0;width:100%;table-layout:auto;}' +
// 		'#con-tbl th,#con-tbl td{' +
// 		'  border-top:var(--bdw) solid var(--bdc);' +
// 		'  border-right:var(--bdw) solid var(--bdc);' +
// 		'  border-bottom:var(--bdw) solid var(--bdc);' +
// 		'  border-left:0;' +
// 		'  padding:8px 12px;white-space:nowrap;text-align:right;vertical-align:middle;' +
// 		'  font-size:var(--fs-base);color:#1a1a1a;background:#fff;' +
// 		'}' +
// 		'#con-tbl th:first-child,#con-tbl td:first-child{border-left:var(--bdw) solid var(--bdc);}' +

// 		/* Con ROW 1 — year (blue) */
// 		'#con-tbl thead tr.cr-yr th{' +
// 		'  background:var(--r1);color:#fff;font-size:14px;font-weight:var(--fw-b);' +
// 		'  text-align:center;border-color:rgba(255,255,255,.2);padding:9px 12px;' +
// 		'}' +
// 		'#con-tbl thead tr.cr-yr th:first-child{border-left-color:rgba(255,255,255,.2);}' +

// 		/* Con ROW 2 — sub-cols (steel) */
// 		'#con-tbl thead tr.cr-sub th{' +
// 		'  background:var(--r3);color:#fff;font-size:12px;font-weight:var(--fw-sb);' +
// 		'  text-align:center;border-color:rgba(255,255,255,.15);padding:6px 12px;min-width:100px;' +
// 		'}' +
// 		'#con-tbl thead tr.cr-sub th:first-child{border-left-color:rgba(255,255,255,.15);}' +
// 		'#con-tbl thead tr.cr-sub th.pct-hdr{color:#90CAF9;}' +

// 		/* Con body */
// 		'#con-tbl tbody tr:hover td{background:#F8FAFC!important;}' +
// 		'#con-tbl tbody tr:hover td.col-lbl{background:#F8FAFC!important;}' +
// 		'#con-tbl tbody tr.cr-sub-item td:first-child{padding-left:28px;color:#555;}' +

// 		/* Con total row */
// 		'#con-tbl tbody tr.cr-total td{' +
// 		'  font-weight:var(--fw-b);background:var(--tot-bg)!important;' +
// 		'  color:var(--tot-fg);border-color:#93C5FD!important;' +
// 		'}' +

// 		/* Con sticky label */
// 		'#con-tbl thead tr.cr-yr th.col-lbl{position:sticky;left:0;z-index:17;text-align:left!important;min-width:220px;background:var(--r1);}' +
// 		'#con-tbl tbody td.col-lbl{position:sticky;left:0;z-index:5;text-align:left!important;min-width:220px;background:#fff;}' +
// 		'#con-tbl tbody tr.cr-total td.col-lbl{background:var(--tot-bg)!important;color:var(--tot-fg);}' +

// 		/* Con actual col */
// 		'#con-tbl tbody tr:not(.cr-total) td.con-act{background:var(--act-bg)!important;}' +
// 		/* Con pct col */
// 		'#con-tbl tbody tr:not(.cr-total) td.con-pct{color:#1565C0;font-weight:var(--fw-sb);}' +

// 		/* Con year separator */
// 		'#con-tbl .sep-yr{border-left:2px solid #1D4ED8!important;}' +
// 		'#con-tbl thead tr.cr-yr th.sep-yr,' +
// 		'#con-tbl thead tr.cr-sub th.sep-yr{border-left:2px solid rgba(255,255,255,.5)!important;}' +

// 		/* ══════════════════════════════════════════════
// 		   OPEX TABLE + CAPEX TABLE — shared styles
// 		   Layout matches images: rows=Units, cols=Cur(Bud|Act|%) + Last(Bud|Act|%)
// 		   ══════════════════════════════════════════════ */
// 		/* ══ OPEX + CAPEX TABLES — shared 2-row header (no spacer row) ══ */
// 		'.exp-wrap{padding-top:28px;}' +
// 		'.exp-title{font-size:15px;font-weight:var(--fw-b);color:#1a1a1a;text-decoration:underline;margin:0 0 4px;}' +
// 		'.exp-note{margin:0 0 6px;text-align:right;font-size:11px;font-style:italic;color:#777;}' +
// 		'.exp-note strong{font-style:normal;font-weight:var(--fw-b);}' +
// 		'.exp-scroll{overflow-x:auto;overflow-y:visible;border:var(--bdw) solid var(--bdc);border-radius:4px;background:#fff;-webkit-overflow-scrolling:touch;}' +
// 		'.exp-tbl{border-collapse:separate;border-spacing:0;width:100%;table-layout:auto;}' +
// 		'.exp-tbl th,.exp-tbl td{border-top:var(--bdw) solid var(--bdc);border-right:var(--bdw) solid var(--bdc);border-bottom:var(--bdw) solid var(--bdc);border-left:0;padding:8px 12px;white-space:nowrap;text-align:right;vertical-align:middle;font-size:var(--fs-base);color:#1a1a1a;background:#fff;}' +
// 		'.exp-tbl th:first-child,.exp-tbl td:first-child{border-left:var(--bdw) solid var(--bdc);}' +
// 		'.exp-tbl thead tr.ex-yr th{background:var(--r1);color:#fff;font-size:14px;font-weight:var(--fw-b);text-align:center;border-color:rgba(255,255,255,.2);padding:9px 12px;}' +
// 		'.exp-tbl thead tr.ex-yr th:first-child{border-left-color:rgba(255,255,255,.2);}' +
// 		'.exp-tbl thead tr.ex-sub th{background:var(--r3);color:#fff;font-size:12px;font-weight:var(--fw-sb);text-align:center;border-color:rgba(255,255,255,.15);min-width:90px;padding:6px 12px;}' +
// 		'.exp-tbl thead tr.ex-sub th:first-child{border-left-color:rgba(255,255,255,.15);}' +
// 		'.exp-tbl thead tr.ex-sub th.pct-hdr{color:#90CAF9;}' +
// 		'.exp-tbl tbody tr:hover td{background:#F8FAFC!important;}' +
// 		'.exp-tbl tbody tr:hover td.col-lbl{background:#F8FAFC!important;}' +
// 		'.exp-tbl tbody tr.ex-sub-item td:first-child{padding-left:22px;color:#555;}' +
// 		'.exp-tbl tbody tr.ex-total td{font-weight:var(--fw-b);background:var(--tot-bg)!important;color:var(--tot-fg);border-color:#93C5FD!important;}' +
// 		'.exp-tbl tbody tr.ex-total td:first-child{border-left:var(--bdw) solid #93C5FD!important;}' +
// 		'.exp-tbl tbody tr.ex-total:hover td{background:var(--tot-bg)!important;}' +
// 		'.exp-tbl tbody tr:not(.ex-total) td.ex-act{background:var(--act-bg)!important;}' +
// 		'.exp-tbl tbody tr:not(.ex-total) td.ex-pct{color:#1565C0;font-weight:var(--fw-sb);}' +
// 		'.exp-tbl thead tr.ex-yr th.col-lbl{position:sticky;left:0;z-index:17;text-align:left!important;min-width:220px;background:var(--r1);}' +
// 		'.exp-tbl thead tr.ex-sub th.col-lbl{position:sticky;left:0;z-index:16;text-align:left!important;background:var(--r3);}' +
// 		'.exp-tbl tbody td.col-lbl{position:sticky;left:0;z-index:5;text-align:left!important;background:#fff;}' +
// 		'.exp-tbl tbody tr.ex-total td.col-lbl{background:var(--tot-bg)!important;color:var(--tot-fg);}' +
// 		'.exp-tbl .sep-yr{border-left:2px solid #1D4ED8!important;}' +
// 		'.exp-tbl thead tr.ex-yr th.sep-yr{border-left:2px solid rgba(255,255,255,.5)!important;}' +
// 		'.exp-tbl thead tr.ex-sub th.sep-yr{border-left:2px solid rgba(255,255,255,.4)!important;}' +

// 		/* ══ UNIT DETAIL GRID — 2-col card grid, one mini-table per unit ══ */
// 		'.ud-wrap{padding-top:28px;}' +
// 		'.ud-main-title{font-size:15px;font-weight:var(--fw-b);color:#1a1a1a;text-decoration:underline;margin:0 0 4px;}' +
// 		'.ud-note{margin:0 0 12px;text-align:right;font-size:11px;font-style:italic;color:#777;}' +
// 		'.ud-note strong{font-style:normal;font-weight:var(--fw-b);}' +
// 		'.ud-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;}' +
// 		'@media(max-width:900px){.ud-grid{grid-template-columns:1fr;}}' +
// 		'.ud-card-title{font-size:14px;font-weight:var(--fw-b);color:#1a1a1a;font-style:italic;text-decoration:underline;margin:0 0 3px;}' +
// 		'.ud-card-note{font-size:10px;font-style:italic;color:#777;text-align:right;margin:0 0 3px;}' +
// 		'.ud-card-note strong{font-style:normal;}' +
// 		'.ud-tbl{border-collapse:separate;border-spacing:0;width:100%;table-layout:auto;}' +
// 		'.ud-tbl th,.ud-tbl td{border-top:var(--bdw) solid var(--bdc);border-right:var(--bdw) solid var(--bdc);border-bottom:var(--bdw) solid var(--bdc);border-left:0;padding:6px 10px;white-space:nowrap;text-align:right;vertical-align:middle;font-size:var(--fs-base);color:#1a1a1a;background:#fff;}' +
// 		'.ud-tbl th:first-child,.ud-tbl td:first-child{border-left:var(--bdw) solid var(--bdc);}' +
// 		'.ud-tbl thead tr th{background:var(--r1);color:#fff;font-size:12px;font-weight:var(--fw-b);text-align:center;border-color:rgba(255,255,255,.2);padding:7px 10px;}' +
// 		'.ud-tbl thead tr th:first-child{border-left-color:rgba(255,255,255,.2);text-align:left!important;}' +
// 		'.ud-tbl thead tr th.ud-pct-hdr{color:#90CAF9;}' +
// 		'.ud-tbl tbody tr:hover td{background:#F8FAFC!important;}' +
// 		'.ud-tbl tbody tr.ut-total td{font-weight:var(--fw-b);background:var(--tot-bg)!important;color:var(--tot-fg);border-color:#93C5FD!important;}' +
// 		'.ud-tbl tbody tr.ut-total td:first-child{border-left:var(--bdw) solid #93C5FD!important;}' +
// 		'.ud-tbl tbody tr.ut-total:hover td{background:var(--tot-bg)!important;}' +
// 		'.ud-tbl tbody tr:not(.ut-total) td.ud-act{background:var(--act-bg)!important;}' +
// 		'.ud-tbl tbody tr:not(.ut-total) td.ud-pct{color:#1565C0;font-weight:var(--fw-sb);}' +

// 		/* ── Tooltip ── */
// 		'#mis-tt{position:fixed;z-index:999998;pointer-events:none;' +
// 		'  background:#1E293B;color:#F8FAFC;font-family:var(--font);font-size:13px;' +
// 		'  padding:8px 12px;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.4);' +
// 		'  opacity:0;transition:opacity .12s ease;white-space:nowrap;line-height:1.6;}' +
// 		'#mis-tt .tt-amt{font-size:15px;font-weight:700;color:#fff;}' +
// 		'#mis-tt .tt-sub{font-size:11px;color:#93C5FD;margin-top:2px;}' +

// 		/* ── Loader ── */
// 		'#mis-loader.mis-loader-overlay{position:fixed;inset:0;background:rgba(15,23,42,.92);backdrop-filter:blur(8px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
// 		'.mis-loader-box{display:flex;flex-direction:column;align-items:center;gap:16px;}' +
// 		'.mis-loader-logo{width:84px;height:84px;border-radius:50%;background:linear-gradient(145deg,#fff,#e2e8f0);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.4);animation:mis-p 1.6s infinite ease-in-out;}' +
// 		'.mis-loader-text{font-size:14px;color:#fff;font-weight:600;letter-spacing:.5px;opacity:.9;}' +
// 		'@keyframes mis-p{0%,100%{transform:scale(1);opacity:.8;}50%{transform:scale(1.07);opacity:1;}}' +

// 		'@media(max-width:900px){.mis-fc{max-width:100%;}}' +

// 		'</style>'
// 	);

// 	// =============================================================================
// 	// TOOLTIP
// 	// =============================================================================
// 	if (!$('#mis-tt').length) {
// 		$('body').append('<div id="mis-tt"><div class="tt-amt"></div><div class="tt-sub"></div></div>');
// 	}
// 	var $tt = $('#mis-tt');
// 	function ttShow(e,raw,ctx){
// 		var n=parseFloat(raw)||0; if(!n||!isFinite(n)){ttHide();return;}
// 		var neg=n<0,abs=Math.abs(n);
// 		$tt.find('.tt-amt').text((neg?'-':'')+'\u20B9 '+abs.toLocaleString('en-IN'));
// 		$tt.find('.tt-sub').text((neg?'-':'')+(abs/10000000).toFixed(2)+' Cr'+(ctx?' \u00B7 '+ctx:''));
// 		ttPos(e); $tt.css('opacity',1);
// 	}
// 	function ttPos(e){
// 		var x=e.clientX+14,y=e.clientY-8,w=$tt.outerWidth()||220,h=$tt.outerHeight()||60;
// 		if(x+w>window.innerWidth-8)x=e.clientX-w-14;
// 		if(y+h>window.innerHeight-8)y=e.clientY-h-8;
// 		$tt.css({left:x,top:y});
// 	}
// 	function ttHide(){ $tt.css('opacity',0); }
// 	$(document)
// 		.on('mouseenter','#mis-tbl td[data-raw],#con-tbl td[data-raw],#opex-tbl td[data-raw],#capex-tbl td[data-raw],.ud-tbl td[data-raw]',function(e){ttShow(e,$(this).data('raw'),$(this).data('ctx'));})
// 		.on('mousemove', '#mis-tbl td[data-raw],#con-tbl td[data-raw],#opex-tbl td[data-raw],#capex-tbl td[data-raw],.ud-tbl td[data-raw]',function(e){ttPos(e);})
// 		.on('mouseleave','#mis-tbl td[data-raw],#con-tbl td[data-raw],#opex-tbl td[data-raw],#capex-tbl td[data-raw],.ud-tbl td[data-raw]',function(){ttHide();});

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================
// 	$(page.body).append(
// 		'<div id="mis-wrap">' +

// 		/* Filters */
// 		'<div class="mis-filters">' +
// 		'  <div class="mis-fc" id="mis-fy-wrap"></div>' +
// 		'  <div class="mis-fc" id="mis-mo-wrap"></div>' +
// 		'</div>' +

// 		/* Title — hidden along with the detail table */
// 		'<p class="mis-title" id="mis-title" style="display:none;">Foundation Budget vs. Actuals</p>' +
// 		'<p class="mis-note" style="display:none;">&#8377;&nbsp;<strong>Cr.</strong></p>' +

// 		/* Detail table — hidden, data still fetched for other tables */
// 		'<div class="mis-scroll" id="mis-scroll-wrap" style="display:none;">' +
// 		'  <table id="mis-tbl"><thead></thead>' +
// 		'  <tbody><tr><td colspan="17" style="text-align:center;padding:40px;color:#aaa;">Select filters to load data\u2026</td></tr></tbody>' +
// 		'  <tfoot></tfoot>' +
// 		'  </table>' +
// 		'</div>' +

// 		/* Consolidated summary table */
// 		'<div class="con-wrap">' +
// 		'  <p class="con-title">Consolidated Summary</p>' +
// 		'  <p class="con-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
// 		'  <div class="con-scroll">' +
// 		'    <table id="con-tbl"><thead></thead>' +
// 		'    <tbody><tr><td colspan="7" style="text-align:center;padding:30px;color:#aaa;">Loading\u2026</td></tr></tbody>' +
// 		'    </table>' +
// 		'  </div>' +
// 		'</div>' +

// 		/* Operating Expense table */
// 		'<div class="exp-wrap">' +
// 		'  <p class="exp-title" id="opex-title">Operating Expense \u2013 Budget vs. Actuals</p>' +
// 		'  <p class="exp-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
// 		'  <div class="exp-scroll">' +
// 		'    <table id="opex-tbl" class="exp-tbl"><thead></thead>' +
// 		'    <tbody><tr><td colspan="7" style="text-align:center;padding:30px;color:#aaa;">Loading\u2026</td></tr></tbody>' +
// 		'    </table>' +
// 		'  </div>' +
// 		'</div>' +

// 		/* Capital Expense table */
// 		'<div class="exp-wrap">' +
// 		'  <p class="exp-title" id="capex-title">Capital Expense \u2013 Budget vs. Actuals</p>' +
// 		'  <p class="exp-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
// 		'  <div class="exp-scroll">' +
// 		'    <table id="capex-tbl" class="exp-tbl"><thead></thead>' +
// 		'    <tbody><tr><td colspan="7" style="text-align:center;padding:30px;color:#aaa;">Loading\u2026</td></tr></tbody>' +
// 		'    </table>' +
// 		'  </div>' +
// 		'</div>' +

// 		/* Unit Detail Grid — one mini-table per unit showing opex sub-heads */
// 		'<div class="ud-wrap">' +
// 		'  <p class="ud-main-title" id="ud-title">Operating Expense \u2013 Unit Wise Detail</p>' +
// 		'  <p class="ud-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
// 		'  <div class="ud-grid" id="ud-grid">Loading\u2026</div>' +
// 		'</div>' +

// 		'</div>'
// 	);

// 	// =============================================================================
// 	// HELPERS
// 	// =============================================================================
// 	function getPrevFY(fy){
// 		var p=(fy||'2025-26').split('-');
// 		return (parseInt(p[0],10)-1)+'-'+String(parseInt(p[1],10)-1).padStart(2,'0');
// 	}
// 	var MONTHS=['April','May','June','July','August','September','October','November','December','January','February','March'];

// 	function monthYearLabel(month,fy){
// 		var fyStart=parseInt((fy||'2025-26').split('-')[0],10);
// 		var calYear=['January','February','March'].indexOf(month)!==-1?fyStart+1:fyStart;
// 		return month+'-'+calYear;
// 	}

// 	// =============================================================================
// 	// FILTER CONTROLS
// 	// =============================================================================
// 	var _ready=false, _curFY='', _prevFY='', _curMonth='';

// 	var fyCtrl=frappe.ui.form.make_control({
// 		parent:$('#mis-fy-wrap'),
// 		df:{label:'Financial Year',fieldtype:'Select',fieldname:'financial_year',reqd:1,
// 			change:function(){if(_ready)loadData();}},
// 		render_input:true
// 	});
// 	fyCtrl.refresh();

// 	var moCtrl=frappe.ui.form.make_control({
// 		parent:$('#mis-mo-wrap'),
// 		df:{label:'Month (YTD up to)',fieldtype:'Select',fieldname:'month',reqd:1,
// 			options:MONTHS.join('\n'),
// 			change:function(){if(_ready)loadData();}},
// 		render_input:true
// 	});
// 	moCtrl.refresh();

// 	frappe.call({
// 		method:'annual_budget.api.filter_options.get_financial_year_list',
// 		callback:function(r){
// 			if(!r.message||!r.message.length)return;
// 			var years=r.message.map(function(d){return d.financial_year;});
// 			fyCtrl.df.options=years.join('\n'); fyCtrl.refresh();
// 			var today=new Date(),y=today.getFullYear(),m=today.getMonth()+1;
// 			var curFY=(m>=4?y:y-1)+'-'+String(m>=4?y+1:y).slice(-2);
// 			var target=years.indexOf(curFY)!==-1?curFY:years[0];
// 			var mName=['January','February','March','April','May','June','July','August','September','October','November','December'][m-1];
// 			fyCtrl.set_value(target);
// 			moCtrl.set_value(MONTHS.indexOf(mName)!==-1?mName:'March');
// 			_ready=true; loadData();
// 		}
// 	});

// 	// =============================================================================
// 	// DATA FETCH
// 	// =============================================================================
// 	function fetchData(fy,month){
// 		return new Promise(function(resolve){
// 			frappe.call({
// 				method:'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
// 				args:{financial_year:fy,month:month,table_name_filter:'Monthly MIS Capex & Opex'},
// 				callback:function(r){
// 					var d=Array.isArray(r.message)?r.message
// 						:(r.message&&Array.isArray(r.message.message))?r.message.message
// 						:(r.message&&Array.isArray(r.message.data))?r.message.data:[];
// 					resolve(d);
// 				},
// 				error:function(){resolve([]);}
// 			});
// 		});
// 	}

// 	// =============================================================================
// 	// EXTRACTION
// 	// =============================================================================
// 	function norm(s){return(s||'').replace(/\s+/g,' ').trim().toUpperCase();}
// 	function zero(){return{opex_b:0,capex_b:0,covid_b:0,total_b:0,opex_a:0,capex_a:0,covid_a:0,total_a:0};}
// 	function addZ(a,b){
// 		return{opex_b:a.opex_b+b.opex_b,capex_b:a.capex_b+b.capex_b,covid_b:a.covid_b+b.covid_b,total_b:a.total_b+b.total_b,
// 			opex_a:a.opex_a+b.opex_a,capex_a:a.capex_a+b.capex_a,covid_a:a.covid_a+b.covid_a,total_a:a.total_a+b.total_a};
// 	}
// 	function extractRow(entry){
// 		var r=zero();
// 		(entry.actuals||[]).forEach(function(sec){
// 			var nm=norm(sec.name),b=parseFloat(sec.ytd||0),a=parseFloat(sec.total_posted_amt_ytd||0);
// 			if(nm==='OPERATING EXPENSES'||nm==='OPERATING  EXPENSES'){r.opex_b+=b;r.opex_a+=a;}
// 			else if(nm==='CAPITAL EXPENSES'||nm==='CAPITAL  EXPENSES'){r.capex_b+=b;r.capex_a+=a;}
// 			else if(nm.indexOf('COVID')!==-1){r.covid_b+=b;r.covid_a+=a;}
// 		});
// 		r.total_b=r.opex_b+r.capex_b+r.covid_b; r.total_a=r.opex_a+r.capex_a+r.covid_a;
// 		return r;
// 	}
// 	function extractConsolidated(e){
// 		var r=zero();
// 		(e.actuals||[]).forEach(function(a){
// 			var nm=norm(a.name),b=parseFloat(a.ytd||0),ac=parseFloat(a.total_posted_amt_ytd||0);
// 			if(nm==='OPEX TOTAL'){r.opex_b+=b;r.opex_a+=ac;}
// 			if(nm==='CAPEX TOTAL'){r.capex_b+=b;r.capex_a+=ac;}
// 			if(nm.indexOf('COVID')!==-1){r.covid_b+=b;r.covid_a+=ac;}
// 			if(nm==='OVERALL GRAND TOTAL'){r.total_b=b;r.total_a=ac;}
// 		});
// 		if(!r.total_b&&!r.total_a){r.total_b=r.opex_b+r.capex_b+r.covid_b;r.total_a=r.opex_a+r.capex_a+r.covid_a;}
// 		return r;
// 	}
// 	function buildMap(data){
// 		var sorted=(data||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
// 		var rows={},subFlags={},order=[],grand=null;
// 		sorted.forEach(function(e){
// 			var tbl=(e.table_name||'').toUpperCase();
// 			if(e.sequence_id===9999||tbl==='CONSOLIDATED'){grand=extractConsolidated(e);return;}
// 			var lbl=(e.label||'').trim(); if(!lbl)return;
// 			rows[lbl]=extractRow(e); subFlags[lbl]=e.is_this_sub_item===1; order.push(lbl);
// 		});
// 		if(!grand){grand=zero();order.forEach(function(l){if(!subFlags[l])grand=addZ(grand,rows[l]);});}
// 		return{order:order,rows:rows,subFlags:subFlags,grand:grand};
// 	}

// 	// =============================================================================
// 	// FORMATTERS
// 	// =============================================================================
// 	function fmtCr(v){
// 		var n=parseFloat(v)||0; if(!isFinite(n)||n===0)return'-';
// 		var res=n/10000000,neg=res<0,s=Math.abs(res).toFixed(2).split('.');
// 		var ip=s[0]; if(ip.length>3)ip=ip.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+ip.slice(-3);
// 		return(neg?'-':'')+ip+'.'+s[1];
// 	}
// 	function fmtPct(act,bud){
// 		var a=parseFloat(act)||0,b=parseFloat(bud)||0;
// 		if(!b)return'-';
// 		return(a/b*100).toFixed(1)+'%';
// 	}
// 	function mkTd(val,cls,rowLbl,colKey){
// 		var n=parseFloat(val)||0,txt=fmtCr(n),c=cls?' class="'+cls+'"':'';
// 		if(n!==0&&isFinite(n)){
// 			var ctx=(rowLbl||'')+(colKey?' \u00B7 '+colKey:'');
// 			return '<td'+c+' data-raw="'+n+'" data-ctx="'+ctx.replace(/"/g,'&quot;')+'">'+txt+'</td>';
// 		}
// 		return '<td'+c+'>'+txt+'</td>';
// 	}
// 	function mkTdRaw(val,cls,rowLbl,colKey){
// 		/* for consolidated table where value is already in Cr */
// 		var n=parseFloat(val)||0;
// 		var txt=n===0?'-':(n<0?'-':'')+Math.abs(n).toFixed(2);
// 		var c=cls?' class="'+cls+'"':'';
// 		if(n!==0&&isFinite(n)){
// 			var ctx=(rowLbl||'')+(colKey?' \u00B7 '+colKey:'');
// 			/* store raw*10M so tooltip shows full rupee */
// 			return '<td'+c+' data-raw="'+(n*10000000)+'" data-ctx="'+ctx.replace(/"/g,'&quot;')+'">'+txt+'</td>';
// 		}
// 		return '<td'+c+'>'+txt+'</td>';
// 	}

// 	// =============================================================================
// 	// DETAIL TABLE RENDER
// 	// =============================================================================
// 	function buildHeader(curFY,prevFY){
// 		var r1=
// 			'<tr class="r-yr">'+
// 			'<th rowspan="3" class="col-lbl" style="text-align:left;">Unit / Function</th>'+
// 			'<th colspan="8">Current Year &nbsp;'+curFY+'</th>'+
// 			'<th colspan="8" class="sep-yr">Last Year &nbsp;'+prevFY+'</th>'+
// 			'</tr>';
// 		var r2=
// 			'<tr class="r-grp">'+
// 			'<th colspan="4">Budget</th>'+
// 			'<th colspan="4" class="sep-in">Actual</th>'+
// 			'<th colspan="4" class="sep-yr">Budget</th>'+
// 			'<th colspan="4" class="sep-in">Actual</th>'+
// 			'</tr>';
// 		function sub(fc){return '<th'+(fc?' class="'+fc+'"':'')+'>Opex</th><th>Capex</th><th class="cv-hdr">Covid</th><th>Total</th>';}
// 		var r3='<tr class="r-sub">'+sub('')+sub('sep-in')+sub('sep-yr')+sub('sep-in')+'</tr>';
// 		$('#mis-tbl thead').empty().append(r1+r2+r3);
// 	}

// 	function bodyRow(r){
// 		var cls=r.isTotal?'r-total':r.isSub?'r-sub-item':'';
// 		var lS=r.isSub?'padding-left:26px;':'',c=r.cur,p=r.prev,lbl=r.label;
// 		return '<tr class="'+cls+'">'+
// 			'<td class="col-lbl" style="'+lS+'">'+lbl+'</td>'+
// 			mkTd(c.opex_b,'',lbl,'Cur Bud Opex')+mkTd(c.capex_b,'',lbl,'Cur Bud Capex')+mkTd(c.covid_b,'cv',lbl,'Cur Bud Covid')+mkTd(c.total_b,'',lbl,'Cur Bud Total')+
// 			mkTd(c.opex_a,'ac sep-in',lbl,'Cur Act Opex')+mkTd(c.capex_a,'ac',lbl,'Cur Act Capex')+mkTd(c.covid_a,'cv',lbl,'Cur Act Covid')+mkTd(c.total_a,'ac',lbl,'Cur Act Total')+
// 			mkTd(p.opex_b,'sep-yr',lbl,'Prev Bud Opex')+mkTd(p.capex_b,'',lbl,'Prev Bud Capex')+mkTd(p.covid_b,'cv',lbl,'Prev Bud Covid')+mkTd(p.total_b,'',lbl,'Prev Bud Total')+
// 			mkTd(p.opex_a,'ac sep-in',lbl,'Prev Act Opex')+mkTd(p.capex_a,'ac',lbl,'Prev Act Capex')+mkTd(p.covid_a,'cv',lbl,'Prev Act Covid')+mkTd(p.total_a,'ac',lbl,'Prev Act Total')+
// 			'</tr>';
// 	}

// 	function footRow(gc,gp){
// 		var lbl='Grand Total';
// 		return '<tr class="r-grand">'+
// 			'<td class="col-lbl">Grand Total</td>'+
// 			mkTd(gc.opex_b,'',lbl,'Cur Bud Opex')+mkTd(gc.capex_b,'',lbl,'Cur Bud Capex')+mkTd(gc.covid_b,'cv',lbl,'Cur Bud Covid')+mkTd(gc.total_b,'',lbl,'Cur Bud Total')+
// 			mkTd(gc.opex_a,'ac sep-in',lbl,'Cur Act Opex')+mkTd(gc.capex_a,'ac',lbl,'Cur Act Capex')+mkTd(gc.covid_a,'cv',lbl,'Cur Act Covid')+mkTd(gc.total_a,'ac',lbl,'Cur Act Total')+
// 			mkTd(gp.opex_b,'sep-yr',lbl,'Prev Bud Opex')+mkTd(gp.capex_b,'',lbl,'Prev Bud Capex')+mkTd(gp.covid_b,'cv',lbl,'Prev Bud Covid')+mkTd(gp.total_b,'',lbl,'Prev Bud Total')+
// 			mkTd(gp.opex_a,'ac sep-in',lbl,'Prev Act Opex')+mkTd(gp.capex_a,'ac',lbl,'Prev Act Capex')+mkTd(gp.covid_a,'cv',lbl,'Prev Act Covid')+mkTd(gp.total_a,'ac',lbl,'Prev Act Total')+
// 			'</tr>';
// 	}

// 	function renderDetailTable(curData,prevData,curFY,prevFY){
// 		buildHeader(curFY,prevFY);
// 		var cm=buildMap(curData),pm=buildMap(prevData);
// 		var rows=cm.order.map(function(lbl){
// 			return{label:lbl,isSub:cm.subFlags[lbl],cur:cm.rows[lbl]||zero(),prev:pm.rows[lbl]||zero()};
// 		});
// 		pm.order.forEach(function(lbl){
// 			if(!cm.rows[lbl])rows.push({label:lbl,isSub:pm.subFlags[lbl],cur:zero(),prev:pm.rows[lbl]});
// 		});
// 		$('#mis-tbl tbody').empty().append(rows.map(bodyRow).join(''));
// 		$('#mis-tbl tfoot').html(footRow(cm.grand,pm.grand));
// 		return {cm:cm, pm:pm, rows:rows};
// 	}

// 	// =============================================================================
// 	// CONSOLIDATED TABLE RENDER
// 	// 2-row header: blue year label + steel Budget/Actuals/% sub-cols
// 	// The year context is already clear from Row 1 — no need for an orange repeat row
// 	// =============================================================================
// 	function renderConTable(cm,pm,curFY,prevFY){
// 		/* Row 1 — blue year labels, rowspan=2 for label column */
// 		var h1=
// 			'<tr class="cr-yr">'+
// 			'<th rowspan="2" class="col-lbl" style="text-align:left;">Areas of Work</th>'+
// 			'<th colspan="3">Current Year YTD &nbsp; '+curFY+'</th>'+
// 			'<th colspan="3" class="sep-yr">Last Year YTD &nbsp; '+prevFY+'</th>'+
// 			'</tr>';
// 		/* Row 2 — steel sub-col labels */
// 		var h2=
// 			'<tr class="cr-sub">'+
// 			'<th>Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>'+
// 			'<th class="sep-yr">Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>'+
// 			'</tr>';
// 		$('#con-tbl thead').empty().append(h1+h2);

// 		/* Build rows — use the same order as detail table */
// 		var allLabels=[];
// 		cm.order.forEach(function(l){allLabels.push(l);});
// 		pm.order.forEach(function(l){if(allLabels.indexOf(l)===-1)allLabels.push(l);});

// 		/* Convert raw paisa → Cr for consolidated table */
// 		function cr(v){return parseFloat(v)||0 ? (parseFloat(v)/10000000) : 0;}

// 		var html='', curTotal={b:0,a:0}, prevTotal={b:0,a:0};

// 		allLabels.forEach(function(lbl){
// 			var isSub=cm.subFlags[lbl]||pm.subFlags[lbl];
// 			var cv=cm.rows[lbl]||zero(), pv=pm.rows[lbl]||zero();
// 			var cb=cr(cv.total_b), ca=cr(cv.total_a);
// 			var pb=cr(pv.total_b), pa=cr(pv.total_a);

// 			if(!isSub){curTotal.b+=cb;curTotal.a+=ca;prevTotal.b+=pb;prevTotal.a+=pa;}

// 			var cls=isSub?'cr-sub-item':'';
// 			var lS=isSub?'padding-left:28px;':'';
// 			html+=
// 				'<tr class="'+cls+'">'+
// 				'<td class="col-lbl" style="'+lS+'">'+lbl+'</td>'+
// 				mkTdRaw(cb,'',lbl,'Cur Budget')+
// 				mkTdRaw(ca,'con-act',lbl,'Cur Actuals')+
// 				'<td class="con-pct">'+fmtPct(ca,cb)+'</td>'+
// 				mkTdRaw(pb,'sep-yr',lbl,'Prev Budget')+
// 				mkTdRaw(pa,'con-act',lbl,'Prev Actuals')+
// 				'<td class="con-pct">'+fmtPct(pa,pb)+'</td>'+
// 				'</tr>';
// 		});

// 		/* Total row */
// 		html+=
// 			'<tr class="cr-total">'+
// 			'<td class="col-lbl">Total</td>'+
// 			mkTdRaw(curTotal.b,'',  'Total','Cur Budget')+
// 			mkTdRaw(curTotal.a,'con-act','Total','Cur Actuals')+
// 			'<td class="con-pct">'+fmtPct(curTotal.a,curTotal.b)+'</td>'+
// 			mkTdRaw(prevTotal.b,'sep-yr','Total','Prev Budget')+
// 			mkTdRaw(prevTotal.a,'con-act','Total','Prev Actuals')+
// 			'<td class="con-pct">'+fmtPct(prevTotal.a,prevTotal.b)+'</td>'+
// 			'</tr>';

// 		$('#con-tbl tbody').empty().html(html);
// 	}

// 	// =============================================================================
// 	// OPERATING EXPENSE + CAPITAL EXPENSE TABLES
// 	// Layout (matches images):
// 	//   Rows    = Units / Areas of Work (top-level, sub-items indented)
// 	//   Columns = Current Year YTD (Budget | Actuals | % of Budget)
// 	//           + Last Year YTD    (Budget | Actuals | % of Budget)
// 	//
// 	// Source: same raw API data already fetched.
// 	// Each entry.actuals[] has sections: "OPERATING EXPENSES" / "CAPITAL EXPENSES"
// 	//   section.ytd = Budget total for that section
// 	//   section.total_posted_amt_ytd = Actual total
// 	// =============================================================================

// 	var OPEX_NAMES  = ['OPERATING EXPENSES', 'OPERATING  EXPENSES'];
// 	var CAPEX_NAMES = ['CAPITAL EXPENSES',   'CAPITAL  EXPENSES'];

// 	/*
// 	 * Extract Budget + Actual for a given section type from one unit entry.
// 	 * Returns { b: crValue, a: crValue }
// 	 */
// 	function extractSection(entry, sectionNames) {
// 		var b = 0, a = 0;
// 		(entry.actuals || []).forEach(function (sec) {
// 			var nm = (sec.name || '').replace(/\s+/g,' ').trim().toUpperCase();
// 			if (sectionNames.indexOf(nm) !== -1) {
// 				b += parseFloat(sec.ytd || 0) / 10000000;
// 				a += parseFloat(sec.total_posted_amt_ytd || 0) / 10000000;
// 			}
// 		});
// 		return { b: b, a: a };
// 	}

// 	/*
// 	 * Build row list from curData + prevData for a given section type.
// 	 * Returns [{ label, isSub, cur:{b,a}, prev:{b,a} }, ...]
// 	 */
// 	function buildExpRows(curData, prevData, sectionNames) {
// 		function mapByLabel(data) {
// 			var sorted = (data||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
// 			var map={}, order=[];
// 			sorted.forEach(function(e){
// 				var tbl=(e.table_name||'').toUpperCase();
// 				if(e.sequence_id===9999||tbl==='CONSOLIDATED')return;
// 				// ── Only top-level units (is_this_sub_item === 0) ──
// 				if(e.is_this_sub_item===1)return;
// 				var lbl=(e.label||'').trim(); if(!lbl)return;
// 				map[lbl] = extractSection(e, sectionNames);
// 				order.push(lbl);
// 			});
// 			return{map:map,order:order};
// 		}

// 		var cm=mapByLabel(curData), pm=mapByLabel(prevData);
// 		var rows=[], seen={};

// 		cm.order.forEach(function(lbl){
// 			seen[lbl]=true;
// 			rows.push({label:lbl,isSub:false,cur:cm.map[lbl]||{b:0,a:0},prev:pm.map[lbl]||{b:0,a:0}});
// 		});
// 		pm.order.forEach(function(lbl){
// 			if(!seen[lbl])rows.push({label:lbl,isSub:false,cur:{b:0,a:0},prev:pm.map[lbl]||{b:0,a:0}});
// 		});

// 		return rows;
// 	}


// 	/* Render one expense table (opex or capex) — clean 2-row header */
// 	function renderExpTable(tblId, titleId, rows, curFY, prevFY, month) {
// 		var ytdLabel = monthYearLabel(month, curFY);
// 		$('#'+titleId).text($('#'+titleId).text().split('–')[0].trim() + ' – YTD ' + ytdLabel);

// 		// 2-row header: blue year | steel sub-cols (no blank spacer row)
// 		var h1 =
// 			'<tr class="ex-yr">' +
// 			'<th rowspan="2" class="col-lbl">Areas of Work</th>' +
// 			'<th colspan="3">Current Year YTD &nbsp; ' + curFY + '</th>' +
// 			'<th colspan="3" class="sep-yr">Last Year YTD &nbsp; ' + prevFY + '</th>' +
// 			'</tr>';
// 		var h2 =
// 			'<tr class="ex-sub">' +
// 			'<th>Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>' +
// 			'<th class="sep-yr">Budget</th><th>Actuals</th><th class="pct-hdr">% of Budget</th>' +
// 			'</tr>';
// 		$('#'+tblId+' thead').empty().append(h1 + h2);

// 		var totCurB=0,totCurA=0,totPrevB=0,totPrevA=0;
// 		var bodyHtml = '';
// 		rows.forEach(function(r) {
// 			if (!r.isSub) { totCurB+=r.cur.b; totCurA+=r.cur.a; totPrevB+=r.prev.b; totPrevA+=r.prev.a; }
// 			var cls = r.isSub ? 'ex-sub-item' : '';
// 			var lS  = r.isSub ? 'padding-left:22px;' : '';
// 			bodyHtml +=
// 				'<tr class="'+cls+'"><td class="col-lbl" style="'+lS+'">'+r.label+'</td>' +
// 				mkExpTd(r.cur.b,  '',        r.label,'Cur Budget')  +
// 				mkExpTd(r.cur.a,  'ex-act',  r.label,'Cur Actuals') +
// 				'<td class="ex-pct">' + fmtPct(r.cur.a, r.cur.b) + '</td>' +
// 				mkExpTd(r.prev.b, 'sep-yr',  r.label,'Prev Budget') +
// 				mkExpTd(r.prev.a, 'ex-act',  r.label,'Prev Actuals')+
// 				'<td class="ex-pct">' + fmtPct(r.prev.a, r.prev.b) + '</td>' +
// 				'</tr>';
// 		});
// 		bodyHtml +=
// 			'<tr class="ex-total"><td class="col-lbl">Total</td>' +
// 			mkExpTd(totCurB,  '',        'Total','Cur Budget')  +
// 			mkExpTd(totCurA,  'ex-act',  'Total','Cur Actuals') +
// 			'<td class="ex-pct">' + fmtPct(totCurA, totCurB) + '</td>' +
// 			mkExpTd(totPrevB, 'sep-yr',  'Total','Prev Budget') +
// 			mkExpTd(totPrevA, 'ex-act',  'Total','Prev Actuals')+
// 			'<td class="ex-pct">' + fmtPct(totPrevA, totPrevB) + '</td>' +
// 			'</tr>';
// 		$('#'+tblId+' tbody').empty().html(bodyHtml);
// 	}

// 	/*
// 	 * Build unit detail cards — for each top-level unit, extract
// 	 * Operating Expense sub_heads and render a mini-table:
// 	 *   Rows = sub-head names (Program Expenses, People Expenses, etc.)
// 	 *   Cols = Budget | Actuals | % of Budget  (current year only, matching image 2)
// 	 */
// 	function renderUnitDetailGrid(curData, fy, month) {
// 		var ytdLabel = monthYearLabel(month, fy);
// 		$('#ud-title').text('Operating Expense – Unit Wise Detail – YTD ' + ytdLabel);

// 		var sorted = (curData||[]).slice().sort(function(a,b){return(a.sequence_id||0)-(b.sequence_id||0);});
// 		var gridHtml = '';

// 		sorted.forEach(function(entry) {
// 			var tbl = (entry.table_name||'').toUpperCase();
// 			if (entry.sequence_id===9999||tbl==='CONSOLIDATED') return;
// 			if (entry.is_this_sub_item===1) return; // top-level units only

// 			var unit = (entry.label||'').trim();
// 			if (!unit) return;

// 			// Find Operating Expenses section and its sub_heads
// 			var subHeads = [];
// 			(entry.actuals||[]).forEach(function(sec) {
// 				var nm = (sec.name||'').replace(/\s+/g,' ').trim().toUpperCase();
// 				if (nm==='OPERATING EXPENSES'||nm==='OPERATING  EXPENSES') {
// 					(sec.sub_heads||[]).forEach(function(sh) {
// 						var shName = (sh.name||'').trim();
// 						if (!shName) return;
// 						var b = parseFloat(sh.ytd||0)/10000000;
// 						var a = parseFloat(sh.total_posted_amt_ytd||0)/10000000;
// 						subHeads.push({ name: shName, b: b, a: a });
// 					});
// 				}
// 			});

// 			if (!subHeads.length) return; // skip units with no opex sub-heads

// 			// Build mini-table
// 			var totB=0, totA=0;
// 			var rows = '';
// 			subHeads.forEach(function(sh) {
// 				totB += sh.b; totA += sh.a;
// 				rows +=
// 					'<tr>' +
// 					'<td style="text-align:left;">' + sh.name + '</td>' +
// 					mkExpTd(sh.b, '', sh.name, unit+' Budget') +
// 					mkExpTd(sh.a, 'ud-act', sh.name, unit+' Actuals') +
// 					'<td class="ud-pct">' + fmtPct(sh.a, sh.b) + '</td>' +
// 					'</tr>';
// 			});
// 			rows +=
// 				'<tr class="ut-total">' +
// 				'<td style="text-align:left;">Total</td>' +
// 				mkExpTd(totB, '', 'Total', unit+' Budget') +
// 				mkExpTd(totA, 'ud-act', 'Total', unit+' Actuals') +
// 				'<td class="ud-pct">' + fmtPct(totA, totB) + '</td>' +
// 				'</tr>';

// 			gridHtml +=
// 				'<div class="ud-card">' +
// 				'<p class="ud-card-title">' + unit + '</p>' +
// 				'<p class="ud-card-note">&#8377;&nbsp;<strong>Cr.</strong></p>' +
// 				'<table class="ud-tbl">' +
// 				'<thead><tr>' +
// 				'<th style="text-align:left;min-width:180px;">Expense Category</th>' +
// 				'<th>Budget</th><th>Actuals</th><th class="ud-pct-hdr">% of Budget</th>' +
// 				'</tr></thead>' +
// 				'<tbody>' + rows + '</tbody>' +
// 				'</table>' +
// 				'</div>';
// 		});

// 		$('#ud-grid').html(gridHtml || '<p style="color:#aaa;">No unit detail data available.</p>');
// 	}


// 	/* Helper: td with tooltip; value already in Cr */
// 	function mkExpTd(crVal, cls, rowLbl, colKey) {
// 		var n=parseFloat(crVal)||0;
// 		var txt=n===0?'-':(function(){
// 			var neg=n<0,abs=Math.abs(n),s=abs.toFixed(2).split('.');
// 			var ip=s[0];
// 			if(ip.length>3)ip=ip.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+ip.slice(-3);
// 			return(neg?'-':'')+ip+'.'+s[1];
// 		})();
// 		var c=cls?' class="'+cls+'"':'';
// 		if(n!==0&&isFinite(n)){
// 			var ctx=(rowLbl||'')+(colKey?' \u00B7 '+colKey:'');
// 			return '<td'+c+' data-raw="'+(n*10000000)+'" data-ctx="'+ctx.replace(/"/g,'&quot;')+'">'+txt+'</td>';
// 		}
// 		return '<td'+c+'>'+txt+'</td>';
// 	}

// 	// =============================================================================
// 	// LOAD — single API call reused for all three tables
// 	// =============================================================================
// 	function loadData(){
// 		var fy    = fyCtrl.get_value();
// 		var month = moCtrl.get_value();
// 		if (!fy || !month) return;

// 		_curFY = fy; _prevFY = getPrevFY(fy); _curMonth = month;
// 		var ytdLabel = monthYearLabel(month, fy);
// 		$('#mis-title').text('Foundation Budget vs. Actuals \u2013 FY '+fy+' & FY '+_prevFY+' | YTD '+ytdLabel);
// 		Loader.show('Loading Monthly MIS\u2026');

// 		// Only TWO API calls: current FY + previous FY
// 		// curData is reused for all three tables — no extra fetch needed
// 		Promise.all([
// 			fetchData(fy, month),
// 			fetchData(_prevFY, month)
// 		])
// 		.then(function (res) {
// 			Loader.hide();
// 			var curData  = res[0];
// 			var prevData = res[1];

// 			if (!curData.length && !prevData.length) {
// 				$('#mis-tbl thead').empty(); $('#mis-tbl tfoot').empty();
// 				$('#mis-tbl tbody').html('<tr><td colspan="17" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				$('#con-tbl tbody').html('<tr><td colspan="7" style="text-align:center;padding:30px;color:#aaa;">No data available.</td></tr>');
// 				$('#opex-tbl thead').empty();
// 				$('#opex-tbl tbody').html('<tr><td colspan="3" style="text-align:center;padding:30px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}

// 			// Table 1 + 2: detail + consolidated — both use curData + prevData
// 			var maps = renderDetailTable(curData, prevData, fy, _prevFY);
// 			renderConTable(maps.cm, maps.pm, fy, _prevFY);

// 			// Table 3: Operating Expense summary — rows=units, cols=Cur+Prev
// 			var opexRows = buildExpRows(curData, prevData, OPEX_NAMES);
// 			renderExpTable('opex-tbl', 'opex-title', opexRows, fy, _prevFY, month);

// 			// Table 4: Capital Expense summary
// 			var capexRows = buildExpRows(curData, prevData, CAPEX_NAMES);
// 			renderExpTable('capex-tbl', 'capex-title', capexRows, fy, _prevFY, month);

// 			// Table 5: Unit Detail Grid — one mini-table per unit showing opex sub-heads
// 			renderUnitDetailGrid(curData, fy, month);
// 		})
// 		.catch(function (err) {
// 			Loader.hide();
// 			console.error('Monthly MIS error:', err);
// 			$('#mis-tbl tbody').html('<tr><td colspan="17" style="text-align:center;padding:40px;color:red;">Error loading data.</td></tr>');
// 		});
// 	}

// };