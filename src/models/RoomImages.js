import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const roomImagesSchema = new Schema({
    _id: {
        type: Number,
    },
    imageUrl: {
        type: String,
        required: [true, 'Room image is required']
    },
     
});

export default roomImagesSchema;