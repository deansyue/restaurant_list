const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = (app) => {
  //初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())

  //設定本地登錄策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        //沒找到資料時
        if (!user) return done(null, false, req.flash('warning_msg', '找不到使用者，請重新輸入!'))
        //找到資料，使用bcrypt判斷密碼是否輸入錯誤
        return bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            //輸入錯誤時
            if (!isMatch) return done(null, false, req.flash('warning_msg', 'email或密碼輸入錯誤，請重新輸入!' ))

            //密碼輸入正確時
            return done(null, user)
          })

      })
      .catch(err => done(err, false))
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}