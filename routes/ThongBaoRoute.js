const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ThongBao = mongoose.model('ThongBao');
require('dotenv').config();

//Tạo một phản ánh
router.post('/ThongBao/create', async (req, res) => {
    const { 
    noidung,
    trangthai,
    userID,
    phut,
    gio,
    ngay,
    thang, 
    nam,
    noidungphananh, 
    hinhanh, 
    vitri, 
    thoigian} = req.body;
    const thongBao = new ThongBao({
        noidung,
        trangthai,
        userID,
        phut,
        gio,
        ngay,
        thang,
        nam,
        noidungphananh, 
        hinhanh, 
        vitri, 
        thoigian
    })
    thongBao.save().then((createThongBao => {
        res.status(201).json(createThongBao)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})
//Láy danh sách thong bao
router.get('/ThongBao/', async(req, res)=>{
    const DanhSachThongBao = await ThongBao.find().select();
    if(!DanhSachThongBao){
        res.status(500).json({success:false});
    }
    res.send(DanhSachThongBao);
})
module.exports = router;

// tim thong bao cua user do thoi 
router.get('/thongbao/:userID', async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const thongBao = await ThongBao.find({ userID: userID }).exec();
    if (thongBao.length === 0) {
      // Nếu không tìm thấy thông báo nào
      return res.status(404).json({
        message: 'Thông báo không tìm thấy',
      });
    }
    // Trả về thông báo tìm thấy
    res.status(200).json(thongBao);
  } catch (err) {
    // Xử lý lỗi nếu có
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// chỉnh sửa thông báo
router.put('/thongbao/update/:id', async (req, res) => {
  const id = req.params.id;
  const fdata= req.body;
  const options = { new: true };
  const thongbao = await ThongBao.findByIdAndUpdate(id, fdata, options);
  res.json(thongbao);
})
