import pg from "pg"
const { Pool } = pg
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export { pool }

const pool1 = new Pool({
  host: "",
  user: "database-user",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  database: "your_database",
  password: "",
})