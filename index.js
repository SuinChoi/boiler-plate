const express = require('express')
const app = express()
const port = 5000

const config =require('./config/key');
const {User} = require("./models/User")

//application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
//application/json
app.use(express.json());


const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { mongoURI } = require('./config/dev');
mongoose.connect(config.mongoURI,
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}) .then(()=>console.log('MongoDB Connected...'))
.catch(err => console.log(err))




app.get('/', (req, res)=> res.send("Hello Wordl!~안녕안녕"))


app.post('/register', (req, res)=> {

    // Get sign up information from Client
    // And then add it on DB
    const user = new User(req.body)

    user.save((err, userInfo)=>{
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success:true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))