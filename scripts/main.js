document.addEventListener('DOMContentLoaded', () => {

    let cardTemplate = document.getElementById("ServiceCardTemplate");
    

services.forEach(service => {
 
   var description = service.description;
   let name = service.name;
   var background = service.background;
   let serviceID = service._id;
   let price = service.price;



   let newcard = cardTemplate.content.cloneNode(true);

   
   newcard.querySelector(".service-name").innerHTML = name;
   newcard.querySelector(".service-description").innerHTML = description; 
   newcard.querySelector(".service-price").innerHTML = "$"+price; 

   newcard.querySelector(".card-background").style.backgroundImage = `url(${background})`;
   newcard.querySelector(".card-background").style.backgroundSize = 'cover';
   newcard.querySelector(".card-background").style.backgroundRepeat = 'no-repeat';
   newcard.querySelector(".card-background").style.backgroundPosition = 'center';
   

   newcard.querySelector(".button-location").id = "button-location-" + serviceID;                                    
   newcard.querySelector(".button-arrow").id = "button-arrow-" + serviceID;                                    
   
   
   newcard.querySelector(".button-location").onclick = () => setID(serviceID, name, price);
   newcard.querySelector(".button-arrow").onclick= () =>  setID(serviceID, name, price)

   let stationInput = newcard.querySelector(".stationInput");
   stationInput.id = "stationInput-" + serviceID;
   stationInput.value = localStorage.getItem('ClosestStationID');

   // Set ID and value for DistanceInput
   let distanceInput = newcard.querySelector(".DistanceInput");
   distanceInput.id = "DistanceInput-" + serviceID;
   distanceInput.value = localStorage.getItem('ClosestStationDistance');
 
   
   

  
   document.getElementById("main-service-list-container-2").appendChild(newcard);

});

function setID(id, name, price) {
    localStorage.setItem('ServiceID', id);
    localStorage.setItem('ServiceName', name);
    localStorage.setItem('ServicePrice', price);
    console.log(price);
}
});

