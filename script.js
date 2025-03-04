const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resultDisplay = document.getElementById('resultDisplay');
const functionInput = document.getElementById('functionInput');
const levelDisplay = document.getElementById('levelDisplay');
const equationDisplay = document.getElementById('equationDisplay');
const dabloonsDisplay = document.getElementById('dabloonsDisplay');
const startXDisplay = document.getElementById('startXDisplay');
const startYDisplay = document.getElementById('startYDisplay');
const goalXDisplay = document.getElementById('goalXDisplay');
const goalYDisplay = document.getElementById('goalYDisplay');

const width = canvas.width;
const height = canvas.height;
const originX = width / 2;
const originY = height / 2;
const scale = 15;

const levels = [
    // Level 1: Simple linear, Pookie at origin
    [
        { startX: 0, startY: 0, goalX: 5, goalY: 5, obstacles: [] },
        { startX: 0, startY: 0, goalX: -5, goalY: 5, obstacles: [] },
        { startX: 0, startY: 0, goalX: 5, goalY: -5, obstacles: [] },
        { startX: 0, startY: 0, goalX: -5, goalY: -5, obstacles: [] },
        { startX: 0, startY: 0, goalX: 10, goalY: 5, obstacles: [] },
    ],
    // Level 2: Linear with obstacles
    [
        { startX: 0, startY: 0, goalX: 8, goalY: 4, obstacles: [{ x: 4, y: 2, radius: 2 }] },
        { startX: 0, startY: 0, goalX: -6, goalY: 6, obstacles: [{ x: -3, y: 3, radius: 2 }] },
        { startX: 0, startY: 0, goalX: 6, goalY: -6, obstacles: [{ x: 3, y: -3, radius: 2 }] },
        { startX: 0, startY: 0, goalX: -8, goalY: -4, obstacles: [{ x: -4, y: -2, radius: 2 }] },
        { startX: 0, startY: 0, goalX: 10, goalY: 10, obstacles: [{ x: 5, y: 5, radius: 2 }] },
    ],
    // Level 3: Quadratic needed
    [
        { startX: 0, startY: 0, goalX: 4, goalY: 16, obstacles: [{ x: 2, y: 8, radius: 3 }] },
        { startX: 0, startY: 0, goalX: -3, goalY: 9, obstacles: [{ x: -1.5, y: 4.5, radius: 2 }] },
        { startX: 0, startY: 0, goalX: 5, goalY: 25, obstacles: [{ x: 2.5, y: 12.5, radius: 3 }] },
        { startX: 0, startY: 0, goalX: -4, goalY: 16, obstacles: [{ x: -2, y: 8, radius: 3 }] },
        { startX: 0, startY: 0, goalX: 6, goalY: 36, obstacles: [{ x: 3, y: 18, radius: 4 }] },
    ],
    // Level 4: Quadratic with obstacles
    [
        { startX: 0, startY: 0, goalX: 5, goalY: 25, obstacles: [{ x: 2, y: 10, radius: 3 }, { x: 4, y: 20, radius: 2 }] },
        { startX: 0, startY: 0, goalX: -4, goalY: 16, obstacles: [{ x: -2, y: 8, radius: 2 }, { x: -3, y: 12, radius: 2 }] },
        { startX: 0, startY: 0, goalX: 6, goalY: 36, obstacles: [{ x: 3, y: 18, radius: 3 }, { x: 5, y: 30, radius: 2 }] },
        { startX: 0, startY: 0, goalX: -5, goalY: 25, obstacles: [{ x: -2, y: 10, radius: 3 }, { x: -4, y: 20, radius: 2 }] },
        { startX: 0, startY: 0, goalX: 7, goalY: 49, obstacles: [{ x: 3, y: 20, radius: 4 }, { x: 6, y: 40, radius: 3 }] },
    ],
    // Level 5: Logarithmic needed
    [
        { startX: 1, startY: 0, goalX: 10, goalY: 2.3, obstacles: [{ x: 5, y: 1.15, radius: 2 }] },
        { startX: 2, startY: 0.69, goalX: 8, goalY: 2.08, obstacles: [{ x: 5, y: 1.39, radius: 2 }] },
        { startX: 1, startY: 0, goalX: 15, goalY: 2.71, obstacles: [{ x: 8, y: 1.35, radius: 2 }] },
        { startX: 3, startY: 1.1, goalX: 12, goalY: 2.48, obstacles: [{ x: 7, y: 1.79, radius: 2 }] },
        { startX: 1, startY: 0, goalX: 20, goalY: 3, obstacles: [{ x: 10, y: 1.5, radius: 3 }] },
    ],
    // Level 6: Logarithmic with obstacles
    [
        { startX: 1, startY: 0, goalX: 10, goalY: 2.3, obstacles: [{ x: 3, y: 0.5, radius: 2 }, { x: 7, y: 1.8, radius: 2 }] },
        { startX: 2, startY: 0.69, goalX: 8, goalY: 2.08, obstacles: [{ x: 4, y: 1, radius: 2 }, { x: 6, y: 1.7, radius: 2 }] },
        { startX: 1, startY: 0, goalX: 15, goalY: 2.71, obstacles: [{ x: 5, y: 0.8, radius: 2 }, { x: 12, y: 2.3, radius: 2 }] },
        { startX: 3, startY: 1.1, goalX: 12, goalY: 2.48, obstacles: [{ x: 6, y: 1.5, radius: 2 }, { x: 9, y: 2.1, radius: 2 }] },
        { startX: 1, startY: 0, goalX: 20, goalY: 3, obstacles: [{ x: 8, y: 1.2, radius: 3 }, { x: 15, y: 2.5, radius: 2 }] },
    ],
    // Level 7: Trigonometric needed
    [
        { startX: 0, startY: 0, goalX: 3.14, goalY: 0, obstacles: [{ x: 1.57, y: 0.5, radius: 2 }] },
        { startX: 0, startY: 1, goalX: 1.57, goalY: 0, obstacles: [{ x: 0.78, y: 0.5, radius: 1 }] },
        { startX: 0, startY: 0, goalX: 4.71, goalY: 0, obstacles: [{ x: 2.36, y: 0.5, radius: 2 }] },
        { startX: 0, startY: -1, goalX: 3.14, goalY: 1, obstacles: [{ x: 1.57, y: 0, radius: 2 }] },
        { startX: 0, startY: 0, goalX: 6.28, goalY: 0, obstacles: [{ x: 3.14, y: 0.5, radius: 2 }] },
    ],
    // Level 8: Trigonometric with obstacles
    [
        { startX: 0, startY: 0, goalX: 3.14, goalY: 0, obstacles: [{ x: 1, y: 0.5, radius: 2 }, { x: 2.5, y: -0.5, radius: 2 }] },
        { startX: 0, startY: 1, goalX: 1.57, goalY: 0, obstacles: [{ x: 0.5, y: 0.8, radius: 1 }, { x: 1.2, y: 0.2, radius: 1 }] },
        { startX: 0, startY: 0, goalX: 4.71, goalY: 0, obstacles: [{ x: 2, y: 0.5, radius: 2 }, { x: 4, y: -0.5, radius: 2 }] },
        { startX: 0, startY: -1, goalX: 3.14, goalY: 1, obstacles: [{ x: 1, y: -0.5, radius: 2 }, { x: 2.5, y: 0.5, radius: 2 }] },
        { startX: 0, startY: 0, goalX: 6.28, goalY: 0, obstacles: [{ x: 2, y: 0.5, radius: 2 }, { x: 5, y: -0.5, radius: 2 }] },
    ],
    // Level 9: Exponential needed
    [
        { startX: 0, startY: 1, goalX: 2, goalY: 7.39, obstacles: [{ x: 1, y: 3, radius: 2 }] },
        { startX: 0, startY: 1, goalX: 3, goalY: 20.09, obstacles: [{ x: 1.5, y: 5, radius: 3 }] },
        { startX: 0, startY: 1, goalX: 1, goalY: 2.72, obstacles: [{ x: 0.5, y: 1.5, radius: 1 }] },
        { startX: 0, startY: 1, goalX: 4, goalY: 54.6, obstacles: [{ x: 2, y: 10, radius: 4 }] },
        { startX: 0, startY: 1, goalX: 5, goalY: 148.4, obstacles: [{ x: 3, y: 20, radius: 5 }] },
    ],
    // Level 10: Mixed with obstacles
    [
        { startX: 0, startY: 0, goalX: 4, goalY: 16, obstacles: [{ x: 2, y: 8, radius: 3 }, { x: 3, y: 12, radius: 2 }] },
        { startX: 1, startY: 0, goalX: 10, goalY: 2.3, obstacles: [{ x: 5, y: 1, radius: 2 }, { x: 8, y: 2, radius: 2 }] },
        { startX: 0, startY: 0, goalX: 3.14, goalY: 0, obstacles: [{ x: 1.5, y: 0.5, radius: 2 }, { x: 2.5, y: -0.5, radius: 2 }] },
        { startX: 0, startY: 1, goalX: 2, goalY: 7.39, obstacles: [{ x: 1, y: 3, radius: 2 }, { x: 1.5, y: 5, radius: 2 }] },
        { startX: 0, startY: 0, goalX: 6, goalY: 36, obstacles: [{ x: 3, y: 18, radius: 3 }, { x: 5, y: 30, radius: 3 }] },
    ]
];

