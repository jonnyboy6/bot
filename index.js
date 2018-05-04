const Discord = require("discord.js");
const getImg = require("./getElonMusk.js");
const getNotMusk = require("./getPic.js");
const client = new Discord.Client();
const yoda = require("./yoda.js");
const zalgoer = require("./zalgo.js");
const readline = require("readline");
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
/*var commands = [];
Class command{
	constructor(call, def){
		this.call = call;
	this.def = def
	}
	toString(){
		return this.call +"\n" + this.def;
	}
}*/
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({game:{name:"for Pokemon",type:"WATCHING"}});
});

client.on('message', msg => {
	/*commands.push(new command("cool","replies with Beans"));
	commands.push(new command("hi","replies with a cute gif of a dog waving"));
	commands.push(new command("elon","sends 'musk?:' and a picture of elon"));
	commands.push(new command("-image  'image search'","sends an image of the value following the command call"));
	commands.push(new command("-yoda-pls   'text to be yodafied' ","yodafies text that follows command call"));
	commands.push(new command("-zalgo 'text'","ever wanted to make a weird word thing, well now you can with the -zalgo command."));
	commands.push(new command("--invite","yup, this one has an extra dash because i wanted to add an extra dash. generates an invite to let me into other groups. please use this wisely"));
	commands.push(new command("-roulette","shoot a friend"));
	commands.push(new command("-help","do i need to explain this one?"));*/
	
	rl.question("",(answer)=>{
		msg.channel.send(answer);
	});
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
	else if(msg.content.toLowerCase().includes("shit")||msg.content.toLowerCase().includes("fuck")){
		msg.reply("Proffesor Oak's voice echoes in your head,there is a time and place for anything but not now.");
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
	else if(msg.content.startsWith("--invite")){
		client.generateInvite().then(function(result){
			msg.channel.send(result);
		});
	}
	else if(msg.content.startsWith("-help")){
			msg.channel.send("cool"+"  replies with Beans \n \n" +
	"hi" +"  replies with a cute gif of a dog waving \n \n" +
	"elon"+"  sends 'musk?:' and a picture of elon \n \n"+
	"-image  'image search'"+ "  sends an image of the value following the command call"
	+"\n \n -yoda-pls   'text to be yodafied' " + "  yodafies text that follows command call"
	+"\n \n -zalgo 'text'" + "  ever wanted to make a weird word thing, well now you can with the -zalgo command."
	+"\n \n --invite"+ "  yup, this one has an extra dash because i wanted to add an extra dash. generates an invite to let me into other groups. please use this wisely"
	+"\n \n -roulette" + "  shoot a friend"+
	"\n \n -help" + "  do i need to explain this one?");
	}
	else if(msg.content.startsWith("-roulette")){
		/*var Apeoples = msg.channel.members.array();//do something to test channel first, and then decide what to do from there
		var peoples = [];
		for(i = 0; i < client.users.array().length; i++){
			if(Apeoples[i].user.presence.status === 'online'){
				peoples.push(Apeoples[i].user);
			}
		}
		  var Count = Math.floor(Math.random()*peoples.length);
       var User = client.users.array()[Count];
       msg.channel.send(User.username + " was shot. Sorry " + User.username +".");
    */
	console.log(msg.channel);
	}
	/*for(i = 0; i <client.user.roles.length; i ++)
	if(msg.content.includes(client.user.roles[i])){
			msg.channel.send("yar? eem a pirate");					
	}*/ 
	console.log("Bot sees: " + msg.content);
});
client.login(process.env.TOKEN);




