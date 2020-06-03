const mongoose = require("mongoose")
const Chatroom = mongoose.model("chatrooms")
const User = mongoose.model("users")

exports.createChatroom = (req, res) => {

    const errs = []


    const {name, description, user_id} = req.body


    if(!name || name == undefined || name == null)   errs.push({text: "O campo nome não deve estar vazio"})
    if(name.length < 5) errs.push({text: "O nome deve conter pelo menos 4 letras"})

    if(errs.length > 0){
        res.render("chatroom/newChatroom", {errs: errs})
    } else {
        const newChatroom = new Chatroom({  
            name: name, 
            description: description,
            members: [user_id]
        });

        newChatroom.save().then(() => {
            req.flash("success_msg", "Sala criada com sucesso.")
            res.redirect("/user/chatrooms")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao criar a sala.")
            res.redirect("/user/chatrooms")
        });

    }
}

exports.addMember = (req, res) => {

    Chatroom.findOne({_id: req.params.id}).then((chat) => {
        if(chat){

            User.findOne({email: req.body.email}).then((user) => {
                if(user) {

                    if(!chat.members.includes(user._id)){
                        chat.updateOne({$push: {members: user._id}}).then(() =>{
                            req.flash("success_msg", "Membro adicionado com sucesso.")
                            res.redirect("/chatroom/in/"+req.params.id)
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao adicionar o novo membro")
                            res.redirect("/chatroom/in/"+req.params.id)
                        })
                    } else {
                        req.flash("error_msg", "Esse usuário já é membro da sala!")
                        res.redirect("/chatroom/in/"+req.params.id)
                    }


                } else {
                    req.flash("error_msg", "Não foi encontrado um usuário com esse email.")
                    res.redirect("/chatroom/in/"+req.params.id)
                }
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao buscar o usuário.")
                res.redirect("/chatroom/in/"+req.params.id)
            })

        } else {
            req.flash("error_msg", "Essa sala não existe!")
            res.redirect("/user/chatrooms")
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao buscar a sala")
        console.log(err)
        res.redirect("/user/chatrooms")
    })

}

exports.renderRoom =  (req, res) => {  

    Chatroom.findOne({_id: req.params.id}).then((room) => {
        
        if(room){
            if(room.members.includes(req.user._id)){
                console.log("entro")
                res.render("chatroom/index", {room_id: room._id, user_id: req.user._id, username: req.user.name})
            } else {
                res.redirect("/user/chatrooms")
            }
        } else {
            req.flash("error_msg", "Essa sala não existe!")
            res.redirect("/user/chatrooms")
        }

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao procurar a sala.")
        console.log(err)
        res.redirect("/user/chatrooms")
    })

}

