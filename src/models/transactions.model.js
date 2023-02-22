const db = require('../helpers/db.helpers')

exports.insertOrder = async(data, cb)=> {
    try{
        await db.query("BEGIN")
    const insertTransactions = `INSERT INTO "transactions" ("fullName", "email", "phoneNumber", "paymentMethodId", "userId") VALUES ($1, $2, $3, $4,$5) RETURNING id`;
    const sqlTransactions = await db.query(insertTransactions, [data.fullName, data.email, data.phoneNumber, data.paymentMethodId, data.userId])
    const insertReservedSeat = `INSERT INTO "reservedSeat" ("seatNumber", "transactionId", "bookingDate", "bookingTime", "movieId", "cinemaId", "price", "total_price") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "seatNumber"`;
    const reservedSeatValue = [data.seatNumber, sqlTransactions.rows[0].id, data.bookingDate, data.bookingTime, data.movieId, data.cinemaId, data.price, data.total_price]
    const sqlReservedSeat = await db.query(insertReservedSeat, reservedSeatValue);
    await db.query("COMMIT")
    const dataOrder = {
        transactions : sqlTransactions.rows[0],
        seatNumber: sqlReservedSeat
    }
    cb(null, dataOrder);
} catch (e){
    await db.query("ROLLBACK")
    cb(e,null)
}}