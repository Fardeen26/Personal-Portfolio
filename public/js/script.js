document.getElementById(`Home-jump`).scrollIntoView({ behavior: 'smooth' });
(() => {
    'use strict'
  
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


function typeAnimation() {
    var typed = new Typed('#element', {

        strings: ['Front-End Developer.', 'Back-End Developer.', 'Programmer.', 'Full Stack Developer.'],
        typeSpeed: 60,
        loop: true,
    });
}; typeAnimation();

let gotoLinks = document.querySelectorAll(".gotoLink")

for (let gotoLink of gotoLinks) {
    gotoLink.addEventListener("click", (e) => {
        let text = e.srcElement.innerText;
        document.getElementById(`${text}-jump`).scrollIntoView({ behavior: 'smooth' });
    })
}

let darkModeBtn = document.querySelector(".fa-sun");
let body = document.querySelector("body");
let nav = document.querySelector("nav");
let frontBtns = document.querySelectorAll(".front-btn");
let aboutSection = document.querySelector(".third-flex");
let skillBoxes = document.querySelectorAll(".skill-boxes");
let skillBtns = document.querySelectorAll("#color-white");
let skillImages = document.querySelectorAll(".skill-image");
let frontColors = document.querySelectorAll(".purple");
let footerHeading = document.querySelector(".left");
let cards = document.querySelector("#card");
let cardTexts = document.querySelectorAll(".card-text");
let cardTitles = document.querySelectorAll(".project-links");
let gitLinks = document.querySelectorAll(".git-links");
let brandLogos = document.querySelectorAll(".fa-brands");
let aboutCardTitle = document.querySelector(".about-card-title");
darkModeBtn.addEventListener("click", async (e) => {
    if (e.srcElement.classList.contains("fa-sun")) {
        e.srcElement.classList.replace("fa-sun", "fa-moon");
        body.style.transition = ".5s"
        body.classList.add("bg-black", "color-white");
        nav.classList.add("bg-black", "color-white");
        for (let frontColor of frontColors) {
            frontColor.classList.replace("purple", "purple-black");
        }
        for (let frontBtn of frontBtns) {
            frontBtn.classList.add("purple-black-bg");
        }
        for (let gotoLink of gotoLinks) {
            gotoLink.classList.add("color-white");
        }
        for (let cardText of cardTexts) {
            cardText.classList.add("color-white");
        }
        for (let cardTitle of cardTitles) {
            cardTitle.classList.add("color-white");
        }
        darkModeBtn.classList.add("color-white");
        for (let gitLink of gitLinks) {
            gitLink.classList.add("color-white");
        }
        for(let brandLogo of brandLogos) {
            brandLogo.classList.add('color-white');
        }

        aboutCardTitle.classList.add("color-white");
    }
    else {
        e.srcElement.classList.replace("fa-moon", "fa-sun");
        body.classList.remove("bg-black", "color-white");
        nav.classList.remove("bg-black", "color-white");
        for (let frontColor of frontColors) {
            frontColor.classList.replace("purple-black", "purple");
        }
        for (let frontBtn of frontBtns) {
            frontBtn.classList.remove("purple-black-bg");
        }
        for (let gotoLink of gotoLinks) {
            gotoLink.classList.remove("color-white");
        }
        for (let cardText of cardTexts) {
            cardText.classList.remove("color-white");
        }
        for (let cardTitle of cardTitles) {
            cardTitle.classList.remove("color-white");
        }
        darkModeBtn.classList.remove("color-white");
        for (let gitLink of gitLinks) {
            gitLink.classList.remove("color-white");
        }
        for(let brandLogo of brandLogos) {
            brandLogo.classList.remove('color-white');
        }

        aboutCardTitle.classList.remove("color-white");
    }

});

let btnClose = document.querySelector(".btn-close");
btnClose.addEventListener("click", () => {
    let alertDiv = document.querySelector(".alert-primary");
    console.log("deleted");
    alertDiv.style.display = "none";
});