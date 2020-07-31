const express = require("express")
const router = express.Router()
const Distance = require("../model/disranceCal")

router.post("/travel", async (req, res) => {
  try {
    const distance = await new Distance({
      name: req.body.name,
      distanceTake: [
        {
          distance: req.body.distance,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          date: new Date(),
        },
      ],
    })

    await distance.save()

    if (distance) {
      res.json({msg: "successfully uploaded"}).statusCode(200)
    }
    res.json({err: "the user distance is not being uploaded"})
  } catch (err) {
    res.json(err).statusCode(500)
  }
})

router.put("/distance/:id", async (req, res) => {
  try {
    let dist = await Distance.findOneAndUpdate(
      {_id: req.params.id},
      {
        $push: {
          distanceTake: {
            distance: req.body.distance,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            date: new Date(),
          },
        },
      }
    )
    if (dist) {
      await dist.save()
      res.json(dist)
    }
  } catch (err) {
    res.json(err).statusCode(500)
  }
})

router.get("/distanceTotal/:id/:startTime/:endTime", async (req, res) => {
  let totalStart = await Distance.find({_id: req.params.id})

  let distanceTotal = []
  try {
    totalStart.forEach((Element) => {
      let num = Element.distanceTake
      for (let i = 0; i < num.length; i++) {
        num[i].startTime == req.params.startTime &&
        num[i].endTime == req.params.endTime
          ? distanceTotal.push(num[i].distance)
          : null
      }
    })
    let distance = distanceTotal.reduce((a, b) => a + b)
    res.json({TotalDistance: distance})
  } catch (err) {
    res.json({msg: err}).statusCode(500)
  }
})

module.exports = router
