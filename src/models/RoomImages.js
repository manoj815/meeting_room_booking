import mongoose from 'mongoose';
const Schema = mongoose.Schema();
const RoomImagesSchema = new Schema({
    _id: {
        type: number,
    },
    imageUrl: {
        type: String,
        required: [true, 'Room image is required']
    }
});

export default RoomImagesSchema;