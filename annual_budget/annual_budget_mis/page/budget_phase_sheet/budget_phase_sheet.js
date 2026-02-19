// frappe.pages['budget-phase-sheet'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Budget Phase Sheet',
// 		single_column: true
// 	});
// 	loadUnits();
// 	page.set_primary_action(__('Export CSV'), function () {
//         export_phase_sheet();
//     });
// 	function export_phase_sheet() {
//      let financial_year = fiscal_year_filter.get_value();
//      let units = unit_filter.get_value();
// 	 let cost_center = cost_center_filter.get_value();
// 	 let location_code = location_code_filter.get_value();
//     if (!financial_year || !units) {
//         frappe.msgprint(__('Please select Financial Year and Unit'));
//         return;
//     }

//     frappe.call({
//         method: "annual_budget.api.export_reports.export_phase_sheet_excel",
//         args: {
//             financial_year: financial_year,
//             units: units,
// 			cost_center:cost_center
//         },
//         freeze: true,
//         freeze_message: __("Preparing CSV file..."),
//         callback: function (r) {
//             if (r.message && r.message.file_url) {
//                 // Auto download
//                 window.open(r.message.file_url);
//                 frappe.msgprint({
//                     title: __("Success"),
//                     message: __("Exported successfully"),
//                     indicator: "green"
//                 });
//             }
//         }
//     });
// }

//     /* ------------------------------------------------
//        FILTER SECTION (Only this gets padding)
//     --------------------------------------------------*/
//     let filter_section = $(`
//         <div class="frappe-control-group row custom-filter-row"></div>
//     `).appendTo(page.body);

//     /* ------------------------------------------------
//        CSS (Only for Filter Area)
//     --------------------------------------------------*/
//     $(`<style>
//         /* Padding only for filter area */
//         .custom-filter-row {
//             padding: 15px 20px;
//             background: #fff;
//             border-radius: 6px;
//             margin-top: 10px;
//         }

//         /* Override default row margins only for filters */
//         .custom-filter-row.row {
//             margin-right: 0px;
//             margin-left: 0px;
//         }

//         /* Column spacing */
//         .custom-filter-row .col-md-4,
//         .custom-filter-row .col-sm-12 {
//             padding-left: 8px;
//             padding-right: 8px;
//         }

//         /* Mobile responsive */
//         @media (max-width: 768px) {
//             .custom-filter-row {
//                 padding: 12px;
//             }
//         }
//     </style>`).appendTo("head");


//     /* ------------------------------------------------
//        Helper for adding fields
//     --------------------------------------------------*/
//     function make_field() {
//         let col = $(`<div class="col-md-4 col-sm-12"></div>`).appendTo(filter_section);
//         return col;
//     }

//     /* ------------------------------------------------
//        Financial Year
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
//        Unit
//     --------------------------------------------------*/
//     // let unit_col = make_field();
//     // let unit_filter = frappe.ui.form.make_control({
//     //     parent: unit_col,
//     //     df: {
//     //         label: "Unit",
//     //         fieldtype: "Link",
//     //         fieldname: "unit",
//     //         options: "Unit",
//     //         default: "APU",
//     //         reqd: 1,
//     //         change() {
//     //             let unit = unit_filter.get_value();
//     //             loadData();
//     //             loadCostCenters(unit);
// 	// 			loadLocationCodes(unit);

//     //         }
//     //     },
//     //     render_input: true
//     // });

//     // /* ------------------------------------------------
//     //    Cost Center
//     // --------------------------------------------------*/
//     // let cc_col = make_field();
//     // let cost_center_filter = frappe.ui.form.make_control({
//     //     parent: cc_col,
//     //     df: {
//     //         label: "Cost Center",
//     //         fieldtype: "Select",
//     //         fieldname: "cost_center",
//     //         change() {
//     //             let cc = cost_center_filter.get_value();
//     //             console.log("Selected Cost Center:", cc);
// 	// 			loadData()
//     //         }
//     //     },
//     //     render_input: true
//     // });

// 	//    /* ---------------- Location Code ---------------- */
//     // let lc_col = make_field();
//     // let location_code_filter = frappe.ui.form.make_control({
//     //     parent: lc_col,
//     //     df: {
//     //         label: "Location Code",
//     //         fieldtype: "Select",
//     //         fieldname: "location_code",
//     //         change() {
//     //             console.log("Selected Location Code:", location_code_filter.get_value());
// 	// 			loadData();
//     //         }
//     //     },
//     //     render_input: true
//     // });
// 	/* ---------------- Unit (Multi, from API) ---------------- */
// let unit_col = make_field();
// let unit_filter = frappe.ui.form.make_control({
//     parent: unit_col,
//     df: {
//         label: "Unit",
//         fieldtype: "MultiSelectList",
//         fieldname: "unit",
//         reqd: 1,

//         get_data: function (txt) {
//             return frappe.call({
//                 method: "your_app.your_module.get_units"   // <-- change path
//             }).then(r => {
//                 let data = r.message.data || [];

//                 // MultiSelectList needs: {value, description}
//                 return data.map(d => {
//                     return {
//                         value: d.value,
//                         description: d.label
//                     };
//                 });
//             });
//         },

//         change() {
//             let units = unit_filter.get_value();   // array
//             console.log("Selected Units:", units);
//             loadData();
//             loadCostCenters(units);
//             loadLocationCodes(units);
//         }
//     },
//     render_input: true
// });


