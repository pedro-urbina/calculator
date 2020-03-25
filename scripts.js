function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "add":
            add(num1, num2);
            break;
        case "subtract":
            subtract(num1, num2);
            break;
        case "multiply":
            multiply(num1, num2);
            break;
        case "divide":
            divide(num1, num2);
            if (num2 === 0) return "ERROR: Dividing by zero is simply not possible";
            break;
    }
}

// Button Event Listeners
const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('click', function (e) {
    display(e.target.id);
}));

function eventHandler() {

}

function display(input) {
    const mainDisplay = document.querySelector("#main-display-text");
    const subDisplay = document.querySelector("#sub-display-text");

    switch (input) {
        case "clear":
            mainDisplay.textContent = "";
            subDisplay.textContent = "";
            break;
        case "back":
            break;
        case "/":
        case "*":
        case "-":
        case "+":
            subDisplay.textContent += `${mainDisplay.textContent} ${input} `;
            mainDisplay.textContent = "";
            break;
        case "=":
            subDisplay.textContent += `${mainDisplay.textContent} ${input} `;
            mainDisplay.textContent = "result";
            break;
        default:
            mainDisplay.textContent += input;
    }
}