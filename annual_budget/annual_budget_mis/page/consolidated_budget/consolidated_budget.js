frappe.pages['consolidated-budget'].on_page_load = function(wrapper) {

	let page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Consolidated Budget',
		single_column: true
	});

	/* =====================================================
	   PAGE STRUCTURE
	===================================================== */

	$(page.body).html(`

	<style>
	.consolidated-budget-wrapper { padding:15px; background:#fff; }
	#budgetTab { border-bottom:1px solid #ddd; }
	#budgetTab .nav-link { cursor:pointer; margin-right:15px; color:#555; }
	#budgetTab .nav-link.active { color:#000; font-weight:600; border-bottom:2px solid #000; }
	.tab-pane { display:none; }
	.tab-pane.active { display:block; }
	</style>

	<div class="consolidated-budget-wrapper">

		<ul class="nav" id="budgetTab">
			<li class="nav-item"><a class="nav-link active" data-tab="ppt">PPT</a></li>
			<li class="nav-item"><a class="nav-link" data-tab="summary_inr">Summary in INR</a></li>
			<li class="nav-item"><a class="nav-link" data-tab="headcount">Headcount</a></li>
			<li class="nav-item"><a class="nav-link" data-tab="annual_budget">Annual Budget Consolidated</a></li>
			<li class="nav-item"><a class="nav-link" data-tab="estimate">Estimate Consolidated</a></li>
			<li class="nav-item"><a class="nav-link" data-tab="budget_estimate">Budget & Estimate</a></li>
		</ul>

		<div class="tab-content mt-3">

			<div class="tab-pane active" id="ppt"><h4>PPT Content</h4></div>
			<div class="tab-pane" id="summary_inr"><h4>Summary in INR Content</h4></div>
			<div class="tab-pane" id="headcount"><h4>Headcount Content</h4></div>

			<div class="tab-pane" id="annual_budget">
				<div id="annual-table-wrapper"></div>
			</div>

			<div class="tab-pane" id="estimate"><h4>Estimate Consolidated Content</h4></div>
			<div class="tab-pane" id="budget_estimate"><h4>Budget & Estimate Content</h4></div>

		</div>
	</div>
	`);

	/* =====================================================
	   TAB SWITCHING
	===================================================== */

	$(document).on("click", "#budgetTab .nav-link", function() {
		$("#budgetTab .nav-link").removeClass("active");
		$(this).addClass("active");
		$(".tab-pane").removeClass("active");
		$("#" + $(this).data("tab")).addClass("active");
	});

	/* =====================================================
	   FULL YOUR STYLE (EXACT)
	===================================================== */

