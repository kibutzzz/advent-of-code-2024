const FileReader = require("../io/fileReader");

const fileReader = new FileReader();

const POSITION_OFFSETS = [[1, 0], [0, 1], [-1, 0], [0, -1]]

function main() {

    const map = fileReader.read(process.argv[2]).split("\n").map(line => line.split("").map(num => parseInt(num)))

    const trailheads = findTrailheads(map)

    const scenarios = trailheads.map(({ x, y }) => findPossibleTrails(map, { x, y }))

    const scores = scenarios.map(toScore())

    const total = scores.reduce((acc, value) => value + acc, 0)

    return total
}

function toScore() {
    return possibilities => {
        const visited = new Set();

        possibilities.forEach(possibility => {
            const last = possibility[possibility.length-1]
            const hash = last.x + "-"+last.y
            visited.add(hash)
        })

        return visited.size
    }
}

function findTrailheads(map) {
    const trailheads = [];

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 0) {
                trailheads.push({ x: i, y: j })
            }
        }
    }

    return trailheads;
}

function findPossibleTrails(map, attemptedPosition, currentPath = []) {
    if (!isInsideMap(map, attemptedPosition)) {
        return []
    }
    if (currentPath.length == 0) {
        return findPossibleTrails(map, attemptedPosition, [attemptedPosition])
    }

    if (map[attemptedPosition.x][attemptedPosition.y] === 9) {
        return [currentPath];
    }

    return makeNextPossiblePositions(map, attemptedPosition)
        .flatMap(position => findPossibleTrails(map, position, [...currentPath, position]))
}

function makeNextPossiblePositions(map, { x, y }) {
    const goal = map[x][y] + 1
    return POSITION_OFFSETS
        .map(([xOffset, yOffset]) => ({ x: x + xOffset, y: y + yOffset }))
        .filter(position => isInsideMap(map, position))
        .filter(position => map[position.x][position.y] === goal);
}

function isInsideMap(map, { x, y }) {
    return map.length > x && 0 <= x && map[x].length > y && 0 <= y
}

// main()
console.log(main())