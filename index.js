let currentNumber = '';
let operation = null;
let previousNumber = null;
let shouldResetScreen = false;

function updater() {
    const output = document.getElementById("display");
    output.textContent = currentNumber || '0';
}

function erase() {
    currentNumber = '';
    operation = null;
    previousNumber = null;
    shouldResetScreen = false;
    updater();
}

function setOperation(operator) {
    if (currentNumber === '' && previousNumber === null) return;
    if (previousNumber !== null) {
        calculate();
    }
    operation = operator;
    previousNumber = currentNumber;
    currentNumber = '';
    shouldResetScreen = true;
}

function calculate() {
    if (operation === null || previousNumber === null || currentNumber === '') return;

    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'x':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }

    currentNumber = result.toString();
    operation = null;
    previousNumber = null;
    shouldResetScreen = true;
    updater();
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (!isNaN(buttonText)) { // Check if buttonText is a number
            if (shouldResetScreen) {
                currentNumber = '';
                shouldResetScreen = false;
            }
            currentNumber += buttonText;
            updater();
        } else if (buttonText === '.') {
            if (!currentNumber.includes('.')) {
                if (shouldResetScreen) {
                    currentNumber = '0';
                    shouldResetScreen = false;
                }
                currentNumber += '.';
                updater();
            }
        } else if (buttonText === 'C') {
            erase();
        } else if (buttonText === '=') {
            calculate();
        } else if (buttonText === '+') {
            setOperation('+');
        } else if (buttonText === '-') {
            setOperation('-');
        } else if (buttonText === 'x') {
            setOperation('x');
        } else if (buttonText === '÷') {
            setOperation('÷');
        }
    });
});

function handleNavbarVisibility() {
    var navbar = document.querySelector(".navbar");
    if (window.innerWidth <= 767) {
      navbar.style.display = "none"; // Hide the navbar on mobile
    } else {
      navbar.style.display = "block"; // Show the navbar on larger screens
    }
  }
  
  // Run the function on initial load
  handleNavbarVisibility();
  
  // Run the function on window resize
  window.addEventListener("resize", handleNavbarVisibility);
  