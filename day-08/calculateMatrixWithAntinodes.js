
function calculateMatrixWithAntinodes(matrix, antinodes) {
    const matrixWithAntinodes = matrix.map(row => row.map(cell => cell));
    antinodes.forEach(({ x, y }) => {
        if(x >= 0 && x < matrixWithAntinodes.length && y >= 0 && y < matrixWithAntinodes[0].length) {
            matrixWithAntinodes[y][x] = "#";
        }
    });
    return matrixWithAntinodes;
}

module.exports = calculateMatrixWithAntinodes;