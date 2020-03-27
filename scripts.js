let buffer = [];

// Button Event Listeners
const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('click', function (e) {
    eventHandler(e.target.id);
}));

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

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            if (num2 === 0) return "ERROR: Dividing by zero is simply not possible";
            return divide(num1, num2);
    }
}

function evaluate() {
    while (buffer.length > 1) {
        console.log(buffer);
        let mulIndex = buffer.findIndex(element => element === "*");
        let divIndex = buffer.findIndex(element => element === "/");
        let addIndex = buffer.findIndex(element => element === "+");
        let subIndex = buffer.findIndex(element => element === "-");
        let operatorIndex = 0;
        console.log(addIndex);

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

        //console.log(operatorIndex);

        let operator = buffer[operatorIndex];
        let num1 = buffer[operatorIndex - 1];
        let num2 = buffer[operatorIndex + 1];

        //console.log(operator);
        //console.log(num1);
        //console.log(num2);

        let result = operate(operator, num1, num2);
        let resultIndex = operatorIndex - 1;

        //console.log(result);
        //console.log(buffer);
        buffer.splice(resultIndex, 3, result);
        //console.log(buffer);
    }
    //console.log(buffer[0]);
    return buffer[0];
}

let operand = "";
function eventHandler(input) {
    const mainDisplay = document.querySelector("#main-display-text");
    const subDisplay = document.querySelector("#sub-display-text");

    switch (input) {
        case "clear":
            buffer = [];
            mainDisplay.textContent = "";
            subDisplay.textContent = "";
            break;
        case "back":
            break;
        case "/":
        case "*":
        case "-":
        case "+":
            buffer.push(operand);
            operand = "";
            buffer.push(input);
            //console.log(buffer);
            subDisplay.textContent = buffer.join("");
            //subDisplay.textContent += `${mainDisplay.textContent} ${input} `;
            mainDisplay.textContent = "";
            break;
        case "=":
            // remove any unused operator from end of array
            if ("+-*/".includes(buffer[buffer.length - 1])) {
                buffer.pop();
                subDisplay.textContent = buffer.join("");
            }
            //console.log(buffer);
            buffer.push(operand);
            operand = "";
            subDisplay.textContent += `${mainDisplay.textContent} ${input} `;
            mainDisplay.textContent = evaluate();
            break;
        default:
            operand += input;
            //console.log(buffer);
            mainDisplay.textContent = operand;
    }
}