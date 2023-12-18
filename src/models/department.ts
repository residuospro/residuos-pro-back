import mongoose, { Schema } from "mongoose";
import { IDepartment } from "../utils/interfaces";

const departmentSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  idCompany: {
    type: String,
    required: true,
  },
  ramal: {
    type: String,
    required: true,
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

const Department = mongoose.model<IDepartment>("department", departmentSchema);

export default Department;
