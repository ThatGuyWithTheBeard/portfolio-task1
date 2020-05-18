//const User = require("../../models/user.js");
let socket = io.connect("http://localhost:4000");


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
        items: [
            { name: "apple", effect: "healing", value: 5 },
            { name: "coin", effect: "points", value: 1 },
        ]
    },
    {
        number: 2,
        name: "room 3 AKA the final room",
        description: "there's a pit in front of you. You can't go any further",
        isInRoom: false,
        items: []
    }
];

const nonDigit = /\D+/g;
const digit = /\d+/g;

$().ready(() => {
    
    socket.emit("announce", {
        name: $("#name").text()
    });

    // FIXME Update functions with AJAX requests so they're the same as in "task1"
    $("#submit").click((event) => {

        event.preventDefault();
        handleSubmit( $("#text-input").val() );
    });

    $("#text-input").keyup((event) => {

        event.preventDefault();
        if(event.which === 13) {
            handleSubmit( $("#text-input").val() );
        }
    });
});

const handleSubmit = (input) => {

    if(input[0] === "!") {
        handleCommand(input);
    } else {
        handleChat(input);
    }
    $("#text-input").val("");
}

const handleCommand = (input) => {
    
    let currentRoom = rooms.filter(room => room.isInRoom === true)[0];

    let command;
    let arguments;

    const commands = {
        FORWARD: "!forward",
        BACK: "!back",
        LOOK: "!look",
        PICKUP: "!pickup",
        USE: "!use",
        HELP: "!help",
    }

    if(input.includes(" ")) {

        [ command, ...arguments ] = input.split(" ");
        console.log(command, arguments);
        
    } else {
        command = input;
    }
    
    
    switch(command.toLowerCase()) {
        case commands.FORWARD:
            if(currentRoom.number < rooms.length - 1) {
                
                rooms[currentRoom.number].isInRoom = false;
                rooms[currentRoom.number + 1].isInRoom = true;

                $("#cmd-container").append(`<div class="message">You move forward into ${rooms[currentRoom.number + 1].name}</div>`);

            } else {
                console.log(`You can't move forward here`);
                $("#cmd-container").append(`<div class="message">You can't move forward here</div>`);
            }
            
            break;

        case commands.BACK:
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

        case commands.LOOK:

            if(currentRoom.items.length <= 0) {
                $("#cmd-container").append(`<div class="message">You see nothing of interest.</div>`);
            } else {
                
                names = currentRoom.items.reduce((itemNames, { name }, index) => {
                    
                    if(index + 1 !== currentRoom.items.length)
                        return itemNames + name + ", ";
                    else
                        return itemNames + `and ${name}`;

                }, "");

                console.log(names);
                $("#cmd-container").append(`<div class="message">You find ${names} in the room.</div>`);
            }

            break;

        case commands.PICKUP:
            
            itemsPickedUp = [];
            
            if(arguments.length === 0) {
                console.log("You need to something to pick up")
            } else {
                arguments.forEach((argument) => {
    
                    [ item ] = currentRoom.items.filter((item) => item.name === argument);
    
                    if(item === undefined) {
                        $("#cmd-container").append(`<div class="message">No item of name "${argument}"</div>`);
                    } else {
                        
                        itemsPickedUp = [...itemsPickedUp, item];
                        $("#cmd-container").append(`<div class="message">Picked up item "${argument}"</div>`);
                    }
                });
            }

            console.log(arguments);
            console.log(itemsPickedUp);
        
            break;

        case commands.USE:
            
            
        
            break;

        case commands.HELP:
            
            $("#cmd-container").append(`<div class="message">The command "${input}" is not recognized</div>`);
        
            break;

        default:
            console.log(`The command "${input}" is not recognized`)
            $("#cmd-container").append(`<div class="message">The command "${input}" is not recognized</div>`);
        
            break;
    }
}

const handleChat = (message) => {

    //console.log("Chat message:", message);
    //$("#chat-container").append(`<div class="message">${message}</div>`);

    socket.emit("chat", {

        message,
        name: $("#name").text()
    });
}

// FIXME Does not work as expected
socket.on("announce", (data) => {
    if(data.name === $("#name").text())
        $("#chat-container").append(`<div class="message"><em>You</em> have joined the game!</div>`);
    else
        $("#chat-container").append(`<div class="message"><em>${data.name}</em> has joined the game!</div>`);
});

socket.on("chat", (data) => {
    $("#chat-container").append(`<div class="message"><em>${data.name}:</em>   ${data.message}</div>`);
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
    

    console.log($("#text-input").val())
}

const resetHighscore = () => {

    highscore = 0;
    $("#highscore").text(`Highscore: ${highscore}`);
    localStorage.setItem("localHighscore", 0);

}