const
    wrap = document.querySelector('#calculator .container'),
    // 스크린 영역
    screen = wrap.querySelector('.screen'),
    formula = screen.querySelector('.formula'),
    result = screen.querySelector('.result'),
    // 계산기 영역
    calculator = wrap.querySelector('table'),
    opr = calculator.querySelectorAll('.opr'),    
    num = calculator.querySelectorAll('.num'),
    rs = calculator.querySelector('.rs');

let 
    REALNUM='',
    NUMBOX=[],
    OPRBOX=[];
let cal = 0;



function calculation(NUMBOX,OPRBOX,REALNUM){
    debugger;

    for(let i = 0; i < NUMBOX.length; i++){
        if(!NUMBOX[i+1]){
            switch (OPRBOX[i]){
                case '+':
                    cal += (NUMBOX[i] + NUMBOX[i+1]);
                    break;
                case '-':
                    cal += (NUMBOX[i] - NUMBOX[i+1]);
                    break;
                case '*':
                    cal += (NUMBOX[i] * NUMBOX[i+1]);
                    break;
                case '/':
                    cal += (NUMBOX[i] / NUMBOX[i+1]);
                    break;
            }
            
        }else{            
            switch (OPRBOX[i]){
                case '+':
                    cal += (NUMBOX[i] + (REALNUM*1));
                    break;
                case '-':
                    cal += (NUMBOX[i] - (REALNUM*1));
                    break;
                case '*':
                    cal += ( NUMBOX[i] * (REALNUM*1) );
                    break;
                case '/':
                    cal += (NUMBOX[i] / (REALNUM*1));
                    break;
            }
        }
    }



}











num.forEach( (item,idx) =>{
    item.addEventListener('click', ()=>{        



        REALNUM += item.textContent; 
        result.firstElementChild.textContent += item.textContent;   
    });
});

opr.forEach( (item,idx) =>{
    item.addEventListener('click', ()=>{  
        NUMBOX.push(REALNUM*1); //숫자를 넣는다
        OPRBOX.push(item.textContent);        
        REALNUM = '';


        result.firstElementChild.textContent += item.textContent;    
    });
});

rs.addEventListener('click', ()=>{   
    calculation( NUMBOX, OPRBOX, REALNUM );
    result.firstElementChild.textContent = cal;
    reset();    
});



function reset(){
    NUMBOX = [cal];
    OPRBOX = []; 
    cal = 0;   
}