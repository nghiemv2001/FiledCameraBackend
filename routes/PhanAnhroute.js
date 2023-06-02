const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PhanAnh = mongoose.model('PhanAnh');
require('dotenv').config();

//Tạo một phản ánh
router.post('/PhanAnh/create', async (req, res) => {
    const { noidung,
    trangthai,
    latitudeDelta,
    longitudeDelta,
    vitri,
    hinhanh,
    phut,
    gio,
    ngay,
    thang,
    nam} = req.body;
    const phanAnh = new PhanAnh({
        noidung,
        trangthai,
        latitudeDelta,
        longitudeDelta,
        vitri,
        hinhanh,
        phut,
        gio,
        ngay,
        thang,
        nam
    })
    phanAnh.save().then((createPhanAnh => {
        res.status(201).json(createPhanAnh)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})
//Láy danh sách phản ánh
router.get('/PhanAnh/', async(req, res)=>{
    const DanhSachPhanAnh = await PhanAnh.find().select();
    if(!DanhSachPhanAnh){
        res.status(500).json({success:false});
    }
    res.send(DanhSachPhanAnh);
})
//Xóa danh sách phản ánh

router.delete('/PhanAnh/delete/:id', async (req, res) => {
    const id = req.params.id;
    const XoaPhanAnh = await PhanAnh.findByIdAndDelete(id);
    res.json(XoaPhanAnh);
  });
module.exports = router;