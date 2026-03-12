// frappe.pages['consolidated-budget'].on_page_load = function(wrapper) {

// 	let page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Consolidated Budget',
// 		single_column: true
// 	});
// 	//!=============================================================== Tab Design code ================================================================
// 	$(page.body).html(`

// 	<style>
// 	.consolidated-budget-wrapper { padding:15px; background:#fff; }
// 	#budgetTab { border-bottom:1px solid #ddd; }
// 	#budgetTab .nav-link { cursor:pointer; margin-right:15px; color:#555; }
// 	#budgetTab .nav-link.active { color:#000; font-weight:600; border-bottom:2px solid #000; }
// 	.tab-pane { display:none; }
// 	.tab-pane.active { display:block; }
// 	</style>

// 	<div class="consolidated-budget-wrapper">

// 		<ul class="nav" id="budgetTab">
// 			<li class="nav-item"><a class="nav-link active" data-tab="ppt">PPT</a></li>
// 			<li class="nav-item"><a class="nav-link" data-tab="summary_inr">Summary in INR</a></li>
// 			<li class="nav-item"><a class="nav-link" data-tab="headcount">Headcount</a></li>
// 			<li class="nav-item"><a class="nav-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>
// 			<li class="nav-item"><a class="nav-link" data-tab="estimate">Estimate Consolidated</a></li>
// 			<li class="nav-item"><a class="nav-link" data-tab="budget_estimate">Budget & Estimate</a></li>
// 		</ul>

// 		<div class="tab-content mt-3">

// 			<div class="tab-pane active" id="ppt"><h4>PPT Content</h4></div>
// 			<div class="tab-pane" id="summary_inr"><h4>Summary in INR Content</h4></div>
// 			<div class="tab-pane" id="headcount"><h4>Headcount Content</h4></div>

// 			<div class="tab-pane" id="annual_budget">
// 				<div id="annual-table-wrapper"></div>
// 			</div>

// <div class="tab-pane" id="estimate">

// <style>

// #estimate-container {
//     margin-top: 10px;
//     background: #fff;
//     border-radius: 8px;
//     padding: 12px;
// }

// /* Controls */
// #estimate-controls {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 8px 12px;
//     margin-bottom: 12px;
//     background: #f7f9fb;
//     border: 1px solid #ddd;
//     border-radius: 6px;
// }

// #estimate-search {
//     max-width: 300px;
//     padding: 7px 12px;
//     border: 1px solid #aaa;
//     border-radius: 6px;
//     font-size: 13px;
// }

// /* Table */
// .estimate-table-wrapper {
//     border: 1px solid #ccc;
//     border-radius: 6px;
//     overflow: auto;
//     max-height: 70vh;
// }

// .estimate-table {
//     width: 100%;
//     min-width: 850px;
//     border-collapse: collapse;
//     font-size: 13px;
// }

// .estimate-table th,
// .estimate-table td {
//     border: 1px solid #ddd;
//     padding: 8px 10px;
//     text-align: center;
//     white-space: nowrap;
// }

// .estimate-table th:first-child,
// .estimate-table td:first-child {
//     text-align: left;
// }

// /* Header */
// .estimate-header th {
//     background-color: #0076B6;
//     color: #fff;
//     font-weight: 700;
//     position: sticky;
//     top: 0;
// }

// /* Parent row */
// .estimate-parent td {
//     background: #E9F4FB;
//     font-weight: 700;
//     color: #003B63;
//     cursor: pointer;
// }

// /* Child row */
// .estimate-child td:first-child {
//     padding-left: 30px;
// }

// .estimate-parent:hover td {
//     background: #dceef9;
// }

// </style>

// <div id="estimate-container">

//     <div id="estimate-controls">
//         <input type="text" id="estimate-search" placeholder="Search expense...">
//     </div>

//     <div class="estimate-table-wrapper">
//         <table class="estimate-table">
//             <thead>
//                 <tr class="estimate-header">
//                     <th>Expense</th>
//                     <th>QTR-1</th>
//                     <th>QTR-2</th>
//                     <th>QTR-3</th>
//                     <th>QTR-4</th>
//                     <th>Year Total</th>
//                 </tr>
//             </thead>
//             <tbody id="estimate-table-body"></tbody>
//         </table>
//     </div>

// </div>

// </div>




// <div class="tab-pane" id="budget_estimate"><h4>Budget & Estimate Content</h4></div>

// 		</div>
// 	</div>
// 	`);
// 	$(document).on("click", "#budgetTab .nav-link", function() {
// 		$("#budgetTab .nav-link").removeClass("active");
// 		$(this).addClass("active");
// 		$(".tab-pane").removeClass("active");
// 		$("#" + $(this).data("tab")).addClass("active");
// 	});

// 	//!=============================================================== Annual Budget Consolidated ================================================================
// 		/* =====================================================
// 		STYLE
// 		===================================================== */

// 		const style = `
// 		<style>

// 		/* Container */
// 		#tables-container { 
// 			margin: 20px; 
// 			background-color: #ffffff; 
// 			border-radius: 8px; 
// 			padding: 8px; 
// 		}

// 		/* Controls */
// 		#controls-row {
// 			display: flex;
// 			justify-content: space-between;
// 			align-items: center;
// 			margin-bottom: 12px;
// 			padding: 6px 10px;
// 			background: #f7f9fb;
// 			border: 1px solid #dcdcdc;
// 			border-radius: 6px;
// 		}

// 		#global-search-box { 
// 			width: 280px; 
// 			padding: 7px 12px; 
// 			border: 1px solid #aaa; 
// 			border-radius: 6px; 
// 			font-size: 13px;
// 		}

// 		#checkbox-area {
// 			display: flex;
// 			gap: 18px;
// 			font-size: 13px;
// 			font-weight: 500;
// 		}

// 		/* Table */
// 		.scroll-wrapper { 
// 			border: 1px solid #ccc; 
// 			border-radius: 6px; 
// 			overflow: auto; 
// 			max-height: 70vh; 
// 			background: #fff; 
// 		}

// 		table.university-table { 
// 			min-width: 1200px; 
// 			width: 100%; 
// 			border-collapse: collapse; 
// 			font-size: 13px; 
// 		}

// 		table.university-table th, 
// 		table.university-table td {
// 			border: 1px solid #ddd;
// 			padding: 8px 10px;
// 			white-space: nowrap;
// 			text-align: center;
// 		}

// 		table.university-table th:first-child,
// 		table.university-table td:first-child { 
// 			text-align: left; 
// 		}

// 		thead .main-row th { 
// 			background-color: #0076B6; 
// 			color: #fff; 
// 			position: sticky; 
// 			top: 0; 
// 			z-index: 25; 
// 		}

// 		thead .sub-row th { 
// 			background-color: #F26B21; 
// 			color: #fff; 
// 			position: sticky; 
// 			top: 34px; 
// 			z-index: 24; 
// 		}

// 		tr.expense-head { font-weight: 700; cursor: pointer; }
// 		tr.sub-head { background:#FFF3E6; font-weight:600; cursor:pointer; }
// 		tr.line-item td:first-child { padding-left: 35px; }

// 		.text-blue { color:#0076B6; font-weight:600; }
// 			/* TABLE */
// 		.table-title {
// 			font-size: 15px;
// 			font-weight: 600;
// 			color: #003B63;
// 			margin-bottom: 12px;
// 		}

// 		</style>
// 		`;

// 		$(style).appendTo(page.body);

// 		/* =====================================================
// 		STATE
// 		===================================================== */

// 		let expense_heads = [];
// 		let expandedHeads = [];
// 		let expandedSubHeads = [];
// 		let expandedQuarters = [];
// 		let annualLoaded = false;

// 		const quarters = {
// 			q1: { label: 'Quarter 1', months: ['April','May','June'] },
// 			q2: { label: 'Quarter 2', months: ['July','August','September'] },
// 			q3: { label: 'Quarter 3', months: ['October','November','December'] },
// 			q4: { label: 'Quarter 4', months: ['January','February','March'] }
// 		};

// 		const sumArray = arr => (arr || []).reduce((a,b)=>a+(b||0),0);
// 		const formatNumber = n => (n || 0).toLocaleString();

// 		/* =====================================================
// 		BUILD UI
// 		===================================================== */

// 		function buildUI(){

// 			const container = $(`
// 				<div id="tables-container">
// 				<h3 class="table-title">	
// 				Annual Budget Consolidated
// 				</h3>
// 					<div id="controls-row">
// 						<input id="global-search-box" type="text"
// 							placeholder="Search Expense / Item / GL Code...">
// 						<div id="checkbox-area">
// 							<label><input type="checkbox" id="expand-quarters"> Expand Quarters</label>
// 							<label><input type="checkbox" id="expand-items"> Expand Line Items</label>
// 						</div>
// 					</div>

// 					<div class="scroll-wrapper">
// 						<table class="university-table" id="phase-table"></table>
// 					</div>
// 				</div>
// 			`);

// 			$("#annual-table-wrapper").empty().append(container);
// 			bindControlEvents();
// 		}

// 		/* =====================================================
// 		CONTROL EVENTS
// 		===================================================== */

// 		function bindControlEvents(){

// 			$('#expand-quarters').on('change', function(){
// 				expandedQuarters = this.checked ? ['q1','q2','q3','q4'] : [];
// 				renderTable($('#global-search-box').val().toLowerCase());
// 			});

// 			$('#expand-items').on('change', function(){

// 				if(this.checked){
// 					expandedHeads = expense_heads.map(h => h.name.trim());
// 					expandedSubHeads = [];

// 					expense_heads.forEach(head=>{
// 						(head.sub_heads || []).forEach(sub=>{
// 							expandedSubHeads.push(head.name.trim()+"__"+sub.name.trim());
// 						});
// 					});

// 				} else {
// 					expandedHeads = [];
// 					expandedSubHeads = [];
// 				}

// 				renderTable($('#global-search-box').val().toLowerCase());
// 			});

// 			$('#global-search-box').on('input', function(){
// 				renderTable($(this).val().toLowerCase());
// 			});
// 		}

// 		/* =====================================================
// 		RENDER TABLE
// 		===================================================== */

// 		function renderTable(searchTerm = ''){

// 			const $table = $('#phase-table');
// 			$table.empty();

// 			expandedHeads = [...new Set(expandedHeads)];
// 			expandedSubHeads = [...new Set(expandedSubHeads)];

// 			const $thead = $('<thead></thead>');
// 			const $mainRow = $('<tr class="main-row"></tr>');

// 			$mainRow.append('<th rowspan="2">Expense Head / Line Item</th>');
// 			$mainRow.append('<th rowspan="2">GL Code</th>');

// 			['q1','q2','q3','q4'].forEach(q=>{
// 				const isExpanded = expandedQuarters.includes(q);
// 				const rowspan = isExpanded ? 1 : 2;
// 				const arrow = isExpanded ? '▲' : '▼';

// 				$mainRow.append(`
// 					<th class="expandable" data-quarter="${q}"
// 						colspan="3" rowspan="${rowspan}">
// 						${quarters[q].label} ${arrow}
// 					</th>
// 				`);
// 			});

// 			$mainRow.append('<th rowspan="2">Total</th>');
// 			$thead.append($mainRow);

// 			if(expandedQuarters.length){
// 				const $subRow = $('<tr class="sub-row"></tr>');
// 				['q1','q2','q3','q4'].forEach(q=>{
// 					if(expandedQuarters.includes(q)){
// 						quarters[q].months.forEach(m=>{
// 							$subRow.append(`<th>${m}</th>`);
// 						});
// 					}
// 				});
// 				$thead.append($subRow);
// 			}

// 			$table.append($thead);
// 			const $tbody = $('<tbody></tbody>');

// 			let grandTotals = {
// 				q1:[0,0,0],
// 				q2:[0,0,0],
// 				q3:[0,0,0],
// 				q4:[0,0,0]
// 			};

// 			expense_heads.forEach(head=>{

// 				const headName = head.name.trim();
// 				const headLower = headName.toLowerCase();

// 				let headMatches = headLower.includes(searchTerm);
// 				let hasMatchingChild = false;

// 				(head.sub_heads || []).forEach(sub=>{
// 					if(sub.name.toLowerCase().includes(searchTerm)){
// 						hasMatchingChild = true;
// 					}

// 					(sub.items || []).forEach(item=>{
// 						if(
// 							item.name.toLowerCase().includes(searchTerm) ||
// 							(item.gl_code && item.gl_code.toLowerCase().includes(searchTerm))
// 						){
// 							hasMatchingChild = true;
// 						}
// 					});
// 				});

// 				(head.items || []).forEach(item=>{
// 					if(
// 						item.name.toLowerCase().includes(searchTerm) ||
// 						(item.gl_code && item.gl_code.toLowerCase().includes(searchTerm))
// 					){
// 						hasMatchingChild = true;
// 					}
// 				});

// 				if(searchTerm && !headMatches && !hasMatchingChild){
// 					return;
// 				}

// 				if(searchTerm){
// 					expandedHeads.push(headName);
// 				}

// 				['q1','q2','q3','q4'].forEach(q=>{
// 					if(head[q]){
// 						head[q].forEach((val,i)=>{
// 							grandTotals[q][i] += (val || 0);
// 						});
// 					}
// 				});

// 				const headTotal = ['q1','q2','q3','q4']
// 					.reduce((sum,q)=>sum+sumArray(head[q]),0);

// 				$tbody.append(`
// 					<tr class="expense-head" data-head="${headName}">
// 						<td>${expandedHeads.includes(headName)?'▼':'▶'} ${headName}</td>
// 						<td>-</td>
// 						${renderQuarterCells(head)}
// 						<td class="text-blue">${formatNumber(headTotal)}</td>
// 					</tr>
// 				`);

// 				if(expandedHeads.includes(headName)){

// 					(head.sub_heads || []).forEach(sub=>{

// 						const subKey = headName+"__"+sub.name.trim();

// 						if(searchTerm){
// 							expandedSubHeads.push(subKey);
// 						}

// 						const subTotal = ['q1','q2','q3','q4']
// 							.reduce((sum,q)=>sum+sumArray(sub[q]),0);

// 						$tbody.append(`
// 							<tr class="sub-head" data-sub="${subKey}">
// 								<td>${expandedSubHeads.includes(subKey)?'▼':'▶'} ${sub.name}</td>
// 								<td>-</td>
// 								${renderQuarterCells(sub)}
// 								<td>${formatNumber(subTotal)}</td>
// 							</tr>
// 						`);

// 						if(expandedSubHeads.includes(subKey)){
// 							(sub.items || []).forEach(item=>{
// 								appendItemRow($tbody,item);
// 							});
// 						}
// 					});

// 					(head.items || []).forEach(item=>{
// 						appendItemRow($tbody,item);
// 					});
// 				}
// 			});

// 			const grandTotalSum = ['q1','q2','q3','q4']
// 				.reduce((sum,q)=>sum+sumArray(grandTotals[q]),0);

// 			$tbody.append(`
// 				<tr style="background:#e8f4fb;font-weight:700;">
// 					<td>GRAND TOTAL</td>
// 					<td>-</td>
// 					${renderQuarterCells(grandTotals)}
// 					<td class="text-blue">${formatNumber(grandTotalSum)}</td>
// 				</tr>
// 			`);

// 			$table.append($tbody);
// 		}

// 		/* =====================================================
// 		HELPERS
// 		===================================================== */

// 		function appendItemRow($tbody,item){

// 			const itemTotal = ['q1','q2','q3','q4']
// 				.reduce((sum,q)=>sum+sumArray(item[q]),0);

// 			$tbody.append(`
// 				<tr class="line-item">
// 					<td>${item.name}</td>
// 					<td>${item.gl_code || '-'}</td>
// 					${renderQuarterCells(item)}
// 					<td>${formatNumber(itemTotal)}</td>
// 				</tr>
// 			`);
// 		}

// 		function renderQuarterCells(obj){
// 			return ['q1','q2','q3','q4'].map(q=>{
// 				const data = obj[q] || [0,0,0];
// 				if(expandedQuarters.includes(q)){
// 					return data.map(v=>`<td>${formatNumber(v)}</td>`).join('');
// 				} else {
// 					return `<td colspan="3">${formatNumber(sumArray(data))}</td>`;
// 				}
// 			}).join('');
// 		}

// 		/* =====================================================
// 		DELEGATED EVENTS
// 		===================================================== */

// 		$(document).on('click','.expandable',function(){
// 			const q=$(this).data('quarter');
// 			expandedQuarters = expandedQuarters.includes(q)
// 				? expandedQuarters.filter(x=>x!==q)
// 				: [...expandedQuarters,q];
// 			renderTable($('#global-search-box').val().toLowerCase());
// 		});

// 		$(document).on('click','.expense-head',function(){
// 			const h=$(this).data('head');
// 			expandedHeads = expandedHeads.includes(h)
// 				? expandedHeads.filter(x=>x!==h)
// 				: [...expandedHeads,h];
// 			renderTable($('#global-search-box').val().toLowerCase());
// 		});

// 		$(document).on('click','.sub-head',function(){
// 			const s=$(this).data('sub');
// 			expandedSubHeads = expandedSubHeads.includes(s)
// 				? expandedSubHeads.filter(x=>x!==s)
// 				: [...expandedSubHeads,s];
// 			renderTable($('#global-search-box').val().toLowerCase());
// 		});

// 		/* =====================================================
// 		LOAD DATA
// 		===================================================== */

// 		function loadData(){

// 			buildUI();

// 			frappe.call({
// 				method:"annual_budget.api.phase_sheet.get_consolidated_report",
// 				args:{financial_year: "2025-26"},
// 				callback:function(r){
// 					expense_heads = r.message || [];
// 					renderTable();
// 				}
// 			});
// 		}

// 		$(document).on("click","[data-tab='annual_budget']",function(){
// 			if(!annualLoaded){
// 				annualLoaded=true;
// 				loadData();
// 			}
// 		});


// //!=============================================================== Estimate Consolidated ================================================================
// 		let estimateLoaded = false;

// 		$(document).on("click", "[data-tab='estimate']", function () {
// 			if (!estimateLoaded) {
// 				estimateLoaded = true;
// 				loadEstimateData();
// 			}
// 		});

// 		function loadEstimateData() {

// 			frappe.call({
// 				method: "annual_budget.api.actuals.get_grouped_actuals_detailed_gl_test",
// 				args: {
// 					fiscal_year: "2025",
// 					accounting_period: "12"
// 				},
// 				freeze: true,
// 				freeze_message: "Loading Estimate...",
// 				callback: function (r) {

// 					if (r.message && r.message.status === "success") {
// 						renderEstimateTable(r.message.data);
// 					} else {
// 						frappe.msgprint("Failed to load Estimate data");
// 					}
// 				},
// 				error: function () {
// 					frappe.msgprint("Server error occurred");
// 				}
// 			});
// 		}
// 		// 1️⃣ Formatter
// 		// ===============================
// 		// 1️⃣ Indian Currency Formatter
// 		// ===============================
// 		function formatEstimateNumber(value) {

// 			const number = parseFloat(value || 0);

// 			return "₹ " + number.toLocaleString("en-IN", {
// 				minimumFractionDigits: 2,
// 				maximumFractionDigits: 2
// 			});
// 		}


// 		// ===============================
// 		// 2️⃣ Render Table
// 		// ===============================
// 		function renderEstimateTable(data) {

// 			const tbody = $("#estimate-table-body");
// 			tbody.empty();

// 			if (!Array.isArray(data) || data.length === 0) {

// 				tbody.append(`
// 					<tr>
// 						<td colspan="6" style="text-align:center;font-weight:600;">
// 							No Data Available
// 						</td>
// 					</tr>
// 				`);

// 				return;
// 			}

// 			let grandQ1 = 0;
// 			let grandQ2 = 0;
// 			let grandQ3 = 0;
// 			let grandQ4 = 0;

// 			data.forEach((head, hIndex) => {

// 				const headQ1 = parseFloat(head.Q1 || 0);
// 				const headQ2 = parseFloat(head.Q2 || 0);
// 				const headQ3 = parseFloat(head.Q3 || 0);
// 				const headQ4 = parseFloat(head.Q4 || 0);

// 				const headTotal = headQ1 + headQ2 + headQ3 + headQ4;

// 				grandQ1 += headQ1;
// 				grandQ2 += headQ2;
// 				grandQ3 += headQ3;
// 				grandQ4 += headQ4;

