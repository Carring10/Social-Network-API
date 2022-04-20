const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = (date) => new Date(date).toLocaleString();

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true,
    },
    // TODO: reactions
    reactions: [reactionSchema]
  }
)

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
