const router = require('express').Router();
const { isUserLogin } = require('../middleware/isSession');
const { User, Grave } = require('../../db/models')

router.route('/')
  .get(isUserLogin, (req, res) => {
    res.render('partials/graveForm')
  })
  .post(isUserLogin, async (req, res) => {
    const { title, img } = req.body;
    try {
      const grave = await Grave.create({ title, img, UserId: req.session.userId });
      res.redirect('/');
    } catch (error) {
      console.log(error);
      res.render('404', { message: ' on our server. Please try later.' })
    }
  })

router.route('/:cardId')
  .get(async (req, res) => {
    const { cardId } = req.params;
    try {
      const grave = await  Grave.findOne({ where: { id: cardId }, raw: true })
      let permission = false;
      if (grave.UserId === req.session.userId) {
        permission = true;
      }
      res.render('gravePage', { grave, permission });
    } catch (error) {
      console.log(error);
      res.render('404', { message: ' on our server. Please try later.' })
    }
  })
  .post(isUserLogin, async (req, res) => {
    const { cardId } = req.params;
    const { title, img } = req.body;
    try {
      const grave = await Grave.findOne({ where: { id: cardId }, raw: true });
      if (grave.UserId === req.session.userId) {
        await Grave.update({ title, img }, {  where: { id: cardId } });
        const updatedGrave = await Grave.findOne({ where: { id: cardId }, raw: true });
        res.send(updatedGrave)
      } else res.send('You dont have permission to edit this grave.')
    } catch (error) {
      console.log(error);
      res.render('404', { message: ' on our server. Please try later.' })
    }
  })
  .put(isUserLogin, async (req, res) => {
    const { cardId } = req.params;
    try {
      const grave = await Grave.findOne({ where: { id: cardId }, raw: true });
      if (grave.UserId === req.session.userId) {
        res.render('modal', { grave, layout: false })
      } else res.send('You dont have permission to edit this grave.')
    } catch (error) {
      console.log(error);
      res.render('404', { message: ' on our server. Please try later.' })
    }
  })
  .delete(isUserLogin, async (req, res) => {
    const { cardId } = req.params;
      try {
        const grave = await Grave.findOne({ where: { id: cardId }, raw: true });
        if (grave.UserId === req.session.userId) {
          const deletedCard = Grave.destroy({ where: { id: cardId } })
          res.send('Grave was successfuly destroyed')
        } else res.send('You dont have permission to delete this grave.')
      } catch (error) {
        console.log(error);
        res.render('404', { message: ' on our server. Please try later.' })
      }
  })

module.exports = router
