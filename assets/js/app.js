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
    
    // When the update button is clicked...
    $("#update").on("click", function(e){
        // Stop the page from reloading
        e.preventDefault();

        // Take the values from the name field and the group field and assign them to name and group respectively
        let name = $("#name").val();
        let group = $("#group").val();

        // Clear out the text field after the input has been gathered
        $("input.name").val("");
        $("input.group").val("");

        // Obtain current coordinates to replace old coordinates in the database
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        

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