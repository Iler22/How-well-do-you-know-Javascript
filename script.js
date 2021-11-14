//Selecting DOM elements.

var quizMain = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finaScoreEl = document.getElementById("finalScore");
var gameOverEl = document.getElementById("gameOver");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var submitBtnEl = document.getElementById("submit");
var startPageEl = document.getElementById("startPage");
var startBtnEl = document.getElementById("start");
var highscoreContainer = document.querySelector("highscoreContainer");
var highscorePage = document.getElementById("highscorePage");
var highscoreInputName = document.getElementById("initials");
var highscreDisplayName = document.getElementById("highscoreInitials");
var endGameBtns = document.getElementById("endGameBtns");
var highscoreDisplayScore = document.getElementById("highScore");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

//Quiz questions.

var quizQuestions = [
    {
        question: 'How can variables be declared',
        choiceA: 'var',
        ChoiceB: 'let', 
        ChoiceC: 'const',
        choiceD: 'all of the above',
        answer: 'c'
    },
    {
        question: 'Which one of the following is a primitive type?',
        choiceA: 'boolean',
        ChoiceB: 'array',
        ChoiceC: 'object',
        choiceD: 'method',
        answer: 'a'
    },
    {
        question: 'What does NaN stand for?',
        choiceA: 'not a name',
        ChoiceB: 'not a number',
        ChoiceC: 'number after name',
        choiceD: 'numeric array number',
        answer: 'b'
    },
    {
        question: 'Which operator is used to assign a variable?',
        choiceA: 'addition',
        ChoiceB: 'multiplication',
        ChoiceC: 'subtraction',
        choiceD: 'none of the above',
        answer: 'd'
    },
    {
        question: 'A string must be within which of the following in order to become a variable?',
        choiceA: 'curly brackets',
        ChoiceB: 'commas',
        ChoiceC: 'quotes',
        choiceD: 'explamation marks',
        answer: 'c'
    }
];

//Answer checking after the showing and hidding of elements right
//In order to run hidding and running functions when start button is clicked a function needs to be called that itself calls generate questions.
// writing code that succesffuly shows and hides code.
//Other variables

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 75;
var timerInterval;
var score = 0;
var correct;

//This function generates the questions and answers.

function generateQuestions() {
    // gameOverEl.setAttribute = "none";
    if(currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.ChoiceB;
    buttonC.innerHTML = currentQuestion.ChoiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

//This function will start the quiz, hide the start button and display the first question.

function startQuiz() {
    gameOverEl.setAttribute('class', 'hide');
    startPageEl.removeAttribute('class', 'hide');
    generateQuestions();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizMain.style.display = "block";
}

//This function shows the score at the end of the quiz

function showScore() {
    quizMain.setAttribute('class', 'hide');
    gameOverEl.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finaScoreEl.innerHTML = "Your final score is " + score;
}

//On the click of the submit button the highscore that will be saved will be stringified to the array of high scores saved in local storage as will the user name.

submitBtnEl.addEventListener("click", function highscore() {

    if(highscoreInputName.value === "") {
        alert("Please insert initials")
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        gameOverEl.setAttribute('class', 'hide');
        highscoreContainer.style.display = "flex";
        highscoreDisplayScore.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

//This function clears the list for the highscores and generates a new highscire from local storage

function generateHighscores() {
    highscreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) ||[];
    for (i = 0; i < highscores.length; i++) {
        var newName = document.createElement("li");
        var newScore = document.createElement("li");
        newName.textContent = highscores[i].name;
        newScore.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newName);
        highscoreDisplayScore.appendChild(newScore);
    }
}

//This function displays the highscore

function showHighscore() {
    highscoreContainer.style.display = "flex";
    highscoreDisplayScore.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores()
}

//This function clears all information contained in the local storage and score board

function clearScore() {
    window.localStorage.clear();
    highscreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

//This function resets all variables and allows users to replay the quiz

function replayQuiz() {
    highscoreContainer.setAttribute('class', 'hide');
    gameOverEl.setAttribute('class', 'hide');
    startPageEl.removeAttribute('class', 'hide');
    timeLeft = 75;
    score = 0;
    currentQuestionIndex = 0;
}

//This function checks the response to each answer

function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if(answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        prompt("correct");
        currentQuestionIndex++;
        generateQuestions();
    } else if(answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        score--;
        timeLeft--;
        prompt("wrong");
        currentQuestionIndex++;
        generateQuestions();
    } else {
        showScore();
    }
}

//This button starts the quiz

startBtnEl.addEventListener("click", startQuiz)
