var http = require("http"),
    qs = require("querystring"),
    //url = require("url");
	xpath = require("xpath"),
	xmldom = require("xmldom"),
	dom = require('xmldom').DOMParser,
	parseString = require('xml2js').parseString;

var defaultUrl =  "http://webmasters.clubannonces.com/rss/rss.asp?NumSite=250&NumAffilie=25576&count=1";

var direBonjour = function() {
    console.log('Bonjour !');
}

var direByeBye = function() {
    console.log('Bye bye !');
}

var getJson = function(url, cb) {
    if(url === null || url === undefined){
		url = defaultUrl;
	}
	
	var req = http.get(url, function(res) {
		var body = Buffer(0);
		var data = '';
		res.on("readable", function() {
		  var chunk;
		  while (chunk = res.read()) {
			body = Buffer.concat([body, chunk]);
			data += chunk;
		  }
		});		
		//console.log(body);
		
		if (res.statusCode === 404) {
		  return cb(Error("Page not found"));
		}

		if (res.statusCode !== 200) {
		  return cb(Error("incorrect status code; expected 200 but got " + res.statusCode));
		}
		
		
		res.on("end", function() {
		  body = body.toString("utf8");

		  parseString(body, {trim: true}, function (err, result) {
		    
			json = result["rss"]["channel"][0]["item"];
			console.dir(json);
			return json;
			
		  });		  
		});			
	});
}

exports.direBonjour = direBonjour;
exports.direByeBye = direByeBye;
exports.getJson = getJson;