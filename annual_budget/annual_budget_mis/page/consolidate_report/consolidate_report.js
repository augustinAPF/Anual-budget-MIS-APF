// // ---------------------------------------------------------------------------
// // CONSOLIDATED REPORT PAGE (FIXED SEARCH BAR, FIXED ENTITY HEADER, RESPONSIVE BLUE/ORANGE THEME)
// // ---------------------------------------------------------------------------

// frappe.pages['consolidate-report'].on_page_load = function (wrapper) {
// 	const page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Consolidated Report',
// 		single_column: true
// 	});

// 	const html = `
// 	<div class="dashboard-wrapper">

// 		<h2 class="table-title">Consolidated Report</h2>

// 		<!-- FILTERS -->
// 		<div class="filter-container">
// 			<div id="financial-year-field"></div>
// 			<div id="month-field"></div>
// 			<button id="refresh-report">Apply</button>
// 		</div>

// 		<!-- SUMMARY CARDS -->
// 		<div id="summary-cards" class="frappe-number-cards"></div>

// 		<!-- STICKY SEARCH BAR -->
// 		<div class="table-controls">
// 			<div class="search-bar">
// 				<input type="text" id="search-input" placeholder="🔍 Search expense..." />
// 			</div>
// 		</div>

// 		<!-- SCROLLABLE TABLE -->
// 		<div class="scroll-wrapper">
// 			<table class="university-table" id="expense-table">
// 				<thead id="table-header"></thead>
// 				<tbody id="table-body"></tbody>
// 			</table>
// 		</div>
// 	</div>

// 	<style>
// 		/* === BASE LAYOUT === */
// 		.dashboard-wrapper {
// 			padding: 16px;
// 			background-color: #fff;
// 			color: #111;
// 		}
// 		h2.table-title {
// 			color: #0076B6;
// 			font-size: 20px;
// 			font-weight: 700;
// 			margin-bottom: 14px;
// 		}

// 		/* --- FILTERS --- */
// 		.filter-container {
// 			display: flex;
// 			flex-wrap: wrap;
// 			align-items: center;
// 			gap: 10px;
// 			margin-bottom: 12px;
// 		}
// 		select, button {
// 			padding: 6px 10px;
// 			border: 1px solid #ccc;
// 			border-radius: 4px;
// 			font-size: 13px;
// 			background: #fff;
// 			min-width: 120px;
// 		}
// 		button {
// 			background-color: #0076B6;
// 			color: white;
// 			cursor: pointer;
// 			border: none;
// 			transition: 0.2s;
// 		}
// 		button:hover { background-color: #005f8d; }

// 		/* --- SUMMARY CARDS --- */
// 		.frappe-number-cards {
// 			display: flex;
// 			flex-wrap: wrap;
// 			gap: 16px;
// 			margin: 18px 0;
// 		}
// 		.frappe-card {
// 			flex: 1 1 260px;
// 			max-width: 280px;
// 			height: 120px;
// 			background: #fff;
// 			border: 1px solid #ccc;
// 			border-radius: 8px;
// 			display: flex;
// 			flex-direction: column;
// 			justify-content: center;
// 			align-items: flex-start;
// 			padding: 14px 18px;
// 			box-shadow: 0 2px 6px rgba(0,0,0,0.08);
// 		}
// 		.frappe-card-value {
// 			font-size: 18px;
// 			font-weight: 600;
// 			color: #0076B6;
// 		}

// 		/* --- STICKY SEARCH BAR --- */
// 		.table-controls {
// 			position: sticky;
// 			top: 0;
// 			z-index: 60;
// 			display: flex;
// 			justify-content: flex-start;
// 			align-items: center;
// 			padding: 6px 10px;
// 			border: 1px solid #0076B6;
// 			border-radius: 4px 4px 0 0;
// 			background-color: #fff;
// 			border-bottom: 3px solid #0076B6;
// 		}
// 		.search-bar input {
// 			width: 240px;
// 			border: 1px solid #ccc;
// 			border-radius: 4px;
// 			padding: 6px 8px;
// 			font-size: 13px;
// 		}

// 		/* --- SCROLLABLE TABLE --- */
// 		.scroll-wrapper {
// 			border: 1px solid #000;
// 			border-radius: 0 0 4px 4px;
// 			overflow-x: auto;
// 			overflow-y: auto;
// 			max-height: 55vh;
// 			width: 100%;
// 			position: relative;
// 		}

