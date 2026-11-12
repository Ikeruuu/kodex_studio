/* Page behaviour: language switch, project grid, film strip and viewer, menu, scroll-linked motion.
   Reads its content from js/data.js. */
const AWARD='<svg viewBox="0 0 24 24" fill="none" stroke="#16181D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/></svg>';

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let lang='en', filter='all', firstRender=true;
try{lang=localStorage.getItem('lang')||((navigator.language||'').startsWith('es')?'es':'en')}catch(e){lang=(navigator.language||'').startsWith('es')?'es':'en'}

/* ---------- render ---------- */
function renderFilters(){$('#filters').innerHTML=FILTERS.map(f=>`<button type="button" data-f="${f.k}" aria-pressed="${f.k===filter}">${f[lang]}</button>`).join('')}
function renderGrid(){
  const list=PROJECTS.filter(p=>filter==='all'||p.cat.includes(filter));
  $('#grid').innerHTML=list.map(p=>`<article class="proj${p.big&&filter==='all'?' big':''}${firstRender&&!REDUCE?' pre':''}">
    ${p.award?`<div class="award" title="${lang==='es'?'Premiado':'Award'}">${AWARD}</div>`:''}
    <div class="ev">${p.ev[lang]}</div>
    <h3>${esc(lang==='es'&&p.titleEs?p.titleEs:p.title)}</h3>
    <p>${esc(p.d[lang])}</p>
    <div class="detail" id="d-${p.id}">${esc(p.more[lang])}</div>
    <div class="links">${p.links.map(l=>`<a href="${l.u}">${l[lang]}</a>`).join('')}
      <button class="more" type="button" aria-expanded="false" aria-controls="d-${p.id}">${lang==='es'?'Más detalles':'More details'}</button></div>
    <div class="tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div>
  </article>`).join('');
  if(firstRender&&!REDUCE){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const i=[...e.target.parentNode.children].indexOf(e.target)%3;e.target.style.transitionDelay=(i*90)+'ms';e.target.classList.remove('pre');setTimeout(()=>e.target.style.transitionDelay='',900);io.unobserve(e.target)}}),{threshold:.15});
    $$('.proj').forEach(c=>io.observe(c));
    setTimeout(()=>{if(!('IntersectionObserver' in window))$$('.proj.pre').forEach(c=>c.classList.remove('pre'))},0);
  }
  firstRender=false;
}
const PLAY='<span class="play" aria-hidden="true"><svg viewBox="0 0 12 12" fill="#E9EBE6"><path d="M2 1l9 5-9 5z"/></svg></span>';
let vio=null;
function renderFilm(){
  $('#film').innerHTML=PHOTOS.map((p,i)=>{
    const n=`<span class="n">${i+1}A</span>`, cat=`<span class="cat">${p.cat[lang]}</span>`;
    if(!p.src)return `<div class="frame empty" style="aspect-ratio:3/2">${n}<span class="ph">${lang==='es'?'Aquí irá una foto de':'A photo goes here:'} ${p.cat[lang].toLowerCase()}</span>${cat}</div>`;
    const media=p.video?`<video muted loop playsinline preload="none" poster="${p.poster}" src="${p.src}"></video>${PLAY}`:`<img src="${p.src}" alt="" loading="lazy" draggable="false">`;
    return `<button class="frame${p.h>p.w?' tall':''}" type="button" data-i="${i}" style="aspect-ratio:${p.w}/${p.h}" aria-label="${(lang==='es'?'Ampliar: ':'Enlarge: ')+esc(p.alt[lang])}">${n}${media}${p.place?`<span class="place">${p.place[lang]}</span>`:''}${cat}</button>`;
  }).join('');
  if(vio)vio.disconnect();
  if('IntersectionObserver' in window&&!REDUCE){
    vio=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){const pr=v.play();if(pr&&pr.catch)pr.catch(()=>{})}else v.pause()}),{threshold:.35});
    $$('#film video').forEach(v=>vio.observe(v));
  }
  measure();
}
/* lightbox */
const lb=$('#lb'), SHOWN=PHOTOS.map((p,i)=>p.src?i:-1).filter(i=>i>=0); let lbAt=0;
function lbShow(i){
  lbAt=i; const p=PHOTOS[i];
  $('#lbMedia').innerHTML=p.video?`<video src="${p.src}" poster="${p.poster}" controls autoplay muted loop playsinline></video>`:`<img src="${p.src}" alt="${esc(p.alt[lang])}">`;
  $('#lbCap').textContent=[p.cat[lang],p.place&&p.place[lang]].filter(Boolean).join(', ');
}
function lbOpen(i){lbShow(i);if(lb.showModal){if(!lb.open)lb.showModal()}else lb.setAttribute('open','')}
function lbClose(){$('#lbMedia').innerHTML='';if(lb.close)lb.close();else lb.removeAttribute('open')}
function lbStep(d){const k=SHOWN.indexOf(lbAt);lbShow(SHOWN[(k+d+SHOWN.length)%SHOWN.length])}
$('#film').addEventListener('click',e=>{const f=e.target.closest('.frame[data-i]');if(f)lbOpen(+f.dataset.i)});
$('#lbX').addEventListener('click',lbClose);
$('#lbPrev').addEventListener('click',()=>lbStep(-1));
$('#lbNext').addEventListener('click',()=>lbStep(1));
lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('lb-in'))lbClose()});
lb.addEventListener('close',()=>{$('#lbMedia').innerHTML=''});
lb.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')lbStep(-1);if(e.key==='ArrowRight')lbStep(1)});
function renderRows(){
  const mk=a=>Array(4).fill(a).flat().map(t=>`<span>${t}</span>`).join('');
  $('#rowA').innerHTML=mk(ROW_A); $('#rowB').innerHTML=mk(ROW_B[lang]);
}
function setLang(l){
  lang=l; document.documentElement.lang=l;
  $$('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===l));
  try{localStorage.setItem('lang',l)}catch(e){}
  renderFilters(); renderGrid(); renderRows(); renderFilm();
}
$('.lang').addEventListener('click',e=>{const b=e.target.closest('button');if(b)setLang(b.dataset.lang)});
$('#filters').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;filter=b.dataset.f;renderFilters();renderGrid()});
$('#grid').addEventListener('click',e=>{const b=e.target.closest('.more');if(!b)return;const card=b.closest('.proj');const open=card.classList.toggle('open');b.setAttribute('aria-expanded',open);b.textContent=open?(lang==='es'?'Menos detalles':'Fewer details'):(lang==='es'?'Más detalles':'More details')});

