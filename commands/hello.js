module.exports = {
	r: /^\/(привет|ку|qq|здрасьте)/i,
	f: function (message, params, vk) {
		vk.api.users.get({
			user_ids: message.user
		})
		.then((user) => {
			return message.send(`Привет ${user[0].first_name}, я чат-бот, если хочешь узнать мои возможности, пропиши: /команды`);
		})
	},
	description: "привет -- приветствие",
	admin: 0
}