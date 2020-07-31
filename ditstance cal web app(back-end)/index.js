const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const connectDB = require("./config/db")

connectDB()

app.use(express.json({extended: false}))

app.use("/api", require("./routers/distance"))

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`)
})