// /* ---------------- Cost Center (Multi) ---------------- */
// let cc_col = make_field();
// let cost_center_filter = frappe.ui.form.make_control({
//     parent: cc_col,
//     df: {
//         label: "Cost Center",
//         fieldtype: "MultiSelectList",
//         fieldname: "cost_center",

//         get_data: function (txt) {
//             // For now empty, you can wire API later
//             return [];
//         },

//         change() {
//             let cc = cost_center_filter.get_value();  // array
//             console.log("Selected Cost Centers:", cc);
//             loadData();
//         }
//     },
//     render_input: true
// });


// /* ---------------- Location Code (Multi) ---------------- */
// let lc_col = make_field();
// let location_code_filter = frappe.ui.form.make_control({
//     parent: lc_col,
//     df: {
//         label: "Location Code",
//         fieldtype: "MultiSelectList",
//         fieldname: "location_code",

//         get_data: function (txt) {
//             // For now empty, you can wire API later
//             return [];
//         },

//         change() {
//             let locations = location_code_filter.get_value(); // array
//             console.log("Selected Location Codes:", locations);
//             loadData();
//         }
//     },
//     render_input: true
// });

// function loadUnits() {
//     frappe.call({
//         method: "annual_budget.api.filter_options.get_units",
//         callback: function (r) {
//             if (r.message && r.message.data) {
//                 let options = r.message.data.map(d => ({
//                     value: d.value,
//                     description: d.label
//                 }));
//                 unit_filter.set_data(options);   // correct way for MultiSelectList
//             }
//         }
//     });
// }


// function loadCostCenters(units) {
//     frappe.call({
//         method: "annual_budget.api.filter_options.get_cost_centers_by_set_id",
//         args: { units: units },
//         callback: function (r) {
//             if (r.message && r.message.data) {
//                 let options = r.message.data.map(d => ({
//                     label: d.label,
//                     value: d.value
//                 }));

//                 cost_center_filter.df.options = options;
//                 cost_center_filter.refresh();

//                 if (options.length > 0) {
//                     cost_center_filter.set_value(options[0].value);
//                 }
//             }
//         }
//     });
// }

//   /* ---------------- Load Location Codes ---------------- */
//     function loadLocationCodes(unit) {
//         frappe.call({
//             method: "annual_budget.api.filter_options.get_location_codes_by_unit",
//             args: { unit: unit },
//             callback: function (r) {
//                 if (r.message && r.message.data) {
//                     location_code_filter.df.options = r.message.data;
//                     location_code_filter.refresh();
//                     location_code_filter.set_value("");
//                 }
//             }
//         });
//     }


// // Load cost centers for default Unit when page loads
// frappe.after_ajax(() => {
//     let default_unit = unit_filter.get_value();
//     loadCostCenters(default_unit);
// 	loadLocationCodes(default_unit);

// });


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

	
// $(style).appendTo(page.body);

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
// 		let cost_center = cost_center_filter.get_value();
// 		let location_code = location_code_filter.get_value();

// 		if (!fy || !unit) return;

// 		frappe.call({
// 			method: "annual_budget.api.phase_sheet.get_consolidated_report",
// 			args: { financial_year: fy, units: unit,cost_center:cost_center,location_code:location_code },
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







// frappe.pages['budget-phase-sheet'].on_page_load = function(wrapper) {

// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Budget Phase Sheet',
// 		single_column: true
// 	});

// 	page.set_primary_action(__('Export CSV'), function () {
// 		export_phase_sheet();
// 	});

// 	function export_phase_sheet() {
// 		let financial_year = fiscal_year_filter.get_value();
// 		let units = unit_filter.get_value();
// 		let cost_center = cost_center_filter.get_value();
// 		let location_code = location_code_filter.get_value();

// 		if (!financial_year || !units) {
// 			frappe.msgprint(__('Please select Financial Year and Unit'));
// 			return;
// 		}

// 		frappe.call({
// 			method: "annual_budget.api.export_reports.export_phase_sheet_excel",
// 			args: {
// 				financial_year: financial_year,
// 				units: units,
// 				cost_center: cost_center,
// 				location_code: location_code
// 			},
// 			freeze: true,
// 			freeze_message: __("Preparing CSV file..."),
// 			callback: function (r) {
// 				if (r.message && r.message.file_url) {
// 					window.open(r.message.file_url);
// 					frappe.msgprint({
// 						title: __("Success"),
// 						message: __("Exported successfully"),
// 						indicator: "green"
// 					});
// 				}
// 			}
// 		});
// 	}

// 	/* ------------------------------------------------
// 	   FILTER SECTION
// 	--------------------------------------------------*/
// 	let filter_section = $(`
// 		<div class="frappe-control-group row custom-filter-row"></div>
// 	`).appendTo(page.body);

// 	$(`<style>
// 		.custom-filter-row {
// 			padding: 15px 20px;
// 			background: #fff;
// 			border-radius: 6px;
// 			margin-top: 10px;
// 		}
// 		.custom-filter-row.row {
// 			margin-right: 0px;
// 			margin-left: 0px;
// 		}
// 		.custom-filter-row .col-md-4,
// 		.custom-filter-row .col-sm-12 {
// 			padding-left: 8px;
// 			padding-right: 8px;
// 		}
// 	</style>`).appendTo("head");

// 	function make_field() {
// 		let col = $(`<div class="col-md-4 col-sm-12"></div>`).appendTo(filter_section);
// 		return col;
// 	}

