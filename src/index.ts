import express from "express";

const app = express();

const port = 4000;

app.get("/", (req, res) => {
  res.status(200).json({ pong: true });
});

app.listen(port);
