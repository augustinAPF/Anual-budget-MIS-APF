// // frappe.pages['import-template'].on_page_load = function(wrapper) {

// // 	let page = frappe.ui.make_app_page({
// // 		parent: wrapper,
// // 		title: 'Budget Import Template',
// // 		single_column: true
// // 	});

// // 	let $container = $(wrapper).find('.layout-main-section');
// // 	$container.addClass("budget-import-wrapper");

// // 	inject_styles();

// // 	$container.html(`<div class="loading-state">Loading Data...</div>`);

// // 	frappe.call({
// // 		method: "annual_budget.api.filter_options.get_user_mappings",
// // 		callback: function(r) {

// // 			if (!r.message || r.message.length === 0) {
// // 				$container.html(`<div class="empty-state">No Data Found</div>`);
// // 				return;
// // 			}

// // 			render_content($container, r.message);
// // 		}
// // 	});
// // };


// // /* =========================================
// //    RENDER CONTENT
// // ========================================= */

// // function render_content(container, data) {

// // 	let grouped = {};
// // 	let roles = frappe.user_roles || [];

// // 	data.forEach(row => {
// // 		let name = row.full_name || row.user;

// // 		if (!grouped[name]) {
// // 			grouped[name] = {
// // 				email: row.user,
// // 				rows: []
// // 			};
// // 		}

// // 		grouped[name].rows.push(row);
// // 	});

// // 	container.empty();

// // 	Object.keys(grouped).forEach(user => {

// // 		let userData = grouped[user];

// // 		let isFinanceCoordinator = roles.includes("Finance Unit Coordinator");
// // 		let isSystemManager = roles.includes("System Manager");

// // 		/* ===============================
// // 		   USER SECTION
// // 		=============================== */

// // 		let section = $(`
// // 			<div class="user-section">

// // 				<div class="user-header">
// // 					<div>
// // 						<div class="user-name">${user}</div>
// // 						<div class="user-email">${userData.email}</div>
// // 					</div>

// // 					<div class="button-container"></div>
// // 				</div>

// // 				<div class="user-body"></div>

// // 			</div>
// // 		`);

// // 		container.append(section);
// // /* =====================================================
// //    PROFESSIONAL CONFIRM DOWNLOAD MODAL
// //    (APPENDS ONLY ONCE)
// // ===================================================== */

// // // if (!$("#pro-confirm-overlay").length) {

// // // 	$("body").append(`
// // // 	<div id="pro-confirm-overlay">
// // // 		<div class="pro-confirm-box">

// // // 			<div class="pro-confirm-header">
// // // 				<div class="pro-confirm-title">
// // // 					⚠ Confirm Download
// // // 				</div>
// // // 				<span id="pro-confirm-close">&times;</span>
// // // 			</div>

// // // 			<div class="pro-confirm-body">
// // // 				<div class="pro-warning-text">
// // // 					We request that you carefully review and validate all allocated Units, Cost Centers, and Location Codes before downloading the Budget Import Template.
// // // 				</div>

// // // 				<div class="pro-warning-sub">
// // // 					Do not proceed unless everything is reviewed and confirmed.
// // // 				</div>

// // // 				<div class="pro-checkbox-wrapper">
// // // 					<label>
// // // 						<input type="checkbox" id="pro-confirm-checkbox">
// // // 						I confirm that I have verified all details carefully.
// // // 					</label>
// // // 				</div>
// // // 			</div>

// // // 			<div class="pro-confirm-footer">
// // // 				<button id="pro-confirm-no" class="btn btn-default btn-sm">
// // // 					Cancel
// // // 				</button>
// // // 				<button id="pro-confirm-yes" 
// // // 						class="btn btn-primary btn-sm" 
// // // 						disabled>
// // // 					Proceed to Download
// // // 				</button>
// // // 			</div>

// // // 		</div>
// // // 	</div>

// // // 	<style>

// // // 	#pro-confirm-overlay {
// // // 		position: fixed;
// // // 		top: 0;
// // // 		left: 0;
// // // 		width: 100%;
// // // 		height: 100%;
// // // 		background: rgba(0,0,0,0.45);
// // // 		display: none;
// // // 		align-items: center;
// // // 		justify-content: center;
// // // 		z-index: 9999;
// // // 		backdrop-filter: blur(3px);
// // // 	}

// // // 	.pro-confirm-box {
// // // 		background: #ffffff;
// // // 		width: 460px;
// // // 		border-radius: 10px;
// // // 		box-shadow: 0 15px 40px rgba(0,0,0,0.25);
// // // 		padding: 25px;
// // // 		animation: scaleIn 0.2s ease;
// // // 	}

// // // 	@keyframes scaleIn {
// // // 		from { transform: scale(0.95); opacity: 0; }
// // // 		to { transform: scale(1); opacity: 1; }
// // // 	}

// // // 	.pro-confirm-header {
// // // 		display: flex;
// // // 		justify-content: space-between;
// // // 		align-items: center;
// // // 		font-weight: 600;
// // // 		font-size: 16px;
// // // 		margin-bottom: 15px;
// // // 	}

// // // 	#pro-confirm-close {
// // // 		cursor: pointer;
// // // 		font-size: 20px;
// // // 		color: #888;
// // // 	}

// // // 	.pro-warning-text {
// // // 		font-weight: 600;
// // // 		color: #c0392b;
// // // 		margin-bottom: 8px;
// // // 	}

// // // 	.pro-warning-sub {
// // // 		font-size: 14px;
// // // 		color: #555;
// // // 		margin-bottom: 20px;
// // // 	}

// // // 	.pro-checkbox-wrapper {
// // // 		background: #f8f9fa;
// // // 		padding: 12px;
// // // 		border-radius: 6px;
// // // 		border: 1px solid #e0e0e0;
// // // 		font-size: 13px;
// // // 	}

// // // 	.pro-checkbox-wrapper input {
// // // 		margin-right: 8px;
// // // 	}

// // // 	.pro-confirm-footer {
// // // 		text-align: right;
// // // 		margin-top: 20px;
// // // 	}

// // // 	.pro-confirm-footer button {
// // // 		margin-left: 10px;
// // // 		min-width: 140px;
// // // 	}

// // // 	#pro-confirm-yes:disabled {
// // // 		opacity: 0.6;
// // // 		cursor: not-allowed;
// // // 	}

// // // 	</style>
// // // 	`);
// // // }

// // if (!$("#pro-confirm-overlay").length) {

// //     $("body").append(`
// //     <div id="pro-confirm-overlay">
// //         <div class="pro-confirm-box">

// //             <div class="pro-confirm-header">
// //                 <div class="pro-confirm-title">
// //                     <i class="fa fa-download"></i> Confirm Download
// //                 </div>
// //                 <span id="pro-confirm-close">&times;</span>
// //             </div>

// //             <div class="pro-confirm-body">

// //                 <div class="pro-warning-icon">
// //                     <i class="fa fa-exclamation-triangle"></i>
// //                 </div>

// //                 <div class="pro-warning-text">
// //                    We request that you carefully review and validate all allocated Units, Cost Centers, and Location Codes before downloading the Budget Import Template.
// //                 </div>

// //                 <div class="pro-warning-sub">
// //                     Do not proceed unless everything has been reviewed and confirmed.
// //                 </div>

// //                 <div class="pro-checkbox-wrapper">
// //                     <label class="pro-checkbox-label">
// //                         <input type="checkbox" id="pro-confirm-checkbox">
// //                         <span>
// //                             <i class="fa fa-check-circle"></i>
// //                             I confirm that I have verified all details carefully.
// //                         </span>
// //                     </label>
// //                 </div>

// //             </div>

// //             <div class="pro-confirm-footer">
// //                 <button id="pro-confirm-no" class="btn btn-default btn-sm">
// //                     <i class="fa fa-times"></i> Cancel
// //                 </button>
// //                 <button id="pro-confirm-yes" 
// //                         class="btn btn-primary btn-sm" 
// //                         disabled>
// //                     <i class="fa fa-download"></i> Proceed to Download
// //                 </button>
// //             </div>

// //         </div>
// //     </div>

// //     <style>

// //     #pro-confirm-overlay {
// //         position: fixed;
// //         top: 0;
// //         left: 0;
// //         width: 100%;
// //         height: 100%;
// //         background: rgba(0,0,0,0.5);
// //         display: none;
// //         align-items: center;
// //         justify-content: center;
// //         z-index: 9999;
// //         backdrop-filter: blur(4px);
// //         padding: 15px;
// //     }

// //     .pro-confirm-box {
// //         background: #ffffff;
// //         width: 640px;
// //         max-width: 100%;
// //         min-height: 360px;
// //         border-radius: 12px;
// //         box-shadow: 0 25px 60px rgba(0,0,0,0.25);
// //         padding: 35px;
// //         animation: scaleIn 0.25s ease;
// //     }

// //     @keyframes scaleIn {
// //         from { transform: scale(0.95); opacity: 0; }
// //         to { transform: scale(1); opacity: 1; }
// //     }

// //     .pro-confirm-header {
// //         display: flex;
// //         justify-content: space-between;
// //         align-items: center;
// //         font-weight: 600;
// //         font-size: 18px;
// //         margin-bottom: 25px;
// //     }

// //     .pro-confirm-title i {
// //         margin-right: 8px;
// //         color: #007bff;
// //     }

// //     #pro-confirm-close {
// //         cursor: pointer;
// //         font-size: 22px;
// //         color: #888;
// //         transition: 0.2s;
// //     }

// //     #pro-confirm-close:hover {
// //         color: #000;
// //     }

// //     .pro-confirm-body {
// //         text-align: center;
// //         margin-bottom: 25px;
// //     }

// //     .pro-warning-icon {
// //         font-size: 42px;
// //         color: #e74c3c;
// //         margin-bottom: 15px;
// //     }

// //     .pro-warning-text {
// //         font-weight: 600;
// //         font-size: 16px;
// //         color: #c0392b;
// //         margin-bottom: 15px;
// //         line-height: 1.6;
// //     }

// //     .pro-warning-sub {
// //         font-size: 14px;
// //         color: #555;
// //         margin-bottom: 25px;
// //         line-height: 1.6;
// //     }

// //     .pro-checkbox-wrapper {
// //         background: #f8f9fa;
// //         padding: 18px;
// //         border-radius: 8px;
// //         border: 1px solid #e0e0e0;
// //         font-size: 14px;
// //         text-align: left;
// //     }

// //     .pro-checkbox-label {
// //         display: flex;
// //         align-items: flex-start;
// //         gap: 10px;
// //         cursor: pointer;
// //     }

// //     .pro-checkbox-label i {
// //         color: #28a745;
// //         margin-right: 6px;
// //     }

// //     .pro-checkbox-wrapper input {
// //         margin-top: 4px;
// //         transform: scale(1.1);
// //     }

// //     .pro-confirm-footer {
// //         text-align: right;
// //         margin-top: 20px;
// //     }

// //     .pro-confirm-footer button {
// //         margin-left: 12px;
// //         min-width: 170px;
// //     }

// //     #pro-confirm-yes:disabled {
// //         opacity: 0.6;
// //         cursor: not-allowed;
// //     }

// //     /* ===================== */
// //     /* Mobile Responsive */
// //     /* ===================== */

// //     @media (max-width: 576px) {

// //         .pro-confirm-box {
// //             width: 100%;
// //             min-height: auto;
// //             padding: 25px;
// //         }

// //         .pro-confirm-header {
// //             font-size: 16px;
// //         }

// //         .pro-warning-text {
// //             font-size: 15px;
// //         }

// //         .pro-confirm-footer {
// //             text-align: center;
// //         }

// //         .pro-confirm-footer button {
// //             width: 100%;
// //             margin: 8px 0;
// //         }
// //     }

// //     </style>
// //     `);
// // }


// // /* =====================================================
// //    DOWNLOAD BUTTON
// // ===================================================== */

// // let downloadBtn = $(`
// // 	<button class="btn btn-primary btn-sm">
// // 		Download Budget Import Template
// // 	</button>
// // `);

// // section.find(".button-container").append(downloadBtn);


// // /* =====================================================
// //    OPEN MODAL ON BUTTON CLICK
// // ===================================================== */

// // downloadBtn.on("click", function () {

// // 	$("#pro-confirm-overlay")
// // 		.css("display", "flex")
// // 		.data("trigger-btn", $(this));

// // 	// reset checkbox
// // 	$("#pro-confirm-checkbox").prop("checked", false);
// // 	$("#pro-confirm-yes").prop("disabled", true);
// // });


// // /* =====================================================
// //    ENABLE PROCEED BUTTON ONLY AFTER CHECKBOX
// // ===================================================== */

// // $(document).on("change", "#pro-confirm-checkbox", function () {
// // 	$("#pro-confirm-yes").prop("disabled", !this.checked);
// // });


// // /* =====================================================
// //    CLOSE MODAL
// // ===================================================== */

// // $(document).on("click", "#pro-confirm-no, #pro-confirm-close", function () {
// // 	$("#pro-confirm-overlay").hide();
// // });


// // /* =====================================================
// //    CONFIRM & DOWNLOAD
// // ===================================================== */

// // $(document).on("click", "#pro-confirm-yes", function () {

// // 	let btn = $("#pro-confirm-overlay").data("trigger-btn");

// // 	$("#pro-confirm-overlay").hide();

// // 	if (!btn) return;

// // 	btn.prop("disabled", true)
// // 	   .html('<i class="fa fa-spinner fa-spin"></i> Downloading...');

// // 	window.open(
// // 		`/api/method/annual_budget.api.export_reports.download_finance_budget_import_template?user=${encodeURIComponent(userData.email)}`
// // 	);

// // 	setTimeout(() => {
// // 		btn.prop("disabled", false)
// // 		   .text("Download Budget Import Template");
// // 	}, 3000);
// // });


// // /* =====================================================
// //    CONTINUE YOUR PAGE LOGIC
// // ===================================================== */

// // let body = section.find(".user-body");

// // 		/* ===============================
// // 		   IMPORTANT NOTE + CONTACT CARDS
// // 		=============================== */

// // 		if (isFinanceCoordinator && !isSystemManager) {

// // 			body.append(`
// // 				<div class="note-warning">

// // 					<div class="note-header">
// // 						<span class="note-badge blinking-badge">IMPORTANT</span>
// // 						Before importing, please carefully cross-verify the allocated Units and Cost Centers listed below.
// // 						If you notice any discrepancies, contact the support team immediately.
// // 						Do not proceed with the import until all details are verified and confirmed.
// // 					</div>

// // 					<div class="contact-wrapper">
// // 						<div class="contact-card">
// // 							<div class="contact-name">Rakesh Ahuja</div>
// // 							<div class="contact-detail">
// // 								rakesh.ahuja@azimpremjifoundation.org
// // 							</div>
// // 							<div class="contact-detail">
// // 								+91 7022068106
// // 							</div>
// // 						</div>

// // 						<div class="contact-card">
// // 							<div class="contact-name">Saravana G</div>
// // 							<div class="contact-detail">
// // 								saravana.g@azimpremjifoundation.org
// // 							</div>
// // 							<div class="contact-detail">
// // 								+91 9380861952
// // 							</div>
// // 						</div>

// // 						<div class="contact-card">
// // 							<div class="contact-name">Augustin Moses R</div>
// // 							<div class="contact-detail">
// // 								augustin.moses@azimpremjifoundation.org
// // 							</div>
// // 							<div class="contact-detail">
// // 								+91 8667719594
// // 							</div>
// // 						</div>

// // 						<div class="contact-card">
// // 							<div class="contact-name">Mercy Selvanayagi R</div>
// // 							<div class="contact-detail">
// // 								mercy.selvanayagi@azimpremjifoundation.org
// // 							</div>
// // 							<div class="contact-detail">
// // 								+91 9047828687
// // 							</div>
// // 						</div>

// // 						<div class="contact-card">
// // 							<div class="contact-name">Mahaveer Ram P</div>
// // 							<div class="contact-detail">
// // 								mahaveer.p@azimpremjifoundation.org
// // 							</div>
// // 							<div class="contact-detail">
// // 								+91 8825879412
// // 							</div>
// // 						</div>
// // 					</div>

// // 				</div>
// // 			`);
// // 		}

// // 		/* ===============================
// // 		   TABLE
// // 		=============================== */

// // 		let tableHTML = `
// // 			<h4 class="table-title">
// // 				Allocated Units & Cost Centers
// // 			</h4>

// // 			<div class="table-wrapper">
// // 				<table class="mis-table">
// // 					<thead>
// // 						<tr>
// // 							<th>Unit</th>
// // 							<th>Unit Description</th>
// // 							<th>Cost Center</th>
// // 							<th>Cost Center Description</th>
// // 							<th>Location Code</th>
// // 							<th>Location Description</th>
// // 						</tr>
// // 					</thead>
// // 					<tbody>
// // 		`;

// // 		userData.rows.forEach(r => {
// // 			tableHTML += `
// // 				<tr>
// // 					<td>${r.unit || ""}</td>
// // 					<td>${r.unit_description || ""}</td>
// // 					<td>${r.cost_center || ""}</td>
// // 					<td>${r.cost_center_description || ""}</td>
// // 					<td>${r.location_code || ""}</td>
// // 					<td>${r.location_description || ""}</td>
// // 				</tr>
// // 			`;
// // 		});

// // 		tableHTML += `
// // 					</tbody>
// // 				</table>
// // 			</div>
// // 		`;

// // 		body.append(tableHTML);
// // 	});
// // }


// // /* =========================================
// //    STYLES
// // ========================================= */

// // function inject_styles() {

// // 	if (document.getElementById("allocation-style")) return;

// // 	const style = document.createElement("style");
// // 	style.id = "allocation-style";

// // 	style.innerHTML = `

// // 	/* PAGE WHITE BACKGROUND */
// // 	.budget-import-wrapper {
// // 		padding: 25px;
// // 		background: #ffffff;
// // 		min-height: 100vh;
// // 	}

// // 	.loading-state,
// // 	.empty-state {
// // 		text-align: center;
// // 		padding: 50px;
// // 		font-weight: 600;
// // 		color: #0076B6;
// // 	}

// // 	.user-section {
// // 		margin-bottom: 50px;
// // 	}

// // 	.user-header {
// // 		display: flex;
// // 		justify-content: space-between;
// // 		align-items: center;
// // 		padding-bottom: 12px;
// // 		border-bottom: 2px solid #0076B6;
// // 		margin-bottom: 18px;
// // 	}

// // 	.user-name {
// // 		font-size: 18px;
// // 		font-weight: 700;
// // 		color: #003B63;
// // 	}

// // 	.user-email {
// // 		font-size: 13px;
// // 		color: #555;
// // 	}

// // 	/* IMPORTANT NOTE */
// // 	.note-warning {
// // 		background: #fff8e1;
// // 		border-left: 5px solid #f4b400;
// // 		padding: 16px;
// // 		border-radius: 6px;
// // 		margin-bottom: 25px;
// // 	}

// // 	.note-header {
// // 		font-size: 14px;
// // 		color: #5c4b00;
// // 		margin-bottom: 15px;
// // 	}

// // 	.note-badge {
// // 		background: #f4b400;
// // 		color: #fff;
// // 		font-size: 11px;
// // 		font-weight: 700;
// // 		padding: 3px 8px;
// // 		border-radius: 20px;
// // 		margin-right: 8px;
// // 	}

// // 	.blinking-badge {
// // 		animation: softBlink 1.5s ease-in-out infinite;
// // 	}

// // 	@keyframes softBlink {
// // 		0% { opacity: 1; }
// // 		50% { opacity: 0.5; }
// // 		100% { opacity: 1; }
// // 	}

// // 	/* CONTACT CARDS */
// // 	.contact-wrapper {
// // 		display: flex;
// // 		gap: 15px;
// // 		flex-wrap: wrap;
// // 	}

// // 	.contact-card {
// // 		background: #ffffff;
// // 		border: 1px solid #e6e6e6;
// // 		border-radius: 8px;
// // 		padding: 12px 15px;
// // 		min-width: 230px;
// // 		box-shadow: 0 3px 10px rgba(0,0,0,0.04);
// // 	}

// // 	.contact-name {
// // 		font-weight: 600;
// // 		color: #333;
// // 		margin-bottom: 5px;
// // 	}

// // 	.contact-detail {
// // 		font-size: 13px;
// // 		color: #555;
// // 	}

// // 	/* TABLE */
// // 	.table-title {
// // 		font-size: 15px;
// // 		font-weight: 600;
// // 		color: #003B63;
// // 		margin-bottom: 12px;
// // 	}

// // 	.table-wrapper {
// // 		overflow-x: auto;
// // 	}

// // 	.mis-table {
// // 		width: 100%;
// // 		border-collapse: collapse;
// // 		font-size: 13px;
// // 		border: 1px solid #dcdcdc;
// // 	}

// // 	.mis-table th {
// // 		background: #0076B6;
// // 		color: #ffffff;
// // 		font-weight: 700;
// // 		padding: 8px;
// // 		text-align: center;
// // 	}

// // 	.mis-table td {
// // 		padding: 8px;
// // 		border: 1px solid #e0e0e0;
// // 		text-align: center;
// // 	}

// // 	.mis-table tr:nth-child(even) {
// // 		background: #f9f9f9;
// // 	}

// // 	.mis-table tr:hover {
// // 		background: #eef6fb;
// // 	}

// // 	@media (max-width: 768px) {
// // 		.user-header {
// // 			flex-direction: column;
// // 			align-items: flex-start;
// // 			gap: 10px;
// // 		}
// // 	}
// // 	`;

// // 	document.head.appendChild(style);
// // }



// frappe.pages['import-template'].on_page_load = function(wrapper) {

// 	let page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Budget Import Template',
// 		single_column: true
// 	});

// 	let $container = $(wrapper).find('.layout-main-section');
// 	$container.addClass("budget-import-wrapper");

// 	inject_styles();

