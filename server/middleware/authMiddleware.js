const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const token = req.header("Authorization");

    console.log("TOKEN:", token);

    try {

        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("VERIFIED:", verified);

        req.user = verified;

        next();

    } catch (err) {

        console.log(err);

        res.status(401).json({
            message: "Invalid Token"
        });

    }
};

module.exports = verifyToken;
