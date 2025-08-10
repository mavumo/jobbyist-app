/* ===== Jobbyist shared app logic (B/W theme, forms, jobs, companies) ===== */
const FORMSPREE = "https://formspree.io/f/xeokkzle";
const DAILY_LIMITS = { views:50, applies:5 };
const PAGE_SIZE = 12;

/* Theme (system default + toggle) */
(function initTheme(){
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', savedTheme || (prefersDark?'dark':'light'));
  document.addEventListener('click', (e)=>{
    if(e.target && e.target.id==='themeToggle'){
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur==='dark'?'light':'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    }
  });
})();

/* Drawer + language selector in nav */
(function initNav(){
  const sheet = document.getElementById('navSheet');
  const openBtn = document.getElementById('openMenu');
  if(openBtn && sheet){
    openBtn.onclick = ()=>sheet.classList.add('open');
    sheet.addEventListener('click', e=>{ if(e.target.id==='navSheet') sheet.classList.remove('open'); });
  }
  const lang = document.getElementById('langSelect');
  if(lang){ lang.value = localStorage.getItem('lang') || 'en';
    lang.addEventListener('change', e=>localStorage.setItem('lang', e.target.value));
  }
})();

/* User state & daily quotas (client-side gates) */
function getUser(){ return { signedIn: localStorage.getItem('jobbyist_user')==='1', pro: localStorage.getItem('jobbyist_pro')==='1' }; }
function tickCount(kind){
  const key=`quota_${kind}`, dateKey='quota_date', today=new Date().toISOString().slice(0,10);
  if(localStorage.getItem(dateKey)!==today){ localStorage.setItem(dateKey,today); localStorage.setItem('quota_views','0'); localStorage.setItem('quota_applies','0'); }
  const n=parseInt(localStorage.getItem(key)||'0',10)+1; localStorage.setItem(key,String(n));
}
function resetIfNewDay(){ const today=new Date().toISOString().slice(0,10); if(localStorage.getItem('quota_date')!==today){ localStorage.setItem('quota_date',today); localStorage.setItem('quota_views','0'); localStorage.setItem('quota_applies','0'); } }
function canViewMore(){ const u=getUser(); if(!u.signedIn||u.pro) return true; resetIfNewDay(); const n=parseInt(localStorage.getItem('quota_views')||'0',10); return n<DAILY_LIMITS.views; }
function canApplyMore(){ const u=getUser(); if(!u.signedIn||u.pro) return true; resetIfNewDay(); const n=parseInt(localStorage.getItem('quota_applies')||'0',10); return n<DAILY_LIMITS.applies; }
function upsellLimit(type){
  alert(`Limit reached: Free accounts can ${type==='views'?'view up to 50 job details':'apply to 5 jobs'} per day.\nUnlock unlimited access with Jobbyist Pro.`);
  window.location.href = 'pro.html';
}

/* Helpers */
function readableEmployment(t){return {FULL_TIME:'Full-time',PART_TIME:'Part-time',CONTRACTOR:'Contract',INTERN:'Internship','TEMPORARY':'Temporary'}[t]||'—';}
function timeAgo(dateStr){const d=new Date(dateStr);const days=Math.max(0,Math.floor((Date.now()-d)/86400000)); return days===0?'today':days===1?'1 day ago':`${days} days ago`;}

/* ===== Modals (signup/pro/company) ===== */
function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }
function wireGlobalButtons(){
  const signupBtns=[...document.querySelectorAll('#openSignupTop,.open-signup')];
  signupBtns.forEach(b=>b.onclick=()=>openSignup());
  const proBtns=[...document.querySelectorAll('.pro-cta,#openProModal')];
  proBtns.forEach(b=>b.onclick=()=>openPro());
}
document.addEventListener('click', (e)=>{ if(e.target.classList.contains('close-x')){ const m=e.target.closest('.modal'); if(m) m.classList.remove('open'); }});

