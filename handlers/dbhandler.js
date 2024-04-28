const mongoose = require('mongoose');
const DBNAME="dev-test";

const connect_to_db = URI =>{
    let state = 'unresolved'
    console.info(`Attempting to connect to mongo database @ URI: \n${URI}`)
    mongoose.connect(URI, {
        DBNAME
    })
        .then(result => {
            state = 'established!'
        })
        .catch(err=>{
            console.error('\n',err,'\n');
            state= 'unresolved!'
        })
        .finally(()=>{
            console.info(`Connection attempt finished! Connection to database ${state}`)
        })
}
module.exports={
    connect_to_db,
}