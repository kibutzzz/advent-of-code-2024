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

    const antinodes = calculateAntinodeForGroups(groupedNodes, { width: matrix.length, height: matrix[0].length });

    const matrixWithAntinodes = calculateMatrixWithAntinodes(matrix, antinodes);

    return matrixWithAntinodes.flat().filter(value => value !== ".").length;
}

function calculateAntinodeForGroups(groupedNodes, matrixDimensions) {
    return Object.values(groupedNodes).flatMap(group => calculateAntinodes(group, matrixDimensions));
}


function calculateAntinodes(groupedNodes, matrixDimensions,antinodes = []) {
    if (groupedNodes.length === 0) {
        return antinodes;
    }

    const [node, ...rest] = groupedNodes;

    return calculateAntinodes(rest,matrixDimensions, [...antinodes, ...rest.flatMap(otherNode => {
        const distance = calculateDistanceVector(node, otherNode)
        return calculatePositionOfContinuousAntinodes(node, otherNode, distance, matrixDimensions);
    })]);
}

function calculatePositionOfContinuousAntinodes(node, otherNode, distance, { width, height }) {

    const nodesBefore = [];
    const nodesAfter = [];


    for(let i = 1; ; i ++) {
        const newX = node.x + distance.x * i;
        const newY = node.y + distance.y * i;

        if(newX < 0 || newX >= width || newY < 0 || newY >= height) {
            break;
        }

        nodesAfter.push({ x: newX, y: newY });
    }

    for(let i = 1; ; i ++) {
        const newX = otherNode.x - distance.x * i;
        const newY = otherNode.y - distance.y * i;

        if(newX < 0 || newX >= width || newY < 0 || newY >= height) {
            break;
        }

        nodesBefore.push({ x: newX, y: newY });
    }

    return [...nodesBefore, ...nodesAfter    ];
}

function calculateDistanceVector({ x, y }, other) {
    return { x: x - other.x, y: y - other.y };
}

console.log(main())