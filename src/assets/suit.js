const btnClick = document.getElementsByClassName('button');
const rockUser = document.getElementById('rock-user');
const paperUser = document.getElementById('paper-user');
const scissUser = document.getElementById('sciss-user');
const rockCom = document.getElementById('rock-com');
const paperCom = document.getElementById('paper-com');
const scissCom = document.getElementById('sciss-com');
const resultBox = document.getElementById('vs-box');
const resultText = document.getElementById('result');
const cursorEle = [...document.getElementsByClassName('cursor')];
const reload = document.getElementById('refresh');

class Game {

    comChoice() {
        var choice = ['Rock', 'Paper', 'Scissors'];
        var randomChoice = Math.floor(Math.random() * 3);
        return choice[randomChoice];
    }

    resObj() {
        resultBox.classList.add('resultBox');
        resultText.setAttribute('style', 'font-size:35px; color:white;');
    }

    resDraw() {
        resultBox.classList.add('resultDraw');
        resultText.setAttribute('style', 'font-size:35px; color:white;');
    }

    win() {
        console.log('User Win');
        this.resObj();
        resultText.style.fontFamily = 'Mono';
        resultText.innerText = 'USER WINS';
        resultText.style.textAlign = 'center';
        resultText.style.borderRadius = '10px';
        resultText.style.backgroundColor = 'darkgreen'; 
    }

    draw() {
        console.log('Draw');
        this.resDraw();
        resultText.style.fontFamily = 'Mono';
        resultText.innerText = 'GAME DRAW';
        resultText.style.textAlign = 'center';
        resultText.style.borderRadius = '10px';
        resultText.style.backgroundColor = 'darkgreen';
    }

    lose() {
        console.log('Com Win');
        this.resObj();
        resultText.style.fontFamily = 'Mono';
        resultText.innerText = 'COM WINS';
        resultText.style.textAlign = 'center';
        resultText.style.borderRadius = '10px';
        resultText.style.backgroundColor = 'darkgreen';
    }

}

var gameDetail = new Game();

function gameCompare(userChoice) {

    var comUser = gameDetail.comChoice();
    console.log('User Result => ' + userChoice);
    console.log('Result From => ' + comUser);

    switch (userChoice + comUser) {
        case 'RockScissors':
        case 'ScissorsPaper':
        case 'PaperRock':
            gameDetail.win();
            break;

        case 'RockRock':
        case 'ScissorsScissors':
        case 'PaperPaper':
            gameDetail.draw();
            break;

        case 'ScissorsRock':
        case 'PaperScissors':
        case 'RockPaper':
            gameDetail.lose();
    }
    
    switch (comUser) {
        case 'Rock':
            rockCom.classList.add('choose');
            break;
        case 'Scissors':
            scissCom.classList.add('choose');
            break;
        case 'Paper':
            paperCom.classList.add('choose');
            break;            
    }
}

function play() {
    rockUser.addEventListener('click', function() {
        this.classList.add('choose');
        gameCompare('Rock');
        cursorEle.forEach(cursors => {
            cursors.setAttribute('style', 'cursor: not-allowed;pointer-events: none;')
        })        
    })

    paperUser.addEventListener('click', function() {
        this.classList.add('choose');
        gameCompare('Paper');
        cursorEle.forEach(cursors => {
            cursors.setAttribute('style', 'cursor: not-allowed;pointer-events: none;')
        })
    })

    scissUser.addEventListener('click', function() {
        this.classList.add('choose');
        gameCompare('Scissors');
        cursorEle.forEach(cursors => {
            cursors.setAttribute('style', 'cursor: not-allowed;pointer-events: none;')
        })
    })
}

play();

reload.addEventListener('click', function() {
    window.location.reload();
})