// 	$container.html(`<div class="loading-state">Loading Data...</div>`);

// 	frappe.call({
// 		method: "annual_budget.api.filter_options.get_user_mappings",
// 		callback: function(r) {

// 			if (!r.message || r.message.length === 0) {
// 				$container.html(`<div class="empty-state">No Data Found</div>`);
// 				return;
// 			}

// 			render_content($container, r.message);
// 		}
// 	});
// };


// /* =========================================
//    RENDER CONTENT
// ========================================= */

// function render_content(container, data) {

// 	let grouped = {};

// 	// FIX: Safely read roles once, outside the loop
// 	let roles = (frappe.user_roles && Array.isArray(frappe.user_roles))
// 		? frappe.user_roles
// 		: [];

// 	let isFinanceCoordinator = roles.includes("Finance Unit Coordinator");
// 	let isSystemManager      = roles.includes("System Manager");

// 	data.forEach(row => {
// 		let key = row.user; // always use email as unique key

// 		if (!grouped[key]) {
// 			grouped[key] = {
// 				user_fullname: row.user_fullname || "",
// 				email: row.user,
// 				rows: []
// 			};
// 		}

// 		grouped[key].rows.push(row);
// 	});

// 	container.empty();

// 	/* =====================================================
// 	   GLOBAL SEARCH BAR  (rendered once, above all sections)
// 	===================================================== */
// 	let $searchWrap = $(`
// 		<div class="global-search-wrap">
// 			<div class="global-search-inner">
// 				<i class="fa fa-search global-search-icon"></i>
// 				<input
// 					type="text"
// 					id="global-table-search"
// 					class="global-search-input"
// 					placeholder="Search across all units, cost centers, locations…"
// 					autocomplete="off"
// 				/>
// 				<span id="global-search-clear" class="global-search-clear" title="Clear search">&times;</span>
// 			</div>
// 			<div id="global-search-count" class="global-search-count"></div>
// 		</div>
// 	`);
// 	container.append($searchWrap);

// 	/* =====================================================
// 	   CONFIRM DOWNLOAD MODAL  (appended once to body)
// 	===================================================== */
// 	if (!$("#pro-confirm-overlay").length) {

// 		$("body").append(`
// 		<div id="pro-confirm-overlay">
// 			<div class="pro-confirm-box">

// 				<div class="pro-confirm-header">
// 					<div class="pro-confirm-title">
// 						<i class="fa fa-download"></i> Confirm Download
// 					</div>
// 					<span id="pro-confirm-close">&times;</span>
// 				</div>

// 				<div class="pro-confirm-body">

// 					<div class="pro-warning-icon">
// 						<i class="fa fa-exclamation-triangle"></i>
// 					</div>

// 					<div class="pro-warning-text">
// 						We request that you carefully review and validate all allocated Units, Cost Centers, and Location Codes before downloading the Budget Import Template.
// 					</div>

// 					<div class="pro-warning-sub">
// 						Do not proceed unless everything has been reviewed and confirmed.
// 					</div>

// 					<div class="pro-checkbox-wrapper">
// 						<label class="pro-checkbox-label">
// 							<input type="checkbox" id="pro-confirm-checkbox">
// 							<span>
// 								<i class="fa fa-check-circle"></i>
// 								I confirm that I have verified all details carefully.
// 							</span>
// 						</label>
// 					</div>

// 				</div>

// 				<div class="pro-confirm-footer">
// 					<button id="pro-confirm-no" class="btn btn-default btn-sm">
// 						<i class="fa fa-times"></i> Cancel
// 					</button>
// 					<button id="pro-confirm-yes"
// 							class="btn btn-primary btn-sm"
// 							disabled>
// 						<i class="fa fa-download"></i> Proceed to Download
// 					</button>
// 				</div>

// 			</div>
// 		</div>
// 		`);
// 	}

// 	/* =====================================================
// 	   MODAL EVENT LISTENERS  (registered once, outside loop)
// 	===================================================== */

// 	// Enable/disable Proceed button based on checkbox
// 	$(document).off("change.budgetModal", "#pro-confirm-checkbox")
// 		.on("change.budgetModal", "#pro-confirm-checkbox", function () {
// 			$("#pro-confirm-yes").prop("disabled", !this.checked);
// 		});

// 	// Close modal
// 	$(document).off("click.budgetModal", "#pro-confirm-no, #pro-confirm-close")
// 		.on("click.budgetModal", "#pro-confirm-no, #pro-confirm-close", function () {
// 			$("#pro-confirm-overlay").hide();
// 		});

// 	// Close on overlay background click
// 	$(document).off("click.budgetModalBg", "#pro-confirm-overlay")
// 		.on("click.budgetModalBg", "#pro-confirm-overlay", function (e) {
// 			if ($(e.target).is("#pro-confirm-overlay")) {
// 				$("#pro-confirm-overlay").hide();
// 			}
// 		});

// 	// Confirm & download
// 	$(document).off("click.budgetModalYes", "#pro-confirm-yes")
// 		.on("click.budgetModalYes", "#pro-confirm-yes", function () {

// 			let btn      = $("#pro-confirm-overlay").data("trigger-btn");
// 			let userEmail = $("#pro-confirm-overlay").data("user-email");

// 			$("#pro-confirm-overlay").hide();

// 			if (!btn || !userEmail) return;

// 			btn.prop("disabled", true)
// 			   .html('<i class="fa fa-spinner fa-spin"></i> Downloading...');

// 			window.open(
// 				`/api/method/annual_budget.api.export_reports.download_finance_budget_import_template?user=${encodeURIComponent(userEmail)}`
// 			);

// 			setTimeout(() => {
// 				btn.prop("disabled", false)
// 				   .text("Download Budget Import Template");
// 			}, 3000);
// 		});


// 	/* =====================================================
// 	   BUILD USER SECTIONS
// 	===================================================== */

// 	Object.keys(grouped).forEach(user => {

// 		let userData = grouped[user];
// 		let displayName = userData.user_fullname || userData.email;

// 		/* ===============================
// 		   USER SECTION
// 		=============================== */
// 		let section = $(`
// 			<div class="user-section" data-user="${user}">

// 				<div class="user-header">
// 					<div>
// 						<div class="user-name">${displayName}</div>
// 						<div class="user-email">${userData.email}</div>
// 					</div>

// 					<div class="button-container"></div>
// 				</div>

// 				<div class="user-body"></div>

// 			</div>
// 		`);

// 		container.append(section);

// 		/* =====================================================
// 		   DOWNLOAD BUTTON
// 		===================================================== */
// 		let downloadBtn = $(`
// 			<button class="btn btn-primary btn-sm">
// 				<i class="fa fa-download"></i> Download Budget Import Template
// 			</button>
// 		`);

// 		section.find(".button-container").append(downloadBtn);

// 		if (isFinanceCoordinator && !isSystemManager) {

// 			// Finance Coordinator: open confirmation modal first
// 			downloadBtn.on("click", function () {
// 				$("#pro-confirm-overlay")
// 					.css("display", "flex")
// 					.data("trigger-btn", $(this))
// 					.data("user-email", userData.email);

// 				// Reset modal state
// 				$("#pro-confirm-checkbox").prop("checked", false);
// 				$("#pro-confirm-yes").prop("disabled", true);
// 			});

// 		} else {

// 			// All other roles: direct download, no modal
// 			downloadBtn.on("click", function () {
// 				let btn = $(this);

// 				btn.prop("disabled", true)
// 				   .html('<i class="fa fa-spinner fa-spin"></i> Downloading...');

// 				window.open(
// 					`/api/method/annual_budget.api.export_reports.download_finance_budget_import_template?user=${encodeURIComponent(userData.email)}`
// 				);

// 				setTimeout(() => {
// 					btn.prop("disabled", false)
// 					   .html('<i class="fa fa-download"></i> Download Budget Import Template');
// 				}, 3000);
// 			});
// 		}


// 		let body = section.find(".user-body");

// 		/* ===============================
// 		   IMPORTANT NOTE + CONTACT CARDS
// 		=============================== */
// 		if (isFinanceCoordinator && !isSystemManager) {

// 			body.append(`
// 				<div class="note-warning">

// 					<div class="note-header">
// 						<span class="note-badge blinking-badge">IMPORTANT</span>
// 						Before importing, please carefully cross-verify the allocated Units and Cost Centers listed below.
// 						If you notice any discrepancies, contact the support team immediately.
// 						Do not proceed with the import until all details are verified and confirmed.
// 					</div>

// 					<div class="contact-wrapper">
// 						<div class="contact-card">
// 							<div class="contact-name">Rakesh Ahuja</div>
// 							<div class="contact-detail">rakesh.ahuja@azimpremjifoundation.org</div>
// 							<div class="contact-detail">+91 7022068106</div>
// 						</div>

// 						<div class="contact-card">
// 							<div class="contact-name">Saravana G</div>
// 							<div class="contact-detail">saravana.g@azimpremjifoundation.org</div>
// 							<div class="contact-detail">+91 9380861952</div>
// 						</div>

// 						<div class="contact-card">
// 							<div class="contact-name">Augustin Moses R</div>
// 							<div class="contact-detail">augustin.moses@azimpremjifoundation.org</div>
// 							<div class="contact-detail">+91 8667719594</div>
// 						</div>

// 						<div class="contact-card">
// 							<div class="contact-name">Mercy Selvanayagi R</div>
// 							<div class="contact-detail">mercy.selvanayagi@azimpremjifoundation.org</div>
// 							<div class="contact-detail">+91 9047828687</div>
// 						</div>

// 						<div class="contact-card">
// 							<div class="contact-name">Mahaveer Ram P</div>
// 							<div class="contact-detail">mahaveer.p@azimpremjifoundation.org</div>
// 							<div class="contact-detail">+91 8825879412</div>
// 						</div>
// 					</div>

// 				</div>
// 			`);
// 		}

// 		/* ===============================
// 		   TABLE  (with Sl. No. column)
// 		=============================== */
// 		let tableHTML = `
// 			<h4 class="table-title">
// 				Allocated Units &amp; Cost Centers
// 			</h4>

// 			<div class="table-wrapper">
// 				<table class="mis-table">
// 					<thead>
// 						<tr>
// 							<th>Sl. No.</th>
// 							<th>Unit</th>
// 							<th>Unit Description</th>
// 							<th>Cost Center</th>
// 							<th>Cost Center Description</th>
// 							<th>Location Code</th>
// 							<th>Location Description</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 		`;

// 		userData.rows.forEach((r, idx) => {
// 			tableHTML += `
// 				<tr>
// 					<td>${idx + 1}</td>
// 					<td>${r.unit || ""}</td>
// 					<td>${r.unit_description || ""}</td>
// 					<td>${r.cost_center || ""}</td>
// 					<td>${r.cost_center_description || ""}</td>
// 					<td>${r.location_code || ""}</td>
// 					<td>${r.location_description || ""}</td>
// 				</tr>
// 			`;
// 		});

// 		tableHTML += `
// 					</tbody>
// 				</table>
// 			</div>
// 		`;

// 		body.append(tableHTML);
// 	});


// 	/* =====================================================
// 	   GLOBAL SEARCH LOGIC
// 	===================================================== */

// 	function run_global_search(query) {

// 		let q = (query || "").trim().toLowerCase();
// 		let totalVisible = 0;

// 		$(".mis-table").each(function () {
// 			let $table   = $(this);
// 			let $rows    = $table.find("tbody tr");
// 			let sectionVisible = 0;

// 			$rows.each(function () {
// 				let $row = $(this);
// 				let text = $row.text().toLowerCase();
// 				let match = !q || text.indexOf(q) !== -1;
// 				$row.toggle(match);
// 				if (match) {
// 					sectionVisible++;
// 					totalVisible++;
// 				}
// 			});

// 			// Show/hide section title & user block based on matches
// 			let $section = $table.closest(".user-section");
// 			$section.toggle(sectionVisible > 0 || !q);
// 		});

// 		// Update count display
// 		let $count = $("#global-search-count");
// 		if (q) {
// 			$count.text(`${totalVisible} row${totalVisible !== 1 ? "s" : ""} matched`).show();
// 		} else {
// 			$count.hide();
// 		}

// 		// Show/hide clear button
// 		$("#global-search-clear").toggle(q.length > 0);
// 	}

// 	// Live search on input
// 	$(document).off("input.globalSearch", "#global-table-search")
// 		.on("input.globalSearch", "#global-table-search", function () {
// 			run_global_search($(this).val());
// 		});

// 	// Clear button
// 	$(document).off("click.globalSearchClear", "#global-search-clear")
// 		.on("click.globalSearchClear", "#global-search-clear", function () {
// 			$("#global-table-search").val("").trigger("input");
// 		});

// 	// Hide clear button initially
// 	$("#global-search-clear").hide();
// 	$("#global-search-count").hide();
// }


// /* =========================================
//    STYLES
// ========================================= */

// function inject_styles() {

// 	if (document.getElementById("allocation-style")) return;

// 	const style = document.createElement("style");
// 	style.id = "allocation-style";

// 	style.innerHTML = `

// 	/* PAGE WHITE BACKGROUND */
// 	.budget-import-wrapper {
// 		padding: 25px;
// 		background: #ffffff;
// 		min-height: 100vh;
// 	}

// 	.loading-state,
// 	.empty-state {
// 		text-align: center;
// 		padding: 50px;
// 		font-weight: 600;
// 		color: #0076B6;
// 	}

// 	/* ==============================
// 	   GLOBAL SEARCH
// 	============================== */
// 	.global-search-wrap {
// 		margin-bottom: 30px;
// 	}

// 	.global-search-inner {
// 		position: relative;
// 		display: flex;
// 		align-items: center;
// 		max-width: 520px;
// 	}

// 	.global-search-icon {
// 		position: absolute;
// 		left: 12px;
// 		color: #0076B6;
// 		font-size: 14px;
// 		pointer-events: none;
// 	}

// 	.global-search-input {
// 		width: 100%;
// 		padding: 10px 36px 10px 36px;
// 		border: 1.5px solid #c8dff0;
// 		border-radius: 8px;
// 		font-size: 14px;
// 		color: #222;
// 		outline: none;
// 		transition: border-color 0.2s, box-shadow 0.2s;
// 		background: #f4f9fd;
// 	}

// 	.global-search-input:focus {
// 		border-color: #0076B6;
// 		box-shadow: 0 0 0 3px rgba(0,118,182,0.12);
// 		background: #fff;
// 	}

// 	.global-search-clear {
// 		position: absolute;
// 		right: 10px;
// 		font-size: 18px;
// 		color: #999;
// 		cursor: pointer;
// 		line-height: 1;
// 		transition: color 0.15s;
// 	}

// 	.global-search-clear:hover {
// 		color: #c0392b;
// 	}

// 	.global-search-count {
// 		margin-top: 6px;
// 		font-size: 12px;
// 		color: #0076B6;
// 		font-weight: 600;
// 		padding-left: 2px;
// 	}

// 	/* ============================== */

// 	.user-section {
// 		margin-bottom: 50px;
// 	}

// 	.user-header {
// 		display: flex;
// 		justify-content: space-between;
// 		align-items: center;
// 		padding-bottom: 12px;
// 		border-bottom: 2px solid #0076B6;
// 		margin-bottom: 18px;
// 	}

// 	.user-name {
// 		font-size: 18px;
// 		font-weight: 700;
// 		color: #003B63;
// 	}

// 	.user-email {
// 		font-size: 13px;
// 		color: #555;
// 	}

// 	/* IMPORTANT NOTE */
// 	.note-warning {
// 		background: #fff8e1;
// 		border-left: 5px solid #f4b400;
// 		padding: 16px;
// 		border-radius: 6px;
// 		margin-bottom: 25px;
// 	}

// 	.note-header {
// 		font-size: 14px;
// 		color: #5c4b00;
// 		margin-bottom: 15px;
// 	}

// 	.note-badge {
// 		background: #f4b400;
// 		color: #fff;
// 		font-size: 11px;
// 		font-weight: 700;
// 		padding: 3px 8px;
// 		border-radius: 20px;
// 		margin-right: 8px;
// 	}

// 	.blinking-badge {
// 		animation: softBlink 1.5s ease-in-out infinite;
// 	}

// 	@keyframes softBlink {
// 		0%   { opacity: 1; }
// 		50%  { opacity: 0.5; }
// 		100% { opacity: 1; }
// 	}

// 	/* CONTACT CARDS */
// 	.contact-wrapper {
// 		display: flex;
// 		gap: 15px;
// 		flex-wrap: wrap;
// 	}

// 	.contact-card {
// 		background: #ffffff;
// 		border: 1px solid #e6e6e6;
// 		border-radius: 8px;
// 		padding: 12px 15px;
// 		min-width: 230px;
// 		box-shadow: 0 3px 10px rgba(0,0,0,0.04);
// 	}

// 	.contact-name {
// 		font-weight: 600;
// 		color: #333;
// 		margin-bottom: 5px;
// 	}

// 	.contact-detail {
// 		font-size: 13px;
// 		color: #555;
// 	}

// 	/* TABLE */
// 	.table-title {
// 		font-size: 15px;
// 		font-weight: 600;
// 		color: #003B63;
// 		margin-bottom: 12px;
// 	}

// 	.table-wrapper {
// 		overflow-x: auto;
// 	}

// 	.mis-table {
// 		width: 100%;
// 		border-collapse: collapse;
// 		font-size: 13px;
// 		border: 1px solid #dcdcdc;
// 	}

// 	.mis-table th {
// 		background: #0076B6;
// 		color: #ffffff;
// 		font-weight: 700;
// 		padding: 8px;
// 		text-align: center;
// 	}

// 	.mis-table td {
// 		padding: 8px;
// 		border: 1px solid #e0e0e0;
// 		text-align: center;
// 	}

// 	.mis-table tr:nth-child(even) {
// 		background: #f9f9f9;
// 	}

// 	.mis-table tr:hover {
// 		background: #eef6fb;
// 	}

// 	/* MODAL STYLES */
// 	#pro-confirm-overlay {
// 		position: fixed;
// 		top: 0;
// 		left: 0;
// 		width: 100%;
// 		height: 100%;
// 		background: rgba(0,0,0,0.5);
// 		display: none;
// 		align-items: center;
// 		justify-content: center;
// 		z-index: 9999;
// 		backdrop-filter: blur(4px);
// 		padding: 15px;
// 	}

// 	.pro-confirm-box {
// 		background: #ffffff;
// 		width: 640px;
// 		max-width: 100%;
// 		min-height: 360px;
// 		border-radius: 12px;
// 		box-shadow: 0 25px 60px rgba(0,0,0,0.25);
// 		padding: 35px;
// 		animation: scaleIn 0.25s ease;
// 	}

// 	@keyframes scaleIn {
// 		from { transform: scale(0.95); opacity: 0; }
// 		to   { transform: scale(1);    opacity: 1; }
// 	}

// 	.pro-confirm-header {
// 		display: flex;
// 		justify-content: space-between;
// 		align-items: center;
// 		font-weight: 600;
// 		font-size: 18px;
// 		margin-bottom: 25px;
// 	}

// 	.pro-confirm-title i {
// 		margin-right: 8px;
// 		color: #007bff;
// 	}

// 	#pro-confirm-close {
// 		cursor: pointer;
// 		font-size: 22px;
// 		color: #888;
// 		transition: 0.2s;
// 	}

// 	#pro-confirm-close:hover {
// 		color: #000;
// 	}

// 	.pro-confirm-body {
// 		text-align: center;
// 		margin-bottom: 25px;
// 	}

// 	.pro-warning-icon {
// 		font-size: 42px;
// 		color: #e74c3c;
// 		margin-bottom: 15px;
// 	}

// 	.pro-warning-text {
// 		font-weight: 600;
// 		font-size: 16px;
// 		color: #c0392b;
// 		margin-bottom: 15px;
// 		line-height: 1.6;
// 	}

// 	.pro-warning-sub {
// 		font-size: 14px;
// 		color: #555;
// 		margin-bottom: 25px;
// 		line-height: 1.6;
// 	}

// 	.pro-checkbox-wrapper {
// 		background: #f8f9fa;
// 		padding: 18px;
// 		border-radius: 8px;
// 		border: 1px solid #e0e0e0;
// 		font-size: 14px;
// 		text-align: left;
// 	}

// 	.pro-checkbox-label {
// 		display: flex;
// 		align-items: flex-start;
// 		gap: 10px;
// 		cursor: pointer;
// 	}

// 	.pro-checkbox-label i {
// 		color: #28a745;
// 		margin-right: 6px;
// 	}

// 	.pro-checkbox-wrapper input {
// 		margin-top: 4px;
// 		transform: scale(1.1);
// 	}

// 	.pro-confirm-footer {
// 		text-align: right;
// 		margin-top: 20px;
// 	}

// 	.pro-confirm-footer button {
// 		margin-left: 12px;
// 		min-width: 170px;
// 	}

// 	#pro-confirm-yes:disabled {
// 		opacity: 0.6;
// 		cursor: not-allowed;
// 	}

// 	/* RESPONSIVE */
// 	@media (max-width: 768px) {
// 		.user-header {
// 			flex-direction: column;
// 			align-items: flex-start;
// 			gap: 10px;
// 		}
// 	}

// 	@media (max-width: 576px) {
// 		.global-search-inner {
// 			max-width: 100%;
// 		}

// 		.pro-confirm-box {
// 			width: 100%;
// 			min-height: auto;
// 			padding: 25px;
// 		}

// 		.pro-confirm-header {
// 			font-size: 16px;
// 		}

// 		.pro-warning-text {
// 			font-size: 15px;
// 		}

// 		.pro-confirm-footer {
// 			text-align: center;
// 		}

// 		.pro-confirm-footer button {
// 			width: 100%;
// 			margin: 8px 0;
// 		}
// 	}
// 	`;

// 	document.head.appendChild(style);
// }

// frappe.pages["import-template"].on_page_load = function (wrapper) {

