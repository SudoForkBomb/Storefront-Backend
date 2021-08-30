import { Product, ProductStore } from '../../product'

const store = new ProductStore()
let testId: number

describe('Product Methods -', () => {
  it('Create Method Should Exist', () => {
    expect(store.create).toBeDefined()
  })
  it('Index Method Should Exist', () => {
    expect(store.index).toBeDefined()
  })
  it('Show Method Should Exist', () => {
    expect(store.show).toBeDefined()
  })

  it('Delete All Products in Database', async () => {
    await store.deleteAll()
    const result = await store.index()
    expect(result).toEqual([])
  })

  it('Create new Product in Database', async () => {
    const result = await store.create({
      name: 'orange',
      price: 1,
      category: 'fruit',
    })
    testId = result.id as number
    expect(result).toEqual({
      id: testId,
      name: 'orange',
      price: 1,
      category: 'fruit',
    })
  })

  it('Retrieve Single Product in Database', async () => {
    const result = await store.show(`${testId}`)

    expect(result).toEqual({
      id: testId,
      name: 'orange',
      price: 1,
      category: 'fruit',
    })
  })

  it('Retrieve All Products in Database', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: testId,
        name: 'orange',
        price: 1,
        category: 'fruit',
      },
    ])
  })
})
