const nodecron=require('node-cron');
const RefreshToken=require('../models/RefreshToken');

// Defaults to run every day at 00:00, but can be reconfigured
// Could implement a register and register(function);
function startScheduler(minutesOfDay='0', hourOfDay='0', dayOfMonth='*', month='*', dayOfWeek='*' ){
    //Call the cleanupfunction from the RefreshToken model
    const cronstring = `${minutesOfDay} ${hourOfDay} ${dayOfMonth} ${month} ${dayOfWeek}`;
    console.log("Starting schedule according to cronstring:",cronstring)
    nodecron.schedule(cronstring, ()=>{
        RefreshToken.cleanUpExpiredRefreshTokens(1000);
    });
}

module.exports={
    startScheduler
};