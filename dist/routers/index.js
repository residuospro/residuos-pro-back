"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = __importDefault(require("./users_route"));
const companies_route_1 = __importDefault(require("./companies_route"));
const login_route_1 = __importDefault(require("./login_route"));
const payload_route_1 = __importDefault(require("./payload_route"));
const middleware_1 = require("../middleware");
const support_route_1 = __importDefault(require("./support_route"));
const manager_route_1 = __importDefault(require("./manager_route"));
const collaborator_route_1 = __importDefault(require("./collaborator_route"));
const department_route_1 = __importDefault(require("./department_route"));
const cors_1 = __importDefault(require("cors"));
const router = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("Pro Resíduos Ativo");
    });
    app.use(express_1.default.json(), (0, cors_1.default)(), login_route_1.default, support_route_1.default, middleware_1.verifyToken, users_route_1.default, companies_route_1.default, manager_route_1.default, collaborator_route_1.default, department_route_1.default, payload_route_1.default);
};
exports.default = router;
//# sourceMappingURL=index.js.map