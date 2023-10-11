export enum Routes {
  GET_COMPANIES = "/companies",
  GET_COMPANIES_BY_ID = "/companies/:id",
  GET_COMPANIES_BY_CNPJ = "/companies/by-cnpj",
  GET_COMPANIES_DELETED = "/companies/deleted",
  SAVE_COMPANIES = "/api/companies/save",
  UPDATE_COMPANIES = "/companies/:id",
  DELETE_COMPANIES = "/companies/:id",

  GET_ALL_DEPARTMENT = "/department",
  GET_DEPARTMENT_BY_PAGE = "/department/pagineted",
  GET_DEPARTMENT_BY_ID = "/department/:id",
  GET_DEPARTMENT_BY_NAME = "/department/by-name",
  SAVE_DEPARTMENT = "/department/save",
  UPDATE_DEPARTMENT = "/department/update/:id",
  DELETE_DEPARTMENT = "/department/:id",

  VERIFYTOKEN = "/api/verifyToken",
  UPDATE_USER_AFTER_DEPARTMENT = "/api/update/user_by_department",
  DELETE_USER_AFTER_DEPARTMENT = "/api/delete/user_by_department/",

  SAVE_USER = "/api/user/save",
}

export enum Permissions {
  SUPPORT = "SUPPORT",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  COLLABORATOR = "COLLABORATOR",
}
