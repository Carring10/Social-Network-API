const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  // create and add thought to user
  addThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
      .then((thought) => {
        console.log(thought._id);
        return User.findOneAndUpdate(
          { $push: { thoughts: thought._id } },
        )
      })
      .then((thoughtsData) => res.json(thoughtsData))
      .catch((err) => res.status(500).json(err));
  },
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
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
}