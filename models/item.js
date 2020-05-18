const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create item Schema & model
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    /* type: {
        type: String,
        default: "Unknown"
    }, */
    isPickedUp: {
        type: Boolean,
        default: false
    },
    /* pickedUpBy: {
        type: String,
        default: "No one"
    },
    room: {
        type: Number,
        //required: [true, "Item needs to be in a room."]
    } */
});

/* const User = mongoose.model("item", ItemSchema);

module.exports = User; */