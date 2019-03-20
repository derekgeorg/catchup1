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
    
    

    // $("#joinButton").on("click", function(e){
    //     e.preventDefault();

    //     if ("geolocation" in navigator){

    //         // let name = $("#nameField").val();
    //         let groupID = $("#groupIDField").val();
    //         groupdID = groupsRef.ref("/" + groupID);
    //         let latitude = position.coords.latitude;
    //         let longitude = position.coords.longitude;
    //         console.log("latitude: " + latitude);
    //         console.log("longitude: " + longitude);
    //     }
    //     else {
    //         console.log("geolocation not available")
    //     }
    // });

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