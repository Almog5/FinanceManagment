const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user name was not provided"],
        minlenghth: [3, "user name lenght must be at least 3"],
        maxlength: [50, "user name lenght can't be more then 50"],
    },
    email: {
    type: String,
    required: [true, "email was not provided"],
    match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid mail provided",
    ],
    unique: true, //create unique index, **if we will try to create another user with the same Email we will get an Error**
    },
    password: {
        type: String,
        required: [true, 'Password was not provided'],
        minlength: [4, 'password length must be more then 4']
    },
    accountID: {
        type: String
    }
});

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userID: this._id, name: this.name, accountID: this.accountID },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
}

UserSchema.methods.comparePasswords = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);
