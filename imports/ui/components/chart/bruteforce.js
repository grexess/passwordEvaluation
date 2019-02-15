import './bruteforce.html';

var stopWatchRunning = false;
var startTime;
var currentdate;

Template.bruteforce.onCreated(function () {
    registerClock();
})

Template.bruteforce.helpers({
    values() {
        return Template.instance().isStopWatchRunning.get();
    },

    permutations() {
        //return getAllPermutations(Session.get("password"));
    }

});

Template.bruteforce.events({

    'click #stopwatch'(event, template) {

        if (stopWatchRunning == false) {
            startTime = new Date();
            stopWatchRunning = true;
        } else {
            stopWatchRunning = false;
        }
    }
});


function setTime() {
    currentdate = new Date();
}

function registerClock() {
    setInterval(updateClock, 250);
}

function updateClock() {
    setTime();
    setStopWatch();
}

function setStopWatch() {
    if (stopWatchRunning == false) {
        return;
    }
    var duration = new Date(currentdate - startTime);
    var showDuration = duration.getHours() - 1 + ":"
        + duration.getMinutes() + ":"
        + duration.getSeconds();
    $("#timer").text(showDuration);
}


function getAllPermutations(string) {
    var results = [];

    if (string.length === 1) {
        results.push(string);
        return results;
    }

    for (var i = 0; i < string.length; i++) {
        var firstChar = string[i];
        var charsLeft = string.substring(0, i) + string.substring(i + 1);
        var innerPermutations = getAllPermutations(charsLeft);
        for (var j = 0; j < innerPermutations.length; j++) {
            alert(firstChar + innerPermutations[j]);
            results.push(firstChar + innerPermutations[j]);
        }
    }
    return results;
}

function getCombinationCount() {


}

/* display all possible password combinations*/

function displayCombinations() {

    let possibleChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a"];

    let length = possibleChars.length;
    var maxPasswordLength = 2;
    var index = 0;

    let parrentChars = "";

    loopCurrentChar(parrentChars);

    $("div").text(index);

}

function loopCurrentChar(parentChars) {

    if (parentChars.length < maxPasswordLength) {

        for (let i = 0; i < length; i++) {
            index++;
            parrentChars = parentChars + possibleChars[i];
            //console.log((index++) + "|" + parrentChars);
            //jump to next char
            loopCurrentChar(parrentChars);
        }
    }
}