/* 3D tilt on project cards */
if(FINE&&!REDUCE){
  const grid=$('#grid');
  grid.addEventListener('pointermove',e=>{const c=e.target.closest('.proj');$$('.proj.tilting').forEach(x=>{if(x!==c){x.classList.remove('tilting');x.style.transform=''}});if(!c||c.classList.contains('pre'))return;const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.classList.add('tilting');c.style.transform=`rotateX(${(.5-y)*9}deg) rotateY(${(x-.5)*11}deg) translateZ(14px)`;c.style.setProperty('--gx',x*100+'%');c.style.setProperty('--gy',y*100+'%')});
  grid.addEventListener('pointerleave',()=>$$('.proj.tilting').forEach(x=>{x.classList.remove('tilting');x.style.transform=''}));
}

/* flip card */
const flip=$('#flip'), flipBtn=$('#flipBtn');
const doFlip=()=>{const f=flip.classList.toggle('flipped');flipBtn.setAttribute('aria-pressed',f)};
flipBtn.addEventListener('click',doFlip); flip.addEventListener('click',doFlip);
if(FINE&&!REDUCE){
  flip.addEventListener('pointermove',e=>{const r=flip.getBoundingClientRect();flip.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*16+'deg');flip.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*12+'deg')});
  flip.addEventListener('pointerleave',()=>{flip.style.setProperty('--ry','0deg');flip.style.setProperty('--rx','0deg')});
}

/* mobile menu */
const nav=$('#nav'), menuBtn=$('#menuBtn');
function menu(open){nav.classList.toggle('open',open);menuBtn.setAttribute('aria-expanded',open)}
menuBtn.addEventListener('click',()=>menu(!nav.classList.contains('open')));
$('#navList').addEventListener('click',e=>{if(e.target.closest('a'))menu(false)});
addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});
document.addEventListener('click',e=>{if(!e.target.closest('#nav'))menu(false)});

/* print the CV */
$('#printBtn').addEventListener('click',()=>{try{window.print()}catch(e){}});

/* hero letters */
(function(){const h=$('#name');const words=h.textContent.split(' ');let i=0;h.innerHTML=words.map(w=>`<span class="w" aria-hidden="true">${[...w].map(ch=>`<span class="c" style="transition-delay:${(i++)*45}ms">${ch}</span>`).join('')}</span>`).join(' ');setTimeout(()=>$('.hero').classList.add('go'),80)})();

/* ---------- scroll-linked motion ---------- */
let reelMax=0;
const reel=$('#photos'), film=$('#film'), sheet=$('#sheet'), tl=$('#timeline'), bar=$('#bar'), rowA=$('#rowA'), rowB=$('#rowB');
const DARK=[reel,$('#studio')];
function pinned(){return innerWidth>=900&&!REDUCE}
function measure(){
  if(pinned()){reelMax=Math.max(0,film.scrollWidth-innerWidth+56);reel.style.height=(innerHeight-64+reelMax)+'px'}
  else{reelMax=0;reel.style.height='';film.style.removeProperty('--x');film.parentNode.style.removeProperty('--ry')}
}
function onScroll(){
  const y=scrollY, vh=innerHeight, doc=document.documentElement.scrollHeight-vh;
  bar.style.transform=`scaleX(${doc>0?y/doc:0})`;
  if(!REDUCE){rowA.style.transform=`translateX(${-(y*.35)%600-40}px)`;rowB.style.transform=`translateX(${(y*.28)%500-700}px)`}
  const tr=tl.getBoundingClientRect();const tp=clamp((vh*.72-tr.top)/tr.height);tl.style.setProperty('--p',tp);
  [...tl.querySelectorAll('li')].forEach(li=>{li.classList.toggle('on',li.getBoundingClientRect().top<vh*.72+8)});
  if(pinned()&&reelMax>0){const rr=reel.getBoundingClientRect();const p=clamp((64-rr.top)/Math.max(1,reelMax));film.style.setProperty('--x',(-p*reelMax)+'px');film.parentNode.style.setProperty('--ry',((.5-p)*8)+'deg')}
  if(!REDUCE){const sr=sheet.parentNode.getBoundingClientRect();sheet.style.setProperty('--tilt',innerWidth<760?0:(26*(1-clamp((vh-sr.top)/(vh*.75)))).toFixed(2))}
  /* the bar turns dark while a dark section sits under it */
  let dark=false; for(const el of DARK){const r=el.getBoundingClientRect(); if(r.top<=40&&r.bottom>40){dark=true;break}}
  document.documentElement.classList.toggle('nav-dark',dark);
}
let ticking=false;
function tick(){if(!ticking)return;ticking=false;onScroll()}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(tick);setTimeout(tick,120)}},{passive:true});
addEventListener('resize',()=>{measure();onScroll()});

setLang(lang); measure(); onScroll();
