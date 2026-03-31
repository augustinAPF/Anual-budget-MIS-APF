// // // ---------------------------------------------------------------------------
// // // CONSOLIDATED REPORT PAGE (FIXED SEARCH BAR, FIXED ENTITY HEADER, RESPONSIVE BLUE/ORANGE THEME)
// // // ---------------------------------------------------------------------------

// // frappe.pages['consolidate-report'].on_page_load = function (wrapper) {
// // 	const page = frappe.ui.make_app_page({
// // 		parent: wrapper,
// // 		title: 'Consolidated Report',
// // 		single_column: true
// // 	});

// // 	const html = `
// // 	<div class="dashboard-wrapper">

// // 		<h2 class="table-title">Consolidated Report</h2>

// // 		<!-- FILTERS -->
// // 		<div class="filter-container">
// // 			<div id="financial-year-field"></div>
// // 			<div id="month-field"></div>
// // 			<button id="refresh-report">Apply</button>
// // 		</div>

// // 		<!-- SUMMARY CARDS -->
// // 		<div id="summary-cards" class="frappe-number-cards"></div>

// // 		<!-- STICKY SEARCH BAR -->
// // 		<div class="table-controls">
// // 			<div class="search-bar">
// // 				<input type="text" id="search-input" placeholder="🔍 Search expense..." />
// // 			</div>
// // 		</div>

// // 		<!-- SCROLLABLE TABLE -->
// // 		<div class="scroll-wrapper">
// // 			<table class="university-table" id="expense-table">
// // 				<thead id="table-header"></thead>
// // 				<tbody id="table-body"></tbody>
// // 			</table>
// // 		</div>
// // 	</div>

// // 	<style>
// // 		/* === BASE LAYOUT === */
// // 		.dashboard-wrapper {
// // 			padding: 16px;
// // 			background-color: #fff;
// // 			color: #111;
// // 		}
// // 		h2.table-title {
// // 			color: #0076B6;
// // 			font-size: 20px;
// // 			font-weight: 700;
// // 			margin-bottom: 14px;
// // 		}

// // 		/* --- FILTERS --- */
// // 		.filter-container {
// // 			display: flex;
// // 			flex-wrap: wrap;
// // 			align-items: center;
// // 			gap: 10px;
// // 			margin-bottom: 12px;
// // 		}
// // 		select, button {
// // 			padding: 6px 10px;
// // 			border: 1px solid #ccc;
// // 			border-radius: 4px;
// // 			font-size: 13px;
// // 			background: #fff;
// // 			min-width: 120px;
// // 		}
// // 		button {
// // 			background-color: #0076B6;
// // 			color: white;
// // 			cursor: pointer;
// // 			border: none;
// // 			transition: 0.2s;
// // 		}
// // 		button:hover { background-color: #005f8d; }

// // 		/* --- SUMMARY CARDS --- */
// // 		.frappe-number-cards {
// // 			display: flex;
// // 			flex-wrap: wrap;
// // 			gap: 16px;
// // 			margin: 18px 0;
// // 		}
// // 		.frappe-card {
// // 			flex: 1 1 260px;
// // 			max-width: 280px;
// // 			height: 120px;
// // 			background: #fff;
// // 			border: 1px solid #ccc;
// // 			border-radius: 8px;
// // 			display: flex;
// // 			flex-direction: column;
// // 			justify-content: center;
// // 			align-items: flex-start;
// // 			padding: 14px 18px;
// // 			box-shadow: 0 2px 6px rgba(0,0,0,0.08);
// // 		}
// // 		.frappe-card-value {
// // 			font-size: 18px;
// // 			font-weight: 600;
// // 			color: #0076B6;
// // 		}

// // 		/* --- STICKY SEARCH BAR --- */
// // 		.table-controls {
// // 			position: sticky;
// // 			top: 0;
// // 			z-index: 60;
// // 			display: flex;
// // 			justify-content: flex-start;
// // 			align-items: center;
// // 			padding: 6px 10px;
// // 			border: 1px solid #0076B6;
// // 			border-radius: 4px 4px 0 0;
// // 			background-color: #fff;
// // 			border-bottom: 3px solid #0076B6;
// // 		}
// // 		.search-bar input {
// // 			width: 240px;
// // 			border: 1px solid #ccc;
// // 			border-radius: 4px;
// // 			padding: 6px 8px;
// // 			font-size: 13px;
// // 		}

// // 		/* --- SCROLLABLE TABLE --- */
// // 		.scroll-wrapper {
// // 			border: 1px solid #000;
// // 			border-radius: 0 0 4px 4px;
// // 			overflow-x: auto;
// // 			overflow-y: auto;
// // 			max-height: 55vh;
// // 			width: 100%;
// // 			position: relative;
// // 		}

// // 		table.university-table {
// // 			min-width: 1200px;
// // 			width: 100%;
// // 			border-collapse: collapse;
// // 			font-size: 13px;
// // 			text-align: center;
// // 			color: #111;
// // 		}
// // 		table.university-table th,
// // 		table.university-table td {
// // 			border: 1px solid #000;
// // 			padding: 6px 8px;
// // 			white-space: nowrap;
// // 			vertical-align: middle;
// // 		}

// // 		/* --- FIXED STICKY HEADERS (NO OVERLAP) --- */
// // 		table.university-table thead th {
// // 			position: sticky;
// // 			background-clip: padding-box;
// // 			z-index: 10;
// // 		}

// // 		table.university-table thead tr:first-child th {
// // 			background-color: #0076B6;
// // 			color: #fff;
// // 			top: 0;
// // 			height: 34px;
// // 			z-index: 60; /* topmost row */
// // 		}

// // 		table.university-table thead tr:nth-child(2) th {
// // 			background-color: #F26B21;
// // 			color: #fff;
// // 			top: 34px;
// // 			height: 34px;
// // 			z-index: 59;
// // 		}

// // 		table.university-table thead tr:nth-child(3) th {
// // 			background-color: #f3f4f6;
// // 			top: 68px;
// // 			height: 34px;
// // 			z-index: 58;
// // 		}

// // 		/* --- FIXED STICKY FIRST COLUMN (NO OVERLAP) --- */
// // 		table.university-table th:first-child,
// // 		table.university-table td:first-child {
// // 			position: sticky;
// // 			left: 0;
// // 			background-color: #fff;
// // 			z-index: 65; /* above other cells */
// // 			text-align: left;
// // 			box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
// // 		}

// // 		table.university-table thead tr:first-child th:first-child {
// // 			background-color: #0076B6;
// // 			color: #fff;
// // 			z-index: 70;
// // 		}
// // 		table.university-table thead tr:nth-child(2) th:first-child {
// // 			background-color: #F26B21;
// // 			color: #fff;
// // 			z-index: 69;
// // 		}
// // 		table.university-table thead tr:nth-child(3) th:first-child {
// // 			background-color: #f3f4f6;
// // 			z-index: 68;
// // 		}

// // 		/* --- TOTAL ROW --- */
// // 		.total-row {
// // 			font-weight: 700;
// // 			background-color: #f9f9f9 !important;
// // 			border-top: 2px solid #000;
// // 			border-bottom: 2px solid #000;
// // 		}
// // 		.total-row td:first-child {
// // 			text-align: right;
// // 			background-color: #f9f9f9 !important;
// // 		}

