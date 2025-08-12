/* ===== Jobbyist — Shared JS (black & white build) ===== */

/* ---- Theme (system default + toggle) ---- */
(function initTheme(){
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', saved || (prefersDark ? 'dark':'light'));
  const t = document.getElementById('themeToggle');
  if(t){ t.addEventListener('click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur==='dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });}
})();

/* ---- Drawer ---- */
(function initDrawer(){
  const sheet = document.getElementById('navSheet');
  const open = document.getElementById('openMenu');
  if(open && sheet){
    open.onclick = ()=>sheet.classList.add('open');
    sheet.addEventListener('click', e=>{ if(e.target.id==='navSheet') sheet.classList.remove('open'); });
  }
})();

/* ---- Language selector (in nav & drawer) ---- */
(function initLanguage(){
  const selects = document.querySelectorAll('.lang-select');
  selects.forEach(sel=>{
    sel.value = localStorage.getItem('lang') || 'en';
    sel.onchange = e=> localStorage.setItem('lang', e.target.value);
  });
})();

/* ---- Cookie banner ---- */
(function cookie(){
  const banner = document.getElementById('cookieBanner');
  if(!banner) return;
  if(!localStorage.getItem('cookie_ok')) banner.classList.add('open');
  window.acceptCookies = function(all){
    localStorage.setItem('cookie_ok', all ? 'all' : 'essential');
    banner.classList.remove('open');
  }
})();

/* ---- Global modals: Signup + Pro ---- */
const FORMSPREE = "https://formspree.io/f/xeokkzle";
function fieldHTML(f){
  if(f.type==='select'){
    return `<div class="input ${f.class||''}"><select name="${f.name}" ${f.required?'required':''}>
      <option value="" selected disabled>${f.placeholder||'Select'}</option>
      ${(f.options||[]).map(o=>`<option value="${o}">${o}</option>`).join('')}
    </select></div>`;
  }
  if(f.type==='checkbox'){
    return `<label class="input ${f.class||''}" style="gap:8px"><input type="checkbox" name="${f.name}" ${f.checked?'checked':''}/> ${f.placeholder||''}</label>`;
  }
  if(f.type==='file'){
    return `<label class="input ${f.class||''}"><input type="file" name="${f.name}"/> ${f.placeholder||''}</label>`;
  }
  return `<div class="input ${f.class||''}"><input name="${f.name}" type="${f.type||'text'}" placeholder="${f.placeholder||''}" ${f.required?'required':''}/></div>`;
}
function swapPage(form,from,to,dotsSel){ form.querySelector(`[data-step="${from}"]`).style.display='none'; form.querySelector(`[data-step="${to}"]`).style.display='block'; form.querySelectorAll(dotsSel+' .step').forEach((d,i)=>d.classList.toggle('active', i<=to)); }
function validatePage(form,i){ let ok=true; form.querySelectorAll(`[data-step="${i}"] input[required], [data-step="${i}"] select[required]`).forEach(el=>{ if(!el.value){ el.style.borderColor='#999'; ok=false;} else el.style.borderColor='var(--line)'; }); return ok; }
async function submitFormspree(form, subject){
  const fd=new FormData(form); fd.append('_subject', subject);
  await fetch(FORMSPREE, {method:'POST', body:fd, headers:{'Accept':'application/json'}}).catch(()=>{});
  alert('Thanks! We’ve received your details.');
  document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'));
}

