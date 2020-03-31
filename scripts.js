let equation = [];
let operand = "0";
let wasEqualsPressed = false;
let divideError = false;
const inputDigitsLimit = 14;
const mainDisplay = document.querySelector("#main-display-text");
const subDisplay = document.querySelector("#sub-display-text");
mainDisplay.textContent = operand;

// Click Event Listeners
const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('click', function (e) {
    eventHandler(e.target.id);
}));

// Keyboard Event Listeners
window.addEventListener('keydown', pulseButton);
buttons.forEach(button => button.addEventListener('transitionend', removePulse));

function pulseButton(e) {
    event.preventDefault();
    const button = e.key === "=" ? document.querySelector('#Enter')
        : e.key === "Delete" ? document.querySelector('#Escape')
        : document.querySelector(`button[id="${e.key}"]`);        

    if (operand.length <= inputDigitsLimit) {
        button.classList.add('pulse');
    }
    eventHandler(e.key);
}

function removePulse(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('pulse');
}

function eventHandler(input) {
    console.log("input = " + input);
    switch (input) {
        //case "clear":
        case "Delete":
        case "Escape":
            equation = [];
            operand = "0";
            wasEqualsPressed = false;
            divideError = false;
            console.log("cleared");
            break;

        case "Backspace":
            operand = operand.substring(0, operand.length - 1);
            if (operand === "") {
                operand = "0";
            }
            break;

        case "/":
        case "*":
        case "-":
        case "+":
            if (divideError) return;

            if (operand !== "") {
                equation.push(operand);
            } 
            operand = "";

            // if last element is another operator, replace it
            if ("+-*/".includes(equation[equation.length - 1])) {
                equation.pop();
            }
            equation.push(input);

            wasEqualsPressed = false;
            break;

        case "=":
        case "Enter":
            console.log("= was selected")
            if (divideError) return;

            if (operand !== "") {
                equation.push(operand);
            }
            operand = "";

            // remove any unused operator or decimal from end of array
            while ("+-*/.".includes(equation[equation.length - 1])) {
                equation.pop();
            }

            subDisplay.textContent = equation.join("") + "=";
            mainDisplay.textContent = evaluate();

            wasEqualsPressed = true;
            break;

        case ".":
            if (operand.includes(".")) break;
            if (operand.length > inputDigitsLimit) break;

            if (wasEqualsPressed) { //start fresh
                equation = [];
                subDisplay.textContent = "";
                wasEqualsPressed = false;
            }

            if (operand === "") {
                operand = "0";
            }

            operand += input;

            break;

        default: //number inputs
            if (divideError) return;
            if (operand.length > inputDigitsLimit) return;

            if (wasEqualsPressed) { //start fresh
                equation = [];
                subDisplay.textContent = "";
                wasEqualsPressed = false;
            }

            if (operand === "0") { //ignore leading zeroes
                operand = "";
            }

            operand += input;
    }

    // updates display except after pressing equals
    if (!wasEqualsPressed) {
        mainDisplay.textContent = operand;
        subDisplay.textContent = equation.join("");

        let equationLength = equation.join("").length;
        if (equationLength > 90) {
            subDisplay.style.fontSize = "1vh";
        } else if (equationLength > 45) {
            subDisplay.style.fontSize = "2vh";
        } else {
            subDisplay.style.fontSize = "3vh";
        }
    }
}

function evaluate() {
    while (equation.length > 1) {
        // locate operators in equation
        let mulIndex = equation.findIndex(element => element === "*");
        let divIndex = equation.findIndex(element => element === "/");
        let addIndex = equation.findIndex(element => element === "+");
        let subIndex = equation.findIndex(element => element === "-");
        let operatorIndex = 0;

        // determine order of operation
        if (mulIndex !== -1 && divIndex !== -1) {
            if (mulIndex < divIndex) {
                operatorIndex = mulIndex;
            } else {
                operatorIndex = divIndex;
            }
        } else if (mulIndex !== -1) {
            operatorIndex = mulIndex;
        } else if (divIndex !== -1) {
            operatorIndex = divIndex;

        } else if (addIndex !== -1 && subIndex !== -1) {
            if (addIndex < subIndex) {
                operatorIndex = addIndex;
            } else {
                operatorIndex = subIndex;
            }
        } else if (addIndex !== -1) {
            operatorIndex = addIndex;
        } else {
            operatorIndex = subIndex;
        }

        //simplify 2 numbers at a time
        let operator = equation[operatorIndex];
        let num1 = equation[operatorIndex - 1];
        let num2 = equation[operatorIndex + 1];

        let result = operate(operator, num1, num2);
        if (result === "ERROR: Division by 0") {
            equation = [];
            divideError = true;
            console.log("oops");
            return result;
        }
        let resultIndex = operatorIndex - 1;

        equation.splice(resultIndex, 3, result);
    }
    return equation[0];
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            if (num2 === "0") {
                return "ERROR: Division by 0";
            }
            return divide(num1, num2);
    }
}

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
    return parseFloat(num1) / parseFloat(num2);
}