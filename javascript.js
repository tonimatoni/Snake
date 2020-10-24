var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var snake = [
    { x: 64, y: 32 }, // HEAD 
    { x: 48, y: 32 },
    { x: 32, y: 32 },
    { x: 16, y: 32 }
];
var apple = {};
var direction = {
    right: true,
    up: false,
    left: false,
    down: false
}

const canvasDIM = 608;
const boxDIM = 16;
canvas.width = canvasDIM;
canvas.height = canvasDIM;

context.font = "53px Arial";
context.lineWidth = 7;
context.strokeText("Press ENTER to continue", 0, 300);
context.fillStyle = 'teal';
context.fillText("Press ENTER to continue", 0, 300)

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        createApple();
        draw();

    }
});

function doesCollide() {
    var index = 0;
    snake.forEach(function() {
        for (var i = index + 1; i < snake.length; i++) {
            if (snake[i].x == snake[index].x && snake[i].y == snake[index].y) {
                canvas.style.backgroundColor = 'red';
                setTimeout(() => {
                    alert(`GAME OVER... Score:${score-1} in ${document.querySelector('#time').textContent}`)
                }, 200);
            }
        }

        index++;
    })
}

function draw() {

    context.clearRect(0, 0, canvasDIM, canvasDIM);


    // APPLE
    context.beginPath();
    context.arc(apple.x + 8, apple.y - 8, boxDIM - 8, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();

    for (let index = 0; index < snake.length; index++) {
        //context.lineWidth = 1;
        //context.strokeRect(snake[index].x, snake[index].y, boxDIM, boxDIM);

        if (index == 0) {
            context.fillStyle = 'green';
            context.fillRect(snake[index].x, snake[index].y, boxDIM, boxDIM);

        } else {
            context.fillStyle = 'black';
            context.fillRect(snake[index].x, snake[index].y, boxDIM, boxDIM);
        }

    }

    console.log(apple, snake[0]);

    if (apple.x == snake[0].x && apple.y == snake[0].y + 16) {
        addAPoint();
        createApple();
        setTimeout(() => {
            resetBackground();
        }, 100);
        scoreIt();
    }
    if (snake[0].x > canvas.width) {
        snake[0].x = 0;
    } else if (snake[0].y > canvas.height) {
        snake[0].y = 0;
    } else if (snake[0].x < 0) {
        snake[0].x = canvas.width;
    } else if (snake[0].y < 0) {
        snake[0].y = canvas.height;
    }

    doesCollide()
}


function createApple() {
    apple.x = Math.round((Math.random() * canvasDIM) / boxDIM) * boxDIM;
    apple.y = Math.round((Math.random() * canvasDIM) / boxDIM) * boxDIM;
}

function addAPoint() {
    snake.push({ x: snake[snake.length - 1].x - boxDIM, y: snake[snake.length - 1].y - boxDIM });
    canvas.style.backgroundColor = 'rgb(225, 231, 248)';

}

function resetBackground() {
    canvas.style.backgroundColor = 'white';
}


function moveSnake() {
    for (let index = snake.length - 1; index > 0; index--) {
        snake[index].x = snake[index - 1].x;
        snake[index].y = snake[index - 1].y;

    }
}

var timerStarted = false;

function startTheTimer() {
    if (timerStarted == false) {
        timer();

    }
    timerStarted = true;
}
var score = 0;

function scoreIt() {
    document.getElementById('score').innerHTML = `Score = ${score}`;
    score++;
}
scoreIt();
document.addEventListener('keydown', (e) => {
    if (e.keyCode != 13) {
        startTheTimer();

        switch (e.keyCode) {
            /*DOWN ARROW*/
            case 40:
                if (direction.up != true) {

                    direction.right = false;
                    direction.left = false;
                    direction.down = true;

                }
                break;
                /*RIGHT ARROW*/
            case 39:
                if (direction.left != true) {

                    direction.up = false;
                    direction.down = false;
                    direction.right = true;
                }
                break;
                /*UP ARROW*/
            case 38:
                if (direction.down != true) {

                    direction.right = false;
                    direction.left = false;
                    direction.up = true;

                }
                break;
                /*LEFT ARROW*/
            case 37:
                if (direction.right != true) {

                    direction.up = false;
                    direction.down = false;
                    direction.left = true;

                }
                break;

        }
        moveIt();
        draw();
    }
});





function moveIt() {
    if (direction.up) {


        var timerId = setInterval(() => {
            requestAnimationFrame(draw);
            moveSnake();
            snake[0].y -= boxDIM;
            if (direction.up == false) {

                clearInterval(timerId);
            };
        }, 150);


    } else if (direction.right) {


        var timerId = setInterval(() => {
            requestAnimationFrame(draw);
            moveSnake();
            snake[0].x += boxDIM;
            if (direction.right == false) {

                clearInterval(timerId);
            };
        }, 150);
    } else if (direction.down) {

        var timerId = setInterval(() => {
            requestAnimationFrame(draw);
            moveSnake();
            snake[0].y += boxDIM;
            if (direction.down == false) {

                clearInterval(timerId);
            };
        }, 150);
    } else if (direction.left) {
        var timerId = setInterval(() => {
            requestAnimationFrame(draw);
            moveSnake();
            snake[0].x -= boxDIM;
            if (direction.left == false) {
                clearInterval(timerId);
            };
        }, 150);
    }

}


// TAJMER
var h1 = document.getElementsByTagName('h1')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0,
    minutes = 0,
    hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}