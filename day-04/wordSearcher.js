const { off } = require("process");
const FileReader = require("../io/filreReader");
const fileReader = new FileReader();

const SEARCH_TERM = "XMAS"

function main() {

    const inputPath = process.argv[2];
    const letterMatrix = fileReader.readLines(inputPath).map(line => line.split(""))

    let total = 0;
    for (let i = 0; i < letterMatrix.length; i++) {
        for (let j = 0; j < letterMatrix.length; j++) {
            total += countOnIndex(letterMatrix, i, j);
        }
    }

    return total;
}

function countOnIndex(matrix, columnIndex, rowIndex) {

    return [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1]]
        .flatMap(([x,y]) => readMoving(matrix, columnIndex, rowIndex, x, y))
        .map(word => SEARCH_TERM === word)
        .filter(a => a)
        .length
}

function readMatrix(matrix, x, y) {
    return matrix[x][y]
}

function readMoving(matrix, x, y, xDirection, yDirection) {
    const count = SEARCH_TERM.length;
    let result = ""
    for (i = 0; i < count; i++) {
        const searchX = x + i * xDirection;
        const searchY = y + i * yDirection;
        if (!isInsideMatrix(matrix, searchX, searchY)) {
            return result;
        }
        result += readMatrix(matrix, searchX, searchY)
    }
    return result;
}

function isInsideMatrix(matrix, searchX, searchY) {
    const matrixHeight = matrix.length;
    const matrixWidth = matrix[0].length;

    if (searchX < 0 || searchX >= matrixWidth) {
        return false
    }

    if (searchY < 0 || searchY >= matrixHeight) {
        return false
    }

    return true;
}

console.log(main())