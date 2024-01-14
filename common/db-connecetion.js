"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dbConnection = new typeorm_1.DataSource({
    type: 'mysql',
    host: '45.93.138.91',
    port: 3306,
    username: 'root',
    password: 'Coinnovac1!',
    database: 'coinnovac'
});
exports.default = dbConnection;
