function fetch(url) {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => setTimeout(() => res(JSON.parse(xhr.response)), 5000);
    xhr.onerror = () => rej("some thing went wrong");
    xhr.send();
  });
}
fetch("https://api.github.com/users/07anujsachan")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
