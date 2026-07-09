 // --- Navigation Logic ---
        function transitionTo(pageId) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            const target = document.getElementById(pageId);
            target.classList.add('active');

            if (pageId === 'curtain-page') {
                setTimeout(() => {
                    document.getElementById('stage').classList.add('open');
                    startSparkles('message-card');
                }, 1000);
            }
        function createHeart(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            const heart = document.createElement('div');
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = '-10vh';
            heart.style.color = 'var(--accent)';
            heart.innerHTML = '❤️';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.animation = `floatHeart ${Math.random() * 3 + 3}s linear forwards`;
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 6000);
        }

        setInterval(() => createHeart('particle-container'), 300);
        setInterval(() => createHeart('slider-particles'), 400);

        // --- Slider Logic ---
        function nextStep(step) {
            document.querySelectorAll('.step-content').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
            document.getElementById(`step-${step}`).classList.add('active');
            document.getElementById(`dot-${step}`).classList.add('active');
        }

        function finishSlider() {
            transitionTo('celebration-page');
        }

        let celebStep = 1;
        function celebFlow() {
            const btn = document.getElementById('celeb-master-btn');
            const hint = document.getElementById('celeb-hint');
            const page = document.getElementById('celebration-page');
            const lights = document.getElementById('fairy-lights-container');

            if (celebStep === 1) {
                page.classList.add('bright');
                lights.style.opacity = '1';
                hint.innerText = "Music makes it better...";
                btn.innerText = "🎵 Play Music";
                celebStep = 2;
            } else if (celebStep === 2) {
                const audio = document.getElementById('birthday-audio');
                audio.play().catch(() => { });
                hint.innerText = "Let the colors fly!";
                btn.innerText = "🎈 Fly Balloons";
                celebStep = 3;
            } else if (celebStep === 3) {
                spawnBalloons(document.body);
                hint.innerText = "Almost there...";
                btn.innerText = "✨ Time to celebrate!";
                celebStep = 4;
            } else {
                transitionTo('curtain-page');
            }
        }

        function spawnBalloons(targetContainer) {
            const colorGradients = [
                ['#ff2d55', '#800020'], ['#74b9ff', '#0984e3'],
                ['#55efc4', '#00b894'], ['#ffeaa7', '#fdcb6e'],
                ['#a29bfe', '#6c5ce7'], ['#ff9ff3', '#f368e0']
            ];

            const interval = setInterval(() => {
                const b = document.createElement('div');
                const shine = document.createElement('div');
                b.classList.add('balloon');
                shine.classList.add('balloon-shine');
                const gradient = colorGradients[Math.floor(Math.random() * colorGradients.length)];
                b.style.left = Math.random() * 95 + 'vw';
                b.style.background = `radial-gradient(circle at 70% 30%, ${gradient[0]}, ${gradient[1]})`;
                b.style.boxShadow = `inset -10px -10px 20px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.2)`;
                b.appendChild(shine);
                targetContainer.appendChild(b);
                setTimeout(() => b.remove(), 8000);
            }, 400);
            setTimeout(() => clearInterval(interval), 6000);
        }

        const cv = document.getElementById('c');
const wrap = document.getElementById('w');
const g = cv.getContext('2d');

let W, H, SCALE, CX;
const BASE_W = 600;
const BASE_H = 700;

