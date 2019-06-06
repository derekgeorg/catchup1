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
var positionRef;
var bCheckedIn = false;


// A few globals..
var myName;          // The name of the person on this device
var myGroup;         // The name of the Catch Up this device is in.  In the future when 
                     // we understand more of how the piblic will actually use this app,
                     // we can make the mygroup into an array and be in multiple groups.

var nCatchUpAction = nNoAction;

var nNoAction = 0;
var nUpdateEventPinInfo = 1;

// These are the global variables for the map itself as well as the array of information
// about the group we are tracking - each entry in the arrEvent array will contain the
// the Marker for each user.
var myMap;
var arrEvent = [];

function initMap() {

    // For now let's just create the map HERE..   We start the map at the Class location
    // but once a user signs in and starts using the app, the map updates to center on
    // the position of the user signing in.
    myMap = new google.maps.Map( document.getElementById( 'map' ), {
        // Center the map on Class location..
        center: thompsonConference,
        zoom: 17
    });
}

//Based on what group you're in, this function will parse through the database and find the group's data so that
//it is able to populate the sidebar with members in your group
function writeSideBar (){
    $("#m1").empty();

    var groupA = $("<a>");
    groupA.attr("href", "#0");
    groupA.attr("id", myGroup);
    groupA.addClass("groupple");
    var listA = $("<a>");
    listA.attr("href", "#0");
    listA.text("Members List");
    var topLi = $("<li>");
    var midLi = $("<li>");
    var loLi = $("<li>");
    var m3 = $("<ul>");
    m3.addClass("vertical menu");
    m3.attr("id", "m3");
    var m2 = $("<ul>");
    m2.addClass("vertical menu");
    m2.attr("id", "m2");

    groupA.text(myGroup);
    topLi.append(groupA);
    topLi.append(m2)
    m2.append(midLi);
    midLi.append(listA);
    midLi.append(m3);
    m3.append(loLi);

    for (var i = 0; i < arrEvent.length; i++){
        if( myGroup === arrEvent[i].groupID ){
            
            var memberA = $("<a>");
            memberA.attr("href", "#0");
            memberA.attr("id", arrEvent[i].name);
            memberA.addClass("member");
            memberA.text(arrEvent[i].name);
            loLi.append(memberA);
        }
    }
    $("#m1").append(topLi);
    //It's rather important to initialize foundation after the data has been written into the DOM so that the framework can apply its
    //functionality appropriately
    $(document).foundation();    
}
   
function processCatchUpEvent( database, sGroupName, nAction ) {

    database.ref( "/groups" ).on( "value", function( snapshot ) {
        if ( nAction == nUpdateEventPinInfo ) {

            // First run through and clear map reference for existing markers.
            for ( var nLoop = 0; nLoop < arrEvent.length; nLoop++ ) {
                if ( typeof arrEvent[ nLoop ].myMarker !== 'undefined' ) {
                    arrEvent[ nLoop ].myMarker.setMap( null );
                }
            }

            // Now that we have removed all references from the markers to the map,
            // remove our references to the markers so they can be released.
            arrEvent = [];

            // For each line in the database, see if the member is in our group and, if so,
            // create a Marker for each person.
            snapshot.forEach( function( thisMember ) {
                if ( thisMember.val().groupID === sGroupName ) {
                    var markerPos = { lat: thisMember.val().x, lng: thisMember.val().y };

                    // console.log( "Placing marker at: " + thisMember.val().x + ":" + thisMember.val().y );

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
            //We write the sidebar here because the arrEvent object is created here thus having the writeSideBar function here
            //keeps the object in scope and allows access to it
            writeSideBar();
            //This is a function that allows for you to click on a member of your group in the sidebar to pan to that persons location
            $(".member").on("click", function(){
                let name = $(this).attr("id");
                for (var i = 0; i < arrEvent.length; i++){
                    if (name === arrEvent[i].name){
                        let position = {lat: arrEvent[i].x, lng: arrEvent[i].y};
                        myMap.panTo( position );
                        myMap.setZoom( 16 );
                    }
                }
           
            });
        }
    });
}

// This is called when out timer expires so we can set our position in Firebase.
function processTimeoutEvent( database, sGroupName ) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        if ("geolocation" in navigator){
            // If the user accepted location services, write their name, group, and position in the database.
            // Since 'push' is being used, firebase creates a unique ID based on time and entropy that is the parent of the data
            // In addition to writing data, positionRef's value is equal to the unique ID generated so that it can be referenced later
            positionRef.set({groupID: myGroup, name: myName, x: latitude, y: longitude});
            // countdown();
        }
        else {
            // No navigation ability will notify the user
            console.log("no navigation ability")
            // window.location.replace = "geo.html"
        }
    });
}

