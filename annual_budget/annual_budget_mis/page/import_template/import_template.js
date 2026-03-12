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
// 	let roles = frappe.user_roles || [];

// 	data.forEach(row => {
// 		let name = row.full_name || row.user;

// 		if (!grouped[name]) {
// 			grouped[name] = {
// 				email: row.user,
// 				rows: []
// 			};
// 		}

// 		grouped[name].rows.push(row);
// 	});

// 	container.empty();

// 	Object.keys(grouped).forEach(user => {

// 		let userData = grouped[user];

// 		let isFinanceCoordinator = roles.includes("Finance Unit Coordinator");
// 		let isSystemManager = roles.includes("System Manager");

// 		/* ===============================
// 		   USER SECTION
// 		=============================== */

// 		let section = $(`
// 			<div class="user-section">

// 				<div class="user-header">
// 					<div>
// 						<div class="user-name">${user}</div>
// 						<div class="user-email">${userData.email}</div>
// 					</div>

// 					<div class="button-container"></div>
// 				</div>

// 				<div class="user-body"></div>

// 			</div>
// 		`);

// 		container.append(section);
// /* =====================================================
//    PROFESSIONAL CONFIRM DOWNLOAD MODAL
//    (APPENDS ONLY ONCE)
// ===================================================== */

// // if (!$("#pro-confirm-overlay").length) {

// // 	$("body").append(`
// // 	<div id="pro-confirm-overlay">
// // 		<div class="pro-confirm-box">

// // 			<div class="pro-confirm-header">
// // 				<div class="pro-confirm-title">
// // 					⚠ Confirm Download
// // 				</div>
// // 				<span id="pro-confirm-close">&times;</span>
// // 			</div>

// // 			<div class="pro-confirm-body">
// // 				<div class="pro-warning-text">
// // 					We request that you carefully review and validate all allocated Units, Cost Centers, and Location Codes before downloading the Budget Import Template.
// // 				</div>

// // 				<div class="pro-warning-sub">
// // 					Do not proceed unless everything is reviewed and confirmed.
// // 				</div>

// // 				<div class="pro-checkbox-wrapper">
// // 					<label>
// // 						<input type="checkbox" id="pro-confirm-checkbox">
// // 						I confirm that I have verified all details carefully.
// // 					</label>
// // 				</div>
// // 			</div>

// // 			<div class="pro-confirm-footer">
// // 				<button id="pro-confirm-no" class="btn btn-default btn-sm">
// // 					Cancel
// // 				</button>
// // 				<button id="pro-confirm-yes" 
// // 						class="btn btn-primary btn-sm" 
// // 						disabled>
// // 					Proceed to Download
// // 				</button>
// // 			</div>

// // 		</div>
// // 	</div>

// // 	<style>

// // 	#pro-confirm-overlay {
// // 		position: fixed;
// // 		top: 0;
// // 		left: 0;
// // 		width: 100%;
// // 		height: 100%;
// // 		background: rgba(0,0,0,0.45);
// // 		display: none;
// // 		align-items: center;
// // 		justify-content: center;
// // 		z-index: 9999;
// // 		backdrop-filter: blur(3px);
// // 	}

// // 	.pro-confirm-box {
// // 		background: #ffffff;
// // 		width: 460px;
// // 		border-radius: 10px;
// // 		box-shadow: 0 15px 40px rgba(0,0,0,0.25);
// // 		padding: 25px;
// // 		animation: scaleIn 0.2s ease;
// // 	}

// // 	@keyframes scaleIn {
// // 		from { transform: scale(0.95); opacity: 0; }
// // 		to { transform: scale(1); opacity: 1; }
// // 	}

// // 	.pro-confirm-header {
// // 		display: flex;
// // 		justify-content: space-between;
// // 		align-items: center;
// // 		font-weight: 600;
// // 		font-size: 16px;
// // 		margin-bottom: 15px;
// // 	}

// // 	#pro-confirm-close {
// // 		cursor: pointer;
// // 		font-size: 20px;
// // 		color: #888;
// // 	}

