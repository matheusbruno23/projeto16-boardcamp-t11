import { db } from "../database/database.connection.js";
import dayjs from "dayjs"

export async function getRentals(req, res) {

    try {
        const {rentals} = await db.query(`
        SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName" 
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id;
        `)

        const resultRentals = rentals.map((r) => {
            const rentalResponse = {
                ...r,
                customer:{
                    id: r.customerId,
                    name: r.customerName
                },
                game:{
                    id: r.gameId, 
                    name: r.gameName 
                }
            }

            delete rentalResponse.customerName
            delete rentalResponse.gameName
            return rentalResponse 
        })

        res.send(resultRentals)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postRental(req, res) {
    const { customerId, gameId, daysRented } = req.body
    const { pricePerDay } = res.locals

    try {
        await db.query(`
        INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
            VALUES ($1, $2, $3, $4, $5, null, null);
       `, [customerId, gameId, daysRented, dayjs().format('YYYY-MM-DD'), pricePerDay * daysRented])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function finishRental(req, res) {
    const { id } = req.params
    const { pricePerDay, daysRented, rentDate } = res.locals
    let delayFee = null

    const difference = dayjs().diff(dayjs(rentDate), 'days')

    if (difference > daysRented) {
        delayFee = pricePerDay * (difference - daysRented)
    }

    try {
        await db.query(`
            UPDATE rentals
                SET "returnDate"=$1, "delayFee"=$2
                WHERE id=$3;
        `, [dayjs().format('YYYY-MM-DD'), delayFee, id])
        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params
    try {
        await db.query(`DELETE FROM rentals WHERE id=$1`, [id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
} 