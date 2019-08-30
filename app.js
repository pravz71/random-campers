 var express              = require("express"),
    mongoose              = require("mongoose"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    passport              = require("passport"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    flash                 = require("connect-flash"),
    User                  = require("./models/users.js"),
    Campground            = require("./models/campgrounds"),
    Comment               = require("./models/comments"),
    seedDB                = require("./seeds.js"),
    methodOverride        = require("method-override");
    
var indexRoutes      = require("./routes/index"),
    commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds");
    
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost/random_campers", { useNewUrlParser: true });
//mongoose.connect("mongodb://<db_user>:<db_password>@ds213968.mlab.com:13968/randomcampers", { useNewUrlParser: true });
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
// seedDB(); //seed the database

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Passport Configuration
app.use(require("express-session")({
    secret : "And time was passing like a hand waving from a train I wanted to be on...",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// A middleware to provide the currentUser & flash message details to every route.
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error   = req.flash("error");
    res.locals.success = req.flash("success");
    next(); //To proceed to the route handler
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Campground.create(
//     {
//             name: "Phalut", 
//             image: "https://www.trawell.in/admin/images/upload/646902441Darjeeling_Sandakpu_Main.jpg",
//             description : " The name Phalut is a corruption of the Lepcha word Fak-Lut or the peeled summit and appellation derived from the bare treeless slopes, which offer a great contrast to the forest clad ranges below. The peak is also called Phalilung by the local people. The stretch from Sandakphu to Phalut is the most spectacular of the trek. The burned silver-fir forest makes most beautiful sight one will ever left come across."
//     }, function(err, campgrounds) {
//         if(err)
//             console.log(err);
//         else
//             console.log(campgrounds);
//     }
// );
var port = process.env.PORT || 3000;
var ip = process.env.IP || 'localhost';
app.listen(port, ip, function(){
    console.log("Server Has  Started....");
});
