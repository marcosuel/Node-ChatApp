const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const userController = require("../controllers/userController")

router.get("/login", (req, res) => {
    res.render("user/login")
})

router.get("/register", (req, res) => {
    res.render("user/register")
})

router.get("/logout", (req, res) => {

    req.logout()
    req.flash("success_msg", "Sessão encerrada")
    res.redirect("/")

})

router.post("/login", userController.login)
router.post("/register", userController.register)

module.exports = router;