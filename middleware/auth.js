module.exports = {
  authenticator: (req, res, next) => {
    //若有登入，則進入下一步驟
    if (req.isAuthenticated()) {
      return next()
    }

    //沒有登入，則將頁面切換到登入頁面，並將錯誤訊息使用flash顯示在login畫面
    req.flash('warning_msg', '請先登入才能使用此服務!')
    res.redirect('/users/login')
  }
}