/* =========================
   IMAGE LIGHTBOX
========================= */

const imageLightbox =
    document.getElementById("imageLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");


const imageLinks =
    document.querySelectorAll(
        ".hero-image-link, .card-image-link"
    );


imageLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            const image =
                link.querySelector("img");

            if (!image) {
                return;
            }


            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.alt;


            if (
                link.classList.contains(
                    "hero-image-link"
                )
            ) {

                lightboxImage.classList.remove(
                    "project-lightbox"
                );

            }


            if (
                link.classList.contains(
                    "card-image-link"
                )
            ) {

                lightboxImage.classList.add(
                    "project-lightbox"
                );

            }


            imageLightbox.classList.add(
                "active"
            );

        }
    );

});


closeLightbox.addEventListener(
    "click",
    function() {

        imageLightbox.classList.remove(
            "active"
        );

    }
);


imageLightbox.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            imageLightbox
        ) {

            imageLightbox.classList.remove(
                "active"
            );

        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            imageLightbox.classList.remove(
                "active"
            );

        }

    }
);



/* =========================
   WOLF WALKING SYSTEM
========================= */

const wolfScene =
    document.getElementById("wolfScene");

const wolfWalker =
    document.getElementById("wolfWalker");

const wolfSprite =
    document.getElementById("wolfSprite");


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

let lastScrollY =
    window.scrollY;

let lastFrameTime = 0;

let currentWolfX = 0;



/* =========================
   PRELOAD WOLF FRAMES
========================= */

wolfFrames.forEach(function(src) {

    const image =
        new Image();

    image.src = src;

});



/* =========================
   UPDATE WOLF
========================= */

function updateWolf() {

    if (
        !wolfScene ||
        !wolfWalker ||
        !wolfSprite
    ) {

        return;

    }


    const scrollY =
        window.scrollY;


    const heroTop =
        wolfScene
            .closest(".hero")
            .offsetTop;


    const heroElement =
        wolfScene.closest(".hero");


    const heroHeight =
        heroElement.offsetHeight;


    const heroBottom =
        heroTop + heroHeight;


    const maxWolfX =
        Math.max(
            0,
            wolfScene.clientWidth -
            wolfWalker.offsetWidth
        );


    /*
       مقدار التقدم داخل الـHero
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
       الذئب يتحرك من الشمال
       لليمين أثناء دخولنا
       وخروجنا من الـHero
    */

    const targetX =
        progress *
        maxWolfX;


    currentWolfX =
        targetX;


    wolfWalker.style.transform =
        `translate3d(${currentWolfX}px, 0, 0)`;



    /* =========================
       WALKING FRAMES
    ========================= */

    const scrollDifference =
        scrollY - lastScrollY;


    const movement =
        Math.abs(
            scrollDifference
        );


    const now =
        performance.now();


    if (
        movement > 0.5 &&
        now - lastFrameTime > 70
    ) {

        if (
            scrollDifference > 0
        ) {

            wolfFrame =
                (wolfFrame + 1) %
                wolfFrames.length;

        } else {

            wolfFrame =
                (wolfFrame - 1 +
                    wolfFrames.length) %
                wolfFrames.length;

        }


        wolfSprite.src =
            wolfFrames[wolfFrame];


        lastFrameTime =
            now;

    }


    lastScrollY =
        scrollY;

}



/* =========================
   SCROLL
========================= */

window.addEventListener(
    "scroll",
    updateWolf,
    {
        passive: true
    }
);



/* =========================
   RESIZE
========================= */

window.addEventListener(
    "resize",
    updateWolf
);



/* =========================
   INITIAL
========================= */

updateWolf();
