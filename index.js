const express = require("express");
const path = require("path");
const env = require("dotenv");

env.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
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

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));
