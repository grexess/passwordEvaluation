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