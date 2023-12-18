import { checkSchema } from "express-validator";

export const departmentCreateSchema = checkSchema({
  name: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Nome do departamento não fornecido",
  },
  idCompany: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Id da empresa não fornecido",
  },
  ramal: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
    errorMessage: "Ramal do departamento não fornecido",
  },
});
