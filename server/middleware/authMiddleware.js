import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(400).json({ error: 'Invalid token' });
    }
};

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (req.user.role === allowedRoles) {
            next();
        } else {
            res.status(403).json({ error: "Access denied." });
        }
    }
}
