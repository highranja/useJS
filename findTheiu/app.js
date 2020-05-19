"use strict";
const 
    cardBox = document.querySelector('#cardBox'),
    cardList = cardBox.querySelector('.card-list'),
    card = cardList.querySelectorAll('.card');


let randomBox = Array(10).fill().map((ele, i) => i + 1);
let answer = [];
// 숫자를 랜덤으로 뽑는다. 5번  1,2, 3, 4,5
// card img들에게 random으로 [1,1,2,2,3,3,4,4,5,5] 숫자를 뿌린다.

for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * randomBox.length);
    answer.push(randomBox[randomNumber], randomBox[randomNumber]);     
    randomBox.splice(randomNumber, 1);    
}


card.forEach((item, idx) => {
    const answerNumber = Math.floor(Math.random() * answer.length);     
    
    item.firstElementChild.setAttribute(
        'src',`./img/iuHere${answer[answerNumber]}.jpg`
    );    
    

    answer.splice(answerNumber, 1);    
});


cardList.addEventListener('click', (e) => {
    const card = e.target.parentNode;    

    const matchPoint = cardList.querySelectorAll('.open').length;
    
    if (matchPoint === 2) {
        // if (이미지 번호가 같으면) {
            card.classList.add('open');
        // }
    } else {
        card.classList.add('open');
    }
    
});