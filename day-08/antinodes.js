const FileReader = require("../io/fileReader");

const fileReader = new FileReader();

function main() {

    const input = fileReader.read(process.argv[2]);

    const matrix = input.split("\n").map(row => row.split(""));

    const nodes = extractNodes(matrix);

    const groupedNodes = groupNodesByFrequency(nodes);

    const antinodes = calculateAntinodeForGroups(groupedNodes)

    const matrixWithAntinodes = calculateMatrixWithAntinodes(matrix, antinodes);
    
    return matrixWithAntinodes.flat().filter(value => value === "#").length;
}

function calculateMatrixWithAntinodes(matrix, antinodes) {
    const matrixWithAntinodes = matrix.map(row => row.map(cell => cell));
    antinodes.forEach(({ x, y }) => {
        if(x >= 0 && x < matrixWithAntinodes.length && y >= 0 && y < matrixWithAntinodes[0].length) {
            matrixWithAntinodes[y][x] = "#";
        }
    });
    return matrixWithAntinodes;
}

function calculateAntinodeForGroups(groupedNodes) {
    return Object.values(groupedNodes).flatMap(group => calculateAntinodes(group));
}


function calculateAntinodes(groupedNodes, antinodes = []) {
    if (groupedNodes.length === 0) {
        return antinodes;
    }

    const [node, ...rest] = groupedNodes;

    return calculateAntinodes(rest, [...antinodes, ...rest.flatMap(otherNode => {
        const distance = calculateDistanceVector(node, otherNode)
        return calculatePositionOfAntinode(node, otherNode, distance);
    })]);
}

function calculatePositionOfAntinode(node, otherNode, distance) {

    return [
        { x: node.x + distance.x, y: node.y + distance.y },
        { x: otherNode.x - distance.x, y: otherNode.y - distance.y }
    ];
}


function groupNodesByFrequency(nodes) {
    return nodes.reduce((acc, node) => {
        if (!acc[node.frequency]) {
            acc[node.frequency] = [];
        }
        acc[node.frequency].push(node);
        return acc;
    }, {});
}

function extractNodes(matrix) {
    const nodes = [];
    matrix.forEach((row, y) => {
        row.forEach((frequency, x) => {
            if (frequency !== ".") {
                nodes.push({ frequency, x, y });
            }
        });
    });
    return nodes;
}

function calculateDistanceVector({ x, y }, other) {
    return { x: x - other.x, y: y - other.y };
}

console.log(main())