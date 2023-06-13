let booksUrl = `https://www.anapioficeandfire.com/api/books`;
let bookElm = document.querySelector(".books");
let popup = document.querySelector(".popup");
let popupclose = document.querySelector(".close");
let ul = document.querySelector(".characters");

function handleSpinner(status = false) {
  bookElm.innerHTML = `<div class="donut"></div>`;
}
function characters(character) {
  Promise.all(character.map((c) => fetch(c).then((res) => res.json))).then(
    (c) => {
      ul.innerHTML = "";
      c.forEach((ch) => {
        console.log("character");
        let charli = document.createElement("li");
        charli.innerText = `${ch.name} : (${ch.aliases.join("")})`;
      });
    }
  );
}

function createBooksUI(book) {
  let li = document.createElement("li");
  let h2 = document.createElement("h2");
  h2.innerText = book.name;
  let h3 = document.createElement("h3");
  h3.innerText = book.authors;
  let a = document.createElement("a");
  a.innerText = "Show Characters";
  a.addEventListener("click", () => {
    popup.style.display = "block";
    characters(book.characters);
    popupclose.addEventListener("click", () => {
      popup.style.display = "none";
    });
  });
  li.append(h2, h3, a);
  bookElm.append(li);
}
function init() {
  fetch(booksUrl)
    .then((res) => res.json())
    .then((books) =>
      books.forEach((book) => {
        console.log(book);
        createBooksUI(book);
      })
    );
}
init();