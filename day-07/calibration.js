const FileReader = require("../io/fileReader");
const Calculator = require("./Calculator");

const fileReader = new FileReader();

function main() {

    const lines = fileReader.readLines(process.argv[2]);
    const equations = lines.map(line => {
        const [expectedResult, numbers] = line.split(": ");
        return {
            expectedResult: parseInt(expectedResult),
            numbers: numbers.split(" ").map(n => parseInt(n))
        }
    });

    return new Calculator((numbers) => {
        return result => {
            return [result + numbers[0], result * numbers[0]];
        };
    }).calculate(equations)

}

console.log(main())