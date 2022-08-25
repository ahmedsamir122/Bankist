'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover',(e) => {
   let link = e.target.closest('.nav__link');
   const img = document.querySelector('.nav__logo')
  //  console.log(link);
   if (!link) return;
   const links = document.querySelectorAll('.nav__link');
   links.forEach(l => l.style.opacity=0.5);
   img.style.opacity = 0.5;
   link.style.opacity = 1;
   
})
nav.addEventListener('mouseout',(e) => {
   let link = e.target.closest('.nav__link');
  //  console.log(link);
   if (!link) return;
   const links = document.querySelectorAll('.nav__link');
   const img = document.querySelector('.nav__logo')
   links.forEach(l => l.style.opacity=1);  
   link.style.opacity = 1;
   img.style.opacity = 1;
})

document.querySelector('.nav__links').addEventListener('click',(e) => {
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    console.log(e.target);
    const id = e.target.getAttribute('href');
    console.log(id);
    let element = document.querySelector(id);
    element.scrollIntoView({behavior : 'smooth'});
  }
})

document.querySelector('.operations__tab-container').addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e.target);
  let clicked = e.target.closest('.operations__tab');
  if(clicked){
    const tabs = document.querySelectorAll('.operations__tab');
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');
    console.log(e.target);
    const contents = document.querySelectorAll('.operations__content');
    contents.forEach(con=> con.classList.remove('operations__content--active'))
    let x = clicked.dataset.tab;
    console.log(x);
    let texts = document.querySelectorAll('.operations__content');
    texts.forEach(text => {
      if (text.classList.contains(`operations__content--${x}`)){
        text.classList.add('operations__content--active');
      }
    })
  }
})
const lazyImgs = document.querySelectorAll('img[data-src]')
const obsCall = (entries, observer) => {
  entries.forEach(entry => {
    
    if(entry.isIntersecting){
      lazyImgs.forEach(img => {
        let imgBig = img.dataset.src;
        img.setAttribute('src',imgBig);
        console.log(img.dataset.src);
        console.log(entry);
        img.classList.remove('lazy-img');

        sections.forEach(sec => {
          observer.unobserve(sec);
        })
      })
    }

  })
};
const appSec = (entries, observer) => {
  entries.forEach(entry => {
    
            
     
          if(entry.isIntersecting){  
          entry.target.classList.remove('section--hidden');
          // sections.forEach(sec => {
          //   observer.unobserve(sec);
          // })
        }    
        
  })
};
const observer = new IntersectionObserver(obsCall , {
  root : null,
  threshold : 0,
});
const appear = new IntersectionObserver(appSec , {
  root : null,
  threshold : 0.1,
});

const sections = document.querySelectorAll('section');
sections.forEach(sec => {
  sec.classList.add('section--hidden');
  observer.observe(sec);
  appear.observe(sec)
})

const header = document.querySelector('.header');
const nav1 = document.querySelector('.nav');


const headerCall = (entries,observer1) => {
  entries.forEach(entry => {
    
    if(!entry.isIntersecting){
      nav1.classList.add('sticky');
      console.log(entry);
      // observer1.unobserve(header);
    }
    else{
      nav1.classList.remove('sticky');
      console.log(entry);
    }
  })
};
let height = getComputedStyle(nav1).height;
const observer1 = new IntersectionObserver(headerCall , {
  root : null,
  threshold : 0,
  rootMargin:`-${height}`,
});

observer1.observe(header);

// ------- slides -------
const slides = document.querySelectorAll('.slide');
const rightBtn = document.querySelector('.slider__btn--right');
const leftBtn = document.querySelector('.slider__btn--left');

let z;
slides.forEach( (slide,i) => {
  z=(i-1)*100;
   slide.style.transform = `translateX(${z}%)`;
});
let click = 1;
  // -------function to set active ------
  
const activeSlide = function(click)  {
  document.querySelectorAll('.dots__dot').forEach(function(dt) {
    dt.classList.remove("dots__dot--active")
  });

  let m= document.querySelector(`.dots__dot[data-slide='${click}']`);
  m.classList.add('dots__dot--active');
  console.log( m); 
};
// -------- function to go the slides ------
const goToSlide = function(click){
  slides.forEach( (slide,i) => {

    slide.style.transform=`translateX(${(i-click)*100}%)`;

  });
}
// ------- next slide -------
const nextSlide = function(){
  click++;
  if(click === slides.length)
  click=0;
  goToSlide(click);
  activeSlide(click);
}
// ---------previous slide -------
const previousSlide = function(){
  click--;
  if(click <0){
    click=slides.length-1;
    console.log(click);
  }
  goToSlide(click);
  activeSlide(click);
}
rightBtn.addEventListener('click', nextSlide );
leftBtn.addEventListener('click', previousSlide);

// ------- key button ------
document.addEventListener("keydown",(e) => {
  if(e.key === 'ArrowLeft') nextSlide();
  if(e.key === 'ArrowRight') previousSlide();
  activeSlide(click);
})

let innerDot = `<div class ='dots__dot'></div>`;
let dots = document.querySelector('.dots');
// ------- creat dots -------
slides.forEach((slide,i) => {
  dots.insertAdjacentHTML("beforeend",`<button class="dots__dot" data-slide="${i}"></button>`);
})
document.querySelector(".dots__dot[data-slide='1']").classList.add("dots__dot--active");
// ------- slide with dots -----
document.querySelector('.dots').addEventListener('click',(e) => {
  if(e.target.classList.contains('dots__dot')){

    goToSlide(`${e.target.dataset.slide}`);
    activeSlide(`${e.target.dataset.slide}`);
  }

})
