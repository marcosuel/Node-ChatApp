const mongoose = require("mongoose")
const Chatroom = mongoose.model("chatrooms")

exports.createChatroom = (req, res) => {

    const errs = []


    const {name, description} = req.body


    if(!name || name == undefined || name == null)   errs.push({text: "O campo nome não deve estar vazio"})
    if(name.length < 5) errs.push({text: "O nome deve conter pelo menos 4 letras"})

    if(errs.length > 0){
        res.render("chatroom/newChatroom", {errs: errs})
    } else {
        //DEVE SER ALTERADO POIS PODEM EXISTIR SALAS COM O MESMO NOME
        Chatroom.findOne({name: name}).then((chatroom) => {
            if(chatroom){
                req.flash("Já existe uma sala com este nome.")
                res.render("chatroom/newChatroom", {description: description})
            } else {

                const newChatroom = new Chatroom({  name: name, description: description  });

                newChatroom.save().then(() => {
                    req.flash("success_msg", "Sala criada com sucesso.")
                    res.redirect("/user/login")
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao criar a sala.")
                    res.redirect("/user/login")
                });

            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno.")
            res.redirect("/user/login")
        });
    }
}