/* ===== Signup (Job Seeker) multi-step ===== */
const seekerSteps = [
  {title:'Create your account',fields:[
    {name:'firstName',placeholder:'First name',required:true},
    {name:'lastName',placeholder:'Last name',required:true},
    {name:'email',type:'email',placeholder:'Email address',required:true},
    {name:'password',type:'password',placeholder:'Password',required:true},
    {name:'location',placeholder:'City/Province',class:'full',required:true},
  ]},
  {title:'Experience',fields:[
    {name:'years',type:'number',placeholder:'Years of experience',required:true},
    {name:'currentTitle',placeholder:'Current/last job title',required:true},
    {name:'industry',placeholder:'Industry (e.g., Banking, Tech)',required:true},
    {name:'workPref',type:'select',options:['Remote','Hybrid','On-site'],placeholder:'Work preference',required:true},
    {name:'notice',type:'select',options:['Immediate','2 weeks','1 month','3 months'],placeholder:'Notice period',required:true},
    {name:'salaryExp',placeholder:'Salary expectation (ZAR)',class:'full'}
  ]},
  {title:'Skills & Tools',fields:[
    {name:'skills',placeholder:'Key skills (comma-separated)',class:'full',required:true},
    {name:'tools',placeholder:'Tools/tech (comma-separated)',class:'full'},
    {name:'languages',placeholder:'Languages (comma-separated)',class:'full'}
  ]},
  {title:'Documents',fields:[
    {name:'cv',type:'file',placeholder:'Upload CV (PDF/DOCX) — optional',class:'full'},
    {name:'portfolio',placeholder:'Portfolio URL (https://)',class:'full'}
  ]},
  {title:'Alerts & Privacy',fields:[
    {name:'alerts',type:'checkbox',placeholder:'Send me new job alerts'},
    {name:'directory',type:'checkbox',placeholder:'Add me to the job seeker directory (visible to verified recruiters)',checked:true},
    {name:'terms',type:'checkbox',placeholder:'I agree to the Terms & Privacy',required:true}
  ]}
];
/* Pro modal */
const proSteps = [
  {title:'Your details',fields:[
    {name:'fullName',placeholder:'Full name',required:true},
    {name:'email',type:'email',placeholder:'Email address',required:true},
    {name:'phone',placeholder:'Phone number',required:true},
  ]},
  {title:'Choose plan',fields:[
    {name:'plan',type:'select',options:['Monthly — R99 (promo)','Monthly — R199 (regular)'],placeholder:'Select plan',required:true},
    {name:'alerts',type:'checkbox',placeholder:'Email me Pro tips & job alerts',checked:true}
  ]},
  {title:'Billing info',fields:[
    {name:'city',placeholder:'Billing city',required:true},
    {name:'country',placeholder:'Country (South Africa)',required:true},
    {name:'notes',placeholder:'Anything we should know?',class:'full'}
  ]}
];