// // 		/* --- SCROLLBAR POLISH --- */
// // 		.scroll-wrapper {
// // 			scrollbar-width: thin;
// // 			scrollbar-color: #0076B6 #f1f1f1;
// // 		}
// // 		.scroll-wrapper::-webkit-scrollbar {
// // 			height: 8px;
// // 		}
// // 		.scroll-wrapper::-webkit-scrollbar-thumb {
// // 			background-color: #0076B6;
// // 			border-radius: 4px;
// // 		}
// // 		.scroll-wrapper::-webkit-scrollbar-track {
// // 			background: #f1f1f1;
// // 		}

// // 		/* --- RESPONSIVE --- */
// // 		@media (max-width: 992px) {
// // 			.filter-container { flex-direction: column; align-items: flex-start; }
// // 			select, button { width: 100%; max-width: 300px; }
// // 			h2.table-title { font-size: 18px; }
// // 			.search-bar input { width: 100%; }
// // 		}
// // 		@media (max-width: 600px) {
// // 			table.university-table { font-size: 12px; }
// // 			select, button { font-size: 12px; }
// // 		}
// // 	</style>
// // 	`;

// // 	$(page.body).html(html);

// // 	// Filters
// // 	const fyField = frappe.ui.form.make_control({
// // 		parent: $('#financial-year-field'),
// // 		df: { fieldname: 'financial_year', label: 'Financial Year', fieldtype: 'Link', options: 'Financial Year' },
// // 		render_input: true
// // 	});
// // 	fyField.refresh();
// // 	window.fyField = fyField;

// // 	const monthField = frappe.ui.form.make_control({
// // 		parent: $('#month-field'),
// // 		df: { fieldname: 'month', label: 'Month', fieldtype: 'Link', options: 'Month' },
// // 		render_input: true
// // 	});
// // 	monthField.refresh();
// // 	window.monthField = monthField;

// // 	// Events
// // 	document.getElementById("refresh-report").addEventListener("click", loadConsolidatedReport);
// // 	document.getElementById("search-input").addEventListener("input", filterTable);
// // 	fyField.$input.on("change", loadConsolidatedReport);

// // 	loadConsolidatedReport();
// // };

// // // ---------------------------------------------------------------------------
// // // DATA FETCH + RENDER
// // // ---------------------------------------------------------------------------

// // function loadConsolidatedReport() {
// // 	const fy = window.fyField ? fyField.get_value() : "";

// // 	frappe.call({
// // 		method: "annual_budget.api.finance_budget.get_consolidated_report",
// // 		args: { financial_year: fy },
// // 		freeze: true,
// // 		freeze_message: "Loading Consolidated Data...",
// // 		callback: function (r) {
// // 			const data = r.message?.entities || [];
// // 			if (!data.length) {
// // 				document.getElementById("table-body").innerHTML =
// // 					"<tr><td colspan='99' style='text-align:center;'>No data found</td></tr>";
// // 				document.getElementById("summary-cards").innerHTML = "";
// // 				return;
// // 			}
// // 			renderSummaryCards(data);
// // 			renderExpenseTable(data);
// // 		},
// // 	});
// // }

// // // ---------------------------------------------------------------------------
// // // SUMMARY CARDS
// // // ---------------------------------------------------------------------------

// // function renderSummaryCards(entities) {
// // 	const container = document.getElementById("summary-cards");
// // 	container.innerHTML = "";
// // 	entities.forEach(e => {
// // 		const total = e.cost_centers.reduce((sum, cc) =>
// // 			sum + (cc.data.reduce((a, d) => a + (d.budget || 0), 0)), 0);
// // 		container.innerHTML += `
// // 			<div class="frappe-card">
// // 				<div class="frappe-card-title">${e.name}</div>
// // 				<div class="frappe-card-value">₹ ${total.toLocaleString()}</div>
// // 			</div>`;
// // 	});
// // }

// // // ---------------------------------------------------------------------------
// // // TABLE RENDER
// // // ---------------------------------------------------------------------------

// // function renderExpenseTable(entities) {
// // 	const header = document.getElementById("table-header");
// // 	const body = document.getElementById("table-body");
// // 	header.innerHTML = "";
// // 	body.innerHTML = "";

// // 	const visibleCols = ["Budget", "Actuals", "Previous Year"];

// // 	let entityRow = `<tr><th rowspan="3">Expenses</th>`;
// // 	entities.forEach(e => {
// // 		const totalCols = e.cost_centers.length * visibleCols.length;
// // 		entityRow += `<th colspan="${totalCols}">${e.name}</th>`;
// // 	});
// // 	entityRow += `</tr>`;

// // 	let ccRow = "<tr>";
// // 	entities.forEach(e => {
// // 		e.cost_centers.forEach(cc => {
// // 			ccRow += `<th colspan="${visibleCols.length}">${cc.name}</th>`;
// // 		});
// // 	});
// // 	ccRow += "</tr>";

// // 	let metricRow = "<tr>";
// // 	entities.forEach(e => {
// // 		e.cost_centers.forEach(() => {
// // 			visibleCols.forEach(v => metricRow += `<th>${v}</th>`);
// // 		});
// // 	});
// // 	metricRow += "</tr>";

// // 	header.innerHTML = entityRow + ccRow + metricRow;

// // 	const allExpenses = new Set();
// // 	entities.forEach(e =>
// // 		e.cost_centers.forEach(cc =>
// // 			cc.data.forEach(d => allExpenses.add(d.type_of_expense))
// // 		)
// // 	);

// // 	let bodyHTML = "";
// // 	allExpenses.forEach(exp => {
// // 		bodyHTML += `<tr><td>${exp}</td>`;
// // 		entities.forEach(e => {
// // 			e.cost_centers.forEach(cc => {
// // 				const row = cc.data.find(d => d.type_of_expense === exp);
// // 				visibleCols.forEach(metric => {
// // 					const val =
// // 						metric === "Budget" ? row?.budget ?? 0 :
// // 						metric === "Actuals" ? row?.actuals ?? 0 :
// // 						row?.previous_year ?? 0;
// // 					bodyHTML += `<td>₹ ${(val || 0).toLocaleString()}</td>`;
// // 				});
// // 			});
// // 		});
// // 		bodyHTML += `</tr>`;
// // 	});

// // 	let grandRow = `<tr class="total-row"><td>Grand Total</td>`;
// // 	entities.forEach(e => {
// // 		e.cost_centers.forEach(cc => {
// // 			visibleCols.forEach(metric => {
// // 				const val =
// // 					metric === "Budget"
// // 						? cc.data.reduce((a, d) => a + (d.budget || 0), 0)
// // 						: metric === "Actuals"
// // 						? cc.data.reduce((a, d) => a + (d.actuals || 0), 0)
// // 						: cc.data.reduce((a, d) => a + (d.previous_year || 0), 0);
// // 				grandRow += `<td>₹ ${val.toLocaleString()}</td>`;
// // 			});
// // 		});
// // 	});
// // 	grandRow += "</tr>";

// // 	body.innerHTML = bodyHTML + grandRow;
// // }

// // // ---------------------------------------------------------------------------
// // // SEARCH FILTER
// // // ---------------------------------------------------------------------------

// // function filterTable() {
// // 	const term = document.getElementById("search-input").value.toLowerCase();
// // 	document.querySelectorAll("#table-body tr").forEach(row => {
// // 		const match = row.querySelector("td:first-child")?.innerText.toLowerCase().includes(term);
// // 		row.style.display = match || row.classList.contains("total-row") ? "" : "none";
// // 	});
// // }



