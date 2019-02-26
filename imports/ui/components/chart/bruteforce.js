import './bruteforce.html';

var stopWatchRunning = false;
var startTime;
var currentdate;

var calcData;


Template.bruteforce.onCreated(function () {
    registerClock();
})

Template.bruteforce.helpers({
    values() {
        if (Template.instance().isStopWatchRunning) {
            return Template.instance().isStopWatchRunning.get();
        }
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
            displayCombinations();
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
    var showDuration = duration.getHours() - 1 + ":" +
        duration.getMinutes() + ":" +
        duration.getSeconds();
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

function resetCalcObject() {

    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let smallChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let bigChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let specialChars = [" ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+",",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];
    let umlauts = ["ä", "Ä", "ö", "Ö", "ü", "Ü", "ß"];

    let possibleChars = [];

    if ($("#yNumbers").prop('checked')) {
        possibleChars = possibleChars.concat(numbers);
    }
    if ($("#ysmallChar").prop('checked')) {
        possibleChars = possibleChars.concat(smallChars);
    }
    if ($("#ybigChar").prop('checked')) {
        possibleChars = possibleChars.concat(bigChars);
    }
    if ($("#yspecialChar").prop('checked')) {
        possibleChars = possibleChars.concat(specialChars);
    }
    if ($("#ygermanUmlaut").prop('checked')) {
        possibleChars = possibleChars.concat(umlauts);
    }

    $("#xChar").val(possibleChars.length);

    calcData = {};
    calcData.maxPasswordLength = Session.get("password").length;
    calcData.possibleChars = possibleChars;
    calcData.index = 0;

}

/* display all possible password combinations*/

function displayCombinations() {

    resetCalcObject();

    let parrentChars = "";

    loopCurrentChar(parrentChars);
    $("#xComb").val(calcData.index);
}

function loopCurrentChar(parentChars) {

    if (parentChars.length < calcData.maxPasswordLength) {

        for (let i = 0; i < calcData.possibleChars.length; i++) {
            calcData.index++;
            parrentChars = parentChars + calcData.possibleChars[i];
            //console.log((calcData.index) + "|" + parrentChars);
            if (Session.get("password") === parrentChars) {
                $("#xTry").val(calcData.index);
            }
            //jump to next char
            loopCurrentChar(parrentChars);
        }
    }
}