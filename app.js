var config = {
    apiKey: "AIzaSyBlhlh7pUii-r8EI0KB27ezk-5YfDqq-XQ",
    authDomain: "codersbay-a7faf.firebaseapp.com",
    databaseURL: "https://codersbay-a7faf.firebaseio.com",
    projectId: "codersbay-a7faf",
    storageBucket: "codersbay-a7faf.appspot.com",
    messagingSenderId: "403764081250"
};

firebase.initializeApp(config);
var database = firebase.database();

$("#submit-input").on("click", function () {
    event.preventDefault();
    var trainname = $("#name-input").val();
    var traindest = $("#dest-input").val();
    var trainfreq = $("#freq-input").val();
    var trainst = $("#time-input").val();

    database.ref().push({
        trainname: trainname,
        traindest: traindest,
        trainfreq: trainfreq,
        trainst: trainst,
    });
});

database.ref().on("child_added", function (snapshot) {
    var currentTime = moment();
    var tFreq = snapshot.val().trainfreq;
    var tStart = snapshot.val().trainst;
    var tStartConverted = moment(tStart, "HH:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(tStartConverted), "minutes");
    var remainder = timeDiff % tFreq;
    var minutesLeft = tFreq - remainder;
    var tNext = moment().add(minutesLeft, "minutes"); 
    var tNextFormated = moment(tNext).format("HH:mm A");

    $("#table-trains > tbody").append("<tr><td>" + snapshot.val().trainname + "</td><td>" + snapshot.val().traindest + "</td><td>" +
    snapshot.val().trainfreq + "</td><td>" + tNextFormated + "</td><td>" + minutesLeft + "</td><td>");
  
});
