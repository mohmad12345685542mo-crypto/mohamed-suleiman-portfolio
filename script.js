/* =========================================================
   IMAGE LIGHTBOX
========================================================= */

const imageLightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

const imageLinks = document.querySelectorAll(
    ".hero-image-link, .card-image-link"
);

if (
    imageLightbox &&
    lightboxImage &&
    closeLightbox
) {
    imageLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const image = link.querySelector("img");

            if (!image) {
                return;
            }

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt || "";

            if (link.classList.contains("hero-image-link")) {

                lightboxImage.classList.remove(
                    "project-lightbox"
                );

            }

            if (link.classList.contains("card-image-link")) {

                lightboxImage.classList.add(
                    "project-lightbox"
                );

            }

            imageLightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    closeLightbox.addEventListener("click", function () {

        imageLightbox.classList.remove("active");

        document.body.style.overflow = "";

    });


    imageLightbox.addEventListener("click", function (event) {

        if (event.target === imageLightbox) {

            imageLightbox.classList.remove("active");

            document.body.style.overflow = "";

        }

    });


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            imageLightbox.classList.remove("active");

            document.body.style.overflow = "";

        }

    });
}



/* =========================================================
   WOLF WALKING SYSTEM
========================================================= */

const wolfScene = document.getElementById("wolfScene");
const wolfWalker = document.getElementById("wolfWalker");
const wolfSprite = document.getElementById("wolfSprite");


/* ---------------------------------------------------------
   WOLF FRAMES
--------------------------------------------------------- */

const wolfFrames = [
    "IMAGES/wolf-01.png",
    "IMAGES/wolf-02.png",
    "IMAGES/wolf-03.png",
    "IMAGES/wolf-04.png",
    "IMAGES/wolf-05.png",
    "IMAGES/wolf-06.png",
    "IMAGES/wolf-07.png",
    "IMAGES/wolf-08.png"
];


/* ---------------------------------------------------------
   WOLF STATE
--------------------------------------------------------- */

let wolfFrame = 0;

let wolfDirection = 1;

let lastScrollY = window.scrollY;

let currentWolfX = 0;

let targetWolfX = 0;

let animationFrameID = null;

let lastFrameTime = 0;

let lastMovementTime = 0;

let wolfIsMoving = false;

let heroVisible = true;


/* ---------------------------------------------------------
   SETTINGS
--------------------------------------------------------- */

const WOLF_FRAME_SPEED = 105;

const WOLF_SMOOTHNESS = 0.12;

const WOLF_IDLE_DELAY = 180;


/* =========================================================
   PRELOAD ALL WOLF FRAMES
========================================================= */

const wolfImages = [];

wolfFrames.forEach(function (src) {

    const image = new Image();

    image.src = src;

    wolfImages.push(image);

});



/* =========================================================
   GET HERO
========================================================= */

const wolfHero = wolfScene
    ? wolfScene.closest(".hero")
    : null;



/* =========================================================
   SET WOLF FRAME
========================================================= */

function setWolfFrame(index) {

    if (!wolfSprite) {
        return;
    }

    const totalFrames = wolfFrames.length;

    wolfFrame =
        (index + totalFrames) %
        totalFrames;

    const newSrc = wolfFrames[wolfFrame];

    if (wolfSprite.src.indexOf(newSrc) === -1) {

        wolfSprite.src = newSrc;

    }

}



/* =========================================================
   SET WOLF DIRECTION
========================================================= */

function setWolfDirection(direction) {

    if (!wolfSprite) {
        return;
    }

    wolfDirection =
        direction >= 0
            ? 1
            : -1;


    /*
       اتجاه اليمين:
       الصورة طبيعية

       اتجاه الشمال:
       الصورة مقلوبة أفقيًا
    */

    wolfSprite.style.transform =
        wolfDirection === 1
            ? "scaleX(1)"
            : "scaleX(-1)";

}



/* =========================================================
   UPDATE WOLF TARGET POSITION
========================================================= */

