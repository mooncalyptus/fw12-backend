const db = require('../helpers/db.helpers')

exports.displayUser = (data,cb)=>{
  const sql = 'SELECT * FROM users';
  // const value = [data.id, data.picture, data.firstName, data.lastName, data.phoneNumber, data.email, data.password, data.createdAt, data.updatedAt]
  db.query(sql,cb)
}

exports.insertUser = (data,cb) => {
  const sql = 'INSERT INTO users ("picture","firstName","lastName","phoneNumber","email", "password") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
  const value = [data.picture, data.firstName, data.lastName, data.phoneNumber, data.email, data.password]
  db.query(sql,value,cb)
}

exports.editUser = (data,cb)=> {
  const sql = 'UPDATE users SET "picture" = $1, "firstName" = $2, "lastName" = $3, "phoneNumber" = $4, "email" = $5, "password" = $6 WHERE "id" = $7 RETURNING *';
  const value = [data.picture, data.firstName, data.lastName, data.phoneNumber, data.email, data.password, data.id]
  db.query(sql,value,cb)
}

exports.removeUser = (id,cb)=> {
  const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const value = [id]
  db.query(sql,value, cb)
}