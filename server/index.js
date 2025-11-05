const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const userModel = require('./models/userModels')
const foodModel = require('./models/foodModels')
const trackingModel = require('./models/trackingModels')
const cors = require('cors');

require('dotenv').config();

const verifyToken = require('./models/verifyToken')
const server = process.env.MONGO_URI;
const jwt_sign = process.env.JWT_SIGN;
const PORT = process.env.PORT || 8000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


mongoose.connect(server)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app = express();

app.use(express.json());
app.use(cors());

// Initialize Google OAuth Client
const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

// Google Authentication Endpoint
app.post("/google-auth", async (req, res) => {
    try {
        const { token } = req.body;
        
        if (!token) {
            return res.status(400).send({ message: "Token is required" });
        }
        
        // Check if it's an ID token (JWT format) or access token
        if (token.startsWith('ya29.')) {
            // It's an access token, fetch user info from Google
            const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (!userInfoResponse.ok) {
                throw new Error('Failed to fetch user info from Google');
            }
            
            const userInfo = await userInfoResponse.json();
            const { email, name, id: googleId } = userInfo;
            
            // Check if user exists
            let user = await userModel.findOne({ email });
            
            if (!user) {
                // Create new user
                user = await userModel.create({
                    name,
                    email,
                    googleId,
                    isGoogleAuth: true,
                    age: 25  // Default age for Google auth users
                });
            } else if (!user.googleId) {
                // Update existing user with Google ID
                user = await userModel.findByIdAndUpdate(
                    user._id,
                    { googleId, isGoogleAuth: true },
                    { new: true }
                );
            }
            
            // Generate JWT token
            jwt.sign({ email }, jwt_sign, (err, authToken) => {
                if (!err) {
                    res.status(200).send({
                        message: "Google authentication successful",
                        token: authToken,
                        userid: user._id,
                        name: user.name,
                        email: user.email
                    });
                } else {
                    res.status(500).send({ message: "Token generation failed" });
                }
            });
        } else {
            // It's an ID token, verify with Google
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: GOOGLE_CLIENT_ID
            });
            
            const payload = ticket.getPayload();
            const { email, name, sub: googleId } = payload;
            
            // Check if user exists
            let user = await userModel.findOne({ email });
            
            if (!user) {
                // Create new user
                user = await userModel.create({
                    name,
                    email,
                    googleId,
                    isGoogleAuth: true,
                    age: 25  // Default age for Google auth users
                });
            } else if (!user.googleId) {
                // Update existing user with Google ID
                user = await userModel.findByIdAndUpdate(
                    user._id,
                    { googleId, isGoogleAuth: true },
                    { new: true }
                );
            }
            
            // Generate JWT token
            jwt.sign({ email }, jwt_sign, (err, authToken) => {
                if (!err) {
                    res.status(200).send({
                        message: "Google authentication successful",
                        token: authToken,
                        userid: user._id,
                        name: user.name,
                        email: user.email
                    });
                } else {
                    res.status(500).send({ message: "Token generation failed" });
                }
            });
        }
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(401).send({ message: "Invalid or expired token" });
    }
});

app.post("/register", async (req, res) => {
    let user = req.body;
    
    try {
        // Check if user already exists with the same email
        const existingUser = await userModel.findOne({ email: user.email });
        if (existingUser) {
            return res.status(409).send({ message: "User with this email already exists" });
        }
        
        // If user doesn't exist, proceed with registration
        bcrypt.genSalt(10, (err, salt) => {
            if (!err) {
                bcrypt.hash(user.password, salt, async (err, hpass) => {
                    if (!err) {
                        user.password = hpass;

                        try {
                            let doc = await userModel.create(user)
                            
                            // Generate authentication token for immediate login after registration
                            jwt.sign({ email: user.email }, jwt_sign, (err, token) => {
                                if (!err) {
                                    res.status(201).send({ 
                                        message: "User registered successfully", 
                                        token: token, 
                                        userid: doc._id, 
                                        name: doc.name,
                                        email: doc.email
                                    });
                                } else {
                                    // If token generation fails, still register but require login
                                    res.status(201).send({ message: "User registered successfully" });
                                }
                            })
                        }
                        catch (err) {
                            console.error('Error registering user:', err);
                            // Check for duplicate key error (in case of race condition)
                            if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
                                return res.status(409).send({ message: "User with this email already exists" });
                            }
                            res.status(500).send({ message: "Error registering user" });
                        }
                    } else {
                        console.error('Password hashing error:', err);
                        res.status(500).send({ message: "Error processing registration" });
                    }
                })
            } else {
                console.error('Salt generation error:', err);
                res.status(500).send({ message: "Error processing registration" });
            }
        })
    } catch (err) {
        console.error('Error checking existing user:', err);
        res.status(500).send({ message: "Server error" });
    }


})

app.post("/login", async (req, res) => {

    let userCred = req.body;

    try {
        const user = await userModel.findOne({ email: userCred.email });
        if (user !== null) {
            bcrypt.compare(userCred.password, user.password, (err, success) => {
                if (success == true) {
                    jwt.sign({ email: userCred.email }, jwt_sign, (err, token) => {
                        if (!err) {
                            res.send({ message: "Login Success", token: token, userid: user._id, name: user.name, email: user.email });
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

app.get("/track/:user/:date", async (req, res) => {
    let userid = req.params.user;
    let date = new Date(req.params.date);
    let strDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();


    try {
        let foods = await trackingModel.find({ userId: userid, eatenDate: strDate }).populate('userId').populate('foodid')
        res.send(foods)
    }

    catch (err) {
        console.log(err);
        res.status(500).send({ message: "some problem while getting the food data" })
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
