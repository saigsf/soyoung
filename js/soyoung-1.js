// function showSideBar() {
//     var wxBtn = document.querySelector("#sweixin");
//     var closeBtn = document.querySelector(".close-btn");
//     var shareBtn = document.querySelector("#mobile");
//     var wxCode = document.querySelector(".wx-code");
//     var wxlink = document.querySelector(".wx-link");

//     wxBtn.addEventListener("click", function() {
//         var sideBar = document.querySelector(".side-hiden");
//         sideBar.style.right = 0 + "px";
//         this.parentNode.style.left = 50 + "px";
//     }, false);

//     closeBtn.addEventListener("click", function() {
//         var sideBar = document.querySelector(".side-hiden");
//         sideBar.style.right = -200 + "px";
//         wxBtn.parentNode.style.left = 0 + "px";
//     }, false);
//     wxlink.addEventListener("click", function() {
//         wxCode.style.display = "block";
//     }, false);
//     shareBtn.addEventListener("click", function() {
//         wxCode.style.display = "block";
//     }, false);
//     wxCode.addEventListener("click", function(event) {
//         event.preventDefault();
//         if (event.target.parentNode.className != "code-pic") {
//             wxCode.style.display = "none";
//         }

//     }, false);

//     // 小屏幕时的sideBar
//     var openAssist = document.querySelector("#openAssist");
//     var oDivs = document.querySelectorAll(".assist div");

//     var isOpen = false;
//     var lock = true;
//     openAssist.addEventListener("click", function() {
//         if (!lock) {
//             return;
//         }
//         if (isOpen) {
//             this.className = "active hidden-lg";
//             for (var i = 0; i < oDivs.length; i++) {
//                 oDivs[i].className = "";

//             }

//             isOpen = false;
//         } else {
//             this.className = "";
//             for (var i = 0; i < oDivs.length; i++) {
//                 oDivs[i].className = "active";

//             }

//             isOpen = true;
//         }
//         lock = false;
//         setTimeout(function() {
//             lock = true;

//         }, 300);

//     }, false);

// }
// function topCarousel() {
//     carousel({
//         el: $(".carousel"),
//         b: 1,
//         e: 5000,
//         isCtrl: {
//             isLR: false,
//             isSpot: false
//         }
//     });
// }

// function toTop() {

//         var toTopBtn = document.querySelector("#toTop");

//         // $(window).scroll(function() {

//         //     if ($(window).scrollTop() > 400) {
//         //         toTopBtn.parentNode.style.opacity = 1;
//         //     } else {
//         //         toTopBtn.parentNode.style.opacity = 0;
//         //     }
//         // });

//         var top = parseInt($(".pageBox").css('top'));

//         if (top < -$(".pageBox").height()) {
//             toTopBtn.parentNode.style.opacity = 1;
//         } else {
//             toTopBtn.parentNode.style.opacity = 0;
//         }

//         var lock = true;
//         var timer = null;
//         toTopBtn.addEventListener("click", function() {
//             if (!lock) {
//                 return;
//             }
//             clearInterval(timer)

//             var scroll = $(window).scrollTop();
//             timer = setInterval(function() {
//                 scroll -= 20;
//                 if (scroll < 0) {
//                     clearInterval(timer);
//                 }
//                 $(window).scrollTop(scroll);
//             }, 5);
//             // console.log(scroll)
//             lock = false;
//             setTimeout(function() {
//                 lock = true;

//             }, 1000);

//         }, false);
//     }