document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('total') && url.searchParams.has('service')) {
      const total = url.searchParams.get('total');
      const service = url.searchParams.get('service');
      document.getElementById('service').innerHTML = "Robo Service: " + service;
      document.getElementById('price').innerHTML = "Price: $" + total;
    } else {
      let service = localStorage.getItem('ServiceName');
      let price = localStorage.getItem('ServicePrice');
  
      if (!price) {
        console.error('ServicePrice not found in localStorage');
        return;
      }
  
      let total = price * 1.12;
      total = parseFloat(total.toFixed(2));
  
      url.searchParams.append("total", total);
      url.searchParams.append("service", service);
      url.pathname = '/confirmation';
      window.location.href = url.href;
    }
  });
  
