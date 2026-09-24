/* =========================================================
   IMAGE LIGHTBOX
========================================================= */

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


if (
    imageLightbox &&
    lightboxImage &&
    closeLightbox
) {

    imageLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const image =
                    link.querySelector("img");

                if (!image) {
                    return;
                }


                lightboxImage.src =
                    image.src;

                lightboxImage.alt =
                    image.alt || "";


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

                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    closeLightbox.addEventListener(
        "click",
        function () {

            imageLightbox.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }
    );


    imageLightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                imageLightbox
            ) {

                imageLightbox.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                imageLightbox.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }

        }
    );

}



/* =========================================================
   WOLF WALKING SYSTEM
========================================================= */

const wolfScene =
    document.getElementById("wolfScene");

const wolfWalker =
    document.getElementById("wolfWalker");

const wolfSprite =
    document.getElementById("wolfSprite");

const wolfHero =
    wolfScene
        ? wolfScene.closest(".hero")
        : null;



/* =========================================================
   WOLF FRAMES
========================================================= */

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



/* =========================================================
   WOLF SETTINGS
========================================================= */

/*
   سرعة الذئب بالبكسل في الثانية
*/

const WOLF_SPEED = 75;


/*
   الوقت بين كل Frame
*/

const WOLF_FRAME_SPEED = 90;


/*
   أقل حركة يتم اعتبارها حركة فعلية
*/

const WOLF_MIN_MOVEMENT = 0.01;



/* =========================================================
   WOLF STATE
========================================================= */

let wolfFrame = 0;


/*
   1  = يمين
   -1 = شمال
*/

let wolfDirection = 1;


/*
   مكان الذئب الحالي
*/

let currentWolfX = 0;


/*
   أقصى مكان مسموح للذئب
*/

let maxWolfX = 0;


/*
   الوقت السابق للـAnimation
*/

let previousTime = 0;


/*
   آخر وقت تم فيه تغيير الـFrame
*/

let lastFrameTime = 0;


/*
   هل الـHero ظاهر على الشاشة؟
*/

let heroVisible = true;


/*
   هل الـAnimation بدأ؟
*/

let wolfAnimationStarted = false;



/* =========================================================
   PRELOAD ALL WOLF FRAMES
========================================================= */

const wolfImages = [];


wolfFrames.forEach(
    function (src) {

        const image =
            new Image();

        image.src =
            src;

        wolfImages.push(
            image
        );

    }
);



/* =========================================================
   UPDATE WOLF MOVEMENT AREA
========================================================= */

function updateWolfLimits() {

    if (
        !wolfScene ||
        !wolfWalker
    ) {
        return;
    }


    /*
       مساحة الـScene بالكامل
    */

    const sceneWidth =
        wolfScene.clientWidth;


    /*
       عرض الذئب حسب الـCSS
    */

    const walkerWidth =
        wolfWalker.offsetWidth;


    /*
       أقصى مكان يصل إليه الذئب
    */

    maxWolfX =
        Math.max(
            0,
            sceneWidth -
            walkerWidth
        );


    /*
       منع الذئب من الخروج
       لو حجم الشاشة اتغير
    */

    if (
        currentWolfX >
        maxWolfX
    ) {

        currentWolfX =
            maxWolfX;

    }


    if (
        currentWolfX <
        0
    ) {

        currentWolfX =
            0;

    }


    /*
       تحديث مكان الذئب فورًا
    */

    if (wolfWalker) {

        wolfWalker.style.transform =
            `translate3d(${currentWolfX}px, 0, 0)`;

    }

}



/* =========================================================
   SET WOLF FRAME
========================================================= */

function setWolfFrame(index) {

    if (!wolfSprite) {
        return;
    }


    const totalFrames =
        wolfFrames.length;


    /*
       نخلي الرقم دائمًا
       داخل 0 - 7
    */

    wolfFrame =
        (
            index +
            totalFrames
        ) %
        totalFrames;


    const newSrc =
        wolfFrames[wolfFrame];


    /*
       منع إعادة تحميل الصورة
       لو هي بالفعل نفس الصورة
    */

    if (
        !wolfSprite.src.endsWith(
            newSrc
        )
    ) {

        wolfSprite.src =
            newSrc;

    }

}



/* =========================================================
   SET WOLF DIRECTION
========================================================= */

function setWolfDirection(
    direction
) {

    if (!wolfSprite) {
        return;
    }


    wolfDirection =
        direction >= 0
            ? 1
            : -1;


    /*
       اليمين:
       الصورة طبيعية

       الشمال:
       الصورة مقلوبة أفقيًا
    */

    if (
        wolfDirection === 1
    ) {

        wolfSprite.style.transform =
            "scaleX(1)";

    } else {

        wolfSprite.style.transform =
            "scaleX(-1)";

    }

}



/* =========================================================
   TURN WOLF AROUND
========================================================= */

