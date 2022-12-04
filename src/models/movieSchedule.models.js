const db = require('../helpers/db.helpers')

exports.displayMovieSchedule = (cb)=>{
  const sql = 'SELECT * FROM movieSchedule';
  db.query(sql,cb)
}

exports.insertMovieSchedule = (data,cb) => {
  const sql = 'INSERT INTO "movieSchedule" ("movieId", "cinemasId", "price", "startDate", "endDate") VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const value = [data.movieId, data.cinemasId, data.price, data.startDate, data.endDate]
  db.query(sql,value,cb)
}

exports.editMovieSchedule = (id,data,cb)=> {
  const sql = `UPDATE "movieSchedule" SET "moviesId" = COALESCE(NULLIF($2, '')::INTEGER, "moviesId"), "cinemasId" = COALESCE(NULLIF($3, '')::INTEGER, "cinemasId"), "price" = COALESCE(NULLIF($4, '')::INTEGER, "price"),  "startDate" = COALESCE(NULLIF($5, '')::TIMESTAMP, "startDate"), "endDate" = COALESCE(NULLIF($6, '')::TIMESTAMP, "endDate"), WHERE id=$1 RETURNING *`;
  const value = [id, data.name]
  db.query(sql,value,cb)
}

exports.removeMovieSchedule = (id,cb)=> {
  const sql = 'DELETE FROM movieSchedule WHERE id = $1 RETURNING *';
  const value = [id]
  db.query(sql,value, cb)
}