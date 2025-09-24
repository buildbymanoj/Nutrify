const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('./models/userModels')
const foodModel = require('./models/foodModels')
const trackingModel = require('./models/trackingModels')
const cors = require('cors');

const verifyToken = require('./models/verifyToken')

mongoose.connect('mongodb://localhost:27017/nutrify')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app = express();

app.use(express.json());
app.use(cors());


app.post("/register", (req, res) => {
    let user = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        if (!err) {
            bcrypt.hash(user.password, salt, async (err, hpass) => {
                if (!err) {
                    user.password = hpass;

                    try {
                        let doc = await userModel.create(user)
                        res.send({ message: "user registered" })

                    }
                    catch (err) {
                        console.error('Error registering user:', err);
                        res.status(500).send({ message: "Error registering user" });
                    }

                }
            })
        }
    })


    //     .then((data) => {  
    //         res.status(201).send({message:"user registered"})
    //     })
    //     .catch((error) => {
    //         console.error('Error registering user:', error);
    //         res.status(500).send({message:"Error registering user"});
    //     });
})

app.post("/login", async (req, res) => {

    let userCred = req.body;

    try {
        const user = await userModel.findOne({ email: userCred.email });
        if (user !== null) {
            bcrypt.compare(userCred.password, user.password, (err, success) => {
                if (success == true) {
                    jwt.sign({ email: userCred.email }, "nutrifyapp", (err, token) => {
                        if (!err) {
                            res.send({ message: "Login Success", token: token, userid: user._id, name: user.name });
                        }
                    })
                }
                else {
                    res.status(403).send({ message: "Incorrect password" })
                }
            })
        }
        else {
            res.status(404).send({ message: "User not found" })
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Some Problem" })
    }
})



app.get("/foods", verifyToken, async (req, res) => {
    try {
        let foods = await foodModel.find();
        res.send(foods)
    }
    catch (err) {
        console.log(err);
        res.send({ message: "some problem" })
    }
})


app.get("/foods/:name", verifyToken, async (req, res) => {
    try {
        let food = await foodModel.find({ name: { $regex: req.params.name, $options: 'i' } })
        if (food.length !== 0) {
            res.send(food)
        }
        else {
            res.send({ message: "food not found" })
        }
    }
    catch (err) {
        res.send({ messsage: 'error while fetching food by name' })
    }
})


app.post("/track", verifyToken, async (req, res) => {
    let trackData = req.body
    try {
        const data = await trackingModel.create(trackData);
        res.status(201).send({ message: "adding of food successsful" })
    }

    catch (err) {
        console.log(err)
        res.status(404).send({ message: "adding of food failed" })

    }
})

app.get("/track/:user", async (req, res) => {
    let userid = req.params.user;

    try {
        let foods = await trackingModel.find({ user: userid })
        res.send(foods)
    }

    catch (err) {
        console.log(err);
        res.send({ message: "some problem while getting the food data" })
    }
})


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
