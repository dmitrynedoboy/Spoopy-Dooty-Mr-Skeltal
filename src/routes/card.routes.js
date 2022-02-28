const router = require('express').Router();
const { isUserLogin } = require('../middleware/isSession');
const { User, Grave } = require('../../db/models')

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
  .delete(async (req, res) => {
    const { cardId } = req.params;
      try {
        const grave = await Grave.findOne({ where: { id: cardId }, raw: true });
        if (grave.UserId === req.session.userId) {
          const deletedCard = Grave.destroy({ where: { id: cardId } })
          res.send('Grave was successfuly destroyed')
        } else res.send('You dont have permission to edit this grave.')
      } catch (error) {
        console.log(error);
        res.render('404', { message: ' on our server. Please try later.' })
      }
  })

module.exports = router
