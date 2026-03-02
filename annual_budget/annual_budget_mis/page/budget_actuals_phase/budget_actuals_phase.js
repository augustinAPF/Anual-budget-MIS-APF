// frappe.pages['budget-actuals-phase'].on_page_load = function(wrapper) {
//     const style = `
//     <style>
//     #tables-container { 
//         margin: 20px; 
//         background-color: #ffffff; 
//         border-radius: 8px; 
//         padding: 8px; 
//     }

//     #controls-row {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         margin-bottom: 12px;
//         padding: 6px 10px;
//         background: #f7f9fb;
//         border: 1px solid #dcdcdc;
//         border-radius: 6px;
//     }

//     #global-search-box { 
//         width: 280px; 
//         padding: 7px 12px; 
//         border: 1px solid #aaa; 
//         border-radius: 6px; 
//         font-size: 13px;
//     }

//     .scroll-wrapper { 
//         border: 1px solid #ccc; 
//         border-radius: 6px; 
//         overflow-x: auto; 
//         overflow-y: auto; 
//         max-height: 70vh; 
//         background: #fff; 
//     }

//     table.university-table { 
//         min-width: 1200px; 
//         width: 100%; 
//         border-collapse: collapse; 
//         font-size: 13px; 
//     }

//     table.university-table th, 
//     table.university-table td {
//         border: 1px solid #ddd;
//         padding: 8px 10px;
//         white-space: nowrap;
//         vertical-align: middle;
//         text-align: center;
//         background:#fff !important;
//     }

//     table.university-table th:first-child,
//     table.university-table td:first-child { 
//         text-align: left !important; 
//     }

//     table.university-table thead tr.main-row th { 
//         background-color: #0076B6 !important; 
//         color: #fff !important; 
//         position: sticky; 
//         top: 0; 
//         z-index: 25; 
//     }

//     tr.expense-head { 
//         font-weight: 700; 
//         cursor: pointer; 
//     }

//     tr.expense-head:hover td {
//         background: #F4F9FD !important;
//     }

//     tr.sub-head { 
//         background-color: #FFF3E6 !important;
//         font-weight: 600; 
//         cursor: pointer;
//     }

//     tr.sub-head:hover td {
//         background-color: #FFEAD5 !important;
//     }

//     tr.line-item td:first-child { 
//         padding-left: 35px !important; 
//     }

//     tr.sub-head td:first-child { 
//         padding-left: 20px !important; 
//     }

//     .text-blue { 
//         color: #0076B6; 
//         font-weight: 600; 
//     }

//     tr.grand-total-row td {
//         background:#003B63 !important;
//         color:#fff !important;
//         font-weight:700 !important;
//     }

//     .card-row{
//         display:grid;
//         grid-template-columns: repeat(4, 1fr);
//         gap:14px;
//         margin:14px 20px;
//     }

//     .number-card{
//         background:#ffffff;
//         border:1px solid #dcdcdc;
//         border-radius:8px;
//         padding:14px 16px;
//         box-shadow:0 2px 6px rgba(0,0,0,.06);
//         transition:.15s ease;
//     }

//     .number-card:hover{
//         transform:translateY(-2px);
//         box-shadow:0 6px 14px rgba(0,0,0,.12);
//     }

//     .number-title{
//         font-size:12px;
//         font-weight:600;
//         color:#666;
//         text-transform:uppercase;
//         margin-bottom:6px;
//     }

//     .number-value{
//         font-size:20px;
//         font-weight:700;
//         color:#0076B6;
//     }

//     .number-card.grand{
//         border:2px solid #0076B6;
//         background:#F4F9FD;
//     }

//     .number-card.grand .number-value{
//         font-size:24px;
//         font-weight:800;
//     }
//     </style>
//     `;


//         $('head').append(style);
//             if (!$("#global-loader").length) {
//         $("body").append(`
//             <div id="global-loader" class="loader-overlay">
//                 <div class="loader-box">
//                     <img src="/files/apf.png" class="loader-logo">
//                     <div class="loader-text">Loading, please wait…</div>
//                 </div>
//             </div>
//         `);
//     }

//     /* Always hide on page load */
//     $("#global-loader").hide();
//     const Loader = {
//         show(message = "Loading, please wait…") {
//             const loader = $("#global-loader");
//             if (!loader.length) return;

//             loader.find(".loader-text").text(message);
//             loader.fadeIn(200);
//         },

//         hide() {
//             const loader = $("#global-loader");
//             if (!loader.length) return;

//             loader.fadeOut(200);
//         }
//     };
//     /* =====================================================
//        PAGE
//     =====================================================*/
//     let page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Budget vs Actuals Face Sheet',
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
                
//                     /* Full screen overlay – soft light black glass look */
//         #global-loader.loader-overlay {
//             position: fixed;
//             inset: 0;
//             width: 100vw;
//             height: 100vh;
//             background: rgba(18, 18, 18, 0.92); /* light black */
//             backdrop-filter: blur(6px);
//             display: none;
//             z-index: 999999;

//             /* Perfect center */
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }

//         /* Center container */
//         .loader-box {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             gap: 14px;
//         }

//         /* Rounded logo */
//         .loader-logo {
//             width: 90px;
//             height: 90px;
//             border-radius: 50%;
//             background: linear-gradient(145deg, #ffffff, #eaeaea);
//             padding: 14px;
//             object-fit: contain;
//             box-shadow: 
//                 0 10px 30px rgba(0, 0, 0, 0.35),
//                 0 0 0 4px rgba(255, 255, 255, 0.08);
//             animation: pulse 1.6s infinite ease-in-out;
//         }

//         /* Loader text */
//         .loader-text {
//             margin-top: 6px;
//             font-size: 14px;
//             color: #ffffff; /* white text */
//             font-weight: 600;
//             letter-spacing: 0.5px;
//             text-align: center;
//             opacity: 0.85;
//         }

//         /* Subtle loading dots animation (optional, looks premium) */
//         .loader-text::after {
//             content: "";
//             display: inline-block;
//             width: 1em;
//             animation: dots 1.5s infinite;
//         }

//         /* Pulse animation */
//         @keyframes pulse {
//             0% {
//                 transform: scale(1);
//                 opacity: 0.8;
//                 box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
//             }
//             50% {
//                 transform: scale(1.08);
//                 opacity: 1;
//                 box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.15);
//             }
//             100% {
//                 transform: scale(1);
//                 opacity: 0.8;
//                 box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
//             }
//         }

//         /* Loading dots animation */
//         @keyframes dots {
//             0%   { content: ""; }	
//             33%  { content: "."; }
//             66%  { content: ".."; }
//             100% { content: "..."; }
//         }
//     .kpi-row,
//     .kpi-bottom{
//         display:flex;
//         justify-content:space-between;
//         margin-top:8px;
//     }

//     .kpi-block{
//         text-align:left;
//     }

//     .kpi-label{
//         font-size:11px;
//         color:#777;
//         text-transform:uppercase;
//     }

//     .kpi-value{
//         font-size:14px;
//         font-weight:700;
//         color:#000;
//     }

//     .kpi-bottom{
//         margin-top:10px;
//         padding-top:8px;
//         border-top:1px solid #eee;
//     }

//     .number-card.sub{
//         background:#fafafa;
//         border-left:4px solid #ccc;
//     }

        
//     </style>`).appendTo("head");

//     function make_field() {
//         return $(`<div class="col-md-4 col-sm-12"></div>`).appendTo(filter_section);
//     }

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
//     function add_select_all_button(multiselect_control) {

//             multiselect_control.$wrapper.on("click", function () {

//                 setTimeout(() => {

//                     let dropdown = multiselect_control.$wrapper.find(".multiselect-list");

//                     if (!dropdown.length) return;

//                     // Prevent duplicate button
//                     if (dropdown.find(".select-all-btn").length) return;

//                     let select_all_btn = $(`
//                         <button type="button"
//                             class="btn btn-xs btn-default select-all-btn"
//                             style="margin-right: 5px;">
//                             Select All
//                         </button>
//                     `);

//                     select_all_btn.on("click", async function (e) {
//                         e.stopPropagation();

//                         let values = [];

//                         // If dynamic get_data exists
//                         if (multiselect_control.get_data) {
//                             let data = await multiselect_control.get_data();
//                             values = data.map(d => String(d.value));
//                         }
//                         // If static options
//                         else if (multiselect_control.df.options) {
//                             values = multiselect_control.df.options.map(o => 
//                                 typeof o === "object" ? String(o.value) : String(o)
//                             );
//                         }

//                         multiselect_control.set_value(values);
//                     });

//                     dropdown.find(".dropdown-footer").prepend(select_all_btn);

//                 }, 200);
//             });
//     }

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
//     let month_col = make_field();
//    // Get current month name
// let currentMonth = new Date().toLocaleString('default', { month: 'long' });

// let month_filter = frappe.ui.form.make_control({
//     parent: month_col,
//     df: {
//         label: "YTD Month",
//         fieldtype: "Select",
//         fieldname: "month",
//         options: [
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December"
//         ].join("\n"),
//         reqd: 1,
//         change() {
//             loadData();
//         }
//     },
//     render_input: true
// });

// // ✅ FORCE SET DEFAULT VALUE
// month_filter.set_value(currentMonth);


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
//                         // loadData();
//                 }
//             }
//         },
//         render_input: true
//     });
// add_select_all_button(unit_filter);

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
//                 // loadData();
//             }
//         },
//         render_input: true
//     });
// add_select_all_button(cost_center_filter);

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
//                 // loadData();
//             }
//         },
//         render_input: true
//     });
// add_select_all_button(location_code_filter);

// // 🔹 Add Select All inside dropdown
// // location_code_filter.$wrapper.on("click", function () {

// //     setTimeout(() => {

// //         let dropdown = location_code_filter.$wrapper.find(".multiselect-list");

// //         if (!dropdown.length) return;

// //         // Avoid duplicate button
// //         if (dropdown.find(".select-all-btn").length) return;

// //         let select_all_btn = $(`
// //             <button type="button"
// //                 class="btn btn-xs btn-default select-all-btn"
// //                 style="margin-right: 5px;">
// //                 Select All
// //             </button>
// //         `);

// //         select_all_btn.on("click", async function (e) {
// //             e.stopPropagation();

// //             let values = [];

// //             // If using get_data (dynamic data)
// //             if (location_code_filter.get_data) {
// //                 let data = await location_code_filter.get_data();
// //                 values = data.map(d => d.value);
// //             } 
// //             // If using static options
// //             else if (location_code_filter.df.options) {
// //                 values = location_code_filter.df.options;
// //             }

// //             location_code_filter.set_value(values);
// //         });

// //         // Add button before Clear All
// //         dropdown.find(".dropdown-footer").prepend(select_all_btn);

// //     }, 200);
// // });

//     let btn_col = make_field();

//     let load_button = frappe.ui.form.make_control({
//         parent: btn_col,
//         df: {
//             label: " ",
//             fieldtype: "Button",
//             fieldname: "load_button",
//             click() {
//                 loadData();
//             }
//         },
//         render_input: true
//     });

//     load_button.$input.addClass("btn-primary");
//     load_button.$input.text("Get Report");

//     // 🔥 Only for button
//     load_button.$wrapper.css("margin-top", "26px");

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
//                         value: String(d.value),
//                         description: "",
//                         erp_cost_center_value: String(d.erp_cost_center_value)

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
//                         description: "",
//                         erp_loc_value: String(d.erp_loc_value)
//                     }));

//                 location_code_filter.df.options =
//                     mergeSelectedOptions(location_code_filter, api_options);

//                 location_code_filter.refresh();
//             }
//         });
//     }
// // const container = $(`
// //     <div id="tables-container">
// //         <div class="card-row" id="cards-container"></div>
// //         <div id="controls-row">
// //             <input id="global-search-box" type="text"
// //                 placeholder="Search Expense / Sub Head / Item...">
// //         </div>
// //         <div class="scroll-wrapper">
// //             <table class="university-table" id="phase-table"></table>
// //         </div>

// //     </div>
// // `);
// frappe.require("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js", function () {
//     console.log("XLSX Loaded");
// });
// const container = $(`
//     <div id="tables-container">
//         <div class="card-row" id="cards-container"></div>

//         <div id="controls-row">
//             <input id="global-search-box" type="text"
//                 placeholder="Search Expense / Sub Head / Item...">
//             <button id="export-excel-btn">Export to Excel</button>
//         </div>

//         <div class="scroll-wrapper">
//             <table class="university-table" id="phase-table"></table>
//         </div>
//     </div>
// `);

// $(page.body).append(container);
// $(document).on('click', '#export-excel-btn', function () {
//     exportTableToExcel();
// });
// // function exportTableToExcel() {

// //     if (typeof XLSX === "undefined") {
// //         frappe.msgprint("Excel library not loaded yet.");
// //         return;
// //     }

// //     const table = document.getElementById("phase-table");

// //     if (!table || table.rows.length === 0) {
// //         frappe.msgprint("No data available to export.");
// //         return;
// //     }

// //     const wb = XLSX.utils.table_to_book(table, { sheet: "Expense Report" });
// //     XLSX.writeFile(wb, "Expense_Report.xlsx");
// // }
// function exportTableToExcel() {

//     if (typeof XLSX === "undefined") {
//         frappe.msgprint("Excel library not loaded.");
//         return;
//     }

//     let data = [];

//     // Header Row
//     data.push([
//         "Expense Head",
//         "Budget",
//         "Actuals",
//         "Util %",
//         "Variance"
//     ]);

//     let grand_budget = 0;
//     let grand_actuals = 0;

//     expense_heads.forEach(head => {

//         const headBudget = Number(head.ytd || 0);
//         const headActual = Number(head.total_posted_amt_ytd || 0);
//         const headVariance = headBudget - headActual;
//         const headPer = safePercentage(headBudget, headActual);

//         grand_budget += headBudget;
//         grand_actuals += headActual;

//         // Main Head Row
//         data.push([
//             head.name,
//             headBudget,
//             headActual,
//             headPer,
//             headVariance
//         ]);

//         // Sub Heads
//         (head.sub_heads || []).forEach(sub => {

//             const subBudget = Number(sub.ytd || 0);
//             const subActual = Number(sub.total_posted_amt_ytd || 0);
//             const subVariance = subBudget - subActual;
//             const subPer = safePercentage(subBudget, subActual);

//             data.push([
//                 "   " + sub.name,   // Indentation
//                 subBudget,
//                 subActual,
//                 subPer,
//                 subVariance
//             ]);

//             // Items inside Sub Head
//             (sub.items || []).forEach(item => {

//                 const budget = Number(item.ytd || 0);
//                 const actual = Number(item.total_posted_amt || 0);
//                 const variance = budget - actual;
//                 const per = safePercentage(budget, actual);

//                 data.push([
//                     "      " + item.name,   // More indentation
//                     budget,
//                     actual,
//                     per,
//                     variance
//                 ]);
//             });

//         });

//         // Items directly under Head
//         (head.items || []).forEach(item => {

//             const budget = Number(item.ytd || 0);
//             const actual = Number(item.total_posted_amt || 0);
//             const variance = budget - actual;
//             const per = safePercentage(budget, actual);

//             data.push([
//                 "   " + item.name,
//                 budget,
//                 actual,
//                 per,
//                 variance
//             ]);
//         });

//     });

//     // Grand Total Row
//     const grandVariance = grand_budget - grand_actuals;
//     const grandPer = safePercentage(grand_budget, grand_actuals);

//     data.push([
//         "GRAND TOTAL",
//         grand_budget,
//         grand_actuals,
//         grandPer,
//         grandVariance
//     ]);

//     // Create worksheet
//     const ws = XLSX.utils.aoa_to_sheet(data);

//     // Auto column width
//     ws["!cols"] = [
//         { wch: 40 },
//         { wch: 15 },
//         { wch: 15 },
//         { wch: 10 },
//         { wch: 15 }
//     ];

//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Expense Report");

//     XLSX.writeFile(wb, "Expense_Report.xlsx");
// }
//     /* =====================================================
//        STATE
//     =====================================================*/
//     let expense_heads = [];
//     let expandedHeads = [];
//     let expandedSubHeads = [];
//     let searchText = "";

//     const formatNumber = n =>
//         (Number(n) || 0).toLocaleString('en-IN', {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//         });

//     function matchesSearch(...values) {
//         return values.some(v =>
//             String(v || "").toLowerCase().includes(searchText.toLowerCase())
//         );
//     }
// /* ------------------------------------------------
//    HELPER — GET SELECTED WITH EXTRA KEY
// --------------------------------------------------*/
// function getSelectedWithKey(control, key) {
//     return (control.get_value() || [])
//         .map(val => {
//             let option = control.df.options.find(
//                 o => String(o.value) === String(val)
//             );
//             return option?.[key];
//         })
//         .filter(Boolean);
// }

// function loadData() {

//     let financial_year = fiscal_year_filter.get_value();
//     let month = month_filter.get_value();
//     // let unit = (unit_filter.get_value() || [])[0] || null;
//     // let location_code =getSelectedWithKey(location_code_filter, "value")[18] || null;

//     // let cost_center =getSelectedWithKey(cost_center_filter, "value")[0] || null;
//     let erp_cost_center_value =getSelectedWithKey(cost_center_filter, "erp_cost_center_value")[0] || null;
//     let erp_loc_value =getSelectedWithKey(location_code_filter, "erp_loc_value")[0] || null;

//     let unit = (unit_filter.get_value() || []).join(",") || null;
//     let location_code = (getSelectedWithKey(location_code_filter, "value") || []).join(",") || null;
//     let cost_center = (getSelectedWithKey(cost_center_filter, "value") || []).join(",") || null;
//     // let erp_cost_center_value = (getSelectedWithKey(cost_center_filter, "erp_cost_center_value") || []).join(",") || null;
//     // let erp_loc_value = (getSelectedWithKey(location_code_filter, "erp_loc_value") || []).join(",") || null;

//     console.log(erp_cost_center_value,"erp_cost_center_value");
//     console.log(cost_center,"cost_center_value")
//     console.log(location_code,"loc_value")

//     let missing = [];
//     if (!financial_year) missing.push("Financial Year");
//     if (!month) missing.push("Month");
//     if (!unit) missing.push("Unit");
//     // if (!erp_cost_center_value) missing.push("Cost Center");

//     if (missing.length) {
//         console.warn("⚠ Missing Filters:", missing.join(", "));
//         return;
//     }

//     Loader.show("We're crafting your report with care");

//     frappe.call({
//         method: "annual_budget.api.phase_sheet.get_combined_actuals",
//         args: {
//             financial_year,
//             month,
//             unit,
//             cost_center,
//             location_code,
//             erp_loc_value,
//             erp_cost_center_value,
            
//         }
//     })
//     .done(function(r) {

//         // Safe API parsing
//         expense_heads = Array.isArray(r.message)
//             ? r.message
//             : (r.message?.message || []);

//         expandedHeads = [];
//         expandedSubHeads = [];
//         console.log(r,"API response")
//         renderTable();

//     })
//     .fail(function(err) {

//         console.error("API Error:", err);

//         frappe.msgprint({
//             title: "Error",
//             message: "Failed to load data. Please try again.",
//             indicator: "red"
//         });

//     })
//     .always(function() {
//         Loader.hide();
//     });
// }


// function safePercentage(budget, actual) {
//     if (!budget || budget === 0) return "0.00";
//     return ((actual / budget) * 100).toFixed(2);
// }


// function renderTable() {

//     renderCards(expense_heads);

//     const $table = $('#phase-table');
//     $table.html('');

//     if (!expense_heads || !expense_heads.length) {
//         $table.append(`<tr><td colspan="5">No Data Found</td></tr>`);
//         return;
//     }

//     $table.append(`
//         <thead>
//             <tr class="main-row">
//                 <th>Expense Head</th>
//                 <th>Budget</th>
//                 <th>Actuals</th>
//                 <th>Util %</th>
//                 <th>Variance</th>
//             </tr>
//         </thead>
//     `);

//     const $tbody = $('<tbody></tbody>');

//     let grand_budget = 0;
//     let grand_actuals = 0;

//     expense_heads.forEach(head => {

//         if (
//             searchText &&
//             !matchesSearch(head.name) &&
//             !(head.items || []).some(i => matchesSearch(i.name)) &&
//             !(head.sub_heads || []).some(s =>
//                 matchesSearch(s.name) ||
//                 (s.items || []).some(i => matchesSearch(i.name))
//             )
//         ) return;

//         const headBudget = Number(head.ytd || 0);
//         const headActual = Number(head.total_posted_amt_ytd || 0);
//         const headTotal = headBudget - headActual;
//         const headPer = safePercentage(headBudget, headActual);

//         grand_budget += headBudget;
//         grand_actuals += headActual;

//         $tbody.append(`
//             <tr class="expense-head" data-head="${head.name}">
//                 <td>
//                     ${(head.items?.length || head.sub_heads?.length)
//                         ? (expandedHeads.includes(head.name) ? '▼' : '▶')
//                         : ''
//                     }
//                     ${head.name}
//                 </td>
//                 <td>${formatNumber(headBudget)}</td>
//                 <td>${formatNumber(headActual)}</td>
//                 <td class="text-blue">${headPer} %</td>
//                 <td class="text-blue">${formatNumber(headTotal)}</td>
//             </tr>
//         `);

//         /* ===== Expand Head ===== */
//         if (expandedHeads.includes(head.name)) {

//             (head.items || []).forEach(item => {

//                 if (searchText && !matchesSearch(item.name)) return;

//                 const budget = Number(item.ytd || 0);
//                 const actual = Number(item.total_posted_amt || 0);
//                 const total = budget - actual;
//                 const total_per = safePercentage(budget, actual);

//                 $tbody.append(`
//                     <tr class="line-item">
//                         <td style="padding-left:35px">${item.name}</td>
//                         <td>${formatNumber(budget)}</td>
//                         <td>${formatNumber(actual)}</td>
//                         <td>${total_per} %</td>
//                         <td>${formatNumber(total)}</td>
//                     </tr>
//                 `);
//             });

//             (head.sub_heads || []).forEach(sub => {

//                 const key = head.name + "__" + sub.name;

//                 const subBudget = Number(sub.ytd || 0);
//                 const subActual = Number(sub.total_posted_amt_ytd || 0);
//                 const subTotal = subBudget - subActual;
//                 const subTotal_per = safePercentage(subBudget, subActual);

//                 $tbody.append(`
//                     <tr class="sub-head" data-sub="${key}">
//                         <td style="padding-left:20px">
//                             ${(sub.items?.length)
//                                 ? (expandedSubHeads.includes(key) ? '▼' : '▶')
//                                 : ''
//                             }
//                             ${sub.name}
//                         </td>
//                         <td>${formatNumber(subBudget)}</td>
//                         <td>${formatNumber(subActual)}</td>
//                         <td class="text-blue">${subTotal_per} %</td>
//                         <td class="text-blue">${formatNumber(subTotal)}</td>
//                     </tr>
//                 `);

