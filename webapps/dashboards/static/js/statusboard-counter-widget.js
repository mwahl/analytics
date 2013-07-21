var value;

$(function() {
    if (document.location.href.indexOf("desktop") !== -1)
        $("#container").css("backgroundColor", "black");
    updateData();
    var dataInterval = setInterval(updateData, 86400);
    var displayInterval = setInterval(updateDisplay, 1500);
});

var updateData = function() {
    var url = $("#value").data("source");
    $.get(url, function(data) {
        value = data.value;
    });
};

var updateDisplay = function() {
    setTimeout(function() {
        var now = new Date();
        var todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        var secsElapsedToday = (now - todayMidnight) / 1000;
        var percentDayComplete = secsElapsedToday / 86400;
        var displayValue = Math.floor(value * percentDayComplete);
        $("#value").text(displayValue);
    }, 1000 * Math.random());
};
