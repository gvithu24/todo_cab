const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
// const { json } = require("stream/consumers");

const Todo = require("./model/todo");

const app = express();

app.use(express.json())

const cors = require('cors')
app.use(cors()) // Use this after the variable declaration

// const customMiddleware = (req,res,next)=>{
//     console.log("middle man");
//     next();
// }

// app.use(customMiddleware);


app.get("/",(req,res)=>{
    console.log("first reques");
    // res.send("first request");
});



app.get("/todo",(req,res,next)=>{
   Todo.find({}).then(function(todos){
       res.send(todos);
   });
});



app.post("/add_todo",async(req,res)=>{
    try{
    const mytodo  = new Todo(req.body);
    await mytodo.save();
    res.send(mytodo);
    // console.log(req.body.name)
    // res.send(`created todo ${req.body.name}`);
    }catch(err){
        res.send({message: err})
    }
});

app.delete("/remove/:id", function(req, res, next){
    console.log(req.params.id);
    Todo.findByIdAndRemove({_id: req.params.id}).then(function(todo){
        res.send(todo);
    });
});

mongoose.connect("mongodb+srv://gvithu24:12345@todoitems.ztmcj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
(req,res)=>{
    console.log("connnected to DB");
});

app.listen(4000,()=>{
    console.log("listening to 4000")
});