// 		table.university-table {
// 			min-width: 1200px;
// 			width: 100%;
// 			border-collapse: collapse;
// 			font-size: 13px;
// 			text-align: center;
// 			color: #111;
// 		}
// 		table.university-table th,
// 		table.university-table td {
// 			border: 1px solid #000;
// 			padding: 6px 8px;
// 			white-space: nowrap;
// 			vertical-align: middle;
// 		}

// 		/* --- FIXED STICKY HEADERS (NO OVERLAP) --- */
// 		table.university-table thead th {
// 			position: sticky;
// 			background-clip: padding-box;
// 			z-index: 10;
// 		}

// 		table.university-table thead tr:first-child th {
// 			background-color: #0076B6;
// 			color: #fff;
// 			top: 0;
// 			height: 34px;
// 			z-index: 60; /* topmost row */
// 		}

// 		table.university-table thead tr:nth-child(2) th {
// 			background-color: #F26B21;
// 			color: #fff;
// 			top: 34px;
// 			height: 34px;
// 			z-index: 59;
// 		}

// 		table.university-table thead tr:nth-child(3) th {
// 			background-color: #f3f4f6;
// 			top: 68px;
// 			height: 34px;
// 			z-index: 58;
// 		}

// 		/* --- FIXED STICKY FIRST COLUMN (NO OVERLAP) --- */
// 		table.university-table th:first-child,
// 		table.university-table td:first-child {
// 			position: sticky;
// 			left: 0;
// 			background-color: #fff;
// 			z-index: 65; /* above other cells */
// 			text-align: left;
// 			box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
// 		}

// 		table.university-table thead tr:first-child th:first-child {
// 			background-color: #0076B6;
// 			color: #fff;
// 			z-index: 70;
// 		}
// 		table.university-table thead tr:nth-child(2) th:first-child {
// 			background-color: #F26B21;
// 			color: #fff;
// 			z-index: 69;
// 		}
// 		table.university-table thead tr:nth-child(3) th:first-child {
// 			background-color: #f3f4f6;
// 			z-index: 68;
// 		}

// 		/* --- TOTAL ROW --- */
// 		.total-row {
// 			font-weight: 700;
// 			background-color: #f9f9f9 !important;
// 			border-top: 2px solid #000;
// 			border-bottom: 2px solid #000;
// 		}
// 		.total-row td:first-child {
// 			text-align: right;
// 			background-color: #f9f9f9 !important;
// 		}

// 		/* --- SCROLLBAR POLISH --- */
// 		.scroll-wrapper {
// 			scrollbar-width: thin;
// 			scrollbar-color: #0076B6 #f1f1f1;
// 		}
// 		.scroll-wrapper::-webkit-scrollbar {
// 			height: 8px;
// 		}
// 		.scroll-wrapper::-webkit-scrollbar-thumb {
// 			background-color: #0076B6;
// 			border-radius: 4px;
// 		}
// 		.scroll-wrapper::-webkit-scrollbar-track {
// 			background: #f1f1f1;
// 		}

// 		/* --- RESPONSIVE --- */
// 		@media (max-width: 992px) {
// 			.filter-container { flex-direction: column; align-items: flex-start; }
// 			select, button { width: 100%; max-width: 300px; }
// 			h2.table-title { font-size: 18px; }
// 			.search-bar input { width: 100%; }
// 		}
// 		@media (max-width: 600px) {
// 			table.university-table { font-size: 12px; }
// 			select, button { font-size: 12px; }
// 		}
// 	</style>
// 	`;

// 	$(page.body).html(html);

// 	// Filters
// 	const fyField = frappe.ui.form.make_control({
// 		parent: $('#financial-year-field'),
// 		df: { fieldname: 'financial_year', label: 'Financial Year', fieldtype: 'Link', options: 'Financial Year' },
// 		render_input: true
// 	});
// 	fyField.refresh();
// 	window.fyField = fyField;

// 	const monthField = frappe.ui.form.make_control({
// 		parent: $('#month-field'),
// 		df: { fieldname: 'month', label: 'Month', fieldtype: 'Link', options: 'Month' },
// 		render_input: true
// 	});
// 	monthField.refresh();
// 	window.monthField = monthField;

// 	// Events
// 	document.getElementById("refresh-report").addEventListener("click", loadConsolidatedReport);
// 	document.getElementById("search-input").addEventListener("input", filterTable);
// 	fyField.$input.on("change", loadConsolidatedReport);

// 	loadConsolidatedReport();
// };

// // ---------------------------------------------------------------------------
// // DATA FETCH + RENDER
// // ---------------------------------------------------------------------------

