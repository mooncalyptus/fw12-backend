const db = require('../helpers/db.helpers')

exports.displayMovies = (filter, cb) => {
  const sql = 'SELECT * FROM movies ORDER BY "createdAt" ASC LIMIT $1 OFFSET $2';
  const values = [filter.limit, filter.offset]
  db.query(sql,values,cb)
}

exports.insertMovies = (data, cb)=> {
  const sql = 'INSERT INTO movies ("title","picture","releaseDate","director","duration","synopsis") VALUES ($1, $2, $3,$4,$5,$6) RETURNING *';
  const value = [data.title, data.picture, data.releaseDate, data.director, data.duration, data.synopsis]
  db.query(sql, value, cb)
}

exports.editMovies = (id, data, cb)=> {
  const sql = `UPDATE "movies" SET "title" = COALESCE(NULLIF($2, '')::VARCHAR, "title"), "picture" = COALESCE(NULLIF($3, '')::VARCHAR, "picture"), "releaseDate" = COALESCE(NULLIF($4, '')::TIMESTAMPTZ, "releaseDate"), "director" = COALESCE(NULLIF($5, '')::VARCHAR, "director"), "duration" = COALESCE(NULLIF($6, '')::TIME, "duration"), "synopsis" = COALESCE(NULLIF($7, '')::TEXT, "synopsis") WHERE id=$1 RETURNING *`;
  const value = [id, data.title, data.picture, data.releaseDate, data.director, data.duration, data.synopsis]
  db.query(sql, value, cb)
}

exports.removeMovies = (id,cb)=> {
  const sql = 'DELETE FROM movies WHERE id = $1 RETURNING *';
  const value = [id]
  db.query(sql, value,cb)
}

exports.upcomingMovie = (data, cb)=> {
  const sql = `SELECT * FROM movies WHERE date_part('year', "releaseDate")::TEXT = COALESCE(NULLIF($1,''), date_part('year', current_date)::TEXT) AND date_part('month', "releaseDate")::TEXT = COALESCE(NULLIF($2,''), date_part('month', current_date)::TEXT)`;
  const values = [data.year, data.month]
  db.query(sql, values, cb)
}

exports.nowShowingMovie = (cb)=> {
  const sql = `SELECT m.id, m.picture,m.title, ms."startDate", ms."endDate",string_agg(g.name, ', ') AS genre
  FROM movies m
  JOIN "movieSchedule" ms ON ms."movieId" = m.id
  LEFT JOIN "movieGenre" mg ON mg."movieId" = m.id
  JOIN "genre" g ON g.id = mg."genreId" WHERE current_date
  BETWEEN ms."startDate" AND ms."endDate" GROUP BY m.id, ms.id LIMIT 5`;
  db.query(sql,cb);
}