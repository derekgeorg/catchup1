// Bringing in my realtime database credentials to link to the page
var config = {
    apiKey: "AIzaSyCHsRpyLVhpJZyOpZ14DssEVo60alkM8po",
    authDomain: "ulisesproject-9cbd7.firebaseapp.com",
    databaseURL: "https://ulisesproject-9cbd7.firebaseio.com",
    projectId: "ulisesproject-9cbd7",
    storageBucket: "ulisesproject-9cbd7.appspot.com",
    messagingSenderId: "292343109983"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var nDerekX = 30.28715;
var nDerekY = -97.72910;

var nNicoX = 30.28715;
var nNicoY = -97.72910;

var nKenX = 30.28715;
var nKenY = -97.72910;

var nUlisesX = 30.28715;
var nUlisesY = -97.72910;

var nJamesX = 30.28715;
var nJamesY = -97.72910;

var arrMarkers = [];
var myCatchUp = [];
myCatchUp.push( { myLabel: "Derek", myName: "Go Horns!!", x: nDerekX, y: nDerekY } );
myCatchUp.push( { myLabel: "Nico", myName: "Happy Thursday", x: nNicoX, y: nNicoY } );
myCatchUp.push( { myLabel: "Ken", myName: "What time are we supposed to be back in class?", x: nKenX, y: nKenY } );
myCatchUp.push( { myLabel: "Ulises", myName: "Anyone wanna have lunch?", x: nUlisesX, y: nUlisesY } );
myCatchUp.push( { myLabel: "James", myName: "Which way to the co-op?", x: nJamesX, y: nJamesY } );


    var myMap;
    var thompsonConference = { lat: 30.28715, lng: -97.72910 };

    
    function initMap() {

        // For now let's just create the map HERE..
        myMap = new google.maps.Map( document.getElementById( 'map' ), {
          // Center the map on our own location.  Well..  Class location..
          center: thompsonConference,
          zoom: 17
        });
      
        // Go ahead and update our map first set of data.
        updateMap();
    }

    function updateMap() {
        for ( var nIndex = 0; nIndex < myCatchUp.length; nIndex++ ) {
          var markerPos = { lat: myCatchUp[ nIndex ].x, lng: myCatchUp[ nIndex ].y };
          myCatchUp[ nIndex ].myMarker = new google.maps.Marker({ title: myCatchUp[ nIndex ].myName, label:myCatchUp[ nIndex ].myLabel, position: markerPos, map: myMap });
        }
    }
      
    initMap();    

$( document ).ready(function() {
    // Creates a subdirectory 'groups' in root of database 
    var groupsHolderRef = database.ref("/groups");
    var positionRef;
    var latitude;
    var longitude;
    var localData = {};

    // When clicking the check in button...
    $("#checkIn").on("click", function(e){
        // Stop the page from reloading
        e.preventDefault();
        
        // Take the values from the name field and the group field and assign them to name and group respectively
        let name = $("#name").val();
        let group = $("#group").val();
        console.log(name);
        console.log(group);
        // Clear out the text field after the input has been gathered
        $("input.name").val("");
        $("input.group").val("");

                
        if (group in localData){
            alert("Please pick a different group name. Someone nabbed this one ;]")
        }

        else {
            // proceed
            if (name in group){
                alert("Shucks. There's already a " + name + " in this group. Pick a different name please")
            }
            else{
                // proceed


                // Browser geolocation API asks for permission to get location data.
                // Once accepted, the latitude and longitude can be obtained in the Decimal Degrees unit
                navigator.geolocation.getCurrentPosition(function(position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
            
                if ("geolocation" in navigator){
                    // If the user accepted location services, write their name, group, and position in the database.
                    // Since 'push' is being used, firebase creates a unique ID based on time and entropy that is the parent of the data
                    // In addition to writing data, positionRef's value is equal to the unique ID generated so that it can be referenced later
                    positionRef = database.ref("/groups").push({groupID: group, name: name, x: longitude, y: latitude}).key;
                    console.log(positionRef);
        
                }
                else {
                    // No navigation ability will notify the user
                    console.log("no navigation ability")
                    // window.location.replace = "geo.html"
            }
        });

            }
        }

    
    });

<<<<<<< Updated upstream
        //**here if positionRef is not set initially (i.e. the page is reloaded and no check in has been made) will not update**
        //**we need authentication and uniqueness**
        // Similar to the check in function, data is taken and stored in the database.
        // Unlike check in, update uses the positionRef to set the data (overwriting and rewriting all of the data) without creating an 
        // addtional and superfluous unique random ID from database
        database.ref("/groups/" + positionRef).set({groupID: group, name: name, x: longitude, y: latitude})

            // Experimenting with trying to get the data in the positionRef in a parseable object form upon a value delta
        database.ref("/groups/" + positionRef).once("value")
            .then(function(snapshot) {
                console.log(snapshot.val());
            });

        if (name in database.ref("/groups/" + positionRef) ){
            console.log("yea it's here alright");
        }
        else {
            console.log("nope");
            console.log(name);
            console.log(group);
        }
        
        });

});


})
=======
          
    $("#update").on( "click", function() {
        // Generate data to move the Markers
        var nOffsetLat;
        var nOffsetLon;
      
        for ( var nIndex = 0; nIndex < myCatchUp.length; nIndex++ ) {
      
          nOffsetLat = ( Math.floor( Math.random() * 10 ) - 5) / 10000;
          nOffsetLon = ( Math.floor( Math.random() * 10 ) - 5) / 10000;
          myCatchUp[ nIndex ].x += nOffsetLat;
          myCatchUp[ nIndex ].y += nOffsetLon;
      
          var newMarkerPos = { lat: myCatchUp[ nIndex ].x, lng: myCatchUp[ nIndex ].y };
          myCatchUp[ nIndex ].myMarker.setPosition( newMarkerPos );
        }
    });

    // // When the update button is clicked...
    // $("#update").on("click", function(e){
    //     // Stop the page from reloading
    //     e.preventDefault();

    //     // Take the values from the name field and the group field and assign them to name and group respectively
    //     let name = $("#name").val();
    //     let group = $("#group").val();

    //     // Clear out the text field after the input has been gathered
    //     $("input.name").val("");
    //     $("input.group").val("");

    //     // Obtain current coordinates to replace old coordinates in the database
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         latitude = position.coords.latitude;
    //         longitude = position.coords.longitude;
        

    //     //**here if positionRef is not set initially (i.e. the page is reloaded and no check in has been made) will not update**
    //     //**we need authentication and uniqueness**
    //     // Similar to the check in function, data is taken and stored in the database.
    //     // Unlike check in, update uses the positionRef to set the data (overwriting and rewriting all of the data) without creating an 
    //     // addtional and superfluous unique random ID from database
    //     database.ref("/groups/" + positionRef).set({groupID: group, name: name, x: longitude, y: latitude})

    //         // Experimenting with trying to get the data in the positionRef in a parseable object form upon a value delta
    //     database.ref("/groups/" + positionRef).once("value")
    //         .then(function(snapshot) {
    //             console.log(snapshot.val());
    //         });

    //     if (name in database.ref("/groups/" + positionRef) ){
    //         console.log("yea it's here alright");
    //     }
    //     else {
    //         console.log("nope");
    //         console.log(name);
    //         console.log(group);
    //     }
    
    //});
    
    
});



>>>>>>> Stashed changes
