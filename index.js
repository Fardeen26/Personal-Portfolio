if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const { name } = require("ejs");
const mongoose = require("mongoose");
const ExpressError = require("./error.js");
const wrapAsync = require("./utils/wrapAsync.js");
const { joiuserSchema } = require("./schema.js");

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const DBurl = process.env.ATLAS_DB;
const localMongoUrl = process.env.LOCAL_MONGODB_URL;

main().then(() => {
    console.log("connected to DB");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(DBurl);
}

// <==================== SMS SENDER FUNCTION ====================>

function sendSMS(name, email, message) {
    client.messages
        .create({
            body: `name : ${name}, email: ${email} and message: ${message}`,
            to: process.env.RES_NUMBER,
            from: process.env.SEN_NYMBER,
        })
        .then((message) => {
            console.log(`SMS message sent successfully by ${name}`);
        })
        .catch((error) => {
            console.error(error);
        });
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    created_at: {
        type: Date,
    },
});

const User = mongoose.model("User", userSchema);

app.use('/Image', express.static('Image'));
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
    mongoUrl: DBurl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", ()=>{
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};
 
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});


app.get("/home", (req, res) => {
    res.render("home.ejs");
});

app.get("/terms", (req, res) => {
    res.render("terms.ejs");
});

app.get("/policy", (req, res) => {
    res.render("policy.ejs");
});

const validateListing = (req, res, next) => {
    let { error } = joiuserSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

app.post("/home/contact", validateListing, wrapAsync(async (req, res, next) => {
    try {
        let { name, email, message } = req.body;
        let newUser = new User(
            {
                name: name,
                email: email,
                message: message,
                created_at: new Date(),
            }
        );

        await newUser.save().then((res) => {
            console.log("detail was saved");
        });

        await sendSMS(name, email, message);
        req.flash("success", `Hy ${name} your message was sent`);
        res.redirect("/home")
    } catch (err) {
        next(err);
    }
}));

app.all("*", (req, res, next) => {
    res.redirect("/home");
});

app.use((err, req, res, next) => {
    let { status = 500, message = "Some Error Occurred" } = err;
    res.status(status).send(message);
});

app.listen(port, () => {
    console.log(`listning to port : ${port}`);
});
