import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { OrderStore } from '../models/order'
import { verifyAuthToken } from './tokens'

const orderRoutes = (app: express.Application) => {
  app.get('/orders/{:id}/active', verifyAuthToken, activeOrders)
  app.get('/orders/{:id}/complete', verifyAuthToken, completeOrders)
}
const store = new OrderStore()

const activeOrders = async (req: Request, res: Response) => {
  const orders = await store.showCurrentOrdersByUser(req.body.id)
  res.json(orders)
}

const completeOrders = async (req: Request, res: Response) => {
  const orders = await store.showCompletedOrdersByUser(req.body.id)
  res.json(orders)
}

export default orderRoutes
