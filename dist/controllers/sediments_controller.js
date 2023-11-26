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
const sediments_service_1 = __importDefault(require("../services/sediments_service"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
const enum_1 = require("../utils/enum");
class SedimentsController {
    createSediments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sediment = req.body;
                sediment.name =
                    sediment.name.charAt(0).toUpperCase() +
                        sediment.name.slice(1).toLowerCase();
                const sediments = yield sediments_service_1.default.createSedimentsService(sediment);
                const itemsPerPage = 10;
                sediment.totalItems = Number(sediment.totalItems) + 1;
                const totalPages = Math.ceil(sediment.totalItems / itemsPerPage);
                const message = {
                    title: enum_1.Messages.TITLE_REGISTER,
                    subTitle: enum_1.Messages.SUBTITLE_REGISTER,
                };
                const response = res.status(201).json({
                    sediments,
                    totalPages,
                    message,
                });
                return {
                    sediments,
                    totalPages,
                    response,
                };
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).json({
                        message: {
                            title: enum_1.Messages.TITLE_ERROR_REGISTER,
                            subTitle: enum_1.Messages.SUBTITLE_EXISTENT_SEDIMENT,
                        },
                    });
                }
                return res.status(500).json({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
            }
        });
    }
    getSedimentsByPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { itemsPerPage, idCompany, idDepartment } = req.body;
                const sediments = yield sediments_service_1.default.getSedimentsByPageService(idCompany, idDepartment, itemsPerPage);
                return res.status(200).json(sediments);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).json({
                        message: {
                            title: enum_1.Messages.TITLE_THERE_ARE_NO_RECORDS,
                            subTitle: enum_1.Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
                        },
                    });
                }
                return res.status(500).json({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
            }
        });
    }
    updateSediments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sediment = req.body;
                if (sediment.name) {
                    sediment.name =
                        sediment.name.charAt(0).toUpperCase() +
                            sediment.name.slice(1).toLowerCase();
                }
                const { id } = req.params;
                const sediments = yield sediments_service_1.default.updateSedimentService([sediment], id);
                const message = {
                    title: enum_1.Messages.TITLE_UPDATE_REGISTER,
                    subTitle: enum_1.Messages.SUBTITLE_UPDATE_REGISTER,
                };
                const response = res.status(201).json({
                    sediments,
                    message,
                });
                return { sediments, response };
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).json({
                        message: {
                            title: enum_1.Messages.TITLE_ERROR_UPDATE_REGISTER,
                            subTitle: enum_1.Messages.SUBTITLE_ERROR_UPDATE_SEDIMENTS,
                        },
                    });
                }
                return res.status(500).json({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
            }
        });
    }
    deleteSediments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const sediments = yield sediments_service_1.default.deleteSedimentService(id);
                const message = {
                    title: enum_1.Messages.TITLE_DELETE_REGISTER,
                    subTitle: enum_1.Messages.SUBTITLE_DELETE_REGISTER,
                };
                const response = res.status(201).json({ message });
                return { sediments, response };
            }
            catch (error) {
                return res.status(500).json({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
            }
        });
    }
}
exports.default = SedimentsController;
//# sourceMappingURL=sediments_controller.js.map