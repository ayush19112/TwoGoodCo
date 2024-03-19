function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locomotiveAnimation();

function navbarAnimation() {
    const tl = gsap.timeline();
    tl.to("#twoGood", {
        transform: "translateY(-150%)",
        scrollTrigger: {
            trigger: ".navpart1",
            scroller: "#main",
            // markers:true,
            start: "top 0%",
            // end:"top 10%",
            scrub: true,
        },
    }, "anim1")
    .from("#cross", {
        transform: "translateY(150%)",
        scrollTrigger: {
            trigger: ".navpart1",
            scroller: "#main",
            // markers:true,
            start: "top 0%",
            // end:"top 10%",
            scrub: true,
        },
    }, "anim1");
}


navbarAnimation();

function videoConAnimation() {
    let videoCon = document.querySelector("#videoContainer");
    let playbtn = document.querySelector("#play");

    videoCon.addEventListener("mouseenter", function () {
        gsap.to(playbtn, {
            scale: 1,
            opacity: 1,
        });
    });
    videoCon.addEventListener("mouseleave", function () {
        gsap.to(playbtn, {
            scale: 0,
            opacity: 0,
            left: 0, //dets tell detailings
            top: 0,
        });
    });
    videoCon.addEventListener("mousemove", function (dets) {
        gsap.to(playbtn, {
            left: dets.x, //dets tell detailings
            top: dets.y,
            transform: "translate(-50%, -50%) scale(1)",
        });
    });
}
videoConAnimation();

document.addEventListener("scroll",()=>{
    if(playbtn.style.opacity=1){
    playbtn.style.opacity=0;
    }
})

function loadingAnimation() {
    gsap.from("#page1 h1", {
        y: 30,
        opacity: 0,
        delay: 0.5,
        duration: 0.9,
        stagger: 0.3,
    });
    gsap.from("#page1 #videoContainer", {
        scale: 0.9,
        opacity: 0,
        delay: 1.5,
        duration: 0.5,
    });
}

loadingAnimation();

document.addEventListener("mousemove", function (e) {
    gsap.to(".cursor", {
        left: e.x,
        top: e.y,
    });
});

function logoAnimation() {
    gsap.from(".logo2", {
        opacity: 0,
        y: "50",
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".logo2",
            scroller: "#main",
            end: "top 70%",
            // markers: true,
            scrub: 1,
        },
    });
}

logoAnimation();

var a = document.querySelectorAll(".child");
a.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        gsap.to(".cursor", {
            transform: "translate(-50%,-50%) scale(1)",
        });
    });
    elem.addEventListener("mouseleave", function () {
        gsap.to(".cursor", {
            transform: "translate(-50%,-50%) scale(0)",
        });
    });
});

function displayMessaages() {
    var customMessages = {
        m1: `THANK YOU SO MUCH FOR
    THE BEAUTIFUL CATERING; IT
    MEANS A LOT WORKING
    WITH A COMPANY SUCH AS
    TWO GOOD CO.`,
        m2: `THE HAMPERS WE ORDERED
    WERE LOVELY AND THE
    TEAM ARE WONDERFUL TO
    LIAISE WITH.`,
        m3: `MY PACKAGE JUST ARRIVED
    AND THE PRESENTATION IS
    SO BEAUTIFUL; ELEGANT,
    MAGICAL AND
    MEANINGFUL, WITH THE
    ITEMS WRAPPED IN
    DELICIOUS-SMELLING TISSUE
    PAPER. GORGEOUS; WILL BE
    BACK FOR MORE.`,
        m4: `I THINK I SPEAK FOR
    EVERYONE WHEN I SAY WE
    ARE VERY GRATEFUL TO
    HAVE BEEN ABLE TO COME
    IN AND HELP OUT FOR THE
    DAY; THE WORK YOU DO IS
    AMAZING.`,
        m5: `EVERYONE AT TWO GOOD
    ARE LOVELY TO WORK WITH.
    CATERING WAS EXCELLENT
    AND WELL PRICED, ALL FOR
    A GOOD CAUSE... WHAT'S
    NOT TO LOVE?`,
    };

   
    var staffMessages = document.querySelectorAll(".staff-msg");

    
    var page4Text = document.querySelector(".page4-text");

    staffMessages.forEach(function (staffMessage) {
        staffMessage.addEventListener("click", function () {
            staffMessages.forEach(function (div) {
                div.querySelector("div").style.backgroundColor = "white";
            });

            // Set background color of clicked div
            staffMessage.querySelector("div").style.backgroundColor = "black";
            
            var staffId = staffMessage.id;

            page4Text.innerText = customMessages[staffId];
            gsap.from(".page4-text",{
                y:30,
                opacity:0,
                delay:0.3,
                duration:0.3,
                stagger:0.1
            })
        });
    });
}

