/* =============================
   INTRO ANIMATION
============================= */

const helloText = document.getElementById("hello-text");
const intro = document.getElementById("intro");
const home = document.getElementById("home");

const greetings = [
  "Kamusta",
  "Hola",
  "Bonjour",
  "Ciao",
  "Hallo",
  "こんにちは",
  "안녕하세요",
  "Olá",
  "Merhaba",
  "Namaste"
];

let index = 0;

if(helloText){
  helloText.classList.add("show");
  helloText.textContent = greetings[0];
}

function smoothChange(word){

  if(!helloText) return;

  helloText.style.opacity = "0";

  setTimeout(()=>{
    helloText.textContent = word;
    helloText.style.opacity = "1";
  },250);

}

setTimeout(()=>{
  index = 1;
  smoothChange(greetings[index]);

  setTimeout(startSpeedRamp,600);

},1200);

function startSpeedRamp(){

  let speed = 250;

  const interval = setInterval(()=>{

    index = (index + 1) % greetings.length;
    smoothChange(greetings[index]);

    speed -= 25;

    if(speed <= 70){
      clearInterval(interval);
      slowDown();
    }

  },speed);

}

function slowDown(){

  let slowSpeed = 100;

  const slowInterval = setInterval(()=>{

    index = (index + 1) % greetings.length;
    smoothChange(greetings[index]);

    slowSpeed += 60;

    if(slowSpeed >= 450){
      clearInterval(slowInterval);
      landOnFinal();
    }

  },slowSpeed);

}

function landOnFinal(){

  smoothChange("HELLO");

  setTimeout(()=>{

    smoothChange("WORLD");

    setTimeout(()=>{

      if(intro) intro.classList.add("swap");

      setTimeout(()=>{

        if(intro) intro.classList.add("invert");

        setTimeout(()=>{

          if(helloText) helloText.classList.add("zoom");

          setTimeout(()=>{
            if(intro) intro.classList.add("hide");
            if(home) home.classList.add("show");
          },1000);

        },500);

      },600);

    },800);

  },2200);

}


/* =============================
   NAV ACTIVE LINKS
============================= */

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link=>{
  link.addEventListener("click",()=>{
    navLinks.forEach(l=>l.classList.remove("active"));
    link.classList.add("active");
  });
});


/* =============================
   ABOUT DROPDOWN
============================= */

const aboutItem = document.querySelector(".about-item");
const aboutToggle = document.querySelector(".about-toggle");

if(aboutItem && aboutToggle){
  aboutToggle.addEventListener("click",()=>{
    aboutItem.classList.toggle("active");
  });
}


/* =============================
   TYPING EFFECT HOME
============================= */

const words = ["DOCTOR","ARCHITECT","WEB DESIGNER"];
const typingElement = document.getElementById("typing");

if(typingElement){

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect(){

    const currentWord = words[wordIndex];

    if(!isDeleting){

      typingElement.textContent =
      currentWord.substring(0,charIndex+1);

      charIndex++;

      if(charIndex === currentWord.length){
        setTimeout(()=>{ isDeleting = true; },1000);
      }

    }else{

      typingElement.textContent =
      currentWord.substring(0,charIndex-1);

      charIndex--;

      if(charIndex === 0){
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

    }

    setTimeout(typeEffect,isDeleting ? 50 : 100);
  }

  typeEffect();
}


/* =============================
   SCROLL RESET
============================= */

if('scrollRestoration' in history){
  history.scrollRestoration = "manual";
}

window.addEventListener("load",()=>{
  window.scrollTo(0,0);
  history.replaceState(null,null,' ');
});


/* =============================
   ABOUT SECTION ANIMATION
============================= */

const aboutSection = document.querySelector("#about-test");

if(aboutSection){

  const aboutObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){

        setTimeout(()=> aboutSection.classList.add("narrow"),800);
        setTimeout(()=> aboutSection.classList.add("slide-up"),2600);
        setTimeout(()=> aboutSection.classList.add("move-down"),4200);

      }
    });
  },{threshold:0.6});

  aboutObserver.observe(aboutSection);
}


/* =============================
   ACHIEVEMENT SECTION
============================= */

const achTyping = document.getElementById("achTyping");
const achSection = document.getElementById("Achievements");

let achStarted = false;

