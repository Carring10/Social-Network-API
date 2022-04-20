const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  // create and add thought to user
  addThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: thought.username },
          { $push: { thoughts: thought._id } },
        )
      })
      .then((thoughtsData) => res.json(thoughtsData))
      .catch((err) => res.status(500).json(err));
  },

  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .populate('reactions')
      .then((thoughtsData) => res.json(thoughtsData))
      .catch((err) => res.status(500).json(err));
  },

  // get one thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params._id })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // update thought
  updateThought(req, res) {
    Thought.updateOne(
      { _id: req.params._id },
      { $set: req.body },
    )
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // delete thought
  deleteThought(req, res) {
    Thought.deleteOne({ _id: req.params._id })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // add reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { id: req.params.thoughtId },
      { $push: { reactions: req.body } },
    )
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // remove reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { id: req.params.thoughtId },
      { $pull: { reactions: req.body } },
    )
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },
}