var express    = require("express"),
    router     = express.Router({mergeParams : true}),
    Campground = require("../models/campgrounds"),
    Comment    = require("../models/comments");
    
var middleware = require("../middleware"); 
//the path ../middleware/index.js is not given because when a folder is required index.js is implicitly required

// Comments Route

router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("comments/new",{campground : campground});    
        }
    });    
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } 
       else {
           var comment = req.body.comment;
           Comment.create(comment, function(err, newComment) {
               if(err) {
                   req.flash("error", "Comment could not be added!");
                   res.redirect("/campgrounds");
               }
               else {
                   newComment.author.id = req.user._id;
                   newComment.author.username = req.user.username;
                   newComment.save();
                   campground.comments.push(newComment);
                   campground.save();
                   req.flash("success", "Successfully addded comment");
                   res.redirect("/campgrounds/" + campground._id);
               }
           });
       }
    });
});

// Edit Comment Route /campgrounds/:id/comments/:comment_id/edit (beginning part of route is defined in app.js)
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id : req.params.id, comment : foundComment});    
        }
    });
});

// UPDATE Comment Route /campgrounds/:id/comments/:comment_id
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY Comment Route /campgrounds/:id/comments/:comment_id
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndDelete(req.params.comment_id, function(err) {
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;