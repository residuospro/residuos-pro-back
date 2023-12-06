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

  SAVE_SEDIMENTS = "/api/sediments/save",
  GET_SEDIMENTS_BY_PAGE = "/api/sediments/pagineted",
  GET_NAME_OF_SEDIMENTS = "/api/sediments/by-name",
  GET_SEDIMENTS_BY_NAME = "/api/sediments/get-name",
  UPDATE_SEDIMENTS = "/sediments/update/:id",
  DELETE_SEDIMENT = "/sediment/:id",

  SAVE_USER = "/api/user/save",
  SAVE_SUPPORT = "/api/support/save",
  UPDATE_USER = "/user/update/:id",
  REDEFINE_PASSWORD = "/api/redefine_password",
  CHANGE_PASSWORD = "/api/change_password/:id",
  CREATE_PASSWORD = "/api/create_password/:id",
  DELETE_USER = "/user/:id",
  UPDATE_USER_AFTER_DEPARTMENT = "/api/update/user_by_department",
  DELETE_USER_AFTER_DEPARTMENT = "/api/delete/user_by_department/:id",

  GET_USERS = "/users",
  GET_USER_BY_USERNAME = "/user/by-username",
  GET_ALL_USERNAMES = "/user/all",

  LOGIN = "/api/login",
  PAYLOAD = "/api/payload",
  REFRESH_TOKEN = "/api/refresh_token",
  VERIFYTOKEN = "/api/verifyToken",
  USER_EXISTS = "/api/user_exists/:id",
}

export enum Permissions {
  MASTER = "MASTER",
  SUPPORT = "SUPPORT",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  COLLABORATOR = "COLLABORATOR",
}

export enum Messages {
  TITLE_REGISTER = "Cadastrado",
  SUBTITLE_REGISTER = "Cadastro realizado com sucesso",

  TITLE_ERROR_REGISTER = "Erro ao cadastrar",
  SUBTITLE_ERROR_REGISTER = "Houve um erro inesperado no cadastro",

  TITLE_ERROR = "Houve um erro inesperado",
  SUBTITLE_ERROR = "Tivemos um erro em nosso servidor, por favor tente novamente",

  TITLE_DELETE_REGISTER = "Deletado",
  SUBTITLE_DELETE_REGISTER = "Registro deletado com sucesso",

  TITLE_ERROR_DELETE_REGISTER = "Erro ao deletar",
  SUBTITLE_ERROR_DELETE_REGISTER = "Houve um erro inesperado ao deletar",

  TITLE_UPDATE_REGISTER = "Atualizado",
  SUBTITLE_UPDATE_REGISTER = "Registro atualizazdo com sucesso",

  TITLE_ERROR_UPDATE_REGISTER = "Erro ao atualizar",
  SUBTITLE_ERROR_UPDATE_REGISTER = "Houve um erro inesperado ao atualizar",

  SUBTITLE_EXISTENT_DEPARTMENT = "O departamento que você está tentando criar já existe em nosso banco",
  SUBTITLE_EXISTENT_SEDIMENT = "O resíduo que você está tentando criar já existe em nosso banco",
  SUBTITLE_ERROR_UPDATE_DEPARTMENT = "Esse nome de departamento já existe em nosso banco",
  SUBTITLE_ERROR_UPDATE_SEDIMENTS = "Esse nome de resíduo já existe em nosso banco",

  TITLE_THERE_ARE_NO_RECORDS = "Não há registros",
  SUBTITLE_THERE_ARE_NO_RECORDS = "Não foram encontrados registros para essa busca",

  TITLE_EXISTING_USER = "Username inválido",
  SUBTITLE_EXISTING_USER = "O nome de usuário fornecido já existe em nosso banco",
}

export enum Event {
  CHANNEL = "residuos-pro",
  DEPARTMENT_CREATED = "department_created",
  UPDATED_DEPARTMENT = "updated_department",
  DELETED_DEPARTMENT = "deleted_department",

  SEDIMENT_CREATED = "sediment_created",
  UPDATED_SEDIMENT = "updated_sediment",
  DELETED_SEDIMENT = "deleted_sediment",

  USER_CREATED = "user_created",
  UPDATED_USER = "updated_user",
  DELETED_USER = "deleted_user",
}

export enum Service {
  SAVEMONEY = "SaveMoney",
  RESIDUOSPRO = "Residuos-Pro",
}

export enum Actions {
  CREATE = "create",
  UPDATE = "update",
}
