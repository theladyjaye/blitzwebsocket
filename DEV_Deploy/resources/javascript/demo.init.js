var Demo           = {};
Demo.templates     = {Pod:"<li><div class=\"pod\"><div class=\"pod-context\"><div class=\"pod-avatar\"><img src=\"{{avatar}}\"></div><div class=\"pod-message\"><div class=\"pod-message-context\"><h3>{{name}}</h3><h4>{{position}}</h4><p>{{message}}</p></div></div></div></div></li>"};

function setMessage(value)
{
	if(value.length)
	{
		var container = $(".stream .context ul");
		var context   = $(".stream .context");
		value         = $.parseJSON(value);
		
		if(typeof value.name != "undefined")
		{
			container.append(Mustache.to_html(Demo.templates.Pod, value));
			context.animate({scrollTop:context.scrollTop()+97}, "slow");
		}
	}
}