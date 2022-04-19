const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: { 
      type: String, 
      required: true,
      unique: true,
      trim: true, 
    },
    email: { 
      type: String, 
      required: true,
      unique: true,
      trim: true,
      match: /.+\@.+\..+/, 
    },
    // TODO: thoughts
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      }
    ]
    // TODO: friends
  }
)

const User = model('user', userSchema);

module.exports = User;