// 	/* Financial Year */
// 	let fy_col = make_field();
// 	let fiscal_year_filter = frappe.ui.form.make_control({
// 		parent: fy_col,
// 		df: {
// 			label: "Financial Year",
// 			fieldtype: "Select",
// 			fieldname: "financial_year",
// 			options: ["2025-26", "2026-27"].join("\n"),
// 			default: "2025-26",
// 			reqd: 1,
// 			change() {
// 				loadData();
// 			}
// 		},
// 		render_input: true
// 	});

// 	/* Unit */
// 	let unit_col = make_field();
// 	let unit_filter = frappe.ui.form.make_control({
// 		parent: unit_col,
// 		df: {
// 			label: "Unit",
// 			fieldtype: "Link",
// 			fieldname: "unit",
// 			options: "Unit",
// 			default: "APU",
// 			reqd: 1,
// 			change() {
// 				let unit = unit_filter.get_value();
// 				loadData();
// 				loadCostCenters(unit);
// 				loadLocationCodes(unit);
// 			}
// 		},
// 		render_input: true
// 	});

// 	/* Cost Center */
// 	let cc_col = make_field();
// 	let cost_center_filter = frappe.ui.form.make_control({
// 		parent: cc_col,
// 		df: {
// 			label: "Cost Center",
// 			fieldtype: "Select",
// 			fieldname: "cost_center",
// 			change() {
// 				loadData();
// 			}
// 		},
// 		render_input: true
// 	});

// 	/* Location Code */
// 	let lc_col = make_field();
// 	let location_code_filter = frappe.ui.form.make_control({
// 		parent: lc_col,
// 		df: {
// 			label: "Location Code",
// 			fieldtype: "Select",
// 			fieldname: "location_code",
// 			change() {
// 				loadData();
// 			}
// 		},
// 		render_input: true
// 	});

// 	function loadCostCenters(units) {
// 		frappe.call({
// 			method: "annual_budget.api.filter_options.get_cost_centers_by_set_id",
// 			args: { units: units },
// 			callback: function (r) {
// 				if (r.message && r.message.data) {
// 					let options = r.message.data.map(d => ({
// 						label: d.label,
// 						value: d.value
// 					}));

// 					cost_center_filter.df.options = options;
// 					cost_center_filter.refresh();

// 					if (options.length > 0) {
// 						cost_center_filter.set_value(options[0].value);
// 					}
// 				}
// 			}
// 		});
// 	}

// 	function loadLocationCodes(unit) {
// 		frappe.call({
// 			method: "annual_budget.api.filter_options.get_location_codes_by_unit",
// 			args: { unit: unit },
// 			callback: function (r) {
// 				if (r.message && r.message.data) {
// 					location_code_filter.df.options = r.message.data;
// 					location_code_filter.refresh();
// 					location_code_filter.set_value("");
// 				}
// 			}
// 		});
// 	}

// 	frappe.after_ajax(() => {
// 		let default_unit = unit_filter.get_value();
// 		loadCostCenters(default_unit);
// 		loadLocationCodes(default_unit);
// 	});
// 	/* ---------- Styles for Table ---------- */
// 	const style = `
// 	<style>
// 		#tables-container { 
// 			margin: 20px; 
// 			background-color: #ffffff; 
// 			border-radius: 8px; 
// 			padding: 8px; 
// 		}

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
// 			align-items: center;
// 			gap: 18px;
// 			font-size: 13px;
// 			font-weight: 500;
// 			color: #333;
// 		}

// 		#checkbox-area input {
// 			transform: scale(1.15);
// 			cursor: pointer;
// 		}

// 		.scroll-wrapper { 
// 			border: 1px solid #ccc; 
// 			border-radius: 6px; 
// 			overflow-x: auto; 
// 			overflow-y: auto; 
// 			max-height: 70vh; 
// 			background: #fff; 
// 		}

// 		table.university-table { 
// 			min-width: 1200px; 
// 			width: 100%; 
// 			border-collapse: collapse; 
// 			font-size: 13px; 
// 			color: #111; 
// 			background:#fff; 
// 		}

// 		table.university-table th, 
// 		table.university-table td {
// 			border: 1px solid #ddd;
// 			padding: 8px 10px;
// 			white-space: nowrap;
// 			vertical-align: middle;
// 			text-align: center;
// 			background:#fff !important;
// 		}

// 		table.university-table th:first-child,
// 		table.university-table td:first-child { 
// 			text-align: left !important; 
// 		}

// 		table.university-table th:nth-child(2),
// 		table.university-table td:nth-child(2) { 
// 			text-align: left !important; 
// 		}

// 		table.university-table thead tr.main-row th { 
// 			background-color: #0076B6 !important; 
// 			color: #fff !important; 
// 			position: sticky; 
// 			top: 0; 
// 			z-index: 25; 
// 			cursor: pointer; 
// 		}

// 		table.university-table thead tr.sub-row th { 
// 			background-color: #F26B21 !important; 
// 			color: #fff !important; 
// 			position: sticky; 
// 			top: 34px; 
// 			z-index: 24; 
// 		}

// 		tr.expense-head { 
// 			font-weight: 700; 
// 			cursor: pointer; 
// 		}

// 		tr.sub-head { 
// 			background-color: #FFF3E6 !important;
// 			font-weight: 600; 
// 			cursor: pointer; 
// 		}

// 		tr.line-item td:first-child { 
// 			padding-left: 35px !important; 
// 		}

// 		tr.sub-head td:first-child { 
// 			padding-left: 20px !important; 
// 		}