function renderStepDots(el, count){ el.innerHTML=''; for(let i=0;i<count;i++){ const d=document.createElement('div'); d.className='step'+(i===0?' active':''); d.style.cssText="height:6px;flex:1;border-radius:999px;background:var(--chip);border:1px solid var(--line)"; el.appendChild(d);} }
function fieldHTML(f){
  if(f.type==='select'){
    return `<div class="input ${f.class||''}"><select name="${f.name}" ${f.required?'required':''}>
      <option value="" selected disabled>${f.placeholder||'Select'}</option>${(f.options||[]).map(o=>`<option value="${o}">${o}</option>`).join('')}</select></div>`;
  }
  if(f.type==='checkbox'){ return `<label class="input ${f.class||''}" style="gap:8px"><input type="checkbox" name="${f.name}" ${f.checked?'checked':''}/> ${f.placeholder||''}</label>`; }
  if(f.type==='file'){ return `<label class="input ${f.class||''}"><input type="file" name="${f.name}"/> ${f.placeholder||''}</label>`; }
  return `<div class="input ${f.class||''}"><input name="${f.name}" type="${f.type||'text'}" placeholder="${f.placeholder||''}" ${f.required?'required':''}/></div>`;
}
function renderMultiForm(containerId, dotsId, steps, kind){
  const form = document.getElementById(containerId);
  const dots = document.getElementById(dotsId);
  renderStepDots(dots, steps.length);
  form.innerHTML='';
  steps.forEach((s,i)=>{
    const page=document.createElement('div'); page.dataset.step=i; page.style.display=i===0?'block':'none';
    page.innerHTML=`<h3>${s.title}</h3><div class="form-grid">${s.fields.map(fieldHTML).join('')}</div>
      <div class="row" style="justify-content:space-between;margin-top:12px">
        <button class="btn" ${i===0?'disabled':''} data-prev="${i}">Back</button>
        ${i<steps.length-1?`<button class="btn" data-next="${i}">Next</button>`:`<button class="cta" data-submit>Finish</button>`}
      </div>`;
    form.appendChild(page);
  });
  form.onsubmit = e=>e.preventDefault();
  form.addEventListener('click', e=>{
    if(e.target.dataset.next!==undefined){ if(validateStep(form, +e.target.dataset.next)){ swapStep(form,+e.target.dataset.next, +e.target.dataset.next+1, dots); } }
    if(e.target.dataset.prev!==undefined){ swapStep(form, +e.target.dataset.prev, +e.target.dataset.prev-1, dots); }
    if(e.target.hasAttribute('data-submit')){ submitFormspree(form, kind); }
  }, {once:true});
}
function swapStep(form,from,to,dots){
  form.querySelector(`[data-step="${from}"]`).style.display='none';
  form.querySelector(`[data-step="${to}"]`).style.display='block';
  [...dots.children].forEach((d,i)=>d.classList.toggle('active', i<=to));
}
function validateStep(form,i){ let ok=true; form.querySelectorAll(`[data-step="${i}"] input[required], [data-step="${i}"] select[required]`).forEach(el=>{ if(!el.value){ el.style.borderColor='#999'; ok=false;} else el.style.borderColor='var(--line)'; }); return ok; }
async function submitFormspree(form, kind){
  const fd=new FormData(form); fd.append('_subject', kind==='pro'?'New Jobbyist Pro signup':'New Jobbyist signup');
  try{
    await fetch(FORMSPREE,{method:'POST',body:fd,headers:{'Accept':'application/json'}});
    if(kind==='pro'){ localStorage.setItem('jobbyist_user','1'); localStorage.setItem('jobbyist_pro','1'); }
    else { localStorage.setItem('jobbyist_user','1'); localStorage.setItem('jobbyist_pro','0'); }
    alert('All set! Check your email for next steps.'); document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'));
  }catch{ alert('Saved locally. We’ll finalise shortly.'); }
}
function openSignup(){ renderMultiForm('signupFlow','stepDots',seekerSteps,'seeker'); openModal('signupModal'); }
function openPro(){ renderMultiForm('proFlow','proStepDots',proSteps,'pro'); openModal('proModal'); }

/* ===== Companies ===== */
function renderCompanies(containerId){
  const list = window.JOBBYIST_COMPANIES || [];
  const wrap=document.getElementById(containerId);
  if(!wrap) return;
  wrap.innerHTML='';
  list.forEach(c=>{
    const el=document.createElement('div'); el.className='card';
    el.innerHTML=`
      <div><b>${c.name}</b> <span class="chip">✅ Verified</span></div>
      <div class="sub">${c.industry} • HQ: ${c.hq} • ${c.size}</div>
      <div>⭐ ${Number(c.rating).toFixed(1)} / 5</div>
      <div class="row" style="gap:10px">
        <button class="btn open-signup">Review</button>
        <button class="btn open-signup">Follow</button>
        <a href="${c.site}" target="_blank" rel="noopener" class="cta">Website</a>
      </div>`;
    wrap.appendChild(el);
  });
}

/* ===== Jobs: Home preview ===== */
function renderJobsPreview(containerId, count=12){
  const grid=document.getElementById(containerId);
  if(!grid) return;
  const list=(window.JOBBYIST_JOBS||[]).slice(0,count);
  grid.innerHTML='';
  list.forEach((j,idx)=>{
    if(idx>0 && idx%5===0){ const ad=document.createElement('div'); ad.className='card ad-card'; ad.textContent='Ad — Google AdSense (in-feed)'; grid.appendChild(ad); }
    const card=document.createElement('div'); card.className='card';
    card.innerHTML=jobCardHTML(j);
    grid.appendChild(card);
  });
  const cnt=document.getElementById('jobsCount'); if(cnt) cnt.textContent = (window.JOBBYIST_JOBS||[]).length;
}