// 	// Create the Frappe page layout
// 	frappe.ui.make_app_page({
// 		parent      : wrapper,
// 		title       : "Budget Import Template",
// 		single_column: true,
// 	});

// 	// Get the main content container and mark it with our wrapper class
// 	const $container = $(wrapper).find(".layout-main-section");
// 	$container.addClass("budget-import-wrapper");

// 	// Inject all custom CSS into the page (runs only once)
// 	inject_styles();

// 	// Show a loading spinner while data is being fetched
// 	$container.html(`
// 		<div class="loading-state">
// 			<i class="fa fa-spinner fa-spin"></i> Loading Data…
// 		</div>
// 	`);

// 	// Fetch user-to-cost-center mappings from the backend
// 	frappe.call({
// 		method  : "annual_budget.api.filter_options.get_user_mappings",
// 		callback : function (r) {

// 			// If no data is returned, show empty state and stop
// 			if (!r.message || !r.message.length) {
// 				$container.html(`<div class="empty-state">No Data Found</div>`);
// 				return;
// 			}

// 			// Data is available — build the full page content
// 			render_content($container, r.message);
// 		}
// 	});

// };




// /* ============================================================
//    RENDER CONTENT
//    - Groups rows by user email
//    - Builds search bar, modal, user sections, and tables
// ============================================================ */

// function render_content(container, data) {

// 	// ── Role Detection ─────────────────────────────────────
// 	// Read user roles once, safely fallback to empty array
// 	const roles                = Array.isArray(frappe.user_roles) ? frappe.user_roles : [];
// 	const isFinanceCoordinator = roles.includes("Finance Unit Coordinator");
// 	const isSystemManager      = roles.includes("System Manager");

// 	// Finance Coordinators (who are NOT System Managers) see the confirmation modal
// 	const needsModal = isFinanceCoordinator && !isSystemManager;


// 	// ── Group Data by User Email ───────────────────────────
// 	// Each key = user email, value = { user_fullname, email, rows[] }
// 	const grouped = {};

// 	data.forEach(function (row) {

// 		const key = row.user; // email is the unique key

// 		if (!grouped[key]) {
// 			grouped[key] = {
// 				user_fullname : row.user_fullname || "",
// 				email         : row.user,
// 				rows          : []
// 			};
// 		}

// 		grouped[key].rows.push(row);
// 	});


// 	// ── Clear Container ────────────────────────────────────
// 	container.empty();


// 	// ── Global Search Bar ──────────────────────────────────
// 	// Rendered once, above all user sections
// 	container.append(`
// 		<div class="global-search-wrap">

// 			<div class="global-search-inner">
// 				<i class="fa fa-search global-search-icon"></i>

// 				<input
// 					type        = "text"
// 					id          = "global-table-search"
// 					class       = "global-search-input"
// 					placeholder = "Search across all units, cost centers, locations…"
// 					autocomplete= "off"
// 				/>

// 				<span id="global-search-clear" class="global-search-clear" title="Clear">&times;</span>
// 			</div>

// 			<div id="global-search-count" class="global-search-count" style="display:none;"></div>

// 		</div>
// 	`);


// 	// ── Confirm Download Modal ─────────────────────────────
// 	// Appended once to <body> — shared across all download buttons
// 	if (!$("#pro-confirm-overlay").length) {

// 		$("body").append(`
// 			<div id="pro-confirm-overlay">
// 				<div class="pro-confirm-box">

// 					<!-- Header -->
// 					<div class="pro-confirm-header">
// 						<div class="pro-confirm-title">
// 							<i class="fa fa-download"></i> Confirm Download
// 						</div>
// 						<span id="pro-confirm-close" title="Close">&times;</span>
// 					</div>

// 					<!-- Body -->
// 					<div class="pro-confirm-body">

// 						<div class="pro-warning-icon">
// 							<i class="fa fa-exclamation-triangle"></i>
// 						</div>

// 						<div class="pro-warning-text">
// 							Please carefully review and validate all allocated Units, Cost Centers,
// 							and Location Codes before downloading the Budget Import Template.
// 						</div>

// 						<div class="pro-warning-sub">
// 							Do not proceed unless everything has been reviewed and confirmed.
// 						</div>

// 						<div class="pro-checkbox-wrapper">
// 							<label class="pro-checkbox-label">
// 								<input type="checkbox" id="pro-confirm-checkbox">
// 								<span>
// 									<i class="fa fa-check-circle"></i>
// 									I confirm that I have verified all details carefully.
// 								</span>
// 							</label>
// 						</div>

// 					</div>

// 					<!-- Footer -->
// 					<div class="pro-confirm-footer">
// 						<button id="pro-confirm-no" class="btn btn-default btn-sm">
// 							<i class="fa fa-times"></i> Cancel
// 						</button>
// 						<button id="pro-confirm-yes" class="btn btn-primary btn-sm" disabled>
// 							<i class="fa fa-download"></i> Proceed to Download
// 						</button>
// 					</div>

// 				</div>
// 			</div>
// 		`);

// 	}


// 	// ── Modal Event Listeners ──────────────────────────────
// 	// All namespaced under ".budgetModal" — registered once, safe to re-register
// 	$(document)
// 		.off(".budgetModal")

// 		// Enable or disable the Proceed button based on checkbox
// 		.on("change.budgetModal", "#pro-confirm-checkbox", function () {
// 			$("#pro-confirm-yes").prop("disabled", !this.checked);
// 		})

// 		// Close modal when Cancel or X is clicked
// 		.on("click.budgetModal", "#pro-confirm-no, #pro-confirm-close", function () {
// 			_hide_modal();
// 		})

// 		// Close modal when clicking outside the modal box (on the overlay)
// 		.on("click.budgetModal", "#pro-confirm-overlay", function (e) {
// 			if ($(e.target).is("#pro-confirm-overlay")) {
// 				_hide_modal();
// 			}
// 		})

// 		// Confirm and trigger the actual file download
// 		.on("click.budgetModal", "#pro-confirm-yes", function () {

// 			const $overlay  = $("#pro-confirm-overlay");
// 			const btn       = $overlay.data("trigger-btn");
// 			const userEmail = $overlay.data("user-email");

// 			_hide_modal();

// 			// Safety check — if data is missing, do nothing
// 			if (!btn || !userEmail) return;

// 			_start_download(btn, userEmail);
// 		});


// 	// ── Build Each User Section ────────────────────────────

// 	Object.values(grouped).forEach(function (userData) {

// 		// Use full name if available, otherwise fall back to email
// 		const displayName = userData.user_fullname || userData.email;


// 		// ── User Section Wrapper ───────────────────────────
// 		const $section = $(`
// 			<div class="user-section">

// 				<div class="user-header">
// 					<div>
// 						<div class="user-name">${_esc(displayName)}</div>
// 						<div class="user-email">${_esc(userData.email)}</div>
// 					</div>
// 					<div class="button-container"></div>
// 				</div>

// 				<div class="user-body"></div>

// 			</div>
// 		`);

// 		container.append($section);


// 		// ── Download Button ────────────────────────────────
// 		const $downloadBtn = $(`
// 			<button class="btn btn-primary btn-sm">
// 				<i class="fa fa-download"></i> Download Budget Import Template
// 			</button>
// 		`);

// 		$section.find(".button-container").append($downloadBtn);

// 		if (needsModal) {

// 			// Finance Coordinators: show confirmation modal before downloading
// 			$downloadBtn.on("click", function () {
// 				$("#pro-confirm-overlay")
// 					.css("display", "flex")
// 					.data("trigger-btn",  $(this))
// 					.data("user-email",   userData.email);

// 				// Always reset modal to a clean state on open
// 				$("#pro-confirm-checkbox").prop("checked", false);
// 				$("#pro-confirm-yes").prop("disabled", true);
// 			});

// 		} else {

// 			// All other roles: download directly without any modal
// 			$downloadBtn.on("click", function () {
// 				_start_download($(this), userData.email);
// 			});

// 		}


// 		const $body = $section.find(".user-body");


// 		// ── Important Note (Finance Coordinator only) ──────
// 		if (needsModal) {
// 			$body.append(_build_note_html());
// 		}


// 		// ── Allocation Table ───────────────────────────────
// 		$body.append(_build_table_html(userData.rows));

// 	});


// 	// ── Global Search Logic ────────────────────────────────

// 	function run_global_search(query) {

// 		const q       = query.trim().toLowerCase();
// 		let totalVisible = 0;

// 		// Loop through each user section and filter table rows
// 		$(".user-section").each(function () {

// 			const $section      = $(this);
// 			let sectionVisible  = 0;

// 			$section.find(".mis-table tbody tr").each(function () {

// 				// Check if row text matches the query
// 				const match = !q || this.textContent.toLowerCase().includes(q);
// 				$(this).toggle(match);

// 				if (match) {
// 					sectionVisible++;
// 					totalVisible++;
// 				}

// 			});

// 			// Hide the entire user section if no rows matched
// 			$section.toggle(!q || sectionVisible > 0);

// 		});

// 		// Update the result count display
// 		const $count = $("#global-search-count");

// 		if (q) {
// 			$count
// 				.text(`${totalVisible} row${totalVisible !== 1 ? "s" : ""} matched`)
// 				.show();
// 		} else {
// 			$count.hide();
// 		}

// 		// Show or hide the clear (×) button
// 		$("#global-search-clear").toggle(q.length > 0);

// 	}

// 	// Attach search input and clear button events (namespaced)
// 	$(document)
// 		.off(".globalSearch")
// 		.on("input.globalSearch", "#global-table-search", function () {
// 			run_global_search(this.value);
// 		})
// 		.on("click.globalSearch", "#global-search-clear", function () {
// 			$("#global-table-search").val("").trigger("input");
// 		});

// 	// Hide clear button on initial load
// 	$("#global-search-clear").hide();

// }




// /* ============================================================
//    HELPER FUNCTIONS
// ============================================================ */


// /* ── _esc()
//    Escapes a string for safe HTML insertion.
//    Prevents XSS from server-supplied user data. */
// function _esc(str) {
// 	return $("<div>").text(str || "").html();
// }


// /* ── _hide_modal()
//    Hides the confirmation modal and resets it to a clean state. */
// function _hide_modal() {
// 	$("#pro-confirm-overlay").hide();
// 	$("#pro-confirm-checkbox").prop("checked", false);
// 	$("#pro-confirm-yes").prop("disabled", true);
// }


// /* ── _start_download()
//    Disables the button, shows a spinner, opens the download URL,
//    then re-enables the button after 3 seconds. */
// function _start_download($btn, userEmail) {

// 	$btn
// 		.prop("disabled", true)
// 		.html('<i class="fa fa-spinner fa-spin"></i> Downloading…');

// 	window.open(
// 		`/api/method/annual_budget.api.export_reports.download_finance_budget_import_template` +
// 		`?user=${encodeURIComponent(userEmail)}`
// 	);

// 	setTimeout(function () {
// 		$btn
// 			.prop("disabled", false)
// 			.html('<i class="fa fa-download"></i> Download Budget Import Template');
// 	}, 3000);

// }


// /* ── _build_note_html()
//    Returns the HTML for the "IMPORTANT" warning note
//    and support contact cards shown to Finance Coordinators. */
// function _build_note_html() {

// 	// List of support contacts [ Name, Email, Phone ]
// 	const contacts = [
// 		["Rakesh Ahuja",         "rakesh.ahuja@azimpremjifoundation.org",      "+91 7022068106"],
// 		["Saravana G",           "saravana.g@azimpremjifoundation.org",        "+91 9380861952"],
// 		["Augustin Moses R",     "augustin.moses@azimpremjifoundation.org",    "+91 8667719594"],
// 		["Mercy Selvanayagi R",  "mercy.selvanayagi@azimpremjifoundation.org", "+91 9047828687"],
// 		["Mahaveer Ram P",       "mahaveer.p@azimpremjifoundation.org",        "+91 8825879412"],
// 	];

// 	// Build individual contact card HTML
// 	const contactCards = contacts.map(function (c) {
// 		return `
// 			<div class="contact-card">
// 				<div class="contact-name">${c[0]}</div>
// 				<div class="contact-detail">${c[1]}</div>
// 				<div class="contact-detail">${c[2]}</div>
// 			</div>
// 		`;
// 	}).join("");

// 	return `
// 		<div class="note-warning">

// 			<div class="note-header">
// 				<span class="note-badge blinking-badge">IMPORTANT</span>
// 				Before importing, please carefully cross-verify the allocated Units and Cost Centers listed below.
// 				If you notice any discrepancies, contact the support team immediately.
// 				Do not proceed with the import until all details are verified and confirmed.
// 			</div>

// 			<div class="contact-wrapper">
// 				${contactCards}
// 			</div>

// 		</div>
// 	`;

// }


// /* ── _build_table_html()
//    Returns the HTML for the allocation table.
//    Each column is defined as [ data_key, display_label ]. */
// function _build_table_html(rows) {

// 	// Column definitions: [ field key, column header label ]
// 	const COLUMNS = [
// 		["unit",                     "Unit"                    ],
// 		["unit_description",         "Unit Description"        ],
// 		["cost_center",              "Cost Center"             ],
// 		["cost_center_description",  "Cost Center Description" ],
// 		["location_code",            "Location Code"           ],
// 		["location_description",     "Location Description"    ],
// 	];

// 	// Build <th> header cells
// 	const headerCells = COLUMNS.map(function (col) {
// 		return `<th>${col[1]}</th>`;
// 	}).join("");

// 	// Build <tr> data rows
// 	const dataRows = rows.map(function (row, index) {

// 		const cells = COLUMNS.map(function (col) {
// 			return `<td>${_esc(row[col[0]] || "")}</td>`;
// 		}).join("");

// 		return `<tr><td>${index + 1}</td>${cells}</tr>`;

// 	}).join("");

// 	return `
// 		<h4 class="table-title">Allocated Units &amp; Cost Centers</h4>

// 		<div class="table-wrapper">
// 			<table class="mis-table">

// 				<thead>
// 					<tr>
// 						<th>Sl. No.</th>
// 						${headerCells}
// 					</tr>
// 				</thead>

// 				<tbody>
// 					${dataRows}
// 				</tbody>

// 			</table>
// 		</div>
// 	`;

// }




// /* ============================================================
//    INJECT STYLES
//    - Injects all page CSS once into <head>
//    - Skips if already injected (safe for page re-loads)
// ============================================================ */

// function inject_styles() {

// 	// Prevent duplicate injection on page re-load
// 	if (document.getElementById("allocation-style")) return;

// 	const style    = document.createElement("style");
// 	style.id       = "allocation-style";
// 	style.textContent = `

// 	/* ── Page Wrapper ─────────────────────────── */
// 	.budget-import-wrapper {
// 		padding    : 25px;
// 		background : #ffffff;
// 		min-height : 100vh;
// 	}

// 	/* ── Loading / Empty States ───────────────── */
// 	.loading-state,
// 	.empty-state {
// 		text-align  : center;
// 		padding     : 50px;
// 		font-weight : 600;
// 		color       : #0076B6;
// 	}


// 	/* ── Global Search Bar ────────────────────── */

// 	.global-search-wrap {
// 		margin-bottom : 30px;
// 	}

// 	.global-search-inner {
// 		position    : relative;
// 		display     : flex;
// 		align-items : center;
// 		max-width   : 520px;
// 	}

// 	.global-search-icon {
// 		position        : absolute;
// 		left            : 12px;
// 		color           : #0076B6;
// 		font-size       : 14px;
// 		pointer-events  : none;
// 	}

// 	.global-search-input {
// 		width         : 100%;
// 		padding       : 10px 36px;
// 		border        : 1.5px solid #c8dff0;
// 		border-radius : 8px;
// 		font-size     : 14px;
// 		color         : #222;
// 		outline       : none;
// 		background    : #f4f9fd;
// 		transition    : border-color 0.2s, box-shadow 0.2s;
// 	}

// 	.global-search-input:focus {
// 		border-color : #0076B6;
// 		box-shadow   : 0 0 0 3px rgba(0, 118, 182, 0.12);
// 		background   : #ffffff;
// 	}

// 	.global-search-clear {
// 		position   : absolute;
// 		right      : 10px;
// 		font-size  : 18px;
// 		color      : #999;
// 		cursor     : pointer;
// 		transition : color 0.15s;
// 	}

// 	.global-search-clear:hover {
// 		color : #c0392b;
// 	}

// 	.global-search-count {
// 		margin-top  : 6px;
// 		font-size   : 12px;
// 		color       : #0076B6;
// 		font-weight : 600;
// 		padding-left: 2px;
// 	}


// 	/* ── User Section ─────────────────────────── */

// 	.user-section {
// 		margin-bottom : 50px;
// 	}

// 	.user-header {
// 		display         : flex;
// 		justify-content : space-between;
// 		align-items     : center;
// 		padding-bottom  : 12px;
// 		border-bottom   : 2px solid #0076B6;
// 		margin-bottom   : 18px;
// 	}

// 	.user-name {
// 		font-size   : 18px;
// 		font-weight : 700;
// 		color       : #003B63;
// 	}

// 	.user-email {
// 		font-size : 13px;
// 		color     : #555555;
// 	}


// 	/* ── Important Note ───────────────────────── */

// 	.note-warning {
// 		background    : #fff8e1;
// 		border-left   : 5px solid #f4b400;
// 		padding       : 16px;
// 		border-radius : 6px;
// 		margin-bottom : 25px;
// 	}

// 	.note-header {
// 		font-size     : 14px;
// 		color         : #5c4b00;
// 		margin-bottom : 15px;
// 	}

// 	.note-badge {
// 		background    : #f4b400;
// 		color         : #ffffff;
// 		font-size     : 11px;
// 		font-weight   : 700;
// 		padding       : 3px 8px;
// 		border-radius : 20px;
// 		margin-right  : 8px;
// 	}

// 	.blinking-badge {
// 		animation : softBlink 1.5s ease-in-out infinite;
// 	}

// 	@keyframes softBlink {
// 		0%   { opacity : 1;   }
// 		50%  { opacity : 0.5; }
// 		100% { opacity : 1;   }
// 	}


// 	/* ── Contact Cards ────────────────────────── */

// 	.contact-wrapper {
// 		display   : flex;
// 		gap       : 15px;
// 		flex-wrap : wrap;
// 	}

// 	.contact-card {
// 		background    : #ffffff;
// 		border        : 1px solid #e6e6e6;
// 		border-radius : 8px;
// 		padding       : 12px 15px;
// 		min-width     : 230px;
// 		box-shadow    : 0 3px 10px rgba(0, 0, 0, 0.04);
// 	}

// 	.contact-name {
// 		font-weight   : 600;
// 		color         : #333333;
// 		margin-bottom : 5px;
// 	}

// 	.contact-detail {
// 		font-size : 13px;
// 		color     : #555555;
// 	}


// 	/* ── Allocation Table ─────────────────────── */

// 	.table-title {
// 		font-size     : 15px;
// 		font-weight   : 600;
// 		color         : #003B63;
// 		margin-bottom : 12px;
// 	}

// 	.table-wrapper {
// 		overflow-x : auto;
// 	}

// 	.mis-table {
// 		width            : 100%;
// 		border-collapse  : collapse;
// 		font-size        : 13px;
// 		border           : 1px solid #dcdcdc;
// 	}

// 	.mis-table th {
// 		background  : #0076B6;
// 		color       : #ffffff;
// 		font-weight : 700;
// 		padding     : 8px;
// 		text-align  : center;
// 	}

// 	.mis-table td {
// 		padding    : 8px;
// 		border     : 1px solid #e0e0e0;
// 		text-align : center;
// 	}

// 	.mis-table tr:nth-child(even) {
// 		background : #f9f9f9;
// 	}

// 	.mis-table tr:hover {
// 		background : #eef6fb;
// 	}


// 	/* ── Confirmation Modal ───────────────────── */

// 	#pro-confirm-overlay {
// 		position        : fixed;
// 		inset           : 0;
// 		background      : rgba(0, 0, 0, 0.5);
// 		display         : none;
// 		align-items     : center;
// 		justify-content : center;
// 		z-index         : 9999;
// 		backdrop-filter : blur(4px);
// 		padding         : 15px;
// 	}

// 	.pro-confirm-box {
// 		background    : #ffffff;
// 		width         : 640px;
// 		max-width     : 100%;
// 		min-height    : 360px;
// 		border-radius : 12px;
// 		box-shadow    : 0 25px 60px rgba(0, 0, 0, 0.25);
// 		padding       : 35px;
// 		animation     : scaleIn 0.25s ease;
// 	}

// 	@keyframes scaleIn {
// 		from { transform : scale(0.95); opacity : 0; }
// 		to   { transform : scale(1);    opacity : 1; }
// 	}

// 	.pro-confirm-header {
// 		display         : flex;
// 		justify-content : space-between;
// 		align-items     : center;
// 		font-weight     : 600;
// 		font-size       : 18px;
// 		margin-bottom   : 25px;
// 	}

// 	.pro-confirm-title i {
// 		margin-right : 8px;
// 		color        : #007bff;
// 	}

// 	#pro-confirm-close {
// 		cursor     : pointer;
// 		font-size  : 22px;
// 		color      : #888888;
// 		transition : color 0.2s;
// 	}

// 	#pro-confirm-close:hover {
// 		color : #000000;
// 	}

// 	.pro-confirm-body {
// 		text-align    : center;
// 		margin-bottom : 25px;
// 	}

// 	.pro-warning-icon {
// 		font-size     : 42px;
// 		color         : #e74c3c;
// 		margin-bottom : 15px;
// 	}

// 	.pro-warning-text {
// 		font-weight   : 600;
// 		font-size     : 16px;
// 		color         : #c0392b;
// 		margin-bottom : 15px;
// 		line-height   : 1.6;
// 	}

// 	.pro-warning-sub {
// 		font-size     : 14px;
// 		color         : #555555;
// 		margin-bottom : 25px;
// 		line-height   : 1.6;
// 	}

