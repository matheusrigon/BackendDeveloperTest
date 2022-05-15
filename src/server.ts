import express from "express"
import mongoose, { Connection } from "mongoose"
import bodyParser from "body-parser"

const app = express();
const Video = require("./Models/Video");

app.use(bodyParser.json());

mongoose.connect("mongodb://db/Test")
.then(() => {console.log("Mongo connected!");})
.catch((e) => {console.log("Error: " + e);});

app.get("/video", async (request, response) => {
  var video = await Video.findOne({name: request.query.name})  
  
  if(!video)
    response.send("No video found!");
  else  
    response.send(video);
});

app.get("/health-check", async (request, response) => {  
  response.send(mongoose.connection.readyState == 1 ? "Connected!" : "Not connected");
});

app.get("/videoPaginated", async (request, response) => {
  var page = request.query.page ? Number(request.query.page) - 1 : 0
  var limit = request.query.limit && Number(request.query.limit) <= 500 ? Number(request.query.limit) : 50
  var isPublic = request.query.isPublic ? request.query.isPublic : false
  var viewTimes = request.query.viewTimes ? request.query.viewTimes : 42

  var video = await Video.find({isPublic: isPublic}).where('timesViewed').gte(viewTimes)
  .skip(page * limit)
  .limit(limit);
  
  response.send(video);
});

app.post("/video", (request, response) => {  
  var video = new Video(request.body);
  video.save()
  .then(() => console.log("Video created!"))
  .catch(() => console.log("Video not created!")); 
  
  response.send("Video created!");
});

app.put("/video", async (request, response) => {

    if(!request.body.name)
      response.send("Field 'name' requested to update!");
    else  
      Video.findOneAndUpdate({username: request.body.name}, { $set: request.body }, { new: true })
      .then(() => console.log("Video updated!"));

  response.send("Video updated!");
});

app.delete("/video", (request, response) => {  
  Video.deleteOne({name: request.query.name})
  .then(() => console.log("Video deleted!"))
  .catch(() => console.log("Video not deleted!"));  
  
  response.send("Deleted!");
});

app.listen(3000, () => console.log("Server is running!"));