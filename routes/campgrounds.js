// Render all campgrounds
var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campgrounds");

var middleware = require("../middleware"); 
//the path ../middleware/index.js is not given because when a folder is required index.js is implicitly required

router.get("/", function(req, res) {
    Campground.find({}, function(err, allcampgrounds) {
        if(err)
            console.log(err);
        else
            res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
    });
});


// CREATE - Create a new campground
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    Campground.create(
        {
            name: name, 
            image: image,
            price : price,
            description: description,
            author : author
        }, function(err, newCampground) {
            if(err)
                console.log(err);
            else{
                res.redirect("campgrounds");
            }
    });
});

// NEW - show a form create a new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW - show a particular campground
router.get("/:id", function(req, res) {
    // find campground by provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            res.redirect("/campgrounds");
        }
        else {
            res.render("campgrounds/show", {campground : foundCampground});
        }
    });
});

// EDIT Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err){
            res.redirect("/campgrounds/" + req.params.id);
        }
        else {
            res.render("campgrounds/edit", {campground : foundCampground});
        }
    });
});

// UPDATE Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndDelete(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds/"+ req.params.id);
        }
        else {
            req.flash("success", "Campground deleted!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;

