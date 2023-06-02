import { checkSchema } from "express-validator";

export const createCompanySchema = checkSchema({
  name: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Nome da empresa não fornecido",
  },
  address: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Bairro da empresa não fornecido",
  },
  cnpj: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
    errorMessage: "Cnpj da empresa não fornecido",
  },
  fantasyName: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Nome fantasia da empresa não fornecido",
  },
  street: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Rua da empresa não fornecido",
  },
  state: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Estado da empresa não fornecido",
  },
  cep: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
    errorMessage: "CEP da empresa não fornecido",
  },
  city: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Cidade da empresa não fornecido",
  },
  country: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Pais da empresa não fornecido",
  },
  email: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Email da empresa não fornecido",
  },
  phone: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
    errorMessage: "Telefone da empresa não fornecido",
  },
});
