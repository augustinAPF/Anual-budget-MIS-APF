// frappe.pages['budget-actuals-phase'].on_page_load = function(wrapper) {
//     /* ------------------------------------------------
//        PAGE
//     --------------------------------------------------*/
//     let page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Budget vs actuals Phase Sheet',
//         single_column: true
//     });

//     /* ------------------------------------------------
//        FILTER SECTION
//     --------------------------------------------------*/
//     let filter_section = $(`
//         <div class="frappe-control-group row custom-filter-row"></div>
//     `).appendTo(page.body);

//     $(`<style>
//         .custom-filter-row {
//             padding: 15px 20px;
//             background: #fff;
//             border-radius: 6px;
//             margin-top: 10px;
//         }
//         .custom-filter-row.row {
//             margin-left: 0;
//             margin-right: 0;
//         }
//         .custom-filter-row .col-md-4,
//         .custom-filter-row .col-sm-12 {
//             padding-left: 8px;
//             padding-right: 8px;
//         }
//     </style>`).appendTo("head");

//     function make_field() {
//         return $(`<div class="col-md-4 col-sm-12"></div>`).appendTo(filter_section);
//     }

//     /* ------------------------------------------------
//        HELPER — PRESERVE LABELS (CRITICAL)
//     --------------------------------------------------*/
//     function mergeSelectedOptions(control, new_options) {
//         let selected = (control.get_value() || []).map(String);
//         let existing = control.df.options || [];
//         let map = {};

//         existing.forEach(o => map[String(o.value)] = o);
//         new_options.forEach(o => map[String(o.value)] = o);

//         selected.forEach(v => {
//             if (!map[v]) {
//                 map[v] = { label: v, value: v, description: "" };
//             }
//         });

//         return Object.values(map);
//     }
// let cards_container = $('<div class="card-row"></div>').appendTo(page.body);


//     /* ------------------------------------------------
//        FINANCIAL YEAR
//     --------------------------------------------------*/
//     let fy_col = make_field();
//     let fiscal_year_filter = frappe.ui.form.make_control({
//         parent: fy_col,
//         df: {
//             label: "Financial Year",
//             fieldtype: "Select",
//             fieldname: "financial_year",
//             options: ["2025-26", "2026-27"].join("\n"),
//             default: "2025-26",
//             reqd: 1,
//             change() {
//                 loadData();
//             }
//         },
//         render_input: true
//     });

//     /* ------------------------------------------------
//        UNIT (MULTI SELECT)
//     --------------------------------------------------*/
//     let unit_col = make_field();
//     let unit_filter = frappe.ui.form.make_control({
//         parent: unit_col,
//         df: {
//             label: "Unit",
//             fieldtype: "MultiSelectList",
//             fieldname: "unit",
//             reqd: 1,
//             get_data() {
//                 return frappe.call({
//                     method: "annual_budget.api.filter_options.get_units"
//                 }).then(r => {
//                     return (r.message?.data || [])
//                         .filter(d => d.value)
//                         .map(d => ({
//                             label: d.label,
//                             value: String(d.value),
//                             description: ""
//                         }));
//                 });
//             },
//             change() {
//                 units = unit_filter.get_value().map(String);
//                 cost_center_filter.set_value([]);
//                 location_code_filter.df.options = [];
//                 location_code_filter.refresh();
//                 cost_center_filter.df.options = [];
//                 cost_center_filter.refresh();
//                 if (units.length) {
//                     loadCostCenters(units);
//                     loadLocationCodes(units);
//                     loadData();
//                 }
//             }
//         },
//         render_input: true
//     });

//     /* ------------------------------------------------
//        COST CENTER (MULTI SELECT)
//     --------------------------------------------------*/
//     let cc_col = make_field();
//     let cost_center_filter = frappe.ui.form.make_control({
//         parent: cc_col,
//         df: {
//             label: "Cost Center",
//             fieldtype: "MultiSelectList",
//             fieldname: "cost_center",
//             options: [],
//             change() {
//                 loadData();
//             }
//         },
//         render_input: true
//     });

//     /* ------------------------------------------------
//        LOCATION CODE (MULTI SELECT)
//     --------------------------------------------------*/
//     let lc_col = make_field();
//     let location_code_filter = frappe.ui.form.make_control({
//         parent: lc_col,
//         df: {
//             label: "Location Code",
//             fieldtype: "MultiSelectList",
//             fieldname: "location_code",
//             options: [],
//             change() {
//                 loadData();
//             }
//         },
//         render_input: true
//     });

