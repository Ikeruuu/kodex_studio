/* Behaviour of the Kodex Studio page: language, menu, the five demos, plans and scroll effects.
   Reads its content from js/studio-data.js. */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MAIL='arguellesiker@gmail.com';
let lang='en';
try{lang=localStorage.getItem('lang')||((navigator.language||'').startsWith('es')?'es':'en')}catch(e){lang=(navigator.language||'').startsWith('es')?'es':'en'}
const T=o=>typeof o==='string'?o:o[lang];
const money=n=>lang==='es'?n.toLocaleString('es-ES')+' €':'€'+n.toLocaleString('en-GB');
const mailto=s=>`mailto:${MAIL}?subject=${encodeURIComponent('Kodex Studio · '+s)}`;

/* ---------- static blocks rendered from data ---------- */
function renderWork(){
  $('#workGrid').innerHTML=WORK.map((w,i)=>`<article class="wk spot tilt" style="--i:${i}"><span class="kind">${T(w.kind)}</span><h3>${esc(T(w.title))}</h3><p>${esc(T(w.d))}</p>${w.link?`<a href="${w.link.u}">${T(w.link.label)}</a>`:''}</article>`).join('');
  $('#shots').innerHTML=SHOTS.map((f,i)=>`<img src="assets/photos/${f}" alt="" loading="lazy" style="--i:${i}">`).join('');
}
function renderSteps(){$('#steps').innerHTML='<span class="fill" aria-hidden="true"></span>'+STEPS.map(s=>`<li><strong>${T(s.t)}</strong><span>${T(s.d)}</span></li>`).join('')}
function renderPlans(){
  $('#planGrid').innerHTML=PLANS.map((p,i)=>`<article class="plan spot tilt${p.featured?' feat':''}" style="--i:${i}">
    ${p.featured?`<span class="badge">${lang==='es'?'El más pedido':'Most chosen'}</span>`:''}
    <h3>${T(p.name)}</h3><p class="for">${T(p.for)}</p>
    <p class="price" data-n="${p.price}">${money(p.price)}</p><p class="time">${T(p.time)}</p>
    <ul>${T(p.items).map(i=>`<li>${i}</li>`).join('')}</ul>
    <a class="btn${p.featured?' main':''}" href="${mailto('Plan '+T(p.name))}">${lang==='es'?'Quiero este plan':'I want this plan'}</a></article>`).join('');
  $('#care').innerHTML=`<div><p class="path">plans/care</p><h3>${lang==='es'?'Mantenimiento':'Maintenance'}</h3><p class="price">${money(CARE.price)} <small>${lang==='es'?'al mes':'a month'}</small></p></div><ul>${T(CARE.items).map(i=>`<li>${i}</li>`).join('')}</ul>`;
  $('#extras').innerHTML=`<b>${lang==='es'?'Extras con precio fijo':'Fixed-price extras'}</b>`+EXTRAS.map(x=>`<span>${T(x.n)}<i>${money(x.price)}</i></span>`).join('');
  $$('[data-mail=custom]').forEach(a=>a.href=mailto(lang==='es'?'Presupuesto a medida':'Custom quote'));
}
function renderFaq(){$('#faqList').innerHTML=FAQ.map(f=>`<details><summary>${T(f.q)}</summary><p>${T(f.a)}</p></details>`).join('')}

/* ---------- demo: website that builds itself ---------- */
const dWeb=$('#dWeb');
if(REDUCE)dWeb.classList.add('built'); else setInterval(()=>dWeb.classList.toggle('built'),3200);

/* ---------- demo: booking app ---------- */
const DAYS={en:['Mon','Tue','Wed','Thu','Fri','Sat'],es:['Lun','Mar','Mié','Jue','Vie','Sáb']}, HOURS=['10:00','11:30','13:00','16:00','17:30','19:00'];
const app={step:0,day:0,hour:0,auto:!REDUCE,timer:0};
function appDraw(){
  const [a,b]=$$('#dApp .chips');
  a.innerHTML=DAYS[lang].map((d,i)=>`<button type="button" data-i="${i}"${app.step>0&&i===app.day?' class="sel"':''}>${d}</button>`).join('');
  b.innerHTML=HOURS.map((h,i)=>`<button type="button" data-i="${i}"${app.step>1&&i===app.hour?' class="sel"':''}>${h}</button>`).join('');
  $('#appSum').textContent=DAYS[lang][app.day]+', '+HOURS[app.hour];
  $('#dApp .screens').style.transform=`translateX(${-app.step*33.3334}%)`;
  $$('#dApp .dots i').forEach((d,i)=>d.classList.toggle('on',i===app.step));
}
function appNext(pick){
  if(app.step===0)app.day=pick; else if(app.step===1)app.hour=pick;
  app.step=(app.step+1)%3; appDraw();
}
$('#dApp').addEventListener('click',e=>{const b=e.target.closest('.chips button');if(!b)return;app.auto=false;clearTimeout(app.timer);appNext(+b.dataset.i);if(app.step===2)app.timer=setTimeout(()=>{app.step=0;appDraw()},3600)});
if(app.auto)setInterval(()=>{if(app.auto)appNext(Math.floor(Math.random()*6))},2600);

