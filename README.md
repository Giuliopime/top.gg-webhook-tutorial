# top.gg Webhook Tutorial
## Prerequisites

- Access to a VPS with sudo priviliges
- An approved bot on top.gg


## Coding
1- Check the `index.js` file of this repository and copy, in YOUR `index.js` file, the part that goes from `// THIS IS THE IMPORTANT PART` to `// END OF IMPORTANT PART`
Everything that part of the code does is explained with comments inside the file.

2- Now check the the `config.json` file of this repository, you will see two keys in it:  
- `token`: which is your standard bot token and you can ignore that part if you stored your token in any other way

- `apiToken`: you will need to get this token from top.gg, to do that go to https://top.gg/api/docs#mybots -> click on your bot -> hit generate token or just copy the token if you already generated it previously.  
Then put that token in YOUR `config.json` file with the respective `apiToken` key, so it would look something like this:  
`"apiToken": "insert top.gg API token here"`
  
## Running the bot on the VPS
1- Supposing you already uploaded your Discord bot project folder to your VPS and it's running fine, go ahead and install the `dblapi.js` library.  
  You can do that by running `npm i dblapi.js` from a terminal inside your bot project folder on the VPS.  
2- Upload the `index.js` file, with the changes you just made, in your VPS Discord bot folder.  
3- Update the firewall settings to let top.gg connect to the webhook port of your VPS.  
  In this example we used port 8000 for our webhook, so we'll need to open that port in the firewall settings, in Ubuntu we can do that with: `sudo ufw allow 8000`

## Setting up the webhook on top.gg
1- Go to your bot page on top.gg and hit the edit button.  
2- Scroll down to the `API Options` section (if you don't see it then your bot hasn't been approved yet)  
3- In the `Webhook URL` field enter: `http://vpsIP:8000/dblwebhook`  
  Make sure to replace `vpsIP` with your actual VPS IP and that the port matches the port in the `index.js` file.  
  In this case it is set to 8000 (`const dbl = new DBL(apiToken, { webhookPort: 8000, webhookAuth: 'anyPassword' });`  
4- In the `Webhook Authorization` field enter the password you used in the `index.js`, in our case `anyPassword`.  
5- Hit the `save` button to save this settings


## Testing
Restart the bot on your VPS, once you do that and you don't get any error in the console, you can test the webhook.  
To do that go on your bot page on top.gg, hit the edit button, scroll down to the `API Options` section and hit the `test` button, now, in your VPS console, the bot should have logged the vote and if you set up the Discord vote channel like in our `index.js` you should have received a message in that channel too.

## You are all set!
