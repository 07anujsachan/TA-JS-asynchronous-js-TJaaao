// https://api.spaceflightnewsapi.net/v3/articles?_limit=30
let newsData = fetch(
    "https://api.spaceflightnewsapi.net/v3/articles?_limit=30"
  ).then((res) => res.json());
  
  let newsList = document.querySelector(".news");
  
  function createUi(data) {
    let div = document.createElement("div");
    div.className = "flex";
    let figure = document.createElement("figure");
    figure.className = "figure";
    let img = document.createElement("img");
    img.src = data.imageUrl;
    img.className = "img";
    let div2 = document.createElement("div");
    let p = document.createElement("p");
    p.className = "tag";
    p.innerText = data.newsSite;
    let h2 = document.createElement("h2");
    h2.innerText = data.title;
    h2.className = "title";
    let btn = document.createElement("a");
    btn.className = "btn";
    btn.innerText = "Read More";
    btn.href = data.url;
    figure.append(img);
    div2.append(p, h2, btn);
    div.append(figure, div2);
    newsList.append(div);
  }
  
  newsData.then((data) => data.forEach((elm) => createUi(elm)));
  function handleClick(event) {
      newsList.innerHTML = "";
      newsData.then((data) => {
          data.forEach((elm) => {
              console.log(elm);
              if (elm.newsSite === event.target.value) {
                  createUi(elm);
                }
            })
            .catch((error)=>{
              newsList.innerText= "please check your internet connection!"
            })
        });
    }
    let select = document.getElementById("news");
    select.addEventListener("change", handleClick);