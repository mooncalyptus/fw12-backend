const db = require('../helpers/db.helpers')

exports.displayUser = (data,cb)=>{
  const sql = 'SELECT * FROM users';
  db.query(sql,cb)
}


exports.insertUser = async(data, cb) => {
  try{
      const sql = 'INSERT INTO users ("picture","firstName","lastName","phoneNumber","email", "password") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
        const value = [data.picture, data.firstName, data.lastName, data.phoneNumber, data.email, data.password]
        console.log(value)
        const newUsers = await db.query(sql, value, cb)
        return newUsers.rows[0]
  } catch (error){
    if(error) throw error
  }
}

exports.editUser = (id,data,cb)=> {
  const sql = `UPDATE users SET "picture" = COALESCE(NULLIF($2, '')::VARCHAR, "picture"), "firstName" = COALESCE(NULLIF($3, '')::VARCHAR, "firstName"), "lastName" = COALESCE(NULLIF($4, '')::VARCHAR, "lastName"), "phoneNumber" = COALESCE(NULLIF($5, '')::VARCHAR, "phoneNumber"), "email" = COALESCE(NULLIF($6, '')::VARCHAR, "email"), "password" = COALESCE(NULLIF($7, '')::VARCHAR, "password") WHERE "id" = $1 RETURNING *`;
  const value = [id, data.picture, data.firstName, data.lastName, data.phoneNumber, data.email, data.password]
  db.query(sql,value,cb)
}

exports.removeUser = (id,cb)=> {
  const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const value = [id]
  db.query(sql,value, cb)
}

// exports.selectUserByEmail = (email,cb)=> {
//   const sql = 'SELECT * FROM users WHERE email = $1'
//   const value = [email]
//   db.query(sql, value, cb)
// }

exports.selectUserByEmail = async(email) => {
  try{
      const sql = 'SELECT * FROM users WHERE email = $1'
      const emailUser = await db.query(sql, [email])
      return emailUser.rows[0]
  } catch (error){
    if(error) throw error
  }
}