// 				// 🔵 HEAD ROW
// 				tbody.append(`
// 					<tr class="estimate-head" data-head="${hIndex}" 
// 						style="font-weight:700;background:#f2f2f2;cursor:pointer;">
// 						<td class="toggle-icon">▶ ${head.name}</td>
// 						<td>${formatEstimateNumber(headQ1)}</td>
// 						<td>${formatEstimateNumber(headQ2)}</td>
// 						<td>${formatEstimateNumber(headQ3)}</td>
// 						<td>${formatEstimateNumber(headQ4)}</td>
// 						<td>${formatEstimateNumber(headTotal)}</td>
// 					</tr>
// 				`);

// 				// ================= CAPITAL =================
// 				if (Array.isArray(head.items) && head.items.length) {

// 					head.items.forEach(item => {

// 						const itemQ1 = parseFloat(item.Q1 || 0);
// 						const itemQ2 = parseFloat(item.Q2 || 0);
// 						const itemQ3 = parseFloat(item.Q3 || 0);
// 						const itemQ4 = parseFloat(item.Q4 || 0);

// 						const itemTotal = itemQ1 + itemQ2 + itemQ3 + itemQ4;

// 						tbody.append(`
// 							<tr class="head-child head-child-${hIndex}" style="display:none;">
// 								<td style="padding-left:30px;">
// 									${item.name} (${item.gl_code || ""})
// 								</td>
// 								<td>${formatEstimateNumber(itemQ1)}</td>
// 								<td>${formatEstimateNumber(itemQ2)}</td>
// 								<td>${formatEstimateNumber(itemQ3)}</td>
// 								<td>${formatEstimateNumber(itemQ4)}</td>
// 								<td>${formatEstimateNumber(itemTotal)}</td>
// 							</tr>
// 						`);
// 					});
// 				}

// 				// ================= OPERATING =================
// 				if (Array.isArray(head.sub_heads) && head.sub_heads.length) {

// 					head.sub_heads.forEach((sub, sIndex) => {

// 						const subKey = `${hIndex}-${sIndex}`;

// 						const subQ1 = parseFloat(sub.Q1 || 0);
// 						const subQ2 = parseFloat(sub.Q2 || 0);
// 						const subQ3 = parseFloat(sub.Q3 || 0);
// 						const subQ4 = parseFloat(sub.Q4 || 0);

// 						const subTotal = subQ1 + subQ2 + subQ3 + subQ4;

// 						tbody.append(`
// 							<tr class="estimate-sub head-child-${hIndex}" 
// 								data-sub="${subKey}"
// 								style="display:none;font-weight:600;cursor:pointer;">
// 								<td class="toggle-icon" style="padding-left:20px;">
// 									▶ ${sub.name}
// 								</td>
// 								<td>${formatEstimateNumber(subQ1)}</td>
// 								<td>${formatEstimateNumber(subQ2)}</td>
// 								<td>${formatEstimateNumber(subQ3)}</td>
// 								<td>${formatEstimateNumber(subQ4)}</td>
// 								<td>${formatEstimateNumber(subTotal)}</td>
// 							</tr>
// 						`);

// 						if (Array.isArray(sub.items) && sub.items.length) {

// 							sub.items.forEach(item => {

// 								const itemQ1 = parseFloat(item.Q1 || 0);
// 								const itemQ2 = parseFloat(item.Q2 || 0);
// 								const itemQ3 = parseFloat(item.Q3 || 0);
// 								const itemQ4 = parseFloat(item.Q4 || 0);

// 								const itemTotal = itemQ1 + itemQ2 + itemQ3 + itemQ4;

// 								tbody.append(`
// 									<tr class="sub-child sub-child-${subKey}" style="display:none;">
// 										<td style="padding-left:40px;">
// 											${item.name} (${item.gl_code || ""})
// 										</td>
// 										<td>${formatEstimateNumber(itemQ1)}</td>
// 										<td>${formatEstimateNumber(itemQ2)}</td>
// 										<td>${formatEstimateNumber(itemQ3)}</td>
// 										<td>${formatEstimateNumber(itemQ4)}</td>
// 										<td>${formatEstimateNumber(itemTotal)}</td>
// 									</tr>
// 								`);
// 							});
// 						}

// 					});
// 				}

// 			});

// 			// ================= GRAND TOTAL =================
// 			const grandTotal = grandQ1 + grandQ2 + grandQ3 + grandQ4;

// 			tbody.append(`
// 				<tr style="font-weight:800;background:#0076B6;color:white;border-top:2px solid #000;">
// 					<td>GRAND TOTAL</td>
// 					<td>${formatEstimateNumber(grandQ1)}</td>
// 					<td>${formatEstimateNumber(grandQ2)}</td>
// 					<td>${formatEstimateNumber(grandQ3)}</td>
// 					<td>${formatEstimateNumber(grandQ4)}</td>
// 					<td>${formatEstimateNumber(grandTotal)}</td>
// 				</tr>
// 			`);
// 		}
// 		// ===============================
// 		// HEAD Expand / Collapse
// 		// ===============================
// 		$(document).on("click", ".estimate-head", function () {

// 			const headIndex = $(this).data("head");
// 			const children = $(`.head-child-${headIndex}`);
// 			const iconCell = $(this).find(".toggle-icon");

// 			children.slideToggle(150);

// 			// Extract clean text safely
// 			let text = iconCell.text().replace("▶ ", "").replace("▼ ", "");

// 			if (children.is(":visible")) {
// 				iconCell.text("▼ " + text);
// 			} else {
// 				iconCell.text("▶ " + text);

// 				// Collapse all sub children
// 				$(`.sub-child-${headIndex}`).hide();
// 				$(this).siblings(".estimate-sub").find(".toggle-icon").each(function () {
// 					let t = $(this).text().replace("▶ ", "").replace("▼ ", "");
// 					$(this).text("▶ " + t);
// 				});
// 			}
// 		});


// 		// ===============================
// 		// SUB Expand / Collapse
// 		// ===============================
// 		$(document).on("click", ".estimate-sub", function (e) {

// 			e.stopPropagation();

// 			const subKey = $(this).data("sub");
// 			const children = $(`.sub-child-${subKey}`);
// 			const iconCell = $(this).find(".toggle-icon");

// 			children.slideToggle(150);

// 			let text = iconCell.text().replace("▶ ", "").replace("▼ ", "");

// 			if (children.is(":visible")) {
// 				iconCell.text("▼ " + text);
// 			} else {
// 				iconCell.text("▶ " + text);
// 			}
// 		});
// };


// frappe.pages['consolidated-budget'].on_page_load = function (wrapper) {

// 	// =============================================================================
// 	// PAGE SETUP
// 	// =============================================================================

// 	var page = frappe.ui.make_app_page({
// 		parent       : wrapper,
// 		title        : 'Foundation - Consolidated Budget - 2025-26',
// 		single_column: true
// 	});

// 	function updatePageTitle(financialYear) {
// 		var titleText = 'Foundation - Consolidated Budget - ' + financialYear;
// 		page.set_title(titleText);
// 		setTimeout(function () {
// 			$(wrapper).find('.page-head h3').hide();
// 			$(wrapper).find('.page-head .title-text')
// 				.css({ 'font-size': '18px', 'font-weight': '700', 'color': '#1a1a1a' });
// 		}, 100);
// 	}

// 	// =============================================================================
// 	// GLOBAL LOADER
// 	// =============================================================================

// 	if ($("#global-loader").length === 0) {
// 		$("body").append(
// 			'<div id="global-loader" class="loader-overlay">' +
// 				'<div class="loader-box">' +
// 					'<img src="/files/APF logo.png" class="loader-logo" alt="Loading">' +
// 					'<div class="loader-text">Loading, please wait</div>' +
// 				'</div>' +
// 			'</div>'
// 		);
// 	}

// 	$("#global-loader").hide();

// 	var Loader = {
// 		show: function (message) {
// 			var msg     = (typeof message === 'string' && message.length > 0) ? message : 'Loading, please wait';
// 			var $loader = $("#global-loader");
// 			if (!$loader.length) { return; }
// 			$loader.find(".loader-text").text(msg);
// 			$loader.css("display", "flex").hide().fadeIn(200);
// 		},
// 		hide: function () {
// 			var $loader = $("#global-loader");
// 			if (!$loader.length) { return; }
// 			$loader.fadeOut(200);
// 		}
// 	};

// 	// =============================================================================
// 	// GLOBAL STYLES
// 	// =============================================================================

// 	$(page.body).append(
// 		'<style>' +
// 		':root {' +
// 			'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 			'--orange:#F26B21;--orange-light:#FFF3E6;--text-mid:#444;' +
// 			'--border-color:#ddd;--bg-white:#fff;' +
// 		'}' +
// 		'.cb-wrapper{padding:15px;background:#fff;}' +
// 		'#cb-tab-nav{border-bottom:1px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:8px 20px;color:#555;font-size:13px;font-weight:400;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-1px;text-decoration:none;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:#000;font-weight:700;border-bottom:3px solid #000;}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +
// 		'.cb-filter-row{padding:10px 0;background:#fff;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row{padding:10px;}.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +
// 		'.cb-controls{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;margin-bottom:12px;background:#f7f9fb;border:1px solid #ddd;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
// 		'.cb-search-input{padding:7px 12px;border:1px solid #aaa;border-radius:6px;font-size:13px;width:280px;}' +
// 		'.cb-checkbox-area{display:flex;gap:18px;font-size:13px;font-weight:500;color:#444;}' +
// 		'.cb-checkbox-area label{display:flex;align-items:center;gap:5px;cursor:pointer;}' +
// 		'.cb-scroll-wrapper{border:1px solid #ddd;border-radius:6px;overflow:auto;max-height:70vh;background:#fff;}' +
// 		'.cb-table{min-width:900px;width:100%;border-collapse:collapse;font-size:13px;}' +
// 		'.cb-table th,.cb-table td{border:1px solid #ddd;padding:8px 10px;white-space:nowrap;text-align:right;}' +
// 		'.cb-table th:first-child,.cb-table td:first-child{text-align:left;}' +
// 		'.cb-table th:nth-child(2),.cb-table td:nth-child(2){text-align:center;}' +
// 		'.cb-thead-main th{background:#0076B6;color:#fff;font-weight:700;position:sticky;top:0;z-index:25;text-align:center;}' +
// 		'.cb-thead-sub th{background:#F26B21;color:#fff;font-weight:600;position:sticky;top:34px;z-index:24;text-align:center;}' +
// 		'.cb-row-head{font-weight:700;cursor:pointer;background:#E9F4FB;color:#003B63;}' +
// 		'.cb-row-head:hover td{background:#dceef9;}' +
// 		'.cb-row-sub{background:#FFF3E6;font-weight:600;cursor:pointer;}' +
// 		'.cb-row-sub:hover td{background:#ffe8d4;}' +
// 		'.cb-row-item td:first-child{padding-left:35px;}' +
// 		'.cb-row-sub-item td:first-child{padding-left:50px;}' +
// 		'.cb-row-grand{background:#0076B6;color:#fff;font-weight:800;border-top:2px solid #003B63;}' +
// 		'.cb-row-grand td{color:#fff;}' +
// 		'.cb-text-accent{color:#0076B6;font-weight:600;}' +
// 		'#global-loader.loader-overlay{position:fixed;top:0;left:0;right:0;bottom:0;width:100vw;height:100vh;background:rgba(18,18,18,.92);backdrop-filter:blur(6px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
// 		'.loader-box{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;}' +
// 		'.loader-logo{width:90px;height:90px;border-radius:50%;background:linear-gradient(145deg,#fff,#eaeaea);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.35),0 0 0 4px rgba(255,255,255,.08);animation:loader-pulse 1.6s infinite ease-in-out;}' +
// 		'.loader-text{margin-top:6px;font-size:14px;color:#fff;font-weight:600;letter-spacing:.5px;text-align:center;opacity:.85;}' +
// 		'.loader-text::after{content:"";display:inline-block;width:1em;animation:loader-dots 1.5s infinite;}' +
// 		'@keyframes loader-pulse{0%{transform:scale(1);opacity:.8;box-shadow:0 0 0 0 rgba(255,255,255,.3);}50%{transform:scale(1.08);opacity:1;box-shadow:0 0 20px 8px rgba(255,255,255,.15);}100%{transform:scale(1);opacity:.8;box-shadow:0 0 0 0 rgba(255,255,255,.3);}}' +
// 		'@keyframes loader-dots{0%{content:"";}33%{content:".";}66%{content:"..";}100%{content:"...";}}' +
// 		'</style>'
// 	);

// 	// =============================================================================
// 	// NUMBER FORMATTER
// 	// =============================================================================

// 	function formatINR(rawValue) {
// 		var n = parseFloat(rawValue);
// 		if (isNaN(n)) { n = 0; }
// 		return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// 	}

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================

// 	$(page.body).append(
// 		'<div class="cb-wrapper">' +
// 			'<div class="frappe-control-group row cb-filter-row" id="cb-filter-row"></div>' +
// 			'<ul id="cb-tab-nav">' +
// 				'<li><a class="cb-tab-link active" data-tab="ppt">PPT</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="summary_inr">Summary in INR</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="headcount">Headcount</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="estimate">Estimate Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="budget_estimate">Budget &amp; Estimate</a></li>' +
// 			'</ul>' +
// 			'<div id="cb-tab-content">' +
// 				'<div class="cb-tab-pane active" id="tab-ppt"></div>' +
// 				'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
// 				'<div class="cb-tab-pane" id="tab-headcount"></div>' +

// 				'<div class="cb-tab-pane" id="tab-annual_budget">' +
// 					'<div class="cb-controls" id="annual-controls">' +
// 						'<input type="text" id="annual-search" class="cb-search-input" placeholder="Search Expense / Item / GL Code...">' +
// 						'<div class="cb-checkbox-area">' +
// 							'<label><input type="checkbox" id="annual-expand-quarters"> Expand Quarters</label>' +
// 							'<label><input type="checkbox" id="annual-expand-items"> Expand Line Items</label>' +
// 						'</div>' +
// 					'</div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				'<div class="cb-tab-pane" id="tab-estimate">' +
// 					'<div class="cb-controls" id="estimate-controls">' +
// 						'<input type="text" id="estimate-search" class="cb-search-input" placeholder="Search expense...">' +
// 					'</div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="estimate-table">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th>Expense</th><th>QTR-1</th><th>QTR-2</th><th>QTR-3</th><th>QTR-4</th><th>Year Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="estimate-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 				'</div>' +

// 				'<div class="cb-tab-pane" id="tab-budget_estimate"></div>' +
// 			'</div>' +
// 		'</div>'
// 	);

// 	// =============================================================================
// 	// FINANCIAL YEAR FILTER
// 	// =============================================================================

// 	var $fyColumn = $('<div class="col-md-3 col-sm-12"></div>').appendTo('#cb-filter-row');

// 	var fyControl = frappe.ui.form.make_control({
// 		parent: $fyColumn,
// 		df: {
// 			label    : 'Financial Year',
// 			fieldtype: 'Select',
// 			fieldname: 'financial_year',
// 			reqd     : 1,
// 			change   : function () {
// 				var selectedYear = this.get_value();
// 				if (!selectedYear) { return; }
// 				updatePageTitle(selectedYear);
// 				TabLoader.resetAll();
// 				var activeTab = $('#cb-tab-nav .cb-tab-link.active').data('tab');
// 				if (activeTab) { TabLoader.trigger(activeTab); }
// 			}
// 		},
// 		render_input: true
// 	});

// 	fyControl.refresh();

// 	frappe.call({
// 		method: 'frappe.client.get_list',
// 		args  : { doctype: 'Financial Year List', fields: ['name'], order_by: 'name desc', limit_page_length: 100 },
// 		callback: function (r) {
// 			if (r.message && r.message.length > 0) {
// 				var names = r.message.map(function (x) { return x.name; });
// 				fyControl.df.options = names.join('\n');
// 				fyControl.refresh();
// 				fyControl.set_value(names[0]);
// 				updatePageTitle(names[0]);
// 			}
// 		}
// 	});

// 	// =============================================================================
// 	// TAB SWITCHING
// 	// =============================================================================

// 	$(document).on('click', '#cb-tab-nav .cb-tab-link', function () {
// 		var tab = $(this).data('tab');
// 		$('#cb-tab-nav .cb-tab-link').removeClass('active');
// 		$('.cb-tab-pane').removeClass('active');
// 		$(this).addClass('active');
// 		$('#tab-' + tab).addClass('active');
// 		TabLoader.trigger(tab);
// 	});

// 	// =============================================================================
// 	// TAB LOADER  —  skips API if same FY already loaded
// 	// =============================================================================

// 	var TabLoader = (function () {

// 		var loadedFY    = {};   // { annual_budget: '2025-26', estimate: '2025-26' }
// 		var initDone    = {};   // { annual_budget: true }

// 		var handlers = {
// 			annual_budget: function (fy) { Annual.load(fy);   },
// 			estimate     : function (fy) { Estimate.load(fy); }
// 		};

// 		function trigger(tabName) {
// 			if (!handlers[tabName]) { return; }
// 			var fy = fyControl.get_value() || '2025-26';
// 			if (loadedFY[tabName] === fy) { return; }   // Already loaded — skip
// 			loadedFY[tabName] = fy;                      // Mark before async call
// 			handlers[tabName](fy);
// 		}

// 		function resetAll() {
// 			loadedFY = {};
// 			initDone = {};
// 		}

// 		function markInit(tab)   { initDone[tab] = true; }
// 		function isInit(tab)     { return initDone[tab] === true; }

// 		return { trigger: trigger, resetAll: resetAll, markInit: markInit, isInit: isInit };

// 	})();


// 	var Annual = (function () {

// 		var Q_DEFS = {
// 			q1: { label: 'Quarter 1', months: ['April',   'May',      'June']      },
// 			q2: { label: 'Quarter 2', months: ['July',    'August',   'September'] },
// 			q3: { label: 'Quarter 3', months: ['October', 'November', 'December']  },
// 			q4: { label: 'Quarter 4', months: ['January', 'February', 'March']     }
// 		};
// 		var Q_KEYS = ['q1', 'q2', 'q3', 'q4'];

// 		var data             = [];   // raw API response
// 		var expandedQuarters = [];   // e.g. ['q1', 'q3']
// 		var openHeads        = {};   // { '0': true, '2': true }
// 		var openSubs         = {};   // { '0-1': true }

// 		// ── Helpers ──────────────────────────────────────────────────────────────

// 		function sumArr(arr) {
// 			var t = 0;
// 			(arr || []).forEach(function (v) { t += (v || 0); });
// 			return t;
// 		}

// 		function objTotal(obj) {
// 			var t = 0;
// 			Q_KEYS.forEach(function (k) { t += sumArr(obj[k]); });
// 			return t;
// 		}

// 		function qCells(obj) {
// 			var html = '';
// 			Q_KEYS.forEach(function (k) {
// 				var vals   = obj[k] || [0, 0, 0];
// 				var isOpen = expandedQuarters.indexOf(k) !== -1;
// 				if (isOpen) {
// 					vals.forEach(function (v) { html += '<td>' + formatINR(v) + '</td>'; });
// 				} else {
// 					html += '<td colspan="3">' + formatINR(sumArr(vals)) + '</td>';
// 				}
// 			});
// 			return html;
// 		}

// 		// ── Header ───────────────────────────────────────────────────────────────

// 		function buildHeader() {
// 			var $thead = $('#annual-table thead').empty();
// 			var $main  = $('<tr class="cb-thead-main"></tr>');

// 			$main.append('<th rowspan="2">Expense Head / Line Item</th>');
// 			$main.append('<th rowspan="2">GL Code</th>');

// 			Q_KEYS.forEach(function (k) {
// 				var isOpen  = expandedQuarters.indexOf(k) !== -1;
// 				var rowspan = isOpen ? 1 : 2;
// 				$main.append(
// 					'<th class="cb-q-header" data-quarter="' + k + '"' +
// 					' colspan="3" rowspan="' + rowspan + '" style="cursor:pointer;">' +
// 					Q_DEFS[k].label + ' ' + (isOpen ? '▲' : '▼') + '</th>'
// 				);
// 			});

// 			$main.append('<th rowspan="2">Total</th>');
// 			$thead.append($main);

