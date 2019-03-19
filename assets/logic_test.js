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

// whatever ID we generater, we want to set a directory in datase with that ID which holds memebers and positions


// this line below makes a directory in database called groupsRef but we need a variable instead of a set string because it'll be a random ID
 var groupsRef = database.ref("/groups");
 var connectedRef = database.ref(".info/connected");



$( document ).ready(function() {

    $("#createButton").on("click", function(){

        
        if ("geolocation" in navigator){
            // let name = $("#nameField").val();
            var groupID =  Math.floor(Math.random()*1000000);
            console.log(groupID);
            groupID = database.ref("/groups/" + groupID);
            
            navigator.geolocation.getCurrentPosition(function(position) {

                console.log(position);
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                console.log("latitude: " + latitude);
                console.log("longitude: " + longitude);
            
            });
            

        }
        else {
            console.log("no navigation ability")
        }
    
    });
    
    

    $("#joinButton").on("click", function(){

        if ("geolocation" in navigator){

            // let name = $("#nameField").val();
            let groupID = $("#groupIDField").val();
            groupdID = groupsRef.ref("/" + groupID);
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            console.log("latitude: " + latitude);
            console.log("longitude: " + longitude);
        }
        else {
            console.log("geolocation not available")
        }
    });

});


    var connectedRef = database.ref(".info/connected");

    // When the client's connection state changes...
    connectedRef.on("value", function(snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = groupsRef.push(true);
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
    });
  
//how to member list


var group = {

    member: {
        name: "bob",
        latitude: "numbers",
        longitude: "numbers"
    }
,
    
    member: {
        name: "bob",
        latitude: "numbers",
        longitude: "numbers"
    }
,
    
    member: {
        name: "bob",
        latitude: "numbers",
        longitude: "numbers"
    }
,
    
    member: {
        name: "bob",
        latitude: "numbers",
        longitude: "numbers"
    }


}