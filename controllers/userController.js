const Thought = require('../models/Thought');
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
    console.log(req.params)
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // update user
  updateUser(req, res) {
    User.updateOne(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // delete user and it's comments
  deleteUser(req, res) {
    console.log(req.params)
    User.deleteOne({ _id: req.params.userId })
      .then(() => {
        console.log(req.params)
        return Thought.deleteMany({ id: { $in: req.params.userId } })
      })
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },

  // add friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { $new: true }
    )
      .then((friendsData) => res.json(friendsData))
      .catch((err) => res.status(500).json(err));
  },
  
  // remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((friendsData) => res.json(friendsData))
      .catch((err) => res.status(500).json(err));
  },
}