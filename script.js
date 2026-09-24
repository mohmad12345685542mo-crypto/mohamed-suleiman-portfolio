const imageLightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");


// =========================
// ALL CLICKABLE IMAGES
// =========================

const imageLinks = document.querySelectorAll(
    ".hero-image-link, .card-image-link, .project-image-link"
);


// =========================
// OPEN LIGHTBOX
// =========================

imageLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const image = link.querySelector("img");

        if (!image) {
            return;
        }

        // Set image
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;


        // =========================
        // HERO IMAGE
        // =========================

        if (
            link.classList.contains("hero-image-link")
        ) {

            lightboxImage.classList.remove("project-lightbox");

        }


        // =========================
        // PROJECT IMAGE
        // =========================

        if (
            link.classList.contains("project-image-link")
        ) {

            lightboxImage.classList.add("project-lightbox");

        }


        // Open lightbox
        imageLightbox.classList.add("active");

    });

});


// =========================
// CLOSE WITH X
// =========================

closeLightbox.addEventListener("click", function() {

    imageLightbox.classList.remove("active");

});


// =========================
// CLOSE WHEN CLICKING OUTSIDE
// =========================

imageLightbox.addEventListener("click", function(event) {

    if (event.target === imageLightbox) {

        imageLightbox.classList.remove("active");

    }

});


// =========================
// CLOSE WITH ESC
// =========================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        imageLightbox.classList.remove("active");

    }

});


// =========================
// WALKING WOLF
// =========================

const wolfWalker = document.getElementById("wolfWalker");
const wolfSprite = document.getElementById("wolfSprite");

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

let wolfFrame = 0;
let lastScrollY = window.scrollY;
let wolfAnimationTimer = 0;


// =========================
// PRELOAD WOLF IMAGES
// =========================

wolfFrames.forEach(function(src) {

    const image = new Image();

    image.src = src;

});


// =========================
// UPDATE WOLF POSITION AND ANIMATION
// =========================

function updateWolf() {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const maxWolfX =
        window.innerWidth - wolfWalker.offsetWidth;

    let scrollProgress = 0;

    if (pageHeight > 0) {

        scrollProgress = scrollTop / pageHeight;

    }


    // Move wolf according to page scroll

    const wolfX =
        scrollProgress * maxWolfX;

    wolfWalker.style.transform =
        `translateX(${wolfX}px)`;


    // Change walking frame while scrolling

    const scrollDifference =
        Math.abs(scrollTop - lastScrollY);

    if (scrollDifference > 2) {

        const now = performance.now();

        if (now - wolfAnimationTimer > 70) {

            wolfFrame =
                (wolfFrame + 1) % wolfFrames.length;

            wolfSprite.src =
                wolfFrames[wolfFrame];

            wolfAnimationTimer = now;

        }

    }

    lastScrollY = scrollTop;

}


// =========================
// SCROLL
// =========================

window.addEventListener(
    "scroll",
    updateWolf,
    { passive: true }
);


// =========================
// RESIZE
// =========================

window.addEventListener(
    "resize",
    updateWolf
);


// =========================
// INITIAL POSITION
// =========================

updateWolf();
