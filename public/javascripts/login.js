
let _username = "";
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
        _username = $("#username").val();
        password = $("#password").val();
        console.log(_username, password);
        console.log("Login clicked");

        $.post("/login", {   // Doesn't work
            username: _username,
            password
        });
    });
    
});

//console.log(username, password);