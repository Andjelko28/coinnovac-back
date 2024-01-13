"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const authMiddleware = (0, express_jwt_1.expressjwt)({
    secret: 'SECRET',
    algorithms: ['ES256'],
    requestProperty: 'userData'
});
exports.default = authMiddleware;
