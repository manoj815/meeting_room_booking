import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
import Organization from './Organization';
import Location from './OrgLocation';



const Schema = mongoose.Schema;
const saltRounds = 10;

var roles = {
    values: ['SUPER_ADMIN', 'ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not valid role'
};

const UserSchema = new Schema({
        _id: {
            type: Number,
        },
        Organization: {
            ref: 'Organization',
            type: Number,

        },
        Location: {
            ref: 'Location',
            type: Number,
        },
        name: {
            type: String,
            required: [true, 'This field is required'],
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'This field is required'],
            index: true
        },
        password: {
            type: String,
            required: [true, 'This field is required'],
            select: false,
        },
        role: {
            type: String,
            required: true,
            default: 'USER_ROLE',
            enum: roles,
        },
        phoneNo: {
            type: String
        },
        address: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        status: {
            type: Number,
            default: 0,
        },
        createdOn: {
            type: Date,
            default: Date.now
        }
    },
    //  {
    //     _id: false
    // }
);

UserSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
});


// Use pre middleware for _id autoincrement and make password hash
// Arrow Operator will not work in this case
UserSchema.pre('save', function (next) {

    const userModel = mongoose.model('User', UserSchema);
    // Only increment when the document is new
    if (this.isNew) {
        userModel.countDocuments().then(res => {
            this._id = res + 1;
            this.password = bcrypt.hashSync(this.password, saltRounds);
            next();
        });
    }
    //next();
});


export default UserSchema;
//module.exports = mongoose.model('User', UserSchema);