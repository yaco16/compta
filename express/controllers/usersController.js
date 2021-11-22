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
      const user = await Users.checkLogin(req.body);

      switch (user.errorCode){
        case 0:
          console.log('connected');
          let accessToken = user.user.tokens.accessToken;
          res
          .cookie('access_token', accessToken, {httpOnly: true})
          .status(200)
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
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
  }
};
