const https = require('https');
const htmlparser = require("htmlparser2");
const url = "https://www.google.com/search?tbm=isch&q=elon+musk&oq=elon+musk&";
module.exports=function(cb){
	let links = []; 
	let parser = new htmlparser.Parser({
		onopentag: function(name, attribs){
			if(name === "img" && attribs.alt === 'Image result for elon musk'){
				links.push(attribs.src);
			}
		}
	}, {decodeEntities: true});
	

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