// 		tr.grand-total-row td {
// 			background:#003B63 !important;
// 			color:#fff !important;
// 			font-weight:700 !important;
// 		}
// 	</style>
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

// 	/* ---------- Load Data ---------- */
// 	function loadData() {
// 		let fy = fiscal_year_filter.get_value();
// 		let unit = unit_filter.get_value();
// 		let cost_center = cost_center_filter.get_value();
// 		let location_code = location_code_filter.get_value();

// 		if (!fy || !unit) return;

// 		frappe.call({
// 			method: "annual_budget.api.phase_sheet.get_consolidated_report",
// 			args: { 
// 				financial_year: fy, 
// 				units: unit,
// 				cost_center: cost_center,
// 				location_code: location_code
// 			},
// 			callback: function(r) {
// 				expense_heads = r.message || [];
// 				renderTable();
// 			}
// 		});
// 	}

// 	function matchesSearch(...values) {
// 		return values.some(v => (String(v || "").toLowerCase()).includes(searchText.toLowerCase()));
// 	}

// 		/* ---------- Render Table ---------- */
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
// 				if (expandedQuarters.includes(q)) {
// 					quarters[q].months.forEach(m => $subRow.append(`<th>${m}</th>`));
// 				}
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
// 					<td>▶ ${head.name}</td>
// 					<td class="gl-empty">-</td>
// 					${['q1','q2','q3','q4'].map(q =>
// 						expandedQuarters.includes(q)
// 							? head[q].map(v => `<td>${formatNumber(v)}</td>`).join('')
// 							: `<td colspan="3">${formatNumber(head[q].reduce((a,b)=>a+b,0))}</td>`
// 					).join('')}
// 					<td class="text-blue">${formatNumber(headTotal)}</td>
// 				</tr>
// 			`);
// 		});

// 		$table.append($tbody);

// 		/* Bind Events */
// 		bindQuarterClicks();
// 		bindExpenseHeadClicks();
// 	}

// 	/* ---------- Quarter Expand/Collapse ---------- */
// 	function bindQuarterClicks() {
// 		$('#phase-table').find('th.expandable').off('click').on('click', function () {
// 			const q = $(this).data('quarter');
// 			expandedQuarters = expandedQuarters.includes(q)
// 				? expandedQuarters.filter(x => x !== q)
// 				: [...expandedQuarters, q];

// 			$("#expand-quarters").prop("checked", expandedQuarters.length === 4);
// 			renderTable();
// 		});
// 	}

// 	/* ---------- Expense Head Expand (OPEN ABOVE) ---------- */
// 	function bindExpenseHeadClicks() {
// 		$('#phase-table').find('.expense-head').off('click').on('click', function () {
// 			const $row = $(this);
// 			const headName = $row.data('head');

// 			/* Collapse */
// 			if ($row.hasClass("opened")) {
// 				$row.removeClass("opened");
// 				$row.prevUntil(".expense-head").remove();
// 				$row.find("td:first").html("▶ " + headName);
// 				return;
// 			}

// 			/* Expand */
// 			$row.addClass("opened");
// 			$row.find("td:first").html("▼ " + headName);

// 			const head = expense_heads.find(h => h.name === headName);
// 			let html = "";

// 			/* Line Items */
// 			if (head.items && head.items.length) {
// 				head.items.forEach(item => {
// 					const total = ['q1','q2','q3','q4']
// 						.reduce((sum, q) => sum + item[q].reduce((a,b)=>a+b,0), 0);

// 					html += `
// 						<tr class="line-item temp-row">
// 							<td>${item.name}</td>
// 							<td>${item.gl_code}</td>
// 							${['q1','q2','q3','q4'].map(q =>
// 								expandedQuarters.includes(q)
// 									? item[q].map(v => `<td>${formatNumber(v)}</td>`).join('')
// 									: `<td colspan="3">${formatNumber(item[q].reduce((a,b)=>a+b,0))}</td>`
// 							).join('')}
// 							<td>${formatNumber(total)}</td>
// 						</tr>
// 					`;
// 				});
// 			}

// 			/* Sub Heads */
// 			if (head.sub_heads && head.sub_heads.length) {
// 				head.sub_heads.forEach(sub => {
// 					const key = head.name + "__" + sub.name;
// 					const subTotal = ['q1','q2','q3','q4']
// 						.reduce((sum, q) => sum + sub[q].reduce((a,b)=>a+b,0), 0);

// 					html += `
// 						<tr class="sub-head temp-row" data-sub="${key}">
// 							<td>▶ ${sub.name}</td>
// 							<td class="gl-empty">-</td>
// 							${['q1','q2','q3','q4'].map(q =>
// 								expandedQuarters.includes(q)
// 									? sub[q].map(v => `<td>${formatNumber(v)}</td>`).join('')
// 									: `<td colspan="3">${formatNumber(sub[q].reduce((a,b)=>a+b,0))}</td>`
// 							).join('')}
// 							<td class="text-blue">${formatNumber(subTotal)}</td>
// 						</tr>
// 					`;
// 				});
// 			}

// 			/* Insert rows ABOVE */
// 			$row.before(html);

// 			/* Bind Sub Head Clicks */
// 			bindSubHeadClicks();
// 		});
// 	}

// 	/* ---------- Sub Head Expand (OPEN ABOVE) ---------- */
// 	function bindSubHeadClicks() {
// 		$('#phase-table').find('.sub-head').off('click').on('click', function () {
// 			const $row = $(this);
// 			const key = $row.data('sub');

