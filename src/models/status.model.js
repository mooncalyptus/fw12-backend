const db = require('../helpers/db.helpers')

exports.displayStatus = (cb) => {
  const sql = 'SELECT * FROM status ORDER BY "createdAt" ASC';
  db.query(sql,cb)
}

exports.insertStatus = (data,cb)=> {
  const sql = 'INSERT INTO "status" ("name") VALUES ($1) RETURNING *';
  const value = [data.name]
  db.query(sql,value,cb)
}

exports.editStatus = (id,data,cb)=> {
  const sql = `UPDATE "status" SET "name" = COALESCE(NULLIF($2, '') WHERE id=$1 RETURNING *`;
  const value = [id, data.name]
  db.query(sql,value,cb)
}

exports.removeStatus = (id,cb)=> {
  const sql = 'DELETE FROM status WHERE id = $1 RETURNING *';
  const value = [id]
  db.query(sql,value, cb)
}