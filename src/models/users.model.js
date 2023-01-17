const db = require('../helpers/db.helpers')

exports.getAllUsers = async () => {
  try{
      const sql = 'SELECT * FROM users';
      const newUsers = await db.query(sql)
      return newUsers.rows
  } catch (error){
    if (error) throw error
  }
}

exports.createUsers = async(data) => {
  try{
      const sql = 'INSERT INTO users ("picture","firstName","lastName","phoneNumber","email", "password") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
        const values = [data.picture, data.firstName, data.lastName, data.phoneNumber, data.email, data.password]
        console.log(values)
        const newUsers = await db.query(sql, values)
        console.log(newUsers)
        return newUsers.rows[0]
  } catch (error){
    if(error) throw error
  }
}


exports.updateUsers = async (data, id) =>{
  try{
  const sql = `UPDATE users SET "picture" = COALESCE(NULLIF($1, '')::VARCHAR, "picture"), "firstName" = COALESCE(NULLIF($2, '')::VARCHAR, "firstName"), "lastName" = COALESCE(NULLIF($3, '')::VARCHAR, "lastName"), "phoneNumber" = COALESCE(NULLIF($4, '')::VARCHAR, "phoneNumber"), "email" = COALESCE(NULLIF($5, '')::VARCHAR, "email"), "password" = COALESCE(NULLIF($6, '')::VARCHAR, "password") WHERE "id" = $7 RETURNING *`;
  const values = [data.picture, data.firstName, data.lastName, data.phoneNumber, data.email, data.password, id]
  const newUser = await db.query(sql, values)
  return newUser.rows[0]
  } catch (error){
    if (error) throw error
  }
}


exports.deleteUsers = async (id) => {
  try{
      const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
      const newUser = await db.query(sql, [id])
      return newUser.rows[0]
  } catch (error) {
    if (error) throw error
  }
}


exports.selectUserByEmail = async(email) => {
  try{
      const sql = 'SELECT * FROM users WHERE email = $1'
      const emailUser = await db.query(sql, [email])
      return emailUser.rows[0]
  } catch (error){
    if(error) throw error
  }
}

exports.selectUserById = async (id) => {
  try{
    const sql = 'SELECT * FROM "users" WHERE id = $1';
    const newUsers = await db.query(sql, [id]);
    return newUsers.rows[0];
  } catch (error) {
    if (error) throw error;
  }
}