// // 	.pro-warning-text {
// // 		font-weight: 600;
// // 		color: #c0392b;
// // 		margin-bottom: 8px;
// // 	}

// // 	.pro-warning-sub {
// // 		font-size: 14px;
// // 		color: #555;
// // 		margin-bottom: 20px;
// // 	}

// // 	.pro-checkbox-wrapper {
// // 		background: #f8f9fa;
// // 		padding: 12px;
// // 		border-radius: 6px;
// // 		border: 1px solid #e0e0e0;
// // 		font-size: 13px;
// // 	}

// // 	.pro-checkbox-wrapper input {
// // 		margin-right: 8px;
// // 	}

// // 	.pro-confirm-footer {
// // 		text-align: right;
// // 		margin-top: 20px;
// // 	}

// // 	.pro-confirm-footer button {
// // 		margin-left: 10px;
// // 		min-width: 140px;
// // 	}

// // 	#pro-confirm-yes:disabled {
// // 		opacity: 0.6;
// // 		cursor: not-allowed;
// // 	}

// // 	</style>
// // 	`);
// // }

// if (!$("#pro-confirm-overlay").length) {

//     $("body").append(`
//     <div id="pro-confirm-overlay">
//         <div class="pro-confirm-box">

//             <div class="pro-confirm-header">
//                 <div class="pro-confirm-title">
//                     <i class="fa fa-download"></i> Confirm Download
//                 </div>
//                 <span id="pro-confirm-close">&times;</span>
//             </div>

//             <div class="pro-confirm-body">

//                 <div class="pro-warning-icon">
//                     <i class="fa fa-exclamation-triangle"></i>
//                 </div>

//                 <div class="pro-warning-text">
//                    We request that you carefully review and validate all allocated Units, Cost Centers, and Location Codes before downloading the Budget Import Template.
//                 </div>

//                 <div class="pro-warning-sub">
//                     Do not proceed unless everything has been reviewed and confirmed.
//                 </div>

//                 <div class="pro-checkbox-wrapper">
//                     <label class="pro-checkbox-label">
//                         <input type="checkbox" id="pro-confirm-checkbox">
//                         <span>
//                             <i class="fa fa-check-circle"></i>
//                             I confirm that I have verified all details carefully.
//                         </span>
//                     </label>
//                 </div>

//             </div>

//             <div class="pro-confirm-footer">
//                 <button id="pro-confirm-no" class="btn btn-default btn-sm">
//                     <i class="fa fa-times"></i> Cancel
//                 </button>
//                 <button id="pro-confirm-yes" 
//                         class="btn btn-primary btn-sm" 
//                         disabled>
//                     <i class="fa fa-download"></i> Proceed to Download
//                 </button>
//             </div>

//         </div>
//     </div>

//     <style>

//     #pro-confirm-overlay {
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background: rgba(0,0,0,0.5);
//         display: none;
//         align-items: center;
//         justify-content: center;
//         z-index: 9999;
//         backdrop-filter: blur(4px);
//         padding: 15px;
//     }

//     .pro-confirm-box {
//         background: #ffffff;
//         width: 640px;
//         max-width: 100%;
//         min-height: 360px;
//         border-radius: 12px;
//         box-shadow: 0 25px 60px rgba(0,0,0,0.25);
//         padding: 35px;
//         animation: scaleIn 0.25s ease;
//     }

//     @keyframes scaleIn {
//         from { transform: scale(0.95); opacity: 0; }
//         to { transform: scale(1); opacity: 1; }
//     }

//     .pro-confirm-header {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         font-weight: 600;
//         font-size: 18px;
//         margin-bottom: 25px;
//     }

//     .pro-confirm-title i {
//         margin-right: 8px;
//         color: #007bff;
//     }

//     #pro-confirm-close {
//         cursor: pointer;
//         font-size: 22px;
//         color: #888;
//         transition: 0.2s;
//     }

//     #pro-confirm-close:hover {
//         color: #000;
//     }

//     .pro-confirm-body {
//         text-align: center;
//         margin-bottom: 25px;
//     }

//     .pro-warning-icon {
//         font-size: 42px;
//         color: #e74c3c;
//         margin-bottom: 15px;
//     }

