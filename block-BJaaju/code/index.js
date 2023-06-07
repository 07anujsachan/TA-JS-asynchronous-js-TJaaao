// RdqXrrUN9t4cge1BOojmIqDrXVyXOSBfrHI8HnfVbf0
//https://api.unsplash.com/search/photos/?client_id=RdqXrrUN9t4cge1BOojmIqDrXVyXOSBfrHI8HnfVbf0
let input = document.querySelector(".input");
let figure = document.querySelector(".image-group");

function createUi() {}

function handelChange(event) {
  if (event.keyCode === 13) {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://api.unsplash.com/search/photos/?client_id=RdqXrrUN9t4cge1BOojmIqDrXVyXOSBfrHI8HnfVbf0&query=${event.target.value}`
    );
    xhr.onload = function () {
      let imageData = JSON.parse(xhr.response);
      figure.innerHTML = "";
      imageData.results.map((image) => {
        let img = document.createElement("img");
        img.src = image.links.download;
        img.className = "image";
        figure.append(img);
      });
    };
    xhr.send();
    event.target.value = "";
  }
}
input.addEventListener("keyup", handelChange);
