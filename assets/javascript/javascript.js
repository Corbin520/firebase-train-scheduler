
var config = {
  apiKey: "AIzaSyAdM_G2727a9G5CPWGQ8bgKfhMynCsJdTo",
  authDomain: "train-project-homework-71f41.firebaseapp.com",
  databaseURL: "https://train-project-homework-71f41.firebaseio.com",
  projectId: "train-project-homework-71f41",
  storageBucket: "",
  messagingSenderId: "1048882482973"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit-button").on("click", function (event) {
  var trainText = $("#train-name").val().trim();
  var destinationText = $("#destination").val().trim();
  var frequencyText = $("#frequency").val().trim();
  var startText = $("#start-date").val().trim();
  
  database.ref().push({
    train: trainText,
    destination: destinationText,
    frequency: frequencyText,
    start: startText,
  });
})

   var tFrequency = 3;

   var firstTime = "03:30";

firebase.database().ref().on("child_added", function (snapshot) {
  var train = snapshot.val().train;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var start = snapshot.val().start;


  var firstTimeConverted = moment(start, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);


  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);


  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var tr = $("<tr>").append(
    $("<td>").text(train),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),

  );

  $("#train-table > tbody").append(tr);

})

