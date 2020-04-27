const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

require("../models/User")
const User = mongoose.model("users")

module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {

        User.findOne({email: email}).then((user) => {
            if(!user)
                return done(null, false, {message: "Email não encontrado!"})
            
            bcrypt.compare(password, user.password, (err, match) => {

                if(match){
                    return done(null, user)
                } else {
                    return done(null, false, {message: "Senha incorreta!"})
                }

            });
        });

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        });
    });

}