// function loadConsolidatedReport() {
// 	const fy = window.fyField ? fyField.get_value() : "";

// 	frappe.call({
// 		method: "annual_budget.api.finance_budget.get_consolidated_report",
// 		args: { financial_year: fy },
// 		freeze: true,
// 		freeze_message: "Loading Consolidated Data...",
// 		callback: function (r) {
// 			const data = r.message?.entities || [];
// 			if (!data.length) {
// 				document.getElementById("table-body").innerHTML =
// 					"<tr><td colspan='99' style='text-align:center;'>No data found</td></tr>";
// 				document.getElementById("summary-cards").innerHTML = "";
// 				return;
// 			}
// 			renderSummaryCards(data);
// 			renderExpenseTable(data);
// 		},
// 	});
// }

// // ---------------------------------------------------------------------------
// // SUMMARY CARDS
// // ---------------------------------------------------------------------------

// function renderSummaryCards(entities) {
// 	const container = document.getElementById("summary-cards");
// 	container.innerHTML = "";
// 	entities.forEach(e => {
// 		const total = e.cost_centers.reduce((sum, cc) =>
// 			sum + (cc.data.reduce((a, d) => a + (d.budget || 0), 0)), 0);
// 		container.innerHTML += `
// 			<div class="frappe-card">
// 				<div class="frappe-card-title">${e.name}</div>
// 				<div class="frappe-card-value">₹ ${total.toLocaleString()}</div>
// 			</div>`;
// 	});
// }

// // ---------------------------------------------------------------------------
// // TABLE RENDER
// // ---------------------------------------------------------------------------

// function renderExpenseTable(entities) {
// 	const header = document.getElementById("table-header");
// 	const body = document.getElementById("table-body");
// 	header.innerHTML = "";
// 	body.innerHTML = "";

// 	const visibleCols = ["Budget", "Actuals", "Previous Year"];

// 	let entityRow = `<tr><th rowspan="3">Expenses</th>`;
// 	entities.forEach(e => {
// 		const totalCols = e.cost_centers.length * visibleCols.length;
// 		entityRow += `<th colspan="${totalCols}">${e.name}</th>`;
// 	});
// 	entityRow += `</tr>`;

// 	let ccRow = "<tr>";
// 	entities.forEach(e => {
// 		e.cost_centers.forEach(cc => {
// 			ccRow += `<th colspan="${visibleCols.length}">${cc.name}</th>`;
// 		});
// 	});
// 	ccRow += "</tr>";

// 	let metricRow = "<tr>";
// 	entities.forEach(e => {
// 		e.cost_centers.forEach(() => {
// 			visibleCols.forEach(v => metricRow += `<th>${v}</th>`);
// 		});
// 	});
// 	metricRow += "</tr>";

// 	header.innerHTML = entityRow + ccRow + metricRow;

// 	const allExpenses = new Set();
// 	entities.forEach(e =>
// 		e.cost_centers.forEach(cc =>
// 			cc.data.forEach(d => allExpenses.add(d.type_of_expense))
// 		)
// 	);

// 	let bodyHTML = "";
// 	allExpenses.forEach(exp => {
// 		bodyHTML += `<tr><td>${exp}</td>`;
// 		entities.forEach(e => {
// 			e.cost_centers.forEach(cc => {
// 				const row = cc.data.find(d => d.type_of_expense === exp);
// 				visibleCols.forEach(metric => {
// 					const val =
// 						metric === "Budget" ? row?.budget ?? 0 :
// 						metric === "Actuals" ? row?.actuals ?? 0 :
// 						row?.previous_year ?? 0;
// 					bodyHTML += `<td>₹ ${(val || 0).toLocaleString()}</td>`;
// 				});
// 			});
// 		});
// 		bodyHTML += `</tr>`;
// 	});

// 	let grandRow = `<tr class="total-row"><td>Grand Total</td>`;
// 	entities.forEach(e => {
// 		e.cost_centers.forEach(cc => {
// 			visibleCols.forEach(metric => {
// 				const val =
// 					metric === "Budget"
// 						? cc.data.reduce((a, d) => a + (d.budget || 0), 0)
// 						: metric === "Actuals"
// 						? cc.data.reduce((a, d) => a + (d.actuals || 0), 0)
// 						: cc.data.reduce((a, d) => a + (d.previous_year || 0), 0);
// 				grandRow += `<td>₹ ${val.toLocaleString()}</td>`;
// 			});
// 		});
// 	});
// 	grandRow += "</tr>";

