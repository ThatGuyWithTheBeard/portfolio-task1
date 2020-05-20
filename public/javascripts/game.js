let socket = io.connect("http://localhost:4000");

const _commands = {
    FORWARD: "forward",
    BACK: "back",
    LOOK: "look",
    PICKUP: "pickup",
    USE: "use",
    DROP: "drop",
    HELP: "help",
}

let highscore;
let points;
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

    $("#cmd-container").children().fadeOut(1200);

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
        console.log(input);
    }

    $("#text-input").val("");
}

const handleCommand = (command, argument) => {
    
    // TODO Make command messages fadeout and remove element when complete
    
    switch(command.toLowerCase()) {
        case _commands.FORWARD:
            
            handleForward();
            
            break;

        case _commands.BACK:
            
            handleBack();

            break;

        case _commands.LOOK:

            handleLook();
        
            

            break;

        case _commands.PICKUP:
            
            handlePickup(argument);
        
            break;

        case _commands.USE:
            
            handleUse(argument);
        
            break;

        case _commands.DROP:
            
            handleDrop(argument);
        
            break;

        case _commands.HELP:
            
            handleHelp();
        
            break;

        default:
            console.log(`The command "${command}" is not recognized`)
            $("#cmd-container").append(`<div class="message">The command "${command}" is not recognized</div>`);
        
            break;
    }
}

const handleForward = () => {

    route = location.pathname.replace(/game/g, "room") + `/${currentRoom.locationIndex + 1}`;
    console.log(route);

    $.ajax({
        method: "GET", 
        url: route,
        error: (err) => {
            console.log(err);
            console.log(err.status, err.statusText);
            $("#cmd-container").append(`<div class="message">${err.status, err.statusText}</div>`);
            // $("#cmd-container").append(`<div class="error">${err.statusText}</div>`);
        },
        success: (data) => {
            console.log("Tried GET to /:id/room/:locationIndex");
            console.log(data);

            loadCurrentRoom();

            if(data.room === undefined)
                $("#cmd-container").append(`<div class="message">${data.message.forward}</div>`);
            else
                $("#cmd-container").append(`<div class="message">You move forward into ${data.room}</div>`);
        }
    });
}

const handleBack = () => {

    route = location.pathname.replace(/game/g, "room") + `/${currentRoom.locationIndex - 1}`;
    console.log(route);

    $.ajax({
        method: "GET", 
        url: route,
        error: (err) => {
            console.log(err);
            console.log(err.status, err.statusText);
            $("#cmd-container").append(`<div class="error">${err.status, err.statusText}</div>`);
            // $("#cmd-container").append(`<div class="error">${err.statusText}</div>`);
        },
        success: (data) => {
            console.log("Tried GET to /:id/room/:locationIndex");
            console.log(data);

            loadCurrentRoom();

            if(data.room === undefined)
                $("#cmd-container").append(`<div class="message">${data.message.back}</div>`);
            else
                $("#cmd-container").append(`<div class="message">You move back into ${data.room}</div>`);
        }
    });
}

const handleLook = () => {

    /* //? Look for rooms?
    for(const room of rooms) {
        $("#cmd-container").append(`<div class="message">${room}</div>`);
    } */

    let items;
    let enemies;
    
    //* Look for items or enemies
    if(currentRoom.items.length <= 0 && currentRoom.enemies.length <= 0) {
        $("#cmd-container").append(`<div class="message">You see nothing of interest.</div>`);
    } else {
        if(currentRoom.items.length !== 0) {
            items = currentRoom.items.reduce((itemString, { name }, index) => { return index === 0 ? name : `${itemString}, ${name}` }, "");
            console.log(items);
        }

        if(currentRoom.enemies.length !== 0) {
            enemies = currentRoom.enemies.reduce((enemyString, { name }, index) => { return index === 0 ? name : `${enemyString}, ${name}` }, "");
            console.log(enemies);
        }
    }
    
    const itemMessage = items === undefined ? `You find no items.` : `You find ${items} in the room.`;
    const enemyMessage = enemies === undefined ? `` : ` However, the room is guarded by ${enemies}.`;

    $("#cmd-container").append(`<div class="message">${itemMessage} ${enemyMessage}</div>`);
}

const handlePickup = (item) => {
    // TODO Pick up a specified item and update user and room

    /* itemsPickedUp = [];
            
    if(argument.length === 0) {
        console.log("You need to something to pick up")
    } else {
        argument.forEach((argument) => {

            [ item ] = currentRoom.items.filter((item) => item.name === argument);

            if(item === undefined) {
                $("#cmd-container").append(`<div class="message">No item of name "${argument}"</div>`);
            } else {
                
                itemsPickedUp = [...itemsPickedUp, item];
                $("#cmd-container").append(`<div class="message">Picked up item "${argument}"</div>`);
            }
        });
    }

    console.log(argument);
    console.log(itemsPickedUp); */

    $("#cmd-container").append(`<div class="message">The command "pickup" isn't implemented currently.</div>`);
}

const handleUse = (item) => {
    // TODO Use a specified item and update user
    $("#cmd-container").append(`<div class="message">The command "use" isn't implemented currently.</div>`);
}

const handleDrop = (item) => {
    // TODO Drop a specified item and update user and room
    $("#cmd-container").append(`<div class="message">The command "drop" isn't implemented currently.</div>`);
}

// Done
const handleHelp = () => {
    let commandString = Object.values(_commands).reduce((prevCommand, command) => { return command === "help" ? `${prevCommand} and ${command}` : `${prevCommand}, ${command}` });

    $("#cmd-container").append(`<div class="message">Available commands: ${commandString}</div>`);
}


const handleChat = (message) => {
    socket.emit("chat", {
        message,
        name: $("#name").text()
    });
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
        }
    });
}

const loadCurrentRoom = () => {

    route = location.pathname.replace(/game/g, "room");
    $.ajax({
        method: "GET", 
        url: route,
        error: (err) => {
            console.log(err);
            $("#cmd-container").append(`<div class="error">${err.responseJSON.message}</div>`);
        },
        success: (data) => {
            console.log("Tried GET to /:id/room");
            console.log(data);

            currentRoom = data;
            $("#room").text(`${currentRoom.name}`);
        }
    });
}

socket.on("announce", (data) => {
    if(data.name === $("#name").text())
        $("#chat-container").append(`<div class="message"><em>You</em> have joined the game!</div>`);
    else
        $("#chat-container").append(`<div class="message"><em>${data.name}</em> has joined the game!</div>`);
});
socket.on("chat", (data) => {
    $("#chat-container").append(`<div class="message"><em>${data.name}:</em>   ${data.message}</div>`);
});