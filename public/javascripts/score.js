//const fs = require("fs");

let highscore;
let points = 0;
let currentRoom = 0;
let rooms = [0, 1, 2];
let direction = "";

const nonDigit = /\D+/g;
const digit = /\d+/g;

$().ready(() => {

    highscore = parseInt(localStorage.getItem("localHighscore"));

    if(isNaN(highscore)) {
        highscore = 0;
    }

    $("#highscore").text(`Highscore: ${highscore}`);

    $("#submit-btn").click((event) => {

        //event.preventDefault();
        direction = $("#command-input").val();
        
        console.log(direction);

    });
    
    
    console.log($("#highscore").text());
    console.log(highscore);
    console.log(isNaN(highscore));
    console.log(typeof highscore);
    console.log(typeof localStorage.getItem("localHighscore"));

    //$("#points").text()
    console.log($("#points").text());
    console.log(typeof $("#points").text());
    console.log($("#points").text().replace(nonDigit, ""));
});

const addPoint = () => {

    points += 1;
    console.log(points);

    $("#points").text(`Points: ${points}`);
    console.log($("#points").text());
    console.log($("#highscore").text());


    if(highscore < points) {
        $("#highscore").text(`Highscore: ${points}`);
        localStorage.setItem("localHighscore", points);
    }
    

    console.log($("#command-input").val())
}

const resetHighscore = () => {

    highscore = 0;
    $("#highscore").text(`Highscore: ${highscore}`);
    localStorage.setItem("localHighscore", 0);

}

const moveRoom = (direction) => {

    const MOVE_FORWARD = "forward";
    const MOVE_BACK = "back";

    switch(direction) {
        case MOVE_FORWARD:

            if(currentRoom + 1 < rooms[rooms.length - 1]) {
                currentRoom += 1;
                $("#status").text(`Moved succesfully! You're now in room ${currentRoom}.`);
            } else {

                $("#status").text(`You can't move that way. You're in room ${currentRoom}.`);

            }
            
            console.log("MOVE_FORWARD activated.");

        break;

        case MOVE_BACK:

            if(rooms[0] < currentRoom) {
                currentRoom -= 1;
                $("#status").text(`Moved succesfully! You're now in room ${currentRoom}.`);
            } else {

                $("#status").text(`You can't move that way. You're in room ${currentRoom}.`);

            }
            
            console.log("MOVE_BACK activated.");

        break;

        default:

            console.log("Default triggered.")
            
        break;

    }

}

const getDirection = () => {

    let direction = "";

    /* $("#submit-btn").click((event) => {

        event.preventDefault();
        direction = $("#command-input").val();
        
    }); */
    //console.log(direction);
    
    //moveRoom(direction);

    
}