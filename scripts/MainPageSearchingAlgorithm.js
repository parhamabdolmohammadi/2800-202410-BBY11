document.addEventListener("DOMContentLoaded", function () {
      
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/main.css";
    document.head.appendChild(link);
  });
  document.addEventListener("DOMContentLoaded", function () {
      // * Search bar functionality
      // Get references to the search input and icon
      const searchInput = document.getElementById("search-text");
      const searchIcon = document.getElementById("search-button");

      document.querySelector('.reset-search').addEventListener('click', () => {
        // console.log('button is clicked');
        searchInput.value = ''
        searchIcon.click()
      })
    // Add event listener to the search icon for click events
    searchIcon.addEventListener("click", function (event) {
      console.log('clicked');
      document.querySelector('.search-top').scrollIntoView({behavior: "smooth"})
      // console.log("clicked");
      event.preventDefault(); // Prevent default action (e.g., form submission)

      if (searchInput.value === 'dance') {
        console.log('dance is typed');
        let i = 0.2;
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
          console.log(card);
          card.classList.add('dance')
          card.style.animationDelay = i + 's'
          i += 0.2
    });
        return
      }

      if (searchInput.value === 'stop') {
        console.log('stop is typed');
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
          card.classList.remove('dance')
        })
        return
      }
      const query = searchInput.value;
      // console.log(query);

        // Send a POST request to the server
        fetch("/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query }),
        })
          .then((response) => response.json())
          .then((data) => {
            data.result.forEach((item) => {
              //console.log(item.name); // Accessing the 'name' property of each item
              //console.log(item.description); // Accessing the 'description' property of each item
            });
            //console.log(data.result);
            renderServices(data.result);
          })
          .catch((error) => {
            console.error("Error sending search request:", error);
          });
      });

      

    });

    function renderServices(filteredServices) {

      const servicesContainer = document.getElementById(
      "main-service-list-container-2"
    );
    // console.log(servicesContainer);
    // servicesContainer.innerHTML = "";
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.remove();
      // console.log('removed');
    });
    if (filteredServices.length == 0) {
      const notFound = document.createElement("div");
      const notFoundText = document.createElement('p')
      const notFoundImage = document.createElement('img')
      notFound.classList.add('notfound')
      notFound.classList.add('card')

      notFoundText.textContent = "No services found";
      notFoundImage.src = 'sad.png'

      notFound.appendChild(notFoundText)
      notFound.appendChild(notFoundImage)
      document
        .getElementById("main-service-list-container-2")
        .appendChild(notFound);
    } else {
      filteredServices.forEach((service) => {
      let price = service.price;
      let name = service.name;
      let description = service.description;
      let background = service.background;
      let serviceID = service._id;


      newcard = document
        .getElementById("ServiceCardTemplate")
        .content.cloneNode(true);

      newcard.querySelector(".service-name").innerHTML = name;
      newcard.querySelector(".service-price").innerHTML = "$"+price;
      newcard.querySelector(".service-description").innerHTML = description;
      newcard.querySelector(
        ".card-background"
      ).style.backgroundImage = `url(${background})`;
      newcard.querySelector(".card-background").style.backgroundSize = 'cover';
   newcard.querySelector(".card-background").style.backgroundRepeat = 'no-repeat';
   newcard.querySelector(".card-background").style.backgroundPosition = 'center';





    newcard.querySelector(".service-name").id = 'service-name'+ serviceID;
   newcard.querySelector(".stations-button").id = 'stations-button'+ serviceID;
   newcard.querySelector(".service-price").id = 'service-price'+ serviceID;
   newcard.querySelector(".button-location").id = "button-location-" + serviceID;                                    
   newcard.querySelector(".button-arrow").id = "button-arrow-" + serviceID;                                    
   newcard.querySelector(".description").id = "description" + serviceID;                                    
   newcard.querySelector(".description2").id = "description2" + serviceID;                                    
   newcard.querySelector(".cardi").id = "cardi" + serviceID;   
   newcard.querySelector(".cardi3").id = "cardi3" + serviceID;                                  
   newcard.querySelector(".service-description").id = "service-description" + serviceID; 
   newcard.querySelector(".service-description").style.display = 'none'; 

   
   newcard.querySelector(".button-location").onclick = () => setID(serviceID, name, price);
   newcard.querySelector(".button-arrow").onclick= () =>  setID(serviceID, name, price)
   newcard.querySelector(".description").onclick= () =>  setDescription(serviceID);
   newcard.querySelector(".description2").onclick= () =>  undoDescription(serviceID);
   newcard.querySelector(".description2").style.display = 'none'; 

   let stationInput = newcard.querySelector(".stationInput");
   stationInput.id = "stationInput-" + serviceID;
   stationInput.value = localStorage.getItem('ClosestStationID');

   // Set ID and value for DistanceInput
   let distanceInput = newcard.querySelector(".DistanceInput");
   distanceInput.id = "DistanceInput-" + serviceID;
   distanceInput.value = localStorage.getItem('ClosestStationDistance');
 

        document
        .getElementById("main-service-list-container-2")
        .appendChild(newcard);
      });
    }
    
    function setID(id, name) {
      localStorage.setItem("ServiceID", id);
      localStorage.setItem("ServiceName", name);
      localStorage.setItem('ServicePrice', price);
    }

    function setDescription(serviceID) {
    // Toggle the 'flipped' class on the card
    document.getElementById("cardi" + serviceID).classList.toggle("flipped");
    document.getElementById( "description" + serviceID).classList.toggle("flipped");
    document.getElementById("service-description" + serviceID).classList.toggle("flipped");
    document.getElementById("description2" + serviceID).classList.toggle("flipped");
    document.getElementById( "service-description" + serviceID).style.display = 'block'; 
    document.getElementById( "description2" + serviceID).style.display = 'block'; 
    document.getElementById( "description" + serviceID).style.display = 'block'; 
    document.getElementById( "description" + serviceID).style.display = 'none'; 
    // Hide the button-arrow element by setting its display style to 'none'
    document.getElementById("button-arrow-" + serviceID).style.display = 'none';
    
    document.getElementById('service-price'+ serviceID).style.display = 'none';
    document.getElementById('stations-button'+ serviceID).style.display = 'none';
    document.getElementById('service-name'+ serviceID).style.display = 'none';

    document.getElementById("cardi3" + serviceID).classList.toggle("cardi33");
    
}

function undoDescription(serviceID) {
    document.getElementById("cardi" + serviceID).classList.toggle("flipped");
    document.getElementById( "description" + serviceID).classList.toggle("flipped");
    document.getElementById("service-description" + serviceID).classList.toggle("flipped");
    document.getElementById("description2" + serviceID).classList.toggle("flipped");
    
    document.getElementById( "service-description" + serviceID).style.display = 'none'; 
    document.getElementById( "description2" + serviceID).style.display = 'none'; 

    document.getElementById( "description" + serviceID).style.display = 'block'; 
    document.getElementById("button-arrow-" + serviceID).style.display = 'block';
    
    document.getElementById('service-price'+ serviceID).style.display = 'block';
    document.getElementById('stations-button'+ serviceID).style.display = 'block';
    document.getElementById('service-name'+ serviceID).style.display = 'block';

    document.getElementById("cardi3" + serviceID).classList.toggle("cardi33");
}
  }
