// DOM elements
const answerPlace = document.querySelector('.answer');
const clear = document.getElementById('CE');
const back = document.getElementById('X');
const opertaions = document.querySelectorAll('.operations-key');
const numbers = document.querySelectorAll('.number-key');
const equal = document.querySelector('.equal');

let result = '';

numbers.forEach(number => {
    number.addEventListener('click', () => {
        result += number.textContent;

        answerPlace.innerHTML = result;
    });    
});

opertaions.forEach(opertaion => {
    opertaion.addEventListener('click', () => {
        const  characters = result.split(" ");
        const lastCharacter = characters[characters.length - 1];
        if(Number.isInteger(parseInt(lastCharacter))){
            result += ` ${opertaion.textContent} `;
            answerPlace.innerHTML = result;
        }else if(opertaion.textContent === '-' && answerPlace.innerHTML === '0'){
            result += `${opertaion.textContent}`;
            answerPlace.innerHTML = result;
        }else{
            console.log('cannot click operations one after another');
        }
    });    
});

clear.addEventListener('click', () => {
    result = 0;
    answerPlace.innerHTML = result;                   
});

back.addEventListener('click', () => {
    if(answerPlace.innerHTML !== '0'){
        const  characters = result.split(" ");
        const lastCharacter = characters[characters.length - 1];
        if(result.length === 1){
            result = result.replace(result.substring(result.length-1), 0);
        }else{ 
            result = result.replace(result.substring(result.length-1), '');
        }
        result = result.replace(result.substring(result.length-1), 0);
        answerPlace.innerHTML = result; 
    }
});

equal.addEventListener('click', () => {
    const equation = result.split(" ");

    let answer = 0;
    equation.forEach((term, index) => {
        if(term === '+'){
            if(answer === 0){
                answer = parseInt(equation[index-1]) + parseInt(equation[index+1]);    
            }else{
                answer += parseInt(equation[index+1]); 
            }
        }else if(term === '-'){
            if(answer === 0){
                answer = parseInt(equation[index-1]) - parseInt(equation[index+1]); 
            }else{
                answer -= parseInt(equation[index+1]); 
            }
        }else if(term === '×'){
            if(answer === 0){
                answer = parseInt(equation[index-1]) * parseInt(equation[index+1]); 
            }else{
                answer *= parseInt(equation[index+1]); 
            }
        }else if(term === '÷'){
            if(answer === 0){
                answer = parseInt(equation[index-1]) / parseInt(equation[index+1]); 
            }else{
                answer /= parseInt(equation[index+1]); 
            }
        }
    });
    result = answer.toString();
    answerPlace.innerHTML = result;
});