/* ---------- demo: shop ---------- */
const shop={stock:[5,3,4],cart:[0,0,0],paid:false};
function shopDraw(){
  const P=SHOP[lang];
  $('#shopList').innerHTML=P.map((p,i)=>`<li><b>${p[0]}</b><small>${money(p[1])} · ${lang==='es'?'quedan':'left'} ${shop.stock[i]}</small><button type="button" data-i="${i}"${shop.stock[i]===0||shop.paid?' disabled':''}>${lang==='es'?'Añadir':'Add'}</button></li>`).join('');
  const lines=P.map((p,i)=>shop.cart[i]?`<div class="ln"><span>${shop.cart[i]} × ${p[0]}</span><span>${money(shop.cart[i]*p[1])}</span></div>`:'').join('');
  const total=P.reduce((s,p,i)=>s+shop.cart[i]*p[1],0);
  $('#shopOrder').innerHTML=`<h4>${lang==='es'?'Pedido':'Order'}</h4>${lines||`<div class="ln">${lang==='es'?'Todavía vacío':'Still empty'}</div>`}<div class="tot"><span>Total</span><span>${money(total)}</span></div>`+
    (shop.paid?`<div class="paid">${lang==='es'?'Pago recibido. Stock actualizado.':'Payment received. Stock updated.'}</div><button type="button" data-a="reset">${lang==='es'?'Empezar de nuevo':'Start again'}</button>`:`<button type="button" data-a="pay"${total?'':' disabled'}>${lang==='es'?'Pagar':'Pay'}</button>`);
}
$('#shopList').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;const i=+b.dataset.i;shop.stock[i]--;shop.cart[i]++;shopDraw()});
$('#shopOrder').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;if(b.dataset.a==='pay'){shop.paid=true}else{shop.stock=[5,3,4];shop.cart=[0,0,0];shop.paid=false}shopDraw()});

/* ---------- demo: ask your data ---------- */
let askAt=0, askRun=0;
function askButtons(){$('#askQs').innerHTML=ASK.map((a,i)=>`<button type="button" data-i="${i}" aria-pressed="${i===askAt}">${T(a.q)}</button>`).join('')}
function ask(i){
  askAt=i; const run=++askRun, a=ASK[i], q=T(a.q); askButtons();
  const qEl=$('#askQ'), sEl=$('#askSql'), bEl=$('#askBars'); sEl.textContent=''; bEl.innerHTML='';
  const max=Math.max(...T(a.rows).map(r=>r[1]));
  const bars=()=>{sEl.textContent=a.sql;bEl.innerHTML=T(a.rows).map(r=>`<div class="bar"><span>${r[0]}</span><i data-w="${Math.round(r[1]/max*100)}"></i><span>${r[1]}</span></div>`).join('');setTimeout(()=>{if(run===askRun)$$('#askBars i').forEach(b=>b.style.width=b.dataset.w+'%')},60)};
  if(REDUCE){qEl.textContent=q;bars();return}
  let n=0; qEl.textContent='';
  (function type(){if(run!==askRun)return;qEl.textContent=q.slice(0,++n);if(n<q.length)setTimeout(type,24);else setTimeout(()=>{if(run===askRun)bars()},260)})();
}
$('#askQs').addEventListener('click',e=>{const b=e.target.closest('button');if(b)ask(+b.dataset.i)});

/* ---------- demo: before / after ---------- */
$('#dBa input').addEventListener('input',e=>$('#dBa').style.setProperty('--p',e.target.value+'%'));

/* ---------- typed prompt ---------- */
let typedRun=0;
function typed(){
  const el=$('#typed'), words=TYPED[lang], run=++typedRun; let w=0,n=0,del=false;
  if(REDUCE){el.textContent=words[0];return}
  (function tick(){
    if(run!==typedRun)return;
    const word=words[w]; n+=del?-1:1; el.textContent=word.slice(0,n);
    let wait=del?34:70;
    if(!del&&n===word.length){del=true;wait=1500}else if(del&&n===0){del=false;w=(w+1)%words.length;wait=300}
    setTimeout(tick,wait);
  })();
}

/* ---------- moving word bands ---------- */
const BAND={en:[['Code','&amp; camera'],['Websites','that sell'],['Apps','made to measure'],['Photos','that explain']],es:[['Code','&amp; camera'],['Webs','que venden'],['Apps','a medida'],['Fotos','que explican']]};
function renderBands(){const h=Array(4).fill(BAND[lang]).flat().map(w=>`<span><b>${w[0]}</b> ${w[1]}</span>`).join('');$('#bandA').innerHTML=h;$('#bandB').innerHTML=h}

