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
	let roles = frappe.user_roles || [];

	data.forEach(row => {
		let name = row.full_name || row.user;

		if (!grouped[name]) {
			grouped[name] = {
				email: row.user,
				rows: []
			};
		}

		grouped[name].rows.push(row);
	});

	container.empty();

	Object.keys(grouped).forEach(user => {

		let userData = grouped[user];

		let isFinanceCoordinator = roles.includes("Finance Unit Coordinator");
		let isSystemManager = roles.includes("System Manager");

		/* ===============================
		   USER SECTION
		=============================== */

		let section = $(`
			<div class="user-section">

				<div class="user-header">
					<div>
						<div class="user-name">${user}</div>
						<div class="user-email">${userData.email}</div>
					</div>

					<div class="button-container"></div>
				</div>

				<div class="user-body"></div>

			</div>
		`);

		container.append(section);

		/* ===============================
		   FRAPPE STYLE BUTTON
		=============================== */

		let downloadBtn = $(`<button class="btn btn-primary btn-sm">
			Download Budget Import Template
		</button>`);

		section.find(".button-container").append(downloadBtn);

		downloadBtn.on("click", function() {

			let btn = $(this);
			btn.prop("disabled", true).text("Downloading...");

			window.open(
				`/api/method/annual_budget.api.export_reports.download_finance_budget_import_template?user=${encodeURIComponent(userData.email)}`
			);

			setTimeout(() => {
				btn.prop("disabled", false)
				   .text("Download Budget Import Template");
			}, 3000);
		});

		let body = section.find(".user-body");

		/* ===============================
		   IMPORTANT NOTE + CONTACT CARDS
		=============================== */

		if (isFinanceCoordinator && !isSystemManager) {

			body.append(`
				<div class="note-warning">

					<div class="note-header">
						<span class="note-badge blinking-badge">IMPORTANT</span>
						Kindly review the allocated Units and Cost Centers listed below.
						If you notice any discrepancies, please contact the support team.
					</div>

					<div class="contact-wrapper">
						<div class="contact-card">
							<div class="contact-name">Rakesh Ahuja</div>
							<div class="contact-detail">
								rakesh.ahuja@azimpremjifoundation.org
							</div>
							<div class="contact-detail">
								+91 7022068106
							</div>
						</div>

						<div class="contact-card">
							<div class="contact-name">Saravana G</div>
							<div class="contact-detail">
								saravana.g@azimpremjifoundation.org
							</div>
							<div class="contact-detail">
								+91 9380861952
							</div>
						</div>

						<div class="contact-card">
							<div class="contact-name">Augustin Moses R</div>
							<div class="contact-detail">
								augustin.moses@azimpremjifoundation.org
							</div>
							<div class="contact-detail">
								+91 8667719594
							</div>
						</div>

						<div class="contact-card">
							<div class="contact-name">Mercy Selvanayagi R</div>
							<div class="contact-detail">
								mercy.selvanayagi@azimpremjifoundation.org
							</div>
							<div class="contact-detail">
								+91 9047828687
							</div>
						</div>


						<div class="contact-card">
							<div class="contact-name">Mahaveer Ram P</div>
							<div class="contact-detail">
								mahaveer.p@azimpremjifoundation.org
							</div>
							<div class="contact-detail">
								+91 8825879412
							</div>
						</div>
					</div>

				</div>
			`);
		}

		/* ===============================
		   TABLE
		=============================== */

		let tableHTML = `
			<h4 class="table-title">
				Allocated Units & Cost Centers
			</h4>

			<div class="table-wrapper">
				<table class="mis-table">
					<thead>
						<tr>
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

		userData.rows.forEach(r => {
			tableHTML += `
				<tr>
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
		0% { opacity: 1; }
		50% { opacity: 0.5; }
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

	@media (max-width: 768px) {
		.user-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}
	}
	`;

	document.head.appendChild(style);
}