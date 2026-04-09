// Simple admin check middleware
// The client sends the stored user JSON via X-User header; we verify role === 'admin'
// In production, replace with JWT verification.

export const requireAdmin = (req, res, next) => {
  try {
    const userHeader = req.headers["x-user"];
    if (!userHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized – no user header" });
    }
    const user = JSON.parse(userHeader);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden – admin access only" });
    }
    req.adminUser = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid auth header" });
  }
};