function calculateWolfPosition() {

    if (
        !wolfScene ||
        !wolfWalker ||
        !wolfHero
    ) {
        return;
    }


    const scrollY = window.scrollY;


    /*
       مكان الـHero بالنسبة للصفحة
    */

    const heroTop =
        wolfHero.offsetTop;


    const heroHeight =
        wolfHero.offsetHeight;


    /*
       أقصى مسافة يقدر الذئب يمشيها
    */

    const maxWolfX =
        Math.max(
            0,
            wolfScene.clientWidth -
            wolfWalker.offsetWidth
        );


    /*
       حساب مكان الذئب داخل الـHero
    */

    let progress =
        (scrollY - heroTop) /
        heroHeight;


    progress =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );


    /*
       المكان المستهدف
    */

    targetWolfX =
        progress *
        maxWolfX;



    /*
       تحديد اتجاه الـScroll
    */

    const scrollDifference =
        scrollY - lastScrollY;


    if (Math.abs(scrollDifference) > 0.5) {

        const newDirection =
            scrollDifference > 0
                ? 1
                : -1;


        if (
            newDirection !==
            wolfDirection
        ) {

            setWolfDirection(
                newDirection
            );


            /*
               عند عكس الاتجاه
               نعكس الـFrame الحالي
               عشان الحركة متبقاش مفاجئة
            */

            wolfFrame =
                wolfFrames.length -
                1 -
                wolfFrame;


            setWolfFrame(
                wolfFrame
            );

        }


        wolfIsMoving = true;

        lastMovementTime =
            performance.now();

    }


    lastScrollY =
        scrollY;

}



/* =========================================================
   WOLF FRAME ANIMATION
========================================================= */

function animateWolfFrames(now) {

    if (
        !wolfSprite ||
        !heroVisible
    ) {
        return;
    }


    /*
       لو المستخدم بطل Scroll
       لفترة قصيرة، نعتبر الذئب واقف
    */

    if (
        now -
        lastMovementTime >
        WOLF_IDLE_DELAY
    ) {

        wolfIsMoving = false;

    }


    /*
       تغيير الـFrame أثناء المشي
    */

    if (
        wolfIsMoving &&
        now -
        lastFrameTime >=
        WOLF_FRAME_SPEED
    ) {

        if (wolfDirection === 1) {

            /*
               يمين
               01 → 02 → 03 → ... → 08
            */

            setWolfFrame(
                wolfFrame + 1
            );

        } else {

            /*
               شمال
               08 → 07 → 06 → ... → 01
            */

            setWolfFrame(
                wolfFrame - 1
            );

        }


        lastFrameTime =
            now;

    }

}



/* =========================================================
   SMOOTH WOLF MOVEMENT
========================================================= */

function animateWolfMovement() {

    if (
        !wolfWalker ||
        !wolfScene
    ) {
        return;
    }


    /*
       الذئب يلحق المكان المستهدف
       بدل القفز إليه مباشرة
    */

    const distance =
        targetWolfX -
        currentWolfX;


    currentWolfX +=
        distance *
        WOLF_SMOOTHNESS;


    /*
       لو قرب جدًا من الهدف
       ثبته عليه
    */

    if (
        Math.abs(distance) <
        0.1
    ) {

        currentWolfX =
            targetWolfX;

    }


    wolfWalker.style.transform =
        `translate3d(${currentWolfX}px, 0, 0)`;

}



/* =========================================================
   MAIN ANIMATION LOOP
========================================================= */

function wolfAnimationLoop(now) {

    calculateWolfPosition();

    animateWolfMovement();

    animateWolfFrames(now);


    animationFrameID =
        requestAnimationFrame(
            wolfAnimationLoop
        );

}



/* =========================================================
   INTERSECTION OBSERVER
========================================================= */

if (
    wolfHero &&
    "IntersectionObserver" in window
) {

    const wolfObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    heroVisible =
                        entry.isIntersecting;

                });

            },
            {
                threshold: 0
            }
        );


    wolfObserver.observe(
        wolfHero
    );

}



/* =========================================================
   SCROLL
========================================================= */

window.addEventListener(
    "scroll",
    calculateWolfPosition,
    {
        passive: true
    }
);



/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        calculateWolfPosition();

    }
);



/* =========================================================
   INITIAL WOLF SETUP
========================================================= */

if (
    wolfScene &&
    wolfWalker &&
    wolfSprite
) {

    setWolfFrame(0);

    setWolfDirection(1);

    calculateWolfPosition();

    /*
       بداية الذئب من الشمال
    */

    currentWolfX =
        targetWolfX =
        0;


    wolfWalker.style.transform =
        "translate3d(0, 0, 0)";


    /*
       بداية حركة الـAnimation
    */

    animationFrameID =
        requestAnimationFrame(
            wolfAnimationLoop
        );

}
