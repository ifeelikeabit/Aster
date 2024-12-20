const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/client.html"));
});



const websocket = require("./websocket");
websocket.start();
app.listen(port, function (err) {
  if (err) console.log(err);
  console.log(`Server started:${port}`);
});