//     /* ------------------------------------------------
//        LOAD COST CENTERS
//     --------------------------------------------------*/
//     function loadCostCenters(units) {
// 				    cost_center_filter.set_value([]);

//         frappe.call({
//             method: "annual_budget.api.filter_options.get_cost_centers_by_set_id",
//             args: { units: units.join(",") },
//             callback(r) {
//                 let api_options = (r.message?.data || [])
//                     .filter(d => d.value)
//                     .map(d => ({
//                         label: d.label,
//                         value: String(d.value),   // 🔥 normalize
//                         description: ""
//                     }));

//                 cost_center_filter.df.options =
//                     mergeSelectedOptions(cost_center_filter, api_options);

//                 cost_center_filter.refresh();
//             }
//         });
//     }

//     /* ------------------------------------------------
//        LOAD LOCATION CODES
//     --------------------------------------------------*/
//     function loadLocationCodes(units) {
// 		     location_code_filter.set_value([]);
//         frappe.call({
//             method: "annual_budget.api.filter_options.get_location_codes_by_unit",
//             args: { unit: units.join(",") },
//             callback(r) {
//                 let api_options = (r.message?.data || [])
//                     .filter(d => d.value)
//                     .map(d => ({
//                         label: d.label,
//                         value: String(d.value),
//                         description: ""
//                     }));

//                 location_code_filter.df.options =
//                     mergeSelectedOptions(location_code_filter, api_options);

//                 location_code_filter.refresh();
//             }
//         });
//     }

//     /* ------------------------------------------------
//        EXPORT
//     --------------------------------------------------*/
//     page.set_primary_action(__('Export CSV'), function () {
//         export_phase_sheet();
//     });

//     function export_phase_sheet() {
//         let financial_year = fiscal_year_filter.get_value();
//         let units = unit_filter.get_value();
//         let cost_centers = cost_center_filter.get_value();
//         let locations = location_code_filter.get_value();

//         if (!financial_year || !units.length) {
//             frappe.msgprint(__('Please select Financial Year and Unit'));
//             return;
//         }

//         frappe.call({
//             method: "annual_budget.api.export_reports.export_phase_sheet_excel",
//             args: {
//                 financial_year,
//                 units: units.join(","),
//                 cost_center: cost_centers,
//                 location_code: locations
//             },
//             freeze: true,
//             freeze_message: __("Preparing CSV file..."),
//             callback(r) {
//                 if (r.message?.file_url) {
//                     window.open(r.message.file_url);
//                     frappe.msgprint({
//                         title: __("Success"),
//                         message: __("Exported successfully"),
//                         indicator: "green"
//                     });
//                 }
//             }
//         });
//     }
// const style = `
// <style>

// /* =====================================================
//    CONTAINER
//    ===================================================== */

// #tables-container { 
//     margin: 20px; 
//     background-color: #ffffff; 
//     border-radius: 8px; 
//     padding: 8px; 
// }


// /* =====================================================
//    CONTROLS ROW
//    ===================================================== */

// #controls-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 12px;
//     padding: 6px 10px;
//     background: #f7f9fb;
//     border: 1px solid #dcdcdc;
//     border-radius: 6px;
// }

// #global-search-box { 
//     width: 280px; 
//     padding: 7px 12px; 
//     border: 1px solid #aaa; 
//     border-radius: 6px; 
//     font-size: 13px;
// }

// #checkbox-area {
//     display: flex;
//     align-items: center;
//     gap: 18px;
//     font-size: 13px;
//     font-weight: 500;
//     color: #333;
// }

// #checkbox-area input {
//     transform: scale(1.15);
//     cursor: pointer;
// }


// /* =====================================================
//    TABLE DESIGN
//    ===================================================== */

// .scroll-wrapper { 
//     border: 1px solid #ccc; 
//     border-radius: 6px; 
//     overflow-x: auto; 
//     overflow-y: auto; 
//     max-height: 70vh; 
//     background: #fff; 
// }

// table.university-table { 
//     min-width: 1200px; 
//     width: 100%; 
//     border-collapse: collapse; 
//     font-size: 13px; 
//     color: #111; 
//     background:#fff; 
// }

// table.university-table th, 
// table.university-table td {
//     border: 1px solid #ddd;
//     padding: 8px 10px;
//     white-space: nowrap;
//     vertical-align: middle;
//     text-align: center;
//     background:#fff !important;
// }

