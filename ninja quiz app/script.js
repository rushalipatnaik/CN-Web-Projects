let userScore = 0;
let countdownTimer = 60;
let timerInterval;

const scoreDisplay = document.getElementById('score');
const rulesContainer = document.getElementById("start-rules");

document.getElementById('startQuiz').addEventListener('click', initiateQuiz);

document.getElementById('playAgain').addEventListener('click', restartQuiz);

async function initiateQuiz() {
    hideElement(rulesContainer);
    hideElement(document.getElementById('startScreen'));
    showElement(document.getElementById('quizScreen'));
    await fetchQuestionFromAPI();
    startCountdownTimer();
    updateScoreDisplay();
}

function restartQuiz() {
    userScore = 0;
    countdownTimer = 60;
    hideElement(document.getElementById('endScreen'));
    showElement(document.getElementById('quizScreen'));
    fetchQuestionFromAPI();
    startCountdownTimer();
    updateScoreDisplay();
}

async function fetchQuestionFromAPI() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=1');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const quizQuestion = data.results[0];
        displayQuestion(quizQuestion);

    } catch (error) {
        handleFetchError(error);
    }
}

function displayQuestion(question) {
    document.getElementById('question').textContent = question.question;

    const correctIndex = Math.floor(Math.random() * 4);
    const answerButtons = document.querySelectorAll('.answer');

    answerButtons.forEach((button, index) => {
        if (index === correctIndex) {
            button.textContent = question.correct_answer;
            button.onclick = handleCorrectResponse;
        } else {
            button.textContent = question.incorrect_answers.pop();
            button.onclick = handleWrongResponse;
        }
    });
}

function handleCorrectResponse() {
    userScore += 10;
    updateScoreDisplay();
    fetchQuestionFromAPI();
}

function handleWrongResponse() {
    fetchQuestionFromAPI();
}

function updateScoreDisplay() {
    scoreDisplay.textContent = userScore;
}

function startCountdownTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        countdownTimer -= 1;
        document.getElementById('timer').textContent = `Time left: ${countdownTimer} seconds`;
        if (countdownTimer <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    hideElement(document.getElementById('quizScreen'));
    const endMessage = document.getElementById('endMessage');
    const finalScoreDisplay = document.getElementById('finalScore');

    if (userScore <= 20) {
        endMessage.textContent = "Your performance was below average.";
    } else if(userScore > 20 && userScore <= 50) {
        endMessage.textContent = "You performed moderately.";
    } else {
        endMessage.textContent = "You performed excellently in the quiz!";
    }

    showElement(endMessage);
    finalScoreDisplay.textContent = `Your final score: ${userScore}`;
    showElement(document.getElementById('endScreen'));
}

function hideElement(element) {
    element.style.display = "none";
}

function showElement(element) {
    element.style.display = "block";
}

function handleFetchError(error) {
    console.error('Error fetching the question:', error.message);
    document.getElementById('question').textContent = "Error fetching the question. Please try again.";
}
