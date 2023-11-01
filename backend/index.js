const express = require("express");
const env = require('./config/envConfig');
const connect = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cors = require('cors');

const app = express();

//database connection
connect();

app.use(cors());
//middeleware

app.use(express.json());

app.get("/", (req, res) => {
    res.json({msg: 'welcome to big Mart !!!!!!!'});
});

//user routes

app.use('/api',userRoutes);
app.use('/api', categoryRoutes);

const port = env.PORT || 5000;

app.listen(port, () => {
    console.log(`your server is runnig at port number: ${port}`);
});