import './chart.html';

Template.chart.rendered = function () {
    drawChart();
}

function drawChart() {
    var data = {
        labels: ["2", "3", "4", "5", "6", "7", "8"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    }

    //Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#chart").get(0).getContext("2d");
    //This will get the first returned node in the jQuery collection.
    var myNewChart = new Chart(ctx);

    new Chart(ctx).Line(data);
}
