const path = require("path");

let enterButton = document.getElementById("buttonEnter");
enterButton.addEventListener("click", enterButtonClick);

var jsonData;

async function enterButtonClick(){
    let county = document.getElementById("county-558c").value;
    let state = document.getElementById("state-558c").value;
    

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
      
    document.getElementById("resultsPH").innerText += " " + pH;
    document.getElementById("resultsDO").innerText += " " + disolved_oxygen;
    document.getElementById("resultsT").innerText += " " + turbidity;

    

  console.log(pH);

      
} 

