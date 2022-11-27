const db = require('../helpers/db.helpers')

exports.displayMovies = (cb) => {
  const sql = 'SELECT * FROM movies ORDER BY "createdAt" ASC';
  db.query(sql,cb)
}

exports.insertMovies = (data, cb)=> {
  const sql = 'INSERT INTO movies ("title","picture","releaseDate","director","duration","synopsis") VALUES ($1, $2, $3,$4,$5,$6) RETURNING *';
  const value = [data.title, data.picture, data.releaseDate, data.director, data.duration, data.synopsis]
  db.query(sql, value, cb)
}

exports.editMovies = (id, data, cb)=> {
  const sql = `UPDATE "movies" SET "title" = COALESCE(NULLIF($2, ''), "title"), "picture" = COALESCE(NULLIF($3, ''),"picture"), "releaseDate" = COALESCE(NULLIF($4, '')::TIMESTAMPTZ, "releaseDate"), "director" = COALESCE(NULLIF($5, ''), "director"), "duration" = COALESCE(NULLIF($6, '')::TIME, "duration"), "synopsis" = COALESCE(NULLIF($7, '')::TEXT, "synopsis") WHERE id=$1 RETURNING *`;
  const value = [id, data.title, data.picture, data.releaseDate, data.director, data.duration, data.synopsis]
  db.query(sql, value, cb)
}

exports.removeMovies = (id,cb)=> {
  const sql = 'DELETE FROM movies WHERE id = $1 RETURNING *';
  const value = [id]
  db.query(sql, value,cb)
}