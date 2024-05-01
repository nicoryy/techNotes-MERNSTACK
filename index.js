const express = require("express");
const path = require("path");
const env = require("dotenv");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const app = express();

env.config();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions))
app.use(logger);
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.use("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else {
    res.send({ message: "404 Not Found" });
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));
