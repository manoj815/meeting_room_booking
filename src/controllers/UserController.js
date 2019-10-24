import mongoose from 'mongoose';
import UserSchema from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    
    validationResult
} from 'express-validator';

import {
    userInfo
} from 'os';
import {
    isNumber
} from 'util';

const User = mongoose.model('User', UserSchema);

export const getAllUser = (req, res) => {

    User.find({}, (err, op) => {
        if (err) {
            return res.send({
                'message': 'error while retrieving user'
            });
        }
        return res.send(op);
    })
};

export const getUserById = (req, res) => {
    User.findById(req.params.id, (err, op) => {
        if (err) {
            res.status(404).send({
                "message": `Error while geting record ${err}`
            });
        }
        User.count({}, (err, count) => {
            console.log(count);
        })
        return res.send(op);
    });
};

export const createUser = (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let newUser = new User(req.body);
    newUser.save((err, op) => {
        if (err) {
            return res.status(422).send({
                "message": `Error while saving user ${err}`
            });
        }
        return res.status(201).send(op);
    })
};


export const updateUser = (req, res) => {
    User.count({
        '_id': req.params.id
    }, (err, op) => {
        if (err) {
            return res.status(422).send({
                'message': 'error'
            });
        }
        //console.log(op);
        let user = {
            name: req.body.name,
            email: req.body.email,
        }
        User.updateOne({
            '_id': req.params.id
        }, user, (err, op) => {
            if (err) {
                return res.status(422).send({
                    'message': 'error'
                });
            }
            return res.send(op);
        })

    })
};

export const deleteUser = (req, res) => {
    if (req.params.id == 'all') {
        console.log(req.params.id);
        User.deleteMany({}, (err, op) => {
            if (err) {
                return res.status(422).send({
                    "message": "error"
                });
            }
            return res.send(op);
        });
    } else if (isNumber(req.params.id)) {
        User.findByIdAndDelete(req.params.id, (err, op) => {
            if (err) {
                return res.status(422).send({
                    "message": "error"
                });
            }
            return res.send(op);
        })
    }
};

export const authenticate = (req, res, next) => {
    User.findOne({
        'email': req.body.email
    }, (err, userInfo) => {
        if (err) {
            res.status(422).send({
                message: 'Error while processing request'
            });
        } else {
            if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({
                    id: userInfo._id
                }, req.app.get('secretKey'), {
                    expiresIn: '1h'
                });
                res.status(200).send({
                    token: token
                })
            } else {
                res.status(404).send({
                    message: 'user not found'
                });
            }
        }
    });

}