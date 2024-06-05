const User = require('../models/user');

const checkRole = async (req, res, next) => {
    const { email } = req.userData;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== process.env.ADMIN_KEY) {
            return res.status(403).json({
                message: 'You are not an administrator',
                role: user.role
            });
        }

        next();
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = checkRole;