// 	body.innerHTML = bodyHTML + grandRow;
// }

// // ---------------------------------------------------------------------------
// // SEARCH FILTER
// // ---------------------------------------------------------------------------

// function filterTable() {
// 	const term = document.getElementById("search-input").value.toLowerCase();
// 	document.querySelectorAll("#table-body tr").forEach(row => {
// 		const match = row.querySelector("td:first-child")?.innerText.toLowerCase().includes(term);
// 		row.style.display = match || row.classList.contains("total-row") ? "" : "none";
// 	});
// }



// ---------------------------------------------------------------------------
// CONSOLIDATED REPORT PAGE (FIXED SEARCH BAR, FIXED ENTITY HEADER, RESPONSIVE BLUE/ORANGE THEME)
// ---------------------------------------------------------------------------





// frappe.pages['consolidate-report'].on_page_load = function (wrapper) {
// 	const page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Consolidated Report',
// 		single_column: true
// 	});

// 	const html = `
// 	<div class="dashboard-wrapper">

// 		<!-- SUMMARY CARDS -->
// 		<div id="summary-cards" class="frappe-number-cards"></div>

// 		<!-- STICKY SEARCH BAR -->
// 		<div class="table-controls">
// 			<div class="search-bar">
// 				<input type="text" id="search-input" placeholder="🔍 Search expense..." />
// 			</div>
// 		</div>

// 		<!-- SCROLLABLE TABLE -->
// 		<div class="scroll-wrapper">
// 			<table class="university-table" id="expense-table">
// 				<thead id="table-header"></thead>
// 				<tbody id="table-body"></tbody>
// 			</table>
// 		</div>
// 	</div>

// 	<style>
// 		/* === BASE LAYOUT === */
// 		.dashboard-wrapper {
// 			padding: 16px;
// 			background-color: #fff;
// 			color: #111;
// 		}
// 		h2.table-title {
// 			color: #0076B6;
// 			font-size: 20px;
// 			font-weight: 700;
// 			margin-bottom: 14px;
// 		}

// 		/* --- SUMMARY CARDS --- */
// 		.frappe-number-cards {
// 			display: flex;
// 			flex-wrap: wrap;
// 			gap: 16px;
// 			margin: 18px 0;
// 		}
// 		.frappe-card {
// 			flex: 1 1 260px;
// 			max-width: 280px;
// 			height: 120px;
// 			background: #fff;
// 			border: 1px solid #ccc;
// 			border-radius: 8px;
// 			display: flex;
// 			flex-direction: column;
// 			justify-content: center;
// 			align-items: flex-start;
// 			padding: 14px 18px;
// 			box-shadow: 0 2px 6px rgba(0,0,0,0.08);
// 		}
// 		.frappe-card-value {
// 			font-size: 18px;
// 			font-weight: 600;
// 			color: #0076B6;
// 		}

// 		/* --- STICKY SEARCH BAR --- */
// 		.table-controls {
// 			position: sticky;
// 			top: 0;
// 			z-index: 60;
// 			display: flex;
// 			justify-content: flex-start;
// 			align-items: center;
// 			padding: 6px 10px;
// 			border: 1px solid #0076B6;
// 			border-radius: 4px 4px 0 0;
// 			background-color: #fff;
// 			border-bottom: 3px solid #0076B6;
// 		}
// 		.search-bar input {
// 			width: 240px;
// 			border: 1px solid #ccc;
// 			border-radius: 4px;
// 			padding: 6px 8px;
// 			font-size: 13px;
// 		}

// 		/* --- SCROLLABLE TABLE --- */
// 		.scroll-wrapper {
// 			border: 1px solid #000;
// 			border-radius: 0 0 4px 4px;
// 			overflow-x: auto;
// 			overflow-y: auto;
// 			max-height: 55vh;
// 			width: 100%;
// 			position: relative;
// 		}

// 		table.university-table {
// 			min-width: 1200px;
// 			width: 100%;
// 			border-collapse: collapse;
// 			font-size: 13px;
// 			text-align: center;
// 			color: #111;
// 		}
// 		table.university-table th,
// 		table.university-table td {
// 			border: 1px solid #000;
// 			padding: 6px 8px;
// 			white-space: nowrap;
// 			vertical-align: middle;
// 		}

// 		/* --- FIXED STICKY HEADERS (NO OVERLAP) --- */
// 		table.university-table thead th {
// 			position: sticky;
// 			background-clip: padding-box;
// 			z-index: 10;
// 		}

