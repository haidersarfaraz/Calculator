const  display=document.getElementById("display");
const buttons=document.querySelector(".btns");

let current="";
let operator="";
let previous="";

buttons.addEventListener("click",(e)=>{
    const target=e.target;
    if(target.tagName !== "BUTTON") return;

    const value =target.dataset.value;
    const action=target.dataset.action;

    if(value) handleInput(value);

    if(action==="clear") clearAll();

    if(action==="delete") deleteLast();

    if(action==="calculate") calculate();
});

//Keyboard support

document.addEventListener("keydown",(e)=>{
    if(!isNaN(e.key) || isOperator(e.key)){
        handleInput(e.key);
    }
    if(e.key==="Enter") calculate();
    if(e.key==="Backspace") deleteLast();
    if(e.key==="Delete") clearAll();
});

// logic

function handleInput(value){
    if(isOperator(value)){
        if(current==="") return;
        if(operator) calculate();
        operator=value;
        previous=current;
        current=""
    }else{
        current+=value;
    }
    updateDisplay();
}

function calculate(){
    if(previous===""|| current==="" ) return;
    let result;
    const prev=Number(previous);
    const curr=Number(current);

    switch(operator){
        case "+":
            result=prev+curr;
            break;
        case "-":
            result=prev-curr;
            break;
        case "*":
            result=prev*curr;
            break;
        case "/":
            result=curr===0?"Error":prev/curr;
            break;
        default:
            return;
    }

    current=result.toString();
    operator="";
    previous="";
    updateDisplay();
}

function clearAll(){
    current="";
    previous="";
    operator="";
    updateDisplay();
}

function deleteLast(){
    current=current.slice(0,-1);
    updateDisplay();
}

function updateDisplay(){
    display.value=previous+operator+current;
}

function isOperator(char){
    return ["+","-","*","/"].includes(char);
}


