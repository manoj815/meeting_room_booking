import mongoose from 'mongoose';
import UserSchema from '../models/User';
import Location from '../models/OrgLocation';
import Organization from '../models/Organization';
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

    User.find().populate('Location').exec((err, op) => {
        if (err) {
            return res.json({
                status: 'error',
                message: 'error while retrieving user',
                data: null
            });
        }
        return res.status(200).json({
            status: 'success',
            message: '',
            data: op
        });
    })
};

export const getUserById = (req, res) => {
    User.findById(req.params.id, (err, op) => {
        if (err) {
            res.status(404).json({
                "message": `Error while geting record ${err}`
            });
        }
        if (op.orgId) {
            Organization.find({
                    _id: op.orgId
                }, {
                    $push: {
                        Organization: lop
                    }
                },
                (err, org) => {
                    if (err) {
                        return res.status(422).json({
                            "message": `${err} Error while retreiving organization`
                        });
                    }
                    if (org) {
                        res.status(201).json(org);

                    }
                });
        }
        User.count({}, (err, count) => {
            console.log(count);
        })
        return res.status(200).json({
            status: 'success',
            message: '',
            data: op
        });
    });
};

export const createUser = (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    let newUser = new User(req.body);
    newUser.save((err, op) => {
        if (err) {
            return res.status(422).json({
                status: 'error',
                message: `Error while saving user ${err}`,
                data: null
            });
        }

        return res.status(201).json({
            status: 'success',
            message: '',
            data: op
        });
    })
};


export const updateUser = (req, res) => {
    User.count({
        '_id': req.params.id
    }, (err, op) => {
        if (err) {
            return res.status(422).json({
                status: 'error',
                message: 'user not found',
                data: null
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
                return res.status(422).json({
                    status: 'error',
                    message: 'error',
                    data: null
                });
            }
            return res.status(200).json({
                status: 'success',
                message: '',
                data: op
            });
        })

    })
};

export const deleteUser = (req, res) => {
    if (req.params.id == 'all') {
        let orgId = '';
        if (req.body.user_role == 'SUPER_ADMIN_ROLE') {
            orgId = req.body.orgId;
        }
        if (req.body.user_role == 'ADMIN_ROLE') {
            orgId = req.body.organization;
        }
        if (orgId == '') {
            return res.status(422).json({
                status: 'error',
                message: 'Organization Id id not provided',
                data: null
            });
        }
        User.deleteMany({
            orgId: orgId,
            _id: {
                $ne: 1
            }
        }, (err, op) => {
            if (err) {
                return res.status(422).json({
                    status: 'error',
                    message: 'error while deleting user',
                    data: null
                });
            }
            return res.status(200).json({
                status: 'success',
                message: '',
                data: op
            });
        });
    } else if (isNumber(req.params.id)) {
        if (req.body.id == req.params.id || req.body.user_role == 'ADMIN_ROLE') {
            User.findByIdAndDelete(req.params.id, (err, op) => {
                if (err) {
                    return res.status(422).json({
                        status: 'error',
                        message: "user not found",
                        data: null
                    });
                }
                res.status(200).json({
                    status: 'success',
                    message: '',
                    data: op
                });
            })
        }
    }
};

export const authenticate = (req, res, next) => {
    //Validation
    //Select hidden password
    User.findOne({
        'email': req.body.email
    }).select('+password').exec((err, userInfo) => {
        if (err) {
            res.status(422).json({
                message: 'Error while processing request'
            });
        } else {
            if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({
                    id: userInfo._id
                }, req.app.get('secretKey'), {
                    expiresIn: '1h'
                });
                res.status(200).json({
                    status: 'success',
                    message: '',
                    data: {
                        token: token
                    }
                })
            } else {
                res.status(404).json({
                    status: 'success',
                    data: null,
                    message: 'user not found'
                });
            }
        }
    });

}