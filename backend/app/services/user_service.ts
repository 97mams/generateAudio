import agent from '#models/agent'

export class UserService {
  async createUser(user: string) {
    const existingUser = await agent.query().where('name', user).first()
    if (existingUser) {
      return this.getUser(user)
    }

    const newUser = await agent.create({ name: user })

    return newUser
  }

  async getUser(name: string) {
    const user = await agent.query().where('name', name).first()
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
}
