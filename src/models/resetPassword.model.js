const db = require('../helpers/db.helpers')

exports.displayResetPassword = (cb) => {
  const sql = 'SELECT * FROM resetPassword ORDER BY "createdAt" ASC';
  db.query(sql,cb)
}
exports.selectResetPasswordById = (filter, cb)=> {
  const sql = 'SELECT COUNT("id") AS "totalData" FROM "resetPassword" WHERE id=$1';
  const values = [`%${filter.search}%`]
  db.query(sql, values, cb);
}
exports.selectResetPasswordByEmailAndCode = (data, cb)=> {
  const sql = 'SELECT * FROM "resetPassword" WHERE email =$1 AND code = $2';
  const values = [data.email, data.code]
  db.query(sql, values, cb);
}

exports.insertResetPassword = (data,cb)=> {
  const sql = 'INSERT INTO "resetPassword" ("email","userId","code") VALUES ($1,$2,$3) RETURNING *';
  const value = [data.email,data.userId, data.code]
  db.query(sql,value,cb)
}

exports.editResetPassword = (id,data,cb)=> {
  const sql = `UPDATE "resetPassword" SET "email" = COALESCE(NULLIF($2, '')::VARCHAR, "email"), "userId" = COALESCE(NULLIF($3, '')::INTEGER, "userId"), "code" = COALESCE(NULLIF($4, '')::INTEGER, "code"), WHERE id=$1 RETURNING *`;
  const value = [id, data.email, data.userId, data.code]
  db.query(sql,value,cb)
}

exports.removeResetPassword = (id,cb)=> {
  const sql = 'DELETE FROM "resetPassword" WHERE id = $1 RETURNING *';
  const value = [id]
  db.query(sql,value, cb)
}