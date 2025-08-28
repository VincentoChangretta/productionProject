const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

// Стандартные middleware json-server (CORS, logger, static)
server.use(jsonServer.defaults());
// Чтобы можно было отправлять JSON в body
server.use(jsonServer.bodyParser);

// Небольшая задержка для имитации реального API
server.use(async (req, res, next) => {
    await new Promise(res => setTimeout(res, 500));
    next();
});

// -------------------- 📌 Регистрация --------------------
server.post('/register', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: 'Username and password are required' });
        }

        const dbPath = path.resolve(__dirname, 'db.json');
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        const { users = [] } = db;

        const userExists = users.find(u => u.username === username);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = { id: Date.now(), username, password };
        users.push(newUser);

        fs.writeFileSync(dbPath, JSON.stringify({ ...db, users }, null, 2));

        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// -------------------- 📌 Логин --------------------
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'),
        );
        const { users = [] } = db;

        const userFromDb = users.find(
            u => u.username === username && u.password === password,
        );

        if (userFromDb) {
            return res.json({
                ...userFromDb,
                token: `fake-jwt-token-${userFromDb.id}`,
            });
        }

        return res
            .status(403)
            .json({ message: 'Invalid username or password' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// -------------------- 📌 Middleware авторизации --------------------
server.use((req, res, next) => {
    // Пропускаем preflight-запросы (CORS)
    if (req.method === 'OPTIONS') {
        return next();
    }

    // /login и /register не требуют авторизации
    if (req.path === '/login' || req.path === '/register') {
        return next();
    }

    // Все остальные маршруты требуют Authorization
    if (!req.headers.authorization) {
        return res
            .status(403)
            .json({ message: 'AUTH ERROR: no token provided' });
    }

    next();
});

// -------------------- 📌 Стандартные маршруты --------------------
server.use(router);

// 🚀 Запуск сервера
server.listen(8000, () => {
    console.log('🚀 JSON Server is running at http://localhost:8000');
});
