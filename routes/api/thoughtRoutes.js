const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  addThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(addThought);

// /api/Thoughts/:ThoughtId
router
.route('/:_id')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

module.exports = router;