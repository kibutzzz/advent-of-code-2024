const FileReader = require('../io/fileReader');

const fileReader = new FileReader();

const VALUE_SEPARATOR = ' ';

function main() {
    const listsPath = process.argv[2];

    const reports = fileReader.readLines(listsPath).map(line => line.split(VALUE_SEPARATOR));

    return reports.filter(isIncreasingOrDecreasing())
        .filter(isIncreasingOrDecreasingByOneTo3())
        .length;
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