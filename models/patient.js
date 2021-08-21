const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
//    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    appointment: Date,
  },
  {
    timestamps: true, // add created_at , updated_at at the time of insert/update
  }
);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
