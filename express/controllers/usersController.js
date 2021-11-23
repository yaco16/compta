const Users = require('../models/usersModel');

module.exports = {
  signup: async (req, res) => {
    try {
      const newUser = await Users.createUser(req.body);
      console.log('newUser:', newUser);
      newUser.length > 0 && res.status(200).json({ result: 'success', newUser });
      newUser.length === 0 && res.status(400).json({ result: 'error', message: 'Error: this email already exists' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ result: 'Error while creating your account : try again' });
    }
  },

  login: async (req, res) => {

    try {
      const request = await Users.checkLogin(req.body);
      const {errorCode, user} = request;

      switch (errorCode){
        case 0:
          console.log('connected');
          let accessToken = user.tokens.accessToken;
          res
          .status(200)
          .cookie('access_token', accessToken, {httpOnly: true, secure: false, maxAge: 55*60*1000}) //55mn
          .json({ result: 'success', message: 'You are connected' });
          break;
        case 1:
          res
          .status(400)
          .json({ result: 'error', message: 'Error: this email does not exist' });
          break;
        case 2:
          res
          .status(400)
          .json({ result: 'error', message: 'Error: password does not match' });
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ result: 'Error while getting your account : try again' });
    }
  },

  logout: async (req, res) => {
    console.log('dans logout controller');
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
  }
};
