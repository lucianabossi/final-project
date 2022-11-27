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

var userCategory;
//storing user selected category
selectCategory.addEventListener('change', (event) => { 
    userCategory = selectCategory.value;
})

//getting categories from API
async function getQuestions() {
    try {
        const category = `https://opentdb.com/api.php?amount=10&category=${userCategory}`;
        const res = await fetch(category);
        const data = res.json();
        return data;
    } catch (err) {
        console.log(err)
    }            
}   

//getting questions
const start = document.getElementById('startQuiz');
start.addEventListener('click', (event) => {
    if(userCategory) {
        let questionsList = getQuestions();
        questionsList.then(result => save(result));
    }    
})

//getting questions and answers
const save = (result) => {
    var questionsApi = [];
    var answersApi = [];
    for(let i=0; i<result.results.length; i++) {
        questionsApi.push(result.results[i].question);
        answersApi.push(result.results[i].correct_answer)
        console.log(result);
        console.log('question: ' + questionsApi[i]);
        console.log('correct answer: ' + answersApi[i]);
    }
};



const buttonOk = document.querySelector('btnOk');
const buttonNext = document.querySelector('btnNext');

//printing questions and answers
/*buttonNext.addEventListener('click', (event) => {

});

//checking answers
buttonOk.addEventListener('click', (event) => {

});*/
//printing questions
/*const print = (result) => {
        console.log(result);
        for(let i=0; i<result.results.length; i++) {
            console.log(result.results[i].question)
    }
}*/