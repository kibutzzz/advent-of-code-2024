function groupNodesByFrequency(nodes) {
    return nodes.reduce((acc, node) => {
        if (!acc[node.frequency]) {
            acc[node.frequency] = [];
        }
        acc[node.frequency].push(node);
        return acc;
    }, {});
}

module.exports = groupNodesByFrequency; 
