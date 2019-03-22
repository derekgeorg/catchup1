// Bringing in my realtime database credentials to link to the page
var config = {
    apiKey: "AIzaSyD5oma6kJwXLMHltdeaK78A5eOhL-43xU4",
    authDomain: "myproject-1d7de.firebaseapp.com",
    databaseURL: "https://myproject-1d7de.firebaseio.com",
    projectId: "myproject-1d7de",
    storageBucket: "myproject-1d7de.appspot.com",
    messagingSenderId: "174971291605"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var thompsonConference = { lat: 30.28715, lng: -97.72910 };

// Creates a subdirectory 'groups' in root of database 
var groupsHolderRef = database.ref("/groups");

// A few globals..
var myName;          // The name of the person on this device
var myGroup;         // The name of the Catch Up this device is in

var nCatchUpAction = nNoAction;

var nNoAction = 0;
var nUpdateEventPinInfo = 1;


    // These are the global variables for the map itself as well as the array of information
    // about the group we are tracking.
    var myMap;
    var arrEvent = [];
    
    function initMap() {

        // For now let's just create the map HERE..   We should talk about how we really want to
        // initialize the map starting point.  Seems like its nice to show something before they
        // allow us to track their position..  But..  Maybe when they DO join, we should move the
        // map to their location.
        myMap = new google.maps.Map( document.getElementById( 'map' ), {
          // Center the map on our own location.  Well..  Class location..
          center: thompsonConference,
          zoom: 17
        });
    }

    // The purpose of this function is to call to firebase to get all the information about the group, sGroupName
    // from the Firebase database.
    function processCatchUpEvent( database, sGroupName, nAction ) {

        database.ref( "/groups" ).on( "value", function( snapshot ) {
            if ( nAction == nUpdateEventPinInfo ) {
                snapshot.forEach( function( thisMember ) {
                    if ( thisMember.val().groupID === sGroupName ) {
                        var markerPos = { lat: thisMember.val().x, lng: thisMember.val().y };
                        var marker = new google.maps.Marker({ title: thisMember.val().name,
                                                              label: thisMember.val().name,
                                                              position: markerPos,
                                                              map: myMap });

                        arrEvent.push({ groupID: thisMember.val().groupID,
                                        name: thisMember.val().name,
                                        x: thisMember.val().x,
                                        y: thisMember.val().y,
                                        myMarker: marker });
                    }
                });
            }
        });
    }

    // This is the initial map creation call..
    initMap();    

$( document ).ready(function() {
//    var localData = {};
    
    // When clicking the check in button...
    $("#checkIn").on("click", function(e){
        // Stop the page from reloading
        e.preventDefault();

        // Take the values from the name field and the group field and assign them to name and group respectively
        myName = $("#userName").val();
        myGroup = $("#groupName").val();
        console.log( "Checkin Name: " + myName );
        console.log( "Checkin Group: " + myGroup );
        // Clear out the text field after the input has been gathered
//        $("userName").val("");
//        $("input.group").val("");

//        if (myGroup in localData){
        if ( false ) {
            alert("Please pick a different group name. Someone nabbed this one ;]")
        }

        else {
            // proceed
//            if (myName in myGroup){
            if ( false ) {
                alert("Shucks. There's already a " + myName + " in this group. Pick a different name please")
            }
            else{
                // proceed
                // Browser geolocation API asks for permission to get location data.
                // Once accepted, the latitude and longitude can be obtained in the Decimal Degrees unit
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;

                    if ("geolocation" in navigator){
                        // If the user accepted location services, write their name, group, and position in the database.
                        // Since 'push' is being used, firebase creates a unique ID based on time and entropy that is the parent of the data
                        // In addition to writing data, positionRef's value is equal to the unique ID generated so that it can be referenced later
                        var positionRef = database.ref("/groups").push({groupID: myGroup, name: myName, x: latitude, y: longitude}).key;
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

    // When the update button is clicked...
    $("#update").on("click", function(e){
        // Stop the page from reloading
        e.preventDefault();
        console.log( "Ready to process..  Current processing: " + arrEvent.length );
        processCatchUpEvent( database, myGroup, nUpdateEventPinInfo );
    });
});
