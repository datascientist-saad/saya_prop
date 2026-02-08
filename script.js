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

  // Open premium popup after the flip to feel “premium”
  if(flipped){
    setTimeout(openModal, 650);
  }
}

function openModal(){
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

cardBtn.addEventListener("click", flipCard);
cardBtn.addEventListener("touchstart", flipCard, { passive: true });

modalBackdrop.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);

// Confetti (simple burst)
function confettiBurst(){
  const c = document.getElementById("confetti");
  const ctx = c.getContext("2d");
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  const pieces = 220;
  const arr = [];
  for(let i=0;i<pieces;i++){
    arr.push({
      x: Math.random() * c.width,
      y: -20 - Math.random()*c.height*0.2,
      w: 4 + Math.random()*6,
      h: 4 + Math.random()*8,
      vy: 3 + Math.random()*6,
      vx: -2 + Math.random()*4,
      r: Math.random()*Math.PI,
      vr: -0.2 + Math.random()*0.4,
      color: `hsl(${Math.random()*360},100%,70%)`
    });
  }

  let frames = 0;
  function draw(){
    frames++;
    ctx.clearRect(0,0,c.width,c.height);
    for(const p of arr){
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;

      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    }

    // stop after ~1.2s
    if(frames < 72){
      requestAnimationFrame(draw);
    }else{
      ctx.clearRect(0,0,c.width,c.height);
    }
  }
  draw();
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
  h.innerHTML = "❤️";
  h.style.left = Math.random()*100 + "vw";
  h.style.fontSize = (12 + Math.random()*26) + "px";
  h.style.opacity = (0.55 + Math.random()*0.4).toFixed(2);
  hearts.appendChild(h);
  setTimeout(()=>h.remove(), 6000);
}, 320);

// Typewriter
const text = document.querySelector(".type");
let i = 0;
const str = text.innerHTML;
text.innerHTML = "";
const typing = setInterval(()=>{
  if(i < str.length){
    text.innerHTML += str[i];
    i++;
  } else {
    clearInterval(typing);
  }
}, 65);

// Resize confetti canvas on orientation change
window.addEventListener("resize", () => {
  const c = document.getElementById("confetti");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
});