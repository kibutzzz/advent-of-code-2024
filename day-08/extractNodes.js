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

module.exports = extractNodes;  