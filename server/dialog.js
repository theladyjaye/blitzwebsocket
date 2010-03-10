var sys     = require('sys')
var http    = require('http');

var dialog = [];
dialog.push('{"name":"Dino Petrone", "position":"Senior Flash Developer", "avatar":"./resources/bitmaps/avatars/purple.jpg", "message":"What am I looking at?"}');
dialog.push('{"name":"Adam Venturella","position":"Senior Developer, Emerging Technologies", "avatar":"./resources/bitmaps/avatars/lucy.jpg", "message":"How am I not suprised, when all you know is Actionscript. ;) "}');
dialog.push('{"name":"BLITZ Technology Department","position":"Punching the Internet in the Face with Awesomeness", "avatar":"./resources/bitmaps/avatars/blitz.jpg", "message":":: laughs at Dino ::"}');
dialog.push('{"name":"Adam Venturella", "position":"Senior Developer, Emerging Technologies","avatar":"./resources/bitmaps/avatars/lucy.jpg", "message":"First, it\'s all HTML/CSS."}');
dialog.push('{"name":"Adam Venturella", "position":"Senior Developer,  Emerging Technologies","avatar":"./resources/bitmaps/avatars/lucy.jpg", "message":"Second, it\'s Push notifications using Flash\'s URLStream as the socket and Node.js as the server."}');
dialog.push('{"name":"Adam Venturella", "position":"Senior Developer, Emerging Technologies","avatar":"./resources/bitmaps/avatars/lucy.jpg", "message":"Don\'t have flash, or have it blocked...No problem, you would just see static html with the 3 latest results"}');
dialog.push('{"name":"Dino Petrone", "position":"Senior Flash Developer","avatar":"./resources/bitmaps/avatars/purple.jpg", "message":"So if I do have Flash, what do I get?"}');
dialog.push('{"name":"Adam Venturella", "position":"Senior Developer, Emerging Technologies","avatar":"./resources/bitmaps/avatars/lucy.jpg", "message":"Well, grasshopper, using URLStream Flash makes a HTTP request that the Node.js server never closes."}');
dialog.push('{"name":"Adam Venturella", "position":"Senior Developer, Emerging Technologies","avatar":"./resources/bitmaps/avatars/lucy.jpg", "message":"When the URLStream receives data, it relays it to Javascript where we use Mstache.js + jQuery"}');
dialog.push('{"name":"Adam Venturella", "position":"Senior Developer, Emerging Technologies","avatar":"./resources/bitmaps/avatars/lucy.jpg", "message":"to populate the template, and trigger the scroll animation"}');
dialog.push('{"name":"Adam Venturella", "position":"Senior Developer, Emerging Technologies","avatar":"./resources/bitmaps/avatars/lucy.jpg", "message":"The use of URLStream means we don\'t have to deal with Flash\'s Socket Policy Files. It\'s all just simple HTTP"}');
dialog.push('{"name":"Adam Venturella", "position":"Senior Developer, Emerging Technologies","avatar":"./resources/bitmaps/avatars/lucy.jpg", "message":"Best of all, there is no polling of the server involved."}');
var interval = "";
interval = setInterval(function()
{
	if(dialog.length)
	{
		var client = http.createClient(4599, "push.com");
		var request = client.request("POST", "/stream", {"Host": "push.com", "Content-Type":"application/json"});
		sys.puts("Sending Message...");
		request.write(dialog.shift());
		request.close();
	}
	else
	{
		clearInterval(interval);
		sys.puts("All Done...");
	}
}, 4000);