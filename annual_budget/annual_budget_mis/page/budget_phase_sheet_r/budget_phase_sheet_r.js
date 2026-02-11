// frappe.pages['budget-phase-sheet-r'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Phase Sheet',
// 		single_column: true
// 	});

// 	    page.set_primary_action(__('Export CSV'), function () {
//         export_phase_sheet();
//     });
// 	function export_phase_sheet() {
//      let financial_year = fiscal_year_filter.get_value();
//     let units = unit_filter.get_value();

//     if (!financial_year || !units) {
//         frappe.msgprint(__('Please select Financial Year and Unit'));
//         return;
//     }

//     frappe.call({
//         method: "annual_budget.api.export_reports.export_phase_sheet_excel",
//         args: {
//             financial_year: financial_year,
//             units: units
//         },
//         freeze: true,
//         freeze_message: __("Preparing CSV file..."),
//         callback: function (r) {
//             if (r.message && r.message.file_url) {
//                 // Auto download
//                 window.open(r.message.file_url);
//                 frappe.msgprint({
//                     title: __("Success"),
//                     message: __("CSV exported successfully"),
//                     indicator: "green"
//                 });
//             }
//         }
//     });
// }
// 	/* ---------- FILTERS ---------- */
// 	let fiscal_year_filter = page.add_field({
// 		label: "Financial Year",
// 		fieldtype: "Select",
// 		fieldname: "financial_year",
// 		options: ["2025-26", "2026-27"].join("\n"),
// 		reqd: 1,
// 		default: "2025-26",
// 		change: function() { loadData(); }
// 	});

// 	let unit_filter = page.add_field({
// 		label: "Unit",
// 		fieldtype: "Select",
// 		fieldname: "units",
// 		options: [
// 			"APU",
// 			"APUMP",
// 			"APUJH",
// 			"APET",
// 			"APF",
// 			"APPI",
// 			"APF01",
// 			"APFD"
// 		].join("\n"),
// 		reqd: 1,
// 		default: "APUMP",
// 		change: function() { loadData(); }
// 	});


// 	/* ---------- Styles ---------- */
// 	const style = `
// <style>

// 	#tables-container { 
// 		margin: 20px; 
// 		background-color: #ffffff; 
// 		border-radius: 8px; 
// 		padding: 8px; 
// 	}

// 	/* Controls Row */
// 	#controls-row {
// 		display: flex;
// 		justify-content: space-between;
// 		align-items: center;
// 		margin-bottom: 12px;
// 		padding: 6px 10px;
// 		background: #f7f9fb;
// 		border: 1px solid #dcdcdc;
// 		border-radius: 6px;
// 	}

// 	#global-search-box { 
// 		width: 280px; 
// 		padding: 7px 12px; 
// 		border: 1px solid #aaa; 
// 		border-radius: 6px; 
// 		font-size: 13px;
// 	}

// 	#checkbox-area {
// 		display: flex;
// 		align-items: center;
// 		gap: 18px;
// 		font-size: 13px;
// 		font-weight: 500;
// 		color: #333;
// 	}

// 	#checkbox-area input {
// 		transform: scale(1.15);
// 		cursor: pointer;
// 	}

// 	.scroll-wrapper { 
// 		border: 1px solid #ccc; 
// 		border-radius: 6px; 
// 		overflow-x: auto; 
// 		overflow-y: auto; 
// 		max-height: 70vh; 
// 		background: #fff; 
// 	}

// 	table.university-table { 
// 		min-width: 1200px; 
// 		width: 100%; 
// 		border-collapse: collapse; 
// 		font-size: 13px; 
// 		color: #111; 
// 		background:#fff; 
// 	}

// 	table.university-table th, 
// 	table.university-table td {
// 		border: 1px solid #ddd;
// 		padding: 8px 10px;
// 		white-space: nowrap;
// 		vertical-align: middle;
// 		text-align: center;
// 		background:#fff !important;
// 	}

// 	table.university-table th:first-child,
// 	table.university-table td:first-child { 
// 		text-align: left !important; 
// 	}

