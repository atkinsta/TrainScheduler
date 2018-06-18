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
var currentDate = moment(moment(), "DD/MM/YY");



$("#submit-input").on("click", function () {
    event.preventDefault();
    var name = $("#name-input").val().trim();
    var role = $("#role-input").val().trim();
    var date = $("#date-input").val().trim();
    var rate = parseInt($("#rate-input").val().trim());

    database.ref().push({
        name: name,
        role: role,
        date: date,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (snapshot) {
    var formattedDate = moment(snapshot.val().date, "DD/MM/YY"); 
    var monthsWorked = formattedDate.diff(currentDate, "months");
    var totalPayout = monthsWorked * snapshot.val().rate
    $("#empName").append($("<tr>").text(snapshot.val().name));
    $("#empRole").append($("<tr>").text(snapshot.val().role));
    $("#empDate").append($("<tr>").text(snapshot.val().date));
    $("#empRate").append($("<tr>").text(snapshot.val().rate));
    $("#empBilled").append($("<tr>").text(totalPayout));
    $("#empWorked").append($("<tr>").text(monthsWorked));
});
