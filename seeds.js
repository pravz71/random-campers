var mongoose   = require("mongoose");
var Campground = require("./models/campgrounds.js");
var Comment    = require("./models/comments.js");
var data = [
    {
            name: "Phalut", 
            image: "https://www.trawell.in/admin/images/upload/646902441Darjeeling_Sandakpu_Main.jpg",
            description : " The name Phalut is a corruption of the Lepcha word Fak-Lut or the peeled summit and appellation derived from the bare treeless slopes, which offer a great contrast to the forest clad ranges below. The peak is also called Phalilung by the local people. The stretch from Sandakphu to Phalut is the most spectacular of the trek. The burned silver-fir forest makes most beautiful sight one will ever left come across."
    },
    {
            name: "Sandakphu", 
            image: "https://www.trawell.in/admin/images/upload/646902441Darjeeling_Sandakpu_Main.jpg",
            description : " The name Phalut is a corruption of the Lepcha word Fak-Lut or the peeled summit and appellation derived from the bare treeless slopes, which offer a great contrast to the forest clad ranges below. The peak is also called Phalilung by the local people. The stretch from Sandakphu to Phalut is the most spectacular of the trek. The burned silver-fir forest makes most beautiful sight one will ever left come across."
    },
    {
            name: "Gorkhey", 
            image: "https://www.trawell.in/admin/images/upload/646902441Darjeeling_Sandakpu_Main.jpg",
            description : " The name Phalut is a corruption of the Lepcha word Fak-Lut or the peeled summit and appellation derived from the bare treeless slopes, which offer a great contrast to the forest clad ranges below. The peak is also called Phalilung by the local people. The stretch from Sandakphu to Phalut is the most spectacular of the trek. The burned silver-fir forest makes most beautiful sight one will ever left come across."
    },
    {
            name: "Kalpokhari", 
            image: "https://www.trawell.in/admin/images/upload/646902441Darjeeling_Sandakpu_Main.jpg",
            description : " The name Phalut is a corruption of the Lepcha word Fak-Lut or the peeled summit and appellation derived from the bare treeless slopes, which offer a great contrast to the forest clad ranges below. The peak is also called Phalilung by the local people. The stretch from Sandakphu to Phalut is the most spectacular of the trek. The burned silver-fir forest makes most beautiful sight one will ever left come across."
    }
];
function seedDB() {
    // remove all campgrounds from db 
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("You wiped out everything...!!!!!!!!!!!Evil");
            // Add new Campgrounds.
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if(err) {
                        console.log(err);
                    }
                    else {
                        console.log("Campground added");
                        var randomComment = {
                            text: "It would have been more better had you been with me....",
                            author : "Random Guy"
                        };
                        Comment.create(randomComment, function (err, comment) {
                            if(err) {
                                console.log(err);
                            }
                            else {
                                console.log("Comment Added");
                                campground.comments.push(comment);
                                campground.save();
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;