let currentLevel = 0;
let currentEquation = 0;
let dabloons = 0;
let pookieX = levels[currentLevel][currentEquation].startX;
let isAnimating = false;

function drawGraph() {
    if (isAnimating) return;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 0; y <= height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();
    drawObstacles();
    drawHome(levels[currentLevel][currentEquation].goalX, levels[currentLevel][currentEquation].goalY);
    drawPookie(pookieX, levels[currentLevel][currentEquation].startY);
    updateDisplay();
}

function drawHome(x, y) {
    const canvasX = x * scale + originX;
    const canvasY = -y * scale + originY;
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.moveTo(canvasX, canvasY - 15);
    ctx.lineTo(canvasX - 10, canvasY);
    ctx.lineTo(canvasX + 10, canvasY);
    ctx.lineTo(canvasX + 10, canvasY + 10);
    ctx.lineTo(canvasX - 10, canvasY + 10);
    ctx.lineTo(canvasX - 10, canvasY);
    ctx.fill();
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(canvasX - 3, canvasY + 3, 6, 7);
}

function drawPookie(x, y) {
    const canvasX = x * scale + originX;
    const canvasY = -y * scale + originY;
    ctx.fillStyle = '#ffa500';
    ctx.beginPath();
    ctx.ellipse(canvasX, canvasY + 10, 10, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvasX, canvasY - 5, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff8c00';
    ctx.beginPath();
    ctx.moveTo(canvasX - 6, canvasY - 12);
    ctx.lineTo(canvasX - 2, canvasY - 18);
    ctx.lineTo(canvasX + 2, canvasY - 12);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(canvasX + 6, canvasY - 12);
    ctx.lineTo(canvasX + 2, canvasY - 18);
    ctx.lineTo(canvasX - 2, canvasY - 12);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(canvasX - 3, canvasY - 6, 1, 0, Math.PI * 2);
    ctx.arc(canvasX + 3, canvasY - 6, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffa500';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvasX - 10, canvasY + 15);
    ctx.quadraticCurveTo(canvasX - 15, canvasY + 20, canvasX - 20, canvasY + 15);
    ctx.stroke();
}

function drawObstacles() {
    const obstacles = levels[currentLevel][currentEquation].obstacles;
    ctx.fillStyle = '#ff0000';
    obstacles.forEach(obstacle => {
        const canvasX = obstacle.x * scale + originX;
        const canvasY = -obstacle.y * scale + originY;
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, obstacle.radius * scale, 0, Math.PI * 2);
        ctx.fill();
    });
}

function evaluateEquation(equation, x) {
    const sanitized = equation.replace(/[^0-9x+\-*/().^ logsinctae]/g, '');
    try {
        let expression = sanitized;
        const powerRegex = /(\d*\.?\d*|x)\s*\^\s*(\d*\.?\d*|x)/g;
        expression = expression.replace(powerRegex, 'Math.pow($1, $2)');
        expression = expression
            .replace(/log/g, 'Math.log')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/exp/g, 'Math.exp')
            .replace(/x/g, `(${x})`);
        const result = eval(expression);
        if (isNaN(result) || !isFinite(result)) return NaN;
        return result;
    } catch (error) {
        return NaN;
    }
}

