import client from '../database'

export type Product = {
  id?: number
  name: string
  price: string
  category: string
}

export class ProductStore {
  /**
   * Returns a list of all products.
   * @returns List of all products.
   */
  async index(): Promise<Product[]> {
    try {
      const sqlQuery: string = 'SELECT  * FROM products'
      const conn = await client.connect()
      const result = await conn.query(sqlQuery)
      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Could not get Products.\n ${error}`)
    }
  }

  /**
   * Search for a products by product id.
   * @param id - id number to the desired product.
   * @returns
   */
  async show(id: number): Promise<Product> {
    try {
      const sqlQuery: string = 'SELECT * FROM products WHERE id = ($1)'
      const conn = await client.connect()
      const result = await conn.query(sqlQuery)
      conn.release()
      const product = result.rows[0]

      return product
    } catch (error) {
      throw new Error(`Could not find Product with id: ${id}.\n ${error}`)
    }
  }

  /**
   * Create a new Product.
   * @param user - Product object with desired details(name, price, category).
   * @returns A copy of the new Product.
   */
  async create(product: Product): Promise<Product> {
    try {
      const sqlQuery: string =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sqlQuery, [
        product.name,
        product.price,
        product.category,
      ])
      const newProduct = result.rows[0]
      conn.release()

      return newProduct
    } catch (error) {
      throw new Error(
        `Error attempting to create new Product(${product.name}, ${product.price}, ${product.category}).\n ${error}`
      )
    }
  }
}
