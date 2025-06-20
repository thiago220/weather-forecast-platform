import { Schema, model } from 'mongoose'

const SearchHistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  query: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default model('SearchHistory', SearchHistorySchema)