const style = `
<style>

/* =====================================================
   CONTAINER
   ===================================================== */

#tables-container { 
    margin: 20px; 
    background-color: #ffffff; 
    border-radius: 8px; 
    padding: 8px; 
}


/* =====================================================
   CONTROLS ROW
   ===================================================== */

#controls-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding: 6px 10px;
    background: #f7f9fb;
    border: 1px solid #dcdcdc;
    border-radius: 6px;
}

#global-search-box { 
    width: 280px; 
    padding: 7px 12px; 
    border: 1px solid #aaa; 
    border-radius: 6px; 
    font-size: 13px;
}

#checkbox-area {
    display: flex;
    align-items: center;
    gap: 18px;
    font-size: 13px;
    font-weight: 500;
    color: #333;
}

#checkbox-area input {
    transform: scale(1.15);
    cursor: pointer;
}


/* =====================================================
   TABLE DESIGN
   ===================================================== */

.scroll-wrapper { 
    border: 1px solid #ccc; 
    border-radius: 6px; 
    overflow-x: auto; 
    overflow-y: auto; 
    max-height: 70vh; 
    background: #fff; 
}

table.university-table { 
    min-width: 1200px; 
    width: 100%; 
    border-collapse: collapse; 
    font-size: 13px; 
    color: #111; 
    background:#fff; 
}

table.university-table th, 
table.university-table td {
    border: 1px solid #ddd;
    padding: 8px 10px;
    white-space: nowrap;
    vertical-align: middle;
    text-align: center;
    background:#fff !important;
}

table.university-table th:first-child,
table.university-table td:first-child { 
    text-align: left !important; 
}

table.university-table th:nth-child(2),
table.university-table td:nth-child(2) { 
    text-align: left !important; 
}


/* =====================================================
   TABLE HEADERS
   ===================================================== */

table.university-table thead tr.main-row th { 
    background-color: #0076B6 !important; 
    color: #fff !important; 
    position: sticky; 
    top: 0; 
    z-index: 25; 
}

table.university-table thead tr.sub-row th { 
    background-color: #F26B21 !important; 
    color: #fff !important; 
    position: sticky; 
    top: 34px; 
    z-index: 24; 
}


/* =====================================================
   ROW TYPES
   ===================================================== */

tr.expense-head { 
    font-weight: 700; 
    cursor: pointer; 
}

tr.expense-head:hover td {
    background: #F4F9FD !important;
}

tr.sub-head { 
    background-color: #FFF3E6 !important;
    font-weight: 600; 
}

tr.sub-head:hover td {
    background-color: #FFEAD5 !important;
}

tr.line-item td:first-child { 
    padding-left: 35px !important; 
}

tr.sub-head td:first-child { 
    padding-left: 20px !important; 
}

.text-blue { 
    color: #0076B6; 
    font-weight: 600; 
}

td.gl-empty { 
    color: #aaa; 
    font-style: italic; 
}


/* =====================================================
   GRAND TOTAL TABLE ROW
   ===================================================== */

tr.grand-total-row td {
    background:#003B63 !important;
    color:#fff !important;
    font-weight:700 !important;
    border-top: 2px solid #000 !important;
}


</style>
`;	$(style).appendTo(page.body);

	/* =====================================================
	   STATE
	===================================================== */

	let expense_heads = [];
	let expandedHeads = [];
	let expandedSubHeads = [];
	let expandedQuarters = [];
	let searchText = "";
	let annualLoaded = false;

	const cards_container = $("#annual-cards");

	const quarters = {
		q1: { label: 'Quarter 1', months: ['April','May','June'] },
		q2: { label: 'Quarter 2', months: ['July','August','September'] },
		q3: { label: 'Quarter 3', months: ['October','November','December'] },
		q4: { label: 'Quarter 4', months: ['January','February','March'] }
	};

	const formatNumber = n => (n || 0).toLocaleString();

	function sum(arr){ return (arr||[]).reduce((a,b)=>a+(b||0),0); }

	function formatINR(value){
		return new Intl.NumberFormat('en-US',{
			style:'currency',
			currency:'INR'
		}).format(value||0);
	}

	/* =====================================================
	   BUILD TABLE UI
	===================================================== */

	function buildUI(){
		const container = $(`
			<div id="tables-container">

				<div id="controls-row">
					<input id="global-search-box" type="text"
						placeholder="Search Expense / Sub Head / Item / GL Code...">
					<div id="checkbox-area">
						<label><input type="checkbox" id="expand-quarters"> Expand Quarters</label>
						<label><input type="checkbox" id="expand-items"> Expand Line Items</label>
					</div>
				</div>

				<div class="scroll-wrapper">
					<table class="university-table" id="phase-table"></table>
				</div>

			</div>
		`);

		$("#annual-table-wrapper").empty().append(container);
	}



	/* =====================================================
	   RENDER TABLE (YOUR FULL LOGIC)
	===================================================== */

