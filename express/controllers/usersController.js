const Users = require('../models/usersModel');

module.exports = {
  createUser: async (req, res) => {
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

  getUser: async (req, res) => {
    try {
      const userSearched = await Users.checkLogin(req.body);
      console.log('userSearched:', userSearched);

      switch (userSearched.errorCode) {
        case 0:
          console.log('connected');
          res.status(200).json({ result: 'success', message: 'You are connected' });
          break;
        case 1:
          res.status(400).json({ result: 'error', message: 'Error: this email does not exist' });
          break;
        case 2:
          res.status(400).json({ result: 'error', message: 'Error: password does not match' });
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ result: 'Error while getting your account : try again' });
    }
  },
};
