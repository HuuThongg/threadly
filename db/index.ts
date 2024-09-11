import pg from "pg"
const { Pool } = pg
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 4000,
})

export { pool }
