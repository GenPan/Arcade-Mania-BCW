const road = document.querySelectorAll('#grid > div');
const scoreEl = document.querySelector('#score');

for(let i = 0; i < road.length; i++) {
    road[i].innerText = i;
}

//Keeping in a variable the referrals ---
// --- to the element containing the duck
const duckIndex = 1;
const duck = road[duckIndex];
duck.classList.add('duck');

let speed = 200;
let score = 0;

addPlant();

//Defining addPlant function
function addPlant() {
    let currentPlantIndex = road.length - 1;
    road[currentPlantIndex].classList.add('plant');

    const plantIntVal = setInterval(function() {
        score++;
        scoreEl.innerText = score;

        if(score % 50 === 0) {
            speed = speed - 20;
        }

        road[currentPlantIndex].classList.remove('plant');
        currentPlantIndex--;
    
        if(currentPlantIndex < 0) {
            clearInterval(plantIntVal);
            addPlant();
            return;
        }
        
        if(currentPlantIndex === duckIndex && !road[currentPlantIndex].classList.contains('duck-jump')) {
            showAlert('CRASH!');
            clearInterval(plantIntVal);
            road[currentPlantIndex].classList.remove('duck');
            road[currentPlantIndex].classList.add('duck');
            return;
        }

        road[currentPlantIndex].classList.add('plant');
    }, speed);
}

//Defining jump function
function jump(event) {
    if (event.code === 'Space' && !event.repeat) {
        duck.classList.add('duck-jump');
        setTimeout(function() {
            duck.classList.remove('duck-jump');
        }, 300);
    }
}

document.addEventListener('keydown', jump);