export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }
    next();
  };
  
  export const isEditor = (req, res, next) => {
    if (req.user.role !== 'editor' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only editors and admins can perform this action.' });
    }
    next();
  };
  