/* Job seeker signup steps */
const seekerSteps = [
  {id:'account',title:'Create your account',fields:[
    {name:'firstName',placeholder:'First name',required:true},
    {name:'lastName',placeholder:'Last name',required:true},
    {name:'email',type:'email',placeholder:'Email address',required:true},
    {name:'password',type:'password',placeholder:'Password',required:true},
    {name:'location',placeholder:'City/Province',class:'full',required:true},
  ]},
  {id:'experience',title:'Experience',fields:[
    {name:'years',type:'number',placeholder:'Years of experience',required:true},
    {name:'currentTitle',placeholder:'Current/last job title',required:true},
    {name:'industry',placeholder:'Industry (e.g., Banking, Tech)',required:true},
    {name:'workPref',type:'select',options:['Remote','Hybrid','On-site'],placeholder:'Work preference',required:true},
    {name:'notice',type:'select',options:['Immediate','2 weeks','1 month','3 months'],placeholder:'Notice period',required:true},
    {name:'salaryExp',placeholder:'Salary expectation (ZAR)',class:'full'}
  ]},
  {id:'skills',title:'Skills & Tools',fields:[
    {name:'skills',placeholder:'Key skills (comma-separated)',class:'full',required:true},
    {name:'tools',placeholder:'Tools/tech (comma-separated)',class:'full'},
    {name:'languages',placeholder:'Languages (comma-separated)',class:'full'}
  ]},
  {id:'documents',title:'Documents',fields:[
    {name:'cv',type:'file',placeholder:'Upload CV (PDF/DOCX) — optional',class:'full'},
    {name:'portfolio',placeholder:'Portfolio URL (https://)',class:'full'}
  ]},
  {id:'preferences',title:'Alerts & Privacy',fields:[
    {name:'alerts',type:'checkbox',placeholder:'Send me new job alerts'},
    {name:'directory',type:'checkbox',placeholder:'Add me to the job seeker directory (visible to verified recruiters)',checked:true},
    {name:'terms',type:'checkbox',placeholder:'I agree to the Terms & Privacy',required:true}
  ]}
];
/* Pro steps */
const proSteps = [
  {id:'you',title:'Your details',fields:[
    {name:'fullName',placeholder:'Full name',required:true},
    {name:'email',type:'email',placeholder:'Email address',required:true},
    {name:'phone',placeholder:'Phone number',required:true},
  ]},
  {id:'plan',title:'Choose plan',fields:[
    {name:'plan',type:'select',options:['Monthly — R99 (promo)','Monthly — R199 (regular)'],placeholder:'Select plan',required:true},
    {name:'alerts',type:'checkbox',placeholder:'Email me Pro tips & job alerts',checked:true}
  ]},
  {id:'billing',title:'Billing info',fields:[
    {name:'city',placeholder:'Billing city',required:true},
    {name:'country',placeholder:'Country (South Africa)',required:true},
    {name:'notes',placeholder:'Anything we should know?',class:'full'}
  ]}
];
/* Employer steps */
const bizSteps = [
  {id:'company',title:'Company profile',fields:[
    {name:'company',placeholder:'Company name',required:true},
    {name:'website',placeholder:'Company website (https://)'},
    {name:'hq',placeholder:'HQ city',required:true},
    {name:'size',type:'select',options:['1-10','11-50','51-200','200+'],placeholder:'Company size',required:true},
    {name:'industry',placeholder:'Industry (e.g., Retail, Tech)',class:'full',required:true}
  ]},
  {id:'contact',title:'Your details',fields:[
    {name:'contact_name',placeholder:'Your name',required:true},
    {name:'email',type:'email',placeholder:'Work email',required:true},
    {name:'role',placeholder:'Role (e.g., HR Manager)'}
  ]},
  {id:'intent',title:'Goals & intent',fields:[
    {name:'intent',type:'select',options:['Create a new verified profile','Claim an existing company profile'],placeholder:'I want to…',required:true},
    {name:'notes',placeholder:'Hiring goals / first roles you’ll post',class:'full'}
  ]}
];

/* Render a multi-step form into a modal */
function openFlow(steps, dotsSel, formSel, subject){
  const dots = document.querySelector(dotsSel);
  const form = document.querySelector(formSel);
  if(!dots || !form) return;
  dots.innerHTML=''; form.innerHTML='';
  steps.forEach((_,i)=>{ const d=document.createElement('div'); d.className='step'+(i===0?' active':''); dots.appendChild(d); });
  steps.forEach((s,i)=>{
    const page = document.createElement('div'); page.dataset.step=i; page.style.display=i===0?'block':'none';
    page.innerHTML = `<h3>${s.title}</h3><div class="form-grid">${s.fields.map(f=>fieldHTML(f)).join('')}</div>
      <div class="row" style="justify-content:space-between;margin-top:12px">
        <button class="btn" ${i===0?'disabled':''} data-prev="${i}">Back</button>
        ${i<steps.length-1?`<button class="btn" data-next="${i}">Next</button>`:`<button class="cta" data-submit>Finish</button>`}
      </div>`;
    form.appendChild(page);
  });
  form.addEventListener('click', e=>{
    if(e.target.dataset.next!==undefined){ if(validatePage(form, +e.target.dataset.next)){ swapPage(form, +e.target.dataset.next, +e.target.dataset.next+1, dotsSel); } }
    if(e.target.dataset.prev!==undefined){ swapPage(form, +e.target.dataset.prev, +e.target.dataset.prev-1, dotsSel); }
    if(e.target.hasAttribute('data-submit')){ submitFormspree(form, subject); }
  }, {once:true});
}

