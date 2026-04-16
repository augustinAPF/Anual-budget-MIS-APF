// frappe.pages['number-cards'].on_page_load = function (wrapper) {

//     var page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Budgets Overview',
//         single_column: true
//     });

//     /* =====================================================
//        Inject Clean Uniform CSS
//     ===================================================== */
//     $(`
//         <style>

//         .page-content {
//             background:#f5f6f8;
//         }

//         .card-row{
//             display:grid;
//             grid-template-columns: repeat(4, 1fr);
//             gap:16px;
//             margin:20px;
//         }

//         .number-card{
//             background:#ffffff;
//             border:none;
//             border-radius:10px;
//             padding:18px;
//             box-shadow:0 3px 10px rgba(0,0,0,.06);
//             transition:.2s ease;
//         }

//         .number-card:hover{
//             transform:translateY(-3px);
//             box-shadow:0 6px 18px rgba(0,0,0,.12);
//         }

//         .number-title{
//             font-size:13px;
//             font-weight:600;
//             text-transform:uppercase;
//             margin-bottom:8px;
//             letter-spacing:.5px;
//             color:#000;
//         }

//         .number-value{
//             font-size:22px;
//             font-weight:700;
//             color:#000;
//         }

//         /* =============================
//            RESPONSIVE
//         ============================= */

//         @media (max-width:1024px){
//             .card-row{
//                 grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
//             }
//         }

//         @media (max-width:768px){
//             .card-row{
//                 grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
//                 gap:12px;
//                 margin:12px;
//             }

//             .number-value{
//                 font-size:18px;
//             }
//         }

//         @media (max-width:480px){
//             .card-row{
//                 grid-template-columns:1fr 1fr;
//             }

//             .number-value{
//                 font-size:16px;
//             }
//         }

//         </style>
//     `).appendTo(page.body);


//     const $container = $('<div class="card-row"></div>');
//     $(page.body).append($container);


//     function formatINR(value) {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             minimumFractionDigits: 2
//         }).format(value || 0);
//     }


//     function renderCards(apiResponse) {

//         $container.empty();

//         /* 🔹 Grand Total (same design as others) */
//         $container.append(`
//             <div class="number-card">
//                 <div class="number-title">Grand Total</div>
//                 <div class="number-value">
//                     ${formatINR(apiResponse.grand_total)}
//                 </div>
//             </div>
//         `);

//         /* 🔹 Other Cards */
//         (apiResponse.number_cards || []).forEach(card => {

//             $container.append(`
//                 <div class="number-card">
//                     <div class="number-title">
//                         ${card.label}
//                     </div>
//                     <div class="number-value">
//                         ${formatINR(card.total_budget)}
//                     </div>
//                 </div>
//             `);
//         });
//     }


//     function loadData() {

//         frappe.call({
//             method: "annual_budget.api.phase_sheet.get_number_card_totals",
//             args: {
//                 financial_year: "2025-26"
//             },
//             callback: function (r) {
//                 if (!r.message) return;
//                 renderCards(r.message);
//             }
//         });
//     }

//     loadData();
// };


