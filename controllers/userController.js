const User = require('../models/User');

module.exports = {
  // create user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // get all users
  getUsers(req, res) {
    User.find()
      .then((usersData) => res.json(usersData))
      .catch((err) => res.status(500).json(err));
  },

  // get one user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params._id })
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // update user
  updateUser(req, res) {
    User.updateOne(
      { _id: req.params._id },
      { $set: req.body },
    )
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // delete user
  deleteUser(req, res) {
    User.deleteOne({ _id: req.params._id })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // add friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { id: req.params.id },
      { $push: { friends: req.params.friendId } },
    )
      .then((friendsData) => res.json(friendsData))
      .catch((err) => res.status(500).json(err));
  },
  
  // remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { id: req.params.id },
      { $pull: { friends: req.params.friendId } },
    )
      .then((friendsData) => res.json(friendsData))
      .catch((err) => res.status(500).json(err));
  },
}