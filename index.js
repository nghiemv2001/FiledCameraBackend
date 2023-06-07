const express = require('express');
const port = 3000;

const app = express();
const bodyParser = require('body-parser');

require('./db');
require('./models/User');
require('./models/PhanAnh')
require('./models/PhanAnhDangXuLi')
require('./models/PhanAnhHoanThanh')
require('./models/ThongBao')

//auth
const authRoute = require('./routes/authRoute');
const phananhRoute = require('./routes/PhanAnhroute')
const phananhdangxuliRoute = require('./routes/PhanAnhDangXuLiroute')
const phananhhoanthanhRoute = require('./routes/PhanAnhHoanThanhRoute')
const thongBaoRoute = require('./routes/ThongBaoRoute')

app.use(bodyParser.json());
app.use(authRoute);
app.use(phananhRoute)
app.use(phananhdangxuliRoute)
app.use(phananhhoanthanhRoute)
app.use(thongBaoRoute)
require('./db');
app.listen(port ,()=>{
    console.log(`Server is running on port  ${port}`);
})