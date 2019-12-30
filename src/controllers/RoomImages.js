import 
    mongoose
 from 'mongoose';
import 
    roomImagesSchema
 from '../models/RoomImages';

import { upload } from '../middleware/UploadImage';

const RoomImages = mongoose.model('RoomImages', roomImagesSchema);

export const getAllRoomImages = (req, res) => {
  res.json(200).send({"message":"ok"})
}

export const uploadRoomImages = (req, res) => {
    res.json(200).send({"message":"ok"})
}

export const deleteRoomImages = (req, res) => {
    res.json(200).send({"message":"ok"})
}