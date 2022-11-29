//getting select from html
const selectCategory = document.getElementById('categories');

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

//getting home ids
const quizhub = document.getElementById('quizhub');
const dropdown = document.getElementById('categories');
const card = document.getElementById('quizhubCard');

//creating questions
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
    quizhub.classList.add('quizhub__display__none');
    dropdown.classList.add('quizhub__display__none');
    card.classList.remove('quizhub__display__none');
    card.classList.add('quizhub__display__block');
    start.classList.add('quizhub__display__none');
})
 
//getting questions and answers id
var question = document.querySelector('#questionsCard');
var answerA = document.querySelector('#answer0');
var answerB = document.querySelector('#answer1');
var answerC = document.querySelector('#answer2');
var answerD = document.querySelector('#answer3');



//getting questions and answers
var questionsApi = [];
var correctAnswersApi = [];
var incorrectAnswersApi = []; 

const save = (result) => { 
    for(let i=0; i<result.results.length; i++) {
        questionsApi.push(result.results[i].question);
        correctAnswersApi.push(result.results[i].correct_answer);
        incorrectAnswersApi.push(result.results[i].incorrect_answers);
    }    
};

//printing first question and answers
const printQuestion = (index) => {
    question.innerHTML = questionsApi[index];
    answerA.innerHTML = correctAnswersApi[index];
    let cont = 1;
    for(let i=0; i<incorrectAnswersApi[index].length; i++) {
        var answer = document.querySelector('#answer'+cont);
        answer.innerHTML = incorrectAnswersApi[index][i];
        cont++;
    }   
}

 //storing user answer
 var userAnswer;
 answerA.addEventListener('click', (event) => {
    document.querySelectorAll('div.quizhub__answers__card').forEach(function (elem) {
        elem.classList.remove('quizhub__border');
        });
    userAnswer = answerA;
    userAnswer.classList.add('quizhub__border');
 });

 answerB.addEventListener('click', (event) => {
    document.querySelectorAll('div.quizhub__answers__card').forEach(function (elem) {
        elem.classList.remove('quizhub__border');
        });
    userAnswer = answerB;
    userAnswer.classList.add('quizhub__border');
 });

 answerC.addEventListener('click', (event) => {
    document.querySelectorAll('div.quizhub__answers__card').forEach(function (elem) {
        elem.classList.remove('quizhub__border');
        });
    userAnswer = answerC;
    userAnswer.classList.add('quizhub__border');
 });

 answerD.addEventListener('click', (event) => {
     document.querySelectorAll('div.quizhub__answers__card').forEach(function (elem) {
    elem.classList.remove('quizhub__border');
    });
    userAnswer = answerD;
    userAnswer.classList.add('quizhub__border');
 });

 //checking answers
const buttonOk = document.querySelector('#btnOk');
buttonOk.addEventListener('click', (event) => {
    if(userAnswer===answerA) {
        answerA.classList.remove('quizhub__background__gray');
        answerA.classList.add('quizhub__background__green');
    } else if (userAnswer===answerB){  
        answerB.classList.remove('quizhub__background__gray');
        answerB.classList.add('quizhub__background__red'); 
        answerA.classList.remove('quizhub__background__gray');
        answerA.classList.add('quizhub__background__green');     
    } else if (userAnswer===answerC){ 
        answerC.classList.remove('quizhub__background__gray');
        answerC.classList.add('quizhub__background__red');
        answerA.classList.remove('quizhub__background__gray'); 
        answerA.classList.add('quizhub__background__green');      
    } else if (userAnswer===answerD){
        answerD.classList.remove('quizhub__background__gray');   
        answerD.classList.add('quizhub__background__red'); 
        answerA.classList.remove('quizhub__background__gray');
        answerA.classList.add('quizhub__background__green');    
    } 
    buttonNext.classList.remove('quizhub__display__none');
    buttonNext.classList.add('quizhub__display__block');
    buttonOk.classList.remove('quizhub__display__block');
    buttonOk.classList.add('quizhub__display__none');
});

//printing questions and answers
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