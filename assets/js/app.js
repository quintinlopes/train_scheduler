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

    database.ref().push({
        name: trainName,
        destination: destination,
        time: trainTime,
        frequency: frequency
    });

    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function(snapshot) {

    // var trName = snapshot.val().name;
    // var weGoing = snapshot.val().destination;
    var firstTT = snapshot.val().time;
    var trFrequency = snapshot.val().frequency;

    var fttConverted = moment(firstTT, "hh:mm").subtract(1, "years");
    console.log(fttConverted);

    var curTime = moment();
    console.log("CURRENT TIME: " + moment(curTime).format("hh:mm"));

    var diffTime = moment().diff(moment(fttConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % trFrequency;
    console.log(tRemainder);

    var trMinUntilTrain = trFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + trMinUntilTrain);

    var nextTrain = moment().add(trMinUntilTrain, "minutes");
    console.log("ARRIVAL: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>");

        var col1 = $("<td>" + snapshot.val().name + "</td>");
        var col2 = $("<td>" + snapshot.val().destination + "</td>");
        var col3 = $("<td>" + snapshot.val().frequency + "</td>");
        var col4 = $("<td>" + moment(nextTrain).format("hh:mm") + "</td>");
        var col5 = $("<td>" + trMinUntilTrain + "</td>");

        $(col1).appendTo(newRow);
        $(col2).appendTo(newRow);
        $(col3).appendTo(newRow);
        $(col4).appendTo(newRow);
        $(col5).appendTo(newRow);
        // $("<td>").text(trainName),
        // $("<td>").text(destination),
        // $("<td>").text(trainTime),
        // $("<td>").text(frequency),
        // $("<td>").text(minutesAway),
    
    $("#addTrain").append(newRow);
});