function resizeCanvas(){
  const wrap = document.getElementById('w');
  const rect = wrap.getBoundingClientRect();

  cv.width = rect.width;
  cv.height = rect.height;

  W = cv.width;
  H = cv.height;
  CX = W/2;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

  // reset transform
  g.setTransform(1, 0, 0, 1, 0, 0);

  // scale everything
  g.scale(SCALE, SCALE);


resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const π = Math.PI;
let T = 0;

const bokeh=[];
for(let i=0;i<55;i++)bokeh.push({
  x:Math.random()*W,y:Math.random()*H,
  r:6+Math.random()*28,
  hue:[320,340,30,280,15][Math.floor(Math.random()*5)],
  a:Math.random()*0.07+0.02,
  sp:0.15+Math.random()*0.25,
  ph:Math.random()*π*2
});

const P={
  cream:'#fff8f0',
  blush:'#f9d5e5',
  rose:'#e8a0b4',
  deepRose:'#c4607a',
  gold:'#e8c06a',
  deepGold:'#b8860b',
  ivory:'#fef6e4',
  mauve:'#9b5874',
  dark:'#2a1020',
};

const TIERS=[
  {by:508,w:370,h:82,wallTop:'#f0c8d8',wallMid:'#e8b4c8',wallBot:'#d090a8',topCol:'#fce8f0'},
  {by:426,w:278,h:82,wallTop:'#fde8d0',wallMid:'#f8d4b8',wallBot:'#e8b898',topCol:'#fff0e4'},
  {by:344,w:196,h:82,wallTop:'#e8d8f4',wallMid:'#d8c0ec',wallBot:'#c0a0d8',topCol:'#f0e8fc'},
];
const GOLD_DRIP_DONE=[false,false,false];
let tierP=[0,0,0]; 
let dripP=[0,0,0]; 
let roseP=0; 
let candleP=0;  
let ribbonP=0;         
let textP=0;            
let confettiArr=[];
let confettiFired=false;

const easeOutElastic=t=>{
  if(t===0||t===1)return t;
  return Math.pow(2,-10*t)*Math.sin((t*10-0.75)*(2*π/3))+1;
};
const easeOutCubic=t=>1-Math.pow(1-t,3);
const easeOutBack=t=>{const c=1.70158;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2);};
const easeInOutSine=t=>-(Math.cos(π*t)-1)/2;

function drawBG(){
  const bg=g.createRadialGradient(CX,H*0.6,0,CX,H*0.5,H*0.8);
  bg.addColorStop(0,'#2d1030');
  bg.addColorStop(0.5,'#1a0820');
  bg.addColorStop(1,'#0d0410');
  g.fillStyle=bg;g.fillRect(0,0,W,H);
 
  for(const b of bokeh){
    b.y-=b.sp;if(b.y+b.r<0)b.y=H+b.r;
    const pulse=0.5+0.5*Math.sin(T*0.02+b.ph);
    const bg2=g.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
    bg2.addColorStop(0,`hsla(${b.hue},80%,85%,${b.a*(0.6+pulse*0.4)})`);
    bg2.addColorStop(1,'rgba(0,0,0,0)');
    g.fillStyle=bg2;g.fillRect(b.x-b.r,b.y-b.r,b.r*2,b.r*2);
  }
}

function drawTable(alpha=1){
  g.save();g.globalAlpha=alpha;
  // shadow
  const sh=g.createRadialGradient(CX,535,0,CX,535,260);
  sh.addColorStop(0,'rgba(0,0,0,0.55)');sh.addColorStop(1,'rgba(0,0,0,0)');
  g.fillStyle=sh;g.fillRect(0,490,W,150);
 }