/* ===== Jobs: Dedicated page (pagination + infinite scroll) ===== */
function jobCardHTML(j){
  return `
    <div class="row"><div class="chip">${j.logo||'🏢'}</div>
      <div><b>${j.title}</b><div class="sub">${j.company}${j.verified?' • ✅ Verified':''}</div></div></div>
    <div class="sub">${j.location} • ${j.workType||'—'} • ${readableEmployment(j.employmentType)}</div>
    <div class="sub">${j.salary || 'Market related'}</div>
    <div class="chip">Posted ${timeAgo(j.datePosted)}</div>
    <p style="min-height:56px">${j.description}</p>
    <div class="row" style="gap:10px;flex-wrap:wrap;margin-top:auto">
      <button class="btn" onclick="openJob('${j.title}','${j.company}','${j.location}','${j.workType||''}','${readableEmployment(j.employmentType)}','${(j.salary||'').replace(/"/g,'&quot;')}','${j.description.replace(/"/g,'&quot;')}','${j.applyUrl||'#'}')">Details</button>
      <button class="btn open-signup">Save</button>
      <a class="cta" target="_blank" rel="noopener" href="${j.applyUrl||'#'}" onclick="handleApplyDirect(event)"><span>Apply</span></a>
    </div>`;
}

function injectJobSchema(job){
  const data={"@context":"https://schema.org/","@type":"JobPosting","title":job.title,"description":job.description,"datePosted":job.datePosted,"validThrough":job.validThrough,"employmentType":readableEmployment(job.employmentType),"hiringOrganization":{"@type":"Organization","name":job.company,"sameAs":job.companyWebsite||job.applyUrl},"jobLocation":[{"@type":"Place","address":{"@type":"PostalAddress","addressCountry":"ZA","addressLocality":job.location}}],"applicantLocationRequirements":{"@type":"Country","name":"South Africa"},"directApply":true,"estimatedSalary":{"@type":"MonetaryAmount","currency":"ZAR","value":{"@type":"QuantitativeValue","unitText":"YEAR","value":job.salary||"Market related"}}};
  const s=document.createElement('script'); s.type='application/ld+json'; s.textContent=JSON.stringify(data); document.body.appendChild(s);
}

function renderJobsPaginated(gridId,pagerId,sentinelId){
  const all = window.JOBBYIST_JOBS||[];
  const grid=document.getElementById(gridId);
  const pager=document.getElementById(pagerId);
  const sentinel=document.getElementById(sentinelId);
  if(!grid || !pager) return;

  const params = new URLSearchParams(location.search);
  let page = Math.max(1, parseInt(params.get('page')||'1',10));
  const pages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));

  function renderPage(p, replace=false){
    const start=(p-1)*PAGE_SIZE, slice=all.slice(start, start+PAGE_SIZE);
    if(replace) grid.innerHTML='';
    const frag=document.createDocumentFragment();
    slice.forEach((j,idx)=>{
      if((idx % 5===0) && !(p===1 && idx===0)){ const ad=document.createElement('div'); ad.className='card ad-card'; ad.textContent='Ad — Google AdSense (in-feed)'; frag.appendChild(ad); }
      const card=document.createElement('div'); card.className='card'; card.innerHTML=jobCardHTML(j);
      frag.appendChild(card);
    });
    grid.appendChild(frag);
    // Inject JSON-LD for the slice (SEO)
    slice.forEach(injectJobSchema);
    updatePager(p);
  }
  function updatePager(p){
    const mk = (label, target, disabled)=>`<a class="btn" href="?page=${target}" ${disabled?'aria-disabled="true"':''}>${label}</a>`;
    const nums = Array.from({length:pages},(_,i)=>i+1).slice(0,8)
      .map(n=>`<a class="btn" href="?page=${n}" ${n===p?'aria-disabled="true"':''}>${n}</a>`).join('');
    pager.innerHTML = mk('« Prev', Math.max(1,p-1), p<=1) + nums + mk('Next »', Math.min(pages,p+1), p>=pages);
    const prev=document.querySelector('link[rel="prev"]')||document.createElement('link');
    prev.rel='prev'; prev.href=p>1?`?page=${p-1}`:''; document.head.appendChild(prev);
    const next=document.querySelector('link[rel="next"]')||document.createElement('link');
    next.rel='next'; next.href=p<pages?`?page=${p+1}`:''; document.head.appendChild(next);
  }
  renderPage(page,true);

  // Progressive infinite scroll
  if(sentinel){
    const io=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && page < pages){
        page += 1; history.replaceState({},'',`?page=${page}`); renderPage(page,false);
      }
    },{rootMargin:'400px'});
    io.observe(sentinel);
  }
}

