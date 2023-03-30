import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()
interface JwtPayload {
        id: string
}
interface GoogleToken {
    sub: string
}

//non-custom auth is just googleauth
const auth = async (req: Request, res: Response, next: NextFunction) => {
    console.log('working as intended... :)')
    try {
        const token = req.headers.authorization?.split(' ')[1] as string
        const isCustomAuth = token.length < 500

        console.log(token)

        let decodedData
        if (token && isCustomAuth) {

            const secret = process.env.SECRET as string
            decodedData = jwt.verify(token, secret) as JwtPayload

            req.headers.userId = decodedData.id
        } else {
            console.log('herer')

            decodedData = jwt.decode(token) as GoogleToken

            req.headers.userId = decodedData?.sub
        }


        next()    
    } catch (error) {
        console.log(error)
    }
}

export default auth

