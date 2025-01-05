import mongoose from 'mongoose';

const ticketTierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  availableTickets: {
    type: Number,
    required: true
  },
  benefits: [{
    type: String
  }],
  isHighlighted: {
    type: Boolean,
    default: false
  }
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Music', 'Sports', 'Theater', 'Comedy', 'Arts', 'Food & Drink', 'Business', 'Technology']
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  ticketTiers: {
    type: [ticketTierSchema],
    default: []  // Making it optional with empty array default
  },
  images: [{
    type: String,
    required: true
  }],
  videos: [{
    type: String,
    maxItems: 2
  }],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organizerRemarks: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Event', eventSchema);