const mongoose = require('mongoose');
const {DB_USER, DB_PASS, DB_HOST} = require('./constanst');

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
const options = {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology: true
};

mongoose.connect(url,options)
    .then(db => console.log(`connected to: ${db.connection.name}`))
    .catch(err => console.log(`connection error: ${err}`));