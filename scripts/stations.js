console.log("hi");



let cardTemplate = document.getElementById("StationCardTemplate");


station.forEach(station => {
 
   var name = station.station_name;
   var address = station.address;
   var availability = station.robots_available;


   console.log("parham" + address);
   let newcard = cardTemplate.content.cloneNode(true);
   var CardId = station._id;

   newcard.querySelector(".card-name").innerHTML = name;
   newcard.querySelector(".card-address").innerHTML = address;
   newcard.querySelector(".card-availability").innerHTML = availability;



   document.getElementById("stations-placeholder").appendChild(newcard);

});