// 	table.university-table th:nth-child(2),
// 	table.university-table td:nth-child(2) { 
// 		text-align: left !important; 
// 	}

// 	/* Table Headers */
// 	table.university-table thead tr.main-row th { 
// 		background-color: #0076B6 !important; 
// 		color: #fff !important; 
// 		position: sticky; 
// 		top: 0; 
// 		z-index: 25; 
// 		cursor: pointer; 
// 	}

// 	table.university-table thead tr.sub-row th { 
// 		background-color: #F26B21 !important; 
// 		color: #fff !important; 
// 		position: sticky; 
// 		top: 34px; 
// 		z-index: 24; 
// 	}

// 	/* =========================
// 	   MAIN HEAD (no background)
// 	   ========================= */
// 	tr.expense-head { 
// 		font-weight: 700; 
// 		cursor: pointer; 
// 	}

// 	tr.expense-head td {
// 		background: #fff !important;
// 	}

// 	tr.expense-head:hover td {
// 		background: #F4F9FD !important;
// 	}

// 	/* =========================
// 	   SUB HEAD (single color)
// 	   ========================= */
// 	tr.sub-head { 
// 		background-color: #FFF3E6 !important;   /* light orange based on theme */
// 		font-weight: 600; 
// 		cursor: pointer; 
// 	}

// 	tr.sub-head td {
// 		background-color: #FFF3E6 !important;
// 	}

// 	tr.sub-head:hover td {
// 		background-color: #FFEAD5 !important;
// 	}

// 	/* Line Items */
// 	tr.line-item td:first-child { 
// 		padding-left: 35px !important; 
// 	}

// 	tr.sub-head td:first-child { 
// 		padding-left: 20px !important; 
// 	}

// 	/* Utility */
// 	.text-blue { 
// 		color: #0076B6; 
// 		font-weight: 600; 
// 	}

// 	td.gl-empty { 
// 		color: #aaa; 
// 		font-style: italic; 
// 	}

// 	/* Grand Total */
// 	tr.grand-total-row td {
// 		background:#003B63 !important;
// 		color:#fff !important;
// 		font-weight:700 !important;
// 		border-top: 2px solid #000 !important;
// 	}

// </style>


// 	`;
// 	$(style).appendTo(page.body);

// 	/* ---------- UI Container ---------- */
// 	const container = $(`
// 		<div id="tables-container">

// 			<div id="controls-row">
// 				<input id="global-search-box" type="text" placeholder="Search Expense / Sub Head / Item / GL Code...">
// 				<div id="checkbox-area">
// 					<label><input type="checkbox" id="expand-quarters"> Expand Quarters</label>
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
// 		if (!fy || !unit) return;

// 		frappe.call({
// 			method: "annual_budget.api.phase_sheet.get_consolidated_report",
// 			args: { financial_year: fy, units: unit },
// 			callback: function(r) {
// 				expense_heads = r.message || [];
// 				renderTable();
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


// 	/* ---------- RENDER TABLE ---------- */
// 	function renderTable() {
// 		const $table = $('#phase-table');
// 		$table.empty();

// 		const $thead = $('<thead></thead>');
// 		const $mainRow = $('<tr class="main-row"></tr>');
// 		$mainRow.append('<th rowspan="2">Expense Head / Line Item</th>');
// 		$mainRow.append('<th rowspan="2">GL Code</th>');

// 		['q1','q2','q3','q4'].forEach(q => {
// 			const isExpanded = expandedQuarters.includes(q);
// 			const arrow = isExpanded ? '▲' : '▼';
// 			const colspan = 3;
// 			const rowspan = isExpanded ? 1 : 2;

// 			$mainRow.append(`
// 				<th class="expandable" data-quarter="${q}" colspan="${colspan}" rowspan="${rowspan}">
// 					${quarters[q].label} ${arrow}
// 				</th>
// 			`);
// 		});

// 		$mainRow.append('<th rowspan="2">Total</th>');
// 		$thead.append($mainRow);

