const mongoose = require('mongoose');
const PhanAnhSchema = new mongoose.Schema({
    noidung :{
        type : String,
        require : true 
    },
    trangthai:{
        type : Number,
        require: true
    },
    vitri : {
        type : String,
        require: true
    },
    longitudeDelta : {
        type : Number,
        require: true
    },
    latitudeDelta : {
        type: String,
        require:true
    },
    hinhanh : {
        type : String,
        require: true
    },
    userID : {
        type : String , 
        require : true
    },
    phut:{
        type : Number,
        require: true
    },
    gio:{
        type : Number,
        require: true
    },
    ngay:{
        type : Number,
        require: true
    },
    thang:{
        type : Number,
        require: true
    },
    nam:{
        type : Number,
        require: true
    },
    
    


})
mongoose.model("PhanAnh", PhanAnhSchema)