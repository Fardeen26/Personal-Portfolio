const express = require("express")
const app = express()
const port = 8080
const path = require("path")
const { v4: uuidv4} = require("uuid")
const methodOverride = require("method-override")
const { name } = require("ejs")
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Myportfolio',
    password: 'Fvdbkl6M8a'
  });

  
app.use('/Image', express.static('Image'));
app.use(express.static(path.join(__dirname , "public/css")))
app.use(express.static(path.join(__dirname , "public/js")))
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));


app.get("/home", (req, res) => {
    res.render("home.ejs");
})

app.post("/home/contact", (req, res) => {
    let { username, email, message} = req.body;
    let q = `iNSERT INTO webusers (username, email, message) VALUES ('${username}', '${email}', '${message}')`;
    
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            res.redirect("/home");
        })
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})
app.listen(port, () => {
    console.log(`listning to port : 8080`);
})