// 		if (expandedQuarters.length > 0) {
// 			const $subRow = $('<tr class="sub-row"></tr>');
// 			['q1','q2','q3','q4'].forEach(q => {
// 				if (expandedQuarters.includes(q)) quarters[q].months.forEach(m => $subRow.append(`<th>${m}</th>`));
// 			});
// 			$thead.append($subRow);
// 		}

// 		$table.append($thead);
// 		const $tbody = $('<tbody></tbody>');

// 		expense_heads.forEach(head => {

// 			const headContainsMatch =
// 				matchesSearch(head.name) ||
// 				(head.items || []).some(i => matchesSearch(i.name, i.gl_code)) ||
// 				(head.sub_heads || []).some(s =>
// 					matchesSearch(s.name) ||
// 					(s.items || []).some(i => matchesSearch(i.name, i.gl_code))
// 				);

// 			if (!headContainsMatch) return;

// 			const headTotal = ['q1','q2','q3','q4']
// 				.reduce((sum, q) => sum + head[q].reduce((a,b)=>a+b,0), 0);

// 			$tbody.append(`
// 				<tr class="expense-head" data-head="${head.name}">
// 					<td>${expandedHeads.includes(head.name) ? '▼' : '▶'} ${head.name}</td>
// 					<td class="gl-empty">-</td>
// 					${['q1','q2','q3','q4'].map(q =>
// 						expandedQuarters.includes(q)
// 							? head[q].map(v => `<td>${formatNumber(v)}</td>`).join('')
// 							: `<td colspan="3">${formatNumber(head[q].reduce((a,b)=>a+b,0))}</td>`
// 					).join('')}
// 					<td class="text-blue">${formatNumber(headTotal)}</td>
// 				</tr>
// 			`);

// 			/* Line Items */
// 			if (expandedHeads.includes(head.name) && head.items && head.items.length) {
// 				head.items
// 				.filter(item => matchesSearch(item.name, item.gl_code))
// 				.forEach(item => {
// 					const total = ['q1','q2','q3','q4']
// 						.reduce((sum, q) => sum + item[q].reduce((a,b)=>a+b,0), 0);

// 					$tbody.append(`
// 						<tr class="line-item">
// 							<td>${item.name}</td>
// 							<td>${item.gl_code}</td>
// 							${['q1','q2','q3','q4'].map(q =>
// 								expandedQuarters.includes(q)
// 									? item[q].map(v => `<td>${formatNumber(v)}</td>`).join('')
// 									: `<td colspan="3">${formatNumber(item[q].reduce((a,b)=>a+b,0))}</td>`
// 							).join('')}
// 							<td>${formatNumber(total)}</td>
// 						</tr>
// 					`);
// 				});
// 			}

// 			/* Sub-Heads */
// 			if (expandedHeads.includes(head.name) && head.sub_heads && head.sub_heads.length) {
// 				head.sub_heads
// 				.filter(sub =>
// 					matchesSearch(sub.name) ||
// 					(sub.items || []).some(i => matchesSearch(i.name, i.gl_code))
// 				)
// 				.forEach(sub => {

// 					const key = head.name + "__" + sub.name;

// 					const subTotal = ['q1','q2','q3','q4']
// 						.reduce((sum, q) => sum + sub[q].reduce((a,b)=>a+b,0), 0);

// 					$tbody.append(`
// 						<tr class="sub-head" data-sub="${key}">
// 							<td>${expandedSubHeads.includes(key) ? '▼' : '▶'} ${sub.name}</td>
// 							<td class="gl-empty">-</td>
// 							${['q1','q2','q3','q4'].map(q =>
// 								expandedQuarters.includes(q)
// 									? sub[q].map(v => `<td>${formatNumber(v)}</td>`).join('')
// 									: `<td colspan="3">${formatNumber(sub[q].reduce((a,b)=>a+b,0))}</td>`
// 							).join('')}
// 							<td class="text-blue">${formatNumber(subTotal)}</td>
// 						</tr>
// 					`);

// 					if (expandedSubHeads.includes(key) && sub.items && sub.items.length) {
// 						sub.items
// 						.filter(item => matchesSearch(item.name, item.gl_code))
// 						.forEach(item => {
// 							const total = ['q1','q2','q3','q4']
// 								.reduce((sum, q) => sum + item[q].reduce((a,b)=>a+b,0), 0);

