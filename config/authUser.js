
module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      let baseUrl = req.baseUrl;
      if (baseUrl === '/addUser' || baseUrl === '/profile' || baseUrl === '/changePassword' ||
        baseUrl === '/dashboard' || baseUrl === '/viewAllUsers') {
        next()
      } else {
        req.logout();
        res.redirect('/');
      }
    } else if (req.isAuthenticated() && req.user.role === 'user') {
      let baseUrl = req.baseUrl;
      if (baseUrl === '/userDashboard' || baseUrl === '/profile') {
        next()
      } else {
        req.logout();
        res.redirect('/');
      }
    } else {
      req.logout();
      res.redirect('/');
    }
  } else {
    req.logout();
    res.redirect('/');
  }
}