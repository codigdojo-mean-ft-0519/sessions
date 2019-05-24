const User = require('mongoose').model('User');
const { Http } = require('@status/codes');

module.exports = {
  login(request, response) {
    console.log('logging in');
    const { email, password } = request.body;

    User.findOne({ email })
      .then(user => {
        console.log('user is ', user);
        return User.validatePassword(password, user.password).then(isValid => {
          if (!isValid) {
            throw new Error();
          }

          // login
          completeLogin(request, response, user);
        });
      })
      .catch(error => {
        console.log(error);
        response
          .status(Http.Unauthorized)
          .json('Email/password combo not found');
      });
  },
  register(request, response) {
    User.create(request.body).then(user => {
      // login
      completeLogin(request, response, user);
    });
  },
  logout(request, response) {
    console.log('loogin out');

    request.session.destroy();
    response.clearCookie('userID');
    response.clearCookie('expiration');
    response.json(true);
  },
};

function completeLogin(request, response, document) {
  const user = document.toObject();

  delete user.password;

  request.session.user = user;

  console.log(request.session);

  response.cookie('userID', user._id);
  response.cookie('expiration', Date.now() + 86400 * 1000);
  response.json(user);
}
