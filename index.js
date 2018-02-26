const Discord = require("discord.js");
const getImg = require("./getElonMusk.js");
const getNotMusk = require("./getPic.js");
const client = new Discord.Client();
const yoda = require("./yoda.js");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({game:{name:"for Pokemon",type:"WATCHING"}});
});

client.on('message', msg => {
	if(msg.content.toLowerCase() == 'cool'){
		msg.reply('Beans');
	}
	else if(msg.content === 'hi'){
		msg.channel.send("https://giphy.com/gifs/dog-miss-Wj7lNjMNDxSmc");
	}
	else if(msg.content.toLowerCase() == 'elon'){
		getImg(function(link){
			msg.reply('musk?: '+ link);
		});
	}
	else if(msg.content.startsWith("-image")){
		getNotMusk(msg.content.substr(6), function(link){
			console.log(link, msg.content.substr(6));
			msg.reply(link);
		});
	}
	else if(msg.content.startsWith("-yoda-pls")){
			yoda(msg.content.substr(9), function(err, result){
					if(!err){
						msg.reply(result);
					}
			});
	}
});
client.login(process.env.TOKEN);




