import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post('signup')
    createUser(@Body() body: CreateUserDTO){
        return this.usersService.create(body.email, body.password);
    }
}
