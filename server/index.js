require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

require("./routes/gateway.routes")(app);
require("./routes/device.routes")(app);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
