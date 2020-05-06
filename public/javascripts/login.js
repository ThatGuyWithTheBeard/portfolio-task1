
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
            url: "/users",
            contentType: "application/json",
            data: JSON.stringify({
                name: username,
                password: password
            }),
            //dataType: "json"
            
        }).catch((err) => {
            console.log(err);
        }).done((data) => {
            console.log("Tried POST", data);
        });
    });
    
});

//console.log(username, password);

/*
let request = $.ajax({
        method: "GET",
        url: "/data",
        dataType: "json"
    });

$.post("/login", {   // Doesn't work
        username: username,
        password
*/