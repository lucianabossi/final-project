# QUIZhub
This project is a quiz platform.

### Description
QUIZhub is an application for those who love quiz games.
The platform gives to the user a list of categories to be chosen and sorts ten multiple-choice questions of the selected category. The game can be played as many times as the user wishes (or the open API allows 😅).

### How it works
As soon as the HTML file runs in the browser the API loads all the categories.
The user must select a category and click on the START button to initialize the quiz.
At this point, all the questions from the selected category are stored in an async function.
The first question is displayed with its four multiple-choice answers and a progress bar that shows the current question and the total of questions. This bar and its content are updated as the user moves forward to the next questions.
The button OK starts as disabled and it's turned enabled as the user chooses an answer.
The user's answer receives a blue background color and border. Before clicking on OK the answer can be changed as often as the user wants.
Clicking on the OK button checks if the answer is correct or not by comparing the user's answer with the options for the current question. If correct the background color blue class is removed and a background color green is applied. If incorrect the background color applied is red.
After that, the button OK turns invisible and shows the button NEXT to move to the next question and repeat the process.
After the last question is answered the button FINISH is enabled and by being clicked it shows the score points out of the total and a giphy image according to a range of scores.
Also, it is possible to play again by clicking on the PLAY AGAIN button, which reloads the page. Or the game can be finished by clicking on the EXIT GAME button, which shows a cute giphy image.

### Game rules
- the user must choose a category to play
- the questions cannot be skipped
- all the questions are multiple-choice
- each question is worth 10 points and the maximum score is 100

### Future possible implementations
- the possibility to choose the difficulty of the questions
- the possibility to choose the type of questions (multiple choice, true/false, both)
- hint option to discard one incorrect answer but deduct 5 points from the question in case of a hit

#### Useful links
OPEN TRIVIA API -> https://opentdb.com/api_config.php

CATEORIES FROM TRIVIA API -> https://opentdb.com/api_category.php