const db = require('../helpers/db.helpers')

exports.displayCasts = (cb)=>{
  const sql = 'SELECT * FROM casts';
  db.query(sql,cb)
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