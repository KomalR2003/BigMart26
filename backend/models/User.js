const mongoose = require ('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    admin: {
        required: true,
        type:  Boolean,
        default: false  // means created user is not admin
    }
});

const userModel = mongoose.model("user", UserSchema);
module.exports = userModel;
