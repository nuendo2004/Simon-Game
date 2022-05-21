

const buttons = document.querySelectorAll(".btn");
const start = document.querySelector('.restart');
let highestscore = 0



let gamestarted = false;

let simonSays;
let combo = [];
let playerCombo = [];
let level = 0;
let playerEntered = 0;
let failed = new Audio("sounds/wrong.mp3")


start.addEventListener('click', () => {
    if (gamestarted == false){
        newGame();
        document.querySelector('body').classList.remove('game-over')
    }
})
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
        pressed(e.target.id, 100)
        let audio = new Audio("sounds/" + e.target.id + ".mp3")
        audio.play() 
        playerCombo.push(e.target.id)
        console.log(playerCombo)
        playerEntered++;
        checkResult(e.target.id, playerEntered)
    })
}


if (gamestarted == false) {
    restart;
}

function restart() {
    combo = [];
    playerCombo = [];
    level = 0;
    playerEntered = 0;
    gamestarted = false;

}


function newGame() {
    level++;
    document.getElementById("level-title").innerHTML = "Level " + level
    playerCombo = [];
    simonSays = button(Math.floor(Math.random() * 4) + 1)
    start.classList.add("restart-grey")
    setTimeout(() =>{pressed(simonSays, 300)
    }, 1000)
    combo.push(simonSays);
    gamestarted = true;
    console.log(combo)
}

function checkResult(id, count) {
    console.log('checkResult'+ count)
    if (id != combo[count-1]) {
        failed.play();
        if (level > highestscore)
            highestscore = level;
            document.getElementById("score").innerHTML = highestscore;
        console.log("faild")
        document.querySelector('body').classList.add('game-over');
        document.getElementById("level-title").innerHTML = "You lost, Press start button to restart";
        restart();
    }
    
    if (isEqual(playerCombo, combo) && combo[combo.length - 1] == (id)) {        
        playerEntered = 0;
        newGame();
        
    }
    if (combo.includes(id) && combo.length > playerCombo.length)
        return;

}


function isEqual(array1, array2) {
    if (JSON.stringify(array1)===JSON.stringify(array2))
        return true;
}

function pressed(id, time) {
    document.getElementById(id).classList.add("pressed")
    setTimeout(() => { 
        document.getElementById(id).classList.remove("pressed")
    }, time);
}

function button(btn) {
    switch (btn) {
        case 1:
            return "green"
        case 2:
            return "red"
        case 3:
            return "yellow"
        case 4:
            return "blue"
        default:
            break;
    }
}