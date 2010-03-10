var url         = require("url");
var querystring = require("querystring");
var sys         = require("sys");

exports.Request = function() 
{
	var pool = {};
	
	return function(request, response)
	{
		var resource   = url.parse(request.url).pathname.split('/').slice(1);
		var connection = request.connection;
		
		switch (request.method)
		{
			case 'GET':
				// Just in case you are testing this cross-domain, we serve up a VERY permissive crossdomain policy file.
				if(resource[0] == 'crossdomain.xml')
				{
					response.writeHead(200, {"Content-Type": "text/xml"});
					response.write('<cross-domain-policy xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.adobe.com/xml/schemas/PolicyFile.xsd"><allow-access-from domain="*" /></cross-domain-policy>');
					response.close();
				}
				else if(resource[0] == 'register')
				{
					if(typeof pool[resource[1]] == 'undefined')
					{
						pool[resource[1]] = [];
					}
					
					sys.puts("Connection registered for \""+resource[1] +"\" events");
					
					// WARNING - Disabling the auto timeout.
					request.connection.setTimeout(0);
					
					pool[resource[1]].push(request.connection);
					
					// prime the pump
					request.connection.write("000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
					
					request.connection.addListener("end", function()
					{
						sys.puts("A request Closed...");
						for(var key in pool)
						{
							for(var i=0; i < pool[key].length; i++)
							{
								if(pool[key][i] == connection)
								{
									sys.puts("Found inactive connection, removing")
									pool[key].splice(i, 1);
								}
							}
						}
					})
				}
				else
				{
					response.writeHead(200, {"Content-Type": "text/plain"});
					response.close();
				}
				
				break;
			
			case 'POST':
				sys.puts("received POST request")
				/* you will want to implement some security around here, you don't want 
				just anyone being able to post to your subscribers */
				
				var data = "";
				request.addListener("data", function(chunk)
				{
					data += chunk;
				})
				
				request.addListener("end", function()
				{
					response.writeHead(200, {"Content-Type": "text/plain"});
					response.close();
					
					sys.puts("sending event \""+resource[0]+"\": "+querystring.unescape(data));
					if(typeof pool[resource[0]] != 'undefined')
					{
						pool[resource[0]].forEach(function(item)
						{
							item.write(querystring.unescape(data));
						})
					}
				})
				break;
		}
	}
}
