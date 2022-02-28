const { User } = require('../../db/models');

async function isEmailUnique(email) {
  try {
    const user = await User.findOne({ where: { email } });
    return user === null;
  } catch (error) {
    console.log(error);
    res.render('404', { message: ' on our server. Please try later.' })
  }
}

function isValidEmail(email) {
  const emailRegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/gi;
  return emailRegExp.test(email);
}

module.exports = { isEmailUnique, isValidEmail }
