import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Order, OrderStore } from '../models/order'

const orderRoutes = (app: express.Application) => {
  app.get('/orders/{:id}/active', verifyAuthToken, activeOrders)
  app.get('/orders/{:id}/complete', verifyAuthToken, completeOrders)
}
const store = new OrderStore()
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

const activeOrders = async (req: Request, res: Response) => {
  const orders = store.showCurrentOrdersByUser(req.body.id)
  res.json(orders)
}

const completeOrders = async (req: Request, res: Response) => {
  const orders = store.showCompletedOrdersByUser(req.body.id)
  res.json(orders)
}
