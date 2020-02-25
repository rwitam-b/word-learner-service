$(document).ready(() => {
    // Prompt user for set number
    startingSet = prompt("Please input the first set number");
    lastSet = prompt("Please input the last set number");

    if (isValidSet(startingSet) && isValidSet(lastSet) && parseInt(startingSet) <= parseInt(lastSet)) {
        // Load one set of words onto the page
        startingSet = parseInt(startingSet);
        lastSet = parseInt(lastSet);
        fetch(`/api/words/set/${startingSet}-${lastSet}`).then(response => response.json()).then(data => {
            words = data;
            if (words.length > 0) {
                presentWord = getRandomWord();
                $(".card-header").text(`SETS ${startingSet} - ${lastSet}`);
                setData();
            } else {
                alert(`Set interval ${startingSet} - ${lastSet} not in DB yet!`);
                location.reload();
            }
        });
    } else {
        alert(`Set interval ${startingSet} - ${lastSet} is not valid!`);
        location.reload();
    }
});