module.exports = {
	r: /^\/повтори\s([^]+)/i,
	f: function (message, params, vk) {
		return message.reply(params[1]);
	},
	description: "/повтори <текст>",
	admin: 1
}