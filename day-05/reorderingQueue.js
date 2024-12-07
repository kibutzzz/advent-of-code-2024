const FileReader = require("../io/filreReader");
const fileReader = new FileReader();

function main() {
    const inputPath = process.argv[2];

    const input = fileReader.read(inputPath);

    const [rules, pages] = extractRulesAndPages(input);

    const validPagesList = pages.filter(byInvalidUpdate(rules))

    const sortedPagesList = validPagesList.map(validPages => validPages.toSorted(usingRules(rules)))

    const middlePages = sortedPagesList.flatMap(sortedPages => sortedPages[Math.floor(sortedPages.length / 2)]);

    return middlePages.map(number => parseInt(number)).reduce((actual, next) => actual + next, 0);
}

function extractRulesAndPages(input) {
    const [rulesText, pagesText] = input.split("\n\n");

    const rules = rulesText.split("\n").flatMap(line => [line.split("|")]);
    const pages = pagesText.split("\n").map(line => line.split(","));

    return [rules, pages];
}

function byInvalidUpdate(rules) {
    return (pages) => hasAnyViolation(rules, pages);
}

function hasAnyViolation(rules, pages) {
    if (pages.length == 0) {
        return false;
    }

    const relevantRules = rules.filter(rule => rule.every(part => pages.includes(part)));
    const [currentPage, ...rest] = pages;

    if (relevantRules.some(rule => rule[1] == currentPage)) {
        return true;
    }

    return hasAnyViolation(relevantRules, rest);
}

function usingRules(rules) {
    return (a, b) => {
        const abRule = rules.find(rule => rule.every(part => [a, b].includes(part)));

        if(!abRule) {
            return 0;
        }

        if(abRule[0] == a) {
            return -1;
        }

        return 1;
    };
}


console.log(main());