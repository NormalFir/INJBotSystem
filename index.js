const VK 		= require("vk-io"),
	  vk 		= new VK(),
	  request 	= require('request'),
	  https 		= require('https'),
	  fs 		= require("fs"),
	  sets 		= require("./config/settings.json");

vk.setToken(sets.token);

vk.longpoll.start();

var admin = sets.adminID;
var evals = /^\/eval\s([^]+)/i;

vk.longpoll.on("message", (message) => {
	if(message.text == sets.helpCMD) return message.send("Все доступные команды:\n" + commands.map(x => "🔑 " + x.description).join("\n"));
	if(evals.test(message.text)) {
		const code = message.text.match(evals);
		try {
			return message.send("💨 | Результат: " + eval(code[0]));
		} catch (err) {
			return message.send("⛔ | Ошибка: " + err.toString());
		}
	}
	commands.map(function (cmd) {
		if(!cmd.r.test(message.text)) return;
		if(message.user == sets.id) return;
		var params = message.text.match(cmd.r) || [];
		if(cmd.admin == 1  && message.user != admin) return message.send("Вы не администратор!");
		cmd.f(message, params, vk);
	});
});

var commands = fs.readdirSync("./commands").filter(x => x.endsWith(".js")).map(x => require("./commands/" + x));

if(sets.autostatus == true) {
	var workTime = 0;
	setInterval(() => {
		workTime += 1;
	  	vk.api.status.set({
	  		text: "Бот уже работает " + workTime + " минут!"
		});
	}, 60000);
}

if(sets.autoaccept == true) {
	setInterval(() => {
	  	vk.api.friends.getRequests({
	  		out: 1
	  	})
	  	.then((res) => {
	  		if(!res.items[0]) return;
	  		vk.api.friends.delete({user_id: items[0]});
	  	});
	  	vk.api.friends.getRequests({
	  		out: 0
	  	})
	  	.then((res) => {
	  		if(!res.items[0]) return;
	  		vk.api.friends.add({user_id: items[0]});
	  	});
	}, 120000)
}