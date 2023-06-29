import mongoose, { Schema } from "mongoose";

const sedimentsSchema: Schema = new mongoose.Schema({
  idDepartment: {
    type: String,
    required: false,
  },
  idCompany: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
  },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
});

const Sediments = mongoose.model("Sediments", sedimentsSchema);

export default Sediments;
