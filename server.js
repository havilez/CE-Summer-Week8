var express = require("express");
var Tab = require("./app/tab");
var db = require("./app/config/db");
var Thing = require("./app/models/thing");

db.connect()
    .then(function(){
        console.log("connected");
    })
    .catch(function(err){
        console.log(err);
    });


var app = express();
app.locals.pretty = true;
app.set("view engine", "jade");

app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next){
    res.locals.tabs = [
            new Tab("Home", "/"),
            new Tab("People", "/people"),
            new Tab("Things", "/things")
    ];
    next(); 
});


app.get("/", function(req, res){
   res.render("index", {
       title: "Home",
       activePath: "/"
   });
});
app.get("/people", function(req, res){
   res.render("people", {
       title: "People",
       activePath: "/people"
   });
});
app.get("/things", function(req, res){
    Thing.find({}).then(function(things){
       res.render("things", {
           title: "Things",
           activePath: "/things",
           things: things
       });
    });
});

app.get("/things/:id", function(req, res){
    Thing.findById(req.params.id)
        .then(function(thing){
            res.render("thing", {
               activePath: "/things",
               thing: thing,
               title: "Thing " + thing.name
            });  
        });
});

app.listen(process.env.PORT);