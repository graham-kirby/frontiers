const gameboard = document.getElementById("gameboard");
const cpucheck = document.getElementById("cpucheck");
const ctx = gameboard.getContext("2d");

let boardWidth = 500;
let boardHeight = 500;
let paddleSpin = 1.5; // >= 0.0
let paddleForce = 1.1; // >= 1.0
let paddleWidth = 25;
let paddleLength = 100;
let ballRadius = 12.5;
let paddleL;
let paddleR;
let scoreL = 0;
let scoreR = 0;

function resetGame() {
    clearInterval(intervalID); // clear the clock
    gameboard.width = boardWidth;
    gameboard.height = boardHeight;
    
    resetBall();
    resetPaddles();

    nextTick(); // start running the clock
}

function resetPaddles() {
    paddleL = new Paddle(0,0,paddleLength, paddleWidth, "#5BC0EB");
    paddleR = new Paddle(boardWidth-paddleWidth, 0 ,paddleLength, paddleWidth, "#FDE74C");

}

function resetBall() {
    ball = new Ball(boardWidth/2, boardHeight/2, 1, -1, ballRadius, "#C8CC7B")
}

function clearBoard() {
    ctx.fillStyle = "#FADDC6";
    ctx.fillRect(0, 0, boardWidth, boardHeight);
}

function draw() {
    clearBoard();
    
    ball.draw(ctx);
    paddleL.draw(ctx);
    paddleR.draw(ctx);
}

let intervalID;

function nextTick() {
    intervalID = setTimeout(
        () => {
            paddleL.move();
            if (cpucheck.checked) {
                 paddleR.moveCPU(ball);
            } else {
                 paddleR.move();
            }

            ball.bounceWall();
            if (ball.bouncePaddleL(paddleL)) score("right");
            if (ball.bouncePaddleR(paddleR)) score("left");
            
            ball.move();

            draw();
            levelUp();
            nextTick();
        }, 10
    );
}

function score(player) {
    if (player == "left") scoreL++;
    if (player == "right") scoreR++;
    
    if (Math.random() < 0.5) {
        ball.vx
    } 
    else {
        ball.vy
    }
    updateScore();
    resetBall();
}

function updateScore() {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = `${scoreL} : ${scoreR}`;
}

function levelUp() {
    if (scoreL + scoreR > 4) {
        ball.c = "green";
        ball.vx = 3
        ball.vy = -2
    }
}