/* Wire global CTA buttons */
(function initCTAs(){
  document.querySelectorAll('[data-open="signup"]').forEach(b=>b.onclick=()=>{
    openFlow(seekerSteps, '#stepDots', '#signupFlow', 'New Jobbyist signup');
    document.getElementById('signupModal')?.classList.add('open');
  });
  document.querySelectorAll('[data-open="pro"]').forEach(b=>b.onclick=()=>{
    openFlow(proSteps, '#proStepDots', '#proFlow', 'New Jobbyist Pro signup');
    document.getElementById('proModal')?.classList.add('open');
  });
})();

/* Close helpers */
window.closeModal = (sel)=>document.querySelector(sel)?.classList.remove('open');

/* ---- Companies (home) ---- */
let COMPANIES = [];
async function loadCompanies(){
  const r = await fetch('./data/companies.json'); COMPANIES = await r.json();
  const grid = document.getElementById('companiesGrid');
  if(!grid) return;
  grid.innerHTML='';
  COMPANIES.forEach(c=>{
    const el = document.createElement('div');
    el.className='card';
    el.innerHTML = `
      <div><b>${c.name}</b> <span class="chip">✅ Verified</span></div>
      <div class="sub">${c.industry} • HQ: ${c.hq} • ${c.size}</div>
      <div>⭐ ${Number(c.rating).toFixed(1)} / 5</div>
      <div class="row" style="gap:10px">
        <button class="btn" onclick="openCompany('${c.name}')">View</button>
        <button class="btn" data-open="pro">Follow (Pro)</button>
      </div>`;
    grid.appendChild(el);
  });
}

/* Company modal */
window.openCompany = function(name){
  const c = COMPANIES.find(x=>x.name===name) || {name:name,site:'#',rating:4.0,industry:'—',hq:'—',size:'—'};
  const m = document.getElementById('companyModal');
  document.getElementById('coTitle').textContent = name + ' — Company Profile';
  document.getElementById('coBody').innerHTML = `
    <div class="grid" style="grid-template-columns:2fr 1fr">
      <div>
        <p><b>Industry:</b> ${c.industry}</p>
        <p><b>HQ:</b> ${c.hq}</p>
        <p><b>Company size:</b> ${c.size}</p>
        <p><b>Website:</b> <a href="${c.site}" target="_blank" rel="noopener">${c.site}</a></p>
        <p><b>Rating:</b> ⭐ ${Number(c.rating).toFixed(1)} / 5</p>
        <div class="row" style="gap:10px">
          <button class="btn" data-open="pro">Write a review (Pro)</button>
          <button class="btn" data-open="pro">Follow company (Pro)</button>
        </div>
      </div>
      <div class="panel">
        <h3>Want first dibs on openings?</h3>
        <p class="sub">Go Pro to follow companies, review them, and unlock unlimited listings.</p>
        <button class="cta" data-open="pro">Unlock Pro — R99/mo</button>
      </div>
    </div>`;
  m.classList.add('open');
  // ensure pro CTAs work inside modal
  m.querySelectorAll('[data-open="pro"]').forEach(b=>b.onclick=()=>{
    openFlow(proSteps, '#proStepDots', '#proFlow', 'New Jobbyist Pro signup');
    document.getElementById('proModal')?.classList.add('open');
  });
};

/* ---- Jobs (Browse page) ---- */
let JOBS = [];
const PAGE_SIZE = 12;
let currentList = [];
let currentPage = 1;

function readableEmployment(t){return {FULL_TIME:'Full-time',PART_TIME:'Part-time',CONTRACTOR:'Contract',INTERN:'Internship','TEMPORARY':'Temporary'}[t]||'—';}
function timeAgo(dateStr){const d=new Date(dateStr);const days=Math.max(0,Math.floor((Date.now()-d)/86400000)); return days===0?'today':days===1?'1 day ago':`${days} days ago`; }

