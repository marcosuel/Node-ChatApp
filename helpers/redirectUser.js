module.exports = {
    redirectUser: function(req, res, next){

        if(!req.isAuthenticated()){
            
            return next()
        } else {
            //req.flash("error_msg", "acesso negado")
            res.redirect("/")
        }

    }
}