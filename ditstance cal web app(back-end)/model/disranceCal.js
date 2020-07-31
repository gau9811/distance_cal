const mongoose = require("mongoose")
const Schema = mongoose.Schema

const distance = new Schema({
  name: {
    type: String,
  },
  distanceTake: [
    {
      distance: {
        type: Number,
      },
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
      date: {
        type: String,
      },
    },
  ],
  date: {type: Date, default: Date.now},
})

module.exports = Distance = mongoose.model("Distance", distance)
