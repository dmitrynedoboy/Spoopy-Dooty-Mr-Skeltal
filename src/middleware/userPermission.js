const { Grave } = require('../../db/models')

const isUserHavePermission = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const grave = await Grave.findOne({ where: { id: cardId }, raw: true });
    if (!grave.UserId === req.session.userId) {
      res.redirect('/')
    }
  } catch (error) {
    console.log(error);
    res.render('404', { message: ' on our server. Please try later.' })
  }
  next()
}


module.exports = { isUserHavePermission }
