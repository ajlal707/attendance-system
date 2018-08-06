
module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      next()
    } else {
      req.logout();
      res.redirect('/')
    }
  } else {
    res.redirect('/')
  }
}