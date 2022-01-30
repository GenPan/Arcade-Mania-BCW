//Initializing score
const scoreDisplay = document.querySelector('#score-display');
let score = 0;
scoreDisplay.innerText = score;

//Initializing timer
const timerDisplay = document.querySelector('#timer-display');
let timeLeft = 30;
timerDisplay.innerText = timeLeft;

//Spawning the bug in a cell
const cells = document.querySelectorAll('.cell');

//Updating timer
const timer = setInterval(countDown, 1000);

let bugSpeed = 800;

const bugMovement = setInterval(randomBug, bugSpeed);

//Hitting the bug
for(let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.addEventListener('click', function() {
        //Does the cell have a bug?
        if(cell.classList.contains('bug')) {
            score++;
            scoreDisplay.innerText = score;

            cell.classList.remove('bug');
            cell.classList.add('splat');

            //Cleaning the splat
            setTimeout(function() {
                cell.classList.remove('splat');
            }, 200);
        }
    });
}

//Restart button
restart();

//randomBug spawns a bug in a random position
function randomBug() {
    //Freeing other cells before spawning a new bug
    removeBug();

    if(score >= 20) {
        bugSpeed = bugSpeed - 100;
    }

    const randNum = Math.floor(Math.random() * cells.length);
    const cell = cells[randNum];
    cell.classList.add('bug');
}

function removeBug() {
    for(let i = 0; i < cells.length; i++) {
        const cellToClean = cells[i];
        cellToClean.classList.remove('bug');
    }
}

function countDown() {
    timeLeft--;
    timerDisplay.innerText = timeLeft;

    if(timeLeft === 0) {
        clearInterval(timer);
        clearInterval(bugMovement);

        showAlert(`GAME OVER!`);
    }
}