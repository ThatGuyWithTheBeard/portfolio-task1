
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
        console.log("Login clicked");

        $.post("/login", {   // Doesn't work
            username: username,
            password
        });
    });
    
});

//console.log(username, password);