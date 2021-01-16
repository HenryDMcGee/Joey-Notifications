

var schedule = require('node-schedule');

let stretch_enabled = true;
let stretch_time = 15

var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 5)];
     rule.hour = [0, new schedule.Range(9, 17)];
     rule.minute = stretch_time;


module.exports = function ( controller ) {
    // var j = schedule.scheduleJob('* 12 * * 1-5', async (trigger) => {
    // var j = schedule.scheduleJob('0 9-17/1 * * 1-5', async (trigger) => {
    var j = schedule.scheduleJob(rule, async (trigger) => {
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(1, 5)];
        rule.hour = [0, new schedule.Range(9, 17)];
        rule.minute = stretch_time;

        // Request the latest bot parameters before triggering the bot
        axios.get('http://localhost:4000/stretch')
        .then(function (response) {
            // handle success
            console.log(response);
            stretch_enabled = response.data.stretch_enabled
            stretch_time = response.data.stretch_time
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

        // there's a user id somewhere in this trigger
        // let user = trigger.userid;
        if (stretch_enabled){
            try {
                // spawn a bot
                let bot = await controller.spawn();

                // await bot.startConversationWithUser(user);
                await bot.startConversationInRoom("Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vZmQzZjgyMTAtNTI2ZS0xMWViLWI1ZDktYzE0MzdmMzhmZmFk", "");

                await bot.say("Stretch break! Here's a fun video guide: https://www.youtube.com/watch?v=6fnLKyRJsrs");

                await bot.beginDialog(ALERT_DIALOG);
            } catch (error) {
                
            }
        }
    });
}