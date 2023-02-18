const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const port = process.env.PORT || 3000;

const staticpath = path.join(__dirname,"../public");
app.use(express.static(staticpath));

const viewspath = path.join(__dirname,"../templates/views");
const partialspath = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",viewspath);
hbs.registerPartials(partialspath);


app.get("/",(req,res)=>{
    res.render("index")
});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",async (req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        const genders = req.body.gender;
        if (password===cpassword) {
            
            const registerEmployee = new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email :req.body.email,
                gender :genders,
                phone :req.body.phone,
                age :req.body.age,
                password :password,
                confirmpassword :cpassword,
            });

            const registered = await registerEmployee.save();
            res.status(201).render("index")

        } else {
            res.send("password are not matching")
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

app.listen(port,()=>{
    console.log(`Server is running at http://127.0.0.1:${port}`);
});