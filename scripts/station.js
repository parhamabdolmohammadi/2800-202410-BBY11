console.log(distance1);
console.log(IDCard);
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


    document.querySelector('.id-placeholder2').id =  "id-placeholder2" +IDCard  ;

    document.querySelector('.id-placeholder11').id =  "id-placeholder11" + distance1;

    document.querySelector('.button1').onclick  =  () => setInputs();


}


function setInputs() {
   document.getElementById("id-placeholder2" + IDCard ).value = IDCard;
   document.getElementById("id-placeholder11" + distance1).value = distance1;
   document.querySelector('.id-button2').click();

 
}