function plotEquation(equation) {
    if (isAnimating) return;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 0; y <= height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let firstPoint = true;
    for (let x = -originX / scale; x <= originX / scale; x += 0.1) {
        const y = evaluateEquation(equation, x);
        if (isNaN(y)) continue;
        const canvasX = x * scale + originX;
        const canvasY = -y * scale + originY;
        if (firstPoint) {
            ctx.moveTo(canvasX, canvasY);
            firstPoint = false;
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    ctx.stroke();
    ctx.lineWidth = 1;

    drawObstacles();
    drawHome(levels[currentLevel][currentEquation].goalX, levels[currentLevel][currentEquation].goalY);
    drawPookie(pookieX, evaluateEquation(equation, pookieX) || levels[currentLevel][currentEquation].startY);
}

function checkCollision(equation, startX, endX) {
    const obstacles = levels[currentLevel][currentEquation].obstacles;
    const step = (endX - startX) > 0 ? 0.1 : -0.1;
    for (let x = startX; (step > 0 ? x <= endX : x >= endX); x += step) {
        const y = evaluateEquation(equation, x);
        if (isNaN(y)) continue;
        for (let obstacle of obstacles) {
            const dx = x - obstacle.x;
            const dy = y - obstacle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < obstacle.radius) {
                return true;
            }
        }
    }
    return false;
}

function animatePookie(equation) {
    isAnimating = true;
    const startX = levels[currentLevel][currentEquation].startX;
    const endX = levels[currentLevel][currentEquation].goalX;
    const steps = 50;
    let step = 0;

    function move() {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 0.5;
        for (let x = 0; x <= width; x += scale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y <= height; y += scale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(originX, 0);
        ctx.lineTo(originX, height);
        ctx.moveTo(0, originY);
        ctx.lineTo(width, originY);
        ctx.stroke();

        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        let firstPoint = true;
        for (let x = -originX / scale; x <= originX / scale; x += 0.1) {
            const y = evaluateEquation(equation, x);
            if (isNaN(y)) continue;
            const canvasX = x * scale + originX;
            const canvasY = -y * scale + originY;
            if (firstPoint) {
                ctx.moveTo(canvasX, canvasY);
                firstPoint = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        ctx.stroke();
        ctx.lineWidth = 1;

        drawObstacles();
        drawHome(levels[currentLevel][currentEquation].goalX, levels[currentLevel][currentEquation].goalY);

        step++;
        pookieX = startX + (endX - startX) * (step / steps);
        const pookieY = evaluateEquation(equation, pookieX);
        drawPookie(pookieX, pookieY);

        if (step < steps) {
            requestAnimationFrame(move);
        } else {
            isAnimating = false;
            setTimeout(nextChallenge, 1000);
        }
    }
    requestAnimationFrame(move);
}

function nextChallenge() {
    currentEquation++;
    dabloons += 100;
    if (currentEquation >= 5) {
        currentLevel++;
        currentEquation = 0;
        if (currentLevel >= levels.length) {
            resultDisplay.textContent = 'GAME COMPLETE! YOU COLLECTED ' + dabloons + ' DABLOONS!';
            return;
        }
    }
    pookieX = levels[currentLevel][currentEquation].startX;
    drawGraph();
    resultDisplay.textContent = '';
    functionInput.value = '';
}

function updateDisplay() {
    levelDisplay.textContent = currentLevel + 1;
    equationDisplay.textContent = currentEquation + 1;
    dabloonsDisplay.textContent = dabloons;
    startXDisplay.textContent = levels[currentLevel][currentEquation].startX;
    startYDisplay.textContent = levels[currentLevel][currentEquation].startY.toFixed(2);
    goalXDisplay.textContent = levels[currentLevel][currentEquation].goalX;
    goalYDisplay.textContent = levels[currentLevel][currentEquation].goalY.toFixed(2);
}

function checkEquation() {
    if (isAnimating) return;
    const equation = functionInput.value.trim();
    if (!equation) {
        resultDisplay.textContent = 'ERROR: ENTER AN EQUATION';
        return;
    }
    const yAtStart = evaluateEquation(equation, levels[currentLevel][currentEquation].startX);
    const yAtGoal = evaluateEquation(equation, levels[currentLevel][currentEquation].goalX);
    if (isNaN(yAtStart) || isNaN(yAtGoal)) {
        resultDisplay.textContent = 'ERROR: INVALID SYNTAX';
        return;
    }
    const tolerance = 0.5;
    const startCorrect = Math.abs(yAtStart - levels[currentLevel][currentEquation].startY) <= tolerance;
    const goalCorrect = Math.abs(yAtGoal - levels[currentLevel][currentEquation].goalY) <= tolerance;
    const noCollision = !checkCollision(equation, 
        levels[currentLevel][currentEquation].startX, 
        levels[currentLevel][currentEquation].goalX);

    if (startCorrect && goalCorrect && noCollision) {
        resultDisplay.textContent = `SUCCESS! +100 DABLOONS (Total: ${dabloons + 100})`;
        animatePookie(equation);
    } else {
        let message = 'TRY AGAIN: Must pass ';
        if (!startCorrect || !goalCorrect) {
            message += `(${levels[currentLevel][currentEquation].startX}, ${levels[currentLevel][currentEquation].startY}) and (${levels[currentLevel][currentEquation].goalX}, ${levels[currentLevel][currentEquation].goalY})`;
        }
        if (!noCollision) {
            message += ' and avoid obstacles';
        }
        resultDisplay.textContent = message;
        plotEquation(equation);
    }
}

function addToInput(value) {
    functionInput.value += value;
    functionInput.focus();
}

functionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkEquation();
    }
});

drawGraph();
