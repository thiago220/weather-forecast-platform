import { Schema, model } from 'mongoose'

const SearchHistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  query: { type: String, required: true },
  weather: {
    name: String,
    main: {
      temp: Number,
      humidity: Number,
    },
    weather: [{
      description: String,
    }],
  },
  createdAt: { type: Date, default: Date.now }
})


export default model('SearchHistory', SearchHistorySchema)
