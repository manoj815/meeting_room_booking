import
express
from 'express';

import {
    getAllRoomImages,
    uploadRoomImages,
    deleteRoomImages
} from '../controllers/RoomImages';

const RoomImagesRoute = new express();

RoomImagesRoute.get('/', getAllRoomImages);
RoomImagesRoute.post('/', uploadRoomImages);
RoomImagesRoute.delete(':id', deleteRoomImages);

export default RoomImagesRoute;