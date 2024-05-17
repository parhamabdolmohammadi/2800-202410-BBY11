let cardTemplate = document.getElementById("StationCardTemplate");


station.forEach(station => {
 
   var name = station.station_name;
   var address = station.address;
   var availability = station.robots_available;



   let newcard = cardTemplate.content.cloneNode(true);
   var CardId = station._id;
   
   newcard.querySelector(".card-name").innerHTML = name;
   newcard.querySelector(".card-address").innerHTML = address;
   newcard.querySelector(".card-availability").innerHTML = availability;

   
   
//    newcard.querySelector(".star-image").src = '/star2.png';
   
  
   

   

   if (currentUser) {
      var bookmarks = currentUser[0].bookmarks;
      console.log(bookmarks);
      if(bookmarks && !bookmarks.includes(CardId)) {
        return;
      }
      
    
         
   }

   document.getElementById("stations-placeholder").appendChild(newcard);

});