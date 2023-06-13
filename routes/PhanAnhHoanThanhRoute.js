const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PhanAnhHoanThanh = mongoose.model('PhanAnhHoanThanh');
require('dotenv').config();


router.post('/PhanAnhHoanThanh/create', async (req, res) => {
    const { noidung,
        trangthai,
        latitudeDelta,
        longitudeDelta,
        vitri,
        hinhanh,
        userID,
        thoigianxuli,
        ngay,
        thang,
        nam } = req.body;
    const phanAnhHoanThanh = new PhanAnhHoanThanh({
        noidung,
        trangthai,
        latitudeDelta,
        longitudeDelta,
        vitri,
        hinhanh,
        userID,
        thoigianxuli,
        ngay,
        thang,
        nam
    })
    phanAnhHoanThanh.save().then((createPhanAnh => {
        res.status(201).json(createPhanAnh)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

router.get('/PhanAnhHoanThanh/', async (req, res) => {
    const DanhSachPhanAnhHoanThanh = await PhanAnhHoanThanh.find().select();
    if (!DanhSachPhanAnhHoanThanh) {
        res.status(500).json({ success: false });
    }
    res.send(DanhSachPhanAnhHoanThanh);
})

router.delete('/PhanAnhHoanThanh/delete/:id', async (req, res) => {
    const id = req.params.id;
    const XoaPhanAnh = await PhanAnhHoanThanh.findByIdAndDelete(id);
    res.json(XoaPhanAnh);
});
// Dem so luong phan anh hoan thanh 
router.get('/PhanAnhHoanThanh/count', async (req, res) => {
    try {
        const count = await PhanAnhHoanThanh.countDocuments();
        res.json(count);
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false
        });
    }
});

// Dem so luong phan anh hoan thanh theo thang nam
router.get('/PhanAnhHoanThanh/count/:month/:year', async (req, res) => {
    const { year, month } = req.params;

    try {
        const count = await PhanAnhHoanThanh.countDocuments({
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