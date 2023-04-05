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

//non-custom auth is just googleauth
const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] as string
        const authType = req.headers.authorizationtype
        const isCustomAuth = token.length > 25

        let decodedData
        if (authType === 'Custom') {
            const secret = process.env.SECRET as string
            decodedData = jwt.verify(token, secret) as JwtPayload
            req.headers.userId = decodedData.id
        }  else if (authType === 'Google') {
            decodedData = jwt.decode(token) as GoogleToken
            req.headers.userId = decodedData?.sub
        } else if (authType === 'Facebook') {
            const check = await axios.get(
              `https://graph.facebook.com/me?access_token=${token}`
            );
            req.headers.userId = check.data.id
        }
        next()    
    } catch (error) {
        console.log('error', error)
    }
}

export default auth

