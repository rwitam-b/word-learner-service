let startingSet, lastSet;
let words = [];
let presentWord = null;

$(document).ready(() => {
    // Prompt user for set number
    startingSet = prompt("Please input the first set number");
    lastSet = prompt("Please input the last set number");

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function setData() {
        $(".card-body").fadeOut("fast", () => {
            $(".card-title").text(presentWord.word);
            $(".card-text").text(presentWord.meaning);
            $(".card-text").hide();
            $(".card-body").fadeIn();
        });
    }

    // Load one set of words onto the page
    fetch(`/api/words/set/${startingSet}-${lastSet}`).then(response => response.json()).then(data => {
        words = data;
        if (words.length > 0) {
            presentWord = words[getRandomIntInclusive(0, 9)];
            $(".card-header").text(`SETS ${startingSet} - ${lastSet}`);
            setData();
        } else {
            alert(`Set interval ${startingSet} - ${lastSet} not in DB yet!`);
            location.reload();
        }
    });

    $("#reveal").click(() => {
        $(".card-text").show("slow");
    });

    $("#next").click(() => {
        presentWord = words[getRandomIntInclusive(0, 9)];
        setData();
    });
});