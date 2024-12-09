
const OBSTACLES = ["#", "O"];
const GUARD_SYMBOLS = ['^', '>', 'v', '<'];

class Map {

    constructor(initialMap) {
        this.map = cloneMatrix(initialMap);
        this.width = this.map.length;
        this.height = this.map[0].length;
    }

    get({ x, y }) {
        return this.map[x][y];
    }

    set({ x, y }, value) {
        this.map[x][y] = value;
    }

    isOutOfMap({ x, y }) {
        return x < 0 || x >= this.width || y < 0 || y >= this.height;
    }

    hasObstacle(position) {
        return OBSTACLES.includes(this.get(position));
    }
 
    findGuardPosition() {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (GUARD_SYMBOLS.includes(this.map[i][j])) {
                    return { x: i, y: j };
                }
            }
        }
    }

    show() {
        console.clear();
        console.table(this.map);
    }
}



function cloneMatrix(matrix) {
    return matrix.map(row => [...row]);
}

module.exports = Map;