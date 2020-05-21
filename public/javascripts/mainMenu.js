$().ready(() => {
    $("#create-room").click(() => {
        createRoomPath = location.pathname.replace("main-menu", "create-room");
        location.href = createRoomPath;
    });
    $("#game").click(() => {
        gamePath = location.pathname.replace("main-menu", "game");
        location.href = gamePath;
    });
})