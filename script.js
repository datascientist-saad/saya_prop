function flipCard(){
document.getElementById("cardInner").style.transform="rotateY(180deg)";
}

function yes(){
document.getElementById("message").innerHTML =
"💞 I love you endlessly 💞<br>You just made me the happiest person alive 🥹❤️";
confetti();
}

// Confetti
function confetti(){
const c=document.getElementById("confetti");
const ctx=c.getContext("2d");
c.width=window.innerWidth;
c.height=window.innerHeight;

for(let i=0;i<150;i++){
ctx.fillStyle=`hsl(${Math.random()*360},100%,70%)`;
ctx.fillRect(Math.random()*c.width,Math.random()*c.height,6,6);
}
}

// Floating hearts
const hearts=document.querySelector(".hearts");
setInterval(()=>{
const h=document.createElement("span");
h.innerHTML="❤️";
h.style.left=Math.random()*100+"vw";
h.style.fontSize=10+Math.random()*30+"px";
hearts.appendChild(h);
setTimeout(()=>h.remove(),6000);
},300);

// Typewriter heading
const text=document.querySelector(".type");
let i=0;
const str=text.innerHTML;
text.innerHTML="";
setInterval(()=>{
if(i<str.length){
text.innerHTML+=str[i];
i++;
}
},100);