// // ---------------------------------------------------------------------------
// // CONSOLIDATED REPORT PAGE (FIXED SEARCH BAR, FIXED ENTITY HEADER, RESPONSIVE BLUE/ORANGE THEME)
// // ---------------------------------------------------------------------------





// // frappe.pages['consolidate-report'].on_page_load = function (wrapper) {
// // 	const page = frappe.ui.make_app_page({
// // 		parent: wrapper,
// // 		title: 'Consolidated Report',
// // 		single_column: true
// // 	});

// // 	const html = `
// // 	<div class="dashboard-wrapper">

// // 		<!-- SUMMARY CARDS -->
// // 		<div id="summary-cards" class="frappe-number-cards"></div>

// // 		<!-- STICKY SEARCH BAR -->
// // 		<div class="table-controls">
// // 			<div class="search-bar">
// // 				<input type="text" id="search-input" placeholder="🔍 Search expense..." />
// // 			</div>
// // 		</div>

// // 		<!-- SCROLLABLE TABLE -->
// // 		<div class="scroll-wrapper">
// // 			<table class="university-table" id="expense-table">
// // 				<thead id="table-header"></thead>
// // 				<tbody id="table-body"></tbody>
// // 			</table>
// // 		</div>
// // 	</div>

// // 	<style>
// // 		/* === BASE LAYOUT === */
// // 		.dashboard-wrapper {
// // 			padding: 16px;
// // 			background-color: #fff;
// // 			color: #111;
// // 		}
// // 		h2.table-title {
// // 			color: #0076B6;
// // 			font-size: 20px;
// // 			font-weight: 700;
// // 			margin-bottom: 14px;
// // 		}

// // 		/* --- SUMMARY CARDS --- */
// // 		.frappe-number-cards {
// // 			display: flex;
// // 			flex-wrap: wrap;
// // 			gap: 16px;
// // 			margin: 18px 0;
// // 		}
// // 		.frappe-card {
// // 			flex: 1 1 260px;
// // 			max-width: 280px;
// // 			height: 120px;
// // 			background: #fff;
// // 			border: 1px solid #ccc;
// // 			border-radius: 8px;
// // 			display: flex;
// // 			flex-direction: column;
// // 			justify-content: center;
// // 			align-items: flex-start;
// // 			padding: 14px 18px;
// // 			box-shadow: 0 2px 6px rgba(0,0,0,0.08);
// // 		}
// // 		.frappe-card-value {
// // 			font-size: 18px;
// // 			font-weight: 600;
// // 			color: #0076B6;
// // 		}

// // 		/* --- STICKY SEARCH BAR --- */
// // 		.table-controls {
// // 			position: sticky;
// // 			top: 0;
// // 			z-index: 60;
// // 			display: flex;
// // 			justify-content: flex-start;
// // 			align-items: center;
// // 			padding: 6px 10px;
// // 			border: 1px solid #0076B6;
// // 			border-radius: 4px 4px 0 0;
// // 			background-color: #fff;
// // 			border-bottom: 3px solid #0076B6;
// // 		}
// // 		.search-bar input {
// // 			width: 240px;
// // 			border: 1px solid #ccc;
// // 			border-radius: 4px;
// // 			padding: 6px 8px;
// // 			font-size: 13px;
// // 		}

// // 		/* --- SCROLLABLE TABLE --- */
// // 		.scroll-wrapper {
// // 			border: 1px solid #000;
// // 			border-radius: 0 0 4px 4px;
// // 			overflow-x: auto;
// // 			overflow-y: auto;
// // 			max-height: 55vh;
// // 			width: 100%;
// // 			position: relative;
// // 		}

// // 		table.university-table {
// // 			min-width: 1200px;
// // 			width: 100%;
// // 			border-collapse: collapse;
// // 			font-size: 13px;
// // 			text-align: center;
// // 			color: #111;
// // 		}
// // 		table.university-table th,
// // 		table.university-table td {
// // 			border: 1px solid #000;
// // 			padding: 6px 8px;
// // 			white-space: nowrap;
// // 			vertical-align: middle;
// // 		}

// // 		/* --- FIXED STICKY HEADERS (NO OVERLAP) --- */
// // 		table.university-table thead th {
// // 			position: sticky;
// // 			background-clip: padding-box;
// // 			z-index: 10;
// // 		}

// // 		table.university-table thead tr:first-child th {
// // 			background-color: #0076B6;
// // 			color: #fff;
// // 			top: 0;
// // 			height: 34px;
// // 			z-index: 60;
// // 		}

// // 		table.university-table thead tr:nth-child(2) th {
// // 			background-color: #F26B21;
// // 			color: #fff;
// // 			top: 34px;
// // 			height: 34px;
// // 			z-index: 59;
// // 		}

// // 		table.university-table thead tr:nth-child(3) th {
// // 			background-color: #f3f4f6;
// // 			top: 68px;
// // 			height: 34px;
// // 			z-index: 58;
// // 		}

// // 		/* --- FIXED STICKY FIRST COLUMN (NO OVERLAP) --- */
// // 		table.university-table th:first-child,
// // 		table.university-table td:first-child {
// // 			position: sticky;
// // 			left: 0;
// // 			background-color: #fff;
// // 			z-index: 65;
// // 			text-align: left;
// // 			box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
// // 		}

// // 		table.university-table thead tr:first-child th:first-child {
// // 			background-color: #0076B6;
// // 			color: #fff;
// // 			z-index: 70;
// // 		}
// // 		table.university-table thead tr:nth-child(2) th:first-child {
// // 			background-color: #F26B21;
// // 			color: #fff;
// // 			z-index: 69;
// // 		}
// // 		table.university-table thead tr:nth-child(3) th:first-child {
// // 			background-color: #f3f4f6;
// // 			z-index: 68;
// // 		}

// // 		/* --- TOTAL ROW --- */
// // 		.total-row {
// // 			font-weight: 700;
// // 			background-color: #f9f9f9 !important;
// // 			border-top: 2px solid #000;
// // 			border-bottom: 2px solid #000;
// // 		}
// // 		.total-row td:first-child {
// // 			text-align: right;
// // 			background-color: #f9f9f9 !important;
// // 		}

// // 		/* --- SCROLLBAR POLISH --- */
// // 		.scroll-wrapper {
// // 			scrollbar-width: thin;
// // 			scrollbar-color: #0076B6 #f1f1f1;
// // 		}
// // 		.scroll-wrapper::-webkit-scrollbar {
// // 			height: 8px;
// // 		}
// // 		.scroll-wrapper::-webkit-scrollbar-thumb {
// // 			background-color: #0076B6;
// // 			border-radius: 4px;
// // 		}
// // 		.scroll-wrapper::-webkit-scrollbar-track {
// // 			background: #f1f1f1;
// // 		}

// // 		/* --- RESPONSIVE --- */
// // 		@media (max-width: 992px) {
// // 			h2.table-title { font-size: 18px; }
// // 			.search-bar input { width: 100%; }
// // 		}
// // 		@media (max-width: 600px) {
// // 			table.university-table { font-size: 12px; }
// // 		}
// // 	</style>
// // 	`;

// // 	$(page.body).html(html);

// // 	// Events
// // 	document.getElementById("search-input").addEventListener("input", filterTable);

// // 	loadConsolidatedReport();
// // };

// // // ---------------------------------------------------------------------------
// // // DATA FETCH + RENDER
// // // ---------------------------------------------------------------------------

