frappe.pages['budget-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Dashboard',
		single_column: true
	});

    /* ── STYLES ── */
    $(`<style>
        .bd-wrap { padding: 0; box-sizing: border-box; width: 100%; max-width: 100%; overflow-x: hidden; }

        .bd-filter-bar { display: flex; align-items: flex-end; gap: 20px; padding: 16px 20px 0; flex-wrap: wrap; }
        .bd-filter { width: 200px; }

        #bd-tab-nav { list-style: none; margin: 18px 0 0; padding: 0 20px; display: flex; flex-wrap: wrap; gap: 0; border-bottom: 2px solid #d1d5db; }
        #bd-tab-nav li { margin: 0; padding: 0; }
        #bd-tab-nav .bd-tab { display: block; font-size: 13px; font-weight: 400; color: #6b7280; padding: 10px 16px 11px; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; white-space: nowrap; text-decoration: none; transition: color .15s, border-color .15s; user-select: none; }
        #bd-tab-nav .bd-tab:hover { color: #111; }
        #bd-tab-nav .bd-tab.active { color: #111827; font-weight: 700; border-bottom-color: #111827; }

        .bd-panel { display: none; padding: 16px 20px; max-width: 100%; overflow-x: hidden; }
        .bd-panel.active { display: block; }

        .bd-banner-strip { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 16px; }
        .bd-banner-card { background: #fff; border: 1px solid #e8edf3; border-radius: 12px; padding: 14px 16px; border-left: 4px solid #378ADD; min-width: 0; transition: box-shadow .2s; }
        .bd-banner-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.08); }
        .bd-banner-card.blue   { border-left-color: #1a56db; }
        .bd-banner-card.green  { border-left-color: #0e9f6e; }
        .bd-banner-card.orange { border-left-color: #ff5a1f; }
        .bd-banner-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .6px; color: #888; margin-bottom: 5px; }
        .bd-banner-value { font-size: 22px; font-weight: 700; color: #111; line-height: 1.2; }
        .bd-banner-sub   { font-size: 11px; color: #aaa; margin-top: 3px; }

        .bd-section-title { display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #374151; margin: 0 0 12px; }
        .bd-section-title::before { content:''; display:inline-block; width:3px; height:14px; border-radius:2px; background:#378ADD; flex-shrink:0; }
        .bd-section-title.sub::before { background:#7F77DD; }
        .bd-section-title::after { content:''; flex:1; height:1px; background:#e8edf3; }

        .bd-cards { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 10px; }
        .bd-card { background: #fff; border: 1px solid #e8edf3; border-radius: 12px; padding: 14px 16px; border-left: 4px solid #378ADD; min-width: 0; transition: box-shadow .2s; }
        .bd-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.08); }
        .bd-card-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; color: #888; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bd-card-value { font-size: 15px; font-weight: 700; color: #111; line-height: 1.3; word-break: break-all; overflow-wrap: anywhere; }
        .bd-card-sub { font-size: 11px; color: #aaa; margin-top: 3px; }

        .bd-bottom { display: grid; grid-template-columns: 1fr minmax(0,400px); gap: 14px; align-items: start; margin-top: 16px; }
        .bd-chart-box { background: #fff; border: 1px solid #e8edf3; border-radius: 12px; padding: 16px 18px; min-width: 0; }
        .bd-chart-title { font-size: 13px; font-weight: 600; color: #111; margin: 0 0 2px; }
        .bd-chart-sub   { font-size: 12px; color: #aaa; margin: 0 0 14px; }

        .bd-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 9px; }
        .bd-bar-label { font-size: 13px; font-weight: 600; color: #222; width: 170px; min-width: 170px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bd-bar-track { flex: 1; height: 22px; background: #f0f2f5; border-radius: 5px; overflow: hidden; }
        .bd-bar-fill  { height: 100%; border-radius: 5px; transition: width .5s ease; }
        .bd-bar-val   { font-size: 12px; font-weight: 700; color: #222; width: 72px; min-width: 72px; white-space: nowrap; }
        .bd-bar-divider { border: none; border-top: 1px dashed #e0e4ea; margin: 6px 0 10px; }
        .bd-bar-section-label { font-size: 10px; font-weight: 700; color: #bbb; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 8px; }

        .bd-legend { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .bd-legend-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #555; }
        .bd-legend-dot  { width: 9px; height: 9px; border-radius: 2px; flex-shrink: 0; }

        .bd-donut-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); text-align: center; pointer-events: none; }
        .bd-donut-center-val { font-size: 19px; font-weight: 700; color: #111; line-height: 1.1; }
        .bd-donut-center-lbl { font-size: 10px; color: #888; margin-top: 2px; }

        .bd-wp-grid { display: grid; grid-template-columns: 1fr minmax(0,280px); gap: 16px; align-items: start; }
        .bd-wp-pie-box { min-width: 0; }
        .bd-wp-pie-total-box { text-align: center; margin-top: 16px; padding-top: 12px; border-top: 1px solid #f0f2f5; }
        .bd-wp-pie-total-label { font-size: 10px; font-weight: 700; letter-spacing: .8px; color: #aaa; text-transform: uppercase; margin-bottom: 4px; }
        .bd-wp-pie-total-val   { font-size: 26px; font-weight: 700; color: #111; line-height: 1.1; }
        .bd-wp-summary { display: flex; flex-direction: column; gap: 12px; }
        .bd-wp-stat-card { cursor: default; }
        .bd-wp-two-col-row { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 14px; margin-top: 16px; }

        #global-loader.loader-overlay { position: fixed; top:0; left:0; right:0; bottom:0; background: rgba(18,18,18,.92); backdrop-filter: blur(6px); display: none; z-index: 999999; align-items: center; justify-content: center; }
        .loader-box { display:flex; flex-direction:column; align-items:center; gap:14px; }
        .loader-logo { width:90px; height:90px; border-radius:50%; background:linear-gradient(145deg,#fff,#eaeaea); padding:14px; object-fit:contain; box-shadow:0 10px 30px rgba(0,0,0,.35); animation:lp 1.6s infinite ease-in-out; }
        .loader-text { font-size:13px; color:#fff; font-weight:600; letter-spacing:.5px; opacity:.85; }
        .loader-text::after { content:""; display:inline-block; width:1em; animation:ld 1.5s infinite; }
        @keyframes lp { 0%,100%{transform:scale(1);opacity:.8} 50%{transform:scale(1.08);opacity:1} }
        @keyframes ld { 0%{content:""} 33%{content:"."} 66%{content:".."} 100%{content:"..."} }

        .bd-wrap,.bd-panel,.bd-filter-bar { max-width:100%; overflow-x:hidden; }
        .bd-chart-box,.bd-card,.bd-banner-card { min-width:0; word-break:break-word; }

        @media (min-width:1400px) { .bd-banner-value{font-size:26px} .bd-bottom{grid-template-columns:1fr 440px} }
        @media (max-width:1200px) { .bd-bottom{grid-template-columns:1fr 360px} .bd-cards{grid-template-columns:repeat(3,1fr)} }
        @media (max-width:1024px) { .bd-bottom{grid-template-columns:1fr} .bd-wp-grid{grid-template-columns:1fr} }
        @media (max-width:900px)  { .bd-wp-two-col-row{grid-template-columns:1fr} .bd-cards{grid-template-columns:repeat(2,1fr)} .bd-banner-strip{grid-template-columns:repeat(2,1fr)} }
        @media (max-width:768px)  { .bd-cards{grid-template-columns:repeat(2,1fr);gap:10px} .bd-banner-strip{grid-template-columns:1fr} .bd-bar-label{width:110px;min-width:110px;font-size:11px} .bd-bar-val{width:60px;min-width:60px;font-size:11px} .bd-filter{width:150px} .bd-banner-value{font-size:18px} .bd-card-value{font-size:13px} }
        @media (max-width:600px)  { .bd-filter-bar{padding:12px 12px 0;gap:12px} .bd-panel{padding:10px} .bd-filter{width:100%} .bd-bottom{gap:10px} .bd-bar-label{width:90px;min-width:90px;font-size:10px} .bd-bar-val{width:52px;min-width:52px;font-size:10px} .bd-chart-box{padding:12px} }
        @media (max-width:480px)  { .bd-cards{grid-template-columns:1fr} .bd-banner-strip{grid-template-columns:1fr} .bd-banner-value{font-size:16px} }
    </style>`).appendTo('head');

    const PALETTE     = ['#378ADD','#1D9E75','#D85A30','#7F77DD','#D4537E','#BA7517','#639922','#E24B4A','#185FA5','#888780'];
    const SUB_PALETTE = ['#5b9bd5','#17856a','#c04e22','#6b62c7','#c03d6a','#9a5e0e','#4e7a18','#c93737','#0f4a87','#6b6b68'];

    $(page.body).html(`
        <div class="bd-wrap">
            <div class="bd-filter-bar"><div class="bd-filter" id="bd-fy-wrap"></div></div>

            <ul id="bd-tab-nav">
                <li><a class="bd-tab active" data-tab="dashboard">Budget Dashboard</a></li>
                <li><a class="bd-tab" data-tab="workplan">Work Plan Views</a></li>
            </ul>

            <div class="bd-panel active" id="bd-panel-dashboard">
                <div class="bd-banner-strip">
                    <div class="bd-banner-card blue">
                        <div class="bd-banner-label">Overall Grand Total</div>
                        <div class="bd-banner-value" id="bd-grand-total">—</div>
                        <div class="bd-banner-sub" id="bd-unit-count">—</div>
                    </div>
                    <div class="bd-banner-card green">
                        <div class="bd-banner-label">CAPEX Total</div>
                        <div class="bd-banner-value" id="bd-capex-total">—</div>
                        <div class="bd-banner-sub">Capital Expenses</div>
                    </div>
                    <div class="bd-banner-card orange">
                        <div class="bd-banner-label">OPEX Total</div>
                        <div class="bd-banner-value" id="bd-opex-total">—</div>
                        <div class="bd-banner-sub">Operating Expenses</div>
                    </div>
                </div>
                <p class="bd-section-title" style="margin-top:4px;">Units</p>
                <div class="bd-cards" id="bd-cards"><div class="bd-loading">Loading…</div></div>
                <p class="bd-section-title sub" id="bd-sub-title" style="margin-top:16px;">Sub Units</p>
                <div class="bd-cards" id="bd-subcards"></div>
                <div class="bd-bottom">
                    <div class="bd-chart-box">
                        <p class="bd-chart-title">Budget by Unit</p>
                        <p class="bd-chart-sub">Units and Sub Units ranked by budget</p>
                        <div id="bd-hbar-body"></div>
                    </div>
                    <div class="bd-chart-box">
                        <p class="bd-chart-title">Budget Share</p>
                        <p class="bd-chart-sub">Units only — percentage distribution</p>
                        <div style="position:relative;width:100%;height:260px;">
                            <canvas id="bd-donut"></canvas>
                            <div class="bd-donut-center">
                                <div class="bd-donut-center-val" id="bd-donut-total">—</div>
                                <div class="bd-donut-center-lbl">Grand total</div>
                            </div>
                        </div>
                        <div class="bd-legend" id="bd-donut-legend"></div>
                    </div>
                </div>
            </div>

            <div class="bd-panel" id="bd-panel-workplan">
                <div class="bd-wp-grid">
                    <div class="bd-chart-box bd-wp-pie-box">
                        <p class="bd-chart-title">Direct Work &amp; Grants</p>
                        <p class="bd-chart-sub">Consolidated budget breakdown</p>
                        <div style="position:relative;width:100%;height:400px;">
                            <canvas id="bd-wp-pie"></canvas>
                        </div>
                    </div>
                    <div class="bd-wp-summary">
                        <div class="bd-card bd-wp-stat-card" style="border-left-color:#1a56db;">
                            <div class="bd-card-label">Grand Total</div>
                            <div class="bd-card-value" id="bd-wp-pie-total-card">—</div>
                            <div class="bd-card-sub">Overall budget</div>
                        </div>
                        <div class="bd-card bd-wp-stat-card" style="border-left-color:#F5A623;">
                            <div class="bd-card-label">Direct Work</div>
                            <div class="bd-card-value" id="bd-wp-others-val">—</div>
                            <div class="bd-card-sub" id="bd-wp-others-pct">—</div>
                        </div>
                        <div class="bd-card bd-wp-stat-card" style="border-left-color:#378ADD;">
                            <div class="bd-card-label">Grants</div>
                            <div class="bd-card-value" id="bd-wp-grants-val">—</div>
                            <div class="bd-card-sub" id="bd-wp-grants-pct">—</div>
                        </div>
                    </div>
                </div>
                <div class="bd-wp-two-col-row">
                    <div class="bd-chart-box" id="bd-unit-pie-card">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;">
                            <p class="bd-chart-title" style="margin:0;">Direct Work — Unit-wise</p>
                            <button onclick="bdSaveCard('bd-unit-pie-card','direct-work-unitwise')" title="Save as PNG"
                                style="background:none;border:none;cursor:pointer;padding:4px 6px;border-radius:6px;color:#aaa;font-size:16px;line-height:1;transition:color .15s"
                                onmouseenter="this.style.color='#378ADD'" onmouseleave="this.style.color='#aaa'">⬇</button>
                        </div>
                        <p class="bd-chart-sub">Direct Work budget share per unit</p>
                        <div id="bd-unit-pie-wrap"></div>
                        <div class="bd-legend" id="bd-wp-unit-legend"></div>
                    </div>
                    <div class="bd-chart-box" id="bd-grants-pie-card">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;">
                            <p class="bd-chart-title" style="margin:0;">Grants — Unit-wise</p>
                            <button onclick="bdSaveCard('bd-grants-pie-card','grants-unitwise')" title="Save as PNG"
                                style="background:none;border:none;cursor:pointer;padding:4px 6px;border-radius:6px;color:#aaa;font-size:16px;line-height:1;transition:color .15s"
                                onmouseenter="this.style.color='#378ADD'" onmouseleave="this.style.color='#aaa'">⬇</button>
                        </div>
                        <p class="bd-chart-sub">Grants budget share per unit</p>
                        <div id="bd-grants-pie-wrap"></div>
                        <div class="bd-legend" id="bd-wp-grants-unit-legend"></div>
                    </div>
                </div>
            </div>
        </div>
    `);

    let donutChart   = null;
    let wpPieChart   = null;
    let wpDataLoaded = false;

    $(page.body).on('click', '#bd-tab-nav .bd-tab', function (e) {
        e.preventDefault();
        const tab = $(this).data('tab');
        $('#bd-tab-nav .bd-tab').removeClass('active');
        $('.bd-panel').removeClass('active');
        $(this).addClass('active');
        $('#bd-panel-' + tab).addClass('active');
        if (tab === 'workplan' && !wpDataLoaded) {
            const fy = fyControl.get_value();
            if (fy) loadWorkPlan(fy);
        }
    });

    const fyControl = frappe.ui.form.make_control({
        parent: document.getElementById('bd-fy-wrap'),
        df: { label:'Financial Year', fieldtype:'Select', fieldname:'financial_year', reqd:1,
              change() { triggerLoad(); } },
        render_input: true
    });
    fyControl.refresh();
    $(fyControl.wrapper).find('.frappe-control').css('min-width','0');

    function triggerLoad() {
        const fy = fyControl.get_value();
        if (!fy) return;
        wpDataLoaded = false;
        if (wpPieChart) { wpPieChart.destroy(); wpPieChart=null; }
        load(fy, 'March');
        if ($('#bd-tab-nav .bd-tab.active').data('tab')==='workplan') loadWorkPlan(fy);
    }

    frappe.call({
        method: 'annual_budget.api.filter_options.get_financial_year_list',
        callback(r) {
            if (!r.message?.length) return;
            const years = r.message.map(d => d.financial_year);
            fyControl.df.options = years.join('\n');
            fyControl.refresh();
            const now=new Date(), y=now.getFullYear(), m=now.getMonth()+1;
            const fy=m>=4?`${y}-${String(y+1).slice(-2)}`:`${y-1}-${String(y).slice(-2)}`;
            const def=years.includes(fy)?fy:years[0];
            fyControl.set_value(def);
            load(def,'March');
        }
    });

    /* ── HELPERS ── */
    const fmtINR = v => '₹' + Math.round(v||0).toLocaleString('en-IN');

    /* Round to whole numbers — no .00 decimals */
    const fmtCr = v => {
        const abs = Math.abs(v||0);
        if (abs >= 1e7) return '₹' + Math.round((v||0)/1e7) + ' Cr';
        if (abs >= 1e5) return '₹' + Math.round((v||0)/1e5) + ' L';
        if (abs >= 1e3) return '₹' + Math.round((v||0)/1e3) + ' K';
        return '₹' + Math.round(v||0);
    };

    function parseData(message) {
        const consolidated = message.find(d=>d.settings_doc==='CONSOLIDATED');
        const mainUnits = message
            .filter(d=>d.settings_doc!=='CONSOLIDATED'&&d.is_this_sub_item===0)
            .sort((a,b)=>(a.sequence_id||0)-(b.sequence_id||0))
            .map((u,idx)=>{
                const gt=(u.actuals||[]).find(a=>a.sequence_id===9999);
                return {label:(u.label||'').trim(),ytd:gt?(gt.ytd||0):0,
                        sequence_id:u.sequence_id||0,color:PALETTE[idx%PALETTE.length]};
            }).filter(u=>u.ytd>0);
        const subUnits = message
            .filter(d=>d.settings_doc!=='CONSOLIDATED'&&d.is_this_sub_item===1)
            .sort((a,b)=>(a.sequence_id||0)-(b.sequence_id||0))
            .map((u,idx)=>{
                const gt=(u.actuals||[]).find(a=>a.sequence_id===9999);
                return {label:(u.label||'').trim(),ytd:gt?(gt.ytd||0):0,
                        sequence_id:u.sequence_id||0,color:SUB_PALETTE[idx%SUB_PALETTE.length]};
            }).filter(u=>u.ytd>0);
        let overall=0,capex=0,opex=0;
        if (consolidated) {
            const ca=consolidated.actuals||[];
            overall=(ca.find(a=>a.name==='OVERALL GRAND TOTAL')||{}).ytd||0;
            capex  =(ca.find(a=>a.name==='CAPEX TOTAL')||{}).ytd||0;
            opex   =(ca.find(a=>a.name==='OPEX TOTAL')||{}).ytd||0;
        }
        if (!overall) overall=mainUnits.reduce((s,u)=>s+u.ytd,0);
        return {mainUnits,subUnits,overall,capex,opex};
    }

    function renderBanner(overall,capex,opex,mainUnits,subUnits){
        $('#bd-grand-total').text(fmtCr(overall));
        $('#bd-capex-total').text(fmtCr(capex));
        $('#bd-opex-total').text(fmtCr(opex));
        $('#bd-unit-count').text(mainUnits.length+' units'+(subUnits.length?' · '+subUnits.length+' sub units':''));
    }

    function renderCards(mainUnits,subUnits,overall){
        const $c=$('#bd-cards').empty();
        mainUnits.forEach(u=>{
            const pct=overall>0?((u.ytd/overall)*100).toFixed(1):'0.0';
            $c.append(`<div class="bd-card" style="border-left-color:${u.color};">
                <div class="bd-card-label" title="${u.label}">${u.label}</div>
                <div class="bd-card-value">${fmtINR(u.ytd)}</div>
                <div class="bd-card-sub">${pct}% of total</div></div>`);
        });
        const $s=$('#bd-subcards').empty();
        if(!subUnits.length){$('#bd-sub-title').hide();return;}
        $('#bd-sub-title').show();
        subUnits.forEach(u=>{
            const pct=overall>0?((u.ytd/overall)*100).toFixed(1):'0.0';
            $s.append(`<div class="bd-card" style="border-left-color:${u.color};">
                <div class="bd-card-label" title="${u.label}">${u.label}</div>
                <div class="bd-card-value">${fmtINR(u.ytd)}</div>
                <div class="bd-card-sub">${pct}% of total</div></div>`);
        });
    }

    function renderHBar(mainUnits,subUnits){
        const $body=$('#bd-hbar-body').empty();
        const allMax=Math.max(...mainUnits.map(u=>u.ytd),...subUnits.map(u=>u.ytd),1);
        mainUnits.forEach(u=>{
            const pct=((u.ytd/allMax)*100).toFixed(1);
            $body.append(`<div class="bd-bar-row">
                <div class="bd-bar-label" title="${u.label}">${u.label}</div>
                <div class="bd-bar-track"><div class="bd-bar-fill" style="width:${pct}%;background:${u.color};"></div></div>
                <div class="bd-bar-val">${fmtCr(u.ytd)}</div></div>`);
        });
        if(subUnits.length){
            $body.append('<hr class="bd-bar-divider"><div class="bd-bar-section-label">Sub Units</div>');
            subUnits.forEach(u=>{
                const pct=((u.ytd/allMax)*100).toFixed(1);
                $body.append(`<div class="bd-bar-row">
                    <div class="bd-bar-label" title="${u.label}">${u.label}</div>
                    <div class="bd-bar-track"><div class="bd-bar-fill" style="width:${pct}%;background:${u.color};"></div></div>
                    <div class="bd-bar-val">${fmtCr(u.ytd)}</div></div>`);
            });
        }
    }

    function renderDonut(mainUnits,overall){
        const labels=mainUnits.map(u=>u.label);
        const values=mainUnits.map(u=>Math.round(u.ytd));
        const colors=mainUnits.map(u=>u.color);
        $('#bd-donut-total').text(fmtCr(overall));
        const $leg=$('#bd-donut-legend').empty();
        mainUnits.forEach((u,i)=>{
            const pct=overall>0?((u.ytd/overall)*100).toFixed(1):'0.0';
            $leg.append(`<span class="bd-legend-item"><span class="bd-legend-dot" style="background:${colors[i]};"></span>${u.label} — ${pct}%</span>`);
        });
        if(donutChart){donutChart.destroy();donutChart=null;}
        if(!values.length)return;
        donutChart=new Chart(document.getElementById('bd-donut'),{
            type:'doughnut',
            data:{labels,datasets:[{data:values,backgroundColor:colors,borderWidth:2,borderColor:'#fff',hoverOffset:6}]},
            options:{responsive:true,maintainAspectRatio:false,cutout:'68%',
                plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>{
                    const pct=overall>0?((ctx.parsed/overall)*100).toFixed(1):'0.0';
                    return ` ${fmtINR(ctx.parsed)}  (${pct}%)`;
                }}}}}
        });
    }

    function load(fy,month){
        Loader.show('Loading dashboard…');
        $('#bd-grand-total,#bd-capex-total,#bd-opex-total,#bd-donut-total').text('—');
        $('#bd-unit-count').text('—');
        $('#bd-cards').empty();$('#bd-hbar-body').empty();
        frappe.call({
            method:'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan_budget',
            args:{financial_year:fy,month:month,table_name_filter:'Number Card'},
            callback(r){
                Loader.hide();
                if(!r.message?.length){$('#bd-cards').html('<div>No data returned.</div>');return;}
                const{mainUnits,subUnits,overall,capex,opex}=parseData(r.message);
                renderBanner(overall,capex,opex,mainUnits,subUnits);
                renderCards(mainUnits,subUnits,overall);
                renderHBar(mainUnits,subUnits);
                renderDonut(mainUnits,overall);
            },
            error(){Loader.hide();frappe.msgprint('Failed to load data.');}
        });
    }

    function loadWorkPlan(fy){
        Loader.show('Loading Work Plan data…');
        frappe.call({
            method:'annual_budget.api.foundation_consolidated_report.get_unit_wise_plan_budget',
            args:{financial_year:fy,month:'March',table_name_filter:'Pie Chart'},
            callback(r){
                Loader.hide();
                if(!r.message?.length){frappe.msgprint('No Work Plan data returned.');return;}
                const consolidated=r.message.find(d=>d.settings_doc==='CONSOLIDATED');
                if(!consolidated){frappe.msgprint('Consolidated data not found.');return;}
                renderWpPie(consolidated);
                renderWpUnitPie(r.message);
                renderWpGrantsUnitPie(r.message);
                wpDataLoaded=true;
            },
            error(){Loader.hide();frappe.msgprint('Failed to load Work Plan data.');}
        });
    }

    /* ── MAIN 2-SLICE PIE: Direct Work & Grants ──
       Shows name + rounded value + % inside each slice */
    function renderWpPie(consolidated){
        const actuals=consolidated.actuals||[];
        let grantsYtd=0,othersYtd=0;
        /* Use the actual API line item name for data lookup */
        const GN='Grants & Donations';
        actuals.forEach(a=>{
            if(a.sequence_id===9999||a.name==='CAPEX TOTAL'||a.name==='OPEX TOTAL'||a.name==='OVERALL GRAND TOTAL')return;
            (a.items||[]).forEach(it=>{if(it.name===GN)grantsYtd+=(it.ytd||0);else othersYtd+=(it.ytd||0);});
            (a.sub_heads||[]).forEach(sh=>(sh.items||[]).forEach(it=>{if(it.name===GN)grantsYtd+=(it.ytd||0);else othersYtd+=(it.ytd||0);}));
        });
        const total=grantsYtd+othersYtd;
        const gPct=total>0?((grantsYtd/total)*100).toFixed(1):'0.0';
        const oPct=total>0?((othersYtd/total)*100).toFixed(1):'0.0';
        $('#bd-wp-pie-total-card').text(fmtINR(total));
        $('#bd-wp-grants-val').text(fmtINR(grantsYtd));  $('#bd-wp-grants-pct').text(gPct+'% of total');
        $('#bd-wp-others-val').text(fmtINR(othersYtd));  $('#bd-wp-others-pct').text(oPct+'% of total');
        if(wpPieChart){wpPieChart.destroy();wpPieChart=null;}
        wpPieChart=new Chart(document.getElementById('bd-wp-pie'),{
            type:'pie',
            data:{
                labels:['Direct Work','Grants'],
                datasets:[{data:[Math.round(othersYtd),Math.round(grantsYtd)],
                    backgroundColor:['#F5A623','#378ADD'],borderWidth:3,borderColor:'#fff',hoverOffset:6}]
            },
            options:{responsive:true,maintainAspectRatio:false,
                backgroundColor:'#ffffff',
                layout:{padding:{bottom:50}},
                plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>{
                    const pct=total>0?((ctx.parsed/total)*100).toFixed(1):'0.0';
                    return ` ${fmtCr(ctx.parsed)}  (${pct}%)`;
                }}}}
            },
            plugins:[{
                id:'sliceLabels',
                afterDraw(chart){
                    const{ctx,data}=chart;
                    const ds=chart.getDatasetMeta(0).data;
                    const vals=data.datasets[0].data;
                    const lbls=data.labels;
                    const tot=vals.reduce((a,b)=>a+b,0);
                    ctx.save();
                    ds.forEach((arc,i)=>{
                        const angle=(arc.startAngle+arc.endAngle)/2;
                        const r=arc.outerRadius*0.60;
                        const x=arc.x+Math.cos(angle)*r;
                        const y=arc.y+Math.sin(angle)*r;
                        const pct=tot>0?Math.round((vals[i]/tot)*100)+'%':'';
                        ctx.fillStyle='#fff';
                        ctx.textAlign='center';
                        ctx.textBaseline='middle';
                        /* Name */
                        ctx.font='bold 16px sans-serif';
                        ctx.fillText(lbls[i],x,y-18);
                        /* Value */
                        ctx.font='700 16px sans-serif';
                        ctx.fillText(fmtCr(vals[i]),x,y+2);
                        /* Pct */
                        ctx.font='600 16px sans-serif';
                        ctx.fillText(pct,x,y+22);
                    });
                    /* Total centred below the pie using actual arc geometry */
                    const arc0 = ds[0];
                    const pieBottom = arc0.y + arc0.outerRadius; // bottom edge of pie
                    const cw = chart.width;
                    const labelY = pieBottom + 18;
                    ctx.fillStyle = '#999';
                    ctx.font = '700 10px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.letterSpacing = '1px';
                    ctx.fillText('TOTAL BUDGET', cw / 2, labelY);
                    ctx.fillStyle = '#111';
                    ctx.font = '700 20px sans-serif';
                    ctx.letterSpacing = '0px';
                    ctx.fillText(fmtCr(tot), cw / 2, labelY + 18);
                    ctx.restore();
                }
            }]
        });

    }

    /* ════════════════════════════════════════════════════════════
       renderSvgPie — pure SVG unit pie, labels never clip.
       Fixed 600×520 viewBox, scales with CSS width:100%.
       Values displayed as rounded whole numbers (no decimals).
    ════════════════════════════════════════════════════════════ */
    function renderSvgPie(wrapperId, labels, values, colors, legendId, totalId, totalLabel) {
        const wrap = document.getElementById(wrapperId);
        if (!wrap) return;
        const tot = values.reduce((a, b) => a + b, 0);
        if (!tot) { wrap.innerHTML = '<p style="color:#aaa;padding:20px">No data</p>'; return; }

        const pcts = values.map(v => (v / tot * 100));

        /* ── Build left/right label lists by natural angle ── */
        const PIE_R = 120, CX = 150, CY = 150;
        let cur = -Math.PI / 2;
        const slices = values.map((v, i) => {
            const sw = (v / tot) * 2 * Math.PI, sa = cur, ea = cur + sw, ma = cur + sw / 2;
            cur = ea;
            return { v, i, sa, ea, ma, pct: v / tot * 100, label: labels[i], color: colors[i] };
        });

        const leftSlices  = slices.filter(s => Math.cos(s.ma) < 0).sort((a, b) => a.ma - b.ma);
        const rightSlices = slices.filter(s => Math.cos(s.ma) >= 0).sort((a, b) => a.ma - b.ma);

        /* ── SVG pie with data-index for tooltip ── */
        const polar = (r, a) => [CX + r * Math.cos(a), CY + r * Math.sin(a)];
        function arcPath(s, e) {
            const [x1, y1] = polar(PIE_R, s), [x2, y2] = polar(PIE_R, e);
            return `M${CX},${CY}L${x1.toFixed(2)},${y1.toFixed(2)}A${PIE_R},${PIE_R},0,${(e-s)>Math.PI?1:0},1,${x2.toFixed(2)},${y2.toFixed(2)}Z`;
        }

        let sliceSvg = '', pctSvg = '';
        slices.forEach((s, i) => {
            sliceSvg += `<path d="${arcPath(s.sa, s.ea)}" fill="${s.color}" stroke="#fff" stroke-width="2"
                data-i="${i}" data-label="${s.label}" data-val="${fmtCr(s.v)}" data-pct="${s.pct.toFixed(1)}"
                style="cursor:pointer;transition:opacity .15s"
                onmouseenter="this.style.opacity='.75'"
                onmouseleave="this.style.opacity='1'"/>`;
            if (s.pct >= 4) {
                const [px, py] = polar(PIE_R * 0.63, s.ma);
                pctSvg += `<text x="${px.toFixed(1)}" y="${py.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="700" fill="#fff" style="pointer-events:none">${s.pct.toFixed(1)}%</text>`;
            }
        });

        const uid = 'pie_' + Math.random().toString(36).slice(2, 8);
        const pieSvg = `
            <svg id="${uid}" viewBox="0 0 300 300" style="width:100%;height:100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="300" fill="#fff"/>
                ${sliceSvg}${pctSvg}
            </svg>`;

        /* ── Label table row builder ── */
        const labelRow = s => `
            <div style="display:flex;align-items:flex-start;gap:7px;padding:5px 0;border-bottom:1px solid #f0f2f5;min-width:0;">
                <span style="width:10px;height:10px;min-width:10px;border-radius:2px;background:${s.color};margin-top:3px;"></span>
                <div style="min-width:0;overflow:hidden;">
                    <div style="font-size:11px;font-weight:700;color:#111;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${s.label}">${s.label}</div>
                    <div style="font-size:11px;font-weight:600;color:#333;white-space:nowrap;">${fmtCr(s.v)}</div>
                    <div style="font-size:10px;color:#888;">${s.pct.toFixed(1)}%</div>
                </div>
            </div>`;

        const leftHtml  = leftSlices.map(labelRow).join('');
        const rightHtml = rightSlices.map(labelRow).join('');
        const totLabel  = totalLabel || 'TOTAL';

        const tipId = 'tip_' + uid;

        wrap.innerHTML = `
            <div style="background:#fff;border-radius:8px;padding:8px 0;position:relative;">
                <!-- Tooltip -->
                <div id="${tipId}" style="display:none;position:fixed;background:rgba(20,20,20,.88);color:#fff;
                    border-radius:8px;padding:8px 12px;font-size:12px;pointer-events:none;z-index:9999;
                    box-shadow:0 4px 16px rgba(0,0,0,.25);min-width:120px;"></div>
                <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,280px) minmax(0,1fr);align-items:center;gap:8px;">
                    <div style="padding:0 4px;min-width:0;">${leftHtml}</div>
                    <div style="aspect-ratio:1;min-width:180px;position:relative;">${pieSvg}</div>
                    <div style="padding:0 4px;min-width:0;">${rightHtml}</div>
                </div>
                <!-- Total -->
                <div style="text-align:center;margin-top:12px;padding-top:12px;border-top:1px solid #e8edf3;">
                    <div style="font-size:10px;font-weight:700;letter-spacing:1px;color:#999;text-transform:uppercase;">${totLabel}</div>
                    <div style="font-size:22px;font-weight:700;color:#111;line-height:1.2;">${fmtCr(tot)}</div>
                </div>
            </div>`;

        /* ── Tooltip logic ── */
        const tip = document.getElementById(tipId);
        const svgEl = document.getElementById(uid);
        svgEl.addEventListener('mousemove', function(e) {
            const path = e.target.closest('path[data-label]');
            if (!path) { tip.style.display = 'none'; return; }
            tip.style.display = 'block';
            tip.style.left = (e.clientX + 14) + 'px';
            tip.style.top  = (e.clientY - 10) + 'px';
            tip.innerHTML = `<div style="font-weight:700;margin-bottom:3px;">${path.dataset.label}</div>
                <div>${path.dataset.val}</div>
                <div style="color:#aaa;">${path.dataset.pct}%</div>`;
        });
        svgEl.addEventListener('mouseleave', () => { tip.style.display = 'none'; });

        /* Hide legend — labels already shown in side columns */
        $('#' + legendId).hide();
        if (totalId) $('#' + totalId).text(fmtCr(tot));
    }

    function renderWpUnitPie(message){
        const PALETTE_WP=['#378ADD','#1D9E75','#D85A30','#7F77DD','#D4537E','#BA7517','#639922','#E24B4A','#185FA5','#888780'];
        const GN='Grants & Donations';
        function getDirectWork(u){
            const gt=(u.actuals||[]).find(a=>a.sequence_id===9999);
            const grand=gt?(gt.ytd||0):0;let grants=0;
            (u.actuals||[]).forEach(a=>{if(a.sequence_id===9999)return;
                (a.items||[]).forEach(it=>{if(it.name===GN)grants+=(it.ytd||0);});
                (a.sub_heads||[]).forEach(sh=>(sh.items||[]).forEach(it=>{if(it.name===GN)grants+=(it.ytd||0);}));});
            return grand-grants;
        }
        const units=message.filter(d=>d.settings_doc!=='CONSOLIDATED'&&d.is_this_sub_item===0)
            .sort((a,b)=>(a.sequence_id||0)-(b.sequence_id||0));
        const labels=[],values=[],colors=[];let ci=0;
        units.forEach(u=>{const dw=getDirectWork(u);if(dw<=0)return;
            labels.push((u.label||'').trim());values.push(Math.round(dw));colors.push(PALETTE_WP[ci++%PALETTE_WP.length]);});
        renderSvgPie('bd-unit-pie-wrap',labels,values,colors,'bd-wp-unit-legend','bd-wp-unit-pie-total','TOTAL DIRECT WORK');
    }

    function renderWpGrantsUnitPie(message){
        const PALETTE_WP=['#378ADD','#1D9E75','#D85A30','#7F77DD','#D4537E','#BA7517','#639922','#E24B4A','#185FA5','#888780'];
        const GN='Grants & Donations';
        function getGrantsAmt(u){
            let amt=0;
            (u.actuals||[]).forEach(a=>{if(a.sequence_id===9999)return;
                (a.items||[]).forEach(it=>{if(it.name===GN)amt+=(it.ytd||0);});
                (a.sub_heads||[]).forEach(sh=>(sh.items||[]).forEach(it=>{if(it.name===GN)amt+=(it.ytd||0);}));});
            return amt;
        }
        const units=message.filter(d=>d.settings_doc!=='CONSOLIDATED'&&d.is_this_sub_item===0)
            .sort((a,b)=>(a.sequence_id||0)-(b.sequence_id||0));
        const labels=[],values=[],colors=[];let ci=0;
        units.forEach(u=>{const g=getGrantsAmt(u);if(g<=0)return;
            labels.push((u.label||'').trim());values.push(Math.round(g));colors.push(PALETTE_WP[ci++%PALETTE_WP.length]);});
        renderSvgPie('bd-grants-pie-wrap',labels,values,colors,'bd-wp-grants-unit-legend','bd-wp-grants-unit-total','TOTAL GRANTS');
    }

    let resizeTimer;
    $(window).on('resize.bd',function(){
        clearTimeout(resizeTimer);
        resizeTimer=setTimeout(()=>{
            if(donutChart)donutChart.resize();
            if(wpPieChart)wpPieChart.resize();
            /* SVG pies scale automatically via viewBox — no action needed */
        },300);
    });
    $(wrapper).on('hide',function(){$(window).off('resize.bd');});

    if(!window.Chart){
        const s=document.createElement('script');
        s.src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
        document.head.appendChild(s);
    }
    if(!window.htmlToImage){
        const s=document.createElement('script');
        s.src='https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js';
        document.head.appendChild(s);
    }

    /* Global save function — captures entire chart card as PNG */
    window.bdSaveCard = function(cardId, filename) {
        const card = document.getElementById(cardId);
        if (!card) return;
        const fname = (filename || cardId) + '.png';
        /* Hide the download button so it doesn't appear in the image */
        const btn = card.querySelector('button');
        if (btn) btn.style.visibility = 'hidden';
        const doSave = () => {
            window.htmlToImage.toPng(card, {
                backgroundColor: '#ffffff',
                pixelRatio: 2,
                style: { boxShadow: 'none' }
            }).then(dataUrl => {
                if (btn) btn.style.visibility = '';
                const a = document.createElement('a');
                a.download = fname;
                a.href = dataUrl;
                a.click();
            }).catch(err => {
                if (btn) btn.style.visibility = '';
                frappe.msgprint('Could not save image. Please try again.');
                console.error(err);
            });
        };
        if (window.htmlToImage) { doSave(); }
        else { setTimeout(doSave, 800); }
    };

    if(!$('#global-loader').length){
        $('body').append('<div id="global-loader" class="loader-overlay"><div class="loader-box"><img src="/files/APF logo.png" class="loader-logo" alt=""><div class="loader-text">Loading, please wait</div></div></div>');
    }
    $('#global-loader').hide();

    var Loader={
        show(msg){var $l=$('#global-loader');$l.find('.loader-text').text(msg||'Loading, please wait');$l.css('display','flex').hide().fadeIn(200);},
        hide(){$('#global-loader').fadeOut(200);}
    };
};
