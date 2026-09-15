const player = document.getElementById("player");

const fish = document.querySelectorAll(".fish");

const sizeText = document.getElementById("size");
const scoreText = document.getElementById("score");
const foodText = document.getElementById("food");

const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");


let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

let size = 45;
let score = 0;
let food = 0;

let speed = 5;

let keys = {};

let playing = true;


// =========================
// KEYBOARD
// =========================

document.addEventListener("keydown", function(event) {

    keys[event.key.toLowerCase()] = true;

});


document.addEventListener("keyup", function(event) {

    keys[event.key.toLowerCase()] = false;

});


// =========================
// MOVE PLAYER
// =========================

function movePlayer() {

    if (!playing) {
        return;
    }


    if (keys["w"] || keys["arrowup"]) {
        y -= speed;
    }


    if (keys["s"] || keys["arrowdown"]) {
        y += speed;
    }


    if (keys["a"] || keys["arrowleft"]) {
        x -= speed;
    }


    if (keys["d"] || keys["arrowright"]) {
        x += speed;
    }


    // Keep fish inside ocean

    x = Math.max(0, Math.min(x, window.innerWidth - size));

    y = Math.max(70, Math.min(y, window.innerHeight - 100));


    player.style.left = x + "px";
    player.style.top = y + "px";

    player.style.fontSize = size + "px";


    sizeText.textContent = size;
    scoreText.textContent = score;
    foodText.textContent = food;


    checkFish();

}


// =========================
// CHECK FISH
// =========================

function checkFish() {

    fish.forEach(function(enemy) {

        const playerBox =
            player.getBoundingClientRect();

        const enemyBox =
            enemy.getBoundingClientRect();


        const touching =
            playerBox.left < enemyBox.right &&
            playerBox.right > enemyBox.left &&
            playerBox.top < enemyBox.bottom &&
            playerBox.bottom > enemyBox.top;


        if (touching) {

            const enemySize =
                parseInt(
                    getComputedStyle(enemy).fontSize
                );


            // Smaller fish = eat it

            if (size > enemySize) {

                enemy.style.display = "none";

                size += 4;

                score += enemySize;

                food++;

            }


            // Bigger fish = game over

            else if (enemySize > size) {

                endGame();

            }

        }

    });

}


// =========================
// GAME OVER
// =========================

function endGame() {

    playing = false;

    finalScore.textContent = score;

    gameOver.classList.remove("hidden");

}


// =========================
// GAME LOOP
// =========================

function gameLoop() {

    movePlayer();

    requestAnimationFrame(gameLoop);

}


gameLoop();


// =========================
// RESTART
// =========================

function restartGame() {

    location.reload();

}