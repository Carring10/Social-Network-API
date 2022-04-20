const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  addThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(addThought);

// /api/Thoughts/:ThoughtId
router
.route('/:_id')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction)
.delete(removeReaction);

module.exports = router;