// 	.pro-checkbox-wrapper {
// 		background    : #f8f9fa;
// 		padding       : 18px;
// 		border-radius : 8px;
// 		border        : 1px solid #e0e0e0;
// 		font-size     : 14px;
// 		text-align    : left;
// 	}

// 	.pro-checkbox-label {
// 		display     : flex;
// 		align-items : flex-start;
// 		gap         : 10px;
// 		cursor      : pointer;
// 	}

// 	.pro-checkbox-label i {
// 		color        : #28a745;
// 		margin-right : 6px;
// 	}

// 	.pro-checkbox-wrapper input {
// 		margin-top : 4px;
// 		transform  : scale(1.1);
// 	}

// 	.pro-confirm-footer {
// 		text-align : right;
// 		margin-top : 20px;
// 	}

// 	.pro-confirm-footer button {
// 		margin-left : 12px;
// 		min-width   : 170px;
// 	}

// 	#pro-confirm-yes:disabled {
// 		opacity : 0.6;
// 		cursor  : not-allowed;
// 	}


// 	/* ── Responsive: Tablet ───────────────────── */
// 	@media (max-width: 768px) {

// 		.user-header {
// 			flex-direction : column;
// 			align-items    : flex-start;
// 			gap            : 10px;
// 		}

// 	}

// 	/* ── Responsive: Mobile ───────────────────── */
// 	@media (max-width: 576px) {

// 		.global-search-inner {
// 			max-width : 100%;
// 		}

// 		.pro-confirm-box {
// 			width      : 100%;
// 			min-height : auto;
// 			padding    : 25px;
// 		}

// 		.pro-confirm-header {
// 			font-size : 16px;
// 		}

// 		.pro-warning-text {
// 			font-size : 15px;
// 		}

// 		.pro-confirm-footer {
// 			text-align : center;
// 		}

// 		.pro-confirm-footer button {
// 			width  : 100%;
// 			margin : 8px 0;
// 		}

// 	}
// 	`;

// 	document.head.appendChild(style);

// }


// frappe.pages["import-template"].on_page_load = function (wrapper) {

// 	frappe.ui.make_app_page({
// 		parent      : wrapper,
// 		title       : "Budget Import Template",
// 		single_column: true,
// 	});

// 	const $container = $(wrapper).find(".layout-main-section");
// 	$container.addClass("budget-import-wrapper");

// 	inject_styles();

// 	$container.html(`
// 		<div class="loading-state">
// 			<i class="fa fa-spinner fa-spin"></i> Loading Data…
// 		</div>
// 	`);

// 	frappe.call({
// 		method  : "annual_budget.api.filter_options.get_user_mappings",
// 		callback: function (r) {
// 			if (!r.message || !r.message.length) {
// 				$container.html(`<div class="empty-state">No Data Found</div>`);
// 				return;
// 			}
// 			render_content($container, r.message);
// 		}
// 	});

// };


// /* ============================================================
//    LOADER
// ============================================================ */

// function _init_loader() {
// 	if ($("#global-loader").length) return;
// 	$("body").append(`
// 		<div id="global-loader" class="loader-overlay">
// 			<div class="loader-box">

// 				<div class="loader-ring-wrap">
// 					<svg class="loader-ring" viewBox="0 0 100 100">
// 						<defs>
// 							<linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
// 								<stop offset="0%"   stop-color="#0076B6"/>
// 								<stop offset="100%" stop-color="#00c6ff"/>
// 							</linearGradient>
// 						</defs>
// 						<circle class="loader-ring-bg"   cx="50" cy="50" r="44"/>
// 						<circle class="loader-ring-fill" id="loader-ring-fill" cx="50" cy="50" r="44"/>
// 					</svg>
// 					<img src="/files/APF logo.png" class="loader-logo" alt="Loading">
// 					<div class="loader-pct-inside" id="loader-pct">0%</div>
// 				</div>

// 				<div class="dl-anim-wrap">
// 					<div class="dl-arrow-track">
// 						<div class="dl-arrow">
// 							<div class="dl-arrow-stem"></div>
// 							<div class="dl-arrow-head"></div>
// 						</div>
// 					</div>
// 					<div class="dl-bar"></div>
// 					<div class="dl-dots">
// 						<span></span><span></span><span></span>
// 					</div>
// 				</div>

// 				<div class="loader-text" id="loader-text-msg">Preparing download…</div>

// 			</div>
// 		</div>
// 	`);
// }

// const Loader = {
// 	show(message = "Preparing download…") {
// 		_init_loader();
// 		$("#loader-text-msg").text(message);
// 		_set_progress(0);
// 		$("#global-loader").addClass("active");
// 	},
// 	setText(message) {
// 		$("#loader-text-msg").text(message);
// 	},
// 	hide() {
// 		$("#global-loader").removeClass("active");
// 	}
// };

// /* SVG ring progress — circumference for r=44 is 2π×44 ≈ 276.46 */
// function _set_progress(pct) {
// 	const offset = 276.46 - (pct / 100) * 276.46;
// 	$("#loader-ring-fill").css("stroke-dashoffset", offset);
// 	$("#loader-pct").text(Math.round(pct) + "%");
// }


// /* ============================================================
//    RENDER CONTENT
// ============================================================ */

// function render_content(container, data) {

// 	const roles                = Array.isArray(frappe.user_roles) ? frappe.user_roles : [];
// 	const isFinanceCoordinator = roles.includes("Finance Unit Coordinator");
// 	const isSystemManager      = roles.includes("System Manager");
// 	const needsModal           = isFinanceCoordinator && !isSystemManager;

// 	const grouped = {};
// 	data.forEach(function (row) {
// 		const key = row.user;
// 		if (!grouped[key]) {
// 			grouped[key] = { user_fullname: row.user_fullname || "", email: row.user, rows: [] };
// 		}
// 		grouped[key].rows.push(row);
// 	});

// 	container.empty();

// 	// ── Global Search Bar ──────────────────────────────────
// 	container.append(`
// 		<div class="global-search-wrap">
// 			<div class="global-search-inner">
// 				<i class="fa fa-search global-search-icon"></i>
// 				<input
// 					type         = "text"
// 					id           = "global-table-search"
// 					class        = "global-search-input"
// 					placeholder  = "Search across all units, cost centers, locations…"
// 					autocomplete = "off"
// 				/>
// 				<span id="global-search-clear" class="global-search-clear" title="Clear">&times;</span>
// 			</div>
// 			<div id="global-search-count" class="global-search-count" style="display:none;"></div>
// 		</div>
// 	`);

// 	// ── Confirm Download Modal ─────────────────────────────
// 	if (!$("#pro-confirm-overlay").length) {
// 		$("body").append(`
// 			<div id="pro-confirm-overlay">
// 				<div class="pro-confirm-box">
// 					<div class="pro-confirm-header">
// 						<div class="pro-confirm-title">
// 							<i class="fa fa-download"></i> Confirm Download
// 						</div>
// 						<span id="pro-confirm-close" title="Close">&times;</span>
// 					</div>
// 					<div class="pro-confirm-body">
// 						<div class="pro-warning-icon">
// 							<i class="fa fa-exclamation-triangle"></i>
// 						</div>
// 						<div class="pro-warning-text">
// 							Please carefully review and validate all allocated Units, Cost Centers,
// 							and Location Codes before downloading the Budget Import Template.
// 						</div>
// 						<div class="pro-warning-sub">
// 							Do not proceed unless everything has been reviewed and confirmed.
// 						</div>
// 						<div class="pro-checkbox-wrapper">
// 							<label class="pro-checkbox-label">
// 								<input type="checkbox" id="pro-confirm-checkbox">
// 								<span>
// 									<i class="fa fa-check-circle"></i>
// 									I confirm that I have verified all details carefully.
// 								</span>
// 							</label>
// 						</div>
// 					</div>
// 					<div class="pro-confirm-footer">
// 						<button id="pro-confirm-no" class="btn btn-default btn-sm">
// 							<i class="fa fa-times"></i> Cancel
// 						</button>
// 						<button id="pro-confirm-yes" class="btn btn-primary btn-sm" disabled>
// 							<i class="fa fa-download"></i> Proceed to Download
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		`);
// 	}

// 	// ── Modal Event Listeners ──────────────────────────────
// 	$(document)
// 		.off(".budgetModal")
// 		.on("change.budgetModal", "#pro-confirm-checkbox", function () {
// 			$("#pro-confirm-yes").prop("disabled", !this.checked);
// 		})
// 		.on("click.budgetModal", "#pro-confirm-no, #pro-confirm-close", function () {
// 			_hide_modal();
// 		})
// 		.on("click.budgetModal", "#pro-confirm-overlay", function (e) {
// 			if ($(e.target).is("#pro-confirm-overlay")) _hide_modal();
// 		})
// 		.on("click.budgetModal", "#pro-confirm-yes", function () {
// 			const $overlay  = $("#pro-confirm-overlay");
// 			const btn       = $overlay.data("trigger-btn");
// 			const userEmail = $overlay.data("user-email");
// 			_hide_modal();
// 			if (!btn || !userEmail) return;
// 			_start_download(btn, userEmail);
// 		});

// 	// ── Build Each User Section ────────────────────────────
// 	Object.values(grouped).forEach(function (userData) {
// 		const displayName = userData.user_fullname || userData.email;

// 		const $section = $(`
// 			<div class="user-section">
// 				<div class="user-header">
// 					<div>
// 						<div class="user-name">${_esc(displayName)}</div>
// 						<div class="user-email">${_esc(userData.email)}</div>
// 					</div>
// 					<div class="button-container"></div>
// 				</div>
// 				<div class="user-body"></div>
// 			</div>
// 		`);
// 		container.append($section);

// 		const $downloadBtn = $(`
// 			<button class="btn btn-primary btn-sm">
// 				<i class="fa fa-download"></i> Download Budget Import Template
// 			</button>
// 		`);
// 		$section.find(".button-container").append($downloadBtn);

// 		if (needsModal) {
// 			$downloadBtn.on("click", function () {
// 				$("#pro-confirm-overlay")
// 					.css("display", "flex")
// 					.data("trigger-btn",  $(this))
// 					.data("user-email",   userData.email);
// 				$("#pro-confirm-checkbox").prop("checked", false);
// 				$("#pro-confirm-yes").prop("disabled", true);
// 			});
// 		} else {
// 			$downloadBtn.on("click", function () {
// 				_start_download($(this), userData.email);
// 			});
// 		}

// 		const $body = $section.find(".user-body");
// 		if (needsModal) $body.append(_build_note_html());
// 		$body.append(_build_table_html(userData.rows));
// 	});

// 	// ── Global Search Logic ────────────────────────────────
// 	function run_global_search(query) {
// 		const q = query.trim().toLowerCase();
// 		let totalVisible = 0;

// 		$(".user-section").each(function () {
// 			const $section = $(this);
// 			let sectionVisible = 0;

// 			$section.find(".mis-table tbody tr").each(function () {
// 				const match = !q || this.textContent.toLowerCase().includes(q);
// 				$(this).toggle(match);
// 				if (match) { sectionVisible++; totalVisible++; }
// 			});

// 			$section.toggle(!q || sectionVisible > 0);
// 		});

// 		const $count = $("#global-search-count");
// 		if (q) {
// 			$count.text(`${totalVisible} row${totalVisible !== 1 ? "s" : ""} matched`).show();
// 		} else {
// 			$count.hide();
// 		}
// 		$("#global-search-clear").toggle(q.length > 0);
// 	}

// 	$(document)
// 		.off(".globalSearch")
// 		.on("input.globalSearch", "#global-table-search", function () {
// 			run_global_search(this.value);
// 		})
// 		.on("click.globalSearch", "#global-search-clear", function () {
// 			$("#global-table-search").val("").trigger("input");
// 		});

// 	$("#global-search-clear").hide();
// }


// /* ============================================================
//    HELPER FUNCTIONS
// ============================================================ */

// function _esc(str) {
// 	return $("<div>").text(str || "").html();
// }

// function _hide_modal() {
// 	$("#pro-confirm-overlay").hide();
// 	$("#pro-confirm-checkbox").prop("checked", false);
// 	$("#pro-confirm-yes").prop("disabled", true);
// }

// function _reset_btn($btn) {
// 	$btn
// 		.prop("disabled", false)
// 		.html('<i class="fa fa-download"></i> Download Budget Import Template');
// }


// /* ── _start_download()
//    Step 1 — trigger generation via frappe.call
//    Step 2 — poll every 3s; simulate progress 5→85% while waiting
//    Step 3 — when file is ready, download it in the same tab via blob URL
//    No timeout is set — waits as long as the API needs. */

// function _start_download($btn, userEmail, import_template_id) {

// 	// ─────────────── 1. CHECK IMPORT TEMPLATE ───────────────
// 	if (!import_template_id) {

// 		let d = new frappe.ui.Dialog({
// 			title: '<i class="fa fa-exclamation-triangle text-danger"></i> Missing Import Template',
// 			size: "small",
// 			fields: [
// 				{
// 					fieldtype: "HTML",
// 					fieldname: "warning_html"
// 				}
// 			],
// 			primary_action_label: "Close",
// 			primary_action() {
// 				d.hide();
// 			}
// 		});

// 		d.fields_dict.warning_html.$wrapper.html(`
// 			<div style="text-align:center;padding:10px;">
// 				<div style="font-size:40px;color:#d9534f;margin-bottom:10px;">
// 					<i class="fa fa-exclamation-triangle"></i>
// 				</div>

// 				<div style="font-size:14px;color:#444;margin-bottom:10px;">
// 					Import Template is not configured for your account.
// 				</div>

// 				<div style="color:#777;font-size:13px;">
// 					Please contact your administrator to link an
// 					<b>Import Template</b> in <b>Finance User Access</b>
// 					before downloading the Budget Import Template.
// 				</div>
// 			</div>
// 		`);

// 		d.show();

// 		return; // 🚨 stop execution
// 	}

// 	// ─────────────── 2. CONFIRM DOWNLOAD ───────────────
// 	let confirm_dialog = new frappe.ui.Dialog({
// 		title: '<i class="fa fa-download text-primary"></i> Confirm Download',
// 		size: "small",
// 		fields: [
// 			{
// 				fieldtype: "HTML",
// 				fieldname: "warning"
// 			},
// 			{
// 				fieldtype: "Check",
// 				fieldname: "confirm_check",
// 				label: "I confirm that I have verified all details carefully."
// 			}
// 		],

// 		primary_action_label: "Proceed to Download",

// 		primary_action(values) {

// 			if (!values.confirm_check) {

// 				frappe.msgprint({
// 					title: "Confirmation Required",
// 					message: "Please confirm that you have reviewed the data before proceeding.",
// 					indicator: "orange"
// 				});

// 				return;
// 			}

// 			confirm_dialog.hide();

// 			run_download_job($btn, userEmail);
// 		}
// 	});

// 	confirm_dialog.fields_dict.warning.$wrapper.html(`
// 		<div style="text-align:center;padding:10px;">
// 			<div style="font-size:40px;color:#d9534f;margin-bottom:10px;">
// 				<i class="fa fa-exclamation-triangle"></i>
// 			</div>

// 			<div style="font-size:14px;color:#c0392b;font-weight:500;margin-bottom:6px;">
// 				Please carefully review and validate all allocated Units,
// 				Cost Centers, and Location Codes before downloading the
// 				Budget Import Template.
// 			</div>

// 			<div style="color:#777;font-size:13px;">
// 				Do not proceed unless everything has been reviewed and confirmed.
// 			</div>
// 		</div>
// 	`);

// 	confirm_dialog.show();
// }



// function run_download_job($btn, userEmail) {

// 	$btn.prop("disabled", true)
// 		.html('<i class="fa fa-spinner fa-spin"></i> Preparing…');

// 	Loader.show("Generating your template…");

// 	let pct = 5;
// 	let pollInterval = null;

// 	const progressInterval = setInterval(function () {

// 		const step = pct < 40 ? 4 : pct < 65 ? 2 : 0.5;
// 		pct = Math.min(pct + step, 85);

// 		_set_progress(pct);

// 	}, 300);


// 	function cleanup(success) {

// 		clearInterval(progressInterval);

// 		if (pollInterval) clearInterval(pollInterval);

// 		if (success) {

// 			_set_progress(100);
// 			Loader.setText("Download ready!");

// 			setTimeout(function () {

// 				Loader.hide();

// 				$btn.prop("disabled", false)
// 					.html('<i class="fa fa-download"></i> Download Budget Import Template');

// 			}, 800);

// 		} else {

// 			Loader.hide();

// 			$btn.prop("disabled", false)
// 				.html('<i class="fa fa-download"></i> Download Budget Import Template');

// 		}
// 	}


// 	frappe.call({
// 		method: "annual_budget.api.export_reports.start_budget_template_generation",
// 		args: { user: userEmail },

// 		callback: function () {

// 			Loader.setText("Fetching your template…");

// 			pollInterval = setInterval(function () {

// 				const url =
// 					"/api/method/annual_budget.api.export_reports.download_generated_template" +
// 					"?user=" + encodeURIComponent(userEmail);

// 				fetch(url)

// 					.then(function (response) {

// 						if (!response.ok) {
// 							throw new Error("Server returned " + response.status);
// 						}

// 						const contentType = response.headers.get("content-type") || "";

// 						if (contentType.includes("application/json")) {

// 							return response.json().then(function (data) {

// 								if (data.message?.status === "processing") {
// 									Loader.setText("Still generating, please wait…");
// 								}

// 							});
// 						}

// 						clearInterval(pollInterval);

// 						const disposition = response.headers.get("Content-Disposition") || "";
// 						const match = disposition.match(/filename[^;=\n]*=["']?([^"';\n]+)/);

// 						const filename = match
// 							? decodeURIComponent(match[1].trim())
// 							: "budget_import_template.xlsx";

// 						return response.blob().then(function (blob) {

// 							const blobUrl = URL.createObjectURL(blob);

// 							const a = document.createElement("a");
// 							a.href = blobUrl;
// 							a.download = filename;

// 							document.body.appendChild(a);
// 							a.click();
// 							a.remove();

// 							setTimeout(function () {
// 								URL.revokeObjectURL(blobUrl);
// 							}, 2000);

// 							cleanup(true);

// 						});

// 					})

// 					.catch(function (err) {

// 						cleanup(false);

// 						frappe.msgprint({
// 							title: "Download Failed",
// 							message: "Could not download the template.<br><small>" + err.message + "</small>",
// 							indicator: "red"
// 						});

// 					});

// 			}, 3000);

// 		}
// 	});
// }

// function _build_note_html() {

// 	const contacts = [
// 		["Rakesh Ahuja",         "rakesh.ahuja@azimpremjifoundation.org",      "+91 7022068106"],
// 		["Saravana G",           "saravana.g@azimpremjifoundation.org",        "+91 9380861952"],
// 		["Augustin Moses R",     "augustin.moses@azimpremjifoundation.org",    "+91 8667719594"],
// 		["Mercy Selvanayagi R",  "mercy.selvanayagi@azimpremjifoundation.org", "+91 9047828687"],
// 		["Mahaveer Ram P",       "mahaveer.p@azimpremjifoundation.org",        "+91 8825879412"],
// 	];

// 	const contactCards = contacts.map(function (c) {
// 		return `
// 			<div class="contact-card">
// 				<div class="contact-name">${c[0]}</div>
// 				<div class="contact-detail">${c[1]}</div>
// 				<div class="contact-detail">${c[2]}</div>
// 			</div>
// 		`;
// 	}).join("");

// 	return `
// 		<div class="note-warning">
// 			<div class="note-header">
// 				<span class="note-badge blinking-badge">IMPORTANT</span>
// 				Before importing, please carefully cross-verify the allocated Units and Cost Centers listed below.
// 				If you notice any discrepancies, contact the support team immediately.
// 				Do not proceed with the import until all details are verified and confirmed.
// 			</div>
// 			<div class="contact-wrapper">${contactCards}</div>
// 		</div>
// 	`;
// }


// function _build_table_html(rows) {

// 	const COLUMNS = [
// 		["unit",                    "Unit"                    ],
// 		["unit_description",        "Unit Description"        ],
// 		["cost_center",             "Cost Center"             ],
// 		["cost_center_description", "Cost Center Description" ],
// 		["location_code",           "Location Code"           ],
// 		["location_description",    "Location Description"    ],
// 	];

// 	const headerCells = COLUMNS.map(col => `<th>${col[1]}</th>`).join("");

// 	const dataRows = rows.map(function (row, idx) {
// 		const cells = COLUMNS.map(col => `<td>${_esc(row[col[0]] || "")}</td>`).join("");
// 		return `<tr><td>${idx + 1}</td>${cells}</tr>`;
// 	}).join("");

// 	return `
// 		<h4 class="table-title">Allocated Units &amp; Cost Centers</h4>
// 		<div class="table-wrapper">
// 			<table class="mis-table">
// 				<thead>
// 					<tr>
// 						<th>Sl. No.</th>
// 						${headerCells}
// 					</tr>
// 				</thead>
// 				<tbody>${dataRows}</tbody>
// 			</table>
// 		</div>
// 	`;
// }


// /* ============================================================
//    INJECT STYLES
// ============================================================ */

// function inject_styles() {

// 	if (document.getElementById("allocation-style")) return;

// 	const style    = document.createElement("style");
// 	style.id       = "allocation-style";
// 	style.textContent = `

// 	/* ── Page Wrapper ─────────────────────────── */
// 	.budget-import-wrapper {
// 		padding    : 25px;
// 		background : #ffffff;
// 		min-height : 100vh;
// 	}

// 	/* ── Loading / Empty States ───────────────── */
// 	.loading-state,
// 	.empty-state {
// 		text-align  : center;
// 		padding     : 50px;
// 		font-weight : 600;
// 		color       : #0076B6;
// 	}

// 	/* ── Global Search Bar ────────────────────── */
// 	.global-search-wrap { margin-bottom: 30px; }

