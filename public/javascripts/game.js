//const User = require("../../models/user.js");
let socket = io.connect("http://localhost:4000");

const _commands = {
    FORWARD: "forward",
    BACK: "back",
    LOOK: "look",
    PICKUP: "pickup",
    USE: "use",
    HELP: "help",
}

let highscore;
let points = 0;
let currentRoom;
let rooms;

const nonDigit = /\D+/g;
const digit = /\d+/g;

$().ready(() => {
    
    loadAvailableRooms();
    loadCurrentRoom();

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

    let isChatInput = true;
    const [command, ...arguments] = input.split(" ");
    const stringArgs = arguments.length > 0 ? arguments.reduce((prevArg, argument) => { return `${prevArg} ${argument}` }) : "noArgs";
    
    commandValues = Object.values(_commands);
    
    for(const commandOption of commandValues) {
        if(command.toLowerCase() === commandOption) {
            console.log("Input command matched. Sending to handleCommand.")
            handleCommand(command, stringArgs);
            isChatInput = false;
            break;
        }
    }

    if(isChatInput) {
        handleChat(input);
    } else {
        console.log("Something isn't right in handleSubmit");
        console.log(input);
    }

    $("#text-input").val("");
}

const handleCommand = (command, arguments) => {
    
    // let currentRoom = rooms.filter(room => room.isInRoom === true)[0];

    /* let command;
    let arguments; */

    /* if(command.includes(" ")) {

        [ command, ...arguments ] = command.split(" ");
        console.log(command, arguments);
        
    } else {
        command = command;
    } */
    
    
    switch(command.toLowerCase()) {
        case _commands.FORWARD:
            if(currentRoom.number < rooms.length - 1) {
                
                rooms[currentRoom.number].isInRoom = false;
                rooms[currentRoom.number + 1].isInRoom = true;

                $("#cmd-container").append(`<div class="message">You move forward into ${rooms[currentRoom.number + 1].name}</div>`);

            } else {
                console.log(`You can't move forward here`);
                $("#cmd-container").append(`<div class="message">You can't move forward here</div>`);
            }
            
            break;

        case _commands.BACK:
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

        case _commands.LOOK:

            handleLook();
        
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

        case _commands.PICKUP:
            
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

        case _commands.USE:
            
            
        
            break;

        case _commands.HELP:
            
            $("#cmd-container").append(`<div class="message">The command "${command}" is not recognized</div>`);
        
            break;

        default:
            console.log(`The command "${command}" is not recognized`)
            $("#cmd-container").append(`<div class="message">The command "${command}" is not recognized</div>`);
        
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

const loadAvailableRooms = () => {
    $.ajax({
        method: "GET", 
        url: "/rooms",
        error: (err) => {
            console.log(err);
            $("#cmd-container").append(`<div class="error">${err.statusText}</div>`);
        },
        success: (data) => {
            console.log("Tried POST to /rooms");
            console.log(data);
            rooms = data;
            
            //$("#cmd-container").append(`<div class="data">Loaded available rooms?</div>`);
            //rooms.forEach(name => $("#cmd-container").append(`<div class="data">${name}</div>`));
        }
    });
}

const loadCurrentRoom = () => {

    console.log(location.pathname);
    console.log(location.pathname.replace(/game/g, "rooms"));
    
    route = location.pathname.replace(/game/g, "rooms");

    $.ajax({
        method: "POST", 
        url: route,
        error: (err) => {
            console.log(err);
            $("#cmd-container").append(`<div class="error">${err.responseJSON.message}</div>`);
        },
        success: (data) => {
            console.log("Tried POST to /:id/rooms");
            console.log(data);
            currentRoom = data;
            //$("#cmd-container").append(`<div class="data">Loaded room?</div>`);
        }
    });
}

const handleLook = () => {
    rooms.forEach(name => $("#cmd-container").append(`<div class="message">${name}</div>`));
    console.log(rooms);
}