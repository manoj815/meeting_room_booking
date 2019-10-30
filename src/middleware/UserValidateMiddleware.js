import mongoose from 'mongoose';
import UserSchema from '../models/User';
import {
    check,
    validationResult,
    body,
    buildCheckFunction
} from 'express-validator';

const bodyEmail = buildCheckFunction(['body']);
const User = mongoose.model('User', UserSchema);

export const validateUser1 = (req, res, next) => {
    check('email').isEmpty().withMessage('Email cant be empty')
    check('email').isEmail().withMessage('must be a valid email');
    try {
        const errors = validationResult(req);
        console.log(errors);
        //next();
    } catch (err) {
        res.status(422).json({
            errors: err.mapped()
        });
    }
}
export const validateUser2 = (req, res, next) => {
    //console.log(req.body.email);
    check('name').isEmpty().withMessage('Email cant be empty')(req, res, err => {
        if (err) {
            return next(err);
        }
    });
    check('email').isEmail().withMessage('must be a valid email')(req, res, err => {
        if (err) {
            return next(err);
        }
    });
    check('password').isLength({
        min: 4
    }).withMessage('password 4 chars long!')(req, res, err => {
        if (err) {
            return next(err);
        }

        try {
            validationResult(req).throw();
            next();
        } catch (err) {
            res.status(422).json({
                errors: err.mapped()
            });
        }
    })


}

const checkEmail = async (email) => {
    // async function checkEmail(email) {
    var result = null;
    await User.findOne({
        email: email
    }, (er, op) => {

        if (op != null) {
            result = true;
        } else {
            result = false;
        }
    });

    return result;

    //return true;
}
//console.log(body('email'));
export const validateUser = [
    check('name').not().isEmpty().withMessage('Name cant be empty'),
    check('email').not().isEmpty().withMessage('Email cant be empty'),
    check('email').isEmail().withMessage('Email must be in valid format'),
    check('email').custom(value => {
        return new Promise(function (resolve, reject) {
            checkEmail(value).then(token => {
                if (Boolean(token)) {
                    reject(new Error('E-mail already in use'))
                }
                resolve(true)
            })
        })
    }),
    check('password').isLength({
        min: 4
    }).withMessage('minimum length of password must be 4'),
];