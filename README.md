# Демо по установки авторизационных cookie

## Структура репозитория

/site1 - сервер с защищенным ресурсом

/site2 - сервер, с которого хотим перейти на защищенный сервер

## Сервер site1

По умолчанию, доступен по адресу: http://localhost:3000

### Запуск сервера

```
site1> npm install

site1> npm run dev

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
Express started on port 3000

```

### Доступные методы

* GET / - проверка достпуности сервера

* GET /exchange - устанавливает авторизационную cookie

* GET /forget - удаляет авторизационную cookie

* GET /restricted - доступ к защищенному ресурсу, <br>
Если установлена авторизационная cookie, то возвращается код 200 и тест "Restricted content", иначе возвращается код 401 и текст "Access denied"

## Сервер site2

По умолчанию, доступен по адресу: http://localhost:3001

### Запуск сервера

```
site2> npm install

site2> npm run dev

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
Express started on port 3001

```

### Сценарий работы

#### Положительный сценарий

1. Открыть в браузаре адрес: http://localhost:3001/index.html <br>
__Ожидаемый результат__: открылась веб-страница

2. Проверить корректность настроек:

    2.1. Поле Base Site1 URL должно содержать адрес, на котором доступен Site1. По умолчанию, значение: http://localhost:3000

    2.2. Чек-бокс Token exchange __включен__

3. Нажать кнопку "Open Site 1"<br>
__Ожидаемый результат__: открылась новая вкладка по адресу http://localhost:3001/restricted, которая содержит текст "Restricted content"

__Альтернативные результаты__: <br>
* При ошибки в настройках будет показано модальное окно с ошибкой, детали ошибки можно посмотреть в Console
* Если не была корректна установлена авторизационная cookie, то будет показано "Access denied" на открывшейся вкладке веб-браузера

#### Негативный сценарий

1. Открыть в браузаре адрес: http://localhost:3000/forget <br>
__Ожидаемый результат__: Cookie was cleaned

2. Открыть в браузаре адрес: http://localhost:3001/index.html <br>
__Ожидаемый результат__: открылась веб-страница

3. Проверить корректность настроек:

    2.1. Поле Base Site1 URL должно содержать адрес, на котором доступен Site1. По умолчанию, значение: http://localhost:3000

    2.2. Чек-бокс Token exchange __выключен__

4. Нажать кнопку "Open Site 1"<br>
__Ожидаемый результат__: открылась новая вкладка по адресу http://localhost:3000/restricted, которая содержит текст "Access denied"



