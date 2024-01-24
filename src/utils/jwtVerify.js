const { verify, sign } = require("jsonwebtoken");
const variables = require("./../config/variables");

const verifyToken = (token) => {
    try {
        return verify(token, variables.secretJwt);
    } catch (error) {
        throw new Error("Error al verificar");
    }
};

const signToken = (info) => {
    try {
        return sign(info, variables.secretJwt, {
            expiresIn: "24h"
        });
    } catch (error) {
        throw new Error("Error al firmar token");
    }
};

module.exports = { verifyToken, signToken };