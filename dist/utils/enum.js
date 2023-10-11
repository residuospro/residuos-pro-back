"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports.Routes = void 0;
var Routes;
(function (Routes) {
    Routes["GET_COMPANIES"] = "/companies";
    Routes["GET_COMPANIES_BY_ID"] = "/companies/:id";
    Routes["GET_COMPANIES_BY_CNPJ"] = "/companies/by-cnpj";
    Routes["GET_COMPANIES_DELETED"] = "/companies/deleted";
    Routes["SAVE_COMPANIES"] = "/api/companies/save";
    Routes["UPDATE_COMPANIES"] = "/companies/:id";
    Routes["DELETE_COMPANIES"] = "/companies/:id";
    Routes["GET_ALL_DEPARTMENT"] = "/department";
    Routes["GET_DEPARTMENT_BY_PAGE"] = "/department/pagineted";
    Routes["GET_DEPARTMENT_BY_ID"] = "/department/:id";
    Routes["GET_DEPARTMENT_BY_NAME"] = "/department/by-name";
    Routes["SAVE_DEPARTMENT"] = "/department/save";
    Routes["UPDATE_DEPARTMENT"] = "/department/update/:id";
    Routes["DELETE_DEPARTMENT"] = "/department/:id";
    Routes["VERIFYTOKEN"] = "/api/verifyToken";
    Routes["UPDATE_USER_AFTER_DEPARTMENT"] = "/api/update/user_by_department";
    Routes["DELETE_USER_AFTER_DEPARTMENT"] = "/api/delete/user_by_department/";
    Routes["SAVE_USER"] = "/api/user/save";
})(Routes = exports.Routes || (exports.Routes = {}));
var Permissions;
(function (Permissions) {
    Permissions["SUPPORT"] = "SUPPORT";
    Permissions["ADMIN"] = "ADMIN";
    Permissions["MANAGER"] = "MANAGER";
    Permissions["COLLABORATOR"] = "COLLABORATOR";
})(Permissions = exports.Permissions || (exports.Permissions = {}));
//# sourceMappingURL=enum.js.map