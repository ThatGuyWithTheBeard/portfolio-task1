
let username = "";
let password = "";

$().ready(() => {
    // Submit login information
    $("input").keyup((event) => {
        const ENTER_KEY = 13;

        if(event.which === ENTER_KEY){
            //$("input").submit(); // Doesn't do anything
            console.log("Pressed enter");
        }
    });

    // Bind login button.
    $("#login").click(() => {
        username = $("#username").val();
        password = $("#password").val();
        console.log(username, password);
        console.log(typeof(username), typeof(password));
        console.log("Login clicked");
        
        $.ajax({
            method: "POST", 
            url: "/users/login",
            contentType: "application/json",
            data: JSON.stringify({
                name: username,
                password: password
            }),
            //dataType: "json"
            
        }).catch((err) => { // FIXME This doens't trigger like expected. It seems like there's not an error to catch from the server right now.
            console.log(err);
            $("#message").append(`<div class="error">${err.statusText}</div>`);
            //$("#message").append(`<div class="error">${err.responseJSON.error}</div>`);
        }).done((data) => {
            console.log("Tried POST to login", data);
            $("#message").append(`<div class="data">Password accepted</div>`);

            location.href = "/index";
        });
    });
    
    /* .catch((err) => {
        console.log(err);
    }).done((data) => {
        console.log("Tried POST to register", data);
    }); */

});