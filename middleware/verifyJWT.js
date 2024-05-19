const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    console.log('Verifying JWT...');
    const authHeader = req.headers.authorization || req.headers.Authorization
    console.log(req.headers)
    if (!authHeader?.startsWith('Token ')) {
        return res.status(401).json({ message: 'Не авторизован' })
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Доступ запрещен' });
            }
            req.userId = decoded.user.id;
            req.userEmail = decoded.user.email;
            next();
        }
    )
};

module.exports = verifyJWT;