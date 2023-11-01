"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sedimentsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    classification: {
        type: String,
        required: true,
    },
    risk: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    packaging: {
        type: String,
        required: true,
    },
    idDepartment: {
        type: String,
        required: false,
    },
    idCompany: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
});
const Sediments = mongoose_1.default.model("Sediments", sedimentsSchema);
exports.default = Sediments;
//# sourceMappingURL=sediment.js.map