import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Product, ProductStore } from '../models/product'
import { verifyAuthToken } from './tokens'

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/{:id}', show)
  app.get('/products', verifyAuthToken, create)
}

const store = new ProductStore()
const envToken = process.env.TOKEN_SECRET as string

const index = async (req: Request, res: Response) => {
  const products = store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
  const product = store.show(req.body.id)
  res.json(product)
}

const create = async (req: Request, res: Response) => {
  const newProduct: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  }
  try {
    const product = store.create(newProduct)
    const token = jwt.sign({ product: product }, envToken)
    res.json(token)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

export default productRoutes
