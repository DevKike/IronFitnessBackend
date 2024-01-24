const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !Array.isArray(roles)) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const constains = roles.find(role => role === req.user.role);
        console.log(constains, req.user, roles);
        if(!constains) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        next();
    };
};

module.exports = { roleMiddleware };