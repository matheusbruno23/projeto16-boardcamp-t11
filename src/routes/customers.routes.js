import { Router } from "express"
import {getCustomers, getCustomersById, postCustomer, updateCustomer} from "../controllers/customers.controller.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import {customerSchema} from "../schemas/customers.schemas.js"
const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomersById)
customersRouter.post("/customers", validateSchema(customerSchema), postCustomer)
customersRouter.put("/customers/:id", validateSchema(customerSchema), updateCustomer)

export default customersRouter