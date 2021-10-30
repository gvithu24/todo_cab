const mongoose = require("mongoose");

const Todo = new mongoose.Schema({
    
    title : {
        type: String,
        required : true
    },
    completed : {
        type: Boolean
    },
    date : {
        type: Date
    }
});

module.exports = mongoose.model("todo", Todo)