// table.university-table th:first-child,
// table.university-table td:first-child { 
//     text-align: left !important; 
// }

// table.university-table th:nth-child(2),
// table.university-table td:nth-child(2) { 
//     text-align: left !important; 
// }


// /* =====================================================
//    TABLE HEADERS
//    ===================================================== */

// table.university-table thead tr.main-row th { 
//     background-color: #0076B6 !important; 
//     color: #fff !important; 
//     position: sticky; 
//     top: 0; 
//     z-index: 25; 
// }

// table.university-table thead tr.sub-row th { 
//     background-color: #F26B21 !important; 
//     color: #fff !important; 
//     position: sticky; 
//     top: 34px; 
//     z-index: 24; 
// }


// /* =====================================================
//    ROW TYPES
//    ===================================================== */

// tr.expense-head { 
//     font-weight: 700; 
//     cursor: pointer; 
// }

// tr.expense-head:hover td {
//     background: #F4F9FD !important;
// }

// tr.sub-head { 
//     background-color: #FFF3E6 !important;
//     font-weight: 600; 
// }

// tr.sub-head:hover td {
//     background-color: #FFEAD5 !important;
// }

// tr.line-item td:first-child { 
//     padding-left: 35px !important; 
// }

// tr.sub-head td:first-child { 
//     padding-left: 20px !important; 
// }

// .text-blue { 
//     color: #0076B6; 
//     font-weight: 600; 
// }

// td.gl-empty { 
//     color: #aaa; 
//     font-style: italic; 
// }


// /* =====================================================
//    GRAND TOTAL TABLE ROW
//    ===================================================== */

// tr.grand-total-row td {
//     background:#003B63 !important;
//     color:#fff !important;
//     font-weight:700 !important;
//     border-top: 2px solid #000 !important;
// }



// /* =====================================================
//    NUMBER CARDS (ERP CLEAN DESIGN)
//    ===================================================== */

// /* card grid */
// .card-row{
//     display:grid;
//     grid-template-columns: repeat(4, 1fr);
//     gap:14px;
//     margin:14px 20px;
// }


// /* base card */
// .number-card{
//     background:#ffffff;
//     border:1px solid #dcdcdc;
//     border-radius:8px;
//     padding:14px 16px;
//     box-shadow:0 2px 6px rgba(0,0,0,.06);
//     transition:.15s ease;
// }

// /* hover */
// .number-card:hover{
//     transform:translateY(-2px);
//     box-shadow:0 6px 14px rgba(0,0,0,.12);
// }

// /* title */
// .number-title{
//     font-size:12px;
//     font-weight:600;
//     color:#666;
//     text-transform:uppercase;
//     margin-bottom:6px;
// }

// /* value */
// .number-value{
//     font-size:20px;
//     font-weight:700;
//     color:#0076B6;
// }

// /* GRAND TOTAL CARD */
// .number-card.grand{
//     border:2px solid #0076B6;
//     background:#F4F9FD;
// }

// .number-card.grand .number-value{
//     font-size:24px;
//     font-weight:800;
// }


// /* =====================================================
//    RESPONSIVE
//    ===================================================== */

// @media (max-width:1024px){
//     .card-row{
//         grid-template-columns:repeat(auto-fill,minmax(180px,1fr));
//     }
// }

// @media (max-width:768px){
//     .card-row{
//         grid-template-columns:repeat(auto-fill,minmax(140px,1fr));
//         gap:10px;
//         margin:10px;
//     }

//     .number-value{
//         font-size:16px;
//     }
// }

// @media (max-width:480px){
//     .card-row{
//         grid-template-columns:1fr 1fr;
//     }
// }

// </style>
// `;


// function sum(arr){
//     return (arr || []).reduce((a,b)=>a+(b||0),0);
// }
// /* ---------- RENDER TABLE (NO QUARTERS / MONTHS) ---------- */
// function renderTable() {

//     const $table = $('#phase-table');
//     $table.empty();

//     /* ===============================
//        SIMPLE HEADER
//     ===============================*/
//     const $thead = $(`
//         <thead>
//             <tr class="main-row">
//                 <th>Expense Head / Line Item</th>
//                 <th>GL Code</th>
//                 <th>Total</th>
//             </tr>
//         </thead>
//     `);

//     $table.append($thead);

//     const $tbody = $('<tbody></tbody>');

//     /* ===============================
//        BODY
//     ===============================*/
//     expense_heads.forEach(head => {

