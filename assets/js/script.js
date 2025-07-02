/*
    script.js - Main JavaScript for AV Tutorial Website

    This file contains core JavaScript functionalities that provide
    interactivity to the website.

    Key functionalities:
    1. Mobile Navigation Toggle: Handles opening and closing the navigation menu
       on smaller screens when the menu toggle button is clicked.
    2. Dropdown Menu Toggle (for mobile): Ensures dropdowns within the main nav
       can be toggled by clicking the parent link on touch devices.
*/

document.addEventListener('DOMContentLoaded', function() {
    // Get references to the menu toggle button and the main navigation
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = mainNav.querySelectorAll('a'); // All links in the nav
    const dropdownParents = mainNav.querySelectorAll('.dropdown > a'); // Parent links of dropdowns

    /**
     * Toggles the active class on the main navigation, showing or hiding it.
     * Also changes the menu icon between bars and times (X).
     */
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active'); // Toggles the 'active' class on the navigation
            const icon = menuToggle.querySelector('i'); // Get the icon element
            if (mainNav.classList.contains('active')) {
                // If navigation is active, show 'times' icon
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                // Set aria-expanded for accessibility
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                // If navigation is not active, show 'bars' icon
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // Set aria-expanded for accessibility
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * Closes the mobile navigation when a nav link is clicked.
     * This is useful for single-page navigations or when a user selects a page.
     * It also helps in preventing the menu from staying open after a click.
     */
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Check if the screen is small enough for mobile nav (defined by CSS media queries)
            // A simple way is to check the display style of the menuToggle button
            if (window.getComputedStyle(menuToggle).display === 'block') {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    /**
     * Handles dropdown menu toggling specifically for touch devices
     * where hover might not be reliable or intuitive.
     * On desktop, CSS :hover handles it. On mobile, we want a click.
     */
    dropdownParents.forEach(dropdownLink => {
        dropdownLink.addEventListener('click', function(event) {
            // Prevent default link behavior only if it's a dropdown parent
            // and the mobile menu is active (meaning on a mobile device)
            if (window.getComputedStyle(menuToggle).display === 'block') {
                event.preventDefault(); // Stop navigation to courses.html

                const parentLi = dropdownLink.closest('.dropdown');
                const dropdownMenu = parentLi.querySelector('.dropdown-menu');

                // Toggle visibility of the dropdown menu
                // Using max-height for smooth transition
                if (dropdownMenu.style.maxHeight && dropdownMenu.style.maxHeight !== '0px') {
                    dropdownMenu.style.maxHeight = '0';
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.transform = 'translateY(10px)';
                    dropdownMenu.style.display = 'none'; // Hide completely after transition
                } else {
                    dropdownMenu.style.display = 'block'; // Show to calculate scrollHeight
                    dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
                    dropdownMenu.style.opacity = '1';
                    dropdownMenu.style.transform = 'translateY(0)';
                }

                // Toggle the chevron icon
                const icon = dropdownLink.querySelector('i.fa-chevron-down');
                if (icon) {
                    icon.classList.toggle('fa-chevron-down');
                    icon.classList.toggle('fa-chevron-up');
                }
            }
        });
    });

    // Close mobile menu if clicked outside (optional, but good UX)
    document.addEventListener('click', function(event) {
        if (window.getComputedStyle(menuToggle).display === 'block' &&
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target) &&
            mainNav.classList.contains('active')) {
            
            mainNav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            menuToggle.setAttribute('aria-expanded', 'false');

            // Also ensure any open dropdowns within the mobile nav are closed
            mainNav.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.maxHeight = '0';
                menu.style.opacity = '0';
                menu.style.transform = 'translateY(10px)';
                menu.style.display = 'none';
            });
            mainNav.querySelectorAll('.dropdown > a i.fa-chevron-up').forEach(icon => {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            });
        }
    });

});
