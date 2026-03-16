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


frappe.pages["import-template"].on_page_load = function (wrapper) {

	frappe.ui.make_app_page({
		parent      : wrapper,
		title       : "Budget Import Template",
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
		callback : function (r) {
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

				<!-- Download animation -->
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
	show(message = "Preparing download…") {
		_init_loader();
		$("#loader-text-msg").text(message);
		_set_progress(0);
		$("#global-loader").addClass("active");
	},
	hide() {
		$("#global-loader").removeClass("active");
	}
};

function _set_progress(pct) {
	// SVG circle circumference for r=44: 2 * PI * 44 ≈ 276.46
	const circumference = 2 * Math.PI * 44;
	const offset = circumference - (pct / 100) * circumference;
	$("#loader-ring-fill").css("stroke-dashoffset", offset);
	$("#loader-pct").text(pct + "%");
}


/* ============================================================
   RENDER CONTENT
============================================================ */

function render_content(container, data) {

	const roles                = Array.isArray(frappe.user_roles) ? frappe.user_roles : [];
	const isFinanceCoordinator = roles.includes("Finance Unit Coordinator");
	const isSystemManager      = roles.includes("System Manager");
	const needsModal           = isFinanceCoordinator && !isSystemManager;

	const grouped = {};
	data.forEach(function (row) {
		const key = row.user;
		if (!grouped[key]) {
			grouped[key] = { user_fullname: row.user_fullname || "", email: row.user, rows: [] };
		}
		grouped[key].rows.push(row);
	});

	container.empty();

	// ── Global Search Bar ──────────────────────────────────
	container.append(`
		<div class="global-search-wrap">
			<div class="global-search-inner">
				<i class="fa fa-search global-search-icon"></i>
				<input
					type        = "text"
					id          = "global-table-search"
					class       = "global-search-input"
					placeholder = "Search across all units, cost centers, locations…"
					autocomplete= "off"
				/>
				<span id="global-search-clear" class="global-search-clear" title="Clear">&times;</span>
			</div>
			<div id="global-search-count" class="global-search-count" style="display:none;"></div>
		</div>
	`);

	// ── Confirm Download Modal ─────────────────────────────
	if (!$("#pro-confirm-overlay").length) {
		$("body").append(`
			<div id="pro-confirm-overlay">
				<div class="pro-confirm-box">
					<div class="pro-confirm-header">
						<div class="pro-confirm-title">
							<i class="fa fa-download"></i> Confirm Download
						</div>
						<span id="pro-confirm-close" title="Close">&times;</span>
					</div>
					<div class="pro-confirm-body">
						<div class="pro-warning-icon">
							<i class="fa fa-exclamation-triangle"></i>
						</div>
						<div class="pro-warning-text">
							Please carefully review and validate all allocated Units, Cost Centers,
							and Location Codes before downloading the Budget Import Template.
						</div>
						<div class="pro-warning-sub">
							Do not proceed unless everything has been reviewed and confirmed.
						</div>
						<div class="pro-checkbox-wrapper">
							<label class="pro-checkbox-label">
								<input type="checkbox" id="pro-confirm-checkbox">
								<span>
									<i class="fa fa-check-circle"></i>
									I confirm that I have verified all details carefully.
								</span>
							</label>
						</div>
					</div>
					<div class="pro-confirm-footer">
						<button id="pro-confirm-no" class="btn btn-default btn-sm">
							<i class="fa fa-times"></i> Cancel
						</button>
						<button id="pro-confirm-yes" class="btn btn-primary btn-sm" disabled>
							<i class="fa fa-download"></i> Proceed to Download
						</button>
					</div>
				</div>
			</div>
		`);
	}

	// ── Modal Event Listeners ──────────────────────────────
	$(document)
		.off(".budgetModal")
		.on("change.budgetModal", "#pro-confirm-checkbox", function () {
			$("#pro-confirm-yes").prop("disabled", !this.checked);
		})
		.on("click.budgetModal", "#pro-confirm-no, #pro-confirm-close", function () {
			_hide_modal();
		})
		.on("click.budgetModal", "#pro-confirm-overlay", function (e) {
			if ($(e.target).is("#pro-confirm-overlay")) _hide_modal();
		})
		.on("click.budgetModal", "#pro-confirm-yes", function () {
			const $overlay  = $("#pro-confirm-overlay");
			const btn       = $overlay.data("trigger-btn");
			const userEmail = $overlay.data("user-email");
			_hide_modal();
			if (!btn || !userEmail) return;
			_start_download(btn, userEmail);
		});

	// ── Build Each User Section ────────────────────────────
	Object.values(grouped).forEach(function (userData) {
		const displayName = userData.user_fullname || userData.email;

		const $section = $(`
			<div class="user-section">
				<div class="user-header">
					<div>
						<div class="user-name">${_esc(displayName)}</div>
						<div class="user-email">${_esc(userData.email)}</div>
					</div>
					<div class="button-container"></div>
				</div>
				<div class="user-body"></div>
			</div>
		`);
		container.append($section);

		const $downloadBtn = $(`
			<button class="btn btn-primary btn-sm">
				<i class="fa fa-download"></i> Download Budget Import Template
			</button>
		`);
		$section.find(".button-container").append($downloadBtn);

		if (needsModal) {
			$downloadBtn.on("click", function () {
				$("#pro-confirm-overlay")
					.css("display", "flex")
					.data("trigger-btn",  $(this))
					.data("user-email",   userData.email);
				$("#pro-confirm-checkbox").prop("checked", false);
				$("#pro-confirm-yes").prop("disabled", true);
			});
		} else {
			$downloadBtn.on("click", function () {
				_start_download($(this), userData.email);
			});
		}

		const $body = $section.find(".user-body");
		if (needsModal) $body.append(_build_note_html());
		$body.append(_build_table_html(userData.rows));
	});

	// ── Global Search Logic ────────────────────────────────
	function run_global_search(query) {
		const q = query.trim().toLowerCase();
		let totalVisible = 0;

		$(".user-section").each(function () {
			const $section = $(this);
			let sectionVisible = 0;

			$section.find(".mis-table tbody tr").each(function () {
				const match = !q || this.textContent.toLowerCase().includes(q);
				$(this).toggle(match);
				if (match) { sectionVisible++; totalVisible++; }
			});

			$section.toggle(!q || sectionVisible > 0);
		});

		const $count = $("#global-search-count");
		if (q) {
			$count.text(`${totalVisible} row${totalVisible !== 1 ? "s" : ""} matched`).show();
		} else {
			$count.hide();
		}
		$("#global-search-clear").toggle(q.length > 0);
	}

	$(document)
		.off(".globalSearch")
		.on("input.globalSearch", "#global-table-search", function () {
			run_global_search(this.value);
		})
		.on("click.globalSearch", "#global-search-clear", function () {
			$("#global-table-search").val("").trigger("input");
		});

	$("#global-search-clear").hide();
}


/* ============================================================
   HELPER FUNCTIONS
============================================================ */

function _esc(str) {
	return $("<div>").text(str || "").html();
}

function _hide_modal() {
	$("#pro-confirm-overlay").hide();
	$("#pro-confirm-checkbox").prop("checked", false);
	$("#pro-confirm-yes").prop("disabled", true);
}


/* ── _start_download()
   Downloads the file in the SAME TAB using a hidden <a> tag + fetch.
   Shows the APF loader with animated progress percentage. */
// function _start_download($btn, userEmail) {

// 	// Disable button and show spinner
// 	$btn.prop("disabled", true).html('<i class="fa fa-spinner fa-spin"></i> Downloading…');

// 	// Show loader at 0%
// 	Loader.show("Preparing your download…");

// 	const url =
// 		`/api/method/annual_budget.api.export_reports.download_finance_budget_import_template` +
// 		`?user=${encodeURIComponent(userEmail)}`;

// 	// ── Simulated progress (0 → 85%) while fetch is in-flight ──
// 	let pct = 0;
// 	const progressInterval = setInterval(function () {
// 		// Increment quickly at first, then slow down near 85%
// 		const step = pct < 40 ? 6 : pct < 70 ? 3 : 1;
// 		pct = Math.min(pct + step, 85);
// 		_set_progress(pct);
// 	}, 200);

// 	fetch(url)
// 		.then(function (response) {
// 			if (!response.ok) throw new Error("Server returned " + response.status);

// 			// Try to extract filename from Content-Disposition header
// 			const disposition = response.headers.get("Content-Disposition") || "";
// 			const match       = disposition.match(/filename[^;=\n]*=["']?([^"';\n]+)/);
// 			const filename    = match ? decodeURIComponent(match[1].trim()) : "budget_import_template.xlsx";

// 			return response.blob().then(function (blob) {
// 				return { blob, filename };
// 			});
// 		})
// 		.then(function ({ blob, filename }) {

// 			// ── Jump progress to 100% ──
// 			clearInterval(progressInterval);
// 			_set_progress(100);
// 			$("#global-loader .loader-text").text("Download ready!");

// 			// ── Trigger same-tab download via hidden <a> ──
// 			const blobUrl = URL.createObjectURL(blob);
// 			const $a      = $("<a>")
// 				.attr("href",     blobUrl)
// 				.attr("download", filename)
// 				.appendTo("body");

// 			$a[0].click();
// 			$a.remove();

// 			// Release the object URL after a short delay
// 			setTimeout(function () { URL.revokeObjectURL(blobUrl); }, 2000);

// 			// Hide loader after a brief moment so user sees 100%
// 			$("#loader-text-msg").text("Download ready!");
// 			setTimeout(function () { Loader.hide(); }, 800);

// 		})
// 		.catch(function (err) {
// 			clearInterval(progressInterval);
// 			Loader.hide();
// 			frappe.msgprint({
// 				title   : "Download Failed",
// 				message : "Could not download the template. Please try again.<br><small>" + err.message + "</small>",
// 				indicator: "red"
// 			});
// 		})
// 		.finally(function () {
// 			// Re-enable button regardless of outcome (no timer — waits for API to fully complete)
// 			$btn
// 				.prop("disabled", false)
// 				.html('<i class="fa fa-download"></i> Download Budget Import Template');
// 		});
// }

function _start_download($btn, userEmail) {

	$btn.prop("disabled", true).html('<i class="fa fa-spinner fa-spin"></i> Preparing…');

	Loader.show("Preparing your download…");

	let pct = 0;

	const progressInterval = setInterval(function () {
		const step = pct < 40 ? 6 : pct < 70 ? 3 : 1;
		pct = Math.min(pct + step, 85);
		_set_progress(pct);
	}, 200);

	// Start background generation
	frappe.call({
		method: "annual_budget.api.export_reports.start_budget_template_generation",
		args: { user: userEmail },
		callback: function () {

			// Poll every 3 seconds
			const poll = setInterval(function () {

				const url =
					"/api/method/annual_budget.api.export_reports.download_generated_template?user=" +
					encodeURIComponent(userEmail);

				fetch(url)
					.then(response => {

						// If still generating
						if (!response.ok) {
							throw new Error("not ready");
						}

						return response.blob();

					})
					.then(blob => {

						clearInterval(poll);
						clearInterval(progressInterval);

						_set_progress(100);

						const blobUrl = URL.createObjectURL(blob);

						const a = document.createElement("a");
						a.href = blobUrl;
						a.download = "budget_import_template.xlsx";
						document.body.appendChild(a);
						a.click();
						a.remove();

						setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);

						setTimeout(() => Loader.hide(), 800);

					})
					.catch(() => {
						// File not ready yet → keep polling
					});

			}, 3000);

		}
	})
	.finally(() => {

		$btn.prop("disabled", false)
			.html('<i class="fa fa-download"></i> Download Budget Import Template');

	});
}

function _build_note_html() {

	const contacts = [
		["Rakesh Ahuja",         "rakesh.ahuja@azimpremjifoundation.org",      "+91 7022068106"],
		["Saravana G",           "saravana.g@azimpremjifoundation.org",        "+91 9380861952"],
		["Augustin Moses R",     "augustin.moses@azimpremjifoundation.org",    "+91 8667719594"],
		["Mercy Selvanayagi R",  "mercy.selvanayagi@azimpremjifoundation.org", "+91 9047828687"],
		["Mahaveer Ram P",       "mahaveer.p@azimpremjifoundation.org",        "+91 8825879412"],
	];

	const contactCards = contacts.map(function (c) {
		return `
			<div class="contact-card">
				<div class="contact-name">${c[0]}</div>
				<div class="contact-detail">${c[1]}</div>
				<div class="contact-detail">${c[2]}</div>
			</div>
		`;
	}).join("");

	return `
		<div class="note-warning">
			<div class="note-header">
				<span class="note-badge blinking-badge">IMPORTANT</span>
				Before importing, please carefully cross-verify the allocated Units and Cost Centers listed below.
				If you notice any discrepancies, contact the support team immediately.
				Do not proceed with the import until all details are verified and confirmed.
			</div>
			<div class="contact-wrapper">${contactCards}</div>
		</div>
	`;
}


function _build_table_html(rows) {

	const COLUMNS = [
		["unit",                     "Unit"                    ],
		["unit_description",         "Unit Description"        ],
		["cost_center",              "Cost Center"             ],
		["cost_center_description",  "Cost Center Description" ],
		["location_code",            "Location Code"           ],
		["location_description",     "Location Description"    ],
	];

	const headerCells = COLUMNS.map(col => `<th>${col[1]}</th>`).join("");

	const dataRows = rows.map(function (row, index) {
		const cells = COLUMNS.map(col => `<td>${_esc(row[col[0]] || "")}</td>`).join("");
		return `<tr><td>${index + 1}</td>${cells}</tr>`;
	}).join("");

	return `
		<h4 class="table-title">Allocated Units &amp; Cost Centers</h4>
		<div class="table-wrapper">
			<table class="mis-table">
				<thead>
					<tr>
						<th>Sl. No.</th>
						${headerCells}
					</tr>
				</thead>
				<tbody>${dataRows}</tbody>
			</table>
		</div>
	`;
}


/* ============================================================
   INJECT STYLES
============================================================ */

function inject_styles() {

	if (document.getElementById("allocation-style")) return;

	const style    = document.createElement("style");
	style.id       = "allocation-style";
	style.textContent = `

	/* ── Page Wrapper ─────────────────────────── */
	.budget-import-wrapper {
		padding    : 25px;
		background : #ffffff;
		min-height : 100vh;
	}

	/* ── Loading / Empty States ───────────────── */
	.loading-state,
	.empty-state {
		text-align  : center;
		padding     : 50px;
		font-weight : 600;
		color       : #0076B6;
	}

	/* ── Global Search Bar ────────────────────── */
	.global-search-wrap { margin-bottom: 30px; }

	.global-search-inner {
		position    : relative;
		display     : flex;
		align-items : center;
		max-width   : 520px;
	}

	.global-search-icon {
		position       : absolute;
		left           : 12px;
		color          : #0076B6;
		font-size      : 14px;
		pointer-events : none;
	}

	.global-search-input {
		width         : 100%;
		padding       : 10px 36px;
		border        : 1.5px solid #c8dff0;
		border-radius : 8px;
		font-size     : 14px;
		color         : #222;
		outline       : none;
		background    : #f4f9fd;
		transition    : border-color 0.2s, box-shadow 0.2s;
	}

	.global-search-input:focus {
		border-color : #0076B6;
		box-shadow   : 0 0 0 3px rgba(0,118,182,0.12);
		background   : #ffffff;
	}

	.global-search-clear {
		position   : absolute;
		right      : 10px;
		font-size  : 18px;
		color      : #999;
		cursor     : pointer;
		transition : color 0.15s;
	}

	.global-search-clear:hover { color: #c0392b; }

	.global-search-count {
		margin-top  : 6px;
		font-size   : 12px;
		color       : #0076B6;
		font-weight : 600;
		padding-left: 2px;
	}

	/* ── User Section ─────────────────────────── */
	.user-section { margin-bottom: 50px; }

	.user-header {
		display         : flex;
		justify-content : space-between;
		align-items     : center;
		padding-bottom  : 12px;
		border-bottom   : 2px solid #0076B6;
		margin-bottom   : 18px;
	}

	.user-name  { font-size: 18px; font-weight: 700; color: #003B63; }
	.user-email { font-size: 13px; color: #555555; }

	/* ── Important Note ───────────────────────── */
	.note-warning {
		background    : #fff8e1;
		border-left   : 5px solid #f4b400;
		padding       : 16px;
		border-radius : 6px;
		margin-bottom : 25px;
	}

	.note-header { font-size: 14px; color: #5c4b00; margin-bottom: 15px; }

	.note-badge {
		background    : #f4b400;
		color         : #ffffff;
		font-size     : 11px;
		font-weight   : 700;
		padding       : 3px 8px;
		border-radius : 20px;
		margin-right  : 8px;
	}

	.blinking-badge { animation: softBlink 1.5s ease-in-out infinite; }

	@keyframes softBlink {
		0%, 100% { opacity: 1;   }
		50%      { opacity: 0.5; }
	}

	/* ── Contact Cards ────────────────────────── */
	.contact-wrapper { display: flex; gap: 15px; flex-wrap: wrap; }

	.contact-card {
		background    : #ffffff;
		border        : 1px solid #e6e6e6;
		border-radius : 8px;
		padding       : 12px 15px;
		min-width     : 230px;
		box-shadow    : 0 3px 10px rgba(0,0,0,0.04);
	}

	.contact-name   { font-weight: 600; color: #333333; margin-bottom: 5px; }
	.contact-detail { font-size: 13px; color: #555555; }

	/* ── Allocation Table ─────────────────────── */
	.table-title  { font-size: 15px; font-weight: 600; color: #003B63; margin-bottom: 12px; }
	.table-wrapper { overflow-x: auto; }

	.mis-table { width: 100%; border-collapse: collapse; font-size: 13px; border: 1px solid #dcdcdc; }
	.mis-table th { background: #0076B6; color: #ffffff; font-weight: 700; padding: 8px; text-align: center; }
	.mis-table td { padding: 8px; border: 1px solid #e0e0e0; text-align: center; }
	.mis-table tr:nth-child(even) { background: #f9f9f9; }
	.mis-table tr:hover           { background: #eef6fb; }

	/* ── Confirmation Modal ───────────────────── */
	#pro-confirm-overlay {
		position        : fixed;
		inset           : 0;
		background      : rgba(0,0,0,0.5);
		display         : none;
		align-items     : center;
		justify-content : center;
		z-index         : 9999;
		backdrop-filter : blur(4px);
		padding         : 15px;
	}

	.pro-confirm-box {
		background    : #ffffff;
		width         : 640px;
		max-width     : 100%;
		min-height    : 360px;
		border-radius : 12px;
		box-shadow    : 0 25px 60px rgba(0,0,0,0.25);
		padding       : 35px;
		animation     : scaleIn 0.25s ease;
	}

	@keyframes scaleIn {
		from { transform: scale(0.95); opacity: 0; }
		to   { transform: scale(1);    opacity: 1; }
	}

	.pro-confirm-header {
		display         : flex;
		justify-content : space-between;
		align-items     : center;
		font-weight     : 600;
		font-size       : 18px;
		margin-bottom   : 25px;
	}

	.pro-confirm-title i { margin-right: 8px; color: #007bff; }

	#pro-confirm-close {
		cursor     : pointer;
		font-size  : 22px;
		color      : #888888;
		transition : color 0.2s;
	}

	#pro-confirm-close:hover { color: #000000; }

	.pro-confirm-body  { text-align: center; margin-bottom: 25px; }
	.pro-warning-icon  { font-size: 42px; color: #e74c3c; margin-bottom: 15px; }
	.pro-warning-text  { font-weight: 600; font-size: 16px; color: #c0392b; margin-bottom: 15px; line-height: 1.6; }
	.pro-warning-sub   { font-size: 14px; color: #555555; margin-bottom: 25px; line-height: 1.6; }

	.pro-checkbox-wrapper {
		background    : #f8f9fa;
		padding       : 18px;
		border-radius : 8px;
		border        : 1px solid #e0e0e0;
		font-size     : 14px;
		text-align    : left;
	}

	.pro-checkbox-label { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
	.pro-checkbox-label i { color: #28a745; margin-right: 6px; }
	.pro-checkbox-wrapper input { margin-top: 4px; transform: scale(1.1); }

	.pro-confirm-footer { text-align: right; margin-top: 20px; }
	.pro-confirm-footer button { margin-left: 12px; min-width: 170px; }
	#pro-confirm-yes:disabled { opacity: 0.6; cursor: not-allowed; }

	/* ── APF Loader Overlay ───────────────────── */
	#global-loader.loader-overlay {
		position        : fixed;
		inset           : 0;
		width           : 100vw;
		height          : 100vh;
		background      : rgba(18,18,18,0.92);
		backdrop-filter : blur(6px);
		z-index         : 999999;
		display         : none;
		align-items     : center;
		justify-content : center;
	}

	#global-loader.loader-overlay.active {
		display : flex;
	}

	.loader-box {
		display         : flex;
		flex-direction  : column;
		align-items     : center;
		justify-content : center;
		gap             : 16px;
	}

	/* Ring + logo stacked */
	.loader-ring-wrap {
		position : relative;
		width    : 120px;
		height   : 120px;
		display  : flex;
		align-items     : center;
		justify-content : center;
	}

	.loader-ring {
		position : absolute;
		inset    : 0;
		width    : 100%;
		height   : 100%;
		transform: rotate(-90deg);
	}

	.loader-ring-bg {
		fill           : none;
		stroke         : rgba(255,255,255,0.12);
		stroke-width   : 6;
	}

	.loader-ring-fill {
		fill             : none;
		stroke           : url(#ringGrad);
		stroke-width     : 6;
		stroke-linecap   : round;
		stroke-dasharray : 276.46;
		stroke-dashoffset: 276.46;
		transition       : stroke-dashoffset 0.25s ease;
	}

	.loader-logo {
		width         : 78px;
		height        : 78px;
		border-radius : 50%;
		background    : linear-gradient(145deg, #ffffff, #eaeaea);
		padding       : 12px;
		object-fit    : contain;
		box-shadow    : 0 8px 24px rgba(0,0,0,.35);
		animation     : pulse 1.6s infinite ease-in-out;
		position      : relative;
		z-index       : 1;
	}

	.loader-pct-inside {
		position    : absolute;
		bottom      : -4px;
		left        : 50%;
		transform   : translateX(-50%);
		font-size   : 11px;
		font-weight : 700;
		color       : #ffffff;
		background  : rgba(0,118,182,0.85);
		padding     : 1px 7px;
		border-radius: 99px;
		z-index     : 2;
		white-space : nowrap;
	}

	.loader-text {
		font-size      : 14px;
		color          : #ffffff;
		font-weight    : 600;
		letter-spacing : 0.5px;
		text-align     : center;
		opacity        : 0.85;
	}

	@keyframes pulse {
		0%, 100% { transform: scale(1);    opacity: 0.85; }
		50%      { transform: scale(1.06); opacity: 1;    }
	}

	/* ── Download Animation ───────────────────── */
	.dl-anim-wrap {
		display        : flex;
		flex-direction : column;
		align-items    : center;
		gap            : 6px;
		width          : 60px;
	}

	/* Arrow track — clips the arrow so it disappears at bottom */
	.dl-arrow-track {
		width    : 24px;
		height   : 28px;
		overflow : hidden;
		position : relative;
	}

	.dl-arrow {
		display        : flex;
		flex-direction : column;
		align-items    : center;
		position       : absolute;
		top            : 0;
		left           : 50%;
		transform      : translateX(-50%);
		animation      : dl-drop 1.2s ease-in-out infinite;
	}

	.dl-arrow-stem {
		width        : 3px;
		height       : 14px;
		background   : linear-gradient(180deg, #00c6ff, #0076B6);
		border-radius: 2px;
	}

	.dl-arrow-head {
		width        : 0;
		height       : 0;
		border-left  : 7px solid transparent;
		border-right : 7px solid transparent;
		border-top   : 9px solid #0076B6;
	}

	@keyframes dl-drop {
		0%   { top: -28px; opacity: 0;   }
		30%  { opacity: 1; }
		70%  { opacity: 1; }
		100% { top: 28px;  opacity: 0;   }
	}

	/* Landing bar */
	.dl-bar {
		width         : 44px;
		height        : 4px;
		background    : linear-gradient(90deg, #0076B6, #00c6ff);
		border-radius : 99px;
		animation     : dl-bar-pulse 1.2s ease-in-out infinite;
	}

	@keyframes dl-bar-pulse {
		0%, 100% { opacity: 0.4; transform: scaleX(0.8); }
		50%      { opacity: 1;   transform: scaleX(1);   }
	}

	/* Bouncing dots */
	.dl-dots {
		display : flex;
		gap     : 5px;
	}

	.dl-dots span {
		width         : 5px;
		height        : 5px;
		border-radius : 50%;
		background    : rgba(255,255,255,0.6);
		animation     : dl-bounce 1.2s ease-in-out infinite;
	}

	.dl-dots span:nth-child(1) { animation-delay: 0s;    }
	.dl-dots span:nth-child(2) { animation-delay: 0.2s;  }
	.dl-dots span:nth-child(3) { animation-delay: 0.4s;  }

	@keyframes dl-bounce {
		0%, 80%, 100% { transform: scale(1);    opacity: 0.5; }
		40%           { transform: scale(1.5);  opacity: 1;   }
	}

	/* ── Responsive ───────────────────────────── */
	@media (max-width: 768px) {
		.user-header { flex-direction: column; align-items: flex-start; gap: 10px; }
	}

	@media (max-width: 576px) {
		.global-search-inner { max-width: 100%; }
		.pro-confirm-box     { width: 100%; min-height: auto; padding: 25px; }
		.pro-confirm-header  { font-size: 16px; }
		.pro-warning-text    { font-size: 15px; }
		.pro-confirm-footer  { text-align: center; }
		.pro-confirm-footer button { width: 100%; margin: 8px 0; }
	}
	`;

	document.head.appendChild(style);
}