//         const headContainsMatch =
//             matchesSearch(head.name) ||
//             (head.items || []).some(i => matchesSearch(i.name, i.gl_code)) ||
//             (head.sub_heads || []).some(s =>
//                 matchesSearch(s.name) ||
//                 (s.items || []).some(i => matchesSearch(i.name, i.gl_code))
//             );

//         if (!headContainsMatch) return;

//         const headTotal =
//             sum(head.q1) +
//             sum(head.q2) +
//             sum(head.q3) +
//             sum(head.q4);

//         /* ===============================
//            EXPENSE HEAD ROW
//         ===============================*/
//         $tbody.append(`
//             <tr class="expense-head" data-head="${head.name}">
//                 <td>${expandedHeads.includes(head.name) ? '▼' : '▶'} ${head.name}</td>
//                 <td class="gl-empty">-</td>
//                 <td class="text-blue">${formatNumber(headTotal)}</td>
//             </tr>
//         `);


//         /* ===============================
//            LINE ITEMS
//         ===============================*/
//         if (expandedHeads.includes(head.name) && head.items?.length) {

//             head.items
//             .filter(item => matchesSearch(item.name, item.gl_code))
//             .forEach(item => {

//                 const total =
//                     sum(item.q1) +
//                     sum(item.q2) +
//                     sum(item.q3) +
//                     sum(item.q4);

//                 $tbody.append(`
//                     <tr class="line-item">
//                         <td>${item.name}</td>
//                         <td>${item.gl_code}</td>
//                         <td>${formatNumber(total)}</td>
//                     </tr>
//                 `);
//             });
//         }


//         /* ===============================
//            SUB HEADS
//         ===============================*/
//         if (expandedHeads.includes(head.name) && head.sub_heads?.length) {

//             head.sub_heads
//             .filter(sub =>
//                 matchesSearch(sub.name) ||
//                 (sub.items || []).some(i => matchesSearch(i.name, i.gl_code))
//             )
//             .forEach(sub => {

//                 const key = head.name + "__" + sub.name;

//                 const subTotal =
//                     sum(sub.q1) +
//                     sum(sub.q2) +
//                     sum(sub.q3) +
//                     sum(sub.q4);

//                 $tbody.append(`
//                     <tr class="sub-head" data-sub="${key}">
//                         <td>${expandedSubHeads.includes(key) ? '▼' : '▶'} ${sub.name}</td>
//                         <td class="gl-empty">-</td>
//                         <td class="text-blue">${formatNumber(subTotal)}</td>
//                     </tr>
//                 `);


//                 /* ===============================
//                    SUB ITEMS
//                 ===============================*/
//                 if (expandedSubHeads.includes(key) && sub.items?.length) {

//                     sub.items
//                     .filter(item => matchesSearch(item.name, item.gl_code))
//                     .forEach(item => {

//                         const total =
//                             sum(item.q1) +
//                             sum(item.q2) +
//                             sum(item.q3) +
//                             sum(item.q4);

//                         $tbody.append(`
//                             <tr class="line-item">
//                                 <td>${item.name}</td>
//                                 <td>${item.gl_code}</td>
//                                 <td>${formatNumber(total)}</td>
//                             </tr>
//                         `);
//                     });
//                 }
//             });
//         }
//     });


//     /* ===============================
//        GRAND TOTAL
//     ===============================*/
//     let grandTotal = 0;

//     expense_heads.forEach(h => {
//         grandTotal += sum(h.q1) + sum(h.q2) + sum(h.q3) + sum(h.q4);
//     });

//     $tbody.append(`
//         <tr class="grand-total-row">
//             <td colspan="2" style="text-align:left;">GRAND TOTAL</td>
//             <td>${formatNumber(grandTotal)}</td>
//         </tr>
//     `);

//     $table.append($tbody);


//     /* ===============================
//        EVENTS
//     ===============================*/

//     $table.find('.expense-head').off('click').on('click', function () {
//         const headName = $(this).data('head');

//         expandedHeads = expandedHeads.includes(headName)
//             ? expandedHeads.filter(x => x !== headName)
//             : [...expandedHeads, headName];

//         renderTable();
//     });

//     $table.find('.sub-head').off('click').on('click', function () {
//         const key = $(this).data('sub');

//         expandedSubHeads = expandedSubHeads.includes(key)
//             ? expandedSubHeads.filter(x => x !== key)
//             : [...expandedSubHeads, key];

//         renderTable();
//     });
// }


	
// $(style).appendTo(page.body);

