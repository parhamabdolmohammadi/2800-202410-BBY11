let service = localStorage.getItem('ServiceName');
let price = localStorage.getItem('ServicePrice');
let total = price*1.12;
total = parseFloat(total.toFixed(2));

document.getElementById('service').innerHTML = "Robo Service: "+service;
document.getElementById('price').innerHTML = "Price: $"+total;