// Function that changes the the password input type 
  // attribute to text when clicked on, and reveals the text entered
  // Code adapted from:
  // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_toggle_password
  function togglePasswordVisability(passwordInputElementId, visabilityButtonElementId) {

    // Get either signup or login page element Ids
    var passwordInputId = passwordInputElementId;
    var visabilityButtonId = visabilityButtonElementId;

    var passwordInput = document.getElementById(passwordInputId);
    if (passwordInput.type === "password") { // If the input type was initially "password"
      // Change the input type to "text"
      passwordInput.type = "text";

      // Change the icon type to visable eye google icon
      document.getElementById(visabilityButtonId).textContent = 'visibility';
    } else { // If the input type was initially "text"
      // Change the input type to "password"
      passwordInput.type = "password";

      // Change the icon type to invisable eye google icon
      document.getElementById(visabilityButtonId).textContent = 'visibility_off';
    }
  }