function renderTable(){

	const $table = $('#phase-table');
	$table.empty();

	const $thead = $('<thead></thead>');
	const $mainRow = $('<tr class="main-row"></tr>');
	$mainRow.append('<th rowspan="2">Expense Head / Line Item</th>');
	$mainRow.append('<th rowspan="2">GL Code</th>');

	['q1','q2','q3','q4'].forEach(q=>{
		const isExpanded = expandedQuarters.includes(q);
		const arrow = isExpanded ? '▲' : '▼';
		const colspan = 3;
		const rowspan = isExpanded ? 1 : 2;

		$mainRow.append(`
			<th class="expandable" data-quarter="${q}"
				colspan="${colspan}" rowspan="${rowspan}">
				${quarters[q].label} ${arrow}
			</th>
		`);
	});

	$mainRow.append('<th rowspan="2">Total</th>');
	$thead.append($mainRow);

	if(expandedQuarters.length>0){
		const $subRow = $('<tr class="sub-row"></tr>');
		['q1','q2','q3','q4'].forEach(q=>{
			if(expandedQuarters.includes(q)){
				quarters[q].months.forEach(m=>{
					$subRow.append(`<th>${m}</th>`);
				});
			}
		});
		$thead.append($subRow);
	}

	$table.append($thead);
	const $tbody = $('<tbody></tbody>');

	expense_heads.forEach(head=>{

		const headTotal = ['q1','q2','q3','q4']
			.reduce((sum,q)=>sum+sumArray(head[q]),0);

		$tbody.append(`
			<tr class="expense-head" data-head="${head.name}">
				<td>${expandedHeads.includes(head.name)?'▼':'▶'} ${head.name}</td>
				<td>-</td>
				${renderQuarterCells(head)}
				<td class="text-blue">${formatNumber(headTotal)}</td>
			</tr>
		`);

		/* =========================
		   SUB HEADS
		========================= */

		if(expandedHeads.includes(head.name) && head.sub_heads){

			head.sub_heads.forEach(sub=>{

				const key = head.name+"__"+sub.name;

				const subTotal = ['q1','q2','q3','q4']
					.reduce((sum,q)=>sum+sumArray(sub[q]),0);

				$tbody.append(`
					<tr class="sub-head" data-sub="${key}">
						<td>${expandedSubHeads.includes(key)?'▼':'▶'} ${sub.name}</td>
						<td>-</td>
						${renderQuarterCells(sub)}
						<td>${formatNumber(subTotal)}</td>
					</tr>
				`);

				/* =========================
				   ITEMS (THIS WAS MISSING)
				========================= */

				if(expandedSubHeads.includes(key) && sub.items){

					sub.items.forEach(item=>{

						const itemTotal = ['q1','q2','q3','q4']
							.reduce((sum,q)=>sum+sumArray(item[q]),0);

						$tbody.append(`
							<tr class="line-item">
								<td style="padding-left:35px;">
									${item.name}
								</td>
								<td>${item.gl_code || '-'}</td>
								${renderQuarterCells(item)}
								<td>${formatNumber(itemTotal)}</td>
							</tr>
						`);

					});
				}

			});
		}

	});

	$table.append($tbody);

	bindTableEvents();
}

	function sumArray(arr){ return (arr||[]).reduce((a,b)=>a+(b||0),0); }

	function renderQuarterCells(obj){
		return ['q1','q2','q3','q4'].map(q=>{
			if(expandedQuarters.includes(q)){
				return obj[q].map(v=>`<td>${formatNumber(v)}</td>`).join('');
			}else{
				return `<td colspan="3">${formatNumber(sumArray(obj[q]))}</td>`;
			}
		}).join('');
	}

	function bindTableEvents(){

		$('#phase-table').find('th.expandable').off().on('click',function(){
			const q=$(this).data('quarter');
			expandedQuarters=expandedQuarters.includes(q)?
				expandedQuarters.filter(x=>x!==q):
				[...expandedQuarters,q];
			renderTable();
		});

		$('#phase-table').find('.expense-head').off().on('click',function(){
			const h=$(this).data('head');
			expandedHeads=expandedHeads.includes(h)?
				expandedHeads.filter(x=>x!==h):
				[...expandedHeads,h];
			renderTable();
		});

		$('#phase-table').find('.sub-head').off().on('click',function(){
			const s=$(this).data('sub');
			expandedSubHeads=expandedSubHeads.includes(s)?
				expandedSubHeads.filter(x=>x!==s):
				[...expandedSubHeads,s];
			renderTable();
		});
	}

	/* =====================================================
	   LOAD DATA (LAZY)
	===================================================== */

	function loadData(){

		buildUI();

		frappe.call({
			method:"annual_budget.api.phase_sheet.get_consolidated_report",
			args:{financial_year: "2025-26"},
			callback:function(r){
				expense_heads=r.message||[];
				renderTable();
			}
		});
	}

	$(document).on("click","[data-tab='annual_budget']",function(){
		if(!annualLoaded){
			annualLoaded=true;
			loadData();
		}
	});

};