// 		table.university-table thead tr:first-child th {
// 			background-color: #0076B6;
// 			color: #fff;
// 			top: 0;
// 			height: 34px;
// 			z-index: 60;
// 		}

// 		table.university-table thead tr:nth-child(2) th {
// 			background-color: #F26B21;
// 			color: #fff;
// 			top: 34px;
// 			height: 34px;
// 			z-index: 59;
// 		}

// 		table.university-table thead tr:nth-child(3) th {
// 			background-color: #f3f4f6;
// 			top: 68px;
// 			height: 34px;
// 			z-index: 58;
// 		}

// 		/* --- FIXED STICKY FIRST COLUMN (NO OVERLAP) --- */
// 		table.university-table th:first-child,
// 		table.university-table td:first-child {
// 			position: sticky;
// 			left: 0;
// 			background-color: #fff;
// 			z-index: 65;
// 			text-align: left;
// 			box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
// 		}

// 		table.university-table thead tr:first-child th:first-child {
// 			background-color: #0076B6;
// 			color: #fff;
// 			z-index: 70;
// 		}
// 		table.university-table thead tr:nth-child(2) th:first-child {
// 			background-color: #F26B21;
// 			color: #fff;
// 			z-index: 69;
// 		}
// 		table.university-table thead tr:nth-child(3) th:first-child {
// 			background-color: #f3f4f6;
// 			z-index: 68;
// 		}

// 		/* --- TOTAL ROW --- */
// 		.total-row {
// 			font-weight: 700;
// 			background-color: #f9f9f9 !important;
// 			border-top: 2px solid #000;
// 			border-bottom: 2px solid #000;
// 		}
// 		.total-row td:first-child {
// 			text-align: right;
// 			background-color: #f9f9f9 !important;
// 		}

// 		/* --- SCROLLBAR POLISH --- */
// 		.scroll-wrapper {
// 			scrollbar-width: thin;
// 			scrollbar-color: #0076B6 #f1f1f1;
// 		}
// 		.scroll-wrapper::-webkit-scrollbar {
// 			height: 8px;
// 		}
// 		.scroll-wrapper::-webkit-scrollbar-thumb {
// 			background-color: #0076B6;
// 			border-radius: 4px;
// 		}
// 		.scroll-wrapper::-webkit-scrollbar-track {
// 			background: #f1f1f1;
// 		}

// 		/* --- RESPONSIVE --- */
// 		@media (max-width: 992px) {
// 			h2.table-title { font-size: 18px; }
// 			.search-bar input { width: 100%; }
// 		}
// 		@media (max-width: 600px) {
// 			table.university-table { font-size: 12px; }
// 		}
// 	</style>
// 	`;

// 	$(page.body).html(html);

// 	// Events
// 	document.getElementById("search-input").addEventListener("input", filterTable);

// 	loadConsolidatedReport();
// };

// // ---------------------------------------------------------------------------
// // DATA FETCH + RENDER
// // ---------------------------------------------------------------------------

// function loadConsolidatedReport() {
// 	frappe.call({
// 		method: "annual_budget.api.finance_budget.get_consolidated_report",
// 		args: {},
// 		freeze: true,
// 		freeze_message: "Loading Consolidated Data...",
// 		callback: function (r) {
// 			const data = r.message?.entities || [];
// 			if (!data.length) {
// 				document.getElementById("table-body").innerHTML =
// 					"<tr><td colspan='99' style='text-align:center;'>No data found</td></tr>";
// 				document.getElementById("summary-cards").innerHTML = "";
// 				return;
// 			}
// 			renderSummaryCards(data);
// 			renderExpenseTable(data);
// 		},
// 	});
// }

// // ---------------------------------------------------------------------------
// // SUMMARY CARDS
// // ---------------------------------------------------------------------------

// function renderSummaryCards(entities) {
// 	const container = document.getElementById("summary-cards");
// 	container.innerHTML = "";
// 	entities.forEach(e => {
// 		const total = e.cost_centers.reduce((sum, cc) =>
// 			sum + (cc.data.reduce((a, d) => a + (d.budget || 0), 0)), 0);

// 		const roundedTotal = Math.round(total); // ✅ Round the total

// 		container.innerHTML += `
// 			<div class="frappe-card">
// 				<div class="frappe-card-title">${e.name}</div>
// 				<div class="frappe-card-value">₹ ${roundedTotal.toLocaleString()}</div>
// 			</div>`;
// 	});
// }


// // ---------------------------------------------------------------------------
// // TABLE RENDER
// // ---------------------------------------------------------------------------

