const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        const player = {
            x: 100,
            y: 300,
            width: 30,
            height: 50,
            jumping: false,
            velocityY: 0,
            speed: 3
        };

        const gravity = 1;
        const jumpForce = -10;
        const maxJumpTime = 500;
        

        const platforms = [
            { x: 0, y: 350, width: canvas.width, height: 50 },
            { x: 200, y: 280, width: 100, height: 20 },
            { x: 400, y: 200, width: 100, height: 20 },
            { x: 600, y: 150, width: 100, height: 20 },
            { x: 700, y: 100, width: 100, height: 20 }
        ];

        const spikes = [
            { x: 350, y: 320, width: 50, height: 30 },
            { x: 500, y: 170, width: 50, height: 30 }
        ];

        let gameRunning = false;

        document.getElementById("startButton").addEventListener('click', () => {
            gameRunning = true;
            gameLoop();
        });

        let isJumping = false; 

        // Function to check if the player is jumping
        function isPlayerJumping() {
            return player.jumping;
        }
        

        // Updated keyup event listener
        document.addEventListener("keyup", function(event) {
            if (event.code === 'Space') {
                player.jumping = false;
                player.velocityY = 0;
                isJumping = false; 
              }
        });
        function isColliding(objA, objB) {
            return objA.x < objB.x + objB.width &&
                objA.x + objA.width > objB.x &&
                objA.y < objB.y + objB.height &&
                objA.y + objA.height > objB.y;
        }

        function endGame() {
            gameRunning = false;
            alert("Game over!!!!");
            location.reload(); 
        }
        


let hasDoubleJump = false;
let doubleJumpUsed = false;

// Double Jump Power-up
const doubleJumpPowerup = {
    x: 450,
    y: 100,
    width: 30,
    height: 30
};

// Simple patrolling enemy
const enemy = {
    x: 650,
    y: 320,
    width: 30,
    height: 30,
    speed: 2,
    direction: -1
};

const airControlFactor = 0.5;
const maxAirSpeed = 3;

document.addEventListener("keydown", function(event) {
    
        if (event.code === 'Space') {
            if (!player.jumping) {
                jump();
            } else if (hasDoubleJump && !doubleJumpUsed) {
                doubleJump();
            }
        } else if (event.code === 'ArrowRight') {
            moveRight();
        } else if (event.code === 'ArrowLeft') {
            moveLeft();
        }
    }
);

document.addEventListener("keyup", function(event) {
    if (event.code === 'Space') {
        player.jumping = false;
    }
});

function jump() {
    player.jumping = true;
    player.velocityY = jumpForce;
}

function doubleJump() {
    if (!doubleJumpUsed) {
        player.velocityY = jumpForce;
        doubleJumpUsed = true;
    }
}

function moveLeft() {
    let moveSpeed = player.jumping ? maxAirSpeed * airControlFactor : player.speed;
    player.x -= moveSpeed;
}

function moveRight() {
    let moveSpeed = player.jumping ? maxAirSpeed * airControlFactor : player.speed;
    player.x += moveSpeed;
}

    
let score = 0;

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

            
            if (player.jumping && player.y >= 2 * player.height) { 
                player.velocityY = jumpForce; 
            } else {
                player.velocityY += gravity; 
            }
            player.y += player.velocityY;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            player.velocityY += gravity;
            player.y += player.velocityY;

            platforms.forEach((platform)=>{
                if (isColliding(player, platform) && player.velocityY > 0) {
                    player.jumping = false;
                    player.velocityY = 0;
                    player.y = platform.y - player.height;
                }
            });
            
            spikes.forEach((spike)=> {
            if (isColliding(player, spike)) {
            endGame();
        }
     });

            if (player.y > canvas.height) {
                endGame();
            }

            score += 1;

            ctx.fillStyle = "#964B00";
            for (const platform of platforms) {
                ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            }

            ctx.fillStyle = "red";
            for (const spike of spikes) {
                ctx.fillRect(spike.x, spike.y, spike.width, spike.height);
            }

            ctx.fillStyle = "yellow";
            ctx.fillRect(player.x, player.y, player.width, player.height);

    
    if (isColliding(player, doubleJumpPowerup)) {
        hasDoubleJump = true;
        doubleJumpPowerup.x = -100; 
    }

    // Enemy movement
    enemy.x += enemy.speed * enemy.direction;
    if (enemy.x <= 0 ) {
        enemy.direction *= -1; 
    }
    else if(enemy.x + enemy.width >= canvas.width){
        enemy.direction *= -1; 
    }
    

    if (isColliding(player, enemy)) {
        endGame();
    }

    // Draw Double Jump Power-up
    ctx.fillStyle = "green";
    ctx.fillRect(doubleJumpPowerup.x, doubleJumpPowerup.y, doubleJumpPowerup.width, doubleJumpPowerup.height);

    // Draw enemy
    ctx.fillStyle = "black";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    // Score Display
     ctx.fillStyle = "white";
    ctx.font = "25px Open Sans";
    ctx.fillText("Score: " + score, 10, 30);

    requestAnimationFrame(gameLoop);
}
window.isPlayerJumping = isPlayerJumping;
window.score = score;
window.player = player;
window.gameLoop = gameLoop;
window.gameRunning = gameRunning;
window.spikes = spikes;
window.enemy = enemy;