// // function loadConsolidatedReport() {
// // 	frappe.call({
// // 		method: "annual_budget.api.finance_budget.get_consolidated_report",
// // 		args: {},
// // 		freeze: true,
// // 		freeze_message: "Loading Consolidated Data...",
// // 		callback: function (r) {
// // 			const data = r.message?.entities || [];
// // 			if (!data.length) {
// // 				document.getElementById("table-body").innerHTML =
// // 					"<tr><td colspan='99' style='text-align:center;'>No data found</td></tr>";
// // 				document.getElementById("summary-cards").innerHTML = "";
// // 				return;
// // 			}
// // 			renderSummaryCards(data);
// // 			renderExpenseTable(data);
// // 		},
// // 	});
// // }

// // // ---------------------------------------------------------------------------
// // // SUMMARY CARDS
// // // ---------------------------------------------------------------------------

// // function renderSummaryCards(entities) {
// // 	const container = document.getElementById("summary-cards");
// // 	container.innerHTML = "";
// // 	entities.forEach(e => {
// // 		const total = e.cost_centers.reduce((sum, cc) =>
// // 			sum + (cc.data.reduce((a, d) => a + (d.budget || 0), 0)), 0);

// // 		const roundedTotal = Math.round(total); // ✅ Round the total

// // 		container.innerHTML += `
// // 			<div class="frappe-card">
// // 				<div class="frappe-card-title">${e.name}</div>
// // 				<div class="frappe-card-value">₹ ${roundedTotal.toLocaleString()}</div>
// // 			</div>`;
// // 	});
// // }


// // // ---------------------------------------------------------------------------
// // // TABLE RENDER
// // // ---------------------------------------------------------------------------

// // function renderExpenseTable(entities) {
// // 	const header = document.getElementById("table-header");
// // 	const body = document.getElementById("table-body");
// // 	header.innerHTML = "";
// // 	body.innerHTML = "";

// // 	const visibleCols = ["Budget", "Actuals", "Previous Year"];

// // 	let entityRow = `<tr><th rowspan="3">Expenses</th>`;
// // 	entities.forEach(e => {
// // 		const totalCols = e.cost_centers.length * visibleCols.length;
// // 		entityRow += `<th colspan="${totalCols}">${ e.name}</th>`;
// // 	});
// // 	entityRow += `</tr>`;

// // 	let ccRow = "<tr>";
// // 	entities.forEach(e => {
// // 		e.cost_centers.forEach(cc => {
// // 			ccRow += `<th colspan="${visibleCols.length}">${cc.name}  (₹)</th>`;
// // 		});
// // 	});
// // 	ccRow += "</tr>";

// // 	let metricRow = "<tr>";
// // 	entities.forEach(e => {
// // 		e.cost_centers.forEach(() => {
// // 			visibleCols.forEach(v => metricRow += `<th>${v}</th>`);
// // 		});
// // 	});
// // 	metricRow += "</tr>";

// // 	header.innerHTML = entityRow + ccRow + metricRow;

// // 	const allExpenses = new Set();
// // 	entities.forEach(e =>
// // 		e.cost_centers.forEach(cc =>
// // 			cc.data.forEach(d => allExpenses.add(d.type_of_expense))
// // 		)
// // 	);

// // 	let bodyHTML = "";
// // 	allExpenses.forEach(exp => {
// // 		bodyHTML += `<tr><td>${exp}</td>`;
// // 		entities.forEach(e => {
// // 			e.cost_centers.forEach(cc => {
// // 				const row = cc.data.find(d => d.type_of_expense === exp);
// // 				visibleCols.forEach(metric => {
// // 					const val =
// // 						metric === "Budget" ? row?.budget ?? 0 :
// // 						metric === "Actuals" ? row?.actuals ?? 0 :
// // 						row?.previous_year ?? 0;
// // 					bodyHTML += `<td> ${(val || 0).toLocaleString()}</td>`;
// // 				});
// // 			});
// // 		});
// // 		bodyHTML += `</tr>`;
// // 	});

// // 	let grandRow = `<tr class="total-row"><td>Grand Total (₹)</td>`;
// // 	entities.forEach(e => {
// // 		e.cost_centers.forEach(cc => {
// // 			visibleCols.forEach(metric => {
// // 				const val =
// // 					metric === "Budget"
// // 						? cc.data.reduce((a, d) => a + (d.budget || 0), 0)
// // 						: metric === "Actuals"
// // 						? cc.data.reduce((a, d) => a + (d.actuals || 0), 0)
// // 						: cc.data.reduce((a, d) => a + (d.previous_year || 0), 0);
// // 				grandRow += `<td> ${val.toLocaleString()}</td>`;
// // 			});
// // 		});
// // 	});
// // 	grandRow += "</tr>";

// // 	body.innerHTML = bodyHTML + grandRow;
// // }

// // // ---------------------------------------------------------------------------
// // // SEARCH FILTER
// // // ---------------------------------------------------------------------------

// // function filterTable() {
// // 	const term = document.getElementById("search-input").value.toLowerCase();
// // 	document.querySelectorAll("#table-body tr").forEach(row => {
// // 		const match = row.querySelector("td:first-child")?.innerText.toLowerCase().includes(term);
// // 		row.style.display = match || row.classList.contains("total-row") ? "" : "none";
// // 	});
// // }



// frappe.pages['consolidate-report'].on_page_load = function (wrapper) {

// 	const page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Consolidated Report',
// 		single_column: true
// 	});

// 	// -------------------------------------------------
// 	// HTML STRUCTURE (CARDS + TABLE)
// 	// -------------------------------------------------
// 	const html = `
// 	<div class="dashboard-wrapper">

// 		<!-- NUMBER CARDS -->
// 		<div class="card-row"></div>

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
// 	`;

// 	$(page.body).html(html);

// 	// -------------------------------------------------
// 	// CSS INJECTION
// 	// -------------------------------------------------
// 	$(`
// 	<style>

// 	.page-content {
// 		background:#f5f6f8;
// 	}

// 	.dashboard-wrapper {
// 		padding: 16px;
// 		color: #111;
// 	}

// 	/* =============================
// 	   NUMBER CARDS
// 	============================= */

// 	.card-row{
// 		display:grid;
// 		grid-template-columns: repeat(4, 1fr);
// 		gap:16px;
// 		margin-bottom:20px;
// 	}

// 	.number-card{
// 		background:#ffffff;
// 		border-radius:10px;
// 		padding:18px;
// 		box-shadow:0 3px 10px rgba(0,0,0,.06);
// 		transition:.2s ease;
// 	}

// 	.number-card:hover{
// 		transform:translateY(-3px);
// 		box-shadow:0 6px 18px rgba(0,0,0,.12);
// 	}

// 	.number-title{
// 		font-size:13px;
// 		font-weight:600;
// 		text-transform:uppercase;
// 		margin-bottom:8px;
// 		letter-spacing:.5px;
// 		color:#000;
// 	}

// 	.number-value{
// 		font-size:22px;
// 		font-weight:700;
// 		color:#000;
// 	}

// 	/* =============================
// 	   TABLE CONTROLS
// 	============================= */

// 	.table-controls {
// 		position: sticky;
// 		top: 0;
// 		z-index: 60;
// 		display: flex;
// 		align-items: center;
// 		padding: 6px 10px;
// 		border: 1px solid #0076B6;
// 		border-radius: 4px 4px 0 0;
// 		background-color: #fff;
// 		border-bottom: 3px solid #0076B6;
// 	}

