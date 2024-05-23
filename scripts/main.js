document.addEventListener('DOMContentLoaded', () => {

    let cardTemplate = document.getElementById("ServiceCardTemplate");
    

    services.forEach(service => {
    
        var description = service.description;
        let name = service.name;
        var background = service.background;
        let serviceID = service._id;
        let newcard = cardTemplate.content.cloneNode(true);
    
        newcard.querySelector(".service-name").innerHTML = name;
        newcard.querySelector(".service-description").innerHTML = description;
    
        newcard.querySelector(".card-background").style.backgroundImage = `url(${background})`;
        newcard.querySelector(".card-background").style.backgroundSize = 'cover';
        newcard.querySelector(".card-background").style.backgroundRepeat = 'no-repeat';
        newcard.querySelector(".card-background").style.backgroundPosition = 'center';
    
        newcard.querySelector(".button-location").id = "button-location-" + serviceID;
    
    
        newcard.querySelector(".button-location").onclick = () => setID(serviceID, name);
    
    
        document.getElementById("main-service-list-container-2").appendChild(newcard);
    
    });
    
    function setID(id, name) {
        localStorage.setItem('ServiceID', id);
        localStorage.setItem('ServiceName', name);
    }

})
