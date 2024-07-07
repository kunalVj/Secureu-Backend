const mongoose =  require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next();
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;