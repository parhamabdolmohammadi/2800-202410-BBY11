let cardTemplate = document.getElementById("StationCardTemplate");


station.forEach(station => {
 
   var name = station.station_name;
   var address = station.address;
   var availability = station.robots_available;

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
   newcard.querySelector(".id-button").id = "id-button" + CardId;
   
   
   

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






function updateBookmark1(id, isBookmarked) {
   document.getElementById('id-placeholder' + id).value = id;
  
  console.log( document.getElementById("save-" + id).src);

  if (isBookmarked) {
   Swal.fire({
      icon: "error",
      title: "Oops...",
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