// 			if (expandedQuarters.length > 0) {
// 				var $sub = $('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function (k) {
// 					if (expandedQuarters.indexOf(k) !== -1) {
// 						Q_DEFS[k].months.forEach(function (m) { $sub.append('<th>' + m + '</th>'); });
// 					}
// 				});
// 				$thead.append($sub);
// 			}
// 		}

// 		// ── Full render (data + quarter column changes + search) ─────────────────

// 		function renderTable() {
// 			buildHeader();

// 			var $tbody     = $('#annual-table tbody').empty();
// 			var searchTerm = $('#annual-search').val().trim().toLowerCase();
// 			var grand      = { q1:[0,0,0], q2:[0,0,0], q3:[0,0,0], q4:[0,0,0] };

// 			data.forEach(function (head, hi) {
// 				if (searchTerm && !matchesSearch(head, searchTerm)) { return; }

// 				var hiStr = String(hi);

// 				// Accumulate grand totals
// 				Q_KEYS.forEach(function (k) {
// 					(head[k] || [0,0,0]).forEach(function (v, mi) { grand[k][mi] += (v || 0); });
// 				});

// 				var headOpen  = openHeads[hiStr] === true;
// 				var headArrow = headOpen ? '▼' : '▶';

// 				// Head row — always visible
// 				$tbody.append(
// 					'<tr class="cb-row-head cb-annual-head" data-hi="' + hiStr + '">' +
// 						'<td><span class="cb-arrow">' + headArrow + '</span> ' + head.name.trim() + '</td>' +
// 						'<td>-</td>' +
// 						qCells(head) +
// 						'<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td>' +
// 					'</tr>'
// 				);

// 				// Sub-heads
// 				(head.sub_heads || []).forEach(function (sub, si) {
// 					var subKey   = hiStr + '-' + si;
// 					var subOpen  = openSubs[subKey] === true;
// 					var subArrow = subOpen ? '▼' : '▶';
// 					var subStyle = headOpen ? '' : 'display:none;';

// 					$tbody.append(
// 						'<tr class="cb-row-sub cb-annual-sub" data-hi="' + hiStr + '" data-si="' + si + '" style="' + subStyle + '">' +
// 							'<td style="padding-left:20px;"><span class="cb-arrow">' + subArrow + '</span> ' + sub.name + '</td>' +
// 							'<td>-</td>' +
// 							qCells(sub) +
// 							'<td>' + formatINR(objTotal(sub)) + '</td>' +
// 						'</tr>'
// 					);

// 					// Sub items
// 					var itemStyle = (headOpen && subOpen) ? '' : 'display:none;';
// 					(sub.items || []).forEach(function (item) {
// 						$tbody.append(
// 							'<tr class="cb-annual-sub-item" data-hi="' + hiStr + '" data-si="' + si + '" style="' + itemStyle + '">' +
// 								'<td style="padding-left:40px;">' + item.name + '</td>' +
// 								'<td>' + (item.gl_code || '-') + '</td>' +
// 								qCells(item) +
// 								'<td>' + formatINR(objTotal(item)) + '</td>' +
// 							'</tr>'
// 						);
// 					});
// 				});

// 				// Direct items under head
// 				var directStyle = headOpen ? '' : 'display:none;';
// 				(head.items || []).forEach(function (ditem) {
// 					$tbody.append(
// 						'<tr class="cb-annual-head-item" data-hi="' + hiStr + '" style="' + directStyle + '">' +
// 							'<td style="padding-left:35px;">' + ditem.name + '</td>' +
// 							'<td>' + (ditem.gl_code || '-') + '</td>' +
// 							qCells(ditem) +
// 							'<td>' + formatINR(objTotal(ditem)) + '</td>' +
// 						'</tr>'
// 					);
// 				});
// 			});

// 			// Grand total row
// 			var grandTotal = 0;
// 			Q_KEYS.forEach(function (k) { grandTotal += sumArr(grand[k]); });
// 			$tbody.append(
// 				'<tr class="cb-row-grand"><td>GRAND TOTAL</td><td>-</td>' +
// 				qCells(grand) +
// 				'<td>' + formatINR(grandTotal) + '</td></tr>'
// 			);
// 		}

// 		// ── Toggle helpers — pure show/hide, NO renderTable call ─────────────────

// 		function toggleHead(hiStr) {
// 			var nowOpen = !openHeads[hiStr];
// 			openHeads[hiStr] = nowOpen;

// 			var $headRow = $('#annual-table tbody .cb-annual-head[data-hi="' + hiStr + '"]');
// 			$headRow.find('.cb-arrow').text(nowOpen ? '▼' : '▶');

// 			if (nowOpen) {
// 				// Show sub-heads and direct items
// 				$('#annual-table tbody .cb-annual-sub[data-hi="' + hiStr + '"]').show();
// 				$('#annual-table tbody .cb-annual-head-item[data-hi="' + hiStr + '"]').show();

// 				// For any sub that was already marked open, re-show its items too
// 				$('#annual-table tbody .cb-annual-sub[data-hi="' + hiStr + '"]').each(function () {
// 					var si     = $(this).attr('data-si');
// 					var subKey = hiStr + '-' + si;
// 					if (openSubs[subKey]) {
// 						$('#annual-table tbody .cb-annual-sub-item[data-hi="' + hiStr + '"][data-si="' + si + '"]').show();
// 					}
// 				});

// 			} else {
// 				// Collapse: hide sub-heads, their items, direct items
// 				// Also reset sub open state and arrows
// 				$('#annual-table tbody .cb-annual-sub[data-hi="' + hiStr + '"]').each(function () {
// 					var si     = $(this).attr('data-si');
// 					var subKey = hiStr + '-' + si;
// 					openSubs[subKey] = false;
// 					$(this).find('.cb-arrow').text('▶');
// 				});
// 				$('#annual-table tbody .cb-annual-sub[data-hi="' + hiStr + '"]').hide();
// 				$('#annual-table tbody .cb-annual-sub-item[data-hi="' + hiStr + '"]').hide();
// 				$('#annual-table tbody .cb-annual-head-item[data-hi="' + hiStr + '"]').hide();
// 			}
// 		}

// 		function toggleSub(hiStr, siStr) {
// 			var subKey = hiStr + '-' + siStr;
// 			var nowOpen = !openSubs[subKey];
// 			openSubs[subKey] = nowOpen;

// 			var $subRow = $('#annual-table tbody .cb-annual-sub[data-hi="' + hiStr + '"][data-si="' + siStr + '"]');
// 			$subRow.find('.cb-arrow').text(nowOpen ? '▼' : '▶');

// 			var $items = $('#annual-table tbody .cb-annual-sub-item[data-hi="' + hiStr + '"][data-si="' + siStr + '"]');
// 			if (nowOpen) {
// 				$items.show();
// 			} else {
// 				$items.hide();
// 			}
// 		}

// 		// ── Search match ─────────────────────────────────────────────────────────

// 		function matchesSearch(head, term) {
// 			if (!term) { return true; }
// 			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
// 			var subs = head.sub_heads || [];
// 			for (var si = 0; si < subs.length; si++) {
// 				if (subs[si].name.toLowerCase().indexOf(term) !== -1) { return true; }
// 				var items = subs[si].items || [];
// 				for (var sii = 0; sii < items.length; sii++) {
// 					if ((items[sii].name || '').toLowerCase().indexOf(term) !== -1) { return true; }
// 					if ((items[sii].gl_code || '').toLowerCase().indexOf(term) !== -1) { return true; }
// 				}
// 			}
// 			var di = head.items || [];
// 			for (var d = 0; d < di.length; d++) {
// 				if ((di[d].name || '').toLowerCase().indexOf(term) !== -1) { return true; }
// 				if ((di[d].gl_code || '').toLowerCase().indexOf(term) !== -1) { return true; }
// 			}
// 			return false;
// 		}

// 		// ── Event binding — called once only ─────────────────────────────────────

// 		function bindEvents() {

// 			// Search — full re-render needed (rows shown/hidden by match)
// 			$(document).on('input', '#annual-search', function () {
// 				renderTable();
// 			});

// 			// Expand Quarters checkbox — full re-render (column structure changes)
// 			$(document).on('change', '#annual-expand-quarters', function () {
// 				expandedQuarters = this.checked ? Q_KEYS.slice() : [];
// 				renderTable();
// 			});

// 			// Expand Line Items — full re-render so all rows appear with correct state
// 			$(document).on('change', '#annual-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function (head, hi) {
// 						openHeads[String(hi)] = true;
// 						(head.sub_heads || []).forEach(function (_, si) {
// 							openSubs[hi + '-' + si] = true;
// 						});
// 					});
// 				} else {
// 					openHeads = {};
// 					openSubs  = {};
// 				}
// 				renderTable();
// 			});

// 			// Quarter header click — full re-render (column count changes)
// 			$(document).on('click', '#annual-table .cb-q-header', function () {
// 				var k   = String($(this).attr('data-quarter'));
// 				var idx = expandedQuarters.indexOf(k);
// 				if (idx !== -1) { expandedQuarters.splice(idx, 1); }
// 				else            { expandedQuarters.push(k); }
// 				renderTable();
// 			});

// 			// ── Head row click — PURE SHOW/HIDE, no renderTable ──────────────────
// 			// Use the table's tbody as the delegation context so the event is
// 			// intercepted before it can bubble further up to document-level handlers.
// 			$('#tab-annual_budget').on('click', '.cb-annual-head', function (e) {
// 				e.stopPropagation();
// 				toggleHead(String($(this).attr('data-hi')));
// 			});

// 			// ── Sub-head row click — PURE SHOW/HIDE, no renderTable ──────────────
// 			$('#tab-annual_budget').on('click', '.cb-annual-sub', function (e) {
// 				e.stopPropagation();   // stop bubbling to head row handler above
// 				toggleSub(
// 					String($(this).attr('data-hi')),
// 					String($(this).attr('data-si'))
// 				);
// 			});
// 		}

// 		// ── Data fetch ───────────────────────────────────────────────────────────

// 		function fetchAndRender(fy) {
// 			// Reset all state for fresh data
// 			data             = [];
// 			openHeads        = {};
// 			openSubs         = {};
// 			expandedQuarters = [];
// 			$('#annual-expand-quarters').prop('checked', false);
// 			$('#annual-expand-items').prop('checked', false);

// 			Loader.show('Loading Annual Budget...');
// 			frappe.call({
// 				method  : 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args    : { financial_year: fy },
// 				callback: function (r) {
// 					data = r.message || [];
// 					renderTable();
// 					Loader.hide();
// 				},
// 				error: function () {
// 					Loader.hide();
// 					frappe.msgprint('Error loading Annual Budget data. Please try again.');
// 				}
// 			});
// 		}

// 		// ── Public entry point ────────────────────────────────────────────────────

// 		function load(fy) {
// 			if (!TabLoader.isInit('annual_budget')) {
// 				bindEvents();
// 				TabLoader.markInit('annual_budget');
// 			}
// 			fetchAndRender(fy);
// 		}

// 		return { load: load };

// 	})();

// 	function loadAnnualBudget(fy) { Annual.load(fy); }

	
// 	var Estimate = (function () {

// 		var eventsBound = false;

// 		function qVals(obj) {
// 			return [
// 				parseFloat(obj['Q1'] || 0),
// 				parseFloat(obj['Q2'] || 0),
// 				parseFloat(obj['Q3'] || 0),
// 				parseFloat(obj['Q4'] || 0)
// 			];
// 		}

// 		function setArrow($cell, open) {
// 			var text = $cell.text().replace('▶ ', '').replace('▼ ', '');
// 			$cell.text((open ? '▼ ' : '▶ ') + text);
// 		}

// 		function headRow(hi, head, v) {
// 			return '<tr class="cb-row-head cb-est-head" data-head="' + hi + '" style="cursor:pointer;">' +
// 				'<td class="cb-toggle">▶ ' + head.name + '</td>' +
// 				'<td>' + formatINR(v[0]) + '</td><td>' + formatINR(v[1]) + '</td>' +
// 				'<td>' + formatINR(v[2]) + '</td><td>' + formatINR(v[3]) + '</td>' +
// 				'<td class="cb-text-accent">' + formatINR(v[0]+v[1]+v[2]+v[3]) + '</td></tr>';
// 		}

// 		function subRow(hi, si, sub, v) {
// 			var key = hi + '-' + si;
// 			return '<tr class="cb-row-sub cb-est-sub cb-head-child-' + hi + '"' +
// 				' data-sub="' + key + '" style="display:none;cursor:pointer;">' +
// 				'<td class="cb-toggle" style="padding-left:20px;">▶ ' + sub.name + '</td>' +
// 				'<td>' + formatINR(v[0]) + '</td><td>' + formatINR(v[1]) + '</td>' +
// 				'<td>' + formatINR(v[2]) + '</td><td>' + formatINR(v[3]) + '</td>' +
// 				'<td>' + formatINR(v[0]+v[1]+v[2]+v[3]) + '</td></tr>';
// 		}

// 		function directItemRow(hi, item) {
// 			var v = qVals(item);
// 			return '<tr class="cb-row-item cb-head-child-' + hi + '" style="display:none;">' +
// 				'<td style="padding-left:30px;">' + item.name + ' (' + (item.gl_code || '') + ')</td>' +
// 				'<td>' + formatINR(v[0]) + '</td><td>' + formatINR(v[1]) + '</td>' +
// 				'<td>' + formatINR(v[2]) + '</td><td>' + formatINR(v[3]) + '</td>' +
// 				'<td>' + formatINR(v[0]+v[1]+v[2]+v[3]) + '</td></tr>';
// 		}

// 		function subItemRow(hi, si, item) {
// 			var key = hi + '-' + si;
// 			var v   = qVals(item);
// 			return '<tr class="cb-row-sub-item cb-sub-child-' + key + '" style="display:none;">' +
// 				'<td style="padding-left:45px;">' + item.name + ' (' + (item.gl_code || '') + ')</td>' +
// 				'<td>' + formatINR(v[0]) + '</td><td>' + formatINR(v[1]) + '</td>' +
// 				'<td>' + formatINR(v[2]) + '</td><td>' + formatINR(v[3]) + '</td>' +
// 				'<td>' + formatINR(v[0]+v[1]+v[2]+v[3]) + '</td></tr>';
// 		}

// 		function renderTable(arr) {
// 			var $tbody = $('#estimate-tbody').empty();

// 			if (!Array.isArray(arr) || arr.length === 0) {
// 				$tbody.append('<tr><td colspan="6" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}

// 			var g = [0, 0, 0, 0];

// 			arr.forEach(function (head, hi) {
// 				var v = qVals(head);
// 				g[0] += v[0]; g[1] += v[1]; g[2] += v[2]; g[3] += v[3];

// 				$tbody.append(headRow(hi, head, v));

// 				(head.items || []).forEach(function (item) {
// 					$tbody.append(directItemRow(hi, item));
// 				});

// 				(head.sub_heads || []).forEach(function (sub, si) {
// 					var sv = qVals(sub);
// 					$tbody.append(subRow(hi, si, sub, sv));
// 					(sub.items || []).forEach(function (item) {
// 						$tbody.append(subItemRow(hi, si, item));
// 					});
// 				});
// 			});

// 			var gt = g[0]+g[1]+g[2]+g[3];
// 			$tbody.append(
// 				'<tr class="cb-row-grand"><td>GRAND TOTAL</td>' +
// 				'<td>' + formatINR(g[0]) + '</td><td>' + formatINR(g[1]) + '</td>' +
// 				'<td>' + formatINR(g[2]) + '</td><td>' + formatINR(g[3]) + '</td>' +
// 				'<td>' + formatINR(gt) + '</td></tr>'
// 			);
// 		}

// 		function bindEvents() {

// 			// Head click — show/hide children; collapse any open subs when closing
// 			$(document).on('click', '.cb-est-head', function () {
// 				var hi           = $(this).data('head');
// 				var $children    = $('.cb-head-child-' + hi);
// 				var wasOpen      = $children.first().is(':visible');

// 				$children.slideToggle(150);
// 				setArrow($(this).find('.cb-toggle'), !wasOpen);

// 				// Collapsing — also close any expanded sub-heads within this head
// 				if (wasOpen) {
// 					$children.filter('.cb-est-sub').each(function () {
// 						var subKey = $(this).data('sub');
// 						$('.cb-sub-child-' + subKey).hide();
// 						setArrow($(this).find('.cb-toggle'), false);
// 					});
// 				}
// 			});

// 			// Sub click — stop bubbling so head click doesn't fire
// 			$(document).on('click', '.cb-est-sub', function (e) {
// 				e.stopPropagation();
// 				var subKey  = $(this).data('sub');
// 				var $items  = $('.cb-sub-child-' + subKey);
// 				var wasOpen = $items.first().is(':visible');
// 				$items.slideToggle(150);
// 				setArrow($(this).find('.cb-toggle'), !wasOpen);
// 			});

// 			// Search
// 			$(document).on('input', '#estimate-search', function () {
// 				var term = $(this).val().trim().toLowerCase();
// 				$('#estimate-tbody .cb-est-head').each(function () {
// 					var hi      = $(this).data('head');
// 					var matches = $(this).text().toLowerCase().indexOf(term) !== -1;
// 					$(this).toggle(matches || !term);
// 					if (!term) {
// 						$('.cb-head-child-' + hi).hide();
// 						setArrow($(this).find('.cb-toggle'), false);
// 					}
// 				});
// 			});
// 		}

// 		function fetchAndRender(fy) {
// 			var year = (fy || '2025-26').split('-')[0];
// 			Loader.show('Loading Estimate...');
// 			frappe.call({
// 				method  : 'annual_budget.api.actuals.get_grouped_actuals_detailed_gl_test',
// 				args    : { fiscal_year: year, accounting_period: '12' },
// 				callback: function (r) {
// 					if (r.message && r.message.status === 'success') {
// 						renderTable(r.message.data);
// 					} else {
// 						frappe.msgprint('Failed to load Estimate data. Please try again.');
// 					}
// 					Loader.hide();
// 				},
// 				error: function () {
// 					Loader.hide();
// 					frappe.msgprint('Server error while loading Estimate data. Please try again.');
// 				}
// 			});
// 		}

// 		function load(fy) {
// 			if (!eventsBound) { bindEvents(); eventsBound = true; }
// 			fetchAndRender(fy);
// 		}

// 		return { load: load };

// 	})();

// 	function loadEstimate(fy) { Estimate.load(fy); }

// };













// frappe.pages['consolidated-budget'].on_page_load = function (wrapper) {

// 	// =============================================================================
// 	// PAGE SETUP
// 	// =============================================================================

// 	var page = frappe.ui.make_app_page({
// 		parent       : wrapper,
// 		title        : 'Foundation - Consolidated Budget - 2025-26',
// 		single_column: true
// 	});

// 	function updatePageTitle(financialYear) {
// 		var titleText = 'Foundation - Consolidated Budget - ' + financialYear;
// 		page.set_title(titleText);
// 		setTimeout(function () {
// 			$(wrapper).find('.page-head h3').hide();
// 			$(wrapper).find('.page-head .title-text')
// 				.css({ 'font-size': '18px', 'font-weight': '700', 'color': '#1a1a1a' });
// 		}, 100);
// 	}

// 	// =============================================================================
// 	// FY LABEL HELPER
// 	// e.g. '2026-27' => { plan:'FY26-27 Plan', est:'FY25-26 Est' }
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var parts     = (fy || '2025-26').split('-');
// 		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
// 		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
// 		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
// 		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
// 		return {
// 			plan : 'FY' + startYY + '-' + endYY   + ' Plan',
// 			est  : 'FY' + prevStart + '-' + prevEnd + ' Est'
// 		};
// 	}

// 	// =============================================================================
// 	// GLOBAL LOADER
// 	// =============================================================================

// 	if ($("#global-loader").length === 0) {
// 		$("body").append(
// 			'<div id="global-loader" class="loader-overlay">' +
// 				'<div class="loader-box">' +
// 					'<img src="/files/APF logo.png" class="loader-logo" alt="Loading">' +
// 					'<div class="loader-text">Loading, please wait</div>' +
// 				'</div>' +
// 			'</div>'
// 		);
// 	}
// 	$("#global-loader").hide();

// 	var Loader = {
// 		show: function (msg) {
// 			var m  = (typeof msg === 'string' && msg.length) ? msg : 'Loading, please wait';
// 			var $l = $("#global-loader");
// 			if (!$l.length) { return; }
// 			$l.find(".loader-text").text(m);
// 			$l.css("display", "flex").hide().fadeIn(200);
// 		},
// 		hide: function () {
// 			var $l = $("#global-loader");
// 			if ($l.length) { $l.fadeOut(200); }
// 		}
// 	};