// Update our position in the database every 60 seconds.
function countdown() {
    var seconds = 60;
    function tick() {
        seconds--;
        if( seconds > 0 ) {
         setTimeout(tick, 1000);
        } else {
            processTimeoutEvent( database, myGroup );
            seconds = 60;
        }
    }
    tick();
}


// This is the initial map creation call..
initMap();

$( document ).ready(function() {
//    var localData = {};



//Moment JS clock shows current time and interval per sec
var timeNow = moment()
$('#timeClock').html(moment(timeNow).format('MMMM Do YYYY, h:mm:ss a'))

function clock() {
    $('#timeClock').html(moment().format('MMMM Do YYYY, h:mm:ss a'))
}

setInterval(clock, 1000)
    
    // When clicking the check in button...
    $("#checkIn").on("click", function(e){
        if ( !bCheckedIn ) {
            bCheckedIn = true;
            
            // Stop the page from reloading
            e.preventDefault();

            // Take the values from the name field and the group field and assign them to name and group respectively
            myName = $("#userName").val();
            myGroup = $("#groupName").val();
            // console.log( "Checkin Name: " + myName );
            // console.log( "Checkin Group: " + myGroup );

            // Browser geolocation API asks for permission to get location data.
            // Once accepted, the latitude and longitude can be obtained in the Decimal Degrees unit
            navigator.geolocation.getCurrentPosition(function(position) {

                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

            // OpenWeather API gets temperature based on current location
                var APIkey = "3c64ce1214a3d6f650ffb33e2ae6c445";
                var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + APIkey;

                $.ajax ({
                    url: queryURL,
                    method: "GET"
                }).then(function(response){
                    // console.log(response);
                var temperature = response.main.temp;
                //Display temperature in top header #weatherText
                $("#weatherText").text(Math.round(temperature) + "°")
                });
                
                // Now that they are signed in, center the map on their current position.
                myMap.setCenter( { lat: latitude, lng: longitude } );

                if ("geolocation" in navigator){
                    // If the user accepted location services, write their name, group, and position in the database.
                    // Since 'push' is being used, firebase creates a unique ID based on time and entropy that is the parent of the data
                    // In addition to writing data, positionRef's value is equal to the unique ID generated so that it can be referenced later
                    positionRef = database.ref("/groups").push({groupID: myGroup, name: myName, x: latitude, y: longitude});

                    // Process the event to create the thumb-tack..
                    processCatchUpEvent( database, myGroup, nUpdateEventPinInfo );

                    // countdown();

                    // Setup a call to take care of cleaning up - removing our line in Firebase - on disconnect..
                    positionRef.onDisconnect().remove();
                }
                else {
                    // No navigation ability will notify the user
                    console.log("no navigation ability")
                    // window.location.replace = "geo.html" - Future enhancement!!
                }
            });
        } else {
            console.log( "Already checked in!!" );
        }
    });

    // When the update button is clicked...
    $("#update").on("click", function(e){
        // Stop the page from reloading
        e.preventDefault();
        processCatchUpEvent( database, myGroup, nUpdateEventPinInfo );
    });
});