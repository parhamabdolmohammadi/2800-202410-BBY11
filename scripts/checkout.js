let serviceName = localStorage.getItem('ServiceName');
let servicePrice = localStorage.getItem('ServicePrice');
let stationId= localStorage.getItem('StationID');
let pst = servicePrice * 0.07;
let gst = servicePrice * 0.05;

// Rounding to 2 decimal points
pst = parseFloat(pst.toFixed(2));
gst = parseFloat(gst.toFixed(2));
let total = parseFloat((parseFloat(servicePrice) + pst + gst).toFixed(2));
console.log("pst: "+pst + " gst: "+gst + " total: "+total );

document.getElementById('stationId').value = stationId;
document.getElementById('stationID').value = stationId;
console.log("Value: "+document.getElementById('stationID').value);
document.getElementById('stationId').innerHTML = '<small style="font-size:8pt">'+stationId+'</small>';

document.addEventListener('DOMContentLoaded', (event) => {
    const links = document.querySelectorAll('.dynamic-link');
    const additionalParam = 'stationId=' + stationId;

    links.forEach(link => {
      let currentHref = new URL(link.href);
      currentHref.searchParams.append('stationId', stationId);
      link.href = currentHref.toString();
    });
  });
document.getElementById('pst').innerHTML = '$'+pst;
document.getElementById('gst').innerHTML = '$'+gst;
document.getElementById('total').innerHTML = '$'+total;
document.getElementById('Selected-service').innerHTML = serviceName;
document.getElementById('Selected-price').innerHTML = '$'+servicePrice;
