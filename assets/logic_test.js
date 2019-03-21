  
  
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

// whatever ID we generater, we want to set a directory in datase with that ID which holds members and positions


// this line below makes a directory in database called groupsRef but we need a variable instead of a set string because it'll be a random ID
 var groupsRef = database.ref("/groups");

$( document ).ready(function() {

    var groupsHolderRef = database.ref("/groups");
    var latitude;
    var longitude;
    navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    });
    // var varName = "variableNamefromInputField";
    // // join button on click, take name and group name. set name to varName.
    
    // // var ulisesPosition = database.ref("/groups/userRecord").push({groupID: "birthday", name: "Ulises", posx: 343, posy: 3434});

    // ulisesPosition.on("value", function(snap){
    //     let memberData = snap.val();
    //     console.log(memberData.groupID);
    //     ulisesPosition.set({groupID: memberData.groupID, name: memberData.name, posx: 3453453, posy: 3434})
    // });

    $("#checkInButton").on("click", function(e){
        e.preventDefault();
        
        let name = $("#name").val();
        let group = $("#group").val();
        console.log(name);
        console.log(group);


        if ("geolocation" in navigator){

            console.log("latitude: " + latitude);
            console.log("longitude: " + longitude);

            var positionRef = database.ref("/groups").push({groupID: group, name: name, posx: longitude, posy: latitude}).key;
            console.log(positionRef);

        }
        else {
            console.log("no navigation ability")
            window.location.replace = "geo.html"
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
  

//pseudocode, if the user tries to pick a username that is already being used
//tell user to pick a different name
name = $("#nameField").val();
GroupName = firebase.database().ref().child('groups') 
//Name    - access databse  - reference the child of "groupsRef"
GroupName.on('value', snap => console.log(snap.val()));
// When value changes console log snapshot of data 

$("#joinButton").on("click", function(){//when Join is clicked


if (name === GroupName.name) {
    alert ("Pick ye a new name")

}});





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
