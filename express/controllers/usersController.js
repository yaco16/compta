const Users = require('../models/usersModel');

module.exports = {
  createUser: async (req, res) => {
    try {
     const newUser =  await Users.createUser(req.body);
     console.log('newUser:', newUser);
     newUser.length > 0 && res.status(200).json({result: 'success', newUser});
     newUser.length === 0 && res.status(400).json({result: 'error', message: 'Error: this email already exists'});


    } catch (error) {
      console.log(error);
      res.status(400).json({ result: 'Error while creating your account : try again' });
    }
  },
};
