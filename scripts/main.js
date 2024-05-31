
/**
   
   * I Learned this dynamically card generating algorithm in comp 1800 but I claim it as my work because it's right now my knowledge as well.
   *  
   * @author Parham Abdolmohammadi, BCIT
   */


document.addEventListener('DOMContentLoaded', () => {

    let cardTemplate = document.getElementById("ServiceCardTemplate");
    let i = 1;

services.forEach(service => {
 
   var description = service.description;
   let name = service.name;
   var background = service.background;
   let serviceID = service._id;
   let price = service.price;



   let newcard = cardTemplate.content.cloneNode(true);

//    newcard.querySelector('.eachCard').classList.add(`card${i}`) // identify each card 
   newcard.querySelector(".service-name").innerHTML = name;
   newcard.querySelector(".service-description").innerHTML = description; 
   
   newcard.querySelector(".service-price").innerHTML = "$"+price; 

   newcard.querySelector(".card-background").style.backgroundImage = `url(${background})`;
   newcard.querySelector(".card-background").style.backgroundSize = 'cover';
   newcard.querySelector(".card-background").style.backgroundRepeat = 'no-repeat';
   newcard.querySelector(".card-background").style.backgroundPosition = 'center';
   
   
   newcard.querySelector(".service-name").id = 'service-name'+ serviceID;
   newcard.querySelector(".stations-button").id = 'stations-button'+ serviceID;
   newcard.querySelector(".service-price").id = 'service-price'+ serviceID;
   newcard.querySelector(".button-location").id = "button-location-" + serviceID;                                    
   newcard.querySelector(".button-arrow").id = "button-arrow-" + serviceID;                                    
   newcard.querySelector(".description").id = "description" + serviceID;                                    
   newcard.querySelector(".description2").id = "description2" + serviceID;                                    
   newcard.querySelector(".cardi").id = "cardi" + serviceID;   
   newcard.querySelector(".cardi3").id = "cardi3" + serviceID;                                  
   newcard.querySelector(".service-description").id = "service-description" + serviceID; 
   newcard.querySelector(".service-description").style.display = 'none'; 

   
   newcard.querySelector(".button-location").onclick = () => setID(serviceID, name, price);
   newcard.querySelector(".button-arrow").onclick= () =>  setID(serviceID, name, price)
   newcard.querySelector(".description").onclick= () =>  setDescription(serviceID);
   newcard.querySelector(".description2").onclick= () =>  undoDescription(serviceID);
   newcard.querySelector(".description2").style.display = 'none'; 

   let stationInput = newcard.querySelector(".stationInput");
   stationInput.id = "stationInput-" + serviceID;
   stationInput.value = localStorage.getItem('ClosestStationID');

   // Set ID and value for DistanceInput
   let distanceInput = newcard.querySelector(".DistanceInput");
   distanceInput.id = "DistanceInput-" + serviceID;
   distanceInput.value = localStorage.getItem('ClosestStationDistance');
 
   
   

  
   document.getElementById("main-service-list-container-2").appendChild(newcard);

   i++;
});

function setID(id, name, price) {
    localStorage.setItem('ServiceID', id);
    localStorage.setItem('ServiceName', name);
    localStorage.setItem('ServicePrice', price);
    console.log(price);
}


function setDescription(serviceID) {
    // Toggle the 'flipped' class on the card
    document.getElementById("cardi" + serviceID).classList.toggle("flipped");
    document.getElementById( "description" + serviceID).classList.toggle("flipped");
    document.getElementById("service-description" + serviceID).classList.toggle("flipped");
    document.getElementById("description2" + serviceID).classList.toggle("flipped");
    document.getElementById( "service-description" + serviceID).style.display = 'block'; 
    document.getElementById( "description2" + serviceID).style.display = 'block'; 
    document.getElementById( "description" + serviceID).style.display = 'block'; 
    document.getElementById( "description" + serviceID).style.display = 'none'; 
    // Hide the button-arrow element by setting its display style to 'none'
    document.getElementById("button-arrow-" + serviceID).style.display = 'none';
    
    document.getElementById('service-price'+ serviceID).style.display = 'none';
    document.getElementById('stations-button'+ serviceID).style.display = 'none';
    document.getElementById('service-name'+ serviceID).style.display = 'none';

    document.getElementById("cardi3" + serviceID).classList.toggle("cardi33");
    
}

function undoDescription(serviceID) {
    document.getElementById("cardi" + serviceID).classList.toggle("flipped");
    document.getElementById( "description" + serviceID).classList.toggle("flipped");
    document.getElementById("service-description" + serviceID).classList.toggle("flipped");
    document.getElementById("description2" + serviceID).classList.toggle("flipped");
    
    document.getElementById( "service-description" + serviceID).style.display = 'none'; 
    document.getElementById( "description2" + serviceID).style.display = 'none'; 

    document.getElementById( "description" + serviceID).style.display = 'block'; 
    document.getElementById("button-arrow-" + serviceID).style.display = 'block';
    
    document.getElementById('service-price'+ serviceID).style.display = 'block';
    document.getElementById('stations-button'+ serviceID).style.display = 'block';
    document.getElementById('service-name'+ serviceID).style.display = 'block';

    document.getElementById("cardi3" + serviceID).classList.toggle("cardi33");
}


});

