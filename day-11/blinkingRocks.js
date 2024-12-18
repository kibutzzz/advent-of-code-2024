const FileReader = require("../io/fileReader");

const fileReader = new FileReader();

function main() {

    const numbers = fileReader.read(process.argv[2]).split(" ").map(number => parseInt(number))

    return blink(numbers, 25).length

}

function blink(numbers, remainingTimes = 0) {
    if(remainingTimes == 0) {
        return numbers
    }

    return blink(numbers.flatMap(blinkNumber), remainingTimes- 1)
}

function blinkNumber(number) {
    if(number == 0) {
        return [1]
    }

    const numberString = number + "";
    const length = numberString.length
    if(length % 2 === 0) {
        return [numberString.slice(0, length/2 ), numberString.slice(length/2)].map(n => parseInt(n))
    }

    return [number * 2024]
}

console.log(main())