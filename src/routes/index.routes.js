const router = require('express').Router();
const passport = require('passport');
const { Grave } = require('../../db/models')

router.route('/')
  .get(async (req, res) => {
    try {
      const headstones = await  Grave.findAll({ raw: true, order: [['updatedAt', 'DESC']] })
      res.render('index', { headstones });
    } catch (error) {
      console.log(error);
      res.render('404', { message: ' on our server. Please try later.' })
    }
  });

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/signin',
  session: false
}));



module.exports = router
