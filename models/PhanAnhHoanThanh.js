const mongoose = require('mongoose');
const PhanAnhHoanThanhSchema = new mongoose.Schema({
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
    thoigianxuli:{
        type : String,
        require : true
    }
})
mongoose.model("PhanAnhHoanThanh", PhanAnhHoanThanhSchema)