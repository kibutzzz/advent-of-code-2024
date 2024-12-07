const { unescape } = require("querystring");
const FileReader = require("../io/fileReader");
const fileReader = new FileReader();

const GUARD_SYMBOLS = ["^", "v", "<", ">"];

 function main() {

    const map = fileReader.read(process.argv[2]).split("\n").map(row => row.split(""));

    let guardPosition = extractGuardPosition(map);
    while (isInsideMap(map, guardPosition)) {
        try{
            moveGuard(map, guardPosition);
        }catch(e){
            break;
        }

        guardPosition = extractGuardPosition(map);
    }
    return map.flatMap(row => row).filter(cell => cell === "X").length + 1
}

function isInsideMap(map, position) {
    let { x, y } = position;
    return x >= 0 && x < map.length && y >= 0 && y < map[0].length;
}

function extractGuardPosition(map) {
    let position = undefined
    map.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (GUARD_SYMBOLS.includes(cell)) {
                position = { x: rowIndex, y: columnIndex }
            }
        })
    })
    return position;
};

function moveGuard(map, guardPosition) {
    let { x, y } = guardPosition;

    let currentDirection = map[x][y];

    if (currentDirection === "^") {
        if (map[x - 1][y] !== "#") {
            map[x][y] = "X";
            map[x - 1][y] = "^";
            return;
        }

        map[x][y] = ">";
        return;
    }

    if (currentDirection === "v") {
        if (map[x + 1][y] !== "#") {
            map[x][y] = "X";
            map[x + 1][y] = "v";
            return;
        }

        map[x][y] = "<";
        return
    }

    if (currentDirection === "<") {
        if (map[x][y - 1] !== "#") {
            map[x][y] = "X";
            map[x][y - 1] = "<";
            return;
        }

        map[x][y] = "^";
        return;
    }

    if (currentDirection === ">") {
        if (map[x][y + 1] !== "#") {
            map[x][y] = "X";
            map[x][y + 1] = ">";
            return;
        }

        map[x][y] = "v";
        return;
    }

}

console.log(main())