//                 if (expandedSubHeads.includes(key)) {

//                     (sub.items || []).forEach(item => {

//                         const budget = Number(item.ytd || 0);
//                         const actual = Number(item.total_posted_amt || 0);
//                         const total = budget - actual;
//                         const total_per1 = safePercentage(budget, actual);

//                         $tbody.append(`
//                             <tr class="line-item">
//                                 <td style="padding-left:55px">${item.name}</td>
//                                 <td>${formatNumber(budget)}</td>
//                                 <td>${formatNumber(actual)}</td>
//                                 <td>${total_per1} %</td>
//                                 <td>${formatNumber(total)}</td>
//                             </tr>
//                         `);
//                     });
//                 }
//             });
//         }
//     });

//     const grand_total = grand_budget - grand_actuals;
//     const grandPer = safePercentage(grand_budget, grand_actuals);

//     $tbody.append(`
//         <tr class="grand-total-row">
//             <td>GRAND TOTAL</td>
//             <td>${formatNumber(grand_budget)}</td>
//             <td>${formatNumber(grand_actuals)}</td>
//             <td>${grandPer} %</td>
//             <td>${formatNumber(grand_total)}</td>
//         </tr>
//     `);

//     $table.append($tbody);

//     /* Toggle Head */
//     $('.expense-head').off('click').on('click', function () {

//         const name = $(this).data('head');

//         expandedHeads = expandedHeads.includes(name)
//             ? expandedHeads.filter(x => x !== name)
//             : [...expandedHeads, name];

//         renderTable();
//     });

//     /* Toggle Sub Head */
//     $('.sub-head').off('click').on('click', function () {

//         const key = $(this).data('sub');

//         expandedSubHeads = expandedSubHeads.includes(key)
//             ? expandedSubHeads.filter(x => x !== key)
//             : [...expandedSubHeads, key];

//         renderTable();
//     });
// }

// function renderCards(data){

//     const cards_container = $('#cards-container');
//     cards_container.empty();

//     let grand_budget = 0;
//     let grand_actual = 0;
//     let cards_html = "";

//     /* ===== Grand Total Calculation ===== */
//     data.forEach(head => {
//         grand_budget += Number(head.ytd || 0);
//         grand_actual += Number(head.total_posted_amt_ytd || 0);
//     });

//     const grand_variance = grand_budget - grand_actual;

//     /* ===== GRAND TOTAL CARD ===== */
//     cards_html += createCard("Grand Total", grand_budget, grand_actual, grand_variance, true);

//     /* ===== Heads + Sub Heads ===== */
//     data.forEach(head => {

//         const headBudget = Number(head.ytd || 0);
//         const headActual = Number(head.total_posted_amt_ytd || 0);
//         const headVariance = headBudget - headActual;

//         cards_html += createCard(head.name, headBudget, headActual, headVariance);

//         (head.sub_heads || []).forEach(sub => {

//             const subBudget = Number(sub.ytd || 0);
//             const subActual = Number(sub.total_posted_amt_ytd || 0);
//             const subVariance = subBudget - subActual;

//             cards_html += createCard(sub.name, subBudget, subActual, subVariance, false, true);
//         });
//     });

//     cards_container.append(cards_html);
// }


// function createCard(title, budget, actual, variance, isGrand = false, isSub = false){

//     const utilization = budget > 0 
//         ? ((actual / budget) * 100).toFixed(2) 
//         : "0.00";

//     return `
//         <div class="number-card ${isGrand ? 'grand' : ''} ${isSub ? 'sub' : ''}">
            
//             <div class="number-title">${title}</div>

//             <div class="kpi-row">
//                 <div class="kpi-block">
//                     <div class="kpi-label">Budget</div>
//                     <div class="kpi-value">${formatNumber(budget)}</div>
//                 </div>

//                 <div class="kpi-block">
//                     <div class="kpi-label">Actual</div>
//                     <div class="kpi-value">${formatNumber(actual)}</div>
//                 </div>
//             </div>

//             <div class="kpi-bottom">
//                 <div class="kpi-block">
//                     <div class="kpi-label">Variance</div>
//                     <div class="kpi-value">${formatNumber(variance)}</div>
//                 </div>

//                 <div class="kpi-block">
//                     <div class="kpi-label">Util %</div>
//                     <div class="kpi-value">${utilization} %</div>
//                 </div>
//             </div>

//         </div>
//     `;
// }



// };














// frappe.pages['budget-actuals-phase'].on_page_load = function(wrapper) {
//     const style = `
//     <style>
//     #tables-container { 
//         margin: 20px; 
//         background-color: #ffffff; 
//         border-radius: 8px; 
//         padding: 8px; 
//     }

//     #controls-row {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         margin-bottom: 12px;
//         padding: 6px 10px;
//         background: #f7f9fb;
//         border: 1px solid #dcdcdc;
//         border-radius: 6px;
//     }

//     #global-search-box { 
//         width: 280px; 
//         padding: 7px 12px; 
//         border: 1px solid #aaa; 
//         border-radius: 6px; 
//         font-size: 13px;
//     }

//     .scroll-wrapper { 
//         border: 1px solid #ccc; 
//         border-radius: 6px; 
//         overflow-x: auto; 
//         overflow-y: auto; 
//         max-height: 70vh; 
//         background: #fff; 
//     }

//     table.university-table { 
//         min-width: 1200px; 
//         width: 100%; 
//         border-collapse: collapse; 
//         font-size: 13px; 
//     }

//     table.university-table th, 
//     table.university-table td {
//         border: 1px solid #ddd;
//         padding: 8px 10px;
//         white-space: nowrap;
//         vertical-align: middle;
//         text-align: center;
//         background:#fff !important;
//     }

//     table.university-table th:first-child,
//     table.university-table td:first-child { 
//         text-align: left !important; 
//     }

//     table.university-table thead tr.main-row th { 
//         background-color: #0076B6 !important; 
//         color: #fff !important; 
//         position: sticky; 
//         top: 0; 
//         z-index: 25; 
//     }

//     tr.expense-head { 
//         font-weight: 700; 
//         cursor: pointer; 
//     }

//     tr.expense-head:hover td {
//         background: #F4F9FD !important;
//     }

//     tr.sub-head { 
//         background-color: #FFF3E6 !important;
//         font-weight: 600; 
//         cursor: pointer;
//     }

//     tr.sub-head:hover td {
//         background-color: #FFEAD5 !important;
//     }

//     tr.line-item td:first-child { 
//         padding-left: 35px !important; 
//     }

//     tr.sub-head td:first-child { 
//         padding-left: 20px !important; 
//     }

//     .text-blue { 
//         color: #0076B6; 
//         font-weight: 600; 
//     }

//     tr.grand-total-row td {
//         background:#003B63 !important;
//         color:#fff !important;
//         font-weight:700 !important;
//     }

//     .card-row{
//         display:grid;
//         grid-template-columns: repeat(4, 1fr);
//         gap:14px;
//         margin:14px 20px;
//     }

//     .number-card{
//         background:#ffffff;
//         border:1px solid #dcdcdc;
//         border-radius:8px;
//         padding:14px 16px;
//         box-shadow:0 2px 6px rgba(0,0,0,.06);
//         transition:.15s ease;
//     }

//     .number-card:hover{
//         transform:translateY(-2px);
//         box-shadow:0 6px 14px rgba(0,0,0,.12);
//     }

//     .number-title{
//         font-size:12px;
//         font-weight:600;
//         color:#666;
//         text-transform:uppercase;
//         margin-bottom:6px;
//     }

//     .number-value{
//         font-size:20px;
//         font-weight:700;
//         color:#0076B6;
//     }

//     .number-card.grand{
//         border:2px solid #0076B6;
//         background:#F4F9FD;
//     }

//     .number-card.grand .number-value{
//         font-size:24px;
//         font-weight:800;
//     }
//     </style>
//     `;

//     $('head').append(style);

//     if (!$("#global-loader").length) {
//         $("body").append(`
//             <div id="global-loader" class="loader-overlay">
//                 <div class="loader-box">
//                     <img src="/files/apf.png" class="loader-logo">
//                     <div class="loader-text">Loading, please wait…</div>
//                 </div>
//             </div>
//         `);
//     }

//     /* Always hide on page load */
//     $("#global-loader").hide();

//     const Loader = {
//         show(message = "Loading, please wait…") {
//             const loader = $("#global-loader");
//             if (!loader.length) return;

//             loader.find(".loader-text").text(message);
//             loader.fadeIn(200);
//         },

//         hide() {
//             const loader = $("#global-loader");
//             if (!loader.length) return;

//             loader.fadeOut(200);
//         }
//     };

//     /* =====================================================
//        PAGE
//     =====================================================*/
//     let page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Budget vs Actuals Face Sheet',
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
                
//         /* Full screen overlay – soft light black glass look */
//         #global-loader.loader-overlay {
//             position: fixed;
//             inset: 0;
//             width: 100vw;
//             height: 100vh;
//             background: rgba(18, 18, 18, 0.92);
//             backdrop-filter: blur(6px);
//             display: none;
//             z-index: 999999;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }

//         .loader-box {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             gap: 14px;
//         }

//         .loader-logo {
//             width: 90px;
//             height: 90px;
//             border-radius: 50%;
//             background: linear-gradient(145deg, #ffffff, #eaeaea);
//             padding: 14px;
//             object-fit: contain;
//             box-shadow: 
//                 0 10px 30px rgba(0, 0, 0, 0.35),
//                 0 0 0 4px rgba(255, 255, 255, 0.08);
//             animation: pulse 1.6s infinite ease-in-out;
//         }

//         .loader-text {
//             margin-top: 6px;
//             font-size: 14px;
//             color: #ffffff;
//             font-weight: 600;
//             letter-spacing: 0.5px;
//             text-align: center;
//             opacity: 0.85;
//         }

//         .loader-text::after {
//             content: "";
//             display: inline-block;
//             width: 1em;
//             animation: dots 1.5s infinite;
//         }

//         @keyframes pulse {
//             0% {
//                 transform: scale(1);
//                 opacity: 0.8;
//                 box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
//             }
//             50% {
//                 transform: scale(1.08);
//                 opacity: 1;
//                 box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.15);
//             }
//             100% {
//                 transform: scale(1);
//                 opacity: 0.8;
//                 box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
//             }
//         }

//         @keyframes dots {
//             0%   { content: ""; }	
//             33%  { content: "."; }
//             66%  { content: ".."; }
//             100% { content: "..."; }
//         }

//         .kpi-row,
//         .kpi-bottom{
//             display:flex;
//             justify-content:space-between;
//             margin-top:8px;
//         }

//         .kpi-block{
//             text-align:left;
//         }

//         .kpi-label{
//             font-size:11px;
//             color:#777;
//             text-transform:uppercase;
//         }

//         .kpi-value{
//             font-size:14px;
//             font-weight:700;
//             color:#000;
//         }

//         .kpi-bottom{
//             margin-top:10px;
//             padding-top:8px;
//             border-top:1px solid #eee;
//         }

//         .number-card.sub{
//             background:#fafafa;
//             border-left:4px solid #ccc;
//         }
//     </style>`).appendTo("head");

//     function make_field() {
//         return $(`<div class="col-md-4 col-sm-12"></div>`).appendTo(filter_section);
//     }

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

//     function add_select_all_button(multiselect_control) {
//         multiselect_control.$wrapper.on("click", function () {
//             setTimeout(() => {
//                 let dropdown = multiselect_control.$wrapper.find(".multiselect-list");

//                 if (!dropdown.length) return;

//                 if (dropdown.find(".select-all-btn").length) return;

//                 let select_all_btn = $(`
//                     <button type="button"
//                         class="btn btn-xs btn-default select-all-btn"
//                         style="margin-right: 5px;">
//                         Select All
//                     </button>
//                 `);

//                 select_all_btn.on("click", async function (e) {
//                     e.stopPropagation();

//                     let values = [];

//                     if (multiselect_control.get_data) {
//                         let data = await multiselect_control.get_data();
//                         values = data.map(d => String(d.value));
//                     }
//                     else if (multiselect_control.df.options) {
//                         values = multiselect_control.df.options.map(o => 
//                             typeof o === "object" ? String(o.value) : String(o)
//                         );
//                     }

//                     multiselect_control.set_value(values);
//                 });

//                 dropdown.find(".dropdown-footer").prepend(select_all_btn);
//             }, 200);
//         });
//     }

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

//     let month_col = make_field();
//     let currentMonth = new Date().toLocaleString('default', { month: 'long' });

//     let month_filter = frappe.ui.form.make_control({
//         parent: month_col,
//         df: {
//             label: "YTD Month",
//             fieldtype: "Select",
//             fieldname: "month",
//             options: [
//                 "January",
//                 "February",
//                 "March",
//                 "April",
//                 "May",
//                 "June",
//                 "July",
//                 "August",
//                 "September",
//                 "October",
//                 "November",
//                 "December"
//             ].join("\n"),
//             reqd: 1,
//             change() {
//                 loadData();
//             }
//         },
//         render_input: true
//     });

//     month_filter.set_value(currentMonth);

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
//                 }
//             }
//         },
//         render_input: true
//     });
//     add_select_all_button(unit_filter);

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
//                 // loadData();
//             }
//         },
//         render_input: true
//     });
//     add_select_all_button(cost_center_filter);

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
//                 // loadData();
//             }
//         },
//         render_input: true
//     });
//     add_select_all_button(location_code_filter);

//     let btn_col = make_field();

//     let load_button = frappe.ui.form.make_control({
//         parent: btn_col,
//         df: {
//             label: " ",
//             fieldtype: "Button",
//             fieldname: "load_button",
//             click() {
//                 loadData();
//             }
//         },
//         render_input: true
//     });

//     // ────────────────────────────────────────
//     // FIXED: $input doesn't exist on button control
//     // Use $wrapper.find('button') instead
//     // ────────────────────────────────────────
//     load_button.$wrapper.find('button').addClass("btn-primary");
//     load_button.$wrapper.find('button').text("Get Report");

//     load_button.$wrapper.css("margin-top", "26px");

//     /* ------------------------------------------------
//        LOAD COST CENTERS
//     --------------------------------------------------*/
//     function loadCostCenters(units) {
//         cost_center_filter.set_value([]);

//         frappe.call({
//             method: "annual_budget.api.filter_options.get_cost_centers_by_set_id",
//             args: { units: units.join(",") },
//             callback(r) {
//                 let api_options = (r.message?.data || [])
//                     .filter(d => d.value)
//                     .map(d => ({
//                         label: d.label,
//                         value: String(d.value),
//                         description: "",
//                         erp_cost_center_value: String(d.erp_cost_center_value)
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
//         location_code_filter.set_value([]);

//         frappe.call({
//             method: "annual_budget.api.filter_options.get_location_codes_by_unit",
//             args: { unit: units.join(",") },
//             callback(r) {
//                 let api_options = (r.message?.data || [])
//                     .filter(d => d.value)
//                     .map(d => ({
//                         label: d.label,
//                         value: String(d.value),
//                         description: "",
//                         erp_loc_value: String(d.erp_loc_value)
//                     }));

//                 location_code_filter.df.options =
//                     mergeSelectedOptions(location_code_filter, api_options);

//                 location_code_filter.refresh();
//             }
//         });
//     }

//     frappe.require("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js", function () {
//         console.log("XLSX Loaded");
//     });

//     const container = $(`
//         <div id="tables-container">
//             <div class="card-row" id="cards-container"></div>
//             <div id="controls-row">
//                 <input id="global-search-box" type="text"
//                     placeholder="Search Expense / Sub Head / Item...">
//                 <button id="export-excel-btn">Export to Excel</button>
//             </div>
//             <div class="scroll-wrapper">
//                 <table class="university-table" id="phase-table"></table>
//             </div>
//         </div>
//     `);

//     $(page.body).append(container);

//     $(document).on('click', '#export-excel-btn', function () {
//         exportTableToExcel();
//     });

//     function exportTableToExcel() {
//         if (typeof XLSX === "undefined") {
//             frappe.msgprint("Excel library not loaded.");
//             return;
//         }

//         let data = [];

//         data.push([
//             "Expense Items",
//             "Budget",
//             "Actuals",
//             "Util %",
//             "Variance"
//         ]);

//         let grand_budget = 0;
//         let grand_actuals = 0;

//         expense_heads.forEach(head => {
//             const headBudget = Number(head.ytd || 0);
//             const headActual = Number(head.total_posted_amt_ytd || 0);
//             const headVariance = headBudget - headActual;
//             const headPer = safePercentage(headBudget, headActual);

//             grand_budget += headBudget;
//             grand_actuals += headActual;

//             data.push([
//                 head.name,
//                 headBudget,
//                 headActual,
//                 headPer,
//                 headVariance
//             ]);

//             (head.sub_heads || []).forEach(sub => {
//                 const subBudget = Number(sub.ytd || 0);
//                 const subActual = Number(sub.total_posted_amt_ytd || 0);
//                 const subVariance = subBudget - subActual;
//                 const subPer = safePercentage(subBudget, subActual);

//                 data.push([
//                     "   " + sub.name,
//                     subBudget,
//                     subActual,
//                     subPer,
//                     subVariance
//                 ]);

//                 (sub.items || []).forEach(item => {
//                     const budget = Number(item.ytd || 0);
//                     const actual = Number(item.total_posted_amt || 0);
//                     const variance = budget - actual;
//                     const per = safePercentage(budget, actual);

//                     data.push([
//                         "      " + item.name,
//                         budget,
//                         actual,
//                         per,
//                         variance
//                     ]);
//                 });
//             });

//             (head.items || []).forEach(item => {
//                 const budget = Number(item.ytd || 0);
//                 const actual = Number(item.total_posted_amt || 0);
//                 const variance = budget - actual;
//                 const per = safePercentage(budget, actual);

//                 data.push([
//                     "   " + item.name,
//                     budget,
//                     actual,
//                     per,
//                     variance
//                 ]);
//             });
//         });

//         const grandVariance = grand_budget - grand_actuals;
//         const grandPer = safePercentage(grand_budget, grand_actuals);

//         data.push([
//             "GRAND TOTAL",
//             grand_budget,
//             grand_actuals,
//             grandPer,
//             grandVariance
//         ]);

//         const ws = XLSX.utils.aoa_to_sheet(data);

//         ws["!cols"] = [
//             { wch: 40 },
//             { wch: 15 },
//             { wch: 15 },
//             { wch: 10 },
//             { wch: 15 }
//         ];

//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Expense Report");

//         XLSX.writeFile(wb, "Expense_Report.xlsx");
//     }

//     /* =====================================================
//        STATE
//     =====================================================*/
//     let expense_heads = [];
//     let expandedHeads = [];
//     let expandedSubHeads = [];
//     let searchText = "";

//     const formatNumber = n =>
//         (Number(n) || 0).toLocaleString('en-IN', {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//         });

//     function matchesSearch(...values) {
//         return values.some(v =>
//             String(v || "").toLowerCase().includes(searchText.toLowerCase())
//         );
//     }

//     /* ------------------------------------------------
//        HELPER — GET SELECTED WITH EXTRA KEY
//     --------------------------------------------------*/
//     function getSelectedWithKey(control, key) {
//         if (!control || !control.get_value) return [];
//         return (control.get_value() || [])
//             .map(val => {
//                 let option = (control.df?.options || []).find(
//                     o => String(o?.value) === String(val)
//                 );
//                 return option?.[key] || null;
//             })
//             .filter(Boolean);
//     }

//     function loadData() {
//         let financial_year = fiscal_year_filter.get_value();
//         let month = month_filter.get_value();

//         // ────────────────────────────────────────
//         // FIXED: safe array handling + no [0]
//         // ────────────────────────────────────────
//         let unit = (unit_filter.get_value() || []).join(",") || null;
//         let location_code = (getSelectedWithKey(location_code_filter, "value") || []).join(",") || null;
//         let cost_center = (getSelectedWithKey(cost_center_filter, "value") || []).join(",") || null;
//         let erp_cost_center_value = (getSelectedWithKey(cost_center_filter, "erp_cost_center_value") || []).join(",") || null;
//         let erp_loc_value = (getSelectedWithKey(location_code_filter, "erp_loc_value") || []).join(",") || null;

//         console.log(erp_cost_center_value, "erp_cost_center_value");
//         console.log(cost_center, "cost_center_value");
//         console.log(location_code, "loc_value");

//         let missing = [];
//         if (!financial_year) missing.push("Financial Year");
//         if (!month) missing.push("Month");
//         if (!unit) missing.push("Unit");

//         if (missing.length) {
//             console.warn("⚠ Missing Filters:", missing.join(", "));
//             return;
//         }

//         Loader.show("We're crafting your report with care");

//         frappe.call({
//             method: "annual_budget.api.phase_sheet.get_combined_actuals",
//             args: {
//                 financial_year,
//                 month,
//                 unit,
//                 cost_center,
//                 location_code,
//                 erp_loc_value,
//                 erp_cost_center_value,
//             }
//         })
//         .done(function(r) {
//             expense_heads = Array.isArray(r.message)
//                 ? r.message
//                 : (r.message?.message || []);

//             expandedHeads = [];
//             expandedSubHeads = [];
//             console.log(r, "API response");
//             renderTable();
//         })
//         .fail(function(err) {
//             console.error("API Error:", err);
//             frappe.msgprint({
//                 title: "Error",
//                 message: "Failed to load data. Please try again.",
//                 indicator: "red"
//             });
//         })
//         .always(function() {
//             Loader.hide();
//         });
//     }

//     function safePercentage(budget, actual) {
//         if (!budget || budget === 0) return "0.00";
//         return ((actual / budget) * 100).toFixed(2);
//     }

//     function renderTable() {
//         renderCards(expense_heads);

//         const $table = $('#phase-table');
//         $table.html('');

//         if (!expense_heads || !expense_heads.length) {
//             $table.append(`<tr><td colspan="5">No Data Found</td></tr>`);
//             return;
//         }

//         $table.append(`
//             <thead>
//                 <tr class="main-row">
//                     <th>Expense Head</th>
//                     <th>Budget</th>
//                     <th>Actuals</th>
//                     <th>Util %</th>
//                     <th>Variance</th>
//                 </tr>
//             </thead>
//         `);

//         const $tbody = $('<tbody></tbody>');

//         let grand_budget = 0;
//         let grand_actuals = 0;

//         expense_heads.forEach(head => {
//             if (
//                 searchText &&
//                 !matchesSearch(head.name) &&
//                 !(head.items || []).some(i => matchesSearch(i.name)) &&
//                 !(head.sub_heads || []).some(s =>
//                     matchesSearch(s.name) ||
//                     (s.items || []).some(i => matchesSearch(i.name))
//                 )
//             ) return;