// 	/* ---------- UI Container ---------- */
// 	const container = $(`
// 		<div id="tables-container">

// 			<div id="controls-row">
// 				<input id="global-search-box" type="text" placeholder="Search Expense / Sub Head / Item / GL Code...">
// 				<div id="checkbox-area">
// 					<label><input type="checkbox" id="expand-items"> Expand Line Items</label>
// 				</div>
// 			</div>

// 			<div class="scroll-wrapper">
// 				<table class="university-table" id="phase-table"></table>
// 			</div>

// 		</div>
// 	`);
// 	$(page.body).append(container);


// 	/* ---------- State ---------- */
// 	let expense_heads = [];
// 	let expandedHeads = [];
// 	let expandedSubHeads = [];
// 	let expandedQuarters = [];
// 	let searchText = "";


// 	/* Quarter Setup */
// 	const quarters = {
// 		q1: { label: 'Quarter 1', months: ['April', 'May', 'June'] },
// 		q2: { label: 'Quarter 2', months: ['July', 'August', 'September'] },
// 		q3: { label: 'Quarter 3', months: ['October', 'November', 'December'] },
// 		q4: { label: 'Quarter 4', months: ['January', 'February', 'March'] }
// 	};

// 	const formatNumber = n => (n || 0).toLocaleString();

// 	/* ---------- API LOAD ---------- */
// 	function loadData() {
// 		let fy = fiscal_year_filter.get_value();
// 		let unit = unit_filter.get_value();
// 		let cost_center = cost_center_filter.get_value();
// 		let location_code = location_code_filter.get_value();

// 		let unit_str = unit.join(",");
// 		let cost_center_str = cost_center.join(",");
// 		let location_code_str = location_code.join(",");
// 		console.log(unit_str,cost_center_str,location_code_str,"Values for API")
// 		if (!fy || !unit) return;

// 		frappe.call({
// 			method: "annual_budget.api.phase_sheet.get_consolidated_report_ytd",
// 			args: { financial_year: fy, unit: unit_str,month:"may",cost_center:cost_center_str,location_code:location_code_str },
// 			callback: function(r) {
// 				expense_heads = r.message || [];
// 				renderTable();
// 				renderCards(expense_heads);   // ⭐ add this

// 			}
// 		});
// 	}


// 	/* ---------- SEARCH MATCH ---------- */
// 	function matchesSearch(...values) {
// 		return values.some(v => (String(v || "").toLowerCase()).includes(searchText.toLowerCase()));
// 	}


// 	/* ---------- GRAND TOTAL ---------- */
// 	function getGrandTotals() {
// 		const totals = { q1: [0,0,0], q2: [0,0,0], q3: [0,0,0], q4: [0,0,0], total: 0 };

// 		expense_heads.forEach(head => {
// 			['q1','q2','q3','q4'].forEach(q => {
// 				head[q].forEach((v, i) => {
// 					totals[q][i] += (v || 0);
// 					totals.total += (v || 0);
// 				});
// 			});
// 		});
// 		return totals;
// 	}




// 	/* CHECKBOX EVENTS */
// 	$("#expand-quarters").on("change", function() {
// 		expandedQuarters = this.checked ? ['q1','q2','q3','q4'] : [];
// 		renderTable();
// 	});

// 	$("#expand-items").on("change", function() {
// 		if (this.checked) {
// 			expandedHeads = expense_heads.map(h => h.name);
// 			expandedSubHeads = expense_heads.flatMap(h => (h.sub_heads || []).map(s => h.name + "__" + s.name));
// 		} else {
// 			expandedHeads = [];
// 			expandedSubHeads = [];
// 		}
// 		renderTable();
// 	});

// 	$("#global-search-box").on("input", function() {
// 		searchText = this.value;
// 		renderTable();
// 	});

// 	loadData();
// };





// frappe.pages['budget-actuals-phase'].on_page_load = function(wrapper) {

// 	const page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Budget vs Actuals Phase Sheet',
// 		single_column: true
// 	});

// 	/* =====================================================
// 	   HTML STRUCTURE
// 	===================================================== */

// 	const html = `
// 	<div class="phase-wrapper">

// 		<div class="filters">
// 			<input type="text" id="fiscal_year" value="2025" placeholder="Fiscal Year">
// 			<input type="text" id="accounting_period" value="10" placeholder="Accounting Period">
// 			<button class="btn btn-primary btn-sm" id="load-btn">Load</button>
// 			<input type="text" id="search-input" placeholder="🔍 Search expense...">
// 		</div>

