const mongoose = require('mongoose')

const userSchema = mongoose.Schema({        //스키마생성
    name:{
        type : String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,         //스페이스 없애줌
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role:{                  //관리자랑 일반유저 나눌라고
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp:{
        type: Number
    }

})

const User = mongoose.model('User', userSchema) //모델생성->스키마 감싸주는것

module.exports = {User}                         //외부에서 User쓸수 있도록