const router = require('express').Router();
const { isUserNotLogin } = require('../middleware/isSession');
const { isValidEmail } = require('../middleware/emailCheck');
const { isPasswordValid } = require('../middleware/passwordCheck')
const { User } = require('../../db/models')

router.route('/')
  .get(isUserNotLogin, (req, res) => {
    res.render('signin');
  })
  .post(isUserNotLogin, async (req, res) => {
    const { email, password } = req.body;
    if (!isValidEmail(email)) {
      res.send('Email is not valid. Please enter correct email in format: "example@example.com"')
    } else try {
      const user = await User.findOne({ where: { email }, raw: true })
      if (user === null) {
        res.send('User with this email not found.\nDo you want to <a href="/signup"> register?</a>')
      } else if (await isPasswordValid(password, user.password)) {
        req.session.userId = user.id
        req.session.username = user.name
        req.session.email = user.email
        res.send('ok')
      } else {
        res.send('Invalid password. Try again.')
      }
    } catch (error) {
      console.log(error);
      res.render('404', { message: ' on our server. Please try later.' })
    }
  })

module.exports = router
