const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { networkInterfaces } = require('os');
const saltRounds = 10

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


// Before saving User information
userSchema.pre('save', function(next){   
    var user = this;
   
    // Only when user modify the password
    if(user.isModified('password')){      
        // Hash a password 
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt){            
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)

                user.password=hash
                next()
            })
        })
        }
        else{
            next()
    }   
})

const User = mongoose.model('User', userSchema) //모델생성->스키마 감싸주는것

module.exports = {User}                         //외부에서 User쓸수 있도록