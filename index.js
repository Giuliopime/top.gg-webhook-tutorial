// Install discord.js module with `npm install discord.js`
const Discord = require('discord.js');
// token is the discord bot token, apiToken is the top.gg API token
const { token } = require('./config.json');

// Create Discord Bot Client
const client = new Discord.Client()


// THIS IS THE IMPORTANT PART

// Get the top.gg API token from the config file
const { apiToken } = require('./config.json');

// Make sure to install this with 'npm install dblapi.js`
const DBL = require('dblapi.js');
// The webhookPort can be whatever you want but make sure you open that port in the firewall settings (for linux for example you can use `sudo ufw allow 8000`)
// The webhookAuth is set by you, make sure you keep it secure and don\'t leak it
const dbl = new DBL(apiToken, { webhookPort: 8000, webhookAuth: 'anyPassword' });

// When the webhook is ready log it to the console, this will log `Webhook up and running at http://0.0.0.0:8000/dblwebhook`
dbl.webhook.on('ready', hook => {
   console.log(`Webhook up and running at http://${hook.hostname}:${hook.port}${hook.path}`);
});

// This will just log errors if there are any
dbl.on('error', e => {
   console.log(`Oops! ${e}`);
})

// When the webhook receives a vote
dbl.webhook.on('vote', async vote => {
   // This will log the whole vote object to the console
   console.log(vote)
   // Get the Discord ID of the user who voted
   const userID = vote.user;
   
   // Variable for the channel were we'll send messages when users vote for the bot
   let channelForWebhooks;
   // Get the Discord Channel were we will send the message whenever a user votes for the bot
   // Replace channelID with a valid Discord Channel ID were your bot can send messages too
   channelForWebhooks = await client.channels.resolve('channelID');
   // To my one and only god, NotErwin do you approve this 0.0? 
   // If the channel to send messages in exists, we send a message in it with the ID of the user who votes
   if(channelForWebhooks) await channelForWebhooks.send(`User with ID \`${userID}\` just voted!`);
})

// END OF IMPORTANT PART


// When the bot is ready...
client.once('ready', async ()=> {
   console.log('Webhook Bot Tester launched!');
});

// Login into the Discord Bot Client with the token
client.login(token);
