const fs = require('node:fs');
const { report } = require('node:process');

const VALUE_SEPARATOR = ' ';
const LINE_SEPARATOR = '\n';

function main() {
    const listsPath = process.argv[2];

    const fileData = fs.readFileSync(listsPath, 'utf8')
    const reports = fileData.split(LINE_SEPARATOR).map(line => line.split(VALUE_SEPARATOR)).map(toMutipliedReport());

    return reports.filter(report => {
        return report.possibilities.filter(isIncreasingOrDecreasing())
        .filter(isIncreasingOrDecreasingByOneTo3())
        .length > 0;
    }).length;
   
}

function toMutipliedReport() {
    return report => {
        const possibilities = [];

        report.forEach((element, indexToRemove) => {
            const possibility = [
                ...report.slice(0, indexToRemove),
                ...report.slice(indexToRemove + 1)
              ];
              
            possibilities.push(possibility);
        });
        
        return {original: report, possibilities }
    }
}

function isIncreasingOrDecreasingByOneTo3() {
    return report => {
        for (let i = 0; i < report.length - 1; i++) {
            const difference = Math.abs(report[i] - report[i + 1]);
            if (difference > 3 || difference < 1) {
                return false;
            }
        }
        return true;
    }
}

function isIncreasingOrDecreasing() {
    return report => {
        const increasingReport = report.toSorted((a, b) => a - b);
        const decreasingReport = report.toSorted((a, b) => b - a);

        return areArrayEqual(report, increasingReport) || areArrayEqual(report, decreasingReport);
    }
}

function areArrayEqual(array1, array2) {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
}

console.log(main());