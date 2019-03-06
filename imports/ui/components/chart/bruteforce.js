import './bruteforce.html';

var calcData;


Template.bruteforce.onCreated(function () {})

Template.bruteforce.helpers({


    permutations() {
        //return getAllPermutations(Session.get("password"));
    }

});

Template.bruteforce.events({
    'mouseup #stopwatch'(event, template) {
        displayCombinations();
    }
});

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
    let specialChars = [" ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];
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

    $("#bfChar").val(possibleChars.length);

    calcData = {};
    calcData.maxPasswordLength = Session.get("password").length;
    calcData.possibleChars = possibleChars;
    calcData.index = 0;
    calcData.startTime = new Date();

    /* calcData.timerOverall = window.setInterval(function () {
        document.getElementById("timer").innerHTML = (new Date() - calcData.startTime);
    }, 1); */

    $("#bfTimeAll").val((new Date() - calcData.startTime) / 1000);

}

/* display all possible password combinations*/

function displayCombinations() {

    if(Session.get("password").length > 5){
        Bert.alert({
            title: 'Achtung!',
            message: 'Passwort zu lang für Brute-Force-Demo',
            type: 'danger',
            style: 'fixed-top',
            icon: 'fas fa-times-circle'
          });
        return;
    }

    $('#timer').html('<img src="http://i246.photobucket.com/albums/gg102/holoverse/ajax-loader.gif" border="0" alt=" photo ajax-loader.gif"/>').css('background', '#fff').css('color', '#000');
    $("[id^=bf]").val("0");
    resetCalcObject();

    let parrentChars = "";

    loopCurrentChar(parrentChars);

    //clearInterval(calcData.timerOverall);

    $("#bfComb").val(calcData.index);
    $("#bfTimeAll").val((new Date() - calcData.startTime) / 1000);
    $('#timer').html("<p>Done...</p>");
}

function loopCurrentChar(parentChars) {

    if (parentChars.length < calcData.maxPasswordLength) {

        for (let i = 0; i < calcData.possibleChars.length; i++) {
            calcData.index++;
            parrentChars = parentChars + calcData.possibleChars[i];

            //console.log((calcData.index) + "|" + parrentChars);
            if (Session.get("password") === parrentChars) {
                $("#bfTry").val(calcData.index);
                $("#bfTime").val((new Date() - calcData.startTime) / 1000);
            }
            //jump to next char
            loopCurrentChar(parrentChars);
        }
    }
}