//     .pro-warning-text {
//         font-weight: 600;
//         font-size: 16px;
//         color: #c0392b;
//         margin-bottom: 15px;
//         line-height: 1.6;
//     }

//     .pro-warning-sub {
//         font-size: 14px;
//         color: #555;
//         margin-bottom: 25px;
//         line-height: 1.6;
//     }

//     .pro-checkbox-wrapper {
//         background: #f8f9fa;
//         padding: 18px;
//         border-radius: 8px;
//         border: 1px solid #e0e0e0;
//         font-size: 14px;
//         text-align: left;
//     }

//     .pro-checkbox-label {
//         display: flex;
//         align-items: flex-start;
//         gap: 10px;
//         cursor: pointer;
//     }

//     .pro-checkbox-label i {
//         color: #28a745;
//         margin-right: 6px;
//     }

//     .pro-checkbox-wrapper input {
//         margin-top: 4px;
//         transform: scale(1.1);
//     }

//     .pro-confirm-footer {
//         text-align: right;
//         margin-top: 20px;
//     }

//     .pro-confirm-footer button {
//         margin-left: 12px;
//         min-width: 170px;
//     }

//     #pro-confirm-yes:disabled {
//         opacity: 0.6;
//         cursor: not-allowed;
//     }

//     /* ===================== */
//     /* Mobile Responsive */
//     /* ===================== */

//     @media (max-width: 576px) {

//         .pro-confirm-box {
//             width: 100%;
//             min-height: auto;
//             padding: 25px;
//         }

//         .pro-confirm-header {
//             font-size: 16px;
//         }

//         .pro-warning-text {
//             font-size: 15px;
//         }

//         .pro-confirm-footer {
//             text-align: center;
//         }

//         .pro-confirm-footer button {
//             width: 100%;
//             margin: 8px 0;
//         }
//     }

//     </style>
//     `);
// }


// /* =====================================================
//    DOWNLOAD BUTTON
// ===================================================== */

// let downloadBtn = $(`
// 	<button class="btn btn-primary btn-sm">
// 		Download Budget Import Template
// 	</button>
// `);

// section.find(".button-container").append(downloadBtn);


// /* =====================================================
//    OPEN MODAL ON BUTTON CLICK
// ===================================================== */

// downloadBtn.on("click", function () {

// 	$("#pro-confirm-overlay")
// 		.css("display", "flex")
// 		.data("trigger-btn", $(this));

// 	// reset checkbox
// 	$("#pro-confirm-checkbox").prop("checked", false);
// 	$("#pro-confirm-yes").prop("disabled", true);
// });


// /* =====================================================
//    ENABLE PROCEED BUTTON ONLY AFTER CHECKBOX
// ===================================================== */

// $(document).on("change", "#pro-confirm-checkbox", function () {
// 	$("#pro-confirm-yes").prop("disabled", !this.checked);
// });


// /* =====================================================
//    CLOSE MODAL
// ===================================================== */

// $(document).on("click", "#pro-confirm-no, #pro-confirm-close", function () {
// 	$("#pro-confirm-overlay").hide();
// });


// /* =====================================================
//    CONFIRM & DOWNLOAD
// ===================================================== */

// $(document).on("click", "#pro-confirm-yes", function () {

// 	let btn = $("#pro-confirm-overlay").data("trigger-btn");

// 	$("#pro-confirm-overlay").hide();

// 	if (!btn) return;

// 	btn.prop("disabled", true)
// 	   .html('<i class="fa fa-spinner fa-spin"></i> Downloading...');

// 	window.open(
// 		`/api/method/annual_budget.api.export_reports.download_finance_budget_import_template?user=${encodeURIComponent(userData.email)}`
// 	);

// 	setTimeout(() => {
// 		btn.prop("disabled", false)
// 		   .text("Download Budget Import Template");
// 	}, 3000);
// });


// /* =====================================================
//    CONTINUE YOUR PAGE LOGIC
// ===================================================== */

