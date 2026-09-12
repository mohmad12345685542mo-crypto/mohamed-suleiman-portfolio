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