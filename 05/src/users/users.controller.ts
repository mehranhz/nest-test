import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Delete,
  Patch,
  NotFoundException
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDTO } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UserDto } from './dtos/user.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { AuthService } from './auth.service'

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    const user = this.authService.signup(body.email, body.password)
    console.log(user)
    return user
  }

  @Post('signin')
  signIn(@Body() body: CreateUserDTO) {
    const user = this.authService.signin(body.email, body.password)

    return user
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id))
    if (!user) {
      throw new NotFoundException('user not found')
    }

    return user
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email)
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id))
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body)
  }
}
