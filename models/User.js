const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    name :{
        type:String ,
        require : true,
    },
    email :{
        type:String ,
        require : true,
        unique : true
    },
    phone:{
        type:String ,
        require : true,
    },
    password :{
        type:String ,
        require : true,
    },
    keycode :{
        type:String ,
        require : true,
    },
    role:{
        type : String,
        require : true
    },
    image:{
        type : String,
        require : true
    },
})

userSchema.pre('save', async function (next){
    const user = this;
    console.log("Just before saving before hashing", user.password);
    if(!user.isModified('password')){
        return next();
    }
    user.password = await bcrypt.hash(user.password , 8);
    console.log (" Just before saveing & after hashing", user.password);
    next();
})

mongoose.model("User", userSchema);