const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwt_sign = process.env.JWT_SIGN;

function verifyToken(req, res, next) {
    if (req.headers.authorization !== undefined) {

        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, jwt_sign, (err, data) => {
            if (!err) {
                next();
            }
            else {
                res.status(401).send({ message: "invalid token" })
            }
        })

    }
    else {
        res.status(401).send({ message: "please send a token" })
    }
}

module.exports = verifyToken;