// 	.global-search-inner {
// 		position    : relative;
// 		display     : flex;
// 		align-items : center;
// 		max-width   : 520px;
// 	}

// 	.global-search-icon {
// 		position       : absolute;
// 		left           : 12px;
// 		color          : #0076B6;
// 		font-size      : 14px;
// 		pointer-events : none;
// 	}

// 	.global-search-input {
// 		width         : 100%;
// 		padding       : 10px 36px;
// 		border        : 1.5px solid #c8dff0;
// 		border-radius : 8px;
// 		font-size     : 14px;
// 		color         : #222;
// 		outline       : none;
// 		background    : #f4f9fd;
// 		transition    : border-color 0.2s, box-shadow 0.2s;
// 	}

// 	.global-search-input:focus {
// 		border-color : #0076B6;
// 		box-shadow   : 0 0 0 3px rgba(0,118,182,0.12);
// 		background   : #ffffff;
// 	}

// 	.global-search-clear {
// 		position   : absolute;
// 		right      : 10px;
// 		font-size  : 18px;
// 		color      : #999;
// 		cursor     : pointer;
// 		transition : color 0.15s;
// 	}

// 	.global-search-clear:hover { color: #c0392b; }

// 	.global-search-count {
// 		margin-top  : 6px;
// 		font-size   : 12px;
// 		color       : #0076B6;
// 		font-weight : 600;
// 		padding-left: 2px;
// 	}

// 	/* ── User Section ─────────────────────────── */
// 	.user-section { margin-bottom: 50px; }

// 	.user-header {
// 		display         : flex;
// 		justify-content : space-between;
// 		align-items     : center;
// 		padding-bottom  : 12px;
// 		border-bottom   : 2px solid #0076B6;
// 		margin-bottom   : 18px;
// 	}

// 	.user-name  { font-size: 18px; font-weight: 700; color: #003B63; }
// 	.user-email { font-size: 13px; color: #555555; }

// 	/* ── Important Note ───────────────────────── */
// 	.note-warning {
// 		background    : #fff8e1;
// 		border-left   : 5px solid #f4b400;
// 		padding       : 16px;
// 		border-radius : 6px;
// 		margin-bottom : 25px;
// 	}

// 	.note-header { font-size: 14px; color: #5c4b00; margin-bottom: 15px; }

// 	.note-badge {
// 		background    : #f4b400;
// 		color         : #ffffff;
// 		font-size     : 11px;
// 		font-weight   : 700;
// 		padding       : 3px 8px;
// 		border-radius : 20px;
// 		margin-right  : 8px;
// 	}

// 	.blinking-badge { animation: softBlink 1.5s ease-in-out infinite; }

// 	@keyframes softBlink {
// 		0%, 100% { opacity: 1;   }
// 		50%      { opacity: 0.5; }
// 	}

// 	/* ── Contact Cards ────────────────────────── */
// 	.contact-wrapper { display: flex; gap: 15px; flex-wrap: wrap; }

// 	.contact-card {
// 		background    : #ffffff;
// 		border        : 1px solid #e6e6e6;
// 		border-radius : 8px;
// 		padding       : 12px 15px;
// 		min-width     : 230px;
// 		box-shadow    : 0 3px 10px rgba(0,0,0,0.04);
// 	}

// 	.contact-name   { font-weight: 600; color: #333333; margin-bottom: 5px; }
// 	.contact-detail { font-size: 13px; color: #555555; }

// 	/* ── Allocation Table ─────────────────────── */
// 	.table-title   { font-size: 15px; font-weight: 600; color: #003B63; margin-bottom: 12px; }
// 	.table-wrapper { overflow-x: auto; }

// 	.mis-table { width: 100%; border-collapse: collapse; font-size: 13px; border: 1px solid #dcdcdc; }
// 	.mis-table th { background: #0076B6; color: #ffffff; font-weight: 700; padding: 8px; text-align: center; }
// 	.mis-table td { padding: 8px; border: 1px solid #e0e0e0; text-align: center; }
// 	.mis-table tr:nth-child(even) { background: #f9f9f9; }
// 	.mis-table tr:hover           { background: #eef6fb; }

// 	/* ── Confirmation Modal ───────────────────── */
// 	#pro-confirm-overlay {
// 		position        : fixed;
// 		inset           : 0;
// 		background      : rgba(0,0,0,0.5);
// 		display         : none;
// 		align-items     : center;
// 		justify-content : center;
// 		z-index         : 9999;
// 		backdrop-filter : blur(4px);
// 		padding         : 15px;
// 	}

// 	.pro-confirm-box {
// 		background    : #ffffff;
// 		width         : 640px;
// 		max-width     : 100%;
// 		min-height    : 360px;
// 		border-radius : 12px;
// 		box-shadow    : 0 25px 60px rgba(0,0,0,0.25);
// 		padding       : 35px;
// 		animation     : scaleIn 0.25s ease;
// 	}

// 	@keyframes scaleIn {
// 		from { transform: scale(0.95); opacity: 0; }
// 		to   { transform: scale(1);    opacity: 1; }
// 	}

// 	.pro-confirm-header {
// 		display         : flex;
// 		justify-content : space-between;
// 		align-items     : center;
// 		font-weight     : 600;
// 		font-size       : 18px;
// 		margin-bottom   : 25px;
// 	}

// 	.pro-confirm-title i { margin-right: 8px; color: #007bff; }

// 	#pro-confirm-close {
// 		cursor     : pointer;
// 		font-size  : 22px;
// 		color      : #888888;
// 		transition : color 0.2s;
// 	}

// 	#pro-confirm-close:hover { color: #000000; }

// 	.pro-confirm-body  { text-align: center; margin-bottom: 25px; }
// 	.pro-warning-icon  { font-size: 42px; color: #e74c3c; margin-bottom: 15px; }
// 	.pro-warning-text  { font-weight: 600; font-size: 16px; color: #c0392b; margin-bottom: 15px; line-height: 1.6; }
// 	.pro-warning-sub   { font-size: 14px; color: #555555; margin-bottom: 25px; line-height: 1.6; }

// 	.pro-checkbox-wrapper {
// 		background    : #f8f9fa;
// 		padding       : 18px;
// 		border-radius : 8px;
// 		border        : 1px solid #e0e0e0;
// 		font-size     : 14px;
// 		text-align    : left;
// 	}

// 	.pro-checkbox-label { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
// 	.pro-checkbox-label i { color: #28a745; margin-right: 6px; }
// 	.pro-checkbox-wrapper input { margin-top: 4px; transform: scale(1.1); }

// 	.pro-confirm-footer { text-align: right; margin-top: 20px; }
// 	.pro-confirm-footer button { margin-left: 12px; min-width: 170px; }
// 	#pro-confirm-yes:disabled { opacity: 0.6; cursor: not-allowed; }

// 	/* ── APF Loader Overlay ───────────────────── */
// 	#global-loader.loader-overlay {
// 		position        : fixed;
// 		inset           : 0;
// 		width           : 100vw;
// 		height          : 100vh;
// 		background      : rgba(18,18,18,0.92);
// 		backdrop-filter : blur(6px);
// 		z-index         : 999999;
// 		display         : none;
// 		align-items     : center;
// 		justify-content : center;
// 	}

// 	#global-loader.loader-overlay.active { display: flex; }

// 	.loader-box {
// 		display         : flex;
// 		flex-direction  : column;
// 		align-items     : center;
// 		justify-content : center;
// 		gap             : 16px;
// 	}

// 	.loader-ring-wrap {
// 		position        : relative;
// 		width           : 120px;
// 		height          : 120px;
// 		display         : flex;
// 		align-items     : center;
// 		justify-content : center;
// 	}

// 	.loader-ring {
// 		position  : absolute;
// 		inset     : 0;
// 		width     : 100%;
// 		height    : 100%;
// 		transform : rotate(-90deg);
// 	}

// 	.loader-ring-bg {
// 		fill         : none;
// 		stroke       : rgba(255,255,255,0.12);
// 		stroke-width : 6;
// 	}

// 	.loader-ring-fill {
// 		fill              : none;
// 		stroke            : url(#ringGrad);
// 		stroke-width      : 6;
// 		stroke-linecap    : round;
// 		stroke-dasharray  : 276.46;
// 		stroke-dashoffset : 276.46;
// 		transition        : stroke-dashoffset 0.35s ease;
// 	}

// 	.loader-logo {
// 		width         : 78px;
// 		height        : 78px;
// 		border-radius : 50%;
// 		background    : linear-gradient(145deg, #ffffff, #eaeaea);
// 		padding       : 12px;
// 		object-fit    : contain;
// 		box-shadow    : 0 8px 24px rgba(0,0,0,.35);
// 		animation     : pulse 1.6s infinite ease-in-out;
// 		position      : relative;
// 		z-index       : 1;
// 	}

// 	.loader-pct-inside {
// 		position      : absolute;
// 		bottom        : -4px;
// 		left          : 50%;
// 		transform     : translateX(-50%);
// 		font-size     : 11px;
// 		font-weight   : 700;
// 		color         : #ffffff;
// 		background    : rgba(0,118,182,0.85);
// 		padding       : 1px 7px;
// 		border-radius : 99px;
// 		z-index       : 2;
// 		white-space   : nowrap;
// 	}

// 	.loader-text {
// 		font-size      : 14px;
// 		color          : #ffffff;
// 		font-weight    : 600;
// 		letter-spacing : 0.5px;
// 		text-align     : center;
// 		opacity        : 0.85;
// 	}

// 	@keyframes pulse {
// 		0%, 100% { transform: scale(1);    opacity: 0.85; }
// 		50%      { transform: scale(1.06); opacity: 1;    }
// 	}

// 	/* ── Download Animation ───────────────────── */
// 	.dl-anim-wrap {
// 		display        : flex;
// 		flex-direction : column;
// 		align-items    : center;
// 		gap            : 6px;
// 		width          : 60px;
// 	}

// 	.dl-arrow-track {
// 		width    : 24px;
// 		height   : 28px;
// 		overflow : hidden;
// 		position : relative;
// 	}

// 	.dl-arrow {
// 		display        : flex;
// 		flex-direction : column;
// 		align-items    : center;
// 		position       : absolute;
// 		top            : 0;
// 		left           : 50%;
// 		transform      : translateX(-50%);
// 		animation      : dl-drop 1.2s ease-in-out infinite;
// 	}

// 	.dl-arrow-stem {
// 		width         : 3px;
// 		height        : 14px;
// 		background    : linear-gradient(180deg, #00c6ff, #0076B6);
// 		border-radius : 2px;
// 	}

// 	.dl-arrow-head {
// 		width        : 0;
// 		height       : 0;
// 		border-left  : 7px solid transparent;
// 		border-right : 7px solid transparent;
// 		border-top   : 9px solid #0076B6;
// 	}

// 	@keyframes dl-drop {
// 		0%   { top: -28px; opacity: 0; }
// 		30%  { opacity: 1; }
// 		70%  { opacity: 1; }
// 		100% { top: 28px;  opacity: 0; }
// 	}

// 	.dl-bar {
// 		width         : 44px;
// 		height        : 4px;
// 		background    : linear-gradient(90deg, #0076B6, #00c6ff);
// 		border-radius : 99px;
// 		animation     : dl-bar-pulse 1.2s ease-in-out infinite;
// 	}

// 	@keyframes dl-bar-pulse {
// 		0%, 100% { opacity: 0.4; transform: scaleX(0.8); }
// 		50%      { opacity: 1;   transform: scaleX(1);   }
// 	}

// 	.dl-dots { display: flex; gap: 5px; }

// 	.dl-dots span {
// 		width         : 5px;
// 		height        : 5px;
// 		border-radius : 50%;
// 		background    : rgba(255,255,255,0.6);
// 		animation     : dl-bounce 1.2s ease-in-out infinite;
// 	}

// 	.dl-dots span:nth-child(1) { animation-delay: 0s;   }
// 	.dl-dots span:nth-child(2) { animation-delay: 0.2s; }
// 	.dl-dots span:nth-child(3) { animation-delay: 0.4s; }

// 	@keyframes dl-bounce {
// 		0%, 80%, 100% { transform: scale(1);   opacity: 0.5; }
// 		40%           { transform: scale(1.5); opacity: 1;   }
// 	}

// 	/* ── Responsive ───────────────────────────── */
// 	@media (max-width: 768px) {
// 		.user-header { flex-direction: column; align-items: flex-start; gap: 10px; }
// 	}

// 	@media (max-width: 576px) {
// 		.global-search-inner { max-width: 100%; }
// 		.pro-confirm-box     { width: 100%; min-height: auto; padding: 25px; }
// 		.pro-confirm-header  { font-size: 16px; }
// 		.pro-warning-text    { font-size: 15px; }
// 		.pro-confirm-footer  { text-align: center; }
// 		.pro-confirm-footer button { width: 100%; margin: 8px 0; }
// 	}
// 	`;

// 	document.head.appendChild(style);
// }














// frappe.pages["import-template"].on_page_load = function (wrapper) {

// 	frappe.ui.make_app_page({
// 		parent      : wrapper,
// 		title       : "Budget Import Template",
// 		single_column: true,
// 	});

// 	const $container = $(wrapper).find(".layout-main-section");
// 	$container.addClass("budget-import-wrapper");

// 	inject_styles();

// 	$container.html(`
// 		<div class="loading-state">
// 			<i class="fa fa-spinner fa-spin"></i> Loading Data…
// 		</div>
// 	`);

// 	frappe.call({
// 		method  : "annual_budget.api.filter_options.get_user_mappings",
// 		callback: function (r) {
// 			if (!r.message || !r.message.length) {
// 				$container.html(`<div class="empty-state">No Data Found</div>`);
// 				return;
// 			}
// 			render_content($container, r.message);
// 		}
// 	});

// };


// /* ============================================================
//    LOADER
// ============================================================ */

// function _init_loader() {
// 	if ($("#global-loader").length) return;
// 	$("body").append(`
// 		<div id="global-loader" class="loader-overlay">
// 			<div class="loader-box">

// 				<div class="loader-ring-wrap">
// 					<svg class="loader-ring" viewBox="0 0 100 100">
// 						<defs>
// 							<linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
// 								<stop offset="0%"   stop-color="#0076B6"/>
// 								<stop offset="100%" stop-color="#00c6ff"/>
// 							</linearGradient>
// 						</defs>
// 						<circle class="loader-ring-bg"   cx="50" cy="50" r="44"/>
// 						<circle class="loader-ring-fill" id="loader-ring-fill" cx="50" cy="50" r="44"/>
// 					</svg>
// 					<img src="/files/APF logo.png" class="loader-logo" alt="Loading">
// 					<div class="loader-pct-inside" id="loader-pct">0%</div>
// 				</div>

// 				<div class="dl-anim-wrap">
// 					<div class="dl-arrow-track">
// 						<div class="dl-arrow">
// 							<div class="dl-arrow-stem"></div>
// 							<div class="dl-arrow-head"></div>
// 						</div>
// 					</div>
// 					<div class="dl-bar"></div>
// 					<div class="dl-dots">
// 						<span></span><span></span><span></span>
// 					</div>
// 				</div>

// 				<div class="loader-text" id="loader-text-msg">Preparing download…</div>

// 			</div>
// 		</div>
// 	`);
// }

// const Loader = {
// 	show(msg = "Preparing download…") {
// 		_init_loader();
// 		$("#loader-text-msg").text(msg);
// 		_set_progress(0);
// 		$("#global-loader").addClass("active");
// 	},
// 	setText(msg) {
// 		$("#loader-text-msg").text(msg);
// 	},
// 	hide() {
// 		$("#global-loader").removeClass("active");
// 	}
// };

// /* SVG ring — circumference for r=44: 2π×44 ≈ 276.46 */
// function _set_progress(pct) {
// 	const offset = 276.46 - (pct / 100) * 276.46;
// 	$("#loader-ring-fill").css("stroke-dashoffset", offset);
// 	$("#loader-pct").text(Math.round(pct) + "%");
// }


// /* ============================================================
//    MODAL SYSTEM
// ============================================================ */

// function _init_modal() {
// 	if ($("#apf-modal-overlay").length) return;
// 	$("body").append(`
// 		<div id="apf-modal-overlay">
// 			<div class="apf-modal-box">

// 				<div class="apf-modal-header">
// 					<div class="apf-modal-title" id="apf-modal-title"></div>
// 					<span id="apf-modal-close" title="Close">&times;</span>
// 				</div>

// 				<div class="apf-modal-body">
// 					<div class="apf-modal-icon" id="apf-modal-icon">
// 						<i id="apf-modal-icon-i" class="fa"></i>
// 					</div>
// 					<div class="apf-modal-text" id="apf-modal-text"></div>
// 					<div class="apf-modal-sub"  id="apf-modal-sub"></div>

// 					<div class="apf-checkbox-wrapper" id="apf-checkbox-wrap" style="display:none;">
// 						<label class="apf-checkbox-label">
// 							<input type="checkbox" id="apf-modal-checkbox">
// 							<span>
// 								<i class="fa fa-check-circle"></i>
// 								I confirm that I have verified all details carefully.
// 							</span>
// 						</label>
// 					</div>
// 				</div>

// 				<div class="apf-modal-footer" id="apf-modal-footer"></div>

// 			</div>
// 		</div>
// 	`);

// 	$(document)
// 		.off(".apfModal")
// 		.on("click.apfModal", "#apf-modal-close", _hide_modal)
// 		.on("click.apfModal", "#apf-modal-overlay", function (e) {
// 			if ($(e.target).is("#apf-modal-overlay")) _hide_modal();
// 		})
// 		.on("change.apfModal", "#apf-modal-checkbox", function () {
// 			$("#apf-modal-proceed").prop("disabled", !this.checked);
// 		});
// }

// function _hide_modal() {
// 	$("#apf-modal-overlay").hide();
// 	$("#apf-modal-checkbox").prop("checked", false);
// 	$("#apf-modal-proceed").prop("disabled", true);
// }

// function _show_modal(opts) {
// 	_init_modal();

// 	$("#apf-modal-title").html(opts.title || "");

// 	$("#apf-modal-icon-i")
// 		.attr("class", "fa " + (opts.icon || "fa-exclamation-triangle"))
// 		.closest(".apf-modal-icon")
// 		.css("color", opts.iconColor || "#e74c3c");

// 	$("#apf-modal-text").html(opts.text || "");
// 	$("#apf-modal-sub").html(opts.sub   || "");

// 	const showCb = !!opts.showCheckbox;
// 	$("#apf-checkbox-wrap").toggle(showCb);
// 	if (showCb) $("#apf-modal-checkbox").prop("checked", false);

// 	const $footer = $("#apf-modal-footer").empty();
// 	(opts.buttons || []).forEach(function (btn) {
// 		const $b = $(`
// 			<button id="${btn.id || ""}" class="btn ${btn.cls || "btn-default"} btn-sm">
// 				${btn.label}
// 			</button>
// 		`).prop("disabled", !!btn.disabled);
// 		$b.on("click", function () { btn.onClick && btn.onClick(); });
// 		$footer.append($b);
// 	});

// 	$("#apf-modal-overlay").css("display", "flex");
// }


// /* ============================================================
//    RENDER CONTENT
// ============================================================ */

// function render_content(container, data) {

// 	// ── Role detection ─────────────────────────────────────
// 	const roles                = Array.isArray(frappe.user_roles) ? frappe.user_roles : [];
// 	const isFinanceCoordinator = roles.includes("Finance Unit Coordinator");
// 	const isSystemManager      = roles.includes("System Manager");
// 	const isFinanceAdmin       = roles.includes("Finance Admin");

// 	// Modal shown only to Finance Unit Coordinator (NOT to System Manager or Finance Admin)
// 	const needsModal    = isFinanceCoordinator && !isSystemManager && !isFinanceAdmin;

// 	// Only System Manager / Finance Admin get the expand/collapse checkbox
// 	const isCollapsible = isSystemManager || isFinanceAdmin;

// 	// ── Group rows by user email ───────────────────────────
// 	const grouped = {};
// 	data.forEach(function (row) {
// 		if (!grouped[row.user]) {
// 			grouped[row.user] = {
// 				user_fullname: row.user_fullname || "",
// 				email        : row.user,
// 				rows         : []
// 			};
// 		}
// 		grouped[row.user].rows.push(row);
// 	});

// 	container.empty();

// 	// ── Global Search Bar ──────────────────────────────────
// 	container.append(`
// 		<div class="global-search-wrap">
// 			<div class="global-search-inner">
// 				<i class="fa fa-search global-search-icon"></i>
// 				<input
// 					type         = "text"
// 					id           = "global-table-search"
// 					class        = "global-search-input"
// 					placeholder  = "Search across all units, cost centers, locations…"
// 					autocomplete = "off"
// 				/>
// 				<span id="global-search-clear" class="global-search-clear" title="Clear">&times;</span>
// 			</div>
// 			<div id="global-search-count" class="global-search-count" style="display:none;"></div>
// 		</div>
// 	`);

// 	// ── User Sections ──────────────────────────────────────
// 	Object.values(grouped).forEach(function (userData) {

// 		const displayName = userData.user_fullname || userData.email;
// 		const rowCount    = userData.rows.length;
// 		// Unique ID per section for checkbox binding
// 		const cbId        = "expand-cb-" + userData.email.replace(/[^a-z0-9]/gi, "_");

// 		const $section = $(`
// 			<div class="user-section">

// 				<div class="user-header ${isCollapsible ? "user-header-collapsible" : ""}">
// 					<div class="user-header-left">
// 						<div class="user-name">${_esc(displayName)}</div>
// 						<div class="user-email">${_esc(userData.email)}</div>
// 					</div>
// 					<div class="user-header-right">
// 						<div class="button-container"></div>
// 						${isCollapsible ? `
// 						<label class="expand-toggle-label" title="Expand / Collapse rows">
// 							<input type="checkbox" id="${cbId}" class="expand-toggle-cb" autocomplete="off">
// 							<span class="expand-toggle-track">
// 								<span class="expand-toggle-thumb"></span>
// 							</span>
// 							<span class="expand-toggle-text">
// 								View ${rowCount} row${rowCount !== 1 ? "s" : ""}
// 							</span>
// 						</label>` : ""}
// 					</div>
// 				</div>

