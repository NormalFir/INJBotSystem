// Здесь можно подключать любые модули
const fs 	= require("fs"); // FS как пример

// Экспортируем как модуль
module.exports = {
	// Regex, подробнее на regexr.com
	r: /^\/test\s([^]+);([^]+)/i,
	// Функция
	f: function (message, params, vk) {
		// если первая группа == привет, ответит "Привет!"
		if(params[1] == "привет")
			return message.reply("Привет!");
		// Если текст после ";" равен test, то выполняет определенную функцию
		if(params[2] == "test") {
			// Запросы к API VK, через токен
			vk.api.status.set({text: params[0]});
			// Отправляет сообщение о том, что статус успешно установлен
			return message.send(`Статус ${params[0]}, успешно установлен.`);
		}
	},
	// Описание
	description: "/test <текст> -- пример описания",
	// Админская ли команда, 0 - нет, 1 - да
	admin:0
}

// Здесь можно указать любую функцию, можно конечно и вверху, но мне приятнее когда функции в конце документа
function logged() {
	console.log("Функция успешно добавлена")
}