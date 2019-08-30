var express  = require("express"),
    router   = express.Router(),
    User     = require("../models/users"),
    passport = require("passport");

router.get("/", function(req, res) {
    res.render("landing");
});

// AUTH ROUTES

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function (req, res) {
    var newUser  = new User({username : req.body.username}),
        password = req.body.password;
    User.register(newUser, password, function(err, user) {
        if(err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to Random Campers " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});
router.post("/login", passport.authenticate("local", {
        successRedirect : "/campgrounds",
        failureRedirect : "/login"
    }), function(req, res) {
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged out!");
    res.redirect("/campgrounds");
});

module.exports = router;
