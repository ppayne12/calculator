'use strict';

let equation = [];
let currentNumber = '';
let plusMinus = false;
let isResult = false;


const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', handleEvent)
});

function handleEvent(event) {
    const buttonPressed = this.id;
    const screenEquation = document.querySelector(".equation");
    const screenResult = document.querySelector(".result");

    switch (buttonPressed) {
        case "=":
            equation.push(plusMinus ? -(+currentNumber) : +currentNumber);
            currentNumber = Math.round(operate(equation) * 100000000) / 100000000
            screenResult.textContent = '';
            equation = [];
            isResult = true;
            document.getElementById(".").disabled = false;
            break;
        case "clear":
            screenEquation.textContent = '';
            screenResult.textContent = '';
            equation = [];
            currentNumber = '';
            document.getElementById(".").disabled = false;
            return;
        case "plus-minus":
            plusMinus = !plusMinus;
            if (!currentNumber) {
            }
            break;
        case "X":
        case "/":
        case "+":
        case "-":
            currentNumber = push(currentNumber, buttonPressed);
            screenResult.textContent = operate(equation);
            document.getElementById(".").disabled = false;
            break;
        case ".":
            document.getElementById(".").disabled = true;
        default:
            if (isResult) {
                currentNumber = buttonPressed;
                isResult = false;
            } else {
                currentNumber = currentNumber + buttonPressed;
            }
    }
    if (currentNumber) {
        screenEquation.textContent = `${equation.join("")}${plusMinus ? '-' + currentNumber : currentNumber}`;
    } else {
        screenEquation.textContent = `${equation.join("")}${plusMinus ? '-' : ''}`;
    }


}

function push(currentNumber, buttonPressed) {
    equation.push(plusMinus ? -(+currentNumber) : +currentNumber);
    equation.push(buttonPressed);
    plusMinus = false;
    return '';
}

function operate(arr) {
    let evaluatedArr = cleanArray(arr);
    return evaluatedArr.reduce((previous, current) => {
        return previous + current;
    }, 0);
}

//evaluates all the multiplication and division and returns array with only post or negative numbers to sum
function cleanArray(arr) {
    let updatedArray = [];
    let workingArray = arr.slice(0);
    for (let i = 0; i < workingArray.length; i++) {
        let result;
        if (workingArray[i] === "X") {
            if (i === (workingArray.length - 1)) {
                continue;
            }
            updatedArray.pop();
            result = workingArray[i - 1] * workingArray[i + 1];
            workingArray[i + 1] = result;
            updatedArray.push(result);
            i++;
        } else if (workingArray[i] === "/") {
            if (i === (workingArray.length - 1)) {
                continue;
            }
            updatedArray.pop();
            result = workingArray[i - 1] / workingArray[i + 1];
            workingArray[i + 1] = result;
            updatedArray.push(result);
            i++;

        } else if (workingArray[i] === "+") {
            continue;
        } else if (workingArray[i] === "-") {
            i++;
            updatedArray.push(-(+workingArray[i]));
            continue;
        }
        else {
            updatedArray.push(workingArray[i]);
        }
    }

    return updatedArray
}