function startAchTyping(){

  if(!achTyping) return;

  const word = "ACHIEVEMENTS";
  let i = 0;

  achTyping.textContent = "";
  achTyping.style.opacity = "1";

  const typing = setInterval(()=>{

    achTyping.textContent += word[i];
    i++;

    if(i === word.length){
      clearInterval(typing);

      // ROTATE + MOVE TEXT
      setTimeout(()=>{
        achTyping.classList.add("move-right");
      },800);

      // AFTER MOVE → SHOW GALLERY
      setTimeout(()=>{
        if(achSection){
          achSection.classList.add("ach-show-gallery");
          startInfiniteGallery();
        }
      },2000);

    }

  },80);
}


/* Scroll Trigger */

if(achSection){

  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && !achStarted){
        achStarted = true;
        startAchTyping();
      }
    });
  },{threshold:0.6});

  observer.observe(achSection);

}
/* =============================
   TRUE INFINITE SCROLL (NO BREAK)
============================= */

const achTrack = document.querySelector(".ach-track");

function startInfiniteGallery() {

  if (!achTrack) return;

  // duplicate content once
  achTrack.innerHTML += achTrack.innerHTML;

  const singleSetWidth = achTrack.scrollWidth / 2;

  let position = 0;
  const speed = 1; // change for faster/slower

  function animate() {
    position -= speed;

    if (Math.abs(position) >= singleSetWidth) {
      position = 0; // reset EXACT width
    }

    achTrack.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}

/* =============================
   INTEREST TITLE ANIMATION
============================= */

const interestSection = document.querySelector("#interests");

if(interestSection){

  const interestObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){

        setTimeout(()=>{
          interestSection.classList.add("show");
          setTimeout(()=>{
            
    interestSection.classList.add("shrink");
    
  },1300); 
        },500); // delay so first frame is empty

      }
    });
  },{threshold:0.6});

  interestObserver.observe(interestSection);
}
const interestTrack = document.querySelector(".interest-track");

function startInterestSlider(){
  if(!interestTrack) return;

  // duplicate once for seamless loop
  interestTrack.innerHTML += interestTrack.innerHTML;

  const width = interestTrack.scrollWidth / 2;
  let position = 0;
  const speed = 1;

  function animate(){
    position -= speed;

    if(Math.abs(position) >= width){
      position = 0;
    }

    interestTrack.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}

//EDUCATION=======================

const card = document.querySelector(".id-card");

card.addEventListener("mousemove", (e) => {

  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;

  card.style.transform =
    `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});

card.addEventListener("mouseleave", () => {
  card.style.transform = "rotateX(0) rotateY(0)";
});
// =============================
// EDUCATION SLIDESHOW
// =============================

const eduSlides = [
{
img:"images/education/montisory.jpg",
title:"Montessori East Tanauan",
desc:"My early childhood education."
},
{
img:"images/education/fullbright.jpg",
title:"Fullbright Science Elementary School",
desc:"My elementary school years (Grade 1-2) ."
},
{
img:"images/education/pitogo.jpg",
title:"Pitogo Elementary School",
desc:"Part of my academic journey (Grade 3-4)"
},
{
img:"images/education/puguis.jpg",
title:"Puguis Elementary SChool",
desc:"Where I continued my studies (Grade 5-6)"
},
{
img:"images/education/wangal.jpg",
title:"Benguet National High School",
desc:"Another step in my education (Grade 7)"
},
{
img:"images/education/bernardo.jpg",
title:"Bernardo Lirio Memorial National High School",
desc:"A later stage of my studies (Grade 8-10)"
},
{
img:"images/education/fidelis.png",
title:"Fidelis Senior High school",
desc:"My most recent school (Grade 11)"
}
];

let eduIndex = 0;

const eduImage = document.getElementById("eduImage");
const eduTitle = document.getElementById("eduTitle");
const eduDesc = document.getElementById("eduDesc");

const nextBtn = document.querySelector(".edu-btn.next");
const prevBtn = document.querySelector(".edu-btn.prev");

function showEduImage(){

  const slide = eduSlides[eduIndex];

  eduImage.src = slide.img;
  if(eduTitle) eduTitle.textContent = slide.title;
  if(eduDesc) eduDesc.textContent = slide.desc;

}

if(nextBtn){
nextBtn.addEventListener("click", ()=>{

  eduIndex++;

  if(eduIndex >= eduSlides.length){
    eduIndex = 0;
  }

  showEduImage();

});
}

if(prevBtn){
prevBtn.addEventListener("click", ()=>{

  eduIndex--;

  if(eduIndex < 0){
    eduIndex = eduSlides.length - 1;
  }

  showEduImage();

});
}

// show first slide
showEduImage();