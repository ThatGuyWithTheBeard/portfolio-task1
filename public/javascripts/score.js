//const fs = require("fs");

let highscore;
let points = 0;
let currentRoom = 0;

let rooms = [
    {
        number: 0,
        name: "room 1 AKA start room",
        description: "there's a painting on the wall",
        isInRoom: true
    },
    {
        number: 1,
        name: "room 2 AKA middle room",
        description: "this rooms has nothing interesting in it",
        isInRoom: false
    },
    {
        number: 2,
        name: "room 3 AKA the final room",
        description: "there's a pit in front of you. You can't go any further",
        isInRoom: false
    }
];

let direction = "";

const nonDigit = /\D+/g;
const digit = /\d+/g;

$().ready(() => {

    highscore = parseInt(localStorage.getItem("localHighscore"));

    if(isNaN(highscore)) {
        highscore = 0;
    }

    $("#highscore").text(`Highscore: ${highscore}`);

    // FIXME Update functions with AJAX requests so they're the same as in "task1"
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

const moveRoom = (command) => {
    
    let currentRoom = rooms.filter(room => room.isInRoom === true)[0];

    const FORWARD = "forward";
    const BACK = "back";
    
    switch(command) {
        case FORWARD:
            
            if(currentRoom.number < rooms.length - 1) {
                
                rooms[currentRoom.number].isInRoom = false;
                rooms[currentRoom.number + 1].isInRoom = true;
                console.log(`You move forward into ${rooms[currentRoom.number + 1].name}`);

            } else
                console.log(`You can't move forward here`);
            
            break;

        case BACK:

            if(currentRoom.number > 0) {

                rooms[currentRoom.number].isInRoom = false;
                rooms[currentRoom.number - 1].isInRoom = true;
                console.log(`You move back into ${rooms[currentRoom.number - 1].name}`);
                
            } else
                console.log(`You can't move back any further`);

            break;

        default:

            console.log(`The command "${command}" is not recognized`)
        
            break;

    }

}