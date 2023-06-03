const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PhanAnhDangXuLi = mongoose.model('PhanAnhDangXuLi');
require('dotenv').config();


router.post('/PhanAnhDangXuLi/create', async (req, res) => {
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
    nam } = req.body;
    const phanAnhDangXuLi = new PhanAnhDangXuLi({
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
    phanAnhDangXuLi.save().then((createPhanAnh => {
        res.status(201).json(createPhanAnh)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

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

module.exports = router;