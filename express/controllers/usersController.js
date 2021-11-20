const Users = require('../models/usersModel');

module.exports = {
  createUser: async (req, res) => {
    try {
     const newUser =  await Users.createUser(req.body);
      console.log('success : new user created')
      res.status(200).json({message: 'success', newUser});
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'error' });
    }
  },
};
