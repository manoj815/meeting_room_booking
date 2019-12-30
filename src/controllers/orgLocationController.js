import mongoose from "mongoose";
import {
    Location
} from '../models/OrgLocation';
import {
    Organization
} from "../models/Organization";


export const getLocations = (req, res) => {
    let id = 2;
    // Location.find({
    //     _id: id
    // }).populate('locationName').exec(function (err, loc) {
    //     console.log( err);
    //     console.log(loc);
    //     //console.log('Story creator', Location.organization.organizationName);
    // });

    Location.find({
        _id: Number(id)
    }).populate('organizationName').exec((err, op) => {
        if (err) {
            console.log(Number(2));
            return res.status(422).json({
                status: 'error',
                message: err + 'Error while fetching organization',
                data: null,
            });
        }
        res.status(200).json({
            status: 'success',
            message: '',
            data: op
        });
    })

}

/*export const createLocation = (req, res) => {
    let location = new Location(req.body);
    console.log(req.body);
    location.save((err, op) => {
        console.log(err);
        if (err) {
            return res.status(422).status({
                "message": "Error while saving organization"
            });
        }

        return res.status(200).json(op);
    })

}*/
export const createLocation = (req, res) => {
    const location = new Location();
    location.orgId = req.body.orgId;
    location.locationName = req.body.locationName;
    location.address = req.body.address;
    location.save()
        .then((result) => {
            Organization.findOneAndUpdate({
                _id: result.orgId
            }, {
                $push: {
                    Locations: result
                }
            }, (err, org) => {
                if (err) {
                    return res.status(422).status({
                        status: 'error',
                        message: `${err} Error while saving organization`,
                        data: null
                    });
                }
                if (org) {
                    res.status(201).json(result);

                }
            });
        })
};

export const updateLocation = (req, res) => {
    if (req.body.user_role == 'ADMIN_ROLE' &&
        req.body.organization != req.body.req.params.id) {
        return res.status(422).json({
            status: 'error',
            message: 'requested organization not found',
            data: null
        })
    }

    return res.status(200).json({
        message: "working"
    });
}

export const deleteLocation = (req, res) => {
    let locId = req.params.id;
    if (req.body.user_role == 'ADMIN_ROLE' &&
        req.body.organization != req.body.req.params.id) {
        return res.status(422).json({
            status: 'error',
            message: 'requested organization not found',
            data: null
        })
    }
    Location.findByIdAndDelete(locId, (err, op) => {
        if (err) {
            res.status(422).status({
                status: 'error',
                message: "error while deleting location",
                data: null
            })
        }
        res.status(200).status({
            status: 'success',
            message: "location deleted successfully",
            data: null
        })
    });


}