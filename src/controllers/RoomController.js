import mongoose from 'mongoose';
import roomSchema from '../models/Room';
import {
    validationResult
} from 'express-validator';

const Room = mongoose.model('Room', roomSchema);
export const getAllRooms = (req, res) => {
    Room.find({}, (err, op) => {
        if (err) {
            res.status(422).send({
                'message': 'error while retrieving rooms'
            });
        }
        res.status(200).send(op);
    })
};

export const getRoomById = (req, res) => {

    Room.findById(req.params.id, (err, op) => {
        if (err) {
            res.status(422).send({
                'message': 'error while retrieving rooms'
            });
        }

        res.status(200).send(op);
    })
};

export const createRoom = (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    let room = new Room(req.body);
    room.save({}, (err, op) => {
        if (err) {
            res.status(422).send({
                'message': `error while retrieving rooms ${err}`
            });
        }
        res.status(200).send(op);
    });

};
new Date().toISOString();

export const updateRoom = (req, res) => {
    let room = new Room(req.body);
    Room.findByIdAndUpdate(req.params.id, {
            $set: {
                roomName: req.body.roomName,
                capacity: req.body.capacity,
                status: req.body.status
            }
        }, // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {
            new: true
        },
        function (err, op) {
            if (err) {
                res.status(422).send({
                    'message': 'error while updating rooms'
                });
            }
            res.status(200).send(op);
        }

    );
}

export const deleteRoom = (req, res) => {
    Room.findByIdAndRemove(req.params.id, (err, op) => {
        if (err) {
            res.status(422).send({
                'message': 'error while retrieving rooms'
            });
        }

        res.status(200).send({
            message: `Room id ${req.params.id}  sucuessfully deleted`
        });
    });

}