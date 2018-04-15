$(document).ready(function () {

    console.log("hello main");
    
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

    // var client = algoliasearch('58946AMDV8', '331c73d68fc3d1064f3f7e1bc34b5348');
    // var index1 = client.initIndex('questions_db');
    // var index2 = client.initIndex('tags');

    const search = instantsearch ({
        appId: '58946AMDV8',
        apiKey: '331c73d68fc3d1064f3f7e1bc34b5348',
        indexName: 'questions.answers_db',
        //You can synchronise the current search with the browser url. It provides two benefits: Working back/next browser buttons & copy and share the current search url
        routing: true
      });
      
    
      // 🎉  Website is now connected to Algolia.
    
    
    //   const search = instantsearch(options);
    
      search.addWidget(
        instantsearch.widgets.hits({
          container: '#hits',
          hitsPerPage: 3, 
          templates: {
            empty: 'No results',
            item: '<em>Hit {{objectID}}</em>: {{{_highlightResult.name.value}}}'
          }
        })
      );
    
      console.log('hits');
    
      // initialize SearchBox
      search.addWidget(
        instantsearch.widgets.searchBox({
          container: '#questionBox',
          placeholder: 'Search by answer or keyword'
        })
      );
    
      console.log('search box');
    
      search.start();

    $("#submitButton").on("click", function (event) {
        console.log('submit')
        
        
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