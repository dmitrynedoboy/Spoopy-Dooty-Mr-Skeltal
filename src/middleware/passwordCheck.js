const bcrypt = require('bcrypt');

function isPasswordConfirm(password, passwordConfirm) {
  return (password === passwordConfirm);
}

async function isPasswordValid(password, hashedPassword) {
  try {
    const isPassValid = await bcrypt.compare(password, hashedPassword);
    return isPassValid;
  } catch (error) {
    console.log(error);
    res.render('404', { message: ' on our server. Please try later.' });
  }
}

module.exports = { isPasswordConfirm, isPasswordValid }