//             const headBudget = Number(head.ytd || 0);
//             const headActual = Number(head.total_posted_amt_ytd || 0);
//             const headTotal = headBudget - headActual;
//             const headPer = safePercentage(headBudget, headActual);

//             grand_budget += headBudget;
//             grand_actuals += headActual;

//             $tbody.append(`
//                 <tr class="expense-head" data-head="${head.name}">
//                     <td>
//                         ${(head.items?.length || head.sub_heads?.length)
//                             ? (expandedHeads.includes(head.name) ? '▼' : '▶')
//                             : ''
//                         }
//                         ${head.name}
//                     </td>
//                     <td>${formatNumber(headBudget)}</td>
//                     <td>${formatNumber(headActual)}</td>
//                     <td class="text-blue">${headPer} %</td>
//                     <td class="text-blue">${formatNumber(headTotal)}</td>
//                 </tr>
//             `);

//             if (expandedHeads.includes(head.name)) {
//                 (head.items || []).forEach(item => {
//                     if (searchText && !matchesSearch(item.name)) return;

//                     const budget = Number(item.ytd || 0);
//                     const actual = Number(item.total_posted_amt || 0);
//                     const total = budget - actual;
//                     const total_per = safePercentage(budget, actual);

//                     $tbody.append(`
//                         <tr class="line-item">
//                             <td style="padding-left:35px">${item.name}</td>
//                             <td>${formatNumber(budget)}</td>
//                             <td>${formatNumber(actual)}</td>
//                             <td>${total_per} %</td>
//                             <td>${formatNumber(total)}</td>
//                         </tr>
//                     `);
//                 });

//                 (head.sub_heads || []).forEach(sub => {
//                     const key = head.name + "__" + sub.name;

//                     const subBudget = Number(sub.ytd || 0);
//                     const subActual = Number(sub.total_posted_amt_ytd || 0);
//                     const subTotal = subBudget - subActual;
//                     const subTotal_per = safePercentage(subBudget, subActual);

//                     $tbody.append(`
//                         <tr class="sub-head" data-sub="${key}">
//                             <td style="padding-left:20px">
//                                 ${(sub.items?.length)
//                                     ? (expandedSubHeads.includes(key) ? '▼' : '▶')
//                                     : ''
//                                 }
//                                 ${sub.name}
//                             </td>
//                             <td>${formatNumber(subBudget)}</td>
//                             <td>${formatNumber(subActual)}</td>
//                             <td class="text-blue">${subTotal_per} %</td>
//                             <td class="text-blue">${formatNumber(subTotal)}</td>
//                         </tr>
//                     `);

//                     if (expandedSubHeads.includes(key)) {
//                         (sub.items || []).forEach(item => {
//                             const budget = Number(item.ytd || 0);
//                             const actual = Number(item.total_posted_amt || 0);
//                             const total = budget - actual;
//                             const total_per1 = safePercentage(budget, actual);

//                             $tbody.append(`
//                                 <tr class="line-item">
//                                     <td style="padding-left:55px">${item.name}</td>
//                                     <td>${formatNumber(budget)}</td>
//                                     <td>${formatNumber(actual)}</td>
//                                     <td>${total_per1} %</td>
//                                     <td>${formatNumber(total)}</td>
//                                 </tr>
//                             `);
//                         });
//                     }
//                 });
//             }
//         });

//         const grand_total = grand_budget - grand_actuals;
//         const grandPer = safePercentage(grand_budget, grand_actuals);

//         $tbody.append(`
//             <tr class="grand-total-row">
//                 <td>GRAND TOTAL</td>
//                 <td>${formatNumber(grand_budget)}</td>
//                 <td>${formatNumber(grand_actuals)}</td>
//                 <td>${grandPer} %</td>
//                 <td>${formatNumber(grand_total)}</td>
//             </tr>
//         `);

//         $table.append($tbody);

//         $('.expense-head').off('click').on('click', function () {
//             const name = $(this).data('head');

//             expandedHeads = expandedHeads.includes(name)
//                 ? expandedHeads.filter(x => x !== name)
//                 : [...expandedHeads, name];

//             renderTable();
//         });

//         $('.sub-head').off('click').on('click', function () {
//             const key = $(this).data('sub');

//             expandedSubHeads = expandedSubHeads.includes(key)
//                 ? expandedSubHeads.filter(x => x !== key)
//                 : [...expandedSubHeads, key];

//             renderTable();
//         });
//     }

//     function renderCards(data){
//         const cards_container = $('#cards-container');
//         cards_container.empty();

//         let grand_budget = 0;
//         let grand_actual = 0;
//         let cards_html = "";

//         data.forEach(head => {
//             grand_budget += Number(head.ytd || 0);
//             grand_actual += Number(head.total_posted_amt_ytd || 0);
//         });

//         const grand_variance = grand_budget - grand_actual;

//         cards_html += createCard("Grand Total", grand_budget, grand_actual, grand_variance, true);

//         data.forEach(head => {
//             const headBudget = Number(head.ytd || 0);
//             const headActual = Number(head.total_posted_amt_ytd || 0);
//             const headVariance = headBudget - headActual;

//             cards_html += createCard(head.name, headBudget, headActual, headVariance);

//             (head.sub_heads || []).forEach(sub => {
//                 const subBudget = Number(sub.ytd || 0);
//                 const subActual = Number(sub.total_posted_amt_ytd || 0);
//                 const subVariance = subBudget - subActual;

//                 cards_html += createCard(sub.name, subBudget, subActual, subVariance, false, true);
//             });
//         });

//         cards_container.append(cards_html);
//     }

//     function createCard(title, budget, actual, variance, isGrand = false, isSub = false){
//         const utilization = budget > 0 
//             ? ((actual / budget) * 100).toFixed(2) 
//             : "0.00";

//         return `
//             <div class="number-card ${isGrand ? 'grand' : ''} ${isSub ? 'sub' : ''}">
//                 <div class="number-title">${title}</div>
//                 <div class="kpi-row">
//                     <div class="kpi-block">
//                         <div class="kpi-label">Budget</div>
//                         <div class="kpi-value">${formatNumber(budget)}</div>
//                     </div>
//                     <div class="kpi-block">
//                         <div class="kpi-label">Actual</div>
//                         <div class="kpi-value">${formatNumber(actual)}</div>
//                     </div>
//                 </div>
//                 <div class="kpi-bottom">
//                     <div class="kpi-block">
//                         <div class="kpi-label">Variance</div>
//                         <div class="kpi-value">${formatNumber(variance)}</div>
//                     </div>
//                     <div class="kpi-block">
//                         <div class="kpi-label">Util %</div>
//                         <div class="kpi-value">${utilization} %</div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }
// };















// frappe.pages['budget-actuals-phase'].on_page_load = function(wrapper) {
//     const style = `
//     <style>
//     #tables-container { 
//         margin: 20px; 
//         background-color: #ffffff; 
//         border-radius: 8px; 
//         padding: 8px; 
//     }

//     #controls-row {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         margin-bottom: 12px;
//         padding: 6px 10px;
//         background: #f7f9fb;
//         border: 1px solid #dcdcdc;
//         border-radius: 6px;
//     }

//     #global-search-box { 
//         width: 280px; 
//         padding: 7px 12px; 
//         border: 1px solid #aaa; 
//         border-radius: 6px; 
//         font-size: 13px;
//     }

//     /* ── Expand-All checkbox ── */
//     #expand-all-wrapper {
//         display: flex;
//         align-items: center;
//         gap: 7px;
//         font-size: 13px;
//         font-weight: 600;
//         color: #444;
//         cursor: pointer;
//         user-select: none;
//     }

//     #expand-all-checkbox {
//         width: 16px;
//         height: 16px;
//         accent-color: #0076B6;
//         cursor: pointer;
//     }

//     /* ── Export button – Frappe primary style ── */
//     #export-excel-btn {
//         display: inline-flex;
//         align-items: center;
//         gap: 6px;
//         padding: 6px 14px;
//         font-size: 13px;
//         font-weight: 600;
//         color: #fff !important;
//         background-color: #0076B6;
//         border: 1px solid #0076B6;
//         border-radius: 6px;
//         cursor: pointer;
//         transition: background .15s ease, box-shadow .15s ease;
//         white-space: nowrap;
//         line-height: 1.5;
//         box-shadow: 0 1px 3px rgba(0,0,0,.12);
//         text-decoration: none;
//     }

//     #export-excel-btn:hover {
//         background-color: #005f94;
//         border-color: #005f94;
//         box-shadow: 0 3px 8px rgba(0,118,182,.35);
//     }

//     #export-excel-btn:active {
//         background-color: #004f7a;
//         border-color: #004f7a;
//         box-shadow: none;
//     }

//     .scroll-wrapper { 
//         border: 1px solid #ccc; 
//         border-radius: 6px; 
//         overflow-x: auto; 
//         overflow-y: auto; 
//         max-height: 70vh; 
//         background: #fff; 
//     }

//     table.university-table { 
//         min-width: 1200px; 
//         width: 100%; 
//         border-collapse: collapse; 
//         font-size: 13px; 
//     }

//     table.university-table th, 
//     table.university-table td {
//         border: 1px solid #ddd;
//         padding: 8px 10px;
//         white-space: nowrap;
//         vertical-align: middle;
//         text-align: center;
//         background:#fff !important;
//     }

//     table.university-table th:first-child,
//     table.university-table td:first-child { 
//         text-align: left !important; 
//     }

//     table.university-table thead tr.main-row th { 
//         background-color: #0076B6 !important; 
//         color: #fff !important; 
//         position: sticky; 
//         top: 0; 
//         z-index: 25; 
//     }

//     tr.expense-head { 
//         font-weight: 700; 
//         cursor: pointer; 
//     }

//     tr.expense-head:hover td {
//         background: #F4F9FD !important;
//     }

//     tr.sub-head { 
//         background-color: #FFF3E6 !important;
//         font-weight: 600; 
//         cursor: pointer;
//     }

//     tr.sub-head:hover td {
//         background-color: #FFEAD5 !important;
//     }

//     tr.line-item td:first-child { 
//         padding-left: 35px !important; 
//     }

//     tr.sub-head td:first-child { 
//         padding-left: 20px !important; 
//     }

//     .text-blue { 
//         color: #0076B6; 
//         font-weight: 600; 
//     }

//     tr.grand-total-row td {
//         background:#003B63 !important;
//         color:#fff !important;
//         font-weight:700 !important;
//     }

//     .card-row{
//         display:grid;
//         grid-template-columns: repeat(4, 1fr);
//         gap:14px;
//         margin:14px 20px;
//     }

//     .number-card{
//         background:#ffffff;
//         border:1px solid #dcdcdc;
//         border-radius:8px;
//         padding:14px 16px;
//         box-shadow:0 2px 6px rgba(0,0,0,.06);
//         transition:.15s ease;
//     }

//     .number-card:hover{
//         transform:translateY(-2px);
//         box-shadow:0 6px 14px rgba(0,0,0,.12);
//     }

//     .number-title{
//         font-size:12px;
//         font-weight:600;
//         color:#666;
//         text-transform:uppercase;
//         margin-bottom:6px;
//     }

//     .number-value{
//         font-size:20px;
//         font-weight:700;
//         color:#0076B6;
//     }

//     .number-card.grand{
//         border:2px solid #0076B6;
//         background:#F4F9FD;
//     }

//     .number-card.grand .number-value{
//         font-size:24px;
//         font-weight:800;
//     }
//     </style>
//     `;

//     $('head').append(style);

//     if (!$("#global-loader").length) {
//         $("body").append(`
//             <div id="global-loader" class="loader-overlay">
//                 <div class="loader-box">
//                     <img src="/files/apf.png" class="loader-logo">
//                     <div class="loader-text">Loading, please wait…</div>
//                 </div>
//             </div>
//         `);
//     }

//     /* Always hide on page load */
//     $("#global-loader").hide();

//     const Loader = {
//         show(message = "Loading, please wait…") {
//             const loader = $("#global-loader");
//             if (!loader.length) return;

//             loader.find(".loader-text").text(message);
//             loader.fadeIn(200);
//         },

//         hide() {
//             const loader = $("#global-loader");
//             if (!loader.length) return;

//             loader.fadeOut(200);
//         }
//     };

//     /* =====================================================
//        PAGE
//     =====================================================*/
//     let page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Budget vs Actuals Face Sheet',
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
                
//         /* Full screen overlay – soft light black glass look */
//         #global-loader.loader-overlay {
//             position: fixed;
//             inset: 0;
//             width: 100vw;
//             height: 100vh;
//             background: rgba(18, 18, 18, 0.92);
//             backdrop-filter: blur(6px);
//             display: none;
//             z-index: 999999;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }

//         .loader-box {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             gap: 14px;
//         }

//         .loader-logo {
//             width: 90px;
//             height: 90px;
//             border-radius: 50%;
//             background: linear-gradient(145deg, #ffffff, #eaeaea);
//             padding: 14px;
//             object-fit: contain;
//             box-shadow: 
//                 0 10px 30px rgba(0, 0, 0, 0.35),
//                 0 0 0 4px rgba(255, 255, 255, 0.08);
//             animation: pulse 1.6s infinite ease-in-out;
//         }

//         .loader-text {
//             margin-top: 6px;
//             font-size: 14px;
//             color: #ffffff;
//             font-weight: 600;
//             letter-spacing: 0.5px;
//             text-align: center;
//             opacity: 0.85;
//         }

//         .loader-text::after {
//             content: "";
//             display: inline-block;
//             width: 1em;
//             animation: dots 1.5s infinite;
//         }

//         @keyframes pulse {
//             0% {
//                 transform: scale(1);
//                 opacity: 0.8;
//                 box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
//             }
//             50% {
//                 transform: scale(1.08);
//                 opacity: 1;
//                 box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.15);
//             }
//             100% {
//                 transform: scale(1);
//                 opacity: 0.8;
//                 box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
//             }
//         }

//         @keyframes dots {
//             0%   { content: ""; }	
//             33%  { content: "."; }
//             66%  { content: ".."; }
//             100% { content: "..."; }
//         }

//         .kpi-row,
//         .kpi-bottom{
//             display:flex;
//             justify-content:space-between;
//             margin-top:8px;
//         }

//         .kpi-block{
//             text-align:left;
//         }

//         .kpi-label{
//             font-size:11px;
//             color:#777;
//             text-transform:uppercase;
//         }

//         .kpi-value{
//             font-size:14px;
//             font-weight:700;
//             color:#000;
//         }

//         .kpi-bottom{
//             margin-top:10px;
//             padding-top:8px;
//             border-top:1px solid #eee;
//         }

//         .number-card.sub{
//             background:#fafafa;
//             border-left:4px solid #ccc;
//         }
//     </style>`).appendTo("head");

//     function make_field() {
//         return $(`<div class="col-md-4 col-sm-12"></div>`).appendTo(filter_section);
//     }

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

//     function add_select_all_button(multiselect_control) {
//         multiselect_control.$wrapper.on("click", function () {
//             setTimeout(() => {
//                 let dropdown = multiselect_control.$wrapper.find(".multiselect-list");

//                 if (!dropdown.length) return;

//                 if (dropdown.find(".select-all-btn").length) return;

//                 let select_all_btn = $(`
//                     <button type="button"
//                         class="btn btn-xs btn-default select-all-btn"
//                         style="margin-right: 5px;">
//                         Select All
//                     </button>
//                 `);

//                 select_all_btn.on("click", async function (e) {
//                     e.stopPropagation();

//                     let values = [];

//                     if (multiselect_control.get_data) {
//                         let data = await multiselect_control.get_data();
//                         values = data.map(d => String(d.value));
//                     }
//                     else if (multiselect_control.df.options) {
//                         values = multiselect_control.df.options.map(o => 
//                             typeof o === "object" ? String(o.value) : String(o)
//                         );
//                     }

//                     multiselect_control.set_value(values);
//                 });

//                 dropdown.find(".dropdown-footer").prepend(select_all_btn);
//             }, 200);
//         });
//     }

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

//     let month_col = make_field();
//     let currentMonth = new Date().toLocaleString('default', { month: 'long' });

//     let month_filter = frappe.ui.form.make_control({
//         parent: month_col,
//         df: {
//             label: "YTD Month",
//             fieldtype: "Select",
//             fieldname: "month",
//             options: [
//                 "January",
//                 "February",
//                 "March",
//                 "April",
//                 "May",
//                 "June",
//                 "July",
//                 "August",
//                 "September",
//                 "October",
//                 "November",
//                 "December"
//             ].join("\n"),
//             reqd: 1,
//             change() {
//                 loadData();
//             }
//         },
//         render_input: true
//     });

//     month_filter.set_value(currentMonth);

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
//                 }
//             }
//         },
//         render_input: true
//     });
//     add_select_all_button(unit_filter);

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
//                 // loadData();
//             }
//         },
//         render_input: true
//     });
//     add_select_all_button(cost_center_filter);

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
//                 // loadData();
//             }
//         },
//         render_input: true
//     });
//     add_select_all_button(location_code_filter);

//     let btn_col = make_field();

//     let load_button = frappe.ui.form.make_control({
//         parent: btn_col,
//         df: {
//             label: " ",
//             fieldtype: "Button",
//             fieldname: "load_button",
//             click() {
//                 loadData();
//             }
//         },
//         render_input: true
//     });

//     load_button.$wrapper.find('button').addClass("btn-primary");
//     load_button.$wrapper.find('button').text("Get Report");
//     load_button.$wrapper.css("margin-top", "26px");

//     /* ------------------------------------------------
//        LOAD COST CENTERS
//     --------------------------------------------------*/
//     function loadCostCenters(units) {
//         cost_center_filter.set_value([]);

//         frappe.call({
//             method: "annual_budget.api.filter_options.get_cost_centers_by_set_id",
//             args: { units: units.join(",") },
//             callback(r) {
//                 let api_options = (r.message?.data || [])
//                     .filter(d => d.value)
//                     .map(d => ({
//                         label: d.label,
//                         value: String(d.value),
//                         description: "",
//                         erp_cost_center_value: String(d.erp_cost_center_value)
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
//         location_code_filter.set_value([]);

//         frappe.call({
//             method: "annual_budget.api.filter_options.get_location_codes_by_unit",
//             args: { unit: units.join(",") },
//             callback(r) {
//                 let api_options = (r.message?.data || [])
//                     .filter(d => d.value)
//                     .map(d => ({
//                         label: d.label,
//                         value: String(d.value),
//                         description: "",
//                         erp_loc_value: String(d.erp_loc_value)
//                     }));

//                 location_code_filter.df.options =
//                     mergeSelectedOptions(location_code_filter, api_options);

//                 location_code_filter.refresh();
//             }
//         });
//     }

//     frappe.require("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js", function () {
//         console.log("XLSX Loaded");
//     });

//     const container = $(`
//         <div id="tables-container">
//             <div class="card-row" id="cards-container"></div>
//             <div id="controls-row">
//                 <input id="global-search-box" type="text"
//                     placeholder="Search Expense / Sub Head / Item...">
//                 <div style="display:flex; align-items:center; gap:14px;">
//                     <label id="expand-all-wrapper">
//                         <input type="checkbox" id="expand-all-checkbox">
//                         Expand All
//                     </label>
//                     <button id="export-excel-btn">&#8595; Export to Excel</button>
//                 </div>
//             </div>
//             <div class="scroll-wrapper">
//                 <table class="university-table" id="phase-table"></table>
//             </div>
//         </div>
//     `);

//     $(page.body).append(container);

//     /* ------------------------------------------------
//        EXPAND ALL CHECKBOX
//     --------------------------------------------------*/
//     $(document).on('change', '#expand-all-checkbox', function () {
//         const isChecked = $(this).is(':checked');

//         if (isChecked) {
//             // Expand every head
//             expandedHeads = expense_heads.map(h => h.name);

//             // Expand every sub-head
//             expandedSubHeads = [];
//             expense_heads.forEach(head => {
//                 (head.sub_heads || []).forEach(sub => {
//                     expandedSubHeads.push(head.name + "__" + sub.name);
//                 });
//             });
//         } else {
//             // Collapse everything
//             expandedHeads = [];
//             expandedSubHeads = [];
//         }

//         renderTable();
//     });

//     /* ------------------------------------------------
//        EXPORT TO EXCEL
//     --------------------------------------------------*/
//     $(document).on('click', '#export-excel-btn', function () {
//         exportTableToExcel();
//     });

//     function exportTableToExcel() {
//         if (typeof XLSX === "undefined") {
//             frappe.msgprint("Excel library not loaded.");
//             return;
//         }

//         let data = [];

//         data.push([
//             "Expense Items",
//             "Budget",
//             "Actuals",
//             "Util %",
//             "Variance"
//         ]);

//         let grand_budget = 0;
//         let grand_actuals = 0;

//         expense_heads.forEach(head => {
//             const headBudget = Number(head.ytd || 0);
//             const headActual = Number(head.total_posted_amt_ytd || 0);
//             const headVariance = headBudget - headActual;
//             const headPer = safePercentage(headBudget, headActual);

//             grand_budget += headBudget;
//             grand_actuals += headActual;

//             data.push([
//                 head.name,
//                 headBudget,
//                 headActual,
//                 headPer,
//                 headVariance
//             ]);

//             (head.sub_heads || []).forEach(sub => {
//                 const subBudget = Number(sub.ytd || 0);
//                 const subActual = Number(sub.total_posted_amt_ytd || 0);
//                 const subVariance = subBudget - subActual;
//                 const subPer = safePercentage(subBudget, subActual);

//                 data.push([
//                     "   " + sub.name,
//                     subBudget,
//                     subActual,
//                     subPer,
//                     subVariance
//                 ]);

//                 (sub.items || []).forEach(item => {
//                     const budget = Number(item.ytd || 0);
//                     const actual = Number(item.total_posted_amt || 0);
//                     const variance = budget - actual;
//                     const per = safePercentage(budget, actual);

//                     data.push([
//                         "      " + item.name,
//                         budget,
//                         actual,
//                         per,
//                         variance
//                     ]);
//                 });
//             });

//             (head.items || []).forEach(item => {
//                 const budget = Number(item.ytd || 0);
//                 const actual = Number(item.total_posted_amt || 0);
//                 const variance = budget - actual;
//                 const per = safePercentage(budget, actual);

//                 data.push([
//                     "   " + item.name,
//                     budget,
//                     actual,
//                     per,
//                     variance
//                 ]);
//             });
//         });

//         const grandVariance = grand_budget - grand_actuals;
//         const grandPer = safePercentage(grand_budget, grand_actuals);

//         data.push([
//             "GRAND TOTAL",
//             grand_budget,
//             grand_actuals,
//             grandPer,
//             grandVariance
//         ]);

//         const ws = XLSX.utils.aoa_to_sheet(data);

