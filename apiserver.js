require('dotenv').config();
const express = require('express');
const app = express();
const default_routes=require('./routes/default_routes');
const user_api=require('./routes/api_user_routes');

const {connect_to_db
} = require('./handlers/dbhandler');

const PORT = process.env.PORT || 3000;
const DBURI = process.env.DBURI || '';

//setup bodyparsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(default_routes);
app.use(user_api);

app.listen(PORT, ()=>{
    console.log(`Revving engine...`);
    console.log(`Server started at port ${PORT}\n------------------------------------`);
    connect_to_db(DBURI);    
});