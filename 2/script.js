let currentMode = "V";
let reading = 0.00;
let isHold = false;
let minValue = null;
let maxValue = null;

const readingDisplay = document.getElementById('reading');
const unitDisplay = document.getElementById('unit');

function updateDisplay() {
    readingDisplay.textContent = reading.toFixed(2);
    unitDisplay.textContent = currentMode;
}

document.querySelector(`.mode[data-unit="${currentMode}"]`).classList.add('active');

document.querySelectorAll('.mode').forEach(button => {
    button.addEventListener('click', (event) => {
        document.querySelectorAll('.mode').forEach(btn => btn.classList.remove('active'));
 
        currentMode = event.target.dataset.unit;
        event.target.classList.add('active');

        reading = 0.00;
        minValue = null;
        maxValue = null;
        updateDisplay();
    });
});


document.getElementById('hold').addEventListener('click', () => {
    isHold = !isHold;
    document.getElementById('hold').textContent = isHold ? "RELEASE" : "HOLD";
});

document.getElementById('min-max').addEventListener('click', () => {
    if (minValue === null || maxValue === null) {
        alert("Matavimų nėra.");
    } else {
        alert(`MIN: ${minValue.toFixed(2)} ${currentMode}, MAX: ${maxValue.toFixed(2)} ${currentMode}`);
    }
});

document.getElementById('reset').addEventListener('click', () => {
    reading = 0.00;
    minValue = null;
    maxValue = null;
    isHold = false;
    document.getElementById('hold').textContent = "HOLD";
    updateDisplay();
});

setInterval(() => {
    if (!isHold) {
        reading = Math.random() * 10;
        if (minValue === null || reading < minValue) minValue = reading;
        if (maxValue === null || reading > maxValue) maxValue = reading;
        updateDisplay();
    }
}, 1000);
