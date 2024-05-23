let serviceName = localStorage.getItem('ServiceName');
let servicePrice = localStorage.getItem('ServicePrice');
let pst = servicePrice * 0.07;
let gst = servicePrice * 0.05;

// Rounding to 2 decimal points
pst = parseFloat(pst.toFixed(2));
gst = parseFloat(gst.toFixed(2));
let total = parseFloat(servicePrice) + pst + gst;

document.getElementById('pst').innerHTML = '$'+pst;
document.getElementById('gst').innerHTML = '$'+gst;
document.getElementById('total').innerHTML = '$'+total;
document.getElementById('Selected-service').innerHTML = serviceName;
document.getElementById('Selected-price').innerHTML = '$'+servicePrice;
