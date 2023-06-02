"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const companiesSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    address: {
        type: String,
        require: true,
        trim: true,
    },
    cnpj: {
        type: Number,
        min: 14,
        trim: true,
        require: true,
    },
    fantasyName: {
        type: String,
        trim: true,
        require: true,
    },
    street: {
        type: String,
        trim: true,
        require: true,
    },
    state: {
        type: String,
        trim: true,
        require: true,
    },
    cep: {
        type: Number,
        require: true,
    },
    city: {
        type: String,
        trim: true,
        require: true,
    },
    country: {
        type: String,
        trim: true,
        require: true,
    },
    phone: {
        type: Number,
        min: [9, "Digitos insuficientes"],
        trim: true,
        require: true,
    },
    email: {
        type: String,
        trim: true,
        unique: false,
        require: true,
        lowercase: true,
        validate: {
            validator(value) {
                return value.includes("@");
            },
            message: "Email inválido",
        },
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
const Companies = mongoose_1.default.model("companies", companiesSchema);
exports.default = Companies;
//# sourceMappingURL=companies.js.map