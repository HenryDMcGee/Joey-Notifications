var schedule = require('node-schedule');
const axios = require('axios').default;
let lunch_enabled = true
let lunch_time =  14

var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 5)];
    rule.hour = lunch_time;
    rule.minute = 0;
console.log("lunch" + lunch_time)
module.exports = function ( controller ) {
    //var j = schedule.scheduleJob('0 12 * * 1-5', async (trigger) => {
    var j = schedule.scheduleJob(rule, async (trigger) => {
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(1, 5)];
        rule.hour = lunch_time;
        rule.minute = 0;

        // Request the latest bot parameters before triggering the bot
        axios.get('http://localhost:4000/lunch')
        .then(function (response) {
            // handle success
            console.log(response);
            lunch_enabled = response.data.lunch_enabled
            lunch_time = response.data.lunch_time
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

        if (lunch_enabled){
            try {
                // spawn a bot
                let bot = await controller.spawn();
    
                await bot.startConversationInRoom("Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vZmQzZjgyMTAtNTI2ZS0xMWViLWI1ZDktYzE0MzdmMzhmZmFk", "");
    
                await bot.say("It's lunch time! \n ");
                await bot.say("Today's tip is to sauté onions! Our secret recipe is as follows, Shh remember it's a secret! https://www.idratherbeachef.com/how-to-saute-onions/ \n\n");
                await bot.say("During your lunch break we suggest a walk or yoga. Click here to join our group yoga session! https://www.youtube.com/watch?v=M-8FvC3GD8c");
    
                await bot.beginDialog(ALERT_DIALOG);
            } catch (error) {
                
            }
        }
        
    });
}