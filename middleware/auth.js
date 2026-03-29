const isAuthenticated = (req, res, next) => {
  const { user } = req.session || {};
  if (user && user.username && user.id) {
    return next();
  }
  res.status(401).send("Unauthorized");
};

module.exports = {
  isAuthenticated,
};
