const objectValidator = (schema) => {
    return (req, res, next) => {
        const body = req?.body || {};
        const {error} = schema.validate(body);
        if (error) {
            res.status(400).send({error: "Todos los campos son obligatorios!", message: error.message});
        }else{
            next();
        }
    }
}

module.exports = objectValidator;