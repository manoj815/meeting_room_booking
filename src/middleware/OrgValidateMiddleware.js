import mongoose from 'mongoose';
import OrgSchema from '../models/Organization';
import {
    check
} from 'express-validator';

const Org = mongoose.model('Organization', OrgSchema);

var query = '';

const checkOrg = async (org_name, req) => {
    var result = null;
    if (req.params.id) {
        query = {
            organizationName: org_name,
            _id: {
                $ne: req.params.id
            }
        }
    } else {
        query = {
            organizationName: org_name
        }
    }
    console.log("loggin",query)
    await Org.findOne(query, (er, op) => {
        if (op != null) {
            result = true;
        } else {
            result = false;
        }
    });

    return result;
}
export const validateOrg = [
    check('organizationName').not().isEmpty().withMessage('Name cant be empty'),
    check('pinCode').not().isEmpty().withMessage('Pincode cant be empty'),
    check('organizationName').custom((value, {
        req
    }) => {

        return new Promise(function (resolve, reject) {
            checkOrg(value, req).then(token => {
                if (Boolean(token)) {
                    reject(new Error('Organization name already in use'))
                }
               // console.log(22)
                resolve(true)
            })
        })
    }),

];