//         ws["!cols"] = [
//             { wch: 40 },
//             { wch: 15 },
//             { wch: 15 },
//             { wch: 10 },
//             { wch: 15 }
//         ];

//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Expense Report");

//         XLSX.writeFile(wb, "Expense_Report.xlsx");
//     }

//     /* =====================================================
//        STATE
//     =====================================================*/
//     let expense_heads = [];
//     let expandedHeads = [];
//     let expandedSubHeads = [];
//     let searchText = "";

//     const formatNumber = n =>
//         (Number(n) || 0).toLocaleString('en-IN', {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//         });

//     function matchesSearch(...values) {
//         return values.some(v =>
//             String(v || "").toLowerCase().includes(searchText.toLowerCase())
//         );
//     }

//     /* ------------------------------------------------
//        GLOBAL SEARCH  (bound directly after container append)
//     --------------------------------------------------*/
//     container.find('#global-search-box').on('input keyup', function () {
//         searchText = $(this).val().trim();

//         // Auto-expand all heads & sub-heads when searching so results are visible
//         if (searchText) {
//             expandedHeads = expense_heads.map(h => h.name);
//             expandedSubHeads = [];
//             expense_heads.forEach(head => {
//                 (head.sub_heads || []).forEach(sub => {
//                     expandedSubHeads.push(head.name + "__" + sub.name);
//                 });
//             });
//         } else {
//             // Restore collapsed state when search is cleared
//             expandedHeads = [];
//             expandedSubHeads = [];
//             $('#expand-all-checkbox').prop('checked', false);
//         }

//         renderTable();
//     });

//     /* ------------------------------------------------
//        HELPER — GET SELECTED WITH EXTRA KEY
//     --------------------------------------------------*/
//     function getSelectedWithKey(control, key) {
//         if (!control || !control.get_value) return [];
//         return (control.get_value() || [])
//             .map(val => {
//                 let option = (control.df?.options || []).find(
//                     o => String(o?.value) === String(val)
//                 );
//                 return option?.[key] || null;
//             })
//             .filter(Boolean);
//     }

//     function loadData() {
//         let financial_year = fiscal_year_filter.get_value();
//         let month = month_filter.get_value();

//         let unit = (unit_filter.get_value() || []).join(",") || null;
//         let location_code = (getSelectedWithKey(location_code_filter, "value") || []).join(",") || null;
//         let cost_center = (getSelectedWithKey(cost_center_filter, "value") || []).join(",") || null;
//         let erp_cost_center_value = (getSelectedWithKey(cost_center_filter, "erp_cost_center_value") || []).join(",") || null;
//         let erp_loc_value = (getSelectedWithKey(location_code_filter, "erp_loc_value") || []).join(",") || null;

//         console.log(erp_cost_center_value, "erp_cost_center_value");
//         console.log(cost_center, "cost_center_value");
//         console.log(location_code, "loc_value");

//         let missing = [];
//         if (!financial_year) missing.push("Financial Year");
//         if (!month) missing.push("Month");
//         if (!unit) missing.push("Unit");

//         if (missing.length) {
//             console.warn("⚠ Missing Filters:", missing.join(", "));
//             return;
//         }

//         Loader.show("We're crafting your report with care");

//         // Reset checkbox & expanded state on fresh load
//         $('#expand-all-checkbox').prop('checked', false);
//         expandedHeads = [];
//         expandedSubHeads = [];

//         frappe.call({
//             method: "annual_budget.api.phase_sheet.get_combined_actuals",
//             args: {
//                 financial_year,
//                 month,
//                 unit,
//                 cost_center,
//                 location_code,
//                 erp_loc_value,
//                 erp_cost_center_value,
//             }
//         })
//         .done(function(r) {
//             expense_heads = Array.isArray(r.message)
//                 ? r.message
//                 : (r.message?.message || []);

//             console.log(r, "API response");
//             renderTable();
//         })
//         .fail(function(err) {
//             console.error("API Error:", err);
//             frappe.msgprint({
//                 title: "Error",
//                 message: "Failed to load data. Please try again.",
//                 indicator: "red"
//             });
//         })
//         .always(function() {
//             Loader.hide();
//         });
//     }

//     function safePercentage(budget, actual) {
//         if (!budget || budget === 0) return "0.00";
//         return ((actual / budget) * 100).toFixed(2);
//     }

//     function renderTable() {
//         renderCards(expense_heads);

//         const $table = $('#phase-table');
//         $table.html('');

//         if (!expense_heads || !expense_heads.length) {
//             $table.append(`<tr><td colspan="5">No Data Found</td></tr>`);
//             return;
//         }

//         $table.append(`
//             <thead>
//                 <tr class="main-row">
//                     <th>Expense Head</th>
//                     <th>Budget</th>
//                     <th>Actuals</th>
//                     <th>Util %</th>
//                     <th>Variance</th>
//                 </tr>
//             </thead>
//         `);

//         const $tbody = $('<tbody></tbody>');

//         let grand_budget = 0;
//         let grand_actuals = 0;

//         expense_heads.forEach(head => {
//             if (
//                 searchText &&
//                 !matchesSearch(head.name) &&
//                 !(head.items || []).some(i => matchesSearch(i.name)) &&
//                 !(head.sub_heads || []).some(s =>
//                     matchesSearch(s.name) ||
//                     (s.items || []).some(i => matchesSearch(i.name))
//                 )
//             ) return;

//             const headBudget = Number(head.ytd || 0);
//             const headActual = Number(head.total_posted_amt_ytd || 0);
//             const headTotal = headBudget - headActual;
//             const headPer = safePercentage(headBudget, headActual);

//             grand_budget += headBudget;
//             grand_actuals += headActual;

//             $tbody.append(`
//                 <tr class="expense-head" data-head="${head.name}">
//                     <td>
//                         ${(head.items?.length || head.sub_heads?.length)
//                             ? (expandedHeads.includes(head.name) ? '▼' : '▶')
//                             : ''
//                         }
//                         ${head.name}
//                     </td>
//                     <td>${formatNumber(headBudget)}</td>
//                     <td>${formatNumber(headActual)}</td>
//                     <td class="text-blue">${headPer} %</td>
//                     <td class="text-blue">${formatNumber(headTotal)}</td>
//                 </tr>
//             `);

//             if (expandedHeads.includes(head.name)) {
//                 (head.items || []).forEach(item => {
//                     if (searchText && !matchesSearch(item.name)) return;

//                     const budget = Number(item.ytd || 0);
//                     const actual = Number(item.total_posted_amt || 0);
//                     const total = budget - actual;
//                     const total_per = safePercentage(budget, actual);

//                     $tbody.append(`
//                         <tr class="line-item">
//                             <td style="padding-left:35px">${item.name}</td>
//                             <td>${formatNumber(budget)}</td>
//                             <td>${formatNumber(actual)}</td>
//                             <td>${total_per} %</td>
//                             <td>${formatNumber(total)}</td>
//                         </tr>
//                     `);
//                 });

//                 (head.sub_heads || []).forEach(sub => {
//                     const key = head.name + "__" + sub.name;

//                     const subBudget = Number(sub.ytd || 0);
//                     const subActual = Number(sub.total_posted_amt_ytd || 0);
//                     const subTotal = subBudget - subActual;
//                     const subTotal_per = safePercentage(subBudget, subActual);

//                     $tbody.append(`
//                         <tr class="sub-head" data-sub="${key}">
//                             <td style="padding-left:20px">
//                                 ${(sub.items?.length)
//                                     ? (expandedSubHeads.includes(key) ? '▼' : '▶')
//                                     : ''
//                                 }
//                                 ${sub.name}
//                             </td>
//                             <td>${formatNumber(subBudget)}</td>
//                             <td>${formatNumber(subActual)}</td>
//                             <td class="text-blue">${subTotal_per} %</td>
//                             <td class="text-blue">${formatNumber(subTotal)}</td>
//                         </tr>
//                     `);

//                     if (expandedSubHeads.includes(key)) {
//                         (sub.items || []).forEach(item => {
//                             const budget = Number(item.ytd || 0);
//                             const actual = Number(item.total_posted_amt || 0);
//                             const total = budget - actual;
//                             const total_per1 = safePercentage(budget, actual);

//                             $tbody.append(`
//                                 <tr class="line-item">
//                                     <td style="padding-left:55px">${item.name}</td>
//                                     <td>${formatNumber(budget)}</td>
//                                     <td>${formatNumber(actual)}</td>
//                                     <td>${total_per1} %</td>
//                                     <td>${formatNumber(total)}</td>
//                                 </tr>
//                             `);
//                         });
//                     }
//                 });
//             }
//         });

//         const grand_total = grand_budget - grand_actuals;
//         const grandPer = safePercentage(grand_budget, grand_actuals);

//         $tbody.append(`
//             <tr class="grand-total-row">
//                 <td>GRAND TOTAL</td>
//                 <td>${formatNumber(grand_budget)}</td>
//                 <td>${formatNumber(grand_actuals)}</td>
//                 <td>${grandPer} %</td>
//                 <td>${formatNumber(grand_total)}</td>
//             </tr>
//         `);

//         $table.append($tbody);

//         /* ── keep checkbox in sync when user manually clicks individual rows ── */
//         const allHeads = expense_heads.map(h => h.name);
//         const allSubKeys = [];
//         expense_heads.forEach(h => {
//             (h.sub_heads || []).forEach(s => {
//                 allSubKeys.push(h.name + "__" + s.name);
//             });
//         });

//         const allExpanded =
//             allHeads.every(n => expandedHeads.includes(n)) &&
//             allSubKeys.every(k => expandedSubHeads.includes(k));

//         $('#expand-all-checkbox').prop('checked', allExpanded);

//         $('.expense-head').off('click').on('click', function () {
//             const name = $(this).data('head');

//             expandedHeads = expandedHeads.includes(name)
//                 ? expandedHeads.filter(x => x !== name)
//                 : [...expandedHeads, name];

//             renderTable();
//         });

//         $('.sub-head').off('click').on('click', function () {
//             const key = $(this).data('sub');

//             expandedSubHeads = expandedSubHeads.includes(key)
//                 ? expandedSubHeads.filter(x => x !== key)
//                 : [...expandedSubHeads, key];

//             renderTable();
//         });
//     }

//     function renderCards(data){
//         const cards_container = $('#cards-container');
//         cards_container.empty();

//         let grand_budget = 0;
//         let grand_actual = 0;
//         let cards_html = "";

//         data.forEach(head => {
//             grand_budget += Number(head.ytd || 0);
//             grand_actual += Number(head.total_posted_amt_ytd || 0);
//         });

//         const grand_variance = grand_budget - grand_actual;

//         cards_html += createCard("Grand Total", grand_budget, grand_actual, grand_variance, true);

//         data.forEach(head => {
//             const headBudget = Number(head.ytd || 0);
//             const headActual = Number(head.total_posted_amt_ytd || 0);
//             const headVariance = headBudget - headActual;

//             cards_html += createCard(head.name, headBudget, headActual, headVariance);

//             (head.sub_heads || []).forEach(sub => {
//                 const subBudget = Number(sub.ytd || 0);
//                 const subActual = Number(sub.total_posted_amt_ytd || 0);
//                 const subVariance = subBudget - subActual;

//                 cards_html += createCard(sub.name, subBudget, subActual, subVariance, false, true);
//             });
//         });

//         cards_container.append(cards_html);
//     }

//     function createCard(title, budget, actual, variance, isGrand = false, isSub = false){
//         const utilization = budget > 0 
//             ? ((actual / budget) * 100).toFixed(2) 
//             : "0.00";

//         return `
//             <div class="number-card ${isGrand ? 'grand' : ''} ${isSub ? 'sub' : ''}">
//                 <div class="number-title">${title}</div>
//                 <div class="kpi-row">
//                     <div class="kpi-block">
//                         <div class="kpi-label">Budget</div>
//                         <div class="kpi-value">${formatNumber(budget)}</div>
//                     </div>
//                     <div class="kpi-block">
//                         <div class="kpi-label">Actual</div>
//                         <div class="kpi-value">${formatNumber(actual)}</div>
//                     </div>
//                 </div>
//                 <div class="kpi-bottom">
//                     <div class="kpi-block">
//                         <div class="kpi-label">Variance</div>
//                         <div class="kpi-value">${formatNumber(variance)}</div>
//                     </div>
//                     <div class="kpi-block">
//                         <div class="kpi-label">Util %</div>
//                         <div class="kpi-value">${utilization} %</div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }
// };



// frappe.pages['budget-actuals-phase'].on_page_load = function(wrapper) {
//     const style = `
//     <style>

//     /* ══════════════════════════════════════════
//        BASE / DESKTOP
//     ══════════════════════════════════════════ */

//     #tables-container {
//         margin: 20px;
//         background-color: #ffffff;
//         border-radius: 8px;
//         padding: 8px;
//     }

//     /* ── Controls row ── */
//     #controls-row {
//         display: flex;
//         flex-wrap: wrap;
//         justify-content: space-between;
//         align-items: center;
//         gap: 8px;
//         margin-bottom: 12px;
//         padding: 8px 10px;
//         background: #f7f9fb;
//         border: 1px solid #dcdcdc;
//         border-radius: 6px;
//     }

//     #global-search-box {
//         flex: 1 1 200px;
//         min-width: 0;
//         max-width: 320px;
//         padding: 7px 12px;
//         border: 1px solid #aaa;
//         border-radius: 6px;
//         font-size: 13px;
//         box-sizing: border-box;
//     }

//     #controls-right {
//         display: flex;
//         flex-wrap: wrap;
//         align-items: center;
//         gap: 12px;
//     }

//     /* ── Expand-All checkbox ── */
//     #expand-all-wrapper {
//         display: flex;
//         align-items: center;
//         gap: 7px;
//         font-size: 13px;
//         font-weight: 600;
//         color: #444;
//         cursor: pointer;
//         user-select: none;
//         white-space: nowrap;
//     }

//     #expand-all-checkbox {
//         width: 16px;
//         height: 16px;
//         accent-color: #0076B6;
//         cursor: pointer;
//     }

//     /* ── Export button – Frappe primary style ── */
//     #export-excel-btn {
//         display: inline-flex;
//         align-items: center;
//         gap: 6px;
//         padding: 6px 14px;
//         font-size: 13px;
//         font-weight: 600;
//         color: #fff !important;
//         background-color: #0076B6;
//         border: 1px solid #0076B6;
//         border-radius: 6px;
//         cursor: pointer;
//         transition: background .15s ease, box-shadow .15s ease;
//         white-space: nowrap;
//         line-height: 1.5;
//         box-shadow: 0 1px 3px rgba(0,0,0,.12);
//         text-decoration: none;
//     }

//     #export-excel-btn:hover {
//         background-color: #005f94;
//         border-color: #005f94;
//         box-shadow: 0 3px 8px rgba(0,118,182,.35);
//     }

//     #export-excel-btn:active {
//         background-color: #004f7a;
//         border-color: #004f7a;
//         box-shadow: none;
//     }

//     /* ── Table wrapper ── */
//     .scroll-wrapper {
//         border: 1px solid #ccc;
//         border-radius: 6px;
//         overflow-x: auto;
//         overflow-y: auto;
//         max-height: 70vh;
//         background: #fff;
//         -webkit-overflow-scrolling: touch;
//     }

//     table.university-table {
//         min-width: 700px;
//         width: 100%;
//         border-collapse: collapse;
//         font-size: 13px;
//     }

//     table.university-table th,
//     table.university-table td {
//         border: 1px solid #ddd;
//         padding: 8px 10px;
//         white-space: nowrap;
//         vertical-align: middle;
//         text-align: center;
//         background: #fff !important;
//     }

//     table.university-table th:first-child,
//     table.university-table td:first-child {
//         text-align: left !important;
//     }

//     table.university-table thead tr.main-row th {
//         background-color: #0076B6 !important;
//         color: #fff !important;
//         position: sticky;
//         top: 0;
//         z-index: 25;
//     }

//     tr.expense-head {
//         font-weight: 700;
//         cursor: pointer;
//     }

//     tr.expense-head:hover td {
//         background: #F4F9FD !important;
//     }

//     tr.sub-head {
//         background-color: #FFF3E6 !important;
//         font-weight: 600;
//         cursor: pointer;
//     }

//     tr.sub-head:hover td {
//         background-color: #FFEAD5 !important;
//     }

//     tr.line-item td:first-child {
//         padding-left: 35px !important;
//     }

//     tr.sub-head td:first-child {
//         padding-left: 20px !important;
//     }

//     .text-blue {
//         color: #0076B6;
//         font-weight: 600;
//     }

//     tr.grand-total-row td {
//         background: #003B63 !important;
//         color: #fff !important;
//         font-weight: 700 !important;
//     }

//     /* ── Cards ── */
//     .card-row {
//         display: grid;
//         grid-template-columns: repeat(4, 1fr);
//         gap: 14px;
//         margin: 14px 20px;
//     }

//     .number-card {
//         background: #ffffff;
//         border: 1px solid #dcdcdc;
//         border-radius: 8px;
//         padding: 14px 16px;
//         box-shadow: 0 2px 6px rgba(0,0,0,.06);
//         transition: .15s ease;
//     }

//     .number-card:hover {
//         transform: translateY(-2px);
//         box-shadow: 0 6px 14px rgba(0,0,0,.12);
//     }

//     .number-title {
//         font-size: 12px;
//         font-weight: 600;
//         color: #666;
//         text-transform: uppercase;
//         margin-bottom: 6px;
//     }

//     .number-value {
//         font-size: 20px;
//         font-weight: 700;
//         color: #0076B6;
//     }

//     .number-card.grand {
//         border: 2px solid #0076B6;
//         background: #F4F9FD;
//     }

//     .number-card.grand .number-value {
//         font-size: 24px;
//         font-weight: 800;
//     }

//     /* ══════════════════════════════════════════
//        TABLET  ≤ 1024px  →  2-col cards
//     ══════════════════════════════════════════ */
//     @media (max-width: 1024px) {
//         .card-row {
//             grid-template-columns: repeat(2, 1fr);
//         }
//         #global-search-box {
//             max-width: 100%;
//         }
//     }

//     /* ══════════════════════════════════════════
//        MOBILE  ≤ 600px  →  single column
//     ══════════════════════════════════════════ */
//     @media (max-width: 600px) {
//         #tables-container {
//             margin: 8px;
//             padding: 6px;
//         }
//         #controls-row {
//             flex-direction: column;
//             align-items: stretch;
//             gap: 8px;
//             padding: 8px;
//         }
//         #global-search-box {
//             max-width: 100%;
//             width: 100%;
//         }
//         #controls-right {
//             justify-content: space-between;
//             width: 100%;
//         }
//         #export-excel-btn {
//             flex: 1;
//             justify-content: center;
//         }
//         .card-row {
//             grid-template-columns: 1fr;
//             margin: 8px;
//             gap: 10px;
//         }
//         .number-card.grand .number-value {
//             font-size: 20px;
//         }
//         table.university-table {
//             font-size: 12px;
//         }
//         table.university-table th,
//         table.university-table td {
//             padding: 6px 8px;
//         }
//         tr.line-item td:first-child {
//             padding-left: 20px !important;
//         }
//         tr.sub-head td:first-child {
//             padding-left: 14px !important;
//         }
//     }

//     </style>
//     `;

//     $('head').append(style);

//     if (!$("#global-loader").length) {
//         $("body").append(`
//             <div id="global-loader" class="loader-overlay">
//                 <div class="loader-box">
//                     <img src="/files/APF logo.png" class="loader-logo">
//                     <div class="loader-text">Loading, please wait…</div>
//                 </div>
//             </div>
//         `);
//     }

//     $("#global-loader").hide();

//     const Loader = {
//         show(message = "Loading, please wait…") {
//             const loader = $("#global-loader");
//             if (!loader.length) return;
//             loader.find(".loader-text").text(message);
//             loader.fadeIn(200);
//         },
//         hide() {
//             const loader = $("#global-loader");
//             if (!loader.length) return;
//             loader.fadeOut(200);
//         }
//     };

//     /* =====================================================
//        PAGE
//     =====================================================*/
//     let page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Budget vs Actuals Face Sheet',
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

//         /* Full screen loader overlay */
//         #global-loader.loader-overlay {
//             position: fixed;
//             inset: 0;
//             width: 100vw;
//             height: 100vh;
//             background: rgba(18, 18, 18, 0.92);
//             backdrop-filter: blur(6px);
//             display: none;
//             z-index: 999999;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }

//         .loader-box {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             gap: 14px;
//         }

//         .loader-logo {
//             width: 90px;
//             height: 90px;
//             border-radius: 50%;
//             background: linear-gradient(145deg, #ffffff, #eaeaea);
//             padding: 14px;
//             object-fit: contain;
//             box-shadow: 0 10px 30px rgba(0,0,0,.35), 0 0 0 4px rgba(255,255,255,.08);
//             animation: pulse 1.6s infinite ease-in-out;
//         }

//         .loader-text {
//             margin-top: 6px;
//             font-size: 14px;
//             color: #ffffff;
//             font-weight: 600;
//             letter-spacing: 0.5px;
//             text-align: center;
//             opacity: 0.85;
//         }

//         .loader-text::after {
//             content: "";
//             display: inline-block;
//             width: 1em;
//             animation: dots 1.5s infinite;
//         }

//         @keyframes pulse {
//             0%   { transform: scale(1);    opacity: 0.8; box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
//             50%  { transform: scale(1.08); opacity: 1;   box-shadow: 0 0 20px 8px rgba(255,255,255,0.15); }
//             100% { transform: scale(1);    opacity: 0.8; box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
//         }

//         @keyframes dots {
//             0%   { content: ""; }
//             33%  { content: "."; }
//             66%  { content: ".."; }
//             100% { content: "..."; }
//         }

//         .kpi-row,
//         .kpi-bottom {
//             display: flex;
//             justify-content: space-between;
//             margin-top: 8px;
//         }

//         .kpi-block { text-align: left; }

//         .kpi-label {
//             font-size: 11px;
//             color: #777;
//             text-transform: uppercase;
//         }

//         .kpi-value {
//             font-size: 14px;
//             font-weight: 700;
//             color: #000;
//         }

//         .kpi-bottom {
//             margin-top: 10px;
//             padding-top: 8px;
//             border-top: 1px solid #eee;
//         }

//         .number-card.sub {
//             background: #fafafa;
//             border-left: 4px solid #ccc;
//         }

//         /* Filter row responsive */
//         @media (max-width: 768px) {
//             .custom-filter-row { padding: 10px; }
//             .custom-filter-row .col-md-4 { width: 100%; margin-bottom: 8px; }
//         }
//     </style>`).appendTo("head");

//     // function make_field() {
//     //     return $(`<div class="col-md-4 col-sm-12"></div>`).appendTo(filter_section);
//     // }

