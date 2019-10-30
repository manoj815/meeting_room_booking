import mongoose from 'mongoose';
import UserSchema from '../models/Room';
import {
    check,
    validationResult,
    body,
    buildCheckFunction
} from 'express-validator';

const Room = mongoose.model('Room', UserSchema);


const checkRoom = async (room_name) => {
    var result = null;
    await Room.findOne({
        roomName: room_name
    }, (er, op) => {

        if (op != null) {
            result = true;
        } else {
            result = false;
        }
    });

    return result;
}
export const validateRoom = [
    check('roomName').not().isEmpty().withMessage('Name cant be empty'),
    check('capacity').not().isEmpty().withMessage('Room Capacity cant be empty'),
    check('roomName').custom(value => {
        return new Promise(function (resolve, reject) {
             
            checkRoom(value).then(token => {
                if (Boolean(token)) {
                    reject(new Error('Room name already in use'))
                }
                resolve(true)
            })
        })
    }),
     
];