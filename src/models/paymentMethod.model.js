const db = require('../helpers/db.helpers')

exports.displayPayment = (cb) => {
  const sql = 'SELECT * FROM paymentMethod ORDER BY "createdAt" ASC';
  db.query(sql,cb)
}

exports.insertPayment = (data,cb)=> {
  const sql = 'INSERT INTO "paymentMethod" ("picture","name") VALUES ($1,$2) RETURNING *';
  const value = [data.picture,data.name]
  db.query(sql,value,cb)
}

exports.editPayment = (id,data,cb)=> {
  const sql = `UPDATE "paymentMethod" SET "picture" = COALESCE(NULLIF($2, ''), "picture"), "name" = COALESCE(NULLIF($3, ''),"name") WHERE id=$1 RETURNING *`;
  const value = [id, data.picture, data.name]
  db.query(sql,value,cb)
}

exports.removePayment = (id,cb)=> {
  const sql = 'DELETE FROM paymentMethod WHERE id = $1 RETURNING *';
  const value = [id]
  db.query(sql,value, cb)
}