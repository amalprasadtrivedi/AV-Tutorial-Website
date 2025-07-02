/*
    carousel.js - (Optional) JavaScript for Image/Testimonial Carousels

    This file provides a basic, reusable carousel functionality.
    It allows for automatic sliding and manual navigation (if buttons are added).

    To use this carousel:
    1.  Ensure your HTML structure matches the expectations (a container with slide items).
        Example HTML for testimonials:
        <div class="testimonial-carousel" id="testimonialCarousel">
            <div class="testimonial-item">...</div>
            <div class="testimonial-item">...</div>
            <div class="testimonial-item">...</div>
        </div>
        (Optional: Add navigation buttons next to the carousel div in HTML:
        <button id="prevBtn">Prev</button>
        <button id="nextBtn">Next</button>
        )
    2.  Link this script in your HTML file AFTER your main script.js:
        <script src="assets/js/carousel.js"></script>
    3.  Call the `initCarousel` function for each carousel you want to enable.
*/

document.addEventListener('DOMContentLoaded', function() {

    /**
     * Initializes a basic carousel functionality for a given container.
     * @param {string} carouselId - The ID of the carousel container element.
     * @param {string} slideSelector - The CSS selector for individual slide items within the container.
     * @param {number} intervalTime - Time in milliseconds for auto-slide (0 to disable auto-play).
     * @param {string} [prevButtonId] - Optional ID for the previous slide button.
     * @param {string} [nextButtonId] - Optional ID for the next slide button.
     */
    function initCarousel(carouselId, slideSelector, intervalTime = 0, prevButtonId = null, nextButtonId = null) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) {
            console.warn(`Carousel element with ID '${carouselId}' not found. Skipping initialization.`);
            return;
        }

        const slides = carousel.querySelectorAll(slideSelector);
        if (slides.length === 0) {
            console.warn(`No slides found for carousel ID '${carouselId}' with selector '${slideSelector}'.`);
            return;
        }

        let currentSlideIndex = 0;
        let slideInterval;

        // Function to show a specific slide
        function showSlide(index) {
            // Loop the index if it goes out of bounds
            if (index >= slides.length) {
                currentSlideIndex = 0;
            } else if (index < 0) {
                currentSlideIndex = slides.length - 1;
            } else {
                currentSlideIndex = index;
            }

            // Calculate the transform value to move to the current slide
            // Assuming slides are laid out horizontally and each takes full width of its parent for simple carousel
            // For testimonials, CSS handles spacing, we just need to change the 'active' one or scroll
            slides.forEach((slide, idx) => {
                // For a simple fade/show carousel
                if (idx === currentSlideIndex) {
                    slide.style.display = 'block'; // Or 'flex' depending on content
                    slide.style.opacity = '1';
                    // Optional: Add a class for active styling in CSS
                    slide.classList.add('active-slide');
                    // For testimonial-carousel on index.html, we might want to center the active slide
                    // This is more complex for pure CSS scroll-snap with JS, so for a basic implementation,
                    // we'll focus on just showing/hiding or fading.
                    // If using a flexbox container with scroll-snap, a simple approach is to use `scrollIntoView`
                    carousel.scrollTo({
                        left: slide.offsetLeft,
                        behavior: 'smooth'
                    });

                } else {
                    slide.style.display = 'none';
                    slide.style.opacity = '0';
                    slide.classList.remove('active-slide');
                }
            });
            // Initial show of the first slide
            slides[currentSlideIndex].style.display = 'block';
            slides[currentSlideIndex].style.opacity = '1';
            slides[currentSlideIndex].classList.add('active-slide');
        }

        // Functions for next/previous slide
        function nextSlide() {
            showSlide(currentSlideIndex + 1);
        }

        function prevSlide() {
            showSlide(currentSlideIndex - 1);
        }

        // Auto-play functionality
        function startAutoPlay() {
            if (intervalTime > 0) {
                stopAutoPlay(); // Clear any existing interval
                slideInterval = setInterval(nextSlide, intervalTime);
            }
        }

        function stopAutoPlay() {
            clearInterval(slideInterval);
        }

        // Event listeners for navigation buttons
        if (prevButtonId) {
            const prevBtn = document.getElementById(prevButtonId);
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    stopAutoPlay();
                    prevSlide();
                    startAutoPlay(); // Restart auto-play after manual navigation
                });
            }
        }

        if (nextButtonId) {
            const nextBtn = document.getElementById(nextButtonId);
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    stopAutoPlay();
                    nextSlide();
                    startAutoPlay(); // Restart auto-play after manual navigation
                });
            }
        }

        // Initialize by showing the first slide and starting auto-play
        showSlide(currentSlideIndex);
        startAutoPlay();

        // Optional: Pause auto-play on hover
        if (carousel && intervalTime > 0) {
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
        }
    }

    // --- Initialize Your Carousels Here ---
    // Example for Testimonial Carousel on index.html:
    // Make sure you add <div id="testimonialCarousel" class="testimonial-carousel"> to your index.html
    // And add buttons: <button id="testimonialPrev">Prev</button> <button id="testimonialNext">Next</button>
    initCarousel('testimonialCarousel', '.testimonial-item', 5000, 'testimonialPrev', 'testimonialNext');

    // If you have another carousel, for example, on your gallery page:
    // initCarousel('galleryCarousel', '.gallery-item', 7000, 'galleryPrev', 'galleryNext');
    // Ensure the respective HTML elements (container and buttons) exist for these IDs.

});
