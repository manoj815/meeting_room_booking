//import mongoose from 'mongoose';
import moment from 'moment';
import {
    Organization
} from '../models/Organization';
import {
    Location
} from '../models/OrgLocation';
import {
    validationResult
} from 'express-validator';
import {
    log
} from '../helpers/Log';

//const Organization = mongoose.model('Organization', organizationSchema);

export const createOrganization = (req, res) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    let data = {
        "organizationName": req.body.organizationName,
        "logo": req.file.filename,
        "status": false,
        // "createdAt": moment().format('YYYY-mm-DD h:mm:ss')
    };

    let newOrganization = new Organization(data);
    newOrganization.save((err, op) => {
        if (err) {
            return res.status(422).json({
                status: 'error',
                message: "Error while saving organization",
                data: null
            });
        }
        let locData = {
            "locationName": req.body.organizationName,
            "address": req.body.address,
            "email": req.body.email,
            "contactNo": req.body.contactNo,
            "city": req.body.city,
            "state": req.body.state,
            "country": req.body.country,
            "pinCode": req.body.pinCode,
            "orgId": op._id,
            "status": false,
            // "createdAt": moment().format('YYYY-mm-DD h:mm:ss')
        };
        let orgLoc = new Location(locData);
        orgLoc.save((err, lop) => {
            if (err) {
                return res.status(422).json({
                    status: 'error',
                    message: `${err} Error while saving location`,
                    data: null
                });
            }
            Organization.findOneAndUpdate({
                    _id: lop.orgId
                }, {
                    $push: {
                        Locations: lop
                    }
                },
                (err, org) => {
                    if (err) {
                        return res.status(422).json({
                            status: 'error',
                            message: `${err} Error while saving organization`,
                            data: null
                        });
                    }
                    if (org) {
                        res.status(201).json({
                            status: 'success',
                            message: '',
                            data: org
                        });

                    }
                });

        });
    });
}

export const getOrganization = (req, res) => {
    // Organization.find(((err, op) => {
    Organization.find().populate('Locations').exec((err, op) => {
        if (err) {
            return res.status(422).json({
                status: 'error',
                message: `Error while fetching organization ${err}`,
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

export const putOrganization = (req, res) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    if (req.body.user_role == 'ADMIN_ROLE' &&
        req.body.organization != req.body.req.params.id) {
        return res.status(422).json({
            status: 'error',
            message: 'requested organization not found',
            data: null
        })
    }

    let data = {
        organizationName: req.body.organizationName,

        address: req.body.address,
        contactNo: req.body.contactNo,
        pinCode: req.body.pinCode,
        status: false,
        // createdAt: moment().format('YYYY-mm-DD h:mm:ss')
    };

    if (req.file != undefined) {
        data['logo'] = req.file.filename;
    }
    Organization.findById(req.params.id, (err, org) => {
        if (err) {
            return res.status(422).json({
                status: 'error',
                message: 'requested organization not found',
                data: null
            })
        }

        let update = {
            $set: data
        }
        Organization.updateOne({
            _id: req.params.id
        }, data, (err, op) => {
            if (err) {
                return res.status(422).json({
                    message: err + 'requested organization not found'
                })
            }

            res.status(201).json({
                status: 'success',
                message: '',
                data: op
            })
        })

    });
}

export const deleteOrganization = (req, res) => {
    if (req.body.user_role == 'ADMIN_ROLE' &&
        req.body.organization != req.body.req.params.id) {
        return res.status(422).json({
            status: 'error',
            message: 'requested organization not found',
            data: null
        })
    }
    Organization.findByIdAndDelete(req.params.id, (err, op) => {
        if (err) {
            return res.status(422).json({
                status: 'error',
                message: "organization not found",
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