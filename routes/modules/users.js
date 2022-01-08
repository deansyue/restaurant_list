const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

// 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  //若必輸入欄位有一沒有輸入，push error訊息
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'email、password、confirmPassword為必填欄位，請重新輸入。' })
  }

  //密碼與確認密碼不一樣，push error訊息
  if (password !== confirmPassword) {
    errors.push({ message: 'password與confirmPassword不相符，請重新確認。' })
  }

  //判斷若陣列有儲存資料， 渲染register頁面，並顯示錯誤訊息
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  //判斷資料庫是否有相同的email
  User.findOne({ email })
    .then(user => {
      //若有相同的email使用者，返回register頁面，將使用者所填入的值填入相應表格內
      if (user) {
        //email已被註冊，push error訊息， 洹染register頁面，並顯示錯誤訊息
        errors.push({ message: '輸入的email已被註冊過，請使用其他email。' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }

      //若無相同使用者，先使用bcrypt加密密碼後，再將資料存入mongodb
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          User.create({
            name,
            email,
            password: hash,
          })
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  //使用者登出，回到首頁，並顯示成功登出的訊息
  req.flash('success_msg', '你已成功登出!')
  res.redirect('/users/login')
})

module.exports = router