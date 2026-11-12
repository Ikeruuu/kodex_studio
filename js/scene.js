/* The 3D background (three.js): a ridgeline terrain and the extruded Kodex K.
   It only renders while the hero or the Kodex Studio section is on screen, and the
   page works without it if WebGL or three.js is unavailable. */
/* ---------- 3D scene: ridgeline terrain + extruded K ---------- */
(function(){
  if(!window.THREE)return;
  const canvas=$('#gl'); let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'})}catch(e){return}
  document.documentElement.classList.add('gl-on');
  const small=innerWidth<760;
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,small?1.5:2));
  const C={paper:new THREE.Color('#EEF0EC'),night:new THREE.Color('#1B1E25'),ink:new THREE.Color('#16181D'),light:new THREE.Color('#E9EBE6'),steel:new THREE.Color('#6F7786'),code:new THREE.Color('#2440E6'),film:new THREE.Color('#E8A33A')};
  const scene=new THREE.Scene(); scene.fog=new THREE.Fog(C.paper.getHex(),9,36);
  const camera=new THREE.PerspectiveCamera(50,1,.1,120);

  // terrain grid
  const NX=small?70:120, NZ=small?44:64, X0=-24, X1=24, Z0=6, Z1=-36;
  const hash=(x,y)=>{const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n)};
  const vn=(x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);const a=hash(xi,yi),b=hash(xi+1,yi),c=hash(xi,yi+1),d=hash(xi+1,yi+1);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v};
  const fbm=(x,y)=>vn(x,y)*.58+vn(x*2.1,y*2.1)*.28+vn(x*4.3,y*4.3)*.14;
  const ss=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t)};
  const surfGeo=new THREE.BufferGeometry(); const sp=new Float32Array(NX*NZ*3); const idx=[];
  for(let j=0;j<NZ;j++)for(let i=0;i<NX;i++){const k=(j*NX+i)*3;sp[k]=X0+(X1-X0)*i/(NX-1);sp[k+2]=Z0+(Z1-Z0)*j/(NZ-1)}
  for(let j=0;j<NZ-1;j++)for(let i=0;i<NX-1;i++){const a=j*NX+i,b=a+1,c=a+NX,d=c+1;idx.push(a,c,b,b,c,d)}
  surfGeo.setAttribute('position',new THREE.BufferAttribute(sp,3)); surfGeo.setIndex(idx);
  const surfMat=new THREE.MeshBasicMaterial({color:C.paper.getHex(),side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
  scene.add(new THREE.Mesh(surfGeo,surfMat));
  const rows=[];
  for(let j=0;j<NZ;j++){const g=new THREE.BufferGeometry();const p=new Float32Array(NX*3);g.setAttribute('position',new THREE.BufferAttribute(p,3));const m=new THREE.LineBasicMaterial({color:C.ink.getHex(),transparent:true,opacity:.5});const l=new THREE.Line(g,m);l.frustumCulled=false;scene.add(l);rows.push({p,g,m})}
  function shape(flow){
    for(let j=0;j<NZ;j++){const z=Z0+(Z1-Z0)*j/(NZ-1);const far=ss(-2,-26,z);const rp=rows[j].p;
      for(let i=0;i<NX;i++){const x=X0+(X1-X0)*i/(NX-1);
        const env=ss(2.5,11,Math.abs(x+3.5))*(.55+far*.9)+far*.25;
        const h=Math.pow(fbm(x*.21+40,(z-flow)*.21),1.7)*env*7.2;
        const k=(j*NX+i)*3; sp[k+1]=h; rp[i*3]=x; rp[i*3+1]=h+.012; rp[i*3+2]=z}
      rows[j].g.attributes.position.needsUpdate=true}
    surfGeo.attributes.position.needsUpdate=true;
  }

  // the K, extruded from the logo outline
  const pts=[[242,240],[346,240],[346,478],[552,240],[678,240],[503,462],[678,680],[546,680],[432,545],[346,645],[346,680],[242,680]];
  const sh=new THREE.Shape(); pts.forEach(([x,y],i)=>{const X=(x-460)/220,Y=-(y-460)/220;i?sh.lineTo(X,Y):sh.moveTo(X,Y)}); sh.closePath();
  const kGeo=new THREE.ExtrudeGeometry(sh,{depth:.5,bevelEnabled:true,bevelThickness:.05,bevelSize:.035,bevelSegments:3}); kGeo.center();
  const kMat=new THREE.MeshStandardMaterial({color:C.ink.getHex(),metalness:.35,roughness:.32});
  const K=new THREE.Group(); K.add(new THREE.Mesh(kGeo,kMat));
  const eMat=new THREE.LineBasicMaterial({color:C.code.getHex()});
  K.add(new THREE.LineSegments(new THREE.EdgesGeometry(kGeo,35),eMat)); scene.add(K);
  scene.add(new THREE.AmbientLight(0xffffff,.75));
  const d1=new THREE.DirectionalLight(0xffffff,1.1); d1.position.set(3,5,6); scene.add(d1);
  const p1=new THREE.PointLight(0x2440E6,2.2,30); p1.position.set(-4,3,5); scene.add(p1);
  const p2=new THREE.PointLight(0xE8A33A,1.4,30); p2.position.set(7,1,4); scene.add(p2);

  const hero=$('.hero'), studio=$('#studio'), kHero=$('#kHero'), kStudio=$('#kStudio');
  const ray=new THREE.Vector3(), fwd=new THREE.Vector3();
  /* put the K where a DOM box is: cast a ray through the box centre onto the z=0 plane */
  function anchor(el){
    const r=el.getBoundingClientRect();
    if(!r.width||r.bottom<-40||r.top>H+40){K.visible=false;return}
    camera.updateMatrixWorld();
    ray.set(((r.left+r.width/2)/W)*2-1,-((r.top+r.height/2)/H)*2+1,.5).unproject(camera).sub(camera.position).normalize();
    if(Math.abs(ray.z)<1e-4){K.visible=false;return}
    const d=-camera.position.z/ray.z; if(d<=0){K.visible=false;return}
    camera.getWorldDirection(fwd);
    const viewH=2*d*ray.dot(fwd)*Math.tan(25*Math.PI/180);
    K.visible=true; K.position.copy(camera.position).addScaledVector(ray,d); K.scale.setScalar(r.height/H*viewH/2*.9);
  }
  let W=0,H=0,px=0,py=0,tx=0,ty=0,dark=-1;
  function resize(){W=innerWidth;H=innerHeight;renderer.setSize(W,H,false);camera.aspect=W/H;camera.updateProjectionMatrix()}
  resize(); addEventListener('resize',resize);
  if(FINE)addEventListener('pointermove',e=>{tx=e.clientX/W-.5;ty=e.clientY/H-.5},{passive:true});
  function theme(d){
    if(d===dark)return; dark=d;
    const bg=d?C.night:C.paper; renderer.setClearColor(bg.getHex(),1); scene.fog.color.copy(bg); surfMat.color.copy(bg);
    kMat.color.copy(d?C.steel:C.ink); eMat.color.copy(d?C.film:C.code);
  }
  const t0=performance.now(); let shown=true;
  function frame(now){
    requestAnimationFrame(frame);
    if(document.hidden)return;
    const hr=hero.getBoundingClientRect(), sr=studio.getBoundingClientRect();
    const heroVis=hr.bottom>0, studioVis=sr.top<H&&sr.bottom>0;
    if(!heroVis&&!studioVis){if(shown){canvas.style.visibility='hidden';shown=false}return}
    if(!shown){canvas.style.visibility='visible';shown=true}
    theme(heroVis?0:1);
    const t=REDUCE?0:(now-t0)/1000;
    px+=(tx-px)*.06; py+=(ty-py)*.06;
    const p=heroVis?clamp(-hr.top/Math.max(1,hr.height)):0;         // hero scroll progress
    const q=studioVis?clamp((H-sr.top)/(H+sr.height)):0;            // studio scroll progress
    shape(t*.55+p*6+q*8);
    const scan=((t*9+p*40+q*50)%NZ+NZ)%NZ, lineC=dark?C.light:C.ink, accent=dark?C.film:C.code, base=dark?.26:.42;
    for(let j=0;j<NZ;j++){const dj=Math.min(Math.abs(j-(NZ-1-scan)),3)/3;rows[j].m.color.copy(accent).lerp(lineC,dj);rows[j].m.opacity=base+(1-dj)*.5}
    const vis=2*8*Math.tan(25*Math.PI/180), visW=vis*camera.aspect, narrow=camera.aspect<.9;
    camera.position.set(px*1.3,2.5+p*4.2-py*.5,8-p*2.5);
    camera.lookAt(px*.3,2.7-p*3.4,0);
    if(heroVis){
      if(narrow)anchor(kHero);
      else{K.visible=true;K.position.set(Math.min(visW*.27,4.4),2.9+p*3.2+Math.sin(t*.8)*.08,0);K.scale.setScalar(1.25*(1-p*.35))}
      K.rotation.set(-.12+py*.5+p*.8,-.5+px*1.1+Math.sin(t*.45)*.22+p*Math.PI*1.6,.04);
    }else{
      if(narrow)anchor(kStudio);
      else{K.visible=true;K.position.set(Math.min(visW*.3,5),3.4-q*1.6,-.5);K.scale.setScalar(1.5)}
      if(narrow)K.rotation.set(-.08,-.45+Math.sin(t*.7)*.5,.03);
      else K.rotation.set(-.1+py*.4,-.6+px*.9+q*Math.PI*2+t*.25,.04);
    }
    renderer.render(scene,camera);
  }
  requestAnimationFrame(frame);
})();