function pageCount(){ return Math.max(1, Math.ceil(currentList.length / PAGE_SIZE)); }
function pageSlice(p){ const start=(p-1)*PAGE_SIZE; return currentList.slice(start, start+PAGE_SIZE); }

function injectPageSchema(p){
  [...document.querySelectorAll('script[data-page-jsonld]')].forEach(s=>s.remove());
  const items = pageSlice(p);
  const frag = document.createDocumentFragment();
  items.forEach(job=>{
    const data={"@context":"https://schema.org/","@type":"JobPosting",
      "title":job.title,"description":job.description,
      "datePosted":job.datePosted,"validThrough":job.validThrough,
      "employmentType":readableEmployment(job.employmentType),
      "hiringOrganization":{"@type":"Organization","name":job.company,"sameAs":job.companyWebsite||job.applyUrl},
      "jobLocation":[{"@type":"Place","address":{"@type":"PostalAddress","addressCountry":"ZA","addressLocality":job.location}}],
      "applicantLocationRequirements":{"@type":"Country","name":"South Africa"},"directApply":true,
      "estimatedSalary":{"@type":"MonetaryAmount","currency":"ZAR","value":{"@type":"QuantitativeValue","unitText":"YEAR","value":job.salary||"Market related"}}
    };
    const s=document.createElement('script'); s.type='application/ld+json'; s.dataset.pageJsonld=String(p); s.textContent=JSON.stringify(data);
    frag.appendChild(s);
  });
  document.body.appendChild(frag);
}

function setRelPrevNext(p,total){
  const prev = document.getElementById('relPrev');
  const next = document.getElementById('relNext');
  const base = location.origin + location.pathname.replace(/[^\/]*$/,'') + 'browse.html';
  const url = (n)=>`${base}?page=${n}`;
  if(prev){ prev.href = (p>1)?url(p-1):''; }
  if(next){ next.href = (p<total)?url(p+1):''; }
}

function renderJobsPage(p, replace=false){
  const grid = document.getElementById('browseGrid'); if(!grid) return;
  const pager = document.getElementById('browsePager');
  const sentinel = document.getElementById('browseSentinel');

  const slice = pageSlice(p);
  if(replace) grid.innerHTML = '';
  const frag = document.createDocumentFragment();

  slice.forEach((j,idx)=>{
    if((idx % 5===0) && !(p===1 && idx===0)){
      const ad=document.createElement('div'); ad.className='card ad-card';
      ad.innerHTML='Ad — Google AdSense (in-feed)';
      frag.appendChild(ad);
    }
    const card=document.createElement('div'); card.className='card';
    card.innerHTML=`
      <div class="row"><div class="chip">${j.logo||'🏢'}</div>
        <div><b>${j.title}</b><div class="sub">${j.company}${j.verified?' • ✅ Verified':''}</div></div></div>
      <div class="sub">${j.location} • ${j.workType||'—'} • ${readableEmployment(j.employmentType)}</div>
      <div class="sub">${j.salary || 'Market related'}</div>
      <div class="chip">Posted ${timeAgo(j.datePosted)}</div>
      <p style="min-height:56px">${j.description}</p>
      <div class="row" style="gap:10px;margin-top:auto">
        <button class="btn" onclick="openJob(${JOBS.indexOf(j)})">Details</button>
        <button class="btn" onclick="openCompany('${j.company}')">Company</button>
        <a class="cta" href="${j.applyUrl||'#'}" target="_blank" rel="nofollow noopener">Apply</a>
        <button class="btn" data-open="signup">Save</button>
        <button class="cta invert" data-open="pro">Go Pro</button>
      </div>`;
    frag.appendChild(card);
  });
  grid.appendChild(frag);

  // Update SEO pager
  const total = pageCount();
  const makeBtn=(label, page, disabled=false)=>`<button class="btn" ${disabled?'disabled':''} data-page="${page}">${label}</button>`;
  let html = makeBtn('« Prev', p-1, p<=1);
  const range = [...Array(total).keys()].map(i=>i+1).slice(0,10);
  html += range.map(n=>`<button class="btn" data-page="${n}" ${n===p?'disabled':''}>${n}</button>`).join('');
  html += makeBtn('Next »', p+1, p>=total);
  if(pager){ pager.innerHTML = html; pager.querySelectorAll('[data-page]').forEach(btn => btn.onclick = e=>{
    const target = parseInt(e.currentTarget.dataset.page,10);
    if(Number.isFinite(target) && target>=1 && target<=total){
      currentPage = target; renderJobsPage(currentPage,true); injectPageSchema(currentPage); setRelPrevNext(currentPage,total);
      window.history.replaceState({}, '', `browse.html?page=${target}`);
    }
  });}

  // Infinite scroll
  if(sentinel && !window._io){
    window._io = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        const total = pageCount();
        if(currentPage < total){
          currentPage += 1;
          renderJobsPage(currentPage,false);
          injectPageSchema(currentPage);
          setRelPrevNext(currentPage,total);
        }
      }
    },{rootMargin:'400px'});
    window._io.observe(sentinel);
  }

  // Hook CTAs inside loaded batch
  document.querySelectorAll('[data-open="signup"]').forEach(b=>b.onclick=()=>{
    openFlow(seekerSteps, '#stepDots', '#signupFlow', 'New Jobbyist signup');
    document.getElementById('signupModal')?.classList.add('open');
  });
  document.querySelectorAll('[data-open="pro"]').forEach(b=>b.onclick=()=>{
    openFlow(proSteps, '#proStepDots', '#proFlow', 'New Jobbyist Pro signup');
    document.getElementById('proModal')?.classList.add('open');
  });
}

