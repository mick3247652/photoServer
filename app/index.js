import express from "express";
import bodyParser from "body-parser";

import { connect as mongooseConnect } from "./db/mongoose-connection";
import { version } from "./config";
import Photo from "./models/Photos";

const app = express();
app.use(bodyParser.json());

app.get("/api/home", function(req, res) {
  res.status(200).send("Welcome to photo server!");
});

app.get("/api/version", function(req, res) {
  res.status(200).send(version);
});

app.post("/api/add_photos", async (req, res) => {
  try {
    const { user_id, name, album, photos } = req.body;
    if (!user_id) throw "user id not found";
    await photos.forEach(async element => {
      const photo_url = element.photo_url;
      const icon_url = element.icon_url;
      const photo = new Photo({ user_id, name, album, photo_url, icon_url });
      await photo.save();
    });
    res.status(200).send("You photos is add");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error add you photos, please try again.");
  }
});

app.post("/api/get_all_photos", async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) throw "user id is empty";
    const photos = await Photo.find({ user_id }).exec();
    if (!photos) {
      res.status(401).send("user id not found");
    }
    res.status(200).send(photos);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error get you photos please try again. err ${err}`);
  }
});

app.post("/api/get_photos_in_album", async (req, res) => {
  try {
    const { user_id, album } = req.body;
    if (!user_id) throw "user id is empty";
    const photos = await Photo.find({ user_id, album }).exec();
    if (!photos) {
      res.status(401).send("user id or album not found");
    }
    res.status(200).send(photos);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error get you photos please try again. err ${err}`);
  }
});

/*app.post("/api/get_albums", async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) throw "user id is empty";
    const photos = await Photo.find({ user_id}).exec();
    if (!photos) {
      res.status(401).send("user id not found");
    }
    console.log(photos)
    const albums = new Set()
    photos.forEach(v => {
      if(v.album) albums.add(v.album) 
    })
    console.log(albums)
    res.status(200).send(albums);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error get you photos please try again. err ${err}`);
  }
});*/

app.post("/api/delete_photo", async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) throw "id is empty";
    await Photo.deleteOne({ _id }).exec();
    res.status(200).send("OK");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error delete photo please try again.");
  }
});

/*
app.get("/api/get_all_questions", async (req, res) => {
  try {
    const questions = await Question.find({}).exec();
    if (!questions) {
      res.status(401).send("questions not found");
    }
    res.status(200).send(questions);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error get you questions please try again. err ${err}`);
  }
});


app.post('/api/add_answer', async (req, res) => {
  try {
    const { _id, email, answer, name, photo } = req.body;
    if(!email) throw "email is empty"
    if(!_id) throw "id is empty"
    const question = await Question.findOne({ _id }).exec()
    if(!question) throw "question not found"
    question.answers.push({
      fromEmail: email,
      answer,
      name,
      photo,
    })
    await question.save()
    res.status(200).send(question);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error add you answer please try again.");
  }
})

app.post('/api/delete_question', async (req, res) => {
  try{
    const { _id } = req.body;
    if(!_id) throw "id is empty"
    await Question.deleteOne({ _id }).exec()
    res.status(200).send("OK");
  } catch(err) {
    console.log(err);
    res.status(500).send("Error add you answer please try again.");
  }
})

app.post("/api/get_question", async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) throw "_id is empty";
    const question = await Question.findOne({ _id }).exec();
    if (!question) {
      res.status(401).send("_id not found");
    }
    res.status(200).send(question);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error get you questions please try again. err ${err}`);
  }
});
*/
const connect = async () => {
  try {
    await mongooseConnect();
    let port = process.env.PORT;
    if (!port) {
      port = 3001;
    }
    await app.listen(port);

    console.log("listening on port 3001");
  } catch (err) {
    console.log(err);
  }
};

connect();
