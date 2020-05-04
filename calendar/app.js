"use strict";

const calendar = document.querySelector("#calendar"),
  year = calendar.querySelector('.year'),
  month = calendar.querySelector(".month"),
  btn = month.querySelectorAll('button'),
  day = calendar.querySelector(".day"),
  date = calendar.querySelectorAll(".date td");

const TODAY = new Date();
let yy = TODAY.getFullYear();
let mm = TODAY.getMonth() + 1;
let dd = TODAY.getDate();



window.onload= () => {
    createCalendar(TODAY);
    CheckToday();
};

function CheckToday() {
    let today = TODAY.getDate();
    date.forEach((item, idx) => {
        if(item.firstElementChild.innerHTML == today){   
            item.classList.add('today');
            return;      
        }
    });
}

function createCalendar(TODAY) { // 인자 : 날짜 객체만
    fillYear(TODAY);
    fillMonth(TODAY);
    fillDay(TODAY);
}

function fillYear(TODAY) {
    year.firstElementChild.innerHTML = TODAY.getFullYear();
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
        item.classList.remove('thisMonth');
    });   
}



// 이전 달 , 다음달 선택 이벤트
btn.forEach((item) => {
    item.addEventListener('click',() => {
        resetCalendar();        
        if(item.classList.contains('next')){            
            nextCalendar();
        } else {
            prevCalendar();
        }
    });
});



// 이전 달 보기
function nextCalendar() {    
    let time;
    if(mm < 11) {
        mm++;        
        time = new Date(`${yy}-${mm}-${dd}`);
        createCalendar(time);        
    } else {
        yy++;
        mm = 1;
        time = new Date(`${yy}-${mm}-${dd}`);
        createCalendar(time);        
    }       
}

// 다음 달 보기
function prevCalendar() {    
    let time; 
    if(mm > 1) {
        mm--;        
        time = new Date(`${yy}-${mm}-${dd}`);        
        createCalendar(time);
    } else {
        yy--;
        mm = 12;
        time = new Date(`${yy}-${mm}-${dd}`);
        createCalendar(time);        
    }       
}








