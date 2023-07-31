export default function validateSchema(schema){
    return (req, res , next) => {
        const validation = schema.validate(req.body, {abortEarly: false})

        if(validation.error){
            const err = validation.error.datails.map(d => d.message)
            return res.status(400).send(err)
        }
        next()
    }
}