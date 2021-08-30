import supertest from 'supertest'
import app from '../../../server'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../../user'
import { Order, OrderStore } from '../../order'

const userStore = new UserStore()
const orderStore = new OrderStore()
const request = supertest(app)
const envToken = process.env.TOKEN_SECRET as string
let token: string
let testUserId: number

describe('Token Req - Users API Endpoints', () => {
  beforeAll(async () => {
    const user = await userStore.create({
      first_name: 'Users',
      last_name: 'Test',
      password_digest: 'password',
    })
    token = jwt.sign({ user: user }, envToken)
    testUserId = user.id as number
    await orderStore.create({
      user_id: 1,
      status: 'complete',
    })
    await orderStore.create({
      user_id: 1,
      status: 'active',
    })
  })

  it('Index Endpoint', async () => {
    const result = await request
      .get('/users')
      .set('Authorization', 'Bearer ' + token)
    result.body.forEach((element: User) => {
      delete element.password_digest
    })
    expect(result.body).toEqual([
      {
        id: 2,
        first_name: 'Users',
        last_name: 'Test',
      },
    ])
  })

  it('Show Endpoint', async () => {
    const result = await request
      .get('/users/2')
      .set('Authorization', 'Bearer ' + token)
    delete result.body.password_digest
    expect(result.body).toEqual({
      id: 1,
      first_name: 'Users',
      last_name: 'Test',
    })
  })

  it('Create Endpoint', async () => {
    const result = await request
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send({
        first_name: 'CreateUser',
        last_name: 'Test',
        password_digest: 'password',
      })
    expect(result.status).toEqual(200)
  })
})

describe('Token Req - Products API Endpoints', () => {
  it('Create Endpoint', async () => {
    const result = await request
      .post('/products/')
      .set('Authorization', 'Bearer ' + token)
      .send({ name: 'orange', price: 1, category: 'fruit' })
    expect(result.status).toEqual(200)
  })
})
describe('Token Req - Orders API Endpoints', () => {
  it('Retrieve Active Order by UserID in Database', async () => {
    const result = await request
      .get(`/orders/${testUserId}/active`)
      .set('Authorization', 'Bearer ' + token)
    expect(result.body).toEqual({
      id: 2,
      user_id: testUserId,
      status: 'active',
    })
  })
  it('Token Req - Retrieve Completed Orders by UserID in Database', async () => {
    const result = await request
      .get(`/orders/${testUserId}/active`)
      .set('Authorization', 'Bearer ' + token)
    expect(result.body).toEqual([
      {
        id: 1,
        user_id: testUserId,
        status: 'complete',
      },
    ])
  })
})
