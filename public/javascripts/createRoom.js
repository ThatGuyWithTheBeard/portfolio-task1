$().ready(() => {

    // After loading in
    $(".enemy-amount").text( $("#enemy-amount").val() );
    $(".item-amount").text( $("#item-amount").val() );
    
    $("#enemy-amount").mouseup((event) => {
        event.preventDefault();
        $(".enemy-amount").text( $("#enemy-amount").val() );
        updateEnemyAmount( $("#enemy-amount").val() );
    });

    $("#item-amount").mouseup((event) => {
        event.preventDefault();
        $(".item-amount").text( $("#item-amount").val() );
        updateItemAmount( $("#item-amount").val() );
    });

    $("#submit").click((event) => {
        event.preventDefault();
        handleSubmit();
    });

    
});

const handleSubmit = () => {
    let roomData = {
        name: $("#room-name").val(),
        description: $("#room-description").val(),
        enemies: [],
        items: []
    }
    console.log(roomData);

    if( $("#enemy-amount").val() === 0 ) {
        console.log("No enemies added to this room.");
    } else {
        for(let i = 0; i < $("#enemy-amount").val(); i++) {

            enemy = {
                name: $(`.enemy-name-${i}`).val(),
                health: $(`.enemy-health-${i}`).val(),
                damage: $(`.enemy-damage-${i}`).val()
            }
            console.log(enemy);

            roomData.enemies = [...roomData.enemies, enemy];
        }
    }

    if( $("#item-amount").val() === 0 ) {
        console.log("No items added to this room.");
    } else {
        for(let i = 0; i < $("#item-amount").val(); i++) {

            item = {
                name: $(`.item-name-${i}`).val(),
                effect: $(`.item-effect-${i}`).val(),
                value: $(`.item-value-${i}`).val()
            }
            console.log(item);

            roomData.items = [...roomData.items, item];
        }
    }

    console.log(roomData);

    $.ajax({
        method: "POST", 
        url: "/:id/create-room",
        contentType: "application/json",
        data: JSON.stringify(roomData),
        error: (err) => {
            console.log(err);
            $("#message").append(`<div class="error">${err.responseJSON.message}</div>`);
        },
        success: (data) => {
            console.log("Tried POST to /:id/create-room", data);
            $("#message").append(`<div class="data">A new room has been created and saved into the database!</div>`);
        }
    });

}

const updateEnemyAmount = (amount) => {

    if(amount === 0)
        $("#enemy-container").empty();
    else {
        $("#enemy-container").empty();

        for(let i = 0; i < amount; i++) {
            $("#enemy-container").append(enemyInput(i));
        }
    }
}

const updateItemAmount = (amount) => {

    if(amount === 0)
        $("#item-container").empty();
    else {
        $("#item-container").empty();
        
        for(let i = 0; i < amount; i++) {
            $("#item-container").append(itemInput(i));
        }
    }
}

const enemyInput = (number) => {
    return `<div class="enemy">
        <h3>Enemy #${number + 1}</h3>
        <p>Enemy name: <input class="enemy-name-${number}" type="text"></p>
        <p>Enemy health: <input class="enemy-health-${number}" type="number"></p>
        <p>Enemy damage: <input class="enemy-damage-${number}" type="number"></p>
    </div>`;
}

const itemInput = (number) => {
    return `<div class="item">
        <h3>Item #${number + 1}</h3>
        <p>Item name: <input class="item-name-${number}" type="text"></p>
        <p>Item effect: <input class="item-effect-${number}" type="text"></p>
        <p>Item value: <input class="item-value-${number}" type="number"></p>
    </div>`;
}