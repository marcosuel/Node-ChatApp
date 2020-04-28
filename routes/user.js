const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const {checkAuthenticaded} = require("../helpers/checkAuthenticaded")
const {redirectUser} = require("../helpers/redirectUser")


router.get("/login", redirectUser, (req, res) => {
    res.render("user/login")
})

router.get("/register", redirectUser,  (req, res) => {
    res.render("user/register")
})


router.get("/logout", checkAuthenticaded, userController.logout)
router.get("/chatrooms", checkAuthenticaded, userController.listRooms)

router.post("/login", redirectUser, userController.login)
router.post("/register", redirectUser, userController.register)

module.exports = router;