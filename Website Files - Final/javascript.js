const path = require("path");

let enterButton = document.getElementById("buttonEnter");
enterButton.addEventListener("click", enterButtonClick);

var jsonData;

var county;

function toggleVisibleL(){

  var l = document.getElementById("loader"),
    displayValue = "";
    if(l.style.display == "") displayValue = "none";
 

    l.style.display = displayValue;
    

}

function toggleVisibleI(){
  var i = document.getElementById("info");

  i.style.display = "";

}

async function enterButtonClick(){
    county = document.getElementById("county-558c").value;
    let state = document.getElementById("state-558c").value;
    
    toggleVisibleL();

    await fetch("http://127.0.0.1:5000/waterdata?county=" + county, {
        method: "GET",
        headers: {
          "Content-Type": "text/plain"
        }
      })
      .then(response => response.json())
      .then(data => {
        jsonData = data;
        console.log(jsonData);
      })
      .catch(error => console.error(error));

    
    let pH = jsonData.pH[0];
    let disolved_oxygen = jsonData.disolved_oxygen[0];
    let turbidity = jsonData.turbidity[0];
      
    document.getElementById("resultsPH").innerText = "pH Level:  " + pH;
    document.getElementById("resultsDO").innerText = "Dissolved Oxygen Level: " + disolved_oxygen;
    document.getElementById("resultsT").innerText = "Turbidity: " + turbidity;

    let diff = 8.75-pH;
    diff = Math.abs(diff);
    let score1 = 10-diff;

    let score2 = 0;
    if(turbidity <= 5){
        score2 = 10;

        document.getElementById("para2").innerText = "The turbidity of this water is fantastic."
    }
    else if(turbidity <= 40){
        score2 = 8;

        document.getElementById("para2").innerText = "The turbidity of this water is okay, but not great."

    }
    else if(turbidity <= 80){
        score2 = 5;

        document.getElementById("para2").innerText = "The turbidity of this water is far from ideal, consider finding alternative sources, or filtering this water if possible."
    }
    else if(turbidity <= 120){
        score2 = 3;
        
        document.getElementById("para2").innerText = "The turbidity of this water is quite concerning, at over 100 NTU over reasonable levels."
    }
    else{

      document.getElementById("para2").innerText = "The turbidity of this water is quite concerning, at over 100 NTU above safe/reasonable levels."

    }

    let score3 = 2;
    if(disolved_oxygen >= 6.5 && disolved_oxygen <= 11){
        score3 = 5;
    }
    else if(disolved_oxygen < 6.5 && disolved_oxygen >= 3){
        score3 = 2.5;
    }
    else if(disolved_oxygen > 11){
        score3 = 3;
    }

    let finalScore = (score1 + score2 + score3)/2.5;

    county += " County";

    document.getElementById("para1").innerText = "Based on our algorithm, the water quality for " + county + " has earned a final score of " + finalScore.toFixed(2) + " /10. ";

    


    

    showCounty();

    toggleVisibleL();
    toggleVisibleI();
      
}


var latlonJSON;
var county_cords;
async function showCounty() {
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${county}&components=country:$US&key=AIzaSyBW-AVxUD_FXSpTknyR8XthFpKBm4CNuic`;

// Make the API call
await fetch(apiUrl, {
  method: 'GET'
})
.then(response => response.json())
.then(data => {
// Extract the latitude and longitude from the response
county_cords = data.results[0].geometry.location;

// Do something with the coordinates
console.log(`The coordinates of ${county} county are: ${county_cords.lat}, ${county_cords.lng}`);
})
.catch(error => console.error(error));
let lat1 = county_cords.lat-0.5;
let lat2 = county_cords.lat+0.5;
let lon1 = county_cords.lng-0.5;
let lon2 = county_cords.lng+0.5;

const queryString = `?lat1=${lat1}&lon1=${lon1}&lat2=${lat2}&lon2=${lon2}`;
  await fetch(`http://127.0.0.1:8000/fountains${queryString}`, {
    method: 'GET'
  })
    .then(response => response.json())
      .then(data => {
  // Handle the response data
  latlonJSON = data
  // Print the resulting array of objects
  initMap();
})

   .catch(error => console.error(error));
}


// Set up the map
function initMap() {
  // Example coordinates
  let coordinates =[];
  for (let i = 0; i < latlonJSON.length; i++) {
       let lat = latlonJSON[i][0];
      let lng = latlonJSON[i][1];
      let obj = { lat: lat, lng: lng };
      coordinates.push(obj);
  }
  console.log(coordinates);
  
  // Find the center point
  let centerPoint = findCenterPoint(coordinates);

  // Create the map
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: centerPoint
  });

  // Add a marker for the center point
  for (var i = 0; i < coordinates.length; i++) {
  var marker = new google.maps.Marker({
    position: coordinates[i],
    map: map
  });
}
}

// Find the center point
function findCenterPoint(coords) {
  // Initialize variables for latitude and longitude sums
  let latSum = 0;
  let lngSum = 0;

  // Loop through the array of coordinates and sum their latitude and longitude values
  for (let i = 0; i < coords.length; i++) {
    latSum += coords[i].lat;
    lngSum += coords[i].lng;
  }

  // Calculate the average latitude and longitude values
  let latAvg = latSum / coords.length;
  let lngAvg = lngSum / coords.length;

  // Return the center point as an object with latitude and longitude properties
  return { lat: latAvg, lng: lngAvg };
}

document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
      document.querySelector(
      "body").style.visibility = "hidden";
      document.querySelector(
      "#loader").style.visibility = "visible";
  } else {
      document.querySelector(
      "#loader").style.display = "none";
      document.querySelector(
      "body").style.visibility = "visible";
  }
};

