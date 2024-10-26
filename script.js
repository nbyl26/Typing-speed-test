const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "In the middle of every difficulty lies opportunity."
];

let startTime;
let timerInterval;

const textToTypeElement = document.getElementById("text-to-type");
const userInputElement = document.getElementById("user-input");
const resultElement = document.getElementById("result");
const startButton = document.getElementById("start-button");
const timerElement = document.getElementById("timer");

// Function to start the typing test
startButton.addEventListener("click", startTest);

function startTest() {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    textToTypeElement.textContent = randomText;
    userInputElement.value = '';
    resultElement.textContent = '';
    timerElement.textContent = '0'; // Reset timer
    userInputElement.focus();
    startTime = Date.now();
    
    // Reset timer
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerElement.textContent = elapsedTime;
    
    if (elapsedTime >= 30) { // 30 seconds limit
        clearInterval(timerInterval);
        calculateResult();
    }
}

// Function to calculate typing speed
userInputElement.addEventListener("input", () => {
    if (userInputElement.value === textToTypeElement.textContent) {
        clearInterval(timerInterval);
        calculateResult();
    }
});

function calculateResult() {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const wordsTyped = userInputElement.value.trim().split(/\s+/).length;
    const typingSpeed = Math.round((wordsTyped / timeTaken) * 60);
    
    resultElement.textContent = `Your typing speed is ${typingSpeed} words per minute!`;
    resultElement.textContent += `\nTotal time: ${timeTaken} seconds.`;
}
