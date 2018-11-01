
module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      next()
    } else if (req.isAuthenticated() && req.user.role === 'user') {
      res.redirect('/userSlider')
    } else {
      req.logout();
      res.redirect('/');
    }
  } else {
    req.logout();
    res.redirect('/');
  }
}