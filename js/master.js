// check if there's local storage color option
let mainColors = localStorage.getItem("color-option");

if(mainColors !== null){
    
    document.documentElement.style.setProperty('--main-color' ,  mainColors);

    // remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element =>{

        element.classList.remove("active")

        // add active class on element with data color === local storage item
        if (element.dataset.color === mainColors){

            // add active class
            element.classList.add("active")

        }

    })

} 

// random background option
let backgroundOption = true;

// variable to control the background interval
let backgroundInterval; 

// check if there's local storage random background item
let bagkgroundLocalItem = localStorage.getItem("background_option");

// check if random background local storage is not empty
if (bagkgroundLocalItem !== null){

    // remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(el =>{

        el.classList.remove("active");

    })

    if(bagkgroundLocalItem === 'true'){

        backgroundOption = true;

        document.querySelector('.yes').classList.add("active");

    }else{

        backgroundOption = false;

        document.querySelector('.no').classList.add("active");

    }

}

// click on toggle settings gear
document.querySelector(".toggle-settings i").onclick = function (){
    
    // toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin");

    // toggle class open on main settings box
    document.querySelector(".settings-box").classList.toggle("open");
}

// switch colors
let colorLi = document.querySelectorAll(".colors-list li");

// loop on all list items
colorLi.forEach(li =>{

    // click on every list items
    li.addEventListener("click" , (e) => {

        // set color on root
        document.documentElement.style.setProperty('--main-color' , e.target.dataset.color);

        localStorage.setItem("color-option" , e.target.dataset.color);

        handleActive(e);

    });

});

// switch random background option
let randomBackgroundsElement = document.querySelectorAll(".random-backgrounds span");

// loop on all spans
randomBackgroundsElement.forEach(span =>{

    // click on every span
    span.addEventListener("click" , (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes'){

            backgroundOption = true;

            randomizeImgs();
            
            localStorage.setItem("background_option" , true)
            
        } else{
            
            backgroundOption = false;
            
            clearInterval(backgroundInterval);
            
            localStorage.setItem("background_option" , false)

        }

    })

})

// select landing page element
let landingPage = document.querySelector('.landing-page');

// get array of imgs
let imgsArray = ["1.jpg" , "2.jpg" , "3.jpg" , "4.jpg", "5.jpg"];

// function to randomize imgs
function randomizeImgs() {

    if (backgroundOption === true){

        backgroundInterval = setInterval(() => {
        
            // get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            // change bagkground image url
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        
        }, 10000);
        
    }

}

randomizeImgs();

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function(){

    // skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    // skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // window height
    let windowHeight = this.innerHeight;

    // window scrolltop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill =>{

            skill.style.width = skill.dataset.progress;

        });

    }

}

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img =>{

    img.addEventListener("click" ,e =>{

        // create overlay element
        let overlay = document.createElement('div');

        // add class to overlay
        overlay.className = 'popup-overlay';

        // append overlay to the body
        document.body.appendChild(overlay);

        // create the popup box
        let popupBox = document.createElement("div");

        // add class to the popup box
        popupBox.className = "popup-box";

        if(img.alt !== null){

            // create heading
            let imgHeading = document.createElement("h3");

            // create text for heading
            let imgText = document.createTextNode(img.alt);

            // append the text to the heading
            imgHeading.appendChild(imgText);

            // append the heading to the popup box
            popupBox.appendChild(imgHeading);

        }

        // create the image
        let popupImage = document.createElement("img");

        // set image source
        popupImage.src = img.src;

        // add image to popup box
        popupBox.appendChild(popupImage);

        // append the popup box to body
        document.body.appendChild(popupBox);

        // create the close span
        let closeButton = document.createElement("span");

        // create the close button text
        let closeButtonText = document.createTextNode("X");

        // append text to close button
        closeButton.appendChild(closeButtonText);

        // add class to close button
        closeButton.className = 'close-button';

        // add close button to the popup box
        popupBox.appendChild(closeButton);

        closeButton.addEventListener("click" , e => {

            document.body.removeChild(popupBox);
            document.body.removeChild(overlay);

        })

    })
    

})

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links
const allLinks = document.querySelectorAll(".links a");

// scroll function
function scrollToSection(elements){

    elements.forEach(element =>{
    
        element.addEventListener("click" , (e) =>{
    
            e.preventDefault(); 
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: "smooth"
    
            })
        })
    
    })

}

scrollToSection(allBullets);
scrollToSection(allLinks);

// handle active state function
function handleActive(e){

    // remove active class from all childrens
    e.target.parentElement.querySelectorAll(".active").forEach(element =>{

        element.classList.remove("active")

    })

    e.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option")

if(bulletLocalItem !== null){

    bulletsSpan.forEach(span =>{

        span.classList.remove("active");

    });

    if(bulletLocalItem === "block"){

        bulletsContainer.style.display = "block";

        document.querySelector(".bullets-option .yes").classList.add("active")

    }else{

        bulletsContainer.style.display = "none";

        document.querySelector(".bullets-option .no").classList.add("active")

    }

}

bulletsSpan.forEach(span =>{

    // click on every span
    span.addEventListener("click" , (e) => {

        if (span.dataset.display === 'yes'){

            bulletsContainer.style.display = "block";

            localStorage.setItem("bullets_option" , "block")
            
        } else{
            
            bulletsContainer.style.display = "none";

            localStorage.setItem("bullets_option" , "none")

        }

        handleActive(e);
    })

})

//reset button
document.querySelector(".reset-options").onclick = function(){

    localStorage.clear();

    window.location.reload();

}

//toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let theLinks = document.querySelector(".links");

toggleBtn.onclick = function(e) {

    //stop propagation
    e.stopPropagation();

    this.classList.toggle("menu-active");

    theLinks.classList.toggle("open");

}

// click anywhere outside menu and toggle button
document.addEventListener("click", e =>{

    if(e.target !== toggleBtn && e.target !== theLinks){

        // check if menu is open
        if(theLinks.classList.contains("open")){

            toggleBtn.classList.toggle("menu-active");

            theLinks.classList.toggle("open");

        }

    }

})

//stop propagation on menu
theLinks.onclick = function(e){
    
    e.stopPropagation();

}

let upbtn = document.querySelector(".up");

window.onscroll = function () {
    if(this.scrollY >= 935){
        upbtn.classList.add("show");
    }else{
        upbtn.classList.remove("show")
    }
}

upbtn.addEventListener("click", e =>{
    window.scrollTo({
        top:0,
        behavior:"smooth",
    })
})