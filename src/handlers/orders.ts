import express, { Request, Response, NextFunction } from 'express'
import { OrderStore } from '../models/order'
import { verifyAuthToken } from './tokens'

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:id/active', verifyAuthToken, activeOrder)
  app.get('/orders/:id/complete', verifyAuthToken, completeOrders)
}
const store = new OrderStore()

/**
 * Retrieves the current Order for the User.
 * @param req
 * @param res
 */
const activeOrder = async (req: Request, res: Response) => {
  const order = await store.showCurrentOrderByUser(req.params.id)
  res.json(order)
}

/**
 * Retrieves a list of complete Orders for the User.
 * @param req
 * @param res
 */
const completeOrders = async (req: Request, res: Response) => {
  const orders = await store.showCompletedOrdersByUser(req.params.id)
  res.json(orders)
}

export default orderRoutes
