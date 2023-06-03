const express = require('express');
const port = 3000;

const app = express();
const bodyParser = require('body-parser');

require('./db');
require('./models/User');
require('./models/PhanAnh')
require('./models/PhanAnhDangXuLi')
require('./models/PhanAnhHoanThanh')

//auth
const authRoute = require('./routes/authRoute');
const phananhRoute = require('./routes/PhanAnhroute')
const phananhdangxuliRoute = require('./routes/PhanAnhDangXuLiroute')
const phananhhoanthanhRoute = require('./routes/PhanAnhHoanThanhRoute')

app.use(bodyParser.json());
app.use(authRoute);
app.use(phananhRoute)
app.use(phananhdangxuliRoute)
app.use(phananhhoanthanhRoute)
require('./db');
app.listen(port ,()=>{
    console.log(`Server is running on port  ${port}`);
})