// 	// =============================================================================
// 	// GLOBAL STYLES
// 	// =============================================================================

// 	$(page.body).append(
// 		'<style>' +
// 		':root{--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 		'--orange:#F26B21;--orange-light:#FFF3E6;--border-color:#ddd;}' +

// 		'.cb-wrapper{padding:15px;background:#fff;}' +
// 		'#cb-tab-nav{border-bottom:1px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:8px 20px;color:#555;font-size:13px;font-weight:400;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-1px;text-decoration:none;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:#000;font-weight:700;border-bottom:3px solid #000;}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +

// 		'.cb-filter-row{padding:10px 0;background:#fff;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row{padding:10px;}.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +

// 		'.cb-controls{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;margin-bottom:12px;background:#f7f9fb;border:1px solid #ddd;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
// 		'.cb-search-input{padding:7px 12px;border:1px solid #aaa;border-radius:6px;font-size:13px;width:280px;}' +
// 		'.cb-checkbox-area{display:flex;gap:18px;font-size:13px;font-weight:500;color:#444;}' +
// 		'.cb-checkbox-area label{display:flex;align-items:center;gap:5px;cursor:pointer;}' +

// 		'.cb-scroll-wrapper{border:1px solid #ddd;border-radius:6px;overflow:auto;max-height:70vh;background:#fff;}' +

// 		'.cb-table{min-width:900px;width:100%;border-collapse:collapse;font-size:13px;}' +
// 		'.cb-table th,.cb-table td{border:1px solid #ddd;padding:8px 10px;white-space:nowrap;text-align:right;}' +
// 		'.cb-table th:first-child,.cb-table td:first-child{text-align:left;}' +
// 		'.cb-table th:nth-child(2),.cb-table td:nth-child(2){text-align:center;}' +

// 		'.cb-thead-main th{background:#0076B6;color:#fff;font-weight:700;position:sticky;top:0;z-index:25;text-align:center;}' +
// 		'.cb-thead-sub th{background:#F26B21;color:#fff;font-weight:600;position:sticky;top:34px;z-index:24;text-align:center;}' +

// 		'.cb-row-head{font-weight:700;cursor:pointer;background:#E9F4FB;color:#003B63;}' +
// 		'.cb-row-head:hover td{background:#dceef9;}' +
// 		'.cb-row-sub{background:#FFF3E6;font-weight:600;cursor:pointer;}' +
// 		'.cb-row-sub:hover td{background:#ffe8d4;}' +
// 		'.cb-row-item td:first-child{padding-left:35px;}' +
// 		'.cb-row-sub-item td:first-child{padding-left:50px;}' +
// 		'.cb-row-grand{background:#0076B6;color:#fff;font-weight:800;border-top:2px solid #003B63;}' +
// 		'.cb-row-grand td{color:#fff;}' +
// 		'.cb-text-accent{color:#0076B6;font-weight:600;}' +

// 		/* BE sticky first column */
// 		'#be-table td:first-child{position:sticky;left:0;z-index:10;background:inherit;}' +
// 		'#be-table .cb-thead-main th:first-child{position:sticky;left:0;z-index:20;background:#0076B6;}' +
// 		'#be-table .cb-thead-sub th{left:auto !important;}' +
// 		'#be-table .cb-row-head td:first-child{background:#E9F4FB;}' +
// 		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6;}' +
// 		'#be-table .cb-row-grand td:first-child{background:#0076B6;}' +
// 				'#be-table .be-item-row td:first-child{background:#fff;}' +
// 		'#be-table .be-grand-col{background:#E8F0FA;color:#003B63;border-left:2px solid #0076B6;}' +
// 		'#be-table .cb-row-grand .be-grand-col{background:#003B63;color:#fff;}' +
// 		'#be-table .cb-row-head .be-grand-col{background:#003B63 !important;color:#fff;}' +
// 		'#be-table .cb-row-sub  .be-grand-col{background:#E8D5C4;color:#7a3b00;}' +

// 		/* loader */
// 		'#global-loader.loader-overlay{position:fixed;top:0;left:0;right:0;bottom:0;width:100vw;height:100vh;background:rgba(18,18,18,.92);backdrop-filter:blur(6px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
// 		'.loader-box{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;}' +
// 		'.loader-logo{width:90px;height:90px;border-radius:50%;background:linear-gradient(145deg,#fff,#eaeaea);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.35),0 0 0 4px rgba(255,255,255,.08);animation:loader-pulse 1.6s infinite ease-in-out;}' +
// 		'.loader-text{margin-top:6px;font-size:14px;color:#fff;font-weight:600;letter-spacing:.5px;text-align:center;opacity:.85;}' +
// 		'.loader-text::after{content:"";display:inline-block;width:1em;animation:loader-dots 1.5s infinite;}' +
// 		'@keyframes loader-pulse{0%{transform:scale(1);opacity:.8;box-shadow:0 0 0 0 rgba(255,255,255,.3);}50%{transform:scale(1.08);opacity:1;box-shadow:0 0 20px 8px rgba(255,255,255,.15);}100%{transform:scale(1);opacity:.8;box-shadow:0 0 0 0 rgba(255,255,255,.3);}}' +
// 		'@keyframes loader-dots{0%{content:"";}33%{content:".";}66%{content:"..";}100%{content:"...";}}' +
// 		'</style>'
// 	);

// 	// =============================================================================
// 	// NUMBER FORMATTER
// 	// =============================================================================

// 	function formatINR(v) {
// 		var n = parseFloat(v);
// 		if (isNaN(n)) { n = 0; }
// 		return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// 	}

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================

// 	$(page.body).append(
// 		'<div class="cb-wrapper">' +
// 			'<div class="frappe-control-group row cb-filter-row" id="cb-filter-row"></div>' +
// 			'<ul id="cb-tab-nav">' +
// 				'<li><a class="cb-tab-link active" data-tab="ppt">PPT</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="summary_inr">Summary in INR</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="headcount">Headcount</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="estimate">Estimate Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="budget_estimate">Budget &amp; Estimate</a></li>' +
// 			'</ul>' +
// 			'<div id="cb-tab-content">' +

// 				'<div class="cb-tab-pane active" id="tab-ppt"></div>' +
// 				'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
// 				'<div class="cb-tab-pane" id="tab-headcount"></div>' +

// 				/* ANNUAL BUDGET */
// 				'<div class="cb-tab-pane" id="tab-annual_budget">' +
// 					'<div class="cb-controls">' +
// 						'<input type="text" id="annual-search" class="cb-search-input" placeholder="Search Expense / Item / GL Code...">' +
// 						'<div class="cb-checkbox-area">' +
// 							'<label><input type="checkbox" id="annual-expand-quarters"> Expand Quarters</label>' +
// 							'<label><input type="checkbox" id="annual-expand-items"> Expand Line Items</label>' +
// 						'</div>' +
// 					'</div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* ESTIMATE */
// 				'<div class="cb-tab-pane" id="tab-estimate">' +
// 					'<div class="cb-controls">' +
// 						'<input type="text" id="estimate-search" class="cb-search-input" placeholder="Search Expense / Item / GL Code...">' +
// 					'</div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* BUDGET & ESTIMATE */
// 				'<div class="cb-tab-pane" id="tab-budget_estimate">' +
// 					'<div class="cb-controls">' +
// 						'<input type="text" id="be-search" class="cb-search-input" placeholder="Search Expense / Item / GL Code...">' +
// 						'<div class="cb-checkbox-area">' +
// 							'<label><input type="checkbox" id="be-expand-items"> Expand Line Items</label>' +
// 						'</div>' +
// 					'</div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="be-table"><thead></thead><tbody id="be-tbody"></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 			'</div>' +
// 		'</div>'
// 	);

// 	// =============================================================================
// 	// FINANCIAL YEAR FILTER
// 	// =============================================================================

// 	var $fyColumn = $('<div class="col-md-3 col-sm-12"></div>').appendTo('#cb-filter-row');

// 	var fyControl = frappe.ui.form.make_control({
// 		parent: $fyColumn,
// 		df: {
// 			label    : 'Financial Year',
// 			fieldtype: 'Select',
// 			fieldname: 'financial_year',
// 			reqd     : 1,
// 			change   : function () {
// 				var y = this.get_value();
// 				if (!y) { return; }
// 				updatePageTitle(y);
// 				TabLoader.resetAll();
// 				var activeTab = $('#cb-tab-nav .cb-tab-link.active').data('tab');
// 				if (activeTab) { TabLoader.trigger(activeTab); }
// 			}
// 		},
// 		render_input: true
// 	});
// 	fyControl.refresh();

// 	frappe.call({
// 		method  : 'frappe.client.get_list',
// 		args    : { doctype: 'Financial Year List', fields: ['name'], order_by: 'name desc', limit_page_length: 100 },
// 		callback: function (r) {
// 			if (r.message && r.message.length) {
// 				var names = r.message.map(function (x) { return x.name; });
// 				fyControl.df.options = names.join('\n');
// 				fyControl.refresh();
// 				fyControl.set_value(names[0]);
// 				updatePageTitle(names[0]);
// 			}
// 		}
// 	});

// 	// =============================================================================
// 	// TAB SWITCHING
// 	// =============================================================================

// 	$(document).on('click', '#cb-tab-nav .cb-tab-link', function () {
// 		var tab = $(this).data('tab');
// 		$('#cb-tab-nav .cb-tab-link').removeClass('active');
// 		$('.cb-tab-pane').removeClass('active');
// 		$(this).addClass('active');
// 		$('#tab-' + tab).addClass('active');
// 		TabLoader.trigger(tab);
// 	});

// 	// =============================================================================
// 	// TAB LOADER
// 	// =============================================================================

// 	var TabLoader = (function () {
// 		var loadedFY = {}, initDone = {};
// 		var handlers = {
// 			annual_budget  : function (fy) { Annual.load(fy);         },
// 			estimate       : function (fy) { Estimate.load(fy);       },
// 			budget_estimate: function (fy) { BudgetEstimate.load(fy); }
// 		};
// 		function trigger(tab) {
// 			if (!handlers[tab]) { return; }
// 			var fy = fyControl.get_value() || '2025-26';
// 			if (loadedFY[tab] === fy) { return; }
// 			loadedFY[tab] = fy;
// 			handlers[tab](fy);
// 		}
// 		function resetAll()  { loadedFY = {}; initDone = {}; }
// 		function markInit(t) { initDone[t] = true; }
// 		function isInit(t)   { return initDone[t] === true; }
// 		return { trigger: trigger, resetAll: resetAll, markInit: markInit, isInit: isInit };
// 	})();

// 	// =============================================================================
// 	// ANNUAL BUDGET MODULE
// 	// =============================================================================

// 	var Annual = (function () {

// 		var Q_DEFS = {
// 			q1: { label: 'Quarter 1', months: ['April',   'May',      'June']      },
// 			q2: { label: 'Quarter 2', months: ['July',    'August',   'September'] },
// 			q3: { label: 'Quarter 3', months: ['October', 'November', 'December']  },
// 			q4: { label: 'Quarter 4', months: ['January', 'February', 'March']     }
// 		};
// 		var Q_KEYS = ['q1','q2','q3','q4'];
// 		var data = [], expandedQ = [], openH = {}, openS = {};

// 		function sumArr(a) { var t=0; (a||[]).forEach(function(v){t+=(v||0);}); return t; }
// 		function objTotal(o) { var t=0; Q_KEYS.forEach(function(k){t+=sumArr(o[k]);}); return t; }

// 		function qCells(obj) {
// 			var html = '';
// 			Q_KEYS.forEach(function (k) {
// 				var vals = obj[k] || [0,0,0];
// 				if (expandedQ.indexOf(k) !== -1) {
// 					vals.forEach(function (v) { html += '<td>' + formatINR(v) + '</td>'; });
// 				} else {
// 					html += '<td colspan="3">' + formatINR(sumArr(vals)) + '</td>';
// 				}
// 			});
// 			return html;
// 		}

// 		function buildHeader() {
// 			var $t = $('#annual-table thead').empty();
// 			var $m = $('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2">Expense Head / Line Item</th>');
// 			$m.append('<th rowspan="2">GL Code</th>');
// 			Q_KEYS.forEach(function (k) {
// 				var o = expandedQ.indexOf(k) !== -1;
// 				$m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o?1:2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o?'▲':'▼') + '</th>');
// 			});
// 			$m.append('<th rowspan="2">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s = $('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function (k) {
// 					if (expandedQ.indexOf(k) !== -1) { Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); }); }
// 				});
// 				$t.append($s);
// 			}
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb   = $('#annual-table tbody').empty();
// 			var term  = $('#annual-search').val().trim().toLowerCase();
// 			var grand = { q1:[0,0,0], q2:[0,0,0], q3:[0,0,0], q4:[0,0,0] };

// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				var hs = String(hi), ho = openH[hs] === true;
// 				Q_KEYS.forEach(function (k) { (head[k]||[0,0,0]).forEach(function (v,mi) { grand[k][mi]+=(v||0); }); });

// 				$tb.append('<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name.trim() + '</td><td>-</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td></tr>');

// 				(head.sub_heads||[]).forEach(function (sub, si) {
// 					var sk = hs+'-'+si, so = openS[sk] === true;
// 					$tb.append('<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + '"><td style="padding-left:20px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td><td>-</td>' + qCells(sub) + '<td>' + formatINR(objTotal(sub)) + '</td></tr>');
// 					var iv = (ho&&so) ? '' : 'display:none;';
// 					(sub.items||[]).forEach(function (item) {
// 						$tb.append('<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + iv + '"><td style="padding-left:40px;">' + item.name + '</td><td>' + (item.gl_code||'-') + '</td>' + qCells(item) + '<td>' + formatINR(objTotal(item)) + '</td></tr>');
// 					});
// 				});

// 				var dv = ho ? '' : 'display:none;';
// 				(head.items||[]).forEach(function (d) {
// 					$tb.append('<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + dv + '"><td style="padding-left:35px;">' + d.name + '</td><td>' + (d.gl_code||'-') + '</td>' + qCells(d) + '<td>' + formatINR(objTotal(d)) + '</td></tr>');
// 				});
// 			});

