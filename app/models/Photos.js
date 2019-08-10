import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  user_id: { type: String},
  name: { type: String, default: ""},
  album: { type: String, default: ""},
  photo_url: {type: String},
  icon_url: {type: String, default: ""},
});

export default mongoose.model("Photo", PhotoSchema);
