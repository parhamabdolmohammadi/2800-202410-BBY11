
let cardTemplate = document.getElementById("StationCardTemplate");


station.forEach(station => {
 
   var name = station.station_name;
   var address = station.address;
   var availability = station.robots_available;
   var telephone1 = station.contact_number;

   let isBookmarked = false;

   let newcard = cardTemplate.content.cloneNode(true);
   var CardId = station._id;
   
   newcard.querySelector(".card-name").innerHTML = name;
   newcard.querySelector(".card-address").innerHTML = address;
   newcard.querySelector(".card-availability").innerHTML = availability;

   newcard.querySelector(".star-image").id = "save-" + CardId;
   newcard.querySelector(".star-image").onclick = () => updateBookmark1(CardId, isBookmarked);
   newcard.querySelector(".star-image").src = '/star1.png';
   
   newcard.querySelector(".id-placeholder").id = "id-placeholder" + CardId;
   newcard.querySelector(".id-placeholder11").id = "id-placeholder11" + CardId;
   newcard.querySelector(".id-button").id = "id-button" + CardId;
   
 
   newcard.querySelector(".id-placeholder2").id = "id-placeholder2" + CardId;
   newcard.querySelector(".id-button2").id = "id-button2" + CardId;
    newcard.querySelector(".select-button").onclick = () => transfer(CardId);


    newcard.querySelector(".footer-card").id = "footer-card" + CardId;
    newcard.querySelector(".more-info").id = "more-info" + CardId;

    newcard.querySelector(".more-info").onclick = () => moreInfo(CardId);

    newcard.querySelector(".telephone-icon").id = "more-info" + CardId;

    newcard.querySelector(".telephone-icon").onclick = () => telephone(telephone1);
   
   

   if (currentUser) {
      var bookmarks = currentUser[0].bookmarks;
      console.log(bookmarks);
      if(bookmarks && bookmarks.includes(CardId)) {
         newcard.querySelector(".star-image").src = '/star2.png';
         isBookmarked = true;
      } 
   }

   document.getElementById("stations-placeholder").appendChild(newcard);

});

function moreInfo(id) {
   document.getElementById("footer-card" + id).classList.toggle("footer-special");
}

function telephone(telephone) {
   Swal.fire({
      title: telephone,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
}



function updateBookmark1(id, isBookmarked) {
   document.getElementById('id-placeholder' + id).value = id;
  
  console.log( document.getElementById("save-" + id).src);

  if (isBookmarked) {
   Swal.fire({
      icon: "error",
      text: "Bookmark Removed",
      showConfirmButton: false,
   });
  } else {
   Swal.fire({
      position: "middle",
      icon: "success",
      title: "Bookmarked",
      showConfirmButton: false,
      timer: 1500
   });
  }






   document.getElementById("id-button" + id).click();
   
   }

  function transfer(id)  {

   document.getElementById('id-placeholder2' + id).value = id;

      document.getElementById("id-button2" + id).click();
   }