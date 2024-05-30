let serviceName = localStorage.getItem('ServiceName');
let servicePrice = localStorage.getItem('ServicePrice');
let stationId = localStorage.getItem('StationID');
let pst = servicePrice * 0.07;
let gst = servicePrice * 0.05;
console.log("gst: " + gst + " pst: " + pst);

if (serviceName.length > 10) {
  serviceName = serviceName.substring(0, 15) + "...";
}

// Rounding to 2 decimal points
pst = parseFloat(pst.toFixed(2));
gst = parseFloat(gst.toFixed(2));

if (pst < 0.01) {
  pst = 0.01;
}
if (gst < 0.01) {
  gst = 0.01;
}



console.log("rounded gst: " + gst + " pst: " + pst);
gst = parseFloat(gst);
pst = parseFloat(pst);

let total = parseFloat((parseFloat(servicePrice) + pst + gst).toFixed(2));

document.getElementById('stationId').value = stationId;
document.getElementById('stationID').value = stationId;
console.log("Value: " + document.getElementById('stationID').value);
document.getElementById('stationId').innerHTML = '<small style="font-size:8pt">' + stationId + '</small>';

document.addEventListener('DOMContentLoaded', (event) => {
  const links = document.querySelectorAll('.dynamic-link');
  links.forEach(link => {
    let currentHref = new URL(link.href);
    currentHref.searchParams.append('stationId', stationId);
    link.href = currentHref.toString();
  });
});

if (pst.toString().split('.')[1].length < 2) {
  pst = pst + "0";
}

if (gst.toString().split('.')[1].length < 2) {
  gst = gst + "0";
}

if (total.toString().split('.')[1].length < 2) {
  total = total + "0";
} 

document.getElementById('pst').innerHTML = '$' + pst;
document.getElementById('gst').innerHTML = '$' + gst;
document.getElementById('total').innerHTML = '$' + total;
document.getElementById('Selected-service').innerHTML = serviceName;
document.getElementById('Selected-price').innerHTML = '$' + servicePrice;
