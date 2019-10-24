import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import UserSchema from '../models/User';

const User = mongoose.model('User', UserSchema);


export const userAuth = (req, res, next) => {
    console.log(req.app.get('secretKey'));
    jwt.verify(req.headers['authorization'], req.app.get('secretKey'), (err, decode) => {
        if (err) {
            res.json({
                status: 'error',
                message: err.message,
                data: null
            });
        } else {
            req.body.id = decode.id;
            next();
        }
    })
}

export const adminAuth = (req, res, next) => {
    // const decoded_token = jwt.decode(req.headers['authorization'], req.app.get('secretKey'));
    //console.log(decoded_token);
    jwt.verify(req.headers['authorization'], req.app.get('secretKey'), (err, decode) => {
        if (err) {
            return res.json({
                status: 'error',
                message: err.message,
                data: null
            });
        } else {
            User.findById(decode.id, (err, op) => {
                if (err) {
                    return res.status(404).send({
                        "message": `Error while geting record ${err}`
                    });
                }

                // op.role != 'ADMIN_ROLE'
                if (op == null) {
                    return res.status(402).send({
                        message: 'User not found'
                    });
                } else if (op.role != 'ADMIN_ROLE') { //&& decode.id != op._id
                    return res.status(402).send({
                        message: 'Unauthorised Url'
                    });
                } else {
                    req.body.id = decode.id;
                    next();
                }

            });

        }

    })
}