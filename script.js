//getting select from html
const selectCategory = document.getElementById('categories');

//display select
function displayDropDown() {
    setTimeout(function() {
        selectCategory.style.opacity='1';
    }, 1000);
}
displayDropDown();

//getting category from API
async function getCategory() {
    try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = response.json();
        return data;
    } catch (err) {
        console.log(err);
        alert('Something went wrong...try again in a few seconds');
    }    
}

//displaying categories
async function displayCategories() {
    const options = await getCategory();
    for(let i=0; i<options.trivia_categories.length; i++) {
        const newOption = document.createElement('option');
        newOption.value = options.trivia_categories[i].id;
        newOption.innerText = options.trivia_categories[i].name;
        selectCategory.appendChild(newOption);
    }        
};
displayCategories();

//storing user selected category
var userCategory;
selectCategory.addEventListener('change', (event) => { 
    userCategory = selectCategory.value;
    start.classList.remove('quizhub__display__none');
    start.classList.add('quizhub__display__block');
})

//getting categories from API
async function getQuestions() {
    try {
        const category = `https://opentdb.com/api.php?amount=10&type=multiple&category=${userCategory}`;
        const res = await fetch(category);
        const data = res.json();
        return data;
    } catch (err) {
        console.log(err)
    }            
}   

//getting home elements
const quizhub = document.getElementById('quizhub');
const dropdown = document.getElementById('categories');
const card = document.getElementById('quizhubCard');
const logo = document.getElementById('logo');
const result = document.getElementById('resultCard');

//initializing questions
var indexQuestion = 0;
var correctAnswerElement;
var correctAnswerElementId;
const start = document.getElementById('startQuiz');
start.addEventListener('click', (event) => {
    if(userCategory) {
        let questionsList = getQuestions();
        questionsList.then(result => { 
            save(result);
            printQuestion(indexQuestion);
        });
    } 
    quizhub.classList.remove('quizhub__display__block'); 
    quizhub.classList.add('quizhub__display__none');
    dropdown.classList.remove('quizhub__display__block');
    dropdown.classList.add('quizhub__display__none');
    card.classList.remove('quizhub__display__none');
    card.classList.add('quizhub__display__block');
    start.classList.add('quizhub__display__none');
    start.classList.remove('quizhub__display__block');
    logo.classList.remove('quizhub__display__none');
    logo.classList.add('quizhub__logo');
})
 
//getting questions and answers id from html
var question = document.querySelector('#questionsCard');
var answerA = document.querySelector('#answer0');
var answerB = document.querySelector('#answer1');
var answerC = document.querySelector('#answer2');
var answerD = document.querySelector('#answer3');

//storing questions and answers
var questionsApi = [];
var correctAnswersApi = [];
var incorrectAnswersApi = []; 
var incorrect = [];
var answer = [];

//creating questions
const save = (result) => { 
    for(let i=0; i<result.results.length; i++) {
        questionsApi.push(result.results[i].question);
        correctAnswersApi.push(result.results[i].correct_answer);
        incorrectAnswersApi.push(result.results[i].incorrect_answers);
    };
};

//printing first question and answers
const printQuestion = (indexQuestion) => {
    question.innerHTML = questionsApi[indexQuestion]; 
    //creating array with incorrect answers
    incorrect = incorrectAnswersApi[indexQuestion].slice();
    //creating array with all answers
    correctAnswerConcat = [correctAnswersApi[indexQuestion]];
    answer = correctAnswerConcat.concat(incorrect);
    //shuffle answers
    answer.sort();
    //getting ID and element from correct answer
    const find = (e) => e === correctAnswersApi[indexQuestion];
    let foundAnswerIndex = answer.findIndex(find);
    correctAnswerElementId = 'answer'+foundAnswerIndex;
    correctAnswerElement = document.getElementById(correctAnswerElementId);
    //saving divs answers
    let answersOptions = [answerA, answerB, answerC, answerD];
    for(let i=0; i<answer.length; i++) {
        answersOptions[i].innerHTML = answer[i];
    }   
}

 //storing user answer
 var userAnswer;
 var userAnswerId;
 //getting button ok id
 const buttonOk = document.querySelector('#btnOk');
 const answers = document.querySelectorAll('.quizhub__answers__card').forEach(item => {
     item.addEventListener('click', event => {
        //enabling button ok
        buttonOk.removeAttribute('disabled');
        document.querySelectorAll('.quizhub__answers__card').forEach(element => {
            element.classList.remove('quizhub__border');
            element.classList.remove('quizhub__background__blue');
        });
        item.classList.add('quizhub__border');
        item.classList.add('quizhub__background__blue'); 
        userAnswerId = item.id;  
        userAnswer = item.innerText;      
     })
 });
 
