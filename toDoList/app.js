'use strict';

const
    ToDo = document.querySelector('.wrap .container .todo'),
    searchBox = ToDo.querySelector('.todo-search'),
    todoBox = ToDo.querySelector('.todo-contents'),
    todoAddBox = todoBox.querySelector('.todo-add'),

    AddForm = todoAddBox.querySelector('#add'),
    todoInput = AddForm.querySelector('.add-input'),
    todoListBox = todoBox.querySelector('.todo-list');





AddForm.addEventListener('submit',function(e){
    let txt;
    e.preventDefault();
    txt = todoInput.value;
    todoInput.value = '';
    todoListBox.appendChild(createList(`${txt}`));

});

// 리스트 todo 추가 함수
const createList = (txt) =>{
    let item = document.createElement('li');
    item.setAttribute('class','todo-item');

    let checkbox = document.createElement('input');
    Object.assign(checkbox,{
        type:'checkbox',
        className:'todo-check'
    });
    
    let desc = document.createElement('p');
    desc.textContent = txt;

    let deleteBtn = document.createElement('button');
    Object.assign(deleteBtn,{
        type:'button',
        className:'todo-delete'
    });

    let deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class','fas fa-trash-alt');
    deleteBtn.appendChild(deleteIcon);

    item.appendChild(checkbox);
    item.appendChild(desc);
    item.appendChild(deleteBtn);

    return item;

}