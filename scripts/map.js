  // Initialize and add the map
  let map;
  let user_lat;
  let User_lng;
  let User_Position;

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

    // db.collection("hospitals").get().then((allHospitals) => {
    //     allHospitals.forEach((doc) => {
    //         let d = distance(doc.data().lat, doc.data().lng);
    //         if (d < closest) {
    //             closest = d;
    //             closestID = doc.data().name;
    //         }
    //     });
    //     document.getElementById("display-loc").innerHTML = "The closest hospital is " + closestID + ", " +
    //         closest.toFixed(2) + " km";
    // });

    await initMap();
  }
  async function initMap() {
    // The location of Uluru
    const position = { lat: 49.24948493217268, lng: -123.00357710131459 };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } =
      await google.maps.importLibrary("marker");

    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
      zoom: 12,
      center: position,
      mapId: "DEMO_MAP_ID",
    });

    //create a marker on click
    // google.maps.event.addListener(map, "click", function (event) {
    //   addMarker({ coords: event.latLng });
    // });


    station.forEach(station => {
 
   
   
      console.log("parham" + address);
      
   
      markers.push()
   
   
   
      document.getElementById("stations-placeholder").appendChild(newcard);
   
   });
   
    var markers = [
      {
        coords: {
          // Corrected
          lat: 49.26460221189821,
          lng: -123.01684403084168,
        },
        content: "<h1> Lynn MA </h1>",
      },
      {
        coords: position,
        content: "<h1> Lynn MA </h1>",
      },

      {
        coords: {
          lat: 49.24853057650836,
          lng: -123.02976263551658,
        },
        content: "<h1> Lynn MA </h1>",
      },
    ];

    for (var i = 0; i < markers.length; i++) {
      addMarker(markers[i]);
    }

    function addMarker(props) {
      const icon = document.createElement("div");
      icon.setAttribute(
        "style",
        "background-color: rgba(0, 126, 167, 1); border-top: 8px solid #e14242;border: 2px solid white;  clip-path: polygon(50% 4%, 69% 10%, 82% 21%, 86% 35%, 84% 52%, 79% 66%, 71% 79%, 60% 92%, 52% 100%, 43% 91%, 31% 77%, 24% 64%, 18% 51%, 17% 37%, 22% 21%, 33% 10%); "
      );
      icon.innerHTML =
        '<img src="/robot.png" style="position: relative; bottom:3px; width: 40px; height: 40px;  ;"> ';

      const marker = new AdvancedMarkerElement({
        map: map,
        position: props.coords,

        content: icon,
      });

      if (props.iconImage) {
        marker.setIcon(props.iconImage);
      }

      if (props.content) {
        var infoWindow = new google.maps.InfoWindow({
          content: props.content,
        });

        marker.addListener("click", function () {
          infoWindow.open(map, marker);
        });
      }
    }

    const pinUser = new PinElement({
      background: "#CCDBDC",
    });

    // The marker, positioned at Uluru
    marker = new AdvancedMarkerElement({
      map: map,
      position: User_Position,
      title: "You",
      gmpClickable: true,
      content: pinUser.element,
    });
  }