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
    thoigianxuli} = req.body;
    const phanAnhHoanThanh = new PhanAnhHoanThanh({
        noidung,
        trangthai,
        latitudeDelta,
        longitudeDelta,
        vitri,
        hinhanh,
        thoigianxuli
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

router.get('/PhanAnhHoanThanh/', async(req, res)=>{
    const DanhSachPhanAnhHoanThanh = await PhanAnhHoanThanh.find().select();
    if(!DanhSachPhanAnhHoanThanh){
        res.status(500).json({success:false});
    }
    res.send(DanhSachPhanAnhHoanThanh);
})

router.delete('/PhanAnhHoanThanh/delete/:id', async (req, res) => {
    const id = req.params.id;
    const XoaPhanAnh = await PhanAnhHoanThanh.findByIdAndDelete(id);
    res.json(XoaPhanAnh);
  });

module.exports = router;