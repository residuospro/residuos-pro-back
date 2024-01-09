import mongoose, { Schema } from "mongoose";
import { ICollectionSchema } from "../utils/interfaces";

const collectionSchema: Schema = new mongoose.Schema({
  idCompany: {
    type: String,
    require: true,
  },
  idDepartment: {
    type: String,
    require: true,
  },
  orderNumber: {
    type: String,
    require: false,
  },
  userId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    trim: true,
    require: false,
    lowercase: true,
    validate: {
      validator(value: string) {
        return value.includes("@");
      },
      message: "Email inválido",
    },
  },
  ramal: {
    type: Number,
    required: true,
  },
  sedimentsId: {
    type: String,
    require: true,
  },
  sedimentName: {
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
  measure: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  packaging: {
    type: String,
    require: true,
  },
  observation: {
    type: String,
    require: false,
  },
  reasonRefusal: { type: String, require: false },
  status: {
    type: String,
    require: true,
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

const Collection = mongoose.model<ICollectionSchema>(
  "collection",
  collectionSchema
);

export default Collection;
