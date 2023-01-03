import { ErrorRequestHandler } from "express"

const handleErrors: ErrorRequestHandler = (error, req, res, next)=>{
    return res.status(500).json("ha ocurrido un error en el servidor")
}

export default handleErrors;