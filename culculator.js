let screen = '';

const numbers = ['1','2','3','4','5','6','7','8','9','0'];

let newScreen = '';

let htmlScreen = document.querySelector('.js-screen-p');

const symbol = ['/','*','-','+','.','='];

const equalButton = document.querySelector('.js-equal-button');

function displayScreen(newScreen = screen){
        document.querySelector('.js-screen-p').innerText = newScreen;
}

function checkSym(){
    const lastI = screen.slice(-1)||'none';
    if (symbol.includes(lastI)||screen === ''||lastI === 'none') {
        return true
    }else { 
        return false
    }
}

function addSym(sym){
    screen = newScreen;
    const exist = checkSym(sym);
    console.log(exist)
    if (!exist){
        screen += sym;
        displayScreen();
    }
    if(htmlScreen.innerText === '0'&&sym === '-'){
        screen = sym;
        displayScreen();
    }
}

function addNum(number){
    const lastI = screen.slice(-1);
    const beforeLastI =screen.slice(-2,-1);
    console.log(beforeLastI);
    if(lastI === '0'&&symbol.includes(beforeLastI)){
        clearLastI();
    }
    if(number === '0'&&htmlScreen.innerText === '0'){
        return
    }else {
        newScreen = screen;
        screen += number;
        displayScreen();
        newScreen = screen;
    }
}
    
function clearLastI(){
    let arrayScreen = newScreen.split("");
    arrayScreen.pop();
    screen = arrayScreen.join("");
    newScreen = arrayScreen.join("");
    displayScreen()
}

document.querySelectorAll('.js-num-button').forEach( (button) => {
    button.addEventListener('click', () => addNum(button.getAttribute('data-number')));
})

document.querySelectorAll('.js-sym-button').forEach( (button) => {
    button.addEventListener('click', () => addSym(button.getAttribute('data-sym')))
})

equalButton.addEventListener('click',() => {
    let result = eval(screen)||0;
    newScreen = result+'';
    screen = '';
    displayScreen(newScreen);
})

window.addEventListener('keydown',(event) => {
    if(event.key === 'Backspace'){
        clearLastI();
    }
    if(numbers.includes(event.key)){
        document.querySelector(`[data-number="${event.key}"]`).click()
    }else if (symbol.includes(event.key)) {
        document.querySelector(`[data-sym="${event.key}"]`).click()
    }
})