//     // function mergeSelectedOptions(control, new_options) {
//     //     let selected = (control.get_value() || []).map(String);
//     //     let existing = control.df.options || [];
//     //     let map = {};
//     //     existing.forEach(o => map[String(o.value)] = o);
//     //     new_options.forEach(o => map[String(o.value)] = o);
//     //     selected.forEach(v => {
//     //         if (!map[v]) map[v] = { label: v, value: v, description: "" };
//     //     });
//     //     return Object.values(map);
//     // }

//     // function add_select_all_button(multiselect_control) {
//     //     multiselect_control.$wrapper.on("click", function () {
//     //         setTimeout(() => {
//     //             let dropdown = multiselect_control.$wrapper.find(".multiselect-list");
//     //             if (!dropdown.length) return;
//     //             if (dropdown.find(".select-all-btn").length) return;

//     //             let select_all_btn = $(`
//     //                 <button type="button" class="btn btn-xs btn-default select-all-btn"
//     //                     style="margin-right:5px;">Select All</button>
//     //             `);

//     //             select_all_btn.on("click", async function (e) {
//     //                 e.stopPropagation();
//     //                 let values = [];
//     //                 if (multiselect_control.get_data) {
//     //                     let data = await multiselect_control.get_data();
//     //                     values = data.map(d => String(d.value));
//     //                 } else if (multiselect_control.df.options) {
//     //                     values = multiselect_control.df.options.map(o =>
//     //                         typeof o === "object" ? String(o.value) : String(o)
//     //                     );
//     //                 }
//     //                 multiselect_control.set_value(values);
//     //             });

//     //             dropdown.find(".dropdown-footer").prepend(select_all_btn);
//     //         }, 200);
//     //     });
//     // }

//     // /* ── Financial Year ── */
//     // let fy_col = make_field();
//     // let fiscal_year_filter = frappe.ui.form.make_control({
//     //     parent: fy_col,
//     //     df: {
//     //         label: "Financial Year",
//     //         fieldtype: "Select",
//     //         fieldname: "financial_year",
//     //         options: ["2025-26", "2026-27"].join("\n"),
//     //         default: "2025-26",
//     //         reqd: 1,
//     //         change() { loadData(); }
//     //     },
//     //     render_input: true
//     // });

//     // /* ── YTD Month ── */
//     // let month_col = make_field();
//     // let currentMonth = new Date().toLocaleString('default', { month: 'long' });
//     // let month_filter = frappe.ui.form.make_control({
//     //     parent: month_col,
//     //     df: {
//     //         label: "YTD Month",
//     //         fieldtype: "Select",
//     //         fieldname: "month",
//     //         options: [
//     //             "January","February","March","April","May","June",
//     //             "July","August","September","October","November","December"
//     //         ].join("\n"),
//     //         reqd: 1,
//     //         change() { loadData(); }
//     //     },
//     //     render_input: true
//     // });
//     // month_filter.set_value(currentMonth);

//     // /* ── Unit ── */
//     // let unit_col = make_field();
//     // let unit_filter = frappe.ui.form.make_control({
//     //     parent: unit_col,
//     //     df: {
//     //         label: "Unit",
//     //         fieldtype: "MultiSelectList",
//     //         fieldname: "unit",
//     //         reqd: 1,
//     //         get_data() {
//     //             return frappe.call({
//     //                 method: "annual_budget.api.filter_options.get_units"
//     //             }).then(r => {
//     //                 return (r.message?.data || [])
//     //                     .filter(d => d.value)
//     //                     .map(d => ({ label: d.label, value: String(d.value), description: "" }));
//     //             });
//     //         },
//     //         change() {
//     //             units = unit_filter.get_value().map(String);
//     //             cost_center_filter.set_value([]);
//     //             location_code_filter.df.options = [];
//     //             location_code_filter.refresh();
//     //             cost_center_filter.df.options = [];
//     //             cost_center_filter.refresh();
//     //             if (units.length) {
//     //                 loadCostCenters(units);
//     //                 loadLocationCodes(units);
//     //             }
//     //         }
//     //     },
//     //     render_input: true
//     // });
//     // add_select_all_button(unit_filter);

//     // /* ── Cost Center ── */
//     // let cc_col = make_field();
//     // let cost_center_filter = frappe.ui.form.make_control({
//     //     parent: cc_col,
//     //     df: {
//     //         label: "Cost Center",
//     //         fieldtype: "MultiSelectList",
//     //         fieldname: "cost_center",
//     //         options: [],
//     //         change() {}
//     //     },
//     //     render_input: true
//     // });
//     // add_select_all_button(cost_center_filter);

//     // /* ── Location Code ── */
//     // let lc_col = make_field();
//     // let location_code_filter = frappe.ui.form.make_control({
//     //     parent: lc_col,
//     //     df: {
//     //         label: "Location Code",
//     //         fieldtype: "MultiSelectList",
//     //         fieldname: "location_code",
//     //         options: [],
//     //         change() {}
//     //     },
//     //     render_input: true
//     // });
//     // add_select_all_button(location_code_filter);

//     // /* ── Get Report button ── */
//     // let btn_col = make_field();
//     // let load_button = frappe.ui.form.make_control({
//     //     parent: btn_col,
//     //     df: {
//     //         label: " ",
//     //         fieldtype: "Button",
//     //         fieldname: "load_button",
//     //         click() { loadData(); }
//     //     },
//     //     render_input: true
//     // });
//     // load_button.$wrapper.find('button').addClass("btn-primary").text("Get Report");
//     // load_button.$wrapper.css("margin-top", "26px");

//     function make_field() {
//         return $(`<div class="col-md-4 col-sm-12"></div>`).appendTo(filter_section);
//     }

//     function mergeSelectedOptions(control, new_options) {
//         let selected = (control.get_value() || []).map(String);
//         let existing = control.df.options || [];
//         let map = {};
//         existing.forEach(o => map[String(o.value)] = o);
//         new_options.forEach(o => map[String(o.value)] = o);
//         selected.forEach(v => {
//             if (!map[v]) map[v] = { label: v, value: v, description: "" };
//         });
//         return Object.values(map);
//     }

//     // ──────────────────────────────────────────────────────────────
//     // IMPROVED: Add Select All using MutationObserver – reliable on Cloud
//     // ──────────────────────────────────────────────────────────────
//     function addSelectAllButton(control) {
//         if (!control || !control.$wrapper) return;

//         const observer = new MutationObserver(() => {
//             const footer = control.$wrapper.find('.dropdown-footer');
//             const list = control.$wrapper.find('.multiselect-list');

//             if (footer.length && list.length && !footer.find('.select-all-btn').length) {
//                 let btn = $(`
//                     <button type="button" class="btn btn-xs btn-default select-all-btn"
//                         style="margin-right:5px; margin-left:5px;">
//                         Select All
//                     </button>
//                 `);

//                 btn.on("click", async function (e) {
//                     e.stopPropagation();
//                     e.preventDefault();

//                     let values = [];
//                     try {
//                         if (control.get_data) {
//                             // async get_data – most common in Frappe MultiSelectList with dynamic source
//                             let data = await control.get_data();
//                             values = data.map(d => String(d.value || d));
//                         } else if (control.df.options) {
//                             values = control.df.options.map(o =>
//                                 String(typeof o === "object" ? (o.value || o) : o)
//                             );
//                         }
//                         control.set_value(values);
//                         // Optional: close dropdown after action
//                         // control.$wrapper.find('input').blur();
//                     } catch (err) {
//                         console.error("Select All failed:", err);
//                     }
//                 });

//                 footer.prepend(btn);
//                 // You can keep observing or disconnect after first add:
//                 // observer.disconnect();
//             }
//         });

//         observer.observe(control.$wrapper[0], {
//             childList: true,
//             subtree: true,
//             attributes: false
//         });
//     }

//     /* ── Financial Year ── */
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
//             change() { loadData(); }
//         },
//         render_input: true
//     });

//     /* ── YTD Month ── */
//     let month_col = make_field();
//     let currentMonth = new Date().toLocaleString('default', { month: 'long' });
//     let month_filter = frappe.ui.form.make_control({
//         parent: month_col,
//         df: {
//             label: "YTD Month",
//             fieldtype: "Select",
//             fieldname: "month",
//             options: [
//                 "January","February","March","April","May","June",
//                 "July","August","September","October","November","December"
//             ].join("\n"),
//             reqd: 1,
//             change() { loadData(); }
//         },
//         render_input: true
//     });
//     month_filter.set_value(currentMonth);

//     /* ── Unit ── */
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
//                         .map(d => ({ label: d.label, value: String(d.value), description: "" }));
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
//                 }
//             }
//         },
//         render_input: true
//     });
//     addSelectAllButton(unit_filter);

//     /* ── Cost Center ── */
//     let cc_col = make_field();
//     let cost_center_filter = frappe.ui.form.make_control({
//         parent: cc_col,
//         df: {
//             label: "Cost Center",
//             fieldtype: "MultiSelectList",
//             fieldname: "cost_center",
//             options: [],
//             change() {}
//         },
//         render_input: true
//     });
//     addSelectAllButton(cost_center_filter);

//     /* ── Location Code ── */
//     let lc_col = make_field();
//     let location_code_filter = frappe.ui.form.make_control({
//         parent: lc_col,
//         df: {
//             label: "Location Code",
//             fieldtype: "MultiSelectList",
//             fieldname: "location_code",
//             options: [],
//             change() {}
//         },
//         render_input: true
//     });
//     addSelectAllButton(location_code_filter);

//     /* ── Get Report button ── */
//     let btn_col = make_field();
//     let load_button = frappe.ui.form.make_control({
//         parent: btn_col,
//         df: {
//             label: " ",
//             fieldtype: "Button",
//             fieldname: "load_button",
//             click() { loadData(); }
//         },
//         render_input: true
//     });
//     load_button.$wrapper.find('button').addClass("btn-primary").text("Get Report");
//     load_button.$wrapper.css("margin-top", "26px");
//     /* ------------------------------------------------
//        LOAD COST CENTERS
//     --------------------------------------------------*/
//     function loadCostCenters(units) {
//         cost_center_filter.set_value([]);
//         frappe.call({
//             method: "annual_budget.api.filter_options.get_cost_centers_by_set_id",
//             args: { units: units.join(",") },
//             callback(r) {
//                 let api_options = (r.message?.data || [])
//                     .filter(d => d.value)
//                     .map(d => ({
//                         label: d.label,
//                         value: String(d.value),
//                         description: "",
//                         erp_cost_center_value: String(d.erp_cost_center_value)
//                     }));
//                 cost_center_filter.df.options = mergeSelectedOptions(cost_center_filter, api_options);
//                 cost_center_filter.refresh();
//             }
//         });
//     }

//     /* ------------------------------------------------
//        LOAD LOCATION CODES
//     --------------------------------------------------*/
//     function loadLocationCodes(units) {
//         location_code_filter.set_value([]);
//         frappe.call({
//             method: "annual_budget.api.filter_options.get_location_codes_by_unit",
//             args: { unit: units.join(",") },
//             callback(r) {
//                 let api_options = (r.message?.data || [])
//                     .filter(d => d.value)
//                     .map(d => ({
//                         label: d.label,
//                         value: String(d.value),
//                         description: "",
//                         erp_loc_value: String(d.erp_loc_value)
//                     }));
//                 location_code_filter.df.options = mergeSelectedOptions(location_code_filter, api_options);
//                 location_code_filter.refresh();
//             }
//         });
//     }

//     frappe.require("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js", function () {
//         console.log("XLSX Loaded");
//     });

//     /* ------------------------------------------------
//        MAIN CONTAINER
//     --------------------------------------------------*/
//     const container = $(`
//         <div id="tables-container">
//             <div class="card-row" id="cards-container"></div>
//             <div id="controls-row">
//                 <input id="global-search-box" type="text"
//                     placeholder="Search Expense / Sub Head / Item...">
//                 <div id="controls-right">
//                     <label id="expand-all-wrapper">
//                         <input type="checkbox" id="expand-all-checkbox">
//                         Expand All
//                     </label>
//                     <button id="export-excel-btn">&#8595; Export to Excel</button>
//                 </div>
//             </div>
//             <div class="scroll-wrapper">
//                 <table class="university-table" id="phase-table"></table>
//             </div>
//         </div>
//     `);

//     $(page.body).append(container);

//     /* ------------------------------------------------
//        SEARCH — bound directly to element (fixes event loss)
//     --------------------------------------------------*/
//     container.find('#global-search-box').on('input keyup', function () {
//         searchText = $(this).val().trim();

//         if (searchText) {
//             // Auto-expand everything so matches are visible
//             expandedHeads = expense_heads.map(h => h.name);
//             expandedSubHeads = [];
//             expense_heads.forEach(head => {
//                 (head.sub_heads || []).forEach(sub => {
//                     expandedSubHeads.push(head.name + "__" + sub.name);
//                 });
//             });
//         } else {
//             // Clear search → collapse back to default
//             expandedHeads = [];
//             expandedSubHeads = [];
//             $('#expand-all-checkbox').prop('checked', false);
//         }

//         renderTable();
//     });

//     /* ------------------------------------------------
//        EXPAND ALL CHECKBOX
//     --------------------------------------------------*/
//     $(document).on('change', '#expand-all-checkbox', function () {
//         const isChecked = $(this).is(':checked');
//         if (isChecked) {
//             expandedHeads = expense_heads.map(h => h.name);
//             expandedSubHeads = [];
//             expense_heads.forEach(head => {
//                 (head.sub_heads || []).forEach(sub => {
//                     expandedSubHeads.push(head.name + "__" + sub.name);
//                 });
//             });
//         } else {
//             expandedHeads = [];
//             expandedSubHeads = [];
//         }
//         renderTable();
//     });

//     /* ------------------------------------------------
//        EXPORT TO EXCEL
//     --------------------------------------------------*/
//     $(document).on('click', '#export-excel-btn', function () {
//         exportTableToExcel();
//     });

//     function exportTableToExcel() {
//         if (typeof XLSX === "undefined") {
//             frappe.msgprint("Excel library not loaded.");
//             return;
//         }

//         let data = [["Expense Items", "Budget", "Actuals", "Util %", "Variance"]];
//         let grand_budget = 0;
//         let grand_actuals = 0;

//         expense_heads.forEach(head => {
//             const hB = Number(head.ytd || 0);
//             const hA = Number(head.total_posted_amt_ytd || 0);
//             grand_budget  += hB;
//             grand_actuals += hA;
//             data.push([head.name, hB, hA, safePercentage(hB, hA), hB - hA]);

//             (head.sub_heads || []).forEach(sub => {
//                 const sB = Number(sub.ytd || 0);
//                 const sA = Number(sub.total_posted_amt_ytd || 0);
//                 data.push(["   " + sub.name, sB, sA, safePercentage(sB, sA), sB - sA]);
//                 (sub.items || []).forEach(item => {
//                     const b = Number(item.ytd || 0);
//                     const a = Number(item.total_posted_amt || 0);
//                     data.push(["      " + item.name, b, a, safePercentage(b, a), b - a]);
//                 });
//             });

//             (head.items || []).forEach(item => {
//                 const b = Number(item.ytd || 0);
//                 const a = Number(item.total_posted_amt || 0);
//                 data.push(["   " + item.name, b, a, safePercentage(b, a), b - a]);
//             });
//         });

//         data.push(["GRAND TOTAL", grand_budget, grand_actuals,
//             safePercentage(grand_budget, grand_actuals), grand_budget - grand_actuals]);

//         const ws = XLSX.utils.aoa_to_sheet(data);
//         ws["!cols"] = [{ wch: 40 }, { wch: 15 }, { wch: 15 }, { wch: 10 }, { wch: 15 }];
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Expense Report");
//         XLSX.writeFile(wb, "Expense_Report.xlsx");
//     }

//     /* =====================================================
//        STATE
//     =====================================================*/
//     let expense_heads    = [];
//     let expandedHeads    = [];
//     let expandedSubHeads = [];
//     let searchText       = "";

//     const formatNumber = n =>
//         (Number(n) || 0).toLocaleString('en-IN', {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//         });

//     function matchesSearch(...values) {
//         return values.some(v =>
//             String(v || "").toLowerCase().includes(searchText.toLowerCase())
//         );
//     }

//     /* ------------------------------------------------
//        HELPER — GET SELECTED WITH EXTRA KEY
//     --------------------------------------------------*/
//     function getSelectedWithKey(control, key) {
//         if (!control || !control.get_value) return [];
//         return (control.get_value() || [])
//             .map(val => {
//                 let option = (control.df?.options || []).find(
//                     o => String(o?.value) === String(val)
//                 );
//                 return option?.[key] || null;
//             })
//             .filter(Boolean);
//     }

//     /* ------------------------------------------------
//        LOAD DATA
//     --------------------------------------------------*/
//     function loadData() {
//         let financial_year       = fiscal_year_filter.get_value();
//         let month                = month_filter.get_value();
//         let unit                 = (unit_filter.get_value() || []).join(",") || null;
//         let location_code        = (getSelectedWithKey(location_code_filter, "value") || []).join(",") || null;
//         let cost_center          = (getSelectedWithKey(cost_center_filter, "value") || []).join(",") || null;
//         let erp_cost_center_value = (getSelectedWithKey(cost_center_filter, "erp_cost_center_value") || []).join(",") || null;
//         let erp_loc_value        = (getSelectedWithKey(location_code_filter, "erp_loc_value") || []).join(",") || null;

//         console.log(erp_cost_center_value, "erp_cost_center_value");
//         console.log(cost_center, "cost_center_value");
//         console.log(location_code, "loc_value");

//         let missing = [];
//         if (!financial_year) missing.push("Financial Year");
//         if (!month)          missing.push("Month");
//         if (!unit)           missing.push("Unit");

//         if (missing.length) {
//             console.warn("⚠ Missing Filters:", missing.join(", "));
//             return;
//         }

//         Loader.show("We're crafting your report with care");

//         // Reset state on fresh load
//         $('#expand-all-checkbox').prop('checked', false);
//         $('#global-search-box').val("");
//         expandedHeads    = [];
//         expandedSubHeads = [];
//         searchText       = "";

//         frappe.call({
//             method: "annual_budget.api.phase_sheet.get_combined_actuals",
//             args: { financial_year, month, unit, cost_center, location_code, erp_loc_value, erp_cost_center_value }
//         })
//         .done(function(r) {
//             expense_heads = Array.isArray(r.message)
//                 ? r.message
//                 : (r.message?.message || []);
//             console.log(r, "API response");
//             renderTable();
//         })
//         .fail(function(err) {
//             console.error("API Error:", err);
//             frappe.msgprint({ title: "Error", message: "Failed to load data. Please try again.", indicator: "red" });
//         })
//         .always(function() {
//             Loader.hide();
//         });
//     }

//     function safePercentage(budget, actual) {
//         if (!budget || budget === 0) return "0.00";
//         return ((actual / budget) * 100).toFixed(2);
//     }

//     /* ------------------------------------------------
//        RENDER TABLE
//     --------------------------------------------------*/
//     function renderTable() {
//         renderCards(expense_heads);

//         const $table = $('#phase-table');
//         $table.html('');

//         if (!expense_heads || !expense_heads.length) {
//             $table.append(`<tr><td colspan="5" style="text-align:center;padding:20px;color:#888;">No Data Found</td></tr>`);
//             return;
//         }

//         $table.append(`
//             <thead>
//                 <tr class="main-row">
//                     <th>Expense Head</th>
//                     <th>Budget</th>
//                     <th>Actuals</th>
//                     <th>Util %</th>
//                     <th>Variance</th>
//                 </tr>
//             </thead>
//         `);

//         const $tbody     = $('<tbody></tbody>');
//         let grand_budget  = 0;
//         let grand_actuals = 0;

//         expense_heads.forEach(head => {
//             if (
//                 searchText &&
//                 !matchesSearch(head.name) &&
//                 !(head.items || []).some(i => matchesSearch(i.name)) &&
//                 !(head.sub_heads || []).some(s =>
//                     matchesSearch(s.name) ||
//                     (s.items || []).some(i => matchesSearch(i.name))
//                 )
//             ) return;

//             const headBudget = Number(head.ytd || 0);
//             const headActual = Number(head.total_posted_amt_ytd || 0);
//             const headTotal  = headBudget - headActual;
//             const headPer    = safePercentage(headBudget, headActual);

//             grand_budget  += headBudget;
//             grand_actuals += headActual;

//             $tbody.append(`
//                 <tr class="expense-head" data-head="${head.name}">
//                     <td>
//                         ${(head.items?.length || head.sub_heads?.length)
//                             ? (expandedHeads.includes(head.name) ? '▼' : '▶')
//                             : ''}
//                         ${head.name}
//                     </td>
//                     <td>${formatNumber(headBudget)}</td>
//                     <td>${formatNumber(headActual)}</td>
//                     <td class="text-blue">${headPer} %</td>
//                     <td class="text-blue">${formatNumber(headTotal)}</td>
//                 </tr>
//             `);

//             if (expandedHeads.includes(head.name)) {

//                 (head.items || []).forEach(item => {
//                     if (searchText && !matchesSearch(item.name)) return;
//                     const budget    = Number(item.ytd || 0);
//                     const actual    = Number(item.total_posted_amt || 0);
//                     const total     = budget - actual;
//                     const total_per = safePercentage(budget, actual);
//                     $tbody.append(`
//                         <tr class="line-item">
//                             <td style="padding-left:35px">${item.name}</td>
//                             <td>${formatNumber(budget)}</td>
//                             <td>${formatNumber(actual)}</td>
//                             <td>${total_per} %</td>
//                             <td>${formatNumber(total)}</td>
//                         </tr>
//                     `);
//                 });

//                 (head.sub_heads || []).forEach(sub => {
//                     const key       = head.name + "__" + sub.name;
//                     const subBudget = Number(sub.ytd || 0);
//                     const subActual = Number(sub.total_posted_amt_ytd || 0);
//                     const subTotal  = subBudget - subActual;
//                     const subPer    = safePercentage(subBudget, subActual);

//                     $tbody.append(`
//                         <tr class="sub-head" data-sub="${key}">
//                             <td style="padding-left:20px">
//                                 ${(sub.items?.length)
//                                     ? (expandedSubHeads.includes(key) ? '▼' : '▶')
//                                     : ''}
//                                 ${sub.name}
//                             </td>
//                             <td>${formatNumber(subBudget)}</td>
//                             <td>${formatNumber(subActual)}</td>
//                             <td class="text-blue">${subPer} %</td>
//                             <td class="text-blue">${formatNumber(subTotal)}</td>
//                         </tr>
//                     `);

