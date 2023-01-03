import { createPool } from "mysql2/promise";

const pool = createPool({
    database: process.env.DATABASE,
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    ssl:{
      rejectUnauthorized: false
    }
})

export default pool