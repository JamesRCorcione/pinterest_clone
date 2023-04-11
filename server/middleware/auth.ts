import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
interface JwtPayload {
    id: string
}
interface GoogleToken {
    sub: string
}

const secret = process.env.SECRET as string

//non-custom auth is just googleauth
const auth = async (req: Request, res: Response, next: NextFunction) => {
    console.log('middleware')
    try {
        const token = req.headers.authorization?.split(' ')[1] as string
        const authType = req.headers.authorizationtype

        console.log(req.headers)
        console.log(req.body)

        let decodedData
        if (authType === 'Custom') {            
            decodedData = jwt.verify(token, secret) as JwtPayload
            req.headers.userId = decodedData.id
        }  else if (authType === 'Google') {
            decodedData = jwt.verify(token, secret) as GoogleToken
            req.headers.userId = decodedData?.sub
        } else if (authType === 'Facebook') {
            decodedData = jwt.verify(token, secret) as JwtPayload
            req.headers.userId = decodedData.id
        }
        next()    
    } catch (error) {
        console.log('error', error)
    }
}

export default auth

