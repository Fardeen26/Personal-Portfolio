// document.getElementById(`Home-jump`).scrollIntoView({behavior: 'smooth'});

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

let skillLinks = document.querySelectorAll(".hreflink");
let skillContainer = document.querySelectorAll(".front-end-detail");
skillLinks[0].classList.add("active");

for (let links of skillLinks) {
    links.addEventListener("click", (e) => {

        if (e.srcElement.innerHTML == "Front-End") {
            skillContainer[0].classList.add("display-block")
            skillContainer[1].classList.remove("display-block")
            skillContainer[2].classList.remove("display-block")
            skillLinks[0].classList.add("active");
            skillLinks[1].classList.remove("active");
            skillLinks[2].classList.remove("active");
        }

        else if (e.srcElement.innerHTML == "Back-End") {
            skillContainer[1].classList.add("display-block")
            skillContainer[0].classList.remove("display-block")
            skillContainer[0].classList.add("display-none")
            skillContainer[2].classList.remove("display-block")
            skillLinks[1].classList.add("active");
            skillLinks[0].classList.remove("active");
            skillLinks[2].classList.remove("active");
        }

        else if (e.srcElement.innerHTML == "Others") {
            skillContainer[0].classList.remove("display-block")
            skillContainer[0].classList.add("display-none")
            skillContainer[1].classList.remove("display-block")
            skillContainer[2].classList.add("display-block")
            skillLinks[2].classList.add("active");
            skillLinks[0].classList.remove("active");
            skillLinks[1].classList.remove("active");
        }
    })
}

let darkModeBtn = document.querySelector(".light-dark-btn");
let darkModeBtnParent = document.querySelector(".light-dark-btn-parent");
let body = document.querySelector("body");
let nav = document.querySelector("nav");

darkModeBtn.addEventListener("click", (e) => {
    if (e.srcElement.classList.contains("fa-moon")) {
        e.srcElement.classList.replace("fa-moon", "fa-sun");
        body.classList.add("bg-white", "color-black");
        body.style.transition = ".5s";
        nav.classList.add("bg-white", "color-black");

        for (let navHref of gotoLinks) {
            navHref.classList.add("color-black");
        }
        e.srcElement.classList.add("color-black");
    }
    else {
        e.srcElement.classList.replace("fa-sun", "fa-moon");
        body.classList.remove("bg-white", "color-black");
        nav.classList.remove("bg-white", "color-black");
        for (let navHref of gotoLinks) {
            navHref.classList.remove("color-black");
        }
        e.srcElement.classList.remove("color-black");

    }
});


