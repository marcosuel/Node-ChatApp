module.exports = {
    isDeveloper: function(req, res, next){

        if(req.isAuthenticated() && req.user.isDeveloper == 1){
            return next()
        }

        req.flash("error_msg", "Acesso negado.")
        res.redirect("/")

    }
}

