const User = require("../models/Users");

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {

        const {
            name,
            bio,
            college,
            github,
            linkedin,
            skills,
            profileImage
        } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                name,
                bio,
                college,
                github,
                linkedin,
                skills,
                profileImage
            },
            { new: true }
        ).select("-password");

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getProfile,
    updateProfile
};