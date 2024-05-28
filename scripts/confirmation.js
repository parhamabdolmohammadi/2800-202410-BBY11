let service = localStorage.getItem('ServiceName');
let price = localStorage.getItem('ServicePrice');
let total = price*1.12;
total = parseFloat(total.toFixed(2));

const url = new URL(window.location.href);
url.searchParams.append("total", total);

url.searchParams.append("service", service);
window.history.pushState({}, '', url);

document.getElementById('service').innerHTML = "Robo Service: "+service;
document.getElementById('price').innerHTML = "Price: $"+total;