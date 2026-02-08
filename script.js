const cardInner = document.getElementById("cardInner");
const cardBtn = document.getElementById("cardBtn");

const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeBtn = document.getElementById("closeBtn");

const yesBtn = document.getElementById("yesBtn");
const foreverBtn = document.getElementById("foreverBtn");
const message = document.getElementById("message");

let flipped = false;

function flipCard(){
  flipped = !flipped;
  cardInner.style.transform = flipped ? "rotateY(180deg)" : "rotateY(0deg)";
  if(flipped) setTimeout(openModal, 680);
}

function openModal(){
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}

function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}

cardBtn.addEventListener("click", flipCard);
cardBtn.addEventListener("touchstart", flipCard, { passive:true });

modalBackdrop.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);

// Luxury confetti (animated burst)
function confettiBurst(){
  const c = document.getElementById("confetti");
  const ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;

  const centerX = c.width / 2;
  const centerY = c.height * 0.35;

  const pieces = 260;
  const arr = [];
  for(let i=0;i<pieces;i++){
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 10;
    arr.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      g: 0.18 + Math.random()*0.12,
      w: 4 + Math.random()*6,
      h: 6 + Math.random()*10,
      r: Math.random()*Math.PI,
      vr: -0.25 + Math.random()*0.5,
      life: 80 + Math.random()*40,
      color: `hsl(${Math.random()*360}, 100%, 72%)`
    });
  }

  let frame = 0;
  function tick(){
    frame++;
    ctx.clearRect(0,0,c.width,c.height);

    for(const p of arr){
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.life--;

      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    }

    if(frame < 120){
      requestAnimationFrame(tick);
    }else{
      ctx.clearRect(0,0,c.width,c.height);
    }
  }
  tick();
}

function acceptLove(){
  message.innerHTML = "💞 I choose you — today & always 💞<br/>You made my heart smile 🥹❤️";
  confettiBurst();
}

yesBtn.addEventListener("click", acceptLove);
foreverBtn.addEventListener("click", acceptLove);

// Floating hearts
const hearts = document.querySelector(".hearts");
setInterval(()=>{
  const h = document.createElement("span");
  h.innerHTML = "❤";
  h.style.left = (Math.random()*100) + "vw";
  h.style.fontSize = (12 + Math.random()*26) + "px";
  h.style.opacity = (0.55 + Math.random()*0.4).toFixed(2);
  hearts.appendChild(h);
  setTimeout(()=>h.remove(), 6200);
}, 320);

// Typewriter
const title = document.querySelector(".type");
let i = 0;
const str = title.innerHTML;
title.innerHTML = "";
const typing = setInterval(()=>{
  if(i < str.length){
    title.innerHTML += str[i++];
  }else{
    clearInterval(typing);
  }
}, 60);

addEventListener("resize", () => {
  const c = document.getElementById("confetti");
  c.width = innerWidth;
  c.height = innerHeight;
});

document.addEventListener("click", () => {
  const bgm = document.getElementById("bgm");
  if(bgm) bgm.play().catch(()=>{});
}, { once:true });