// 		<div class="scroll-wrapper">
// 			<table id="phase-table" class="phase-table">
// 				<thead id="phase-header"></thead>
// 				<tbody id="phase-body"></tbody>
// 			</table>
// 		</div>

// 	</div>
// 	`;

// 	$(page.body).html(html);
// 	injectStyles();

// 	document.getElementById("load-btn").addEventListener("click", loadData);
// 	document.getElementById("search-input").addEventListener("input", filterTable);

// 	loadData();
// };


// /* =====================================================
//    STYLE
// ===================================================== */

// function injectStyles(){

// 	$(`
// 	<style>
// 	.phase-wrapper { padding:16px; background:#f4f6f9; }

// 	.filters{
// 		display:flex;
// 		gap:10px;
// 		margin-bottom:12px;
// 	}

// 	.filters input{
// 		padding:6px 8px;
// 		border:1px solid #ccc;
// 		border-radius:4px;
// 	}

// 	.scroll-wrapper{
// 		max-height:70vh;
// 		overflow:auto;
// 		border:1px solid #ccc;
// 	}

// 	table.phase-table{
// 		border-collapse:collapse;
// 		min-width:1200px;
// 		font-size:13px;
// 	}

// 	th, td{
// 		border:1px solid #000;
// 		padding:6px 8px;
// 		text-align:right;
// 		white-space:nowrap;
// 	}

// 	th{
// 		background:#0076B6;
// 		color:white;
// 		position:sticky;
// 		top:0;
// 		z-index:50;
// 	}

// 	th:first-child, td:first-child{
// 		position:sticky;
// 		left:0;
// 		background:white;
// 		text-align:left;
// 		font-weight:600;
// 		z-index:60;
// 	}

// 	tr.group-row{
// 		background:#f0f8ff;
// 		font-weight:700;
// 	}

// 	tr.total-row{
// 		background:#f9f9f9;
// 		font-weight:700;
// 		border-top:2px solid #000;
// 	}
// 	</style>
// 	`).appendTo("body");
// }


// /* =====================================================
//    LOAD DATA FROM API
// ===================================================== */

// function loadData(){

// 	const fiscal_year = document.getElementById("fiscal_year").value;
// 	const accounting_period = document.getElementById("accounting_period").value;

// 	frappe.call({
// 		method: "annual_budget.api.actuals.get_grouped_actuals",
// 		args: {
// 			fiscal_year: fiscal_year,
// 			accounting_period: accounting_period
// 		},
// 		freeze: true,
// 		freeze_message: "Loading Phase Sheet...",
// 		callback: function(r){

// 			const data = r.message?.data || [];
// 			renderTable(data);
// 		}
// 	});
// }


// /* =====================================================
//    RENDER TABLE
// ===================================================== */

// function renderTable(data){

// 	const header = document.getElementById("phase-header");
// 	const body = document.getElementById("phase-body");

// 	header.innerHTML="";
// 	body.innerHTML="";

// 	if(!data.length){
// 		body.innerHTML="<tr><td>No data found</td></tr>";
// 		return;
// 	}

// 	/* HEADER */
// 	header.innerHTML = `
// 	<tr>
// 		<th>Expense Head</th>
// 		<th>Business Unit</th>
// 		<th>Dept ID</th>
// 		<th>Operating Unit</th>
// 		<th>Budget</th>
// 		<th>Actuals</th>
// 		<th>Previous Year</th>
// 	</tr>
// 	`;

// 	let html="";
// 	let grandTotal=0;

// 	data.forEach(row=>{

// 		html+=`
// 		<tr>
// 			<td>${row.type_of_expense}</td>
// 			<td>${row.business_unit}</td>
// 			<td>${row.deptid}</td>
// 			<td>${row.operating_unit}</td>
// 			<td>${(row.budget||0).toLocaleString()}</td>
// 			<td>${(row.total_posted_amt||0).toLocaleString()}</td>
// 			<td>${(row.previous_year||0).toLocaleString()}</td>
// 		</tr>
// 		`;

// 		grandTotal += parseFloat(row.total_posted_amt || 0);
// 	});

// 	html+=`
// 	<tr class="total-row">
// 		<td colspan="5">Grand Total</td>
// 		<td>${grandTotal.toLocaleString()}</td>
// 		<td></td>
// 	</tr>
// 	`;

// 	body.innerHTML=html;
// }


