const fs = require('node:fs');

const LINE_SEPARATOR = '\n';

class FileReader {

    readLines(path) {
        return this.read(path).split(LINE_SEPARATOR);
    }

    read(path) {
        return fs.readFileSync(path, 'utf8');
    }
}

module.exports = FileReader;