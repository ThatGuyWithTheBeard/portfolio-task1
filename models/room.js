const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const RoomSchema = new Schema({
    name: { type: String, unique: true },
    description: String,
    locationIndex: { type: Number, unique: [true, "This location index is taken. New rooms should have an index equal to the amount of rooms in database at the time of creation."] },
    enemies: [EnemySchema],
    items: [ItemSchema]
});

const Room = mongoose.model("room", RoomSchema);

module.exports = Room;