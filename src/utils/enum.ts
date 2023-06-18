export enum Routes {
  GET_USERS = "/users",
  GET_USER_BY_USERNAME = "/user/by-username",
  SAVE_USER = "/user/save",
  UPDATE_USER = "/user/:id",
  DELETE_USER = "/user/:id",

  SAVE_SUPPORT = "/support",

  GET_MANAGER = "/manager",
  GET_MANAGER_BY_USERNAME = "/manager/by-username",
  SAVE_MANAGER = "/manager/save",
  UPDATE_MANAGER = "/manager/:id",
  DELETE_MANAGER = "/manager/:id",

  GET_COLLABORATOR = "/collaborator",
  GET_COLLABORATOR_BY_USERNAME = "/collaborator/by-username",
  SAVE_COLLABORATOR = "/collaborator/save",
  UPDATE_COLLABORATOR = "/collaborator/:id",
  DELETE_COLLABORATOR = "/collaborator/:id",

  GET_COMPANIES = "/companies",
  GET_COMPANIES_BY_ID = "/companies/:id",
  GET_COMPANIES_BY_CNPJ = "/companies/by-cnpj",
  GET_COMPANIES_DELETED = "/companies/deleted",
  SAVE_COMPANIES = "/companies/save",
  UPDATE_COMPANIES = "/companies/:id",
  DELETE_COMPANIES = "/companies/:id",

  GET_ALL_DEPARTMENT = "/department",
  GET_DEPARTMENT_BY_PAGE = "/department/pagineted",
  GET_DEPARTMENT_BY_ID = "/department/:id",
  GET_DEPARTMENT_BY_NAME = "/department/by-name",
  SAVE_DEPARTMENT = "/department/save",
  UPDATE_DEPARTMENT = "/department/update/:id",
  DELETE_DEPARTMENT = "/department/:id",

  LOGIN = "/login",
  PAYLOAD = "/payload",
}

export enum Permissions {
  SUPPORT = "SUPPORT",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  COLLABORATOR = "COLLABORATOR",
}
