var config = {
    apiKey: "AIzaSyCdCnaio1S5mWGdR9BlEjl8OGi1PO1TTSM",
    authDomain: "train-scheduler-4bc3e.firebaseapp.com",
    databaseURL: "https://train-scheduler-4bc3e.firebaseio.com",
    projectId: "train-scheduler-4bc3e",
    storageBucket: "train-scheduler-4bc3e.appspot.com",
    messagingSenderId: "336775941029"
    };
    firebase.initializeApp(config);

var database = firebase.database();

$("#submitTrain").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        time: trainTime,
        frequency: frequency,
    };

    database.ref().push(newTrain);

    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function(snapshot) {

    var trName = snapshot.val().name;
    var weGoing = snapshot.val().destination;
    var firstTT = snapshot.val().time;
    var trFrequency = snapshot.val().frequency;

    var fttConverted = moment(firstTT, "hh:mm").subtract(1, "years");

    var curTime = moment();

    var diffTime = moment().diff(moment(fttConverted), "minutes");

    var tRemainder = diffTime % trFrequency;

    var trMinUntilTrain = trFrequency - tRemainder;

    var nextTrain = moment().add(trMinUntilTrain, "minutes");

    var newRow = $("<tr>");

        var col1 = $("<td>" + snapshot.val().name + "</td>");
        var col2 = $("<td>" + snapshot.val().destination + "</td>");
        var col3 = $("<td>" + snapshot.val().time + "</td>");
        var col4 = $("<td>" + moment(nextTrain).format("hh:mm") + "</td>");
        var col5 = $("<td>" + trMinUntilTrain + "</td>");

        $(col1).appendTo(row);
        $(col2).appendTo(row);
        $(col3).appendTo(row);
        $(col4).appendTo(row);
        $(col5).appendTo(row);
        // $("<td>").text(trainName),
        // $("<td>").text(destination),
        // $("<td>").text(trainTime),
        // $("<td>").text(frequency),
        // $("<td>").text(minutesAway),
    
    $("#addTrain").append(row);
});