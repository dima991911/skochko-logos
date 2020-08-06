const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = require('../config');

const { Schema } = mongoose;

const UsersSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

UsersSchema.methods.generateJWT = function () {
    const expirationDate = new Date().getTime();

    return jwt.sign({
        login: this.login,
        _id: this._id,
        exp: expirationDate,
    }, config.jwt.secret);
};

UsersSchema.methods.getJwtToken = function () {
    return this.generateJWT();
};

mongoose.model('Users', UsersSchema);