// 			/* Collapse */
// 			if ($row.hasClass("opened")) {
// 				$row.removeClass("opened");
// 				$row.prevUntil(".sub-head, .expense-head").remove();
// 				const title = $row.text().replace("▼", "").replace("▶", "").trim();
// 				$row.find("td:first").html("▶ " + title);
// 				return;
// 			}

// 			/* Expand */
// 			$row.addClass("opened");
// 			const title = $row.text().replace("▶", "").trim();
// 			$row.find("td:first").html("▼ " + title);

// 			const [headName, subName] = key.split("__");
// 			const head = expense_heads.find(h => h.name === headName);
// 			const sub = head.sub_heads.find(s => s.name === subName);

// 			let html = "";

// 			sub.items.forEach(item => {
// 				const total = ['q1','q2','q3','q4']
// 					.reduce((sum, q) => sum + item[q].reduce((a,b)=>a+b,0), 0);

// 				html += `
// 					<tr class="line-item temp-row">
// 						<td>${item.name}</td>
// 						<td>${item.gl_code}</td>
// 						${['q1','q2','q3','q4'].map(q =>
// 							expandedQuarters.includes(q)
// 								? item[q].map(v => `<td>${formatNumber(v)}</td>`).join('')
// 								: `<td colspan="3">${formatNumber(item[q].reduce((a,b)=>a+b,0))}</td>`
// 						).join('')}
// 						<td>${formatNumber(total)}</td>
// 					</tr>
// 				`;
// 			});

// 			/* Insert ABOVE */
// 			$row.before(html);
// 		});
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

// 	/* ---------- Expand All Quarters ---------- */
// 	$("#expand-quarters").on("change", function() {
// 		expandedQuarters = this.checked ? ['q1','q2','q3','q4'] : [];
// 		renderTable();
// 	});

// 	/* ---------- Expand All Items ---------- */
// 	$("#expand-items").on("change", function() {
// 		if (this.checked) {
// 			// Expand all expense heads
// 			$('#phase-table .expense-head').each(function(){
// 				if (!$(this).hasClass("opened")) {
// 					$(this).trigger("click");
// 				}
// 			});
// 		} else {
// 			// Collapse all
// 			$('#phase-table .expense-head.opened').each(function(){
// 				$(this).trigger("click");
// 			});
// 		}
// 	});

// 	/* ---------- Search ---------- */
// 	$("#global-search-box").on("input", function() {
// 		searchText = this.value;
// 		renderTable();
// 	});

// 	/* ---------- Initial Load ---------- */
// 	loadData();

// };   // END OF PAGE





frappe.pages['budget-phase-sheet'].on_page_load = function (wrapper) {

    /* ------------------------------------------------
       PAGE
    --------------------------------------------------*/
    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Budget Face Sheet',
        single_column: true
    });

    /* ------------------------------------------------
       FILTER SECTION
    --------------------------------------------------*/
    let filter_section = $(`
        <div class="frappe-control-group row custom-filter-row"></div>
    `).appendTo(page.body);

    $(`<style>
        .custom-filter-row {
            padding: 15px 20px;
            background: #fff;
            border-radius: 6px;
            margin-top: 10px;
        }
        .custom-filter-row.row {
            margin-left: 0;
            margin-right: 0;
        }
        .custom-filter-row .col-md-4,
        .custom-filter-row .col-sm-12 {
            padding-left: 8px;
            padding-right: 8px;
        }
    </style>`).appendTo("head");

    function make_field() {
        return $(`<div class="col-md-4 col-sm-12"></div>`).appendTo(filter_section);
    }

    /* ------------------------------------------------
       HELPER — PRESERVE LABELS (CRITICAL)
    --------------------------------------------------*/
    function mergeSelectedOptions(control, new_options) {
        let selected = (control.get_value() || []).map(String);
        let existing = control.df.options || [];
        let map = {};

        existing.forEach(o => map[String(o.value)] = o);
        new_options.forEach(o => map[String(o.value)] = o);

        selected.forEach(v => {
            if (!map[v]) {
                map[v] = { label: v, value: v, description: "" };
            }
        });

        return Object.values(map);
    }