function drawTier(tier,p,dripAmt,ribbonAmt){
  if(p<=0)return;
  const{by,w,h,wallTop,wallMid,wallBot,topCol}=tier;
  const ep=easeOutElastic(Math.min(p,1));
  const dy=(1-ep)*-440;
  const alpha=Math.min(p*4,1);
  g.save();g.globalAlpha=alpha;g.translate(0,dy);

  const bx=CX-w/2,rx=w/2,ellH=20;

  const wg=g.createLinearGradient(bx,by,bx+w,by);
  wg.addColorStop(0,wallBot);wg.addColorStop(0.1,wallMid);
  wg.addColorStop(0.45,wallTop);wg.addColorStop(0.55,wallTop);
  wg.addColorStop(0.9,wallMid);wg.addColorStop(1,wallBot);
  g.fillStyle=wg;
  g.beginPath();
  g.moveTo(bx,by);g.lineTo(bx+w,by);
  // bottom ellipse
  g.ellipse(CX,by+h,rx,ellH,0,0,π);
  g.lineTo(bx,by);
  g.fill();
  const sg=g.createLinearGradient(bx,by,bx+w*0.35,by);
  sg.addColorStop(0,'rgba(255,255,255,0)');
  sg.addColorStop(0.5,'rgba(255,255,255,0.12)');
  sg.addColorStop(1,'rgba(255,255,255,0)');
  g.fillStyle=sg;
  g.beginPath();g.moveTo(bx,by);g.lineTo(bx+w,by);
  g.ellipse(CX,by+h,rx,ellH,0,0,π);g.lineTo(bx,by);g.fill();
  if(ribbonAmt>0){
    const ry2=by+h*0.5;
    g.save();g.globalAlpha=ribbonAmt*alpha;
    g.beginPath();g.moveTo(bx+4,ry2-7);g.lineTo(bx+w-4,ry2-7);
    g.lineTo(bx+w-4,ry2+7);g.lineTo(bx+4,ry2+7);g.closePath();
    const rg2=g.createLinearGradient(bx,ry2,bx+w,ry2);
    rg2.addColorStop(0,'rgba(232,192,106,0.0)');
    rg2.addColorStop(0.05,'rgba(232,192,106,0.6)');
    rg2.addColorStop(0.5,'rgba(248,220,140,0.9)');
    rg2.addColorStop(0.95,'rgba(232,192,106,0.6)');
    rg2.addColorStop(1,'rgba(232,192,106,0.0)');
    g.fillStyle=rg2;g.fill();
    // ribbon shimmer line
    g.beginPath();g.moveTo(bx+4,ry2-1);g.lineTo(bx+w-4,ry2-1);
    g.strokeStyle='rgba(255,248,220,0.5)';g.lineWidth=1;g.stroke();
    g.restore();
  }
  const tg2=g.createRadialGradient(CX-w*0.1,by,0,CX,by,rx);
  tg2.addColorStop(0,'#fff');tg2.addColorStop(0.3,topCol);
  tg2.addColorStop(1,wallTop);
  g.fillStyle=tg2;
  g.beginPath();g.ellipse(CX,by,rx,ellH,0,0,π*2);g.fill();
  // top specular
  g.beginPath();g.ellipse(CX-rx*0.18,by-3,rx*0.28,5,0,0,π*2);
  g.fillStyle='rgba(255,255,255,0.35)';g.fill();
  if(dripAmt>0) drawGoldDrip(CX,by,rx,ellH,dripAmt);
  g.beginPath();g.ellipse(CX,by+h,rx,ellH,0,0,π*2);
  const bg3=g.createRadialGradient(CX,by+h,rx*0.3,CX,by+h,rx);
  bg3.addColorStop(0,wallMid);bg3.addColorStop(1,wallBot);
  g.fillStyle=bg3;g.fill();
  g.beginPath();g.ellipse(CX,by+h,rx,ellH,0,0,π*2);
  g.strokeStyle='rgba(0,0,0,0.12)';g.lineWidth=1;g.stroke();
  g.restore();
}
function drawGoldDrip(cx,by,rx,ry,amt){
  const dripDefs=[
    {a:-0.7,len:28,w:7},{a:0.3,len:22,w:5},{a:π-0.4,len:32,w:8},
    {a:π+0.6,len:18,w:5},{a:0.9,len:26,w:6},{a:-π+0.2,len:24,w:6},
    {a:1.8,len:20,w:5},{a:-2.2,len:30,w:7},{a:2.5,len:16,w:4},
  ];
  for(const d of dripDefs){
    const ex=cx+Math.cos(d.a)*rx;
    const ey=by+Math.sin(d.a)*ry;
    const dLen=d.len*Math.min(amt*1.5,1);
    if(dLen<=0)continue;
    g.save();
    g.shadowColor='rgba(184,134,11,0.4)';g.shadowBlur=8;
    const dg=g.createLinearGradient(ex,ey,ex,ey+dLen);
    dg.addColorStop(0,'#f5d878');dg.addColorStop(0.6,'#e8c060');
    dg.addColorStop(1,'#c8980a');
    g.fillStyle=dg;
    g.beginPath();
    g.moveTo(ex-d.w/2,ey);
    g.quadraticCurveTo(ex-d.w*0.7,ey+dLen*0.7,ex,ey+dLen);
    g.quadraticCurveTo(ex+d.w*0.7,ey+dLen*0.7,ex+d.w/2,ey);
    g.fill();
    g.fillStyle='rgba(255,248,200,0.5)';
    g.beginPath();g.ellipse(ex-1,ey+4,1.5,4,0,0,π*2);g.fill();
    g.restore();
  }
  g.save();
  g.globalAlpha=Math.min(amt*2,1);
  g.beginPath();g.ellipse(cx,by,rx,ry,0,0,π*2);
  g.strokeStyle='rgba(232,192,106,0.85)';g.lineWidth=3;g.stroke();
  // inner gold shine
  g.beginPath();g.ellipse(cx,by,rx-3,ry-2,0,0,π*2);
  g.strokeStyle='rgba(255,240,160,0.35)';g.lineWidth=1.5;g.stroke();
  g.restore();
}
function drawRose(cx,cy,size,hue,bloom){
  if(bloom<=0)return;
  const bp=easeOutBack(Math.min(bloom,1));
  g.save();g.translate(cx,cy);g.scale(bp,bp);
  const petalLayers=[
    {count:8,r:size,pSize:size*0.52,col:`hsl(${hue},70%,72%)`},
    {count:6,r:size*0.62,pSize:size*0.42,col:`hsl(${hue},75%,62%)`},
    {count:5,r:size*0.36,pSize:size*0.32,col:`hsl(${hue},80%,54%)`},
    {count:1,r:0,pSize:size*0.16,col:`hsl(${hue},85%,42%)`},
  ];
  for(const layer of petalLayers){
    for(let i=0;i<layer.count;i++){
      const a=(i/layer.count)*π*2+(layer.r*0.05);
      const px=Math.cos(a)*layer.r,py=Math.sin(a)*layer.r;
      g.save();g.translate(px,py);g.rotate(a+π/2);
      g.beginPath();
      g.moveTo(0,layer.pSize*0.5);
      g.bezierCurveTo(-layer.pSize*0.5,layer.pSize*0.2,-layer.pSize*0.4,-layer.pSize*0.3,0,-layer.pSize*0.5);
      g.bezierCurveTo(layer.pSize*0.4,-layer.pSize*0.3,layer.pSize*0.5,layer.pSize*0.2,0,layer.pSize*0.5);
      const pg2=g.createRadialGradient(0,0,0,0,0,layer.pSize*0.5);
      pg2.addColorStop(0,'rgba(255,255,255,0.4)');
      pg2.addColorStop(0.5,layer.col);
      pg2.addColorStop(1,`hsl(${hue-10},65%,42%)`);
      g.fillStyle=pg2;g.fill();
      g.strokeStyle='rgba(0,0,0,0.06)';g.lineWidth=0.5;g.stroke();
      g.restore();
    }
  }
  g.beginPath();g.arc(0,0,size*0.1,0,π*2);
  g.fillStyle=`hsl(${hue+10},90%,35%)`;g.fill();
  for(let i=0;i<2;i++){
    const la=i===0?π*0.75:π*1.25;
    g.save();g.translate(Math.cos(la)*size*0.7,Math.sin(la)*size*0.7);
    g.rotate(la);
    g.beginPath();
    g.moveTo(0,0);g.bezierCurveTo(-size*0.3,-size*0.5,size*0.3,-size*0.5,0,0);
    g.fillStyle='rgba(60,120,40,0.75)';g.fill();
    g.restore();
  }
  g.restore();
}

