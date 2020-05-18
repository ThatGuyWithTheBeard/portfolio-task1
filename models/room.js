const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: String,
    description: String,
    enemies: [EnemySchema],
    items: [ItemSchema]
});

const EnemySchema = new Schema({
    name: String,
    health: { type: Number, default: 5 },
    damage: { type: Number, default: 2 }
});

const ItemSchema = new Schema({
    name: String,
    effect: String,
    value: Number
});

const Room = mongoose.model("room", RoomSchema);

module.exports = Room;