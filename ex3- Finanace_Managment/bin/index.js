const express = require('express');
const app = express();
const logger = require('morgan');
require('../config/db');

const port = process.env.PORT || 3030;
const {userRouter,adminRouter} = require('../router/routes');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger('dev'));

app.use('/user',userRouter);
app.use('/admin',adminRouter);

app.use((err,res) => {
    console.error(err.stack);
    res.status(500).send(err);
});

app.listen(port,()=>{
    console.log('Express server is running on port ', port);
});