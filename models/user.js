const mongoose = require('mongoose');
const {hash, compare} = require('bcrypt');
require('../db');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        require: true,
        minlength: 3
    },
    name: {
        type: String,
        require: true,
        minlength: 3
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    }
});

const User = mongoose.model('users', UserSchema);

User.signUp = function(email, password, name) {
    return hash(password, 8)
    .then(encrypted => {
        const user = new User({email, name, password: encrypted});
        return user.save()
    });
}

User.signIn = async function(email, password) {
    const user = await User.findOne({email});
    if(!user) throw new Error('Email khong ton tai.');
    const same = await compare(password, user.password);
    if(!same) throw new Error('Sai password.');
    return {email: user.email, name: user.name};
};

//User.signUp('abcdefgh@gmail.com', '123456', 'abcdefgh');
// User.find(function(err, user){
//     if(err) return console.log(err);
//     console.log(user);
// })
// User.signIn('abcd@gmail.com', '123456')
// .then(()=> console.log('Dang nhap thanh cong'))
// .catch(err => console.log('Dang nhap that ba:i '+ err.message));

module.exports = User;