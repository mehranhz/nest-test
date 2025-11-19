import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { UsersService } from './users.service'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const user = await this.usersService.find(email)
    if (user.length) {
      throw new BadRequestException('email in use')
    }

    const salt = randomBytes(8).toString('hex')

    const hash = (await scrypt(password, salt, 32)) as Buffer

    const result = salt + '.' + hash.toString('hex')

    const newUser = await this.usersService.create(email, result)

    return newUser
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email)

    if (!user) {
      throw new NotFoundException('user not found')
    }

    const [salt, storedHash] = user.password.split('.')
    const providedHash = (await scrypt(password, salt, 32)) as Buffer

    if (providedHash.toString('hex') !== storedHash) {
      throw new NotFoundException('No user with this credentials found')
    }

    return user
  }
}
