const
    wrap = document.querySelector('#calculator .container'),
    // 스크린 영역
    screen = wrap.querySelector('.screen'),
    formula = screen.querySelector('.formula'),
    result = screen.querySelector('.result'),

    // 계산기 영역
    calculator = wrap.querySelector('table'),
    npSelect = calculator.querySelector('.npSelect'),
    opr = calculator.querySelectorAll('.opr'),    
    num = calculator.querySelectorAll('.num'),
    reset = calculator.querySelector('#reset'),
    rs = calculator.querySelector('.rs');

let cal = {
    rs : '',
    bool : true, // 숫자 lock
    opr : false   //연산자 lock
}; //결과






function a(){
    if(result.firstElementChild.textContent.includes('-')){
        result.firstElementChild.textContent=result.firstElementChild.textContent.replace('-','+');
    }
}
npSelect.addEventListener('click',a);


// 계산함수 
function calculation( txt ){
    cal.bool = false;
    cal.opr = true;
    return new Function('return ' + txt)();
}




//숫자 입력
num.forEach( (item,idx) =>{
    item.addEventListener('click', ()=>{      
        if(!cal.bool) return;
        cal.opr = true;
        result.firstElementChild.textContent += item.textContent;   
    });
});

//연산자 입력
opr.forEach( (item,idx) =>{
    item.addEventListener('click', ()=>{  
        if(!cal.opr){
            return;
        }else{
            cal.opr = false;
        }

        if(!cal.bool){
            cal.bool = true;
        }

        result.firstElementChild.textContent += item.textContent;            
    });
});

// 결과 출력
rs.addEventListener('click', ()=>{      
    if(result.firstElementChild.textContent === '')return;
    

    cal.rs = Math.round(calculation(result.firstElementChild.textContent) * 100)/100;
    formula.firstElementChild.textContent = result.firstElementChild.textContent;
    result.firstElementChild.textContent = cal.rs ;  
});


// 초기화
reset.addEventListener('click',function(){
    formula.firstElementChild.textContent =
    result.firstElementChild.textContent = 
    cal.rs  = '';
    cal.bool = true;
    cal.opr = false;
});