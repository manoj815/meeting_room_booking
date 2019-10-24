import mongoose from 'mongoose';
//import 
const Schema = mongoose.Schema;
const BookingSchema = new Schema({
    _id: {
        type: Number,
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Room name is required']
    },
    phone: {

    },

    duration: {

    },

    status: {

    }


});