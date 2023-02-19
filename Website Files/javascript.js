let enterButton = document.getElementById("buttonEnter");
enterButton.addEventListener("click", enterButtonClick);

async function enterButtonClick(){
    let county = document.getElementById("county-558c").value;
    let state = document.getElementById("state-558c").value;
    

    fetch("http://127.0.0.1:5000/waterdata?county=" + county, {
        method: "GET",
        headers: {
          "Content-Type": "text/plain"
        }
      })
      .then(response => response.json())
      .then(data => {
        const jsonData = data;
        console.log(jsonData);
      })
      .catch(error => console.error(error));

    document.getElementById("resultsP").innerText = county;
} 