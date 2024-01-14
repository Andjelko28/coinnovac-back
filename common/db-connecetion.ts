import { DataSource } from "typeorm";

const dbConnection = new DataSource({
    type: 'mysql',
    host: '45.93.138.91',
    port: 3306,
    username: 'root',
    password: 'Coinnovac1!',
    database: 'coinnovac'
})

export default dbConnection;