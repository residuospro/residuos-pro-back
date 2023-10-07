"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../utils/enum");
const AxiosClient_1 = require("../clients/AxiosClient");
class ExternalApiService {
    static validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, AxiosClient_1.setBearerAuthorization)((0, AxiosClient_1.useClient)(), token);
                const response = yield (0, AxiosClient_1.useClient)().get(enum_1.Routes.VERIFYTOKEN);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateUserAfterDepartment(name, ramal, idDepartment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    name,
                    ramal,
                    idDepartment,
                };
                const response = yield (0, AxiosClient_1.useClient)().post(enum_1.Routes.UPDATE_USER_AFTER_DEPARTMENT, data);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteUserAfterDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, AxiosClient_1.useClient)().delete(`${enum_1.Routes.DELETE_USER_AFTER_DEPARTMENT}${id}`);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ExternalApiService;
//# sourceMappingURL=externalApi_service.js.map