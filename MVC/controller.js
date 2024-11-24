import GameModel from './model.js';  // Correct import
import { renderGrid } from './view.js';

const controller = (() => {
    const rows = 8;
    const cols = 8;
    let gameModel;

    function startGame() {
        gameModel = new GameModel(rows, cols);  // Initialize the game model
        gameModel.lastClick = null;
        const grid = gameModel.grid;
        renderGrid(grid, handleCellClick);  // Render the grid
        updateScore();  // Display initial score
    }

    function handleCellClick(row, col) {
        console.log(`Cell clicked at ${row}, ${col}`);
    
        // If lastClick is set and it's the same cell, do nothing (prevent double-clicking)
        if (gameModel.lastClick && gameModel.lastClick.row === row && gameModel.lastClick.col === col) {
            return;
        }
    
        // If there's a lastClick, check if the clicked cell is adjacent
        if (gameModel.lastClick) {
            if (isAdjacentToLastClick(row, col)) {
                // Valid adjacent swap
                gameModel.swapObjects(row, col, gameModel.lastClick.row, gameModel.lastClick.col);
                const matches = gameModel.findMatches();
    
                if (matches.length > 0) {
                    setTimeout(() => {
                        console.log(`Found matches: ${JSON.stringify(matches)}`); // Debugging log
                        
                        let pointsEarned = gameModel.applyMatches(matches);
                        console.log(`Points Earned: ${pointsEarned}`);  // Debugging line

                        gameModel.applyGravity();
                        gameModel.refillBoard();
                        renderGrid(gameModel.grid, handleCellClick);
                        updateScore();  // Update score after applying matches
                    }, 3000);
                } else {
                    // No matches found, swap back
                    gameModel.swapObjects(row, col, gameModel.lastClick.row, gameModel.lastClick.col);
                    renderGrid(gameModel.grid, handleCellClick);
                }
            } else {
                // Invalid move (non-adjacent cells)
                alert("Invalid move! You can only swap adjacent objects.");
            }

            // Reset lastClick if the move was invalid
            gameModel.lastClick = null;
        } else {
            // First click - no previous click, so just set lastClick
            gameModel.lastClick = { row, col };
        }
    }

    function isAdjacentToLastClick(row, col) {
        const lastClick = gameModel.lastClick;
        if (!lastClick) return false;
        // Check if the clicked cell is adjacent (either horizontally or vertically)
        return (
            (Math.abs(lastClick.row - row) === 1 && lastClick.col === col) || 
            (Math.abs(lastClick.col - col) === 1 && lastClick.row === row)
        );
    }

    function updateScore() {
        const score = gameModel.getScore();
        console.log('Updated score:', score);  // Debugging line
        document.getElementById('score').innerText = `Score: ${score}`; // Update score dynamically
    }

    return { startGame };
})();

document.addEventListener('DOMContentLoaded', () => {
    controller.startGame();
});
