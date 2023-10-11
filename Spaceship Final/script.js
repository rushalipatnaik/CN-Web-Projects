let jet = document.getElementById("jet");
let gameCanvas = document.getElementById("gameCanvas");
const startButton = document.getElementById("startButton");
const timerElement = document.getElementById("remainingTime");
const scoreElement = document.getElementById("currentScore");
const highestScoreElement = document.getElementById("highestScore");
const hitSound = document.getElementById("hitSound");
const groundSound = document.getElementById("groundSound");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalHighestScoreValue = document.getElementById("finalHighestScoreValue");
let gameStarted = false;
let currScore = 0;
let highestScore = 0;
let remainingTime = 120;

function letsGame() {
  if (gameStarted) return;

  gameStarted = true;
  startButton.disabled = true;
  timerElement.textContent = remainingTime;
  scoreElement.textContent = currScore;

  let timer = setInterval(() => {
    remainingTime--;
    timerElement.textContent = remainingTime;
    if (remainingTime <= 0) {
      clearInterval(timer);
      gameStarted = false;
      startButton.disabled = false;
      gameOverScreen.style.display="block";
      finalHighestScoreValue.textContent=highestScore;
      resetGame();
    }
  }, 1000);

  window.addEventListener("keydown", (e) => {
    e.preventDefault();
    let left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    if (e.key == "ArrowLeft" && left > 0) {
      jet.style.left = left - 10 + "px";
    } else if (e.key == "ArrowRight" && left <= 700) {
      jet.style.left = left + 10 + "px";
    }

    if (e.key === " ") {
      let bullet = document.createElement("div");
      bullet.classList.add("bullets");
      gameCanvas.appendChild(bullet);

      let movebullet = setInterval(() => {
        let rocks = document.getElementsByClassName("rocks");
        for (let i = 0; i < rocks.length; i++) {
          let rock = rocks[i];
          let rockbound = rock.getBoundingClientRect();
          let bulletbound = bullet.getBoundingClientRect();

          if (
            bulletbound.left <= rockbound.right &&
            bulletbound.right >= rockbound.left &&
            bulletbound.top <= rockbound.bottom &&
            bulletbound.bottom >= rockbound.top
          ) {
            rock.parentElement.removeChild(rock);
            clearInterval(movebullet); // Stop the bullet when it hits a rock
            currScore += 10;
            hitSound.currentTime = 0;
            hitSound.play();
            scoreElement.textContent = currScore;
            if (currScore > highestScore) {
              highestScore = currScore;
              highestScoreElement.textContent = highestScore;
            }
            bullet.parentElement.removeChild(bullet);
          }
        }

        let bulletbottom = parseInt(
          window.getComputedStyle(bullet).getPropertyValue("bottom")
        );
        bullet.style.left = left + "px";
        bullet.style.bottom = bulletbottom + 3 + "px";
      });
    }
  });

  let generaterocks = setInterval(() => {
    let rock = document.createElement("div");
    rock.classList.add("rocks");
    let rockleft = Math.floor(Math.random() * 700);
    rock.style.left = rockleft + "px";
    gameCanvas.appendChild(rock);
  }, 1000);

  let moverocks = setInterval(() => {
    let rocks = document.getElementsByClassName("rocks");
    if (rocks != undefined) {
      for (let i = 0; i < rocks.length; i++) {
        let rock = rocks[i];
        let rocktop = parseInt(
          window.getComputedStyle(rock).getPropertyValue("top")
        );
        rock.style.top = rocktop + 25 + "px";

        if (rocktop >= 495) {
          rock.parentElement.removeChild(rock);
          if (currScore >= 10) {
            currScore -= 10;
            scoreElement.textContent = currScore;
            groundSound.currentTime = 0;
            groundSound.play();
          }
          if(currScore===0){
            clearInterval(timer);
            gameStarted = false;
            startButton.disabled = false;
            gameOverScreen.style.display="block";
            finalHighestScoreValue.textContent=highestScore;
            resetGame();
          }
        }
      }
    }
  }, 450);
}

function resetGame() {
setTimeout(()=>{
  window.location.reload()
}, 3000);

}

document.getElementById("startButton").addEventListener("click", () => {
  letsGame();
});