//                     if (expandedSubHeads.includes(key)) {
//                         (sub.items || []).forEach(item => {
//                             const budget    = Number(item.ytd || 0);
//                             const actual    = Number(item.total_posted_amt || 0);
//                             const total     = budget - actual;
//                             const total_per = safePercentage(budget, actual);
//                             $tbody.append(`
//                                 <tr class="line-item">
//                                     <td style="padding-left:55px">${item.name}</td>
//                                     <td>${formatNumber(budget)}</td>
//                                     <td>${formatNumber(actual)}</td>
//                                     <td>${total_per} %</td>
//                                     <td>${formatNumber(total)}</td>
//                                 </tr>
//                             `);
//                         });
//                     }
//                 });
//             }
//         });

//         const grand_total = grand_budget - grand_actuals;
//         const grandPer    = safePercentage(grand_budget, grand_actuals);

//         $tbody.append(`
//             <tr class="grand-total-row">
//                 <td>GRAND TOTAL</td>
//                 <td>${formatNumber(grand_budget)}</td>
//                 <td>${formatNumber(grand_actuals)}</td>
//                 <td>${grandPer} %</td>
//                 <td>${formatNumber(grand_total)}</td>
//             </tr>
//         `);

//         $table.append($tbody);

//         /* ── Sync Expand All checkbox ── */
//         const allHeads   = expense_heads.map(h => h.name);
//         const allSubKeys = [];
//         expense_heads.forEach(h => {
//             (h.sub_heads || []).forEach(s => allSubKeys.push(h.name + "__" + s.name));
//         });
//         const allExpanded =
//             allHeads.length > 0 &&
//             allHeads.every(n => expandedHeads.includes(n)) &&
//             allSubKeys.every(k => expandedSubHeads.includes(k));
//         $('#expand-all-checkbox').prop('checked', allExpanded);

//         /* ── Row click handlers ── */
//         $('.expense-head').off('click').on('click', function () {
//             const name = $(this).data('head');
//             expandedHeads = expandedHeads.includes(name)
//                 ? expandedHeads.filter(x => x !== name)
//                 : [...expandedHeads, name];
//             renderTable();
//         });

//         $('.sub-head').off('click').on('click', function () {
//             const key = $(this).data('sub');
//             expandedSubHeads = expandedSubHeads.includes(key)
//                 ? expandedSubHeads.filter(x => x !== key)
//                 : [...expandedSubHeads, key];
//             renderTable();
//         });
//     }

//     /* ------------------------------------------------
//        RENDER CARDS
//     --------------------------------------------------*/
//     function renderCards(data) {
//         const cards_container = $('#cards-container');
//         cards_container.empty();

//         let grand_budget = 0;
//         let grand_actual = 0;
//         let cards_html   = "";

//         data.forEach(head => {
//             grand_budget += Number(head.ytd || 0);
//             grand_actual += Number(head.total_posted_amt_ytd || 0);
//         });

//         cards_html += createCard("Grand Total", grand_budget, grand_actual, grand_budget - grand_actual, true);

//         data.forEach(head => {
//             const hB = Number(head.ytd || 0);
//             const hA = Number(head.total_posted_amt_ytd || 0);
//             cards_html += createCard(head.name, hB, hA, hB - hA);

//             (head.sub_heads || []).forEach(sub => {
//                 const sB = Number(sub.ytd || 0);
//                 const sA = Number(sub.total_posted_amt_ytd || 0);
//                 cards_html += createCard(sub.name, sB, sA, sB - sA, false, true);
//             });
//         });

//         cards_container.append(cards_html);
//     }

//     function createCard(title, budget, actual, variance, isGrand = false, isSub = false) {
//         const utilization = budget > 0 ? ((actual / budget) * 100).toFixed(2) : "0.00";
//         return `
//             <div class="number-card ${isGrand ? 'grand' : ''} ${isSub ? 'sub' : ''}">
//                 <div class="number-title">${title}</div>
//                 <div class="kpi-row">
//                     <div class="kpi-block">
//                         <div class="kpi-label">Budget</div>
//                         <div class="kpi-value">${formatNumber(budget)}</div>
//                     </div>
//                     <div class="kpi-block">
//                         <div class="kpi-label">Actual</div>
//                         <div class="kpi-value">${formatNumber(actual)}</div>
//                     </div>
//                 </div>
//                 <div class="kpi-bottom">
//                     <div class="kpi-block">
//                         <div class="kpi-label">Variance</div>
//                         <div class="kpi-value">${formatNumber(variance)}</div>
//                     </div>
//                     <div class="kpi-block">
//                         <div class="kpi-label">Util %</div>
//                         <div class="kpi-value">${utilization} %</div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }
// };





frappe.pages['budget-actuals-phase'].on_page_load = function(wrapper) {
    const style = `
    <style>

    /* ══════════════════════════════════════════
       BASE / DESKTOP
    ══════════════════════════════════════════ */

    #tables-container {
        margin: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        padding: 8px;
    }

    /* ── Controls row ── */
    #controls-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        padding: 8px 10px;
        background: #f7f9fb;
        border: 1px solid #dcdcdc;
        border-radius: 6px;
    }

    #global-search-box {
        flex: 1 1 200px;
        min-width: 0;
        max-width: 320px;
        padding: 7px 12px;
        border: 1px solid #aaa;
        border-radius: 6px;
        font-size: 13px;
        box-sizing: border-box;
    }

    #controls-right {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
    }

    /* ── Expand-All checkbox ── */
    #expand-all-wrapper {
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 13px;
        font-weight: 600;
        color: #444;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
    }

    #expand-all-checkbox {
        width: 16px;
        height: 16px;
        accent-color: #0076B6;
        cursor: pointer;
    }

    /* ── Export button – Frappe primary style ── */
    #export-excel-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        font-size: 13px;
        font-weight: 600;
        color: #fff !important;
        background-color: #0076B6;
        border: 1px solid #0076B6;
        border-radius: 6px;
        cursor: pointer;
        transition: background .15s ease, box-shadow .15s ease;
        white-space: nowrap;
        line-height: 1.5;
        box-shadow: 0 1px 3px rgba(0,0,0,.12);
        text-decoration: none;
    }

    #export-excel-btn:hover {
        background-color: #005f94;
        border-color: #005f94;
        box-shadow: 0 3px 8px rgba(0,118,182,.35);
    }

    #export-excel-btn:active {
        background-color: #004f7a;
        border-color: #004f7a;
        box-shadow: none;
    }

    /* ── Table wrapper ── */
    .scroll-wrapper {
        border: 1px solid #ccc;
        border-radius: 6px;
        overflow-x: auto;
        overflow-y: auto;
        max-height: 70vh;
        background: #fff;
        -webkit-overflow-scrolling: touch;
    }

    table.university-table {
        min-width: 700px;
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
    }

    table.university-table th,
    table.university-table td {
        border: 1px solid #ddd;
        padding: 8px 10px;
        white-space: nowrap;
        vertical-align: middle;
        text-align: center;
        background: #fff !important;
    }

    table.university-table th:first-child,
    table.university-table td:first-child {
        text-align: left !important;
    }

    table.university-table thead tr.main-row th {
        background-color: #0076B6 !important;
        color: #fff !important;
        position: sticky;
        top: 0;
        z-index: 25;
    }

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
        cursor: pointer;
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

    tr.grand-total-row td {
        background: #003B63 !important;
        color: #fff !important;
        font-weight: 700 !important;
    }

    /* ── Cards ── */
    .card-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
        margin: 14px 20px;
    }

    .number-card {
        background: #ffffff;
        border: 1px solid #dcdcdc;
        border-radius: 8px;
        padding: 14px 16px;
        box-shadow: 0 2px 6px rgba(0,0,0,.06);
        transition: .15s ease;
    }

    .number-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(0,0,0,.12);
    }

    .number-title {
        font-size: 12px;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
        margin-bottom: 6px;
    }

    .number-value {
        font-size: 20px;
        font-weight: 700;
        color: #0076B6;
    }

    .number-card.grand {
        border: 2px solid #0076B6;
        background: #F4F9FD;
    }

    .number-card.grand .number-value {
        font-size: 24px;
        font-weight: 800;
    }

    /* ══════════════════════════════════════════
       TABLET  ≤ 1024px  →  2-col cards
    ══════════════════════════════════════════ */
    @media (max-width: 1024px) {
        .card-row {
            grid-template-columns: repeat(2, 1fr);
        }
        #global-search-box {
            max-width: 100%;
        }
    }

    /* ══════════════════════════════════════════
       MOBILE  ≤ 600px  →  single column
    ══════════════════════════════════════════ */
    @media (max-width: 600px) {
        #tables-container {
            margin: 8px;
            padding: 6px;
        }
        #controls-row {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
            padding: 8px;
        }
        #global-search-box {
            max-width: 100%;
            width: 100%;
        }
        #controls-right {
            justify-content: space-between;
            width: 100%;
        }
        #export-excel-btn {
            flex: 1;
            justify-content: center;
        }
        .card-row {
            grid-template-columns: 1fr;
            margin: 8px;
            gap: 10px;
        }
        .number-card.grand .number-value {
            font-size: 20px;
        }
        table.university-table {
            font-size: 12px;
        }
        table.university-table th,
        table.university-table td {
            padding: 6px 8px;
        }
        tr.line-item td:first-child {
            padding-left: 20px !important;
        }
        tr.sub-head td:first-child {
            padding-left: 14px !important;
        }
    }

    </style>
    `;

    $('head').append(style);

    if (!$("#global-loader").length) {
        $("body").append(`
            <div id="global-loader" class="loader-overlay">
                <div class="loader-box">
                    <img src="/files/APF logo.png" class="loader-logo">
                    <div class="loader-text">Loading, please wait…</div>
                </div>
            </div>
        `);
    }

    $("#global-loader").hide();

    const Loader = {
        show(message = "Loading, please wait…") {
            const loader = $("#global-loader");
            if (!loader.length) return;
            loader.find(".loader-text").text(message);
            loader.fadeIn(200);
        },
        hide() {
            const loader = $("#global-loader");
            if (!loader.length) return;
            loader.fadeOut(200);
        }
    };

    /* =====================================================
       PAGE
    =====================================================*/
    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Budget vs Actuals Face Sheet',
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

        /* Full screen loader overlay */
        #global-loader.loader-overlay {
            position: fixed;
            inset: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(18, 18, 18, 0.92);
            backdrop-filter: blur(6px);
            display: none;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .loader-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 14px;
        }

        .loader-logo {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background: linear-gradient(145deg, #ffffff, #eaeaea);
            padding: 14px;
            object-fit: contain;
            box-shadow: 0 10px 30px rgba(0,0,0,.35), 0 0 0 4px rgba(255,255,255,.08);
            animation: pulse 1.6s infinite ease-in-out;
        }

        .loader-text {
            margin-top: 6px;
            font-size: 14px;
            color: #ffffff;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-align: center;
            opacity: 0.85;
        }

        .loader-text::after {
            content: "";
            display: inline-block;
            width: 1em;
            animation: dots 1.5s infinite;
        }

        @keyframes pulse {
            0%   { transform: scale(1);    opacity: 0.8; box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
            50%  { transform: scale(1.08); opacity: 1;   box-shadow: 0 0 20px 8px rgba(255,255,255,0.15); }
            100% { transform: scale(1);    opacity: 0.8; box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
        }

        @keyframes dots {
            0%   { content: ""; }
            33%  { content: "."; }
            66%  { content: ".."; }
            100% { content: "..."; }
        }

        .kpi-row,
        .kpi-bottom {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
        }

        .kpi-block { text-align: left; }

        .kpi-label {
            font-size: 11px;
            color: #777;
            text-transform: uppercase;
        }

        .kpi-value {
            font-size: 14px;
            font-weight: 700;
            color: #000;
        }

        .kpi-bottom {
            margin-top: 10px;
            padding-top: 8px;
            border-top: 1px solid #eee;
        }

        .number-card.sub {
            background: #fafafa;
            border-left: 4px solid #ccc;
        }

        /* Filter row responsive */
        @media (max-width: 768px) {
            .custom-filter-row { padding: 10px; }
            .custom-filter-row .col-md-4 { width: 100%; margin-bottom: 8px; }
        }
    </style>`).appendTo("head");

    function make_field() {
        return $(`<div class="col-md-4 col-sm-12"></div>`).appendTo(filter_section);
    }

    function mergeSelectedOptions(control, new_options) {
        let selected = (control.get_value() || []).map(String);
        let existing = control.df.options || [];
        let map = {};
        existing.forEach(o => map[String(o.value)] = o);
        new_options.forEach(o => map[String(o.value)] = o);
        selected.forEach(v => {
            if (!map[v]) map[v] = { label: v, value: v, description: "" };
        });
        return Object.values(map);
    }

    // ──────────────────────────────────────────────────────────────
    // IMPROVED Select All – with fallback polling + debug logs
    // ──────────────────────────────────────────────────────────────
    // function addSelectAllButton(control, fieldnameForDebug = '') {
    //     if (!control || !control.$wrapper) {
    //         console.warn(`addSelectAllButton: No wrapper for ${fieldnameForDebug}`);
    //         return;
    //     }

    //     let buttonAdded = false;

    //     // 1. MutationObserver – primary method
    //     const observer = new MutationObserver((mutations) => {
    //         if (buttonAdded) return;

    //         const footer = control.$wrapper.find('.dropdown-footer');
    //         const list   = control.$wrapper.find('.multiselect-list, .awesomplete, .dropdown-menu');

    //         if (footer.length && list.length && !footer.find('.select-all-btn').length) {
    //             console.log(`[${fieldnameForDebug}] Dropdown footer detected → adding Select All`);
    //             addTheButton(footer);
    //             buttonAdded = true;
    //             observer.disconnect();
    //         } else if (footer.length || list.length) {
    //             console.log(`[${fieldnameForDebug}] Partial dropdown found (footer:${footer.length}, list:${list.length})`);
    //         }
    //     });

    //     observer.observe(control.$wrapper[0], {
    //         childList: true,
    //         subtree: true,
    //         attributes: true,
    //         characterData: true
    //     });

    //     // 2. Fallback polling (every 300ms for ~5 seconds)
    //     let pollCount = 0;
    //     const pollInterval = setInterval(() => {
    //         pollCount++;
    //         if (buttonAdded || pollCount > 15) {
    //             clearInterval(pollInterval);
    //             return;
    //         }

    //         const footer = control.$wrapper.find('.dropdown-footer');
    //         if (footer.length && !footer.find('.select-all-btn').length) {
    //             console.log(`[${fieldnameForDebug}] Polling success – footer appeared`);
    //             addTheButton(footer);
    //             buttonAdded = true;
    //             clearInterval(pollInterval);
    //             observer.disconnect();
    //         }
    //     }, 300);

    //     // Helper: create & attach button
    //     function addTheButton(footer) {
    //         let btn = $(`
    //             <button type="button" class="btn btn-xs btn-default select-all-btn"
    //                 style="margin: 4px 6px;">
    //                 Select All
    //             </button>
    //         `);

    //         btn.on("click", async function (e) {
    //             e.stopPropagation();
    //             e.preventDefault();

    //             console.log(`[${fieldnameForDebug}] Select All clicked`);

    //             let values = [];
    //             try {
    //                 if (control.get_data) {
    //                     let data = await control.get_data();
    //                     values = data.map(d => String(d.value || d));
    //                 } else if (control.df && control.df.options) {
    //                     values = control.df.options.map(o => String(typeof o === "object" ? o.value : o));
    //                 }
    //                 if (values.length) {
    //                     control.set_value(values);
    //                     console.log(`[${fieldnameForDebug}] Selected ${values.length} items`);
    //                 } else {
    //                     console.warn(`[${fieldnameForDebug}] No values to select`);
    //                 }
    //             } catch (err) {
    //                 console.error(`[${fieldnameForDebug}] Select All error:`, err);
    //             }
    //         });

    //         footer.prepend(btn);
    //         console.log(`[${fieldnameForDebug}] Select All button added`);
    //     }

    //     // Initial delayed check
    //     setTimeout(() => {
    //         const footer = control.$wrapper.find('.dropdown-footer');
    //         if (footer.length && !footer.find('.select-all-btn').length) {
    //             console.log(`[${fieldnameForDebug}] Initial check success`);
    //             addTheButton(footer);
    //             buttonAdded = true;
    //         }
    //     }, 800);
    // }
function addSelectAllButton(control, fieldnameForDebug = '') {
    if (!control || !control.$input) return;

    control.$input.on("focus", function () {

        setTimeout(() => {

            const dropdown = $('.multiselect-dropdown:visible').last();
            if (!dropdown.length) return;

            const actions = dropdown.find('.multiselect-actions');
            if (!actions.length) return;

            // 🔥 Remove any existing injected buttons first
            actions.find('.custom-select-all-btn').remove();

            const btn = $(`
                <button type="button"
                    class="btn btn-xs btn-default custom-select-all-btn"
                    style="margin-right:8px;">
                    Select All
                </button>
            `);

            btn.on("click", async function (e) {
                e.stopPropagation();
                e.preventDefault();

                let values = [];

                try {
                    if (control.get_data) {
                        let data = await control.get_data();
                        values = data.map(d => String(d.value || d));
                    } else if (control.df && control.df.options) {
                        values = control.df.options.map(o =>
                            String(typeof o === "object" ? o.value : o)
                        );
                    }

                    if (values.length) {
                        control.set_value(values);
                    }

                } catch (err) {
                    console.error(err);
                }
            });

            // Insert beside Clear All
            actions.prepend(btn);

        }, 120);
    });
}
    /* ── Financial Year ── */
    let fy_col = make_field();
    let fiscal_year_filter = frappe.ui.form.make_control({
        parent: fy_col,
        df: {
            label: "Financial Year",
            fieldtype: "Select",
            fieldname: "financial_year",
            options: ["2025-26", "2026-27","2027-28"].join("\n"),
            default: "2025-26",
            reqd: 1,
            change() { 

             }
        },
        render_input: true
    });

    /* ── YTD Month ── */
    let month_col = make_field();
    let currentMonth = new Date().toLocaleString('default', { month: 'long' });
    let month_filter = frappe.ui.form.make_control({
        parent: month_col,
        df: {
            label: "YTD Month",
            fieldtype: "Select",
            fieldname: "month",
            options: [
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
            ].join("\n"),
            reqd: 1,
            change() { 
                
             }
        },
        render_input: true
    });
    month_filter.set_value(currentMonth);


    /* ── Theme ── */
let theme_col = make_field();

let theme_filter = frappe.ui.form.make_control({
    parent: theme_col,
    df: {
        label: "Theme",
        fieldtype: "MultiSelectList",
        fieldname: "theme",
        reqd: 1,

        get_data() {
            return frappe.call({
                method: "annual_budget.api.filter_options.get_overview_number_cards"
            }).then(r => {

                return (r.message || []).map(d => ({
                    label: d.number_card_title,  // what user sees
                    value: d.name,               // actual value
                    description: ""
                }));

            });
        },

        change() {
            let selected_themes = theme_filter.get_value().map(String);
            console.log("Selected:", selected_themes);

            // Example usage
            // You can reload cards here if needed
        }
    },
    render_input: true
});
    /* ── Unit ── */
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
                        .map(d => ({ label: d.label, value: String(d.value), description: "" }));
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
                }
            }
        },
        render_input: true
    });

    addSelectAllButton(unit_filter, "Unit");

    /* ── Cost Center ── */
    let cc_col = make_field();
    let cost_center_filter = frappe.ui.form.make_control({
        parent: cc_col,
        df: {
            label: "Cost Center",
            fieldtype: "MultiSelectList",
            fieldname: "cost_center",
            options: [],
            change() {}
        },
        render_input: true
    });
    addSelectAllButton(cost_center_filter, "Cost Center");

    /* ── Location Code ── */
    let lc_col = make_field();
    let location_code_filter = frappe.ui.form.make_control({
        parent: lc_col,
        df: {
            label: "Location Code",
            fieldtype: "MultiSelectList",
            fieldname: "location_code",
            options: [],
            change() {}
        },
        render_input: true
    });
    addSelectAllButton(location_code_filter, "Location Code");

    /* ── Get Report button ── */
    let btn_col = make_field();
    let load_button = frappe.ui.form.make_control({
        parent: btn_col,
        df: {
            label: " ",
            fieldtype: "Button",
            fieldname: "load_button",
            click() { loadData(); }
        },
        render_input: true
    });
    load_button.$wrapper.find('button').addClass("btn-primary").text("Get Report");
    load_button.$wrapper.css("margin-top", "26px");

    frappe.require("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js", function () {
        console.log("XLSX Loaded");
    });

    /* ------------------------------------------------
       MAIN CONTAINER
    --------------------------------------------------*/
    const container = $(`
        <div id="tables-container">
            <div class="card-row" id="cards-container"></div>
            <div id="controls-row">
                <input id="global-search-box" type="text"
                    placeholder="Search Expense / Sub Head / Item...">
                <div id="controls-right">
                    <label id="expand-all-wrapper">
                        <input type="checkbox" id="expand-all-checkbox">
                        Expand All
                    </label>
                    <button id="export-excel-btn">↓ Export to Excel</button>
                </div>
            </div>
            <div class="scroll-wrapper">
                <table class="university-table" id="phase-table"></table>
            </div>
        </div>
    `);

    $(page.body).append(container);

    /* ------------------------------------------------
       SEARCH
    --------------------------------------------------*/
    container.find('#global-search-box').on('input keyup', function () {
        searchText = $(this).val().trim();

        if (searchText) {
            expandedHeads = expense_heads.map(h => h.name);
            expandedSubHeads = [];
            expense_heads.forEach(head => {
                (head.sub_heads || []).forEach(sub => {
                    expandedSubHeads.push(head.name + "__" + sub.name);
                });
            });
        } else {
            expandedHeads = [];
            expandedSubHeads = [];
            $('#expand-all-checkbox').prop('checked', false);
        }

        renderTable();
    });

    /* ------------------------------------------------
       EXPAND ALL CHECKBOX
    --------------------------------------------------*/
    $(document).on('change', '#expand-all-checkbox', function () {
        const isChecked = $(this).is(':checked');
        if (isChecked) {
            expandedHeads = expense_heads.map(h => h.name);
            expandedSubHeads = [];
            expense_heads.forEach(head => {
                (head.sub_heads || []).forEach(sub => {
                    expandedSubHeads.push(head.name + "__" + sub.name);
                });
            });
        } else {
            expandedHeads = [];
            expandedSubHeads = [];
        }
        renderTable();
    });

    /* ------------------------------------------------
       EXPORT TO EXCEL
    --------------------------------------------------*/
    $(document).on('click', '#export-excel-btn', function () {
        exportTableToExcel();
    });

    function exportTableToExcel() {
        if (typeof XLSX === "undefined") {
            frappe.msgprint("Excel library not loaded.");
            return;
        }

        let data = [["Expense Items", "Budget", "Actuals", "Util %", "Variance"]];
        let grand_budget = 0;
        let grand_actuals = 0;

        expense_heads.forEach(head => {
            const hB = Number(head.ytd || 0);
            const hA = Number(head.total_posted_amt_ytd || 0);
            grand_budget  += hB;
            grand_actuals += hA;
            data.push([head.name, hB, hA, safePercentage(hB, hA), hB - hA]);

            (head.sub_heads || []).forEach(sub => {
                const sB = Number(sub.ytd || 0);
                const sA = Number(sub.total_posted_amt_ytd || 0);
                data.push(["   " + sub.name, sB, sA, safePercentage(sB, sA), sB - sA]);
                (sub.items || []).forEach(item => {
                    const b = Number(item.ytd || 0);
                    const a = Number(item.total_posted_amt || 0);
                    data.push(["      " + item.name, b, a, safePercentage(b, a), b - a]);
                });
            });

            (head.items || []).forEach(item => {
                const b = Number(item.ytd || 0);
                const a = Number(item.total_posted_amt || 0);
                data.push(["   " + item.name, b, a, safePercentage(b, a), b - a]);
            });
        });

        data.push(["GRAND TOTAL", grand_budget, grand_actuals,
            safePercentage(grand_budget, grand_actuals), grand_budget - grand_actuals]);

        const ws = XLSX.utils.aoa_to_sheet(data);
        ws["!cols"] = [{ wch: 40 }, { wch: 15 }, { wch: 15 }, { wch: 10 }, { wch: 15 }];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Expense Report");
        XLSX.writeFile(wb, "Expense_Report.xlsx");
    }

    /* =====================================================
       STATE
    =====================================================*/
    let expense_heads    = [];
    let expandedHeads    = [];
    let expandedSubHeads = [];
    let searchText       = "";

    const formatNumber = n =>
        (Number(n) || 0).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    function matchesSearch(...values) {
        return values.some(v =>
            String(v || "").toLowerCase().includes(searchText.toLowerCase())
        );
    }

    function getSelectedWithKey(control, key) {
        if (!control || !control.get_value) return [];
        return (control.get_value() || [])
            .map(val => {
                let option = (control.df?.options || []).find(
                    o => String(o?.value) === String(val)
                );
                return option?.[key] || null;
            })
            .filter(Boolean);
    }

    /* ------------------------------------------------
       LOAD COST CENTERS / LOCATION CODES
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
                        value: String(d.value),
                        description: "",
                        erp_cost_center_value: String(d.erp_cost_center_value)
                    }));
                cost_center_filter.df.options = mergeSelectedOptions(cost_center_filter, api_options);
                cost_center_filter.refresh();
            }
        });
    }

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
                        description: "",
                        erp_loc_value: String(d.erp_loc_value)
                    }));
                location_code_filter.df.options = mergeSelectedOptions(location_code_filter, api_options);
                location_code_filter.refresh();
            }
        });
    }

    /* ------------------------------------------------
       LOAD DATA
    --------------------------------------------------*/
    function loadData() {
        let financial_year       = fiscal_year_filter.get_value();
        let month                = month_filter.get_value();
        let unit                 = (unit_filter.get_value() || []).join(",") || null;
        let location_code        = (getSelectedWithKey(location_code_filter, "value") || []).join(",") || null;
        let cost_center          = (getSelectedWithKey(cost_center_filter, "value") || []).join(",") || null;
        let erp_cost_center_value = (getSelectedWithKey(cost_center_filter, "erp_cost_center_value") || []).join(",") || null;
        let erp_loc_value        = (getSelectedWithKey(location_code_filter, "erp_loc_value") || []).join(",") || null;

        let missing = [];
        if (!financial_year) missing.push("Financial Year");
        if (!month)          missing.push("Month");
        if (!unit)           missing.push("Unit");

        if (missing.length) {
            console.warn("⚠ Missing Filters:", missing.join(", "));
            return;
        }

        Loader.show("We're crafting your report with care");

        $('#expand-all-checkbox').prop('checked', false);
        $('#global-search-box').val("");
        expandedHeads    = [];
        expandedSubHeads = [];
        searchText       = "";

        frappe.call({
            method: "annual_budget.api.phase_sheet.get_combined_actuals",
            args: { financial_year, month, unit, cost_center, location_code, erp_loc_value, erp_cost_center_value }
        })
        .done(function(r) {
            expense_heads = Array.isArray(r.message)
                ? r.message
                : (r.message?.message || []);
            console.log(r, "API response");
            renderTable();
        })
        .fail(function(err) {
            console.error("API Error:", err);
            frappe.msgprint({ title: "Error", message: "Failed to load data. Please try again.", indicator: "red" });
        })
        .always(function() {
            Loader.hide();
        });
    }

    function safePercentage(budget, actual) {
        if (!budget || budget === 0) return "0.00";
        return ((actual / budget) * 100).toFixed(2);
    }

    /* ------------------------------------------------
       RENDER TABLE
    --------------------------------------------------*/
    function renderTable() {
        renderCards(expense_heads);

        const $table = $('#phase-table');
        $table.html('');

        if (!expense_heads || !expense_heads.length) {
            $table.append(`<tr><td colspan="5" style="text-align:center;padding:20px;color:#888;">No Data Found</td></tr>`);
            return;
        }

        $table.append(`
            <thead>
                <tr class="main-row">
                    <th>Expense Head</th>
                    <th>Budget</th>
                    <th>Actuals</th>
                    <th>Util %</th>
                    <th>Variance</th>
                </tr>
            </thead>
        `);

        const $tbody     = $('<tbody></tbody>');
        let grand_budget  = 0;
        let grand_actuals = 0;

        expense_heads.forEach(head => {
            if (
                searchText &&
                !matchesSearch(head.name) &&
                !(head.items || []).some(i => matchesSearch(i.name)) &&
                !(head.sub_heads || []).some(s =>
                    matchesSearch(s.name) ||
                    (s.items || []).some(i => matchesSearch(i.name))
                )
            ) return;

            const headBudget = Number(head.ytd || 0);
            const headActual = Number(head.total_posted_amt_ytd || 0);
            const headTotal  = headBudget - headActual;
            const headPer    = safePercentage(headBudget, headActual);

            grand_budget  += headBudget;
            grand_actuals += headActual;

            $tbody.append(`
                <tr class="expense-head" data-head="${head.name}">
                    <td>
                        ${(head.items?.length || head.sub_heads?.length)
                            ? (expandedHeads.includes(head.name) ? '▼' : '▶')
                            : ''}
                        ${head.name}
                    </td>
                    <td>${formatNumber(headBudget)}</td>
                    <td>${formatNumber(headActual)}</td>
                    <td class="text-blue">${headPer} %</td>
                    <td class="text-blue">${formatNumber(headTotal)}</td>
                </tr>
            `);

            if (expandedHeads.includes(head.name)) {

                (head.items || []).forEach(item => {
                    if (searchText && !matchesSearch(item.name)) return;
                    const budget    = Number(item.ytd || 0);
                    const actual    = Number(item.total_posted_amt || 0);
                    const total     = budget - actual;
                    const total_per = safePercentage(budget, actual);
                    $tbody.append(`
                        <tr class="line-item">
                            <td style="padding-left:35px">${item.name}</td>
                            <td>${formatNumber(budget)}</td>
                            <td>${formatNumber(actual)}</td>
                            <td>${total_per} %</td>
                            <td>${formatNumber(total)}</td>
                        </tr>
                    `);
                });

                (head.sub_heads || []).forEach(sub => {
                    const key       = head.name + "__" + sub.name;
                    const subBudget = Number(sub.ytd || 0);
                    const subActual = Number(sub.total_posted_amt_ytd || 0);
                    const subTotal  = subBudget - subActual;
                    const subPer    = safePercentage(subBudget, subActual);

                    $tbody.append(`
                        <tr class="sub-head" data-sub="${key}">
                            <td style="padding-left:20px">
                                ${(sub.items?.length)
                                    ? (expandedSubHeads.includes(key) ? '▼' : '▶')
                                    : ''}
                                ${sub.name}
                            </td>
                            <td>${formatNumber(subBudget)}</td>
                            <td>${formatNumber(subActual)}</td>
                            <td class="text-blue">${subPer} %</td>
                            <td class="text-blue">${formatNumber(subTotal)}</td>
                        </tr>
                    `);

                    if (expandedSubHeads.includes(key)) {
                        (sub.items || []).forEach(item => {
                            const budget    = Number(item.ytd || 0);
                            const actual    = Number(item.total_posted_amt || 0);
                            const total     = budget - actual;
                            const total_per = safePercentage(budget, actual);
                            $tbody.append(`
                                <tr class="line-item">
                                    <td style="padding-left:55px">${item.name}</td>
                                    <td>${formatNumber(budget)}</td>
                                    <td>${formatNumber(actual)}</td>
                                    <td>${total_per} %</td>
                                    <td>${formatNumber(total)}</td>
                                </tr>
                            `);
                        });
                    }
                });
            }
        });

        const grand_total = grand_budget - grand_actuals;
        const grandPer    = safePercentage(grand_budget, grand_actuals);

        $tbody.append(`
            <tr class="grand-total-row">
                <td>GRAND TOTAL</td>
                <td>${formatNumber(grand_budget)}</td>
                <td>${formatNumber(grand_actuals)}</td>
                <td>${grandPer} %</td>
                <td>${formatNumber(grand_total)}</td>
            </tr>
        `);

        $table.append($tbody);

        /* ── Sync Expand All checkbox ── */
        const allHeads   = expense_heads.map(h => h.name);
        const allSubKeys = [];
        expense_heads.forEach(h => {
            (h.sub_heads || []).forEach(s => allSubKeys.push(h.name + "__" + s.name));
        });
        const allExpanded =
            allHeads.length > 0 &&
            allHeads.every(n => expandedHeads.includes(n)) &&
            allSubKeys.every(k => expandedSubHeads.includes(k));
        $('#expand-all-checkbox').prop('checked', allExpanded);

        /* ── Row click handlers ── */
        $('.expense-head').off('click').on('click', function () {
            const name = $(this).data('head');
            expandedHeads = expandedHeads.includes(name)
                ? expandedHeads.filter(x => x !== name)
                : [...expandedHeads, name];
            renderTable();
        });

        $('.sub-head').off('click').on('click', function () {
            const key = $(this).data('sub');
            expandedSubHeads = expandedSubHeads.includes(key)
                ? expandedSubHeads.filter(x => x !== key)
                : [...expandedSubHeads, key];
            renderTable();
        });
    }

    /* ------------------------------------------------
       RENDER CARDS
    --------------------------------------------------*/
    function renderCards(data) {
        const cards_container = $('#cards-container');
        cards_container.empty();

        let grand_budget = 0;
        let grand_actual = 0;
        let cards_html   = "";

        data.forEach(head => {
            grand_budget += Number(head.ytd || 0);
            grand_actual += Number(head.total_posted_amt_ytd || 0);
        });

        cards_html += createCard("Grand Total", grand_budget, grand_actual, grand_budget - grand_actual, true);

        data.forEach(head => {
            const hB = Number(head.ytd || 0);
            const hA = Number(head.total_posted_amt_ytd || 0);
            cards_html += createCard(head.name, hB, hA, hB - hA);

            (head.sub_heads || []).forEach(sub => {
                const sB = Number(sub.ytd || 0);
                const sA = Number(sub.total_posted_amt_ytd || 0);
                cards_html += createCard(sub.name, sB, sA, sB - sA, false, true);
            });
        });

        cards_container.append(cards_html);
    }

    function createCard(title, budget, actual, variance, isGrand = false, isSub = false) {
        const utilization = budget > 0 ? ((actual / budget) * 100).toFixed(2) : "0.00";
        return `
            <div class="number-card ${isGrand ? 'grand' : ''} ${isSub ? 'sub' : ''}">
                <div class="number-title">${title}</div>
                <div class="kpi-row">
                    <div class="kpi-block">
                        <div class="kpi-label">Budget</div>
                        <div class="kpi-value">${formatNumber(budget)}</div>
                    </div>
                    <div class="kpi-block">
                        <div class="kpi-label">Actual</div>
                        <div class="kpi-value">${formatNumber(actual)}</div>
                    </div>
                </div>
                <div class="kpi-bottom">
                    <div class="kpi-block">
                        <div class="kpi-label">Variance</div>
                        <div class="kpi-value">${formatNumber(variance)}</div>
                    </div>
                    <div class="kpi-block">
                        <div class="kpi-label">Util %</div>
                        <div class="kpi-value">${utilization} %</div>
                    </div>
                </div>
            </div>
        `;
    }
};






