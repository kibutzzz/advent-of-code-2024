const fs = require('node:fs');

const LINE_SEPARATOR = '\n';

class FileReader {

    readLines(path) {
        return fs.readFileSync(path, 'utf8').split(LINE_SEPARATOR);
    }
}

module.exports = FileReader;