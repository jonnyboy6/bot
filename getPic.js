const https = require('https');
const htmlparser = require("htmlparser2");
//"https://www.google.com/search?tbm=isch&q=elon+musk&oq=elon+musk&"
module.exports=function(search, cb){
	let links = []; 
	let parser = new htmlparser.Parser({
		onopentag: function(name, attribs){
			if(name === "img" && attribs.alt === 'Image result for' + search){
				links.push(attribs.src);
			}
		}
	}, {decodeEntities: true});
	let searchbit = search.split(' ').join('+');
	let url ="https://www.google.com/search?tbm=isch&safe=search&q=" + searchbit +"&oq=" +searchbit;
	let dataBuff = "";
	https.get(url, (res) => {

		res.on('data', (d) => {
			dataBuff += d;
		});
		res.on('end', () =>{
			parser.write(dataBuff);
			parser.end();
			cb(links[(Math.random()*links.length) | 0]);
		});
	
	}).on('error', (e) => {
		console.error(e);
	});
	
}