/* Job Modal (for both home/browse) */
window.openJob = function(idx){
  const j = JOBS[idx]; if(!j) return;
  const m = document.getElementById('jobModal');
  document.getElementById('jobTitle').textContent = j.title + ' — ' + j.company;
  document.getElementById('jobBody').innerHTML = `
    <div class="sub">${j.location} • ${j.workType||'—'} • ${readableEmployment(j.employmentType)} • ${j.salary||'Market'}</div>
    <p>${j.description}</p>
    <div class="row" style="gap:10px">
      <a class="cta" href="${j.applyUrl||'#'}" target="_blank" rel="nofollow noopener">Apply now</a>
      <button class="btn" data-open="signup">Save</button>
    </div>
    <div class="ad-card" style="margin-top:10px">Ad — Google AdSense (mid-content)</div>`;
  m.classList.add('open');
  m.querySelectorAll('[data-open="signup"]').forEach(b=>b.onclick=()=>{
    openFlow(seekerSteps, '#stepDots', '#signupFlow', 'New Jobbyist signup');
    document.getElementById('signupModal')?.classList.add('open');
  });
};

/* Page Initialisers */
async function initHome(){
  const count = document.getElementById('jobsCount');
  const res = await fetch('./data/jobs.json'); JOBS = await res.json();
  if(count) count.textContent = JOBS.length;
  await loadCompanies();
}
async function initBrowse(){
  const res = await fetch('./data/jobs.json'); JOBS = await res.json();
  currentList = JOBS.slice();
  const url = new URL(location.href); const p = parseInt(url.searchParams.get('page')||'1',10);
  currentPage = isFinite(p) && p>0 ? p : 1;
  renderJobsPage(currentPage, true);
  injectPageSchema(currentPage);
  setRelPrevNext(currentPage, pageCount());
}

/* Boot per page */
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('yr') && (document.getElementById('yr').textContent = new Date().getFullYear());

  // Wire global header CTAs
  document.querySelectorAll('[data-open="signup"]').forEach(b=>b.onclick=()=>{
    openFlow(seekerSteps, '#stepDots', '#signupFlow', 'New Jobbyist signup');
    document.getElementById('signupModal')?.classList.add('open');
  });
  document.querySelectorAll('[data-open="pro"]').forEach(b=>b.onclick=()=>{
    openFlow(proSteps, '#proStepDots', '#proFlow', 'New Jobbyist Pro signup');
    document.getElementById('proModal')?.classList.add('open');
  });

  // Page detection
  if(document.body.dataset.page==='home') initHome();
  if(document.body.dataset.page==='browse') initBrowse();

  // Recruitment Suite employer onboarding (on that page)
  if(document.body.dataset.page==='recruitment'){
    openFlow(bizSteps, '#bizStepDots', '#bizFlow', 'Recruitment Suite — Early Access');
  }
});