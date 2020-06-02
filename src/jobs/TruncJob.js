var schedule = require('node-schedule');
const {truncLogTable} = require('../services/configurationService');
 
schedule.scheduleJob('1 0 * * *', function(){
  console.log('cleaning log table!');
  truncLogTable();
});