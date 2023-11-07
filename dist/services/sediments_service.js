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
                    throw new handleError_1.default("Esse resíduo já foi cadastrado", 409);
                }
                const sediments = new sediment_1.default(Object.assign({}, sediment));
                const saveSedments = yield sediments.save();
                return saveSedments;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getSedimentsByPageService(idCompany, idDepartment, skip, itemsPerPage, throwException) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sediments = yield sediment_1.default.find({
                    idCompany,
                    idDepartment,
                    deleted: false,
                })
                    .skip(skip)
                    .limit(itemsPerPage);
                if (sediments.length == 0 && throwException) {
                    throw new handleError_1.default("Não há registros pra esse busca", 404);
                }
                let totalSediments = yield sediment_1.default.find({
                    idCompany,
                    idDepartment,
                    deleted: false,
                }).count();
                const totalPages = Math.ceil(totalSediments / itemsPerPage);
                return { sediments, totalPages };
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
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
    static getSedimentByNameService(name, idCompany, idDepartment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sediment = yield sediment_1.default.findOne({
                    name,
                    idCompany,
                    idDepartment,
                    deleted: false,
                });
                return sediment;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static updateSedimentService(sediment, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, idCompany, idDepartment } = sediment[0];
                if (name) {
                    let existingSediment = (yield sediment_1.default.findOne({
                        name,
                        idCompany,
                        idDepartment,
                        deleted: false,
                    }));
                    if (existingSediment) {
                        throw new handleError_1.default("Esse resíduo já existe", 409);
                    }
                }
                let sedimentToEdit = (yield sediment_1.default.findById(id));
                for (const key in sediment[0]) {
                    const value = sediment[0][key];
                    if (value) {
                        sedimentToEdit[key] = value;
                    }
                }
                const updateSediment = yield sedimentToEdit.save();
                return updateSediment;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error("Resíduo não encontrado");
            }
        });
    }
    static deleteSedimentService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const sediment = yield sediment_1.default.findByIdAndUpdate(id, {
                    deleted: true,
                    deletedAt: currentDate,
                }, { new: true });
                return sediment;
            }
            catch (error) {
                throw new Error("Resíduo não encontrado");
            }
        });
    }
}
exports.default = SedimentsService;
//# sourceMappingURL=sediments_service.js.map