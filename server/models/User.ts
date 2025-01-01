import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  purchasedTickets: {
    type: Map,
    of: Number,
    default: {}
  },
  savedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }]
});

export default mongoose.model('User', userSchema);