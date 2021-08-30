import client from '../database'

export type Order = {
  id?: number
  user_id: number
  status: string
}

const ordersByUserSqlQuery: string =
  'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)'

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const sqlQuery: string = 'SELECT * FROM orders'
      const conn = await client.connect()
      const result = await conn.query(sqlQuery)
      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Could not get Orders.\n ${error}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sqlQuery: string = 'SELECT * FROM orders WHERE id = ($1)'
      const conn = await client.connect()
      const result = await conn.query(sqlQuery, [id])
      conn.release()
      const order = result.rows[0]

      return order
    } catch (error) {
      throw new Error(`Could not find Order with id: ${id}.\n ${error}`)
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sqlQuery: string =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sqlQuery, [order.user_id, order.status])

      const newOrder = result.rows[0]
      conn.release()

      return newOrder
    } catch (error) {
      throw new Error(
        `Error attempting to create new Order(${order.user_id}, ${order.status}).\n ${error}`
      )
    }
  }

  async deleteAll() {
    try {
      const sqlQuery: string = 'DELETE FROM orders'
      const conn = await client.connect()
      await conn.query(sqlQuery)
      conn.release()
    } catch (error) {
      throw new Error(`Error Deleting Orders.\n ${error}`)
    }
  }

  /**
   *
   * @param user_id
   * @returns
   */
  async showCurrentOrderByUser(user_id: string): Promise<Order> {
    try {
      const conn = await client.connect()
      const activeOrders = await conn.query(ordersByUserSqlQuery, [
        user_id,
        'active',
      ])
      conn.release()

      return activeOrders.rows[0]
    } catch (error) {
      throw new Error(`Could not get active Orders.\n ${error}`)
    }
  }

  /**
   *
   * @param user_id
   * @returns
   */
  async showCompletedOrdersByUser(user_id: string): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const completeOrders = await conn.query(ordersByUserSqlQuery, [
        user_id,
        'complete',
      ])
      conn.release()

      return completeOrders.rows
    } catch (error) {
      throw new Error(`Could not get completed Orders.\n ${error}`)
    }
  }
}
