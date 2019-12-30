var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var mailSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    from_name: {
        type: String,
        required: false
    },
    from_email: {
        type: String,
        required: false
    },
    subject: {
        type: String,
        required: false
    },
    content: {
        type: [],
        required: false
    },
    placeholder: {
        type: String,
        required: false
    },
    mail_placeholder: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },

});

module.exports = mongoose.model("mail", mailSchema, 'email_templates');