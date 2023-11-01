import mongoose, { Schema } from "mongoose";
import { ISediments } from "../utils/interfaces";

const sedimentsSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classification: {
    type: String,
    required: true,
  },
  risk: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  packaging: {
    type: String,
    required: true,
  },
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

const Sediments = mongoose.model<ISediments>("Sediments", sedimentsSchema);

export default Sediments;
