const
    wrap            = document.querySelector('#calculator'),
    light           = wrap.querySelector('.light'), // 불끄기 켜기

    // 스크린 영역
    screen          = wrap.querySelector('.screen'),
    formula         = screen.querySelector('.formula'),
    result          = screen.querySelector('.result'),

    // 계산기 영역
    calculator      = wrap.querySelector('table'),
    npSelect        = calculator.querySelector('.npSelect'),
    percent         = calculator.querySelector('.percent'),
    float           = calculator.querySelector('.float'),
    opr             = calculator.querySelectorAll('.opr'),    
    num             = calculator.querySelectorAll('.num'), 
    reset           = calculator.querySelector('#reset'),
    rs              = calculator.querySelector('.rs');

let cal = {
    rs : '', // 결과
    num : true, // 숫자 lock
    opr : false,   //연산자 lock
    float: true, // 소수점 Lock
};

// 음수 양수 변환
function npSelector(){
    let rsTxt = result.firstElementChild.textContent;
    if(rsTxt.charAt(0) === '-'){
        result.firstElementChild.textContent = result.firstElementChild.textContent.replace('-','');
    }else{
        result.firstElementChild.textContent = '-' + result.firstElementChild.textContent;
    }
}
// 퍼센트 변환
function percenter(){
    let rsTxt = result.firstElementChild.textContent;
    if(rsTxt.includes('+')
    || rsTxt.includes('-')
    || rsTxt.includes('/')
    || rsTxt.includes('*')
    || rsTxt === ''){
        return;
    }else{
        cal.rs =calculation(rsTxt)*0.01;
        result.firstElementChild.textContent = cal.rs;
    }
}
// 소수점 변환
function floater(){
    let rsTxt = result.firstElementChild.textContent;
    if(cal.float){
        result.firstElementChild.textContent += 
        ( rsTxt.endsWith(' + ') 
        || rsTxt.endsWith(' - ') 
        || rsTxt.endsWith(' / ') 
        || rsTxt.endsWith(' * ')
        || rsTxt === '' ) 
        ? '0'+this.textContent : this.textContent;
        cal.float = false;    
    }else{
        return;
    }    
}
// 계산함수 
function calculation( txt ){    
    cal.num = false;
    cal.opr = true;
    cal.float = false;
    return new Function('return ' + txt)();      
}
// 결과 출력함수
function resultShow(){
    if(!cal.opr) return;
    cal.rs = Math.round(calculation(result.firstElementChild.textContent) * 100)/100;
    formula.firstElementChild.textContent = result.firstElementChild.textContent;
    result.firstElementChild.textContent = cal.rs ;    
} 
// 초기화 함수
function resetAll(){
    formula.firstElementChild.textContent =
    result.firstElementChild.textContent = 
    cal.rs  = '';

    cal.num = true;
    cal.opr = false;
    cal.float = false;
}


//숫자 입력
num.forEach( (item,idx) =>{
    item.addEventListener('click',function(){    
        if(!cal.num) return;
        result.firstElementChild.textContent += item.textContent;   
        cal.opr = true;            
    });
});

//연산자 입력
opr.forEach( (item,idx) =>{
    item.addEventListener('click',function(){   
        if(!cal.opr) return;
        result.firstElementChild.textContent += item.textContent; 
        cal.num = true;
        cal.opr = false;
        cal.float = true;                        
    });
});


float.addEventListener('click',floater);
percent.addEventListener('click',percenter);
npSelect.addEventListener('click',npSelector);
rs.addEventListener('click',resultShow); // 결과 출력
reset.addEventListener('click',resetAll); // 초기화





light.addEventListener('click',function(e){
    e.preventDefault();
    this.classList.toggle('off');
    document.body.classList.toggle('off');
});