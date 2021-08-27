import { Product, ProductStore } from '../../product'

const store = new ProductStore()

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

  it('Create new Product in Database', async () => {
    const result = await store.create({
      name: 'orange',
      price: 1,
      category: 'fruit',
    })
    expect(result).toEqual({
      id: 1,
      name: 'orange',
      price: 1,
      category: 'fruit',
    })
  })

  it('Retrieve Single Product in Database', async () => {
    const result = await store.show('1')

    expect(result).toEqual({
      id: 1,
      name: 'orange',
      price: 1,
      category: 'fruit',
    })
  })

  it('Retrieve All Products in Database', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: 1,
        name: 'orange',
        price: 1,
        category: 'fruit',
      },
    ])
  })
})