// frappe.pages['budget-actuals-phase'].on_page_load = function(wrapper) {
//     const style = `
//     <style>

//     /* ══════════════════════════════════════════
//        BASE / DESKTOP
//     ══════════════════════════════════════════ */

//     #tables-container {
//         margin: 20px;
//         background-color: #ffffff;
//         border-radius: 8px;
//         padding: 8px;
//     }

//     /* ── Controls row ── */
//     #controls-row {
//         display: flex;
//         flex-wrap: wrap;
//         justify-content: space-between;
//         align-items: center;
//         gap: 8px;
//         margin-bottom: 12px;
//         padding: 8px 10px;
//         background: #f7f9fb;
//         border: 1px solid #dcdcdc;
//         border-radius: 6px;
//     }

//     #global-search-box {
//         flex: 1 1 200px;
//         min-width: 0;
//         max-width: 320px;
//         padding: 7px 12px;
//         border: 1px solid #aaa;
//         border-radius: 6px;
//         font-size: 13px;
//         box-sizing: border-box;
//     }

//     #controls-right {
//         display: flex;
//         flex-wrap: wrap;
//         align-items: center;
//         gap: 12px;
//     }

//     /* ── Expand-All checkbox ── */
//     #expand-all-wrapper {
//         display: flex;
//         align-items: center;
//         gap: 7px;
//         font-size: 13px;
//         font-weight: 600;
//         color: #444;
//         cursor: pointer;
//         user-select: none;
//         white-space: nowrap;
//     }

//     #expand-all-checkbox {
//         width: 16px;
//         height: 16px;
//         accent-color: #0076B6;
//         cursor: pointer;
//     }

//     /* ── Export button – Frappe primary style ── */
//     #export-excel-btn {
//         display: inline-flex;
//         align-items: center;
//         gap: 6px;
//         padding: 6px 14px;
//         font-size: 13px;
//         font-weight: 600;
//         color: #fff !important;
//         background-color: #0076B6;
//         border: 1px solid #0076B6;
//         border-radius: 6px;
//         cursor: pointer;
//         transition: background .15s ease, box-shadow .15s ease;
//         white-space: nowrap;
//         line-height: 1.5;
//         box-shadow: 0 1px 3px rgba(0,0,0,.12);
//         text-decoration: none;
//     }

//     #export-excel-btn:hover {
//         background-color: #005f94;
//         border-color: #005f94;
//         box-shadow: 0 3px 8px rgba(0,118,182,.35);
//     }

//     #export-excel-btn:active {
//         background-color: #004f7a;
//         border-color: #004f7a;
//         box-shadow: none;
//     }

//     /* ── Table wrapper ── */
//     .scroll-wrapper {
//         border: 1px solid #ccc;
//         border-radius: 6px;
//         overflow-x: auto;
//         overflow-y: auto;
//         max-height: 70vh;
//         background: #fff;
//         -webkit-overflow-scrolling: touch;
//     }

//     table.university-table {
//         min-width: 700px;
//         width: 100%;
//         border-collapse: collapse;
//         font-size: 13px;
//     }

//     table.university-table th,
//     table.university-table td {
//         border: 1px solid #ddd;
//         padding: 8px 10px;
//         white-space: nowrap;
//         vertical-align: middle;
//         text-align: center;
//         background: #fff !important;
//     }

//     table.university-table th:first-child,
//     table.university-table td:first-child {
//         text-align: left !important;
//     }

//     table.university-table thead tr.main-row th {
//         background-color: #0076B6 !important;
//         color: #fff !important;
//         position: sticky;
//         top: 0;
//         z-index: 25;
//     }

//     tr.expense-head {
//         font-weight: 700;
//         cursor: pointer;
//     }

//     tr.expense-head:hover td {
//         background: #F4F9FD !important;
//     }

//     tr.sub-head {
//         background-color: #FFF3E6 !important;
//         font-weight: 600;
//         cursor: pointer;
//     }

//     tr.sub-head:hover td {
//         background-color: #FFEAD5 !important;
//     }

//     tr.line-item td:first-child {
//         padding-left: 35px !important;
//     }

//     tr.sub-head td:first-child {
//         padding-left: 20px !important;
//     }

//     .text-blue {
//         color: #0076B6;
//         font-weight: 600;
//     }

//     tr.grand-total-row td {
//         background: #003B63 !important;
//         color: #fff !important;
//         font-weight: 700 !important;
//     }

//     /* ── Cards ── */
//     .card-row {
//         display: grid;
//         grid-template-columns: repeat(4, 1fr);
//         gap: 14px;
//         margin: 14px 20px;
//     }

//     .number-card {
//         background: #ffffff;
//         border: 1px solid #dcdcdc;
//         border-radius: 8px;
//         padding: 14px 16px;
//         box-shadow: 0 2px 6px rgba(0,0,0,.06);
//         transition: .15s ease;
//     }

//     .number-card:hover {
//         transform: translateY(-2px);
//         box-shadow: 0 6px 14px rgba(0,0,0,.12);
//     }

//     .number-title {
//         font-size: 12px;
//         font-weight: 600;
//         color: #666;
//         text-transform: uppercase;
//         margin-bottom: 6px;
//     }

//     .number-value {
//         font-size: 20px;
//         font-weight: 700;
//         color: #0076B6;
//     }

//     .number-card.grand {
//         border: 2px solid #0076B6;
//         background: #F4F9FD;
//     }

//     .number-card.grand .number-value {
//         font-size: 24px;
//         font-weight: 800;
//     }

//     /* ══════════════════════════════════════════
//        TABLET  ≤ 1024px  →  2-col cards
//     ══════════════════════════════════════════ */
//     @media (max-width: 1024px) {
//         .card-row {
//             grid-template-columns: repeat(2, 1fr);
//         }
//         #global-search-box {
//             max-width: 100%;
//         }
//     }

//     /* ══════════════════════════════════════════
//        MOBILE  ≤ 600px  →  single column
//     ══════════════════════════════════════════ */
//     @media (max-width: 600px) {
//         #tables-container {
//             margin: 8px;
//             padding: 6px;
//         }
//         #controls-row {
//             flex-direction: column;
//             align-items: stretch;
//             gap: 8px;
//             padding: 8px;
//         }
//         #global-search-box {
//             max-width: 100%;
//             width: 100%;
//         }
//         #controls-right {
//             justify-content: space-between;
//             width: 100%;
//         }
//         #export-excel-btn {
//             flex: 1;
//             justify-content: center;
//         }
//         .card-row {
//             grid-template-columns: 1fr;
//             margin: 8px;
//             gap: 10px;
//         }
//         .number-card.grand .number-value {
//             font-size: 20px;
//         }
//         table.university-table {
//             font-size: 12px;
//         }
//         table.university-table th,
//         table.university-table td {
//             padding: 6px 8px;
//         }
//         tr.line-item td:first-child {
//             padding-left: 20px !important;
//         }
//         tr.sub-head td:first-child {
//             padding-left: 14px !important;
//         }
//     }

//     </style>
//     `;

//     $('head').append(style);

//     if (!$("#global-loader").length) {
//         $("body").append(`
//             <div id="global-loader" class="loader-overlay">
//                 <div class="loader-box">
//                     <img src="/files/APF logo.png" class="loader-logo">
//                     <div class="loader-text">Loading, please wait…</div>
//                 </div>
//             </div>
//         `);
//     }

//     $("#global-loader").hide();

//     const Loader = {
//         show(message = "Loading, please wait…") {
//             const loader = $("#global-loader");
//             if (!loader.length) return;
//             loader.find(".loader-text").text(message);
//             loader.fadeIn(200);
//         },
//         hide() {
//             const loader = $("#global-loader");
//             if (!loader.length) return;
//             loader.fadeOut(200);
//         }
//     };

//     /* =====================================================
//        PAGE
//     =====================================================*/
//     let page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Budget vs Actuals Face Sheet',
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

//         /* Full screen loader overlay */
//         #global-loader.loader-overlay {
//             position: fixed;
//             inset: 0;
//             width: 100vw;
//             height: 100vh;
//             background: rgba(18, 18, 18, 0.92);
//             backdrop-filter: blur(6px);
//             display: none;
//             z-index: 999999;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }

//         .loader-box {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             gap: 14px;
//         }

//         .loader-logo {
//             width: 90px;
//             height: 90px;
//             border-radius: 50%;
//             background: linear-gradient(145deg, #ffffff, #eaeaea);
//             padding: 14px;
//             object-fit: contain;
//             box-shadow: 0 10px 30px rgba(0,0,0,.35), 0 0 0 4px rgba(255,255,255,.08);
//             animation: pulse 1.6s infinite ease-in-out;
//         }

//         .loader-text {
//             margin-top: 6px;
//             font-size: 14px;
//             color: #ffffff;
//             font-weight: 600;
//             letter-spacing: 0.5px;
//             text-align: center;
//             opacity: 0.85;
//         }

//         .loader-text::after {
//             content: "";
//             display: inline-block;
//             width: 1em;
//             animation: dots 1.5s infinite;
//         }

//         @keyframes pulse {
//             0%   { transform: scale(1);    opacity: 0.8; box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
//             50%  { transform: scale(1.08); opacity: 1;   box-shadow: 0 0 20px 8px rgba(255,255,255,0.15); }
//             100% { transform: scale(1);    opacity: 0.8; box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
//         }

//         @keyframes dots {
//             0%   { content: ""; }
//             33%  { content: "."; }
//             66%  { content: ".."; }
//             100% { content: "..."; }
//         }

//         .kpi-row,
//         .kpi-bottom {
//             display: flex;
//             justify-content: space-between;
//             margin-top: 8px;
//         }

//         .kpi-block { text-align: left; }

//         .kpi-label {
//             font-size: 11px;
//             color: #777;
//             text-transform: uppercase;
//         }

//         .kpi-value {
//             font-size: 14px;
//             font-weight: 700;
//             color: #000;
//         }

//         .kpi-bottom {
//             margin-top: 10px;
//             padding-top: 8px;
//             border-top: 1px solid #eee;
//         }

//         .number-card.sub {
//             background: #fafafa;
//             border-left: 4px solid #ccc;
//         }

//         /* Filter row responsive */
//         @media (max-width: 768px) {
//             .custom-filter-row { padding: 10px; }
//             .custom-filter-row .col-md-4 { width: 100%; margin-bottom: 8px; }
//         }
//     </style>`).appendTo("head");

//     function make_field() {
//         return $(`<div class="col-md-4 col-sm-12"></div>`).appendTo(filter_section);
//     }

