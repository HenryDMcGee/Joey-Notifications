const { BotkitConversation } = require( 'botkit' );
let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth()+1;
let year = date_ob.getFullYear();
module.exports = function( controller ) {

    const convo = new BotkitConversation( 'color_chat', controller );

    convo.say( 'This is a Botkit conversation sample.' +" time " + ts + " date " + date + " month " + month + " year " + year );
    convo.ask(
        'What is your favorite color?',
        async( answer, convo, bot ) => {},
        'stated_color'
    );
    convo.say( `Cool, I like {{ vars.stated_color }} too!` );

    controller.addDialog( convo );

    controller.hears( 'color', 'message,direct_message', async( bot, message ) => {

        await bot.beginDialog( 'color_chat' );
    });

    controller.commandHelp.push( { command: 'color', text: 'Pick a favorite color (Botkit conversations)' } );

    // function continueConversation(reference: Partial<ConversationReference>,
    //     logic: (revocableContext: TurnContext) => Promise<void>)
}