function turnWolfAround() {

    /*
       عكس الاتجاه
    */

    wolfDirection *= -1;


    /*
       تطبيق الاتجاه الجديد
    */

    setWolfDirection(
        wolfDirection
    );


    /*
       عند الاتجاه لليمين:
       نبدأ من Frame 01

       عند الاتجاه للشمال:
       نبدأ من Frame 08
    */

    if (
        wolfDirection === 1
    ) {

        setWolfFrame(
            0
        );

    } else {

        setWolfFrame(
            wolfFrames.length - 1
        );

    }


    /*
       إعادة توقيت الفريمات
       عشان أول Frame ما يتغيرش
       بشكل مفاجئ
    */

    lastFrameTime =
        performance.now();

}



/* =========================================================
   MOVE WOLF
========================================================= */

function moveWolf(
    deltaTime
) {

    if (
        !wolfWalker ||
        !wolfScene ||
        !heroVisible
    ) {
        return;
    }


    /*
       الحركة حسب الزمن
       عشان السرعة تفضل ثابتة
       حتى لو FPS اختلف
    */

    const movement =
        WOLF_SPEED *
        deltaTime;


    /*
       الحركة ناحية اليمين
    */

    if (
        wolfDirection === 1
    ) {

        currentWolfX +=
            movement;

    }


    /*
       الحركة ناحية الشمال
    */

    else {

        currentWolfX -=
            movement;

    }


    /*
       وصل لأقصى اليمين
    */

    if (
        currentWolfX >=
        maxWolfX
    ) {

        currentWolfX =
            maxWolfX;


        turnWolfAround();

    }


    /*
       وصل لأقصى الشمال
    */

    else if (
        currentWolfX <= 0
    ) {

        currentWolfX =
            0;


        turnWolfAround();

    }


    /*
       تطبيق مكان الذئب
    */

    wolfWalker.style.transform =
        `translate3d(${currentWolfX}px, 0, 0)`;

}



/* =========================================================
   ANIMATE WOLF FRAMES
========================================================= */

function animateWolfFrames(
    now
) {

    if (
        !wolfSprite ||
        !heroVisible
    ) {
        return;
    }


    /*
       لسه وقت الـFrame الحالي
       ما خلصش
    */

    if (
        now -
        lastFrameTime <
        WOLF_FRAME_SPEED
    ) {

        return;

    }


    /*
       الذئب ماشي ناحية اليمين
    */

    if (
        wolfDirection === 1
    ) {

        wolfFrame++;


        /*
           بعد Frame 08
           نرجع Frame 01
        */

        if (
            wolfFrame >=
            wolfFrames.length
        ) {

            wolfFrame =
                0;

        }

    }


    /*
       الذئب ماشي ناحية الشمال
    */

    else {

        wolfFrame--;


        /*
           بعد Frame 01
           نرجع Frame 08
        */

        if (
            wolfFrame < 0
        ) {

            wolfFrame =
                wolfFrames.length - 1;

        }

    }


    /*
       عرض الـFrame الجديد
    */

    setWolfFrame(
        wolfFrame
    );


    /*
       حفظ وقت تغيير الـFrame
    */

    lastFrameTime =
        now;

}



/* =========================================================
   MAIN WOLF ANIMATION LOOP
========================================================= */

function wolfAnimationLoop(
    now
) {

    /*
       أول مرة فقط
    */

    if (
        previousTime === 0
    ) {

        previousTime =
            now;

    }


    /*
       حساب الوقت بين الفريم الحالي
       والفريم السابق
    */

    let deltaTime =
        (
            now -
            previousTime
        ) / 1000;


    /*
       حماية من القفز
       لو المتصفح اتوقف لحظة
    */

    if (
        deltaTime >
        0.05
    ) {

        deltaTime =
            0.05;

    }


    previousTime =
        now;


    /*
       تحريك الذئب
    */

    moveWolf(
        deltaTime
    );


    /*
       تغيير Frames
    */

    animateWolfFrames(
        now
    );


    /*
       الفريم التالي
    */

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

                entries.forEach(
                    function (entry) {

                        heroVisible =
                            entry.isIntersecting;

                    }
                );

            },
            {
                threshold: 0.01
            }
        );


    wolfObserver.observe(
        wolfHero
    );

}



/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        updateWolfLimits();

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

    /*
       حساب مساحة الحركة
    */

    updateWolfLimits();


    /*
       البداية من أقصى الشمال
    */

    currentWolfX =
        0;


    /*
       البداية في اتجاه اليمين
    */

    wolfDirection =
        1;


    /*
       أول صورة
       wolf-01.png
    */

    wolfFrame =
        0;


    setWolfFrame(
        0
    );


    /*
       اتجاه الصورة ناحية اليمين
    */

    setWolfDirection(
        1
    );


    /*
       وضع الذئب في البداية
    */

    wolfWalker.style.transform =
        "translate3d(0, 0, 0)";


    /*
       بدء الـAnimation
    */

    if (
        !wolfAnimationStarted
    ) {

        wolfAnimationStarted =
            true;


        requestAnimationFrame(
            wolfAnimationLoop
        );

    }

}