// let body = section.find(".user-body");

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
// 							<div class="contact-detail">
// 								rakesh.ahuja@azimpremjifoundation.org
// 							</div>
// 							<div class="contact-detail">
// 								+91 7022068106
// 							</div>
// 						</div>

// 						<div class="contact-card">
// 							<div class="contact-name">Saravana G</div>
// 							<div class="contact-detail">
// 								saravana.g@azimpremjifoundation.org
// 							</div>
// 							<div class="contact-detail">
// 								+91 9380861952
// 							</div>
// 						</div>

// 						<div class="contact-card">
// 							<div class="contact-name">Augustin Moses R</div>
// 							<div class="contact-detail">
// 								augustin.moses@azimpremjifoundation.org
// 							</div>
// 							<div class="contact-detail">
// 								+91 8667719594
// 							</div>
// 						</div>

// 						<div class="contact-card">
// 							<div class="contact-name">Mercy Selvanayagi R</div>
// 							<div class="contact-detail">
// 								mercy.selvanayagi@azimpremjifoundation.org
// 							</div>
// 							<div class="contact-detail">
// 								+91 9047828687
// 							</div>
// 						</div>

// 						<div class="contact-card">
// 							<div class="contact-name">Mahaveer Ram P</div>
// 							<div class="contact-detail">
// 								mahaveer.p@azimpremjifoundation.org
// 							</div>
// 							<div class="contact-detail">
// 								+91 8825879412
// 							</div>
// 						</div>
// 					</div>

// 				</div>
// 			`);
// 		}

// 		/* ===============================
// 		   TABLE
// 		=============================== */

// 		let tableHTML = `
// 			<h4 class="table-title">
// 				Allocated Units & Cost Centers
// 			</h4>

// 			<div class="table-wrapper">
// 				<table class="mis-table">
// 					<thead>
// 						<tr>
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

// 		userData.rows.forEach(r => {
// 			tableHTML += `
// 				<tr>
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
// 		0% { opacity: 1; }
// 		50% { opacity: 0.5; }
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

// 	@media (max-width: 768px) {
// 		.user-header {
// 			flex-direction: column;
// 			align-items: flex-start;
// 			gap: 10px;
// 		}
// 	}
// 	`;

// 	document.head.appendChild(style);
// }



frappe.pages['import-template'].on_page_load = function(wrapper) {

	let page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Budget Import Template',
		single_column: true
	});

	let $container = $(wrapper).find('.layout-main-section');
	$container.addClass("budget-import-wrapper");

	inject_styles();

	$container.html(`<div class="loading-state">Loading Data...</div>`);

	frappe.call({
		method: "annual_budget.api.filter_options.get_user_mappings",
		callback: function(r) {

			if (!r.message || r.message.length === 0) {
				$container.html(`<div class="empty-state">No Data Found</div>`);
				return;
			}

			render_content($container, r.message);
		}
	});
};


/* =========================================
   RENDER CONTENT
========================================= */

