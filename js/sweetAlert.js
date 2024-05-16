document.addEventListener('DOMContentLoaded', function() {

  var logoutSettingLink = document.getElementById('logout-setting');

  
  if (logoutSettingLink) {
      
      logoutSettingLink.addEventListener('click', function(event) {

          handleLogout();
      });
  }
});

function handleLogout() {
    Swal.fire({
      // position: "middle",
      icon: "success",
      title: "You've logged out succesfully!",
      showConfirmButton: false,
      timer: 1000
  });
  
  setTimeout(function() {
      window.location.href = '/logout';
  }, 1300);
  }
  
  