//initializing user score
var userScore = 0;
//checking answers
buttonOk.addEventListener('click', (event) => {
    let userAnswerElement = document.getElementById(userAnswerId);
    //correct answer
    if(userAnswerId === correctAnswerElementId) {
        userAnswer = correctAnswersApi[indexQuestion];
        userAnswerElement.classList.remove('quizhub__background__gray');
        userAnswerElement.classList.remove('quizhub__background__blue');
        userAnswerElement.classList.add('quizhub__background__green');
        userScore = userScore + 10;
    } else {
        //incorrect answer
        userAnswer = incorrectAnswersApi[indexQuestion];
            userAnswerElement.classList.remove('quizhub__background__gray');
            userAnswerElement.classList.remove('quizhub__background__blue');
            userAnswerElement.classList.add('quizhub__background__red');   
            correctAnswerElement.classList.remove('quizhub__background__gray');
            correctAnswerElement.classList.add('quizhub__background__green'); 
    }

    //adding and removing buttons classes
    buttonNext.classList.remove('quizhub__display__none');
    buttonNext.classList.add('quizhub__display__block');
    buttonOk.classList.remove('quizhub__display__block');
    buttonOk.classList.add('quizhub__display__none');    

    //condition to finish the game after the last question
    if(indexQuestion === 9) {
        buttonNext.classList.remove('quizhub__display__block');
        buttonNext.classList.add('quizhub__display__none');
        buttonOk.classList.add('quizhub__display__none');
        buttonOk.classList.remove('quizhub__display__block');
        buttonFinish.classList.remove('quizhub__display__none');
        buttonFinish.classList.add('quizhub__display__block');
    }
});

//printing next questions and answers
//getting next question button id
const buttonNext = document.querySelector('#btnNext');
buttonNext.addEventListener('click', (event) => {            
    indexQuestion++;
    printQuestion(indexQuestion);
    document.querySelectorAll('div').forEach(function (elem) {
        elem.classList.remove('quizhub__background__red', 'quizhub__background__green', 'quizhub__border');
    });
    document.querySelectorAll('div.quizhub__answers__card').forEach(function (elem) {
        elem.classList.add('quizhub__background__gray');
    });

    //progress bar question
    let counter = document.querySelector('.question-bar');
    let progress = (indexQuestion+1)*10;
    const changeProgress = () => {
        counter.setAttribute('style', 'width: '+ progress + '%' )
    };

    changeProgress();

    //question counter
    let currentQuestion = document.querySelector('#questionCounter');
    let number = parseInt(currentQuestion.innerText)+1;
    currentQuestion.innerText = number+'/10';    
    buttonNext.classList.remove('quizhub__display__block');
    buttonNext.classList.add('quizhub__display__none');
    buttonOk.classList.remove('quizhub__display__none');
    buttonOk.classList.add('quizhub__display__block');  
    
    //disabling button ok
    buttonOk.setAttribute('disabled', '');    
});

//finishing game
//score1 -> >= 70 (7 or more correct answers)
//score2 -> >= 50 (5 or more correct answers)
//score3 -> >= 30 (3 or more correct answers)
//score4 -> <30   (less than 3 correct answers)
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const score3 = document.getElementById('score3');
const score4 = document.getElementById('score4');
const scoreGame = document.getElementById('score');

//finishing the game
const buttonFinish = document.querySelector('#btnFinish');
buttonFinish.addEventListener('click', (event) => {
    card.classList.remove('quizhub__display__block');
    card.classList.add('quizhub__display__none');
    result.classList.remove('quizhub__display__none');
    result.classList.add('quizhub__display__block');
    scoreGame.innerText = 'Score game: '+userScore+' out of 100 points';
    if(userScore >= 70) {
        score1.classList.add('quizhub__display__block');
    } else if (userScore >=50) {
        score2.classList.add('quizhub__display__block');
    } else if (userScore >= 30) {
        score3.classList.add('quizhub__display__block');
    } else if (userScore < 30) {
        score4.classList.add('quizhub__display__block');
    }
});

//play again
const playAgain = document.getElementById('btnPlayAgain');
playAgain.addEventListener('click', (event) => {
    location.reload();
});

//exit game
const endGame = document.getElementById('endGame');
const exitGame = document.getElementById('btnExitGame');
exitGame.addEventListener('click', (event) => {
    result.classList.remove('quizhub__display__block');
    result.classList.add('quizhub__display__none');
    endGame.classList.remove('quizhub__display__none');
    endGame.classList.add('quizhub__display__flex');
});
