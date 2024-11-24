class GameModel {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid();
        this.score = 0;
        this.lastClick = null;  // To track the last clicked cell
    }

    // Initialize the grid with random objects (e.g., numbers or characters)
    createGrid() {
        const grid = [];
        const objects = ['🍎', '🍌', '🍒', '🍓', '🍉'];  // Example objects
        for (let row = 0; row < this.rows; row++) {
            const rowArr = [];
            for (let col = 0; col < this.cols; col++) {
                // Randomly select an object from the array
                rowArr.push(objects[Math.floor(Math.random() * objects.length)]);
            }
            grid.push(rowArr);
        }
        return grid;
    }

    // Swap two objects on the grid
    swapObjects(row1, col1, row2, col2) {
        const temp = this.grid[row1][col1];
        this.grid[row1][col1] = this.grid[row2][col2];
        this.grid[row2][col2] = temp;
    }

    // Find matches (three or more objects in a row or column)
    findMatches() {
        const matches = [];
        
        // Check horizontal matches
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols - 2; col++) {
                const object = this.grid[row][col];
                if (object && object === this.grid[row][col + 1] && object === this.grid[row][col + 2]) {
                    matches.push({ row, col });
                }
            }
        }
        
        // Check vertical matches
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows - 2; row++) {
                const object = this.grid[row][col];
                if (object && object === this.grid[row + 1][col] && object === this.grid[row + 2][col]) {
                    matches.push({ row, col });
                }
            }
        }

        return matches;
    }

    // Apply matches and return points earned
    applyMatches(matches) {
        let pointsEarned = 0;

        matches.forEach(match => {
            const { row, col } = match;
            const object = this.grid[row][col];
            
            // Increase score for each match found
            pointsEarned += 10;

            // Clear the matched objects
            this.clearMatch(row, col);
        });

        // Update the score
        this.score += pointsEarned;
        return pointsEarned;
    }

    // Clear matched objects from the grid
    clearMatch(row, col) {
        // Clear the matched objects (set them to null or empty)
        this.grid[row][col] = null;
        this.grid[row][col + 1] = null;
        this.grid[row][col + 2] = null;
    }

    // Apply gravity - objects fall down to fill empty spaces
    applyGravity() {
        for (let col = 0; col < this.cols; col++) {
            let emptySpaces = 0;
            
            for (let row = this.rows - 1; row >= 0; row--) {
                if (this.grid[row][col] === null) {
                    emptySpaces++;
                } else if (emptySpaces > 0) {
                    this.grid[row + emptySpaces][col] = this.grid[row][col];
                    this.grid[row][col] = null;
                }
            }
        }
    }

    // Refill the grid with new objects in empty spaces
    refillBoard() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.grid[row][col] === null) {
                    const objects = ['🍎', '🍌', '🍒', '🍓', '🍉'];  // Example objects
                    this.grid[row][col] = objects[Math.floor(Math.random() * objects.length)];
                }
            }
        }
    }

    // Getter for the current score
    getScore() {
        return this.score;
    }
}

export default GameModel;
