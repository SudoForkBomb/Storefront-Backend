import client from '../database'

export type Order = {
  id?: number
  userID: number
  status: string
}

const sqlQuery: string =
  'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)'

export class OrderStore {
  async showCurrentOrdersByUser(userID: number) {
    try {
      const conn = await client.connect()
      const result = await conn.query(sqlQuery, [userID, 'active'])
      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Could not get active Orders.\n ${error}`)
    }
  }

  async showCompletedOrdersByUser(userID: number) {
    try {
      const conn = await client.connect()
      const result = await conn.query(sqlQuery, [userID, 'complete'])
      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Could not get completed Orders.\n ${error}`)
    }
  }
}
