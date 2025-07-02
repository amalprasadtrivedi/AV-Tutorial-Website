/*
    form-validation.js - JavaScript for Contact Form Validation and Submission

    This file handles:
    1. Client-side validation for the enquiry form on contact.html.
    2. Preventing form submission if client-side validation fails.
    3. Sending valid form data to a Vercel Serverless Function (api/contact.js)
       via a fetch request.
    4. Displaying success or error messages based on the serverless function's response.
*/

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    // Get references to all input fields and their corresponding error message elements
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');

    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError'); // Although phone is optional, good to have error element

    const messageInput = document.getElementById('message');
    const messageError = document.getElementById('messageError');

    const courseSelect = document.getElementById('course'); // Get the course select element

    const formMessage = document.getElementById('formMessage'); // For displaying submission success/error

    // Function to display an error message
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        // Check if previousSibling is an input element before adding class
        if (element.previousElementSibling && (element.previousElementSibling.tagName === 'INPUT' || element.previousElementSibling.tagName === 'TEXTAREA' || element.previousElementSibling.tagName === 'SELECT')) {
            element.previousElementSibling.classList.add('error');
        }
    }

    // Function to hide an error message
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
        if (element.previousElementSibling && (element.previousElementSibling.tagName === 'INPUT' || element.previousElementSibling.tagName === 'TEXTAREA' || element.previousElementSibling.tagName === 'SELECT')) {
            element.previousElementSibling.classList.remove('error');
        }
    }

    // Function to validate the name field
    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameError, 'Name is required.');
            return false;
        }
        hideError(nameError);
        return true;
    }

    // Function to validate the email field
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

        if (emailValue === '') {
            showError(emailError, 'Email is required.');
            return false;
        } else if (!emailPattern.test(emailValue)) {
            showError(emailError, 'Please enter a valid email address.');
            return false;
        }
        hideError(emailError);
        return true;
    }

    // Function to validate the phone field (optional, but if filled, must be numeric)
    function validatePhone() {
        const phoneValue = phoneInput.value.trim();
        // Allows digits, +, -, (, ), space. Can be empty.
        const phonePattern = /^[0-9+\-() ]*$/;

        if (phoneValue !== '' && !phonePattern.test(phoneValue)) {
            showError(phoneError, 'Please enter a valid phone number (digits, +, -, (, ) allowed).');
            return false;
        }
        hideError(phoneError);
        return true;
    }

    // Function to validate the message field
    function validateMessage() {
        if (messageInput.value.trim() === '') {
            showError(messageError, 'Message is required.');
            return false;
        }
        hideError(messageError);
        return true;
    }

    // Add real-time validation on input blur
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone); // Optional field, validates if value is present
    messageInput.addEventListener('blur', validateMessage);

    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission initially

            // Validate all fields on submit
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();
            const isMessageValid = validateMessage();

            // If all client-side validations pass, proceed with sending data
            if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
                // Prepare form data
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    phone: phoneInput.value.trim(),
                    course: courseSelect.value, // Get selected course value
                    message: messageInput.value.trim()
                };

                // Show a loading/sending message
                formMessage.classList.remove('success', 'error');
                formMessage.classList.add('info'); // Add an 'info' class for styling if needed
                formMessage.textContent = 'Sending your message...';
                formMessage.style.display = 'block';

                try {
                    // Send data to your Vercel Serverless Function
                    const response = await fetch('/api/contact', { // This path maps to your api/contact.js
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    const result = await response.json(); // Parse the JSON response from the serverless function

                    if (response.ok) { // Check if the HTTP status code is 2xx
                        // Success response from serverless function
                        formMessage.classList.remove('info', 'error');
                        formMessage.classList.add('success');
                        formMessage.textContent = result.message || 'Your message has been sent successfully! We will get back to you soon.';
                        contactForm.reset(); // Clear the form fields after successful submission

                        // Hide message after a few seconds
                        setTimeout(() => {
                            formMessage.style.display = 'none';
                            formMessage.textContent = '';
                        }, 5000); // Hide after 5 seconds

                    } else {
                        // Error response from serverless function (e.g., 400, 500)
                        formMessage.classList.remove('info', 'success');
                        formMessage.classList.add('error');
                        formMessage.textContent = result.message || 'Failed to send message. Please try again later.';
                    }
                } catch (error) {
                    // Network error or other fetch-related issues
                    console.error('Error sending form data:', error);
                    formMessage.classList.remove('info', 'success');
                    formMessage.classList.add('error');
                    formMessage.textContent = 'An unexpected error occurred. Please check your internet connection and try again.';
                }

            } else {
                // If any client-side validation fails
                formMessage.classList.remove('success', 'info');
                formMessage.classList.add('error');
                formMessage.textContent = 'Please correct the errors in the form before submitting.';
                formMessage.style.display = 'block';
            }
        });
    }
});
