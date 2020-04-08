
// Make connection
var socket = io.connect("http://localhost:4000");

let message;
let username;
let button;
let output;

// Query DOM
$().ready(() => {
    
    message = $("#message");
    username = $("#username");
    button = $("#send");
    output = $("#output");

    console.log(message.val(), username.val(), button.val(), output);

    // Emit events
    button.click(() => {
    
        socket.emit("chat", {
    
            message: message.val(),
            username: username.val(),
    
        });
        
    });
})



// Listen for events

socket.on("chat", (data) => {
    
    console.log(data);
    output.append(`<p><strong>${data.username}:</strong>${data.message}</p>`);
    
})