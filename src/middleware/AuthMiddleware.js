import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import UserSchema from '../models/User';

const User = mongoose.model('User', UserSchema);


export const userAuth = (role) => {
    return (req, res, next) => {
        console.log(req.app.get('secretKey'));
        jwt.verify(req.headers['authorization'], req.app.get('secretKey'), (err, decode) => {

            if (err) {
                res.status(401).json({
                    status: 'error',
                    message: err.message,
                    data: null
                });
            } else {
                User.findById(decode.id, (err, op) => {
                    if (err) {
                        return res.status(404).json({
                            status: 'error',
                            message: `Error while geting record ${err}`,
                            data: null
                        });
                    }

                    if (op == null) {
                        return res.status(402).json({
                            status: 'error',
                            message: 'User not found',
                            data: null
                        });
                    } else if (role.indexOf(op.role) == -1) { //&& decode.id != op._id
                        console.log(op.role);
                        return res.status(401).json({
                            status: 'error',
                            message: 'Unauthorised Url',
                            data: null
                        });
                    } else {
                        req.body.id = decode.id;
                        req.body.organization = op.Organization;
                        req.body.location = op.Location;
                        req.body.user_role = op.role;
                        next();
                    }

                });
            }
        })
    }
}

//Admin authenticaion also handle by above role
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
                    return res.status(404).json({
                        "message": `Error while geting record ${err}`
                    });
                }

                // op.role != 'ADMIN_ROLE'
                if (op == null) {
                    return res.status(402).json({
                        message: 'User not found'
                    });
                } else if (op.role != 'ADMIN_ROLE') { //&& decode.id != op._id
                    return res.status(402).json({
                        message: 'Unauthorised Url'
                    });
                } else {
                    req.body.id = decode.id;
                    req.body.organization = op.Organization;
                    req.body.location = op.Location;
                    next();
                }

            });

        }

    })
}