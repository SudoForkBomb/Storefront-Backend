import client from '../database'
import bcrypt from 'bcrypt'

const saltRounds = process.env.SALT_ROUNDS as string
const pepper = process.env.BCRYPT_PASSWORD as string

export type User = {
  id?: number
  first_name: string
  last_name: string
  password_digest?: string
}

export class UserStore {
  /**
   * Returns a list of all user accounts.
   * @returns List of all user accounts.
   */
  async index(): Promise<User[]> {
    try {
      const sqlQuery: string = 'SELECT * FROM users'

      const conn = await client.connect()
      const result = await conn.query(sqlQuery)
      conn.release()
      const usersList = result.rows

      return usersList
    } catch (error) {
      throw new Error(`Could not get Users.\n ${error}`)
    }
  }

  /**
   * Search for a user account by user id.
   * @param id - id number to the desired User account.
   * @returns
   */
  async show(id: string): Promise<User> {
    try {
      const sqlQuery: string = 'SELECT * FROM users WHERE id = ($1)'

      const conn = await client.connect()
      const result = await conn.query(sqlQuery, [id])
      conn.release()
      const user = result.rows[0]

      return user
    } catch (error) {
      throw new Error(`Could not find User with id: ${id}.\n ${error}`)
    }
  }

  /**
   * Create a new user account.
   * @param user - User object with desired details(firstName, lastName, password).
   * @returns A copy of the new User account.
   */
  async create(user: User): Promise<User> {
    try {
      const sqlQuery: string =
        'INSERT INTO users (first_name, last_name, password_digest) VALUES($1, $2, $3) RETURNING *'

      const conn = await client.connect()
      const hash = bcrypt.hashSync(
        user.password_digest + pepper,
        parseInt(saltRounds)
      )
      const result = await conn.query(sqlQuery, [
        user.first_name,
        user.last_name,
        hash,
      ])
      conn.release()
      const newUser = result.rows[0]

      return newUser
    } catch (error) {
      throw new Error(
        `Error creating new User(${user.first_name}, ${user.last_name}).\n ${error}`
      )
    }
  }

  async deleteAll() {
    try {
      const sqlQuery: string = 'DELETE FROM users'
      const conn = await client.connect()
      await conn.query(sqlQuery)
      conn.release()
    } catch (error) {
      throw new Error(`Error Deleting Users.\n ${error}`)
    }
  }
}
