import supertest from 'supertest'
import app from '../../../server'
import { Product, ProductStore } from '../../product'

const request = supertest(app)
const store = new ProductStore()

describe('Products API Endpoints', () => {
  beforeAll(async () => {
    await store.create({
      name: 'orange',
      price: 1,
      category: 'fruit',
    })
  })
  it('Index Endpoint', async () => {
    const result = await request.get('/products')
    expect(result.body).toEqual([
      {
        id: 1,
        name: 'orange',
        price: 1,
        category: 'fruit',
      },
    ])
  })
  it('Show Endpoint', async () => {
    const result = await request.get('/products/1')
    expect(result.body).toEqual({
      id: 1,
      name: 'orange',
      price: 1,
      category: 'fruit',
    })
  })
})
