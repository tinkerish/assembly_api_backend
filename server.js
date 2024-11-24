const { assemblyai } = require("./assemly_api.js");
require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
app.use(cors());
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, DELETE, PUT, PATCH');
  res.setHeader('Access-Control-Allow-Headers','*');
  next();
})
app.use(express.json());
app.options("*", cors());
app.use(express.raw({ type: "audio/*", limit: "10mb" }));
app.post("/", async (req, res) => {
  try {
    const audioFile = req.body;
    const transcript = await assemblyai(audioFile);
    res.send(transcript);
  } catch (error) {
    console.error("Error during transcription:", error);
    res
      .status(500)
      .send({ error: "Transcription failed", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
