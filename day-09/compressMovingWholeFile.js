const FileReader = require("../io/fileReader");

const fileReader = new FileReader();

function main() {
    const diskMap = fileReader.read(process.argv[2]);

    const blocks = parseBlocks(diskMap);
    const compressed = compress(blocks)


    return compressed.flatMap(({ id, size }) => {
        return new Array(size).fill(null).map(() => id ? id : 0)
    }).map((value, index) => value * index).reduce((acc, value) => acc + value, 0)

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

function compress(entries) {
    let newEntries = entries.map(entry => entry)
    let leftIndex;
    let rightIndex;
    let rightStartOffset = 0;

    while (true) {
        rightIndex = findRightMostFileIndex(newEntries, rightStartOffset)
        leftIndex = findLeftMostSpaceIndex(newEntries, newEntries[rightIndex].size, rightIndex);

        if (rightIndex < 1) {
            break
        }
        if (leftIndex === undefined) {
            rightStartOffset++;
            continue;
        }


        const leftSize = newEntries[leftIndex].size;
        const rightSize = newEntries[rightIndex].size;

        if (leftSize === rightSize) {
            swap(newEntries, leftIndex, rightIndex)
            leftIndex--;

            continue;
        }

        if (leftSize > rightSize) {
            const rightMostFile = newEntries[rightIndex]
            newEntries[rightIndex] = { size: rightSize }
            newEntries[leftIndex] = rightMostFile
            insert(newEntries, leftIndex + 1, { size: leftSize - rightSize })
            continue;
        }
    }

    return newEntries;
}

function insert(array, index, ...items) {
    array.splice(index, 0, ...items)
}

function swap(entries, x, y) {
    const aux = entries[x]
    entries[x] = entries[y];
    entries[y] = aux;
}

function findLeftMostSpaceIndex(entries, size, topIndex) {
    for (let i = 0; i < topIndex; i++) {
        if (entries[i]?.id === undefined && entries[i].size >= size) {
            return i
        }
    }
}

function findRightMostFileIndex(entries, startOffset) {
    for (let i = entries.length - (1 + startOffset); i >= 0; i--) {
        if (entries[i]?.id !== undefined) {
            return i;
        }
    }
}

console.log(main())