import { Document } from "mongoose";
export interface IUser {
  name: string;
  username: string;
  password: string;
  email: string;
  ramal: number;
}

export interface ICompany {
  name: string;
  address: string;
  cnpj: number;
  fantasyName: string;
  street: string;
  state: string;
  cep: number;
  city: string;
  country: string;
  phone: number;
  email: string;
}

export interface ICompanySchema extends Document {
  name: string;
  address: string;
  cnpj: number;
  fantasyName: string;
  street: string;
  state: string;
  cep: number;
  city: string;
  country: string;
  phone: number;
  email: string;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

export interface IDepartment extends Document {
  name: string;
  idCompany: string;
  ramal: number;
  email: string;
  responsible: string;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

export interface IUserSchema extends Document {
  name: string;
  idDepartment?: string;
  idCompany?: string;
  role: string[];
  ramal: number;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

export interface IRefreshToken extends Document {
  userId: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IDepartmentService {
  name: string;
  responsible: string;
  email: string;
  ramal: number;
  idCompany: string;
}

export interface UserDataService {
  name: string;
  idDepartment: string;
  department: string;
  idCompany: string;
  role: string[];
  ramal: number;
  username: string;
  password: string;
  email: string;
}

export interface IUpdateDepartment {
  name: string;
  responsible: string;
  email: string;
  ramal: number;
}
