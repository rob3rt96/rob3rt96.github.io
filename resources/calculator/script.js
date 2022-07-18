const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');


const sendNumberValue = number => {
    // If current display value is 0, replace it with what it was selected. If value is not 0, add the current value to the new value
    const displayValue = calculatorDisplay.textContent;

    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
};


// Add event listeners for numbers, operators, and decimal buttons
inputButtons.forEach(inputButton => {
    if (inputButton.classList.length === 0) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    } else if (inputButton.classList.contains('operator')) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    } else if (inputButton.classList.contains('decimal')) {
        inputButton.addEventListener('click', () => sendNumberValue());
    }
});
