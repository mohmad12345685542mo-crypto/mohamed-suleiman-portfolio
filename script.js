```javascript
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
```
