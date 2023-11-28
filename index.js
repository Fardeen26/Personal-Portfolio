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
 
main().then(() => {
    console.log("connected to DB");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/myportfolio');
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

app.get("/home", (req, res) => {
    res.render("home.ejs");
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
        res.render("contact.ejs");
    } catch (err) {
        next(err);
    }
}));

app.use((err, req, res, next) => {
    let { status = 500, message = "Some Error Occurred" } = err;
    // res.status(status).send(message);
    res.status(status).render("contact.ejs", { message });
});

app.listen(port, () => {
    console.log(`listning to port : 8080`);
});


// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'Myportfolio',
//     password: 'Fvdbkl6M8a'
//   });


// app.post("/home/contact", (req, res) => {
//     let { username, email, message} = req.body;
//     let q = `INSERT INTO webusers (username, email, message) VALUES ('${username}', '${email}', '${message}')`;

//     try {
//         connection.query(q, (err, result) => {
//             if(err) throw err;
//             console.log(res);
//             res.render("contact.ejs");
//         })
//     }catch(err) {
//         console.log(err);
//         res.send(err);
//     }
// });