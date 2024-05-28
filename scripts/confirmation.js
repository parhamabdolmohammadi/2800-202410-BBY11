document.addEventListener('DOMContentLoaded', () => {
    // Check if the URL already contains the query parameters to avoid infinite redirects
    const url = new URL(window.location.href);
    if (url.searchParams.has('total') && url.searchParams.has('service')) {
      // If the parameters are already present, update the HTML content
      const total = url.searchParams.get('total');
      const service = url.searchParams.get('service');
      document.getElementById('service').innerHTML = "Robo Service: " + service;
      document.getElementById('price').innerHTML = "Price: $" + total;
    } else {
      // If the parameters are not present, retrieve them from localStorage and update the URL
      let service = localStorage.getItem('ServiceName');
      let price = localStorage.getItem('ServicePrice');
  
      // Check if price is valid
      if (!price) {
        console.error('ServicePrice not found in localStorage');
        return;
      }
  
      // Calculate total with tax
      let total = price * 1.12;
      total = parseFloat(total.toFixed(2));
  
      // Add the query parameters to the URL
      url.searchParams.append("total", total);
      url.searchParams.append("service", service);
      url.pathname = '/confirmation'; // Update the path to navigate to the confirmation endpoint
  
      // Navigate to the new URL with query parameters
      window.location.href = url.href;
    }
  });
  
