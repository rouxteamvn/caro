'use strict';
/*----- constants -----*/
const winningCombos = [
    [0, 1, 2], // row
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // column
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonal
    [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board;
let turn;
let numTurn;
let win; // go pro
let highlight = [];
let name = prompt("PLEASE, INPUT YOUR FUCKING NAME: ", "FUCKING RIGHT THERE, DAMN YOU!");

/*----- cached element references -----*/
const squares = Array.from(document.querySelectorAll('#board div'));
const message = document.querySelector('h2');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurnMachine);
document.getElementById('reset-button').addEventListener('click', init);

/*----- functions -----*/
function handleTurnPlayer(event) {
    // find the index of square that user clicks.
    let idx = squares.findIndex(square => {
        return square === event.target;
    });

    if (board[idx] == "" && win === null) {
        board[idx] = turn;
        turn = (turn === "X") ? "O" : "X";
    }

    console.log(board); // check board works
    if (win === null) {
        win = getWinner();
    }
    render();
}

function checkBlankForMachine() {
    let randIdx = Math.floor(Math.random() * 9);
    if (numTurn < 5) {
        (board[randIdx] !== "") ? checkBlankForMachine(): board[randIdx] = turn;
    }
}

function handleTurnMachine(event) {
    // find the index of square that user clicks.
    let idx = squares.findIndex(square => {
        return square === event.target;
    });

    if (board[idx] == "" && win === null) {
        board[idx] = turn;
        turn = 'O';
    }
    numTurn++;

    // random machine move
    if (turn === "O") {
        checkBlankForMachine();
        turn = "X";
    }

    if (win === null) {
        win = getWinner();
    }
    render();
}

function init() {
    board = Array(9).fill("");
    win = null;
    turn = "X";
    numTurn = 0;

    /// return color of sign to black 
    highlightColor("black");
    highlight.length = 0;
    render();
}
init();

function render() {
    board.forEach(function(mark, index) {
        squares[index].textContent = mark;
    });

    // get message
    if (win === "T") {
        message.textContent = `That's a tie, nanana!`;
    } else if (win) {
        message.textContent = `${win} win the game!`;
        highlightColor("red");
    } else {
        message.textContent = `it's ${name}'s turn!`;
    }
}

function getWinner() {
    let winner = null;
    winningCombos.forEach(combo => {
        if (board[combo[0]] === "X" &&
            board[combo[0]] === board[combo[1]] &&
            board[combo[0]] === board[combo[2]]) {
            winner = name;
            highlight.push(combo[0], combo[1], combo[2]);
        }
    });
    return winner ? winner : board.includes('') ? null : 'T';

}

function highlightColor(color) {
    highlight.forEach(index => {
        squares[index].style.color = color;
    });
}