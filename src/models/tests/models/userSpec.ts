import client from '../../../database'
import { UserStore } from '../../user'

const store = new UserStore()
let testId: number

describe('User Methods', () => {
  it('Index Method Should Exist', () => {
    expect(store.index).toBeDefined()
  })
  it('Show Method Should Exist', () => {
    expect(store.show).toBeDefined()
  })
  it('Create Method Should Exist', () => {
    expect(store.create).toBeDefined()
  })

  it('Delete All Users in Database', async () => {
    await store.deleteAll()
    const result = await store.index()
    expect(result).toEqual([])
  })

  it('Create new User in Database', async () => {
    const result = await store.create({
      first_name: 'User',
      last_name: 'Test',
      password_digest: 'password',
    })
    testId = result.id as number
    delete result.password_digest
    expect(result).toEqual({
      id: testId,
      first_name: 'User',
      last_name: 'Test',
    })
  })

  it('Retrieve Single User in Database', async () => {
    const result = await store.show(`${testId}`)
    delete result.password_digest
    expect(result).toEqual({
      id: testId,
      first_name: 'User',
      last_name: 'Test',
    })
  })

  it('Retrieve All Users in Database', async () => {
    const result = await store.index()
    delete result[0].password_digest

    expect(result).toEqual([
      {
        id: testId,
        first_name: 'User',
        last_name: 'Test',
      },
    ])
  })
})