// 							$tbody.append(`
// 								<tr class="line-item">
// 									<td>${item.name}</td>
// 									<td>${item.gl_code}</td>
// 									${['q1','q2','q3','q4'].map(q =>
// 										expandedQuarters.includes(q)
// 											? item[q].map(v => `<td>${formatNumber(v)}</td>`).join('')
// 											: `<td colspan="3">${formatNumber(item[q].reduce((a,b)=>a+b,0))}</td>`
// 									).join('')}
// 									<td>${formatNumber(total)}</td>
// 								</tr>
// 							`);
// 						});
// 					}
// 				});
// 			}
// 		});


// 		/* GRAND TOTAL */
// 		const grand = getGrandTotals();
// 		const $grandRow = $('<tr class="grand-total-row"></tr>');
// 		$grandRow.append(`<td colspan="2" style="text-align:left;">GRAND TOTAL</td>`);

// 		['q1','q2','q3','q4'].forEach(q => {
// 			if (expandedQuarters.includes(q)) {
// 				grand[q].forEach(v => $grandRow.append(`<td>${formatNumber(v)}</td>`));
// 			} else {
// 				$grandRow.append(`<td colspan="3">${formatNumber(grand[q].reduce((a,b)=>a+b,0))}</td>`);
// 			}
// 		});

// 		$grandRow.append(`<td>${formatNumber(grand.total)}</td>`);
// 		$tbody.append($grandRow);
// 		$table.append($tbody);


// 		/* EVENTS */
// 		$table.find('th.expandable').off('click').on('click', function () {
// 			const q = $(this).data('quarter');
// 			expandedQuarters = expandedQuarters.includes(q) ? expandedQuarters.filter(x=>x!==q) : [...expandedQuarters, q];
// 			$("#expand-quarters").prop("checked", expandedQuarters.length === 4);
// 			renderTable();
// 		});

// 		$table.find('.expense-head').off('click').on('click', function () {
// 			const headName = $(this).data('head');
// 			expandedHeads = expandedHeads.includes(headName) ? expandedHeads.filter(x=>x!==headName) : [...expandedHeads, headName];
// 			$("#expand-items").prop("checked", expandedHeads.length === expense_heads.length);
// 			renderTable();
// 		});

// 		$table.find('.sub-head').off('click').on('click', function () {
// 			const key = $(this).data('sub');
// 			expandedSubHeads = expandedSubHeads.includes(key) ? expandedSubHeads.filter(x=>x!==key) : [...expandedSubHeads, key];
// 			renderTable();
// 		});
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

