// Fetch the canvas element from the HTML
const canvas = document.getElementById("gameCanvas");
// Get the 2D rendering context for the canvas
const ctx = canvas.getContext("2d");

// Define the gun object and its properties
let gun = {
    x: canvas.width / 2 - 25, // Horizontal position (center of canvas, offset by half of the gun's width)
    y: canvas.height - 100,    // Vertical position (bottom of the canvas)
    width: 50,                // Width of the gun
    height: 80,               // Height of the gun
    dx: 20                    // Change in x-direction for movement
};

// An array to store the bullets
let bullets = [];

// Define the target object and its properties
let target = {
    x: 100,                   // Initial horizontal position
    y: 50,                    // Vertical position
    radius: 20,               // Radius of the target
    dx: 6                     // Change in x-direction for movement
};

// Load the bullet sound effect
let bulletSound = new Audio('bullet.mp3');
let gameOverSound = new Audio('gameover.wav');

// Game variables
let score = 0; // Player's current score
// Fetch high score from local storage or set it to 0 if not available
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let spacePressed = false;    // Track if the spacebar is pressed
let gameState = "notStarted"; // Current game state (notStarted, ongoing, ended)
let consecutiveMisses = 0;   // Track consecutive missed shots

let monsterImg = new Image();
monsterImg.src = "monster.jpg"; // path to your monster image

let bulletImg = new Image();
bulletImg.src = "bullet.png"; // path to your bullet image

let gunImg = new Image();
gunImg.src = "gun.jpeg"; // path to your gun image

// Function to draw the gun on the canvas
function drawGun() {
    ctx.drawImage(gunImg, gun.x, gun.y, gun.width, gun.height);
}

// Function to draw the target on the canvas
function drawTarget() {
    ctx.drawImage(monsterImg, target.x - target.radius, target.y - target.radius, target.radius * 2, target.radius * 2);
}

// Function to draw bullets on the canvas
function drawBullets() {
    bullets.forEach(bullet => {
        ctx.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// Function to move bullets
function moveBullets() {
    bullets.forEach(bullet => {
        bullet.y -= 5; // Move bullets upwards (adjust the speed as needed)
    });
}

// Function to update the target's position
function updateTarget() {
    target.x += target.dx;

    // Check if the target hits the canvas boundaries
    if (target.x + target.radius > canvas.width || target.x - target.radius < 0) {
        target.dx *= -1; // Reverse direction
    }
}

// Function to update the game score
function updateScore() {
    document.getElementById("currentScore").innerHTML = "Score: " + score;
    document.getElementById("highestScore").innerHTML = "High Score: " + highScore;
}

// Function to handle bullet-target collisions
function bulletTargetCollision() {
    bullets.forEach((bullet, bulletIndex) => {
        const distance = Math.sqrt(Math.pow(bullet.x - target.x, 2) + Math.pow(bullet.y - target.y, 2));
        if (distance < target.radius) {
            bullets.splice(bulletIndex, 1); // Remove the bullet
            bulletSound.play(); // Play bullet sound
            score++; // Increase score
            consecutiveMisses = 0; // Reset consecutive misses
            target.x = Math.random() * (canvas.width - 2 * target.radius) + target.radius; // Respawn target
            if (score > 50) {
                target.dx = 12; // Increase target speed after score exceeds 50
            }
        }
    });
}

// Function to handle consecutive misses and game over
function endGame() {
        gameState = "ended";
        canvas.style.backgroundColor = "red"; // Change background to red
        gameOverSound.play(); // Play game over sound
        target.dx = 6; // Reset target speed
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore); // Update high score in local storage
        }
        updateScore();
  score = 0;
  score.textContent = score;
  consecutiveMisses = 0;
  bullets = [];
}

// Function to update the canvas
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    if (gameState === "ongoing") {
        drawGun();
        drawTarget();
        moveBullets(); // Move the bullets
        drawBullets();
        updateTarget();
        bulletTargetCollision();
        updateScore();
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= 5; // Adjust this to control bullet speed
        if (bullets[i].y < 0) {
          consecutiveMisses += 1;
          score -= 1; // Increase the score
          score.textContent = score;
          console.log(consecutiveMisses);
          if (consecutiveMisses >= 3) {
            endGame();
          }
          bullets.splice(i, 1); // Remove bullets that go out of the canvas
        }
      }

    requestAnimationFrame(updateCanvas);
}

// Event listener to control gun movement
document.addEventListener("keydown", (e) => {
    if (gameState === "ongoing") {
        if (e.key === "ArrowLeft" && gun.x > 0) {
            gun.x -= gun.dx; // Move left
        } else if (e.key === "ArrowRight" && gun.x + gun.width < canvas.width) {
            gun.x += gun.dx; // Move right
        }
    }
});

// Event listener to shoot bullets
document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        e.preventDefault(); // Prevent the spacebar from triggering other browser actions
        if (gameState === "ongoing" && !spacePressed) {
            spacePressed = true;
            bullets.push({ x: gun.x + gun.width / 2 - 5, y: gun.y, width: 10, height: 20 });
            bulletSound.play();
        }
    }
});

// Event listener to reset the spacePressed variable when the spacebar is released
document.addEventListener("keyup", (e) => {
    if (e.key === " ") {
        spacePressed = false;
    }
});

// Event listener to start or restart the game
document.getElementById("startGameBtn").addEventListener("click", startGame);
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (gameState === "ended" || gameState === "notStarted")) {
        startGame();
    }
});

// Function to start the game
function startGame() {
    gameState = "ongoing";
    score = 0;
    consecutiveMisses = 0;
    canvas.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; // Reset background
    target.dx = 6; // Reset target speed
    updateScore();
}

// Initial canvas update
updateCanvas();