// 			var gt = 0; Q_KEYS.forEach(function (k) { gt += sumArr(grand[k]); });
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td><td>-</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			var o = !openH[hs]; openH[hs] = o;
// 			$('#annual-table tbody .cb-annual-head[data-hi="' + hs + '"]').find('.cb-arrow').text(o?'▼':'▶');
// 			if (o) {
// 				$('#annual-table tbody .cb-annual-sub[data-hi="' + hs + '"]').show();
// 				$('#annual-table tbody .cb-annual-head-item[data-hi="' + hs + '"]').show();
// 				$('#annual-table tbody .cb-annual-sub[data-hi="' + hs + '"]').each(function () {
// 					var si = $(this).attr('data-si');
// 					if (openS[hs+'-'+si]) { $('#annual-table tbody .cb-annual-sub-item[data-hi="' + hs + '"][data-si="' + si + '"]').show(); }
// 				});
// 			} else {
// 				$('#annual-table tbody .cb-annual-sub[data-hi="' + hs + '"]').each(function () { var si=$(this).attr('data-si'); openS[hs+'-'+si]=false; $(this).find('.cb-arrow').text('▶'); });
// 				$('#annual-table tbody .cb-annual-sub[data-hi="' + hs + '"],.cb-annual-sub-item[data-hi="' + hs + '"],.cb-annual-head-item[data-hi="' + hs + '"]').hide();
// 			}
// 		}
// 		function toggleSub(hs, ss) {
// 			var sk = hs+'-'+ss, o = !openS[sk]; openS[sk] = o;
// 			$('#annual-table tbody .cb-annual-sub[data-hi="' + hs + '"][data-si="' + ss + '"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $i = $('#annual-table tbody .cb-annual-sub-item[data-hi="' + hs + '"][data-si="' + ss + '"]');
// 			o ? $i.show() : $i.hide();
// 		}
// 		function matchSearch(head, term) {
// 			if (!term) { return true; }
// 			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
// 			var subs = head.sub_heads||[];
// 			for (var s=0; s<subs.length; s++) {
// 				if (subs[s].name.toLowerCase().indexOf(term) !== -1) { return true; }
// 				for (var i=0; i<(subs[s].items||[]).length; i++) {
// 					if ((subs[s].items[i].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 					if ((subs[s].items[i].gl_code||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 				}
// 			}
// 			for (var d=0; d<(head.items||[]).length; d++) {
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 				if ((head.items[d].gl_code||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 			}
// 			return false;
// 		}

// 		function bindEvents() {
// 			$(document).on('input', '#annual-search', function () { renderTable(); });
// 			$(document).on('change', '#annual-expand-quarters', function () {
// 				expandedQ = this.checked ? Q_KEYS.slice() : []; renderTable();
// 			});
// 			$(document).on('change', '#annual-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function (h, hi) {
// 						openH[String(hi)] = true;
// 						(h.sub_heads||[]).forEach(function (_, si) { openS[hi+'-'+si] = true; });
// 					});
// 				} else { openH = {}; openS = {}; }
// 				renderTable();
// 			});
// 			$(document).on('click', '#annual-table .cb-q-header', function () {
// 				var k = String($(this).attr('data-quarter')), idx = expandedQ.indexOf(k);
// 				if (idx !== -1) { expandedQ.splice(idx,1); } else { expandedQ.push(k); }
// 				renderTable();
// 			});
// 			$('#tab-annual_budget').on('click', '.cb-annual-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-annual_budget').on('click', '.cb-annual-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 		}

// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			Loader.show('Loading Annual Budget...');
// 			frappe.call({
// 				method  : 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args    : { financial_year: fy },
// 				callback: function (r) { data = r.message||[]; renderTable(); Loader.hide(); },
// 				error   : function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}

// 		function load(fy) {
// 			if (!TabLoader.isInit('annual_budget')) { bindEvents(); TabLoader.markInit('annual_budget'); }
// 			fetchAndRender(fy);
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE
// 	// =============================================================================

// 	var Estimate = (function () {

// 		var Q_DEFS = {
// 			q1: { label: 'Quarter 1', months: ['April',   'May',      'June']      },
// 			q2: { label: 'Quarter 2', months: ['July',    'August',   'September'] },
// 			q3: { label: 'Quarter 3', months: ['October', 'November', 'December']  },
// 			q4: { label: 'Quarter 4', months: ['January', 'February', 'March']     }
// 		};
// 		var Q_KEYS = ['q1','q2','q3','q4'];
// 		var Q_IDX  = { q1:[0,1,2], q2:[3,4,5], q3:[6,7,8], q4:[9,10,11] };
// 		var data=[],expandedQ=[],openH={},openS={},bound=false;

// 		function getMth(obj) {
// 			var m = obj.months||{};
// 			return [
// 				parseFloat(m['4']||0),  parseFloat(m['5']||0),  parseFloat(m['6']||0),
// 				parseFloat(m['7']||0),  parseFloat(m['8']||0),  parseFloat(m['9']||0),
// 				parseFloat(m['10']||0), parseFloat(m['11']||0), parseFloat(m['12']||0),
// 				parseFloat(m['1']||0),  parseFloat(m['2']||0),  parseFloat(m['3']||0)
// 			];
// 		}
// 		function qTot(obj) { return [parseFloat(obj['Q1']||0), parseFloat(obj['Q2']||0), parseFloat(obj['Q3']||0), parseFloat(obj['Q4']||0)]; }
// 		function yTot(obj) { var q=qTot(obj); return q[0]+q[1]+q[2]+q[3]; }

// 		function qCells(obj) {
// 			var mths=getMth(obj), qtots=qTot(obj), html='';
// 			Q_KEYS.forEach(function (q, qi) {
// 				if (expandedQ.indexOf(q) !== -1) {
// 					Q_IDX[q].forEach(function (mi) { html += '<td>' + formatINR(mths[mi]) + '</td>'; });
// 				} else {
// 					html += '<td colspan="3">' + formatINR(qtots[qi]) + '</td>';
// 				}
// 			});
// 			return html;
// 		}

// 		function buildHeader() {
// 			var $t = $('#estimate-table thead').empty();
// 			var $m = $('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2">Expense</th>');
// 			Q_KEYS.forEach(function (k) {
// 				var o = expandedQ.indexOf(k) !== -1;
// 				$m.append('<th class="est-q-toggle" data-q="' + k + '" colspan="3" rowspan="' + (o?1:2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o?'▲':'▼') + '</th>');
// 			});
// 			$m.append('<th rowspan="2">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s = $('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function (k) {
// 					if (expandedQ.indexOf(k) !== -1) { Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); }); }
// 				});
// 				$t.append($s);
// 			}
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb  = $('#estimate-tbody').empty();
// 			var term = $('#estimate-search').val().trim().toLowerCase();
// 			if (!Array.isArray(data)||!data.length) {
// 				$tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			var gM=[0,0,0,0,0,0,0,0,0,0,0,0], gQ=[0,0,0,0];

// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				getMth(head).forEach(function (v,i) { gM[i]+=v; });
// 				qTot(head).forEach(function  (v,i) { gQ[i]+=v; });
// 				var hs=String(hi), ho=openH[hs];

// 				/* HEAD row */
// 				$tb.append('<tr class="cb-row-head cb-est-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name + '</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(yTot(head)) + '</td></tr>');

// 				/* direct items (e.g. CAPITAL direct items) */
// 				(head.items||[]).forEach(function (item) {
// 					$tb.append('<tr class="cb-est-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '"><td style="padding-left:30px;">' + item.name + (item.gl_code?' ('+item.gl_code+')':'') + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>');
// 				});

// 				/* sub-heads */
// 				(head.sub_heads||[]).forEach(function (sub, si) {
// 					var sk=hs+'-'+si, so=openS[sk];
// 					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + '"><td style="padding-left:20px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td>' + qCells(sub) + '<td>' + formatINR(yTot(sub)) + '</td></tr>');
// 					(sub.items||[]).forEach(function (item) {
// 						$tb.append('<tr class="cb-est-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho&&so)?'':'display:none;') + '"><td style="padding-left:45px;">' + item.name + (item.gl_code?' ('+item.gl_code+')':'') + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>');
// 					});
// 				});
// 			});

// 			var gO = { Q1:gQ[0],Q2:gQ[1],Q3:gQ[2],Q4:gQ[3], months:{'4':gM[0],'5':gM[1],'6':gM[2],'7':gM[3],'8':gM[4],'9':gM[5],'10':gM[6],'11':gM[7],'12':gM[8],'1':gM[9],'2':gM[10],'3':gM[11]} };
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(gO) + '<td>' + formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3]) + '</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			var o = !openH[hs]; openH[hs] = o;
// 			$('#estimate-table tbody .cb-est-head[data-hi="' + hs + '"]').find('.cb-arrow').text(o?'▼':'▶');
// 			if (o) {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').show();
// 				$('#estimate-table tbody .cb-est-head-item[data-hi="' + hs + '"]').show();
// 				$('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () {
// 					var si = $(this).attr('data-si');
// 					if (openS[hs+'-'+si]) { $('#estimate-table tbody .cb-est-sub-item[data-hi="' + hs + '"][data-si="' + si + '"]').show(); }
// 				});
// 			} else {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () { var si=$(this).attr('data-si'); openS[hs+'-'+si]=false; $(this).find('.cb-arrow').text('▶'); });
// 				$('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"],.cb-est-sub-item[data-hi="' + hs + '"],.cb-est-head-item[data-hi="' + hs + '"]').hide();
// 			}
// 		}
// 		function toggleSub(hs, ss) {
// 			var sk=hs+'-'+ss, o=!openS[sk]; openS[sk]=o;
// 			$('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"][data-si="' + ss + '"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $i = $('#estimate-table tbody .cb-est-sub-item[data-hi="' + hs + '"][data-si="' + ss + '"]');
// 			o ? $i.show() : $i.hide();
// 		}
// 		function matchSearch(head, term) {
// 			if (!term) { return true; }
// 			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
// 			for (var s=0; s<(head.sub_heads||[]).length; s++) {
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; }
// 				for (var i=0; i<(head.sub_heads[s].items||[]).length; i++) {
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 					if ((head.sub_heads[s].items[i].gl_code||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 				}
// 			}
// 			for (var d=0; d<(head.items||[]).length; d++) {
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 				if ((head.items[d].gl_code||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 			}
// 			return false;
// 		}

// 		function bindEvents() {
// 			$(document).on('click', '#estimate-table .est-q-toggle', function () {
// 				var k=String($(this).attr('data-q')), idx=expandedQ.indexOf(k);
// 				if (idx !== -1) { expandedQ.splice(idx,1); } else { expandedQ.push(k); }
// 				renderTable();
// 			});
// 			$('#tab-estimate').on('click', '.cb-est-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-estimate').on('click', '.cb-est-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 			$(document).on('input', '#estimate-search', function () { renderTable(); });
// 		}

// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			var year = (fy||'2025-26').split('-')[0];
// 			Loader.show('Loading Estimate...');
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
// 				args    : { fiscal_year: year, accounting_period: '12' },
// 				callback: function (r) {
// 					if (r.message && r.message.status === 'success') { data = r.message.data||[]; }
// 					else { frappe.msgprint('Failed to load Estimate data.'); }
// 					renderTable(); Loader.hide();
// 				},
// 				error: function () { Loader.hide(); frappe.msgprint('Server error loading Estimate data.'); }
// 			});
// 		}

// 		function load(fy) { if (!bound) { bindEvents(); bound=true; } fetchAndRender(fy); }
// 		return { load: load };
// 	})();


// 	// =============================================================================
// 	// BUDGET & ESTIMATE MODULE
// 	// =============================================================================

// 	var BudgetEstimate = (function () {

// 		var rawData     = [];
// 		var currentFY   = '';
// 		var openSec     = {};   // section open/close  (default: true = open)
// 		var openSub     = {};   // sub-head open/close (default: false = collapsed)
// 		var expandItems = false;
// 		var bound       = false;

// 		/* ── FY label helpers ───────────────────────────────────────────────── */
// 		function pl() { return getFYLabels(currentFY).plan; }
// 		function el() { return getFYLabels(currentFY).est;  }
// 		function entityLabel(entry) { return (entry.label || '').trim(); }

// 		/* ── Unified row structure from first entity ────────────────────────── */
// 		function buildStruct() {
// 			if (!rawData.length) { return []; }
// 			return (rawData[0].actuals || []).map(function (sec) {
// 				return {
// 					name     : sec.name,
// 					sub_heads: (sec.sub_heads || []).map(function (sub) {
// 						return {
// 							name : sub.name,
// 							items: (sub.items || []).map(function (i) {
// 								return { name: i.name, gl_code: i.gl_code || '' };
// 							})
// 						};
// 					}),
// 					items: (sec.items || []).map(function (i) {
// 						return { name: i.name, gl_code: i.gl_code || '' };
// 					})
// 				};
// 			});
// 		}

// 		/* ── Value lookups ──────────────────────────────────────────────────── */

// 		// Line item  (plan = ytd, est = total_posted_amt)
// 		function itemVal(entry, itemName, field) {
// 			var v = 0;
// 			(entry.actuals || []).forEach(function (sec) {
// 				(sec.items || []).forEach(function (i) {
// 					if (i.name === itemName) { v += parseFloat(i[field] || 0); }
// 				});
// 				(sec.sub_heads || []).forEach(function (sub) {
// 					(sub.items || []).forEach(function (i) {
// 						if (i.name === itemName) { v += parseFloat(i[field] || 0); }
// 					});
// 				});
// 			});
// 			return v;
// 		}

// 		// Sub-head total (plan = ytd, est = total_posted_amt_ytd)
// 		function subVal(entry, secName, subName, field) {
// 			var v = 0;
// 			(entry.actuals || []).forEach(function (sec) {
// 				if (sec.name !== secName) { return; }
// 				(sec.sub_heads || []).forEach(function (sub) {
// 					if (sub.name !== subName) { return; }
// 					v += parseFloat(field === 'plan' ? (sub.ytd || 0) : (sub.total_posted_amt_ytd || 0));
// 				});
// 			});
// 			return v;
// 		}

// 		// Section total (plan = ytd, est = total_posted_amt_ytd)
// 		function secVal(entry, secName, field) {
// 			var v = 0;
// 			(entry.actuals || []).forEach(function (sec) {
// 				if (sec.name !== secName) { return; }
// 				v += parseFloat(field === 'plan' ? (sec.ytd || 0) : (sec.total_posted_amt_ytd || 0));
// 			});
// 			return v;
// 		}

// 		// Grand total
// 		function grandVal(entry, field) {
// 			var v = 0;
// 			(entry.actuals || []).forEach(function (sec) {
// 				v += parseFloat(field === 'plan' ? (sec.ytd || 0) : (sec.total_posted_amt_ytd || 0));
// 			});
// 			return v;
// 		}

// 		/* ── Cell HTML generators ───────────────────────────────────────────── */

// 		function itemCells(name) {
// 			var h = '';
// 			rawData.forEach(function (e) {
// 				h += '<td>' + formatINR(itemVal(e, name, 'ytd'))              + '</td>';
// 				h += '<td>' + formatINR(itemVal(e, name, 'total_posted_amt')) + '</td>';
// 			});
// 			return h;
// 		}

// 		function subCells(sn, subn) {
// 			var h = '';
// 			rawData.forEach(function (e) {
// 				h += '<td class="cb-text-accent">' + formatINR(subVal(e, sn, subn, 'plan')) + '</td>';
// 				h += '<td class="cb-text-accent">' + formatINR(subVal(e, sn, subn, 'est'))  + '</td>';
// 			});
// 			return h;
// 		}

// 		// Section header cells — shown inline in the section header row itself
// 		function secCells(sn) {
// 			var h = '';
// 			rawData.forEach(function (e) {
// 				h += '<td style="font-weight:700;">' + formatINR(secVal(e, sn, 'plan')) + '</td>';
// 				h += '<td style="font-weight:700;">' + formatINR(secVal(e, sn, 'est'))  + '</td>';
// 			});
// 			return h;
// 		}

// 		function grandCells() {
// 			var h = '';
// 			rawData.forEach(function (e) {
// 				h += '<td>' + formatINR(grandVal(e, 'plan')) + '</td>';
// 				h += '<td>' + formatINR(grandVal(e, 'est'))  + '</td>';
// 			});
// 			return h;
// 		}

// 		// ── Cross-entity total helpers (sum Plan & Est across ALL entities) ───

// 		// Sum of itemVal(plan/est) across all entities for one item
// 		function itemTotalPlan(name) {
// 			var v = 0;
// 			rawData.forEach(function (e) { v += itemVal(e, name, 'ytd'); });
// 			return v;
// 		}
// 		function itemTotalEst(name) {
// 			var v = 0;
// 			rawData.forEach(function (e) { v += itemVal(e, name, 'total_posted_amt'); });
// 			return v;
// 		}

// 		// Sum of subVal across all entities for one sub-head
// 		function subTotalPlan(sn, subn) {
// 			var v = 0;
// 			rawData.forEach(function (e) { v += subVal(e, sn, subn, 'plan'); });
// 			return v;
// 		}
// 		function subTotalEst(sn, subn) {
// 			var v = 0;
// 			rawData.forEach(function (e) { v += subVal(e, sn, subn, 'est'); });
// 			return v;
// 		}

// 		// Sum of secVal across all entities for one section
// 		function secTotalPlan(sn) {
// 			var v = 0;
// 			rawData.forEach(function (e) { v += secVal(e, sn, 'plan'); });
// 			return v;
// 		}
// 		function secTotalEst(sn) {
// 			var v = 0;
// 			rawData.forEach(function (e) { v += secVal(e, sn, 'est'); });
// 			return v;
// 		}

// 		// Overall grand total across all entities
// 		function allGrandPlan() {
// 			var v = 0;
// 			rawData.forEach(function (e) { v += grandVal(e, 'plan'); });
// 			return v;
// 		}
// 		function allGrandEst() {
// 			var v = 0;
// 			rawData.forEach(function (e) { v += grandVal(e, 'est'); });
// 			return v;
// 		}

// 		// HTML for the two Grand Total cells (Plan + Est) appended at end of each row
// 		function totalCell2(plan, est, cls) {
// 			cls = cls || '';
// 			return '<td class="be-total-plan ' + cls + '" style="font-weight:700;">' + formatINR(plan) + '</td>' +
// 			       '<td class="be-total-est '  + cls + '" style="font-weight:700;">' + formatINR(est)  + '</td>';
// 		}

// 		/* ── Header ─────────────────────────────────────────────────────────── */
// 		// Fix for white-space in first Plan column:
// 		// The sticky "Expense Head / Line Item" th uses rowspan="2".
// 		// In the orange sub-row we must NOT add any cell for that column —
// 		// browsers handle the gap correctly. The blank first cell was appearing
// 		// because some browsers mis-render rowspan with sticky. We solve this
// 		// by using a SINGLE header row with entity name + Plan/Est stacked via
// 		// line breaks, eliminating the two-row approach entirely.

// 		function buildHeader() {
// 			var $t = $('#be-table thead').empty();

// 			var $r1 = $('<tr class="cb-thead-main"></tr>');
// 			var $r2 = $('<tr class="cb-thead-sub"></tr>');

// 			// Row 1: label col with rowspan="2" (spans both header rows visually)
// 			// + entity group headers (each colspan="2")
// 			$r1.append(
// 				'<th rowspan="2" style="text-align:left;min-width:280px;' +
// 				'position:sticky;left:0;z-index:40;background:#0076B6;">' +
// 				'Expense Head / Line Item</th>'
// 			);
// 			rawData.forEach(function (e) {
// 				$r1.append(
// 					'<th colspan="2" style="text-align:center;">' +
// 					entityLabel(e) + '</th>'
// 				);
// 			});
// 			// Grand Total group header
// 			$r1.append('<th colspan="2" style="text-align:center;background:#003B63;">Grand Total</th>');

// 			// Row 2: Plan | Est per entity, then Grand Total Plan | Est
// 			rawData.forEach(function () {
// 				$r2.append('<th style="text-align:center;min-width:140px;">' + pl() + '</th>');
// 				$r2.append('<th style="text-align:center;min-width:140px;">' + el() + '</th>');
// 			});
// 			$r2.append('<th style="text-align:center;min-width:140px;background:#004F8B;">' + pl() + '</th>');
// 			$r2.append('<th style="text-align:center;min-width:140px;background:#004F8B;">' + el() + '</th>');

// 			$t.append($r1).append($r2);
// 		}
// 		/* ── Full render ────────────────────────────────────────────────────── */
// 		function renderTable() {
// 			buildHeader();

// 			var $tb    = $('#be-tbody').empty();
// 			var term   = $('#be-search').val().trim().toLowerCase();
// 			var struct = buildStruct();
// 			var cols   = 1 + rawData.length * 2 + 2; // +2 for Grand Total Plan|Est

// 			if (!rawData.length || !struct.length) {
// 				$tb.append(
// 					'<tr><td colspan="' + cols + '" style="text-align:center;padding:40px;color:#aaa;">' +
// 					'No data available.</td></tr>'
// 				);
// 				return;
// 			}

// 			struct.forEach(function (sec) {
// 				var sn      = sec.name;
// 				var secOpen = openSec[sn] !== false;   // default open
// 				var secVis  = secOpen ? '' : 'display:none;';

// 				// ── Section header row — shows section totals inline (like Estimate Consolidated) ──
// 				// When collapsed: shows totals. When expanded: children show, totals still visible.
// 				$tb.append(
// 					'<tr class="cb-row-head be-sec-row" data-sec="' + sn + '">' +
// 						'<td style="text-align:left;">' +
// 							'<span class="cb-arrow">' + (secOpen ? '▼' : '▶') + '</span> ' + sn +
// 						'</td>' +
// 						secCells(sn) +
// 						totalCell2(secTotalPlan(sn), secTotalEst(sn), 'be-grand-col') +
// 					'</tr>'
// 				);

// 				// ── Sub-heads ─────────────────────────────────────────────────
// 				sec.sub_heads.forEach(function (sub) {
// 					var sk      = sn + '::' + sub.name;
// 					var subOpen = expandItems || (openSub[sk] === true);
// 					var subVis  = secOpen ? '' : 'display:none;';
// 					var itmVis  = (secOpen && subOpen) ? '' : 'display:none;';

// 					// Sub-head row (orange) — totals always visible when section open
// 					$tb.append(
// 						'<tr class="cb-row-sub be-sec-child be-sub-row" ' +
// 						'data-sec="' + sn + '" data-sub="' + sk + '" style="' + subVis + '">' +
// 							'<td style="padding-left:22px;text-align:left;">' +
// 								'<span class="cb-arrow">' + (subOpen ? '▼' : '▶') + '</span> ' + sub.name +
// 							'</td>' +
// 							subCells(sn, sub.name) +
// 							totalCell2(subTotalPlan(sn, sub.name), subTotalEst(sn, sub.name), 'be-grand-col') +
// 						'</tr>'
// 					);

// 					// Line items under sub-head
// 					sub.items.forEach(function (item) {
// 						if (term &&
// 							item.name.toLowerCase().indexOf(term) === -1 &&
// 							item.gl_code.toLowerCase().indexOf(term) === -1) { return; }

// 						$tb.append(
// 							'<tr class="be-item-row be-sec-child be-sub-child" ' +
// 							'data-sec="' + sn + '" data-sub="' + sk + '" style="' + itmVis + '">' +
// 								'<td style="padding-left:42px;text-align:left;">' +
// 									item.name +
// 									(item.gl_code
// 										? ' <span style="color:#aaa;font-size:11px;">(' + item.gl_code + ')</span>'
// 										: '') +
// 								'</td>' +
// 								itemCells(item.name) +
// 								totalCell2(itemTotalPlan(item.name), itemTotalEst(item.name), 'be-grand-col') +
// 							'</tr>'
// 						);
// 					});
// 				});

// 				// ── Direct items (e.g. CAPITAL EXPENSES line items) ───────────
// 				sec.items.forEach(function (item) {
// 					if (term &&
// 						item.name.toLowerCase().indexOf(term) === -1 &&
// 						item.gl_code.toLowerCase().indexOf(term) === -1) { return; }

// 					$tb.append(
// 						'<tr class="be-item-row be-sec-child be-direct-item" ' +
// 						'data-sec="' + sn + '" style="' + secVis + '">' +
// 							'<td style="padding-left:30px;text-align:left;">' +
// 								item.name +
// 								(item.gl_code
// 									? ' <span style="color:#aaa;font-size:11px;">(' + item.gl_code + ')</span>'
// 									: '') +
// 							'</td>' +
// 							itemCells(item.name) +
// 							totalCell2(itemTotalPlan(item.name), itemTotalEst(item.name), 'be-grand-col') +
// 						'</tr>'
// 					);
// 				});

// 				// ── NO separate section total row — totals are on the section header itself ──
// 			});

// 			// ── Grand total ───────────────────────────────────────────────────
// 			$tb.append(
// 				'<tr class="cb-row-grand">' +
// 					'<td style="text-align:left;">GRAND TOTAL</td>' +
// 					grandCells() +
// 					totalCell2(allGrandPlan(), allGrandEst(), 'be-grand-col') +
// 				'</tr>'
// 			);
// 		}

// 		/* ── Toggle helpers ─────────────────────────────────────────────────── */

// 		function toggleSec(sn) {
// 			var o = !(openSec[sn] !== false);
// 			openSec[sn] = o;

// 			$('#be-table tbody .be-sec-row[data-sec="' + sn + '"]')
// 				.find('.cb-arrow').text(o ? '▼' : '▶');

// 			var $ch = $('#be-table tbody .be-sec-child[data-sec="' + sn + '"]');
// 			if (o) {
// 				$ch.filter('.be-sub-row,.be-direct-item').show();
// 				$ch.filter('.be-sub-child').each(function () {
// 					var sk = $(this).attr('data-sub');
// 					if (expandItems || openSub[sk] === true) { $(this).show(); }
// 				});
// 			} else {
// 				$ch.hide();
// 			}
// 		}

// 		function toggleSubRow(sk) {
// 			var o = !(openSub[sk] === true);
// 			openSub[sk] = o;
// 			$('#be-table tbody .be-sub-row[data-sub="' + sk + '"]')
// 				.find('.cb-arrow').text(o ? '▼' : '▶');
// 			var $it = $('#be-table tbody .be-sub-child[data-sub="' + sk + '"]');
// 			o ? $it.show() : $it.hide();
// 		}

// 		/* ── Events ─────────────────────────────────────────────────────────── */

// 		function bindEvents() {

// 			// Section header click
// 			$('#tab-budget_estimate').on('click', '.be-sec-row', function (e) {
// 				e.stopPropagation();
// 				toggleSec($(this).attr('data-sec'));
// 			});

// 			// Sub-head row click
// 			$('#tab-budget_estimate').on('click', '.be-sub-row', function (e) {
// 				e.stopPropagation();
// 				if (!expandItems) { toggleSubRow($(this).attr('data-sub')); }
// 			});

// 			// Expand Line Items checkbox — expands sections, sub-heads, AND items
// 			$(document).on('change', '#be-expand-items', function () {
// 				expandItems = this.checked;
// 				buildStruct().forEach(function (sec) {
// 					// open/close sections
// 					openSec[sec.name] = expandItems ? true : false;
// 					// open/close sub-heads
// 					sec.sub_heads.forEach(function (sub) {
// 						openSub[sec.name + '::' + sub.name] = expandItems;
// 					});
// 				});
// 				renderTable();
// 			});

// 			// Search
// 			$(document).on('input', '#be-search', function () { renderTable(); });
// 		}

// 		/* ── Fetch & render ─────────────────────────────────────────────────── */

// 		function fetchAndRender(fy) {
// 			currentFY   = fy;
// 			rawData     = [];
// 			openSec     = {};
// 			openSub     = {};
// 			expandItems = false;
// 			$('#be-expand-items').prop('checked', false);

// 			Loader.show('Loading Budget & Estimate...');
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.format_api',
// 				args    : { financial_year: fy,month:"March" },
// 				callback: function (r) {
// 					if (r.message && Array.isArray(r.message)) {
// 						rawData = r.message;
// 					} else {
// 						frappe.msgprint('Failed to load Budget & Estimate data.');
// 					}
// 					renderTable();
// 					Loader.hide();
// 				},
// 				error: function () {
// 					Loader.hide();
// 					frappe.msgprint('Server error loading Budget & Estimate data.');
// 				}
// 			});
// 		}

// 		function load(fy) {
// 			if (!bound) { bindEvents(); bound = true; }
// 			fetchAndRender(fy);
// 		}

// 		return { load: load };
// 	})();

// };




frappe.pages['consolidated-budget'].on_page_load = function (wrapper) {

	// =============================================================================
	// PAGE SETUP
	// =============================================================================

	var page = frappe.ui.make_app_page({
		parent       : wrapper,
		title        : 'Foundation - Consolidated Budget - 2025-26',
		single_column: true
	});

	function updatePageTitle(financialYear) {
		var titleText = 'Foundation - Consolidated Budget - ' + financialYear;
		page.set_title(titleText);
		setTimeout(function () {
			$(wrapper).find('.page-head h3').hide();
			$(wrapper).find('.page-head .title-text')
				.css({ 'font-size': '18px', 'font-weight': '700', 'color': '#1a1a1a' });
		}, 100);
	}

	// =============================================================================
	// FY LABEL HELPER
	// =============================================================================

	function getFYLabels(fy) {
		var parts     = (fy || '2025-26').split('-');
		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
		return {
			plan : 'FY' + startYY + '-' + endYY    + ' Plan',
			est  : 'FY' + prevStart + '-' + prevEnd + ' Est'
		};
	}

	// =============================================================================
	// GLOBAL LOADER
	// =============================================================================

	if ($("#global-loader").length === 0) {
		$("body").append(
			'<div id="global-loader" class="loader-overlay">' +
				'<div class="loader-box">' +
					'<img src="/files/APF logo.png" class="loader-logo" alt="Loading">' +
					'<div class="loader-text">Loading, please wait</div>' +
				'</div>' +
			'</div>'
		);
	}
	$("#global-loader").hide();

	var Loader = {
		show: function (msg) {
			var m  = (typeof msg === 'string' && msg.length) ? msg : 'Loading, please wait';
			var $l = $("#global-loader");
			if (!$l.length) { return; }
			$l.find(".loader-text").text(m);
			$l.css("display", "flex").hide().fadeIn(200);
		},
		hide: function () {
			var $l = $("#global-loader");
			if ($l.length) { $l.fadeOut(200); }
		}
	};

	// =============================================================================
	// GLOBAL STYLES
	// =============================================================================

	$(page.body).append(
		'<style>' +
		':root{--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
		'--orange:#F26B21;--orange-light:#FFF3E6;--border-color:#ddd;}' +

		'.cb-wrapper{padding:15px;background:#fff;}' +
		'#cb-tab-nav{border-bottom:1px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
		'#cb-tab-nav li{display:inline-block;}' +
		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:8px 20px;color:#555;font-size:13px;font-weight:400;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-1px;text-decoration:none;}' +
		'#cb-tab-nav .cb-tab-link.active{color:#000;font-weight:700;border-bottom:3px solid #000;}' +
		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +

		'.cb-filter-row{padding:10px 0;background:#fff;margin-bottom:10px;}' +
		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
		'@media(max-width:768px){.cb-filter-row{padding:10px;}.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +

		'.cb-controls{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;margin-bottom:12px;background:#f7f9fb;border:1px solid #ddd;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
		'.cb-search-input{padding:7px 12px;border:1px solid #aaa;border-radius:6px;font-size:13px;width:280px;}' +
		'.cb-checkbox-area{display:flex;gap:18px;font-size:13px;font-weight:500;color:#444;}' +
		'.cb-checkbox-area label{display:flex;align-items:center;gap:5px;cursor:pointer;}' +
		'.cb-export-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;font-size:13px;font-weight:600;color:#fff;background:#0076B6;border:1px solid #0076B6;border-radius:6px;cursor:pointer;white-space:nowrap;transition:background .15s;box-shadow:0 1px 3px rgba(0,0,0,.12);}' +
		'.cb-export-btn:hover{background:#005f94;border-color:#005f94;}' +

		'.cb-scroll-wrapper{border:1px solid #ddd;border-radius:6px;overflow:auto;max-height:70vh;background:#fff;}' +

		'.cb-table{min-width:900px;width:100%;border-collapse:collapse;font-size:13px;}' +
		'.cb-table th,.cb-table td{border:1px solid #ddd;padding:8px 10px;white-space:nowrap;text-align:right;}' +
		'.cb-table th:first-child,.cb-table td:first-child{text-align:left;}' +
		'.cb-table th:nth-child(2),.cb-table td:nth-child(2){text-align:center;}' +

		'.cb-thead-main th{background:#0076B6;color:#fff;font-weight:700;position:sticky;top:0;z-index:25;text-align:center;}' +
		'.cb-thead-sub th{background:#F26B21;color:#fff;font-weight:600;position:sticky;top:34px;z-index:24;text-align:center;}' +

		'.cb-row-head{font-weight:700;cursor:pointer;background:#E9F4FB;color:#003B63;}' +
		'.cb-row-head:hover td{background:#dceef9;}' +
		'.cb-row-sub{background:#FFF3E6;font-weight:600;cursor:pointer;}' +
		'.cb-row-sub:hover td{background:#ffe8d4;}' +
		'.cb-row-item td:first-child{padding-left:35px;}' +
		'.cb-row-sub-item td:first-child{padding-left:50px;}' +
		'.cb-row-grand{background:#0076B6;color:#fff;font-weight:800;border-top:2px solid #003B63;}' +
		'.cb-row-grand td{color:#fff;}' +
		'.cb-text-accent{color:#0076B6;font-weight:600;}' +

		/* ── PPT TAB ── */
		'#ppt-table td:first-child{position:sticky;left:0;z-index:10;background:inherit;}' +
		'#ppt-table .cb-thead-main th:first-child{position:sticky;left:0;z-index:30;background:#003B63;}' +
		'#ppt-table .cb-thead-sub th:first-child{position:sticky;left:0;z-index:29;background:#0076B6;}' +
		'#ppt-table .cb-row-head td:first-child{background:#E9F4FB;}' +
		'#ppt-table .cb-row-sub  td:first-child{background:#FFF3E6;}' +
		'#ppt-table .cb-row-grand td:first-child{background:#0076B6;}' +
		'#ppt-table .ppt-item-row td:first-child{background:#fff;}' +
		'#ppt-table .ppt-total-col{background:#E8F0FA !important;color:#003B63;font-weight:700;border-left:2px solid #0076B6;}' +
		'#ppt-table .cb-row-grand .ppt-total-col{background:#003B63 !important;color:#fff;}' +
		'#ppt-table .ppt-est-group th,.ppt-est-group td{background:#FFF8F0;}' +
		'.ppt-dash{color:#aaa;}' +
		'.ppt-title-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;padding:4px 2px;}' +
		'.ppt-main-title{font-size:13px;font-weight:700;text-transform:uppercase;text-decoration:underline;letter-spacing:.3px;color:#111;}' +
		'.ppt-currency-label{font-size:11px;font-style:italic;color:#555;}' +

		/* BE sticky first column */
		'#be-table td:first-child{position:sticky;left:0;z-index:10;background:inherit;}' +
		'#be-table .cb-thead-main th:first-child{position:sticky;left:0;z-index:20;background:#0076B6;}' +
		'#be-table .cb-thead-sub th{left:auto !important;}' +
		'#be-table .cb-row-head td:first-child{background:#E9F4FB;}' +
		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6;}' +
		'#be-table .cb-row-grand td:first-child{background:#0076B6;}' +
		'#be-table .be-item-row td:first-child{background:#fff;}' +
		'#be-table .be-grand-col{background:#E8F0FA;color:#003B63;border-left:2px solid #0076B6;}' +
		'#be-table .cb-row-grand .be-grand-col{background:#003B63;color:#fff;}' +
		'#be-table .cb-row-head .be-grand-col{background:#003B63 !important;color:#fff;}' +
		'#be-table .cb-row-sub  .be-grand-col{background:#E8D5C4;color:#7a3b00;}' +

		/* loader */
		'#global-loader.loader-overlay{position:fixed;top:0;left:0;right:0;bottom:0;width:100vw;height:100vh;background:rgba(18,18,18,.92);backdrop-filter:blur(6px);display:none;z-index:999999;align-items:center;justify-content:center;}' +
		'.loader-box{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;}' +
		'.loader-logo{width:90px;height:90px;border-radius:50%;background:linear-gradient(145deg,#fff,#eaeaea);padding:14px;object-fit:contain;box-shadow:0 10px 30px rgba(0,0,0,.35),0 0 0 4px rgba(255,255,255,.08);animation:loader-pulse 1.6s infinite ease-in-out;}' +
		'.loader-text{margin-top:6px;font-size:14px;color:#fff;font-weight:600;letter-spacing:.5px;text-align:center;opacity:.85;}' +
		'.loader-text::after{content:"";display:inline-block;width:1em;animation:loader-dots 1.5s infinite;}' +
		'@keyframes loader-pulse{0%{transform:scale(1);opacity:.8;box-shadow:0 0 0 0 rgba(255,255,255,.3);}50%{transform:scale(1.08);opacity:1;box-shadow:0 0 20px 8px rgba(255,255,255,.15);}100%{transform:scale(1);opacity:.8;box-shadow:0 0 0 0 rgba(255,255,255,.3);}}' +
		'@keyframes loader-dots{0%{content:"";}33%{content:".";}66%{content:"..";}100%{content:"...";}}' +
		'</style>'
	);

	// =============================================================================
	// NUMBER FORMATTER
	// =============================================================================

	function formatINR(v) {
		var n = parseFloat(v);
		if (isNaN(n)) { n = 0; }
		return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	}

	function fmtDash(v) {
		var n = parseFloat(v) || 0;
		return n === 0
			? '<span class="ppt-dash">-</span>'
			: n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	}

	// =============================================================================
	// HTML SKELETON
	// =============================================================================

	$(page.body).append(
		'<div class="cb-wrapper">' +
			'<div class="frappe-control-group row cb-filter-row" id="cb-filter-row"></div>' +
			'<ul id="cb-tab-nav">' +
				'<li><a class="cb-tab-link active" data-tab="ppt">PPT</a></li>' +
				'<li><a class="cb-tab-link" data-tab="summary_inr">Summary in INR</a></li>' +
				'<li><a class="cb-tab-link" data-tab="headcount">Headcount</a></li>' +
				'<li><a class="cb-tab-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>' +
				'<li><a class="cb-tab-link" data-tab="estimate">Estimate Consolidated</a></li>' +
				'<li><a class="cb-tab-link" data-tab="budget_estimate">Budget &amp; Estimate</a></li>' +
			'</ul>' +
			'<div id="cb-tab-content">' +

				/* ── PPT TAB ── */
				'<div class="cb-tab-pane active" id="tab-ppt">' +
					'<div class="ppt-title-bar">' +
						'<div class="ppt-main-title" id="ppt-main-title">Overall Foundation Numbers – Budget vs. Est</div>' +
						'<div class="ppt-currency-label">₹ Cr.</div>' +
					'</div>' +
					'<div class="cb-controls">' +
						'<input type="text" id="ppt-search" class="cb-search-input" placeholder="Search unit / expense head...">' +
						'<div class="cb-checkbox-area">' +
							'<label><input type="checkbox" id="ppt-expand-all"> Expand All</label>' +
						'</div>' +
						'<button class="cb-export-btn" id="ppt-export-btn">↓ Export to Excel</button>' +
					'</div>' +
					'<div class="cb-scroll-wrapper">' +
						'<table class="cb-table" id="ppt-table"><thead></thead><tbody id="ppt-tbody"></tbody></table>' +
					'</div>' +
				'</div>' +

				'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
				'<div class="cb-tab-pane" id="tab-headcount"></div>' +

				/* ANNUAL BUDGET */
				'<div class="cb-tab-pane" id="tab-annual_budget">' +
					'<div class="cb-controls">' +
						'<input type="text" id="annual-search" class="cb-search-input" placeholder="Search Expense / Item / GL Code...">' +
						'<div class="cb-checkbox-area">' +
							'<label><input type="checkbox" id="annual-expand-quarters"> Expand Quarters</label>' +
							'<label><input type="checkbox" id="annual-expand-items"> Expand Line Items</label>' +
						'</div>' +
					'</div>' +
					'<div class="cb-scroll-wrapper">' +
						'<table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table>' +
					'</div>' +
				'</div>' +

				/* ESTIMATE — added Expand Quarters + Expand Line Items checkboxes */
				'<div class="cb-tab-pane" id="tab-estimate">' +
					'<div class="cb-controls">' +
						'<input type="text" id="estimate-search" class="cb-search-input" placeholder="Search Expense / Item / GL Code...">' +
						'<div class="cb-checkbox-area">' +
							'<label><input type="checkbox" id="estimate-expand-quarters"> Expand Quarters</label>' +
							'<label><input type="checkbox" id="estimate-expand-items"> Expand Line Items</label>' +
						'</div>' +
					'</div>' +
					'<div class="cb-scroll-wrapper">' +
						'<table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table>' +
					'</div>' +
				'</div>' +

				/* BUDGET & ESTIMATE */
				'<div class="cb-tab-pane" id="tab-budget_estimate">' +
					'<div class="cb-controls">' +
						'<input type="text" id="be-search" class="cb-search-input" placeholder="Search Expense / Item / GL Code...">' +
						'<div class="cb-checkbox-area">' +
							'<label><input type="checkbox" id="be-expand-items"> Expand Line Items</label>' +
						'</div>' +
					'</div>' +
					'<div class="cb-scroll-wrapper">' +
						'<table class="cb-table" id="be-table"><thead></thead><tbody id="be-tbody"></tbody></table>' +
					'</div>' +
				'</div>' +

			'</div>' +
		'</div>'
	);

	// =============================================================================
	// FINANCIAL YEAR FILTER
	// =============================================================================

	var $fyColumn = $('<div class="col-md-3 col-sm-12"></div>').appendTo('#cb-filter-row');

	var fyControl = frappe.ui.form.make_control({
		parent: $fyColumn,
		df: {
			label    : 'Financial Year',
			fieldtype: 'Select',
			fieldname: 'financial_year',
			reqd     : 1,
			change   : function () {
				var y = this.get_value();
				if (!y) { return; }
				updatePageTitle(y);
				TabLoader.resetAll();
				var activeTab = $('#cb-tab-nav .cb-tab-link.active').data('tab');
				if (activeTab) { TabLoader.trigger(activeTab); }
			}
		},
		render_input: true
	});
	fyControl.refresh();

	frappe.call({
		method  : 'frappe.client.get_list',
		args    : { doctype: 'Financial Year List', fields: ['name'], order_by: 'name desc', limit_page_length: 100 },
		callback: function (r) {
			if (r.message && r.message.length) {
				var names = r.message.map(function (x) { return x.name; });
				fyControl.df.options = names.join('\n');
				fyControl.refresh();
				fyControl.set_value(names[0]);
				updatePageTitle(names[0]);
			}
		}
	});

	// =============================================================================
	// TAB SWITCHING
	// =============================================================================

	$(document).on('click', '#cb-tab-nav .cb-tab-link', function () {
		var tab = $(this).data('tab');
		$('#cb-tab-nav .cb-tab-link').removeClass('active');
		$('.cb-tab-pane').removeClass('active');
		$(this).addClass('active');
		$('#tab-' + tab).addClass('active');
		TabLoader.trigger(tab);
	});

	// =============================================================================
	// TAB LOADER
	// =============================================================================

	var TabLoader = (function () {
		var loadedFY = {}, initDone = {};
		var handlers = {
			ppt            : function (fy) { PPT.load(fy);            },
			annual_budget  : function (fy) { Annual.load(fy);         },
			estimate       : function (fy) { Estimate.load(fy);       },
			budget_estimate: function (fy) { BudgetEstimate.load(fy); }
		};
		function trigger(tab) {
			if (!handlers[tab]) { return; }
			var fy = fyControl.get_value() || '2025-26';
			if (loadedFY[tab] === fy) { return; }
			loadedFY[tab] = fy;
			handlers[tab](fy);
		}
		function resetAll()  { loadedFY = {}; initDone = {}; }
		function markInit(t) { initDone[t] = true; }
		function isInit(t)   { return initDone[t] === true; }
		return { trigger: trigger, resetAll: resetAll, markInit: markInit, isInit: isInit };
	})();

	// =============================================================================
	// PPT MODULE
	// =============================================================================

	var PPT = (function () {

		var rawData    = [];   // array of entity objects from format_api
		var currentFY  = '';
		var openRows   = {};   // secName -> bool (expanded)
		var openSubs   = {};   // secName::subName -> bool
		var expandAll  = false;
		var bound      = false;

		/* ─── helpers ─────────────────────────────────────────────────────── */

		function pl() { return getFYLabels(currentFY).plan; }
		function el() { return getFYLabels(currentFY).est;  }
		function fy()  { return currentFY; }
		function prevFY() {
			var p = (currentFY || '2025-26').split('-');
			return (parseInt(p[0]) - 1) + '-' + (parseInt(p[1]) - 1);
		}

		// Grand-total plan/est per entity  (sums all sections)
		function entityPlan(entry) {
			var v = 0;
			(entry.actuals || []).forEach(function (s) { v += parseFloat(s.ytd || 0); });
			return v;
		}
		function entityEst(entry) {
			var v = 0;
			(entry.actuals || []).forEach(function (s) { v += parseFloat(s.total_posted_amt_ytd || 0); });
			return v;
		}

		// Per-section plan/est for one entity
		function secPlan(entry, sn) {
			var v = 0;
			(entry.actuals || []).forEach(function (s) {
				if (s.name === sn) { v += parseFloat(s.ytd || 0); }
			});
			return v;
		}
		function secEst(entry, sn) {
			var v = 0;
			(entry.actuals || []).forEach(function (s) {
				if (s.name === sn) { v += parseFloat(s.total_posted_amt_ytd || 0); }
			});
			return v;
		}

		// Per-sub-head plan/est for one entity
		function subPlan(entry, sn, subn) {
			var v = 0;
			(entry.actuals || []).forEach(function (s) {
				if (s.name !== sn) { return; }
				(s.sub_heads || []).forEach(function (sub) {
					if (sub.name === subn) { v += parseFloat(sub.ytd || 0); }
				});
			});
			return v;
		}
		function subEst(entry, sn, subn) {
			var v = 0;
			(entry.actuals || []).forEach(function (s) {
				if (s.name !== sn) { return; }
				(s.sub_heads || []).forEach(function (sub) {
					if (sub.name === subn) { v += parseFloat(sub.total_posted_amt_ytd || 0); }
				});
			});
			return v;
		}

		// Cross-entity sums
		function allPlan(sn) {
			var v = 0; rawData.forEach(function (e) { v += sn ? secPlan(e, sn) : entityPlan(e); }); return v;
		}
		function allEst(sn) {
			var v = 0; rawData.forEach(function (e) { v += sn ? secEst(e, sn) : entityEst(e); }); return v;
		}
		function allSubPlan(sn, subn) {
			var v = 0; rawData.forEach(function (e) { v += subPlan(e, sn, subn); }); return v;
		}
		function allSubEst(sn, subn) {
			var v = 0; rawData.forEach(function (e) { v += subEst(e, sn, subn); }); return v;
		}

		// Unique entity label
		function entityLabel(e) { return (e.label || '').trim(); }

		/* ─── build struct (unique sections/subs from first entity) ─────── */
		function buildStruct() {
			if (!rawData.length) { return []; }
			return (rawData[0].actuals || []).map(function (s) {
				return {
					name     : s.name,
					sub_heads: (s.sub_heads || []).map(function (sub) { return { name: sub.name }; })
				};
			});
		}

		/* ─── header ─────────────────────────────────────────────────────── */
		function buildHeader() {
			var $t  = $('#ppt-table thead').empty();
			var $r1 = $('<tr class="cb-thead-main"></tr>');
			var $r2 = $('<tr class="cb-thead-sub"></tr>');

			// Sticky first col
			$r1.append(
				'<th rowspan="2" style="text-align:left;min-width:220px;' +
				'position:sticky;left:0;z-index:30;background:#003B63;">' +
				'Expense Head</th>'
			);

			// Per-entity columns (Plan | Est)
			rawData.forEach(function (e) {
				$r1.append('<th colspan="2" style="text-align:center;">' + entityLabel(e) + '</th>');
				$r2.append('<th style="min-width:130px;text-align:center;">' + pl() + '</th>');
				$r2.append('<th style="min-width:130px;text-align:center;">' + el() + '</th>');
			});

			// Grand Total cols
			$r1.append('<th colspan="2" style="text-align:center;background:#003B63;">Grand Total</th>');
			$r2.append('<th style="min-width:130px;text-align:center;background:#004F8B;">' + pl() + '</th>');
			$r2.append('<th style="min-width:130px;text-align:center;background:#004F8B;">' + el() + '</th>');

			$t.append($r1).append($r2);
		}

		/* ─── cell builders ─────────────────────────────────────────────── */
		function secRowCells(sn) {
			var h = '';
			rawData.forEach(function (e) {
				h += '<td style="font-weight:700;">' + fmtDash(secPlan(e, sn)) + '</td>';
				h += '<td style="font-weight:700;">' + fmtDash(secEst(e,  sn)) + '</td>';
			});
			h += '<td class="ppt-total-col">' + fmtDash(allPlan(sn)) + '</td>';
			h += '<td class="ppt-total-col">' + fmtDash(allEst(sn))  + '</td>';
			return h;
		}

		function subRowCells(sn, subn) {
			var h = '';
			rawData.forEach(function (e) {
				h += '<td class="cb-text-accent">' + fmtDash(subPlan(e, sn, subn)) + '</td>';
				h += '<td class="cb-text-accent">' + fmtDash(subEst(e,  sn, subn)) + '</td>';
			});
			h += '<td class="ppt-total-col">' + fmtDash(allSubPlan(sn, subn)) + '</td>';
			h += '<td class="ppt-total-col">' + fmtDash(allSubEst(sn,  subn)) + '</td>';
			return h;
		}

		function grandRowCells() {
			var h = '';
			rawData.forEach(function (e) {
				h += '<td>' + fmtDash(entityPlan(e)) + '</td>';
				h += '<td>' + fmtDash(entityEst(e))  + '</td>';
			});
			h += '<td class="ppt-total-col">' + fmtDash(allPlan(null)) + '</td>';
			h += '<td class="ppt-total-col">' + fmtDash(allEst(null))  + '</td>';
			return h;
		}

		/* ─── search ─────────────────────────────────────────────────────── */
		function matchSearch(sn, term) {
			if (!term) { return true; }
			if (sn.toLowerCase().indexOf(term) !== -1) { return true; }
			var struct = buildStruct();
			for (var i = 0; i < struct.length; i++) {
				if (struct[i].name !== sn) { continue; }
				for (var j = 0; j < struct[i].sub_heads.length; j++) {
					if (struct[i].sub_heads[j].name.toLowerCase().indexOf(term) !== -1) { return true; }
				}
			}
			return false;
		}

		/* ─── render ─────────────────────────────────────────────────────── */
		function renderTable() {
			buildHeader();
			var $tb  = $('#ppt-tbody').empty();
			var term = $('#ppt-search').val().trim().toLowerCase();
			var cols = 1 + rawData.length * 2 + 2;

			if (!rawData.length) {
				$tb.append('<tr><td colspan="' + cols + '" style="text-align:center;padding:40px;color:#aaa;">No data – select a Financial Year and load.</td></tr>');
				return;
			}

			// Update title
			$('#ppt-main-title').text('Overall Foundation Numbers – ' + fy() + ' Budget vs. ' + prevFY() + ' Est');

			var struct = buildStruct();

			struct.forEach(function (sec) {
				if (!matchSearch(sec.name, term)) { return; }

				var isOpen  = expandAll || (openRows[sec.name] === true);
				var hasSubs = sec.sub_heads && sec.sub_heads.length > 0;
				var arrow   = hasSubs ? (isOpen ? '▼' : '▶') : ' ';

				$tb.append(
					'<tr class="cb-row-head ppt-sec-row" data-sec="' + sec.name + '">' +
						'<td><span class="cb-arrow">' + arrow + '</span> ' + sec.name + '</td>' +
						secRowCells(sec.name) +
					'</tr>'
				);

				if (!hasSubs) { return; }

				sec.sub_heads.forEach(function (sub) {
					var subOpen  = expandAll || (openSubs[sec.name + '::' + sub.name] === true);
					var subVis   = isOpen   ? '' : 'display:none;';
					var subArrow = '▶';
					$tb.append(
						'<tr class="cb-row-sub ppt-sub-row ppt-sec-child" ' +
						'data-sec="' + sec.name + '" data-sub="' + sec.name + '::' + sub.name + '" ' +
						'style="' + subVis + '">' +
							'<td style="padding-left:22px;"><span class="cb-arrow">' + subArrow + '</span> ' + sub.name + '</td>' +
							subRowCells(sec.name, sub.name) +
						'</tr>'
					);
				});
			});

			// Grand Total row
			$tb.append(
				'<tr class="cb-row-grand">' +
					'<td style="text-align:left;">GRAND TOTAL</td>' +
					grandRowCells() +
				'</tr>'
			);

			// Sync expand-all checkbox
			var allKeys = struct.map(function (s) { return s.name; });
			var allOpen = allKeys.length > 0 && allKeys.every(function (k) { return openRows[k] === true; });
			$('#ppt-expand-all').prop('checked', expandAll || allOpen);
		}

		/* ─── toggles ────────────────────────────────────────────────────── */
		function toggleSec(sn) {
			var o = !(openRows[sn] === true);
			openRows[sn] = o;
			$('#ppt-tbody .ppt-sec-row[data-sec="' + sn + '"] .cb-arrow').text(o ? '▼' : '▶');
			var $ch = $('#ppt-tbody .ppt-sec-child[data-sec="' + sn + '"]');
			o ? $ch.show() : $ch.hide();
		}

		/* ─── events ─────────────────────────────────────────────────────── */
		function bindEvents() {
			$(document).on('change.ppt', '#ppt-expand-all', function () {
				expandAll = this.checked;
				var struct = buildStruct();
				struct.forEach(function (s) {
					openRows[s.name] = expandAll;
					s.sub_heads.forEach(function (sub) { openSubs[s.name + '::' + sub.name] = expandAll; });
				});
				renderTable();
			});
			$('#tab-ppt').on('click.ppt', '.ppt-sec-row', function (e) {
				e.stopPropagation();
				if (!expandAll) { toggleSec($(this).attr('data-sec')); }
			});
			$(document).on('input.ppt', '#ppt-search', function () { renderTable(); });
			$(document).on('click.ppt', '#ppt-export-btn', function () { exportToExcel(); });
		}

		/* ─── Excel export ───────────────────────────────────────────────── */
		function exportToExcel() {
			if (typeof XLSX === 'undefined') {
				frappe.msgprint('XLSX library not loaded. Please wait a moment and try again.');
				return;
			}
			var struct = buildStruct();
			var headers = ['Expense Head'];
			rawData.forEach(function (e) {
				headers.push(entityLabel(e) + ' ' + pl());
				headers.push(entityLabel(e) + ' ' + el());
			});
			headers.push('Grand Total ' + pl());
			headers.push('Grand Total ' + el());

			var rows = [headers];
			struct.forEach(function (sec) {
				var row = [sec.name];
				rawData.forEach(function (e) { row.push(secPlan(e, sec.name)); row.push(secEst(e, sec.name)); });
				row.push(allPlan(sec.name)); row.push(allEst(sec.name));
				rows.push(row);
				sec.sub_heads.forEach(function (sub) {
					var sr = ['  ' + sub.name];
					rawData.forEach(function (e) { sr.push(subPlan(e, sec.name, sub.name)); sr.push(subEst(e, sec.name, sub.name)); });
					sr.push(allSubPlan(sec.name, sub.name)); sr.push(allSubEst(sec.name, sub.name));
					rows.push(sr);
				});
			});
			var gr = ['GRAND TOTAL'];
			rawData.forEach(function (e) { gr.push(entityPlan(e)); gr.push(entityEst(e)); });
			gr.push(allPlan(null)); gr.push(allEst(null));
			rows.push(gr);

			var ws = XLSX.utils.aoa_to_sheet(rows);
			var colW = [{ wch: 38 }];
			rawData.forEach(function () { colW.push({ wch: 16 }); colW.push({ wch: 16 }); });
			colW.push({ wch: 16 }); colW.push({ wch: 16 });
			ws['!cols'] = colW;
			var wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, 'PPT');
			XLSX.writeFile(wb, 'Foundation_PPT_' + currentFY + '.xlsx');
		}

		/* ─── fetch & render ─────────────────────────────────────────────── */
		function fetchAndRender(fy_val) {
			currentFY   = fy_val;
			rawData     = [];
			openRows    = {};
			openSubs    = {};
			expandAll   = false;
			$('#ppt-expand-all').prop('checked', false);
			$('#ppt-search').val('');

			Loader.show('Loading PPT data...');

			frappe.require(
				'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
				function () {}
			);

			frappe.call({
				method  : 'annual_budget.api.foundation_consolidated_report.format_api',
				args    : { financial_year: fy_val, month: 'March' },
				callback: function (r) {
					if (r.message && Array.isArray(r.message)) {
						rawData = r.message;
					} else {
						frappe.msgprint('Failed to load PPT data.');
					}
					renderTable();
					Loader.hide();
				},
				error: function () {
					Loader.hide();
					frappe.msgprint('Server error loading PPT data.');
				}
			});
		}

		function load(fy_val) {
			if (!bound) { bindEvents(); bound = true; }
			fetchAndRender(fy_val);
		}

		return { load: load };
	})();

	// =============================================================================
	// ANNUAL BUDGET MODULE
	// =============================================================================

	var Annual = (function () {

		var Q_DEFS = {
			q1: { label: 'Quarter 1', months: ['April',   'May',      'June']      },
			q2: { label: 'Quarter 2', months: ['July',    'August',   'September'] },
			q3: { label: 'Quarter 3', months: ['October', 'November', 'December']  },
			q4: { label: 'Quarter 4', months: ['January', 'February', 'March']     }
		};
		var Q_KEYS = ['q1','q2','q3','q4'];
		// ── bound is a closure variable — never reset by TabLoader ──
		var data = [], expandedQ = [], openH = {}, openS = {}, bound = false;

		function sumArr(a) { var t=0; (a||[]).forEach(function(v){t+=(v||0);}); return t; }
		function objTotal(o) { var t=0; Q_KEYS.forEach(function(k){t+=sumArr(o[k]);}); return t; }

		function qCells(obj) {
			var html = '';
			Q_KEYS.forEach(function (k) {
				var vals = obj[k] || [0,0,0];
				if (expandedQ.indexOf(k) !== -1) {
					vals.forEach(function (v) { html += '<td>' + formatINR(v) + '</td>'; });
				} else {
					html += '<td colspan="3">' + formatINR(sumArr(vals)) + '</td>';
				}
			});
			return html;
		}

		function buildHeader() {
			var $t = $('#annual-table thead').empty();
			var $m = $('<tr class="cb-thead-main"></tr>');
			$m.append('<th rowspan="2">Expense Head / Line Item</th>');
			$m.append('<th rowspan="2">GL Code</th>');
			Q_KEYS.forEach(function (k) {
				var o = expandedQ.indexOf(k) !== -1;
				$m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o?1:2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o?'▲':'▼') + '</th>');
			});
			$m.append('<th rowspan="2">Total</th>');
			$t.append($m);
			if (expandedQ.length) {
				var $s = $('<tr class="cb-thead-sub"></tr>');
				Q_KEYS.forEach(function (k) {
					if (expandedQ.indexOf(k) !== -1) { Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); }); }
				});
				$t.append($s);
			}
		}

		// ── renderTable reads openH / openS to decide visibility ──
		// ── Initial render: openH={} so everything starts collapsed ──
		function renderTable() {
			buildHeader();
			var $tb   = $('#annual-table tbody').empty();
			var term  = $('#annual-search').val().trim().toLowerCase();
			var grand = { q1:[0,0,0], q2:[0,0,0], q3:[0,0,0], q4:[0,0,0] };

			data.forEach(function (head, hi) {
				if (term && !matchSearch(head, term)) { return; }
				var hs = String(hi);
				var ho = openH[hs] === true;   // false = collapsed by default
				Q_KEYS.forEach(function (k) { (head[k]||[0,0,0]).forEach(function (v,mi) { grand[k][mi]+=(v||0); }); });

				// Head row — always visible
				$tb.append(
					'<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '" style="cursor:pointer;">' +
						'<td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name.trim() + '</td>' +
						'<td>-</td>' + qCells(head) +
						'<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td>' +
					'</tr>'
				);

				// Sub-heads — hidden when head collapsed
				(head.sub_heads||[]).forEach(function (sub, si) {
					var sk = hs+'-'+si;
					var so = openS[sk] === true;   // false = collapsed by default
					$tb.append(
						'<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + 'cursor:pointer;">' +
							'<td style="padding-left:20px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td>' +
							'<td>-</td>' + qCells(sub) +
							'<td>' + formatINR(objTotal(sub)) + '</td>' +
						'</tr>'
					);
					// Sub-items — hidden unless both head & sub are open
					(sub.items||[]).forEach(function (item) {
						$tb.append(
							'<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho&&so)?'':'display:none;') + '">' +
								'<td style="padding-left:40px;">' + item.name + '</td>' +
								'<td>' + (item.gl_code||'-') + '</td>' + qCells(item) +
								'<td>' + formatINR(objTotal(item)) + '</td>' +
							'</tr>'
						);
					});
				});

				// Direct items under head — hidden when head collapsed
				(head.items||[]).forEach(function (d) {
					$tb.append(
						'<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '">' +
							'<td style="padding-left:35px;">' + d.name + '</td>' +
							'<td>' + (d.gl_code||'-') + '</td>' + qCells(d) +
							'<td>' + formatINR(objTotal(d)) + '</td>' +
						'</tr>'
					);
				});
			});

			var gt = 0; Q_KEYS.forEach(function (k) { gt += sumArr(grand[k]); });
			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td><td>-</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
		}

		// ── Toggle helpers: update state then re-render ──
		// (re-render is the safest approach — no stale DOM state possible)
		function toggleHead(hs) {
			openH[hs] = !(openH[hs] === true);
			// When collapsing a head, also collapse all its sub-heads
			if (!openH[hs]) {
				data.forEach(function (h, hi) {
					if (String(hi) !== hs) { return; }
					(h.sub_heads||[]).forEach(function (_, si) { openS[hs+'-'+si] = false; });
				});
			}
			renderTable();
		}

		function toggleSub(hs, ss) {
			var sk = hs+'-'+ss;
			openS[sk] = !(openS[sk] === true);
			renderTable();
		}

		function matchSearch(head, term) {
			if (!term) { return true; }
			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
			var subs = head.sub_heads||[];
			for (var s=0; s<subs.length; s++) {
				if (subs[s].name.toLowerCase().indexOf(term) !== -1) { return true; }
				for (var i=0; i<(subs[s].items||[]).length; i++) {
					if ((subs[s].items[i].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
					if ((subs[s].items[i].gl_code||'').toLowerCase().indexOf(term) !== -1) { return true; }
				}
			}
			for (var d=0; d<(head.items||[]).length; d++) {
				if ((head.items[d].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
				if ((head.items[d].gl_code||'').toLowerCase().indexOf(term) !== -1) { return true; }
			}
			return false;
		}

		// ── bindEvents uses namespaced events + bound flag ──
		// ── so it fires exactly once, even across FY changes  ──
		function bindEvents() {
			// Search
			$(document).on('input.annual', '#annual-search', function () { renderTable(); });

			// Expand Quarters checkbox
			$(document).on('change.annual', '#annual-expand-quarters', function () {
				expandedQ = this.checked ? Q_KEYS.slice() : [];
				renderTable();
			});

			// Expand Line Items checkbox
			$(document).on('change.annual', '#annual-expand-items', function () {
				if (this.checked) {
					data.forEach(function (h, hi) {
						openH[String(hi)] = true;
						(h.sub_heads||[]).forEach(function (_, si) { openS[hi+'-'+si] = true; });
					});
				} else {
					// Collapse everything
					openH = {}; openS = {};
				}
				renderTable();
			});

			// Quarter column header click (expand single quarter)
			$(document).on('click.annual', '#annual-table .cb-q-header', function () {
				var k = String($(this).attr('data-quarter'));
				var idx = expandedQ.indexOf(k);
				if (idx !== -1) { expandedQ.splice(idx,1); } else { expandedQ.push(k); }
				// Sync checkbox
				$('#annual-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length);
				renderTable();
			});

			// ── Head row click — delegated on the tab container ──
			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) {
				e.stopPropagation();
				toggleHead(String($(this).attr('data-hi')));
			});

			// ── Sub-head row click ──
			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub', function (e) {
				e.stopPropagation();
				toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si')));
			});
		}

		function fetchAndRender(fy) {
			// Reset state — always start collapsed
			data=[]; openH={}; openS={}; expandedQ=[];
			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
			$('#annual-search').val('');
			Loader.show('Loading Annual Budget...');
			frappe.call({
				method  : 'annual_budget.api.phase_sheet.get_consolidated_report',
				args    : { financial_year: fy },
				callback: function (r) { data = r.message||[]; renderTable(); Loader.hide(); },
				error   : function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
			});
		}

		function load(fy) {
			// bound is a closure variable — never reset externally
			if (!bound) { bindEvents(); bound = true; }
			fetchAndRender(fy);
		}
		return { load: load };
	})();

	// =============================================================================
	// ESTIMATE MODULE  — with Expand Quarters + Expand Line Items checkboxes
	// =============================================================================

	var Estimate = (function () {

		var Q_DEFS = {
			q1: { label: 'Quarter 1', months: ['April',   'May',      'June']      },
			q2: { label: 'Quarter 2', months: ['July',    'August',   'September'] },
			q3: { label: 'Quarter 3', months: ['October', 'November', 'December']  },
			q4: { label: 'Quarter 4', months: ['January', 'February', 'March']     }
		};
		var Q_KEYS = ['q1','q2','q3','q4'];
		var Q_IDX  = { q1:[0,1,2], q2:[3,4,5], q3:[6,7,8], q4:[9,10,11] };
		var data=[],expandedQ=[],openH={},openS={},bound=false;

		function getMth(obj) {
			var m = obj.months||{};
			return [
				parseFloat(m['4']||0),  parseFloat(m['5']||0),  parseFloat(m['6']||0),
				parseFloat(m['7']||0),  parseFloat(m['8']||0),  parseFloat(m['9']||0),
				parseFloat(m['10']||0), parseFloat(m['11']||0), parseFloat(m['12']||0),
				parseFloat(m['1']||0),  parseFloat(m['2']||0),  parseFloat(m['3']||0)
			];
		}
		function qTot(obj) { return [parseFloat(obj['Q1']||0), parseFloat(obj['Q2']||0), parseFloat(obj['Q3']||0), parseFloat(obj['Q4']||0)]; }
		function yTot(obj) { var q=qTot(obj); return q[0]+q[1]+q[2]+q[3]; }

		function qCells(obj) {
			var mths=getMth(obj), qtots=qTot(obj), html='';
			Q_KEYS.forEach(function (q, qi) {
				if (expandedQ.indexOf(q) !== -1) {
					Q_IDX[q].forEach(function (mi) { html += '<td>' + formatINR(mths[mi]) + '</td>'; });
				} else {
					html += '<td colspan="3">' + formatINR(qtots[qi]) + '</td>';
				}
			});
			return html;
		}

		function buildHeader() {
			var $t = $('#estimate-table thead').empty();
			var $m = $('<tr class="cb-thead-main"></tr>');
			$m.append('<th rowspan="2">Expense</th>');
			Q_KEYS.forEach(function (k) {
				var o = expandedQ.indexOf(k) !== -1;
				$m.append('<th class="est-q-toggle" data-q="' + k + '" colspan="3" rowspan="' + (o?1:2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o?'▲':'▼') + '</th>');
			});
			$m.append('<th rowspan="2">Total</th>');
			$t.append($m);
			if (expandedQ.length) {
				var $s = $('<tr class="cb-thead-sub"></tr>');
				Q_KEYS.forEach(function (k) {
					if (expandedQ.indexOf(k) !== -1) { Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); }); }
				});
				$t.append($s);
			}
		}

		function renderTable() {
			buildHeader();
			var $tb  = $('#estimate-tbody').empty();
			var term = $('#estimate-search').val().trim().toLowerCase();
			if (!Array.isArray(data)||!data.length) {
				$tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
				return;
			}
			var gM=[0,0,0,0,0,0,0,0,0,0,0,0], gQ=[0,0,0,0];

			data.forEach(function (head, hi) {
				if (term && !matchSearch(head, term)) { return; }
				getMth(head).forEach(function (v,i) { gM[i]+=v; });
				qTot(head).forEach(function  (v,i) { gQ[i]+=v; });
				var hs=String(hi), ho=openH[hs];

				$tb.append('<tr class="cb-row-head cb-est-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name + '</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(yTot(head)) + '</td></tr>');

				(head.items||[]).forEach(function (item) {
					$tb.append('<tr class="cb-est-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '"><td style="padding-left:30px;">' + item.name + (item.gl_code?' ('+item.gl_code+')':'') + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>');
				});

				(head.sub_heads||[]).forEach(function (sub, si) {
					var sk=hs+'-'+si, so=openS[sk];
					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + '"><td style="padding-left:20px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td>' + qCells(sub) + '<td>' + formatINR(yTot(sub)) + '</td></tr>');
					(sub.items||[]).forEach(function (item) {
						$tb.append('<tr class="cb-est-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho&&so)?'':'display:none;') + '"><td style="padding-left:45px;">' + item.name + (item.gl_code?' ('+item.gl_code+')':'') + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>');
					});
				});
			});

			var gO = { Q1:gQ[0],Q2:gQ[1],Q3:gQ[2],Q4:gQ[3], months:{'4':gM[0],'5':gM[1],'6':gM[2],'7':gM[3],'8':gM[4],'9':gM[5],'10':gM[6],'11':gM[7],'12':gM[8],'1':gM[9],'2':gM[10],'3':gM[11]} };
			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(gO) + '<td>' + formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3]) + '</td></tr>');
		}

		function toggleHead(hs) {
			var o = !openH[hs]; openH[hs] = o;
			$('#estimate-table tbody .cb-est-head[data-hi="' + hs + '"]').find('.cb-arrow').text(o?'▼':'▶');
			if (o) {
				$('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').show();
				$('#estimate-table tbody .cb-est-head-item[data-hi="' + hs + '"]').show();
				$('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () {
					var si = $(this).attr('data-si');
					if (openS[hs+'-'+si]) { $('#estimate-table tbody .cb-est-sub-item[data-hi="' + hs + '"][data-si="' + si + '"]').show(); }
				});
			} else {
				$('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () { var si=$(this).attr('data-si'); openS[hs+'-'+si]=false; $(this).find('.cb-arrow').text('▶'); });
				$('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"],.cb-est-sub-item[data-hi="' + hs + '"],.cb-est-head-item[data-hi="' + hs + '"]').hide();
			}
		}
		function toggleSub(hs, ss) {
			var sk=hs+'-'+ss, o=!openS[sk]; openS[sk]=o;
			$('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"][data-si="' + ss + '"]').find('.cb-arrow').text(o?'▼':'▶');
			var $i = $('#estimate-table tbody .cb-est-sub-item[data-hi="' + hs + '"][data-si="' + ss + '"]');
			o ? $i.show() : $i.hide();
		}
		function matchSearch(head, term) {
			if (!term) { return true; }
			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
			for (var s=0; s<(head.sub_heads||[]).length; s++) {
				if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; }
				for (var i=0; i<(head.sub_heads[s].items||[]).length; i++) {
					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
					if ((head.sub_heads[s].items[i].gl_code||'').toLowerCase().indexOf(term) !== -1) { return true; }
				}
			}
			for (var d=0; d<(head.items||[]).length; d++) {
				if ((head.items[d].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
				if ((head.items[d].gl_code||'').toLowerCase().indexOf(term) !== -1) { return true; }
			}
			return false;
		}

		function bindEvents() {
			// Column header click (toggle single quarter)
			$(document).on('click.estimate', '#estimate-table .est-q-toggle', function () {
				var k=String($(this).attr('data-q')), idx=expandedQ.indexOf(k);
				if (idx !== -1) { expandedQ.splice(idx,1); } else { expandedQ.push(k); }
				$('#estimate-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length);
				renderTable();
			});

			// Expand Quarters checkbox
			$(document).on('change.estimate', '#estimate-expand-quarters', function () {
				expandedQ = this.checked ? Q_KEYS.slice() : [];
				renderTable();
			});

			// Expand Line Items checkbox
			$(document).on('change.estimate', '#estimate-expand-items', function () {
				if (this.checked) {
					data.forEach(function (h, hi) {
						openH[String(hi)] = true;
						(h.sub_heads||[]).forEach(function (_, si) { openS[hi+'-'+si] = true; });
					});
				} else {
					openH = {}; openS = {};
				}
				renderTable();
			});

			// Row clicks — delegated on tab container (safe, no duplicates)
			$('#tab-estimate').on('click.estimate', '.cb-est-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
			$('#tab-estimate').on('click.estimate', '.cb-est-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
			$(document).on('input.estimate', '#estimate-search', function () { renderTable(); });
		}

		function fetchAndRender(fy) {
			data=[]; openH={}; openS={}; expandedQ=[];
			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked', false);
			var year = (fy||'2025-26').split('-')[0];
			Loader.show('Loading Estimate...');
			frappe.call({
				method  : 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
				args    : { fiscal_year: year, accounting_period: '12' },
				callback: function (r) {
					if (r.message && r.message.status === 'success') { data = r.message.data||[]; }
					else { frappe.msgprint('Failed to load Estimate data.'); }
					renderTable(); Loader.hide();
				},
				error: function () { Loader.hide(); frappe.msgprint('Server error loading Estimate data.'); }
			});
		}

		function load(fy) { if (!bound) { bindEvents(); bound=true; } fetchAndRender(fy); }
		return { load: load };
	})();


	// =============================================================================
	// BUDGET & ESTIMATE MODULE
	// =============================================================================

	var BudgetEstimate = (function () {

		var rawData     = [];
		var currentFY   = '';
		var openSec     = {};
		var openSub     = {};
		var expandItems = false;
		var bound       = false;

		function pl() { return getFYLabels(currentFY).plan; }
		function el() { return getFYLabels(currentFY).est;  }
		function entityLabel(entry) { return (entry.label || '').trim(); }

		function buildStruct() {
			if (!rawData.length) { return []; }
			return (rawData[0].actuals || []).map(function (sec) {
				return {
					name     : sec.name,
					sub_heads: (sec.sub_heads || []).map(function (sub) {
						return {
							name : sub.name,
							items: (sub.items || []).map(function (i) {
								return { name: i.name, gl_code: i.gl_code || '' };
							})
						};
					}),
					items: (sec.items || []).map(function (i) {
						return { name: i.name, gl_code: i.gl_code || '' };
					})
				};
			});
		}

		function itemVal(entry, itemName, field) {
			var v = 0;
			(entry.actuals || []).forEach(function (sec) {
				(sec.items || []).forEach(function (i) {
					if (i.name === itemName) { v += parseFloat(i[field] || 0); }
				});
				(sec.sub_heads || []).forEach(function (sub) {
					(sub.items || []).forEach(function (i) {
						if (i.name === itemName) { v += parseFloat(i[field] || 0); }
					});
				});
			});
			return v;
		}
		function subVal(entry, secName, subName, field) {
			var v = 0;
			(entry.actuals || []).forEach(function (sec) {
				if (sec.name !== secName) { return; }
				(sec.sub_heads || []).forEach(function (sub) {
					if (sub.name !== subName) { return; }
					v += parseFloat(field === 'plan' ? (sub.ytd || 0) : (sub.total_posted_amt_ytd || 0));
				});
			});
			return v;
		}
		function secVal(entry, secName, field) {
			var v = 0;
			(entry.actuals || []).forEach(function (sec) {
				if (sec.name !== secName) { return; }
				v += parseFloat(field === 'plan' ? (sec.ytd || 0) : (sec.total_posted_amt_ytd || 0));
			});
			return v;
		}
		function grandVal(entry, field) {
			var v = 0;
			(entry.actuals || []).forEach(function (sec) {
				v += parseFloat(field === 'plan' ? (sec.ytd || 0) : (sec.total_posted_amt_ytd || 0));
			});
			return v;
		}

		function itemCells(name) {
			var h = '';
			rawData.forEach(function (e) {
				h += '<td>' + formatINR(itemVal(e, name, 'ytd'))              + '</td>';
				h += '<td>' + formatINR(itemVal(e, name, 'total_posted_amt')) + '</td>';
			});
			return h;
		}
		function subCells(sn, subn) {
			var h = '';
			rawData.forEach(function (e) {
				h += '<td class="cb-text-accent">' + formatINR(subVal(e, sn, subn, 'plan')) + '</td>';
				h += '<td class="cb-text-accent">' + formatINR(subVal(e, sn, subn, 'est'))  + '</td>';
			});
			return h;
		}
		function secCells(sn) {
			var h = '';
			rawData.forEach(function (e) {
				h += '<td style="font-weight:700;">' + formatINR(secVal(e, sn, 'plan')) + '</td>';
				h += '<td style="font-weight:700;">' + formatINR(secVal(e, sn, 'est'))  + '</td>';
			});
			return h;
		}
		function grandCells() {
			var h = '';
			rawData.forEach(function (e) {
				h += '<td>' + formatINR(grandVal(e, 'plan')) + '</td>';
				h += '<td>' + formatINR(grandVal(e, 'est'))  + '</td>';
			});
			return h;
		}
		function itemTotalPlan(name)       { var v=0; rawData.forEach(function(e){v+=itemVal(e,name,'ytd');}); return v; }
		function itemTotalEst(name)        { var v=0; rawData.forEach(function(e){v+=itemVal(e,name,'total_posted_amt');}); return v; }
		function subTotalPlan(sn,subn)     { var v=0; rawData.forEach(function(e){v+=subVal(e,sn,subn,'plan');}); return v; }
		function subTotalEst(sn,subn)      { var v=0; rawData.forEach(function(e){v+=subVal(e,sn,subn,'est');}); return v; }
		function secTotalPlan(sn)          { var v=0; rawData.forEach(function(e){v+=secVal(e,sn,'plan');}); return v; }
		function secTotalEst(sn)           { var v=0; rawData.forEach(function(e){v+=secVal(e,sn,'est');}); return v; }
		function allGrandPlan()            { var v=0; rawData.forEach(function(e){v+=grandVal(e,'plan');}); return v; }
		function allGrandEst()             { var v=0; rawData.forEach(function(e){v+=grandVal(e,'est');}); return v; }

		function totalCell2(plan, est, cls) {
			cls = cls || '';
			return '<td class="be-total-plan ' + cls + '" style="font-weight:700;">' + formatINR(plan) + '</td>' +
			       '<td class="be-total-est '  + cls + '" style="font-weight:700;">' + formatINR(est)  + '</td>';
		}

		function buildHeader() {
			var $t = $('#be-table thead').empty();
			var $r1 = $('<tr class="cb-thead-main"></tr>');
			var $r2 = $('<tr class="cb-thead-sub"></tr>');
			$r1.append(
				'<th rowspan="2" style="text-align:left;min-width:280px;' +
				'position:sticky;left:0;z-index:40;background:#0076B6;">' +
				'Expense Head / Line Item</th>'
			);
			rawData.forEach(function (e) {
				$r1.append('<th colspan="2" style="text-align:center;">' + entityLabel(e) + '</th>');
			});
			$r1.append('<th colspan="2" style="text-align:center;background:#003B63;">Grand Total</th>');
			rawData.forEach(function () {
				$r2.append('<th style="text-align:center;min-width:140px;">' + pl() + '</th>');
				$r2.append('<th style="text-align:center;min-width:140px;">' + el() + '</th>');
			});
			$r2.append('<th style="text-align:center;min-width:140px;background:#004F8B;">' + pl() + '</th>');
			$r2.append('<th style="text-align:center;min-width:140px;background:#004F8B;">' + el() + '</th>');
			$t.append($r1).append($r2);
		}

		function renderTable() {
			buildHeader();
			var $tb    = $('#be-tbody').empty();
			var term   = $('#be-search').val().trim().toLowerCase();
			var struct = buildStruct();
			var cols   = 1 + rawData.length * 2 + 2;

			if (!rawData.length || !struct.length) {
				$tb.append('<tr><td colspan="' + cols + '" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
				return;
			}

			struct.forEach(function (sec) {
				var sn      = sec.name;
				var secOpen = openSec[sn] !== false;
				var secVis  = secOpen ? '' : 'display:none;';

				$tb.append(
					'<tr class="cb-row-head be-sec-row" data-sec="' + sn + '">' +
						'<td style="text-align:left;">' +
							'<span class="cb-arrow">' + (secOpen ? '▼' : '▶') + '</span> ' + sn +
						'</td>' +
						secCells(sn) +
						totalCell2(secTotalPlan(sn), secTotalEst(sn), 'be-grand-col') +
					'</tr>'
				);

				sec.sub_heads.forEach(function (sub) {
					var sk      = sn + '::' + sub.name;
					var subOpen = expandItems || (openSub[sk] === true);
					var subVis  = secOpen ? '' : 'display:none;';
					var itmVis  = (secOpen && subOpen) ? '' : 'display:none;';

					$tb.append(
						'<tr class="cb-row-sub be-sec-child be-sub-row" ' +
						'data-sec="' + sn + '" data-sub="' + sk + '" style="' + subVis + '">' +
							'<td style="padding-left:22px;text-align:left;">' +
								'<span class="cb-arrow">' + (subOpen ? '▼' : '▶') + '</span> ' + sub.name +
							'</td>' +
							subCells(sn, sub.name) +
							totalCell2(subTotalPlan(sn, sub.name), subTotalEst(sn, sub.name), 'be-grand-col') +
						'</tr>'
					);

					sub.items.forEach(function (item) {
						if (term &&
							item.name.toLowerCase().indexOf(term) === -1 &&
							item.gl_code.toLowerCase().indexOf(term) === -1) { return; }
						$tb.append(
							'<tr class="be-item-row be-sec-child be-sub-child" ' +
							'data-sec="' + sn + '" data-sub="' + sk + '" style="' + itmVis + '">' +
								'<td style="padding-left:42px;text-align:left;">' +
									item.name +
									(item.gl_code ? ' <span style="color:#aaa;font-size:11px;">(' + item.gl_code + ')</span>' : '') +
								'</td>' +
								itemCells(item.name) +
								totalCell2(itemTotalPlan(item.name), itemTotalEst(item.name), 'be-grand-col') +
							'</tr>'
						);
					});
				});

				sec.items.forEach(function (item) {
					if (term &&
						item.name.toLowerCase().indexOf(term) === -1 &&
						item.gl_code.toLowerCase().indexOf(term) === -1) { return; }
					$tb.append(
						'<tr class="be-item-row be-sec-child be-direct-item" ' +
						'data-sec="' + sn + '" style="' + secVis + '">' +
							'<td style="padding-left:30px;text-align:left;">' +
								item.name +
								(item.gl_code ? ' <span style="color:#aaa;font-size:11px;">(' + item.gl_code + ')</span>' : '') +
							'</td>' +
							itemCells(item.name) +
							totalCell2(itemTotalPlan(item.name), itemTotalEst(item.name), 'be-grand-col') +
						'</tr>'
					);
				});
			});

			$tb.append(
				'<tr class="cb-row-grand">' +
					'<td style="text-align:left;">GRAND TOTAL</td>' +
					grandCells() +
					totalCell2(allGrandPlan(), allGrandEst(), 'be-grand-col') +
				'</tr>'
			);
		}

		function toggleSec(sn) {
			var o = !(openSec[sn] !== false);
			openSec[sn] = o;
			$('#be-table tbody .be-sec-row[data-sec="' + sn + '"]').find('.cb-arrow').text(o ? '▼' : '▶');
			var $ch = $('#be-table tbody .be-sec-child[data-sec="' + sn + '"]');
			if (o) {
				$ch.filter('.be-sub-row,.be-direct-item').show();
				$ch.filter('.be-sub-child').each(function () {
					var sk = $(this).attr('data-sub');
					if (expandItems || openSub[sk] === true) { $(this).show(); }
				});
			} else { $ch.hide(); }
		}

		function toggleSubRow(sk) {
			var o = !(openSub[sk] === true);
			openSub[sk] = o;
			$('#be-table tbody .be-sub-row[data-sub="' + sk + '"]').find('.cb-arrow').text(o ? '▼' : '▶');
			var $it = $('#be-table tbody .be-sub-child[data-sub="' + sk + '"]');
			o ? $it.show() : $it.hide();
		}

		function bindEvents() {
			$('#tab-budget_estimate').on('click.be', '.be-sec-row', function (e) {
				e.stopPropagation();
				toggleSec($(this).attr('data-sec'));
			});
			$('#tab-budget_estimate').on('click.be', '.be-sub-row', function (e) {
				e.stopPropagation();
				if (!expandItems) { toggleSubRow($(this).attr('data-sub')); }
			});
			$(document).on('change.be', '#be-expand-items', function () {
				expandItems = this.checked;
				buildStruct().forEach(function (sec) {
					openSec[sec.name] = expandItems ? true : false;
					sec.sub_heads.forEach(function (sub) {
						openSub[sec.name + '::' + sub.name] = expandItems;
					});
				});
				renderTable();
			});
			$(document).on('input.be', '#be-search', function () { renderTable(); });
		}

		function fetchAndRender(fy) {
			currentFY   = fy;
			rawData     = [];
			openSec     = {};
			openSub     = {};
			expandItems = false;
			$('#be-expand-items').prop('checked', false);

			Loader.show('Loading Budget & Estimate...');
			frappe.call({
				method  : 'annual_budget.api.foundation_consolidated_report.format_api',
				args    : { financial_year: fy, month: 'March' },
				callback: function (r) {
					if (r.message && Array.isArray(r.message)) {
						rawData = r.message;
					} else {
						frappe.msgprint('Failed to load Budget & Estimate data.');
					}
					renderTable();
					Loader.hide();
				},
				error: function () {
					Loader.hide();
					frappe.msgprint('Server error loading Budget & Estimate data.');
				}
			});
		}

		function load(fy) {
			if (!bound) { bindEvents(); bound = true; }
			fetchAndRender(fy);
		}

		return { load: load };
	})();

	// =============================================================================
	// AUTO-LOAD ACTIVE TAB ON PAGE OPEN
	// =============================================================================

	var initialFY = fyControl.get_value();
	if (initialFY) { TabLoader.trigger('ppt'); }

};