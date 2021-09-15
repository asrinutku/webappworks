const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const PointRoute = require("./routes/points");
const UserRoute = require("./routes/users");

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("baglanti basarili");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/users", UserRoute);
app.use("/api/points", PointRoute);

app.listen(8800, () => {
  console.log("backend server is running !! ");
});
