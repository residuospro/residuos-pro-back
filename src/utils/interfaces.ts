import { Document } from "mongoose";

export interface IUser {
  name?: string;
  username?: string;
  password?: string;
  email?: string;
  ramal?: string;
  department?: string;
  idDepartment?: string;
  idCompany?: string;
  id?: string;
  service?: string;
  permission?: Array<string>;
  userId?: string;
}

export interface ITokenResponse {
  token: string;
  refreshToken: string;
}

import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
  name: string;
  permission: string[];
  userId: string;
  email: string;
  username: string;
  idCompany: string;
  idDepartment: string;
  department: string;
  ramal: number;
}

export interface ICreateUsers {
  email: string;
  department: string;
  ramal: string;
  idDepartment: string;
  idCompany: string;
  responsible: string;
}

export interface ISediments {
  name: string;
  classification: string;
  risk: string;
  state: string;
  idDepartment: string;
  idCompany: string;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
  totalItems?: number;
}

export type ISedimentsService = Pick<
  ISediments,
  | "classification"
  | "name"
  | "risk"
  | "state"
  | "idDepartment"
  | "idCompany"
  | "totalItems"
>;

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
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

export interface IUserSchema extends Document {
  name: string;
  idDepartment?: string;
  department?: string;
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
  username?: string;
  password: string;
  email: string;
  service: string;
}

export interface IUpdateDepartment {
  name: string;
  responsible: string;
  email: string;
  ramal: number;
  idCompany: string;
}

export interface ICollectionSchema {
  idCompany: string;
  userId: string;
  sedimentsId: string;
  measure: string;
  amount: number;
  packaging: string;
  observation: string;
  reasonRefusal: string;
  status: string;
  name: string;
  department: string;
  email: string;
  ramal: string;
  sedimentName: string;
  classification: string;
  orderNumber: string;
  risk: string;
  state: string;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
  totalItems?: number;
}

export interface ICollectionFilter {
  idCompany: string;
  orderNumber: string;
  sedimentName: null | string;
  department: null | string;
  status: null | string;
  date: string;
  createdAt?: any;
}