// 				<div class="user-body" style="display:${isCollapsible ? "none" : "block"};"></div>

// 			</div>
// 		`);

// 		container.append($section);

// 		// ── Checkbox expand/collapse (admin roles only) ────
// 		if (isCollapsible) {
// 			$section.find(".expand-toggle-cb").on("change", function () {
// 				const $body    = $section.find(".user-body");
// 				const $header  = $section.find(".user-header");
// 				const $text    = $section.find(".expand-toggle-text");
// 				const expanded = this.checked;

// 				if (expanded) {
// 					$body.slideDown(200);
// 					$header.addClass("is-open");
// 					$text.text("Collapse");
// 				} else {
// 					$body.slideUp(200);
// 					$header.removeClass("is-open");
// 					$text.text("View " + rowCount + " row" + (rowCount !== 1 ? "s" : ""));
// 				}
// 			});
// 		}

// 		// ── Download Button ────────────────────────────────
// 		const $dlBtn = $(`
// 			<button class="btn btn-primary btn-sm dl-btn">
// 				<i class="fa fa-download"></i> Download Budget Import Template
// 			</button>
// 		`);
// 		$section.find(".button-container").append($dlBtn);

// 		$dlBtn.on("click", function () {
// 			if (needsModal) {
// 				_check_and_download($(this), userData.email, false);
// 			} else {
// 				// System Manager / Finance Admin — check template but with admin-specific error
// 				_check_and_download($(this), userData.email, true);
// 			}
// 		});

// 		// ── Body: note (Finance Coordinator only) + table ──
// 		const $body = $section.find(".user-body");
// 		if (needsModal) $body.append(_build_note_html());
// 		$body.append(_build_table_html(userData.rows));
// 	});

// 	// ── Global Search ──────────────────────────────────────
// 	$(document)
// 		.off(".globalSearch")
// 		.on("input.globalSearch", "#global-table-search", function () {
// 			_run_search(this.value);
// 		})
// 		.on("click.globalSearch", "#global-search-clear", function () {
// 			$("#global-table-search").val("").trigger("input");
// 		});

// 	$("#global-search-clear").hide();
// }

// function _run_search(query) {
// 	const q = query.trim().toLowerCase();
// 	let total = 0;

// 	$(".user-section").each(function () {
// 		const $sec = $(this);
// 		let visible = 0;

// 		$sec.find(".mis-table tbody tr").each(function () {
// 			const match = !q || this.textContent.toLowerCase().includes(q);
// 			$(this).toggle(match);
// 			if (match) { visible++; total++; }
// 		});

// 		// When searching: auto-expand sections that have matches
// 		if (q && visible > 0) {
// 			const $cb     = $sec.find(".expand-toggle-cb");
// 			const $header = $sec.find(".user-header");
// 			const $text   = $sec.find(".expand-toggle-text");
// 			$sec.find(".user-body").show();
// 			if ($cb.length) {
// 				$cb.prop("checked", true);
// 				$header.addClass("is-open");
// 				$text.text("Collapse");
// 			}
// 		}

// 		$sec.toggle(!q || visible > 0);
// 	});

// 	const $count = $("#global-search-count");
// 	if (q) {
// 		$count.text(`${total} row${total !== 1 ? "s" : ""} matched`).show();
// 	} else {
// 		$count.hide();
// 	}
// 	$("#global-search-clear").toggle(q.length > 0);
// }


// /* ============================================================
//    DOWNLOAD FLOW
//    isAdmin = true  → System Manager / Finance Admin
//    isAdmin = false → Finance Unit Coordinator
// ============================================================ */

// function _check_and_download($btn, userEmail, isAdmin) {

// 	_reset_btn($btn, true);

// 	frappe.call({
// 		method : "frappe.client.get_value",
// 		args   : {
// 			doctype  : "Finance user access",
// 			filters  : { user: userEmail },
// 			fieldname: "import_template_id"
// 		},

// 		callback: function (r) {
// 			_reset_btn($btn, false);

// 			const templateId = r.message && r.message.import_template_id;

// 			if (!templateId) {
// 				if (isAdmin) {
// 					// ── Admin-specific error message ──────────────
// 					_show_modal({
// 						title    : '<i class="fa fa-exclamation-triangle"></i> Template Not Configured',
// 						icon     : "fa-exclamation-triangle",
// 						iconColor: "#e67e22",
// 						text     : "No Import Template is linked for this user account.",
// 						sub      : `The <b>import_template_id</b> field in <b>Finance User Access</b>
// 						            is empty for <b>${_esc(userEmail)}</b>.<br><br>
// 						            Please open the <b>Finance User Access</b> record for this user
// 						            and assign a valid <b>Import Template</b> before retrying.`,
// 						buttons  : [
// 							{
// 								label  : '<i class="fa fa-times"></i> Close',
// 								cls    : "btn-default",
// 								onClick: _hide_modal
// 							}
// 						]
// 					});
// 				} else {
// 					// ── Finance Coordinator error message ─────────
// 					_show_modal({
// 						title    : '<i class="fa fa-exclamation-triangle"></i> Import Template Missing',
// 						icon     : "fa-exclamation-triangle",
// 						iconColor: "#e74c3c",
// 						text     : "Import Template is not configured for this account.",
// 						sub      : `Please contact your administrator to link an
// 						            <b>Import Template</b> in <b>Finance User Access</b>
// 						            before downloading the Budget Import Template.`,
// 						buttons  : [
// 							{
// 								label  : '<i class="fa fa-times"></i> Close',
// 								cls    : "btn-default",
// 								onClick: _hide_modal
// 							}
// 						]
// 					});
// 				}
// 				return;
// 			}

// 			// Template exists
// 			// Admin roles → skip confirm modal, download directly
// 			// Finance Coordinator → show confirm modal first
// 			if (isAdmin) {
// 				_run_download($btn, userEmail);
// 			} else {
// 				_show_confirm_modal($btn, userEmail);
// 			}
// 		},

// 		error: function () {
// 			_reset_btn($btn, false);
// 			frappe.msgprint({
// 				title    : "Check Failed",
// 				message  : "Could not verify the Import Template. Please try again.",
// 				indicator: "red"
// 			});
// 		}
// 	});
// }



// function _show_confirm_modal($btn, userEmail) {
// 	_show_modal({
// 		title       : '<i class="fa fa-download"></i> Confirm Download',
// 		icon        : "fa-exclamation-triangle",
// 		iconColor   : "#e74c3c",
// 		text        : `Please carefully review and validate all allocated Units, Cost Centers,
// 		               and Location Codes before downloading the Budget Import Template.`,
// 		sub         : "Do not proceed unless everything has been reviewed and confirmed.",
// 		showCheckbox: true,
// 		buttons     : [
// 			{
// 				label  : '<i class="fa fa-times"></i> Cancel',
// 				cls    : "btn-default",
// 				onClick: _hide_modal
// 			},
// 			{
// 				id      : "apf-modal-proceed",
// 				label   : '<i class="fa fa-download"></i> Proceed to Download',
// 				cls     : "btn-primary",
// 				disabled: true,
// 				onClick : function () {
// 					_hide_modal();
// 					_run_download($btn, userEmail);
// 				}
// 			}
// 		]
// 	});
// }


// function _run_download($btn, userEmail) {

// 	_reset_btn($btn, true);
// 	Loader.show("Generating your template…");

// 	let pct           = 5;
// 	let progressTimer = null;
// 	let pollTimer     = null;

// 	progressTimer = setInterval(function () {
// 		const step = pct < 40 ? 4 : pct < 65 ? 2 : 0.5;
// 		pct = Math.min(pct + step, 85);
// 		_set_progress(pct);
// 	}, 300);

// 	function cleanup(success) {
// 		clearInterval(progressTimer);
// 		clearInterval(pollTimer);
// 		progressTimer = null;
// 		pollTimer     = null;

// 		if (success) {
// 			_set_progress(100);
// 			Loader.setText("Download ready!");
// 			setTimeout(function () {
// 				Loader.hide();
// 				_reset_btn($btn, false);
// 			}, 900);
// 		} else {
// 			Loader.hide();
// 			_reset_btn($btn, false);
// 		}
// 	}

// 	frappe.call({
// 		method: "annual_budget.api.export_reports.start_budget_template_generation",
// 		args  : { user: userEmail },

// 		callback: function () {
// 			Loader.setText("Fetching your template…");

// 			pollTimer = setInterval(function () {

// 				const url =
// 					"/api/method/annual_budget.api.export_reports.download_generated_template" +
// 					"?user=" + encodeURIComponent(userEmail);

// 				fetch(url)
// 					.then(function (response) {

// 						if (!response.ok) throw new Error("Server returned " + response.status);

// 						const ct = response.headers.get("content-type") || "";

// 						if (ct.includes("application/json")) {
// 							return response.json().then(function (data) {
// 								if (data.message?.status === "processing") {
// 									Loader.setText("Still generating, please wait…");
// 								}
// 							});
// 						}

// 						clearInterval(pollTimer);
// 						pollTimer = null;

// 						const disp     = response.headers.get("Content-Disposition") || "";
// 						const match    = disp.match(/filename[^;=\n]*=["']?([^"';\n]+)/);
// 						const filename = match
// 							? decodeURIComponent(match[1].trim())
// 							: "budget_import_template.xlsx";

// 						return response.blob().then(function (blob) {
// 							const blobUrl = URL.createObjectURL(blob);
// 							const a       = document.createElement("a");
// 							a.href        = blobUrl;
// 							a.download    = filename;
// 							document.body.appendChild(a);
// 							a.click();
// 							a.remove();
// 							setTimeout(function () { URL.revokeObjectURL(blobUrl); }, 2000);
// 							cleanup(true);
// 						});

// 					})
// 					.catch(function (err) {
// 						cleanup(false);
// 						frappe.msgprint({
// 							title    : "Download Failed",
// 							message  : "Could not download the template. Please try again.<br><small>" + err.message + "</small>",
// 							indicator: "red"
// 						});
// 					});

// 			}, 3000);
// 		},

// 		error: function () {
// 			cleanup(false);
// 			frappe.msgprint({
// 				title    : "Request Failed",
// 				message  : "Could not start template generation. Please try again.",
// 				indicator: "red"
// 			});
// 		}
// 	});
// }


// /* ============================================================
//    SHARED HELPERS
// ============================================================ */

// function _esc(str) {
// 	return $("<div>").text(str || "").html();
// }

// function _reset_btn($btn, loading) {
// 	$btn
// 		.prop("disabled", loading)
// 		.html(
// 			loading
// 				? '<i class="fa fa-spinner fa-spin"></i> Checking…'
// 				: '<i class="fa fa-download"></i> Download Budget Import Template'
// 		);
// }

// function _build_note_html() {

// 	const contacts = [
// 		["Rakesh Ahuja",        "rakesh.ahuja@azimpremjifoundation.org",      "+91 7022068106"],
// 		["Saravana G",          "saravana.g@azimpremjifoundation.org",        "+91 9380861952"],
// 		["Augustin Moses R",    "augustin.moses@azimpremjifoundation.org",    "+91 8667719594"],
// 		["Mercy Selvanayagi R", "mercy.selvanayagi@azimpremjifoundation.org", "+91 9047828687"],
// 		["Mahaveer Ram P",      "mahaveer.p@azimpremjifoundation.org",        "+91 8825879412"],
// 	];

// 	const cards = contacts.map(c => `
// 		<div class="contact-card">
// 			<div class="contact-name">${c[0]}</div>
// 			<div class="contact-detail">${c[1]}</div>
// 			<div class="contact-detail">${c[2]}</div>
// 		</div>
// 	`).join("");

// 	return `
// 		<div class="note-warning">
// 			<div class="note-header">
// 				<span class="note-badge blinking-badge">IMPORTANT</span>
// 				Before importing, please carefully cross-verify the allocated Units and Cost Centers listed below.
// 				If you notice any discrepancies, contact the support team immediately.
// 				Do not proceed with the import until all details are verified and confirmed.
// 			</div>
// 			<div class="contact-wrapper">${cards}</div>
// 		</div>
// 	`;
// }

// function _build_table_html(rows) {

// 	const COLS = [
// 		["unit",                    "Unit"                    ],
// 		["unit_description",        "Unit Description"        ],
// 		["cost_center",             "Cost Center"             ],
// 		["cost_center_description", "Cost Center Description" ],
// 		["location_code",           "Location Code"           ],
// 		["location_description",    "Location Description"    ],
// 	];

// 	const headers  = COLS.map(c => `<th>${c[1]}</th>`).join("");
// 	const bodyRows = rows.map((row, i) => {
// 		const cells = COLS.map(c => `<td>${_esc(row[c[0]] || "")}</td>`).join("");
// 		return `<tr><td>${i + 1}</td>${cells}</tr>`;
// 	}).join("");

// 	return `
// 		<h4 class="table-title">Allocated Units &amp; Cost Centers</h4>
// 		<div class="table-wrapper">
// 			<table class="mis-table">
// 				<thead><tr><th>Sl. No.</th>${headers}</tr></thead>
// 				<tbody>${bodyRows}</tbody>
// 			</table>
// 		</div>
// 	`;
// }


// /* ============================================================
//    INJECT STYLES
// ============================================================ */

// function inject_styles() {

// 	if (document.getElementById("allocation-style")) return;

// 	const style  = document.createElement("style");
// 	style.id     = "allocation-style";
// 	style.textContent = `

// 	/* ── Page Wrapper ─────────────────────────── */
// 	.budget-import-wrapper {
// 		padding    : 25px;
// 		background : #ffffff;
// 		min-height : 100vh;
// 	}

// 	/* ── Loading / Empty States ───────────────── */
// 	.loading-state,
// 	.empty-state {
// 		text-align  : center;
// 		padding     : 50px;
// 		font-weight : 600;
// 		color       : #0076B6;
// 	}

// 	/* ── Global Search ────────────────────────── */
// 	.global-search-wrap { margin-bottom: 30px; }

// 	.global-search-inner {
// 		position    : relative;
// 		display     : flex;
// 		align-items : center;
// 		max-width   : 520px;
// 	}

// 	.global-search-icon {
// 		position       : absolute;
// 		left           : 12px;
// 		color          : #0076B6;
// 		font-size      : 14px;
// 		pointer-events : none;
// 	}

// 	.global-search-input {
// 		width         : 100%;
// 		padding       : 10px 36px;
// 		border        : 1.5px solid #c8dff0;
// 		border-radius : 8px;
// 		font-size     : 14px;
// 		color         : #222;
// 		outline       : none;
// 		background    : #f4f9fd;
// 		transition    : border-color 0.2s, box-shadow 0.2s;
// 	}

// 	.global-search-input:focus {
// 		border-color : #0076B6;
// 		box-shadow   : 0 0 0 3px rgba(0,118,182,0.12);
// 		background   : #ffffff;
// 	}

// 	.global-search-clear {
// 		position   : absolute;
// 		right      : 10px;
// 		font-size  : 18px;
// 		color      : #999;
// 		cursor     : pointer;
// 		transition : color 0.15s;
// 	}

// 	.global-search-clear:hover { color: #c0392b; }

// 	.global-search-count {
// 		margin-top  : 6px;
// 		font-size   : 12px;
// 		color       : #0076B6;
// 		font-weight : 600;
// 		padding-left: 2px;
// 	}

// 	/* ── User Section ─────────────────────────── */
// 	.user-section { margin-bottom: 40px; }

// 	.user-header {
// 		display         : flex;
// 		justify-content : space-between;
// 		align-items     : center;
// 		padding-bottom  : 12px;
// 		border-bottom   : 2px solid #0076B6;
// 		margin-bottom   : 18px;
// 	}

// 	.user-header.user-header-collapsible {
// 		padding       : 14px 18px;
// 		background    : #f4f9fd;
// 		border        : 1px solid #d0e8f5;
// 		border-bottom : 1px solid #d0e8f5;
// 		border-radius : 8px;
// 		margin-bottom : 0;
// 	}

// 	.user-header.user-header-collapsible.is-open {
// 		border-radius : 8px 8px 0 0;
// 	}

// 	.user-header-left { flex: 1; }

// 	.user-header-right {
// 		display     : flex;
// 		align-items : center;
// 		gap         : 10px;
// 		flex-shrink : 0;
// 	}

// 	.user-name  { font-size: 16px; font-weight: 700; color: #003B63; }
// 	.user-email { font-size: 12px; color: #666; margin-top: 2px; }

// 	/* ── Expand/Collapse Toggle (checkbox + toggle switch) ── */
// 	.expand-toggle-label {
// 		display     : flex;
// 		align-items : center;
// 		gap         : 8px;
// 		cursor      : pointer;
// 		user-select : none;
// 		margin      : 0;
// 	}

// 	/* Hide the real checkbox visually */
// 	.expand-toggle-cb {
// 		position : absolute;
// 		opacity  : 0;
// 		width    : 0;
// 		height   : 0;
// 		margin   : 0;
// 	}

// 	/* Toggle track */
// 	.expand-toggle-track {
// 		position      : relative;
// 		width         : 36px;
// 		height        : 20px;
// 		background    : #c8dff0;
// 		border-radius : 99px;
// 		flex-shrink   : 0;
// 		transition    : background 0.2s;
// 	}

// 	/* Toggle thumb */
// 	.expand-toggle-thumb {
// 		position      : absolute;
// 		top           : 3px;
// 		left          : 3px;
// 		width         : 14px;
// 		height        : 14px;
// 		background    : #fff;
// 		border-radius : 50%;
// 		box-shadow    : 0 1px 4px rgba(0,0,0,0.2);
// 		transition    : left 0.2s, background 0.2s;
// 	}

// 	/* Checked state */
// 	.expand-toggle-cb:checked + .expand-toggle-track {
// 		background : #0076B6;
// 	}

// 	.expand-toggle-cb:checked + .expand-toggle-track .expand-toggle-thumb {
// 		left : 19px;
// 	}

// 	/* Focus ring for accessibility */
// 	.expand-toggle-cb:focus-visible + .expand-toggle-track {
// 		outline        : 2px solid #0076B6;
// 		outline-offset : 2px;
// 	}

// 	.expand-toggle-text {
// 		font-size   : 12px;
// 		color       : #0076B6;
// 		font-weight : 600;
// 		white-space : nowrap;
// 	}

// 	/* Collapsible body */
// 	.user-header-collapsible + .user-body {
// 		border        : 1px solid #d0e8f5;
// 		border-top    : none;
// 		border-radius : 0 0 8px 8px;
// 		padding       : 20px 18px 18px;
// 		background    : #ffffff;
// 	}

// 	.user-header:not(.user-header-collapsible) + .user-body {
// 		padding    : 0;
// 		border     : none;
// 		background : transparent;
// 	}

// 	/* ── Important Note ───────────────────────── */
// 	.note-warning {
// 		background    : #fff8e1;
// 		border-left   : 5px solid #f4b400;
// 		padding       : 16px;
// 		border-radius : 6px;
// 		margin-bottom : 25px;
// 	}

// 	.note-header { font-size: 14px; color: #5c4b00; margin-bottom: 15px; line-height: 1.7; }

// 	.note-badge {
// 		background    : #f4b400;
// 		color         : #fff;
// 		font-size     : 11px;
// 		font-weight   : 700;
// 		padding       : 3px 8px;
// 		border-radius : 20px;
// 		margin-right  : 8px;
// 	}

// 	.blinking-badge { animation: softBlink 1.5s ease-in-out infinite; }

// 	@keyframes softBlink {
// 		0%, 100% { opacity: 1;   }
// 		50%      { opacity: 0.5; }
// 	}

// 	/* ── Contact Cards ────────────────────────── */
// 	.contact-wrapper { display: flex; gap: 12px; flex-wrap: wrap; }

// 	.contact-card {
// 		background    : #fff;
// 		border        : 1px solid #e6e6e6;
// 		border-radius : 8px;
// 		padding       : 12px 15px;
// 		min-width     : 220px;
// 		box-shadow    : 0 2px 8px rgba(0,0,0,0.04);
// 	}

// 	.contact-name   { font-weight: 600; color: #333; margin-bottom: 4px; font-size: 13px; }
// 	.contact-detail { font-size: 12px; color: #666; line-height: 1.6; }

// 	/* ── Allocation Table ─────────────────────── */
// 	.table-title   { font-size: 14px; font-weight: 600; color: #003B63; margin-bottom: 10px; }
// 	.table-wrapper { overflow-x: auto; }

// 	.mis-table {
// 		width           : 100%;
// 		border-collapse : collapse;
// 		font-size       : 13px;
// 		border          : 1px solid #dcdcdc;
// 	}

// 	.mis-table th {
// 		background  : #0076B6;
// 		color       : #fff;
// 		font-weight : 700;
// 		padding     : 9px 10px;
// 		text-align  : center;
// 		white-space : nowrap;
// 	}

// 	.mis-table td {
// 		padding    : 8px 10px;
// 		border     : 1px solid #e0e0e0;
// 		text-align : center;
// 	}

// 	.mis-table tr:nth-child(even) { background: #f9f9f9; }
// 	.mis-table tr:hover           { background: #eef6fb; }

// 	/* ══════════════════════════════════════════
// 	   APF MODAL
// 	══════════════════════════════════════════ */

// 	#apf-modal-overlay {
// 		position        : fixed;
// 		inset           : 0;
// 		background      : rgba(0,0,0,0.5);
// 		display         : none;
// 		align-items     : center;
// 		justify-content : center;
// 		z-index         : 9999;
// 		backdrop-filter : blur(4px);
// 		padding         : 15px;
// 	}

