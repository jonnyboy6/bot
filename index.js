const Discord = require("discord.js");
const getImg = require("./getElonMusk.js");
const getNotMusk = require("./getPic.js");
const client = new Discord.Client();
const yoda = require("./yoda.js");
const zalgoer = require("./zalgo.js");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({game:{name:"for Pokemon",type:"WATCHING"}});
});

client.on('message', msg => {
	if(msg.content.toLowerCase() == 'cool'){
		
		msg.reply('Beans');
	}
	else if(msg.content === 'hi'){

		msg.reply("https://giphy.com/gifs/dog-miss-Wj7lNjMNDxSmc");
	}
	else if(msg.content.toLowerCase() == 'elon'){
		getImg(function(link){
			msg.channel.send('musk?: '+ link);
		});
	}
	else if(msg.content.startsWith("-image")){
	
		getNotMusk(msg.content.substr(6), function(link){
			console.log(link, msg.content.substr(6));
			msg.channel.send(link);
		});
	}
	else if(msg.content.startsWith("-yoda-pls")){
		
			yoda(msg.content.substr(9), function(err, result){
					if(!err){
						msg.channel.send(result);
					}
			});
	}
	else if(msg.content.startsWith("-zalgo")){
		
			msg.channel.send(zalgoer(msg.content.substr(6)));					
	}
	else if(msg.isMentioned(client.user.id)){
			
			msg.channel.send(zalgoer("Char CHAR!!!"));					
	}
	else if(msg.mentions.everyone){
			msg.channel.send(zalgoer("------ WHO AWAKENS ME FROM MY SLUMBER -----------"));					
	}
	else if(msg.content.startsWith("-invite")){
		client.generateInvite().then(function(result){
			msg.channel.send(result);
		});
	}
	/*for(i = 0; i <client.user.roles.length; i ++)
	if(msg.content.includes(client.user.roles[i])){
			msg.channel.send("yar? eem a pirate");					
	}*/ 
	console.log("Bot sees: " + msg.content);
});
client.login(process.env.TOKEN);




