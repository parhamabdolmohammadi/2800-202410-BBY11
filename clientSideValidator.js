const Joi = require("joi");

document.addEventListener("DOMContentLoaded", function () {

// SIGN UP PAGE CLIENT SIDE VALIDATION SCHEMA ==================

// Check if on sign up page
var signInFormElement = document.querySelector("#signup-form");
if (signInFormElement != null) {

// Import schema to validate username, email, and password - signup page
const {signupSchema} = require('./signup-joi-schema');

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener('submit', (event) => {
    // Capture form fields and parse them
    var signupFormData = new FormData(signupForm);
    var signupFormDataObj = Object.fromEntries(signupFormData.entries());

    // Validate the form data (username, email, password) on the client side
    var validationResult = signupSchema.validate(signupFormDataObj, {abortEarly: false});

    // Reset all invalid form fields back to valid
    for (let i = 0; i < signupForm.elements.length; i++) {

        // Remove is-invalid bootstrap class, add is-valid bootstrap class
        signupForm.elements[i].classList.remove('is-invalid');
        signupForm.elements[i].classList.add('is-valid');
    }

    if (validationResult.error) {
        event.preventDefault();
        event.stopPropagation();

        for (var i = 0; i < validationResult.error.details.length; i++) {
            var msg_div = document.getElementsByClassName(`${validationResult.error.details[i].path[0]}-msg`)[0];
            msg_div.innerHTML = validationResult.error.details[i].message;
            var input = signupForm.elements[`${validationResult.error.details[i].path[0]}`];
            input.classList.add('is-invalid');
        }
    }
    else {
        signupForm.classList.add('was-validated');
    }

});

}

// Check if on login page
var loginFormElement = document.querySelector("#login-form");
if (loginFormElement != null) {

// LOGIN PAGE CLIENT SIDE VALIDATION SCHEMA ==================

// Import schema to validate email, and password - login page
const {loginSchema} = require('./login-joi-schema');

const loginForm = document.getElementById("login-form");

loginForm.addEventListener('submit', (event) => {

    // Capture form fields and parse them
    var loginFormData = new FormData(loginForm);
    var loginFormDataObj = Object.fromEntries(loginFormData.entries());

    // Validate the form data (username, email, password) on the client side
    var validationResult = loginSchema.validate(loginFormDataObj, {abortEarly: false});

    // Reset all invalid form fields back to valid
    for (let i = 0; i < loginForm.elements.length; i++) {

        // Remove is-invalid bootstrap class, add is-valid bootstrap class
        loginForm.elements[i].classList.remove('is-invalid');
        loginForm.elements[i].classList.add('is-valid');
    }

    if (validationResult.error) {
        event.preventDefault();
        event.stopPropagation();

        for (var i = 0; i < validationResult.error.details.length; i++) {
            var msg_div = document.getElementsByClassName(`${validationResult.error.details[i].path[0]}-msg`)[0];
            msg_div.innerHTML = validationResult.error.details[i].message;
            var input = loginForm.elements[`${validationResult.error.details[i].path[0]}`];
            input.classList.add('is-invalid');
        }
    }
    else {
        loginForm.classList.add('was-validated');
    }

});

}

});
