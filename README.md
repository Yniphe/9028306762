### Конфигурация
> В файле `.env` указать параметры подключения к MongoDB, а так же настройки для JWT

Доуступные переменные:
- `MONGO_URI` - строка подключения к MongoDB
- `JWT_SECRET` - секретный ключ для JWT
- `JWT_EXPIRES_IN` - время жизни токена в секундах

## Локальный запуск
* Требуется MongoDB и Node.js

```bash
$ npm install
$ npm run start
```

## Запуск в Docker Compose
* Требуется Docker и Docker Compose

```bash
$ docker-compose up
```


> Сервис будет доступен по адресу `http://127.0.0.1:3000`
