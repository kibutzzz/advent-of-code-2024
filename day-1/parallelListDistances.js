const fs = require('node:fs');

const VALUE_SEPARATOR = '   ';

const sortingOrder = (a, b) => a - b;

function main() {
    const listsPath = process.argv[2];

    const fileData = fs.readFileSync(listsPath, 'utf8')
    const firstList = [];
    const secondList = [];
    fileData.split('\n').forEach(addToParallelLists(firstList, secondList));

    const firstSorted = firstList.toSorted(sortingOrder);
    const secondSorted = secondList.toSorted(sortingOrder);
    
    return firstSorted.map(calculateDistance(secondSorted))
        .reduce((a, b) => a + b, 0);

   
}

function addToParallelLists(firstList, secondList) { 
    return line => {
        const [first, second] = line.split(VALUE_SEPARATOR);
        firstList.push(first);
        secondList.push(second);
    }
}

function calculateDistance(secondList) {
    return (first, index) => {
        const second = secondList[index];

        return Math.abs(first - second);
    };
}



console.log(main());