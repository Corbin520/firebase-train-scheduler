// Initialize Firebase, so that it can communicate to the database
var config = {
  apiKey: "AIzaSyAdM_G2727a9G5CPWGQ8bgKfhMynCsJdTo",
  authDomain: "train-project-homework-71f41.firebaseapp.com",
  databaseURL: "https://train-project-homework-71f41.firebaseio.com",
  projectId: "train-project-homework-71f41",
  storageBucket: "",
  messagingSenderId: "1048882482973"
};

// initialize the config
firebase.initializeApp(config);


// Reference to the database service
var database = firebase.database();



// move up in order when done
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

   // Assumptions
   var tFrequency = 3;

   // Time is 3:30 AM
   var firstTime = "03:30";

   
// firebase listener, if a change has been made, run this function.
// grab data from firebase and put it back down on our page
firebase.database().ref().on("child_added", function (snapshot) {
  var train = snapshot.val().train;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var start = snapshot.val().start;

  // calculations of the arrival etc
  var firstTimeConverted = moment(start, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
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

  
  // always use snapshot.val() so you get what you want returned, Otherwise you will get an object
  // with information that you wont be able to decipher. You can also use .html to print it to the
  // screen

})

// https://www.youtube.com/watch?v=ZWH19t4ujRA (example of pushing up data, and pulling it back down)