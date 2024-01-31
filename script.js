/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("game-board");
    const cells = [];
    let currentPlayer = "X";
    const statusDisplay = document.getElementById("status");
    const resetButton = document.getElementById("reset-button");

    // Create cells and add event listeners
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cells.push(cell);
        board.appendChild(cell);

        cell.addEventListener("click", handleCellClick);
    }

    // Handle cell click
    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        if (cell.textContent === "" && !checkWinner()) {
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                statusDisplay.textContent = `${currentPlayer} YOU ARE THE WINNER!`;
            } else if (isBoardFull()) {
                statusDisplay.textContent = "It's a Draw, Try Again!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusDisplay.textContent = `${currentPlayer}'s turn`;
            }
        }
    }

    // Check for a winner
    function checkWinner() {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winCombos) {
            const [a, b, c] = combo;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                return true;
            }
        }
        return false;
    }

    // Check if the board is full
    function isBoardFull() {
        return cells.every(cell => cell.textContent !== "");
    }

    // Reset the game
    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        statusDisplay.textContent = "X's turn";
    }

    resetButton.addEventListener("click", resetGame);
});
