

module.exports =  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      req.flash('info', 'You must be logged in to access the Dashboard.')
      res.redirect('/')
    }
  }

  // module.exports =  function ensureAuthenticated(req, res, next) {
  //   if (req.isAuthenticated() && req.user.role === 'admin') {
  //     res.redirect('/admin/dashboard')
  //   } else if(req.isAuthenticated() && req.user.role === 'user') {
  //     res.redirect('/users/dashboard')
  //   } else{
  //     res.redirect('/')
  //   }
  // }