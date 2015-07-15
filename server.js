var express = require("express");

var app = express();
app.locals.pretty = true;
app.set("view engine", "jade");

app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next){
    res.locals.tabs = [
        {
            title: "Home",
            path: "/"
        },
        {
           title: "People",
           path: "/people"
        },
        {
            title: "Things",
            path: "/things"
        }
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
   res.render("things", {
       title: "Things",
       activePath: "/things"
   });
});

app.listen(process.env.PORT);