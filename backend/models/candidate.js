module.exports = function (mongoose) {
  const modelName = "candidate";

  const candidateSchema = new mongoose.Schema({
    "Name of the Candidate": { type: String, required: true },
    Email: { type: String, unique: true, required: true },
    "Mobile No": { type: String },
    "Date of Birth": { type: String },
    "Work Experience": { type: String },
    "Resume Title": { type: String },
    "Current Location": { type: String },
    "Postal Address": { type: String },
    "Current Employer": { type: String },
    "Current Designation": { type: String },
  });

  if (mongoose.modelNames().includes(modelName)) {
    mongoose.deleteModel(modelName);
  }
  return mongoose.model(modelName, candidateSchema);
};
