console.log(distance1);
console.log(IDCard);
fillCard(station);
function fillCard(stat) {
   document.getElementById('card-address').innerHTML = stat.address;
   document.getElementById('station-name').innerHTML = stat.station_name;
   document.getElementById('card-availability').innerHTML = stat.robots_in_stock;
   document.getElementById('card-phone').innerHTML = stat.contact_number;
   document.getElementById('station-distance').innerHTML = Math.floor(distance1 * 100) / 100 + " km" ;

   localStorage.setItem('StationID', stat._id);
  
let serviceName = localStorage.getItem('ServiceName');
   document.getElementById('Selected-service').innerHTML =serviceName;
   let price = localStorage.getItem('ServicePrice');   
   document.getElementById('price').innerHTML ='$'+price;




}
if(station.robots_in_stock > 1) {
document.getElementById('checkoutButton').innerHTML=`<a class="link-style" href="/checkout"> 
            <span class="icon-container">
            <p style="margin-bottom: 0">Order</p>
            </span></a
            >`
} else {
   document.getElementById('checkoutButton').innerHTML=``
 document.getElementById('card-availability').innerHTML = "Out of Stock";
   document.getElementById('card-availability').style.color = "red";   
}

if(station.robots_total_stock < 20) {
   document.getElementById('addButton').innerHTML=`<a class="link-style" href="/businessCheckout"
   ><span class="icon-container">
     <p style="margin-bottom: 0">Add</p>
   </span></a
 >`
   } else {
      document.getElementById('addButton').innerHTML=``
      document.getElementById('card-availability').style.color = "red";   
   }







