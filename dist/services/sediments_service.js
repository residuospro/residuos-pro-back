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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sediment_1 = __importDefault(require("../models/sediment"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
class SedimentsService {
    static createSedimentsService(sediment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, idCompany, idDepartment } = sediment;
                const existingSediment = yield sediment_1.default.findOne({
                    name,
                    idCompany,
                    idDepartment,
                });
                if (existingSediment != null) {
                    throw new Error("Esse resíduo já foi cadastrado");
                }
                const sediments = new sediment_1.default(Object.assign({}, sediment));
                const saveSedments = yield sediments.save();
                return saveSedments;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getSedimentsByPageService(idCompany, idDepartment, skip, itemsPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sediments = yield sediment_1.default.find({
                    idCompany,
                    idDepartment,
                    deleted: false,
                })
                    .skip(skip)
                    .limit(itemsPerPage);
                if (sediments.length == 0) {
                    throw new handleError_1.default("Não há registros pra esse busca", 404);
                }
                const totalSediments = yield sediment_1.default.find({
                    idCompany,
                    idDepartment,
                    deleted: false,
                }).count();
                const totalPages = Math.ceil(totalSediments / itemsPerPage);
                return { sediments, totalPages };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getNameOfSedimentsService(idCompany, idDepartment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sediments = yield sediment_1.default.find({
                    idCompany,
                    idDepartment,
                    deleted: false,
                });
                return sediments;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = SedimentsService;
//# sourceMappingURL=sediments_service.js.map