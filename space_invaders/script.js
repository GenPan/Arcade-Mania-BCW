const grid = document.querySelector('#grid');
const scoreEl = document.querySelector('#score');

const size = 15;
//rxc ---> row * colums
const rxc = size * size;
const cells = [];
const speed = 400;

const aliens = [
     0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24
];

const aliensKilled = [];
let alienMoveIntVal = null;
let score = 0;
scoreEl.innerText = score;

let step = 1;
let direction = 'forward';

//Building grid cells
for(let i = 0; i < rxc; i++) {
    const cell = document.createElement('div');
    //cell.innerText = i;
    cells.push(cell);
    grid.appendChild(cell);
}

drawAliens();

alienMoveIntVal = setInterval(moveAliens, speed);

//Spaceship
let spaceshipIndex = 217;
cells[spaceshipIndex].classList.add('spaceship');

document.addEventListener('keydown', moveSpaceship);
document.addEventListener('keydown', shoot);

//Restart button
restart();

//-----DECLARING FUNCTIONS-----
function checkForHumanWin() {
    if(aliensKilled.length === aliens.length) {
        showAlert('Human Wins!');
        clearInterval(alienMoveIntVal);
    }
}

function checkForAliensWin() {
    for(let i = 0; i < aliens.length; i++) {
        if(!aliensKilled.includes(aliens[i]) && aliens[i] >= spaceshipIndex) {
            showAlert('Aliens Win!');
            clearInterval(alienMoveIntVal);
        }
    }
}

function drawAliens() {
    for(let i = 0; i < aliens.length; i++) {
        if(!aliensKilled.includes(i)) {
            cells[aliens[i]].classList.add('alien');
        }
    }
}

function removeAliens() {
    for(let i = 0; i < aliens.length; i++) {
        cells[aliens[i]].classList.remove('alien');
    }
}

function moveAliens() {
    const leftEdge = aliens[0] % size === 0;
    const rightEdge = aliens[aliens.length - 1] % size === size - 1;

    removeAliens();

    if(direction === 'forward' && rightEdge) {
        for(let i = 0; i < aliens.length; i++) {
            //Go down a line
            aliens[i] = aliens[i] + size + 1;
            //Change movement direction
            step = -1;
            //Change direction
            direction = 'backward'
        }
    }

    if(direction === 'backward' && leftEdge) {
        for(let i = 0; i < aliens.length; i++) {
            //Go down a line
            aliens[i] = aliens[i] + size - 1;
            //Change movement direction
            step = 1;
            //Change direction
            direction = 'forward'
        }
    }

    for(let i = 0; i < aliens.length; i++) {
        aliens[i] = aliens[i] + step;
    }

    checkForAliensWin();
    drawAliens();
}

function moveSpaceship(event) {
    const leftEdge = spaceshipIndex % size === 0;
    const rightEdge = spaceshipIndex % size === size -1;

    cells[spaceshipIndex].classList.remove('spaceship');

    if(event.code === 'ArrowLeft' && !leftEdge) {
        //Going left
        spaceshipIndex--;
    }
    else if(event.code === 'ArrowRight' && !rightEdge) {
        //Going right
        spaceshipIndex++;
    }

    cells[spaceshipIndex].classList.add('spaceship');
}

//Shooting
function shoot(event) {
    if(event.code !== "Space") return;

    let laserIndex = spaceshipIndex;
    let laserIntVal = null;

    function moveLaser() {
        cells[laserIndex].classList.remove('laser');
        laserIndex = laserIndex - size;

        if(laserIndex < 0) {
            clearInterval(laserIntVal);
            return;
        }

        if(cells[laserIndex].classList.contains('alien')) {
            clearInterval(laserIntVal);
            cells[laserIndex].classList.remove('alien', 'laser');
            cells[laserIndex].classList.add('boom');
            setTimeout(function() {
                cells[laserIndex].classList.remove('boom');
            }, 200);

            const killed = aliens.indexOf(laserIndex);
            aliensKilled.push(killed);

            //Updating score
            score++;
            scoreEl.innerText = score;

            checkForHumanWin();

            return;
        }

        cells[laserIndex].classList.add('laser');
    }

    laserIntVal = setInterval(moveLaser, 200);
}
