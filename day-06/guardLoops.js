const FileReader = require("../io/fileReader");
const GuardPathCalculator = require("./GuardPathCalculator");
const Guard = require("./Guard");
const Map = require("./Map");

const fileReader = new FileReader();
const GUARD_SYMBOLS = ['^', '>', 'v', '<'];

function main() {

    const orignalMapMatrix = fileReader.read(process.argv[2]).split("\n").map(row => row.split(""));

    const originalMap = new Map(orignalMapMatrix);
    const originalPosition = originalMap.findGuardPosition();
    const mapsToVerify = extractPossibleMaps(orignalMapMatrix, originalPosition);

    let progress = 0;
    let loops = 0;
    mapsToVerify.forEach(possibility => {
        const map = new Map(possibility);
        const guard = new Guard(map);

        const visited = new Set();

        while(true) {
                const hash = guard.hashCode();
                if(visited.has(hash)){
                    loops ++
                    break;
                }
                visited.add(hash);
                if(!guard.move(map)) {
                    break
                }
                
        }
        progress++;
        console.log(`Progress: ${progress}/${mapsToVerify.length} (${progress/mapsToVerify.length*100}%)  - Loops: ${loops}`);
        
    });

    return loops;
}


function extractPossibleMaps(originalMap, originalPosition) {
    const mapWithPath = new GuardPathCalculator().calculate(originalMap);
    replaceGuardCharacter(mapWithPath)
    mapWithPath[originalPosition.x][originalPosition.y] = originalMap[originalPosition.x][originalPosition.y];

    return extractAllPossibleMaps(originalMap, mapWithPath);
}

function extractAllPossibleMaps(originalMap, mapWithPath) {
    let possibilities = [];

    for (let i = 0; i < originalMap.length; i++) {
        for (let j = 0; j < originalMap[i].length; j++) {
            let possibility = copyMatrix(originalMap);
            if (mapWithPath[i][j] === "X" && !GUARD_SYMBOLS.includes(possibility[i][j])) {
                possibility[i][j] = "O";
                possibilities.push(possibility);
            }
        }
    }

    return possibilities;
}

function replaceGuardCharacter(mapWithPath) {
    for (let i = 0; i < mapWithPath.length; i++) {
        for (let j = 0; j < mapWithPath[i].length; j++) {
            if (GUARD_SYMBOLS.includes(mapWithPath[i][j])) {
                mapWithPath[i][j] = "X";
            }
        }
    }
}

function copyMatrix(matrix) {
    return matrix.map(row => row.map(cell => cell));
}


console.log(main())