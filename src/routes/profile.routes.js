const router = require('express').Router();
const { isUserLogin } = require('../middleware/isSession');
const { User, Grave } = require('../../db/models')

router.route('/')
  .get(isUserLogin, async (req, res) => {
    try {
      const headstones = await  Grave.findAll({ where: { UserId: res.locals.userId }, raw: true })
      res.render('profile', { headstones });
    } catch (error) {
      console.log(error);
      res.render('404', { message: ' on our server. Please try later.' })
    }
  })

module.exports = router
