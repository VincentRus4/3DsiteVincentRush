const menu = document.querySelector(".menubutton");
const navMenu = document.querySelector(".menu");
const vin = document.querySelector(".head");
const navba = document.querySelector(".navbar");
const scritte = document.querySelector("#loading-screen");
const line = document.querySelector(".squiggle")



menu.addEventListener("click", function () {
    menu.classList.toggle(".active");
    navMenu.classList.toggle("active");
    vin.classList.toggle("active");

});
menu.onclick = function () {
    this.classList.toggle("checked");
    vin.classList.toggle("checked");
    scritte.classList.toggle("checked");

}


// document.querySelectorAll(".nav-item").forEach(function (n) {
//     n.addEventListener("click", function () {
//         menu.classList.toggle(".active");
//         navMenu.classList.toggle("active");
//     });
// });


window.addEventListener('scroll', function () {
    let value = scrollY;
    if (value > 400)
    {   navMenu.classList.add("movemenu");
        navMenu.style.marginLeft = 0 + 'px';
        navba.style.display= 'block';
        navba.style.height= 430+'px';
        
   
    }
    if(value> 1000 && value< 2000){
        line.style.animation= 'draw 8s linear forwards';
     
    }
    
    if(value < 5000 && value > 3500 || value < 400 ){
        navMenu.classList.remove("movemenu");
        navMenu.style.marginLeft = 410 + 'px';
        navba.style.display= 'flex';
        navba.style.padding= -50 +'px';
        navba.style.height= 'auto';
        line.style.animation= '';
    }
    
})

window.scrollBy({
    top: 100,
    left: 100,
    behavior: 'smooth'
  });

