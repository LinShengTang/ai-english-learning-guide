const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

async function getJSON(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error(`Cannot load ${path}`);
  return await res.json();
}
function el(tag, attrs={}, children=[]){
  const node = document.createElement(tag);
  for(const [k,v] of Object.entries(attrs)){
    if(k === 'class') node.className = v;
    else if(k === 'html') node.innerHTML = v;
    else node.setAttribute(k,v);
  }
  for(const child of children){
    node.append(child?.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}
function renderChapters(chapters){
  const root = $('#chapters');
  root.innerHTML = chapters.map((c, i) => `
    <section class="section chapter" id="${c.id}">
      <div class="section-head"><span class="kicker">Chapter ${i+1}</span><h2>${c.title}</h2></div>
      ${c.html}
    </section>
  `).join('');
}
function renderResources(resources){
  const root = $('#resourceGrid');
  root.innerHTML = resources.map(r => `
    <article class="resource-card" data-type="${r.type}" data-priority="${r.priority}">
      <div class="card-top"><span class="rid">${r.id}</span><span class="level">${r.level}</span></div>
      <h3>${r.name}</h3>
      <div class="tags">${(r.best_for||[]).slice(0,4).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      <p><b>第一次怎麼用：</b>${r.how_to_use}</p>
      <p><b>搭配卡片：</b>${(r.paired_cards||[]).map(c=>`<a href="#card-${c}" class="pill">${c}</a>`).join('')}</p>
      <p class="warn"><b>注意：</b>${r.warning}</p>
    </article>
  `).join('');
}
function renderCards(cards){
  const root = $('#promptCards');
  root.innerHTML = cards.map(c => `
    <details class="prompt-card" id="card-${c.id}" data-chapter="${c.chapter}">
      <summary><b>${c.id}｜${c.title.replace(/^C\d+｜/,'')}</b><span>${c.chapter}</span></summary>
      <div class="meta-grid">
        <p><b>適合：</b>${c.best_for}</p>
        <p><b>使用前：</b>${c.prepare}</p>
      </div>
      <p><b>工具對應：</b>${c.tool_mapping}</p>
      <label class="small-label">主 Prompt</label>
      <textarea readonly>${c.prompt}</textarea>
      <button onclick="copyFrom(this)">複製主 Prompt</button>
      <details class="subdetails">
        <summary>二次追問 Prompt</summary>
        <textarea readonly>${c.follow_up_prompt}</textarea>
        <button onclick="copyFrom(this)">複製二次追問</button>
      </details>
      <p class="after"><b>AI 回覆後：</b>${c.after_ai_reply}</p>
    </details>
  `).join('');
}
function renderPlan(plan){
  const root = $('#planGrid');
  root.innerHTML = plan.map(p => `
    <div class="quick"><b>${p.range}</b><br>${p.focus}<br>${(p.cards||[]).map(c=>`<a href="#card-${c}" class="pill">${c}</a>`).join('')}</div>
  `).join('');
}
function setupFilters(){
  $$('#resourceFilters .filter-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      $$('#resourceFilters .filter-btn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      const f = b.dataset.filter;
      $$('.resource-card').forEach(c=>c.style.display=(f==='all'||c.dataset.type===f)?'':'none');
    });
  });
  $$('#cardFilters .filter-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      $$('#cardFilters .filter-btn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      const f = b.dataset.filter;
      $$('.prompt-card').forEach(c=>c.style.display=(f==='all'||c.dataset.chapter===f)?'':'none');
    });
  });
}
function copyFrom(btn){
  let ta = btn.previousElementSibling;
  if(!ta || ta.tagName !== 'TEXTAREA') ta = btn.parentElement?.querySelector('textarea');
  if(!ta) ta = btn.closest('details')?.querySelector('textarea');
  if(!ta){ alert('找不到 Prompt 文字，請手動選取。'); return; }
  const txt = ta.value || ta.textContent || '';
  function done(){ const old=btn.textContent; btn.textContent='已複製'; setTimeout(()=>btn.textContent=old,1200); }
  function fallback(){
    try{
      ta.removeAttribute('readonly'); ta.focus(); ta.select(); ta.setSelectionRange(0, ta.value.length);
      const ok = document.execCommand('copy'); ta.setAttribute('readonly','readonly');
      if(ok) done(); else throw new Error('copy failed');
    }catch(e){
      ta.setAttribute('readonly','readonly');
      alert('手機瀏覽器可能不允許自動複製。請長按 Prompt 文字框，全選後複製。');
    }
  }
  if(navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(done).catch(fallback);
  else fallback();
}
async function init(){
  try{
    const [chapters, resources, cards, plan] = await Promise.all([
      getJSON('data/chapters.json'),
      getJSON('data/resources.json'),
      getJSON('data/prompt-cards.json'),
      getJSON('data/plan.json')
    ]);
    renderChapters(chapters);
    renderResources(resources);
    renderCards(cards);
    renderPlan(plan);
    setupFilters();
    $('#loadStatus')?.remove();
  }catch(err){
    const s = $('#loadStatus');
    if(s) s.innerHTML = '資料載入失敗。請確認這些檔案已上傳到 GitHub Pages：data/chapters.json、data/resources.json、data/prompt-cards.json、data/plan.json。';
    console.error(err);
  }
}
document.addEventListener('DOMContentLoaded', init);
