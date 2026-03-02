frappe.pages['consolidated-budget'].on_page_load = function(wrapper) {

	let page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Consolidated Budget',
		single_column: true
	});
	//!=============================================================== Tab Design code ================================================================
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

<div class="tab-pane" id="estimate">

<style>

#estimate-container {
    margin-top: 10px;
    background: #fff;
    border-radius: 8px;
    padding: 12px;
}

/* Controls */
#estimate-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    margin-bottom: 12px;
    background: #f7f9fb;
    border: 1px solid #ddd;
    border-radius: 6px;
}

#estimate-search {
    max-width: 300px;
    padding: 7px 12px;
    border: 1px solid #aaa;
    border-radius: 6px;
    font-size: 13px;
}

/* Table */
.estimate-table-wrapper {
    border: 1px solid #ccc;
    border-radius: 6px;
    overflow: auto;
    max-height: 70vh;
}

.estimate-table {
    width: 100%;
    min-width: 850px;
    border-collapse: collapse;
    font-size: 13px;
}

.estimate-table th,
.estimate-table td {
    border: 1px solid #ddd;
    padding: 8px 10px;
    text-align: center;
    white-space: nowrap;
}

.estimate-table th:first-child,
.estimate-table td:first-child {
    text-align: left;
}

/* Header */
.estimate-header th {
    background-color: #0076B6;
    color: #fff;
    font-weight: 700;
    position: sticky;
    top: 0;
}

/* Parent row */
.estimate-parent td {
    background: #E9F4FB;
    font-weight: 700;
    color: #003B63;
    cursor: pointer;
}

/* Child row */
.estimate-child td:first-child {
    padding-left: 30px;
}

.estimate-parent:hover td {
    background: #dceef9;
}

</style>

<div id="estimate-container">

    <div id="estimate-controls">
        <input type="text" id="estimate-search" placeholder="Search expense...">
    </div>

    <div class="estimate-table-wrapper">
        <table class="estimate-table">
            <thead>
                <tr class="estimate-header">
                    <th>Expense</th>
                    <th>QTR-1</th>
                    <th>QTR-2</th>
                    <th>QTR-3</th>
                    <th>QTR-4</th>
                    <th>Year Total</th>
                </tr>
            </thead>
            <tbody id="estimate-table-body"></tbody>
        </table>
    </div>

</div>

</div>




