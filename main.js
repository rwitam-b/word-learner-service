const ExcelJS = require('exceljs');
const filename = "wordlist.xlsx";
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

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

    // Bind root path with index.html    
    app.use(express.static('public'));
    app.get('/', (req, res) => res.sendFile('index.html'));

    // Get the entire dataset till set N
    app.get('/api/words/set/:l-:u', (req, res) => {
        try {
            let lowerLimit = parseInt(req.params.l);
            let upperLimit = parseInt(req.params.u);
            lowerLimit = (lowerLimit - 1) * 10;
            upperLimit = (upperLimit * 10) - 1;
            if (lowerLimit >= 0 && lowerLimit < words.length && upperLimit < words.length) {
                res.send(words.slice(lowerLimit, upperLimit + 1));
            } else {
                res.send([]);
            }
        } catch (e) {
            res.send([]);
        }
    });

    // Get a full set
    app.get('/api/words/set/:setNumber', (req, res) => {
        try {
            let setNumber = parseInt(req.params.setNumber);
            let lowerLimit = ((setNumber - 1) * 10);
            let upperLimit = (setNumber * 10) - 1;
            if (lowerLimit >= 0 && lowerLimit < words.length && upperLimit < words.length) {
                res.send(words.slice(lowerLimit, upperLimit + 1));
            } else {
                res.send([]);
            }
        } catch (e) {
            res.send([]);
        }
    });
}

main();