frappe.pages['number-cards'].on_page_load = function (wrapper) {

    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Budgets Overview',
        single_column: true
    });

    $(`<style>
        .page-content { background: #f5f6f8; }

        .nc-section-label {
            font-size: 11px;
            color: #6c7680;
            text-transform: uppercase;
            letter-spacing: .6px;
            font-weight: 600;
            margin: 24px 20px 10px;
        }

        .nc-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 14px;
            margin: 0 20px 8px;
        }

        .nc-card {
            background: #ffffff;
            border: 1px solid #e8eaed;
            border-radius: 10px;
            padding: 14px 16px;
            transition: .18s ease;
        }

        .nc-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(0,0,0,.08);
        }

        .nc-card.hero {
            background: #f0f4ff;
            border-color: #c7d4f8;
        }

        .nc-badge {
            display: inline-block;
            font-size: 11px;
            font-weight: 600;
            padding: 2px 8px;
            border-radius: 6px;
            background: #e0e8ff;
            color: #2d4db5;
            margin-bottom: 8px;
        }

        .nc-name {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            color: #374151;
            letter-spacing: .4px;
            margin-bottom: 10px;
        }

        .nc-divider {
            border: none;
            border-top: 1px solid #f0f0f0;
            margin: 8px 0;
        }

        .nc-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            padding: 5px 0;
            border-bottom: 1px solid #f5f5f5;
        }

        .nc-row:last-child { border-bottom: none; }

        .nc-row-label {
            font-size: 11px;
            color: #9ca3af;
            font-weight: 500;
        }

        .nc-row-val {
            font-size: 13px;
            font-weight: 700;
            color: #1a1d23;
        }

        .nc-row-val.pos { color: #16a34a; }
        .nc-row-val.neg { color: #dc2626; }

        .nc-loading {
            text-align: center;
            padding: 60px 20px;
            color: #9ca3af;
            font-size: 14px;
        }

        @media (max-width: 768px) {
            .nc-grid { grid-template-columns: repeat(2, 1fr); margin: 0 12px 8px; }
        }

        @media (max-width: 480px) {
            .nc-grid { grid-template-columns: 1fr 1fr; }
        }
    `).appendTo(page.body);

    $(page.body).append('<div id="nc-content"><p class="nc-loading">Loading budget data…</p></div>');

    /* ── helpers ── */
    function fmtINR(n) {
        const abs = Math.abs(n || 0);
        if (abs >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
        if (abs >= 1e5) return '₹' + (n / 1e5).toFixed(2) + ' L';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency', currency: 'INR', minimumFractionDigits: 0
        }).format(Math.round(n || 0));
    }

    function makeCard(label, budget, actual, hero, badge) {
        const variance = actual - budget;
        const pct = budget ? (variance / Math.abs(budget) * 100) : 0;
        const cls = variance >= 0 ? 'neg' : 'pos';   // over budget = red, under = green
        const sign = variance >= 0 ? '+' : '';

        return `
        <div class="nc-card${hero ? ' hero' : ''}">
            ${badge ? `<div class="nc-badge">${badge}</div>` : ''}
            <div class="nc-name">${label}</div>
            <hr class="nc-divider">
            <div class="nc-row">
                <span class="nc-row-label">Budget</span>
                <span class="nc-row-val">${fmtINR(budget)}</span>
            </div>
            <div class="nc-row">
                <span class="nc-row-label">Actuals</span>
                <span class="nc-row-val">${fmtINR(actual)}</span>
            </div>
            <div class="nc-row">
                <span class="nc-row-label">Variance</span>
                <span class="nc-row-val ${cls}">
                    ${sign}${fmtINR(variance)} (${sign}${pct.toFixed(1)}%)
                </span>
            </div>
        </div>`;
    }

    function renderCards(messages) {
        const consolidated = messages.find(u => u.settings_doc === 'CONSOLIDATED');
        const units = messages
            .filter(u => u.settings_doc !== 'CONSOLIDATED')
            .sort((a, b) => a.sequence_id - b.sequence_id);

        let html = '';

        /* consolidated */
        if (consolidated) {
            const overall = consolidated.actuals.find(a => a.name === 'OVERALL GRAND TOTAL') || {};
            const capex   = consolidated.actuals.find(a => a.name === 'CAPEX TOTAL') || {};
            const opex    = consolidated.actuals.find(a => a.name === 'OPEX TOTAL') || {};

            html += `<div class="nc-section-label">Consolidated</div>`;
            html += `<div class="nc-grid">`;
            html += makeCard('Overall Grand Total', overall.ytd, overall.total_posted_amt_ytd, true, 'All Units');
            html += makeCard('Capex Total',  capex.ytd,  capex.total_posted_amt_ytd,  false);
            html += makeCard('Opex Total',   opex.ytd,   opex.total_posted_amt_ytd,   false);
            html += `</div>`;
        }

        /* units */
        if (units.length) {
            html += `<div class="nc-section-label">Units</div>`;
            html += `<div class="nc-grid">`;
            units.forEach(function (u) {
                const gt = (u.actuals || []).find(a => a.name === 'GRAND TOTAL') || {};
                html += makeCard(
                    (u.label || '').trim(),
                    gt.ytd || 0,
                    gt.total_posted_amt_ytd || 0,
                    false
                );
            });
            html += `</div>`;
        }

        $('#nc-content').html(html || '<p class="nc-loading">No data found.</p>');
    }

    /* ── filters ── */
    const fyField = page.add_field({
        fieldtype: 'Link',
        fieldname: 'financial_year',
        options: 'Fiscal Year',
        label: 'Financial Year',
        default: '2025-26',
        reqd: 1,
        change: loadData
    });

    const monthField = page.add_field({
        fieldtype: 'Select',
        fieldname: 'month',
        label: 'Month',
        options: [
            '', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December',
            'January', 'February', 'March'
        ].join('\n'),
        default: 'March',
        change: loadData
    });

    /* ── API ── */
    function loadData() {
        const fy    = fyField.get_value();
        const month = monthField.get_value() || 'March';

        if (!fy) return;

        $('#nc-content').html('<p class="nc-loading">Loading…</p>');

        frappe.call({
            method: 'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan',
            args: {
                financial_year: fy,
                month: month,
                table_name_filter: 'Number card'
            },
            callback: function (r) {
                if (r && r.message) {
                    renderCards(r.message);
                } else {
                    $('#nc-content').html('<p class="nc-loading">No data returned.</p>');
                }
            },
            error: function () {
                $('#nc-content').html(
                    '<p class="nc-loading" style="color:#dc2626;">Failed to load. Check console for details.</p>'
                );
            }
        });
    }

    loadData();
};