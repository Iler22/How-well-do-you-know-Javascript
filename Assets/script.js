let question = [
    {
        question: 'Question 1',
        choices: ['A', 'B', 'C', 'D'],
        answer: ''
    },
    {
        question: 'Question 1',
        choices: ['A', 'B', 'C', 'D'],
        answer: ''
    },
    {
        question: 'Question 1',
        choices: ['A', 'B', 'C', 'D'],
        answer: ''
    },
    {
        question: 'Question 1',
        choices: ['A', 'B', 'C', 'D'],
        answer: ''
    },
    {
        question: 'Question 1',
        choices: ['A', 'B', 'C', 'D'],
        answer: ''
    },
    {
        question: 'Question 1',
        choices: ['A', 'B', 'C', 'D'],
        answer: ''
    }
]

let currentQsIndex = 0;

//========================

const startBtnEl = document.getElementById('')
const displayQsEl = document.getElementById('')


 
startBtnEl.addEventListener('click', function startGame(){

    //set attributes to start the game
startBtnEl.setAttribute('class', 'hide')

displayQsEl.removeAttribute('class', 'hide')


//call questions function
getQuestions()


})



function getQuestions(){

    // var curreentQs = question[currentQsIndex]

    displayQsEl.textContent = question[currentQsIndex].question; 

    choiceBtnsAreaEl = document.getElementById('')
    
    choiceBtnsAreaEl.innerHTML = ''


    for( var i = 0; i < question[currentQsIndex].choices.length; i++){

        var ansButton = document.createElement('')
        ansButton.setAttribute('class', '')
        ansButton.textContent = question[currentQsIndex].choices[i];
        ansButton.onclick = checkAnswer

        choiceBtnsAreaEl.appendChild(ansButton)


    }

}

let sconds = 60;
let score = 0;
let incorrect = 0;


function checkAnswer(){

if(this.textContent === question[currentQsIndex].answer){
    alert('correct');
    score +=1

} else {
    alert('incorrect');
    incorrect+= 1

// amend the timer to deduct time

}


currentQsIndex++
if(currentQsIndex === question.length){
    endGame()
} else {
    getQuestions()
}


}



startGame.addEventListener{ ///update

    var timeInt  = setTime(function {

        seconds--
        timerEl.textContent = 'Time ' +   seconds;

        if(seconds === 0){
            timerEl.textContent = 'Time: 0'

            clearInterval(timeInt)

            endGame()
        }

    },1000)

}
