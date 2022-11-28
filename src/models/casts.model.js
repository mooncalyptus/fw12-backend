const { DatabaseError } = require('pg');
const db = require('../helpers/db.helpers')

exports.displayCasts = (filter, cb)=>{
  const sql = `SELECT * FROM "casts" WHERE name LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`]
  db.query(sql, values, cb)
}

exports.selectCountAllCasts = (filter, cb)=> {
  const sql = `SELECT COUNT("name") AS "totalData" FROM "casts" WHERE name LIKE $1`;
  const values = [`%${filter.search}%` ]
  db.query(sql, values, cb)
}
exports.insertCasts = (data,cb) => {
  const sql = 'INSERT INTO casts ("name") VALUES ($1) RETURNING *';
  const value = [data.name]
  db.query(sql,value,cb)
}

exports.editCasts = (id,data,cb)=> {
  const sql = `UPDATE "casts" SET "name" = COALESCE(NULLIF($2, ''), "name") WHERE id=$1 RETURNING *`;
  const value = [id, data.name]
  db.query(sql,value,cb)
}

exports.removeCasts = (id,cb)=> {
  const sql = 'DELETE FROM casts WHERE id = $1 RETURNING *';
  const value = [id]
  db.query(sql,value, cb)
}