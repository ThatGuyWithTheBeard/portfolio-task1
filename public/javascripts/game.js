//const User = require("../../models/user.js");

let highscore;
let points = 0;
let currentRoom = 0;

let rooms = [
    {
        number: 0,
        name: "room 1 AKA start room",
        description: "there's a painting on the wall",
        isInRoom: true,
        items: []
    },
    {
        number: 1,
        name: "room 2 AKA middle room",
        description: "this rooms has nothing interesting in it",
        isInRoom: false,
        items: []
    },
    {
        number: 2,
        name: "room 3 AKA the final room",
        description: "there's a pit in front of you. You can't go any further",
        isInRoom: false,
        items: []
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
    $("#submit").click((event) => {

        event.preventDefault();

        command = $("#commands").val();
        console.log(command);

        moveRoom(command);
    });

    $("#commands").keyup((event) => {

        event.preventDefault();

        if(event.which === 13) {

            command = $("#commands").val();
            console.log(command);
    
            moveRoom(command);
        }
    });
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
    
    switch(command.toLowerCase()) {
        case FORWARD:
            if(currentRoom.number < rooms.length - 1) {
                
                rooms[currentRoom.number].isInRoom = false;
                rooms[currentRoom.number + 1].isInRoom = true;

                // Update front-end
                //console.log($("#room").text().replace());
                //$("#room").text().replace(digit, currentRoom.number);
                $("#cmd-container").append(`<div class="message">You move forward into ${rooms[currentRoom.number + 1].name}</div>`);

            } else {
                console.log(`You can't move forward here`);
                $("#cmd-container").append(`<div class="message">You can't move forward here</div>`);
            }
            
            break;

        case BACK:
            if(currentRoom.number > 0) {

                rooms[currentRoom.number].isInRoom = false;
                rooms[currentRoom.number - 1].isInRoom = true;
                console.log(`You move back into ${rooms[currentRoom.number - 1].name}`);
                $("#cmd-container").append(`<div class="message">You move back into ${rooms[currentRoom.number - 1].name}</div>`);
                
            } else {
                console.log(`You can't move back any further`);
                $("#cmd-container").append(`<div class="message">You can't move back any further</div>`);
            }

            break;

        default:
            console.log(`The command "${command}" is not recognized`)
            $("#cmd-container").append(`<div class="message">The command "${command}" is not recognized</div>`);
        
            break;
    }
}