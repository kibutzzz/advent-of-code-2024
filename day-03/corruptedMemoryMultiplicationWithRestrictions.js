const FileReader = require('../io/filreReader');

const fileReader = new FileReader();

const DO = 'do()';
const DONT = 'don\'t()';
const START_OF_STRING = 0;
const DONT_LENGTH = DONT.length;
const DO_LENGTH = DO.length;
const OPERATION_REGEX = /mul\(\d+,\d+\)/g;

function main() {
    const inputPath = process.argv[2];

    const corruptedMemory = fileReader.read(inputPath);
    const calculatableMemory = extractCalculatableMemory(corruptedMemory);

    return calculatableMemory.match(OPERATION_REGEX)
        .map(extractValues())
        .map(([a,b]) => a * b)
        .reduce((a,b) => a + b, 0);
}

function extractCalculatableMemory(memory, iteration = 0) {

    if(iteration > 1000){
        return memory;
    } else {
        iteration++;
    }

    const positionOfFirstDont = memory.indexOf(DONT, START_OF_STRING);
    const positionOfFirstDoAfterDont = memory.indexOf(DO, positionOfFirstDont + DONT_LENGTH);
    
    if(positionOfFirstDont === -1) {
        return memory;
    }

    if(positionOfFirstDoAfterDont === -1) {
        return memory.slice(0, positionOfFirstDont);
    }

    const sliceBeforeDont = memory.slice(0, positionOfFirstDont );
    const sliceAfterDo = memory.slice(positionOfFirstDoAfterDont + DO_LENGTH);

    const newMemory = sliceBeforeDont + sliceAfterDo;
    return extractCalculatableMemory(newMemory, iteration)
}

function extractValues() {
    return operation => operation
    .replace('mul(', '')
    .replace(')', '')
    .split(',');
}

console.log(main());