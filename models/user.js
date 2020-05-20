const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create item Schema & model
const ItemSchema = new Schema({
    name: String,
    effect: String,
    value: Number
});

// Create user Schema & model
const UserSchema = new Schema({
    name:       { type: String, unique: [true, "This name already exists"], required: [true, "Name field is required"] },
    password:   { type: String, required: [true, "Password required"] },
    health:     { type: Number, default: 10 },
    points:     { type: Number, default: 0 },
    highscore:  { type: Number, default: 0 },
    room:       { type: String, default: "Start Room" },
    items:      [ItemSchema]
});

const User = mongoose.model("user", UserSchema);

module.exports = User;