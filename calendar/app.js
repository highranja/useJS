"use strict";

const calendar = document.querySelector("#calendar"),
  month = calendar.querySelector(".month"),
  btn = month.querySelectorAll('button'),
  day = calendar.querySelector(".day"),
  date = calendar.querySelectorAll(".date td");

const TODAY = new Date();
let yy = TODAY.getFullYear();
let mm = TODAY.getMonth() + 1;
let dd = TODAY.getDate();

console.log(`${yy}-${mm}-${dd}`);

window.onload= () => {
    createCalendar(TODAY);
    CheckToday();
};

function createCalendar(TODAY) { // 인자 : 날짜 객체만
    fillMonth(TODAY);
    fillDay(TODAY);
}

function fillDay(TODAY) {    
    let firstDay = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    let firstFill = firstDay.getDay();

    let lastDay  = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 0);
    let lastFill = lastDay.getDate();
    let num = 1;    

    date.forEach((item, idx) => {
        if(idx >= firstFill && num <= lastFill){   
            item.classList.add('thisMonth');
            item.firstElementChild.innerHTML = num;
            num++;         
        }
    });      
}

function fillMonth(TODAY) {
    const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let _month = TODAY.getMonth();

    month.querySelector('th > span').innerHTML = MONTH[_month];
}

function resetCalendar() {
    date.forEach((item) => {
        item.firstElementChild.innerHTML = '';
    });   
}

function CheckToday() {
    let today = TODAY.getDate();
    date.forEach((item, idx) => {
        if(item.firstElementChild.innerHTML == today){   
            item.classList.add('today');
            return;      
        }
    });
}

// 이전 달 , 다음달 선택 이벤트
btn.forEach((item, idx) => {
    item.addEventListener('click',() => {
        resetCalendar();        
        if(item.classList.contains('next')){
            mm++;
            let next = new Date(`${yy}-${mm}-${dd}`);

            createCalendar(next);
        } else {
            mm--;
            let prev = new Date(`${yy}-${mm}-${dd}`);

            createCalendar(prev);
        }
    });
});













