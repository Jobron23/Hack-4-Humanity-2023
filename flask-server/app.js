const request = new XMLHttpRequest();
request.open("GET", "http://127.0.0.1:5000/members");
request.send();
request.onload = ()=>{
  console.log(request)
}