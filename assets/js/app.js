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

$("#submitTrain").on('click', function(event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = moment($("#trainTime").val().trim(), "HH:MM").format("X");
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

database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;


    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(trainTime),
        $("<td>").text(frequency),
        $("<td>").text(minutesAway),
    );
    
    $("#addTrain").append(newTrain());
});