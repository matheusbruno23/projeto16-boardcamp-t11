import { Router } from "express"
import rentalsRouter from "./rentals.routes.js"
import customersRouter from "./customers.routes.js"
import gamesRouter from "./games.routes.js"

const router = Router()
router.use(rentalsRouter)
router.use(gamesRouter)
router.use(customersRouter)

export default router
