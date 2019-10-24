import mongoose from 'mongoose';
import roomSchema from '../models/Room';

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
    Room.findById(req.param.id, (err, op) => {
        if (err) {
            res.status(422).send({
                'message': 'error while retrieving rooms'
            });
        }
        res.status(200).send(op);
    })
};

export const createRoom = (req, res) => {
    let errors = [];
    if (req.body.name == '') {

    }
    let room = new Room(req.body);
    Room.save({}, (err, op) => {
        if (err) {
            res.status(422).send({
                'message': 'error while retrieving rooms'
            });
        }
        res.status(200).send(op);
    });

};

export const updateRoom = (req, res) => {
    let room = new Room(req.body);
    Room.findByIdAndUpdate(req.param.id, room, (err, op) => {
        if (err) {
            res.status(422).send({
                'message': 'error while retrieving rooms'
            });
        }
        res.status(200).send(op);
    });

}

export const deleteRoom = (req, res) => {
    Room.findByIdAndDelete(req.param.id, (err, op) => {
        if (err) {
            res.status(422).send({
                'message': 'error while retrieving rooms'
            });
        }
        res.status(200).send(op);
    });

}