import { Controller, Get, Post, Delete, Patch } from '@nestjs/common';

@Controller('messages')
export class MessagesController {

    @Get()
    findAll(){
        return "come and get all messages"
    }

    @Post()
    create(){
        return 'This action adds a new message';
    }

    @Delete()
    remove(){
        return 'This action removes a message';
    }

    @Patch()
    update(){
        return 'This action updates a message';
    }

    @Get(':id')
    findOne(){
        return 'This action returns a message';
    }

    }
