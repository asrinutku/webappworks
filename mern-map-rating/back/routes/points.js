const router = require("express").Router();
const Point = require("../models/Point");

router.post("/", async (req, res) => {
  const newPoint = new Point(req.body);
  try {
    const savedPin = await newPoint.save();
    res.status(200).json(savedPin);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get("/" , async (req,res) =>{
    try {
        const pins = await Point.find();
        res.status(200).json(pins);
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;