/* ---------- hero: words rise one by one ---------- */
(function(){let i=0;$$('.hero h1 > span').forEach(sp=>{i=0;sp.innerHTML=sp.textContent.trim().split(/\s+/).map(w=>`<span class="w"><span style="--i:${i++}">${esc(w)}</span></span>`).join(' ')});
  const first=!document.documentElement.classList.contains('no-intro')&&!REDUCE;
  setTimeout(()=>$('.hero').classList.add('go'),first?1150:120)})();

/* ---------- prices count up the first time they show ---------- */
let counted=false;
function countUp(){
  if(counted||REDUCE)return; counted=true;
  $$('#planGrid .price').forEach(el=>{const n=+el.dataset.n,t0=performance.now();
    (function step(now){const k=clamp((now-t0)/1100),e=1-Math.pow(1-k,3);el.textContent=money(Math.round(n*e/10)*10);if(k<1)requestAnimationFrame(step);else el.textContent=money(n)})(t0)});
}

/* ---------- pointer: light on cards, tilt, buttons that lean ---------- */
if(FINE&&!REDUCE){
  document.addEventListener('pointermove',e=>{
    const c=e.target.closest('.spot');
    if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');
      if(c.classList.contains('tilt')){const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transition='transform .08s linear';c.style.transform=`perspective(1000px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateZ(6px)`}}
    $$('.tilt').forEach(t=>{if(t!==c&&t.style.transform){t.style.transition='';t.style.transform=''}});
    const b=e.target.closest('.btn.main');
    $$('.btn.main').forEach(x=>{if(x!==b)x.style.transform=''});
    if(b){const r=b.getBoundingClientRect();b.style.transform=`translate(${((e.clientX-r.left)/r.width-.5)*10}px,${((e.clientY-r.top)/r.height-.5)*8}px)`}
  },{passive:true});
}

/* ---------- language, menu ---------- */
function setLang(l){
  lang=l; document.documentElement.lang=l;
  $$('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===l));
  try{localStorage.setItem('lang',l)}catch(e){}
  renderWork(); renderSteps(); renderPlans(); renderFaq(); renderBands(); appDraw(); shopDraw(); ask(askAt); typed(); onScroll();
}
$('.lang').addEventListener('click',e=>{const b=e.target.closest('button');if(b)setLang(b.dataset.lang)});
const nav=$('#nav'), menuBtn=$('#menuBtn');
function menu(open){nav.classList.toggle('open',open);menuBtn.setAttribute('aria-expanded',open)}
menuBtn.addEventListener('click',()=>menu(!nav.classList.contains('open')));
$('#navList').addEventListener('click',e=>{if(e.target.closest('a'))menu(false)});
addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});
document.addEventListener('click',e=>{if(!e.target.closest('#nav'))menu(false)});

/* ---------- scroll effects ---------- */
const root=document.documentElement, heroEl=$('.hero'), secs=$$('main section'), bandA=$('#bandA'), bandB=$('#bandB');
function onScroll(){
  const y=scrollY, vh=innerHeight, doc=root.scrollHeight-vh;
  root.style.setProperty('--prog',doc>0?y/doc:0);
  heroEl.style.setProperty('--hp',REDUCE?0:clamp(y/Math.max(1,heroEl.offsetHeight)));
  if(!REDUCE){bandA.style.transform=`translate3d(${-(y*.45)%1400-60}px,0,0)`;bandB.style.transform=`translate3d(${(y*.4)%1400-1700}px,0,0)`;
    for(const s of secs){const r=s.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)continue;s.style.setProperty('--sy',(((r.top+r.height/2)-vh/2)/vh).toFixed(3))}}
  const st=$('#steps'), r=st.getBoundingClientRect();
  st.style.setProperty('--p',clamp((vh*.7-r.top)/Math.max(1,r.height-48)));
  st.querySelectorAll('li').forEach(li=>li.classList.toggle('on',li.getBoundingClientRect().top<vh*.7));
}
let ticking=false;
function tick(){if(!ticking)return;ticking=false;onScroll()}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(tick);setTimeout(tick,120)}},{passive:true});
addEventListener('resize',onScroll);
$$('.head').forEach(h=>h.classList.add('rv'));
$$('.bento .demo').forEach((d,i)=>{d.classList.add('spot');d.style.setProperty('--i',i%2)});
if('IntersectionObserver' in window&&!REDUCE){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.id==='planGrid')countUp();io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  $$('.rv,.stagger').forEach(el=>io.observe(el));
}else $$('.rv,.stagger').forEach(el=>el.classList.add('in'));

setLang(lang);
