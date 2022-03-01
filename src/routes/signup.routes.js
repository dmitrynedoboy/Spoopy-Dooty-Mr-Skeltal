const router = require('express').Router()
const bcrypt = require('bcrypt');
const { isPasswordConfirm } = require('../middleware/passwordCheck')
const { isEmailUnique, isValidEmail } = require('../middleware/emailCheck')
const { isUserNotLogin } = require('../middleware/isSession');
const { User } = require('../../db/models')

const saltRounds = 10;

router.route('/')
  .get(isUserNotLogin, (req, res) => {
    res.render('signup')
  })
  .post(isUserNotLogin, async (req, res) => {
    const { name, email, password, passwordConfirm } = req.body
    if (!isValidEmail(email)) {
      res.send('Email is not valid. Please enter email in correct format: "example@example.com"')
    } else if(password.length < 8) {
      res.send('Passwords should contain at least 8 characters')
    }
    else if (!isPasswordConfirm(password, passwordConfirm)) {
      res.send('Passwords are not the same')
    } else if (await isEmailUnique(email)) {
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = await User.create({ name, email, password: hashedPassword })
        req.session.userId = newUser.id
        req.session.username = newUser.name
        req.session.email = newUser.email
        res.send('ok')
      } catch (error) {
        console.log(error);
        res.render('404', { message: ' on our server. Please try later.' })
      }
    } else {
      res.send('User with this email has already exist. Do you want to <a href="/signin"> login?</a>')
    }
  })

module.exports = router
