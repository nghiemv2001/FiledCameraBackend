const express = require('express');
const port = 3000;

const app = express();
const bodyParser = require('body-parser');

require('./db');
require('./models/User');

//auth
const authRoute = require('./routes/authRoute');

app.use(bodyParser.json());
app.use(authRoute);

require('./db');
app.listen(port ,()=>{
    console.log(`Server is running on port  ${port}`);
})