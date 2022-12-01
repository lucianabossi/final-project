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
        console.log(err)
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

//initializing questions
var index = 0;
const start = document.getElementById('startQuiz');
start.addEventListener('click', (event) => {
    if(userCategory) {
        let questionsList = getQuestions();
        questionsList.then(result => { 
            save(result);
            printQuestion(index);
            index++;
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
 
//getting question and answers id from html
var question = document.querySelector('#questionsCard');
var answerA = document.querySelector('#answer1');
var answerB = document.querySelector('#answer2');
var answerC = document.querySelector('#answer3');
var answerD = document.querySelector('#answer4');

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

    

    /*const sortedAnswers = answer => answer.sort(()=>Math.random()-0.5);
    console.log('shuffled ');  
    console.log(sortedAnswers);*/
};

//printing first question and answers
const printQuestion = (index) => {
    question.innerHTML = questionsApi[index];
    //creating array with incorrect answers
    incorrect = incorrectAnswersApi[index].slice();
    //creating array with all answers
    correctAnswerConcat = [correctAnswersApi[index]];
    answer = correctAnswerConcat.concat(incorrect);
    let answersOptions = [answerA, answerB, answerC, answerD];
    for(let i=0; i<answer.length; i++) {
        answersOptions[i].innerHTML = answer[i];
    }
}

 //storing user answer
 var userAnswer;
 const answers = document.querySelectorAll('.quizhub__answers__card').forEach(item => {
     item.addEventListener('click', event => {
        document.querySelectorAll('.quizhub__answers__card').forEach(element => {
            element.classList.remove('quizhub__border');
        });
        item.classList.add('quizhub__border');         
        userAnswer = item.innerText;      
     })
 });
 
 //checking answers
 var ind = 0;
const buttonOk = document.querySelector('#btnOk');
buttonOk.addEventListener('click', (event) => {
    console.log('user answer' + userAnswer);
    console.log('correct '+ correctAnswersApi[ind]);
    if(userAnswer === correctAnswersApi[ind]) {
        userAnswer = correctAnswersApi[ind];
        userAnswer.classList.remove('quizhub__background__gray');
        userAnswer.classList.add('quizhub__background__green');
        console.log('entrou')
    };

    console.log('user answer' + userAnswer);
    console.log(userAnswer);
    console.log('incorrect ' + incorrectAnswersApi[ind]);
    if(userAnswer === incorrectAnswersApi[ind])  {
        userAnswer = incorrectAnswersApi[ind];
        userAnswer.classList.remove('quizhub__background__gray');
        userAnswer.classList.add('quizhub__background__red');
        correctAnswersApi[ind].classList.add('quizhub__background__green');
        console.log('entrou na errada')
    };
    
    buttonNext.classList.remove('quizhub__display__none');
    buttonNext.classList.add('quizhub__display__block');
    buttonOk.classList.remove('quizhub__display__block');
    buttonOk.classList.add('quizhub__display__none');
    ind++;
});

//printing next questions and answers
const buttonNext = document.querySelector('#btnNext');
buttonNext.addEventListener('click', (event) => {
    printQuestion(index);        
    index++;
    document.querySelectorAll('div').forEach(function (elem) {
        elem.classList.remove('quizhub__background__red', 'quizhub__background__green', 'quizhub__border');
    });
    document.querySelectorAll('div.quizhub__answers__card').forEach(function (elem) {
        elem.classList.add('quizhub__background__gray');
    });   
    let counter = document.querySelector('#questionNumber');
    let number = parseInt(counter.innerText)+1;
    counter.innerText = number+'/10';    
    buttonNext.classList.remove('quizhub__display__block');
    buttonNext.classList.add('quizhub__display__none');
    buttonOk.classList.remove('quizhub__display__none');
    buttonOk.classList.add('quizhub__display__block');    
});