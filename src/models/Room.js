import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    _id: {
        type: Number,

    },
    roomName: {
        type: String,
        unique: true,
        required: [true, 'Room name is required']
    },
    capacity: {
        type: Number,
        trim: true,
        required: [true, 'Room capacity is required']
    },
    // facilities: {
    //     type: Array,
    // },
    status: {
        type: Boolean,
        default: 0
    }
});

// Use pre middleware
// Arrow Operator will not work in this case
roomSchema.pre('save', function (next) {

    const roomModel = mongoose.model('Room', roomSchema);
    // Only increment when the document is new
    if (this.isNew) {
        roomModel.countDocuments().then(res => {
            this._id = res + 1;
            next();
        });
    }
    //next();
});

roomSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique',
})
export default roomSchema;