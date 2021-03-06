let startingSet, lastSet;
let words = [];
let presentWord = null;

function getRandomWord() {
    let randomSetIndex = Math.floor(Math.random() * (lastSet - startingSet + 1));
    let randomWordIndex = Math.floor(Math.random() * 10);
    return words[(randomSetIndex * 10) + randomWordIndex];
}

function setData() {
    $(".card-body").fadeOut("fast", () => {
        $(".card-title").text(presentWord.word);
        $(".card-text").text(presentWord.meaning);
        $(".card-text").hide();
        $(".card-body").fadeIn();
    });
}

function isValidSet(setValue) {
    return Number.isInteger(parseInt(setValue));
}

$("#reveal").click(() => {
    if (!$("#reveal").hasClass("disabled")) {
        $(".card-text").show("slow");
        $("#next").toggleClass("disabled");
        $("#reveal").toggleClass("disabled");
    }
});

$("#next").click(() => {
    if (!$("#next").hasClass("disabled")) {
        presentWord = getRandomWord();
        setData();
        $("#next").toggleClass("disabled");
        $("#reveal").toggleClass("disabled");
    }
});