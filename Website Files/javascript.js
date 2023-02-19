let enterButton = document.getElementById("buttonEnter");
enterButton.addEventListener("click", enterButtonClick);

async function enterButtonClick(){
    let country = document.getElementById("county-558c").value;
    let state = document.getElementById("state-558c").value;


    document.getElementById("resultsP").innerText = country;
}