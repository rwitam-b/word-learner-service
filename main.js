const ExcelJS = require('exceljs');
const filename = "wordlist.xlsx";
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function loadData() {
    const workbook = new ExcelJS.Workbook();
    return workbook.xlsx.readFile(filename)
        .then(function () {
            let words = [];
            worksheet = workbook.getWorksheet('Sheet1');
            worksheet.eachRow(function (row, rowNumber) {
                let values = row.values;
                words.push({
                    "word": values[1],
                    "meaning": values[2]
                });
            });
            return words;
        });
}

async function main() {
    let words = await loadData();
    app.listen(PORT, () => console.log(`Word Learner Service listening on port ${PORT}!`));
    app.get('/', (req, res) => res.send('Welcome To Word Learner Service!'));

    // Get random words from a particular set
    app.get('/words/set/:setNumber', (req, res) => {
        try {
            let setNumber = parseInt(req.params.setNumber) - 1;
            let wordIndex = getRandomIntInclusive(1, 10);
            if (((setNumber * 10) + wordIndex) < words.length) {
                res.send(words[wordIndex]);
            } else {
                res.send("Sets not present in DB yet!");
            }
        } catch (e) {
            res.send("Error");
        }
    });
}

main();