const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParse = require('cookie-parser');
const productRoute = require('./routes/productRoute');
const authRoute = require('./routes/authRoute');

const app = express();

dotenv.config();

app.use(cookieParse());
app.use(cors());
app.use(express.json())

app.use('/api/v1/products', productRoute);
app.use('/api/v1/auth', authRoute);

app.listen(5000, () => {
    console.log('server is running at port 5000');
})
