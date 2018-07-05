


module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    var loc = req.baseUrl
    loc = loc.split('/')
    if (req.user.role === 'admin' && loc[1] === 'admin') {
      next()
    } else if (req.user.role === 'user' && loc[1] === 'users') {
      next()
    } else {
      res.redirect('/')
    }
  } else {
    res.redirect('/')
  }
}