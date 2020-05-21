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

let currentRoom;
let user;

const nonDigit = /\D+/g;
const digit = /\d+/g;

$().ready(() => {
    
    loadUser();
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

// Done
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

// Done
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

// Done
const handleLook = () => {

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
    
    const itemMessage = items === undefined ? `You find no items.` : `You find <em>${items}</em> in the room.`;
    const enemyMessage = enemies === undefined ? `` : ` However, the room is guarded by <em>${enemies}</em>.`;

    $("#cmd-container").append(`<div class="message">${itemMessage} ${enemyMessage}</div>`);
}

const handlePickup = (item) => {

    console.log(currentRoom.items.length);
    if(currentRoom.items.length === 0) {
        $("#cmd-container").append(`<div class="message">There are no items to pickup in the room.</div>`);
    } else {

        if(item === "noArgs") {
            console.log(item);
            $("#cmd-container").append(`<div class="message">To pick up an item write "pickup <em>item</em>"</div>`);

            return;
        }

        for(const itemInRoom of currentRoom.items) {
            
            console.log(item);
            if(item.toLowerCase() === itemInRoom.name.toLowerCase()) {

                let route = location.pathname.replace("game", "move-item-to-user");
                
                $.ajax({
                    method: "POST", 
                    url: route,
                    contentType: "application/json",
                    data: JSON.stringify({
                        item: itemInRoom,
                        roomId: currentRoom._id
                    }),
                    error: (err) => {
                        console.log(err);
                        $("#cmd-container").append(`<div class="error">${err.statusText}</div>`);
                    },
                    success: (updatedUser) => {
                        loadCurrentRoom();
                        console.log("Tried POST to /:id/update-items");
                        console.log(updatedUser);
                        itemString = updatedUser.items.reduce((prevItem, { name }, index) => { return index === 0 ? `${name}` : `${prevItem}, ${name}` }, "");
                        $("#items").text(itemString);
                    }
                });

                $("#cmd-container").append(`<div class="message">You pickup <em>${itemInRoom.name}</em>.</div>`);
                return;
            } else {
                console.log("Input:", `"${item}"`, "Item in room:", `"${itemInRoom.name}"`);
            }
        }

        $("#cmd-container").append(`<div class="message">There are no <em>${item}</em> to pickup.</div>`);
        
        return;
    }
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

const loadUser = () => {

    let route = location.pathname.replace("game", "load-user");

    $.ajax({
        method: "GET", 
        url: route,
        error: (err) => {
            console.log(err);
            $("#cmd-container").append(`<div class="error">${err.statusText}</div>`);
        },
        success: (data) => {
            console.log("Tried GET to /:id/load-user");
            console.log(data);
            
            user = data;

            if(user.items.length === 0) {
                $("#items").text(`No items in inventory`);
            } else {
                itemString = user.items.reduce((prevItem, { name }, index) => { return index === 0 ? `${name}` : `${prevItem}, ${name}` }, "");
                $("#items").text(itemString);
            }
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