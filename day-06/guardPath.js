const FileReader = require("../io/fileReader");
const GuardPathCalculator = require("./GuardPathCalculator");
const fileReader = new FileReader();


function main() {

    const map = fileReader.read(process.argv[2]).split("\n").map(row => row.split(""));

    return (new GuardPathCalculator())
        .calculate(map)
        .flatMap(row => row).filter(cell => cell === "X").length + 1
}

console.log(main())