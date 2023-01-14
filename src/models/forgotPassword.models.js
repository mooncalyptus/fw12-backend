const db = require('../helpers/db.helpers')

exports.displayAllForgotPassword = async () => {
  try{
    const sql = `SELECT * FROM "forgotPassword"`;
    const forgotPassword = await db.query(sql);
    return forgotPassword.rows;
  } catch (error){
    if(error) throw new Error(error)
  }
}

exports.selectForgotPassword = async (id) => {
  try{
    const sql = `SELECT * FROM "forgotPassword" WHERE id = $1`;
    const values = [id];
    const forgotPassword = await db.query(sql, values);
    return forgotPassword.rows[0];
  } catch (error) {
    if(error) throw new Error(error)
  }
}

exports.selectForgotPasswordByEmailAndCode = async (data) => {
  try{
    const sql = `SELECT * FROM "forgotPassword" WHERE email = $1 AND code = $2`;
    const values = [data.email, data.code]
    const forgotPassword = await db.query(sql, values)
    return forgotPassword.rows[0]
  } catch (error){
    if(error) throw new Error(error)
  }
}

exports.createForgotPassword = async (data) => {
  try {
    const sql = `INSERT INTO "forgotPassword" ("userId", "email", "code") VALUES ($1, $2, $3) RETURNING *`;
    const values = [data.userId, data.email, data.code];
    const forgotPassword = await db.query(sql, values);
    return forgotPassword.rows[0];
  } catch (error) {
    if(error) throw new Error(error)
  }
};

exports.updateForgotPassword = async (id, data) => {
  try{
    const sql = `UPDATE "forgotPassword" SET "userId"=COALESCE(NULLIF($1, '')::INTEGER, "userId"),
    "email"=COALESCE(NULLIF($2, ''), "email"),
    "code"=COALESCE(NULLIF($3, '')::INTEGER, "code"),
     WHERE id = $4 RETURNING *`;
     const values = [data.userId, data.email, data.code, id];
     const forgotPassword = await db.query(sql, values);
     return forgotPassword.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
}

exports.deleteForgotPassword = async (id) => {
  try{
    const sql = `DELETE FROM "forgotPassword" WHERE id = $1 RETURNING *`;
    const values = [id];
    const forgotPassword = await db.query(sql, values);
    return forgotPassword.rows[0];
  } catch (error){
    if(error) throw new Error(error);
  }
}