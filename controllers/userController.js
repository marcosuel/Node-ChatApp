const mongoose = require("mongoose")
const User = mongoose.model("users")
const Chatroom = mongoose.model("chatrooms")
const bcrypt = require('bcrypt')
const passport = require('passport')




exports.listRooms = (req, res) => {

    Chatroom.find({members: req.user._id}).then((chatrooms) => {
        res.render("chatroom/chatrooms", {chatrooms: chatrooms.map(chatrooms => chatrooms.toJSON())})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar as salas.")
        //muda isso no futuro para uma pag inicial
        res.redirect("/")
    })

}

exports.login = (req, res, next) => {

    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/user/login",
        failureFlash: true
    })(req, res, next)
    
}

exports.logout = (req, res) => {

    req.logout()
    req.flash("success_msg", "Sessão encerrada")
    res.redirect("/user/login")

}

exports.register = (req, res) => {
    const {name, email, password, password2} = req.body

    var errs = []

    if(!name || typeof name == undefined || name == null)
        errs.push({text: "Nome inválido"})
    if(!email || typeof email == undefined || email == null)
        errs.push({text: "Email inválido"})
    if(!password || typeof password == undefined || password == null)
        errs.push({text: "Senha inválida"})
    if(password.length < 6) 
        errs.push({text: "Senha muito curta"})
    if(password != password2) 
        errs.push({text: "As senhas não correspondem"})

    
    if(errs.length > 0){
        res.render("user/register", {errs: errs, name: name, email: email})
    } else {
        User.findOne({email: email}).then((user) => {
            if(user){
                errs.push({text: "Já existe uma conta cadastrada com este email."})
                res.render("user/register", {errs: errs, name: name, email: ""})
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                })
                //Encrypt password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err){
                            req.flash("error_msg", "Houve um erro durante o salvamento do usuário.")
                            res.redirect("/")
                        }else {
                            newUser.password = hash
                            newUser.save().then(() => {
                                req.flash("success_msg", "Usuario registrado com sucesso.")
                                res.redirect("/user/login")
                            }).catch((err) => {
                                req.flash("error_msg", "Houve um erro interno ao criar o usuário.")
                                res.redirect("/")
                            });
                        }
                    });
                });
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno.")
            res.redirect("/")
        });
    }
}