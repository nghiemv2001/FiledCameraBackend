const mongoose = require('mongoose');
const ThongBaoSchema = new mongoose.Schema({
    noidung: {
        type: String,
        require: true
    },
    trangthai: {
        type: Number,
        require: true
    },
    userID: {
        type: String,
        require: true
    },
    phut: {
        type: Number,
        require: true
    },
    gio: {
        type: Number,
        require: true
    },
    ngay: {
        type: Number,
        require: true
    },
    thang: {
        type: Number,
        require: true
    },
    nam: {
        type: Number,
        require: true
    },
    noidungphananh: {
        type: String,
        require: true
    },
    hinhanh: {
        type: String,
        require: true
    },
    vitri: {
        type: String,
        require: true
    },
    thoigian: {
        type: String,
        require: true
    }
})
mongoose.model("ThongBao", ThongBaoSchema)