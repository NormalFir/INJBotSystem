### Подготовка
1. Устанавливаем NodeJS последней версии с сайта https://nodejs.org/en/
2. Создаем в любом месте папку с любым названием
3. Открываем консоль, на windows: win+r и вводим cmd.
4. Через консоль переходим к папке, например: cd C:\bot
5. После в консоль пишем следующее и ждем установки модулей:
> npm i vk-io --save; npm i request; npm i https; npm i pm2 -g

### Настройка и запуск
1. Перекидываем index.js и папки в свою папку
2. Переходим в config и открываем settings.json:
```JSON
{
	"token": "ваш токен",
	"id": 1,
	"autostatus": true,
	"autoaccept": false,
	"helpCMD": "/команды",
	"adminID": 1
}
```

3. Вставляем тут свой токен, в "id": пишем айди бота, а в adminID пишем свой айди
autostatus - автостатус, менять в index.js, если true - включен, если false - выключен
autoaccept - авто принятие в друзья, если true - работает, если false - не работает

4. Если вы закрыли консоль, открываем ее еще раз и переходим в папку через cd.
5. Пишем:
> pm2 start index.js

6. Бот успешно запущен :)

### Добавление своих команд
В папке commands, есть example.js:
```JavaScript
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
```
Чтоб добавить новую команду, создаем новый текстовый файл и меняем название на - названиекоманды.js и заполняем по примеру с example.js
Или же копируем example.js и уже там меняем.

### Связь со мной
> VK:
> https://vk.com/liniussss
> Telegram:
> https://t.me/LiniusS