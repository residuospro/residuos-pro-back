"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClient = exports.setBearerAuthorization = exports.setupClient = void 0;
const axios_1 = __importDefault(require("axios"));
let restClient;
const setupClient = (baseUrl) => {
    restClient = axios_1.default.create({
        baseURL: baseUrl,
    });
};
exports.setupClient = setupClient;
const setBearerAuthorization = (client, token) => {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
exports.setBearerAuthorization = setBearerAuthorization;
const useClient = () => restClient;
exports.useClient = useClient;
//# sourceMappingURL=AxiosClient.js.map