displayMessaages();

let flag = true;
let flag1 = true;

function menuAnimation(){


document.querySelector(".icon-1").addEventListener("click",()=>{
   
    

    if(flag){
        document.querySelector(".menu-content").style.transform="translateY(0%)";
        // document.querySelector(".menu-content").style.top="0%"
        document.querySelector(".icon-1").classList.add('active')
        document.querySelectorAll(".icon-1 span").forEach((ele)=>{
            ele.style.backgroundColor = "white"
        })
        document.querySelector(".nav").style.color="white";
    document.querySelectorAll(".links a").forEach(link => {
        link.style.color = "white";
    });
    gsap.from(".contents ul li",{
        y:30,
        opacity:0,
        delay:0.3,
        duration:0.3,
        stagger:0.1
    })
    gsap.from(".content ul li",{
        y:30,
        opacity:0,
        delay:0.3,
        duration:0.6,
        stagger:0.1
    })
        flag = false;
        document.querySelector(".cart-content").style.transform="translateY(-100%)";
        document.querySelector(".cart > i").classList.remove('ri-close-line');
        document.querySelector(".cart > i").classList.add('ri-shopping-cart-line');
        flag1 = true;
        document.querySelector(".cart > i").style.color="white";
        
    }else{
        document.querySelector(".menu-content").style.transform="translateY(-100%)";
        // document.querySelector(".menu-content").style.top="-100%"
        document.querySelector(".icon-1").classList.remove('active')
        document.querySelectorAll(".icon-1 span").forEach((ele)=>{
            ele.style.backgroundColor = "black"
        })
        document.querySelector(".nav").style.color="black";
    document.querySelectorAll(".links a").forEach(link => {
        link.style.color = "black";
    });
        flag = true;
        document.querySelector(".cart > i").style.color="black";
    }

  

})

}

menuAnimation();


function cartAnimation(){
document.querySelector(".cart").addEventListener("click",()=>{
if(flag1){  
    document.querySelector(".cart-content").style.transform="translateY(0%)";
    document.querySelector(".nav").style.color="white";
    document.querySelectorAll(".links a").forEach(link => {
        link.style.color = "white";})
    document.querySelectorAll(".icon-1 span").forEach((ele)=>{
    ele.style.backgroundColor = "white"})
    document.querySelector(".cart > i").classList.remove('ri-shopping-cart-line');
    document.querySelector(".cart > i").classList.add('ri-close-line');
    document.querySelector(".cart > i").style.color="white";
    flag1 = false;
    document.querySelector(".menu-content").style.transform="translateY(-100%)";
    document.querySelector(".icon-1").classList.remove('active');
    flag = true;
}
else{
    console.log("1");
    document.querySelector(".cart-content").style.transform="translateY(-100%)";
    document.querySelector(".nav").style.color="#000";
    document.querySelectorAll(".links a").forEach(link => {
            link.style.color = "#000";})
    document.querySelectorAll(".icon-1 span").forEach((ele)=>{
        ele.style.backgroundColor = "#000"})
    document.querySelector(".cart > i").classList.remove('ri-close-line');
    document.querySelector(".cart > i").classList.add('ri-shopping-cart-line');
    document.querySelector(".cart > i").style.color="black";
    flag1 = true
    }
})
}
cartAnimation();