// 	.search-bar input {
// 		width: 240px;
// 		border: 1px solid #ccc;
// 		border-radius: 4px;
// 		padding: 6px 8px;
// 		font-size: 13px;
// 	}

// 	.scroll-wrapper {
// 		border: 1px solid #000;
// 		border-radius: 0 0 4px 4px;
// 		overflow-x: auto;
// 		overflow-y: auto;
// 		max-height: 55vh;
// 		width: 100%;
// 		position: relative;
// 	}

// 	table.university-table {
// 		min-width: 1200px;
// 		width: 100%;
// 		border-collapse: collapse;
// 		font-size: 13px;
// 		text-align: center;
// 		color: #111;
// 	}

// 	table.university-table th,
// 	table.university-table td {
// 		border: 1px solid #000;
// 		padding: 6px 8px;
// 		white-space: nowrap;
// 		vertical-align: middle;
// 	}

// 	/* Sticky Headers */
// 	table.university-table thead th {
// 		position: sticky;
// 		background-clip: padding-box;
// 		z-index: 10;
// 	}

// 	table.university-table thead tr:first-child th {
// 		background-color: #0076B6;
// 		color: #fff;
// 		top: 0;
// 		height: 34px;
// 		z-index: 60;
// 	}

// 	table.university-table thead tr:nth-child(2) th {
// 		background-color: #F26B21;
// 		color: #fff;
// 		top: 34px;
// 		height: 34px;
// 		z-index: 59;
// 	}

// 	table.university-table thead tr:nth-child(3) th {
// 		background-color: #f3f4f6;
// 		top: 68px;
// 		height: 34px;
// 		z-index: 58;
// 	}

// 	/* Sticky First Column */
// 	table.university-table th:first-child,
// 	table.university-table td:first-child {
// 		position: sticky;
// 		left: 0;
// 		background-color: #fff;
// 		z-index: 65;
// 		text-align: left;
// 		box-shadow: 2px 0 4px rgba(0,0,0,0.05);
// 	}

// 	table.university-table thead tr:first-child th:first-child {
// 		background-color: #0076B6;
// 		color: #fff;
// 		z-index: 70;
// 	}

// 	table.university-table thead tr:nth-child(2) th:first-child {
// 		background-color: #F26B21;
// 		color: #fff;
// 		z-index: 69;
// 	}

// 	table.university-table thead tr:nth-child(3) th:first-child {
// 		background-color: #f3f4f6;
// 		z-index: 68;
// 	}

// 	.total-row {
// 		font-weight: 700;
// 		background-color: #f9f9f9 !important;
// 		border-top: 2px solid #000;
// 		border-bottom: 2px solid #000;
// 	}

// 	.total-row td:first-child {
// 		text-align: right;
// 		background-color: #f9f9f9 !important;
// 	}

// 	/* Responsive Cards */
// 	@media (max-width:1024px){
// 		.card-row{
// 			grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
// 		}
// 	}

// 	@media (max-width:768px){
// 		.card-row{
// 			grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
// 			gap:12px;
// 		}
// 		.number-value{
// 			font-size:18px;
// 		}
// 	}

// 	@media (max-width:480px){
// 		.card-row{
// 			grid-template-columns:1fr 1fr;
// 		}
// 		.number-value{
// 			font-size:16px;
// 		}
// 	}

// 	</style>
// 	`).appendTo(page.body);


// 	document.getElementById("search-input")
// 		.addEventListener("input", filterTable);

// 	loadConsolidatedReport();
// 	loadNumberCards();
// };



// // -------------------------------------------------
// // NUMBER CARDS LOGIC
// // -------------------------------------------------

// function formatINR(value) {
// 	return new Intl.NumberFormat('en-IN', {
// 		style: 'currency',
// 		currency: 'INR',
// 		minimumFractionDigits: 2
// 	}).format(value || 0);
// }

// function renderCards(apiResponse) {

// 	const $container = $(".card-row");
// 	$container.empty();

// 	// Grand Total
// 	$container.append(`
// 		<div class="number-card">
// 			<div class="number-title">Grand Total</div>
// 			<div class="number-value">
// 				${formatINR(apiResponse.grand_total)}
// 			</div>
// 		</div>
// 	`);

// 	// Other Cards
// 	(apiResponse.number_cards || []).forEach(card => {
// 		$container.append(`
// 			<div class="number-card">
// 				<div class="number-title">${card.label}</div>
// 				<div class="number-value">
// 					${formatINR(card.total_budget)}
// 				</div>
// 			</div>
// 		`);
// 	});
// }

// function loadNumberCards() {

// 	frappe.call({
// 		method: "annual_budget.api.phase_sheet.get_number_card_totals",
// 		args: {
// 			financial_year: "2025-26"
// 		},
// 		callback: function (r) {
// 			if (!r.message) return;
// 			renderCards(r.message);
// 		}
// 	});
// }

// // -------------------------------------------------
// // TABLE DATA FETCH
// // -------------------------------------------------

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
// 				return;
// 			}

// 			renderExpenseTable(data);
// 		},
// 	});
// }
// // -------------------------------------------------
// // TABLE RENDER
// // -------------------------------------------------

// function renderExpenseTable(entities) {

// 	const header = document.getElementById("table-header");
// 	const body = document.getElementById("table-body");

// 	header.innerHTML = "";
// 	body.innerHTML = "";

// 	const visibleCols = ["Budget", "Actuals", "Previous Year"];

// 	// Entity Row
// 	let entityRow = `<tr><th rowspan="3">Expenses</th>`;
// 	entities.forEach(e => {
// 		const totalCols = e.cost_centers.length * visibleCols.length;
// 		entityRow += `<th colspan="${totalCols}">${e.name}</th>`;
// 	});
// 	entityRow += `</tr>`;

// 	// Cost Center Row
// 	let ccRow = "<tr>";
// 	entities.forEach(e => {
// 		e.cost_centers.forEach(cc => {
// 			ccRow += `<th colspan="${visibleCols.length}">${cc.name} (₹)</th>`;
// 		});
// 	});
// 	ccRow += "</tr>";

// 	// Metric Row
// 	let metricRow = "<tr>";
// 	entities.forEach(e => {
// 		e.cost_centers.forEach(() => {
// 			visibleCols.forEach(v => metricRow += `<th>${v}</th>`);
// 		});
// 	});
// 	metricRow += "</tr>";

// 	header.innerHTML = entityRow + ccRow + metricRow;

// 	// Collect expenses
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

// 					bodyHTML += `<td>${(val || 0).toLocaleString()}</td>`;
// 				});
// 			});
// 		});

// 		bodyHTML += `</tr>`;
// 	});

// 	// Grand Total Row
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

// 				grandRow += `<td>${val.toLocaleString()}</td>`;
// 			});
// 		});
// 	});

// 	grandRow += "</tr>";

// 	body.innerHTML = bodyHTML + grandRow;
// }
// // -------------------------------------------------
// // SEARCH FILTER
// // -------------------------------------------------

// function filterTable() {

// 	const term = document
// 		.getElementById("search-input")
// 		.value
// 		.toLowerCase();

// 	document.querySelectorAll("#table-body tr")
// 		.forEach(row => {

// 			const match = row
// 				.querySelector("td:first-child")
// 				?.innerText
// 				.toLowerCase()
// 				.includes(term);

// 			row.style.display =
// 				match || row.classList.contains("total-row")
// 					? ""
// 					: "none";
// 		});
// }


// frappe.pages['consolidate-report'].on_page_load = function (wrapper) {