let cards_container = $('<div class="card-row"></div>').appendTo(page.body);


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
       UNIT (MULTI SELECT)
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
                }).then(r => {
                    return (r.message?.data || [])
                        .filter(d => d.value)
                        .map(d => ({
                            label: d.label,
                            value: String(d.value),
                            description: ""
                        }));
                });
            },
            change() {
                units = unit_filter.get_value().map(String);
                cost_center_filter.set_value([]);
                location_code_filter.df.options = [];
                location_code_filter.refresh();
                cost_center_filter.df.options = [];
                cost_center_filter.refresh();
                if (units.length) {
                    loadCostCenters(units);
                    loadLocationCodes(units);
                    loadData();
                }
            }
        },
        render_input: true
    });

    /* ------------------------------------------------
       COST CENTER (MULTI SELECT)
    --------------------------------------------------*/
    let cc_col = make_field();
    let cost_center_filter = frappe.ui.form.make_control({
        parent: cc_col,
        df: {
            label: "Cost Center",
            fieldtype: "MultiSelectList",
            fieldname: "cost_center",
            options: [],
            change() {
                loadData();
            }
        },
        render_input: true
    });

    /* ------------------------------------------------
       LOCATION CODE (MULTI SELECT)
    --------------------------------------------------*/
    let lc_col = make_field();
    let location_code_filter = frappe.ui.form.make_control({
        parent: lc_col,
        df: {
            label: "Location Code",
            fieldtype: "MultiSelectList",
            fieldname: "location_code",
            options: [],
            change() {
                loadData();
            }
        },
        render_input: true
    });

    /* ------------------------------------------------
       LOAD COST CENTERS
    --------------------------------------------------*/
    function loadCostCenters(units) {
				    cost_center_filter.set_value([]);

        frappe.call({
            method: "annual_budget.api.filter_options.get_cost_centers_by_set_id",
            args: { units: units.join(",") },
            callback(r) {
                let api_options = (r.message?.data || [])
                    .filter(d => d.value)
                    .map(d => ({
                        label: d.label,
                        value: String(d.value),   // 🔥 normalize
                        description: ""
                    }));

                cost_center_filter.df.options =
                    mergeSelectedOptions(cost_center_filter, api_options);

                cost_center_filter.refresh();
            }
        });
    }

    /* ------------------------------------------------
       LOAD LOCATION CODES
    --------------------------------------------------*/
    function loadLocationCodes(units) {
		     location_code_filter.set_value([]);
        frappe.call({
            method: "annual_budget.api.filter_options.get_location_codes_by_unit",
            args: { unit: units.join(",") },
            callback(r) {
                let api_options = (r.message?.data || [])
                    .filter(d => d.value)
                    .map(d => ({
                        label: d.label,
                        value: String(d.value),
                        description: ""
                    }));

                location_code_filter.df.options =
                    mergeSelectedOptions(location_code_filter, api_options);

                location_code_filter.refresh();
            }
        });
    }

    /* ------------------------------------------------
       EXPORT
    --------------------------------------------------*/
    page.set_primary_action(__('Export CSV'), function () {
        export_phase_sheet();
    });

    function export_phase_sheet() {
        let financial_year = fiscal_year_filter.get_value();
        let units = unit_filter.get_value();
        let cost_centers = cost_center_filter.get_value();
        let locations = location_code_filter.get_value();

        if (!financial_year || !units.length) {
            frappe.msgprint(__('Please select Financial Year and Unit'));
            return;
        }

        frappe.call({
            method: "annual_budget.api.export_reports.export_phase_sheet_excel",
            args: {
                financial_year,
                units: units.join(","),
                cost_center: cost_centers,
                location_code: locations
            },
            freeze: true,
            freeze_message: __("Preparing CSV file..."),
            callback(r) {
                if (r.message?.file_url) {
                    window.open(r.message.file_url);
                    frappe.msgprint({
                        title: __("Success"),
                        message: __("Exported successfully"),
                        indicator: "green"
                    });
                }
            }
        });
    }
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



/* =====================================================
   NUMBER CARDS (ERP CLEAN DESIGN)
   ===================================================== */

/* card grid */
.card-row{
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    gap:14px;
    margin:14px 20px;
}


/* base card */
.number-card{
    background:#ffffff;
    border:1px solid #dcdcdc;
    border-radius:8px;
    padding:14px 16px;
    box-shadow:0 2px 6px rgba(0,0,0,.06);
    transition:.15s ease;
}

/* hover */
.number-card:hover{
    transform:translateY(-2px);
    box-shadow:0 6px 14px rgba(0,0,0,.12);
}

/* title */
.number-title{
    font-size:12px;
    font-weight:600;
    color:#666;
    text-transform:uppercase;
    margin-bottom:6px;
}

/* value */
.number-value{
    font-size:20px;
    font-weight:700;
    color:#0076B6;
}

/* GRAND TOTAL CARD */
.number-card.grand{
    border:2px solid #0076B6;
    background:#F4F9FD;
}

.number-card.grand .number-value{
    font-size:24px;
    font-weight:800;
}


/* =====================================================
   RESPONSIVE
   ===================================================== */

@media (max-width:1024px){
    .card-row{
        grid-template-columns:repeat(auto-fill,minmax(180px,1fr));
    }
}

@media (max-width:768px){
    .card-row{
        grid-template-columns:repeat(auto-fill,minmax(140px,1fr));
        gap:10px;
        margin:10px;
    }

    .number-value{
        font-size:16px;
    }
}

@media (max-width:480px){
    .card-row{
        grid-template-columns:1fr 1fr;
    }
}

