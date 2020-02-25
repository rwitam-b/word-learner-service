$(document).ready(() => {
    // Prompt user for set number
    startingSet = prompt("Please input the set number");
    lastSet = startingSet;

    if (isValidSet(startingSet)) {
        // Load one set of words onto the page
        startingSet = parseInt(startingSet);
        lastSet = parseInt(lastSet);
        fetch("api/words/set/" + startingSet).then(response => response.json()).then(data => {
            words = data;
            if (words.length > 0) {
                let randomWordIndex = Math.floor(Math.random() * 10);
                presentWord = words[randomWordIndex];
                $(".card-header").text("SET " + startingSet);
                setData();
            } else {
                alert(`Set ${startingSet} not in DB yet!`);
                location.reload();
            }
        });
    } else {
        alert(`Set ${startingSet} not in DB yet!`);
        location.reload();
    }
});