// Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  orderingId: { type: Number, required: true },
  tittle: { type: String, required: true },
  postBody: { type: String, required: true },
  img1: { type: String, required: true },
  img2: { type: String, required: true },
  img3: { type: String, required: true },
  gitUrl: { type: String, required: true }
});

ProjectSchema.statics.getNexOrderingId = function getNexOrderingId(cb) {
  return this.find()
    .sort({ orderingId: -1 })
    .limit(1)
    .select({ orderingId: 1, _id: 0 })
    .exec(cb);
  /*     .exec((err, value) => {
      console.log(value[0]);

      nextId = value[0].orderingId + 1;
      console.log('--------------nextId ' + nextId);
      return nextId;
    }); */
};

module.exports = mongoose.model('Project', ProjectSchema);
