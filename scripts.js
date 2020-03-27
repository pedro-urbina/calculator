let equation = [];
let operand = "0";
let wasEqualsPressed = false;
const mainDisplay = document.querySelector("#main-display-text");
const subDisplay = document.querySelector("#sub-display-text");
mainDisplay.textContent = operand;

// Button Event Listeners
const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('click', function (e) {
    eventHandler(e.target.id);
}));

function eventHandler(input) {
    switch (input) {
        case "clear":
            equation = [];
            operand = "0";
            mainDisplay.textContent = "0";
            subDisplay.textContent = "";
            break;

        case "back":
            break;

        case "/":
        case "*":
        case "-":
        case "+":
            if (operand !== "") {
                equation.push(operand);
            }
            operand = "";

            // if last input was an operator, replace it
            if ("+-*/".includes(equation[equation.length - 1])) {
                equation.pop();
            }

            equation.push(input);

            subDisplay.textContent = equation.join("");
            mainDisplay.textContent = "";
            wasEqualsPressed = false;
            break;

        case "=":
            if (operand !== "") { 
                equation.push(operand);
            }
            operand = "";

            // remove any unused operator from end of array
            if ("+-*/".includes(equation[equation.length - 1])) {
                equation.pop();
            }

            subDisplay.textContent = equation.join("") + "=";
            mainDisplay.textContent = evaluate();

            wasEqualsPressed = true;
            break;

        default: //number or decimal input
            if (wasEqualsPressed) { //start fresh
                equation = [];
                subDisplay.textContent = "";
                wasEqualsPressed = false;
            }

            if (operand === "0") { //ignore leading zeroes
                operand = "";
            }

            operand += input;
            mainDisplay.textContent = operand;
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