let baseURL = `https://sleepy-falls-37563.herokuapp.com/api/todo`;

let rootELM = document.querySelector("ul");
let input = document.querySelector("input");

function createUI(tododata) {
  rootELM.innerHTML = "";
  tododata.forEach((eachTodo) => {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = eachTodo.isCompleted;
    checkbox.addEventListener(
      "click",
      toggle(`${eachTodo.id}`, `${eachTodo.isCompleted}`)
    );
    let p = document.createElement("p");
    p.innerText = eachTodo.title;

    let span = document.createElement("span");
    span.innerText = "X";
    span.addEventListener("click", handleDelete(eachTodo.id));
    li.append(checkbox, p, span);
    rootELM.append(li);
  });
}

function fetchTodos() {
  fetch(baseURL + "todo")
    .then((res) => res.json())
    .then((todolist) => createUI(todolist.todo));
}

function toggle(id, isCompleted = false) {
  let data = {
    todo: {
      isCompleted: isCompleted,
    },
  };
  fetch(baseURL + `todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => fetchTodos());
}
function handleDelete(id) {
  fetch(baseURL + `todo${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => fetchTodos());
}

function handlePost(e) {
  if (e.keycode === 13) {
    let data = {
      todo: {
        title: e.target.value,
        isCompleted: false,
      },
    };
    fetch(baseURL + "todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      e.target.value = "";
      fetchTodos();
    });
  }
}

input.addEventListener("keycode", handlePost());
fetchTodos();
