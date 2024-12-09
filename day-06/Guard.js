

const DIRECTION_OFFSETS = {
    '^': { x: -1, y: 0, next: '>' },
    '>': { x: 0, y: 1, next: 'v' },
    'v': { x: 1, y: 0, next: '<' },
    '<': { x: 0, y: -1, next: '^' }
}

const OBSTACLES = ['#', 'O'];

class Guard {
    constructor(map) {
        this.position = map.findGuardPosition();
        this.direction = map.get(this.position);
    }

    move(map) {
        const nextPosition = {
            x: this.position.x + DIRECTION_OFFSETS[this.direction].x,
            y: this.position.y + DIRECTION_OFFSETS[this.direction].y
        }

        if(map.isOutOfMap(nextPosition)) {
            return false
        }

        if(map.hasObstacle(nextPosition)) {
            this.direction = DIRECTION_OFFSETS[this.direction].next;
            return true;
        }

        map.set(this.position, 'X');
        map.set(nextPosition, this.direction);
        this.position = nextPosition;
        return true;
    }

    getPosition() {
        return this.position;
    }

    hashCode() {
        return `${this.position.x}-${this.position.y}-${this.direction}`;
    }


}

module.exports = Guard;