function drawAllRoses(p){
  if(p<=0)return;
  const top=TIERS[2];
  const cx=CX,cy=top.by;
  const rosePos=[
    {x:cx,y:cy-4,size:24,hue:340,delay:0},
    {x:cx-28,y:cy+1,size:18,hue:320,delay:0.15},
    {x:cx+28,y:cy+1,size:18,hue:355,delay:0.15},
    {x:cx-14,y:cy-10,size:14,hue:330,delay:0.28},
    {x:cx+14,y:cy-10,size:14,hue:348,delay:0.28},
    {x:cx,y:cy-18,size:11,hue:338,delay:0.4},
    // tier 2 corners
    {x:CX-TIERS[1].w/2+18,y:TIERS[1].by+2,size:14,hue:25,delay:0.5},
    {x:CX+TIERS[1].w/2-18,y:TIERS[1].by+2,size:14,hue:15,delay:0.55},
    {x:CX,y:TIERS[1].by-2,size:12,hue:35,delay:0.6},
    // tier 1 corners
    {x:CX-TIERS[0].w/2+22,y:TIERS[0].by+2,size:16,hue:280,delay:0.65},
    {x:CX+TIERS[0].w/2-22,y:TIERS[0].by+2,size:16,hue:270,delay:0.68},
    {x:CX-60,y:TIERS[0].by+2,size:12,hue:290,delay:0.72},
    {x:CX+60,y:TIERS[0].by+2,size:12,hue:275,delay:0.72},
  ];
  for(const r of rosePos){
    const rp=Math.max(0,(p-r.delay)/(1-r.delay+0.001));
    drawRose(r.x,r.y,r.size,r.hue,rp);
  }
}
const CANDLE_DEF=[
  {ox:-70,hue:340},{ox:-42,hue:30},{ox:-14,hue:200},
  {ox:14,hue:120},{ox:42,hue:280},{ox:70,hue:10},
];
function drawCandles(p){
  if(p<=0)return;
  const top=TIERS[2];
  for(let i=0;i<CANDLE_DEF.length;i++){
    const d=CANDLE_DEF[i];
    const cp=Math.max(0,(p-(i/CANDLE_DEF.length)*0.4)*1.7);
    if(cp<=0)continue;
    const ep=easeOutBack(Math.min(cp,1));
    const cx=CX+d.ox,cy=top.by;
    const dropY=(1-ep)*-100;
    g.save();g.translate(0,dropY);g.globalAlpha=Math.min(cp*3,1);
    drawOneCandle(cx,cy,d.hue);
    g.restore();
  }
}
function drawOneCandle(cx,baseCy,hue){
  const bodyH=44,bodyW=8;
  const topY=baseCy-bodyH;
  const wg=g.createLinearGradient(cx-bodyW/2,topY,cx+bodyW/2,topY);
  wg.addColorStop(0,`hsl(${hue},60%,30%)`);
  wg.addColorStop(0.3,`hsl(${hue},85%,72%)`);
  wg.addColorStop(0.7,`hsl(${hue},85%,72%)`);
  wg.addColorStop(1,`hsl(${hue},60%,30%)`);
  g.fillStyle=wg;
  g.beginPath();g.roundRect(cx-bodyW/2,topY,bodyW,bodyH,[3,3,1,1]);g.fill();
  g.fillStyle='rgba(255,255,255,0.32)';
  g.fillRect(cx-bodyW/2+1.5,topY+6,2.5,bodyH-14);
  g.fillStyle=`hsl(${hue},70%,60%)`;
  g.beginPath();g.moveTo(cx-1.5,topY+10);
  g.quadraticCurveTo(cx-5,topY+22,cx-4,topY+30);
  g.quadraticCurveTo(cx-1.5,topY+26,cx-1.5,topY+10);g.fill();
  g.strokeStyle='rgba(60,40,20,0.9)';g.lineWidth=1.5;
  g.beginPath();g.moveTo(cx,topY);g.lineTo(cx+1,topY-7);g.stroke();
  // flame
  drawFlame(cx+1,topY-7,hue);
}

