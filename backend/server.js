const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongooose = require("mongoose");

const { readdirSync } = require("fs");
const app = express();

//For Cors .
// let allowed = ["http://localhost:3000", "some other links..."];
// function options(req, res) {
//   let temp;
//   let origin = req.header("Origin");
//   if (allowed.indexOf(origin) > -1) {
//     temp = {
//       origin: true,
//       optionSuccessStatus: 200,
//     };
//   } else {
//     temp = {
//       origin: "Not Allowed",
//       optionSuccessStatus: 200,
//     };
//   }
//   res(null, temp);
// }

//Routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//DataBase..
mongooose
  .connect(process.env.DATABASE_URL, {
    useNewUrlparser: true,
  })
  .then(() => console.log("Database connected successFully...."))
  .catch((err) => console.log("Error connecting to mongoDB..", err));

app.use(cors());
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening at Port ${PORT}...`);
});
