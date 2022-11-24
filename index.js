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
    console.log(userCategory);
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
        let questions = questionsList.then(result => print(result));
    }    
})

const print = (result) => {
        console.log(result);
        for(let i=0; i<result.results.length; i++) {
            console.log(result.results[i].question)
    }
}