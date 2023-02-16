const db = require('../helpers/db.helpers')

exports.displayCinemas = (cb) => {
  // const sql = 'SELECT * FROM cinemas ORDER BY "createdAt" ASC';
  const sql = `SELECT m.id, m.title, ci.name, ci.address, ci.city, ms.price, t."bookingDate", string_to_array(string_agg(DISTINCT mst.time::VARCHAR, ', '), ', ') as time FROM "movieScheduleTime" mst JOIN "movieSchedule" ms ON mst."movieScheduleId" = ms.id JOIN cinemas ci on ci.id = ms."cinemasId" JOIN transactions t ON ci.id = t."cinemasId" JOIN movies m ON t."movieId" = m.id GROUP BY ci.id, ms.price, ci.address, ci.name, t."bookingDate", ci.city, m.title, m.id`
  db.query(sql,cb)
}

exports.insertCinemas = (data,cb)=> {
  const sql = 'INSERT INTO cinemas ("name","address","city") VALUES ($1,$2,$3) RETURNING *';
  const value = [data.name,data.address,data.city]
  db.query(sql,value,cb)
}

exports.editCinemas = (id,data,cb)=> {
  // const sql = 'UPDATE "cinemas" SET "name"=$1, "address" = $2, "city" = $3 WHERE "id" = $4 RETURNING *';
  const sql = `UPDATE "cinemas" SET "name" = COALESCE(NULLIF($2, ''), "name"), "address" = COALESCE(NULLIF($3, ''),"address"), "city" = COALESCE(NULLIF($4, ''), "city") WHERE id=$1 RETURNING *`;
  const value = [id, data.name, data.address, data.city]
  db.query(sql,value,cb)
}

exports.removeCinemas = (id,cb)=> {
  const sql = 'DELETE FROM cinemas WHERE id = $1 RETURNING *';
  const value = [id]
  db.query(sql,value, cb)
}

exports.selectCinemas = (id, date, city, cb) => {
  const sql = `SELECT m.title, ci.name, ci.address, ci.city, ms.price, string_to_array(string_agg(DISTINCT mst.time::VARCHAR, ', '), ', ') as time FROM "movieSchedule" ms
  JOIN "movieScheduleTime" mst ON mst."movieScheduleId" = ms.id
  JOIN cinemas ci on ci.id = ms."cinemasId"
  JOIN movies m ON ms."movieId" = m.id
  WHERE m.id = $1 AND ci.city = $2 AND COALESCE(NULLIF($3, '')::DATE,current_date) BETWEEN ms."startDate" AND ms."endDate"
  GROUP BY ci.id, ms.price, ms.id, m.title`
  const value = [id, city, date]
  db.query(sql, value, cb)
}