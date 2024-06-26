

// Initialize and add the map
/**
   
   * I found this code on google Cloud Console.
   *
   * @author  "Google Cloud console"
   * @see "https://console.cloud.google.com/google/maps-apis/overview;onboard=true?project=bby11-423421"
   */


let user_lat;
let User_lng;
let cardTemplate = document.getElementById("StationCardTemplate");

/**
   * Performs the Distance Calculation. 
   * I found this code on https://stackoverflow.com/questions/24315538/finding-the-nearest-location-from-a-list-of-coordinates.
   *
   * @author contribute@geeksforgeeks.org 
   * @see https://www.geeksforgeeks.org/merge-sort/
   */

function calculateDistance(lat1, lon1, lat2, lon2) {
   const R = 6371; // Radius of the Earth in kilometers
   const dLat = (lat2 - lat1) * Math.PI / 180;
   const dLon = (lon2 - lon1) * Math.PI / 180;
   const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
             Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
             Math.sin(dLon / 2) * Math.sin(dLon / 2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   return R * c; // Distance in kilometers
 }


/**
   
   * I Learned this dynamically card generating algorithm in comp 1800 but I claim it as my work because it's right now my knowledge as well.
   *  
   * @author Parham Abdolmohammadi, BCIT
   */

 renderStations();

function renderStations() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition((position) => {
       const userLat = position.coords.latitude;
       const userLng = position.coords.longitude;

       
       station.forEach(station => {
         station.distance = calculateDistance(userLat, userLng, station.lat, station.lng);
         
       });

       station.sort((a, b) => {
         const isBookmarkedA = currentUser[0].bookmarks.includes(a._id) ? 1 : 0;
         const isBookmarkedB = currentUser[0].bookmarks.includes(b._id) ? 1 : 0;
         return isBookmarkedB - isBookmarkedA;
       });
     
      
       station.sort((a, b) => a.distance - b.distance);

       station.sort((a, b) => {
         const isBookmarkedA = currentUser[0].bookmarks.includes(a._id) ? 1 : 0;
         const isBookmarkedB = currentUser[0].bookmarks.includes(b._id) ? 1 : 0;
         return isBookmarkedB - isBookmarkedA;
       });
       const cardTemplate = document.getElementById("StationCardTemplate");
       const stationsPlaceholder = document.getElementById("stations-placeholder");
       stationsPlaceholder.innerHTML = ""; // Clear existing content

       station.forEach(station => {
         var name = station.station_name;
         var address = station.address;
         var availability = station.robots_in_stock;
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
         newcard.querySelector(".card-style").id = "card-style"+CardId;
      
         newcard.querySelector(".id-placeholder").id = "id-placeholder" + CardId;
         newcard.querySelector(".id-placeholder11").id = "id-placeholder11" + CardId;
         newcard.querySelector(".id-button").id = "id-button" + CardId;
        
         newcard.querySelector(".id-placeholder11").value =  station.distance ;
       
         newcard.querySelector(".id-placeholder2").id = "id-placeholder2" + CardId;
         newcard.querySelector(".id-button2").id = "id-button2" + CardId;
          newcard.querySelector(".select-button").onclick = () => transfer(CardId);
      
      
          newcard.querySelector(".footer-card").id = "footer-card" + CardId;
          newcard.querySelector(".more-info").id = "more-info" + CardId;
      
          newcard.querySelector(".more-info").onclick = () => moreInfo(CardId);
      
          newcard.querySelector(".telephone-icon").id = "more-info" + CardId;
      
          newcard.querySelector(".telephone-icon").onclick = () => openPhoneCall(telephone1);
         if (currentUser) {
           if (currentUser[0].bookmarks) {
            const bookmarks = currentUser[0].bookmarks;
            if (bookmarks && bookmarks.includes(CardId)) {
              newcard.querySelector(".star-image").src = '/star2.png';
              isBookmarked = true;
            }
           }
           
         }

         stationsPlaceholder.appendChild(newcard);
       });
     });
   } else {
     alert("Geolocation is not supported by this browser.");
   }
 }

function moreInfo(id) {
   document.getElementById("footer-card" + id).classList.toggle("footer-special");
}

/**
 * Link to call.
 * Generated by ChatGPT 3.5
 *
 * @author https://chat.openai.com/
 */

function openPhoneCall(phoneNumber) {
   // Check if the browser supports the tel: protocol
   if ('href' in HTMLAnchorElement.prototype) {
     // If supported, create an anchor element with the tel: protocol
     var link = document.createElement('a');
     link.href = 'tel:' + phoneNumber;
     // Simulate clicking the link
     link.click();
   } else {
     // If not supported, display an error message
     alert('Your browser does not support phone call functionality.');
   }
 } 





function updateBookmark1(id, isBookmarked) {
   document.getElementById('id-placeholder' + id).value = id;
  
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

 
