const asyncHandler = require("../utils/asyncHandler");


exports.adminMiddleware = asyncHandler((req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
})
