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
    var db = firebase.database();

    var client = algoliasearch('ALGOLIA_APP_ID', 'ALGOLIA_API_KEY');
    var index1 = client.initIndex('questions_db');
    // var index2 = client.initIndex('tags');
 