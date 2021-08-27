import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/user'
import { verifyAuthToken } from './tokens'

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', verifyAuthToken, create)
}

const store = new UserStore()
const envToken = process.env.TOKEN_SECRET as string

const index = async (req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const user = await store.show(parseInt(req.body.id))
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  const newUser: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  }
  try {
    const user = await store.create(newUser)
    const token = jwt.sign({ user: user }, envToken)
    res.json(token)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

export default userRoutes
