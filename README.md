# Joey-Notifications
Front end is built in React.js and uses axios library to post changes in Joey to an express server. This express server then presents changes in the data to the bot via another server. 
Current Joey is for botkit. 
Front end is all in React.
Current webserver is for the api endpoints and transfers data from the front end to Botkit. 

Remember to use ngrok for the botkit. (You can use other options). Then change the url address in the CurrentJoey .ev file. (sometimes .ev is invisible depending on how your file viewing is setup.)
Also, update the chat room in each of the axios requests. aka in autoLunch change the room url to suit the new room. 

The front end is all built in react with materialUI themes. You can easily change the colors. It is also scalable but does not quiet look good on mobile devices. this would require in the css 
setting specific widths for each button and slider under smaller screen sizes. 
