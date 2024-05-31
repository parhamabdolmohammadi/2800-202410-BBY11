

// Initialize and add the map
/**
   
   * I found this code on google Cloud Console.
   *
   * @author  "Google Cloud console"
   * @see "https://console.cloud.google.com/google/maps-apis/overview;onboard=true?project=bby11-423421"
   */


let map;
let user_lat;
let User_lng;
let User_Position;
var closest = 100;
var closestID;
let cardTemplate = document.getElementById("StationCardTemplate");

console.log("closetId " + closestID);

getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Browser doesn't support geolocation.");
  }
}

async function showPosition(position) {
   user_lat = position.coords.latitude;
   User_lng = position.coords.longitude;
   User_Position = {
     lat: user_lat,
     lng: User_lng,
   };
 

  

station.forEach(station => {
   let d = distance(station.lat, station.lng);
  

   var name = station.station_name.replace(/['"]+/g, ''); // Remove quotes from station name
   var address = station.address.replace(/['"]+/g, ''); // Remove quotes from address
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
   
   newcard.querySelector(".id-button").id = "id-button" + CardId;
   
 
   newcard.querySelector(".id-placeholder2").id = "id-placeholder2" + CardId;
   newcard.querySelector(".id-placeholder11").id = "id-placeholder11" + CardId;
   newcard.querySelector(".id-button2").id = "id-button2" + CardId;
    newcard.querySelector(".select-button").onclick = () => transfer(CardId, d);


    newcard.querySelector(".footer-card").id = "footer-card" + CardId;
    newcard.querySelector(".more-info").id = "more-info" + CardId;

    newcard.querySelector(".more-info").onclick = () => moreInfo(CardId);

    newcard.querySelector(".telephone-icon").id = "more-info" + CardId;

    newcard.querySelector(".telephone-icon").onclick = () => openPhoneCall(telephone1);
   
   

   if (currentUser) {
      var bookmarks = currentUser[0].bookmarks;
      console.log(bookmarks);
      if(bookmarks && bookmarks.includes(CardId)) {
         newcard.querySelector(".star-image").src = '/star2.png';
         isBookmarked = true;
         document.getElementById("not-available").innerHTML= "";
         document.getElementById("stations-placeholder").appendChild(newcard);
      } 
   }

   

});
}  
function moreInfo(id) {
   document.getElementById("footer-card" + id).classList.toggle("footer-special");
}
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

  function transfer(id, distance)  {

   document.getElementById('id-placeholder2' + id).value = id;
   document.getElementById("id-placeholder11" + id).value = distance;
      document.getElementById("id-button2" + id).click();
   }










  
function toRad(degrees) {
  return degrees * (Math.PI / 180);
}


function distance(lat, lng) {
  let R = 6371; // Radius of the earth in km
  let dLat = toRad(user_lat - lat);  // Javascript functions in radians
  let dLon = toRad(User_lng - lng);
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(user_lat)) * Math.cos(toRad(lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // Distance in km
  return d;
}
