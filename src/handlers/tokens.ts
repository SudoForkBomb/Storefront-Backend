import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const envToken = process.env.TOKEN_SECRET as string

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization as string
    const token = authHeader?.split(' ')[1] as string
    const decodedToken = jwt.verify(token, envToken)
    next()
  } catch (error) {
    res.status(401)
    res.json(error)
  }
}