//     const page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Budget Dashboard',
//         single_column: true
//     });

//     /* ── STYLES ── */
//     $(`<style>
//         .bd-wrap{padding:20px 24px;box-sizing:border-box;}
//         .bd-top{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px;}
//         .bd-title{font-size:20px;font-weight:600;color:#111;margin:0;}
//         .bd-filter{width:220px;}
//         .bd-filter .form-control,.bd-filter select{width:100%!important;height:34px!important;font-size:13px!important;border-radius:8px!important;border:1px solid #e2e8f0!important;}
//         .bd-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;}
//         .bd-card{background:#fff;border:1px solid #e8edf3;border-radius:12px;padding:16px 18px;border-left:4px solid #378ADD;}
//         .bd-card:first-child{border-left-color:#1D9E75;}
//         .bd-card-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:#888;margin-bottom:6px;}
//         .bd-card-value{font-size:22px;font-weight:700;color:#111;line-height:1.2;}
//         .bd-card-sub{font-size:12px;color:#888;margin-top:4px;}
//         .bd-charts{display:grid;grid-template-columns:1fr 420px;gap:16px;}
//         .bd-chart-box{background:#fff;border:1px solid #e8edf3;border-radius:12px;padding:20px 22px;}
//         .bd-chart-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;}
//         .bd-chart-title{font-size:14px;font-weight:600;color:#111;margin:0;}
//         .bd-chart-sub{font-size:12px;color:#aaa;margin:0 0 14px;}
//         .bd-legend{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;}
//         .bd-legend-item{display:flex;align-items:center;gap:5px;font-size:12px;color:#555;}
//         .bd-legend-dot{width:10px;height:10px;border-radius:2px;flex-shrink:0;}
//         .bd-donut-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;pointer-events:none;}
//         .bd-donut-center-val{font-size:22px;font-weight:700;color:#111;line-height:1.1;}
//         .bd-donut-center-lbl{font-size:11px;color:#888;margin-top:2px;}
//         @media(max-width:1100px){.bd-charts{grid-template-columns:1fr;}.bd-cards{grid-template-columns:repeat(2,1fr);}}
//         @media(max-width:640px){.bd-cards{grid-template-columns:repeat(2,1fr);}.bd-filter{width:100%;}}
//     </style>`).appendTo('head');

//     /* ── PALETTE ── */
//     const PALETTE = ['#378ADD','#1D9E75','#D85A30','#7F77DD','#D4537E','#BA7517','#639922','#E24B4A','#888780','#185FA5'];

//     /* ── LAYOUT ── */
//     $(page.body).html(`
//         <div class="bd-wrap">
//             <div class="bd-top">
//                 <p class="bd-title">Budget Dashboard</p>
//                 <div class="bd-filter" id="bd-fy-wrap"></div>
//             </div>
//             <div class="bd-cards" id="bd-cards"></div>
//             <div class="bd-charts">
//                 <div class="bd-chart-box">
//                     <div class="bd-chart-header">
//                         <p class="bd-chart-title">Budget by category</p>
//                     </div>
//                     <p class="bd-chart-sub">Total allocation per category</p>
//                     <div style="position:relative;width:100%;height:300px;">
//                         <canvas id="bd-bar"></canvas>
//                     </div>
//                     <div class="bd-legend" id="bd-bar-legend"></div>
//                 </div>
//                 <div class="bd-chart-box">
//                     <div class="bd-chart-header">
//                         <p class="bd-chart-title">Budget share</p>
//                     </div>
//                     <p class="bd-chart-sub">Percentage distribution</p>
//                     <div style="position:relative;width:100%;height:260px;" id="bd-donut-wrap">
//                         <canvas id="bd-donut"></canvas>
//                         <div class="bd-donut-center" id="bd-donut-center">
//                             <div class="bd-donut-center-val" id="bd-donut-total"></div>
//                             <div class="bd-donut-center-lbl">Grand total</div>
//                         </div>
//                     </div>
//                     <div class="bd-legend" id="bd-donut-legend"></div>
//                 </div>
//             </div>
//         </div>
//     `);

//     /* ── FY FILTER ── */
//     let barChart = null, donutChart = null;

//     const fyControl = frappe.ui.form.make_control({
//         parent: document.getElementById('bd-fy-wrap'),
//         df: {
//             label: 'Financial Year', fieldtype: 'Select', fieldname: 'financial_year', reqd: 1,
//             change() { const fy = this.get_value(); if (fy) load(fy); }
//         },
//         render_input: true
//     });
//     fyControl.refresh();

//     frappe.call({
//         method: 'annual_budget.api.filter_options.get_financial_year_list',
//         callback(r) {
//             if (!r.message?.length) return;
//             const years = r.message.map(d => d.financial_year);
//             fyControl.df.options = years.join('\n');
//             fyControl.refresh();
//             const now = new Date(), y = now.getFullYear(), m = now.getMonth() + 1;
//             const fy  = m >= 4 ? `${y}-${String(y+1).slice(-2)}` : `${y-1}-${String(y).slice(-2)}`;
//             const def = years.includes(fy) ? fy : years[0];
//             fyControl.set_value(def);
//             load(def);
//         }
//     });

//     /* ── HELPERS ── */
//     const fmtINR  = v => '₹' + Math.round(v || 0).toLocaleString('en-IN');
//     const fmtCr   = v => { const cr = Math.round((v || 0) / 1e7); return cr >= 1 ? cr + ' Cr' : fmtINR(v); };

//     /* ── RENDER CARDS ── */
//     function renderCards(data) {
//         const cards = data.number_cards || [];
//         const grand = data.grand_total || 0;
//         const $c    = $('#bd-cards').empty();

//         // Grand total card
//         $c.append(`
//             <div class="bd-card" style="border-left-color:#1D9E75;">
//                 <div class="bd-card-label">Grand Total</div>
//                 <div class="bd-card-value">${fmtINR(grand)}</div>
//                 <div class="bd-card-sub">${cards.length} categories</div>
//             </div>
//         `);

//         cards.forEach((c, i) => {
//             const pct = grand > 0 ? ((c.total_budget / grand) * 100).toFixed(1) : '0.0';
//             $c.append(`
//                 <div class="bd-card" style="border-left-color:${PALETTE[i % PALETTE.length]};">
//                     <div class="bd-card-label">${c.label}</div>
//                     <div class="bd-card-value">${fmtINR(c.total_budget)}</div>
//                     <div class="bd-card-sub">${pct}% of total</div>
//                 </div>
//             `);
//         });
//     }

//     /* ── RENDER BAR CHART ── */
//     function renderBar(data) {
//         const cards  = data.number_cards || [];
//         const labels = cards.map(c => c.label);
//         const values = cards.map(c => Math.round(c.total_budget || 0));
//         const colors = labels.map((_, i) => PALETTE[i % PALETTE.length]);

//         $('#bd-bar-legend').empty();
//         labels.forEach((lbl, i) => {
//             $('#bd-bar-legend').append(`
//                 <span class="bd-legend-item">
//                     <span class="bd-legend-dot" style="background:${colors[i]};"></span>
//                     ${lbl}
//                 </span>
//             `);
//         });

//         if (barChart) { barChart.destroy(); barChart = null; }

