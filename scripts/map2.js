  // Initialize and add the map
  let map;
  let user_lat;
  let User_lng;
  let User_Position;
  var closest = 100;
  var closestID;

  

  console.log("closetId " + closestID);

  getLocation();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Browser doesn't support geolocation.");
    }
  }

  
  async function showPosition(position) {
    user_lat = position.coords.latitude;
    User_lng = position.coords.longitude;
    User_Position = {
      lat: user_lat,
      lng: User_lng,
    };


    station.forEach(station => {
      let d = distance(station.lat, station.lng);
      let id = "id-placeholder11" + station._id;
    
      if (d < closest && station.robots_in_stock > 0) {
        closest = d;
        closestID = station._id;
    }
    
    closest.toFixed(2) + " km";
    });

     localStorage.setItem("ClosestStationID", closestID);
    localStorage.setItem("ClosestStationDistance",   Math.floor(closest * 100) / 100);
    
  }

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}


function distance(lat, lng) {
    let R = 6371; // Radius of the earth in km
    let dLat = toRad(user_lat - lat);  // Javascript functions in radians
    let dLon = toRad(User_lng - lng);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(user_lat)) * Math.cos(toRad(lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
}