// 	.apf-modal-box {
// 		background    : #ffffff;
// 		width         : 640px;
// 		max-width     : 100%;
// 		border-radius : 12px;
// 		box-shadow    : 0 25px 60px rgba(0,0,0,0.25);
// 		padding       : 35px;
// 		animation     : apfScaleIn 0.25s ease;
// 	}

// 	@keyframes apfScaleIn {
// 		from { transform: scale(0.95); opacity: 0; }
// 		to   { transform: scale(1);    opacity: 1; }
// 	}

// 	.apf-modal-header {
// 		display         : flex;
// 		justify-content : space-between;
// 		align-items     : center;
// 		font-weight     : 600;
// 		font-size       : 18px;
// 		margin-bottom   : 25px;
// 	}

// 	.apf-modal-title i { margin-right: 8px; color: #007bff; }

// 	#apf-modal-close {
// 		cursor     : pointer;
// 		font-size  : 22px;
// 		color      : #888;
// 		transition : color 0.2s;
// 		line-height: 1;
// 	}

// 	#apf-modal-close:hover { color: #000; }

// 	.apf-modal-body { text-align: center; margin-bottom: 25px; }

// 	.apf-modal-icon {
// 		font-size     : 42px;
// 		margin-bottom : 15px;
// 	}

// 	.apf-modal-text {
// 		font-weight   : 600;
// 		font-size     : 15px;
// 		color         : #c0392b;
// 		margin-bottom : 12px;
// 		line-height   : 1.6;
// 	}

// 	.apf-modal-sub {
// 		font-size     : 14px;
// 		color         : #555;
// 		margin-bottom : 20px;
// 		line-height   : 1.6;
// 	}

// 	.apf-checkbox-wrapper {
// 		background    : #f8f9fa;
// 		padding       : 16px 18px;
// 		border-radius : 8px;
// 		border        : 1px solid #e0e0e0;
// 		font-size     : 14px;
// 		text-align    : left;
// 		margin-top    : 6px;
// 	}

// 	.apf-checkbox-label {
// 		display     : flex;
// 		align-items : flex-start;
// 		gap         : 10px;
// 		cursor      : pointer;
// 		margin      : 0;
// 	}

// 	.apf-checkbox-label i     { color: #28a745; margin-right: 4px; }
// 	.apf-checkbox-label input {
// 		margin-top : 3px;
// 		transform  : scale(1.1);
// 		flex-shrink: 0;
// 	}

// 	.apf-modal-footer {
// 		display         : flex;
// 		justify-content : flex-end;
// 		gap             : 12px;
// 		margin-top      : 10px;
// 	}

// 	.apf-modal-footer .btn      { min-width: 150px; }
// 	#apf-modal-proceed:disabled { opacity: 0.6; cursor: not-allowed; }

// 	/* ── APF Loader Overlay ───────────────────── */
// 	#global-loader.loader-overlay {
// 		position        : fixed;
// 		inset           : 0;
// 		width           : 100vw;
// 		height          : 100vh;
// 		background      : rgba(18,18,18,0.92);
// 		backdrop-filter : blur(6px);
// 		z-index         : 999999;
// 		display         : none;
// 		align-items     : center;
// 		justify-content : center;
// 	}

// 	#global-loader.loader-overlay.active { display: flex; }

// 	.loader-box {
// 		display         : flex;
// 		flex-direction  : column;
// 		align-items     : center;
// 		justify-content : center;
// 		gap             : 16px;
// 	}

// 	.loader-ring-wrap {
// 		position        : relative;
// 		width           : 120px;
// 		height          : 120px;
// 		display         : flex;
// 		align-items     : center;
// 		justify-content : center;
// 	}

// 	.loader-ring {
// 		position  : absolute;
// 		inset     : 0;
// 		width     : 100%;
// 		height    : 100%;
// 		transform : rotate(-90deg);
// 	}

// 	.loader-ring-bg {
// 		fill         : none;
// 		stroke       : rgba(255,255,255,0.12);
// 		stroke-width : 6;
// 	}

// 	.loader-ring-fill {
// 		fill              : none;
// 		stroke            : url(#ringGrad);
// 		stroke-width      : 6;
// 		stroke-linecap    : round;
// 		stroke-dasharray  : 276.46;
// 		stroke-dashoffset : 276.46;
// 		transition        : stroke-dashoffset 0.35s ease;
// 	}

// 	.loader-logo {
// 		width         : 78px;
// 		height        : 78px;
// 		border-radius : 50%;
// 		background    : linear-gradient(145deg, #fff, #eaeaea);
// 		padding       : 12px;
// 		object-fit    : contain;
// 		box-shadow    : 0 8px 24px rgba(0,0,0,.35);
// 		animation     : pulse 1.6s infinite ease-in-out;
// 		position      : relative;
// 		z-index       : 1;
// 	}

// 	.loader-pct-inside {
// 		position      : absolute;
// 		bottom        : -4px;
// 		left          : 50%;
// 		transform     : translateX(-50%);
// 		font-size     : 11px;
// 		font-weight   : 700;
// 		color         : #fff;
// 		background    : rgba(0,118,182,0.85);
// 		padding       : 1px 7px;
// 		border-radius : 99px;
// 		z-index       : 2;
// 		white-space   : nowrap;
// 	}

// 	.loader-text {
// 		font-size      : 14px;
// 		color          : #fff;
// 		font-weight    : 600;
// 		letter-spacing : 0.5px;
// 		text-align     : center;
// 		opacity        : 0.85;
// 	}

// 	@keyframes pulse {
// 		0%, 100% { transform: scale(1);    opacity: 0.85; }
// 		50%      { transform: scale(1.06); opacity: 1;    }
// 	}

// 	/* ── Download Animation ───────────────────── */
// 	.dl-anim-wrap {
// 		display        : flex;
// 		flex-direction : column;
// 		align-items    : center;
// 		gap            : 6px;
// 		width          : 60px;
// 	}

// 	.dl-arrow-track {
// 		width    : 24px;
// 		height   : 28px;
// 		overflow : hidden;
// 		position : relative;
// 	}

// 	.dl-arrow {
// 		display        : flex;
// 		flex-direction : column;
// 		align-items    : center;
// 		position       : absolute;
// 		left           : 50%;
// 		transform      : translateX(-50%);
// 		animation      : dl-drop 1.2s ease-in-out infinite;
// 	}

// 	.dl-arrow-stem {
// 		width         : 3px;
// 		height        : 14px;
// 		background    : linear-gradient(180deg, #00c6ff, #0076B6);
// 		border-radius : 2px;
// 	}

// 	.dl-arrow-head {
// 		width        : 0;
// 		height       : 0;
// 		border-left  : 7px solid transparent;
// 		border-right : 7px solid transparent;
// 		border-top   : 9px solid #0076B6;
// 	}

// 	@keyframes dl-drop {
// 		0%   { top: -28px; opacity: 0; }
// 		30%  { opacity: 1; }
// 		70%  { opacity: 1; }
// 		100% { top: 28px;  opacity: 0; }
// 	}

// 	.dl-bar {
// 		width         : 44px;
// 		height        : 4px;
// 		background    : linear-gradient(90deg, #0076B6, #00c6ff);
// 		border-radius : 99px;
// 		animation     : dl-bar-pulse 1.2s ease-in-out infinite;
// 	}

// 	@keyframes dl-bar-pulse {
// 		0%, 100% { opacity: 0.4; transform: scaleX(0.8); }
// 		50%      { opacity: 1;   transform: scaleX(1);   }
// 	}

// 	.dl-dots { display: flex; gap: 5px; }

// 	.dl-dots span {
// 		width         : 5px;
// 		height        : 5px;
// 		border-radius : 50%;
// 		background    : rgba(255,255,255,0.6);
// 		animation     : dl-bounce 1.2s ease-in-out infinite;
// 	}

// 	.dl-dots span:nth-child(1) { animation-delay: 0s;   }
// 	.dl-dots span:nth-child(2) { animation-delay: 0.2s; }
// 	.dl-dots span:nth-child(3) { animation-delay: 0.4s; }

// 	@keyframes dl-bounce {
// 		0%, 80%, 100% { transform: scale(1);   opacity: 0.5; }
// 		40%           { transform: scale(1.5); opacity: 1;   }
// 	}

// 	/* ── Responsive ───────────────────────────── */
// 	@media (max-width: 768px) {
// 		.user-header        { flex-direction: column; align-items: flex-start; gap: 10px; }
// 		.user-header-right  { width: 100%; justify-content: flex-end; }
// 	}

// 	@media (max-width: 576px) {
// 		.global-search-inner   { max-width: 100%; }
// 		.apf-modal-box         { padding: 25px; }
// 		.apf-modal-header      { font-size: 16px; }
// 		.apf-modal-footer      { flex-direction: column; }
// 		.apf-modal-footer .btn { width: 100%; min-width: unset; }
// 	}
// 	`;

// 	document.head.appendChild(style);
// }



































frappe.pages["import-template"].on_page_load = function (wrapper) {

	frappe.ui.make_app_page({
		parent       : wrapper,
		title        : "Budget Import Template",
		single_column: true,
	});

	const $container = $(wrapper).find(".layout-main-section");
	$container.addClass("budget-import-wrapper");

	inject_styles();

	$container.html(`
		<div class="loading-state">
			<i class="fa fa-spinner fa-spin"></i> Loading Data…
		</div>
	`);

	frappe.call({
		method  : "annual_budget.api.filter_options.get_user_mappings",
		callback: function (r) {
			if (!r.message || !r.message.length) {
				$container.html(`<div class="empty-state">No Data Found</div>`);
				return;
			}
			render_content($container, r.message);
		}
	});
};


/* ============================================================
   LOADER
============================================================ */

function _init_loader() {
	if ($("#global-loader").length) return;
	$("body").append(`
		<div id="global-loader" class="loader-overlay">
			<div class="loader-box">

				<div class="loader-ring-wrap">
					<svg class="loader-ring" viewBox="0 0 100 100">
						<defs>
							<linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%"   stop-color="#0076B6"/>
								<stop offset="100%" stop-color="#00c6ff"/>
							</linearGradient>
						</defs>
						<circle class="loader-ring-bg"   cx="50" cy="50" r="44"/>
						<circle class="loader-ring-fill" id="loader-ring-fill" cx="50" cy="50" r="44"/>
					</svg>
					<img src="/files/APF logo.png" class="loader-logo" alt="Loading">
					<div class="loader-pct-inside" id="loader-pct">0%</div>
				</div>

				<div class="dl-anim-wrap">
					<div class="dl-arrow-track">
						<div class="dl-arrow">
							<div class="dl-arrow-stem"></div>
							<div class="dl-arrow-head"></div>
						</div>
					</div>
					<div class="dl-bar"></div>
					<div class="dl-dots">
						<span></span><span></span><span></span>
					</div>
				</div>

				<div class="loader-text" id="loader-text-msg">Preparing download…</div>

			</div>
		</div>
	`);
}

const Loader = {
	show(msg = "Preparing download…") {
		_init_loader();
		$("#loader-text-msg").text(msg);
		_set_progress(0);
		$("#global-loader").addClass("active");
	},
	setText(msg) { $("#loader-text-msg").text(msg); },
	setProgress(pct) { _set_progress(pct); },
	hide() { $("#global-loader").removeClass("active"); }
};

/* SVG ring — circumference for r=44: 2π×44 ≈ 276.46 */
function _set_progress(pct) {
	const offset = 276.46 - (pct / 100) * 276.46;
	$("#loader-ring-fill").css("stroke-dashoffset", offset);
	$("#loader-pct").text(Math.round(pct) + "%");
}


/* ============================================================
   MODAL SYSTEM
============================================================ */

function _init_modal() {
	if ($("#apf-modal-overlay").length) return;
	$("body").append(`
		<div id="apf-modal-overlay">
			<div class="apf-modal-box">
				<div class="apf-modal-header">
					<div class="apf-modal-title" id="apf-modal-title"></div>
					<span id="apf-modal-close" title="Close">&times;</span>
				</div>
				<div class="apf-modal-body">
					<div class="apf-modal-icon" id="apf-modal-icon">
						<i id="apf-modal-icon-i" class="fa"></i>
					</div>
					<div class="apf-modal-text" id="apf-modal-text"></div>
					<div class="apf-modal-sub"  id="apf-modal-sub"></div>
					<div class="apf-checkbox-wrapper" id="apf-checkbox-wrap" style="display:none;">
						<label class="apf-checkbox-label">
							<input type="checkbox" id="apf-modal-checkbox">
							<span>
								<i class="fa fa-check-circle"></i>
								I confirm that I have verified all details carefully.
							</span>
						</label>
					</div>
				</div>
				<div class="apf-modal-footer" id="apf-modal-footer"></div>
			</div>
		</div>
	`);

	$(document)
		.off(".apfModal")
		.on("click.apfModal", "#apf-modal-close", _hide_modal)
		.on("click.apfModal", "#apf-modal-overlay", function (e) {
			if ($(e.target).is("#apf-modal-overlay")) _hide_modal();
		})
		.on("change.apfModal", "#apf-modal-checkbox", function () {
			$("#apf-modal-proceed").prop("disabled", !this.checked);
		});
}

function _hide_modal() {
	$("#apf-modal-overlay").hide();
	$("#apf-modal-checkbox").prop("checked", false);
	$("#apf-modal-proceed").prop("disabled", true);
}

function _show_modal(opts) {
	_init_modal();
	$("#apf-modal-title").html(opts.title || "");
	$("#apf-modal-icon-i")
		.attr("class", "fa " + (opts.icon || "fa-exclamation-triangle"))
		.closest(".apf-modal-icon")
		.css("color", opts.iconColor || "#e74c3c");
	$("#apf-modal-text").html(opts.text || "");
	$("#apf-modal-sub").html(opts.sub   || "");

	const showCb = !!opts.showCheckbox;
	$("#apf-checkbox-wrap").toggle(showCb);
	if (showCb) $("#apf-modal-checkbox").prop("checked", false);

	const $footer = $("#apf-modal-footer").empty();
	(opts.buttons || []).forEach(function (btn) {
		const $b = $(`<button id="${btn.id || ""}" class="btn ${btn.cls || "btn-default"} btn-sm">${btn.label}</button>`)
			.prop("disabled", !!btn.disabled);
		$b.on("click", function () { btn.onClick && btn.onClick(); });
		$footer.append($b);
	});

	$("#apf-modal-overlay").css("display", "flex");
}


/* ============================================================
   RENDER CONTENT
============================================================ */

function render_content(container, data) {

	const roles                = Array.isArray(frappe.user_roles) ? frappe.user_roles : [];
	const isFinanceCoordinator = roles.includes("Finance Unit Coordinator");
	const isSystemManager      = roles.includes("System Manager");
	const isFinanceAdmin       = roles.includes("Finance Admin");

	const needsModal    = isFinanceCoordinator && !isSystemManager && !isFinanceAdmin;
	const isCollapsible = isSystemManager || isFinanceAdmin;

	// ── Group rows by user email ───────────────────────────
	const grouped = {};
	data.forEach(function (row) {
		if (!grouped[row.user]) {
			grouped[row.user] = { user_fullname: row.user_fullname || "", email: row.user, rows: [] };
		}
		grouped[row.user].rows.push(row);
	});

	container.empty();

	// ── Admin: Global user search ──────────────────────────
	if (isCollapsible) {
		container.append(`
			<div class="global-user-search-wrap">
				<div class="gus-label"><i class="fa fa-users"></i> Search User</div>
				<div class="gus-inner">
					<i class="fa fa-search gus-icon"></i>
					<input type="text" id="admin-user-search" class="gus-input"
						placeholder="Search by user name or email…" autocomplete="off"/>
					<span id="admin-user-search-clear" class="gus-clear" title="Clear">&times;</span>
				</div>
				<div id="admin-user-search-count" class="gus-count" style="display:none;"></div>
			</div>
		`);
	}

	// ── Build each user section ────────────────────────────
	Object.values(grouped).forEach(function (userData) {

		const displayName = userData.user_fullname || userData.email;
		const rowCount    = userData.rows.length;
		const safeId      = userData.email.replace(/[^a-z0-9]/gi, "_");
		const cbId        = "expand-cb-"  + safeId;
		const tsId        = "tbl-search-" + safeId;
		const tcId        = "tbl-count-"  + safeId;
		const txId        = "tbl-clear-"  + safeId;

		const $section = $(`
			<div class="user-section"
				data-name="${_esc(displayName.toLowerCase())}"
				data-email="${_esc(userData.email.toLowerCase())}">

				<div class="user-header ${isCollapsible ? "user-header-collapsible" : ""}">
					<div class="user-header-left">
						<div class="user-name">${_esc(displayName)}</div>
						<div class="user-email">${_esc(userData.email)}</div>
					</div>
					<div class="user-header-right">
						<div class="button-container"></div>
						${isCollapsible ? `
						<div class="expand-toggle-wrap">
							<label class="expand-toggle-label" for="${cbId}">
								<input type="checkbox" id="${cbId}" class="expand-toggle-cb">
								<span class="expand-toggle-btn">Expand</span>
							</label>
							<span class="expand-row-count">${rowCount} row${rowCount !== 1 ? "s" : ""}</span>
						</div>` : ""}
					</div>
				</div>

				<div class="user-body" style="display:${isCollapsible ? "none" : "block"};">

					<div class="tbl-search-wrap">
						<div class="tbl-search-inner">
							<i class="fa fa-search tbl-search-icon"></i>
							<input type="text" id="${tsId}" class="tbl-search-input"
								data-safe-id="${safeId}"
								placeholder="Search units, cost centers, locations…"
								autocomplete="off"/>
							<span id="${txId}" class="tbl-search-clear" data-safe-id="${safeId}"
								title="Clear" style="display:none;">&times;</span>
						</div>
						<div id="${tcId}" class="tbl-search-count" style="display:none;"></div>
					</div>

					<div class="table-slot"></div>

				</div>
			</div>
		`);

		container.append($section);

		if (needsModal) {
			$section.find(".user-body").prepend(_build_note_html());
		}

		$section.find(".table-slot").html(_build_table_html(userData.rows, safeId));

		// ── Expand / collapse (admin only) ─────────────────
		if (isCollapsible) {
			$section.find(".expand-toggle-cb").on("change", function () {
				const $body   = $section.find(".user-body");
				const $header = $section.find(".user-header");
				const $text   = $section.find(".expand-toggle-btn");
				const open    = this.checked;
				if (open) {
					$body.slideDown(200);
					$header.addClass("is-open");
					$text.text("Collapse");
				} else {
					$body.slideUp(200);
					$header.removeClass("is-open");
					$text.text("Expand");
					$("#" + tsId).val("");
					_run_table_search(safeId, "");
				}
			});
		}

		// ── Download button ────────────────────────────────
		const $dlBtn = $(`
			<button class="btn btn-primary btn-sm dl-btn">
				<i class="fa fa-download"></i> Download Budget Import Template
			</button>
		`);
		$section.find(".button-container").append($dlBtn);

		$dlBtn.on("click", function () {
			_check_and_download($(this), userData.email, !needsModal);
		});
	});

	// ── Per-table search events ────────────────────────────
	$(document)
		.off(".tblSearch")
		.on("input.tblSearch", ".tbl-search-input", function () {
			_run_table_search($(this).data("safe-id"), this.value);
		})
		.on("click.tblSearch", ".tbl-search-clear", function () {
			const sid = $(this).data("safe-id");
			$("#tbl-search-" + sid).val("");
			_run_table_search(sid, "");
		});

	// ── Admin user search events ───────────────────────────
	if (isCollapsible) {
		$(document)
			.off(".adminUserSearch")
			.on("input.adminUserSearch", "#admin-user-search", function () {
				_run_user_search(this.value);
			})
			.on("click.adminUserSearch", "#admin-user-search-clear", function () {
				$("#admin-user-search").val("");
				_run_user_search("");
			});
		$("#admin-user-search-clear").hide();
	}
}


/* ============================================================
   SEARCH FUNCTIONS
============================================================ */

function _run_table_search(safeId, query) {
	const q      = (query || "").trim().toLowerCase();
	const $table = $(".mis-table[data-safe-id='" + safeId + "']");
	let visible  = 0;

	$table.find("tbody tr").each(function () {
		const match = !q || this.textContent.toLowerCase().includes(q);
		$(this).toggle(match);
		if (match) visible++;
	});

	const $count = $("#tbl-count-" + safeId);
	if (q) {
		$count.text(visible + " row" + (visible !== 1 ? "s" : "") + " matched").show();
	} else {
		$count.hide();
	}
	$("#tbl-clear-" + safeId).toggle(q.length > 0);
}

function _run_user_search(query) {
	const q = query.trim().toLowerCase();
	let total = 0;

	$(".user-section").each(function () {
		const $sec  = $(this);
		const match = !q
			|| ($sec.data("name")  || "").includes(q)
			|| ($sec.data("email") || "").includes(q);
		$sec.toggle(match);
		if (match) total++;
	});

	const $count = $("#admin-user-search-count");
	if (q) {
		$count.text(total + " user" + (total !== 1 ? "s" : "") + " found").show();
	} else {
		$count.hide();
	}
	$("#admin-user-search-clear").toggle(q.length > 0);
}


/* ============================================================
   DOWNLOAD FLOW
============================================================ */

