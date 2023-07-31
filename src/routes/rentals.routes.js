import { Router } from "express"
import { getRentals, deleteRental, postRental, finishRental } from "../controllers/rentals.controller.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { validateDeleteRental, validatePostRental, validateReturnRental } from "../middlewares/rentals.middlewares.js"
import { rentalSchema } from "../schemas/rentals.schemas.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validateSchema(rentalSchema), validatePostRental, postRental)
rentalsRouter.post("/rentals/:id/return", validateReturnRental, finishRental)  
rentalsRouter.delete("/rentals/:id", validateDeleteRental, deleteRental)


export default rentalsRouter