</style>
`;


function sum(arr){
    return (arr || []).reduce((a,b) => a + (b || 0), 0);
}

/* ===============================
   INR + International format
===============================*/
function formatINR(value){
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value || 0);
}

function renderCards(data){

    cards_container.empty();

    let grand_total = 0;
    let cards_html = "";

   /* Text color palette - All Black */
const colors = [
    "#000000"
];


    let colorIndex = 0;

    /* ===============================
       Calculate totals first
    ===============================*/
    data.forEach(head => {
        grand_total +=
            sum(head.q1) +
            sum(head.q2) +
            sum(head.q3) +
            sum(head.q4);
    });

    /* ===============================
       ⭐ GRAND TOTAL
    ===============================*/
    let gtColor = colors[colorIndex++ % colors.length];
    cards_html += `
        <div class="number-card">
            <div class="number-title" style="color:${gtColor}">Grand Total</div>
            <div class="number-value" style="color:${gtColor}">
                ${formatINR(grand_total)}
            </div>
        </div>
    `;

    /* ===============================
       Main + Sub cards
    ===============================*/
    data.forEach(head => {

        let total =
            sum(head.q1) +
            sum(head.q2) +
            sum(head.q3) +
            sum(head.q4);

        let mainColor = colors[colorIndex++ % colors.length];

        /* Main card */
        cards_html += `
            <div class="number-card">
                <div class="number-title" style="color:${mainColor}">
                    ${head.name}
                </div>
                <div class="number-value" style="color:${mainColor}">
                    ${formatINR(total)}
                </div>
            </div>
        `;

        /* Sub cards */
        (head.sub_heads || []).forEach(sub => {

            let sub_total =
                sum(sub.q1) +
                sum(sub.q2) +
                sum(sub.q3) +
                sum(sub.q4);

            let subColor = colors[colorIndex++ % colors.length];

            cards_html += `
                <div class="number-card">
                    <div class="number-title" style="color:${subColor}">
                        ${sub.name}
                    </div>
                    <div class="number-value" style="color:${subColor}">
                        ${formatINR(sub_total)}
                    </div>
                </div>
            `;
        });
    });

    cards_container.append(cards_html);
}


	
$(style).appendTo(page.body);

	/* ---------- UI Container ---------- */
	const container = $(`
		<div id="tables-container">

			<div id="controls-row">
				<input id="global-search-box" type="text" placeholder="Search Expense / Sub Head / Item / GL Code...">
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
	$(page.body).append(container);


	/* ---------- State ---------- */
	let expense_heads = [];
	let expandedHeads = [];
	let expandedSubHeads = [];
	let expandedQuarters = [];
	let searchText = "";


	/* Quarter Setup */
	const quarters = {
		q1: { label: 'Quarter 1', months: ['April', 'May', 'June'] },
		q2: { label: 'Quarter 2', months: ['July', 'August', 'September'] },
		q3: { label: 'Quarter 3', months: ['October', 'November', 'December'] },
		q4: { label: 'Quarter 4', months: ['January', 'February', 'March'] }
	};

	const formatNumber = n => (n || 0).toLocaleString();

	/* ---------- API LOAD ---------- */
	function loadData() {
		let fy = fiscal_year_filter.get_value();
		let unit = unit_filter.get_value();
		let cost_center = cost_center_filter.get_value();
		let location_code = location_code_filter.get_value();

		let unit_str = unit.join(",");
		let cost_center_str = cost_center.join(",");
		let location_code_str = location_code.join(",");
		console.log(unit_str,cost_center_str,location_code_str,"Values for API")
		if (!fy || !unit) return;

		frappe.call({
			method: "annual_budget.api.phase_sheet.get_consolidated_report",
			args: { financial_year: fy, units: unit_str,cost_center:cost_center_str,location_code:location_code_str },
			callback: function(r) {
				expense_heads = r.message || [];
				renderTable();
				renderCards(expense_heads);   // ⭐ add this

			}
		});
	}


	/* ---------- SEARCH MATCH ---------- */
	function matchesSearch(...values) {
		return values.some(v => (String(v || "").toLowerCase()).includes(searchText.toLowerCase()));
	}


	/* ---------- GRAND TOTAL ---------- */
	function getGrandTotals() {
		const totals = { q1: [0,0,0], q2: [0,0,0], q3: [0,0,0], q4: [0,0,0], total: 0 };

		expense_heads.forEach(head => {
			['q1','q2','q3','q4'].forEach(q => {
				head[q].forEach((v, i) => {
					totals[q][i] += (v || 0);
					totals.total += (v || 0);
				});
			});
		});
		return totals;
	}


	/* ---------- RENDER TABLE ---------- */
	function renderTable() {
		const $table = $('#phase-table');
		$table.empty();

		const $thead = $('<thead></thead>');
		const $mainRow = $('<tr class="main-row"></tr>');
		$mainRow.append('<th rowspan="2">Expense Head / Line Item</th>');
		$mainRow.append('<th rowspan="2">GL Code</th>');

		['q1','q2','q3','q4'].forEach(q => {
			const isExpanded = expandedQuarters.includes(q);
			const arrow = isExpanded ? '▲' : '▼';
			const colspan = 3;
			const rowspan = isExpanded ? 1 : 2;

			$mainRow.append(`
				<th class="expandable" data-quarter="${q}" colspan="${colspan}" rowspan="${rowspan}">
					${quarters[q].label} ${arrow}
				</th>
			`);
		});

		$mainRow.append('<th rowspan="2">Total</th>');
		$thead.append($mainRow);

		if (expandedQuarters.length > 0) {
			const $subRow = $('<tr class="sub-row"></tr>');
			['q1','q2','q3','q4'].forEach(q => {
				if (expandedQuarters.includes(q)) quarters[q].months.forEach(m => $subRow.append(`<th>${m}</th>`));
			});
			$thead.append($subRow);
		}

		$table.append($thead);
		const $tbody = $('<tbody></tbody>');

		expense_heads.forEach(head => {

			const headContainsMatch =
				matchesSearch(head.name) ||
				(head.items || []).some(i => matchesSearch(i.name, i.gl_code)) ||
				(head.sub_heads || []).some(s =>
					matchesSearch(s.name) ||
					(s.items || []).some(i => matchesSearch(i.name, i.gl_code))
				);

			if (!headContainsMatch) return;

			const headTotal = ['q1','q2','q3','q4']
				.reduce((sum, q) => sum + head[q].reduce((a,b)=>a+b,0), 0);

			$tbody.append(`
				<tr class="expense-head" data-head="${head.name}">
					<td>${expandedHeads.includes(head.name) ? '▼' : '▶'} ${head.name}</td>
					<td class="gl-empty">-</td>
					${['q1','q2','q3','q4'].map(q =>
						expandedQuarters.includes(q)
							? head[q].map(v => `<td>${formatNumber(v)}</td>`).join('')
							: `<td colspan="3">${formatNumber(head[q].reduce((a,b)=>a+b,0))}</td>`
					).join('')}
					<td class="text-blue">${formatNumber(headTotal)}</td>
				</tr>
			`);

			/* Line Items */
			if (expandedHeads.includes(head.name) && head.items && head.items.length) {
				head.items
				.filter(item => matchesSearch(item.name, item.gl_code))
				.forEach(item => {
					const total = ['q1','q2','q3','q4']
						.reduce((sum, q) => sum + item[q].reduce((a,b)=>a+b,0), 0);

					$tbody.append(`
						<tr class="line-item">
							<td>${item.name}</td>
							<td>${item.gl_code}</td>
							${['q1','q2','q3','q4'].map(q =>
								expandedQuarters.includes(q)
									? item[q].map(v => `<td>${formatNumber(v)}</td>`).join('')
									: `<td colspan="3">${formatNumber(item[q].reduce((a,b)=>a+b,0))}</td>`
							).join('')}
							<td>${formatNumber(total)}</td>
						</tr>
					`);
				});
			}

			/* Sub-Heads */
			if (expandedHeads.includes(head.name) && head.sub_heads && head.sub_heads.length) {
				head.sub_heads
				.filter(sub =>
					matchesSearch(sub.name) ||
					(sub.items || []).some(i => matchesSearch(i.name, i.gl_code))
				)
				.forEach(sub => {

					const key = head.name + "__" + sub.name;

					const subTotal = ['q1','q2','q3','q4']
						.reduce((sum, q) => sum + sub[q].reduce((a,b)=>a+b,0), 0);

					$tbody.append(`
						<tr class="sub-head" data-sub="${key}">
							<td>${expandedSubHeads.includes(key) ? '▼' : '▶'} ${sub.name}</td>
							<td class="gl-empty">-</td>
							${['q1','q2','q3','q4'].map(q =>
								expandedQuarters.includes(q)
									? sub[q].map(v => `<td>${formatNumber(v)}</td>`).join('')
									: `<td colspan="3">${formatNumber(sub[q].reduce((a,b)=>a+b,0))}</td>`
							).join('')}
							<td class="text-blue">${formatNumber(subTotal)}</td>
						</tr>
					`);

					if (expandedSubHeads.includes(key) && sub.items && sub.items.length) {
						sub.items
						.filter(item => matchesSearch(item.name, item.gl_code))
						.forEach(item => {
							const total = ['q1','q2','q3','q4']
								.reduce((sum, q) => sum + item[q].reduce((a,b)=>a+b,0), 0);

							$tbody.append(`
								<tr class="line-item">
									<td>${item.name}</td>
									<td>${item.gl_code}</td>
									${['q1','q2','q3','q4'].map(q =>
										expandedQuarters.includes(q)
											? item[q].map(v => `<td>${formatNumber(v)}</td>`).join('')
											: `<td colspan="3">${formatNumber(item[q].reduce((a,b)=>a+b,0))}</td>`
									).join('')}
									<td>${formatNumber(total)}</td>
								</tr>
							`);
						});
					}
				});
			}
		});


		/* GRAND TOTAL */
		const grand = getGrandTotals();
		const $grandRow = $('<tr class="grand-total-row"></tr>');
		$grandRow.append(`<td colspan="2" style="text-align:left;">GRAND TOTAL</td>`);

		['q1','q2','q3','q4'].forEach(q => {
			if (expandedQuarters.includes(q)) {
				grand[q].forEach(v => $grandRow.append(`<td>${formatNumber(v)}</td>`));
			} else {
				$grandRow.append(`<td colspan="3">${formatNumber(grand[q].reduce((a,b)=>a+b,0))}</td>`);
			}
		});

		$grandRow.append(`<td>${formatNumber(grand.total)}</td>`);
		$tbody.append($grandRow);
		$table.append($tbody);


		/* EVENTS */
		$table.find('th.expandable').off('click').on('click', function () {
			const q = $(this).data('quarter');
			expandedQuarters = expandedQuarters.includes(q) ? expandedQuarters.filter(x=>x!==q) : [...expandedQuarters, q];
			$("#expand-quarters").prop("checked", expandedQuarters.length === 4);
			renderTable();
		});

		$table.find('.expense-head').off('click').on('click', function () {
			const headName = $(this).data('head');
			expandedHeads = expandedHeads.includes(headName) ? expandedHeads.filter(x=>x!==headName) : [...expandedHeads, headName];
			$("#expand-items").prop("checked", expandedHeads.length === expense_heads.length);
			renderTable();
		});

		$table.find('.sub-head').off('click').on('click', function () {
			const key = $(this).data('sub');
			expandedSubHeads = expandedSubHeads.includes(key) ? expandedSubHeads.filter(x=>x!==key) : [...expandedSubHeads, key];
			renderTable();
		});
	}

	/* CHECKBOX EVENTS */
	$("#expand-quarters").on("change", function() {
		expandedQuarters = this.checked ? ['q1','q2','q3','q4'] : [];
		renderTable();
	});

	$("#expand-items").on("change", function() {
		if (this.checked) {
			expandedHeads = expense_heads.map(h => h.name);
			expandedSubHeads = expense_heads.flatMap(h => (h.sub_heads || []).map(s => h.name + "__" + s.name));
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

