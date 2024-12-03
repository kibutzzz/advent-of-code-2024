const FileReader = require('../io/filreReader');

const fileReader = new FileReader();

const VALUE_SEPARATOR = '   ';

function main() {
    const listsPath = process.argv[2];

    const firstList = [];
    const secondListMap = new Map();
    fileReader.readLines(listsPath).forEach(addToParallelLists(firstList, secondListMap));

    return firstList.map(calculateSimilarity(secondListMap)).reduce((a, b) => a + b, 0);
}

function calculateSimilarity(secondListMap) {
    return first => {
        const currentValue = secondListMap.get(first);
        if(!currentValue) {
            return 0;
        } else {
            return first * currentValue;
        }
    }
}

function addToParallelLists(firstList, secondListMap) { 
    return line => {
        const [first, second] = line.split(VALUE_SEPARATOR);
        firstList.push(first);
        const currentValue = secondListMap.get(second);
        if(!currentValue) {
            secondListMap.set(second, 1)
        } else {
            secondListMap.set(second, currentValue + 1);
        }
    }
}


console.log(main());