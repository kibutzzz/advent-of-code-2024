const FileReader = require("../io/fileReader");

const fileReader = new FileReader();

const memo = new Map()

function main() {

    const numbers = fileReader.read(process.argv[2]).split(" ").map(number => parseInt(number))

    return blink(numbers, 75)

}

function blink(numbers, remainingTimes = 0) {

    if (remainingTimes == 0) {
        return numbers.length
    }

    return numbers.flatMap(number => {
        const operationHash = `${number}-${remainingTimes-1}`
        if (get(operationHash)) {
            return get(operationHash)
        }
        return set(operationHash, blink(blinkNumber(number), remainingTimes - 1))
    }).reduce((acc, curr) => acc + curr, 0)
}

function blinkNumber(number) {

    if (number == 0) {
        return [1]
    }

    const numberString = number + "";
    const length = numberString.length
    if (length % 2 === 0) {
        return  [numberString.slice(0, length / 2), numberString.slice(length / 2)].map(n => parseInt(n))
    }

    return [number * 2024]
}

function set(number, value) {
    memo.set(number, value)
    return value
}

function get(number) {
    return memo.get(number)
}
console.log(main())