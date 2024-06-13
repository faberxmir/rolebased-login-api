require('dotenv').config();
const appEventHandler = require('./handlers/appEventHandler');
const express = require('express');
const app = express();
const default_routes=require('./routes/default_routes');
const user_routes=require('./routes/user_routes');
const admin_routes=require('./routes/admin_routes')

const {startScheduler}=require('./services/scheduler');

const {enableRedis}=require('./handlers/redishandler')

const {
    mongoConnect
} = require('./handlers/dbhandler');

const PORT = process.env.PORT || 3000;
const DBURI = process.env.DBURI || '';

//setup bodyparsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Routes
app.use(default_routes);
app.use(user_routes);
app.use('/admin', admin_routes)

app.listen(PORT, ()=>{
    console.log(`Revving engine...`);
    console.log(`Server started at port ${PORT}\n------------------------------------`);
    mongoConnect(DBURI);   
    enableRedis(); 
    
    startScheduler();
});