$(document).ready(function () {
    console.log("hello");
    
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBLXtC4nDv-yxymc0nI2uc3ugTUi4PvUco",
    authDomain: "knowledgeispower-560e2.firebaseapp.com",
    databaseURL: "https://knowledgeispower-560e2.firebaseio.com",
    projectId: "knowledgeispower-560e2",
    storageBucket: "knowledgeispower-560e2.appspot.com",
    messagingSenderId: "349167488894"
  };
  
    firebase.initializeApp(config);

    // Get a reference to the database service
    var dataRef = firebase.database();

    var client = algoliasearch('58946AMDV8', '331c73d68fc3d1064f3f7e1bc34b5348');
    var index1 = client.initIndex('questions_db');
    // var index2 = client.initIndex('tags');

    $("#submitButton").on("click", function (event) {
        console.log()
        
        
            event.preventDefault();
        
            var questionSearch = $("#questionBox").val().trim();
       
            var newEntry = {
              search: questionSearch,
              dataAdded: firebase.database.ServerValue.TIMESTAMP
            }

            console.log(newEntry);
        
            dataRef.ref().push(newEntry);
        
            //Logs everything to console
            console.log(newEntry.search);

            $("#questionBox").val("");

    dataRef.ref().on("child_added", function (childSnapshot) {
    
         console.log(childSnapshot.val());
                
        var questionSearch = childSnapshot.val().search;

        console.log(questionSearch);

        $("#card-question").append(questionSearch);

    });

    });

});