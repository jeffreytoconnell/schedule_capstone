var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local:
    {
        email: String,
        password: String,
    }
});

// GENERATING A HASH
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// CHECKING IF PASSWORD IS VALID
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// CREATE THE MODELS FOR USER AND EXPOSE IT TO APP
module.exports = mongoose.model('User', userSchema);