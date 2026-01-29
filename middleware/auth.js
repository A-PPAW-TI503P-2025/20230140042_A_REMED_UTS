const checkRole = (requiredRole) => {
    return (req, res, next) => {
        // Ambil role dari header
        const userRole = req.headers['x-user-role'];

        if (!userRole) {
            return res.status(401).json({ message: "Unauthorized: Role header missing" });
        }

        // Jika role sesuai, izinkan lewat
        if (userRole === requiredRole) {
            return next();
        }

        return res.status(403).json({ message: "Forbidden: You do not have access" });
    };
};

module.exports = checkRole;