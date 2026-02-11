frappe.pages['number-cards'].on_page_load = function (wrapper) {

    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Budgets Overview',
        single_column: true
    });

    /* =====================================================
       Inject Clean Uniform CSS
    ===================================================== */
    $(`
        <style>

        .page-content {
            background:#f5f6f8;
        }

        .card-row{
            display:grid;
            grid-template-columns: repeat(4, 1fr);
            gap:16px;
            margin:20px;
        }

        .number-card{
            background:#ffffff;
            border:none;
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
           RESPONSIVE
        ============================= */

        @media (max-width:1024px){
            .card-row{
                grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
            }
        }

        @media (max-width:768px){
            .card-row{
                grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
                gap:12px;
                margin:12px;
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


    const $container = $('<div class="card-row"></div>');
    $(page.body).append($container);


    function formatINR(value) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(value || 0);
    }


    function renderCards(apiResponse) {

        $container.empty();

        /* 🔹 Grand Total (same design as others) */
        $container.append(`
            <div class="number-card">
                <div class="number-title">Grand Total</div>
                <div class="number-value">
                    ${formatINR(apiResponse.grand_total)}
                </div>
            </div>
        `);

        /* 🔹 Other Cards */
        (apiResponse.number_cards || []).forEach(card => {

            $container.append(`
                <div class="number-card">
                    <div class="number-title">
                        ${card.label}
                    </div>
                    <div class="number-value">
                        ${formatINR(card.total_budget)}
                    </div>
                </div>
            `);
        });
    }


    function loadData() {

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

    loadData();
};
