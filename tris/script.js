const cells = document.querySelectorAll('.cell');

let turn = 0;

const cellSigns = [];

for(let i = 0; i < cells.length; i++){
    
    const cell = cells[i];

    cell.addEventListener('click', function(){
        console.log(`You clicked ${i}`);
        
        if(cellSigns[i]){
            console.log('This cell has been clicked');
            return;
        }

        turn++;
        let sign;

        if(turn % 2 === 0) {
            sign = 'X'
        }
        else {
            sign = 'O'
        }

        cell.innerText = sign;
        cellSigns[i] = sign;
        console.table(cellSigns);

        let hasWon = checkVictory();

        if(hasWon){
            //Declaring the winner
            showAlert(`${sign} has won!`);
        }
        else if(turn === 9) {
            showAlert('Tie!');
        }
    })
}

//Restart button
restart();

//Defining checkVictory
function checkVictory() {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        if(cellSigns[a] && cellSigns[a] === cellSigns[b] && cellSigns[b] === cellSigns[c]) {
            console.log(`Winning combination:  ${a} ${b} ${c}`);
            return true;
        }
    }

    return false;
}
