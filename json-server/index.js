const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

// нужно для имитации загрузки, чтобы данные приходили не мгновенно

server.use(async (req, res, next) => {
    await new Promise(res => {
        setTimeout(res, 800);
    });
    next();
});

// проверяем авторизован ли пользователь или нет
// eslint-disable-next-line
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }
    next();
});

server.use(jsonServer.defaults());
server.use(router);

// эндпоит для логина

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'),
    );
    const { users } = db;

    const userFromBd = users.find(
        user => user.username === username && user.password === password,
    );

    if (userFromBd) {
        return res.json(userFromBd);
    }

    return res.status(403).json({ message: 'AUTH ERROR' });
});

// запуск сервера

server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
