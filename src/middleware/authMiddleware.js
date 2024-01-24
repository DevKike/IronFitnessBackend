const { verifyToken } = require("../utils/jwtVerify");

const authMiddleware = () => {
    return (req, res, next) => {
        try {
            const authorization = req.headers?.authorization.split(" ")[1] || null;
            if (!authorization) {
                throw new Error("Error al recibir el token");
            } else {
                const token = verifyToken(authorization);
                req.user = {
                    id: token.id,
                    role: token.role
                }
                next();
            }
        } catch (error) {
            res.status(403).send({
                error: "authorization denied"
            });
        }
    };
};

module.exports = authMiddleware;