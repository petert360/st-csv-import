const Patient = require('../../models/patient');

exports.parse = (data) => {
  const patient = new Patient({
    name: data['name'],
    appointment: data['appointment'],
  });
  return patient.save();
};