//         barChart = new Chart(document.getElementById('bd-bar'), {
//             type: 'bar',
//             data: {
//                 labels,
//                 datasets: [{
//                     data: values,
//                     backgroundColor: colors,
//                     borderRadius: 6,
//                     borderSkipped: false,
//                     barPercentage: 0.6,
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: { display: false },
//                     tooltip: {
//                         callbacks: {
//                             label: ctx => ' ' + fmtINR(ctx.parsed.y)
//                         }
//                     }
//                 },
//                 scales: {
//                     x: {
//                         grid: { display: false },
//                         border: { display: false },
//                         ticks: { autoSkip: false, maxRotation: 35, font: { size: 11 }, color: '#888' }
//                     },
//                     y: {
//                         grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
//                         border: { display: false, dash: [4,4] },
//                         ticks: { font: { size: 11 }, color: '#888', callback: v => fmtCr(v) }
//                     }
//                 }
//             }
//         });
//     }

//     /* ── RENDER DONUT CHART ── */
//     function renderDonut(data) {
//         const cards  = data.number_cards || [];
//         const grand  = data.grand_total  || 0;
//         const labels = cards.map(c => c.label);
//         const values = cards.map(c => Math.round(c.total_budget || 0));
//         const colors = labels.map((_, i) => PALETTE[i % PALETTE.length]);

//         $('#bd-donut-total').text(fmtCr(grand));

//         const $leg = $('#bd-donut-legend').empty();
//         labels.forEach((lbl, i) => {
//             const pct = grand > 0 ? ((values[i] / grand) * 100).toFixed(1) : '0.0';
//             $leg.append(`
//                 <span class="bd-legend-item">
//                     <span class="bd-legend-dot" style="background:${colors[i]};"></span>
//                     ${lbl} — ${pct}%
//                 </span>
//             `);
//         });

//         if (donutChart) { donutChart.destroy(); donutChart = null; }

//         donutChart = new Chart(document.getElementById('bd-donut'), {
//             type: 'doughnut',
//             data: {
//                 labels,
//                 datasets: [{
//                     data: values,
//                     backgroundColor: colors,
//                     borderWidth: 2,
//                     borderColor: '#fff',
//                     hoverOffset: 6,
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 cutout: '68%',
//                 plugins: {
//                     legend: { display: false },
//                     tooltip: {
//                         callbacks: {
//                             label: ctx => {
//                                 const pct = grand > 0 ? ((ctx.parsed / grand) * 100).toFixed(1) : '0.0';
//                                 return ` ${fmtINR(ctx.parsed)}  (${pct}%)`;
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//     }

//     /* ── LOAD ── */
//     function load(fy) {
//         frappe.call({
//             method: 'annual_budget.api.phase_sheet.get_number_card_totals',
//             args: { financial_year: fy },
//             callback(r) {
//                 if (!r.message) return;
//                 renderCards(r.message);
//                 renderBar(r.message);
//                 renderDonut(r.message);
//             }
//         });
//     }

//     /* ── LOAD CHART.JS ONCE ── */
//     if (!window.Chart) {
//         const s = document.createElement('script');
//         s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
//         document.head.appendChild(s);
//     }
// };