function drawFlame(x,y,hue){
  const f=Math.sin(T*0.09+hue*0.1)*1.8;
  const f2=Math.cos(T*0.07+hue*0.05)*1.2;
  const fh=16+Math.sin(T*0.06+hue*0.08)*2.5;
  g.save();g.translate(x+f,y);
  const og=g.createRadialGradient(f2*0.3,-fh*0.4,0,0,-fh*0.3,fh*1.3);
  og.addColorStop(0,`hsla(${hue+20},100%,88%,0.9)`);
  og.addColorStop(0.5,`hsla(${hue},100%,65%,0.5)`);
  og.addColorStop(1,'rgba(0,0,0,0)');
  g.beginPath();
  g.moveTo(0,3);
  g.bezierCurveTo(-7,-fh*0.3,-6+f2,-fh*0.85,0,-fh);
  g.bezierCurveTo(6-f2,-fh*0.85,7,-fh*0.3,0,3);
  g.fillStyle=og;g.fill();
  const ig=g.createRadialGradient(0,-fh*0.3,0,0,-fh*0.3,fh*0.42);
  ig.addColorStop(0,'rgba(255,255,240,1)');
  ig.addColorStop(0.6,`hsla(${hue+30},100%,82%,0.8)`);
  ig.addColorStop(1,'rgba(0,0,0,0)');
  g.beginPath();g.ellipse(0,-fh*0.3,3.5,fh*0.4,0,0,π*2);
  g.fillStyle=ig;g.fill();
  g.restore();
  const ha=g.createRadialGradient(x,y,0,x,y,32);
  ha.addColorStop(0,`hsla(${hue+20},100%,75%,0.13)`);
  ha.addColorStop(1,'rgba(0,0,0,0)');
  g.beginPath();g.arc(x,y,32,0,π*2);g.fillStyle=ha;g.fill();
  if(Math.random()<0.1)sparks.push({
    x:x+f,y:y-fh,
    vx:(Math.random()-0.5)*1.5,vy:-0.8-Math.random(),
    life:1,hue,r:1.5
  });
}
const sparks=[];
function updateSparks(){
  for(let i=sparks.length-1;i>=0;i--){
    const s=sparks[i];
    s.x+=s.vx;s.y+=s.vy;s.vy+=0.06;s.life-=0.05;
    if(s.life<=0)sparks.splice(i,1);
  }
}
function drawSparks(){
  for(const s of sparks){
    g.save();g.globalAlpha=s.life*0.9;
    g.beginPath();g.arc(s.x,s.y,s.r*s.life,0,π*2);
    g.fillStyle=`hsl(${s.hue+20},100%,85%)`;g.fill();g.restore();
  }
}
function fireConfetti(){
  if(confettiFired)return;confettiFired=true;
  for(let i=0;i<120;i++){
    const hue=[340,30,200,120,280,50,10][Math.floor(Math.random()*7)];
    confettiArr.push({
      x:CX+(Math.random()-0.5)*200,
      y:TIERS[2].by-60,
      vx:(Math.random()-0.5)*8,
      vy:-6-Math.random()*7,
      r:3+Math.random()*4,
      hue,life:1,
      rot:Math.random()*π*2,
      rotV:(Math.random()-0.5)*0.25,
      shape:Math.random()<0.5?'rect':'circle',
      w:4+Math.random()*8,h:3+Math.random()*4,
    });
  }
}
function updateConfetti(){
  for(let i=confettiArr.length-1;i>=0;i--){
    const c=confettiArr[i];
    c.x+=c.vx;c.y+=c.vy;c.vy+=0.18;c.vx*=0.99;
    c.rot+=c.rotV;c.life-=0.007;
    if(c.life<=0||c.y>H+20)confettiArr.splice(i,1);
  }
}
function drawConfetti(){
  for(const c of confettiArr){
    g.save();g.globalAlpha=c.life;
    g.translate(c.x,c.y);g.rotate(c.rot);
    g.fillStyle=`hsl(${c.hue},90%,72%)`;
    if(c.shape==='circle'){g.beginPath();g.ellipse(0,0,c.r,c.r*0.5,0,0,π*2);g.fill();}
    else g.fillRect(-c.w/2,-c.h/2,c.w,c.h);
    g.restore();
  }
}
function drawText(p){
  if(p<=0)return;
  const ep=easeOutCubic(Math.min(p,1));
  g.save();g.globalAlpha=ep;
  g.textAlign='center';
  g.shadowColor='rgba(232,160,180,0.8)';g.shadowBlur=25;
  const tg=g.createLinearGradient(CX-180,58,CX+180,58);
  tg.addColorStop(0,'#e8c06a');tg.addColorStop(0.3,'#fff0e8');
  tg.addColorStop(0.7,'#fff0e8');tg.addColorStop(1,'#e8c06a');
  g.fillStyle=tg;
  g.font=`bold 34px "Palatino Linotype",Palatino,Georgia,serif`;
  g.fillText('Happy Birthday, Parioo',CX,66);
  g.shadowBlur=12;
  g.font=`italic 15px Georgia,serif`;
  g.fillStyle='rgba(255,220,200,0.75)';
  g.letterSpacing='4px';
  g.fillText('✦   love you so much  ✦',CX,94);
  g.restore();
}
function tick(){
  T++;
  if(T>20)  tierP[0]=Math.min(tierP[0]+0.024,1);
  if(T>55)  tierP[1]=Math.min(tierP[1]+0.024,1);
  if(T>90)  tierP[2]=Math.min(tierP[2]+0.024,1);
  if(T>130) dripP[0]=Math.min(dripP[0]+0.022,1);
  if(T>150) dripP[1]=Math.min(dripP[1]+0.022,1);
  if(T>168) dripP[2]=Math.min(dripP[2]+0.022,1);
  if(T>195) ribbonP=Math.min(ribbonP+0.025,1);
  if(T>220) roseP=Math.min(roseP+0.012,1);
  if(T>270) candleP=Math.min(candleP+0.016,1);
  if(T>310) textP=Math.min(textP+0.025,1);
  if(T===320) fireConfetti();

  g.clearRect(0, 0, BASE_W, BASE_H);
  drawBG();
  drawTable(easeOutCubic(Math.min(tierP[0]*2,1)));
  for(let i=0;i<3;i++) drawTier(TIERS[i],tierP[i],dripP[i],ribbonP);

  drawAllRoses(roseP);
  drawCandles(candleP);
  updateSparks();drawSparks();
  updateConfetti();drawConfetti();
  drawText(textP);

  requestAnimationFrame(tick);
}
setTimeout(() => {
  tick();
}, 10000);
function goToNextPage() {
    transitionTo('heart-page');
    setTimeout(() => {
        initHeartAnimation();
    }, 500);
}
window.requestAnimationFrame =
    window.__requestAnimationFrame ||
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        (function () {
            return function (callback, element) {
                var lastTime = element.__lastTime;
                if (lastTime === undefined) {
                    lastTime = 0;
                }
                var currTime = Date.now();
                var timeToCall = Math.max(1, 33 - (currTime - lastTime));
                window.setTimeout(callback, timeToCall);
                element.__lastTime = currTime + timeToCall;
            };
        })();

