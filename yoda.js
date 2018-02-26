const soap = require('soap');

module.exports = function(input, cb){
	soap.createClient('https://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl', function(err, client){
		if(err){
			return cb(err);
		}
		client.yodaTalk({inputText: input}, function(err, result){
			if(err){
				return cb(err);
			}
			return cb(err, result.return);
		});
	});
}