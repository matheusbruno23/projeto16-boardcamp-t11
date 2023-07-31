import { db } from "../database/database.connection.js";

export async function getCustomers(req , res){
    try {
        const customers = await db.query(`SELECT * FROM customers;`)
        res.send(customers.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getCustomersById(req , res){
    
    const {id} = req.params

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1;` , [id])
        if (customer.rowCount === 0) return res.send(404)
        res.send(customer.rows[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postCustomer(req , res){
        
    const {name , phone , birthday , cpf} = req.body

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf])
        if(customer.rowCount !== 0) return res.sendStatus(409)

        await db.query(`INSERT INTO customers (name , phone , birthday , cpf) VALUES($1 , $2 , $3 , $4);` , [name , phone , birthday , cpf])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function updateCustomer(req , res){
    const {name , phone , birthday , cpf} = req.body
    const {id} = req.params
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE cpf=$1;` , [cpf])
        if(customer.rowCount !== 0) return res.sendStatus(409)
        if(customer.rowCount > 0 && customer.rows[0].id !== Number(id)) return res.sendStatus(409)

        await db.query(`UPDATE customers SET name=$1 , phone=$2 , birthday=$3 , cpf=$4; WHERE id=$5;` , [name , phone , birthday , cpf , id])
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
