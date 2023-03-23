var mongoose = require("mongoose");

module.exports = mongoose.model("Users", {
    email:{type: String, default:""},
    password:{type: String, default:""},
    fullname:{type: String, default:""}
});