<div class="tab-pane" id="budget_estimate"><h4>Budget & Estimate Content</h4></div>

		</div>
	</div>
	`);
	$(document).on("click", "#budgetTab .nav-link", function() {
		$("#budgetTab .nav-link").removeClass("active");
		$(this).addClass("active");
		$(".tab-pane").removeClass("active");
		$("#" + $(this).data("tab")).addClass("active");
	});

	//!=============================================================== Annual Budget Consolidated ================================================================
		/* =====================================================
		STYLE
		===================================================== */

		const style = `
		<style>

		/* Container */
		#tables-container { 
			margin: 20px; 
			background-color: #ffffff; 
			border-radius: 8px; 
			padding: 8px; 
		}

		/* Controls */
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
			gap: 18px;
			font-size: 13px;
			font-weight: 500;
		}

		/* Table */
		.scroll-wrapper { 
			border: 1px solid #ccc; 
			border-radius: 6px; 
			overflow: auto; 
			max-height: 70vh; 
			background: #fff; 
		}

		table.university-table { 
			min-width: 1200px; 
			width: 100%; 
			border-collapse: collapse; 
			font-size: 13px; 
		}

		table.university-table th, 
		table.university-table td {
			border: 1px solid #ddd;
			padding: 8px 10px;
			white-space: nowrap;
			text-align: center;
		}

		table.university-table th:first-child,
		table.university-table td:first-child { 
			text-align: left; 
		}

		thead .main-row th { 
			background-color: #0076B6; 
			color: #fff; 
			position: sticky; 
			top: 0; 
			z-index: 25; 
		}

		thead .sub-row th { 
			background-color: #F26B21; 
			color: #fff; 
			position: sticky; 
			top: 34px; 
			z-index: 24; 
		}

		tr.expense-head { font-weight: 700; cursor: pointer; }
		tr.sub-head { background:#FFF3E6; font-weight:600; cursor:pointer; }
		tr.line-item td:first-child { padding-left: 35px; }

		.text-blue { color:#0076B6; font-weight:600; }
			/* TABLE */
		.table-title {
			font-size: 15px;
			font-weight: 600;
			color: #003B63;
			margin-bottom: 12px;
		}

		</style>
		`;

		$(style).appendTo(page.body);

		/* =====================================================
		STATE
		===================================================== */

		let expense_heads = [];
		let expandedHeads = [];
		let expandedSubHeads = [];
		let expandedQuarters = [];
		let annualLoaded = false;

		const quarters = {
			q1: { label: 'Quarter 1', months: ['April','May','June'] },
			q2: { label: 'Quarter 2', months: ['July','August','September'] },
			q3: { label: 'Quarter 3', months: ['October','November','December'] },
			q4: { label: 'Quarter 4', months: ['January','February','March'] }
		};

		const sumArray = arr => (arr || []).reduce((a,b)=>a+(b||0),0);
		const formatNumber = n => (n || 0).toLocaleString();

		/* =====================================================
		BUILD UI
		===================================================== */

		function buildUI(){

			const container = $(`
				<div id="tables-container">
				<h3 class="table-title">	
				Annual Budget Consolidated
				</h3>
					<div id="controls-row">
						<input id="global-search-box" type="text"
							placeholder="Search Expense / Item / GL Code...">
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
			bindControlEvents();
		}

		/* =====================================================
		CONTROL EVENTS
		===================================================== */

		function bindControlEvents(){

			$('#expand-quarters').on('change', function(){
				expandedQuarters = this.checked ? ['q1','q2','q3','q4'] : [];
				renderTable($('#global-search-box').val().toLowerCase());
			});

			$('#expand-items').on('change', function(){

				if(this.checked){
					expandedHeads = expense_heads.map(h => h.name.trim());
					expandedSubHeads = [];

					expense_heads.forEach(head=>{
						(head.sub_heads || []).forEach(sub=>{
							expandedSubHeads.push(head.name.trim()+"__"+sub.name.trim());
						});
					});

				} else {
					expandedHeads = [];
					expandedSubHeads = [];
				}

				renderTable($('#global-search-box').val().toLowerCase());
			});

			$('#global-search-box').on('input', function(){
				renderTable($(this).val().toLowerCase());
			});
		}

		/* =====================================================
		RENDER TABLE
		===================================================== */

		function renderTable(searchTerm = ''){

			const $table = $('#phase-table');
			$table.empty();

			expandedHeads = [...new Set(expandedHeads)];
			expandedSubHeads = [...new Set(expandedSubHeads)];

			const $thead = $('<thead></thead>');
			const $mainRow = $('<tr class="main-row"></tr>');

			$mainRow.append('<th rowspan="2">Expense Head / Line Item</th>');
			$mainRow.append('<th rowspan="2">GL Code</th>');

			['q1','q2','q3','q4'].forEach(q=>{
				const isExpanded = expandedQuarters.includes(q);
				const rowspan = isExpanded ? 1 : 2;
				const arrow = isExpanded ? '▲' : '▼';

				$mainRow.append(`
					<th class="expandable" data-quarter="${q}"
						colspan="3" rowspan="${rowspan}">
						${quarters[q].label} ${arrow}
					</th>
				`);
			});

			$mainRow.append('<th rowspan="2">Total</th>');
			$thead.append($mainRow);

			if(expandedQuarters.length){
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

			let grandTotals = {
				q1:[0,0,0],
				q2:[0,0,0],
				q3:[0,0,0],
				q4:[0,0,0]
			};

			expense_heads.forEach(head=>{

				const headName = head.name.trim();
				const headLower = headName.toLowerCase();

				let headMatches = headLower.includes(searchTerm);
				let hasMatchingChild = false;

				(head.sub_heads || []).forEach(sub=>{
					if(sub.name.toLowerCase().includes(searchTerm)){
						hasMatchingChild = true;
					}

					(sub.items || []).forEach(item=>{
						if(
							item.name.toLowerCase().includes(searchTerm) ||
							(item.gl_code && item.gl_code.toLowerCase().includes(searchTerm))
						){
							hasMatchingChild = true;
						}
					});
				});

				(head.items || []).forEach(item=>{
					if(
						item.name.toLowerCase().includes(searchTerm) ||
						(item.gl_code && item.gl_code.toLowerCase().includes(searchTerm))
					){
						hasMatchingChild = true;
					}
				});

				if(searchTerm && !headMatches && !hasMatchingChild){
					return;
				}

				if(searchTerm){
					expandedHeads.push(headName);
				}

				['q1','q2','q3','q4'].forEach(q=>{
					if(head[q]){
						head[q].forEach((val,i)=>{
							grandTotals[q][i] += (val || 0);
						});
					}
				});

				const headTotal = ['q1','q2','q3','q4']
					.reduce((sum,q)=>sum+sumArray(head[q]),0);

				$tbody.append(`
					<tr class="expense-head" data-head="${headName}">
						<td>${expandedHeads.includes(headName)?'▼':'▶'} ${headName}</td>
						<td>-</td>
						${renderQuarterCells(head)}
						<td class="text-blue">${formatNumber(headTotal)}</td>
					</tr>
				`);

				if(expandedHeads.includes(headName)){

					(head.sub_heads || []).forEach(sub=>{

						const subKey = headName+"__"+sub.name.trim();

						if(searchTerm){
							expandedSubHeads.push(subKey);
						}

						const subTotal = ['q1','q2','q3','q4']
							.reduce((sum,q)=>sum+sumArray(sub[q]),0);

						$tbody.append(`
							<tr class="sub-head" data-sub="${subKey}">
								<td>${expandedSubHeads.includes(subKey)?'▼':'▶'} ${sub.name}</td>
								<td>-</td>
								${renderQuarterCells(sub)}
								<td>${formatNumber(subTotal)}</td>
							</tr>
						`);

						if(expandedSubHeads.includes(subKey)){
							(sub.items || []).forEach(item=>{
								appendItemRow($tbody,item);
							});
						}
					});

					(head.items || []).forEach(item=>{
						appendItemRow($tbody,item);
					});
				}
			});

			const grandTotalSum = ['q1','q2','q3','q4']
				.reduce((sum,q)=>sum+sumArray(grandTotals[q]),0);

			$tbody.append(`
				<tr style="background:#e8f4fb;font-weight:700;">
					<td>GRAND TOTAL</td>
					<td>-</td>
					${renderQuarterCells(grandTotals)}
					<td class="text-blue">${formatNumber(grandTotalSum)}</td>
				</tr>
			`);

			$table.append($tbody);
		}

		/* =====================================================
		HELPERS
		===================================================== */

		function appendItemRow($tbody,item){

			const itemTotal = ['q1','q2','q3','q4']
				.reduce((sum,q)=>sum+sumArray(item[q]),0);

			$tbody.append(`
				<tr class="line-item">
					<td>${item.name}</td>
					<td>${item.gl_code || '-'}</td>
					${renderQuarterCells(item)}
					<td>${formatNumber(itemTotal)}</td>
				</tr>
			`);
		}

		function renderQuarterCells(obj){
			return ['q1','q2','q3','q4'].map(q=>{
				const data = obj[q] || [0,0,0];
				if(expandedQuarters.includes(q)){
					return data.map(v=>`<td>${formatNumber(v)}</td>`).join('');
				} else {
					return `<td colspan="3">${formatNumber(sumArray(data))}</td>`;
				}
			}).join('');
		}

		/* =====================================================
		DELEGATED EVENTS
		===================================================== */

		$(document).on('click','.expandable',function(){
			const q=$(this).data('quarter');
			expandedQuarters = expandedQuarters.includes(q)
				? expandedQuarters.filter(x=>x!==q)
				: [...expandedQuarters,q];
			renderTable($('#global-search-box').val().toLowerCase());
		});

		$(document).on('click','.expense-head',function(){
			const h=$(this).data('head');
			expandedHeads = expandedHeads.includes(h)
				? expandedHeads.filter(x=>x!==h)
				: [...expandedHeads,h];
			renderTable($('#global-search-box').val().toLowerCase());
		});

		$(document).on('click','.sub-head',function(){
			const s=$(this).data('sub');
			expandedSubHeads = expandedSubHeads.includes(s)
				? expandedSubHeads.filter(x=>x!==s)
				: [...expandedSubHeads,s];
			renderTable($('#global-search-box').val().toLowerCase());
		});

		/* =====================================================
		LOAD DATA
		===================================================== */

		function loadData(){

			buildUI();

			frappe.call({
				method:"annual_budget.api.phase_sheet.get_consolidated_report",
				args:{financial_year: "2025-26"},
				callback:function(r){
					expense_heads = r.message || [];
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



let estimateLoaded = false;

$(document).on("click", "[data-tab='estimate']", function () {
    if (!estimateLoaded) {
        estimateLoaded = true;
        loadEstimateData();
    }
});

function loadEstimateData() {

    frappe.call({
        method: "annual_budget.api.actuals.get_grouped_actuals_detailed_gl_test",
        args: {
            fiscal_year: "2025",
            accounting_period: "12"
        },
        freeze: true,
        freeze_message: "Loading Estimate...",
        callback: function (r) {

            if (r.message && r.message.status === "success") {
                renderEstimateTable(r.message.data);
            } else {
                frappe.msgprint("Failed to load Estimate data");
            }
        },
        error: function () {
            frappe.msgprint("Server error occurred");
        }
    });
}
// 1️⃣ Formatter
// ===============================
// 1️⃣ Indian Currency Formatter
// ===============================
function formatEstimateNumber(value) {

    const number = parseFloat(value || 0);

    return "₹ " + number.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// ===============================
// 2️⃣ Render Table
// ===============================
function renderEstimateTable(data) {

    const tbody = $("#estimate-table-body");
    tbody.empty();

    if (!Array.isArray(data) || data.length === 0) {

        tbody.append(`
            <tr>
                <td colspan="6" style="text-align:center;font-weight:600;">
                    No Data Available
                </td>
            </tr>
        `);

        return;
    }

    let grandQ1 = 0;
    let grandQ2 = 0;
    let grandQ3 = 0;
    let grandQ4 = 0;

    data.forEach((head, hIndex) => {

        const headQ1 = parseFloat(head.Q1 || 0);
        const headQ2 = parseFloat(head.Q2 || 0);
        const headQ3 = parseFloat(head.Q3 || 0);
        const headQ4 = parseFloat(head.Q4 || 0);

        const headTotal = headQ1 + headQ2 + headQ3 + headQ4;

        grandQ1 += headQ1;
        grandQ2 += headQ2;
        grandQ3 += headQ3;
        grandQ4 += headQ4;

        // 🔵 HEAD ROW
        tbody.append(`
            <tr class="estimate-head" data-head="${hIndex}" 
                style="font-weight:700;background:#f2f2f2;cursor:pointer;">
                <td class="toggle-icon">▶ ${head.name}</td>
                <td>${formatEstimateNumber(headQ1)}</td>
                <td>${formatEstimateNumber(headQ2)}</td>
                <td>${formatEstimateNumber(headQ3)}</td>
                <td>${formatEstimateNumber(headQ4)}</td>
                <td>${formatEstimateNumber(headTotal)}</td>
            </tr>
        `);

        // ================= CAPITAL =================
        if (Array.isArray(head.items) && head.items.length) {

            head.items.forEach(item => {

                const itemQ1 = parseFloat(item.Q1 || 0);
                const itemQ2 = parseFloat(item.Q2 || 0);
                const itemQ3 = parseFloat(item.Q3 || 0);
                const itemQ4 = parseFloat(item.Q4 || 0);

                const itemTotal = itemQ1 + itemQ2 + itemQ3 + itemQ4;

                tbody.append(`
                    <tr class="head-child head-child-${hIndex}" style="display:none;">
                        <td style="padding-left:30px;">
                            ${item.name} (${item.gl_code || ""})
                        </td>
                        <td>${formatEstimateNumber(itemQ1)}</td>
                        <td>${formatEstimateNumber(itemQ2)}</td>
                        <td>${formatEstimateNumber(itemQ3)}</td>
                        <td>${formatEstimateNumber(itemQ4)}</td>
                        <td>${formatEstimateNumber(itemTotal)}</td>
                    </tr>
                `);
            });
        }

        // ================= OPERATING =================
        if (Array.isArray(head.sub_heads) && head.sub_heads.length) {

            head.sub_heads.forEach((sub, sIndex) => {

                const subKey = `${hIndex}-${sIndex}`;

                const subQ1 = parseFloat(sub.Q1 || 0);
                const subQ2 = parseFloat(sub.Q2 || 0);
                const subQ3 = parseFloat(sub.Q3 || 0);
                const subQ4 = parseFloat(sub.Q4 || 0);

                const subTotal = subQ1 + subQ2 + subQ3 + subQ4;

                tbody.append(`
                    <tr class="estimate-sub head-child-${hIndex}" 
                        data-sub="${subKey}"
                        style="display:none;font-weight:600;cursor:pointer;">
                        <td class="toggle-icon" style="padding-left:20px;">
                            ▶ ${sub.name}
                        </td>
                        <td>${formatEstimateNumber(subQ1)}</td>
                        <td>${formatEstimateNumber(subQ2)}</td>
                        <td>${formatEstimateNumber(subQ3)}</td>
                        <td>${formatEstimateNumber(subQ4)}</td>
                        <td>${formatEstimateNumber(subTotal)}</td>
                    </tr>
                `);

                if (Array.isArray(sub.items) && sub.items.length) {

                    sub.items.forEach(item => {

                        const itemQ1 = parseFloat(item.Q1 || 0);
                        const itemQ2 = parseFloat(item.Q2 || 0);
                        const itemQ3 = parseFloat(item.Q3 || 0);
                        const itemQ4 = parseFloat(item.Q4 || 0);

                        const itemTotal = itemQ1 + itemQ2 + itemQ3 + itemQ4;

                        tbody.append(`
                            <tr class="sub-child sub-child-${subKey}" style="display:none;">
                                <td style="padding-left:40px;">
                                    ${item.name} (${item.gl_code || ""})
                                </td>
                                <td>${formatEstimateNumber(itemQ1)}</td>
                                <td>${formatEstimateNumber(itemQ2)}</td>
                                <td>${formatEstimateNumber(itemQ3)}</td>
                                <td>${formatEstimateNumber(itemQ4)}</td>
                                <td>${formatEstimateNumber(itemTotal)}</td>
                            </tr>
                        `);
                    });
                }

            });
        }

    });

    // ================= GRAND TOTAL =================
    const grandTotal = grandQ1 + grandQ2 + grandQ3 + grandQ4;

    tbody.append(`
        <tr style="font-weight:800;background:#0076B6;color:white;border-top:2px solid #000;">
            <td>GRAND TOTAL</td>
            <td>${formatEstimateNumber(grandQ1)}</td>
            <td>${formatEstimateNumber(grandQ2)}</td>
            <td>${formatEstimateNumber(grandQ3)}</td>
            <td>${formatEstimateNumber(grandQ4)}</td>
            <td>${formatEstimateNumber(grandTotal)}</td>
        </tr>
    `);
}
// ===============================
// HEAD Expand / Collapse
// ===============================
$(document).on("click", ".estimate-head", function () {

    const headIndex = $(this).data("head");
    const children = $(`.head-child-${headIndex}`);
    const iconCell = $(this).find(".toggle-icon");

    children.slideToggle(150);

    // Extract clean text safely
    let text = iconCell.text().replace("▶ ", "").replace("▼ ", "");

    if (children.is(":visible")) {
        iconCell.text("▼ " + text);
    } else {
        iconCell.text("▶ " + text);

        // Collapse all sub children
        $(`.sub-child-${headIndex}`).hide();
        $(this).siblings(".estimate-sub").find(".toggle-icon").each(function () {
            let t = $(this).text().replace("▶ ", "").replace("▼ ", "");
            $(this).text("▶ " + t);
        });
    }
});


// ===============================
// SUB Expand / Collapse
// ===============================
$(document).on("click", ".estimate-sub", function (e) {

    e.stopPropagation();

    const subKey = $(this).data("sub");
    const children = $(`.sub-child-${subKey}`);
    const iconCell = $(this).find(".toggle-icon");

    children.slideToggle(150);

    let text = iconCell.text().replace("▶ ", "").replace("▼ ", "");

    if (children.is(":visible")) {
        iconCell.text("▼ " + text);
    } else {
        iconCell.text("▶ " + text);
    }
});
};