//     function mergeSelectedOptions(control, new_options) {
//         let selected = (control.get_value() || []).map(String);
//         let existing = control.df.options || [];
//         let map = {};
//         existing.forEach(o => map[String(o.value)] = o);
//         new_options.forEach(o => map[String(o.value)] = o);
//         selected.forEach(v => {
//             if (!map[v]) map[v] = { label: v, value: v, description: "" };
//         });
//         return Object.values(map);
//     }

//     // ──────────────────────────────────────────────────────────────
//     // IMPROVED Select All – with fallback polling + debug logs
//     // ──────────────────────────────────────────────────────────────
//     function addSelectAllButton(control, fieldnameForDebug = '') {
//         if (!control || !control.$wrapper) {
//             console.warn(`addSelectAllButton: No wrapper for ${fieldnameForDebug}`);
//             return;
//         }

//         let buttonAdded = false;

//         // 1. MutationObserver – primary method
//         const observer = new MutationObserver((mutations) => {
//             if (buttonAdded) return;

//             const footer = control.$wrapper.find('.dropdown-footer');
//             const list   = control.$wrapper.find('.multiselect-list, .awesomplete, .dropdown-menu');

//             if (footer.length && list.length && !footer.find('.select-all-btn').length) {
//                 console.log(`[${fieldnameForDebug}] Dropdown footer detected → adding Select All`);
//                 addTheButton(footer);
//                 buttonAdded = true;
//                 observer.disconnect();
//             } else if (footer.length || list.length) {
//                 console.log(`[${fieldnameForDebug}] Partial dropdown found (footer:${footer.length}, list:${list.length})`);
//             }
//         });

//         observer.observe(control.$wrapper[0], {
//             childList: true,
//             subtree: true,
//             attributes: true,
//             characterData: true
//         });

//         // 2. Fallback polling (every 300ms for ~5 seconds)
//         let pollCount = 0;
//         const pollInterval = setInterval(() => {
//             pollCount++;
//             if (buttonAdded || pollCount > 15) {
//                 clearInterval(pollInterval);
//                 return;
//             }

//             const footer = control.$wrapper.find('.dropdown-footer');
//             if (footer.length && !footer.find('.select-all-btn').length) {
//                 console.log(`[${fieldnameForDebug}] Polling success – footer appeared`);
//                 addTheButton(footer);
//                 buttonAdded = true;
//                 clearInterval(pollInterval);
//                 observer.disconnect();
//             }
//         }, 300);

//         // Helper: create & attach button
//         function addTheButton(footer) {
//             let btn = $(`
//                 <button type="button" class="btn btn-xs btn-default select-all-btn"
//                     style="margin: 4px 6px;">
//                     Select All
//                 </button>
//             `);

//             btn.on("click", async function (e) {
//                 e.stopPropagation();
//                 e.preventDefault();

//                 console.log(`[${fieldnameForDebug}] Select All clicked`);

//                 let values = [];
//                 try {
//                     if (control.get_data) {
//                         let data = await control.get_data();
//                         values = data.map(d => String(d.value || d));
//                     } else if (control.df && control.df.options) {
//                         values = control.df.options.map(o => String(typeof o === "object" ? o.value : o));
//                     }
//                     if (values.length) {
//                         control.set_value(values);
//                         console.log(`[${fieldnameForDebug}] Selected ${values.length} items`);
//                     } else {
//                         console.warn(`[${fieldnameForDebug}] No values to select`);
//                     }
//                 } catch (err) {
//                     console.error(`[${fieldnameForDebug}] Select All error:`, err);
//                 }
//             });

//             footer.prepend(btn);
//             console.log(`[${fieldnameForDebug}] Select All button added`);
//         }

//         // Initial delayed check
//         setTimeout(() => {
//             const footer = control.$wrapper.find('.dropdown-footer');
//             if (footer.length && !footer.find('.select-all-btn').length) {
//                 console.log(`[${fieldnameForDebug}] Initial check success`);
//                 addTheButton(footer);
//                 buttonAdded = true;
//             }
//         }, 800);
//     }

//     /* ── Financial Year ── */
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
//             change() { loadData(); }
//         },
//         render_input: true
//     });

//     /* ── YTD Month ── */
//     let month_col = make_field();
//     let currentMonth = new Date().toLocaleString('default', { month: 'long' });
//     let month_filter = frappe.ui.form.make_control({
//         parent: month_col,
//         df: {
//             label: "YTD Month",
//             fieldtype: "Select",
//             fieldname: "month",
//             options: [
//                 "January","February","March","April","May","June",
//                 "July","August","September","October","November","December"
//             ].join("\n"),
//             reqd: 1,
//             change() { loadData(); }
//         },
//         render_input: true
//     });
//     month_filter.set_value(currentMonth);

//     /* ── Unit ── */
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
//                         .map(d => ({ label: d.label, value: String(d.value), description: "" }));
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
//                 }
//             }
//         },
//         render_input: true
//     });
//     addSelectAllButton(unit_filter, "Unit");

//     /* ── Cost Center ── */
//     let cc_col = make_field();
//     let cost_center_filter = frappe.ui.form.make_control({
//         parent: cc_col,
//         df: {
//             label: "Cost Center",
//             fieldtype: "MultiSelectList",
//             fieldname: "cost_center",
//             options: [],
//             change() {}
//         },
//         render_input: true
//     });
//     addSelectAllButton(cost_center_filter, "Cost Center");

//     /* ── Location Code ── */
//     let lc_col = make_field();
//     let location_code_filter = frappe.ui.form.make_control({
//         parent: lc_col,
//         df: {
//             label: "Location Code",
//             fieldtype: "MultiSelectList",
//             fieldname: "location_code",
//             options: [],
//             change() {}
//         },
//         render_input: true
//     });
//     addSelectAllButton(location_code_filter, "Location Code");

//     /* ── Get Report button ── */
//     let btn_col = make_field();
//     let load_button = frappe.ui.form.make_control({
//         parent: btn_col,
//         df: {
//             label: " ",
//             fieldtype: "Button",
//             fieldname: "load_button",
//             click() { loadData(); }
//         },
//         render_input: true
//     });
//     load_button.$wrapper.find('button').addClass("btn-primary").text("Get Report");
//     load_button.$wrapper.css("margin-top", "26px");

//     frappe.require("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js", function () {
//         console.log("XLSX Loaded");
//     });

//     /* ------------------------------------------------
//        MAIN CONTAINER
//     --------------------------------------------------*/
//     const container = $(`
//         <div id="tables-container">
//             <div class="card-row" id="cards-container"></div>
//             <div id="controls-row">
//                 <input id="global-search-box" type="text"
//                     placeholder="Search Expense / Sub Head / Item...">
//                 <div id="controls-right">
//                     <label id="expand-all-wrapper">
//                         <input type="checkbox" id="expand-all-checkbox">
//                         Expand All
//                     </label>
//                     <button id="export-excel-btn">↓ Export to Excel</button>
//                 </div>
//             </div>
//             <div class="scroll-wrapper">
//                 <table class="university-table" id="phase-table"></table>
//             </div>
//         </div>
//     `);

//     $(page.body).append(container);

//     /* ------------------------------------------------
//        SEARCH
//     --------------------------------------------------*/
//     container.find('#global-search-box').on('input keyup', function () {
//         searchText = $(this).val().trim();

//         if (searchText) {
//             expandedHeads = expense_heads.map(h => h.name);
//             expandedSubHeads = [];
//             expense_heads.forEach(head => {
//                 (head.sub_heads || []).forEach(sub => {
//                     expandedSubHeads.push(head.name + "__" + sub.name);
//                 });
//             });
//         } else {
//             expandedHeads = [];
//             expandedSubHeads = [];
//             $('#expand-all-checkbox').prop('checked', false);
//         }

//         renderTable();
//     });

//     /* ------------------------------------------------
//        EXPAND ALL CHECKBOX
//     --------------------------------------------------*/
//     $(document).on('change', '#expand-all-checkbox', function () {
//         const isChecked = $(this).is(':checked');
//         if (isChecked) {
//             expandedHeads = expense_heads.map(h => h.name);
//             expandedSubHeads = [];
//             expense_heads.forEach(head => {
//                 (head.sub_heads || []).forEach(sub => {
//                     expandedSubHeads.push(head.name + "__" + sub.name);
//                 });
//             });
//         } else {
//             expandedHeads = [];
//             expandedSubHeads = [];
//         }
//         renderTable();
//     });

//     /* ------------------------------------------------
//        EXPORT TO EXCEL
//     --------------------------------------------------*/
//     $(document).on('click', '#export-excel-btn', function () {
//         exportTableToExcel();
//     });

//     function exportTableToExcel() {
//         if (typeof XLSX === "undefined") {
//             frappe.msgprint("Excel library not loaded.");
//             return;
//         }

//         let data = [["Expense Items", "Budget", "Actuals", "Util %", "Variance"]];
//         let grand_budget = 0;
//         let grand_actuals = 0;

//         expense_heads.forEach(head => {
//             const hB = Number(head.ytd || 0);
//             const hA = Number(head.total_posted_amt_ytd || 0);
//             grand_budget  += hB;
//             grand_actuals += hA;
//             data.push([head.name, hB, hA, safePercentage(hB, hA), hB - hA]);

//             (head.sub_heads || []).forEach(sub => {
//                 const sB = Number(sub.ytd || 0);
//                 const sA = Number(sub.total_posted_amt_ytd || 0);
//                 data.push(["   " + sub.name, sB, sA, safePercentage(sB, sA), sB - sA]);
//                 (sub.items || []).forEach(item => {
//                     const b = Number(item.ytd || 0);
//                     const a = Number(item.total_posted_amt || 0);
//                     data.push(["      " + item.name, b, a, safePercentage(b, a), b - a]);
//                 });
//             });

//             (head.items || []).forEach(item => {
//                 const b = Number(item.ytd || 0);
//                 const a = Number(item.total_posted_amt || 0);
//                 data.push(["   " + item.name, b, a, safePercentage(b, a), b - a]);
//             });
//         });

//         data.push(["GRAND TOTAL", grand_budget, grand_actuals,
//             safePercentage(grand_budget, grand_actuals), grand_budget - grand_actuals]);

//         const ws = XLSX.utils.aoa_to_sheet(data);
//         ws["!cols"] = [{ wch: 40 }, { wch: 15 }, { wch: 15 }, { wch: 10 }, { wch: 15 }];
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Expense Report");
//         XLSX.writeFile(wb, "Expense_Report.xlsx");
//     }

//     /* =====================================================
//        STATE
//     =====================================================*/
//     let expense_heads    = [];
//     let expandedHeads    = [];
//     let expandedSubHeads = [];
//     let searchText       = "";

//     const formatNumber = n =>
//         (Number(n) || 0).toLocaleString('en-IN', {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//         });

//     function matchesSearch(...values) {
//         return values.some(v =>
//             String(v || "").toLowerCase().includes(searchText.toLowerCase())
//         );
//     }

//     function getSelectedWithKey(control, key) {
//         if (!control || !control.get_value) return [];
//         return (control.get_value() || [])
//             .map(val => {
//                 let option = (control.df?.options || []).find(
//                     o => String(o?.value) === String(val)
//                 );
//                 return option?.[key] || null;
//             })
//             .filter(Boolean);
//     }

//     /* ------------------------------------------------
//        LOAD COST CENTERS / LOCATION CODES
//     --------------------------------------------------*/
//     function loadCostCenters(units) {
//         cost_center_filter.set_value([]);
//         frappe.call({
//             method: "annual_budget.api.filter_options.get_cost_centers_by_set_id",
//             args: { units: units.join(",") },
//             callback(r) {
//                 let api_options = (r.message?.data || [])
//                     .filter(d => d.value)
//                     .map(d => ({
//                         label: d.label,
//                         value: String(d.value),
//                         description: "",
//                         erp_cost_center_value: String(d.erp_cost_center_value)
//                     }));
//                 cost_center_filter.df.options = mergeSelectedOptions(cost_center_filter, api_options);
//                 cost_center_filter.refresh();
//             }
//         });
//     }

//     function loadLocationCodes(units) {
//         location_code_filter.set_value([]);
//         frappe.call({
//             method: "annual_budget.api.filter_options.get_location_codes_by_unit",
//             args: { unit: units.join(",") },
//             callback(r) {
//                 let api_options = (r.message?.data || [])
//                     .filter(d => d.value)
//                     .map(d => ({
//                         label: d.label,
//                         value: String(d.value),
//                         description: "",
//                         erp_loc_value: String(d.erp_loc_value)
//                     }));
//                 location_code_filter.df.options = mergeSelectedOptions(location_code_filter, api_options);
//                 location_code_filter.refresh();
//             }
//         });
//     }

//     /* ------------------------------------------------
//        LOAD DATA
//     --------------------------------------------------*/
//     function loadData() {
//         let financial_year       = fiscal_year_filter.get_value();
//         let month                = month_filter.get_value();
//         let unit                 = (unit_filter.get_value() || []).join(",") || null;
//         let location_code        = (getSelectedWithKey(location_code_filter, "value") || []).join(",") || null;
//         let cost_center          = (getSelectedWithKey(cost_center_filter, "value") || []).join(",") || null;
//         let erp_cost_center_value = (getSelectedWithKey(cost_center_filter, "erp_cost_center_value") || []).join(",") || null;
//         let erp_loc_value        = (getSelectedWithKey(location_code_filter, "erp_loc_value") || []).join(",") || null;

//         let missing = [];
//         if (!financial_year) missing.push("Financial Year");
//         if (!month)          missing.push("Month");
//         if (!unit)           missing.push("Unit");

//         if (missing.length) {
//             console.warn("⚠ Missing Filters:", missing.join(", "));
//             return;
//         }

//         Loader.show("We're crafting your report with care");

//         $('#expand-all-checkbox').prop('checked', false);
//         $('#global-search-box').val("");
//         expandedHeads    = [];
//         expandedSubHeads = [];
//         searchText       = "";

//         frappe.call({
//             method: "annual_budget.api.phase_sheet.get_combined_actuals",
//             args: { financial_year, month, unit, cost_center, location_code, erp_loc_value, erp_cost_center_value }
//         })
//         .done(function(r) {
//             expense_heads = Array.isArray(r.message)
//                 ? r.message
//                 : (r.message?.message || []);
//             console.log(r, "API response");
//             renderTable();
//         })
//         .fail(function(err) {
//             console.error("API Error:", err);
//             frappe.msgprint({ title: "Error", message: "Failed to load data. Please try again.", indicator: "red" });
//         })
//         .always(function() {
//             Loader.hide();
//         });
//     }

//     function safePercentage(budget, actual) {
//         if (!budget || budget === 0) return "0.00";
//         return ((actual / budget) * 100).toFixed(2);
//     }

//     /* ------------------------------------------------
//        RENDER TABLE
//     --------------------------------------------------*/
//     function renderTable() {
//         renderCards(expense_heads);

//         const $table = $('#phase-table');
//         $table.html('');

//         if (!expense_heads || !expense_heads.length) {
//             $table.append(`<tr><td colspan="5" style="text-align:center;padding:20px;color:#888;">No Data Found</td></tr>`);
//             return;
//         }

//         $table.append(`
//             <thead>
//                 <tr class="main-row">
//                     <th>Expense Head</th>
//                     <th>Budget</th>
//                     <th>Actuals</th>
//                     <th>Util %</th>
//                     <th>Variance</th>
//                 </tr>
//             </thead>
//         `);

//         const $tbody     = $('<tbody></tbody>');
//         let grand_budget  = 0;
//         let grand_actuals = 0;

//         expense_heads.forEach(head => {
//             if (
//                 searchText &&
//                 !matchesSearch(head.name) &&
//                 !(head.items || []).some(i => matchesSearch(i.name)) &&
//                 !(head.sub_heads || []).some(s =>
//                     matchesSearch(s.name) ||
//                     (s.items || []).some(i => matchesSearch(i.name))
//                 )
//             ) return;

//             const headBudget = Number(head.ytd || 0);
//             const headActual = Number(head.total_posted_amt_ytd || 0);
//             const headTotal  = headBudget - headActual;
//             const headPer    = safePercentage(headBudget, headActual);

//             grand_budget  += headBudget;
//             grand_actuals += headActual;

//             $tbody.append(`
//                 <tr class="expense-head" data-head="${head.name}">
//                     <td>
//                         ${(head.items?.length || head.sub_heads?.length)
//                             ? (expandedHeads.includes(head.name) ? '▼' : '▶')
//                             : ''}
//                         ${head.name}
//                     </td>
//                     <td>${formatNumber(headBudget)}</td>
//                     <td>${formatNumber(headActual)}</td>
//                     <td class="text-blue">${headPer} %</td>
//                     <td class="text-blue">${formatNumber(headTotal)}</td>
//                 </tr>
//             `);

//             if (expandedHeads.includes(head.name)) {

//                 (head.items || []).forEach(item => {
//                     if (searchText && !matchesSearch(item.name)) return;
//                     const budget    = Number(item.ytd || 0);
//                     const actual    = Number(item.total_posted_amt || 0);
//                     const total     = budget - actual;
//                     const total_per = safePercentage(budget, actual);
//                     $tbody.append(`
//                         <tr class="line-item">
//                             <td style="padding-left:35px">${item.name}</td>
//                             <td>${formatNumber(budget)}</td>
//                             <td>${formatNumber(actual)}</td>
//                             <td>${total_per} %</td>
//                             <td>${formatNumber(total)}</td>
//                         </tr>
//                     `);
//                 });

//                 (head.sub_heads || []).forEach(sub => {
//                     const key       = head.name + "__" + sub.name;
//                     const subBudget = Number(sub.ytd || 0);
//                     const subActual = Number(sub.total_posted_amt_ytd || 0);
//                     const subTotal  = subBudget - subActual;
//                     const subPer    = safePercentage(subBudget, subActual);

//                     $tbody.append(`
//                         <tr class="sub-head" data-sub="${key}">
//                             <td style="padding-left:20px">
//                                 ${(sub.items?.length)
//                                     ? (expandedSubHeads.includes(key) ? '▼' : '▶')
//                                     : ''}
//                                 ${sub.name}
//                             </td>
//                             <td>${formatNumber(subBudget)}</td>
//                             <td>${formatNumber(subActual)}</td>
//                             <td class="text-blue">${subPer} %</td>
//                             <td class="text-blue">${formatNumber(subTotal)}</td>
//                         </tr>
//                     `);

//                     if (expandedSubHeads.includes(key)) {
//                         (sub.items || []).forEach(item => {
//                             const budget    = Number(item.ytd || 0);
//                             const actual    = Number(item.total_posted_amt || 0);
//                             const total     = budget - actual;
//                             const total_per = safePercentage(budget, actual);
//                             $tbody.append(`
//                                 <tr class="line-item">
//                                     <td style="padding-left:55px">${item.name}</td>
//                                     <td>${formatNumber(budget)}</td>
//                                     <td>${formatNumber(actual)}</td>
//                                     <td>${total_per} %</td>
//                                     <td>${formatNumber(total)}</td>
//                                 </tr>
//                             `);
//                         });
//                     }
//                 });
//             }
//         });

//         const grand_total = grand_budget - grand_actuals;
//         const grandPer    = safePercentage(grand_budget, grand_actuals);

//         $tbody.append(`
//             <tr class="grand-total-row">
//                 <td>GRAND TOTAL</td>
//                 <td>${formatNumber(grand_budget)}</td>
//                 <td>${formatNumber(grand_actuals)}</td>
//                 <td>${grandPer} %</td>
//                 <td>${formatNumber(grand_total)}</td>
//             </tr>
//         `);

//         $table.append($tbody);

//         /* ── Sync Expand All checkbox ── */
//         const allHeads   = expense_heads.map(h => h.name);
//         const allSubKeys = [];
//         expense_heads.forEach(h => {
//             (h.sub_heads || []).forEach(s => allSubKeys.push(h.name + "__" + s.name));
//         });
//         const allExpanded =
//             allHeads.length > 0 &&
//             allHeads.every(n => expandedHeads.includes(n)) &&
//             allSubKeys.every(k => expandedSubHeads.includes(k));
//         $('#expand-all-checkbox').prop('checked', allExpanded);

//         /* ── Row click handlers ── */
//         $('.expense-head').off('click').on('click', function () {
//             const name = $(this).data('head');
//             expandedHeads = expandedHeads.includes(name)
//                 ? expandedHeads.filter(x => x !== name)
//                 : [...expandedHeads, name];
//             renderTable();
//         });

//         $('.sub-head').off('click').on('click', function () {
//             const key = $(this).data('sub');
//             expandedSubHeads = expandedSubHeads.includes(key)
//                 ? expandedSubHeads.filter(x => x !== key)
//                 : [...expandedSubHeads, key];
//             renderTable();
//         });
//     }

//     /* ------------------------------------------------
//        RENDER CARDS
//     --------------------------------------------------*/
//     function renderCards(data) {
//         const cards_container = $('#cards-container');
//         cards_container.empty();

//         let grand_budget = 0;
//         let grand_actual = 0;
//         let cards_html   = "";

//         data.forEach(head => {
//             grand_budget += Number(head.ytd || 0);
//             grand_actual += Number(head.total_posted_amt_ytd || 0);
//         });

//         cards_html += createCard("Grand Total", grand_budget, grand_actual, grand_budget - grand_actual, true);

//         data.forEach(head => {
//             const hB = Number(head.ytd || 0);
//             const hA = Number(head.total_posted_amt_ytd || 0);
//             cards_html += createCard(head.name, hB, hA, hB - hA);

//             (head.sub_heads || []).forEach(sub => {
//                 const sB = Number(sub.ytd || 0);
//                 const sA = Number(sub.total_posted_amt_ytd || 0);
//                 cards_html += createCard(sub.name, sB, sA, sB - sA, false, true);
//             });
//         });

//         cards_container.append(cards_html);
//     }

//     function createCard(title, budget, actual, variance, isGrand = false, isSub = false) {
//         const utilization = budget > 0 ? ((actual / budget) * 100).toFixed(2) : "0.00";
//         return `
//             <div class="number-card ${isGrand ? 'grand' : ''} ${isSub ? 'sub' : ''}">
//                 <div class="number-title">${title}</div>
//                 <div class="kpi-row">
//                     <div class="kpi-block">
//                         <div class="kpi-label">Budget</div>
//                         <div class="kpi-value">${formatNumber(budget)}</div>
//                     </div>
//                     <div class="kpi-block">
//                         <div class="kpi-label">Actual</div>
//                         <div class="kpi-value">${formatNumber(actual)}</div>
//                     </div>
//                 </div>
//                 <div class="kpi-bottom">
//                     <div class="kpi-block">
//                         <div class="kpi-label">Variance</div>
//                         <div class="kpi-value">${formatNumber(variance)}</div>
//                     </div>
//                     <div class="kpi-block">
//                         <div class="kpi-label">Util %</div>
//                         <div class="kpi-value">${utilization} %</div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }
// };