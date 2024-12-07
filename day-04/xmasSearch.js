const FileReader = require("../io/filreReader");
const fileReader = new FileReader();

const SEARCH_WORD = "MAS"
const REVERSE_SEARCH_WORD = SEARCH_WORD.split("").reverse().join("")

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

    if (columnIndex + 2 >= matrix.length || rowIndex + 2 >= matrix[0].length) {
        return 0
    }

    let firstDiagonal = matrix[columnIndex][rowIndex] + matrix[columnIndex + 1][rowIndex + 1] + matrix[columnIndex + 2][rowIndex + 2];
    let secondDiagonal = matrix[columnIndex][rowIndex + 2] + matrix[columnIndex + 1][rowIndex + 1] + matrix[columnIndex + 2][rowIndex];

    let foundInBothDiagonals = [firstDiagonal, secondDiagonal]
        .map(text => text === SEARCH_WORD || text === REVERSE_SEARCH_WORD)
        .reduce((result, actual) => result && actual, true)

    return foundInBothDiagonals ? 1 : 0
}

console.log(main())