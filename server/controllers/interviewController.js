const Interview = require("../models/Interview");

const createInterview = async (req, res) => {

    try {

        const { role } = req.body;

        const interview = await Interview.create({
            userId: req.user.id,
            role
        });

        res.status(201).json(interview);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    createInterview
};