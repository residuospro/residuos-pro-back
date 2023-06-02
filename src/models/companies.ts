import mongoose, { Schema } from "mongoose";
import { ICompanySchema } from "../utils/interfaces";

const companiesSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  address: {
    type: String,
    require: true,
    trim: true,
  },
  cnpj: {
    type: Number,
    min: 14,
    trim: true,
    require: true,
  },
  fantasyName: {
    type: String,
    trim: true,
    require: true,
  },
  street: {
    type: String,
    trim: true,
    require: true,
  },
  state: {
    type: String,
    trim: true,
    require: true,
  },
  cep: {
    type: Number,
    require: true,
  },
  city: {
    type: String,
    trim: true,
    require: true,
  },
  country: {
    type: String,
    trim: true,
    require: true,
  },
  phone: {
    type: Number,
    min: [9, "Digitos insuficientes"],
    trim: true,
    require: true,
  },
  email: {
    type: String,
    trim: true,
    unique: false,
    require: true,
    lowercase: true,
    validate: {
      validator(value: any) {
        return value.includes("@");
      },
      message: "Email inválido",
    },
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

const Companies = mongoose.model<ICompanySchema>("companies", companiesSchema);

export default Companies;
