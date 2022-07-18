const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');


const sendNumberValue = number => {
    // If current display value is 0, replace it with what it was selected. If value is not 0, add the current value to the new value
    const displayValue = calculatorDisplay.textContent;

    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
};

const addDecimal = () => {
    // If no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
};


// Add event listeners for numbers, operators, and decimal buttons
inputButtons.forEach(inputButton => {
    if (inputButton.classList.length === 0) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    } else if (inputButton.classList.contains('operator')) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    } else if (inputButton.classList.contains('decimal')) {
        inputButton.addEventListener('click', addDecimal);
    }
});


// Reset the display
const resetAll = () => {
    calculatorDisplay.textContent = '0';
};

// Reset event listener
clearBtn.addEventListener('click', resetAll);