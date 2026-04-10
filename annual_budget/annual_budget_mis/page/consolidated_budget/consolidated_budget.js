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
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var parts     = (fy || '2025-26').split('-');
// 		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
// 		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
// 		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
// 		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
// 		return {
// 			plan : 'FY' + startYY + '-' + endYY    + ' Plan',
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
// 		'#cb-tab-nav{border-bottom:1px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
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
// 		'.cb-export-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;font-size:13px;font-weight:600;color:#fff;background:#0076B6;border:1px solid #0076B6;border-radius:6px;cursor:pointer;white-space:nowrap;transition:background .15s;box-shadow:0 1px 3px rgba(0,0,0,.12);}' +
// 		'.cb-export-btn:hover{background:#005f94;border-color:#005f94;}' +

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

// 		/* ── PPT TAB – clean report table ── */
// 		'.ppt-title-bar{margin-bottom:2px;}' +
// 		'.ppt-main-title{font-size:12px;font-weight:700;text-transform:uppercase;text-decoration:underline;letter-spacing:.3px;color:#111;margin-bottom:4px;}' +
// 		'.ppt-currency-label{font-size:11px;font-style:italic;color:#111;text-align:right;margin-bottom:2px;}' +
// 		'#ppt-table{border-collapse:collapse;width:100%;font-size:12px;font-family:Arial,sans-serif;border:1px solid #999;}' +
// 		'#ppt-table thead tr.ppt-hdr1 th{background:#fff;text-align:center;font-weight:700;padding:6px 10px 4px;border:1px solid #999;color:#111;}' +
// 		'#ppt-table thead tr.ppt-hdr2 th{background:#fff;text-align:center;font-weight:700;padding:4px 10px;border-left:1px dotted #aaa;border-right:1px dotted #aaa;border-bottom:1px dotted #aaa;border-top:none;color:#111;min-width:90px;}' +
// 		'#ppt-table thead tr.ppt-hdr2 th.ppt-unit-sub{border-left:1px solid #999;border-right:1px solid #999;}' +
// 		'#ppt-table thead tr.ppt-hdr2 th.ppt-est-first{border-left:1px solid #999 !important;}' +
// 		'#ppt-table thead tr.ppt-hdr2 th.ppt-est-last{border-right:1px solid #999 !important;}' +
// 		'#ppt-table thead tr.ppt-hdr2 th.ppt-bgt-last{border-right:1px solid #999 !important;}' +
// 		'#ppt-table tbody td{padding:5px 10px;border-bottom:1px dotted #aaa;text-align:right;white-space:nowrap;color:#111;border-left:none;border-right:none;}' +
// 		'#ppt-table tbody td:first-child{text-align:left;border-left:1px solid #999;min-width:160px;}' +
// 		'#ppt-table tbody td:last-child{border-right:1px solid #999;}' +
// 		'#ppt-table tbody td.ppt-sep-left{border-left:1px solid #999 !important;}' +
// 		'#ppt-table tbody td.ppt-grp-sep{border-left:1px solid #999 !important;}' +
// 		'#ppt-table tbody tr.ppt-total-row td{font-weight:700;border-bottom:1px solid #999 !important;}' +
// 		'#ppt-table tbody tr.ppt-total-row td:first-child{border-left:1px solid #999;}' +
// 		'#ppt-table tbody tr.ppt-total-row td:last-child{border-right:1px solid #999;}' +
// 		'.ppt-dash{color:#555;text-align:center;display:block;}' +

// 		/* BE sticky first column */
// 		'#be-table td:first-child{position:sticky;left:0;z-index:10;background:inherit;}' +
// 		'#be-table .cb-thead-main th:first-child{position:sticky;left:0;z-index:20;background:#0076B6;}' +
// 		'#be-table .cb-thead-sub th{left:auto !important;}' +
// 		'#be-table .cb-row-head td:first-child{background:#E9F4FB;}' +
// 		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6;}' +
// 		'#be-table .cb-row-grand td:first-child{background:#0076B6;}' +
// 		'#be-table .be-item-row td:first-child{background:#fff;}' +
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

// 	function fmtDash(v) {
// 		var n = parseFloat(v) || 0;
// 		return n === 0
// 			? '<span class="ppt-dash">-</span>'
// 			: n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

// 				/* ── PPT TAB ── */
// 				'<div class="cb-tab-pane active" id="tab-ppt">' +
// 					'<div class="ppt-title-bar">' +
// 						'<div class="ppt-main-title" id="ppt-main-title">Overall Foundation Numbers – Budget vs. Est</div>' +
// 					'</div>' +

// 					'<div class="ppt-currency-label">₹ Cr.</div>' +

// 					'<div class="cb-controls">' +
// 						'<input type="text" id="ppt-search" class="cb-search-input" placeholder="Search unit...">' +
// 						'<button class="cb-export-btn" id="ppt-export-btn">↓ Export to Excel</button>' +
// 					'</div>' +

// 					'<div class="cb-scroll-wrapper">' +

// 						'<table id="ppt-table" class="cb-table">' +

// 							'<thead>' +

// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;text-align:center;">Unit</th>' +
// 									'<th colspan="3">Budget</th>' +
// 									'<th colspan="3">Estimate</th>' +
// 								'</tr>' +

// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th>' +
// 									'<th>Capex</th>' +
// 									'<th>Total</th>' +
// 									'<th>Opex</th>' +
// 									'<th>Capex</th>' +
// 									'<th>Total</th>' +
// 								'</tr>' +

// 							'</thead>' +

// 							'<tbody id="ppt-tbody"></tbody>' +

// 						'</table>' +

// 					'</div>' +
// 				'</div>'+

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

// 				/* ESTIMATE — added Expand Quarters + Expand Line Items checkboxes */
// 				'<div class="cb-tab-pane" id="tab-estimate">' +
// 					'<div class="cb-controls">' +
// 						'<input type="text" id="estimate-search" class="cb-search-input" placeholder="Search Expense / Item / GL Code...">' +
// 						'<div class="cb-checkbox-area">' +
// 							'<label><input type="checkbox" id="estimate-expand-quarters"> Expand Quarters</label>' +
// 							'<label><input type="checkbox" id="estimate-expand-items"> Expand Line Items</label>' +
// 						'</div>' +
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

// 	// var fyControl = frappe.ui.form.make_control({
// 	// 	parent: $fyColumn,
// 	// 	df: {
// 	// 		label    : 'Financial Year',
// 	// 		fieldtype: 'Select',
// 	// 		fieldname: 'financial_year',
// 	// 		reqd     : 1,
// 	// 		change   : function () {
// 	// 			var y = this.get_value();
// 	// 			if (!y) { return; }
// 	// 			updatePageTitle(y);
// 	// 			TabLoader.resetAll();
// 	// 			var activeTab = $('#cb-tab-nav .cb-tab-link.active').data('tab');
// 	// 			if (activeTab) { TabLoader.trigger(activeTab); }
// 	// 		}
// 	// 	},
// 	// 	render_input: true
// 	// });
// 	// fyControl.refresh();

// 	// frappe.call({
// 	// 	method  : 'frappe.client.get_list',
// 	// 	args    : { doctype: 'Financial Year List', fields: ['name'], order_by: 'name desc', limit_page_length: 100 },
// 	// 	callback: function (r) {
// 	// 		if (r.message && r.message.length) {
// 	// 			var names = r.message.map(function (x) { return x.name; });
// 	// 			fyControl.df.options = names.join('\n');
// 	// 			fyControl.refresh();
// 	// 			fyControl.set_value(names[0]);
// 	// 			updatePageTitle(names[0]);
// 	// 		}
// 	// 	}
// 	// });
// 			// ---------- Financial Year Filter ----------
// 	var fyControl = frappe.ui.form.make_control({
// 		parent: $fyColumn,
// 		df: {
// 			label: 'Financial Year',
// 			fieldtype: 'Select',
// 			fieldname: 'financial_year',
// 			reqd: 1,
// 			change: function () {

// 				var y = this.get_value();
// 				if (!y) return;

// 				updatePageTitle(y);
// 				TabLoader.resetAll();

// 				var activeTab = $('#cb-tab-nav .cb-tab-link.active').data('tab');
// 				if (activeTab) {
// 					TabLoader.trigger(activeTab);
// 				}
// 			}
// 		},
// 		render_input: true
// 	});

// 	fyControl.refresh();


// 	// ---------- Fetch Financial Years ----------
// 	frappe.call({
// 		method: "annual_budget.api.filter_options.get_financial_year_list",
// 		callback: function (r) {

// 			if (r.message && r.message.length) {

// 				let years = r.message.map(d => d.financial_year);

// 				// set dropdown options
// 				fyControl.df.options = years.join("\n");
// 				fyControl.refresh();


// 				// ---------- Detect Current Financial Year ----------
// 				let today = new Date();
// 				let year = today.getFullYear();
// 				let month = today.getMonth() + 1;

// 				let currentFY;

// 				if (month >= 4) {
// 					currentFY = year + "-" + String(year + 1).slice(-2);
// 				} else {
// 					currentFY = (year - 1) + "-" + String(year).slice(-2);
// 				}


// 				// ---------- Set Default Value ----------
// 				if (years.includes(currentFY)) {
// 					fyControl.set_value(currentFY);
// 					updatePageTitle(currentFY);
// 				} else {
// 					// fallback to latest FY
// 					fyControl.set_value(years[0]);
// 					updatePageTitle(years[0]);
// 				}
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
// 			ppt            : function (fy) { PPT.load(fy);            },
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
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {

// 		var currentFY = '';
// 		var bound     = false;

// 		// ── FY label helpers ────────────────────────────────────────────────────
// 		function budgetLabel(fy) {
// 			var parts = (fy || '2026-27').split('-');
// 			return (parts[0] || '2026') + '-' + (parts[1] ? parts[1].slice(-2) : '27') + '  Budget';
// 		}
// 		function estLabel(fy) {
// 			var parts = (fy || '2026-27').split('-');
// 			var sy = parseInt(parts[0] || '2026', 10) - 1;
// 			var ey = parseInt(parts[1] || '27',   10) - 1;
// 			return sy + '-' + String(ey).padStart(2,'0') + ' Est';
// 		}

// 		// ── Test data ────────────────────────────────────────────────────────────
// 		// TODO: replace with API – format_api returns this structure per entity.
// 		// For the flat PPT view, data shape is:
// 		//   [ { name, isTotal, isGrand, bOpex, bCapex, eOpex, eCapex } ]
// 		// where bTotal = bOpex + bCapex, eTotal = eOpex + eCapex
// 		var TEST_ROWS = [
// 			{ name: 'Education',       bOpex: 45.20, bCapex:  8.50, eOpex: 42.10, eCapex:  7.80 },
// 			{ name: 'Health',          bOpex: 32.15, bCapex:  5.25, eOpex: 30.20, eCapex:  4.90 },
// 			{ name: 'Livelihoods',     bOpex: 28.60, bCapex:  3.40, eOpex: 27.30, eCapex:  3.10 },
// 			{ name: 'University',      bOpex: 18.75, bCapex: 12.60, eOpex: 17.50, eCapex: 11.20 },
// 			{ name: 'Philanthropy',    bOpex: 15.40, bCapex:  0.80, eOpex: 14.90, eCapex:  0.70 },
// 			{ name: 'New Initiatives', bOpex:  8.20, bCapex:  2.10, eOpex:  6.50, eCapex:  1.80 },
// 			{ name: 'Enablers',        bOpex: 22.30, bCapex:  4.50, eOpex: 21.10, eCapex:  4.20 },
// 			{ name: '__SUB__',   isTotal: true,  label: 'Total' },
// 			{ name: 'Covid-19',        bOpex:  2.50, bCapex:  0.00, eOpex:  3.10, eCapex:  0.00 },
// 			{ name: '__GRAND__', isGrand: true,  label: 'Total' }
// 		];

// 		// ── Number formatter ────────────────────────────────────────────────────
// 		function fmt(v) {
// 			if (!v || v === 0) { return '<span class="ppt-dash">-</span>'; }
// 			return parseFloat(v).toFixed(2);
// 		}

// 		// ── Compute subtotals ────────────────────────────────────────────────────
// 		function calcTotals(rows) {
// 			var mainRows  = rows.filter(function (r) { return !r.isTotal && !r.isGrand && r.name !== 'Covid-19'; });
// 			var covidRow  = rows.find(function (r) { return r.name === 'Covid-19'; }) || {};
// 			var sub = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };
// 			mainRows.forEach(function (r) {
// 				sub.bOpex  += r.bOpex  || 0;
// 				sub.bCapex += r.bCapex || 0;
// 				sub.eOpex  += r.eOpex  || 0;
// 				sub.eCapex += r.eCapex || 0;
// 			});
// 			var grand = {
// 				bOpex : sub.bOpex  + (covidRow.bOpex  || 0),
// 				bCapex: sub.bCapex + (covidRow.bCapex || 0),
// 				eOpex : sub.eOpex  + (covidRow.eOpex  || 0),
// 				eCapex: sub.eCapex + (covidRow.eCapex || 0)
// 			};
// 			return { sub: sub, grand: grand };
// 		}

// 		// ── renderTable ──────────────────────────────────────────────────────────
// 		function renderTable(rows) {
// 			// Update FY labels in header
// 			$('#ppt-budget-hdr').text(budgetLabel(currentFY));
// 			$('#ppt-est-hdr').text(estLabel(currentFY));
// 			$('#ppt-main-title').text(
// 				'Overall Foundation Numbers \u2013 ' +
// 				budgetLabel(currentFY).replace('Budget','Budget vs.') + ' ' + estLabel(currentFY)
// 			);

// 			var term   = ($('#ppt-search').val() || '').trim().toLowerCase();
// 			var totals = calcTotals(rows);
// 			var $tb    = $('#ppt-tbody').empty();

// 			rows.forEach(function (row) {
// 				var bO, bC, eO, eC, label, cls = '', bT, eT;

// 				if (row.isTotal || row.isGrand) {
// 					var t = row.isGrand ? totals.grand : totals.sub;
// 					bO = t.bOpex; bC = t.bCapex; eO = t.eOpex; eC = t.eCapex;
// 					label = row.label || 'Total';
// 					cls = 'ppt-total-row';
// 				} else {
// 					if (term && row.name.toLowerCase().indexOf(term) === -1) { return; }
// 					bO = row.bOpex || 0; bC = row.bCapex || 0;
// 					eO = row.eOpex || 0; eC = row.eCapex || 0;
// 					label = row.name;
// 				}
// 				bT = bO + bC; eT = eO + eC;

// 				$tb.append(
// 					'<tr class="' + cls + '">' +
// 						'<td>' + label + '</td>' +
// 						'<td class="ppt-sep-left">' + fmt(bO) + '</td>' +
// 						'<td>' + fmt(bC) + '</td>' +
// 						'<td>' + fmt(bT) + '</td>' +
// 						'<td class="ppt-grp-sep">' + fmt(eO) + '</td>' +
// 						'<td>' + fmt(eC) + '</td>' +
// 						'<td>' + fmt(eT) + '</td>' +
// 					'</tr>'
// 				);
// 			});
// 		}

// 		// ── Excel export ─────────────────────────────────────────────────────────
// 		function exportToExcel(rows) {
// 			if (typeof XLSX === 'undefined') {
// 				frappe.msgprint('XLSX library not loaded yet. Please try again in a moment.');
// 				return;
// 			}
// 			var bl = budgetLabel(currentFY), el = estLabel(currentFY);
// 			var totals = calcTotals(rows);
// 			var exRows = [
// 				['Unit', bl + ' Opex', bl + ' Capex', bl + ' Total', el + ' Opex', el + ' Capex', el + ' Total']
// 			];
// 			rows.forEach(function (row) {
// 				var bO, bC, eO, eC, label;
// 				if (row.isTotal || row.isGrand) {
// 					var t = row.isGrand ? totals.grand : totals.sub;
// 					bO=t.bOpex; bC=t.bCapex; eO=t.eOpex; eC=t.eCapex;
// 					label = row.label || 'Total';
// 				} else {
// 					bO=row.bOpex||0; bC=row.bCapex||0; eO=row.eOpex||0; eC=row.eCapex||0;
// 					label = row.name;
// 				}
// 				exRows.push([label, bO, bC, bO+bC, eO, eC, eO+eC]);
// 			});
// 			var ws = XLSX.utils.aoa_to_sheet(exRows);
// 			ws['!cols'] = [{wch:24},{wch:14},{wch:14},{wch:14},{wch:14},{wch:14},{wch:14}];
// 			var wb = XLSX.utils.book_new();
// 			XLSX.utils.book_append_sheet(wb, ws, 'PPT');
// 			XLSX.writeFile(wb, 'Foundation_PPT_' + currentFY + '.xlsx');
// 		}

// 		// ── bindEvents ───────────────────────────────────────────────────────────
// 		function bindEvents() {
// 			$(document).on('input.ppt', '#ppt-search', function () { renderTable(TEST_ROWS); });
// 			$(document).on('click.ppt', '#ppt-export-btn', function () {
// 				exportToExcel(TEST_ROWS);
// 			});
// 		}

// 		// ── load ─────────────────────────────────────────────────────────────────
// 		function load(fy_val) {
// 			currentFY = fy_val || '2026-27';
// 			if (!bound) {
// 				frappe.require('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js', function () {});
// 				bindEvents();
// 				bound = true;
// 			}
// 			// TODO: swap TEST_ROWS with API response when ready:
// 			// frappe.call({ method: 'annual_budget.api.foundation_consolidated_report.format_api',
// 			//   args: { financial_year: fy_val, month: 'March' },
// 			//   callback: function(r) { renderTable(transformApiResponse(r.message)); }
// 			// });
// 			renderTable(TEST_ROWS);
// 		}

// 	return { load: load };
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
// 		// ── bound is a closure variable — never reset by TabLoader ──
// 		var data = [], expandedQ = [], openH = {}, openS = {}, bound = false;

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

// 		// ── renderTable reads openH / openS to decide visibility ──
// 		// ── Initial render: openH={} so everything starts collapsed ──
// 		function renderTable() {
// 			buildHeader();
// 			var $tb   = $('#annual-table tbody').empty();
// 			var term  = $('#annual-search').val().trim().toLowerCase();
// 			var grand = { q1:[0,0,0], q2:[0,0,0], q3:[0,0,0], q4:[0,0,0] };

// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				var hs = String(hi);
// 				var ho = openH[hs] === true;   // false = collapsed by default
// 				Q_KEYS.forEach(function (k) { (head[k]||[0,0,0]).forEach(function (v,mi) { grand[k][mi]+=(v||0); }); });

// 				// Head row — always visible
// 				$tb.append(
// 					'<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '" style="cursor:pointer;">' +
// 						'<td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name.trim() + '</td>' +
// 						'<td>-</td>' + qCells(head) +
// 						'<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td>' +
// 					'</tr>'
// 				);

// 				// Sub-heads — hidden when head collapsed
// 				(head.sub_heads||[]).forEach(function (sub, si) {
// 					var sk = hs+'-'+si;
// 					var so = openS[sk] === true;   // false = collapsed by default
// 					$tb.append(
// 						'<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + 'cursor:pointer;">' +
// 							'<td style="padding-left:20px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td>' +
// 							'<td>-</td>' + qCells(sub) +
// 							'<td>' + formatINR(objTotal(sub)) + '</td>' +
// 						'</tr>'
// 					);
// 					// Sub-items — hidden unless both head & sub are open
// 					(sub.items||[]).forEach(function (item) {
// 						$tb.append(
// 							'<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho&&so)?'':'display:none;') + '">' +
// 								'<td style="padding-left:40px;">' + item.name + '</td>' +
// 								'<td>' + (item.gl_code||'-') + '</td>' + qCells(item) +
// 								'<td>' + formatINR(objTotal(item)) + '</td>' +
// 							'</tr>'
// 						);
// 					});
// 				});

// 				// Direct items under head — hidden when head collapsed
// 				(head.items||[]).forEach(function (d) {
// 					$tb.append(
// 						'<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:35px;">' + d.name + '</td>' +
// 							'<td>' + (d.gl_code||'-') + '</td>' + qCells(d) +
// 							'<td>' + formatINR(objTotal(d)) + '</td>' +
// 						'</tr>'
// 					);
// 				});
// 			});

// 			var gt = 0; Q_KEYS.forEach(function (k) { gt += sumArr(grand[k]); });
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td><td>-</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 		}

// 		// ── Toggle helpers: update state then re-render ──
// 		// (re-render is the safest approach — no stale DOM state possible)
// 		function toggleHead(hs) {
// 			openH[hs] = !(openH[hs] === true);
// 			// When collapsing a head, also collapse all its sub-heads
// 			if (!openH[hs]) {
// 				data.forEach(function (h, hi) {
// 					if (String(hi) !== hs) { return; }
// 					(h.sub_heads||[]).forEach(function (_, si) { openS[hs+'-'+si] = false; });
// 				});
// 			}
// 			renderTable();
// 		}

// 		function toggleSub(hs, ss) {
// 			var sk = hs+'-'+ss;
// 			openS[sk] = !(openS[sk] === true);
// 			renderTable();
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

// 		// ── bindEvents uses namespaced events + bound flag ──
// 		// ── so it fires exactly once, even across FY changes  ──
// 		function bindEvents() {
// 			// Search
// 			$(document).on('input.annual', '#annual-search', function () { renderTable(); });

// 			// Expand Quarters checkbox
// 			$(document).on('change.annual', '#annual-expand-quarters', function () {
// 				expandedQ = this.checked ? Q_KEYS.slice() : [];
// 				renderTable();
// 			});

// 			// Expand Line Items checkbox
// 			$(document).on('change.annual', '#annual-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function (h, hi) {
// 						openH[String(hi)] = true;
// 						(h.sub_heads||[]).forEach(function (_, si) { openS[hi+'-'+si] = true; });
// 					});
// 				} else {
// 					// Collapse everything
// 					openH = {}; openS = {};
// 				}
// 				renderTable();
// 			});

// 			// Quarter column header click (expand single quarter)
// 			$(document).on('click.annual', '#annual-table .cb-q-header', function () {
// 				var k = String($(this).attr('data-quarter'));
// 				var idx = expandedQ.indexOf(k);
// 				if (idx !== -1) { expandedQ.splice(idx,1); } else { expandedQ.push(k); }
// 				// Sync checkbox
// 				$('#annual-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length);
// 				renderTable();
// 			});

// 			// ── Head row click — delegated on the tab container ──
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) {
// 				e.stopPropagation();
// 				toggleHead(String($(this).attr('data-hi')));
// 			});

// 			// ── Sub-head row click ──
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub', function (e) {
// 				e.stopPropagation();
// 				toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si')));
// 			});
// 		}

// 		function fetchAndRender(fy) {
// 			// Reset state — always start collapsed
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			$('#annual-search').val('');
// 			Loader.show('Loading Annual Budget');
// 			frappe.call({
// 				method  : 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args    : { financial_year: fy },
// 				callback: function (r) { data = r.message||[]; renderTable(); Loader.hide(); },
// 				error   : function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}

// 		function load(fy) {
// 			// bound is a closure variable — never reset externally
// 			if (!bound) { bindEvents(); bound = true; }
// 			fetchAndRender(fy);
// 		}
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE  — with Expand Quarters + Expand Line Items checkboxes
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

// 				$tb.append('<tr class="cb-row-head cb-est-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name + '</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(yTot(head)) + '</td></tr>');

// 				(head.items||[]).forEach(function (item) {
// 					$tb.append('<tr class="cb-est-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '"><td style="padding-left:30px;">' + item.name + (item.gl_code?' ('+item.gl_code+')':'') + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>');
// 				});

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
// 			// Column header click (toggle single quarter)
// 			$(document).on('click.estimate', '#estimate-table .est-q-toggle', function () {
// 				var k=String($(this).attr('data-q')), idx=expandedQ.indexOf(k);
// 				if (idx !== -1) { expandedQ.splice(idx,1); } else { expandedQ.push(k); }
// 				$('#estimate-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length);
// 				renderTable();
// 			});

// 			// Expand Quarters checkbox
// 			$(document).on('change.estimate', '#estimate-expand-quarters', function () {
// 				expandedQ = this.checked ? Q_KEYS.slice() : [];
// 				renderTable();
// 			});

// 			// Expand Line Items checkbox
// 			$(document).on('change.estimate', '#estimate-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function (h, hi) {
// 						openH[String(hi)] = true;
// 						(h.sub_heads||[]).forEach(function (_, si) { openS[hi+'-'+si] = true; });
// 					});
// 				} else {
// 					openH = {}; openS = {};
// 				}
// 				renderTable();
// 			});

// 			// Row clicks — delegated on tab container (safe, no duplicates)
// 			$('#tab-estimate').on('click.estimate', '.cb-est-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-estimate').on('click.estimate', '.cb-est-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 			$(document).on('input.estimate', '#estimate-search', function () { renderTable(); });
// 		}

// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked', false);
// 			var year = (fy||'2025-26').split('-')[0];
// 			Loader.show('Loading Estimate');
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
// 		var openSec     = {};
// 		var openSub     = {};
// 		var expandItems = false;
// 		var bound       = false;

// 		function pl() { return getFYLabels(currentFY).plan; }
// 		function el() { return getFYLabels(currentFY).est;  }
// 		function entityLabel(entry) { return (entry.label || '').trim(); }

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
// 		function secVal(entry, secName, field) {
// 			var v = 0;
// 			(entry.actuals || []).forEach(function (sec) {
// 				if (sec.name !== secName) { return; }
// 				v += parseFloat(field === 'plan' ? (sec.ytd || 0) : (sec.total_posted_amt_ytd || 0));
// 			});
// 			return v;
// 		}
// 		function grandVal(entry, field) {
// 			var v = 0;
// 			(entry.actuals || []).forEach(function (sec) {
// 				v += parseFloat(field === 'plan' ? (sec.ytd || 0) : (sec.total_posted_amt_ytd || 0));
// 			});
// 			return v;
// 		}

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
// 		function itemTotalPlan(name)       { var v=0; rawData.forEach(function(e){v+=itemVal(e,name,'ytd');}); return v; }
// 		function itemTotalEst(name)        { var v=0; rawData.forEach(function(e){v+=itemVal(e,name,'total_posted_amt');}); return v; }
// 		function subTotalPlan(sn,subn)     { var v=0; rawData.forEach(function(e){v+=subVal(e,sn,subn,'plan');}); return v; }
// 		function subTotalEst(sn,subn)      { var v=0; rawData.forEach(function(e){v+=subVal(e,sn,subn,'est');}); return v; }
// 		function secTotalPlan(sn)          { var v=0; rawData.forEach(function(e){v+=secVal(e,sn,'plan');}); return v; }
// 		function secTotalEst(sn)           { var v=0; rawData.forEach(function(e){v+=secVal(e,sn,'est');}); return v; }
// 		function allGrandPlan()            { var v=0; rawData.forEach(function(e){v+=grandVal(e,'plan');}); return v; }
// 		function allGrandEst()             { var v=0; rawData.forEach(function(e){v+=grandVal(e,'est');}); return v; }

// 		function totalCell2(plan, est, cls) {
// 			cls = cls || '';
// 			return '<td class="be-total-plan ' + cls + '" style="font-weight:700;">' + formatINR(plan) + '</td>' +
// 			       '<td class="be-total-est '  + cls + '" style="font-weight:700;">' + formatINR(est)  + '</td>';
// 		}

// 		function buildHeader() {
// 			var $t = $('#be-table thead').empty();
// 			var $r1 = $('<tr class="cb-thead-main"></tr>');
// 			var $r2 = $('<tr class="cb-thead-sub"></tr>');
// 			$r1.append(
// 				'<th rowspan="2" style="text-align:left;min-width:280px;' +
// 				'position:sticky;left:0;z-index:40;background:#0076B6;">' +
// 				'Expense Head / Line Item</th>'
// 			);
// 			rawData.forEach(function (e) {
// 				$r1.append('<th colspan="2" style="text-align:center;">' + entityLabel(e) + '</th>');
// 			});
// 			$r1.append('<th colspan="2" style="text-align:center;background:#003B63;">Grand Total</th>');
// 			rawData.forEach(function () {
// 				$r2.append('<th style="text-align:center;min-width:140px;">' + pl() + '</th>');
// 				$r2.append('<th style="text-align:center;min-width:140px;">' + el() + '</th>');
// 			});
// 			$r2.append('<th style="text-align:center;min-width:140px;background:#004F8B;">' + pl() + '</th>');
// 			$r2.append('<th style="text-align:center;min-width:140px;background:#004F8B;">' + el() + '</th>');
// 			$t.append($r1).append($r2);
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb    = $('#be-tbody').empty();
// 			var term   = $('#be-search').val().trim().toLowerCase();
// 			var struct = buildStruct();
// 			var cols   = 1 + rawData.length * 2 + 2;

// 			if (!rawData.length || !struct.length) {
// 				$tb.append('<tr><td colspan="' + cols + '" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}

// 			struct.forEach(function (sec) {
// 				var sn      = sec.name;
// 				var secOpen = openSec[sn] !== false;
// 				var secVis  = secOpen ? '' : 'display:none;';

// 				$tb.append(
// 					'<tr class="cb-row-head be-sec-row" data-sec="' + sn + '">' +
// 						'<td style="text-align:left;">' +
// 							'<span class="cb-arrow">' + (secOpen ? '▼' : '▶') + '</span> ' + sn +
// 						'</td>' +
// 						secCells(sn) +
// 						totalCell2(secTotalPlan(sn), secTotalEst(sn), 'be-grand-col') +
// 					'</tr>'
// 				);

// 				sec.sub_heads.forEach(function (sub) {
// 					var sk      = sn + '::' + sub.name;
// 					var subOpen = expandItems || (openSub[sk] === true);
// 					var subVis  = secOpen ? '' : 'display:none;';
// 					var itmVis  = (secOpen && subOpen) ? '' : 'display:none;';

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

// 					sub.items.forEach(function (item) {
// 						if (term &&
// 							item.name.toLowerCase().indexOf(term) === -1 &&
// 							item.gl_code.toLowerCase().indexOf(term) === -1) { return; }
// 						$tb.append(
// 							'<tr class="be-item-row be-sec-child be-sub-child" ' +
// 							'data-sec="' + sn + '" data-sub="' + sk + '" style="' + itmVis + '">' +
// 								'<td style="padding-left:42px;text-align:left;">' +
// 									item.name +
// 									(item.gl_code ? ' <span style="color:#aaa;font-size:11px;">(' + item.gl_code + ')</span>' : '') +
// 								'</td>' +
// 								itemCells(item.name) +
// 								totalCell2(itemTotalPlan(item.name), itemTotalEst(item.name), 'be-grand-col') +
// 							'</tr>'
// 						);
// 					});
// 				});

// 				sec.items.forEach(function (item) {
// 					if (term &&
// 						item.name.toLowerCase().indexOf(term) === -1 &&
// 						item.gl_code.toLowerCase().indexOf(term) === -1) { return; }
// 					$tb.append(
// 						'<tr class="be-item-row be-sec-child be-direct-item" ' +
// 						'data-sec="' + sn + '" style="' + secVis + '">' +
// 							'<td style="padding-left:30px;text-align:left;">' +
// 								item.name +
// 								(item.gl_code ? ' <span style="color:#aaa;font-size:11px;">(' + item.gl_code + ')</span>' : '') +
// 							'</td>' +
// 							itemCells(item.name) +
// 							totalCell2(itemTotalPlan(item.name), itemTotalEst(item.name), 'be-grand-col') +
// 						'</tr>'
// 					);
// 				});
// 			});

// 			$tb.append(
// 				'<tr class="cb-row-grand">' +
// 					'<td style="text-align:left;">GRAND TOTAL</td>' +
// 					grandCells() +
// 					totalCell2(allGrandPlan(), allGrandEst(), 'be-grand-col') +
// 				'</tr>'
// 			);
// 		}

// 		function toggleSec(sn) {
// 			var o = !(openSec[sn] !== false);
// 			openSec[sn] = o;
// 			$('#be-table tbody .be-sec-row[data-sec="' + sn + '"]').find('.cb-arrow').text(o ? '▼' : '▶');
// 			var $ch = $('#be-table tbody .be-sec-child[data-sec="' + sn + '"]');
// 			if (o) {
// 				$ch.filter('.be-sub-row,.be-direct-item').show();
// 				$ch.filter('.be-sub-child').each(function () {
// 					var sk = $(this).attr('data-sub');
// 					if (expandItems || openSub[sk] === true) { $(this).show(); }
// 				});
// 			} else { $ch.hide(); }
// 		}

// 		function toggleSubRow(sk) {
// 			var o = !(openSub[sk] === true);
// 			openSub[sk] = o;
// 			$('#be-table tbody .be-sub-row[data-sub="' + sk + '"]').find('.cb-arrow').text(o ? '▼' : '▶');
// 			var $it = $('#be-table tbody .be-sub-child[data-sub="' + sk + '"]');
// 			o ? $it.show() : $it.hide();
// 		}

// 		function bindEvents() {
// 			$('#tab-budget_estimate').on('click.be', '.be-sec-row', function (e) {
// 				e.stopPropagation();
// 				toggleSec($(this).attr('data-sec'));
// 			});
// 			$('#tab-budget_estimate').on('click.be', '.be-sub-row', function (e) {
// 				e.stopPropagation();
// 				if (!expandItems) { toggleSubRow($(this).attr('data-sub')); }
// 			});
// 			$(document).on('change.be', '#be-expand-items', function () {
// 				expandItems = this.checked;
// 				buildStruct().forEach(function (sec) {
// 					openSec[sec.name] = expandItems ? true : false;
// 					sec.sub_heads.forEach(function (sub) {
// 						openSub[sec.name + '::' + sub.name] = expandItems;
// 					});
// 				});
// 				renderTable();
// 			});
// 			$(document).on('input.be', '#be-search', function () { renderTable(); });
// 		}

// 		function fetchAndRender(fy) {
// 			currentFY   = fy;
// 			rawData     = [];
// 			openSec     = {};
// 			openSub     = {};
// 			expandItems = false;
// 			$('#be-expand-items').prop('checked', false);

// 			Loader.show('Loading Budget & Estimate');
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.format_api',
// 				args    : { financial_year: fy, month: 'March',set_group_id:1 },
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

// 	// =============================================================================
// 	// AUTO-LOAD ACTIVE TAB ON PAGE OPEN
// 	// =============================================================================

// 	var initialFY = fyControl.get_value();
// 	if (initialFY) { TabLoader.trigger('ppt'); }

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
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var parts     = (fy || '2025-26').split('-');
// 		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
// 		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
// 		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
// 		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
// 		return {
// 			plan : 'FY' + startYY + '-' + endYY    + ' Plan',
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
// 		'#cb-tab-nav{border-bottom:1px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
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
// 		'.cb-export-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;font-size:13px;font-weight:600;color:#fff;background:#0076B6;border:1px solid #0076B6;border-radius:6px;cursor:pointer;white-space:nowrap;transition:background .15s;box-shadow:0 1px 3px rgba(0,0,0,.12);}' +
// 		'.cb-export-btn:hover{background:#005f94;border-color:#005f94;}' +

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

// 		/* ── PPT TAB ── */
// 		'.ppt-title-bar{margin-bottom:2px;}' +
// 		'.ppt-main-title{font-size:12px;font-weight:700;text-transform:uppercase;text-decoration:underline;letter-spacing:.3px;color:#111;margin-bottom:4px;}' +
// 		'.ppt-currency-label{font-size:11px;font-style:italic;color:#111;text-align:right;margin-bottom:2px;}' +
// 		'#ppt-table{border-collapse:collapse;width:100%;font-size:12px;font-family:Arial,sans-serif;border:1px solid #999;}' +
// 		'#ppt-table thead tr.ppt-hdr1 th{background:#fff;text-align:center;font-weight:700;padding:6px 10px 4px;border:1px solid #999;color:#111;}' +
// 		'#ppt-table thead tr.ppt-hdr2 th{background:#fff;text-align:center;font-weight:700;padding:4px 10px;border-left:1px dotted #aaa;border-right:1px dotted #aaa;border-bottom:1px dotted #aaa;border-top:none;color:#111;min-width:90px;}' +
// 		'#ppt-table thead tr.ppt-hdr2 th.ppt-unit-sub{border-left:1px solid #999;border-right:1px solid #999;}' +
// 		'#ppt-table thead tr.ppt-hdr2 th.ppt-est-first{border-left:1px solid #999 !important;}' +
// 		'#ppt-table thead tr.ppt-hdr2 th.ppt-est-last{border-right:1px solid #999 !important;}' +
// 		'#ppt-table thead tr.ppt-hdr2 th.ppt-bgt-last{border-right:1px solid #999 !important;}' +
// 		'#ppt-table tbody td{padding:5px 10px;border-bottom:1px dotted #aaa;text-align:right;white-space:nowrap;color:#111;border-left:none;border-right:none;}' +
// 		'#ppt-table tbody td:first-child{text-align:left;border-left:1px solid #999;min-width:160px;}' +
// 		'#ppt-table tbody td:last-child{border-right:1px solid #999;}' +
// 		'#ppt-table tbody td.ppt-sep-left{border-left:1px solid #999 !important;}' +
// 		'#ppt-table tbody td.ppt-grp-sep{border-left:1px solid #999 !important;}' +
// 		'#ppt-table tbody tr.ppt-total-row td{font-weight:700;border-bottom:1px solid #999 !important;}' +
// 		'#ppt-table tbody tr.ppt-total-row td:first-child{border-left:1px solid #999;}' +
// 		'#ppt-table tbody tr.ppt-total-row td:last-child{border-right:1px solid #999;}' +
// 		'.ppt-dash{color:#555;text-align:center;display:block;}' +

// 		/* BE sticky first column */
// 		'#be-table td:first-child{position:sticky;left:0;z-index:10;background:inherit;}' +
// 		'#be-table .cb-thead-main th:first-child{position:sticky;left:0;z-index:20;background:#0076B6;}' +
// 		'#be-table .cb-thead-sub th{left:auto !important;}' +
// 		'#be-table .cb-row-head td:first-child{background:#E9F4FB;}' +
// 		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6;}' +
// 		'#be-table .cb-row-grand td:first-child{background:#0076B6;}' +
// 		'#be-table .be-item-row td:first-child{background:#fff;}' +
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

// 	function fmtDash(v) {
// 		var n = parseFloat(v) || 0;
// 		return n === 0
// 			? '<span class="ppt-dash">-</span>'
// 			: n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

// 				/* ── PPT TAB ── */
// 				'<div class="cb-tab-pane active" id="tab-ppt">' +
// 					'<div class="ppt-title-bar">' +
// 						'<div class="ppt-main-title" id="ppt-main-title">Overall Foundation Numbers – Budget vs. Est</div>' +
// 					'</div>' +
// 					'<div class="ppt-currency-label">₹ Cr.</div>' +
// 					'<div class="cb-controls">' +
// 						'<input type="text" id="ppt-search" class="cb-search-input" placeholder="Search unit...">' +
// 						'<button class="cb-export-btn" id="ppt-export-btn">↓ Export to Excel</button>' +
// 					'</div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table id="ppt-table" class="cb-table">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;text-align:center;">Unit</th>' +
// 									'<th colspan="3" id="ppt-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th>' +
// 									'<th>Capex</th>' +
// 									'<th>Total</th>' +
// 									'<th>Opex</th>' +
// 									'<th>Capex</th>' +
// 									'<th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 				'</div>' +

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
// 						'<div class="cb-checkbox-area">' +
// 							'<label><input type="checkbox" id="estimate-expand-quarters"> Expand Quarters</label>' +
// 							'<label><input type="checkbox" id="estimate-expand-items"> Expand Line Items</label>' +
// 						'</div>' +
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
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (r.message && r.message.length) {
// 				var years = r.message.map(function (d) { return d.financial_year; });
// 				fyControl.df.options = years.join('\n');
// 				fyControl.refresh();

// 				var today = new Date();
// 				var year  = today.getFullYear();
// 				var month = today.getMonth() + 1;
// 				var currentFY = (month >= 4)
// 					? year + '-' + String(year + 1).slice(-2)
// 					: (year - 1) + '-' + String(year).slice(-2);

// 				if (years.indexOf(currentFY) !== -1) {
// 					fyControl.set_value(currentFY);
// 					updatePageTitle(currentFY);
// 				} else {
// 					fyControl.set_value(years[0]);
// 					updatePageTitle(years[0]);
// 				}
// 			}
// 		}
// 	});
// 	function getFinancialYearParams(fyControl) {
//     const currentFY = fyControl.get_value();

//     if (!currentFY) {
//         return null;
//     }

//     const startYear = parseInt(currentFY.split("-")[0], 10);

//     if (isNaN(startYear)) {
//         return null;
//     }

//     const prevStart = startYear - 1;
//     const prevEnd = String(prevStart + 1).slice(-2);

//     const previousFY = `${prevStart}-${prevEnd}`;

//     return {
//         financial_year: currentFY,
//         previous_financial_year: previousFY
//     };
// }
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
// 			ppt            : function (fy) { PPT.load(fy);            },
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
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {

// 		var currentFY = '';
// 		var apiRows   = [];
// 		var bound     = false;

// 		// ── FY label helpers ──────────────────────────────────────────────────
// 		function budgetLabel(fy) {
// 			var parts = (fy || '2025-26').split('-');
// 			return (parts[0] || '2025') + '-' + (parts[1] ? parts[1].slice(-2) : '26') + ' Budget';
// 		}
// 		function estLabel(fy) {
// 			var parts = (fy || '2025-26').split('-');
// 			var sy    = parseInt(parts[0] || '2025', 10) - 1;
// 			var ey    = parseInt(parts[1] || '26',   10) - 1;
// 			return sy + '-' + String(ey).padStart(2, '0') + ' Est';
// 		}

// 		// ── Convert raw rupees → ₹ Cr. ───────────────────────────────────────
// 		function toCr(v) { return (parseFloat(v) || 0) / 10000000; }

// 		// ── Transform API response → flat PPT row array ───────────────────────
// 		// totals.*.ytd             = Budget
// 		// totals.*.total_posted_amt = Estimate (Actuals)
// 		function transformResponse(message) {
// 			var rows      = [];
// 			var covidRows = [];

// 			(message || []).forEach(function (entity) {
// 				var isCovid = (entity.label || '').toLowerCase().indexOf('covid') !== -1;
// 				var totals  = entity.totals || {};
// 				var capEx   = totals.capital_expenses   || {};
// 				var opEx    = totals.operating_expenses || {};

// 				var row = {
// 					name  : entity.label || '',
// 					bOpex : toCr(opEx.ytd),               // Budget  – Operating
// 					bCapex: toCr(capEx.ytd),              // Budget  – Capital
// 					eOpex : toCr(opEx.total_posted_amt),  // Est/Actual – Operating
// 					eCapex: toCr(capEx.total_posted_amt)  // Est/Actual – Capital
// 				};

// 				if (isCovid) {
// 					row.isCovid = true;
// 					row.label   = entity.label;
// 					covidRows.push(row);
// 				} else {
// 					rows.push(row);
// 				}
// 			});

// 			// Sub Total (non-covid entities)
// 			rows.push({ isSubTotal: true, label: 'Sub Total' });

// 			// Covid rows after sub-total
// 			covidRows.forEach(function (r) { rows.push(r); });

// 			// Grand Total
// 			rows.push({ isGrand: true, label: 'Grand Total' });

// 			return rows;
// 		}

// 		// ── Compute sub-total and grand-total ─────────────────────────────────
// 		function calcTotals(rows) {
// 			var sub   = { bOpex: 0, bCapex: 0, eOpex: 0, eCapex: 0 };
// 			var covid = { bOpex: 0, bCapex: 0, eOpex: 0, eCapex: 0 };

// 			rows.forEach(function (r) {
// 				if (r.isSubTotal || r.isGrand) { return; }
// 				var t = r.isCovid ? covid : sub;
// 				t.bOpex  += r.bOpex  || 0;
// 				t.bCapex += r.bCapex || 0;
// 				t.eOpex  += r.eOpex  || 0;
// 				t.eCapex += r.eCapex || 0;
// 			});

// 			return {
// 				sub  : sub,
// 				grand: {
// 					bOpex : sub.bOpex  + covid.bOpex,
// 					bCapex: sub.bCapex + covid.bCapex,
// 					eOpex : sub.eOpex  + covid.eOpex,
// 					eCapex: sub.eCapex + covid.eCapex
// 				}
// 			};
// 		}

// 		// ── Number formatter ─────────────────────────────────────────────────
// 		function fmt(v) {
// 			var n = parseFloat(v) || 0;
// 			return n === 0
// 				? '<span class="ppt-dash">-</span>'
// 				: n.toFixed(2);
// 		}

// 		// ── Update column headers with FY labels ──────────────────────────────
// 		function updateHeaders() {
// 			$('#ppt-budget-hdr').text(budgetLabel(currentFY));
// 			$('#ppt-est-hdr').text(estLabel(currentFY));
// 			$('#ppt-main-title').text(
// 				'Overall Foundation Numbers \u2013 ' +
// 				budgetLabel(currentFY) + ' vs. ' + estLabel(currentFY)
// 			);
// 		}

// 		// ── Render table ──────────────────────────────────────────────────────
// 		function renderTable(rows) {
// 			updateHeaders();
// 			var term   = ($('#ppt-search').val() || '').trim().toLowerCase();
// 			var totals = calcTotals(rows);
// 			var $tb    = $('#ppt-tbody').empty();

// 			rows.forEach(function (row) {
// 				var bO, bC, eO, eC, label, cls = '', bT, eT;

// 				if (row.isSubTotal) {
// 					var s = totals.sub;
// 					bO = s.bOpex; bC = s.bCapex; eO = s.eOpex; eC = s.eCapex;
// 					label = row.label || 'Sub Total';
// 					cls   = 'ppt-total-row';

// 				} else if (row.isGrand) {
// 					var g = totals.grand;
// 					bO = g.bOpex; bC = g.bCapex; eO = g.eOpex; eC = g.eCapex;
// 					label = row.label || 'Grand Total';
// 					cls   = 'ppt-total-row';

// 				} else {
// 					if (term && (row.name || row.label || '').toLowerCase().indexOf(term) === -1) { return; }
// 					bO = row.bOpex || 0; bC = row.bCapex || 0;
// 					eO = row.eOpex || 0; eC = row.eCapex || 0;
// 					label = row.isCovid ? (row.label || 'COVID SUPPORT') : row.name;
// 				}

// 				bT = bO + bC;
// 				eT = eO + eC;

// 				$tb.append(
// 					'<tr class="' + cls + '">' +
// 						'<td>' + label + '</td>' +
// 						'<td class="ppt-sep-left">' + fmt(bO) + '</td>' +
// 						'<td>'                       + fmt(bC) + '</td>' +
// 						'<td>'                       + fmt(bT) + '</td>' +
// 						'<td class="ppt-grp-sep">'   + fmt(eO) + '</td>' +
// 						'<td>'                       + fmt(eC) + '</td>' +
// 						'<td>'                       + fmt(eT) + '</td>' +
// 					'</tr>'
// 				);
// 			});
// 		}

// 		// ── Excel export ──────────────────────────────────────────────────────
// 		function exportToExcel(rows) {
// 			if (typeof XLSX === 'undefined') {
// 				frappe.msgprint('XLSX library not loaded yet. Please try again in a moment.');
// 				return;
// 			}
// 			var bl     = budgetLabel(currentFY);
// 			var el_lbl = estLabel(currentFY);
// 			var totals = calcTotals(rows);

// 			var exRows = [[
// 				'Unit',
// 				bl + ' Opex', bl + ' Capex', bl + ' Total',
// 				el_lbl + ' Opex', el_lbl + ' Capex', el_lbl + ' Total'
// 			]];

// 			rows.forEach(function (row) {
// 				var bO, bC, eO, eC, label;
// 				if (row.isSubTotal) {
// 					var s = totals.sub;
// 					bO = s.bOpex; bC = s.bCapex; eO = s.eOpex; eC = s.eCapex;
// 					label = row.label || 'Sub Total';
// 				} else if (row.isGrand) {
// 					var g = totals.grand;
// 					bO = g.bOpex; bC = g.bCapex; eO = g.eOpex; eC = g.eCapex;
// 					label = row.label || 'Grand Total';
// 				} else {
// 					bO = row.bOpex || 0; bC = row.bCapex || 0;
// 					eO = row.eOpex || 0; eC = row.eCapex || 0;
// 					label = row.isCovid ? (row.label || 'COVID SUPPORT') : row.name;
// 				}
// 				exRows.push([label, bO, bC, bO + bC, eO, eC, eO + eC]);
// 			});

// 			var ws = XLSX.utils.aoa_to_sheet(exRows);
// 			ws['!cols'] = [
// 				{ wch: 28 }, { wch: 14 }, { wch: 14 }, { wch: 14 },
// 				{ wch: 14 }, { wch: 14 }, { wch: 14 }
// 			];
// 			var wb = XLSX.utils.book_new();
// 			XLSX.utils.book_append_sheet(wb, ws, 'PPT');
// 			XLSX.writeFile(wb, 'Foundation_PPT_' + currentFY + '.xlsx');
// 		}

// 		// ── Bind UI events (once only) ────────────────────────────────────────
// 		function bindEvents() {
// 			$(document).on('input.ppt', '#ppt-search', function () {
// 				renderTable(apiRows);
// 			});
// 			$(document).on('click.ppt', '#ppt-export-btn', function () {
// 				if (!apiRows.length) {
// 					frappe.msgprint('No data to export yet.');
// 					return;
// 				}
// 				exportToExcel(apiRows);
// 			});
// 		}

// 		// ── Fetch from API then render ────────────────────────────────────────
// 		function fetchAndRender(fy) {
// 			apiRows = [];
// 			$('#ppt-tbody').empty();
// 			Loader.show('Loading PPT data');

// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.add_expense_totals',
// 				args  : { financial_year: fy, month: 'March', set_group_id: 1 ,previous_financial_year: getFinancialYearParams(fyControl)},
// 				callback: function (r) {
// 					Loader.hide();
// 					if (r.message && Array.isArray(r.message)) {
// 						apiRows = transformResponse(r.message);
// 						renderTable(apiRows);
// 					} else {
// 						frappe.msgprint('Failed to load PPT data.');
// 					}
// 				},
// 				error: function () {
// 					Loader.hide();
// 					frappe.msgprint('Server error loading PPT data.');
// 				}
// 			});
// 		}

// 		// ── Public load() ─────────────────────────────────────────────────────
// 		function load(fy) {
// 			currentFY = fy || '2025-26';
// 			if (!bound) {
// 				frappe.require(
// 					'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
// 					function () {}
// 				);
// 				bindEvents();
// 				bound = true;
// 			}
// 			fetchAndRender(currentFY);
// 		}

// 		return { load: load };
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
// 		var data = [], expandedQ = [], openH = {}, openS = {}, bound = false;

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
// 					if (expandedQ.indexOf(k) !== -1) {
// 						Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); });
// 					}
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
// 				var hs = String(hi);
// 				var ho = openH[hs] === true;
// 				Q_KEYS.forEach(function (k) {
// 					(head[k]||[0,0,0]).forEach(function (v,mi) { grand[k][mi]+=(v||0); });
// 				});

// 				$tb.append(
// 					'<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '" style="cursor:pointer;">' +
// 						'<td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name.trim() + '</td>' +
// 						'<td>-</td>' + qCells(head) +
// 						'<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td>' +
// 					'</tr>'
// 				);

// 				(head.sub_heads||[]).forEach(function (sub, si) {
// 					var sk = hs+'-'+si;
// 					var so = openS[sk] === true;
// 					$tb.append(
// 						'<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + 'cursor:pointer;">' +
// 							'<td style="padding-left:20px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td>' +
// 							'<td>-</td>' + qCells(sub) +
// 							'<td>' + formatINR(objTotal(sub)) + '</td>' +
// 						'</tr>'
// 					);
// 					(sub.items||[]).forEach(function (item) {
// 						$tb.append(
// 							'<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho&&so)?'':'display:none;') + '">' +
// 								'<td style="padding-left:40px;">' + item.name + '</td>' +
// 								'<td>' + (item.gl_code||'-') + '</td>' + qCells(item) +
// 								'<td>' + formatINR(objTotal(item)) + '</td>' +
// 							'</tr>'
// 						);
// 					});
// 				});

// 				(head.items||[]).forEach(function (d) {
// 					$tb.append(
// 						'<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:35px;">' + d.name + '</td>' +
// 							'<td>' + (d.gl_code||'-') + '</td>' + qCells(d) +
// 							'<td>' + formatINR(objTotal(d)) + '</td>' +
// 						'</tr>'
// 					);
// 				});
// 			});

// 			var gt = 0; Q_KEYS.forEach(function (k) { gt += sumArr(grand[k]); });
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td><td>-</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			openH[hs] = !(openH[hs] === true);
// 			if (!openH[hs]) {
// 				data.forEach(function (h, hi) {
// 					if (String(hi) !== hs) { return; }
// 					(h.sub_heads||[]).forEach(function (_, si) { openS[hs+'-'+si] = false; });
// 				});
// 			}
// 			renderTable();
// 		}

// 		function toggleSub(hs, ss) {
// 			var sk = hs+'-'+ss;
// 			openS[sk] = !(openS[sk] === true);
// 			renderTable();
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
// 			$(document).on('input.annual', '#annual-search', function () { renderTable(); });

// 			$(document).on('change.annual', '#annual-expand-quarters', function () {
// 				expandedQ = this.checked ? Q_KEYS.slice() : [];
// 				renderTable();
// 			});

// 			$(document).on('change.annual', '#annual-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function (h, hi) {
// 						openH[String(hi)] = true;
// 						(h.sub_heads||[]).forEach(function (_, si) { openS[hi+'-'+si] = true; });
// 					});
// 				} else {
// 					openH = {}; openS = {};
// 				}
// 				renderTable();
// 			});

// 			$(document).on('click.annual', '#annual-table .cb-q-header', function () {
// 				var k   = String($(this).attr('data-quarter'));
// 				var idx = expandedQ.indexOf(k);
// 				if (idx !== -1) { expandedQ.splice(idx,1); } else { expandedQ.push(k); }
// 				$('#annual-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length);
// 				renderTable();
// 			});

// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) {
// 				e.stopPropagation();
// 				toggleHead(String($(this).attr('data-hi')));
// 			});

// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub', function (e) {
// 				e.stopPropagation();
// 				toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si')));
// 			});
// 		}

// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			$('#annual-search').val('');
// 			Loader.show('Loading Annual Budget');
// 			frappe.call({
// 				method  : 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args    : { financial_year: fy },
// 				callback: function (r) { data = r.message||[]; renderTable(); Loader.hide(); },
// 				error   : function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}

// 		function load(fy) {
// 			if (!bound) { bindEvents(); bound = true; }
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
// 					if (expandedQ.indexOf(k) !== -1) {
// 						Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); });
// 					}
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

// 				$tb.append('<tr class="cb-row-head cb-est-head" data-hi="' + hs + '"><td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name + '</td>' + qCells(head) + '<td class="cb-text-accent">' + formatINR(yTot(head)) + '</td></tr>');

// 				(head.items||[]).forEach(function (item) {
// 					$tb.append('<tr class="cb-est-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '"><td style="padding-left:30px;">' + item.name + (item.gl_code?' ('+item.gl_code+')':'') + '</td>' + qCells(item) + '<td>' + formatINR(yTot(item)) + '</td></tr>');
// 				});

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
// 				$('#estimate-table tbody .cb-est-sub[data-hi="' + hs + '"]').each(function () {
// 					var si=$(this).attr('data-si'); openS[hs+'-'+si]=false; $(this).find('.cb-arrow').text('▶');
// 				});
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
// 			$(document).on('click.estimate', '#estimate-table .est-q-toggle', function () {
// 				var k=String($(this).attr('data-q')), idx=expandedQ.indexOf(k);
// 				if (idx !== -1) { expandedQ.splice(idx,1); } else { expandedQ.push(k); }
// 				$('#estimate-expand-quarters').prop('checked', expandedQ.length === Q_KEYS.length);
// 				renderTable();
// 			});
// 			$(document).on('change.estimate', '#estimate-expand-quarters', function () {
// 				expandedQ = this.checked ? Q_KEYS.slice() : [];
// 				renderTable();
// 			});
// 			$(document).on('change.estimate', '#estimate-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function (h, hi) {
// 						openH[String(hi)] = true;
// 						(h.sub_heads||[]).forEach(function (_, si) { openS[hi+'-'+si] = true; });
// 					});
// 				} else {
// 					openH = {}; openS = {};
// 				}
// 				renderTable();
// 			});
// 			$('#tab-estimate').on('click.estimate', '.cb-est-head', function (e) {
// 				e.stopPropagation();
// 				toggleHead(String($(this).attr('data-hi')));
// 			});
// 			$('#tab-estimate').on('click.estimate', '.cb-est-sub', function (e) {
// 				e.stopPropagation();
// 				toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si')));
// 			});
// 			$(document).on('input.estimate', '#estimate-search', function () { renderTable(); });
// 		}

// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked', false);
// 			var year = (fy||'2025-26').split('-')[0];
// 			Loader.show('Loading Estimate');
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
// 		var openSec     = {};
// 		var openSub     = {};
// 		var expandItems = false;
// 		var bound       = false;

// 		function pl() { return getFYLabels(currentFY).plan; }
// 		function el() { return getFYLabels(currentFY).est;  }
// 		function entityLabel(entry) { return (entry.label || '').trim(); }

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
// 		function secVal(entry, secName, field) {
// 			var v = 0;
// 			(entry.actuals || []).forEach(function (sec) {
// 				if (sec.name !== secName) { return; }
// 				v += parseFloat(field === 'plan' ? (sec.ytd || 0) : (sec.total_posted_amt_ytd || 0));
// 			});
// 			return v;
// 		}
// 		function grandVal(entry, field) {
// 			var v = 0;
// 			(entry.actuals || []).forEach(function (sec) {
// 				v += parseFloat(field === 'plan' ? (sec.ytd || 0) : (sec.total_posted_amt_ytd || 0));
// 			});
// 			return v;
// 		}

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
// 		function itemTotalPlan(name)   { var v=0; rawData.forEach(function(e){v+=itemVal(e,name,'ytd');}); return v; }
// 		function itemTotalEst(name)    { var v=0; rawData.forEach(function(e){v+=itemVal(e,name,'total_posted_amt');}); return v; }
// 		function subTotalPlan(sn,subn) { var v=0; rawData.forEach(function(e){v+=subVal(e,sn,subn,'plan');}); return v; }
// 		function subTotalEst(sn,subn)  { var v=0; rawData.forEach(function(e){v+=subVal(e,sn,subn,'est');}); return v; }
// 		function secTotalPlan(sn)      { var v=0; rawData.forEach(function(e){v+=secVal(e,sn,'plan');}); return v; }
// 		function secTotalEst(sn)       { var v=0; rawData.forEach(function(e){v+=secVal(e,sn,'est');}); return v; }
// 		function allGrandPlan()        { var v=0; rawData.forEach(function(e){v+=grandVal(e,'plan');}); return v; }
// 		function allGrandEst()         { var v=0; rawData.forEach(function(e){v+=grandVal(e,'est');}); return v; }

// 		function totalCell2(plan, est, cls) {
// 			cls = cls || '';
// 			return '<td class="be-total-plan ' + cls + '" style="font-weight:700;">' + formatINR(plan) + '</td>' +
// 			       '<td class="be-total-est '  + cls + '" style="font-weight:700;">' + formatINR(est)  + '</td>';
// 		}

// 		function buildHeader() {
// 			var $t  = $('#be-table thead').empty();
// 			var $r1 = $('<tr class="cb-thead-main"></tr>');
// 			var $r2 = $('<tr class="cb-thead-sub"></tr>');
// 			$r1.append(
// 				'<th rowspan="2" style="text-align:left;min-width:280px;' +
// 				'position:sticky;left:0;z-index:40;background:#0076B6;">' +
// 				'Expense Head / Line Item</th>'
// 			);
// 			rawData.forEach(function (e) {
// 				$r1.append('<th colspan="2" style="text-align:center;">' + entityLabel(e) + '</th>');
// 			});
// 			$r1.append('<th colspan="2" style="text-align:center;background:#003B63;">Grand Total</th>');
// 			rawData.forEach(function () {
// 				$r2.append('<th style="text-align:center;min-width:140px;">' + pl() + '</th>');
// 				$r2.append('<th style="text-align:center;min-width:140px;">' + el() + '</th>');
// 			});
// 			$r2.append('<th style="text-align:center;min-width:140px;background:#004F8B;">' + pl() + '</th>');
// 			$r2.append('<th style="text-align:center;min-width:140px;background:#004F8B;">' + el() + '</th>');
// 			$t.append($r1).append($r2);
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb    = $('#be-tbody').empty();
// 			var term   = $('#be-search').val().trim().toLowerCase();
// 			var struct = buildStruct();
// 			var cols   = 1 + rawData.length * 2 + 2;

// 			if (!rawData.length || !struct.length) {
// 				$tb.append('<tr><td colspan="' + cols + '" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}

// 			struct.forEach(function (sec) {
// 				var sn      = sec.name;
// 				var secOpen = openSec[sn] !== false;
// 				var secVis  = secOpen ? '' : 'display:none;';

// 				$tb.append(
// 					'<tr class="cb-row-head be-sec-row" data-sec="' + sn + '">' +
// 						'<td style="text-align:left;">' +
// 							'<span class="cb-arrow">' + (secOpen ? '▼' : '▶') + '</span> ' + sn +
// 						'</td>' +
// 						secCells(sn) +
// 						totalCell2(secTotalPlan(sn), secTotalEst(sn), 'be-grand-col') +
// 					'</tr>'
// 				);

// 				sec.sub_heads.forEach(function (sub) {
// 					var sk      = sn + '::' + sub.name;
// 					var subOpen = expandItems || (openSub[sk] === true);
// 					var subVis  = secOpen ? '' : 'display:none;';
// 					var itmVis  = (secOpen && subOpen) ? '' : 'display:none;';

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

// 					sub.items.forEach(function (item) {
// 						if (term &&
// 							item.name.toLowerCase().indexOf(term) === -1 &&
// 							item.gl_code.toLowerCase().indexOf(term) === -1) { return; }
// 						$tb.append(
// 							'<tr class="be-item-row be-sec-child be-sub-child" ' +
// 							'data-sec="' + sn + '" data-sub="' + sk + '" style="' + itmVis + '">' +
// 								'<td style="padding-left:42px;text-align:left;">' +
// 									item.name +
// 									(item.gl_code ? ' <span style="color:#aaa;font-size:11px;">(' + item.gl_code + ')</span>' : '') +
// 								'</td>' +
// 								itemCells(item.name) +
// 								totalCell2(itemTotalPlan(item.name), itemTotalEst(item.name), 'be-grand-col') +
// 							'</tr>'
// 						);
// 					});
// 				});

// 				sec.items.forEach(function (item) {
// 					if (term &&
// 						item.name.toLowerCase().indexOf(term) === -1 &&
// 						item.gl_code.toLowerCase().indexOf(term) === -1) { return; }
// 					$tb.append(
// 						'<tr class="be-item-row be-sec-child be-direct-item" ' +
// 						'data-sec="' + sn + '" style="' + secVis + '">' +
// 							'<td style="padding-left:30px;text-align:left;">' +
// 								item.name +
// 								(item.gl_code ? ' <span style="color:#aaa;font-size:11px;">(' + item.gl_code + ')</span>' : '') +
// 							'</td>' +
// 							itemCells(item.name) +
// 							totalCell2(itemTotalPlan(item.name), itemTotalEst(item.name), 'be-grand-col') +
// 						'</tr>'
// 					);
// 				});
// 			});

// 			$tb.append(
// 				'<tr class="cb-row-grand">' +
// 					'<td style="text-align:left;">GRAND TOTAL</td>' +
// 					grandCells() +
// 					totalCell2(allGrandPlan(), allGrandEst(), 'be-grand-col') +
// 				'</tr>'
// 			);
// 		}

// 		function toggleSec(sn) {
// 			var o = !(openSec[sn] !== false);
// 			openSec[sn] = o;
// 			$('#be-table tbody .be-sec-row[data-sec="' + sn + '"]').find('.cb-arrow').text(o ? '▼' : '▶');
// 			var $ch = $('#be-table tbody .be-sec-child[data-sec="' + sn + '"]');
// 			if (o) {
// 				$ch.filter('.be-sub-row,.be-direct-item').show();
// 				$ch.filter('.be-sub-child').each(function () {
// 					var sk = $(this).attr('data-sub');
// 					if (expandItems || openSub[sk] === true) { $(this).show(); }
// 				});
// 			} else { $ch.hide(); }
// 		}

// 		function toggleSubRow(sk) {
// 			var o = !(openSub[sk] === true);
// 			openSub[sk] = o;
// 			$('#be-table tbody .be-sub-row[data-sub="' + sk + '"]').find('.cb-arrow').text(o ? '▼' : '▶');
// 			var $it = $('#be-table tbody .be-sub-child[data-sub="' + sk + '"]');
// 			o ? $it.show() : $it.hide();
// 		}

// 		function bindEvents() {
// 			$('#tab-budget_estimate').on('click.be', '.be-sec-row', function (e) {
// 				e.stopPropagation();
// 				toggleSec($(this).attr('data-sec'));
// 			});
// 			$('#tab-budget_estimate').on('click.be', '.be-sub-row', function (e) {
// 				e.stopPropagation();
// 				if (!expandItems) { toggleSubRow($(this).attr('data-sub')); }
// 			});
// 			$(document).on('change.be', '#be-expand-items', function () {
// 				expandItems = this.checked;
// 				buildStruct().forEach(function (sec) {
// 					openSec[sec.name] = expandItems ? true : false;
// 					sec.sub_heads.forEach(function (sub) {
// 						openSub[sec.name + '::' + sub.name] = expandItems;
// 					});
// 				});
// 				renderTable();
// 			});
// 			$(document).on('input.be', '#be-search', function () { renderTable(); });
// 		}

// 		function fetchAndRender(fy) {
// 			currentFY   = fy;
// 			rawData     = [];
// 			openSec     = {};
// 			openSub     = {};
// 			expandItems = false;
// 			$('#be-expand-items').prop('checked', false);

// 			Loader.show('Loading Budget & Estimate');
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.format_api',
// 				args    : { financial_year: fy, month: 'March', set_group_id: 1,previous_financial_year:getFinancialYearParams(fyControl)},
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

// 	// =============================================================================
// 	// AUTO-LOAD ACTIVE TAB ON PAGE OPEN
// 	// =============================================================================

// 	var initialFY = fyControl.get_value();
// 	if (initialFY) { TabLoader.trigger('ppt'); }

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
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var parts     = (fy || '2025-26').split('-');
// 		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
// 		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
// 		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
// 		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
// 		return {
// 			plan : 'FY' + startYY + '-' + endYY    + ' Plan',
// 			est  : 'FY' + prevStart + '-' + prevEnd + ' Est'
// 		};
// 	}

// 	// =============================================================================
// 	// PREV FY HELPER  — '2025-26' → '2024-25'
// 	// =============================================================================

// 	function getPrevFY(fy) {
// 		var parts = (fy || '2025-26').split('-');
// 		var s = parseInt(parts[0] || '2025', 10) - 1;
// 		var e = parseInt(parts[1] || '26',   10) - 1;
// 		return s + '-' + String(e).padStart(2, '0');
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

// 		/* ── CSS variables ── */
// 		':root{' +
// 			'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 			'--orange:#F26B21;--orange-light:#FFF3E6;' +
// 			'--border:#bbb;--border-light:#ddd;--border-header:#005f94;--border-orange:#d45a10;' +
// 		'}' +

// 		/* ── Layout ── */
// 		'.cb-wrapper{padding:15px;background:#fff;}' +

// 		/* ── Tab nav ── */
// 		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:8px 20px;color:#555;font-size:13px;font-weight:400;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:#003B63;font-weight:700;border-bottom:3px solid #003B63;}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +

// 		/* ── Filter row ── */
// 		'.cb-filter-row{padding:10px 0;background:#fff;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row{padding:10px;}.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +

// 		/* ── Controls bar ── */
// 		'.cb-controls{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;margin-bottom:10px;background:#f7f9fb;border:1px solid #ddd;border-radius:4px;flex-wrap:wrap;gap:8px;}' +
// 		'.cb-search-input{padding:6px 10px;border:1px solid #bbb;border-radius:4px;font-size:13px;width:260px;}' +
// 		'.cb-checkbox-area{display:flex;gap:18px;font-size:13px;font-weight:500;color:#444;}' +
// 		'.cb-checkbox-area label{display:flex;align-items:center;gap:5px;cursor:pointer;}' +

// 		/* ── Scroll wrapper ── */
// 		'.cb-scroll-wrapper{border:2px solid #bbb;border-radius:4px;overflow:auto;max-height:72vh;background:#fff;}' +

// 		/* =================================================================
// 		   SHARED TABLE BASE — every table uses border-collapse + full cell
// 		   borders so ALL row and column dividers are always visible
// 		   ================================================================= */
// 		'.cb-table,.ppt-table-wrap{' +
// 			'width:100%;border-collapse:collapse;font-size:13px;font-family:Arial,sans-serif;table-layout:auto;' +
// 		'}' +

// 		/* Every th and td gets a solid border on ALL four sides */
// 		'.cb-table th,.cb-table td,' +
// 		'.ppt-table-wrap th,.ppt-table-wrap td{' +
// 			'border:1px solid #bbb;' +
// 			'padding:7px 11px;' +
// 			'white-space:nowrap;' +
// 			'text-align:right;' +
// 		'}' +

// 		/* First column — left-align */
// 		'.cb-table th:first-child,.cb-table td:first-child,' +
// 		'.ppt-table-wrap th:first-child,.ppt-table-wrap td:first-child{text-align:left;}' +

// 		/* Second column — center (GL code) */
// 		'.cb-table td:nth-child(2){text-align:center;color:#666;}' +

// 		/* ── Sticky headers ── */
// 		'.cb-thead-main th{' +
// 			'background:#0076B6;color:#fff;font-weight:700;text-align:center;' +
// 			'position:sticky;top:0;z-index:25;border-color:#005f94;' +
// 		'}' +
// 		'.cb-thead-sub th{' +
// 			'background:#F26B21;color:#fff;font-weight:600;text-align:center;' +
// 			'position:sticky;top:37px;z-index:24;border-color:#c85810;min-width:100px;' +
// 		'}' +

// 		/* ── Row types — cb-table ── */
// 		'.cb-row-head{font-weight:700;cursor:pointer;background:#E9F4FB;color:#003B63;}' +
// 		'.cb-row-head:hover td{background:#d0e8f5;}' +
// 		'.cb-row-sub{background:#FFF3E6;font-weight:600;cursor:pointer;}' +
// 		'.cb-row-sub:hover td{background:#ffe0c2;}' +
// 		'.cb-row-grand td{background:#0076B6 !important;color:#fff !important;font-weight:800;border-color:#005f94 !important;}' +
// 		'.cb-text-accent{color:#0076B6;font-weight:600;}' +

// 		/* ── PPT title area ── */
// 		'.ppt-title-bar{margin:10px 0 3px;}' +
// 		'.ppt-main-title{font-size:12px;font-weight:700;text-transform:uppercase;text-decoration:underline;letter-spacing:.3px;color:#111;}' +
// 		'.ppt-currency-label{font-size:11px;font-style:italic;color:#555;text-align:right;margin-bottom:4px;}' +

// 		/* ── PPT table specific ── */
// 		'.ppt-table-wrap thead tr.cb-thead-main th{border-color:#005f94;}' +
// 		'.ppt-table-wrap thead tr.cb-thead-sub th{border-color:#c85810;}' +
// 		'.ppt-table-wrap tbody tr td{background:#fff;color:#111;}' +
// 		/* Sub Total / Grand Total rows */
// 		'.ppt-table-wrap tbody tr.ppt-total-row td{font-weight:700;background:#e8f0fa !important;color:#003B63 !important;border-color:#999 !important;}' +
// 		'.ppt-dash{color:#aaa;text-align:center;display:block;}' +

// 		/* ── Budget & Estimate — sticky first column ── */
// 		'#be-table td:first-child{position:sticky;left:0;z-index:10;background:inherit;}' +
// 		'#be-table thead th:first-child{position:sticky;left:0;z-index:30;}' +
// 		'#be-table .cb-thead-main th:first-child{background:#0076B6;}' +
// 		'#be-table .cb-thead-sub th:first-child{background:#F26B21;}' +
// 		'#be-table .cb-row-head td:first-child{background:#E9F4FB;}' +
// 		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6;}' +
// 		'#be-table .cb-row-grand td:first-child{background:#0076B6 !important;}' +
// 		'#be-table .be-item-row td:first-child{background:#fff;}' +
// 		'#be-table .be-grand-col{background:#ddeaf7 !important;color:#003B63;border-left:2px solid #0076B6 !important;}' +
// 		'#be-table .cb-row-grand .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-head .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-sub  .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +

// 		/* ── Loader ── */
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

// 				/* ── PPT TAB ── */
// 				'<div class="cb-tab-pane active" id="tab-ppt">' +

// 					/* Current FY */
// 					'<div class="ppt-title-bar">' +
// 						'<div class="ppt-main-title" id="ppt-main-title">Overall Foundation Numbers - Budget vs. Est</div>' +
// 					'</div>' +
// 					'<div class="ppt-currency-label">&#8377; Cr.</div>' +
// 					'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
// 						'<table id="ppt-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;text-align:center;">Unit</th>' +
// 									'<th colspan="3" id="ppt-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +

// 					/* Previous FY */
// 					'<div class="ppt-title-bar">' +
// 						'<div class="ppt-main-title" id="ppt-prev-title">Overall Foundation Numbers - Previous Year Budget vs. Est</div>' +
// 					'</div>' +
// 					'<div class="ppt-currency-label">&#8377; Cr.</div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table id="ppt-prev-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;text-align:center;">Unit</th>' +
// 									'<th colspan="3" id="ppt-prev-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-prev-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-prev-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +

// 				'</div>' +

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
// 						'<div class="cb-checkbox-area">' +
// 							'<label><input type="checkbox" id="estimate-expand-quarters"> Expand Quarters</label>' +
// 							'<label><input type="checkbox" id="estimate-expand-items"> Expand Line Items</label>' +
// 						'</div>' +
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
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (r.message && r.message.length) {
// 				var years = r.message.map(function (d) { return d.financial_year; });
// 				fyControl.df.options = years.join('\n');
// 				fyControl.refresh();

// 				var today     = new Date();
// 				var year      = today.getFullYear();
// 				var month     = today.getMonth() + 1;
// 				var currentFY = (month >= 4)
// 					? year + '-' + String(year + 1).slice(-2)
// 					: (year - 1) + '-' + String(year).slice(-2);

// 				if (years.indexOf(currentFY) !== -1) {
// 					fyControl.set_value(currentFY);
// 					updatePageTitle(currentFY);
// 				} else {
// 					fyControl.set_value(years[0]);
// 					updatePageTitle(years[0]);
// 				}
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
// 			ppt            : function (fy) { PPT.load(fy);            },
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
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {

// 		var currentFY = '';

// 		function toCr(v) { return (parseFloat(v) || 0) / 10000000; }

// 		function fmt(v) {
// 			var n = parseFloat(v) || 0;
// 			return n === 0
// 				? '<span class="ppt-dash">-</span>'
// 				: n.toFixed(2);
// 		}

// 		// overall_foundation_numbers[idx]:  budget / actual  fields
// 		function transformResponse(message, idx) {
// 			var rows = [], covidRows = [];
// 			(message || []).forEach(function (entity) {
// 				var isCovid = (entity.label || '').toLowerCase().indexOf('covid') !== -1;
// 				var ofn     = (entity.overall_foundation_numbers || [])[idx] || {};
// 				var capEx   = ofn.capital_expenses   || {};
// 				var opEx    = ofn.operating_expenses || {};
// 				var row = {
// 					name  : entity.label || '',
// 					bOpex : toCr(opEx.budget),
// 					bCapex: toCr(capEx.budget),
// 					eOpex : toCr(opEx.actual),
// 					eCapex: toCr(capEx.actual)
// 				};
// 				if (isCovid) { row.isCovid = true; row.label = entity.label; covidRows.push(row); }
// 				else         { rows.push(row); }
// 			});
// 			rows.push({ isSubTotal: true, label: 'Sub Total' });
// 			covidRows.forEach(function (r) { rows.push(r); });
// 			rows.push({ isGrand: true, label: 'Grand Total' });
// 			return rows;
// 		}

// 		function calcTotals(rows) {
// 			var sub = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };
// 			var cov = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };
// 			rows.forEach(function (r) {
// 				if (r.isSubTotal || r.isGrand) { return; }
// 				var t = r.isCovid ? cov : sub;
// 				t.bOpex += r.bOpex||0; t.bCapex += r.bCapex||0;
// 				t.eOpex += r.eOpex||0; t.eCapex += r.eCapex||0;
// 			});
// 			return {
// 				sub  : sub,
// 				grand: { bOpex:sub.bOpex+cov.bOpex, bCapex:sub.bCapex+cov.bCapex,
// 				         eOpex:sub.eOpex+cov.eOpex, eCapex:sub.eCapex+cov.eCapex }
// 			};
// 		}

// 		function renderTable(rows, title, tbodyId, titleId, budgetHdrId, estHdrId) {
// 			$('#' + titleId).text(title);
// 			var bm = title.match(/([\d]{4}-[\d]{2})\s+BUDGET/i);
// 			var em = title.match(/([\d]{4}-[\d]{2})\s+EST/i);
// 			$('#' + budgetHdrId).text(bm ? bm[1] + ' Budget' : 'Budget');
// 			$('#' + estHdrId).text(em ? em[1] + ' Est' : 'Est');

// 			var totals = calcTotals(rows);
// 			var $tb    = $('#' + tbodyId).empty();

// 			rows.forEach(function (row) {
// 				var bO, bC, eO, eC, label, cls = '';
// 				if (row.isSubTotal) {
// 					var s = totals.sub;
// 					bO=s.bOpex; bC=s.bCapex; eO=s.eOpex; eC=s.eCapex;
// 					label = row.label || 'Sub Total'; cls = 'ppt-total-row';
// 				} else if (row.isGrand) {
// 					var g = totals.grand;
// 					bO=g.bOpex; bC=g.bCapex; eO=g.eOpex; eC=g.eCapex;
// 					label = row.label || 'Grand Total'; cls = 'ppt-total-row';
// 				} else {
// 					bO=row.bOpex||0; bC=row.bCapex||0; eO=row.eOpex||0; eC=row.eCapex||0;
// 					label = row.isCovid ? (row.label||'COVID SUPPORT') : row.name;
// 				}
// 				$tb.append(
// 					'<tr class="' + cls + '">' +
// 						'<td>' + label + '</td>' +
// 						'<td>' + fmt(bO) + '</td>' +
// 						'<td>' + fmt(bC) + '</td>' +
// 						'<td>' + fmt(bO+bC) + '</td>' +
// 						'<td>' + fmt(eO) + '</td>' +
// 						'<td>' + fmt(eC) + '</td>' +
// 						'<td>' + fmt(eO+eC) + '</td>' +
// 					'</tr>'
// 				);
// 			});
// 		}

// 		function fetchAndRender(fy) {
// 			var loading = '<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading...</td></tr>';
// 			$('#ppt-tbody,#ppt-prev-tbody').html(loading);
// 			Loader.show('Loading PPT data');

// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.add_expense_totals',
// 				args    : { financial_year: fy, month: 'March', set_group_id: 1, previous_financial_year: getPrevFY(fy) },
// 				callback: function (r) {
// 					Loader.hide();
// 					if (!r.message || !Array.isArray(r.message)) {
// 						$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>');
// 						return;
// 					}
// 					var msg  = r.message;
// 					var ofn0 = ((msg[0]||{}).overall_foundation_numbers||[])[0]||{};
// 					var ofn1 = ((msg[0]||{}).overall_foundation_numbers||[])[1]||{};
// 					var t0   = ofn0.title || ('Overall Foundation Numbers - ' + fy + ' Budget vs. ' + fy + ' Est');
// 					var t1   = ofn1.title || ('Overall Foundation Numbers - ' + getPrevFY(fy) + ' Budget vs. ' + getPrevFY(fy) + ' Est');
// 					renderTable(transformResponse(msg,0), t0, 'ppt-tbody',      'ppt-main-title',  'ppt-budget-hdr',      'ppt-est-hdr');
// 					renderTable(transformResponse(msg,1), t1, 'ppt-prev-tbody', 'ppt-prev-title',  'ppt-prev-budget-hdr', 'ppt-prev-est-hdr');
// 				},
// 				error: function () {
// 					Loader.hide();
// 					$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>');
// 				}
// 			});
// 		}

// 		function load(fy) { currentFY = fy || '2025-26'; fetchAndRender(currentFY); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ANNUAL BUDGET MODULE
// 	// =============================================================================

// 	var Annual = (function () {

// 		var Q_DEFS = {
// 			q1: { label: 'Quarter 1', months: ['April','May','June'] },
// 			q2: { label: 'Quarter 2', months: ['July','August','September'] },
// 			q3: { label: 'Quarter 3', months: ['October','November','December'] },
// 			q4: { label: 'Quarter 4', months: ['January','February','March'] }
// 		};
// 		var Q_KEYS = ['q1','q2','q3','q4'];
// 		var data=[], expandedQ=[], openH={}, openS={}, bound=false;

// 		function sumArr(a) { var t=0; (a||[]).forEach(function(v){t+=(v||0);}); return t; }
// 		function objTotal(o) { var t=0; Q_KEYS.forEach(function(k){t+=sumArr(o[k]);}); return t; }

// 		function qCells(obj) {
// 			var html = '';
// 			Q_KEYS.forEach(function (k) {
// 				var vals = obj[k]||[0,0,0];
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
// 			$m.append('<th rowspan="2" style="min-width:220px;">Expense Head / Line Item</th>');
// 			$m.append('<th rowspan="2" style="min-width:90px;text-align:center;">GL Code</th>');
// 			Q_KEYS.forEach(function (k) {
// 				var o = expandedQ.indexOf(k) !== -1;
// 				$m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o?1:2) + '" style="cursor:pointer;text-align:center;">' + Q_DEFS[k].label + ' ' + (o?'▲':'▼') + '</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s = $('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function (k) {
// 					if (expandedQ.indexOf(k) !== -1) {
// 						Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); });
// 					}
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
// 				Q_KEYS.forEach(function (k) { (head[k]||[0,0,0]).forEach(function(v,mi){grand[k][mi]+=(v||0);}); });

// 				$tb.append(
// 					'<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '">' +
// 						'<td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name.trim() + '</td>' +
// 						'<td style="text-align:center;">-</td>' + qCells(head) +
// 						'<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td>' +
// 					'</tr>'
// 				);

// 				(head.sub_heads||[]).forEach(function (sub, si) {
// 					var sk = hs+'-'+si, so = openS[sk]===true;
// 					$tb.append(
// 						'<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:22px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td>' +
// 							'<td style="text-align:center;">-</td>' + qCells(sub) +
// 							'<td>' + formatINR(objTotal(sub)) + '</td>' +
// 						'</tr>'
// 					);
// 					(sub.items||[]).forEach(function (item) {
// 						$tb.append(
// 							'<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho&&so)?'':'display:none;') + '">' +
// 								'<td style="padding-left:42px;">' + item.name + '</td>' +
// 								'<td style="text-align:center;">' + (item.gl_code||'-') + '</td>' + qCells(item) +
// 								'<td>' + formatINR(objTotal(item)) + '</td>' +
// 							'</tr>'
// 						);
// 					});
// 				});

// 				(head.items||[]).forEach(function (d) {
// 					$tb.append(
// 						'<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:35px;">' + d.name + '</td>' +
// 							'<td style="text-align:center;">' + (d.gl_code||'-') + '</td>' + qCells(d) +
// 							'<td>' + formatINR(objTotal(d)) + '</td>' +
// 						'</tr>'
// 					);
// 				});
// 			});

// 			var gt=0; Q_KEYS.forEach(function(k){gt+=sumArr(grand[k]);});
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td><td style="text-align:center;">-</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			openH[hs] = !(openH[hs]===true);
// 			if (!openH[hs]) {
// 				data.forEach(function(h,hi){ if(String(hi)!==hs){return;} (h.sub_heads||[]).forEach(function(_,si){openS[hs+'-'+si]=false;}); });
// 			}
// 			renderTable();
// 		}
// 		function toggleSub(hs,ss) { openS[hs+'-'+ss]=!(openS[hs+'-'+ss]===true); renderTable(); }

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
// 			$(document).on('input.annual', '#annual-search', function () { renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-quarters', function () {
// 				expandedQ = this.checked ? Q_KEYS.slice() : [];
// 				renderTable();
// 			});
// 			$(document).on('change.annual', '#annual-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function(h,hi){ openH[String(hi)]=true; (h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;}); });
// 				} else { openH={}; openS={}; }
// 				renderTable();
// 			});
// 			$(document).on('click.annual', '#annual-table .cb-q-header', function () {
// 				var k=String($(this).attr('data-quarter')), idx=expandedQ.indexOf(k);
// 				if (idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#annual-expand-quarters').prop('checked', expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 		}

// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			$('#annual-search').val('');
// 			Loader.show('Loading Annual Budget');
// 			frappe.call({
// 				method  : 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args    : { financial_year: fy },
// 				callback: function (r) { data=r.message||[]; renderTable(); Loader.hide(); },
// 				error   : function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}

// 		function load(fy) { if (!bound) { bindEvents(); bound=true; } fetchAndRender(fy); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE
// 	// =============================================================================

// 	var Estimate = (function () {

// 		var Q_DEFS = {
// 			q1: { label:'Quarter 1', months:['April','May','June'] },
// 			q2: { label:'Quarter 2', months:['July','August','September'] },
// 			q3: { label:'Quarter 3', months:['October','November','December'] },
// 			q4: { label:'Quarter 4', months:['January','February','March'] }
// 		};
// 		var Q_KEYS=['q1','q2','q3','q4'];
// 		var Q_IDX={q1:[0,1,2],q2:[3,4,5],q3:[6,7,8],q4:[9,10,11]};
// 		var data=[],expandedQ=[],openH={},openS={},bound=false;

// 		function getMth(obj) {
// 			var m=obj.months||{};
// 			return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),
// 			        parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),
// 			        parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),
// 			        parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)];
// 		}
// 		function qTot(obj){return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)];}
// 		function yTot(obj){var q=qTot(obj);return q[0]+q[1]+q[2]+q[3];}

// 		function qCells(obj) {
// 			var mths=getMth(obj),qtots=qTot(obj),html='';
// 			Q_KEYS.forEach(function(q,qi){
// 				if (expandedQ.indexOf(q)!==-1) {
// 					Q_IDX[q].forEach(function(mi){html+='<td>'+formatINR(mths[mi])+'</td>';});
// 				} else {
// 					html+='<td colspan="3">'+formatINR(qtots[qi])+'</td>';
// 				}
// 			});
// 			return html;
// 		}

// 		function buildHeader() {
// 			var $t=$('#estimate-table thead').empty();
// 			var $m=$('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;">Expense</th>');
// 			Q_KEYS.forEach(function(k){
// 				var o=expandedQ.indexOf(k)!==-1;
// 				$m.append('<th class="est-q-toggle" data-q="'+k+'" colspan="3" rowspan="'+(o?1:2)+'" style="cursor:pointer;text-align:center;">'+Q_DEFS[k].label+' '+(o?'▲':'▼')+'</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s=$('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function(k){
// 					if (expandedQ.indexOf(k)!==-1){Q_DEFS[k].months.forEach(function(m){$s.append('<th>'+m+'</th>');});}
// 				});
// 				$t.append($s);
// 			}
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#estimate-tbody').empty();
// 			var term=$('#estimate-search').val().trim().toLowerCase();
// 			if (!Array.isArray(data)||!data.length) {
// 				$tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			var gM=[0,0,0,0,0,0,0,0,0,0,0,0],gQ=[0,0,0,0];
// 			data.forEach(function(head,hi){
// 				if (term&&!matchSearch(head,term)){return;}
// 				getMth(head).forEach(function(v,i){gM[i]+=v;});
// 				qTot(head).forEach(function(v,i){gQ[i]+=v;});
// 				var hs=String(hi),ho=openH[hs];
// 				$tb.append('<tr class="cb-row-head cb-est-head" data-hi="'+hs+'"><td><span class="cb-arrow">'+(ho?'▼':'▶')+'</span> '+head.name+'</td>'+qCells(head)+'<td class="cb-text-accent">'+formatINR(yTot(head))+'</td></tr>');
// 				(head.items||[]).forEach(function(item){
// 					$tb.append('<tr class="cb-est-head-item" data-hi="'+hs+'" style="'+(ho?'':'display:none;')+'"><td style="padding-left:28px;">'+item.name+(item.gl_code?' ('+item.gl_code+')':'')+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
// 				});
// 				(head.sub_heads||[]).forEach(function(sub,si){
// 					var sk=hs+'-'+si,so=openS[sk];
// 					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="'+hs+'" data-si="'+si+'" style="'+(ho?'':'display:none;')+'"><td style="padding-left:20px;"><span class="cb-arrow">'+(so?'▼':'▶')+'</span> '+sub.name+'</td>'+qCells(sub)+'<td>'+formatINR(yTot(sub))+'</td></tr>');
// 					(sub.items||[]).forEach(function(item){
// 						$tb.append('<tr class="cb-est-sub-item" data-hi="'+hs+'" data-si="'+si+'" style="'+((ho&&so)?'':'display:none;')+'"><td style="padding-left:44px;">'+item.name+(item.gl_code?' ('+item.gl_code+')':'')+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
// 					});
// 				});
// 			});
// 			var gO={Q1:gQ[0],Q2:gQ[1],Q3:gQ[2],Q4:gQ[3],months:{'4':gM[0],'5':gM[1],'6':gM[2],'7':gM[3],'8':gM[4],'9':gM[5],'10':gM[6],'11':gM[7],'12':gM[8],'1':gM[9],'2':gM[10],'3':gM[11]}};
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>'+qCells(gO)+'<td>'+formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3])+'</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			var o=!openH[hs]; openH[hs]=o;
// 			$('#estimate-table tbody .cb-est-head[data-hi="'+hs+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			if (o) {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-head-item[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){
// 					var si=$(this).attr('data-si');
// 					if (openS[hs+'-'+si]){$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+si+'"]').show();}
// 				});
// 			} else {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){var si=$(this).attr('data-si');openS[hs+'-'+si]=false;$(this).find('.cb-arrow').text('▶');});
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"],.cb-est-sub-item[data-hi="'+hs+'"],.cb-est-head-item[data-hi="'+hs+'"]').hide();
// 			}
// 		}
// 		function toggleSub(hs,ss) {
// 			var sk=hs+'-'+ss,o=!openS[sk]; openS[sk]=o;
// 			$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"][data-si="'+ss+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $i=$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+ss+'"]');
// 			o?$i.show():$i.hide();
// 		}
// 		function matchSearch(head,term) {
// 			if (!term){return true;}
// 			if (head.name.toLowerCase().indexOf(term)!==-1){return true;}
// 			for (var s=0;s<(head.sub_heads||[]).length;s++){
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term)!==-1){return true;}
// 				for (var i=0;i<(head.sub_heads[s].items||[]).length;i++){
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 					if ((head.sub_heads[s].items[i].gl_code||'').toLowerCase().indexOf(term)!==-1){return true;}
// 				}
// 			}
// 			for (var d=0;d<(head.items||[]).length;d++){
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 				if ((head.items[d].gl_code||'').toLowerCase().indexOf(term)!==-1){return true;}
// 			}
// 			return false;
// 		}
// 		function bindEvents() {
// 			$(document).on('click.estimate','#estimate-table .est-q-toggle',function(){
// 				var k=String($(this).attr('data-q')),idx=expandedQ.indexOf(k);
// 				if(idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#estimate-expand-quarters').prop('checked',expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$(document).on('change.estimate','#estimate-expand-quarters',function(){expandedQ=this.checked?Q_KEYS.slice():[];renderTable();});
// 			$(document).on('change.estimate','#estimate-expand-items',function(){
// 				if(this.checked){data.forEach(function(h,hi){openH[String(hi)]=true;(h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;});});}
// 				else{openH={};openS={};}
// 				renderTable();
// 			});
// 			$('#tab-estimate').on('click.estimate','.cb-est-head',function(e){e.stopPropagation();toggleHead(String($(this).attr('data-hi')));});
// 			$('#tab-estimate').on('click.estimate','.cb-est-sub', function(e){e.stopPropagation();toggleSub(String($(this).attr('data-hi')),String($(this).attr('data-si')));});
// 			$(document).on('input.estimate','#estimate-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked',false);
// 			var year=(fy||'2025-26').split('-')[0];
// 			Loader.show('Loading Estimate');
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
// 				args    : { fiscal_year: year, accounting_period: '12' },
// 				callback: function(r){
// 					if(r.message&&r.message.status==='success'){data=r.message.data||[];}
// 					else{frappe.msgprint('Failed to load Estimate data.');}
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// BUDGET & ESTIMATE MODULE
// 	// =============================================================================

// 	var BudgetEstimate = (function () {

// 		var rawData=[], currentFY='', openSec={}, openSub={}, expandItems=false, bound=false;

// 		function pl(){return getFYLabels(currentFY).plan;}
// 		function el(){return getFYLabels(currentFY).est;}
// 		function entityLabel(e){return (e.label||'').trim();}

// 		function buildStruct() {
// 			if (!rawData.length){return [];}
// 			return (rawData[0].actuals||[]).map(function(sec){
// 				return {
// 					name     : sec.name,
// 					sub_heads: (sec.sub_heads||[]).map(function(sub){
// 						return {name:sub.name, items:(sub.items||[]).map(function(i){return {name:i.name,gl_code:i.gl_code||''};})};
// 					}),
// 					items: (sec.items||[]).map(function(i){return {name:i.name,gl_code:i.gl_code||''};})
// 				};
// 			});
// 		}

// 		function itemVal(entry,name,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				(sec.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});
// 				(sec.sub_heads||[]).forEach(function(sub){(sub.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});});
// 			});
// 			return v;
// 		}
// 		function subVal(entry,sn,subn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				(sec.sub_heads||[]).forEach(function(sub){
// 					if(sub.name!==subn){return;}
// 					v+=parseFloat(field==='plan'?(sub.ytd||0):(sub.total_posted_amt_ytd||0));
// 				});
// 			});
// 			return v;
// 		}
// 		function secVal(entry,sn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));
// 			});
// 			return v;
// 		}
// 		function grandVal(entry,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));});
// 			return v;
// 		}
// 		function itemCells(name){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(itemVal(e,name,'ytd'))+'</td><td>'+formatINR(itemVal(e,name,'total_posted_amt'))+'</td>';});return h;}
// 		function subCells(sn,subn){var h='';rawData.forEach(function(e){h+='<td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'plan'))+'</td><td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'est'))+'</td>';});return h;}
// 		function secCells(sn){var h='';rawData.forEach(function(e){h+='<td style="font-weight:700;">'+formatINR(secVal(e,sn,'plan'))+'</td><td style="font-weight:700;">'+formatINR(secVal(e,sn,'est'))+'</td>';});return h;}
// 		function grandCells(){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(grandVal(e,'plan'))+'</td><td>'+formatINR(grandVal(e,'est'))+'</td>';});return h;}
// 		function iTotP(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'ytd');});return v;}
// 		function iTotE(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'total_posted_amt');});return v;}
// 		function sTotP(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'plan');});return v;}
// 		function sTotE(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'est');});return v;}
// 		function secTP(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'plan');});return v;}
// 		function secTE(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'est');});return v;}
// 		function allGP(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'plan');});return v;}
// 		function allGE(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'est');});return v;}

// 		function tc2(plan,est,cls){
// 			cls=cls||'';
// 			return '<td class="be-total-plan '+cls+'" style="font-weight:700;">'+formatINR(plan)+'</td>' +
// 			       '<td class="be-total-est '+cls+'" style="font-weight:700;">'+formatINR(est)+'</td>';
// 		}

// 		function buildHeader() {
// 			var $t=$('#be-table thead').empty();
// 			var $r1=$('<tr class="cb-thead-main"></tr>');
// 			var $r2=$('<tr class="cb-thead-sub"></tr>');
// 			$r1.append('<th rowspan="2" style="text-align:left;min-width:280px;position:sticky;left:0;z-index:30;background:#0076B6;">Expense Head / Line Item</th>');
// 			rawData.forEach(function(e){$r1.append('<th colspan="2" style="text-align:center;">'+entityLabel(e)+'</th>');});
// 			$r1.append('<th colspan="2" style="text-align:center;background:#003B63;">Grand Total</th>');
// 			rawData.forEach(function(){
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+pl()+'</th>');
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+el()+'</th>');
// 			});
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+pl()+'</th>');
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+el()+'</th>');
// 			$t.append($r1).append($r2);
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#be-tbody').empty();
// 			var term=$('#be-search').val().trim().toLowerCase();
// 			var struct=buildStruct();
// 			var cols=1+rawData.length*2+2;
// 			if (!rawData.length||!struct.length) {
// 				$tb.append('<tr><td colspan="'+cols+'" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			struct.forEach(function(sec){
// 				var sn=sec.name, secOpen=openSec[sn]!==false, secVis=secOpen?'':'display:none;';
// 				$tb.append(
// 					'<tr class="cb-row-head be-sec-row" data-sec="'+sn+'">' +
// 						'<td style="text-align:left;"><span class="cb-arrow">'+(secOpen?'▼':'▶')+'</span> '+sn+'</td>' +
// 						secCells(sn)+tc2(secTP(sn),secTE(sn),'be-grand-col') +
// 					'</tr>'
// 				);
// 				sec.sub_heads.forEach(function(sub){
// 					var sk=sn+'::'+sub.name, subOpen=expandItems||(openSub[sk]===true), itmVis=(secOpen&&subOpen)?'':'display:none;';
// 					$tb.append(
// 						'<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="'+sn+'" data-sub="'+sk+'" style="'+secVis+'">' +
// 							'<td style="padding-left:22px;text-align:left;"><span class="cb-arrow">'+(subOpen?'▼':'▶')+'</span> '+sub.name+'</td>' +
// 							subCells(sn,sub.name)+tc2(sTotP(sn,sub.name),sTotE(sn,sub.name),'be-grand-col') +
// 						'</tr>'
// 					);
// 					sub.items.forEach(function(item){
// 						if(term&&item.name.toLowerCase().indexOf(term)===-1&&item.gl_code.toLowerCase().indexOf(term)===-1){return;}
// 						$tb.append(
// 							'<tr class="be-item-row be-sec-child be-sub-child" data-sec="'+sn+'" data-sub="'+sk+'" style="'+itmVis+'">' +
// 								'<td style="padding-left:42px;text-align:left;">'+item.name+(item.gl_code?' <span style="color:#aaa;font-size:11px;">('+item.gl_code+')</span>':'')+'</td>' +
// 								itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col') +
// 							'</tr>'
// 						);
// 					});
// 				});
// 				sec.items.forEach(function(item){
// 					if(term&&item.name.toLowerCase().indexOf(term)===-1&&item.gl_code.toLowerCase().indexOf(term)===-1){return;}
// 					$tb.append(
// 						'<tr class="be-item-row be-sec-child be-direct-item" data-sec="'+sn+'" style="'+secVis+'">' +
// 							'<td style="padding-left:30px;text-align:left;">'+item.name+(item.gl_code?' <span style="color:#aaa;font-size:11px;">('+item.gl_code+')</span>':'')+'</td>' +
// 							itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col') +
// 						'</tr>'
// 					);
// 				});
// 			});
// 			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>'+grandCells()+tc2(allGP(),allGE(),'be-grand-col')+'</tr>');
// 		}

// 		function toggleSec(sn){
// 			var o=!(openSec[sn]!==false); openSec[sn]=o;
// 			$('#be-table tbody .be-sec-row[data-sec="'+sn+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $ch=$('#be-table tbody .be-sec-child[data-sec="'+sn+'"]');
// 			if(o){
// 				$ch.filter('.be-sub-row,.be-direct-item').show();
// 				$ch.filter('.be-sub-child').each(function(){var sk=$(this).attr('data-sub');if(expandItems||openSub[sk]===true){$(this).show();}});
// 			} else {$ch.hide();}
// 		}
// 		function toggleSubRow(sk){
// 			var o=!(openSub[sk]===true); openSub[sk]=o;
// 			$('#be-table tbody .be-sub-row[data-sub="'+sk+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $it=$('#be-table tbody .be-sub-child[data-sub="'+sk+'"]');
// 			o?$it.show():$it.hide();
// 		}
// 		function bindEvents(){
// 			$('#tab-budget_estimate').on('click.be','.be-sec-row',function(e){e.stopPropagation();toggleSec($(this).attr('data-sec'));});
// 			$('#tab-budget_estimate').on('click.be','.be-sub-row',function(e){e.stopPropagation();if(!expandItems){toggleSubRow($(this).attr('data-sub'));}});
// 			$(document).on('change.be','#be-expand-items',function(){
// 				expandItems=this.checked;
// 				buildStruct().forEach(function(sec){
// 					openSec[sec.name]=expandItems?true:false;
// 					sec.sub_heads.forEach(function(sub){openSub[sec.name+'::'+sub.name]=expandItems;});
// 				});
// 				renderTable();
// 			});
// 			$(document).on('input.be','#be-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy){
// 			currentFY=fy; rawData=[]; openSec={}; openSub={}; expandItems=false;
// 			$('#be-expand-items').prop('checked',false);
// 			Loader.show('Loading Budget & Estimate');
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.format_api',
// 				args    : { financial_year: fy, month: 'March', set_group_id: "1", previous_financial_year: getPrevFY(fy) },
// 				callback: function(r){
// 					if(r.message&&Array.isArray(r.message)){rawData=r.message;}
// 					else{frappe.msgprint('Failed to load Budget & Estimate data.');}
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Budget & Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// AUTO-LOAD ACTIVE TAB ON PAGE OPEN
// 	// =============================================================================

// 	var initialFY = fyControl.get_value();
// 	if (initialFY) { TabLoader.trigger('ppt'); }

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
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var parts     = (fy || '2025-26').split('-');
// 		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
// 		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
// 		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
// 		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
// 		return {
// 			plan : 'FY' + startYY + '-' + endYY    + ' Plan',
// 			est  : 'FY' + prevStart + '-' + prevEnd + ' Est'
// 		};
// 	}

// 	// =============================================================================
// 	// PREV FY HELPER
// 	// =============================================================================

// 	function getPrevFY(fy) {
// 		var parts = (fy || '2025-26').split('-');
// 		var s = parseInt(parts[0] || '2025', 10) - 1;
// 		var e = parseInt(parts[1] || '26',   10) - 1;
// 		return s + '-' + String(e).padStart(2, '0');
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

// 		':root{' +
// 			'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 			'--orange:#F26B21;--orange-light:#FFF3E6;' +
// 			'--border:#bbb;--border-light:#ddd;--border-header:#005f94;--border-orange:#d45a10;' +
// 		'}' +

// 		'.cb-wrapper{padding:15px;background:#fff;}' +

// 		/* Tab nav */
// 		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:8px 20px;color:#555;font-size:13px;font-weight:400;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:#003B63;font-weight:700;border-bottom:3px solid #003B63;}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +

// 		/* Filter row */
// 		'.cb-filter-row{padding:10px 0;background:#fff;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row{padding:10px;}.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +

// 		/* Controls bar */
// 		'.cb-controls{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;margin-bottom:10px;background:#f7f9fb;border:1px solid #ddd;border-radius:4px;flex-wrap:wrap;gap:8px;}' +
// 		'.cb-search-input{padding:6px 10px;border:1px solid #bbb;border-radius:4px;font-size:13px;width:260px;}' +
// 		'.cb-checkbox-area{display:flex;gap:18px;font-size:13px;font-weight:500;color:#444;}' +
// 		'.cb-checkbox-area label{display:flex;align-items:center;gap:5px;cursor:pointer;}' +

// 		/* Scroll wrapper */
// 		'.cb-scroll-wrapper{border:2px solid #bbb;border-radius:4px;overflow:auto;max-height:72vh;background:#fff;}' +

// 		/* TABLE BASE */
// 		'.cb-table,.ppt-table-wrap{' +
// 			'width:100%;border-collapse:collapse;font-size:13px;font-family:Arial,sans-serif;table-layout:auto;' +
// 		'}' +
// 		'.cb-table th,.cb-table td,' +
// 		'.ppt-table-wrap th,.ppt-table-wrap td{' +
// 			'border:1px solid #bbb;padding:7px 11px;white-space:nowrap;text-align:right;' +
// 		'}' +
// 		'.cb-table th:first-child,.cb-table td:first-child,' +
// 		'.ppt-table-wrap th:first-child,.ppt-table-wrap td:first-child{text-align:left;}' +

// 		/* STICKY HEADERS */
// 		'.cb-thead-main th{' +
// 			'background:#0076B6;color:#fff;font-weight:700;text-align:center !important;' +
// 			'position:sticky;top:0;z-index:25;border-color:#005f94;' +
// 		'}' +
// 		'.cb-thead-sub th{' +
// 			'background:#F26B21;color:#fff;font-weight:600;text-align:center !important;' +
// 			'position:sticky;top:0;z-index:24;border-color:#c85810;min-width:100px;' +
// 		'}' +

// 		/* Row types */
// 		'.cb-row-head{font-weight:700;cursor:pointer;background:#E9F4FB;color:#003B63;}' +
// 		'.cb-row-head:hover td{background:#d0e8f5;}' +
// 		'.cb-row-sub{background:#FFF3E6;font-weight:600;cursor:pointer;}' +
// 		'.cb-row-sub:hover td{background:#ffe0c2;}' +
// 		'.cb-row-grand td{background:#0076B6 !important;color:#fff !important;font-weight:800;border-color:#005f94 !important;}' +
// 		'.cb-text-accent{color:#0076B6;font-weight:600;}' +

// 		/* PPT title */
// 		'.ppt-title-bar{margin:10px 0 3px;}' +
// 		'.ppt-main-title{font-size:12px;font-weight:700;text-transform:uppercase;text-decoration:underline;letter-spacing:.3px;color:#111;}' +
// 		'.ppt-currency-label{font-size:11px;font-style:italic;color:#555;text-align:right;margin-bottom:4px;}' +

// 		/* PPT table */
// 		'.ppt-table-wrap thead tr.cb-thead-main th{border-color:#005f94;}' +
// 		'.ppt-table-wrap thead tr.cb-thead-sub th{border-color:#c85810;}' +
// 		'.ppt-table-wrap tbody tr td{background:#fff;color:#111;}' +
// 		'.ppt-table-wrap tbody tr.ppt-total-row td{font-weight:700;background:#e8f0fa !important;color:#003B63 !important;border-color:#999 !important;}' +
// 		'.ppt-dash{color:#aaa;text-align:center;display:block;}' +

// 		/* BUDGET & ESTIMATE — sticky first column */
// 		'#be-table{border-collapse:collapse;}' +
// 		'#be-table tbody td:first-child{' +
// 			'position:sticky;left:0;z-index:10;' +
// 			'text-align:left !important;min-width:280px;max-width:280px;white-space:normal;word-break:break-word;' +
// 		'}' +
// 		'#be-table tbody tr td:first-child{background:#fff;}' +
// 		'#be-table .cb-row-head td:first-child{background:#E9F4FB !important;}' +
// 		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6 !important;}' +
// 		'#be-table .cb-row-grand td:first-child{background:#0076B6 !important;}' +
// 		'#be-table thead tr.cb-thead-main th:first-child{' +
// 			'position:sticky;left:0;z-index:50 !important;background:#0076B6;' +
// 			'text-align:left !important;min-width:280px;' +
// 		'}' +
// 		'#be-table .be-grand-col{background:#ddeaf7 !important;color:#003B63;border-left:2px solid #0076B6 !important;}' +
// 		'#be-table .cb-row-grand .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-head .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-sub  .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +
// 		'#be-table .cb-thead-main th:not(:first-child){min-width:260px;text-align:center !important;}' +
// 		'#be-table .cb-thead-sub th{min-width:130px;text-align:center !important;}' +
// 		'#be-table tbody td:first-child,' +
// 		'#be-table thead th:first-child{box-shadow:2px 0 5px -2px rgba(0,0,0,0.15);}' +

// 		/* Loader */
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
// 	// STICKY SUB-HEADER OFFSET FIXER
// 	// =============================================================================

// 	function fixStickySubHeader(tableSelector) {
// 		setTimeout(function () {
// 			var $table = $(tableSelector);
// 			if (!$table.length) { return; }
// 			var $mainRow = $table.find('thead tr.cb-thead-main');
// 			var $subRow  = $table.find('thead tr.cb-thead-sub');
// 			if (!$mainRow.length || !$subRow.length) { return; }
// 			var h = $mainRow[0].getBoundingClientRect().height || $mainRow.outerHeight(true) || 0;
// 			if (h > 0) { $subRow.find('th').css('top', h + 'px'); }
// 		}, 50);
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

// 				/* PPT TAB */
// 				'<div class="cb-tab-pane active" id="tab-ppt">' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-main-title">Overall Foundation Numbers - Budget vs. Est</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; Cr.</div>' +
// 					'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
// 						'<table id="ppt-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-prev-title">Overall Foundation Numbers - Previous Year Budget vs. Est</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; Cr.</div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table id="ppt-prev-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-prev-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-prev-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-prev-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 				'</div>' +

// 				'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
// 				'<div class="cb-tab-pane" id="tab-headcount"></div>' +

// 				/* ANNUAL BUDGET */
// 				'<div class="cb-tab-pane" id="tab-annual_budget">' +
// 					'<div class="cb-controls">' +
// 						'<input type="text" id="annual-search" class="cb-search-input" placeholder="Search Expense / Item...">' +
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
// 						'<input type="text" id="estimate-search" class="cb-search-input" placeholder="Search Expense / Item...">' +
// 						'<div class="cb-checkbox-area">' +
// 							'<label><input type="checkbox" id="estimate-expand-quarters"> Expand Quarters</label>' +
// 							'<label><input type="checkbox" id="estimate-expand-items"> Expand Line Items</label>' +
// 						'</div>' +
// 					'</div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* BUDGET & ESTIMATE */
// 				'<div class="cb-tab-pane" id="tab-budget_estimate">' +
// 					'<div class="cb-controls">' +
// 						'<input type="text" id="be-search" class="cb-search-input" placeholder="Search Expense / Item...">' +
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
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (r.message && r.message.length) {
// 				var years = r.message.map(function (d) { return d.financial_year; });
// 				fyControl.df.options = years.join('\n');
// 				fyControl.refresh();
// 				var today     = new Date();
// 				var year      = today.getFullYear();
// 				var month     = today.getMonth() + 1;
// 				var currentFY = (month >= 4)
// 					? year + '-' + String(year + 1).slice(-2)
// 					: (year - 1) + '-' + String(year).slice(-2);
// 				if (years.indexOf(currentFY) !== -1) {
// 					fyControl.set_value(currentFY);
// 					updatePageTitle(currentFY);
// 				} else {
// 					fyControl.set_value(years[0]);
// 					updatePageTitle(years[0]);
// 				}
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
// 			ppt            : function (fy) { PPT.load(fy);            },
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
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {

// 		var currentFY = '';

// 		function toCr(v) { return (parseFloat(v) || 0) / 10000000; }

// 		function fmt(v) {
// 			var n = parseFloat(v) || 0;
// 			return n === 0 ? '<span class="ppt-dash">-</span>' : n.toFixed(2);
// 		}

// 		function transformResponse(message, idx) {
// 			var rows = [], covidRows = [];
// 			(message || []).forEach(function (entity) {
// 				var isCovid = (entity.label || '').toLowerCase().indexOf('covid') !== -1;
// 				var ofn     = (entity.overall_foundation_numbers || [])[idx] || {};
// 				var capEx   = ofn.capital_expenses   || {};
// 				var opEx    = ofn.operating_expenses || {};
// 				var row = {
// 					name  : entity.label || '',
// 					bOpex : toCr(opEx.budget),
// 					bCapex: toCr(capEx.budget),
// 					eOpex : toCr(opEx.actual),
// 					eCapex: toCr(capEx.actual)
// 				};
// 				if (isCovid) { row.isCovid = true; row.label = entity.label; covidRows.push(row); }
// 				else         { rows.push(row); }
// 			});
// 			rows.push({ isSubTotal: true, label: 'Sub Total' });
// 			covidRows.forEach(function (r) { rows.push(r); });
// 			rows.push({ isGrand: true, label: 'Grand Total' });
// 			return rows;
// 		}

// 		function calcTotals(rows) {
// 			var sub = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };
// 			var cov = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };
// 			rows.forEach(function (r) {
// 				if (r.isSubTotal || r.isGrand) { return; }
// 				var t = r.isCovid ? cov : sub;
// 				t.bOpex += r.bOpex||0; t.bCapex += r.bCapex||0;
// 				t.eOpex += r.eOpex||0; t.eCapex += r.eCapex||0;
// 			});
// 			return {
// 				sub  : sub,
// 				grand: { bOpex:sub.bOpex+cov.bOpex, bCapex:sub.bCapex+cov.bCapex,
// 				         eOpex:sub.eOpex+cov.eOpex, eCapex:sub.eCapex+cov.eCapex }
// 			};
// 		}

// 		function renderTable(rows, title, tbodyId, titleId, budgetHdrId, estHdrId, tableId) {
// 			$('#' + titleId).text(title);
// 			var bm = title.match(/([\d]{4}-[\d]{2})\s+BUDGET/i);
// 			var em = title.match(/([\d]{4}-[\d]{2})\s+EST/i);
// 			$('#' + budgetHdrId).text(bm ? bm[1] + ' Budget' : 'Budget');
// 			$('#' + estHdrId).text(em ? em[1] + ' Est' : 'Est');

// 			var totals = calcTotals(rows);
// 			var $tb    = $('#' + tbodyId).empty();

// 			rows.forEach(function (row) {
// 				var bO, bC, eO, eC, label, cls = '';
// 				if (row.isSubTotal) {
// 					var s = totals.sub;
// 					bO=s.bOpex; bC=s.bCapex; eO=s.eOpex; eC=s.eCapex;
// 					label = row.label || 'Sub Total'; cls = 'ppt-total-row';
// 				} else if (row.isGrand) {
// 					var g = totals.grand;
// 					bO=g.bOpex; bC=g.bCapex; eO=g.eOpex; eC=g.eCapex;
// 					label = row.label || 'Grand Total'; cls = 'ppt-total-row';
// 				} else {
// 					bO=row.bOpex||0; bC=row.bCapex||0; eO=row.eOpex||0; eC=row.eCapex||0;
// 					label = row.isCovid ? (row.label||'COVID SUPPORT') : row.name;
// 				}
// 				$tb.append(
// 					'<tr class="' + cls + '">' +
// 						'<td>' + label + '</td>' +
// 						'<td>' + fmt(bO) + '</td><td>' + fmt(bC) + '</td><td>' + fmt(bO+bC) + '</td>' +
// 						'<td>' + fmt(eO) + '</td><td>' + fmt(eC) + '</td><td>' + fmt(eO+eC) + '</td>' +
// 					'</tr>'
// 				);
// 			});

// 			fixStickySubHeader('#' + tableId);
// 		}

// 		function fetchAndRender(fy) {
// 			var loading = '<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading...</td></tr>';
// 			$('#ppt-tbody,#ppt-prev-tbody').html(loading);
// 			Loader.show("We're crafting your PPT visuals to present your ideas clearly");

// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.add_expense_totals',
// 				args    : { financial_year: fy, month: 'March', set_group_id: "4,5", previous_financial_year: getPrevFY(fy) },
// 				callback: function (r) {
// 					Loader.hide();
// 					if (!r.message || !Array.isArray(r.message)) {
// 						$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>');
// 						return;
// 					}
// 					var msg  = r.message;
// 					var ofn0 = ((msg[0]||{}).overall_foundation_numbers||[])[0]||{};
// 					var ofn1 = ((msg[0]||{}).overall_foundation_numbers||[])[1]||{};
// 					var t0   = ofn0.title || ('Overall Foundation Numbers - ' + fy + ' Budget vs. ' + fy + ' Est');
// 					var t1   = ofn1.title || ('Overall Foundation Numbers - ' + getPrevFY(fy) + ' Budget vs. ' + getPrevFY(fy) + ' Est');
// 					renderTable(transformResponse(msg,0), t0, 'ppt-tbody',      'ppt-main-title', 'ppt-budget-hdr',      'ppt-est-hdr',      'ppt-table');
// 					renderTable(transformResponse(msg,1), t1, 'ppt-prev-tbody', 'ppt-prev-title', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr', 'ppt-prev-table');
// 				},
// 				error: function () {
// 					Loader.hide();
// 					$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>');
// 				}
// 			});
// 		}

// 		function load(fy) { currentFY = fy || '2025-26'; fetchAndRender(currentFY); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ANNUAL BUDGET MODULE  — GL Code column REMOVED
// 	// =============================================================================

// 	var Annual = (function () {

// 		var Q_DEFS = {
// 			q1: { label: 'Quarter 1', months: ['April','May','June'] },
// 			q2: { label: 'Quarter 2', months: ['July','August','September'] },
// 			q3: { label: 'Quarter 3', months: ['October','November','December'] },
// 			q4: { label: 'Quarter 4', months: ['January','February','March'] }
// 		};
// 		var Q_KEYS = ['q1','q2','q3','q4'];
// 		var data=[], expandedQ=[], openH={}, openS={}, bound=false;

// 		function sumArr(a) { var t=0; (a||[]).forEach(function(v){t+=(v||0);}); return t; }
// 		function objTotal(o) { var t=0; Q_KEYS.forEach(function(k){t+=sumArr(o[k]);}); return t; }

// 		function qCells(obj) {
// 			var html = '';
// 			Q_KEYS.forEach(function (k) {
// 				var vals = obj[k]||[0,0,0];
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
// 			/* ── GL Code column removed — only Expense Head now ── */
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense Head / Line Item</th>');
// 			Q_KEYS.forEach(function (k) {
// 				var o = expandedQ.indexOf(k) !== -1;
// 				$m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o?1:2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o?'▲':'▼') + '</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s = $('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function (k) {
// 					if (expandedQ.indexOf(k) !== -1) {
// 						Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); });
// 					}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#annual-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb   = $('#annual-table tbody').empty();
// 			var term  = $('#annual-search').val().trim().toLowerCase();
// 			var grand = { q1:[0,0,0], q2:[0,0,0], q3:[0,0,0], q4:[0,0,0] };

// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				var hs = String(hi), ho = openH[hs] === true;
// 				Q_KEYS.forEach(function (k) { (head[k]||[0,0,0]).forEach(function(v,mi){grand[k][mi]+=(v||0);}); });

// 				/* ── No GL Code td ── */
// 				$tb.append(
// 					'<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '">' +
// 						'<td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name.trim() + '</td>' +
// 						qCells(head) +
// 						'<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td>' +
// 					'</tr>'
// 				);

// 				(head.sub_heads||[]).forEach(function (sub, si) {
// 					var sk = hs+'-'+si, so = openS[sk]===true;
// 					$tb.append(
// 						'<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:22px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td>' +
// 							qCells(sub) +
// 							'<td>' + formatINR(objTotal(sub)) + '</td>' +
// 						'</tr>'
// 					);
// 					(sub.items||[]).forEach(function (item) {
// 						$tb.append(
// 							'<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho&&so)?'':'display:none;') + '">' +
// 								'<td style="padding-left:42px;">' + item.name + '</td>' +
// 								qCells(item) +
// 								'<td>' + formatINR(objTotal(item)) + '</td>' +
// 							'</tr>'
// 						);
// 					});
// 				});

// 				(head.items||[]).forEach(function (d) {
// 					$tb.append(
// 						'<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:35px;">' + d.name + '</td>' +
// 							qCells(d) +
// 							'<td>' + formatINR(objTotal(d)) + '</td>' +
// 						'</tr>'
// 					);
// 				});
// 			});

// 			var gt=0; Q_KEYS.forEach(function(k){gt+=sumArr(grand[k]);});
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			openH[hs] = !(openH[hs]===true);
// 			if (!openH[hs]) {
// 				data.forEach(function(h,hi){ if(String(hi)!==hs){return;} (h.sub_heads||[]).forEach(function(_,si){openS[hs+'-'+si]=false;}); });
// 			}
// 			renderTable();
// 		}
// 		function toggleSub(hs,ss) { openS[hs+'-'+ss]=!(openS[hs+'-'+ss]===true); renderTable(); }

// 		function matchSearch(head, term) {
// 			if (!term) { return true; }
// 			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
// 			for (var s=0; s<(head.sub_heads||[]).length; s++) {
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; }
// 				for (var i=0; i<(head.sub_heads[s].items||[]).length; i++) {
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 				}
// 			}
// 			for (var d=0; d<(head.items||[]).length; d++) {
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 			}
// 			return false;
// 		}

// 		function bindEvents() {
// 			$(document).on('input.annual', '#annual-search', function () { renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-quarters', function () {
// 				expandedQ = this.checked ? Q_KEYS.slice() : [];
// 				renderTable();
// 			});
// 			$(document).on('change.annual', '#annual-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function(h,hi){ openH[String(hi)]=true; (h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;}); });
// 				} else { openH={}; openS={}; }
// 				renderTable();
// 			});
// 			$(document).on('click.annual', '#annual-table .cb-q-header', function () {
// 				var k=String($(this).attr('data-quarter')), idx=expandedQ.indexOf(k);
// 				if (idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#annual-expand-quarters').prop('checked', expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 		}

// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			$('#annual-search').val('');
// 			Loader.show('We’re stitching together your annual budget story');
// 			frappe.call({
// 				method  : 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args    : { financial_year: fy },
// 				callback: function (r) { data=r.message||[]; renderTable(); Loader.hide(); },
// 				error   : function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}

// 		function load(fy) { if (!bound) { bindEvents(); bound=true; } fetchAndRender(fy); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE  — GL Code inline text REMOVED
// 	// =============================================================================

// 	var Estimate = (function () {

// 		var Q_DEFS = {
// 			q1: { label:'Quarter 1', months:['April','May','June'] },
// 			q2: { label:'Quarter 2', months:['July','August','September'] },
// 			q3: { label:'Quarter 3', months:['October','November','December'] },
// 			q4: { label:'Quarter 4', months:['January','February','March'] }
// 		};
// 		var Q_KEYS=['q1','q2','q3','q4'];
// 		var Q_IDX={q1:[0,1,2],q2:[3,4,5],q3:[6,7,8],q4:[9,10,11]};
// 		var data=[],expandedQ=[],openH={},openS={},bound=false;

// 		function getMth(obj) {
// 			var m=obj.months||{};
// 			return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),
// 			        parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),
// 			        parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),
// 			        parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)];
// 		}
// 		function qTot(obj){return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)];}
// 		function yTot(obj){var q=qTot(obj);return q[0]+q[1]+q[2]+q[3];}

// 		function qCells(obj) {
// 			var mths=getMth(obj),qtots=qTot(obj),html='';
// 			Q_KEYS.forEach(function(q,qi){
// 				if (expandedQ.indexOf(q)!==-1) {
// 					Q_IDX[q].forEach(function(mi){html+='<td>'+formatINR(mths[mi])+'</td>';});
// 				} else {
// 					html+='<td colspan="3">'+formatINR(qtots[qi])+'</td>';
// 				}
// 			});
// 			return html;
// 		}

// 		function buildHeader() {
// 			var $t=$('#estimate-table thead').empty();
// 			var $m=$('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense</th>');
// 			Q_KEYS.forEach(function(k){
// 				var o=expandedQ.indexOf(k)!==-1;
// 				$m.append('<th class="est-q-toggle" data-q="'+k+'" colspan="3" rowspan="'+(o?1:2)+'" style="cursor:pointer;">'+Q_DEFS[k].label+' '+(o?'▲':'▼')+'</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s=$('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function(k){
// 					if (expandedQ.indexOf(k)!==-1){Q_DEFS[k].months.forEach(function(m){$s.append('<th>'+m+'</th>');});}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#estimate-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#estimate-tbody').empty();
// 			var term=$('#estimate-search').val().trim().toLowerCase();
// 			if (!Array.isArray(data)||!data.length) {
// 				$tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			var gM=[0,0,0,0,0,0,0,0,0,0,0,0],gQ=[0,0,0,0];
// 			data.forEach(function(head,hi){
// 				if (term&&!matchSearch(head,term)){return;}
// 				getMth(head).forEach(function(v,i){gM[i]+=v;});
// 				qTot(head).forEach(function(v,i){gQ[i]+=v;});
// 				var hs=String(hi),ho=openH[hs];
// 				$tb.append(
// 					'<tr class="cb-row-head cb-est-head" data-hi="'+hs+'">' +
// 						'<td><span class="cb-arrow">'+(ho?'▼':'▶')+'</span> '+head.name+'</td>' +
// 						qCells(head)+
// 						'<td class="cb-text-accent">'+formatINR(yTot(head))+'</td>' +
// 					'</tr>'
// 				);
// 				/* ── item name only, no GL code ── */
// 				(head.items||[]).forEach(function(item){
// 					$tb.append(
// 						'<tr class="cb-est-head-item" data-hi="'+hs+'" style="'+(ho?'':'display:none;')+'">' +
// 							'<td style="padding-left:28px;">'+item.name+'</td>' +
// 							qCells(item)+
// 							'<td>'+formatINR(yTot(item))+'</td>' +
// 						'</tr>'
// 					);
// 				});
// 				(head.sub_heads||[]).forEach(function(sub,si){
// 					var sk=hs+'-'+si,so=openS[sk];
// 					$tb.append(
// 						'<tr class="cb-row-sub cb-est-sub" data-hi="'+hs+'" data-si="'+si+'" style="'+(ho?'':'display:none;')+'">' +
// 							'<td style="padding-left:20px;"><span class="cb-arrow">'+(so?'▼':'▶')+'</span> '+sub.name+'</td>' +
// 							qCells(sub)+
// 							'<td>'+formatINR(yTot(sub))+'</td>' +
// 						'</tr>'
// 					);
// 					/* ── item name only, no GL code ── */
// 					(sub.items||[]).forEach(function(item){
// 						$tb.append(
// 							'<tr class="cb-est-sub-item" data-hi="'+hs+'" data-si="'+si+'" style="'+((ho&&so)?'':'display:none;')+'">' +
// 								'<td style="padding-left:44px;">'+item.name+'</td>' +
// 								qCells(item)+
// 								'<td>'+formatINR(yTot(item))+'</td>' +
// 							'</tr>'
// 						);
// 					});
// 				});
// 			});
// 			var gO={Q1:gQ[0],Q2:gQ[1],Q3:gQ[2],Q4:gQ[3],months:{'4':gM[0],'5':gM[1],'6':gM[2],'7':gM[3],'8':gM[4],'9':gM[5],'10':gM[6],'11':gM[7],'12':gM[8],'1':gM[9],'2':gM[10],'3':gM[11]}};
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>'+qCells(gO)+'<td>'+formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3])+'</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			var o=!openH[hs]; openH[hs]=o;
// 			$('#estimate-table tbody .cb-est-head[data-hi="'+hs+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			if (o) {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-head-item[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){
// 					var si=$(this).attr('data-si');
// 					if (openS[hs+'-'+si]){$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+si+'"]').show();}
// 				});
// 			} else {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){var si=$(this).attr('data-si');openS[hs+'-'+si]=false;$(this).find('.cb-arrow').text('▶');});
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"],.cb-est-sub-item[data-hi="'+hs+'"],.cb-est-head-item[data-hi="'+hs+'"]').hide();
// 			}
// 		}
// 		function toggleSub(hs,ss) {
// 			var sk=hs+'-'+ss,o=!openS[sk]; openS[sk]=o;
// 			$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"][data-si="'+ss+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $i=$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+ss+'"]');
// 			o?$i.show():$i.hide();
// 		}
// 		function matchSearch(head,term) {
// 			if (!term){return true;}
// 			if (head.name.toLowerCase().indexOf(term)!==-1){return true;}
// 			for (var s=0;s<(head.sub_heads||[]).length;s++){
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term)!==-1){return true;}
// 				for (var i=0;i<(head.sub_heads[s].items||[]).length;i++){
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 				}
// 			}
// 			for (var d=0;d<(head.items||[]).length;d++){
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 			}
// 			return false;
// 		}
// 		function bindEvents() {
// 			$(document).on('click.estimate','#estimate-table .est-q-toggle',function(){
// 				var k=String($(this).attr('data-q')),idx=expandedQ.indexOf(k);
// 				if(idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#estimate-expand-quarters').prop('checked',expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$(document).on('change.estimate','#estimate-expand-quarters',function(){expandedQ=this.checked?Q_KEYS.slice():[];renderTable();});
// 			$(document).on('change.estimate','#estimate-expand-items',function(){
// 				if(this.checked){data.forEach(function(h,hi){openH[String(hi)]=true;(h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;});});}
// 				else{openH={};openS={};}
// 				renderTable();
// 			});
// 			$('#tab-estimate').on('click.estimate','.cb-est-head',function(e){e.stopPropagation();toggleHead(String($(this).attr('data-hi')));});
// 			$('#tab-estimate').on('click.estimate','.cb-est-sub', function(e){e.stopPropagation();toggleSub(String($(this).attr('data-hi')),String($(this).attr('data-si')));});
// 			$(document).on('input.estimate','#estimate-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked',false);
// 			var year=(fy||'2025-26').split('-')[0];
// 			Loader.show('We’re shaping your projections into a smart view');
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
// 				args    : { fiscal_year: year, accounting_period: '12' },
// 				callback: function(r){
// 					if (r.message) {
// 						if (r.message.status === 'success') {
// 							data = r.message.data || [];
// 						} else if (Array.isArray(r.message)) {
// 							data = r.message;
// 						} else if (r.message.data && Array.isArray(r.message.data)) {
// 							data = r.message.data;
// 						} else {
// 							frappe.msgprint('Failed to load Estimate data.');
// 						}
// 					} else {
// 						frappe.msgprint('Failed to load Estimate data.');
// 					}
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// BUDGET & ESTIMATE MODULE  — GL Code span REMOVED
// 	// =============================================================================

// 	var BudgetEstimate = (function () {

// 		var rawData=[], currentFY='', openSec={}, openSub={}, expandItems=false, bound=false;

// 		function pl(){return getFYLabels(currentFY).plan;}
// 		function el(){return getFYLabels(currentFY).est;}
// 		function entityLabel(e){return (e.label||'').trim();}

// 		function buildStruct() {
// 			if (!rawData.length){return [];}
// 			return (rawData[0].actuals||[]).map(function(sec){
// 				return {
// 					name     : sec.name,
// 					sub_heads: (sec.sub_heads||[]).map(function(sub){
// 						return {name:sub.name, items:(sub.items||[]).map(function(i){return {name:i.name};})};
// 					}),
// 					items: (sec.items||[]).map(function(i){return {name:i.name};})
// 				};
// 			});
// 		}

// 		function itemVal(entry,name,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				(sec.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});
// 				(sec.sub_heads||[]).forEach(function(sub){(sub.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});});
// 			});
// 			return v;
// 		}
// 		function subVal(entry,sn,subn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				(sec.sub_heads||[]).forEach(function(sub){
// 					if(sub.name!==subn){return;}
// 					v+=parseFloat(field==='plan'?(sub.ytd||0):(sub.total_posted_amt_ytd||0));
// 				});
// 			});
// 			return v;
// 		}
// 		function secVal(entry,sn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));
// 			});
// 			return v;
// 		}
// 		function grandVal(entry,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));});
// 			return v;
// 		}
// 		function itemCells(name){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(itemVal(e,name,'ytd'))+'</td><td>'+formatINR(itemVal(e,name,'total_posted_amt'))+'</td>';});return h;}
// 		function subCells(sn,subn){var h='';rawData.forEach(function(e){h+='<td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'plan'))+'</td><td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'est'))+'</td>';});return h;}
// 		function secCells(sn){var h='';rawData.forEach(function(e){h+='<td style="font-weight:700;">'+formatINR(secVal(e,sn,'plan'))+'</td><td style="font-weight:700;">'+formatINR(secVal(e,sn,'est'))+'</td>';});return h;}
// 		function grandCells(){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(grandVal(e,'plan'))+'</td><td>'+formatINR(grandVal(e,'est'))+'</td>';});return h;}
// 		function iTotP(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'ytd');});return v;}
// 		function iTotE(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'total_posted_amt');});return v;}
// 		function sTotP(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'plan');});return v;}
// 		function sTotE(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'est');});return v;}
// 		function secTP(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'plan');});return v;}
// 		function secTE(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'est');});return v;}
// 		function allGP(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'plan');});return v;}
// 		function allGE(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'est');});return v;}

// 		function tc2(plan,est,cls){
// 			cls=cls||'';
// 			return '<td class="be-total-plan '+cls+'" style="font-weight:700;">'+formatINR(plan)+'</td>' +
// 			       '<td class="be-total-est  '+cls+'" style="font-weight:700;">'+formatINR(est)+'</td>';
// 		}

// 		function buildHeader() {
// 			var $t=$('#be-table thead').empty();
// 			var $r1=$('<tr class="cb-thead-main"></tr>');
// 			var $r2=$('<tr class="cb-thead-sub"></tr>');

// 			$r1.append(
// 				'<th rowspan="2" style="' +
// 					'text-align:left !important;min-width:280px;width:280px;' +
// 					'position:sticky;left:0;z-index:50;' +
// 					'background:#0076B6;vertical-align:middle;' +
// 				'">Expense Head / Line Item</th>'
// 			);
// 			rawData.forEach(function(e){
// 				$r1.append('<th colspan="2" style="text-align:center;min-width:260px;">'+entityLabel(e)+'</th>');
// 			});
// 			$r1.append('<th colspan="2" style="text-align:center;min-width:260px;background:#003B63;">Grand Total</th>');

// 			rawData.forEach(function(){
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+pl()+'</th>');
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+el()+'</th>');
// 			});
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+pl()+'</th>');
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+el()+'</th>');

// 			$t.append($r1).append($r2);
// 			fixStickySubHeader('#be-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#be-tbody').empty();
// 			var term=$('#be-search').val().trim().toLowerCase();
// 			var struct=buildStruct();
// 			var cols=1+rawData.length*2+2;
// 			if (!rawData.length||!struct.length) {
// 				$tb.append('<tr><td colspan="'+cols+'" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			struct.forEach(function(sec){
// 				var sn=sec.name, secOpen=openSec[sn]!==false, secVis=secOpen?'':'display:none;';
// 				$tb.append(
// 					'<tr class="cb-row-head be-sec-row" data-sec="'+sn+'">' +
// 						'<td style="text-align:left;"><span class="cb-arrow">'+(secOpen?'▼':'▶')+'</span> '+sn+'</td>' +
// 						secCells(sn)+tc2(secTP(sn),secTE(sn),'be-grand-col') +
// 					'</tr>'
// 				);
// 				sec.sub_heads.forEach(function(sub){
// 					var sk=sn+'::'+sub.name, subOpen=expandItems||(openSub[sk]===true), itmVis=(secOpen&&subOpen)?'':'display:none;';
// 					$tb.append(
// 						'<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="'+sn+'" data-sub="'+sk+'" style="'+secVis+'">' +
// 							'<td style="padding-left:22px;text-align:left;"><span class="cb-arrow">'+(subOpen?'▼':'▶')+'</span> '+sub.name+'</td>' +
// 							subCells(sn,sub.name)+tc2(sTotP(sn,sub.name),sTotE(sn,sub.name),'be-grand-col') +
// 						'</tr>'
// 					);
// 					sub.items.forEach(function(item){
// 						if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 						$tb.append(
// 							'<tr class="be-item-row be-sec-child be-sub-child" data-sec="'+sn+'" data-sub="'+sk+'" style="'+itmVis+'">' +
// 								/* ── item name only, no GL code span ── */
// 								'<td style="padding-left:42px;text-align:left;">'+item.name+'</td>' +
// 								itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col') +
// 							'</tr>'
// 						);
// 					});
// 				});
// 				sec.items.forEach(function(item){
// 					if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 					$tb.append(
// 						'<tr class="be-item-row be-sec-child be-direct-item" data-sec="'+sn+'" style="'+secVis+'">' +
// 							/* ── item name only, no GL code span ── */
// 							'<td style="padding-left:30px;text-align:left;">'+item.name+'</td>' +
// 							itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col') +
// 						'</tr>'
// 					);
// 				});
// 			});
// 			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>'+grandCells()+tc2(allGP(),allGE(),'be-grand-col')+'</tr>');
// 		}

// 		function toggleSec(sn){
// 			var o=!(openSec[sn]!==false); openSec[sn]=o;
// 			$('#be-table tbody .be-sec-row[data-sec="'+sn+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $ch=$('#be-table tbody .be-sec-child[data-sec="'+sn+'"]');
// 			if(o){
// 				$ch.filter('.be-sub-row,.be-direct-item').show();
// 				$ch.filter('.be-sub-child').each(function(){var sk=$(this).attr('data-sub');if(expandItems||openSub[sk]===true){$(this).show();}});
// 			} else {$ch.hide();}
// 		}
// 		function toggleSubRow(sk){
// 			var o=!(openSub[sk]===true); openSub[sk]=o;
// 			$('#be-table tbody .be-sub-row[data-sub="'+sk+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $it=$('#be-table tbody .be-sub-child[data-sub="'+sk+'"]');
// 			o?$it.show():$it.hide();
// 		}
// 		function bindEvents(){
// 			$('#tab-budget_estimate').on('click.be','.be-sec-row',function(e){e.stopPropagation();toggleSec($(this).attr('data-sec'));});
// 			$('#tab-budget_estimate').on('click.be','.be-sub-row',function(e){e.stopPropagation();if(!expandItems){toggleSubRow($(this).attr('data-sub'));}});
// 			$(document).on('change.be','#be-expand-items',function(){
// 				expandItems=this.checked;
// 				buildStruct().forEach(function(sec){
// 					openSec[sec.name]=expandItems?true:false;
// 					sec.sub_heads.forEach(function(sub){openSub[sec.name+'::'+sub.name]=expandItems;});
// 				});
// 				renderTable();
// 			});
// 			$(document).on('input.be','#be-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy){
// 			currentFY=fy; rawData=[]; openSec={}; openSub={}; expandItems=false;
// 			$('#be-expand-items').prop('checked',false);
// 			Loader.show("We’re balancing budget and estimate");		
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.format_api',
// 				args    : { financial_year: fy, month: 'March', set_group_id: "2", previous_financial_year: getPrevFY(fy) },
// 				callback: function(r){
// 					if(r.message&&Array.isArray(r.message)){rawData=r.message;}
// 					else{frappe.msgprint('Failed to load Budget & Estimate data.');}
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Budget & Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// AUTO-LOAD ACTIVE TAB ON PAGE OPEN
// 	// =============================================================================

// 	var initialFY = fyControl.get_value();
// 	if (initialFY) { TabLoader.trigger('ppt'); }

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
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var parts     = (fy || '2025-26').split('-');
// 		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
// 		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
// 		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
// 		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
// 		return {
// 			plan : 'FY' + startYY + '-' + endYY    + ' Plan',
// 			est  : 'FY' + prevStart + '-' + prevEnd + ' Est'
// 		};
// 	}

// 	// =============================================================================
// 	// PREV FY HELPER
// 	// =============================================================================

// 	function getPrevFY(fy) {
// 		var parts = (fy || '2025-26').split('-');
// 		var s = parseInt(parts[0] || '2025', 10) - 1;
// 		var e = parseInt(parts[1] || '26',   10) - 1;
// 		return s + '-' + String(e).padStart(2, '0');
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

// 		':root{' +
// 			'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 			'--orange:#F26B21;--orange-light:#FFF3E6;' +
// 			'--border:#bbb;--border-light:#ddd;--border-header:#005f94;--border-orange:#d45a10;' +
// 		'}' +

// 		'.cb-wrapper{padding:15px;background:#fff;}' +

// 		/* Tab nav */
// 		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:8px 20px;color:#555;font-size:13px;font-weight:400;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:#003B63;font-weight:700;border-bottom:3px solid #003B63;}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +

// 		/* Filter row */
// 		'.cb-filter-row{padding:10px 0;background:#fff;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row{padding:10px;}.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +

// 		/* Controls bar */
// 		'.cb-controls{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;margin-bottom:10px;background:#f7f9fb;border:1px solid #ddd;border-radius:4px;flex-wrap:wrap;gap:8px;}' +
// 		'.cb-search-input{padding:6px 10px;border:1px solid #bbb;border-radius:4px;font-size:13px;width:260px;}' +
// 		'.cb-checkbox-area{display:flex;gap:18px;font-size:13px;font-weight:500;color:#444;}' +
// 		'.cb-checkbox-area label{display:flex;align-items:center;gap:5px;cursor:pointer;}' +

// 		/* Scroll wrapper */
// 		'.cb-scroll-wrapper{border:2px solid #bbb;border-radius:4px;overflow:auto;max-height:72vh;background:#fff;}' +

// 		/* TABLE BASE */
// 		'.cb-table,.ppt-table-wrap{' +
// 			'width:100%;border-collapse:collapse;font-size:13px;font-family:Arial,sans-serif;table-layout:auto;' +
// 		'}' +
// 		'.cb-table th,.cb-table td,' +
// 		'.ppt-table-wrap th,.ppt-table-wrap td{' +
// 			'border:1px solid #bbb;padding:7px 11px;white-space:nowrap;text-align:right;' +
// 		'}' +
// 		'.cb-table th:first-child,.cb-table td:first-child,' +
// 		'.ppt-table-wrap th:first-child,.ppt-table-wrap td:first-child{text-align:left;}' +

// 		/* STICKY HEADERS */
// 		'.cb-thead-main th{' +
// 			'background:#0076B6;color:#fff;font-weight:700;text-align:center !important;' +
// 			'position:sticky;top:0;z-index:25;border-color:#005f94;' +
// 		'}' +
// 		'.cb-thead-sub th{' +
// 			'background:#F26B21;color:#fff;font-weight:600;text-align:center !important;' +
// 			'position:sticky;top:0;z-index:24;border-color:#c85810;min-width:100px;' +
// 		'}' +

// 		/* Row types */
// 		'.cb-row-head{font-weight:700;cursor:pointer;background:#E9F4FB;color:#003B63;}' +
// 		'.cb-row-head:hover td{background:#d0e8f5;}' +
// 		'.cb-row-sub{background:#FFF3E6;font-weight:600;cursor:pointer;}' +
// 		'.cb-row-sub:hover td{background:#ffe0c2;}' +
// 		'.cb-row-grand td{background:#0076B6 !important;color:#fff !important;font-weight:800;border-color:#005f94 !important;}' +
// 		'.cb-text-accent{color:#0076B6;font-weight:600;}' +

// 		/* PPT title */
// 		'.ppt-title-bar{margin:10px 0 3px;}' +
// 		'.ppt-main-title{font-size:12px;font-weight:700;text-transform:uppercase;text-decoration:underline;letter-spacing:.3px;color:#111;}' +
// 		'.ppt-currency-label{font-size:11px;font-style:italic;color:#555;text-align:right;margin-bottom:4px;}' +

// 		/* PPT table */
// 		'.ppt-table-wrap thead tr.cb-thead-main th{border-color:#005f94;}' +
// 		'.ppt-table-wrap thead tr.cb-thead-sub th{border-color:#c85810;}' +
// 		'.ppt-table-wrap tbody tr td{background:#fff;color:#111;}' +
// 		'.ppt-table-wrap tbody tr.ppt-total-row td{font-weight:700;background:#e8f0fa !important;color:#003B63 !important;border-color:#999 !important;}' +
// 		'.ppt-dash{color:#aaa;text-align:center;display:block;}' +

// 		/* BUDGET & ESTIMATE — sticky first column */
// 		'#be-table{border-collapse:collapse;}' +
// 		'#be-table tbody td:first-child{' +
// 			'position:sticky;left:0;z-index:10;' +
// 			'text-align:left !important;min-width:280px;max-width:280px;white-space:normal;word-break:break-word;' +
// 		'}' +
// 		'#be-table tbody tr td:first-child{background:#fff;}' +
// 		'#be-table .cb-row-head td:first-child{background:#E9F4FB !important;}' +
// 		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6 !important;}' +
// 		'#be-table .cb-row-grand td:first-child{background:#0076B6 !important;}' +
// 		'#be-table thead tr.cb-thead-main th:first-child{' +
// 			'position:sticky;left:0;z-index:50 !important;background:#0076B6;' +
// 			'text-align:left !important;min-width:280px;' +
// 		'}' +
// 		'#be-table .be-grand-col{background:#ddeaf7 !important;color:#003B63;border-left:2px solid #0076B6 !important;}' +
// 		'#be-table .cb-row-grand .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-head .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-sub  .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +
// 		'#be-table .cb-thead-main th:not(:first-child){min-width:260px;text-align:center !important;}' +
// 		'#be-table .cb-thead-sub th{min-width:130px;text-align:center !important;}' +
// 		'#be-table tbody td:first-child,' +
// 		'#be-table thead th:first-child{box-shadow:2px 0 5px -2px rgba(0,0,0,0.15);}' +

// 		/* Export button */
// 		'.cb-xl-btn:hover{background:#155233 !important;}' +
// 		'.cb-xl-btn svg{flex-shrink:0;}' +

// 		/* Loader */
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
// 	// STICKY SUB-HEADER OFFSET FIXER
// 	// =============================================================================

// 	function fixStickySubHeader(tableSelector) {
// 		setTimeout(function () {
// 			var $table = $(tableSelector);
// 			if (!$table.length) { return; }
// 			var $mainRow = $table.find('thead tr.cb-thead-main');
// 			var $subRow  = $table.find('thead tr.cb-thead-sub');
// 			if (!$mainRow.length || !$subRow.length) { return; }
// 			var h = $mainRow[0].getBoundingClientRect().height || $mainRow.outerHeight(true) || 0;
// 			if (h > 0) { $subRow.find('th').css('top', h + 'px'); }
// 		}, 50);
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

// 				/* PPT TAB */
// 				'<div class="cb-tab-pane active" id="tab-ppt">' +
// 					'<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">' +
// 						'<button class="cb-xl-btn" id="xl-ppt" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;font-size:13px;font-weight:600;cursor:pointer;border:none;border-radius:4px;background:#1D6F42;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:background .15s;">' +
// 							'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>' +
// 							' Export to Excel' +
// 						'</button>' +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-main-title">Overall Foundation Numbers - Budget vs. Est</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; Cr.</div>' +
// 					'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
// 						'<table id="ppt-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-prev-title">Overall Foundation Numbers - Previous Year Budget vs. Est</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; Cr.</div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table id="ppt-prev-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-prev-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-prev-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-prev-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 				'</div>' +

// 				'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
// 				'<div class="cb-tab-pane" id="tab-headcount"></div>' +

// 				/* ANNUAL BUDGET */
// 				'<div class="cb-tab-pane" id="tab-annual_budget">' +
// 					'<div class="cb-controls">' +
// 						'<input type="text" id="annual-search" class="cb-search-input" placeholder="Search Expense / Item...">' +
// 						'<div class="cb-checkbox-area">' +
// 							'<label><input type="checkbox" id="annual-expand-quarters"> Expand Quarters</label>' +
// 							'<label><input type="checkbox" id="annual-expand-items"> Expand Line Items</label>' +
// 						'</div>' +
// 						'<button class="cb-xl-btn" id="xl-annual" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;font-size:13px;font-weight:600;cursor:pointer;border:none;border-radius:4px;background:#1D6F42;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:background .15s;">' +
// 							'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>' +
// 							' Export to Excel' +
// 						'</button>' +
// 					'</div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* ESTIMATE */
// 				'<div class="cb-tab-pane" id="tab-estimate">' +
// 					'<div class="cb-controls">' +
// 						'<input type="text" id="estimate-search" class="cb-search-input" placeholder="Search Expense / Item...">' +
// 						'<div class="cb-checkbox-area">' +
// 							'<label><input type="checkbox" id="estimate-expand-quarters"> Expand Quarters</label>' +
// 							'<label><input type="checkbox" id="estimate-expand-items"> Expand Line Items</label>' +
// 						'</div>' +
// 						'<button class="cb-xl-btn" id="xl-estimate" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;font-size:13px;font-weight:600;cursor:pointer;border:none;border-radius:4px;background:#1D6F42;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:background .15s;">' +
// 							'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>' +
// 							' Export to Excel' +
// 						'</button>' +
// 					'</div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* BUDGET & ESTIMATE */
// 				'<div class="cb-tab-pane" id="tab-budget_estimate">' +
// 					'<div class="cb-controls">' +
// 						'<input type="text" id="be-search" class="cb-search-input" placeholder="Search Expense / Item...">' +
// 						'<div class="cb-checkbox-area">' +
// 							'<label><input type="checkbox" id="be-expand-items"> Expand Line Items</label>' +
// 						'</div>' +
// 						'<button class="cb-xl-btn" id="xl-be" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;font-size:13px;font-weight:600;cursor:pointer;border:none;border-radius:4px;background:#1D6F42;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:background .15s;">' +
// 							'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>' +
// 							' Export to Excel' +
// 						'</button>' +
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
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (r.message && r.message.length) {
// 				var years = r.message.map(function (d) { return d.financial_year; });
// 				fyControl.df.options = years.join('\n');
// 				fyControl.refresh();
// 				var today     = new Date();
// 				var year      = today.getFullYear();
// 				var month     = today.getMonth() + 1;
// 				var currentFY = (month >= 4)
// 					? year + '-' + String(year + 1).slice(-2)
// 					: (year - 1) + '-' + String(year).slice(-2);
// 				if (years.indexOf(currentFY) !== -1) {
// 					fyControl.set_value(currentFY);
// 					updatePageTitle(currentFY);
// 				} else {
// 					fyControl.set_value(years[0]);
// 					updatePageTitle(years[0]);
// 				}
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
// 			ppt            : function (fy) { PPT.load(fy);            },
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
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {

// 		var currentFY = '';

// 		function toCr(v) { return (parseFloat(v) || 0) / 10000000; }

// 		function fmt(v) {
// 			var n = parseFloat(v) || 0;
// 			return n === 0 ? '<span class="ppt-dash">-</span>' : n.toFixed(2);
// 		}

// 		function transformResponse(message, idx) {
// 			var rows = [], covidRows = [];
// 			(message || []).forEach(function (entity) {
// 				var isCovid = (entity.label || '').toLowerCase().indexOf('covid') !== -1;
// 				var ofn     = (entity.overall_foundation_numbers || [])[idx] || {};
// 				var capEx   = ofn.capital_expenses   || {};
// 				var opEx    = ofn.operating_expenses || {};
// 				var row = {
// 					name  : entity.label || '',
// 					bOpex : toCr(opEx.budget),
// 					bCapex: toCr(capEx.budget),
// 					eOpex : toCr(opEx.actual),
// 					eCapex: toCr(capEx.actual)
// 				};
// 				if (isCovid) { row.isCovid = true; row.label = entity.label; covidRows.push(row); }
// 				else         { rows.push(row); }
// 			});
// 			rows.push({ isSubTotal: true, label: 'Sub Total' });
// 			covidRows.forEach(function (r) { rows.push(r); });
// 			rows.push({ isGrand: true, label: 'Grand Total' });
// 			return rows;
// 		}

// 		function calcTotals(rows) {
// 			var sub = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };
// 			var cov = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };
// 			rows.forEach(function (r) {
// 				if (r.isSubTotal || r.isGrand) { return; }
// 				var t = r.isCovid ? cov : sub;
// 				t.bOpex += r.bOpex||0; t.bCapex += r.bCapex||0;
// 				t.eOpex += r.eOpex||0; t.eCapex += r.eCapex||0;
// 			});
// 			return {
// 				sub  : sub,
// 				grand: { bOpex:sub.bOpex+cov.bOpex, bCapex:sub.bCapex+cov.bCapex,
// 				         eOpex:sub.eOpex+cov.eOpex, eCapex:sub.eCapex+cov.eCapex }
// 			};
// 		}

// 		function renderTable(rows, title, tbodyId, titleId, budgetHdrId, estHdrId, tableId) {
// 			$('#' + titleId).text(title);
// 			var bm = title.match(/([\d]{4}-[\d]{2})\s+BUDGET/i);
// 			var em = title.match(/([\d]{4}-[\d]{2})\s+EST/i);
// 			$('#' + budgetHdrId).text(bm ? bm[1] + ' Budget' : 'Budget');
// 			$('#' + estHdrId).text(em ? em[1] + ' Est' : 'Est');

// 			var totals = calcTotals(rows);
// 			var $tb    = $('#' + tbodyId).empty();

// 			rows.forEach(function (row) {
// 				var bO, bC, eO, eC, label, cls = '';
// 				if (row.isSubTotal) {
// 					var s = totals.sub;
// 					bO=s.bOpex; bC=s.bCapex; eO=s.eOpex; eC=s.eCapex;
// 					label = row.label || 'Sub Total'; cls = 'ppt-total-row';
// 				} else if (row.isGrand) {
// 					var g = totals.grand;
// 					bO=g.bOpex; bC=g.bCapex; eO=g.eOpex; eC=g.eCapex;
// 					label = row.label || 'Grand Total'; cls = 'ppt-total-row';
// 				} else {
// 					bO=row.bOpex||0; bC=row.bCapex||0; eO=row.eOpex||0; eC=row.eCapex||0;
// 					label = row.isCovid ? (row.label||'COVID SUPPORT') : row.name;
// 				}
// 				$tb.append(
// 					'<tr class="' + cls + '">' +
// 						'<td>' + label + '</td>' +
// 						'<td>' + fmt(bO) + '</td><td>' + fmt(bC) + '</td><td>' + fmt(bO+bC) + '</td>' +
// 						'<td>' + fmt(eO) + '</td><td>' + fmt(eC) + '</td><td>' + fmt(eO+eC) + '</td>' +
// 					'</tr>'
// 				);
// 			});

// 			fixStickySubHeader('#' + tableId);
// 		}

// 		function fetchAndRender(fy) {
// 			var loading = '<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading...</td></tr>';
// 			$('#ppt-tbody,#ppt-prev-tbody').html(loading);
// 			Loader.show("We're crafting your PPT visuals to present your ideas clearly");

// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.add_expense_totals',
// 				args    : { financial_year: fy, month: 'March', set_group_id: "4,5", previous_financial_year: getPrevFY(fy) },
// 				callback: function (r) {
// 					Loader.hide();
// 					if (!r.message || !Array.isArray(r.message)) {
// 						$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>');
// 						return;
// 					}
// 					var msg  = r.message;
// 					var ofn0 = ((msg[0]||{}).overall_foundation_numbers||[])[0]||{};
// 					var ofn1 = ((msg[0]||{}).overall_foundation_numbers||[])[1]||{};
// 					var t0   = ofn0.title || ('Overall Foundation Numbers - ' + fy + ' Budget vs. ' + fy + ' Est');
// 					var t1   = ofn1.title || ('Overall Foundation Numbers - ' + getPrevFY(fy) + ' Budget vs. ' + getPrevFY(fy) + ' Est');
// 					renderTable(transformResponse(msg,0), t0, 'ppt-tbody',      'ppt-main-title', 'ppt-budget-hdr',      'ppt-est-hdr',      'ppt-table');
// 					renderTable(transformResponse(msg,1), t1, 'ppt-prev-tbody', 'ppt-prev-title', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr', 'ppt-prev-table');
// 				},
// 				error: function () {
// 					Loader.hide();
// 					$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>');
// 				}
// 			});
// 		}

// 		function load(fy) { currentFY = fy || '2025-26'; fetchAndRender(currentFY); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ANNUAL BUDGET MODULE
// 	// =============================================================================

// 	var Annual = (function () {

// 		var Q_DEFS = {
// 			q1: { label: 'Quarter 1', months: ['April','May','June'] },
// 			q2: { label: 'Quarter 2', months: ['July','August','September'] },
// 			q3: { label: 'Quarter 3', months: ['October','November','December'] },
// 			q4: { label: 'Quarter 4', months: ['January','February','March'] }
// 		};
// 		var Q_KEYS = ['q1','q2','q3','q4'];
// 		var data=[], expandedQ=[], openH={}, openS={}, bound=false;

// 		function sumArr(a) { var t=0; (a||[]).forEach(function(v){t+=(v||0);}); return t; }
// 		function objTotal(o) { var t=0; Q_KEYS.forEach(function(k){t+=sumArr(o[k]);}); return t; }

// 		function qCells(obj) {
// 			var html = '';
// 			Q_KEYS.forEach(function (k) {
// 				var vals = obj[k]||[0,0,0];
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
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense Head / Line Item</th>');
// 			Q_KEYS.forEach(function (k) {
// 				var o = expandedQ.indexOf(k) !== -1;
// 				$m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o?1:2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o?'▲':'▼') + '</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s = $('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function (k) {
// 					if (expandedQ.indexOf(k) !== -1) {
// 						Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); });
// 					}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#annual-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb   = $('#annual-table tbody').empty();
// 			var term  = $('#annual-search').val().trim().toLowerCase();
// 			var grand = { q1:[0,0,0], q2:[0,0,0], q3:[0,0,0], q4:[0,0,0] };

// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				var hs = String(hi), ho = openH[hs] === true;
// 				Q_KEYS.forEach(function (k) { (head[k]||[0,0,0]).forEach(function(v,mi){grand[k][mi]+=(v||0);}); });

// 				$tb.append(
// 					'<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '">' +
// 						'<td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name.trim() + '</td>' +
// 						qCells(head) +
// 						'<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td>' +
// 					'</tr>'
// 				);

// 				(head.sub_heads||[]).forEach(function (sub, si) {
// 					var sk = hs+'-'+si, so = openS[sk]===true;
// 					$tb.append(
// 						'<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:22px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td>' +
// 							qCells(sub) +
// 							'<td>' + formatINR(objTotal(sub)) + '</td>' +
// 						'</tr>'
// 					);
// 					(sub.items||[]).forEach(function (item) {
// 						$tb.append(
// 							'<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho&&so)?'':'display:none;') + '">' +
// 								'<td style="padding-left:42px;">' + item.name + '</td>' +
// 								qCells(item) +
// 								'<td>' + formatINR(objTotal(item)) + '</td>' +
// 							'</tr>'
// 						);
// 					});
// 				});

// 				(head.items||[]).forEach(function (d) {
// 					$tb.append(
// 						'<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:35px;">' + d.name + '</td>' +
// 							qCells(d) +
// 							'<td>' + formatINR(objTotal(d)) + '</td>' +
// 						'</tr>'
// 					);
// 				});
// 			});

// 			var gt=0; Q_KEYS.forEach(function(k){gt+=sumArr(grand[k]);});
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			openH[hs] = !(openH[hs]===true);
// 			if (!openH[hs]) {
// 				data.forEach(function(h,hi){ if(String(hi)!==hs){return;} (h.sub_heads||[]).forEach(function(_,si){openS[hs+'-'+si]=false;}); });
// 			}
// 			renderTable();
// 		}
// 		function toggleSub(hs,ss) { openS[hs+'-'+ss]=!(openS[hs+'-'+ss]===true); renderTable(); }

// 		function matchSearch(head, term) {
// 			if (!term) { return true; }
// 			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
// 			for (var s=0; s<(head.sub_heads||[]).length; s++) {
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; }
// 				for (var i=0; i<(head.sub_heads[s].items||[]).length; i++) {
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 				}
// 			}
// 			for (var d=0; d<(head.items||[]).length; d++) {
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 			}
// 			return false;
// 		}

// 		function bindEvents() {
// 			$(document).on('input.annual', '#annual-search', function () { renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-quarters', function () {
// 				expandedQ = this.checked ? Q_KEYS.slice() : [];
// 				renderTable();
// 			});
// 			$(document).on('change.annual', '#annual-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function(h,hi){ openH[String(hi)]=true; (h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;}); });
// 				} else { openH={}; openS={}; }
// 				renderTable();
// 			});
// 			$(document).on('click.annual', '#annual-table .cb-q-header', function () {
// 				var k=String($(this).attr('data-quarter')), idx=expandedQ.indexOf(k);
// 				if (idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#annual-expand-quarters').prop('checked', expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 		}

// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			$('#annual-search').val('');
// 			Loader.show('We\u2019re stitching together your annual budget story');
// 			frappe.call({
// 				method  : 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args    : { financial_year: fy },
// 				callback: function (r) { data=r.message||[]; renderTable(); Loader.hide(); },
// 				error   : function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}

// 		function load(fy) { if (!bound) { bindEvents(); bound=true; } fetchAndRender(fy); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE
// 	// =============================================================================

// 	var Estimate = (function () {

// 		var Q_DEFS = {
// 			q1: { label:'Quarter 1', months:['April','May','June'] },
// 			q2: { label:'Quarter 2', months:['July','August','September'] },
// 			q3: { label:'Quarter 3', months:['October','November','December'] },
// 			q4: { label:'Quarter 4', months:['January','February','March'] }
// 		};
// 		var Q_KEYS=['q1','q2','q3','q4'];
// 		var Q_IDX={q1:[0,1,2],q2:[3,4,5],q3:[6,7,8],q4:[9,10,11]};
// 		var data=[],expandedQ=[],openH={},openS={},bound=false;

// 		function getMth(obj) {
// 			var m=obj.months||{};
// 			return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),
// 			        parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),
// 			        parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),
// 			        parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)];
// 		}
// 		function qTot(obj){return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)];}
// 		function yTot(obj){var q=qTot(obj);return q[0]+q[1]+q[2]+q[3];}

// 		function qCells(obj) {
// 			var mths=getMth(obj),qtots=qTot(obj),html='';
// 			Q_KEYS.forEach(function(q,qi){
// 				if (expandedQ.indexOf(q)!==-1) {
// 					Q_IDX[q].forEach(function(mi){html+='<td>'+formatINR(mths[mi])+'</td>';});
// 				} else {
// 					html+='<td colspan="3">'+formatINR(qtots[qi])+'</td>';
// 				}
// 			});
// 			return html;
// 		}

// 		function buildHeader() {
// 			var $t=$('#estimate-table thead').empty();
// 			var $m=$('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense</th>');
// 			Q_KEYS.forEach(function(k){
// 				var o=expandedQ.indexOf(k)!==-1;
// 				$m.append('<th class="est-q-toggle" data-q="'+k+'" colspan="3" rowspan="'+(o?1:2)+'" style="cursor:pointer;">'+Q_DEFS[k].label+' '+(o?'▲':'▼')+'</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s=$('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function(k){
// 					if (expandedQ.indexOf(k)!==-1){Q_DEFS[k].months.forEach(function(m){$s.append('<th>'+m+'</th>');});}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#estimate-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#estimate-tbody').empty();
// 			var term=$('#estimate-search').val().trim().toLowerCase();
// 			if (!Array.isArray(data)||!data.length) {
// 				$tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			var gM=[0,0,0,0,0,0,0,0,0,0,0,0],gQ=[0,0,0,0];
// 			data.forEach(function(head,hi){
// 				if (term&&!matchSearch(head,term)){return;}
// 				getMth(head).forEach(function(v,i){gM[i]+=v;});
// 				qTot(head).forEach(function(v,i){gQ[i]+=v;});
// 				var hs=String(hi),ho=openH[hs];
// 				$tb.append(
// 					'<tr class="cb-row-head cb-est-head" data-hi="'+hs+'">' +
// 						'<td><span class="cb-arrow">'+(ho?'▼':'▶')+'</span> '+head.name+'</td>' +
// 						qCells(head)+
// 						'<td class="cb-text-accent">'+formatINR(yTot(head))+'</td>' +
// 					'</tr>'
// 				);
// 				(head.items||[]).forEach(function(item){
// 					$tb.append(
// 						'<tr class="cb-est-head-item" data-hi="'+hs+'" style="'+(ho?'':'display:none;')+'">' +
// 							'<td style="padding-left:28px;">'+item.name+'</td>' +
// 							qCells(item)+
// 							'<td>'+formatINR(yTot(item))+'</td>' +
// 						'</tr>'
// 					);
// 				});
// 				(head.sub_heads||[]).forEach(function(sub,si){
// 					var sk=hs+'-'+si,so=openS[sk];
// 					$tb.append(
// 						'<tr class="cb-row-sub cb-est-sub" data-hi="'+hs+'" data-si="'+si+'" style="'+(ho?'':'display:none;')+'">' +
// 							'<td style="padding-left:20px;"><span class="cb-arrow">'+(so?'▼':'▶')+'</span> '+sub.name+'</td>' +
// 							qCells(sub)+
// 							'<td>'+formatINR(yTot(sub))+'</td>' +
// 						'</tr>'
// 					);
// 					(sub.items||[]).forEach(function(item){
// 						$tb.append(
// 							'<tr class="cb-est-sub-item" data-hi="'+hs+'" data-si="'+si+'" style="'+((ho&&so)?'':'display:none;')+'">' +
// 								'<td style="padding-left:44px;">'+item.name+'</td>' +
// 								qCells(item)+
// 								'<td>'+formatINR(yTot(item))+'</td>' +
// 							'</tr>'
// 						);
// 					});
// 				});
// 			});
// 			var gO={Q1:gQ[0],Q2:gQ[1],Q3:gQ[2],Q4:gQ[3],months:{'4':gM[0],'5':gM[1],'6':gM[2],'7':gM[3],'8':gM[4],'9':gM[5],'10':gM[6],'11':gM[7],'12':gM[8],'1':gM[9],'2':gM[10],'3':gM[11]}};
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>'+qCells(gO)+'<td>'+formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3])+'</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			var o=!openH[hs]; openH[hs]=o;
// 			$('#estimate-table tbody .cb-est-head[data-hi="'+hs+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			if (o) {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-head-item[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){
// 					var si=$(this).attr('data-si');
// 					if (openS[hs+'-'+si]){$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+si+'"]').show();}
// 				});
// 			} else {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){var si=$(this).attr('data-si');openS[hs+'-'+si]=false;$(this).find('.cb-arrow').text('▶');});
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"],.cb-est-sub-item[data-hi="'+hs+'"],.cb-est-head-item[data-hi="'+hs+'"]').hide();
// 			}
// 		}
// 		function toggleSub(hs,ss) {
// 			var sk=hs+'-'+ss,o=!openS[sk]; openS[sk]=o;
// 			$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"][data-si="'+ss+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $i=$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+ss+'"]');
// 			o?$i.show():$i.hide();
// 		}
// 		function matchSearch(head,term) {
// 			if (!term){return true;}
// 			if (head.name.toLowerCase().indexOf(term)!==-1){return true;}
// 			for (var s=0;s<(head.sub_heads||[]).length;s++){
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term)!==-1){return true;}
// 				for (var i=0;i<(head.sub_heads[s].items||[]).length;i++){
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 				}
// 			}
// 			for (var d=0;d<(head.items||[]).length;d++){
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 			}
// 			return false;
// 		}
// 		function bindEvents() {
// 			$(document).on('click.estimate','#estimate-table .est-q-toggle',function(){
// 				var k=String($(this).attr('data-q')),idx=expandedQ.indexOf(k);
// 				if(idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#estimate-expand-quarters').prop('checked',expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$(document).on('change.estimate','#estimate-expand-quarters',function(){expandedQ=this.checked?Q_KEYS.slice():[];renderTable();});
// 			$(document).on('change.estimate','#estimate-expand-items',function(){
// 				if(this.checked){data.forEach(function(h,hi){openH[String(hi)]=true;(h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;});});}
// 				else{openH={};openS={};}
// 				renderTable();
// 			});
// 			$('#tab-estimate').on('click.estimate','.cb-est-head',function(e){e.stopPropagation();toggleHead(String($(this).attr('data-hi')));});
// 			$('#tab-estimate').on('click.estimate','.cb-est-sub', function(e){e.stopPropagation();toggleSub(String($(this).attr('data-hi')),String($(this).attr('data-si')));});
// 			$(document).on('input.estimate','#estimate-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked',false);
// 			var year=(fy||'2025-26').split('-')[0];
// 			Loader.show('We\u2019re shaping your projections into a smart view');
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
// 				args    : { fiscal_year: year, accounting_period: '12' },
// 				callback: function(r){
// 					if (r.message) {
// 						if (r.message.status === 'success') {
// 							data = r.message.data || [];
// 						} else if (Array.isArray(r.message)) {
// 							data = r.message;
// 						} else if (r.message.data && Array.isArray(r.message.data)) {
// 							data = r.message.data;
// 						} else {
// 							frappe.msgprint('Failed to load Estimate data.');
// 						}
// 					} else {
// 						frappe.msgprint('Failed to load Estimate data.');
// 					}
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// BUDGET & ESTIMATE MODULE
// 	// =============================================================================

// 	var BudgetEstimate = (function () {

// 		var rawData=[], currentFY='', openSec={}, openSub={}, expandItems=false, bound=false;

// 		function pl(){return getFYLabels(currentFY).plan;}
// 		function el(){return getFYLabels(currentFY).est;}
// 		function entityLabel(e){return (e.label||'').trim();}

// 		function buildStruct() {
// 			if (!rawData.length){return [];}
// 			return (rawData[0].actuals||[]).map(function(sec){
// 				return {
// 					name     : sec.name,
// 					sub_heads: (sec.sub_heads||[]).map(function(sub){
// 						return {name:sub.name, items:(sub.items||[]).map(function(i){return {name:i.name};})};
// 					}),
// 					items: (sec.items||[]).map(function(i){return {name:i.name};})
// 				};
// 			});
// 		}

// 		function itemVal(entry,name,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				(sec.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});
// 				(sec.sub_heads||[]).forEach(function(sub){(sub.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});});
// 			});
// 			return v;
// 		}
// 		function subVal(entry,sn,subn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				(sec.sub_heads||[]).forEach(function(sub){
// 					if(sub.name!==subn){return;}
// 					v+=parseFloat(field==='plan'?(sub.ytd||0):(sub.total_posted_amt_ytd||0));
// 				});
// 			});
// 			return v;
// 		}
// 		function secVal(entry,sn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));
// 			});
// 			return v;
// 		}
// 		function grandVal(entry,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));});
// 			return v;
// 		}
// 		function itemCells(name){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(itemVal(e,name,'ytd'))+'</td><td>'+formatINR(itemVal(e,name,'total_posted_amt'))+'</td>';});return h;}
// 		function subCells(sn,subn){var h='';rawData.forEach(function(e){h+='<td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'plan'))+'</td><td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'est'))+'</td>';});return h;}
// 		function secCells(sn){var h='';rawData.forEach(function(e){h+='<td style="font-weight:700;">'+formatINR(secVal(e,sn,'plan'))+'</td><td style="font-weight:700;">'+formatINR(secVal(e,sn,'est'))+'</td>';});return h;}
// 		function grandCells(){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(grandVal(e,'plan'))+'</td><td>'+formatINR(grandVal(e,'est'))+'</td>';});return h;}
// 		function iTotP(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'ytd');});return v;}
// 		function iTotE(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'total_posted_amt');});return v;}
// 		function sTotP(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'plan');});return v;}
// 		function sTotE(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'est');});return v;}
// 		function secTP(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'plan');});return v;}
// 		function secTE(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'est');});return v;}
// 		function allGP(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'plan');});return v;}
// 		function allGE(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'est');});return v;}

// 		function tc2(plan,est,cls){
// 			cls=cls||'';
// 			return '<td class="be-total-plan '+cls+'" style="font-weight:700;">'+formatINR(plan)+'</td>' +
// 			       '<td class="be-total-est  '+cls+'" style="font-weight:700;">'+formatINR(est)+'</td>';
// 		}

// 		function buildHeader() {
// 			var $t=$('#be-table thead').empty();
// 			var $r1=$('<tr class="cb-thead-main"></tr>');
// 			var $r2=$('<tr class="cb-thead-sub"></tr>');

// 			$r1.append(
// 				'<th rowspan="2" style="' +
// 					'text-align:left !important;min-width:280px;width:280px;' +
// 					'position:sticky;left:0;z-index:50;' +
// 					'background:#0076B6;vertical-align:middle;' +
// 				'">Expense Head / Line Item</th>'
// 			);
// 			rawData.forEach(function(e){
// 				$r1.append('<th colspan="2" style="text-align:center;min-width:260px;">'+entityLabel(e)+'</th>');
// 			});
// 			$r1.append('<th colspan="2" style="text-align:center;min-width:260px;background:#003B63;">Grand Total</th>');

// 			rawData.forEach(function(){
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+pl()+'</th>');
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+el()+'</th>');
// 			});
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+pl()+'</th>');
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+el()+'</th>');

// 			$t.append($r1).append($r2);
// 			fixStickySubHeader('#be-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#be-tbody').empty();
// 			var term=$('#be-search').val().trim().toLowerCase();
// 			var struct=buildStruct();
// 			var cols=1+rawData.length*2+2;
// 			if (!rawData.length||!struct.length) {
// 				$tb.append('<tr><td colspan="'+cols+'" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			struct.forEach(function(sec){
// 				var sn=sec.name, secOpen=openSec[sn]!==false, secVis=secOpen?'':'display:none;';
// 				$tb.append(
// 					'<tr class="cb-row-head be-sec-row" data-sec="'+sn+'">' +
// 						'<td style="text-align:left;"><span class="cb-arrow">'+(secOpen?'▼':'▶')+'</span> '+sn+'</td>' +
// 						secCells(sn)+tc2(secTP(sn),secTE(sn),'be-grand-col') +
// 					'</tr>'
// 				);
// 				sec.sub_heads.forEach(function(sub){
// 					var sk=sn+'::'+sub.name, subOpen=expandItems||(openSub[sk]===true), itmVis=(secOpen&&subOpen)?'':'display:none;';
// 					$tb.append(
// 						'<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="'+sn+'" data-sub="'+sk+'" style="'+secVis+'">' +
// 							'<td style="padding-left:22px;text-align:left;"><span class="cb-arrow">'+(subOpen?'▼':'▶')+'</span> '+sub.name+'</td>' +
// 							subCells(sn,sub.name)+tc2(sTotP(sn,sub.name),sTotE(sn,sub.name),'be-grand-col') +
// 						'</tr>'
// 					);
// 					sub.items.forEach(function(item){
// 						if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 						$tb.append(
// 							'<tr class="be-item-row be-sec-child be-sub-child" data-sec="'+sn+'" data-sub="'+sk+'" style="'+itmVis+'">' +
// 								'<td style="padding-left:42px;text-align:left;">'+item.name+'</td>' +
// 								itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col') +
// 							'</tr>'
// 						);
// 					});
// 				});
// 				sec.items.forEach(function(item){
// 					if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 					$tb.append(
// 						'<tr class="be-item-row be-sec-child be-direct-item" data-sec="'+sn+'" style="'+secVis+'">' +
// 							'<td style="padding-left:30px;text-align:left;">'+item.name+'</td>' +
// 							itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col') +
// 						'</tr>'
// 					);
// 				});
// 			});
// 			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>'+grandCells()+tc2(allGP(),allGE(),'be-grand-col')+'</tr>');
// 		}

// 		function toggleSec(sn){
// 			var o=!(openSec[sn]!==false); openSec[sn]=o;
// 			$('#be-table tbody .be-sec-row[data-sec="'+sn+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $ch=$('#be-table tbody .be-sec-child[data-sec="'+sn+'"]');
// 			if(o){
// 				$ch.filter('.be-sub-row,.be-direct-item').show();
// 				$ch.filter('.be-sub-child').each(function(){var sk=$(this).attr('data-sub');if(expandItems||openSub[sk]===true){$(this).show();}});
// 			} else {$ch.hide();}
// 		}
// 		function toggleSubRow(sk){
// 			var o=!(openSub[sk]===true); openSub[sk]=o;
// 			$('#be-table tbody .be-sub-row[data-sub="'+sk+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $it=$('#be-table tbody .be-sub-child[data-sub="'+sk+'"]');
// 			o?$it.show():$it.hide();
// 		}
// 		function bindEvents(){
// 			$('#tab-budget_estimate').on('click.be','.be-sec-row',function(e){e.stopPropagation();toggleSec($(this).attr('data-sec'));});
// 			$('#tab-budget_estimate').on('click.be','.be-sub-row',function(e){e.stopPropagation();if(!expandItems){toggleSubRow($(this).attr('data-sub'));}});
// 			$(document).on('change.be','#be-expand-items',function(){
// 				expandItems=this.checked;
// 				buildStruct().forEach(function(sec){
// 					openSec[sec.name]=expandItems?true:false;
// 					sec.sub_heads.forEach(function(sub){openSub[sec.name+'::'+sub.name]=expandItems;});
// 				});
// 				renderTable();
// 			});
// 			$(document).on('input.be','#be-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy){
// 			currentFY=fy; rawData=[]; openSec={}; openSub={}; expandItems=false;
// 			$('#be-expand-items').prop('checked',false);
// 			Loader.show("We're balancing budget and estimate");
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.format_api',
// 				args    : { financial_year: fy, month: 'March', set_group_id: "2", previous_financial_year: getPrevFY(fy) },
// 				callback: function(r){
// 					if(r.message&&Array.isArray(r.message)){rawData=r.message;}
// 					else{frappe.msgprint('Failed to load Budget & Estimate data.');}
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Budget & Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// EXCEL EXPORT — SheetJS with cell styling (xlsx-js-style)
// 	// =============================================================================

// 	// Load xlsx-js-style from the www folder. The global it exposes is XLSX (not XLSXStyle).
// 	// We alias it to XLSXStyle so the rest of the export code works unchanged.
// 	var xlsxReady = (function () {
// 		if (typeof XLSXStyle !== 'undefined') { return Promise.resolve(); }
// 		if (typeof XLSX !== 'undefined' && XLSX.utils && XLSX.utils.aoa_to_sheet) {
// 			window.XLSXStyle = XLSX;
// 			return Promise.resolve();
// 		}
// 		return new Promise(function (resolve, reject) {
// 			var s = document.createElement('script');
// 			s.src    = '/xlsx.bundle.js';
// 			s.onload = function () {
// 				// After load, alias XLSX → XLSXStyle
// 				if (typeof XLSX !== 'undefined') {
// 					window.XLSXStyle = XLSX;
// 					resolve();
// 				} else {
// 					reject(new Error('XLSX global not found after script load'));
// 				}
// 			};
// 			s.onerror = function () { reject(new Error('Script load failed')); };
// 			document.head.appendChild(s);
// 		});
// 	})();

// 	// ── Style presets ────────────────────────────────────────────────────────────
// 	var XL = {
// 		num: function (v) { return { t: 'n', v: parseFloat(v) || 0, z: '#,##0.00' }; },
// 		str: function (v) { return { t: 's', v: String(v || '') }; },

// 		cell: function (val, style) {
// 			var base = typeof val === 'number' ? XL.num(val) : XL.str(val);
// 			base.s = style;
// 			return base;
// 		},

// 		// Blue main header
// 		styleMainHdr: {
// 			fill: { fgColor: { rgb: '0076B6' } },
// 			font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 11 },
// 			alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
// 			border: { top: { style: 'medium', color: { rgb: '005F94' } }, bottom: { style: 'medium', color: { rgb: '005F94' } }, left: { style: 'thin', color: { rgb: '005F94' } }, right: { style: 'thin', color: { rgb: '005F94' } } }
// 		},
// 		// Orange sub-header
// 		styleSubHdr: {
// 			fill: { fgColor: { rgb: 'F26B21' } },
// 			font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 10 },
// 			alignment: { horizontal: 'center', vertical: 'center' },
// 			border: { top: { style: 'thin', color: { rgb: 'C85810' } }, bottom: { style: 'thin', color: { rgb: 'C85810' } }, left: { style: 'thin', color: { rgb: 'C85810' } }, right: { style: 'thin', color: { rgb: 'C85810' } } }
// 		},
// 		// Blue section head row
// 		styleHead: {
// 			fill: { fgColor: { rgb: 'E9F4FB' } },
// 			font: { bold: true, color: { rgb: '003B63' }, sz: 10 },
// 			alignment: { vertical: 'center', wrapText: true },
// 			border: { top: { style: 'thin', color: { rgb: 'BBBBBB' } }, bottom: { style: 'thin', color: { rgb: 'BBBBBB' } }, left: { style: 'thin', color: { rgb: 'BBBBBB' } }, right: { style: 'thin', color: { rgb: 'BBBBBB' } } }
// 		},
// 		styleHeadNum: {
// 			fill: { fgColor: { rgb: 'E9F4FB' } },
// 			font: { bold: true, color: { rgb: '003B63' }, sz: 10 },
// 			alignment: { horizontal: 'right', vertical: 'center' },
// 			border: { top: { style: 'thin', color: { rgb: 'BBBBBB' } }, bottom: { style: 'thin', color: { rgb: 'BBBBBB' } }, left: { style: 'thin', color: { rgb: 'BBBBBB' } }, right: { style: 'thin', color: { rgb: 'BBBBBB' } } },
// 			numFmt: '#,##0.00'
// 		},
// 		// Orange sub-head row
// 		styleSub: {
// 			fill: { fgColor: { rgb: 'FFF3E6' } },
// 			font: { bold: true, color: { rgb: '7A3B00' }, sz: 10 },
// 			alignment: { vertical: 'center', wrapText: true },
// 			border: { top: { style: 'thin', color: { rgb: 'BBBBBB' } }, bottom: { style: 'thin', color: { rgb: 'BBBBBB' } }, left: { style: 'thin', color: { rgb: 'BBBBBB' } }, right: { style: 'thin', color: { rgb: 'BBBBBB' } } }
// 		},
// 		styleSubNum: {
// 			fill: { fgColor: { rgb: 'FFF3E6' } },
// 			font: { bold: true, color: { rgb: '7A3B00' }, sz: 10 },
// 			alignment: { horizontal: 'right', vertical: 'center' },
// 			border: { top: { style: 'thin', color: { rgb: 'BBBBBB' } }, bottom: { style: 'thin', color: { rgb: 'BBBBBB' } }, left: { style: 'thin', color: { rgb: 'BBBBBB' } }, right: { style: 'thin', color: { rgb: 'BBBBBB' } } },
// 			numFmt: '#,##0.00'
// 		},
// 		// Grand total row
// 		styleGrand: {
// 			fill: { fgColor: { rgb: '0076B6' } },
// 			font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 11 },
// 			alignment: { vertical: 'center', wrapText: true },
// 			border: { top: { style: 'medium', color: { rgb: '005F94' } }, bottom: { style: 'medium', color: { rgb: '005F94' } }, left: { style: 'thin', color: { rgb: '005F94' } }, right: { style: 'thin', color: { rgb: '005F94' } } }
// 		},
// 		styleGrandNum: {
// 			fill: { fgColor: { rgb: '0076B6' } },
// 			font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 11 },
// 			alignment: { horizontal: 'right', vertical: 'center' },
// 			border: { top: { style: 'medium', color: { rgb: '005F94' } }, bottom: { style: 'medium', color: { rgb: '005F94' } }, left: { style: 'thin', color: { rgb: '005F94' } }, right: { style: 'thin', color: { rgb: '005F94' } } },
// 			numFmt: '#,##0.00'
// 		},
// 		// Normal data row
// 		styleData: {
// 			fill: { fgColor: { rgb: 'FFFFFF' } },
// 			font: { color: { rgb: '111111' }, sz: 10 },
// 			alignment: { vertical: 'center', wrapText: true },
// 			border: { top: { style: 'thin', color: { rgb: 'BBBBBB' } }, bottom: { style: 'thin', color: { rgb: 'BBBBBB' } }, left: { style: 'thin', color: { rgb: 'BBBBBB' } }, right: { style: 'thin', color: { rgb: 'BBBBBB' } } }
// 		},
// 		styleDataNum: {
// 			fill: { fgColor: { rgb: 'FFFFFF' } },
// 			font: { color: { rgb: '111111' }, sz: 10 },
// 			alignment: { horizontal: 'right', vertical: 'center' },
// 			border: { top: { style: 'thin', color: { rgb: 'BBBBBB' } }, bottom: { style: 'thin', color: { rgb: 'BBBBBB' } }, left: { style: 'thin', color: { rgb: 'BBBBBB' } }, right: { style: 'thin', color: { rgb: 'BBBBBB' } } },
// 			numFmt: '#,##0.00'
// 		},
// 		// PPT total row
// 		stylePPTTotal: {
// 			fill: { fgColor: { rgb: 'E8F0FA' } },
// 			font: { bold: true, color: { rgb: '003B63' }, sz: 10 },
// 			alignment: { horizontal: 'right', vertical: 'center' },
// 			border: { top: { style: 'medium', color: { rgb: '999999' } }, bottom: { style: 'medium', color: { rgb: '999999' } }, left: { style: 'thin', color: { rgb: '999999' } }, right: { style: 'thin', color: { rgb: '999999' } } },
// 			numFmt: '#,##0.00'
// 		},
// 		stylePPTTotalLabel: {
// 			fill: { fgColor: { rgb: 'E8F0FA' } },
// 			font: { bold: true, color: { rgb: '003B63' }, sz: 10 },
// 			alignment: { vertical: 'center', wrapText: true },
// 			border: { top: { style: 'medium', color: { rgb: '999999' } }, bottom: { style: 'medium', color: { rgb: '999999' } }, left: { style: 'thin', color: { rgb: '999999' } }, right: { style: 'thin', color: { rgb: '999999' } } }
// 		},
// 		// Grand-total column accent (B&E)
// 		styleGrandCol: {
// 			fill: { fgColor: { rgb: '003B63' } },
// 			font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 10 },
// 			alignment: { horizontal: 'right', vertical: 'center' },
// 			border: { top: { style: 'thin', color: { rgb: '005F94' } }, bottom: { style: 'thin', color: { rgb: '005F94' } }, left: { style: 'medium', color: { rgb: '0076B6' } }, right: { style: 'thin', color: { rgb: '005F94' } } },
// 			numFmt: '#,##0.00'
// 		}
// 	};

// 	// ── Sheet builder ────────────────────────────────────────────────────────────
// 	function buildAndDownload(aoa, cols, sheetName, fileName) {
// 		var ws = XLSXStyle.utils.aoa_to_sheet(aoa);
// 		ws['!cols'] = cols;
// 		ws['!rows'] = aoa.map(function (_, i) { return { hpt: i < 2 ? 28 : 18 }; });
// 		var wb = XLSXStyle.utils.book_new();
// 		XLSXStyle.utils.book_append_sheet(wb, ws, sheetName.slice(0, 31));
// 		XLSXStyle.writeFile(wb, fileName);
// 	}

// 	function addMerges(ws, merges) {
// 		ws['!merges'] = (ws['!merges'] || []).concat(merges);
// 	}

// 	// ── PPT export ───────────────────────────────────────────────────────────────
// 	function exportPPT(fy) {
// 		var wb = XLSXStyle.utils.book_new();

// 		function buildPPTSheet(tbodyId, budgetHdrId, estHdrId) {
// 			var budgetLabel = $('#' + budgetHdrId).text().trim() || (fy + ' Budget');
// 			var estLabel    = $('#' + estHdrId).text().trim()    || (fy + ' Est');

// 			var h1 = [
// 				XL.cell('Unit',       XL.styleMainHdr),
// 				XL.cell(budgetLabel,  XL.styleMainHdr),
// 				XL.cell('',           XL.styleMainHdr),
// 				XL.cell('',           XL.styleMainHdr),
// 				XL.cell(estLabel,     XL.styleMainHdr),
// 				XL.cell('',           XL.styleMainHdr),
// 				XL.cell('',           XL.styleMainHdr)
// 			];
// 			var h2 = [
// 				XL.cell('',      XL.styleMainHdr),
// 				XL.cell('Opex',  XL.styleSubHdr),
// 				XL.cell('Capex', XL.styleSubHdr),
// 				XL.cell('Total', XL.styleSubHdr),
// 				XL.cell('Opex',  XL.styleSubHdr),
// 				XL.cell('Capex', XL.styleSubHdr),
// 				XL.cell('Total', XL.styleSubHdr)
// 			];

// 			var aoa = [h1, h2];
// 			var $rows = $('#' + tbodyId + ' tr');

// 			if (!$rows.length) { return null; }

// 			$rows.each(function () {
// 				var $tr    = $(this);
// 				var isTotal = $tr.hasClass('ppt-total-row');
// 				var lS     = isTotal ? XL.stylePPTTotalLabel : XL.styleData;
// 				var nS     = isTotal ? XL.stylePPTTotal      : XL.styleDataNum;
// 				var $cells = $tr.find('td');
// 				if (!$cells.length) { return; }
// 				var row = [];
// 				$cells.each(function (i) {
// 					var txt = $(this).text().trim();
// 					var raw = txt.replace(/,/g, '').replace(/-/g, '');
// 					var num = parseFloat(raw);
// 					if (i === 0) {
// 						row.push(XL.cell(txt, lS));
// 					} else {
// 						row.push(XL.cell(!isNaN(num) && raw.length ? num : 0, nS));
// 					}
// 				});
// 				aoa.push(row);
// 			});

// 			var ws = XLSXStyle.utils.aoa_to_sheet(aoa);
// 			ws['!cols'] = [{ wch: 28 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }];
// 			ws['!rows'] = aoa.map(function (_, i) { return { hpt: i < 2 ? 28 : 18 }; });
// 			addMerges(ws, [
// 				{ s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
// 				{ s: { r: 0, c: 1 }, e: { r: 0, c: 3 } },
// 				{ s: { r: 0, c: 4 }, e: { r: 0, c: 6 } }
// 			]);
// 			return ws;
// 		}

// 		var ws1 = buildPPTSheet('ppt-tbody',      'ppt-budget-hdr',      'ppt-est-hdr');
// 		var ws2 = buildPPTSheet('ppt-prev-tbody', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr');

// 		if (ws1) { XLSXStyle.utils.book_append_sheet(wb, ws1, ('Current ' + fy).slice(0, 31)); }
// 		if (ws2) { XLSXStyle.utils.book_append_sheet(wb, ws2, ('Prev '    + getPrevFY(fy)).slice(0, 31)); }

// 		if (!wb.SheetNames.length) {
// 			frappe.msgprint('No PPT data available to export.');
// 			return;
// 		}
// 		XLSXStyle.writeFile(wb, 'CB_PPT_' + fy + '.xlsx');
// 	}

// 	// ── Annual Budget export ─────────────────────────────────────────────────────
// 	function exportAnnual(fy) {
// 		var hdrCols = [], subCols = [];
// 		$('#annual-table thead tr.cb-thead-main th').each(function () {
// 			hdrCols.push({ label: $(this).text().trim().replace(/[▲▼]/g, '').trim(), span: parseInt($(this).attr('colspan') || 1) });
// 		});
// 		$('#annual-table thead tr.cb-thead-sub th').each(function () {
// 			subCols.push($(this).text().trim());
// 		});

// 		var h1 = [], h2 = [];
// 		hdrCols.forEach(function (hc) {
// 			h1.push(XL.cell(hc.label, XL.styleMainHdr));
// 			for (var i = 1; i < hc.span; i++) { h1.push(XL.cell('', XL.styleMainHdr)); }
// 		});
// 		h2.push(XL.cell('', XL.styleMainHdr));
// 		subCols.forEach(function (s) { h2.push(XL.cell(s, XL.styleSubHdr)); });
// 		h2.push(XL.cell('', XL.styleMainHdr));

// 		var aoa = [h1, h2];
// 		$('#annual-table tbody tr').each(function () {
// 			var $tr = $(this);
// 			var isHead  = $tr.hasClass('cb-row-head');
// 			var isSub   = $tr.hasClass('cb-row-sub');
// 			var isGrand = $tr.hasClass('cb-row-grand');
// 			var lS = isGrand ? XL.styleGrand    : isHead ? XL.styleHead    : isSub ? XL.styleSub    : XL.styleData;
// 			var nS = isGrand ? XL.styleGrandNum  : isHead ? XL.styleHeadNum : isSub ? XL.styleSubNum : XL.styleDataNum;
// 			var row = [];
// 			$tr.find('td').each(function (i) {
// 				var raw = $(this).text().replace(/[▼▶]/g, '').trim();
// 				var num = parseFloat(raw.replace(/,/g, ''));
// 				row.push(i === 0 ? XL.cell(raw, lS) : XL.cell(isNaN(num) ? raw : num, nS));
// 			});
// 			aoa.push(row);
// 		});

// 		var colCount = (aoa[2] || []).length;
// 		var wArr = [{ wch: 34 }];
// 		for (var ci = 1; ci < colCount; ci++) { wArr.push({ wch: 14 }); }
// 		buildAndDownload(aoa, wArr, 'Annual Budget', 'CB_Annual_Budget_' + fy + '.xlsx');
// 	}

// 	// ── Estimate export ──────────────────────────────────────────────────────────
// 	function exportEstimate(fy) {
// 		var hdrCols = [], subCols = [];
// 		$('#estimate-table thead tr.cb-thead-main th').each(function () {
// 			hdrCols.push({ label: $(this).text().trim().replace(/[▲▼]/g, '').trim(), span: parseInt($(this).attr('colspan') || 1) });
// 		});
// 		$('#estimate-table thead tr.cb-thead-sub th').each(function () {
// 			subCols.push($(this).text().trim());
// 		});

// 		var h1 = [], h2 = [];
// 		hdrCols.forEach(function (hc) {
// 			h1.push(XL.cell(hc.label, XL.styleMainHdr));
// 			for (var i = 1; i < hc.span; i++) { h1.push(XL.cell('', XL.styleMainHdr)); }
// 		});
// 		h2.push(XL.cell('', XL.styleMainHdr));
// 		subCols.forEach(function (s) { h2.push(XL.cell(s, XL.styleSubHdr)); });
// 		h2.push(XL.cell('', XL.styleMainHdr));

// 		var aoa = [h1, h2];
// 		$('#estimate-table tbody tr').each(function () {
// 			var $tr = $(this);
// 			if ($tr.css('display') === 'none') { return; }
// 			var isHead  = $tr.hasClass('cb-row-head');
// 			var isSub   = $tr.hasClass('cb-row-sub');
// 			var isGrand = $tr.hasClass('cb-row-grand');
// 			var lS = isGrand ? XL.styleGrand    : isHead ? XL.styleHead    : isSub ? XL.styleSub    : XL.styleData;
// 			var nS = isGrand ? XL.styleGrandNum  : isHead ? XL.styleHeadNum : isSub ? XL.styleSubNum : XL.styleDataNum;
// 			var row = [];
// 			$tr.find('td').each(function (i) {
// 				var raw = $(this).text().replace(/[▼▶]/g, '').trim();
// 				var num = parseFloat(raw.replace(/,/g, ''));
// 				row.push(i === 0 ? XL.cell(raw, lS) : XL.cell(isNaN(num) ? raw : num, nS));
// 			});
// 			aoa.push(row);
// 		});

// 		var colCount = (aoa[2] || []).length;
// 		var wArr = [{ wch: 34 }];
// 		for (var ci = 1; ci < colCount; ci++) { wArr.push({ wch: 14 }); }
// 		buildAndDownload(aoa, wArr, 'Estimate', 'CB_Estimate_' + fy + '.xlsx');
// 	}

// 	// ── Budget & Estimate export ─────────────────────────────────────────────────
// 	function exportBudgetEstimate(fy) {
// 		var h1 = [], h2 = [];
// 		h1.push(XL.cell('Expense Head / Line Item', XL.styleMainHdr));
// 		h2.push(XL.cell('', XL.styleMainHdr));

// 		$('#be-table thead tr.cb-thead-main th:not(:first-child)').each(function () {
// 			var label = $(this).text().trim();
// 			var isDark = label === 'Grand Total';
// 			var s = isDark
// 				? Object.assign({}, XL.styleMainHdr, { fill: { fgColor: { rgb: '003B63' } } })
// 				: XL.styleMainHdr;
// 			h1.push(XL.cell(label, s));
// 			h1.push(XL.cell('', s));
// 		});
// 		$('#be-table thead tr.cb-thead-sub th').each(function () {
// 			h2.push(XL.cell($(this).text().trim(), XL.styleSubHdr));
// 		});

// 		var aoa = [h1, h2];
// 		$('#be-table tbody tr').each(function () {
// 			var $tr = $(this);
// 			if ($tr.css('display') === 'none') { return; }
// 			var isHead  = $tr.hasClass('cb-row-head');
// 			var isSub   = $tr.hasClass('cb-row-sub');
// 			var isGrand = $tr.hasClass('cb-row-grand');
// 			var lS = isGrand ? XL.styleGrand    : isHead ? XL.styleHead    : isSub ? XL.styleSub    : XL.styleData;
// 			var nS = isGrand ? XL.styleGrandNum  : isHead ? XL.styleHeadNum : isSub ? XL.styleSubNum : XL.styleDataNum;
// 			var row = [];
// 			$tr.find('td').each(function (i) {
// 				var $td = $(this);
// 				var raw = $td.text().replace(/[▼▶]/g, '').trim();
// 				var num = parseFloat(raw.replace(/,/g, ''));
// 				var isGC = $td.hasClass('be-grand-col') || $td.hasClass('be-total-plan') || $td.hasClass('be-total-est');
// 				if (i === 0) {
// 					row.push(XL.cell(raw, lS));
// 				} else {
// 					row.push(XL.cell(isNaN(num) ? raw : num, isGC ? XL.styleGrandCol : nS));
// 				}
// 			});
// 			aoa.push(row);
// 		});

// 		var colCount = (aoa[2] || []).length;
// 		var wArr = [{ wch: 36 }];
// 		for (var ci = 1; ci < colCount; ci++) { wArr.push({ wch: 15 }); }
// 		buildAndDownload(aoa, wArr, 'Budget & Estimate', 'CB_BudgetEstimate_' + fy + '.xlsx');
// 	}

// 	// ── Wire up export button click handlers ─────────────────────────────────────
// 	function runExport(fn) {
// 		xlsxReady.then(function () {
// 			fn();
// 		}).catch(function () {
// 			frappe.msgprint('Failed to load the Excel library. Please check your internet connection and try again.');
// 		});
// 	}

// 	$(document).on('click', '#xl-ppt', function () {
// 		runExport(function () { exportPPT(fyControl.get_value() || '2025-26'); });
// 	});
// 	$(document).on('click', '#xl-annual', function () {
// 		runExport(function () { exportAnnual(fyControl.get_value() || '2025-26'); });
// 	});
// 	$(document).on('click', '#xl-estimate', function () {
// 		runExport(function () { exportEstimate(fyControl.get_value() || '2025-26'); });
// 	});
// 	$(document).on('click', '#xl-be', function () {
// 		runExport(function () { exportBudgetEstimate(fyControl.get_value() || '2025-26'); });
// 	});

// 	// =============================================================================
// 	// AUTO-LOAD ACTIVE TAB ON PAGE OPEN
// 	// =============================================================================

// 	var initialFY = fyControl.get_value();
// 	if (initialFY) { TabLoader.trigger('ppt'); }

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

// 	// ── "Export All" — single button injected once into .page-actions ──
// 	setTimeout(function () {
// 		// Remove any previously injected button to avoid duplicates on re-load
// 		$(wrapper).find('#xl-export-all').remove();

// 		var $exportAllBtn = $(
// 			'<button class="btn btn-default btn-sm" id="xl-export-all" style="display:inline-flex;align-items:center;gap:5px;margin-left:8px;background:#1a1a1a;color:#fff;border-color:#1a1a1a;">' +
// 				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 					'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 					'<polyline points="14 2 14 8 20 8"/>' +
// 					'<line x1="8" y1="13" x2="16" y2="13"/>' +
// 					'<line x1="8" y1="17" x2="16" y2="17"/>' +
// 					'<line x1="10" y1="9" x2="8" y2="9"/>' +
// 				'</svg>' +
// 				'Export All' +
// 			'</button>'
// 		);

// 		var $pa = $(wrapper).find('.page-actions');
// 		if ($pa.length) {
// 			$pa.prepend($exportAllBtn);
// 		}
// 	}, 300);

// 	function updatePageTitle(financialYear) {
// 		page.set_title('Foundation - Consolidated Budget - ' + financialYear);
// 		setTimeout(function () {
// 			$(wrapper).find('.page-head h3').hide();
// 			$(wrapper).find('.page-head .title-text')
// 				.css({ 'font-size': '20px', 'font-weight': '700', 'color': '#1a1a1a' });
// 		}, 100);
// 	}

// 	// =============================================================================
// 	// FY LABEL HELPERS
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var parts     = (fy || '2025-26').split('-');
// 		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
// 		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
// 		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
// 		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
// 		return {
// 			plan : 'FY' + startYY + '-' + endYY    + ' Plan',
// 			est  : 'FY' + prevStart + '-' + prevEnd + ' Estimate'
// 		};
// 	}

// 	function getPrevFY(fy) {
// 		var parts = (fy || '2025-26').split('-');
// 		var s = parseInt(parts[0] || '2025', 10) - 1;
// 		var e = parseInt(parts[1] || '26',   10) - 1;
// 		return s + '-' + String(e).padStart(2, '0');
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
// 			var m = (typeof msg === 'string' && msg.length) ? msg : 'Loading, please wait';
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
// 	// SHARED DATA STORE
// 	// =============================================================================

// 	var Store = {
// 		ppt           : { rows: [], prevRows: [], budgetLabel: '', estLabel: '', prevBudgetLabel: '', prevEstLabel: '' },
// 		annual        : [],
// 		estimate      : [],
// 		budgetEstimate: []
// 	};

// 	// =============================================================================
// 	// GLOBAL STYLES
// 	// =============================================================================

// 	$(page.body).append(
// 		'<style>' +
// 		':root{' +
// 			'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 			'--orange:#F26B21;--orange-light:#FFF3E6;' +
// 			'--border:#bbb;--border-light:#ddd;--border-header:#005f94;--border-orange:#d45a10;' +
// 		'}' +
// 		'.cb-wrapper{padding:15px;background:#fff;}' +

// 		/* Tab nav */
// 		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:9px 20px;color:#555;font-size:15px;font-weight:400;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:#003B63;font-weight:700;border-bottom:3px solid #003B63;}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +

// 		/* Filter row */
// 		'.cb-filter-row{padding:8px 0;background:#fff;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row{padding:8px;}.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +

// 		/* Controls bar — Frappe-style toolbar */
// 		'.cb-controls{' +
// 			'display:flex;align-items:center;' +
// 			'padding:6px 10px;margin-bottom:10px;' +
// 			'background:#f7f9fb;border:1px solid #e2e6ea;border-radius:6px;' +
// 			'flex-wrap:wrap;gap:8px;' +
// 		'}' +
// 		'.cb-controls-left{display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap;}' +
// 		'.cb-controls-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}' +

// 		/* Search — Frappe style */
// 		'.cb-search-wrap{position:relative;display:flex;align-items:center;}' +
// 		'.cb-search-wrap .search-icon{position:absolute;left:8px;color:#8d99a6;pointer-events:none;}' +
// 		'.cb-search-input{' +
// 			'padding:5px 8px 5px 28px;' +
// 			'border:1px solid #d1d8dd;border-radius:4px;' +
// 			'font-size:13px;color:#36414c;background:#fff;' +
// 			'width:220px;height:30px;' +
// 			'transition:border-color .15s,box-shadow .15s;' +
// 		'}' +
// 		'.cb-search-input:focus{outline:none;border-color:#5e64ff;box-shadow:0 0 0 2px rgba(94,100,255,.15);}' +

// 		/* Checkboxes — Frappe style */
// 		'.cb-checkbox-area{display:flex;gap:12px;align-items:center;}' +
// 		'.cb-check-label{' +
// 			'display:flex;align-items:center;gap:5px;' +
// 			'font-size:13px;font-weight:500;color:#36414c;' +
// 			'cursor:pointer;user-select:none;white-space:nowrap;' +
// 		'}' +
// 		'.cb-check-label input[type=checkbox]{' +
// 			'width:14px;height:14px;cursor:pointer;' +
// 			'accent-color:#5e64ff;' +
// 		'}' +

// 		/* Export button — black Frappe button style */
// 		'.cb-xl-btn{' +
// 			'display:inline-flex;align-items:center;gap:5px;' +
// 			'padding:4px 12px;height:30px;' +
// 			'font-size:13px;font-weight:500;' +
// 			'cursor:pointer;white-space:nowrap;' +
// 			'border:1px solid #1a1a1a;border-radius:4px;' +
// 			'background:#1a1a1a;color:#fff;' +
// 			'box-shadow:0 1px 2px rgba(0,0,0,.15);' +
// 			'transition:background .15s,border-color .15s;' +
// 		'}' +
// 		'.cb-xl-btn:hover{background:#333;border-color:#333;}' +
// 		'.cb-xl-btn svg{flex-shrink:0;color:#fff;}' +

// 		/* Export All in page-actions */
// 		'#xl-export-all svg{vertical-align:middle;margin-right:3px;}' +

// 		/* Scroll wrapper */
// 		'.cb-scroll-wrapper{border:1px solid #d1d8dd;border-radius:6px;overflow:auto;max-height:72vh;background:#fff;}' +

// 		/* TABLE BASE — all tabs */
// 		'.cb-table,.ppt-table-wrap{width:100%;border-collapse:collapse;font-size:15px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;table-layout:auto;}' +
// 		'.cb-table th,.cb-table td,.ppt-table-wrap th,.ppt-table-wrap td{border:1px solid #d1d8dd;padding:8px 12px;white-space:nowrap;text-align:right;}' +
// 		'.cb-table th:first-child,.cb-table td:first-child,.ppt-table-wrap th:first-child,.ppt-table-wrap td:first-child{text-align:left;}' +

// 		/* STICKY HEADERS — all tabs */
// 		'.cb-thead-main th{background:#0076B6;color:#fff;font-weight:700;font-size:16px;text-align:center !important;position:sticky;top:0;z-index:25;border-color:#005f94;padding:10px 12px;}' +
// 		'.cb-thead-sub th{background:#F26B21;color:#fff;font-weight:600;font-size:15px;text-align:center !important;position:sticky;top:0;z-index:24;border-color:#c85810;min-width:110px;padding:8px 12px;}' +

// 		/* Row types — all tabs (base sizes) */
// 		'.cb-row-head{font-weight:700;font-size:15px;cursor:pointer;background:#E9F4FB;color:#003B63;}' +
// 		'.cb-row-head:hover td{background:#d0e8f5;}' +
// 		'.cb-row-sub{background:#FFF3E6;font-weight:600;font-size:15px;cursor:pointer;}' +
// 		'.cb-row-sub:hover td{background:#ffe0c2;}' +
// 		'.cb-row-grand td{background:#0076B6 !important;color:#fff !important;font-weight:700;font-size:15px;border-color:#005f94 !important;}' +
// 		'.cb-text-accent{color:#0076B6;font-weight:600;}' +

// 		/* PPT tab — 16px / weight 400 on data cells, 700 on totals */
// 		'#tab-ppt .ppt-table-wrap tbody tr td{font-size:16px;font-weight:400;}' +
// 		'#tab-ppt .ppt-table-wrap tbody tr.ppt-total-row td{font-size:16px;font-weight:700;background:#e8f0fa !important;color:#003B63 !important;border-color:#aaa !important;}' +

// 		/* PPT title */
// 		'.ppt-title-bar{margin:12px 0 4px;}' +
// 		'.ppt-main-title{font-size:15px;font-weight:700;text-transform:uppercase;text-decoration:underline;letter-spacing:.3px;color:#111;}' +
// 		'.ppt-currency-label{font-size:16px;font-style:italic;color:#555;text-align:right;margin-bottom:6px;}' +
// 		'.ppt-currency-label strong{font-weight:800;font-size:16px;font-style:normal;}' +

// 		/* PPT table */
// 		'.ppt-table-wrap thead tr.cb-thead-main th{border-color:#005f94;}' +
// 		'.ppt-table-wrap thead tr.cb-thead-sub th{border-color:#c85810;}' +
// 		'.ppt-table-wrap tbody tr td{background:#fff;color:#111;font-size:15px;}' +
// 		'.ppt-table-wrap tbody tr.ppt-total-row td{font-weight:700;font-size:15px;background:#e8f0fa !important;color:#003B63 !important;border-color:#aaa !important;}' +
// 		'.ppt-dash{color:#bbb;text-align:center;display:block;}' +

// 		/* BUDGET & ESTIMATE — sticky first column */
// 		'#be-table{border-collapse:collapse;}' +
// 		'#be-table tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:280px;max-width:280px;white-space:normal;word-break:break-word;}' +
// 		'#be-table tbody tr td:first-child{background:#fff;}' +
// 		'#be-table .cb-row-head td:first-child{background:#E9F4FB !important;}' +
// 		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6 !important;}' +
// 		'#be-table .cb-row-grand td:first-child{background:#0076B6 !important;}' +
// 		'#be-table thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:#0076B6;text-align:left !important;min-width:280px;}' +
// 		'#be-table .be-grand-col{background:#ddeaf7 !important;color:#003B63;border-left:2px solid #0076B6 !important;}' +
// 		'#be-table .cb-row-grand .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-head .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-sub  .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +
// 		'#be-table .cb-thead-main th:not(:first-child){min-width:260px;text-align:center !important;}' +
// 		'#be-table .cb-thead-sub th{min-width:130px;text-align:center !important;}' +
// 		'#be-table tbody td:first-child,#be-table thead th:first-child{box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +

// 		/* Loader */
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
// 	// HELPERS
// 	// =============================================================================

// 	// Indian grouping, whole numbers, no decimals — used by all tabs
// 	function formatINR(v) {
// 		var n = Math.round(parseFloat(v) || 0);
// 		var neg = n < 0;
// 		var s   = String(Math.abs(n));
// 		if (s.length > 3) {
// 			var last3 = s.slice(-3);
// 			var rest  = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
// 			s = rest + ',' + last3;
// 		}
// 		return (neg ? '-' : '') + s;
// 	}

// 	function fixStickySubHeader(tableSelector) {
// 		setTimeout(function () {
// 			var $table = $(tableSelector);
// 			if (!$table.length) { return; }
// 			var $mainRow = $table.find('thead tr.cb-thead-main');
// 			var $subRow  = $table.find('thead tr.cb-thead-sub');
// 			if (!$mainRow.length || !$subRow.length) { return; }
// 			var h = $mainRow[0].getBoundingClientRect().height || $mainRow.outerHeight(true) || 0;
// 			if (h > 0) { $subRow.find('th').css('top', h + 'px'); }
// 		}, 50);
// 	}

// 	// Reusable Frappe-style export button HTML
// 	function xlBtn(id, label) {
// 		return (
// 			'<button class="cb-xl-btn" id="' + id + '">' +
// 				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 					'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 					'<polyline points="14 2 14 8 20 8"/>' +
// 					'<line x1="8" y1="13" x2="16" y2="13"/>' +
// 					'<line x1="8" y1="17" x2="16" y2="17"/>' +
// 					'<line x1="10" y1="9" x2="8" y2="9"/>' +
// 				'</svg>' +
// 				label +
// 			'</button>'
// 		);
// 	}

// 	// Reusable controls bar:  search | checkboxes … | export btn
// 	function controlsBar(searchId, searchPlaceholder, checks, exportId) {
// 		var checkHtml = checks.map(function (c) {
// 			return (
// 				'<label class="cb-check-label">' +
// 					'<input type="checkbox" id="' + c.id + '"> ' + c.label +
// 				'</label>'
// 			);
// 		}).join('');
// 		return (
// 			'<div class="cb-controls">' +
// 				'<div class="cb-controls-left">' +
// 					'<div class="cb-search-wrap">' +
// 						'<svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
// 						'<input type="text" id="' + searchId + '" class="cb-search-input" placeholder="' + searchPlaceholder + '">' +
// 					'</div>' +
// 					'<div class="cb-checkbox-area">' + checkHtml + '</div>' +
// 				'</div>' +
// 				'<div class="cb-controls-right">' + xlBtn(exportId, 'Export to Excel') + '</div>' +
// 			'</div>'
// 		);
// 	}

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================

// 	$(page.body).append(
// 		'<div class="cb-wrapper">' +

// 			/* FY filter only — Export All is now in page-actions (top right) */
// 			'<div class="frappe-control-group row cb-filter-row" id="cb-filter-row"></div>' +

// 			'<ul id="cb-tab-nav">' +
// 				'<li><a class="cb-tab-link active" data-tab="ppt">Foundation level/Overall metrics</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="summary_inr">Summary in INR</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="headcount">Headcount</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="estimate">Estimate Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="budget_estimate">Budget &amp; Estimate</a></li>' +
// 			'</ul>' +

// 			'<div id="cb-tab-content">' +

// 				/* ── PPT TAB ── */
// 				'<div class="cb-tab-pane active" id="tab-ppt">' +
// 					'<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">' +
// 						xlBtn('xl-ppt', 'Export to Excel') +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-main-title">Overall Foundation - Budget vs. Estimate</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 						'<table id="ppt-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-prev-title">Overall Foundation - Previous Year Budget vs. Estimate</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table id="ppt-prev-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-prev-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-prev-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-prev-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 				'</div>' +

// 				'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
// 				'<div class="cb-tab-pane" id="tab-headcount"></div>' +

// 				/* ── ANNUAL BUDGET TAB ── */
// 				'<div class="cb-tab-pane" id="tab-annual_budget">' +
// 					controlsBar(
// 						'annual-search', 'Search expense / item…',
// 						[
// 							{ id: 'annual-expand-quarters', label: 'Expand Quarters' },
// 							{ id: 'annual-expand-items',   label: 'Expand Line Items' }
// 						],
// 						'xl-annual'
// 					) +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* ── ESTIMATE TAB ── */
// 				'<div class="cb-tab-pane" id="tab-estimate">' +
// 					controlsBar(
// 						'estimate-search', 'Search expense / item…',
// 						[
// 							{ id: 'estimate-expand-quarters', label: 'Expand Quarters' },
// 							{ id: 'estimate-expand-items',    label: 'Expand Line Items' }
// 						],
// 						'xl-estimate'
// 					) +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* ── BUDGET & ESTIMATE TAB ── */
// 				'<div class="cb-tab-pane" id="tab-budget_estimate">' +
// 					controlsBar(
// 						'be-search', 'Search expense / item…',
// 						[
// 							{ id: 'be-expand-items', label: 'Expand Line Items' }
// 						],
// 						'xl-be'
// 					) +
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
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (r.message && r.message.length) {
// 				var years = r.message.map(function (d) { return d.financial_year; });
// 				fyControl.df.options = years.join('\n');
// 				fyControl.refresh();
// 				var today     = new Date();
// 				var year      = today.getFullYear();
// 				var month     = today.getMonth() + 1;
// 				var currentFY = (month >= 4)
// 					? year + '-' + String(year + 1).slice(-2)
// 					: (year - 1) + '-' + String(year).slice(-2);
// 				var target = years.indexOf(currentFY) !== -1 ? currentFY : years[0];
// 				fyControl.set_value(target);
// 				updatePageTitle(target);
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
// 			ppt            : function (fy) { PPT.load(fy);            },
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
// 	// SERVER-SIDE EXCEL DOWNLOAD HELPER
// 	// =============================================================================

// 	function downloadFromB64(b64, filename) {
// 		var binary = atob(b64);
// 		var bytes  = new Uint8Array(binary.length);
// 		for (var i = 0; i < binary.length; i++) { bytes[i] = binary.charCodeAt(i); }
// 		var blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
// 		var url  = URL.createObjectURL(blob);
// 		var a    = document.createElement('a');
// 		a.href = url; a.download = filename;
// 		document.body.appendChild(a);
// 		a.click();
// 		setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
// 	}

// 	function serverExport(method, args, loadingMsg) {
// 		Loader.show(loadingMsg || 'Preparing your Excel file');
// 		frappe.call({
// 			method  : method,
// 			args    : args,
// 			callback: function (r) {
// 				Loader.hide();
// 				if (r.message && r.message.data) {
// 					downloadFromB64(r.message.data, r.message.filename);
// 				} else {
// 					frappe.msgprint('Export failed — no data returned from server.');
// 				}
// 			},
// 			error: function () {
// 				Loader.hide();
// 				frappe.msgprint('Server error during export. Please try again.');
// 			}
// 		});
// 	}

// 	// =============================================================================
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {

// 		var currentFY = '';

// 		function toCr(v) { return (parseFloat(v) || 0) / 10000000; }

// 		// PPT values are in Cr — 2 decimal places, Indian grouping, weight 400
// 		function fmt(v) {
// 			var n = parseFloat(v) || 0;
// 			if (n === 0) { return '<span class="ppt-dash">-</span>'; }
// 			var neg = n < 0;
// 			var abs = Math.abs(n).toFixed(2);
// 			var pts = abs.split('.');
// 			var ip  = pts[0], dp = pts[1];
// 			if (ip.length > 3) {
// 				var l3 = ip.slice(-3);
// 				var rs = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
// 				ip = rs + ',' + l3;
// 			}
// 			return (neg ? '-' : '') + ip + '.' + dp;
// 		}

// 		function transformResponse(message, idx) {
// 			var rows = [], covidRows = [];
// 			(message || []).forEach(function (entity) {
// 				var isCovid = (entity.label || '').toLowerCase().indexOf('covid') !== -1;
// 				var ofn   = (entity.overall_foundation_numbers || [])[idx] || {};
// 				var capEx = ofn.capital_expenses   || {};
// 				var opEx  = ofn.operating_expenses || {};
// 				var row = {
// 					name  : entity.label || '',
// 					bOpex : toCr(opEx.budget),
// 					bCapex: toCr(capEx.budget),
// 					eOpex : toCr(opEx.actual),
// 					eCapex: toCr(capEx.actual)
// 				};
// 				if (isCovid) { row.isCovid = true; row.label = entity.label; covidRows.push(row); }
// 				else         { rows.push(row); }
// 			});
// 			rows.push({ isSubTotal: true, label: 'Sub Total' });
// 			covidRows.forEach(function (r) { rows.push(r); });
// 			rows.push({ isGrand: true, label: 'Grand Total' });
// 			return rows;
// 		}

// 		function calcTotals(rows) {
// 			var sub = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };
// 			var cov = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };
// 			rows.forEach(function (r) {
// 				if (r.isSubTotal || r.isGrand) { return; }
// 				var t = r.isCovid ? cov : sub;
// 				t.bOpex += r.bOpex||0; t.bCapex += r.bCapex||0;
// 				t.eOpex += r.eOpex||0; t.eCapex += r.eCapex||0;
// 			});
// 			return {
// 				sub  : sub,
// 				grand: { bOpex:sub.bOpex+cov.bOpex, bCapex:sub.bCapex+cov.bCapex,
// 				         eOpex:sub.eOpex+cov.eOpex, eCapex:sub.eCapex+cov.eCapex }
// 			};
// 		}

// 		function renderTable(rows, title, tbodyId, titleId, budgetHdrId, estHdrId, tableId) {
// 			$('#' + titleId).text(title);
// 			var bm = title.match(/([\d]{4}-[\d]{2})\s+BUDGET/i);
// 			var em = title.match(/([\d]{4}-[\d]{2})\s+EST/i);
// 			$('#' + budgetHdrId).text(bm ? bm[1] + ' Budget' : 'Budget');
// 			$('#' + estHdrId).text(em ? em[1] + ' Estimate' : 'Estimate');
// 			var totals = calcTotals(rows);
// 			var $tb    = $('#' + tbodyId).empty();
// 			rows.forEach(function (row) {
// 				var bO, bC, eO, eC, label, cls = '';
// 				if (row.isSubTotal) {
// 					var s = totals.sub;
// 					bO=s.bOpex; bC=s.bCapex; eO=s.eOpex; eC=s.eCapex;
// 					label = row.label || 'Sub Total'; cls = 'ppt-total-row';
// 				} else if (row.isGrand) {
// 					var g = totals.grand;
// 					bO=g.bOpex; bC=g.bCapex; eO=g.eOpex; eC=g.eCapex;
// 					label = row.label || 'Grand Total'; cls = 'ppt-total-row';
// 				} else {
// 					bO=row.bOpex||0; bC=row.bCapex||0; eO=row.eOpex||0; eC=row.eCapex||0;
// 					label = row.isCovid ? (row.label||'COVID SUPPORT') : row.name;
// 				}
// 				$tb.append(
// 					'<tr class="' + cls + '">' +
// 						'<td>' + label + '</td>' +
// 						'<td>' + fmt(bO) + '</td><td>' + fmt(bC) + '</td><td>' + fmt(bO+bC) + '</td>' +
// 						'<td>' + fmt(eO) + '</td><td>' + fmt(eC) + '</td><td>' + fmt(eO+eC) + '</td>' +
// 					'</tr>'
// 				);
// 			});
// 			fixStickySubHeader('#' + tableId);
// 		}

// 		function fetchAndRender(fy) {
// 			$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading…</td></tr>');
// 			Loader.show("Building your foundation metrics to present insights clearly");
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.add_expense_totals',
// 				args    : { financial_year: fy, month: 'March', set_group_id: "4,5", previous_financial_year: getPrevFY(fy) },
// 				callback: function (r) {
// 					Loader.hide();
// 					if (!r.message || !Array.isArray(r.message)) {
// 						$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>');
// 						return;
// 					}
// 					var msg  = r.message;
// 					var ofn0 = ((msg[0]||{}).overall_foundation_numbers||[])[0]||{};
// 					var ofn1 = ((msg[0]||{}).overall_foundation_numbers||[])[1]||{};
// 					var t0   = ofn0.title || ('Overall Foundation - ' + fy + ' Budget vs. ' + fy + ' Estimate');
// 					var t1   = ofn1.title || ('Overall Foundation - ' + getPrevFY(fy) + ' Budget vs. ' + getPrevFY(fy) + ' Estimate');
// 					var rows0 = transformResponse(msg, 0);
// 					var rows1 = transformResponse(msg, 1);
// 					renderTable(rows0, t0, 'ppt-tbody',      'ppt-main-title', 'ppt-budget-hdr',      'ppt-est-hdr',      'ppt-table');
// 					renderTable(rows1, t1, 'ppt-prev-tbody', 'ppt-prev-title', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr', 'ppt-prev-table');
// 					function toExportRows(rows) {
// 						var tot = calcTotals(rows), out = [];
// 						rows.forEach(function (row) {
// 							var bO, bC, eO, eC, label, isTotal = false;
// 							if (row.isSubTotal) {
// 								bO=tot.sub.bOpex; bC=tot.sub.bCapex; eO=tot.sub.eOpex; eC=tot.sub.eCapex;
// 								label='Sub Total'; isTotal=true;
// 							} else if (row.isGrand) {
// 								bO=tot.grand.bOpex; bC=tot.grand.bCapex; eO=tot.grand.eOpex; eC=tot.grand.eCapex;
// 								label='Grand Total'; isTotal=true;
// 							} else {
// 								bO=row.bOpex||0; bC=row.bCapex||0; eO=row.eOpex||0; eC=row.eCapex||0;
// 								label=row.isCovid?(row.label||'COVID SUPPORT'):row.name;
// 							}
// 							out.push({ label:label, bOpex:bO, bCapex:bC, eOpex:eO, eCapex:eC, is_total:isTotal });
// 						});
// 						return out;
// 					}
// 					Store.ppt.rows            = toExportRows(rows0);
// 					Store.ppt.prevRows        = toExportRows(rows1);
// 					Store.ppt.budgetLabel     = $('#ppt-budget-hdr').text();
// 					Store.ppt.estLabel        = $('#ppt-est-hdr').text();
// 					Store.ppt.prevBudgetLabel = $('#ppt-prev-budget-hdr').text();
// 					Store.ppt.prevEstLabel    = $('#ppt-prev-est-hdr').text();
// 				},
// 				error: function () {
// 					Loader.hide();
// 					$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>');
// 				}
// 			});
// 		}

// 		function load(fy) { currentFY = fy || '2025-26'; fetchAndRender(currentFY); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ANNUAL BUDGET MODULE
// 	// =============================================================================

// 	var Annual = (function () {

// 		var Q_DEFS = {
// 			q1: { label: 'Quarter 1', months: ['April','May','June'] },
// 			q2: { label: 'Quarter 2', months: ['July','August','September'] },
// 			q3: { label: 'Quarter 3', months: ['October','November','December'] },
// 			q4: { label: 'Quarter 4', months: ['January','February','March'] }
// 		};
// 		var Q_KEYS = ['q1','q2','q3','q4'];
// 		var data=[], expandedQ=[], openH={}, openS={}, bound=false;

// 		function sumArr(a) { var t=0; (a||[]).forEach(function(v){t+=(v||0);}); return t; }
// 		function objTotal(o) { var t=0; Q_KEYS.forEach(function(k){t+=sumArr(o[k]);}); return t; }

// 		function qCells(obj) {
// 			var html = '';
// 			Q_KEYS.forEach(function (k) {
// 				var vals = obj[k]||[0,0,0];
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
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense Head / Line Item</th>');
// 			Q_KEYS.forEach(function (k) {
// 				var o = expandedQ.indexOf(k) !== -1;
// 				$m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o?1:2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o?'▲':'▼') + '</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s = $('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function (k) {
// 					if (expandedQ.indexOf(k) !== -1) {
// 						Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); });
// 					}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#annual-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb  = $('#annual-table tbody').empty();
// 			var term = $('#annual-search').val().trim().toLowerCase();
// 			var grand = { q1:[0,0,0], q2:[0,0,0], q3:[0,0,0], q4:[0,0,0] };
// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				var hs = String(hi), ho = openH[hs] === true;
// 				Q_KEYS.forEach(function (k) { (head[k]||[0,0,0]).forEach(function(v,mi){grand[k][mi]+=(v||0);}); });
// 				$tb.append(
// 					'<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '">' +
// 						'<td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name.trim() + '</td>' +
// 						qCells(head) + '<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td>' +
// 					'</tr>'
// 				);
// 				(head.sub_heads||[]).forEach(function (sub, si) {
// 					var sk = hs+'-'+si, so = openS[sk]===true;
// 					$tb.append(
// 						'<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:22px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td>' +
// 							qCells(sub) + '<td>' + formatINR(objTotal(sub)) + '</td>' +
// 						'</tr>'
// 					);
// 					(sub.items||[]).forEach(function (item) {
// 						$tb.append(
// 							'<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho&&so)?'':'display:none;') + '">' +
// 								'<td style="padding-left:42px;">' + item.name + '</td>' +
// 								qCells(item) + '<td>' + formatINR(objTotal(item)) + '</td>' +
// 							'</tr>'
// 						);
// 					});
// 				});
// 				(head.items||[]).forEach(function (d) {
// 					$tb.append(
// 						'<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:35px;">' + d.name + '</td>' +
// 							qCells(d) + '<td>' + formatINR(objTotal(d)) + '</td>' +
// 						'</tr>'
// 					);
// 				});
// 			});
// 			var gt=0; Q_KEYS.forEach(function(k){gt+=sumArr(grand[k]);});
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			openH[hs] = !(openH[hs]===true);
// 			if (!openH[hs]) {
// 				data.forEach(function(h,hi){ if(String(hi)!==hs){return;} (h.sub_heads||[]).forEach(function(_,si){openS[hs+'-'+si]=false;}); });
// 			}
// 			renderTable();
// 		}
// 		function toggleSub(hs,ss) { openS[hs+'-'+ss]=!(openS[hs+'-'+ss]===true); renderTable(); }

// 		function matchSearch(head, term) {
// 			if (!term) { return true; }
// 			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
// 			for (var s=0; s<(head.sub_heads||[]).length; s++) {
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; }
// 				for (var i=0; i<(head.sub_heads[s].items||[]).length; i++) {
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 				}
// 			}
// 			for (var d=0; d<(head.items||[]).length; d++) {
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 			}
// 			return false;
// 		}

// 		function bindEvents() {
// 			$(document).on('input.annual', '#annual-search', function () { renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-quarters', function () {
// 				expandedQ = this.checked ? Q_KEYS.slice() : [];
// 				renderTable();
// 			});
// 			$(document).on('change.annual', '#annual-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function(h,hi){ openH[String(hi)]=true; (h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;}); });
// 				} else { openH={}; openS={}; }
// 				renderTable();
// 			});
// 			$(document).on('click.annual', '#annual-table .cb-q-header', function () {
// 				var k=String($(this).attr('data-quarter')), idx=expandedQ.indexOf(k);
// 				if (idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#annual-expand-quarters').prop('checked', expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 		}

// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			$('#annual-search').val('');
// 			Loader.show('We\u2019re stitching together your annual budget story');
// 			frappe.call({
// 				method  : 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args    : { financial_year: fy },
// 				callback: function (r) {
// 					data = r.message || [];
// 					Store.annual = data;
// 					renderTable();
// 					Loader.hide();
// 				},
// 				error: function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}

// 		function load(fy) { if (!bound) { bindEvents(); bound=true; } fetchAndRender(fy); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE
// 	// =============================================================================

// 	var Estimate = (function () {

// 		var Q_DEFS = {
// 			q1: { label:'Quarter 1', months:['April','May','June'] },
// 			q2: { label:'Quarter 2', months:['July','August','September'] },
// 			q3: { label:'Quarter 3', months:['October','November','December'] },
// 			q4: { label:'Quarter 4', months:['January','February','March'] }
// 		};
// 		var Q_KEYS=['q1','q2','q3','q4'];
// 		var Q_IDX={q1:[0,1,2],q2:[3,4,5],q3:[6,7,8],q4:[9,10,11]};
// 		var data=[],expandedQ=[],openH={},openS={},bound=false;

// 		function getMth(obj) {
// 			var m=obj.months||{};
// 			return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),
// 			        parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),
// 			        parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),
// 			        parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)];
// 		}
// 		function qTot(obj){return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)];}
// 		function yTot(obj){var q=qTot(obj);return q[0]+q[1]+q[2]+q[3];}

// 		function qCells(obj) {
// 			var mths=getMth(obj),qtots=qTot(obj),html='';
// 			Q_KEYS.forEach(function(q,qi){
// 				if (expandedQ.indexOf(q)!==-1) {
// 					Q_IDX[q].forEach(function(mi){html+='<td>'+formatINR(mths[mi])+'</td>';});
// 				} else {
// 					html+='<td colspan="3">'+formatINR(qtots[qi])+'</td>';
// 				}
// 			});
// 			return html;
// 		}

// 		function buildHeader() {
// 			var $t=$('#estimate-table thead').empty();
// 			var $m=$('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense</th>');
// 			Q_KEYS.forEach(function(k){
// 				var o=expandedQ.indexOf(k)!==-1;
// 				$m.append('<th class="est-q-toggle" data-q="'+k+'" colspan="3" rowspan="'+(o?1:2)+'" style="cursor:pointer;">'+Q_DEFS[k].label+' '+(o?'▲':'▼')+'</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s=$('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function(k){
// 					if (expandedQ.indexOf(k)!==-1){Q_DEFS[k].months.forEach(function(m){$s.append('<th>'+m+'</th>');});}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#estimate-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#estimate-tbody').empty();
// 			var term=$('#estimate-search').val().trim().toLowerCase();
// 			if (!Array.isArray(data)||!data.length) {
// 				$tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			var gM=[0,0,0,0,0,0,0,0,0,0,0,0],gQ=[0,0,0,0];
// 			data.forEach(function(head,hi){
// 				if (term&&!matchSearch(head,term)){return;}
// 				getMth(head).forEach(function(v,i){gM[i]+=v;});
// 				qTot(head).forEach(function(v,i){gQ[i]+=v;});
// 				var hs=String(hi),ho=openH[hs];
// 				$tb.append(
// 					'<tr class="cb-row-head cb-est-head" data-hi="'+hs+'">' +
// 						'<td><span class="cb-arrow">'+(ho?'▼':'▶')+'</span> '+head.name+'</td>' +
// 						qCells(head)+'<td class="cb-text-accent">'+formatINR(yTot(head))+'</td>' +
// 					'</tr>'
// 				);
// 				(head.items||[]).forEach(function(item){
// 					$tb.append('<tr class="cb-est-head-item" data-hi="'+hs+'" style="'+(ho?'':'display:none;')+'">' +
// 						'<td style="padding-left:28px;">'+item.name+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
// 				});
// 				(head.sub_heads||[]).forEach(function(sub,si){
// 					var sk=hs+'-'+si,so=openS[sk];
// 					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="'+hs+'" data-si="'+si+'" style="'+(ho?'':'display:none;')+'">' +
// 						'<td style="padding-left:20px;"><span class="cb-arrow">'+(so?'▼':'▶')+'</span> '+sub.name+'</td>'+qCells(sub)+'<td>'+formatINR(yTot(sub))+'</td></tr>');
// 					(sub.items||[]).forEach(function(item){
// 						$tb.append('<tr class="cb-est-sub-item" data-hi="'+hs+'" data-si="'+si+'" style="'+((ho&&so)?'':'display:none;')+'">' +
// 							'<td style="padding-left:44px;">'+item.name+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
// 					});
// 				});
// 			});
// 			var gO={Q1:gQ[0],Q2:gQ[1],Q3:gQ[2],Q4:gQ[3],months:{'4':gM[0],'5':gM[1],'6':gM[2],'7':gM[3],'8':gM[4],'9':gM[5],'10':gM[6],'11':gM[7],'12':gM[8],'1':gM[9],'2':gM[10],'3':gM[11]}};
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>'+qCells(gO)+'<td>'+formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3])+'</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			var o=!openH[hs]; openH[hs]=o;
// 			$('#estimate-table tbody .cb-est-head[data-hi="'+hs+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			if (o) {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-head-item[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){
// 					var si=$(this).attr('data-si');
// 					if (openS[hs+'-'+si]){$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+si+'"]').show();}
// 				});
// 			} else {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){var si=$(this).attr('data-si');openS[hs+'-'+si]=false;$(this).find('.cb-arrow').text('▶');});
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"],.cb-est-sub-item[data-hi="'+hs+'"],.cb-est-head-item[data-hi="'+hs+'"]').hide();
// 			}
// 		}
// 		function toggleSub(hs,ss) {
// 			var sk=hs+'-'+ss,o=!openS[sk]; openS[sk]=o;
// 			$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"][data-si="'+ss+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $i=$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+ss+'"]');
// 			o?$i.show():$i.hide();
// 		}
// 		function matchSearch(head,term) {
// 			if (!term){return true;}
// 			if (head.name.toLowerCase().indexOf(term)!==-1){return true;}
// 			for (var s=0;s<(head.sub_heads||[]).length;s++){
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term)!==-1){return true;}
// 				for (var i=0;i<(head.sub_heads[s].items||[]).length;i++){
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 				}
// 			}
// 			for (var d=0;d<(head.items||[]).length;d++){
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 			}
// 			return false;
// 		}
// 		function bindEvents() {
// 			$(document).on('click.estimate','#estimate-table .est-q-toggle',function(){
// 				var k=String($(this).attr('data-q')),idx=expandedQ.indexOf(k);
// 				if(idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#estimate-expand-quarters').prop('checked',expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$(document).on('change.estimate','#estimate-expand-quarters',function(){expandedQ=this.checked?Q_KEYS.slice():[];renderTable();});
// 			$(document).on('change.estimate','#estimate-expand-items',function(){
// 				if(this.checked){data.forEach(function(h,hi){openH[String(hi)]=true;(h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;});});}
// 				else{openH={};openS={};}
// 				renderTable();
// 			});
// 			$('#tab-estimate').on('click.estimate','.cb-est-head',function(e){e.stopPropagation();toggleHead(String($(this).attr('data-hi')));});
// 			$('#tab-estimate').on('click.estimate','.cb-est-sub', function(e){e.stopPropagation();toggleSub(String($(this).attr('data-hi')),String($(this).attr('data-si')));});
// 			$(document).on('input.estimate','#estimate-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked',false);
// 			var year=(fy||'2025-26').split('-')[0];
// 			Loader.show('We\u2019re shaping your projections into a smart view');
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
// 				args    : { fiscal_year: year, accounting_period: '12' },
// 				callback: function(r){
// 					if (r.message) {
// 						if (r.message.status === 'success')                       { data = r.message.data || []; }
// 						else if (Array.isArray(r.message))                        { data = r.message; }
// 						else if (r.message.data && Array.isArray(r.message.data)) { data = r.message.data; }
// 						else { frappe.msgprint('Failed to load Estimate data.'); }
// 					} else { frappe.msgprint('Failed to load Estimate data.'); }
// 					Store.estimate = data;
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// BUDGET & ESTIMATE MODULE
// 	// =============================================================================

// 	var BudgetEstimate = (function () {

// 		var rawData=[], currentFY='', openSec={}, openSub={}, expandItems=false, bound=false;

// 		function pl(){return getFYLabels(currentFY).plan;}
// 		function el(){return getFYLabels(currentFY).est;}
// 		function entityLabel(e){return (e.label||'').trim();}

// 		function buildStruct() {
// 			if (!rawData.length){return [];}
// 			return (rawData[0].actuals||[]).map(function(sec){
// 				return {
// 					name     : sec.name,
// 					sub_heads: (sec.sub_heads||[]).map(function(sub){
// 						return {name:sub.name, items:(sub.items||[]).map(function(i){return {name:i.name};})};
// 					}),
// 					items: (sec.items||[]).map(function(i){return {name:i.name};})
// 				};
// 			});
// 		}

// 		function itemVal(entry,name,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				(sec.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});
// 				(sec.sub_heads||[]).forEach(function(sub){(sub.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});});
// 			});
// 			return v;
// 		}
// 		function subVal(entry,sn,subn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				(sec.sub_heads||[]).forEach(function(sub){
// 					if(sub.name!==subn){return;}
// 					v+=parseFloat(field==='plan'?(sub.ytd||0):(sub.total_posted_amt_ytd||0));
// 				});
// 			});
// 			return v;
// 		}
// 		function secVal(entry,sn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));
// 			});
// 			return v;
// 		}
// 		function grandVal(entry,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));});
// 			return v;
// 		}
// 		function itemCells(name){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(itemVal(e,name,'ytd'))+'</td><td>'+formatINR(itemVal(e,name,'total_posted_amt'))+'</td>';});return h;}
// 		function subCells(sn,subn){var h='';rawData.forEach(function(e){h+='<td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'plan'))+'</td><td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'est'))+'</td>';});return h;}
// 		function secCells(sn){var h='';rawData.forEach(function(e){h+='<td style="font-weight:700;">'+formatINR(secVal(e,sn,'plan'))+'</td><td style="font-weight:700;">'+formatINR(secVal(e,sn,'est'))+'</td>';});return h;}
// 		function grandCells(){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(grandVal(e,'plan'))+'</td><td>'+formatINR(grandVal(e,'est'))+'</td>';});return h;}
// 		function iTotP(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'ytd');});return v;}
// 		function iTotE(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'total_posted_amt');});return v;}
// 		function sTotP(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'plan');});return v;}
// 		function sTotE(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'est');});return v;}
// 		function secTP(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'plan');});return v;}
// 		function secTE(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'est');});return v;}
// 		function allGP(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'plan');});return v;}
// 		function allGE(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'est');});return v;}

// 		function tc2(plan,est,cls){
// 			cls=cls||'';
// 			return '<td class="be-total-plan '+cls+'" style="font-weight:700;">'+formatINR(plan)+'</td>' +
// 			       '<td class="be-total-est  '+cls+'" style="font-weight:700;">'+formatINR(est)+'</td>';
// 		}

// 		function buildHeader() {
// 			var $t=$('#be-table thead').empty();
// 			var $r1=$('<tr class="cb-thead-main"></tr>');
// 			var $r2=$('<tr class="cb-thead-sub"></tr>');
// 			$r1.append('<th rowspan="2" style="text-align:left !important;min-width:280px;width:280px;position:sticky;left:0;z-index:50;background:#0076B6;vertical-align:middle;">Expense Head / Line Item</th>');
// 			rawData.forEach(function(e){
// 				$r1.append('<th colspan="2" style="text-align:center;min-width:260px;">'+entityLabel(e)+'</th>');
// 			});
// 			$r1.append('<th colspan="2" style="text-align:center;min-width:260px;background:#003B63;">Grand Total</th>');
// 			rawData.forEach(function(){
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+pl()+'</th>');
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+el()+'</th>');
// 			});
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+pl()+'</th>');
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+el()+'</th>');
// 			$t.append($r1).append($r2);
// 			fixStickySubHeader('#be-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#be-tbody').empty();
// 			var term=$('#be-search').val().trim().toLowerCase();
// 			var struct=buildStruct();
// 			var cols=1+rawData.length*2+2;
// 			if (!rawData.length||!struct.length) {
// 				$tb.append('<tr><td colspan="'+cols+'" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			struct.forEach(function(sec){
// 				var sn=sec.name, secOpen=openSec[sn]!==false, secVis=secOpen?'':'display:none;';
// 				$tb.append('<tr class="cb-row-head be-sec-row" data-sec="'+sn+'">' +
// 					'<td style="text-align:left;"><span class="cb-arrow">'+(secOpen?'▼':'▶')+'</span> '+sn+'</td>' +
// 					secCells(sn)+tc2(secTP(sn),secTE(sn),'be-grand-col')+'</tr>');
// 				sec.sub_heads.forEach(function(sub){
// 					var sk=sn+'::'+sub.name, subOpen=expandItems||(openSub[sk]===true), itmVis=(secOpen&&subOpen)?'':'display:none;';
// 					$tb.append('<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="'+sn+'" data-sub="'+sk+'" style="'+secVis+'">' +
// 						'<td style="padding-left:22px;text-align:left;"><span class="cb-arrow">'+(subOpen?'▼':'▶')+'</span> '+sub.name+'</td>' +
// 						subCells(sn,sub.name)+tc2(sTotP(sn,sub.name),sTotE(sn,sub.name),'be-grand-col')+'</tr>');
// 					sub.items.forEach(function(item){
// 						if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 						$tb.append('<tr class="be-item-row be-sec-child be-sub-child" data-sec="'+sn+'" data-sub="'+sk+'" style="'+itmVis+'">' +
// 							'<td style="padding-left:42px;text-align:left;">'+item.name+'</td>' +
// 							itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col')+'</tr>');
// 					});
// 				});
// 				sec.items.forEach(function(item){
// 					if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 					$tb.append('<tr class="be-item-row be-sec-child be-direct-item" data-sec="'+sn+'" style="'+secVis+'">' +
// 						'<td style="padding-left:30px;text-align:left;">'+item.name+'</td>' +
// 						itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col')+'</tr>');
// 				});
// 			});
// 			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>'+grandCells()+tc2(allGP(),allGE(),'be-grand-col')+'</tr>');
// 		}

// 		function toggleSec(sn){
// 			var o=!(openSec[sn]!==false); openSec[sn]=o;
// 			$('#be-table tbody .be-sec-row[data-sec="'+sn+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $ch=$('#be-table tbody .be-sec-child[data-sec="'+sn+'"]');
// 			if(o){
// 				$ch.filter('.be-sub-row,.be-direct-item').show();
// 				$ch.filter('.be-sub-child').each(function(){var sk=$(this).attr('data-sub');if(expandItems||openSub[sk]===true){$(this).show();}});
// 			} else {$ch.hide();}
// 		}
// 		function toggleSubRow(sk){
// 			var o=!(openSub[sk]===true); openSub[sk]=o;
// 			$('#be-table tbody .be-sub-row[data-sub="'+sk+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $it=$('#be-table tbody .be-sub-child[data-sub="'+sk+'"]');
// 			o?$it.show():$it.hide();
// 		}
// 		function bindEvents(){
// 			$('#tab-budget_estimate').on('click.be','.be-sec-row',function(e){e.stopPropagation();toggleSec($(this).attr('data-sec'));});
// 			$('#tab-budget_estimate').on('click.be','.be-sub-row',function(e){e.stopPropagation();if(!expandItems){toggleSubRow($(this).attr('data-sub'));}});
// 			$(document).on('change.be','#be-expand-items',function(){
// 				expandItems=this.checked;
// 				buildStruct().forEach(function(sec){
// 					openSec[sec.name]=expandItems?true:false;
// 					sec.sub_heads.forEach(function(sub){openSub[sec.name+'::'+sub.name]=expandItems;});
// 				});
// 				renderTable();
// 			});
// 			$(document).on('input.be','#be-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy){
// 			currentFY=fy; rawData=[]; openSec={}; openSub={}; expandItems=false;
// 			$('#be-expand-items').prop('checked',false);
// 			Loader.show("We're balancing budget and estimate");
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.format_api',
// 				args    : { financial_year: fy, month: 'March', set_group_id: "2", previous_financial_year: getPrevFY(fy) },
// 				callback: function(r){
// 					if(r.message&&Array.isArray(r.message)){rawData=r.message;}
// 					else{frappe.msgprint('Failed to load Budget & Estimate data.');}
// 					Store.budgetEstimate = rawData;
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Budget & Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// EXPORT BUTTON WIRING
// 	// =============================================================================

// 	var API = 'annual_budget.api.export_reports';

// 	$(document).on('click', '#xl-ppt', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.ppt.rows.length) { frappe.msgprint('Please wait for the data to load first.'); return; }
// 		serverExport(API + '.export_ppt', {
// 			financial_year    : fy,
// 			ppt_rows          : JSON.stringify(Store.ppt.rows),
// 			prev_ppt_rows     : JSON.stringify(Store.ppt.prevRows),
// 			budget_label      : Store.ppt.budgetLabel,
// 			est_label         : Store.ppt.estLabel,
// 			prev_budget_label : Store.ppt.prevBudgetLabel,
// 			prev_est_label    : Store.ppt.prevEstLabel
// 		}, 'Building Foundation Metrics Excel…');
// 	});

// 	$(document).on('click', '#xl-annual', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.annual.length) { frappe.msgprint('Please load the Annual Budget tab first.'); return; }
// 		serverExport(API + '.export_annual', {
// 			financial_year: fy,
// 			annual_data   : JSON.stringify(Store.annual)
// 		}, 'Building Annual Budget Excel…');
// 	});

// 	$(document).on('click', '#xl-estimate', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.estimate.length) { frappe.msgprint('Please load the Estimate tab first.'); return; }
// 		serverExport(API + '.export_estimate', {
// 			financial_year: fy,
// 			estimate_data : JSON.stringify(Store.estimate)
// 		}, 'Building Estimate Excel…');
// 	});

// 	$(document).on('click', '#xl-be', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.budgetEstimate.length) { frappe.msgprint('Please load the Budget & Estimate tab first.'); return; }
// 		serverExport(API + '.export_budget_estimate', {
// 			financial_year: fy,
// 			be_data       : JSON.stringify(Store.budgetEstimate)
// 		}, 'Building Budget & Estimate Excel…');
// 	});

// 	$(document).on('click', '#xl-export-all', function () {
// 		var fy      = fyControl.get_value() || '2025-26';
// 		var missing = [];
// 		if (!Store.ppt.rows.length)       { missing.push('Foundation Metrics'); }
// 		if (!Store.annual.length)         { missing.push('Annual Budget'); }
// 		if (!Store.estimate.length)       { missing.push('Estimate'); }
// 		if (!Store.budgetEstimate.length) { missing.push('Budget & Estimate'); }
// 		if (missing.length) {
// 			frappe.msgprint('The following tabs have not been loaded yet:<br><b>' + missing.join(', ') + '</b><br>Please open each tab first, then click Export All.');
// 			return;
// 		}
// 		serverExport(API + '.export_all', {
// 			financial_year    : fy,
// 			ppt_rows          : JSON.stringify(Store.ppt.rows),
// 			prev_ppt_rows     : JSON.stringify(Store.ppt.prevRows),
// 			budget_label      : Store.ppt.budgetLabel,
// 			est_label         : Store.ppt.estLabel,
// 			prev_budget_label : Store.ppt.prevBudgetLabel,
// 			prev_est_label    : Store.ppt.prevEstLabel,
// 			annual_data       : JSON.stringify(Store.annual),
// 			estimate_data     : JSON.stringify(Store.estimate),
// 			be_data           : JSON.stringify(Store.budgetEstimate)
// 		}, 'Building full consolidated Excel…');
// 	});

// 	// =============================================================================
// 	// AUTO-LOAD ACTIVE TAB
// 	// =============================================================================

// 	var initialFY = fyControl.get_value();
// 	if (initialFY) { TabLoader.trigger('ppt'); }

// };



// last working
// frappe.pages['consolidated-budget'].on_page_load = function (wrapper) {

// 	// =============================================================================
// 	// PAGE SETUP
// 	// =============================================================================

// 	var page = frappe.ui.make_app_page({
// 		parent       : wrapper,
// 		title        : 'Foundation - Consolidated Budget - 2025-26',
// 		single_column: true
// 	});

// 	// ── "Export All" — single button injected once into .page-actions ──
// 	setTimeout(function () {
// 		$(wrapper).find('#xl-export-all').remove();
// 		var $exportAllBtn = $(
// 			'<button class="btn btn-default btn-sm" id="xl-export-all" style="display:inline-flex;align-items:center;gap:5px;margin-left:8px;background:#1a1a1a;color:#fff;border-color:#1a1a1a;">' +
// 				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 					'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 					'<polyline points="14 2 14 8 20 8"/>' +
// 					'<line x1="8" y1="13" x2="16" y2="13"/>' +
// 					'<line x1="8" y1="17" x2="16" y2="17"/>' +
// 					'<line x1="10" y1="9" x2="8" y2="9"/>' +
// 				'</svg>' +
// 				'Export All' +
// 			'</button>'
// 		);
// 		var $pa = $(wrapper).find('.page-actions');
// 		if ($pa.length) { $pa.prepend($exportAllBtn); }
// 	}, 300);

// 	function updatePageTitle(financialYear) {
// 		page.set_title('Foundation - Consolidated Budget - ' + financialYear);
// 		setTimeout(function () {
// 			$(wrapper).find('.page-head h3').hide();
// 			$(wrapper).find('.page-head .title-text')
// 				.css({ 'font-size': '20px', 'font-weight': '700', 'color': '#1a1a1a' });
// 		}, 100);
// 	}

// 	// =============================================================================
// 	// FY LABEL HELPERS
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var parts     = (fy || '2025-26').split('-');
// 		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
// 		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
// 		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
// 		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
// 		return {
// 			plan : 'FY' + startYY + '-' + endYY    + ' Plan',
// 			est  : 'FY' + prevStart + '-' + prevEnd + ' Estimate'
// 		};
// 	}

// 	function getPrevFY(fy) {
// 		var parts = (fy || '2025-26').split('-');
// 		var s = parseInt(parts[0] || '2025', 10) - 1;
// 		var e = parseInt(parts[1] || '26',   10) - 1;
// 		return s + '-' + String(e).padStart(2, '0');
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
// 			var m = (typeof msg === 'string' && msg.length) ? msg : 'Loading, please wait';
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
// 	// SHARED DATA STORE
// 	// =============================================================================

// 	var Store = {
// 		ppt           : { rows: [], prevRows: [], budgetLabel: '', estLabel: '', prevBudgetLabel: '', prevEstLabel: '' },
// 		annual        : [],
// 		estimate      : [],
// 		budgetEstimate: []
// 	};

// 	// =============================================================================
// 	// GLOBAL STYLES
// 	// =============================================================================

// 	$(page.body).append(
// 		'<style>' +
// 		':root{' +
// 			'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 			'--orange:#F26B21;--orange-light:#FFF3E6;' +
// 			'--border:#bbb;--border-light:#ddd;--border-header:#005f94;--border-orange:#d45a10;' +
// 		'}' +
// 		'.cb-wrapper{padding:15px;background:#fff;}' +

// 		/* Tab nav */
// 		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:9px 20px;color:#555;font-size:15px;font-weight:400;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:#003B63;font-weight:700;border-bottom:3px solid #003B63;}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +

// 		/* Filter row */
// 		'.cb-filter-row{padding:8px 0;background:#fff;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row{padding:8px;}.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +

// 		/* Controls bar */
// 		'.cb-controls{display:flex;align-items:center;padding:6px 10px;margin-bottom:10px;background:#f7f9fb;border:1px solid #e2e6ea;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
// 		'.cb-controls-left{display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap;}' +
// 		'.cb-controls-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}' +

// 		/* Search */
// 		'.cb-search-wrap{position:relative;display:flex;align-items:center;}' +
// 		'.cb-search-wrap .search-icon{position:absolute;left:8px;color:#8d99a6;pointer-events:none;}' +
// 		'.cb-search-input{padding:5px 8px 5px 28px;border:1px solid #d1d8dd;border-radius:4px;font-size:13px;color:#36414c;background:#fff;width:220px;height:30px;transition:border-color .15s,box-shadow .15s;}' +
// 		'.cb-search-input:focus{outline:none;border-color:#5e64ff;box-shadow:0 0 0 2px rgba(94,100,255,.15);}' +

// 		/* Checkboxes */
// 		'.cb-checkbox-area{display:flex;gap:12px;align-items:center;}' +
// 		'.cb-check-label{display:flex;align-items:center;gap:5px;font-size:13px;font-weight:500;color:#36414c;cursor:pointer;user-select:none;white-space:nowrap;}' +
// 		'.cb-check-label input[type=checkbox]{width:14px;height:14px;cursor:pointer;accent-color:#5e64ff;}' +

// 		/* Export button */
// 		'.cb-xl-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;height:30px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;border:1px solid #1a1a1a;border-radius:4px;background:#1a1a1a;color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.15);transition:background .15s,border-color .15s;}' +
// 		'.cb-xl-btn:hover{background:#333;border-color:#333;}' +
// 		'.cb-xl-btn svg{flex-shrink:0;color:#fff;}' +
// 		'#xl-export-all svg{vertical-align:middle;margin-right:3px;}' +

// 		/* Scroll wrapper */
// 		'.cb-scroll-wrapper{border:1px solid #d1d8dd;border-radius:6px;overflow:auto;max-height:72vh;background:#fff;}' +

// 		/* TABLE BASE */
// 		'.cb-table,.ppt-table-wrap{width:100%;border-collapse:collapse;font-size:15px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;table-layout:auto;}' +
// 		'.cb-table th,.cb-table td,.ppt-table-wrap th,.ppt-table-wrap td{border:1px solid #d1d8dd;padding:8px 12px;white-space:nowrap;text-align:right;}' +
// 		'.cb-table th:first-child,.cb-table td:first-child,.ppt-table-wrap th:first-child,.ppt-table-wrap td:first-child{text-align:left;}' +

// 		/* STICKY HEADERS */
// 		'.cb-thead-main th{background:#0076B6;color:#fff;font-weight:700;font-size:16px;text-align:center !important;position:sticky;top:0;z-index:25;border-color:#005f94;padding:10px 12px;}' +
// 		'.cb-thead-sub th{background:#F26B21;color:#fff;font-weight:600;font-size:15px;text-align:center !important;position:sticky;top:0;z-index:24;border-color:#c85810;min-width:110px;padding:8px 12px;}' +

// 		/* Row types */
// 		'.cb-row-head{font-weight:700;font-size:15px;cursor:pointer;background:#E9F4FB;color:#003B63;}' +
// 		'.cb-row-head:hover td{background:#d0e8f5;}' +
// 		'.cb-row-sub{background:#FFF3E6;font-weight:600;font-size:15px;cursor:pointer;}' +
// 		'.cb-row-sub:hover td{background:#ffe0c2;}' +
// 		'.cb-row-grand td{background:#0076B6 !important;color:#fff !important;font-weight:700;font-size:15px;border-color:#005f94 !important;}' +
// 		'.cb-text-accent{color:#0076B6;font-weight:600;}' +

// 		/* PPT tab */
// 		'#tab-ppt .ppt-table-wrap tbody tr td{font-size:16px;font-weight:400;}' +
// 		'#tab-ppt .ppt-table-wrap tbody tr.ppt-total-row td{font-size:16px;font-weight:700;background:#e8f0fa !important;color:#003B63 !important;border-color:#aaa !important;}' +

// 		/* PPT title */
// 		'.ppt-title-bar{margin:12px 0 4px;}' +
// 		'.ppt-main-title{font-size:15px;font-weight:700;text-transform:uppercase;text-decoration:underline;letter-spacing:.3px;color:#111;}' +
// 		'.ppt-currency-label{font-size:16px;font-style:italic;color:#555;text-align:right;margin-bottom:6px;}' +
// 		'.ppt-currency-label strong{font-weight:800;font-size:16px;font-style:normal;}' +

// 		/* PPT table */
// 		'.ppt-table-wrap thead tr.cb-thead-main th{border-color:#005f94;}' +
// 		'.ppt-table-wrap thead tr.cb-thead-sub th{border-color:#c85810;}' +
// 		'.ppt-table-wrap tbody tr td{background:#fff;color:#111;font-size:15px;}' +
// 		'.ppt-table-wrap tbody tr.ppt-total-row td{font-weight:700;font-size:15px;background:#e8f0fa !important;color:#003B63 !important;border-color:#aaa !important;}' +
// 		'.ppt-dash{color:#bbb;text-align:center;display:block;}' +

// 		/* BUDGET & ESTIMATE — sticky first column */
// 		'#be-table{border-collapse:collapse;}' +
// 		'#be-table tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:280px;max-width:280px;white-space:normal;word-break:break-word;}' +
// 		'#be-table tbody tr td:first-child{background:#fff;}' +
// 		'#be-table .cb-row-head td:first-child{background:#E9F4FB !important;}' +
// 		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6 !important;}' +
// 		'#be-table .cb-row-grand td:first-child{background:#0076B6 !important;}' +
// 		'#be-table thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:#0076B6;text-align:left !important;min-width:280px;}' +
// 		'#be-table .be-grand-col{background:#ddeaf7 !important;color:#003B63;border-left:2px solid #0076B6 !important;}' +
// 		'#be-table .cb-row-grand .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-head .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-sub  .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +
// 		'#be-table .cb-thead-main th:not(:first-child){min-width:260px;text-align:center !important;}' +
// 		'#be-table .cb-thead-sub th{min-width:130px;text-align:center !important;}' +
// 		'#be-table tbody td:first-child,#be-table thead th:first-child{box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +

// 		/* Loader */
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
// 	// HELPERS
// 	// =============================================================================

// 	function formatINR(v) {
// 		var n = Math.round(parseFloat(v) || 0);
// 		var neg = n < 0;
// 		var s   = String(Math.abs(n));
// 		if (s.length > 3) {
// 			var last3 = s.slice(-3);
// 			var rest  = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
// 			s = rest + ',' + last3;
// 		}
// 		return (neg ? '-' : '') + s;
// 	}

// 	function fixStickySubHeader(tableSelector) {
// 		setTimeout(function () {
// 			var $table = $(tableSelector);
// 			if (!$table.length) { return; }
// 			var $mainRow = $table.find('thead tr.cb-thead-main');
// 			var $subRow  = $table.find('thead tr.cb-thead-sub');
// 			if (!$mainRow.length || !$subRow.length) { return; }
// 			var h = $mainRow[0].getBoundingClientRect().height || $mainRow.outerHeight(true) || 0;
// 			if (h > 0) { $subRow.find('th').css('top', h + 'px'); }
// 		}, 50);
// 	}

// 	function xlBtn(id, label) {
// 		return (
// 			'<button class="cb-xl-btn" id="' + id + '">' +
// 				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 					'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 					'<polyline points="14 2 14 8 20 8"/>' +
// 					'<line x1="8" y1="13" x2="16" y2="13"/>' +
// 					'<line x1="8" y1="17" x2="16" y2="17"/>' +
// 					'<line x1="10" y1="9" x2="8" y2="9"/>' +
// 				'</svg>' +
// 				label +
// 			'</button>'
// 		);
// 	}

// 	function controlsBar(searchId, searchPlaceholder, checks, exportId) {
// 		var checkHtml = checks.map(function (c) {
// 			return (
// 				'<label class="cb-check-label">' +
// 					'<input type="checkbox" id="' + c.id + '"> ' + c.label +
// 				'</label>'
// 			);
// 		}).join('');
// 		return (
// 			'<div class="cb-controls">' +
// 				'<div class="cb-controls-left">' +
// 					'<div class="cb-search-wrap">' +
// 						'<svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
// 						'<input type="text" id="' + searchId + '" class="cb-search-input" placeholder="' + searchPlaceholder + '">' +
// 					'</div>' +
// 					'<div class="cb-checkbox-area">' + checkHtml + '</div>' +
// 				'</div>' +
// 				'<div class="cb-controls-right">' + xlBtn(exportId, 'Export to Excel') + '</div>' +
// 			'</div>'
// 		);
// 	}

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================

// 	$(page.body).append(
// 		'<div class="cb-wrapper">' +

// 			'<div class="frappe-control-group row cb-filter-row" id="cb-filter-row"></div>' +

// 			'<ul id="cb-tab-nav">' +
// 				'<li><a class="cb-tab-link active" data-tab="ppt">Foundation level/Overall metrics</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="summary_inr">Summary in INR</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="headcount">Headcount</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="estimate">Estimate Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="budget_estimate">Budget &amp; Estimate</a></li>' +
// 			'</ul>' +

// 			'<div id="cb-tab-content">' +

// 				/* ── PPT TAB ── */
// 				'<div class="cb-tab-pane active" id="tab-ppt">' +
// 					'<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">' +
// 						xlBtn('xl-ppt', 'Export to Excel') +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-main-title">Overall Foundation - Budget vs. Estimate</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 						'<table id="ppt-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-prev-title">Overall Foundation - Previous Year Budget vs. Estimate</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table id="ppt-prev-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-prev-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-prev-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-prev-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 				'</div>' +

// 				'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
// 				'<div class="cb-tab-pane" id="tab-headcount"></div>' +

// 				/* ── ANNUAL BUDGET TAB ── */
// 				'<div class="cb-tab-pane" id="tab-annual_budget">' +
// 					controlsBar(
// 						'annual-search', 'Search expense / item…',
// 						[
// 							{ id: 'annual-expand-quarters', label: 'Expand Quarters' },
// 							{ id: 'annual-expand-items',   label: 'Expand Line Items' }
// 						],
// 						'xl-annual'
// 					) +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* ── ESTIMATE TAB ── */
// 				'<div class="cb-tab-pane" id="tab-estimate">' +
// 					controlsBar(
// 						'estimate-search', 'Search expense / item…',
// 						[
// 							{ id: 'estimate-expand-quarters', label: 'Expand Quarters' },
// 							{ id: 'estimate-expand-items',    label: 'Expand Line Items' }
// 						],
// 						'xl-estimate'
// 					) +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* ── BUDGET & ESTIMATE TAB ── */
// 				'<div class="cb-tab-pane" id="tab-budget_estimate">' +
// 					controlsBar(
// 						'be-search', 'Search expense / item…',
// 						[
// 							{ id: 'be-expand-items', label: 'Expand Line Items' }
// 						],
// 						'xl-be'
// 					) +
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
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (r.message && r.message.length) {
// 				var years = r.message.map(function (d) { return d.financial_year; });
// 				fyControl.df.options = years.join('\n');
// 				fyControl.refresh();
// 				var today     = new Date();
// 				var year      = today.getFullYear();
// 				var month     = today.getMonth() + 1;
// 				var currentFY = (month >= 4)
// 					? year + '-' + String(year + 1).slice(-2)
// 					: (year - 1) + '-' + String(year).slice(-2);
// 				var target = years.indexOf(currentFY) !== -1 ? currentFY : years[0];
// 				fyControl.set_value(target);
// 				updatePageTitle(target);
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
// 			ppt            : function (fy) { PPT.load(fy);            },
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
// 	// SERVER-SIDE EXCEL DOWNLOAD HELPER
// 	// =============================================================================

// 	function downloadFromB64(b64, filename) {
// 		var binary = atob(b64);
// 		var bytes  = new Uint8Array(binary.length);
// 		for (var i = 0; i < binary.length; i++) { bytes[i] = binary.charCodeAt(i); }
// 		var blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
// 		var url  = URL.createObjectURL(blob);
// 		var a    = document.createElement('a');
// 		a.href = url; a.download = filename;
// 		document.body.appendChild(a);
// 		a.click();
// 		setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
// 	}

// 	function serverExport(method, args, loadingMsg) {
// 		Loader.show(loadingMsg || 'Preparing your Excel file');
// 		frappe.call({
// 			method  : method,
// 			args    : args,
// 			callback: function (r) {
// 				Loader.hide();
// 				if (r.message && r.message.data) {
// 					downloadFromB64(r.message.data, r.message.filename);
// 				} else {
// 					frappe.msgprint('Export failed — no data returned from server.');
// 				}
// 			},
// 			error: function () {
// 				Loader.hide();
// 				frappe.msgprint('Server error during export. Please try again.');
// 			}
// 		});
// 	}

// 	// =============================================================================
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {

// 		var currentFY = '';

// 		function toCr(v) { return (parseFloat(v) || 0) / 10000000; }

// 		function fmt(v) {
// 			var n = parseFloat(v) || 0;
// 			if (n === 0) { return '<span class="ppt-dash">-</span>'; }
// 			var neg = n < 0;
// 			var abs = Math.abs(n).toFixed(2);
// 			var pts = abs.split('.');
// 			var ip  = pts[0], dp = pts[1];
// 			if (ip.length > 3) {
// 				var l3 = ip.slice(-3);
// 				var rs = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
// 				ip = rs + ',' + l3;
// 			}
// 			return (neg ? '-' : '') + ip + '.' + dp;
// 		}

// 		// Build rows in exact API order — no reordering, no dedup, no buckets.
// 		// Grand Total is accumulated inline and appended as the last row.
// 		function transformResponse(message, idx) {
// 			var rows  = [];
// 			var grand = { bOpex: 0, bCapex: 0, eOpex: 0, eCapex: 0 };

// 			(message || []).forEach(function (entity) {
// 				var label  = (entity.label || '').trim();
// 				var ofn    = (entity.overall_foundation_numbers || [])[idx] || {};
// 				var capEx  = ofn.capital_expenses   || {};
// 				var opEx   = ofn.operating_expenses || {};

// 				var bOpex  = toCr(opEx.budget);
// 				var bCapex = toCr(capEx.budget);
// 				var eOpex  = toCr(opEx.actual);
// 				var eCapex = toCr(capEx.actual);

// 				grand.bOpex  += bOpex;
// 				grand.bCapex += bCapex;
// 				grand.eOpex  += eOpex;
// 				grand.eCapex += eCapex;

// 				rows.push({ label: label, bOpex: bOpex, bCapex: bCapex, eOpex: eOpex, eCapex: eCapex });
// 			});

// 			rows.push({
// 				isGrand: true,
// 				label  : 'Grand Total',
// 				bOpex  : grand.bOpex,
// 				bCapex : grand.bCapex,
// 				eOpex  : grand.eOpex,
// 				eCapex : grand.eCapex
// 			});

// 			return rows;
// 		}

// 		// Parse "2025-26 BUDGET VS. 2024-25 EST" from the API title string
// 		function parseHeadersFromTitle(title) {
// 			var budgetLabel = 'Budget', estLabel = 'Estimate';
// 			if (!title) { return { budgetLabel: budgetLabel, estLabel: estLabel }; }
// 			var m = title.match(/(\d{4}-\d{2})\s+BUDGET\s+VS\.\s+(\d{4}-\d{2})\s+EST/i);
// 			if (m) { budgetLabel = m[1] + ' Budget'; estLabel = m[2] + ' Estimate'; }
// 			return { budgetLabel: budgetLabel, estLabel: estLabel };
// 		}

// 		function renderTable(rows, apiTitle, tbodyId, titleId, budgetHdrId, estHdrId, tableId) {
// 			// Convert ALL-CAPS API title to readable form
// 			var displayTitle = (apiTitle || '')
// 				.replace(/^OVERALL FOUNDATION NUMBERS\s*-\s*/i, 'Overall Foundation - ')
// 				.replace(/\bBUDGET\b/g, 'Budget')
// 				.replace(/\bVS\.\b/g,   'vs.')
// 				.replace(/\bEST\b/g,    'Estimate');
// 			$('#' + titleId).text(displayTitle);

// 			var hdrs = parseHeadersFromTitle(apiTitle);
// 			$('#' + budgetHdrId).text(hdrs.budgetLabel);
// 			$('#' + estHdrId).text(hdrs.estLabel);

// 			var $tb = $('#' + tbodyId).empty();

// 			rows.forEach(function (row) {
// 				var isGrand = row.isGrand === true;
// 				var cls     = isGrand ? 'ppt-total-row' : '';
// 				var bO = row.bOpex, bC = row.bCapex, eO = row.eOpex, eC = row.eCapex;

// 				$tb.append(
// 					'<tr class="' + cls + '">' +
// 						'<td>' + row.label    + '</td>' +
// 						'<td>' + fmt(bO)      + '</td>' +
// 						'<td>' + fmt(bC)      + '</td>' +
// 						'<td>' + fmt(bO + bC) + '</td>' +
// 						'<td>' + fmt(eO)      + '</td>' +
// 						'<td>' + fmt(eC)      + '</td>' +
// 						'<td>' + fmt(eO + eC) + '</td>' +
// 					'</tr>'
// 				);
// 			});

// 			fixStickySubHeader('#' + tableId);
// 		}

// 		function fetchAndRender(fy) {
// 			$('#ppt-tbody,#ppt-prev-tbody').html(
// 				'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading…</td></tr>'
// 			);
// 			Loader.show('Building your foundation metrics to present insights clearly');

// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.add_expense_totals',
// 				args  : {
// 					financial_year          : fy,
// 					month                   : 'March',
// 					set_group_id            : '4,5',
// 					previous_financial_year : getPrevFY(fy)
// 				},
// 				callback: function (r) {
// 					Loader.hide();

// 					// API returns either r.message (array) or r.message.message (array)
// 					var msg = null;
// 					if (r.message && Array.isArray(r.message)) {
// 						msg = r.message;
// 					} else if (r.message && r.message.message && Array.isArray(r.message.message)) {
// 						msg = r.message.message;
// 					}

// 					if (!msg || !msg.length) {
// 						$('#ppt-tbody,#ppt-prev-tbody').html(
// 							'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>'
// 						);
// 						return;
// 					}
// 					var first  = msg[0] || {};
// 					var ofnArr = first.overall_foundation_numbers || [];
// 					var title0 = (ofnArr[0] || {}).title || '';
// 					var title1 = (ofnArr[1] || {}).title || '';

// 					var rows0 = transformResponse(msg, 0);
// 					var rows1 = transformResponse(msg, 1);

// 					renderTable(rows0, title0, 'ppt-tbody',      'ppt-main-title', 'ppt-budget-hdr',      'ppt-est-hdr',      'ppt-table');
// 					renderTable(rows1, title1, 'ppt-prev-tbody', 'ppt-prev-title', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr', 'ppt-prev-table');

// 					function toExportRows(rows) {
// 						return rows.map(function (row) {
// 							return {
// 								label   : row.label,
// 								bOpex   : row.bOpex,
// 								bCapex  : row.bCapex,
// 								eOpex   : row.eOpex,
// 								eCapex  : row.eCapex,
// 								is_total: row.isGrand === true
// 							};
// 						});
// 					}

// 					Store.ppt.rows            = toExportRows(rows0);
// 					Store.ppt.prevRows        = toExportRows(rows1);
// 					Store.ppt.budgetLabel     = $('#ppt-budget-hdr').text();
// 					Store.ppt.estLabel        = $('#ppt-est-hdr').text();
// 					Store.ppt.prevBudgetLabel = $('#ppt-prev-budget-hdr').text();
// 					Store.ppt.prevEstLabel    = $('#ppt-prev-est-hdr').text();
// 				},
// 				error: function () {
// 					Loader.hide();
// 					$('#ppt-tbody,#ppt-prev-tbody').html(
// 						'<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>'
// 					);
// 				}
// 			});
// 		}

// 		function load(fy) { currentFY = fy || '2025-26'; fetchAndRender(currentFY); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ANNUAL BUDGET MODULE
// 	// =============================================================================

// 	var Annual = (function () {

// 		var Q_DEFS = {
// 			q1: { label: 'Quarter 1', months: ['April','May','June'] },
// 			q2: { label: 'Quarter 2', months: ['July','August','September'] },
// 			q3: { label: 'Quarter 3', months: ['October','November','December'] },
// 			q4: { label: 'Quarter 4', months: ['January','February','March'] }
// 		};
// 		var Q_KEYS = ['q1','q2','q3','q4'];
// 		var data=[], expandedQ=[], openH={}, openS={}, bound=false;

// 		function sumArr(a) { var t=0; (a||[]).forEach(function(v){t+=(v||0);}); return t; }
// 		function objTotal(o) { var t=0; Q_KEYS.forEach(function(k){t+=sumArr(o[k]);}); return t; }

// 		function qCells(obj) {
// 			var html = '';
// 			Q_KEYS.forEach(function (k) {
// 				var vals = obj[k]||[0,0,0];
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
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense Head / Line Item</th>');
// 			Q_KEYS.forEach(function (k) {
// 				var o = expandedQ.indexOf(k) !== -1;
// 				$m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o?1:2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o?'▲':'▼') + '</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s = $('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function (k) {
// 					if (expandedQ.indexOf(k) !== -1) {
// 						Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); });
// 					}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#annual-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb  = $('#annual-table tbody').empty();
// 			var term = $('#annual-search').val().trim().toLowerCase();
// 			var grand = { q1:[0,0,0], q2:[0,0,0], q3:[0,0,0], q4:[0,0,0] };
// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				var hs = String(hi), ho = openH[hs] === true;
// 				Q_KEYS.forEach(function (k) { (head[k]||[0,0,0]).forEach(function(v,mi){grand[k][mi]+=(v||0);}); });
// 				$tb.append(
// 					'<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '">' +
// 						'<td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name.trim() + '</td>' +
// 						qCells(head) + '<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td>' +
// 					'</tr>'
// 				);
// 				(head.sub_heads||[]).forEach(function (sub, si) {
// 					var sk = hs+'-'+si, so = openS[sk]===true;
// 					$tb.append(
// 						'<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:22px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td>' +
// 							qCells(sub) + '<td>' + formatINR(objTotal(sub)) + '</td>' +
// 						'</tr>'
// 					);
// 					(sub.items||[]).forEach(function (item) {
// 						$tb.append(
// 							'<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho&&so)?'':'display:none;') + '">' +
// 								'<td style="padding-left:42px;">' + item.name + '</td>' +
// 								qCells(item) + '<td>' + formatINR(objTotal(item)) + '</td>' +
// 							'</tr>'
// 						);
// 					});
// 				});
// 				(head.items||[]).forEach(function (d) {
// 					$tb.append(
// 						'<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:35px;">' + d.name + '</td>' +
// 							qCells(d) + '<td>' + formatINR(objTotal(d)) + '</td>' +
// 						'</tr>'
// 					);
// 				});
// 			});
// 			var gt=0; Q_KEYS.forEach(function(k){gt+=sumArr(grand[k]);});
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			openH[hs] = !(openH[hs]===true);
// 			if (!openH[hs]) {
// 				data.forEach(function(h,hi){ if(String(hi)!==hs){return;} (h.sub_heads||[]).forEach(function(_,si){openS[hs+'-'+si]=false;}); });
// 			}
// 			renderTable();
// 		}
// 		function toggleSub(hs,ss) { openS[hs+'-'+ss]=!(openS[hs+'-'+ss]===true); renderTable(); }

// 		function matchSearch(head, term) {
// 			if (!term) { return true; }
// 			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
// 			for (var s=0; s<(head.sub_heads||[]).length; s++) {
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; }
// 				for (var i=0; i<(head.sub_heads[s].items||[]).length; i++) {
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 				}
// 			}
// 			for (var d=0; d<(head.items||[]).length; d++) {
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 			}
// 			return false;
// 		}

// 		function bindEvents() {
// 			$(document).on('input.annual', '#annual-search', function () { renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-quarters', function () {
// 				expandedQ = this.checked ? Q_KEYS.slice() : [];
// 				renderTable();
// 			});
// 			$(document).on('change.annual', '#annual-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function(h,hi){ openH[String(hi)]=true; (h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;}); });
// 				} else { openH={}; openS={}; }
// 				renderTable();
// 			});
// 			$(document).on('click.annual', '#annual-table .cb-q-header', function () {
// 				var k=String($(this).attr('data-quarter')), idx=expandedQ.indexOf(k);
// 				if (idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#annual-expand-quarters').prop('checked', expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 		}

// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			$('#annual-search').val('');
// 			Loader.show('We\u2019re stitching together your annual budget story');
// 			frappe.call({
// 				method  : 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args    : { financial_year: fy },
// 				callback: function (r) {
// 					data = r.message || [];
// 					Store.annual = data;
// 					renderTable();
// 					Loader.hide();
// 				},
// 				error: function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}

// 		function load(fy) { if (!bound) { bindEvents(); bound=true; } fetchAndRender(fy); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE
// 	// =============================================================================

// 	var Estimate = (function () {

// 		var Q_DEFS = {
// 			q1: { label:'Quarter 1', months:['April','May','June'] },
// 			q2: { label:'Quarter 2', months:['July','August','September'] },
// 			q3: { label:'Quarter 3', months:['October','November','December'] },
// 			q4: { label:'Quarter 4', months:['January','February','March'] }
// 		};
// 		var Q_KEYS=['q1','q2','q3','q4'];
// 		var Q_IDX={q1:[0,1,2],q2:[3,4,5],q3:[6,7,8],q4:[9,10,11]};
// 		var data=[],expandedQ=[],openH={},openS={},bound=false;

// 		function getMth(obj) {
// 			var m=obj.months||{};
// 			return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),
// 			        parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),
// 			        parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),
// 			        parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)];
// 		}
// 		function qTot(obj){return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)];}
// 		function yTot(obj){var q=qTot(obj);return q[0]+q[1]+q[2]+q[3];}

// 		function qCells(obj) {
// 			var mths=getMth(obj),qtots=qTot(obj),html='';
// 			Q_KEYS.forEach(function(q,qi){
// 				if (expandedQ.indexOf(q)!==-1) {
// 					Q_IDX[q].forEach(function(mi){html+='<td>'+formatINR(mths[mi])+'</td>';});
// 				} else {
// 					html+='<td colspan="3">'+formatINR(qtots[qi])+'</td>';
// 				}
// 			});
// 			return html;
// 		}

// 		function buildHeader() {
// 			var $t=$('#estimate-table thead').empty();
// 			var $m=$('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense</th>');
// 			Q_KEYS.forEach(function(k){
// 				var o=expandedQ.indexOf(k)!==-1;
// 				$m.append('<th class="est-q-toggle" data-q="'+k+'" colspan="3" rowspan="'+(o?1:2)+'" style="cursor:pointer;">'+Q_DEFS[k].label+' '+(o?'▲':'▼')+'</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s=$('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function(k){
// 					if (expandedQ.indexOf(k)!==-1){Q_DEFS[k].months.forEach(function(m){$s.append('<th>'+m+'</th>');});}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#estimate-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#estimate-tbody').empty();
// 			var term=$('#estimate-search').val().trim().toLowerCase();
// 			if (!Array.isArray(data)||!data.length) {
// 				$tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			var gM=[0,0,0,0,0,0,0,0,0,0,0,0],gQ=[0,0,0,0];
// 			data.forEach(function(head,hi){
// 				if (term&&!matchSearch(head,term)){return;}
// 				getMth(head).forEach(function(v,i){gM[i]+=v;});
// 				qTot(head).forEach(function(v,i){gQ[i]+=v;});
// 				var hs=String(hi),ho=openH[hs];
// 				$tb.append(
// 					'<tr class="cb-row-head cb-est-head" data-hi="'+hs+'">' +
// 						'<td><span class="cb-arrow">'+(ho?'▼':'▶')+'</span> '+head.name+'</td>' +
// 						qCells(head)+'<td class="cb-text-accent">'+formatINR(yTot(head))+'</td>' +
// 					'</tr>'
// 				);
// 				(head.items||[]).forEach(function(item){
// 					$tb.append('<tr class="cb-est-head-item" data-hi="'+hs+'" style="'+(ho?'':'display:none;')+'">' +
// 						'<td style="padding-left:28px;">'+item.name+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
// 				});
// 				(head.sub_heads||[]).forEach(function(sub,si){
// 					var sk=hs+'-'+si,so=openS[sk];
// 					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="'+hs+'" data-si="'+si+'" style="'+(ho?'':'display:none;')+'">' +
// 						'<td style="padding-left:20px;"><span class="cb-arrow">'+(so?'▼':'▶')+'</span> '+sub.name+'</td>'+qCells(sub)+'<td>'+formatINR(yTot(sub))+'</td></tr>');
// 					(sub.items||[]).forEach(function(item){
// 						$tb.append('<tr class="cb-est-sub-item" data-hi="'+hs+'" data-si="'+si+'" style="'+((ho&&so)?'':'display:none;')+'">' +
// 							'<td style="padding-left:44px;">'+item.name+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
// 					});
// 				});
// 			});
// 			var gO={Q1:gQ[0],Q2:gQ[1],Q3:gQ[2],Q4:gQ[3],months:{'4':gM[0],'5':gM[1],'6':gM[2],'7':gM[3],'8':gM[4],'9':gM[5],'10':gM[6],'11':gM[7],'12':gM[8],'1':gM[9],'2':gM[10],'3':gM[11]}};
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>'+qCells(gO)+'<td>'+formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3])+'</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			var o=!openH[hs]; openH[hs]=o;
// 			$('#estimate-table tbody .cb-est-head[data-hi="'+hs+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			if (o) {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-head-item[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){
// 					var si=$(this).attr('data-si');
// 					if (openS[hs+'-'+si]){$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+si+'"]').show();}
// 				});
// 			} else {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){var si=$(this).attr('data-si');openS[hs+'-'+si]=false;$(this).find('.cb-arrow').text('▶');});
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"],.cb-est-sub-item[data-hi="'+hs+'"],.cb-est-head-item[data-hi="'+hs+'"]').hide();
// 			}
// 		}
// 		function toggleSub(hs,ss) {
// 			var sk=hs+'-'+ss,o=!openS[sk]; openS[sk]=o;
// 			$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"][data-si="'+ss+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $i=$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+ss+'"]');
// 			o?$i.show():$i.hide();
// 		}
// 		function matchSearch(head,term) {
// 			if (!term){return true;}
// 			if (head.name.toLowerCase().indexOf(term)!==-1){return true;}
// 			for (var s=0;s<(head.sub_heads||[]).length;s++){
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term)!==-1){return true;}
// 				for (var i=0;i<(head.sub_heads[s].items||[]).length;i++){
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 				}
// 			}
// 			for (var d=0;d<(head.items||[]).length;d++){
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 			}
// 			return false;
// 		}
// 		function bindEvents() {
// 			$(document).on('click.estimate','#estimate-table .est-q-toggle',function(){
// 				var k=String($(this).attr('data-q')),idx=expandedQ.indexOf(k);
// 				if(idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#estimate-expand-quarters').prop('checked',expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$(document).on('change.estimate','#estimate-expand-quarters',function(){expandedQ=this.checked?Q_KEYS.slice():[];renderTable();});
// 			$(document).on('change.estimate','#estimate-expand-items',function(){
// 				if(this.checked){data.forEach(function(h,hi){openH[String(hi)]=true;(h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;});});}
// 				else{openH={};openS={};}
// 				renderTable();
// 			});
// 			$('#tab-estimate').on('click.estimate','.cb-est-head',function(e){e.stopPropagation();toggleHead(String($(this).attr('data-hi')));});
// 			$('#tab-estimate').on('click.estimate','.cb-est-sub', function(e){e.stopPropagation();toggleSub(String($(this).attr('data-hi')),String($(this).attr('data-si')));});
// 			$(document).on('input.estimate','#estimate-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked',false);
// 			var year=(fy||'2025-26').split('-')[0];
// 			Loader.show('We\u2019re shaping your projections into a smart view');
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
// 				args    : { fiscal_year: year, accounting_period: '12' },
// 				callback: function(r){
// 					if (r.message) {
// 						if (r.message.status === 'success')                       { data = r.message.data || []; }
// 						else if (Array.isArray(r.message))                        { data = r.message; }
// 						else if (r.message.data && Array.isArray(r.message.data)) { data = r.message.data; }
// 						else { frappe.msgprint('Failed to load Estimate data.'); }
// 					} else { frappe.msgprint('Failed to load Estimate data.'); }
// 					Store.estimate = data;
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// BUDGET & ESTIMATE MODULE
// 	// =============================================================================

// 	var BudgetEstimate = (function () {

// 		var rawData=[], currentFY='', openSec={}, openSub={}, expandItems=false, bound=false;

// 		function pl(){return getFYLabels(currentFY).plan;}
// 		function el(){return getFYLabels(currentFY).est;}
// 		function entityLabel(e){return (e.label||'').trim();}

// 		function buildStruct() {
// 			if (!rawData.length){return [];}
// 			return (rawData[0].actuals||[]).map(function(sec){
// 				return {
// 					name     : sec.name,
// 					sub_heads: (sec.sub_heads||[]).map(function(sub){
// 						return {name:sub.name, items:(sub.items||[]).map(function(i){return {name:i.name};})};
// 					}),
// 					items: (sec.items||[]).map(function(i){return {name:i.name};})
// 				};
// 			});
// 		}

// 		function itemVal(entry,name,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				(sec.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});
// 				(sec.sub_heads||[]).forEach(function(sub){(sub.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});});
// 			});
// 			return v;
// 		}
// 		function subVal(entry,sn,subn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				(sec.sub_heads||[]).forEach(function(sub){
// 					if(sub.name!==subn){return;}
// 					v+=parseFloat(field==='plan'?(sub.ytd||0):(sub.total_posted_amt_ytd||0));
// 				});
// 			});
// 			return v;
// 		}
// 		function secVal(entry,sn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));
// 			});
// 			return v;
// 		}
// 		function grandVal(entry,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));});
// 			return v;
// 		}
// 		function itemCells(name){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(itemVal(e,name,'ytd'))+'</td><td>'+formatINR(itemVal(e,name,'total_posted_amt'))+'</td>';});return h;}
// 		function subCells(sn,subn){var h='';rawData.forEach(function(e){h+='<td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'plan'))+'</td><td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'est'))+'</td>';});return h;}
// 		function secCells(sn){var h='';rawData.forEach(function(e){h+='<td style="font-weight:700;">'+formatINR(secVal(e,sn,'plan'))+'</td><td style="font-weight:700;">'+formatINR(secVal(e,sn,'est'))+'</td>';});return h;}
// 		function grandCells(){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(grandVal(e,'plan'))+'</td><td>'+formatINR(grandVal(e,'est'))+'</td>';});return h;}
// 		function iTotP(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'ytd');});return v;}
// 		function iTotE(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'total_posted_amt');});return v;}
// 		function sTotP(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'plan');});return v;}
// 		function sTotE(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'est');});return v;}
// 		function secTP(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'plan');});return v;}
// 		function secTE(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'est');});return v;}
// 		function allGP(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'plan');});return v;}
// 		function allGE(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'est');});return v;}

// 		function tc2(plan,est,cls){
// 			cls=cls||'';
// 			return '<td class="be-total-plan '+cls+'" style="font-weight:700;">'+formatINR(plan)+'</td>' +
// 			       '<td class="be-total-est  '+cls+'" style="font-weight:700;">'+formatINR(est)+'</td>';
// 		}

// 		function buildHeader() {
// 			var $t=$('#be-table thead').empty();
// 			var $r1=$('<tr class="cb-thead-main"></tr>');
// 			var $r2=$('<tr class="cb-thead-sub"></tr>');
// 			$r1.append('<th rowspan="2" style="text-align:left !important;min-width:280px;width:280px;position:sticky;left:0;z-index:50;background:#0076B6;vertical-align:middle;">Expense Head / Line Item</th>');
// 			rawData.forEach(function(e){
// 				$r1.append('<th colspan="2" style="text-align:center;min-width:260px;">'+entityLabel(e)+'</th>');
// 			});
// 			$r1.append('<th colspan="2" style="text-align:center;min-width:260px;background:#003B63;">Grand Total</th>');
// 			rawData.forEach(function(){
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+pl()+'</th>');
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+el()+'</th>');
// 			});
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+pl()+'</th>');
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+el()+'</th>');
// 			$t.append($r1).append($r2);
// 			fixStickySubHeader('#be-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#be-tbody').empty();
// 			var term=$('#be-search').val().trim().toLowerCase();
// 			var struct=buildStruct();
// 			var cols=1+rawData.length*2+2;
// 			if (!rawData.length||!struct.length) {
// 				$tb.append('<tr><td colspan="'+cols+'" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			struct.forEach(function(sec){
// 				var sn=sec.name, secOpen=openSec[sn]!==false, secVis=secOpen?'':'display:none;';
// 				$tb.append('<tr class="cb-row-head be-sec-row" data-sec="'+sn+'">' +
// 					'<td style="text-align:left;"><span class="cb-arrow">'+(secOpen?'▼':'▶')+'</span> '+sn+'</td>' +
// 					secCells(sn)+tc2(secTP(sn),secTE(sn),'be-grand-col')+'</tr>');
// 				sec.sub_heads.forEach(function(sub){
// 					var sk=sn+'::'+sub.name, subOpen=expandItems||(openSub[sk]===true), itmVis=(secOpen&&subOpen)?'':'display:none;';
// 					$tb.append('<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="'+sn+'" data-sub="'+sk+'" style="'+secVis+'">' +
// 						'<td style="padding-left:22px;text-align:left;"><span class="cb-arrow">'+(subOpen?'▼':'▶')+'</span> '+sub.name+'</td>' +
// 						subCells(sn,sub.name)+tc2(sTotP(sn,sub.name),sTotE(sn,sub.name),'be-grand-col')+'</tr>');
// 					sub.items.forEach(function(item){
// 						if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 						$tb.append('<tr class="be-item-row be-sec-child be-sub-child" data-sec="'+sn+'" data-sub="'+sk+'" style="'+itmVis+'">' +
// 							'<td style="padding-left:42px;text-align:left;">'+item.name+'</td>' +
// 							itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col')+'</tr>');
// 					});
// 				});
// 				sec.items.forEach(function(item){
// 					if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 					$tb.append('<tr class="be-item-row be-sec-child be-direct-item" data-sec="'+sn+'" style="'+secVis+'">' +
// 						'<td style="padding-left:30px;text-align:left;">'+item.name+'</td>' +
// 						itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col')+'</tr>');
// 				});
// 			});
// 			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>'+grandCells()+tc2(allGP(),allGE(),'be-grand-col')+'</tr>');
// 		}

// 		function toggleSec(sn){
// 			var o=!(openSec[sn]!==false); openSec[sn]=o;
// 			$('#be-table tbody .be-sec-row[data-sec="'+sn+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $ch=$('#be-table tbody .be-sec-child[data-sec="'+sn+'"]');
// 			if(o){
// 				$ch.filter('.be-sub-row,.be-direct-item').show();
// 				$ch.filter('.be-sub-child').each(function(){var sk=$(this).attr('data-sub');if(expandItems||openSub[sk]===true){$(this).show();}});
// 			} else {$ch.hide();}
// 		}
// 		function toggleSubRow(sk){
// 			var o=!(openSub[sk]===true); openSub[sk]=o;
// 			$('#be-table tbody .be-sub-row[data-sub="'+sk+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $it=$('#be-table tbody .be-sub-child[data-sub="'+sk+'"]');
// 			o?$it.show():$it.hide();
// 		}
// 		function bindEvents(){
// 			$('#tab-budget_estimate').on('click.be','.be-sec-row',function(e){e.stopPropagation();toggleSec($(this).attr('data-sec'));});
// 			$('#tab-budget_estimate').on('click.be','.be-sub-row',function(e){e.stopPropagation();if(!expandItems){toggleSubRow($(this).attr('data-sub'));}});
// 			$(document).on('change.be','#be-expand-items',function(){
// 				expandItems=this.checked;
// 				buildStruct().forEach(function(sec){
// 					openSec[sec.name]=expandItems?true:false;
// 					sec.sub_heads.forEach(function(sub){openSub[sec.name+'::'+sub.name]=expandItems;});
// 				});
// 				renderTable();
// 			});
// 			$(document).on('input.be','#be-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy){
// 			currentFY=fy; rawData=[]; openSec={}; openSub={}; expandItems=false;
// 			$('#be-expand-items').prop('checked',false);
// 			Loader.show("We're balancing budget and estimate");
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.format_api',
// 				args    : { financial_year: fy, month: 'March', set_group_id: "2", previous_financial_year: getPrevFY(fy) },
// 				callback: function(r){
// 					if(r.message&&Array.isArray(r.message)){rawData=r.message;}
// 					else{frappe.msgprint('Failed to load Budget & Estimate data.');}
// 					Store.budgetEstimate = rawData;
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Budget & Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// EXPORT BUTTON WIRING
// 	// =============================================================================

// 	var API = 'annual_budget.api.export_reports';

// 	$(document).on('click', '#xl-ppt', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.ppt.rows.length) { frappe.msgprint('Please wait for the data to load first.'); return; }
// 		serverExport(API + '.export_ppt', {
// 			financial_year    : fy,
// 			ppt_rows          : JSON.stringify(Store.ppt.rows),
// 			prev_ppt_rows     : JSON.stringify(Store.ppt.prevRows),
// 			budget_label      : Store.ppt.budgetLabel,
// 			est_label         : Store.ppt.estLabel,
// 			prev_budget_label : Store.ppt.prevBudgetLabel,
// 			prev_est_label    : Store.ppt.prevEstLabel
// 		}, 'Building Foundation Metrics Excel…');
// 	});

// 	$(document).on('click', '#xl-annual', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.annual.length) { frappe.msgprint('Please load the Annual Budget tab first.'); return; }
// 		serverExport(API + '.export_annual', {
// 			financial_year: fy,
// 			annual_data   : JSON.stringify(Store.annual)
// 		}, 'Building Annual Budget Excel…');
// 	});

// 	$(document).on('click', '#xl-estimate', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.estimate.length) { frappe.msgprint('Please load the Estimate tab first.'); return; }
// 		serverExport(API + '.export_estimate', {
// 			financial_year: fy,
// 			estimate_data : JSON.stringify(Store.estimate)
// 		}, 'Building Estimate Excel…');
// 	});

// 	$(document).on('click', '#xl-be', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.budgetEstimate.length) { frappe.msgprint('Please load the Budget & Estimate tab first.'); return; }
// 		serverExport(API + '.export_budget_estimate', {
// 			financial_year: fy,
// 			be_data       : JSON.stringify(Store.budgetEstimate)
// 		}, 'Building Budget & Estimate Excel…');
// 	});

// 	$(document).on('click', '#xl-export-all', function () {
// 		var fy      = fyControl.get_value() || '2025-26';
// 		var missing = [];
// 		if (!Store.ppt.rows.length)       { missing.push('Foundation Metrics'); }
// 		if (!Store.annual.length)         { missing.push('Annual Budget'); }
// 		if (!Store.estimate.length)       { missing.push('Estimate'); }
// 		if (!Store.budgetEstimate.length) { missing.push('Budget & Estimate'); }
// 		if (missing.length) {
// 			frappe.msgprint('The following tabs have not been loaded yet:<br><b>' + missing.join(', ') + '</b><br>Please open each tab first, then click Export All.');
// 			return;
// 		}
// 		serverExport(API + '.export_all', {
// 			financial_year    : fy,
// 			ppt_rows          : JSON.stringify(Store.ppt.rows),
// 			prev_ppt_rows     : JSON.stringify(Store.ppt.prevRows),
// 			budget_label      : Store.ppt.budgetLabel,
// 			est_label         : Store.ppt.estLabel,
// 			prev_budget_label : Store.ppt.prevBudgetLabel,
// 			prev_est_label    : Store.ppt.prevEstLabel,
// 			annual_data       : JSON.stringify(Store.annual),
// 			estimate_data     : JSON.stringify(Store.estimate),
// 			be_data           : JSON.stringify(Store.budgetEstimate)
// 		}, 'Building full consolidated Excel…');
// 	});

// 	// =============================================================================
// 	// AUTO-LOAD ACTIVE TAB
// 	// =============================================================================

// 	var initialFY = fyControl.get_value();
// 	if (initialFY) { TabLoader.trigger('ppt'); }

// };


















// frappe.pages['consolidated-budget'].on_page_load = function (wrapper) {

// 	// =============================================================================
// 	// PAGE SETUP
// 	// =============================================================================

// 	var page = frappe.ui.make_app_page({
// 		parent       : wrapper,
// 		title        : 'Foundation - Consolidated Budget',
// 		single_column: true
// 	});

// 	// ── "Export All" — single button injected once into .page-actions ──
// 	setTimeout(function () {
// 		$(wrapper).find('#xl-export-all').remove();
// 		var $exportAllBtn = $(
// 			'<button class="btn btn-default btn-sm" id="xl-export-all" style="display:inline-flex;align-items:center;gap:5px;margin-left:8px;background:#1a1a1a;color:#fff;border-color:#1a1a1a;">' +
// 				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 					'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 					'<polyline points="14 2 14 8 20 8"/>' +
// 					'<line x1="8" y1="13" x2="16" y2="13"/>' +
// 					'<line x1="8" y1="17" x2="16" y2="17"/>' +
// 					'<line x1="10" y1="9" x2="8" y2="9"/>' +
// 				'</svg>' +
// 				'Export All' +
// 			'</button>'
// 		);
// 		var $pa = $(wrapper).find('.page-actions');
// 		if ($pa.length) { $pa.prepend($exportAllBtn); }
// 	}, 300);

// 	function updatePageTitle(financialYear) {
// 		page.set_title('Foundation - Consolidated Budget - ' + financialYear);
// 		setTimeout(function () {
// 			$(wrapper).find('.page-head h3').hide();
// 			$(wrapper).find('.page-head .title-text')
// 				.css({ 'font-size': '20px', 'font-weight': '700', 'color': '#1a1a1a' });
// 		}, 100);
// 	}

// 	// =============================================================================
// 	// FY LABEL HELPERS
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var parts     = (fy || '2025-26').split('-');
// 		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
// 		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
// 		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
// 		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
// 		return {
// 			plan : 'FY' + startYY + '-' + endYY    + ' Plan',
// 			est  : 'FY' + prevStart + '-' + prevEnd + ' Estimate'
// 		};
// 	}

// 	function getPrevFY(fy) {
// 		var parts = (fy || '2025-26').split('-');
// 		var s = parseInt(parts[0] || '2025', 10) - 1;
// 		var e = parseInt(parts[1] || '26',   10) - 1;
// 		return s + '-' + String(e).padStart(2, '0');
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
// 			var m = (typeof msg === 'string' && msg.length) ? msg : 'Loading, please wait';
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
// 	// SHARED DATA STORE
// 	// =============================================================================

// 	var Store = {
// 		ppt           : { rows: [], prevRows: [], budgetLabel: '', estLabel: '', prevBudgetLabel: '', prevEstLabel: '' },
// 		annual        : [],
// 		estimate      : [],
// 		budgetEstimate: []
// 	};

// 	// =============================================================================
// 	// GLOBAL STYLES
// 	// =============================================================================

// 	$(page.body).append(
// 		'<style>' +
// 		':root{' +
// 			'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 			'--orange:#F26B21;--orange-light:#FFF3E6;' +
// 			'--border:#bbb;--border-light:#ddd;--border-header:#005f94;--border-orange:#d45a10;' +
// 		'}' +
// 		'.cb-wrapper{padding:15px;background:#fff;}' +

// 		/* Tab nav */
// 		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:9px 20px;color:#555;font-size:15px;font-weight:400;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:#003B63;font-weight:700;border-bottom:3px solid #003B63;}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +

// 		/* Filter row */
// 		'.cb-filter-row{padding:8px 0;background:#fff;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row{padding:8px;}.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +

// 		/* Controls bar */
// 		'.cb-controls{display:flex;align-items:center;padding:6px 10px;margin-bottom:10px;background:#f7f9fb;border:1px solid #e2e6ea;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
// 		'.cb-controls-left{display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap;}' +
// 		'.cb-controls-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}' +

// 		/* Search */
// 		'.cb-search-wrap{position:relative;display:flex;align-items:center;}' +
// 		'.cb-search-wrap .search-icon{position:absolute;left:8px;color:#8d99a6;pointer-events:none;}' +
// 		'.cb-search-input{padding:5px 8px 5px 28px;border:1px solid #d1d8dd;border-radius:4px;font-size:13px;color:#36414c;background:#fff;width:220px;height:30px;transition:border-color .15s,box-shadow .15s;}' +
// 		'.cb-search-input:focus{outline:none;border-color:#5e64ff;box-shadow:0 0 0 2px rgba(94,100,255,.15);}' +

// 		/* Checkboxes */
// 		'.cb-checkbox-area{display:flex;gap:12px;align-items:center;}' +
// 		'.cb-check-label{display:flex;align-items:center;gap:5px;font-size:13px;font-weight:500;color:#36414c;cursor:pointer;user-select:none;white-space:nowrap;}' +
// 		'.cb-check-label input[type=checkbox]{width:14px;height:14px;cursor:pointer;accent-color:#5e64ff;}' +

// 		/* Export button */
// 		'.cb-xl-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;height:30px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;border:1px solid #1a1a1a;border-radius:4px;background:#1a1a1a;color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.15);transition:background .15s,border-color .15s;}' +
// 		'.cb-xl-btn:hover{background:#333;border-color:#333;}' +
// 		'.cb-xl-btn svg{flex-shrink:0;color:#fff;}' +
// 		'#xl-export-all svg{vertical-align:middle;margin-right:3px;}' +

// 		/* Scroll wrapper */
// 		'.cb-scroll-wrapper{border:1px solid #d1d8dd;border-radius:6px;overflow:auto;max-height:72vh;background:#fff;}' +

// 		/* TABLE BASE */
// 		'.cb-table,.ppt-table-wrap{width:100%;border-collapse:collapse;font-size:15px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;table-layout:auto;}' +
// 		'.cb-table th,.cb-table td,.ppt-table-wrap th,.ppt-table-wrap td{border:1px solid #d1d8dd;padding:8px 12px;white-space:nowrap;text-align:right;}' +
// 		'.cb-table th:first-child,.cb-table td:first-child,.ppt-table-wrap th:first-child,.ppt-table-wrap td:first-child{text-align:left;}' +

// 		/* STICKY HEADERS */
// 		'.cb-thead-main th{background:#0076B6;color:#fff;font-weight:700;font-size:16px;text-align:center !important;position:sticky;top:0;z-index:25;border-color:#005f94;padding:10px 12px;}' +
// 		'.cb-thead-sub th{background:#F26B21;color:#fff;font-weight:600;font-size:15px;text-align:center !important;position:sticky;top:0;z-index:24;border-color:#c85810;min-width:110px;padding:8px 12px;}' +

// 		/* Row types */
// 		'.cb-row-head{font-weight:700;font-size:15px;cursor:pointer;background:#E9F4FB;color:#003B63;}' +
// 		'.cb-row-head:hover td{background:#d0e8f5;}' +
// 		'.cb-row-sub{background:#FFF3E6;font-weight:600;font-size:15px;cursor:pointer;}' +
// 		'.cb-row-sub:hover td{background:#ffe0c2;}' +
// 		'.cb-row-grand td{background:#0076B6 !important;color:#fff !important;font-weight:700;font-size:15px;border-color:#005f94 !important;}' +
// 		'.cb-text-accent{color:#0076B6;font-weight:600;}' +

// 		/* PPT tab */
// 		'#tab-ppt .ppt-table-wrap tbody tr td{font-size:16px;font-weight:400;}' +
// 		'#tab-ppt .ppt-table-wrap tbody tr.ppt-total-row td{font-size:16px;font-weight:700;background:#e8f0fa !important;color:#003B63 !important;border-color:#aaa !important;}' +

// 		/* PPT title */
// 		'.ppt-title-bar{margin:12px 0 4px;}' +
// 		'.ppt-main-title{font-size:15px;font-weight:700;text-transform:uppercase;text-decoration:underline;letter-spacing:.3px;color:#111;}' +
// 		'.ppt-currency-label{font-size:16px;font-style:italic;color:#555;text-align:right;margin-bottom:6px;}' +
// 		'.ppt-currency-label strong{font-weight:800;font-size:16px;font-style:normal;}' +

// 		/* PPT table */
// 		'.ppt-table-wrap thead tr.cb-thead-main th{border-color:#005f94;}' +
// 		'.ppt-table-wrap thead tr.cb-thead-sub th{border-color:#c85810;}' +
// 		'.ppt-table-wrap tbody tr td{background:#fff;color:#111;font-size:15px;}' +
// 		'.ppt-table-wrap tbody tr.ppt-total-row td{font-weight:700;font-size:15px;background:#e8f0fa !important;color:#003B63 !important;border-color:#aaa !important;}' +
// 		'.ppt-dash{color:#bbb;text-align:center;display:block;}' +

// 		/* BUDGET & ESTIMATE — sticky first column */
// 		'#be-table{border-collapse:collapse;}' +
// 		'#be-table tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:280px;max-width:280px;white-space:normal;word-break:break-word;}' +
// 		'#be-table tbody tr td:first-child{background:#fff;}' +
// 		'#be-table .cb-row-head td:first-child{background:#E9F4FB !important;}' +
// 		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6 !important;}' +
// 		'#be-table .cb-row-grand td:first-child{background:#0076B6 !important;}' +
// 		'#be-table thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:#0076B6;text-align:left !important;min-width:280px;}' +
// 		'#be-table .be-grand-col{background:#ddeaf7 !important;color:#003B63;border-left:2px solid #0076B6 !important;}' +
// 		'#be-table .cb-row-grand .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-head .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-sub  .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +
// 		'#be-table .cb-thead-main th:not(:first-child){min-width:260px;text-align:center !important;}' +
// 		'#be-table .cb-thead-sub th{min-width:130px;text-align:center !important;}' +
// 		'#be-table tbody td:first-child,#be-table thead th:first-child{box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +

// 		/* Loader */
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
// 	// HELPERS
// 	// =============================================================================

// 	function formatINR(v) {
// 		var n = Math.round(parseFloat(v) || 0);
// 		var neg = n < 0;
// 		var s   = String(Math.abs(n));
// 		if (s.length > 3) {
// 			var last3 = s.slice(-3);
// 			var rest  = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
// 			s = rest + ',' + last3;
// 		}
// 		return (neg ? '-' : '') + s;
// 	}

// 	function fixStickySubHeader(tableSelector) {
// 		setTimeout(function () {
// 			var $table = $(tableSelector);
// 			if (!$table.length) { return; }
// 			var $mainRow = $table.find('thead tr.cb-thead-main');
// 			var $subRow  = $table.find('thead tr.cb-thead-sub');
// 			if (!$mainRow.length || !$subRow.length) { return; }
// 			var h = $mainRow[0].getBoundingClientRect().height || $mainRow.outerHeight(true) || 0;
// 			if (h > 0) { $subRow.find('th').css('top', h + 'px'); }
// 		}, 50);
// 	}

// 	function xlBtn(id, label) {
// 		return (
// 			'<button class="cb-xl-btn" id="' + id + '">' +
// 				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 					'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 					'<polyline points="14 2 14 8 20 8"/>' +
// 					'<line x1="8" y1="13" x2="16" y2="13"/>' +
// 					'<line x1="8" y1="17" x2="16" y2="17"/>' +
// 					'<line x1="10" y1="9" x2="8" y2="9"/>' +
// 				'</svg>' +
// 				label +
// 			'</button>'
// 		);
// 	}

// 	function controlsBar(searchId, searchPlaceholder, checks, exportId) {
// 		var checkHtml = checks.map(function (c) {
// 			return (
// 				'<label class="cb-check-label">' +
// 					'<input type="checkbox" id="' + c.id + '"> ' + c.label +
// 				'</label>'
// 			);
// 		}).join('');
// 		return (
// 			'<div class="cb-controls">' +
// 				'<div class="cb-controls-left">' +
// 					'<div class="cb-search-wrap">' +
// 						'<svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
// 						'<input type="text" id="' + searchId + '" class="cb-search-input" placeholder="' + searchPlaceholder + '">' +
// 					'</div>' +
// 					'<div class="cb-checkbox-area">' + checkHtml + '</div>' +
// 				'</div>' +
// 				'<div class="cb-controls-right">' + xlBtn(exportId, 'Export to Excel') + '</div>' +
// 			'</div>'
// 		);
// 	}

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================

// 	$(page.body).append(
// 		'<div class="cb-wrapper">' +

// 			'<div class="frappe-control-group row cb-filter-row" id="cb-filter-row"></div>' +

// 			'<ul id="cb-tab-nav">' +
// 				'<li><a class="cb-tab-link active" data-tab="ppt">Foundation level/Overall metrics</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="summary_inr">Summary in INR</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="headcount">Headcount</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="estimate">Estimate Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="budget_estimate">Budget &amp; Estimate</a></li>' +
// 			'</ul>' +

// 			'<div id="cb-tab-content">' +

// 				/* ── PPT TAB ── */
// 				'<div class="cb-tab-pane active" id="tab-ppt">' +
// 					'<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">' +
// 						xlBtn('xl-ppt', 'Export to Excel') +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-main-title">Overall Foundation - Budget vs. Estimate</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 						'<table id="ppt-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-prev-title">Overall Foundation - Previous Year Budget vs. Estimate</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table id="ppt-prev-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-prev-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-prev-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-prev-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 				'</div>' +

// 				'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
// 				'<div class="cb-tab-pane" id="tab-headcount"></div>' +

// 				/* ── ANNUAL BUDGET TAB ── */
// 				'<div class="cb-tab-pane" id="tab-annual_budget">' +
// 					controlsBar(
// 						'annual-search', 'Search expense / item…',
// 						[
// 							{ id: 'annual-expand-quarters', label: 'Expand Quarters' },
// 							{ id: 'annual-expand-items',   label: 'Expand Line Items' }
// 						],
// 						'xl-annual'
// 					) +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* ── ESTIMATE TAB ── */
// 				'<div class="cb-tab-pane" id="tab-estimate">' +
// 					controlsBar(
// 						'estimate-search', 'Search expense / item…',
// 						[
// 							{ id: 'estimate-expand-quarters', label: 'Expand Quarters' },
// 							{ id: 'estimate-expand-items',    label: 'Expand Line Items' }
// 						],
// 						'xl-estimate'
// 					) +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* ── BUDGET & ESTIMATE TAB ── */
// 				'<div class="cb-tab-pane" id="tab-budget_estimate">' +
// 					controlsBar(
// 						'be-search', 'Search expense / item…',
// 						[
// 							{ id: 'be-expand-items', label: 'Expand Line Items' }
// 						],
// 						'xl-be'
// 					) +
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
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (r.message && r.message.length) {
// 				var years = r.message.map(function (d) { return d.financial_year; });
// 				fyControl.df.options = years.join('\n');
// 				fyControl.refresh();
// 				var today     = new Date();
// 				var year      = today.getFullYear();
// 				var month     = today.getMonth() + 1;
// 				var currentFY = (month >= 4)
// 					? year + '-' + String(year + 1).slice(-2)
// 					: (year - 1) + '-' + String(year).slice(-2);
// 				var target = years.indexOf(currentFY) !== -1 ? currentFY : years[0];
// 				fyControl.set_value(target);
// 				updatePageTitle(target);
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
// 			ppt            : function (fy) { PPT.load(fy);            },
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
// 	// SERVER-SIDE EXCEL DOWNLOAD HELPER
// 	// =============================================================================

// 	function downloadFromB64(b64, filename) {
// 		var binary = atob(b64);
// 		var bytes  = new Uint8Array(binary.length);
// 		for (var i = 0; i < binary.length; i++) { bytes[i] = binary.charCodeAt(i); }
// 		var blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
// 		var url  = URL.createObjectURL(blob);
// 		var a    = document.createElement('a');
// 		a.href = url; a.download = filename;
// 		document.body.appendChild(a);
// 		a.click();
// 		setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
// 	}

// 	function serverExport(method, args, loadingMsg) {
// 		Loader.show(loadingMsg || 'Preparing your Excel file');
// 		frappe.call({
// 			method  : method,
// 			args    : args,
// 			callback: function (r) {
// 				Loader.hide();
// 				if (r.message && r.message.data) {
// 					downloadFromB64(r.message.data, r.message.filename);
// 				} else {
// 					frappe.msgprint('Export failed — no data returned from server.');
// 				}
// 			},
// 			error: function () {
// 				Loader.hide();
// 				frappe.msgprint('Server error during export. Please try again.');
// 			}
// 		});
// 	}

// 	// =============================================================================
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {

// 		var currentFY = '';

// 		function toCr(v) { return (parseFloat(v) || 0) / 10000000; }

// 		function fmt(v) {
// 			var n = parseFloat(v) || 0;
// 			if (n === 0) { return '<span class="ppt-dash">-</span>'; }
// 			var neg = n < 0;
// 			var abs = Math.abs(n).toFixed(2);
// 			var pts = abs.split('.');
// 			var ip  = pts[0], dp = pts[1];
// 			if (ip.length > 3) {
// 				var l3 = ip.slice(-3);
// 				var rs = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
// 				ip = rs + ',' + l3;
// 			}
// 			return (neg ? '-' : '') + ip + '.' + dp;
// 		}

// 		// Build rows in API order.
// 		// COVID entities are separated below a Sub Total, then a Grand Total closes the table.
// 		function transformResponse(message, idx) {
// 			var normalRows = [];
// 			var covidRows  = [];
// 			var sub   = { bOpex: 0, bCapex: 0, eOpex: 0, eCapex: 0 };
// 			var cov   = { bOpex: 0, bCapex: 0, eOpex: 0, eCapex: 0 };

// 			(message || []).forEach(function (entity) {
// 				var label   = (entity.label || '').trim();
// 				var isCovid = label.toLowerCase().indexOf('covid') !== -1;

// 				var ofn    = (entity.overall_foundation_numbers || [])[idx] || {};
// 				var capEx  = ofn.capital_expenses   || {};
// 				var opEx   = ofn.operating_expenses || {};

// 				var bOpex  = toCr(opEx.budget);
// 				var bCapex = toCr(capEx.budget);
// 				var eOpex  = toCr(opEx.actual);
// 				var eCapex = toCr(capEx.actual);

// 				var row = { label: label, bOpex: bOpex, bCapex: bCapex, eOpex: eOpex, eCapex: eCapex };

// 				if (isCovid) {
// 					cov.bOpex  += bOpex;  cov.bCapex += bCapex;
// 					cov.eOpex  += eOpex;  cov.eCapex += eCapex;
// 					covidRows.push(row);
// 				} else {
// 					sub.bOpex  += bOpex;  sub.bCapex += bCapex;
// 					sub.eOpex  += eOpex;  sub.eCapex += eCapex;
// 					normalRows.push(row);
// 				}
// 			});

// 			var grand = {
// 				bOpex : sub.bOpex  + cov.bOpex,
// 				bCapex: sub.bCapex + cov.bCapex,
// 				eOpex : sub.eOpex  + cov.eOpex,
// 				eCapex: sub.eCapex + cov.eCapex
// 			};

// 			// ── assemble final row list ──────────────────────────────────────
// 			var rows = [];

// 			// 1. Normal rows in API order
// 			normalRows.forEach(function (r) { rows.push(r); });

// 			// 2. Sub Total (always shown, even if no COVID rows)
// 			rows.push({ isSubTotal: true, label: 'Total',
// 				bOpex: sub.bOpex, bCapex: sub.bCapex,
// 				eOpex: sub.eOpex, eCapex: sub.eCapex });

// 			// 3. COVID rows (if any)
// 			covidRows.forEach(function (r) { rows.push(r); });

// 			// 4. Grand Total (only shown when there are COVID rows, otherwise Sub Total IS the total)
// 			if (covidRows.length) {
// 				rows.push({ isGrand: true, label: 'Total',
// 					bOpex: grand.bOpex, bCapex: grand.bCapex,
// 					eOpex: grand.eOpex, eCapex: grand.eCapex });
// 			}

// 			return rows;
// 		}

// 		// Parse "2025-26 BUDGET VS. 2024-25 EST" from the API title string
// 		function parseHeadersFromTitle(title) {
// 			var budgetLabel = 'Budget', estLabel = 'Estimate';
// 			if (!title) { return { budgetLabel: budgetLabel, estLabel: estLabel }; }
// 			var m = title.match(/(\d{4}-\d{2})\s+BUDGET\s+VS\.\s+(\d{4}-\d{2})\s+EST/i);
// 			if (m) { budgetLabel = m[1] + ' Budget'; estLabel = m[2] + ' Estimate'; }
// 			return { budgetLabel: budgetLabel, estLabel: estLabel };
// 		}

// 		function renderTable(rows, apiTitle, tbodyId, titleId, budgetHdrId, estHdrId, tableId) {
// 			// Convert ALL-CAPS API title to readable form
// 			var displayTitle = (apiTitle || '')
// 				.replace(/^OVERALL FOUNDATION NUMBERS\s*-\s*/i, 'Overall Foundation - ')
// 				.replace(/\bBUDGET\b/g, 'Budget')
// 				.replace(/\bVS\.\b/g,   'vs.')
// 				.replace(/\bEST\b/g,    'Estimate');
// 			$('#' + titleId).text(displayTitle);

// 			var hdrs = parseHeadersFromTitle(apiTitle);
// 			$('#' + budgetHdrId).text(hdrs.budgetLabel);
// 			$('#' + estHdrId).text(hdrs.estLabel);

// 			var $tb = $('#' + tbodyId).empty();

// 			rows.forEach(function (row) {
// 				var cls = (row.isSubTotal || row.isGrand) ? 'ppt-total-row' : '';
// 				var bO  = row.bOpex, bC = row.bCapex, eO = row.eOpex, eC = row.eCapex;

// 				$tb.append(
// 					'<tr class="' + cls + '">' +
// 						'<td>' + row.label    + '</td>' +
// 						'<td>' + fmt(bO)      + '</td>' +
// 						'<td>' + fmt(bC)      + '</td>' +
// 						'<td>' + fmt(bO + bC) + '</td>' +
// 						'<td>' + fmt(eO)      + '</td>' +
// 						'<td>' + fmt(eC)      + '</td>' +
// 						'<td>' + fmt(eO + eC) + '</td>' +
// 					'</tr>'
// 				);
// 			});

// 			fixStickySubHeader('#' + tableId);
// 		}

// 		function fetchAndRender(fy) {
// 			$('#ppt-tbody,#ppt-prev-tbody').html(
// 				'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading…</td></tr>'
// 			);
// 			Loader.show('Building your foundation metrics to present insights clearly');

// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.add_expense_totals',
// 				args  : {
// 					financial_year          : fy,
// 					month                   : 'March',
// 					set_group_id            : '4,5',
// 					previous_financial_year : getPrevFY(fy)
// 				},
// 				callback: function (r) {
// 					Loader.hide();

// 					// API returns either r.message (array) or r.message.message (array)
// 					var msg = null;
// 					if (r.message && Array.isArray(r.message)) {
// 						msg = r.message;
// 					} else if (r.message && r.message.message && Array.isArray(r.message.message)) {
// 						msg = r.message.message;
// 					}

// 					if (!msg || !msg.length) {
// 						$('#ppt-tbody,#ppt-prev-tbody').html(
// 							'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>'
// 						);
// 						return;
// 					}
// 					var first  = msg[0] || {};
// 					var ofnArr = first.overall_foundation_numbers || [];
// 					var title0 = (ofnArr[0] || {}).title || '';
// 					var title1 = (ofnArr[1] || {}).title || '';

// 					var rows0 = transformResponse(msg, 0);
// 					var rows1 = transformResponse(msg, 1);

// 					renderTable(rows0, title0, 'ppt-tbody',      'ppt-main-title', 'ppt-budget-hdr',      'ppt-est-hdr',      'ppt-table');
// 					renderTable(rows1, title1, 'ppt-prev-tbody', 'ppt-prev-title', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr', 'ppt-prev-table');

// 					function toExportRows(rows) {
// 						return rows.map(function (row) {
// 							return {
// 								label   : row.label,
// 								bOpex   : row.bOpex,
// 								bCapex  : row.bCapex,
// 								eOpex   : row.eOpex,
// 								eCapex  : row.eCapex,
// 								is_total: (row.isSubTotal === true || row.isGrand === true)
// 							};
// 						});
// 					}

// 					Store.ppt.rows            = toExportRows(rows0);
// 					Store.ppt.prevRows        = toExportRows(rows1);
// 					Store.ppt.budgetLabel     = $('#ppt-budget-hdr').text();
// 					Store.ppt.estLabel        = $('#ppt-est-hdr').text();
// 					Store.ppt.prevBudgetLabel = $('#ppt-prev-budget-hdr').text();
// 					Store.ppt.prevEstLabel    = $('#ppt-prev-est-hdr').text();
// 				},
// 				error: function () {
// 					Loader.hide();
// 					$('#ppt-tbody,#ppt-prev-tbody').html(
// 						'<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>'
// 					);
// 				}
// 			});
// 		}

// 		function load(fy) { currentFY = fy || '2025-26'; fetchAndRender(currentFY); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ANNUAL BUDGET MODULE
// 	// =============================================================================

// 	var Annual = (function () {

// 		var Q_DEFS = {
// 			q1: { label: 'Quarter 1', months: ['April','May','June'] },
// 			q2: { label: 'Quarter 2', months: ['July','August','September'] },
// 			q3: { label: 'Quarter 3', months: ['October','November','December'] },
// 			q4: { label: 'Quarter 4', months: ['January','February','March'] }
// 		};
// 		var Q_KEYS = ['q1','q2','q3','q4'];
// 		var data=[], expandedQ=[], openH={}, openS={}, bound=false;

// 		function sumArr(a) { var t=0; (a||[]).forEach(function(v){t+=(v||0);}); return t; }
// 		function objTotal(o) { var t=0; Q_KEYS.forEach(function(k){t+=sumArr(o[k]);}); return t; }

// 		function qCells(obj) {
// 			var html = '';
// 			Q_KEYS.forEach(function (k) {
// 				var vals = obj[k]||[0,0,0];
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
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense Head / Line Item</th>');
// 			Q_KEYS.forEach(function (k) {
// 				var o = expandedQ.indexOf(k) !== -1;
// 				$m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o?1:2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o?'▲':'▼') + '</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s = $('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function (k) {
// 					if (expandedQ.indexOf(k) !== -1) {
// 						Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); });
// 					}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#annual-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb  = $('#annual-table tbody').empty();
// 			var term = $('#annual-search').val().trim().toLowerCase();
// 			var grand = { q1:[0,0,0], q2:[0,0,0], q3:[0,0,0], q4:[0,0,0] };
// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				var hs = String(hi), ho = openH[hs] === true;
// 				Q_KEYS.forEach(function (k) { (head[k]||[0,0,0]).forEach(function(v,mi){grand[k][mi]+=(v||0);}); });
// 				$tb.append(
// 					'<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '">' +
// 						'<td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name.trim() + '</td>' +
// 						qCells(head) + '<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td>' +
// 					'</tr>'
// 				);
// 				(head.sub_heads||[]).forEach(function (sub, si) {
// 					var sk = hs+'-'+si, so = openS[sk]===true;
// 					$tb.append(
// 						'<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:22px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td>' +
// 							qCells(sub) + '<td>' + formatINR(objTotal(sub)) + '</td>' +
// 						'</tr>'
// 					);
// 					(sub.items||[]).forEach(function (item) {
// 						$tb.append(
// 							'<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho&&so)?'':'display:none;') + '">' +
// 								'<td style="padding-left:42px;">' + item.name + '</td>' +
// 								qCells(item) + '<td>' + formatINR(objTotal(item)) + '</td>' +
// 							'</tr>'
// 						);
// 					});
// 				});
// 				(head.items||[]).forEach(function (d) {
// 					$tb.append(
// 						'<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:35px;">' + d.name + '</td>' +
// 							qCells(d) + '<td>' + formatINR(objTotal(d)) + '</td>' +
// 						'</tr>'
// 					);
// 				});
// 			});
// 			var gt=0; Q_KEYS.forEach(function(k){gt+=sumArr(grand[k]);});
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			openH[hs] = !(openH[hs]===true);
// 			if (!openH[hs]) {
// 				data.forEach(function(h,hi){ if(String(hi)!==hs){return;} (h.sub_heads||[]).forEach(function(_,si){openS[hs+'-'+si]=false;}); });
// 			}
// 			renderTable();
// 		}
// 		function toggleSub(hs,ss) { openS[hs+'-'+ss]=!(openS[hs+'-'+ss]===true); renderTable(); }

// 		function matchSearch(head, term) {
// 			if (!term) { return true; }
// 			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
// 			for (var s=0; s<(head.sub_heads||[]).length; s++) {
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; }
// 				for (var i=0; i<(head.sub_heads[s].items||[]).length; i++) {
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 				}
// 			}
// 			for (var d=0; d<(head.items||[]).length; d++) {
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 			}
// 			return false;
// 		}

// 		function bindEvents() {
// 			$(document).on('input.annual', '#annual-search', function () { renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-quarters', function () {
// 				expandedQ = this.checked ? Q_KEYS.slice() : [];
// 				renderTable();
// 			});
// 			$(document).on('change.annual', '#annual-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function(h,hi){ openH[String(hi)]=true; (h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;}); });
// 				} else { openH={}; openS={}; }
// 				renderTable();
// 			});
// 			$(document).on('click.annual', '#annual-table .cb-q-header', function () {
// 				var k=String($(this).attr('data-quarter')), idx=expandedQ.indexOf(k);
// 				if (idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#annual-expand-quarters').prop('checked', expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 		}

// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			$('#annual-search').val('');
// 			Loader.show('We\u2019re stitching together your annual budget story');
// 			frappe.call({
// 				method  : 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args    : { financial_year: fy },
// 				callback: function (r) {
// 					data = r.message || [];
// 					Store.annual = data;
// 					renderTable();
// 					Loader.hide();
// 				},
// 				error: function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}

// 		function load(fy) { if (!bound) { bindEvents(); bound=true; } fetchAndRender(fy); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE
// 	// =============================================================================

// 	var Estimate = (function () {

// 		var Q_DEFS = {
// 			q1: { label:'Quarter 1', months:['April','May','June'] },
// 			q2: { label:'Quarter 2', months:['July','August','September'] },
// 			q3: { label:'Quarter 3', months:['October','November','December'] },
// 			q4: { label:'Quarter 4', months:['January','February','March'] }
// 		};
// 		var Q_KEYS=['q1','q2','q3','q4'];
// 		var Q_IDX={q1:[0,1,2],q2:[3,4,5],q3:[6,7,8],q4:[9,10,11]};
// 		var data=[],expandedQ=[],openH={},openS={},bound=false;

// 		function getMth(obj) {
// 			var m=obj.months||{};
// 			return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),
// 			        parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),
// 			        parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),
// 			        parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)];
// 		}
// 		function qTot(obj){return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)];}
// 		function yTot(obj){var q=qTot(obj);return q[0]+q[1]+q[2]+q[3];}

// 		function qCells(obj) {
// 			var mths=getMth(obj),qtots=qTot(obj),html='';
// 			Q_KEYS.forEach(function(q,qi){
// 				if (expandedQ.indexOf(q)!==-1) {
// 					Q_IDX[q].forEach(function(mi){html+='<td>'+formatINR(mths[mi])+'</td>';});
// 				} else {
// 					html+='<td colspan="3">'+formatINR(qtots[qi])+'</td>';
// 				}
// 			});
// 			return html;
// 		}

// 		function buildHeader() {
// 			var $t=$('#estimate-table thead').empty();
// 			var $m=$('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense</th>');
// 			Q_KEYS.forEach(function(k){
// 				var o=expandedQ.indexOf(k)!==-1;
// 				$m.append('<th class="est-q-toggle" data-q="'+k+'" colspan="3" rowspan="'+(o?1:2)+'" style="cursor:pointer;">'+Q_DEFS[k].label+' '+(o?'▲':'▼')+'</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s=$('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function(k){
// 					if (expandedQ.indexOf(k)!==-1){Q_DEFS[k].months.forEach(function(m){$s.append('<th>'+m+'</th>');});}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#estimate-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#estimate-tbody').empty();
// 			var term=$('#estimate-search').val().trim().toLowerCase();
// 			if (!Array.isArray(data)||!data.length) {
// 				$tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			var gM=[0,0,0,0,0,0,0,0,0,0,0,0],gQ=[0,0,0,0];
// 			data.forEach(function(head,hi){
// 				if (term&&!matchSearch(head,term)){return;}
// 				getMth(head).forEach(function(v,i){gM[i]+=v;});
// 				qTot(head).forEach(function(v,i){gQ[i]+=v;});
// 				var hs=String(hi),ho=openH[hs];
// 				$tb.append(
// 					'<tr class="cb-row-head cb-est-head" data-hi="'+hs+'">' +
// 						'<td><span class="cb-arrow">'+(ho?'▼':'▶')+'</span> '+head.name+'</td>' +
// 						qCells(head)+'<td class="cb-text-accent">'+formatINR(yTot(head))+'</td>' +
// 					'</tr>'
// 				);
// 				(head.items||[]).forEach(function(item){
// 					$tb.append('<tr class="cb-est-head-item" data-hi="'+hs+'" style="'+(ho?'':'display:none;')+'">' +
// 						'<td style="padding-left:28px;">'+item.name+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
// 				});
// 				(head.sub_heads||[]).forEach(function(sub,si){
// 					var sk=hs+'-'+si,so=openS[sk];
// 					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="'+hs+'" data-si="'+si+'" style="'+(ho?'':'display:none;')+'">' +
// 						'<td style="padding-left:20px;"><span class="cb-arrow">'+(so?'▼':'▶')+'</span> '+sub.name+'</td>'+qCells(sub)+'<td>'+formatINR(yTot(sub))+'</td></tr>');
// 					(sub.items||[]).forEach(function(item){
// 						$tb.append('<tr class="cb-est-sub-item" data-hi="'+hs+'" data-si="'+si+'" style="'+((ho&&so)?'':'display:none;')+'">' +
// 							'<td style="padding-left:44px;">'+item.name+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
// 					});
// 				});
// 			});
// 			var gO={Q1:gQ[0],Q2:gQ[1],Q3:gQ[2],Q4:gQ[3],months:{'4':gM[0],'5':gM[1],'6':gM[2],'7':gM[3],'8':gM[4],'9':gM[5],'10':gM[6],'11':gM[7],'12':gM[8],'1':gM[9],'2':gM[10],'3':gM[11]}};
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>'+qCells(gO)+'<td>'+formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3])+'</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			var o=!openH[hs]; openH[hs]=o;
// 			$('#estimate-table tbody .cb-est-head[data-hi="'+hs+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			if (o) {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-head-item[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){
// 					var si=$(this).attr('data-si');
// 					if (openS[hs+'-'+si]){$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+si+'"]').show();}
// 				});
// 			} else {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){var si=$(this).attr('data-si');openS[hs+'-'+si]=false;$(this).find('.cb-arrow').text('▶');});
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"],.cb-est-sub-item[data-hi="'+hs+'"],.cb-est-head-item[data-hi="'+hs+'"]').hide();
// 			}
// 		}
// 		function toggleSub(hs,ss) {
// 			var sk=hs+'-'+ss,o=!openS[sk]; openS[sk]=o;
// 			$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"][data-si="'+ss+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $i=$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+ss+'"]');
// 			o?$i.show():$i.hide();
// 		}
// 		function matchSearch(head,term) {
// 			if (!term){return true;}
// 			if (head.name.toLowerCase().indexOf(term)!==-1){return true;}
// 			for (var s=0;s<(head.sub_heads||[]).length;s++){
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term)!==-1){return true;}
// 				for (var i=0;i<(head.sub_heads[s].items||[]).length;i++){
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 				}
// 			}
// 			for (var d=0;d<(head.items||[]).length;d++){
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 			}
// 			return false;
// 		}
// 		function bindEvents() {
// 			$(document).on('click.estimate','#estimate-table .est-q-toggle',function(){
// 				var k=String($(this).attr('data-q')),idx=expandedQ.indexOf(k);
// 				if(idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#estimate-expand-quarters').prop('checked',expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$(document).on('change.estimate','#estimate-expand-quarters',function(){expandedQ=this.checked?Q_KEYS.slice():[];renderTable();});
// 			$(document).on('change.estimate','#estimate-expand-items',function(){
// 				if(this.checked){data.forEach(function(h,hi){openH[String(hi)]=true;(h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;});});}
// 				else{openH={};openS={};}
// 				renderTable();
// 			});
// 			$('#tab-estimate').on('click.estimate','.cb-est-head',function(e){e.stopPropagation();toggleHead(String($(this).attr('data-hi')));});
// 			$('#tab-estimate').on('click.estimate','.cb-est-sub', function(e){e.stopPropagation();toggleSub(String($(this).attr('data-hi')),String($(this).attr('data-si')));});
// 			$(document).on('input.estimate','#estimate-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked',false);
// 			var year=(getPrevFY(fy)||'2025-26').split('-')[0];
// 			Loader.show('We\u2019re shaping your projections into a smart view');
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
// 				args    : { fiscal_year: year, accounting_period: '12' },
// 				callback: function(r){
// 					if (r.message) {
// 						if (r.message.status === 'success')                       { data = r.message.data || []; }
// 						else if (Array.isArray(r.message))                        { data = r.message; }
// 						else if (r.message.data && Array.isArray(r.message.data)) { data = r.message.data; }
// 						else { frappe.msgprint('Failed to load Estimate data.'); }
// 					} else { frappe.msgprint('Failed to load Estimate data.'); }
// 					Store.estimate = data;
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// BUDGET & ESTIMATE MODULE
// 	// =============================================================================

// 	var BudgetEstimate = (function () {

// 		var rawData=[], currentFY='', openSec={}, openSub={}, expandItems=false, bound=false;

// 		function pl(){return getFYLabels(currentFY).plan;}
// 		function el(){return getFYLabels(currentFY).est;}
// 		function entityLabel(e){return (e.label||'').trim();}

// 		function buildStruct() {
// 			if (!rawData.length){return [];}
// 			return (rawData[0].actuals||[]).map(function(sec){
// 				return {
// 					name     : sec.name,
// 					sub_heads: (sec.sub_heads||[]).map(function(sub){
// 						return {name:sub.name, items:(sub.items||[]).map(function(i){return {name:i.name};})};
// 					}),
// 					items: (sec.items||[]).map(function(i){return {name:i.name};})
// 				};
// 			});
// 		}

// 		function itemVal(entry,name,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				(sec.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});
// 				(sec.sub_heads||[]).forEach(function(sub){(sub.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});});
// 			});
// 			return v;
// 		}
// 		function subVal(entry,sn,subn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				(sec.sub_heads||[]).forEach(function(sub){
// 					if(sub.name!==subn){return;}
// 					v+=parseFloat(field==='plan'?(sub.ytd||0):(sub.total_posted_amt_ytd||0));
// 				});
// 			});
// 			return v;
// 		}
// 		function secVal(entry,sn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));
// 			});
// 			return v;
// 		}
// 		function grandVal(entry,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));});
// 			return v;
// 		}
// 		function itemCells(name){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(itemVal(e,name,'ytd'))+'</td><td>'+formatINR(itemVal(e,name,'total_posted_amt'))+'</td>';});return h;}
// 		function subCells(sn,subn){var h='';rawData.forEach(function(e){h+='<td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'plan'))+'</td><td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'est'))+'</td>';});return h;}
// 		function secCells(sn){var h='';rawData.forEach(function(e){h+='<td style="font-weight:700;">'+formatINR(secVal(e,sn,'plan'))+'</td><td style="font-weight:700;">'+formatINR(secVal(e,sn,'est'))+'</td>';});return h;}
// 		function grandCells(){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(grandVal(e,'plan'))+'</td><td>'+formatINR(grandVal(e,'est'))+'</td>';});return h;}
// 		function iTotP(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'ytd');});return v;}
// 		function iTotE(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'total_posted_amt');});return v;}
// 		function sTotP(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'plan');});return v;}
// 		function sTotE(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'est');});return v;}
// 		function secTP(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'plan');});return v;}
// 		function secTE(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'est');});return v;}
// 		function allGP(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'plan');});return v;}
// 		function allGE(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'est');});return v;}

// 		function tc2(plan,est,cls){
// 			cls=cls||'';
// 			return '<td class="be-total-plan '+cls+'" style="font-weight:700;">'+formatINR(plan)+'</td>' +
// 			       '<td class="be-total-est  '+cls+'" style="font-weight:700;">'+formatINR(est)+'</td>';
// 		}

// 		function buildHeader() {
// 			var $t=$('#be-table thead').empty();
// 			var $r1=$('<tr class="cb-thead-main"></tr>');
// 			var $r2=$('<tr class="cb-thead-sub"></tr>');
// 			$r1.append('<th rowspan="2" style="text-align:left !important;min-width:280px;width:280px;position:sticky;left:0;z-index:50;background:#0076B6;vertical-align:middle;">Expense Head / Line Item</th>');
// 			rawData.forEach(function(e){
// 				$r1.append('<th colspan="2" style="text-align:center;min-width:260px;">'+entityLabel(e)+'</th>');
// 			});
// 			$r1.append('<th colspan="2" style="text-align:center;min-width:260px;background:#003B63;">Grand Total</th>');
// 			rawData.forEach(function(){
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+pl()+'</th>');
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+el()+'</th>');
// 			});
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+pl()+'</th>');
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+el()+'</th>');
// 			$t.append($r1).append($r2);
// 			fixStickySubHeader('#be-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#be-tbody').empty();
// 			var term=$('#be-search').val().trim().toLowerCase();
// 			var struct=buildStruct();
// 			var cols=1+rawData.length*2+2;
// 			if (!rawData.length||!struct.length) {
// 				$tb.append('<tr><td colspan="'+cols+'" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			struct.forEach(function(sec){
// 				var sn=sec.name, secOpen=openSec[sn]!==false, secVis=secOpen?'':'display:none;';
// 				$tb.append('<tr class="cb-row-head be-sec-row" data-sec="'+sn+'">' +
// 					'<td style="text-align:left;"><span class="cb-arrow">'+(secOpen?'▼':'▶')+'</span> '+sn+'</td>' +
// 					secCells(sn)+tc2(secTP(sn),secTE(sn),'be-grand-col')+'</tr>');
// 				sec.sub_heads.forEach(function(sub){
// 					var sk=sn+'::'+sub.name, subOpen=expandItems||(openSub[sk]===true), itmVis=(secOpen&&subOpen)?'':'display:none;';
// 					$tb.append('<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="'+sn+'" data-sub="'+sk+'" style="'+secVis+'">' +
// 						'<td style="padding-left:22px;text-align:left;"><span class="cb-arrow">'+(subOpen?'▼':'▶')+'</span> '+sub.name+'</td>' +
// 						subCells(sn,sub.name)+tc2(sTotP(sn,sub.name),sTotE(sn,sub.name),'be-grand-col')+'</tr>');
// 					sub.items.forEach(function(item){
// 						if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 						$tb.append('<tr class="be-item-row be-sec-child be-sub-child" data-sec="'+sn+'" data-sub="'+sk+'" style="'+itmVis+'">' +
// 							'<td style="padding-left:42px;text-align:left;">'+item.name+'</td>' +
// 							itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col')+'</tr>');
// 					});
// 				});
// 				sec.items.forEach(function(item){
// 					if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 					$tb.append('<tr class="be-item-row be-sec-child be-direct-item" data-sec="'+sn+'" style="'+secVis+'">' +
// 						'<td style="padding-left:30px;text-align:left;">'+item.name+'</td>' +
// 						itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col')+'</tr>');
// 				});
// 			});
// 			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>'+grandCells()+tc2(allGP(),allGE(),'be-grand-col')+'</tr>');
// 		}

// 		function toggleSec(sn){
// 			var o=!(openSec[sn]!==false); openSec[sn]=o;
// 			$('#be-table tbody .be-sec-row[data-sec="'+sn+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $ch=$('#be-table tbody .be-sec-child[data-sec="'+sn+'"]');
// 			if(o){
// 				$ch.filter('.be-sub-row,.be-direct-item').show();
// 				$ch.filter('.be-sub-child').each(function(){var sk=$(this).attr('data-sub');if(expandItems||openSub[sk]===true){$(this).show();}});
// 			} else {$ch.hide();}
// 		}
// 		function toggleSubRow(sk){
// 			var o=!(openSub[sk]===true); openSub[sk]=o;
// 			$('#be-table tbody .be-sub-row[data-sub="'+sk+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $it=$('#be-table tbody .be-sub-child[data-sub="'+sk+'"]');
// 			o?$it.show():$it.hide();
// 		}
// 		function bindEvents(){
// 			$('#tab-budget_estimate').on('click.be','.be-sec-row',function(e){e.stopPropagation();toggleSec($(this).attr('data-sec'));});
// 			$('#tab-budget_estimate').on('click.be','.be-sub-row',function(e){e.stopPropagation();if(!expandItems){toggleSubRow($(this).attr('data-sub'));}});
// 			$(document).on('change.be','#be-expand-items',function(){
// 				expandItems=this.checked;
// 				buildStruct().forEach(function(sec){
// 					openSec[sec.name]=expandItems?true:false;
// 					sec.sub_heads.forEach(function(sub){openSub[sec.name+'::'+sub.name]=expandItems;});
// 				});
// 				renderTable();
// 			});
// 			$(document).on('input.be','#be-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy){
// 			currentFY=fy; rawData=[]; openSec={}; openSub={}; expandItems=false;
// 			$('#be-expand-items').prop('checked',false);
// 			Loader.show("We're balancing budget and estimate");
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.format_api',
// 				args    : { financial_year: fy, month: 'March', set_group_id: "2", previous_financial_year: getPrevFY(fy) },
// 				callback: function(r){
// 					if(r.message&&Array.isArray(r.message)){rawData=r.message;}
// 					else{frappe.msgprint('Failed to load Budget & Estimate data.');}
// 					Store.budgetEstimate = rawData;
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Budget & Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// EXPORT BUTTON WIRING
// 	// =============================================================================

// 	var API = 'annual_budget.api.export_reports';

// 	$(document).on('click', '#xl-ppt', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.ppt.rows.length) { frappe.msgprint('Please wait for the data to load first.'); return; }
// 		serverExport(API + '.export_ppt', {
// 			financial_year    : fy,
// 			ppt_rows          : JSON.stringify(Store.ppt.rows),
// 			prev_ppt_rows     : JSON.stringify(Store.ppt.prevRows),
// 			budget_label      : Store.ppt.budgetLabel,
// 			est_label         : Store.ppt.estLabel,
// 			prev_budget_label : Store.ppt.prevBudgetLabel,
// 			prev_est_label    : Store.ppt.prevEstLabel
// 		}, 'Building Foundation Metrics Excel…');
// 	});

// 	$(document).on('click', '#xl-annual', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.annual.length) { frappe.msgprint('Please load the Annual Budget tab first.'); return; }
// 		serverExport(API + '.export_annual', {
// 			financial_year: fy,
// 			annual_data   : JSON.stringify(Store.annual)
// 		}, 'Building Annual Budget Excel…');
// 	});

// 	$(document).on('click', '#xl-estimate', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.estimate.length) { frappe.msgprint('Please load the Estimate tab first.'); return; }
// 		serverExport(API + '.export_estimate', {
// 			financial_year: fy,
// 			estimate_data : JSON.stringify(Store.estimate)
// 		}, 'Building Estimate Excel…');
// 	});

// 	$(document).on('click', '#xl-be', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.budgetEstimate.length) { frappe.msgprint('Please load the Budget & Estimate tab first.'); return; }
// 		serverExport(API + '.export_budget_estimate', {
// 			financial_year: fy,
// 			be_data       : JSON.stringify(Store.budgetEstimate)
// 		}, 'Building Budget & Estimate Excel…');
// 	});

// 	$(document).on('click', '#xl-export-all', function () {
// 		var fy      = fyControl.get_value() || '2025-26';
// 		var missing = [];
// 		if (!Store.ppt.rows.length)       { missing.push('Foundation Metrics'); }
// 		if (!Store.annual.length)         { missing.push('Annual Budget'); }
// 		if (!Store.estimate.length)       { missing.push('Estimate'); }
// 		if (!Store.budgetEstimate.length) { missing.push('Budget & Estimate'); }
// 		if (missing.length) {
// 			frappe.msgprint('The following tabs have not been loaded yet:<br><b>' + missing.join(', ') + '</b><br>Please open each tab first, then click Export All.');
// 			return;
// 		}
// 		serverExport(API + '.export_all', {
// 			financial_year    : fy,
// 			ppt_rows          : JSON.stringify(Store.ppt.rows),
// 			prev_ppt_rows     : JSON.stringify(Store.ppt.prevRows),
// 			budget_label      : Store.ppt.budgetLabel,
// 			est_label         : Store.ppt.estLabel,
// 			prev_budget_label : Store.ppt.prevBudgetLabel,
// 			prev_est_label    : Store.ppt.prevEstLabel,
// 			annual_data       : JSON.stringify(Store.annual),
// 			estimate_data     : JSON.stringify(Store.estimate),
// 			be_data           : JSON.stringify(Store.budgetEstimate)
// 		}, 'Building full consolidated Excel…');
// 	});

// 	// =============================================================================
// 	// AUTO-LOAD ACTIVE TAB
// 	// =============================================================================

// 	var initialFY = fyControl.get_value();
// 	if (initialFY) { TabLoader.trigger('ppt'); }

// };


//improve one 
// frappe.pages['consolidated-budget'].on_page_load = function (wrapper) {

// 	// =============================================================================
// 	// PAGE SETUP
// 	// =============================================================================

// 	var page = frappe.ui.make_app_page({
// 		parent       : wrapper,
// 		title        : 'Foundation - Consolidated Budget',
// 		single_column: true
// 	});

// 	// ── "Export All" — single button injected once into .page-actions ──
// 	setTimeout(function () {
// 		$(wrapper).find('#xl-export-all').remove();
// 		var $exportAllBtn = $(
// 			'<button class="btn btn-default btn-sm" id="xl-export-all" style="display:inline-flex;align-items:center;gap:5px;margin-left:8px;background:#1a1a1a;color:#fff;border-color:#1a1a1a;">' +
// 				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 					'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 					'<polyline points="14 2 14 8 20 8"/>' +
// 					'<line x1="8" y1="13" x2="16" y2="13"/>' +
// 					'<line x1="8" y1="17" x2="16" y2="17"/>' +
// 					'<line x1="10" y1="9" x2="8" y2="9"/>' +
// 				'</svg>' +
// 				'Export All' +
// 			'</button>'
// 		);
// 		var $pa = $(wrapper).find('.page-actions');
// 		if ($pa.length) { $pa.prepend($exportAllBtn); }
// 	}, 300);

// 	function updatePageTitle(financialYear) {
// 		page.set_title('Foundation - Consolidated Budget - ' + financialYear);
// 		setTimeout(function () {
// 			$(wrapper).find('.page-head h3').hide();
// 			$(wrapper).find('.page-head .title-text')
// 				.css({ 'font-size': '20px', 'font-weight': '700', 'color': '#1a1a1a' });
// 		}, 100);
// 	}

// 	// =============================================================================
// 	// FY LABEL HELPERS
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var parts     = (fy || '2025-26').split('-');
// 		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
// 		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
// 		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
// 		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
// 		return {
// 			plan : 'FY' + startYY + '-' + endYY    + ' Plan',
// 			est  : 'FY' + prevStart + '-' + prevEnd + ' Estimate'
// 		};
// 	}

// 	function getPrevFY(fy) {
// 		var parts = (fy || '2025-26').split('-');
// 		var s = parseInt(parts[0] || '2025', 10) - 1;
// 		var e = parseInt(parts[1] || '26',   10) - 1;
// 		return s + '-' + String(e).padStart(2, '0');
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
// 			var m = (typeof msg === 'string' && msg.length) ? msg : 'Loading, please wait';
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
// 	// SHARED DATA STORE
// 	// =============================================================================

// 	var Store = {
// 		ppt           : { rows: [], prevRows: [], budgetLabel: '', estLabel: '', prevBudgetLabel: '', prevEstLabel: '' },
// 		annual        : [],
// 		estimate      : [],
// 		budgetEstimate: []
// 	};

// 	// =============================================================================
// 	// GLOBAL STYLES
// 	// =============================================================================

// 	$(page.body).append(
// 		'<style>' +
// 		':root{' +
// 			'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 			'--orange:#F26B21;--orange-light:#FFF3E6;' +
// 			'--border:#bbb;--border-light:#ddd;--border-header:#005f94;--border-orange:#d45a10;' +
// 		'}' +
// 		'.cb-wrapper{padding:15px;background:#fff;}' +

// 		/* Tab nav */
// 		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:9px 20px;color:#555;font-size:15px;font-weight:400;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:#003B63;font-weight:700;border-bottom:3px solid #003B63;}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +

// 		/* Filter row */
// 		'.cb-filter-row{padding:8px 0;background:#fff;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row{padding:8px;}.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +

// 		/* Controls bar */
// 		'.cb-controls{display:flex;align-items:center;padding:6px 10px;margin-bottom:10px;background:#f7f9fb;border:1px solid #e2e6ea;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
// 		'.cb-controls-left{display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap;}' +
// 		'.cb-controls-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}' +

// 		/* Search */
// 		'.cb-search-wrap{position:relative;display:flex;align-items:center;}' +
// 		'.cb-search-wrap .search-icon{position:absolute;left:8px;color:#8d99a6;pointer-events:none;}' +
// 		'.cb-search-input{padding:5px 8px 5px 28px;border:1px solid #d1d8dd;border-radius:4px;font-size:13px;color:#36414c;background:#fff;width:220px;height:30px;transition:border-color .15s,box-shadow .15s;}' +
// 		'.cb-search-input:focus{outline:none;border-color:#5e64ff;box-shadow:0 0 0 2px rgba(94,100,255,.15);}' +

// 		/* Checkboxes */
// 		'.cb-checkbox-area{display:flex;gap:12px;align-items:center;}' +
// 		'.cb-check-label{display:flex;align-items:center;gap:5px;font-size:13px;font-weight:500;color:#36414c;cursor:pointer;user-select:none;white-space:nowrap;}' +
// 		'.cb-check-label input[type=checkbox]{width:14px;height:14px;cursor:pointer;accent-color:#5e64ff;}' +

// 		/* Export button */
// 		'.cb-xl-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;height:30px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;border:1px solid #1a1a1a;border-radius:4px;background:#1a1a1a;color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.15);transition:background .15s,border-color .15s;}' +
// 		'.cb-xl-btn:hover{background:#333;border-color:#333;}' +
// 		'.cb-xl-btn svg{flex-shrink:0;color:#fff;}' +
// 		'#xl-export-all svg{vertical-align:middle;margin-right:3px;}' +

// 		/* Scroll wrapper */
// 		'.cb-scroll-wrapper{border:1px solid #d1d8dd;border-radius:6px;overflow:auto;max-height:72vh;background:#fff;}' +

// 		/* TABLE BASE */
// 		'.cb-table,.ppt-table-wrap{width:100%;border-collapse:collapse;font-size:15px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;table-layout:auto;}' +
// 		'.cb-table th,.cb-table td,.ppt-table-wrap th,.ppt-table-wrap td{border:1px solid #d1d8dd;padding:8px 12px;white-space:nowrap;text-align:right;}' +
// 		'.cb-table th:first-child,.cb-table td:first-child,.ppt-table-wrap th:first-child,.ppt-table-wrap td:first-child{text-align:left;}' +

// 		/* STICKY HEADERS */
// 		'.cb-thead-main th{background:#0076B6;color:#fff;font-weight:700;font-size:16px;text-align:center !important;position:sticky;top:0;z-index:25;border-color:#005f94;padding:10px 12px;}' +
// 		'.cb-thead-sub th{background:#F26B21;color:#fff;font-weight:600;font-size:15px;text-align:center !important;position:sticky;top:0;z-index:24;border-color:#c85810;min-width:110px;padding:8px 12px;}' +

// 		/* Row types */
// 		'.cb-row-head{font-weight:700;font-size:15px;cursor:pointer;background:#E9F4FB;color:#003B63;}' +
// 		'.cb-row-head:hover td{background:#d0e8f5;}' +
// 		'.cb-row-sub{background:#FFF3E6;font-weight:600;font-size:15px;cursor:pointer;}' +
// 		'.cb-row-sub:hover td{background:#ffe0c2;}' +
// 		'.cb-row-grand td{background:#0076B6 !important;color:#fff !important;font-weight:700;font-size:15px;border-color:#005f94 !important;}' +
// 		'.cb-text-accent{color:#0076B6;font-weight:600;}' +

// 		/* PPT tab */
// 		'#tab-ppt .ppt-table-wrap tbody tr td{font-size:16px;font-weight:400;}' +
// 		'#tab-ppt .ppt-table-wrap tbody tr.ppt-total-row td{font-size:16px;font-weight:700;background:#e8f0fa !important;color:#003B63 !important;border-color:#aaa !important;}' +

// 		/* PPT title */
// 		'.ppt-title-bar{margin:12px 0 4px;}' +
// 		'.ppt-main-title{font-size:15px;font-weight:700;text-transform:uppercase;text-decoration:underline;letter-spacing:.3px;color:#111;}' +
// 		'.ppt-currency-label{font-size:16px;font-style:italic;color:#555;text-align:right;margin-bottom:6px;}' +
// 		'.ppt-currency-label strong{font-weight:800;font-size:16px;font-style:normal;}' +

// 		/* PPT table */
// 		'.ppt-table-wrap thead tr.cb-thead-main th{border-color:#005f94;}' +
// 		'.ppt-table-wrap thead tr.cb-thead-sub th{border-color:#c85810;}' +
// 		'.ppt-table-wrap tbody tr td{background:#fff;color:#111;font-size:15px;}' +
// 		'.ppt-table-wrap tbody tr.ppt-total-row td{font-weight:700;font-size:15px;background:#e8f0fa !important;color:#003B63 !important;border-color:#aaa !important;}' +
// 		'.ppt-dash{color:#bbb;text-align:center;display:block;}' +

// 		/* BUDGET & ESTIMATE — sticky first column */
// 		'#be-table{border-collapse:collapse;}' +
// 		'#be-table tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:280px;max-width:280px;white-space:normal;word-break:break-word;}' +
// 		'#be-table tbody tr td:first-child{background:#fff;}' +
// 		'#be-table .cb-row-head td:first-child{background:#E9F4FB !important;}' +
// 		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6 !important;}' +
// 		'#be-table .cb-row-grand td:first-child{background:#0076B6 !important;}' +
// 		'#be-table thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:#0076B6;text-align:left !important;min-width:280px;}' +
// 		'#be-table .be-grand-col{background:#ddeaf7 !important;color:#003B63;border-left:2px solid #0076B6 !important;}' +
// 		'#be-table .cb-row-grand .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-head .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-sub  .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +
// 		'#be-table .cb-thead-main th:not(:first-child){min-width:260px;text-align:center !important;}' +
// 		'#be-table .cb-thead-sub th{min-width:130px;text-align:center !important;}' +
// 		'#be-table tbody td:first-child,#be-table thead th:first-child{box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +

// 		/* Headcount KPI cards */
// 		'.hc-kpi-card{background:#f0f6fb;border:1px solid #cde0f0;border-radius:8px;padding:14px 20px;min-width:180px;flex:1;}' +
// 		'.hc-kpi-label{font-size:12px;color:#555;font-weight:500;margin-bottom:4px;}' +
// 		'.hc-kpi-value{font-size:22px;font-weight:700;color:#003B63;}' +
// 		'.hc-section-title{margin:22px 0 6px;font-size:14px;font-weight:700;color:#003B63;text-transform:uppercase;letter-spacing:.4px;border-left:4px solid #0076B6;padding-left:10px;}' +

// 		/* Loader */
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
// 	// HELPERS
// 	// =============================================================================

// 	function formatINR(v) {
// 		var n = Math.round(parseFloat(v) || 0);
// 		var neg = n < 0;
// 		var s   = String(Math.abs(n));
// 		if (s.length > 3) {
// 			var last3 = s.slice(-3);
// 			var rest  = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
// 			s = rest + ',' + last3;
// 		}
// 		return (neg ? '-' : '') + s;
// 	}

// 	function fixStickySubHeader(tableSelector) {
// 		setTimeout(function () {
// 			var $table = $(tableSelector);
// 			if (!$table.length) { return; }
// 			var $mainRow = $table.find('thead tr.cb-thead-main');
// 			var $subRow  = $table.find('thead tr.cb-thead-sub');
// 			if (!$mainRow.length || !$subRow.length) { return; }
// 			var h = $mainRow[0].getBoundingClientRect().height || $mainRow.outerHeight(true) || 0;
// 			if (h > 0) { $subRow.find('th').css('top', h + 'px'); }
// 		}, 50);
// 	}

// 	function xlBtn(id, label) {
// 		return (
// 			'<button class="cb-xl-btn" id="' + id + '">' +
// 				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 					'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 					'<polyline points="14 2 14 8 20 8"/>' +
// 					'<line x1="8" y1="13" x2="16" y2="13"/>' +
// 					'<line x1="8" y1="17" x2="16" y2="17"/>' +
// 					'<line x1="10" y1="9" x2="8" y2="9"/>' +
// 				'</svg>' +
// 				label +
// 			'</button>'
// 		);
// 	}

// 	function controlsBar(searchId, searchPlaceholder, checks, exportId) {
// 		var checkHtml = checks.map(function (c) {
// 			return (
// 				'<label class="cb-check-label">' +
// 					'<input type="checkbox" id="' + c.id + '"> ' + c.label +
// 				'</label>'
// 			);
// 		}).join('');
// 		return (
// 			'<div class="cb-controls">' +
// 				'<div class="cb-controls-left">' +
// 					'<div class="cb-search-wrap">' +
// 						'<svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
// 						'<input type="text" id="' + searchId + '" class="cb-search-input" placeholder="' + searchPlaceholder + '">' +
// 					'</div>' +
// 					'<div class="cb-checkbox-area">' + checkHtml + '</div>' +
// 				'</div>' +
// 				'<div class="cb-controls-right">' + xlBtn(exportId, 'Export to Excel') + '</div>' +
// 			'</div>'
// 		);
// 	}

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================

// 	$(page.body).append(
// 		'<div class="cb-wrapper">' +

// 			'<div class="frappe-control-group row cb-filter-row" id="cb-filter-row"></div>' +

// 			'<ul id="cb-tab-nav">' +
// 				'<li><a class="cb-tab-link active" data-tab="ppt">Foundation level/Overall metrics</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="summary_inr">Unit wise</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="headcount">Headcount</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="estimate">Estimate Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="budget_estimate">Budget &amp; Estimate</a></li>' +
// 			'</ul>' +

// 			'<div id="cb-tab-content">' +

// 				/* ── PPT TAB ── */
// 				'<div class="cb-tab-pane active" id="tab-ppt">' +
// 					'<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">' +
// 						xlBtn('xl-ppt', 'Export to Excel') +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-main-title">Overall Foundation - Budget vs. Estimate</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 						'<table id="ppt-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-prev-title">Overall Foundation - Previous Year Budget vs. Estimate</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table id="ppt-prev-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-prev-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-prev-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-prev-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 				'</div>' +

// 				'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
// 				'<div class="cb-tab-pane" id="tab-headcount"></div>' +

// 				/* ── ANNUAL BUDGET TAB ── */
// 				'<div class="cb-tab-pane" id="tab-annual_budget">' +
// 					controlsBar(
// 						'annual-search', 'Search expense / item…',
// 						[
// 							{ id: 'annual-expand-quarters', label: 'Expand Quarters' },
// 							{ id: 'annual-expand-items',   label: 'Expand Line Items' }
// 						],
// 						'xl-annual'
// 					) +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* ── ESTIMATE TAB ── */
// 				'<div class="cb-tab-pane" id="tab-estimate">' +
// 					controlsBar(
// 						'estimate-search', 'Search expense / item…',
// 						[
// 							{ id: 'estimate-expand-quarters', label: 'Expand Quarters' },
// 							{ id: 'estimate-expand-items',    label: 'Expand Line Items' }
// 						],
// 						'xl-estimate'
// 					) +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* ── BUDGET & ESTIMATE TAB ── */
// 				'<div class="cb-tab-pane" id="tab-budget_estimate">' +
// 					controlsBar(
// 						'be-search', 'Search expense / item…',
// 						[
// 							{ id: 'be-expand-items', label: 'Expand Line Items' }
// 						],
// 						'xl-be'
// 					) +
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
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (r.message && r.message.length) {
// 				var years = r.message.map(function (d) { return d.financial_year; });
// 				fyControl.df.options = years.join('\n');
// 				fyControl.refresh();
// 				var today     = new Date();
// 				var year      = today.getFullYear();
// 				var month     = today.getMonth() + 1;
// 				var currentFY = (month >= 4)
// 					? year + '-' + String(year + 1).slice(-2)
// 					: (year - 1) + '-' + String(year).slice(-2);
// 				var target = years.indexOf(currentFY) !== -1 ? currentFY : years[0];
// 				fyControl.set_value(target);
// 				updatePageTitle(target);
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
// 			ppt            : function (fy) { PPT.load(fy);            },
// 			headcount      : function (fy) { Headcount.load(fy);      },
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
// 	// SERVER-SIDE EXCEL DOWNLOAD HELPER
// 	// =============================================================================

// 	function downloadFromB64(b64, filename) {
// 		var binary = atob(b64);
// 		var bytes  = new Uint8Array(binary.length);
// 		for (var i = 0; i < binary.length; i++) { bytes[i] = binary.charCodeAt(i); }
// 		var blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
// 		var url  = URL.createObjectURL(blob);
// 		var a    = document.createElement('a');
// 		a.href = url; a.download = filename;
// 		document.body.appendChild(a);
// 		a.click();
// 		setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
// 	}

// 	function serverExport(method, args, loadingMsg) {
// 		Loader.show(loadingMsg || 'Preparing your Excel file');
// 		frappe.call({
// 			method  : method,
// 			args    : args,
// 			callback: function (r) {
// 				Loader.hide();
// 				if (r.message && r.message.data) {
// 					downloadFromB64(r.message.data, r.message.filename);
// 				} else {
// 					frappe.msgprint('Export failed — no data returned from server.');
// 				}
// 			},
// 			error: function () {
// 				Loader.hide();
// 				frappe.msgprint('Server error during export. Please try again.');
// 			}
// 		});
// 	}

// 	// =============================================================================
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {

// 		var currentFY = '';

// 		function toCr(v) { return (parseFloat(v) || 0) / 10000000; }

// 		function fmt(v) {
// 			var n = parseFloat(v) || 0;
// 			if (n === 0) { return '<span class="ppt-dash">-</span>'; }
// 			var neg = n < 0;
// 			var abs = Math.abs(n).toFixed(2);
// 			var pts = abs.split('.');
// 			var ip  = pts[0], dp = pts[1];
// 			if (ip.length > 3) {
// 				var l3 = ip.slice(-3);
// 				var rs = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
// 				ip = rs + ',' + l3;
// 			}
// 			return (neg ? '-' : '') + ip + '.' + dp;
// 		}

// 		function transformResponse(message, idx) {
// 			var normalRows = [];
// 			var covidRows  = [];
// 			var sub   = { bOpex: 0, bCapex: 0, eOpex: 0, eCapex: 0 };
// 			var cov   = { bOpex: 0, bCapex: 0, eOpex: 0, eCapex: 0 };

// 			(message || []).forEach(function (entity) {
// 				var label   = (entity.label || '').trim();
// 				var isCovid = label.toLowerCase().indexOf('covid') !== -1;

// 				var ofn    = (entity.overall_foundation_numbers || [])[idx] || {};
// 				var capEx  = ofn.capital_expenses   || {};
// 				var opEx   = ofn.operating_expenses || {};

// 				var bOpex  = toCr(opEx.budget);
// 				var bCapex = toCr(capEx.budget);
// 				var eOpex  = toCr(opEx.actual);
// 				var eCapex = toCr(capEx.actual);

// 				var row = { label: label, bOpex: bOpex, bCapex: bCapex, eOpex: eOpex, eCapex: eCapex };

// 				if (isCovid) {
// 					cov.bOpex  += bOpex;  cov.bCapex += bCapex;
// 					cov.eOpex  += eOpex;  cov.eCapex += eCapex;
// 					covidRows.push(row);
// 				} else {
// 					sub.bOpex  += bOpex;  sub.bCapex += bCapex;
// 					sub.eOpex  += eOpex;  sub.eCapex += eCapex;
// 					normalRows.push(row);
// 				}
// 			});

// 			var grand = {
// 				bOpex : sub.bOpex  + cov.bOpex,
// 				bCapex: sub.bCapex + cov.bCapex,
// 				eOpex : sub.eOpex  + cov.eOpex,
// 				eCapex: sub.eCapex + cov.eCapex
// 			};

// 			var rows = [];
// 			normalRows.forEach(function (r) { rows.push(r); });
// 			rows.push({ isSubTotal: true, label: 'Total',
// 				bOpex: sub.bOpex, bCapex: sub.bCapex,
// 				eOpex: sub.eOpex, eCapex: sub.eCapex });
// 			covidRows.forEach(function (r) { rows.push(r); });
// 			if (covidRows.length) {
// 				rows.push({ isGrand: true, label: 'Total',
// 					bOpex: grand.bOpex, bCapex: grand.bCapex,
// 					eOpex: grand.eOpex, eCapex: grand.eCapex });
// 			}
// 			return rows;
// 		}

// 		function parseHeadersFromTitle(title) {
// 			var budgetLabel = 'Budget', estLabel = 'Estimate';
// 			if (!title) { return { budgetLabel: budgetLabel, estLabel: estLabel }; }
// 			var m = title.match(/(\d{4}-\d{2})\s+BUDGET\s+VS\.\s+(\d{4}-\d{2})\s+EST/i);
// 			if (m) { budgetLabel = m[1] + ' Budget'; estLabel = m[2] + ' Estimate'; }
// 			return { budgetLabel: budgetLabel, estLabel: estLabel };
// 		}

// 		function renderTable(rows, apiTitle, tbodyId, titleId, budgetHdrId, estHdrId, tableId) {
// 			var displayTitle = (apiTitle || '')
// 				.replace(/^OVERALL FOUNDATION NUMBERS\s*-\s*/i, 'Overall Foundation - ')
// 				.replace(/\bBUDGET\b/g, 'Budget')
// 				.replace(/\bVS\.\b/g,   'vs.')
// 				.replace(/\bEST\b/g,    'Estimate');
// 			$('#' + titleId).text(displayTitle);

// 			var hdrs = parseHeadersFromTitle(apiTitle);
// 			$('#' + budgetHdrId).text(hdrs.budgetLabel);
// 			$('#' + estHdrId).text(hdrs.estLabel);

// 			var $tb = $('#' + tbodyId).empty();

// 			rows.forEach(function (row) {
// 				var cls = (row.isSubTotal || row.isGrand) ? 'ppt-total-row' : '';
// 				var bO  = row.bOpex, bC = row.bCapex, eO = row.eOpex, eC = row.eCapex;

// 				$tb.append(
// 					'<tr class="' + cls + '">' +
// 						'<td>' + row.label    + '</td>' +
// 						'<td>' + fmt(bO)      + '</td>' +
// 						'<td>' + fmt(bC)      + '</td>' +
// 						'<td>' + fmt(bO + bC) + '</td>' +
// 						'<td>' + fmt(eO)      + '</td>' +
// 						'<td>' + fmt(eC)      + '</td>' +
// 						'<td>' + fmt(eO + eC) + '</td>' +
// 					'</tr>'
// 				);
// 			});

// 			fixStickySubHeader('#' + tableId);
// 		}

// 		function fetchAndRender(fy) {
// 			$('#ppt-tbody,#ppt-prev-tbody').html(
// 				'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading…</td></tr>'
// 			);
// 			Loader.show('Building your foundation metrics to present insights clearly');

// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.add_expense_totals',
// 				args  : {
// 					financial_year          : fy,
// 					month                   : 'March',
// 					set_group_id            : '4,5',
// 					previous_financial_year : getPrevFY(fy)
// 				},
// 				callback: function (r) {
// 					Loader.hide();

// 					var msg = null;
// 					if (r.message && Array.isArray(r.message)) {
// 						msg = r.message;
// 					} else if (r.message && r.message.message && Array.isArray(r.message.message)) {
// 						msg = r.message.message;
// 					}

// 					if (!msg || !msg.length) {
// 						$('#ppt-tbody,#ppt-prev-tbody').html(
// 							'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>'
// 						);
// 						return;
// 					}
// 					var first  = msg[0] || {};
// 					var ofnArr = first.overall_foundation_numbers || [];
// 					var title0 = (ofnArr[0] || {}).title || '';
// 					var title1 = (ofnArr[1] || {}).title || '';

// 					var rows0 = transformResponse(msg, 0);
// 					var rows1 = transformResponse(msg, 1);

// 					renderTable(rows0, title0, 'ppt-tbody',      'ppt-main-title', 'ppt-budget-hdr',      'ppt-est-hdr',      'ppt-table');
// 					renderTable(rows1, title1, 'ppt-prev-tbody', 'ppt-prev-title', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr', 'ppt-prev-table');

// 					function toExportRows(rows) {
// 						return rows.map(function (row) {
// 							return {
// 								label   : row.label,
// 								bOpex   : row.bOpex,
// 								bCapex  : row.bCapex,
// 								eOpex   : row.eOpex,
// 								eCapex  : row.eCapex,
// 								is_total: (row.isSubTotal === true || row.isGrand === true)
// 							};
// 						});
// 					}

// 					Store.ppt.rows            = toExportRows(rows0);
// 					Store.ppt.prevRows        = toExportRows(rows1);
// 					Store.ppt.budgetLabel     = $('#ppt-budget-hdr').text();
// 					Store.ppt.estLabel        = $('#ppt-est-hdr').text();
// 					Store.ppt.prevBudgetLabel = $('#ppt-prev-budget-hdr').text();
// 					Store.ppt.prevEstLabel    = $('#ppt-prev-est-hdr').text();
// 				},
// 				error: function () {
// 					Loader.hide();
// 					$('#ppt-tbody,#ppt-prev-tbody').html(
// 						'<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>'
// 					);
// 				}
// 			});
// 		}

// 		function load(fy) { currentFY = fy || '2025-26'; fetchAndRender(currentFY); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// HEADCOUNT MODULE
// 	// =============================================================================

// 	var Headcount = (function () {

// 		// ── static data (replace arrays with API response when endpoint is ready) ──

// 		var SUMMARY = [
// 			{ unit:'Field',                       avgHC_24:843,  avgHC_25:1343, pct_avg:59,   fy_est:2137.5, fy_plan:3834.9, pct_plan:43,   opex_est:205.1, opex_plan:null },
// 			{ unit:'Schools',                     avgHC_24:177,  avgHC_25:185,  pct_avg:30,   fy_est:162.7,  fy_plan:236.8,  pct_plan:45,   opex_est:26.8,  opex_plan:null },
// 			{ unit:'University - Bangalore',      avgHC_24:198,  avgHC_25:185,  pct_avg:30,   fy_est:107.2,  fy_plan:144.5,  pct_plan:35,   opex_est:null,  opex_plan:null },
// 			{ unit:'University - Bhopal',         avgHC_24:45,   avgHC_25:100,  pct_avg:23,   fy_est:49.3,   fy_plan:57.0,   pct_plan:95,   opex_est:null,  opex_plan:null },
// 			{ unit:'University - Jharkhand',      avgHC_24:null, avgHC_25:null, pct_avg:null, fy_est:0.3,    fy_plan:1.9,    pct_plan:539,  opex_est:null,  opex_plan:null },
// 			{ unit:'Philanthropy',                avgHC_24:59,   avgHC_25:120,  pct_avg:null, fy_est:1083.6, fy_plan:1414.6, pct_plan:30,   opex_est:null,  opex_plan:null },
// 			{ unit:'Health',                      avgHC_24:15,   avgHC_25:33,   pct_avg:179,  fy_est:166.2,  fy_plan:191.1,  pct_plan:14,   opex_est:null,  opex_plan:null },
// 			{ unit:'Livelihoods',                 avgHC_24:30,   avgHC_25:71,   pct_avg:109,  fy_est:5.9,    fy_plan:5.0,    pct_plan:-15,  opex_est:null,  opex_plan:null },
// 			{ unit:'New Initiatives',             avgHC_24:1,    avgHC_25:12,   pct_avg:23,   fy_est:385.9,  fy_plan:3625.1, pct_plan:327,  opex_est:null,  opex_plan:null },
// 			{ unit:'Enablers & Education Grants', avgHC_24:56,   avgHC_25:122,  pct_avg:null, fy_est:null,   fy_plan:null,   pct_plan:null, opex_est:null,  opex_plan:null },
// 			{ unit:'Total',                       avgHC_24:null, avgHC_25:2387, pct_avg:29,   fy_est:2137.5, fy_plan:3834.9, pct_plan:79,   opex_est:null,  opex_plan:null, isTotal:true }
// 		];

// 		var CLOSING = [
// 			{ unit:'Field',                       d24:1286, d25:1399, d26:1999 },
// 			{ unit:'Schools',                     d24:177,  d25:193,  d26:289  },
// 			{ unit:'University - Bangalore',      d24:396,  d25:408,  d26:543  },
// 			{ unit:'University - Bhopal',         d24:90,   d25:109,  d26:140  },
// 			{ unit:'University - Jharkhand',      d24:null, d25:null, d26:5    },
// 			{ unit:'Philanthropy',                d24:117,  d25:123,  d26:184  },
// 			{ unit:'Health',                      d24:60,   d25:82,   d26:229  },
// 			{ unit:'Livelihoods',                 d24:30,   d25:36,   d26:59   },
// 			{ unit:'New Initiatives',             d24:1,    d25:23,   d26:144  },
// 			{ unit:'Enablers',                    d24:112,  d25:131,  d26:169  },
// 			{ unit:'Total',                       d24:2269, d25:2504, d26:3661, isTotal:true }
// 		];

// 		var AVERAGE = [
// 			{ unit:'Field',                       d24:843,  d25:1343, d26:1649 },
// 			{ unit:'Schools',                     d24:88,   d25:185,  d26:241  },
// 			{ unit:'University - Bangalore',      d24:198,  d25:402,  d26:476  },
// 			{ unit:'University - Bhopal',         d24:45,   d25:100,  d26:125  },
// 			{ unit:'University - Jharkhand',      d24:null, d25:null, d26:3    },
// 			{ unit:'Philanthropy',                d24:59,   d25:120,  d26:154  },
// 			{ unit:'Health',                      d24:30,   d25:71,   d26:156  },
// 			{ unit:'Livelihoods',                 d24:15,   d25:33,   d26:48   },
// 			{ unit:'New Initiatives',             d24:1,    d25:12,   d26:84   },
// 			{ unit:'Enablers & Education Grants', d24:56,   d25:122,  d26:150  },
// 			{ unit:'Total',                       d24:null, d25:2387, d26:3083, isTotal:true }
// 		];

// 		var CLOSING_PCT = [
// 			{ unit:'Field',                       p1:'8.8%',    p2:'35.7%'  },
// 			{ unit:'Schools',                     p1:'9.0%',    p2:'49.7%'  },
// 			{ unit:'University - Bangalore',      p1:'3.0%',    p2:'33.1%'  },
// 			{ unit:'University - Bhopal',         p1:'21.1%',   p2:'28.4%'  },
// 			{ unit:'University - Jharkhand',      p1:'-',       p2:'-'      },
// 			{ unit:'Philanthropy',                p1:'5.1%',    p2:'49.6%'  },
// 			{ unit:'Health',                      p1:'36.7%',   p2:'179.3%' },
// 			{ unit:'Livelihoods',                 p1:'20.0%',   p2:'63.9%'  },
// 			{ unit:'New Initiatives',             p1:'2200.0%', p2:'526.1%' },
// 			{ unit:'Enablers & Education Grants', p1:'17.0%',   p2:'29.0%'  },
// 			{ unit:'Total',                       p1:'10.4%',   p2:'46.2%', isTotal:true }
// 		];

// 		var AVERAGE_PCT = [
// 			{ unit:'Field',                       p1:'108.0%',  p2:'22.8%'  },
// 			{ unit:'Schools',                     p1:'109.0%',  p2:'30.3%'  },
// 			{ unit:'University - Bangalore',      p1:'103.0%',  p2:'18.3%'  },
// 			{ unit:'University - Bhopal',         p1:'121.1%',  p2:'25.1%'  },
// 			{ unit:'University - Jharkhand',      p1:'-',       p2:'-'      },
// 			{ unit:'Philanthropy',                p1:'105.1%',  p2:'27.9%'  },
// 			{ unit:'Health',                      p1:'136.7%',  p2:'119.0%' },
// 			{ unit:'Livelihoods',                 p1:'120.0%',  p2:'43.9%'  },
// 			{ unit:'New Initiatives',             p1:'2300.0%', p2:'395.8%' },
// 			{ unit:'Enablers & Education Grants', p1:'117.0%',  p2:'23.5%'  },
// 			{ unit:'Total',                       p1:'110.4%',  p2:'29.2%', isTotal:true }
// 		];

// 		// ── helpers ──────────────────────────────────────────────────────────────

// 		function dash(v) {
// 			return (v === null || v === undefined || v === '') ? '-' : v;
// 		}
// 		function fmtNum(v) {
// 			if (v === null || v === undefined) { return '-'; }
// 			var n = Math.round(parseFloat(v));
// 			if (isNaN(n)) { return '-'; }
// 			return n.toLocaleString('en-IN');
// 		}
// 		function fmtDec(v) {
// 			if (v === null || v === undefined) { return '-'; }
// 			var n = parseFloat(v);
// 			if (isNaN(n)) { return '-'; }
// 			return n.toFixed(1);
// 		}
// 		function sectionTitle(text) {
// 			return '<div class="hc-section-title">' + text + '</div>';
// 		}
// 		function scrollWrap(inner) {
// 			return '<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' + inner + '</div>';
// 		}

// 		// ── KPI cards ─────────────────────────────────────────────────────────────

// 		function renderStats() {
// 			var stats = [
// 				{ label: 'Total Closing H/C (Mar-26 Plan)',  value: '3,661' },
// 				{ label: 'Total Average H/C (FY25-26 Plan)', value: '3,083' },
// 				{ label: 'YoY Growth — Closing',             value: '46.2%' },
// 				{ label: 'YoY Growth — Average',             value: '29.2%' }
// 			];
// 			var cards = stats.map(function (s) {
// 				return '<div class="hc-kpi-card">' +
// 					'<div class="hc-kpi-label">' + s.label + '</div>' +
// 					'<div class="hc-kpi-value">' + s.value + '</div>' +
// 					'</div>';
// 			}).join('');
// 			return '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px;">' + cards + '</div>';
// 		}

// 		// ── Table 1: Summary ──────────────────────────────────────────────────────

// 		function renderSummary() {
// 			var rows = '';
// 			SUMMARY.forEach(function (r) {
// 				var cls = r.isTotal ? 'cb-row-grand' : '';
// 				rows +=
// 					'<tr class="' + cls + '">' +
// 					'<td style="text-align:left;">'  + r.unit + '</td>' +
// 					'<td>' + fmtNum(r.avgHC_24)  + '</td>' +
// 					'<td>' + fmtNum(r.avgHC_25)  + '</td>' +
// 					'<td>' + dash(r.pct_avg  !== null ? r.pct_avg  + '%' : null) + '</td>' +
// 					'<td>' + fmtDec(r.fy_est)    + '</td>' +
// 					'<td>' + fmtDec(r.fy_plan)   + '</td>' +
// 					'<td>' + dash(r.pct_plan !== null ? r.pct_plan + '%' : null) + '</td>' +
// 					'<td>' + fmtDec(r.opex_est)  + '</td>' +
// 					'<td>' + fmtDec(r.opex_plan) + '</td>' +
// 					'</tr>';
// 			});
// 			return scrollWrap(
// 				'<table class="cb-table" style="width:100%;">' +
// 				'<thead>' +
// 				'<tr class="cb-thead-main">' +
// 				'<th rowspan="2" style="text-align:left !important;min-width:200px;">Unit</th>' +
// 				'<th colspan="3" style="text-align:center !important;">Average H/C</th>' +
// 				'<th colspan="3" style="text-align:center !important;">Opex Spend (&#8377; Cr.)</th>' +
// 				'<th colspan="2" style="text-align:center !important;">Opex Spend (&#8377; Cr.)</th>' +
// 				'</tr>' +
// 				'<tr class="cb-thead-sub">' +
// 				'<th>31-Mar-25</th><th>31-Mar-26 Plan</th><th>% Increase</th>' +
// 				'<th>FY24-25 Est</th><th>FY25-26 Plan</th><th>% Increase</th>' +
// 				'<th>FY24-25 Est</th><th>FY25-26 Plan</th>' +
// 				'</tr>' +
// 				'</thead>' +
// 				'<tbody>' + rows + '</tbody>' +
// 				'</table>'
// 			);
// 		}

// 		// ── Table 2: Closing H/C ─────────────────────────────────────────────────

// 		function renderClosing() {
// 			var rows = '';
// 			CLOSING.forEach(function (r) {
// 				var cls     = r.isTotal ? 'cb-row-grand' : '';
// 				var d24col  = r.isTotal
// 					? fmtNum(r.d24)
// 					: '<span style="color:#C0392B;font-weight:600;">' + fmtNum(r.d24) + '</span>';
// 				rows +=
// 					'<tr class="' + cls + '">' +
// 					'<td style="text-align:left;">' + r.unit + '</td>' +
// 					'<td>' + d24col          + '</td>' +
// 					'<td>' + fmtNum(r.d25)   + '</td>' +
// 					'<td>' + fmtNum(r.d26)   + '</td>' +
// 					'</tr>';
// 			});
// 			return scrollWrap(
// 				'<table class="cb-table" style="width:100%;max-width:620px;">' +
// 				'<thead>' +
// 				'<tr class="cb-thead-main">' +
// 				'<th style="text-align:left !important;min-width:220px;">Unit</th>' +
// 				'<th>31-Mar-24</th><th>31-Mar-25</th><th>31-Mar-26</th>' +
// 				'</tr>' +
// 				'</thead>' +
// 				'<tbody>' + rows + '</tbody>' +
// 				'</table>'
// 			);
// 		}

// 		// ── Table 3: Average H/C ─────────────────────────────────────────────────

// 		function renderAverage() {
// 			var rows = '';
// 			AVERAGE.forEach(function (r) {
// 				var cls    = r.isTotal ? 'cb-row-grand' : '';
// 				var d24col = r.isTotal
// 					? fmtNum(r.d24)
// 					: '<span style="color:#C0392B;font-weight:600;">' + fmtNum(r.d24) + '</span>';
// 				rows +=
// 					'<tr class="' + cls + '">' +
// 					'<td style="text-align:left;">' + r.unit + '</td>' +
// 					'<td>' + d24col          + '</td>' +
// 					'<td>' + fmtNum(r.d25)   + '</td>' +
// 					'<td>' + fmtNum(r.d26)   + '</td>' +
// 					'</tr>';
// 			});
// 			return scrollWrap(
// 				'<table class="cb-table" style="width:100%;max-width:620px;">' +
// 				'<thead>' +
// 				'<tr class="cb-thead-main">' +
// 				'<th style="text-align:left !important;min-width:220px;">Unit</th>' +
// 				'<th>31-Mar-24</th><th>31-Mar-25</th><th>31-Mar-26</th>' +
// 				'</tr>' +
// 				'</thead>' +
// 				'<tbody>' + rows + '</tbody>' +
// 				'</table>'
// 			);
// 		}

// 		// ── Table 4: Increase in Closing H/C (%) ────────────────────────────────

// 		function renderClosingPct() {
// 			var rows = '';
// 			CLOSING_PCT.forEach(function (r) {
// 				var cls = r.isTotal ? 'cb-row-grand' : '';
// 				rows +=
// 					'<tr class="' + cls + '">' +
// 					'<td style="text-align:left;">' + r.unit + '</td>' +
// 					'<td>' + r.p1 + '</td>' +
// 					'<td>' + r.p2 + '</td>' +
// 					'</tr>';
// 			});
// 			return scrollWrap(
// 				'<table class="cb-table" style="width:100%;max-width:520px;">' +
// 				'<thead>' +
// 				'<tr class="cb-thead-main">' +
// 				'<th style="text-align:left !important;min-width:220px;">Unit</th>' +
// 				'<th>Mar-24 &#8594; Mar-25</th>' +
// 				'<th>Mar-25 &#8594; Mar-26</th>' +
// 				'</tr>' +
// 				'</thead>' +
// 				'<tbody>' + rows + '</tbody>' +
// 				'</table>'
// 			);
// 		}

// 		// ── Table 5: Increase in Average H/C (%) ────────────────────────────────

// 		function renderAveragePct() {
// 			var rows = '';
// 			AVERAGE_PCT.forEach(function (r) {
// 				var cls = r.isTotal ? 'cb-row-grand' : '';
// 				rows +=
// 					'<tr class="' + cls + '">' +
// 					'<td style="text-align:left;">' + r.unit + '</td>' +
// 					'<td>' + r.p1 + '</td>' +
// 					'<td>' + r.p2 + '</td>' +
// 					'</tr>';
// 			});
// 			return scrollWrap(
// 				'<table class="cb-table" style="width:100%;max-width:520px;">' +
// 				'<thead>' +
// 				'<tr class="cb-thead-main">' +
// 				'<th style="text-align:left !important;min-width:220px;">Unit</th>' +
// 				'<th>FY23-24 &#8594; FY24-25</th>' +
// 				'<th>FY24-25 &#8594; FY25-26</th>' +
// 				'</tr>' +
// 				'</thead>' +
// 				'<tbody>' + rows + '</tbody>' +
// 				'</table>'
// 			);
// 		}

// 		// ── Main render ──────────────────────────────────────────────────────────

// 		function render() {
// 			$('#tab-headcount').html(
// 				'<div style="padding:4px 0 10px;">' +
// 					'<div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' +
// 						xlBtn('xl-headcount', 'Export to Excel') +
// 					'</div>' +
// 					renderStats() +
// 					sectionTitle('Headcount Summary') +
// 					'<div class="ppt-currency-label" style="text-align:left;margin-bottom:6px;">' +
// 						'H/C numbers &nbsp;|&nbsp; Opex in &#8377; <strong>Cr.</strong>' +
// 					'</div>' +
// 					renderSummary() +
// 					sectionTitle('Closing H/C') +
// 					renderClosing() +
// 					sectionTitle('Average H/C') +
// 					renderAverage() +
// 					sectionTitle('Increase in Closing H/C (%)') +
// 					renderClosingPct() +
// 					sectionTitle('Increase in Average H/C (%)') +
// 					renderAveragePct() +
// 				'</div>'
// 			);
// 		}

// 		function load(/* fy */) { render(); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ANNUAL BUDGET MODULE
// 	// =============================================================================

// 	var Annual = (function () {

// 		var Q_DEFS = {
// 			q1: { label: 'Quarter 1', months: ['April','May','June'] },
// 			q2: { label: 'Quarter 2', months: ['July','August','September'] },
// 			q3: { label: 'Quarter 3', months: ['October','November','December'] },
// 			q4: { label: 'Quarter 4', months: ['January','February','March'] }
// 		};
// 		var Q_KEYS = ['q1','q2','q3','q4'];
// 		var data=[], expandedQ=[], openH={}, openS={}, bound=false;

// 		function sumArr(a) { var t=0; (a||[]).forEach(function(v){t+=(v||0);}); return t; }
// 		function objTotal(o) { var t=0; Q_KEYS.forEach(function(k){t+=sumArr(o[k]);}); return t; }

// 		function qCells(obj) {
// 			var html = '';
// 			Q_KEYS.forEach(function (k) {
// 				var vals = obj[k]||[0,0,0];
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
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense Head / Line Item</th>');
// 			Q_KEYS.forEach(function (k) {
// 				var o = expandedQ.indexOf(k) !== -1;
// 				$m.append('<th class="cb-q-header" data-quarter="' + k + '" colspan="3" rowspan="' + (o?1:2) + '" style="cursor:pointer;">' + Q_DEFS[k].label + ' ' + (o?'▲':'▼') + '</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s = $('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function (k) {
// 					if (expandedQ.indexOf(k) !== -1) {
// 						Q_DEFS[k].months.forEach(function (m) { $s.append('<th>' + m + '</th>'); });
// 					}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#annual-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb  = $('#annual-table tbody').empty();
// 			var term = $('#annual-search').val().trim().toLowerCase();
// 			var grand = { q1:[0,0,0], q2:[0,0,0], q3:[0,0,0], q4:[0,0,0] };
// 			data.forEach(function (head, hi) {
// 				if (term && !matchSearch(head, term)) { return; }
// 				var hs = String(hi), ho = openH[hs] === true;
// 				Q_KEYS.forEach(function (k) { (head[k]||[0,0,0]).forEach(function(v,mi){grand[k][mi]+=(v||0);}); });
// 				$tb.append(
// 					'<tr class="cb-row-head cb-annual-head" data-hi="' + hs + '">' +
// 						'<td><span class="cb-arrow">' + (ho?'▼':'▶') + '</span> ' + head.name.trim() + '</td>' +
// 						qCells(head) + '<td class="cb-text-accent">' + formatINR(objTotal(head)) + '</td>' +
// 					'</tr>'
// 				);
// 				(head.sub_heads||[]).forEach(function (sub, si) {
// 					var sk = hs+'-'+si, so = openS[sk]===true;
// 					$tb.append(
// 						'<tr class="cb-row-sub cb-annual-sub" data-hi="' + hs + '" data-si="' + si + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:22px;"><span class="cb-arrow">' + (so?'▼':'▶') + '</span> ' + sub.name + '</td>' +
// 							qCells(sub) + '<td>' + formatINR(objTotal(sub)) + '</td>' +
// 						'</tr>'
// 					);
// 					(sub.items||[]).forEach(function (item) {
// 						$tb.append(
// 							'<tr class="cb-annual-sub-item" data-hi="' + hs + '" data-si="' + si + '" style="' + ((ho&&so)?'':'display:none;') + '">' +
// 								'<td style="padding-left:42px;">' + item.name + '</td>' +
// 								qCells(item) + '<td>' + formatINR(objTotal(item)) + '</td>' +
// 							'</tr>'
// 						);
// 					});
// 				});
// 				(head.items||[]).forEach(function (d) {
// 					$tb.append(
// 						'<tr class="cb-annual-head-item" data-hi="' + hs + '" style="' + (ho?'':'display:none;') + '">' +
// 							'<td style="padding-left:35px;">' + d.name + '</td>' +
// 							qCells(d) + '<td>' + formatINR(objTotal(d)) + '</td>' +
// 						'</tr>'
// 					);
// 				});
// 			});
// 			var gt=0; Q_KEYS.forEach(function(k){gt+=sumArr(grand[k]);});
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>' + qCells(grand) + '<td>' + formatINR(gt) + '</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			openH[hs] = !(openH[hs]===true);
// 			if (!openH[hs]) {
// 				data.forEach(function(h,hi){ if(String(hi)!==hs){return;} (h.sub_heads||[]).forEach(function(_,si){openS[hs+'-'+si]=false;}); });
// 			}
// 			renderTable();
// 		}
// 		function toggleSub(hs,ss) { openS[hs+'-'+ss]=!(openS[hs+'-'+ss]===true); renderTable(); }

// 		function matchSearch(head, term) {
// 			if (!term) { return true; }
// 			if (head.name.toLowerCase().indexOf(term) !== -1) { return true; }
// 			for (var s=0; s<(head.sub_heads||[]).length; s++) {
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term) !== -1) { return true; }
// 				for (var i=0; i<(head.sub_heads[s].items||[]).length; i++) {
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 				}
// 			}
// 			for (var d=0; d<(head.items||[]).length; d++) {
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term) !== -1) { return true; }
// 			}
// 			return false;
// 		}

// 		function bindEvents() {
// 			$(document).on('input.annual', '#annual-search', function () { renderTable(); });
// 			$(document).on('change.annual', '#annual-expand-quarters', function () {
// 				expandedQ = this.checked ? Q_KEYS.slice() : [];
// 				renderTable();
// 			});
// 			$(document).on('change.annual', '#annual-expand-items', function () {
// 				if (this.checked) {
// 					data.forEach(function(h,hi){ openH[String(hi)]=true; (h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;}); });
// 				} else { openH={}; openS={}; }
// 				renderTable();
// 			});
// 			$(document).on('click.annual', '#annual-table .cb-q-header', function () {
// 				var k=String($(this).attr('data-quarter')), idx=expandedQ.indexOf(k);
// 				if (idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#annual-expand-quarters').prop('checked', expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-head', function (e) { e.stopPropagation(); toggleHead(String($(this).attr('data-hi'))); });
// 			$('#tab-annual_budget').on('click.annual', '.cb-annual-sub',  function (e) { e.stopPropagation(); toggleSub(String($(this).attr('data-hi')), String($(this).attr('data-si'))); });
// 		}

// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked', false);
// 			$('#annual-search').val('');
// 			Loader.show('We\u2019re stitching together your annual budget story');
// 			frappe.call({
// 				method  : 'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args    : { financial_year: fy },
// 				callback: function (r) {
// 					data = r.message || [];
// 					Store.annual = data;
// 					renderTable();
// 					Loader.hide();
// 				},
// 				error: function () { Loader.hide(); frappe.msgprint('Error loading Annual Budget.'); }
// 			});
// 		}

// 		function load(fy) { if (!bound) { bindEvents(); bound=true; } fetchAndRender(fy); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE
// 	// =============================================================================

// 	var Estimate = (function () {

// 		var Q_DEFS = {
// 			q1: { label:'Quarter 1', months:['April','May','June'] },
// 			q2: { label:'Quarter 2', months:['July','August','September'] },
// 			q3: { label:'Quarter 3', months:['October','November','December'] },
// 			q4: { label:'Quarter 4', months:['January','February','March'] }
// 		};
// 		var Q_KEYS=['q1','q2','q3','q4'];
// 		var Q_IDX={q1:[0,1,2],q2:[3,4,5],q3:[6,7,8],q4:[9,10,11]};
// 		var data=[],expandedQ=[],openH={},openS={},bound=false;

// 		function getMth(obj) {
// 			var m=obj.months||{};
// 			return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),
// 			        parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),
// 			        parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),
// 			        parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)];
// 		}
// 		function qTot(obj){return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)];}
// 		function yTot(obj){var q=qTot(obj);return q[0]+q[1]+q[2]+q[3];}

// 		function qCells(obj) {
// 			var mths=getMth(obj),qtots=qTot(obj),html='';
// 			Q_KEYS.forEach(function(q,qi){
// 				if (expandedQ.indexOf(q)!==-1) {
// 					Q_IDX[q].forEach(function(mi){html+='<td>'+formatINR(mths[mi])+'</td>';});
// 				} else {
// 					html+='<td colspan="3">'+formatINR(qtots[qi])+'</td>';
// 				}
// 			});
// 			return html;
// 		}

// 		function buildHeader() {
// 			var $t=$('#estimate-table thead').empty();
// 			var $m=$('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense</th>');
// 			Q_KEYS.forEach(function(k){
// 				var o=expandedQ.indexOf(k)!==-1;
// 				$m.append('<th class="est-q-toggle" data-q="'+k+'" colspan="3" rowspan="'+(o?1:2)+'" style="cursor:pointer;">'+Q_DEFS[k].label+' '+(o?'▲':'▼')+'</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s=$('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function(k){
// 					if (expandedQ.indexOf(k)!==-1){Q_DEFS[k].months.forEach(function(m){$s.append('<th>'+m+'</th>');});}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#estimate-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#estimate-tbody').empty();
// 			var term=$('#estimate-search').val().trim().toLowerCase();
// 			if (!Array.isArray(data)||!data.length) {
// 				$tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			var gM=[0,0,0,0,0,0,0,0,0,0,0,0],gQ=[0,0,0,0];
// 			data.forEach(function(head,hi){
// 				if (term&&!matchSearch(head,term)){return;}
// 				getMth(head).forEach(function(v,i){gM[i]+=v;});
// 				qTot(head).forEach(function(v,i){gQ[i]+=v;});
// 				var hs=String(hi),ho=openH[hs];
// 				$tb.append(
// 					'<tr class="cb-row-head cb-est-head" data-hi="'+hs+'">' +
// 						'<td><span class="cb-arrow">'+(ho?'▼':'▶')+'</span> '+head.name+'</td>' +
// 						qCells(head)+'<td class="cb-text-accent">'+formatINR(yTot(head))+'</td>' +
// 					'</tr>'
// 				);
// 				(head.items||[]).forEach(function(item){
// 					$tb.append('<tr class="cb-est-head-item" data-hi="'+hs+'" style="'+(ho?'':'display:none;')+'">' +
// 						'<td style="padding-left:28px;">'+item.name+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
// 				});
// 				(head.sub_heads||[]).forEach(function(sub,si){
// 					var sk=hs+'-'+si,so=openS[sk];
// 					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="'+hs+'" data-si="'+si+'" style="'+(ho?'':'display:none;')+'">' +
// 						'<td style="padding-left:20px;"><span class="cb-arrow">'+(so?'▼':'▶')+'</span> '+sub.name+'</td>'+qCells(sub)+'<td>'+formatINR(yTot(sub))+'</td></tr>');
// 					(sub.items||[]).forEach(function(item){
// 						$tb.append('<tr class="cb-est-sub-item" data-hi="'+hs+'" data-si="'+si+'" style="'+((ho&&so)?'':'display:none;')+'">' +
// 							'<td style="padding-left:44px;">'+item.name+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
// 					});
// 				});
// 			});
// 			var gO={Q1:gQ[0],Q2:gQ[1],Q3:gQ[2],Q4:gQ[3],months:{'4':gM[0],'5':gM[1],'6':gM[2],'7':gM[3],'8':gM[4],'9':gM[5],'10':gM[6],'11':gM[7],'12':gM[8],'1':gM[9],'2':gM[10],'3':gM[11]}};
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>'+qCells(gO)+'<td>'+formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3])+'</td></tr>');
// 		}

// 		function toggleHead(hs) {
// 			var o=!openH[hs]; openH[hs]=o;
// 			$('#estimate-table tbody .cb-est-head[data-hi="'+hs+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			if (o) {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-head-item[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){
// 					var si=$(this).attr('data-si');
// 					if (openS[hs+'-'+si]){$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+si+'"]').show();}
// 				});
// 			} else {
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){var si=$(this).attr('data-si');openS[hs+'-'+si]=false;$(this).find('.cb-arrow').text('▶');});
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"],.cb-est-sub-item[data-hi="'+hs+'"],.cb-est-head-item[data-hi="'+hs+'"]').hide();
// 			}
// 		}
// 		function toggleSub(hs,ss) {
// 			var sk=hs+'-'+ss,o=!openS[sk]; openS[sk]=o;
// 			$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"][data-si="'+ss+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $i=$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+ss+'"]');
// 			o?$i.show():$i.hide();
// 		}
// 		function matchSearch(head,term) {
// 			if (!term){return true;}
// 			if (head.name.toLowerCase().indexOf(term)!==-1){return true;}
// 			for (var s=0;s<(head.sub_heads||[]).length;s++){
// 				if (head.sub_heads[s].name.toLowerCase().indexOf(term)!==-1){return true;}
// 				for (var i=0;i<(head.sub_heads[s].items||[]).length;i++){
// 					if ((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 				}
// 			}
// 			for (var d=0;d<(head.items||[]).length;d++){
// 				if ((head.items[d].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 			}
// 			return false;
// 		}
// 		function bindEvents() {
// 			$(document).on('click.estimate','#estimate-table .est-q-toggle',function(){
// 				var k=String($(this).attr('data-q')),idx=expandedQ.indexOf(k);
// 				if(idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#estimate-expand-quarters').prop('checked',expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$(document).on('change.estimate','#estimate-expand-quarters',function(){expandedQ=this.checked?Q_KEYS.slice():[];renderTable();});
// 			$(document).on('change.estimate','#estimate-expand-items',function(){
// 				if(this.checked){data.forEach(function(h,hi){openH[String(hi)]=true;(h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;});});}
// 				else{openH={};openS={};}
// 				renderTable();
// 			});
// 			$('#tab-estimate').on('click.estimate','.cb-est-head',function(e){e.stopPropagation();toggleHead(String($(this).attr('data-hi')));});
// 			$('#tab-estimate').on('click.estimate','.cb-est-sub', function(e){e.stopPropagation();toggleSub(String($(this).attr('data-hi')),String($(this).attr('data-si')));});
// 			$(document).on('input.estimate','#estimate-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy) {
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked',false);
// 			var year=(getPrevFY(fy)||'2025-26').split('-')[0];
// 			Loader.show('We\u2019re shaping your projections into a smart view');
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
// 				args    : { fiscal_year: year, accounting_period: '12' },
// 				callback: function(r){
// 					if (r.message) {
// 						if (r.message.status === 'success')                       { data = r.message.data || []; }
// 						else if (Array.isArray(r.message))                        { data = r.message; }
// 						else if (r.message.data && Array.isArray(r.message.data)) { data = r.message.data; }
// 						else { frappe.msgprint('Failed to load Estimate data.'); }
// 					} else { frappe.msgprint('Failed to load Estimate data.'); }
// 					Store.estimate = data;
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// BUDGET & ESTIMATE MODULE
// 	// =============================================================================

// 	var BudgetEstimate = (function () {

// 		var rawData=[], currentFY='', openSec={}, openSub={}, expandItems=false, bound=false;

// 		function pl(){return getFYLabels(currentFY).plan;}
// 		function el(){return getFYLabels(currentFY).est;}
// 		function entityLabel(e){return (e.label||'').trim();}

// 		function buildStruct() {
// 			if (!rawData.length){return [];}
// 			return (rawData[0].actuals||[]).map(function(sec){
// 				return {
// 					name     : sec.name,
// 					sub_heads: (sec.sub_heads||[]).map(function(sub){
// 						return {name:sub.name, items:(sub.items||[]).map(function(i){return {name:i.name};})};
// 					}),
// 					items: (sec.items||[]).map(function(i){return {name:i.name};})
// 				};
// 			});
// 		}

// 		function itemVal(entry,name,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				(sec.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});
// 				(sec.sub_heads||[]).forEach(function(sub){(sub.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});});
// 			});
// 			return v;
// 		}
// 		function subVal(entry,sn,subn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				(sec.sub_heads||[]).forEach(function(sub){
// 					if(sub.name!==subn){return;}
// 					v+=parseFloat(field==='plan'?(sub.ytd||0):(sub.total_posted_amt_ytd||0));
// 				});
// 			});
// 			return v;
// 		}
// 		function secVal(entry,sn,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){
// 				if(sec.name!==sn){return;}
// 				v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));
// 			});
// 			return v;
// 		}
// 		function grandVal(entry,field){
// 			var v=0;
// 			(entry.actuals||[]).forEach(function(sec){v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));});
// 			return v;
// 		}
// 		function itemCells(name){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(itemVal(e,name,'ytd'))+'</td><td>'+formatINR(itemVal(e,name,'total_posted_amt'))+'</td>';});return h;}
// 		function subCells(sn,subn){var h='';rawData.forEach(function(e){h+='<td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'plan'))+'</td><td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'est'))+'</td>';});return h;}
// 		function secCells(sn){var h='';rawData.forEach(function(e){h+='<td style="font-weight:700;">'+formatINR(secVal(e,sn,'plan'))+'</td><td style="font-weight:700;">'+formatINR(secVal(e,sn,'est'))+'</td>';});return h;}
// 		function grandCells(){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(grandVal(e,'plan'))+'</td><td>'+formatINR(grandVal(e,'est'))+'</td>';});return h;}
// 		function iTotP(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'ytd');});return v;}
// 		function iTotE(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'total_posted_amt');});return v;}
// 		function sTotP(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'plan');});return v;}
// 		function sTotE(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'est');});return v;}
// 		function secTP(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'plan');});return v;}
// 		function secTE(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'est');});return v;}
// 		function allGP(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'plan');});return v;}
// 		function allGE(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'est');});return v;}

// 		function tc2(plan,est,cls){
// 			cls=cls||'';
// 			return '<td class="be-total-plan '+cls+'" style="font-weight:700;">'+formatINR(plan)+'</td>' +
// 			       '<td class="be-total-est  '+cls+'" style="font-weight:700;">'+formatINR(est)+'</td>';
// 		}

// 		function buildHeader() {
// 			var $t=$('#be-table thead').empty();
// 			var $r1=$('<tr class="cb-thead-main"></tr>');
// 			var $r2=$('<tr class="cb-thead-sub"></tr>');
// 			$r1.append('<th rowspan="2" style="text-align:left !important;min-width:280px;width:280px;position:sticky;left:0;z-index:50;background:#0076B6;vertical-align:middle;">Expense Head / Line Item</th>');
// 			rawData.forEach(function(e){
// 				$r1.append('<th colspan="2" style="text-align:center;min-width:260px;">'+entityLabel(e)+'</th>');
// 			});
// 			$r1.append('<th colspan="2" style="text-align:center;min-width:260px;background:#003B63;">Grand Total</th>');
// 			rawData.forEach(function(){
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+pl()+'</th>');
// 				$r2.append('<th style="text-align:center;min-width:130px;">'+el()+'</th>');
// 			});
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+pl()+'</th>');
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+el()+'</th>');
// 			$t.append($r1).append($r2);
// 			fixStickySubHeader('#be-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#be-tbody').empty();
// 			var term=$('#be-search').val().trim().toLowerCase();
// 			var struct=buildStruct();
// 			var cols=1+rawData.length*2+2;
// 			if (!rawData.length||!struct.length) {
// 				$tb.append('<tr><td colspan="'+cols+'" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');
// 				return;
// 			}
// 			struct.forEach(function(sec){
// 				var sn=sec.name, secOpen=openSec[sn]!==false, secVis=secOpen?'':'display:none;';
// 				$tb.append('<tr class="cb-row-head be-sec-row" data-sec="'+sn+'">' +
// 					'<td style="text-align:left;"><span class="cb-arrow">'+(secOpen?'▼':'▶')+'</span> '+sn+'</td>' +
// 					secCells(sn)+tc2(secTP(sn),secTE(sn),'be-grand-col')+'</tr>');
// 				sec.sub_heads.forEach(function(sub){
// 					var sk=sn+'::'+sub.name, subOpen=expandItems||(openSub[sk]===true), itmVis=(secOpen&&subOpen)?'':'display:none;';
// 					$tb.append('<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="'+sn+'" data-sub="'+sk+'" style="'+secVis+'">' +
// 						'<td style="padding-left:22px;text-align:left;"><span class="cb-arrow">'+(subOpen?'▼':'▶')+'</span> '+sub.name+'</td>' +
// 						subCells(sn,sub.name)+tc2(sTotP(sn,sub.name),sTotE(sn,sub.name),'be-grand-col')+'</tr>');
// 					sub.items.forEach(function(item){
// 						if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 						$tb.append('<tr class="be-item-row be-sec-child be-sub-child" data-sec="'+sn+'" data-sub="'+sk+'" style="'+itmVis+'">' +
// 							'<td style="padding-left:42px;text-align:left;">'+item.name+'</td>' +
// 							itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col')+'</tr>');
// 					});
// 				});
// 				sec.items.forEach(function(item){
// 					if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 					$tb.append('<tr class="be-item-row be-sec-child be-direct-item" data-sec="'+sn+'" style="'+secVis+'">' +
// 						'<td style="padding-left:30px;text-align:left;">'+item.name+'</td>' +
// 						itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col')+'</tr>');
// 				});
// 			});
// 			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>'+grandCells()+tc2(allGP(),allGE(),'be-grand-col')+'</tr>');
// 		}

// 		function toggleSec(sn){
// 			var o=!(openSec[sn]!==false); openSec[sn]=o;
// 			$('#be-table tbody .be-sec-row[data-sec="'+sn+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $ch=$('#be-table tbody .be-sec-child[data-sec="'+sn+'"]');
// 			if(o){
// 				$ch.filter('.be-sub-row,.be-direct-item').show();
// 				$ch.filter('.be-sub-child').each(function(){var sk=$(this).attr('data-sub');if(expandItems||openSub[sk]===true){$(this).show();}});
// 			} else {$ch.hide();}
// 		}
// 		function toggleSubRow(sk){
// 			var o=!(openSub[sk]===true); openSub[sk]=o;
// 			$('#be-table tbody .be-sub-row[data-sub="'+sk+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $it=$('#be-table tbody .be-sub-child[data-sub="'+sk+'"]');
// 			o?$it.show():$it.hide();
// 		}
// 		function bindEvents(){
// 			$('#tab-budget_estimate').on('click.be','.be-sec-row',function(e){e.stopPropagation();toggleSec($(this).attr('data-sec'));});
// 			$('#tab-budget_estimate').on('click.be','.be-sub-row',function(e){e.stopPropagation();if(!expandItems){toggleSubRow($(this).attr('data-sub'));}});
// 			$(document).on('change.be','#be-expand-items',function(){
// 				expandItems=this.checked;
// 				buildStruct().forEach(function(sec){
// 					openSec[sec.name]=expandItems?true:false;
// 					sec.sub_heads.forEach(function(sub){openSub[sec.name+'::'+sub.name]=expandItems;});
// 				});
// 				renderTable();
// 			});
// 			$(document).on('input.be','#be-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy){
// 			currentFY=fy; rawData=[]; openSec={}; openSub={}; expandItems=false;
// 			$('#be-expand-items').prop('checked',false);
// 			Loader.show("We're balancing budget and estimate");
// 			frappe.call({
// 				method  : 'annual_budget.api.foundation_consolidated_report.format_api',
// 				args    : { financial_year: fy, month: 'March', set_group_id: "2", previous_financial_year: getPrevFY(fy) },
// 				callback: function(r){
// 					if(r.message&&Array.isArray(r.message)){rawData=r.message;}
// 					else{frappe.msgprint('Failed to load Budget & Estimate data.');}
// 					Store.budgetEstimate = rawData;
// 					renderTable(); Loader.hide();
// 				},
// 				error: function(){Loader.hide();frappe.msgprint('Server error loading Budget & Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// EXPORT BUTTON WIRING
// 	// =============================================================================

// 	var API = 'annual_budget.api.export_reports';

// 	$(document).on('click', '#xl-ppt', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.ppt.rows.length) { frappe.msgprint('Please wait for the data to load first.'); return; }
// 		serverExport(API + '.export_ppt', {
// 			financial_year    : fy,
// 			ppt_rows          : JSON.stringify(Store.ppt.rows),
// 			prev_ppt_rows     : JSON.stringify(Store.ppt.prevRows),
// 			budget_label      : Store.ppt.budgetLabel,
// 			est_label         : Store.ppt.estLabel,
// 			prev_budget_label : Store.ppt.prevBudgetLabel,
// 			prev_est_label    : Store.ppt.prevEstLabel
// 		}, 'Building Foundation Metrics Excel\u2026');
// 	});

// 	$(document).on('click', '#xl-annual', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.annual.length) { frappe.msgprint('Please load the Annual Budget tab first.'); return; }
// 		serverExport(API + '.export_annual', {
// 			financial_year: fy,
// 			annual_data   : JSON.stringify(Store.annual)
// 		}, 'Building Annual Budget Excel\u2026');
// 	});

// 	$(document).on('click', '#xl-estimate', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.estimate.length) { frappe.msgprint('Please load the Estimate tab first.'); return; }
// 		serverExport(API + '.export_estimate', {
// 			financial_year: fy,
// 			estimate_data : JSON.stringify(Store.estimate)
// 		}, 'Building Estimate Excel\u2026');
// 	});

// 	$(document).on('click', '#xl-be', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.budgetEstimate.length) { frappe.msgprint('Please load the Budget & Estimate tab first.'); return; }
// 		serverExport(API + '.export_budget_estimate', {
// 			financial_year: fy,
// 			be_data       : JSON.stringify(Store.budgetEstimate)
// 		}, 'Building Budget & Estimate Excel\u2026');
// 	});

// 	$(document).on('click', '#xl-headcount', function () {
// 		frappe.msgprint('Headcount Excel export will be available once the API endpoint is connected.');
// 	});

// 	$(document).on('click', '#xl-export-all', function () {
// 		var fy      = fyControl.get_value() || '2025-26';
// 		var missing = [];
// 		if (!Store.ppt.rows.length)       { missing.push('Foundation Metrics'); }
// 		if (!Store.annual.length)         { missing.push('Annual Budget'); }
// 		if (!Store.estimate.length)       { missing.push('Estimate'); }
// 		if (!Store.budgetEstimate.length) { missing.push('Budget & Estimate'); }
// 		if (missing.length) {
// 			frappe.msgprint('The following tabs have not been loaded yet:<br><b>' + missing.join(', ') + '</b><br>Please open each tab first, then click Export All.');
// 			return;
// 		}
// 		serverExport(API + '.export_all', {
// 			financial_year    : fy,
// 			ppt_rows          : JSON.stringify(Store.ppt.rows),
// 			prev_ppt_rows     : JSON.stringify(Store.ppt.prevRows),
// 			budget_label      : Store.ppt.budgetLabel,
// 			est_label         : Store.ppt.estLabel,
// 			prev_budget_label : Store.ppt.prevBudgetLabel,
// 			prev_est_label    : Store.ppt.prevEstLabel,
// 			annual_data       : JSON.stringify(Store.annual),
// 			estimate_data     : JSON.stringify(Store.estimate),
// 			be_data           : JSON.stringify(Store.budgetEstimate)
// 		}, 'Building full consolidated Excel\u2026');
// 	});

// 	// =============================================================================
// 	// AUTO-LOAD ACTIVE TAB
// 	// =============================================================================

// 	var initialFY = fyControl.get_value();
// 	if (initialFY) { TabLoader.trigger('ppt'); }

// };



// frappe.pages['consolidated-budget'].on_page_load = function (wrapper) {

// 	// =============================================================================
// 	// PAGE SETUP
// 	// =============================================================================

// 	var page = frappe.ui.make_app_page({
// 		parent       : wrapper,
// 		title        : 'Foundation - Consolidated Budget',
// 		single_column: true
// 	});

// 	// ── "Export All" — single button injected once into .page-actions ──
// 	setTimeout(function () {
// 		$(wrapper).find('#xl-export-all').remove();
// 		var $exportAllBtn = $(
// 			'<button class="btn btn-default btn-sm" id="xl-export-all" style="display:inline-flex;align-items:center;gap:5px;margin-left:8px;background:#1a1a1a;color:#fff;border-color:#1a1a1a;">' +
// 				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 					'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 					'<polyline points="14 2 14 8 20 8"/>' +
// 					'<line x1="8" y1="13" x2="16" y2="13"/>' +
// 					'<line x1="8" y1="17" x2="16" y2="17"/>' +
// 					'<line x1="10" y1="9" x2="8" y2="9"/>' +
// 				'</svg>' +
// 				'Export All' +
// 			'</button>'
// 		);
// 		var $pa = $(wrapper).find('.page-actions');
// 		if ($pa.length) { $pa.prepend($exportAllBtn); }
// 	}, 300);

// 	function updatePageTitle(financialYear) {
// 		page.set_title('Foundation - Consolidated Budget - ' + financialYear);
// 		setTimeout(function () {
// 			$(wrapper).find('.page-head h3').hide();
// 			$(wrapper).find('.page-head .title-text')
// 				.css({ 'font-size': '20px', 'font-weight': '700', 'color': '#1a1a1a' });
// 		}, 100);
// 	}

// 	// =============================================================================
// 	// FY LABEL HELPERS
// 	// =============================================================================

// 	function getFYLabels(fy) {
// 		var parts     = (fy || '2025-26').split('-');
// 		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
// 		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
// 		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
// 		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
// 		return {
// 			plan : 'FY' + startYY + '-' + endYY    + ' Plan',
// 			est  : 'FY' + prevStart + '-' + prevEnd + ' Estimate'
// 		};
// 	}

// 	function getPrevFY(fy) {
// 		var parts = (fy || '2025-26').split('-');
// 		var s = parseInt(parts[0] || '2025', 10) - 1;
// 		var e = parseInt(parts[1] || '26',   10) - 1;
// 		return s + '-' + String(e).padStart(2, '0');
// 	}

// 	// Build budget year label e.g. "2025-26" → "2026-27 Budget"
// 	function getBudgetYearLabel(fy) {
// 		var parts = (fy || '2025-26').split('-');
// 		var s = parseInt(parts[0] || '2025', 10) + 1;
// 		var e = parseInt(parts[1] || '26',   10) + 1;
// 		return s + '-' + String(e).slice(-2) + ' Budget';
// 	}

// 	// Build estimate year label e.g. "2025-26" → "2025-26 Est"
// 	function getEstYearLabel(fy) {
// 		return (fy || '2025-26') + ' Est';
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
// 			var m = (typeof msg === 'string' && msg.length) ? msg : 'Loading, please wait';
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
// 	// SHARED DATA STORE
// 	// =============================================================================

// 	var Store = {
// 		ppt           : { rows: [], prevRows: [], budgetLabel: '', estLabel: '', prevBudgetLabel: '', prevEstLabel: '' },
// 		annual        : [],
// 		estimate      : [],
// 		budgetEstimate: []
// 	};

// 	// =============================================================================
// 	// GLOBAL STYLES
// 	// =============================================================================

// 	$(page.body).append(
// 		'<style>' +
// 		':root{' +
// 			'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
// 			'--orange:#F26B21;--orange-light:#FFF3E6;' +
// 			'--border:#bbb;--border-light:#ddd;--border-header:#005f94;--border-orange:#d45a10;' +
// 		'}' +
// 		'.cb-wrapper{padding:15px;background:#fff;}' +

// 		/* Tab nav */
// 		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
// 		'#cb-tab-nav li{display:inline-block;}' +
// 		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:9px 20px;color:#555;font-size:15px;font-weight:400;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s;}' +
// 		'#cb-tab-nav .cb-tab-link.active{color:#003B63;font-weight:700;border-bottom:3px solid #003B63;}' +
// 		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +

// 		/* Filter row */
// 		'.cb-filter-row{padding:8px 0;background:#fff;margin-bottom:10px;}' +
// 		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
// 		'@media(max-width:768px){.cb-filter-row{padding:8px;}.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +

// 		/* Controls bar */
// 		'.cb-controls{display:flex;align-items:center;padding:6px 10px;margin-bottom:10px;background:#f7f9fb;border:1px solid #e2e6ea;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
// 		'.cb-controls-left{display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap;}' +
// 		'.cb-controls-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}' +

// 		/* Search */
// 		'.cb-search-wrap{position:relative;display:flex;align-items:center;}' +
// 		'.cb-search-wrap .search-icon{position:absolute;left:8px;color:#8d99a6;pointer-events:none;}' +
// 		'.cb-search-input{padding:5px 8px 5px 28px;border:1px solid #d1d8dd;border-radius:4px;font-size:13px;color:#36414c;background:#fff;width:220px;height:30px;transition:border-color .15s,box-shadow .15s;}' +
// 		'.cb-search-input:focus{outline:none;border-color:#5e64ff;box-shadow:0 0 0 2px rgba(94,100,255,.15);}' +

// 		/* Checkboxes */
// 		'.cb-checkbox-area{display:flex;gap:12px;align-items:center;}' +
// 		'.cb-check-label{display:flex;align-items:center;gap:5px;font-size:13px;font-weight:500;color:#36414c;cursor:pointer;user-select:none;white-space:nowrap;}' +
// 		'.cb-check-label input[type=checkbox]{width:14px;height:14px;cursor:pointer;accent-color:#5e64ff;}' +

// 		/* Export button */
// 		'.cb-xl-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;height:30px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;border:1px solid #1a1a1a;border-radius:4px;background:#1a1a1a;color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.15);transition:background .15s,border-color .15s;}' +
// 		'.cb-xl-btn:hover{background:#333;border-color:#333;}' +
// 		'.cb-xl-btn svg{flex-shrink:0;color:#fff;}' +
// 		'#xl-export-all svg{vertical-align:middle;margin-right:3px;}' +

// 		/* Scroll wrapper */
// 		'.cb-scroll-wrapper{border:1px solid #d1d8dd;border-radius:6px;overflow:auto;max-height:72vh;background:#fff;}' +

// 		/* TABLE BASE */
// 		'.cb-table,.ppt-table-wrap{width:100%;border-collapse:collapse;font-size:15px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;table-layout:auto;}' +
// 		'.cb-table th,.cb-table td,.ppt-table-wrap th,.ppt-table-wrap td{border:1px solid #d1d8dd;padding:8px 12px;white-space:nowrap;text-align:right;}' +
// 		'.cb-table th:first-child,.cb-table td:first-child,.ppt-table-wrap th:first-child,.ppt-table-wrap td:first-child{text-align:left;}' +

// 		/* STICKY HEADERS */
// 		'.cb-thead-main th{background:#0076B6;color:#fff;font-weight:700;font-size:16px;text-align:center !important;position:sticky;top:0;z-index:25;border-color:#005f94;padding:10px 12px;}' +
// 		'.cb-thead-sub th{background:#F26B21;color:#fff;font-weight:600;font-size:15px;text-align:center !important;position:sticky;top:0;z-index:24;border-color:#c85810;min-width:110px;padding:8px 12px;}' +

// 		/* Row types */
// 		'.cb-row-head{font-weight:700;font-size:15px;cursor:pointer;background:#E9F4FB;color:#003B63;}' +
// 		'.cb-row-head:hover td{background:#d0e8f5;}' +
// 		'.cb-row-sub{background:#FFF3E6;font-weight:600;font-size:15px;cursor:pointer;}' +
// 		'.cb-row-sub:hover td{background:#ffe0c2;}' +
// 		'.cb-row-grand td{background:#0076B6 !important;color:#fff !important;font-weight:700;font-size:15px;border-color:#005f94 !important;}' +
// 		'.cb-text-accent{color:#0076B6;font-weight:600;}' +

// 		/* PPT tab */
// 		'#tab-ppt .ppt-table-wrap tbody tr td{font-size:16px;font-weight:400;}' +
// 		'#tab-ppt .ppt-table-wrap tbody tr.ppt-total-row td{font-size:16px;font-weight:700;background:#e8f0fa !important;color:#003B63 !important;border-color:#aaa !important;}' +

// 		/* PPT title */
// 		'.ppt-title-bar{margin:12px 0 4px;}' +
// 		'.ppt-main-title{font-size:15px;font-weight:700;text-transform:uppercase;text-decoration:underline;letter-spacing:.3px;color:#111;}' +
// 		'.ppt-currency-label{font-size:16px;font-style:italic;color:#555;text-align:right;margin-bottom:6px;}' +
// 		'.ppt-currency-label strong{font-weight:800;font-size:16px;font-style:normal;}' +

// 		/* PPT table */
// 		'.ppt-table-wrap thead tr.cb-thead-main th{border-color:#005f94;}' +
// 		'.ppt-table-wrap thead tr.cb-thead-sub th{border-color:#c85810;}' +
// 		'.ppt-table-wrap tbody tr td{background:#fff;color:#111;font-size:15px;}' +
// 		'.ppt-table-wrap tbody tr.ppt-total-row td{font-weight:700;font-size:15px;background:#e8f0fa !important;color:#003B63 !important;border-color:#aaa !important;}' +
// 		'.ppt-dash{color:#bbb;text-align:center;display:block;}' +

// 		/* BUDGET & ESTIMATE — sticky first column */
// 		'#be-table{border-collapse:collapse;}' +
// 		'#be-table tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:280px;max-width:280px;white-space:normal;word-break:break-word;}' +
// 		'#be-table tbody tr td:first-child{background:#fff;}' +
// 		'#be-table .cb-row-head td:first-child{background:#E9F4FB !important;}' +
// 		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6 !important;}' +
// 		'#be-table .cb-row-grand td:first-child{background:#0076B6 !important;}' +
// 		'#be-table thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:#0076B6;text-align:left !important;min-width:280px;}' +
// 		'#be-table .be-grand-col{background:#ddeaf7 !important;color:#003B63;border-left:2px solid #0076B6 !important;}' +
// 		'#be-table .cb-row-grand .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-head .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
// 		'#be-table .cb-row-sub  .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +
// 		'#be-table .cb-thead-main th:not(:first-child){min-width:260px;text-align:center !important;}' +
// 		'#be-table .cb-thead-sub th{min-width:130px;text-align:center !important;}' +
// 		'#be-table tbody td:first-child,#be-table thead th:first-child{box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +

// 		/* Summary INR */
// 		'.sinr-section-label{margin:18px 0 4px;font-size:13px;font-weight:700;color:#1a1a1a;text-decoration:underline;}' +
// 		'.sinr-currency-note{text-align:right;font-size:12px;font-style:italic;color:#555;margin-bottom:4px;}' +
// 		'.sinr-table td,.sinr-table th{font-size:13px !important;}' +
// 		'.sinr-total-row td{font-weight:700 !important;background:#e8f0fa !important;color:#003B63 !important;border-top:2px solid #aaa !important;}' +
// 		'.sinr-sub-item td:first-child{padding-left:22px !important;color:#444;}' +

// 		/* Headcount KPI cards */
// 		'.hc-kpi-card{background:#f0f6fb;border:1px solid #cde0f0;border-radius:8px;padding:14px 20px;min-width:180px;flex:1;}' +
// 		'.hc-kpi-label{font-size:12px;color:#555;font-weight:500;margin-bottom:4px;}' +
// 		'.hc-kpi-value{font-size:22px;font-weight:700;color:#003B63;}' +
// 		'.hc-section-title{margin:22px 0 6px;font-size:14px;font-weight:700;color:#003B63;text-transform:uppercase;letter-spacing:.4px;border-left:4px solid #0076B6;padding-left:10px;}' +

// 		/* Loader */
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
// 	// HELPERS
// 	// =============================================================================

// 	function formatINR(v) {
// 		var n = Math.round(parseFloat(v) || 0);
// 		var neg = n < 0;
// 		var s   = String(Math.abs(n));
// 		if (s.length > 3) {
// 			var last3 = s.slice(-3);
// 			var rest  = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
// 			s = rest + ',' + last3;
// 		}
// 		return (neg ? '-' : '') + s;
// 	}

// 	function fixStickySubHeader(tableSelector) {
// 		setTimeout(function () {
// 			var $table = $(tableSelector);
// 			if (!$table.length) { return; }
// 			var $mainRow = $table.find('thead tr.cb-thead-main');
// 			var $subRow  = $table.find('thead tr.cb-thead-sub');
// 			if (!$mainRow.length || !$subRow.length) { return; }
// 			var h = $mainRow[0].getBoundingClientRect().height || $mainRow.outerHeight(true) || 0;
// 			if (h > 0) { $subRow.find('th').css('top', h + 'px'); }
// 		}, 50);
// 	}

// 	function xlBtn(id, label) {
// 		return (
// 			'<button class="cb-xl-btn" id="' + id + '">' +
// 				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
// 					'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
// 					'<polyline points="14 2 14 8 20 8"/>' +
// 					'<line x1="8" y1="13" x2="16" y2="13"/>' +
// 					'<line x1="8" y1="17" x2="16" y2="17"/>' +
// 					'<line x1="10" y1="9" x2="8" y2="9"/>' +
// 				'</svg>' +
// 				label +
// 			'</button>'
// 		);
// 	}

// 	function controlsBar(searchId, searchPlaceholder, checks, exportId) {
// 		var checkHtml = checks.map(function (c) {
// 			return (
// 				'<label class="cb-check-label">' +
// 					'<input type="checkbox" id="' + c.id + '"> ' + c.label +
// 				'</label>'
// 			);
// 		}).join('');
// 		return (
// 			'<div class="cb-controls">' +
// 				'<div class="cb-controls-left">' +
// 					'<div class="cb-search-wrap">' +
// 						'<svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
// 						'<input type="text" id="' + searchId + '" class="cb-search-input" placeholder="' + searchPlaceholder + '">' +
// 					'</div>' +
// 					'<div class="cb-checkbox-area">' + checkHtml + '</div>' +
// 				'</div>' +
// 				'<div class="cb-controls-right">' + xlBtn(exportId, 'Export to Excel') + '</div>' +
// 			'</div>'
// 		);
// 	}

// 	// =============================================================================
// 	// HTML SKELETON
// 	// =============================================================================

// 	$(page.body).append(
// 		'<div class="cb-wrapper">' +

// 			'<div class="frappe-control-group row cb-filter-row" id="cb-filter-row"></div>' +

// 			'<ul id="cb-tab-nav">' +
// 				'<li><a class="cb-tab-link active" data-tab="ppt">Foundation level/Overall metrics</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="summary_inr">Summary in INR</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="headcount">Headcount</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="estimate">Estimate Consolidated</a></li>' +
// 				'<li><a class="cb-tab-link" data-tab="budget_estimate">Budget &amp; Estimate</a></li>' +
// 			'</ul>' +

// 			'<div id="cb-tab-content">' +

// 				/* ── PPT TAB ── */
// 				'<div class="cb-tab-pane active" id="tab-ppt">' +
// 					'<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">' +
// 						xlBtn('xl-ppt', 'Export to Excel') +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-main-title">Overall Foundation - Budget vs. Estimate</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
// 						'<table id="ppt-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-prev-title">Overall Foundation - Previous Year Budget vs. Estimate</div></div>' +
// 					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table id="ppt-prev-table" class="ppt-table-wrap">' +
// 							'<thead>' +
// 								'<tr class="cb-thead-main">' +
// 									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
// 									'<th colspan="3" id="ppt-prev-budget-hdr">Budget</th>' +
// 									'<th colspan="3" id="ppt-prev-est-hdr">Estimate</th>' +
// 								'</tr>' +
// 								'<tr class="cb-thead-sub">' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 									'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 								'</tr>' +
// 							'</thead>' +
// 							'<tbody id="ppt-prev-tbody"></tbody>' +
// 						'</table>' +
// 					'</div>' +
// 				'</div>' +

// 				'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
// 				'<div class="cb-tab-pane" id="tab-headcount"></div>' +

// 				/* ── ANNUAL BUDGET TAB ── */
// 				'<div class="cb-tab-pane" id="tab-annual_budget">' +
// 					controlsBar(
// 						'annual-search', 'Search expense / item\u2026',
// 						[
// 							{ id: 'annual-expand-quarters', label: 'Expand Quarters' },
// 							{ id: 'annual-expand-items',    label: 'Expand Line Items' }
// 						],
// 						'xl-annual'
// 					) +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* ── ESTIMATE TAB ── */
// 				'<div class="cb-tab-pane" id="tab-estimate">' +
// 					controlsBar(
// 						'estimate-search', 'Search expense / item\u2026',
// 						[
// 							{ id: 'estimate-expand-quarters', label: 'Expand Quarters' },
// 							{ id: 'estimate-expand-items',    label: 'Expand Line Items' }
// 						],
// 						'xl-estimate'
// 					) +
// 					'<div class="cb-scroll-wrapper">' +
// 						'<table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table>' +
// 					'</div>' +
// 				'</div>' +

// 				/* ── BUDGET & ESTIMATE TAB ── */
// 				'<div class="cb-tab-pane" id="tab-budget_estimate">' +
// 					controlsBar(
// 						'be-search', 'Search expense / item\u2026',
// 						[
// 							{ id: 'be-expand-items', label: 'Expand Line Items' }
// 						],
// 						'xl-be'
// 					) +
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
// 		method: 'annual_budget.api.filter_options.get_financial_year_list',
// 		callback: function (r) {
// 			if (r.message && r.message.length) {
// 				var years = r.message.map(function (d) { return d.financial_year; });
// 				fyControl.df.options = years.join('\n');
// 				fyControl.refresh();
// 				var today     = new Date();
// 				var year      = today.getFullYear();
// 				var month     = today.getMonth() + 1;
// 				var currentFY = (month >= 4)
// 					? year + '-' + String(year + 1).slice(-2)
// 					: (year - 1) + '-' + String(year).slice(-2);
// 				var target = years.indexOf(currentFY) !== -1 ? currentFY : years[0];
// 				fyControl.set_value(target);
// 				updatePageTitle(target);
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
// 			ppt            : function (fy) { PPT.load(fy);            },
// 			summary_inr    : function (fy) { SummaryINR.load(fy);     },
// 			headcount      : function (fy) { Headcount.load(fy);      },
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
// 	// SERVER-SIDE EXCEL DOWNLOAD HELPER
// 	// =============================================================================

// 	function downloadFromB64(b64, filename) {
// 		var binary = atob(b64);
// 		var bytes  = new Uint8Array(binary.length);
// 		for (var i = 0; i < binary.length; i++) { bytes[i] = binary.charCodeAt(i); }
// 		var blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
// 		var url  = URL.createObjectURL(blob);
// 		var a    = document.createElement('a');
// 		a.href = url; a.download = filename;
// 		document.body.appendChild(a);
// 		a.click();
// 		setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
// 	}

// 	function serverExport(method, args, loadingMsg) {
// 		Loader.show(loadingMsg || 'Preparing your Excel file');
// 		frappe.call({
// 			method  : method,
// 			args    : args,
// 			callback: function (r) {
// 				Loader.hide();
// 				if (r.message && r.message.data) {
// 					downloadFromB64(r.message.data, r.message.filename);
// 				} else {
// 					frappe.msgprint('Export failed \u2014 no data returned from server.');
// 				}
// 			},
// 			error: function () {
// 				Loader.hide();
// 				frappe.msgprint('Server error during export. Please try again.');
// 			}
// 		});
// 	}

// 	// =============================================================================
// 	// PPT MODULE
// 	// =============================================================================

// 	var PPT = (function () {

// 		var currentFY = '';

// 		function toCr(v) { return (parseFloat(v) || 0) / 10000000; }

// 		function fmt(v) {
// 			var n = parseFloat(v) || 0;
// 			if (n === 0) { return '<span class="ppt-dash">-</span>'; }
// 			var neg = n < 0;
// 			var abs = Math.abs(n).toFixed(2);
// 			var pts = abs.split('.');
// 			var ip  = pts[0], dp = pts[1];
// 			if (ip.length > 3) {
// 				var l3 = ip.slice(-3);
// 				var rs = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
// 				ip = rs + ',' + l3;
// 			}
// 			return (neg ? '-' : '') + ip + '.' + dp;
// 		}

// 		function transformResponse(message, idx) {
// 			var normalRows = [], covidRows  = [];
// 			var sub = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };
// 			var cov = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };

// 			(message || []).forEach(function (entity) {
// 				var label   = (entity.label || '').trim();
// 				var isCovid = label.toLowerCase().indexOf('covid') !== -1;
// 				var ofn     = (entity.overall_foundation_numbers || [])[idx] || {};
// 				var capEx   = ofn.capital_expenses   || {};
// 				var opEx    = ofn.operating_expenses || {};
// 				var bOpex   = toCr(opEx.budget);
// 				var bCapex  = toCr(capEx.budget);
// 				var eOpex   = toCr(opEx.actual);
// 				var eCapex  = toCr(capEx.actual);
// 				var row = { label:label, bOpex:bOpex, bCapex:bCapex, eOpex:eOpex, eCapex:eCapex };
// 				if (isCovid) {
// 					cov.bOpex+=bOpex; cov.bCapex+=bCapex; cov.eOpex+=eOpex; cov.eCapex+=eCapex;
// 					covidRows.push(row);
// 				} else {
// 					sub.bOpex+=bOpex; sub.bCapex+=bCapex; sub.eOpex+=eOpex; sub.eCapex+=eCapex;
// 					normalRows.push(row);
// 				}
// 			});

// 			var grand = {
// 				bOpex:sub.bOpex+cov.bOpex, bCapex:sub.bCapex+cov.bCapex,
// 				eOpex:sub.eOpex+cov.eOpex, eCapex:sub.eCapex+cov.eCapex
// 			};
// 			var rows = [];
// 			normalRows.forEach(function (r) { rows.push(r); });
// 			rows.push({ isSubTotal:true, label:'Total',
// 				bOpex:sub.bOpex, bCapex:sub.bCapex, eOpex:sub.eOpex, eCapex:sub.eCapex });
// 			covidRows.forEach(function (r) { rows.push(r); });
// 			if (covidRows.length) {
// 				rows.push({ isGrand:true, label:'Total',
// 					bOpex:grand.bOpex, bCapex:grand.bCapex, eOpex:grand.eOpex, eCapex:grand.eCapex });
// 			}
// 			return rows;
// 		}

// 		function parseHeadersFromTitle(title) {
// 			var budgetLabel = 'Budget', estLabel = 'Estimate';
// 			if (!title) { return { budgetLabel:budgetLabel, estLabel:estLabel }; }
// 			var m = title.match(/(\d{4}-\d{2})\s+BUDGET\s+VS\.\s+(\d{4}-\d{2})\s+EST/i);
// 			if (m) { budgetLabel = m[1]+' Budget'; estLabel = m[2]+' Estimate'; }
// 			return { budgetLabel:budgetLabel, estLabel:estLabel };
// 		}

// 		function renderTable(rows, apiTitle, tbodyId, titleId, budgetHdrId, estHdrId, tableId) {
// 			var displayTitle = (apiTitle || '')
// 				.replace(/^OVERALL FOUNDATION NUMBERS\s*-\s*/i, 'Overall Foundation - ')
// 				.replace(/\bBUDGET\b/g, 'Budget').replace(/\bVS\.\b/g, 'vs.').replace(/\bEST\b/g, 'Estimate');
// 			$('#'+titleId).text(displayTitle);
// 			var hdrs = parseHeadersFromTitle(apiTitle);
// 			$('#'+budgetHdrId).text(hdrs.budgetLabel);
// 			$('#'+estHdrId).text(hdrs.estLabel);
// 			var $tb = $('#'+tbodyId).empty();
// 			rows.forEach(function (row) {
// 				var cls = (row.isSubTotal||row.isGrand) ? 'ppt-total-row' : '';
// 				var bO=row.bOpex, bC=row.bCapex, eO=row.eOpex, eC=row.eCapex;
// 				$tb.append(
// 					'<tr class="'+cls+'">' +
// 					'<td>'+row.label+'</td>' +
// 					'<td>'+fmt(bO)+'</td><td>'+fmt(bC)+'</td><td>'+fmt(bO+bC)+'</td>' +
// 					'<td>'+fmt(eO)+'</td><td>'+fmt(eC)+'</td><td>'+fmt(eO+eC)+'</td>' +
// 					'</tr>'
// 				);
// 			});
// 			fixStickySubHeader('#'+tableId);
// 		}

// 		function fetchAndRender(fy) {
// 			$('#ppt-tbody,#ppt-prev-tbody').html(
// 				'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading\u2026</td></tr>'
// 			);
// 			Loader.show('Building your foundation metrics');
// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.add_expense_totals',
// 				args  : { financial_year:fy, month:'March', set_group_id:'4,5', previous_financial_year:getPrevFY(fy) },
// 				callback: function (r) {
// 					Loader.hide();
// 					var msg = null;
// 					if (r.message && Array.isArray(r.message))                          { msg = r.message; }
// 					else if (r.message && r.message.message && Array.isArray(r.message.message)) { msg = r.message.message; }
// 					if (!msg || !msg.length) {
// 						$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>');
// 						return;
// 					}
// 					var first  = msg[0] || {};
// 					var ofnArr = first.overall_foundation_numbers || [];
// 					var title0 = (ofnArr[0]||{}).title || '';
// 					var title1 = (ofnArr[1]||{}).title || '';
// 					var rows0  = transformResponse(msg, 0);
// 					var rows1  = transformResponse(msg, 1);
// 					renderTable(rows0, title0, 'ppt-tbody',      'ppt-main-title', 'ppt-budget-hdr',      'ppt-est-hdr',      'ppt-table');
// 					renderTable(rows1, title1, 'ppt-prev-tbody', 'ppt-prev-title', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr', 'ppt-prev-table');
// 					function toExportRows(rows) {
// 						return rows.map(function (row) {
// 							return { label:row.label, bOpex:row.bOpex, bCapex:row.bCapex, eOpex:row.eOpex, eCapex:row.eCapex,
// 								is_total:(row.isSubTotal===true||row.isGrand===true) };
// 						});
// 					}
// 					Store.ppt.rows            = toExportRows(rows0);
// 					Store.ppt.prevRows        = toExportRows(rows1);
// 					Store.ppt.budgetLabel     = $('#ppt-budget-hdr').text();
// 					Store.ppt.estLabel        = $('#ppt-est-hdr').text();
// 					Store.ppt.prevBudgetLabel = $('#ppt-prev-budget-hdr').text();
// 					Store.ppt.prevEstLabel    = $('#ppt-prev-est-hdr').text();
// 				},
// 				error: function () {
// 					Loader.hide();
// 					$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>');
// 				}
// 			});
// 		}

// 		function load(fy) { currentFY = fy || '2025-26'; fetchAndRender(currentFY); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// SUMMARY IN INR MODULE
// 	// =============================================================================

// 	var SummaryINR = (function () {

// 		// Convert raw rupees → crores, formatted with 2 decimal places
// 		function fmtCr(v) {
// 			var n = parseFloat(v) || 0;
// 			if (n === 0) { return '-'; }
// 			var cr  = n / 10000000;
// 			var neg = cr < 0;
// 			var abs = Math.abs(cr).toFixed(2);
// 			var pts = abs.split('.');
// 			var ip  = pts[0], dp = pts[1];
// 			if (ip.length > 3) {
// 				var l3 = ip.slice(-3);
// 				var rs = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
// 				ip = rs + ',' + l3;
// 			}
// 			return (neg ? '-' : '') + ip + '.' + dp;
// 		}

// 		// Build flat row list from API array — separates COVID rows, adds totals
// 		function buildRows(apiRows) {
// 			var normalRows = [], covidRows = [];
// 			var subTot = { opex_b:0, capex_b:0, total_b:0, opex_a:0, capex_a:0, total_a:0 };
// 			var covTot = { opex_b:0, capex_b:0, total_b:0, opex_a:0, capex_a:0, total_a:0 };

// 			(apiRows || []).forEach(function (r) {
// 				var label   = (r.label || '').trim();
// 				var isCovid = label.toLowerCase().indexOf('covid') !== -1;
// 				var ob = parseFloat((r.operating_expenses || {}).budget || 0);
// 				var oa = parseFloat((r.operating_expenses || {}).actual || 0);
// 				var cb = parseFloat((r.capital_expenses   || {}).budget || 0);
// 				var ca = parseFloat((r.capital_expenses   || {}).actual || 0);
// 				var tb = parseFloat((r.grand_total        || {}).budget || 0);
// 				var ta = parseFloat((r.grand_total        || {}).actual || 0);
// 				var row = { label:label, opex_b:ob, capex_b:cb, total_b:tb, opex_a:oa, capex_a:ca, total_a:ta };
// 				if (isCovid) {
// 					covidRows.push(row);
// 					covTot.opex_b+=ob; covTot.capex_b+=cb; covTot.total_b+=tb;
// 					covTot.opex_a+=oa; covTot.capex_a+=ca; covTot.total_a+=ta;
// 				} else {
// 					normalRows.push(row);
// 					subTot.opex_b+=ob; subTot.capex_b+=cb; subTot.total_b+=tb;
// 					subTot.opex_a+=oa; subTot.capex_a+=ca; subTot.total_a+=ta;
// 				}
// 			});

// 			var out = normalRows.slice();
// 			// Sub-total row
// 			out.push({ label:'Total', isTotal:true,
// 				opex_b:subTot.opex_b, capex_b:subTot.capex_b, total_b:subTot.total_b,
// 				opex_a:subTot.opex_a, capex_a:subTot.capex_a, total_a:subTot.total_a });
// 			// COVID rows + grand total
// 			if (covidRows.length) {
// 				covidRows.forEach(function (r) { out.push(r); });
// 				out.push({ label:'Total', isGrandTotal:true,
// 					opex_b  : subTot.opex_b   + covTot.opex_b,
// 					capex_b : subTot.capex_b  + covTot.capex_b,
// 					total_b : subTot.total_b  + covTot.total_b,
// 					opex_a  : subTot.opex_a   + covTot.opex_a,
// 					capex_a : subTot.capex_a  + covTot.capex_a,
// 					total_a : subTot.total_a  + covTot.total_a
// 				});
// 			}
// 			return out;
// 		}

// 		// Render one section block (e.g. "A. Unit Wise Plan")
// 		function renderSection(sectionLabel, rows, budgetColLabel, estColLabel) {
// 			var bodyRows = '';
// 			rows.forEach(function (r) {
// 				var tdStyle = '';
// 				var trCls   = '';
// 				if (r.isTotal) {
// 					trCls = 'sinr-total-row';
// 				} else if (r.isGrandTotal) {
// 					trCls = 'cb-row-grand';
// 				}
// 				bodyRows +=
// 					'<tr class="' + trCls + '">' +
// 					'<td style="text-align:left;padding-left:8px;">' + r.label + '</td>' +
// 					'<td>' + fmtCr(r.opex_b)  + '</td>' +
// 					'<td>' + fmtCr(r.capex_b) + '</td>' +
// 					'<td>' + fmtCr(r.total_b) + '</td>' +
// 					'<td>' + fmtCr(r.opex_a)  + '</td>' +
// 					'<td>' + fmtCr(r.capex_a) + '</td>' +
// 					'<td>' + fmtCr(r.total_a) + '</td>' +
// 					'</tr>';
// 			});

// 			return (
// 				'<div class="sinr-section-label">' + sectionLabel + '</div>' +
// 				'<div class="sinr-currency-note">&#8377; Cr.</div>' +
// 				'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
// 					'<table class="cb-table sinr-table" style="width:100%;">' +
// 					'<thead>' +
// 						'<tr class="cb-thead-main">' +
// 							'<th rowspan="2" style="text-align:left !important;min-width:230px;">Unit / Function</th>' +
// 							'<th colspan="3" style="text-align:center !important;">' + budgetColLabel + '</th>' +
// 							'<th colspan="3" style="text-align:center !important;">' + estColLabel    + '</th>' +
// 						'</tr>' +
// 						'<tr class="cb-thead-sub">' +
// 							'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 							'<th>Opex</th><th>Capex</th><th>Total</th>' +
// 						'</tr>' +
// 					'</thead>' +
// 					'<tbody>' + bodyRows + '</tbody>' +
// 					'</table>' +
// 				'</div>'
// 			);
// 		}

// 		function fetchAndRender(fy) {
// 			var $tab = $('#tab-summary_inr');
// 			$tab.html('<div style="padding:20px;text-align:center;color:#aaa;">Loading\u2026</div>');
// 			Loader.show('Building Summary in INR\u2026');
// 			var fyParts   = (fy || '2025-26').split('-');
// 			var fyStart   = parseInt(fyParts[0] || '2025', 10);
// 			var fyEndYY   = fyParts[1] || '26';
// 			var budgetCol = (fyStart + 1) + '-' + String(parseInt(fyEndYY, 10) + 1).slice(-2) + ' Budget';
// 			var estCol    = fy + ' Est';

// 			frappe.call({
// 				method: 'annual_budget.api.foundation_consolidated_report.format_api_1',
// 				args  : { financial_year: fy, month: 'March', table_name_filter: 'Unit Wise Plan' },
// 				callback: function (r) {
// 					Loader.hide();

// 					// unwrap nested message structure
// 					var msg = null;
// 					if (r.message && r.message.message)      { msg = r.message.message; }
// 					else if (r.message)                      { msg = r.message; }

// 					if (!msg || typeof msg !== 'object' || !Object.keys(msg).length) {
// 						$tab.html('<div style="padding:40px;text-align:center;color:#aaa;">No data available.</div>');
// 						return;
// 					}

// 					var html    = '';
// 					var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// 					var idx     = 0;

// 					Object.keys(msg).forEach(function (sectionKey) {
// 						var apiRows = msg[sectionKey];
// 						var letter  = letters[idx] || String(idx + 1);
// 						var label   = letter + '. ' + sectionKey;
// 						var rows    = buildRows(apiRows);
// 						html += renderSection(label, rows, budgetCol, estCol);
// 						idx++;
// 					});

// 					$tab.html(
// 						'<div style="padding:4px 0 10px;">' +
// 							'<div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' +
// 								xlBtn('xl-summary-inr', 'Export to Excel') +
// 							'</div>' +
// 							html +
// 						'</div>'
// 					);

// 					// fix sticky sub-headers for every rendered table
// 					$tab.find('.cb-scroll-wrapper table').each(function () {
// 						fixStickySubHeader(this);
// 					});
// 				},
// 				error: function () {
// 					Loader.hide();
// 					$('#tab-summary_inr').html(
// 						'<div style="padding:40px;text-align:center;color:red;">Error loading Summary in INR data.</div>'
// 					);
// 				}
// 			});
// 		}

// 		function load(fy) { fetchAndRender(fy); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// HEADCOUNT MODULE
// 	// =============================================================================

// 	var Headcount = (function () {

// 		// ── static data (replace with API call when endpoint is ready) ────────────

// 		var SUMMARY = [
// 			{ unit:'Field',                       avgHC_24:843,  avgHC_25:1343, pct_avg:59,   fy_est:2137.5, fy_plan:3834.9, pct_plan:43,   opex_est:205.1, opex_plan:null },
// 			{ unit:'Schools',                     avgHC_24:177,  avgHC_25:185,  pct_avg:30,   fy_est:162.7,  fy_plan:236.8,  pct_plan:45,   opex_est:26.8,  opex_plan:null },
// 			{ unit:'University - Bangalore',      avgHC_24:198,  avgHC_25:185,  pct_avg:30,   fy_est:107.2,  fy_plan:144.5,  pct_plan:35,   opex_est:null,  opex_plan:null },
// 			{ unit:'University - Bhopal',         avgHC_24:45,   avgHC_25:100,  pct_avg:23,   fy_est:49.3,   fy_plan:57.0,   pct_plan:95,   opex_est:null,  opex_plan:null },
// 			{ unit:'University - Jharkhand',      avgHC_24:null, avgHC_25:null, pct_avg:null, fy_est:0.3,    fy_plan:1.9,    pct_plan:539,  opex_est:null,  opex_plan:null },
// 			{ unit:'Philanthropy',                avgHC_24:59,   avgHC_25:120,  pct_avg:null, fy_est:1083.6, fy_plan:1414.6, pct_plan:30,   opex_est:null,  opex_plan:null },
// 			{ unit:'Health',                      avgHC_24:15,   avgHC_25:33,   pct_avg:179,  fy_est:166.2,  fy_plan:191.1,  pct_plan:14,   opex_est:null,  opex_plan:null },
// 			{ unit:'Livelihoods',                 avgHC_24:30,   avgHC_25:71,   pct_avg:109,  fy_est:5.9,    fy_plan:5.0,    pct_plan:-15,  opex_est:null,  opex_plan:null },
// 			{ unit:'New Initiatives',             avgHC_24:1,    avgHC_25:12,   pct_avg:23,   fy_est:385.9,  fy_plan:3625.1, pct_plan:327,  opex_est:null,  opex_plan:null },
// 			{ unit:'Enablers & Education Grants', avgHC_24:56,   avgHC_25:122,  pct_avg:null, fy_est:null,   fy_plan:null,   pct_plan:null, opex_est:null,  opex_plan:null },
// 			{ unit:'Total',                       avgHC_24:null, avgHC_25:2387, pct_avg:29,   fy_est:2137.5, fy_plan:3834.9, pct_plan:79,   opex_est:null,  opex_plan:null, isTotal:true }
// 		];

// 		var CLOSING = [
// 			{ unit:'Field',                       d24:1286, d25:1399, d26:1999 },
// 			{ unit:'Schools',                     d24:177,  d25:193,  d26:289  },
// 			{ unit:'University - Bangalore',      d24:396,  d25:408,  d26:543  },
// 			{ unit:'University - Bhopal',         d24:90,   d25:109,  d26:140  },
// 			{ unit:'University - Jharkhand',      d24:null, d25:null, d26:5    },
// 			{ unit:'Philanthropy',                d24:117,  d25:123,  d26:184  },
// 			{ unit:'Health',                      d24:60,   d25:82,   d26:229  },
// 			{ unit:'Livelihoods',                 d24:30,   d25:36,   d26:59   },
// 			{ unit:'New Initiatives',             d24:1,    d25:23,   d26:144  },
// 			{ unit:'Enablers',                    d24:112,  d25:131,  d26:169  },
// 			{ unit:'Total',                       d24:2269, d25:2504, d26:3661, isTotal:true }
// 		];

// 		var AVERAGE = [
// 			{ unit:'Field',                       d24:843,  d25:1343, d26:1649 },
// 			{ unit:'Schools',                     d24:88,   d25:185,  d26:241  },
// 			{ unit:'University - Bangalore',      d24:198,  d25:402,  d26:476  },
// 			{ unit:'University - Bhopal',         d24:45,   d25:100,  d26:125  },
// 			{ unit:'University - Jharkhand',      d24:null, d25:null, d26:3    },
// 			{ unit:'Philanthropy',                d24:59,   d25:120,  d26:154  },
// 			{ unit:'Health',                      d24:30,   d25:71,   d26:156  },
// 			{ unit:'Livelihoods',                 d24:15,   d25:33,   d26:48   },
// 			{ unit:'New Initiatives',             d24:1,    d25:12,   d26:84   },
// 			{ unit:'Enablers & Education Grants', d24:56,   d25:122,  d26:150  },
// 			{ unit:'Total',                       d24:null, d25:2387, d26:3083, isTotal:true }
// 		];

// 		var CLOSING_PCT = [
// 			{ unit:'Field',                       p1:'8.8%',    p2:'35.7%'  },
// 			{ unit:'Schools',                     p1:'9.0%',    p2:'49.7%'  },
// 			{ unit:'University - Bangalore',      p1:'3.0%',    p2:'33.1%'  },
// 			{ unit:'University - Bhopal',         p1:'21.1%',   p2:'28.4%'  },
// 			{ unit:'University - Jharkhand',      p1:'-',       p2:'-'      },
// 			{ unit:'Philanthropy',                p1:'5.1%',    p2:'49.6%'  },
// 			{ unit:'Health',                      p1:'36.7%',   p2:'179.3%' },
// 			{ unit:'Livelihoods',                 p1:'20.0%',   p2:'63.9%'  },
// 			{ unit:'New Initiatives',             p1:'2200.0%', p2:'526.1%' },
// 			{ unit:'Enablers & Education Grants', p1:'17.0%',   p2:'29.0%'  },
// 			{ unit:'Total',                       p1:'10.4%',   p2:'46.2%', isTotal:true }
// 		];

// 		var AVERAGE_PCT = [
// 			{ unit:'Field',                       p1:'108.0%',  p2:'22.8%'  },
// 			{ unit:'Schools',                     p1:'109.0%',  p2:'30.3%'  },
// 			{ unit:'University - Bangalore',      p1:'103.0%',  p2:'18.3%'  },
// 			{ unit:'University - Bhopal',         p1:'121.1%',  p2:'25.1%'  },
// 			{ unit:'University - Jharkhand',      p1:'-',       p2:'-'      },
// 			{ unit:'Philanthropy',                p1:'105.1%',  p2:'27.9%'  },
// 			{ unit:'Health',                      p1:'136.7%',  p2:'119.0%' },
// 			{ unit:'Livelihoods',                 p1:'120.0%',  p2:'43.9%'  },
// 			{ unit:'New Initiatives',             p1:'2300.0%', p2:'395.8%' },
// 			{ unit:'Enablers & Education Grants', p1:'117.0%',  p2:'23.5%'  },
// 			{ unit:'Total',                       p1:'110.4%',  p2:'29.2%', isTotal:true }
// 		];

// 		// ── helpers ───────────────────────────────────────────────────────────────

// 		function dash(v) { return (v === null || v === undefined || v === '') ? '-' : v; }
// 		function fmtNum(v) {
// 			if (v === null || v === undefined) { return '-'; }
// 			var n = Math.round(parseFloat(v));
// 			return isNaN(n) ? '-' : n.toLocaleString('en-IN');
// 		}
// 		function fmtDec(v) {
// 			if (v === null || v === undefined) { return '-'; }
// 			var n = parseFloat(v);
// 			return isNaN(n) ? '-' : n.toFixed(1);
// 		}
// 		function hcSection(text) {
// 			return '<div class="hc-section-title">' + text + '</div>';
// 		}
// 		function scrollWrap(inner) {
// 			return '<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' + inner + '</div>';
// 		}

// 		// ── KPI cards ─────────────────────────────────────────────────────────────

// 		function renderStats() {
// 			var stats = [
// 				{ label:'Total Closing H/C (Mar-26 Plan)',  value:'3,661' },
// 				{ label:'Total Average H/C (FY25-26 Plan)', value:'3,083' },
// 				{ label:'YoY Growth \u2014 Closing',         value:'46.2%' },
// 				{ label:'YoY Growth \u2014 Average',         value:'29.2%' }
// 			];
// 			return '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px;">' +
// 				stats.map(function (s) {
// 					return '<div class="hc-kpi-card"><div class="hc-kpi-label">' + s.label +
// 						'</div><div class="hc-kpi-value">' + s.value + '</div></div>';
// 				}).join('') +
// 			'</div>';
// 		}

// 		// ── Table 1: Summary ─────────────────────────────────────────────────────

// 		function renderSummary() {
// 			var rows = '';
// 			SUMMARY.forEach(function (r) {
// 				var cls = r.isTotal ? 'cb-row-grand' : '';
// 				rows += '<tr class="' + cls + '">' +
// 					'<td style="text-align:left;">' + r.unit + '</td>' +
// 					'<td>' + fmtNum(r.avgHC_24)  + '</td>' +
// 					'<td>' + fmtNum(r.avgHC_25)  + '</td>' +
// 					'<td>' + dash(r.pct_avg  !== null ? r.pct_avg  + '%' : null) + '</td>' +
// 					'<td>' + fmtDec(r.fy_est)    + '</td>' +
// 					'<td>' + fmtDec(r.fy_plan)   + '</td>' +
// 					'<td>' + dash(r.pct_plan !== null ? r.pct_plan + '%' : null) + '</td>' +
// 					'<td>' + fmtDec(r.opex_est)  + '</td>' +
// 					'<td>' + fmtDec(r.opex_plan) + '</td>' +
// 					'</tr>';
// 			});
// 			return scrollWrap(
// 				'<table class="cb-table" style="width:100%;">' +
// 				'<thead>' +
// 				'<tr class="cb-thead-main">' +
// 				'<th rowspan="2" style="text-align:left !important;min-width:200px;">Unit</th>' +
// 				'<th colspan="3" style="text-align:center !important;">Average H/C</th>' +
// 				'<th colspan="3" style="text-align:center !important;">Opex Spend (&#8377; Cr.)</th>' +
// 				'<th colspan="2" style="text-align:center !important;">Opex Spend (&#8377; Cr.)</th>' +
// 				'</tr>' +
// 				'<tr class="cb-thead-sub">' +
// 				'<th>31-Mar-25</th><th>31-Mar-26 Plan</th><th>% Increase</th>' +
// 				'<th>FY24-25 Est</th><th>FY25-26 Plan</th><th>% Increase</th>' +
// 				'<th>FY24-25 Est</th><th>FY25-26 Plan</th>' +
// 				'</tr></thead><tbody>' + rows + '</tbody></table>'
// 			);
// 		}

// 		// ── Table 2: Closing H/C ────────────────────────────────────────────────

// 		function renderClosing() {
// 			var rows = '';
// 			CLOSING.forEach(function (r) {
// 				var cls    = r.isTotal ? 'cb-row-grand' : '';
// 				var d24val = r.isTotal ? fmtNum(r.d24)
// 					: '<span style="color:#C0392B;font-weight:600;">' + fmtNum(r.d24) + '</span>';
// 				rows += '<tr class="' + cls + '"><td style="text-align:left;">' + r.unit + '</td>' +
// 					'<td>' + d24val + '</td><td>' + fmtNum(r.d25) + '</td><td>' + fmtNum(r.d26) + '</td></tr>';
// 			});
// 			return scrollWrap(
// 				'<table class="cb-table" style="width:100%;max-width:620px;">' +
// 				'<thead><tr class="cb-thead-main">' +
// 				'<th style="text-align:left !important;min-width:220px;">Unit</th>' +
// 				'<th>31-Mar-24</th><th>31-Mar-25</th><th>31-Mar-26</th>' +
// 				'</tr></thead><tbody>' + rows + '</tbody></table>'
// 			);
// 		}

// 		// ── Table 3: Average H/C ────────────────────────────────────────────────

// 		function renderAverage() {
// 			var rows = '';
// 			AVERAGE.forEach(function (r) {
// 				var cls    = r.isTotal ? 'cb-row-grand' : '';
// 				var d24val = r.isTotal ? fmtNum(r.d24)
// 					: '<span style="color:#C0392B;font-weight:600;">' + fmtNum(r.d24) + '</span>';
// 				rows += '<tr class="' + cls + '"><td style="text-align:left;">' + r.unit + '</td>' +
// 					'<td>' + d24val + '</td><td>' + fmtNum(r.d25) + '</td><td>' + fmtNum(r.d26) + '</td></tr>';
// 			});
// 			return scrollWrap(
// 				'<table class="cb-table" style="width:100%;max-width:620px;">' +
// 				'<thead><tr class="cb-thead-main">' +
// 				'<th style="text-align:left !important;min-width:220px;">Unit</th>' +
// 				'<th>31-Mar-24</th><th>31-Mar-25</th><th>31-Mar-26</th>' +
// 				'</tr></thead><tbody>' + rows + '</tbody></table>'
// 			);
// 		}

// 		// ── Table 4: Increase in Closing H/C (%) ────────────────────────────────

// 		function renderClosingPct() {
// 			var rows = '';
// 			CLOSING_PCT.forEach(function (r) {
// 				var cls = r.isTotal ? 'cb-row-grand' : '';
// 				rows += '<tr class="' + cls + '"><td style="text-align:left;">' + r.unit + '</td>' +
// 					'<td>' + r.p1 + '</td><td>' + r.p2 + '</td></tr>';
// 			});
// 			return scrollWrap(
// 				'<table class="cb-table" style="width:100%;max-width:520px;">' +
// 				'<thead><tr class="cb-thead-main">' +
// 				'<th style="text-align:left !important;min-width:220px;">Unit</th>' +
// 				'<th>Mar-24 &#8594; Mar-25</th><th>Mar-25 &#8594; Mar-26</th>' +
// 				'</tr></thead><tbody>' + rows + '</tbody></table>'
// 			);
// 		}

// 		// ── Table 5: Increase in Average H/C (%) ────────────────────────────────

// 		function renderAveragePct() {
// 			var rows = '';
// 			AVERAGE_PCT.forEach(function (r) {
// 				var cls = r.isTotal ? 'cb-row-grand' : '';
// 				rows += '<tr class="' + cls + '"><td style="text-align:left;">' + r.unit + '</td>' +
// 					'<td>' + r.p1 + '</td><td>' + r.p2 + '</td></tr>';
// 			});
// 			return scrollWrap(
// 				'<table class="cb-table" style="width:100%;max-width:520px;">' +
// 				'<thead><tr class="cb-thead-main">' +
// 				'<th style="text-align:left !important;min-width:220px;">Unit</th>' +
// 				'<th>FY23-24 &#8594; FY24-25</th><th>FY24-25 &#8594; FY25-26</th>' +
// 				'</tr></thead><tbody>' + rows + '</tbody></table>'
// 			);
// 		}

// 		// ── Main render ──────────────────────────────────────────────────────────

// 		function render() {
// 			$('#tab-headcount').html(
// 				'<div style="padding:4px 0 10px;">' +
// 					'<div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' +
// 						xlBtn('xl-headcount', 'Export to Excel') +
// 					'</div>' +
// 					renderStats() +
// 					hcSection('Headcount Summary') +
// 					'<div class="ppt-currency-label" style="text-align:left;margin-bottom:6px;">' +
// 						'H/C numbers &nbsp;|&nbsp; Opex in &#8377; <strong>Cr.</strong>' +
// 					'</div>' +
// 					renderSummary() +
// 					hcSection('Closing H/C') +
// 					renderClosing() +
// 					hcSection('Average H/C') +
// 					renderAverage() +
// 					hcSection('Increase in Closing H/C (%)') +
// 					renderClosingPct() +
// 					hcSection('Increase in Average H/C (%)') +
// 					renderAveragePct() +
// 				'</div>'
// 			);
// 		}

// 		function load(/* fy */) { render(); }
// 		return { load: load };
// 	})();

// 	// =============================================================================
// 	// ANNUAL BUDGET MODULE
// 	// =============================================================================

// 	var Annual = (function () {

// 		var Q_DEFS = {
// 			q1: { label:'Quarter 1', months:['April','May','June'] },
// 			q2: { label:'Quarter 2', months:['July','August','September'] },
// 			q3: { label:'Quarter 3', months:['October','November','December'] },
// 			q4: { label:'Quarter 4', months:['January','February','March'] }
// 		};
// 		var Q_KEYS = ['q1','q2','q3','q4'];
// 		var data=[], expandedQ=[], openH={}, openS={}, bound=false;

// 		function sumArr(a) { var t=0; (a||[]).forEach(function(v){t+=(v||0);}); return t; }
// 		function objTotal(o) { var t=0; Q_KEYS.forEach(function(k){t+=sumArr(o[k]);}); return t; }

// 		function qCells(obj) {
// 			var html='';
// 			Q_KEYS.forEach(function (k) {
// 				var vals=obj[k]||[0,0,0];
// 				if (expandedQ.indexOf(k)!==-1) {
// 					vals.forEach(function(v){html+='<td>'+formatINR(v)+'</td>';});
// 				} else {
// 					html+='<td colspan="3">'+formatINR(sumArr(vals))+'</td>';
// 				}
// 			});
// 			return html;
// 		}

// 		function buildHeader() {
// 			var $t=$('#annual-table thead').empty();
// 			var $m=$('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense Head / Line Item</th>');
// 			Q_KEYS.forEach(function(k){
// 				var o=expandedQ.indexOf(k)!==-1;
// 				$m.append('<th class="cb-q-header" data-quarter="'+k+'" colspan="3" rowspan="'+(o?1:2)+'" style="cursor:pointer;">'+Q_DEFS[k].label+' '+(o?'▲':'▼')+'</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if (expandedQ.length) {
// 				var $s=$('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function(k){
// 					if(expandedQ.indexOf(k)!==-1){Q_DEFS[k].months.forEach(function(m){$s.append('<th>'+m+'</th>');});}
// 				});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#annual-table');
// 		}

// 		function renderTable() {
// 			buildHeader();
// 			var $tb=$('#annual-table tbody').empty();
// 			var term=$('#annual-search').val().trim().toLowerCase();
// 			var grand={q1:[0,0,0],q2:[0,0,0],q3:[0,0,0],q4:[0,0,0]};
// 			data.forEach(function(head,hi){
// 				if(term&&!matchSearch(head,term)){return;}
// 				var hs=String(hi),ho=openH[hs]===true;
// 				Q_KEYS.forEach(function(k){(head[k]||[0,0,0]).forEach(function(v,mi){grand[k][mi]+=(v||0);});});
// 				$tb.append(
// 					'<tr class="cb-row-head cb-annual-head" data-hi="'+hs+'">' +
// 					'<td><span class="cb-arrow">'+(ho?'▼':'▶')+'</span> '+head.name.trim()+'</td>' +
// 					qCells(head)+'<td class="cb-text-accent">'+formatINR(objTotal(head))+'</td></tr>'
// 				);
// 				(head.sub_heads||[]).forEach(function(sub,si){
// 					var sk=hs+'-'+si,so=openS[sk]===true;
// 					$tb.append(
// 						'<tr class="cb-row-sub cb-annual-sub" data-hi="'+hs+'" data-si="'+si+'" style="'+(ho?'':'display:none;')+'">' +
// 						'<td style="padding-left:22px;"><span class="cb-arrow">'+(so?'▼':'▶')+'</span> '+sub.name+'</td>' +
// 						qCells(sub)+'<td>'+formatINR(objTotal(sub))+'</td></tr>'
// 					);
// 					(sub.items||[]).forEach(function(item){
// 						$tb.append(
// 							'<tr class="cb-annual-sub-item" data-hi="'+hs+'" data-si="'+si+'" style="'+((ho&&so)?'':'display:none;')+'">' +
// 							'<td style="padding-left:42px;">'+item.name+'</td>' +
// 							qCells(item)+'<td>'+formatINR(objTotal(item))+'</td></tr>'
// 						);
// 					});
// 				});
// 				(head.items||[]).forEach(function(d){
// 					$tb.append(
// 						'<tr class="cb-annual-head-item" data-hi="'+hs+'" style="'+(ho?'':'display:none;')+'">' +
// 						'<td style="padding-left:35px;">'+d.name+'</td>' +
// 						qCells(d)+'<td>'+formatINR(objTotal(d))+'</td></tr>'
// 					);
// 				});
// 			});
// 			var gt=0; Q_KEYS.forEach(function(k){gt+=sumArr(grand[k]);});
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>'+qCells(grand)+'<td>'+formatINR(gt)+'</td></tr>');
// 		}

// 		function toggleHead(hs){
// 			openH[hs]=!(openH[hs]===true);
// 			if(!openH[hs]){data.forEach(function(h,hi){if(String(hi)!==hs){return;}(h.sub_heads||[]).forEach(function(_,si){openS[hs+'-'+si]=false;});});}
// 			renderTable();
// 		}
// 		function toggleSub(hs,ss){openS[hs+'-'+ss]=!(openS[hs+'-'+ss]===true);renderTable();}

// 		function matchSearch(head,term){
// 			if(!term){return true;}
// 			if(head.name.toLowerCase().indexOf(term)!==-1){return true;}
// 			for(var s=0;s<(head.sub_heads||[]).length;s++){
// 				if(head.sub_heads[s].name.toLowerCase().indexOf(term)!==-1){return true;}
// 				for(var i=0;i<(head.sub_heads[s].items||[]).length;i++){
// 					if((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 				}
// 			}
// 			for(var d=0;d<(head.items||[]).length;d++){
// 				if((head.items[d].name||'').toLowerCase().indexOf(term)!==-1){return true;}
// 			}
// 			return false;
// 		}

// 		function bindEvents(){
// 			$(document).on('input.annual','#annual-search',function(){renderTable();});
// 			$(document).on('change.annual','#annual-expand-quarters',function(){
// 				expandedQ=this.checked?Q_KEYS.slice():[];renderTable();
// 			});
// 			$(document).on('change.annual','#annual-expand-items',function(){
// 				if(this.checked){data.forEach(function(h,hi){openH[String(hi)]=true;(h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;});});}
// 				else{openH={};openS={};}
// 				renderTable();
// 			});
// 			$(document).on('click.annual','#annual-table .cb-q-header',function(){
// 				var k=String($(this).attr('data-quarter')),idx=expandedQ.indexOf(k);
// 				if(idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#annual-expand-quarters').prop('checked',expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$('#tab-annual_budget').on('click.annual','.cb-annual-head',function(e){e.stopPropagation();toggleHead(String($(this).attr('data-hi')));});
// 			$('#tab-annual_budget').on('click.annual','.cb-annual-sub', function(e){e.stopPropagation();toggleSub(String($(this).attr('data-hi')),String($(this).attr('data-si')));});
// 		}

// 		function fetchAndRender(fy){
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#annual-expand-quarters,#annual-expand-items').prop('checked',false);
// 			$('#annual-search').val('');
// 			Loader.show('We\u2019re stitching together your annual budget story');
// 			frappe.call({
// 				method  :'annual_budget.api.phase_sheet.get_consolidated_report',
// 				args    :{financial_year:fy},
// 				callback:function(r){data=r.message||[];Store.annual=data;renderTable();Loader.hide();},
// 				error   :function(){Loader.hide();frappe.msgprint('Error loading Annual Budget.');}
// 			});
// 		}

// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// ESTIMATE MODULE
// 	// =============================================================================

// 	var Estimate = (function () {

// 		var Q_DEFS={q1:{label:'Quarter 1',months:['April','May','June']},q2:{label:'Quarter 2',months:['July','August','September']},q3:{label:'Quarter 3',months:['October','November','December']},q4:{label:'Quarter 4',months:['January','February','March']}};
// 		var Q_KEYS=['q1','q2','q3','q4'];
// 		var Q_IDX={q1:[0,1,2],q2:[3,4,5],q3:[6,7,8],q4:[9,10,11]};
// 		var data=[],expandedQ=[],openH={},openS={},bound=false;

// 		function getMth(obj){var m=obj.months||{};return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)];}
// 		function qTot(obj){return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)];}
// 		function yTot(obj){var q=qTot(obj);return q[0]+q[1]+q[2]+q[3];}

// 		function qCells(obj){
// 			var mths=getMth(obj),qtots=qTot(obj),html='';
// 			Q_KEYS.forEach(function(q,qi){
// 				if(expandedQ.indexOf(q)!==-1){Q_IDX[q].forEach(function(mi){html+='<td>'+formatINR(mths[mi])+'</td>';});}
// 				else{html+='<td colspan="3">'+formatINR(qtots[qi])+'</td>';}
// 			});
// 			return html;
// 		}

// 		function buildHeader(){
// 			var $t=$('#estimate-table thead').empty();
// 			var $m=$('<tr class="cb-thead-main"></tr>');
// 			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense</th>');
// 			Q_KEYS.forEach(function(k){
// 				var o=expandedQ.indexOf(k)!==-1;
// 				$m.append('<th class="est-q-toggle" data-q="'+k+'" colspan="3" rowspan="'+(o?1:2)+'" style="cursor:pointer;">'+Q_DEFS[k].label+' '+(o?'▲':'▼')+'</th>');
// 			});
// 			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
// 			$t.append($m);
// 			if(expandedQ.length){
// 				var $s=$('<tr class="cb-thead-sub"></tr>');
// 				Q_KEYS.forEach(function(k){if(expandedQ.indexOf(k)!==-1){Q_DEFS[k].months.forEach(function(m){$s.append('<th>'+m+'</th>');});}});
// 				$t.append($s);
// 			}
// 			fixStickySubHeader('#estimate-table');
// 		}

// 		function renderTable(){
// 			buildHeader();
// 			var $tb=$('#estimate-tbody').empty();
// 			var term=$('#estimate-search').val().trim().toLowerCase();
// 			if(!Array.isArray(data)||!data.length){$tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');return;}
// 			var gM=[0,0,0,0,0,0,0,0,0,0,0,0],gQ=[0,0,0,0];
// 			data.forEach(function(head,hi){
// 				if(term&&!matchSearch(head,term)){return;}
// 				getMth(head).forEach(function(v,i){gM[i]+=v;});
// 				qTot(head).forEach(function(v,i){gQ[i]+=v;});
// 				var hs=String(hi),ho=openH[hs];
// 				$tb.append('<tr class="cb-row-head cb-est-head" data-hi="'+hs+'"><td><span class="cb-arrow">'+(ho?'▼':'▶')+'</span> '+head.name+'</td>'+qCells(head)+'<td class="cb-text-accent">'+formatINR(yTot(head))+'</td></tr>');
// 				(head.items||[]).forEach(function(item){
// 					$tb.append('<tr class="cb-est-head-item" data-hi="'+hs+'" style="'+(ho?'':'display:none;')+'"><td style="padding-left:28px;">'+item.name+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
// 				});
// 				(head.sub_heads||[]).forEach(function(sub,si){
// 					var sk=hs+'-'+si,so=openS[sk];
// 					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="'+hs+'" data-si="'+si+'" style="'+(ho?'':'display:none;')+'"><td style="padding-left:20px;"><span class="cb-arrow">'+(so?'▼':'▶')+'</span> '+sub.name+'</td>'+qCells(sub)+'<td>'+formatINR(yTot(sub))+'</td></tr>');
// 					(sub.items||[]).forEach(function(item){
// 						$tb.append('<tr class="cb-est-sub-item" data-hi="'+hs+'" data-si="'+si+'" style="'+((ho&&so)?'':'display:none;')+'"><td style="padding-left:44px;">'+item.name+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
// 					});
// 				});
// 			});
// 			var gO={Q1:gQ[0],Q2:gQ[1],Q3:gQ[2],Q4:gQ[3],months:{'4':gM[0],'5':gM[1],'6':gM[2],'7':gM[3],'8':gM[4],'9':gM[5],'10':gM[6],'11':gM[7],'12':gM[8],'1':gM[9],'2':gM[10],'3':gM[11]}};
// 			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>'+qCells(gO)+'<td>'+formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3])+'</td></tr>');
// 		}

// 		function toggleHead(hs){
// 			var o=!openH[hs];openH[hs]=o;
// 			$('#estimate-table tbody .cb-est-head[data-hi="'+hs+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			if(o){
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-head-item[data-hi="'+hs+'"]').show();
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){var si=$(this).attr('data-si');if(openS[hs+'-'+si]){$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+si+'"]').show();}});
// 			}else{
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){var si=$(this).attr('data-si');openS[hs+'-'+si]=false;$(this).find('.cb-arrow').text('▶');});
// 				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"],.cb-est-sub-item[data-hi="'+hs+'"],.cb-est-head-item[data-hi="'+hs+'"]').hide();
// 			}
// 		}
// 		function toggleSub(hs,ss){
// 			var sk=hs+'-'+ss,o=!openS[sk];openS[sk]=o;
// 			$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"][data-si="'+ss+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $i=$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+ss+'"]');
// 			o?$i.show():$i.hide();
// 		}
// 		function matchSearch(head,term){
// 			if(!term){return true;}
// 			if(head.name.toLowerCase().indexOf(term)!==-1){return true;}
// 			for(var s=0;s<(head.sub_heads||[]).length;s++){
// 				if(head.sub_heads[s].name.toLowerCase().indexOf(term)!==-1){return true;}
// 				for(var i=0;i<(head.sub_heads[s].items||[]).length;i++){if((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term)!==-1){return true;}}
// 			}
// 			for(var d=0;d<(head.items||[]).length;d++){if((head.items[d].name||'').toLowerCase().indexOf(term)!==-1){return true;}}
// 			return false;
// 		}
// 		function bindEvents(){
// 			$(document).on('click.estimate','#estimate-table .est-q-toggle',function(){
// 				var k=String($(this).attr('data-q')),idx=expandedQ.indexOf(k);
// 				if(idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
// 				$('#estimate-expand-quarters').prop('checked',expandedQ.length===Q_KEYS.length);
// 				renderTable();
// 			});
// 			$(document).on('change.estimate','#estimate-expand-quarters',function(){expandedQ=this.checked?Q_KEYS.slice():[];renderTable();});
// 			$(document).on('change.estimate','#estimate-expand-items',function(){
// 				if(this.checked){data.forEach(function(h,hi){openH[String(hi)]=true;(h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;});});}
// 				else{openH={};openS={};}
// 				renderTable();
// 			});
// 			$('#tab-estimate').on('click.estimate','.cb-est-head',function(e){e.stopPropagation();toggleHead(String($(this).attr('data-hi')));});
// 			$('#tab-estimate').on('click.estimate','.cb-est-sub', function(e){e.stopPropagation();toggleSub(String($(this).attr('data-hi')),String($(this).attr('data-si')));});
// 			$(document).on('input.estimate','#estimate-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy){
// 			data=[]; openH={}; openS={}; expandedQ=[];
// 			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked',false);
// 			var year=(getPrevFY(fy)||'2025-26').split('-')[0];
// 			Loader.show('We\u2019re shaping your projections into a smart view');
// 			frappe.call({
// 				method  :'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
// 				args    :{fiscal_year:year,accounting_period:'12'},
// 				callback:function(r){
// 					if(r.message){
// 						if(r.message.status==='success'){data=r.message.data||[];}
// 						else if(Array.isArray(r.message)){data=r.message;}
// 						else if(r.message.data&&Array.isArray(r.message.data)){data=r.message.data;}
// 						else{frappe.msgprint('Failed to load Estimate data.');}
// 					}else{frappe.msgprint('Failed to load Estimate data.');}
// 					Store.estimate=data; renderTable(); Loader.hide();
// 				},
// 				error:function(){Loader.hide();frappe.msgprint('Server error loading Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// BUDGET & ESTIMATE MODULE
// 	// =============================================================================

// 	var BudgetEstimate = (function () {

// 		var rawData=[],currentFY='',openSec={},openSub={},expandItems=false,bound=false;

// 		function pl(){return getFYLabels(currentFY).plan;}
// 		function el(){return getFYLabels(currentFY).est;}
// 		function entityLabel(e){return (e.label||'').trim();}

// 		function buildStruct(){
// 			if(!rawData.length){return [];}
// 			return (rawData[0].actuals||[]).map(function(sec){
// 				return {name:sec.name,
// 					sub_heads:(sec.sub_heads||[]).map(function(sub){return {name:sub.name,items:(sub.items||[]).map(function(i){return {name:i.name};})};} ),
// 					items:(sec.items||[]).map(function(i){return {name:i.name};})};
// 			});
// 		}

// 		function itemVal(entry,name,field){var v=0;(entry.actuals||[]).forEach(function(sec){(sec.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});(sec.sub_heads||[]).forEach(function(sub){(sub.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});});});return v;}
// 		function subVal(entry,sn,subn,field){var v=0;(entry.actuals||[]).forEach(function(sec){if(sec.name!==sn){return;}(sec.sub_heads||[]).forEach(function(sub){if(sub.name!==subn){return;}v+=parseFloat(field==='plan'?(sub.ytd||0):(sub.total_posted_amt_ytd||0));});});return v;}
// 		function secVal(entry,sn,field){var v=0;(entry.actuals||[]).forEach(function(sec){if(sec.name!==sn){return;}v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));});return v;}
// 		function grandVal(entry,field){var v=0;(entry.actuals||[]).forEach(function(sec){v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));});return v;}

// 		function itemCells(name){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(itemVal(e,name,'ytd'))+'</td><td>'+formatINR(itemVal(e,name,'total_posted_amt'))+'</td>';});return h;}
// 		function subCells(sn,subn){var h='';rawData.forEach(function(e){h+='<td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'plan'))+'</td><td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'est'))+'</td>';});return h;}
// 		function secCells(sn){var h='';rawData.forEach(function(e){h+='<td style="font-weight:700;">'+formatINR(secVal(e,sn,'plan'))+'</td><td style="font-weight:700;">'+formatINR(secVal(e,sn,'est'))+'</td>';});return h;}
// 		function grandCells(){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(grandVal(e,'plan'))+'</td><td>'+formatINR(grandVal(e,'est'))+'</td>';});return h;}
// 		function iTotP(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'ytd');});return v;}
// 		function iTotE(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'total_posted_amt');});return v;}
// 		function sTotP(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'plan');});return v;}
// 		function sTotE(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'est');});return v;}
// 		function secTP(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'plan');});return v;}
// 		function secTE(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'est');});return v;}
// 		function allGP(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'plan');});return v;}
// 		function allGE(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'est');});return v;}

// 		function tc2(plan,est,cls){
// 			cls=cls||'';
// 			return '<td class="be-total-plan '+cls+'" style="font-weight:700;">'+formatINR(plan)+'</td>' +
// 			       '<td class="be-total-est  '+cls+'" style="font-weight:700;">'+formatINR(est)+'</td>';
// 		}

// 		function buildHeader(){
// 			var $t=$('#be-table thead').empty();
// 			var $r1=$('<tr class="cb-thead-main"></tr>');
// 			var $r2=$('<tr class="cb-thead-sub"></tr>');
// 			$r1.append('<th rowspan="2" style="text-align:left !important;min-width:280px;width:280px;position:sticky;left:0;z-index:50;background:#0076B6;vertical-align:middle;">Expense Head / Line Item</th>');
// 			rawData.forEach(function(e){$r1.append('<th colspan="2" style="text-align:center;min-width:260px;">'+entityLabel(e)+'</th>');});
// 			$r1.append('<th colspan="2" style="text-align:center;min-width:260px;background:#003B63;">Grand Total</th>');
// 			rawData.forEach(function(){$r2.append('<th style="text-align:center;min-width:130px;">'+pl()+'</th><th style="text-align:center;min-width:130px;">'+el()+'</th>');});
// 			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+pl()+'</th><th style="text-align:center;min-width:130px;background:#004F8B;">'+el()+'</th>');
// 			$t.append($r1).append($r2);
// 			fixStickySubHeader('#be-table');
// 		}

// 		function renderTable(){
// 			buildHeader();
// 			var $tb=$('#be-tbody').empty();
// 			var term=$('#be-search').val().trim().toLowerCase();
// 			var struct=buildStruct();
// 			var cols=1+rawData.length*2+2;
// 			if(!rawData.length||!struct.length){$tb.append('<tr><td colspan="'+cols+'" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');return;}
// 			struct.forEach(function(sec){
// 				var sn=sec.name,secOpen=openSec[sn]!==false,secVis=secOpen?'':'display:none;';
// 				$tb.append('<tr class="cb-row-head be-sec-row" data-sec="'+sn+'"><td style="text-align:left;"><span class="cb-arrow">'+(secOpen?'▼':'▶')+'</span> '+sn+'</td>'+secCells(sn)+tc2(secTP(sn),secTE(sn),'be-grand-col')+'</tr>');
// 				sec.sub_heads.forEach(function(sub){
// 					var sk=sn+'::'+sub.name,subOpen=expandItems||(openSub[sk]===true),itmVis=(secOpen&&subOpen)?'':'display:none;';
// 					$tb.append('<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="'+sn+'" data-sub="'+sk+'" style="'+secVis+'"><td style="padding-left:22px;text-align:left;"><span class="cb-arrow">'+(subOpen?'▼':'▶')+'</span> '+sub.name+'</td>'+subCells(sn,sub.name)+tc2(sTotP(sn,sub.name),sTotE(sn,sub.name),'be-grand-col')+'</tr>');
// 					sub.items.forEach(function(item){
// 						if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 						$tb.append('<tr class="be-item-row be-sec-child be-sub-child" data-sec="'+sn+'" data-sub="'+sk+'" style="'+itmVis+'"><td style="padding-left:42px;text-align:left;">'+item.name+'</td>'+itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col')+'</tr>');
// 					});
// 				});
// 				sec.items.forEach(function(item){
// 					if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
// 					$tb.append('<tr class="be-item-row be-sec-child be-direct-item" data-sec="'+sn+'" style="'+secVis+'"><td style="padding-left:30px;text-align:left;">'+item.name+'</td>'+itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col')+'</tr>');
// 				});
// 			});
// 			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>'+grandCells()+tc2(allGP(),allGE(),'be-grand-col')+'</tr>');
// 		}

// 		function toggleSec(sn){
// 			var o=!(openSec[sn]!==false);openSec[sn]=o;
// 			$('#be-table tbody .be-sec-row[data-sec="'+sn+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $ch=$('#be-table tbody .be-sec-child[data-sec="'+sn+'"]');
// 			if(o){$ch.filter('.be-sub-row,.be-direct-item').show();$ch.filter('.be-sub-child').each(function(){var sk=$(this).attr('data-sub');if(expandItems||openSub[sk]===true){$(this).show();}});}
// 			else{$ch.hide();}
// 		}
// 		function toggleSubRow(sk){
// 			var o=!(openSub[sk]===true);openSub[sk]=o;
// 			$('#be-table tbody .be-sub-row[data-sub="'+sk+'"]').find('.cb-arrow').text(o?'▼':'▶');
// 			var $it=$('#be-table tbody .be-sub-child[data-sub="'+sk+'"]');
// 			o?$it.show():$it.hide();
// 		}
// 		function bindEvents(){
// 			$('#tab-budget_estimate').on('click.be','.be-sec-row',function(e){e.stopPropagation();toggleSec($(this).attr('data-sec'));});
// 			$('#tab-budget_estimate').on('click.be','.be-sub-row',function(e){e.stopPropagation();if(!expandItems){toggleSubRow($(this).attr('data-sub'));}});
// 			$(document).on('change.be','#be-expand-items',function(){
// 				expandItems=this.checked;
// 				buildStruct().forEach(function(sec){openSec[sec.name]=expandItems?true:false;sec.sub_heads.forEach(function(sub){openSub[sec.name+'::'+sub.name]=expandItems;});});
// 				renderTable();
// 			});
// 			$(document).on('input.be','#be-search',function(){renderTable();});
// 		}
// 		function fetchAndRender(fy){
// 			currentFY=fy;rawData=[];openSec={};openSub={};expandItems=false;
// 			$('#be-expand-items').prop('checked',false);
// 			Loader.show("We're balancing budget and estimate");
// 			frappe.call({
// 				method  :'annual_budget.api.foundation_consolidated_report.format_api',
// 				args    :{financial_year:fy,month:'March',set_group_id:'2',previous_financial_year:getPrevFY(fy)},
// 				callback:function(r){
// 					if(r.message&&Array.isArray(r.message)){rawData=r.message;}
// 					else{frappe.msgprint('Failed to load Budget & Estimate data.');}
// 					Store.budgetEstimate=rawData; renderTable(); Loader.hide();
// 				},
// 				error:function(){Loader.hide();frappe.msgprint('Server error loading Budget & Estimate data.');}
// 			});
// 		}
// 		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
// 		return {load:load};
// 	})();

// 	// =============================================================================
// 	// EXPORT BUTTON WIRING
// 	// =============================================================================

// 	var API = 'annual_budget.api.export_reports';

// 	$(document).on('click', '#xl-ppt', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.ppt.rows.length) { frappe.msgprint('Please wait for the data to load first.'); return; }
// 		serverExport(API + '.export_ppt', {
// 			financial_year    : fy,
// 			ppt_rows          : JSON.stringify(Store.ppt.rows),
// 			prev_ppt_rows     : JSON.stringify(Store.ppt.prevRows),
// 			budget_label      : Store.ppt.budgetLabel,
// 			est_label         : Store.ppt.estLabel,
// 			prev_budget_label : Store.ppt.prevBudgetLabel,
// 			prev_est_label    : Store.ppt.prevEstLabel
// 		}, 'Building Foundation Metrics Excel\u2026');
// 	});

// 	$(document).on('click', '#xl-annual', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.annual.length) { frappe.msgprint('Please load the Annual Budget tab first.'); return; }
// 		serverExport(API + '.export_annual', { financial_year:fy, annual_data:JSON.stringify(Store.annual) }, 'Building Annual Budget Excel\u2026');
// 	});

// 	$(document).on('click', '#xl-estimate', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.estimate.length) { frappe.msgprint('Please load the Estimate tab first.'); return; }
// 		serverExport(API + '.export_estimate', { financial_year:fy, estimate_data:JSON.stringify(Store.estimate) }, 'Building Estimate Excel\u2026');
// 	});

// 	$(document).on('click', '#xl-be', function () {
// 		var fy = fyControl.get_value() || '2025-26';
// 		if (!Store.budgetEstimate.length) { frappe.msgprint('Please load the Budget & Estimate tab first.'); return; }
// 		serverExport(API + '.export_budget_estimate', { financial_year:fy, be_data:JSON.stringify(Store.budgetEstimate) }, 'Building Budget & Estimate Excel\u2026');
// 	});

// 	$(document).on('click', '#xl-headcount', function () {
// 		frappe.msgprint('Headcount Excel export will be available once the API endpoint is connected.');
// 	});

// 	$(document).on('click', '#xl-summary-inr', function () {
// 		frappe.msgprint('Summary in INR Excel export will be available once wired to the export API.');
// 	});

// 	$(document).on('click', '#xl-export-all', function () {
// 		var fy      = fyControl.get_value() || '2025-26';
// 		var missing = [];
// 		if (!Store.ppt.rows.length)       { missing.push('Foundation Metrics'); }
// 		if (!Store.annual.length)         { missing.push('Annual Budget'); }
// 		if (!Store.estimate.length)       { missing.push('Estimate'); }
// 		if (!Store.budgetEstimate.length) { missing.push('Budget & Estimate'); }
// 		if (missing.length) {
// 			frappe.msgprint('The following tabs have not been loaded yet:<br><b>' + missing.join(', ') + '</b><br>Please open each tab first, then click Export All.');
// 			return;
// 		}
// 		serverExport(API + '.export_all', {
// 			financial_year    : fy,
// 			ppt_rows          : JSON.stringify(Store.ppt.rows),
// 			prev_ppt_rows     : JSON.stringify(Store.ppt.prevRows),
// 			budget_label      : Store.ppt.budgetLabel,
// 			est_label         : Store.ppt.estLabel,
// 			prev_budget_label : Store.ppt.prevBudgetLabel,
// 			prev_est_label    : Store.ppt.prevEstLabel,
// 			annual_data       : JSON.stringify(Store.annual),
// 			estimate_data     : JSON.stringify(Store.estimate),
// 			be_data           : JSON.stringify(Store.budgetEstimate)
// 		}, 'Building full consolidated Excel\u2026');
// 	});

// 	// =============================================================================
// 	// AUTO-LOAD ACTIVE TAB
// 	// =============================================================================

// 	var initialFY = fyControl.get_value();
// 	if (initialFY) { TabLoader.trigger('ppt'); }

// };

frappe.pages['consolidated-budget'].on_page_load = function (wrapper) {

	// =============================================================================
	// PAGE SETUP
	// =============================================================================

	var page = frappe.ui.make_app_page({
		parent       : wrapper,
		title        : 'Foundation - Consolidated Budget',
		single_column: true
	});

	// ── "Export All" — single button injected once into .page-actions ──
	setTimeout(function () {
		$(wrapper).find('#xl-export-all').remove();
		var $exportAllBtn = $(
			'<button class="btn btn-default btn-sm" id="xl-export-all" style="display:inline-flex;align-items:center;gap:5px;margin-left:8px;background:#1a1a1a;color:#fff;border-color:#1a1a1a;">' +
				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
					'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
					'<polyline points="14 2 14 8 20 8"/>' +
					'<line x1="8" y1="13" x2="16" y2="13"/>' +
					'<line x1="8" y1="17" x2="16" y2="17"/>' +
					'<line x1="10" y1="9" x2="8" y2="9"/>' +
				'</svg>' +
				'Export All' +
			'</button>'
		);
		var $pa = $(wrapper).find('.page-actions');
		if ($pa.length) { $pa.prepend($exportAllBtn); }
	}, 300);

	function updatePageTitle(financialYear) {
		page.set_title('Foundation - Consolidated Budget - ' + financialYear);
		setTimeout(function () {
			$(wrapper).find('.page-head h3').hide();
			$(wrapper).find('.page-head .title-text')
				.css({ 'font-size': '20px', 'font-weight': '700', 'color': '#1a1a1a' });
		}, 100);
	}

	// =============================================================================
	// FY LABEL HELPERS
	// =============================================================================

	function getFYLabels(fy) {
		var parts     = (fy || '2025-26').split('-');
		var startYY   = parts[0] ? parts[0].slice(-2) : '25';
		var endYY     = parts[1] ? parts[1].slice(-2) : '26';
		var prevStart = String(parseInt(startYY, 10) - 1).padStart(2, '0');
		var prevEnd   = String(parseInt(endYY,   10) - 1).padStart(2, '0');
		return {
			plan : 'FY' + startYY + '-' + endYY    + ' Plan',
			est  : 'FY' + prevStart + '-' + prevEnd + ' Estimate'
		};
	}

	function getPrevFY(fy) {
		var parts = (fy || '2025-26').split('-');
		var s = parseInt(parts[0] || '2025', 10) - 1;
		var e = parseInt(parts[1] || '26',   10) - 1;
		return s + '-' + String(e).padStart(2, '0');
	}

	function getBudgetYearLabel(fy) {
		var parts = (fy || '2025-26').split('-');
		var s = parseInt(parts[0] || '2025', 10) + 1;
		var e = parseInt(parts[1] || '26',   10) + 1;
		return s + '-' + String(e).slice(-2) + ' Budget';
	}

	function getEstYearLabel(fy) {
		return (fy || '2025-26') + ' Est';
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
			var m = (typeof msg === 'string' && msg.length) ? msg : 'Loading, please wait';
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
	// SHARED DATA STORE
	// =============================================================================

	var Store = {
		ppt           : { rows: [], prevRows: [], budgetLabel: '', estLabel: '', prevBudgetLabel: '', prevEstLabel: '' },
		annual        : [],
		estimate      : [],
		budgetEstimate: []
	};

	// =============================================================================
	// GLOBAL STYLES
	// =============================================================================

	$(page.body).append(
		'<style>' +
		':root{' +
			'--blue-dark:#003B63;--blue-mid:#0076B6;--blue-light:#E9F4FB;' +
			'--orange:#F26B21;--orange-light:#FFF3E6;' +
			'--border:#bbb;--border-light:#ddd;--border-header:#005f94;--border-orange:#d45a10;' +
		'}' +
		'.cb-wrapper{padding:15px;background:#fff;}' +

		/* Tab nav */
		'#cb-tab-nav{border-bottom:2px solid #ddd;list-style:none;padding:0;margin:0 0 16px;display:flex;align-items:flex-end;flex-wrap:wrap;}' +
		'#cb-tab-nav li{display:inline-block;}' +
		'#cb-tab-nav .cb-tab-link{cursor:pointer;display:inline-block;padding:9px 20px;color:#555;font-size:15px;font-weight:400;background:none;border:none;border-bottom:3px solid transparent;margin-bottom:-2px;text-decoration:none;transition:color .15s;}' +
		'#cb-tab-nav .cb-tab-link.active{color:#003B63;font-weight:700;border-bottom:3px solid #003B63;}' +
		'.cb-tab-pane{display:none;}.cb-tab-pane.active{display:block;}' +

		/* Filter row */
		'.cb-filter-row{padding:8px 0;background:#fff;margin-bottom:10px;}' +
		'.cb-filter-row .col-md-3,.cb-filter-row .col-sm-12{padding-left:8px;padding-right:8px;}' +
		'@media(max-width:768px){.cb-filter-row{padding:8px;}.cb-filter-row .col-md-3{width:100%;margin-bottom:8px;}}' +

		/* Controls bar */
		'.cb-controls{display:flex;align-items:center;padding:6px 10px;margin-bottom:10px;background:#f7f9fb;border:1px solid #e2e6ea;border-radius:6px;flex-wrap:wrap;gap:8px;}' +
		'.cb-controls-left{display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap;}' +
		'.cb-controls-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}' +

		/* Search */
		'.cb-search-wrap{position:relative;display:flex;align-items:center;}' +
		'.cb-search-wrap .search-icon{position:absolute;left:8px;color:#8d99a6;pointer-events:none;}' +
		'.cb-search-input{padding:5px 8px 5px 28px;border:1px solid #d1d8dd;border-radius:4px;font-size:13px;color:#36414c;background:#fff;width:220px;height:30px;transition:border-color .15s,box-shadow .15s;}' +
		'.cb-search-input:focus{outline:none;border-color:#5e64ff;box-shadow:0 0 0 2px rgba(94,100,255,.15);}' +

		/* Checkboxes */
		'.cb-checkbox-area{display:flex;gap:12px;align-items:center;}' +
		'.cb-check-label{display:flex;align-items:center;gap:5px;font-size:13px;font-weight:500;color:#36414c;cursor:pointer;user-select:none;white-space:nowrap;}' +
		'.cb-check-label input[type=checkbox]{width:14px;height:14px;cursor:pointer;accent-color:#5e64ff;}' +

		/* Export button */
		'.cb-xl-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;height:30px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;border:1px solid #1a1a1a;border-radius:4px;background:#1a1a1a;color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.15);transition:background .15s,border-color .15s;}' +
		'.cb-xl-btn:hover{background:#333;border-color:#333;}' +
		'.cb-xl-btn svg{flex-shrink:0;color:#fff;}' +
		'#xl-export-all svg{vertical-align:middle;margin-right:3px;}' +

		/* Scroll wrapper */
		'.cb-scroll-wrapper{border:1px solid #d1d8dd;border-radius:6px;overflow:auto;max-height:72vh;background:#fff;}' +

		/* TABLE BASE */
		'.cb-table,.ppt-table-wrap{width:100%;border-collapse:collapse;font-size:15px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;table-layout:auto;}' +
		'.cb-table th,.cb-table td,.ppt-table-wrap th,.ppt-table-wrap td{border:1px solid #d1d8dd;padding:8px 12px;white-space:nowrap;text-align:right;}' +
		'.cb-table th:first-child,.cb-table td:first-child,.ppt-table-wrap th:first-child,.ppt-table-wrap td:first-child{text-align:left;}' +

		/* STICKY HEADERS */
		'.cb-thead-main th{background:#0076B6;color:#fff;font-weight:700;font-size:16px;text-align:center !important;position:sticky;top:0;z-index:25;border-color:#005f94;padding:10px 12px;}' +
		'.cb-thead-sub th{background:#F26B21;color:#fff;font-weight:600;font-size:15px;text-align:center !important;position:sticky;top:0;z-index:24;border-color:#c85810;min-width:110px;padding:8px 12px;}' +

		/* Row types */
		'.cb-row-head{font-weight:700;font-size:15px;cursor:pointer;background:#E9F4FB;color:#003B63;}' +
		'.cb-row-head:hover td{background:#d0e8f5;}' +
		'.cb-row-sub{background:#FFF3E6;font-weight:600;font-size:15px;cursor:pointer;}' +
		'.cb-row-sub:hover td{background:#ffe0c2;}' +
		'.cb-row-grand td{background:#0076B6 !important;color:#fff !important;font-weight:700;font-size:15px;border-color:#005f94 !important;}' +
		'.cb-text-accent{color:#0076B6;font-weight:600;}' +

		/* PPT tab */
		'#tab-ppt .ppt-table-wrap tbody tr td{font-size:16px;font-weight:400;}' +
		'#tab-ppt .ppt-table-wrap tbody tr.ppt-total-row td{font-size:16px;font-weight:700;background:#e8f0fa !important;color:#003B63 !important;border-color:#aaa !important;}' +

		/* PPT title */
		'.ppt-title-bar{margin:12px 0 4px;}' +
		'.ppt-main-title{font-size:15px;font-weight:700;text-transform:uppercase;text-decoration:underline;letter-spacing:.3px;color:#111;}' +
		'.ppt-currency-label{font-size:16px;font-style:italic;color:#555;text-align:right;margin-bottom:6px;}' +
		'.ppt-currency-label strong{font-weight:800;font-size:16px;font-style:normal;}' +

		/* PPT table */
		'.ppt-table-wrap thead tr.cb-thead-main th{border-color:#005f94;}' +
		'.ppt-table-wrap thead tr.cb-thead-sub th{border-color:#c85810;}' +
		'.ppt-table-wrap tbody tr td{background:#fff;color:#111;font-size:15px;}' +
		'.ppt-table-wrap tbody tr.ppt-total-row td{font-weight:700;font-size:15px;background:#e8f0fa !important;color:#003B63 !important;border-color:#aaa !important;}' +
		'.ppt-dash{color:#bbb;text-align:center;display:block;}' +

		/* BUDGET & ESTIMATE — sticky first column */
		'#be-table{border-collapse:collapse;}' +
		'#be-table tbody td:first-child{position:sticky;left:0;z-index:10;text-align:left !important;min-width:280px;max-width:280px;white-space:normal;word-break:break-word;}' +
		'#be-table tbody tr td:first-child{background:#fff;}' +
		'#be-table .cb-row-head td:first-child{background:#E9F4FB !important;}' +
		'#be-table .cb-row-sub  td:first-child{background:#FFF3E6 !important;}' +
		'#be-table .cb-row-grand td:first-child{background:#0076B6 !important;}' +
		'#be-table thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:#0076B6;text-align:left !important;min-width:280px;}' +
		'#be-table .be-grand-col{background:#ddeaf7 !important;color:#003B63;border-left:2px solid #0076B6 !important;}' +
		'#be-table .cb-row-grand .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
		'#be-table .cb-row-head .be-grand-col{background:#003B63 !important;color:#fff !important;}' +
		'#be-table .cb-row-sub  .be-grand-col{background:#f0ddd0 !important;color:#7a3b00 !important;}' +
		'#be-table .cb-thead-main th:not(:first-child){min-width:260px;text-align:center !important;}' +
		'#be-table .cb-thead-sub th{min-width:130px;text-align:center !important;}' +
		'#be-table tbody td:first-child,#be-table thead th:first-child{box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +

		/* Summary INR — shared */
		'.sinr-section-label{margin:18px 0 4px;font-size:13px;font-weight:700;color:#1a1a1a;text-decoration:underline;}' +
		'.sinr-currency-note{text-align:right;font-size:12px;font-style:italic;color:#555;margin-bottom:4px;}' +
		'.sinr-table td,.sinr-table th{font-size:13px !important;}' +
		'.sinr-total-row td{font-weight:700 !important;background:#e8f0fa !important;color:#003B63 !important;border-top:2px solid #aaa !important;}' +
		'.sinr-sub-item td:first-child{padding-left:22px !important;color:#444;}' +
		'.sinr-covid-row td{color:#333;}' +

		/* Table A — sticky first column */
		'#sinr-table-a thead tr.cb-thead-main th:first-child{position:sticky;left:0;z-index:50 !important;background:#0076B6;}' +
		'#sinr-table-a thead tr.cb-thead-sub  th:first-child{position:sticky;left:0;z-index:49 !important;background:#F26B21;}' +
		'#sinr-table-a tbody td:first-child{position:sticky;left:0;z-index:10;background:#fff;box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +
		'#sinr-table-a .sinr-total-row td:first-child{background:#e8f0fa !important;}' +
		'#sinr-table-a .sinr-covid-row td:first-child{background:#fff;}' +

		/* Table B — 2-row sticky header */
		'#sinr-table-b{border-collapse:collapse;width:100%;}' +
		'#sinr-table-b thead tr:nth-child(1) th{' +
			'position:sticky;top:0;z-index:25;' +
			'background:#0076B6;color:#fff;font-weight:700;font-size:13px;' +
			'text-align:center !important;border-color:#005f94;padding:8px 10px;}' +
		'#sinr-table-b thead tr:nth-child(2) th{' +
			'position:sticky;z-index:24;' +
			'background:#F26B21;color:#fff;font-weight:600;font-size:13px;' +
			'text-align:center !important;border-color:#c85810;padding:7px 10px;min-width:110px;}' +

		/* Table B — sticky first column (header) */
		'#sinr-table-b thead tr th:first-child{' +
			'position:sticky !important;left:0;' +
			'text-align:left !important;min-width:210px;' +
			'box-shadow:2px 0 5px -2px rgba(0,0,0,.18);}' +
		'#sinr-table-b thead tr:nth-child(1) th:first-child{z-index:55 !important;background:#0076B6 !important;}' +
		'#sinr-table-b thead tr:nth-child(2) th:first-child{z-index:54 !important;background:#F26B21 !important;}' +

		/* Table B — sticky first column (body) */
		'#sinr-table-b tbody td:first-child{' +
			'position:sticky;left:0;z-index:10;' +
			'text-align:left !important;min-width:210px;' +
			'box-shadow:2px 0 4px -2px rgba(0,0,0,.12);}' +
		'#sinr-table-b tbody tr.sinr-unit-hdr   td:first-child{background:#E9F4FB !important;}' +
		'#sinr-table-b tbody tr.sinr-brkdwn-plan td:first-child{background:#fff !important;}' +
		'#sinr-table-b tbody tr.sinr-brkdwn-act  td:first-child{background:#fafafa !important;}' +
		'#sinr-table-b tbody tr.sinr-spacer      td:first-child{background:#f4f6f8 !important;box-shadow:none;}' +
		'#sinr-table-b tbody tr.sinr-total-row   td:first-child{background:#e8f0fa !important;}' +
		'#sinr-table-b tbody tr.sinr-gt-plan     td:first-child{background:#ddeaf7 !important;}' +
		'#sinr-table-b tbody tr.sinr-gt-act      td:first-child{background:#ddeaf7 !important;}' +

		/* Table B — body row colours */
		'#sinr-table-b tbody td{font-size:13px;text-align:right;padding:7px 10px;border:1px solid #d1d8dd;white-space:nowrap;}' +
		'#sinr-table-b tbody tr.sinr-unit-hdr    td{background:#E9F4FB;color:#003B63;font-weight:700;font-size:13px;border-bottom:1px solid #c5ddf0;}' +
		'#sinr-table-b tbody tr.sinr-brkdwn-plan td{background:#fff;}' +
		'#sinr-table-b tbody tr.sinr-brkdwn-act  td{background:#fafafa;}' +
		'#sinr-table-b tbody tr.sinr-spacer       td{background:#f4f6f8;border-left:none;border-right:none;padding:2px 0;}' +
		'#sinr-table-b tbody tr.sinr-total-row    td{font-weight:700;background:#e8f0fa;color:#003B63;border-top:2px solid #aaa;}' +
		'#sinr-table-b tbody tr.sinr-gt-plan      td,' +
		'#sinr-table-b tbody tr.sinr-gt-act       td{background:#ddeaf7;color:#003B63;font-weight:600;}' +

		/* Headcount KPI cards */
		'.hc-kpi-card{background:#f0f6fb;border:1px solid #cde0f0;border-radius:8px;padding:14px 20px;min-width:180px;flex:1;}' +
		'.hc-kpi-label{font-size:12px;color:#555;font-weight:500;margin-bottom:4px;}' +
		'.hc-kpi-value{font-size:22px;font-weight:700;color:#003B63;}' +
		'.hc-section-title{margin:22px 0 6px;font-size:14px;font-weight:700;color:#003B63;text-transform:uppercase;letter-spacing:.4px;border-left:4px solid #0076B6;padding-left:10px;}' +

		/* Loader */
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
	// HELPERS
	// =============================================================================

	function formatINR(v) {
		var n = Math.round(parseFloat(v) || 0);
		var neg = n < 0;
		var s   = String(Math.abs(n));
		if (s.length > 3) {
			var last3 = s.slice(-3);
			var rest  = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
			s = rest + ',' + last3;
		}
		return (neg ? '-' : '') + s;
	}

	function fixStickySubHeader(tableSelector) {
		setTimeout(function () {
			var $table = $(tableSelector);
			if (!$table.length) { return; }
			var $mainRow = $table.find('thead tr.cb-thead-main');
			var $subRow  = $table.find('thead tr.cb-thead-sub');
			if (!$mainRow.length || !$subRow.length) { return; }
			var h = $mainRow[0].getBoundingClientRect().height || $mainRow.outerHeight(true) || 0;
			if (h > 0) { $subRow.find('th').css('top', h + 'px'); }
		}, 50);
	}

	function xlBtn(id, label) {
		return (
			'<button class="cb-xl-btn" id="' + id + '">' +
				'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
					'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
					'<polyline points="14 2 14 8 20 8"/>' +
					'<line x1="8" y1="13" x2="16" y2="13"/>' +
					'<line x1="8" y1="17" x2="16" y2="17"/>' +
					'<line x1="10" y1="9" x2="8" y2="9"/>' +
				'</svg>' +
				label +
			'</button>'
		);
	}

	function controlsBar(searchId, searchPlaceholder, checks, exportId) {
		var checkHtml = checks.map(function (c) {
			return (
				'<label class="cb-check-label">' +
					'<input type="checkbox" id="' + c.id + '"> ' + c.label +
				'</label>'
			);
		}).join('');
		return (
			'<div class="cb-controls">' +
				'<div class="cb-controls-left">' +
					'<div class="cb-search-wrap">' +
						'<svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
						'<input type="text" id="' + searchId + '" class="cb-search-input" placeholder="' + searchPlaceholder + '">' +
					'</div>' +
					'<div class="cb-checkbox-area">' + checkHtml + '</div>' +
				'</div>' +
				'<div class="cb-controls-right">' + xlBtn(exportId, 'Export to Excel') + '</div>' +
			'</div>'
		);
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
			'</ul>' +

			'<div id="cb-tab-content">' +

				/* ── PPT TAB ── */
				'<div class="cb-tab-pane active" id="tab-ppt">' +
					'<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">' +
						xlBtn('xl-ppt', 'Export to Excel') +
					'</div>' +
					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-main-title">Overall Foundation - Budget vs. Estimate</div></div>' +
					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
					'<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' +
						'<table id="ppt-table" class="ppt-table-wrap">' +
							'<thead>' +
								'<tr class="cb-thead-main">' +
									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
									'<th colspan="3" id="ppt-budget-hdr">Budget</th>' +
									'<th colspan="3" id="ppt-est-hdr">Estimate</th>' +
								'</tr>' +
								'<tr class="cb-thead-sub">' +
									'<th>Opex</th><th>Capex</th><th>Total</th>' +
									'<th>Opex</th><th>Capex</th><th>Total</th>' +
								'</tr>' +
							'</thead>' +
							'<tbody id="ppt-tbody"></tbody>' +
						'</table>' +
					'</div>' +
					'<div class="ppt-title-bar"><div class="ppt-main-title" id="ppt-prev-title">Overall Foundation - Previous Year Budget vs. Estimate</div></div>' +
					'<div class="ppt-currency-label">&#8377; <strong>Cr.</strong></div>' +
					'<div class="cb-scroll-wrapper">' +
						'<table id="ppt-prev-table" class="ppt-table-wrap">' +
							'<thead>' +
								'<tr class="cb-thead-main">' +
									'<th rowspan="2" style="min-width:180px;">Unit</th>' +
									'<th colspan="3" id="ppt-prev-budget-hdr">Budget</th>' +
									'<th colspan="3" id="ppt-prev-est-hdr">Estimate</th>' +
								'</tr>' +
								'<tr class="cb-thead-sub">' +
									'<th>Opex</th><th>Capex</th><th>Total</th>' +
									'<th>Opex</th><th>Capex</th><th>Total</th>' +
								'</tr>' +
							'</thead>' +
							'<tbody id="ppt-prev-tbody"></tbody>' +
						'</table>' +
					'</div>' +
				'</div>' +

				'<div class="cb-tab-pane" id="tab-summary_inr"></div>' +
				'<div class="cb-tab-pane" id="tab-headcount"></div>' +

				/* ── ANNUAL BUDGET TAB ── */
				'<div class="cb-tab-pane" id="tab-annual_budget">' +
					controlsBar(
						'annual-search', 'Search expense / item\u2026',
						[
							{ id: 'annual-expand-quarters', label: 'Expand Quarters' },
							{ id: 'annual-expand-items',    label: 'Expand Line Items' }
						],
						'xl-annual'
					) +
					'<div class="cb-scroll-wrapper">' +
						'<table class="cb-table" id="annual-table"><thead></thead><tbody></tbody></table>' +
					'</div>' +
				'</div>' +

				/* ── ESTIMATE TAB ── */
				'<div class="cb-tab-pane" id="tab-estimate">' +
					controlsBar(
						'estimate-search', 'Search expense / item\u2026',
						[
							{ id: 'estimate-expand-quarters', label: 'Expand Quarters' },
							{ id: 'estimate-expand-items',    label: 'Expand Line Items' }
						],
						'xl-estimate'
					) +
					'<div class="cb-scroll-wrapper">' +
						'<table class="cb-table" id="estimate-table"><thead></thead><tbody id="estimate-tbody"></tbody></table>' +
					'</div>' +
				'</div>' +

				/* ── BUDGET & ESTIMATE TAB ── */
				'<div class="cb-tab-pane" id="tab-budget_estimate">' +
					controlsBar(
						'be-search', 'Search expense / item\u2026',
						[
							{ id: 'be-expand-items', label: 'Expand Line Items' }
						],
						'xl-be'
					) +
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
		method: 'annual_budget.api.filter_options.get_financial_year_list',
		callback: function (r) {
			if (r.message && r.message.length) {
				var years = r.message.map(function (d) { return d.financial_year; });
				fyControl.df.options = years.join('\n');
				fyControl.refresh();
				var today     = new Date();
				var year      = today.getFullYear();
				var month     = today.getMonth() + 1;
				var currentFY = (month >= 4)
					? year + '-' + String(year + 1).slice(-2)
					: (year - 1) + '-' + String(year).slice(-2);
				var target = years.indexOf(currentFY) !== -1 ? currentFY : years[0];
				fyControl.set_value(target);
				updatePageTitle(target);
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
			summary_inr    : function (fy) { SummaryINR.load(fy);     },
			headcount      : function (fy) { Headcount.load(fy);      },
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
	// SERVER-SIDE EXCEL DOWNLOAD HELPER
	// =============================================================================

	function downloadFromB64(b64, filename) {
		var binary = atob(b64);
		var bytes  = new Uint8Array(binary.length);
		for (var i = 0; i < binary.length; i++) { bytes[i] = binary.charCodeAt(i); }
		var blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
		var url  = URL.createObjectURL(blob);
		var a    = document.createElement('a');
		a.href = url; a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
	}

	function serverExport(method, args, loadingMsg) {
		Loader.show(loadingMsg || 'Preparing your Excel file');
		frappe.call({
			method  : method,
			args    : args,
			callback: function (r) {
				Loader.hide();
				if (r.message && r.message.data) {
					downloadFromB64(r.message.data, r.message.filename);
				} else {
					frappe.msgprint('Export failed \u2014 no data returned from server.');
				}
			},
			error: function () {
				Loader.hide();
				frappe.msgprint('Server error during export. Please try again.');
			}
		});
	}

	// =============================================================================
	// PPT MODULE
	// =============================================================================

	var PPT = (function () {

		var currentFY = '';

		function toCr(v) { return (parseFloat(v) || 0) / 10000000; }

		function fmt(v) {
			var n = parseFloat(v) || 0;
			if (n === 0) { return '<span class="ppt-dash">-</span>'; }
			var neg = n < 0;
			var abs = Math.abs(n).toFixed(2);
			var pts = abs.split('.');
			var ip  = pts[0], dp = pts[1];
			if (ip.length > 3) {
				var l3 = ip.slice(-3);
				var rs = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
				ip = rs + ',' + l3;
			}
			return (neg ? '-' : '') + ip + '.' + dp;
		}

		function transformResponse(message, idx) {
			var normalRows = [], covidRows  = [];
			var sub = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };
			var cov = { bOpex:0, bCapex:0, eOpex:0, eCapex:0 };

			(message || []).forEach(function (entity) {
				var label   = (entity.label || '').trim();
				var isCovid = label.toLowerCase().indexOf('covid') !== -1;
				var ofn     = (entity.overall_foundation_numbers || [])[idx] || {};
				var capEx   = ofn.capital_expenses   || {};
				var opEx    = ofn.operating_expenses || {};
				var bOpex   = toCr(opEx.budget);
				var bCapex  = toCr(capEx.budget);
				var eOpex   = toCr(opEx.actual);
				var eCapex  = toCr(capEx.actual);
				var row = { label:label, bOpex:bOpex, bCapex:bCapex, eOpex:eOpex, eCapex:eCapex };
				if (isCovid) {
					cov.bOpex+=bOpex; cov.bCapex+=bCapex; cov.eOpex+=eOpex; cov.eCapex+=eCapex;
					covidRows.push(row);
				} else {
					sub.bOpex+=bOpex; sub.bCapex+=bCapex; sub.eOpex+=eOpex; sub.eCapex+=eCapex;
					normalRows.push(row);
				}
			});

			var grand = {
				bOpex:sub.bOpex+cov.bOpex, bCapex:sub.bCapex+cov.bCapex,
				eOpex:sub.eOpex+cov.eOpex, eCapex:sub.eCapex+cov.eCapex
			};
			var rows = [];
			normalRows.forEach(function (r) { rows.push(r); });
			rows.push({ isSubTotal:true, label:'Total',
				bOpex:sub.bOpex, bCapex:sub.bCapex, eOpex:sub.eOpex, eCapex:sub.eCapex });
			covidRows.forEach(function (r) { rows.push(r); });
			if (covidRows.length) {
				rows.push({ isGrand:true, label:'Total',
					bOpex:grand.bOpex, bCapex:grand.bCapex, eOpex:grand.eOpex, eCapex:grand.eCapex });
			}
			return rows;
		}

		function parseHeadersFromTitle(title) {
			var budgetLabel = 'Budget', estLabel = 'Estimate';
			if (!title) { return { budgetLabel:budgetLabel, estLabel:estLabel }; }
			var m = title.match(/(\d{4}-\d{2})\s+BUDGET\s+VS\.\s+(\d{4}-\d{2})\s+EST/i);
			if (m) { budgetLabel = m[1]+' Budget'; estLabel = m[2]+' Estimate'; }
			return { budgetLabel:budgetLabel, estLabel:estLabel };
		}

		function renderTable(rows, apiTitle, tbodyId, titleId, budgetHdrId, estHdrId, tableId) {
			var displayTitle = (apiTitle || '')
				.replace(/^OVERALL FOUNDATION NUMBERS\s*-\s*/i, 'Overall Foundation - ')
				.replace(/\bBUDGET\b/g, 'Budget').replace(/\bVS\.\b/g, 'vs.').replace(/\bEST\b/g, 'Estimate');
			$('#'+titleId).text(displayTitle);
			var hdrs = parseHeadersFromTitle(apiTitle);
			$('#'+budgetHdrId).text(hdrs.budgetLabel);
			$('#'+estHdrId).text(hdrs.estLabel);
			var $tb = $('#'+tbodyId).empty();
			rows.forEach(function (row) {
				var cls = (row.isSubTotal||row.isGrand) ? 'ppt-total-row' : '';
				var bO=row.bOpex, bC=row.bCapex, eO=row.eOpex, eC=row.eCapex;
				$tb.append(
					'<tr class="'+cls+'">' +
					'<td>'+row.label+'</td>' +
					'<td>'+fmt(bO)+'</td><td>'+fmt(bC)+'</td><td>'+fmt(bO+bC)+'</td>' +
					'<td>'+fmt(eO)+'</td><td>'+fmt(eC)+'</td><td>'+fmt(eO+eC)+'</td>' +
					'</tr>'
				);
			});
			fixStickySubHeader('#'+tableId);
		}

		function fetchAndRender(fy) {
			$('#ppt-tbody,#ppt-prev-tbody').html(
				'<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">Loading\u2026</td></tr>'
			);
			Loader.show('Building your foundation metrics');
			frappe.call({
				method: 'annual_budget.api.foundation_consolidated_report.add_expense_totals',
				args  : { financial_year:fy, month:'March', set_group_id:'4,5', previous_financial_year:getPrevFY(fy) },
				callback: function (r) {
					Loader.hide();
					var msg = null;
					if (r.message && Array.isArray(r.message))                          { msg = r.message; }
					else if (r.message && r.message.message && Array.isArray(r.message.message)) { msg = r.message.message; }
					if (!msg || !msg.length) {
						$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:#aaa;">No data.</td></tr>');
						return;
					}
					var first  = msg[0] || {};
					var ofnArr = first.overall_foundation_numbers || [];
					var title0 = (ofnArr[0]||{}).title || '';
					var title1 = (ofnArr[1]||{}).title || '';
					var rows0  = transformResponse(msg, 0);
					var rows1  = transformResponse(msg, 1);
					renderTable(rows0, title0, 'ppt-tbody',      'ppt-main-title', 'ppt-budget-hdr',      'ppt-est-hdr',      'ppt-table');
					renderTable(rows1, title1, 'ppt-prev-tbody', 'ppt-prev-title', 'ppt-prev-budget-hdr', 'ppt-prev-est-hdr', 'ppt-prev-table');
					function toExportRows(rows) {
						return rows.map(function (row) {
							return { label:row.label, bOpex:row.bOpex, bCapex:row.bCapex, eOpex:row.eOpex, eCapex:row.eCapex,
								is_total:(row.isSubTotal===true||row.isGrand===true) };
						});
					}
					Store.ppt.rows            = toExportRows(rows0);
					Store.ppt.prevRows        = toExportRows(rows1);
					Store.ppt.budgetLabel     = $('#ppt-budget-hdr').text();
					Store.ppt.estLabel        = $('#ppt-est-hdr').text();
					Store.ppt.prevBudgetLabel = $('#ppt-prev-budget-hdr').text();
					Store.ppt.prevEstLabel    = $('#ppt-prev-est-hdr').text();
				},
				error: function () {
					Loader.hide();
					$('#ppt-tbody,#ppt-prev-tbody').html('<tr><td colspan="7" style="text-align:center;padding:24px;color:red;">Error loading data.</td></tr>');
				}
			});
		}

		function load(fy) { currentFY = fy || '2025-26'; fetchAndRender(currentFY); }
		return { load: load };
	})();

	// =============================================================================
	// SUMMARY IN INR MODULE  — 100% dynamic from get_unit_wise_plan API
	// Table A : Unit Wise Plan  (Opex | Capex | Total  ×  Plan | Est)
	// Table B : Breakdown of Unit Wise Plan  (sub-head columns × Plan | Est)
	//           Only is_this_sub_item === 0 entries, ordered by sequence_id
	// =============================================================================

	var SummaryINR = (function () {

		// ─────────────────────────────────────────────────────────────────────────
		// SHARED HELPERS
		// ─────────────────────────────────────────────────────────────────────────

		// Format raw rupees → Crores (2 dp, Indian comma style)
		function fmtCr(v) {
			var n = parseFloat(v) || 0;
			if (n === 0) { return '-'; }
			var cr  = n / 10000000;
			var neg = cr < 0;
			var abs = Math.abs(cr).toFixed(2);
			var pts = abs.split('.');
			var ip  = pts[0], dp = pts[1];
			if (ip.length > 3) {
				var l3 = ip.slice(-3);
				var rs = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
				ip = rs + ',' + l3;
			}
			return (neg ? '-' : '') + ip + '.' + dp;
		}

		// Normalise section name (collapse multiple spaces, uppercase)
		function normName(s) { return (s || '').replace(/\s+/g, ' ').trim().toUpperCase(); }

		// Zero value object for Table A
		function zeroA() {
			return { opex_plan:0, opex_act:0, capex_plan:0, capex_act:0,
			         total_plan:0, total_act:0 };
		}
		function addA(a, b) {
			return {
				opex_plan  : a.opex_plan  + b.opex_plan,
				opex_act   : a.opex_act   + b.opex_act,
				capex_plan : a.capex_plan + b.capex_plan,
				capex_act  : a.capex_act  + b.capex_act,
				total_plan : a.total_plan + b.total_plan,
				total_act  : a.total_act  + b.total_act
			};
		}

		// Extract Opex + Capex from actuals for Table A
		// ytd = Plan,  total_posted_amt_ytd = Actuals/Est
		function extractA(actuals) {
			var r = zeroA();
			(actuals || []).forEach(function (sec) {
				var nm = normName(sec.name);
				if (nm === 'OPERATING EXPENSES') {
					r.opex_plan += parseFloat(sec.ytd || 0);
					r.opex_act  += parseFloat(sec.total_posted_amt_ytd || 0);
				}
				if (nm === 'CAPITAL EXPENSES') {
					r.capex_plan += parseFloat(sec.ytd || 0);
					r.capex_act  += parseFloat(sec.total_posted_amt_ytd || 0);
				}
			});
			r.total_plan = r.opex_plan + r.capex_plan;
			r.total_act  = r.opex_act  + r.capex_act;
			return r;
		}

		// ─────────────────────────────────────────────────────────────────────────
		// TABLE A — Unit Wise Plan  (Opex | Capex | Total)
		// ─────────────────────────────────────────────────────────────────────────

		function buildRowsA(apiData) {
			// Sort by sequence_id
			var sorted = (apiData || []).slice().sort(function (a, b) {
				return (a.sequence_id || 0) - (b.sequence_id || 0);
			});

			var normalRows = [], covidRows = [];

			sorted.forEach(function (entry) {
				var label   = (entry.label || '').trim();
				var isCovid = label.toLowerCase().indexOf('covid') !== -1;
				var isSub   = entry.is_this_sub_item === 1;
				var vals    = extractA(entry.actuals);

				var row = { display: label, isSub: isSub, isCovid: isCovid, vals: vals };

				if (isCovid) { covidRows.push(row); }
				else         { normalRows.push(row); }
			});

			var normalTotal = zeroA();
			normalRows.forEach(function (r) { normalTotal = addA(normalTotal, r.vals); });

			var covidTotal = zeroA();
			covidRows.forEach(function (r) { covidTotal = addA(covidTotal, r.vals); });

			var out = [];
			normalRows.forEach(function (r) { out.push(r); });
			out.push({ display: 'Total', isTotal: true, vals: normalTotal });

			if (covidRows.length) {
				covidRows.forEach(function (r) { out.push(r); });
				out.push({ display: 'Total', isTotal: true,
				           vals: addA(normalTotal, covidTotal) });
			}
			return out;
		}

		function rowHtmlA(row) {
			var trCls   = '';
			var tdStyle = 'text-align:left;';
			if (row.isTotal)      { trCls   = 'sinr-total-row'; }
			else if (row.isSub)   { tdStyle += 'padding-left:28px;color:#555;'; }
			else if (row.isCovid) { trCls   = 'sinr-covid-row'; }
			var v = row.vals;
			return (
				'<tr class="' + trCls + '">' +
				'<td style="' + tdStyle + '">' + row.display       + '</td>' +
				'<td>' + fmtCr(v.opex_plan)  + '</td>' +
				'<td>' + fmtCr(v.capex_plan) + '</td>' +
				'<td>' + fmtCr(v.total_plan) + '</td>' +
				'<td>' + fmtCr(v.opex_act)   + '</td>' +
				'<td>' + fmtCr(v.capex_act)  + '</td>' +
				'<td>' + fmtCr(v.total_act)  + '</td>' +
				'</tr>'
			);
		}

		function tableHtmlA(rows, planLabel, actLabel) {
			var body = rows.map(rowHtmlA).join('');
			return (
				'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
				'<div class="cb-scroll-wrapper" style="margin-bottom:28px;">' +
					'<table class="cb-table sinr-table" id="sinr-table-a" style="width:100%;">' +
					'<thead>' +
						'<tr class="cb-thead-main">' +
							'<th rowspan="2" style="text-align:left !important;min-width:260px;">Unit / Function</th>' +
							'<th colspan="3" style="text-align:center !important;">' + planLabel + '</th>' +
							'<th colspan="3" style="text-align:center !important;">' + actLabel  + '</th>' +
						'</tr>' +
						'<tr class="cb-thead-sub">' +
							'<th>Opex</th><th>Capex</th><th>Total</th>' +
							'<th>Opex</th><th>Capex</th><th>Total</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody>' + body + '</tbody>' +
					'</table>' +
				'</div>'
			);
		}

		// ─────────────────────────────────────────────────────────────────────────
		// TABLE B — Breakdown of Unit Wise Plan
		//
		// Columns (dynamic from sub_heads inside OPERATING EXPENSES across all
		// entries):
		//   Unit / Function  |  <sub_head cols…> (Opex breakdown)  |  Total Opex
		//                    |  Capex  |  Grand Total
		//
		// Each unit → bold label row, then two data rows:
		//   "- FY26-27 Budget"  (ytd)
		//   "- FY25-26 Est"     (total_posted_amt_ytd)
		//
		// Only is_this_sub_item === 0, ordered by sequence_id
		// ─────────────────────────────────────────────────────────────────────────

		// Collect ordered unique sub_head names from OPERATING EXPENSES across
		// all is_this_sub_item===0 entries. The order follows first appearance
		// in sequence_id order.
		function collectSubHeadNames(entries) {
			var seen  = {};
			var names = [];
			entries.forEach(function (entry) {
				(entry.actuals || []).forEach(function (sec) {
					if (normName(sec.name) !== 'OPERATING EXPENSES') { return; }
					(sec.sub_heads || []).forEach(function (sh) {
						var n = (sh.name || '').trim();
						if (n && !seen[n]) { seen[n] = true; names.push(n); }
					});
				});
			});
			return names;
		}

		// For a single entry + sub_head name, get plan/act value
		function subHeadVal(actuals, subHeadName, field) {
			var v = 0;
			(actuals || []).forEach(function (sec) {
				if (normName(sec.name) !== 'OPERATING EXPENSES') { return; }
				(sec.sub_heads || []).forEach(function (sh) {
					if ((sh.name || '').trim() === subHeadName) {
						v += parseFloat(field === 'plan'
							? (sh.ytd || 0)
							: (sh.total_posted_amt_ytd || 0));
					}
				});
			});
			return v;
		}

		// Total operating expenses (sum of all sub_heads) for plan/act
		function opexTotal(actuals, field) {
			var v = 0;
			(actuals || []).forEach(function (sec) {
				if (normName(sec.name) !== 'OPERATING EXPENSES') { return; }
				v += parseFloat(field === 'plan'
					? (sec.ytd || 0)
					: (sec.total_posted_amt_ytd || 0));
			});
			return v;
		}

		// Capex total for plan/act
		function capexTotal(actuals, field) {
			var v = 0;
			(actuals || []).forEach(function (sec) {
				if (normName(sec.name) !== 'CAPITAL EXPENSES') { return; }
				v += parseFloat(field === 'plan'
					? (sec.ytd || 0)
					: (sec.total_posted_amt_ytd || 0));
			});
			return v;
		}

		// Fix sticky top offsets for Table B's 2-row header programmatically
		function fixTableBStickyHeaders() {
			setTimeout(function () {
				var $tbl  = $('#sinr-table-b');
				if (!$tbl.length) { return; }
				var $rows = $tbl.find('thead tr');
				var top   = 0;
				$rows.each(function () {
					var $ths = $(this).find('th');
					$ths.css('top', top + 'px');
					top += $(this).outerHeight(true) || 36;
				});
			}, 80);
		}

		function tableHtmlB(entries, subHeadNames, planLabel, actLabel) {
			var colCount = 1 + subHeadNames.length + 1 + 1 + 1;
			// Col structure: Unit/Function | sh1…shN | Total Opex | Capex | Grand Total

			// ── HEADER (2 rows)
			// Row 1 (cb-thead-main): Unit/Function(rowspan=2) | Operating Expenses(colspan=shN+1) | Capex(rowspan=2) | Total(rowspan=2)
			// Row 2 (cb-thead-sub) : sh1 … shN | Total(opex)
			var hdr = (
				'<tr class="cb-thead-main">' +
					'<th rowspan="2" style="text-align:left !important;min-width:210px;">Unit / Function</th>' +
					'<th colspan="' + (subHeadNames.length + 1) + '" ' +
					    'style="text-align:center !important;">Operating Expenses</th>' +
					'<th rowspan="2" style="text-align:center !important;min-width:110px;">Capex</th>' +
					'<th rowspan="2" style="text-align:center !important;min-width:110px;">Total</th>' +
				'</tr>' +
				'<tr class="cb-thead-sub">' +
					subHeadNames.map(function (n) {
						return '<th style="min-width:110px;">' + n + '</th>';
					}).join('') +
					'<th style="min-width:110px;">Total</th>' +
				'</tr>'
			);

			// ── BODY ──────────────────────────────────────────────────────────────
			var bodyRows = '';

			// Accumulators for Grand Total rows
			var gtShPlan = {}, gtShAct = {};
			subHeadNames.forEach(function (n) { gtShPlan[n] = 0; gtShAct[n] = 0; });
			var gtOpexP = 0, gtOpexA = 0, gtCapP = 0, gtCapA = 0;

			entries.forEach(function (entry) {
				var label = (entry.label || '').trim();
				var act   = entry.actuals || [];

				var shPlan = {}, shAct = {};
				subHeadNames.forEach(function (n) {
					shPlan[n] = subHeadVal(act, n, 'plan');
					shAct[n]  = subHeadVal(act, n, 'act');
					gtShPlan[n] += shPlan[n];
					gtShAct[n]  += shAct[n];
				});

				var opexP = opexTotal(act, 'plan');
				var opexA = opexTotal(act, 'act');
				var capP  = capexTotal(act, 'plan');
				var capA  = capexTotal(act, 'act');

				gtOpexP += opexP; gtOpexA += opexA;
				gtCapP  += capP;  gtCapA  += capA;

				// Unit header row
				bodyRows += (
					'<tr class="sinr-unit-hdr">' +
					'<td>' + label + '</td>' +
					'<td colspan="' + (subHeadNames.length + 3) + '"></td>' +
					'</tr>'
				);

				// Plan data row
				bodyRows += '<tr class="sinr-brkdwn-plan">' +
					'<td style="padding-left:18px;color:#333;">- ' + planLabel + '</td>' +
					subHeadNames.map(function (n) {
						return '<td>' + fmtCr(shPlan[n]) + '</td>';
					}).join('') +
					'<td>' + fmtCr(opexP)         + '</td>' +
					'<td>' + fmtCr(capP)           + '</td>' +
					'<td>' + fmtCr(opexP + capP)   + '</td>' +
					'</tr>';

				// Est data row
				bodyRows += '<tr class="sinr-brkdwn-act">' +
					'<td style="padding-left:18px;color:#555;">- ' + actLabel + '</td>' +
					subHeadNames.map(function (n) {
						return '<td>' + fmtCr(shAct[n]) + '</td>';
					}).join('') +
					'<td>' + fmtCr(opexA)         + '</td>' +
					'<td>' + fmtCr(capA)           + '</td>' +
					'<td>' + fmtCr(opexA + capA)   + '</td>' +
					'</tr>';

				// Spacer between units
				bodyRows += '<tr class="sinr-spacer"><td colspan="' + colCount + '"></td></tr>';
			});

			// Grand Total label row
			bodyRows += (
				'<tr class="sinr-total-row">' +
				'<td>Grand Total</td>' +
				'<td colspan="' + (subHeadNames.length + 3) + '"></td>' +
				'</tr>'
			);

			// Grand Total — Plan row
			bodyRows += '<tr class="sinr-gt-plan">' +
				'<td style="padding-left:18px;">- ' + planLabel + '</td>' +
				subHeadNames.map(function (n) {
					return '<td>' + fmtCr(gtShPlan[n]) + '</td>';
				}).join('') +
				'<td>' + fmtCr(gtOpexP)           + '</td>' +
				'<td>' + fmtCr(gtCapP)             + '</td>' +
				'<td>' + fmtCr(gtOpexP + gtCapP)   + '</td>' +
				'</tr>';

			// Grand Total — Est row
			bodyRows += '<tr class="sinr-gt-act">' +
				'<td style="padding-left:18px;">- ' + actLabel + '</td>' +
				subHeadNames.map(function (n) {
					return '<td>' + fmtCr(gtShAct[n]) + '</td>';
				}).join('') +
				'<td>' + fmtCr(gtOpexA)           + '</td>' +
				'<td>' + fmtCr(gtCapA)             + '</td>' +
				'<td>' + fmtCr(gtOpexA + gtCapA)   + '</td>' +
				'</tr>';

			return (
				'<div class="cb-scroll-wrapper" style="margin-bottom:24px;">' +
					'<table id="sinr-table-b" style="width:100%;border-collapse:collapse;">' +
					'<thead>' + hdr + '</thead>' +
					'<tbody>' + bodyRows + '</tbody>' +
					'</table>' +
				'</div>'
			);
		}

		// ─────────────────────────────────────────────────────────────────────────
		// FETCH & RENDER BOTH TABLES
		// ─────────────────────────────────────────────────────────────────────────

		function fetchAndRender(fy) {
			var $tab = $('#tab-summary_inr');
			$tab.html(
				'<div style="padding:20px;text-align:center;color:#aaa;">Loading\u2026</div>'
			);
			Loader.show('Building Summary in INR\u2026');

			// Derive column labels from FY
			// e.g. "2025-26" → planLabel = "2026-27 Budget" | actLabel = "2025-26 Est"
			var fyParts   = (fy || '2025-26').split('-');
			var fyStart   = parseInt(fyParts[0] || '2025', 10);
			var fyEndYY   = parseInt(fyParts[1] || '26',   10);
			var planLabel = (fyStart + 1) + '-' + String(fyEndYY + 1).slice(-2) + ' Budget';
			var actLabel  = fy + ' Est';

			frappe.call({
				method   : 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
				args     : {
					financial_year    : fy,
					month             : 'March',
					table_name_filter : 'Unit Wise Plan'
				},
				callback : function (r) {
					Loader.hide();

					// Unwrap possible nested message
					var apiData = null;
					if (r.message && Array.isArray(r.message)) {
						apiData = r.message;
					} else if (r.message && Array.isArray(r.message.message)) {
						apiData = r.message.message;
					}

					if (!apiData || !apiData.length) {
						$tab.html(
							'<div style="padding:40px;text-align:center;color:#aaa;">No data available.</div>'
						);
						return;
					}

					// ── Table A — all entries, sorted by sequence_id ──────────
					var rowsA  = buildRowsA(apiData);
					var htmlA  = tableHtmlA(rowsA, planLabel, actLabel);

					// ── Table B — only is_this_sub_item === 0, sorted ─────────
					var entriesB = (apiData || [])
						.filter(function (e) { return e.is_this_sub_item === 0; })
						.sort(function (a, b) {
							return (a.sequence_id || 0) - (b.sequence_id || 0);
						});

					// Collect sub_head column names from these entries only
					var subHeadNames = collectSubHeadNames(entriesB);
					var htmlB = tableHtmlB(entriesB, subHeadNames, planLabel, actLabel);

					$tab.html(
						'<div style="padding:4px 0 10px;">' +
							'<div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' +
								xlBtn('xl-summary-inr', 'Export to Excel') +
							'</div>' +

							// Table A
							'<div class="sinr-section-label">A. Unit Wise Plan</div>' +
							htmlA +

							// Table B
							'<div class="sinr-section-label" style="margin-top:24px;">' +
							    'B. Breakdown of Unit Wise Plan' +
							'</div>' +
							'<div class="sinr-currency-note" style="margin-bottom:6px;">&#8377; <strong>Cr.</strong></div>' +
							htmlB +
						'</div>'
					);

					// Fix sticky sub-header top offsets for all tables
					fixStickySubHeader('#sinr-table-a');
					fixTableBStickyHeaders();
				},
				error : function () {
					Loader.hide();
					$tab.html(
						'<div style="padding:40px;text-align:center;color:red;">' +
						'Error loading Summary in INR data.</div>'
					);
				}
			});
		}

		function load(fy) { fetchAndRender(fy); }
		return { load: load };
	})();

	// =============================================================================
	// HEADCOUNT MODULE
	// =============================================================================

	var Headcount = (function () {

		// ── Helpers ───────────────────────────────────────────────────────────────
		function fmtNum(v) {
			if (v === null || v === undefined) { return '-'; }
			var n = Math.round(parseFloat(v));
			return isNaN(n) ? '-' : n.toLocaleString('en-IN');
		}
		// IFERROR(b/a - 1, 0)
		function fmtPct(a, b) {
			a = parseFloat(a); b = parseFloat(b);
			if (isNaN(a) || isNaN(b) || a === 0) { return '0%'; }
			var p = ((b / a) - 1) * 100;
			return (p >= 0 ? '+' : '') + p.toFixed(1) + '%';
		}
		function hcSection(text) {
			return '<div class="hc-section-title">' + text + '</div>';
		}
		// Scroll wrapper only for the first summary table
		function scrollWrap(inner) {
			return '<div class="cb-scroll-wrapper" style="margin-bottom:20px;">' + inner + '</div>';
		}
		// Plain wrapper — no scroll, no max-width — for tables 2-5
		function plainWrap(inner) {
			return '<div style="margin-bottom:20px;overflow:visible;">' + inner + '</div>';
		}

		// ── Transform API records ─────────────────────────────────────────────────
		function transformData(records) {
			var sorted = (records || []).slice().sort(function (a, b) {
				return (a.financial_year || '').localeCompare(b.financial_year || '');
			});
			var yrs = sorted.map(function (r) { return r.financial_year || ''; });

			var unitMap = {};
			sorted.forEach(function (rec) {
				(rec.units || []).forEach(function (u) {
					var id = String(u.unit);
					if (!unitMap[id]) { unitMap[id] = { id: id, description: '', hc: {} }; }
					unitMap[id].hc[rec.financial_year] = u.total_headcount || 0;
					if (rec.financial_year === yrs[yrs.length - 1]) {
						unitMap[id].description = (u.unit_description || '').trim();
					}
				});
			});

			var units = Object.keys(unitMap)
				.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); })
				.map(function (id) { return unitMap[id]; });

			var totals = {};
			sorted.forEach(function (rec) { totals[rec.financial_year] = rec.total_head_count || 0; });

			return { yrs: yrs, units: units, totals: totals };
		}

		// ── Label helpers ─────────────────────────────────────────────────────────
		function fyToDate(fy) {
			var p = (fy || '').split('-');
			var endYear = String(parseInt(p[0] || '2024', 10) + 1);
			return '3/31/' + endYear;
		}
		function fyToMar(fy) {
			var p = (fy || '').split('-');
			return '31-Mar-' + (p[1] || p[0].slice(-2));
		}
		function fyLabel(fy) {
			var p = (fy || '').split('-');
			return 'FY' + (p[0] || '').slice(-2) + '-' + (p[1] || '');
		}

		// ── Average H/C ───────────────────────────────────────────────────────────
		// avgHC[idx] = (closing[idx-1] + closing[idx]) / 2
		function avgHC(unit, yrs, idx) {
			if (idx === 0) {
				var v = unit.hc[yrs[0]];
				return (v !== undefined) ? v : null;
			}
			var prev = unit.hc[yrs[idx - 1]], curr = unit.hc[yrs[idx]];
			if (prev === undefined || curr === undefined) { return null; }
			return (prev + curr) / 2;
		}
		function avgTotal(totals, yrs, idx) {
			if (idx === 0) { return totals[yrs[0]] || null; }
			var p = totals[yrs[idx - 1]], c = totals[yrs[idx]];
			return (p && c) ? (p + c) / 2 : null;
		}

		// ─────────────────────────────────────────────────────────────────────────
		// TABLE 1 — Headcount Summary  (with scroll wrapper)
		// ─────────────────────────────────────────────────────────────────────────
		function renderSummary(t) {
			var yrs = t.yrs, units = t.units, totals = t.totals;
			var y1idx = yrs.length - 2, y2idx = yrs.length - 1;
			var y1 = yrs[y1idx] || yrs[0], y2 = yrs[y2idx] || yrs[0];

			var rows = '';
			units.forEach(function (u) {
				var a1 = avgHC(u, yrs, y1idx), a2 = avgHC(u, yrs, y2idx);
				rows += (
					'<tr>' +
					'<td style="text-align:left;">' + u.description + '</td>' +
					'<td>' + (a1 !== null ? Math.round(a1).toLocaleString('en-IN') : '-') + '</td>' +
					'<td>' + (a2 !== null ? Math.round(a2).toLocaleString('en-IN') : '-') + '</td>' +
					'<td>' + fmtPct(a1, a2) + '</td>' +
					'<td>-</td><td>-</td><td>-</td>' +
					'</tr>'
				);
			});

			var ta1 = avgTotal(totals, yrs, y1idx), ta2 = avgTotal(totals, yrs, y2idx);
			rows += (
				'<tr class="cb-row-grand">' +
				'<td style="text-align:left;">Total</td>' +
				'<td>' + (ta1 !== null ? Math.round(ta1).toLocaleString('en-IN') : '-') + '</td>' +
				'<td>' + (ta2 !== null ? Math.round(ta2).toLocaleString('en-IN') : '-') + '</td>' +
				'<td>' + fmtPct(ta1, ta2) + '</td>' +
				'<td>-</td><td>-</td><td>-</td>' +
				'</tr>'
			);

			return scrollWrap(
				'<table class="cb-table" style="width:100%;">' +
				'<thead>' +
					'<tr class="cb-thead-main">' +
						'<th rowspan="2" style="text-align:left !important;min-width:200px;">Unit</th>' +
						'<th colspan="3" style="text-align:center !important;">Average H/C</th>' +
						'<th colspan="3" style="text-align:center !important;">Opex Spend (&#8377; Cr.)</th>' +
					'</tr>' +
					'<tr class="cb-thead-sub">' +
						'<th>' + fyToDate(y1) + '</th>' +
						'<th>' + fyToDate(y2) + '</th>' +
						'<th>% Increase</th>' +
						'<th>' + fyLabel(y1) + ' Est</th>' +
						'<th>' + fyLabel(y2) + ' Plan</th>' +
						'<th>% Increase</th>' +
					'</tr>' +
				'</thead>' +
				'<tbody>' + rows + '</tbody>' +
				'</table>'
			);
		}

		// ─────────────────────────────────────────────────────────────────────────
		// TABLE 2 — Closing H/C  (no scroll, no max-width, all black)
		// ─────────────────────────────────────────────────────────────────────────
		function renderClosing(t) {
			var yrs = t.yrs, units = t.units, totals = t.totals;
			var hdrCols = yrs.map(function (y) { return '<th>' + fyToMar(y) + '</th>'; }).join('');

			var rows = '';
			units.forEach(function (u) {
				var cells = yrs.map(function (y) {
					var v = (u.hc[y] !== undefined) ? u.hc[y] : null;
					return '<td>' + fmtNum(v) + '</td>';
				}).join('');
				rows += '<tr><td style="text-align:left;">' + u.description + '</td>' + cells + '</tr>';
			});

			var totalCells = yrs.map(function (y) {
				return '<td>' + fmtNum(totals[y] || 0) + '</td>';
			}).join('');
			rows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + totalCells + '</tr>';

			return plainWrap(
				'<table class="cb-table" style="width:100%;">' +
				'<thead><tr class="cb-thead-main">' +
				'<th style="text-align:left !important;min-width:220px;">Unit</th>' + hdrCols +
				'</tr></thead><tbody>' + rows + '</tbody></table>'
			);
		}

		// ─────────────────────────────────────────────────────────────────────────
		// TABLE 3 — Average H/C  (no scroll, no max-width, all black)
		// ─────────────────────────────────────────────────────────────────────────
		function renderAverage(t) {
			var yrs = t.yrs, units = t.units, totals = t.totals;
			var hdrCols = yrs.map(function (y) { return '<th>' + fyToMar(y) + '</th>'; }).join('');

			var rows = '';
			units.forEach(function (u) {
				var cells = yrs.map(function (y, idx) {
					var v = avgHC(u, yrs, idx);
					return '<td>' + (v !== null ? Math.round(v).toLocaleString('en-IN') : '-') + '</td>';
				}).join('');
				rows += '<tr><td style="text-align:left;">' + u.description + '</td>' + cells + '</tr>';
			});

			var totalCells = yrs.map(function (y, idx) {
				var v = avgTotal(totals, yrs, idx);
				return '<td>' + (v !== null ? Math.round(v).toLocaleString('en-IN') : '-') + '</td>';
			}).join('');
			rows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + totalCells + '</tr>';

			return plainWrap(
				'<table class="cb-table" style="width:100%;">' +
				'<thead><tr class="cb-thead-main">' +
				'<th style="text-align:left !important;min-width:220px;">Unit</th>' + hdrCols +
				'</tr></thead><tbody>' + rows + '</tbody></table>'
			);
		}

		// ─────────────────────────────────────────────────────────────────────────
		// TABLE 4 — Increase in Closing H/C (%)  (no scroll, no max-width)
		// formula: closing[n] / closing[n-1] - 1
		// ─────────────────────────────────────────────────────────────────────────
		function renderClosingPct(t) {
			var yrs = t.yrs, units = t.units, totals = t.totals;
			if (yrs.length < 2) { return ''; }

			var pairs = [];
			for (var i = 1; i < yrs.length; i++) {
				pairs.push({ from: yrs[i - 1], to: yrs[i] });
			}

			var hdrCols = pairs.map(function (p) {
				return '<th>' + fyToMar(p.from) + ' &#8594; ' + fyToMar(p.to) + '</th>';
			}).join('');

			var rows = '';
			units.forEach(function (u) {
				var cells = pairs.map(function (p) {
					return '<td>' + fmtPct(u.hc[p.from], u.hc[p.to]) + '</td>';
				}).join('');
				rows += '<tr><td style="text-align:left;">' + u.description + '</td>' + cells + '</tr>';
			});

			var totalCells = pairs.map(function (p) {
				return '<td>' + fmtPct(totals[p.from], totals[p.to]) + '</td>';
			}).join('');
			rows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + totalCells + '</tr>';

			return plainWrap(
				'<table class="cb-table" style="width:100%;">' +
				'<thead><tr class="cb-thead-main">' +
				'<th style="text-align:left !important;min-width:220px;">Unit</th>' + hdrCols +
				'</tr></thead><tbody>' + rows + '</tbody></table>'
			);
		}

		// ─────────────────────────────────────────────────────────────────────────
		// TABLE 5 — Increase in Average H/C (%)  (no scroll, no max-width)
		// formula: avgHC[n] / avgHC[n-1] - 1
		// ─────────────────────────────────────────────────────────────────────────
		function renderAveragePct(t) {
			var yrs = t.yrs, units = t.units, totals = t.totals;
			if (yrs.length < 2) { return ''; }

			var pairs = [];
			for (var i = 1; i < yrs.length; i++) {
				pairs.push({ from: yrs[i - 1], to: yrs[i], fromIdx: i - 1, toIdx: i });
			}

			var hdrCols = pairs.map(function (p) {
				return '<th>' + fyLabel(p.from) + ' &#8594; ' + fyLabel(p.to) + '</th>';
			}).join('');

			var rows = '';
			units.forEach(function (u) {
				var cells = pairs.map(function (p) {
					return '<td>' + fmtPct(avgHC(u, yrs, p.fromIdx), avgHC(u, yrs, p.toIdx)) + '</td>';
				}).join('');
				rows += '<tr><td style="text-align:left;">' + u.description + '</td>' + cells + '</tr>';
			});

			var totalCells = pairs.map(function (p) {
				return '<td>' + fmtPct(avgTotal(totals, yrs, p.fromIdx), avgTotal(totals, yrs, p.toIdx)) + '</td>';
			}).join('');
			rows += '<tr class="cb-row-grand"><td style="text-align:left;">Total</td>' + totalCells + '</tr>';

			return plainWrap(
				'<table class="cb-table" style="width:100%;">' +
				'<thead><tr class="cb-thead-main">' +
				'<th style="text-align:left !important;min-width:220px;">Unit</th>' + hdrCols +
				'</tr></thead><tbody>' + rows + '</tbody></table>'
			);
		}

		// ── Fetch & Render ────────────────────────────────────────────────────────
		function fetchAndRender(fy) {
			var $tab = $('#tab-headcount');
			$tab.html('<div style="padding:20px;text-align:center;color:#aaa;">Loading\u2026</div>');
			Loader.show('Building Headcount data\u2026');

			frappe.call({
				method  : 'annual_budget.api.foundation_consolidated_report.get_headcount',
				args    : { financial_year: fy },
				callback: function (r) {
					Loader.hide();

					var records = null;
					if (r.message && r.message.status === 'success') {
						records = r.message.data;
					} else if (r.message && Array.isArray(r.message)) {
						records = r.message;
					}

					if (!records || !records.length) {
						$tab.html('<div style="padding:40px;text-align:center;color:#aaa;">No headcount data available.</div>');
						return;
					}

					var t = transformData(records);

					$tab.html(
						'<div style="padding:4px 0 10px;">' +
							'<div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' +
								xlBtn('xl-headcount', 'Export to Excel') +
							'</div>' +

							// Table 1 — Summary (scrollable)
							hcSection('Headcount Summary') +
							'<div class="ppt-currency-label" style="text-align:left;margin-bottom:6px;">' +
								'H/C numbers &nbsp;|&nbsp; Opex in &#8377; <strong>Cr.</strong>' +
							'</div>' +
							renderSummary(t) +

							// Table 2 — Closing H/C
							hcSection('Closing H/C') +
							renderClosing(t) +

							// Table 3 — Average H/C
							hcSection('Average H/C') +
							renderAverage(t) +

							// Table 4 — Increase in Closing H/C (%)
							hcSection('Increase in Closing H/C (%)') +
							renderClosingPct(t) +

							// Table 5 — Increase in Average H/C (%)
							hcSection('Increase in Average H/C (%)') +
							renderAveragePct(t) +
						'</div>'
					);
				},
				error: function () {
					Loader.hide();
					$('#tab-headcount').html(
						'<div style="padding:40px;text-align:center;color:red;">Error loading headcount data.</div>'
					);
				}
			});
		}

		function load(fy) { fetchAndRender(fy || '2026-27'); }
		return { load: load };
	})();

	// =============================================================================
	// ANNUAL BUDGET MODULE
	// =============================================================================

	var Annual = (function () {

		var Q_DEFS = {
			q1: { label:'Quarter 1', months:['April','May','June'] },
			q2: { label:'Quarter 2', months:['July','August','September'] },
			q3: { label:'Quarter 3', months:['October','November','December'] },
			q4: { label:'Quarter 4', months:['January','February','March'] }
		};
		var Q_KEYS = ['q1','q2','q3','q4'];
		var data=[], expandedQ=[], openH={}, openS={}, bound=false;

		function sumArr(a) { var t=0; (a||[]).forEach(function(v){t+=(v||0);}); return t; }
		function objTotal(o) { var t=0; Q_KEYS.forEach(function(k){t+=sumArr(o[k]);}); return t; }

		function qCells(obj) {
			var html='';
			Q_KEYS.forEach(function (k) {
				var vals=obj[k]||[0,0,0];
				if (expandedQ.indexOf(k)!==-1) {
					vals.forEach(function(v){html+='<td>'+formatINR(v)+'</td>';});
				} else {
					html+='<td colspan="3">'+formatINR(sumArr(vals))+'</td>';
				}
			});
			return html;
		}

		function buildHeader() {
			var $t=$('#annual-table thead').empty();
			var $m=$('<tr class="cb-thead-main"></tr>');
			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense Head / Line Item</th>');
			Q_KEYS.forEach(function(k){
				var o=expandedQ.indexOf(k)!==-1;
				$m.append('<th class="cb-q-header" data-quarter="'+k+'" colspan="3" rowspan="'+(o?1:2)+'" style="cursor:pointer;">'+Q_DEFS[k].label+' '+(o?'▲':'▼')+'</th>');
			});
			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
			$t.append($m);
			if (expandedQ.length) {
				var $s=$('<tr class="cb-thead-sub"></tr>');
				Q_KEYS.forEach(function(k){
					if(expandedQ.indexOf(k)!==-1){Q_DEFS[k].months.forEach(function(m){$s.append('<th>'+m+'</th>');});}
				});
				$t.append($s);
			}
			fixStickySubHeader('#annual-table');
		}

		function renderTable() {
			buildHeader();
			var $tb=$('#annual-table tbody').empty();
			var term=$('#annual-search').val().trim().toLowerCase();
			var grand={q1:[0,0,0],q2:[0,0,0],q3:[0,0,0],q4:[0,0,0]};
			data.forEach(function(head,hi){
				if(term&&!matchSearch(head,term)){return;}
				var hs=String(hi),ho=openH[hs]===true;
				Q_KEYS.forEach(function(k){(head[k]||[0,0,0]).forEach(function(v,mi){grand[k][mi]+=(v||0);});});
				$tb.append(
					'<tr class="cb-row-head cb-annual-head" data-hi="'+hs+'">' +
					'<td><span class="cb-arrow">'+(ho?'▼':'▶')+'</span> '+head.name.trim()+'</td>' +
					qCells(head)+'<td class="cb-text-accent">'+formatINR(objTotal(head))+'</td></tr>'
				);
				(head.sub_heads||[]).forEach(function(sub,si){
					var sk=hs+'-'+si,so=openS[sk]===true;
					$tb.append(
						'<tr class="cb-row-sub cb-annual-sub" data-hi="'+hs+'" data-si="'+si+'" style="'+(ho?'':'display:none;')+'">' +
						'<td style="padding-left:22px;"><span class="cb-arrow">'+(so?'▼':'▶')+'</span> '+sub.name+'</td>' +
						qCells(sub)+'<td>'+formatINR(objTotal(sub))+'</td></tr>'
					);
					(sub.items||[]).forEach(function(item){
						$tb.append(
							'<tr class="cb-annual-sub-item" data-hi="'+hs+'" data-si="'+si+'" style="'+((ho&&so)?'':'display:none;')+'">' +
							'<td style="padding-left:42px;">'+item.name+'</td>' +
							qCells(item)+'<td>'+formatINR(objTotal(item))+'</td></tr>'
						);
					});
				});
				(head.items||[]).forEach(function(d){
					$tb.append(
						'<tr class="cb-annual-head-item" data-hi="'+hs+'" style="'+(ho?'':'display:none;')+'">' +
						'<td style="padding-left:35px;">'+d.name+'</td>' +
						qCells(d)+'<td>'+formatINR(objTotal(d))+'</td></tr>'
					);
				});
			});
			var gt=0; Q_KEYS.forEach(function(k){gt+=sumArr(grand[k]);});
			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>'+qCells(grand)+'<td>'+formatINR(gt)+'</td></tr>');
		}

		function toggleHead(hs){
			openH[hs]=!(openH[hs]===true);
			if(!openH[hs]){data.forEach(function(h,hi){if(String(hi)!==hs){return;}(h.sub_heads||[]).forEach(function(_,si){openS[hs+'-'+si]=false;});});}
			renderTable();
		}
		function toggleSub(hs,ss){openS[hs+'-'+ss]=!(openS[hs+'-'+ss]===true);renderTable();}

		function matchSearch(head,term){
			if(!term){return true;}
			if(head.name.toLowerCase().indexOf(term)!==-1){return true;}
			for(var s=0;s<(head.sub_heads||[]).length;s++){
				if(head.sub_heads[s].name.toLowerCase().indexOf(term)!==-1){return true;}
				for(var i=0;i<(head.sub_heads[s].items||[]).length;i++){
					if((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term)!==-1){return true;}
				}
			}
			for(var d=0;d<(head.items||[]).length;d++){
				if((head.items[d].name||'').toLowerCase().indexOf(term)!==-1){return true;}
			}
			return false;
		}

		function bindEvents(){
			$(document).on('input.annual','#annual-search',function(){renderTable();});
			$(document).on('change.annual','#annual-expand-quarters',function(){
				expandedQ=this.checked?Q_KEYS.slice():[];renderTable();
			});
			$(document).on('change.annual','#annual-expand-items',function(){
				if(this.checked){data.forEach(function(h,hi){openH[String(hi)]=true;(h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;});});}
				else{openH={};openS={};}
				renderTable();
			});
			$(document).on('click.annual','#annual-table .cb-q-header',function(){
				var k=String($(this).attr('data-quarter')),idx=expandedQ.indexOf(k);
				if(idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
				$('#annual-expand-quarters').prop('checked',expandedQ.length===Q_KEYS.length);
				renderTable();
			});
			$('#tab-annual_budget').on('click.annual','.cb-annual-head',function(e){e.stopPropagation();toggleHead(String($(this).attr('data-hi')));});
			$('#tab-annual_budget').on('click.annual','.cb-annual-sub', function(e){e.stopPropagation();toggleSub(String($(this).attr('data-hi')),String($(this).attr('data-si')));});
		}

		function fetchAndRender(fy){
			data=[]; openH={}; openS={}; expandedQ=[];
			$('#annual-expand-quarters,#annual-expand-items').prop('checked',false);
			$('#annual-search').val('');
			Loader.show('We\u2019re stitching together your annual budget story');
			frappe.call({
				method  :'annual_budget.api.phase_sheet.get_consolidated_report',
				args    :{financial_year:fy},
				callback:function(r){data=r.message||[];Store.annual=data;renderTable();Loader.hide();},
				error   :function(){Loader.hide();frappe.msgprint('Error loading Annual Budget.');}
			});
		}

		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
		return {load:load};
	})();

	// =============================================================================
	// ESTIMATE MODULE
	// =============================================================================

	var Estimate = (function () {

		var Q_DEFS={q1:{label:'Quarter 1',months:['April','May','June']},q2:{label:'Quarter 2',months:['July','August','September']},q3:{label:'Quarter 3',months:['October','November','December']},q4:{label:'Quarter 4',months:['January','February','March']}};
		var Q_KEYS=['q1','q2','q3','q4'];
		var Q_IDX={q1:[0,1,2],q2:[3,4,5],q3:[6,7,8],q4:[9,10,11]};
		var data=[],expandedQ=[],openH={},openS={},bound=false;

		function getMth(obj){var m=obj.months||{};return [parseFloat(m['4']||0),parseFloat(m['5']||0),parseFloat(m['6']||0),parseFloat(m['7']||0),parseFloat(m['8']||0),parseFloat(m['9']||0),parseFloat(m['10']||0),parseFloat(m['11']||0),parseFloat(m['12']||0),parseFloat(m['1']||0),parseFloat(m['2']||0),parseFloat(m['3']||0)];}
		function qTot(obj){return [parseFloat(obj['Q1']||0),parseFloat(obj['Q2']||0),parseFloat(obj['Q3']||0),parseFloat(obj['Q4']||0)];}
		function yTot(obj){var q=qTot(obj);return q[0]+q[1]+q[2]+q[3];}

		function qCells(obj){
			var mths=getMth(obj),qtots=qTot(obj),html='';
			Q_KEYS.forEach(function(q,qi){
				if(expandedQ.indexOf(q)!==-1){Q_IDX[q].forEach(function(mi){html+='<td>'+formatINR(mths[mi])+'</td>';});}
				else{html+='<td colspan="3">'+formatINR(qtots[qi])+'</td>';}
			});
			return html;
		}

		function buildHeader(){
			var $t=$('#estimate-table thead').empty();
			var $m=$('<tr class="cb-thead-main"></tr>');
			$m.append('<th rowspan="2" style="min-width:220px;text-align:left !important;">Expense</th>');
			Q_KEYS.forEach(function(k){
				var o=expandedQ.indexOf(k)!==-1;
				$m.append('<th class="est-q-toggle" data-q="'+k+'" colspan="3" rowspan="'+(o?1:2)+'" style="cursor:pointer;">'+Q_DEFS[k].label+' '+(o?'▲':'▼')+'</th>');
			});
			$m.append('<th rowspan="2" style="min-width:110px;">Total</th>');
			$t.append($m);
			if(expandedQ.length){
				var $s=$('<tr class="cb-thead-sub"></tr>');
				Q_KEYS.forEach(function(k){if(expandedQ.indexOf(k)!==-1){Q_DEFS[k].months.forEach(function(m){$s.append('<th>'+m+'</th>');});}});
				$t.append($s);
			}
			fixStickySubHeader('#estimate-table');
		}

		function renderTable(){
			buildHeader();
			var $tb=$('#estimate-tbody').empty();
			var term=$('#estimate-search').val().trim().toLowerCase();
			if(!Array.isArray(data)||!data.length){$tb.append('<tr><td colspan="14" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');return;}
			var gM=[0,0,0,0,0,0,0,0,0,0,0,0],gQ=[0,0,0,0];
			data.forEach(function(head,hi){
				if(term&&!matchSearch(head,term)){return;}
				getMth(head).forEach(function(v,i){gM[i]+=v;});
				qTot(head).forEach(function(v,i){gQ[i]+=v;});
				var hs=String(hi),ho=openH[hs];
				$tb.append('<tr class="cb-row-head cb-est-head" data-hi="'+hs+'"><td><span class="cb-arrow">'+(ho?'▼':'▶')+'</span> '+head.name+'</td>'+qCells(head)+'<td class="cb-text-accent">'+formatINR(yTot(head))+'</td></tr>');
				(head.items||[]).forEach(function(item){
					$tb.append('<tr class="cb-est-head-item" data-hi="'+hs+'" style="'+(ho?'':'display:none;')+'"><td style="padding-left:28px;">'+item.name+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
				});
				(head.sub_heads||[]).forEach(function(sub,si){
					var sk=hs+'-'+si,so=openS[sk];
					$tb.append('<tr class="cb-row-sub cb-est-sub" data-hi="'+hs+'" data-si="'+si+'" style="'+(ho?'':'display:none;')+'"><td style="padding-left:20px;"><span class="cb-arrow">'+(so?'▼':'▶')+'</span> '+sub.name+'</td>'+qCells(sub)+'<td>'+formatINR(yTot(sub))+'</td></tr>');
					(sub.items||[]).forEach(function(item){
						$tb.append('<tr class="cb-est-sub-item" data-hi="'+hs+'" data-si="'+si+'" style="'+((ho&&so)?'':'display:none;')+'"><td style="padding-left:44px;">'+item.name+'</td>'+qCells(item)+'<td>'+formatINR(yTot(item))+'</td></tr>');
					});
				});
			});
			var gO={Q1:gQ[0],Q2:gQ[1],Q3:gQ[2],Q4:gQ[3],months:{'4':gM[0],'5':gM[1],'6':gM[2],'7':gM[3],'8':gM[4],'9':gM[5],'10':gM[6],'11':gM[7],'12':gM[8],'1':gM[9],'2':gM[10],'3':gM[11]}};
			$tb.append('<tr class="cb-row-grand"><td>GRAND TOTAL</td>'+qCells(gO)+'<td>'+formatINR(gQ[0]+gQ[1]+gQ[2]+gQ[3])+'</td></tr>');
		}

		function toggleHead(hs){
			var o=!openH[hs];openH[hs]=o;
			$('#estimate-table tbody .cb-est-head[data-hi="'+hs+'"]').find('.cb-arrow').text(o?'▼':'▶');
			if(o){
				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').show();
				$('#estimate-table tbody .cb-est-head-item[data-hi="'+hs+'"]').show();
				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){var si=$(this).attr('data-si');if(openS[hs+'-'+si]){$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+si+'"]').show();}});
			}else{
				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"]').each(function(){var si=$(this).attr('data-si');openS[hs+'-'+si]=false;$(this).find('.cb-arrow').text('▶');});
				$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"],.cb-est-sub-item[data-hi="'+hs+'"],.cb-est-head-item[data-hi="'+hs+'"]').hide();
			}
		}
		function toggleSub(hs,ss){
			var sk=hs+'-'+ss,o=!openS[sk];openS[sk]=o;
			$('#estimate-table tbody .cb-est-sub[data-hi="'+hs+'"][data-si="'+ss+'"]').find('.cb-arrow').text(o?'▼':'▶');
			var $i=$('#estimate-table tbody .cb-est-sub-item[data-hi="'+hs+'"][data-si="'+ss+'"]');
			o?$i.show():$i.hide();
		}
		function matchSearch(head,term){
			if(!term){return true;}
			if(head.name.toLowerCase().indexOf(term)!==-1){return true;}
			for(var s=0;s<(head.sub_heads||[]).length;s++){
				if(head.sub_heads[s].name.toLowerCase().indexOf(term)!==-1){return true;}
				for(var i=0;i<(head.sub_heads[s].items||[]).length;i++){if((head.sub_heads[s].items[i].name||'').toLowerCase().indexOf(term)!==-1){return true;}}
			}
			for(var d=0;d<(head.items||[]).length;d++){if((head.items[d].name||'').toLowerCase().indexOf(term)!==-1){return true;}}
			return false;
		}
		function bindEvents(){
			$(document).on('click.estimate','#estimate-table .est-q-toggle',function(){
				var k=String($(this).attr('data-q')),idx=expandedQ.indexOf(k);
				if(idx!==-1){expandedQ.splice(idx,1);}else{expandedQ.push(k);}
				$('#estimate-expand-quarters').prop('checked',expandedQ.length===Q_KEYS.length);
				renderTable();
			});
			$(document).on('change.estimate','#estimate-expand-quarters',function(){expandedQ=this.checked?Q_KEYS.slice():[];renderTable();});
			$(document).on('change.estimate','#estimate-expand-items',function(){
				if(this.checked){data.forEach(function(h,hi){openH[String(hi)]=true;(h.sub_heads||[]).forEach(function(_,si){openS[hi+'-'+si]=true;});});}
				else{openH={};openS={};}
				renderTable();
			});
			$('#tab-estimate').on('click.estimate','.cb-est-head',function(e){e.stopPropagation();toggleHead(String($(this).attr('data-hi')));});
			$('#tab-estimate').on('click.estimate','.cb-est-sub', function(e){e.stopPropagation();toggleSub(String($(this).attr('data-hi')),String($(this).attr('data-si')));});
			$(document).on('input.estimate','#estimate-search',function(){renderTable();});
		}
		function fetchAndRender(fy){
			data=[]; openH={}; openS={}; expandedQ=[];
			$('#estimate-expand-quarters,#estimate-expand-items').prop('checked',false);
			var year=(getPrevFY(fy)||'2025-26').split('-')[0];
			Loader.show('We\u2019re shaping your projections into a smart view');
			frappe.call({
				method  :'annual_budget.api.foundation_consolidated_report.get_grouped_actuals_quarter_and_month_wise_total',
				args    :{fiscal_year:year,accounting_period:'12'},
				callback:function(r){
					if(r.message){
						if(r.message.status==='success'){data=r.message.data||[];}
						else if(Array.isArray(r.message)){data=r.message;}
						else if(r.message.data&&Array.isArray(r.message.data)){data=r.message.data;}
						else{frappe.msgprint('Failed to load Estimate data.');}
					}else{frappe.msgprint('Failed to load Estimate data.');}
					Store.estimate=data; renderTable(); Loader.hide();
				},
				error:function(){Loader.hide();frappe.msgprint('Server error loading Estimate data.');}
			});
		}
		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
		return {load:load};
	})();

	// =============================================================================
	// BUDGET & ESTIMATE MODULE
	// =============================================================================

	var BudgetEstimate = (function () {

		var rawData=[],currentFY='',openSec={},openSub={},expandItems=false,bound=false;

		function pl(){return getFYLabels(currentFY).plan;}
		function el(){return getFYLabels(currentFY).est;}
		function entityLabel(e){return (e.label||'').trim();}

		function buildStruct(){
			if(!rawData.length){return [];}
			return (rawData[0].actuals||[]).map(function(sec){
				return {name:sec.name,
					sub_heads:(sec.sub_heads||[]).map(function(sub){return {name:sub.name,items:(sub.items||[]).map(function(i){return {name:i.name};})};} ),
					items:(sec.items||[]).map(function(i){return {name:i.name};})};
			});
		}

		function itemVal(entry,name,field){var v=0;(entry.actuals||[]).forEach(function(sec){(sec.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});(sec.sub_heads||[]).forEach(function(sub){(sub.items||[]).forEach(function(i){if(i.name===name){v+=parseFloat(i[field]||0);}});});});return v;}
		function subVal(entry,sn,subn,field){var v=0;(entry.actuals||[]).forEach(function(sec){if(sec.name!==sn){return;}(sec.sub_heads||[]).forEach(function(sub){if(sub.name!==subn){return;}v+=parseFloat(field==='plan'?(sub.ytd||0):(sub.total_posted_amt_ytd||0));});});return v;}
		function secVal(entry,sn,field){var v=0;(entry.actuals||[]).forEach(function(sec){if(sec.name!==sn){return;}v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));});return v;}
		function grandVal(entry,field){var v=0;(entry.actuals||[]).forEach(function(sec){v+=parseFloat(field==='plan'?(sec.ytd||0):(sec.total_posted_amt_ytd||0));});return v;}

		function itemCells(name){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(itemVal(e,name,'ytd'))+'</td><td>'+formatINR(itemVal(e,name,'total_posted_amt'))+'</td>';});return h;}
		function subCells(sn,subn){var h='';rawData.forEach(function(e){h+='<td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'plan'))+'</td><td class="cb-text-accent">'+formatINR(subVal(e,sn,subn,'est'))+'</td>';});return h;}
		function secCells(sn){var h='';rawData.forEach(function(e){h+='<td style="font-weight:700;">'+formatINR(secVal(e,sn,'plan'))+'</td><td style="font-weight:700;">'+formatINR(secVal(e,sn,'est'))+'</td>';});return h;}
		function grandCells(){var h='';rawData.forEach(function(e){h+='<td>'+formatINR(grandVal(e,'plan'))+'</td><td>'+formatINR(grandVal(e,'est'))+'</td>';});return h;}
		function iTotP(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'ytd');});return v;}
		function iTotE(n){var v=0;rawData.forEach(function(e){v+=itemVal(e,n,'total_posted_amt');});return v;}
		function sTotP(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'plan');});return v;}
		function sTotE(sn,subn){var v=0;rawData.forEach(function(e){v+=subVal(e,sn,subn,'est');});return v;}
		function secTP(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'plan');});return v;}
		function secTE(sn){var v=0;rawData.forEach(function(e){v+=secVal(e,sn,'est');});return v;}
		function allGP(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'plan');});return v;}
		function allGE(){var v=0;rawData.forEach(function(e){v+=grandVal(e,'est');});return v;}

		function tc2(plan,est,cls){
			cls=cls||'';
			return '<td class="be-total-plan '+cls+'" style="font-weight:700;">'+formatINR(plan)+'</td>' +
			       '<td class="be-total-est  '+cls+'" style="font-weight:700;">'+formatINR(est)+'</td>';
		}

		function buildHeader(){
			var $t=$('#be-table thead').empty();
			var $r1=$('<tr class="cb-thead-main"></tr>');
			var $r2=$('<tr class="cb-thead-sub"></tr>');
			$r1.append('<th rowspan="2" style="text-align:left !important;min-width:280px;width:280px;position:sticky;left:0;z-index:50;background:#0076B6;vertical-align:middle;">Expense Head / Line Item</th>');
			rawData.forEach(function(e){$r1.append('<th colspan="2" style="text-align:center;min-width:260px;">'+entityLabel(e)+'</th>');});
			$r1.append('<th colspan="2" style="text-align:center;min-width:260px;background:#003B63;">Grand Total</th>');
			rawData.forEach(function(){$r2.append('<th style="text-align:center;min-width:130px;">'+pl()+'</th><th style="text-align:center;min-width:130px;">'+el()+'</th>');});
			$r2.append('<th style="text-align:center;min-width:130px;background:#004F8B;">'+pl()+'</th><th style="text-align:center;min-width:130px;background:#004F8B;">'+el()+'</th>');
			$t.append($r1).append($r2);
			fixStickySubHeader('#be-table');
		}

		function renderTable(){
			buildHeader();
			var $tb=$('#be-tbody').empty();
			var term=$('#be-search').val().trim().toLowerCase();
			var struct=buildStruct();
			var cols=1+rawData.length*2+2;
			if(!rawData.length||!struct.length){$tb.append('<tr><td colspan="'+cols+'" style="text-align:center;padding:40px;color:#aaa;">No data available.</td></tr>');return;}
			struct.forEach(function(sec){
				var sn=sec.name,secOpen=openSec[sn]!==false,secVis=secOpen?'':'display:none;';
				$tb.append('<tr class="cb-row-head be-sec-row" data-sec="'+sn+'"><td style="text-align:left;"><span class="cb-arrow">'+(secOpen?'▼':'▶')+'</span> '+sn+'</td>'+secCells(sn)+tc2(secTP(sn),secTE(sn),'be-grand-col')+'</tr>');
				sec.sub_heads.forEach(function(sub){
					var sk=sn+'::'+sub.name,subOpen=expandItems||(openSub[sk]===true),itmVis=(secOpen&&subOpen)?'':'display:none;';
					$tb.append('<tr class="cb-row-sub be-sec-child be-sub-row" data-sec="'+sn+'" data-sub="'+sk+'" style="'+secVis+'"><td style="padding-left:22px;text-align:left;"><span class="cb-arrow">'+(subOpen?'▼':'▶')+'</span> '+sub.name+'</td>'+subCells(sn,sub.name)+tc2(sTotP(sn,sub.name),sTotE(sn,sub.name),'be-grand-col')+'</tr>');
					sub.items.forEach(function(item){
						if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
						$tb.append('<tr class="be-item-row be-sec-child be-sub-child" data-sec="'+sn+'" data-sub="'+sk+'" style="'+itmVis+'"><td style="padding-left:42px;text-align:left;">'+item.name+'</td>'+itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col')+'</tr>');
					});
				});
				sec.items.forEach(function(item){
					if(term&&item.name.toLowerCase().indexOf(term)===-1){return;}
					$tb.append('<tr class="be-item-row be-sec-child be-direct-item" data-sec="'+sn+'" style="'+secVis+'"><td style="padding-left:30px;text-align:left;">'+item.name+'</td>'+itemCells(item.name)+tc2(iTotP(item.name),iTotE(item.name),'be-grand-col')+'</tr>');
				});
			});
			$tb.append('<tr class="cb-row-grand"><td style="text-align:left;">GRAND TOTAL</td>'+grandCells()+tc2(allGP(),allGE(),'be-grand-col')+'</tr>');
		}

		function toggleSec(sn){
			var o=!(openSec[sn]!==false);openSec[sn]=o;
			$('#be-table tbody .be-sec-row[data-sec="'+sn+'"]').find('.cb-arrow').text(o?'▼':'▶');
			var $ch=$('#be-table tbody .be-sec-child[data-sec="'+sn+'"]');
			if(o){$ch.filter('.be-sub-row,.be-direct-item').show();$ch.filter('.be-sub-child').each(function(){var sk=$(this).attr('data-sub');if(expandItems||openSub[sk]===true){$(this).show();}});}
			else{$ch.hide();}
		}
		function toggleSubRow(sk){
			var o=!(openSub[sk]===true);openSub[sk]=o;
			$('#be-table tbody .be-sub-row[data-sub="'+sk+'"]').find('.cb-arrow').text(o?'▼':'▶');
			var $it=$('#be-table tbody .be-sub-child[data-sub="'+sk+'"]');
			o?$it.show():$it.hide();
		}
		function bindEvents(){
			$('#tab-budget_estimate').on('click.be','.be-sec-row',function(e){e.stopPropagation();toggleSec($(this).attr('data-sec'));});
			$('#tab-budget_estimate').on('click.be','.be-sub-row',function(e){e.stopPropagation();if(!expandItems){toggleSubRow($(this).attr('data-sub'));}});
			$(document).on('change.be','#be-expand-items',function(){
				expandItems=this.checked;
				buildStruct().forEach(function(sec){openSec[sec.name]=expandItems?true:false;sec.sub_heads.forEach(function(sub){openSub[sec.name+'::'+sub.name]=expandItems;});});
				renderTable();
			});
			$(document).on('input.be','#be-search',function(){renderTable();});
		}
		function fetchAndRender(fy){
			currentFY=fy;rawData=[];openSec={};openSub={};expandItems=false;
			$('#be-expand-items').prop('checked',false);
			Loader.show("We're balancing budget and estimate");
			frappe.call({
				method  :'annual_budget.api.foundation_consolidated_report.format_api',
				args    :{financial_year:fy,month:'March',set_group_id:'2',previous_financial_year:getPrevFY(fy)},
				callback:function(r){
					if(r.message&&Array.isArray(r.message)){rawData=r.message;}
					else{frappe.msgprint('Failed to load Budget & Estimate data.');}
					Store.budgetEstimate=rawData; renderTable(); Loader.hide();
				},
				error:function(){Loader.hide();frappe.msgprint('Server error loading Budget & Estimate data.');}
			});
		}
		function load(fy){if(!bound){bindEvents();bound=true;}fetchAndRender(fy);}
		return {load:load};
	})();

	// =============================================================================
	// EXPORT BUTTON WIRING
	// =============================================================================

	var API = 'annual_budget.api.export_reports';

	$(document).on('click', '#xl-ppt', function () {
		var fy = fyControl.get_value() || '2025-26';
		if (!Store.ppt.rows.length) { frappe.msgprint('Please wait for the data to load first.'); return; }
		serverExport(API + '.export_ppt', {
			financial_year    : fy,
			ppt_rows          : JSON.stringify(Store.ppt.rows),
			prev_ppt_rows     : JSON.stringify(Store.ppt.prevRows),
			budget_label      : Store.ppt.budgetLabel,
			est_label         : Store.ppt.estLabel,
			prev_budget_label : Store.ppt.prevBudgetLabel,
			prev_est_label    : Store.ppt.prevEstLabel
		}, 'Building Foundation Metrics Excel\u2026');
	});

	$(document).on('click', '#xl-annual', function () {
		var fy = fyControl.get_value() || '2025-26';
		if (!Store.annual.length) { frappe.msgprint('Please load the Annual Budget tab first.'); return; }
		serverExport(API + '.export_annual', { financial_year:fy, annual_data:JSON.stringify(Store.annual) }, 'Building Annual Budget Excel\u2026');
	});

	$(document).on('click', '#xl-estimate', function () {
		var fy = fyControl.get_value() || '2025-26';
		if (!Store.estimate.length) { frappe.msgprint('Please load the Estimate tab first.'); return; }
		serverExport(API + '.export_estimate', { financial_year:fy, estimate_data:JSON.stringify(Store.estimate) }, 'Building Estimate Excel\u2026');
	});

	$(document).on('click', '#xl-be', function () {
		var fy = fyControl.get_value() || '2025-26';
		if (!Store.budgetEstimate.length) { frappe.msgprint('Please load the Budget & Estimate tab first.'); return; }
		serverExport(API + '.export_budget_estimate', { financial_year:fy, be_data:JSON.stringify(Store.budgetEstimate) }, 'Building Budget & Estimate Excel\u2026');
	});

	$(document).on('click', '#xl-headcount', function () {
		frappe.msgprint('Headcount Excel export will be available once the API endpoint is connected.');
	});

	$(document).on('click', '#xl-summary-inr', function () {
		frappe.msgprint('Summary in INR Excel export will be available once wired to the export API.');
	});

	$(document).on('click', '#xl-export-all', function () {
		var fy      = fyControl.get_value() || '2025-26';
		var missing = [];
		if (!Store.ppt.rows.length)       { missing.push('Foundation Metrics'); }
		if (!Store.annual.length)         { missing.push('Annual Budget'); }
		if (!Store.estimate.length)       { missing.push('Estimate'); }
		if (!Store.budgetEstimate.length) { missing.push('Budget & Estimate'); }
		if (missing.length) {
			frappe.msgprint('The following tabs have not been loaded yet:<br><b>' + missing.join(', ') + '</b><br>Please open each tab first, then click Export All.');
			return;
		}
		serverExport(API + '.export_all', {
			financial_year    : fy,
			ppt_rows          : JSON.stringify(Store.ppt.rows),
			prev_ppt_rows     : JSON.stringify(Store.ppt.prevRows),
			budget_label      : Store.ppt.budgetLabel,
			est_label         : Store.ppt.estLabel,
			prev_budget_label : Store.ppt.prevBudgetLabel,
			prev_est_label    : Store.ppt.prevEstLabel,
			annual_data       : JSON.stringify(Store.annual),
			estimate_data     : JSON.stringify(Store.estimate),
			be_data           : JSON.stringify(Store.budgetEstimate)
		}, 'Building full consolidated Excel\u2026');
	});

	// =============================================================================
	// AUTO-LOAD ACTIVE TAB
	// =============================================================================

	var initialFY = fyControl.get_value();
	if (initialFY) { TabLoader.trigger('ppt'); }

};