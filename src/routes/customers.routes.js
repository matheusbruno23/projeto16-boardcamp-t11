import { Router } from "express"
import {getCustomers, getCustomersById, postCustomer, updateCustomer} from "../controllers/customers.controller.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import {customerSchema} from "../schemas/customers.schemas.js"
import { validateCustomerCpf, validateGetCustomer } from "../middlewares/customers.middleware.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", validateGetCustomer,getCustomersById)
customersRouter.post("/customers", validateSchema(customerSchema),validateCustomerCpf, postCustomer)
customersRouter.put("/customers/:id", validateSchema(customerSchema), validateCustomerCpf,updateCustomer)

export default customersRouter