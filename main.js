let voiceClick = new Audio("./sound/click.wav");
let voiceWin = new Audio("./sound/win.mp3");
let voiceLose = new Audio("./sound/WRONG.mp3");

//Easy, Medium, Hard bo'lishligi
let answerContentBox =  document.querySelector('.answers-content');

let lvl = {
    easy: 1,
    medium: 2,
    hard: 3
}

let userLvl = lvl.easy; // !important

// 1 - easy 2- medium 3 - hard

let questions = []

//random raqam arraydan bitta element olib berish uchun
function generateRandomQuestion() {
    let randomQuestion =  roadSymbol[Math.floor(Math.random() * roadSymbol.length)];
    return randomQuestion;
}

function generateQuestions() {
 
    
    // console.log(questions[0].id);
    let randomQuestion =  generateRandomQuestion();
    randomQuestion.checked = -1;
    
    randomQuestion.answers = [randomQuestion.symbol_title ,generateRandomQuestion().symbol_title, generateRandomQuestion().symbol_title ,generateRandomQuestion().symbol_title];
    
    // - 1 = bajarmagan, 0 = xato ishlagan, 1 = true; 

    questions.push(randomQuestion); 
}


let wrongAnswer = 0;


function checkAll() {
    console.log(wrongAnswer);
    if(wrongAnswer >= 5){
        resultResult()
    }

    if(questions.length >= 10){
        resultResult();
    }
}

// questions[length].checked = 1; !important :DDDD

function checkAnswer(selectedAnswer) {
    let questionsSize = questions.length;
    console.log(selectedAnswer);
    if(questions[questionsSize - 1].symbol_title == selectedAnswer){
        console.log("true");
        // questions[length].
        questions[questionsSize - 1].checked = 1;
        // console.log(questions[questionsSize - 1].checked);
    } else {
        // console.log("false");Z
        wrongAnswer++;
        checkAll();
        questions[questionsSize - 1].checked = 0;

    }
}

let time;
let timeMin;
let timeSec;
function time_minute() {
    time  = userLvl == 1 ? 8 : userLvl == 2 ? 5 : 3;
    timeMin = time;
    timeSec = 0;
    // console.log(time); 
}




// dom codelar


//bu timerni 0lar bilan to'ldirib beradi
function toldir_zero(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}

function closeLvlContent(){
    document.querySelector('.flex-lvl-box').style.display = 'none';
}

let lvlValue;

document.addEventListener('click', (evt) => {
    // console.log(evt.target.dataset.lvl);
    if(evt.target.id == 'lvl-value'){
        voiceClick.play();
        // console.log("a");
        lvlValue = evt.target.dataset.lvl;
        if(lvlValue == 'easy'){
            userLvl = lvl.easy;
        } else if(lvlValue == 'medium') {
            console.log(lvlValue);
            userLvl = lvl.medium;
        } else  if(lvlValue == 'hard') {
            userLvl = lvl.hard;
            console.log(userLvl);
        }
        
        
        time_minute();
        closeLvlContent();
        timer_start()
        generateQuestions()
        renderAll()
    }
})

function timer_start() {
    let headerTimer = document.querySelector('.time-minute');
    headerTimer.textContent = `${toldir_zero(timeMin, 2)}:${toldir_zero(timeSec, 2)}`;
    setInterval(() => {
        if(timeSec == 0){
            timeSec = 59;
            timeMin--;
        } else{
            timeSec--;
        }
        // console.log(`${timeMin} ${timeSec}`);
        // headerTimer.textContent = `${timeMin}:${timeSec}`;
        headerTimer.textContent = `${toldir_zero(timeMin, 2)}:${toldir_zero(timeSec, 2)}`;

        if(timeMin == 0 && timeSec == 0) {
            resultResult();
        }

    }, 1000)
}

function checkedCounter(){
    let countCheck = 0;
    questions.forEach((item) => {
        if(item.checked == 1){
            countCheck++;
        }
    })
    return countCheck;
}

function headerRender() {
    let header = document.querySelector('header');
    // console.log(header);
    let headerUserLvl = document.querySelector('.user-lvl');

    let questionCounter = document.querySelector('.question-counter');

    questionCounter.textContent = `${questions.length} / 10`;

    headerUserLvl.textContent = `LVL: ${lvlValue}`;
    headerUserLvl.style.textTransform = "upperCase";  
}

function renderSection(){

    let elSection = document.querySelector('section'); 
    let elQuestionTemp = document.querySelector('.question-temp').content;
    let elQuestionFragment = new DocumentFragment();

    console.log(questions);
    tempClone = elQuestionTemp.cloneNode(true);

    elSection.textContent = '';

    let questionsSize = questions.length;

    tempClone.querySelector('.question-img').src = questions[questionsSize-1].symbol_img;
    console.log(questions[questionsSize-1]);
    tempClone.querySelector('.answer-1').textContent = questions[questionsSize-1].answers[0];
    tempClone.querySelector('.answer-2').textContent = questions[questionsSize-1].answers[1];
    tempClone.querySelector('.answer-3').textContent = questions[questionsSize-1].answers[2];

    elQuestionFragment.appendChild(tempClone);
    elSection.appendChild(elQuestionFragment);
}

function renderAll(){
    headerRender();
    // renderAll()
    renderSection();
}

document.addEventListener('click', (evt) => {
    if(evt.target.id == 'answerValue'){
        console.log("answerCLICK" + evt.target.textContent);
        let answer = evt.target.textContent; 
        voiceClick.play()
        checkAll()
        checkAnswer(answer);

        generateQuestions();
        // generateQuestions();
        renderAll();
    }
})

function resultResult() {
    let elResultContent = document.querySelector('.result-list-ul');
    let elResult = document.querySelector('.final-result');

    elResult.style.display = 'flex';
    let elResultTemp = document.querySelector('.final-result-temp').content;
    let elResultFragment = new DocumentFragment();

    elResult.querySelector("#finaly-result-answer-h1").textContent = checkedCounter();

    if(checkedCounter() > 5){
        voiceWin.play();
    } else {
        voiceLose.play();
    }


    // console.log(questions);
    // tempClone.querySelector('#finaly-result-answer-h1').textContent = '5/10';
    // elResultFragment.appendChild(tempClone);
    // elResult.appendChild(elResultFragment);
    
    questions.forEach((item, index) => {
        let tempClone = elResultTemp.cloneNode(true);
        tempClone.querySelector('#question-value').textContent = `${item.symbol_title}`;
        
        console.log(index);
        if(index != questions.length-1) {
            if(item.checked == 1) {
                tempClone.querySelector('#question-check').textContent = '✅';
            } else if(item.checked == 0) {
                tempClone.querySelector('#question-check').textContent = '❌';
            } else if(item.checked == -1) {
                tempClone.querySelector('#question-check').textContent = '🪬';
            }
            tempClone.querySelector('#question-value').textContent = `${item.symbol_title}`;
            elResultFragment.appendChild(tempClone);
        }

    })  
    elResultContent.appendChild(elResultFragment);
}