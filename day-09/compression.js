const FileReader = require("../io/fileReader");

const fileReader = new FileReader();

function main() {
    const diskMap = fileReader.read(process.argv[2]);

    const blocks = parseBlocks(diskMap);
    const entries = formatBlocks(blocks);
    const compressed = compress(entries)


    return compressed.map(({ id }) => {
        return id ? id : " ";
    }).map((value, index) => {
        if (value === " ") {
            return 0;
        }
        return value * index
    }).reduce((acc, value) => value + acc, 0)

}

function parseBlocks(data) {
    return data.split("")
        .map((value, index) => {
            const size = parseInt(value)
            if (index % 2 === 0) {
                return { id: (index / 2), size }
            }
            return { size }
        })
}

function formatBlocks(blocks) {
    return blocks.flatMap(({ size, id }) => {

        if (id !== undefined) {
            return new Array(size).fill(null).map(() => ({ id }))
        }
        return new Array(size).fill(null).map(() => ({}))
    })
}

function compress(entries) {
    const newEntries = entries.map(entry => entry)
    let leftMostSpaceIndex;
    let rightMostFileIndex;
    while (true) {

        leftMostSpaceIndex = findLeftMostSpaceIndex(newEntries);
        rightMostFileIndex = findRightMostFileIndex(newEntries);

        if (leftMostSpaceIndex > rightMostFileIndex) {
            break
        }
        swap(newEntries, leftMostSpaceIndex, rightMostFileIndex)
    }

    return newEntries;
}

function swap(entries, x, y) {
    const aux = entries[x]
    entries[x] = entries[y];
    entries[y] = aux;
}

function findLeftMostSpaceIndex(entries) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i]?.id === undefined) {
            return i
        }
    }
}

function findRightMostFileIndex(entries) {
    for (let i = entries.length - 1; i >= 0; i--) {
        if (entries[i]?.id !== undefined) {
            return i;
        }
    }
}

console.log(main())