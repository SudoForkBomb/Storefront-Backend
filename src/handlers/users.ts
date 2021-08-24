import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/user'

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/{:id}', verifyAuthToken, show)
  app.get('/users', verifyAuthToken, create)
}

const store = new UserStore()
const envToken = process.env.TOKEN_SECRET as string

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
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

const index = async (req: Request, res: Response) => {
  const users = store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const user = store.show(req.body.id)
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  }
  try {
    const user = store.create(newUser)
    const token = jwt.sign({ user: user }, envToken)
    res.json(token)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}
