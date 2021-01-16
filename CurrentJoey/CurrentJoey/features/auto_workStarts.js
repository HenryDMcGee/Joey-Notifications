

var schedule = require('node-schedule');
 
let workStart_enabled = true;

var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 5)];
    rule.hour = 9;
    rule.minute = 0;

module.exports = function ( controller ) {
    // var j = schedule.scheduleJob('* 12 * * 1-5', async (trigger) => {
    // var j = schedule.scheduleJob('0 9 * * 1-5', async (trigger) => {
    var j = schedule.scheduleJob(rule, async (trigger) => {
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(1, 5)];
        rule.hour = 9;
        rule.minute = 0;
        // there's a user id somewhere in this trigger
        // let user = trigger.userid;
        axios.get('http://localhost:4000/workStart')
        .then(function (response) {
            // handle success
            console.log(response);
            workStart_enabled = response.data.workStart_enabled
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        if (workStart_enabled){
            try {
                // spawn a bot
                let bot = await controller.spawn();

                // await bot.startConversationWithUser(user);
                await bot.startConversationInRoom("Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vZmQzZjgyMTAtNTI2ZS0xMWViLWI1ZDktYzE0MzdmMzhmZmFk", "");

                await bot.say("Work starts! ");

                await bot.beginDialog(ALERT_DIALOG);
            } catch (error) {
                
            }
        }
    });
}