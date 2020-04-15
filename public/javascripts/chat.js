
// Make connection
var socket = io.connect("http://localhost:4000");

let message;
let username;
let button;
let output;
let feedback;

// Query DOM
$().ready(() => {
    
    message = $("#message");
    username = $("#username");
    button = $("#send");
    output = $("#output");
    feedback = $("#feedback");

    console.log(message.val(), username.val(), button.val(), output.text());

    message.keypress(() => {
        socket.emit("typing", username.val());
    });

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
    feedback.text("");
    console.log($("#feedback").text());
    output.append(`<p><strong>${data.username}:</strong>   ${data.message}</p>`);
    
});

socket.on("typing", (data) => {
    
    /* setTimeout(() => {
        feedback.append(`<p><em>${data} is typing a message...</em></p>`);
    }, 1000); */
    
    //feedback.append(`<p><em>${data} is typing a message...</em></p>`);
    feedback.text(`${data} is typing a message...`).wrapInner("<em></em>");
    console.log($("#feedback").text());
});