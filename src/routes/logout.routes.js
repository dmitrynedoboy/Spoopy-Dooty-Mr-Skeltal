const router = require('express').Router()
const { isUserLogin } = require('../middleware/isSession');

router.get('/', (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('sid');
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.render('404', { message: '...'});
  }
})

module.exports = router
