//click mode button light and dark
const container = document.querySelector(".container");
const htmlData = document.querySelector("html");
const themeMode = (button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("mode");
    container.classList.toggle("dark");
    if (button.classList.contains("mode")) {
      button.src = "img/icon-sun.svg";
      htmlData.dataset.themeMode = "dark";
    } else {
      button.src = "img/icon-moon.svg";
      htmlData.dataset.themeMode = "light";
    }
  });
};
themeMode(document.querySelector(".button-mode"));

// ADDING TEXT TO DO IN LIST
const inputText = document.querySelector(".input-text");
const todoListCont = document.querySelector(".todo-list-cont");
const todoList = document.querySelector(".todo-list");

function elementTodo(todoText) {
  return `<li class="list">
            <div class="button-check">
              <img src="img/icon-check.svg" alt="" class="icon-check">
            </div>
            <p class="text">${todoText}</p>
            <img src="img/icon-cross.svg" alt="" class="button-delete">
          </li>`;
}

const todoListArr = [
  "Complete online JavaScript course",
  "Jog around the park 3x",
  "10 minutes meditation",
];
let listStore = "";
todoListArr.forEach((list) => (listStore += elementTodo(list)));
todoList.innerHTML = listStore;

// function list active/check
const countUnactiveList = () => {
  const list = [...todoList.children];
  const listArr = list.filter((child) => {
    return !child.classList.contains("check");
  });
  return (document.querySelector(".count").innerHTML = listArr.length);
};

//click enter button
inputText.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    //create element li
    if (inputText.value === "") return;
    todoListArr.push(inputText.value);
    const li = document.createElement("li");
    //adding class
    li.classList.add("list");
    //insert all of elements to list
    li.innerHTML = `<div class="button-check">
                      <img src="img/icon-check.svg" alt="" class="icon-check">
                    </div>
                    <p class="text">${inputText.value}</p>
                    <img src="img/icon-cross.svg" alt="" class="button-delete">`;

    todoList.prepend(li);
    inputText.value = "";
    //count active list
    countUnactiveList();
  }
});

// button cklik
const buttonCheck = document.querySelectorAll(".button-check");
todoListCont.addEventListener("click", (e) => {
  //button check click
  if (
    e.target.classList.contains("icon-check") ||
    e.target.classList.contains("button-check") ||
    e.target.classList.contains("text")
  ) {
    if (e.target.parentElement.classList.contains("button-check")) {
      e.target.parentElement.parentElement.classList.toggle("check");
    }
    e.target.parentElement.classList.toggle("check");
    //count active list
    countUnactiveList();
  } else if (e.target.classList.contains("button-delete")) {
    //button delete click
    e.target.parentElement.remove();
    //count active list
    countUnactiveList();
  }
});

//button clear click
const buttonClear = document.querySelector(".button-clear");
function deleteList(button) {
  button.addEventListener("click", () => {
    let list = buttonClear.parentElement.previousElementSibling.children;
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].classList.contains("check")) {
        list[i].remove();
      }
    }
    //count active list
    countUnactiveList();
  });
}
deleteList(buttonClear);

// FILTER
const filter = document.querySelectorAll(".filter");

const filterButtons = document.querySelectorAll(".filter-btn");
filter.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    let list = e.target.parentElement.previousElementSibling.children[0].children;
    if (e.target.classList.contains("button-all")) {
      //button all click
      console.log(list);
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].classList.contains("check") === false ||
          list[i].classList.contains("check") === true
        ) {
          list[i].style.display = "flex";
        }
      }
    } else if (e.target.classList.contains("button-active")) {
      //button active click
      //catch list completed
      // let list = e.target.parentElement.previousElementSibling.children[0].children;
      for (let i = 0; i < list.length; i++) {
        if (list[i].classList.contains("check")) {
          list[i].style.display = "none";
        } else {
          list[i].style.display = "flex";
        }
      }
    } else if (e.target.classList.contains("button-completed")) {
      //button completed click
      // let list = e.target.parentElement.previousElementSibling.children[0].children;
      for (let i = 0; i < list.length; i++) {
        if (list[i].classList.contains("check") === false) {
          list[i].style.display = "none";
        } else {
          list[i].style.display = "flex";
        }
      }
    }
    //filter button active
    filterButtons.forEach((btn) => {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
    });
    if (e.target.classList.contains("filter-btn")) {
      e.target.classList.add("active");
    }
  });
});

//drag and drop list items
Sortable.create(todoList, {
  ghostClass: "sortable-ghost",
  animation: 150,
  delay: 0,
});
