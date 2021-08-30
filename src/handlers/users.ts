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
  const user = await store.show(req.params.id)
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  const newUser: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password_digest: req.body.password_digest,
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
