const db = require('../helpers/db.helpers')

exports.displaySubscribers = (cb) => {
  const sql = 'SELECT * FROM subscribers ORDER BY "createdAt" ASC';
  db.query(sql,cb)
}

exports.insertSubscribers = (data,cb)=> {
  const sql = 'INSERT INTO "subscribers" ("email") VALUES ($1) RETURNING *';
  const value = [data.email]
  db.query(sql,value,cb)
}

exports.editSubscribers = (id,data,cb)=> {
  const sql = `UPDATE "subscribers" SET "email" = COALESCE(NULLIF($2, '') WHERE id=$1 RETURNING *`;
  const value = [id, data.email]
  db.query(sql,value,cb)
}

exports.removeSubscribers = (id,cb)=> {
  const sql = 'DELETE FROM subscribers WHERE id = $1 RETURNING *';
  const value = [id]
  db.query(sql,value, cb)
}