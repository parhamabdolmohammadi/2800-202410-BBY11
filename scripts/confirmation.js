let service = localStorage.getItem('ServiceName');
let price = localStorage.getItem('ServicePrice');

document.getElementById('service').innerHTML = "Robo Service: "+service;
document.getElementById('price').innerHTML = "Price: $"+price;