// function renderExpenseTable(entities) {
// 	const header = document.getElementById("table-header");
// 	const body = document.getElementById("table-body");
// 	header.innerHTML = "";
// 	body.innerHTML = "";

// 	const visibleCols = ["Budget", "Actuals", "Previous Year"];

// 	let entityRow = `<tr><th rowspan="3">Expenses</th>`;
// 	entities.forEach(e => {
// 		const totalCols = e.cost_centers.length * visibleCols.length;
// 		entityRow += `<th colspan="${totalCols}">${ e.name}</th>`;
// 	});
// 	entityRow += `</tr>`;

// 	let ccRow = "<tr>";
// 	entities.forEach(e => {
// 		e.cost_centers.forEach(cc => {
// 			ccRow += `<th colspan="${visibleCols.length}">${cc.name}  (₹)</th>`;
// 		});
// 	});
// 	ccRow += "</tr>";

// 	let metricRow = "<tr>";
// 	entities.forEach(e => {
// 		e.cost_centers.forEach(() => {
// 			visibleCols.forEach(v => metricRow += `<th>${v}</th>`);
// 		});
// 	});
// 	metricRow += "</tr>";

// 	header.innerHTML = entityRow + ccRow + metricRow;

// 	const allExpenses = new Set();
// 	entities.forEach(e =>
// 		e.cost_centers.forEach(cc =>
// 			cc.data.forEach(d => allExpenses.add(d.type_of_expense))
// 		)
// 	);

// 	let bodyHTML = "";
// 	allExpenses.forEach(exp => {
// 		bodyHTML += `<tr><td>${exp}</td>`;
// 		entities.forEach(e => {
// 			e.cost_centers.forEach(cc => {
// 				const row = cc.data.find(d => d.type_of_expense === exp);
// 				visibleCols.forEach(metric => {
// 					const val =
// 						metric === "Budget" ? row?.budget ?? 0 :
// 						metric === "Actuals" ? row?.actuals ?? 0 :
// 						row?.previous_year ?? 0;
// 					bodyHTML += `<td> ${(val || 0).toLocaleString()}</td>`;
// 				});
// 			});
// 		});
// 		bodyHTML += `</tr>`;
// 	});

// 	let grandRow = `<tr class="total-row"><td>Grand Total (₹)</td>`;
// 	entities.forEach(e => {
// 		e.cost_centers.forEach(cc => {
// 			visibleCols.forEach(metric => {
// 				const val =
// 					metric === "Budget"
// 						? cc.data.reduce((a, d) => a + (d.budget || 0), 0)
// 						: metric === "Actuals"
// 						? cc.data.reduce((a, d) => a + (d.actuals || 0), 0)
// 						: cc.data.reduce((a, d) => a + (d.previous_year || 0), 0);
// 				grandRow += `<td> ${val.toLocaleString()}</td>`;
// 			});
// 		});
// 	});
// 	grandRow += "</tr>";

// 	body.innerHTML = bodyHTML + grandRow;
// }

// // ---------------------------------------------------------------------------
// // SEARCH FILTER
// // ---------------------------------------------------------------------------

// function filterTable() {
// 	const term = document.getElementById("search-input").value.toLowerCase();
// 	document.querySelectorAll("#table-body tr").forEach(row => {
// 		const match = row.querySelector("td:first-child")?.innerText.toLowerCase().includes(term);
// 		row.style.display = match || row.classList.contains("total-row") ? "" : "none";
// 	});
// }



