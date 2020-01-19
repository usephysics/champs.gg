const mongoose = require("mongoose");

let counterSchema = new mongoose.Schema({
  champion: mongoose.Schema.Types.ObjectId,
  difficulty: Number,
  comments: String
})

let contributorSchema = new mongoose.Schema({
  name: String,
  twitter: String,
  twitch: String,
  opgg: String,
  discord: String,
  bio: String,
  portrait: String,
  message: String,
  comments: String
});

let championSchema = new mongoose.Schema({
  name: { type: String },
  shortname: { type: String },
  numVotes: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  contributors: [contributorSchema],
  roles: [String],
  counters: [{
    role: String,
    champions: [counterSchema]
  }]
});

championSchema.set("toJSON", { virtuals: true });

const Champion = mongoose.model("Champion", championSchema, "Champions");

module.exports = { Champion };
