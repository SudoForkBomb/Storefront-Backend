import express, { Request, Response, NextFunction } from 'express'
import { OrderStore } from '../models/order'
import { verifyAuthToken } from './tokens'

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:id/active', verifyAuthToken, activeOrder)
  app.get('/orders/:id/complete', verifyAuthToken, completeOrders)
}
const store = new OrderStore()

const activeOrder = async (req: Request, res: Response) => {
  const order = await store.showCurrentOrderByUser(req.body.id)
  res.json(order)
}

const completeOrders = async (req: Request, res: Response) => {
  const orders = await store.showCompletedOrdersByUser(req.body.id)
  res.json(orders)
}

export default orderRoutes
