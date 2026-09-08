// Middleware to check if user is authenticated  

export const protect = async (req, res, next) => {
    const userId = req.auth()?.userId;

    if (!userId) {
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    req.userId = userId;
    next();
};