// /* =====================================================
//    SEARCH FILTER
// ===================================================== */

// function filterTable(){

// 	const term = document.getElementById("search-input").value.toLowerCase();

// 	document.querySelectorAll("#phase-body tr").forEach(row=>{

// 		const txt = row.querySelector("td")?.innerText.toLowerCase();

// 		row.style.display = txt?.includes(term) || row.classList.contains("total-row")
// 			? ""
// 			: "none";
// 	});
// }




















frappe.pages['budget-actuals-phase'].on_page_load = function(wrapper) {

    /* ------------------------------------------------
       PAGE
    --------------------------------------------------*/
    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Budget vs Actuals Phase Sheet',
        single_column: true
    });

    /* ------------------------------------------------
       FILTER SECTION
    --------------------------------------------------*/
    let filter_section = $(`
        <div class="frappe-control-group row custom-filter-row"></div>
    `).appendTo(page.body);

    function make_field() {
        return $(`<div class="col-md-4 col-sm-12"></div>`).appendTo(filter_section);
    }

    /* ------------------------------------------------
       FINANCIAL YEAR
    --------------------------------------------------*/
    let fy_col = make_field();
    let fiscal_year_filter = frappe.ui.form.make_control({
        parent: fy_col,
        df: {
            label: "Financial Year",
            fieldtype: "Select",
            fieldname: "financial_year",
            options: ["2025-26", "2026-27"].join("\n"),
            default: "2025-26",
            reqd: 1,
            change() {
                loadData();
            }
        },
        render_input: true
    });

    /* ------------------------------------------------
       UNIT
    --------------------------------------------------*/
    let unit_col = make_field();
    let unit_filter = frappe.ui.form.make_control({
        parent: unit_col,
        df: {
            label: "Unit",
            fieldtype: "MultiSelectList",
            fieldname: "unit",
            reqd: 1,
            get_data() {
                return frappe.call({
                    method: "annual_budget.api.filter_options.get_units"
                }).then(r => r.message?.data || []);
            },
            change() {
                loadData();
            }
        },
        render_input: true
    });

    /* ------------------------------------------------
       STYLES
    --------------------------------------------------*/
    const style = `
    <style>
    #tables-container { margin:20px; }
    .scroll-wrapper { overflow:auto; max-height:70vh; border:1px solid #ccc; }
    table.university-table {
        width:100%;
        border-collapse:collapse;
        font-size:13px;
    }
    table.university-table th,
    table.university-table td {
        border:1px solid #ddd;
        padding:8px;
        text-align:center;
    }
    table.university-table th:first-child,
    table.university-table td:first-child {
        text-align:left;
    }
    table.university-table thead th {
        background:#0076B6;
        color:#fff;
    }
    tr.expense-head { font-weight:700; cursor:pointer; }
    tr.sub-head { background:#f9f9f9; cursor:pointer; }
    tr.line-item td:first-child { padding-left:30px; }
    tr.grand-total-row td {
        background:#003B63;
        color:#fff;
        font-weight:700;
    }
    #controls-row {
        display:flex;
        justify-content:space-between;
        margin-bottom:10px;
    }
    #global-search-box {
        width:250px;
        padding:6px;
    }
    </style>
    `;
    $(style).appendTo(page.body);

    /* ------------------------------------------------
       TABLE UI
    --------------------------------------------------*/
    const container = $(`
        <div id="tables-container">

            <div id="controls-row">
                <input id="global-search-box" type="text" placeholder="Search...">
                <label>
                    <input type="checkbox" id="expand-items">
                    Expand All
                </label>
            </div>

            <div class="scroll-wrapper">
                <table class="university-table" id="phase-table"></table>
            </div>
        </div>
    `);
    $(page.body).append(container);

    /* ------------------------------------------------
       STATE
    --------------------------------------------------*/
    let expense_heads = [];
    let expandedHeads = [];
    let expandedSubHeads = [];
    let searchText = "";

    const formatNumber = n => (n || 0).toLocaleString();

    /* ------------------------------------------------
       LOAD DATA
    --------------------------------------------------*/
    function loadData() {

        let fy = fiscal_year_filter.get_value();
        let unit = unit_filter.get_value();

        if (!fy || !unit?.length) return;

        frappe.call({
            method: "annual_budget.api.phase_sheet.get_budget_actuals_report",
            args: {
                financial_year: fy,
                units: unit.join(",")
            },
            callback: function(r) {
                expense_heads = r.message || [];
                renderTable();
            }
        });
    }

    /* ------------------------------------------------
       SEARCH
    --------------------------------------------------*/
    function matchesSearch(...values) {
        return values.some(v =>
            String(v || "").toLowerCase().includes(searchText.toLowerCase())
        );
    }

    /* ------------------------------------------------
       RENDER TABLE
    --------------------------------------------------*/
    function renderTable() {

        const $table = $('#phase-table');
        $table.empty();

        const $thead = $(`
            <thead>
                <tr>
                    <th>Expense Head / Line Item</th>
                    <th>Budget</th>
                    <th>Previous Year Actuals</th>
                    <th>Total</th>
                </tr>
            </thead>
        `);

        $table.append($thead);
        const $tbody = $('<tbody></tbody>');

        expense_heads.forEach(head => {

            if (!matchesSearch(head.name)) return;

            const budget = head.budget || 0;
            const prev = head.previous_year_actual || 0;
            const total = head.total || budget;

            $tbody.append(`
                <tr class="expense-head" data-head="${head.name}">
                    <td>${expandedHeads.includes(head.name) ? '▼' : '▶'} ${head.name}</td>
                    <td>${formatNumber(budget)}</td>
                    <td>${formatNumber(prev)}</td>
                    <td>${formatNumber(total)}</td>
                </tr>
            `);

            /* Sub-Heads */
            if (expandedHeads.includes(head.name) && head.sub_heads) {

                head.sub_heads.forEach(sub => {

                    const key = head.name + "__" + sub.name;

                    const subBudget = sub.budget || 0;
                    const subPrev = sub.previous_year_actual || 0;
                    const subTotal = sub.total || subBudget;

                    $tbody.append(`
                        <tr class="sub-head" data-sub="${key}">
                            <td>${expandedSubHeads.includes(key) ? '▼' : '▶'} ${sub.name}</td>
                            <td>${formatNumber(subBudget)}</td>
                            <td>${formatNumber(subPrev)}</td>
                            <td>${formatNumber(subTotal)}</td>
                        </tr>
                    `);

                    if (expandedSubHeads.includes(key) && sub.items) {

                        sub.items.forEach(item => {

                            const itemBudget = item.budget || 0;
                            const itemPrev = item.previous_year_actual || 0;
                            const itemTotal = item.total || itemBudget;

                            $tbody.append(`
                                <tr class="line-item">
                                    <td>${item.name}</td>
                                    <td>${formatNumber(itemBudget)}</td>
                                    <td>${formatNumber(itemPrev)}</td>
                                    <td>${formatNumber(itemTotal)}</td>
                                </tr>
                            `);
                        });
                    }
                });
            }
        });

        /* GRAND TOTAL */
        const grandBudget = expense_heads.reduce((s,h)=>s+(h.budget||0),0);
        const grandPrev = expense_heads.reduce((s,h)=>s+(h.previous_year_actual||0),0);
        const grandTotal = expense_heads.reduce((s,h)=>s+(h.total||h.budget||0),0);

        $tbody.append(`
            <tr class="grand-total-row">
                <td>GRAND TOTAL</td>
                <td>${formatNumber(grandBudget)}</td>
                <td>${formatNumber(grandPrev)}</td>
                <td>${formatNumber(grandTotal)}</td>
            </tr>
        `);

        $table.append($tbody);

        /* EVENTS */
        $table.find('.expense-head').off('click').on('click', function() {
            const name = $(this).data('head');
            expandedHeads = expandedHeads.includes(name)
                ? expandedHeads.filter(x=>x!==name)
                : [...expandedHeads, name];
            renderTable();
        });

        $table.find('.sub-head').off('click').on('click', function() {
            const key = $(this).data('sub');
            expandedSubHeads = expandedSubHeads.includes(key)
                ? expandedSubHeads.filter(x=>x!==key)
                : [...expandedSubHeads, key];
            renderTable();
        });
    }

    /* ------------------------------------------------
       EVENTS
    --------------------------------------------------*/
    $("#expand-items").on("change", function() {
        if (this.checked) {
            expandedHeads = expense_heads.map(h=>h.name);
            expandedSubHeads = expense_heads.flatMap(h =>
                (h.sub_heads || []).map(s => h.name + "__" + s.name)
            );
        } else {
            expandedHeads = [];
            expandedSubHeads = [];
        }
        renderTable();
    });

    $("#global-search-box").on("input", function() {
        searchText = this.value;
        renderTable();
    });

    loadData();
};
