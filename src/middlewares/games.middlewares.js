import { db } from "../database/database.connection.js";

export async function validateSchemaPostGame(req, res, next){
    const {name} = req.body
    try {
        const game = await db.query(`SELECT * FROM games WHERE name=$1;`, [name])
        if(game.rowCount !== 0 ) return res.sendStatus(409)
        next()
    } catch (error) {
        res.status(500).send(error.message)
    }
}