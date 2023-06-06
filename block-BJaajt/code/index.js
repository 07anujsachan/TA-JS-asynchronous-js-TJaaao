let img = document.querySelector(".userimg");
let name = document.querySelector("h3");
let user = document.querySelector("h4");
let followerList = document.querySelector(".followers-list");
let followingList = document.querySelector(".following-list");
let input = document.querySelector(".finduser");

function createUi(data) {
  img.src = data.avatar_url;
  name.innerText = data.name;
  user.innerText = "@" + data.login;
  followerUi(data.followers_url);
  followingUi(`https://api.github.com/users/${data.login}/following`);
}
function followerUi(url) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    let followers = JSON.parse(xhr.response);
    followers.slice(0, 5).map((follower) => {
      let img = document.createElement("img");
      img.src = follower.avatar_url;
      img.className = "img";
      followerList.append(img);
    });
  };
  xhr.send();
}

function followingUi(url) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    let following = JSON.parse(xhr.response);
    following.slice(0, 5).map((follower) => {
      let img = document.createElement("img");
      img.src = follower.avatar_url;
      img.className = "img";
      followingList.append(img);
    });
  };
  xhr.onerror = console.log("There are no followers");
  xhr.send();
}

function handelChange(event) {
  if (event.keyCode === 13) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.github.com/users/${event.target.value}`);
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      createUi(userData);
    };
    xhr.send();
    event.target.value = "";
  }
}
input.addEventListener("keyup", handelChange);

// get random cat

let image = document.querySelector(".cat-img");
let btn = document.querySelector("button");

btn.addEventListener("click", () => {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.thecatapi.com/v1/images/search?limit=10&size=full `
  );
  xhr.onload = function () {
    let imageData = JSON.parse(xhr.response);
    console.log(imageData);
    image.src = imageData[0].url;
  };
  xhr.send();
});
