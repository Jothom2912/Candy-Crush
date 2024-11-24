export function renderGrid(grid, onClick) {
    const gameBoard = document.getElementById('game-board');

    if (!gameBoard) {
        console.error("Game board element not found!");
        return;
    }

    // Clear the game board before rendering new cells
    gameBoard.innerHTML = '';  // This prevents appending multiple cells on re-render.

    grid.forEach((row, r) => {
        row.forEach((object, c) => {
            // Reference the existing cell, or create a new one if it doesn't exist
            let cell = gameBoard.children[r * grid[0].length + c];

            if (!cell) {
                cell = document.createElement('div');
                cell.className = 'cell';
                gameBoard.appendChild(cell);
            }

            // Find the object inside the cell, or create one if it doesn't exist
            let objectDiv = cell.querySelector('.object');
            if (!objectDiv) {
                objectDiv = document.createElement('div');
                objectDiv.className = 'object';
                cell.appendChild(objectDiv);
            }

            // Update the object inside the cell if it has changed (avoids unnecessary re-renders)
            if (objectDiv.textContent !== object) {
                objectDiv.textContent = object;
            }

            // Add click event listener if it hasn't been added yet
            if (!cell.hasAttribute('data-clicked')) {
                cell.addEventListener('click', () => onClick(r, c));
                cell.setAttribute('data-clicked', 'true');
            }
        });
    });
}
