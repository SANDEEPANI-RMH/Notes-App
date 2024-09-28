const mangoose = require('mongoose');
const Schema = mangoose.Schema;

const userSchema = new Schema({
    fullName: {type: String,}, 
    email: {type: String,},
    password: {type: String,},
    createdOn: {type: Date, default: new Date().getTime()},
});

module.exports = mangoose.model('User', userSchema);