const {Pool} = require('pg')

const db = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:1@localhost:5432/movietify?schema=public"
})

module.exports = db