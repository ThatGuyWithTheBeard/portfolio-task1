
let username = "";
let password = "";

$().ready(() => {
    // Submit login information
    $("input").keyup((event) => {
        const ENTER_KEY = 13;

        if(event.which === ENTER_KEY) {
            //$("input").submit(); // Doesn't do anything
            console.log("Pressed enter");
        }
    });

    // Bind login button.
    $("#register").click(() => {
        username = $("#username").val();
        password = $("#password").val();
        console.log(username, password);
        console.log(typeof(username), typeof(password));
        console.log("Register clicked");
        
        $.ajax({
            method: "POST", 
            url: "/users/register",
            contentType: "application/json",
            data: JSON.stringify({
                name: username,
                password: password
            }),
            error: (err) => {
                console.log(err);
                //$("#message").append(`<div class="error">${err.statusText}</div>`);
                $("#message").append(`<div class="error">${err.responseJSON.message}</div>`);
            },
            success: (data) => {
                console.log("Tried POST to registers", data);
                $("#message").append(`<div class="data">Password accepted</div>`);
    
                location.href = `/${data._id}/game`;
            }
        });
    });
    
});