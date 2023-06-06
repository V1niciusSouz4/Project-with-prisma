import { verify } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const isAuthenticatedUSER = (req, res, next) => {

  const authToken = req.headers.authorization

  if (!authToken) res.status(401).json({ message: 'Not authorized' })

  const [bearer, token] = authToken.split(' ')

  if (!bearer === 'Bearer')
    res.status(401).json({ message: 'Badly formatted token' })

  try {
    const { sub } = verify(token, process.env.JWT_SECRET)

    req.user_id = sub

    return next()
  } catch (err) {
    return res.status(401).json({
      message: 'Not authorized'
    })
  }
}
export const isAuthenticatedADMIN = async(req, res, next) => {
  const authToken = req.headers.authorization

  if (!authToken) res.status(401).json({ message: 'Not authorized' })

  const [bearer, token] = authToken.split(' ')

  if (!bearer === 'Bearer')
    res.status(401).json({ message: 'Badly formatted token' })

  try {
    const  {id}  = verify(token, process.env.JWT_SECRET)
    const getUser = await prisma.user.findUnique({
      where: {id}
    })
    if (getUser.role != 'admin'){
     return res.status(418).json({message: 'erro papai'})
    }
    req.user_id = sub

    return next()
  } catch (err) {
    return res.status(401).json({
      message: 'Not authorized'
    })
  }
}