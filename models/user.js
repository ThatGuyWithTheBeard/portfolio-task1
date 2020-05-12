const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create user Schema & model
const UserSchema = new Schema({
    name: {
        type: String,
        unique: [true, "This name already exists"],
        required: [true, "Name field is required"]
    },
    password: {
        type: String,
        required: [true, "Password required"]
    },
    health: {
        type: Number,
        default: 10
    },
    points: {
        type: Number,
        default: 0
    },
    highscore: {
        type: Number,
        default: 0
    },
    room: {
        type: Number,

    }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;