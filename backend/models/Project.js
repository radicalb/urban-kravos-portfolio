// Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  tittle: { type: String, required: true },
  postBody: { type: String, required: true },
  img1: { type: String, required: true },
  img2: { type: String, required: true },
  img3: { type: String, required: true },
  gitUrl: { type: String, required: true }
});

module.exports = mongoose.model('Project', ProjectSchema);