function render_content(container, data) {

	let grouped = {};

	// FIX: Safely read roles once, outside the loop
	let roles = (frappe.user_roles && Array.isArray(frappe.user_roles))
		? frappe.user_roles
		: [];

	let isFinanceCoordinator = roles.includes("Finance Unit Coordinator");
	let isSystemManager      = roles.includes("System Manager");

	data.forEach(row => {
		let key = row.user; // always use email as unique key

		if (!grouped[key]) {
			grouped[key] = {
				user_fullname: row.user_fullname || "",
				email: row.user,
				rows: []
			};
		}

		grouped[key].rows.push(row);
	});

	container.empty();

	/* =====================================================
	   GLOBAL SEARCH BAR  (rendered once, above all sections)
	===================================================== */
	let $searchWrap = $(`
		<div class="global-search-wrap">
			<div class="global-search-inner">
				<i class="fa fa-search global-search-icon"></i>
				<input
					type="text"
					id="global-table-search"
					class="global-search-input"
					placeholder="Search across all units, cost centers, locations…"
					autocomplete="off"
				/>
				<span id="global-search-clear" class="global-search-clear" title="Clear search">&times;</span>
			</div>
			<div id="global-search-count" class="global-search-count"></div>
		</div>
	`);
	container.append($searchWrap);

	/* =====================================================
	   CONFIRM DOWNLOAD MODAL  (appended once to body)
	===================================================== */
	if (!$("#pro-confirm-overlay").length) {

		$("body").append(`
		<div id="pro-confirm-overlay">
			<div class="pro-confirm-box">

				<div class="pro-confirm-header">
					<div class="pro-confirm-title">
						<i class="fa fa-download"></i> Confirm Download
					</div>
					<span id="pro-confirm-close">&times;</span>
				</div>

				<div class="pro-confirm-body">

					<div class="pro-warning-icon">
						<i class="fa fa-exclamation-triangle"></i>
					</div>

					<div class="pro-warning-text">
						We request that you carefully review and validate all allocated Units, Cost Centers, and Location Codes before downloading the Budget Import Template.
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
					<button id="pro-confirm-yes"
							class="btn btn-primary btn-sm"
							disabled>
						<i class="fa fa-download"></i> Proceed to Download
					</button>
				</div>

			</div>
		</div>
		`);
	}

	/* =====================================================
	   MODAL EVENT LISTENERS  (registered once, outside loop)
	===================================================== */

	// Enable/disable Proceed button based on checkbox
	$(document).off("change.budgetModal", "#pro-confirm-checkbox")
		.on("change.budgetModal", "#pro-confirm-checkbox", function () {
			$("#pro-confirm-yes").prop("disabled", !this.checked);
		});

	// Close modal
	$(document).off("click.budgetModal", "#pro-confirm-no, #pro-confirm-close")
		.on("click.budgetModal", "#pro-confirm-no, #pro-confirm-close", function () {
			$("#pro-confirm-overlay").hide();
		});

	// Close on overlay background click
	$(document).off("click.budgetModalBg", "#pro-confirm-overlay")
		.on("click.budgetModalBg", "#pro-confirm-overlay", function (e) {
			if ($(e.target).is("#pro-confirm-overlay")) {
				$("#pro-confirm-overlay").hide();
			}
		});

	// Confirm & download
	$(document).off("click.budgetModalYes", "#pro-confirm-yes")
		.on("click.budgetModalYes", "#pro-confirm-yes", function () {

			let btn      = $("#pro-confirm-overlay").data("trigger-btn");
			let userEmail = $("#pro-confirm-overlay").data("user-email");

			$("#pro-confirm-overlay").hide();

			if (!btn || !userEmail) return;

			btn.prop("disabled", true)
			   .html('<i class="fa fa-spinner fa-spin"></i> Downloading...');

			window.open(
				`/api/method/annual_budget.api.export_reports.download_finance_budget_import_template?user=${encodeURIComponent(userEmail)}`
			);

			setTimeout(() => {
				btn.prop("disabled", false)
				   .text("Download Budget Import Template");
			}, 3000);
		});


	/* =====================================================
	   BUILD USER SECTIONS
	===================================================== */

	Object.keys(grouped).forEach(user => {

		let userData = grouped[user];
		let displayName = userData.user_fullname || userData.email;

		/* ===============================
		   USER SECTION
		=============================== */
		let section = $(`
			<div class="user-section" data-user="${user}">

				<div class="user-header">
					<div>
						<div class="user-name">${displayName}</div>
						<div class="user-email">${userData.email}</div>
					</div>

					<div class="button-container"></div>
				</div>

				<div class="user-body"></div>

			</div>
		`);

		container.append(section);

		/* =====================================================
		   DOWNLOAD BUTTON
		===================================================== */
		let downloadBtn = $(`
			<button class="btn btn-primary btn-sm">
				<i class="fa fa-download"></i> Download Budget Import Template
			</button>
		`);

		section.find(".button-container").append(downloadBtn);

		if (isFinanceCoordinator && !isSystemManager) {

			// Finance Coordinator: open confirmation modal first
			downloadBtn.on("click", function () {
				$("#pro-confirm-overlay")
					.css("display", "flex")
					.data("trigger-btn", $(this))
					.data("user-email", userData.email);

				// Reset modal state
				$("#pro-confirm-checkbox").prop("checked", false);
				$("#pro-confirm-yes").prop("disabled", true);
			});

		} else {

			// All other roles: direct download, no modal
			downloadBtn.on("click", function () {
				let btn = $(this);

				btn.prop("disabled", true)
				   .html('<i class="fa fa-spinner fa-spin"></i> Downloading...');

				window.open(
					`/api/method/annual_budget.api.export_reports.download_finance_budget_import_template?user=${encodeURIComponent(userData.email)}`
				);

				setTimeout(() => {
					btn.prop("disabled", false)
					   .html('<i class="fa fa-download"></i> Download Budget Import Template');
				}, 3000);
			});
		}


		let body = section.find(".user-body");

		/* ===============================
		   IMPORTANT NOTE + CONTACT CARDS
		=============================== */
		if (isFinanceCoordinator && !isSystemManager) {

			body.append(`
				<div class="note-warning">

					<div class="note-header">
						<span class="note-badge blinking-badge">IMPORTANT</span>
						Before importing, please carefully cross-verify the allocated Units and Cost Centers listed below.
						If you notice any discrepancies, contact the support team immediately.
						Do not proceed with the import until all details are verified and confirmed.
					</div>

					<div class="contact-wrapper">
						<div class="contact-card">
							<div class="contact-name">Rakesh Ahuja</div>
							<div class="contact-detail">rakesh.ahuja@azimpremjifoundation.org</div>
							<div class="contact-detail">+91 7022068106</div>
						</div>

						<div class="contact-card">
							<div class="contact-name">Saravana G</div>
							<div class="contact-detail">saravana.g@azimpremjifoundation.org</div>
							<div class="contact-detail">+91 9380861952</div>
						</div>

						<div class="contact-card">
							<div class="contact-name">Augustin Moses R</div>
							<div class="contact-detail">augustin.moses@azimpremjifoundation.org</div>
							<div class="contact-detail">+91 8667719594</div>
						</div>

						<div class="contact-card">
							<div class="contact-name">Mercy Selvanayagi R</div>
							<div class="contact-detail">mercy.selvanayagi@azimpremjifoundation.org</div>
							<div class="contact-detail">+91 9047828687</div>
						</div>

						<div class="contact-card">
							<div class="contact-name">Mahaveer Ram P</div>
							<div class="contact-detail">mahaveer.p@azimpremjifoundation.org</div>
							<div class="contact-detail">+91 8825879412</div>
						</div>
					</div>

				</div>
			`);
		}

		/* ===============================
		   TABLE  (with Sl. No. column)
		=============================== */
		let tableHTML = `
			<h4 class="table-title">
				Allocated Units &amp; Cost Centers
			</h4>

			<div class="table-wrapper">
				<table class="mis-table">
					<thead>
						<tr>
							<th>Sl. No.</th>
							<th>Unit</th>
							<th>Unit Description</th>
							<th>Cost Center</th>
							<th>Cost Center Description</th>
							<th>Location Code</th>
							<th>Location Description</th>
						</tr>
					</thead>
					<tbody>
		`;

		userData.rows.forEach((r, idx) => {
			tableHTML += `
				<tr>
					<td>${idx + 1}</td>
					<td>${r.unit || ""}</td>
					<td>${r.unit_description || ""}</td>
					<td>${r.cost_center || ""}</td>
					<td>${r.cost_center_description || ""}</td>
					<td>${r.location_code || ""}</td>
					<td>${r.location_description || ""}</td>
				</tr>
			`;
		});

		tableHTML += `
					</tbody>
				</table>
			</div>
		`;

		body.append(tableHTML);
	});


	/* =====================================================
	   GLOBAL SEARCH LOGIC
	===================================================== */

	function run_global_search(query) {

		let q = (query || "").trim().toLowerCase();
		let totalVisible = 0;

		$(".mis-table").each(function () {
			let $table   = $(this);
			let $rows    = $table.find("tbody tr");
			let sectionVisible = 0;

			$rows.each(function () {
				let $row = $(this);
				let text = $row.text().toLowerCase();
				let match = !q || text.indexOf(q) !== -1;
				$row.toggle(match);
				if (match) {
					sectionVisible++;
					totalVisible++;
				}
			});

			// Show/hide section title & user block based on matches
			let $section = $table.closest(".user-section");
			$section.toggle(sectionVisible > 0 || !q);
		});

		// Update count display
		let $count = $("#global-search-count");
		if (q) {
			$count.text(`${totalVisible} row${totalVisible !== 1 ? "s" : ""} matched`).show();
		} else {
			$count.hide();
		}

		// Show/hide clear button
		$("#global-search-clear").toggle(q.length > 0);
	}

	// Live search on input
	$(document).off("input.globalSearch", "#global-table-search")
		.on("input.globalSearch", "#global-table-search", function () {
			run_global_search($(this).val());
		});

	// Clear button
	$(document).off("click.globalSearchClear", "#global-search-clear")
		.on("click.globalSearchClear", "#global-search-clear", function () {
			$("#global-table-search").val("").trigger("input");
		});

	// Hide clear button initially
	$("#global-search-clear").hide();
	$("#global-search-count").hide();
}