frappe.pages['consolidate-report'].on_page_load = function (wrapper) {

	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Consolidated Report',
		single_column: true
	});

	// -------------------------------------------------
	// HTML STRUCTURE (CARDS + TABLE)
	// -------------------------------------------------
	const html = `
	<div class="dashboard-wrapper">

		<!-- NUMBER CARDS -->
		<div class="card-row"></div>

		<!-- STICKY SEARCH BAR -->
		<div class="table-controls">
			<div class="search-bar">
				<input type="text" id="search-input" placeholder="🔍 Search expense..." />
			</div>
		</div>

		<!-- SCROLLABLE TABLE -->
		<div class="scroll-wrapper">
			<table class="university-table" id="expense-table">
				<thead id="table-header"></thead>
				<tbody id="table-body"></tbody>
			</table>
		</div>

	</div>
	`;

	$(page.body).html(html);

	// -------------------------------------------------
	// CSS INJECTION
	// -------------------------------------------------
	$(`
	<style>

	.page-content {
		background:#f5f6f8;
	}

	.dashboard-wrapper {
		padding: 16px;
		color: #111;
	}

	/* =============================
	   NUMBER CARDS
	============================= */

	.card-row{
		display:grid;
		grid-template-columns: repeat(4, 1fr);
		gap:16px;
		margin-bottom:20px;
	}

	.number-card{
		background:#ffffff;
		border-radius:10px;
		padding:18px;
		box-shadow:0 3px 10px rgba(0,0,0,.06);
		transition:.2s ease;
	}

	.number-card:hover{
		transform:translateY(-3px);
		box-shadow:0 6px 18px rgba(0,0,0,.12);
	}

	.number-title{
		font-size:13px;
		font-weight:600;
		text-transform:uppercase;
		margin-bottom:8px;
		letter-spacing:.5px;
		color:#000;
	}

	.number-value{
		font-size:22px;
		font-weight:700;
		color:#000;
	}

	/* =============================
	   TABLE CONTROLS
	============================= */

	.table-controls {
		position: sticky;
		top: 0;
		z-index: 60;
		display: flex;
		align-items: center;
		padding: 6px 10px;
		border: 1px solid #0076B6;
		border-radius: 4px 4px 0 0;
		background-color: #fff;
		border-bottom: 3px solid #0076B6;
	}

	.search-bar input {
		width: 240px;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 6px 8px;
		font-size: 13px;
	}

	.scroll-wrapper {
		border: 1px solid #000;
		border-radius: 0 0 4px 4px;
		overflow-x: auto;
		overflow-y: auto;
		max-height: 55vh;
		width: 100%;
		position: relative;
	}

	table.university-table {
		min-width: 1200px;
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
		text-align: center;
		color: #111;
	}

	table.university-table th,
	table.university-table td {
		border: 1px solid #000;
		padding: 6px 8px;
		white-space: nowrap;
		vertical-align: middle;
	}

	/* Sticky Headers */
	table.university-table thead th {
		position: sticky;
		background-clip: padding-box;
		z-index: 10;
	}

	table.university-table thead tr:first-child th {
		background-color: #0076B6;
		color: #fff;
		top: 0;
		height: 34px;
		z-index: 60;
	}

	table.university-table thead tr:nth-child(2) th {
		background-color: #F26B21;
		color: #fff;
		top: 34px;
		height: 34px;
		z-index: 59;
	}

	table.university-table thead tr:nth-child(3) th {
		background-color: #f3f4f6;
		top: 68px;
		height: 34px;
		z-index: 58;
	}

	/* Sticky First Column */
	table.university-table th:first-child,
	table.university-table td:first-child {
		position: sticky;
		left: 0;
		background-color: #fff;
		z-index: 65;
		text-align: left;
		box-shadow: 2px 0 4px rgba(0,0,0,0.05);
	}

	table.university-table thead tr:first-child th:first-child {
		background-color: #0076B6;
		color: #fff;
		z-index: 70;
	}

	table.university-table thead tr:nth-child(2) th:first-child {
		background-color: #F26B21;
		color: #fff;
		z-index: 69;
	}

	table.university-table thead tr:nth-child(3) th:first-child {
		background-color: #f3f4f6;
		z-index: 68;
	}

	.total-row {
		font-weight: 700;
		background-color: #f9f9f9 !important;
		border-top: 2px solid #000;
		border-bottom: 2px solid #000;
	}

	.total-row td:first-child {
		text-align: right;
		background-color: #f9f9f9 !important;
	}

	/* Responsive Cards */
	@media (max-width:1024px){
		.card-row{
			grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
		}
	}

	@media (max-width:768px){
		.card-row{
			grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
			gap:12px;
		}
		.number-value{
			font-size:18px;
		}
	}

	@media (max-width:480px){
		.card-row{
			grid-template-columns:1fr 1fr;
		}
		.number-value{
			font-size:16px;
		}
	}

	</style>
	`).appendTo(page.body);


	document.getElementById("search-input")
		.addEventListener("input", filterTable);

	loadConsolidatedReport();
	loadNumberCards();
};



// -------------------------------------------------
// NUMBER CARDS LOGIC
// -------------------------------------------------

function formatINR(value) {
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		minimumFractionDigits: 2
	}).format(value || 0);
}