/* ===== Job detail modal + apply quota ===== */
window.openJob = function(title,company,location,work,emp,salary,desc,apply){
  if(!canViewMore()){ upsellLimit('views'); return; }
  tickCount('views');
  document.getElementById('jobTitle').textContent=`${title} — ${company}`;
  document.getElementById('jobBody').innerHTML = `
    <div class="sub">${location} • ${work||'—'} • ${emp} • ${salary||'Market'}</div>
    <p>${desc}</p>
    <div class="row" style="gap:10px">
      <a class="cta" target="_blank" rel="noopener" href="${apply||'#'}" onclick="handleApplyDirect(event)">Apply now</a>
      <button class="btn open-signup">Save</button>
    </div>
    <div class="card ad-card" style="margin-top:10px">Ad — Google AdSense (mid-content)</div>`;
  openModal('jobModal');
};
window.handleApplyDirect = function(e){
  const user=getUser();
  if(!user.signedIn){ e.preventDefault(); openSignup(); return; }
  if(!user.pro && !canApplyMore()){ e.preventDefault(); upsellLimit('applies'); return; }
  if(!user.pro) tickCount('applies');
};

/* ===== Cookie banner ===== */
(function initCookies(){
  const bar=document.getElementById('cookieBanner');
  if(!bar) return;
  if(!localStorage.getItem('cookie_ok')) bar.classList.add('open');
  window.acceptCookies = (all)=>{ localStorage.setItem('cookie_ok', all?'all':'essential'); bar.classList.remove('open'); };
})();

/* ===== Page initializers (by data-page attr on body) ===== */
document.addEventListener('DOMContentLoaded', ()=>{
  wireGlobalButtons();
  const page = document.body.dataset.page || 'home';
  document.getElementById('yr') && (document.getElementById('yr').textContent = new Date().getFullYear());

  // Search (home)
  const searchBtn=document.getElementById('searchBtn');
  if(searchBtn){
    searchBtn.onclick=()=>{
      const t=(document.getElementById('qTitle').value||'').toLowerCase();
      const l=(document.getElementById('qLoc').value||'').toLowerCase();
      const all = window.JOBBYIST_JOBS||[];
      const filtered=all.filter(j=>(!t||(j.title+j.company+j.description).toLowerCase().includes(t))&&(!l||j.location.toLowerCase().includes(l)));
      localStorage.setItem('search_results', JSON.stringify(filtered));
      window.location.href = 'browse-jobs.html';
    };
  }

  if(page==='home'){
    renderJobsPreview('jobsGrid',12); 
    renderCompanies('companiesGrid');
  }
  if(page==='browse'){
    const stored = localStorage.getItem('search_results');
    if(stored){
      window.JOBBYIST_JOBS = JSON.parse(stored);
      localStorage.removeItem('search_results');
    }
    renderJobsPaginated('jobsGrid','jobsPager','jobsSentinel');
  }
  if(page==='recruitment'){
    // employer multi-step onboarding form
    const steps = [
      {title:'Company profile',fields:[
        {name:'company',placeholder:'Company name',required:true},
        {name:'website',placeholder:'Company website (https://)'},
        {name:'hq',placeholder:'HQ city',required:true},
        {name:'size',type:'select',options:['1-10','11-50','51-200','200+'],placeholder:'Company size',required:true},
        {name:'industry',placeholder:'Industry (e.g., Retail, Tech)',class:'full',required:true}
      ]},
      {title:'Your details',fields:[
        {name:'contact_name',placeholder:'Your name',required:true},
        {name:'email',type:'email',placeholder:'Work email',required:true},
        {name:'role',placeholder:'Role (e.g., HR Manager)'}
      ]},
      {title:'Goals & intent',fields:[
        {name:'intent',type:'select',options:['Create a new verified profile','Claim an existing company profile'],placeholder:'I want to…',required:true},
        {name:'notes',placeholder:'Hiring goals / first roles you’ll post',class:'full'}
      ]}
    ];
    renderMultiForm('bizFlow','bizStepDots',steps,'biz');
  }
  if(page==='stats'){
    const s={openRoles:'8,567',remoteShare:'27%',medianSalary:'R38,000 / mo',timeToFill:'34 days',topIndustry:'Financial Services',hotSkill:'Python'};
    const el=(id,val)=>{const e=document.getElementById(id); if(e) e.textContent=val;};
    el('statOpen',s.openRoles); el('statRemote',s.remoteShare); el('statSalary',s.medianSalary); el('statTTF',s.timeToFill); el('statTopInd',s.topIndustry); el('statSkill',s.hotSkill);
  }
});