/* =========================================
   STYLES
========================================= */

function inject_styles() {

	if (document.getElementById("allocation-style")) return;

	const style = document.createElement("style");
	style.id = "allocation-style";

	style.innerHTML = `

	/* PAGE WHITE BACKGROUND */
	.budget-import-wrapper {
		padding: 25px;
		background: #ffffff;
		min-height: 100vh;
	}

	.loading-state,
	.empty-state {
		text-align: center;
		padding: 50px;
		font-weight: 600;
		color: #0076B6;
	}

	/* ==============================
	   GLOBAL SEARCH
	============================== */
	.global-search-wrap {
		margin-bottom: 30px;
	}

	.global-search-inner {
		position: relative;
		display: flex;
		align-items: center;
		max-width: 520px;
	}

	.global-search-icon {
		position: absolute;
		left: 12px;
		color: #0076B6;
		font-size: 14px;
		pointer-events: none;
	}

	.global-search-input {
		width: 100%;
		padding: 10px 36px 10px 36px;
		border: 1.5px solid #c8dff0;
		border-radius: 8px;
		font-size: 14px;
		color: #222;
		outline: none;
		transition: border-color 0.2s, box-shadow 0.2s;
		background: #f4f9fd;
	}

	.global-search-input:focus {
		border-color: #0076B6;
		box-shadow: 0 0 0 3px rgba(0,118,182,0.12);
		background: #fff;
	}

	.global-search-clear {
		position: absolute;
		right: 10px;
		font-size: 18px;
		color: #999;
		cursor: pointer;
		line-height: 1;
		transition: color 0.15s;
	}

	.global-search-clear:hover {
		color: #c0392b;
	}

	.global-search-count {
		margin-top: 6px;
		font-size: 12px;
		color: #0076B6;
		font-weight: 600;
		padding-left: 2px;
	}

	/* ============================== */

	.user-section {
		margin-bottom: 50px;
	}

	.user-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 12px;
		border-bottom: 2px solid #0076B6;
		margin-bottom: 18px;
	}

	.user-name {
		font-size: 18px;
		font-weight: 700;
		color: #003B63;
	}

	.user-email {
		font-size: 13px;
		color: #555;
	}

	/* IMPORTANT NOTE */
	.note-warning {
		background: #fff8e1;
		border-left: 5px solid #f4b400;
		padding: 16px;
		border-radius: 6px;
		margin-bottom: 25px;
	}

	.note-header {
		font-size: 14px;
		color: #5c4b00;
		margin-bottom: 15px;
	}

	.note-badge {
		background: #f4b400;
		color: #fff;
		font-size: 11px;
		font-weight: 700;
		padding: 3px 8px;
		border-radius: 20px;
		margin-right: 8px;
	}

	.blinking-badge {
		animation: softBlink 1.5s ease-in-out infinite;
	}

	@keyframes softBlink {
		0%   { opacity: 1; }
		50%  { opacity: 0.5; }
		100% { opacity: 1; }
	}

	/* CONTACT CARDS */
	.contact-wrapper {
		display: flex;
		gap: 15px;
		flex-wrap: wrap;
	}

	.contact-card {
		background: #ffffff;
		border: 1px solid #e6e6e6;
		border-radius: 8px;
		padding: 12px 15px;
		min-width: 230px;
		box-shadow: 0 3px 10px rgba(0,0,0,0.04);
	}

	.contact-name {
		font-weight: 600;
		color: #333;
		margin-bottom: 5px;
	}

	.contact-detail {
		font-size: 13px;
		color: #555;
	}

	/* TABLE */
	.table-title {
		font-size: 15px;
		font-weight: 600;
		color: #003B63;
		margin-bottom: 12px;
	}

	.table-wrapper {
		overflow-x: auto;
	}

	.mis-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
		border: 1px solid #dcdcdc;
	}

	.mis-table th {
		background: #0076B6;
		color: #ffffff;
		font-weight: 700;
		padding: 8px;
		text-align: center;
	}

	.mis-table td {
		padding: 8px;
		border: 1px solid #e0e0e0;
		text-align: center;
	}

	.mis-table tr:nth-child(even) {
		background: #f9f9f9;
	}

	.mis-table tr:hover {
		background: #eef6fb;
	}

	/* MODAL STYLES */
	#pro-confirm-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		display: none;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		backdrop-filter: blur(4px);
		padding: 15px;
	}

	.pro-confirm-box {
		background: #ffffff;
		width: 640px;
		max-width: 100%;
		min-height: 360px;
		border-radius: 12px;
		box-shadow: 0 25px 60px rgba(0,0,0,0.25);
		padding: 35px;
		animation: scaleIn 0.25s ease;
	}

	@keyframes scaleIn {
		from { transform: scale(0.95); opacity: 0; }
		to   { transform: scale(1);    opacity: 1; }
	}

	.pro-confirm-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 600;
		font-size: 18px;
		margin-bottom: 25px;
	}

	.pro-confirm-title i {
		margin-right: 8px;
		color: #007bff;
	}

	#pro-confirm-close {
		cursor: pointer;
		font-size: 22px;
		color: #888;
		transition: 0.2s;
	}

	#pro-confirm-close:hover {
		color: #000;
	}

	.pro-confirm-body {
		text-align: center;
		margin-bottom: 25px;
	}

	.pro-warning-icon {
		font-size: 42px;
		color: #e74c3c;
		margin-bottom: 15px;
	}

	.pro-warning-text {
		font-weight: 600;
		font-size: 16px;
		color: #c0392b;
		margin-bottom: 15px;
		line-height: 1.6;
	}

	.pro-warning-sub {
		font-size: 14px;
		color: #555;
		margin-bottom: 25px;
		line-height: 1.6;
	}

	.pro-checkbox-wrapper {
		background: #f8f9fa;
		padding: 18px;
		border-radius: 8px;
		border: 1px solid #e0e0e0;
		font-size: 14px;
		text-align: left;
	}

	.pro-checkbox-label {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		cursor: pointer;
	}

	.pro-checkbox-label i {
		color: #28a745;
		margin-right: 6px;
	}

	.pro-checkbox-wrapper input {
		margin-top: 4px;
		transform: scale(1.1);
	}

	.pro-confirm-footer {
		text-align: right;
		margin-top: 20px;
	}

	.pro-confirm-footer button {
		margin-left: 12px;
		min-width: 170px;
	}

	#pro-confirm-yes:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* RESPONSIVE */
	@media (max-width: 768px) {
		.user-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}
	}

	@media (max-width: 576px) {
		.global-search-inner {
			max-width: 100%;
		}

		.pro-confirm-box {
			width: 100%;
			min-height: auto;
			padding: 25px;
		}

		.pro-confirm-header {
			font-size: 16px;
		}

		.pro-warning-text {
			font-size: 15px;
		}

		.pro-confirm-footer {
			text-align: center;
		}

		.pro-confirm-footer button {
			width: 100%;
			margin: 8px 0;
		}
	}
	`;

	document.head.appendChild(style);
}