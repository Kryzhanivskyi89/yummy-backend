const { HttpError } = require("../helpers");

const validateBody = (schema) => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        console.log(req.body);

        if (error) {
            next(HttpError(400, error.message));
        }
        next(error);
    };

    return func;
};

module.exports = validateBody;
