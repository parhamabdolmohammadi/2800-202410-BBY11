console.log(distance1);

fillCard(station);
function fillCard(stat) {
   document.getElementById('card-address').innerHTML = stat.address;
   document.getElementById('station-name').innerHTML = stat.station_name;
   document.getElementById('card-availability').innerHTML = stat.robots_available;
   document.getElementById('card-phone').innerHTML = stat.contact_number;
   document.getElementById('station-distance').innerHTML = Math.floor(distance1 * 100) / 100 + " km" ;

   localStorage.setItem('StationID', stat._id);
  
let serviceName = localStorage.getItem('ServiceName');
   document.getElementById('Selected-service').innerHTML =serviceName;
   let price = localStorage.getItem('ServicePrice');   
   document.getElementById('price').innerHTML ='$'+price;


}
