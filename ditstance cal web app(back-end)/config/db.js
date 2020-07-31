const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    if (!connect) {
      console.log("mongodb is not connected")
      // Exit process with failure
      process.exit(1)
    } else {
      console.log("mongodb connected you are ready to go")
    }
  } catch (err) {
    console.log(err)
  }
}
module.exports = connectDB