function renderCards(apiResponse) {

	const $container = $(".card-row");
	$container.empty();

	// Grand Total
	$container.append(`
		<div class="number-card">
			<div class="number-title">Grand Total</div>
			<div class="number-value">
				${formatINR(apiResponse.grand_total)}
			</div>
		</div>
	`);

	// Other Cards
	(apiResponse.number_cards || []).forEach(card => {
		$container.append(`
			<div class="number-card">
				<div class="number-title">${card.label}</div>
				<div class="number-value">
					${formatINR(card.total_budget)}
				</div>
			</div>
		`);
	});
}

function loadNumberCards() {

	frappe.call({
		method: "annual_budget.api.phase_sheet.get_number_card_totals",
		args: {
			financial_year: "2025-26"
		},
		callback: function (r) {
			if (!r.message) return;
			renderCards(r.message);
		}
	});
}

// -------------------------------------------------
// TABLE DATA FETCH
// -------------------------------------------------

function loadConsolidatedReport() {

	frappe.call({
		method: "annual_budget.api.finance_budget.get_consolidated_report",
		args: {},
		freeze: true,
		freeze_message: "Loading Consolidated Data...",
		callback: function (r) {

			const data = r.message?.entities || [];

			if (!data.length) {
				document.getElementById("table-body").innerHTML =
					"<tr><td colspan='99' style='text-align:center;'>No data found</td></tr>";
				return;
			}

			renderExpenseTable(data);
		},
	});
}
// -------------------------------------------------
// TABLE RENDER
// -------------------------------------------------

function renderExpenseTable(entities) {

	const header = document.getElementById("table-header");
	const body = document.getElementById("table-body");

	header.innerHTML = "";
	body.innerHTML = "";

	const visibleCols = ["Budget", "Actuals", "Previous Year"];

	// Entity Row
	let entityRow = `<tr><th rowspan="3">Expenses</th>`;
	entities.forEach(e => {
		const totalCols = e.cost_centers.length * visibleCols.length;
		entityRow += `<th colspan="${totalCols}">${e.name}</th>`;
	});
	entityRow += `</tr>`;

	// Cost Center Row
	let ccRow = "<tr>";
	entities.forEach(e => {
		e.cost_centers.forEach(cc => {
			ccRow += `<th colspan="${visibleCols.length}">${cc.name} (₹)</th>`;
		});
	});
	ccRow += "</tr>";

	// Metric Row
	let metricRow = "<tr>";
	entities.forEach(e => {
		e.cost_centers.forEach(() => {
			visibleCols.forEach(v => metricRow += `<th>${v}</th>`);
		});
	});
	metricRow += "</tr>";

	header.innerHTML = entityRow + ccRow + metricRow;

	// Collect expenses
	const allExpenses = new Set();
	entities.forEach(e =>
		e.cost_centers.forEach(cc =>
			cc.data.forEach(d => allExpenses.add(d.type_of_expense))
		)
	);

	let bodyHTML = "";

	allExpenses.forEach(exp => {

		bodyHTML += `<tr><td>${exp}</td>`;

		entities.forEach(e => {
			e.cost_centers.forEach(cc => {

				const row = cc.data.find(d => d.type_of_expense === exp);

				visibleCols.forEach(metric => {

					const val =
						metric === "Budget" ? row?.budget ?? 0 :
						metric === "Actuals" ? row?.actuals ?? 0 :
						row?.previous_year ?? 0;

					bodyHTML += `<td>${(val || 0).toLocaleString()}</td>`;
				});
			});
		});

		bodyHTML += `</tr>`;
	});

	// Grand Total Row
	let grandRow = `<tr class="total-row"><td>Grand Total (₹)</td>`;

	entities.forEach(e => {
		e.cost_centers.forEach(cc => {
			visibleCols.forEach(metric => {

				const val =
					metric === "Budget"
						? cc.data.reduce((a, d) => a + (d.budget || 0), 0)
						: metric === "Actuals"
						? cc.data.reduce((a, d) => a + (d.actuals || 0), 0)
						: cc.data.reduce((a, d) => a + (d.previous_year || 0), 0);

				grandRow += `<td>${val.toLocaleString()}</td>`;
			});
		});
	});

	grandRow += "</tr>";

	body.innerHTML = bodyHTML + grandRow;
}
// -------------------------------------------------
// SEARCH FILTER
// -------------------------------------------------

function filterTable() {

	const term = document
		.getElementById("search-input")
		.value
		.toLowerCase();

	document.querySelectorAll("#table-body tr")
		.forEach(row => {

			const match = row
				.querySelector("td:first-child")
				?.innerText
				.toLowerCase()
				.includes(term);

			row.style.display =
				match || row.classList.contains("total-row")
					? ""
					: "none";
		});
}
