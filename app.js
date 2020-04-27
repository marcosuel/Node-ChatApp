const expressHandlebars = require('express-handlebars');
const path = require('path')
const bodyparser = require("body-parser")
const express = require("express");
const mongoose = require("mongoose")
const session = require("express-session");
const passport = require("passport")
require("./config/auth.js")(passport)
const flash = require("connect-flash")
const db = require("./config/db")

const hbs = expressHandlebars.create({
    helpers: {
        equals: function (v1, v2, options) {
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        }
    }
});

//  Routes modules
    const user = require('./routes/user')
    const chatroom = require("./routes/chatroom")
    const message = require("./routes/message")

//  helpers modules
    const {checkAuthenticaded} = require("./helpers/checkAuthenticaded")

const app = express();


//  Config
    //  Session
        app.use(session({
            secret: "frdaosj",
            resave: true,
            saveUninitialized: true
        }))
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())
    
    //  Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null;
            next()
        });
    
    //  Template Engine
        app.engine('handlebars', hbs.engine);
        app.set('view engine', 'handlebars');
    //  Body parser
        app.use(bodyparser.urlencoded({extended: true}));
        app.use(bodyparser.json());

    //  Mongoose
        mongoose.connect(db.mongoURI, 
            {   useUnifiedTopology: true,
                useNewUrlParser: true   }).then(function(){

            console.log("MongoDB connected!")
 
        }).catch(function(err){
            console.log("Database error: "+err)
        });

    //  Public
        app.use(express.static(path.join(__dirname, "public")))


    //  Routes

    app.get("/", checkAuthenticaded, (req, res) => {
        res.render("chatroom/index", {user_id: req.user._id, username: req.user.name, room_id: "5ea49bdec95d5e26484a874d"})
    })

    app.use('/user', user)
    app.use("/chatroom", chatroom);
    app.use("/message", message);



app.use(express.json());
app.use(express.urlencoded({ extended: true}));


module.exports = app