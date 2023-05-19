const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongo_URL).then(

    ()=>{
        console.log('Kết nối cơ sở dữ liệu thành công');
    }
).catch((err)=>{
    console.log('Kết nối thất bại' +  err);
})