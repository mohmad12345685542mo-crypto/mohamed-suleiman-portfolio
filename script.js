const imageLightbox =
    document.getElementById("imageLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");


// =========================
// ALL CLICKABLE IMAGES
// =========================

const imageLinks =
    document.querySelectorAll(
        ".hero-image-link, .card-image-link, .project-image-link"
    );


// =========================
// OPEN LIGHTBOX
// =========================

imageLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const image =
            link.querySelector("img");

        if (!image) {
            return;
        }


        // Set image

        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt;


        // =========================
        // HERO IMAGE
        // =========================

        if (
            link.classList.contains(
                "hero-image-link"
            )
        ) {

            lightboxImage.classList.remove(
                "project-lightbox"
            );

        }


        // =========================
        // PROJECT IMAGE
        // =========================

        if (
            link.classList.contains(
                "project-image-link"
            )
        ) {

            lightboxImage.classList.add(
                "project-lightbox"
            );

        }


        // Open lightbox

        imageLightbox.classList.add(
            "active"
        );

    });

});


// =========================
// CLOSE WITH X
// =========================

closeLightbox.addEventListener(
    "click",
    function() {

        imageLightbox.classList.remove(
            "active"
        );

    }
);


// =========================
// CLOSE OUTSIDE
// =========================

imageLightbox.addEventListener(
    "click",
    function(event) {

        if (
            event.target === imageLightbox
        ) {

            imageLightbox.classList.remove(
                "active"
            );

        }

    }
);


// =========================
// CLOSE WITH ESC
// =========================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            imageLightbox.classList.remove(
                "active"
            );

        }

    }
);



// ==================================================
// WALKING WOLF
// ==================================================

const wolfTrack =
    document.getElementById("wolfTrack");

const wolfWalker =
    document.getElementById("wolfWalker");

const wolfSprite =
    document.getElementById("wolfSprite");


// =========================
// WOLF FRAMES
// =========================

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


// =========================
// WOLF VARIABLES
// =========================

let wolfFrame = 0;

let lastScrollY =
    window.scrollY;

let wolfAnimationTimer = 0;

let wolfCurrentX = 0;


// =========================
// PRELOAD WOLF
// =========================

wolfFrames.forEach(
    function(src) {

        const image =
            new Image();

        image.src =
            src;

    }
);


// =========================
// GET WOLF POSITION
// =========================

function updateWolf() {

    if (
        !wolfTrack ||
        !wolfWalker
    ) {

        return;

    }


    const scrollTop =
        window.scrollY;


    const documentHeight =
        document.documentElement.scrollHeight;


    const windowHeight =
        window.innerHeight;


    const maxScroll =
        documentHeight -
        windowHeight;


    let scrollProgress = 0;


    if (maxScroll > 0) {

        scrollProgress =
            scrollTop / maxScroll;

    }


    // Keep value safe

    scrollProgress =
        Math.max(
            0,
            Math.min(
                1,
                scrollProgress
            )
        );


    // =========================
    // TRACK WIDTH
    // =========================

    const trackWidth =
        wolfTrack.clientWidth;


    const wolfWidth =
        wolfWalker.offsetWidth;


    const maxWolfX =
        Math.max(
            0,
            trackWidth - wolfWidth
        );


    // =========================
    // MOVE WOLF
    // =========================

    wolfCurrentX =
        scrollProgress *
        maxWolfX;


    wolfWalker.style.transform =
        `translateX(${wolfCurrentX}px)`;


    // =========================
    // WALKING ANIMATION
    // =========================

    const scrollDifference =
        Math.abs(
            scrollTop -
            lastScrollY
        );


    if (
        scrollDifference > 1
    ) {

        const now =
            performance.now();


        if (
            now -
            wolfAnimationTimer >
            75
        ) {

            wolfFrame =
                (
                    wolfFrame + 1
                ) %
                wolfFrames.length;


            wolfSprite.src =
                wolfFrames[wolfFrame];


            wolfAnimationTimer =
                now;

        }

    }


    lastScrollY =
        scrollTop;

}


// =========================
// SCROLL EVENT
// =========================

window.addEventListener(
    "scroll",
    updateWolf,
    {
        passive: true
    }
);


// =========================
// RESIZE EVENT
// =========================

window.addEventListener(
    "resize",
    updateWolf
);


// =========================
// INITIAL
// =========================

updateWolf();
