import {
    check,
    validationResult
} from 'express-validator/check';

export const validateOrg = (req, res, net) => {
    check('email').isEmail().withMessage('must be a valid email');
    try {
        validationResult(req).throw();
        next();
    } catch (err) {
        res.status(422).json({
            errors: err.mapped()
        });
    }
}