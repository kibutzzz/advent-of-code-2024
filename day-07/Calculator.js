
class Calculator {

    constructor(possibilityCallback) {
        this.possibilityCallback = possibilityCallback;
    }

    calculate(equations) {

        const validEquations = equations.filter(this.byPossiblyCorrectEquation.bind(this));

        return validEquations.map(({ expectedResult }) => expectedResult).reduce((acc, curr) => acc + curr, 0);
    }

    byPossiblyCorrectEquation({ expectedResult, numbers }) {
        return this.calculatePossibleResults(numbers).some(result => result === expectedResult);
    }

    calculatePossibleResults(numbers, currentResults = []) {
        if (numbers.length === 0) {
            return currentResults;
        }

        if (currentResults.length === 0) {
            return this.calculatePossibleResults(numbers.slice(1), [numbers[0]]);
        }

        return this.calculatePossibleResults(numbers.slice(1), currentResults.flatMap(this.possibilityCallback(numbers)
        ))
    }

}

module.exports = Calculator;

