import { Router } from "express"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import {postGames, getGames} from "../controllers/games.controller.js"
import {gameSchema} from "../schemas/games.schemas.js"

const gamesRouter = Router()

gamesRouter.get("/games" , getGames)
gamesRouter.post("/games" , validateSchema(gameSchema) , postGames)

export default gamesRouter