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

var positionRef;
var latitude;
var longitude;
var groups;
var groupMap;
var currentMap;
var markers = [];

    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    function clearMarkers() {
        setMapOnAll(null);
      }


      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }

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

$( document ).ready(function() {

    // Creates a subdirectory 'groups' in root of database 
    var groupsRef = database.ref("/groups");

    function groupMap() {
        groupMap = new google.maps.Map(document.getElementById( 'map' ), {
            center : {lat: latitude, lng: longitude},
            zoom: 12
        })
        
        var marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            map: groupMap,
        });
        
    
    };

    database.ref().on("value",function(snap){
        
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        
            groupMap();

            var contents = snap.val();
            groups = Object.keys(contents.groups);
            
            for (let i = 0; i < groups.length; i++){
                
                //Creating the sidebar dynamically
                var groupA = $("<a>");
                groupA.attr("href", "#0");
                var listA = $("<a>");
                listA.attr("href", "#0");
                listA.text("Members List");
                var topLi = $("<li>");
                topLi.addClass("topLi");
                var midLi = $("<li>");
                midLi.addClass("midLi");
                var loLi = $("<li>");
                loLi.addClass("loLi");
                var m3 = $("<ul>");
                m3.addClass("veritcal menu inUl");
                m3.attr("id", "m3");
                var m2 = $("<ul>");
                m2.addClass("vertical menu topUl");
                m2.attr("id", "m2");

                $("#m1").append(topLi);
                groupA.text(groups[i]);
                topLi.append(groupA);
                topLi.append(m2)
                m2.append(midLi);
                midLi.append(listA);
                midLi.append(m3);
                members = Object.keys(contents.groups[groups[i]]);
                

                    for (let j=0; j<members.length; j++){
                        markers.push(contents.groups[groups[i]][members[j]]);

                        // function placeMarker(){
                            // function currentMap(){
                            //     currentMap = new google.maps.Map(document.getElementById( 'map' ), {
                            //         center : {lat: latitude, lng: longitude},
                            //         zoom: 14
                            //     })
                            // }    
                            // currentMap();   
                            
                            // for (let k=3; k<markers.length; k++){
                            //     console.log(markers[k]);
                            //     var pin = new google.maps.Marker({
                            //         position: markers[k],
                            //         // map: currentMap
                            //     })
                            //     pin.setMap(currentMap);
                            // }

                        // }

                        $("#checkIn").on("click", function(e){
                            // Stop the page from reloading
                            e.preventDefault();
                            
                            navigator.geolocation.getCurrentPosition(function(position) {
                                latitude = position.coords.latitude;
                                longitude = position.coords.longitude;

                                let name = $("#name").val();
                                let group = $("#group").val();
                                // Clear out the text field after the input has been gathered
                                // $("input.name").val("");
                                // $("input.group").val("");

                                if ("geolocation" in navigator){
                                    //Trying out new data structure
                                    groupsRef = database.ref("/groups/" + group );
                                    nameRef = database.ref("/groups/" + group + "/" + name );
                                    nameRef.set({lat: latitude, lng: longitude});
                                }
    
                          
                            function currentMap(){
                                currentMap = new google.maps.Map(document.getElementById( 'map' ), {
                                    center : {lat: latitude, lng: longitude},
                                    zoom: 14
                                })
                            }    
                            currentMap();   
                            
                            for (let k=3; k<markers.length; k++){
                                console.log(markers[k]);
                                var pin = new google.maps.Marker({
                                    position: markers[k],
                                    // map: currentMap
                                })
                                pin.setMap(currentMap);
                            }
                            // placeMarker();
                            });
                        });


                        m3.append(loLi);
                        var memberA = $("<a>");
                        memberA.attr("href", "#0");
                        loLi.append(memberA);
                        memberA.text(members[j]);
                    }
                }
                
        });
    });

    // When clicking the check in button...
    // $("#checkIn").on("click", function(e){
    //     // Stop the page from reloading
    //     e.preventDefault();
    //     database.ref().on("value",function(snap){
        
    //         var contents = snap.val();
    //         console.log(contents);
        
    //         // Take the values from the name field and the group field and assign them to name and group respectively
    //         let name = $("#name").val();
    //         let group = $("#group").val();
    //         // Clear out the text field after the input has been gathered
    //         // $("input.name").val("");
    //         // $("input.group").val("");

    //                 // Browser geolocation API asks for permission to get location data.
    //                 // Once accepted, the latitude and longitude can be obtained in the Decimal Degrees unit
    //             navigator.geolocation.getCurrentPosition(function(position) {
    //                 latitude = position.coords.latitude;
    //                 longitude = position.coords.longitude;
                    
    //                 groupMap();

    //                 if ("geolocation" in navigator){
    //                     //Trying out new data structure
    //                     groupsRef = database.ref("/groups/" + group );
    //                     nameRef = database.ref("/groups/" + group + "/" + name );
    //                     nameRef.set({lat: latitude, lng: longitude});
                        
    //                 }
    //                 else {
    //                     // No navigation ability will notify the user
    //                     console.log("no navigation ability")
    //                     // window.location.replace = "geo.html"
    //                 }
    //             });
    //     });
    // });
});
