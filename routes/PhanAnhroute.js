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
        userID,
        phut,
        gio,
        ngay,
        thang,
        nam } = req.body;
    const phanAnh = new PhanAnh({
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
router.get('/PhanAnh/', async (req, res) => {
    const DanhSachPhanAnh = await PhanAnh.find().select();
    if (!DanhSachPhanAnh) {
        res.status(500).json({ success: false });
    }
    res.send(DanhSachPhanAnh);
})
//Xóa danh sách phản ánh
router.delete('/PhanAnh/delete/:id', async (req, res) => {
    const id = req.params.id;
    const XoaPhanAnh = await PhanAnh.findByIdAndDelete(id);
    res.json(XoaPhanAnh);
});


// Dem so luong phan anh co trang thai bang 0
router.get('/PhanAnhKhan/count', async (req, res) => {
    try {
        const count = await PhanAnh.countDocuments({ trangthai: 0 });
        res.json(count);
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false
        });
    }
});
// Dem so luong phan anh co trang thai bang 1
router.get('/PhanAnhChuaXuLi/count', async (req, res) => {
    try {
        const count = await PhanAnh.countDocuments({ trangthai: 1 });
        res.json(count);
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false
        });
    }
});
//dem phan anh chua xu li  theo thang nam 
router.get('/PhanAnhChuaXuLi/count/:month/:year', async (req, res) => {
    const { year, month } = req.params;
    try {
        const count = await PhanAnh.countDocuments({
            thang: parseInt(month),
            nam: parseInt(year),
             trangthai: 1 
        });
        res.json(count);
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false
        });
    }
});

//dem phan anh khan  theo thang nam 
router.get('/PhanAnhKhan/count/:month/:year', async (req, res) => {
    const { year, month } = req.params;
    try {
        const count = await PhanAnh.countDocuments({
            thang: parseInt(month),
            nam: parseInt(year),
             trangthai: 0 
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