
export function getBaseGrid(rows, cols) {
    const grid = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => ({
            type: null,              
            label: `${r + 1},${c + 1}`
        }))
    );

    // Green on first and last row
    for (let c = 0; c < cols; c++) {
        grid[0][c].type = 'green';
        grid[rows - 1][c].type = 'green';
    }

    // Blue continuous X (excluding edge columns)
   for (let r = 1; r < rows - 1; r++) {
    const width = cols - 2; // columns excluding edges
    // continuous increase across all rows, wrapping horizontally by modulo width
    const c_left = ((r - 1) % width) + 1;

    const c_right = cols - 1 - c_left;

    grid[r][c_left].type = 'blue';
    grid[r][c_right].type = 'blue';
}




    return grid;
}