frappe.pages['consolidate-report'].on_page_load = function (wrapper) {

    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Budget Dashboard',
        single_column: true
    });

    /* ── STYLES ── */
    $(`<style>
        /* === BASE === */
        .bd-wrap {
            padding: 16px;
            box-sizing: border-box;
        }

        /* === TOP BAR === */
        .bd-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 16px;
        }
        .bd-title {
            font-size: 18px;
            font-weight: 600;
            color: #111;
            margin: 0;
        }
        .bd-filter { width: 200px; }
        .bd-filter .form-control,
        .bd-filter select {
            width: 100% !important;
            height: 34px !important;
            font-size: 13px !important;
            border-radius: 8px !important;
            border: 1px solid #e2e8f0 !important;
        }

        /* === CARDS === */
        .bd-cards {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 16px;
        }
        .bd-card {
            background: #fff;
            border: 1px solid #e8edf3;
            border-radius: 12px;
            padding: 14px 16px;
            border-left: 4px solid #378ADD;
            min-width: 0;
        }
        .bd-card-label {
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .6px;
            color: #888;
            margin-bottom: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .bd-card-value {
            font-size: 18px;
            font-weight: 700;
            color: #111;
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .bd-card-sub {
            font-size: 11px;
            color: #888;
            margin-top: 3px;
        }

        /* === BOTTOM ROW: hbar + donut side by side === */
        .bd-bottom {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 14px;
            align-items: start;
        }

        /* === HORIZONTAL BAR === */
        .bd-hbar-row {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 13px;
        }
        .bd-hbar-label {
            font-size: 13px;
            color: #444;
            font-weight: 500;
            width: 180px;
            min-width: 180px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: right;
        }
        .bd-hbar-track {
            flex: 1;
            height: 22px;
            background: #f0f2f5;
            border-radius: 6px;
            overflow: hidden;
        }
        .bd-hbar-fill {
            height: 100%;
            border-radius: 6px;
            transition: width .5s ease;
        }
        .bd-hbar-val {
            font-size: 13px;
            color: #222;
            font-weight: 700;
            white-space: nowrap;
            width: 72px;
            min-width: 72px;
        }

        .bd-chart-box {
            background: #fff;
            border: 1px solid #e8edf3;
            border-radius: 12px;
            padding: 16px 18px;
            min-width: 0;
        }
        .bd-chart-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2px;
        }
        .bd-chart-title {
            font-size: 13px;
            font-weight: 600;
            color: #111;
            margin: 0;
        }
        .bd-chart-sub {
            font-size: 12px;
            color: #aaa;
            margin: 0 0 12px;
        }

        /* === LEGEND === */
        .bd-legend {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 12px;
        }
        .bd-legend-item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 13px;
            color: #444;
            font-weight: 500;
        }
        .bd-legend-dot {
            width: 9px;
            height: 9px;
            border-radius: 2px;
            flex-shrink: 0;
        }

        /* === DONUT CENTER === */
        .bd-donut-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            pointer-events: none;
        }
        .bd-donut-center-val {
            font-size: 20px;
            font-weight: 700;
            color: #111;
            line-height: 1.1;
        }
        .bd-donut-center-lbl {
            font-size: 10px;
            color: #888;
            margin-top: 2px;
        }

        /* =====================
           RESPONSIVE BREAKPOINTS
           ===================== */
        @media (min-width: 1400px) {
            .bd-wrap { padding: 20px 28px; }
            .bd-title { font-size: 20px; }
            .bd-card-value { font-size: 20px; }
            .bd-bottom { grid-template-columns: 1fr 440px; }
        }
        @media (max-width: 1200px) {
            .bd-bottom { grid-template-columns: 1fr 360px; }
        }
        @media (max-width: 1024px) {
            .bd-cards { grid-template-columns: repeat(4, 1fr); }
            .bd-bottom { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
            .bd-wrap { padding: 12px; }
            .bd-cards { grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .bd-filter { width: 180px; }
            .bd-title { font-size: 16px; }
            .bd-card-value { font-size: 16px; }
            .bd-hbar-label { width: 130px; min-width: 130px; font-size: 12px; }
            .bd-hbar-track { height: 18px; }
            .bd-hbar-val   { font-size: 12px; width: 60px; min-width: 60px; }
        }
        @media (max-width: 600px) {
            .bd-top { flex-direction: column; align-items: flex-start; }
            .bd-filter { width: 100%; }
            .bd-cards { grid-template-columns: repeat(2, 1fr); }
            .bd-chart-box { padding: 12px 14px; }
            .bd-hbar-label { width: 90px; min-width: 90px; font-size: 11px; }
            .bd-hbar-track { height: 16px; }
            .bd-hbar-val   { width: 52px; min-width: 52px; font-size: 11px; }
            .bd-hbar-row   { gap: 8px; margin-bottom: 10px; }
        }
        @media (max-width: 420px) {
            .bd-cards { grid-template-columns: 1fr; }
            .bd-card-value { font-size: 15px; }
            .bd-donut-center-val { font-size: 16px; }
            .bd-hbar-label { width: 70px; min-width: 70px; }
            .bd-hbar-val   { width: 46px; min-width: 46px; }
        }
    </style>`).appendTo('head');

    /* ── PALETTE ── */
    const PALETTE = ['#378ADD','#1D9E75','#D85A30','#7F77DD','#D4537E','#BA7517','#639922','#E24B4A','#888780','#185FA5'];

    /* ── LAYOUT ── */
    $(page.body).html(`
        <div class="bd-wrap">
                <div class="bd-filter" id="bd-fy-wrap"></div>
            <div class="bd-cards" id="bd-cards"></div>
            <div class="bd-bottom">
                <!-- Horizontal bar -->
                <div class="bd-chart-box">
                    <div class="bd-chart-header">
                        <p class="bd-chart-title">Top spenders by budget</p>
                    </div>
                    <p class="bd-chart-sub">All categories ranked highest to lowest</p>
                    <div id="bd-hbar-body"></div>
                </div>
                <!-- Donut -->
                <div class="bd-chart-box">
                    <div class="bd-chart-header">
                        <p class="bd-chart-title">Budget share</p>
                    </div>
                    <p class="bd-chart-sub">Percentage distribution</p>
                    <div style="position:relative;width:100%;height:260px;" id="bd-donut-wrap">
                        <canvas id="bd-donut"></canvas>
                        <div class="bd-donut-center" id="bd-donut-center">
                            <div class="bd-donut-center-val" id="bd-donut-total"></div>
                            <div class="bd-donut-center-lbl">Grand total</div>
                        </div>
                    </div>
                    <div class="bd-legend" id="bd-donut-legend"></div>
                </div>
            </div>
        </div>
    `);

    /* ── FY FILTER ── */
    let donutChart = null;

    const fyControl = frappe.ui.form.make_control({
        parent: document.getElementById('bd-fy-wrap'),
        df: {
            label: 'Financial Year',
            fieldtype: 'Select',
            fieldname: 'financial_year',
            reqd: 1,
            change() { const fy = this.get_value(); if (fy) load(fy); }
        },
        render_input: true
    });
    fyControl.refresh();

    frappe.call({
        method: 'annual_budget.api.filter_options.get_financial_year_list',
        callback(r) {
            if (!r.message?.length) return;
            const years = r.message.map(d => d.financial_year);
            fyControl.df.options = years.join('\n');
            fyControl.refresh();
            const now = new Date(), y = now.getFullYear(), m = now.getMonth() + 1;
            const fy  = m >= 4 ? `${y}-${String(y+1).slice(-2)}` : `${y-1}-${String(y).slice(-2)}`;
            const def = years.includes(fy) ? fy : years[0];
            fyControl.set_value(def);
            load(def);
        }
    });

    /* ── HELPERS ── */
    const fmtINR = v => '₹' + Math.round(v || 0).toLocaleString('en-IN');
    const fmtCr  = v => { const cr = Math.round((v || 0) / 1e7); return cr >= 1 ? cr + ' Cr' : fmtINR(v); };

    /* ── RENDER CARDS ── */
    function renderCards(data) {
        const cards = data.number_cards || [];
        const grand = data.grand_total  || 0;
        const $c    = $('#bd-cards').empty();

        $c.append(`
            <div class="bd-card" style="border-left-color:#1D9E75;">
                <div class="bd-card-label">Grand Total</div>
                <div class="bd-card-value">${fmtINR(grand)}</div>
                <div class="bd-card-sub">${cards.length} categories</div>
            </div>
        `);

        cards.forEach((c, i) => {
            const pct = grand > 0 ? ((c.total_budget / grand) * 100).toFixed(1) : '0.0';
            $c.append(`
                <div class="bd-card" style="border-left-color:${PALETTE[i % PALETTE.length]};">
                    <div class="bd-card-label">${c.label}</div>
                    <div class="bd-card-value">${fmtINR(c.total_budget)}</div>
                    <div class="bd-card-sub">${pct}% of total</div>
                </div>
            `);
        });
    }

    /* ── RENDER HORIZONTAL BAR ── */
    function renderHBar(data) {
        const cards  = data.number_cards || [];
        const sorted = [...cards].sort((a, b) => (b.total_budget || 0) - (a.total_budget || 0));
        const max    = sorted[0]?.total_budget || 1;
        const $body  = $('#bd-hbar-body').empty();

        sorted.forEach((c, i) => {
            const pct   = ((c.total_budget || 0) / max * 100).toFixed(1);
            const color = PALETTE[i % PALETTE.length];
            $body.append(`
                <div class="bd-hbar-row">
                    <div class="bd-hbar-label" title="${c.label}">${c.label}</div>
                    <div class="bd-hbar-track">
                        <div class="bd-hbar-fill" style="width:${pct}%;background:${color};"></div>
                    </div>
                    <div class="bd-hbar-val">${fmtCr(c.total_budget)}</div>
                </div>
            `);
        });
    }

    /* ── RENDER DONUT CHART ── */
    function renderDonut(data) {
        const cards  = data.number_cards || [];
        const grand  = data.grand_total  || 0;
        const labels = cards.map(c => c.label);
        const values = cards.map(c => Math.round(c.total_budget || 0));
        const colors = labels.map((_, i) => PALETTE[i % PALETTE.length]);

        $('#bd-donut-total').text(fmtCr(grand));

        const $leg = $('#bd-donut-legend').empty();
        labels.forEach((lbl, i) => {
            const pct = grand > 0 ? ((values[i] / grand) * 100).toFixed(1) : '0.0';
            $leg.append(`
                <span class="bd-legend-item">
                    <span class="bd-legend-dot" style="background:${colors[i]};"></span>
                    ${lbl} — ${pct}%
                </span>
            `);
        });

        if (donutChart) { donutChart.destroy(); donutChart = null; }

        donutChart = new Chart(document.getElementById('bd-donut'), {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#fff',
                    hoverOffset: 6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '68%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        bodyFont: { size: 13 },
                        titleFont: { size: 13 },
                        callbacks: {
                            label: ctx => {
                                const pct = grand > 0 ? ((ctx.parsed / grand) * 100).toFixed(1) : '0.0';
                                return ` ${fmtINR(ctx.parsed)}  (${pct}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    /* ── LOAD ── */
    function load(fy) {
        frappe.call({
            method: 'annual_budget.api.phase_sheet.get_number_card_totals',
            args: { financial_year: fy },
            callback(r) {
                if (!r.message) return;
                renderCards(r.message);
                renderHBar(r.message);
                renderDonut(r.message);
            }
        });
    }

    /* ── RESIZE HANDLER ── */
    let resizeTimer;
    $(window).on('resize.bd', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const fy = fyControl.get_value();
            if (fy) load(fy);
        }, 300);
    });

    $(wrapper).on('hide', function () {
        $(window).off('resize.bd');
    });

    /* ── LOAD CHART.JS ONCE ── */
    if (!window.Chart) {
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
        s.onload = () => { const fy = fyControl.get_value(); if (fy) load(fy); };
        document.head.appendChild(s);
    }
};