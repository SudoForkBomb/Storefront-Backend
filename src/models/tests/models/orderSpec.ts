import { OrderStore } from '../../order'
import { UserStore } from '../../user'
const orderStore = new OrderStore()
const userStore = new UserStore()

describe('Order Methods', () => {
  beforeAll(async () => {
    await userStore.create({
      first_name: 'Order',
      last_name: 'Test',
      password_digest: 'password',
    })
    await orderStore.create({
      user_id: 1,
      status: 'complete',
    })
  })

  it('Create Method Should Exist', () => {
    expect(orderStore.create).toBeDefined()
  })
  it('Index Method Should Exist', () => {
    expect(orderStore.index).toBeDefined()
  })
  it('Show Method Should Exist', () => {
    expect(orderStore.show).toBeDefined()
  })
  it('showCurrentOrderByUser Method Should Exist', () => {
    expect(orderStore.create).toBeDefined()
  })
  it('showCompletedOrdersByUser Method Should Exist', () => {
    expect(orderStore.index).toBeDefined()
  })

  it('Create new Order in Database', async () => {
    const result = await orderStore.create({
      user_id: 1,
      status: 'active',
    })
    expect(result).toEqual({
      id: 2,
      user_id: 1,
      status: 'active',
    })
  })

  it('Retrieve Single Order in Database', async () => {
    const result = await orderStore.show('1')
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'complete',
    })
  })

  it('Retrieve All Orders in Database', async () => {
    const result = await orderStore.index()
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        status: 'complete',
      },
      {
        id: 2,
        user_id: 1,
        status: 'active',
      },
    ])
  })

  it('Retrieve Active Order by UserID in Database', async () => {
    const result = await orderStore.showCurrentOrderByUser('1')
    expect(result).toEqual({
      id: 2,
      user_id: 1,
      status: 'active',
    })
  })

  it('Retrieve Completed Order by UserID in Database', async () => {
    const result = await orderStore.showCompletedOrdersByUser('1')
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        status: 'complete',
      },
    ])
  })

  it('Delete All Orders in Database', async () => {
    await orderStore.deleteAll()
    const result = await orderStore.index()
    expect(result).toEqual([])
  })
})
