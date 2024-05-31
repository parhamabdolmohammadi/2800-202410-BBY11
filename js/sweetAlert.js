// All the sweet alerts that you see in this page are from the website: https://sweetalert2.github.io/

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
  
  

  document.addEventListener('DOMContentLoaded', function() {

    var DAlink = document.getElementById('deleteAccountBtn');
  
    
    if (DAlink) {
        
        DAlink.addEventListener('click', function(event) {
  
            deleteAccount();
        });
    }
  });
  
  function deleteAccount() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete my account"
      }).then((result) => {
        if (result.isConfirmed) {
            
          Swal.fire({
            title: "Deleted!",
            text: "Your account has been deleted.",
            showConfirmButton: false,
            icon: "success"
          });

          setTimeout(function () {
            window.location.href = "/deleteAccount";
          }, 1300);
        }
      });
    }



    document.addEventListener('DOMContentLoaded', function() {

      var logoutSettingLink = document.getElementById('editProfileBtn');
    
      
      if (logoutSettingLink) {
          
          logoutSettingLink.addEventListener('click', function(event) {
    
              handleEdit();
          });
      }
    });
    
    function handleEdit() {
        Swal.fire({
          // position: "middle",
          icon: "success",
          title: "You've changed your info succesfully!",
          showConfirmButton: false,
          timer: 1000
      });
      
      setTimeout(function() {
          window.location.href = '/edit-profile';
      }, 1300);
      }



      
      document.addEventListener('DOMContentLoaded', function() {

        var logoutSettingLink = document.getElementById('editPasswordBtn');
      
        
        if (logoutSettingLink) {
            
            logoutSettingLink.addEventListener('click', function(event) {
      
                handlePassword();
            });
        }
      });
      
      function handlePassword() {
          Swal.fire({
            // position: "middle",
            icon: "success",
            title: "You've changed your password succesfully!",
            showConfirmButton: false,
            timer: 1000
        });
        
        setTimeout(function() {
            window.location.href = '/edit-password';
        }, 2200);
        }
    