const FileReader = require("../io/fileReader");
const calculateMatrixWithAntinodes = require("./calculateMatrixWithAntinodes");
const groupNodesByFrequency = require("./groupNodesByFrequency");
const extractNodes = require("./extractNodes");

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

function calculateDistanceVector({ x, y }, other) {
    return { x: x - other.x, y: y - other.y };
}

console.log(main())