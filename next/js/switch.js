/* Full-screen wipe when moving between the Kodex Studio page and Iker's page.
   Links marked with data-switch play it; the other page finishes it on arrival. */
(function(){
  const w=document.querySelector('.wipe'), root=document.documentElement; if(!w)return;
  const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* the Claude preview frame cannot open a second page: the switch only works on the real site */
  const PREVIEW=/claudeusercontent\.com$/.test(location.hostname);
  if(root.classList.contains('arriving')){
    try{sessionStorage.removeItem('wipe')}catch(e){}
    setTimeout(()=>root.classList.add('reveal'),90);
    setTimeout(()=>root.classList.remove('arriving','reveal'),900);
  }
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[data-switch]');
    if(a&&PREVIEW){e.preventDefault();return}
    if(!a||still||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
    e.preventDefault();
    try{sessionStorage.setItem('wipe','1')}catch(x){}
    w.classList.add('cover');
    setTimeout(()=>{location.href=a.href},440);
  });
  addEventListener('pageshow',e=>{if(e.persisted){w.classList.remove('cover');root.classList.remove('arriving','reveal')}});
})();
