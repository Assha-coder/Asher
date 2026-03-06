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
let interestStarted = false;

if(interestSection){

  const interestObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && !interestStarted){
        interestStarted = true;

        // Step 1: title fades in big + centered
        setTimeout(()=>{
          interestSection.classList.add("show");
        }, 300);

        // Step 2: title shrinks to top
        setTimeout(()=>{
          interestSection.classList.add("shrink");
        }, 1400);

        // Step 3: images reveal AFTER title has settled
        setTimeout(()=>{
          interestSection.classList.add("images-show");
        }, 2500);
      }
    });
  },{threshold:0.4});

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

if(card){
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 14;
    const rotateY = (centerX - x) / 14;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.boxShadow = `${-rotateY*2}px ${rotateX*2}px 50px rgba(0,0,0,0.4)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
    card.style.boxShadow = "";
  });
}

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
desc:"My elementary school years (Grade 1-2)."
},
{
img:"images/education/pitogo.jfif",
title:"Pitogo Elementary School",
desc:"Part of my academic journey (Grade 3-4)."
},
{
img:"images/education/puguis.jpg",
title:"Puguis Elementary School",
desc:"Where I continued my studies (Grade 5-6)."
},
{
img:"images/education/wangal.jpg",
title:"Benguet National High School",
desc:"Another step in my education (Grade 7)."
},
{
img:"images/education/bernardo.jpg",
title:"Bernardo Lirio Memorial National High School",
desc:"A later stage of my studies (Grade 8-10)."
},
{
img:"images/education/fidelis.png",
title:"Fidelis Senior High School",
desc:"My most recent school (Grade 11)."
}
];

let eduIndex = 0;
let eduAnimating = false;

const eduImage = document.getElementById("eduImage");
const eduTitle = document.getElementById("eduTitle");
const eduDesc = document.getElementById("eduDesc");
const eduWrapper = document.querySelector(".edu-image-wrapper");

const nextBtn = document.querySelector(".edu-btn.next");
const prevBtn = document.querySelector(".edu-btn.prev");

function showEduImage(direction = "next"){
  if(!eduImage || !eduWrapper || eduAnimating) return;
  eduAnimating = true;

  const outClass = direction === "next" ? "slide-out" : "slide-in-reverse";
  eduWrapper.classList.add(outClass);

  setTimeout(()=>{
    const slide = eduSlides[eduIndex];
    eduImage.src = slide.img;
    if(eduTitle) eduTitle.textContent = slide.title;
    if(eduDesc)  eduDesc.textContent  = slide.desc;

    eduWrapper.classList.remove(outClass);
    eduWrapper.classList.add("slide-in");

    // force reflow
    eduWrapper.offsetWidth;

    setTimeout(()=>{
      eduWrapper.classList.remove("slide-in");
      eduAnimating = false;
    }, 450);

  }, 300);
}

if(nextBtn){
  nextBtn.addEventListener("click", ()=>{
    eduIndex = (eduIndex + 1) % eduSlides.length;
    showEduImage("next");
  });
}

if(prevBtn){
  prevBtn.addEventListener("click", ()=>{
    eduIndex = (eduIndex - 1 + eduSlides.length) % eduSlides.length;
    showEduImage("prev");
  });
}

// show first slide (no animation on first load)
(function initFirstSlide(){
  if(!eduImage) return;
  const s = eduSlides[0];
  eduImage.src = s.img;
  if(eduTitle) eduTitle.textContent = s.title;
  if(eduDesc)  eduDesc.textContent  = s.desc;
})();

// =============================
// EDUCATION SECTION ENTRANCE
// =============================

const eduSection = document.getElementById("Education");
const eduRows   = document.querySelectorAll(".edu-row");
let eduStarted  = false;

if(eduSection){
  const eduObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && !eduStarted){
        eduStarted = true;

        // show edu-side card
        eduSection.classList.add("edu-show");

        // stagger-sweep each row in
        eduRows.forEach((row, i)=>{
          setTimeout(()=>{
            row.classList.add("edu-entered");

            // after entrance animation ends → switch to infinite loop
            const track = row.querySelector(".edu-track");
            const enterDuration = (3 + i * 0.4) * 1000;
            setTimeout(()=>{
              if(track) track.classList.add("edu-loop");
            }, enterDuration);

          }, i * 200);
        });
      }
    });
  },{threshold:0.2});

  eduObserver.observe(eduSection);
}

/* =============================
   GOALS SECTION ANIMATION
============================= */

const goalsSection = document.querySelector(".goals");
const goalsTitle = document.querySelector(".goals-title");
let goalsStarted = false;

if(goalsSection){
  const goalsObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && !goalsStarted){
        goalsStarted = true;
        animateGoals();
      }
    });
  },{threshold:0.3});

  goalsObserver.observe(goalsSection);
}

function animateGoals(){

  if(!goalsTitle) return;

  goalsTitle.classList.add("title-appear");

  setTimeout(()=>{
    goalsTitle.classList.add("title-settle");
  }, 600);

  setTimeout(()=>{
    goalsSection.classList.add("goals-show");
  }, 700);

}

/* =============================
   CONTACT SECTION ANIMATION
============================= */

const contactSection = document.getElementById("contact");
let contactStarted = false;

if(contactSection){
  const contactObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && !contactStarted){
        contactStarted = true;

        // Phase 1: "REACH OUT." slams in
        contactSection.classList.add("contact-show");

        // Phase 2: after 1.4s → lines draw + boxes slide in
        setTimeout(()=>{
          contactSection.classList.add("contact-phase2");
        }, 1400);
      }
    });
  },{threshold:0.25});

  contactObserver.observe(contactSection);
}
