"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const departmentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    idCompany: {
        type: String,
        required: true,
    },
    responsible: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        trim: true,
        require: false,
        lowercase: true,
        validate: {
            validator(value) {
                return value.includes("@");
            },
            message: "Email inválido",
        },
    },
    ramal: {
        type: String,
        required: true,
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
const Department = mongoose_1.default.model("department", departmentSchema);
exports.default = Department;
//# sourceMappingURL=department.js.map