var heartAnimationLoaded = false;

function initHeartAnimation() {
    if (heartAnimationLoaded) return;
    heartAnimationLoaded = true;
    
    var canvas = document.getElementById('heart');
    if (!canvas) return;
    
    var ctx = canvas.getContext('2d');
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    var rand = Math.random;
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, width, height);

    var heartPosition = function (rad) {
        return [Math.pow(Math.sin(rad), 3), -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad))];
    };
    var scaleAndTranslate = function (pos, sx, sy, dx, dy) {
        return [dx + pos[0] * sx, dy + pos[1] * sy];
    };

    window.addEventListener('resize', function () {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, width, height);
    });

    var traceCount = 60;
    var size1 = 210;
    var size2 = 13;
    var size11 = 150;
    var size12 = 9;
    var pointsOrigin = [];
    var i;
    var dr = 0.1;
    for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), size1, size2, 0, 0));
    for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), size11, size12, 0, 0));
    for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
    var heartPointsCount = pointsOrigin.length;

    var targetPoints = [];
    var pulse = function (kx, ky) {
        for (i = 0; i < pointsOrigin.length; i++) {
            targetPoints[i] = [];
            targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
            targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
        }
    };

    var e = [];
    for (i = 0; i < heartPointsCount; i++) {
        var x = rand() * width;
        var y = rand() * height;
        e[i] = {
            vx: 0,
            vy: 0,
            R: 2,
            speed: rand() + 5,
            q: ~~(rand() * heartPointsCount),
            D: 2 * (i % 2) - 1,
            force: 0.2 * rand() + 0.7,
            f: "hsla(0," + ~~(40 * rand() + 60) + "%," + ~~(60 * rand() + 20) + "%,.3)",
            trace: []
        };
        for (var k = 0; k < traceCount; k++) e[i].trace[k] = {x: x, y: y};
    }

    var config = {
        traceK: 0.4,
        timeDelta: 0.01
    };

    var time = 0;
    var loop = function () {
        var n = -Math.cos(time);
        pulse((1 + n) * .5, (1 + n) * .5);
        time += ((Math.sin(time)) < 0 ? 9 : (n > 0.8) ? .2 : 1) * config.timeDelta;
        ctx.fillStyle = "rgba(0,0,0,.1)";
        ctx.fillRect(0, 0, width, height);
        for (i = e.length; i--;) {
            var u = e[i];
            var q = targetPoints[u.q];
            var dx = u.trace[0].x - q[0];
            var dy = u.trace[0].y - q[1];
            var length = Math.sqrt(dx * dx + dy * dy);
            if (10 > length) {
                if (0.95 < rand()) {
                    u.q = ~~(rand() * heartPointsCount);
                }
                else {
                    if (0.99 < rand()) {
                        u.D *= -1;
                    }
                    u.q += u.D;
                    u.q %= heartPointsCount;
                    if (0 > u.q) {
                        u.q += heartPointsCount;
                    }
                }
            }
            u.vx += -dx / length * u.speed;
            u.vy += -dy / length * u.speed;
            u.trace[0].x += u.vx;
            u.trace[0].y += u.vy;
            u.vx *= u.force;
            u.vy *= u.force;
            for (k = 0; k < u.trace.length - 1;) {
                var T = u.trace[k];
                var N = u.trace[++k];
                N.x -= config.traceK * (N.x - T.x);
                N.y -= config.traceK * (N.y - T.y);
            }
            ctx.fillStyle = u.f;
            for (k = 0; k < u.trace.length; k++) {
                ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
            }
        }
        window.requestAnimationFrame(loop, canvas);
    };
    loop();
}}