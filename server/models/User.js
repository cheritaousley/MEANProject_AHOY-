var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error;
var bcrypt = require('bcrypt-as-promised');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: true,
        validate: {
            validator: function validateEmail(email) 
            {
                var re = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                return re.test(email);
            }
        }
    },
    fullname: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    displayname: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    channels: [{
        type: Schema.Types.ObjectId,
        ref: 'Channel',
    }],
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team',
    }],
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat',
    }],
}, { timestamps: true });

UserSchema.pre('save', function (done) {
    console.log("IN START OF PRE FUNCTION")
    bcrypt.hash(this.password, 10)
        .then(hashed_password => { //this is the hashed password! now set what the user has just entered in here as this hashed password
            console.log("HASHED PASS")
            console.log(hashed_password)
            this.password = hashed_password;
            done();
        })
        .catch(error => {
            done();
        });
    }),

mongoose.model('User', UserSchema);
var User = mongoose.model('User');