function _check_and_download($btn, userEmail, isAdmin) {
	_reset_btn($btn, true, "Checking…");

	frappe.call({
		method : "frappe.client.get_value",
		args   : {
			doctype  : "Finance user access",
			filters  : { user: userEmail },
			fieldname: "import_template_id"
		},
		callback: function (r) {
			const templateId = r.message && r.message.import_template_id;

			if (!templateId) {
				_reset_btn($btn, false);
				_show_modal({
					title    : '<i class="fa fa-exclamation-triangle"></i> ' + (isAdmin ? "Template Not Configured" : "Import Template Missing"),
					icon     : "fa-exclamation-triangle",
					iconColor: isAdmin ? "#e67e22" : "#e74c3c",
					text     : isAdmin
						? "No Import Template is linked for this user account."
						: "Import Template is not configured for this account.",
					sub      : isAdmin
						? `The <b>import_template_id</b> in <b>Finance User Access</b> is empty for <b>${_esc(userEmail)}</b>.<br><br>Please assign a valid <b>Import Template</b> before retrying.`
						: `Please contact your administrator to link an <b>Import Template</b> in <b>Finance User Access</b> before downloading.`,
					buttons  : [{ label: '<i class="fa fa-times"></i> Close', cls: "btn-default", onClick: _hide_modal }]
				});
				return;
			}

			// Template exists — proceed
			if (isAdmin) {
				_run_download($btn, userEmail);
			} else {
				_reset_btn($btn, false);
				_show_confirm_modal($btn, userEmail);
			}
		},
		error: function () {
			_reset_btn($btn, false);
			frappe.msgprint({ title: "Check Failed", message: "Could not verify the Import Template. Please try again.", indicator: "red" });
		}
	});
}

function _show_confirm_modal($btn, userEmail) {
	_show_modal({
		title       : '<i class="fa fa-download"></i> Confirm Download',
		icon        : "fa-exclamation-triangle",
		iconColor   : "#e74c3c",
		text        : "Please carefully review and validate all allocated Units, Cost Centers, and Location Codes before downloading.",
		sub         : "Do not proceed unless everything has been reviewed and confirmed.",
		showCheckbox: true,
		buttons     : [
			{ label: '<i class="fa fa-times"></i> Cancel', cls: "btn-default", onClick: _hide_modal },
			{
				id      : "apf-modal-proceed",
				label   : '<i class="fa fa-download"></i> Proceed to Download',
				cls     : "btn-primary",
				disabled: true,
				onClick : function () {
					_hide_modal();
					_run_download($btn, userEmail);
				}
			}
		]
	});
}

/* Single API call — generates and streams the file directly */
function _run_download($btn, userEmail) {
	_reset_btn($btn, true, "Downloading…");
	Loader.show("Generating your template…");

	// Animate progress from 0 → 85% while the request is in flight
	let pct   = 0;
	const timer = setInterval(function () {
		const step = pct < 40 ? 3 : pct < 70 ? 1.5 : 0.4;
		pct = Math.min(pct + step, 85);
		Loader.setProgress(pct);
	}, 300);

	fetch(
		"/api/method/annual_budget.api.export_reports.download_finance_budget_import_template" +
		"?user=" + encodeURIComponent(userEmail)
	)
		.then(function (response) {
			clearInterval(timer);

			if (!response.ok) throw new Error("Server returned " + response.status);

			// Jump to 95% while blob is being read
			Loader.setProgress(95);
			Loader.setText("Preparing file…");

			const disp     = response.headers.get("Content-Disposition") || "";
			const match    = disp.match(/filename[^;=\n]*=["']?([^"';\n]+)/);
			const filename = match
				? decodeURIComponent(match[1].trim())
				: "Budget_Import_Template.xlsx";

			return response.blob().then(function (blob) {
				Loader.setProgress(100);
				Loader.setText("Download ready!");

				const blobUrl = URL.createObjectURL(blob);
				const a       = document.createElement("a");
				a.href        = blobUrl;
				a.download    = filename;
				document.body.appendChild(a);
				a.click();
				a.remove();
				setTimeout(function () { URL.revokeObjectURL(blobUrl); }, 2000);

				setTimeout(function () {
					Loader.hide();
					_reset_btn($btn, false);
				}, 800);
			});
		})
		.catch(function (err) {
			clearInterval(timer);
			Loader.hide();
			_reset_btn($btn, false);
			frappe.msgprint({
				title    : "Download Failed",
				message  : "Could not download the template. Please try again.<br><small>" + err.message + "</small>",
				indicator: "red"
			});
		});
}


/* ============================================================
   SHARED HELPERS
============================================================ */

function _esc(str) {
	return $("<div>").text(str || "").html();
}

function _reset_btn($btn, loading, loadingText) {
	$btn.prop("disabled", loading).html(
		loading
			? `<i class="fa fa-spinner fa-spin"></i> ${loadingText || "Loading…"}`
			: '<i class="fa fa-download"></i> Download Budget Import Template'
	);
}

function _build_note_html() {
	const contacts = [
		["Rakesh Ahuja",        "rakesh.ahuja@azimpremjifoundation.org",      "+91 7022068106"],
		["Saravana G",          "saravana.g@azimpremjifoundation.org",        "+91 9380861952"],
		["Augustin Moses R",    "augustin.moses@azimpremjifoundation.org",    "+91 8667719594"],
		["Mercy Selvanayagi R", "mercy.selvanayagi@azimpremjifoundation.org", "+91 9047828687"],
		["Mahaveer Ram P",      "mahaveer.p@azimpremjifoundation.org",        "+91 8825879412"],
	];
	const cards = contacts.map(c => `
		<div class="contact-card">
			<div class="contact-name">${c[0]}</div>
			<div class="contact-detail">${c[1]}</div>
			<div class="contact-detail">${c[2]}</div>
		</div>
	`).join("");
	return `
		<div class="note-warning">
			<div class="note-header">
				<span class="note-badge blinking-badge">IMPORTANT</span>
				Before importing, please carefully cross-verify the allocated Units and Cost Centers listed below.
				If you notice any discrepancies, contact the support team immediately.
				Do not proceed with the import until all details are verified and confirmed.
			</div>
			<div class="contact-wrapper">${cards}</div>
		</div>
	`;
}

function _build_table_html(rows, safeId) {
	const COLS = [
		["unit",                    "Unit"                    ],
		["unit_description",        "Unit Description"        ],
		["cost_center",             "Cost Center"             ],
		["cost_center_description", "Cost Center Description" ],
		["location_code",           "Location Code"           ],
		["location_description",    "Location Description"    ],
	];
	const headers  = COLS.map(c => `<th>${c[1]}</th>`).join("");
	const bodyRows = rows.map((row, i) => {
		const cells = COLS.map(c => `<td>${_esc(row[c[0]] || "")}</td>`).join("");
		return `<tr><td>${i + 1}</td>${cells}</tr>`;
	}).join("");
	return `
		<h4 class="table-title">Allocated Units &amp; Cost Centers</h4>
		<div class="table-wrapper">
			<table class="mis-table" data-safe-id="${safeId}">
				<thead><tr><th>Sl. No.</th>${headers}</tr></thead>
				<tbody>${bodyRows}</tbody>
			</table>
		</div>
	`;
}


/* ============================================================
   INJECT STYLES
============================================================ */

function inject_styles() {

	if (document.getElementById("allocation-style")) return;

	const style  = document.createElement("style");
	style.id     = "allocation-style";
	style.textContent = `

	/* ── Page ─────────────────────────────────── */
	.budget-import-wrapper { padding: 25px; background: #fff; min-height: 100vh; }

	.loading-state, .empty-state {
		text-align: center; padding: 50px; font-weight: 600; color: #0076B6;
	}

	/* ── Admin Global User Search ─────────────── */
	.global-user-search-wrap {
		margin-bottom : 28px;
		padding       : 16px 20px;
		background    : #f0f7fd;
		border        : 1px solid #c8dff0;
		border-radius : 10px;
	}
	.gus-label {
		font-size: 11px; font-weight: 700; color: #0076B6;
		text-transform: uppercase; letter-spacing: 0.7px; margin-bottom: 10px;
	}
	.gus-label i { margin-right: 6px; }
	.gus-inner { position: relative; display: flex; align-items: center; max-width: 460px; }
	.gus-icon  { position: absolute; left: 12px; color: #0076B6; font-size: 13px; pointer-events: none; }
	.gus-input {
		width: 100%; padding: 9px 34px; border: 1.5px solid #c8dff0; border-radius: 8px;
		font-size: 13px; color: #222; outline: none; background: #fff;
		transition: border-color 0.2s, box-shadow 0.2s;
	}
	.gus-input:focus { border-color: #0076B6; box-shadow: 0 0 0 3px rgba(0,118,182,0.12); }
	.gus-clear { position: absolute; right: 10px; font-size: 17px; color: #999; cursor: pointer; transition: color 0.15s; }
	.gus-clear:hover { color: #c0392b; }
	.gus-count { margin-top: 6px; font-size: 12px; color: #0076B6; font-weight: 600; }

	/* ── Per-Table Search ─────────────────────── */
	.tbl-search-wrap  { margin-bottom: 12px; }
	.tbl-search-inner { position: relative; display: flex; align-items: center; max-width: 380px; }
	.tbl-search-icon  { position: absolute; left: 10px; color: #0076B6; font-size: 13px; pointer-events: none; }
	.tbl-search-input {
		width: 100%; padding: 8px 30px 8px 32px; border: 1.5px solid #d5e8f5; border-radius: 7px;
		font-size: 13px; color: #333; outline: none; background: #f9fbfd;
		transition: border-color 0.2s, box-shadow 0.2s;
	}
	.tbl-search-input:focus { border-color: #0076B6; box-shadow: 0 0 0 3px rgba(0,118,182,0.10); background: #fff; }
	.tbl-search-clear { position: absolute; right: 9px; font-size: 16px; color: #bbb; cursor: pointer; transition: color 0.15s; }
	.tbl-search-clear:hover { color: #c0392b; }
	.tbl-search-count { margin-top: 4px; font-size: 11px; color: #0076B6; font-weight: 600; }

	/* ── User Section ─────────────────────────── */
	.user-section { margin-bottom: 40px; }

	.user-header {
		display: flex; justify-content: space-between; align-items: center;
		padding-bottom: 12px; border-bottom: 2px solid #0076B6; margin-bottom: 18px;
	}
	.user-header.user-header-collapsible {
		padding: 14px 18px; background: #f4f9fd;
		border: 1px solid #d0e8f5; border-bottom: 1px solid #d0e8f5;
		border-radius: 8px; margin-bottom: 0;
	}
	.user-header.user-header-collapsible.is-open { border-radius: 8px 8px 0 0; }

	.user-header-left { flex: 1; }
	.user-header-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

	.user-name  { font-size: 16px; font-weight: 700; color: #003B63; }
	.user-email { font-size: 12px; color: #666; margin-top: 2px; }

	/* ── Expand / Collapse ────────────────────── */
	.expand-toggle-wrap  { display: flex; align-items: center; gap: 10px; }
	.expand-toggle-label { display: flex; align-items: center; gap: 6px; cursor: pointer; user-select: none; margin: 0; }
	.expand-toggle-cb    { width: 15px; height: 15px; cursor: pointer; accent-color: #0076B6; flex-shrink: 0; }
	.expand-toggle-btn   { font-size: 12px; font-weight: 700; color: #0076B6; white-space: nowrap; }
	.expand-row-count    { font-size: 11px; font-weight: 600; color: #fff; background: #0076B6; padding: 2px 9px; border-radius: 99px; white-space: nowrap; }

	/* Collapsible body */
	.user-header-collapsible + .user-body {
		border: 1px solid #d0e8f5; border-top: none;
		border-radius: 0 0 8px 8px; padding: 20px 18px 18px; background: #fff;
	}
	.user-header:not(.user-header-collapsible) + .user-body { padding: 0; border: none; background: transparent; }

	/* ── Important Note ───────────────────────── */
	.note-warning { background: #fff8e1; border-left: 5px solid #f4b400; padding: 16px; border-radius: 6px; margin-bottom: 20px; }
	.note-header  { font-size: 14px; color: #5c4b00; margin-bottom: 15px; line-height: 1.7; }
	.note-badge   { background: #f4b400; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 20px; margin-right: 8px; }
	.blinking-badge { animation: softBlink 1.5s ease-in-out infinite; }
	@keyframes softBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

	/* ── Contact Cards ────────────────────────── */
	.contact-wrapper { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
	.contact-card    { background: #fff; border: 1px solid #e6e6e6; border-radius: 8px; padding: 12px 15px; min-width: 220px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
	.contact-name    { font-weight: 600; color: #333; margin-bottom: 4px; font-size: 13px; }
	.contact-detail  { font-size: 12px; color: #666; line-height: 1.6; }

	/* ── Table ────────────────────────────────── */
	.table-title   { font-size: 14px; font-weight: 600; color: #003B63; margin-bottom: 10px; }
	.table-wrapper { overflow-x: auto; }
	.mis-table     { width: 100%; border-collapse: collapse; font-size: 13px; border: 1px solid #dcdcdc; }
	.mis-table th  { background: #0076B6; color: #fff; font-weight: 700; padding: 9px 10px; text-align: center; white-space: nowrap; }
	.mis-table td  { padding: 8px 10px; border: 1px solid #e0e0e0; text-align: center; }
	.mis-table tr:nth-child(even) { background: #f9f9f9; }
	.mis-table tr:hover           { background: #eef6fb; }

	/* ── Modal ────────────────────────────────── */
	#apf-modal-overlay {
		position: fixed; inset: 0; background: rgba(0,0,0,0.5);
		display: none; align-items: center; justify-content: center;
		z-index: 9999; backdrop-filter: blur(4px); padding: 15px;
	}
	.apf-modal-box {
		background: #fff; width: 640px; max-width: 100%;
		border-radius: 12px; box-shadow: 0 25px 60px rgba(0,0,0,0.25);
		padding: 35px; animation: apfScaleIn 0.25s ease;
	}
	@keyframes apfScaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

	.apf-modal-header { display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 18px; margin-bottom: 25px; }
	.apf-modal-title i { margin-right: 8px; color: #007bff; }
	#apf-modal-close { cursor: pointer; font-size: 22px; color: #888; transition: color 0.2s; line-height: 1; }
	#apf-modal-close:hover { color: #000; }
	.apf-modal-body  { text-align: center; margin-bottom: 25px; }
	.apf-modal-icon  { font-size: 42px; margin-bottom: 15px; }
	.apf-modal-text  { font-weight: 600; font-size: 15px; color: #c0392b; margin-bottom: 12px; line-height: 1.6; }
	.apf-modal-sub   { font-size: 14px; color: #555; margin-bottom: 20px; line-height: 1.6; }
	.apf-checkbox-wrapper { background: #f8f9fa; padding: 16px 18px; border-radius: 8px; border: 1px solid #e0e0e0; font-size: 14px; text-align: left; margin-top: 6px; }
	.apf-checkbox-label   { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; margin: 0; }
	.apf-checkbox-label i     { color: #28a745; margin-right: 4px; }
	.apf-checkbox-label input { margin-top: 3px; transform: scale(1.1); flex-shrink: 0; }
	.apf-modal-footer { display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px; }
	.apf-modal-footer .btn      { min-width: 150px; }
	#apf-modal-proceed:disabled { opacity: 0.6; cursor: not-allowed; }

	/* ══════════════════════════════════════════
	   LOADER OVERLAY
	══════════════════════════════════════════ */
	#global-loader.loader-overlay {
		position: fixed; inset: 0; width: 100vw; height: 100vh;
		background: rgba(18,18,18,0.92); backdrop-filter: blur(6px);
		z-index: 999999; display: none; align-items: center; justify-content: center;
	}
	#global-loader.loader-overlay.active { display: flex; }

	.loader-box { display: flex; flex-direction: column; align-items: center; gap: 16px; }

	.loader-ring-wrap {
		position: relative; width: 120px; height: 120px;
		display: flex; align-items: center; justify-content: center;
	}
	.loader-ring      { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotate(-90deg); }
	.loader-ring-bg   { fill: none; stroke: rgba(255,255,255,0.12); stroke-width: 6; }
	.loader-ring-fill {
		fill: none; stroke: url(#ringGrad); stroke-width: 6; stroke-linecap: round;
		stroke-dasharray: 276.46; stroke-dashoffset: 276.46;
		transition: stroke-dashoffset 0.35s ease;
	}
	.loader-logo {
		width: 78px; height: 78px; border-radius: 50%;
		background: linear-gradient(145deg,#fff,#eaeaea); padding: 12px;
		object-fit: contain; box-shadow: 0 8px 24px rgba(0,0,0,.35);
		animation: pulse 1.6s infinite ease-in-out; position: relative; z-index: 1;
	}
	.loader-pct-inside {
		position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%);
		font-size: 11px; font-weight: 700; color: #fff;
		background: rgba(0,118,182,0.85); padding: 1px 7px;
		border-radius: 99px; z-index: 2; white-space: nowrap;
	}
	.loader-text { font-size: 14px; color: #fff; font-weight: 600; letter-spacing: 0.5px; text-align: center; opacity: 0.85; }

	@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.85; } 50% { transform: scale(1.06); opacity: 1; } }

	/* ── Download Arrow Animation ─────────────── */
	.dl-anim-wrap  { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 60px; }
	.dl-arrow-track { width: 24px; height: 28px; overflow: hidden; position: relative; }
	.dl-arrow {
		display: flex; flex-direction: column; align-items: center;
		position: absolute; left: 50%; transform: translateX(-50%);
		animation: dl-drop 1.2s ease-in-out infinite;
	}
	.dl-arrow-stem { width: 3px; height: 14px; background: linear-gradient(180deg,#00c6ff,#0076B6); border-radius: 2px; }
	.dl-arrow-head { width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; border-top: 9px solid #0076B6; }
	@keyframes dl-drop { 0% { top: -28px; opacity: 0; } 30% { opacity: 1; } 70% { opacity: 1; } 100% { top: 28px; opacity: 0; } }

	.dl-bar { width: 44px; height: 4px; background: linear-gradient(90deg,#0076B6,#00c6ff); border-radius: 99px; animation: dl-bar-pulse 1.2s ease-in-out infinite; }
	@keyframes dl-bar-pulse { 0%, 100% { opacity: 0.4; transform: scaleX(0.8); } 50% { opacity: 1; transform: scaleX(1); } }

	.dl-dots { display: flex; gap: 5px; }
	.dl-dots span { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.6); animation: dl-bounce 1.2s ease-in-out infinite; }
	.dl-dots span:nth-child(1) { animation-delay: 0s; }
	.dl-dots span:nth-child(2) { animation-delay: 0.2s; }
	.dl-dots span:nth-child(3) { animation-delay: 0.4s; }
	@keyframes dl-bounce { 0%, 80%, 100% { transform: scale(1); opacity: 0.5; } 40% { transform: scale(1.5); opacity: 1; } }

	/* ── Responsive: Tablet (≤768px) ─────────── */
	@media (max-width: 768px) {
		.budget-import-wrapper { padding: 16px; }
		.user-header,
		.user-header.user-header-collapsible { flex-direction: column; align-items: flex-start; gap: 10px; padding: 12px 14px; }
		.user-header-right { width: 100%; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
		.button-container { width: 100%; }
		.dl-btn           { width: 100%; justify-content: center; }
		.gus-inner        { max-width: 100%; }
		.tbl-search-inner { max-width: 100%; }
		.contact-wrapper  { flex-direction: column; }
		.contact-card     { min-width: unset; width: 100%; }
		.mis-table        { font-size: 12px; }
		.mis-table th,
		.mis-table td     { padding: 7px 6px; }
	}

	/* ── Responsive: Mobile (≤576px) ─────────── */
	@media (max-width: 576px) {
		.budget-import-wrapper   { padding: 12px; }
		.global-user-search-wrap { padding: 12px 14px; }
		.gus-inner               { max-width: 100%; }
		.user-name               { font-size: 14px; }
		.user-email              { font-size: 11px; }
		.expand-toggle-wrap      { flex-wrap: wrap; gap: 6px; }
		.expand-row-count        { font-size: 10px; padding: 2px 7px; }
		.expand-toggle-btn       { font-size: 11px; }
		.table-wrapper           { overflow-x: auto; -webkit-overflow-scrolling: touch; }
		.mis-table               { font-size: 11px; min-width: 520px; }
		.mis-table th,
		.mis-table td            { padding: 6px 5px; white-space: nowrap; }

		/* Sticky serial number column */
		.mis-table thead tr th:first-child,
		.mis-table tbody tr td:first-child { position: sticky; left: 0; z-index: 2; background: #0076B6; color: #fff; }
		.mis-table tbody tr td:first-child  { background: #f4f9fd; color: #003B63; font-weight: 600; }
		.mis-table tbody tr:nth-child(even) td:first-child { background: #edf5fb; }
		.mis-table tbody tr:hover           td:first-child { background: #daeef8; }

		.note-warning { padding: 12px; }
		.note-header  { font-size: 13px; }
		.note-badge   { font-size: 10px; }
		.tbl-search-inner { max-width: 100%; }
		.tbl-search-input { font-size: 12px; }

		.apf-modal-box     { padding: 20px 16px; border-radius: 10px; }
		.apf-modal-header  { font-size: 15px; margin-bottom: 16px; }
		.apf-modal-icon    { font-size: 34px; }
		.apf-modal-text    { font-size: 14px; }
		.apf-modal-sub     { font-size: 13px; }
		.apf-modal-footer  { flex-direction: column; gap: 8px; }
		.apf-modal-footer .btn { width: 100%; min-width: unset; margin: 0; }

		.loader-ring-wrap { width: 100px; height: 100px; }
		.loader-logo      { width: 64px; height: 64px; }
		.loader-text      { font-size: 13px; }
	}

	/* ── Responsive: Small Mobile (≤360px) ───── */
	@media (max-width: 360px) {
		.budget-import-wrapper { padding: 8px; }
		.user-name  { font-size: 13px; }
		.user-email { font-size: 10px; }
		.dl-btn     { font-size: 12px; padding: 6px 10px; }
		.mis-table  { font-size: 10px; min-width: 460px; }
		.mis-table th,
		.mis-table td { padding: 5px 4px; }
		.gus-input,
		.tbl-search-input { font-size: 12px; padding: 8px 28px; }
		.apf-modal-box    { padding: 16px 12px; }
		.apf-modal-header { font-size: 14px; }
	}
	`;

	document.head.appendChild(style);
}