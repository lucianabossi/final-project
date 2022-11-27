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
        //console.log(result);
        //console.log('question: ' + questionsApi[i]);
        //console.log('correct answer: ' + correctAnswersApi[i]);
        //console.log('incorrect answer: ' + incorrectAnswersApi[i]);
    }    
};

//printing first question and answers
const printQuestion = (index) => {
    question.innerHTML = questionsApi[index];
    answerA.innerHTML = correctAnswersApi[index];
    let cont = 1;
    for(let i=0; i<incorrectAnswersApi[index].length; i++) {
        console.log(incorrectAnswersApi[index]);
        console.log(cont);
        var answer = document.querySelector('#answer'+cont);
        console.log(answer);
        answer.innerHTML = incorrectAnswersApi[index][i];
        cont++;
    }   
}


//printing questions and answers
const buttonNext = document.querySelector('#btnNext');
buttonNext.addEventListener('click', (event) => {
    //console.log(index);
    printQuestion(index);
    
    index++;
});

//checking answers
const buttonOk = document.querySelector('#btnOk');
/*buttonOk.addEventListener('click', (event) => {

});*/
//printing questions
/*const print = (result) => {
        console.log(result);
        for(let i=0; i<result.results.length; i++) {
            console.log(result.results[i].question)
    }
}*/