frappe.pages['budget-phase-sheet-r'].on_page_load = function (wrapper) {

	let page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Phase Sheet',
		single_column: true
	});

	/* ===================== STYLES ===================== */
	const style = `
	<style>
	#tables-container{
		margin:20px;
		background:#fff;
		border-radius:8px;
		border:1px solid #ccc;
		box-shadow:0 2px 6px rgba(0,0,0,0.05);
		overflow:hidden;
	}

	.scroll-wrapper{ overflow-x:auto; max-height:70vh; }

	table.university-table{
		min-width:1700px;
		width:100%;
		border-collapse:collapse;
		font-size:13px;
	}

	th,td{
		border:1px solid #ddd;
		padding:8px;
		text-align:center;
		white-space:nowrap;
	}

	th:first-child,td:first-child{
		text-align:left;
		padding-left:12px;
	}

	.main-row th{
		background:#0076B6;
		color:#fff;
		position:sticky;
		top:0;
		z-index:30;
		cursor:pointer;
	}

	.month-row th{
		background:#0076B6;
		color:#fff;
		position:sticky;
		top:34px;
		z-index:29;
	}

	.budget-row th{
		background:#F26B21;
		color:#fff;
		position:sticky;
		top:68px;
		z-index:28;
	}

	tr.expense-head{
		background:#E8F4FB;
		font-weight:600;
	}
	</style>
	`;
	$(style).appendTo(page.body);

	/* ===================== UI ===================== */
	const container = $(`
	<div id="tables-container">
		<div class="scroll-wrapper">
			<table class="university-table" id="phase-table"></table>
		</div>
	</div>
	`);
	$(page.body).append(container);

	/* ===================== STATE ===================== */
	let expense_heads = [];
	let expandedQuarters = [];

	const quarters = {
		q1:{ label:"QTR-1", months:["Apr","May","Jun"] },
		q2:{ label:"QTR-2", months:["Jul","Aug","Sep"] },
		q3:{ label:"QTR-3", months:["Oct","Nov","Dec"] },
		q4:{ label:"QTR-4", months:["Jan","Feb","Mar"] }
	};

	const format = n => Number(n||0).toLocaleString();

	/* ===================== LOAD DATA ===================== */
	function loadData(){
		frappe.call({
			method:"annual_budget.api.phase_sheet.get_consolidated_report",
			args:{ financial_year:"2025-26", units:"APUMP" },
			callback:r=>{
				expense_heads = r.message || [];
				renderTable();
			}
		});
	}

	/* ===================== RENDER ===================== */
	function renderTable(){

		const $table = $("#phase-table");
		$table.empty();

		const $thead = $("<thead></thead>");
		const $row1 = $('<tr class="main-row"></tr>');
		const $row2 = $('<tr class="month-row"></tr>');
		const $row3 = $('<tr class="budget-row"></tr>');

		// Left fixed headers
		$row1.append('<th rowspan="3">TYPE OF EXPENSE</th>');
		$row1.append('<th rowspan="3">GL Code</th>');

		["q1","q2","q3","q4"].forEach(q=>{
			const expanded = expandedQuarters.includes(q);
			const arrow = expanded ? "▲":"▼";

			// Row 1 : Quarter header
			$row1.append(`
				<th class="expandable"
					colspan="${expanded?6:2}"
					data-q="${q}">
					${quarters[q].label} ${arrow}
				</th>
			`);

			// Row 2 : Month or Budget/Actual
			if(expanded){
				quarters[q].months.forEach(m=>{
					$row2.append(`<th colspan="2">${m}</th>`);
				});
			}else{
				$row2.append(`<th>Budget</th><th>Actual</th>`);
			}

			// Row 3 : Only expanded quarter has Budget/Actual
			if(expanded){
				quarters[q].months.forEach(()=>{
					$row3.append(`<th>Budget</th><th>Actual</th>`);
				});
			}
		});

		$row1.append('<th rowspan="3">Total</th>');

		$thead.append($row1);
		$thead.append($row2);

		if(expandedQuarters.length>0){
			$thead.append($row3);
		}

		$table.append($thead);

		/* ===================== BODY ===================== */
		const $tbody = $("<tbody></tbody>");

		expense_heads.forEach(h=>{
			let tb=0, ta=0;
			const $tr = $('<tr class="expense-head"></tr>');
			$tr.append(`<td>${h.name}</td>`);
			$tr.append(`<td>-</td>`);

			["q1","q2","q3","q4"].forEach(q=>{
				const arr = h[q]||[];

				if(expandedQuarters.includes(q)){
					arr.forEach(v=>{
						$tr.append(`<td>${format(v.budget)}</td><td>${format(v.actual)}</td>`);
						tb+=v.budget||0;
						ta+=v.actual||0;
					});
				}else{
					const b = arr.reduce((s,v)=>s+(v.budget||0),0);
					const a = arr.reduce((s,v)=>s+(v.actual||0),0);
					$tr.append(`<td>${format(b)}</td><td>${format(a)}</td>`);
					tb+=b; ta+=a;
				}
			});

			$tr.append(`<td>B:${format(tb)}<br>A:${format(ta)}</td>`);
			$tbody.append($tr);
		});

		$table.append($tbody);

		/* ===================== EVENTS ===================== */
		$("th.expandable").off().on("click",function(){
			const q=$(this).data("q");
			expandedQuarters = expandedQuarters.includes(q)
				? expandedQuarters.filter(x=>x!==q)
				: [...expandedQuarters,q];
			renderTable();
		});
	}

	loadData();
};

