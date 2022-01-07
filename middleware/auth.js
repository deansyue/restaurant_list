module.exports = {
  authenticator: (req, res, next) => {
    //若有登入，則進入下一步驟
    if (req.isAuthenticated()) {
      return next()
    }

    //沒有登入，則將頁面切換到登入頁面
    res.redirect('/users/login')
  }
}