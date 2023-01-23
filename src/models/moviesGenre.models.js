const db = require('../helpers/db.helpers')

exports.displayMovieGenre = (cb)=>{
  const sql = 'SELECT * FROM movieGenre';
  db.query(sql,cb)
}

exports.insertMovieGenre = (data,cb) => {
  const sql =
  `INSERT INTO "movieGenre" ("movieId", "genreId") VALUES($1, $2) RETURNING *`;
const value = [
  data.movieId,
  data.genreId,
];
db.query(sql, value, cb);
}

exports.updateMovieGenre = (id, data, cb) => {
  const sql = `UPDATE "movieGenre" SET "movieId" = COALESCE(NULLIF($2, '')::INTEGER, "movieId"),  "genreId" = COALESCE(NULLIF($6, '')::INTEGER, "genreId") WHERE id=$1 RETURNING *`;
  const value = [id, data.movieId, data.genreId];
  console.log(data)
  db.query(sql,value,cb)
}

exports.deleteMovieGenre = (id, cb) => {
  const sql = 'DELETE FROM movieGenre WHERE id = $1 RETURNING *';
  const value = [id]
  db.query(sql,value, cb)
}