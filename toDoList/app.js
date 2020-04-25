"use strict";

const ToDo = document.querySelector(".wrap .container .todo"),
  searchBox = ToDo.querySelector(".todo-search"),
  searchForm = searchBox.querySelector("#search"),
  searchInput = searchForm.querySelector(".search-input"), // 검색 칸
  todoBox = ToDo.querySelector(".todo-contents"),
  todoAddBox = todoBox.querySelector(".todo-add"), // to do list 추가 및 열람 칸
  addForm = todoAddBox.querySelector("#add"),
  todoInput = addForm.querySelector(".add-input"),
  todoListBox = todoBox.querySelector(".todo-list");

const DOID = "doId";
let itemDataBase = [];

addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addToDo();
  saveToDo();
  deleteToDo();
});

function addToDo() {
  let txt;
  txt = todoInput.value;
  todoListBox.appendChild(createList(`${txt}`));
  todoInput.value = "";  
}

// 리스트 todo 추가 함수
const createList = (txt) => {
  let item = document.createElement("li");
  item.setAttribute("class", "todo-item");

  let checkbox = document.createElement("input");
  Object.assign(checkbox, {
    type: "checkbox",
    className: "todo-check",
  });

  let desc = document.createElement("p");
  desc.textContent = txt;

  let deleteBtn = document.createElement("button");
  Object.assign(deleteBtn, {
    type: "button",
    className: "todo-delete",
  });

  let deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash-alt");
  deleteBtn.appendChild(deleteIcon);

  item.appendChild(checkbox);
  item.appendChild(desc);
  item.appendChild(deleteBtn);

  return item;
};

// list delete 함수
const deleteToDo = () => {
  let deleteBox = todoListBox.querySelectorAll("button");
  deleteBox.forEach((item, idx) => {
    item.addEventListener("click", function () {
      if (this.parentNode.firstElementChild.checked) {
        // input[checkbox]가 체크되어있으면
        this.parentNode.remove();
        saveToDo();
      }
    });
  });
};

// list save 함수
const saveToDo = () => {
  let toDoItem = todoListBox.querySelectorAll(".todo-item");
  itemDataBase = [];
  toDoItem.forEach((item, idx) => {
    let desc = {
      id: idx,
      content: item.innerText,
    };
    itemDataBase.push(desc);
  });
  localStorage.setItem(DOID, JSON.stringify(itemDataBase));
};

// 새로고침했을 때 list
function loadToDo() {
  const loadedToDo = localStorage.getItem(DOID);
  if (loadedToDo) {
    const parsedToDos = JSON.parse(loadedToDo);
    // 다시 끌고올때는 오브젝트로 변환
    parsedToDos.forEach(function (todo) {
      todoListBox.appendChild(createList(`${todo.content}`));
    });
  }
  deleteToDo();
}
window.onload = loadToDo();

// todo 검색 및 구현
searchForm.addEventListener("keyup", function () {
  let searchTxt = searchInput.value;
  compareText(searchTxt);
});

// 검색한 글자를 가지고 있는지 비교하는 함수
const compareText = (searchTxt) => {
  let toDoItem = [...todoListBox.querySelectorAll(".todo-item")];

  let toFilterItem = toDoItem.filter((item) =>
    item.innerText.includes(searchTxt)
  );
  toDoItem.forEach((item) => {
    item.style.display = "none";
  });
  toFilterItem.forEach((item) => {
    item.style.display = "flex";
  });
};
