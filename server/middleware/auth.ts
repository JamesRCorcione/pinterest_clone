import axios, { AxiosHeaders } from 'axios'
import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'


const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //const token = req.headers.authorization.split(' ')[1]
        //const isCustomAuth = token.lenth < 500
//
        //let decodedData
//
        //if (token && isCustomAuth) {
        //    decodedData = jwt.verify(token, '72b75dee48278c05eeb945d6899d83d5')
//
        //    req.userId = decodedData?.id
        //} else {
        //    decodedData = jwt.decode(token)
//
        //    req.userId = decodedData?.sub
        //}


        next()    
    } catch (error) {
        console.log(error)
    }
}

export default auth

