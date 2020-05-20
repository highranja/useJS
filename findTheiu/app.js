"use strict";
const 
    cardBox = document.querySelector('#cardBox'),
    cardList = cardBox.querySelector('.card-list'),
    guide = cardBox.querySelector('.guide'),
    card = cardList.querySelectorAll('.card');


let randomBox = Array(10).fill().map((ele, i) => i);
let answer = [];
let openCard = 0;
let matchCardBox = [];

// 숫자를 랜덤으로 뽑는다. 5번  1,2, 3, 4,5
// [1,1,2,2,3,3,4,4,5,5] 에서 섞는다 
// answer 순서대로 번호 뿌린다.

for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * randomBox.length);
    answer.push(randomBox[randomNumber], randomBox[randomNumber]);     
    randomBox.splice(randomNumber, 1);    
}

Array.prototype.shuffle = function () {
    var length = this.length;
    
    // 아래에서 length 후위 감소 연산자를 사용하면서 결국 0이된다.
    // 프로그래밍에서 0은 false를 의미하기에 0이되면 종료.
    while (length) {
 
        // 랜덤한 배열 index 추출
        var index = Math.floor((length--) * Math.random());
 
        // 배열의 끝에서부터 0번째 아이템을 순차적으로 대입
        var temp = this[length];
 
        // 랜덤한 위치의 값을 맨뒤(this[length])부터 셋팅
        this[length] = this[index];
 
        // 랜덤한 위치에 위에 설정한 temp값 셋팅
        this[index] = temp;        
    }
 
    // 배열을 리턴해준다.
    return this;
};
answer = answer.shuffle();

function shuffleCard() {
    card.forEach((item, idx) => {             
        item.firstElementChild.setAttribute(
            'src',`./img/iuHere${answer[idx]}.jpg`
        );                
    });
}
            

function allCardOpen() {
    card.forEach((item, idx) => {
        item.classList.add('open');          
    });   
    guide.textContent = 'Remember IU location';
}

function allCardClose() {
    card.forEach((item, idx) => {
        item.classList.remove('open');          
    });
    guide.textContent = 'Game Start';
}

function startCardGame() {
    shuffleCard();
    setTimeout(allCardOpen, 2000);
    setTimeout(allCardClose, 6000);
    setTimeout(playGame, 6010);
}

const playGame = () => {
    card.forEach((item,idx) => {
        setTimeout(() => {
            item.addEventListener('click',() => {
                matchCardBox.push(idx);   
                item.classList.add('open');  
                checkCard();
    
                if (openCard === 5) {
                    guide.textContent = `YOU WIN`;
                }
            });
        },1000);
    });
};





function checkCard() {    
    if(matchCardBox[0] === matchCardBox[1]) { // 같은 카드를 클릭했을 때
        matchCardBox.splice(1,1);
        return;
    }

    if (matchCardBox.length === 2) {
        if (matchCard()) {
            guide.textContent = `SCORE : ${openCard}`;
        } else {
            setTimeout(()=>{card.forEach((item,idx) => {item.classList.remove('open');})},1000);
        }
    } 
}

function matchCard() {
    let sw;
    if(answer[matchCardBox[0]] === answer[matchCardBox[1]]) {
            console.log('맞다');
            card[matchCardBox[0]].classList.add('match');
            card[matchCardBox[1]].classList.add('match');
            matchCardBox = [];
            openCard++;
            sw = true;
    } else {
            console.log('틀렸다');
            matchCardBox = [];
            sw = false;
    }

    return sw;
}



window.addEventListener('load',() => {
    startCardGame();
});


