const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PhanAnhDangXuLi = mongoose.model('PhanAnhDangXuLi');
require('dotenv').config();
// tao mot phan anh dang xu li 
router.post('/PhanAnhDangXuLi/create', async (req, res) => {
    const { noidung,
    trangthai,
    latitudeDelta,
    longitudeDelta,
    vitri,
    hinhanh,
    userID,
    phut,
    gio,
    ngay,
    thang,
    nam } = req.body;
    const phanAnhDangXuLi = new PhanAnhDangXuLi({
        noidung,
        trangthai,
        latitudeDelta,
        longitudeDelta,
        vitri,
        hinhanh,
        userID,
        phut,
        gio,
        ngay,
        thang,
        nam
    })
    phanAnhDangXuLi.save().then((createPhanAnh => {
        res.status(201).json(createPhanAnh)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})
// lay toan bo phan anh co tren he thong 
router.get('/PhanAnhDangXuLi/', async(req, res)=>{
    const DanhSachPhanAnhDangXuLi = await PhanAnhDangXuLi.find().select();
    if(!DanhSachPhanAnhDangXuLi){
        res.status(500).json({success:false});
    }
    res.send(DanhSachPhanAnhDangXuLi);
})

router.delete('/PhanAnhDangXuLi/delete/:id', async (req, res) => {
    const id = req.params.id;
    const XoaPhanAnh = await PhanAnhDangXuLi.findByIdAndDelete(id);
    res.json(XoaPhanAnh);
  });
// Dem so luong phan anh dang xu li
router.get('/PhanAnhDangXuLi/count', async (req, res) => {
    try {
        const count = await PhanAnhDangXuLi.countDocuments();
        res.json(count);
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false
        });
    }
});
//dem phan anh dang xu li  theo thang nam 
router.get('/PhanAnhDangXuLi/count/:month/:year', async (req, res) => {
    const { year, month } = req.params;
    try {
        const count = await PhanAnhDangXuLi.countDocuments({
            thang: parseInt(month),
            nam: parseInt(year)
        });
        res.json(count);
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false
        });
    }
});
module.exports = router;