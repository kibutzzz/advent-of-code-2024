const FileReader = require('../io/filreReader');

const fileReader = new FileReader();

const OPERATION_REGEX = /mul\(\d+,\d+\)/g;

function main() {
    const inputPath = process.argv[2];

    const corruptedMemory = fileReader.read(inputPath);


    return corruptedMemory.match(OPERATION_REGEX)
        .map(extractValues())
        .map(([a,b]) => a * b)
        .reduce((a,b) => a + b, 0);
}

function extractValues() {
    return operation => operation
    .replace('mul(', '')
    .replace(')', '')
    .split(',');
}

console.log(main());