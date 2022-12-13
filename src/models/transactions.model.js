const db = require('../helpers/db.helpers')

exports.insertOrder = async(data, cb)=> {
    try{
        await db.query("BEGIN")
    const insertTransactions = `INSERT INTO "transactions" ("bookingDate", "movieId", "cinemasId", "movieScheduleId", "fullName", "email", "phoneNumber", "statusId", "userId", "paymentId") VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9, $10) RETURNING "bookingDate", "fullName", "email", "phoneNumber", "userId"`;
    const sqlTransactions = await db.query(insertTransactions, [data.bookingDate, data.movieId, data.cinemasId, data.movieScheduleId, data.fullName, data.email, data.phoneNumber, data.statusId, data.userId, data.paymentId])
    const insertReservedSeat = `INSERT INTO "reservedSeat" ("seatNum", "transactionId") VALUES ($1, $2) RETURNING "seatNum"`;
    const reservedSeatValue = [data.seatNum, sqlTransactions.rows[0].id]
    const sqlReservedSeat = await db.query(insertReservedSeat, reservedSeatValue);
    await db.query("COMMIT")
    const dataOrder = {
        transactions : sqlTransactions.rows[0],
        seatNum: sqlReservedSeat
    }
    cb(null, dataOrder);
} catch (e){
    await db.query("ROLLBACK")
    cb(e,null)
}}